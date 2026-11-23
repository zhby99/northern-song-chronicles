import * as THREE from 'three'
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { resolveAssetUrl } from '../../utils/assetLoader'
import { CharacterRig3D } from './characterRig3d'
import {
  getNpcModelPath,
  loadOptionalGlb,
  normalizeGlbCharacterScene,
  PROP_CENSER_PATH,
  PROP_PILLAR_PATH,
  SECT_MODEL_PATHS,
} from './glbModelLoader'
import { ShaderVfxPool3D } from './shaderVfx3d'
import type { ArenaObstacle3D, ArenaSimState, ArenaThemeKind } from './types'

interface ThemeEnvPalette {
  bg: number
  fog: number
  floor: number
  rim: number
  ambient: number
  keyLight: number
  grassColor: number
}

const THEME_PALETTES: Record<ArenaThemeKind, ThemeEnvPalette> = {
  courtyard: {
    bg: 0x161210,
    fog: 0x1a1512,
    floor: 0x2c2623,
    rim: 0x8c6d46,
    ambient: 0x9fb3c8,
    keyLight: 0xffd59e,
    grassColor: 0x3b593f,
  },
  mountain: {
    bg: 0x111821,
    fog: 0x16202a,
    floor: 0x36414b,
    rim: 0x64748b,
    ambient: 0xbae6fd,
    keyLight: 0xfffbeb,
    grassColor: 0x2f5e4e,
  },
  market: {
    bg: 0x1c140e,
    fog: 0x241911,
    floor: 0x3d3126,
    rim: 0xb47d43,
    ambient: 0xfde68a,
    keyLight: 0xffedd5,
    grassColor: 0x4d6b3c,
  },
  frontier: {
    bg: 0x1f1710,
    fog: 0x291e14,
    floor: 0x57432e,
    rim: 0x926a3b,
    ambient: 0xfef3c7,
    keyLight: 0xfdba74,
    grassColor: 0x6b6036,
  },
}

interface ObstacleVisual {
  obs: ArenaObstacle3D
  group: THREE.Group
  materials: THREE.MeshStandardMaterial[]
}

export class ArenaRenderer3D {
  readonly renderer: THREE.WebGLRenderer | null
  readonly scene = new THREE.Scene()
  readonly camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.5, 90)
  readonly vfxPool = new ShaderVfxPool3D()
  readonly isWebGLSupported: boolean

  private readonly rigs = new Map<string, CharacterRig3D>()
  private readonly obstacleVisuals: ObstacleVisual[] = []
  private readonly grassMesh: THREE.InstancedMesh | null = null
  private readonly grassBaseMatrices: Array<{ x: number; z: number; s: number; rot: number }> = []
  private readonly weatherPoints: THREE.Points | null = null
  private readonly raycaster = new THREE.Raycaster()
  private readonly groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  private readonly camFocus = new THREE.Vector3(0, 0.9, 0)
  private readonly tmpTarget = new THREE.Vector3()
  private readonly tmpVec = new THREE.Vector3()
  private contextLost = false

  constructor(container: HTMLElement, sim: ArenaSimState) {
    let glRenderer: THREE.WebGLRenderer | null = null
    try {
      glRenderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
      })
    } catch {
      glRenderer = null
    }

    this.renderer = glRenderer
    this.isWebGLSupported = Boolean(glRenderer)
    if (!glRenderer) return

    const w = Math.max(320, container.clientWidth)
    const h = Math.max(200, container.clientHeight)
    // 像素比封顶，兼顾视网膜清晰度与帧率预算
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    glRenderer.setPixelRatio(dpr)
    glRenderer.setSize(w, h)
    glRenderer.shadowMap.enabled = true
    glRenderer.shadowMap.type = THREE.PCFSoftShadowMap
    glRenderer.toneMapping = THREE.ACESFilmicToneMapping
    glRenderer.toneMappingExposure = 1.28

    glRenderer.domElement.style.display = 'block'
    glRenderer.domElement.style.width = '100%'
    glRenderer.domElement.style.height = '100%'
    glRenderer.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      this.contextLost = true
    })
    glRenderer.domElement.addEventListener('webglcontextrestored', () => {
      this.contextLost = false
    })
    container.appendChild(glRenderer.domElement)

    const pal = THEME_PALETTES[sim.theme]
    this.scene.background = new THREE.Color(pal.bg)
    this.scene.fog = new THREE.FogExp2(pal.fog, 0.016)

    // 灯光：冷色天光 + 暖色主光 + 地台点光源（充足对比度，不发黑）
    const hemi = new THREE.HemisphereLight(pal.ambient, 0x2c221b, 1.35)
    this.scene.add(hemi)

    const dirLight = new THREE.DirectionalLight(pal.keyLight, 1.85)
    dirLight.position.set(8, 14, 7)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.set(1024, 1024)
    dirLight.shadow.camera.near = 2
    dirLight.shadow.camera.far = 36
    const s = 12
    dirLight.shadow.camera.left = -s
    dirLight.shadow.camera.right = s
    dirLight.shadow.camera.top = s
    dirLight.shadow.camera.bottom = -s
    this.scene.add(dirLight)

    const rimLight = new THREE.PointLight(0xf59e0b, 3.2, 28)
    rimLight.position.set(-7, 5.2, -6)
    this.scene.add(rimLight)

    // 宋式青石演武地台与八卦刻线
    const floorGeo = new THREE.CircleGeometry(sim.arenaRadius + 0.4, 48)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: sim.theme === 'courtyard' ? 0.42 : 0.72,
      metalness: sim.theme === 'courtyard' ? 0.14 : 0.05,
    })
    floorMat.color.setHex(pal.floor)
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    this.scene.add(floor)

    // 青砖石板程序化铺砌网格线，确保无贴图时地面也有清晰透视参照
    const tileGrid = new THREE.GridHelper(sim.arenaRadius * 1.85, 16, pal.rim, 0x3b332c)
    tileGrid.position.y = 0.008
    if (Array.isArray(tileGrid.material)) {
      for (const m of tileGrid.material) {
        m.transparent = true
        m.opacity = 0.35
      }
    } else {
      tileGrid.material.transparent = true
      tileGrid.material.opacity = 0.35
    }
    this.scene.add(tileGrid)

    // 异步探测可选即梦生成的少林青石地砖贴图与环景图
    const loadOptionalTexture = async (url: string): Promise<THREE.Texture | null> => {
      try {
        const resolved = resolveAssetUrl(url)
        if (!resolved.startsWith('data:')) {
          const headRes = await fetch(resolved)
          if (!headRes.ok) return null
          const ct = headRes.headers.get('content-type') ?? ''
          if (!ct.startsWith('image/')) return null
        }
        return await new Promise((resolve) => {
          new THREE.TextureLoader().load(
            resolved,
            (tex) => resolve(tex),
            undefined,
            () => resolve(null),
          )
        })
      } catch {
        return null
      }
    }

    void loadOptionalTexture('/assets/combat3d/textures/floor_shaolin_stone.jpg').then((tex) => {
      if (!tex) return
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      tex.repeat.set(4, 4)
      tex.colorSpace = THREE.SRGBColorSpace
      floorMat.map = tex
      floorMat.color.setHex(0xd6d3ce)
      floorMat.needsUpdate = true
    })

    void loadOptionalTexture('/assets/combat3d/textures/sky_shaolin_courtyard.jpg').then((tex) => {
      if (!tex) return
      tex.colorSpace = THREE.SRGBColorSpace
      this.scene.background = tex
    })

    const outerFloor = new THREE.Mesh(
      new THREE.RingGeometry(sim.arenaRadius + 0.3, sim.arenaRadius + 16, 48),
      new THREE.MeshStandardMaterial({ color: pal.bg, roughness: 0.95 }),
    )
    outerFloor.rotation.x = -Math.PI / 2
    outerFloor.position.y = -0.02
    this.scene.add(outerFloor)

    const ringEdge = new THREE.Mesh(
      new THREE.RingGeometry(sim.arenaRadius - 0.15, sim.arenaRadius + 0.25, 48),
      new THREE.MeshStandardMaterial({ color: pal.rim, roughness: 0.55, metalness: 0.2 }),
    )
    ringEdge.rotation.x = -Math.PI / 2
    ringEdge.position.y = 0.01
    this.scene.add(ringEdge)

    const baguaRing = new THREE.Mesh(
      new THREE.RingGeometry(3.8, 3.92, 8),
      new THREE.MeshBasicMaterial({ color: pal.rim, transparent: true, opacity: 0.28, side: THREE.DoubleSide }),
    )
    baguaRing.rotation.x = -Math.PI / 2
    baguaRing.position.y = 0.012
    this.scene.add(baguaRing)

    // 场内石柱 / 奇石 / 青松障碍物（支持镜头遮挡半透明）
    for (const obs of sim.obstacles) {
      const grp = new THREE.Group()
      grp.position.set(obs.x, 0, obs.z)
      const mats: THREE.MeshStandardMaterial[] = []

      if (obs.kind === 'pillar') {
        const pMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.55, transparent: true })
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.7, transparent: true })
        mats.push(pMat, baseMat)
        const base = new THREE.Mesh(new THREE.CylinderGeometry(obs.radius * 1.1, obs.radius * 1.25, 0.36, 12), baseMat)
        base.position.y = 0.18
        const col = new THREE.Mesh(new THREE.CylinderGeometry(obs.radius * 0.65, obs.radius * 0.72, obs.height, 12), pMat)
        col.position.y = obs.height * 0.5
        col.castShadow = true
        grp.add(base, col)
      } else if (obs.kind === 'pine') {
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x452b19, roughness: 0.85, transparent: true })
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x1e4631, roughness: 0.8, transparent: true })
        mats.push(trunkMat, leafMat)
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 1.8, 8), trunkMat)
        trunk.position.y = 0.9
        trunk.castShadow = true
        const crown = new THREE.Mesh(new THREE.ConeGeometry(1.15, 1.6, 8), leafMat)
        crown.position.y = 2.2
        crown.castShadow = true
        grp.add(trunk, crown)
      } else {
        const rockMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.85, transparent: true })
        mats.push(rockMat)
        const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(obs.radius * 0.95, 0), rockMat)
        rock.position.y = obs.height * 0.45
        rock.scale.y = obs.height / (obs.radius * 1.5)
        rock.castShadow = true
        grp.add(rock)
      }

      this.scene.add(grp)
      this.obstacleVisuals.push({ obs, group: grp, materials: mats })
    }

    // 实例化随风起伏的演武台边野草（`InstancedMesh`）
    const grassCount = 260
    const bladeGeo = new THREE.ConeGeometry(0.06, 0.46, 3)
    bladeGeo.translate(0, 0.23, 0)
    const grassMat = new THREE.MeshStandardMaterial({ color: pal.grassColor, roughness: 0.85 })
    this.grassMesh = new THREE.InstancedMesh(bladeGeo, grassMat, grassCount)
    const dummy = new THREE.Object3D()
    for (let i = 0; i < grassCount; i += 1) {
      const ang = (i / grassCount) * Math.PI * 2 + (i % 7) * 0.13
      const rad = sim.arenaRadius - 0.5 + (i % 5) * 0.55
      const gx = Math.cos(ang) * rad
      const gz = Math.sin(ang) * rad
      const gs = 0.7 + (i % 4) * 0.24
      this.grassBaseMatrices.push({ x: gx, z: gz, s: gs, rot: ang })
      dummy.position.set(gx, 0, gz)
      dummy.scale.setScalar(gs)
      dummy.updateMatrix()
      this.grassMesh.setMatrixAt(i, dummy.matrix)
    }
    this.scene.add(this.grassMesh)

    // 跟随镜头的循环微粒（山间落雪 / 庭院浮尘）
    const pCount = 140
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i += 1) {
      pPos[i * 3] = (((i * 73) % 100) / 100 - 0.5) * 22
      pPos[i * 3 + 1] = (((i * 37) % 100) / 100) * 7
      pPos[i * 3 + 2] = (((i * 91) % 100) / 100 - 0.5) * 22
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    this.weatherPoints = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: sim.theme === 'mountain' ? 0xe0f2fe : 0xfde68a,
        size: sim.theme === 'mountain' ? 0.09 : 0.065,
        transparent: true,
        opacity: 0.55,
      }),
    )
    this.scene.add(this.weatherPoints)

    // 构建角色骨骼素体，并异步探测专属 NPC / 门派 GLB 热插拔模型
    for (const actor of sim.actors) {
      const rig = new CharacterRig3D(actor)
      this.rigs.set(actor.unitId, rig)
      this.scene.add(rig.root)

      const npcGlbPath = getNpcModelPath(actor.npcId)
      const sectGlbPath = SECT_MODEL_PATHS[actor.stats.sectArchetype]
      void loadOptionalGlb(npcGlbPath).then((gltf) => {
        if (gltf && this.rigs.has(actor.unitId)) {
          const clone = cloneSkeleton(gltf.scene)
          normalizeGlbCharacterScene(clone, 1.76)
          rig.attachExternalGlb(clone)
          return
        }
        void loadOptionalGlb(sectGlbPath).then((sectGltf) => {
          if (!sectGltf || !this.rigs.has(actor.unitId)) return
          const clone = cloneSkeleton(sectGltf.scene)
          normalizeGlbCharacterScene(clone, 1.76)
          rig.attachExternalGlb(clone)
        })
      })
    }

    // 异步探测少林青铜香炉道具模型（置于北侧高台边缘并配暖橙香火点光）
    void loadOptionalGlb(PROP_CENSER_PATH).then((censerGltf) => {
      if (!censerGltf) return
      const prop = censerGltf.scene.clone(true)
      normalizeGlbCharacterScene(prop, 1.55)
      prop.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.castShadow = true
          obj.receiveShadow = true
        }
      })
      prop.position.set(0, 0, -7.4)
      this.scene.add(prop)

      const incenseLight = new THREE.PointLight(0xfb923c, 2.4, 10)
      incenseLight.position.set(0, 2.1, -7.4)
      this.scene.add(incenseLight)
    })

    // 异步探测少林八角青石经幢灯柱模型，替换场内柱体占位并保留镜头遮挡淡出特性
    void loadOptionalGlb(PROP_PILLAR_PATH).then((pillarGltf) => {
      if (!pillarGltf) return
      for (const ov of this.obstacleVisuals) {
        if (ov.obs.kind !== 'pillar' && ov.obs.kind !== 'stone') continue
        const prop = pillarGltf.scene.clone(true)
        normalizeGlbCharacterScene(prop, ov.obs.kind === 'pillar' ? ov.obs.height : 2.6)
        const nextMats: THREE.MeshStandardMaterial[] = []
        prop.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.castShadow = true
            obj.receiveShadow = true
            if (obj.material instanceof THREE.MeshStandardMaterial) {
              const cm = obj.material.clone()
              cm.transparent = true
              obj.material = cm
              nextMats.push(cm)
            }
          }
        })
        ov.group.clear()
        ov.group.add(prop)
        ov.materials = nextMats
      }
    })

    this.scene.add(this.vfxPool.group)
    this.updateSize(w, h)
  }

  updateSize(width: number, height: number): void {
    if (!this.renderer || width <= 0 || height <= 0) return
    const aspect = width / height
    // 竖屏自动放宽 FOV 并稍拉远，保证横向视野不被裁切
    this.camera.fov = aspect < 0.9 ? 52 : 40
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  raycastGroundAim(ndcX: number, ndcY: number): { x: number; z: number } | null {
    this.raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), this.camera)
    const hit = new THREE.Vector3()
    if (this.raycaster.ray.intersectPlane(this.groundPlane, hit)) {
      return { x: hit.x, z: hit.z }
    }
    return null
  }

  render(sim: ArenaSimState): void {
    if (!this.renderer || this.contextLost) return

    const player = sim.actors.find((a) => a.isPlayer) ?? sim.actors[0]
    if (player) {
      // 镜头缰绳：焦点始终紧随主角，最多向最近敌人略偏不超过 2.2 米
      this.tmpTarget.set(player.x, 0.95, player.z)
      const foe = sim.actors.find((a) => a.team === 'enemy' && a.hp > 0)
      if (foe) {
        this.tmpVec.set(foe.x - player.x, 0, foe.z - player.z)
        const d = this.tmpVec.length()
        if (d > 0.1) {
          this.tmpVec.multiplyScalar(Math.min(2.2, d * 0.25) / d)
          this.tmpTarget.add(this.tmpVec)
        }
      }
      this.camFocus.lerp(this.tmpTarget, 0.14)
    }

    const dist = this.camera.aspect < 0.9 ? 13.8 : 11.4
    const shakeX = sim.cameraShake > 0 ? Math.sin(sim.elapsedTime * 68) * sim.cameraShake : 0
    const shakeY = sim.cameraShake > 0 ? Math.cos(sim.elapsedTime * 54) * sim.cameraShake * 0.6 : 0
    this.camera.position.set(
      this.camFocus.x + shakeX,
      Math.max(1.5, this.camFocus.y + dist * 0.78 + shakeY),
      this.camFocus.z + dist * 0.72,
    )
    this.camera.lookAt(this.camFocus)

    // 挡在镜头与主角连线间的高大物体自动半透明淡出
    if (player) {
      const cx = this.camera.position.x
      const cz = this.camera.position.z
      const px = player.x
      const pz = player.z
      const segDx = px - cx
      const segDz = pz - cz
      const segLenSq = Math.max(0.001, segDx * segDx + segDz * segDz)
      for (const ov of this.obstacleVisuals) {
        const t = THREE.MathUtils.clamp(
          ((ov.obs.x - cx) * segDx + (ov.obs.z - cz) * segDz) / segLenSq,
          0,
          1,
        )
        const projX = cx + segDx * t
        const projZ = cz + segDz * t
        const horizDist = Math.hypot(ov.obs.x - projX, ov.obs.z - projZ)
        const shouldFade = ov.obs.height > 1.8 && horizDist < ov.obs.radius + 1.0 && t > 0.15 && t < 0.95
        const targetOpacity = shouldFade ? 0.28 : 1.0
        for (const mat of ov.materials) {
          mat.opacity += (targetOpacity - mat.opacity) * 0.2
        }
      }
    }

    // 同步角色动作
    for (const actor of sim.actors) {
      this.rigs.get(actor.unitId)?.update(actor, sim.elapsedTime)
    }

    // 随风起伏的野草动画
    if (this.grassMesh) {
      const dummy = new THREE.Object3D()
      for (let i = 0; i < this.grassBaseMatrices.length; i += 1) {
        const g = this.grassBaseMatrices[i]!
        dummy.position.set(g.x, 0, g.z)
        dummy.scale.setScalar(g.s)
        dummy.rotation.set(Math.sin(sim.elapsedTime * 2.1 + g.x * 0.7) * 0.16, g.rot, 0)
        dummy.updateMatrix()
        this.grassMesh.setMatrixAt(i, dummy.matrix)
      }
      this.grassMesh.instanceMatrix.needsUpdate = true
    }

    // 天气微粒飘落
    if (this.weatherPoints) {
      const attr = this.weatherPoints.geometry.getAttribute('position') as THREE.BufferAttribute
      const fallSpeed = sim.theme === 'mountain' ? 1.4 : 0.65
      for (let i = 0; i < attr.count; i += 1) {
        let y = attr.getY(i) - fallSpeed * 0.016
        let x = attr.getX(i) + Math.sin(sim.elapsedTime + i) * 0.004
        if (y < 0.05) y = 6.8
        if (x > 11) x = -11
        attr.setXY(i, x, y)
      }
      attr.needsUpdate = true
    }

    this.vfxPool.sync(sim.vfxEvents, sim.projectiles, sim.telegraphs)
    this.renderer.render(this.scene, this.camera)
  }

  projectToScreen(
    worldX: number,
    worldY: number,
    worldZ: number,
    width: number,
    height: number,
  ): { x: number; y: number; visible: boolean } {
    const v = new THREE.Vector3(worldX, worldY, worldZ).project(this.camera)
    return {
      x: (v.x * 0.5 + 0.5) * width,
      y: (-v.y * 0.5 + 0.5) * height,
      visible: v.z >= -1 && v.z <= 1,
    }
  }

  dispose(): void {
    this.vfxPool.dispose()
    this.rigs.clear()
    this.scene.clear()
    if (this.renderer) {
      this.renderer.dispose()
      this.renderer.domElement.remove()
    }
  }
}
