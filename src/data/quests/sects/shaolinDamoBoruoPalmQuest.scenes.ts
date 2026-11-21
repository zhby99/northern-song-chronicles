import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q25_QUEST_ID } from './shaolinDamoBoruoPalmQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq25_01: {
    id: 'scene_slq25_01',
    title: '第一幕 · 寒玉再会',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，幽谷野兰吐芳。你入寺已满十载，继剑痕崖悟得《达摩剑法》后，复受伏魔首座玄难之召，重返达摩院深处的【幽谷石室 · 寒玉榻】。'),
      N('寒玉微光之下，少林神僧玄澄依旧静卧玉榻，双目却比五年前更加澄明安详；玄难首座端坐一旁蒲团，案上摊着一卷泛黄的《般若波罗蜜多心经》古注。'),
      P('（合十行大礼）“弟子拜见玄澄师伯、玄难师伯！不知二位师伯召弟子重返幽谷石室，有何法旨？”'),
    ],
    onFinishEffects: [openScene('scene_slq25_02', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_02: {
    id: 'scene_slq25_02',
    title: '第二幕 · 般若真谛',
    subtitle: '幽谷石室 · 二老论掌',
    mandatory: true,
    beats: [
      S('NPC-0109', '（声音清越如古磬）“阿弥陀佛！师侄昔年守我寒玉榻、力退慕容暗探，又于剑痕崖挑落包、风双刀，十载修行未染一丝骄狂之气，老衲甚慰。今日便与玄难师弟联手，传你少林七十二绝技中最重禅慧的掌法——《般若掌》！”'),
      S('NPC-0127', '“少林拳掌数十门，大金刚拳霸道、龙爪手凌厉，唯有《般若掌》取『色即是空、空即是色』之理，越练越绵厚，越发越无迹！一掌出而含十八重暗劲叠浪，堪称佛门掌道巅峰！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_03', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_03: {
    id: 'scene_slq25_03',
    title: '第三幕 · 化障归空',
    subtitle: '幽谷石室 · 玄澄遗训',
    mandatory: true,
    beats: [
      S('NPC-0109', '（目光深邃望向你）“老衲昔年强练十三门绝技而堕武学障，正是因为只重招式之『色』、不悟般若之『空』。你如今经义逾七十六、书法逾六十，心境已足可驾驭《般若掌》。切记：每一掌递出，须似水中涟漪、风过竹林，既无杀念，则无反噬！”'),
      P('（凝神受教，稽首而答）“色不异空，空不异色！掌力虽厚若山岳，心念却轻若浮云——弟子受教了！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_04', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_04: {
    id: 'scene_slq25_04',
    title: '第四幕 · 掌演空色',
    subtitle: '幽谷石室 · 玄难示范',
    illustrationUrl: '/assets/quests/sl_25_boruo_palm.jpg',
    illustrationCaption: '般若掌意 · 幽谷石室寒雾缭绕，玄难演练《般若掌》叠浪掌势，掌风过处石壁水珠悬空凝而不落',
    mandatory: true,
    beats: [
      N('玄难起身步至石室空地，衣袖轻拂，缓步演练《般若掌》前九式。只见他双掌起落极缓，既无呼啸恶风，亦无炫目威势，然而石壁上渗出的晶莹水珠却被无形掌劲托得悬空颤动、层层叠浪，半晌方悄然滑落！'),
      N('玄澄在寒玉榻上以清朗低语逐句拆解每式经脉流转、吐纳换气之法。一演一讲、相得益彰，令你如醍醐灌顶！'),
    ],
    onFinishEffects: [teachArtNow('MA-043'), openScene('scene_slq25_05', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_05: {
    id: 'scene_slq25_05',
    title: '第五幕 · 叠浪初成',
    subtitle: '幽谷石室 · 试演般若',
    mandatory: true,
    beats: [
      N('你在石室中依诀演练，初时掌劲散乱，练至第三遍时忽将《达摩剑法》的圆融之意融入双掌，掌风登时由刚转柔、由柔生叠，一掌拍出竟隐隐带起三层连绵气浪！'),
      S('NPC-0127', '（喜形于色）“好！才演三遍便悟出叠浪雏形，若再经一场硬仗锤炼，便可将十八掌叠浪尽数贯通！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_06', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_06: {
    id: 'scene_slq25_06',
    title: '第六幕 · 谷外咆哮',
    subtitle: '幽谷石室 · 恶人闯山',
    mandatory: true,
    beats: [
      N('玄难话音方落，幽谷外忽然传来一阵震耳欲聋的粗豪咆哮，惊得满谷山雀齐飞！'),
      S('NPC-0183', '“少林寺的秃驴们都给老子滚出来！听说你们达摩院新出了个打败包不同、风波恶的厉害小和尚？老子南海鳄神岳老三特地从西夏跑来收他当徒弟！快出来给老子磕头！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_07', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_07: {
    id: 'scene_slq25_07',
    title: '第七幕 · 凶神恶煞',
    subtitle: '幽谷石室 · 识破来人',
    mandatory: true,
    beats: [
      S('NPC-0127', '（眉头一皱）“南海鳄神岳老三！西夏一品堂『四大恶人』中排行第三的凶神恶煞！此人武功刚猛暴烈，手使一对百斤精铁鳄嘴剪，性子蛮横浑噩，最爱到处强收根骨奇佳的俊杰做徒弟！”'),
      S('NPC-0109', '（淡然微笑）“阿弥陀佛！善缘恶缘皆是缘。岳老三虽名列恶人，却最重诺言、专好以硬碰硬。师侄正好借他这股蛮牛般的刚猛力道，印证你新学的《般若掌》『以空化实、十八叠浪』！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_08', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_08: {
    id: 'scene_slq25_08',
    title: '第八幕 · 请缨迎恶',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      P('（合十笑道）“二位师伯放心！既有人上门送招给弟子磨砺《般若掌》，弟子岂能闭门不见？这就出谷会一会这位南海鳄神！”'),
    ],
    choices: [
      {
        id: 'slq25_accept_yuelao3',
        label: '步出幽谷石室，开启【空色无相 · 般若波罗】迎战岳老三',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q25_QUEST_ID, stepId: 'repel_yuelao3' },
          setStep(SHAOLIN_Q25_QUEST_ID, 'repel_yuelao3'),
          openScene('scene_slq25_10', SHAOLIN_Q25_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq25_09: {
    id: 'scene_slq25_09',
    title: '第九幕 · 静候谷口',
    subtitle: '达摩院幽谷 · 松坪',
    mandatory: true,
    beats: [
      N('你整肃僧衣步出石室，只见谷外松坪上几名巡山武僧正严阵以待，而一名奇形怪状的铁塔壮汉正扛着一对硕大无朋的乌铁鳄嘴剪大呼小叫！'),
    ],
    onFinishEffects: [openScene('scene_slq25_10', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_10: {
    id: 'scene_slq25_10',
    title: '第十幕 · 强收爱徒',
    subtitle: '达摩院幽谷外坪 · 初见岳老三',
    mandatory: true,
    beats: [
      N('那壮汉脑袋极大、脖颈粗短，身披玄铁护肩，手持一对足有门板宽、布满锯齿的精钢鳄嘴剪，正是西夏四大恶人【凶神恶煞 · 岳老三】！'),
      S('NPC-0183', '（瞪大铜铃般的双眼上下打量你，喜得直拍大腿）“哇哈哈！就是你这小和尚！瞧这脑门圆润、肩宽背厚，天生就是练老子『鳄嘴神功』的好苗子！快跪下叫一声师父，老子带你回南海吃香喝辣去！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_11', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_11: {
    id: 'scene_slq25_11',
    title: '第十一幕 · 舌辩鳄神',
    subtitle: '达摩院幽谷外坪 · 赌约立誓',
    mandatory: true,
    beats: [
      P('（忍俊不禁，合十还礼）“阿弥陀佛！岳施主千里迢迢上少室山收徒，这份热心贫僧领了。只是少林真传岂能另投他门？不如咱们立个赌约：贫僧空手以《般若掌》接你鳄嘴剪，若贫僧败了便任你处置；若施主敌不过贫僧十八掌，便请立刻下山，再不骚扰少林！”'),
      S('NPC-0183', '（把胸脯拍得砰砰作响）“好！老子岳老三最讲信用！你说空手接我鳄嘴剪，可别反悔！等老子把你打服了，你照样乖乖叫师父！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_12', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_12: {
    id: 'scene_slq25_12',
    title: '第十二幕 · 鳄剪横扫',
    subtitle: '达摩院幽谷外坪 · 刚猛初交',
    mandatory: true,
    beats: [
      N('岳老三大吼一声，双手抡起沉重鳄嘴剪呼啸横扫，锯齿铁刃带起一股排山倒海的狂风，所过之处青石松枝尽折！'),
      N('你双足稳如磐石，不闪不避，右手画圆拍出一记《般若掌》「空色无相」——掌缘贴着铁剪侧面斜斜一带，竟将数百斤蛮力顺势卸入空处，震得岳老三险些收势不住！'),
    ],
    onFinishEffects: [openScene('scene_slq25_13', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_13: {
    id: 'scene_slq25_13',
    title: '第十三幕 · 恶人暴怒',
    subtitle: '达摩院幽谷外坪 · 全力以赴',
    mandatory: true,
    beats: [
      S('NPC-0183', '（惊怒交加，怪叫连连）“哎呀妈呀！小和尚你的掌力滑不留手，跟泥鳅似的！看来不使出真本事，你还当老子是吃素的！接我西夏一品堂压箱绝技！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q25_yuelao3_met', value: true },
      openScene('scene_slq25_14', SHAOLIN_Q25_QUEST_ID),
    ],
  },

  scene_slq25_14: {
    id: 'scene_slq25_14',
    title: '第十四幕 · 幽谷激战',
    subtitle: '达摩院幽谷外坪 · 决战岳老三',
    mandatory: true,
    beats: [
      N('南海鳄神岳老三催动西夏秘藏玄功，大剪狂舞如疯魔降世！立刻以《般若掌》迎战这位一流中品凶神恶煞，以空化实、叠浪制敌！'),
    ],
    choices: [
      {
        id: 'slq25_fight_yuelao3',
        label: '施展《般若掌》，迎战四大恶人【凶神恶煞 · 岳老三】（一流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q25_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0183',
              realmCap: '一流下品',
              talkOverride:
                '“老子是南海鳄神岳老三，排行第二——不对，排行老三！小和尚你脑袋圆滚滚的，跟老子太投缘了！快给老子磕八个响头拜师，不然我这把鳄嘴剪可要咔嚓了！”',
            },
            rule: 'story_trial',
            duelStakesTag: 'spar',
            introText: '幽谷松坪大战南海鳄神！岳老三力大无穷、招式暴烈，快以《般若掌》十八掌叠浪震服这位四大恶人！',
            onWin: [openScene('scene_slq25_15', SHAOLIN_Q25_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '岳老三鳄嘴剪势大力沉！调息后可再于【幽谷石室 · 寒玉榻】外坪续战岳老三。',
                'warn',
                '般若波罗',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq25_15: {
    id: 'scene_slq25_15',
    title: '第十五幕 · 十八叠浪',
    subtitle: '达摩院幽谷外坪 · 掌力连环',
    mandatory: true,
    beats: [
      N('你与岳老三在松坪之上激斗愈烈！岳老三越打越心惊——无论他使出多猛烈的劈砍，你的《般若掌》总能在毫厘间以柔化刚，且一掌未歇、一掌又至，掌劲竟如沧海潮汐般一浪高过一浪！'),
      N('第一掌如清风拂面，第六掌如江涛拍岸，第十二掌如惊雷滚地……转眼间你已连环叠出十七重般若暗劲，将岳老三逼得连连后退、无暇喘息！'),
    ],
    onFinishEffects: [openScene('scene_slq25_16', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_16: {
    id: 'scene_slq25_16',
    title: '第十六幕 · 震裂虎口',
    subtitle: '达摩院幽谷外坪 · 逼退鳄神',
    illustrationUrl: '/assets/quests/sl_25_yuelao3_retreat.jpg',
    illustrationCaption: '般若叠浪 · 第十八掌空色无相轰然拍落鳄嘴剪脊，震裂岳老三虎口，逼得南海鳄神连退七步',
    mandatory: true,
    beats: [
      N('第十八掌「般若波罗」圆融拍出！十八重叠浪暗劲瞬间合一，如无形金钟轰然撞在精钢鳄嘴剪之上！'),
      N('“嗡——！”剧烈震荡顺着铁柄狂涌而入！岳老三虎口剧痛崩裂、鲜血直流，百斤鳄嘴剪险些脱手飞出，魁梧身躯竟被这股绵厚无比的佛门掌力震得连退七大步，一屁股坐倒在青石阶上！'),
    ],
    onFinishEffects: [openScene('scene_slq25_17', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_17: {
    id: 'scene_slq25_17',
    title: '第十七幕 · 恶人服软',
    subtitle: '达摩院幽谷外坪 · 愿赌服输',
    mandatory: true,
    beats: [
      S('NPC-0183', '（甩着发麻流血的虎口，瞪圆双眼满脸难以置信）“哎哟喂！疼死老子了！你这小和尚手掌明明软绵绵的，怎的十八掌叠下来比攻城撞木还重？！”'),
      S('NPC-0183', '（爬起身来抓起鳄嘴剪，瓮声瓮气却倒也守信）“罢罢罢！老子岳老三言出必行，打输了就是打输了！这徒弟老子不收了……不过小和尚，你这手《般若掌》真带劲，改日老子练成了再来找你比划！”'),
      N('说罢，南海鳄神一瘸一拐却又步履飞快地扛着大剪下山去了，引得周围观战武僧齐声喝彩！'),
    ],
    onFinishEffects: [openScene('scene_slq25_18', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_18: {
    id: 'scene_slq25_18',
    title: '第十八幕 · 重入石室',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('你收掌平息真气，转身重回幽谷石室。玄难首座满面春风迎了出来，寒玉榻上的玄澄神僧亦露出罕见的畅然笑意。'),
      S('NPC-0127', '“阿弥陀佛！空手以《般若掌》十八叠浪正面震退西夏四大恶人岳老三，不伤性命却扬少林百年禅武威仪！此战之后，江湖之中谁人不知我达摩院新出了一位一流中品真传宗师！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_19', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_19: {
    id: 'scene_slq25_19',
    title: '第十九幕 · 空色无相',
    subtitle: '幽谷石室 · 禅境圆满',
    illustrationUrl: '/assets/quests/sl_25_empty_zen.jpg',
    illustrationCaption: '空色无相 · 幽谷石室静谧澄明，玄澄与玄难合掌为你印证《般若掌》真传圆满',
    mandatory: true,
    beats: [
      S('NPC-0109', '（双手合十，目光澄澈）“师侄，方才你与岳老三一战，掌力虽叠至十八重，却始终气定神闲、未起半分杀意。老衲半生困于武学障，今日见你以般若智慧御绝技，心中最后一丝执念亦彻底化空了。”'),
      P('（深深跪拜于寒玉榻前）“全赖玄澄师伯剖白心迹、玄难师伯倾囊相授，弟子方知武学愈高，愈当以大慈悲、大智慧为根基！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_20', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_20: {
    id: 'scene_slq25_20',
    title: '第二十幕 · 达摩衣钵',
    subtitle: '幽谷石室 · 真传总纲',
    mandatory: true,
    beats: [
      N('玄难郑重将《般若掌》全本秘卷与玄澄亲笔批注的《心经》禅武注疏交付于你。'),
      S('NPC-0127', '“剑有《达摩剑法》，掌有《般若掌》，轻功有《一苇渡江》——自今日起，达摩院真传单脉之绝学，你已尽得精髓！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_21', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_21: {
    id: 'scene_slq25_21',
    title: '第二十一幕 · 扬名中州',
    subtitle: '达摩院 · 幽谷石室',
    mandatory: true,
    beats: [
      N('不出三日，少林达摩院真传弟子空手十八掌逼退南海鳄神岳老三的佳话便传遍洛阳与开封武林，你的江湖声望大振，连朝堂与丐帮亦有耳闻！'),
    ],
    onFinishEffects: [openScene('scene_slq25_22', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_22: {
    id: 'scene_slq25_22',
    title: '第二十二幕 · 般若波罗',
    subtitle: '嵩山少林寺 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('清风徐来，幽谷兰香浮动。十年达摩院苦修终臻圆满，你心怀般若大智、身负剑掌双绝，已准备好迎接江湖与少林更宏大的风云变幻！'),
    ],
    choices: [
      {
        id: 'slq25_complete',
        label: '习得《般若掌》，圆满完成【空色无相 · 般若波罗】',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-043', level: 1 },
          {
            type: 'giveCombatExp',
            amount: 700,
            reason: '得玄难与玄澄合授《般若掌》，十八掌叠浪震裂鳄嘴剪虎口逼退四大恶人岳老三',
          },
          { type: 'addSectContribution', amount: 240 },
          {
            type: 'modifyRenown',
            delta: 60,
            reason: '空手以少林《般若掌》逼退西夏四大恶人凶神恶煞岳老三，名震中州',
          },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'completeQuest', questId: SHAOLIN_Q25_QUEST_ID, outcome: 'completed' },
          toast(
            '【空色无相 · 般若波罗】圆满完成！习得《般若掌》，实战经验 +700、贡献 +240、声望 +60、经义 +2！',
            'success',
            '般若波罗',
          ),
        ],
      },
    ],
  },
}
