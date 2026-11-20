import { describe, expect, it } from 'vitest'
import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import { buildNodeNpcFromCompiledId } from '../npcFactory'
import {
  buildNpcCombatant,
  createCombatSession,
  createSeededRng,
  getMoveActionsAvailability,
  resolveCombatRound,
} from '../combat'
import { setGameRng } from '../combat/rng'

function guardRoundDamageTaken(guardLevel: number, seed: number): { taken: number; mpSpent: number; npcHpLost: number; attackerExposed: boolean } {
  const rng = createSeededRng(seed)
  setGameRng(rng)
  const base = buildNpcCombatant(buildNodeNpcFromCompiledId('NPC-0101')!, { unitId: 'ally-0', team: 'ally' })
  // 去掉双方内功与轻功特效，只量《金刚不坏体神功》本身的减伤
  const player = {
    ...base,
    isPlayer: true,
    equippedArts: { ...base.equippedArts, neigong: null, qinggong: null },
    learnedArts: base.learnedArts.map((a) => (a.artId === 'MA-018' ? { ...a, level: guardLevel } : a)),
  }
  const npcNode = {
    ...buildNodeNpcFromCompiledId('NPC-0110')!, // 乔峰，只运《降龙十八掌》
    equippedArts: { neigong: null, qinggong: null, move1: 'MA-005', move2: null, move3: null, move4: null },
  }
  const s0 = createCombatSession({ mode: 'duel', player, npcNode })
  const guardSlot = (Object.entries(s0.player.equippedArts).find(([, v]) => v === 'MA-018')![0]) as 'move2'
  const s1 = resolveCombatRound(s0, { type: 'move', slot: guardSlot }, rng)
  setGameRng(null)
  return { taken: s0.player.hp - s1.player.hp, mpSpent: s0.player.mp - s1.player.mp, npcHpLost: s0.npc.hp - s1.npc.hp, attackerExposed: s1.npc.exposed }
}

describe('《金刚不坏体神功》天阶外功主动护体', () => {
  it('数据：天阶中品外功，无伤害，每重免伤 9%（10 重 90%）', () => {
    const art = MARTIAL_ART_DB_MAP['MA-018']!
    expect(art.category).toBe('外功')
    expect(art.fullTier).toBe('天阶中品')
    art.levels!.forEach((lv) => {
      expect(lv.physicalDamage ?? 0).toBe(0)
      expect(lv.specialEffects?.find((f) => f.id === 'jingang_guard')?.value).toBe(lv.level * 9)
    })
  })

  it('招式栏：伤害 0、耗内 0', () => {
    const c = buildNpcCombatant(buildNodeNpcFromCompiledId('NPC-0101')!)
    const guard = getMoveActionsAvailability(c).find((m) => m.art?.id === 'MA-018')!
    expect(guard.moveDamage).toBe(0)
    expect(guard.mpCost).toBe(0)
  })

  it('施展当回合按守御结算：不伤敌、回内力、诱敌破绽，并在受创减半之外按重数再减免', () => {
    const ratios: number[] = []
    for (let seed = 1; seed <= 60; seed++) {
      const lv1 = guardRoundDamageTaken(1, seed)
      const lv10 = guardRoundDamageTaken(10, seed)
      expect(lv10.npcHpLost).toBe(0)
      expect(lv10.mpSpent).toBeLessThanOrEqual(0) // 不耗内（满内力时回内被上限截住）
      if (lv10.taken > 0) expect(lv10.attackerExposed).toBe(true) // 出招打在金身上招老力竭
      if (lv1.taken > 0 && lv10.taken > 0) ratios.push(lv10.taken / lv1.taken)
    }
    expect(ratios.length).toBeGreaterThan(10)
    // 同一随机种子下：10 重（免伤 90%）所受伤害约为 1 重（免伤 9%）的 0.1/0.91 ≈ 0.11
    for (const r of ratios) {
      expect(r).toBeGreaterThan(0.07)
      expect(r).toBeLessThan(0.16)
    }
  })
})
