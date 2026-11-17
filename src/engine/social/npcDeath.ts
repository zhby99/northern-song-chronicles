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

/** 过滤出仍在世的名录人物 */
export function filterLivingNpcs<T extends { id: string }>(
  npcs: readonly T[],
  deadNpcIds: readonly string[] | null | undefined,
): T[] {
  if (!deadNpcIds || deadNpcIds.length === 0) return [...npcs]
  return npcs.filter((n) => !deadNpcIds.includes(n.id))
}

/** 统计一组驻留人物 ID 中仍在世者数量 */
export function countLivingNpcIds(
  npcIds: readonly string[] | null | undefined,
  deadNpcIds: readonly string[] | null | undefined,
): number {
  if (!npcIds) return 0
  if (!deadNpcIds || deadNpcIds.length === 0) return npcIds.length
  return npcIds.filter((id) => !deadNpcIds.includes(id)).length
}
