import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const JINJUN_TAIYUAN_IRON_QUEST_ID = 'QST-SECT-33-TAIYUAN-IRON'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 4 },
    { type: 'skillAtLeast', key: '算术', min: 70 },
    { type: 'skillAtLeast', key: '经义', min: 55 },
    { type: 'skillAtLeast', key: '策论', min: 65 },
    { type: 'renownAtLeast', min: 400 },
    {
      type: 'any',
      hint: '与折继闵或呼延丕显相交笃厚（好感度 ≥ 15）',
      conditions: [
        { type: 'npcFavorAtLeast', npcId: 'NPC-0035', min: 15, npcName: '折继闵' },
        { type: 'npcFavorAtLeast', npcId: 'NPC-0042', min: 15, npcName: '呼延丕显' },
      ],
    },
    { type: 'npcAlive', npcId: 'NPC-0035', npcName: '折继闵' },
    { type: 'npcAlive', npcId: 'NPC-0042', npcName: '呼延丕显' },
    { type: 'npcAlive', npcId: 'NPC-0037', npcName: '张亢' },
    qStatus(JINJUN_TAIYUAN_IRON_QUEST_ID, 'not_started'),
    qStatus(JINJUN_TAIYUAN_IRON_QUEST_ID, 'not_completed'),
  ],
}

export const JINJUN_TAIYUAN_IRON_QUEST: QuestDefinition = {
  id: JINJUN_TAIYUAN_IRON_QUEST_ID,
  title: '铁冶监 · 玄铁失耗案',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'taiyuan',
  recommendedRealm: '一流上品 ~ 宗师下品',
  maxOpponentRealm: '宗师下品（塞外寒铁手 · 拓跋烈）',
  recommendedNote:
    '大宋禁军 Lv.4【三衙都虞候】独立支线（全十幕）。须算术≥70、经义≥55、策论≥65、声望≥400及折继闵/呼延丕显好感≥15，于太原府河东官营铁冶监触发。',
  startHint:
    '晋升大宋禁军 Lv.4 三衙都虞候且达标算术/经义/策论与声望后，前往【太原府 · 河东官营铁冶监 · 水排风箱冲天炼铁高炉】面见折继闵、呼延丕显开启。',
  startLocation: {
    regionId: 'taiyuan',
    buildingId: 'ty_iron',
    spotId: 'ty_ir_furnace',
    customLabel: '太原府 · 河东官营铁冶监 · 水排风箱冲天炼铁高炉',
  },
  startCondition: START_CONDITION,
  initialStepId: 'probe_tavern',
  summary:
    'Lv.4 三衙都虞候奉枢密院勘合巡察太原河东官营铁冶监，借精湛算术核出生铁火耗率虚高两成、冷锻玄铁遭暗中截留。经晋阳杏花村酒楼暗访与天波杨家旧祠张亢佐证，夜伏汾水渡口 1v2 击溃一流上品私兵统领，查明铁冶监采买判官竟勾结塞外宗师下品客卿“寒铁手”拓跋烈走私甲叶出关！终在高炉烈焰前力克拓跋烈，并抉择“依律解京”或“就地铸甲”圆满收官。',
  steps: {
    probe_tavern: {
      id: 'probe_tavern',
      title: '酒肆暗访 · 寻迹杏花村',
      objective:
        '已从铁冶监炉料簿核出生铁火耗率虚高两成！请前往【太原府 · 晋阳杏花村酒楼】暗访醉酒老炉匠，打探三更黑车的去向。',
      nextHint: '前往【太原府 · 晋阳杏花村酒楼（taiyuan_base_tavern）】，点击「暗访老炉匠 · 寻查黑车踪迹」。',
      targetLocation: {
        regionId: 'taiyuan',
        buildingId: 'taiyuan_base_tavern',
        customLabel: '太原府 · 晋阳杏花村酒楼',
      },
    },
    consult_zhangkang: {
      id: 'consult_zhangkang',
      title: '旧祠问旧 · 核对边镇甲数',
      objective:
        '老炉匠透露三更黑车直奔汾水渡口。请先前往【太原府 · 天波杨家旧祠 · 正堂议事厅】向河东将领张亢核实边镇甲胄实收账目。',
      nextHint: '前往【天波杨家旧祠 · 正堂议事厅（ty_yang_main）】，点击「会见张亢 · 核实边镇军械」。',
      targetLocation: {
        regionId: 'taiyuan',
        buildingId: 'ty_yang',
        spotId: 'ty_yang_main',
        customLabel: '太原府 · 天波杨家旧祠 · 正堂议事厅',
      },
    },
    confront_at_armory: {
      id: 'confront_at_armory',
      title: '高炉对质 · 火海斩宗师',
      objective:
        '汾水渡口截车得手，活口供出采买判官竟聘有宗师下品客卿“塞外寒铁手”拓跋烈坐镇！请速回【河东官营铁冶监 · 河东军器库与甲胄试刃院】当众亮证擒凶！',
      nextHint: '前往【河东官营铁冶监 · 河东军器库与甲胄试刃院（ty_ir_armory）】，点击「亮出勘合铁证 · 决战寒铁手」。',
      targetLocation: {
        regionId: 'taiyuan',
        buildingId: 'ty_iron',
        spotId: 'ty_ir_armory',
        customLabel: '太原府 · 河东官营铁冶监 · 河东军器库与甲胄试刃院',
      },
    },
    farewell_jinci: {
      id: 'farewell_jinci',
      title: '晋祠饮别 · 录功返京',
      objective:
        '宗师拓跋烈伏诛，军械大案水落石出！请赴【太原府 · 晋祠古柏圣境 · 贞观唐碑亭与卧龙周柏】与折继闵、呼延丕显饮别，录功返京。',
      nextHint: '前往【晋祠古柏圣境 · 贞观唐碑亭与卧龙周柏（ty_jc_cypress）】，点击「周柏亭下饮别 · 录功收官」。',
      targetLocation: {
        regionId: 'taiyuan',
        buildingId: 'ty_jinci',
        spotId: 'ty_jc_cypress',
        customLabel: '太原府 · 晋祠古柏圣境 · 贞观唐碑亭与卧龙周柏',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_jj_ty_start',
      regionId: 'taiyuan',
      buildingId: 'ty_iron',
      spotId: 'ty_ir_furnace',
      onceFlag: 'jj_ty_started',
      condition: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_TAIYUAN_IRON_QUEST_ID, stepId: 'probe_tavern' },
        openScene('scene_jj_ty_01_imperial_tally', JINJUN_TAIYUAN_IRON_QUEST_ID),
      ],
    },
  ],
  spotActions: [
    {
      id: 'act_jj_ty_start_manual',
      regionId: 'taiyuan',
      buildingId: 'ty_iron',
      spotId: 'ty_ir_furnace',
      label: '【都虞候巡监】持勘合核查铁冶监',
      subtitle: '以三衙都虞候身份核查河东官营铁冶监生铁账册与步人甲减产之谜。',
      tone: 'primary',
      visibleWhen: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_TAIYUAN_IRON_QUEST_ID, stepId: 'probe_tavern' },
        openScene('scene_jj_ty_01_imperial_tally', JINJUN_TAIYUAN_IRON_QUEST_ID),
      ],
    },
    {
      id: 'act_jj_ty_tavern',
      regionId: 'taiyuan',
      buildingId: 'taiyuan_base_tavern',
      label: '【都虞候巡监】暗访老炉匠 · 寻查黑车踪迹',
      subtitle: '乔装暗访醉酒铁匠，探明私铁黑车流向。',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_TAIYUAN_IRON_QUEST_ID, 'probe_tavern'),
      effects: [openScene('scene_jj_ty_03_tavern_clue', JINJUN_TAIYUAN_IRON_QUEST_ID)],
    },
    {
      id: 'act_jj_ty_yang',
      regionId: 'taiyuan',
      buildingId: 'ty_yang',
      spotId: 'ty_yang_main',
      label: '【都虞候巡监】会见张亢 · 核实边镇军械',
      subtitle: '向张亢核对甲叶收支，并夜伏汾水渡口截击私铁车队。',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_TAIYUAN_IRON_QUEST_ID, 'consult_zhangkang'),
      effects: [openScene('scene_jj_ty_04_zhangkang_verify', JINJUN_TAIYUAN_IRON_QUEST_ID)],
    },
    {
      id: 'act_jj_ty_armory',
      regionId: 'taiyuan',
      buildingId: 'ty_iron',
      spotId: 'ty_ir_armory',
      label: '【都虞候巡监】亮出勘合铁证 · 决战寒铁手',
      subtitle: '当众揭发采买判官，并迎战宗师下品强敌“塞外寒铁手”拓跋烈！',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_TAIYUAN_IRON_QUEST_ID, 'confront_at_armory'),
      effects: [openScene('scene_jj_ty_07_furnace_confront', JINJUN_TAIYUAN_IRON_QUEST_ID)],
    },
    {
      id: 'act_jj_ty_jinci',
      regionId: 'taiyuan',
      buildingId: 'ty_jinci',
      spotId: 'ty_jc_cypress',
      label: '【都虞候巡监】周柏亭下饮别 · 录功收官',
      subtitle: '与折继闵、呼延丕显饮别太原，录功返京。',
      tone: 'gold',
      visibleWhen: atStep(JINJUN_TAIYUAN_IRON_QUEST_ID, 'farewell_jinci'),
      effects: [openScene('scene_jj_ty_10_jinci_farewell', JINJUN_TAIYUAN_IRON_QUEST_ID)],
    },
  ],
  loadScenes: () => import('./jinjunTaiyuanIronQuest.scenes').then((m) => m.SCENES),
}

export const JINJUN_TAIYUAN_IRON_QUESTS: readonly QuestDefinition[] = [JINJUN_TAIYUAN_IRON_QUEST]
