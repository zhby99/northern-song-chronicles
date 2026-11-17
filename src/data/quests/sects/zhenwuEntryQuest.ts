import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const ZHENWU_ENTRY_QUEST_ID = 'QST-SECT-08-ENTRY'

const ZHENWU_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'notInAnySect' },
    qStatus(ZHENWU_ENTRY_QUEST_ID, 'not_started'),
    qStatus(ZHENWU_ENTRY_QUEST_ID, 'not_completed'),
  ],
}

export const ZHENWU_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: ZHENWU_ENTRY_QUEST_ID,
    title: '汉水问津 · 太和问道',
    category: 'sect_entry',
    factionId: 'SECT-08',
    regionId: 'wudangshan',
    recommendedRealm: '初入江湖（零武学起步）',
    maxOpponentRealm: '二流下品',
    recommendedNote: '无需任何内功与武学即可开局体验；极重【悟性 / 根骨 / 颜值】及【经义 / 辩才 / 棋 / 算术】发挥，多处选择与缘分将影响师门评语。',
    startHint: '无门无派时前往【襄阳府 · 汉水大码头】或【古隆中草庐】，与莫清谷 / 俞清虚结缘即可开启二十幕武当问心之旅。',
    startLocation: {
      regionId: 'xiangyang',
      buildingId: 'xy_dock',
      spotId: 'xy_dock_west',
      customLabel: '襄阳府 · 汉水大码头（临江演武船坞）',
    },
    startCondition: ZHENWU_START_CONDITION,
    summary:
      '公元一〇五〇年暮春，汉水烟雨中的一次解围，引出武当山真武道宗的二十幕问道长卷。历经解剑池洗尘、观云台煮茶、紫霄宫三日观心、南岩剑崖借势退敌，终至太和金殿授剑入道。',
    initialStepId: 'go_longzhong',
    steps: {
      go_longzhong: {
        id: 'go_longzhong',
        title: '初入襄阳 · 古隆中拜会俞长老',
        objective: '持莫清谷所赠【武当解剑木牌】，前往襄阳城西【古隆中草庐 > 临风观景轩】拜会俞清虚长老。',
        nextHint: '莫清谷嘱你先去古隆中草庐取紫苏药材与俞长老手书，再赴武当山。',
        targetLocation: {
          regionId: 'xiangyang',
          buildingId: 'xy_longzhong',
          spotId: 'xy_longzhong_west',
          customLabel: '襄阳府 > 古隆中草庐 > 临风观景轩',
        },
      },
      go_wudangshan: {
        id: 'go_wudangshan',
        title: '北上武当 · 踏入解剑池',
        objective: '携带紫苏药材与俞清虚手书，北上【武当山真武道宗】山门，迈向太和绝顶真武金殿。',
        nextHint: '沿襄樊古道北行前往武当山，途中可留意同行香客的难处。',
        targetLocation: {
          regionId: 'wudangshan',
          buildingId: 'wd_golden',
          spotId: 'wd_golden_east',
          customLabel: '武当山真武道宗 > 太和绝顶真武金殿 > 铜铸配殿签房廊',
        },
      },
      wudang_corridor: {
        id: 'wudang_corridor',
        title: '太和初试 · 签房廊与观云台',
        objective: '于太和绝顶铜铸配殿签房廊拜见清鹤执事，并往天柱绝顶观云台远眺云海，随后至紫霄宫谒见首座宋远乔。',
        targetLocation: {
          regionId: 'wudangshan',
          buildingId: 'wd_zixiao',
          spotId: 'wd_zixiao_main',
          customLabel: '武当山真武道宗 > 紫霄道宫丹房 > 紫霄重檐主大殿',
        },
      },
      zixiao_three_days: {
        id: 'zixiao_three_days',
        title: '紫霄观心 · 担水守丹观龟蛇',
        objective: '在紫霄宫随李潇心、张清溪与宋远乔完成三日观心杂役，体悟武当“以静制动”之理。',
        targetLocation: {
          regionId: 'wudangshan',
          buildingId: 'wd_zixiao',
          spotId: 'wd_zixiao_west',
          customLabel: '武当山真武道宗 > 紫霄道宫丹房 > 禹迹池畔太极坪',
        },
      },
      go_nanyan: {
        id: 'go_nanyan',
        title: '南岩送药 · 绝壁试剑崖',
        objective: '随宋远乔前往【南岩绝壁试剑崖 > 绝壁石刻 · 剑痕崖】送交丹药。',
        targetLocation: {
          regionId: 'wudangshan',
          buildingId: 'wd_nanyan',
          spotId: 'wd_nanyan_east',
          customLabel: '武当山真武道宗 > 南岩绝壁试剑崖 > 绝壁石刻 · 剑痕崖',
        },
      },
      nanyan_trial: {
        id: 'nanyan_trial',
        title: '南岩试炼 · 借势卸力退狂徒',
        objective: '于南岩剑痕崖面对铁剑门狂徒赵霸，以守御与借势周旋三合，随后于寒玉榻调息养气。',
        targetLocation: {
          regionId: 'wudangshan',
          buildingId: 'wd_nanyan',
          spotId: 'wd_nanyan_main',
          customLabel: '武当山真武道宗 > 南岩绝壁试剑崖 > 幽谷石室 · 寒玉榻',
        },
      },
      golden_hall_ceremony: {
        id: 'golden_hall_ceremony',
        title: '太和授篆 · 拜入真武道宗',
        objective: '登【太和绝顶真武金殿 > 太和紫金正殿】觐见掌教天师张玄素，受剑拜师。',
        targetLocation: {
          regionId: 'wudangshan',
          buildingId: 'wd_golden',
          spotId: 'wd_golden_main',
          customLabel: '武当山真武道宗 > 太和绝顶真武金殿 > 太和紫金正殿',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_zw_hanshui_dock',
        regionId: 'xiangyang',
        buildingId: 'xy_dock',
        onceFlag: 'zw_entry_triggered',
        condition: ZHENWU_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zw_entry_triggered', value: true },
          { type: 'startQuest', questId: ZHENWU_ENTRY_QUEST_ID, stepId: 'go_longzhong', silent: true },
          openScene('SCENE_ZW_01_HANSHUI_MIST', 'QST-SECT-08-ENTRY'),
        ],
      },
      {
        id: 'trig_zw_longzhong_resume',
        regionId: 'xiangyang',
        buildingId: 'xy_longzhong',
        spotId: 'xy_longzhong_west',
        onceFlag: 'zw_longzhong_seen',
        condition: atStep(ZHENWU_ENTRY_QUEST_ID, 'go_longzhong'),
        effects: [
          { type: 'setFlag', flag: 'zw_longzhong_seen', value: true },
          openScene('SCENE_ZW_03_LONGZHONG_QIN', 'QST-SECT-08-ENTRY'),
        ],
      },
      {
        id: 'trig_zw_wudang_arrival',
        regionId: 'wudangshan',
        onceFlag: 'zw_mountain_path_seen',
        condition: atStep(ZHENWU_ENTRY_QUEST_ID, 'go_wudangshan'),
        effects: [
          { type: 'setFlag', flag: 'zw_mountain_path_seen', value: true },
          openScene('SCENE_ZW_04_MOUNTAIN_PATH', 'QST-SECT-08-ENTRY'),
        ],
      },
    ],
    npcActions: [
      {
        id: 'act_zw_moqinggu_start',
        label: '问询真武道宗 · 汉水结缘',
        badge: '真武入门',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [{ type: 'targetNpcMatch', npcIds: ['NPC-0209'] }, ZHENWU_START_CONDITION],
        },
        effects: [
          { type: 'setFlag', flag: 'zw_entry_triggered', value: true },
          { type: 'startQuest', questId: ZHENWU_ENTRY_QUEST_ID, stepId: 'go_longzhong', silent: true },
          openScene('SCENE_ZW_01_HANSHUI_MIST', 'QST-SECT-08-ENTRY'),
        ],
      },
      {
        id: 'act_zw_yuqingxu_visit',
        label: '呈递解剑木牌 · 拜会俞长老',
        badge: '古隆中',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0170'] },
            atStep(ZHENWU_ENTRY_QUEST_ID, 'go_longzhong'),
          ],
        },
        effects: [openScene('SCENE_ZW_03_LONGZHONG_QIN', 'QST-SECT-08-ENTRY')],
      },
      {
        id: 'act_zw_qinghe_corridor',
        label: '呈递俞长老手书 · 签房廊应试',
        badge: '太和初试',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0364'] },
            atStep(ZHENWU_ENTRY_QUEST_ID, 'wudang_corridor'),
          ],
        },
        effects: [openScene('SCENE_ZW_06_LOT_CORRIDOR', 'QST-SECT-08-ENTRY')],
      },
      {
        id: 'act_zw_songyuanqiao_zixiao',
        label: '拜见宋首座 · 紫霄观心三日',
        badge: '紫霄问心',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0148'] },
            atStep(ZHENWU_ENTRY_QUEST_ID, 'zixiao_three_days'),
          ],
        },
        effects: [openScene('SCENE_ZW_08_SONG_GREETING', 'QST-SECT-08-ENTRY')],
      },
      {
        id: 'act_zw_yinfengfeng_nanyan',
        label: '随宋师兄送药 · 应对南岩风波',
        badge: '南岩试炼',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0326', 'NPC-0148'] },
            {
              type: 'any',
              conditions: [
                atStep(ZHENWU_ENTRY_QUEST_ID, 'go_nanyan'),
                atStep(ZHENWU_ENTRY_QUEST_ID, 'nanyan_trial'),
              ],
            },
          ],
        },
        effects: [openScene('SCENE_ZW_13_NANYAN_TROUBLE', 'QST-SECT-08-ENTRY')],
      },
      {
        id: 'act_zw_zhangxuansu_ceremony',
        label: '登太和紫金正殿 · 拜师授剑',
        badge: '太和授篆',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0119'] },
            atStep(ZHENWU_ENTRY_QUEST_ID, 'golden_hall_ceremony'),
          ],
        },
        effects: [openScene('SCENE_ZW_18_REVEAL_MASTER', 'QST-SECT-08-ENTRY')],
      },
    ],
    loadScenes: () => import('./zhenwuEntryQuest.scenes').then((m) => m.SCENES),
  },
]
