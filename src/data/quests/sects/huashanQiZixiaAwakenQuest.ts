import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q17_QUEST_ID = 'QST-SECT-05-17'

export const HUASHAN_Q17_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 4 },
    qStatus('QST-SECT-05-16', 'completed'),
    {
      type: 'flag',
      flag: 'hs_branch',
      op: 'eq',
      value: 'qi',
      label: '华山气宗护法长老专属',
    },
    qStatus(HUASHAN_Q17_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
    { type: 'npcAlive', npcId: 'NPC-1053', npcName: '段延庆' },
    { type: 'npcAlive', npcId: 'NPC-0233', npcName: '叶二娘' },
    { type: 'npcAlive', npcId: 'NPC-0183', npcName: '岳老三' },
    { type: 'npcAlive', npcId: 'NPC-0182', npcName: '云中鹤' },
  ],
}

export const HUASHAN_Q17_QUEST: QuestDefinition = {
  id: HUASHAN_Q17_QUEST_ID,
  title: '血染玉女 · 紫霞传薪',
  category: 'sect_mission',
  factionId: 'SECT-05',
  regionId: 'tongguan',
  recommendedRealm: '一流上品 ～ 宗师下品',
  maxOpponentRealm: '宗师中品（恶贯满盈段延庆 · 穷凶极恶云中鹤）',
  recommendedNote:
    '华山派气宗四阶护法长老镇派天阶传承长卷（三十六幕）。反间血书未果，西夏一品堂重金礼聘「四大恶人」（段延庆、叶二娘、岳老三、云中鹤）统率五百死士子夜奇袭西岳！岳沧溟护徒负创退守紫霞主殿，于祖师灵位前倾囊传授天阶下品绝学《紫霞神功（先天太岳卷）》并赐神兵「太岳紫霞长剑」；你面泛紫霞推门迎敌，斩断云中鹤钢爪、二十合震飞段延庆铁杖，力挽狂澜！',
  startHint:
    '气宗弟子晋升四阶护法长老并完结《雁塔风雷 · 京兆除魔》后，前往【玉女峰紫霞道观 · 紫霞正气主殿】触发四大恶人夜袭西岳大战。',
  startLocation: {
    regionId: 'tongguan',
    buildingId: 'tg_zixia',
    spotId: 'tg_zx_hall',
    customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿',
  },
  startCondition: HUASHAN_Q17_START_CONDITION,
  summary:
    '{reignYear}腊月寒夜，西夏一品堂离间华山不成，竟倾巢而出，由客卿「四大恶人」段延庆、叶二娘、岳老三、云中鹤率五百死士夜袭西岳！秦烈山独守百尺峡一夫当关，宁清羽与封不弃于东峰浴血阻击叶二娘、云中鹤。紫霞主殿前，掌门岳沧溟为掩护年轻弟子撤入大殿，独抗段延庆腹语一阳指铁杖与岳老三鳄嘴剪夹击，虽重创岳老三却遭铁杖阴劲震伤心脉！退守殿内祖师牌位前，岳沧溟将气宗至高天阶绝学《紫霞神功（先天太岳卷）》与镇派神兵「太岳紫霞长剑」倾囊托付。你周天紫气大成，推开殿门紫虹贯夜，先斩云中鹤钢爪，再与恶首段延庆正面硬撼二十合震飞其精钢铁杖，杀得一品堂狼狈溃逃下山！',
  initialStepId: 'q17_east_terrace_defense',
  steps: {
    q17_east_terrace_defense: {
      id: 'q17_east_terrace_defense',
      title: '火龙袭岳 · 驰援东峰',
      objective:
        '四大恶人率五百西夏一品堂死士夜袭华山！秦烈山已扼守百尺峡，请奉掌门号令速赴【玉女峰紫霞道观 · 东峰紫气迎曦石坪】，协助宁清羽、封不弃击溃抢登东峰的西夏死士主力！',
      nextHint:
        '前往【玉女峰紫霞道观 · 东峰紫气迎曦石坪（tg_zx_terrace）】触发东峰阻击战。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
      },
    },
    q17_zixia_hall_crisis: {
      id: 'q17_zixia_hall_crisis',
      title: '掌门喋血 · 紫霞传薪',
      objective:
        '调虎离山！恶首段延庆与岳老三已绕过东峰直扑紫霞主殿！请火速回援【玉女峰紫霞道观 · 紫霞正气主殿】，接应独挡殿门的掌门岳沧溟！',
      nextHint:
        '前往【玉女峰紫霞道观 · 紫霞正气主殿（tg_zx_hall）】，点击「疾驰回援主殿 · 救护岳掌门领受紫霞真传」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
      },
    },
    q17_zixia_breakout: {
      id: 'q17_zixia_breakout',
      title: '紫虹破门 · 硬撼恶首',
      objective:
        '已于祖师灵前修成天阶绝学《紫霞神功（先天太岳卷）》并获赐「太岳紫霞长剑」（可先于枢机菜单披挂神兵）！请于【紫霞正气主殿】推门迎战云中鹤与恶首段延庆，击退来犯群魔！',
      nextHint:
        '整备披挂与武学后，在【玉女峰紫霞道观 · 紫霞正气主殿（tg_zx_hall）】点击「紫气盈面推开殿门 · 迎战云中鹤与段延庆」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_hsq17_east_terrace',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      onceFlag: 'hsq17_east_terrace_triggered',
      condition: atStep(HUASHAN_Q17_QUEST_ID, 'q17_east_terrace_defense'),
      effects: [openScene('scene_hsq17_07', HUASHAN_Q17_QUEST_ID)],
    },
    {
      id: 'trig_hsq17_zixia_crisis',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      onceFlag: 'hsq17_zixia_crisis_triggered',
      condition: atStep(HUASHAN_Q17_QUEST_ID, 'q17_zixia_hall_crisis'),
      effects: [openScene('scene_hsq17_15', HUASHAN_Q17_QUEST_ID)],
    },
  ],
  spotActions: [
    {
      id: 'spot_hsq17_start_hall',
      label: '闻警钟拔剑护山 · 迎击四大恶人夜袭（开启《血染玉女》）',
      badge: '恶客夜袭',
      subtitle: '紫霞正气主殿 · 气宗天阶紫霞传薪',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: HUASHAN_Q17_START_CONDITION,
      effects: [openScene('scene_hsq17_01', HUASHAN_Q17_QUEST_ID)],
    },
    {
      id: 'spot_hsq17_east_terrace',
      label: '驰援东峰石坪 · 联手宁封二老斩灭一品堂死士',
      badge: '东峰血战',
      subtitle: '东峰紫气迎曦石坪 · 阻截四大恶人',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      visibleWhen: atStep(HUASHAN_Q17_QUEST_ID, 'q17_east_terrace_defense'),
      effects: [openScene('scene_hsq17_07', HUASHAN_Q17_QUEST_ID)],
    },
    {
      id: 'spot_hsq17_zixia_crisis',
      label: '疾驰回援主殿 · 救护岳掌门领受紫霞真传',
      badge: '紫霞传薪',
      subtitle: '紫霞正气主殿 · 祖师灵前授神功神兵',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: atStep(HUASHAN_Q17_QUEST_ID, 'q17_zixia_hall_crisis'),
      effects: [openScene('scene_hsq17_15', HUASHAN_Q17_QUEST_ID)],
    },
    {
      id: 'spot_hsq17_zixia_breakout',
      label: '紫气盈面推开殿门 · 迎战云中鹤与段延庆',
      badge: '紫虹破门',
      subtitle: '紫霞正气主殿丹墀 · 决战四大恶人',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: atStep(HUASHAN_Q17_QUEST_ID, 'q17_zixia_breakout'),
      effects: [openScene('scene_hsq17_26', HUASHAN_Q17_QUEST_ID)],
    },
  ],
  npcActions: [
    {
      id: 'act_hsq17_yue_start',
      label: '山门警钟长鸣 · 请掌门下令迎击西夏夜袭大军（气宗四阶）',
      badge: '恶客夜袭',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0166'] },
          HUASHAN_Q17_START_CONDITION,
        ],
      },
      effects: [openScene('scene_hsq17_01', HUASHAN_Q17_QUEST_ID)],
    },
    {
      id: 'act_hsq17_yue_breakout',
      label: '禀明周天紫气已融 · 推开殿门决战四大恶人',
      badge: '紫虹破门',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118'] },
          atStep(HUASHAN_Q17_QUEST_ID, 'q17_zixia_breakout'),
        ],
      },
      effects: [openScene('scene_hsq17_26', HUASHAN_Q17_QUEST_ID)],
    },
  ],
  loadScenes: () => import('./huashanQiZixiaAwakenQuest.scenes').then((m) => m.SCENES),
}

export const HUASHAN_Q17_QUESTS: QuestDefinition[] = [HUASHAN_Q17_QUEST]
