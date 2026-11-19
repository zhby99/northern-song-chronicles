import type { CompiledMartialArtRecord } from '../../../types/game'
import type { CombatRng } from '../rng'
import type {
  CombatActionChoice,
  CombatantState,
  CombatFloatingPopup,
  CombatLogEntry,
  FxKey,
  SlotEffectsMap,
} from '../types'

export interface EffectLogHelpers {
  round: number
  rng: CombatRng
  pushLog: (tone: CombatLogEntry['tone'], text: string) => void
  nextPopupId: () => string
}

export interface BeforeHitContext extends EffectLogHelpers {
  actor: CombatantState
  target: CombatantState
  art: CompiledMartialArtRecord
  actorSide: 'player' | 'npc'
  targetSide: 'player' | 'npc'
  targetChoice: CombatActionChoice
  isTargetDefending: boolean
  actorNgFx: SlotEffectsMap
  actorQgFx: SlotEffectsMap
  moveFx: SlotEffectsMap
  targetNgFx: SlotEffectsMap
  targetQgFx: SlotEffectsMap
  targetMoveFx: SlotEffectsMap
  targetNgLv: number
  kind: '物理' | '奇门'
  interruptedIds: Set<string>
  escapeLockBonus: number
  didInterruptMove: boolean
  ampPct: number
  piercePct: number
  nullifyPierce: boolean
  specRed: number
  guardPenPct: number
}

export interface DamageModifyContext extends EffectLogHelpers {
  actor: CombatantState
  target: CombatantState
  actorSide: 'player' | 'npc'
  targetSide: 'player' | 'npc'
  isTargetDefending: boolean
  kind: '物理' | '奇门'
  moveFx: SlotEffectsMap
  targetNgFx: SlotEffectsMap
  finalDmg: number
  reboundDmg: number
  reboundLabel: string
  reboundSubText: string
  burnExtra: number
}

export interface AfterHitContext extends EffectLogHelpers {
  actor: CombatantState
  target: CombatantState
  art: CompiledMartialArtRecord
  actorSide: 'player' | 'npc'
  targetSide: 'player' | 'npc'
  finalDmg: number
  wardScale: number
  targetControlImmune: boolean
  actorNgFx: SlotEffectsMap
  moveFx: SlotEffectsMap
  targetNgFx: SlotEffectsMap
  popups: CombatFloatingPopup[]
  controlTriggered: { stunOrSeal: boolean }
}

export interface RoundEndEffectContext extends EffectLogHelpers {
  fighter: CombatantState
  side: 'player' | 'npc'
  ngFx: SlotEffectsMap
  popups: CombatFloatingPopup[]
  flags: { hasHealStatusTick: boolean }
}

export interface CombatEffectSpec {
  slot: 'neigong' | 'qinggong' | 'move'
  hasInitiativePriority?: boolean
  modifyAgilityPct?: (val: number) => number
  modifyMpSavePct?: (val: number) => number
  modifyEscapeBonusPct?: (val: number) => number
  computeDodgeOverridePct?: (
    val: number,
    isDefending: boolean,
    qgFx: SlotEffectsMap,
  ) => number
  modifyIgnoreDodgePct?: (val: number) => number
  modifyAntiPoisonPct?: (val: number) => number
  onRoundStart?: (
    val: number,
    fighter: CombatantState,
    helpers: Pick<EffectLogHelpers, 'pushLog'>,
  ) => void
  onCheckEscapeLock?: (val: number, ctx: BeforeHitContext) => void
  onCheckMoveInterrupt?: (val: number, ctx: BeforeHitContext) => void
  onBeforeHit?: (val: number, ctx: BeforeHitContext, source: 'actor' | 'target') => void
  onModifyFinalDamage?: (val: number, ctx: DamageModifyContext, source: 'actor' | 'target') => void
  onAfterHit?: (val: number, ctx: AfterHitContext, source: 'actor' | 'target') => void
  onRoundEnd?: (val: number, ctx: RoundEndEffectContext) => void
}

/**
 * Exhaustive registry of all 54 special effect keys (`FxKey`) in `martial_arts.json`.
 */
export const COMBAT_EFFECT_REGISTRY: Record<FxKey, CombatEffectSpec> = {
  // === 回合初 / 叠层类 ===
  zixia_stack: {
    slot: 'neigong',
    onRoundStart(val, fighter, { pushLog }) {
      if (val > 0 && fighter.zixiaStacks < 5) {
        fighter.zixiaStacks += 1
        pushLog(
          'special',
          `${fighter.name}周身紫气蒸腾，《紫霞神功》蓄至第 ${fighter.zixiaStacks} 层！`,
        )
      }
    },
    onBeforeHit(val, ctx, source) {
      if (source === 'actor' && ctx.actor.zixiaStacks > 0) {
        ctx.ampPct += (val * ctx.actor.zixiaStacks) / 100
      } else if (source === 'target' && ctx.target.zixiaStacks > 0) {
        ctx.specRed += (val * ctx.target.zixiaStacks) / 100
      }
    },
  },

  // === 轻功被动 / 闪避 / 脱战类 ===
  kuihua_haste: {
    slot: 'qinggong',
    modifyAgilityPct: (val) => val / 100,
  },
  xiaowuxiang_save: {
    slot: 'neigong',
    modifyMpSavePct: (val) => val / 100,
  },
  lingbo_dodge: {
    slot: 'qinggong',
    computeDodgeOverridePct: (val, isDefending, qgFx) =>
      (isDefending ? (qgFx.lingbo_def_dodge ?? val * 2) : val) / 100,
  },
  lingbo_def_dodge: {
    slot: 'qinggong',
  },
  shenxing_dodge: {
    slot: 'qinggong',
    computeDodgeOverridePct: (val, _isDefending, qgFx) => (qgFx.lingbo_dodge ? 0 : val / 100),
  },
  shenxing_escape: {
    slot: 'qinggong',
    modifyEscapeBonusPct: (val) => val / 100,
  },
  tiezhang_palm: {
    slot: 'qinggong',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor' && ctx.art.category === '拳掌') {
        ctx.ampPct += val / 100
      }
    },
  },

  // === 先手拦截 / 无视闪避类 ===
  baoyu_lock: {
    slot: 'move',
    modifyIgnoreDodgePct: () => 0.5,
    onCheckEscapeLock(val, ctx) {
      if (ctx.targetChoice.type === 'escape' && val > 0) {
        ctx.escapeLockBonus = val / 100
        ctx.interruptedIds.add(ctx.target.unitId)
        ctx.pushLog(
          'special',
          `《${ctx.art.cleanName}》漫天寒星封死退路，当场截断${ctx.target.name}的逃跑企图！`,
        )
      }
    },
  },
  baihong_curve: {
    slot: 'move',
    modifyIgnoreDodgePct: (val) => val / 100,
  },
  dugu_interrupt: {
    slot: 'move',
    hasInitiativePriority: true,
    onCheckMoveInterrupt(val, ctx) {
      if (ctx.targetChoice.type === 'move' && val > 0) {
        const targetImmune = Boolean(
          ctx.targetNgFx.bahuang_dom && ctx.target.hp > ctx.actor.hp,
        )
        if (!targetImmune && ctx.rng() < val / 100) {
          ctx.interruptedIds.add(ctx.target.unitId)
          ctx.didInterruptMove = true
          ctx.pushLog(
            'special',
            `《独孤九剑》直指招式破绽，一剑封喉逼得${ctx.target.name}变招回防，本回合攻势瓦解！`,
          )
        }
      }
    },
  },

  // === 攻方增伤乘区类 ===
  taixuan_amp: {
    slot: 'neigong',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor') ctx.ampPct += val / 100
    },
  },
  xiaowuxiang_amp: {
    slot: 'neigong',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor') ctx.ampPct += val / 100
    },
  },
  longxiang_might: {
    slot: 'neigong',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor' && ['拳掌', '刀法', '枪法', '棍棒'].includes(ctx.art.category)) {
        ctx.ampPct += val / 100
      }
    },
  },
  bahuang_dom: {
    slot: 'neigong',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor' && ctx.actor.hp > ctx.target.hp) {
        ctx.ampPct += val / 100
      }
    },
  },
  bahuang_base: {
    slot: 'neigong',
    onBeforeHit(val, ctx, source) {
      if (
        source === 'actor' &&
        !(ctx.actorNgFx.bahuang_dom && ctx.actor.hp > ctx.target.hp)
      ) {
        ctx.ampPct += val / 100
      }
    },
  },
  anran_despair: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor') {
        const lostTenPct = Math.floor(
          ((ctx.actor.maxHp - ctx.actor.hp) / Math.max(1, ctx.actor.maxHp)) * 10,
        )
        ctx.ampPct += (val * Math.max(0, lostTenPct)) / 100
      }
    },
  },
  xuantie_crush: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor' && ctx.actor.mp > ctx.target.mp) {
        ctx.ampPct += val / 100
      }
    },
  },
  yangjia_carbine: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor' && ctx.actor.hp < ctx.actor.maxHp * 0.6) {
        ctx.ampPct += val / 100
      }
    },
  },
  hujia_gap: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor' && ctx.targetChoice.type === 'move') {
        ctx.ampPct += val / 100
      }
    },
  },
  dagou_bonus: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor' && ctx.target.slowTurns > 0) {
        ctx.ampPct += val / 100
      }
    },
  },
  xiangmo_crush: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor' && ctx.isTargetDefending) {
        ctx.ampPct += val / 100
      }
    },
  },
  zhemeishou_amp: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor') {
        ctx.ampPct += (val * ctx.actor.zhemeishouStacks) / 100
        ctx.actor.zhemeishouStacks = Math.min(5, ctx.actor.zhemeishouStacks + 1)
      }
    },
  },

  // === 破甲与穿透类 ===
  liumai_pierce: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor') ctx.piercePct = Math.max(ctx.piercePct, val / 100)
    },
  },
  canhe_pierce: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor') ctx.piercePct = Math.max(ctx.piercePct, val / 100)
    },
  },
  yangjia_pierce: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor') ctx.piercePct = Math.max(ctx.piercePct, val / 100)
    },
  },
  jiuyin_pierce: {
    slot: 'neigong',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor') ctx.piercePct = Math.max(ctx.piercePct, val / 100)
    },
  },
  taixuan_pierce: {
    slot: 'neigong',
    onBeforeHit(_val, _ctx) {
      // Applied additively after max base pierce in runBeforeHitEffects
    },
  },
  huoyan_pen: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'actor' && ctx.isTargetDefending) {
        ctx.guardPenPct = Math.max(ctx.guardPenPct, val / 100)
      }
    },
  },

  // === 守方护体与抗毒类 ===
  xiantian_antipoison: {
    slot: 'neigong',
    modifyAntiPoisonPct: (val) => val / 100,
  },
  jingang_phys_red: {
    slot: 'neigong',
    onBeforeHit(val, ctx, source) {
      if (source === 'target') {
        if (ctx.targetNgLv >= 10) ctx.nullifyPierce = true
        if (ctx.kind === '物理') ctx.specRed += val / 100
      }
    },
  },
  xisui_ward: {
    slot: 'neigong',
    onBeforeHit(val, ctx, source) {
      if (source === 'target' && ctx.kind === '奇门') {
        ctx.specRed += val / 100
      }
    },
  },
  xisui_phys_red: {
    slot: 'neigong',
    onBeforeHit(val, ctx, source) {
      if (source === 'target' && !ctx.targetNgFx.xisui_ward && ctx.kind === '物理') {
        ctx.specRed += val / 100
      } else if (source === 'target' && ctx.kind === '物理') {
        ctx.specRed += val / 100
      }
    },
  },
  formless_qi_wall: {
    slot: 'neigong',
    onBeforeHit(val, ctx, source) {
      if (source === 'target') {
        // 「10重仅发挥55%效果」：面对已练至第 10 重的来招，无相气墙只能削去 55% 的标称比例
        // （旧实现误按守方自身易筋经重数打折，导致 9 重 41% → 10 重反跌至 24.75%）
        const attackerMoveLv =
          ctx.actor.learnedArts.find((e) => e.artId === ctx.art.id)?.level ?? 1
        const wallMult = attackerMoveLv >= 10 ? 0.55 : 1.0
        ctx.specRed += (val * wallMult) / 100
      }
    },
  },
  taiji_guard: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'target' && ctx.targetChoice.type === 'move') {
        ctx.specRed += val / 100
      }
    },
  },
  zhemeishou_red: {
    slot: 'move',
    onBeforeHit(val, ctx, source) {
      if (source === 'target' && ctx.target.zhemeishouStacks > 0) {
        ctx.specRed += (val * ctx.target.zhemeishouStacks) / 100
      }
    },
  },

  // === 反震 / 卸力 / 灼脉附加伤害 ===
  douzhuan_high: {
    slot: 'neigong',
    onModifyFinalDamage(val, ctx, source) {
      if (source === 'target') {
        const dzPct =
          ctx.target.mp >= ctx.actor.mp ? val : (ctx.targetNgFx.douzhuan_low ?? 12)
        const reb = Math.round(ctx.finalDmg * (dzPct / 100))
        ctx.reboundDmg = reb
        ctx.finalDmg = Math.max(1, ctx.finalDmg - reb)
        ctx.reboundLabel = `《斗转星移》移星换斗（${dzPct}%）卸去并反击 ${reb} 点气血`
        ctx.reboundSubText = '斗转反击'
      }
    },
  },
  douzhuan_low: {
    slot: 'neigong',
  },
  jingang_rebound: {
    slot: 'neigong',
    onModifyFinalDamage(val, ctx, source) {
      if (
        source === 'target' &&
        !ctx.targetNgFx.douzhuan_high &&
        ctx.isTargetDefending &&
        ctx.kind === '物理'
      ) {
        const reb = Math.round(ctx.finalDmg * (val / 100))
        ctx.reboundDmg = reb
        ctx.reboundLabel = `《金刚不坏体》不动明王震回 ${reb} 点气血`
        ctx.reboundSubText = '金刚反震'
      }
    },
  },
  huoyan_burn: {
    slot: 'move',
    onModifyFinalDamage(val, ctx, source) {
      if (source === 'actor') {
        const resMit = Math.min(0.75, ctx.target.res / 180)
        ctx.burnExtra = Math.max(1, Math.round(ctx.finalDmg * (val / 100) * (1 - resMit)))
      }
    },
  },

  // === 命中后特效（连击 / 吸内 / 化功 / 回血解毒 / 控制封穴）===
  yunv_double: {
    slot: 'move',
    onAfterHit(val, ctx, source) {
      if (source === 'actor' && ctx.target.hp > 0 && ctx.rng() < val / 100) {
        const secondHit = Math.max(1, Math.round(ctx.finalDmg * 0.4))
        ctx.target.hp = Math.max(0, ctx.target.hp - secondHit)
        ctx.pushLog(
          'special',
          `《玉女素心剑法》双剑合璧紧随刺出第二剑，再伤${ctx.target.name} ${secondHit} 点气血！`,
        )
        ctx.popups.push({
          id: ctx.nextPopupId(),
          side: ctx.targetSide,
          text: `-${secondHit}`,
          subText: '双剑合璧',
          style: 'special',
        })
      }
    },
  },
  beiming_drain: {
    slot: 'neigong',
    onAfterHit(val, ctx, source) {
      if (source === 'actor' && ctx.target.mp > 0) {
        const resFactor = Math.max(0.2, 1 - ctx.target.res / 150)
        const drained = Math.round(
          ctx.target.mp * (val / 100) * resFactor * ctx.wardScale,
        )
        if (drained > 0) {
          ctx.target.mp = Math.max(0, ctx.target.mp - drained)
          ctx.actor.mp = Math.min(ctx.actor.maxMp, ctx.actor.mp + drained)
          ctx.pushLog(
            'special',
            `${ctx.actor.name}《北冥神功》北冥纳海吸取${ctx.target.name} ${drained} 点真气纳为己用！`,
          )
          ctx.popups.push({
            id: ctx.nextPopupId(),
            side: ctx.actorSide,
            text: `+${drained} 吸内`,
            subText: '北冥纳海',
            style: 'mp',
          })
        }
      }
    },
  },
  huagong_burn: {
    slot: 'neigong',
    onAfterHit(val, ctx, source) {
      if (source === 'actor' && ctx.target.mp > 0) {
        const resFactor = Math.max(0.2, 1 - ctx.target.res / 180)
        const burned = Math.round(
          ctx.target.mp * (val / 100) * resFactor * ctx.wardScale,
        )
        if (burned > 0) {
          ctx.target.mp = Math.max(0, ctx.target.mp - burned)
          ctx.pushLog(
            'special',
            `${ctx.actor.name}《化功大法》奇毒焚散${ctx.target.name} ${burned} 点真气！`,
          )
          ctx.popups.push({
            id: ctx.nextPopupId(),
            side: ctx.targetSide,
            text: `-${burned} 内力`,
            subText: '化功焚脉',
            style: 'debuff',
          })
        }
        if (ctx.actorNgFx.huagong_weak) {
          ctx.target.weakTurns = Math.max(ctx.target.weakTurns, 2)
          ctx.target.weakPct = Math.max(
            ctx.target.weakPct,
            Math.round(ctx.actorNgFx.huagong_weak * ctx.wardScale),
          )
        }
      }
    },
  },
  huagong_weak: {
    slot: 'neigong',
  },
  taiji_sap: {
    slot: 'move',
    onAfterHit(val, ctx, source) {
      if (source === 'actor' && ctx.target.mp > 0) {
        const sapped = Math.round(ctx.target.mp * (val / 100) * ctx.wardScale)
        if (sapped > 0) {
          ctx.target.mp = Math.max(0, ctx.target.mp - sapped)
          ctx.pushLog('special', `无形气劲震散${ctx.target.name} ${sapped} 点护体真气！`)
        }
      }
    },
  },
  qixian_sap: {
    slot: 'move',
    onBeforeHit(_val, ctx, source) {
      if (source === 'actor' && ctx.isTargetDefending && !ctx.moveFx.huoyan_pen) {
        ctx.guardPenPct = Math.max(ctx.guardPenPct, 0.25)
      }
    },
    onAfterHit(val, ctx, source) {
      if (source === 'actor' && !ctx.moveFx.taiji_sap && ctx.target.mp > 0) {
        const sapped = Math.round(ctx.target.mp * (val / 100) * ctx.wardScale)
        if (sapped > 0) {
          ctx.target.mp = Math.max(0, ctx.target.mp - sapped)
          ctx.pushLog('special', `无形气劲震散${ctx.target.name} ${sapped} 点护体真气！`)
        }
      }
    },
  },
  liuyang_leech: {
    slot: 'move',
    onAfterHit(val, ctx, source) {
      if (source === 'actor') {
        const healed = Math.max(1, Math.round(ctx.finalDmg * (val / 100)))
        ctx.actor.hp = Math.min(ctx.actor.maxHp, ctx.actor.hp + healed)
        ctx.actor.weakTurns = 0
        ctx.actor.poisonDotTurns = 0
        ctx.actor.poisonDotDmg = 0
        ctx.actor.stunnedNextRound = false
        ctx.pushLog(
          'special',
          `${ctx.actor.name}《天山六阳掌》阴阳相济回血 ${healed} 点并涤荡体内滞气！`,
        )
        ctx.popups.push({
          id: ctx.nextPopupId(),
          side: ctx.actorSide,
          text: `+${healed}`,
          subText: '阴阳回血',
          style: 'heal',
        })
      }
    },
  },
  xianglong_stun: {
    slot: 'move',
    onAfterHit(val, ctx, source) {
      if (
        source === 'actor' &&
        !ctx.targetControlImmune &&
        ctx.target.hp > 0 &&
        !ctx.controlTriggered.stunOrSeal &&
        ctx.rng() < val / 100
      ) {
        ctx.controlTriggered.stunOrSeal = true
        ctx.target.stunnedNextRound = true
        ctx.pushLog(
          'special',
          `亢龙有悔掌威浩荡！${ctx.target.name}气血翻涌受震慑，下回合无法出招！`,
        )
        ctx.popups.push({
          id: ctx.nextPopupId(),
          side: ctx.targetSide,
          text: '亢龙震慑！',
          subText: '下合禁招',
          style: 'debuff',
        })
      }
    },
  },
  yiyang_seal: {
    slot: 'move',
    onAfterHit(val, ctx, source) {
      // 纯阳指力驱散自身 1 个中毒状态（命中即生效）
      if (source === 'actor' && ctx.actor.poisonDotTurns > 0) {
        ctx.actor.poisonDotTurns = 0
        ctx.actor.poisonDotDmg = 0
        ctx.pushLog('special', `${ctx.actor.name}纯阳指力运转周天，逼出体内奇毒！`)
      }
      if (
        source === 'actor' &&
        !ctx.targetControlImmune &&
        ctx.target.hp > 0 &&
        !ctx.controlTriggered.stunOrSeal &&
        ctx.rng() < val / 100
      ) {
        ctx.controlTriggered.stunOrSeal = true
        ctx.target.stunnedNextRound = true
        ctx.pushLog(
          'special',
          `《一阳指》纯阳指力点中要穴！${ctx.target.name}下回合无法出招！`,
        )
        ctx.popups.push({
          id: ctx.nextPopupId(),
          side: ctx.targetSide,
          text: '点穴封脉！',
          subText: '下合禁招',
          style: 'debuff',
        })
      }
    },
  },
  tanzhi_disarm: {
    slot: 'move',
    onAfterHit(val, ctx, source) {
      if (
        source === 'actor' &&
        !ctx.targetControlImmune &&
        ctx.target.hp > 0 &&
        ctx.rng() < val / 100
      ) {
        ctx.target.disarmedNextRound = true
        ctx.pushLog(
          'special',
          `《弹指神通》惊雷震腕！${ctx.target.name}下回合无法施展指法与暗器！`,
        )
        ctx.popups.push({
          id: ctx.nextPopupId(),
          side: ctx.targetSide,
          text: '惊雷震腕！',
          style: 'debuff',
        })
      }
    },
  },
  dagou_slow: {
    slot: 'move',
    onAfterHit(val, ctx, source) {
      if (source === 'actor' && !ctx.targetControlImmune && ctx.target.hp > 0) {
        ctx.target.slowTurns = Math.max(ctx.target.slowTurns, 2)
        ctx.target.slowPct = Math.max(ctx.target.slowPct, Math.round(val * ctx.wardScale))
        ctx.pushLog(
          'special',
          `《打狗棒法》绊缠字诀缠住双足！${ctx.target.name}两回合内身法降低 ${ctx.target.slowPct}% 且无法逃跑！`,
        )
        ctx.popups.push({
          id: ctx.nextPopupId(),
          side: ctx.targetSide,
          text: `绊缠 -${ctx.target.slowPct}%`,
          subText: '封锁脱战',
          style: 'debuff',
        })
      }
    },
  },

  // === 回合末疗伤与吐纳类 ===
  jiuyin_heal: {
    slot: 'neigong',
    onRoundEnd(val, ctx) {
      const heal = Math.max(1, Math.round((ctx.fighter.maxHp * val) / 100))
      ctx.fighter.hp = Math.min(ctx.fighter.maxHp, ctx.fighter.hp + heal)
      ctx.flags.hasHealStatusTick = true
      ctx.pushLog('special', `${ctx.fighter.name}《九阴真经》疗伤篇流转，回复 ${heal} 点气血。`)
      ctx.popups.push({
        id: ctx.nextPopupId(),
        side: ctx.side,
        unitId: ctx.fighter.unitId,
        text: `+${heal}`,
        subText: '九阴疗伤',
        style: 'heal',
      })
    },
  },
  xiantian_hp: {
    slot: 'neigong',
    onRoundEnd(val, ctx) {
      const hpGain = Math.max(1, Math.round((ctx.fighter.maxHp * val) / 100))
      const mpVal = ctx.ngFx.xiantian_mp ?? 0
      const mpGain = mpVal ? Math.max(1, Math.round((ctx.fighter.maxMp * mpVal) / 100)) : 0
      ctx.fighter.hp = Math.min(ctx.fighter.maxHp, ctx.fighter.hp + hpGain)
      ctx.fighter.mp = Math.min(ctx.fighter.maxMp, ctx.fighter.mp + mpGain)
      ctx.flags.hasHealStatusTick = true
      ctx.pushLog(
        'special',
        `${ctx.fighter.name}《先天功》生生不息吐纳，回复 ${hpGain} 气血、${mpGain} 内力。`,
      )
      ctx.popups.push({
        id: ctx.nextPopupId(),
        side: ctx.side,
        unitId: ctx.fighter.unitId,
        text: `+${hpGain} 血 / +${mpGain} 内`,
        subText: '先天吐纳',
        style: 'heal',
      })
    },
  },
  xiantian_mp: {
    slot: 'neigong',
    onRoundEnd(val, ctx) {
      // Handled jointly with xiantian_hp when both exist; standalone fallback if only xiantian_mp
      if (ctx.ngFx.xiantian_hp) return
      const mpGain = Math.max(1, Math.round((ctx.fighter.maxMp * val) / 100))
      ctx.fighter.mp = Math.min(ctx.fighter.maxMp, ctx.fighter.mp + mpGain)
      ctx.flags.hasHealStatusTick = true
      ctx.pushLog('special', `${ctx.fighter.name}《先天功》生生不息吐纳，回复 0 气血、${mpGain} 内力。`)
      ctx.popups.push({
        id: ctx.nextPopupId(),
        side: ctx.side,
        unitId: ctx.fighter.unitId,
        text: `+0 血 / +${mpGain} 内`,
        subText: '先天吐纳',
        style: 'heal',
      })
    },
  },
}

const AFTER_HIT_ORDER: readonly FxKey[] = [
  'yunv_double',
  'beiming_drain',
  'huagong_burn',
  'taiji_sap',
  'qixian_sap',
  'liuyang_leech',
  'xianglong_stun',
  'yiyang_seal',
  'tanzhi_disarm',
  'dagou_slow',
]

export function runEffectBeforeHit(ctx: BeforeHitContext): void {
  const actorMerged: Array<[FxKey, number]> = [
    ...(Object.entries(ctx.actorNgFx) as Array<[FxKey, number]>),
    ...(Object.entries(ctx.actorQgFx) as Array<[FxKey, number]>),
    ...(Object.entries(ctx.moveFx) as Array<[FxKey, number]>),
  ]
  for (const [key, val] of actorMerged) {
    COMBAT_EFFECT_REGISTRY[key]?.onBeforeHit?.(val, ctx, 'actor')
  }
  if (ctx.actorNgFx.taixuan_pierce) {
    ctx.piercePct = Math.min(0.85, ctx.piercePct + ctx.actorNgFx.taixuan_pierce / 100)
  }

  const targetMerged: Array<[FxKey, number]> = [
    ...(Object.entries(ctx.targetNgFx) as Array<[FxKey, number]>),
    ...(Object.entries(ctx.targetQgFx) as Array<[FxKey, number]>),
    ...(Object.entries(ctx.targetMoveFx) as Array<[FxKey, number]>),
  ]
  for (const [key, val] of targetMerged) {
    COMBAT_EFFECT_REGISTRY[key]?.onBeforeHit?.(val, ctx, 'target')
  }
  if (ctx.nullifyPierce) {
    ctx.piercePct = 0
  }
  ctx.specRed = Math.min(0.75, ctx.specRed)
}

export function runEffectModifyFinalDamage(ctx: DamageModifyContext): void {
  for (const [key, val] of Object.entries(ctx.targetNgFx) as Array<[FxKey, number]>) {
    COMBAT_EFFECT_REGISTRY[key]?.onModifyFinalDamage?.(val, ctx, 'target')
  }
  for (const [key, val] of Object.entries(ctx.moveFx) as Array<[FxKey, number]>) {
    COMBAT_EFFECT_REGISTRY[key]?.onModifyFinalDamage?.(val, ctx, 'actor')
  }
}

export function runEffectAfterHit(ctx: AfterHitContext): void {
  for (const key of AFTER_HIT_ORDER) {
    const val = ctx.moveFx[key] ?? ctx.actorNgFx[key]
    if (val) {
      COMBAT_EFFECT_REGISTRY[key].onAfterHit?.(val, ctx, 'actor')
    }
  }
}

export function runEffectRoundEnd(ctx: RoundEndEffectContext): void {
  for (const key of ['jiuyin_heal', 'xiantian_hp', 'xiantian_mp'] as const) {
    const val = ctx.ngFx[key]
    if (val) {
      COMBAT_EFFECT_REGISTRY[key].onRoundEnd?.(val, ctx)
    }
  }
}
