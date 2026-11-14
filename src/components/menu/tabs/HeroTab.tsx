import { useMemo } from 'react'
import { Maximize2 } from 'lucide-react'
import { FACTION_DB_MAP, MARTIAL_ART_DB_MAP } from '../../../data/gameDb'
import { computeEquipmentTotals, computeWeaponArtSynergy } from '../../../data/itemsDb'
import { computeEquippedArtsTotals } from '../../../data/playerMartialArts'
import { useGameStore } from '../../../store/useGameStore'
import {
  calcDailyExpByCategory,
  DAILY_INN_LODGING_COST,
  getHeroAge,
  isPlayerInOwnSectRegion,
} from '../../../utils/heroStats'
import { getEffectiveSpeed, resolveMountMeta } from '../../../utils/mapMath'
import { estimateHeroRealmByMp, getNextRealmTier } from '../../../utils/realmUtils'
import { CHANGSHAN_ADULT_AGE, getChangshanMonthlyStipend } from '../../../utils/sectMechanics'
import { ManagedAssetImg } from '../../common/ManagedAssetImg'
import type { LightboxState } from '../menuShared'

interface HeroTabProps {
  locationLabel: string
  onOpenLightbox: (lightbox: LightboxState) => void
}

export function HeroTab({ locationLabel, onOpenLightbox }: HeroTabProps) {
  const dayCount = useGameStore((s) => s.dayCount)
  const baseStats = useGameStore((s) => s.baseStats)
  const hp = useGameStore((s) => s.hp)
  const maxHp = useGameStore((s) => s.maxHp)
  const mp = useGameStore((s) => s.mp)
  const maxMp = useGameStore((s) => s.maxMp)
  const combatExp = useGameStore((s) => s.combatExp)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const campPos = useGameStore((s) => s.campPos)
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
  const sectState = useGameStore((s) => s.sectState)
  const restRecoverStamina = useGameStore((s) => s.restRecoverStamina)
  const setMenuTab = useGameStore((s) => s.setMenuTab)

  const heroAge = getHeroAge(dayCount)
  const heroRealm = estimateHeroRealmByMp(maxMp)
  const nextRealm = getNextRealmTier(heroRealm.rank)

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
  const inOwnSectCity = isPlayerInOwnSectRegion(currentNodeId, campPos, sectState.sectId)
  const dailyNeigongExp = calcDailyExpByCategory(true, baseStats.talents, 1.0)
  const dailyOuterExp = calcDailyExpByCategory(false, baseStats.talents, 1.0)

  const mainNeigong = equippedArts.neigong ? MARTIAL_ART_DB_MAP[equippedArts.neigong] : null
  const mainQinggong = equippedArts.qinggong ? MARTIAL_ART_DB_MAP[equippedArts.qinggong] : null
  const heroImgUrl = '/assets/characters/templates/tpl_song_scholar_fb.jpg'
  const currentSectName = sectState.sectId
    ? (FACTION_DB_MAP[sectState.sectId]?.name ?? sectState.sectId)
    : '无门无派'

  const openHeroLightbox = () =>
    onOpenLightbox({
      url: heroImgUrl,
      title: '江湖少侠 · 行侠全身绘像',
      subtitle: `年方${heroAge}岁 · 驻足【${locationLabel}】 · 武学境界【${heroRealm.label}】 · 门派【${currentSectName}·${sectState.rankLabel}】 · 已佩 ${equippedCount}/7 披挂 · 已运 ${equippedArtCount}/6 武学`,
    })

  return (
    <div className="space-y-5 text-xs sm:text-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* 左侧：少侠立绘名帖（支持点击放大） */}
        <div className="lg:col-span-4 bg-[#efe4cc] border-2 border-[#b5986e] rounded-lg p-4 flex flex-col justify-between gap-3 shadow-inner">
          <div className="flex items-center justify-between border-b border-[#cbb693] pb-2">
            <div>
              <span className="px-2 py-0.5 rounded bg-[#8f1d14] text-[#fff8eb] text-[11px] font-bold song-serif">
                {sectState.sectId
                  ? `${currentSectName} · ${sectState.rankLabel}`
                  : '江湖少侠 · 无门无派'}
              </span>
              <h4 className="song-serif font-bold text-lg text-[#23180f] mt-1">
                无名少侠（寒门游侠）
              </h4>
            </div>
            <div className="text-right text-xs text-[#6b5235]">
              <div className="font-semibold text-[#3d2814]">年龄：{heroAge} 岁</div>
              <div
                className="font-semibold text-[#781710]"
                title={
                  nextRealm
                    ? `依据内力上限（${maxMp}）精准评定；内力上限达 ${nextRealm.minMp} 可晋入【${nextRealm.label}】`
                    : `依据内力上限（${maxMp}）精准评定，已臻当世绝顶`
                }
              >
                {sectState.sectId
                  ? `第${sectState.rank}阶 · 功绩${sectState.contribution} · ${heroRealm.label}`
                  : `境界：${heroRealm.label}`}
              </div>
            </div>
          </div>

          {/* 武学境界精准定位卡（依据内力上限评定） */}
          <div className="px-2.5 py-2 rounded bg-[#faf3e3] border border-[#cbb693] flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[#6b5235]">武学境界</span>
              <span className="px-2 py-0.5 rounded bg-[#781710] text-[#fff8eb] font-bold song-serif">
                {heroRealm.label}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#5c3d1e]">
              {nextRealm
                ? `内力 ${maxMp}/${nextRealm.minMp} → ${nextRealm.label}`
                : `内力 ${maxMp} · 当世绝顶`}
            </span>
          </div>

          {/* 门派军饷 / 朝廷通缉 / 通辽嫌疑 / 燕云辽谍军令速览 */}
          {(sectState.sectId ||
            sectState.songCourtBlacklisted ||
            sectState.liaoSuspicionDebuff ||
            sectState.toumingzhuangState === 'accepted') && (
            <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693] space-y-1.5 text-xs">
              {sectState.sectId === 'SECT-22' && (
                <div className="flex items-center justify-between text-[#1f4d3b] font-medium">
                  <span>常山边军月饷</span>
                  <span className="font-mono font-bold">
                    {heroAge < CHANGSHAN_ADULT_AGE
                      ? '未满18岁暂不领饷'
                      : `${getChangshanMonthlyStipend(sectState.rank)} 两/月`}
                  </span>
                </div>
              )}
              {sectState.sectId === 'SECT-22' && heroAge < CHANGSHAN_ADULT_AGE && !sectState.activeLiaoSpy && (
                <div className="px-2 py-1 rounded bg-[#e8f0eb] border border-[#a9c7b5] text-[#1f4d3b] leading-snug">
                  未满十八岁暂免燕云诛谍军令，专心练枪筑基。
                </div>
              )}
              {sectState.activeLiaoSpy && (
                <div className="px-2 py-1 rounded bg-[#f8e3e1] border border-[#d69891] text-[#781710] leading-snug">
                  <strong>【半年诛谍军令】</strong>燕云【
                  {sectState.activeLiaoSpy.regionName} ·{' '}
                  {sectState.activeLiaoSpy.buildingName}】诛杀辽谍【
                  {sectState.activeLiaoSpy.name} · {sectState.activeLiaoSpy.realm}】（第
                  {sectState.activeLiaoSpy.deadlineDay}日前）
                </div>
              )}
              {sectState.toumingzhuangState === 'accepted' && (
                <div className="px-2 py-1 rounded bg-[#f4e1c1] border border-[#c58b38] text-[#781710]">
                  <strong>【纳投名状】</strong>须劫杀一名大宋朝廷命官以拜入绿林盟
                </div>
              )}
              {sectState.songCourtBlacklisted && (
                <div className="px-2 py-1 rounded bg-[#781710] text-[#fff8ee] font-medium">
                  ⚠️ 大宋朝廷黑名单（入开封府必遭展昭缉拿处斩）
                </div>
              )}
              {sectState.liaoSuspicionDebuff && (
                <div className="px-2 py-1 rounded bg-[#5c1610] text-[#ffdcd6] font-medium">
                  ⚠️ 通辽嫌疑（背离常山枪派 · 大宋全境好感度 -30）
                </div>
              )}
            </div>
          )}

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

        {/* 右侧：生存气血内力与战斗经验、实战四维、先天三维禀赋、行军脚力与当前运功速览 */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-4">
          {/* 1) 气血 / 内力 / 战斗经验 与住宿调息 */}
          <div className="p-4 rounded-lg bg-[#efe4cc] border border-[#c8b28e] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#cbb693] pb-2">
              <span className="song-serif font-bold text-base text-[#23180f]">
                周身气血 · 真气内息 · 战斗经验
              </span>
              <button
                type="button"
                onClick={restRecoverStamina}
                title={
                  inOwnSectCity
                    ? '身处本门驻地所在州府，免费于师门寮房调息回满气血内息'
                    : `非师门驻地须花费 ${DAILY_INN_LODGING_COST} 两纹银住店调息，回满气血与内息`
                }
                className="px-3 py-1 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] text-xs font-bold song-serif cursor-pointer shadow-sm transition"
              >
                {inOwnSectCity
                  ? '师门调息（驻地免费 · 回满气血内息）'
                  : `客舍调息（${DAILY_INN_LODGING_COST}两银 · 回满气血内息）`}
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
                  武学 +{artTotals.maxHp} · 披挂 +{equipTotals.maxHp}
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
                  内功 +{artTotals.maxMp} · 披挂 +{equipTotals.maxMp}
                </div>
              </div>

              <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693] flex flex-col justify-between">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-[#6b5033] song-serif">战斗经验（破境）</span>
                  <span className="font-mono font-bold text-[#781710]">
                    {combatExp.toLocaleString()} 点
                  </span>
                </div>
                <div className="text-[11px] text-[#52391e] font-mono">
                  禀赋单日闭关：内+{dailyNeigongExp} / 外轻+{dailyOuterExp}
                </div>
                <div className="text-[10px] text-[#7a6042] mt-1">
                  切磋/决战/当差/缉凶获取 · 良/地/天阶破境必需
                </div>
              </div>
            </div>
          </div>

          {/* 2) 实战攻防四维 vs 先天三维禀赋 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#efe4cc] border border-[#c8b28e] space-y-2.5">
              <div className="song-serif font-bold text-sm text-[#23180f] border-b border-[#cbb693] pb-1.5 flex items-center justify-between">
                <span>实战交锋属性（武学+披挂实时派生）</span>
                <span className="text-[11px] text-[#8f1d14] font-mono">回合交锋</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                  <div className="text-[#6b5235]">外功杀伤加成</div>
                  <div className="font-mono font-bold text-base text-[#8f1d14] mt-0.5">
                    +{totalAttack}
                  </div>
                  <div className="text-[10px] text-[#7a6042]">
                    披挂+{equipTotals.attack} / 招式+{artTotals.attack}
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
                    轻功 +{artTotals.agility} · 披挂 +{equipTotals.agility}
                  </div>
                </div>
                <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                  <div className="text-[#6b5235]">周身抗性（毒寒火封）</div>
                  <div className="font-mono font-bold text-base text-[#5b3b73] mt-0.5">{res}</div>
                  <div className="text-[10px] text-[#7a6042] font-mono">
                    内功 +{artTotals.res} · 披挂 +{equipTotals.res}
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
