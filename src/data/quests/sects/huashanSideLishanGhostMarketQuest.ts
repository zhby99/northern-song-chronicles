import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_SIDE08_QUEST_ID = 'QST-SECT-05-SIDE-08'

export const HUASHAN_SIDE08_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    {
      type: 'any',
      hint: '需完成华山第 3 阶支脉核心任务（QST-SECT-05-05 或 QST-SECT-05-08）',
      conditions: [
        qStatus('QST-SECT-05-05', 'completed'),
        qStatus('QST-SECT-05-08', 'completed'),
      ],
    },
    { type: 'inSect', sectId: 'SECT-05', minRank: 3 },
    {
      type: 'any',
      hint: '需书或画造诣 ≥ 30（以辨识古剑篆铭与云雷暗纹）',
      conditions: [
        { type: 'skillAtLeast', key: '画', min: 30 },
        { type: 'skillAtLeast', key: '书', min: 30 },
      ],
    },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'shichenIn', indices: [10, 11, 0, 1], label: '夜间（戌时至丑时）' },
    qStatus(HUASHAN_SIDE08_QUEST_ID, 'not_started'),
  ],
}

export const HUASHAN_SIDE08_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_SIDE08_QUEST_ID,
    title: '骊山鬼市 · 古剑寻踪录',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '一流下品 ～ 一流中品',
    maxOpponentRealm: '一流中品（断金帮副帮主魏无常与辽国密使联手）',
    recommendedNote:
      '十四幕华山夜间探案奇遇支线：落雁峰顶，「潼关剑神」秦烈山托你佩面夜探骊山地下鬼市，寻回三十年前亡友遗失的「青霜古剑」。你于幽冥鬼市辨明真伪，夜追勾结辽使的洛阳黑市帮派断金帮副帮主「鬼面刀」魏无常，于华清后山松林孤剑夺回古剑，白玉坛奉还宗师。',
    startHint:
      '华山第 3 阶弟子完成支脉前篇（QST-SECT-05-05 或 QST-SECT-05-08），书或画 ≥ 30，于夜间（酉/戌/亥/子/丑时）前往【华山绝顶论剑台 > 落雁峰顶白玉坛】或寻【秦烈山】开启。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_altar',
      customLabel: '潼关 / 华山绝顶论剑台 · 落雁峰顶白玉坛（夜间寻秦烈山）',
    },
    startCondition: HUASHAN_SIDE08_START_CONDITION,
    summary:
      '{reignYear}寒夜，「潼关剑神」秦烈山于落雁峰白玉坛托付密事：三十年前故友遗失于北疆的「青霜古剑」忽现身长安骊山地下鬼市。你佩木面潜入幽冥鬼市，凭书画金石眼力在诸多赝品中识破真剑，却见洛阳地下黑市帮派「断金帮」副帮主「鬼面刀」魏无常受辽国密使重金指使将剑购走。你连夜尾随至华清后山冷月松林，孤剑斩杀断金帮悍匪与辽国密使，终将青霜古剑连同剑柄秘图完壁归赵，奉还秦烈山。',
    initialStepId: 'ghost_market',
    steps: {
      ghost_market: {
        id: 'ghost_market',
        title: '鬼市辨剑 · 幽冥寻真',
        objective:
          '已领受秦烈山所赠木面与篆铭拓片。请前往【长安西市 > 东侧鬼市暗坊】（ca_xishi_east）佩面夜探骊山地下鬼市，在赝品丛中辨识真正的「青霜古剑」！',
        nextHint: '前往【长安 / 长安西市 > ca_xishi_east】探入骊山地下鬼市。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_xishi',
          spotId: 'ca_xishi_east',
        },
      },
      pine_intercept: {
        id: 'pine_intercept',
        title: '松林夜追 · 截击前哨',
        objective:
          '「青霜古剑」已被洛阳地下黑市「断金帮」副帮主「鬼面刀」魏无常替辽国密使购走！请速追至【草堂寺 > 东侧华清后山冷月松林】（ca_caotang_east），截杀其放风前哨！',
        nextHint: '前往【长安 / 草堂寺 > ca_caotang_east】冷月松林拦截断金帮骑哨。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_caotang',
          spotId: 'ca_caotang_east',
        },
      },
      pine_boss: {
        id: 'pine_boss',
        title: '松林截剑 · 孤剑破敌',
        objective:
          '断金帮前哨已除！林深处「鬼面刀」魏无常正与辽国密使交割古剑。请于【草堂寺 > 东侧冷月松林】（ca_caotang_east）孤剑迎战二人，夺回「青霜古剑」！',
        nextHint: '在【草堂寺 > ca_caotang_east】力战魏无常与辽国密使。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_caotang',
          spotId: 'ca_caotang_east',
        },
      },
      return_qin: {
        id: 'return_qin',
        title: '白玉还锋 · 奉还古剑',
        objective:
          '「青霜古剑」已完好夺回，剑柄秘图亦未落入辽人之手！请返回【华山绝顶论剑台 > 落雁峰顶白玉坛】双手奉还【秦烈山】。',
        nextHint: '前往【华山绝顶论剑台 > 落雁峰顶白玉坛】（或寻秦烈山）奉还古剑。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_altar',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hss08_altar_start',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        onceFlag: 'hss08_intro_triggered',
        condition: HUASHAN_SIDE08_START_CONDITION,
        effects: [openScene('scene_hss08_01', HUASHAN_SIDE08_QUEST_ID)],
      },
      {
        id: 'trig_hss08_ghost_market',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_east',
        onceFlag: 'hss08_market_triggered',
        condition: atStep(HUASHAN_SIDE08_QUEST_ID, 'ghost_market'),
        effects: [openScene('scene_hss08_03', HUASHAN_SIDE08_QUEST_ID)],
      },
      {
        id: 'trig_hss08_pine_intercept',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_east',
        onceFlag: 'hss08_pine_triggered',
        condition: atStep(HUASHAN_SIDE08_QUEST_ID, 'pine_intercept'),
        effects: [openScene('scene_hss08_07', HUASHAN_SIDE08_QUEST_ID)],
      },
      {
        id: 'trig_hss08_return_qin',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        onceFlag: 'hss08_return_triggered',
        condition: atStep(HUASHAN_SIDE08_QUEST_ID, 'return_qin'),
        effects: [openScene('scene_hss08_13', HUASHAN_SIDE08_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hss08_start_altar',
        label: '夜谒秦烈山 · 领受骊山鬼市寻剑之托（开启《骊山鬼市 · 古剑寻踪录》）',
        badge: '鬼市寻剑',
        subtitle: '第一幕 · 落雁峰顶白玉坛（夜间）',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        visibleWhen: HUASHAN_SIDE08_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hss08_intro_triggered', value: true },
          openScene('scene_hss08_01', HUASHAN_SIDE08_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss08_ghost_market',
        label: '佩木面步入幽冥灯巷 · 夜探骊山地下鬼市辨剑',
        badge: '鬼市辨剑',
        subtitle: '第三幕 · 长安西市东侧暗坊',
        tone: 'primary',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_east',
        visibleWhen: atStep(HUASHAN_SIDE08_QUEST_ID, 'ghost_market'),
        effects: [
          { type: 'setFlag', flag: 'hss08_market_triggered', value: true },
          openScene('scene_hss08_03', HUASHAN_SIDE08_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss08_pine_intercept',
        label: '潜入华清后山冷月松林 · 截击断金帮前哨骑手',
        badge: '松林截哨',
        subtitle: '第七幕 · 草堂寺东侧冷月松林',
        tone: 'danger',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_east',
        visibleWhen: atStep(HUASHAN_SIDE08_QUEST_ID, 'pine_intercept'),
        effects: [
          { type: 'setFlag', flag: 'hss08_pine_triggered', value: true },
          openScene('scene_hss08_07', HUASHAN_SIDE08_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss08_pine_boss',
        label: '冷月拔剑 · 孤剑力战魏无常与辽国密使',
        badge: '松林截剑',
        subtitle: '第十幕 · 草堂寺东侧冷月松林',
        tone: 'danger',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_east',
        visibleWhen: atStep(HUASHAN_SIDE08_QUEST_ID, 'pine_boss'),
        effects: [openScene('scene_hss08_10', HUASHAN_SIDE08_QUEST_ID)],
      },
      {
        id: 'spot_hss08_return_altar',
        label: '双手奉还「青霜古剑」 · 向秦烈山复命',
        badge: '白玉还锋',
        subtitle: '第十三幕 · 落雁峰顶白玉坛',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        visibleWhen: atStep(HUASHAN_SIDE08_QUEST_ID, 'return_qin'),
        effects: [
          { type: 'setFlag', flag: 'hss08_return_triggered', value: true },
          openScene('scene_hss08_13', HUASHAN_SIDE08_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hss08_qin_start',
        label: '夜叩秦前辈 · 问询「青霜古剑」下落（开启《骊山鬼市 · 古剑寻踪录》）',
        badge: '鬼市寻剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0147'] },
            HUASHAN_SIDE08_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hss08_intro_triggered', value: true },
          openScene('scene_hss08_01', HUASHAN_SIDE08_QUEST_ID),
        ],
      },
      {
        id: 'act_hss08_qin_return',
        label: '双手奉还「青霜古剑」与剑柄北疆密图',
        badge: '白玉还锋',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0147'] },
            atStep(HUASHAN_SIDE08_QUEST_ID, 'return_qin'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hss08_return_triggered', value: true },
          openScene('scene_hss08_13', HUASHAN_SIDE08_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanSideLishanGhostMarketQuest.scenes').then((m) => m.SCENES),
  },
]
