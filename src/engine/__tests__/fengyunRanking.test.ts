import { describe, expect, it } from 'vitest'
import { NPC_DB_MAP } from '../../data/gameDb'
import {
  buildFengyunBoard,
  computeHeroMartialPower,
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
  it('前 100 位按战力降序，名次连续；初出江湖的少侠榜上无名', () => {
    const board = buildFengyunBoard({ heroPower: freshHero(), deadNpcIds: [] })
    expect(board.entries).toHaveLength(FENGYUN_BOARD_SIZE)
    board.entries.forEach((e, i) => {
      expect(e.rank).toBe(i + 1)
      if (i > 0) expect(e.power.total).toBeLessThanOrEqual(board.entries[i - 1]!.power.total)
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

  it('少侠战力越过门槛即依次跻身前百 / 前五十 / 前十 / 榜首', () => {
    const base = buildFengyunBoard({ heroPower: freshHero(), deadNpcIds: [] })
    for (const n of [100, 50, 10, 1] as const) {
      const hero = { ...freshHero(), total: base.thresholds[n] + 1 }
      const b = buildFengyunBoard({ heroPower: hero, deadNpcIds: [] })
      expect(b.heroRank).toBeLessThanOrEqual(n)
      expect(b.entries.find((e) => e.isHero)?.rank).toBe(b.heroRank)
    }
    const champ = buildFengyunBoard({ heroPower: { ...freshHero(), total: base.thresholds[1] + 1 }, deadNpcIds: [] })
    expect(getFengyunTitle(champ.heroRank)).toBe('天下第一')
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
