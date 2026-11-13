import { useMemo } from 'react'
import { Maximize2 } from 'lucide-react'
import { MARTIAL_ART_DB_MAP } from '../../../data/gameDb'
import { computeEquipmentTotals, computeWeaponArtSynergy } from '../../../data/itemsDb'
import { computeEquippedArtsTotals } from '../../../data/playerMartialArts'
import { useGameStore } from '../../../store/useGameStore'
import { getEffectiveSpeed, resolveMountMeta } from '../../../utils/mapMath'
import { ManagedAssetImg } from '../../common/ManagedAssetImg'
import type { LightboxState } from '../menuShared'

interface HeroTabProps {
  locationLabel: string
  onOpenLightbox: (lightbox: LightboxState) => void
}

export function HeroTab({ locationLabel, onOpenLightbox }: HeroTabProps) {
  const baseStats = useGameStore((s) => s.baseStats)
  const hp = useGameStore((s) => s.hp)
  const maxHp = useGameStore((s) => s.maxHp)
  const mp = useGameStore((s) => s.mp)
  const maxMp = useGameStore((s) => s.maxMp)
  const stamina = useGameStore((s) => s.stamina)
  const maxStamina = useGameStore((s) => s.maxStamina)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const silver = useGameStore((s) => s.silver)
  const food = useGameStore((s) => s.food)
  const skills = useGameStore((s) => s.skills)
  const mountKey = useGameStore((s) => s.mountKey)
  const qinggongBonus = useGameStore((s) => s.qinggongBonus)
  const equipped = useGameStore((s) => s.equipped)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const equippedArts = useGameStore((s) => s.equippedArts)
  const restRecoverStamina = useGameStore((s) => s.restRecoverStamina)
  const setMenuTab = useGameStore((s) => s.setMenuTab)

  const equipTotals = useMemo(() => computeEquipmentTotals(equipped), [equipped])
  const artTotals = useMemo(
    () => computeEquippedArtsTotals(equippedArts, learnedArts),
    [equippedArts, learnedArts],
  )
  const weaponSynergy = useMemo(
    () => computeWeaponArtSynergy(equipped.weapon, equippedArts, learnedArts),
    [equipped.weapon, equippedArts, learnedArts],
  )
  const speedInfo = getEffectiveSpeed(
    { mountKey, qinggongBonus, ridingSkill, agility },
    'official',
  )

  const totalAttack = equipTotals.attack + artTotals.attack + weaponSynergy.totalSynergyAttack
  const totalDefense = equipTotals.defense + artTotals.defense
  const equippedCount = Object.values(equipped).filter(Boolean).length
  const equippedArtCount = Object.values(equippedArts).filter(Boolean).length

  const hpPct = Math.min(100, Math.round((hp / Math.max(1, maxHp)) * 100))
  const mpPct = Math.min(100, Math.round((mp / Math.max(1, maxMp)) * 100))
  const staPct = Math.min(100, Math.round((stamina / Math.max(1, maxStamina)) * 100))
  const mainNeigong = equippedArts.neigong ? MARTIAL_ART_DB_MAP[equippedArts.neigong] : null
  const mainQinggong = equippedArts.qinggong ? MARTIAL_ART_DB_MAP[equippedArts.qinggong] : null
  const heroImgUrl = '/assets/characters/templates/tpl_song_scholar_fb.jpg'

  const openHeroLightbox = () =>
    onOpenLightbox({
      url: heroImgUrl,
      title: '江湖少侠 · 行侠全身绘像',
      subtitle: `皇祐二年驻足【${locationLabel}】 · 已佩 ${equippedCount}/7 披挂 · 已运 ${equippedArtCount}/6 武学`,
    })

  return (
    <div className="space-y-5 text-xs sm:text-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* 左侧：少侠立绘名帖（支持点击放大） */}
        <div className="lg:col-span-4 bg-[#efe4cc] border-2 border-[#b5986e] rounded-lg p-4 flex flex-col justify-between gap-3 shadow-inner">
          <div className="flex items-center justify-between border-b border-[#cbb693] pb-2">
            <div>
              <span className="px-2 py-0.5 rounded bg-[#8f1d14] text-[#fff8eb] text-[11px] font-bold song-serif">
                江湖少侠 · 初涉汴京
              </span>
              <h4 className="song-serif font-bold text-lg text-[#23180f] mt-1">
                无名少侠（寒门游侠）
              </h4>
            </div>
            <div className="text-right text-xs text-[#6b5235]">
              <div>骨龄：十八岁</div>
              <div className="font-semibold text-[#781710]">境界：三流好手</div>
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={openHeroLightbox}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openHeroLightbox()
              }
            }}
            className="w-full aspect-[3/4] max-h-[380px] mx-auto rounded-md bg-[#1e150e] border-2 border-[#8c6e46] overflow-hidden relative group cursor-zoom-in shadow-md flex items-center justify-center"
          >
            <ManagedAssetImg
              url={heroImgUrl}
              alt="少侠全身像"
              className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
            />
            <span className="absolute top-2 right-2 px-2 py-1 rounded bg-black/70 text-[#fff8eb] text-[11px] flex items-center gap-1 opacity-85 group-hover:opacity-100 transition">
              <Maximize2 className="w-3 h-3 text-amber-300" />
              <span>点击放大</span>
            </span>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3 py-2 text-[#f5dfb5] text-xs flex items-center justify-between gap-2">
              <span className="song-serif font-bold truncate">驻留：{locationLabel}</span>
              <span className="font-mono text-amber-200">
                银 {silver}两 · 粮 {food}份
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => setMenuTab('loadout')}
              className="px-3 py-2 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] font-bold song-serif text-xs shadow cursor-pointer transition"
            >
              前往披挂与武学 →
            </button>
            <button
              type="button"
              onClick={() => setMenuTab('bag')}
              className="px-3 py-2 rounded bg-[#261910] hover:bg-[#3d291a] text-amber-200 border border-[#c89d54]/70 font-bold song-serif text-xs shadow cursor-pointer transition"
            >
              开启行囊四库 →
            </button>
          </div>
        </div>

        {/* 右侧：生存三维条、实战四维、先天三维禀赋、行军脚力与当前运功速览 */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-4">
          {/* 1) 气血 / 内力 / 体能 进度条与调息 */}
          <div className="p-4 rounded-lg bg-[#efe4cc] border border-[#c8b28e] space-y-3">
            <div className="flex items-center justify-between border-b border-[#cbb693] pb-2">
              <span className="song-serif font-bold text-base text-[#23180f]">
                周身气血 · 真气内息 · 日常体能
              </span>
              <button
                type="button"
                onClick={restRecoverStamina}
                title="花费 3 两纹银于客舍小憩三个时辰，回满体能并平复气血内息"
                className="px-3 py-1 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] text-xs font-bold song-serif cursor-pointer shadow-sm transition"
              >
                客舍调息（3两银 · 回满体能）
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693]">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#6b5033] song-serif">气血（生命）</span>
                  <span className="font-mono font-bold text-[#7f1d1d]">
                    {hp} / {maxHp}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#dccab0] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#8f1d14] to-[#dc2626]"
                    style={{ width: `${hpPct}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#7a6042] mt-1 font-mono">
                  根基 {baseStats.maxHp} · 披挂 +{equipTotals.maxHp} · 武学 +{artTotals.maxHp}
                </div>
              </div>

              <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693]">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#6b5033] song-serif">内力（真气）</span>
                  <span className="font-mono font-bold text-[#1e3a8a]">
                    {mp} / {maxMp}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#dccab0] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6]"
                    style={{ width: `${mpPct}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#7a6042] mt-1 font-mono">
                  根基 {baseStats.maxMp} · 披挂 +{equipTotals.maxMp} · 武学 +{artTotals.maxMp}
                </div>
              </div>

              <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693]">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#6b5033] song-serif">体能（精力）</span>
                  <span className="font-mono font-bold text-[#185a37]">
                    {stamina} / {maxStamina}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#dccab0] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#047857] to-[#10b981]"
                    style={{ width: `${staPct}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#7a6042] mt-1 font-mono">
                  根基 {baseStats.maxStamina} · 披挂 +{equipTotals.maxStamina}
                </div>
              </div>
            </div>
          </div>

          {/* 2) 实战攻防四维 vs 先天三维禀赋 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#efe4cc] border border-[#c8b28e] space-y-2.5">
              <div className="song-serif font-bold text-sm text-[#23180f] border-b border-[#cbb693] pb-1.5 flex items-center justify-between">
                <span>实战交锋属性（根基+披挂+武学实时派生）</span>
                <span className="text-[11px] text-[#8f1d14] font-mono">回合交锋</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                  <div className="text-[#6b5235]">外功杀伤加成</div>
                  <div className="font-mono font-bold text-base text-[#8f1d14] mt-0.5">
                    +{totalAttack}
                  </div>
                  <div className="text-[10px] text-[#7a6042]">
                    兵刃+{equipTotals.attack} / 招式+{artTotals.attack}
                    {weaponSynergy.totalSynergyAttack > 0
                      ? ` / 共鸣+${weaponSynergy.totalSynergyAttack}`
                      : ''}
                  </div>
                </div>
                <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                  <div className="text-[#6b5235]">护体防御招架</div>
                  <div className="font-mono font-bold text-base text-[#1b5132] mt-0.5">
                    +{totalDefense}
                  </div>
                  <div className="text-[10px] text-[#7a6042]">
                    衣甲+{equipTotals.defense} / 功体+{artTotals.defense}
                  </div>
                </div>
                <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                  <div className="text-[#6b5235]">实战身法（先后手/闪避）</div>
                  <div className="font-mono font-bold text-base text-[#23180f] mt-0.5">
                    {agility}
                  </div>
                  <div className="text-[10px] text-[#7a6042] font-mono">
                    根基{baseStats.agility} / 履+{equipTotals.agility} / 轻+{artTotals.agility}
                  </div>
                </div>
                <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                  <div className="text-[#6b5235]">周身抗性（毒寒火封）</div>
                  <div className="font-mono font-bold text-base text-[#5b3b73] mt-0.5">{res}</div>
                  <div className="text-[10px] text-[#7a6042] font-mono">
                    根基{baseStats.res} / 饰+{equipTotals.res} / 内+{artTotals.res}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#efe4cc] border border-[#c8b28e] flex flex-col justify-between gap-2.5">
              <div>
                <div className="song-serif font-bold text-sm text-[#23180f] border-b border-[#cbb693] pb-1.5 flex items-center justify-between">
                  <span>先天三维禀赋（非战斗养成资质）</span>
                  <span className="text-[11px] text-[#6b5235]">满分 100</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-center mt-2.5">
                  <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                    <div className="text-xs text-[#6b5235] song-serif">根 骨</div>
                    <div className="font-mono font-bold text-lg text-[#781710] mt-0.5">
                      {baseStats.talents.根骨}
                    </div>
                    <div className="text-[10px] text-[#7a6042]">内功周天演武倍率</div>
                  </div>
                  <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                    <div className="text-xs text-[#6b5235] song-serif">悟 性</div>
                    <div className="font-mono font-bold text-lg text-[#1e3a8a] mt-0.5">
                      {baseStats.talents.悟性}
                    </div>
                    <div className="text-[10px] text-[#7a6042]">外功轻功演练效率</div>
                  </div>
                  <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                    <div className="text-xs text-[#6b5235] song-serif">颜 值</div>
                    <div className="font-mono font-bold text-lg text-[#5b3b73] mt-0.5">
                      {baseStats.talents.颜值}
                    </div>
                    <div className="text-[10px] text-[#7a6042]">结交印象与奇遇</div>
                  </div>
                </div>
              </div>

              {/* 官道行军速度与当前主运功法概览 */}
              <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[#6b5235]">千里行军脚力：</span>
                  <strong className="font-mono text-[#1b5132] ml-1">
                    {speedInfo.baseDailyLi} 里/日（+{speedInfo.modifierPct}%）
                  </strong>
                  <span className="text-[#7a6042] ml-2">[{resolveMountMeta(mountKey).name}]</span>
                </div>
                <div className="text-[#52391e]">
                  主运：{mainNeigong ? mainNeigong.cleanName : '未运内功'} ·{' '}
                  {mainQinggong
                    ? `${mainQinggong.cleanName} (+${Math.round(qinggongBonus * 100)}%)`
                    : '基础步法'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 下方通栏：北宋十艺百工修为 */}
      <div className="p-4 rounded-lg bg-[#efe4cc] border border-[#c8b28e] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="song-serif font-bold text-base text-[#52391e]">
            北宋十艺百工修为（满分 100 · 关系天阶绝学参悟、书院治学与名宿雅集论道）
          </span>
          <span className="text-xs text-[#7a6042]">
            佩戴文雅配饰或于【行囊四库】研读经史字画可精进艺道
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
          <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693] text-center">
            <div className="text-xs text-[#6b5235] song-serif font-semibold">骑术</div>
            <strong className="font-mono text-base text-[#8f1d14]">{ridingSkill}</strong>
            {equipTotals.riding > 0 && (
              <div className="text-[10px] font-mono text-[#1b5132]">
                根基{baseStats.ridingSkill} +{equipTotals.riding}
              </div>
            )}
            <div className="w-full h-1 bg-[#e2d3b9] rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-[#8f1d14]"
                style={{ width: `${Math.min(100, ridingSkill)}%` }}
              />
            </div>
          </div>
          {Object.entries(skills).map(([k, v]) => {
            const eqSkillBonus = equipTotals.skills[k] ?? 0
            const baseSkillVal = baseStats.skills[k] ?? v
            return (
              <div
                key={k}
                className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693] text-center"
              >
                <div className="text-xs text-[#6b5235] song-serif font-semibold">{k}</div>
                <strong className="font-mono text-base text-[#23180f]">{v}</strong>
                {eqSkillBonus > 0 && (
                  <div className="text-[10px] font-mono text-[#1b5132]">
                    根基{baseSkillVal} +{eqSkillBonus}
                  </div>
                )}
                <div className="w-full h-1 bg-[#e2d3b9] rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-[#5c4024]"
                    style={{ width: `${Math.min(100, v)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
