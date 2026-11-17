import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  NPC_DB_MAP,
  REGION_DB_MAP,
  resolveNpcByName,
} from '../data/gameDb'
import { DEFAULT_EQUIPPED_SLOTS } from '../data/itemsDb'
import type {
  CompiledNpcRecord,
  EquippedArtsMap,
  EquippedSlotsMap,
  LearnedArtEntry,
  NodeNpc,
  NpcCombatStats,
  NpcTalents,
  NpcTenArts,
  RoamingMaster,
} from '../types/game'
import type { DynamicQuestNpc } from '../types/quest'
import { inferTemplatePortrait, resolveAvatarForFullbody } from '../utils/portraitFallback'

export interface MakeQuestNpcInput {
  id?: string
  name: string
  title: string
  realm: string
  talk: string
  stats: Omit<NpcCombatStats, 'isBenchmark'> & { isBenchmark?: boolean }
  factionId?: string
  factionName?: string
  sectRank?: number | null
  sectRankLabel?: string | null
  avatarUrl?: string | null
  portraitUrl?: string | null
  talents?: Partial<NpcTalents>
  tenArts?: NpcTenArts
  fullLocationLabel?: string
  equippedArts?: Partial<EquippedArtsMap>
  learnedArts?: Array<{ artId: string; level: number; exp?: number }>
  equipped?: Partial<EquippedSlotsMap>
  isDynamicLiaoSpy?: boolean
  isDynamicKaifengWarrant?: boolean
  kaifengWarrantKind?: 'investigate' | 'arrest'
  dynamicQuestActorId?: string
  questBadgeLabel?: string
}

/**
 * 构造任务自定义/动态战斗或场景 `NodeNpc`，自动补全默认先天禀赋、披挂空槽、武学空槽及立绘模板兜底。
 */
export function makeQuestNpc(input: MakeQuestNpcInput): NodeNpc {
  const resolvedFactionName =
    input.factionName ?? (input.factionId ? FACTION_DB_MAP[input.factionId]?.name : undefined)
  const fallbackFullbody =
    input.portraitUrl ??
    inferTemplatePortrait({
      name: input.name,
      title: input.title,
      factionName: resolvedFactionName,
    })

  const equippedArts: EquippedArtsMap | undefined = input.equippedArts
    ? {
        neigong: input.equippedArts.neigong ?? null,
        qinggong: input.equippedArts.qinggong ?? null,
        move1: input.equippedArts.move1 ?? null,
        move2: input.equippedArts.move2 ?? null,
        move3: input.equippedArts.move3 ?? null,
        move4: input.equippedArts.move4 ?? null,
      }
    : undefined

  const learnedArts: LearnedArtEntry[] | undefined = input.learnedArts
    ? input.learnedArts.map((a) => ({ artId: a.artId, level: a.level, exp: a.exp ?? 0 }))
    : undefined

  return {
    id: input.id,
    name: input.name,
    title: input.title,
    realm: input.realm,
    factionId: input.factionId,
    factionName: resolvedFactionName,
    sectRank: input.sectRank,
    sectRankLabel: input.sectRankLabel,
    avatarUrl: input.avatarUrl ?? resolveAvatarForFullbody(fallbackFullbody),
    portraitUrl: fallbackFullbody,
    stats: {
      hp: input.stats.hp,
      mp: input.stats.mp,
      agi: input.stats.agi,
      res: input.stats.res,
      isBenchmark: input.stats.isBenchmark ?? false,
    },
    talents: {
      bone: input.talents?.bone ?? 50,
      comprehension: input.talents?.comprehension ?? 50,
      charm: input.talents?.charm ?? 50,
    },
    tenArts: input.tenArts ? { ...input.tenArts } : undefined,
    fullLocationLabel: input.fullLocationLabel,
    equippedArts,
    learnedArts,
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      ...input.equipped,
    },
    isDynamicLiaoSpy: input.isDynamicLiaoSpy,
    isDynamicKaifengWarrant: input.isDynamicKaifengWarrant,
    kaifengWarrantKind: input.kaifengWarrantKind,
    dynamicQuestActorId: input.dynamicQuestActorId,
    questBadgeLabel: input.questBadgeLabel,
    talk: input.talk,
  }
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

  return makeQuestNpc({
    id: actor.actorId,
    name: actor.name,
    title: actor.title,
    realm: actor.realm,
    factionId: actor.factionId,
    factionName: actor.factionName,
    sectRank: actor.sectRank,
    sectRankLabel: actor.sectRankLabel,
    avatarUrl: actor.avatarUrl,
    portraitUrl: actor.portraitUrl,
    stats: { ...actor.stats },
    talents: actor.talents ? { ...actor.talents } : { bone: 50, comprehension: 50, charm: 50 },
    tenArts: actor.tenArts ? { ...actor.tenArts } : undefined,
    fullLocationLabel: fullLoc,
    equippedArts: actor.equippedArts ? { ...actor.equippedArts } : undefined,
    learnedArts: actor.learnedArts ? actor.learnedArts.map((x) => ({ ...x })) : undefined,
    equipped: actor.equipped ? { ...actor.equipped } : undefined,
    dynamicQuestActorId: actor.actorId,
    questBadgeLabel: actor.badgeLabel ?? '剧情人物',
    talk: actor.talk,
  })
}

export function buildNodeNpcFromCompiledRecord(
  rec: CompiledNpcRecord,
  options?: { talkOverride?: string; includeLoadout?: boolean },
): NodeNpc {
  const placeShort = rec.assignedSpotName
    ? `${rec.assignedBuildingName}·${rec.assignedSpotName}`
    : rec.assignedBuildingName
  const defaultSceneTalk = `“在下${rec.name}（${rec.title}），常驻${rec.locationLabel}【${placeShort}】，少侠若有暇不妨切磋论道。”`
  const includeLoadout = options?.includeLoadout ?? false

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
    portraitUrl: includeLoadout ? (rec.fullbodyUrl ?? rec.templateUrl) : undefined,
    stats: { ...rec.stats },
    talents: { ...rec.talents },
    tenArts: { ...rec.tenArts },
    fullLocationLabel: rec.fullLocationLabel,
    equippedArts: includeLoadout ? { ...rec.equippedArts } : undefined,
    learnedArts: includeLoadout ? rec.learnedArts.map((x) => ({ ...x })) : undefined,
    equipped: includeLoadout ? { ...rec.equipped } : undefined,
    talk: options?.talkOverride ?? defaultSceneTalk,
  }
}

export function buildNodeNpcFromCompiledId(npcId: string, talkOverride?: string): NodeNpc | null {
  const rec = NPC_DB_MAP[npcId]
  if (!rec) return null
  return buildNodeNpcFromCompiledRecord(rec, {
    talkOverride: talkOverride ?? `“在下${rec.factionName}${rec.name}，请赐教！”`,
    includeLoadout: true,
  })
}

export function npcFromDb(
  npcId: string,
  overrides?: string | Partial<NodeNpc>,
): NodeNpc | null {
  const talkOverride = typeof overrides === 'string' ? overrides : overrides?.talk
  const base = buildNodeNpcFromCompiledId(npcId, talkOverride)
  if (!base) return null
  if (overrides && typeof overrides === 'object') {
    return {
      ...base,
      ...overrides,
    }
  }
  return base
}

function buildRoamingFallbackStats(m: RoamingMaster): {
  stats: NpcCombatStats
  talents: NpcTalents
  tenArts: NpcTenArts
} {
  const isHeaven = m.realm.includes('天阶')
  return {
    stats: isHeaven
      ? { hp: 7200, mp: 6800, agi: 84, res: 76, isBenchmark: true }
      : { hp: 4600, mp: 4200, agi: 76, res: 66, isBenchmark: true },
    talents: isHeaven
      ? { bone: 86, comprehension: 88, charm: 74 }
      : { bone: 78, comprehension: 79, charm: 68 },
    tenArts: {
      骑术: 76,
      算术: 48,
      经义: m.sect.includes('寺') || m.sect.includes('少林') ? 82 : 54,
      策论: 52,
      诗词: 46,
      琴: 42,
      棋: 55,
      书: 48,
      画: 40,
      辩才: 64,
    },
  }
}

export function buildRoamingMasterNodeNpc(
  m: RoamingMaster,
  nodeName: string,
): { npc: NodeNpc; resolvedRecord: CompiledNpcRecord | null } | null {
  const resolved = resolveNpcByName(m.name) ?? resolveNpcByName(m.name.replace(/大师$/, ''))
  const fb = buildRoamingFallbackStats(m)
  return {
    resolvedRecord: resolved ?? null,
    npc: {
      id: resolved?.id,
      name: m.name,
      title: `${m.sect} · 游历暂驻`,
      realm: m.realm,
      avatarUrl: resolved?.avatarUrl ?? resolved?.templateAvatarUrl,
      factionId: resolved?.factionId,
      factionName: m.sect,
      sectRank: resolved?.sectRank,
      sectRankLabel: resolved?.sectRankLabel,
      stats: resolved?.stats ?? fb.stats,
      talents: resolved?.talents ?? fb.talents,
      tenArts: resolved?.tenArts ?? fb.tenArts,
      fullLocationLabel: resolved?.fullLocationLabel,
      talk: `“某近日游历至${nodeName}，暂歇于此，幸晤少侠，当浮一大白！”`,
    },
  }
}
