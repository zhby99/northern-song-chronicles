import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q37_QUEST_ID } from './shaolinVajraBodyAwakenQuest'

const SPEAKER_WULIN_HERO: StorySpeakerSpec = {
  kind: 'custom',
  name: '河朔豪客 · 铁枪王五',
  title: '观战群雄',
  factionName: '中原武林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_SHAOLIN_GUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '戒律院武僧 · 慧刚',
  title: '丹墀护法武僧',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
}

export const SHAOLIN_Q37_SCENES: Record<string, StorySceneDef> = {
  scene_slq37_01: {
    id: 'scene_slq37_01',
    title: '第一幕 · 拂晓杀机',
    subtitle: '嵩山少林寺 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}秋，少室山丑闻震荡之后的次日拂晓，晨雾尚未散去，大雄宝殿丹墀前忽传数声震耳欲聋的爆裂巨响与惊怒交加的佛号！'),
      N('你正在演武坪巡视山门防务，闻声骤然变色，极目望去——只见大雄宝殿丹墀之上热浪滚滚，数座千斤铜炉竟被一股无形炽烈刀气劈得焦红开裂！'),
      S(SPEAKER_SHAOLIN_GUARD, '（浑身焦黑，踉跄奔来急呼）“师兄不好了！大轮明王鸠摩智趁玄慈方丈闭门思过之际悍然发难，竟施展出吐蕃密宗绝学『火焰刀』，玄痛师伯与玄寂师伯已挺身上前阻拦！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_02', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_02: {
    id: 'scene_slq37_02',
    title: '第二幕 · 趁乱逼寺',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('你身形电射而出，几个起落便掠至演武坪前端。只见数千尚未离山的江湖群豪再度沸腾围观，而明黄袈裟猎猎飞舞的【鸠摩智】正傲立丹墀正中，双掌虚劈之间，空气仿佛被点燃般发出「嗤嗤」烈焰呼啸！'),
      S('NPC-0113', '（朗声冷笑，声传山谷）“玄慈已自褪袈裟待罪，少林群龙无首！今日小僧便以吐蕃密宗【火焰刀】领教贵寺诸位玄字辈高僧的高招——谁挡我入藏经阁，便休怪刀气无眼！”'),
      S('NPC-0156', '（须发倒竖，双掌泛起黝黑铁芒，怒喝迎上）“狂妄番僧！休想踏入藏经阁半步！接老衲一记铁掌降魔！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_03', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_03: {
    id: 'scene_slq37_03',
    title: '第三幕 · 玄痛重创',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('玄痛师叔身为戒律院铁掌禅师，一流中品刚猛内劲倾力拍出！然而鸠摩智宗师中品修为浑厚无比，右掌凌空一划，一道炽热无形的【火焰刀】罡气竟在三尺之外凭空劈开玄痛掌风，狠狠斩在玄痛左肩！'),
      S('NPC-0156', '（闷哼一声，僧袍瞬间焦燃，口喷鲜血倒飞而出）“呃啊——！好霸道的无形火劲……”'),
      N('玄痛重重跌落汉白玉石阶，肩头焦黑冒烟，一时竟再难起身！'),
    ],
    onFinishEffects: [openScene('scene_slq37_04', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_04: {
    id: 'scene_slq37_04',
    title: '第四幕 · 一拍难敌',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S('NPC-0134', '（见玄痛师弟重伤，大惊失色，连忙飞身扶住并含怒出手）“玄痛师弟！恶僧休得猖狂，吃老衲一记【一拍两散】！”'),
      N('一拍神僧玄寂倾尽毕生功力，一掌挟着雷霆开山之威拍向鸠摩智！鸠摩智神色微凛，双掌合十复又十字交叉猛劈——两道交叉如炽烈火网的火焰刀罡气轰然爆发，竟将玄寂一流上品的至刚掌力震得粉碎！'),
      S('NPC-0134', '（胸口衣衫焦裂，鲜血狂涌，踉跄跌倒在玄痛身旁）“噗——！这番僧内力竟强横至此……”'),
    ],
    onFinishEffects: [openScene('scene_slq37_05', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_05: {
    id: 'scene_slq37_05',
    title: '第五幕 · 毒魔暗算',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('眼见少林两位玄字辈名僧瞬息间连遭火焰刀重创，全场少林弟子悲愤欲绝！偏在此时，一直潜伏在西南角冷眼旁观的星宿老怪【丁春秋】发出阵阵阴森怪笑！'),
      S('NPC-0122', '（轻摇羽扇，反手袖中骤然甩出三团幽绿惨白的腥臭火球，直扑丹墀石阶！）“哈哈哈哈！好一个大轮明王火焰刀！既然少林寺要办白事，老夫岂能不送上一份大礼——请诸位高僧尝尝老夫秘制的【腐尸毒烟】罢！”'),
      N('“轰！轰！轰！”三团毒球在玄痛、玄寂身周炸开，滚滚墨绿恶臭的腐尸毒烟瞬间与鸠摩智残留的火焰刀灼浪交织，化作一片剧毒焚心的炼狱火海，将两位重伤高僧彻底吞没！'),
    ],
    onFinishEffects: [openScene('scene_slq37_06', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_06: {
    id: 'scene_slq37_06',
    title: '第六幕 · 火焰连伤',
    subtitle: '大雄宝殿丹墀 · 火毒危局',
    illustrationUrl: '/assets/quests/sl_37_flame_knife.jpg',
    illustrationCaption: '大雄宝殿丹墀 · 鸠摩智火焰刀无形罡气连伤玄痛、玄寂二僧，少室山群豪震骇失色',
    mandatory: true,
    beats: [
      S(SPEAKER_WULIN_HERO, '（骇然大呼，连退数丈）“快退！那是星宿老怪见血封喉的腐尸毒烟，沾上一丝便要皮开肉绽、五脏溃烂！加上鸠摩智的火焰刀热浪，谁冲进去谁就是死路一条！”'),
      N('外围数十名少林武僧欲冲上丹墀抢救两位师伯，却刚一靠近边缘便被毒烟熏得头晕目眩、口鼻渗血，根本无法立足！'),
    ],
    onFinishEffects: [openScene('scene_slq37_07', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_07: {
    id: 'scene_slq37_07',
    title: '第七幕 · 不退反进',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('眼看着玄痛、玄寂两位师叔在火毒交织的丹墀上气息越来越弱，鸠摩智又再度提聚火焰刀准备补下杀手，你双目骤然赤红如怒目金刚！'),
      P('（一步越众而出，声如炸雷响彻少室山巅）“鸠摩智！丁春秋！你们两个外道邪魔联手暗算我少林重伤长老，真当我少林无人了么？！今日我便踏入这烈火毒雾——谁敢再伤二位师叔一根毫毛，先从我身上踏过去！”'),
      S('NPC-0122', '（冷笑连连）“嘿嘿，又来个不怕死的蠢货！冲进老夫的腐尸毒烟里，正好连你一块化成脓水！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_08', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_08: {
    id: 'scene_slq37_08',
    title: '第八幕 · 孤身赴火',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('你不顾旁人惊呼劝阻，体内多年苦修的至阳护体神功轰然运转，迎着漫天炽热刀气与墨绿腐尸毒烟，义无反顾地纵身跃上大雄正殿丹墀！'),
    ],
    choices: [
      {
        id: 'slq37_accept_quest',
        label: '不退反进，纵身跃入【大雄正殿 · 佛前蒲团】丹墀烈火毒雾救人',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q37_QUEST_ID, stepId: 'fire_and_poison_crucible' },
          setStep(SHAOLIN_Q37_QUEST_ID, 'fire_and_poison_crucible'),
          toast('已开启《烈火金身 · 金刚不坏》！速赴【大雄正殿 · 佛前蒲团】护住玄痛、玄寂！', 'warn', '烈火金身'),
        ],
      },
    ],
  },

  scene_slq37_09: {
    id: 'scene_slq37_09',
    title: '第九幕 · 丹墀炼狱',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('一踏入丹墀正中，灼烧肺腑的炽热火浪与刺鼻蚀骨的墨绿毒雾瞬间如万千钢针般扎向全身毛孔！你一把将昏迷边缘的玄痛、玄寂两位师叔护在身后，自己孤身迎向最猛烈的火毒锋芒！'),
      S('NPC-0156', '（强撑起一丝神智，嘶声急呼）“{gender:师侄|女施主}……快走！这毒烟与火焰刀太毒辣……不要管我们两个老骨头……”'),
      P('（咬紧牙关，双足如铁柱钉死青石，声音嘶哑却如金石交击）“弟子岂能弃师叔于不顾！{ifFlag:sl_branch==layman|既为少林紫衣护法，护寺救师便是我死志所在！|既入少林金刚降魔脉，便当如明王怒目、以身护法！}”'),
    ],
    onFinishEffects: [openScene('scene_slq37_10', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_10: {
    id: 'scene_slq37_10',
    title: '第十幕 · 火毒合围',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('“嗤啦——！”一道无形火焰刀罡气再度呼啸劈来，将你外袍震碎半片；与此同时，丁春秋更挥扇催风，将整片腐尸毒烟尽数压向你周身三尺之内！'),
      S('NPC-0113', '（冷哼道）“螳臂当车！看你能撑得过几息！”'),
      N('刹那之间，外有烈焰焚肤、腐毒蚀骨，内有真气剧烈消耗、经脉几欲撕裂——你已置身于九死一生的真正绝境！'),
    ],
    onFinishEffects: [openScene('scene_slq37_11', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_11: {
    id: 'scene_slq37_11',
    title: '第十一幕 · 毒雾炼心',
    subtitle: '大雄正殿丹墀 · 火毒绝境',
    illustrationUrl: '/assets/quests/sl_37_poison_fog.jpg',
    illustrationCaption: '大雄宝殿丹墀 · 丁春秋腐尸毒烟与鸠摩智火焰刀合围，主角孤身护住重伤二僧于炼狱之中',
    mandatory: true,
    beats: [
      N('生死一发之际，你脑海中却奇异地一片澄明！二十年来诵读不辍的七十五重佛门经义在心间字字生莲——《金刚经》云：「若见诸相非相，即见如来。」火是妄相，毒是妄相，血肉畏惧亦是妄相！'),
      P('（双目圆睁，将体内苦修多年的《少林九阳功》与《盘山铁布衫》真气不顾一切地催至生死极限！）“既然退无可退，便拿尔等的烈火毒烟，作我今日破关铸身的洪炉罢——！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_12', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_12: {
    id: 'scene_slq37_12',
    title: '第十二幕 · 九阳铁布',
    subtitle: '大雄正殿 · 生死极限',
    mandatory: true,
    beats: [
      N('丹田之中，至阳至刚的佛门内息如火山决堤般狂涌而出，疯狂冲刷着早已锤炼如精铁的周身筋骨皮膜！外来的火焰刀灼热之气竟不再是毁灭之力，反而化作了锻铁淬钢的烈火！'),
      N('“咯吱——！咔嚓——！”你周身二百零六块骨骼竟同时发出一连串惊心动魄的脆响，仿佛一尊尘封千年的怒目金刚正在血肉之中苏醒！'),
    ],
    onFinishEffects: [openScene('scene_slq37_13', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_13: {
    id: 'scene_slq37_13',
    title: '第十三幕 · 骨骼雷鸣',
    subtitle: '大雄正殿 · 破关刹那',
    mandatory: true,
    beats: [
      N('“轰隆——！”'),
      N('一声低沉却震动整座大雄宝殿的沉雷巨响，竟凭空自你胸腔与脊椎深处轰然炸开！方圆十丈内的青石地砖齐齐震颤，殿檐铜铃狂鸣不止！'),
      S('NPC-0122', '（脸色陡然大变，羽扇险些脱手）“这……这是什么声音？！毒烟里头怎么会响起雷鸣？！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_14', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_14: {
    id: 'scene_slq37_14',
    title: '第十四幕 · 宝光护体',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('在数千群雄惊骇欲绝的注视下，滚滚墨绿腐尸毒烟之中骤然绽放出一片庄严璀璨的淡金宝光！'),
      N('只见你周身皮膜肌理竟泛起一层如紫金铸就般的古朴淡金光晕，衣衫虽已被火毒烧尽大半，裸露的臂膀肩背却纤毫未损，那些见血封喉的腐尸毒烟一触及这层淡金宝光，便如冰雪遇沸油般「滋滋」化作青烟消散！'),
    ],
    onFinishEffects: [openScene('scene_slq37_15', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_15: {
    id: 'scene_slq37_15',
    title: '第十五幕 · 悟成不坏',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0134', '（挣扎抬首，望着你背影上流转的淡金宝光，老泪纵横、失声惊呼）“金……金身宝光！百毒不侵，水火难伤！这是少林寺数百年来唯有达摩祖师与寥寥数位神僧曾修成的天阶至高护体神功——【金刚不坏体神功】啊！！”'),
      N('千钧一发、九死一生之际，你借丹墀烈火毒雾之洪炉，硬生生打破了宗师壁垒，当场破关悟成少林镇寺天阶神功——【金刚不坏体神功】！'),
    ],
    onFinishEffects: [teachArtNow('MA-018'), openScene('scene_slq37_16', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_16: {
    id: 'scene_slq37_16',
    title: '第十六幕 · 一啸散毒',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（双臂一振，发出一声震彻嵩山云海的金刚狮吼，双掌贯注不坏金身无匹刚劲向外轰然一推）“外道毒烟，给我散——！”'),
      N('“呼——轰！！”一股淡金色狂飙罡风如怒涛席卷丹墀！漫天腐尸毒烟不仅被瞬间震散清空，更有数缕毒雾倒卷直扑星宿派阵营，吓得【丁春秋】尖叫一声连翻三个跟头狼狈遁出十丈之外！'),
      S('NPC-0122', '（脸色惨白如鬼，骇然嘶叫）“金刚不坏体？！这怪物竟在老夫毒烟里练成了少林金刚不坏体？！快撤！星宿弟子快退后！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_17', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_17: {
    id: 'scene_slq37_17',
    title: '第十七幕 · 烈火金身',
    subtitle: '大雄宝殿丹墀 · 金刚不坏现世',
    illustrationUrl: '/assets/quests/sl_37_golden_body.jpg',
    illustrationCaption: '大雄宝殿丹墀 · 烈火毒雾中骨骼雷鸣、周身泛起淡金宝光，破关悟成《金刚不坏体神功》',
    mandatory: true,
    beats: [
      N('毒烟尽散，朝阳洒满丹墀。你护住身后玄痛、玄寂两位长老，周身淡金宝光熠熠生辉，宛如一尊自大雄宝殿走出的镇寺怒目金刚，令全场数千群雄无不屏息折服！'),
    ],
    onFinishEffects: [openScene('scene_slq37_18', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_18: {
    id: 'scene_slq37_18',
    title: '第十八幕 · 剑指明王',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('几名少林药王院武僧趁机冲上丹墀，迅速将玄痛、玄寂两位长老抬入殿内救治。玄痛临行前紧握你手腕，眼中满是震撼与托付：“好孩子……替少林……震慑住这番僧！”'),
      P('（缓缓步下丹墀石阶，每落一步青石皆微微下陷半寸，淡金双眸死死锁定演武坪上的鸠摩智）“丁春秋的毒烟已散。大轮明王，现在轮到你的【火焰刀】了！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_19', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_19: {
    id: 'scene_slq37_19',
    title: '第十九幕 · 步下演武',
    subtitle: '大雄宝殿石阶',
    mandatory: true,
    beats: [
      N('你周身金刚宝光澎湃如潮，大步走向【钟鼓禅院 · 演武坪】，正面迎战不可一世的吐蕃护国法王鸠摩智！'),
    ],
    choices: [
      {
        id: 'slq37_go_crush',
        label: '大步踏下【钟鼓禅院 · 演武坪】，以金刚不坏金身硬撼鸠摩智火焰刀',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q37_QUEST_ID, 'vajra_body_crush'),
          toast('已悟成《金刚不坏体神功》！请踏下【钟鼓禅院 · 演武坪】正面震飞鸠摩智！', 'success', '烈火金身'),
        ],
      },
    ],
  },

  scene_slq37_20: {
    id: 'scene_slq37_20',
    title: '第二十幕 · 明王色变',
    subtitle: '嵩山少林寺 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('演武坪上，一向从容傲慢的【鸠摩智】此刻脸色已凝重到了极点。他盯着你周身流转的淡金宝光，强压心头震骇，双掌骤然合十，周身内力催至前所未有的巅峰！'),
      S('NPC-0113', '（沉声喝道）“好个《金刚不坏体神功》！小僧早就听闻少林护体神功天下无双，今日倒要看看，究竟是你的金刚不坏金身硬，还是小僧的吐蕃密宗【火焰刀】更利！”'),
      P('（屹立坪心，不闪不避，朗声大喝）“少废话！尽管劈来便是！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_21', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_21: {
    id: 'scene_slq37_21',
    title: '第二十一幕 · 硬吃火刀',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('“接刀——！”鸠摩智双掌齐出，三道炽烈无比、肉眼隐约可见灼热波纹的【火焰刀】无形罡气如三条火龙般呼啸斩至，所过之处青石地面瞬间焦黑龟裂！'),
      N('面对这足以瞬间重创玄痛、玄寂的宗师中品绝杀刀气，你竟不退反进、不招不架，催动《金刚不坏体神功》以胸膛正面硬吃三道火焰刀罡气！'),
      N('“当——！当——！当——！”三声宛如重锤敲击万年紫金洪钟的巨响炸彻天地！三道火焰刀罡气劈在你淡金胸膛之上，竟溅起漫天金色火花，被浑厚无比的不坏金身硬生生震得支离破碎！'),
    ],
    onFinishEffects: [openScene('scene_slq37_22', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_22: {
    id: 'scene_slq37_22',
    title: '第二十二幕 · 群豪惊绝',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S(SPEAKER_WULIN_HERO, '（目瞪口呆，手中长枪「咣当」落地）“天……天爷啊！正面硬吃大轮明王三道全力火焰刀，连半步都没退、连皮都没破一层？！这才是真正的少林金刚不坏体啊！”'),
      S('NPC-0113', '（虎口震裂、面露难以置信的惊骇之色）“不可能！我的火焰刀无坚不摧，连金铁皆可熔断，怎会连你的护体金光都劈不开？！”'),
      P('（趁鸠摩智心神剧震、真气反噬的刹那，如怒目金刚般踏步欺身而上）“你劈够了，现在该接我一拳了！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_23', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_23: {
    id: 'scene_slq37_23',
    title: '第二十三幕 · 金刚决战',
    subtitle: '钟鼓禅院 · 演武坪（宗师中品 · 震飞大轮明王）',
    mandatory: true,
    beats: [
      N('鸠摩智惊怒交加，倾尽平生所学，火焰刀与少林七十二绝技齐出疯狂反扑！你身披淡金宝光，以《金刚不坏体神功》力撼吐蕃国师，誓要一战镇压少室群豪！'),
    ],
    choices: [
      {
        id: 'slq37_fight_jiumozhi',
        label: '迎战吐蕃国师【鸠摩智】，硬撼火焰刀撑住五回合！',
        subLabel: '宗师中品试锋：撑住 5 回合正面硬撼火焰刀罡气，蓄势雷霆震飞大轮明王',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q37_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0113',
              talkOverride:
                '“小僧不信世间真有刀火不伤之躯！今日必以火焰刀破你这护体硬功！”',
            },
            rule: 'survive_rounds',
            maxRounds: 5,
            forbidEscapeReason: '大敌当前，岂有在天下数千群雄前退避番僧之理！',
            introText: '【金刚镇世】在吐蕃护国法王【鸠摩智】火焰刀攻势下撑住五回合，借势反震破敌！',
            onWin: [openScene('scene_slq37_24', SHAOLIN_Q37_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 90, mpPct: 90 },
              toast('鸠摩智火焰刀连绵不绝，暂稳气血重整架势后再战！', 'warn', '金刚镇世'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq37_24: {
    id: 'scene_slq37_24',
    title: '第二十四幕 · 雷霆震飞',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('激战十余合，鸠摩智每一道火焰刀劈在你身上皆如石沉大海、反震得他双臂酸麻！你抓准他双掌回撤换气的破绽，周身淡金宝光骤然凝聚于右拳之上，宛如金刚降魔杵轰然捣出！'),
      N('“轰——！！”一声震天巨响！鸠摩智双臂格挡不及，护体真气瞬间崩碎，整个人被这股排山倒海般的金刚雷霆巨力正面轰飞十余丈，重重撞塌演武坪外一堵青石矮墙，烟尘冲天而起！'),
    ],
    onFinishEffects: [openScene('scene_slq37_25', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_25: {
    id: 'scene_slq37_25',
    title: '第二十五幕 · 镇压群豪',
    subtitle: '钟鼓禅院演武坪 · 金刚震飞明王',
    illustrationUrl: '/assets/quests/sl_37_crush_jiumozhi.jpg',
    illustrationCaption: '少室演武坪 · 主角周身淡金宝光正面硬吃火焰刀罡气，一拳雷霆震飞大轮明王鸠摩智',
    mandatory: true,
    beats: [
      N('烟尘缓缓散去。鸠摩智明黄袈裟撕裂、发冠歪斜，在两名吐蕃随从搀扶下勉强爬起，嘴角鲜血直流，望向你的目光中再无半点昔日傲慢，唯余深沉的敬畏与震骇！'),
      S('NPC-0113', '（捂胸喘息，涩声合十）“少林《金刚不坏体神功》……果真名不虚传……小僧火焰刀败得心服口服！告辞！”'),
      N('大轮明王鸠摩智狼狈退走，星宿老怪丁春秋更是早已趁乱溜得无影无踪！你收拳而立，淡金宝光缓缓敛入体肤，环视全场数千群雄——一时之间，漫山豪客竟无一人敢直视你的目光！'),
    ],
    onFinishEffects: [openScene('scene_slq37_26', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_26: {
    id: 'scene_slq37_26',
    title: '第二十六幕 · 山呼海啸',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('静默片刻，演武坪四周骤然爆发出震耳欲聋的赞叹欢呼之声！中原正派群豪齐齐抱拳致敬，少林数百僧俗弟子热泪盈眶、齐声诵念佛号，少林千年泰山北斗的巍峨气势，在这一刻彻底重归嵩山！'),
      S(SPEAKER_WULIN_HERO, '（高举长枪放声大喝）“少林《金刚不坏体神功》重现江湖！有此护寺金刚坐镇嵩山，我看天下还有哪个外道邪魔敢来少室山撒野！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_27', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_27: {
    id: 'scene_slq37_27',
    title: '第二十七幕 · 探视二僧',
    subtitle: '大雄宝殿偏殿 · 药王院救治处',
    mandatory: true,
    beats: [
      N('群豪渐散后，你立刻步入偏殿探望重伤的【玄痛】与【玄寂】两位师叔。经药王院主玄生以大还丹与金创秘药救治，二僧性命已无大碍。'),
      S('NPC-0156', '（靠坐在禅榻上，见你进来激动得几乎要起身行礼）“{gender:师侄|女施主}！今日若非你不顾生死冲入火毒之中护住老衲与玄寂师兄，我二人早已化作丁老怪毒烟下的枯骨了！更难得的是你竟在绝境中悟成《金刚不坏体神功》，一拳震飞鸠摩智——老衲平生从未见过如此痛快淋漓的一战！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_28', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_28: {
    id: 'scene_slq37_28',
    title: '第二十八幕 · 护法真意',
    subtitle: '大雄宝殿偏殿',
    mandatory: true,
    beats: [
      S('NPC-0134', '（合十微笑，眼中满是敬重）“金刚怒目，所以降服四魔；菩萨低眉，所以慈悲六道。今日你在丹墀烈火中舍身护师、以金身镇压群魔，真正体悟了少林金刚护法的无上真意！”'),
      P('（恭敬合十回礼）“二位师叔过誉了。护持师长、捍卫少林，本就是弟子分内之责。请二位师叔安心静养，寺门有弟子守着，绝不容宵小再犯！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_29', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_29: {
    id: 'scene_slq37_29',
    title: '第二十九幕 · 暗流犹存',
    subtitle: '嵩山少林寺 · 演武坪远眺',
    mandatory: true,
    beats: [
      N('走出偏殿，你立于演武坪青石之上，感受着体内如洪钟大吕般奔流不息的《金刚不坏体神功》真气。鸠摩智与丁春秋虽已惨败退去，可潜伏在藏经阁深处的三十年暗影——萧远山与幕后元凶，仍未彻底了结。'),
      P('（双拳轻握，隐有沉雷低鸣，遥望藏经阁飞檐）“金刚不坏之躯已成。无论前方还有何等惊天大劫，我自一肩担之！”'),
    ],
    onFinishEffects: [openScene('scene_slq37_30', SHAOLIN_Q37_QUEST_ID)],
  },

  scene_slq37_30: {
    id: 'scene_slq37_30',
    title: '第三十幕 · 金刚不坏',
    subtitle: '嵩山少林寺 · 威震天下',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_branch==layman|烈火淬铁骨，一战镇群豪！虽依少林清规天阶神功《金刚不坏体神功》唯授出家僧众，然你凭《盘山铁布衫》与《大力金刚指》硬撼火焰刀、力退鸠摩智，俗家护法威名亦随之传遍大江南北！|烈火淬金身，一战镇群豪！少林天阶护体神功《金刚不坏体神功》已彻悟于身，你的威名随之传遍大江南北！}'),
    ],
    choices: [
      {
        id: 'slq37_finish_reward',
        label: '稳固《金刚不坏体神功》境界，威镇少室群豪（完成）',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          { type: 'teachMartialArt', artId: 'MA-018', level: 1 },
          {
            type: 'giveCombatExp',
            amount: 1400,
            reason: '丹墀烈火毒雾中破关悟成《金刚不坏体神功》，正面震飞鸠摩智镇压群豪',
          },
          {
            type: 'modifyRenown',
            delta: 150,
            reason: '少室丹墀以金刚不坏金身硬吃火焰刀震飞大轮明王，威镇群豪',
          },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0156' },
            delta: 20,
          },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0134' },
            delta: 20,
          },
          { type: 'completeQuest', questId: SHAOLIN_Q37_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《烈火金身 · 金刚不坏》！习得天阶神功《金刚不坏体神功》，武学经验 +1400、威望 +150、经义 +1、玄痛/玄寂好感 +20！',
            'success',
            '金刚不坏',
          ),
        ],
      },
      {
        id: 'slq37_finish_reward_layman',
        label: '以《盘山铁布衫》与《大力金刚指》立威丹墀，威镇群豪（完成）',
        subLabel: '俗家弟子依少林清规不授《金刚不坏体神功》，改获额外实战历练',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'eq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'giveCombatExp',
            amount: 1800,
            reason: '丹墀烈火毒雾中凭盘山铁布衫与大力金刚指正面震退鸠摩智',
          },
          {
            type: 'modifyRenown',
            delta: 150,
            reason: '少室丹墀以俗家护法之身硬撼火焰刀震退大轮明王，威镇群豪',
          },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0156' },
            delta: 20,
          },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0134' },
            delta: 20,
          },
          { type: 'completeQuest', questId: SHAOLIN_Q37_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《烈火金身 · 金刚不坏》！（俗家不授《金刚不坏体神功》）武学经验 +1800、威望 +150、经义 +1、玄痛/玄寂好感 +20！',
            'success',
            '丹墀镇魔',
          ),
        ],
      },
    ],
  },
}
