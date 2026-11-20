import type {
  QuestCondition,
  QuestEffect,
  QuestLocationTriggerDef,
  QuestNpcActionDef,
  QuestPrimitiveValue,
  QuestSpotActionDef,
  StoryBeatDef,
  StorySpeakerSpec,
} from '../../types/quest'
import { makeQuestNpc, type MakeQuestNpcInput } from '../npcFactory'

export { makeQuestNpc, type MakeQuestNpcInput }

export interface BeatIllustrationExtra {
  illustrationUrl?: string
  illustrationCaption?: string
}

export interface NarratorBeatExtra extends BeatIllustrationExtra {
  label?: string
}

export interface CustomSpeakerInput {
  name: string
  title?: string
  factionName?: string
  portraitUrl?: string
  avatarUrl?: string
}

/**
 * 旁白台词积木：`N('山风呼啸……')` 或 `N('……', { illustrationUrl: '...' })`
 */
export function N(text: string, extra?: NarratorBeatExtra): StoryBeatDef {
  const speaker: StorySpeakerSpec =
    extra?.label !== undefined ? { kind: 'narrator', label: extra.label } : { kind: 'narrator' }
  return {
    speaker,
    text,
    ...(extra?.illustrationUrl !== undefined ? { illustrationUrl: extra.illustrationUrl } : {}),
    ...(extra?.illustrationCaption !== undefined
      ? { illustrationCaption: extra.illustrationCaption }
      : {}),
  }
}

/**
 * 主角台词积木：`P('在下遵命！')`
 */
export function P(text: string, extra?: BeatIllustrationExtra): StoryBeatDef {
  return {
    speaker: { kind: 'player' },
    text,
    ...(extra?.illustrationUrl !== undefined ? { illustrationUrl: extra.illustrationUrl } : {}),
    ...(extra?.illustrationCaption !== undefined
      ? { illustrationCaption: extra.illustrationCaption }
      : {}),
  }
}

/**
 * NPC / 当前交互人物 / 自定义人物 / 预定义发言人台词积木：
 * - `S('NPC-0140', '“展某奉命缉拿要犯！”')`
 * - `S('interactedNpc', '“少侠请留步！”')`
 * - `S(SPEAKER_CUSTOM, '“……”')`
 * - `S({ name: '黑衣探子', title: '暗哨' }, '“风紧扯呼！”')`
 */
export function S(
  who: 'interactedNpc' | string | StorySpeakerSpec | CustomSpeakerInput,
  text: string,
  extra?: BeatIllustrationExtra,
): StoryBeatDef {
  let speaker: StorySpeakerSpec
  if (who === 'interactedNpc') {
    speaker = { kind: 'interactedNpc' }
  } else if (typeof who === 'string') {
    speaker = { kind: 'npc', npcId: who }
  } else if ('kind' in who) {
    speaker = who
  } else {
    speaker = {
      kind: 'custom',
      name: who.name,
      ...(who.title !== undefined ? { title: who.title } : {}),
      ...(who.factionName !== undefined ? { factionName: who.factionName } : {}),
      ...(who.portraitUrl !== undefined ? { portraitUrl: who.portraitUrl } : {}),
      ...(who.avatarUrl !== undefined ? { avatarUrl: who.avatarUrl } : {}),
    }
  }
  return {
    speaker,
    text,
    ...(extra?.illustrationUrl !== undefined ? { illustrationUrl: extra.illustrationUrl } : {}),
    ...(extra?.illustrationCaption !== undefined
      ? { illustrationCaption: extra.illustrationCaption }
      : {}),
  }
}

/**
 * 任务阶段判定积木：`atStep('QST-xxx', 'step_1')`
 */
export function atStep(questId: string, stepId?: string): QuestCondition {
  return stepId !== undefined
    ? { type: 'questStatus', questId, status: 'active', stepId }
    : { type: 'questStatus', questId, status: 'active' }
}

/**
 * 通用任务状态判定积木：`qStatus('QST-xxx', 'not_started')` / `qStatus('QST-xxx', 'completed', { outcome: 'win' })`
 */
export function qStatus(
  questId: string,
  status: 'not_started' | 'active' | 'completed' | 'not_completed',
  extra?: { stepId?: string; outcome?: string },
): QuestCondition {
  return {
    type: 'questStatus',
    questId,
    status,
    ...(extra?.stepId !== undefined ? { stepId: extra.stepId } : {}),
    ...(extra?.outcome !== undefined ? { outcome: extra.outcome } : {}),
  }
}

/**
 * 警示提示积木：`warn('盘缠不足！', '江湖试炼')`
 */
export function warn(text: string, logTag?: string): QuestEffect {
  return logTag !== undefined
    ? { type: 'toast', text, tone: 'warn', logTag }
    : { type: 'toast', text, tone: 'warn' }
}

/**
 * 通用提示积木：`toast('获得秘籍！', 'success', '奇遇收获')`
 */
export function toast(
  text: string,
  tone?: 'talk' | 'success' | 'warn',
  logTag?: string,
): QuestEffect {
  return {
    type: 'toast',
    text,
    ...(tone !== undefined ? { tone } : {}),
    ...(logTag !== undefined ? { logTag } : {}),
  }
}

/**
 * 按 ID 懒加载/索引打开剧情幕积木：`openScene('scene_01', 'QST-xxx')`
 */
export function openScene(sceneId: string, questId?: string): QuestEffect {
  return questId !== undefined
    ? { type: 'openScene', sceneId, questId }
    : { type: 'openScene', sceneId }
}

/**
 * 临阵传功积木：`teachArtNow('MA-094')`
 * 师长在战前传授的武学须当场习得（第 1 重并自动运使），以便玩家带入随后的剧情战斗；
 * 已习得者不重复传授。任务了结时原有的 teachMartialArt 仍会按奖励重数提升。
 */
export function teachArtNow(artId: string): QuestEffect {
  return {
    type: 'branch',
    condition: { type: 'learnedArtAtLeast', artId, minLevel: 1 },
    thenEffects: [],
    elseEffects: [{ type: 'teachMartialArt', artId, autoEquip: true }],
  }
}

/**
 * 推进任务步骤积木：`setStep('QST-xxx', 'step_2')`
 */
export function setStep(questId: string, stepId: string): QuestEffect {
  return { type: 'setQuestStep', questId, stepId }
}

/**
 * 剧情标记条件积木：`flag('met_elder', 'truthy')` / `flag('mode', 'eq', 'a')`
 */
export function flag(
  flagName: string,
  op?: 'truthy' | 'falsy' | 'eq' | 'neq' | 'gte' | 'lte',
  value?: QuestPrimitiveValue,
): QuestCondition {
  return {
    type: 'flag',
    flag: flagName,
    ...(op !== undefined ? { op } : {}),
    ...(value !== undefined ? { value } : {}),
  }
}

export interface BindSceneTriggerOptions {
  id: string
  questId: string
  sceneId: string
  regionId: string
  buildingId?: string | null
  spotId?: string | null
  npcId?: string
  actionLabel?: string
  actionSubtitle?: string
  condition: QuestCondition
  onceFlag?: string
  preEffects?: QuestEffect[]
  priority?: number
}

/**
 * 统一绑定「进场触发器 / 据点按钮 / NPC 对话动作」的 DSL 宏，消除三处重复样板代码。
 */
export function bindSceneTrigger(opts: BindSceneTriggerOptions): {
  locationTrigger: QuestLocationTriggerDef
  spotAction?: QuestSpotActionDef
  npcAction?: QuestNpcActionDef
} {
  const effects: QuestEffect[] = [
    ...(opts.preEffects ?? []),
    openScene(opts.sceneId, opts.questId),
  ]
  const locationTrigger: QuestLocationTriggerDef = {
    id: `${opts.id}_loc`,
    regionId: opts.regionId,
    ...(opts.buildingId !== undefined ? { buildingId: opts.buildingId } : {}),
    ...(opts.spotId !== undefined ? { spotId: opts.spotId } : {}),
    condition: opts.condition,
    ...(opts.onceFlag !== undefined ? { onceFlag: opts.onceFlag } : {}),
    ...(opts.priority !== undefined ? { priority: opts.priority } : {}),
    effects,
  }
  const spotAction: QuestSpotActionDef | undefined =
    opts.actionLabel && opts.buildingId
      ? {
          id: `${opts.id}_spot`,
          regionId: opts.regionId,
          buildingId: opts.buildingId,
          ...(opts.spotId !== undefined ? { spotId: opts.spotId } : {}),
          label: opts.actionLabel,
          ...(opts.actionSubtitle !== undefined ? { subtitle: opts.actionSubtitle } : {}),
          visibleWhen: opts.condition,
          effects,
        }
      : undefined
  const npcAction: QuestNpcActionDef | undefined =
    opts.npcId && opts.actionLabel
      ? {
          id: `${opts.id}_npc`,
          label: opts.actionLabel,
          visibleWhen: {
            type: 'all',
            conditions: [{ type: 'targetNpcMatch', npcIds: [opts.npcId] }, opts.condition],
          },
          effects,
        }
      : undefined
  return {
    locationTrigger,
    ...(spotAction ? { spotAction } : {}),
    ...(npcAction ? { npcAction } : {}),
  }
}

