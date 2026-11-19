import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q33_QUEST_ID = 'QST-SECT-11-33'

export const ZHONGNAN_Q33_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-32', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q33_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-1053', npcName: '段延庆' },
    { type: 'npcAlive', npcId: 'NPC-0184', npcName: '萧远风' },
    { type: 'npcAlive', npcId: 'NPC-0216', npcName: '丘处玄' },
  ],
}

export const zhongnanGuanSevenStarSwordQuest: QuestDefinition = {
  id: ZHONGNAN_Q33_QUEST_ID,
  title: '天罡神剑 · 横绝塞北',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '宗师下品 ～ 宗师中品',
  maxOpponentRealm: '宗师中品（恶贯满盈 · 段延庆 / 燕云铁枪 · 萧远风）',
  recommendedNote:
    '终南隐宗重阳古观神剑出关线（全三十幕）。须完成《QST-SECT-11-32》且身属古观一脉。王重楼亲授镇山神剑【重阳天罡七星剑】，命你统率全真七子出关御敌——先于潼关天险瓮城破辽将萧远风，再驰援延安鄜延边军大营列天罡北斗剑阵大破恶贯满盈段延庆（若前序道墓合流，冷清秋更将率古墓奇兵万里助阵）！',
  startHint:
    '完成《QST-SECT-11-32》后，前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】面谒王重楼即可触发。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tao',
    spotId: 'zn_to_hall',
    customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
  },
  startCondition: ZHONGNAN_Q33_START_CONDITION,
  summary:
    '{reignYear}寒冬，辽夏两国暗通款曲，燕云铁枪【萧远风】突袭潼关天险，西夏一品堂首席客卿【段延庆】则趁雪夜围攻延安边军西营。危急之际，紫阳真人【王重楼】于【重阳玄门清修主殿】亲授镇山神兵【重阳天罡七星剑】，托付你统率丘处玄等全真七子出关靖边！你先于【潼关镇河主城楼与瓮城】挑落萧远风燕云铁枪，再星夜驰援【延安鄜延边军大营】，挥剑布下天罡北斗七星剑阵正面破去段延庆的一阳指铁杖神功，剑气横绝塞北！',
  initialStepId: 'tongguan_clash',
  steps: {
    tongguan_clash: {
      id: 'tongguan_clash',
      title: '潼关雪夜 · 截击铁枪',
      objective:
        '紫阳真人已将重阳天罡七星剑与出关令箭交予你手。请即刻率全真七子驰赴【潼关 / 西岳华山 · 潼关天险瓮城 · 潼关镇河主城楼与瓮城（tg_ft_barbican）】，拦截辽国燕云铁枪萧远风！',
      nextHint:
        '前往【潼关 / 西岳华山 · 潼关天险瓮城 · 潼关镇河主城楼与瓮城（tg_ft_barbican）】，点击「登潼关瓮城 · 仗七星神剑迎战萧远风」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        customLabel: '潼关 / 西岳华山 · 潼关天险瓮城 · 潼关镇河主城楼与瓮城',
      },
    },
    yanan_decisive: {
      id: 'yanan_decisive',
      title: '驰援鄜延 · 七星破杖',
      objective:
        '潼关之危已解，但段延庆正率西夏一品堂精锐猛攻【延安府 · 鄜延边军大营 · 西营（ya_camp_west）】！速统七子星夜驰援延安，列天罡北斗剑阵大破段延庆！',
      nextHint:
        '前往【延安府 · 鄜延边军大营 · 西营（ya_camp_west）】，点击「驰援鄜延西营 · 统七星剑阵决战段延庆」。',
      targetLocation: {
        regionId: 'yanan',
        buildingId: 'ya_camp',
        spotId: 'ya_camp_west',
        customLabel: '延安府 · 鄜延边军大营 · 西营',
      },
    },
    return_zhongnan_glory: {
      id: 'return_zhongnan_glory',
      title: '横绝塞北 · 归山授剑',
      objective:
        '萧远风与段延庆皆已溃败，边关转危为安！请率众凯旋返回【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】，向王重楼复命并正式受颁重阳天罡七星剑！',
      nextHint:
        '返回【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】，点击「凯旋归山 · 正式承接重阳天罡七星剑」。',
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
      id: 'trig_znq33_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'zn_q33_start_triggered',
      condition: ZHONGNAN_Q33_START_CONDITION,
      effects: [openScene('scene_znq33_01', ZHONGNAN_Q33_QUEST_ID)],
    },
    {
      id: 'trig_znq33_tongguan',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_barbican',
      onceFlag: 'zn_q33_tongguan_triggered',
      condition: atStep(ZHONGNAN_Q33_QUEST_ID, 'tongguan_clash'),
      effects: [openScene('scene_znq33_08', ZHONGNAN_Q33_QUEST_ID)],
    },
    {
      id: 'trig_znq33_yanan',
      regionId: 'yanan',
      buildingId: 'ya_camp',
      spotId: 'ya_camp_west',
      onceFlag: 'zn_q33_yanan_triggered',
      condition: atStep(ZHONGNAN_Q33_QUEST_ID, 'yanan_decisive'),
      effects: [openScene('scene_znq33_16', ZHONGNAN_Q33_QUEST_ID)],
    },
    {
      id: 'trig_znq33_return',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'zn_q33_return_triggered',
      condition: atStep(ZHONGNAN_Q33_QUEST_ID, 'return_zhongnan_glory'),
      effects: [openScene('scene_znq33_26', ZHONGNAN_Q33_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq33_start',
      label: '【天罡神剑】谒见王重楼 · 受颁重阳天罡七星剑出关靖边',
      badge: '天罡神剑',
      subtitle: '第一幕 · 辽夏夹击关陕，王重楼授七星神剑命你统率七子出关',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: ZHONGNAN_Q33_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q33_start_triggered', value: true },
        openScene('scene_znq33_01', ZHONGNAN_Q33_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq33_tongguan',
      label: '【天罡神剑】登潼关瓮城 · 仗七星神剑迎战燕云铁枪萧远风',
      badge: '潼关截击',
      subtitle: '第八幕 · 黄河冰封，潼关城楼正面激战辽将萧远风！',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_barbican',
      visibleWhen: atStep(ZHONGNAN_Q33_QUEST_ID, 'tongguan_clash'),
      effects: [
        { type: 'setFlag', flag: 'zn_q33_tongguan_triggered', value: true },
        openScene('scene_znq33_08', ZHONGNAN_Q33_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq33_yanan',
      label: '【天罡神剑】驰援鄜延西营 · 统七星剑阵决战段延庆',
      badge: '塞北决战',
      subtitle: '第十六幕 · 延安风雪夜，天罡北斗大阵硬撼恶贯满盈段延庆！',
      tone: 'danger',
      regionId: 'yanan',
      buildingId: 'ya_camp',
      spotId: 'ya_camp_west',
      visibleWhen: atStep(ZHONGNAN_Q33_QUEST_ID, 'yanan_decisive'),
      effects: [
        { type: 'setFlag', flag: 'zn_q33_yanan_triggered', value: true },
        openScene('scene_znq33_16', ZHONGNAN_Q33_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq33_return',
      label: '【天罡神剑】凯旋归山 · 正式承接重阳天罡七星剑',
      badge: '横绝塞北',
      subtitle: '第二十六幕 · 功成靖边，七星神剑正式入掌',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: atStep(ZHONGNAN_Q33_QUEST_ID, 'return_zhongnan_glory'),
      effects: [
        { type: 'setFlag', flag: 'zn_q33_return_triggered', value: true },
        openScene('scene_znq33_26', ZHONGNAN_Q33_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq33_wang_start',
      label: '领受七星神剑 · 统率全真七子出关驰援潼关与延安',
      badge: '天罡神剑',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0133'] },
          ZHONGNAN_Q33_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q33_start_triggered', value: true },
        openScene('scene_znq33_01', ZHONGNAN_Q33_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanGuanSevenStarSwordQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q33_QUESTS: QuestDefinition[] = [zhongnanGuanSevenStarSwordQuest]
