import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_SIDE07_QUEST_ID } from './huashanSideWeibeiHarvestQuest'

const SPEAKER_VILLAGE_ELDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '周老伯',
  title: '渭北柳林村老里正',
  factionName: '关中百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_DONG_WANJIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '董万金',
  title: '霸天虎 · 渭北粮霸豪强',
  factionName: '渭北恶霸',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_HELAN_ZHENG: StorySpeakerSpec = {
  kind: 'custom',
  name: '贺兰狰',
  title: '双钩鬼哭 · 塞外雇佣凶徒',
  factionName: '西夏流亡杀手',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

function buildDongThugNpc(index: 1 | 2): NodeNpc {
  const isFirst = index === 1
  return makeQuestNpc({
    id: isFirst ? 'QUEST_HSS07_DONG_THUG_1' : 'QUEST_HSS07_DONG_THUG_2',
    name: isFirst ? '赵铁臂' : '孙恶煞',
    title: '董府护院恶奴头目',
    realm: '二流中品',
    factionName: '渭北恶霸',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: isFirst
      ? '“哪家不知死活的酸书生剑客，敢掀董大爷的账桌？砍断你的手！”'
      : '“兄弟们并肩上，把这多管闲事的华山小子剁成麦肥！”',
    stats: isFirst
      ? { hp: 1360, mp: 1120, agi: 48, res: 33 }
      : { hp: 1310, mp: 1080, agi: 47, res: 32 },
    talents: { bone: 64, comprehension: 44, charm: 25 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-151', move2: 'MA-131' },
    learnedArts: [{ artId: 'MA-140', level: 5 }, { artId: 'MA-151', level: 5 }, { artId: 'MA-131', level: 4 }],
    equipped: { weapon: 'WPN-033' },
    questBadgeLabel: '董府恶奴',
  })
}

function buildHelanZhengNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS07_HELAN_ZHENG',
    name: '贺兰狰',
    title: '双钩鬼哭 · 塞外凶徒',
    realm: '一流中品',
    factionName: '塞外凶徒',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“嘿嘿嘿……华山派的小娃娃，听见我这对狼牙鬼哭钩的啸声没有？割开喉管可痛快得很哪！”',
    stats: { hp: 3120, mp: 2740, agi: 69, res: 56 },
    talents: { bone: 80, comprehension: 72, charm: 20 },
    equippedArts: { neigong: 'MA-086', move1: 'MA-085', move2: 'MA-131' },
    learnedArts: [{ artId: 'MA-086', level: 7 }, { artId: 'MA-085', level: 7 }, { artId: 'MA-131', level: 7 }],
    equipped: { weapon: 'WPN-018' },
    questBadgeLabel: '双钩鬼哭',
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hss07_01: {
    id: 'scene_hss07_01',
    title: '第一幕 · 麦收泣血',
    subtitle: '长安西市 · 渭北老农求援',
    mandatory: true,
    beats: [
      N('{reignYear}初夏，关中麦浪翻金，本是十里飘香的丰年光景。然而长安西市粮行牌坊下，一名须发皆白、额角渗血的老汉却死死抱着几卷发皱的田契，在烈日下哀嚎求告。'),
      N('见你腰佩华山长剑、眉目清朗，老汉踉跄扑上前一把拉住你的衣袖。'),
      S(SPEAKER_VILLAGE_ELDER, '“华山派的少侠救命啊！小老儿是渭北柳林村的里正周大有！去岁关中春旱，乡亲们向渭北粮霸‘霸天虎’董万金借了三十石春种粮，说好秋收加二成还清——”'),
      S(SPEAKER_VILLAGE_ELDER, '“谁知那黑心虎狼暗中篡改借契，按旬复利滚成三百石天债！今早他带了二十多名持刀恶奴和十辆大车压进麦坪，扬言午后就要强收咱们三百户人家一百顷熟透的夏麦！”'),
    ],
    choices: [
      {
        id: 'hss07_01_ask',
        label: '扶起周老伯拭去血渍，细问董万金强吞百顷麦田的底细',
        tone: 'gold',
        effects: [openScene('scene_hss07_02', HUASHAN_SIDE07_QUEST_ID)],
      },
    ],
  },

  scene_hss07_02: {
    id: 'scene_hss07_02',
    title: '第二幕 · 暗通塞北',
    subtitle: '长安西市 · 闻悉资敌密情',
    mandatory: true,
    beats: [
      P('“大宋《宋刑统》明文严禁私债利过本金，更何况京兆府就在眼前，董万金哪来这般胆量光天化日强占百顷良田？”'),
      S(SPEAKER_VILLAGE_ELDER, '（压低声音，浑身发抖）“少侠有所不知！小老儿昨夜撞见董府账房在城外古庙与几个戴毡帽的党项牙商密会！那厮根本不是为了囤粮卖给长安百姓，他是打算连夜把抢来的新麦装船北运，高价倒卖给西夏兵马！”'),
      S(SPEAKER_VILLAGE_ELDER, '“他还重金从塞外请了一名使双钩的凶恶杀手坐镇麦坪，京兆府派去问话的两个小吏都被打断腿扔回了村口！眼下能替三百户百姓主持公道的，唯有华山派的侠士了！”'),
      P('（剑眉一轩，按住剑柄）“既盘剥黎庶，又敢偷运关中夏粮资敌西夏！周老伯莫慌，我这便随你赶赴【草堂寺西侧渭北麦坪】，当着全村百姓的面拆穿他的阴阳黑契！”'),
    ],
    choices: [
      {
        id: 'hss07_02_go',
        label: '领下护收义举，动身赶赴草堂寺西侧渭北麦坪',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_SIDE07_QUEST_ID, stepId: 'weibei_audit' },
          toast('已开启《渭北麦浪 · 侠剑护夏收》！请前往【草堂寺 > 西侧麦陌野坪】当众核账拆契！', 'success', '侠剑护收'),
        ],
      },
    ],
  },

  scene_hss07_03: {
    id: 'scene_hss07_03',
    title: '第三幕 · 霸虎压坪',
    subtitle: '草堂寺西侧渭北麦坪 · 恶霸收粮',
    mandatory: true,
    beats: [
      N('午风拂过连天接地的金黄麦浪，麦穗饱满低垂。麦坪中央却搭起一座大红凉棚，满脸横肉的「霸天虎」董万金大马金刀坐在花梨木账桌后，桌上叠着厚厚一摞朱印田契与一把黄铜算盘。'),
      N('四周二十余名凶神恶煞的董府恶奴手按厚背刀，将数百名手无寸铁的渭北庄稼汉逼在田埂边。见你随周老伯大步走来，董万金眯起三角眼冷笑连连。'),
      S(SPEAKER_DONG_WANJIN, '“哟，周老狗，京兆府衙门不敢管的事，你倒去华山请了个毛都没长齐的剑客来充大头蒜？白纸黑字按着红手印的借契摆在这儿，少侠若懂王法，就趁早滚回山上念经去！”'),
      P('（负手立于账桌前，朗声一笑）“白纸黑字？好极！把你的借契与流水底账拿出来，我今日就在渭北三百户乡亲面前，替董员外把这笔账一厘一毫算个水落石出！”'),
    ],
    choices: [
      {
        id: 'hss07_03_audit',
        label: '翻开账册与借契，当众核验复利与律法破绽',
        tone: 'primary',
        effects: [openScene('scene_hss07_04', HUASHAN_SIDE07_QUEST_ID)],
      },
    ],
  },

  scene_hss07_04: {
    id: 'scene_hss07_04',
    title: '第四幕 · 麦坪拆契',
    subtitle: '渭北麦坪 · 算术策论破毒计',
    illustrationUrl: '/assets/quests/hs_side07_audit_ledger.jpg',
    illustrationCaption: '麦坪拆契 · 渭北金黄麦浪前核账揭穿霸天虎阴阳印子钱毒计',
    mandatory: true,
    beats: [
      N('你接过账房战战兢兢递来的借契与总账，指尖飞快拨动算筹，只扫了十息便看穿其中连环毒计——原契墨迹写着“借春种三十石，秋还三成息”，后半页却用极淡的矾水暗改成了“旬利三分、利上滚利”，硬生生将三十九石平债滚成了三百石天价，连田契抵押条款都是后补粘接上去的！'),
      S(SPEAKER_DONG_WANJIN, '（额角微汗，强作镇定拍案）“休得血口喷人！欠债还钱天经地义，乡亲们自己按的指印，你一个江湖剑客凭什么说账目有假？”'),
    ],
    choices: [
      {
        id: 'hss07_04_math',
        label: '【算术破账】高举算筹拆穿“旬利复滚”与粘页换墨破绽，当众重算平债！',
        subLabel: '以精绝算术当场点破阴阳账目伪造之处',
        tone: 'gold',
        effects: [openScene('scene_hss07_05', HUASHAN_SIDE07_QUEST_ID)],
      },
      {
        id: 'hss07_04_policy',
        label: '【策论宣律】援引《宋刑统》“一本一利”铁律与私贩边粮重罪，震慑全场！',
        subLabel: '以大宋律法与边防利害直击董万金死穴',
        tone: 'primary',
        effects: [openScene('scene_hss07_05', HUASHAN_SIDE07_QUEST_ID)],
      },
    ],
  },

  scene_hss07_05: {
    id: 'scene_hss07_05',
    title: '第五幕 · 密账露馅',
    subtitle: '渭北麦坪 · 图穷匕见',
    mandatory: true,
    beats: [
      N('你声若洪钟，将借契粘接缝隙迎着烈日一照，两段宣纸色差与伪造的旬利复滚立时原形毕露！更巧的是，账册夹层受风一抖，“哗啦”掉出一张写满西夏党项商号印记的过境粮单！'),
      N('麦坪四周顿时群情激愤，数百名农夫齐声怒吼：“原来这狗贼不仅放印子钱抢田，还要把咱们的口粮偷卖给西夏兵！跟他拼了！”'),
      S(SPEAKER_DONG_WANJIN, '（脸色铁青，一脚踢翻花梨木账桌）“坏我大事的小杂种！今日一个也别想活着走出麦坪！赵铁臂、孙恶煞，给我先把这华山小子的脑袋剁下来！”'),
    ],
    choices: [
      {
        id: 'hss07_05_brawl',
        label: '横剑挡在乡民身前，迎击扑来的董府恶奴头目！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_SIDE07_QUEST_ID, 'weibei_brawl'),
          openScene('scene_hss07_06', HUASHAN_SIDE07_QUEST_ID),
        ],
      },
    ],
  },

  scene_hss07_06: {
    id: 'scene_hss07_06',
    title: '第六幕 · 剑护黎庶',
    subtitle: '渭北麦坪 · 击溃恶奴',
    mandatory: true,
    beats: [
      N('董府两大护院头目赵铁臂、孙恶煞各自舞动九环金背刀，一左一右挟着恶风劈向你的左右肩头，企图乱刀将你逼退夺回通夏粮单！'),
      P('“助纣为虐、欺压良善，看我华山剑法教你二人伏法！”'),
    ],
    choices: [
      {
        id: 'hss07_06_fight',
        label: '长剑出鞘，连破赵铁臂与孙恶煞双刀合击！',
        subLabel: '生死决战 · 董府恶奴头目（二流中品 ×2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_SIDE07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildDongThugNpc(1) },
            extraOpponents: [{ kind: 'custom', npc: buildDongThugNpc(2) }],
            rule: 'duel',
            forbidEscapeReason: '身后尽是手无寸铁的渭北庄稼汉，半步退不得！',
            deathTitle: '饮恨渭北麦坪',
            deathDetail: '你在渭北麦坪护民抗敌时寡不敌众，惨遭董府恶奴乱刀砍杀。',
            onWin: [openScene('scene_hss07_07', HUASHAN_SIDE07_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss07_07: {
    id: 'scene_hss07_07',
    title: '第七幕 · 鬼哭出麦',
    subtitle: '渭北麦坪 · 塞外凶徒现身',
    mandatory: true,
    beats: [
      N('不过十余合，清越剑光卷起漫天麦尘，赵铁臂与孙恶煞双双刀飞腕折，惨叫着滚倒在地！余下恶奴见状吓得屁滚尿流，抱头鼠窜。'),
      N('董万金面如土色，连滚带爬缩到粮车后，颤抖着吹响挂在胸前的一枚尖啸铜哨！'),
      N('“呜——嗷——！”哨声未绝，十丈外随风起伏的金黄麦浪骤然向两侧猛裂开来！一道瘦如枯柴的黑影如鬼魅般踏穗疾掠而至，双手中一对寒光森森的狼牙倒刺双钩互相击撞，发出令人头皮发麻的凄厉鬼哭之音！'),
      S(SPEAKER_HELAN_ZHENG, '“董员外花三千两银子买老夫出手，我还道是什么三头六臂的人物，原来只是个华山小辈。小子，拿你的心肝来祭我这对鬼哭钩吧！”'),
    ],
    choices: [
      {
        id: 'hss07_07_next',
        label: '喝退身旁乡民，独步踏入滚滚金黄麦浪迎战贺兰狰！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_SIDE07_QUEST_ID, 'wheat_duel'),
          openScene('scene_hss07_08', HUASHAN_SIDE07_QUEST_ID),
        ],
      },
    ],
  },

  scene_hss07_08: {
    id: 'scene_hss07_08',
    title: '第八幕 · 麦浪斩钩',
    subtitle: '渭北金黄麦海 · 希夷破邪',
    illustrationUrl: '/assets/quests/hs_side07_wheat_duel.jpg',
    illustrationCaption: '麦浪斩钩 · 滚滚麦穗间长剑破双钩鬼哭贺兰狰，焚毁百顷黑契',
    mandatory: true,
    beats: [
      N('劲风卷起千重金浪，饱满的麦穗在漫天钩影与剑气下簌簌震颤。塞外凶徒「双钩鬼哭」贺兰狰身法诡谲毒辣，双钩专锁敌手兵刃与咽喉要害，阴寒内劲震得周遭麦秆成片折断！'),
      S(SPEAKER_HELAN_ZHENG, '“看钩！十步之内，从未有人能从老夫的鬼哭连环锁下活命！”'),
      P('（凝神守一，剑尖划出《希夷剑法》大象无形之弧）“听之不闻，搏之不得——你这鬼哭魔音，今日便止于渭北麦海！”'),
    ],
    choices: [
      {
        id: 'hss07_08_duel',
        label: '催动《希夷剑法》无声疾锋，在漫天麦浪中决战贺兰狰！',
        subLabel: '生死决战 · 「双钩鬼哭」贺兰狰（一流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_SIDE07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHelanZhengNpc() },
            rule: 'duel',
            forbidEscapeReason: '双钩毒影已锁死周身退路，唯有破钩斩魔方能保全百顷麦田！',
            deathTitle: '血溅渭北麦海',
            deathDetail: '你在渭北金黄麦浪中与塞外凶徒「双钩鬼哭」贺兰狰搏命时不敌，命丧狼牙双钩之下。',
            onWin: [openScene('scene_hss07_09', HUASHAN_SIDE07_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss07_09: {
    id: 'scene_hss07_09',
    title: '第九幕 · 钩断魔伏',
    subtitle: '渭北麦海 · 希夷一剑',
    mandatory: true,
    beats: [
      N('金黄麦浪翻涌如潮！贺兰狰双钩交剪锁向你的长剑中段，本以为必能绞断青锋，不料你手腕微微一沉，《希夷剑法》如风过无痕般滑出钩齿，反借其回拉之势直贯咽喉！'),
      N('“当啷！”一对嗜血多年的狼牙双钩脱手坠入麦田，贺兰狰喉头发出半声短促咯响，仰面栽倒在滚滚麦浪之中，气绝身亡。'),
      N('风声重归清朗，满坪百姓先是一静，随即爆发出震耳欲聋的欢呼声！'),
    ],
    choices: [
      {
        id: 'hss07_09_next',
        label: '收剑转身，截住正欲抱箱潜逃的「霸天虎」董万金',
        tone: 'primary',
        effects: [openScene('scene_hss07_10', HUASHAN_SIDE07_QUEST_ID)],
      },
    ],
  },

  scene_hss07_10: {
    id: 'scene_hss07_10',
    title: '第十幕 · 废虎夺箱',
    subtitle: '渭北麦坪 · 严惩恶霸',
    mandatory: true,
    beats: [
      N('董万金见倚仗的塞外大杀手竟死于你剑下，吓得魂飞魄散，抱着装满黑契的铁木箱子连滚带爬往大车方向逃窜，嘴里还嘶声叫骂：“我有钱！我给你五百两纹银，放我一条生路！”'),
      P('（冷哼一声，身形如雁掠至其身前，剑脊如电连点其双肩井穴与右腕筋脉）“沾满关中百姓血汗、勾结西夏资敌的脏钱，我华山弟子一文不取！”'),
      N('“咔嚓”两声脆响，董万金一身仗势欺人的粗浅外功尽废，惨叫着瘫软如泥，怀中铁木箱滚落在地，露出厚厚三捆朱红伪契！'),
    ],
    choices: [
      {
        id: 'hss07_10_next',
        label: '当众点燃火把，焚毁百顷阴阳黑契并将董万金移交官府',
        tone: 'gold',
        effects: [openScene('scene_hss07_11', HUASHAN_SIDE07_QUEST_ID)],
      },
    ],
  },

  scene_hss07_11: {
    id: 'scene_hss07_11',
    title: '第十一幕 · 焚契归田',
    subtitle: '渭北麦坪 · 烈焰清浊',
    mandatory: true,
    beats: [
      N('你在麦坪石碾前将三捆盘剥三百户农家的阴阳伪契尽数付之一炬，烈焰腾空化作漫天灰蝶，唯独将那张铁证如山的西夏走私粮单完整封存。'),
      N('不多时，闻讯赶来的京兆府捕头与巡检兵丁飞马而至，见人赃俱获、连塞外凶徒贺兰狰亦已伏诛，当场给董万金戴上铁链枷锁押入囚车，并依大宋防边赏格当场呈上缉奸赏银八十两。'),
      S(SPEAKER_VILLAGE_ELDER, '（携全村老幼跪拜于麦田之前，热泪纵横）“青天大老爷在前，华山侠士在上！若非少侠今日算破黑账、剑斩凶徒，咱们柳林村三百户这个夏天便要家破人亡了！”'),
    ],
    choices: [
      {
        id: 'hss07_11_next',
        label: '连忙扶起周老伯与乡亲，谢绝田产谢礼',
        tone: 'gold',
        effects: [openScene('scene_hss07_12', HUASHAN_SIDE07_QUEST_ID)],
      },
    ],
  },

  scene_hss07_12: {
    id: 'scene_hss07_12',
    title: '第十二幕 · 麦风送侠',
    subtitle: '渭北麦坪 · 丰年安宁',
    mandatory: true,
    beats: [
      N('夕阳西沉，万顷麦浪在晚霞中泛起温润金辉，远处已隐约传来乡亲们欢喜磨镰准备开镰夏收的号子声。'),
      S(SPEAKER_VILLAGE_ELDER, '“少侠执意不肯收乡亲们的粮食银钱，这支【象牙错金百廿赤黑算筹筒】乃小老儿先祖在长安度支司当差时留下的旧物，另有一盒乡里郎中珍藏的【天香断续胶】，请少侠务必收下，也好留作念想！”'),
      N('你接过温润细腻的象牙算筹筒，回望夕阳下安宁丰饶的渭北平原，只觉手中三尺长剑不仅可斩江湖奸邪，更能护得关中万家灯火与岁稔年丰。'),
    ],
    choices: [
      {
        id: 'hss07_12_finish',
        label: '珍重收妥乡民厚意，挥别麦海返归江湖',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 80, reason: '京兆府查获私贩边粮资敌案缉奸赏银' },
          { type: 'addSectContribution', amount: 85 },
          { type: 'giveCombatExp', amount: 1250, reason: '渭北麦海以希夷剑法斩杀双钩鬼哭贺兰狰' },
          { type: 'modifyRenown', delta: 30, reason: '长安渭北拆契护夏收，侠名播于关中' },
          { type: 'modifyChivalry', delta: 30, reason: '焚毁百顷黑契，力护三百户农家生计' },
          { type: 'addArtExp', artId: 'MA-089', amount: 360 },
          { type: 'modifySkill', key: '算术', delta: 1 },
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'giveItem', itemId: 'ITM-CUR-027', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-112', qty: 1 },
          { type: 'completeQuest', questId: HUASHAN_SIDE07_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《渭北麦浪 · 侠剑护夏收》！获纹银 80 两、贡献 85、象牙算筹筒、天香断续胶与《希夷剑法》精进！',
            'success',
            '侠剑护收',
          ),
        ],
      },
    ],
  },
}
