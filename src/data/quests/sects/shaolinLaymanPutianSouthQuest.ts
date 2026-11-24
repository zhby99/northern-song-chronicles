import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q19_QUEST_ID = 'QST-SECT-01-19'

export const SHAOLIN_Q19_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-18', 'completed'),
    qStatus(SHAOLIN_Q19_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 210 },
    { type: 'skillAtLeast', key: '经义', min: 62 },
    { type: 'skillAtLeast', key: '书', min: 40 },
    { type: 'npcAlive', npcId: 'NPC-0124', npcName: '元苦' },
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
  ],
}

export const SHAOLIN_Q19_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q19_QUEST_ID,
    title: '莆田南渡 · 南北少林',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'nanshaolin',
    recommendedRealm: '二流上品',
    maxOpponentRealm: '二流上品（东瀛海寇头目 · 鬼丸浪人）',
    recommendedNote:
      '嵩山少林寺 Lv.2 俗家护法脉第三回历练（全十三幕）。须入寺满 210 日、完成洛阳护镖历练且经义 ≥ 62、书 ≥ 40。奉玄痛长老之命携嵩山法帖与《龙爪手》千里南渡莆田南少林，于九莲山自定禅礼谦让或刚猛立威闯过铁桥硬马三关；夜赴闽海官盐场可择火攻滩舟、身法潜行截哨或正面血战斩杀东瀛海寇鬼丸浪人，终使元苦大师破格双授《盘山铁布衫（大成）》与《铁线拳》！',
    startHint:
      '完成《洛阳护镖 · 金刀少林》、入寺满 210 日且经义 ≥ 62、书 ≥ 40 后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊】（或寻玄痛长老）即可领受嵩山法帖南渡莆田。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_east',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊',
    },
    startCondition: SHAOLIN_Q19_START_CONDITION,
    summary:
      '{reignYear}暮春，嵩山戒律长老【玄痛】于【十八铜人木桩廊】托付《南北禅武同源法帖》，行前破例传授北宗擒拿绝技《龙爪手》，命你千里南渡福建路【莆田南少林】拜会铜身罗汉【元苦】。初抵【九莲山门演武坪】，你以北宗龙爪手闯过戒铁、戒磐守山铁桥硬马关赢得敬重。适逢东瀛海寇头目【鬼丸浪人】夜袭兴化海滨官盐场，你与南宗武僧并肩驰援——或算准潮汐火攻海寇滩舟、或凭身法潜行点穴截哨、亦或正面血战盐滩，终在火光中阵斩鬼丸浪人并安抚盐民！凯旋【大雄正殿 · 佛前蒲团】后，元苦大师打破门户之见，亲授南宗镇派绝学《盘山铁布衫（大成）》与《铁线拳》！',
    initialStepId: 'jiulian_three_gates',
    steps: {
      jiulian_three_gates: {
        id: 'jiulian_three_gates',
        title: '千里南渡 · 九莲闯关',
        objective:
          '已领受玄痛长老托付的嵩山法帖与《龙爪手》要诀。请千里南下福建路，前往【莆田南少林 · 九莲木人巷 · 九莲山门演武坪（nsl_wooden_west）】呈递法帖，闯过南宗守山武僧铁桥硬马三关！',
        nextHint:
          '前往【莆田南少林 · 九莲木人巷 · 九莲山门演武坪（nsl_wooden_west）】，点击「呈递嵩山法帖 · 闯南宗铁桥硬马三关」。',
        targetLocation: {
          regionId: 'nanshaolin',
          buildingId: 'nsl_wooden',
          spotId: 'nsl_wooden_west',
          customLabel: '莆田南少林 · 九莲木人巷 · 九莲山门演武坪',
        },
      },
      saltfield_night_raid: {
        id: 'saltfield_night_raid',
        title: '盐场烽火 · 夜斩海寇',
        objective:
          '你已闯过九莲山铁桥硬马关赢得南宗敬重！恰逢东瀛海寇头目「鬼丸浪人」趁夜洗劫兴化海滨官盐场，速赴【莆田南少林 · 大雄宝殿 · 钟鼓禅院 · 演武坪（nsl_main_west）】与元苦大师会师驰援盐场！',
        nextHint:
          '前往【莆田南少林 · 大雄宝殿 · 钟鼓禅院 · 演武坪（nsl_main_west）】，点击「随南宗武僧驰援海滨盐场 · 夜斩鬼丸浪人」。',
        targetLocation: {
          regionId: 'nanshaolin',
          buildingId: 'nsl_main',
          spotId: 'nsl_main_west',
          customLabel: '莆田南少林 · 大雄宝殿 · 钟鼓禅院 · 演武坪',
        },
      },
      yuanku_confer: {
        id: 'yuanku_confer',
        title: '南北同源 · 元苦双授',
        objective:
          '海滨盐场一战已阵斩东瀛海寇头目鬼丸浪人、救全满场灶户！请赴【莆田南少林 · 大雄宝殿 · 大雄正殿 · 佛前蒲团（nsl_main_main）】拜见铜身罗汉元苦大师，共叙南北少林情谊并领受南宗双绝！',
        nextHint:
          '前往【莆田南少林 · 大雄宝殿 · 大雄正殿 · 佛前蒲团（nsl_main_main）】，点击「拜见铜身罗汉元苦 · 领受南北少林绝学」。',
        targetLocation: {
          regionId: 'nanshaolin',
          buildingId: 'nsl_main',
          spotId: 'nsl_main_main',
          customLabel: '莆田南少林 · 大雄宝殿 · 大雄正殿 · 佛前蒲团',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq19_start_luohan',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        onceFlag: 'sl_q19_start_triggered',
        condition: SHAOLIN_Q19_START_CONDITION,
        effects: [openScene('scene_slq19_01', SHAOLIN_Q19_QUEST_ID)],
      },
      {
        id: 'trig_slq19_jiulian',
        regionId: 'nanshaolin',
        buildingId: 'nsl_wooden',
        spotId: 'nsl_wooden_west',
        onceFlag: 'sl_q19_jiulian_triggered',
        condition: atStep(SHAOLIN_Q19_QUEST_ID, 'jiulian_three_gates'),
        effects: [openScene('scene_slq19_02', SHAOLIN_Q19_QUEST_ID)],
      },
      {
        id: 'trig_slq19_saltfield',
        regionId: 'nanshaolin',
        buildingId: 'nsl_main',
        spotId: 'nsl_main_west',
        onceFlag: 'sl_q19_saltfield_triggered',
        condition: atStep(SHAOLIN_Q19_QUEST_ID, 'saltfield_night_raid'),
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q19_boss_intro_seen', op: 'truthy' },
            thenEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q19_raid_tactic', op: 'eq', value: 'frontal' },
                thenEffects: [openScene('scene_slq19_10', SHAOLIN_Q19_QUEST_ID)],
                elseEffects: [openScene('scene_slq19_09', SHAOLIN_Q19_QUEST_ID)],
              },
            ],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q19_vanguard_cleared', op: 'truthy' },
                thenEffects: [openScene('scene_slq19_08', SHAOLIN_Q19_QUEST_ID)],
                elseEffects: [
                  {
                    type: 'branch',
                    condition: { type: 'flag', flag: 'sl_q19_raid_tactic', op: 'eq', value: 'frontal' },
                    thenEffects: [openScene('scene_slq19_07', SHAOLIN_Q19_QUEST_ID)],
                    elseEffects: [openScene('scene_slq19_04', SHAOLIN_Q19_QUEST_ID)],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'trig_slq19_yuanku',
        regionId: 'nanshaolin',
        buildingId: 'nsl_main',
        spotId: 'nsl_main_main',
        onceFlag: 'sl_q19_yuanku_triggered',
        condition: atStep(SHAOLIN_Q19_QUEST_ID, 'yuanku_confer'),
        effects: [openScene('scene_slq19_12', SHAOLIN_Q19_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq19_start',
        label: '【俗家护法】领受玄痛法帖与《龙爪手》 · 启程南渡莆田',
        badge: '莆田南渡',
        subtitle: '十八铜人木桩廊 · 携嵩山法帖赴南少林通好',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        visibleWhen: SHAOLIN_Q19_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q19_start_triggered', value: true },
          openScene('scene_slq19_01', SHAOLIN_Q19_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq19_jiulian',
        label: '【俗家护法】呈递嵩山法帖 · 闯南宗铁桥硬马三关',
        badge: '九莲三关',
        subtitle: '九莲山门演武坪 · 禅礼谦让或刚猛立威以武会友',
        tone: 'danger',
        regionId: 'nanshaolin',
        buildingId: 'nsl_wooden',
        spotId: 'nsl_wooden_west',
        visibleWhen: atStep(SHAOLIN_Q19_QUEST_ID, 'jiulian_three_gates'),
        effects: [
          { type: 'setFlag', flag: 'sl_q19_jiulian_triggered', value: true },
          openScene('scene_slq19_02', SHAOLIN_Q19_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq19_saltfield',
        label: '【俗家护法】随南宗武僧驰援海滨盐场 · 夜斩鬼丸浪人',
        badge: '盐场夜战',
        subtitle: '火攻滩舟、潜行截哨或正面血战 · 斩杀东瀛海寇',
        tone: 'danger',
        regionId: 'nanshaolin',
        buildingId: 'nsl_main',
        spotId: 'nsl_main_west',
        visibleWhen: atStep(SHAOLIN_Q19_QUEST_ID, 'saltfield_night_raid'),
        effects: [
          { type: 'setFlag', flag: 'sl_q19_saltfield_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q19_boss_intro_seen', op: 'truthy' },
            thenEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q19_raid_tactic', op: 'eq', value: 'frontal' },
                thenEffects: [openScene('scene_slq19_10', SHAOLIN_Q19_QUEST_ID)],
                elseEffects: [openScene('scene_slq19_09', SHAOLIN_Q19_QUEST_ID)],
              },
            ],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q19_vanguard_cleared', op: 'truthy' },
                thenEffects: [openScene('scene_slq19_08', SHAOLIN_Q19_QUEST_ID)],
                elseEffects: [
                  {
                    type: 'branch',
                    condition: { type: 'flag', flag: 'sl_q19_raid_tactic', op: 'eq', value: 'frontal' },
                    thenEffects: [openScene('scene_slq19_07', SHAOLIN_Q19_QUEST_ID)],
                    elseEffects: [openScene('scene_slq19_04', SHAOLIN_Q19_QUEST_ID)],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'spot_slq19_yuanku',
        label: '【俗家护法】拜见铜身罗汉元苦 · 领受南北少林绝学',
        badge: '南北同源',
        subtitle: '大雄正殿佛前蒲团 · 破格双授《盘山铁布衫（大成）》与《铁线拳》',
        tone: 'gold',
        regionId: 'nanshaolin',
        buildingId: 'nsl_main',
        spotId: 'nsl_main_main',
        visibleWhen: atStep(SHAOLIN_Q19_QUEST_ID, 'yuanku_confer'),
        effects: [
          { type: 'setFlag', flag: 'sl_q19_yuanku_triggered', value: true },
          openScene('scene_slq19_12', SHAOLIN_Q19_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq19_start_npc',
        label: '拜见玄痛长老 · 领受南渡莆田法帖与《龙爪手》',
        badge: '莆田南渡',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0156'] },
            SHAOLIN_Q19_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q19_start_triggered', value: true },
          openScene('scene_slq19_01', SHAOLIN_Q19_QUEST_ID),
        ],
      },
      {
        id: 'act_slq19_yuanku_npc',
        label: '呈递嵩山法帖 · 拜谢元苦大师破格授艺',
        badge: '南北同源',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0124'] },
            atStep(SHAOLIN_Q19_QUEST_ID, 'yuanku_confer'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q19_yuanku_triggered', value: true },
          openScene('scene_slq19_12', SHAOLIN_Q19_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLaymanPutianSouthQuest.scenes').then((m) => m.SCENES),
  },
]
