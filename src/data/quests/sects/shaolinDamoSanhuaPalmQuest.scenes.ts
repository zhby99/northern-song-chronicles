import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q10_QUEST_ID } from './shaolinDamoSanhuaPalmQuest'

const SPEAKER_BOATMAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '洛水老船夫',
  title: '洛阳渡口艄公',
  factionName: '洛阳百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_ELDER_HOSTAGE: StorySpeakerSpec = {
  kind: 'custom',
  name: '温老英雄',
  title: '洛阳牡丹会受邀名宿',
  factionName: '中原武林',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_POISON_DEMONESS: StorySpeakerSpec = {
  kind: 'custom',
  name: '毒罗刹 · 柳碧烟',
  title: '星宿派妖女',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_female_av.jpg',
}

const SPEAKER_XINGXIU_GUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '腐骨子',
  title: '星宿派护法',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

function buildPoisonDemoness(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ10_POISON_DEMONESS',
    name: '毒罗刹 · 柳碧烟',
    title: '星宿派妖女',
    realm: '二流中品',
    factionName: '星宿派',
    sectRank: 2,
    sectRankLabel: '星宿妖女',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_female_fb.jpg',
    talk: '“小和尚竟能识破奴家的幻毒手段？哼，那就尝尝星宿五毒砂掌的厉害！”',
    stats: { hp: 1460, mp: 920, agi: 53, res: 34 },
    talents: { bone: 70, comprehension: 72, charm: 76 },
    equippedArts: { neigong: 'MA-123', move1: 'MA-127', move2: 'MA-137' },
    learnedArts: [{ artId: 'MA-123', level: 5 }, { artId: 'MA-127', level: 6 }, { artId: 'MA-137', level: 5 }],
  })
}

function buildXingxiuGuard(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ10_XINGXIU_GUARD',
    name: '腐骨子',
    title: '星宿派护法',
    realm: '二流下品',
    factionName: '星宿派',
    sectRank: 2,
    sectRankLabel: '星宿护法',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“柳师姐莫慌，待我以腐毒掌封死这小秃驴的退路，将他推进洛水喂鱼！”',
    stats: { hp: 1120, mp: 680, agi: 45, res: 27 },
    talents: { bone: 64, comprehension: 58, charm: 32 },
    equippedArts: { neigong: 'MA-231', move1: 'MA-127', move2: 'MA-137' },
    learnedArts: [{ artId: 'MA-231', level: 6 }, { artId: 'MA-127', level: 5 }, { artId: 'MA-137', level: 5 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq10_01: {
    id: 'scene_slq10_01',
    title: '第一幕 · 崖畔落英',
    subtitle: '达摩院 · 绝壁石刻剑痕崖',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，嵩山涧畔山桃盛放。一阵暖风掠过剑痕崖，将无数粉白花瓣卷上青石，在石桌棋枰上铺了薄薄一层落英。玄难首座指拈黑子迟迟未落，案头却摊着一封洛阳白马寺火漆飞鸽急笺。'),
      S('NPC-0127', '（抬眸望你，神色凝重）“你来得正好。白马寺老方丈遣信急报：洛阳牡丹盛会才启三日，城中已有数名武林名宿离奇失踪，现场皆残留异香扑鼻的西域毒粉！幕后黑手乃星宿派妖女『毒罗刹 · 柳碧烟』与护法『腐骨子』，二人包下一艘洛水画舫，假借品茗赏花诱骗豪客登舟勒索秘籍！”'),
      S('NPC-0127', '“{ifFlag:sl_q09_hanli_spared|当日剑痕崖上你折剑留命、放韩厉自省，足见慈悲定力；只是星宿毒术最善借红尘声色迷人心窍，单凭正大剑锋反易着道。|当日剑痕崖上你震腕擒服韩厉，手段固然凌厉；然星宿迷毒无孔不入，若一味硬拼猛进，反易将毒烟吸入肺腑。}”'),
      P('（合十肃然）“星宿妖人竟敢在西京洛阳公然设局！弟子愿即刻下山破此毒舫，救出诸位名宿，还请师伯指点克毒破幻之法！”'),
    ],
    onFinishEffects: [openScene('scene_slq10_02', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_02: {
    id: 'scene_slq10_02',
    title: '第二幕 · 禅棋散花',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('玄难忽地起身，宽大僧袖轻轻一拂——满枰山桃花瓣竟如受无形丝线牵引，齐齐腾空飞旋，在棋枰上方织成一道绚烂花环，却无一片沾到玄难衣角！'),
      S('NPC-0127', '“这便是达摩院奇门禅掌——《散花掌》，取『天女散花，着身不染』之佛经意境！你平日善弈围棋，当知『弃子争先、借势围空』之理；此掌步法暗合天元八方，掌风不走直线硬撞，而化柔旋气涡，既隔绝毒粉近身，更能顺风反卷敌毒！”'),
      N('玄难将《散花掌》「飞花逐月」「回风拂柳」「满天花雨」三式心诀倾囊相授。你脚踏棋位以落英为靶演练半日，待以《罗汉伏虎功》柔劲贯注掌缘，漫天落英果真随掌成环，反飘崖外数丈！'),
      S('NPC-0127', '（递过两粒清香沁脾的少林清心解毒丹）“善哉！洛水画舫数十艘，那妖女必常换泊位。你下山后先往洛阳酒肆暗访渡口艄公，查明挂异色牡丹灯的毒舟所在，再择机登舫破幻！”'),
    ],
    choices: [
      {
        id: 'slq10_depart_luoyang',
        label: '拜谢玄难首座，习得《散花掌》下山直奔洛阳酒肆！',
        tone: 'gold',
        effects: [
          teachArtNow('MA-105'),
          { type: 'startQuest', questId: SHAOLIN_Q10_QUEST_ID, stepId: 'luoyang_boat_probe' },
          setStep(SHAOLIN_Q10_QUEST_ID, 'luoyang_boat_probe'),
          toast('已开启《洛水飞花 · 散花破幻》并领悟《散花掌》！请赴【洛阳酒肆】暗访画舫踪迹。', 'talk', '洛水飞花'),
        ],
      },
    ],
  },

  scene_slq10_03: {
    id: 'scene_slq10_03',
    title: '第三幕 · 酒肆风声',
    subtitle: '洛阳府 · 洛阳酒肆',
    mandatory: true,
    beats: [
      N('暮春洛阳花市如潮，灯火将半条洛水映成锦绣长河。你换上一袭素净行脚僧袍，在毗邻渡口的洛阳酒肆临窗独坐，点一壶清茶，凝神倾听满堂酒客与艄公闲谈。'),
      N('不多时，邻桌一名微醺老船夫压低嗓音，与同伴窃语「紫牡丹纱灯」「甜得发腻的异香」「上了船就不见人影」数语。你轻步上前合十请教那艘画舫的泊位。'),
      S(SPEAKER_BOATMAN, '（见是少林僧人，忙压低声音拉住你袖口）“小师父千万别往那艘『瑶华舫』凑！船主自称是位懂茶善弈的江南柳娘子，可每夜亥时便命人把船撑到城西芦苇荡深处，连咱们摇橹的靠近都要犯迷糊。前日温老英雄几位豪客登舟赏牡丹，至今音讯全无！”'),
      P('（合十道谢，目光已遥望向城西夜雾渐浓的芦苇水岸）“阿弥陀佛，多谢老施主指点。亥时将至，小僧这便借舟一探瑶华舫！”'),
    ],
    onFinishEffects: [openScene('scene_slq10_04', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_04: {
    id: 'scene_slq10_04',
    title: '第四幕 · 瑶华识幻',
    subtitle: '洛水瑶华画舫 · 二层雅舱（鉴伪识毒）',
    illustrationUrl: '/assets/quests/sl_10_luoshui_boat.jpg',
    illustrationCaption: '洛水夜舫 · 紫灯雾笼瑶华舟，丝竹靡靡藏幻毒',
    mandatory: true,
    beats: [
      N('亥时月黑风高，你服下一粒清心解毒丹，摇一叶扁舟悄然泊近城西芦苇荡深处的雕梁画舫。船头两盏暗紫牡丹纱灯摇曳生姿，二层雅舱内丝竹靡靡、暖雾蒸腾。'),
      N('你推门佯作化缘行脚僧步入雅舱，只见几名洛阳客商与画舫歌姬已伏案昏昏欲睡，温老英雄斜倚雕花柱旁面色泛青、动弹不得。屏风后款步转出一名紫翠轻纱女子，自称「洛阳雅士柳姑娘」，含笑邀你入座品茗观花。'),
      S(SPEAKER_POISON_DEMONESS, '（掩唇轻笑，语声柔腻如丝）“小师父既来瑶华舫结缘，何必神色紧绷？舱内备有雨前龙井、沉水名香与洛阳牡丹雅扇，皆是风雅清物，小师父不妨先歇歇脚呀。”'),
      N('你暗运禅定屏息凝神，冷眼扫过雅舱陈设：紫纱女子笑意藏针，空气中弥漫着一股极淡的甜腥幻香，若不先点破幻毒真正源头，满船性命顷刻堪忧——案上三物之中，哪一样才是暗藏星宿幻毒的真凶？'),
    ],
    choices: [
      {
        id: 'slq10_probe_tea',
        label: '指向青瓷盏中『碧色澄澈的龙井清茶』——茶汤隐透苦涩异味，必是茶水暗掺迷药',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q10_probe_choice', value: 'tea' },
          openScene('scene_slq10_05', SHAOLIN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'slq10_probe_censer',
        label: '指向铜盘上『青烟袅袅却毫无灰烬飘落的莲花香炉』——燃香无灰必是西域醉仙幻毒',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q10_probe_choice', value: 'censer' },
          { type: 'setFlag', flag: 'sl_q10_illusion_broken', value: true },
          openScene('scene_slq10_05', SHAOLIN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'slq10_probe_fan',
        label: '指向女子腕间『重彩工笔的洛阳牡丹绘扇』——扇动脂粉甜腻，必是扇面浸了百花毒粉',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q10_probe_choice', value: 'fan' },
          openScene('scene_slq10_05', SHAOLIN_Q10_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq10_05: {
    id: 'scene_slq10_05',
    title: '第五幕 · 撕破画皮',
    subtitle: '洛水瑶华画舫 · 二层雅舱',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q10_illusion_broken|你冷声喝破：“寻常沉香燃尽必积白灰，唯有西域星宿『醉仙香』化气成雾、炉壁无灰！你根本不是什么洛阳雅士，而是星宿妖女毒罗刹！”你早一步屏息闭窍，灵台清明丝毫未受侵染！|你话音未落，紫纱女子忽咯咯娇笑，玉手轻拍一旁那尊始终不见灰烬飘落的莲花香炉——炉口骤然喷出一缕浓紫迷雾！“小和尚眼力倒差得远哩，西域醉仙香全藏在这无灰香炉里！”你虽急运禅功逼毒，太阳穴仍微微发沉！}'),
      S(SPEAKER_POISON_DEMONESS, '（美目骤寒，彻底撕下雅士伪装，丹蔻长指泛起惨绿毒光）“既然识破了姑奶奶的身份，也省得再演戏！温老匹夫不肯交出秘籍，今晚你这少林小秃驴便一并留下当试毒药人吧！”'),
      N('雕花舱门「砰」地撞开，瘦骨嶙峋、十指乌黑的星宿护法腐骨子狞笑踏入，堵死舱口退路，身旁数名星宿教徒齐齐掣出毒囊！'),
      S(SPEAKER_ELDER_HOSTAGE, '（咬牙嘶声警示）“小师父小心！她广袖里还藏着『百花迷魂散』，沾皮即麻，船上更有无辜歌姬船客啊！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q10_QUEST_ID, 'luoshui_boat_battle'),
      openScene('scene_slq10_06', SHAOLIN_Q10_QUEST_ID),
    ],
  },

  scene_slq10_06: {
    id: 'scene_slq10_06',
    title: '第六幕 · 画舫破局',
    subtitle: '洛水瑶华画舫（三策破毒）',
    mandatory: true,
    beats: [
      N('毒罗刹广袖翻涌，五彩迷魂毒粉蓄势待发；腐骨子双爪带腥封死舱门，数名昏沉客商与画舫歌姬蜷缩在栏畔瑟瑟发抖。'),
      S(SPEAKER_POISON_DEMONESS, '（娇笑中寒意森然，双袖骤振）“船舱就这么大，看你这小和尚既要护着这些累赘，又怎接我与腐骨师弟的星宿绝毒！”'),
      N('舱内空间逼仄，舟身随夜浪轻轻晃动。电光火石间，你足踏《散花掌》禅棋星位，决意施展何策破此星宿毒局？'),
    ],
    choices: [
      {
        id: 'slq10_tactic_censer',
        label: '【掷茶碗击碎香炉】先碎毒源卷风反噬惊走随从，1v1 直擒毒罗刹！',
        subLabel: '破去醉仙幻毒并逼退腐骨子，单挑毒罗刹（禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需先前识破无灰莲花香炉，或十艺【经义】≥ 65 以禅定定力察觉毒源',
          conditions: [
            { type: 'flag', flag: 'sl_q10_illusion_broken', op: 'truthy' },
            { type: 'skillAtLeast', key: '经义', min: 65 },
          ],
        },
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q10_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPoisonDemoness() },
            rule: 'story_trial',
            forbidEscapeReason: '满船名宿与无辜百姓待救，岂可弃舟而走！',
            introText: '【1v1 破炉降妖】你掷碗击碎莲花香炉、散花掌风惊走腐骨子，直战破功的【毒罗刹 · 柳碧烟】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q10_tactic', value: 'censer' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q10_approach_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q10_approach_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
                ],
              },
              openScene('scene_slq10_07', SHAOLIN_Q10_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('毒罗刹五毒砂掌阴狠刁钻，暂跃回船篷调息再战！', 'warn', '洛水飞花'),
            ],
          },
        ],
      },
      {
        id: 'slq10_tactic_chess',
        label: '【棋局引势反客为主】以禅语稳住船客歌姬、暗布散花退路，1v1 对决毒罗刹！',
        subLabel: '护住无辜百姓并隔断腐骨子合围，单挑毒罗刹（禅心慈悲 +1）',
        tone: 'gold',
        condition: {
          type: 'any',
          hint: '需十艺【棋】≥ 35 或【辩才】≥ 45',
          conditions: [
            { type: 'skillAtLeast', key: '棋', min: 35 },
            { type: 'skillAtLeast', key: '辩才', min: 45 },
          ],
        },
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q10_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPoisonDemoness() },
            rule: 'story_trial',
            forbidEscapeReason: '满船名宿与无辜百姓待救，岂可弃舟而走！',
            introText: '【1v1 棋势护众】你以禅语稳住宾客歌姬、隔断腐骨子退路，独战【毒罗刹 · 柳碧烟】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q10_tactic', value: 'chess' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q10_approach_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q10_approach_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
                ],
              },
              openScene('scene_slq10_07', SHAOLIN_Q10_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('毒罗刹身法诡魅，稳住棋盘步法调息后再战！', 'warn', '洛水飞花'),
            ],
          },
        ],
      },
      {
        id: 'slq10_tactic_direct',
        label: '【掌扫画舫正面降妖】施展《散花掌》反卷漫天毒粉，车轮连破星宿二凶！',
        subLabel: '正面车轮连战腐骨子与毒罗刹（二流下品 + 二流中品，怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q10_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXingxiuGuard() },
            extraOpponents: [{ kind: 'custom', npc: buildPoisonDemoness() }],
            rule: 'story_trial',
            forbidEscapeReason: '船舱内尚有数位中毒名宿待救，绝不可弃舟而走！',
            introText: '【车轮连战 · 洛水破毒】正面迎战星宿护法【腐骨子】与妖女【毒罗刹 · 柳碧烟】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q10_tactic', value: 'direct' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q10_approach_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q10_approach_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq10_07', SHAOLIN_Q10_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('星宿二凶毒掌联手狠辣，暂跃回船篷调息再战！', 'warn', '洛水飞花'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq10_07: {
    id: 'scene_slq10_07',
    title: '第七幕 · 飞花震晕',
    subtitle: '洛水瑶华画舫 · 甲板',
    illustrationUrl: '/assets/quests/sl_10_xingxiu_defeat.jpg',
    illustrationCaption: '散花破幻 · 双掌翻飞反卷毒粉震晕星宿妖女，洛水波平',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q10_tactic=censer|你反手掷出青瓷茶碗，「啪」地击碎莲花香炉，双掌旋出《散花掌》柔涡将残余紫烟尽数反卷舱口！腐骨子与星宿教众猝不及防呛入自家醉仙香，抱头鼠窜跳水逃遁，失了依仗的毒罗刹更被你十余合间一掌透入肩井震晕甲板！|}{ifFlagEq:sl_q10_tactic=chess|你一边清朗诵禅稳住慌乱的船客与歌姬，一边足踏围棋天元八方步护众退至上风船尾，反手合拢舱门截断腐骨子来路！毒罗刹的漫天毒粉悉数被你散花掌涡卷回反噬，终被你穿花双掌点中风池软倒甲板！|}{ifFlagEq:sl_q10_tactic=direct|月映洛水，舟身剧晃。你双掌连环画圆卷回漫天五彩毒粉，激斗间左掌轻拍腐骨子肘弯将其借力撞向毒罗刹，趁二凶错身换气刹那，身形如落英掠过，双掌「天女散花」透入肩井风池，将二人齐齐震晕甲板！|}'),
      S(SPEAKER_XINGXIU_GUARD, '（面色惨白、气息萎靡）“这……这少林散花掌竟能反卷星宿毒烟……栽了……”'),
      N('你不敢耽搁，先以绳索牢牢反绑毒罗刹，又自其怀中搜出贴着「百花清露」封签的碧玉药瓶，快步回舱为温老英雄等五位武林名宿逐一松绑喂药。'),
      S(SPEAKER_ELDER_HOSTAGE, '（脸上青气渐退，挣扎起身老泪纵横抱拳长揖）“若非少林高徒神兵天降、破幻反毒，老朽与几位兄弟今晚非但身败名裂，更要连累各派秘籍落入星宿魔爪！请受老朽一拜！”'),
    ],
    onFinishEffects: [openScene('scene_slq10_08', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_08: {
    id: 'scene_slq10_08',
    title: '第八幕 · 散药济众',
    subtitle: '洛水瑶华画舫 · 黎明前夕（善后抉择）',
    mandatory: true,
    beats: [
      N('五位名宿服过百花清露后已无大碍，然而船舱角落里，十余名受邀赴会的寻常洛阳客商与无辜画舫歌姬吸入了醉仙香残雾，此刻仍面色发青、胸闷咳喘，难以自行离船。'),
      S(SPEAKER_ELDER_HOSTAGE, '（扶栏喘息，面带焦色）“小师父，那瓶百花清露已尽数分完，寻常百姓无内功护体，若不及时清毒恐伤及肺腑；可船尾暗格里还锁着星宿派不少秘毒药匣，若走漏了也是大患！”'),
      N('天色将晓，官船渡卒尚未赶到。面对中毒船客与星宿秘毒暗匣，你决意如何处置？'),
    ],
    choices: [
      {
        id: 'slq10_aftermath_doctor',
        label: '【散银延医】自掏 20 两纹银，立遣快舟延请洛阳名医登舫替全船百姓彻清余毒',
        subLabel: '耗银 20 两 · 声望与侠义大增，禅心慈悲 +2',
        tone: 'jade',
        condition: { type: 'silverAtLeast', min: 20 },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q10_aftermath_done', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q10_aftermath_done', value: true },
              { type: 'setFlag', flag: 'sl_q10_aftermath', value: 'doctor' },
              { type: 'setFlag', flag: 'sl_q10_healed_guests', value: true },
              { type: 'giveSilver', amount: -20, reason: '延请洛阳郎中替瑶华画舫百姓歌姬彻清星宿余毒' },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
              { type: 'modifyRenown', delta: 25, reason: '散银延医济救洛水画舫中毒百姓与歌姬' },
              { type: 'modifyChivalry', delta: 15, reason: '解囊救民不计私财' },
            ],
          },
          openScene('scene_slq10_09', SHAOLIN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'slq10_aftermath_neigong',
        label: '【运功逼毒】当场运转《罗汉伏虎功》以自身内力替船客歌姬逐一逼毒离船',
        subLabel: '不耗银钱 · 亲护众人平安登岸，禅心慈悲 +1',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q10_aftermath_done', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q10_aftermath_done', value: true },
              { type: 'setFlag', flag: 'sl_q10_aftermath', value: 'neigong' },
              { type: 'setFlag', flag: 'sl_q10_healed_guests', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq10_09', SHAOLIN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'slq10_aftermath_seize',
        label: '【封缴秘毒】专心清点封存星宿暗匣秘毒带回达摩院，船客交由温老英雄送官医治',
        subLabel: '彻断星宿毒源后患 · 怒目杀业 +1',
        tone: 'danger',
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q10_aftermath_done', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q10_aftermath_done', value: true },
              { type: 'setFlag', flag: 'sl_q10_aftermath', value: 'seize' },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq10_09', SHAOLIN_Q10_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq10_09: {
    id: 'scene_slq10_09',
    title: '第九幕 · 洛阳佳话',
    subtitle: '洛阳渡口 · 晨光初现',
    mandatory: true,
    beats: [
      N('天色微明时，温老英雄遣人报知洛阳府衙与白马寺，将反绑的星宿妖人押入大牢候审。洛水两岸晨雾渐散，画舫风波一夜传遍牡丹花市！'),
      N('{ifFlagEq:sl_q10_aftermath=doctor|三位洛阳名医应邀火速登船施针煎药，不出半个时辰，满船客商与歌姬尽数转危为安，纷纷在渡口焚香叩谢少林高僧仁义无双！|}{ifFlagEq:sl_q10_aftermath=neigong|你耗费半身真气逐一替船客歌姬推宫过血逼出残毒，虽脸色微白，却亲眼见众人安然踏上渡口青石，温老英雄动容赞叹“真慈悲活佛也”！|}{ifFlagEq:sl_q10_aftermath=seize|你将七只星宿秘毒玉匣严密封存贴上封条，以防残毒流入市井；温老英雄亦已雇车护送昏沉船客赴医馆调治，只是离岸时几名歌姬仍余悸难消。|}'),
      N('你婉拒了洛阳众豪杰的盛情宴请，只在晨光映照的渡口回望一眼平波如镜的洛水，便整肃僧袍启程还山。'),
    ],
    onFinishEffects: [openScene('scene_slq10_10', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_10: {
    id: 'scene_slq10_10',
    title: '第十幕 · 棋枰复命',
    subtitle: '达摩院 · 剑痕崖石枰（棋禅印证）',
    mandatory: true,
    beats: [
      N('回到嵩山达摩院，玄难首座早已接获白马寺飞鸽贺信。石枰上山桃花瓣零落依旧，玄难含笑落下一枚白子，示意你于对面坐定。'),
      S('NPC-0127', '“以禅棋步法破局，以散花柔劲反卷星宿迷毒，更救下温老英雄与满船百姓——此番洛水之行，你已将《散花掌》三十六路精髓印证于实战！”'),
      S('NPC-0127', '（抬眸望你，目光清澈而深邃）“你既见识了红尘丝竹幻象，亦领教了西域妖毒之险。且告诉老衲：《散花掌》『天女散花，着身不染』八字之中，你以为最难守住的是哪一重境界？”'),
    ],
    choices: [
      {
        id: 'slq10_zen_heart',
        label: '“最难守住的是『心不随境转』——身处迷香繁华之中，心定则一切幻相自破”',
        subLabel: '以静破幻，禅心益坚（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q10_zen_answer', value: 'heart' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          openScene('scene_slq10_11', SHAOLIN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'slq10_zen_pattern',
        label: '“最难守住的是『借势不伤人』——反卷妖毒克敌而顾全无辜，方合棋局大势”',
        subLabel: '通观全局，进退有度',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q10_zen_answer', value: 'pattern' },
          openScene('scene_slq10_11', SHAOLIN_Q10_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq10_11: {
    id: 'scene_slq10_11',
    title: '第十一幕 · 散花圆融',
    subtitle: '达摩院 · 剑痕崖',
    mandatory: true,
    beats: [
      S('NPC-0127', '{ifFlagEq:sl_q10_zen_answer=heart|（抚掌轻笑）“心无所染，则万幻皆空！难怪画舫丝竹毒香皆惑不得你分毫。”|}{ifFlagEq:sl_q10_zen_answer=pattern|（颔首赞许）“落子顾全满盘而不贪一隅之杀，正是达摩院棋禅合一的气象！”|}'),
      N('玄难取出珍藏的《散花掌全本法卷》郑重授于你手，又望向大雄宝殿方向轻声道：“闻说西域吐蕃大轮寺近日已有使僧动身东来，欲赴嵩山问禅试艺。你且好生精进经义与辩才，届时少林禅宗气象，正须年轻一辈撑起！”'),
      P('（双手合十接过法卷，只觉掌心禅意流转、棋心愈明）“多谢师伯栽培，弟子定当益加精进，不敢懈怠！”'),
    ],
    choices: [
      {
        id: 'slq10_complete',
        label: '拜谢玄难首座，正式领受《散花掌》全本传承',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-105' },
          { type: 'giveCombatExp', amount: 340, reason: '洛水画舫破幻识毒力挫星宿妖女' },
          { type: 'addSectContribution', amount: 140 },
          { type: 'modifySkill', key: '棋', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q10_illusion_broken', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyChivalry', delta: 20, reason: '夜探洛水画舫破星宿迷毒救下武林名宿' },
          { type: 'completeQuest', questId: SHAOLIN_Q10_QUEST_ID, outcome: 'completed' },
          toast('已完成《洛水飞花 · 散花破幻》，习得《散花掌》！', 'success', '洛水飞花'),
        ],
      },
    ],
  },
}
