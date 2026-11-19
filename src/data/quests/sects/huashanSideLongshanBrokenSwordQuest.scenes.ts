import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_SIDE10_QUEST_ID } from './huashanSideLongshanBrokenSwordQuest'

const SPEAKER_DYING_SCOUT: StorySpeakerSpec = {
  kind: 'custom',
  name: '秦州斥候校尉',
  title: '陇右古道守烽边卒',
  factionName: '大宋西军',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
}

const SPEAKER_SLAVE_CAPTAIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '金牌剑奴甲首',
  title: '西夏一品堂 · 十二金牌剑奴阵首',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
}

const SPEAKER_HELIAN_DUANYUE: StorySpeakerSpec = {
  kind: 'custom',
  name: '赫连断岳',
  title: '断剑魔陀 · 西夏一品堂宗师供奉',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildSwordSlaveCaptainNpc(index: 1 | 2 | 3): NodeNpc {
  const names: Record<1 | 2 | 3, string> = {
    1: '金牌剑奴 · 铁面甲首',
    2: '金牌剑奴 · 寒锋乙首',
    3: '金牌剑奴 · 断脉丙首',
  }
  const talks: Record<1 | 2 | 3, string> = {
    1: '“奉折剑令，中原剑客皆当断剑伏首！结连环剑阵！”',
    2: '“便是潼关剑神亲至，今日也难逃十二金牌剑奴锁杀！”',
    3: '“杀！将华山双剑斩于陇山芦苇之中！”',
  }
  return makeQuestNpc({
    id: `QUEST_HSS10_SLAVE_CAPTAIN_${index}`,
    name: names[index],
    title: '西夏一品堂 · 金牌剑奴阵首',
    realm: '一流下品',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: talks[index],
    stats: { hp: 2480, mp: 2220, agi: 60, res: 47 },
    talents: { bone: 74, comprehension: 66, charm: 30 },
    equippedArts: { neigong: 'MA-078', qinggong: 'MA-056', move1: 'MA-067', move2: 'MA-112' },
    learnedArts: [
      { artId: 'MA-078', level: 6 },
      { artId: 'MA-056', level: 6 },
      { artId: 'MA-067', level: 7 },
      { artId: 'MA-112', level: 7 },
    ],
    equipped: { weapon: 'WPN-012' },
    questBadgeLabel: '金牌剑奴',
  })
}

function buildHelianDuanyueNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS10_HELIAN_DUANYUE',
    name: '赫连断岳',
    title: '断剑魔陀 · 西夏一品堂宗师供奉',
    realm: '宗师中品',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“本座这口百斤玄铁重剑，已斩断关西三十六柄名锋！华山小辈，你拿什么挡我一剑崩山？！”',
    stats: { hp: 5860, mp: 5420, agi: 84, res: 76 },
    talents: { bone: 96, comprehension: 86, charm: 36 },
    equippedArts: { neigong: 'MA-078', qinggong: 'MA-056', move1: 'MA-075', move2: 'MA-067' },
    learnedArts: [
      { artId: 'MA-078', level: 10 },
      { artId: 'MA-056', level: 9 },
      { artId: 'MA-075', level: 10 },
      { artId: 'MA-067', level: 10 },
    ],
    equipped: { weapon: 'WPN-001' },
    questBadgeLabel: '断剑魔陀',
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hss10_01: {
    id: 'scene_hss10_01',
    title: '第一幕 · 血书折剑',
    subtitle: '华山绝顶论剑台 · 落雁峰顶白玉坛',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，西岳寒霜初降。清晨时分，一只翼羽染血的传信灰鸽跌落在落雁峰白玉坛石阶前；几乎同一刻，山下哨卡快马抬上了一只裹着黑布的沉重木匣。'),
      N('木匣掀开，寒气逼人——里面整整齐齐码着三柄从中断裂的名剑残锋，每一截断剑旁，都钉着一枚阴刻西夏党项篆文的黑铁牌，上书三个血红大字：【折剑令】！'),
      P('（脸色骤变，俯身认出其中一柄剑格铭文）“这是凤翔‘青萍剑老’周前辈、邠州‘寒梅剑客’沈前辈，还有陇州‘铁胆剑叟’徐前辈的随身佩剑！三位关中名宿竟在一夜之间惨遭毒手？！”'),
    ],
    choices: [
      {
        id: 'hss10_01_next',
        label: '急呈血书与铁牌，察看秦烈山神色',
        tone: 'gold',
        effects: [openScene('scene_hss10_02', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_02: {
    id: 'scene_hss10_02',
    title: '第二幕 · 断剑魔陀',
    subtitle: '落雁峰顶白玉坛 · 剑神震怒',
    mandatory: true,
    beats: [
      N('「潼关剑神」秦烈山拾起一枚冰冷的「折剑令」黑铁牌，五指缓缓收拢——“咔嚓”一声闷响，精铁铸造的令牌竟被他纯厚真气生生捏裂！'),
      S('NPC-0147', '“西夏一品堂……好大的狗胆！能以纯霸重剑连断关中三剑老手中宝剑而不留半丝余地者，贺兰山下唯有一人——西夏一品堂宗师供奉‘断剑魔陀 · 赫连断岳’！”'),
      S('NPC-0147', '“血书上说，赫连断岳携十二名精通连环剑阵的西夏金牌剑奴，怀揣一卷《西夏折剑录》，扬言要自陇山一路东进，先灭关中诸派剑宿，最后登我华山绝顶，折尽中原名剑锐气！”'),
      P('“如此猖狂！若任他踏入关中腹地，不仅江湖剑道蒙羞，更将动摇陕西抗夏军心民气！”'),
    ],
    choices: [
      {
        id: 'hss10_02_next',
        label: '拱手请缨，询问秦前辈如何截杀赫连断岳',
        tone: 'danger',
        effects: [openScene('scene_hss10_03', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_03: {
    id: 'scene_hss10_03',
    title: '第三幕 · 剑神破例',
    subtitle: '落雁峰顶白玉坛 · 十年初下峰',
    mandatory: true,
    beats: [
      N('秦烈山缓缓解下身旁那柄十年未曾离开落雁峰的古朴青锋，负于背后，眸光如冷电划破云海。'),
      S('NPC-0147', '“十年来，我立誓镇守落雁峰不履红尘。可今日西夏宗师携折剑令欺上关西，若我华山不敢主动西出迎敌，岂不叫天下英雄耻笑！”'),
      S('NPC-0147', '“赫连断岳人马刚越过六盘山余脉，正沿陇右古道向秦州东进。你如今已晋华山第 4 阶高徒，侠名远播——随我下山！你我二人快马西驰，将这西夏魔陀与十二金牌剑奴永远拦死在【秦州府 · 陇右古道断碑烽火望夏台】！”'),
      P('（热血沸腾，抱拳沉声）“能随秦前辈双剑西出、共诛西夏魔陀，弟子死亦无憾！”'),
    ],
    choices: [
      {
        id: 'hss10_03_ride',
        label: '随秦烈山整备骏马佩剑，破晓西出华山',
        tone: 'gold',
        effects: [openScene('scene_hss10_04', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_04: {
    id: 'scene_hss10_04',
    title: '第四幕 · 双剑西出',
    subtitle: '关中官道 · 并骑赴陇山',
    illustrationUrl: '/assets/quests/hs_side10_qin_ride_west.jpg',
    illustrationCaption: '双剑西出 · 秦烈山破例下落雁峰，携主角并骑疾驰赴陇山古道',
    mandatory: true,
    beats: [
      N('晨雾尚未散尽，两骑快马已如离弦利箭般冲出潼关西门，沿渭水官道一路疾驰！秦烈山白衣猎猎、剑气冲霄，与你并辔而行，沿途关中江湖豪杰见了「潼关剑神」亲出西行，无不肃然让道抱拳致敬。'),
      S('NPC-0147', '“记住，赫连断岳的百斤玄铁重剑看似笨拙，实则大巧不工、重若崩山，绝不可凭蛮力硬架；至于他麾下十二金牌剑奴，专擅连环锁杀，须以双剑奇正相辅，一鼓作气撕开阵眼！”'),
      P('“弟子谨记！这便全速赶赴【秦州府 · 陇右古道断碑烽火望夏台】截断其东进之路！”'),
    ],
    choices: [
      {
        id: 'hss10_04_start',
        label: '策马扬鞭，全速奔袭秦州府陇右古道断碑烽火望夏台',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_SIDE10_QUEST_ID, stepId: 'ride_longshan' },
          toast('已开启《陇山断道 · 西夏折剑令》！请速赴【秦州府 / 陇右古道 > 断碑烽火望夏台】截敌！', 'success', '双剑西出'),
        ],
      },
    ],
  },

  scene_hss10_05: {
    id: 'scene_hss10_05',
    title: '第五幕 · 望夏残阳',
    subtitle: '秦州府 · 陇右古道断碑烽火望夏台',
    mandatory: true,
    beats: [
      N('三日疾驰，陇山古道终于尽在眼前。深秋残阳如血，将漫山遍野如雪翻涌的白芦苇染成一片壮烈绯红。汉唐遗留的断碑与残破烽火台孤零零矗立在隘口高坡之上，西风凛冽如刀。'),
      N('一名肩头中剑、满身尘血的大宋秦州斥候校尉正倚靠断碑喘息，见你与秦烈山策马赶至，挣扎着抬手指着西面隘口尘烟。'),
      S(SPEAKER_DYING_SCOUT, '“华……华山前辈来得正好！西夏一品堂的铁篷大车与十二名金甲剑奴就在半里外谷口！他们杀了沿途三处哨卡，狂言今夜就要宿营陇山、明日挥兵东入关中……”'),
      P('（迅速取出金疮药替校尉包扎止血，将其扶至断碑背风处）“校尉安心养伤！有秦前辈与我在此，这伙西夏妖人一步也休想跨过断碑！”'),
    ],
    choices: [
      {
        id: 'hss10_05_next',
        label: '登高俯瞰古道尘烟，与秦烈山商定破阵之策',
        tone: 'primary',
        effects: [openScene('scene_hss10_06', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_06: {
    id: 'scene_hss10_06',
    title: '第六幕 · 断道列阵',
    subtitle: '断碑烽火望夏台 · 策论定谋',
    mandatory: true,
    beats: [
      N('你顺着残阳余晖细察陇右古道地形：西侧隘口狭窄，两侧皆是及腰深的枯苇沟壑，正是一夫当关、破其十二连环剑阵的天险绝地！'),
      P('“秦前辈，古道西口狭窄，十二金牌剑奴若在此处强行展开圆阵，必被两侧断崖卡住两翼！你我若趁其前锋刚出谷口、阵型未全之际双剑突入中轴，便可一举截断其首尾呼应！”'),
      S('NPC-0147', '（目露赞许）“兵法剑理融会贯通，好眼力！既然如此，我攻左翼破其长剑联防，你直取中宫阵首，教这帮西夏剑奴见识见识什么叫真正的华山双剑！”'),
    ],
    choices: [
      {
        id: 'hss10_06_next',
        label: '跃下断碑高坡，横剑截断陇山古道',
        tone: 'danger',
        effects: [openScene('scene_hss10_07', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_07: {
    id: 'scene_hss10_07',
    title: '第七幕 · 金牌剑奴',
    subtitle: '陇右古道 · 十二连环阵',
    mandatory: true,
    beats: [
      N('马蹄与铁甲铿锵声由远及近！十二名头戴冷铁面具、胸悬西夏鎏金牌的「金牌剑奴」护着一辆黑漆铁篷马车踏出谷口。见古道中央孤零零立着两道执剑身影，前排三名一流境剑奴阵首立刻止步，十二柄夏国冷锻神剑“呛啷”齐声出鞘！'),
      S(SPEAKER_SLAVE_CAPTAIN, '“前面可是华山派之人？赫连供奉早已算定你们会来送死！金牌剑奴听令——变十二连环绞杀阵，先取这两颗人头献给供奉！”'),
      S('NPC-0147', '（青锋出鞘，剑鸣震落十丈苇絮）“聒噪！随我破阵！”'),
    ],
    choices: [
      {
        id: 'hss10_07_next',
        label: '与「潼关剑神」秦烈山并肩踏入芦苇剑阵！',
        tone: 'danger',
        effects: [openScene('scene_hss10_08', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_08: {
    id: 'scene_hss10_08',
    title: '第八幕 · 残阳破阵',
    subtitle: '断碑烽火望夏台 · 双剑合璧',
    illustrationUrl: '/assets/quests/hs_side10_slave_array.jpg',
    illustrationCaption: '残阳破阵 · 芦苇如雪古烽燧下，与潼关剑神双剑合璧破金牌剑奴阵',
    mandatory: true,
    beats: [
      N('血色残阳之下，漫天芦花如大雪纷飞！秦烈山剑势大开大阖如华岳云海翻腾，你的剑光则灵动凌厉穿插补隙，二人一正一奇、双剑合璧，硬生生撞入三大金牌剑奴阵首组成的铁壁剑网之中！'),
    ],
    choices: [
      {
        id: 'hss10_08_fight',
        label: '与秦烈山双剑合璧，击破三名金牌剑奴阵首！',
        subLabel: '协同决战 · 携秦烈山（一流上品）迎战三大金牌剑奴阵首（一流下品 ×3）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_SIDE10_QUEST_ID,
            opponent: { kind: 'custom', npc: buildSwordSlaveCaptainNpc(1) },
            extraOpponents: [
              { kind: 'custom', npc: buildSwordSlaveCaptainNpc(2) },
              { kind: 'custom', npc: buildSwordSlaveCaptainNpc(3) },
            ],
            allies: [{ kind: 'npc', npcId: 'NPC-0147' }],
            rule: 'duel',
            forbidEscapeReason: '与潼关剑神双剑合璧截道陇山，岂有退步之理！',
            deathTitle: '血洒陇山古道',
            deathDetail: '你在陇右古道与秦烈山联手破金牌剑奴阵时不幸遭连环剑网重创，饮恨烽燧之下。',
            onWin: [openScene('scene_hss10_09', HUASHAN_SIDE10_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss10_09: {
    id: 'scene_hss10_09',
    title: '第九幕 · 阵溃芦飞',
    subtitle: '陇右古道 · 剑奴覆灭',
    mandatory: true,
    beats: [
      N('剑光纵横交错！秦烈山一剑震飞甲首冷锻剑、顺势削落乙首护肩，你则借力腾空一剑贯透丙首阵眼！三大阵首轰然倒地，号称横行河西的十二金牌剑奴阵瞬间土崩瓦解，余下剑奴非死即伤，溃逃入深谷芦苇之中！'),
      N('古道之上残剑横陈，白芦花沾染猩红血点，飘飘扬扬落满青石。'),
    ],
    choices: [
      {
        id: 'hss10_09_next',
        label: '凝神屏息，盯紧十丈外缓缓震颤的黑漆铁篷马车',
        tone: 'danger',
        effects: [openScene('scene_hss10_10', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_10: {
    id: 'scene_hss10_10',
    title: '第十幕 · 魔陀出车',
    subtitle: '断碑烽火望夏台 · 百斤玄铁',
    mandatory: true,
    beats: [
      N('“轰隆！”黑漆铁篷马车车厢竟自内而外轰然炸裂成漫天碎木！一道铁塔般魁梧雄伟的暗红僧袍身影缓步踏出烟尘——光头狰狞、双目如铜铃燃烧，右手单臂拖着一柄宽逾半尺、乌沉无锋的百斤玄铁重剑，剑尖在冻硬的黄土官道上拖出一道三寸深的笔直沟壑！'),
      S(SPEAKER_HELIAN_DUANYUE, '“哈哈哈哈！不错，不错！总算来了两个不像泥捏的华山剑客！本座西夏一品堂供奉‘断剑魔陀’赫连断岳，十二个废物剑奴死了也就死了，能引出‘潼关剑神’秦烈山亲自下山，这一趟关西便值回票价！”'),
      N('赫连断岳左手一抖，将三柄从中断裂的关中名剑残刃嗤笑抛在你们脚前，磅礴如山岳压顶般的宗师威压顿时席卷整片陇山古道！'),
    ],
    choices: [
      {
        id: 'hss10_10_next',
        label: '与秦烈山稳住身形，冷眼戒备赫连断岳暗藏后手',
        tone: 'danger',
        effects: [openScene('scene_hss10_11', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_11: {
    id: 'scene_hss10_11',
    title: '第十一幕 · 暗弩毒机',
    subtitle: '断碑烽火望夏台 · 剑神护徒',
    mandatory: true,
    beats: [
      N('秦烈山冷哼一声，正欲踏前一步迎战这位西夏宗师，赫连断岳却狞笑一声，百斤玄铁重剑猛地往地上一顿！'),
      N('“嗖嗖嗖！”早已埋伏在断碑枯苇暗沟里的数具西夏连发毒弩骤然齐射，漫天淬毒铁矢如暴雨般封死了你的退路！秦烈山脸色微变，毫不停顿地旋身掠至你身前，长剑舞成一团密不透风的银光将毒箭尽数格落——却在挥剑斩毙两名偷袭暗弩手的刹那，左肩衣袖被一枚刁钻的破甲冷箭擦破皮肉，瞬间泛起一抹乌黑！'),
      S(SPEAKER_HELIAN_DUANYUE, '“兵不厌诈！秦烈山，中了我西夏‘蝎尾断肠毒’，你若强行催动全功，不出十合必毒攻心脉！哈哈哈哈，这下华山还剩谁能接本座一剑？！”'),
    ],
    choices: [
      {
        id: 'hss10_11_next',
        label: '急步护住秦前辈左翼，拔剑直指狞笑的赫连断岳',
        tone: 'danger',
        effects: [openScene('scene_hss10_12', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_12: {
    id: 'scene_hss10_12',
    title: '第十二幕 · 独担大义',
    subtitle: '断碑烽火望夏台 · 托剑死战',
    mandatory: true,
    beats: [
      N('秦烈山神色不动如山，反手并指如剑点住自己肩井大穴封住毒气蔓延，缓缓盘膝坐于断碑之前，抬头望向你的目光却炽热如铁。'),
      S('NPC-0147', '“区区蝎尾毒，我运功半柱香便可逼出。可这西夏魔陀绝不会给我半柱香工夫……孩子，今日关中剑道兴衰、三剑老血仇、华山百年声威，尽系于你这一剑之上！你可敢正面接他这口百斤玄铁重剑？”'),
      P('（深吸一口凛冽陇山秋风，反手挽出清越剑花，朗声一笑）“前辈只管安心逼毒！弟子今日便以华山绝学，在陇山古道上亲手震裂他的玄铁重剑，取其首级祭奠关中三位前辈！”'),
    ],
    choices: [
      {
        id: 'hss10_12_ready',
        label: '独步迎向十丈外的赫连断岳，准备宗师生死一战！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_SIDE10_QUEST_ID, 'slay_helian'),
          openScene('scene_hss10_13', HUASHAN_SIDE10_QUEST_ID),
        ],
      },
    ],
  },

  scene_hss10_13: {
    id: 'scene_hss10_13',
    title: '第十三幕 · 重剑崩山',
    subtitle: '陇右古道 · 宗师压境',
    mandatory: true,
    beats: [
      S(SPEAKER_HELIAN_DUANYUE, '“狂妄小辈！秦烈山尚且未必接得住本座十剑，你一个毛头后生也敢言震裂我这口百斤玄铁重剑？来吧——若你死在我剑下，本座便把你的名字也刻进《西夏折剑录》！”'),
      N('话音未落，赫连断岳双臂肌肉虬结暴涨，百斤玄铁重剑如黑龙出海般横空劈来！狂暴劲风尚未及体，古道两侧十丈枯苇已被凌厉剑压齐齐压伏贴地，仿佛整座陇山都随这一剑轰然倾塌！'),
    ],
    choices: [
      {
        id: 'hss10_13_next',
        label: '心无旁骛，催动毕生修为迎向宗师重剑！',
        tone: 'danger',
        effects: [openScene('scene_hss10_14', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_14: {
    id: 'scene_hss10_14',
    title: '第十四幕 · 斩落魔陀',
    subtitle: '断碑烽火望夏台 · 震裂玄铁',
    illustrationUrl: '/assets/quests/hs_side10_slay_helian.jpg',
    illustrationCaption: '斩落魔陀 · 绝学震裂百斤玄铁重剑，一剑枭首西夏供奉赫连断岳',
    mandatory: true,
    beats: [
      N('残阳最后一缕血光映亮你的三尺青锋！面对大巧不工、重若泰山的百斤玄铁重剑，你不再硬拼蛮力，而是将华山数载苦修的磅礴内息与精微剑意尽数凝于三寸剑芒，以极刚化极柔、以寸劲贯重锋，逆着崩山剑浪悍然突进！'),
    ],
    choices: [
      {
        id: 'hss10_14_duel',
        label: '华山绝学全开，正面决战宗师「断剑魔陀 · 赫连断岳」！',
        subLabel: '宗师生死决战 · 「断剑魔陀」赫连断岳（宗师中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_SIDE10_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHelianDuanyueNpc() },
            rule: 'duel',
            forbidEscapeReason: '秦烈山正在身后运功逼毒，此战唯死而已，绝无半步退路！',
            deathTitle: '剑折陇山望夏台',
            deathDetail: '你在陇右古道独战西夏宗师供奉「断剑魔陀 · 赫连断岳」，力竭战死于百斤玄铁重剑之下。',
            onWin: [openScene('scene_hss10_15', HUASHAN_SIDE10_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss10_15: {
    id: 'scene_hss10_15',
    title: '第十五幕 · 裂铁枭首',
    subtitle: '断碑烽火望夏台 · 宗师伏诛',
    mandatory: true,
    beats: [
      N('“铮——轰！！！”一声宛如天崩地裂的金属巨鸣炸响陇山古道！百余回合生死搏杀之后，你终于寻得赫连断岳重剑横扫回转间千钧一发的力竭节点，毕生精纯真气如九天落雷般顺着剑尖透入百斤玄铁重剑中脊暗伤之处！'),
      N('无数道细密电芒般的裂纹顺着乌黑剑身疯狂蔓延——“咔嚓”一声巨响，这柄横行河西数十载、斩断中原三十六柄名剑的百斤玄铁重剑竟凌空震裂崩飞！'),
      N('赫连断岳满脸难以置信的惊骇尚未消散，你的青锋已趁势如匹练横空掠过！寒光一闪，不可一世的西夏一品堂宗师供奉「断剑魔陀 · 赫连断岳」轰然伏尸于漫天芦苇血色残阳之中！'),
    ],
    choices: [
      {
        id: 'hss10_15_next',
        label: '长舒一口浊气收剑归鞘，步至断碑前察看秦烈山伤势',
        tone: 'gold',
        effects: [openScene('scene_hss10_16', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_16: {
    id: 'scene_hss10_16',
    title: '第十六幕 · 焚录祭魂',
    subtitle: '断碑烽火望夏台 · 折剑录焚',
    mandatory: true,
    beats: [
      N('恰在此时，秦烈山长啸一声起身，肩头最后一缕黑血随真气逼出体外。他缓步走到崩裂成数截的玄铁重剑与赫连断岳尸首前，久久凝视，终于放声大笑起来，笑声震彻陇山峡谷！'),
      S('NPC-0147', '“震裂百斤玄铁、一剑枭首宗师魔陀！好！好极了！从此陇山以东，西夏一品堂再不敢轻言‘折剑’二字！”'),
      N('你自碎裂的铁篷车中搜出那卷沾满关西侠客名姓的铁皮《西夏折剑录》，与秦烈山一道在断碑古烽燧下点燃熊熊烈火，将《西夏折剑录》与三枚黑铁「折剑令」尽数付之一炬，遥祭凤翔、邠州、陇州三位遇害剑老英灵。'),
    ],
    choices: [
      {
        id: 'hss10_16_next',
        label: '牵起赫连断岳坐骑党项青马，随秦前辈启程东归华山',
        tone: 'gold',
        effects: [openScene('scene_hss10_17', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],
  },

  scene_hss10_17: {
    id: 'scene_hss10_17',
    title: '第十七幕 · 星夜归岳',
    subtitle: '陇右古道 · 凯旋东返',
    mandatory: true,
    beats: [
      N('暮色四合，大宋秦州援军听闻烽火赶至隘口，见西夏一品堂十二金牌剑奴尽灭、连宗师赫连断岳亦已被斩首于望夏台下，满营将士齐声欢呼如雷，当场备下军功赏银并护送受伤斥候回营。'),
      S('NPC-0147', '“此战你立下不世之功，那匹无主的【横山党项善驰青马】神骏非凡，便归你代步吧。走，随我回【华山绝顶论剑台 · 落雁峰顶白玉坛】，我也该将压箱底的剑道心得倾囊相授了！”'),
    ],
    choices: [
      {
        id: 'hss10_17_return',
        label: '跨上横山青马，与秦烈山并骑东归华山落雁峰',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_SIDE10_QUEST_ID, 'return_huashan'),
          toast('已斩杀「断剑魔陀 · 赫连断岳」！请返回【华山绝顶论剑台 > 落雁峰顶白玉坛】复命受赏！', 'success', '斩落魔陀'),
        ],
      },
    ],
  },

  scene_hss10_18: {
    id: 'scene_hss10_18',
    title: '第十八幕 · 落雁论功',
    subtitle: '华山绝顶论剑台 · 剑道大成',
    mandatory: true,
    beats: [
      N('旭日东升，云海翻涌如金涛。回到落雁峰顶白玉坛，秦烈山将你陇山斩落西夏宗师、焚毁《西夏折剑录》的壮举宣告全山，华山上下无论气剑二宗皆为之振奋欢腾！'),
      S('NPC-0147', '“昔日我总担忧华山后继无人，怕终有一日关中剑道会在异族铁蹄下断绝。今日观你陇山一战，策谋定于未战、剑骨屹于宗师之前——华山有你，足以再盛百年！”'),
      S('NPC-0147', '“这匹【横山党项善驰青马】、两盒【天香断续胶】与秦州防边重赏一百六十两纹银你且收好；且随我于白玉坛前再演一遍本门绝学，将昨夜震裂玄铁的那一缕宗师感悟彻底凝实！”'),
      N('朝阳洒满西岳群峰，你迎着浩荡天风收剑肃立，但觉胸中浩气纵横，已然隐隐窥见当世剑道宗师的绝顶气象！'),
    ],
    choices: [
      {
        id: 'hss10_18_finish',
        label: '拜谢秦前辈栽培厚赐，铭记陇山斩魔之志',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 160, reason: '秦州陇山截杀西夏一品堂宗师防边重赏' },
          { type: 'addSectContribution', amount: 160 },
          { type: 'giveCombatExp', amount: 2500, reason: '陇山古道震裂玄铁重剑斩杀赫连断岳' },
          { type: 'modifyRenown', delta: 50, reason: '陇山断道一剑枭首西夏断剑魔陀，威震关西' },
          { type: 'modifyChivalry', delta: 35, reason: '焚毁西夏折剑录，替关中剑老雪恨护民' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0147' }, delta: 25 },
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'giveItem', itemId: 'MNT-010', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-112', qty: 2 },
          {
            type: 'branch',
            condition: flag('hs_branch', 'eq', 'qi'),
            thenEffects: [{ type: 'addArtExp', artId: 'MA-058', amount: 500 }],
            elseEffects: [{ type: 'addArtExp', artId: 'MA-049', amount: 500 }],
          },
          { type: 'completeQuest', questId: HUASHAN_SIDE10_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《陇山断道 · 西夏折剑令》！获纹银 160 两、贡献 160、横山党项善驰青马、天香断续胶与宗师剑道大成感悟！',
            'success',
            '斩落魔陀',
          ),
        ],
      },
    ],
  },
}
