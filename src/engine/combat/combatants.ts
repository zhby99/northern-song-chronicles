import { NPC_DB_MAP, resolveNpcByName } from '../../data/gameDb'
import { computeEquipmentTotals, computeWeaponArtSynergy } from '../equipment/equipmentStats'
import { computeEquippedArtsTotals } from '../../data/playerMartialArts'
import { getProtagonistPortrait } from '../../data/protagonistPresets'
import type {
  CompiledNpcRecord,
  EquippedArtsMap,
  EquippedSlotsMap,
  HeroBaseStats,
  LearnedArtEntry,
  NodeNpc,
} from '../../types/game'
import type { ActiveQuestCombatHook } from '../../types/quest'
import { deriveHeroEffectiveStats, deriveNpcEffectiveStats } from '../stats/heroStats'
import { inferTemplatePortrait } from '../../utils/portraitFallback'
import { estimateHeroRealm } from '../stats/realmUtils'
import type {
  CombatantState,
  CombatLogEntry,
  CombatSessionState,
  CombatTeam,
  DuelStakesKind,
  MoveSlotKey,
} from './types'

let sessionSeq = 0

function estimateHeroRealmLabel(maxHp: number, maxMp: number): string {
  return estimateHeroRealm(maxHp, maxMp).label
}

export function cloneCombatant(c: CombatantState): CombatantState {
  return {
    ...c,
    equipped: { ...c.equipped },
    equippedArts: { ...c.equippedArts },
    learnedArts: c.learnedArts.map((e) => ({ ...e })),
    synergyBonusBySlot: { ...c.synergyBonusBySlot },
    usedArtIdsHistory: [...c.usedArtIdsHistory],
  }
}

export function buildPlayerCombatant(params: {
  playerName?: string
  playerPortraitId?: string
  hp: number
  mp: number
  baseStats: HeroBaseStats
  equipped: EquippedSlotsMap
  equippedArts: EquippedArtsMap
  learnedArts: LearnedArtEntry[]
  heavyInjury?: boolean
  hsSwordEssence?: boolean
  hsPoyueGuijian?: boolean
  heroTitleOverride?: string
}): CombatantState {
  const eff = deriveHeroEffectiveStats(
    params.baseStats,
    params.equipped,
    params.equippedArts,
    params.learnedArts,
    { heavyInjury: Boolean(params.heavyInjury) },
  )
  const equipTotals = computeEquipmentTotals(params.equipped)
  const artTotals = computeEquippedArtsTotals(params.equippedArts, params.learnedArts)
  const syn = computeWeaponArtSynergy(
    params.equipped.weapon,
    params.equippedArts,
    params.learnedArts,
  )
  const synergyBonusBySlot: Partial<Record<MoveSlotKey, number>> = {}
  for (const m of syn.matches) {
    if (m.slot === 'move1' || m.slot === 'move2' || m.slot === 'move3' || m.slot === 'move4') {
      synergyBonusBySlot[m.slot] = m.pct
    }
  }

  const portrait = getProtagonistPortrait(params.playerPortraitId)

  return {
    unitId: 'ally-0',
    team: 'ally',
    id: 'HERO',
    name: params.playerName?.trim() || '少侠',
    title: params.heroTitleOverride || '江湖行者',
    realm: estimateHeroRealmLabel(eff.maxHp, eff.maxMp),
    factionName: '自在游侠',
    portraitUrl: portrait.fullbodyUrl,
    isPlayer: true,
    hsSwordEssence: Boolean(params.hsSwordEssence),
    hsPoyueGuijian: Boolean(params.hsPoyueGuijian),

    hp: Math.max(1, Math.min(eff.maxHp, params.hp)),
    maxHp: eff.maxHp,
    mp: Math.max(0, Math.min(eff.maxMp, params.mp)),
    maxMp: eff.maxMp,
    agility: eff.agility,
    res: eff.res,
    equipAttack: equipTotals.attack,
    equipDefense: equipTotals.defense + artTotals.defense,
    qinSkill: eff.skills['琴'] ?? 0,
    shuSkill: eff.skills['书'] ?? 0,

    equipped: { ...params.equipped },
    equippedArts: { ...params.equippedArts },
    learnedArts: params.learnedArts.map((e) => ({ ...e })),
    synergyBonusBySlot,

    lastUsedArtId: null,
    itemUses: 0,
    stunnedNextRound: false,
    disarmedNextRound: false,
    exposed: false,
    consecutiveMoveRounds: 0,
    poisonDotTurns: 0,
    poisonDotDmg: 0,
    slowTurns: 0,
    slowPct: 0,
    weakTurns: 0,
    weakPct: 0,
    zixiaStacks: 0,
    zhemeishouStacks: 0,
    usedArtIdsHistory: [],
  }
}

export function buildNpcCombatant(
  npcNode: NodeNpc,
  options?: { unitId?: string; team?: CombatTeam },
): CombatantState {
  const unitId = options?.unitId ?? 'enemy-0'
  const team: CombatTeam = options?.team ?? 'enemy'

  const dbRecord: CompiledNpcRecord | null | undefined =
    (npcNode.id ? NPC_DB_MAP[npcNode.id] : undefined) ??
    resolveNpcByName(npcNode.name) ??
    resolveNpcByName(npcNode.name.replace(/大师$/, ''))

  if (dbRecord) {
    const dbEff = deriveNpcEffectiveStats(dbRecord)
    const mergedEquipped: EquippedSlotsMap = npcNode.equipped
      ? { ...dbRecord.equipped, ...npcNode.equipped }
      : { ...dbRecord.equipped }
    const mergedEquippedArts: EquippedArtsMap = npcNode.equippedArts
      ? { ...npcNode.equippedArts }
      : { ...dbRecord.equippedArts }
    const mergedLearnedArts: LearnedArtEntry[] = npcNode.learnedArts
      ? npcNode.learnedArts.map((e) => ({ ...e }))
      : dbRecord.learnedArts.map((e) => ({ ...e }))

    const syn = computeWeaponArtSynergy(
      mergedEquipped.weapon,
      mergedEquippedArts,
      mergedLearnedArts,
    )
    const synergyBonusBySlot: Partial<Record<MoveSlotKey, number>> = {}
    for (const m of syn.matches) {
      if (m.slot === 'move1' || m.slot === 'move2' || m.slot === 'move3' || m.slot === 'move4') {
        synergyBonusBySlot[m.slot] = m.pct
      }
    }

    const eqTotals = computeEquipmentTotals(mergedEquipped)
    const artTotals = computeEquippedArtsTotals(mergedEquippedArts, mergedLearnedArts)
    const hasCustomLoadout = Boolean(
      npcNode.equipped || npcNode.equippedArts || npcNode.learnedArts,
    )

    const hasExplicitStatsOverride = Boolean(
      npcNode.stats &&
        (npcNode.stats.hp !== dbRecord.stats.hp ||
          npcNode.stats.mp !== dbRecord.stats.mp ||
          npcNode.stats.agi !== dbRecord.stats.agi ||
          npcNode.stats.res !== dbRecord.stats.res),
    )

    const finalMaxHp = hasExplicitStatsOverride ? (npcNode.stats?.hp ?? dbEff.maxHp) : dbEff.maxHp
    const finalMaxMp = hasExplicitStatsOverride ? (npcNode.stats?.mp ?? dbEff.maxMp) : dbEff.maxMp
    const finalAgi = hasExplicitStatsOverride ? (npcNode.stats?.agi ?? dbEff.agility) : dbEff.agility
    const finalRes = hasExplicitStatsOverride ? (npcNode.stats?.res ?? dbEff.res) : dbEff.res
    const finalEquipAttack = hasCustomLoadout
      ? eqTotals.attack || dbEff.equipAttack || 35
      : dbEff.equipAttack
    const finalEquipDefense = hasCustomLoadout
      ? eqTotals.defense + artTotals.defense || dbEff.totalDefense || 35
      : dbEff.totalDefense

    const resolvedName = npcNode.name || dbRecord.name
    const resolvedTitle = npcNode.title || dbRecord.role || '江湖名宿'
    const resolvedRealm = npcNode.realm || dbRecord.realm || '不入流'
    const resolvedFaction = npcNode.factionName || dbRecord.factionName || '江湖散人'

    return {
      unitId,
      team,
      id: npcNode.id || dbRecord.id,
      name: resolvedName,
      title: resolvedTitle,
      realm: resolvedRealm,
      factionId: npcNode.factionId || dbRecord.factionId || undefined,
      factionName: resolvedFaction,
      portraitUrl:
        npcNode.portraitUrl ||
        dbRecord.fullbodyUrl ||
        dbRecord.templateUrl ||
        inferTemplatePortrait({
          name: resolvedName,
          title: resolvedTitle,
          factionName: resolvedFaction,
        }),
      isPlayer: false,

      hp: finalMaxHp,
      maxHp: finalMaxHp,
      mp: finalMaxMp,
      maxMp: finalMaxMp,
      agility: finalAgi,
      res: finalRes,
      equipAttack: finalEquipAttack,
      equipDefense: finalEquipDefense,

      equipped: mergedEquipped,
      equippedArts: mergedEquippedArts,
      learnedArts: mergedLearnedArts,
      synergyBonusBySlot,

      lastUsedArtId: null,
      itemUses: 0,
      stunnedNextRound: false,
      disarmedNextRound: false,
      exposed: false,
      consecutiveMoveRounds: 0,
      poisonDotTurns: 0,
      poisonDotDmg: 0,
      slowTurns: 0,
      slowPct: 0,
      weakTurns: 0,
      weakPct: 0,
      zixiaStacks: 0,
      zhemeishouStacks: 0,
      usedArtIdsHistory: [],
    }
  }

  // 兜底非注册表临时人物（如燕云辽谍、任务自定义武僧/统领等）
  const customEquipped: EquippedSlotsMap = npcNode.equipped
    ? { ...npcNode.equipped }
    : {
        weapon: null,
        armor: null,
        shoes: null,
        bow: null,
        accessory1: null,
        accessory2: null,
        curio1: null,
        curio2: null,
        mount: null,
      }
  const customEquippedArts: EquippedArtsMap = npcNode.equippedArts
    ? { ...npcNode.equippedArts }
    : {
        neigong: 'MA-179',
        qinggong: null,
        move1: 'MA-182',
        move2: 'MA-187',
        move3: null,
        move4: null,
      }
  const customLearnedArts: LearnedArtEntry[] = npcNode.learnedArts
    ? npcNode.learnedArts.map((e) => ({ ...e }))
    : [
        { artId: 'MA-179', level: 4, exp: 0 },
        { artId: 'MA-182', level: 5, exp: 0 },
        { artId: 'MA-187', level: 5, exp: 0 },
      ]
  const syn = computeWeaponArtSynergy(customEquipped.weapon, customEquippedArts, customLearnedArts)
  const synergyBonusBySlot: Partial<Record<MoveSlotKey, number>> = {}
  for (const m of syn.matches) {
    if (m.slot === 'move1' || m.slot === 'move2' || m.slot === 'move3' || m.slot === 'move4') {
      synergyBonusBySlot[m.slot] = m.pct
    }
  }
  const eqTotals = computeEquipmentTotals(customEquipped)
  const artTotals = computeEquippedArtsTotals(customEquippedArts, customLearnedArts)
  const fallbackHp = npcNode.stats?.hp ?? 250 + artTotals.maxHp + eqTotals.maxHp
  const fallbackMp = npcNode.stats?.mp ?? 50 + artTotals.maxMp + eqTotals.maxMp
  const resolvedTitle = npcNode.title || '江湖武人'
  const resolvedFaction = npcNode.factionName || '江湖散人'

  return {
    unitId,
    team,
    id: npcNode.id ?? npcNode.name,
    name: npcNode.name,
    title: resolvedTitle,
    realm: npcNode.realm || '三流中品',
    factionId: npcNode.factionId || undefined,
    factionName: resolvedFaction,
    portraitUrl:
      npcNode.portraitUrl ||
      inferTemplatePortrait({
        name: npcNode.name,
        title: resolvedTitle,
        factionName: resolvedFaction,
      }),
    isPlayer: false,
    hp: fallbackHp,
    maxHp: fallbackHp,
    mp: fallbackMp,
    maxMp: fallbackMp,
    agility: npcNode.stats?.agi ?? 20 + artTotals.agility + eqTotals.agility,
    res: npcNode.stats?.res ?? 10 + artTotals.res + eqTotals.res,
    equipAttack: eqTotals.attack || 35,
    equipDefense: eqTotals.defense + artTotals.defense || 35,
    equipped: customEquipped,
    equippedArts: customEquippedArts,
    learnedArts: customLearnedArts,
    synergyBonusBySlot,
    lastUsedArtId: null,
    itemUses: 0,
    stunnedNextRound: false,
    disarmedNextRound: false,
    exposed: false,
    consecutiveMoveRounds: 0,
    poisonDotTurns: 0,
    poisonDotDmg: 0,
    slowTurns: 0,
    slowPct: 0,
    weakTurns: 0,
    weakPct: 0,
    zixiaStacks: 0,
    zhemeishouStacks: 0,
    usedArtIdsHistory: [],
  }
}

export function createCombatSession(params: {
  mode: 'spar' | 'duel'
  duelStakes?: DuelStakesKind
  maxRounds?: number
  surviveToWin?: boolean
  forbidEscapeReason?: string | null
  customIntroText?: string
  questCombatHook?: ActiveQuestCombatHook | null
  player: CombatantState
  npcNode: NodeNpc
  allyNpcNodes?: NodeNpc[]
  extraEnemyNpcNodes?: NodeNpc[]
}): CombatSessionState {
  sessionSeq += 1
  const playerUnit: CombatantState = {
    ...params.player,
    unitId: 'ally-0',
    team: 'ally',
  }
  const allyNodes = (params.allyNpcNodes ?? []).slice(0, 1)
  const enemyNodes = [params.npcNode, ...(params.extraEnemyNpcNodes ?? []).slice(0, 1)]

  const allyUnits = allyNodes.map((node, idx) =>
    buildNpcCombatant(node, { unitId: `ally-${idx + 1}`, team: 'ally' }),
  )
  const enemyUnits = enemyNodes.map((node, idx) =>
    buildNpcCombatant(node, { unitId: `enemy-${idx}`, team: 'enemy' }),
  )

  const allies = [playerUnit, ...allyUnits]
  const enemies = enemyUnits
  const npc = enemies[0]!

  const stakes: DuelStakesKind =
    params.duelStakes ?? (params.mode === 'spar' ? 'spar' : 'duel')
  const maxRounds = params.maxRounds ?? 30

  const enemyRosterLabel = enemies.map((e) => `${e.name}（${e.realm}）`).join('、')
  const allyRosterLabel = allies
    .map((a) => (a.isPlayer ? '少侠' : `${a.name}（${a.realm}）`))
    .join(' 与 ')

  const introText =
    params.customIntroText ??
    (allies.length > 1 || enemies.length > 1
      ? params.mode === 'duel'
        ? `【${allies.length}v${enemies.length} 战阵死斗】${allyRosterLabel} 迎战 ${enemyRosterLabel}！每回合全员各自锁定敌手同步盲选出招，既决胜负，亦分生死！`
        : `【${allies.length}v${enemies.length} 联手演武】${allyRosterLabel} 对阵 ${enemyRosterLabel}！每回合全员各自择敌拆招，点到为止——`
      : params.surviveToWin
        ? params.mode === 'duel'
          ? `【生死${maxRounds}合对决】${npc.name}（${npc.factionName} · ${npc.realm}）气机森严锁定四方！少侠须在手下撑满 ${maxRounds} 合不败方可破局——一旦失手落败，必命丧当场！`
          : `【师门考校试炼】${npc.name}（${npc.factionName} · ${npc.realm}）凝神立阵：“少侠若能在手下撑过 ${maxRounds} 合不败，便算过关！”`
        : stakes === 'zhan_zhao_arrest'
          ? `【开封府御前缉捕·生死状】御前四品带刀护卫 ${npc.name} 横剑拦路：“朝廷钦犯休走，随展某回开封府伏法！”（战败即押赴市曹处斩！）`
          : stakes === 'liao_spy_duel'
            ? `【燕云锄奸·生死对决】契丹密谍 ${npc.name} 寒刃出鞘：“常山枪派的宋狗竟敢追查至此，今日不死不休！”（生死相搏，败则横尸塞北！）`
            : stakes === 'kaifeng_warrant'
              ? `【开封府海捕缉凶·生死战】海捕悍匪 ${npc.name} 凶相毕露拔刃死斗：“官府鹰犬也敢来拿爷爷？今日叫你有来无回！”（生死相搏，败则血溅当场！）`
              : stakes === 'yamen_bounty'
                ? `【州府悬赏·缉凶擒拿】悬赏要犯 ${npc.name}（${npc.realm}）见行藏败露，拔刃困兽犹斗！（擒拿之战：失手只受重伤不致命，可养伤再寻）`
              : stakes === 'rob_official'
                ? `【绿林投名状·劫官死战】少侠蒙面拔刃拦住大宋命官 ${npc.name} 车驾！一旦失手必丧命当场——`
                : params.mode === 'duel'
                  ? `【江湖生死对决】少侠（${playerUnit.realm}）与 ${npc.name}（${npc.factionName} · ${npc.realm}）拔刃生死相向，既分高下，亦决生死！`
                  : `【皇祐武林交锋】少侠（${playerUnit.realm}）抱拳请益 ${npc.name}（${npc.factionName} · ${npc.realm}）！双方凝神屏息，同步盲选拆招——`)
  const intro: CombatLogEntry = {
    id: `cbt-s${sessionSeq}-r0`,
    round: 0,
    tone: 'system',
    text: introText,
  }
  return {
    sessionId: `session-${sessionSeq}`,
    mode: params.mode,
    duelStakes: stakes,
    round: 1,
    maxRounds,
    surviveToWin: params.surviveToWin,
    forbidEscapeReason: params.forbidEscapeReason ?? null,
    questCombatHook: params.questCombatHook ?? null,
    outcome: 'ongoing',
    player: playerUnit,
    npc,
    allies,
    enemies,
    targetNpcNode: params.npcNode,
    allyNpcNodes: allyNodes,
    enemyNpcNodes: enemyNodes,
    logs: [intro],
    lastRoundSummary: null,
    rewardsSummary: null,
  }
}
