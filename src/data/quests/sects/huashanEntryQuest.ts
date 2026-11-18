import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, openScene } from '../../../engine/quest/dsl'

export const HUASHAN_ENTRY_QUEST_ID = 'QST-SECT-05-ENTRY'

export const HUASHAN_ENTRY_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'neverJoinedAnySect' },
    { type: 'noLearnedArtAtOrAboveTier', tier: '良品下品' },
    flag('shaolin_novice_state', 'eq', 'none'),
    flag('hs_permanently_rejected', 'falsy'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    qStatus(HUASHAN_ENTRY_QUEST_ID, 'not_started'),
  ],
}

export const HUASHAN_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_ENTRY_QUEST_ID,
    title: '西岳问道 · 剑气淬锋',
    category: 'sect_entry',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '不入流 ～ 三流下品（须从未入过他派且未修习良品及以上武学）',
    maxOpponentRealm: '三流下品（潼关劫匪、同门试锋与关中马贼头目）',
    recommendedNote:
      '十五幕华山剑派入门长卷：西岳华山严守门户，只收从未加入过任何门派、且未修习良品及以上武学的白纸弟子！历长安验纸、潼关退匪、千尺苍龙三险救人、玉女峰授《华山基础心法》与《华山剑法（入门十二式）》、绝顶博台试剑、思过外坪朔风练剑（后洞石刻秘室封锁不可入）、潼关斩寇护粮，终登紫霞正气主殿答过岳沧溟零提示问剑（答错永绝山门）赐剑入门！',
    startHint:
      '从未加入过任何门派且未学良品及以上武学时，前往【京兆府（长安）】步入即遇封不弃验纸启程（或寻华山宿老请益）。',
    startLocation: {
      regionId: 'changan',
      customLabel: '京兆府（长安） · 明德门外秋雨茶棚',
    },
    startCondition: HUASHAN_ENTRY_START_CONDITION,
    summary:
      '{reignYear}长安明德门外秋雨茶棚，华山宿老【封不弃】验明你从未投身他派、亦无良品及以上武学杂念，丢下一枚玄铁剑令。你东行【潼关天险瓮城】山道以凡躯击退劫匪，随后攀越千尺幢、百尺峡、苍龙岭三险并在绝壁拉绳救下坠崖挑山工。于【玉女峰紫霞道观】得【宁清羽】亲授《华山基础心法》与《华山剑法（入门十二式）》，复于【华山绝顶论剑台】与同门实战试锋。在【思过崖古山洞 · 面壁思过寒风剑坪】外坪迎风苦练后（后洞古剑刻石室重石深锁未启），接报关中马贼洗劫运粮车队，持剑下山斩杀贼首夺回粮车。终在朝阳紫气中登【紫霞正气主殿】，答过掌门【岳沧溟】四选一零提示问剑，获赐青钢剑拜入华山派！',
    initialStepId: 'tongguan_bandits',
    steps: {
      tongguan_bandits: {
        id: 'tongguan_bandits',
        title: '潼关退匪 · 绝壁登险',
        objective:
          '已接过封不弃的玄铁剑令。请东赴【潼关 / 西岳华山 · 潼关天险瓮城】，击退截路劫匪并攀越千尺幢、百尺峡、苍龙岭三险登上玉女峰！',
        nextHint: '前往【潼关 / 西岳华山】进入【潼关天险瓮城】触发山道退匪与登险。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_barbican',
        },
      },
      zixia_foundation: {
        id: 'zixia_foundation',
        title: '玉女前庭 · 授剑筑基',
        objective:
          '已过华山三险并救下挑山工。请前往【玉女峰紫霞道观】外坪拜见【宁清羽】，领受华山筑基心法与十二式入门剑法！',
        nextHint: '进入【玉女峰紫霞道观】点击外坪（或与宁清羽交谈）。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_terrace',
        },
      },
      summit_spar: {
        id: 'summit_spar',
        title: '绝顶博台 · 论剑试锋',
        objective:
          '已习得《华山基础心法》与《华山剑法（入门十二式）》。请登临【华山绝顶论剑台 · 博台孤峰弈棋亭】，拜见掌门【岳沧溟】与【秦烈山】并拔剑试锋！',
        nextHint: '前往【华山绝顶论剑台】博台弈棋亭触发论剑与同门切磋。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_chess',
        },
      },
      siguoya_and_tongguan_raid: {
        id: 'siguoya_and_tongguan_raid',
        title: '思过外坪 · 潼关斩寇',
        objective:
          '论剑台切磋胜出！请前往【思过崖古山洞 · 面壁思过寒风剑坪】外坪迎风苦练（后洞石室深锁勿闯），随后下山截杀洗劫粮车的关中马贼头目！',
        nextHint: '前往【思过崖古山洞】点击【面壁思过寒风剑坪】。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_siguoya',
          spotId: 'tg_sg_ledge',
        },
      },
      zixia_oath: {
        id: 'zixia_oath',
        title: '紫气东来 · 太岳问剑',
        objective:
          '潼关斩寇护粮凯旋！请于拂晓步入【玉女峰紫霞道观 · 紫霞正气主殿】，面见掌门【岳沧溟】答过太岳问剑，领受青钢剑正式入门！',
        nextHint: '前往【玉女峰紫霞道观 · 紫霞正气主殿】与掌门【岳沧溟】对话（零提示问剑答错永绝山门）。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_hall',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hs_changan_intro',
        regionId: 'changan',
        onceFlag: 'huashan_changan_intro_triggered',
        condition: HUASHAN_ENTRY_START_CONDITION,
        effects: [openScene('scene_hs_01_changan_verify', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_hs_tongguan_fort',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        onceFlag: 'huashan_tongguan_fort_triggered',
        condition: atStep(HUASHAN_ENTRY_QUEST_ID, 'tongguan_bandits'),
        effects: [openScene('scene_hs_02_tongguan_bandits', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_hs_zixia_terrace',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        onceFlag: 'huashan_zixia_terrace_triggered',
        condition: atStep(HUASHAN_ENTRY_QUEST_ID, 'zixia_foundation'),
        effects: [openScene('scene_hs_04_ning_receive_token', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_hs_summit_chess',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        onceFlag: 'huashan_summit_chess_triggered',
        condition: atStep(HUASHAN_ENTRY_QUEST_ID, 'summit_spar'),
        effects: [openScene('scene_hs_06_botai_debate', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_hs_siguoya_ledge',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_ledge',
        onceFlag: 'huashan_siguoya_ledge_triggered',
        condition: atStep(HUASHAN_ENTRY_QUEST_ID, 'siguoya_and_tongguan_raid'),
        effects: [openScene('scene_hs_08_siguoya_wind_practice', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_hs_zixia_oath',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        onceFlag: 'huashan_zixia_oath_triggered',
        condition: atStep(HUASHAN_ENTRY_QUEST_ID, 'zixia_oath'),
        effects: [openScene('scene_hs_13_zixia_dawn', HUASHAN_ENTRY_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hs_tongguan_bandits',
        label: '出瓮城南道 · 击退劫匪登华山三险',
        badge: '山道退匪',
        subtitle: '第二幕 · 潼关天险瓮城',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        visibleWhen: atStep(HUASHAN_ENTRY_QUEST_ID, 'tongguan_bandits'),
        effects: [openScene('scene_hs_02_tongguan_bandits', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'spot_hs_zixia_foundation',
        label: '拜见宁清羽 · 领受华山筑基剑气',
        badge: '玉女授剑',
        subtitle: '第四幕 · 玉女峰紫霞道观',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: atStep(HUASHAN_ENTRY_QUEST_ID, 'zixia_foundation'),
        effects: [openScene('scene_hs_04_ning_receive_token', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'spot_hs_summit_spar',
        label: '登绝顶博台 · 拜见掌门并与同门试剑',
        badge: '博台试锋',
        subtitle: '第六幕 · 华山绝顶论剑台',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        visibleWhen: atStep(HUASHAN_ENTRY_QUEST_ID, 'summit_spar'),
        effects: [openScene('scene_hs_06_botai_debate', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'spot_hs_siguoya_practice',
        label: '思过外坪朔风练剑 · 驰援潼关护粮',
        badge: '朔风淬锋',
        subtitle: '第八幕 · 面壁思过寒风剑坪',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_ledge',
        visibleWhen: atStep(HUASHAN_ENTRY_QUEST_ID, 'siguoya_and_tongguan_raid'),
        effects: [openScene('scene_hs_08_siguoya_wind_practice', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'spot_hs_zixia_oath',
        label: '步入紫霞正气主殿 · 面见岳沧溟问剑',
        badge: '太岳问剑',
        subtitle: '第十三幕 · 紫霞正气主殿',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        visibleWhen: atStep(HUASHAN_ENTRY_QUEST_ID, 'zixia_oath'),
        effects: [openScene('scene_hs_13_zixia_dawn', HUASHAN_ENTRY_QUEST_ID)],
      },
    ],

    npcActions: [
      {
        id: 'act_hs_manual_start',
        label: '呈验白纸身家 · 叩问西岳华山门庭（开启十五幕）',
        badge: '华山机缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0147', 'NPC-0166', 'NPC-0167'] },
            HUASHAN_ENTRY_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'huashan_changan_intro_triggered', value: true },
          openScene('scene_hs_01_changan_verify', HUASHAN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_hs_ning_foundation',
        label: '呈上玄铁剑令 · 请宁女侠传授华山筑基剑气',
        badge: '玉女授剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0166'] },
            atStep(HUASHAN_ENTRY_QUEST_ID, 'zixia_foundation'),
          ],
        },
        effects: [openScene('scene_hs_04_ning_receive_token', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'act_hs_summit_spar',
        label: '登博台拜见岳掌门与秦烈山 · 拔剑试锋',
        badge: '博台试锋',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0147'] },
            atStep(HUASHAN_ENTRY_QUEST_ID, 'summit_spar'),
          ],
        },
        effects: [openScene('scene_hs_06_botai_debate', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'act_hs_zixia_oath',
        label: '步入紫霞正气主殿 · 答太岳问剑受青锋',
        badge: '太岳问剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0166'] },
            atStep(HUASHAN_ENTRY_QUEST_ID, 'zixia_oath'),
          ],
        },
        effects: [openScene('scene_hs_13_zixia_dawn', HUASHAN_ENTRY_QUEST_ID)],
      },
    ],
    loadScenes: () => import('./huashanEntryQuest.scenes').then((m) => m.SCENES),
  },
]
