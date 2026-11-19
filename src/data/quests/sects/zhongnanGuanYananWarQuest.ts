import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q22_QUEST_ID = 'QST-SECT-11-22'

export const ZHONGNAN_Q22_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-21', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q22_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0216', npcName: '丘处玄' },
    { type: 'npcAlive', npcId: 'NPC-0085', npcName: '漫咩' },
    { type: 'npcAlive', npcId: 'NPC-0031', npcName: '狄青' },
    { type: 'npcAlive', npcId: 'NPC-0033', npcName: '种世衡' },
    { type: 'npcAlive', npcId: 'NPC-0034', npcName: '种谔' },
  ],
}

export const ZHONGNAN_Q22_QUEST: QuestDefinition = {
  id: ZHONGNAN_Q22_QUEST_ID,
  title: '延水悲歌 · 青涧铁血',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'yanan',
  recommendedRealm: '一流中品（重阳古观远征卷二）',
  maxOpponentRealm: '一流中品（西夏监军漫咩 · 一品堂斩首死士）',
  recommendedNote:
    '二十六幕塞上铁血长卷：携洛阳所获辽夏密信，随长春子丘处玄北上【延安府 · 鄜延边军大营】面呈铜面将军狄青与青涧老帅种世衡，旋即赴【嘉岭山宝塔】密会少将种谔定下诱敌奇计！大雪封营之夜，西夏监军漫咩竟遣一品堂死士冒雪奇袭中军帅帐——你与丘处玄浴血护帐，连挫西夏死士与监军精锐，以道剑护大宋西北边关安宁！',
  startHint:
    '完成《皇极经世 · 洛阳问数》后，前往【延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台】面见狄青与种世衡，或寻丘处玄同行北上。',
  startLocation: {
    regionId: 'yanan',
    buildingId: 'ya_camp',
    spotId: 'ya_camp_main',
    customLabel: '延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台',
  },
  startCondition: ZHONGNAN_Q22_START_CONDITION,
  summary:
    '{reignYear}初冬朔雪漫天，你随丘处玄携洛阳截获的辽夏密信北赴延安，在【鄜延边军大营 · 中军帅帐】拜谒大宋名将【狄青】与青涧守帅【种世衡】，继而于【嘉岭山宝塔】密会青年悍将【种谔】，议定“明修堡垒、暗伏中军”的诱敌破袭之策。风雪夜深，西夏监军【漫咩】果遣一品堂斩首死士潜雪袭营，直扑帅帐！你与丘处玄仗剑当关，连挫两波死士并重创亲自督战的漫咩，保得鄜延大营与青涧城防寸土不失，赢得三军将士敬重。',
  initialStepId: 'meet_generals',
  steps: {
    meet_generals: {
      id: 'meet_generals',
      title: '北上鄜延 · 帅帐呈密',
      objective:
        '请随丘处玄前往【延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台】，将洛阳截获的辽夏密谋禀报狄青与种世衡。',
      nextHint: '前往【延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台（ya_camp_main）】点击「面见狄青与种世衡 · 呈递密信」。',
      targetLocation: {
        regionId: 'yanan',
        buildingId: 'ya_camp',
        spotId: 'ya_camp_main',
        customLabel: '延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台',
      },
    },
    pagoda_plan: {
      id: 'pagoda_plan',
      title: '嘉岭密会 · 铁血定计',
      objective:
        '狄青与种世衡已令少将种谔在【延安府 · 嘉岭山宝塔 · 宝塔底层 · 舍利地宫】等候，请速往商议防袭奇计！',
      nextHint: '前往【延安府 · 嘉岭山宝塔 · 宝塔底层 · 舍利地宫（ya_pagoda_main）】点击「密会种谔 · 定计破袭」。',
      targetLocation: {
        regionId: 'yanan',
        buildingId: 'ya_pagoda',
        spotId: 'ya_pagoda_main',
        customLabel: '延安府 · 嘉岭山宝塔 · 宝塔底层 · 舍利地宫',
      },
    },
    defend_camp: {
      id: 'defend_camp',
      title: '风雪护帐 · 血战一品堂',
      objective:
        '计策已定！大雪夜西夏一品堂死士必将奇袭帅帐，请速返【延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台】扼守营门、迎击来敌！',
      nextHint: '返回【延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台（ya_camp_main）】点击「风雪守帅帐 · 迎战西夏斩首死士」。',
      targetLocation: {
        regionId: 'yanan',
        buildingId: 'ya_camp',
        spotId: 'ya_camp_main',
        customLabel: '延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq22_start',
      regionId: 'yanan',
      buildingId: 'ya_camp',
      spotId: 'ya_camp_main',
      onceFlag: 'znq22_intro_triggered',
      condition: ZHONGNAN_Q22_START_CONDITION,
      effects: [openScene('scene_znq22_01', ZHONGNAN_Q22_QUEST_ID)],
    },
    {
      id: 'trig_znq22_pagoda',
      regionId: 'yanan',
      buildingId: 'ya_pagoda',
      spotId: 'ya_pagoda_main',
      onceFlag: 'znq22_pagoda_triggered',
      condition: atStep(ZHONGNAN_Q22_QUEST_ID, 'pagoda_plan'),
      effects: [openScene('scene_znq22_09', ZHONGNAN_Q22_QUEST_ID)],
    },
    {
      id: 'trig_znq22_defend',
      regionId: 'yanan',
      buildingId: 'ya_camp',
      spotId: 'ya_camp_main',
      onceFlag: 'znq22_defend_triggered',
      condition: atStep(ZHONGNAN_Q22_QUEST_ID, 'defend_camp'),
      effects: [openScene('scene_znq22_15', ZHONGNAN_Q22_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq22_start',
      label: '随丘处玄面见狄青与种世衡 · 禀报辽夏密谋',
      badge: '青涧铁血',
      subtitle: '鄜延边军大营 · 中军帅帐 · 沙盘台',
      tone: 'gold',
      regionId: 'yanan',
      buildingId: 'ya_camp',
      spotId: 'ya_camp_main',
      visibleWhen: ZHONGNAN_Q22_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'znq22_intro_triggered', value: true },
        openScene('scene_znq22_01', ZHONGNAN_Q22_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq22_pagoda',
      label: '密会少将种谔 · 共议风雪诱敌奇计',
      badge: '嘉岭定计',
      subtitle: '嘉岭山宝塔 · 宝塔底层 · 舍利地宫',
      tone: 'jade',
      regionId: 'yanan',
      buildingId: 'ya_pagoda',
      spotId: 'ya_pagoda_main',
      visibleWhen: atStep(ZHONGNAN_Q22_QUEST_ID, 'pagoda_plan'),
      effects: [
        { type: 'setFlag', flag: 'znq22_pagoda_triggered', value: true },
        openScene('scene_znq22_09', ZHONGNAN_Q22_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq22_defend',
      label: '风雪夜守帅帐 · 迎战西夏一品堂死士与漫咩',
      badge: '风雪护帐',
      subtitle: '鄜延边军大营 · 中军帅帐 · 沙盘台',
      tone: 'danger',
      regionId: 'yanan',
      buildingId: 'ya_camp',
      spotId: 'ya_camp_main',
      visibleWhen: atStep(ZHONGNAN_Q22_QUEST_ID, 'defend_camp'),
      effects: [
        { type: 'setFlag', flag: 'znq22_defend_triggered', value: true },
        openScene('scene_znq22_15', ZHONGNAN_Q22_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq22_npc_start',
      label: '随丘处玄北赴延安边塞 · 共卫青涧大营',
      badge: '延水悲歌',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0216', 'NPC-0031', 'NPC-0033'] },
          ZHONGNAN_Q22_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'znq22_intro_triggered', value: true },
        openScene('scene_znq22_01', ZHONGNAN_Q22_QUEST_ID),
      ],
    },
  ],

  loadScenes: () => import('./zhongnanGuanYananWarQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q22_QUESTS: QuestDefinition[] = [ZHONGNAN_Q22_QUEST]
