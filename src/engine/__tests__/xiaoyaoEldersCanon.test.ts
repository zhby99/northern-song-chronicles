import { describe, expect, it } from 'vitest'
import { NPCS_DB, NPC_DB_MAP } from '../../data/gameDb'

/**
 * 逍遥三老只会原著明写的武学（另依设定特许：无崖子 七弦无形剑、李秋水 凌波微步），
 * 余下空槽以三老合创的地阶上品武学补足；七弦无形剑之外不得串用彼此的标志武学。
 */
const ALLOWED: Record<string, string[]> = {
  // 无崖子：北冥神功、小无相功、凌波微步、七弦无形剑 + 逍遥游剑、齐物指、梦蝶掌
  'NPC-0106': ['MA-002', 'MA-012', 'MA-010', 'MA-033', 'MA-248', 'MA-249', 'MA-251'],
  // 巫行云：八荒六合唯我独尊功、天山折梅手、天山六阳掌 + 缥缈御风步、逍遥游剑、齐物指
  'NPC-0102': ['MA-009', 'MA-014', 'MA-015', 'MA-250', 'MA-248', 'MA-249'],
  // 李秋水：小无相功、白虹掌力、凌波微步 + 逍遥游剑、齐物指、梦蝶掌
  'NPC-0103': ['MA-012', 'MA-027', 'MA-010', 'MA-248', 'MA-249', 'MA-251'],
}

describe('逍遥三老武学按原著收束', () => {
  for (const [id, allowed] of Object.entries(ALLOWED)) {
    it(`${NPC_DB_MAP[id]!.name} 只会、只运使允许的武学`, () => {
      const rec = NPC_DB_MAP[id]!
      const learned = rec.learnedArts.map((a) => a.artId)
      const equipped = Object.values(rec.equippedArts).filter(Boolean) as string[]
      expect(learned.filter((a) => !allowed.includes(a))).toEqual([])
      expect(equipped.filter((a) => !allowed.includes(a))).toEqual([])
      expect(rec.knownArtIds.filter((a) => !allowed.includes(a))).toEqual([])
      expect(rec.equippedArts.neigong).toBeTruthy()
      expect(rec.equippedArts.qinggong).toBeTruthy()
      // 四个招式槽全部补满
      expect(['move1', 'move2', 'move3', 'move4'].every((k) => rec.equippedArts[k as 'move1'])).toBe(true)
    })
  }

  it('三老合创武学（MA-248~251）不被其他人物自动配给', () => {
    const others = NPCS_DB.filter(
      (n) => !(n.id in ALLOWED) && n.learnedArts.some((a) => ['MA-248', 'MA-249', 'MA-250', 'MA-251'].includes(a.artId)),
    )
    expect(others.map((n) => n.name)).toEqual([])
  })
})
