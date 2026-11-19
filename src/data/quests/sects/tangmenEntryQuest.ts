import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, openScene } from '../../../engine/quest/dsl'

export const TANGMEN_ENTRY_QUEST_ID = 'QST-SECT-13-ENTRY'

export const TANGMEN_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'neverJoinedAnySect' },
    { type: 'noLearnedArtAtOrAboveTier', tier: '良品下品' },
    flag('shaolin_novice_state', 'eq', 'none'),
    flag('tm_permanently_rejected', 'falsy'),
    { type: 'npcAlive', npcId: 'NPC-0149', npcName: '唐无影' },
    { type: 'npcAlive', npcId: 'NPC-0125', npcName: '唐鹤轩' },
    { type: 'npcAlive', npcId: 'NPC-0175', npcName: '唐天镖' },
    { type: 'npcAlive', npcId: 'NPC-0218', npcName: '唐千机' },
    { type: 'npcAlive', npcId: 'NPC-0219', npcName: '唐红袖' },
    { type: 'npcAlive', npcId: 'NPC-0670', npcName: '唐艮' },
    { type: 'npcAlive', npcId: 'NPC-0316', npcName: '苏百草' },
    qStatus(TANGMEN_ENTRY_QUEST_ID, 'not_started'),
  ],
}

export const TANGMEN_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: TANGMEN_ENTRY_QUEST_ID,
    title: '川药血引 · 万毒试药',
    category: 'sect_entry',
    factionId: 'SECT-13',
    regionId: 'qingcheng',
    recommendedRealm: '不入流 ～ 三流下品（须从未入过他派且未修习良品及以上武学）',
    maxOpponentRealm: '三流下品（苗疆掉包毒贩、五毒蛊师蓝蝎子与神行客唐艮试镖）',
    recommendedNote:
      '十二幕蜀中唐门白纸入门长卷：唐家堡严防他派细作，只纳从未加入过任何门派、且未修习良品及以上武学的白纸外姓！于成都西川百草药武堂识破苗疆毒枭掉包奇毒、以生面孔诱擒毒贩，西赴唐门万毒试炼涧五彩瘴潭以身试药修成凡品《唐门闭毒养气功》并截杀盗药蛊师，再入天机机关阁梅花桩习凡品《甩手袖箭》通过试镖与铜案保密铁律考校（私拓草图即被刑堂逐出永绝唐门），终登千簧八角总阁在唐无影与唐鹤轩座前择【天机机括房】或【万毒百草房】立契入籍外宅门客、受传《毒蒺藜散手》！',
    startHint:
      '从未加入过任何门派且未学良品及以上武学时，前往【成都府 · 西川百草药武堂】（或与唐红袖 / 唐天镖交谈）即可触发乌头血引风波。',
    startLocation: {
      regionId: 'chengdu',
      buildingId: 'cd_baicao',
      spotId: 'cd_baicao_east',
      customLabel: '成都府 · 西川百草药武堂（千味川药晾晒廊）',
    },
    startCondition: TANGMEN_START_CONDITION,
    summary:
      '{reignYear}成都药市暗流涌动，蜀中唐门密订的「雪山紫乌头」在【西川百草药武堂】交割时遭苗疆黑市毒枭掉包并掺入尸蟾奇毒。刑堂大长老【唐天镖】与「毒观音」【唐红袖】封锁药廊，看中你从未入过他派、亦无良品杂学烙印的白纸生面孔，命你拎药篓诱擒潜伏街口的毒贩「麻蛇老七」。随后你持乌木毒砂牌西赴【唐门万毒试炼涧】，吞半粒试瘴丸浸入五彩毒瘴灵潭熬炼脏腑，修成凡品内功《唐门闭毒养气功》，并截杀偷运原箱乌头的蛊师「蓝蝎子」。复入【唐家堡天机机关阁 > 梅花桩百靶试镖院】随「机括鬼手」【唐千机】习得凡品暗器《甩手袖箭》，胜过【唐艮】试镖且在铜案残图诱惑前谨守唐门保密铁律，终登【天机千簧八角总阁】在当代家主【唐无影】与天机老祖【唐鹤轩】座前择房立契，受传《毒蒺藜散手》入籍蜀中唐门！',
    initialStepId: 'baicao_poison_swap',
    steps: {
      baicao_poison_swap: {
        id: 'baicao_poison_swap',
        title: '川药血引 · 药廊诱擒毒贩',
        objective:
          '在【成都府 · 西川百草药武堂 > 千味川药晾晒廊】配合唐门「毒观音」唐红袖与刑堂大长老唐天镖，以生面孔诱出并制住掉包雪山紫乌头的苗疆毒贩。',
        nextHint: '进入【成都府 · 西川百草药武堂】（或与唐红袖 / 唐天镖 / 苏百草交谈）推进。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'cd_baicao',
          spotId: 'cd_baicao_east',
          customLabel: '成都府 > 西川百草药武堂 > 千味川药晾晒廊',
        },
      },
      wandu_pool_trial: {
        id: 'wandu_pool_trial',
        title: '万毒灵潭 · 以身试药截蛊师',
        objective:
          '已获唐红袖赐予乌木毒砂牌！请西赴【青城山 / 唐家堡 > 唐门万毒试炼涧 > 五彩毒瘴幽泉灵潭】吞服试瘴丸入潭修习《唐门闭毒养气功》，并截住潜入后涧接应赃药的苗疆蛊师。',
        nextHint: '前往【青城山 / 唐家堡】进入【唐门万毒试炼涧 > 五彩毒瘴幽泉灵潭】。',
        targetLocation: {
          regionId: 'qingcheng',
          buildingId: 'qc_poison',
          spotId: 'qc_ps_pool',
          customLabel: '青城山 / 唐家堡 > 唐门万毒试炼涧 > 五彩毒瘴幽泉灵潭',
        },
      },
      tianji_meihuazhuang: {
        id: 'tianji_meihuazhuang',
        title: '梅花百靶 · 机括试镖守天机',
        objective:
          '已修成《唐门闭毒养气功》并夺回雪山紫乌头！请前往【唐家堡天机机关阁 > 梅花桩百靶试镖院】拜见「机括鬼手」【唐千机】，习得《甩手袖箭》并接下梅花桩试镖考校。',
        nextHint: '前往【唐家堡天机机关阁 > 梅花桩百靶试镖院】（或与唐千机 / 唐艮交谈）。',
        targetLocation: {
          regionId: 'qingcheng',
          buildingId: 'qc_tang',
          spotId: 'qc_tg_arena',
          customLabel: '青城山 / 唐家堡 > 唐家堡天机机关阁 > 梅花桩百靶试镖院',
        },
      },
      qianhuang_tower_oath: {
        id: 'qianhuang_tower_oath',
        title: '千簧总阁 · 择房立契入唐门',
        objective:
          '梅花桩试镖与铜案守密双关皆过！请登临【唐家堡天机机关阁 > 天机千簧八角总阁】觐见当代家主【唐无影】与天机老祖【唐鹤轩】，择定【天机机括房】或【万毒百草房】立契入籍。',
        nextHint: '前往【唐家堡天机机关阁 > 天机千簧八角总阁】（或与唐无影 / 唐鹤轩交谈）。',
        targetLocation: {
          regionId: 'qingcheng',
          buildingId: 'qc_tang',
          spotId: 'qc_tg_tower',
          customLabel: '青城山 / 唐家堡 > 唐家堡天机机关阁 > 天机千簧八角总阁',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_tm_baicao_start',
        regionId: 'chengdu',
        buildingId: 'cd_baicao',
        onceFlag: 'tm_entry_triggered',
        condition: TANGMEN_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'tm_entry_triggered', value: true },
          { type: 'startQuest', questId: TANGMEN_ENTRY_QUEST_ID, stepId: 'baicao_poison_swap', silent: true },
          openScene('SCENE_TM_01_BAICAO_SWAP', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_tm_wandu_pool',
        regionId: 'qingcheng',
        buildingId: 'qc_poison',
        spotId: 'qc_ps_pool',
        onceFlag: 'tm_wandu_seen',
        condition: atStep(TANGMEN_ENTRY_QUEST_ID, 'wandu_pool_trial'),
        effects: [
          { type: 'setFlag', flag: 'tm_wandu_seen', value: true },
          openScene('SCENE_TM_04_WANDU_MIASMA', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_tm_meihua_arena',
        regionId: 'qingcheng',
        buildingId: 'qc_tang',
        spotId: 'qc_tg_arena',
        onceFlag: 'tm_meihua_seen',
        condition: atStep(TANGMEN_ENTRY_QUEST_ID, 'tianji_meihuazhuang'),
        effects: [
          { type: 'setFlag', flag: 'tm_meihua_seen', value: true },
          openScene('SCENE_TM_07_QIANJI_SLEEVE_DART', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_tm_qianhuang_tower',
        regionId: 'qingcheng',
        buildingId: 'qc_tang',
        spotId: 'qc_tg_tower',
        onceFlag: 'tm_tower_seen',
        condition: atStep(TANGMEN_ENTRY_QUEST_ID, 'qianhuang_tower_oath'),
        effects: [
          { type: 'setFlag', flag: 'tm_tower_seen', value: true },
          openScene('SCENE_TM_11_TOWER_BRANCH_CHOICE', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
    ],
    spotActions: [
      {
        id: 'spot_act_tm_baicao_start',
        regionId: 'chengdu',
        buildingId: 'cd_baicao',
        spotId: 'cd_baicao_east',
        label: '千味晾晒廊 · 查验紫乌头掉包毒烟',
        badge: '唐门入门',
        tone: 'gold',
        visibleWhen: TANGMEN_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'tm_entry_triggered', value: true },
          { type: 'startQuest', questId: TANGMEN_ENTRY_QUEST_ID, stepId: 'baicao_poison_swap', silent: true },
          openScene('SCENE_TM_01_BAICAO_SWAP', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_act_tm_baicao_resume',
        regionId: 'chengdu',
        buildingId: 'cd_baicao',
        spotId: 'cd_baicao_east',
        label: '药廊后巷 · 拎篓诱擒掉包毒贩',
        badge: '川药血引',
        tone: 'gold',
        visibleWhen: atStep(TANGMEN_ENTRY_QUEST_ID, 'baicao_poison_swap'),
        effects: [openScene('SCENE_TM_01_BAICAO_SWAP', TANGMEN_ENTRY_QUEST_ID)],
      },
      {
        id: 'spot_act_tm_wandu_pool',
        regionId: 'qingcheng',
        buildingId: 'qc_poison',
        spotId: 'qc_ps_pool',
        label: '五彩毒瘴潭 · 吞丸试药修闭毒功',
        badge: '万毒试药',
        tone: 'jade',
        visibleWhen: atStep(TANGMEN_ENTRY_QUEST_ID, 'wandu_pool_trial'),
        effects: [
          { type: 'setFlag', flag: 'tm_wandu_seen', value: true },
          openScene('SCENE_TM_04_WANDU_MIASMA', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_act_tm_meihua_arena',
        regionId: 'qingcheng',
        buildingId: 'qc_tang',
        spotId: 'qc_tg_arena',
        label: '梅花桩百靶院 · 拜见唐千机试袖箭',
        badge: '天机试镖',
        tone: 'gold',
        visibleWhen: atStep(TANGMEN_ENTRY_QUEST_ID, 'tianji_meihuazhuang'),
        effects: [
          { type: 'setFlag', flag: 'tm_meihua_seen', value: true },
          openScene('SCENE_TM_07_QIANJI_SLEEVE_DART', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_act_tm_qianhuang_tower',
        regionId: 'qingcheng',
        buildingId: 'qc_tang',
        spotId: 'qc_tg_tower',
        label: '天机千簧总阁 · 觐见唐无影与唐鹤轩',
        badge: '择房入堡',
        tone: 'gold',
        visibleWhen: atStep(TANGMEN_ENTRY_QUEST_ID, 'qianhuang_tower_oath'),
        effects: [
          { type: 'setFlag', flag: 'tm_tower_seen', value: true },
          openScene('SCENE_TM_11_TOWER_BRANCH_CHOICE', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'act_tm_chengdu_start',
        label: '呈验白纸身家 · 涉险追查唐门奇毒掉包案',
        badge: '唐门入门',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0219', 'NPC-0175', 'NPC-0316'] },
            TANGMEN_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tm_entry_triggered', value: true },
          {
            type: 'teleportPlayer',
            regionId: 'chengdu',
            buildingId: 'cd_baicao',
            spotId: 'cd_baicao_east',
          },
          { type: 'startQuest', questId: TANGMEN_ENTRY_QUEST_ID, stepId: 'baicao_poison_swap', silent: true },
          openScene('SCENE_TM_01_BAICAO_SWAP', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_tm_baicao_resume',
        label: '续行药廊诱擒苗疆掉包毒贩',
        badge: '川药血引',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0219', 'NPC-0175', 'NPC-0316'] },
            atStep(TANGMEN_ENTRY_QUEST_ID, 'baicao_poison_swap'),
          ],
        },
        effects: [
          {
            type: 'teleportPlayer',
            regionId: 'chengdu',
            buildingId: 'cd_baicao',
            spotId: 'cd_baicao_east',
          },
          openScene('SCENE_TM_01_BAICAO_SWAP', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_tm_wandu_resume',
        label: '五彩毒瘴灵潭 · 吞丸试药筑基',
        badge: '万毒试药',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0628', 'NPC-0750'] },
            atStep(TANGMEN_ENTRY_QUEST_ID, 'wandu_pool_trial'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tm_wandu_seen', value: true },
          openScene('SCENE_TM_04_WANDU_MIASMA', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_tm_meihua_resume',
        label: '梅花桩百靶院 · 请受袖箭试镖考校',
        badge: '天机试镖',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0218', 'NPC-0670'] },
            atStep(TANGMEN_ENTRY_QUEST_ID, 'tianji_meihuazhuang'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tm_meihua_seen', value: true },
          openScene('SCENE_TM_07_QIANJI_SLEEVE_DART', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_tm_tower_resume',
        label: '千簧总阁觐见 · 择房立契入籍唐门',
        badge: '择房入堡',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0149', 'NPC-0125'] },
            atStep(TANGMEN_ENTRY_QUEST_ID, 'qianhuang_tower_oath'),
          ],
        },
        effects: [
          {
            type: 'teleportPlayer',
            regionId: 'qingcheng',
            buildingId: 'qc_tang',
            spotId: 'qc_tg_tower',
          },
          { type: 'setFlag', flag: 'tm_tower_seen', value: true },
          openScene('SCENE_TM_11_TOWER_BRANCH_CHOICE', TANGMEN_ENTRY_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./tangmenEntryQuest.scenes').then((m) => m.SCENES),
  },
]
