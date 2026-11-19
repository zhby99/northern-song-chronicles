import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_SIDE06_QUEST_ID } from './huashanSideJianTongguanQuest'

const SPEAKER_SCOUT_CHEN: StorySpeakerSpec = {
  kind: 'custom',
  name: '陈铁柱',
  title: '陕西边军老斥候班头',
  factionName: '大宋西军',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
}

const SPEAKER_TANGUT_SCOUT: StorySpeakerSpec = {
  kind: 'custom',
  name: '野利阿骨',
  title: '西夏一品堂踏冰游骑哨长',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_WEIMING_HAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '嵬名悍',
  title: '铁骨刀 · 西夏一品堂精骑百夫长',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildScoutAllyNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS06_ALLY_CHEN',
    name: '陈铁柱',
    title: '潼关老斥候班头',
    realm: '二流下品',
    factionName: '大宋西军',
    avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
    talk: '“少侠专攻他左肋下盘，老汉的横刀替你架住马头！”',
    stats: { hp: 1020, mp: 760, agi: 44, res: 32 },
    talents: { bone: 62, comprehension: 45, charm: 40 },
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-157', move1: 'MA-131', move2: 'MA-135' },
    learnedArts: [
      { artId: 'MA-103', level: 4 },
      { artId: 'MA-157', level: 3 },
      { artId: 'MA-131', level: 4 },
      { artId: 'MA-135', level: 4 },
    ],
    equipped: { weapon: 'WPN-034' },
    questBadgeLabel: '边军老斥候',
  })
}

function buildTangutScoutNpc(index: 1 | 2): NodeNpc {
  const isFirst = index === 1
  return makeQuestNpc({
    id: isFirst ? 'QUEST_HSS06_TANGUT_SCOUT_1' : 'QUEST_HSS06_TANGUT_SCOUT_2',
    name: isFirst ? '野利阿骨' : '没藏巴图',
    title: '西夏一品堂 · 踏冰游骑',
    realm: '二流下品',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: isFirst
      ? '“宋狗斥候竟藏在断崖上！先砍了你的脑袋再点狼烟！”'
      : '“夏国铁骑踏冰而来，区区华山小剑客也敢挡马！”',
    stats: isFirst
      ? { hp: 980, mp: 780, agi: 45, res: 30 }
      : { hp: 940, mp: 740, agi: 44, res: 29 },
    talents: { bone: 60, comprehension: 42, charm: 28 },
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-157', move1: 'MA-151', move2: 'MA-189' },
    learnedArts: [
      { artId: 'MA-103', level: 4 },
      { artId: 'MA-157', level: 3 },
      { artId: 'MA-151', level: 4 },
      { artId: 'MA-189', level: 4 },
    ],
    equipped: { weapon: 'WPN-043' },
    questBadgeLabel: '党项游骑',
  })
}

function buildWeimingHanNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS06_WEIMING_HAN',
    name: '嵬名悍',
    title: '铁骨刀 · 西夏一品堂百夫长',
    realm: '二流上品',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“我这口夏国冷锻弯刀连宋军步人甲都能一刀劈裂，你那根细铁条拿什么接？！”',
    stats: { hp: 1780, mp: 1520, agi: 56, res: 42 },
    talents: { bone: 74, comprehension: 55, charm: 34 },
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-157', move1: 'MA-131', move2: 'MA-151' },
    learnedArts: [
      { artId: 'MA-103', level: 6 },
      { artId: 'MA-157', level: 5 },
      { artId: 'MA-131', level: 6 },
      { artId: 'MA-151', level: 6 },
    ],
    equipped: { weapon: 'WPN-043' },
    questBadgeLabel: '铁骨刀百夫长',
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hss06_01: {
    id: 'scene_hss06_01',
    title: '第一幕 · 严冬蹴山',
    subtitle: '潼关天险瓮城 · 黄河大折惊涛烽火台',
    mandatory: true,
    beats: [
      N('{reignYear}隆冬，朔风卷着干雪抽打着黄河潼关段的赤褐崖壁，河面结起三尺厚冰，冰层下隐隐传来沉闷如雷的暗流轰鸣。'),
      N('三日前在西岳绝顶，宿老封不弃见你与同门拆剑竟越拆越讲究章法，登时冷哼一声，一脚把你踹下了苍龙岭石阶——'),
      S('NPC-0167', '“在山上拿木剑摆一万遍架子，不如去黄河边听一夜胡马嘶鸣！滚去【黄河大折惊涛烽火台】找陕西西军的老斥候同吃同卧，什么时候把塞外冷锻钢刀的劈风劲头刻进眼睛里，什么时候再回山上见我！”'),
      P('（裹紧单薄青袍，迎着凛冽河风踏上烽火台石阶）“封师叔虽嘴毒心狠，可这一身冰风扑面而来，握剑的虎口倒比山上清醒十倍。”'),
    ],
    choices: [
      {
        id: 'hss06_01_next',
        label: '步入烽火台背风石窑，拜会驻守老斥候',
        tone: 'gold',
        effects: [openScene('scene_hss06_02', HUASHAN_SIDE06_QUEST_ID)],
      },
    ],
  },

  scene_hss06_02: {
    id: 'scene_hss06_02',
    title: '第二幕 · 冰崖同卧',
    subtitle: '黄河大折惊涛烽火台 · 边军老卒',
    mandatory: true,
    beats: [
      N('烽火台背风石窑里燃着一小堆牛粪干柴，脸上横贯一道刀疤的老斥候班头陈铁柱正拿磨刀石慢吞吞蹭着一柄缺口横刀。见你背负长剑、腰悬华山剑穗，他咧嘴一笑，递来半块烤得发硬的胡饼。'),
      S(SPEAKER_SCOUT_CHEN, '“封老前辈托信送来的小剑客？哈哈，西军里谁不知道华山剑宗那股子疯劲儿！先啃两口干粮暖暖胃——你瞧北岸冰面那几道灰影子没？”'),
      S(SPEAKER_SCOUT_CHEN, '“大雪封山，党项狗崽子最爱挑黄河结死冰的夜里摸过河来烧咱们的军粮草场。昨夜上游十里已有马蹄碎冰声，今夜亥子之交，怕是有西夏一品堂的悍骑压阵偷渡！”'),
      P('“陈班头，西夏马队既有马势借力，又有冷锻弯刀破甲，步下剑客当如何抢先机？”'),
      S(SPEAKER_SCOUT_CHEN, '“马快则转折迟，刀沉则回势慢！待会儿随老汉伏去断崖枯草里，趁他马蹄踏上黄土斜坡、前蹄微抬的一刹那——你那口快剑，便有百步断刃之机！”'),
    ],
    choices: [
      {
        id: 'hss06_02_accept',
        label: '谢过老班头指点，整备鞍马佩剑潜伏断崖',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_SIDE06_QUEST_ID, stepId: 'loess_ambush' },
          toast('已开启《潼关试铁 · 百步断刃行》！请于【黄河大折惊涛烽火台】潜伏断崖截击党项马队！', 'success', '剑宗试铁'),
        ],
      },
    ],
  },

  scene_hss06_03: {
    id: 'scene_hss06_03',
    title: '第三幕 · 黄土伏骑',
    subtitle: '黄河十里烽燧断崖 · 严冬暗袭',
    illustrationUrl: '/assets/quests/hs_side06_loess_ambush.jpg',
    illustrationCaption: '黄土伏骑 · 严冬黄河冰封，随边军老斥候潜伏十里烽燧断崖',
    mandatory: true,
    beats: [
      N('寒月如钩，被残云半遮。你与老斥候陈铁柱伏在黄河大折外十里的黄土断崖枯蒿丛中，身下两匹陕西川马裹着厚毡防滑蹄铁，喷出的白气瞬间凝成霜花。'),
      N('忽听冰河深处传来一阵细密压抑的“咔嚓、咔嚓”碎冰声！极目望去，十余骑身披黑羊毛氅的党项铁骑正裹着马蹄悄然渡过冰封河面，为首一名虬髯大汉背负一口泛着幽蓝寒光的厚背弯刀，杀气隔着百丈冰风扑面而来！'),
      S(SPEAKER_SCOUT_CHEN, '（压低嗓音，指节叩响刀柄）“是西夏一品堂的‘铁骨刀’嵬名悍！去年他在环庆路一刀斩断过咱们两名都头的长枪！前面那两骑是探路游哨，先莫惊动大队，把他们按死在崖口！”'),
    ],
    choices: [
      {
        id: 'hss06_03_next',
        label: '屏息按剑，待两名党项前哨游骑摸近崖口',
        tone: 'danger',
        effects: [openScene('scene_hss06_04', HUASHAN_SIDE06_QUEST_ID)],
      },
    ],
  },

  scene_hss06_04: {
    id: 'scene_hss06_04',
    title: '第四幕 · 崖口截哨',
    subtitle: '黄土断崖 · 党项游骑',
    mandatory: true,
    beats: [
      N('两名西夏一品堂探路游骑驱马沿着冻硬的黄土马道悄然摸上崖坡，刚瞥见枯草间一缕剑光，当即厉喝拔刀，两口党项冷月弯刀一左一右挟着马势兜头劈来！'),
      S(SPEAKER_TANGUT_SCOUT, '“崖上有宋军伏兵！先劈了这持剑的小子，吹响骨笛报信！”'),
      S(SPEAKER_SCOUT_CHEN, '“少侠，可要老汉提刀替你掠阵，还是你独自试一试这塞外快刀的斤两？”'),
    ],
    choices: [
      {
        id: 'hss06_04_solo',
        label: '“陈班头守住烽燧狼烟！这两骑交给我一人试剑！”（独自迎战双游骑）',
        subLabel: '生死决战 · 党项游骑双哨（二流下品 ×2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_SIDE06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTangutScoutNpc(1) },
            extraOpponents: [{ kind: 'custom', npc: buildTangutScoutNpc(2) }],
            rule: 'duel',
            forbidEscapeReason: '党项铁骑近在咫尺，若放走哨骑全队即刻溃围突入关内！',
            deathTitle: '血染黄河冰崖',
            deathDetail: '你在十里烽燧断崖独战两名党项游骑时失了先手，惨死于塞外弯刀之下。',
            onWin: [openScene('scene_hss06_05', HUASHAN_SIDE06_QUEST_ID)],
          },
        ],
      },
      {
        id: 'hss06_04_ally',
        label: '“有劳陈班头合击左翼，切莫放走吹笛报信之人！”（携老斥候并肩迎敌）',
        subLabel: '协同决战 · 携陈铁柱（二流下品）迎战党项双哨',
        tone: 'primary',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_SIDE06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTangutScoutNpc(1) },
            extraOpponents: [{ kind: 'custom', npc: buildTangutScoutNpc(2) }],
            allies: [{ kind: 'custom', npc: buildScoutAllyNpc() }],
            rule: 'duel',
            forbidEscapeReason: '与边军老斥候并肩守崖，岂能临阵退缩！',
            deathTitle: '血染黄河冰崖',
            deathDetail: '你在十里烽燧断崖与党项游骑交锋时不敌重创，未能守住烽火台隘口。',
            onWin: [openScene('scene_hss06_05', HUASHAN_SIDE06_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss06_05: {
    id: 'scene_hss06_05',
    title: '第五幕 · 铁骨压境',
    subtitle: '黄河断崖 · 狼烟骤起',
    mandatory: true,
    beats: [
      N('剑影翻飞间，两名党项游骑连骨笛都未及吹响便翻身坠马！陈铁柱见状大吼一声，反手将火折子掷入烽火台干柴堆，一道浓黑狼烟冲破冬夜寒空，直报潼关主城！'),
      N('河滩下方的西夏马队骤然骚动。百夫长「铁骨刀」嵬名悍见行迹败露，反倒狂笑一声，策动胯下青鬃战马如黑色狂风般直冲黄土斜坡而来！'),
      S(SPEAKER_WEIMING_HAN, '“好俊的步下快剑！既然点了狼烟，老子便先拿你这华山弟子的首级祭刀，再杀穿潼关粮仓！”'),
      P('（翻身上马，一抖缰绳迎着陡坡寒风催马相对）“正要借你的冷锻铁刀，试一试我华山《落雁剑法》！”'),
    ],
    choices: [
      {
        id: 'hss06_05_charge',
        label: '拍马迎冲百步，直取「铁骨刀」嵬名悍！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_SIDE06_QUEST_ID, 'sever_saber'),
          openScene('scene_hss06_06', HUASHAN_SIDE06_QUEST_ID),
        ],
      },
    ],
  },

  scene_hss06_06: {
    id: 'scene_hss06_06',
    title: '第六幕 · 百步断刃',
    subtitle: '黄河大折断崖 · 掠马交锋',
    illustrationUrl: '/assets/quests/hs_side06_sever_saber.jpg',
    illustrationCaption: '百步断刃 · 落雁快剑掠马交错一瞬斩断党项百夫长冷锻弯刀',
    mandatory: true,
    beats: [
      N('两骑相距不过百步，马蹄踏碎冻土溅起漫天雪沫！嵬名悍将西夏一品堂刚猛内劲尽数灌入右臂，那口号称削铁如泥的冷锻弯刀拖出一道凄厉破空尖啸，借奔马冲势横扫你的脖颈！'),
      S(SPEAKER_WEIMING_HAN, '“华山细剑也敢与我硬碰？给我连人带马一并斩断！”'),
      N('电光石火之间，封不弃昔日冷斥与老斥候的叮嘱同时在你心头炸响——重刀借马势横斩，最脆处正在刀脊中段受力极盛之点！你俯身贴紧马背，青锋自下而上斜掠出《落雁剑法》最险最疾的一记“惊鸿断翎”！'),
    ],
    choices: [
      {
        id: 'hss06_06_duel',
        label: '掠马交错一瞬，以《落雁剑法》疾锋斩向弯刀七寸！（死战嵬名悍）',
        subLabel: '生死决战 · 「铁骨刀」嵬名悍（二流上品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_SIDE06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildWeimingHanNpc() },
            rule: 'duel',
            forbidEscapeReason: '双骑百步对冲已至交错一瞬，唯有一剑断刃方得生机！',
            deathTitle: '陨身潼关冰坡',
            deathDetail: '你在黄土断崖与西夏百夫长「铁骨刀」嵬名悍对冲时慢了半拍，惨死于冷锻弯刀之下。',
            onWin: [openScene('scene_hss06_07', HUASHAN_SIDE06_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss06_07: {
    id: 'scene_hss06_07',
    title: '第七幕 · 折铁枭首',
    subtitle: '黄土断崖 · 党项溃退',
    mandatory: true,
    beats: [
      N('“铮——咔嚓！”一声清越裂响震彻黄河冰谷！你的三尺青锋精准无比地切中冷锻弯刀受力最僵的七寸刀脊，借双骑对冲的惊人冲劲，竟将那口厚背夏国宝刀斜斜斩断！'),
      N('嵬名悍瞳孔骤缩，半截断刃飞旋着扎进雪坡，而你的剑势丝毫未滞，顺势掠过其咽喉！两骑错身掠出十余丈，那员凶悍绝伦的党项百夫长方才“扑通”一声自马背滚落冻土，气绝身亡。'),
      N('河滩余下的西夏游骑见主将一照面便刀断人亡，又听见潼关城楼响起浑厚号角与铁甲奔蹄声，登时骇得魂飞魄散，调转马头狼狈逃回冰河北岸。'),
    ],
    choices: [
      {
        id: 'hss06_07_next',
        label: '勒马回缰，跃下马背检视雪坡上的冷锻断刃',
        tone: 'primary',
        effects: [openScene('scene_hss06_08', HUASHAN_SIDE06_QUEST_ID)],
      },
    ],
  },

  scene_hss06_08: {
    id: 'scene_hss06_08',
    title: '第八幕 · 边军赠粮',
    subtitle: '黄河大折惊涛烽火台 · 凯旋收锋',
    mandatory: true,
    beats: [
      N('老斥候陈铁柱一路小跑赶下断崖，拔起雪地里那截断面齐整如镜的冷锻弯刀，盯着光洁斜口咂舌不已。'),
      S(SPEAKER_SCOUT_CHEN, '“老天爷！老汉守了二十年边关，头一回见步下剑客借马势一剑削断党项冷锻刀！少侠，这半截断刃你一定带回华山给封老前辈瞧瞧，省得他总说咱们关中后生软了骨头！”'),
      S(SPEAKER_SCOUT_CHEN, '“这两包军中秘制的塞北风干牛脯行军丸，还有潼关防戍司赏下的军功银，老汉替你记在簿子上！天快亮了，少侠趁热乎劲儿上山复命去吧！”'),
      P('（以布巾包好冷锻断刃，郑重拱手）“多谢陈班头三日教诲！今日断得此刃，大半功劳在班头所授观马听冰之法。”'),
    ],
    choices: [
      {
        id: 'hss06_08_return',
        label: '辞别西军老斥候，携冷锻断刃返登华山朝阳孤松观海亭',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_SIDE06_QUEST_ID, 'return_feng'),
          toast('已斩杀「铁骨刀」嵬名悍！请携断刃前往【华山绝顶论剑台 > 朝阳孤松观海亭】向封不弃复命！', 'success', '百步断刃'),
        ],
      },
    ],
  },

  scene_hss06_09: {
    id: 'scene_hss06_09',
    title: '第九幕 · 孤松验铁',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    mandatory: true,
    beats: [
      N('晨曦破开云海，朝阳孤松观海亭上寒霜未融。宿老封不弃依旧抱着那柄乌鞘快剑枯坐松下，听见你踏雪而来的步声，连眼皮都未抬一下。'),
      S('NPC-0167', '“才过四日就滚回来了？莫非被黄河冰风吹破了胆，要回玉女峰去捧热茶读经了？”'),
      P('（解开粗布巾，将半截冷锻弯刀轻置青石几上）“弟子奉命赴惊涛烽火台，已将踏冰南下的一品堂百夫长嵬名悍斩于马下，特携其断刃请封师叔验锋。”'),
      N('封不弃漫不经心地瞥了一眼，随即身躯微震，伸出两根枯瘦如铁的手指摩挲着断刃平滑如削的斜口，良久方才发出一声低沉笑声。'),
    ],
    choices: [
      {
        id: 'hss06_09_next',
        label: '垂手肃立，静听封师叔评点此战得失',
        tone: 'gold',
        effects: [openScene('scene_hss06_10', HUASHAN_SIDE06_QUEST_ID)],
      },
    ],
  },

  scene_hss06_10: {
    id: 'scene_hss06_10',
    title: '第十幕 · 剑试锋成',
    subtitle: '朝阳孤松观海亭 · 赐靴嘉奖',
    mandatory: true,
    beats: [
      S('NPC-0167', '“断面斜入三寸、一丝崩口皆无……好！你不是拿蛮力硬磕，是借了双马交错的冲势、寻着他弯刀受力最僵的七寸顺势斜切！这才是咱们华山剑宗的《落雁剑法》！”'),
      S('NPC-0167', '“这双【华山飞檐快靴】是我早年行走关西时请巧匠所制，配你如今的马上步下身法正好合适。拿去穿上，往后江湖风浪还大，莫丢了剑宗今日这股断铁锐气！”'),
      N('你接过封不弃抛来的飞檐快靴与赏银，俯瞰脚下奔涌如银带的冰封黄河，但觉胸中剑意如大雁惊寒，愈发清冽锋锐。'),
    ],
    choices: [
      {
        id: 'hss06_10_finish',
        label: '拜谢封师叔厚赐，收妥快靴与断刃心得',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 55, reason: '潼关烽火台截杀党项精骑军功赏银' },
          { type: 'addSectContribution', amount: 65 },
          { type: 'giveCombatExp', amount: 760, reason: '黄河冰崖百步断刃斩杀嵬名悍' },
          { type: 'modifyRenown', delta: 20, reason: '潼关黄河断崖一剑斩断西夏铁骨刀' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0167' }, delta: 15 },
          { type: 'addArtExp', artId: 'MA-128', amount: 350 },
          { type: 'modifySkill', key: '骑术', delta: 1 },
          { type: 'giveItem', itemId: 'BOT-011', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-126', qty: 2 },
          { type: 'completeQuest', questId: HUASHAN_SIDE06_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《潼关试铁 · 百步断刃行》！获纹银 55 两、贡献 65、华山飞檐快靴与《落雁剑法》精进！',
            'success',
            '百步断刃',
          ),
        ],
      },
    ],
  },
}
