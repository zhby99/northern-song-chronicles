import React from 'react'
import { useGameStore } from '../../../store/useGameStore'
import {
  computeDailyArtExpGain,
  getArtStageLabel,
  getExpForArtLevel,
  MAX_ART_EXP,
  TEN_ARTS_GUIDE_DATA,
} from '../../../utils/artsProgression'

export const TenArtsGuideTab: React.FC = () => {
  const baseStats = useGameStore((s) => s.baseStats)
  const artExps = useGameStore((s) => s.artExps)
  const artMilestoneFlags = useGameStore((s) => s.artMilestoneFlags)

  const dailyGain = computeDailyArtExpGain(baseStats.talents.悟性, 1.0, 0)

  return (
    <div className="space-y-4">
      {/* 顶部总纲与五年节奏说明 */}
      <div className="rounded-lg border border-[#b89b6a] bg-[#f8f1df] p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d9c59b] pb-2">
          <div>
            <h3 className="song-serif text-base font-bold text-[#4a2e16]">
              北宋十艺百工 · 五年（1,800 日）修习总纲
            </h3>
            <p className="mt-0.5 text-xs text-[#6f5536]">
              每门艺业从 0 级修至 100 级需累积 <span className="font-bold text-[#8c3b20]">180,000</span> 点经验（标准日修 100 点，约合 5 年不间断研习；需亲临对应州府的书院、府衙、校场、寺庙、酒楼等建筑点选修行）。
            </p>
          </div>
          <div className="rounded border border-[#c7ab7c] bg-[#fffaf0] px-3 py-1.5 text-xs text-[#5c3d1e]">
            当前悟性 <span className="font-bold text-[#8c3b20]">{baseStats.talents.悟性}</span> · 标准日修收益{' '}
            <span className="font-bold text-[#2f5d38]">{dailyGain}</span> 经验/日
          </div>
        </div>

        {/* 四阶分段曲线 */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          <div className="rounded border border-[#dfd0b1] bg-[#fffcf4] px-2.5 py-2">
            <div className="font-bold text-[#4a2e16]">0 ~ 40 级 · 初窥门径</div>
            <div className="text-[#785f40]">占 15%（27,000 经验 · 约 9 个月）</div>
          </div>
          <div className="rounded border border-[#dfd0b1] bg-[#fffcf4] px-2.5 py-2">
            <div className="font-bold text-[#4a2e16]">40 ~ 70 级 · 登堂入室</div>
            <div className="text-[#785f40]">占 25%（45,000 经验 · 约 1.25 年）</div>
          </div>
          <div className="rounded border border-[#dfd0b1] bg-[#fffcf4] px-2.5 py-2">
            <div className="font-bold text-[#4a2e16]">70 ~ 90 级 · 名家之境</div>
            <div className="text-[#785f40]">占 30%（54,000 经验 · 约 1.5 年）</div>
          </div>
          <div className="rounded border border-[#dfd0b1] bg-[#fffcf4] px-2.5 py-2">
            <div className="font-bold text-[#4a2e16]">90 ~ 100 级 · 一代宗师</div>
            <div className="text-[#785f40]">占 30%（54,000 经验 · 约 1.5 年）</div>
          </div>
        </div>

        {/* 十艺宗师里程碑与先天禀赋铁律说明 */}
        <div className="mt-3 rounded border border-[#cda873] bg-[#fdf6e7] p-2.5 text-xs text-[#573b1d]">
          <div className="font-bold text-[#8c3b20]">◆ 十艺宗师里程碑与先天禀赋准则（每项首次达成生效）</div>
          <ul className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2">
            <li>• <span className="font-semibold">琴 / 书 / 画 / 诗词首次达到 80 级</span>：雅誉远播，获 <span className="font-bold text-[#8c3b20]">江湖声望 +40</span></li>
            <li>• <span className="font-semibold">任意十艺首次达到 90 级（一代宗师）</span>：名动天下，获 <span className="font-bold text-[#2b5876]">江湖声望 +80 · 实战历练 +120</span></li>
            <li className="sm:col-span-2 text-[#6f5536]">• <span className="font-semibold">先天禀赋铁律</span>：【根骨 / 悟性 / 颜值】生而注定，不受后天任务、丹药或艺业修习增加；实战交锋属性唯受披挂、内功、轻功与外功武学影响。</li>
          </ul>
        </div>
      </div>

      {/* 十艺逐项指引卡片 */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {TEN_ARTS_GUIDE_DATA.map((item) => {
          const currentLv =
            item.key === '骑术' ? baseStats.ridingSkill : (baseStats.skills[item.key] ?? 0)
          const currentExp = artExps[item.key] ?? getExpForArtLevel(currentLv)
          const pct = Math.min(100, Math.round((currentExp / MAX_ART_EXP) * 1000) / 10)
          const stage = getArtStageLabel(currentLv)
          const got80 = artMilestoneFlags.includes(`art80:${item.key}`)
          const got90 = artMilestoneFlags.includes(`art90:${item.key}`)

          return (
            <div
              key={item.key}
              className="flex flex-col justify-between rounded-lg border border-[#c7af83] bg-[#fdfaf1] p-3.5 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="song-serif text-base font-bold text-[#3f2612]">
                      {item.key}
                    </span>
                    <span className="rounded bg-[#efe3c8] px-1.5 py-0.5 text-[11px] text-[#6d4e2a]">
                      {item.realm} · {stage}
                    </span>
                  </div>
                  <div className="text-right text-xs font-bold text-[#8c3b20]">
                    Lv.{currentLv} <span className="font-normal text-[#7a6142]">/ 100</span>
                  </div>
                </div>

                {/* 经验进度条 */}
                <div className="mt-2">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#e6dac0]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#b07d3c] to-[#8c3b20] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-[#7a6142]">
                    <span>累积经验：{currentExp.toLocaleString('en-US')} / 180,000</span>
                    <span>{pct}%</span>
                  </div>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-[#5c4529]">{item.summary}</p>

                <div className="mt-2 space-y-1 text-[11px] text-[#6a5233]">
                  <div className="font-semibold text-[#4a2e16]">修习途径：</div>
                  {item.ways.map((w, idx) => (
                    <div key={idx}>• {w}</div>
                  ))}
                  <div className="pt-1 text-[#7a5a32]">
                    <span className="font-semibold">推荐地标：</span>
                    {item.placesAndNpcs}
                  </div>
                </div>
              </div>

              <div className="mt-3 border-t border-[#e5d6b8] pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] font-medium text-[#8c3b20]">
                    {item.milestoneText}
                  </div>
                  {(got80 || got90) && (
                    <span className="rounded bg-[#e1efe0] px-1.5 py-0.5 text-[10px] font-semibold text-[#2c5e2e]">
                      {got90 ? '90级已达标' : '80级已达标'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
