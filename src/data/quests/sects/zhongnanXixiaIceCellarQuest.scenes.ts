import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q40_QUEST_ID } from './zhongnanXixiaIceCellarQuest'

const SPEAKER_YIPIN_GUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '一品堂玄甲都统',
  title: '西夏一品堂护堂统领',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_PALACE_EUNUCH: StorySpeakerSpec = {
  kind: 'custom',
  name: '冰窖掌灯老宦',
  title: '西夏皇宫内侍',
  factionName: '西夏皇室',
  portraitUrl: '/assets/characters/templates/tpl_eunuch_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_eunuch_male_av.jpg',
}

const TITLE_EXPR =
  '{ifQuestDone:QST-SECT-11-36|终南重阳掌教|}{ifQuestDone:QST-SECT-11-37|古墓寒玉传人|}{ifQuestDone:QST-SECT-11-38|终南太乙共主|}{ifQuestDone:QST-SECT-11-39|太乙隐逸剑尊|}'

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn40_01: {
    id: 'scene_zn40_01',
    title: '第一幕 · 秦岭霜报',
    subtitle: '终南山隐宗 · 重阳玄门清修主殿',
    illustrationUrl: '/assets/quests/zn_q40_autumn_dispatch.jpg',
    illustrationCaption: '秋风卷叶入重阳大殿，西夏密探玄铁令牌陈于案前',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，秦岭千峰染霜。重阳玄门清修主殿内松烟袅袅，三枚刻着党项狼首纹的乌黑令牌并排陈列在青石香案之上，犹带着塞外风沙与寒毒余息。'),
      S(
        'NPC-1057',
        `（王处阳拂尘轻扫案上令牌，眉峰深锁）“${TITLE_EXPR}，近三个月来，这已是巡山弟子在太白古道、子午谷口截获的第三批西夏一品堂暗桩。他们既不劫掠商旅，也不伤人命，只一味绘测我终南山脉地势与古墓水道。”`,
      ),
      S(
        'NPC-0173',
        '（冷清秋指尖轻拈令牌边缘一缕幽蓝冰霜，声如寒泉）“令牌上残留着极纯的西夏寒阴内劲，寻常一品堂番将绝无这等修为。此番窥伺秦岭，幕后必有大人物坐镇兴庆府。”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn40_02', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_02: {
    id: 'scene_zn40_02',
    title: '第二幕 · 卧榻之侧',
    subtitle: '终南山隐宗 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S(
        'NPC-1059',
        '（孙清静缓步入殿，将一卷密函奉上）“长安西市暗线刚刚递回消息：西夏一品堂总堂近来由铁鹞大将军赫连霸先亲自督办关中事务，扬言要在冬雪封山前『踏破终南石室，尽收道藏玉女秘卷』。”',
      ),
      P(
        '（负手立于殿前石阶，遥望西北秦川苍茫云海）“终南一脉素来清静自守，不争朝堂浮名，却也绝非任人宰割的软弱之辈。昔日强敌数度叩山，皆止步于秦岭松风之外；今日若坐视一品堂步步紧逼，来日必酿滔天大祸。”',
      ),
      S('NPC-1057', '“莫非{gender:掌门师兄|掌门师姐}之意，是不再被动守山，而要主动出击？”'),
    ],
    onFinishEffects: [openScene('scene_zn40_03', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_03: {
    id: 'scene_zn40_03',
    title: '第三幕 · 孤剑西征',
    subtitle: '终南山隐宗 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      P(
        '“不错。兴兵动众非江湖之义，亦易牵连边关百姓；我只需孤身一剑，西出陇右、直抵贺兰山下兴庆府。斩其嚣焰、折其帅旗，叫西夏一品堂从此记牢秦岭不可轻犯！”',
      ),
      S(
        'NPC-0173',
        '（眸中微光一闪，颔首道）“兴庆府皇城深处，传闻西夏皇太妃乃是昔年逍遥派旷世奇才李秋水，隐居寒玉冰窖数十年。你此行若破一品堂，她未必不会亲自现身。”',
      ),
      P('“若能会一会逍遥派前辈大宗师，正好印证我终南武道极境。山门诸务，便暂托三位师长照拂！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_04', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_04: {
    id: 'scene_zn40_04',
    title: '第四幕 · 赠丹饯行',
    subtitle: '终南山隐宗 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('王处阳与孙清静对视一眼，知你心意已决，不再劝阻，双双躬身奉上一瓶终南紫金丹院秘炼的清心辟毒灵药与一柄刻有太乙云纹的青玉剑符。'),
      S('NPC-1059', '“塞外苦寒，西夏人尤善用悲酥清风与玄冰奇毒。此去万里风沙，愿{gender:少侠|女侠}剑锋所指，霜雪尽开！”'),
      P('（接过丹药剑符，长揖拜别）“诸位珍重，待贺兰冰雪融时，我便携太平归山！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_05', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_05: {
    id: 'scene_zn40_05',
    title: '第五幕 · 西出秦川',
    subtitle: '关中官道 · 暮色长亭',
    mandatory: true,
    beats: [
      N('三日后，你白衣负剑离开终南，经长安、过泾原，沿着汉唐旧道一路西北而行。关中沃野渐变为黄土高原，秋风越来越烈，吹得衣袂猎猎作响。'),
      N('行至秦州边城外，官道两侧烽燧连绵，大宋戍边将士披甲执锐遥望西北大漠。你遥向边军抱拳致意，身形化作一道淡青流影掠过沙碛。'),
      P('（心中暗忖）“边军守土浴血，江湖人亦当以手中三尺青锋为中土分忧。此去兴庆府，必教西夏一品堂知所敬畏。”'),
    ],
    onFinishEffects: [openScene('scene_zn40_06', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_06: {
    id: 'scene_zn40_06',
    title: '第六幕 · 大漠孤烟',
    subtitle: '河西沙道 · 贺兰山麓',
    illustrationUrl: '/assets/quests/zn_q40_desert_march.jpg',
    illustrationCaption: '长河落日之下，白衣剑客踏沙孤行，遥指贺兰山阙',
    mandatory: true,
    beats: [
      N('又行七日，黄河九曲如金带横贯大漠，巍峨的贺兰山如一道墨青铁壁矗立天际。大漠孤烟直，长河落日圆，兴庆府高耸的夯土城墙与佛塔金顶已隐约可见。'),
      N('你一路餐风露宿，却将终南内息运转得愈发圆融澄澈，沙砾触及周身三尺便悄然滑落，连一粒尘埃都沾不上白衣下摆。'),
      P('“贺兰山已在眼前。西夏一品堂总堂，便在兴庆府城西绿琉璃瓦殿之中。”'),
    ],
    onFinishEffects: [openScene('scene_zn40_07', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_07: {
    id: 'scene_zn40_07',
    title: '第七幕 · 暗探兴庆',
    subtitle: '兴庆府外 · 驼铃古道',
    mandatory: true,
    beats: [
      N('入夜前，你悄然混入兴庆府西门商队。城中党项武士佩刀巡街，西夏文匾额与汉文酒旗交错林立，唯独城西一品堂总堂外三里之内戒备森严，飞檐高悬狼首玄旗。'),
      N('你掠上高楼瓦脊远远望去，见一品堂绿琉璃聚贤殿灯火通明，殿门上方悬着一块丈余宽的鎏金乌木巨匾，以党项、汉文双书「西夏一品堂」五个狂傲大字。'),
      P('“既来问罪，何必藏头露尾？明日正午，便堂堂正正登门拜会赫连霸先！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_08', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_08: {
    id: 'scene_zn40_08',
    title: '第八幕 · 整剑待战',
    subtitle: '兴庆府 · 客栈静室',
    mandatory: true,
    beats: [
      N('是夜，你在兴庆府客栈静室盘膝调息，将终南玄门心法与剑意温养至巅峰，长剑横膝，嗡嗡作响如龙吟在匣。'),
      P('“明日踏入一品堂绿琉璃聚贤殿，先破赫连霸先，再探幕后冰窖！”'),
    ],
    choices: [
      {
        id: 'zn40_start_march',
        label: '整衣佩剑，前往兴庆府【西夏一品堂总堂 · 聚贤殿】问罪赫连霸先',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q40_QUEST_ID, stepId: 'march_to_yipin' },
          setStep(ZHONGNAN_Q40_QUEST_ID, 'march_to_yipin'),
          toast(
            '已启程西征贺兰！请前往【兴庆府 · 西夏一品堂总堂 · 一品堂绿琉璃聚贤殿（xq_yp_hall）】问罪赫连霸先。',
            'talk',
            '贺兰破冰',
          ),
        ],
      },
    ],
  },

  scene_zn40_09: {
    id: 'scene_zn40_09',
    title: '第九幕 · 孤剑登堂',
    subtitle: '兴庆府 · 一品堂绿琉璃聚贤殿',
    illustrationUrl: '/assets/quests/zn_q40_yipin_gate.jpg',
    illustrationCaption: '正午烈日下白衣剑客只身立于一品堂绿琉璃阶前，气贯长虹',
    mandatory: true,
    beats: [
      N('次日正午，日光灼灼。你一袭素白长衫，负剑缓步踏上一品堂绿琉璃聚贤殿前的三十六级白石长阶。守门铁甲卫士见你来者不善，齐刷刷挺起长戟喝止。'),
      S(SPEAKER_YIPIN_GUARD, '“站住！此乃西夏一品堂重地，何方南朝狂徒竟敢持剑擅闯！”'),
      P('（朗声长啸，清越剑气震得阶前铜狮嗡鸣）“终南隐宗{gender:弟子|传人}特来拜会铁鹞大将军赫连霸先！尔等屡遣暗探窥伺秦岭，今日特来归还三枚狼首令牌！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_10', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_10: {
    id: 'scene_zn40_10',
    title: '第十幕 · 掷牌震殿',
    subtitle: '兴庆府 · 一品堂绿琉璃聚贤殿',
    mandatory: true,
    beats: [
      N('你袖袍轻拂，三枚乌黑狼首令牌化作三道黑芒激射入殿，笃笃笃三声深钉在聚贤殿朱漆蟠龙大柱之上，入木三分，尾端震颤不绝！'),
      N('殿内数十名一品堂客卿骇然变色，纷纷按剑起身。朱漆大门轰然洞开，一名身披玄铁重甲、虎背熊腰的威猛大将大步跨出，正是西夏铁鹞大将军赫连霸先！'),
      S('NPC-0130', '（目光如电扫过柱上令牌，旋即仰天狂笑）“哈哈哈哈！好一个不知死活的终南剑客！竟敢单枪匹马闯到本将军的兴庆府总坛撒野！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_11', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_11: {
    id: 'scene_zn40_11',
    title: '第十一幕 · 殿前舌锋',
    subtitle: '兴庆府 · 一品堂绿琉璃聚贤殿',
    mandatory: true,
    beats: [
      S(
        'NPC-0130',
        '（傲然抱臂，声如洪钟）“终南山藏着重阳道藏与古墓秘学，天下谁人不知？我西夏一品堂广纳四海奇功，遣人去秦岭瞧瞧地形，那是抬举你们终南隐宗！”',
      ),
      P(
        '（神色冷冽，长剑徐徐出鞘三寸，寒芒照彻石阶）“好一个『抬举』！赫连将军既自诩西夏雄主鹰犬，可敢在自家总堂阶前，接我终南一剑？若将军败了，请自摘此堂牌匾，永绝窥伺秦岭之念！”',
      ),
      S('NPC-0130', '（勃然大怒，反手掣出重逾百斤的镔铁狼牙槊）“狂妄南蛮！今日便叫你血溅绿琉璃阶，拿你头颅去祭我一品堂狼旗！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_12', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_12: {
    id: 'scene_zn40_12',
    title: '第十二幕 · 铁鹞压城',
    subtitle: '兴庆府 · 一品堂绿琉璃聚贤殿',
    mandatory: true,
    beats: [
      N('赫连霸先身为西夏宗师级悍将，纵横河西十余载，镔铁长槊一抖便卷起狂沙飓风，霸道刚猛的塞外铁骑煞气铺天盖地压来！'),
      S('NPC-0130', '“左右退开！本将军亲手毙了这狂徒，免得中原武林说我西夏以多欺少！”'),
      P('（深吸一口长气，体内终南玄功运转如潮）“正合我意！赫连将军，请赐教！”'),
    ],
    choices: [
      {
        id: 'zn40_fight_helian',
        label: '拔剑迎击西夏铁鹞大将军【赫连霸先】！（1v1 宗师决战）',
        subLabel: '对手：赫连霸先（宗师下品）· 战前气血内力全满',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q40_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0130' },
            rule: 'story_trial',
            forbidEscapeReason: '孤剑踏破一品堂，岂可半途而退！',
            introText: '【贺兰破冰 · 殿前问罪】于一品堂绿琉璃聚贤殿前，迎战铁鹞大将军【赫连霸先】！',
            onWin: [openScene('scene_zn40_13', ZHONGNAN_Q40_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '赫连霸先铁鹞槊法沉猛无比，暂且退回阶前调息，整备后再赴聚贤殿决战！',
                'warn',
                '贺兰破冰',
              ),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '与赫连霸先激斗难分轩轾！请整备内息后再战，务须彻底击溃其锋芒！',
                'warn',
                '贺兰破冰',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_zn40_13: {
    id: 'scene_zn40_13',
    title: '第十三幕 · 剑折铁槊',
    subtitle: '兴庆府 · 一品堂绿琉璃聚贤殿',
    mandatory: true,
    beats: [
      N('金铁交鸣声震彻兴庆府半城！激斗数十合后，你瞧准赫连霸先回槊换气的一瞬破绽，身随剑走如惊鸿掠影，剑脊连点其腕脉三处大穴！'),
      N('喀嚓一声脆响，重逾百斤的镔铁狼牙槊脱手飞出，深深插进丈外青石地砖。赫连霸先连退七步，虎口崩裂，单膝重重跪倒在绿琉璃石阶之上，满脸骇然！'),
      S('NPC-0130', '（捂着震麻的右臂，声音发颤）“这……这是什么剑法？！刚柔并济、生生不息，竟连本将军的铁鹞罡气都挡不住三剑？！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_14', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_14: {
    id: 'scene_zn40_14',
    title: '第十四幕 · 劈碎总匾',
    subtitle: '兴庆府 · 一品堂绿琉璃聚贤殿',
    illustrationUrl: '/assets/quests/zn_q40_shatter_plaque.jpg',
    illustrationCaption: '一道璀璨青虹冲天而起，西夏一品堂鎏金巨匾应声中分坠落',
    mandatory: true,
    beats: [
      N('你收剑归鞘前半步，忽地反腕向天挥出一道凝练至极的青色剑罡！剑气破空如练，直斩殿门上方高悬十余载的鎏金乌木巨匾！'),
      N('轰隆一声巨响，「西夏一品堂」五字巨匾应声一分为二，木屑纷飞如雨，重重砸落在大殿青石庭院之中，惊得满堂党项好手噤若寒蝉、无一人敢前进一步！'),
      P('（负手立于断匾之前，声震四野）“今日我不取你性命，只劈此匾为戒！记着：终南秦岭，非西夏一品堂可窥之地！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_15', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_15: {
    id: 'scene_zn40_15',
    title: '第十五幕 · 寒风传谕',
    subtitle: '兴庆府 · 一品堂绿琉璃聚贤殿',
    mandatory: true,
    beats: [
      N('就在一品堂群豪面如死灰之际，庭院上空忽然飘下一片晶莹剔透的六角冰花——明明是秋高气爽的正午烈日，空气却在刹那间冷彻骨髓！'),
      N('一道轻柔却透着无上威压的女子笑声，仿佛自九天云外飘来，又仿佛贴着众人耳畔响起，震得赫连霸先等人齐齐俯首跪拜。'),
      S(
        'NPC-0103',
        '（千里传音，幽幽如玉磬相击）“咯咯咯……好俊的终南剑气，好狂的中原小辈！劈了哀家手下一品堂的牌匾，便想这般扬长而去么？”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn40_16', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_16: {
    id: 'scene_zn40_16',
    title: '第十六幕 · 冰花邀帖',
    subtitle: '兴庆府 · 一品堂绿琉璃聚贤殿',
    mandatory: true,
    beats: [
      N('那片六角冰花悠悠飘落你掌心，竟在温热掌纹间凝而不化，内里隐约透出一枚精巧的西夏皇室凤纹冰印。'),
      S(
        'NPC-0103',
        '（传音再起，带着几分兴味与冷傲）“秦岭石室里的寒玉床与玄门秘卷，本就是哀家托赫连将军去借来一观的。你既有胆孤身来兴庆府，今夜子时，可敢独闯皇宫寒玉冰窖，当面同哀家论个高下？”',
      ),
      S('NPC-0130', '（低头咬牙，神色敬畏）“太妃娘娘亲邀……南朝剑客，你若不敢去，趁早滚出兴庆府！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_17', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_17: {
    id: 'scene_zn40_17',
    title: '第十七幕 · 慨然赴约',
    subtitle: '兴庆府 · 一品堂绿琉璃聚贤殿',
    mandatory: true,
    beats: [
      P(
        '（指尖真气微吐，将掌心冰花化作一缕清雾消散于秋风之中，朗声回应）“既然幕后正主是逍遥派前辈李太妃，晚辈岂有失约之理？今夜子时，寒玉冰窖，晚辈准时赴会！”',
      ),
      N('空中再无回音，唯余一缕淡淡冷香散尽。你扫视满院慑服的一品堂武士，从容转身步下白石长阶，竟无一人敢出言拦阻。'),
    ],
    onFinishEffects: [openScene('scene_zn40_18', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_18: {
    id: 'scene_zn40_18',
    title: '第十八幕 · 暮色调息',
    subtitle: '兴庆府 · 城西古塔',
    mandatory: true,
    beats: [
      N('午后至黄昏，你登临兴庆府外一座荒废古塔顶层，趁着夕阳余晖静坐调息，将适才与赫连霸先激斗所耗真气尽数补圆，更将浑身精气神凝炼到古井无波之境。'),
      P(
        '（心中暗思）“李秋水乃是逍遥派大宗师，小无相功与白虹掌力出神入化，功力深不可测。今夜冰窖一战，绝非寻常切磋，我须以终南玄门至柔至纯之境守中抱一，方能立于不败！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn40_19', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_19: {
    id: 'scene_zn40_19',
    title: '第十九幕 · 夜潜皇城',
    subtitle: '兴庆府 · 皇宫宫墙外',
    mandatory: true,
    beats: [
      N('子时将近，塞外夜空星斗如银，兴庆府皇宫重檐在月色下森严如铁。你施展终南上乘轻功，衣袂不惊一草一木，如青烟般掠过三道高墙与禁卫箭楼。'),
      N('行至后宫西北隅一座冷寂的汉白玉石亭前，一名提着琉璃寒灯的枯瘦老宦早已静候石阶之下，显然是奉了太妃之命特来引路。'),
      S(SPEAKER_PALACE_EUNUCH, '（躬身垂首，声音嘶哑低沉）“太妃娘娘已在寒玉冰窖候驾多时，请终南贵客随老奴入内。”'),
    ],
    onFinishEffects: [openScene('scene_zn40_20', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_20: {
    id: 'scene_zn40_20',
    title: '第二十幕 · 寒阶深处',
    subtitle: '兴庆府 · 皇宫寒玉冰窖入口',
    mandatory: true,
    beats: [
      N('老宦拨动石亭铜鹤机关，一道幽深阶梯缓缓裂开，刺骨寒气呼啸涌出，将檐下灯笼瞬间覆上一层白霜。'),
      P('“前辈盛情相邀，晚辈这便入窖问尊！”'),
    ],
    choices: [
      {
        id: 'zn40_go_ice_cellar',
        label: '拾级而下，前往【西夏皇宫寒玉冰窖】直面大宗师李秋水',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          setStep(ZHONGNAN_Q40_QUEST_ID, 'enter_ice_cellar'),
          toast(
            '寒玉冰窖已启！请前往【兴庆府 · 西夏皇宫寒玉冰窖（xq_icecellar_main）】迎战西夏皇太妃李秋水。',
            'talk',
            '寒窖问尊',
          ),
        ],
      },
    ],
  },

  scene_zn40_21: {
    id: 'scene_zn40_21',
    title: '第二十一幕 · 冰宫玉阙',
    subtitle: '兴庆府 · 西夏皇宫寒玉冰窖',
    illustrationUrl: '/assets/quests/zn_q40_ice_cellar_hall.jpg',
    illustrationCaption: '百丈玄冰铸就地底玉宫，白纱太妃端坐冰莲御座之上',
    mandatory: true,
    beats: [
      N('沿着冰阶下行十余丈，眼前豁然开朗——竟是一座方圆数十丈的地下冰宫！穹顶倒悬千百根晶莹冰棱，四周八根合抱粗的万年寒玉冰柱撑起穹宇，映照着幽蓝冷光，美得令人窒息。'),
      N('正中冰莲玉座之上，斜倚着一位身披月白轻纱、面覆薄绢的女子。虽已年逾花甲，身段却如二八佳人般曼妙轻盈，双眸流盼之间威仪天成，正是西夏皇太妃李秋水！'),
      S(
        'NPC-0103',
        '（轻摇白玉折扇，目光在你身上流转片刻，微微颔首）“不错，年纪轻轻便有这般澄澈道韵，倒真不负终南隐宗千年清誉。你方才在聚贤殿劈碎一品堂牌匾的那一剑，哀家在冰窖里都听见余响了。”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn40_22', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_22: {
    id: 'scene_zn40_22',
    title: '第二十二幕 · 逍遥渊源',
    subtitle: '兴庆府 · 西夏皇宫寒玉冰窖',
    mandatory: true,
    beats: [
      P(
        '（拱手行晚辈礼，不卑不亢）“晚辈见过李前辈。终南与逍遥两脉本皆出先秦道家隐逸一系，素无宿怨。不知前辈为何屡遣一品堂暗桩潜入秦岭，惊扰我山门清修？”',
      ),
      S(
        'NPC-0103',
        '（轻笑一声，声音忽转幽冷）“咯咯，无他。听闻终南活死人墓里有一张昆仑万年寒玉床，又有重阳道藏九阴玄机。哀家久居贺兰，正缺一门能克制天山那老贱人八荒六合神功的至阴至柔奇学，借来参详几年，又有何不可？”',
      ),
      P(
        '“前辈与天山缥缈峰的恩怨，终南不愿置喙。然我终南祖师遗泽，乃中土道脉所系，岂能任由西夏铁骑与一品堂强索？若前辈以礼来访，终南自当烹茶论道；若以兵戈相逼，晚辈虽不才，亦唯有以剑相迎！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn40_23', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_23: {
    id: 'scene_zn40_23',
    title: '第二十三幕 · 白虹试锋',
    subtitle: '兴庆府 · 西夏皇宫寒玉冰窖',
    mandatory: true,
    beats: [
      S(
        'NPC-0103',
        '（眸中寒芒大盛，自冰座飘然而起，足不点地）“好硬的骨头！哀家倒要看看，你这终南新晋宗师，接不接得住逍遥派的白虹掌力！若能在哀家手下撑过五合而不败，哀家便听你一言！”',
      ),
      N('话音未落，冰窖之内狂风骤起！李秋水纤手轻扬，一道曲折莫测、似直实弯的雪白掌劲破空袭来，正是天下罕有的绝学「白虹掌力」！'),
      P('（长剑清吟出鞘，周身玄气凝成太极护幕）“前辈请赐教！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_24', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_24: {
    id: 'scene_zn40_24',
    title: '第二十四幕 · 寒窖问尊',
    subtitle: '兴庆府 · 西夏皇宫寒玉冰窖',
    mandatory: true,
    beats: [
      N('大宗师威压如沧海横流，整座寒玉冰窖仿佛随时要崩塌！你心如止水，将终南一生所学融于剑锋与内息之中，正面迎向这位纵横江湖数十载的逍遥派大宗师！'),
    ],
    choices: [
      {
        id: 'zn40_fight_liqiushui',
        label: '凝神运剑，于寒玉冰窖硬撼大宗师【李秋水】！（撑满五合或击败即胜）',
        subLabel: '对手：西夏皇太妃李秋水（大宗师下品）· 战前气血内力全满',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q40_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0103' },
            rule: 'survive_rounds',
            maxRounds: 5,
            forbidEscapeReason: '寒玉冰窖四门已闭，唯以绝世武意破局方能令大宗师折服！',
            introText: '【寒窖问尊】于万年玄冰之间硬撼逍遥派大宗师【李秋水】，撑满五合或击退其锋芒！',
            onWin: [openScene('scene_zn40_25', ZHONGNAN_Q40_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '李秋水小无相功与白虹掌力深不可测！你借冰柱卸劲暂退调息，养足元气后再入冰窖问尊！',
                'warn',
                '寒窖问尊',
              ),
            ],
            onDraw: [openScene('scene_zn40_25', ZHONGNAN_Q40_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_zn40_25: {
    id: 'scene_zn40_25',
    title: '第二十五幕 · 曲直相生',
    subtitle: '兴庆府 · 西夏皇宫寒玉冰窖',
    illustrationUrl: '/assets/quests/zn_q40_ice_duel.jpg',
    illustrationCaption: '白虹掌劲折转如蛇，青锋剑气化圆破极，玄冰碎屑漫天飞舞',
    mandatory: true,
    beats: [
      N('冰宫之中白光与青芒交织如电！李秋水连发数道白虹掌力，掌劲明明击向你左肩，临近三尺却诡异折转直取右肋；更夹杂小无相功催动的寒冰指风，寒意直透肺腑！'),
      N('你却丝毫不乱，双足踏定天罡北斗方位，长剑画圆如流云回雪，借势化劲、以柔克刚，竟将这位大宗师十成十的凌厉掌风一一引偏卸入四周冰壁！'),
      S('NPC-0103', '（轻咦一声，玉容微变）“好高明的道家化劲！小无相功无形无相，你竟能以剑意预判哀家掌力折转的毫厘之机！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_26', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_26: {
    id: 'scene_zn40_26',
    title: '第二十六幕 · 冰柱镇宫',
    subtitle: '兴庆府 · 西夏皇宫寒玉冰窖',
    mandatory: true,
    beats: [
      N('数合激战下来，李秋水见久攻不下，好胜之心顿起！她白袖翻飞，双掌合推，竟引动冰窖中央八根万年寒玉冰柱的极寒地气，化作漫天冰刃风暴向你席卷而来！'),
      S('NPC-0103', '“哀家这座寒玉冰窖，聚贺兰百年阴煞！小辈，接哀家这最后一式『沧海冰心』！”'),
      P('（眸中精光暴涨，不退反进，身剑合一化作一道贯日长虹）“冰虽极寒，遇阳则融；掌虽无相，见道则破——前辈，请看终南一剑！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_27', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_27: {
    id: 'scene_zn40_27',
    title: '第二十七幕 · 剑劈玄冰',
    subtitle: '兴庆府 · 西夏皇宫寒玉冰窖',
    illustrationUrl: '/assets/quests/zn_q40_pillar_cleave.jpg',
    illustrationCaption: '至纯剑芒洞穿漫天冰刃，轰然劈裂镇窖万年寒玉柱',
    mandatory: true,
    beats: [
      N('你倾尽毕生修为，将终南玄门先天真气尽数贯注三尺青锋！剑光暴涨丈余，竟在酷寒冰窖之中绽放出宛如春日朝阳般的温润清辉！'),
      N('轰隆——！！剑虹如游龙破浪，先将漫天冰刃风暴从中剖开，余势不减，擦着李秋水月白衣袖掠过，重重斩在冰座后方那根合抱粗的镇宫寒玉柱之上！'),
      N('咔嚓咔嚓连声脆响，坚逾精铁的万年寒玉柱自顶至底裂开一道深邃剑痕，半截巨冰轰然崩塌坠地，震得整座地宫簌簌落霜！'),
    ],
    onFinishEffects: [openScene('scene_zn40_28', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_28: {
    id: 'scene_zn40_28',
    title: '第二十八幕 · 大宗师折服',
    subtitle: '兴庆府 · 西夏皇宫寒玉冰窖',
    mandatory: true,
    beats: [
      N('碎冰纷落如雪，漫天寒雾渐渐平息。你收剑而立，衣袂微扬，剑尖斜指地面，唯有一滴水珠顺着剑脊缓缓滑落。'),
      N('李秋水凝视着身旁被一剑劈裂的万年寒玉柱，又低头看了看自己被剑气削去半寸的月白广袖，久久沉默无言。片刻后，她忽地掩唇轻笑，周身凌厉杀意瞬间消散无踪。'),
      S(
        'NPC-0103',
        '（收起白玉扇，目中流露出罕见的激赏之色）“好！好一个终南玄门极境！自无崖子师兄与那老贱人之后，数十年来中原武林竟又出了你这般人物！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn40_29', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_29: {
    id: 'scene_zn40_29',
    title: '第二十九幕 · 寒窖立誓',
    subtitle: '兴庆府 · 西夏皇宫寒玉冰窖',
    mandatory: true,
    beats: [
      P(
        '（长剑归鞘，郑重拱手）“前辈承让。晚辈此行只为护持秦岭山门，绝无冒犯西夏皇室之意。只盼前辈金口一诺，敕令一品堂撤尽关中暗桩，从此井水不犯河水。”',
      ),
      S(
        'NPC-0103',
        '（缓步走回冰座，玉指轻弹，一块刻有西夏皇室玉凤符印的寒玉佩飞入你掌中）“哀家素来一言九鼎。今日见识了你这一剑，也算不虚此战。”',
      ),
      S(
        'NPC-0103',
        '（声音清冷而庄重，回荡整座冰宫）“李秋水在此立誓：终哀家之世，西夏一品堂与贺兰铁骑绝不再遣一人窥伺终南秦岭！若违此誓，便如此断玉柱！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn40_30', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_30: {
    id: 'scene_zn40_30',
    title: '第三十幕 · 逍遥寄语',
    subtitle: '兴庆府 · 西夏皇宫寒玉冰窖',
    mandatory: true,
    beats: [
      P('（接过寒玉佩，深深一揖）“多谢前辈高义！晚辈代终南上下百余道友，谢过前辈！”'),
      S(
        'NPC-0103',
        '（唇角微扬，意味深长地望向东方）“小辈，你既已达此境，中原武林怕是很快便坐不住了。听闻吐蕃大轮明王鸠摩智、姑苏慕容氏老龙、还有东海桃花岛奇侠近来皆在打探终南动静……重阳佳节将至，你回山后，怕是还有一场惊动天下的论道大戏要唱哩。”',
      ),
      P('（心中一凛，旋即坦然一笑）“四海英豪若愿登山论道，终南清泉松茗，扫径以待！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_31', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_31: {
    id: 'scene_zn40_31',
    title: '第三十一幕 · 踏雪出宫',
    subtitle: '兴庆府 · 皇宫石亭',
    mandatory: true,
    beats: [
      N('辞别李秋水，你拾级步出寒玉冰窖。那名掌灯老宦恭敬躬身送行，沿途皇城禁卫早得太妃密谕，竟无一人出面阻拦。'),
      N('步出兴庆府东门时，东方天际已泛起一抹鱼肚白。回望贺兰山苍茫轮廓，晨风猎猎，你只觉胸中武道气象较昨夜又浑厚了一分。'),
    ],
    onFinishEffects: [openScene('scene_zn40_32', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_32: {
    id: 'scene_zn40_32',
    title: '第三十二幕 · 赫连送行',
    subtitle: '兴庆府东 · 十里沙亭',
    mandatory: true,
    beats: [
      N('行出十里沙亭，忽见一骑玄甲快马静候道旁——竟是铁鹞大将军赫连霸先。他已卸去重甲，只着常服，见你走近，翻身下马抱拳一礼。'),
      S(
        'NPC-0130',
        '（神色复杂，既有不甘亦有敬服）“太妃娘娘已传谕全堂，撤回派往关中秦岭的全部暗桩。赫连某败在你剑下，心服口服！终南隐宗有你坐镇，确实非我一品堂所能轻侮！”',
      ),
      P('（还礼道）“将军亦是铁血悍将。望日后两境相安，边民少受兵燹之苦。”'),
    ],
    onFinishEffects: [openScene('scene_zn40_33', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_33: {
    id: 'scene_zn40_33',
    title: '第三十三幕 · 威震西北',
    subtitle: '河西古道 · 关中边关',
    illustrationUrl: '/assets/quests/zn_q40_return_dawn.jpg',
    illustrationCaption: '晨曦铺满秦川古道，孤剑破冰威名已先传遍关洛江湖',
    mandatory: true,
    beats: [
      N('你一路东归，尚未踏入关中，『终南宗师孤剑踏破西夏一品堂、寒玉冰窖力抗大宗师李秋水』的惊世消息，早已随着丝路商队与边关驿马传遍西北！'),
      N('沿途茶肆酒楼，处处皆是江湖豪客举杯热议之声，莫不赞叹终南隐宗百年清风之外，竟藏着如此傲骨峥嵘的绝代宗师。'),
    ],
    onFinishEffects: [openScene('scene_zn40_34', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_34: {
    id: 'scene_zn40_34',
    title: '第三十四幕 · 重入秦川',
    subtitle: '京兆府外 · 终南山口',
    mandatory: true,
    beats: [
      N('十余日后，巍峨秦岭重现眼帘。深秋山色如画，枫红松翠交错其间，清冽的山风吹散了万里风沙疲惫。'),
      P('“终于回到终南山了。且上重阳大殿，将太妃誓约呈告山门诸位同道！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_35', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_35: {
    id: 'scene_zn40_35',
    title: '第三十五幕 · 凯旋赴殿',
    subtitle: '终南山道 · 青石古阶',
    mandatory: true,
    beats: [
      N('沿途巡山弟子遥见你白衣归来，无不欢欣鼓舞、奔走相告，纷纷躬身行礼迎候。'),
    ],
    choices: [
      {
        id: 'zn40_go_return_hall',
        label: '返回【重阳古观前脉道院 · 重阳玄门清修主殿】告慰山门',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q40_QUEST_ID, 'return_zhongnan_report'),
          toast(
            '李秋水已立誓永不犯秦岭！请返回【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】告慰山门。',
            'success',
            '贺兰破冰',
          ),
        ],
      },
    ],
  },

  scene_zn40_36: {
    id: 'scene_zn40_36',
    title: '第三十六幕 · 玉佩为凭',
    subtitle: '终南山隐宗 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('重阳玄门清修主殿外钟磬齐鸣，终南前脉与后山诸位长老弟子齐聚阶前。你将西夏皇太妃李秋水亲赠的寒玉凤佩置于香案之上，将兴庆府破一品堂、冰窖劈玉柱的经过娓娓道来。'),
      S('NPC-1057', '（抚须大笑，眼眶微热）“壮哉！壮哉！孤剑西出贺兰，劈碎一品堂牌匾，更令逍遥派大宗师李秋水立誓退兵！我终南百年清誉，自今日起响彻寰宇！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_37', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_37: {
    id: 'scene_zn40_37',
    title: '第三十七幕 · 寒玉同辉',
    subtitle: '终南山隐宗 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S(
        'NPC-0173',
        '（端详案上寒玉凤佩，神色柔和）“此玉佩蕴含极纯寒气，足见李太妃确已心悦诚服。自此而后，活死人墓与重阳古观皆可安享太平，再无西夏宵小窥伺之忧。”',
      ),
      S(
        'NPC-1059',
        '（微笑拱手）“不仅如此，方才已有三封烫金拜帖送至山门——东海桃花岛冯默岚前辈、吐蕃大轮明王鸠摩智、以及江南名宿慕容博，竟不约而同欲于九月初九重阳佳节登临终南，以武论道！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn40_38', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_38: {
    id: 'scene_zn40_38',
    title: '第三十八幕 · 群雄拜帖',
    subtitle: '终南山隐宗 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      P(
        '（闻言抚剑而笑，想起寒玉冰窖中李秋水的临别之语）“果然不出李太妃所料。贺兰破冰一战既已名动天下，四海绝顶高手闻风而来，正是我终南以武会友、定鼎乾坤之机！”',
      ),
      S('NPC-1057', '“更有一桩奇事——传闻昔年编纂《万寿道藏》的奇人黄裳先生，亦愿驾临寒玉涧作见证！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_39', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_39: {
    id: 'scene_zn40_39',
    title: '第三十九幕 · 秦岭清风',
    subtitle: '终南山隐宗 · 重阳玄门清修主殿',
    illustrationUrl: '/assets/quests/zn_q40_zhongnan_peace.jpg',
    illustrationCaption: '云海翻涌太乙峰，终南群道共贺贺兰破冰凯旋',
    mandatory: true,
    beats: [
      N('夕阳西下，晚霞将终南千峰染作一片鎏金。钟声悠扬传遍山谷，秦岭松涛阵阵，仿佛也在为这一战的凯旋欢呼。'),
      P('（望向群山云海，心潮澄明）“先休整几日，待重阳佳节一到，便在寒玉涧双剑坪设席迎客，会尽天下英雄！”'),
    ],
    onFinishEffects: [openScene('scene_zn40_40', ZHONGNAN_Q40_QUEST_ID)],
  },

  scene_zn40_40: {
    id: 'scene_zn40_40',
    title: '第四十幕 · 贺兰破冰录成',
    subtitle: '终南山隐宗 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('此役过后，「贺兰破冰 · 寒窖问尊」之名传遍大宋与西夏江湖。终南隐宗自此高枕秦岭，威望如日中天，而一场更盛大的太乙论道盛会，也即将拉开帷幕！'),
    ],
    choices: [
      {
        id: 'zn40_complete',
        label: '铭记贺兰破冰之功，静候重阳太乙论道盛会',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'zn_q40_icecellar_cleared', value: true },
          { type: 'giveCombatExp', amount: 1800, reason: '贺兰破冰 · 寒窖问尊' },
          { type: 'modifyRenown', delta: 260, reason: '孤剑破一品堂、寒窖抗李秋水' },
          { type: 'modifyChivalry', delta: 80, reason: '护持秦岭、止息边患' },
          { type: 'addSectContribution', amount: 1200 },
          { type: 'giveItem', itemId: 'ITM-MED-107', qty: 2 },
          { type: 'giveItem', itemId: 'ITM-MED-113', qty: 2 },
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'completeQuest', questId: ZHONGNAN_Q40_QUEST_ID, outcome: 'ice_cellar_vow' },
          toast(
            '【贺兰破冰 · 寒窖问尊】圆满完成！李秋水已立誓永不犯秦岭，重阳太乙论道盛会即将开启！',
            'success',
            '终南封神',
          ),
        ],
      },
    ],
  },
}
