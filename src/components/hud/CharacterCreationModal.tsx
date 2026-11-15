import { useState } from 'react'
import {
  generateRandomHeroName,
  getProtagonistPortrait,
  PROTAGONIST_PORTRAITS,
} from '../../data/protagonistPresets'
import { useGameStore } from '../../store/useGameStore'
import type { HeroBaseStats } from '../../types/game'
import { cloneHeroBaseStats } from '../../utils/heroStats'

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
    <div className="flex items-center gap-3 text-xl sm:text-2xl">
      <span className="w-28 sm:w-32 shrink-0 font-semibold text-[#3d2814]">{label}</span>
      <button
        type="button"
        disabled={atMin}
        onClick={() => onChange(clamp(value - step))}
        className="w-9 h-9 rounded-md border-2 border-[#b5986e] bg-[#faf3e3] text-[#4a321a] hover:bg-[#e8d8b7] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold leading-none text-2xl shrink-0"
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
        className="flex-1 accent-[#8f1d14] cursor-pointer h-3 min-w-[80px]"
      />
      <button
        type="button"
        disabled={atCap}
        onClick={() => onChange(clamp(value + step))}
        className="w-9 h-9 rounded-md border-2 border-[#b5986e] bg-[#faf3e3] text-[#4a321a] hover:bg-[#e8d8b7] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold leading-none text-2xl shrink-0"
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
        className="w-24 px-2 py-1 text-right rounded-md border-2 border-[#cbb693] bg-[#fffdf7] text-[#23180f] font-mono font-semibold text-xl sm:text-2xl shrink-0"
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
  const [stats, setStats] = useState<HeroBaseStats>(() =>
    cloneHeroBaseStats(INITIAL_CREATION_STATS),
  )

  const activePortrait = getProtagonistPortrait(portraitId)

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
      silver: INITIAL_SILVER,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#140e09]/85 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="w-[96vw] max-w-[2048px] h-[95vh] max-h-[96vh] rounded-2xl border-4 border-[#b5986e] bg-[#f4ead5] shadow-2xl overflow-hidden flex flex-col">
        {/* 顶部标题栏 */}
        <div className="px-7 py-5 bg-gradient-to-r from-[#2c1d11] via-[#412817] to-[#2c1d11] border-b-4 border-[#b5986e] flex items-center justify-between gap-4">
          <div>
            <h2 className="song-serif text-4xl sm:text-5xl font-bold text-[#f7e7c4] tracking-wider">
              北宋立志传 · 少侠立籍
            </h2>
            <p className="text-lg sm:text-2xl text-[#d6be96] mt-1.5">
              公元 1050 年（宋仁宗皇祐二年 · 正月初一）· 少侠初出茅庐，立籍定命
            </p>
          </div>
          <span className="px-5 py-2.5 rounded-lg bg-[#8f1d14] border-2 border-[#d6be96]/50 text-[#fff8eb] text-xl sm:text-2xl font-semibold shrink-0">
            初始地：开封府
          </span>
        </div>

        {/* 主体内容区 */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧：肖像 10 选 1 + 全身预览 + 固定出身 */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="song-serif font-bold text-2xl sm:text-3xl text-[#23180f]">
                  一、择选容貌（十选一）
                </span>
                <span className="text-xl sm:text-2xl font-semibold text-[#781710]">
                  当前：{activePortrait.label}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {PROTAGONIST_PORTRAITS.map((p) => {
                  const selected = p.id === portraitId
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPortraitId(p.id)}
                      title={p.label}
                      className={`group relative rounded-lg overflow-hidden border-2 transition-all ${
                        selected
                          ? 'border-[#8f1d14] ring-4 ring-[#8f1d14]/40 scale-[1.03]'
                          : 'border-[#cbb693] hover:border-[#8f1d14]/60'
                      }`}
                    >
                      <img
                        src={p.avatarUrl}
                        alt={p.label}
                        className="w-full aspect-square object-cover"
                      />
                      <div
                        className={`text-sm sm:text-lg text-center py-1 truncate px-1 ${
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
            <div className="bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl p-4 sm:p-5 flex gap-5 items-stretch flex-1">
              <div className="w-48 sm:w-60 shrink-0 rounded-lg overflow-hidden border-2 border-[#b5986e] bg-[#dfd0b1]">
                <img
                  src={activePortrait.fullbodyUrl}
                  alt={activePortrait.label}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between text-xl sm:text-2xl space-y-4">
                <div className="space-y-3">
                  <div className="font-bold song-serif text-2xl sm:text-3xl text-[#23180f] border-b-2 border-[#cbb693] pb-2">
                    立籍简录
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#6b5235]">年龄</span>
                    <span className="font-bold text-[#781710]">12 岁（固定开局）</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#6b5235]">启程之地</span>
                    <span className="font-bold text-[#23180f]">开封府（汴梁）</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#6b5235]">门派出身</span>
                    <span className="font-semibold text-[#3d2814]">寒门布衣 · 无门无派</span>
                  </div>
                </div>

                <div className="bg-[#faf3e3] border-2 border-[#cbb693] rounded-lg p-3.5 space-y-2">
                  <div className="font-semibold text-[#3d2814] text-xl sm:text-2xl">
                    初始行装（自动披挂）
                  </div>
                  <div className="flex flex-wrap gap-2 text-lg sm:text-xl">
                    <span className="px-3 py-1 rounded-md bg-[#e8d8b7] text-[#3d2814]">
                      市井茶博士围裙衫
                    </span>
                    <span className="px-3 py-1 rounded-md bg-[#e8d8b7] text-[#3d2814]">
                      市井粗布鞋
                    </span>
                    <span className="px-3 py-1 rounded-md bg-[#e8d8b7] text-[#3d2814]">
                      旧铜钱挂坠
                    </span>
                    <span className="px-3 py-1 rounded-md bg-[#e8d8b7] text-[#3d2814]">
                      粗麻平安绳
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：姓名 + 点数分配 */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* 姓名与快捷预设 */}
            <div className="bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-[320px]">
                <label className="song-serif font-bold text-2xl sm:text-3xl text-[#23180f] shrink-0">
                  二、少侠尊姓大名
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入姓名..."
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-[#b5986e] bg-[#fffdf7] text-2xl sm:text-3xl font-bold text-[#23180f] focus:outline-none focus:border-[#8f1d14] min-w-[140px]"
                />
                <button
                  type="button"
                  onClick={() => setName(generateRandomHeroName())}
                  className="px-4 py-2 rounded-lg border-2 border-[#8f1d14] bg-[#faf3e3] text-[#8f1d14] hover:bg-[#8f1d14] hover:text-[#fff8eb] text-xl sm:text-2xl font-semibold transition-colors shrink-0"
                >
                  随机姓名
                </button>
              </div>
              <div className="flex items-center gap-2 text-lg sm:text-xl">
                <button
                  type="button"
                  onClick={() => applyPreset('balanced')}
                  className="px-3.5 py-2 rounded-lg border-2 border-[#b5986e] bg-[#faf3e3] text-[#3d2814] hover:bg-[#e8d8b7] font-semibold"
                >
                  均衡
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('martial')}
                  className="px-3.5 py-2 rounded-lg border-2 border-[#b5986e] bg-[#faf3e3] text-[#3d2814] hover:bg-[#e8d8b7] font-semibold"
                >
                  尚武
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('scholar')}
                  className="px-3.5 py-2 rounded-lg border-2 border-[#8f1d14]/60 bg-[#faf3e3] text-[#781710] hover:bg-[#f2dec0] font-semibold"
                >
                  文雅
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('reset')}
                  className="px-3.5 py-2 rounded-lg border-2 border-[#cbb693] bg-[#f7efe0] text-[#6b5235] hover:bg-[#e8d8b7] font-semibold"
                >
                  清零重配
                </button>
              </div>
            </div>

            {/* 先天禀赋 & 固定盘缠/武道法则 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl p-4 sm:p-5 space-y-3.5">
                <div className="flex items-center justify-between gap-2 border-b-2 border-[#cbb693] pb-2">
                  <span className="song-serif font-bold text-2xl sm:text-3xl text-[#23180f]">
                    三、先天禀赋（270 点）
                  </span>
                  <span
                    className={`px-3 py-0.5 rounded-full text-base sm:text-lg font-bold border ${
                      talentRemaining > 0
                        ? 'bg-[#8f1d14] text-[#fff8eb] border-[#8f1d14]'
                        : 'bg-[#e8d8b7] text-[#3d2814] border-[#b5986e]'
                    }`}
                  >
                    剩余 {talentRemaining} / {TALENT_BUDGET}
                  </span>
                </div>
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

              <div className="bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl p-4 sm:p-5 space-y-3.5 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="song-serif font-bold text-2xl sm:text-3xl text-[#23180f] border-b-2 border-[#cbb693] pb-2">
                    四、盘缠资粮与武道法则
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 rounded-lg border-2 border-[#cbb693] bg-[#faf3e3] text-xl sm:text-2xl">
                    <span className="font-semibold text-[#3d2814]">初始银两</span>
                    <span className="font-mono font-bold text-[#781710]">
                      {INITIAL_SILVER} 两（固定盘缠）
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border border-[#cbb693] bg-[#faf3e3] p-3.5 text-base sm:text-lg text-[#5c4328] leading-relaxed">
                  <span className="font-bold text-[#781710]">实战属性铁律：</span>
                  少侠周身实战交锋属性（气血上限、内力上限、身法、抗性、外功杀伤与护体防御）无裸身加值，初始皆为零基，唯由随身【披挂】、运使之【内功、轻功、武学】及举世罕见之【天阶圣药】脱胎换骨决定。
                </div>
              </div>
            </div>

            {/* 十艺百工 */}
            <div className="bg-[#efe4cc] border-2 border-[#cbb693] rounded-xl p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center justify-between gap-2 border-b-2 border-[#cbb693] pb-2">
                <span className="song-serif font-bold text-2xl sm:text-3xl text-[#23180f]">
                  五、十艺百工（100 点自由分配）
                </span>
                <span
                  className={`px-3 py-0.5 rounded-full text-base sm:text-lg font-bold border ${
                    skillRemaining > 0
                      ? 'bg-[#8f1d14] text-[#fff8eb] border-[#8f1d14]'
                      : 'bg-[#e8d8b7] text-[#3d2814] border-[#b5986e]'
                  }`}
                >
                  剩余 {skillRemaining} / {SKILL_BUDGET}
                </span>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-3.5">
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
        <div className="px-7 py-4 bg-[#e7d7b8] border-t-2 border-[#cbb693] flex items-center justify-between gap-4">
          <div className="text-lg sm:text-xl text-[#6b5235] hidden md:block">
            提示：先天禀赋总计 270 点、十艺百工总计 100 点可自由分配；初始银两固定 150 两。
          </div>
          <div className="ml-auto flex items-center gap-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 rounded-xl bg-[#faf3e3] hover:bg-[#efe4cc] text-[#4a321a] song-serif font-bold text-xl sm:text-2xl border-2 border-[#b5986e] transition-colors"
              >
                返回首页
              </button>
            )}
            <button
              type="button"
              onClick={() => openMenu('load')}
              className="px-6 py-3 rounded-xl bg-[#faf3e3] hover:bg-[#efe4cc] text-[#4a321a] song-serif font-bold text-xl sm:text-2xl border-2 border-[#b5986e] transition-colors"
            >
              读取旧档
            </button>
            <button
              type="button"
              onClick={handleStart}
              className="px-8 py-3 rounded-xl bg-[#8f1d14] hover:bg-[#a62318] text-[#fff8eb] song-serif font-bold text-2xl sm:text-3xl shadow-lg border-2 border-[#d6be96]/60 transition-transform active:scale-95"
            >
              踏入江湖 · 启程开封
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
