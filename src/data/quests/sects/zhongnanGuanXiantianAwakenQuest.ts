import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q32_QUEST_ID = 'QST-SECT-11-32'

export const ZHONGNAN_Q32_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 4 },
    flag('zn_branch', 'eq', 'guguan'),
    {
      type: 'any',
      conditions: [
        qStatus('QST-SECT-11-30', 'completed'),
        qStatus('QST-SECT-11-31', 'completed'),
      ],
    },
    qStatus(ZHONGNAN_Q32_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-0130', npcName: '赫连霸先' },
  ],
}

export const zhongnanGuanXiantianAwakenQuest: QuestDefinition = {
  id: ZHONGNAN_Q32_QUEST_ID,
  title: '先天一炁 · 紫阳传衣',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '宗师下品 ～ 宗师中品',
  maxOpponentRealm: '宗师下品（铁鹞大将军 · 赫连霸先）',
  recommendedNote:
    '终南隐宗重阳古观天阶觉醒线（全二十八幕）。须达宗门四阶、身属古观一脉并完成道墓合流或决裂枢纽任务。于重阳玄门清修主殿承接紫阳真人王重楼亲赐的【紫阳先天八卦鹤氅】并参悟天阶镇派绝学【先天功】，破晓之际于天罡北斗七星演剑坛正面迎战西夏铁鹞大将军赫连霸先！',
  startHint:
    '位列终南隐宗四阶且完成道墓合流/决裂枢纽后，前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】面谒王重楼即可触发。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tao',
    spotId: 'zn_to_hall',
    customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
  },
  startCondition: ZHONGNAN_Q32_START_CONDITION,
  summary:
    '{reignYear}冬初，终南山大雪初霁。西夏一品堂铁鹞大将军【赫连霸先】亲率精锐夜逼终南前山，誓要踏平重阳古观。危急关头，紫阳真人【王重楼】于【重阳玄门清修主殿】亲手将随身珍宝【紫阳先天八卦鹤氅】披于你肩头，并引你入【道藏经阁与紫金丹院】闭关点化天阶无上内功【先天功】。破晓晨光中，你身披紫阳鹤氅独步【天罡北斗七星演剑坛】，以生生不息的先天一炁正面硬撼赫连霸先铁鹞重甲神威，一战震退西夏大将，彻底奠定古观真传之名！',
  initialStepId: 'enlighten_alchemy',
  steps: {
    enlighten_alchemy: {
      id: 'enlighten_alchemy',
      title: '丹院观炁 · 参悟先天',
      objective:
        '紫阳真人王重楼已将紫阳鹤氅与先天口诀托付予你。请速赴【终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院（zn_to_alchemy）】，趁黎明前贯通先天一炁！',
      nextHint:
        '前往【终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院（zn_to_alchemy）】，点击「入紫金丹院 · 运化先天一炁参悟天阶心法」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_alchemy',
        customLabel: '终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院',
      },
    },
    dawn_helian_duel: {
      id: 'dawn_helian_duel',
      title: '破晓演剑 · 正面迎敌',
      objective:
        '西夏铁鹞大将军赫连霸先已攻破前山牌坊，直逼【终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛（zn_to_dipper）】！速去以初成之先天功正面击退强敌！',
      nextHint:
        '前往【终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛（zn_to_dipper）】，点击「登七星演剑坛 · 以先天一炁正面迎战赫连霸先」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        customLabel: '终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛',
      },
    },
    return_hall_triumph: {
      id: 'return_hall_triumph',
      title: '紫阳传衣 · 功成复命',
      objective:
        '赫连霸先已败走下山！请返回【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】，向王重楼复命并正式承接紫阳衣钵与先天真传！',
      nextHint:
        '返回【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】，点击「拜谒紫阳真人 · 正式承接先天功与紫阳鹤氅」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq32_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'zn_q32_start_triggered',
      condition: ZHONGNAN_Q32_START_CONDITION,
      effects: [openScene('scene_znq32_01', ZHONGNAN_Q32_QUEST_ID)],
    },
    {
      id: 'trig_znq32_alchemy',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_alchemy',
      onceFlag: 'zn_q32_alchemy_triggered',
      condition: atStep(ZHONGNAN_Q32_QUEST_ID, 'enlighten_alchemy'),
      effects: [openScene('scene_znq32_08', ZHONGNAN_Q32_QUEST_ID)],
    },
    {
      id: 'trig_znq32_dipper',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_dipper',
      onceFlag: 'zn_q32_dipper_triggered',
      condition: atStep(ZHONGNAN_Q32_QUEST_ID, 'dawn_helian_duel'),
      effects: [openScene('scene_znq32_15', ZHONGNAN_Q32_QUEST_ID)],
    },
    {
      id: 'trig_znq32_return',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'zn_q32_return_triggered',
      condition: atStep(ZHONGNAN_Q32_QUEST_ID, 'return_hall_triumph'),
      effects: [openScene('scene_znq32_24', ZHONGNAN_Q32_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq32_start',
      label: '【先天一炁】面谒王重楼 · 承接紫阳传衣与先天秘诀',
      badge: '紫阳传衣',
      subtitle: '第一幕 · 铁鹞压境，紫阳真人亲赐八卦鹤氅授先天功',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: ZHONGNAN_Q32_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q32_start_triggered', value: true },
        openScene('scene_znq32_01', ZHONGNAN_Q32_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq32_alchemy',
      label: '【先天一炁】入紫金丹院 · 运化先天一炁参悟天阶心法',
      badge: '丹院悟道',
      subtitle: '第八幕 · 抱元守一，于道藏紫气中贯通天阶先天功',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_alchemy',
      visibleWhen: atStep(ZHONGNAN_Q32_QUEST_ID, 'enlighten_alchemy'),
      effects: [
        { type: 'setFlag', flag: 'zn_q32_alchemy_triggered', value: true },
        openScene('scene_znq32_08', ZHONGNAN_Q32_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq32_dipper',
      label: '【先天一炁】登七星演剑坛 · 以先天一炁正面迎战赫连霸先',
      badge: '破晓退敌',
      subtitle: '第十五幕 · 宗师级正面对决，迎战铁鹞大将军赫连霸先！',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_dipper',
      visibleWhen: atStep(ZHONGNAN_Q32_QUEST_ID, 'dawn_helian_duel'),
      effects: [
        { type: 'setFlag', flag: 'zn_q32_dipper_triggered', value: true },
        openScene('scene_znq32_15', ZHONGNAN_Q32_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq32_return',
      label: '【先天一炁】拜谒紫阳真人 · 正式承接先天功与紫阳鹤氅',
      badge: '先天大成',
      subtitle: '第二十四幕 · 凯旋复命，天阶内功与重阳宝衣正式入掌',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: atStep(ZHONGNAN_Q32_QUEST_ID, 'return_hall_triumph'),
      effects: [
        { type: 'setFlag', flag: 'zn_q32_return_triggered', value: true },
        openScene('scene_znq32_24', ZHONGNAN_Q32_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq32_wang_start',
      label: '叩请紫阳真人 · 承接《先天功》真传以御赫连霸先',
      badge: '先天一炁',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0133'] },
          ZHONGNAN_Q32_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q32_start_triggered', value: true },
        openScene('scene_znq32_01', ZHONGNAN_Q32_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanGuanXiantianAwakenQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q32_QUESTS: QuestDefinition[] = [zhongnanGuanXiantianAwakenQuest]
