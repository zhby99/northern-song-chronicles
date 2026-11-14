import { useSyncExternalStore } from 'react'

export type CombatSfxVfxKind =
  | 'sword'
  | 'blade'
  | 'palm'
  | 'finger'
  | 'polearm'
  | 'hidden'
  | 'sonic'
  | 'poison'
  | 'guard'
  | 'heal'
  | 'escape'

const STORAGE_KEY_SFX_ENABLED = 'nsc_combat_sfx_enabled_v1'

let sfxEnabled = (() => {
  try {
    const v = localStorage.getItem(STORAGE_KEY_SFX_ENABLED)
    return v === null ? true : v === '1'
  } catch {
    return true
  }
})()

const listeners = new Set<() => void>()

function emitSfxChange() {
  for (const fn of listeners) fn()
}

export function isCombatSfxEnabled(): boolean {
  return sfxEnabled
}

export function setCombatSfxEnabled(enabled: boolean): void {
  sfxEnabled = enabled
  try {
    localStorage.setItem(STORAGE_KEY_SFX_ENABLED, enabled ? '1' : '0')
  } catch {
    // ignore
  }
  emitSfxChange()
}

export function toggleCombatSfxEnabled(): boolean {
  const next = !sfxEnabled
  setCombatSfxEnabled(next)
  return next
}

function subscribeSfx(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

export function useCombatSfxEnabled(): boolean {
  return useSyncExternalStore(subscribeSfx, isCombatSfxEnabled)
}

// ============================================================================
// Web Audio 武侠拟音合成引擎（木构厅堂混响 + 金石兵刃/罡风掌雷/古琴编钟）
// ============================================================================

let sfxCtx: AudioContext | null = null
let masterBus: GainNode | null = null
let dryBus: GainNode | null = null
let wetBus: GainNode | null = null
let sharedNoiseBuffer: AudioBuffer | null = null

function ensureSfxGraph(): {
  ctx: AudioContext
  out: AudioNode
  noise: AudioBuffer
} | null {
  if (!sfxEnabled || typeof window === 'undefined') return null
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null

  if (!sfxCtx) {
    sfxCtx = new Ctor()
    const comp = sfxCtx.createDynamicsCompressor()
    comp.threshold.value = -14
    comp.knee.value = 18
    comp.ratio.value = 4
    comp.attack.value = 0.003
    comp.release.value = 0.16

    masterBus = sfxCtx.createGain()
    masterBus.gain.value = 0.78

    dryBus = sfxCtx.createGain()
    dryBus.gain.value = 0.84

    wetBus = sfxCtx.createGain()
    wetBus.gain.value = 0.24

    // 0.28s 宋式木构庭院短混响脉冲，消除电子干涩感
    const irLen = Math.floor(sfxCtx.sampleRate * 0.28)
    const irBuf = sfxCtx.createBuffer(2, irLen, sfxCtx.sampleRate)
    for (let ch = 0; ch < 2; ch += 1) {
      const data = irBuf.getChannelData(ch)
      for (let i = 0; i < irLen; i += 1) {
        const env = Math.pow(1 - i / irLen, 2.8)
        data[i] = (Math.random() * 2 - 1) * env * 0.55
      }
    }
    const convolver = sfxCtx.createConvolver()
    convolver.buffer = irBuf

    // 2s 共享宽频噪声源供风声/刃鸣/掌雷滤波复用
    const nLen = Math.floor(sfxCtx.sampleRate * 2.0)
    sharedNoiseBuffer = sfxCtx.createBuffer(1, nLen, sfxCtx.sampleRate)
    const nData = sharedNoiseBuffer.getChannelData(0)
    let b0 = 0
    let b1 = 0
    let b2 = 0
    for (let i = 0; i < nLen; i += 1) {
      const white = Math.random() * 2 - 1
      b0 = 0.99765 * b0 + white * 0.099046
      b1 = 0.963 * b1 + white * 0.2965164
      b2 = 0.57 * b2 + white * 0.0526913
      nData[i] = Math.max(-1, Math.min(1, white * 0.55 + (b0 + b1 + b2) * 0.14))
    }

    dryBus.connect(comp)
    wetBus.connect(convolver)
    convolver.connect(comp)
    comp.connect(masterBus)
    masterBus.connect(sfxCtx.destination)
  }

  if (sfxCtx.state === 'suspended') {
    void sfxCtx.resume().catch(() => {})
  }

  if (!dryBus || !wetBus || !sharedNoiseBuffer) return null

  // 创建每次发声的分路汇流节点（同时馈入干声与庭院混响）
  const send = sfxCtx.createGain()
  send.gain.value = 1.0
  send.connect(dryBus)
  send.connect(wetBus)

  return { ctx: sfxCtx, out: send, noise: sharedNoiseBuffer }
}

/**
 * 辅助：滤波风声/气浪爆发（破空挥砍、掌风呼啸、轻功掠影）
 */
function triggerFilteredNoise(
  ctx: AudioContext,
  out: AudioNode,
  noise: AudioBuffer,
  opts: {
    startTime: number
    duration: number
    filterType: BiquadFilterType
    freqStart: number
    freqEnd: number
    q?: number
    peakGain: number
    attack?: number
  },
) {
  const src = ctx.createBufferSource()
  src.buffer = noise
  src.loop = true

  const filter = ctx.createBiquadFilter()
  filter.type = opts.filterType
  filter.Q.setValueAtTime(opts.q ?? 2.2, opts.startTime)
  filter.frequency.setValueAtTime(Math.max(40, opts.freqStart), opts.startTime)
  filter.frequency.exponentialRampToValueAtTime(
    Math.max(40, opts.freqEnd),
    opts.startTime + opts.duration,
  )

  const g = ctx.createGain()
  const atk = opts.attack ?? Math.min(0.018, opts.duration * 0.2)
  g.gain.setValueAtTime(0.0001, opts.startTime)
  g.gain.linearRampToValueAtTime(opts.peakGain, opts.startTime + atk)
  g.gain.exponentialRampToValueAtTime(0.0001, opts.startTime + opts.duration)

  src.connect(filter)
  filter.connect(g)
  g.connect(out)

  const randOffset = Math.random() * 0.8
  src.start(opts.startTime, randOffset, opts.duration + 0.03)
}

/**
 * 辅助：战鼓 / 胸膛闷雷低频重击（Sub-bass Drum / Palm Thud）
 */
function triggerSubPunch(
  ctx: AudioContext,
  out: AudioNode,
  startTime: number,
  freqStart: number,
  freqEnd: number,
  duration: number,
  peakGain: number,
) {
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freqStart, startTime)
  osc.frequency.exponentialRampToValueAtTime(Math.max(24, freqEnd), startTime + duration)

  const body = ctx.createOscillator()
  body.type = 'triangle'
  body.frequency.setValueAtTime(freqStart * 1.45, startTime)
  body.frequency.exponentialRampToValueAtTime(Math.max(30, freqEnd * 1.2), startTime + duration * 0.7)

  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, startTime)
  g.gain.linearRampToValueAtTime(peakGain, startTime + 0.006)
  g.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

  const gBody = ctx.createGain()
  gBody.gain.setValueAtTime(peakGain * 0.38, startTime)
  gBody.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.65)

  osc.connect(g)
  body.connect(gBody)
  g.connect(out)
  gBody.connect(out)

  osc.start(startTime)
  osc.stop(startTime + duration + 0.02)
  body.start(startTime)
  body.stop(startTime + duration + 0.02)
}

/**
 * 辅助：金石兵刃/青铜编钟/招架火星泛音簇
 */
function triggerMetallicClang(
  ctx: AudioContext,
  out: AudioNode,
  startTime: number,
  baseFreq: number,
  ratios: number[],
  duration: number,
  peakGain: number,
) {
  ratios.forEach((ratio, idx) => {
    const osc = ctx.createOscillator()
    osc.type = idx % 2 === 0 ? 'triangle' : 'sine'
    const f = baseFreq * ratio
    osc.frequency.setValueAtTime(f, startTime)
    osc.frequency.exponentialRampToValueAtTime(f * 0.985, startTime + duration)

    const g = ctx.createGain()
    const amp = (peakGain / ratios.length) * (idx === 0 ? 1.45 : Math.pow(0.76, idx))
    const decay = duration * Math.pow(0.82, idx * 0.6)
    g.gain.setValueAtTime(0.0001, startTime)
    g.gain.linearRampToValueAtTime(amp, startTime + 0.003)
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + Math.max(0.05, decay))

    osc.connect(g)
    g.connect(out)
    osc.start(startTime)
    osc.stop(startTime + decay + 0.02)
  })
}

// ============================================================================
// 对外暴露的武侠对战音效接口
// ============================================================================

/**
 * 1. 登台开战：沉雄大鼓 + 青霜拔剑出鞘（咚——沧啷！）
 */
export function playSfxCombatStart(): void {
  const g = ensureSfxGraph()
  if (!g) return
  const { ctx, out, noise } = g
  const t = ctx.currentTime + 0.01

  // 沉雄开场战鼓两声
  triggerSubPunch(ctx, out, t, 128, 38, 0.38, 0.62)
  triggerFilteredNoise(ctx, out, noise, {
    startTime: t,
    duration: 0.09,
    filterType: 'bandpass',
    freqStart: 900,
    freqEnd: 260,
    q: 1.5,
    peakGain: 0.25,
  })

  // 拔剑出鞘寒芒滑音（0.08s 后响起）
  triggerFilteredNoise(ctx, out, noise, {
    startTime: t + 0.08,
    duration: 0.34,
    filterType: 'bandpass',
    freqStart: 1800,
    freqEnd: 5600,
    q: 7.5,
    peakGain: 0.24,
    attack: 0.04,
  })
  triggerMetallicClang(ctx, out, t + 0.11, 1046, [1, 1.51, 2.38, 3.14], 0.55, 0.26)
}

/**
 * 2. 盲选亮牌：宋杂剧檀木拍板 + 琴弦紧绷（啪·铮！）
 */
export function playSfxRevealChoices(): void {
  const g = ensureSfxGraph()
  if (!g) return
  const { ctx, out, noise } = g
  const t = ctx.currentTime + 0.005

  // 檀木拍板清脆短击
  triggerMetallicClang(ctx, out, t, 780, [1, 1.58, 2.42], 0.085, 0.34)
  triggerFilteredNoise(ctx, out, noise, {
    startTime: t,
    duration: 0.055,
    filterType: 'bandpass',
    freqStart: 2200,
    freqEnd: 1100,
    q: 3.2,
    peakGain: 0.28,
    attack: 0.002,
  })
  // 低音古琴拨弦定势
  triggerMetallicClang(ctx, out, t + 0.04, 220, [1, 2, 3.01], 0.28, 0.2)
}

/**
 * 3. 外功出招破空 + 命中打击（按十一类兵刃拳脚差异化拟音，区分暴击/天阶/守御格挡）
 */
export function playSfxAttackImpact(
  kind: CombatSfxVfxKind,
  opts: { isCrit?: boolean; isGuarded?: boolean; isHeavenTier?: boolean } = {},
): void {
  const g = ensureSfxGraph()
  if (!g) return
  const { ctx, out, noise } = g
  const t = ctx.currentTime + 0.005
  const hitT = t + 0.11
  const boost = opts.isCrit ? 1.28 : opts.isHeavenTier ? 1.15 : 1.0

  // (A) 起手破空前奏 (0 ~ 110ms) + (B) 命中实感打击 (110ms ~)
  switch (kind) {
    case 'sword': {
      // 清越剑气裂空 + 寒铁透甲
      triggerFilteredNoise(ctx, out, noise, {
        startTime: t,
        duration: 0.16,
        filterType: 'bandpass',
        freqStart: 1600,
        freqEnd: 5200,
        q: 5.5,
        peakGain: 0.28 * boost,
      })
      triggerMetallicClang(ctx, out, hitT, 1318, [1, 1.46, 2.19, 3.08], 0.36, 0.32 * boost)
      triggerSubPunch(ctx, out, hitT, 165, 46, 0.2, 0.42 * boost)
      break
    }
    case 'blade': {
      // 沉猛大刀劈风 + 入肉重斩
      triggerFilteredNoise(ctx, out, noise, {
        startTime: t,
        duration: 0.18,
        filterType: 'bandpass',
        freqStart: 950,
        freqEnd: 240,
        q: 2.0,
        peakGain: 0.38 * boost,
      })
      triggerMetallicClang(ctx, out, hitT, 660, [1, 1.37, 1.93, 2.74], 0.28, 0.3 * boost)
      triggerSubPunch(ctx, out, hitT, 150, 34, 0.28, 0.62 * boost)
      break
    }
    case 'palm': {
      // 呼啸罡风 + 胸雷震鼓（降龙/六阳掌感）
      triggerFilteredNoise(ctx, out, noise, {
        startTime: t,
        duration: 0.22,
        filterType: 'lowpass',
        freqStart: 1100,
        freqEnd: 160,
        q: 3.0,
        peakGain: 0.44 * boost,
      })
      triggerSubPunch(ctx, out, hitT, 138, 28, 0.36, 0.76 * boost)
      triggerFilteredNoise(ctx, out, noise, {
        startTime: hitT,
        duration: 0.18,
        filterType: 'bandpass',
        freqStart: 520,
        freqEnd: 130,
        q: 1.4,
        peakGain: 0.42 * boost,
        attack: 0.004,
      })
      break
    }
    case 'finger': {
      // 一阳指/六脉神剑：尖锐破空指风 + 穴道爆鸣
      triggerFilteredNoise(ctx, out, noise, {
        startTime: t,
        duration: 0.13,
        filterType: 'bandpass',
        freqStart: 2600,
        freqEnd: 6400,
        q: 9.0,
        peakGain: 0.26 * boost,
      })
      triggerMetallicClang(ctx, out, hitT, 1760, [1, 1.5, 2.02], 0.22, 0.28 * boost)
      triggerSubPunch(ctx, out, hitT, 210, 52, 0.18, 0.48 * boost)
      break
    }
    case 'polearm': {
      // 呼啸哨棒/长枪甩击 + 筋骨闷响
      triggerFilteredNoise(ctx, out, noise, {
        startTime: t,
        duration: 0.16,
        filterType: 'bandpass',
        freqStart: 700,
        freqEnd: 1850,
        q: 3.5,
        peakGain: 0.35 * boost,
      })
      triggerMetallicClang(ctx, out, hitT, 420, [1, 1.62, 2.35], 0.16, 0.34 * boost)
      triggerSubPunch(ctx, out, hitT, 158, 38, 0.25, 0.6 * boost)
      break
    }
    case 'hidden': {
      // 连珠寒星破空三连音
      for (let i = 0; i < 3; i += 1) {
        const st = t + i * 0.042
        triggerFilteredNoise(ctx, out, noise, {
          startTime: st,
          duration: 0.065,
          filterType: 'bandpass',
          freqStart: 3200,
          freqEnd: 5800,
          q: 8.0,
          peakGain: 0.22 * boost,
          attack: 0.003,
        })
        triggerMetallicClang(ctx, out, st + 0.05, 1980 + i * 240, [1, 1.41], 0.14, 0.2 * boost)
      }
      triggerSubPunch(ctx, out, hitT + 0.04, 180, 55, 0.16, 0.38 * boost)
      break
    }
    case 'sonic': {
      // 宫商角徵羽古琴杀伐泛音 + 气劲震荡
      const chord = [293.66, 392.0, 440.0, 587.33]
      chord.forEach((freq, idx) => {
        triggerMetallicClang(ctx, out, t + idx * 0.028, freq, [1, 2, 3.01, 4.02], 0.48, 0.22 * boost)
      })
      triggerSubPunch(ctx, out, hitT + 0.02, 125, 42, 0.28, 0.5 * boost)
      break
    }
    case 'poison': {
      // 奇毒蚀脉嘶鸣 + 阴冷腐蚀低震
      triggerFilteredNoise(ctx, out, noise, {
        startTime: t,
        duration: 0.32,
        filterType: 'bandpass',
        freqStart: 4200,
        freqEnd: 1200,
        q: 4.8,
        peakGain: 0.3 * boost,
      })
      triggerMetallicClang(ctx, out, hitT, 311.13, [1, 1.19, 1.68], 0.32, 0.24 * boost)
      triggerSubPunch(ctx, out, hitT, 115, 36, 0.24, 0.42 * boost)
      break
    }
    default: {
      triggerSubPunch(ctx, out, hitT, 145, 40, 0.24, 0.55 * boost)
      break
    }
  }

  // (C) 若守方处于【守御架势】：叠加金钟铁盾招架巨响（铛——！）
  if (opts.isGuarded) {
    triggerMetallicClang(ctx, out, hitT + 0.01, 523.25, [1, 1.52, 2.27, 2.94], 0.46, 0.36)
  }

  // (D) 若触发【正中要害暴击】：叠加雷霆重低音与金石震鸣！
  if (opts.isCrit) {
    triggerSubPunch(ctx, out, hitT + 0.015, 98, 24, 0.42, 0.65)
    triggerMetallicClang(ctx, out, hitT + 0.015, 880, [1, 1.498, 2.24, 3.18], 0.52, 0.28)
  }
}

/**
 * 4. 轻功闪避：衣袂掠风潇洒滑开（唰——！）
 */
export function playSfxDodge(): void {
  const g = ensureSfxGraph()
  if (!g) return
  const { ctx, out, noise } = g
  const t = ctx.currentTime + 0.005

  triggerFilteredNoise(ctx, out, noise, {
    startTime: t,
    duration: 0.24,
    filterType: 'bandpass',
    freqStart: 650,
    freqEnd: 2800,
    q: 3.6,
    peakGain: 0.32,
    attack: 0.03,
  })
  triggerFilteredNoise(ctx, out, noise, {
    startTime: t + 0.08,
    duration: 0.16,
    filterType: 'highpass',
    freqStart: 2200,
    freqEnd: 4800,
    q: 1.5,
    peakGain: 0.14,
  })
}

/**
 * 5. 沉腰守御架势：踏步沉气 + 金钟气罩嗡鸣
 */
export function playSfxGuardStance(): void {
  const g = ensureSfxGraph()
  if (!g) return
  const { ctx, out } = g
  const t = ctx.currentTime + 0.005

  triggerSubPunch(ctx, out, t, 105, 42, 0.22, 0.42)
  triggerMetallicClang(ctx, out, t + 0.02, 349.23, [1, 1.5, 2.0], 0.34, 0.2)
}

/**
 * 6. 探囊服食灵丹：玉瓶拔塞 + 清越五声回春泛音
 */
export function playSfxHealMedicine(): void {
  const g = ensureSfxGraph()
  if (!g) return
  const { ctx, out } = g
  const t = ctx.currentTime + 0.005

  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((freq, i) => {
    triggerMetallicClang(ctx, out, t + i * 0.055, freq, [1, 2.0], 0.36, 0.2)
  })
}

/**
 * 7. 神功异象（斗转反震 / 北冥吸内 / 独孤破招 / 点穴封脉）
 */
export function playSfxSpecialPulse(): void {
  const g = ensureSfxGraph()
  if (!g) return
  const { ctx, out } = g
  const t = ctx.currentTime + 0.005
  triggerMetallicClang(ctx, out, t, 587.33, [1, 1.498, 2.25, 3.0], 0.42, 0.28)
  triggerSubPunch(ctx, out, t + 0.02, 130, 48, 0.22, 0.35)
}

/**
 * 8. 胜负终局定音：凯旋编钟战鼓 / 惜败暮鼓铜磬 / 飘然轻功脱战
 */
export function playSfxCombatEnd(outcome: 'player_win' | 'npc_win' | 'draw' | 'escaped'): void {
  const g = ensureSfxGraph()
  if (!g) return
  const { ctx, out, noise } = g
  const t = ctx.currentTime + 0.01

  if (outcome === 'player_win') {
    // 宫商角徵羽凯旋编钟 + 战鼓定音
    const fanfare = [392.0, 440.0, 523.25, 659.25, 783.99]
    fanfare.forEach((freq, idx) => {
      const st = t + idx * 0.075
      triggerMetallicClang(ctx, out, st, freq, [1, 1.5, 2.01, 2.98], 0.65, 0.24)
    })
    triggerSubPunch(ctx, out, t, 120, 36, 0.35, 0.55)
    triggerSubPunch(ctx, out, t + 0.3, 135, 32, 0.55, 0.68)
  } else if (outcome === 'escaped') {
    triggerFilteredNoise(ctx, out, noise, {
      startTime: t,
      duration: 0.38,
      filterType: 'bandpass',
      freqStart: 500,
      freqEnd: 3400,
      q: 3.0,
      peakGain: 0.34,
    })
  } else {
    // 沉厚铜磬点到为止余韵
    triggerSubPunch(ctx, out, t, 96, 30, 0.55, 0.52)
    triggerMetallicClang(ctx, out, t + 0.02, 261.63, [1, 1.414, 1.86, 2.54], 0.85, 0.26)
  }
}
