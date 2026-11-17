import { FACTION_DB_MAP, SECT_SYSTEMS_DB } from '../../data/gameDb'
import type {
  CanonicalFactionEntry,
  HeroBaseStats,
  InventoryStack,
  PlayerSectState,
  SectRankLevel,
} from '../../types/game'
import { getSectRankTitle, SHAOLIN_CHORE_TARGET_DAYS } from './ranks'
import {
  BAJI_IRON_TOKEN_ITEM_ID,
  CHANGSHAN_JOINT_RECOMMENDATION_ITEM_ID,
  DAMING_RECOMMENDATION_ITEM_ID,
  KAIFENG_RECOMMENDATION_ITEM_ID,
  REFERRAL_REQ_BY_TARGET_SECT,
} from './referral'
import { getSectRule } from './rules'

/**
 * Evaluate entry requirements for joining `targetSectId` (3rd-tier, 2nd-tier, or 1st-tier).
 */
export interface SectJoinEvaluation {
  canJoin: boolean
  startingRank: SectRankLevel
  startingRankLabel: string
  costSilver: number
  consumeItemId: string | null
  requirementSummary: string
  blockedReason: string | null
  allowOfficialTransferFromChangshan?: boolean
}

export function evaluateSectEntry(params: {
  targetSectId: string
  sectState: PlayerSectState
  silver: number
  baseStats: HeroBaseStats
  inventory: InventoryStack[]
}): SectJoinEvaluation {
  const { targetSectId, sectState, silver, baseStats, inventory } = params
  const faction: CanonicalFactionEntry | undefined = FACTION_DB_MAP[targetSectId]
  const startingRank: SectRankLevel = faction?.acceptsOuterDisciple === false ? 2 : 1
  const startingRankLabel = getSectRankTitle(targetSectId, startingRank)

  if (!faction) {
    return {
      canJoin: false,
      startingRank: 1,
      startingRankLabel: '外门弟子',
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: '未知势力',
      blockedReason: '该势力暂不收徒。',
    }
  }

  const rule = getSectRule(targetSectId)
  if (rule?.isDlcLocked) {
    return {
      canJoin: false,
      startingRank,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: '暂未开放加入（后续剧情 / DLC 敬请期待）',
      blockedReason: `【${faction.name}】暂不开放拜入，相关专属剧情与武学传承将于后续剧情/DLC推出，敬请期待！`,
    }
  }

  const hasItem = (itemId: string) => inventory.some((st) => st.itemId === itemId && st.qty > 0)

  // Special case: SECT-33 大宋禁军 forbids direct casual entry
  if (targetSectId === 'SECT-33') {
    const rank3Label = getSectRankTitle('SECT-33', 3)
    return {
      canJoin: false,
      startingRank: 3,
      startingRankLabel: rank3Label,
      costSilver: 0,
      consumeItemId: null,
      requirementSummary:
        '须先于【开封府 / 六扇门】晋至御前护卫（Lv.4）并获今上赵祯好感 ≥ 20，完成护驾长篇任务《微服汴梁 · 血护龙颜》奉敕转任',
      blockedReason:
        '大宋禁军乃天子亲军三衙宿卫，严禁白身私投；须于【开封府 / 六扇门】晋至御前护卫（Lv.4）并获官家赵祯信重，立下护驾奇功奉敕改换军职。',
    }
  }

  // Special case: SECT-17 开封府 / 六扇门 via recommendation letters
  if (targetSectId === 'SECT-17') {
    const hasDamingLetter = hasItem(DAMING_RECOMMENDATION_ITEM_ID)
    const hasJointLetter = hasItem(CHANGSHAN_JOINT_RECOMMENDATION_ITEM_ID)
    const hasChangshanLetter = hasItem(KAIFENG_RECOMMENDATION_ITEM_ID)
    const rank2Label = getSectRankTitle('SECT-17', 2)
    const preferredRank2Letter = hasDamingLetter
      ? DAMING_RECOMMENDATION_ITEM_ID
      : hasJointLetter
        ? CHANGSHAN_JOINT_RECOMMENDATION_ITEM_ID
        : null
    const fallbackConsumeItem = preferredRank2Letter ?? KAIFENG_RECOMMENDATION_ITEM_ID
    const reqSummary =
      '持大名府《北京留守幕府举荐信》或常山枪派《常山·定州联合举荐信》（直授第2阶捕头都头，八极门/常山枪派可奉调转入），或持常山枪派《开封府推荐信》（授第1阶役卒巡捕），且清白无朝廷通缉或通辽嫌疑'
    if (sectState.songCourtBlacklisted) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: fallbackConsumeItem,
        requirementSummary: reqSummary,
        blockedReason: '少侠已名列大宋朝廷黑名单，开封府岂容投效！',
      }
    }
    if (sectState.liaoSuspicionDebuff) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: fallbackConsumeItem,
        requirementSummary: reqSummary,
        blockedReason: '少侠身负【通辽嫌疑】，朝堂上下猜忌，开封府不予录用！',
      }
    }
    if (sectState.sectId && sectState.sectId !== 'SECT-22' && sectState.sectId !== 'SECT-23') {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: fallbackConsumeItem,
        requirementSummary: reqSummary,
        blockedReason: `少侠已身在【${FACTION_DB_MAP[sectState.sectId]?.name ?? sectState.sectId}】，不可二门兼投。`,
      }
    }
    if (sectState.sectId === 'SECT-23' && !preferredRank2Letter) {
      return {
        canJoin: false,
        startingRank: 2,
        startingRankLabel: rank2Label,
        costSilver: 0,
        consumeItemId: DAMING_RECOMMENDATION_ITEM_ID,
        requirementSummary: reqSummary,
        blockedReason:
          '沧州八极门弟子欲奉调开封府，需勘破大名府《铁锁镇河朔》奇案并获贾昌朝亲签《北京留守幕府举荐信》！',
      }
    }
    if (preferredRank2Letter) {
      return {
        canJoin: true,
        startingRank: 2,
        startingRankLabel: rank2Label,
        costSilver: 0,
        consumeItemId: preferredRank2Letter,
        requirementSummary: reqSummary,
        blockedReason: null,
        allowOfficialTransferFromChangshan:
          sectState.sectId === 'SECT-22' || sectState.sectId === 'SECT-23',
      }
    }
    if (!hasChangshanLetter) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: KAIFENG_RECOMMENDATION_ITEM_ID,
        requirementSummary: reqSummary,
        blockedReason:
          '需持有大名府《北京留守幕府举荐信》、常山枪派《常山·定州联合举荐信》或《开封府推荐信》。',
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: KAIFENG_RECOMMENDATION_ITEM_ID,
      requirementSummary: reqSummary,
      blockedReason: null,
      allowOfficialTransferFromChangshan: sectState.sectId === 'SECT-22',
    }
  }

  // Must not already be in another sect
  if (sectState.sectId) {
    const curName = FACTION_DB_MAP[sectState.sectId]?.name ?? sectState.sectId
    return {
      canJoin: false,
      startingRank,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: '需为无门无派之身',
      blockedReason: `少侠目前身属【${curName}】，需先脱离原门派方可另投他门。`,
    }
  }

  // 1. Third-Tier Sects (三流小派 SECT-25..30): unified 20 silver
  if (faction.sectTier === '三流小派') {
    const reqSummary = '拜师束脩纹银 20 两'
    if (silver < 20) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 20,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: `纹银不足 20 两（当前 ${silver} 两）。`,
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 20,
      consumeItemId: null,
      requirementSummary: reqSummary,
      blockedReason: null,
    }
  }

  // 2. Referral-backed Second-Tier Sects (SECT-16 / SECT-23 / SECT-24)
  const refCfg = REFERRAL_REQ_BY_TARGET_SECT[targetSectId]
  if (refCfg) {
    if (targetSectId === 'SECT-23' && hasItem(BAJI_IRON_TOKEN_ITEM_ID)) {
      const rank2Label = getSectRankTitle('SECT-23', 2)
      return {
        canJoin: true,
        startingRank: 2,
        startingRankLabel: rank2Label,
        costSilver: 0,
        consumeItemId: BAJI_IRON_TOKEN_ITEM_ID,
        requirementSummary:
          '持卢铁山亲授《八极铁锁令》（大名府《铁锁镇河朔》奇案获授，直入内堂武师）或《齐鲁查拳馆举荐帖》',
        blockedReason: null,
      }
    }

    const srcName = FACTION_DB_MAP[refCfg.sourceSectId]?.name ?? refCfg.sourceSectId
    const bajiExtra =
      targetSectId === 'SECT-23'
        ? '；或于大名府勘破《铁锁镇河朔》奇案获卢铁山亲授《八极铁锁令》破格直入内堂'
        : ''
    const reqSummary = `需持《${refCfg.itemName}》（由【${srcName}】内门及以上弟子贿赂${refCfg.elderTitleHint} ${refCfg.costSilver} 两银子取得${bajiExtra}）`
    if (!hasItem(refCfg.itemId)) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: refCfg.itemId,
        requirementSummary: reqSummary,
        blockedReason: `行囊中未持有《${refCfg.itemName}》。请先拜入【${srcName}】晋升内门后向其${refCfg.elderTitleHint}奉银 ${refCfg.costSilver} 两求取举荐帖${targetSectId === 'SECT-23' ? '，或在大名府触发《铁锁镇河朔》奇案协助八极门洗刷冤屈' : ''}！`,
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: refCfg.itemId,
      requirementSummary: reqSummary,
      blockedReason: null,
    }
  }

  if (targetSectId === 'SECT-18') {
    const reqSummary =
      '领取「纳投名状」任务并劫掠击败一名大宋朝廷官员（入盟后列入官府黑名单，踏入开封府将被展昭缉拿）'
    if (sectState.toumingzhuangState === 'none') {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: '请先向绿林盟好汉领取【纳投名状】任务，再去外州府劫掠一名大宋官员！',
      }
    }
    if (sectState.toumingzhuangState === 'accepted') {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason:
          '尚未完成【纳投名状】！请寻一名大宋朝廷官员发起【劫道纳投名状（生死战）】并获胜后再来入盟。',
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: reqSummary,
      blockedReason: null,
    }
  }

  if (targetSectId === 'SECT-21') {
    const reqSummary = '先天根骨 ≥ 45 + 拜师束脩 50 两纹银'
    const bone = baseStats.talents.根骨
    if (bone < 45) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 50,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: `洛阳金刀门刀法刚猛沉雄，需先天根骨 ≥ 45（少侠当前根骨 ${bone}）。`,
      }
    }
    if (silver < 50) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 50,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: `金刀王家拜师束脩需 50 两纹银（少侠当前 ${silver} 两）。`,
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 50,
      consumeItemId: null,
      requirementSummary: reqSummary,
      blockedReason: null,
    }
  }

  if (targetSectId === 'SECT-22') {
    const reqSummary =
      '免束脩直接参军入伍（入门即按月领军饷 15 两起，每年2月1日与8月1日自动派发半年诛谍军令，须于两个月内完成，逾期任务消失且掌门好感 -15，连续两次逾期将被开除；升任演武教习可领开封府推荐信；主动退派获【通辽】恶名，大宋众人好感 -30）'
    if (sectState.songCourtBlacklisted) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: '少侠身负朝廷海捕黑名单，河北边军常山枪派岂容匪类投军！',
      }
    }
    if (sectState.liaoSuspicionDebuff) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: '少侠曾背弃军伍、身负【通辽嫌疑】，常山枪派永不复录！',
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: reqSummary,
      blockedReason: null,
    }
  }

  // 嵩山少林寺 (SECT-01): 山门杂役满 365 天引荐入门
  if (targetSectId === 'SECT-01') {
    const reqSummary =
      '拜谒知客禅师【玄净】问心求缘（经洛阳天津酒楼牵线打点），入寺充任山门杂役累计满 365 天后正式引荐拜入外门（默认授俗家弟子；地阶/天阶绝学须找方丈玄慈剃度转为出家弟子方可修习）'
    if (
      sectState.shaolinNoviceState === 'completed' ||
      sectState.shaolinChoreDays >= SHAOLIN_CHORE_TARGET_DAYS
    ) {
      return {
        canJoin: true,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: null,
      }
    }
    if (sectState.shaolinNoviceState === 'active') {
      const remain = Math.max(0, SHAOLIN_CHORE_TARGET_DAYS - sectState.shaolinChoreDays)
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: `少侠当前为【少林杂役弟子】（山门劳作累计 ${sectState.shaolinChoreDays} / ${SHAOLIN_CHORE_TARGET_DAYS} 天，尚差 ${remain} 天）。请于嵩山少林寺山门做满 ${SHAOLIN_CHORE_TARGET_DAYS} 天杂役后自动引荐入门！`,
      }
    }
    return {
      canJoin: false,
      startingRank: 1,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: reqSummary,
      blockedReason:
        '请先前往【大雄宝殿方丈院 · 钟鼓禅院】拜谒知客禅师【玄净】问心试佛缘（或赴洛阳府 · 洛水天津酒楼探听进身门道）！',
    }
  }

  // Table-driven bespoke entry quest guides (SECT-02..08, SECT-14, SECT-15, SECT-19, etc.)
  if (rule?.bespokeEntryGuide) {
    return {
      canJoin: false,
      startingRank: 1,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: rule.bespokeEntryGuide.requirementSummary,
      blockedReason: rule.bespokeEntryGuide.buildBlockedReason({ silver, sectState }),
    }
  }

  // Remaining First-Tier Sects & Dali Royal Clan: gated for upcoming bespoke quest chains
  const noOuterHint =
    faction.acceptsOuterDisciple === false ? '（本门不收外门弟子，入门直授内门）' : ''
  return {
    canJoin: false,
    startingRank,
    startingRankLabel,
    costSilver: 0,
    consumeItemId: null,
    requirementSummary: `一流名门专属入门试炼任务链${noOuterHint}`,
    blockedReason: `【${faction.name}】乃当世一流宗门${noOuterHint}，专属入门任务链将于下一卷开启，敬请先历练三流与二流门派！`,
  }
}

/**
 * Standard equipment & weapons automatically granted upon joining specific sects
 * (compiled from docs/MARTIAL_ARTS_SECTS.md -> sectSystems.json).
 */
export const SECT_ENTRY_GEAR_GIFTS: Record<string, string[]> = Object.fromEntries(
  Object.entries(SECT_SYSTEMS_DB.starterGearGifts).map(([sectId, items]) => [sectId, [...items]]),
)
