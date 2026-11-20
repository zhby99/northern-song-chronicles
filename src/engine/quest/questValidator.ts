import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPC_DB_MAP,
  REGION_DB_MAP,
} from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import { QUEST_REGISTRY } from '../../data/quests'
import type {
  QuestCondition,
  QuestDefinition,
  QuestEffect,
  StorySceneDef,
} from '../../types/quest'
import { getLoadedQuestScenes } from './sceneRegistry'

const MAX_TEMP_QUEST_NPC_ARTS = 3

const MARTIAL_ART_TIER_RANK: Record<string, number> = {
  凡品下品: 1,
  凡品中品: 2,
  凡品上品: 3,
  良品下品: 4,
  良品中品: 5,
  良品上品: 6,
  地阶下品: 7,
  地阶中品: 8,
  地阶上品: 9,
  天阶下品: 10,
  天阶中品: 11,
  天阶上品: 12,
}

/**
 * 静态任务链全量引用校验器：
 * 确保所有声明式任务链中的地区、建筑、子景点、NPC、门派、物品、武学与步骤跳转 ID 100% 合法无悬空。
 */
export function validateAllRegisteredQuests(
  quests: readonly QuestDefinition[] = QUEST_REGISTRY,
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const byId = new Map<string, QuestDefinition>()

  for (const q of quests) {
    if (byId.has(q.id)) {
      errors.push(`[${q.id}] 任务 ID 重复定义`)
    }
    byId.set(q.id, q)
  }

  const checkTempQuestNpcLoadout = (
    ctxPath: string,
    npcName: string,
    realm: string | undefined,
    equippedArts?: Partial<Record<'neigong' | 'qinggong' | 'move1' | 'move2' | 'move3' | 'move4', string | null>>,
    learnedArts?: Array<{ artId: string; level: number }>,
  ) => {
    const artIds = new Set<string>()
    if (equippedArts) {
      for (const artId of Object.values(equippedArts)) {
        if (artId) artIds.add(artId)
      }
    }
    if (learnedArts) {
      for (const la of learnedArts) {
        if (la.artId) artIds.add(la.artId)
      }
    }

    if (artIds.size > MAX_TEMP_QUEST_NPC_ARTS) {
      errors.push(
        `${ctxPath}(${npcName}): 任务临时 NPC 武学数量超限（${artIds.size} > ${MAX_TEMP_QUEST_NPC_ARTS}）`,
      )
    }

    const realmText = realm ?? ''
    const isSanliuOrLower = realmText.startsWith('不入流') || realmText.startsWith('三流')
    const isErliu = realmText.startsWith('二流')

    for (const artId of artIds) {
      const art = MARTIAL_ART_DB_MAP[artId]
      if (!art) {
        errors.push(`${ctxPath}(${npcName}): 未知的武学 artId "${artId}"`)
        continue
      }
      const rank = MARTIAL_ART_TIER_RANK[art.fullTier] ?? 0
      if (isSanliuOrLower && rank > 2) {
        errors.push(
          `${ctxPath}(${npcName}·${realmText}): 三流/不入流任务临时 NPC 仅可配凡品下品/中品武学，禁止装配 ${artId}(${art.name}·${art.fullTier})`,
        )
      } else if (isErliu && rank > 5) {
        errors.push(
          `${ctxPath}(${npcName}·${realmText}): 二流任务临时 NPC 仅可配良品中品及以下武学，禁止装配 ${artId}(${art.name}·${art.fullTier})`,
        )
      }
    }
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
      case 'sectDaysAtLeast':
        if (!FACTION_DB_MAP[cond.sectId]) {
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
      case 'neverJoinedAnySect':
      case 'noLearnedArtAtOrAboveTier':
        break
      case 'questCompletedDaysAgoAtLeast': {
        if (!byId.has(cond.questId)) {
          errors.push(`${ctxPath}: 引用了未注册的 questId "${cond.questId}"`)
        }
        break
      }
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
      case 'npcAlive':
        if (!NPC_DB_MAP[cond.npcId] && !cond.npcId.startsWith('ACT-')) {
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

  const validatedSceneSet = new Set<string>()

  const checkScene = (sceneCtxPath: string, scene: StorySceneDef, ownerQuestId: string) => {
    const dedupeKey = `${ownerQuestId}::${scene.id}`
    if (validatedSceneSet.has(dedupeKey)) return
    validatedSceneSet.add(dedupeKey)

    if (scene.beats.length === 0) {
      errors.push(`${sceneCtxPath}.scene(${scene.id}): beats 不能为空`)
    }
    scene.beats.forEach((b, bi) => {
      if (b.speaker.kind === 'npc' && !NPC_DB_MAP[b.speaker.npcId]) {
        errors.push(
          `${sceneCtxPath}.scene(${scene.id}).beats[${bi}]: 未知的发言人 npcId "${b.speaker.npcId}"`,
        )
      }
    })
    scene.choices?.forEach((ch, ci) => {
      if (ch.condition) {
        checkCondition(`${sceneCtxPath}.scene(${scene.id}).choices[${ci}].condition`, ch.condition)
      }
      ch.effects.forEach((ce, cei) =>
        checkEffect(`${sceneCtxPath}.scene(${scene.id}).choices[${ci}].effects[${cei}]`, ce, ownerQuestId),
      )
    })
    scene.onFinishEffects?.forEach((fe, fei) =>
      checkEffect(`${sceneCtxPath}.scene(${scene.id}).onFinish[${fei}]`, fe, ownerQuestId),
    )
  }

  const resolveQuestScenesForValidation = (qid: string) => {
    const q = byId.get(qid)
    return getLoadedQuestScenes(qid) ?? q?.scenes
  }

  const checkEffect = (ctxPath: string, eff: QuestEffect, ownerQuestId: string) => {
    switch (eff.type) {
      case 'openScene': {
        if ('scene' in eff) {
          checkScene(ctxPath, eff.scene, ownerQuestId)
        } else {
          const targetQid = eff.questId ?? ownerQuestId
          const refQ = byId.get(targetQid)
          if (!refQ) {
            errors.push(`${ctxPath}: openScene 引用了未知的 questId "${targetQid}"`)
          } else {
            const scenes = resolveQuestScenesForValidation(targetQid)
            if (scenes) {
              const targetScene = scenes[eff.sceneId]
              if (!targetScene) {
                errors.push(
                  `${ctxPath}: 任务 "${targetQid}" 的 scenes 中不存在 sceneId "${eff.sceneId}"`,
                )
              } else {
                checkScene(ctxPath, targetScene, targetQid)
              }
            }
          }
        }
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
      case 'confirmJoinSect':
      case 'setSectRank':
        if (!FACTION_DB_MAP[eff.sectId]) {
          errors.push(`${ctxPath}: 未知的 sectId "${eff.sectId}"`)
        }
        break
      case 'modifyNpcFavor':
        if (
          eff.target.kind === 'npc' &&
          !NPC_DB_MAP[eff.target.npcId] &&
          !eff.target.npcId.startsWith('ACT-')
        ) {
          errors.push(`${ctxPath}: 未知的 npcId "${eff.target.npcId}"`)
        }
        break
      case 'markNpcsDead':
        eff.npcIds.forEach((nid) => {
          if (!NPC_DB_MAP[nid] && !nid.startsWith('ACT-')) {
            errors.push(`${ctxPath}.markNpcsDead: 未知的 npcId "${nid}"`)
          }
        })
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
        checkTempQuestNpcLoadout(
          `${ctxPath}.spawnDynamicActor(${eff.actor.actorId})`,
          eff.actor.name,
          eff.actor.realm,
          eff.actor.equippedArts,
          eff.actor.learnedArts,
        )
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
        } else if (eff.opponent.kind === 'custom') {
          checkTempQuestNpcLoadout(
            `${ctxPath}.startCombat.opponent`,
            eff.opponent.npc.name,
            eff.opponent.npc.realm,
            eff.opponent.npc.equippedArts,
            eff.opponent.npc.learnedArts,
          )
        }
        eff.extraOpponents?.forEach((eo, eoi) => {
          if (eo.kind === 'npc' && !NPC_DB_MAP[eo.npcId]) {
            errors.push(`${ctxPath}.startCombat.extraOpponents[${eoi}]: 未知的对手 npcId "${eo.npcId}"`)
          } else if (eo.kind === 'custom') {
            checkTempQuestNpcLoadout(
              `${ctxPath}.startCombat.extraOpponents[${eoi}]`,
              eo.npc.name,
              eo.npc.realm,
              eo.npc.equippedArts,
              eo.npc.learnedArts,
            )
          }
        })
        eff.allies?.forEach((al, ali) => {
          if (al.kind === 'npc' && !NPC_DB_MAP[al.npcId]) {
            errors.push(`${ctxPath}.startCombat.allies[${ali}]: 未知的助战同伴 npcId "${al.npcId}"`)
          } else if (al.kind === 'custom') {
            checkTempQuestNpcLoadout(
              `${ctxPath}.startCombat.allies[${ali}]`,
              al.npc.name,
              al.npc.realm,
              al.npc.equippedArts,
              al.npc.learnedArts,
            )
          }
        })
        eff.onWin.forEach((we, wi) => checkEffect(`${ctxPath}.startCombat.onWin[${wi}]`, we, ownerQuestId))
        eff.onLose?.forEach((le, li) => checkEffect(`${ctxPath}.startCombat.onLose[${li}]`, le, ownerQuestId))
        eff.onEscape?.forEach((ee, ei) =>
          checkEffect(`${ctxPath}.startCombat.onEscape[${ei}]`, ee, ownerQuestId),
        )
        eff.onDraw?.forEach((de, di) => checkEffect(`${ctxPath}.startCombat.onDraw[${di}]`, de, ownerQuestId))
        break
      case 'branch':
        checkCondition(`${ctxPath}.branch.condition`, eff.condition)
        eff.thenEffects.forEach((te, ti) =>
          checkEffect(`${ctxPath}.branch.then[${ti}]`, te, ownerQuestId),
        )
        eff.elseEffects?.forEach((ee, ei) =>
          checkEffect(`${ctxPath}.branch.else[${ei}]`, ee, ownerQuestId),
        )
        break
      default: {
        const rawType = (eff as { type?: string }).type
        if (rawType === 'modifyTalent' || rawType === 'modifyBaseStat') {
          errors.push(
            `${ctxPath}: 严禁在任务中使用 "${rawType}" 增加先天禀赋或实战交锋属性`,
          )
        }
        break
      }
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

    const loadedScenes = resolveQuestScenesForValidation(q.id)
    if (loadedScenes) {
      for (const [sceneKey, scene] of Object.entries(loadedScenes)) {
        if (scene.id !== sceneKey) {
          errors.push(`${qPrefix}.scenes.${sceneKey}: scene.id "${scene.id}" 与键名不一致`)
        }
        checkScene(`${qPrefix}.scenes.${sceneKey}`, scene, q.id)
      }
    }

    q.locationTriggers?.forEach((lt) => {
      const ltPath = `${qPrefix}.locationTriggers(${lt.id})`
      checkLocation(ltPath, lt.regionId, lt.buildingId ?? undefined, lt.spotId ?? undefined)
      if (lt.condition) checkCondition(`${ltPath}.condition`, lt.condition)
      lt.effects.forEach((e, i) => checkEffect(`${ltPath}.effects[${i}]`, e, q.id))
    })

    q.npcActions?.forEach((na) => {
      const naPath = `${qPrefix}.npcActions(${na.id})`
      checkCondition(`${naPath}.visibleWhen`, na.visibleWhen)
      if (na.enabledWhen) checkCondition(`${naPath}.enabledWhen`, na.enabledWhen)
      na.effects.forEach((e, i) => checkEffect(`${naPath}.effects[${i}]`, e, q.id))
    })

    q.spotActions?.forEach((sa) => {
      const saPath = `${qPrefix}.spotActions(${sa.id})`
      checkLocation(saPath, sa.regionId, sa.buildingId, sa.spotId ?? undefined)
      const bldg = BUILDING_DB_MAP[sa.buildingId]
      if (bldg?.interior && bldg.interior.spots.length > 0 && !sa.spotId) {
        errors.push(
          `${saPath}: 建筑 "${sa.buildingId}" (${bldg.name}) 包含 ${bldg.interior.spots.length} 个子景点，必须明确指定 spotId（否则玩家在游戏内无法触发该行动）`,
        )
      }
      if (sa.visibleWhen) checkCondition(`${saPath}.visibleWhen`, sa.visibleWhen)
      if (sa.enabledWhen) checkCondition(`${saPath}.enabledWhen`, sa.enabledWhen)
      sa.effects.forEach((e, i) => checkEffect(`${saPath}.effects[${i}]`, e, q.id))
    })

    if (q.onDeadlineExpired) {
      if (q.onDeadlineExpired.stepId && !q.steps[q.onDeadlineExpired.stepId]) {
        errors.push(
          `${qPrefix}.onDeadlineExpired: 不存在的 stepId "${q.onDeadlineExpired.stepId}"`,
        )
      }
      q.onDeadlineExpired.effects.forEach((e, i) =>
        checkEffect(`${qPrefix}.onDeadlineExpired.effects[${i}]`, e, q.id),
      )
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export const MAX_QUEST_TEN_ARTS_GAIN = 3

type ProgState = '__not_started__' | `step:${string}` | '__completed__'

function getPermanentItemTenArtsGain(itemId: string, qty: number): number {
  if (qty <= 0) return 0
  const item = ITEM_DB_MAP[itemId]
  const u = item?.useEffect
  if (!u) return 0
  let perItem = 0
  if (typeof u.riding === 'number' && u.riding > 0) perItem += u.riding
  if (u.skillGain && u.skillGain[1] > 0) perItem += u.skillGain[1]
  if (u.skillsGain) {
    for (const val of Object.values(u.skillsGain)) {
      if (typeof val === 'number' && val > 0) perItem += val
    }
  }
  if (perItem <= 0) return 0
  return perItem * (u.onceOnly ? 1 : qty)
}

function extractOnceKey(
  onceFlag: string | undefined,
  ...conditions: Array<QuestCondition | undefined>
): string | null {
  if (onceFlag) return `once:${onceFlag}`
  const conjuncts: QuestCondition[] = []
  const collectConjuncts = (cond?: QuestCondition) => {
    if (!cond) return
    if (cond.type === 'all') {
      for (const sub of cond.conditions) collectConjuncts(sub)
    } else {
      conjuncts.push(cond)
    }
  }
  for (const cond of conditions) collectConjuncts(cond)

  for (const atom of conjuncts) {
    if (
      atom.type === 'flag' &&
      (atom.op === 'falsy' || ((atom.op === 'eq' || atom.op === 'lte') && !atom.value))
    ) {
      return `once:${atom.flag}`
    }
    if (
      atom.type === 'not' &&
      atom.condition.type === 'flag' &&
      (atom.condition.op === 'truthy' ||
        atom.condition.op === undefined ||
        (atom.condition.op === 'eq' && Boolean(atom.condition.value)))
    ) {
      return `once:${atom.condition.flag}`
    }
  }
  return null
}

/**
 * 基于任务进度状态机与一次性标记（onceFlag）图搜索，计算单条任务任意单一通关路径可获得的累计永久十艺点数上限。
 */
export function computeQuestMaxTenArtsGain(
  quest: QuestDefinition,
  loadedScenes?: Record<string, StorySceneDef>,
): number {
  const scenes = loadedScenes ?? getLoadedQuestScenes(quest.id) ?? quest.scenes ?? {}
  const allStepStates = Object.keys(quest.steps).map((s): ProgState => `step:${s}`)
  const allStates: ProgState[] = ['__not_started__', ...allStepStates, '__completed__']

  const extractAllowedProgStates = (cond?: QuestCondition): Set<ProgState> => {
    if (!cond) return new Set<ProgState>(allStates)
    switch (cond.type) {
      case 'all': {
        let acc = new Set<ProgState>(allStates)
        for (const sub of cond.conditions) {
          const next = extractAllowedProgStates(sub)
          acc = new Set([...acc].filter((s) => next.has(s)))
        }
        return acc
      }
      case 'any': {
        const acc = new Set<ProgState>()
        for (const sub of cond.conditions) {
          for (const s of extractAllowedProgStates(sub)) acc.add(s)
        }
        return acc
      }
      case 'not': {
        if (cond.condition.type === 'questStatus' && cond.condition.questId === quest.id) {
          if (cond.condition.status === 'completed') {
            return new Set<ProgState>(allStates.filter((s) => s !== '__completed__'))
          }
          if (cond.condition.status === 'not_started') {
            return new Set<ProgState>(allStates.filter((s) => s !== '__not_started__'))
          }
          if (cond.condition.status === 'active') {
            if (cond.condition.stepId) {
              const excluded: ProgState = `step:${cond.condition.stepId}`
              return new Set<ProgState>(allStates.filter((s) => s !== excluded))
            }
            return new Set<ProgState>(['__not_started__', '__completed__'])
          }
        }
        return new Set<ProgState>(allStates)
      }
      case 'questStatus': {
        if (cond.questId !== quest.id) return new Set<ProgState>(allStates)
        if (cond.status === 'not_started') return new Set<ProgState>(['__not_started__'])
        if (cond.status === 'completed') return new Set<ProgState>(['__completed__'])
        if (cond.status === 'not_completed') {
          return new Set<ProgState>(allStates.filter((s) => s !== '__completed__'))
        }
        if (cond.status === 'active') {
          return cond.stepId
            ? new Set<ProgState>([`step:${cond.stepId}`])
            : new Set<ProgState>(allStepStates)
        }
        return new Set<ProgState>(allStates)
      }
      default:
        return new Set<ProgState>(allStates)
    }
  }

  const intersectAllowed = (...conditions: Array<QuestCondition | undefined>): Set<ProgState> => {
    let acc = new Set<ProgState>(allStates)
    for (const cond of conditions) {
      if (!cond) continue
      const allowed = extractAllowedProgStates(cond)
      acc = new Set([...acc].filter((s) => allowed.has(s)))
    }
    return acc
  }

  const mergeOutcomes = (
    dst: Map<ProgState, number>,
    src: Map<ProgState, number>,
    offset = 0,
  ) => {
    for (const [st, g] of src) {
      const candidate = offset + g
      const prev = dst.get(st)
      if (prev === undefined || candidate > prev) {
        dst.set(st, candidate)
      }
    }
  }

  const sceneMemo = new Map<string, Map<ProgState, number>>()

  const evalEffects = (
    effects: readonly QuestEffect[],
    initialState: ProgState,
    visiting: Set<string>,
  ): { outcomes: Map<ProgState, number>; hitCycle: boolean } => {
    let cur = new Map<ProgState, number>([[initialState, 0]])
    let hitCycle = false

    for (const eff of effects) {
      switch (eff.type) {
        case 'modifySkill': {
          if (eff.delta > 0) {
            for (const [st, g] of cur) cur.set(st, g + eff.delta)
          }
          break
        }
        case 'giveItem': {
          const itemGain = getPermanentItemTenArtsGain(eff.itemId, eff.qty ?? 1)
          if (itemGain > 0) {
            for (const [st, g] of cur) cur.set(st, g + itemGain)
          }
          break
        }
        case 'startQuest': {
          if (eff.questId === quest.id) {
            const targetState: ProgState = `step:${eff.stepId ?? quest.initialStepId}`
            cur = new Map([[targetState, Math.max(...cur.values())]])
          }
          break
        }
        case 'setQuestStep': {
          if (eff.questId === quest.id) {
            const targetState: ProgState = `step:${eff.stepId}`
            cur = new Map([[targetState, Math.max(...cur.values())]])
          }
          break
        }
        case 'completeQuest':
        case 'abandonQuest': {
          if (eff.questId === quest.id) {
            cur = new Map([['__completed__', Math.max(...cur.values())]])
          }
          break
        }
        case 'branch': {
          const nextCur = new Map<ProgState, number>()
          for (const [st, baseG] of cur) {
            const thenRes = evalEffects(eff.thenEffects, st, visiting)
            mergeOutcomes(nextCur, thenRes.outcomes, baseG)
            const elseRes = evalEffects(eff.elseEffects ?? [], st, visiting)
            mergeOutcomes(nextCur, elseRes.outcomes, baseG)
            hitCycle ||= thenRes.hitCycle || elseRes.hitCycle
          }
          cur = nextCur
          break
        }
        case 'startCombat': {
          const nextCur = new Map<ProgState, number>()
          const branches: Array<readonly QuestEffect[]> = [eff.onWin]
          if (eff.onLose || (!eff.lethalOnLose && eff.rule !== 'duel')) {
            branches.push(eff.onLose ?? [])
          }
          if (eff.onEscape || !eff.forbidEscapeReason) {
            branches.push(eff.onEscape ?? [])
          }
          if (eff.onDraw) {
            branches.push(eff.onDraw)
          }
          for (const [st, baseG] of cur) {
            for (const branchEffects of branches) {
              const res = evalEffects(branchEffects, st, visiting)
              mergeOutcomes(nextCur, res.outcomes, baseG)
              hitCycle ||= res.hitCycle
            }
          }
          cur = nextCur
          break
        }
        case 'openScene': {
          const nextCur = new Map<ProgState, number>()
          for (const [st, baseG] of cur) {
            if ('scene' in eff) {
              const res = evalScene(eff.scene, st, visiting, false)
              mergeOutcomes(nextCur, res.outcomes, baseG)
              hitCycle ||= res.hitCycle
            } else if (!eff.questId || eff.questId === quest.id) {
              const target = scenes[eff.sceneId]
              if (target) {
                const res = evalScene(target, st, visiting, true)
                mergeOutcomes(nextCur, res.outcomes, baseG)
                hitCycle ||= res.hitCycle
              } else {
                mergeOutcomes(nextCur, new Map([[st, 0]]), baseG)
              }
            } else {
              mergeOutcomes(nextCur, new Map([[st, 0]]), baseG)
            }
          }
          cur = nextCur
          break
        }
        default:
          break
      }
    }

    return { outcomes: cur, hitCycle }
  }

  const evalScene = (
    scene: StorySceneDef,
    inState: ProgState,
    visiting: Set<string>,
    cacheable: boolean,
  ): { outcomes: Map<ProgState, number>; hitCycle: boolean } => {
    const memoKey = `${scene.id}@@${inState}`
    if (cacheable && sceneMemo.has(memoKey)) {
      return { outcomes: sceneMemo.get(memoKey)!, hitCycle: false }
    }
    if (visiting.has(scene.id)) {
      return { outcomes: new Map([[inState, 0]]), hitCycle: true }
    }
    visiting.add(scene.id)

    const outcomes = new Map<ProgState, number>()
    let hitCycle = false
    const choices = scene.choices ?? []
    for (const choice of choices) {
      const res = evalEffects(choice.effects, inState, visiting)
      mergeOutcomes(outcomes, res.outcomes)
      hitCycle ||= res.hitCycle
    }

    if (choices.length === 0 || choices.some((c) => c.hideWhenUnavailable)) {
      const finishRes = evalEffects(scene.onFinishEffects ?? [], inState, visiting)
      mergeOutcomes(outcomes, finishRes.outcomes)
      hitCycle ||= finishRes.hitCycle
    }

    visiting.delete(scene.id)
    if (cacheable && !hitCycle) {
      sceneMemo.set(memoKey, outcomes)
    }
    return { outcomes, hitCycle }
  }

  interface EntryTransition {
    allowedStates: Set<ProgState>
    onceKey: string | null
    outcomesByState: Map<ProgState, Map<ProgState, number>>
  }

  const entries: EntryTransition[] = []
  const rawEntries: Array<{
    allowedStates: Set<ProgState>
    onceKey: string | null
    effects: readonly QuestEffect[]
  }> = []

  for (const lt of quest.locationTriggers ?? []) {
    rawEntries.push({
      allowedStates: intersectAllowed(lt.condition),
      onceKey: extractOnceKey(lt.onceFlag, lt.condition),
      effects: lt.effects,
    })
  }
  for (const na of quest.npcActions ?? []) {
    rawEntries.push({
      allowedStates: intersectAllowed(na.visibleWhen, na.enabledWhen),
      onceKey: extractOnceKey(undefined, na.visibleWhen, na.enabledWhen),
      effects: na.effects,
    })
  }
  for (const sa of quest.spotActions ?? []) {
    rawEntries.push({
      allowedStates: intersectAllowed(sa.visibleWhen, sa.enabledWhen),
      onceKey: extractOnceKey(undefined, sa.visibleWhen, sa.enabledWhen),
      effects: sa.effects,
    })
  }
  if (quest.onDeadlineExpired) {
    rawEntries.push({
      allowedStates: quest.onDeadlineExpired.stepId
        ? new Set<ProgState>([`step:${quest.onDeadlineExpired.stepId}`])
        : new Set<ProgState>(allStepStates),
      onceKey: 'once:__deadline__',
      effects: quest.onDeadlineExpired.effects,
    })
  }

  const gainOnceKeys = new Set<string>()
  for (const raw of rawEntries) {
    const outcomesByState = new Map<ProgState, Map<ProgState, number>>()
    let entryMaxGain = 0
    for (const st of raw.allowedStates) {
      const { outcomes } = evalEffects(raw.effects, st, new Set())
      if (raw.onceKey === null && (outcomes.get(st) ?? 0) > 0) {
        return Number.POSITIVE_INFINITY
      }
      for (const g of outcomes.values()) {
        if (g > entryMaxGain) entryMaxGain = g
      }
      outcomesByState.set(st, outcomes)
    }
    if (raw.onceKey && entryMaxGain > 0) {
      gainOnceKeys.add(raw.onceKey)
    }
    entries.push({
      allowedStates: raw.allowedStates,
      onceKey: raw.onceKey,
      outcomesByState,
    })
  }

  const startState: ProgState = entries.some((e) => e.allowedStates.has('__not_started__'))
    ? '__not_started__'
    : `step:${quest.initialStepId}`

  const dpMemo = new Map<string, number>()

  const search = (
    st: ProgState,
    usedOnce: Set<string>,
    cumGain: number,
    pathGains: Map<string, number>,
  ): { bestRemaining: number; hitCycle: boolean } => {
    const canonKey = `${st}|${[...usedOnce].sort().join(',')}`
    const cached = dpMemo.get(canonKey)
    if (cached !== undefined) {
      return { bestRemaining: cached, hitCycle: false }
    }
    const prevPathGain = pathGains.get(canonKey)
    if (prevPathGain !== undefined) {
      if (cumGain > prevPathGain) {
        return { bestRemaining: Number.POSITIVE_INFINITY, hitCycle: true }
      }
      return { bestRemaining: 0, hitCycle: true }
    }

    pathGains.set(canonKey, cumGain)
    let best = 0
    let hitCycle = false

    for (const entry of entries) {
      if (!entry.allowedStates.has(st)) continue
      if (entry.onceKey && usedOnce.has(entry.onceKey)) continue
      const outcomes = entry.outcomesByState.get(st)
      if (!outcomes) continue

      const nextUsed =
        entry.onceKey && gainOnceKeys.has(entry.onceKey)
          ? new Set([...usedOnce, entry.onceKey])
          : usedOnce

      for (const [nextSt, edgeGain] of outcomes) {
        if (nextSt === st && edgeGain <= 0) continue
        const sub = search(nextSt, nextUsed, cumGain + edgeGain, pathGains)
        hitCycle ||= sub.hitCycle
        const candidate = edgeGain + sub.bestRemaining
        if (candidate > best) best = candidate
      }
    }

    pathGains.delete(canonKey)
    if (!hitCycle) {
      dpMemo.set(canonKey, best)
    }
    return { bestRemaining: best, hitCycle }
  }

  return search(startState, new Set(), 0, new Map()).bestRemaining
}
