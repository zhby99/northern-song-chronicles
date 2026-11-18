import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, flag, openScene, setStep } from '../../../engine/quest/dsl'
import { buildXingxiuPoisonElderNpc, JINJUN_YONGZHOU_NANMAN_ID } from './jinjunYongzhouNanmanQuest'

const RENZONG = { kind: 'npc' as const, npcId: 'NPC-0001' }
const DIQING = { kind: 'npc' as const, npcId: 'NPC-0031' }
const YANG_WENGUANG = { kind: 'npc' as const, npcId: 'NPC-0032' }
const NONG_ZHIGAO = { kind: 'npc' as const, npcId: 'NPC-0094' }
const ZHAIXINGZI = { kind: 'npc' as const, npcId: 'NPC-0181' }
const GUARD = {
  kind: 'custom' as const,
  name: '殿前司传令官',
  title: '禁军随征军校',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_yn_01: {
    id: 'scene_yn_01',
    title: '第一幕 · 岭南八百里加急',
    subtitle: '开封府 · 垂拱紫宸正殿',
    beats: [
      N('春雪初融，一道染血的八百里加急战报却震动了东京朝堂：南蛮枭雄侬智高勾结西域星宿派妖人，裹挟十万蛮兵攻破邕州、兵围广州，两广十余州郡望风披靡，朝堂文臣谈蛮色变。'),
      S(RENZONG, '“岭南兵戈骤起，前线诸将屡战屡败，朕心甚忧！不知卿等谁愿领兵南征，解广州之围？”'),
    ],
    onFinishEffects: [openScene('scene_yn_02', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_02: {
    id: 'scene_yn_02',
    title: '第二幕 · 铜面请缨',
    subtitle: '开封府 · 垂拱紫宸正殿',
    illustrationUrl: '/assets/quests/jinjun_yn_diqing_muster.jpg',
    illustrationCaption: '垂拱正殿 · 枢密副使狄青慨然请缨，点将调主角与杨文广任正副先锋',
    beats: [
      N('殿前一片沉寂之际，枢密副使狄青手执虎符阔步出班，虎目精光四射，朗声请战。'),
      S(DIQING, '“臣出身行伍，非战无以报陛下！愿亲率王师南下平蛮，并恳请陛下调殿前司都虞候与天波杨文广任大军正副先锋，统三千京营精锐与西北蕃落铁骑南征！”'),
      P('“末将愿随狄相公南征！不斩蛮寇、不破妖人，誓不还朝！”'),
    ],
    onFinishEffects: [openScene('scene_yn_03', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_03: {
    id: 'scene_yn_03',
    title: '第三幕 · 帅旗双雄会',
    subtitle: '开封府 · 八十万禁军大教场',
    beats: [
      N('出征前夜，大教场旌旗蔽空。天波杨府传人杨文广披甲持枪迎面走来，与你并肩立于点兵台上。'),
      S(YANG_WENGUANG, '“久闻都帅在太行与太湖连立奇功！此番岭南瘴疠险恶，我杨家正擅长山地结阵，正好与兄台一左一右，杀他个天翻地覆！”'),
      P('“有文广兄并肩破阵，区区蛮兵何足挂齿！三千铁骑即刻南发！”'),
    ],
    onFinishEffects: [openScene('scene_yn_04', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_04: {
    id: 'scene_yn_04',
    title: '第四幕 · 深入十万大山',
    subtitle: '岭南 · 十万大山驿道',
    beats: [
      N('大军昼夜兼程南抵广南。时值岭南闷湿酷暑，林间白瘴终日不散，前锋刚扎下大营，军中便不断传出士卒呕血中毒的噩耗。'),
      S(GUARD, '“禀先锋！东营井水一夜之间竟变作墨绿色，数十名喝了生水的弟兄浑身溃烂！”'),
    ],
    onFinishEffects: [openScene('scene_yn_05', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_05: {
    id: 'scene_yn_05',
    title: '第五幕 · 毒水与军心',
    subtitle: '岭南 · 宋军先锋大营',
    beats: [
      S(YANG_WENGUANG, '“是星宿老怪丁春秋门下的毒虫腐尸！蛮人不敢正面迎战我西北铁骑，便使这等下三滥阴招！”'),
      P('“文广兄熟稔山地营盘，烦请立刻严查全军水井、挖凿新泉稳住防线！军纪与蛊坛之事，交由我来处置！”'),
    ],
    onFinishEffects: [setStep(JINJUN_YONGZHOU_NANMAN_ID, 'yn_lingnan_muster')],
  },
  scene_yn_06: {
    id: 'scene_yn_06',
    title: '第六幕 · 斩将肃军纪',
    subtitle: '广州府 · 药洲九曜园',
    beats: [
      N('营中一名素日跋扈的京营散官趁机煽动士卒南逃，声称十万大山乃绝地，留者必死。你当众拔刀劈断其帅旗旗杆，以雷霆军法将其斩首示众，三军瞬间鸦雀无声！'),
      P('“妖言惑众乱我军心者，斩！星宿妖人不过藏头露尾之辈，今夜本将便亲率死士，去把他们的炼毒蛊坛一把火烧个干净！”'),
    ],
    onFinishEffects: [openScene('scene_yn_07', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_07: {
    id: 'scene_yn_07',
    title: '第七幕 · 狄青授密计',
    subtitle: '广州府 · 药洲九曜园',
    beats: [
      S(DIQING, '“军纪一肃，士气方可用。速往密林毁去星宿蛊坛，夺回解瘴灵药，而后大军进驻桂林，本帅另有破昆仑关之奇谋！”'),
    ],
    onFinishEffects: [openScene('scene_yn_08', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_08: {
    id: 'scene_yn_08',
    title: '第八幕 · 夜探苗疆林',
    subtitle: '广州府 · 药洲九曜园外',
    onFinishEffects: [openScene('scene_yn_09', JINJUN_YONGZHOU_NANMAN_ID)],
    beats: [
      P('“点齐三十名敢死亲兵，随我入林拔除妖人毒坛！”'),
    ],
  },
  scene_yn_09: {
    id: 'scene_yn_09',
    title: '第九幕 · 密林毒瘴深',
    subtitle: '岭南 · 苗疆深山密林',
    beats: [
      N('子夜密林伸手不见五指，瘴气刺鼻。循着毒虫爬行声潜行数里，前方山谷陡然亮起幽绿磷火——十余口大铁锅正咕嘟冒泡，星宿派妖人正往其中投掷毒蛇蝎蛊！'),
      P('“就是这里！放火烧坛，一个妖人也不许放跑！”'),
    ],
    onFinishEffects: [openScene('scene_yn_10', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_10: {
    id: 'scene_yn_10',
    title: '第十幕 · 夜焚蛊毒坛',
    subtitle: '岭南 · 星宿派炼毒蛊坛',
    illustrationUrl: '/assets/quests/jinjun_yn_poison_altar.jpg',
    illustrationCaption: '十万大山密林夜火 · 禁军死士夜焚星宿派炼毒蛊坛',
    beats: [
      N('火把掷入毒油坛中轰然炸起丈高烈焰，毒虫嘶鸣化作灰烬！两名驻守蛊坛的星宿炼毒护法暴怒扑出，双掌黑雾滚滚直扑你的面门！'),
      P('“正愁找不到正主，拿命来！”'),
    ],
    onFinishEffects: [
      {
        type: 'startCombat',
        questId: JINJUN_YONGZHOU_NANMAN_ID,
        opponent: { kind: 'custom', npc: buildXingxiuPoisonElderNpc(1) },
        extraOpponents: [{ kind: 'custom', npc: buildXingxiuPoisonElderNpc(2) }],
        rule: 'duel',
        introText: '【夜焚毒坛】星宿炼毒巫祝与五毒蛊师联手扑杀，速速斩除二人夺取解瘴灵药！',
        onWin: [
          { type: 'giveCombatExp', amount: 110, reason: '夜焚星宿炼毒蛊坛斩杀毒术护法' },
          openScene('scene_yn_11', JINJUN_YONGZHOU_NANMAN_ID),
        ],
      },
    ],
  },
  scene_yn_11: {
    id: 'scene_yn_11',
    title: '第十一幕 · 夺取解瘴药',
    subtitle: '岭南 · 星宿派炼毒蛊坛废墟',
    beats: [
      N('烈火吞没蛊坛，你从铁箱中搜出大批苗疆秘制解瘴灵药与辟毒丸，连夜带回大营分发三军。染疫士卒服药后纷纷转危为安，军威大振！'),
      S(YANG_WENGUANG, '“好手段！毒源既断，三军再无后顾之忧！”'),
    ],
    onFinishEffects: [openScene('scene_yn_12', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_12: {
    id: 'scene_yn_12',
    title: '第十二幕 · 元宵张灯策',
    subtitle: '桂林 · 宋军帅府',
    illustrationUrl: '/assets/quests/jinjun_yn_lantern_ruse.jpg',
    illustrationCaption: '桂林元宵张灯麻痹敌哨 · 狄青定计子夜暴雨偷渡昆仑关',
    beats: [
      N('次年正月十五元宵佳节，狄青传令大军于桂林城内张灯结彩、连摆三日夜酒宴，放风声称“元宵过后方才出兵”。蛮兵暗哨信以为真，昆仑关守军果然懈怠饮酒！'),
      S(DIQING, '“今夜暴雨倾盆，正是天助我大宋！二位先锋各率一彪精锐铁骑，随本帅衔枚疾走，子夜夺取昆仑关！”'),
    ],
    onFinishEffects: [openScene('scene_yn_13', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_13: {
    id: 'scene_yn_13',
    title: '第十三幕 · 暴雨渡昆仑',
    subtitle: '岭南 · 昆仑关天险',
    beats: [
      N('暴雨如注，山路泥泞如泽。你与杨文广各率铁骑以布裹马蹄、人衔木枚，顶着狂风暴雨悄然翻越“一夫当关”的天险昆仑关！黎明微露之际，三千铁骑已如神兵天降般逼近归仁铺旷野！'),
      P('“蛮寇大营就在前方三里！传令全军备战！”'),
    ],
    onFinishEffects: [openScene('scene_yn_14', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_14: {
    id: 'scene_yn_14',
    title: '第十四幕 · 归仁铺誓师',
    subtitle: '岭南 · 归仁铺北坡',
    beats: [
      S(YANG_WENGUANG, '“前方蛮兵竟有数万之众，更驱使披甲巨象作前锋！”'),
      P('“先回南海神庙前线集结神臂火药箭营，今日便叫这群蛮夷见识我大宋铁骑的锋芒！”'),
    ],
    onFinishEffects: [openScene('scene_yn_15', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_15: {
    id: 'scene_yn_15',
    title: '第十五幕 · 火药箭备齐',
    subtitle: '广州府 · 南海神庙前营',
    beats: [
      S(GUARD, '“禀都帅！军器监特制火药箭五千支已全部上弦！”'),
    ],
    onFinishEffects: [openScene('scene_yn_16', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_16: {
    id: 'scene_yn_16',
    title: '第十六幕 · 战鼓震南疆',
    subtitle: '广州府 · 南海神庙前营',
    onFinishEffects: [setStep(JINJUN_YONGZHOU_NANMAN_ID, 'yn_guirenpu_battle')],
    beats: [
      S(DIQING, '“传令：先锋两翼出击！今日必破归仁铺！”'),
    ],
  },
  scene_yn_17: {
    id: 'scene_yn_17',
    title: '第十七幕 · 象阵碾旷野',
    subtitle: '岭南 · 归仁铺旷野',
    illustrationUrl: '/assets/quests/jinjun_yn_elephant_charge.jpg',
    illustrationCaption: '归仁铺旷野 · 火药箭雨惊散南蛮披甲巨象阵',
    beats: [
      N('黎明战场杀声震天，侬智高倾巢而出，二十余头披挂铜铁重甲的巨象踩得大地颤抖，后方藤牌蛮兵嗷嗷直扑宋军前阵！'),
      P('“神臂弓营——火药箭齐射象鼻眼目！两翼铁骑随我与文广兄俯冲凿阵！”'),
    ],
    onFinishEffects: [openScene('scene_yn_18', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_18: {
    id: 'scene_yn_18',
    title: '第十八幕 · 双枪凿敌阵',
    subtitle: '岭南 · 归仁铺旷野',
    beats: [
      N('火箭如流星炸响，受惊巨象调头狂奔踩踏蛮兵阵脚！你与杨文广展开双枪合璧之势，左右两翼铁骑如利剪般狠狠凿穿敌军中枢，杨文广长枪一抖将南蛮前部大将挑落马下！'),
      S(YANG_WENGUANG, '“前部已破！都帅小心，那穿紫袍的星宿妖道正朝中军杀来！”'),
    ],
    onFinishEffects: [openScene('scene_yn_19', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_19: {
    id: 'scene_yn_19',
    title: '第十九幕 · 毒雾遇摘星',
    subtitle: '岭南 · 归仁铺中军乱阵',
    beats: [
      N('漫天碧绿毒粉随风翻卷，星宿派大师兄摘星子鬼魅般掠入阵中，双掌连拍竟以“化功大法”连毙三名宋军校尉！'),
      S(ZHAIXINGZI, '“哈哈哈！南朝鹰犬，也敢来岭南送死？尝尝本座化功大法的滋味！”'),
      P('“邪魔外道！今日便拿你的人头祭奠我中毒阵亡的禁军弟兄！”'),
    ],
    onFinishEffects: [openScene('scene_yn_20', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_20: {
    id: 'scene_yn_20',
    title: '第二十幕 · 枪穿摘星喉',
    subtitle: '岭南 · 归仁铺毒雾阵中',
    illustrationUrl: '/assets/quests/jinjun_yn_zhaixingzi_duel.jpg',
    illustrationCaption: '归仁铺毒雾阵中 · 一枪刺穿星宿派大师兄摘星子咽喉',
    beats: [
      N('你在漫天毒雾中屏息凝神，《太玄经》内劲护住周身百脉，枪意刚猛无俦如决堤洪流，正面直扑摘星子！'),
      S(ZHAIXINGZI, '“什么？！化功大法竟吸不动你的真气？！”'),
    ],
    onFinishEffects: [
      {
        type: 'startCombat',
        questId: JINJUN_YONGZHOU_NANMAN_ID,
        opponent: {
          kind: 'npc',
          npcId: 'NPC-0181',
          talkOverride: '“好霸道的内力！看本座碧磷毒掌！”',
        },
        lethalOnLose: false,
        rule: 'duel',
        introText: '【阵前诛妖】星宿派大师兄摘星子（一流中品，携化功毒雾）拦路死战，将其阵前正法！',
        onWin: [
          { type: 'markNpcsDead', npcIds: ['NPC-0181'] },
          { type: 'giveCombatExp', amount: 150, reason: '归仁铺阵前斩杀星宿大师兄摘星子' },
          openScene('scene_yn_21', JINJUN_YONGZHOU_NANMAN_ID),
        ],
      },
    ],
  },
  scene_yn_21: {
    id: 'scene_yn_21',
    title: '第二十一幕 · 妖道伏诛死',
    subtitle: '岭南 · 归仁铺阵中',
    beats: [
      N('摘星子招式被你沙场枪意彻底破去，咽喉洞穿仰天栽倒马下！星宿妖人失去主心骨，立时作鸟兽散。'),
      P('“摘星子已死！随我直取侬智高王旗！”'),
    ],
    onFinishEffects: [openScene('scene_yn_22', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_22: {
    id: 'scene_yn_22',
    title: '第二十二幕 · 怒斩蛮王旗',
    subtitle: '岭南 · 归仁铺蛮王中军',
    beats: [
      S(NONG_ZHIGAO, '“不可能……昆仑关怎会一夜失守？！挡住他们！给本王挡住！”'),
    ],
    onFinishEffects: [
      {
        type: 'startCombat',
        questId: JINJUN_YONGZHOU_NANMAN_ID,
        opponent: {
          kind: 'npc',
          npcId: 'NPC-0094',
          talkOverride: '“大南国基业岂能毁于宋军之手！接刀！”',
        },
        rule: 'duel',
        introText: '【直捣王旗】南蛮枭雄侬智高负隅顽抗，将其击溃瓦解十万蛮兵！',
        onWin: [
          { type: 'giveCombatExp', amount: 140, reason: '归仁铺阵前击溃南蛮枭雄侬智高' },
          openScene('scene_yn_23', JINJUN_YONGZHOU_NANMAN_ID),
        ],
      },
    ],
  },
  scene_yn_23: {
    id: 'scene_yn_23',
    title: '第二十三幕 · 焚城夜遁逃',
    subtitle: '岭南 · 归仁铺战后',
    illustrationUrl: '/assets/quests/jinjun_yn_guirenpu_rout.jpg',
    illustrationCaption: '归仁铺大捷 · 狄青主力掩杀破敌，侬智高焚城夜遁',
    beats: [
      N('狄青亲自挥动红旗催动主力掩杀而来，蕃落骑兵铁蹄踏碎残阵。南蛮十万大军尸横遍野，侬智高大败亏输，仓惶焚毁邕州城池趁夜遁往大理边境，岭南全境遂告平定！'),
      S(DIQING, '“传令清扫战场、安抚两广百姓！此役能大破昆仑、一战定岭南，二位先锋当居首功！”'),
    ],
    onFinishEffects: [openScene('scene_yn_24', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_24: {
    id: 'scene_yn_24',
    title: '第二十四幕 · 漓江泛舟饮',
    subtitle: '桂林 · 漓江夜画舫',
    beats: [
      N('凯旋桂林之夜，一轮明月映照碧波如镜的漓江。你与杨文广脱去染血重甲，同泛一叶画舫痛饮庆功烈酒。'),
      S(YANG_WENGUANG, '“痛快！自从先祖令公镇守雁门以来，我杨家儿郎最慕的便是这等酣畅淋漓的破阵之战！”'),
      P('“若无文广兄右翼死死咬住蛮军大将，我亦难一举凿穿中军。干！”'),
    ],
    onFinishEffects: [openScene('scene_yn_25', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_25: {
    id: 'scene_yn_25',
    title: '第二十五幕 · 杨门托神兵',
    subtitle: '桂林 · 漓江夜画舫',
    illustrationUrl: '/assets/quests/jinjun_yn_lijiang_spear.jpg',
    illustrationCaption: '桂林漓江庆功夜 · 杨文广解下天波透甲金枪托付英雄',
    beats: [
      N('酒至半酣，杨文广神色忽转庄重，感慨天波杨府满门忠烈，自己即将奉调转任地方屯驻，遂起身将一杆金光内敛、枪锋寒冽的神兵双手捧至你的面前。'),
      S(YANG_WENGUANG, '“此乃我杨家世代相传的破甲神兵——《天波透甲金枪》！宝枪赠英雄，愿此枪随兄台饮血塞北，护我大宋河山！”'),
      P('“文广兄此托重若千钧！末将必不负杨门满门忠烈之望！”'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'WPN-004', qty: 1 },
      { type: 'setFlag', flag: 'yn_spear_given', value: true },
      openScene('scene_yn_26', JINJUN_YONGZHOU_NANMAN_ID),
    ],
  },
  scene_yn_26: {
    id: 'scene_yn_26',
    title: '第二十六幕 · 整军北归途',
    subtitle: '岭南 · 北归官道',
    beats: [
      S(DIQING, '“邕、广二州防务已交地方安抚司接管，我军押解蛮俘露布北归东京！”'),
    ],
    onFinishEffects: [setStep(JINJUN_YONGZHOU_NANMAN_ID, 'yn_xuande_promotion')],
  },
  scene_yn_27: {
    id: 'scene_yn_27',
    title: '第二十七幕 · 露布传京师',
    subtitle: '开封府 · 朱雀门外',
    beats: [
      N('捷报传至汴梁，全城欢声雷动。仁宗皇帝闻讯大悦，下旨于宣德门外搭起彩楼，亲自率百官迎接平蛮凯旋大军。'),
      S(GUARD, '“报——！官家已御宣德门，传狄相公与正副先锋入殿受赏！”'),
    ],
    onFinishEffects: [openScene('scene_yn_28', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_28: {
    id: 'scene_yn_28',
    title: '第二十八幕 · 宣德门前路',
    subtitle: '开封府 · 皇城门前',
    onFinishEffects: [openScene('scene_yn_29', JINJUN_YONGZHOU_NANMAN_ID)],
    beats: [
      P('“整理甲胄，随狄相公入宣德门受俘！”'),
    ],
  },
  scene_yn_29: {
    id: 'scene_yn_29',
    title: '第二十九幕 · 宣德门受俘',
    subtitle: '开封府 · 大内皇宫宣德门',
    illustrationUrl: '/assets/quests/jinjun_yn_xuande_rank5.jpg',
    illustrationCaption: '宣德门受俘大典 · 宋仁宗亲授殿前都指挥使虎符',
    beats: [
      N('宣德门广场红毯十里，鼓乐齐鸣。仁宗皇帝赵祯亲临城楼受俘，当着满朝文武与十万京师百姓之面宣读制书，将平定南蛮的首功加封于主角。'),
      S(RENZONG, '“殿前司都虞候平太行、扫姑苏、慑吐蕃，今复随狄卿远平邕州十万蛮寇！朕今日破格超擢卿为【殿前都指挥使】，总领天子亲军宿卫兵权！”'),
    ],
    onFinishEffects: [openScene('scene_yn_30', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_30: {
    id: 'scene_yn_30',
    title: '第三十幕 · 拜领殿前印',
    subtitle: '开封府 · 垂拱紫宸正殿',
    beats: [
      P('“臣叩谢圣恩！必以手中透甲金枪、胸中平生所学，誓死拱卫社稷，保我大宋四境安宁！”'),
      S(DIQING, '“好！往后这殿前司三衙虎符重担，便真要落在你肩上了。”'),
    ],
    onFinishEffects: [openScene('scene_yn_31', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_31: {
    id: 'scene_yn_31',
    title: '第三十一幕 · 三衙新气象',
    subtitle: '开封府 · 八十万禁军大教场',
    beats: [
      N('荣任殿前都指挥使后，你重返八十万禁军大教场检阅三军，昔日同袍与新附蕃落精锐齐声高呼“万胜”，声浪直冲云霄。'),
      S(GUARD, '“恭贺都帅登坛拜帅！全军甲士枕戈待旦，惟都帅马首是瞻！”'),
    ],
    onFinishEffects: [openScene('scene_yn_32', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_32: {
    id: 'scene_yn_32',
    title: '第三十二幕 · 枪锋寒如雪',
    subtitle: '开封府 · 殿前司帅府',
    beats: [
      P('“（这杆天波透甲金枪沉重如山，枪尖尚带杨家先烈之气……）”'),
    ],
    onFinishEffects: [openScene('scene_yn_33', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_33: {
    id: 'scene_yn_33',
    title: '第三十三幕 · 江南密信至',
    subtitle: '开封府 · 殿前司帅府',
    beats: [
      N('庆功宴余温未散，皇城司密探忽自江南飞鸽传书，言西夏一品堂征东大将军赫连铁树竟率大批番邦高手潜入两浙路，更有一个令你心头一凛的名字赫然在列——慕容复！'),
      P('“（慕容复竟投靠了西夏一品堂？！看来我大宋与那燕子坞残孽的旧账，还远未算清！）”'),
    ],
    onFinishEffects: [openScene('scene_yn_34', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_34: {
    id: 'scene_yn_34',
    title: '第三十四幕 · 整备缇骑待',
    subtitle: '开封府 · 殿前司点兵台',
    beats: [
      S(GUARD, '“禀都帅，两百名玄甲缇骑已随时待命！”'),
    ],
    onFinishEffects: [openScene('scene_yn_35', JINJUN_YONGZHOU_NANMAN_ID)],
  },
  scene_yn_35: {
    id: 'scene_yn_35',
    title: '第三十五幕 · 蛮烟散尽时',
    subtitle: '开封府 · 垂拱紫宸正殿',
    beats: [
      N('南蛮平定，岭南复安，你也正式登顶大宋禁军最高武职——Lv.5 殿前都指挥使。然而江南与西北的真正风暴，正悄然拉开序幕。'),
      P('“（既掌天子亲军最高兵符，无论江南、西北还是雁门塞外，凡敢犯我大宋者，虽远必诛！）”'),
    ],
    onFinishEffects: [
      { type: 'setSectRank', sectId: 'SECT-33', rank: 5 },
      // 旧档兼容：漓江托枪一幕已改为当场发放，仅为在改版前已越过该幕的玩家补发
      {
        type: 'branch',
        condition: flag('yn_spear_given', 'falsy'),
        thenEffects: [{ type: 'giveItem', itemId: 'WPN-004', qty: 1 }],
      },
      { type: 'giveSilver', amount: 500 },
      { type: 'addArtExp', amount: 3000 },
      { type: 'addSectContribution', amount: 200 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0031' }, delta: 25 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0032' }, delta: 30 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0001' }, delta: 20 },
      { type: 'modifyRenown', delta: 40 },
      { type: 'modifyChivalry', delta: 15 },
      { type: 'completeQuest', questId: JINJUN_YONGZHOU_NANMAN_ID },
    ],
  },
}
