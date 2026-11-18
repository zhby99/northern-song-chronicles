import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const HUASHAN_Q11_QUEST_ID = 'QST-SECT-05-11'

export const HUASHAN_Q11_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 3 },
    qStatus('QST-SECT-05-08', 'completed'),
    {
      type: 'flag',
      flag: 'hs_branch',
      op: 'eq',
      value: 'jian',
      label: '华山剑宗真传弟子',
    },
    { type: 'learnedArtAtLeast', artId: 'MA-089', minLevel: 3 },
    qStatus(HUASHAN_Q11_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
  ],
}

export const HUASHAN_Q11_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_Q11_QUEST_ID,
    title: '剑庐残烛 · 夺命三仙',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '一流下品 ～ 一流中品',
    maxOpponentRealm: '一流下品（华阴夜袭辽夏黑市三名一流死士合围）',
    recommendedNote:
      '二十四幕华山剑宗真传秘辛长卷：需剑宗真传身份且《希夷剑法》≥ 3 重。霜秋夜随封不弃避开紫霞耳目潜入荒废三十载的西峰旧剑庐，于先辈牌位前获授地阶中品杀剑《夺命连环三仙剑》。数日后华阴村落遭辽夏黑市死士夜袭，你施展夺命三仙剑瞬枭三名一流死士，却被巡山归来的秦烈山一眼认出剑痕，直面剑心向背之拷问！',
    startHint:
      '华山第 3 阶剑宗真传弟子完成《云台残局 · 希夷求变》且《希夷剑法》≥ 3 重后，前往【华山绝顶论剑台 > 朝阳孤松观海亭】、【思过崖古山洞 > 绝壁银瀑涤心寒潭】或寻【封不弃】开启。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_pine',
      customLabel: '潼关 / 西岳华山 · 朝阳孤松观海亭（或寻封不弃）',
    },
    startCondition: HUASHAN_Q11_START_CONDITION,
    summary:
      '{reignYear}霜降深夜，【封不弃】避开东峰紫霞耳目，引你潜入西峰幽谷荒废三十载的剑宗古剑庐。在三十年前内争陨落的剑宗先辈灵牌前，封不弃泣血倾诉旧怨，倾囊传授地阶中品杀招《夺命连环三仙剑》。数日后辽夏黑市死士夜袭【潼关天险瓮城】西麓华阴村落，你为救无辜妇孺催动连环三剑瞬枭三名一流下品死士，却恰被巡山归来的潼关剑神【秦烈山】撞破夺命剑痕！寒月孤松之下，你在隐瞒师承暗中蓄势与坦承立誓绝不向同门拔剑之间定下毕生剑心。',
    initialStepId: 'ruined_jianlu',
    steps: {
      ruined_jianlu: {
        id: 'ruined_jianlu',
        title: '荒庐残烛 · 先辈旧怨',
        objective:
          '封不弃已发出霜夜密约！请避开紫霞耳目前往【思过崖古山洞 > 绝壁银瀑涤心寒潭】西峰幽谷荒庐，祭拜剑宗先辈并领受秘传杀剑！',
        nextHint: '前往【思过崖古山洞 > 绝壁银瀑涤心寒潭】潜入荒废三十载的剑宗旧剑庐。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_siguoya',
          spotId: 'tg_sg_falls',
        },
      },
      huayin_night_raid: {
        id: 'huayin_night_raid',
        title: '华阴火起 · 三剑无生',
        objective:
          '已习得《夺命连环三仙剑》！山下华阴村落忽遭辽夏黑市死士夜袭，请速赴【潼关天险瓮城 > 潼关镇河主城楼与瓮城】西麓救援村民、诛灭死士！',
        nextHint: '前往【潼关天险瓮城 > 潼关镇河主城楼与瓮城】驰援华阴村落迎战黑市死士。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_barbican',
        },
      },
      moon_interrogate: {
        id: 'moon_interrogate',
        title: '寒月孤松 · 剑心向背',
        objective:
          '夺命三仙剑痕已被巡山的秦烈山撞破！请随【秦烈山】登临【华山绝顶论剑台 > 朝阳孤松观海亭】，回应他对师承与剑心的严厉盘问！',
        nextHint: '前往【华山绝顶论剑台 > 朝阳孤松观海亭】（或寻秦烈山）直面寒月盘剑。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_pine',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hsq11_pine_start',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        onceFlag: 'hsq11_intro_triggered',
        condition: HUASHAN_Q11_START_CONDITION,
        effects: [openScene('scene_hsq11_01', HUASHAN_Q11_QUEST_ID)],
      },
      {
        id: 'trig_hsq11_ruined_jianlu',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_falls',
        onceFlag: 'hsq11_jianlu_triggered',
        condition: atStep(HUASHAN_Q11_QUEST_ID, 'ruined_jianlu'),
        effects: [openScene('scene_hsq11_02', HUASHAN_Q11_QUEST_ID)],
      },
      {
        id: 'trig_hsq11_huayin_raid',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        onceFlag: 'hsq11_huayin_triggered',
        condition: atStep(HUASHAN_Q11_QUEST_ID, 'huayin_night_raid'),
        effects: [openScene('scene_hsq11_09', HUASHAN_Q11_QUEST_ID)],
      },
      {
        id: 'trig_hsq11_moon_interrogate',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        onceFlag: 'hsq11_interrogate_triggered',
        condition: atStep(HUASHAN_Q11_QUEST_ID, 'moon_interrogate'),
        effects: [openScene('scene_hsq11_17', HUASHAN_Q11_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hsq11_start_pine',
        label: '赴霜夜密约 · 随封不弃潜往西峰荒庐（开启《剑庐残烛 · 夺命三仙》）',
        badge: '霜夜密召',
        subtitle: '第一幕 · 朝阳孤松观海亭',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        visibleWhen: HUASHAN_Q11_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hsq11_intro_triggered', value: true },
          openScene('scene_hsq11_01', HUASHAN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq11_start_falls',
        label: '于寒潭幽径会合封不弃 · 开启剑庐尘封旧辛',
        badge: '霜夜密召',
        subtitle: '第一幕 · 绝壁银瀑涤心寒潭',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_falls',
        visibleWhen: HUASHAN_Q11_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hsq11_intro_triggered', value: true },
          openScene('scene_hsq11_01', HUASHAN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq11_ruined_jianlu',
        label: '推开三十载荒废剑庐 · 祭拜先辈受传《夺命连环三仙剑》',
        badge: '残庐传剑',
        subtitle: '第二幕 · 绝壁银瀑涤心寒潭西峰荒庐',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_falls',
        visibleWhen: atStep(HUASHAN_Q11_QUEST_ID, 'ruined_jianlu'),
        effects: [
          { type: 'setFlag', flag: 'hsq11_jianlu_triggered', value: true },
          openScene('scene_hsq11_02', HUASHAN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq11_huayin_raid',
        label: '驰援华阴火海村落 · 催动夺命三仙剑决战辽夏死士',
        badge: '三剑无生',
        subtitle: '第九幕 · 潼关西麓华阴村落',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        visibleWhen: atStep(HUASHAN_Q11_QUEST_ID, 'huayin_night_raid'),
        effects: [
          { type: 'setFlag', flag: 'hsq11_huayin_triggered', value: true },
          openScene('scene_hsq11_09', HUASHAN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq11_moon_interrogate',
        label: '登朝阳孤松观海亭 · 直面秦烈山寒月盘问剑心',
        badge: '寒月盘剑',
        subtitle: '第十七幕 · 朝阳孤松观海亭',
        tone: 'primary',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        visibleWhen: atStep(HUASHAN_Q11_QUEST_ID, 'moon_interrogate'),
        effects: [
          { type: 'setFlag', flag: 'hsq11_interrogate_triggered', value: true },
          openScene('scene_hsq11_17', HUASHAN_Q11_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hsq11_feng_start',
        label: '随封师叔夜探西峰荒庐 · 领受剑宗秘传杀剑（开启《剑庐残烛》）',
        badge: '夺命三仙',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0167'] },
            HUASHAN_Q11_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq11_intro_triggered', value: true },
          openScene('scene_hsq11_01', HUASHAN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq11_qin_interrogate',
        label: '随秦师伯赴孤松崖顶 · 回应夺命三仙剑痕盘问',
        badge: '寒月盘剑',
        tone: 'primary',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0147'] },
            atStep(HUASHAN_Q11_QUEST_ID, 'moon_interrogate'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq11_interrogate_triggered', value: true },
          openScene('scene_hsq11_17', HUASHAN_Q11_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanJianSanxianQuest.scenes').then((m) => m.SCENES),
  },
]
