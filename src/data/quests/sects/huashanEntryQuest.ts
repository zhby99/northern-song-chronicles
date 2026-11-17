import type { QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, openScene } from '../../../engine/quest/dsl'

export const HUASHAN_ENTRY_QUEST_ID = 'QST-SECT-05-ENTRY'

export const HUASHAN_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_ENTRY_QUEST_ID,
    title: '云海孤棋 · 问剑西岳',
    category: 'sect_entry',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '不限境界（零武学凡人可全程通关）',
    recommendedNote:
      '全程零强制战斗，重在【尘世缘分】、【凡躯登三险抉择】与【博台残局 / 思过听风】纯脑力推演；高悟性或高棋艺/诗词/琴艺/策论可解锁灵光顿悟提示，陇右金环刀堂弟子亦可凭此机缘转投华山',
    startHint:
      '无门无派（或自陇右金环刀堂东进）时，前往【京兆府（长安）】偶遇秋雨茶棚孤弈老道结下松风棋缘',
    startLocation: {
      regionId: 'changan',
      customLabel: '京兆府（长安） · 明德门外秋雨茶棚',
    },
    startCondition: {
      type: 'all',
      conditions: [
        { type: 'notInAnySect', allowTransferFromSectId: 'SECT-28' },
        {
          type: 'not',
          condition: flag('shaolin_novice_state', 'eq', 'active'),
          reason: '少侠当前仍在少林寺挂单充任山门杂役',
        },
        qStatus(HUASHAN_ENTRY_QUEST_ID, 'not_started'),
      ],
    },
    summary:
      '不凭一拳一剑，唯问初心灵台：自长安秋雨茶棚拾起一枚松纹乌云残子结缘，以凡人之躯备粮徒步攀越华山千尺幢、百尺峡、苍龙岭三大奇险；再于绝顶博台勘破陈抟老祖《希夷三劫》残局、于思过崖蒙目听风并智退夜探细作，终在东峰朝阳紫气中受赐青钢长剑，列籍西岳华山门墙。',
    initialStepId: 'go_tongguan_foot',
    steps: {
      go_tongguan_foot: {
        id: 'go_tongguan_foot',
        title: '残子东行 · 叩访太华山麓',
        objective: '怀揣云台棋叟所赠【松纹乌云残子】，东行前往【潼关 / 西岳华山】山麓寻访守山剑客梁惊风。',
        nextHint: '徒步登华山三险须消耗干粮，建议随身备足至少 3 份干粮再入山。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_barbican',
          customLabel: '潼关 / 西岳华山 · 玉泉院山道口',
        },
      },
      climb_three_perils: {
        id: 'climb_three_perils',
        title: '凡躯登岳 · 徒步越三险',
        objective:
          '备齐至少 3 份随身干粮，在【潼关瓮城】找【梁惊风】或于【玉女峰紫霞道观】开启徒步攀越千尺幢、百尺峡、苍龙岭三险之试，登临紫霞观。',
        nextHint: '无内力与轻功护身，途中切忌贪快蛮行，当留心山岩借力与同路挑山百姓安危。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_terrace',
          customLabel: '西岳华山 · 千尺幢至玉女峰紫霞道观',
        },
      },
      botai_chess: {
        id: 'botai_chess',
        title: '第一关 · 绝顶博台破三劫',
        objective:
          '前往【华山绝顶论剑台 · 博台孤峰弈棋亭】，在掌门【岳沧溟】与【秦烈山】见证下连破陈抟老祖《希夷三劫》三手残局。',
        nextHint: '细读石亭柱上残铭诗意推演取舍；若悟性或棋艺/算术/经义高深，亦可触发灵台顿悟。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_chess',
          customLabel: '华山绝顶论剑台 · 博台孤峰弈棋亭',
        },
      },
      siguoya_vigil: {
        id: 'siguoya_vigil',
        title: '第二关 · 思过听风守寒崖',
        objective:
          '前往【思过崖古山洞 · 面壁思过寒风剑坪】找【宁清羽】接受蒙目听风辨剑考校，并独自在思过崖守夜至天明。',
        nextHint: '静辨呼吸与松涛相合之剑意，夜半遇险切记善借西风与洞口地形智取，万勿以肉身硬拼。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_siguoya',
          spotId: 'tg_sg_ledge',
          customLabel: '思过崖古山洞 · 面壁思过寒风剑坪',
        },
      },
      zixia_oath: {
        id: 'zixia_oath',
        title: '紫气东来 · 正气殿受青锋',
        objective:
          '双关皆破！拂晓返回【玉女峰紫霞道观 · 紫霞正气主殿】拜见掌门【岳沧溟】，立下华山三戒并领受青钢剑正式入门。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_hall',
          customLabel: '玉女峰紫霞道观 · 紫霞正气主殿',
        },
      },
    },

    locationTriggers: [
      // 1) 踏入京兆府（长安）自动触发秋雨茶棚孤叟棋缘
      {
        id: 'trig_hs_changan_rain_fate',
        regionId: 'changan',
        onceFlag: 'hs_changan_rain_seen',
        condition: {
          type: 'all',
          conditions: [
            { type: 'notInAnySect', allowTransferFromSectId: 'SECT-28' },
            {
              type: 'not',
              condition: flag('shaolin_novice_state', 'eq', 'active'),
            },
            qStatus(HUASHAN_ENTRY_QUEST_ID, 'not_started'),
          ],
        },
        effects: [openScene('scene_hs_01_changan_rain', 'QST-SECT-05-ENTRY')],
      },
      // 2) 怀揣乌云残子抵达潼关/西岳华山时自动触发山麓梁惊风验信物
      {
        id: 'trig_hs_arrive_tongguan_with_stone',
        regionId: 'tongguan',
        onceFlag: 'hs_tongguan_foot_seen',
        condition: {
          type: 'all',
          conditions: [
            atStep(HUASHAN_ENTRY_QUEST_ID, 'go_tongguan_foot'),
          ],
        },
        effects: [openScene('scene_hs_04_tongguan_foot', 'QST-SECT-05-ENTRY')],
      },
    ],

    spotActions: [
      // 1) 若曾在长安茶棚冷漠错过机缘，可在终南草堂临风观景轩拂叶拾棋补过结缘
      {
        id: 'spot_hs_redeem_rain_fate',
        label: '拂去石枰落叶 · 拾回泥缝残棋',
        badge: '西岳寻缘',
        subtitle: '补续明德门外错失的秋雨松风棋缘',
        tone: 'jade',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'notInAnySect', allowTransferFromSectId: 'SECT-28' },
            {
              type: 'not',
              condition: flag('shaolin_novice_state', 'eq', 'active'),
            },
            qStatus(HUASHAN_ENTRY_QUEST_ID, 'not_started'),
            flag('hs_rain_ignored', 'truthy'),
          ],
        },
        effects: [openScene('scene_hs_01c_regret_redeem', 'QST-SECT-05-ENTRY')],
      },
      // 2) 未结缘直奔紫霞道观叩门：体验“山门不迎无缘客”引导
      {
        id: 'spot_hs_knock_without_fate',
        label: '叩门求拜西岳华山门墙',
        badge: '山门问缘',
        subtitle: '尚未结下尘世松风因果，叩问紫霞山门',
        tone: 'default',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'notInAnySect', allowTransferFromSectId: 'SECT-28' },
            qStatus(HUASHAN_ENTRY_QUEST_ID, 'not_started'),
          ],
        },
        effects: [openScene('scene_hs_00_gate_no_fate', 'QST-SECT-05-ENTRY')],
      },
      // 3) 徒步攀登华山三大奇险（玉女峰紫霞道观入口处可直接发起）
      {
        id: 'spot_hs_climb_three_perils',
        label: '徒步攀越千尺幢 · 百尺峡 · 苍龙岭',
        badge: '凡躯登岳',
        subtitle: '须备足 ≥ 3 份随身干粮，不借轻功轿马一步步登临玉女峰',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: atStep(HUASHAN_ENTRY_QUEST_ID, 'climb_three_perils'),
        enabledWhen: { type: 'foodAtLeast', min: 3 },
        effects: [openScene('scene_hs_05_qianchizhuang', 'QST-SECT-05-ENTRY')],
      },
      // 4) 博台孤峰弈棋亭：直接点击景点亦可开启《希夷三劫》残局考校
      {
        id: 'spot_hs_botai_chess_trial',
        label: '入亭推演《希夷三劫》古残局',
        badge: '第一关 · 博台孤棋',
        subtitle: '连环三手生死取舍，纯凭心智棋理破局',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        visibleWhen: atStep(HUASHAN_ENTRY_QUEST_ID, 'botai_chess'),
        effects: [openScene('scene_hs_11_botai_pavilion', 'QST-SECT-05-ENTRY')],
      },
      // 5) 思过崖面壁寒风剑坪：直接点击景点开启蒙目听风与守夜考校
      {
        id: 'spot_hs_siguoya_listen_trial',
        label: '蒙目听风辨剑 · 独守思过寒崖',
        badge: '第二关 · 思过听风',
        subtitle: '辨松涛真剑意，并于子夜寒崖凭凡智退潜踪',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_ledge',
        visibleWhen: atStep(HUASHAN_ENTRY_QUEST_ID, 'siguoya_vigil'),
        effects: [openScene('scene_hs_16_blindfold_swords', 'QST-SECT-05-ENTRY')],
      },
    ],

    npcActions: [
      // 1) 无缘时向高沧云或岳沧溟求拜：礼貌婉拒并指点长安秋雨棋缘
      {
        id: 'act_hs_no_fate_inquire',
        label: '叩请拜入西岳华山门墙',
        badge: '山门问缘',
        tone: 'default',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0166', 'NPC-0202'] },
            { type: 'notInAnySect', allowTransferFromSectId: 'SECT-28' },
            qStatus(HUASHAN_ENTRY_QUEST_ID, 'not_started'),
          ],
        },
        effects: [openScene('scene_hs_00_gate_no_fate', 'QST-SECT-05-ENTRY')],
      },
      // 2) 在长安向苏秋桃或封不弃打听西岳棋缘（兜底手动开启入口）
      {
        id: 'act_hs_changan_seek_fate',
        label: '请教西岳松风棋缘（赴南门茶棚避雨）',
        badge: '西岳寻缘',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0285', 'NPC-0167'] },
            { type: 'notInAnySect', allowTransferFromSectId: 'SECT-28' },
            {
              type: 'not',
              condition: flag('shaolin_novice_state', 'eq', 'active'),
            },
            qStatus(HUASHAN_ENTRY_QUEST_ID, 'not_started'),
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: flag('hs_rain_ignored', 'truthy'),
            thenEffects: [openScene('scene_hs_01c_regret_redeem', 'QST-SECT-05-ENTRY')],
            elseEffects: [openScene('scene_hs_01_changan_rain', 'QST-SECT-05-ENTRY')],
          },
        ],
      },
      // 3) 找潼关梁惊风呈验乌云残子 / 启程徒步登华山三险
      {
        id: 'act_hs_liang_verify_or_climb',
        label: '出示【松纹乌云残子】 · 徒步登越华山三险',
        badge: '凡躯登岳',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0203', 'NPC-0202'] },
            {
              type: 'any',
              conditions: [
                atStep(HUASHAN_ENTRY_QUEST_ID, 'go_tongguan_foot'),
                atStep(HUASHAN_ENTRY_QUEST_ID, 'climb_three_perils'),
              ],
            },
          ],
        },
        enabledWhen: {
          type: 'any',
          conditions: [
            atStep(HUASHAN_ENTRY_QUEST_ID, 'go_tongguan_foot'),
            { type: 'foodAtLeast', min: 3 },
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: atStep(HUASHAN_ENTRY_QUEST_ID, 'go_tongguan_foot'),
            thenEffects: [openScene('scene_hs_04_tongguan_foot', 'QST-SECT-05-ENTRY')],
            elseEffects: [openScene('scene_hs_05_qianchizhuang', 'QST-SECT-05-ENTRY')],
          },
        ],
      },
      // 4) 找岳沧溟或秦烈山开启第一关《希夷三劫》博台残局
      {
        id: 'act_hs_botai_chess_npc',
        label: '应考第一关 · 推演博台《希夷三劫》残局',
        badge: '博台孤棋',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0147', 'NPC-0427'] },
            atStep(HUASHAN_ENTRY_QUEST_ID, 'botai_chess'),
          ],
        },
        effects: [openScene('scene_hs_11_botai_pavilion', 'QST-SECT-05-ENTRY')],
      },
      // 5) 找宁清羽开启第二关【思过崖蒙目听风与守夜】
      {
        id: 'act_hs_siguoya_listen_npc',
        label: '应考第二关 · 思过崖蒙目听风与寒夜守山',
        badge: '思过听风',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0166', 'NPC-0371', 'NPC-0375'] },
            atStep(HUASHAN_ENTRY_QUEST_ID, 'siguoya_vigil'),
          ],
        },
        effects: [openScene('scene_hs_16_blindfold_swords', 'QST-SECT-05-ENTRY')],
      },
      // 6) 双关破局后返回紫霞正气主殿找岳沧溟或宁清羽受剑入宗
      {
        id: 'act_hs_zixia_oath_join',
        label: '叩入紫霞主殿 · 立华山三戒受赐青钢剑',
        badge: '紫气授剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0166', 'NPC-0202'] },
            atStep(HUASHAN_ENTRY_QUEST_ID, 'zixia_oath'),
          ],
        },
        effects: [openScene('scene_hs_20_zixia_dawn', 'QST-SECT-05-ENTRY')],
      },
    ],
    loadScenes: () => import('./huashanEntryQuest.scenes').then((m) => m.SCENES),
  },
]
