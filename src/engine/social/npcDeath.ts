import { NPC_DB_MAP } from '../../data/gameDb'

/**
 * 名录 NPC 的生死状态：被主角在生死决斗中击杀、或剧情效果 `markNpcsDead` 判定身故的人物，
 * 从各地建筑名册、地图任务标记、游历宗师与江湖风闻中移除，不可再交谈 / 切磋 / 赠礼。
 */
export function isNpcDead(
  deadNpcIds: readonly string[] | null | undefined,
  npcId: string | null | undefined,
): boolean {
  return Boolean(npcId && deadNpcIds && deadNpcIds.includes(npcId))
}

/** 追加一名身故人物（仅接受名录内 NPC，重复调用幂等） */
export function withNpcMarkedDead(deadNpcIds: readonly string[], npcId: string | null | undefined): string[] {
  if (!npcId || !NPC_DB_MAP[npcId] || deadNpcIds.includes(npcId)) return [...deadNpcIds]
  return [...deadNpcIds, npcId]
}

/** 批量判定身故（如太行剿匪终幕太行一支全员伏诛）；未知 ID 忽略，重复幂等 */
export function withNpcsMarkedDead(
  deadNpcIds: readonly string[],
  npcIds: readonly string[],
): string[] {
  return npcIds.reduce<string[]>((acc, id) => withNpcMarkedDead(acc, id), [...deadNpcIds])
}

/**
 * 判断名录 NPC 是否因身故或剧情逃遁而不应在常规地图建筑中现身。
 */
export function isNpcAbsentFromWorld(
  npcId: string | null | undefined,
  deadNpcIds: readonly string[] | null | undefined,
  questFlags?: Record<string, unknown> | null,
): boolean {
  if (isNpcDead(deadNpcIds, npcId)) return true
  if (npcId === 'NPC-0104' && questFlags?.jj_mr2_murongbo_fled) return true
  if (questFlags?.jj_mr3_yanziwu_razed && npcId) {
    if (npcId === 'NPC-0120') return true
    const rec = NPC_DB_MAP[npcId]
    if (rec && (rec.factionId === 'SECT-10' || rec.regionId === 'yanziwu')) return true
  }
  if (npcId === 'NPC-0110' && questFlags?.jj_final3_xiaofeng_departed) return true
  return false
}

/** 过滤出仍在世（且未因剧情遁走）的名录人物 */
export function filterLivingNpcs<T extends { id: string }>(
  npcs: readonly T[],
  deadNpcIds: readonly string[] | null | undefined,
  questFlags?: Record<string, unknown> | null,
): T[] {
  const hasDead = Boolean(deadNpcIds && deadNpcIds.length > 0)
  const hasFledFlag = Boolean(
    questFlags?.jj_mr2_murongbo_fled ||
      questFlags?.jj_mr3_yanziwu_razed ||
      questFlags?.jj_final3_xiaofeng_departed,
  )
  if (!hasDead && !hasFledFlag) return [...npcs]
  return npcs.filter((n) => !isNpcAbsentFromWorld(n.id, deadNpcIds, questFlags))
}

/** 统计一组驻留人物 ID 中仍在世（且未因剧情遁走）者数量 */
export function countLivingNpcIds(
  npcIds: readonly string[] | null | undefined,
  deadNpcIds: readonly string[] | null | undefined,
  questFlags?: Record<string, unknown> | null,
): number {
  if (!npcIds) return 0
  const hasDead = Boolean(deadNpcIds && deadNpcIds.length > 0)
  const hasFledFlag = Boolean(
    questFlags?.jj_mr2_murongbo_fled ||
      questFlags?.jj_mr3_yanziwu_razed ||
      questFlags?.jj_final3_xiaofeng_departed,
  )
  if (!hasDead && !hasFledFlag) return npcIds.length
  return npcIds.filter((id) => !isNpcAbsentFromWorld(id, deadNpcIds, questFlags)).length
}
