/**
 * 将数值夹紧到 [min, max] 区间内。
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

/**
 * 将未知输入安全解析为整数并夹紧到 [min, max] 区间；若非有限数值则返回 fallback。
 */
export function clampInt(val: unknown, min: number, max: number, fallback: number): number {
  if (typeof val !== 'number' || !Number.isFinite(val)) return fallback
  return Math.max(min, Math.min(max, Math.floor(val)))
}
