import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, toast, openScene } from '../../../engine/quest/dsl'

export const QUEST_ID = 'QST-CITY-DAMING-BAJI'

const CAN_STILL_INVESTIGATE_CLUES: QuestCondition = {
  type: 'any',
  conditions: [
    atStep(QUEST_ID, 'investigate_clues'),
    atStep(QUEST_ID, 'present_to_jia'),
  ],
}

export const DAMING_BAJI_QUESTS: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '铁锁镇河朔',
    category: 'main_story',
    factionId: 'SECT-23',
    regionId: 'daming',
    recommendedRealm: '二流中品',
    maxOpponentRealm: '二流下品',
    recommendedNote:
      '终幕需战契丹铁林千夫长耶律裂山（满态接近二流下品），建议至少【二流中品】；若校场看破破绽或与卢铁山夹击，三流上品亦可一战',
    startHint: '前往大名府【黄河北岸临津酒楼】撞见官差与八极门对峙，或径赴【沧州八极分馆】问明案情。',
    startLocation: {
      regionId: 'daming',
      buildingId: 'daming_base_tavern',
      customLabel: '大名府 · 黄河北岸临津酒楼',
    },
    summary:
      '{reignYear}春汛将至，北京大名府黄河浮桥三根镇河铁索一夜遭寒刃斩断，二十箱修埽生铁与三千贯河工银饷离奇失踪，护运的沧州八极门真传教习崔帆坤含冤下狱。前宰相贾昌朝坐镇留守行宫深藏机锋，总馆主卢铁山横枪护犊，一场牵动河北河防蠹虫与契丹铁林骁骑的局中局正悄然收网……',
    initialStepId: 'meet_lu_wanyue',
    steps: {
      meet_lu_wanyue: {
        id: 'meet_lu_wanyue',
        title: '临津风波 · 讲武堂问冤',
        objective:
          '大名府黄河铁索断江一案沸反盈天，沧州八极门真传教习崔帆坤遭留守司扣押。前往【沧州八极分馆 · 讲武堂 > 八极忠义讲武正堂】寻金牌教头【卢婉月】问明详情。',
        nextHint: '前往大名府【沧州八极分馆正堂】拜会金牌教头卢婉月问明案情',
        targetLocation: {
          regionId: 'daming',
          buildingId: 'dm_baji',
          spotId: 'dm_baji_main',
          customLabel: '大名府 · 沧州八极分馆正堂',
        },
      },
      investigate_clues: {
        id: 'investigate_clues',
        title: '惊涛断索 · 三线勘迷局',
        objective:
          '七日限期内，于大名府追查断索真相（集齐任意两条铁证即可赴行宫呈禀，三线俱全另有厚赏）：① 赴【黄河铁索渡口 > 镇河铁牛浮桥】勘验铁索断口（或请栈桥酒肆【北侠欧阳春】掌眼）；② 赴【大名府留守司衙】核验河防铁料黄册；③ 赴【黄河铁索渡口 > 巡河水寨烽旗望楼】访丐帮长老【陈孤雁】。',
        nextHint: '7日内查明至少2条铁证（渡口勘断口 / 留守司查账 / 望楼访陈孤雁），集齐3条有额外厚赏',
        targetLocation: {
          regionId: 'daming',
          buildingId: 'dm_ferry',
          spotId: 'dm_fr_chains',
          customLabel: '黄河铁索渡口 · 镇河铁牛浮桥',
        },
      },
      present_to_jia: {
        id: 'present_to_jia',
        title: '崇政殿前 · 面谒贾留守',
        objective:
          '关键铁证已握（亦可顺路补齐全部三条线索以获全满嘉奖），速前往【北京留守行宫 > 驻跸崇政议军正殿】，会同八极门总馆主【卢铁山】求见判大名府兼北京留守【贾昌朝】！',
        nextHint: '前往【北京留守行宫·崇政议军正殿】与卢铁山一道面呈铁证求见贾昌朝',
        targetLocation: {
          regionId: 'daming',
          buildingId: 'dm_palace',
          spotId: 'dm_pl_hall',
          customLabel: '北京留守行宫 · 崇政议军正殿',
        },
      },
      leitai_trial: {
        id: 'leitai_trial',
        title: '校场试金 · 八极震河朔',
        objective:
          '贾昌朝明贬暗钓，借校场春检点兵引幕后黑手露头！前往【河北枪棒大校场 > 六合枪棒八角比武擂台】助沧州八极门迎战踢馆刺头与契丹先锋！',
        nextHint: '赴【河北枪棒大校场·八角比武擂台】迎战焦三斧与乌古乃，打出河朔威风',
        targetLocation: {
          regionId: 'daming',
          buildingId: 'dm_drill',
          spotId: 'dm_dr_leitai',
          customLabel: '河北枪棒大校场 · 八角比武擂台',
        },
      },
      midnight_sandtable: {
        id: 'midnight_sandtable',
        title: '子夜沙盘 · 瓮中捉契丹',
        objective:
          '内鬼与铁林死士已被逼至绝境！请于夜间（戌时、亥时、子时或丑时）潜入【北京留守行宫 > 河北防辽舆图沙盘阁】（白昼抵达亦可在阁外点击【屏息静候至戌夜】），合围盗图死士！',
        nextHint: '戌至丑时潜入【北京留守行宫·河北防辽舆图沙盘阁】（白昼可阁外静候至戌夜），合围耶律裂山',
        targetLocation: {
          regionId: 'daming',
          buildingId: 'dm_palace',
          spotId: 'dm_pl_sandtable',
          customLabel: '北京留守行宫 · 河北防辽舆图沙盘阁',
        },
      },
    },

    // ==================== 地点自动触发器 ====================
    locationTriggers: [
      // 1) 第一幕开场钩子：踏入大名府【黄河北岸临津酒楼】撞见官差与八极门对峙
      {
        id: 'trig_dm_tavern_opening_hook',
        regionId: 'daming',
        buildingId: 'daming_base_tavern',
        onceFlag: 'dm_baji_tavern_hook_seen',
        condition: qStatus(QUEST_ID, 'not_started'),
        effects: [
          openScene('scene_dm_tavern_confrontation', 'QST-CITY-DAMING-BAJI'),
        ],
      },

      // 2) 第二幕：集齐线索后步入【崇政议军正殿】自动触发贾昌朝堂审暗局
      {
        id: 'trig_dm_palace_hall_audience',
        regionId: 'daming',
        buildingId: 'dm_palace',
        spotId: 'dm_pl_hall',
        onceFlag: 'dm_jia_audience_done',
        condition: atStep(QUEST_ID, 'present_to_jia'),
        effects: [openScene('scene_dm_jia_court_trap', 'QST-CITY-DAMING-BAJI')],
      },

      // 3) 第三幕：夜间（戌/亥/子/丑时）踏入【河北防辽舆图沙盘阁】自动触发终幕合围
      {
        id: 'trig_dm_sandtable_midnight_auto',
        regionId: 'daming',
        buildingId: 'dm_palace',
        spotId: 'dm_pl_sandtable',
        onceFlag: 'dm_sandtable_ambush_started',
        condition: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID, 'midnight_sandtable'),
            {
              type: 'shichenIn',
              indices: [10, 11, 0, 1],
              label: '需夜间（戌时、亥时、子时或丑时）',
            },
          ],
        },
        effects: [openScene('scene_dm_midnight_sandtable_climax', 'QST-CITY-DAMING-BAJI')],
      },
    ],

    // ==================== 人物交互注入动作 ====================
    npcActions: [
      // 1) 卢婉月（NPC-0366）：接取/详询第一幕案情（兼容未去过临津酒楼直接来讲武堂的玩家，并识别八极门自家弟子身份）
      {
        id: 'act_dm_talk_lu_wanyue_intro',
        label: '探问黄河铁索断江冤案',
        badge: '铁锁奇案',
        tone: 'primary',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0366'] },
            {
              type: 'any',
              conditions: [
                qStatus(QUEST_ID, 'not_started'),
                atStep(QUEST_ID, 'meet_lu_wanyue'),
              ],
            },
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'inSect', sectId: 'SECT-23' },
            thenEffects: [
              openScene('scene_dm_lu_wanyue_fellow_disciple', 'QST-CITY-DAMING-BAJI'),
            ],
            elseEffects: [
              openScene('scene_dm_lu_wanyue_outsider', 'QST-CITY-DAMING-BAJI'),
            ],
          },
        ],
      },

      // 2) 线索一辅助路径：栈桥酒肆请【北侠欧阳春】（NPC-0248）辨认铁索寒斧断口
      {
        id: 'act_dm_ouyang_chun_inspect_chain',
        label: '请北侠掌眼铁索断痕',
        badge: '铁锁线索',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0248'] },
            CAN_STILL_INVESTIGATE_CLUES,
            flag('dm_clue_chain', 'falsy'),
          ],
        },
        effects: [
          openScene('scene_dm_ouyang_chun_axe', 'QST-CITY-DAMING-BAJI'),
        ],
      },

      // 3) 线索二人物入口：留守司衙找驻地都头【郭钧海】（NPC-0727）调阅河工铁料账册
      {
        id: 'act_dm_guo_junhai_ledger',
        label: '请调河防修埽生铁账册',
        badge: '铁锁线索',
        tone: 'primary',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0727'] },
            CAN_STILL_INVESTIGATE_CLUES,
            flag('dm_clue_ledger', 'falsy'),
          ],
        },
        effects: [
          openScene('scene_dm_yamen_ledger_check', 'QST-CITY-DAMING-BAJI'),
        ],
      },

      // 4) 线索三：烽旗望楼访丐帮长老【陈孤雁】（NPC-0137）
      {
        id: 'act_dm_chen_guyan_intel',
        label: '打探断索之夜渡口行藏',
        badge: '铁锁线索',
        tone: 'primary',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0137'] },
            CAN_STILL_INVESTIGATE_CLUES,
            flag('dm_clue_beggar', 'falsy'),
          ],
        },
        effects: [
          openScene('scene_dm_chen_guyan_watchtower', 'QST-CITY-DAMING-BAJI'),
        ],
      },

      // 5) 第二幕兜底人物按钮：若在崇政殿点击贾昌朝亦可直接呈禀铁证
      {
        id: 'act_dm_present_to_jia_npc',
        label: '呈禀黄河断索铁证',
        badge: '铁锁奇案',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0028'] },
            atStep(QUEST_ID, 'present_to_jia'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'dm_jia_audience_done', value: true },
          { type: 'modifyRenown', delta: 20, reason: '大名府呈证揭破奸谋' },
          { type: 'modifyChivalry', delta: 20, reason: '铁证护河朔' },
          openScene('scene_dm_jia_court_trap', 'QST-CITY-DAMING-BAJI'),
        ],
      },

      // 6) 第二幕核心高潮：八角擂台寻【卢铁山】（NPC-0275）开启校场打擂立威
      {
        id: 'act_dm_lu_tieshan_leitai_start',
        label: '助八极门登八角擂台立威',
        badge: '校场试金',
        tone: 'primary',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0275'] },
            atStep(QUEST_ID, 'leitai_trial'),
          ],
        },
        effects: [
          openScene('scene_dm_leitai_bout1', 'QST-CITY-DAMING-BAJI'),
        ],
      },
    ],

    // ==================== 末层场景探查/闯关按钮（ContextInspectorCard） ====================
    spotActions: [
      // 1) 线索一场景探查：黄河铁索渡口 -> 镇河铁牛与横江铁索浮桥
      {
        id: 'spot_dm_inspect_ferry_chains',
        label: '勘验镇河铁索断口',
        badge: '铁锁线索',
        subtitle: '近察三根横江熟铁索断裂刃痕与河滩马蹄印迹',
        tone: 'primary',
        regionId: 'daming',
        buildingId: 'dm_ferry',
        spotId: 'dm_fr_chains',
        visibleWhen: {
          type: 'all',
          conditions: [
            CAN_STILL_INVESTIGATE_CLUES,
            flag('dm_clue_chain', 'falsy'),
          ],
        },
        effects: [
          openScene('scene_dm_ferry_chain_spot', 'QST-CITY-DAMING-BAJI'),
        ],
      },

      // 2) 线索二场景入口：大名府留守司衙（与找郭钧海等效互通，方便玩家在地区面板直接点击）
      {
        id: 'spot_dm_yamen_ledger_inspect',
        label: '核验春汛河防铁料黄册',
        badge: '铁锁线索',
        subtitle: '潜入留守司架阁库查验二十箱商胡埽生铁纲运底账',
        tone: 'jade',
        regionId: 'daming',
        buildingId: 'daming_base_yamen',
        spotId: null,
        visibleWhen: {
          type: 'all',
          conditions: [
            CAN_STILL_INVESTIGATE_CLUES,
            flag('dm_clue_ledger', 'falsy'),
          ],
        },
        effects: [
          openScene('scene_dm_yamen_spot_ledger', 'QST-CITY-DAMING-BAJI'),
        ],
      },

      // 3) 第二幕场景快捷按钮：八角比武擂台直接开启打擂立威
      {
        id: 'spot_dm_leitai_start_trial',
        label: '登八角擂台助八极门立威',
        badge: '校场试金',
        subtitle: '配合贾昌朝「敲山震虎」之计，迎战踢馆刺头与契丹铁林先锋',
        tone: 'gold',
        regionId: 'daming',
        buildingId: 'dm_drill',
        spotId: 'dm_dr_leitai',
        visibleWhen: atStep(QUEST_ID, 'leitai_trial'),
        effects: [
          toast('请与台畔【卢铁山】交谈点击【助八极门登八角擂台立威】，或立即开启擂台头阵！', 'talk', '校场试金'),
          openScene('scene_dm_leitai_spot_entry', 'QST-CITY-DAMING-BAJI'),
        ],
      },

      // 4) 第三幕白昼贴心等待动作：若白昼抵达沙盘阁，一键静候至当日戌/亥夜并直接切入终幕伏击！
      {
        id: 'spot_dm_sandtable_wait_until_night',
        label: '屏息敛气 · 静候至戌夜伏击',
        badge: '子夜收网',
        subtitle: '当前天色尚早，于阁外暗廊调息养神，待夜幕降临即刻合围辽谍',
        tone: 'gold',
        regionId: 'daming',
        buildingId: 'dm_palace',
        spotId: 'dm_pl_sandtable',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID, 'midnight_sandtable'),
            {
              type: 'shichenIn',
              indices: [2, 3, 4, 5, 6, 7, 8, 9],
              label: '白昼时段（寅时至酉时）',
            },
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'shichenIn', indices: [2, 3] },
            thenEffects: [{ type: 'advanceShichen', count: 8 }],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'shichenIn', indices: [4, 5] },
                thenEffects: [{ type: 'advanceShichen', count: 6 }],
                elseEffects: [
                  {
                    type: 'branch',
                    condition: { type: 'shichenIn', indices: [6, 7] },
                    thenEffects: [{ type: 'advanceShichen', count: 4 }],
                    elseEffects: [{ type: 'advanceShichen', count: 2 }],
                  },
                ],
              },
            ],
          },
          { type: 'healPlayer', hpPct: 50, mpPct: 50 },
          { type: 'setFlag', flag: 'dm_sandtable_ambush_started', value: true },
          openScene('scene_dm_midnight_sandtable_climax', 'QST-CITY-DAMING-BAJI'),
        ],
      },

      // 5) 第三幕夜间手动触发兜底按钮：若已在夜间（戌/亥/子/丑时）身处沙盘阁
      {
        id: 'spot_dm_sandtable_night_ambush',
        label: '潜上雕梁 · 开启沙盘阁夜战',
        badge: '终幕决战',
        subtitle: '夜色已深，内鬼周文焕与契丹铁林千夫长耶律裂山正潜近沙盘阁！',
        tone: 'danger',
        regionId: 'daming',
        buildingId: 'dm_palace',
        spotId: 'dm_pl_sandtable',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID, 'midnight_sandtable'),
            {
              type: 'shichenIn',
              indices: [10, 11, 0, 1],
            },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'dm_sandtable_ambush_started', value: true },
          openScene('scene_dm_midnight_sandtable_climax', 'QST-CITY-DAMING-BAJI'),
        ],
      },
    ],

    // ==================== 七日查案期限届满处理器 ====================
    onDeadlineExpired: {
      stepId: 'investigate_clues',
      effects: [
        { type: 'removeDynamicActor', questId: QUEST_ID },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0366' }, delta: -15 },
        {
          type: 'completeQuest',
          questId: QUEST_ID,
          outcome: 'failed_deadline',
        },
        openScene('scene_dm_deadline_failed', 'QST-CITY-DAMING-BAJI'),
      ],
    },
    loadScenes: () => import('./damingBajiQuest.scenes').then((m) => m.SCENES),
  },
]
