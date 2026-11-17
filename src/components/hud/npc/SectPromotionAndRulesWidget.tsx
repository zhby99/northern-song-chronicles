import type { NodeNpc, PlayerSectState } from '../../../types/game'
import {
  getImperialGuardMonthlyStipend,
  getSectTournamentDateInfo,
  isDaoSwordSect,
  REFERRAL_BRIBE_BY_SOURCE_SECT,
  type PromotionRequirementInfo,
} from '../../../utils/sectMechanics'

interface SectPromotionAndRulesWidgetProps {
  targetFactionId: string
  isPlayerInThisSect: boolean
  sectState: PlayerSectState
  playerName: string
  dayCount: number
  heroRealmRank: number
  hasTournamentToken: boolean
  promoEval: PromotionRequirementInfo | null
  npc: NodeNpc
  npcSectRank?: number
  onPromoteSectRank: () => void
  onCloseSubPanel: () => void
  onStartTournament: () => void
  onContinueTournamentRound: () => void
  onBribeForReferral: (npc: NodeNpc) => void
}

export function SectPromotionAndRulesWidget({
  targetFactionId,
  isPlayerInThisSect,
  sectState,
  playerName,
  dayCount,
  heroRealmRank,
  hasTournamentToken,
  promoEval,
  npc,
  npcSectRank,
  onPromoteSectRank,
  onCloseSubPanel,
  onStartTournament,
  onContinueTournamentRound,
  onBribeForReferral,
}: SectPromotionAndRulesWidgetProps) {
  const referralBribeCfg = REFERRAL_BRIBE_BY_SOURCE_SECT[targetFactionId]

  return (
    <>
      {/* 日常当差与晋升 */}
      <div className="p-3.5 rounded-lg bg-[#efe4cc]/90 border border-[#b59461] space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="font-bold text-[#5c3d1e] song-serif text-base">
              师门职司与晋升考核
            </span>
            <p className="text-xs text-[#6b5235] mt-0.5">
              {promoEval
                ? promoEval.reason
                : sectState.rank >= 5
                  ? '少侠已登临本门第5阶【掌门】绝顶尊位，可修习本门镇派天阶上品绝学！'
                  : '少侠已达常规晋升最高阶（第4阶），掌门之位不可通过常规晋升获得。'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {promoEval && (
              <button
                type="button"
                disabled={Boolean(promoEval.isFirstTierPendingDesign)}
                onClick={onPromoteSectRank}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border ${
                  promoEval.isFirstTierPendingDesign
                    ? 'bg-[#8c7b65]/40 border-[#a89882] text-[#f7eedc]/80 cursor-not-allowed'
                    : promoEval.canPromote
                      ? 'bg-[#1f4d3b] hover:bg-[#28634c] border-[#8fc7ae] text-[#fff8ee] cursor-pointer'
                      : 'bg-[#8c7b65]/60 border-[#a89882] text-[#f7eedc] cursor-pointer'
                }`}
              >
                {promoEval.isFirstTierPendingDesign
                  ? '一流晋升待实装'
                  : `晋升【${promoEval.targetRankLabel}】`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 嵩山少林寺：俗家与出家僧俗戒律说明 */}
      {targetFactionId === 'SECT-01' && (
        <div className="p-3.5 rounded-lg bg-[#faf3e3] border border-[#b59461] space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-[#5c3d1e] song-serif text-sm sm:text-base">
              少林僧俗清规 · 剃度受戒制度
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded font-bold ${
                sectState.shaolinDiscipleType === 'monk'
                  ? 'bg-[#6b4614] text-[#fff6e0]'
                  : 'bg-[#efe4cc] border border-[#cbb693] text-[#5c3d1e]'
              }`}
            >
              {sectState.shaolinDiscipleType === 'monk'
                ? `出家弟子（法号：${playerName}）`
                : '俗家弟子（带发修行）'}
            </span>
          </div>
          <p className="text-xs text-[#6b5235] leading-relaxed">
            {sectState.shaolinDiscipleType === 'monk'
              ? `小师父已于大雄正殿礼拜方丈【玄慈】落发受戒，赐法号「${playerName}」。凡本门职阶达标之【地阶】与【天阶】不传秘典，皆可依序参学！`
              : '山门杂役期满默认收录为【俗家弟子】，可正常完成师门历练晋升职阶；唯少林【地阶】与【天阶】秘传武学概不传授俗家弟子。若欲参研绝学，可随时赴【大雄宝殿方丈院 · 大雄正殿】拜见方丈【玄慈】请求剃度出家（改赐法号「慧见」并换穿佛子僧衣）。'}
          </p>
        </div>
      )}

      {targetFactionId === 'SECT-04' && (
        <div className="p-3.5 rounded-lg bg-[#faf3e3] border border-[#b59461] space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-[#5c3d1e] song-serif text-sm sm:text-base">
              莆田南少林 · 九莲僧俗衣钵戒律
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded font-bold ${
                isPlayerInThisSect && sectState.shaolinDiscipleType === 'monk'
                  ? 'bg-[#6b4614] text-[#fff6e0]'
                  : 'bg-[#efe4cc] border border-[#cbb693] text-[#5c3d1e]'
              }`}
            >
              {!isPlayerInThisSect
                ? '入门奉茶时一次择定'
                : sectState.shaolinDiscipleType === 'monk'
                  ? `清修武僧（法号：${playerName}）`
                  : '护寺俗家（地阶永锁）'}
            </span>
          </div>
          <p className="text-xs text-[#6b5235] leading-relaxed">
            {!isPlayerInThisSect
              ? '九莲山祖训：闯过百杰木人巷奉茶入门时须当场择定僧俗衣钵——择【持戒参禅 · 清修武僧】者落发受赐法号「弘毅」并换穿少林佛子僧衣，解锁本门【地阶】功法；若择【带发入世 · 护寺俗家】，入册后不可再剃度，本门所有【地阶】功法对主角永远不开放。'
              : sectState.shaolinDiscipleType === 'monk'
                ? `小师父已于九莲大雄宝殿礼拜方丈【元苦】落发受戒，赐法号「${playerName}」。凡本门职阶达标之【地阶】秘传功法，皆可依序参学！`
                : '少侠入门时已择定【带发入世 · 护寺俗家】名册，可正常历练晋升职阶并修习凡品、良品武学；依九莲山祖训，护寺俗家不可再行剃度，本门所有【地阶】秘传功法对少侠永远不开放。'}
          </p>
        </div>
      )}

      {/* 道门与名山剑派：一年一度宗门大比（每年二月一日） */}
      {isDaoSwordSect(targetFactionId) && (() => {
        const tInfo = getSectTournamentDateInfo(dayCount)
        const activeTourney = sectState.activeSectTournament
        const realmEligible = heroRealmRank >= 1 && heroRealmRank <= 6
        const alreadyEnteredThisYear = sectState.lastTournamentYear >= tInfo.yearIndex
        const canRegister =
          !activeTourney &&
          tInfo.isTournamentDay &&
          !alreadyEnteredThisYear &&
          realmEligible
        const roundLabel =
          activeTourney?.round === 1
            ? '八强战'
            : activeTourney?.round === 2
              ? '四强半决赛'
              : '决赛夺魁战'
        return (
          <div className="p-3.5 rounded-lg bg-[#faf3e3] border border-[#b59461] space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-bold text-[#5c3d1e] song-serif text-sm sm:text-base">
                  一年一度宗门大比（每年二月一日）
                </div>
                <div className="text-xs text-[#6b5235] mt-0.5">
                  限三流与二流境界同门报名，共 8 人 1v1 三轮淘汰赛（八强 → 四强 → 决赛）。夺魁可获《宗门大比冠军信物》及丹药银钱奖励。
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {activeTourney ? (
                  <button
                    type="button"
                    onClick={() => {
                      onCloseSubPanel()
                      onContinueTournamentRound()
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#1f4d3b] hover:bg-[#28634c] border border-[#8fc7ae] text-[#fff8ee] text-xs font-bold cursor-pointer"
                  >
                    出战宗门大比 · {roundLabel}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!canRegister}
                    onClick={() => {
                      onCloseSubPanel()
                      onStartTournament()
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border ${
                      canRegister
                        ? 'bg-[#1f4d3b] hover:bg-[#28634c] border-[#8fc7ae] text-[#fff8ee] cursor-pointer'
                        : 'bg-[#8c7b65]/45 border-[#a89882] text-[#f7eedc]/85 cursor-not-allowed'
                    }`}
                  >
                    {!tInfo.isTournamentDay
                      ? '非二月一日（未到比试之期）'
                      : alreadyEnteredThisYear
                        ? '本年度已参赛'
                        : !realmEligible
                          ? '仅限三流/二流境界报名'
                          : '报名参加宗门大比'}
                  </button>
                )}
              </div>
            </div>
            {(sectState.wonSectTournament || hasTournamentToken) && (
              <div className="text-xs text-[#1b5132] bg-[#e2f2e8] border border-[#82b99d] rounded px-2.5 py-1">
                ✓ 少侠已曾夺得宗门大比冠军并持有《宗门大比冠军信物》，满足晋升第3阶真传弟子的比武凭证要求。
              </div>
            )}
          </div>
        )
      })()}

      {/* 大宋禁军（SECT-33）：三衙军籍与按月军俸说明 */}
      {targetFactionId === 'SECT-33' && (
        <div className="p-3.5 rounded-lg bg-[#fbf2e1] border border-[#b45309]/70 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="font-bold text-[#781710] song-serif text-sm sm:text-base">
              大宋禁军 · 三衙宿卫军籍
            </div>
            {isPlayerInThisSect ? (
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#781710] text-[#fff8ee]">
                {`现授 ${sectState.rankLabel} · 月俸 ${getImperialGuardMonthlyStipend(sectState.rank)} 两 / 月`}
              </span>
            ) : (
              <span className="text-xs px-2.5 py-0.5 rounded bg-[#efe4cc] border border-[#cbb693] text-[#6b5235]">
                天子亲军 · 须经御前敕命改任
              </span>
            )}
          </div>
          <p className="text-xs text-[#5c3d1e] leading-relaxed">
            三衙禁军统领天子宿卫与河东、延安边军名帅，不设门派专属武学秘谱，将校皆凭自身历练兼修枪棒硬功与沙场御甲名驹；按月支放朝廷军俸。
          </p>
        </div>
      )}

      {/* 三流门派向二流门派贿赂求取举荐帖专属栏 */}
      {referralBribeCfg && (
        <div className="p-3.5 rounded-lg bg-[#faf3e3] border border-[#c58b38] flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5 max-w-xl">
            <div className="font-bold text-[#781710] song-serif">
              二流名门引荐关节：《{referralBribeCfg.itemName}》
            </div>
            <div className="text-xs text-[#5c3d1e]">
              晋升至本门第2阶内门后，寻本门第4阶【{referralBribeCfg.elderTitleHint}】奉银{' '}
              {referralBribeCfg.costSilver} 两即可获授举荐帖，退派后凭帖直入【
              {referralBribeCfg.targetSectName}】！
            </div>
          </div>
          {npcSectRank === 4 ? (
            <button
              type="button"
              onClick={() => onBribeForReferral(npc)}
              className="px-3.5 py-2 rounded-lg bg-[#781710] hover:bg-[#961f16] border border-[#e3b07b] text-[#fff8ee] text-xs font-bold shadow cursor-pointer"
            >
              奉银{referralBribeCfg.costSilver}两求取《{referralBribeCfg.itemName}》
            </button>
          ) : (
            <span className="text-xs px-2.5 py-1 rounded bg-[#efe4cc] border border-[#cbb693] text-[#6b5235]">
              当前交互对象非第4阶【{referralBribeCfg.elderTitleHint}】
            </span>
          )}
        </div>
      )}
    </>
  )
}
