import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_SIDE08_QUEST_ID } from './huashanSideLishanGhostMarketQuest'

const SPEAKER_GHOST_BROKER: StorySpeakerSpec = {
  kind: 'custom',
  name: '墨灯老人',
  title: '骊山地下鬼市古兵牙人',
  factionName: '长安暗市',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_WEI_WUCHANG: StorySpeakerSpec = {
  kind: 'custom',
  name: '魏无常',
  title: '鬼面刀 · 洛阳黑市断金帮副帮主',
  factionName: '断金帮',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_LIAO_ENVOY: StorySpeakerSpec = {
  kind: 'custom',
  name: '耶律玄机',
  title: '大辽南院暗谍密使',
  factionName: '大辽暗谍',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
}

function buildDuanjinRiderNpc(index: 1 | 2): NodeNpc {
  const isFirst = index === 1
  return makeQuestNpc({
    id: isFirst ? 'QUEST_HSS08_DUANJIN_RIDER_1' : 'QUEST_HSS08_DUANJIN_RIDER_2',
    name: isFirst ? '黑煞刀客韩七' : '暗哨刀客马九',
    title: '洛阳黑市断金帮 · 夜哨快骑',
    realm: '二流上品',
    factionName: '断金帮',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: isFirst
      ? '“鬼市里就瞧见你鬼鬼祟祟！敢尾随断金帮办事，留命在松林里吧！”'
      : '“别放跑这只尾巴，砍了喂山狼！”',
    stats: isFirst
      ? { hp: 1760, mp: 1520, agi: 55, res: 41 }
      : { hp: 1720, mp: 1480, agi: 54, res: 40 },
    talents: { bone: 70, comprehension: 52, charm: 28 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-131', move2: 'MA-151' },
    learnedArts: [{ artId: 'MA-140', level: 6 }, { artId: 'MA-131', level: 6 }, { artId: 'MA-151', level: 5 }],
    equipped: { weapon: 'WPN-033' },
    questBadgeLabel: '断金帮夜哨',
  })
}

function buildWeiWuchangNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS08_WEI_WUCHANG',
    name: '魏无常',
    title: '鬼面刀 · 断金帮副帮主',
    realm: '一流中品',
    factionName: '断金帮',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“洛阳金刀门那帮老顽固讲什么侠义道，老子断金帮只认白花花的辽国银锭！接我鬼面修罗刀！”',
    stats: { hp: 3100, mp: 2680, agi: 68, res: 55 },
    talents: { bone: 80, comprehension: 68, charm: 32 },
    equippedArts: { neigong: 'MA-086', move1: 'MA-131', move2: 'MA-151' },
    learnedArts: [{ artId: 'MA-086', level: 7 }, { artId: 'MA-131', level: 8 }, { artId: 'MA-151', level: 7 }],
    equipped: { weapon: 'WPN-019' },
    questBadgeLabel: '鬼面刀',
  })
}

function buildLiaoEnvoyNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS08_LIAO_ENVOY',
    name: '耶律玄机',
    title: '大辽南院暗谍密使',
    realm: '一流中品',
    factionName: '大辽暗谍',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“既被你撞破大辽秘图下落，便只好请华山高徒永远长眠于华清松林了！”',
    stats: { hp: 2960, mp: 2820, agi: 70, res: 54 },
    talents: { bone: 74, comprehension: 80, charm: 56 },
    equippedArts: { neigong: 'MA-085', move1: 'MA-054', move2: 'MA-096' },
    learnedArts: [{ artId: 'MA-085', level: 7 }, { artId: 'MA-054', level: 7 }, { artId: 'MA-096', level: 7 }],
    equipped: { weapon: 'WPN-030' },
    questBadgeLabel: '辽国密使',
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hss08_01: {
    id: 'scene_hss08_01',
    title: '第一幕 · 落雁寒夜',
    subtitle: '华山绝顶论剑台 · 落雁峰顶白玉坛',
    mandatory: true,
    beats: [
      N('{reignYear}夜深露重，落雁峰顶白玉坛寒星如洗。素来冷峻寡言的「潼关剑神」秦烈山独自负剑立于坛边，遥望西方长安灯火，眉宇间罕见地笼着一层苍凉旧色。'),
      N('听见你的步声，秦烈山缓缓转身，取出一幅发黄的旧剑拓纸。'),
      S('NPC-0147', '“夜深未眠，倒是巧了。三十年前我有一位生死莫逆的故友，佩一柄唐代名匠所铸的‘青霜古剑’。当年他随军北巡代州遇伏身亡，此剑便从此音讯杳然。”'),
      S('NPC-0147', '“方才山下暗桩急报，今夜长安骊山脚下的地下鬼市之中，竟有一柄疑似‘青霜古剑’的古兵现世！我身负守峰重责不便轻离华山，你既精擅书画金石鉴赏，可愿代我走这一遭？”'),
    ],
    choices: [
      {
        id: 'hss08_01_accept',
        label: '双手接过古剑拓片，聆听秦前辈细述辨剑暗记',
        tone: 'gold',
        effects: [openScene('scene_hss08_02', HUASHAN_SIDE08_QUEST_ID)],
      },
    ],
  },

  scene_hss08_02: {
    id: 'scene_hss08_02',
    title: '第二幕 · 篆铭木面',
    subtitle: '落雁峰顶白玉坛 · 授面嘱托',
    mandatory: true,
    beats: [
      N('秦烈山递来一张古朴的无表情桐木面具，又以指尖轻点拓片上剑格处的微小铭文。'),
      S('NPC-0147', '“骊山鬼市规矩森严，凡入市者必佩面具、不问来历，市上十柄古剑九柄是做旧赝品。你切记——真正‘青霜古剑’的剑格阴刻秦篆‘青霜’二字，末笔收锋暗藏一缕极细的云雷暗纹，唯有久习书画金石者方能在幽暗灯火下辨清真伪！”'),
      S('NPC-0147', '“若确为真品，无论谁人出价抢购，切不可令其落入奸邪之手。去【长安西市东侧暗坊】寻幽冥灯巷入口吧，万事小心！”'),
      P('“弟子定不负秦前辈重托，今夜便佩面赴长安鬼市一探究竟！”'),
    ],
    choices: [
      {
        id: 'hss08_02_go',
        label: '收妥桐木面具与古剑拓片，连夜赶赴长安西市东侧暗坊',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_SIDE08_QUEST_ID, stepId: 'ghost_market' },
          toast('已开启《骊山鬼市 · 古剑寻踪录》！请前往【长安西市 > 东侧暗坊】夜探地下鬼市！', 'success', '鬼市寻剑'),
        ],
      },
    ],
  },

  scene_hss08_03: {
    id: 'scene_hss08_03',
    title: '第三幕 · 幽冥灯巷',
    subtitle: '长安西市东侧暗坊 · 骊山鬼市入口',
    mandatory: true,
    beats: [
      N('子夜将近，长安西市早已歇市沉寂，唯独东侧一条不起眼的砖砌夹巷深处，挑着两盏涂满绿漆的幽暗纸灯。你戴上秦烈山所赠桐木面具，依暗语叩响石门，沿着潮湿青石阶一路下行。'),
      N('石门豁然洞开，地下竟藏着一座借骊山古渠残洞凿出的偌大黑市！数十张黑布摊位沿着石壁排开，往来客商尽皆佩戴兽面、鬼面或白纸面具，低声交易着来路不明的古玩、秘药与神兵，空气中弥漫着檀香与铁锈交织的诡谲气息。'),
      N('循着剑气与人群低语，你很快在最深处的青铜古鼎旁找到了一名披着灰氅的老牙人——他面前的玄色锦缎上，正并排陈列着三柄寒光森森的古剑！'),
    ],
    choices: [
      {
        id: 'hss08_03_inspect',
        label: '步至黑布摊前，借幽冥灯火细细审视三柄古剑',
        tone: 'primary',
        effects: [openScene('scene_hss08_04', HUASHAN_SIDE08_QUEST_ID)],
      },
    ],
  },

  scene_hss08_04: {
    id: 'scene_hss08_04',
    title: '第四幕 · 鬼市辨剑',
    subtitle: '骊山地下鬼市 · 金石识真',
    illustrationUrl: '/assets/quests/hs_side08_ghost_market.jpg',
    illustrationCaption: '鬼市辨剑 · 佩面夜探骊山地下鬼市，火光幽冥中识得青霜古剑',
    mandatory: true,
    beats: [
      S(SPEAKER_GHOST_BROKER, '（嘶哑冷笑）“这位木面客官好眼力。这三柄皆是自代州古战场掘出的唐代青霜名锋，只许看、不许试刃，看中了哪一柄，出价便是。”'),
      N('幽绿灯火摇曳不定。左首之剑金丝镶玉、寒光耀眼，却隐隐泛着新涂酸矾做旧的刺鼻气味；右首之剑铭文粗豪，细看篆笔转折呆板生硬；唯独居中的一柄看似灰扑扑毫不起眼，剑鞘包铜斑驳，可凑近一寸，便见剑格阴刻秦篆「青霜」末笔处隐隐藏着一丝浑然天成的唐风云雷暗纹！'),
    ],
    choices: [
      {
        id: 'hss08_04_pick_true',
        label: '【书画鉴真】认准居中灰鞘古剑的秦篆末笔与云雷暗纹，正欲开口议价！',
        subLabel: '识破两柄赝品，锁定真正的「青霜古剑」',
        tone: 'gold',
        effects: [openScene('scene_hss08_05', HUASHAN_SIDE08_QUEST_ID)],
      },
    ],
  },

  scene_hss08_05: {
    id: 'scene_hss08_05',
    title: '第五幕 · 鬼面截胡',
    subtitle: '骊山地下鬼市 · 断金帮现身',
    mandatory: true,
    beats: [
      N('你方才抬手欲指居中那柄真剑，身侧忽然掠过一阵阴冷刀风！一只铁铸般的大手抢先抓起青霜古剑，随即“砰”地将一只沉甸甸的乌木银箱砸在黑布摊上，箱盖震开，赫然滚出整整二十锭刻着契丹官印的大辽雪花银！'),
      S(SPEAKER_WEI_WUCHANG, '（戴着一张青铜狰狞鬼面，发出桀桀怪笑）“这柄破铜烂铁，我们洛阳地下黑市‘断金帮’替贵客包圆了！识相的木面小子，滚一边凉快去！”'),
      N('站在鬼面大汉身旁的，是一名身着暗紫织金胡袍、面戴银狐面具的瘦削男子。他轻抚青霜古剑那枚中空青玉剑首，眼中闪过一抹阴毒喜色，用略带契丹口音的官话低声道：“不错，正是它！速离鬼市，去华清后山松林交割！”'),
    ],
    choices: [
      {
        id: 'hss08_05_shadow',
        label: '不动声色压住剑意，趁鬼市人群散乱暗中尾随其后',
        tone: 'primary',
        effects: [openScene('scene_hss08_06', HUASHAN_SIDE08_QUEST_ID)],
      },
    ],
  },

  scene_hss08_06: {
    id: 'scene_hss08_06',
    title: '第六幕 · 暗闻秘图',
    subtitle: '长安城外夜道 · 追踪辽使',
    mandatory: true,
    beats: [
      N('你施展华山轻功借着夜色与山石掩护，远远缀在魏无常与银狐面具辽使身后，一路奔出鬼市直往华清后山松林而去。'),
      N('行至一处背风坡口，山风将二人的低语断续送入你耳中——原来这伙「断金帮」乃是盘踞洛阳地下黑市的亡命私枭，专干倒卖军械古物的肮脏勾当，与正道侠义的洛阳金刀门毫无瓜葛！而那名辽国密使重金寻觅「青霜古剑」，竟是因为剑首暗格之中，藏着三十年前大宋北疆代州边防暗道秘图！'),
      P('（心中一凛）“绝不能让大宋北疆边防秘图落入大辽密使之手！速去【草堂寺东侧华清后山松林】截剑！”'),
    ],
    choices: [
      {
        id: 'hss08_06_go',
        label: '提气疾掠，抢赴草堂寺东侧华清后山松林截击',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_SIDE08_QUEST_ID, 'pine_intercept'),
          toast('已查明辽使图谋！请速赴【草堂寺 > 东侧松林】截回「青霜古剑」！', 'talk', '松林夜追'),
        ],
      },
    ],
  },

  scene_hss08_07: {
    id: 'scene_hss08_07',
    title: '第七幕 · 松林夜哨',
    subtitle: '草堂寺东侧华清后山松林 · 断金骑哨',
    mandatory: true,
    beats: [
      N('冷月高悬，华清后山百亩老松在夜风中发出阵阵涛声。你甫一踏入林间古道，两棵合抱粗的松树背后骤然闪出两名手执金背大刀的黑衣悍匪，正是断金帮留在外围放风的快骑夜哨！'),
      N('两名刀客冷笑一声，挥刀封住林道：“鬼市里就瞧见你鬼鬼祟祟！今夜副帮主与贵客有要事交割，谁敢靠近松林半步，格杀勿论！”'),
    ],
    choices: [
      {
        id: 'hss08_07_next',
        label: '不再藏形，扯下桐木面具拔剑迎击两名断金帮夜哨！',
        tone: 'danger',
        effects: [openScene('scene_hss08_08', HUASHAN_SIDE08_QUEST_ID)],
      },
    ],
  },

  scene_hss08_08: {
    id: 'scene_hss08_08',
    title: '第八幕 · 斩哨破林',
    subtitle: '华清后山松林 · 激战断金帮骑哨',
    mandatory: true,
    beats: [
      P('“勾结契丹密使、倒卖大宋故将遗剑，你等黑市鼠辈也配阻我华山长剑？！”'),
      N('两名断金帮夜哨暴喝一声，左右夹击劈来！'),
    ],
    choices: [
      {
        id: 'hss08_08_fight',
        label: '疾剑破刀，连斩两名断金帮夜哨！',
        subLabel: '生死决战 · 断金帮夜哨快骑（二流上品 ×2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_SIDE08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildDuanjinRiderNpc(1) },
            extraOpponents: [{ kind: 'custom', npc: buildDuanjinRiderNpc(2) }],
            rule: 'duel',
            forbidEscapeReason: '再耽搁片刻，辽国密使便要携青霜古剑遁出关中！',
            deathTitle: '陨身华清松林',
            deathDetail: '你在华清后山松林截击断金帮夜哨时不慎遭夹击重创，未能夺回古剑。',
            onWin: [openScene('scene_hss08_09', HUASHAN_SIDE08_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss08_09: {
    id: 'scene_hss08_09',
    title: '第九幕 · 鬼面辽使',
    subtitle: '华清后山松林深处 · 双邪合璧',
    mandatory: true,
    beats: [
      N('剑光闪落，两名断金帮夜哨相继倒地。你提剑疾冲入林间空地，只见冷月清辉洒在断碑之前，「鬼面刀」魏无常正将青霜古剑递向辽国密使耶律玄机！'),
      S(SPEAKER_WEI_WUCHANG, '（摘下青铜鬼面，露出一张横贯刀疤的阴狠面孔）“原来是华山派的小崽子！嘿，江湖上总把我们洛阳黑市断金帮误认作什么正道金刀门，老子可不吃侠义那一套——辽国大人给的银子够买你十条命！”'),
      S(SPEAKER_LIAO_ENVOY, '（缓缓合拢手中宣德紫金铁骨扇，袖中寒芒微吐）“魏帮主，此人既知晓剑首密图，便休要留活口了。你我二人联手，速战速决！”'),
    ],
    choices: [
      {
        id: 'hss08_09_boss',
        label: '长剑斜指冷月，孤身直面魏无常与耶律玄机双雄联手！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_SIDE08_QUEST_ID, 'pine_boss'),
          openScene('scene_hss08_10', HUASHAN_SIDE08_QUEST_ID),
        ],
      },
    ],
  },

  scene_hss08_10: {
    id: 'scene_hss08_10',
    title: '第十幕 · 松林截剑',
    subtitle: '华清后山冷月松林 · 孤剑力战双邪',
    illustrationUrl: '/assets/quests/hs_side08_pine_intercept.jpg',
    illustrationCaption: '松林截剑 · 华清后山冷月下孤剑力战断金帮副帮主与辽国密使',
    mandatory: true,
    beats: [
      N('寒月如霜，松影幢幢！魏无常挥舞修罗斩马刀正面狂劈，刀势凶厉霸道；辽国密使耶律玄机则如鬼魅般游走侧翼，铁骨扇点穴与漫天寒星暗器交替袭来，一刚一柔配合得天衣无缝！'),
      P('（深吸一口冷冽松风，剑尖嗡鸣不止）“华山剑客孤身赴险，岂惧尔等卖国私枭与契丹暗谍？今日这柄青霜古剑，我带定了！”'),
    ],
    choices: [
      {
        id: 'hss08_10_duel',
        label: '冷月孤剑破双邪，决战魏无常与耶律玄机！',
        subLabel: '生死决战 · 「鬼面刀」魏无常 + 辽国密使耶律玄机（一流中品 ×2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_SIDE08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildWeiWuchangNpc() },
            extraOpponents: [{ kind: 'custom', npc: buildLiaoEnvoyNpc() }],
            rule: 'duel',
            forbidEscapeReason: '孤剑截敌于冷月松林，退则边防秘图尽落契丹之手！',
            deathTitle: '剑折华清冷月',
            deathDetail: '你在华清后山松林力战鬼面刀魏无常与辽国密使耶律玄机，终因寡不敌众力竭阵亡。',
            onWin: [openScene('scene_hss08_11', HUASHAN_SIDE08_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss08_11: {
    id: 'scene_hss08_11',
    title: '第十一幕 · 秘图重见',
    subtitle: '华清后山松林 · 完壁归赵',
    mandatory: true,
    beats: [
      N('剑气纵横破空，数株老松枝叶被劲风削落如雨！你先以巧劲震飞耶律玄机暗器、一剑贯其肩胛将其格杀，复回身迎着魏无常垂死反扑的重刀顺势滑锋，透胸而过！'),
      N('林间重归寂静，唯余松涛呜咽。你俯身拾起掉落在青苔上的「青霜古剑」，试着轻轻旋动剑首青玉暗扣——“咔嗒”一声轻响，一卷封以火漆、保存完好的羊皮《代州北疆边防暗道图》赫然显露！'),
      P('（长舒一口气，重新旋紧剑首暗扣）“幸好及时截住！若是这幅边防秘图传回大辽南院，代州边军不知要遭多大暗算。”'),
    ],
    choices: [
      {
        id: 'hss08_11_next',
        label: '以锦缎仔细裹好青霜古剑，连夜启程返回华山',
        tone: 'gold',
        effects: [openScene('scene_hss08_12', HUASHAN_SIDE08_QUEST_ID)],
      },
    ],
  },

  scene_hss08_12: {
    id: 'scene_hss08_12',
    title: '第十二幕 · 踏晓归峰',
    subtitle: '华清后山松林 · 拂晓还剑',
    mandatory: true,
    beats: [
      N('你在林中略作调息，又从辽使行囊中清点出官府悬赏契丹暗谍的印信凭据与一尊辽使原欲用来贿赂黑市头目的耀州窑青釉博山炉，遂借着微明晨光一路疾驰返归潼关西岳。'),
      N('想到落雁峰顶那位守望三十年的剑神前辈，你脚下轻功愈发轻快。'),
    ],
    choices: [
      {
        id: 'hss08_12_return',
        label: '携「青霜古剑」返登落雁峰顶白玉坛，向秦烈山复命',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_SIDE08_QUEST_ID, 'return_qin'),
          toast('已夺回「青霜古剑」！请返回【华山绝顶论剑台 > 落雁峰顶白玉坛】奉还秦烈山！', 'success', '夺剑凯旋'),
        ],
      },
    ],
  },

  scene_hss08_13: {
    id: 'scene_hss08_13',
    title: '第十三幕 · 白玉还锋',
    subtitle: '华山绝顶论剑台 · 落雁峰顶白玉坛',
    illustrationUrl: '/assets/quests/hs_side08_return_sword.jpg',
    illustrationCaption: '白玉还锋 · 落雁峰白玉坛双手奉还青霜古剑，秦烈山抚剑动容',
    mandatory: true,
    beats: [
      N('朝阳初升，落雁峰顶白玉坛云霞漫卷。秦烈山仍立于白玉坛前，似乎整夜未曾阖眼。见你风尘仆仆而来、双手捧上一柄灰鞘斑驳的古剑，向来冷硬如铁的「潼关剑神」竟微微一震。'),
      P('（躬身双手奉剑）“秦前辈，弟子幸不辱命！已在骊山鬼市辨明真剑，并连夜于华清松林截杀洛阳黑市断金帮副帮主与大辽密使，将‘青霜古剑’连同剑首中藏匿的代州边防秘图一并完壁归赵！”'),
      N('秦烈山缓缓拔剑出鞘三寸，一泓秋水般的青霜寒光映照着他微霜的鬓角。他轻抚剑格上那枚秦篆「青霜」与云雷暗纹，良久无言，眼中罕见地泛起一抹深沉动容之色。'),
    ],
    choices: [
      {
        id: 'hss08_13_next',
        label: '垂首静立，陪秦前辈祭奠三十年前的故友英灵',
        tone: 'gold',
        effects: [openScene('scene_hss08_14', HUASHAN_SIDE08_QUEST_ID)],
      },
    ],
  },

  scene_hss08_14: {
    id: 'scene_hss08_14',
    title: '第十四幕 · 宗师指点',
    subtitle: '落雁峰顶白玉坛 · 剑理相酬',
    mandatory: true,
    beats: [
      S('NPC-0147', '“老友啊，三十年漂泊异乡，你终于回家了……至于那卷代州秘图，我会亲自密交陕西经略司销毁归档，绝不负他当年以死护图之志。”'),
      S('NPC-0147', '（转望向你，神色肃然温和了许多）“你此行不惟眼力过人，更能在冷月松林孤剑连破两大一流强敌，这份胆识与剑骨，足以令华山生辉！这尊【耀州窑青釉刻牡丹三足博山炉】与【太医局紫雪神丹】你且收下，再听我为你点拨半个时辰本门精义！”'),
      N('秦烈山顺势依你所修气剑支脉，以青霜古剑在白玉坛上虚划数道玄奥剑意。你细细体悟，只觉胸中内息与剑路豁然贯通，获益匪浅！'),
    ],
    choices: [
      {
        id: 'hss08_14_finish',
        label: '拜谢秦前辈厚赐与点拨，铭记白玉还锋之谊',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 95, reason: '斩杀大辽密使与断金帮首恶官府暗赏' },
          { type: 'addSectContribution', amount: 95 },
          { type: 'giveCombatExp', amount: 1450, reason: '华清松林冷月孤剑力战魏无常与辽使' },
          { type: 'modifyRenown', delta: 30, reason: '夜探骊山鬼市截杀辽使，完壁归还青霜古剑' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0147' }, delta: 20 },
          { type: 'modifySkill', key: '画', delta: 1 },
          { type: 'giveItem', itemId: 'ITM-CUR-023', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-113', qty: 1 },
          {
            type: 'branch',
            condition: flag('hs_branch', 'eq', 'qi'),
            thenEffects: [{ type: 'addArtExp', artId: 'MA-058', amount: 400 }],
            elseEffects: [{ type: 'addArtExp', artId: 'MA-068', amount: 400 }],
          },
          { type: 'completeQuest', questId: HUASHAN_SIDE08_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《骊山鬼市 · 古剑寻踪录》！获纹银 95 两、贡献 95、耀州窑博山炉、紫雪神丹与宗师指点！',
            'success',
            '白玉还锋',
          ),
        ],
      },
    ],
  },
}
