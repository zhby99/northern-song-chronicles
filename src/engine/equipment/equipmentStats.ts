import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import { computeEquippedArtsTotals, computeSingleArtBonus } from '../../data/playerMartialArts'
import type {
  EquipmentSlotKey,
  EquipmentStatBonus,
  EquippedArtsMap,
  EquippedSlotsMap,
  LearnedArtEntry,
  MartialArtSlotKey,
  MountKey,
} from '../../types/game'

export interface WeaponSynergyMatchItem {
  slot: MartialArtSlotKey
  artId: string
  artName: string
  category: string
  pct: number
  isSignature: boolean
  bonusAttack: number
}

export function computeWeaponArtSynergy(
  weaponId: string | null | undefined,
  equippedArts: EquippedArtsMap,
  learnedArts: LearnedArtEntry[],
): {
  totalSynergyAttack: number
  matches: WeaponSynergyMatchItem[]
} {
  if (!weaponId) return { totalSynergyAttack: 0, matches: [] }
  const def = ITEM_DB_MAP[weaponId]
  const wpn = def?.weaponMeta
  if (!wpn) return { totalSynergyAttack: 0, matches: [] }

  const lvMap = new Map<string, number>()
  for (const e of learnedArts) {
    lvMap.set(e.artId, e.level)
  }

  const moveSlots: MartialArtSlotKey[] = ['move1', 'move2', 'move3', 'move4']
  const matches: WeaponSynergyMatchItem[] = []
  let totalSynergyAttack = 0

  for (const slot of moveSlots) {
    const aid = equippedArts[slot]
    if (!aid) continue
    const art = MARTIAL_ART_DB_MAP[aid]
    if (!art) continue

    const catRule = wpn.synergies.find((s) => art.category.includes(s.category))
    const isSig = wpn.signatureArtIds.includes(aid)
    if (!catRule && !isSig) continue

    const pct = (catRule?.bonusPct ?? 0) + (isSig ? 12 : 0)
    const lv = lvMap.get(aid) ?? 1
    const baseArtBonus = computeSingleArtBonus(art, lv, slot)
    const bonusAttack = Math.max(
      2,
      Math.round((baseArtBonus.attack + (wpn.equipBonus.attack ?? 0) * 0.35) * (pct / 100)),
    )

    totalSynergyAttack += bonusAttack
    matches.push({
      slot,
      artId: aid,
      artName: art.cleanName,
      category: art.category,
      pct,
      isSignature: isSig,
      bonusAttack,
    })
  }

  return { totalSynergyAttack, matches }
}

export function computeEquipmentTotals(equipped: EquippedSlotsMap): Required<
  Omit<EquipmentStatBonus, 'mountKey' | 'skills'>
> & {
  mountKey: MountKey
  skills: Record<string, number>
  /** 配饰雅器提供的【颜值】（先天禀赋，不计入十艺字典） */
  charm: number
} {
  const totals = {
    charm: 0,
    maxHp: 0,
    maxMp: 0,
    agility: 0,
    res: 0,
    attack: 0,
    defense: 0,
    riding: 0,
    wuxing: 0,
    mountKey: 'walk' as MountKey,
    skills: {} as Record<string, number>,
  }

  for (const slot of Object.keys(equipped) as EquipmentSlotKey[]) {
    const itemId = equipped[slot]
    if (!itemId) continue
    const def = ITEM_DB_MAP[itemId]
    const b = def?.equipBonus
    if (!b) continue

    totals.maxHp += b.maxHp ?? 0
    totals.maxMp += b.maxMp ?? 0
    totals.agility += b.agility ?? 0
    totals.res += b.res ?? 0
    totals.attack += b.attack ?? 0
    totals.defense += b.defense ?? 0
    totals.riding += b.riding ?? 0
    totals.wuxing += b.wuxing ?? 0
    if (slot === 'mount') {
      if (def.mountMeta) {
        totals.mountKey = def.mountMeta.id as MountKey
      } else if (b.mountKey) {
        totals.mountKey = b.mountKey
      }
    }
    if (b.skills) {
      for (const [k, v] of Object.entries(b.skills)) {
        // 数据源把配饰的 +颜值 记在 skills 里；颜值是先天禀赋，单独汇总，不污染十艺字典
        if (k === '颜值') {
          totals.charm += v
          continue
        }
        totals.skills[k] = (totals.skills[k] ?? 0) + v
      }
    }
  }

  return totals
}

/**
 * 有效先天禀赋 = 裸身禀赋 + 披挂加成（悟性 / 颜值）+ 运使武学加成（根骨 / 颜值，传入武学时计入）。
 */
export function getEffectiveTalents(
  talents: { 根骨: number; 悟性: number; 颜值: number },
  equipped: EquippedSlotsMap,
  equippedArts?: EquippedArtsMap | null,
  learnedArts?: LearnedArtEntry[] | null,
): { 根骨: number; 悟性: number; 颜值: number } {
  const equipTotals = computeEquipmentTotals(equipped)
  const artTotals =
    equippedArts && learnedArts ? computeEquippedArtsTotals(equippedArts, learnedArts) : null
  return {
    根骨: talents.根骨 + (artTotals?.constitution ?? 0),
    悟性: talents.悟性 + equipTotals.wuxing,
    颜值: talents.颜值 + equipTotals.charm + (artTotals?.charm ?? 0),
  }
}
