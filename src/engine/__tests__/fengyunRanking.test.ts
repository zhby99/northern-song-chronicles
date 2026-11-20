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

describe('战力公式', () => {
  it('气血×1.5+内力×1.8+身法×30+抗性×30+攻击×2+防御×1.5 + 最高一门外功(品阶×重数×30) + 天阶特效×500（外功特效最多 2 条）', () => {
    // 内功 MA-001 易筋经（天阶上品）不计；外功 MA-043 般若掌 地阶上品(9) 10 重 → 2700，MA-062 龙爪手 地阶中品(8) 10 重 → 2400，只取最高一门
    const p = computeMartialPower({
      maxHp: 1000,
      maxMp: 2000,
      agility: 10,
      res: 20,
      totalAttack: 100,
      totalDefense: 50,
      equippedArts: { neigong: 'MA-001', qinggong: 'MA-057', move1: 'MA-062', move2: 'MA-043', move3: null, move4: null },
      learnedArts: [
        { artId: 'MA-001', level: 10, exp: 0 },
        { artId: 'MA-057', level: 10, exp: 0 },
        { artId: 'MA-043', level: 10, exp: 0 },
        { artId: 'MA-062', level: 10, exp: 0 },
      ],
    })
    expect(p.vitals).toBe(1500 + 3600 + 300 + 600)
    expect(p.offense).toBe(200 + 75)
    expect(p.arts).toBe(9 * 10 * 30)
    expect(p.signatureArt).toContain('般若掌')
    expect(p.heaven).toBe(p.heavenEffectCount * 500)
    expect(p.total).toBe(p.vitals + p.offense + p.arts + p.heaven)
  })
})

describe('天阶特效计数', () => {
  it('内功、轻功特效全计；四门外功特效合计最多 2 条', () => {
    const common = { maxHp: 0, maxMp: 0, agility: 0, res: 0, totalAttack: 0, totalDefense: 0 }
    // 巫行云式配置：八荒六合（内功 2 条）+ 天山折梅手（外功 2 条）+ 天山六阳掌（外功 1 条）
    const p = computeMartialPower({
      ...common,
      equippedArts: { neigong: 'MA-009', qinggong: null, move1: 'MA-014', move2: 'MA-015', move3: null, move4: null },
      learnedArts: [
        { artId: 'MA-009', level: 10, exp: 0 },
        { artId: 'MA-014', level: 10, exp: 0 },
        { artId: 'MA-015', level: 10, exp: 0 },
      ],
    })
    expect(p.heavenEffectCount).toBe(2 + 2)
    expect(p.heaven).toBe(4 * 500)
  })

  it('攻击只算最强一招及其兵器契合，不累加四招契合', () => {
    const wu = NPC_DB_MAP['NPC-0102']!
    const p = buildFengyunBoard({ heroPower: freshHero(), deadNpcIds: [] }).entries.find((e) => e.npc?.id === 'NPC-0102')!.power
    // 装备 208 + 天山折梅手 1547 + 该招契合 611 = 2366（旧算法累加三招契合为 3219）
    expect(p.offense).toBeLessThan(3219 * 2)
    expect(wu.id).toBe('NPC-0102')
  })
})
