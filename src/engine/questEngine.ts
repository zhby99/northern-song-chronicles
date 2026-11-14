import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPC_DB_MAP,
  REGION_DB_MAP,
  resolveNpcByName,
} from '../data/gameDb'
import { DEFAULT_EQUIPPED_SLOTS, ITEM_DB_MAP } from '../data/itemsDb'
import { QUEST_MAP, QUEST_REGISTRY } from '../data/quests'
import type {
  HeroBaseStats,
  HeroTalents,
  InventoryStack,
  LearnedArtEntry,
  NodeNpc,
  PlayerSectState,
} from '../types/game'
import type {
  DynamicQuestNpc,
  QuestCombatOpponentSpec,
  QuestCondition,
  QuestDefinition,
  QuestEffect,
  QuestLocationTriggerDef,
  QuestNpcActionDef,
  QuestPrimitiveValue,
  QuestRuntimeState,
  QuestSpotActionDef,
  StorySpeakerSpec,
} from '../types/quest'
import { INITIAL_NPC_FAVOR } from '../utils/npcFavor'
import { getSectRankTitle, isSongOfficialForRobbery } from '../utils/sectMechanics'

const SHICHEN_LABELS: readonly string[] = [
  '子时',
  '丑时',
  '寅时',
  '卯时',
  '辰时',
  '巳时',
  '午时',
  '未时',
  '申时',
  '酉时',
  '戌时',
  '亥时',
]

const TALENT_LABELS: Record<keyof HeroTalents, string> = {
  根骨: '先天根骨',
  悟性: '先天悟性',
  颜值: '风姿颜值',
}

const COMBAT_STAT_LABELS: Record<'maxHp' | 'maxMp' | 'agility' | 'res', string> = {
  maxHp: '气血上限',
  maxMp: '内力上限',
  agility: '实战身法',
  res: '实战抗性',
}

export const DEFAULT_QUEST_RUNTIME_STATE: QuestRuntimeState = {
  activeQuests: {},
  completedQuests: {},
  flags: {},
  dynamicActors: [],
}

export function cloneQuestRuntimeState(raw?: unknown): QuestRuntimeState {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return {
      activeQuests: {},
      completedQuests: {},
      flags: {},
      dynamicActors: [],
    }
  }
  const obj = raw as Partial<QuestRuntimeState>

  const activeQuests: QuestRuntimeState['activeQuests'] = {}
  if (obj.activeQuests && typeof obj.activeQuests === 'object' && !Array.isArray(obj.activeQuests)) {
    for (const [qid, prog] of Object.entries(obj.activeQuests)) {
      if (!prog || typeof prog !== 'object') continue
      const vars: Record<string, QuestPrimitiveValue> = {}
      if (prog.vars && typeof prog.vars === 'object') {
        for (const [vk, vv] of Object.entries(prog.vars)) {
          if (typeof vv === 'string' || typeof vv === 'number' || typeof vv === 'boolean') {
            vars[vk] = vv
          }
        }
      }
      activeQuests[qid] = {
        questId: typeof prog.questId === 'string' ? prog.questId : qid,
        stepId: typeof prog.stepId === 'string' ? prog.stepId : 'init',
        startedDay: typeof prog.startedDay === 'number' ? Math.max(1, Math.floor(prog.startedDay)) : 1,
        deadlineDay:
          typeof prog.deadlineDay === 'number' ? Math.max(1, Math.floor(prog.deadlineDay)) : null,
        vars,
      }
    }
  }

  const completedQuests: QuestRuntimeState['completedQuests'] = {}
  if (
    obj.completedQuests &&
    typeof obj.completedQuests === 'object' &&
    !Array.isArray(obj.completedQuests)
  ) {
    for (const [qid, rec] of Object.entries(obj.completedQuests)) {
      if (!rec || typeof rec !== 'object') continue
      completedQuests[qid] = {
        questId: typeof rec.questId === 'string' ? rec.questId : qid,
        outcome: typeof rec.outcome === 'string' ? rec.outcome : 'completed',
        completedDay:
          typeof rec.completedDay === 'number' ? Math.max(1, Math.floor(rec.completedDay)) : 1,
        count: typeof rec.count === 'number' ? Math.max(1, Math.floor(rec.count)) : 1,
      }
    }
  }

  const flags: Record<string, QuestPrimitiveValue> = {}
  if (obj.flags && typeof obj.flags === 'object' && !Array.isArray(obj.flags)) {
    for (const [fk, fv] of Object.entries(obj.flags)) {
      if (typeof fv === 'string' || typeof fv === 'number' || typeof fv === 'boolean') {
        flags[fk] = fv
      }
    }
  }

  const dynamicActors: DynamicQuestNpc[] = Array.isArray(obj.dynamicActors)
    ? obj.dynamicActors
        .filter((a): a is DynamicQuestNpc => Boolean(a && typeof a.actorId === 'string'))
        .map((a) => ({
          ...a,
          stats: { ...a.stats },
          talents: a.talents ? { ...a.talents } : undefined,
          tenArts: a.tenArts ? { ...a.tenArts } : undefined,
          equippedArts: a.equippedArts ? { ...a.equippedArts } : undefined,
          learnedArts: a.learnedArts ? a.learnedArts.map((la) => ({ ...la })) : undefined,
          equipped: a.equipped ? { ...a.equipped } : undefined,
        }))
    : []

  return {
    activeQuests,
    completedQuests,
    flags,
    dynamicActors,
  }
}

export interface QuestEvalContext {
  dayCount: number
  shichenIdx: number
  silver: number
  food: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  agility: number
  res: number
  baseStats: HeroBaseStats
  skills?: Record<string, number>
  inventory: InventoryStack[]
  learnedArts: LearnedArtEntry[]
  npcFavor: Record<string, number>
  sectState: PlayerSectState
  questState: QuestRuntimeState
  targetNpc?: NodeNpc | null
}

function getEffectiveFlagValue(
  flag: string,
  ctx: QuestEvalContext,
): QuestPrimitiveValue | undefined {
  if (flag in ctx.questState.flags) {
    return ctx.questState.flags[flag]
  }
  // Seamless bidirectional fallback for existing sectState flags
  if (flag === 'toumingzhuang_state') return ctx.sectState.toumingzhuangState
  if (flag === 'toumingzhuang_completed') return ctx.sectState.toumingzhuangState === 'completed'
  if (flag === 'song_court_blacklisted') return ctx.sectState.songCourtBlacklisted
  if (flag === 'liao_suspicion_debuff') return ctx.sectState.liaoSuspicionDebuff
  return undefined
}

export function evaluateQuestCondition(
  cond: QuestCondition,
  ctx: QuestEvalContext,
  questMap: Record<string, QuestDefinition> = QUEST_MAP,
): { passed: boolean; reason: string | null } {
  switch (cond.type) {
    case 'all': {
      for (const sub of cond.conditions) {
        const res = evaluateQuestCondition(sub, ctx, questMap)
        if (!res.passed) return res
      }
      return { passed: true, reason: null }
    }

    case 'any': {
      if (cond.conditions.length === 0) return { passed: true, reason: null }
      const reasons: string[] = []
      for (const sub of cond.conditions) {
        const res = evaluateQuestCondition(sub, ctx, questMap)
        if (res.passed) return { passed: true, reason: null }
        if (res.reason) reasons.push(res.reason)
      }
      return {
        passed: false,
        reason: cond.hint ?? (reasons[0] || '尚未满足任一前置条件'),
      }
    }

    case 'not': {
      const res = evaluateQuestCondition(cond.condition, ctx, questMap)
      if (!res.passed) return { passed: true, reason: null }
      return {
        passed: false,
        reason: cond.reason ?? '当前状态不符合触发限制',
      }
    }

    case 'talentAtLeast': {
      const cur = ctx.baseStats.talents[cond.key] ?? 0
      if (cur >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需${TALENT_LABELS[cond.key]} ≥ ${cond.min}（当前 ${cur}）`,
      }
    }

    case 'talentAtMost': {
      const cur = ctx.baseStats.talents[cond.key] ?? 0
      if (cur <= cond.max) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需${TALENT_LABELS[cond.key]} ≤ ${cond.max}（当前 ${cur}）`,
      }
    }

    case 'skillAtLeast': {
      const cur = ctx.skills?.[cond.key] ?? ctx.baseStats.skills[cond.key] ?? 0
      if (cur >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需十艺【${cond.key}】 ≥ ${cond.min}（当前 ${cur}）`,
      }
    }

    case 'combatStatAtLeast': {
      const cur = ctx[cond.key]
      if (cur >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需${COMBAT_STAT_LABELS[cond.key]} ≥ ${cond.min}（当前 ${cur}）`,
      }
    }

    case 'silverAtLeast': {
      if (ctx.silver >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需纹银 ≥ ${cond.min} 两（当前 ${ctx.silver} 两）`,
      }
    }

    case 'hasItem': {
      const needQty = cond.qty ?? 1
      const haveQty = ctx.inventory.find((x) => x.itemId === cond.itemId)?.qty ?? 0
      if (haveQty >= needQty) return { passed: true, reason: null }
      const itemName = ITEM_DB_MAP[cond.itemId]?.name ?? cond.itemId
      return {
        passed: false,
        reason:
          needQty > 1
            ? `需持有【${itemName}】×${needQty}（当前 ${haveQty}）`
            : `需持有信物《${itemName}》`,
      }
    }

    case 'inSect': {
      if (cond.sectId === null) {
        if (!ctx.sectState.sectId) return { passed: true, reason: null }
        const curName = FACTION_DB_MAP[ctx.sectState.sectId]?.name ?? ctx.sectState.sectId
        return { passed: false, reason: `须为无门无派之身（当前隶属【${curName}】）` }
      }
      const targetName = FACTION_DB_MAP[cond.sectId]?.name ?? cond.sectId
      if (ctx.sectState.sectId !== cond.sectId) {
        return { passed: false, reason: `须隶属【${targetName}】门墙` }
      }
      if (cond.minRank && ctx.sectState.rank < cond.minRank) {
        const reqLabel = getSectRankTitle(cond.sectId, cond.minRank)
        return {
          passed: false,
          reason: `须晋升至【${targetName} · ${reqLabel}】及以上（当前为${ctx.sectState.rankLabel}）`,
        }
      }
      return { passed: true, reason: null }
    }

    case 'notInAnySect': {
      if (!ctx.sectState.sectId) return { passed: true, reason: null }
      if (cond.allowTransferFromSectId && ctx.sectState.sectId === cond.allowTransferFromSectId) {
        return { passed: true, reason: null }
      }
      const curName = FACTION_DB_MAP[ctx.sectState.sectId]?.name ?? ctx.sectState.sectId
      return {
        passed: false,
        reason: `少侠已有师门【${curName}】，须先脱离原门派`,
      }
    }

    case 'questStatus': {
      const active = ctx.questState.activeQuests[cond.questId]
      const completed = ctx.questState.completedQuests[cond.questId]
      const qTitle = questMap[cond.questId]?.title ?? cond.questId

      if (cond.status === 'not_started') {
        if (!active && !completed) return { passed: true, reason: null }
        return { passed: false, reason: `《${qTitle}》已开启或已完结` }
      }
      if (cond.status === 'active') {
        if (!active) return { passed: false, reason: `尚未开启任务《${qTitle}》` }
        if (cond.stepId && active.stepId !== cond.stepId) {
          return { passed: false, reason: `未处于《${qTitle}》指定阶段` }
        }
        return { passed: true, reason: null }
      }
      if (cond.status === 'completed') {
        if (!completed) return { passed: false, reason: `需先完成《${qTitle}》` }
        if (cond.outcome && completed.outcome !== cond.outcome) {
          return { passed: false, reason: `《${qTitle}》结局分支不符` }
        }
        return { passed: true, reason: null }
      }
      // not_completed
      if (!completed) return { passed: true, reason: null }
      return { passed: false, reason: `《${qTitle}》已了结` }
    }

    case 'flag': {
      const op = cond.op ?? 'truthy'
      const cur = getEffectiveFlagValue(cond.flag, ctx)
      const label = cond.label ?? cond.flag
      let ok = false
      if (op === 'truthy') ok = Boolean(cur)
      else if (op === 'falsy') ok = !cur
      else if (op === 'eq') ok = cur === cond.value
      else if (op === 'neq') ok = cur !== cond.value
      else if (op === 'gte') ok = Number(cur ?? 0) >= Number(cond.value ?? 0)
      else if (op === 'lte') ok = Number(cur ?? 0) <= Number(cond.value ?? 0)
      return ok
        ? { passed: true, reason: null }
        : { passed: false, reason: `尚未满足机缘条件【${label}】` }
    }

    case 'npcFavorAtLeast': {
      const cur = ctx.npcFavor[cond.npcId] ?? INITIAL_NPC_FAVOR
      if (cur >= cond.min) return { passed: true, reason: null }
      const npcName = NPC_DB_MAP[cond.npcId]?.name ?? cond.npcId
      return {
        passed: false,
        reason: `需【${npcName}】好感度 ≥ ${cond.min}（当前 ${cur}）`,
      }
    }

    case 'shichenIn': {
      if (cond.indices.includes(ctx.shichenIdx)) {
        return { passed: true, reason: null }
      }
      const names = cond.indices.map((idx) => SHICHEN_LABELS[((idx % 12) + 12) % 12]).join(' / ')
      const curName = SHICHEN_LABELS[((ctx.shichenIdx % 12) + 12) % 12]
      return {
        passed: false,
        reason: cond.label ?? `须于【${names}】到访（当前为${curName}）`,
      }
    }

    case 'targetNpcMatch': {
      const t = ctx.targetNpc
      if (!t) return { passed: false, reason: '未指定交互人物' }

      if (cond.dynamicActorIds && cond.dynamicActorIds.length > 0) {
        if (!t.dynamicQuestActorId || !cond.dynamicActorIds.includes(t.dynamicQuestActorId)) {
          return { passed: false, reason: '目标剧情人物不符' }
        }
      }

      const dbNpc = (t.id && NPC_DB_MAP[t.id]) || resolveNpcByName(t.name)
      const resolvedId = t.id ?? dbNpc?.id
      const resolvedFactionId = t.factionId ?? dbNpc?.factionId
      const resolvedSectRank = t.sectRank ?? dbNpc?.sectRank

      if (cond.npcIds && cond.npcIds.length > 0) {
        if (!resolvedId || !cond.npcIds.includes(resolvedId)) {
          return { passed: false, reason: '非指定目标人物' }
        }
      }
      if (cond.factionIds && cond.factionIds.length > 0) {
        if (!resolvedFactionId || !cond.factionIds.includes(resolvedFactionId)) {
          return { passed: false, reason: '非目标门派/组织人物' }
        }
      }
      if (typeof cond.exactSectRank === 'number') {
        if (resolvedSectRank !== cond.exactSectRank) {
          return { passed: false, reason: '目标人物门派职阶不符' }
        }
      }
      if (typeof cond.minSectRank === 'number') {
        if ((resolvedSectRank ?? 0) < cond.minSectRank) {
          return { passed: false, reason: '目标人物门派职阶不足' }
        }
      }
      if (cond.specialGroup === 'song_official_for_robbery') {
        if (!isSongOfficialForRobbery({ id: resolvedId, factionId: resolvedFactionId })) {
          return { passed: false, reason: '目标并非可劫道之大宋朝廷命官' }
        }
      }
      return { passed: true, reason: null }
    }
  }
}

export interface EvaluatedNpcQuestAction {
  quest: QuestDefinition
  action: QuestNpcActionDef
  enabled: boolean
  disabledReason: string | null
}

export function getAvailableNpcQuestActions(
  npc: NodeNpc,
  ctx: QuestEvalContext,
  quests: QuestDefinition[] = QUEST_REGISTRY,
): EvaluatedNpcQuestAction[] {
  const ctxWithNpc: QuestEvalContext = { ...ctx, targetNpc: npc }
  const out: EvaluatedNpcQuestAction[] = []

  for (const quest of quests) {
    if (!quest.npcActions || quest.npcActions.length === 0) continue
    for (const action of quest.npcActions) {
      const vis = evaluateQuestCondition(action.visibleWhen, ctxWithNpc)
      if (!vis.passed) continue

      const en = action.enabledWhen
        ? evaluateQuestCondition(action.enabledWhen, ctxWithNpc)
        : { passed: true, reason: null }
      out.push({
        quest,
        action,
        enabled: en.passed,
        disabledReason: en.reason,
      })
    }
  }
  return out
}

export interface EvaluatedSpotQuestAction {
  quest: QuestDefinition
  action: QuestSpotActionDef
  enabled: boolean
  disabledReason: string | null
}

export function getAvailableSpotQuestActions(
  loc: { regionId: string; buildingId: string; spotId: string | null },
  ctx: QuestEvalContext,
  quests: QuestDefinition[] = QUEST_REGISTRY,
): EvaluatedSpotQuestAction[] {
  const out: EvaluatedSpotQuestAction[] = []

  for (const quest of quests) {
    if (!quest.spotActions || quest.spotActions.length === 0) continue
    for (const action of quest.spotActions) {
      if (action.regionId !== loc.regionId) continue
      if (action.buildingId !== loc.buildingId) continue
      const expectedSpot = action.spotId ?? null
      if (expectedSpot !== loc.spotId) continue

      if (action.visibleWhen) {
        const vis = evaluateQuestCondition(action.visibleWhen, ctx)
        if (!vis.passed) continue
      }

      const en = action.enabledWhen
        ? evaluateQuestCondition(action.enabledWhen, ctx)
        : { passed: true, reason: null }
      out.push({
        quest,
        action,
        enabled: en.passed,
        disabledReason: en.reason,
      })
    }
  }
  return out
}

export interface MatchedLocationTrigger {
  quest: QuestDefinition
  trigger: QuestLocationTriggerDef
}

export function findMatchingLocationTriggers(
  loc: {
    regionId: string
    buildingId?: string | null
    spotId?: string | null
    isPassThrough?: boolean
  },
  ctx: QuestEvalContext,
  quests: QuestDefinition[] = QUEST_REGISTRY,
): MatchedLocationTrigger[] {
  const out: MatchedLocationTrigger[] = []
  const curBldg = loc.buildingId ?? null
  const curSpot = loc.spotId ?? null

  for (const quest of quests) {
    if (!quest.locationTriggers || quest.locationTriggers.length === 0) continue
    for (const trigger of quest.locationTriggers) {
      if (loc.isPassThrough && !trigger.triggerOnPassThrough) continue
      if (trigger.regionId && trigger.regionId !== loc.regionId) continue

      if (trigger.buildingId !== undefined) {
        if (trigger.buildingId !== curBldg) continue
      } else {
        // Region-level trigger (buildingId omitted): only fire when entering region level (curBldg === null)
        if (curBldg !== null) continue
      }

      if (trigger.spotId !== undefined) {
        if (trigger.spotId !== curSpot) continue
      } else if (trigger.buildingId !== undefined && curSpot !== null) {
        // Building-level trigger without spotId: fire when entering building hall, not sub-spots
        continue
      }

      if (trigger.onceFlag && Boolean(getEffectiveFlagValue(trigger.onceFlag, ctx))) {
        continue
      }

      if (trigger.condition) {
        const res = evaluateQuestCondition(trigger.condition, ctx)
        if (!res.passed) continue
      }

      out.push({ quest, trigger })
    }
  }
  return out
}

export function buildNodeNpcFromDynamicActor(actor: DynamicQuestNpc): NodeNpc {
  const regName = REGION_DB_MAP[actor.regionId]?.name ?? actor.regionId
  const bldg = BUILDING_DB_MAP[actor.buildingId]
  const bldgName = bldg?.name ?? actor.buildingId
  const spotName =
    actor.spotId && bldg?.interior
      ? (bldg.interior.spots.find((s) => s.id === actor.spotId)?.name ?? null)
      : null
  const fullLoc = spotName ? `${regName} > ${bldgName} > ${spotName}` : `${regName} > ${bldgName}`

  return {
    id: actor.actorId,
    name: actor.name,
    title: actor.title,
    realm: actor.realm,
    factionId: actor.factionId,
    factionName:
      actor.factionName ?? (actor.factionId ? FACTION_DB_MAP[actor.factionId]?.name : undefined),
    sectRank: actor.sectRank,
    sectRankLabel: actor.sectRankLabel,
    avatarUrl: actor.avatarUrl ?? '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: actor.portraitUrl ?? '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    stats: { ...actor.stats },
    talents: actor.talents ? { ...actor.talents } : { bone: 50, comprehension: 50, charm: 50 },
    tenArts: actor.tenArts ? { ...actor.tenArts } : undefined,
    fullLocationLabel: fullLoc,
    equippedArts: actor.equippedArts ? { ...actor.equippedArts } : undefined,
    learnedArts: actor.learnedArts ? actor.learnedArts.map((x) => ({ ...x })) : undefined,
    equipped: actor.equipped ? { ...actor.equipped } : { ...DEFAULT_EQUIPPED_SLOTS },
    dynamicQuestActorId: actor.actorId,
    questBadgeLabel: actor.badgeLabel ?? '剧情人物',
    talk: actor.talk,
  }
}

export function buildNodeNpcFromCompiledId(npcId: string, talkOverride?: string): NodeNpc | null {
  const rec = NPC_DB_MAP[npcId]
  if (!rec) return null
  return {
    id: rec.id,
    name: rec.name,
    title: `${rec.factionName} · ${rec.role}`,
    realm: rec.realm,
    factionId: rec.factionId,
    factionName: rec.factionName,
    sectRank: rec.sectRank,
    sectRankLabel: rec.sectRankLabel,
    avatarUrl: rec.avatarUrl ?? rec.templateAvatarUrl,
    portraitUrl: rec.fullbodyUrl ?? rec.templateUrl,
    stats: { ...rec.stats },
    talents: { ...rec.talents },
    tenArts: { ...rec.tenArts },
    fullLocationLabel: rec.fullLocationLabel,
    equippedArts: { ...rec.equippedArts },
    learnedArts: rec.learnedArts.map((x) => ({ ...x })),
    equipped: { ...rec.equipped },
    talk: talkOverride ?? `“在下${rec.factionName}${rec.name}，请赐教！”`,
  }
}

export function resolveQuestCombatOpponent(
  spec: QuestCombatOpponentSpec,
  contextNpc: NodeNpc | null,
  dynamicActors: DynamicQuestNpc[],
): NodeNpc | null {
  switch (spec.kind) {
    case 'interactedNpc':
      return contextNpc
    case 'npc':
      return buildNodeNpcFromCompiledId(spec.npcId, spec.talkOverride)
    case 'dynamicActor': {
      const found = dynamicActors.find((a) => a.actorId === spec.actorId)
      return found ? buildNodeNpcFromDynamicActor(found) : null
    }
    case 'custom':
      return spec.npc
  }
}

export interface ResolvedSpeakerPresentation {
  isNarrator: boolean
  isPlayer: boolean
  name: string
  title: string
  factionName?: string
  portraitUrl?: string | null
  avatarUrl?: string | null
}

export function resolveStorySpeaker(
  speaker: StorySpeakerSpec,
  contextNpc: NodeNpc | null,
): ResolvedSpeakerPresentation {
  switch (speaker.kind) {
    case 'narrator':
      return {
        isNarrator: true,
        isPlayer: false,
        name: speaker.label ?? '卷宗旁白',
        title: '皇祐江湖纪事',
      }
    case 'player':
      return {
        isNarrator: false,
        isPlayer: true,
        name: '少侠（你）',
        title: '江湖行者',
        portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
        avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
      }
    case 'interactedNpc': {
      if (contextNpc) {
        const db = (contextNpc.id && NPC_DB_MAP[contextNpc.id]) || resolveNpcByName(contextNpc.name)
        return {
          isNarrator: false,
          isPlayer: false,
          name: contextNpc.name,
          title: contextNpc.title,
          factionName: contextNpc.factionName ?? db?.factionName,
          portraitUrl: contextNpc.portraitUrl ?? db?.fullbodyUrl ?? db?.templateUrl ?? null,
          avatarUrl: contextNpc.avatarUrl ?? db?.avatarUrl ?? db?.templateAvatarUrl ?? null,
        }
      }
      return {
        isNarrator: false,
        isPlayer: false,
        name: '江湖人物',
        title: '席间客',
      }
    }
    case 'npc': {
      const db = NPC_DB_MAP[speaker.npcId]
      if (db) {
        return {
          isNarrator: false,
          isPlayer: false,
          name: db.name,
          title: `${db.factionName} · ${db.role}`,
          factionName: db.factionName,
          portraitUrl: db.fullbodyUrl ?? db.templateUrl,
          avatarUrl: db.avatarUrl ?? db.templateAvatarUrl,
        }
      }
      return {
        isNarrator: false,
        isPlayer: false,
        name: speaker.npcId,
        title: '未知人物',
      }
    }
    case 'custom':
      return {
        isNarrator: false,
        isPlayer: false,
        name: speaker.name,
        title: speaker.title ?? '剧情人物',
        factionName: speaker.factionName,
        portraitUrl: speaker.portraitUrl ?? '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
      }
  }
}

/**
 * 静态任务链全量引用校验器：
 * 确保所有声明式任务链中的地区、建筑、子景点、NPC、门派、物品、武学与步骤跳转 ID 100% 合法无悬空。
 */
export function validateAllRegisteredQuests(
  quests: QuestDefinition[] = QUEST_REGISTRY,
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const byId = new Map<string, QuestDefinition>()

  for (const q of quests) {
    if (byId.has(q.id)) {
      errors.push(`[${q.id}] 任务 ID 重复定义`)
    }
    byId.set(q.id, q)
  }

  const checkLocation = (
    ctxPath: string,
    regionId?: string,
    buildingId?: string | null,
    spotId?: string | null,
  ) => {
    if (regionId && !REGION_DB_MAP[regionId]) {
      errors.push(`${ctxPath}: 未知的 regionId "${regionId}"`)
    }
    if (buildingId) {
      const bldg = BUILDING_DB_MAP[buildingId]
      if (!bldg) {
        errors.push(`${ctxPath}: 未知的 buildingId "${buildingId}"`)
      } else {
        if (regionId && bldg.regionId !== regionId) {
          errors.push(
            `${ctxPath}: buildingId "${buildingId}" 隶属 "${bldg.regionId}"，与声明的 regionId "${regionId}" 不一致`,
          )
        }
        if (spotId) {
          const hasSpot = bldg.interior?.spots.some((s) => s.id === spotId)
          if (!hasSpot) {
            errors.push(`${ctxPath}: 建筑 "${buildingId}" 内不存在子景点 spotId "${spotId}"`)
          }
        }
      }
    } else if (spotId) {
      errors.push(`${ctxPath}: 声明了 spotId "${spotId}" 但未提供所属 buildingId`)
    }
  }

  const checkCondition = (ctxPath: string, cond: QuestCondition) => {
    switch (cond.type) {
      case 'all':
      case 'any':
        cond.conditions.forEach((c, i) => checkCondition(`${ctxPath}.conditions[${i}]`, c))
        break
      case 'not':
        checkCondition(`${ctxPath}.not`, cond.condition)
        break
      case 'hasItem':
        if (!ITEM_DB_MAP[cond.itemId]) {
          errors.push(`${ctxPath}: 未知的 itemId "${cond.itemId}"`)
        }
        break
      case 'inSect':
        if (cond.sectId !== null && !FACTION_DB_MAP[cond.sectId]) {
          errors.push(`${ctxPath}: 未知的 sectId "${cond.sectId}"`)
        }
        break
      case 'notInAnySect':
        if (cond.allowTransferFromSectId && !FACTION_DB_MAP[cond.allowTransferFromSectId]) {
          errors.push(
            `${ctxPath}: 未知的 allowTransferFromSectId "${cond.allowTransferFromSectId}"`,
          )
        }
        break
      case 'questStatus': {
        const refQ = byId.get(cond.questId)
        if (!refQ) {
          errors.push(`${ctxPath}: 引用了未注册的 questId "${cond.questId}"`)
        } else if (cond.stepId && !refQ.steps[cond.stepId]) {
          errors.push(`${ctxPath}: 任务 "${cond.questId}" 中不存在 stepId "${cond.stepId}"`)
        }
        break
      }
      case 'npcFavorAtLeast':
        if (!NPC_DB_MAP[cond.npcId]) {
          errors.push(`${ctxPath}: 未知的 npcId "${cond.npcId}"`)
        }
        break
      case 'targetNpcMatch':
        cond.npcIds?.forEach((nid) => {
          if (!NPC_DB_MAP[nid]) errors.push(`${ctxPath}: 未知的 target npcId "${nid}"`)
        })
        cond.factionIds?.forEach((fid) => {
          if (!FACTION_DB_MAP[fid]) errors.push(`${ctxPath}: 未知的 target factionId "${fid}"`)
        })
        break
      default:
        break
    }
  }

  const checkEffect = (ctxPath: string, eff: QuestEffect) => {
    switch (eff.type) {
      case 'openScene': {
        if (eff.scene.beats.length === 0) {
          errors.push(`${ctxPath}.scene(${eff.scene.id}): beats 不能为空`)
        }
        eff.scene.beats.forEach((b, bi) => {
          if (b.speaker.kind === 'npc' && !NPC_DB_MAP[b.speaker.npcId]) {
            errors.push(
              `${ctxPath}.scene(${eff.scene.id}).beats[${bi}]: 未知的发言人 npcId "${b.speaker.npcId}"`,
            )
          }
        })
        eff.scene.choices?.forEach((ch, ci) => {
          if (ch.condition) {
            checkCondition(`${ctxPath}.scene(${eff.scene.id}).choices[${ci}].condition`, ch.condition)
          }
          ch.effects.forEach((ce, cei) =>
            checkEffect(`${ctxPath}.scene(${eff.scene.id}).choices[${ci}].effects[${cei}]`, ce),
          )
        })
        eff.scene.onFinishEffects?.forEach((fe, fei) =>
          checkEffect(`${ctxPath}.scene(${eff.scene.id}).onFinish[${fei}]`, fe),
        )
        break
      }
      case 'startQuest': {
        const refQ = byId.get(eff.questId)
        if (!refQ) {
          errors.push(`${ctxPath}: startQuest 引用了未知的 questId "${eff.questId}"`)
        } else if (eff.stepId && !refQ.steps[eff.stepId]) {
          errors.push(`${ctxPath}: 任务 "${eff.questId}" 中不存在起始 stepId "${eff.stepId}"`)
        }
        break
      }
      case 'setQuestStep': {
        const refQ = byId.get(eff.questId)
        if (!refQ) {
          errors.push(`${ctxPath}: setQuestStep 引用了未知的 questId "${eff.questId}"`)
        } else if (!refQ.steps[eff.stepId]) {
          errors.push(`${ctxPath}: 任务 "${eff.questId}" 中不存在目标 stepId "${eff.stepId}"`)
        }
        break
      }
      case 'completeQuest':
      case 'abandonQuest':
        if (!byId.has(eff.questId)) {
          errors.push(`${ctxPath}: 引用了未知的 questId "${eff.questId}"`)
        }
        break
      case 'giveItem':
      case 'removeItem':
        if (!ITEM_DB_MAP[eff.itemId]) {
          errors.push(`${ctxPath}: 未知的 itemId "${eff.itemId}"`)
        }
        break
      case 'teachMartialArt':
        if (!MARTIAL_ART_DB_MAP[eff.artId]) {
          errors.push(`${ctxPath}: 未知的武学 artId "${eff.artId}"`)
        }
        break
      case 'joinSect':
        if (!FACTION_DB_MAP[eff.sectId]) {
          errors.push(`${ctxPath}: 未知的 sectId "${eff.sectId}"`)
        }
        break
      case 'modifyNpcFavor':
        if (eff.target.kind === 'npc' && !NPC_DB_MAP[eff.target.npcId]) {
          errors.push(`${ctxPath}: 未知的 npcId "${eff.target.npcId}"`)
        }
        break
      case 'spawnDynamicActor':
        checkLocation(
          `${ctxPath}.spawnDynamicActor(${eff.actor.actorId})`,
          eff.actor.regionId,
          eff.actor.buildingId,
          eff.actor.spotId,
        )
        if (eff.actor.factionId && !FACTION_DB_MAP[eff.actor.factionId]) {
          errors.push(
            `${ctxPath}.spawnDynamicActor(${eff.actor.actorId}): 未知的 factionId "${eff.actor.factionId}"`,
          )
        }
        eff.actor.learnedArts?.forEach((la) => {
          if (!MARTIAL_ART_DB_MAP[la.artId]) {
            errors.push(
              `${ctxPath}.spawnDynamicActor(${eff.actor.actorId}): 未知的武学 artId "${la.artId}"`,
            )
          }
        })
        break
      case 'teleportPlayer':
        checkLocation(
          `${ctxPath}.teleportPlayer`,
          eff.regionId,
          eff.buildingId ?? undefined,
          eff.spotId ?? undefined,
        )
        break
      case 'startCombat':
        if (eff.questId && !byId.has(eff.questId)) {
          errors.push(`${ctxPath}.startCombat: 未知的 questId "${eff.questId}"`)
        }
        if (eff.opponent.kind === 'npc' && !NPC_DB_MAP[eff.opponent.npcId]) {
          errors.push(`${ctxPath}.startCombat: 未知的对手 npcId "${eff.opponent.npcId}"`)
        }
        eff.onWin.forEach((we, wi) => checkEffect(`${ctxPath}.startCombat.onWin[${wi}]`, we))
        eff.onLose?.forEach((le, li) => checkEffect(`${ctxPath}.startCombat.onLose[${li}]`, le))
        eff.onEscape?.forEach((ee, ei) =>
          checkEffect(`${ctxPath}.startCombat.onEscape[${ei}]`, ee),
        )
        eff.onDraw?.forEach((de, di) => checkEffect(`${ctxPath}.startCombat.onDraw[${di}]`, de))
        break
      case 'branch':
        checkCondition(`${ctxPath}.branch.condition`, eff.condition)
        eff.thenEffects.forEach((te, ti) =>
          checkEffect(`${ctxPath}.branch.then[${ti}]`, te),
        )
        eff.elseEffects?.forEach((ee, ei) =>
          checkEffect(`${ctxPath}.branch.else[${ei}]`, ee),
        )
        break
      default:
        break
    }
  }

  for (const q of quests) {
    const qPrefix = `[${q.id}]`
    if (q.factionId && !FACTION_DB_MAP[q.factionId]) {
      errors.push(`${qPrefix}: 未知的 factionId "${q.factionId}"`)
    }
    if (q.regionId && !REGION_DB_MAP[q.regionId]) {
      errors.push(`${qPrefix}: 未知的 regionId "${q.regionId}"`)
    }
    if (!q.steps[q.initialStepId]) {
      errors.push(`${qPrefix}: initialStepId "${q.initialStepId}" 未在 steps 中定义`)
    }
    for (const [stepKey, step] of Object.entries(q.steps)) {
      if (step.id !== stepKey) {
        errors.push(`${qPrefix}.steps.${stepKey}: step.id "${step.id}" 与键名不一致`)
      }
      if (step.targetLocation) {
        checkLocation(
          `${qPrefix}.steps.${stepKey}.targetLocation`,
          step.targetLocation.regionId,
          step.targetLocation.buildingId,
          step.targetLocation.spotId,
        )
      }
    }

    q.locationTriggers?.forEach((lt) => {
      const ltPath = `${qPrefix}.locationTriggers(${lt.id})`
      checkLocation(ltPath, lt.regionId, lt.buildingId ?? undefined, lt.spotId ?? undefined)
      if (lt.condition) checkCondition(`${ltPath}.condition`, lt.condition)
      lt.effects.forEach((e, i) => checkEffect(`${ltPath}.effects[${i}]`, e))
    })

    q.npcActions?.forEach((na) => {
      const naPath = `${qPrefix}.npcActions(${na.id})`
      checkCondition(`${naPath}.visibleWhen`, na.visibleWhen)
      if (na.enabledWhen) checkCondition(`${naPath}.enabledWhen`, na.enabledWhen)
      na.effects.forEach((e, i) => checkEffect(`${naPath}.effects[${i}]`, e))
    })

    q.spotActions?.forEach((sa) => {
      const saPath = `${qPrefix}.spotActions(${sa.id})`
      checkLocation(saPath, sa.regionId, sa.buildingId, sa.spotId ?? undefined)
      if (sa.visibleWhen) checkCondition(`${saPath}.visibleWhen`, sa.visibleWhen)
      if (sa.enabledWhen) checkCondition(`${saPath}.enabledWhen`, sa.enabledWhen)
      sa.effects.forEach((e, i) => checkEffect(`${saPath}.effects[${i}]`, e))
    })

    if (q.onDeadlineExpired) {
      if (q.onDeadlineExpired.stepId && !q.steps[q.onDeadlineExpired.stepId]) {
        errors.push(
          `${qPrefix}.onDeadlineExpired: 不存在的 stepId "${q.onDeadlineExpired.stepId}"`,
        )
      }
      q.onDeadlineExpired.effects.forEach((e, i) =>
        checkEffect(`${qPrefix}.onDeadlineExpired.effects[${i}]`, e),
      )
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
