import type { RollFlavorResult } from './types'

export type CombatRng = () => number
export type RngFn = CombatRng

const nativeRng: RngFn = () => Math.random()
let activeGameRng: RngFn = nativeRng

/**
 * 全局玩法随机源：战斗、时间推进、路途奇遇、社交等所有默认随机数都经由此处，
 * 测试 / 回放可通过 `setGameRng(createSeededRng(seed))` 让整局 store 行为可复现。
 */
export const gameRng: RngFn = () => activeGameRng()

/** 替换全局玩法随机源；传 `null` 恢复为 `Math.random`。 */
export function setGameRng(rng: RngFn | null): void {
  activeGameRng = rng ?? nativeRng
}

export const defaultCombatRng: CombatRng = gameRng
export const defaultRng: RngFn = gameRng

/**
 * Deterministic Mulberry32 PRNG for reproducible snapshot tests, replays, and save verification.
 */
export function createSeededRng(seed: number): CombatRng {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * 截断正态分布采样 R ~ TruncNorm(mu=1.0, sigma=0.22, min=0.50, max=1.50)
 */
export function sampleDamageRoll(rng: CombatRng = defaultCombatRng): RollFlavorResult {
  let r = 1.0
  for (let i = 0; i < 12; i += 1) {
    const u1 = Math.max(1e-7, rng())
    const u2 = rng()
    const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
    const cand = 1.0 + z * 0.22
    if (cand >= 0.5 && cand <= 1.5) {
      r = cand
      break
    }
    if (i === 11) {
      r = Math.max(0.5, Math.min(1.5, cand))
    }
  }
  const mult = Math.round(r * 100) / 100
  if (mult >= 1.35) {
    return {
      multiplier: mult,
      tag: '正中要害',
      desc: '招出如电，真劲直透死穴要害',
      isCrit: true,
    }
  }
  if (mult >= 1.12) {
    return {
      multiplier: mult,
      tag: '劲力贯满',
      desc: '内息吐纳正值巅峰，结结实实印在身上',
      isCrit: false,
    }
  }
  if (mult >= 0.88) {
    return {
      multiplier: mult,
      tag: '正面交锋',
      desc: '拳掌硬撼，实受这一记杀招',
      isCrit: false,
    }
  }
  if (mult >= 0.65) {
    return {
      multiplier: mult,
      tag: '卸去泰半',
      desc: '临危侧身挫肩，顺势化去数成力道',
      isCrit: false,
    }
  }
  return {
    multiplier: mult,
    tag: '擦衣掠过',
    desc: '招式堪堪擦身而过，仅受劲风余波震荡',
    isCrit: false,
  }
}
