import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep } from '../../../engine/quest/dsl'
import { buildMurongBoFinalNpc, JINJUN_FINAL_3_ID } from './jinjunFinal3Quest'

const RENZONG = { kind: 'npc' as const, npcId: 'NPC-0001' }
const BAOZHENG = { kind: 'npc' as const, npcId: 'NPC-0013' }
const WANG = { kind: 'npc' as const, npcId: 'NPC-0038' }
const HANQI = { kind: 'npc' as const, npcId: 'NPC-0011' }
const XIAOFENG = { kind: 'npc' as const, npcId: 'NPC-0110' }
const MURONGBO = { kind: 'npc' as const, npcId: 'NPC-0104' }
const XIAOYUANFENG = { kind: 'npc' as const, npcId: 'NPC-0184' }
const LIAO_VANGUARD = {
  kind: 'custom' as const,
  name: '契丹南征先锋元帅',
  title: '大辽十万铁林军副统帅',
  avatarUrl: '/assets/characters/templates/tpl_liao_court_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_liao_court_male_fb.jpg',
}
const GUARD = {
  kind: 'custom' as const,
  name: '殿前司斥候校尉',
  title: '八百里黑羽急使',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_fn3_01: {
    id: 'scene_fn3_01',
    title: '第一幕 · 雪夜黑羽檄',
    subtitle: '延安府 · 鄜延边军大营',
    illustrationUrl: '/assets/quests/jinjun_fn3_black_feather.jpg',
    illustrationCaption: '雪夜黑羽檄文 · 八百里急报慕容博萧远风引十万辽军压境雁门',
    beats: [
      N('横山大捷露布刚刚传回京师，一道插着三根黑羽的八百里加急军报却在暴雪之夜撞开了东京城门与鄜延帅帐！'),
      S(GUARD, '“报——！！潜伏大辽多时的慕容博，联手辽南京武林统制萧远风蛊惑辽廷主战派，趁我军精锐西调之际，裹挟十万契丹铁林大军陈兵雁门关外！”'),
      P('“十万契丹铁林军！！慕容博、萧远风……好一对狼狈为奸的老匹夫！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_02', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_02: {
    id: 'scene_fn3_02',
    title: '第二幕 · 朝野执笏谏',
    subtitle: '开封府 · 垂拱紫宸正殿（遥闻）',
    illustrationUrl: '/assets/quests/jinjun_fn3_court_panic.jpg',
    illustrationCaption: '紫宸殿朝野震恐 · 包拯王德用韩琦执笏死谏固守雁门',
    beats: [
      N('此时东京紫宸殿上下震恐，文武百官面色惨白。包拯、王德用、韩琦三人挺身出班，执笏死谏绝不可弃守雁门半步！'),
      S(BAOZHENG, '“陛下！雁门一失，河东、河北门户洞开！请即刻急召殿前都指挥使自陕北东驰救援！”'),
      S(HANQI, '“殿前司一万百战精锐历经横山血战，正是天下唯一能挡十万铁林军之师！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_03', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_03: {
    id: 'scene_fn3_03',
    title: '第三幕 · 不待圣旨行',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      N('远在陕北的你深知兵贵神速，若等东京圣旨层层下达，雁门关早已化作焦土！你当即拍案而起，手握尚方宝剑发号施令。'),
      P('“将在外，军令有所不受！不等朝廷调令了！全军一万殿前司百战精锐即刻拔营，轻装简从，顶风冒雪千里东驰雁门关！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_04', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_04: {
    id: 'scene_fn3_04',
    title: '第四幕 · 顶风冒雪驰',
    subtitle: '河东 · 太行雪夜急行军',
    beats: [
      N('腊月狂雪漫天，一万名刚经历横山血战的殿前司铁甲将士紧咬牙关，日夜兼程踏雪渡过黄河、翻越晋北崇山峻岭。'),
      P('“（白沟河畔、常山枪祠、析津元帅府、黄河铁索……萧远风，你我纠缠数年的宿命，就在雁门关下彻底了断！）”'),
    ],
    onFinishEffects: [setStep(JINJUN_FINAL_3_ID, 'fn3_yanmen_relief')],
  },
  scene_fn3_05: {
    id: 'scene_fn3_05',
    title: '第五幕 · 血月照雄关',
    subtitle: '雁门关外 · 乱石雪原',
    illustrationUrl: '/assets/quests/jinjun_fn3_xiaofeng_lonely.jpg',
    illustrationCaption: '血月雁门 · 身世大白的萧峰孤立两军阵前苦劝辽军止戈',
    beats: [
      N('腊月寒夜，一轮诡异暗红的血月高悬于雁门关苍穹之上。此时已身世大白、复姓为萧的乔峰陷于家国忠义两难绝境，竟孤身骑马立于十万辽军与雁门城墙之间，苦劝辽廷止戈退兵。'),
      S(XIAOFENG, '“宋辽两国百姓皆受生养之恩，若铁林军南下，必是千里白骨、生灵涂炭！萧峰愿以死相劝，请大辽止戈！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_06', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_06: {
    id: 'scene_fn3_06',
    title: '第六幕 · 十面伏杀局',
    subtitle: '雁门关外 · 乱石伏击圈',
    illustrationUrl: '/assets/quests/jinjun_fn3_ambush_trap.jpg',
    illustrationCaption: '暗箭伏杀 · 慕容博与萧远风率契丹重骑设下十面埋伏欲毙萧峰',
    beats: [
      N('然而暗处早有两双阴鸷眼睛死死盯着阵前的萧峰！慕容博与萧远风岂容他坏了灭宋大计，悄悄调动契丹铁林重骑合围而来，千张硬弓已对准孤身一人的萧峰！'),
      S(MURONGBO, '“萧峰不死，辽军军心难一！待乱箭先射杀此人，趁夜一鼓踏破雁门关！”'),
      S(XIAOYUANFENG, '“放箭——！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_07', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_07: {
    id: 'scene_fn3_07',
    title: '第七幕 · 千里终抵关',
    subtitle: '雁门关内 · 瓮城校场',
    beats: [
      N('恰在这千钧一发之际，你率一万殿前司百战禁军刚好赶至雁门关瓮城！城楼守将见天兵突至，喜极而泣。'),
      S(GUARD, '“都帅！！关外辽军正围攻乔……萧峰大侠！城门随时可开！”'),
      P('“传令：点起一万支火炬，随我洞开雁门雄关，杀出去救我生死知己！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_08', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_08: {
    id: 'scene_fn3_08',
    title: '第八幕 · 背弩提金枪',
    subtitle: '雁门关内 · 瓮城门洞',
    beats: [
      P('“（种老帅遗赠的皇祐神臂御赐弩背在身后，杨兄所托的天波透甲金枪握在掌中——今日，便是百战收官之战！）”'),
    ],
    onFinishEffects: [openScene('scene_fn3_09', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_09: {
    id: 'scene_fn3_09',
    title: '第九幕 · 雄关战鼓擂',
    subtitle: '雁门关 · 雄关箭楼',
    beats: [
      P('“殿前司万名儿郎听令：今夜不退一步，随本帅杀穿十万契丹铁林军！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_10', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_10: {
    id: 'scene_fn3_10',
    title: '第十幕 · 门开万炬明',
    subtitle: '雁门关 · 雄关箭楼',
    onFinishEffects: [openScene('scene_fn3_11', JINJUN_FINAL_3_ID)],
    beats: [
      S(GUARD, '“开城门——！！”'),
    ],
  },
  scene_fn3_11: {
    id: 'scene_fn3_11',
    title: '第十一幕 · 万胜震云霄',
    subtitle: '雁门关外 · 血月雪原',
    illustrationUrl: '/assets/quests/jinjun_fn3_gate_open.jpg',
    illustrationCaption: '雄关洞开 · 万支火炬撕裂风雪，主角一马当先杀出雁门',
    beats: [
      N('沉重如山的雁门关铁门轰然洞开，万支火炬瞬间撕裂漫天暴雪！你背负皇祐神臂御赐弩、手提天波透甲金枪一马当先杀出雄关，身后一万名殿前司百战禁军齐吼“万胜”，声浪震彻云霄！'),
      P('“萧大哥莫慌——！！我大宋殿前司一万铁甲来助你了！！”'),
      S(XIAOFENG, '“好兄弟！！你果然如约而至！！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_12', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_12: {
    id: 'scene_fn3_12',
    title: '第十二幕 · 御弩破暗箭',
    subtitle: '雁门关外 · 乱军阵前',
    beats: [
      N('你反手摘下背后皇祐神臂御赐弩连扣机括，“嗡嗡”几声破空锐响，十余名正欲放冷箭射杀萧峰的契丹神射手应声坠马！两军铁骑轰然对撞在一起！'),
      S(XIAOFENG, '“痛快！有劳兄弟护住两翼，那契丹先锋主帅交由萧某去擒！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_13', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_13: {
    id: 'scene_fn3_13',
    title: '第十三幕 · 宿敌狭路逢',
    subtitle: '雁门关外 · 乱石雪原',
    illustrationUrl: '/assets/quests/jinjun_fn3_xiaoyuanfeng_duel.jpg',
    illustrationCaption: '宿敌狭路 · 辽南京武林统制萧远风挺铁枪迎面杀来',
    beats: [
      N('乱军铁蹄溅起漫天雪血，一道披着乌金双层铁甲、左眉一道长疤直贯耳根的魁梧身影纵马如山般冲破人群，手挺一根沉重镔铁长枪直指你的咽喉——正是自析津府、黄河渡口一路死斗至今的宿敌萧远风！'),
      S(XIAOYUANFENG, '“好一个常山小儿！从幽州烧我《南牧山川策》，到黄河坏我大事，今日竟成了大宋殿前都指挥使！拿命来结清旧账！”'),
      P('“萧远风，你我也该做个彻底了断了！接我天波透甲金枪！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_14', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_14: {
    id: 'scene_fn3_14',
    title: '第十四幕 · 了断数年仇',
    subtitle: '雁门关外 · 乱石雪原',
    beats: [
      N('人马合一，金铁交鸣震耳欲聋！昔日在元帅府你尚需借烟幕弹撑过三合，今日历经太行、太湖、邕州、横山百战淬炼，你的枪意已然臻至化境！'),
    ],
    onFinishEffects: [
      {
        type: 'startCombat',
        questId: JINJUN_FINAL_3_ID,
        opponent: {
          kind: 'npc',
          npcId: 'NPC-0184',
          talkOverride: '“幽州之辱、黄河之恨，今日一枪尽数讨还！”',
        },
        rule: 'duel',
        introText: '【斩断心魔】宿敌辽南京武林统制萧远风全力拼命，将其阵前挑杀！',
        onWin: [
          { type: 'markNpcsDead', npcIds: ['NPC-0184'] },
          { type: 'giveCombatExp', amount: 180, reason: '雁门关阵前挑杀宿敌萧远风' },
          openScene('scene_fn3_15', JINJUN_FINAL_3_ID),
        ],
      },
    ],
  },
  scene_fn3_15: {
    id: 'scene_fn3_15',
    title: '第十五幕 · 枪挑萧远风',
    subtitle: '雁门关外 · 乱石雪原',
    illustrationUrl: '/assets/quests/jinjun_fn3_xiaoyuanfeng_slain.jpg',
    illustrationCaption: '心魔尽斩 · 天波透甲金枪震断萧远风铁枪将其挑落马下',
    beats: [
      N('交锋仅数合，你借马力旋身一记霸道无比的霸王回马枪，伴随“当啷”一声巨响震断萧远风手中镔铁长枪，金色枪锋顺势贯甲而过，将其狠狠挑落马下！昔年横亘于白沟河畔的死仇心魔，自此一枪斩断！'),
      S(XIAOYUANFENG, '“好……好快的枪……大宋竟出了你这等将星……”'),
    ],
    onFinishEffects: [openScene('scene_fn3_16', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_16: {
    id: 'scene_fn3_16',
    title: '第十六幕 · 魔尊踏血出',
    subtitle: '雁门关 · 绝壁城墙下',
    illustrationUrl: '/assets/quests/jinjun_fn3_murongbo_emerge.jpg',
    illustrationCaption: '绝顶现身 · 慕容博踏尸山血海走出，怒喝以大宋柱石祭大燕',
    beats: [
      N('萧远风毙命，四周契丹亲卫骇然退散。就在此时，一股宛若渊海山岳般令人窒息的绝顶威压骤然降临！已然破入绝顶大宗师之境的慕容博踏着尸山血海缓步走出，灰衣猎猎作响，双目赤红如血！'),
      S(MURONGBO, '“少室山三合未杀你，燕子坞五合未留你，如今连我复国最后倚仗的辽兵也快被你杀穿！今日在雁门关下，老夫便拿你这大宋柱石的人头，祭我大燕江山！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_17', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_17: {
    id: 'scene_fn3_17',
    title: '第十七幕 · 风雪为之停',
    subtitle: '雁门关 · 绝壁城墙下',
    beats: [
      N('风雪仿佛在这一瞬骤然停滞。你缓缓翻身下马，脱去已然卷刃的配刀，双手紧握着沾满敌血的天波透甲金枪，将毕生沙场百战军魂与《太玄经》真气尽数灌注枪尖！'),
      P('“慕容老贼！你藏头露尾三十载，害死多少江湖义士与边关将士！今日我大宋千万忠魂看着，你的大燕迷梦，该醒了！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_18', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_18: {
    id: 'scene_fn3_18',
    title: '第十八幕 · 绝壁巅峰战',
    subtitle: '雁门关 · 绝壁城墙下',
    illustrationUrl: '/assets/quests/jinjun_fn3_wall_duel.jpg',
    illustrationCaption: '巅峰死战 · 雁门绝壁之下主角与慕容博斗转星移对百战枪意',
    beats: [
      N('二人身形同时暴起，在雁门关斑驳巨石城墙下展开了惊天动地的巅峰死战！慕容博“斗转星移”与“参合神指”化作漫天幽蓝指影，你则以百战不灭的沙场枪意硬撼绝顶神功！'),
    ],
    onFinishEffects: [
      {
        type: 'startCombat',
        questId: JINJUN_FINAL_3_ID,
        opponent: { kind: 'custom', npc: buildMurongBoFinalNpc() },
        rule: 'duel',
        lethalOnLose: true,
        deathTitle: '血洒雁门绝壁',
        deathDetail: '少侠在雁门关下与绝顶大宗师慕容博死战力竭，忠骨埋于塞北风雪。',
        forbidEscapeReason: '大宋柱石立于雄关之下，退无可退，唯有死战定鼎山河！',
        introText:
          '【终局巅峰死战 · 战败必死】绝顶大宗师慕容博全力施展《斗转星移》与《参合神指》！倾尽平生所学将其正面格杀！',
        onWin: [
          { type: 'markNpcsDead', npcIds: ['NPC-0104'] },
          { type: 'giveCombatExp', amount: 300, reason: '雁门关绝壁死战正面格杀绝顶大宗师慕容博' },
          openScene('scene_fn3_19', JINJUN_FINAL_3_ID),
        ],
      },
    ],
  },
  scene_fn3_19: {
    id: 'scene_fn3_19',
    title: '第十九幕 · 碎甲欺身入',
    subtitle: '雁门关 · 绝壁城墙下',
    illustrationUrl: '/assets/quests/jinjun_fn3_armor_shatter.jpg',
    illustrationCaption: '不灭战意 · 胸前重甲尽碎，主角顶着参合神指劲欺身直入',
    beats: [
      N('硬拼至百余合最后一刻，慕容博一记凝聚毕生功力的参合神指狠狠轰中你的胸口！你胸前精钢重甲应声炸碎、鲜血狂喷，却凭借百战不灭之躯硬生生顶着指劲一步不退，欺身踏入慕容博怀中三尺死角！'),
      S(MURONGBO, '“什么？！中了我十成功力的参合神指……你居然还不倒？！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_20', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_20: {
    id: 'scene_fn3_20',
    title: '第二十幕 · 金枪钉魔尊',
    subtitle: '雁门关 · 绝壁城墙下',
    illustrationUrl: '/assets/quests/jinjun_fn3_murongbo_nailed.jpg',
    illustrationCaption: '大燕梦碎 · 天波透甲金枪正面贯穿慕容博胸膛，钉死于雁门巨石之上',
    beats: [
      N('你一声虎吼震彻边关，双手握紧天波透甲金枪尾端，裹挟万钧雷霆与大宋忠魂之怒正面贯出！金色神锋“噗”地一声彻底贯穿慕容博胸膛，余势未竭将其死死钉在雁门关斑驳的城墙巨石之上！'),
      S(MURONGBO, '“大……燕……终究……是一场空……”'),
      P('“慕容博伏诛！！大燕百年迷梦——彻底终结了！！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_21', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_21: {
    id: 'scene_fn3_21',
    title: '第二十一幕 · 萧峰擒辽帅',
    subtitle: '雁门关外 · 辽军中军',
    illustrationUrl: '/assets/quests/jinjun_fn3_xiaofeng_capture.jpg',
    illustrationCaption: '凛然大义 · 萧峰乱军生擒辽军先锋主帅，迫辽廷立誓退兵',
    beats: [
      N('主谋慕容博与统制萧远风双双毙命，十万辽军群龙无首。与此同时，萧峰已在乱军之中如天神般劈开重围，一把生擒辽军先锋主帅，高举手中长剑喝止全军！'),
      S(XIAOFENG, '“契丹将士听真！慕容博父子已灭，若再南侵寸步，死伤者皆是我契丹与大宋无辜儿郎！立刻传令撤军，立誓三十年不犯宋境！”'),
      S(LIAO_VANGUARD, '“末……末将愿代表北院立誓：三十年内绝不再越雁门一步！全军撤回云州！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_22', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_22: {
    id: 'scene_fn3_22',
    title: '第二十二幕 · 铁林退如潮',
    subtitle: '雁门关外 · 血月雪原',
    beats: [
      N('十万契丹铁林大军如退潮般缓缓向北撤去，雁门关内外爆发出震天动地的欢呼！'),
      S(GUARD, '“退兵了！辽军退兵了！！大宋万胜！都帅万胜！！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_23', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_23: {
    id: 'scene_fn3_23',
    title: '第二十三幕 · 举碗敬知己',
    subtitle: '雁门关 · 雄关城楼',
    illustrationUrl: '/assets/quests/jinjun_fn3_xiaofeng_farewell.jpg',
    illustrationCaption: '雪夜敬别 · 萧峰向城头主角遥遥举碗，纵马隐入塞外风雪',
    beats: [
      N('你强忍胸口剧痛登上雁门雄关城楼，遥望关外风雪。只见萧峰勒马立于乱石堆旁，解下腰间烈酒倒满大碗，向城头上的你遥遥高举一敬，仰头一饮而尽！'),
      S(XIAOFENG, '“兄弟！今生能与你并肩一战、定此和平，萧峰已无遗憾！这天下苍生安稳，往后便托付于你了——保重！”'),
      P('“萧大哥——！保重！！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_24', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_24: {
    id: 'scene_fn3_24',
    title: '第二十四幕 · 纵马隐塞外',
    subtitle: '雁门关外 · 塞北雪原',
    beats: [
      N('萧峰大笑一声，掉转马头纵马奔向苍茫塞外风雪，伟岸背影渐行渐远，终究免去了断箭自尽的千古悲剧，留下一段宋辽两境共颂的侠义传奇。'),
      P('“（愿大哥在塞外天地辽阔，此生安好。）”'),
    ],
    onFinishEffects: [openScene('scene_fn3_25', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_25: {
    id: 'scene_fn3_25',
    title: '第二十五幕 · 拔枪收城防',
    subtitle: '雁门关 · 城墙下',
    beats: [
      P('“收敛阵亡将士遗体，修缮雁门城防！传捷报飞递东京！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_26', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_26: {
    id: 'scene_fn3_26',
    title: '第二十六幕 · 捷报震天下',
    subtitle: '雁门关 · 雄关箭楼',
    beats: [
      N('一夜之间，“西破横山十万夏军、北斩慕容博定鼎雁门、迫大辽三十年不犯”的惊天捷报传遍大江南北，举国上下无不欢腾！'),
      S(GUARD, '“禀都帅！朝廷八百里加急诏书已至：陛下宣您开春率大军凯旋东京，陛下将亲出城郊十里相迎！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_27', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_27: {
    id: 'scene_fn3_27',
    title: '第二十七幕 · 祭扫李牧祠',
    subtitle: '雁门关 · 镇边李牧武安君祠',
    beats: [
      P('“先祭汉赵良将李牧与杨家先烈，再祭我太行、横山、雁门数千阵亡忠魂！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_28', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_28: {
    id: 'scene_fn3_28',
    title: '第二十八幕 · 寒冬养伤愈',
    subtitle: '雁门关 · 帅府',
    beats: [
      N('整个腊月与正月，你在雁门关一面督建防务，一面运起《太玄经》与《段氏纯阳吐纳诀》调理被慕容博参合神指所伤的胸腹，破而后立之下武道境界竟隐隐更上一层楼。'),
      P('“（伤势尽复，真气圆满……该回东京了。）”'),
    ],
    onFinishEffects: [openScene('scene_fn3_29', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_29: {
    id: 'scene_fn3_29',
    title: '第二十九幕 · 河东百姓迎',
    subtitle: '河东 · 太原府官道',
    beats: [
      S(GUARD, '“沿途州县百姓皆焚香设案相送，称呼都帅为‘大宋军神’呢！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_30', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_30: {
    id: 'scene_fn3_30',
    title: '第三十幕 · 春风入汴京',
    subtitle: '中原 · 东京郊外官道',
    beats: [
      N('次年开春，柳色青青，和风煦日。你率领经历血火淬炼的殿前司凯旋之师，缓缓行近东京汴梁十里长亭。'),
      P('“（当年我从真定常山一路走到开封府六扇门、又入大宋禁军……如今大宋南北安澜，也算不负平生之志。）”'),
    ],
    onFinishEffects: [setStep(JINJUN_FINAL_3_ID, 'fn3_kaifeng_triumph')],
  },
  scene_fn3_31: {
    id: 'scene_fn3_31',
    title: '第三十一幕 · 遥见御仗来',
    subtitle: '开封府 · 十里御街外',
    beats: [
      S(GUARD, '“禀都帅！前方十里御街红毯铺地，官家亲率满朝文武出城郊迎了！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_32', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_32: {
    id: 'scene_fn3_32',
    title: '第三十二幕 · 故人齐迎候',
    subtitle: '开封府 · 南薰门外',
    beats: [
      S(WANG, '“哈哈哈！老夫这辈子最得意之事，便是在大教场看中了你这匹千里驹！”'),
      S(BAOZHENG, '“昔日六扇门一别，今朝已成定鼎山河之国柱！老夫敬佩！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_33', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_33: {
    id: 'scene_fn3_33',
    title: '第三十三幕 · 归抵紫宸门',
    subtitle: '开封府 · 皇城门外',
    onFinishEffects: [openScene('scene_fn3_34', JINJUN_FINAL_3_ID)],
    beats: [
      P('“入朝面圣！”'),
    ],
  },
  scene_fn3_34: {
    id: 'scene_fn3_34',
    title: '第三十四幕 · 十里红毯迎',
    subtitle: '开封府 · 东京十里御街',
    illustrationUrl: '/assets/quests/jinjun_fn3_kaifeng_welcome.jpg',
    illustrationCaption: '凯旋东京 · 十里御街红毯铺地，宋仁宗率百官出城十里郊迎',
    beats: [
      N('十里御街红毯铺地，香花漫天飘落。宋仁宗赵祯亲率满朝公卿出城十里郊迎，于万民欢呼震天之中亲自扶起单膝跪拜的你！'),
      S(RENZONG, '“爱卿平西夏、定大辽、保雁门、卫社稷，乃我大宋开国以来不世出之奇功！朕与天下黎民共谢爱卿！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_35', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_35: {
    id: 'scene_fn3_35',
    title: '第三十五幕 · 君臣并马行',
    subtitle: '开封府 · 东京御街',
    beats: [
      P('“陛下隆恩，臣惶恐！此功乃太行、横山、雁门数万忠勇将士浴血所换，臣不敢独居！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_36', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_36: {
    id: 'scene_fn3_36',
    title: '第三十六幕 · 追恤诸忠烈',
    subtitle: '开封府 · 皇城广场',
    beats: [
      S(RENZONG, '“朕已下旨：追封种世衡为太尉，厚恤阵亡将士遗孤三代，永免赋役！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_37', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_37: {
    id: 'scene_fn3_37',
    title: '第三十七幕 · 步入大庆殿',
    subtitle: '开封府 · 大庆殿丹墀',
    beats: [
      N('钟鼓齐鸣，百官肃立大庆殿两侧。你踏着汉白玉御道缓缓登阶，胸前虽曾受尽创伤，此刻却如青松般挺拔如山。'),
      S(HANQI, '“宣制官——宣读加封制书！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_38', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_38: {
    id: 'scene_fn3_38',
    title: '第三十八幕 · 册封太尉位',
    subtitle: '开封府 · 大庆殿',
    illustrationUrl: '/assets/quests/jinjun_fn3_daqing_hall.jpg',
    illustrationCaption: '定鼎山河 · 大庆殿册封检校太尉枢密使，赐丹书铁券、绘像景灵宫',
    beats: [
      N('制书宣罢，天子亲授鎏金枢密使大印与御赐丹书铁券，正式册封你为 **检校太尉 · 枢密使**，并诏令画师为卿绘像供奉景灵宫，与开国元勋并列千秋！'),
      S(RENZONG, '“赐丹书铁券，绘像景灵宫！愿卿永镇我大宋万里江山！”'),
      P('“臣领旨谢恩！！吾皇万岁，大宋万年！！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_39', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_39: {
    id: 'scene_fn3_39',
    title: '第三十九幕 · 绘像景灵宫',
    subtitle: '开封府 · 景灵宫勋臣阁',
    beats: [
      S(WANG, '“哈哈，老夫当年退位让贤之愿，今日总算圆满矣！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_40', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_40: {
    id: 'scene_fn3_40',
    title: '第四十幕 · 四海尽升平',
    subtitle: '开封府 · 东京汴梁',
    beats: [
      P('“（自白沟河畔一名无名枪客起兵，历常山、六扇门、大宋禁军，终至此境……）”'),
    ],
    onFinishEffects: [openScene('scene_fn3_41', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_41: {
    id: 'scene_fn3_41',
    title: '第四十一幕 · 紫宸殿重叙',
    subtitle: '开封府 · 垂拱紫宸正殿',
    beats: [
      S(BAOZHENG, '“大宋四境安宁，百姓得以安居乐业，此乃你我君臣同心之果。”'),
    ],
    onFinishEffects: [openScene('scene_fn3_42', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_42: {
    id: 'scene_fn3_42',
    title: '第四十二幕 · 再巡大教场',
    subtitle: '开封府 · 八十万禁军大教场',
    beats: [
      P('“昔日校场操练之声犹在耳畔，如今三军虎啸龙吟，足以震慑宵小百载！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_43', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_43: {
    id: 'scene_fn3_43',
    title: '第四十三幕 · 枪弩并匣藏',
    subtitle: '开封府 · 枢密使府',
    beats: [
      P('“天波透甲金枪、皇祐神臂御赐弩……皆随我南征北战立下赫赫威名。”'),
    ],
    onFinishEffects: [openScene('scene_fn3_44', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_44: {
    id: 'scene_fn3_44',
    title: '第四十四幕 · 北望念知己',
    subtitle: '开封府 · 枢密使府',
    beats: [
      P('“（不知塞外雪原之上，萧大哥此刻是否也在饮酒纵马？）”'),
    ],
    onFinishEffects: [openScene('scene_fn3_45', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_45: {
    id: 'scene_fn3_45',
    title: '第四十五幕 · 西南茶马通',
    subtitle: '开封府 · 枢密使府',
    beats: [
      S(GUARD, '“禀太尉！大理茶马古道、广西邕州、西北横山皆风调雨顺，边贸兴旺！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_46', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_46: {
    id: 'scene_fn3_46',
    title: '第四十六幕 · 汴河灯火盛',
    subtitle: '开封府 · 汴河虹桥',
    beats: [
      N('夜幕降临，汴河两岸万家灯火辉煌如星海，樊楼丝竹悠扬，市井孩童口中正传唱着“定鼎山河大宋军神”的崭新民谣。'),
      P('“这万家灯火、太平盛世，便是当年在太行山雨夜许下的誓言。”'),
    ],
    onFinishEffects: [openScene('scene_fn3_47', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_47: {
    id: 'scene_fn3_47',
    title: '第四十七幕 · 丹书铁券存',
    subtitle: '开封府 · 枢密使府',
    beats: [
      P('“功名富贵非吾愿，唯愿这万里锦绣河山永绝兵灾。”'),
    ],
    onFinishEffects: [openScene('scene_fn3_48', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_48: {
    id: 'scene_fn3_48',
    title: '第四十八幕 · 江湖犹在望',
    subtitle: '开封府 · 枢密使府',
    beats: [
      P('“庙堂既稳，江湖风云依旧浩瀚，且待有缘再会天下群雄！”'),
    ],
    onFinishEffects: [openScene('scene_fn3_49', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_49: {
    id: 'scene_fn3_49',
    title: '第四十九幕 · 传奇照汗青',
    subtitle: '开封府 · 枢密使府',
    beats: [
      P('“（枪未老，血尚温——且看我大宋千年气象！）”'),
    ],
    onFinishEffects: [openScene('scene_fn3_50', JINJUN_FINAL_3_ID)],
  },
  scene_fn3_50: {
    id: 'scene_fn3_50',
    title: '第五十幕 · 大宋军神传（终）',
    subtitle: '开封府 · 大庆殿',
    beats: [
      N('自白沟河畔一介无名枪客起步，历常山、六扇门、大宋禁军百战死生，终至平岭南、破横山、定雁门，受封检校太尉枢密使，绘像景灵宫。一代定鼎山河的大宋军神传奇，永载青史，万古流芳！'),
      P('“山河既定，四海承平！”'),
    ],
    onFinishEffects: [
      { type: 'giveSilver', amount: 1000 },
      { type: 'addArtExp', amount: 6000 },
      { type: 'addSectContribution', amount: 500 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0001' }, delta: 40 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0110' }, delta: 30 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0013' }, delta: 25 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0038' }, delta: 25 },
      { type: 'modifyRenown', delta: 100 },
      { type: 'modifyChivalry', delta: 50 },
      { type: 'completeQuest', questId: JINJUN_FINAL_3_ID },
    ],
  },
}
