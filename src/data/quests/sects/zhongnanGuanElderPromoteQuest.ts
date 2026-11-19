import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q24_QUEST_ID = 'QST-SECT-11-24'

export const ZHONGNAN_Q24_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-23', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q24_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-1054', npcName: '马钰玄' },
    { type: 'npcAlive', npcId: 'NPC-0216', npcName: '丘处玄' },
    { type: 'npcAlive', npcId: 'NPC-0152', npcName: '努儿海' },
  ],
}

export const ZHONGNAN_Q24_QUEST: QuestDefinition = {
  id: ZHONGNAN_Q24_QUEST_ID,
  title: '北斗封山 · 古观长老',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '一流上品（重阳古观 Lv.4 长老晋升大典）',
  maxOpponentRealm: '一流上品（西夏一品堂贺兰血鹰 · 努儿海 · 吐蕃密宗番僧）',
  recommendedNote:
    '二十六幕重阳古观护山晋升长卷：西夏一品堂大将「贺兰血鹰」努儿海纠合吐蕃密宗番僧大举犯山，企图一举踏平重阳古观！你星夜驰归【重阳古观前脉道院 · 天罡北斗七星演剑坛】，融汇洛阳先天易数与刺桐阴阳天道，临危执掌「天罡北斗阵」天枢位！先破吐蕃番僧金刚冲阵，再以北斗七星剑势重创努儿海，将外敌彻底逐出终南山门！战后，紫阳真人王重楼于【重阳玄门清修主殿】亲授青玉长老冠，册封你为终南隐宗 **Lv.4 古观长老**！',
  startHint:
    '完成《刺桐校经 · 万寿道藏》后，速返【终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛】（或寻王重楼、马钰玄、丘处玄）迎击犯山强敌！',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tao',
    spotId: 'zn_to_dipper',
    customLabel: '终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛',
  },
  startCondition: ZHONGNAN_Q24_START_CONDITION,
  summary:
    '{reignYear}岁末，西夏一品堂大将「贺兰血鹰」【努儿海】纠合吐蕃密宗番僧大举进犯终南前山，妄图趁古观精锐分散之际一举毁坛夺经。你自闽海星夜驰归【重阳古观前脉道院 · 天罡北斗七星演剑坛】，与丹阳子【马钰玄】、长春子【丘处玄】等诸位师兄联手结成改良后的先天「天罡北斗阵」，由你独掌天枢主位！先破吐蕃番僧狂猛冲阵，再于七星剑光中正面重创努儿海，迫得西夏与吐蕃联军狼狈败退。大捷之后，紫阳真人【王重楼】于【重阳玄门清修主殿】集结全观弟子，亲行大礼册封你为 **Lv.4 古观长老**！',
  initialStepId: 'defend_dipper_altar',
  steps: {
    defend_dipper_altar: {
      id: 'defend_dipper_altar',
      title: '北斗封山 · 血战血鹰',
      objective:
        '努儿海与吐蕃番僧已杀至【重阳古观前脉道院 · 天罡北斗七星演剑坛】！请执掌天枢位，连破吐蕃番僧与西夏贺兰血鹰努儿海！',
      nextHint: '前往【重阳古观前脉道院 · 天罡北斗七星演剑坛（zn_to_dipper）】点击「执掌天枢 · 北斗大阵破努儿海」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        customLabel: '终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛',
      },
    },
    elder_investiture: {
      id: 'elder_investiture',
      title: '玄门清修 · 册封长老',
      objective:
        '外敌尽溃，山门无恙！请前往【重阳古观前脉道院 · 重阳玄门清修主殿】，接受紫阳真人王重楼册封 Lv.4 古观长老！',
      nextHint: '前往【重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】点击「拜谒师尊 · 受封 Lv.4 古观长老」。',
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
      id: 'trig_znq24_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_dipper',
      onceFlag: 'znq24_intro_triggered',
      condition: ZHONGNAN_Q24_START_CONDITION,
      effects: [openScene('scene_znq24_01', ZHONGNAN_Q24_QUEST_ID)],
    },
    {
      id: 'trig_znq24_hall',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'znq24_hall_triggered',
      condition: atStep(ZHONGNAN_Q24_QUEST_ID, 'elder_investiture'),
      effects: [openScene('scene_znq24_19', ZHONGNAN_Q24_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq24_start',
      label: '执掌天罡北斗阵天枢位 · 迎击努儿海与吐蕃番僧',
      badge: '北斗封山',
      subtitle: '重阳古观前脉道院 · 天罡北斗七星演剑坛',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_dipper',
      visibleWhen: ZHONGNAN_Q24_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'znq24_intro_triggered', value: true },
        openScene('scene_znq24_01', ZHONGNAN_Q24_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq24_hall',
      label: '步入重阳玄门清修主殿 · 受封 Lv.4 古观长老',
      badge: '长老册封',
      subtitle: '重阳古观前脉道院 · 重阳玄门清修主殿',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: atStep(ZHONGNAN_Q24_QUEST_ID, 'elder_investiture'),
      effects: [
        { type: 'setFlag', flag: 'znq24_hall_triggered', value: true },
        openScene('scene_znq24_19', ZHONGNAN_Q24_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq24_npc_start',
      label: '驰援重阳古观 · 执掌天罡北斗阵御敌',
      badge: '北斗封山',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0133', 'NPC-1054', 'NPC-0216'] },
          ZHONGNAN_Q24_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'znq24_intro_triggered', value: true },
        openScene('scene_znq24_01', ZHONGNAN_Q24_QUEST_ID),
      ],
    },
  ],

  loadScenes: () => import('./zhongnanGuanElderPromoteQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q24_QUESTS: QuestDefinition[] = [ZHONGNAN_Q24_QUEST]
