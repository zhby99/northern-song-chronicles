import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, qStatus, openScene } from '../../../engine/quest/dsl'

export const TIEZHANG_ENTRY_QUEST_ID = 'QST-SECT-15-ENTRY'

export const TIEZHANG_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus(TIEZHANG_ENTRY_QUEST_ID, 'not_started'),
    flag('tz_permanently_rejected', 'falsy'),
    { type: 'npcAlive', npcId: 'NPC-0117', npcName: '上官天鹏' },
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
    title: '铁砂立威 · 五指拜山',
    category: 'sect_entry',
    factionId: 'SECT-15',
    regionId: 'tiezhangfeng',
    recommendedRealm: '不入流 ～ 三流上品（零武学友好，唯重胆色与立场抉择）',
    maxOpponentRealm: '三流下品（码头夺船、夜袭水寨与少主三招，胜负皆可推进）',
    recommendedNote:
      '十六幕荆湘水陆枭雄长卷：汉水码头抢船立威、连环寨扛百斤铜桨、赤砂沸鼎淬掌破零习武、夜袭抗税飞鱼水寨夺旗、中峰接少帮主上官云豹三招。聚义正堂帮主上官天鹏四选一问心无任何提示，答错即被轰下山门且永不录用！（支持江淮漕帮、钱塘怒潮帮、湘西五溪蛊寨同脉转投）',
    startHint:
      '前往【襄阳府 · 汉水大码头】（或直接赴【洞庭铁掌峰】向铁掌帮众叩问拜山规矩），即可开启十六幕铁掌帮入门长卷。',
    startLocation: {
      regionId: 'xiangyang',
      buildingId: 'xy_dock',
      spotId: 'xy_dock_east',
      customLabel: '襄阳府 · 汉水大码头（千帆栈桥 · 装卸埠）',
    },
    startCondition: TIEZHANG_START_CONDITION,
    summary:
      '汉水码头盐枭踹倒五指黑旗，铜桨舵主焦木冷眼试你胆色。替铁掌帮清场夺船、又于钞关见识黑白两道三七分账的水陆规矩后，持五指黑铁木令南入八百里洞庭。于连环寨船坞扛百斤铜桨稳住下盘，在毒砂堂主罗天豹的赤砂沸鼎里硬熬一炷香破零习得铁砂掌；随后随队夜袭抗税的飞鱼水寨夺旗立功，赴中峰外涧接下少帮主上官云豹三招。终登聚义正堂，面对帮主上官天鹏的严苛问心与青石试掌碑验劲，一言不合便永绝山门，唯有清醒忠狠者方能摔碗饮尽雄黄烈酒，归位五指峰！',
    initialStepId: 'sail_to_tiezhang',
    steps: {
      sail_to_tiezhang: {
        id: 'sail_to_tiezhang',
        title: '黑铁木令 · 南下洞庭',
        objective:
          '已在汉水码头替铁掌帮清场立威并见识钞关分账规矩，获铜桨舵主【焦木】赐予五指黑铁木令。请南下前往【洞庭铁掌峰 · 洞庭水陆连环寨】报到。',
        nextHint: '大地图前往【洞庭铁掌峰】，进入【洞庭水陆连环寨】触发烟波五指入寨与铜桨稳桩。',
        targetLocation: {
          regionId: 'tiezhangfeng',
          buildingId: 'tz_water',
          spotId: 'tz_water_west',
        },
      },
      temper_red_sand: {
        id: 'temper_red_sand',
        title: '赤砂沸鼎 · 铁砂淬掌',
        objective:
          '已在连环寨船坞扛过百斤铜桨稳住下盘。请登临第一指峰【铁掌帮聚义总堂 · 前坪百斤铁沙场】，在毒砂堂主【罗天豹】面前硬熬滚烫赤砂淬手，破零习武！',
        nextHint: '进入洞庭铁掌峰【铁掌帮聚义总堂】，点击【前坪百斤铁沙场】开启赤砂淬掌。',
        targetLocation: {
          regionId: 'tiezhangfeng',
          buildingId: 'tz_hall',
          spotId: 'tz_hall_west',
        },
      },
      raid_feiyu_stockade: {
        id: 'raid_feiyu_stockade',
        title: '雾夜夺旗 · 夜袭飞鱼寨',
        objective:
          '赤砂沸鼎已过，初成《铁砂掌》！洞庭南岸“飞鱼水寨”抗缴湖面抽成且扣我生铁货船。请返回【洞庭水陆连环寨】东侧泊船坞，随焦木夜袭飞鱼水寨夺旗立功！',
        nextHint: '前往【洞庭水陆连环寨】点击东侧泊船坞（或与焦木对话）开启夜袭夺旗。',
        targetLocation: {
          regionId: 'tiezhangfeng',
          buildingId: 'tz_water',
          spotId: 'tz_water_east',
        },
      },
      peak_young_chief: {
        id: 'peak_young_chief',
        title: '五指中峰 · 少主问拳',
        objective:
          '飞鱼水寨已俯首称臣！请前往【五指中峰禁地秘冢】外涧，接少帮主【上官云豹】三招问拳立威。',
        nextHint: '进入洞庭铁掌峰【五指中峰禁地秘冢】触发少帮主三招试拳。',
        targetLocation: {
          regionId: 'tiezhangfeng',
          buildingId: 'tz_tomb',
          spotId: 'tz_tomb_west',
        },
      },
      hall_chief_trial: {
        id: 'hall_chief_trial',
        title: '聚义正堂 · 问心验掌',
        objective:
          '已过少帮主【上官云豹】三招考校！请登临【铁掌帮聚义总堂 · 铁掌帮聚义正堂】觐见帮主「铁掌神鹰」【上官天鹏】，谨言明志并拍青石试掌碑验劲，成败在此一举！',
        nextHint: '前往【铁掌帮聚义总堂 · 铁掌帮聚义正堂】与帮主【上官天鹏】对话（答错问心将永绝铁掌帮）。',
        targetLocation: {
          regionId: 'tiezhangfeng',
          buildingId: 'tz_hall',
          spotId: 'tz_hall_main',
        },
      },
    },

    locationTriggers: [
      // 1) 踏入【洞庭水陆连环寨】自动触发第 5 幕烟波五指
      {
        id: 'trig_tz_arrive_water_fort',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_water',
        onceFlag: 'tz_water_fort_arrived',
        condition: atStep(TIEZHANG_ENTRY_QUEST_ID, 'sail_to_tiezhang'),
        effects: [openScene('scene_tz_05_five_fingers', 'QST-SECT-15-ENTRY')],
      },
      // 2) 踏入【铁掌帮聚义总堂】自动触发第 7 幕初见毒砂堂
      {
        id: 'trig_tz_arrive_red_sand',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_hall',
        onceFlag: 'tz_red_sand_arrived',
        condition: atStep(TIEZHANG_ENTRY_QUEST_ID, 'temper_red_sand'),
        effects: [openScene('scene_tz_07_poison_sand_hall', 'QST-SECT-15-ENTRY')],
      },
      // 3) 踏入【五指中峰禁地秘冢】自动触发第 12 幕剑痕崖阻路
      {
        id: 'trig_tz_arrive_middle_peak',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_tomb',
        onceFlag: 'tz_middle_peak_arrived',
        condition: atStep(TIEZHANG_ENTRY_QUEST_ID, 'peak_young_chief'),
        effects: [openScene('scene_tz_12_cliff_block', 'QST-SECT-15-ENTRY')],
      },
    ],

    spotActions: [
      // 1) 襄阳汉水大码头：千帆栈桥开启第 1 幕
      {
        id: 'spot_tz_hanshui_dock_start',
        label: '汉水栈桥 · 叩问铁掌帮门路',
        badge: '铁掌入门',
        subtitle: '替铁掌帮码头清场立威，赢取五指黑铁木令',
        tone: 'gold',
        regionId: 'xiangyang',
        buildingId: 'xy_dock',
        spotId: 'xy_dock_east',
        visibleWhen: TIEZHANG_START_CONDITION,
        effects: [openScene('scene_tz_01_hanshui_black_flag', 'QST-SECT-15-ENTRY')],
      },
      // 2) 汉水钞关公堂兜底入口
      {
        id: 'spot_tz_hanshui_office_start',
        label: '前往千帆栈桥 · 投效洞庭铁掌帮',
        badge: '铁掌机缘',
        subtitle: '赴汉水栈桥寻铜桨舵主焦木',
        tone: 'default',
        regionId: 'xiangyang',
        buildingId: 'xy_dock',
        spotId: 'xy_dock_main',
        visibleWhen: TIEZHANG_START_CONDITION,
        effects: [
          { type: 'teleportPlayer', regionId: 'xiangyang', buildingId: 'xy_dock', spotId: 'xy_dock_east' },
          openScene('scene_tz_01_hanshui_black_flag', 'QST-SECT-15-ENTRY'),
        ],
      },
      // 3) 洞庭水陆连环寨序引
      {
        id: 'spot_tz_water_fort_prelude',
        label: '叩问洞庭铁掌帮拜山规矩',
        badge: '五指拜山',
        subtitle: '向水陆连环寨帮众打听入帮门道',
        tone: 'gold',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_water',
        spotId: 'tz_water_main',
        visibleWhen: TIEZHANG_START_CONDITION,
        effects: [openScene('scene_tz_00_peak_prelude', 'QST-SECT-15-ENTRY')],
      },
      // 4) 前坪百斤铁沙场（第 7~8 幕兜底触发）
      {
        id: 'spot_tz_red_sand_spot',
        label: '前坪赤砂沸鼎 · 淬掌破零',
        badge: '赤砂淬手',
        subtitle: '双手入沸砂熬足一炷香，习得铁掌筑基功夫',
        tone: 'gold',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_hall',
        spotId: 'tz_hall_west',
        visibleWhen: atStep(TIEZHANG_ENTRY_QUEST_ID, 'temper_red_sand'),
        effects: [openScene('scene_tz_07_poison_sand_hall', 'QST-SECT-15-ENTRY')],
      },
      // 5) 水陆连环寨东侧泊船坞（第 10~11 幕夜袭飞鱼水寨）
      {
        id: 'spot_tz_raid_feiyu_spot',
        label: '连环寨泊船坞 · 随焦木夜袭飞鱼水寨',
        badge: '雾夜夺旗',
        subtitle: '惩戒抗税湖匪，立下入帮投名功劳',
        tone: 'gold',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_water',
        spotId: 'tz_water_east',
        visibleWhen: atStep(TIEZHANG_ENTRY_QUEST_ID, 'raid_feiyu_stockade'),
        effects: [openScene('scene_tz_10_feiyu_tax_revolt', 'QST-SECT-15-ENTRY')],
      },
      // 6) 五指中峰禁地外涧（第 12~13 幕兜底触发）
      {
        id: 'spot_tz_middle_peak_spot',
        label: '五指中峰外涧 · 接少帮主三招',
        badge: '少主问拳',
        subtitle: '迎战少帮主上官云豹三招试拳',
        tone: 'gold',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_tomb',
        spotId: 'tz_tomb_west',
        visibleWhen: atStep(TIEZHANG_ENTRY_QUEST_ID, 'peak_young_chief'),
        effects: [openScene('scene_tz_12_cliff_block', 'QST-SECT-15-ENTRY')],
      },
      // 7) 聚义正堂拜见上官天鹏（第 14~16 幕）
      {
        id: 'spot_tz_hall_chief_ceremony',
        label: '聚义正堂 · 觐见上官帮主',
        badge: '问心验掌',
        subtitle: '虎皮交椅前问心（答错永绝铁掌帮）、青石试掌与雄黄入帮',
        tone: 'gold',
        regionId: 'tiezhangfeng',
        buildingId: 'tz_hall',
        spotId: 'tz_hall_main',
        visibleWhen: atStep(TIEZHANG_ENTRY_QUEST_ID, 'hall_chief_trial'),
        effects: [openScene('scene_tz_14_tiger_chair_test', 'QST-SECT-15-ENTRY')],
      },
    ],

    npcActions: [
      {
        id: 'act_tz_start_hanshui_npcs',
        label: '投效铁掌帮 · 汉水立威',
        badge: '铁掌入门',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0223'] },
            TIEZHANG_START_CONDITION,
          ],
        },
        effects: [openScene('scene_tz_01_hanshui_black_flag', 'QST-SECT-15-ENTRY')],
      },
      {
        id: 'act_tz_start_from_peak_npcs',
        label: '叩问铁掌帮拜山门道',
        badge: '五指拜山',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-15'] },
            {
              type: 'not',
              condition: { type: 'targetNpcMatch', npcIds: ['NPC-0223'] },
            },
            TIEZHANG_START_CONDITION,
          ],
        },
        effects: [openScene('scene_tz_00_peak_prelude', 'QST-SECT-15-ENTRY')],
      },
      {
        id: 'act_tz_water_fort_npc',
        label: '呈递五指黑铁木令 · 入水陆连环寨',
        badge: '铁掌拜山',
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
        effects: [openScene('scene_tz_05_five_fingers', 'QST-SECT-15-ENTRY')],
      },
      {
        id: 'act_tz_red_sand_npc',
        label: '入百斤铁沙场 · 赤砂沸鼎淬掌',
        badge: '赤砂淬手',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0176', 'NPC-0223'] },
            atStep(TIEZHANG_ENTRY_QUEST_ID, 'temper_red_sand'),
          ],
        },
        effects: [openScene('scene_tz_07_poison_sand_hall', 'QST-SECT-15-ENTRY')],
      },
      {
        id: 'act_tz_raid_feiyu_npc',
        label: '随焦木夜袭飞鱼水寨 · 夺旗立功',
        badge: '雾夜夺旗',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0223'] },
            atStep(TIEZHANG_ENTRY_QUEST_ID, 'raid_feiyu_stockade'),
          ],
        },
        effects: [openScene('scene_tz_10_feiyu_tax_revolt', 'QST-SECT-15-ENTRY')],
      },
      {
        id: 'act_tz_young_chief_npc',
        label: '赴五指中峰 · 接少帮主三招',
        badge: '少主问拳',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0222'] },
            atStep(TIEZHANG_ENTRY_QUEST_ID, 'peak_young_chief'),
          ],
        },
        effects: [openScene('scene_tz_12_cliff_block', 'QST-SECT-15-ENTRY')],
      },
      {
        id: 'act_tz_chief_oath_npc',
        label: '聚义正堂 · 觐见上官帮主',
        badge: '问心验掌',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0117'] },
            atStep(TIEZHANG_ENTRY_QUEST_ID, 'hall_chief_trial'),
          ],
        },
        effects: [openScene('scene_tz_14_tiger_chair_test', 'QST-SECT-15-ENTRY')],
      },
    ],

    loadScenes: () => import('./tiezhangEntryQuest.scenes').then((m) => m.SCENES),
  },
]
