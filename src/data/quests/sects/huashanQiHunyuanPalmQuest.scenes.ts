import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q04_QUEST_ID } from './huashanQiHunyuanPalmQuest'

const SPEAKER_ESCORT_VET: StorySpeakerSpec = {
  kind: 'custom',
  name: '秦老镖头',
  title: '关中押粮老镖师',
  factionName: '长安行商',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_CHISHA_SPY: StorySpeakerSpec = {
  kind: 'custom',
  name: '泥鳅吴三',
  title: '赤沙帮西市销赃眼线',
  factionName: '赤沙帮',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_SHIELD_CAPTAIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '铁木盾头领·贺横江',
  title: '赤沙水寨前栈统领',
  factionName: '赤沙帮',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_SHA_TONGHAI: StorySpeakerSpec = {
  kind: 'custom',
  name: '沙通海',
  title: '赤沙恶蛟 · 赤沙帮主',
  factionName: '赤沙帮',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

function buildChishaShieldCaptainNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ04_SHIELD_CAPTAIN',
    name: '贺横江',
    title: '赤沙水寨 · 重盾栈桥头领',
    realm: '二流下品',
    factionName: '赤沙帮',
    sectRank: 2,
    sectRankLabel: '水寨头目',
    avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
    talk: '“铁木重盾已被这小子一掌震裂！抄分水短刀剁了他，别让他冲进粮仓！”',
    stats: { hp: 1060, mp: 820, agi: 43, res: 32 },
    talents: { bone: 66, comprehension: 50, charm: 34 },
    equippedArts: {
      neigong: 'MA-230',
      qinggong: 'MA-120',
      move1: 'MA-237',
      move2: 'MA-186',
    },
    learnedArts: [
      { artId: 'MA-230', level: 5 },
      { artId: 'MA-120', level: 5 },
      { artId: 'MA-237', level: 6 },
      { artId: 'MA-186', level: 5 },
    ],
  })
}

function buildShaTonghaiBossNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ04_SHA_TONGHAI',
    name: '沙通海',
    title: '赤沙恶蛟 · 赤沙帮总瓢把子',
    realm: '二流中品',
    factionName: '赤沙帮',
    sectRank: 3,
    sectRankLabel: '水匪帮主',
    avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
    talk: '“敢坏老子同西夏贵人的大买卖！把这华山小畜生劈成两段喂黄河铁头鱼！”',
    stats: { hp: 1380, mp: 1120, agi: 47, res: 33 },
    talents: { bone: 72, comprehension: 58, charm: 36 },
    equippedArts: {
      neigong: 'MA-104',
      qinggong: 'MA-120',
      move1: 'MA-151',
      move2: 'MA-133',
      move3: 'MA-237',
    },
    learnedArts: [
      { artId: 'MA-104', level: 6 },
      { artId: 'MA-120', level: 6 },
      { artId: 'MA-151', level: 6 },
      { artId: 'MA-133', level: 6 },
      { artId: 'MA-237', level: 6 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq04_01: {
    id: 'scene_hsq04_01',
    title: '第一幕 · 渭水急报',
    subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，关中连旬阴雨初霁，渭水秋汛暴涨。这一日你在清泉演剑院将《养吾剑法》演毕收势，却见宁清羽手持一封火漆羽书自前殿匆匆步入，神色凝重。'),
      S('NPC-0166', '“刚接京兆府快马飞报与本门山下巡商求救信——近半月来，盘踞渭水下流的凶悍水匪『赤沙帮』忽得西夏黑市重金暗助，竟在渭水漕渠连劫三艘京兆府发往同州的赈灾官粮船，连我华山随船护航的两名巡商管事也被掳去！”'),
      P('“赈灾官粮关乎沿岸数万灾黎冬日性命，赤沙帮竟敢勾结西夏走私资敌，端的是罪不容诛！”'),
    ],
    onFinishEffects: [openScene('scene_hsq04_02', HUASHAN_Q04_QUEST_ID)],
  },

  scene_hsq04_02: {
    id: 'scene_hsq04_02',
    title: '第二幕 · 奉命西查',
    subtitle: '洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      S('NPC-0166', '“赤沙帮主『赤沙恶蛟』沙通海水性极精、为人狡诈，水寨行踪飘忽不定。据逃回的船工所言，贼人劫粮后曾在长安西市与西夏胡商秘密接洽销赃。”'),
      S('NPC-0166', '“你《养吾剑法》已具火候，此番随师叔即刻下山西赴长安【西市胡商坊 · 车马行栈】，先揪出赤沙帮眼线查明水寨巢穴！”'),
    ],
    choices: [
      {
        id: 'hsq04_go_changan',
        label: '整装佩剑，随宁清羽赶赴长安西市车马行栈查案',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q04_QUEST_ID, stepId: 'investigate_changan_xishi' },
          setStep(HUASHAN_Q04_QUEST_ID, 'investigate_changan_xishi'),
          toast('已开启《渭水惊澜 · 混元破寨》！请前往【京兆府 · 西市胡商坊 · 车马行栈 · 镖局坪】！', 'talk', '渭水惊澜'),
        ],
      },
    ],
  },

  scene_hsq04_03: {
    id: 'scene_hsq04_03',
    title: '第三幕 · 西市行栈',
    subtitle: '京兆府 · 西市胡商坊 · 车马行栈 · 镖局坪',
    mandatory: true,
    beats: [
      N('长安西市驼铃叮当，番商胡贾云集。你与宁清羽步入车马行栈后侧镖局坪，寻见左肩裹着染血布条的押粮秦老镖头。'),
      S(SPEAKER_ESCORT_VET, '“宁女侠、华山{gender:少侠|女侠}！那伙赤沙水匪邪门得很呐！他们在窄窄的连舟跳板上摆开一排尺许厚的西夏铁木重盾，外蒙生牛皮浸过桐油，我等刀剑刺上去只留个白印子，反被盾缝里捅出的分水刀伤了好几名弟兄！”'),
      N('宁清羽闻言眸光微闪，似已想到克制之策；而你目光扫过行栈东角驼队草料堆，忽见一名脚穿麻底水靴、手指生满摇橹老茧的汉子正鬼鬼祟祟向一名党项皮帽商人比划官粮麻袋印记！'),
    ],
    onFinishEffects: [openScene('scene_hsq04_04', HUASHAN_Q04_QUEST_ID)],
  },

  scene_hsq04_04: {
    id: 'scene_hsq04_04',
    title: '第四幕 · 揪出暗桩',
    subtitle: '车马行栈草料棚下',
    mandatory: true,
    beats: [
      N('那汉子瞥见你身上华山内门剑袍，脸色剧变，猛地掀翻一筐草料便欲钻入西市窄巷逃窜！'),
      N('你足尖一点施展提纵术凌空掠过驼背，左手如电探出，一把反扣住那水匪的「曲池」「分筋」二穴，将其重重按跪在青石板上！那党项商人见势不妙早已混入人群溜走。'),
      S(SPEAKER_CHISHA_SPY, '（痛得冷汗直流，杀猪般叫唤）“哎哟断了断了！女侠饶命、{gender:少侠|女侠}饶命！小的只是赤沙帮跑腿送信的泥鳅吴三啊！”'),
    ],
    onFinishEffects: [openScene('scene_hsq04_05', HUASHAN_Q04_QUEST_ID)],
  },

  scene_hsq04_05: {
    id: 'scene_hsq04_05',
    title: '第五幕 · 供出水寨',
    subtitle: '车马行栈 · 镖局坪',
    mandatory: true,
    beats: [
      P('（手上内劲微吐，冷声喝问）“从实招来！沙通海把京兆府三船赈灾官粮和华山巡商管事关在何处？何时与西夏人交割？”'),
      S(SPEAKER_CHISHA_SPY, '“小的全招！粮船和贵派两位管事全锁在潼关西侧、渭水入黄河交汇口的『赤沙芦苇连环水寨』里！今夜丑正三更，西夏黑水走私大船便顺黄河靠岸接粮，过了今晚神仙也追不回啦！”'),
      S('NPC-0166', '（把吴三交予秦老镖头押送京兆府衙，转身果断道）“事不宜迟！我们即刻东返潼关渭黄渡口雇舟顺流而下，赶在三更交割之前端掉赤沙水寨！”'),
    ],
    choices: [
      {
        id: 'hsq04_rush_weishui',
        label: '快马东驰，赶赴潼关渭黄交汇渡口登舟',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q04_QUEST_ID, 'weishui_ferry_palm'),
          toast('已查明赤沙水寨所在！请赶赴【潼关天险瓮城 · 黄河大折惊涛烽火台】登舟！', 'success', '西市擒谍'),
        ],
      },
    ],
  },

  scene_hsq04_06: {
    id: 'scene_hsq04_06',
    title: '第六幕 · 秋江孤舟',
    subtitle: '潼关渭黄交汇渡口 · 秋江暮色',
    mandatory: true,
    beats: [
      N('残阳如血，渭水挟着关中秋涛滚滚汇入大河惊澜。你与宁清羽在渡口寻得一叶轻快乌篷渔舟，解缆顺流隐入浩渺芦苇水道。'),
      S('NPC-0166', '（独立船头，迎着猎猎江风回眸问道）“方才在西市听秦老镖头提起赤沙水寨狭窄浮桥上的西夏铁木重盾，你若只仗手中三尺青锋，今夜打算如何破关？”'),
      P('“栈桥窄仅容人，难施展轻功绕后；铁木重盾厚逾尺许，剑刃劈刺必被夹锁……弟子正苦思破盾良策，请师叔指点迷津！”'),
    ],
    onFinishEffects: [openScene('scene_hsq04_07', HUASHAN_Q04_QUEST_ID)],
  },

  scene_hsq04_07: {
    id: 'scene_hsq04_07',
    title: '第七幕 · 渭水传掌',
    subtitle: '渭水秋涛 · 乌篷船头',
    illustrationUrl: '/assets/quests/hs_q04_weishui_boat.jpg',
    illustrationCaption: '渭水传掌 · 宁清羽于秋江孤舟之上亲授刚柔并济华山混元掌',
    mandatory: true,
    beats: [
      S('NPC-0166', '“我华山气宗讲究内外混元，岂是离开长剑便束手无策之辈？看好了——这路《华山混元掌》外看似柔缓浑圆，实则暗含刚猛透骨内劲，最擅隔物传功、震裂重甲坚盾！”'),
      N('但见宁清羽足踏起伏波心而身形不晃分毫，双掌画圆如抱太极日月，陡然左掌轻飘飘向江面一按——“砰”的一声闷雷炸响，船前丈许江水先陷下一尺旋涡，旋即激起一道半丈高的雪白水柱！'),
      S('NPC-0166', '“混元掌要诀在于『由外而内，刚柔并济，混元如一』。今夜登栈桥，你左手运《华山混元掌》震碎铁木重盾，右手使《养吾剑法》护身破敌，掌剑相辅，水匪纵有铜墙铁壁亦如土鸡瓦狗！”'),
      N('宁清羽将混元掌三十六路运劲法门倾囊相授，你于颠簸孤舟之上凝神演练，双掌渐生一股温润而又沛莫能御的浑厚劲力！'),
    ],
    onFinishEffects: [
      { type: 'teachMartialArt', artId: 'MA-109', level: 1, autoEquip: true },
      toast('于渭水孤舟获宁清羽亲授良品拳掌《华山混元掌》！', 'success', '渭水传掌'),
      openScene('scene_hsq04_08', HUASHAN_Q04_QUEST_ID),
    ],
  },

  scene_hsq04_08: {
    id: 'scene_hsq04_08',
    title: '第八幕 · 舟头试劲',
    subtitle: '赤沙芦苇荡外围水道',
    mandatory: true,
    beats: [
      N('二更鼓响，江雾四合。乌篷舟悄无声息滑入深不可测的芦苇迷荡，远处水面上已隐隐透出数十盏赤色风灯——正是赤沙帮连环水寨！'),
      N('你在舟头最后调息一周天，一掌拍碎水面浮木而声息不泄，宁清羽欣然颔首。'),
      S('NPC-0166', '“子夜将至！师叔这就绕往水寨东侧暗渠，截断西夏走私大船并剪除他们水下翻船水鬼；正面连环栈桥与聚义粮仓，便交由你掌剑破关！”'),
    ],
    choices: [
      {
        id: 'hsq04_raid_now',
        label: '掌剑齐备，趁子夜浓雾直接杀上赤沙水寨栈桥！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q04_QUEST_ID, 'midnight_raid_chisha'),
          openScene('scene_hsq04_09', HUASHAN_Q04_QUEST_ID),
        ],
      },
      {
        id: 'hsq04_prepare_first',
        label: '先于芦苇舟中检查披挂与武学配置，稍后奇袭水寨',
        tone: 'default',
        effects: [
          setStep(HUASHAN_Q04_QUEST_ID, 'midnight_raid_chisha'),
          toast('请检查武学运使（《华山混元掌》与《养吾剑法》）后点击景点按钮发起子夜奇袭！', 'talk', '战前整备'),
        ],
      },
    ],
  },

  scene_hsq04_09: {
    id: 'scene_hsq04_09',
    title: '第九幕 · 子夜摸哨',
    subtitle: '赤沙连环水寨 · 前哨浮桥',
    mandatory: true,
    beats: [
      N('子时正刻，寒雾锁江。宁清羽宛若白鹭掠水飘然而去，你则借芦苇掩护一跃登上水寨正门铁索浮桥，剑鞘无声点倒两名打盹的瞭望水匪。'),
      N('不料刚踏上通往主寨粮仓的独木长栈桥，桥头铜锣骤响！火把齐明，一队赤沙帮精锐刀盾手早已列阵封桥！'),
    ],
    onFinishEffects: [openScene('scene_hsq04_10', HUASHAN_Q04_QUEST_ID)],
  },

  scene_hsq04_10: {
    id: 'scene_hsq04_10',
    title: '第十幕 · 铁盾封桥',
    subtitle: '赤沙水寨 · 连舟窄栈桥',
    mandatory: true,
    beats: [
      N('只见四面尺许厚、外包铁叶牛皮的西夏铁木重盾在五尺宽的木栈桥上死死扣成一面绝壁，盾牌缝隙间探出数柄淬着寒光的分水短刀，步步紧逼欲将你挤落冰冷刺骨的黄河急流！'),
      S(SPEAKER_SHIELD_CAPTAIN, '（躲在重盾之后猖狂狞笑）“哈哈哈！管你是哪路剑客，上了老子这窄栈桥，宝剑连刺都刺不进来！弟兄们顶住铁盾，把他推下水喂王八！”'),
      P('（左手暗运混元真气，掌心隐现紫白微光，右手长剑斜垂）“谁说破你这乌龟壳非要用剑？”'),
    ],
    onFinishEffects: [openScene('scene_hsq04_11', HUASHAN_Q04_QUEST_ID)],
  },

  scene_hsq04_11: {
    id: 'scene_hsq04_11',
    title: '第十一幕 · 混元裂盾',
    subtitle: '赤沙水寨栈桥 · 掌裂重盾',
    illustrationUrl: '/assets/quests/hs_q04_shatter_shields.jpg',
    illustrationCaption: '混元裂盾 · 子夜栈桥催动掌力震碎赤沙帮铁木重盾',
    mandatory: true,
    beats: [
      N('面对迎面撞来的千斤盾墙，你不退反进，沉腰坐马，左掌一式《华山混元掌》杀招「混元开碑」结结实实印在正中铁木重盾之上！'),
      N('初触无声，下一瞬浑厚螺旋暗劲透穿尺厚铁木轰然炸裂——“咔嚓嚓！轰！”整面西夏铁木重盾四分五裂，木片铁叶倒卷横飞，震得后方三名盾手口喷鲜血栽入江中！'),
      N('栈桥头领贺横江骇得魂飞天外，挥动分水短刀拼死扑上！你右手《养吾剑法》顺势长驱直入！'),
    ],
    choices: [
      {
        id: 'hsq04_fight_shield_captain',
        label: '左掌右剑，击溃赤沙水寨重盾头领贺横江！（二流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildChishaShieldCaptainNpc() },
            rule: 'story_trial',
            forbidEscapeReason: '栈桥已破，一鼓作气杀入主寨夺回官粮！',
            introText: '【栈桥破关】重盾已碎！掌剑并施迎战赤沙水寨前栈头领【贺横江（二流下品）】！',
            onWin: [openScene('scene_hsq04_12', HUASHAN_Q04_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('栈桥狭窄湿滑，稳住混元内息再破敌阵！', 'warn', '混元破寨'),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq04_12: {
    id: 'scene_hsq04_12',
    title: '第十二幕 · 杀入聚义',
    subtitle: '赤沙水寨 · 粮仓水阁',
    mandatory: true,
    beats: [
      N('你一剑挑飞贺横江短刀，反手一记混元掌将其震落江心，随即踏过满地碎盾杀入水寨中枢粮仓水阁！'),
      N('水阁木牢内，数十包盖着「京兆府常平义仓」朱印的赈灾粮袋堆满舱室，两名遍体鳞伤的华山巡商管事与八名官府押运差役正被铁链锁在柱上。你挥剑斩断铁链救出众人！'),
    ],
    onFinishEffects: [openScene('scene_hsq04_13', HUASHAN_Q04_QUEST_ID)],
  },

  scene_hsq04_13: {
    id: 'scene_hsq04_13',
    title: '第十三幕 · 凶枭沙通海',
    subtitle: '赤沙水寨 · 聚义大船甲板',
    mandatory: true,
    beats: [
      N('就在此时，东面水道火光冲天——宁清羽已将前来交割的西夏走私船队杀得人仰马翻！聚义大厅屋顶轰然破开，满脸赤髯、身材粗壮如铁塔的赤沙帮主「赤沙恶蛟」沙通海提着一柄八十斤分水鬼头大刀狂吼跃下！'),
      S(SPEAKER_SHA_TONGHAI, '（双目赤红如血，鲸息内劲鼓荡得甲板吱呀作响）“华山派的臭婆娘断了老子东面财路，你这小杂种又敢碎我铁盾、放我肉票！拿命来填！”'),
      P('“沙通海，你勾结西夏、劫夺黎民救命口粮，今夜便是你赤沙帮覆灭之时！”'),
    ],
    onFinishEffects: [openScene('scene_hsq04_14', HUASHAN_Q04_QUEST_ID)],
  },

  scene_hsq04_14: {
    id: 'scene_hsq04_14',
    title: '第十四幕 · 掌剑决死',
    subtitle: '聚义大船甲板 · 生死决战',
    mandatory: true,
    beats: [
      N('沙通海催动十成《鲸息水战诀》，分水鬼头大刀卷起腥风血浪当胸狂斩！此战乃匪巢生死相搏，退一步便是万丈惊涛，唯有以《华山混元掌》与《养吾剑法》死战斩枭！'),
    ],
    choices: [
      {
        id: 'hsq04_duel_shatonghai',
        label: '生死决战！掌剑交施诛杀赤沙帮主沙通海（二流中品）',
        subLabel: '生死决战（duel）：战败将命陨渭黄水寨，请谨慎运使丹药与防御！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShaTonghaiBossNpc() },
            rule: 'duel',
            deathTitle: '命陨赤沙水寨',
            deathDetail:
              '子夜奇袭渭水赤沙帮连环水寨时，少侠在聚义大船甲板与赤沙恶蛟沙通海死战力竭，不幸中刀落入黄河惊涛殉难。',
            forbidEscapeReason: '背靠滚滚黄河惊涛，身后皆是获救差役与巡商，唯有一战斩枭！',
            introText: '【1v1 生死决战】迎战二流中品水匪枭首【赤沙恶蛟 · 沙通海】，左掌混元、右剑养吾决一死战！',
            onWin: [openScene('scene_hsq04_15', HUASHAN_Q04_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq04_15: {
    id: 'scene_hsq04_15',
    title: '第十五幕 · 火焚水寨',
    subtitle: '赤沙水寨 · 烈焰映江',
    illustrationUrl: '/assets/quests/hs_q04_fort_ablaze.jpg',
    illustrationCaption: '火焚水寨 · 掌毙赤沙帮主沙通海，夺回京兆府赈灾官粮',
    mandatory: true,
    beats: [
      N('激斗二十余合，沙通海鬼头大刀猛劈甲板木柱被你以《养吾剑法》粘连引偏，胸前护体鲸息真气微滞！你左掌如电欺入，一记蓄满十成真力的「混元霹雳」正印其膻中要穴！'),
      N('沉闷骨裂声中，沙通海仰天喷出一口鲜血，庞大身躯轰然倒地气绝身亡！'),
      N('恰在此时，宁清羽提剑踏波跃上大船，见你已独力掌毙沙通海，眸中闪过一抹赞叹。师徒二人指挥获救差役与船工将三船赈灾官粮尽数起出，随即举火点燃匪巢——刹那间烈焰冲霄，横行渭水多年的赤沙水寨化作一片火海！'),
    ],
    onFinishEffects: [openScene('scene_hsq04_16', HUASHAN_Q04_QUEST_ID)],
  },

  scene_hsq04_16: {
    id: 'scene_hsq04_16',
    title: '第十六幕 · 黎明交割',
    subtitle: '潼关渭口官渡 · 晨曦凯歌',
    mandatory: true,
    beats: [
      N('东方既白，满载赈灾官粮的大船稳稳靠上渭口官渡。闻讯赶来的京兆府司录参军与沿岸数百名翘首盼粮的百姓望见旗号，夹岸欢呼，纷纷向你与宁清羽叩首致谢。'),
      S('NPC-0166', '“官粮既已完璧归公，本门两位巡商管事亦已妥善安置，随师叔回玉女峰复命罢。”'),
    ],
    choices: [
      {
        id: 'hsq04_back_zixia',
        label: '辞别官民，随宁清羽返回玉女峰洗头盆清泉演剑院',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q04_QUEST_ID, 'return_zixia_spring'),
          toast('火焚赤沙水寨大捷！请返回【玉女峰紫霞道观 · 洗头盆清泉演剑院】复命！', 'success', '焚寨夺粮'),
        ],
      },
    ],
  },

  scene_hsq04_17: {
    id: 'scene_hsq04_17',
    title: '第十七幕 · 清泉论道',
    subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('重返玉女峰清泉演剑院，山泉叮咚涤去一夜征尘血气。宁清羽亲手斟了一盏西岳云雾热茶推至你面前。'),
      S('NPC-0166', '“昨夜在渭水孤舟才传你《华山混元掌》，不到两个时辰你便能在生死栈桥上掌碎尺厚铁盾、继而掌毙沙通海——你可知为何进境如此神速？”'),
      P('“弟子细细体悟，先前所修《华山基础心法》与《养吾剑法》蓄养的浩然真气，恰为混元掌提供了源源不绝的内劲根基；而混元掌『由外而内』的运劲法门，反过来又令剑招更添三分刚柔变化。”'),
    ],
    onFinishEffects: [openScene('scene_hsq04_18', HUASHAN_Q04_QUEST_ID)],
  },

  scene_hsq04_18: {
    id: 'scene_hsq04_18',
    title: '第十八幕 · 掌剑双全',
    subtitle: '洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      S('NPC-0166', '（展颜微笑）“悟性极佳！本门最高绝学《紫霞神功》未成之前，这路混元掌正是由外入内锤炼混元真气的金锁钥。好生将《华山混元掌》修至纯熟，不日掌门师兄另有护道重任托付于你！”'),
      N('大师兄高沧云亦闻讯赶来拱手道贺。经渭水破寨一役，你在华山气宗二代弟子之中声名鹊起，掌剑双绝之势已然初成！'),
    ],
    choices: [
      {
        id: 'hsq04_finish_reward',
        label: '拜谢宁师叔栽培，潜心精修混元掌劲（完成中篇）',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-109', amount: 260 },
          { type: 'giveSilver', amount: 95, reason: '荡平赤沙水寨夺回京兆府赈粮赏银' },
          { type: 'addSectContribution', amount: 70 },
          { type: 'giveCombatExp', amount: 130, reason: '子夜奇袭赤沙水寨掌毙沙通海' },
          { type: 'modifyChivalry', delta: 15, reason: '夺回灾民救命官粮解救巡商差役' },
          { type: 'modifyRenown', delta: 20, reason: '火焚赤沙水寨威震渭水漕道' },
          { type: 'completeQuest', questId: HUASHAN_Q04_QUEST_ID },
          toast('已完成《渭水惊澜 · 混元破寨》！《华山混元掌》修为与江湖侠名大增！', 'success', '掌剑双全'),
        ],
      },
    ],
  },
}
