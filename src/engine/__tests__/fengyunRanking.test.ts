import { describe, expect, it } from 'vitest'
import { NPC_DB_MAP } from '../../data/gameDb'
import {
  buildFengyunBoard,
  computeHeroMartialPower,
  describeFengyunGap,
  computeMartialPower,
  FENGYUN_BOARD_SIZE,
  getFengyunTitle,
} from '../stats/fengyunRanking'
import { useGameStore } from '../../store/useGameStore'

const freshHero = () => {
  const s = useGameStore.getState()
  return computeHeroMartialPower({
    baseStats: s.baseStats,
    equipped: s.equipped,
    equippedArts: s.equippedArts,
    learnedArts: s.learnedArts,
  })
}

describe('天下风云榜', () => {
  it('前 100 位名次连续；初出江湖的少侠榜上无名', () => {
    const board = buildFengyunBoard({ heroPower: freshHero(), deadNpcIds: [] })
    expect(board.entries).toHaveLength(FENGYUN_BOARD_SIZE)
    board.entries.forEach((e, i) => {
      expect(e.rank).toBe(i + 1)
    })
    expect(board.heroRank).toBeGreaterThan(FENGYUN_BOARD_SIZE)
    expect(board.entries.some((e) => e.isHero)).toBe(false)
    expect(getFengyunTitle(board.heroRank)).toBe('榜上无名')
  })

  it('已身故的人物不再入榜，后位者递补', () => {
    const before = buildFengyunBoard({ heroPower: freshHero(), deadNpcIds: [] })
    const topId = before.entries[0]!.npc!.id
    const after = buildFengyunBoard({ heroPower: freshHero(), deadNpcIds: [topId] })
    expect(after.entries.some((e) => e.npc?.id === topId)).toBe(false)
    expect(after.entries[0]!.npc!.id).toBe(before.entries[1]!.npc!.id)
  })

  it('法空（全游戏唯一大宗师上品）稳居榜首；先比境界、同境界再比战力', () => {
    const board = buildFengyunBoard({ heroPower: freshHero(), deadNpcIds: [] })
    expect(board.entries[0]!.npc!.id).toBe('NPC-0101')
    board.entries.forEach((e, i) => {
      if (i === 0) return
      const prev = board.entries[i - 1]!.power
      expect(e.power.realmRank).toBeLessThanOrEqual(prev.realmRank)
      if (e.power.realmRank === prev.realmRank) expect(e.power.total).toBeLessThanOrEqual(prev.total)
    })
  })

  it('少侠越过门槛人物（境界与战力）即依次跻身前百 / 前五十 / 前十 / 榜首', () => {
    const base = buildFengyunBoard({ heroPower: freshHero(), deadNpcIds: [] })
    for (const n of [100, 50, 10, 1] as const) {
      const t = base.thresholds[n]!
      const hero = { ...freshHero(), realmRank: t.realmRank, realmLabel: t.realmLabel, total: t.total + 1 }
      const b = buildFengyunBoard({ heroPower: hero, deadNpcIds: [] })
      expect(b.heroRank).toBeLessThanOrEqual(n)
      expect(b.entries.find((e) => e.isHero)?.rank).toBe(b.heroRank)
      expect(describeFengyunGap(hero, t)).toBeNull()
      if (n === 1) expect(getFengyunTitle(b.heroRank)).toBe('天下第一')
    }
    // 境界不足时，战力再高也只提示境界
    const t1 = base.thresholds[1]!
    expect(describeFengyunGap({ ...freshHero(), total: 999999 }, t1)).toContain(t1.realmLabel)
  })

  it('武学品阶重数与天阶特效计入战力：同四维下，天阶十重远胜凡品一重', () => {
    const rec = NPC_DB_MAP['NPC-0110']! // 乔峰
    const moveArt = rec.equippedArts.move1!
    const common = { maxHp: 3000, maxMp: 3000, agility: 60, res: 60, totalAttack: 100, totalDefense: 100 }
    const low = computeMartialPower({ ...common, equippedArts: { ...rec.equippedArts }, learnedArts: rec.learnedArts.map((a) => ({ ...a, level: 1 })) })
    const high = computeMartialPower({ ...common, equippedArts: { ...rec.equippedArts }, learnedArts: rec.learnedArts.map((a) => ({ ...a, level: 10 })) })
    expect(moveArt).toBeTruthy()
    expect(high.arts).toBeGreaterThan(low.arts)
    expect(high.total).toBeGreaterThan(low.total)
  })
})
