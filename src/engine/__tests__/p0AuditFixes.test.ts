import { describe, expect, it } from 'vitest'
import { NPC_DB_MAP } from '../../data/gameDb'
import { DEFAULT_EQUIPPED_SLOTS, ITEM_DB_MAP } from '../../data/itemsDb'
import { QUEST_REGISTRY } from '../../data/quests'
import { buildMurongBoFinalNpc } from '../../data/quests/sects/jinjunFinal3Quest'
import { useGameStore } from '../../store/useGameStore'
import {
  buildNpcCombatant,
  buildPlayerCombatant,
  computeDodgeChancePreview,
  createCombatSession,
  resolveCombatRound,
} from '../combat'
import { computeCelunBonusAmount } from '../economy'
import { computeEquipmentTotals } from '../equipment/equipmentStats'
import { bindSceneTrigger } from '../quest/dsl'
import { buildQuestDependencyGraph, selectSectQuests } from '../quest/questGraphBuilder'
import { evaluateQuestCondition, interpolateStoryText } from '../questEngine'
import { isNpcAbsentFromWorld } from '../social/npcDeath'
import {
  buildJoinSectPatch,
  clonePlayerSectState,
  getSectMonthlyStipend,
  spawnAnnualLiaoSpy,
} from '../sect'
import { applyConsumableStatEffects } from '../stats/elixirEffects'
import {
  cloneHeroBaseStats,
  deriveNpcEffectiveStats,
  HERO_BASE_CAPS,
} from '../stats/heroStats'
import { tickScriptureSession } from '../time/cultivationTicks'
import { validateSaveEnvelope } from '../../utils/saveManager'

function makeHighAgiPlayer(qinggong: string | null) {
  return buildPlayerCombatant({
    playerName: '轻功试炼侠',
    hp: 3000,
    mp: 3000,
    baseStats: { ...cloneHeroBaseStats(), agility: 160 },
    equipped: { ...DEFAULT_EQUIPPED_SLOTS },
    equippedArts: {
      neigong: 'MA-179',
      qinggong,
      move1: 'MA-182',
      move2: 'MA-187',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-179', level: 10, exp: 0 },
      ...(qinggong ? [{ artId: qinggong, level: 10, exp: 0 }] : []),
      { artId: 'MA-182', level: 10, exp: 0 },
      { artId: 'MA-187', level: 10, exp: 0 },
    ],
  })
}

describe('P0 audit fixes regression suite', () => {
  it('aligns catalogued NPC combat stats with deriveNpcEffectiveStats while honoring explicit quest overrides', () => {
    const qiaoFeng = NPC_DB_MAP['NPC-0110']!
    const expected = deriveNpcEffectiveStats(qiaoFeng)

    const standardCombatant = buildNpcCombatant({
      id: qiaoFeng.id,
      name: qiaoFeng.name,
      title: qiaoFeng.role,
      realm: qiaoFeng.realm,
      talk: '“请赐教！”',
      stats: { ...qiaoFeng.stats },
    })
    expect(standardCombatant.maxHp).toBe(expected.maxHp)
    expect(standardCombatant.maxMp).toBe(expected.maxMp)
    expect(standardCombatant.agility).toBe(expected.agility)
    expect(standardCombatant.res).toBe(expected.res)

    const overriddenCombatant = buildNpcCombatant({
      id: qiaoFeng.id,
      name: qiaoFeng.name,
      title: qiaoFeng.role,
      realm: qiaoFeng.realm,
      talk: '“压制功力试招！”',
      stats: { hp: 2500, mp: 2000, agi: 60, res: 50, isBenchmark: false },
    })
    expect(overriddenCombatant.maxHp).toBe(2500)
    expect(overriddenCombatant.maxMp).toBe(2000)
    expect(overriddenCombatant.agility).toBe(60)
    expect(overriddenCombatant.res).toBe(50)
  })

  it('gives Jinjun finale Murong Bo Douzhuan Xingyi (MA-008) and Babu Ganchan (MA-097) with peak stats', () => {
    const baseMurongBo = NPC_DB_MAP['NPC-0104']!
    const peak = buildMurongBoFinalNpc()
    expect(peak.equippedArts?.neigong).toBe('MA-008')
    expect(peak.equippedArts?.qinggong).toBe('MA-097')
    expect(peak.stats?.hp).toBeGreaterThan(baseMurongBo.stats.hp)
    expect(peak.stats?.mp).toBeGreaterThan(baseMurongBo.stats.mp)
  })

  it('makes Heaven-tier qinggong dodge additive above base 35% cap without exceeding 55%/65%', () => {
    const slowAttacker = makeHighAgiPlayer(null)
    slowAttacker.agility = 30

    const baseDef = makeHighAgiPlayer(null)
    expect(computeDodgeChancePreview(baseDef, slowAttacker, false)).toBe(0.35)

    const shenxingDef = makeHighAgiPlayer('MA-022')
    expect(computeDodgeChancePreview(shenxingDef, slowAttacker, false)).toBeCloseTo(0.47, 5)

    const lingboDef = makeHighAgiPlayer('MA-010')
    expect(computeDodgeChancePreview(lingboDef, slowAttacker, false)).toBeCloseTo(0.55, 5)
    expect(computeDodgeChancePreview(lingboDef, slowAttacker, true)).toBeCloseTo(0.65, 5)
  })

  it('does not inflict exposed debuff on attacker when a defending target fully dodges', () => {
    const player = makeHighAgiPlayer('MA-010')
    const session = createCombatSession({
      mode: 'spar',
      player,
      npcNode: {
        id: 'TEST-DODGE-EXPOSED',
        name: '迟缓木人',
        title: '试招木人',
        realm: '三流下品',
        talk: '“接招！”',
        stats: { hp: 2000, mp: 500, agi: 10, res: 10, isBenchmark: false },
        equippedArts: {
          neigong: null,
          qinggong: null,
          move1: 'MA-182',
          move2: null,
          move3: null,
          move4: null,
        },
        learnedArts: [{ artId: 'MA-182', level: 1, exp: 0 }],
      },
    })
    // First few rng calls let AI choose 'move' (>= 0.12), then 0.0 ensures defending player dodges
    let callIdx = 0
    const rng = () => {
      callIdx += 1
      return callIdx <= 3 ? 0.5 : 0.0
    }
    const next = resolveCombatRound(structuredClone(session), { type: 'defend' }, rng)
    const dodged = next.logs.some((l) => l.tone === 'dodge' && l.text.includes(player.name))
    expect(dodged).toBe(true)
    expect(next.npc.exposed).toBe(false)
  })

  it('blocks locked spot tg_sg_cave in NPC navigation, quest locate, and save sanitization', () => {
    // Move hero to tongguan where tg_siguoya / tg_sg_cave resides
    useGameStore.setState({
      currentNodeId: 'tongguan',
      activeRegionId: 'tongguan',
      campPos: null,
      traveling: null,
      viewMode: 'region',
      selectedSpotId: null,
      actionFeedback: null,
      questState: {
        ...useGameStore.getState().questState,
        flags: {},
      },
    })

    // NPC-0375 梁离 is stationed inside tg_sg_cave
    const npcInCave = NPC_DB_MAP['NPC-0375']!
    expect(npcInCave.assignedSpotId).toBe('tg_sg_cave')

    useGameStore.getState().navigateToNpcLeafInCurrentRegion('NPC-0375')
    expect(useGameStore.getState().selectedSpotId).toBeNull()
    expect(useGameStore.getState().actionFeedback?.tone).toBe('warn')

    useGameStore.getState().locateQuestTargetOnMap({
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_cave',
    })
    expect(useGameStore.getState().selectedSpotId).toBeNull()
    expect(useGameStore.getState().actionFeedback?.tone).toBe('warn')

    // pendingSceneLoad guard must block re-entrant location triggers
    useGameStore.setState({
      pendingSceneLoad: { sceneId: 'test_scene', questId: 'TEST', token: 999 },
    })
    const blocked = useGameStore.getState().fireLocationTriggersForCurrentSpot({
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: null,
    })
    expect(blocked).toBe(false)
    useGameStore.setState({ pendingSceneLoad: null })

    // Save sanitization must also strip locked selectedSpotId
    const baseEnvelope = useGameStore.getState().buildSaveEnvelope('slot-1', '测试旧档')
    const rawEnvelope = {
      ...baseEnvelope,
      state: {
        ...baseEnvelope.state,
        viewMode: 'building' as const,
        activeRegionId: 'tongguan',
        activeBuildingInteriorId: 'tg_siguoya',
        selectedSpotId: 'tg_sg_cave',
      },
    }
    const validated = validateSaveEnvelope(rawEnvelope)
    expect(validated).not.toBeNull()
    expect(validated?.state.selectedSpotId).toBeNull()
  })
})

describe('P1 audit fixes regression suite', () => {
  it('includes adventure and main_story quests in QuestTreeTab and resolves ITM-MSC-020/021 map edges', () => {
    const noSect = selectSectQuests(QUEST_REGISTRY, null)
    expect(noSect.some((q) => q.category === 'adventure')).toBe(true)
    expect(noSect.some((q) => q.category === 'main_story')).toBe(true)
    expect(noSect.some((q) => q.category === 'sect_entry')).toBe(true)

    const jinjunQuests = selectSectQuests(QUEST_REGISTRY, 'SECT-33')
    expect(jinjunQuests.some((q) => q.category === 'adventure')).toBe(true)
    expect(jinjunQuests.some((q) => q.category === 'main_story')).toBe(true)
    const graph = buildQuestDependencyGraph(jinjunQuests)
    expect(graph.nodes.some((n) => n.questId === 'QST-ADV-YANZIWU-MAP')).toBe(true)
  })

  it('clears activeLiaoSpy on sect transfer (e.g. Changshan -> Wutai) and applies celunSkill stipend on scripture cross-month tick', () => {
    const baseState = useGameStore.getState()
    const csSect = {
      ...clonePlayerSectState(baseState.sectState),
      sectId: 'SECT-22',
      rank: 2 as const,
      rankLabel: '常山枪堂执事',
      activeLiaoSpy: spawnAnnualLiaoSpy(1, 30),
    }
    const joined = buildJoinSectPatch({
      sectId: 'SECT-21',
      allowOfficialTransfer: false,
      skipExclusivityCheck: true,
      dayCount: 40,
      silver: 100,
      inventory: baseState.inventory,
      sectState: csSect,
      questState: baseState.questState,
      celunSkill: 0,
    })
    expect(joined.ok).toBe(true)
    expect(joined.nextSectState.activeLiaoSpy).toBeNull()

    // Cross month boundary (day 30 -> day 31) during scripture session with 策论=80
    const baseWithCelun = cloneHeroBaseStats(baseState.baseStats)
    baseWithCelun.skills['策论'] = 80
    const sectForStipend = {
      ...clonePlayerSectState(baseState.sectState),
      sectId: 'SECT-33',
      rank: 2 as const,
      rankLabel: '禁军副都头',
      joinedDay: 1,
      lastStipendMonth: 0,
    }
    const snap = {
      ...baseState,
      dayCount: 30,
      shichenIdx: 11,
      silver: 100,
      baseStats: baseWithCelun,
      skills: { ...baseState.skills, 策论: 80 },
      currentNodeId: 'bianliang',
      birthplaceId: 'bianliang',
      sectState: sectForStipend,
    }
    const res = tickScriptureSession(
      snap,
      {
        kind: 'scripture',
        artId: 'scripture',
        artName: '抄经悟禅',
        artCleanName: '抄经悟禅',
        artFullTier: '佛道清修',
        mode: 1,
        venue: 'city_building',
        venueLabel: '藏经阁',
        multiplier: 1,
        startLevel: 1,
        startExp: 0,
        targetShichens: 2,
        shichensElapsed: 0,
        dailyGain: 10,
        dailySilverCost: 0,
        dailyFoodCost: 0,
        totalExpGained: 0,
        settledExpFloor: 0,
        silverSpent: 0,
        foodSpent: 0,
        combatExpSpent: 0,
      },
      1,
      () => 0.99,
    )
    const expectedStipend = computeCelunBonusAmount(getSectMonthlyStipend('SECT-33', 2), 80)
    expect(expectedStipend).toBeGreaterThan(getSectMonthlyStipend('SECT-33', 2))
    expect(res.patch.silver).toBe(100 + expectedStipend)
  })

  it('clears slowPct and weakPct on combat antidote use and applies full elixir/skillsGain effects with caps', () => {
    const antidote = Object.values(ITEM_DB_MAP).find((i) => i.useEffect?.curePoison)
    expect(antidote).toBeDefined()

    const player = makeHighAgiPlayer(null)
    player.slowTurns = 2
    player.slowPct = 35
    player.weakTurns = 2
    player.weakPct = 30
    player.poisonDotTurns = 2
    player.poisonDotDmg = 80
    const session = createCombatSession({
      mode: 'spar',
      player,
      npcNode: {
        id: 'TEST-ANTIDOTE-DUMMY',
        name: '守御木人',
        title: '木人',
        realm: '三流下品',
        talk: '“……”',
        stats: { hp: 2000, mp: 500, agi: 10, res: 10, isBenchmark: false },
      },
    })
    // Ensure NPC defends (rng < 0.12) so player's antidote cleanse isn't overwritten by enemy hit
    const next = resolveCombatRound(
      structuredClone(session),
      { type: 'item', itemId: antidote!.id },
      () => 0.01,
    )
    expect(next.player.slowTurns).toBe(0)
    expect(next.player.slowPct).toBe(0)
    expect(next.player.weakTurns).toBe(0)
    expect(next.player.weakPct).toBe(0)
    expect(next.player.poisonDotTurns).toBe(0)

    // Verify shared applyConsumableStatEffects handles skillsGain, riding, wuxing, and caps
    const base = cloneHeroBaseStats()
    base.ridingSkill = HERO_BASE_CAPS.ridingSkill - 2
    base.talents.悟性 = HERO_BASE_CAPS.talent - 1
    base.skills['算术'] = HERO_BASE_CAPS.civilSkill - 3
    const applied = applyConsumableStatEffects({
      itemDef: {
        id: 'TEST-ELIXIR',
        name: '天枢洗髓丹',
        category: 'medicine',
        subType: '灵丹',
        rarity: '天阶',
        stackable: true,
        value: 1000,
        desc: '测试灵丹',
        useEffect: {
          maxHp: 200,
          riding: 10,
          wuxing: 5,
          skillsGain: { 算术: 10, 经义: 5 },
          food: 2,
        },
      },
      baseStats: base,
      artExps: {},
      artMilestoneFlags: [],
      food: 3,
    })
    expect(applied.baseStats.maxHp).toBe(base.maxHp + 200)
    expect(applied.baseStats.ridingSkill).toBe(HERO_BASE_CAPS.ridingSkill)
    expect(applied.baseStats.talents.悟性).toBe(HERO_BASE_CAPS.talent)
    expect(applied.baseStats.skills['算术']).toBe(HERO_BASE_CAPS.civilSkill)
    expect(applied.baseStats.skills['经义']).toBe((base.skills['经义'] ?? 40) + 5)
    expect(applied.food).toBe(5)
  })

  it('Section 1: {ifFlagEq} interpolation macro, bindSceneTrigger DSL helper, and engine/equipment/equipmentStats work', () => {
    const baseCtx = {
      playerName: '沈砚',
      playerGender: '男' as const,
      dayCount: 1,
      questState: {
        activeQuests: {},
        completedQuests: {},
        flags: { origin_sect: 'changshan', cleared: true },
      },
    }
    expect(
      interpolateStoryText(
        '{ifFlagEq:origin_sect=changshan|常山枪派弟子|江湖散人}，{ifFlagEq:cleared=true|已破案|未破案}',
        baseCtx,
      ),
    ).toBe('常山枪派弟子，已破案')
    expect(
      interpolateStoryText(
        '{ifFlagEq:origin_sect=baji|八极传人|白衣客}',
        baseCtx,
      ),
    ).toBe('白衣客')

    const bound = bindSceneTrigger({
      id: 'trig_demo',
      questId: 'QST-DEMO',
      regionId: 'REG-01',
      buildingId: 'BLD-01-01',
      spotId: 'spot_1',
      npcId: 'NPC-0001',
      onceFlag: 'demo_seen',
      sceneId: 'scene_demo',
      actionLabel: '探查线索',
      condition: { type: 'questStatus', questId: 'QST-DEMO', status: 'active', stepId: 'step_1' },
    })
    expect(bound.locationTrigger.regionId).toBe('REG-01')
    expect(bound.locationTrigger.onceFlag).toBe('demo_seen')
    expect(bound.locationTrigger.effects).toEqual([
      { type: 'openScene', sceneId: 'scene_demo', questId: 'QST-DEMO' },
    ])
    expect(bound.spotAction?.label).toBe('探查线索')
    expect(bound.npcAction?.label).toBe('探查线索')
    expect(bound.npcAction?.visibleWhen.type).toBe('all')

    const totals = computeEquipmentTotals(DEFAULT_EQUIPPED_SLOTS)
    expect(totals.mountKey).toBe('MNT-001')
    expect(computeEquipmentTotals({ ...DEFAULT_EQUIPPED_SLOTS, mount: null }).mountKey).toBe('walk')
    expect(totals.attack).toBeGreaterThanOrEqual(0)
  })

  it('Section 3.1: filters all SECT-10/Yanziwu NPCs on raze, Qiao Feng after FINAL-3, and blocks Xingxiu/Daming after Yongzhou/Taihang-3', () => {
    const sect10Npcs = Object.values(NPC_DB_MAP).filter(
      (n) => n.factionId === 'SECT-10' || n.regionId === 'yanziwu',
    )
    expect(sect10Npcs.length).toBeGreaterThan(20)
    for (const npc of sect10Npcs) {
      expect(isNpcAbsentFromWorld(npc.id, [], { jj_mr3_yanziwu_razed: true })).toBe(true)
    }
    expect(isNpcAbsentFromWorld('NPC-0110', [], { jj_final3_xiaofeng_departed: true })).toBe(true)
    expect(isNpcAbsentFromWorld('NPC-0110', [], {})).toBe(false)

    const xingxiuQ = QUEST_REGISTRY.find((q) => q.id === 'QST-SECT-19-ENTRY')!
    const damingQ = QUEST_REGISTRY.find((q) => q.id === 'QST-CITY-DAMING-BAJI')!
    const baseState = useGameStore.getState()
    const cleanCtx = {
      dayCount: 10,
      shichenIdx: 2,
      silver: 100,
      food: 10,
      renown: 0,
      chivalry: 0,
      hp: 500,
      mp: 200,
      maxHp: 500,
      maxMp: 200,
      agility: 30,
      res: 20,
      baseStats: baseState.baseStats,
      equipped: baseState.equipped,
      equippedArts: baseState.equippedArts,
      learnedArts: baseState.learnedArts,
      inventory: [],
      sectState: clonePlayerSectState({ ...baseState.sectState, sectId: null }),
      questState: {
        activeQuests: {},
        completedQuests: {},
        flags: { shaolin_novice_state: 'none' },
        dynamicActors: [],
      },
      npcFavor: {},
      deadNpcIds: [] as string[],
    }

    const xingxiuCond = xingxiuQ.startCondition!
    const damingCond = damingQ.startCondition!
    expect(xingxiuCond).toBeDefined()
    expect(damingCond).toBeDefined()

    // Xingxiu blocked once Yongzhou Nanman is active or completed
    expect(
      evaluateQuestCondition(xingxiuCond, {
        ...cleanCtx,
        questState: {
          ...cleanCtx.questState,
          activeQuests: {
            'QST-SECT-33-YONGZHOU-NANMAN': {
              questId: 'QST-SECT-33-YONGZHOU-NANMAN',
              stepId: 'step_1',
              startedDay: 1,
              deadlineDay: null,
              vars: {},
            },
          },
        },
      }).passed,
    ).toBe(false)
    expect(
      evaluateQuestCondition(xingxiuCond, {
        ...cleanCtx,
        deadNpcIds: ['NPC-0181'],
      }).passed,
    ).toBe(false)

    // Daming Baji blocked once Taihang Campaign 3 is completed or Shi Wanshan dead
    expect(evaluateQuestCondition(damingCond, cleanCtx).passed).toBe(true)
    expect(
      evaluateQuestCondition(damingCond, {
        ...cleanCtx,
        questState: {
          ...cleanCtx.questState,
          completedQuests: {
            'QST-SECT-33-TAIHANG-CAMPAIGN-3': {
              questId: 'QST-SECT-33-TAIHANG-CAMPAIGN-3',
              completedDay: 5,
              outcome: 'success' as const,
              count: 1,
            },
          },
        },
      }).passed,
    ).toBe(false)
    expect(
      evaluateQuestCondition(damingCond, {
        ...cleanCtx,
        deadNpcIds: ['NPC-0229'],
      }).passed,
    ).toBe(false)
  })

  it('Canonical NPC-1053 Duan Yanqing: WPN-101 + MA-247 + empty bow/mount derives 宗师中品 stats naturally', () => {
    const duan = NPC_DB_MAP['NPC-1053']
    expect(duan).toBeDefined()
    expect(duan.name).toBe('段延庆')
    expect(duan.factionId).toBe('SECT-20')
    expect(duan.realm).toBe('宗师中品')
    expect(duan.equipped.weapon).toBe('WPN-101')
    expect(duan.equipped.bow).toBeNull()
    expect(duan.equipped.mount).toBeNull()
    expect(duan.equippedArts.neigong).toBe('MA-060')
    expect(duan.equippedArts.qinggong).toBe('MA-077')
    expect(duan.equippedArts.move1).toBe('MA-023')
    expect(duan.equippedArts.move2).toBe('MA-247')

    const combatant = buildNpcCombatant({
      id: 'NPC-1053',
      name: '段延庆',
      title: '恶贯满盈 · 西夏一品堂首席恶客',
      realm: '宗师中品',
      talk: '',
    })
    expect(combatant.maxHp).toBe(5685)
    expect(combatant.maxMp).toBe(5625)
    expect(combatant.agility).toBe(65)
    expect(combatant.res).toBe(73)
    expect(combatant.equipAttack).toBe(164)
    expect(combatant.synergyBonusBySlot.move1).toBeGreaterThan(0)
    expect(combatant.synergyBonusBySlot.move2).toBeGreaterThan(0)
  })
})

