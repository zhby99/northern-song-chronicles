import * as THREE from 'three'
import type { CombatVfxCategory } from '../combat/types'
import type { ArenaProjectile3D, ArenaTelegraph3D, ArenaVfxEvent3D } from './types'

const SLASH_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const SLASH_FRAG = /* glsl */ `
  uniform float uProgress;
  uniform float uIsInk;
  uniform vec3 uColorCore;
  uniform vec3 uColorEdge;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    // vUv.x = 沿弧长扫过 [0..1], vUv.y = 径向刃形剖面 [0..1]
    float head = clamp(uProgress * 1.45, 0.0, 1.25);
    float arcTrail = smoothstep(head - 0.85, head - 0.05, vUv.x) * (1.0 - smoothstep(head - 0.02, head + 0.06, vUv.x));
    float tipTaper = sin(clamp(vUv.x, 0.0, 1.0) * 3.14159);
    float radialBlade = pow(clamp(vUv.y, 0.0, 1.0), 2.2) * (1.0 - smoothstep(0.9, 1.0, vUv.y));

    float n = noise(vec2(vUv.x * 10.0 - uProgress * 4.5, vUv.y * 8.0));
    float erodeThreshold = smoothstep(0.35, 1.0, uProgress) * 0.85;
    float erode = smoothstep(erodeThreshold, erodeThreshold + 0.2, n);

    float alpha = arcTrail * tipTaper * radialBlade * erode;
    if (uIsInk > 0.5) {
      float inkMask = tipTaper * radialBlade * (1.0 - smoothstep(0.25, 1.0, uProgress)) * (0.45 + 0.55 * n);
      gl_FragColor = vec4(uColorEdge * 0.28, inkMask * 0.65);
      return;
    }

    // 颜色峰值控制在 2.0~2.4 防止泛光过曝成白块
    float core = smoothstep(0.62, 0.92, vUv.y);
    vec3 col = mix(uColorEdge * 1.35, uColorCore * 2.1, core);
    gl_FragColor = vec4(col, clamp(alpha * 1.25, 0.0, 1.0));
  }
`

const NOVA_FRAG = /* glsl */ `
  uniform float uProgress;
  uniform vec3 uColorCore;
  uniform vec3 uColorEdge;
  varying vec2 vUv;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    float a = atan(p.y, p.x);

    float reveal = smoothstep(0.0, 0.28, uProgress);
    float fade = 1.0 - smoothstep(0.55, 1.0, uProgress);

    float ring1 = smoothstep(0.035, 0.0, abs(r - 0.88 * reveal));
    float ring2 = smoothstep(0.025, 0.0, abs(r - 0.62 * reveal));

    // 极坐标旋转八卦符文带
    float rotA = a + uProgress * 2.6;
    float seg = floor((rotA + 3.14159) / (6.28318 / 16.0));
    float runeBand = smoothstep(0.08, 0.02, abs(r - 0.75)) * step(0.45, hash(seg + 3.0));

    // 反向旋转八角星线
    float rotB = a - uProgress * 1.8;
    float poly = cos(rotB * 4.0) * 0.06 + 0.45;
    float polyLine = smoothstep(0.02, 0.0, abs(r - poly));

    float mask = (ring1 + ring2 * 0.8 + runeBand * 0.75 + polyLine * 0.6) * fade * step(r, 0.98);
    vec3 col = mix(uColorEdge * 1.4, uColorCore * 2.1, clamp(ring1 + polyLine, 0.0, 1.0));
    gl_FragColor = vec4(col, clamp(mask, 0.0, 1.0));
  }
`

const TELEGRAPH_FRAG = /* glsl */ `
  uniform float uProgress;
  uniform float uUnblockable;
  uniform float uHalfAngle;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;
    float a = abs(atan(p.x, -p.y));
    if (a > uHalfAngle) discard;

    float stripe = 0.5 + 0.5 * sin(r * 24.0 - uProgress * 10.0);
    float edge = smoothstep(0.92, 1.0, r) + smoothstep(uHalfAngle - 0.07, uHalfAngle, a);
    float progLine = smoothstep(0.035, 0.0, abs(r - clamp(uProgress, 0.05, 0.98)));

    vec3 baseCol = uUnblockable > 0.5 ? vec3(0.95, 0.22, 0.16) : vec3(0.95, 0.68, 0.22);
    float alpha = (0.14 + stripe * 0.12 + edge * 0.45 + progLine * 0.85) * (1.0 - smoothstep(0.96, 1.0, r));
    vec3 col = baseCol * (1.1 + progLine * 1.1);
    gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.9));
  }
`

function getVfxPalette(cat: CombatVfxCategory): { core: number; edge: number } {
  switch (cat) {
    case 'sword':
      return { core: 0xe0f2fe, edge: 0x38bdf8 }
    case 'blade':
      return { core: 0xfef08a, edge: 0xea580c }
    case 'polearm':
      return { core: 0xfef3c7, edge: 0xd97706 }
    case 'sonic':
      return { core: 0xf3e8ff, edge: 0xa855f7 }
    case 'poison':
      return { core: 0xd9f99d, edge: 0x16a34a }
    case 'guard':
      return { core: 0xd1fae5, edge: 0x10b981 }
    case 'heal':
      return { core: 0xecfdf5, edge: 0x22c55e }
    default:
      return { core: 0xfde68a, edge: 0xc2410c }
  }
}

function createArcRibbonGeometry(): THREE.BufferGeometry {
  const segs = 28
  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  const innerR = 0.55
  const outerR = 1.05
  const startA = -1.15
  const endA = 1.15

  for (let i = 0; i <= segs; i += 1) {
    const u = i / segs
    const ang = startA + (endA - startA) * u
    const sx = Math.sin(ang)
    const cz = Math.cos(ang)
    positions.push(sx * innerR, 0, cz * innerR)
    uvs.push(u, 0)
    positions.push(sx * outerR, 0, cz * outerR)
    uvs.push(u, 1)
    if (i < segs) {
      const b = i * 2
      indices.push(b, b + 1, b + 2, b + 1, b + 3, b + 2)
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}

export class ShaderVfxPool3D {
  readonly group = new THREE.Group()
  private readonly arcGeo = createArcRibbonGeometry()
  private readonly planeGeo = new THREE.PlaneGeometry(2, 2)
  private readonly sphereGeo = new THREE.SphereGeometry(0.16, 10, 8)
  private readonly activeMeshes = new Map<string, THREE.Object3D>()
  private readonly projectileMeshes = new Map<string, THREE.Mesh>()
  private readonly telegraphMeshes = new Map<string, THREE.Mesh>()

  sync(
    vfxEvents: ArenaVfxEvent3D[],
    projectiles: ArenaProjectile3D[],
    telegraphs: ArenaTelegraph3D[],
  ): void {
    // 1. 瞬态刀光 / 法阵 / 火花
    const aliveVfxIds = new Set(vfxEvents.map((v) => v.id))
    for (const [id, obj] of this.activeMeshes.entries()) {
      if (!aliveVfxIds.has(id)) {
        this.group.remove(obj)
        this.activeMeshes.delete(id)
      }
    }

    for (const ev of vfxEvents) {
      const progress = Math.min(1, ev.age / Math.max(0.01, ev.duration))
      const pal = getVfxPalette(ev.vfxCategory)
      let obj = this.activeMeshes.get(ev.id)
      if (!obj) {
        if (ev.kind === 'slash' || ev.kind === 'ink_trail') {
          const mat = new THREE.ShaderMaterial({
            vertexShader: SLASH_VERT,
            fragmentShader: SLASH_FRAG,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            blending: ev.kind === 'ink_trail' ? THREE.NormalBlending : THREE.AdditiveBlending,
            uniforms: {
              uProgress: { value: 0 },
              uIsInk: { value: ev.kind === 'ink_trail' ? 1 : 0 },
              uColorCore: { value: new THREE.Color(pal.core) },
              uColorEdge: { value: new THREE.Color(pal.edge) },
            },
          })
          const mesh = new THREE.Mesh(this.arcGeo, mat)
          mesh.scale.setScalar(ev.radius)
          mesh.rotation.y = ev.yaw
          if (ev.kind === 'slash') {
            mesh.rotation.z = ev.isCrit ? 0.24 : -0.14
          }
          obj = mesh
        } else if (ev.kind === 'nova' || ev.kind === 'heal' || ev.kind === 'parry') {
          const mat = new THREE.ShaderMaterial({
            vertexShader: SLASH_VERT,
            fragmentShader: NOVA_FRAG,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            uniforms: {
              uProgress: { value: 0 },
              uColorCore: { value: new THREE.Color(pal.core) },
              uColorEdge: { value: new THREE.Color(pal.edge) },
            },
          })
          const mesh = new THREE.Mesh(this.planeGeo, mat)
          mesh.rotation.x = -Math.PI / 2
          mesh.scale.setScalar(ev.radius)
          obj = mesh
        } else {
          const sparkMat = new THREE.MeshBasicMaterial({
            color: ev.isCrit ? 0xfef08a : pal.core,
            transparent: true,
            opacity: 0.9,
          })
          const mesh = new THREE.Mesh(this.sphereGeo, sparkMat)
          obj = mesh
        }
        obj.position.set(ev.x, ev.y, ev.z)
        this.group.add(obj)
        this.activeMeshes.set(ev.id, obj)
      }

      if (obj instanceof THREE.Mesh && obj.material instanceof THREE.ShaderMaterial) {
        obj.material.uniforms.uProgress.value = progress
      } else if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshBasicMaterial) {
        obj.material.opacity = (1 - progress) * 0.85
        obj.scale.setScalar(0.8 + progress * 1.6)
      }
    }

    // 2. 飞行暗器 / 剑气弹幕
    const aliveProjIds = new Set(projectiles.map((p) => p.id))
    for (const [id, mesh] of this.projectileMeshes.entries()) {
      if (!aliveProjIds.has(id)) {
        this.group.remove(mesh)
        this.projectileMeshes.delete(id)
      }
    }
    for (const p of projectiles) {
      let mesh = this.projectileMeshes.get(p.id)
      if (!mesh) {
        const pal = getVfxPalette(p.vfxCategory)
        mesh = new THREE.Mesh(
          new THREE.ConeGeometry(0.14, 0.65, 6),
          new THREE.MeshBasicMaterial({ color: pal.core }),
        )
        mesh.rotation.x = Math.PI / 2
        this.group.add(mesh)
        this.projectileMeshes.set(p.id, mesh)
      }
      mesh.position.set(p.x, p.y, p.z)
      mesh.rotation.z = -Math.atan2(p.vx, p.vz)
    }

    // 3. 敌方蓄力预警图形（流动条纹扇面 / 圆形）
    const aliveTelIds = new Set(telegraphs.map((t) => t.id))
    for (const [id, mesh] of this.telegraphMeshes.entries()) {
      if (!aliveTelIds.has(id)) {
        this.group.remove(mesh)
        this.telegraphMeshes.delete(id)
      }
    }
    for (const tel of telegraphs) {
      let mesh = this.telegraphMeshes.get(tel.id)
      if (!mesh) {
        const mat = new THREE.ShaderMaterial({
          vertexShader: SLASH_VERT,
          fragmentShader: TELEGRAPH_FRAG,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          uniforms: {
            uProgress: { value: tel.progress },
            uUnblockable: { value: tel.unblockable ? 1 : 0 },
            uHalfAngle: { value: tel.halfAngle },
          },
        })
        mesh = new THREE.Mesh(this.planeGeo, mat)
        mesh.rotation.order = 'YXZ'
        mesh.rotation.x = -Math.PI / 2
        this.group.add(mesh)
        this.telegraphMeshes.set(tel.id, mesh)
      }
      mesh.position.set(tel.x, 0.04, tel.z)
      mesh.rotation.order = 'YXZ'
      mesh.rotation.x = -Math.PI / 2
      mesh.rotation.y = tel.yaw
      mesh.rotation.z = 0
      mesh.scale.setScalar(tel.radius)
      const mat = mesh.material as THREE.ShaderMaterial
      mat.uniforms.uProgress.value = tel.progress
      mat.uniforms.uUnblockable.value = tel.unblockable ? 1 : 0
      mat.uniforms.uHalfAngle.value = tel.halfAngle
    }
  }

  dispose(): void {
    this.arcGeo.dispose()
    this.planeGeo.dispose()
    this.sphereGeo.dispose()
    this.group.clear()
    this.activeMeshes.clear()
    this.projectileMeshes.clear()
    this.telegraphMeshes.clear()
  }
}
