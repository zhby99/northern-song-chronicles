import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE16_QUEST_ID } from './shaolinSideOrdinationPurgeQuest'

const SPEAKER_ZHAO_KEJI: StorySpeakerSpec = {
  kind: 'custom',
  name: '赵克己',
  title: '京西转运判官 · 贪渎官僚',
  factionName: '京西私庄',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

const SPEAKER_BLOOD_KASAYA: StorySpeakerSpec = {
  kind: 'custom',
  name: '「血袈裟」摩罗',
  title: '官府供奉邪僧 · 西域叛徒',
  factionName: '京西私庄供奉',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

function buildBloodKasayaBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS16_BLOOD_KASAYA',
    name: '「血袈裟」摩罗',
    title: '官府供奉邪僧 · 西域叛徒',
    realm: '宗师下品',
    factionName: '京西私庄供奉',
    sectRank: 4,
    sectRankLabel: '邪道宗师',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“少林老秃驴也敢管赵判官的财路？今日老衲便拿你这首座的鲜血，再染红我这领血袈裟！”',
    stats: { hp: 4380, mp: 3920, agi: 79, res: 65 },
    talents: { bone: 90, comprehension: 86, charm: 42 },
    equippedArts: { neigong: 'MA-028', move1: 'MA-072', move2: 'MA-073' },
    learnedArts: [{ artId: 'MA-028', level: 8 }, { artId: 'MA-072', level: 9 }, { artId: 'MA-073', level: 9 }],
  })
}

export const SHAOLIN_SIDE16_SCENES: Record<string, StorySceneDef> = {
  scene_sls16_01: {
    id: 'scene_sls16_01',
    title: '第一幕 · 佛前旧账',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，暮鼓已歇，大雄宝殿内只余两柱长明烛火摇曳。玄慈方丈屏退左右执事僧，缓缓从紫檀佛龛下取出一只封着火漆的青布卷宗，推到你面前。'),
      S('NPC-0112', '“阿弥陀佛。你如今既已登临本寺长老首座，老衲有一桩压在心头二十年的沉疴旧弊，须得托付于你。”'),
      P('“方丈神色凝重，莫非寺中出了什么干系重大的变故？”'),
      S('NPC-0112', '（玄慈轻轻叹息，目光沉静而深远）“你可还记得当年初登少室山时，在钟鼓禅院受知客僧玄净考问、最后不得不借洛阳牙人贾通宝送银二百两以‘长明灯油’名目入寺的旧事？”'),
    ],
    onFinishEffects: [openScene('scene_sls16_02', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_02: {
    id: 'scene_sls16_02',
    title: '第二幕 · 冰山一角',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      P('“弟子自然铭记于心。当年弟子只道是玄净师伯贪图香火银钱，后来入寺日久，却隐约察觉那些银两并未尽入知客院私囊。”'),
      S('NPC-0112', '“好眼力！老衲早年亦以为不过是知客院借机敛财，曾数次严斥玄净。可近三年来，戒律院暗中清核全寺度牒名录，竟查出惊天黑幕——本寺每年呈报祠部申领的空白御赐度牒，足有三成不知去向！”'),
      N('你翻开青布卷宗，密密麻麻的蝇头小楷记录着近十年间「长明灯油」「施主功德」与洛阳牙行往来的每一笔银票流水，以你精熟的算术粗粗一核，竟有数万贯白银凭空蒸发！'),
      S('NPC-0112', '“大宋律例，持官颁度牒出家者可免丁役、免赋税。有人借我少林这块金字招牌，与京西官府内外勾结，一面卡死寒门子弟入寺之途索贿牟利，一面将御赐度牒高价倒卖给豪强地主与逃税巨贾！玄净不过是被人攥住把柄、推在台前的傀儡罢了。”'),
    ],
    onFinishEffects: [openScene('scene_sls16_03', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_03: {
    id: 'scene_sls16_03',
    title: '第三幕 · 密书赴汴',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      P('“竟有人敢借我少林清誉倒卖御赐度牒、掏空朝廷赋役！若不趁早连根拔起，一旦朝堂追查下来，千年古刹便要蒙受不白之冤！”'),
      S('NPC-0112', '“正是此理！寺中耳目众多，此案又牵连京西转运使司实权官吏，绝非少林一寺能私下料理。放眼大宋朝堂，唯有一人铁面无私、不畏权贵，可与我少林共破此局——那便是权知开封府的包龙图，包拯包大人！”'),
      N('玄慈取出一封盖有少林方丈紫泥大印的密函，连同十年暗账一并交到你手中。'),
      S('NPC-0112', '“你既通晓策论算术，又有一身宗师修为，此去汴京开封府正堂面呈包大人，务须将这伙官匪邪祟一网打尽，还我少林一个朗朗乾坤！”'),
    ],
    choices: [
      {
        id: 'sls16_accept_mission',
        label: '接过方丈密函与十年暗账，星夜动身赴汴京开封府',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE16_QUEST_ID, stepId: 'meet_kaifeng_court' },
          setStep(SHAOLIN_SIDE16_QUEST_ID, 'meet_kaifeng_court'),
          toast(
            '已领受玄慈方丈密托！请携暗账前往【汴京 · 开封府 · 开封府正堂（bl_kf_court）】拜见包拯与展昭。',
            'talk',
            '度牒大案',
          ),
        ],
      },
    ],
  },

  scene_sls16_04: {
    id: 'scene_sls16_04',
    title: '第四幕 · 龙图展卷',
    subtitle: '汴京 · 开封府正堂',
    mandatory: true,
    beats: [
      N('三日后，汴京开封府正堂之外肃杀庄严。你递上玄慈方丈亲笔名刺，很快被亲兵引入后堂暖阁。但见一位面黑如铁、双目炯炯的紫袍大员正端坐案前，身旁立着一位红衣按剑、气度清峻的青年护卫。'),
      S('NPC-0013', '（包拯拱手起身，声若洪钟）“少林首座远道而来，包某有失远迎！方才读罢玄慈大师密函，着实令本府震怒——朝廷祠部度牒乃国家大政，竟有硕鼠敢借少林佛门清净地倒卖牟利！”'),
      S('NPC-0140', '（展昭抱拳微躬，眉宇间英气凛然）“久仰大师威名，在下展昭。近半年来，开封府亦屡接京西百姓匿名投状，称有豪强一朝剃发领牒、名下千亩良田竟全挂入虚构禅院逃避赋税，却苦于查无实证。”'),
      P('“阿弥陀佛。贫僧此来，正是奉方丈法旨呈上少林近十年知客院往来暗账，愿与包大人、展护卫里应外合，彻查幕后黑手！”'),
    ],
    onFinishEffects: [openScene('scene_sls16_05', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_05: {
    id: 'scene_sls16_05',
    title: '第五幕 · 抽丝剥茧',
    subtitle: '汴京 · 开封府正堂',
    mandatory: true,
    beats: [
      N('你在案前摊开少林暗账，又以精湛的算术将每笔「长明灯油」入账日期与京西各州县赋税核减之期逐一比对。不出半个时辰，一条隐秘的银钱暗线便赫然浮现纸面。'),
      P('“包大人请看：洛阳牙人贾通宝每逢季末便将索贿所得白银兑作京西盐引，再经三家当铺倒手，最终全数汇入京西转运判官赵克己名下的一处别庄！而少林遗失的空白度牒编号，亦与赵克己经手核销的祠部勘合严丝合缝！”'),
      S('NPC-0013', '（包拯一拍惊堂木，双眉倒竖）“好一个赵克己！身居转运判官要职，竟与洛阳牙行、寺中蠹虫沆瀣一气，一面勒索寒门弟子，一面倒卖御赐度牒私吞国课！展护卫，赵克己在京西究竟置了何处私庄？”'),
      S('NPC-0140', '“回大人，赵克己为人极狡猾，明面上两袖清风，暗地里却重金豢养了一批亡命之徒。传闻他庄中还供奉着一名自西域逃来的邪派宗师，名唤『血袈裟』摩罗，心狠手辣，寻常官差根本近不得身！”'),
    ],
    onFinishEffects: [openScene('scene_sls16_06', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_06: {
    id: 'scene_sls16_06',
    title: '第六幕 · 佛官合谋',
    subtitle: '汴京 · 开封府正堂',
    illustrationUrl: '/assets/quests/sl_s16_kaifeng_ally.jpg',
    illustrationCaption: '佛官合谋 · 开封府正堂灯下勘账，少林首座与包拯、展昭定计除奸',
    mandatory: true,
    beats: [
      N('烛火映照着包拯刚毅如铁的面容、展昭寒芒微露的巨阙剑，以及你身上庄严沉稳的少林首座袈裟。佛门高僧与大宋铁面青天并肩案前，一番策论权衡瞬间落定。'),
      P('“包大人，此案既涉朝廷命官，若打草惊蛇，赵克己必焚毁私庄账簿与空白度牒，届时死无对证。唯有先赴架阁库核实其私庄地契暗记，趁今夜月黑风高直捣黄龙，方能人赃并获！”'),
      S('NPC-0013', '“大师策论精辟，正合本府之意！本府即刻签发火漆密令，准大师与展护卫入开封府架阁库调阅京西田赋密档。至于那邪僧『血袈裟』摩罗，便要劳烦大师以少林伏魔正法镇压了！”'),
      S('NPC-0140', '“展某率开封府精锐暗哨在外围合围断其退路，捉拿赵克己与一干账房爪牙；庄内邪僧，便请大师放手施为！”'),
    ],
    onFinishEffects: [openScene('scene_sls16_07', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_07: {
    id: 'scene_sls16_07',
    title: '第七幕 · 密令在握',
    subtitle: '汴京 · 开封府正堂',
    mandatory: true,
    beats: [
      N('包拯提笔蘸墨，须臾写就一纸开封府绝密勘合手令，重重盖下府尹大印，郑重递到你掌中。'),
      S('NPC-0013', '“切记！此案关乎朝廷法度与少林清誉，无论牵出何方权贵，本府一力担之！大师且先往架阁库与展护卫会合，查明黑庄确址后即刻发兵！”'),
      P('“阿弥陀佛。贫僧必不负包大人与方丈所托！”'),
    ],
    choices: [
      {
        id: 'sls16_go_archive',
        label: '接过开封府密令，前往架阁库核对密档、准备夜袭',
        tone: 'jade',
        effects: [
          setStep(SHAOLIN_SIDE16_QUEST_ID, 'raid_west_manor'),
          toast(
            '包拯已准调档！请前往【汴京 · 开封府 · 架阁库（bl_kf_archive）】核实私庄位址，随展昭夜袭京西贪官私庄。',
            'talk',
            '度牒大案',
          ),
        ],
      },
    ],
  },

  scene_sls16_08: {
    id: 'scene_sls16_08',
    title: '第八幕 · 架阁锁踪',
    subtitle: '汴京 · 开封府架阁库',
    mandatory: true,
    beats: [
      N('开封府架阁库内卷帙浩繁，药香扑鼻。展昭早已点齐二十名黑衣精锐候在暗门之外，你持包拯密令入内，迅速翻出近五年京西路祠部度牒勘合存根与地籍鱼鳞册。'),
      N('你以算术勾稽田亩折算与银票暗码，很快在卷宗夹层里揪出端倪——巩县以东三十里的「青柳庄」，名义上是城郊荒废义庄，实则年年暗吞千亩膏腴，正是赵克己藏匿伪造度牒印信与黑银的巢穴！'),
      S('NPC-0140', '（展昭目光一凛，按剑起身）“好隐蔽的障眼法！若非大师精于算学账目，只怕再查半年也摸不到这处荒庄。时辰已近三更，咱们即刻纵马出城，直扑青柳庄！”'),
      P('“善哉。此行除恶务尽，切莫惊扰附近无辜乡民！”'),
    ],
    onFinishEffects: [openScene('scene_sls16_09', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_09: {
    id: 'scene_sls16_09',
    title: '第九幕 · 夜破黑庄',
    subtitle: '京西 · 青柳私庄',
    mandatory: true,
    beats: [
      N('三更时分，霜月冷冽。青柳庄外看似荒草齐腰、破败不堪，高墙之内却灯火通明、重兵把守。展昭一声轻啸，二十名开封府精锐如苍鹰掠墙而入，瞬间制住外院暗哨，铁索撞开正厅大门！'),
      N('厅内银箱堆叠如山，案上赫然摆着数十张盖好假印的空白御赐度牒与洛阳牙行的分成密册！一名身着锦袍的中年文官惊慌失措地推翻烛台，尖声大叫。'),
      S(SPEAKER_ZHAO_KEJI, '“何方狂徒竟敢私闯本官别庄！来人——快请摩罗大师出手，把这些不知死活的官差和秃驴全杀个干净，一个活口也别留！”'),
      S('NPC-0140', '（展昭剑光如电，一剑挑飞两名扑来的私兵，朗声喝道）“赵克己，开封府包大人亲签拘票在此，你倒卖度牒、贪墨国课，罪证确凿，还不束手就擒！大师，后堂邪气逼人，小心那邪僧！”'),
    ],
    onFinishEffects: [openScene('scene_sls16_10', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_10: {
    id: 'scene_sls16_10',
    title: '第十幕 · 血僧现身',
    subtitle: '京西 · 青柳私庄内院',
    mandatory: true,
    beats: [
      N('话音未落，后堂雕花木门轰然炸裂！一股腥风伴着炽烈狂暴的邪道内劲席卷庭院，一名身披暗红如血的破旧袈裟、手持戒刀的魁梧番僧大步踏出，双目赤红如鬼，周身血煞之气令人窒息！'),
      S(SPEAKER_BLOOD_KASAYA, '（阴恻恻地狞笑一声，刀锋斜指你眉心）“桀桀桀……我道是谁敢坏赵大人的好事，原来是嵩山少林寺的首座高僧！当年老衲在西域杀戒大开，被正道秃驴追杀至此，今日正好拿你这少林宗师的头颅祭刀！”'),
      P('（缓步上前，将展昭与账簿护在身后，佛号清越如钟）“阿弥陀佛。披佛门袈裟而行屠戮贪渎之恶，你已堕入无间魔道。展护卫只管拿人封账，这孽障交由贫僧超度！”'),
      S(SPEAKER_BLOOD_KASAYA, '“大言不惭！接我血刀修罗斩！”'),
    ],
    choices: [
      {
        id: 'sls16_fight_blood_kasaya',
        label: '运起少林护法正功，一对一力战邪僧「血袈裟」摩罗！（1v1 生死决战）',
        subLabel: '对手：官府供奉邪僧 · 「血袈裟」摩罗（宗师下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE16_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBloodKasayaBoss() },
            rule: 'duel',
            forbidEscapeReason: '邪僧凶焰滔天，若退半步则庄内铁证尽毁、开封府官差皆危！',
            introText: '【1v1 宗师伏魔】于京西私庄火光之中，独力迎战宗师下品邪僧【「血袈裟」摩罗】！',
            onWin: [openScene('scene_sls16_11', SHAOLIN_SIDE16_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 50, mpPct: 50 },
              toast(
                '血袈裟摩罗刀势凶诡，此战暂且受挫！请回汴京休整精进后再由开封府架阁库重袭私庄！',
                'warn',
                '度牒大案',
              ),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 50, mpPct: 50 },
              toast(
                '与血袈裟摩罗鏖战难分高下！请调息后再由开封府架阁库重战伏魔！',
                'warn',
                '度牒大案',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls16_11: {
    id: 'scene_sls16_11',
    title: '第十一幕 · 伏魔诛邪',
    subtitle: '京西 · 青柳私庄内院',
    illustrationUrl: '/assets/quests/sl_s16_blood_kasaya.jpg',
    illustrationCaption: '伏魔诛邪 · 京西私庄夜火漫天，少林首座破尽血刀诛灭邪僧摩罗',
    mandatory: true,
    beats: [
      N('火光映天，刀掌交击声震彻夜空！血袈裟摩罗的血刀经诡异狠辣，每一刀皆借龙象蛮力劈出森然血浪，却始终冲不破你稳如磐石的少林宗师法度。'),
      N('缠斗百余合后，摩罗见久攻不下，狂吼一声施出拼命绝招「一拍两散」挟刀直取你胸口！你目光澄澈如镜，不退反进，一记至刚至正的少林伏魔掌劲后发先至，硬生生震断其血刃，雄浑佛门内劲透体而入，震碎其全身魔功经脉！'),
      S(SPEAKER_BLOOD_KASAYA, '（仰天喷出一口黑血，难以置信地瞪着你，手中半截断刀铛啷落地）“少林……正宗禅武……竟真能破我血煞……”'),
      N('话音未绝，这位横行京西多年的邪道宗师便轰然仰倒于火光尘埃之中，气绝身亡。庭院内外残余私兵见供奉已死，纷纷抛械跪降！'),
    ],
    onFinishEffects: [openScene('scene_sls16_12', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_12: {
    id: 'scene_sls16_12',
    title: '第十二幕 · 人赃并获',
    subtitle: '京西 · 青柳私庄正厅',
    mandatory: true,
    beats: [
      N('展昭已亲自用铁链锁住面如死灰的赵克己，开封府捕快将满厅银箱、三百余张私印空白度牒及洛阳牙人贾通宝的供状原件逐一封存装箱。'),
      S(SPEAKER_ZHAO_KEJI, '（瘫软在地，浑身抖如筛糠）“饶命……饶命啊！下官只是一时糊涂，那些银子大半都打点了京中门路，少林寺的玄净禅师也只是收了一点香火茶水钱……”'),
      S('NPC-0140', '（收剑入鞘，冷声叱道）“有何冤屈，留待明日在包大人公堂之上、虎头铡前慢慢交代吧！带走！”'),
      S('NPC-0140', '（转身向你郑重抱拳，眼中满是敬佩）“大师方才独战宗师邪僧，禅武兼备、临危不乱，展某佩服得五体投地！若非大师出手，今夜绝难全功。”'),
    ],
    onFinishEffects: [openScene('scene_sls16_13', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_13: {
    id: 'scene_sls16_13',
    title: '第十三幕 · 青天勘结',
    subtitle: '汴京 · 开封府正堂',
    mandatory: true,
    beats: [
      N('翌日辰时，开封府大堂升堂公审。铁证如山之下，赵克己与洛阳牙行一干党羽尽数画押伏罪。包拯当堂奏请仁宗天子革去赵克己官职、抄没私庄赃银归公，又亲手拟就一份盖有开封府与祠部双印的勘结公文交予你手。'),
      S('NPC-0013', '（包拯离案相送，神色肃穆而欣慰）“大师此番大义灭亲、不徇私情，既替朝廷挽回数十万贯赋税，更保全了少林千年清名！包某平生见惯世态炎凉，今日得识大师这般真高僧，实乃平生快事！”'),
      S('NPC-0140', '“大师回山之后，整肃寺规尚有一番风雨。日后若有任何用得着开封府之处，但凭一纸书信，展某定当星夜驰援！”'),
      P('“阿弥陀佛。有劳包大人与展护卫明镜高悬，贫僧这便携公文回山，了结这桩二十年积弊！”'),
    ],
    choices: [
      {
        id: 'sls16_return_shaolin',
        label: '辞别包拯与展昭，携开封府勘结公文返回嵩山少林寺',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE16_QUEST_ID, 'announce_reform'),
          toast(
            '京西私庄已破、铁案如山！请携开封府公文返回【嵩山少林寺 · 大雄宝殿正殿（sl_daxiong_main）】当众颁立新规。',
            'success',
            '度牒大案',
          ),
        ],
      },
    ],
  },

  scene_sls16_14: {
    id: 'scene_sls16_14',
    title: '第十四幕 · 钟鸣聚众',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      N('你回到少室山时，大雄宝殿铜钟连鸣九响，全寺玄、慧、虚三辈僧众闻声齐聚丹墀。玄慈方丈端坐法座，玄难、玄寂等各院首座分列左右，知客禅师玄净亦立于阶下，额角冷汗涔涔。'),
      N('你步上白玉丹墀，朗声将开封府勘结公文当众宣读。满殿僧众听闻京西官匪借少林度牒洗银敛财、邪僧伏诛之始末，无不哗然色变！'),
      S('NPC-0193', '（玄净面色惨白，扑通一声跪倒于佛前，连连叩首）“方丈恕罪！首座恕罪！老衲当年一时鬼迷心窍，受赵克己胁迫诱惑，借‘佛缘有价’之名向入门弟子索取银两、私挪度牒……老衲罪孽深重，愿领戒律院杖责，甘受革职面壁之罚！”'),
      P('（注视着阶下痛哭流涕的玄净，心中百感交集，声音清朗而威严）“玄净师伯，当年弟子初叩嵩门，也曾为那二百两‘灯油钱’奔走洛阳。今日查清此案，非为记恨一己私怨，实因佛门清净地，绝不容白银称量佛心！”'),
    ],
    onFinishEffects: [openScene('scene_sls16_15', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_15: {
    id: 'scene_sls16_15',
    title: '第十五幕 · 勒石立规',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      S('NPC-0112', '（玄慈方丈合十起身，声震大殿）“善哉！戒律院听令：即刻革去玄净知客禅师之职，罚入思过崖面壁思过十年，其历年私蓄尽数施粥济贫！至于本寺往后收录弟子与度牒核发之制，便由首座当众宣示新规！”'),
      N('你展开早已以策论法度拟就的《少林度牒清源新规》，字字铿锵，传遍少室山谷：'),
      P('“一、自今岁起，凡投拜少林山门者，只论心性品行与修行赤诚，严禁以香火灯油之名索取分文贿银，违者立逐山门！”'),
      P('“二、凡祠部所颁度牒，悉由方丈、戒律、达摩三院联署造册，岁末公榜核验，永绝官匪勾结、私卖度牒之途！三、以此新规勒石立碑于山门钟鼓院前，令后世千年少林弟子共鉴之！”'),
    ],
    onFinishEffects: [openScene('scene_sls16_16', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_16: {
    id: 'scene_sls16_16',
    title: '第十六幕 · 清源正本',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      N('话音落处，丹墀上下数百名少林僧众齐声合十诵念佛号，声浪如潮，直冲云霄！不少当年曾受索贿之苦的寒门武僧更是热泪盈眶，向你深深稽首。'),
      S('NPC-0112', '“阿弥陀佛！二十年积弊，一朝涤荡清明。你既以宗师武功伏魔于京西，又以明断策论正本于山门，实乃我少林中兴栋梁！”'),
      N('从此以后，少林山门再无「佛缘有价」之讥，大宋朝野与河洛江湖莫不交口称颂你与包龙图联手清源正本的这段佳话。'),
    ],
    choices: [
      {
        id: 'sls16_complete',
        label: '合十领受师门嘉许，铭记清源正本之志',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 1050, reason: '京西伏魔与清源正本度牒大案圆满告成' },
          { type: 'addSectContribution', amount: 350 },
          { type: 'modifyRenown', delta: 140, reason: '会同包拯展昭破获度牒大案、整肃少林寺风' },
          { type: 'modifyChivalry', delta: 80, reason: '废除入寺索贿陋习、诛灭邪僧护持正道' },
          { type: 'modifySkill', key: '策论', delta: 2 },
          { type: 'modifySkill', key: '算术', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0013' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0140' }, delta: 20 },
          { type: 'completeQuest', questId: SHAOLIN_SIDE16_QUEST_ID },
          toast(
            '【清源正本 · 度牒大案】圆满完成！获实战经验+1050、师门贡献+350、声望+140、侠义+80、策论+2、算术+1，包拯与展昭好感各+20！',
            'success',
            '清源正本',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_SIDE16_SCENES
