import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const JINJUN_FANLOU_NIGHT_QUEST_ID = 'QST-SECT-33-FANLOU-NIGHT'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 3 },
    {
      type: 'shichenIn',
      indices: [10, 11, 0],
      label: '夜间巡检时辰（亥时、子时、丑时）',
    },
    { type: 'skillAtLeast', key: '辩才', min: 55 },
    { type: 'skillAtLeast', key: '算术', min: 40 },
    { type: 'chivalryAtLeast', min: 80 },
    {
      type: 'any',
      hint: '与展昭或徐铁山相交笃厚（好感度 ≥ 15）',
      conditions: [
        { type: 'npcFavorAtLeast', npcId: 'NPC-0140', min: 15, npcName: '展昭' },
        { type: 'npcFavorAtLeast', npcId: 'NPC-0284', min: 15, npcName: '徐铁山' },
      ],
    },
    { type: 'npcAlive', npcId: 'NPC-0284', npcName: '徐铁山' },
    { type: 'npcAlive', npcId: 'NPC-0140', npcName: '展昭' },
    qStatus(JINJUN_FANLOU_NIGHT_QUEST_ID, 'not_started'),
    qStatus(JINJUN_FANLOU_NIGHT_QUEST_ID, 'not_completed'),
  ],
}

export const JINJUN_FANLOU_NIGHT_QUEST: QuestDefinition = {
  id: JINJUN_FANLOU_NIGHT_QUEST_ID,
  title: '樊楼夜 · 禁军巡夜录',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'bianliang',
  recommendedRealm: '一流中品 ~ 一流上品',
  maxOpponentRealm: '一流上品（血手刀 · 冷无忌）',
  recommendedNote:
    '大宋禁军 Lv.3【四厢都指挥】独立支线（全十幕）。须于夜间（亥/子/丑时）赴开封府樊楼，且满足辩才≥55、算术≥40、侠义≥80及展昭/徐铁山好感≥15方能触发。',
  startHint:
    '任大宋禁军 Lv.3 四厢都指挥后，于亥、子、丑三更夜间前往【开封府 · 樊楼 · 三层五楼飞桥雅阁】即可触发夜巡风波。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_fanlou',
    spotId: 'bl_fl_towers',
    customLabel: '开封府 · 樊楼（飞桥灯火） · 三层五楼飞桥雅阁',
  },
  startCondition: START_CONDITION,
  initialStepId: 'investigate_hongqiao',
  summary:
    '四厢都指挥例行夜巡东京汴梁，于樊楼当众弹压醉酒闹事的禁军散官子弟，复闻退伍断臂老兵泣诉有人冒充殿前司采买强征民船、克扣商旅。循线夜探汴河虹桥临水酒肆，算破半年千两赃账，并在虹桥与大相国寺后巷连破一流中品江湖保镖与一流上品黑道刀客“血手刀”冷无忌，清晨于开封府前发还民资，赢得满城口碑。',
  steps: {
    investigate_hongqiao: {
      id: 'investigate_hongqiao',
      title: '虹桥暗察 · 核账拿贼',
      objective:
        '樊楼弹压醉汉后，断臂老兵泣诉有人持假冒殿前司采买牌在汴河虹桥强征民船。请前往【开封府 · 汴河虹桥 · 临水酒肆】暗中核查账目并缉拿假冒军汉！',
      nextHint: '前往【开封府 · 汴河虹桥 · 临水酒肆（bianliang_base_tavern）】，点击「暗察假采买 · 虹桥拿贼」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bianliang_base_tavern',
        customLabel: '开封府 · 汴河虹桥 · 临水酒肆',
      },
    },
    raid_xiangguosi_alley: {
      id: 'raid_xiangguosi_alley',
      title: '相国寺巷 · 斩枭起赃',
      objective:
        '虹桥假军汉已溃，供出幕后金主“血手刀”冷无忌藏匿于【开封府 · 大相国寺 · 相国寺万姓交易雅市】后巷破院！请即刻赶往清剿贼首（一流上品）并起获赃银！',
      nextHint: '前往【大相国寺 · 相国寺万姓交易雅市（bl_xg_market）】，点击「夜袭后巷破院 · 缉拿冷无忌」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        customLabel: '开封府 · 大相国寺 · 相国寺万姓交易雅市',
      },
    },
    return_silver_kaifengfu: {
      id: 'return_silver_kaifengfu',
      title: '府前发还 · 灯火归营',
      objective:
        '已诛杀贼首冷无忌并起获千两赃银！请前往【开封府 · 开封府衙（六扇门） · 开封府升堂正殿】当众发还受欺船户与退伍老兵，随后归营点卯。',
      nextHint: '前往【开封府升堂正殿（bl_kf_court）】，点击「公堂发还民资 · 归营复命」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        customLabel: '开封府 · 开封府衙 · 开封府升堂正殿',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_jj_fn_start',
      regionId: 'bianliang',
      buildingId: 'bl_fanlou',
      spotId: 'bl_fl_towers',
      onceFlag: 'jj_fn_started',
      condition: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_FANLOU_NIGHT_QUEST_ID, stepId: 'investigate_hongqiao' },
        openScene('scene_jj_fn_01_street_patrol', JINJUN_FANLOU_NIGHT_QUEST_ID),
      ],
    },
  ],
  spotActions: [
    {
      id: 'act_jj_fn_start_manual',
      regionId: 'bianliang',
      buildingId: 'bl_fanlou',
      spotId: 'bl_fl_towers',
      label: '【禁军夜巡】登樊楼弹压喧哗',
      subtitle: '亥至丑时三更夜巡，登樊楼查探楼上喧哗。',
      tone: 'primary',
      visibleWhen: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_FANLOU_NIGHT_QUEST_ID, stepId: 'investigate_hongqiao' },
        openScene('scene_jj_fn_01_street_patrol', JINJUN_FANLOU_NIGHT_QUEST_ID),
      ],
    },
    {
      id: 'act_jj_fn_hongqiao',
      regionId: 'bianliang',
      buildingId: 'bianliang_base_tavern',
      label: '【禁军夜巡】暗察假采买 · 虹桥拿贼',
      subtitle: '暗中核对商旅被诈账目，擒拿假冒殿前司的泼皮与一流江湖护卫。',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_FANLOU_NIGHT_QUEST_ID, 'investigate_hongqiao'),
      effects: [openScene('scene_jj_fn_05_hongqiao_probe', JINJUN_FANLOU_NIGHT_QUEST_ID)],
    },
    {
      id: 'act_jj_fn_xiangguosi',
      regionId: 'bianliang',
      buildingId: 'bl_xiangguosi',
      spotId: 'bl_xg_market',
      label: '【禁军夜巡】夜袭后巷破院 · 缉拿冷无忌',
      subtitle: '迎战一流上品黑道刀客“血手刀”冷无忌，起获赃银。',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_FANLOU_NIGHT_QUEST_ID, 'raid_xiangguosi_alley'),
      effects: [openScene('scene_jj_fn_08_xiangguosi_boss', JINJUN_FANLOU_NIGHT_QUEST_ID)],
    },
    {
      id: 'act_jj_fn_kaifengfu',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_court',
      label: '【禁军夜巡】公堂发还民资 · 归营复命',
      subtitle: '当众发还船户与退伍老兵赃银，随后归营点卯。',
      tone: 'gold',
      visibleWhen: atStep(JINJUN_FANLOU_NIGHT_QUEST_ID, 'return_silver_kaifengfu'),
      effects: [openScene('scene_jj_fn_09_return_silver', JINJUN_FANLOU_NIGHT_QUEST_ID)],
    },
  ],
  loadScenes: () => import('./jinjunFanlouNightQuest.scenes').then((m) => m.SCENES),
}

export const JINJUN_FANLOU_NIGHT_QUESTS: readonly QuestDefinition[] = [JINJUN_FANLOU_NIGHT_QUEST]
