import { MARTIAL_ART_DB_MAP } from '../../../data/gameDb'
import { ITEM_DB_MAP } from '../../../data/itemsDb'
import { scaleMedicineRecovery } from '../../stats/realmUtils'
import {
  computeQinSoundAmpPct,
  computeShuBrushAmpPct,
  isBrushMartialArt,
  isSoundMartialArt,
} from '../../economy'
import {
  type AfterHitContext,
  type BeforeHitContext,
  COMBAT_EFFECT_REGISTRY,
  type DamageModifyContext,
  runEffectAfterHit,
  runEffectBeforeHit,
  runEffectModifyFinalDamage,
} from '../effects/registry'
import {
  canFighterEscape,
  computeDodgeChancePreview,
  computeEffectiveAgility,
  computeEscapeChancePreview,
  computeMoveMpCost,
  getArtRawDamageAndKind,
  getLearnedLevel,
  getSlotEffectsMap,
  canUseCombatItem,
  COMBAT_ITEM_USE_LIMIT,
  mapArtCategoryToVfx,
  PALM_INSTINCT_PIERCE_PCT,
} from '../formulas'
import { sampleDamageRoll } from '../rng'
import {
  type CombatActionChoice,
  type CombatantState,
  type CombatFloatingPopup,
  type FxKey,
  MOVE_SLOT_KEYS,
  type SlotEffectsMap,
} from '../types'
import type { BlindDecisionEntry, CombatRoundContext, ScoredOrderEntry } from './context'

function resolveEscapeStep(
  ctx: CombatRoundContext,
  actor: CombatantState,
  livingOpponents: CombatantState[],
  decisionMap: Map<string, BlindDecisionEntry>,
  actorSide: 'player' | 'npc',
  targetSide: 'player' | 'npc',
): void {
  actor.lastUsedArtId = null
  const fastPursuer = livingOpponents.reduce((best, cur) =>
    computeEffectiveAgility(cur) > computeEffectiveAgility(best) ? cur : best,
  )
  ctx.currentStepTargetUnitId = fastPursuer.unitId
  const escCheck = canFighterEscape(
    actor,
    fastPursuer,
    ctx.session.duelStakes,
    ctx.session.forbidEscapeReason,
  )
  if (!escCheck.allowed) {
    ctx.pushLog('special', `${actor.name}欲抽身退走，奈何${escCheck.reason}！`)
    ctx.flushBeat({
      kind: 'escape',
      actorSide,
      targetSide,
      bannerTitle: '抽身受阻',
      bannerSubtitle: escCheck.reason ?? '身法受制',
      vfxCategory: 'escape',
      popups: [
        {
          id: ctx.nextPopupId(),
          side: actorSide,
          text: '脱身受阻！',
          style: 'debuff',
        },
      ],
    })
    return
  }

  const chance = computeEscapeChancePreview(
    actor,
    fastPursuer,
    ctx.session.duelStakes,
    ctx.session.forbidEscapeReason,
  )
  const allPursuersDefending = livingOpponents.every(
    (o) => decisionMap.get(o.unitId)?.choice.type === 'defend',
  )
  const finalEscapeChance = allPursuersDefending ? Math.min(0.95, chance + 0.25) : chance
  if (ctx.rng() < finalEscapeChance) {
    ctx.escapedSuccess = true
    ctx.pushLog(
      'system',
      `${actor.name}虚晃一招纵身掠出战圈（身法比拼脱身率 ${Math.round(finalEscapeChance * 100)}% 成功），双方罢手收招！`,
    )
    ctx.flushBeat({
      kind: 'escape',
      actorSide,
      targetSide,
      bannerTitle: '虚晃一招 · 飘然脱身',
      bannerSubtitle: `轻功掠出战圈（成功率 ${Math.round(finalEscapeChance * 100)}%）`,
      vfxCategory: 'escape',
      popups: [
        {
          id: ctx.nextPopupId(),
          side: actorSide,
          text: '飘然脱战！',
          style: 'dodge',
        },
      ],
    })
  } else {
    ctx.pushLog(
      'info',
      `${actor.name}纵身欲退，却被${fastPursuer.name}欺身封住去路（脱身率 ${Math.round(finalEscapeChance * 100)}% 未果）！`,
    )
    ctx.flushBeat({
      kind: 'escape',
      actorSide,
      targetSide,
      bannerTitle: '抽身未果',
      bannerSubtitle: `${fastPursuer.name}欺身封死退路`,
      vfxCategory: 'escape',
      popups: [
        {
          id: ctx.nextPopupId(),
          side: actorSide,
          text: '脱战未果！',
          style: 'debuff',
        },
      ],
    })
  }
}

function resolveItemStep(
  ctx: CombatRoundContext,
  actor: CombatantState,
  target: CombatantState,
  itemId: string,
  targetChoice: CombatActionChoice,
  actorSide: 'player' | 'npc',
  targetSide: 'player' | 'npc',
): void {
  // 服药施毒不解除「禁连发同招」锁：上回合刚施展的招式本回合之后仍不得连发
  const itemDef = ITEM_DB_MAP[itemId]
  if (!itemDef) return
  if (!canUseCombatItem(actor)) {
    ctx.pushLog(
      'info',
      `${actor.name}探囊摸索，随身丹药毒物本场已用满 ${COMBAT_ITEM_USE_LIMIT} 次，一时措手不及！`,
    )
    return
  }
  // 丹药毒物仅在真正轮到出手时才算服下 / 施放（被先手击倒或敌阵已清空则原物退回行囊）
  actor.itemUses = (actor.itemUses ?? 0) + 1
  if (actor.isPlayer) ctx.playerItemUsedId = itemId

  if (itemDef.poisonEffect) {
    // 暗器毒粉须过敌方身法闪避检定（守御架势时更易拂袖避开）
    const targetDefending = targetChoice.type === 'defend'
    const dodgeChance = computeDodgeChancePreview(target, actor, targetDefending)
    if (ctx.rng() < dodgeChance) {
      ctx.pushLog(
        'info',
        `${actor.name}扬手撒出【${itemDef.name}】，${target.name}身形一晃拂袖避过，毒雾尽数落空！`,
      )
      ctx.flushBeat({
        kind: 'attack',
        actorSide,
        targetSide,
        bannerTitle: `奇毒 · ${itemDef.name}`,
        bannerSubtitle: '被身法闪过',
        vfxCategory: 'poison',
        isHeavenTier: false,
        shakeLevel: 0,
        popups: [
          { id: ctx.nextPopupId(), side: targetSide, text: '闪避', subText: '毒雾落空', style: 'dodge' },
        ],
      })
      return
    }
    const targetNgFx = getSlotEffectsMap(target, 'neigong')
    let antiPoisonBoost = 0
    for (const [key, val] of Object.entries(targetNgFx) as Array<[FxKey, number]>) {
      const fn = COMBAT_EFFECT_REGISTRY[key]?.modifyAntiPoisonPct
      if (fn) antiPoisonBoost += fn(val)
    }
    const wardScale = targetNgFx.xisui_ward
      ? Math.max(0.25, 1 - targetNgFx.xisui_ward / 100)
      : 1.0
    const effRes = target.res * (1 + antiPoisonBoost)
    const resMit = Math.min(0.8, effRes / 160)
    const postMult = targetChoice.type === 'defend' ? 0.65 : 1.0

    const spec = itemDef.poisonCombat ?? { damage: 120, slowPct: 15, weakPct: 15 }
    const basePoisonDmg = spec.damage
    const mpDrainRatio = (spec.mpDrainPct ?? 0) / 100
    const slowAdd = spec.slowPct
    const weakAdd = spec.weakPct
    const stunAllowed = spec.stunMaxRes === undefined || effRes < spec.stunMaxRes
    const stunProb = stunAllowed ? ((spec.stunChancePct ?? 0) / 100) * (1 - resMit) : 0
    if (spec.resShred) {
      target.res = Math.max(0, target.res - spec.resShred)
    }

    const pDmg = Math.max(8, Math.round(basePoisonDmg * (1 - resMit) * wardScale * postMult))
    const mpLost =
      mpDrainRatio > 0 ? Math.round(target.mp * mpDrainRatio * (1 - resMit) * wardScale) : 0
    target.hp = Math.max(0, target.hp - pDmg)
    target.mp = Math.max(0, target.mp - mpLost)
    target.slowTurns = Math.max(target.slowTurns, 2)
    target.slowPct = Math.max(target.slowPct, Math.round(slowAdd * wardScale))
    target.weakTurns = Math.max(target.weakTurns, 2)
    target.weakPct = Math.max(target.weakPct, Math.round(weakAdd * wardScale))

    const extraNotes: string[] = [`毒伤 ${pDmg} 气血`]
    if (mpLost > 0) extraNotes.push(`蚀散 ${mpLost} 内力`)
    extraNotes.push(`迟缓 -${target.slowPct}% / 滞气 -${target.weakPct}%`)

    const poisonPopups: CombatFloatingPopup[] = [
      {
        id: ctx.nextPopupId(),
        side: targetSide,
        text: `-${pDmg}`,
        subText: `奇毒·${itemDef.name}`,
        style: 'debuff',
      },
    ]
    if (mpLost > 0) {
      poisonPopups.push({
        id: ctx.nextPopupId(),
        side: targetSide,
        text: `-${mpLost} 内力`,
        style: 'mp',
      })
    }

    if (target.hp > 0 && stunProb > 0 && ctx.rng() < stunProb) {
      target.stunnedNextRound = true
      extraNotes.push('麻痹封脉（下回合禁出招）')
      poisonPopups.push({
        id: ctx.nextPopupId(),
        side: targetSide,
        text: '麻痹封脉！',
        style: 'special',
      })
    }

    ctx.pushLog(
      'special',
      `${actor.name}翻掌暗扣【${itemDef.name}】骤然施放！${target.name}猝不及防受奇毒侵脉（${extraNotes.join(
        ' · ',
      )}）！`,
    )
    ctx.flushBeat({
      kind: 'attack',
      actorSide,
      targetSide,
      bannerTitle: `奇毒 · ${itemDef.name}`,
      bannerSubtitle: extraNotes.join(' · '),
      vfxCategory: 'poison',
      isHeavenTier: itemDef.rarity === '天阶',
      shakeLevel: itemDef.rarity === '天阶' ? 2 : 1,
      popups: poisonPopups,
    })
    return
  }

  const eff = itemDef.useEffect
  if (!eff) return

  const notes: string[] = []
  const itemPopups: CombatFloatingPopup[] = []
  if (itemDef.rarity === '天阶' || itemDef.rarity === '地阶') {
    if (eff.maxHp) {
      actor.maxHp += eff.maxHp
      actor.hp = Math.min(actor.maxHp, actor.hp + eff.maxHp)
      notes.push(`气血上限 +${eff.maxHp}`)
    }
    if (eff.maxMp) {
      actor.maxMp += eff.maxMp
      actor.mp = Math.min(actor.maxMp, actor.mp + eff.maxMp)
      notes.push(`内力上限 +${eff.maxMp}`)
    }
    if (eff.agi) {
      actor.agility += eff.agi
      notes.push(`身法 +${eff.agi}`)
    }
    if (eff.res) {
      actor.res += eff.res
      notes.push(`抗性 +${eff.res}`)
    }
  }
  if (eff.hp) {
    const scaledHp = scaleMedicineRecovery(eff.hp, actor.maxHp, actor.maxMp)
    const before = actor.hp
    actor.hp = Math.min(actor.maxHp, actor.hp + scaledHp)
    const gainedHp = actor.hp - before
    notes.push(`气血 +${gainedHp}`)
    if (gainedHp > 0) {
      itemPopups.push({
        id: ctx.nextPopupId(),
        side: actorSide,
        text: `+${gainedHp}`,
        subText: '气血回春',
        style: 'heal',
      })
    }
  }
  if (eff.mp) {
    const scaledMp = scaleMedicineRecovery(eff.mp, actor.maxHp, actor.maxMp)
    const before = actor.mp
    actor.mp = Math.min(actor.maxMp, actor.mp + scaledMp)
    const gainedMp = actor.mp - before
    notes.push(`内力 +${gainedMp}`)
    if (gainedMp > 0) {
      itemPopups.push({
        id: ctx.nextPopupId(),
        side: actorSide,
        text: `+${gainedMp} 内力`,
        style: 'mp',
      })
    }
  }
  if (eff.curePoison) {
    if (actor.slowTurns > 0 || actor.weakTurns > 0 || actor.poisonDotTurns > 0) {
      actor.slowTurns = 0
      actor.slowPct = 0
      actor.weakTurns = 0
      actor.weakPct = 0
      actor.poisonDotTurns = 0
      actor.poisonDotDmg = 0
      notes.push('涤除体内滞涩奇毒')
      itemPopups.push({
        id: ctx.nextPopupId(),
        side: actorSide,
        text: '百毒涤清！',
        style: 'special',
      })
    }
  }
  if (itemPopups.length === 0) {
    itemPopups.push({
      id: ctx.nextPopupId(),
      side: actorSide,
      text: itemDef.name,
      subText: '药力周流',
      style: 'heal',
    })
  }
  ctx.pushLog(
    'player',
    `${actor.name}探囊取服【${itemDef.name}】，药力化开周流百骸（${
      notes.length > 0 ? notes.join(' · ') : '神清气爽'
    }）！`,
  )
  ctx.flushBeat({
    kind: 'item',
    actorSide,
    bannerTitle: `服丹 · ${itemDef.name}`,
    bannerSubtitle: notes.join(' · ') || '药力周流百骸',
    vfxCategory: 'heal',
    popups: itemPopups,
  })
}

export function resolveOrderedActionSteps(
  ctx: CombatRoundContext,
  scoredOrder: ScoredOrderEntry[],
  decisionMap: Map<string, BlindDecisionEntry>,
  orderIndexByUnitId: Map<string, number>,
): void {
  const { allies, enemies, player, unitById, isMultiCombat } = ctx

  for (const step of scoredOrder) {
    const actor = step.fighter
    const choice = step.choice
    if (ctx.escapedSuccess || player.hp <= 0 || enemies.every((e) => e.hp <= 0)) break
    if (actor.hp <= 0) continue
    if (ctx.interruptedIds.has(actor.unitId)) {
      // 被破招打断：本回合并未施展任何武学，不应占用「禁连发同招」锁
      actor.lastUsedArtId = null
      continue
    }

    const opposingTeam = actor.team === 'ally' ? enemies : allies
    const livingOpponents = opposingTeam.filter((o) => o.hp > 0)
    if (livingOpponents.length === 0) break

    let target = unitById.get(step.targetUnitId)
    const needsOffensiveTarget =
      choice.type === 'move' ||
      (choice.type === 'item' && Boolean(ITEM_DB_MAP[choice.itemId]?.poisonEffect))
    if (!target || target.hp <= 0) {
      const prevName = target?.name
      target = livingOpponents[0]!
      if (needsOffensiveTarget && prevName) {
        ctx.pushLog(
          'info',
          `${actor.isPlayer ? '少侠' : actor.name}见${prevName}已败下阵去，当即拧腰变招直取${
            target.isPlayer ? '少侠' : target.name
          }！`,
        )
      }
    }

    const targetChoice: CombatActionChoice =
      decisionMap.get(target.unitId)?.choice ?? { type: 'defend' }
    const actorSide: 'player' | 'npc' = actor.team === 'ally' ? 'player' : 'npc'
    const targetSide: 'player' | 'npc' = target.team === 'ally' ? 'player' : 'npc'
    ctx.currentStepActorUnitId = actor.unitId
    ctx.currentStepTargetUnitId = target.unitId

    if (choice.type === 'escape') {
      resolveEscapeStep(ctx, actor, livingOpponents, decisionMap, actorSide, targetSide)
      if (ctx.escapedSuccess) break
      continue
    }

    if (choice.type === 'item') {
      resolveItemStep(ctx, actor, target, choice.itemId, targetChoice, actorSide, targetSide)
      continue
    }

    if (choice.type !== 'move') {
      continue
    }

    const artId = actor.equippedArts[choice.slot]
    const art = artId ? MARTIAL_ART_DB_MAP[artId] : undefined
    if (!art) continue

    actor.lastUsedArtId = art.id
    if (actor.isPlayer && !actor.usedArtIdsHistory.includes(art.id)) {
      actor.usedArtIdsHistory.push(art.id)
    }

    const level = getLearnedLevel(actor.learnedArts, art.id)
    const { damage: moveDmg, kind, subTypeLabel } = getArtRawDamageAndKind(art, level)
    const moveVfx = mapArtCategoryToVfx(art.category)
    const actorNgFx = getSlotEffectsMap(actor, 'neigong')
    const targetNgFx = getSlotEffectsMap(target, 'neigong')
    const actorQgFx = getSlotEffectsMap(actor, 'qinggong')
    const targetQgFx = getSlotEffectsMap(target, 'qinggong')
    let moveFx = getSlotEffectsMap(actor, choice.slot)
    let targetMoveFx: SlotEffectsMap = {}
    if (targetChoice.type === 'move') {
      const tArtId = target.equippedArts[targetChoice.slot]
      const tArt = tArtId ? MARTIAL_ART_DB_MAP[tArtId] : undefined
      const tCost = tArt
        ? computeMoveMpCost(
            target,
            getArtRawDamageAndKind(tArt, getLearnedLevel(target.learnedArts, tArt.id)).damage,
          )
        : 0
      // 内力不足以催动所选招式时，招式附带的守御特效（如真武太极剑意）同样无从发动
      if (target.mp >= tCost) {
        targetMoveFx = { ...getSlotEffectsMap(target, targetChoice.slot) }
      }
    }
    // 《天山折梅手》「学无止境」减伤为已看破路数后的常驻效果，不要求本回合恰好施展折梅手
    if (targetMoveFx.zhemeishou_red === undefined && target.zhemeishouStacks > 0) {
      for (const slot of MOVE_SLOT_KEYS) {
        const fx = getSlotEffectsMap(target, slot)
        if (fx.zhemeishou_red !== undefined) {
          targetMoveFx.zhemeishou_red = fx.zhemeishou_red
          break
        }
      }
    }
    const targetNgLv = getLearnedLevel(target.learnedArts, target.equippedArts.neigong)

    // 1. 扣除招式内力消耗
    const mpCost = computeMoveMpCost(actor, moveDmg)
    let lowMpMult = 1.0
    let mpNote = `耗内 ${mpCost}`
    if (actor.mp < mpCost) {
      actor.mp = 0
      lowMpMult = 0.6
      moveFx = {}
      mpNote = '内力枯竭强催招式（威力六折）'
    } else {
      actor.mp -= mpCost
    }

    const isTargetDefending = targetChoice.type === 'defend'
    const qinSoundAmp =
      (actor.qinSkill ?? 0) > 0 && isSoundMartialArt(art)
        ? computeQinSoundAmpPct(actor.qinSkill ?? 0)
        : 0
    const shuBrushAmp =
      (actor.shuSkill ?? 0) > 0 && isBrushMartialArt(art, actor.equipped.weapon)
        ? computeShuBrushAmpPct(actor.shuSkill ?? 0)
        : 0
    const beforeHitCtx: BeforeHitContext = {
      round: ctx.round,
      rng: ctx.rng,
      pushLog: ctx.pushLog,
      nextPopupId: ctx.nextPopupId,
      actor,
      target,
      art,
      actorSide,
      targetSide,
      targetChoice,
      isTargetDefending,
      actorNgFx,
      actorQgFx,
      moveFx,
      targetNgFx,
      targetQgFx,
      targetMoveFx,
      targetNgLv,
      kind,
      interruptedIds: ctx.interruptedIds,
      escapeLockBonus: 0,
      didInterruptMove: false,
      ampPct: (actor.synergyBonusBySlot[choice.slot] ?? 0) / 100 + qinSoundAmp + shuBrushAmp,
      piercePct: 0,
      nullifyPierce: false,
      specRed: 0,
      guardPenPct: 0,
    }

    // 逃跑拦截钩子（如暴雨梨花针）
    for (const [key, val] of Object.entries(moveFx) as Array<[FxKey, number]>) {
      COMBAT_EFFECT_REGISTRY[key]?.onCheckEscapeLock?.(val, beforeHitCtx)
    }

    // 2. 闪避检定（暗器本能无视 30% 闪避 + 特效无视闪避）
    let dodgeChance = computeDodgeChancePreview(target, actor, isTargetDefending)
    const hiddenInstinctMult = art.category === '暗器' ? 0.7 : 1.0
    let ignoreDodgePct = 0
    if (moveFx.baihong_curve !== undefined) {
      ignoreDodgePct = COMBAT_EFFECT_REGISTRY.baihong_curve.modifyIgnoreDodgePct!(
        moveFx.baihong_curve,
      )
    } else {
      for (const [key, val] of Object.entries(moveFx) as Array<[FxKey, number]>) {
        const fn = COMBAT_EFFECT_REGISTRY[key]?.modifyIgnoreDodgePct
        if (fn) ignoreDodgePct = Math.max(ignoreDodgePct, fn(val))
      }
    }
    dodgeChance = Math.max(
      0,
      Math.min(1, dodgeChance * hiddenInstinctMult * (1 - ignoreDodgePct)),
    )

    if (ctx.rng() < dodgeChance) {
      const qgId = target.equippedArts.qinggong
      const qgName =
        qgId && MARTIAL_ART_DB_MAP[qgId]
          ? `《${MARTIAL_ART_DB_MAP[qgId]!.cleanName}》`
          : '轻灵身法'
      const dodgePopups: CombatFloatingPopup[] = [
        {
          id: ctx.nextPopupId(),
          side: targetSide,
          text: '掠影闪避！',
          subText: qgName,
          style: 'dodge',
        },
      ]
      ctx.pushLog(
        'dodge',
        `${actor.name}施展《${art.cleanName}》（${mpNote}），${target.name}展开${qgName}潇洒滑开，片叶不沾！（闪避率 ${Math.round(
          dodgeChance * 100,
        )}%）`,
      )
      ctx.flushBeat({
        kind: 'dodge',
        actorSide,
        targetSide,
        bannerTitle: `《${art.cleanName}》`,
        bannerSubtitle: `${target.name}展开${qgName}掠影闪开！`,
        vfxCategory: moveVfx,
        popups: dodgePopups,
      })
      continue
    }

    // 破招打断检定（如独孤九剑）
    for (const [key, val] of Object.entries(moveFx) as Array<[FxKey, number]>) {
      COMBAT_EFFECT_REGISTRY[key]?.onCheckMoveInterrupt?.(val, beforeHitCtx)
    }

    // 3. 运行注册表 onBeforeHit 聚合增伤、破甲、护体减伤与破守穿透
    beforeHitCtx.ampPct += beforeHitCtx.escapeLockBonus
    runEffectBeforeHit(beforeHitCtx)

    const qiDriveMult = 1 + Math.sqrt(Math.max(0, actor.mp)) / 50
    const weakMult = actor.weakTurns > 0 ? Math.max(0.3, 1 - actor.weakPct / 100) : 1.0
    const attackPower =
      (moveDmg + actor.equipAttack * 1.2) *
      qiDriveMult *
      (1 + beforeHitCtx.ampPct) *
      lowMpMult *
      weakMult

    // 4. 计算守方护体 DefRaw（身法降权：去掉物理护体中的 defAgi * 1.5）
    let antiPoisonBoost = 0
    if (art.category === '毒功' || actorNgFx.beiming_drain || actorNgFx.huagong_burn) {
      for (const [key, val] of Object.entries(targetNgFx) as Array<[FxKey, number]>) {
        const fn = COMBAT_EFFECT_REGISTRY[key]?.modifyAntiPoisonPct
        if (fn) antiPoisonBoost += fn(val)
      }
    }
    const effRes = target.res * (1 + antiPoisonBoost)
    const defRaw =
      kind === '物理'
        ? target.equipDefense * 1.5 + target.mp * 0.16
        : effRes * 5 + target.mp * 0.08

    // 拳掌大类本能「绵劲透甲」：劲力透甲直入，额外无视目标 20% 护体防御（与破甲特效相乘叠加）
    const isPalmPierceInstinct = art.category === '拳掌' && defRaw > 0
    const palmPierceMult = isPalmPierceInstinct ? 1 - PALM_INSTINCT_PIERCE_PCT : 1
    const effDef = Math.max(0, defRaw * (1 - beforeHitCtx.piercePct) * palmPierceMult)
    const mitigation = effDef / (effDef + 800)

    // 防御姿态系数 & 武学大类本能（刀/棍破守+30%，枪后手反击+20%，拳掌透甲20%）& 破绽易伤+25%
    let postureMult = isTargetDefending ? 0.5 : 1.0
    if (isTargetDefending && beforeHitCtx.guardPenPct > 0) {
      postureMult = 0.5 + 0.5 * beforeHitCtx.guardPenPct
    }
    const isGuardBreakInstinct =
      isTargetDefending && (art.category === '刀法' || art.category === '棍棒')
    if (isGuardBreakInstinct) {
      postureMult *= 1.3
    }

    const actorOrderIdx = orderIndexByUnitId.get(actor.unitId) ?? 0
    const targetOrderIdx = orderIndexByUnitId.get(target.unitId) ?? 0
    const isSpearCounterInstinct = art.category === '枪法' && actorOrderIdx > targetOrderIdx
    const spearCounterMult = isSpearCounterInstinct ? 1.2 : 1.0

    const isTargetExposed = target.exposed
    const exposedVulnMult = isTargetExposed ? 1.25 : 1.0

    // 思过崖《石室止戈》气宗剑理贯通（剑法伤害 +12%）&《魔刻噬心》破岳诡剑（对华山门人与华山武学增伤 +25%）
    const hsSwordEssenceMult = actor.hsSwordEssence && art.category === '剑法' ? 1.12 : 1.0
    const isTargetHuashan =
      Boolean(actor.hsPoyueGuijian) &&
      (target.factionId === 'SECT-05' ||
        target.factionName.includes('华山') ||
        [
          target.equippedArts.neigong,
          target.equippedArts.qinggong,
          target.equippedArts.move1,
          target.equippedArts.move2,
          target.equippedArts.move3,
          target.equippedArts.move4,
        ].some((aid) => Boolean(aid && MARTIAL_ART_DB_MAP[aid]?.sectId === 'SECT-05')))
    const hsPoyueMult = isTargetHuashan ? 1.25 : 1.0

    const tacticalTags: string[] = []
    if (isGuardBreakInstinct) tacticalTags.push('刀棍破守+30%')
    if (isSpearCounterInstinct) tacticalTags.push('枪道后发+20%')
    if (isPalmPierceInstinct) tacticalTags.push('拳掌透甲20%')
    if (isTargetExposed) tacticalTags.push('痛击破绽+25%')
    if (hsSwordEssenceMult > 1) tacticalTags.push('太岳剑髓+12%')
    if (hsPoyueMult > 1) tacticalTags.push('破岳诡剑+25%')
    if (qinSoundAmp > 0) tacticalTags.push(`琴韵音杀+${(qinSoundAmp * 100).toFixed(1)}%`)
    if (shuBrushAmp > 0) tacticalTags.push(`书道笔意+${(shuBrushAmp * 100).toFixed(1)}%`)
    const tacticalNote = tacticalTags.length > 0 ? `【${tacticalTags.join('·')}】` : ''

    // 5. 正态分布随机伤害采样 + 反震/卸力/灼脉修饰
    const roll = sampleDamageRoll(ctx.rng)
    const baseFinalDmg = Math.max(
      1,
      Math.round(
        attackPower *
          (1 - mitigation) *
          (1 - beforeHitCtx.specRed) *
          postureMult *
          spearCounterMult *
          exposedVulnMult *
          hsSwordEssenceMult *
          hsPoyueMult *
          roll.multiplier,
      ),
    )

    const dmgModCtx: DamageModifyContext = {
      round: ctx.round,
      rng: ctx.rng,
      pushLog: ctx.pushLog,
      nextPopupId: ctx.nextPopupId,
      actor,
      target,
      actorSide,
      targetSide,
      isTargetDefending,
      kind,
      moveFx,
      targetNgFx,
      finalDmg: baseFinalDmg,
      reboundDmg: 0,
      reboundLabel: '',
      reboundSubText: '',
      burnExtra: 0,
    }
    runEffectModifyFinalDamage(dmgModCtx)

    const { finalDmg, reboundDmg, reboundLabel, reboundSubText, burnExtra } = dmgModCtx
    const totalTargetLoss = finalDmg + burnExtra
    target.hp = Math.max(0, target.hp - totalTargetLoss)
    if (reboundDmg > 0) {
      actor.hp = Math.max(0, actor.hp - reboundDmg)
    }

    const attackPopups: CombatFloatingPopup[] = [
      {
        id: ctx.nextPopupId(),
        side: targetSide,
        text: `-${totalTargetLoss}`,
        subText: roll.isCrit
          ? `暴击 · ${roll.tag}`
          : isTargetExposed
            ? '破绽重创'
            : isTargetDefending
              ? isGuardBreakInstinct
                ? '破守重击'
                : '守御格挡'
              : isSpearCounterInstinct
                ? '后发反击'
                : burnExtra > 0
                  ? `含灼脉 ${burnExtra}`
                  : roll.tag,
        style: roll.isCrit ? 'crit' : isTargetDefending ? 'guard' : 'damage',
      },
    ]

    if (beforeHitCtx.didInterruptMove) {
      attackPopups.push({
        id: ctx.nextPopupId(),
        side: targetSide,
        text: '破招瓦解！',
        subText: '独孤九剑',
        style: 'special',
      })
    }

    ctx.pushLog(
      roll.isCrit ? 'crit' : actor.team === 'ally' ? 'player' : 'enemy',
      `${actor.name}催动《${art.cleanName}》［${subTypeLabel}·${mpNote}］${tacticalNote}——【${roll.tag} ×${roll.multiplier.toFixed(
        2,
      )}】${roll.desc}，重创${target.name} ${finalDmg} 点气血${
        burnExtra > 0 ? `（另附燥火灼脉 ${burnExtra} 点）` : ''
      }！`,
    )

    if (reboundDmg > 0) {
      ctx.pushLog('special', `${target.name}运起${reboundLabel}！`)
      attackPopups.push({
        id: ctx.nextPopupId(),
        side: actorSide,
        text: `-${reboundDmg}`,
        subText: reboundSubText,
        style: 'special',
      })
    }

    if (
      isTargetDefending &&
      actor.hp > 0 &&
      target.hp > 0 &&
      !ctx.pendingExposedIds.has(actor.unitId)
    ) {
      ctx.pendingExposedIds.add(actor.unitId)
      ctx.pushLog(
        'special',
        `${target.name}守御稳如磐石卸去猛劲，${actor.name}招老力竭露出破绽（下回合受创+25%·闪避-50%）！`,
      )
      attackPopups.push({
        id: ctx.nextPopupId(),
        side: actorSide,
        text: '露破绽！',
        subText: '下合受创+25%·闪-50%',
        style: 'debuff',
      })
    }

    // 7. 命中后大类本能（音功削内 / 毒功持续伤害）+ 注册表 onAfterHit
    const wardScale = targetNgFx.xisui_ward
      ? Math.max(0.25, 1 - targetNgFx.xisui_ward / 100)
      : 1.0
    const targetControlImmune = Boolean(targetNgFx.bahuang_dom && target.hp > actor.hp)

    // 先运行玉女素心剑法连击，再运行大类本能与其余命中后天阶特效（与原顺序完全一致）
    const afterHitCtx: AfterHitContext = {
      round: ctx.round,
      rng: ctx.rng,
      pushLog: ctx.pushLog,
      nextPopupId: ctx.nextPopupId,
      actor,
      target,
      art,
      actorSide,
      targetSide,
      finalDmg,
      wardScale,
      targetControlImmune,
      actorNgFx,
      moveFx: { ...moveFx },
      targetNgFx,
      popups: attackPopups,
      controlTriggered: { stunOrSeal: false },
    }

    const actorAliveAfterHit = actor.hp > 0
    if (actorAliveAfterHit && afterHitCtx.moveFx.yunv_double) {
      COMBAT_EFFECT_REGISTRY.yunv_double.onAfterHit?.(
        afterHitCtx.moveFx.yunv_double,
        afterHitCtx,
        'actor',
      )
      delete afterHitCtx.moveFx.yunv_double
    }

    if (art.category === '音功' && target.mp > 0) {
      const resFactor = Math.max(0.25, 1 - effRes / 180)
      const sonicSap = Math.min(
        target.mp,
        Math.max(6, Math.round((finalDmg * 0.28 + target.maxMp * 0.03) * resFactor * wardScale)),
      )
      if (sonicSap > 0) {
        target.mp = Math.max(0, target.mp - sonicSap)
        ctx.pushLog(
          'special',
          `《${art.cleanName}》音刃震荡气海，削减${target.name} ${sonicSap} 点内力！`,
        )
        attackPopups.push({
          id: ctx.nextPopupId(),
          side: targetSide,
          text: `-${sonicSap} 内力`,
          subText: '音功乱息',
          style: 'debuff',
        })
      }
    }

    if (art.category === '毒功' && target.hp > 0) {
      const resFactor = Math.max(0.25, 1 - effRes / 180)
      const dotDmg = Math.max(6, Math.round(finalDmg * 0.25 * resFactor * wardScale))
      target.poisonDotDmg =
        target.poisonDotTurns > 0 ? Math.max(target.poisonDotDmg, dotDmg) : dotDmg
      target.poisonDotTurns = 2
      ctx.pushLog(
        'special',
        `《${art.cleanName}》奇毒侵入经脉，${target.name}身中持续奇毒（每合蚀血 ${target.poisonDotDmg} 点，持续 2 合）！`,
      )
      attackPopups.push({
        id: ctx.nextPopupId(),
        side: targetSide,
        text: `奇毒 ${target.poisonDotDmg}/合`,
        subText: '持续2合',
        style: 'debuff',
      })
    }

    // 出招者被反震致死：连击、吸血回春、点穴等出招方命中后特效一概不再发动
    if (actorAliveAfterHit) {
      runEffectAfterHit(afterHitCtx)
    }

    if (isMultiCombat && target.hp <= 0 && !target.isPlayer) {
      if (target.team === 'enemy') {
        const remainingEnemies = enemies.filter((e) => e.hp > 0)
        if (remainingEnemies.length > 0) {
          ctx.pushLog(
            'system',
            `${target.name}真气溃散败下阵来！（敌阵尚余 ${remainingEnemies
              .map((e) => e.name)
              .join('、')}）`,
          )
        }
      } else {
        ctx.pushLog(
          'system',
          `助战同伴 ${target.name} 浴血力竭退下阵线，少侠独力迎战余敌！`,
        )
      }
    }

    ctx.flushBeat({
      kind: 'attack',
      actorSide,
      targetSide,
      bannerTitle: `《${art.cleanName}》`,
      bannerSubtitle: `【${roll.tag} ×${roll.multiplier.toFixed(2)}】${subTypeLabel}${tacticalNote}`,
      vfxCategory: moveVfx,
      isHeavenTier: art.tier === '天阶',
      isCrit: roll.isCrit,
      isGuarded: isTargetDefending,
      shakeLevel: roll.isCrit ? 3 : art.tier === '天阶' ? 2 : 1,
      popups: attackPopups,
    })
  }

  ctx.currentStepActorUnitId = undefined
  ctx.currentStepTargetUnitId = undefined
}
