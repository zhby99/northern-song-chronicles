import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, toast, makeQuestNpc } from '../../../engine/quest/dsl'
import { JINJUN_TAIYUAN_IRON_QUEST_ID } from './jinjunTaiyuanIronQuest'

function buildPrivateGuardLeader1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_JJTY_GUARD_1',
    name: '厉铁山',
    title: '黑市押车统领',
    factionId: 'SECT-18',
    factionName: '河东私铁黑市',
    fullLocationLabel: '太原府 · 汾水渡口',
    realm: '一流上品',
    stats: { hp: 3480, mp: 3240, agi: 74, res: 61 },
    talents: { bone: 79, comprehension: 72, charm: 45 },
    tenArts: { 骑术: 75, 算术: 35, 经义: 15, 策论: 40, 诗词: 10, 琴: 5, 棋: 20, 书: 15, 画: 5, 辩才: 35 },
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    sectRank: 4,
    sectRankLabel: '私兵统领',
    equippedArts: { neigong: 'MA-037', move1: 'MA-123', move2: 'MA-130' },
    learnedArts: [{ artId: 'MA-037', level: 8 }, { artId: 'MA-123', level: 8 }, { artId: 'MA-130', level: 8 }],
    equipped: { weapon: 'WPN-019', armor: 'ARM-012', shoes: 'BOT-007', bow: 'BOW-008', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-012' },
    talk: '“三更半夜敢挡太原黑市铁车，不管你是哪路朝廷大员，今夜都得喂鱼！”',
  })
}

function buildPrivateGuardLeader2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_JJTY_GUARD_2',
    name: '鬼影镖·段苍',
    title: '塞外接货副统领',
    factionId: 'SECT-18',
    factionName: '河东私铁黑市',
    fullLocationLabel: '太原府 · 汾水渡口',
    realm: '一流上品',
    stats: { hp: 3420, mp: 3200, agi: 76, res: 60 },
    talents: { bone: 77, comprehension: 74, charm: 42 },
    tenArts: { 骑术: 78, 算术: 30, 经义: 12, 策论: 38, 诗词: 10, 琴: 5, 棋: 22, 书: 15, 画: 5, 辩才: 32 },
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    sectRank: 4,
    sectRankLabel: '接货副统领',
    equippedArts: { neigong: 'MA-037', move1: 'MA-125', move2: 'MA-138' },
    learnedArts: [{ artId: 'MA-037', level: 7 }, { artId: 'MA-125', level: 9 }, { artId: 'MA-138', level: 8 }],
    equipped: { weapon: 'WPN-022', armor: 'ARM-009', shoes: 'BOT-005', bow: 'BOW-004', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-013' },
    talk: '“冷锻甲叶已装上船，留你不得！”',
  })
}

function buildColdIronGrandmaster(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_JJTY_GRANDMASTER',
    name: '拓跋烈',
    title: '塞外寒铁手 · 黑市宗师客卿',
    factionId: 'SECT-28',
    factionName: '塞外黑市客卿',
    fullLocationLabel: '太原府 · 河东官营铁冶监',
    realm: '宗师下品',
    stats: { hp: 4680, mp: 4280, agi: 81, res: 68 },
    talents: { bone: 86, comprehension: 82, charm: 52 },
    tenArts: { 骑术: 84, 算术: 45, 经义: 28, 策论: 60, 诗词: 20, 琴: 10, 棋: 45, 书: 30, 画: 15, 辩才: 55 },
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    sectRank: 5,
    sectRankLabel: '宗师客卿',
    equippedArts: { neigong: 'MA-019', move1: 'MA-088', move2: 'MA-091' },
    learnedArts: [{ artId: 'MA-019', level: 8 }, { artId: 'MA-088', level: 9 }, { artId: 'MA-091', level: 9 }],
    equipped: { weapon: 'WPN-015', armor: 'ARM-007', shoes: 'BOT-004', bow: 'BOW-004', accessory1: 'ACC-014', accessory2: 'ACC-009', mount: 'MNT-005' },
    talk: '“大宋三衙都虞候？呵呵，老夫收了晋商十万贯，今日便用你的血给这高炉淬火！”',
  })
}

const SCENE_01: StorySceneDef = {
  id: 'scene_jj_ty_01_imperial_tally',
  title: '第一幕 · 奉符巡监',
  subtitle: '太原府 · 河东官营铁冶监高炉',
  mandatory: true,
  beats: [
    N('{reignYear}金风肃杀，太原城西河东官营铁冶监百丈水排高炉昼夜轰鸣、铁花四溅。你以大宋禁军 Lv.4【三衙都虞候】身份持枢密院勘合入监巡视，宿将折继闵与呼延丕显早已迎候在热浪滚滚的高炉前。'),
    S('NPC-0035', '（折继闵抱拳行礼，面色凝重指向高炉侧畔）“都虞候大人来得正好！近半年来铁冶监日夜不停，可拨付河东边军的冷锻步人甲却莫名减产三成！采买判官一口咬定是今年矿脉生铁含杂过多、火耗暴涨，末将总觉其中有诈！”'),
    S('NPC-0042', '（呼延丕显冷哼一声）“我呼延家世代从戎，炉火烧得旺不旺我还看不出？必有硕鼠在暗中做手脚！请都虞候大人明察！”'),
  ],
  onFinishEffects: [openScene('scene_jj_ty_02_ledger_math', JINJUN_TAIYUAN_IRON_QUEST_ID)],
}

const SCENE_02: StorySceneDef = {
  id: 'scene_jj_ty_02_ledger_math',
  title: '第二幕 · 账册玄机',
  subtitle: '太原府 · 铁冶监账房',
  mandatory: true,
  beats: [
    N('你命人封存近半年炉料入库簿与出甲清单，秉烛彻夜核算。凭着深厚的【算术】造诣，你将炭耗、生铁出汁率与成品甲叶重量逐一交叉复算——'),
    P('（提笔圈出十几处看似平平无奇的“炉渣折耗”，冷笑起身）“好一招瞒天过海！生铁火耗率被人为虚抬了整整两成二！按这半年投料算，至少有八万斤上等冷锻玄铁凭空蒸发，足够铸造两千副精锐步人重甲！”'),
    S('NPC-0035', '（倒吸一口凉气）“八万斤玄铁？！那采买判官胆大包天，竟敢偷盗军国重器！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_TAIYUAN_IRON_QUEST_ID, stepId: 'probe_tavern' },
    toast('算清账目漏洞！请前往【晋阳杏花村酒楼】暗访醉酒老炉匠打探黑车去向。'),
  ],
}

const SCENE_03: StorySceneDef = {
  id: 'scene_jj_ty_03_tavern_clue',
  title: '第三幕 · 酒肆暗访',
  subtitle: '太原府 · 晋阳杏花村酒楼',
  mandatory: true,
  beats: [
    N('次日傍晚，你换上便服独自来到晋阳杏花村酒楼，寻到一位因工伤被铁冶监辞退的老炉匠，斟上两壶陈年汾酒。酒过三巡，老炉匠压低声音道出惊人内情：'),
    S({ name: '老炉匠', title: '前铁冶监掌炉匠人', factionName: '太原匠户' }, '“贵人莫声张……那采买判官每月十五三更，都偷偷装好几辆盖着煤灰的大车从西角门出去，不走官道，专奔汾水渡口！押车的都不是咱们宋军，个个佩着寒光闪闪的弯刀呢……”'),
    P('（谢过老炉匠，心中已然有数）“果然是里应外合走私出关！且先去天波杨家旧祠寻张亢将军核对边镇收甲底单，再行截击！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_TAIYUAN_IRON_QUEST_ID, stepId: 'consult_zhangkang' },
    toast('探明黑车流向！请前往【天波杨家旧祠 · 正堂议事厅】向张亢核实。'),
  ],
}

const SCENE_04: StorySceneDef = {
  id: 'scene_jj_ty_04_zhangkang_verify',
  title: '第四幕 · 旧祠问旧',
  subtitle: '太原府 · 天波杨家旧祠正堂',
  mandatory: true,
  beats: [
    S('NPC-0037', '（张亢翻开河东经略使司印信底簿，怒拍桌案）“岂有此理！前线将士苦盼寒甲御敌，那边竟敢拿‘补损’名义虚报核销！都虞候大人，今夜恰好是十五，末将愿即刻调拨亲卫封锁渡口！”'),
    P('（抬手制止）“大张旗鼓反倒打草惊蛇。今夜由我亲自去汾水渡口人赃并获，张将军只需暗中稳住城防即可！”'),
  ],
  onFinishEffects: [openScene('scene_jj_ty_05_fen_river_ambush', JINJUN_TAIYUAN_IRON_QUEST_ID)],
}

const SCENE_05: StorySceneDef = {
  id: 'scene_jj_ty_05_fen_river_ambush',
  title: '第五幕 · 汾水截车',
  subtitle: '太原府 · 汾水渡口（1v2 激战）',
  mandatory: true,
  illustrationUrl: '/assets/quests/jinjun_taiyuan_fen_river_ambush.jpg',
  illustrationCaption: '汾水夜渡 · 截获河东私铁黑车激战一流统领',
  beats: [
    N('三更月暗，汾水渡口芦苇摇曳。果见三辆沉重黑车缓缓驶上木栈，车辙深陷泥土半尺！你飞身落于栈桥正中，横兵拦住去路。两名身手矫健的一流上品黑市统领厉铁山与鬼影镖段苍暴喝扑上！'),
  ],
  choices: [
    {
      id: 'jjty_fen_fight',
      label: '力战汾水渡口，截留玄铁黑车！（1v2 一流上品）',
      subLabel: '实战考验：同时迎战两名一流上品私兵统领',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_TAIYUAN_IRON_QUEST_ID,
          opponent: { kind: 'custom', npc: buildPrivateGuardLeader1() },
          extraOpponents: [{ kind: 'custom', npc: buildPrivateGuardLeader2() }],
          rule: 'story_trial',
          forbidEscapeReason: '玄铁甲叶即将装船出关，岂容贼人逃脱！',
          introText: '【1v2 汾水截车】迎战一流上品私兵统领【厉铁山】与【鬼影镖·段苍】！',
          onWin: [openScene('scene_jj_ty_06_shocking_confession', JINJUN_TAIYUAN_IRON_QUEST_ID)],
          onLose: [toast('二贼配合狠辣，且先退下重整武备再截渡口！')],
        },
      ],
    },
  ],
}

const SCENE_06: StorySceneDef = {
  id: 'scene_jj_ty_06_shocking_confession',
  title: '第六幕 · 供词惊心',
  subtitle: '太原府 · 汾水渡口',
  mandatory: true,
  beats: [
    N('掀开黑车篷布，冷冽月光下露出一片片锻打精良、刻着“河东官造”暗记的玄铁鱼鳞甲叶！被擒的段苍自知必死，咬牙供出惊天秘密：'),
    S({ name: '鬼影镖·段苍', title: '塞外接货副统领', factionName: '河东私铁黑市' }, '“嘿嘿……三衙都虞候又如何？采买判官早重金请了塞外【寒铁手 · 拓跋烈】大宗师亲自坐镇铁冶监！你若敢回监查办，拓跋宗师一双铁掌定叫你化作炉灰！”'),
    P('（眼神凛然如霜）“区区塞外宗师，也敢在我大宋官营铁冶监撒野？我倒要回去领教领教！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_TAIYUAN_IRON_QUEST_ID, stepId: 'confront_at_armory' },
    toast('速回【河东官营铁冶监 · 河东军器库与甲胄试刃院】亮证擒凶，迎战宗师拓跋烈！'),
  ],
}

const SCENE_07: StorySceneDef = {
  id: 'scene_jj_ty_07_furnace_confront',
  title: '第七幕 · 炉前对质',
  subtitle: '太原府 · 河东军器库与甲胄试刃院',
  mandatory: true,
  beats: [
    N('天明时分，你押着装满玄铁甲叶的黑车直闯铁冶监军器库，当着折继闵、呼延丕显与百余名甲士的面，将勘合账册与铁证甩在采买判官脸上！判官面如死灰，骤然摔碎酒杯放火点燃库房草垛，嘶声大吼：“请拓跋宗师出手助我脱身！”'),
    N('一阵刺骨阴寒掌风骤然压下，竟将四周滚烫的炉火热浪生生逼退三尺！一名身披黑铁斗篷、双掌泛着乌青金属光泽的白发老者缓步踏出——宗师下品的恐怖威压瞬间笼罩全场！'),
    S({ name: '拓跋烈', title: '塞外寒铁手 · 黑市宗师客卿', factionName: '塞外黑市客卿' }, '“年纪轻轻便居三衙都虞候，可惜今日撞在老夫手里，注定要折戟于此！”'),
  ],
  onFinishEffects: [openScene('scene_jj_ty_08_grandmaster_duel', JINJUN_TAIYUAN_IRON_QUEST_ID)],
}

const SCENE_08: StorySceneDef = {
  id: 'scene_jj_ty_08_grandmaster_duel',
  title: '第八幕 · 火海斩宗师',
  subtitle: '太原府 · 铁冶监高炉火海（宗师下品决战）',
  mandatory: true,
  illustrationUrl: '/assets/quests/jinjun_taiyuan_grandmaster_duel.jpg',
  illustrationCaption: '太原铁冶监火海 · 决战宗师下品塞外寒铁手拓跋烈',
  beats: [
    N('火光冲天，炉火星飞！呼延丕显提鞭欲上，却被宗师余波震退两步。你深吸一口气，护体真气鼓荡，选择如何迎战这位宗师下品强敌：'),
  ],
  choices: [
    {
      id: 'jjty_duel_solo',
      label: '【孤身直面宗师】屏退左右，独自生死决战拓跋烈（1v1 宗师下品）',
      subLabel: '宗师级高危生死战：击败拓跋烈可获最高评价！',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_TAIYUAN_IRON_QUEST_ID,
          opponent: { kind: 'custom', npc: buildColdIronGrandmaster() },
          rule: 'story_trial',
          forbidEscapeReason: '火海四起，一旦退步则军器库图谱尽毁！',
          introText: '【1v1 宗师决战】孤身迎战宗师下品【塞外寒铁手 · 拓跋烈】！',
          onWin: [openScene('scene_jj_ty_09_policy_choice', JINJUN_TAIYUAN_IRON_QUEST_ID)],
          onLose: [toast('寒铁手内劲霸道无比！且退下调息或携呼延丕显合力再战。')],
        },
      ],
    },
    {
      id: 'jjty_duel_coop',
      label: '【联手呼延将门】与呼延丕显并肩夹击拓跋烈（2v1 宗师下品）',
      subLabel: '稳妥军阵合击：携 NPC-0042 呼延丕显共战宗师下品',
      tone: 'primary',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_TAIYUAN_IRON_QUEST_ID,
          opponent: { kind: 'custom', npc: buildColdIronGrandmaster() },
          allies: [{ kind: 'npc', npcId: 'NPC-0042' }],
          rule: 'story_trial',
          forbidEscapeReason: '火海四起，岂能令宗师凶徒逃出铁冶监！',
          introText: '【2v1 协力破宗师】携手【呼延丕显】共战宗师下品【塞外寒铁手 · 拓跋烈】！',
          onWin: [openScene('scene_jj_ty_09_policy_choice', JINJUN_TAIYUAN_IRON_QUEST_ID)],
          onLose: [toast('宗师下品威势惊人，且退下重整武备再战！')],
        },
      ],
    },
  ],
}

const SCENE_09: StorySceneDef = {
  id: 'scene_jj_ty_09_policy_choice',
  title: '第九幕 · 军政抉择',
  subtitle: '太原府 · 河东官营铁冶监',
  mandatory: true,
  beats: [
    N('历经一番惊天动地的搏杀，拓跋烈寒铁双掌终于被你硬生生震破，吐血倒毙于高炉之前！采买判官亦被当场锁拿。扑灭余火后，折继闵与张亢赶来请示追回的八万斤冷锻玄铁与赃银该如何处置：'),
  ],
  choices: [
    {
      id: 'jjty_choice_capital',
      label: '【依律解京】全数封存赃银精铁解送三司，严明法度',
      subLabel: '获朝廷嘉赏：纹银 180 两 + 良阶灵药《太医局紫雪神丹》 + 河东篆刻刀匣',
      tone: 'primary',
      effects: [
        { type: 'giveSilver', amount: 180 },
        { type: 'giveItem', itemId: 'ITM-MED-113', qty: 1 },
        { type: 'giveItem', itemId: 'ITM-CUR-029', qty: 1 },
        { type: 'setFlag', flag: 'jjty_outcome', value: 'capital' },
        { type: 'setQuestStep', questId: JINJUN_TAIYUAN_IRON_QUEST_ID, stepId: 'farewell_jinci' },
        toast('已封存解京！请前往【晋祠古柏圣境 · 贞观唐碑亭与卧龙周柏】饮别收官。'),
      ],
    },
    {
      id: 'jjty_choice_forge',
      label: '【就地铸甲】准张亢所请重开三炉赶铸边军寒甲，实惠三军',
      subLabel: '获将门厚赠：良品防具《河东边军锁子甲》 + 良品配饰《河东精铁护腕环》 + 纹银 120 两',
      tone: 'primary',
      effects: [
        { type: 'giveSilver', amount: 120 },
        { type: 'giveItem', itemId: 'ARM-019', qty: 1 },
        { type: 'giveItem', itemId: 'ACC-023', qty: 1 },
        { type: 'setFlag', flag: 'jjty_outcome', value: 'forge' },
        { type: 'setQuestStep', questId: JINJUN_TAIYUAN_IRON_QUEST_ID, stepId: 'farewell_jinci' },
        toast('重开三炉赶铸边甲！请前往【晋祠古柏圣境 · 贞观唐碑亭与卧龙周柏】饮别收官。'),
      ],
    },
  ],
}

const SCENE_10: StorySceneDef = {
  id: 'scene_jj_ty_10_jinci_farewell',
  title: '第十幕 · 晋祠饮别',
  subtitle: '太原府 · 晋祠古柏圣境',
  mandatory: true,
  beats: [
    N('三日后，晋祠卧龙周柏下清泉潺潺。折继闵、呼延丕显与张亢设酒相送，举杯共敬你这位能文能武、既算得清账册又斩得了宗师的【三衙都虞候】。'),
    S('NPC-0035', '“有大人这等铁腕干才坐镇三衙，何愁河东边军甲不坚、刃不利？一路保重，来日沙场再会！”'),
  ],
  onFinishEffects: [
    { type: 'giveCombatExp', amount: 2400 },
    { type: 'modifyRenown', delta: 40 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0035' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0042' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0037' }, delta: 15 },
    { type: 'addSectContribution', amount: 150 },
    { type: 'completeQuest', questId: JINJUN_TAIYUAN_IRON_QUEST_ID, outcome: 'completed' },
    toast('《铁冶监 · 玄铁失耗案》完成！获战斗经验 2400、声望 +40 及丰厚军械赏赐！'),
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_jj_ty_01_imperial_tally: SCENE_01,
  scene_jj_ty_02_ledger_math: SCENE_02,
  scene_jj_ty_03_tavern_clue: SCENE_03,
  scene_jj_ty_04_zhangkang_verify: SCENE_04,
  scene_jj_ty_05_fen_river_ambush: SCENE_05,
  scene_jj_ty_06_shocking_confession: SCENE_06,
  scene_jj_ty_07_furnace_confront: SCENE_07,
  scene_jj_ty_08_grandmaster_duel: SCENE_08,
  scene_jj_ty_09_policy_choice: SCENE_09,
  scene_jj_ty_10_jinci_farewell: SCENE_10,
}
