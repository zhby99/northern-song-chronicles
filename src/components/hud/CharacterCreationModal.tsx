import { useEffect, useState } from 'react'
import { ManagedAssetImg } from '../common/ManagedAssetImg'
import {
  generateRandomHeroName,
  getProtagonistPortrait,
  PROTAGONIST_PORTRAITS,
} from '../../data/protagonistPresets'
import { useGameStore } from '../../store/useGameStore'
import type { HeroBaseStats } from '../../types/game'
import { cloneHeroBaseStats } from '../../utils/heroStats'
import { NODE_MAP, WORLD_GRAPH } from '../../utils/mapMath'

const MIN_MODAL_WIDTH = 1140
const MIN_MODAL_HEIGHT = 680
const MAX_MODAL_WIDTH = 1680
const MAX_MODAL_HEIGHT = 920

const START_CITY_GROUPS = [
  {
    label: '北宋十九府',
    cities: WORLD_GRAPH.nodes.filter((n) => n.type === 'city' && n.regime === 'song'),
  },
  {
    label: '大辽四京',
    cities: WORLD_GRAPH.nodes.filter((n) => n.type === 'city' && n.regime === 'liao'),
  },
  {
    label: '西夏 · 吐蕃 · 大理',
    cities: WORLD_GRAPH.nodes.filter(
      (n) => n.type === 'city' && n.regime !== 'song' && n.regime !== 'liao',
    ),
  },
] as const

const CIVIL_SKILL_KEYS = [
  '算术',
  '经义',
  '策论',
  '诗词',
  '琴',
  '棋',
  '书',
  '画',
  '辩才',
] as const

const INITIAL_SILVER = 150
const TALENT_BUDGET = 270
const SKILL_BUDGET = 100

const INITIAL_CREATION_STATS: HeroBaseStats = {
  talents: {
    根骨: 90,
    悟性: 90,
    颜值: 90,
  },
  maxHp: 0,
  maxMp: 0,
  agility: 0,
  res: 0,
  ridingSkill: 10,
  skills: {
    算术: 10,
    经义: 10,
    策论: 10,
    诗词: 10,
    琴: 10,
    棋: 10,
    书: 10,
    画: 10,
    辩才: 10,
  },
}

interface StatSliderRowProps {
  label: string
  value: number
  min: number
  max: number
  cappedMax?: number
  step?: number
  onChange: (val: number) => void
}

function StatSliderRow({
  label,
  value,
  min,
  max,
  cappedMax = max,
  step = 1,
  onChange,
}: StatSliderRowProps) {
  const effectiveMax = Math.max(min, Math.min(max, cappedMax))
  const clamp = (n: number) => Math.max(min, Math.min(effectiveMax, n))
  const atMin = value <= min
  const atCap = value >= effectiveMax
  return (
    <div className="flex items-center gap-2 text-xs xl:text-sm">
      <span className="w-12 xl:w-14 shrink-0 font-semibold text-[#3d2814]">{label}</span>
      <button
        type="button"
        disabled={atMin}
        onClick={() => onChange(clamp(value - step))}
        className="w-6 h-6 xl:w-7 xl:h-7 rounded border border-[#b5986e] bg-[#faf3e3] text-[#4a321a] hover:bg-[#e8d8b7] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold leading-none text-base shrink-0 cursor-pointer"
      >
        -
      </button>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        className="flex-1 accent-[#8f1d14] cursor-pointer h-2 min-w-[56px]"
      />
      <button
        type="button"
        disabled={atCap}
        onClick={() => onChange(clamp(value + step))}
        className="w-6 h-6 xl:w-7 xl:h-7 rounded border border-[#b5986e] bg-[#faf3e3] text-[#4a321a] hover:bg-[#e8d8b7] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold leading-none text-base shrink-0 cursor-pointer"
      >
        +
      </button>
      <input
        type="number"
        min={min}
        max={effectiveMax}
        value={value}
        onChange={(e) => {
          const parsed = Number(e.target.value)
          if (!Number.isNaN(parsed)) onChange(clamp(Math.round(parsed)))
        }}
        className="w-14 xl:w-16 px-1.5 py-0.5 text-right rounded border border-[#cbb693] bg-[#fffdf7] text-[#23180f] font-mono font-semibold text-xs xl:text-sm shrink-0"
      />
    </div>
  )
}

interface CharacterCreationModalProps {
  onBack?: () => void
}

export function CharacterCreationModal({ onBack }: CharacterCreationModalProps) {
  const completeCharacterCreation = useGameStore((s) => s.completeCharacterCreation)
  const openMenu = useGameStore((s) => s.openMenu)

  const [name, setName] = useState<string>(() => generateRandomHeroName())
  const [portraitId, setPortraitId] = useState<string>(PROTAGONIST_PORTRAITS[3].id)
  const [startNodeId, setStartNodeId] = useState<string>('bianliang')
  const [stats, setStats] = useState<HeroBaseStats>(() =>
    cloneHeroBaseStats(INITIAL_CREATION_STATS),
  )
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900,
  }))

  useEffect(() => {
    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const availW = Math.max(320, viewport.w - 24)
  const availH = Math.max(240, viewport.h - 24)
  const fitScale = Math.min(1, availW / MIN_MODAL_WIDTH, availH / MIN_MODAL_HEIGHT)
  const targetWidth = Math.min(
    MAX_MODAL_WIDTH,
    Math.max(MIN_MODAL_WIDTH, Math.floor(availW / fitScale)),
  )
  const targetHeight = Math.min(
    MAX_MODAL_HEIGHT,
    Math.max(MIN_MODAL_HEIGHT, Math.floor(availH / fitScale)),
  )

  const activePortrait = getProtagonistPortrait(portraitId)
  const startCityNode = NODE_MAP[startNodeId] ?? NODE_MAP.bianliang

  const talentUsed = stats.talents.根骨 + stats.talents.悟性 + stats.talents.颜值
  const talentRemaining = Math.max(0, TALENT_BUDGET - talentUsed)

  const skillUsed =
    stats.ridingSkill +
    CIVIL_SKILL_KEYS.reduce((sum, key) => sum + (stats.skills[key] ?? 0), 0)
  const skillRemaining = Math.max(0, SKILL_BUDGET - skillUsed)

  const updateTalent = (key: keyof HeroBaseStats['talents'], val: number) => {
    setStats((prev) => {
      const prevUsed = prev.talents.根骨 + prev.talents.悟性 + prev.talents.颜值
      const otherUsed = prevUsed - prev.talents[key]
      const maxAllowed = Math.min(100, TALENT_BUDGET - otherUsed)
      const clamped = Math.max(1, Math.min(maxAllowed, Math.round(val)))
      return {
        ...prev,
        talents: { ...prev.talents, [key]: clamped },
      }
    })
  }

  const updateRidingSkill = (val: number) => {
    setStats((prev) => {
      const civilUsed = CIVIL_SKILL_KEYS.reduce((sum, k) => sum + (prev.skills[k] ?? 0), 0)
      const maxAllowed = Math.min(100, SKILL_BUDGET - civilUsed)
      const clamped = Math.max(0, Math.min(maxAllowed, Math.round(val)))
      return { ...prev, ridingSkill: clamped }
    })
  }

  const updateSkill = (key: string, val: number) => {
    setStats((prev) => {
      const totalUsed =
        prev.ridingSkill +
        CIVIL_SKILL_KEYS.reduce((sum, k) => sum + (prev.skills[k] ?? 0), 0)
      const otherUsed = totalUsed - (prev.skills[key] ?? 0)
      const maxAllowed = Math.min(100, SKILL_BUDGET - otherUsed)
      const clamped = Math.max(0, Math.min(maxAllowed, Math.round(val)))
      return {
        ...prev,
        skills: { ...prev.skills, [key]: clamped },
      }
    })
  }

  const applyPreset = (mode: 'balanced' | 'martial' | 'scholar' | 'reset') => {
    if (mode === 'balanced') {
      setStats(cloneHeroBaseStats(INITIAL_CREATION_STATS))
      return
    }
    if (mode === 'martial') {
      setStats({
        talents: { 根骨: 100, 悟性: 95, 颜值: 75 },
        maxHp: 0,
        maxMp: 0,
        agility: 0,
        res: 0,
        ridingSkill: 40,
        skills: {
          算术: 10,
          经义: 10,
          策论: 10,
          诗词: 5,
          琴: 5,
          棋: 5,
          书: 5,
          画: 5,
          辩才: 5,
        },
      })
      return
    }
    if (mode === 'scholar') {
      setStats({
        talents: { 根骨: 75, 悟性: 95, 颜值: 100 },
        maxHp: 0,
        maxMp: 0,
        agility: 0,
        res: 0,
        ridingSkill: 5,
        skills: {
          算术: 10,
          经义: 15,
          策论: 15,
          诗词: 15,
          琴: 8,
          棋: 8,
          书: 8,
          画: 6,
          辩才: 10,
        },
      })
      return
    }
    setStats({
      talents: { 根骨: 1, 悟性: 1, 颜值: 1 },
      maxHp: 0,
      maxMp: 0,
      agility: 0,
      res: 0,
      ridingSkill: 0,
      skills: {
        算术: 0,
        经义: 0,
        策论: 0,
        诗词: 0,
        琴: 0,
        棋: 0,
        书: 0,
        画: 0,
        辩才: 0,
      },
    })
  }

  const handleStart = () => {
    completeCharacterCreation({
      name: name.trim() || '无名少侠',
      portraitId,
      gender: activePortrait.gender,
      silver: INITIAL_SILVER,
      startNodeId: startCityNode.id,
      baseStats: {
        ...stats,
        maxHp: 0,
        maxMp: 0,
        agility: 0,
        res: 0,
      },
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#140e09]/85 backdrop-blur-sm overflow-hidden select-none">
      <div
        style={{
          width: `${Math.round(targetWidth * fitScale)}px`,
          height: `${Math.round(targetHeight * fitScale)}px`,
        }}
        className="relative shrink-0"
      >
        <div
          style={{
            width: `${targetWidth}px`,
            height: `${targetHeight}px`,
            transform: fitScale < 1 ? `scale(${fitScale})` : undefined,
            transformOrigin: 'top left',
          }}
          className="rounded-2xl border-[3px] border-[#b5986e] bg-[#f4ead5] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* 顶部标题栏 */}
          <div className="px-5 py-2.5 bg-gradient-to-r from-[#2c1d11] via-[#412817] to-[#2c1d11] border-b-2 border-[#b5986e] flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-baseline gap-3 min-w-0 flex-wrap">
              <h2 className="song-serif text-xl xl:text-2xl font-bold text-[#f7e7c4] tracking-wider shrink-0">
                北宋立志传 · 少侠立籍
              </h2>
              <p className="text-xs xl:text-sm text-[#d6be96] truncate">
                公元 1050 年（宋仁宗皇祐二年 · 正月初一）· 少侠初出茅庐，立籍定命
              </p>
            </div>
            <span className="px-3.5 py-1 rounded-lg bg-[#8f1d14] border border-[#d6be96]/50 text-[#fff8eb] text-xs xl:text-sm font-semibold shrink-0">
              初始地：{startCityNode.name}
            </span>
          </div>

          {/* 主体内容区 */}
          <div className="flex-1 min-h-0 overflow-hidden p-3 xl:p-4 grid grid-cols-12 gap-3 xl:gap-4">
            {/* 左侧：肖像 15 选 1 + 全身预览 + 固定出身 */}
            <div className="col-span-5 min-h-0 h-full flex flex-col gap-2.5 xl:gap-3">
              <div className="flex-[52] min-h-0 bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl p-2.5 xl:p-3 flex flex-col">
                <div className="flex items-center justify-between mb-1.5 gap-2 shrink-0">
                  <span className="song-serif font-bold text-sm xl:text-base 2xl:text-lg text-[#23180f] truncate">
                    一、择选容貌（十五选一 · 男十女五）
                  </span>
                  <span className="text-xs xl:text-sm font-semibold text-[#781710] shrink-0">
                    当前：{activePortrait.label}（{activePortrait.gender}）
                  </span>
                </div>
                <div className="flex-1 min-h-0 grid grid-cols-5 grid-rows-3 gap-1.5 xl:gap-2">
                  {PROTAGONIST_PORTRAITS.map((p) => {
                    const selected = p.id === portraitId
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPortraitId(p.id)}
                        title={`${p.label}（${p.gender}）`}
                        className={`group relative min-h-0 flex flex-col rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          selected
                            ? 'border-[#8f1d14] ring-2 ring-[#8f1d14]/45 shadow-sm'
                            : 'border-[#cbb693] hover:border-[#8f1d14]/60'
                        }`}
                      >
                        <div className="relative flex-1 min-h-0 w-full bg-[#dfd0b1] overflow-hidden">
                          <ManagedAssetImg
                            url={p.avatarUrl}
                            alt={p.label}
                            className="absolute inset-0 w-full h-full object-cover object-[50%_15%] block"
                          />
                          <span
                            className={`absolute top-0.5 right-0.5 px-1 py-0.5 rounded text-[10px] font-bold leading-none shadow ${
                              p.gender === '女'
                                ? 'bg-[#8f1d14]/90 text-[#fff8eb]'
                                : 'bg-[#261910]/85 text-[#f7e7c4]'
                            }`}
                          >
                            {p.gender}
                          </span>
                        </div>
                        <div
                          className={`shrink-0 text-[11px] xl:text-xs leading-tight text-center py-0.5 truncate px-1 ${
                            selected
                              ? 'bg-[#8f1d14] text-[#fff8eb] font-bold'
                              : 'bg-[#e7d7b8]/90 text-[#3d2814]'
                          }`}
                        >
                          {p.label}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 全身立绘预览 + 固定信息 */}
              <div className="flex-[48] min-h-0 bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl p-2.5 xl:p-3 flex gap-3 items-stretch overflow-hidden">
                <div className="w-[40%] max-w-[245px] min-h-0 shrink-0 rounded-lg overflow-hidden border-2 border-[#b5986e] bg-[#f0e4cb] relative">
                  <ManagedAssetImg
                    url={activePortrait.fullbodyUrl}
                    alt={activePortrait.label}
                    className="absolute inset-0 w-full h-full object-contain object-center"
                  />
                </div>
                <div className="flex-1 min-w-0 min-h-0 flex flex-col justify-between gap-1.5 text-xs xl:text-sm overflow-hidden">
                  <div className="space-y-1 min-w-0">
                    <div className="font-bold song-serif text-sm xl:text-base text-[#23180f] border-b border-[#cbb693] pb-1 mb-1">
                      立籍简录
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate">
                        <span className="text-[#6b5235]">性别：</span>
                        <span className="font-bold text-[#781710]">{activePortrait.gender}</span>
                      </span>
                      <span className="truncate shrink-0">
                        <span className="text-[#6b5235]">年龄：</span>
                        <span className="font-bold text-[#781710]">12 岁（固定）</span>
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#6b5235] shrink-0">启程之地</span>
                      <span className="font-bold text-[#23180f] truncate">
                        {startCityNode.name}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#6b5235] shrink-0">门派出身</span>
                      <span className="font-semibold text-[#3d2814] truncate">
                        寒门布衣 · 无门无派
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#faf3e3] border border-[#cbb693] rounded-lg p-2 space-y-1 shrink-0">
                    <div className="font-semibold text-[#3d2814] text-xs xl:text-sm">
                      初始行装与武学（自动披挂运使）
                    </div>
                    <div className="flex flex-wrap gap-1 text-[11px] xl:text-xs leading-tight">
                      <span className="px-1.5 py-0.5 rounded bg-[#e8d8b7] text-[#3d2814]">
                        市井茶博士围裙衫
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#e8d8b7] text-[#3d2814]">
                        市井粗布鞋
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#e8d8b7] text-[#3d2814]">
                        旧铜钱挂坠
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#e8d8b7] text-[#3d2814]">
                        粗麻平安绳
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#dce8df] text-[#1d402c] border border-[#9dc0a8]">
                        粗浅呼吸法（内功）
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#dce8df] text-[#1d402c] border border-[#9dc0a8]">
                        疾跑赶路步（轻功）
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#dce8df] text-[#1d402c] border border-[#9dc0a8]">
                        市井王八拳（拳掌）
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：姓名 + 点数分配 */}
            <div className="col-span-7 min-h-0 h-full flex flex-col justify-between gap-2.5 xl:gap-3">
              {/* 姓名与快捷预设 */}
              <div className="bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl px-3 py-2 flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <label className="song-serif font-bold text-sm xl:text-base 2xl:text-lg text-[#23180f] shrink-0">
                    二、少侠尊姓大名
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="请输入姓名..."
                    className="w-32 xl:w-44 px-2.5 py-1 rounded-lg border-2 border-[#b5986e] bg-[#fffdf7] text-sm xl:text-base font-bold text-[#23180f] focus:outline-none focus:border-[#8f1d14]"
                  />
                  <button
                    type="button"
                    onClick={() => setName(generateRandomHeroName())}
                    className="px-2.5 py-1 rounded-lg border border-[#8f1d14] bg-[#faf3e3] text-[#8f1d14] hover:bg-[#8f1d14] hover:text-[#fff8eb] text-xs xl:text-sm font-semibold transition-colors shrink-0 cursor-pointer"
                  >
                    随机姓名
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-xs xl:text-sm shrink-0">
                  <button
                    type="button"
                    onClick={() => applyPreset('balanced')}
                    className="px-2 xl:px-2.5 py-1 rounded-lg border border-[#b5986e] bg-[#faf3e3] text-[#3d2814] hover:bg-[#e8d8b7] font-semibold cursor-pointer"
                  >
                    均衡
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('martial')}
                    className="px-2 xl:px-2.5 py-1 rounded-lg border border-[#b5986e] bg-[#faf3e3] text-[#3d2814] hover:bg-[#e8d8b7] font-semibold cursor-pointer"
                  >
                    尚武
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('scholar')}
                    className="px-2 xl:px-2.5 py-1 rounded-lg border border-[#8f1d14]/60 bg-[#faf3e3] text-[#781710] hover:bg-[#f2dec0] font-semibold cursor-pointer"
                  >
                    文雅
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('reset')}
                    className="px-2 xl:px-2.5 py-1 rounded-lg border border-[#cbb693] bg-[#f7efe0] text-[#6b5235] hover:bg-[#e8d8b7] font-semibold cursor-pointer"
                  >
                    清零重配
                  </button>
                </div>
              </div>

              {/* 先天禀赋 & 固定盘缠/武道法则 */}
              <div className="grid grid-cols-2 gap-2.5 xl:gap-3 shrink-0">
                <div className="bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl p-2.5 xl:p-3 flex flex-col justify-between gap-2">
                  <div className="flex items-center justify-between gap-2 border-b border-[#cbb693] pb-1.5">
                    <span className="song-serif font-bold text-sm xl:text-base 2xl:text-lg text-[#23180f]">
                      三、先天禀赋（270 点）
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border shrink-0 ${
                        talentRemaining > 0
                          ? 'bg-[#8f1d14] text-[#fff8eb] border-[#8f1d14]'
                          : 'bg-[#e8d8b7] text-[#3d2814] border-[#b5986e]'
                      }`}
                    >
                      剩余 {talentRemaining} / {TALENT_BUDGET}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-around gap-2 py-0.5">
                    <StatSliderRow
                      label="根骨"
                      value={stats.talents.根骨}
                      min={1}
                      max={100}
                      cappedMax={Math.min(100, stats.talents.根骨 + talentRemaining)}
                      onChange={(v) => updateTalent('根骨', v)}
                    />
                    <StatSliderRow
                      label="悟性"
                      value={stats.talents.悟性}
                      min={1}
                      max={100}
                      cappedMax={Math.min(100, stats.talents.悟性 + talentRemaining)}
                      onChange={(v) => updateTalent('悟性', v)}
                    />
                    <StatSliderRow
                      label="颜值"
                      value={stats.talents.颜值}
                      min={1}
                      max={100}
                      cappedMax={Math.min(100, stats.talents.颜值 + talentRemaining)}
                      onChange={(v) => updateTalent('颜值', v)}
                    />
                  </div>
                </div>

                <div className="bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl p-2.5 xl:p-3 flex flex-col justify-between gap-1.5">
                  <div className="song-serif font-bold text-sm xl:text-base 2xl:text-lg text-[#23180f] border-b border-[#cbb693] pb-1.5">
                    四、出生城市与初始盘缠
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg border border-[#cbb693] bg-[#faf3e3] space-y-0.5">
                    <div className="flex items-center justify-between gap-2 text-xs xl:text-sm">
                      <label
                        htmlFor="birth-city-select"
                        className="font-semibold text-[#3d2814] shrink-0"
                      >
                        出生城市
                      </label>
                      <select
                        id="birth-city-select"
                        value={startCityNode.id}
                        onChange={(e) => setStartNodeId(e.target.value)}
                        className="flex-1 max-w-[200px] px-2 py-0.5 rounded border border-[#b5986e] bg-[#fffdf7] text-xs xl:text-sm font-bold text-[#781710] focus:outline-none focus:border-[#8f1d14] cursor-pointer"
                      >
                        {START_CITY_GROUPS.map((grp) => (
                          <optgroup key={grp.label} label={grp.label}>
                            {grp.cities.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div className="text-[11px] xl:text-xs text-[#6b5235] truncate">
                      所属：{startCityNode.circuit}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1 rounded-lg border border-[#cbb693] bg-[#faf3e3] text-xs xl:text-sm">
                    <span className="font-semibold text-[#3d2814]">初始银两</span>
                    <span className="font-mono font-bold text-[#781710]">
                      {INITIAL_SILVER} 两（固定盘缠）
                    </span>
                  </div>
                  <div className="rounded-lg border border-[#cbb693] bg-[#faf3e3] px-2.5 py-1.5 text-[11px] xl:text-xs text-[#5c4328] leading-snug">
                    <span className="font-bold text-[#781710]">实战属性铁律：</span>
                    少侠周身实战交锋属性（气血上限、内力上限、身法、抗性、外功杀伤与护体防御）无裸身加值，初始皆为零基，唯由随身【披挂】、运使之【内功、轻功、武学】及举世罕见之【天阶圣药】脱胎换骨决定。
                  </div>
                </div>
              </div>

              {/* 十艺百工 */}
              <div className="flex-1 min-h-0 bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl p-2.5 xl:p-3 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between gap-2 border-b border-[#cbb693] pb-1.5 shrink-0">
                  <span className="song-serif font-bold text-sm xl:text-base 2xl:text-lg text-[#23180f]">
                    五、十艺百工（100 点自由分配）
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border shrink-0 ${
                      skillRemaining > 0
                        ? 'bg-[#8f1d14] text-[#fff8eb] border-[#8f1d14]'
                        : 'bg-[#e8d8b7] text-[#3d2814] border-[#b5986e]'
                    }`}
                  >
                    剩余 {skillRemaining} / {SKILL_BUDGET}
                  </span>
                </div>
                <div className="flex-1 min-h-0 grid grid-cols-2 gap-x-4 xl:gap-x-6 gap-y-1.5 xl:gap-y-2 content-around">
                  <StatSliderRow
                    label="骑术"
                    value={stats.ridingSkill}
                    min={0}
                    max={100}
                    cappedMax={Math.min(100, stats.ridingSkill + skillRemaining)}
                    onChange={updateRidingSkill}
                  />
                  {CIVIL_SKILL_KEYS.map((sk) => {
                    const currentVal = stats.skills[sk] ?? 0
                    return (
                      <StatSliderRow
                        key={sk}
                        label={sk}
                        value={currentVal}
                        min={0}
                        max={100}
                        cappedMax={Math.min(100, currentVal + skillRemaining)}
                        onChange={(v) => updateSkill(sk, v)}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 底部确认按钮 */}
          <div className="px-5 py-2 bg-[#e7d7b8] border-t-2 border-[#cbb693] flex items-center justify-between gap-4 shrink-0">
            <div className="text-xs xl:text-sm text-[#6b5235] truncate">
              提示：先天禀赋总计 270 点、十艺百工总计 100 点可自由分配；初始银两固定 150 两。
            </div>
            <div className="ml-auto flex items-center gap-2.5 shrink-0">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="px-4 py-1.5 rounded-lg bg-[#faf3e3] hover:bg-[#efe4cc] text-[#4a321a] song-serif font-bold text-sm xl:text-base border border-[#b5986e] transition-colors cursor-pointer"
                >
                  返回首页
                </button>
              )}
              <button
                type="button"
                onClick={() => openMenu('load')}
                className="px-4 py-1.5 rounded-lg bg-[#faf3e3] hover:bg-[#efe4cc] text-[#4a321a] song-serif font-bold text-sm xl:text-base border border-[#b5986e] transition-colors cursor-pointer"
              >
                读取旧档
              </button>
              <button
                type="button"
                onClick={handleStart}
                className="px-6 py-1.5 rounded-lg bg-[#8f1d14] hover:bg-[#a62318] text-[#fff8eb] song-serif font-bold text-base xl:text-lg shadow-md border border-[#d6be96]/60 transition-transform active:scale-95 cursor-pointer"
              >
                踏入江湖 · 启程{startCityNode.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
