import * as THREE from 'three'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { getPackedAssetArrayBuffer, resolveAssetUrl } from '../../utils/assetLoader'
import type { SectArchetype3D, WeaponArchetype3D } from './types'

export const SECT_MODEL_PATHS: Record<SectArchetype3D, string> = {
  swordsman: '/assets/combat3d/models/sect_swordsman.glb',
  shaolin_monk: '/assets/combat3d/models/sect_shaolin_monk.glb',
  taoist: '/assets/combat3d/models/sect_taoist.glb',
  beggar: '/assets/combat3d/models/sect_beggar.glb',
  imperial_guard: '/assets/combat3d/models/sect_imperial_guard.glb',
  western_monk: '/assets/combat3d/models/sect_western_monk.glb',
  emei_heroine: '/assets/combat3d/models/sect_emei_heroine.glb',
  poison_adept: '/assets/combat3d/models/sect_poison_adept.glb',
}

export const WEAPON_MODEL_PATHS: Record<WeaponArchetype3D, string> = {
  sword: '/assets/combat3d/models/weapon_sword.glb',
  blade: '/assets/combat3d/models/weapon_blade.glb',
  spear: '/assets/combat3d/models/weapon_spear.glb',
  staff: '/assets/combat3d/models/weapon_staff.glb',
  fan: '/assets/combat3d/models/weapon_fan.glb',
  gauntlet: '/assets/combat3d/models/weapon_gauntlet.glb',
  hidden: '/assets/combat3d/models/weapon_hidden.glb',
}

export function getNpcModelPath(npcId: string): string {
  return `/assets/combat3d/models/npc_${npcId}.glb`
}

export const PROP_CENSER_PATH = '/assets/combat3d/models/prop_shaolin_censer.glb'
export const PROP_PILLAR_PATH = '/assets/combat3d/models/prop_shaolin_pillar.glb'

const loader = new GLTFLoader()
const glbCache = new Map<string, Promise<GLTF | null>>()

/**
 * 将生成的 GLB 角色模型脚底对齐到 y=0、缩放到标准身高（约 1.72m），
 * 并利用左右大腿骨的世界位置叉乘自动校正偏航朝向至 +Z。
 */
export function normalizeGlbCharacterScene(root: THREE.Object3D, targetHeight = 1.72): void {
  root.updateMatrixWorld(true)

  const box = new THREE.Box3().setFromObject(root)
  const size = new THREE.Vector3()
  box.getSize(size)
  if (size.y > 0.01) {
    const scale = targetHeight / size.y
    root.scale.multiplyScalar(scale)
  }

  root.updateMatrixWorld(true)
  const groundedBox = new THREE.Box3().setFromObject(root)
  root.position.y -= groundedBox.min.y

  // 通过左右大腿骨计算朝向并校准至 +Z
  let leftThigh: THREE.Object3D | null = null
  let rightThigh: THREE.Object3D | null = null
  root.traverse((obj) => {
    const n = obj.name.toLowerCase()
    if (!leftThigh && (n.includes('leftupleg') || n.includes('thigh_l') || n.includes('l_thigh'))) {
      leftThigh = obj
    }
    if (!rightThigh && (n.includes('rightupleg') || n.includes('thigh_r') || n.includes('r_thigh'))) {
      rightThigh = obj
    }
  })

  if (leftThigh && rightThigh) {
    const lp = new THREE.Vector3()
    const rp = new THREE.Vector3()
    ;(leftThigh as THREE.Object3D).getWorldPosition(lp)
    ;(rightThigh as THREE.Object3D).getWorldPosition(rp)
    // 从左腿指向右腿（或右指向左）：若模型面朝 +Z，右腿在 -X 方向，左腿在 +X 方向
    const leftToRight = rp.sub(lp).setY(0).normalize()
    if (leftToRight.lengthSq() > 0.1) {
      const forward = new THREE.Vector3(0, 1, 0).cross(leftToRight).normalize()
      const yaw = Math.atan2(forward.x, forward.z)
      root.rotation.y -= yaw
      root.updateMatrixWorld(true)
    }
  }
}

/** 丢弃预设动画中的 .scale 轨道，防止打包量化后把角色压扁或缩小 */
export function stripAnimationScaleTracks(clips: THREE.AnimationClip[]): THREE.AnimationClip[] {
  return clips.map((clip) => {
    const cloned = clip.clone()
    cloned.tracks = cloned.tracks.filter((tr) => !tr.name.endsWith('.scale'))
    return cloned
  })
}

/**
 * 尝试按需加载可选的 Tripo3D GLB 模型：
 * - 单文件模式下直接从分片 ArrayBuffer 零网络解析；
 * - 静态开发/托管模式下静默探测，文件不存在时返回 null，交由程序化素体无缝兜底。
 */
export function loadOptionalGlb(url: string): Promise<GLTF | null> {
  const cached = glbCache.get(url)
  if (cached) return cached

  const p = (async (): Promise<GLTF | null> => {
    try {
      const packed = getPackedAssetArrayBuffer(url)
      if (packed) {
        return await loader.parseAsync(packed, '')
      }
      const res = await fetch(resolveAssetUrl(url))
      if (!res.ok) return null
      const ct = res.headers.get('content-type') ?? ''
      if (ct.includes('text/html')) return null
      const buf = await res.arrayBuffer()
      return await loader.parseAsync(buf, '')
    } catch {
      return null
    }
  })()

  glbCache.set(url, p)
  return p
}
