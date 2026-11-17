import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const TIEZHANG_ENTRY_QUEST_ID = 'QST-SECT-15-ENTRY'

export const TIEZHANG_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus(TIEZHANG_ENTRY_QUEST_ID, 'not_started'),
    {
      type: 'not',
      condition: { type: 'inSect', sectId: 'SECT-15' },
      reason: '少侠已身在洞庭铁掌帮门墙',
    },
    {
      type: 'any',
      hint: '需为无门无派之身，或由江淮漕帮、钱塘怒潮帮、湘西五溪蛊寨水陆同脉转投',
      conditions: [
        { type: 'notInAnySect' },
        { type: 'inSect', sectId: 'SECT-16' },
        { type: 'inSect', sectId: 'SECT-26' },
        { type: 'inSect', sectId: 'SECT-30' },
      ],
    },
  ],
}

export const TIEZHANG_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: TIEZHANG_ENTRY_QUEST_ID,
    title: '烟波五指 · 铁砂问义',
    category: 'sect_entry',
    factionId: 'SECT-15',
    regionId: 'tiezhangfeng',
    recommendedRealm: '不入流（零内功零武学开局友好 · 赤砂淬掌破零传功）',
    maxOpponentRealm: '三流下品（宗门试掌与少主问拳点到为止，胜败皆可通关）',
    recommendedNote:
      '专为零武学根基少侠打造的二十幕荆湘水陆武侠长卷：前八幕零战斗重体验与人物羁绊，第九幕赤砂淬手破零传授并自动运使内功与双路外功，历经洞庭雾夜追凶、屠芳云深情结缘、上官云豹束劲问拳与帮主上官天鹏三掌考心，饮雄黄烈酒堂堂正正拜入铁掌帮！',
    startHint:
      '前往【襄阳府 · 汉水大码头】（千帆栈桥或钞关厅，或直接赴【洞庭铁掌峰】向帮众打听拜山规矩），即可开启二十幕铁掌帮入门长卷。',
    startLocation: {
      regionId: 'xiangyang',
      buildingId: 'xy_dock',
      spotId: 'xy_dock_east',
      customLabel: '襄阳府 · 汉水大码头（千帆栈桥 · 装卸埠）',
    },
    startCondition: TIEZHANG_START_CONDITION,
    summary:
      '皇祐二年汉水涛急，尚无半分内功傍身的你，于襄阳汉水大码头挺身护住遭恶吏张横讹诈的运砂老船户爷孙，由此结识铁掌帮铜桨舵主焦木与外冷内热的女香主屠芳云，亦被桀骜少帮主上官云豹冷眼记名。持五指黑铁木令南入八百里洞庭烟波后，你在颠簸船坞苦撑百斤铜桨，于灯下受屠芳云细心敷药，更在百斤铁沙场以血肉凡掌硬熬三炷香滚烫赤砂，破零习得《铁掌烈火吐纳功》与《铁掌劈碑手》。当盗换五溪草药的阴谋浮出水面，你与屠芳云、焦木夜入迷雾芦荡擒获叛贼，于中峰飞瀑领悟步法、剑痕崖前赢取上官云豹敬重，终在聚义正堂接下「铁掌神鹰」上官天鹏三掌考心，豪饮雄黄烈酒归位铁掌峰！',
    initialStepId: 'sail_to_tiezhang',
    steps: {
      sail_to_tiezhang: {
        id: 'sail_to_tiezhang',
        title: '黑铁木令 · 南下洞庭',
        objective:
          '已在襄阳汉水大码头与铜桨舵主【焦木】、精锐香主【屠芳云】结下渊源并获赐五指黑铁木令。请南下前往【洞庭铁掌峰 · 洞庭水陆连环寨】会合受训。',
        nextHint: '大地图前往【洞庭铁掌峰】，进入【洞庭水陆连环寨】即可触发五指擎天入寨剧情。',
        targetLocation: {
          regionId: 'tiezhangfeng',
          buildingId: 'tz_water',
          spotId: 'tz_water_west',
        },
      },
      temper_red_sand: {
        id: 'temper_red_sand',
        title: '赤砂沸鼎 · 血肉淬掌',
        objective:
          '已在连环船坞稳住百斤铜桨下盘，并蒙【屠芳云】灯下敷妥五溪生肌膏。请登临第一指峰【铁掌帮聚义总堂 · 前坪百斤铁沙场】接受赤砂沸鼎筑基与传功！',
        nextHint: '进入洞庭铁掌峰【铁掌帮聚义总堂】（或点击前坪百斤铁沙场）开启赤砂淬手与破零授艺。',
        targetLocation: {
          regionId: 'tiezhangfeng',
          buildingId: 'tz_hall',
          spotId: 'tz_hall_west',
        },
      },
      night_reed_raid: {
        id: 'night_reed_raid',
        title: '迷雾芦荡 · 夜截盗船',
        objective:
          '铁沙场五溪解毒药材遭汉水恶吏黑齿张横暗中调换！请速下山返回【洞庭水陆连环寨】，与【焦木】、【屠芳云】乘乌篷快舟夜探芦苇荡追回真药！',
        nextHint: '进入洞庭铁掌峰【洞庭水陆连环寨】（或与焦木对话）触发夜雾芦荡截船决战！',
        targetLocation: {
          regionId: 'tiezhangfeng',
          buildingId: 'tz_water',
          spotId: 'tz_water_east',
        },
      },
      climb_middle_peak: {
        id: 'climb_middle_peak',
        title: '铁索寒云 · 中峰试步',
        objective:
          '钞关公堂风波已定，帮主铁羽令箭传召！请随【屠芳云】前往【五指中峰禁地秘冢】外涧参悟先辈飞瀑桩步，并赴剑痕崖会见少帮主【上官云豹】。',
        nextHint: '进入洞庭铁掌峰【五指中峰禁地秘冢】触发铁索谈心、飞瀑踏桩与少主问拳剧情。',
        targetLocation: {
          regionId: 'tiezhangfeng',
          buildingId: 'tz_tomb',
          spotId: 'tz_tomb_west',
        },
      },
      hall_chief_trial: {
        id: 'hall_chief_trial',
        title: '聚义三掌 · 雄黄盟誓',
        objective:
          '已在剑痕崖与少帮主【上官云豹】化嫌为友！请登临第一指峰【铁掌帮聚义总堂 · 铁掌帮聚义正堂】拜谒帮主「铁掌神鹰」【上官天鹏】，接三掌考心并共饮雄黄拜师烈酒！',
        nextHint: '前往【铁掌帮聚义总堂 · 铁掌帮聚义正堂】与帮主【上官天鹏】对话完成入门大典。',
        targetLocation: {
          regionId: 'tiezhangfeng',
          buildingId: 'tz_hall',
          spotId: 'tz_hall_main',
        },
      },
    },

    locationTriggers: [
      // 阶段 1 -> 踏入洞庭铁掌峰【洞庭水陆连环寨】自动触发第 5～7 幕（烟波五指 CG + 船坞铜桨 + 栈桥敷药）
      {
        id: 'trig_tz_arrive_water_fort',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_water',
        onceFlag: 'tz_water_fort_arrived',
        condition: atStep(TIEZHANG_ENTRY_QUEST_ID, 'sail_to_tiezhang'),
        effects: [openScene('scene_tz_05_five_fingers_cg', 'QST-SECT-15-ENTRY')],
      },
      // 阶段 2 -> 踏入【铁掌帮聚义总堂】自动触发第 8～11 幕（赤砂沸鼎 CG + 烈火授艺 + 裂碑切磋 + 毒砂端倪）
      {
        id: 'trig_tz_enter_sand_ground',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_hall',
        onceFlag: 'tz_red_sand_triggered',
        condition: atStep(TIEZHANG_ENTRY_QUEST_ID, 'temper_red_sand'),
        effects: [openScene('scene_tz_08_red_sand_cauldron_cg', 'QST-SECT-15-ENTRY')],
      },
      // 阶段 3 -> 返回【洞庭水陆连环寨】自动触发第 12～15 幕（芦荡故人 + 连舸擒贼 + 公堂辨生死 + 铁羽召见）
      {
        id: 'trig_tz_night_reed_raid',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_water',
        onceFlag: 'tz_night_raid_triggered',
        condition: atStep(TIEZHANG_ENTRY_QUEST_ID, 'night_reed_raid'),
        effects: [openScene('scene_tz_12_mist_reed_ambush', 'QST-SECT-15-ENTRY')],
      },
      // 阶段 4 -> 踏入【五指中峰禁地秘冢】自动触发第 16～18 幕（铁索赠绳 + 飞瀑踏桩 + 少主问拳）
      {
        id: 'trig_tz_enter_middle_peak',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_tomb',
        onceFlag: 'tz_middle_peak_triggered',
        condition: atStep(TIEZHANG_ENTRY_QUEST_ID, 'climb_middle_peak'),
        effects: [openScene('scene_tz_16_cliff_heart_talk', 'QST-SECT-15-ENTRY')],
      },
    ],

    spotActions: [
      // 1) 襄阳汉水大码头 · 千帆栈桥主入口
      {
        id: 'spot_tz_start_hanshui_east',
        label: '排众上前 · 汉水砂船讹税风波',
        badge: '铁掌帮机缘',
        subtitle: '开启二十幕荆湘水陆入门长卷《烟波五指 · 铁砂问义》',
        tone: 'gold',
        regionId: 'xiangyang',
        buildingId: 'xy_dock',
        spotId: 'xy_dock_east',
        visibleWhen: TIEZHANG_START_CONDITION,
        effects: [openScene('scene_tz_01_hanshui_tax', 'QST-SECT-15-ENTRY')],
      },
      // 2) 襄阳汉水大码头 · 水寨望楼钞关厅入口（平滑转至栈桥第一幕）
      {
        id: 'spot_tz_start_hanshui_main',
        label: '循声探看 · 栈桥运砂船户喧哗',
        badge: '铁掌帮机缘',
        subtitle: '步下钞关望楼，开启二十幕入门长卷《烟波五指 · 铁砂问义》',
        tone: 'gold',
        regionId: 'xiangyang',
        buildingId: 'xy_dock',
        spotId: 'xy_dock_main',
        visibleWhen: TIEZHANG_START_CONDITION,
        effects: [
          { type: 'teleportPlayer', regionId: 'xiangyang', buildingId: 'xy_dock', spotId: 'xy_dock_east' },
          openScene('scene_tz_01_hanshui_tax', 'QST-SECT-15-ENTRY'),
        ],
      },
      // 3) 洞庭水陆连环寨拜山指引入口
      {
        id: 'spot_tz_start_from_water_fort',
        label: '叩寨拜山 · 打听铁掌峰投效门径',
        badge: '铁掌帮机缘',
        subtitle: '遵水寨规矩北赴襄阳汉水大码头寻访焦木与屠芳云',
        tone: 'gold',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_water',
        spotId: 'tz_water_main',
        visibleWhen: TIEZHANG_START_CONDITION,
        effects: [openScene('scene_tz_prelude_from_peak', 'QST-SECT-15-ENTRY')],
      },
      // 4) 阶段 temper_red_sand 景点兜底入口（前坪百斤铁沙场）
      {
        id: 'spot_tz_red_sand_ground',
        label: '赤手入鼎 · 熬炼三炷香滚烫铁砂',
        badge: '铁砂筑基',
        subtitle: '接受焦木与沈平威督训，破零修习《铁掌烈火吐纳功》',
        tone: 'gold',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_hall',
        spotId: 'tz_hall_west',
        visibleWhen: atStep(TIEZHANG_ENTRY_QUEST_ID, 'temper_red_sand'),
        effects: [
          { type: 'setFlag', flag: 'tz_red_sand_triggered', value: true },
          openScene('scene_tz_08_red_sand_cauldron_cg', 'QST-SECT-15-ENTRY'),
        ],
      },
      // 5) 阶段 climb_middle_peak 景点兜底入口（飞瀑深潭 · 试炼涧）
      {
        id: 'spot_tz_tomb_stakes_entry',
        label: '携屠芳云登峰 · 参悟飞瀑松木桩阵',
        badge: '中峰试步',
        subtitle: '观历代帮主摩崖石刻，赴剑痕崖应少帮主问拳之约',
        tone: 'gold',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_tomb',
        spotId: 'tz_tomb_west',
        visibleWhen: atStep(TIEZHANG_ENTRY_QUEST_ID, 'climb_middle_peak'),
        effects: [
          { type: 'setFlag', flag: 'tz_middle_peak_triggered', value: true },
          openScene('scene_tz_16_cliff_heart_talk', 'QST-SECT-15-ENTRY'),
        ],
      },
      // 6) 阶段 hall_chief_trial 聚义正堂景点入口
      {
        id: 'spot_tz_hall_chief_trial',
        label: '步入聚义正堂 · 接帮主上官天鹏三掌考心',
        badge: '铁掌归宗',
        subtitle: '撑满三回合掌风不退，共饮雄黄铁砂拜师烈酒',
        tone: 'gold',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_hall',
        spotId: 'tz_hall_main',
        visibleWhen: atStep(TIEZHANG_ENTRY_QUEST_ID, 'hall_chief_trial'),
        effects: [openScene('scene_tz_19_chief_three_palms', 'QST-SECT-15-ENTRY')],
      },
    ],

    npcActions: [
      // 1a) 在襄阳汉水码头或洪州找上官云豹（NPC-0222）、雷环（NPC-0352）、屠芳云（NPC-0539）可直接开启第 1 幕
      {
        id: 'act_tz_xiangyang_npc_start',
        label: '铁砂问义 · 介入汉水砂船风波（铁掌帮入门）',
        badge: '铁掌帮入门',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0222', 'NPC-0352', 'NPC-0539'] },
            TIEZHANG_START_CONDITION,
          ],
        },
        effects: [
          { type: 'teleportPlayer', regionId: 'xiangyang', buildingId: 'xy_dock', spotId: 'xy_dock_east' },
          openScene('scene_tz_01_hanshui_tax', 'QST-SECT-15-ENTRY'),
        ],
      },
      // 1b) 在洞庭铁掌峰等处找其他 SECT-15 帮众（排除已在汉水/洪州入口的 3 人），弹出序引送往襄阳汉水码头
      {
        id: 'act_tz_peak_npc_start',
        label: '叩访五指峰 · 求赐铁掌帮入门机缘',
        badge: '铁掌帮入门',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-15'] },
            {
              type: 'not',
              condition: { type: 'targetNpcMatch', npcIds: ['NPC-0222', 'NPC-0352', 'NPC-0539'] },
            },
            TIEZHANG_START_CONDITION,
          ],
        },
        effects: [openScene('scene_tz_prelude_from_peak', 'QST-SECT-15-ENTRY')],
      },
      // 2) 阶段 sail_to_tiezhang 兜底对话按钮（在洞庭水寨找焦木/罗天豹/雷艮磊均可触发第 5 幕）
      {
        id: 'act_tz_present_iron_token',
        label: '呈验五指黑铁木令 · 入连环船坞受训',
        badge: '烟波入寨',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-15'] },
            atStep(TIEZHANG_ENTRY_QUEST_ID, 'sail_to_tiezhang'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tz_water_fort_arrived', value: true },
          openScene('scene_tz_05_five_fingers_cg', 'QST-SECT-15-ENTRY'),
        ],
      },
      // 3) 阶段 temper_red_sand 兜底按钮（找焦木/沈平威/上官天鹏均可开启赤砂沸鼎）
      {
        id: 'act_tz_start_red_sand',
        label: '前坪百斤铁沙场 · 赤手入鼎淬掌筑基',
        badge: '赤砂淬心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0223', 'NPC-0693', 'NPC-0117', 'NPC-0885'] },
            atStep(TIEZHANG_ENTRY_QUEST_ID, 'temper_red_sand'),
          ],
        },
        effects: [
          { type: 'teleportPlayer', regionId: 'tiezhangfeng', buildingId: 'tz_hall', spotId: 'tz_hall_west' },
          { type: 'setFlag', flag: 'tz_red_sand_triggered', value: true },
          openScene('scene_tz_08_red_sand_cauldron_cg', 'QST-SECT-15-ENTRY'),
        ],
      },
      // 4) 阶段 night_reed_raid 兜底按钮（找焦木/雷艮磊/万定均可登舟夜探芦荡）
      {
        id: 'act_tz_launch_night_skiff',
        label: '登乌篷快舟 · 夜入迷雾芦荡截击张横',
        badge: '芦荡追凶',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0223', 'NPC-0885', 'NPC-0280', 'NPC-0555'] },
            atStep(TIEZHANG_ENTRY_QUEST_ID, 'night_reed_raid'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tz_night_raid_triggered', value: true },
          openScene('scene_tz_12_mist_reed_ambush', 'QST-SECT-15-ENTRY'),
        ],
      },
      // 5) 阶段 hall_chief_trial：在聚义正堂找帮主上官天鹏（NPC-0117）或沈平威（NPC-0693）接三掌入门
      {
        id: 'act_tz_chief_three_palms',
        label: '叩谒铁掌神鹰 · 接三掌考心饮酒入帮',
        badge: '铁掌归宗',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0117', 'NPC-0693'] },
            atStep(TIEZHANG_ENTRY_QUEST_ID, 'hall_chief_trial'),
          ],
        },
        effects: [openScene('scene_tz_19_chief_three_palms', 'QST-SECT-15-ENTRY')],
      },
    ],
    loadScenes: () => import('./tiezhangEntryQuest.scenes').then((m) => m.SCENES),
  },
]
