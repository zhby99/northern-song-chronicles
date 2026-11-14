import { useState } from 'react'
import {
  generateRandomHeroName,
  getProtagonistPortrait,
  PROTAGONIST_PORTRAITS,
} from '../../data/protagonistPresets'
import {
  cloneHeroBaseStats,
  DEFAULT_HERO_BASE_STATS,
} from '../../utils/heroStats'
import { useGameStore } from '../../store/useGameStore'
import type { HeroBaseStats } from '../../types/game'

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

interface StatSliderRowProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (val: number) => void
}

function StatSliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: StatSliderRowProps) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n))
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-16 shrink-0 font-semibold text-[#3d2814]">{label}</span>
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        className="w-5 h-5 rounded border border-[#b5986e] bg-[#faf3e3] text-[#4a321a] hover:bg-[#e8d8b7] flex items-center justify-center font-bold leading-none"
      >
        -
      </button>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-[#8f1d14] cursor-pointer h-1.5"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        className="w-5 h-5 rounded border border-[#b5986e] bg-[#faf3e3] text-[#4a321a] hover:bg-[#e8d8b7] flex items-center justify-center font-bold leading-none"
      >
        +
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const parsed = Number(e.target.value)
          if (!Number.isNaN(parsed)) onChange(clamp(Math.round(parsed)))
        }}
        className="w-14 px-1.5 py-0.5 text-right rounded border border-[#cbb693] bg-[#fffdf7] text-[#23180f] font-mono font-semibold"
      />
    </div>
  )
}

export function CharacterCreationModal() {
  const completeCharacterCreation = useGameStore((s) => s.completeCharacterCreation)
  const openMenu = useGameStore((s) => s.openMenu)

  const [name, setName] = useState<string>(() => generateRandomHeroName())
  const [portraitId, setPortraitId] = useState<string>(PROTAGONIST_PORTRAITS[3].id)
  const [stats, setStats] = useState<HeroBaseStats>(() =>
    cloneHeroBaseStats(DEFAULT_HERO_BASE_STATS),
  )

  const activePortrait = getProtagonistPortrait(portraitId)

  const updateTalent = (key: keyof HeroBaseStats['talents'], val: number) => {
    setStats((prev) => ({
      ...prev,
      talents: { ...prev.talents, [key]: val },
    }))
  }

  const updateSkill = (key: string, val: number) => {
    setStats((prev) => ({
      ...prev,
      skills: { ...prev.skills, [key]: val },
    }))
  }

  const applyPreset = (mode: 'default' | 'balanced' | 'genius') => {
    if (mode === 'default') {
      setStats(cloneHeroBaseStats(DEFAULT_HERO_BASE_STATS))
      return
    }
    if (mode === 'balanced') {
      setStats({
        talents: { 根骨: 65, 悟性: 65, 颜值: 65 },
        maxHp: 360,
        maxMp: 220,
        agility: 45,
        res: 20,
        ridingSkill: 35,
        skills: {
          算术: 50,
          经义: 50,
          策论: 50,
          诗词: 50,
          琴: 45,
          棋: 45,
          书: 50,
          画: 45,
          辩才: 50,
        },
      })
      return
    }
    setStats({
      talents: { 根骨: 95, 悟性: 95, 颜值: 90 },
      maxHp: 800,
      maxMp: 600,
      agility: 85,
      res: 50,
      ridingSkill: 80,
      skills: {
        算术: 85,
        经义: 85,
        策论: 85,
        诗词: 85,
        琴: 80,
        棋: 80,
        书: 85,
        画: 80,
        辩才: 85,
      },
    })
  }

  const handleStart = () => {
    completeCharacterCreation({
      name: name.trim() || '无名少侠',
      portraitId,
      baseStats: stats,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#140e09]/85 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-5xl rounded-xl border-2 border-[#b5986e] bg-[#f4ead5] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* 顶部标题栏 */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#2c1d11] via-[#412817] to-[#2c1d11] border-b-2 border-[#b5986e] flex items-center justify-between gap-3">
          <div>
            <h2 className="song-serif text-xl sm:text-2xl font-bold text-[#f7e7c4] tracking-wider">
              北宋立志传 · 少侠立籍
            </h2>
            <p className="text-[11px] sm:text-xs text-[#d6be96] mt-0.5">
              公元 1050 年（宋仁宗皇祐二年 · 正月初一）· 测试阶段全属性自由定制
            </p>
          </div>
          <span className="px-2.5 py-1 rounded bg-[#8f1d14] border border-[#d6be96]/50 text-[#fff8eb] text-xs font-semibold shrink-0">
            初始地：开封府
          </span>
        </div>

        {/* 主体内容区 */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* 左侧：肖像 10 选 1 + 全身预览 + 固定出身 */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="bg-[#efe4cc] border border-[#cbb693] rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="song-serif font-bold text-sm text-[#23180f]">
                  一、择选容貌（十选一）
                </span>
                <span className="text-xs font-semibold text-[#781710]">
                  当前：{activePortrait.label}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {PROTAGONIST_PORTRAITS.map((p) => {
                  const selected = p.id === portraitId
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPortraitId(p.id)}
                      title={p.label}
                      className={`group relative rounded-md overflow-hidden border-2 transition-all ${
                        selected
                          ? 'border-[#8f1d14] ring-2 ring-[#8f1d14]/40 scale-[1.03]'
                          : 'border-[#cbb693] hover:border-[#8f1d14]/60'
                      }`}
                    >
                      <img
                        src={p.avatarUrl}
                        alt={p.label}
                        className="w-full aspect-square object-cover"
                      />
                      <div
                        className={`text-[10px] text-center py-0.5 truncate px-0.5 ${
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
            <div className="bg-[#efe4cc] border border-[#cbb693] rounded-lg p-3 flex gap-3 items-stretch flex-1">
              <div className="w-32 sm:w-36 shrink-0 rounded-md overflow-hidden border border-[#b5986e] bg-[#dfd0b1]">
                <img
                  src={activePortrait.fullbodyUrl}
                  alt={activePortrait.label}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between text-xs space-y-2">
                <div className="space-y-1.5">
                  <div className="font-bold song-serif text-sm text-[#23180f] border-b border-[#cbb693] pb-1">
                    立籍简录
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5235]">年龄</span>
                    <span className="font-bold text-[#781710]">12 岁（固定开局）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5235]">启程之地</span>
                    <span className="font-bold text-[#23180f]">开封府（汴梁）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5235]">门派出身</span>
                    <span className="font-semibold text-[#3d2814]">寒门布衣 · 无门无派</span>
                  </div>
                </div>

                <div className="bg-[#faf3e3] border border-[#cbb693] rounded p-2 space-y-1">
                  <div className="font-semibold text-[#3d2814]">初始行装（自动披挂）</div>
                  <div className="flex flex-wrap gap-1 text-[11px]">
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：姓名 + 全属性自由调整 */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {/* 姓名与快捷预设 */}
            <div className="bg-[#efe4cc] border border-[#cbb693] rounded-lg p-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-[220px]">
                <label className="song-serif font-bold text-sm text-[#23180f] shrink-0">
                  二、少侠尊姓大名
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入姓名..."
                  className="flex-1 px-2.5 py-1 rounded border border-[#b5986e] bg-[#fffdf7] text-sm font-bold text-[#23180f] focus:outline-none focus:border-[#8f1d14]"
                />
                <button
                  type="button"
                  onClick={() => setName(generateRandomHeroName())}
                  className="px-2.5 py-1 rounded border border-[#8f1d14] bg-[#faf3e3] text-[#8f1d14] hover:bg-[#8f1d14] hover:text-[#fff8eb] text-xs font-semibold transition-colors shrink-0"
                >
                  随机姓名
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => applyPreset('default')}
                  className="px-2 py-1 rounded border border-[#b5986e] bg-[#faf3e3] text-[#3d2814] hover:bg-[#e8d8b7]"
                >
                  默认
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('balanced')}
                  className="px-2 py-1 rounded border border-[#b5986e] bg-[#faf3e3] text-[#3d2814] hover:bg-[#e8d8b7]"
                >
                  均衡
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('genius')}
                  className="px-2 py-1 rounded border border-[#8f1d14]/60 bg-[#faf3e3] text-[#781710] hover:bg-[#f2dec0]"
                >
                  奇才
                </button>
              </div>
            </div>

            {/* 先天禀赋 & 实战根基 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#efe4cc] border border-[#cbb693] rounded-lg p-3 space-y-2">
                <div className="song-serif font-bold text-sm text-[#23180f] border-b border-[#cbb693] pb-1">
                  三、先天禀赋（1~100）
                </div>
                <StatSliderRow
                  label="根骨"
                  value={stats.talents.根骨}
                  min={1}
                  max={100}
                  onChange={(v) => updateTalent('根骨', v)}
                />
                <StatSliderRow
                  label="悟性"
                  value={stats.talents.悟性}
                  min={1}
                  max={100}
                  onChange={(v) => updateTalent('悟性', v)}
                />
                <StatSliderRow
                  label="颜值"
                  value={stats.talents.颜值}
                  min={1}
                  max={100}
                  onChange={(v) => updateTalent('颜值', v)}
                />
              </div>

              <div className="bg-[#efe4cc] border border-[#cbb693] rounded-lg p-3 space-y-2">
                <div className="song-serif font-bold text-sm text-[#23180f] border-b border-[#cbb693] pb-1">
                  四、实战根基（额外加值）
                </div>
                <StatSliderRow
                  label="气血加值"
                  value={stats.maxHp}
                  min={0}
                  max={2000}
                  step={10}
                  onChange={(v) => setStats((p) => ({ ...p, maxHp: v }))}
                />
                <StatSliderRow
                  label="内力加值"
                  value={stats.maxMp}
                  min={0}
                  max={2000}
                  step={10}
                  onChange={(v) => setStats((p) => ({ ...p, maxMp: v }))}
                />
                <StatSliderRow
                  label="身法加值"
                  value={stats.agility}
                  min={0}
                  max={200}
                  onChange={(v) => setStats((p) => ({ ...p, agility: v }))}
                />
                <StatSliderRow
                  label="抗性加值"
                  value={stats.res}
                  min={0}
                  max={100}
                  onChange={(v) => setStats((p) => ({ ...p, res: v }))}
                />
              </div>
            </div>

            {/* 十艺百工 */}
            <div className="bg-[#efe4cc] border border-[#cbb693] rounded-lg p-3 space-y-2">
              <div className="song-serif font-bold text-sm text-[#23180f] border-b border-[#cbb693] pb-1">
                五、十艺百工（0~100）
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                <StatSliderRow
                  label="骑术"
                  value={stats.ridingSkill}
                  min={0}
                  max={100}
                  onChange={(v) => setStats((p) => ({ ...p, ridingSkill: v }))}
                />
                {CIVIL_SKILL_KEYS.map((sk) => (
                  <StatSliderRow
                    key={sk}
                    label={sk}
                    value={stats.skills[sk] ?? 0}
                    min={0}
                    max={100}
                    onChange={(v) => updateSkill(sk, v)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 底部确认按钮 */}
        <div className="px-5 py-3 bg-[#e7d7b8] border-t border-[#cbb693] flex items-center justify-between gap-3">
          <div className="text-xs text-[#6b5235] hidden sm:block">
            提示：当前为测试阶段，所有先天禀赋、实战根基与十艺百工均可自由调整。
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => openMenu('load')}
              className="px-4 py-2.5 rounded-lg bg-[#faf3e3] hover:bg-[#efe4cc] text-[#4a321a] song-serif font-bold text-sm border border-[#b5986e] transition-colors"
            >
              读取旧档
            </button>
            <button
              type="button"
              onClick={handleStart}
              className="px-6 py-2.5 rounded-lg bg-[#8f1d14] hover:bg-[#a62318] text-[#fff8eb] song-serif font-bold text-base shadow-md border border-[#d6be96]/60 transition-transform active:scale-95"
            >
              踏入江湖 · 启程开封
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
