import { NPCS_DB, NPC_DB_MAP, REGION_DB_MAP } from '../../data/gameDb'
import type { CompiledNpcRecord, NodeNpc, SectRankLevel } from '../../types/game'
import { npcFromDb } from '../npcFactory'
import { INITIAL_NPC_FAVOR, MIN_NPC_FAVOR } from '../social/npcFavor'
import { getSectRule } from './rules'

export function getSectMonthlyStipend(sectId: string | null | undefined, rank: SectRankLevel): number {
  const stipends = getSectRule(sectId)?.monthlyStipends
  if (!stipends || stipends.length === 0) return 0
  return stipends[rank - 1] ?? stipends[stipends.length - 1] ?? 0
}

/**
 * Compute monthly military stipend for SECT-22 常山枪派 based on current sect rank.
 */
export function getChangshanMonthlyStipend(rank: SectRankLevel): number {
  return getSectMonthlyStipend('SECT-22', rank)
}

/**
 * Compute monthly official stipend for SECT-17 开封府 / 六扇门 based on current rank.
 */
export function getKaifengMonthlyStipend(rank: SectRankLevel): number {
  return getSectMonthlyStipend('SECT-17', rank)
}

/**
 * Compute monthly military stipend for SECT-33 大宋禁军 based on current rank.
 */
export function getImperialGuardMonthlyStipend(rank: SectRankLevel): number {
  return getSectMonthlyStipend('SECT-33', rank)
}

/**
 * Check whether an NPC is an official of the Northern Song Court eligible to be robbed
 * for the "纳投名状" quest of SECT-18 太行/京东绿林盟.
 * Excludes imperial monarchs/consorts (NPC-0001..0005).
 */
const IMPERIAL_ROYAL_IDS = new Set(['NPC-0001', 'NPC-0002', 'NPC-0003', 'NPC-0004', 'NPC-0005'])

export function isSongOfficialForRobbery(npc: {
  id?: string
  factionId?: string
}): boolean {
  if (npc.id && IMPERIAL_ROYAL_IDS.has(npc.id)) return false
  const dbNpc = npc.id ? NPC_DB_MAP[npc.id] : undefined
  const fid = npc.factionId ?? dbNpc?.factionId
  return fid === 'ORG-02' || fid === 'ORG-03' || fid === 'SECT-17' || fid === 'SECT-33'
}

/**
 * Check whether an NPC belongs to Great Song ("所有大宋的人") for the -30 favorability
 * penalty when voluntarily deserting SECT-22 常山枪派.
 */
const NON_SONG_FACTION_IDS = new Set([
  'ORG-06', // 大辽朝廷与北院
  'ORG-07', // 西夏朝廷
  'ORG-08', // 大理皇室
  'ORG-09', // 吐蕃诸部与密宗
  'ORG-10', // 高昌回鹘与西域诸国
  'ORG-11', // 海外番商与流求高丽
  'SECT-18', // 太行/京东绿林盟
  'SECT-19', // 星宿派
  'SECT-20', // 一品堂 / 辽国武林暗桩
])

export function isSongAlignedNpc(npc: CompiledNpcRecord): boolean {
  if (NON_SONG_FACTION_IDS.has(npc.factionId)) return false
  if (
    npc.factionId === 'ORG-01' ||
    npc.factionId === 'ORG-02' ||
    npc.factionId === 'ORG-03' ||
    npc.factionId === 'ORG-04' ||
    npc.factionId === 'ORG-05' ||
    npc.factionId === 'SECT-17' ||
    npc.factionId === 'SECT-33'
  ) {
    return true
  }
  const reg = REGION_DB_MAP[npc.regionId]
  return reg?.regime === 'song'
}

export function applySongLiaoSuspicionFavorPenalty(
  currentFavorMap: Record<string, number>,
  penalty = 30,
): { nextFavor: Record<string, number>; affectedCount: number } {
  const nextFavor: Record<string, number> = { ...currentFavorMap }
  let affectedCount = 0
  for (const npc of NPCS_DB) {
    if (!isSongAlignedNpc(npc)) continue
    const cur = nextFavor[npc.id] ?? INITIAL_NPC_FAVOR
    nextFavor[npc.id] = Math.max(MIN_NPC_FAVOR, cur - penalty)
    affectedCount += 1
  }
  return { nextFavor, affectedCount }
}

export function buildZhanZhaoArrestNodeNpc(): NodeNpc {
  const zhan = npcFromDb('NPC-0140', {
    talk: '“大胆绿林狂徒，劫掠朝廷命官，名列开封府海捕文书，竟还敢踏入东京汴梁城门！巨阙出鞘，束手就擒吧！”',
  })
  if (zhan) {
    const dbRec = NPC_DB_MAP['NPC-0140']
    return {
      ...zhan,
      title: dbRec ? `${dbRec.factionName} · ${dbRec.role}` : zhan.title,
    }
  }
  return {
    id: 'NPC-0140',
    name: '展昭',
    title: '开封府 · 御前四品带刀护卫',
    realm: '一流高手',
    factionId: 'SECT-17',
    factionName: '开封府 / 六扇门',
    stats: { hp: 3973, mp: 3627, agi: 69, res: 59, isBenchmark: false },
    talk: '“大胆狂徒，劫掠朝廷命官后竟敢踏入开封府！拿命来！”',
  }
}
