import * as THREE from 'three'
import type { ArenaActor3D, SectArchetype3D, WeaponArchetype3D } from './types'

interface SectPalette {
  robe: number
  trim: number
  sash: number
  hair: number
  skin: number
}

const SECT_PALETTES: Record<SectArchetype3D, SectPalette> = {
  swordsman: { robe: 0x2a4d69, trim: 0xd9b26f, sash: 0x8f1d14, hair: 0x1b1714, skin: 0xe6c3a5 },
  shaolin_monk: { robe: 0xb45309, trim: 0xfbbf24, sash: 0x7c2d12, hair: 0xd6b08d, skin: 0xdfb898 },
  taoist: { robe: 0x1e3a5f, trim: 0xe2e8f0, sash: 0x38bdf8, hair: 0x1c1917, skin: 0xe6c3a5 },
  beggar: { robe: 0x57534e, trim: 0xa8a29e, sash: 0x78350f, hair: 0x292524, skin: 0xdba982 },
  imperial_guard: { robe: 0x7f1d1d, trim: 0xf59e0b, sash: 0xfef3c7, hair: 0x18181b, skin: 0xe4be9e },
  western_monk: { robe: 0x6b1d2f, trim: 0xfacc15, sash: 0xd97706, hair: 0x27272a, skin: 0xd8ad8a },
  emei_heroine: { robe: 0x0f766e, trim: 0xfde68a, sash: 0xf472b6, hair: 0x171717, skin: 0xf0d2bc },
  poison_adept: { robe: 0x4c1d95, trim: 0xc084fc, sash: 0x22c55e, hair: 0x18181b, skin: 0xd9bea8 },
}

/**
 * 两段骨骼 IK 解算器（遵循 `characters-animation.md`：指定手脚目标点 + 肘膝提示方向，不靠猜关节欧拉角）。
 */
function solveTwoBoneIK(
  rootPos: THREE.Vector3,
  targetPos: THREE.Vector3,
  len1: number,
  len2: number,
  poleHint: THREE.Vector3,
): { mid: THREE.Vector3; end: THREE.Vector3 } {
  const toTarget = targetPos.clone().sub(rootPos)
  const rawDist = toTarget.length()
  const maxReach = Math.max(0.01, (len1 + len2) * 0.995)
  const minReach = Math.abs(len1 - len2) + 0.01
  const dist = Math.max(minReach, Math.min(maxReach, rawDist))
  const dir = rawDist > 0.0001 ? toTarget.divideScalar(rawDist) : new THREE.Vector3(0, -1, 0)

  const cosA = THREE.MathUtils.clamp((len1 * len1 + dist * dist - len2 * len2) / (2 * len1 * dist), -1, 1)
  const sinA = Math.sqrt(Math.max(0, 1 - cosA * cosA))

  const bendDir = poleHint
    .clone()
    .addScaledVector(dir, -poleHint.dot(dir))
  if (bendDir.lengthSq() < 0.0001) {
    bendDir.set(0, 0, 1)
  } else {
    bendDir.normalize()
  }

  const mid = rootPos
    .clone()
    .addScaledVector(dir, len1 * cosA)
    .addScaledVector(bendDir, len1 * sinA)
  const end = rootPos.clone().addScaledVector(dir, dist)
  return { mid, end }
}

function orientSegment(
  mesh: THREE.Object3D,
  from: THREE.Vector3,
  to: THREE.Vector3,
): void {
  const mid = from.clone().add(to).multiplyScalar(0.5)
  mesh.position.copy(mid)
  const dir = to.clone().sub(from)
  const len = dir.length()
  if (len > 0.0001) {
    dir.divideScalar(len)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
  }
}

function createWeaponMesh(kind: WeaponArchetype3D): THREE.Group {
  const g = new THREE.Group()
  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xdbeafe,
    metalness: 0.85,
    roughness: 0.22,
    emissive: 0x0f172a,
  })
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.78,
    roughness: 0.28,
  })
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x5c3a21,
    roughness: 0.72,
  })

  if (kind === 'sword' || kind === 'hidden') {
    const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, 0.22, 8), woodMat)
    hilt.position.y = 0.08
    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.032, 0.05), goldMat)
    guard.position.y = 0.19
    const blade = new THREE.Mesh(new THREE.ConeGeometry(0.034, 0.92, 4), steelMat)
    blade.scale.set(0.45, 1, 1.35)
    blade.position.y = 0.65
    g.add(hilt, guard, blade)
  } else if (kind === 'blade') {
    const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.028, 0.26, 8), woodMat)
    hilt.position.y = 0.1
    const guard = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.025, 10), goldMat)
    guard.position.y = 0.23
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.88, 0.11), steelMat)
    blade.position.set(0, 0.68, 0.02)
    g.add(hilt, guard, blade)
  } else if (kind === 'spear') {
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, 1.55, 8), woodMat)
    shaft.position.y = 0.52
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.34, 6), steelMat)
    tip.position.y = 1.44
    const tassel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.05, 0.14, 8),
      new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.6 }),
    )
    tassel.position.y = 1.24
    g.add(shaft, tip, tassel)
  } else if (kind === 'staff') {
    const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 1.68, 10), woodMat)
    staff.position.y = 0.56
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.012, 8, 14), goldMat)
    ring.position.y = 1.38
    g.add(staff, ring)
  } else if (kind === 'fan') {
    const rib = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.24, 0.42, 6, 1, false, -0.7, 1.4),
      new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.5, side: THREE.DoubleSide }),
    )
    rib.position.y = 0.24
    g.add(rib)
  } else {
    const bracer = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.058, 0.24, 10), goldMat)
    bracer.position.y = 0.04
    g.add(bracer)
  }

  g.traverse((obj) => {
    if (obj instanceof THREE.Mesh) obj.castShadow = true
  })
  return g
}

export class CharacterRig3D {
  readonly root = new THREE.Group()
  private readonly bodyGroup = new THREE.Group()
  private readonly torsoMesh: THREE.Mesh
  private readonly skirtMesh: THREE.Mesh
  private readonly headGroup = new THREE.Group()
  private readonly leftUpperArm: THREE.Mesh
  private readonly leftForeArm: THREE.Mesh
  private readonly rightUpperArm: THREE.Mesh
  private readonly rightForeArm: THREE.Mesh
  private readonly leftThigh: THREE.Mesh
  private readonly leftShin: THREE.Mesh
  private readonly rightThigh: THREE.Mesh
  private readonly rightShin: THREE.Mesh
  private readonly handWeaponMount = new THREE.Group()
  private readonly backWeaponMount = new THREE.Group()
  private readonly weaponMesh: THREE.Group
  private readonly ringMesh: THREE.Mesh
  private readonly counterHaloMesh: THREE.Mesh
  private readonly robeMat: THREE.MeshStandardMaterial
  private externalModel: THREE.Object3D | null = null
  private externalMaterials: THREE.MeshStandardMaterial[] = []
  private extBones: {
    hips?: THREE.Object3D
    spine?: THREE.Object3D
    head?: THREE.Object3D
    lArm?: THREE.Object3D
    lForeArm?: THREE.Object3D
    rArm?: THREE.Object3D
    rForeArm?: THREE.Object3D
    rHand?: THREE.Object3D
    lUpLeg?: THREE.Object3D
    lLeg?: THREE.Object3D
    rUpLeg?: THREE.Object3D
    rLeg?: THREE.Object3D
  } = {}
  private extBindQuats = new Map<THREE.Object3D, THREE.Quaternion>()
  private extLocalAxes = {
    lArmDown: new THREE.Vector3(0, 0, 1),
    rArmDown: new THREE.Vector3(0, 0, -1),
    lArmFwd: new THREE.Vector3(0, 1, 0),
    rArmFwd: new THREE.Vector3(0, -1, 0),
    lElbowBend: new THREE.Vector3(0, 1, 0),
    rElbowBend: new THREE.Vector3(0, -1, 0),
    lLegSwing: new THREE.Vector3(1, 0, 0),
    rLegSwing: new THREE.Vector3(1, 0, 0),
    lKneeBend: new THREE.Vector3(1, 0, 0),
    rKneeBend: new THREE.Vector3(1, 0, 0),
    spinePitch: new THREE.Vector3(1, 0, 0),
    spineYaw: new THREE.Vector3(0, 1, 0),
  }
  private extBasePos = new THREE.Vector3()

  private readonly tmpLShoulder = new THREE.Vector3()
  private readonly tmpRShoulder = new THREE.Vector3()
  private readonly tmpLHip = new THREE.Vector3()
  private readonly tmpRHip = new THREE.Vector3()

  constructor(actor: ArenaActor3D) {
    const pal = SECT_PALETTES[actor.stats.sectArchetype]
    this.robeMat = new THREE.MeshStandardMaterial({
      color: pal.robe,
      roughness: 0.65,
      metalness: 0.1,
    })
    const trimMat = new THREE.MeshStandardMaterial({
      color: pal.trim,
      roughness: 0.4,
      metalness: 0.45,
    })
    const sashMat = new THREE.MeshStandardMaterial({
      color: pal.sash,
      roughness: 0.55,
    })
    const skinMat = new THREE.MeshStandardMaterial({ color: pal.skin, roughness: 0.65 })
    const hairMat = new THREE.MeshStandardMaterial({ color: pal.hair, roughness: 0.72 })

    // 脚底指示环（敌我辨识）
    this.ringMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.46, 0.58, 32),
      new THREE.MeshBasicMaterial({
        color: actor.team === 'ally' ? 0x38bdf8 : 0xf87171,
        transparent: true,
        opacity: actor.isPlayer ? 0.85 : 0.55,
        side: THREE.DoubleSide,
      }),
    )
    this.ringMesh.rotation.x = -Math.PI / 2
    this.ringMesh.position.y = 0.025
    this.root.add(this.ringMesh)

    // 破招处决提示金环
    this.counterHaloMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.68, 0.88, 32),
      new THREE.MeshBasicMaterial({
        color: 0xfacc15,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      }),
    )
    this.counterHaloMesh.rotation.x = -Math.PI / 2
    this.counterHaloMesh.position.y = 0.035
    this.root.add(this.counterHaloMesh)

    // 联系阴影椭圆
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.45, 24),
      new THREE.MeshBasicMaterial({
        color: 0x090705,
        transparent: true,
        opacity: 0.48,
      }),
    )
    shadow.rotation.x = -Math.PI / 2
    shadow.position.y = 0.015
    this.root.add(shadow)

    // 躯干与衣摆
    this.torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.17, 0.56, 12), this.robeMat)
    this.torsoMesh.position.y = 1.1
    this.torsoMesh.castShadow = true

    const sash = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.19, 0.12, 12), sashMat)
    sash.position.y = 0.88

    this.skirtMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.31, 0.46, 12, 1, true), this.robeMat)
    this.skirtMesh.position.y = 0.66
    this.skirtMesh.castShadow = true

    // 头部与北宋发髻/斗笠
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.145, 14, 12), skinMat)
    head.castShadow = true
    this.headGroup.add(head)
    if (actor.stats.sectArchetype !== 'shaolin_monk' && actor.stats.sectArchetype !== 'western_monk') {
      const hair = new THREE.Mesh(new THREE.SphereGeometry(0.152, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.58), hairMat)
      const bun = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.09, 10), hairMat)
      bun.position.set(0, 0.17, -0.02)
      const crown = new THREE.Mesh(new THREE.TorusGeometry(0.052, 0.012, 6, 12), trimMat)
      crown.rotation.x = Math.PI / 2
      crown.position.set(0, 0.145, -0.02)
      this.headGroup.add(hair, bun, crown)
    }
    this.headGroup.position.set(0, 1.54, 0)

    this.bodyGroup.add(this.torsoMesh, sash, this.skirtMesh, this.headGroup)

    // 四肢两段骨骼圆柱
    const armGeo = new THREE.CylinderGeometry(0.052, 0.044, 0.28, 8)
    const foreGeo = new THREE.CylinderGeometry(0.044, 0.036, 0.26, 8)
    const thighGeo = new THREE.CylinderGeometry(0.072, 0.058, 0.38, 8)
    const shinGeo = new THREE.CylinderGeometry(0.055, 0.042, 0.38, 8)

    this.leftUpperArm = new THREE.Mesh(armGeo, this.robeMat)
    this.leftForeArm = new THREE.Mesh(foreGeo, trimMat)
    this.rightUpperArm = new THREE.Mesh(armGeo, this.robeMat)
    this.rightForeArm = new THREE.Mesh(foreGeo, trimMat)
    this.leftThigh = new THREE.Mesh(thighGeo, this.robeMat)
    this.leftShin = new THREE.Mesh(shinGeo, sashMat)
    this.rightThigh = new THREE.Mesh(thighGeo, this.robeMat)
    this.rightShin = new THREE.Mesh(shinGeo, sashMat)

    for (const m of [
      this.leftUpperArm,
      this.leftForeArm,
      this.rightUpperArm,
      this.rightForeArm,
      this.leftThigh,
      this.leftShin,
      this.rightThigh,
      this.rightShin,
    ]) {
      m.castShadow = true
      this.bodyGroup.add(m)
    }

    this.weaponMesh = createWeaponMesh(actor.stats.weaponArchetype)
    this.handWeaponMount.add(this.weaponMesh)
    this.bodyGroup.add(this.handWeaponMount)
    this.bodyGroup.add(this.backWeaponMount)

    this.root.add(this.bodyGroup)
    this.root.position.set(actor.x, 0, actor.z)
    this.root.rotation.y = actor.yaw
  }

  attachExternalGlb(model: THREE.Object3D): void {
    if (this.externalModel) {
      this.root.remove(this.externalModel)
    }
    this.externalModel = model
    this.externalMaterials = []
    this.extBones = {}
    this.extBindQuats.clear()
    this.bodyGroup.visible = false
    this.root.add(model)
    model.updateMatrixWorld(true)
    this.extBasePos.copy(model.position)

    const findBone = (patterns: string[]): THREE.Object3D | undefined => {
      let found: THREE.Object3D | undefined
      model.traverse((obj) => {
        if (found) return
        const n = obj.name.toLowerCase()
        if (patterns.some((p) => n === p || n.endsWith(`:${p}`) || n.includes(p))) {
          found = obj
        }
      })
      return found
    }

    model.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        if (obj.material instanceof THREE.MeshStandardMaterial) {
          const clonedMat = obj.material.clone()
          obj.material = clonedMat
          this.externalMaterials.push(clonedMat)
        } else if (Array.isArray(obj.material)) {
          obj.material = obj.material.map((m) => {
            if (m instanceof THREE.MeshStandardMaterial) {
              const cm = m.clone()
              this.externalMaterials.push(cm)
              return cm
            }
            return m
          })
        }
      }
    })

    this.extBones = {
      hips: findBone(['mixamorig:hips', 'hips']),
      spine: findBone(['mixamorig:spine1', 'mixamorig:spine', 'spine1', 'spine']),
      head: findBone(['mixamorig:head', 'head']),
      lArm: findBone(['mixamorig:leftarm', 'leftarm']),
      lForeArm: findBone(['mixamorig:leftforearm', 'leftforearm']),
      rArm: findBone(['mixamorig:rightarm', 'rightarm']),
      rForeArm: findBone(['mixamorig:rightforearm', 'rightforearm']),
      rHand: findBone(['mixamorig:righthand', 'righthand']),
      lUpLeg: findBone(['mixamorig:leftupleg', 'leftupleg']),
      lLeg: findBone(['mixamorig:leftleg', 'leftleg']),
      rUpLeg: findBone(['mixamorig:rightupleg', 'rightupleg']),
      rLeg: findBone(['mixamorig:rightleg', 'rightleg']),
    }

    for (const b of Object.values(this.extBones)) {
      if (b) this.extBindQuats.set(b, b.quaternion.clone())
    }

    // 根据绑定姿势世界坐标计算每根骨骼的精确局部旋转轴（防止 T-Pose 放臂反向或拧麻花）
    const worldAxisToBoneLocal = (bone: THREE.Object3D, worldAxis: THREE.Vector3): THREE.Vector3 => {
      const qWorld = new THREE.Quaternion()
      bone.getWorldQuaternion(qWorld)
      return worldAxis.clone().applyQuaternion(qWorld.invert()).normalize()
    }

    const computeBoneDir = (from?: THREE.Object3D, to?: THREE.Object3D): THREE.Vector3 | null => {
      if (!from || !to) return null
      const p1 = new THREE.Vector3()
      const p2 = new THREE.Vector3()
      from.getWorldPosition(p1)
      to.getWorldPosition(p2)
      const d = p2.sub(p1)
      return d.lengthSq() > 0.0001 ? d.normalize() : null
    }

    const lArmDir = computeBoneDir(this.extBones.lArm, this.extBones.lForeArm)
    if (this.extBones.lArm && lArmDir) {
      const downAxisW = lArmDir.clone().cross(new THREE.Vector3(0, -1, 0)).normalize()
      if (downAxisW.lengthSq() > 0.01) {
        this.extLocalAxes.lArmDown = worldAxisToBoneLocal(this.extBones.lArm, downAxisW)
      }
      const fwdAxisW = lArmDir.clone().cross(new THREE.Vector3(0, 0, 1)).normalize()
      if (fwdAxisW.lengthSq() > 0.01) {
        this.extLocalAxes.lArmFwd = worldAxisToBoneLocal(this.extBones.lArm, fwdAxisW)
      }
    }

    const rArmDir = computeBoneDir(this.extBones.rArm, this.extBones.rForeArm)
    if (this.extBones.rArm && rArmDir) {
      const downAxisW = rArmDir.clone().cross(new THREE.Vector3(0, -1, 0)).normalize()
      if (downAxisW.lengthSq() > 0.01) {
        this.extLocalAxes.rArmDown = worldAxisToBoneLocal(this.extBones.rArm, downAxisW)
      }
      const fwdAxisW = rArmDir.clone().cross(new THREE.Vector3(0, 0, 1)).normalize()
      if (fwdAxisW.lengthSq() > 0.01) {
        this.extLocalAxes.rArmFwd = worldAxisToBoneLocal(this.extBones.rArm, fwdAxisW)
      }
    }

    if (this.extBones.lForeArm) {
      this.extLocalAxes.lElbowBend = worldAxisToBoneLocal(this.extBones.lForeArm, new THREE.Vector3(0, -1, 0))
    }
    if (this.extBones.rForeArm) {
      this.extLocalAxes.rElbowBend = worldAxisToBoneLocal(this.extBones.rForeArm, new THREE.Vector3(0, 1, 0))
    }
    if (this.extBones.lUpLeg) {
      this.extLocalAxes.lLegSwing = worldAxisToBoneLocal(this.extBones.lUpLeg, new THREE.Vector3(-1, 0, 0))
    }
    if (this.extBones.rUpLeg) {
      this.extLocalAxes.rLegSwing = worldAxisToBoneLocal(this.extBones.rUpLeg, new THREE.Vector3(-1, 0, 0))
    }
    if (this.extBones.lLeg) {
      this.extLocalAxes.lKneeBend = worldAxisToBoneLocal(this.extBones.lLeg, new THREE.Vector3(1, 0, 0))
    }
    if (this.extBones.rLeg) {
      this.extLocalAxes.rKneeBend = worldAxisToBoneLocal(this.extBones.rLeg, new THREE.Vector3(1, 0, 0))
    }
    if (this.extBones.spine) {
      this.extLocalAxes.spinePitch = worldAxisToBoneLocal(this.extBones.spine, new THREE.Vector3(1, 0, 0))
      this.extLocalAxes.spineYaw = worldAxisToBoneLocal(this.extBones.spine, new THREE.Vector3(0, 1, 0))
    }
  }

  private applyBoneRot(
    bone: THREE.Object3D | undefined,
    axis1: THREE.Vector3,
    ang1: number,
    axis2?: THREE.Vector3,
    ang2 = 0,
  ): void {
    if (!bone) return
    const bind = this.extBindQuats.get(bone)
    if (!bind) return
    const q = bind.clone()
    if (Math.abs(ang1) > 0.0001) {
      q.multiply(new THREE.Quaternion().setFromAxisAngle(axis1, ang1))
    }
    if (axis2 && Math.abs(ang2) > 0.0001) {
      q.multiply(new THREE.Quaternion().setFromAxisAngle(axis2, ang2))
    }
    bone.quaternion.copy(q)
  }

  private updateExternalModel(actor: ArenaActor3D, time: number): void {
    const model = this.externalModel
    if (!model) return

    if (actor.actionState === 'defeated') {
      model.position.set(this.extBasePos.x, this.extBasePos.y + 0.18, this.extBasePos.z)
      model.rotation.set(-Math.PI / 2.2, model.rotation.y, 0)
      return
    }
    model.rotation.x = 0

    const progress =
      actor.actionDuration > 0 ? Math.min(1, actor.actionTimer / actor.actionDuration) : 0

    let hipY = 0
    let spinePitch = 0.06
    let spineYaw = 0
    // 默认收拢 T-Pose：双臂自然垂落微屈护于身前（约 1.15 rad 下垂）
    let lArmDown = 1.12
    let rArmDown = 1.12
    let lArmFwd = 0.28
    let rArmFwd = 0.35
    let lElbow = 0.55
    let rElbow = 0.65
    let lLegFwd = 0.1
    let rLegFwd = -0.08
    let lKnee = 0.08
    let rKnee = 0.12

    if (actor.actionState === 'idle') {
      const breath = Math.sin(time * 2.5 + actor.x) * 0.025
      hipY = breath
      lArmFwd += breath * 1.2
      rArmFwd += breath * 1.2
    } else if (actor.actionState === 'move') {
      const cyc = time * 11
      const stride = Math.sin(cyc)
      hipY = Math.abs(stride) * 0.045
      spinePitch = 0.18
      lLegFwd = stride * 0.52
      rLegFwd = -stride * 0.52
      lKnee = Math.max(0, -Math.cos(cyc)) * 0.6
      rKnee = Math.max(0, Math.cos(cyc)) * 0.6
      lArmFwd = 0.25 - stride * 0.48
      rArmFwd = 0.25 + stride * 0.48
      lElbow = 0.75
      rElbow = 0.75
    } else if (actor.actionState === 'windup') {
      hipY = -0.06 * progress
      spinePitch = -0.1 * progress
      spineYaw = -0.38 * progress
      rArmDown = 0.85
      rArmFwd = -0.35 * progress
      rElbow = 0.9
      lArmFwd = 0.55 * progress
    } else if (actor.actionState === 'coil') {
      hipY = -0.1
      spinePitch = -0.14
      spineYaw = -0.48
      rArmDown = 0.75
      rArmFwd = -0.45
      rElbow = 1.05
      lArmFwd = 0.65
    } else if (actor.actionState === 'slash' || actor.actionState === 'execute') {
      const q = 1 - Math.pow(1 - progress, 4)
      hipY = -0.04 + q * 0.04
      spinePitch = 0.26 * q
      spineYaw = -0.42 + 0.95 * q
      rArmDown = 0.92
      rArmFwd = -0.35 + 1.45 * q
      rElbow = 0.25
      lArmFwd = 0.5 - 0.7 * q
    } else if (actor.actionState === 'follow') {
      const k = 1 - progress
      spinePitch = 0.18 * k
      spineYaw = 0.45 * k
      rArmFwd = 0.9 * k + 0.3 * progress
    } else if (actor.actionState === 'guard' || actor.actionState === 'parry_success') {
      hipY = -0.05
      spinePitch = 0.08
      spineYaw = -0.2
      rArmDown = 0.85
      lArmDown = 0.85
      rArmFwd = 0.95
      lArmFwd = 0.88
      rElbow = 1.15
      lElbow = 1.15
    } else if (actor.actionState === 'dodge') {
      hipY = -0.12
      spinePitch = 0.36
      lArmFwd = -0.45
      rArmFwd = -0.45
      lLegFwd = 0.45
      rLegFwd = -0.45
    } else if (actor.actionState === 'stagger') {
      hipY = -0.08
      spinePitch = -0.3
      lArmDown = 0.65
      rArmDown = 0.65
      lArmFwd = 0.1
      rArmFwd = 0.1
    }

    model.position.set(this.extBasePos.x, this.extBasePos.y + hipY, this.extBasePos.z)
    this.applyBoneRot(this.extBones.spine, this.extLocalAxes.spinePitch, spinePitch, this.extLocalAxes.spineYaw, spineYaw)
    this.applyBoneRot(this.extBones.lArm, this.extLocalAxes.lArmDown, lArmDown, this.extLocalAxes.lArmFwd, lArmFwd)
    this.applyBoneRot(this.extBones.rArm, this.extLocalAxes.rArmDown, rArmDown, this.extLocalAxes.rArmFwd, rArmFwd)
    this.applyBoneRot(this.extBones.lForeArm, this.extLocalAxes.lElbowBend, lElbow)
    this.applyBoneRot(this.extBones.rForeArm, this.extLocalAxes.rElbowBend, rElbow)
    this.applyBoneRot(this.extBones.lUpLeg, this.extLocalAxes.lLegSwing, lLegFwd)
    this.applyBoneRot(this.extBones.rUpLeg, this.extLocalAxes.rLegSwing, rLegFwd)
    this.applyBoneRot(this.extBones.lLeg, this.extLocalAxes.lKneeBend, lKnee)
    this.applyBoneRot(this.extBones.rLeg, this.extLocalAxes.rKneeBend, rKnee)
  }

  update(actor: ArenaActor3D, time: number): void {
    this.root.position.set(actor.x, 0, actor.z)
    this.root.rotation.y = actor.yaw

    // 受击闪红反馈（同步至程序化素体与外部 Tripo 3D 材质）
    if (actor.hurtFlashTimer > 0) {
      this.robeMat.emissive.setHex(0x991b1b)
      this.robeMat.emissiveIntensity = 0.85
      for (const m of this.externalMaterials) {
        m.emissive.setHex(0x991b1b)
        m.emissiveIntensity = 0.75
      }
    } else if (actor.exposedTimer > 0) {
      this.robeMat.emissive.setHex(0x78350f)
      this.robeMat.emissiveIntensity = 0.35 + Math.sin(time * 12) * 0.2
      for (const m of this.externalMaterials) {
        m.emissive.setHex(0x78350f)
        m.emissiveIntensity = 0.3 + Math.sin(time * 12) * 0.18
      }
    } else {
      this.robeMat.emissive.setHex(0x000000)
      this.robeMat.emissiveIntensity = 0
      for (const m of this.externalMaterials) {
        m.emissive.setHex(0x000000)
        m.emissiveIntensity = 0
      }
    }

    // 破招处决光环
    const haloMat = this.counterHaloMesh.material as THREE.MeshBasicMaterial
    if (actor.exposedTimer > 0 && actor.actionState === 'stagger') {
      haloMat.opacity = 0.6 + Math.sin(time * 14) * 0.25
    } else {
      haloMat.opacity = 0
    }

    if (this.externalModel) {
      this.updateExternalModel(actor, time)
      return
    }

    if (actor.actionState === 'defeated') {
      this.bodyGroup.position.set(0, 0.2, 0)
      this.bodyGroup.rotation.set(-Math.PI / 2.2, 0, 0)
      return
    }

    // 基于角色空间 (+Y 向上, +Z 向前, -X 为右手侧) 计算手脚目标位置
    const progress =
      actor.actionDuration > 0 ? Math.min(1, actor.actionTimer / actor.actionDuration) : 0
    let hipY = 0
    let torsoPitch = 0.04
    let torsoYaw = 0

    // 右手、左手、右脚、左脚在角色空间的目标坐标
    const rHand = new THREE.Vector3(-0.3, 1.0, 0.28)
    const lHand = new THREE.Vector3(0.28, 1.02, 0.24)
    const rFoot = new THREE.Vector3(-0.14, 0.04, 0.08)
    const lFoot = new THREE.Vector3(0.14, 0.04, -0.06)
    const weaponTargetDir = new THREE.Vector3(-0.15, 0.6, 0.78).normalize()

    if (actor.actionState === 'idle') {
      const breath = Math.sin(time * 2.6 + actor.x) * 0.025
      hipY = breath
      rHand.y += breath
      lHand.y += breath
    } else if (actor.actionState === 'move') {
      const stride = Math.sin(time * 11) * 0.28
      const liftR = Math.max(0, Math.cos(time * 11)) * 0.12
      const liftL = Math.max(0, -Math.cos(time * 11)) * 0.12
      hipY = Math.abs(Math.sin(time * 11)) * 0.045
      torsoPitch = 0.14
      rFoot.set(-0.14, 0.04 + liftR, stride)
      lFoot.set(0.14, 0.04 + liftL, -stride)
      rHand.set(-0.32, 0.96, 0.22 - stride * 0.45)
      lHand.set(0.3, 0.98, 0.2 + stride * 0.55)
    } else if (actor.actionState === 'windup') {
      // 起手蓄力
      hipY = -0.07 * progress
      torsoPitch = -0.1 * progress
      torsoYaw = -0.35 * progress
      rHand.set(-0.42, 1.24, -0.08)
      lHand.set(0.24, 1.1, 0.34)
      weaponTargetDir.set(-0.45, 0.8, -0.2).normalize()
    } else if (actor.actionState === 'coil') {
      // 蓄势停顿（重心最深）
      hipY = -0.11
      torsoPitch = -0.12
      torsoYaw = -0.45
      rHand.set(-0.46, 1.26, -0.14)
      lHand.set(0.25, 1.12, 0.38)
      weaponTargetDir.set(-0.5, 0.85, -0.25).normalize()
    } else if (actor.actionState === 'slash' || actor.actionState === 'execute') {
      // 四次方缓出挥砍 + 随势过冲
      const q = 1 - Math.pow(1 - progress, 4)
      hipY = -0.05 + q * 0.04
      torsoPitch = 0.22 * q
      torsoYaw = -0.4 + 0.95 * q
      rHand.set(-0.42 + 0.78 * q, 1.15 - 0.18 * q, 0.05 + 0.58 * Math.sin(q * Math.PI * 0.75))
      lHand.set(0.34, 0.98, -0.1 * q)
      weaponTargetDir.set(-0.3 + 0.85 * q, 0.15, 0.85).normalize()
    } else if (actor.actionState === 'follow') {
      hipY = -0.03 * (1 - progress)
      torsoPitch = 0.16 * (1 - progress)
      torsoYaw = 0.42 * (1 - progress)
      rHand.set(0.28 - 0.58 * progress, 0.98, 0.42 - 0.14 * progress)
      weaponTargetDir.set(0.35 * (1 - progress), 0.35, 0.85).normalize()
    } else if (actor.actionState === 'guard' || actor.actionState === 'parry_success') {
      // 兵刃贴身斜架
      hipY = -0.06
      torsoPitch = 0.08
      torsoYaw = -0.18
      rHand.set(-0.12, 1.16, 0.34)
      lHand.set(0.14, 1.14, 0.36)
      weaponTargetDir.set(0.55, 0.72, 0.15).normalize()
    } else if (actor.actionState === 'dodge') {
      hipY = -0.12
      torsoPitch = 0.36
      rHand.set(-0.34, 0.94, -0.22)
      lHand.set(0.34, 0.94, -0.22)
    } else if (actor.actionState === 'stagger') {
      hipY = -0.08
      torsoPitch = -0.28
      rHand.set(-0.45, 1.15, 0.05)
      lHand.set(0.45, 1.15, 0.05)
    }

    this.bodyGroup.position.set(0, hipY, 0)
    this.bodyGroup.rotation.set(torsoPitch, torsoYaw, 0)

    this.tmpLShoulder.set(0.23, 1.32, 0)
    this.tmpRShoulder.set(-0.23, 1.32, 0)
    this.tmpLHip.set(0.11, 0.78, 0)
    this.tmpRHip.set(-0.11, 0.78, 0)

    const rArmIk = solveTwoBoneIK(this.tmpRShoulder, rHand, 0.28, 0.26, new THREE.Vector3(-0.3, -0.3, -0.8))
    const lArmIk = solveTwoBoneIK(this.tmpLShoulder, lHand, 0.28, 0.26, new THREE.Vector3(0.3, -0.3, -0.8))
    const rLegIk = solveTwoBoneIK(this.tmpRHip, rFoot, 0.38, 0.38, new THREE.Vector3(0, 0.1, 1))
    const lLegIk = solveTwoBoneIK(this.tmpLHip, lFoot, 0.38, 0.38, new THREE.Vector3(0, 0.1, 1))

    orientSegment(this.rightUpperArm, this.tmpRShoulder, rArmIk.mid)
    orientSegment(this.rightForeArm, rArmIk.mid, rArmIk.end)
    orientSegment(this.leftUpperArm, this.tmpLShoulder, lArmIk.mid)
    orientSegment(this.leftForeArm, lArmIk.mid, lArmIk.end)

    orientSegment(this.rightThigh, this.tmpRHip, rLegIk.mid)
    orientSegment(this.rightShin, rLegIk.mid, rLegIk.end)
    orientSegment(this.leftThigh, this.tmpLHip, lLegIk.mid)
    orientSegment(this.leftShin, lLegIk.mid, lLegIk.end)

    // 武器挂在右手末梢并指向目标方向
    this.handWeaponMount.position.copy(rArmIk.end)
    this.handWeaponMount.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), weaponTargetDir)
  }
}
