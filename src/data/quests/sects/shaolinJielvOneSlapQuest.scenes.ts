import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q14_QUEST_ID } from './shaolinJielvOneSlapQuest'

const SPEAKER_YAN_HENG: StorySpeakerSpec = {
  kind: 'custom',
  name: '严横',
  title: '铁罗汉 · 西夏黑道悍匪',
  factionName: '西夏黑道',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildYanHengBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ14_YANHENG',
    name: '严横',
    title: '铁罗汉 · 西夏黑道悍匪',
    realm: '二流中品',
    factionName: '西夏黑道',
    sectRank: 0,
    sectRankLabel: '西夏悍匪',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“哈哈哈哈！老子练就二十载横练铁布衫，寻常刀剑难伤分毫！少林小秃驴竟敢孤身来送死！”',
    stats: { hp: 1380, mp: 1040, agi: 46, res: 34 },
    talents: { bone: 80, comprehension: 56, charm: 32 },
    equippedArts: {
      neigong: 'MA-080',
      qinggong: 'MA-119',
      move1: 'MA-106',
      move2: 'MA-124',
      move3: 'MA-107',
    },
    learnedArts: [
      { artId: 'MA-080', level: 6 },
      { artId: 'MA-119', level: 5 },
      { artId: 'MA-106', level: 6 },
      { artId: 'MA-124', level: 6 },
      { artId: 'MA-107', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq14_01: {
    id: 'scene_slq14_01',
    title: '第一幕 · 汴京血信',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}初冬，寒霜铺满钟鼓禅院青石。你自汝州归山已逾一载，潜心研习经义、笔墨与辩才，修为愈发沉凝。这日清晨，玄寂长老神色铁青地召你入廊，掌中紧攥着一封火漆密函。'),
      S('NPC-0134', '（沉声道）“阿弥陀佛。东京开封府昨夜传来八百里急报：近十日内，汴京城接连有三位富绅在深宅大院中遭人一掌震碎心脉惨死！更骇人的是，凶手每次作案后都在墙上以血书『般若降魔』四字，还故意遗落少林式样的念珠！”'),
      P('（闻言心头一凛）“竟有人敢在天子脚下连环行凶、公然嫁祸我少林寺？！”'),
      S('NPC-0134', '“不错！如今汴京市井流言四起，御史台已有言官上疏质问少林纵僧妄杀。方丈师兄已命老衲亲赴开封大相国寺查明真凶——你素来沉稳细心，便随老衲星夜东赴汴京！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_02', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_02: {
    id: 'scene_slq14_02',
    title: '第二幕 · 东赴东京',
    subtitle: '钟鼓禅院石阶',
    mandatory: true,
    beats: [
      S('NPC-0134', '“驻守开封大相国寺的禅武僧【慧禅】师侄已暗中走访三处案发现场，正在【资圣八角琉璃宝塔】候咱们汇合。事不宜迟，你整备妥当后即刻赴开封大相国寺与我等会面！”'),
      P('（合十领命）“弟子遵命！这就动身赶往开封大相国寺资圣宝塔！”'),
    ],
    choices: [
      {
        id: 'slq14_accept_bianliang',
        label: '领戒律密谕，星夜启程赴开封大相国寺资圣宝塔缉凶',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q14_QUEST_ID, stepId: 'bianliang_zisheng_hunt' },
          setStep(SHAOLIN_Q14_QUEST_ID, 'bianliang_zisheng_hunt'),
          toast(
            '已开启《一拍两散 · 汴京缉凶》！请前往【开封府 · 大相国寺 · 资圣八角琉璃宝塔】汇合！',
            'talk',
            '汴京缉凶',
          ),
        ],
      },
    ],
  },

  scene_slq14_03: {
    id: 'scene_slq14_03',
    title: '第三幕 · 琉璃宝塔',
    subtitle: '开封府 · 大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('东京开封府冬雪初霁，大相国寺内香火鼎盛却暗流涌动。你穿过熙攘人群，循着琉璃飞檐拾级而上，登临八角宝塔高阁。'),
      N('高阁窗棂半掩，俯瞰汴京万家灯火。玄寂长老早已先一步抵达，身旁立着一名目光炯炯、身披青灰禅衣的壮年武僧，正是常驻汴京的禅武僧【慧禅】。'),
      S('NPC-0378', '（见你登塔，连忙合十相迎）“阿弥陀佛！师弟一路风尘仆仆辛苦了！贫僧已将开封府三处血案的仵作验尸抄录与墙上血字临摹妥当，请师伯与师弟过目！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_04', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_04: {
    id: 'scene_slq14_04',
    title: '第四幕 · 笔锋破绽',
    subtitle: '资圣八角琉璃宝塔高阁',
    mandatory: true,
    beats: [
      N('你接过慧禅递来的卷宗与临摹血字，凝神细看。你素日苦修书法，一眼便觉那「般若降魔」四字笔意古怪异常！'),
      P('（指着卷宗上「魔」字一捺，眉峰微蹙）“师伯、慧禅师兄请看！这四字虽刻意模仿中原颜体，但起笔顿挫僵硬，勾挑之处惯向右下方斜撇——这绝非中原佛门抄经笔法，倒极似常年书写西夏番文之人的手势习气！”'),
      S('NPC-0378', '（击掌惊叹）“师弟好眼力！再看那三名遇害富绅的底细——表面上是京城绸缎粮商，实则暗中都曾替朝廷向陕西前线筹措过军粮！凶手杀他们，根本不是什么佛门仇杀，而是冲着大宋西北军饷来的！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_05', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_05: {
    id: 'scene_slq14_05',
    title: '第五幕 · 铁罗汉严横',
    subtitle: '资圣八角琉璃宝塔高阁',
    mandatory: true,
    beats: [
      S('NPC-0134', '（接过验尸抄录细看掌印尺寸与肋骨碎裂之状，眼中寒光一闪）“掌印宽厚如蒲扇，劲力外刚内燥，竟还带着几分偷学来的横练硬功余韵……老衲知道是谁了！”'),
      S('NPC-0134', '“十年前有个横行甘凉道与西夏黑道的悍匪，外号『铁罗汉』严横！此人将一门外家硬功『铁布衫』练至大成，寻常刀剑难伤，又贪财嗜杀。定是西夏密探重金雇他潜入汴京行刺粮商，并嫁祸我少林以离间朝廷与武林！”'),
      S('NPC-0378', '“玄寂师伯明鉴！那严横既练成横练铁功，又有二流中品修为，寻常拳棍打在他身上如击败革，咱们该如何一举将其擒拿而不致走脱？”'),
    ],
    onFinishEffects: [openScene('scene_slq14_06', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_06: {
    id: 'scene_slq14_06',
    title: '第六幕 · 绝艺破铁',
    subtitle: '资圣八角琉璃宝塔顶层',
    mandatory: true,
    beats: [
      S('NPC-0134', '（望向窗外暮色沉沉的琉璃塔尖，缓声开口）“严横倚仗横练外功耀武扬威，老衲偏要以少林正宗内家破甲绝学制他！慧禅，你速去甜水巷暗中盯紧最后一位经手军粮的周家大宅；至于师侄你——随我上塔顶！”'),
      N('慧禅领命疾步下塔。玄寂引你步上资圣宝塔最顶层露台，朔风卷雪呼啸而来，琉璃风铃铮铮齐鸣。'),
      S('NPC-0134', '“老衲外号『一拍神僧』，平生最得意的绝艺便是少林七十二绝技之一——《一拍两散掌》！此掌不求花巧连招，只求凝毕生功力于一掌，一拍之下，纵是精钢巨石亦化齑粉！今夜擒拿严横，正需此掌破其铁壁！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_07', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_07: {
    id: 'scene_slq14_07',
    title: '第七幕 · 塔顶传掌',
    subtitle: '资圣八角琉璃宝塔顶层',
    illustrationUrl: '/assets/quests/sl_14_zisheng_teach.jpg',
    illustrationCaption: '一拍两散 · 资圣宝塔顶层朔风飞雪，玄寂亲演示惊世掌力',
    mandatory: true,
    beats: [
      N('玄寂深吸一口清冷空气，身形倏然凝定如古佛坐禅。只见他右手缓缓抬起，掌心淡若无物，却令周遭三丈飞雪骤然停滞半空！'),
      N('下一瞬，玄寂轻描淡写向前虚拍一掌！无声无息间，一股排山倒海的凝练劲风破空而出，十丈外一截被积雪压弯的枯槁老柏枝干竟应声化作漫天细屑，飘散在汴京暮风之中！'),
      S('NPC-0134', '“看到了么？『一拍两散』，非是拼命蛮力，而是将周身内息收束于劳宫一寸，由静入动、破妄归空！你且闭目凝神，随老衲口诀行气三周天！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_08', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_08: {
    id: 'scene_slq14_08',
    title: '第八幕 · 佛理印心',
    subtitle: '资圣八角琉璃宝塔顶层',
    mandatory: true,
    beats: [
      N('你盘膝坐于冰凉石砖之上，依玄寂口诀引《罗汉伏虎功》内息汇入右掌，同时默诵《金刚经》「应无所住而生其心」之偈。初时劲力散漫难聚，经玄寂以指风轻点肩井穴引导，刹那间真气如百川归海，掌心隐隐发出低沉雷鸣！'),
      S('NPC-0134', '（微微颔首，目露赞赏）“悟性颇佳！短短两柱香便已摸到《一拍两散掌》的蓄劲门槛。待今夜实战对敌，以严横的铁布衫作磨刀石，此掌便可彻底融会贯通！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q14_taught_palm', value: true },
      openScene('scene_slq14_09', SHAOLIN_Q14_QUEST_ID),
    ],
  },

  scene_slq14_09: {
    id: 'scene_slq14_09',
    title: '第九幕 · 甜水巷警讯',
    subtitle: '资圣八角琉璃宝塔高阁',
    mandatory: true,
    beats: [
      N('亥时三刻，一只灰羽信鸽振翅落上宝塔窗台。玄寂解下竹筒密笺展开一看，神色骤紧。'),
      S('NPC-0134', '“慧禅传讯：甜水巷周府外已发现西夏暗哨踪迹，铁罗汉严横极可能于今夜子时越墙行刺周老爷！且开封府衙已有风声，若大相国寺高僧倾巢而出，恐打草惊蛇，亦防西夏余党趁虚袭寺。”'),
      P('（起身合十，目光灼灼）“玄寂师伯坐镇相国寺稳住大局即可！弟子愿即刻潜赴甜水巷周府屋脊，会同慧禅师兄埋伏，必将那铁罗汉严横生擒归案！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_10', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_10: {
    id: 'scene_slq14_10',
    title: '第十幕 · 踏雪伏击',
    subtitle: '资圣宝塔阶下',
    mandatory: true,
    beats: [
      S('NPC-0134', '“善！你孤身赴敌，切记切不可与严横久耗体力，须寻准他催动横练硬功、气机最盛亦最僵硬的一瞬，以《一拍两散掌》破其门户！去罢！”'),
      N('你整了整褐色僧衣，借夜色掩护离开大相国寺，踏着汴京屋瓦飞檐悄无声息掠向城南甜水巷。'),
    ],
    choices: [
      {
        id: 'slq14_go_tianshui',
        label: '子夜潜赴甜水巷周府屋脊，设伏等候「铁罗汉」严横',
        tone: 'danger',
        effects: [openScene('scene_slq14_11', SHAOLIN_Q14_QUEST_ID)],
      },
    ],
  },

  scene_slq14_11: {
    id: 'scene_slq14_11',
    title: '第十一幕 · 子夜屋脊',
    subtitle: '开封府 · 甜水巷周府屋脊',
    illustrationUrl: '/assets/quests/sl_14_tianshui_roof.jpg',
    illustrationCaption: '子夜甜水巷 · 飞雪青瓦之上，铁罗汉严横现身周府屋脊',
    mandatory: true,
    beats: [
      N('三更梆子在寂静雪夜中远远传开。甜水巷青砖黛瓦覆着一层薄雪，周府高墙内灯火皆熄。你屏息敛气伏于歇山顶飞檐阴影之后，双目如鹰紧盯院墙。'),
      N('忽闻瓦片一声极轻的“咔嚓”脆响！一条铁塔般的魁梧黑影自东北角墙头翻跃而入，稳稳落在主屋屋脊正中。此人光头赤眉、双臂粗壮如铜柱，腰间竟故意挂着一串伪造的粗木佛珠——正是西夏黑道悍匪「铁罗汉」严横！'),
      P('（长身而起，稳步踏雪而出，朗声喝道）“阿弥陀佛！严横，你假借少林之名在汴京连害三条人命，今夜甜水巷便是你的伏法之地！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_12', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_12: {
    id: 'scene_slq14_12',
    title: '第十二幕 · 恶匪狂言',
    subtitle: '甜水巷周府屋脊',
    mandatory: true,
    beats: [
      S(SPEAKER_YAN_HENG, '（先是一怔，旋即看清你只是一名年轻少林僧人，顿时放声狞笑）“嘿嘿嘿，老子当是玄慈还是玄寂亲自来了，原来是个毛还没长齐的小和尚！怎么，一个人跑来送死？”'),
      S(SPEAKER_YAN_HENG, '（扯下腰间伪造佛珠晃了晃，满脸狰狞）“也好！把你这真少林和尚的脑袋拧下来扔在周老财床前，明日满京城都得相信是少林寺杀人不眨眼！西夏主顾赏的那千两黄金，老子又稳赚一笔！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_13', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_13: {
    id: 'scene_slq14_13',
    title: '第十三幕 · 诛心破妄',
    subtitle: '甜水巷周府屋脊',
    mandatory: true,
    beats: [
      P('（神色淡然，字字如剑）“严横，你自以为天衣无缝，殊不知你墙上所留血字笔锋尽带西夏番文习气，三名受害豪绅皆与西北军粮有关，早已暴露你受西夏雇佣之实！大相国寺与开封府早已布下天罗地网，你今日插翅难飞！”'),
      S(SPEAKER_YAN_HENG, '（脸色骤然一变，杀机暴涨）“好尖利的嘴皮子！留你不得！先吃老子一记铁臂崩拳，看你这小和尚挡不挡得住！”'),
      N('话音未落，严横浑身骨骼爆响，双臂泛起一层暗沉铁色罡气，踏碎数片青瓦如狂牛般直扑而来！'),
    ],
    onFinishEffects: [openScene('scene_slq14_14', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_14: {
    id: 'scene_slq14_14',
    title: '第十四幕 · 屋脊死斗',
    subtitle: '甜水巷周府屋脊（实战擒凶）',
    mandatory: true,
    beats: [
      N('雪夜屋脊狭仄湿滑，严横横练铁布衫护体、招招势大力沉，正是最严峻的生死恶战！'),
    ],
    choices: [
      {
        id: 'slq14_fight_yanheng',
        label: '稳住下盘，屋脊之上硬撼「铁罗汉」严横！（二流中品 · 实战）',
        subLabel: '破其横练铁布衫，为少林洗雪奇冤',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q14_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYanHengBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '屋下便是周府满门老小，今夜绝不能放严横逃脱行凶！',
            introText: '【甜水巷屋脊】硬撼西夏黑道悍匪【铁罗汉 · 严横】，一战洗刷少林冤屈！',
            onWin: [openScene('scene_slq14_15', SHAOLIN_Q14_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('严横横练硬功刚猛难挡，暂借飞檐腾挪脱身调息后再赴资圣宝塔重整伏击！', 'warn', '汴京缉凶'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq14_15: {
    id: 'scene_slq14_15',
    title: '第十五幕 · 凝气一拍',
    subtitle: '甜水巷周府屋脊',
    mandatory: true,
    beats: [
      N('屋脊之上拳风呼啸，积雪纷飞！数十合恶战下来，严横仗着横练铁布衫硬受你数记重击仍凶性大发，狞笑着双臂交叉护胸，意欲借浑厚体格强行撞破你的防线！'),
      S(SPEAKER_YAN_HENG, '“没用的！老子这双铁臂连重刀都劈不开，你那点花拳绣腿是在给老子挠痒痒么！”'),
      P('（刹那间心境空明，脑中浮现资圣宝塔顶层飞雪停滞的一幕，右掌缓缓收回胸前，周身内息尽聚劳宫一寸）“铁壁虽坚，遇空则碎——接我少林《一拍两散掌》！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_16', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_16: {
    id: 'scene_slq14_16',
    title: '第十六幕 · 碎臂擒魔',
    subtitle: '甜水巷周府庭院',
    illustrationUrl: '/assets/quests/sl_14_yanheng_capture.jpg',
    illustrationCaption: '一拍两散 · 凝练掌劲破尽横练铁臂，生擒铁罗汉严横',
    mandatory: true,
    beats: [
      N('看似平平无奇的一掌轻轻印在严横交叉的双臂之上！刹那间如闷雷炸响，严横引以为傲的铁布衫护体罡气竟如琉璃般寸寸崩裂，刚猛无俦的穿透劲力直透骨髓，当场震断其右臂臂骨！'),
      S(SPEAKER_YAN_HENG, '（发出一声凄厉惨嚎，口喷鲜血自屋脊倒飞而下，重重砸落周府雪地之中）“啊——！我的铁臂……你……你竟练成了玄寂老贼的一拍两散掌……”'),
      N('你身形如鹤飘落雪地，反手点封严横周身大穴，以麻绳将其捆作粽子，彻底终结了这场搅动汴京的连环血案！'),
    ],
    onFinishEffects: [openScene('scene_slq14_17', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_17: {
    id: 'scene_slq14_17',
    title: '第十七幕 · 铁证如山',
    subtitle: '甜水巷周府庭院',
    mandatory: true,
    beats: [
      N('几乎就在同时，院墙外火把通明，慧禅率领数名相国寺护寺武僧与开封府巡夜捕快疾步赶到！'),
      S('NPC-0378', '（快步上前搜查严横怀中，取出一卷西夏文密信与一袋未用完的假造少林佛珠，朗声大喜）“阿弥陀佛！师弟神威！西夏密信与假佛珠人赃并获，铁证如山！少林寺蒙受的不白之冤，今日彻底昭雪！”'),
      N('惊醒的周府上下推门望见雪地中被生擒的悍匪，纷纷合十叩谢少林救命之恩。'),
    ],
    onFinishEffects: [openScene('scene_slq14_18', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_18: {
    id: 'scene_slq14_18',
    title: '第十八幕 · 昭雪汴京',
    subtitle: '开封府大相国寺前',
    mandatory: true,
    beats: [
      N('天色微明，严横与西夏密信俱已移交开封府升堂审结。不到半日，汴京茶楼酒肆便传遍了「少林戒律高徒一掌破铁臂、生擒西夏悍匪洗冤护民」的佳话，先前针对少林的流言蜚语烟消云散。'),
      N('你随慧禅返回大相国寺资圣八角琉璃宝塔，向玄寂长老复命。'),
    ],
    onFinishEffects: [openScene('scene_slq14_19', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_19: {
    id: 'scene_slq14_19',
    title: '第十九幕 · 塔顶授诀',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      S('NPC-0134', '（立于八角宝塔窗前，望着初升旭日，神色欣慰无比）“善哉，善哉！你非但以笔墨辩才勘破西夏奸计，更在甜水巷屋脊生死一瞬悟透《一拍两散掌》真谛、一掌碎铁生擒凶徒，为我少林寺挣足了百年清誉！”'),
      S('NPC-0134', '“老衲平生衣钵绝学《一拍两散掌》，今日便将全卷秘诀正式传授于你！切记此掌威力过巨，非大奸大恶不可轻用，须常怀戒慎慈悲之心！”'),
      P('（恭谨伏拜，双手接过玄寂所授掌谱心诀）“弟子定当铭记玄寂师伯教诲，谨守佛门戒律，绝不妄动杀心！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_20', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_20: {
    id: 'scene_slq14_20',
    title: '第二十幕 · 禅心清澄',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔（结局）',
    mandatory: true,
    beats: [
      N('宝塔铜铃在朝阳清风中悦耳长鸣。你合十伫立高阁，回望汴京繁华街市，只觉掌中真气收放自如，经义与武道皆迈入全新境界。'),
    ],
    choices: [
      {
        id: 'slq14_finish',
        label: '合十谢过玄寂师伯与慧禅师兄，领受《一拍两散掌》（完成《一拍两散 · 汴京缉凶》）',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-083' },
          { type: 'giveCombatExp', amount: 340, reason: '汴京甜水巷屋脊一拍两散掌生擒铁罗汉严横' },
          { type: 'addSectContribution', amount: 140 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyRenown', delta: 40, reason: '汴京擒凶洗刷少林冤屈，名动京师' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_Q14_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《一拍两散 · 汴京缉凶》！习得地阶绝学《一拍两散掌》，获 340 实战经验、140 门派贡献与 40 声望！',
            'success',
            '汴京缉凶',
          ),
        ],
      },
    ],
  },
}
