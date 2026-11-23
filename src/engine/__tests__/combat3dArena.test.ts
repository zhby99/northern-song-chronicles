import { describe, expect, it } from 'vitest'
import { NPC_DB_MAP } from '../../data/gameDb'
import { createCombatSession } from '../combat'
import { buildNpcCombatant, buildPlayerCombatant } from '../combat/combatants'
import {
  ArenaInputController,
  computeArenaStats,
  createArenaSimState,
  stepArenaSimulation,
  type ArenaInputFrame,
} from '../combat3d'
import type { EquippedArtsMap, EquippedSlotsMap, HeroBaseStats, NodeNpc } from '../../types/game'

function makeBaseStats(talents: { 根骨: number; 悟性: number; 颜值: number }): HeroBaseStats {
  return {
    talents,
    maxHp: 300,
    maxMp: 160,
    agility: 65,
    res: 40,
    ridingSkill: 20,
    skills: {},
  }
}

const EMPTY_EQUIPPED: EquippedSlotsMap = {
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

const EMPTY_ARTS: EquippedArtsMap = {
  move1: null,
  move2: null,
  move3: null,
  move4: null,
  neigong: null,
  qinggong: null,
}

const SAMPLE_NPC: NodeNpc = {
  id: 'NPC-0035',
  name: '测试武师',
  title: '禁军教头',
  realm: '二流高手',
  factionName: '大宋禁军',
  talk: '请赐教。',
}

function emptyInput(overrides: Partial<ArenaInputFrame> = {}): ArenaInputFrame {
  return {
    moveX: 0,
    moveZ: 0,
    aimX: 0,
    aimZ: 0,
    hasAimPoint: false,
    attackPressed: false,
    dodgePressed: false,
    guardHeld: false,
    guardJustPressed: false,
    skillPressed: null,
    escapeHeld: false,
    ...overrides,
  }
}

describe('3D 演武场战斗内核 (combat3d)', () => {
  it('四维实战属性驱动动作手感，先天三维绝不代入战中公式', () => {
    const lowTalents = buildPlayerCombatant({
      playerName: '甲',
      playerPortraitId: 'hero-male-1',
      hp: 300,
      mp: 160,
      baseStats: makeBaseStats({ 根骨: 10, 悟性: 10, 颜值: 10 }),
      equipped: EMPTY_EQUIPPED,
      equippedArts: EMPTY_ARTS,
      learnedArts: [],
    })
    const maxTalents = buildPlayerCombatant({
      playerName: '乙',
      playerPortraitId: 'hero-male-1',
      hp: 300,
      mp: 160,
      baseStats: makeBaseStats({ 根骨: 100, 悟性: 100, 颜值: 100 }),
      equipped: EMPTY_EQUIPPED,
      equippedArts: EMPTY_ARTS,
      learnedArts: [],
    })

    const s1 = computeArenaStats(lowTalents)
    const s2 = computeArenaStats(maxTalents)
    expect(s1.moveSpeed).toBe(s2.moveSpeed)
    expect(s1.baseAttackDamage).toBe(s2.baseAttackDamage)
    expect(s1.parryWindowSec).toBe(s2.parryWindowSec)
    expect(s1.maxPosture).toBe(s2.maxPosture)

    // 身法提升应加快移速与缩短闪避冷却
    const fastFighter = { ...lowTalents, agility: 120 }
    const sFast = computeArenaStats(fastFighter)
    expect(sFast.moveSpeed).toBeGreaterThan(s1.moveSpeed)
    expect(sFast.dodgeCooldownMax).toBeLessThan(s1.dodgeCooldownMax)
  })

  it('攻击吸附朝最近敌人滑步贴近且不会冲过头', () => {
    const player = buildPlayerCombatant({
      playerName: '少侠',
      playerPortraitId: 'hero-male-1',
      hp: 300,
      mp: 160,
      baseStats: makeBaseStats({ 根骨: 60, 悟性: 60, 颜值: 60 }),
      equipped: EMPTY_EQUIPPED,
      equippedArts: EMPTY_ARTS,
      learnedArts: [],
    })
    const session = createCombatSession({
      mode: 'spar',
      duelStakes: 'spar',
      player,
      npcNode: SAMPLE_NPC,
    })
    const sim = createArenaSimState(session, 'courtyard')
    const p = sim.actors.find((a) => a.isPlayer)!
    const e = sim.actors.find((a) => a.team === 'enemy')!
    p.x = 0
    p.z = 0
    e.x = 2.8
    e.z = 0

    stepArenaSimulation(sim, emptyInput({ attackPressed: true }), 1 / 60)
    for (let i = 0; i < 30; i += 1) {
      stepArenaSimulation(sim, emptyInput(), 1 / 60)
    }

    expect(p.x).toBeGreaterThan(0.5)
    expect(p.x).toBeLessThan(e.x)
  })

  it('闪避具有最高打断优先级，可立即取消出招前摇', () => {
    const player = buildPlayerCombatant({
      playerName: '少侠',
      playerPortraitId: 'hero-male-1',
      hp: 300,
      mp: 160,
      baseStats: makeBaseStats({ 根骨: 60, 悟性: 60, 颜值: 60 }),
      equipped: EMPTY_EQUIPPED,
      equippedArts: EMPTY_ARTS,
      learnedArts: [],
    })
    const session = createCombatSession({
      mode: 'spar',
      duelStakes: 'spar',
      player,
      npcNode: SAMPLE_NPC,
    })
    const sim = createArenaSimState(session, 'courtyard')
    const p = sim.actors.find((a) => a.isPlayer)!

    stepArenaSimulation(sim, emptyInput({ attackPressed: true }), 1 / 60)
    expect(p.actionState).toBe('windup')

    stepArenaSimulation(sim, emptyInput({ dodgePressed: true, moveX: -1 }), 1 / 60)
    expect(p.actionState).toBe('dodge')
    expect(p.invulnTimer).toBeGreaterThan(0.2)
  })

  it('0.24s 精准卸劲弹反触发破绽并开启 0.90s 破招处决', () => {
    const player = buildPlayerCombatant({
      playerName: '少侠',
      playerPortraitId: 'hero-male-1',
      hp: 400,
      mp: 160,
      baseStats: makeBaseStats({ 根骨: 60, 悟性: 60, 颜值: 60 }),
      equipped: EMPTY_EQUIPPED,
      equippedArts: EMPTY_ARTS,
      learnedArts: [],
    })
    const session = createCombatSession({
      mode: 'spar',
      duelStakes: 'spar',
      player,
      npcNode: SAMPLE_NPC,
    })
    const sim = createArenaSimState(session, 'courtyard')
    const p = sim.actors.find((a) => a.isPlayer)!
    const e = sim.actors.find((a) => a.team === 'enemy')!

    p.x = 0
    p.z = 0
    p.yaw = Math.PI / 2
    e.x = 1.6
    e.z = 0
    e.yaw = -Math.PI / 2

    // 模拟敌人即将落刀（处于 slash 阶段且即将命中）
    e.actionState = 'slash'
    e.actionTimer = 0.04
    e.actionDuration = 0.14
    e.activeAttack = {
      kind: 'light',
      name: '劈砍',
      vfxCategory: 'blade',
      shape: 'arc',
      damage: 45,
      postureDamage: 20,
      knockback: 1,
      reach: 2.5,
      arcHalfAngle: 1.2,
      unblockable: false,
      isHeavenTier: false,
      hitApplied: false,
      magnetStartX: e.x,
      magnetStartZ: e.z,
      magnetTargetX: e.x,
      magnetTargetZ: e.z,
    }

    // 主角在命中前瞬间按下格挡
    stepArenaSimulation(sim, emptyInput({ guardHeld: true, guardJustPressed: true }), 1 / 60)
    stepArenaSimulation(sim, emptyInput({ guardHeld: true }), 1 / 60)
    stepArenaSimulation(sim, emptyInput({ guardHeld: true }), 1 / 60)

    expect(sim.parryCount).toBe(1)
    expect(e.actionState).toBe('stagger')
    expect(e.exposedTimer).toBeGreaterThan(1.0)
    expect(p.counterWindowTimer).toBeGreaterThan(0.5)

    // 在处决窗内按攻击键触发破招处决（顿帧期间输入缓冲会在顿帧结束瞬间自动接出）
    stepArenaSimulation(sim, emptyInput({ attackPressed: true }), 1 / 60)
    for (let i = 0; i < 10; i += 1) {
      if (p.actionState === 'execute') break
      stepArenaSimulation(sim, emptyInput(), 1 / 60)
    }
    expect(p.actionState).toBe('execute')
    expect(sim.executeCount).toBe(1)
  })

  it('挥刃可斩落飞行中的敌方暗器弹幕', () => {
    const player = buildPlayerCombatant({
      playerName: '少侠',
      playerPortraitId: 'hero-male-1',
      hp: 300,
      mp: 160,
      baseStats: makeBaseStats({ 根骨: 60, 悟性: 60, 颜值: 60 }),
      equipped: EMPTY_EQUIPPED,
      equippedArts: EMPTY_ARTS,
      learnedArts: [],
    })
    const session = createCombatSession({
      mode: 'spar',
      duelStakes: 'spar',
      player,
      npcNode: SAMPLE_NPC,
    })
    const sim = createArenaSimState(session, 'courtyard')
    const p = sim.actors.find((a) => a.isPlayer)!
    const e = sim.actors.find((a) => a.team === 'enemy')!
    p.x = 0
    p.z = 0
    p.yaw = Math.PI / 2

    sim.projectiles.push({
      id: 'proj-test',
      ownerId: e.unitId,
      team: 'enemy',
      x: 1.5,
      y: 1.1,
      z: 0,
      vx: -4,
      vz: 0,
      radius: 0.4,
      damage: 25,
      postureDamage: 10,
      vfxCategory: 'hidden',
      life: 0,
      maxLife: 2,
      destructible: true,
    })

    stepArenaSimulation(sim, emptyInput({ attackPressed: true }), 1 / 60)
    for (let i = 0; i < 20; i += 1) {
      stepArenaSimulation(sim, emptyInput(), 1 / 60)
    }

    expect(sim.projectiles.length).toBe(0)
  })

  it('输入控制器支持反方向键互斥与 Shift 保留', () => {
    const ctrl = new ArenaInputController()
    ctrl.keys.add('KeyA')
    ctrl.keys.add('ShiftLeft')
    // 模拟按下反方向 KeyD 会顶掉 KeyA，且不会误杀 ShiftLeft
    const frame = ctrl.sampleFrame()
    expect(frame.moveX).toBe(-1)
    ctrl.keys.delete('KeyA')
    ctrl.keys.add('KeyD')
    expect(ctrl.sampleFrame().moveX).toBe(1)
    expect(ctrl.keys.has('ShiftLeft')).toBe(true)
  })

  it('慕容博 vs 萧远山宗师对决构建与连按 Space 闪避不会结束战斗', () => {
    const murong = NPC_DB_MAP['NPC-0104']!
    const xiao = NPC_DB_MAP['NPC-0105']!
    const pCombatant = {
      ...buildNpcCombatant(
        {
          id: murong.id,
          name: murong.name,
          title: murong.title,
          realm: murong.realm,
          factionId: murong.factionId,
          factionName: murong.factionName,
          talk: '以彼之道，还施彼身！',
        },
        { unitId: 'ally-0', team: 'ally' },
      ),
      isPlayer: true,
    }
    const session = createCombatSession({
      mode: 'spar',
      duelStakes: 'spar',
      player: pCombatant,
      npcNode: {
        id: xiao.id,
        name: xiao.name,
        title: xiao.title,
        realm: xiao.realm,
        factionId: xiao.factionId,
        factionName: xiao.factionName,
        talk: '今日分个高下！',
      },
    })
    const sim = createArenaSimState(session, 'courtyard')
    const p = sim.actors.find((a) => a.isPlayer)!
    const e = sim.actors.find((a) => a.team === 'enemy')!
    expect(p.name).toBe('慕容博')
    expect(p.npcId).toBe('NPC-0104')
    expect(e.name).toBe('萧远山')
    expect(p.skills.length).toBeGreaterThanOrEqual(3)

    // 连续多次按 Space 闪避，战斗必须保持 ongoing
    for (let i = 0; i < 15; i += 1) {
      stepArenaSimulation(sim, emptyInput({ dodgePressed: i % 5 === 0, moveX: 1 }), 1 / 60)
    }
    expect(sim.outcome).toBe('ongoing')
  })
})
