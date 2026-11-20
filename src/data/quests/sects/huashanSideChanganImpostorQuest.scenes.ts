import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_SIDE04_QUEST_ID } from './huashanSideChanganImpostorQuest'

const SPEAKER_TEA_BOSS: StorySpeakerSpec = {
  kind: 'custom',
  name: '老周头',
  title: '明德门茶棚掌柜',
  factionName: '长安市井',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_MERCHANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '王客商',
  title: '关中丝绸行商',
  factionName: '长安商旅',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

const SPEAKER_LIU_CANYANG: StorySpeakerSpec = {
  kind: 'custom',
  name: '柳残阳',
  title: '断魂剑 · 冒牌捉刀杀手',
  factionName: '江湖黑道',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_YAMEN_OFFICER: StorySpeakerSpec = {
  kind: 'custom',
  name: '韩捕头',
  title: '京兆府缉捕都头',
  factionName: '京兆府衙',
  portraitUrl: '/assets/characters/templates/tpl_liushenmen_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_liushenmen_male_av.jpg',
}

function buildImpostorThug1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS04_THUG_1',
    name: '冷面胡三',
    title: '西市废园暗桩打手',
    realm: '二流下品',
    factionName: '江湖黑道',
    sectRank: 0,
    sectRankLabel: '黑道打手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“柳爷正数银子呢，哪来不懂规矩的野猫敢闯废园！”',
    stats: { hp: 820, mp: 360, agi: 36, res: 22 },
    talents: { bone: 56, comprehension: 44, charm: 30 },
    equippedArts: { neigong: 'MA-229', qinggong: 'MA-198', move1: 'MA-151', move2: 'MA-132' },
    learnedArts: [
      { artId: 'MA-229', level: 5 },
      { artId: 'MA-198', level: 4 },
      { artId: 'MA-151', level: 4 },
      { artId: 'MA-132', level: 4 },
    ],
  })
}

function buildImpostorThug2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS04_THUG_2',
    name: '铁钩钱九',
    title: '西市废园暗桩打手',
    realm: '二流下品',
    factionName: '江湖黑道',
    sectRank: 0,
    sectRankLabel: '黑道打手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“管他是真华山还是假华山，进了这座院子就别想活着出去！”',
    stats: { hp: 860, mp: 380, agi: 38, res: 24 },
    talents: { bone: 58, comprehension: 45, charm: 32 },
    equippedArts: { neigong: 'MA-229', qinggong: 'MA-198', move1: 'MA-146', move2: 'MA-151' },
    learnedArts: [
      { artId: 'MA-229', level: 5 },
      { artId: 'MA-198', level: 4 },
      { artId: 'MA-146', level: 4 },
      { artId: 'MA-151', level: 4 },
    ],
  })
}

function buildLiuCanyangBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS04_LIU_CANYANG',
    name: '柳残阳',
    title: '断魂剑 · 冒牌捉刀杀手',
    realm: '二流上品',
    factionName: '江湖黑道',
    sectRank: 0,
    sectRankLabel: '黑道捉刀客',
    avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
    talk: '“老子偷学过几年华山旧谱，杀完人留个华山名号，官府和苦主谁敢查到我头上？今日你也一并留下吧！”',
    stats: { hp: 1620, mp: 840, agi: 56, res: 36 },
    talents: { bone: 70, comprehension: 66, charm: 48 },
    equippedArts: {
      neigong: 'MA-100',
      qinggong: 'MA-138',
      move1: 'MA-147',
      move2: 'MA-128',
      move3: 'MA-110',
    },
    learnedArts: [
      { artId: 'MA-100', level: 6 },
      { artId: 'MA-138', level: 6 },
      { artId: 'MA-147', level: 6 },
      { artId: 'MA-128', level: 6 },
      { artId: 'MA-110', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hss04_01: {
    id: 'scene_hss04_01',
    title: '第一幕 · 旧棚夜雨',
    subtitle: '长安 · 明德门丝路迎宾栈',
    mandatory: true,
    beats: [
      N('{reignYear}秋夜细雨绵绵，灯笼在湿润的青石街面上拉出昏黄倒影。你因公重临长安明德门丝路迎宾栈，檐下茶棚炉火正旺，恍惚间又想起当初在此初遇华山机缘的旧日情景。'),
      N('刚要叫上一壶热茶驱寒，邻桌几名丝绸客商压低嗓音的议论却字字钻入耳中。'),
      S(SPEAKER_MERCHANT, '“嘘！小声些！听说城西绸缎庄的李东家昨夜被人一剑封喉，凶手临走还在粉墙上刻了个『华山』剑印！都说是西岳华山派的内门弟子收了黑银替人捉刀杀人呢！”'),
      S(SPEAKER_TEA_BOSS, '（一边擦着茶碗，一边连连摇头叹气）“造孽啊！往年华山派的侠客在咱们关中口碑极好，怎的近半月长安城连出三起『华山剑客』买凶灭口案？闹得京兆府衙都贴了海捕文书！”'),
    ],
    onFinishEffects: [openScene('scene_hss04_02', HUASHAN_SIDE04_QUEST_ID)],
  },

  scene_hss04_02: {
    id: 'scene_hss04_02',
    title: '第二幕 · 明德暗访',
    subtitle: '明德门秋雨茶棚',
    illustrationUrl: '/assets/quests/hs_side04_mingde_inquiry.jpg',
    illustrationCaption: '明德暗访 · 重临长安明德门秋雨茶棚，细察假冒华山剑客血案',
    mandatory: true,
    beats: [
      N('你心中一凛，强压怒意，不动声色地提壶为老周头与王客商添满热茶，放缓语调旁敲侧击起来。'),
      P('“两位兄台所言当真？在下素闻华山门规森严，凡内门弟子佩剑皆有西岳玉女峰暗纹，且绝无收银捉刀之理。不知昨夜目击那凶手者，可曾看清他的相貌与剑路？”'),
      S(SPEAKER_MERCHANT, '（见你气度温润、言辞有理，顿时打开了话匣子）“听说更夫远远瞥见一眼——那厮身着青布长袍，腰悬一块粗糙木牌，出剑快则快矣，却专往死穴下毒手，收剑时还带着一股阴狠戾气！”'),
      S(SPEAKER_TEA_BOSS, '（凑近压低声音）“客官既问得这般细，老汉多句嘴：前日亥时雨夜，有个浑身血腥气、背着黑布剑囊的独行客来我棚里买过两斤烧刀子，付的正是西市当铺才流出来的剪边碎银，临走往大西市西坊那片荒废老宅去了！”'),
    ],
    onFinishEffects: [openScene('scene_hss04_03', HUASHAN_SIDE04_QUEST_ID)],
  },

  scene_hss04_03: {
    id: 'scene_hss04_03',
    title: '第三幕 · 辨伪析真',
    subtitle: '明德门茶棚灯下',
    mandatory: true,
    beats: [
      N('你将茶棚所获线索在心中细细梳理：伪造木牌、戾气剑路、西市碎银、荒废老宅——此人定是熟知华山外貌规制的江湖黑道捉刀客，故意嫁祸西岳以掩人耳目！'),
    ],
    choices: [
      {
        id: 'hss04_deduce_swift',
        label: '“此贼既常在大西市西坊废园分赃落脚，今夜秋雨掩迹，正是捉拿人赃并获之良机！”',
        subLabel: '当机立断，直扑大西市西坊废园',
        tone: 'gold',
        effects: [openScene('scene_hss04_04', HUASHAN_SIDE04_QUEST_ID)],
      },
      {
        id: 'hss04_deduce_cautious',
        label: '“先谢过周掌柜指点，切勿打草惊蛇，待在下孤身潜入西坊废园查明实据再报官府！”',
        subLabel: '沉着布局，确保人赃俱获',
        tone: 'jade',
        effects: [openScene('scene_hss04_04', HUASHAN_SIDE04_QUEST_ID)],
      },
    ],
  },

  scene_hss04_04: {
    id: 'scene_hss04_04',
    title: '第四幕 · 踏雨寻踪',
    subtitle: '长安明德门外',
    mandatory: true,
    beats: [
      N('你留下茶钱，披上油布斗笠没入秋雨夜色。清誉关乎西岳百年基业，绝不能容这冒牌恶徒再多害一人！'),
    ],
    choices: [
      {
        id: 'hss04_start_track',
        label: '提剑踏雨，赶赴长安大西市西坊废园缉拿真凶',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_SIDE04_QUEST_ID, stepId: 'track_ruined_yard' },
          setStep(HUASHAN_SIDE04_QUEST_ID, 'track_ruined_yard'),
          toast('已探明真凶藏身处！请前往【长安 · 长安大西市 · 西坊（ca_xishi_west）】废园擒凶！', 'talk', '明德暗访'),
        ],
      },
    ],
  },

  scene_hss04_05: {
    id: 'scene_hss04_05',
    title: '第五幕 · 废园分赃',
    subtitle: '长安大西市 · 西坊废园',
    mandatory: true,
    beats: [
      N('大西市西坊深处，一座残垣断壁的荒废宅院掩映在枯柳雨幕之中。你施展轻功悄然伏于矮墙之上，只见破败正厅内点着一盏昏暗油灯。'),
      N('一名面容阴鸷、身着仿制华山青袍的中年剑客正用绸帕慢条斯理地擦拭长剑血渍，案上摆着两包官银、数张沾血的买凶契书，以及一块拙劣仿刻的华山内门木牌！'),
      S(SPEAKER_LIU_CANYANG, '（冷笑将一锭碎银抛给身旁两名黑衣打手）“胡三、钱九，李东家这单活儿干得利落！墙上那道『华山』剑印一留，京兆府那群庸官只会去潼关找岳沧溟的晦气，谁能猜到是老子『断魂剑』柳残阳干的？”'),
      P('（冷喝一声，翻身跃入庭院，青钢剑直指破厅）“好一个『断魂剑』柳残阳！借我华山名号作奸犯科，今日便叫你人赃并获！”'),
    ],
    onFinishEffects: [openScene('scene_hss04_06', HUASHAN_SIDE04_QUEST_ID)],
  },

  scene_hss04_06: {
    id: 'scene_hss04_06',
    title: '第六幕 · 恶奴扑杀',
    subtitle: '西市废园庭院（车轮连战 实战）',
    mandatory: true,
    beats: [
      S(SPEAKER_LIU_CANYANG, '（神色微变，旋即狞笑后退半步）“哟，竟真引来一个华山正主！胡三、钱九，替老子剁了这多管闲事的小辈，赏银加倍！”'),
      N('两名二流下品黑道打手闻声暴起，挥舞鬼头大刀与精钢铁钩冒雨猛扑而来！'),
    ],
    choices: [
      {
        id: 'hss04_fight_thugs',
        label: '拔剑迎敌，先斩断柳残阳左右爪牙！（车轮连战 生死战）',
        subLabel: '对手：冷面胡三与铁钩钱九（二流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_SIDE04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildImpostorThug1() },
            extraOpponents: [{ kind: 'custom', npc: buildImpostorThug2() }],
            rule: 'duel',
            lethalOnLose: true,
            forbidEscapeReason: '恶徒已堵死院门，唯有一战到底方能擒凶！',
            deathTitle: '血染西市废园',
            deathDetail: '你在长安大西市西坊废园被黑道打手围攻力竭，饮恨秋雨之中。',
            introText: '【车轮连战 · 废园扫恶】迎战二流下品黑道打手【冷面胡三】与【铁钩钱九】！',
            onWin: [openScene('scene_hss04_07', HUASHAN_SIDE04_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss04_07: {
    id: 'scene_hss04_07',
    title: '第七幕 · 跃脊遁逃',
    subtitle: '西市废园飞檐瓦脊',
    mandatory: true,
    beats: [
      N('你剑光如电，十余合便将胡三与钱九击倒在泥水之中哀嚎不起。回头望去，柳残阳见势不妙，一把抄起案上银两与买凶契书，纵身撞破窗棂跃上了湿滑屋脊！'),
      S(SPEAKER_LIU_CANYANG, '“小辈好俊的华山剑法！不过这秋雨屋脊，可不是你们名门正派撒野的地方！”'),
      P('（足尖点地凌空拔起，稳稳落于正脊青瓦之上，拦住其去路）“偷学几招半式华山旧谱，便敢败坏西岳百年清誉？放下契书，随我去京兆府衙领罪！”'),
    ],
    onFinishEffects: [openScene('scene_hss04_08', HUASHAN_SIDE04_QUEST_ID)],
  },

  scene_hss04_08: {
    id: 'scene_hss04_08',
    title: '第八幕 · 雨脊擒凶',
    subtitle: '长安废园雨夜瓦脊（1v1 实战）',
    illustrationUrl: '/assets/quests/hs_side04_rooftop_capture.jpg',
    illustrationCaption: '雨脊擒凶 · 长安废园瓦脊正面震碎断魂剑柳残阳兵刃将其生擒',
    mandatory: true,
    beats: [
      N('秋雨顺着青瓦倾泻而下，雷光掠过长安夜空。柳残阳眼中杀机毕露，长剑抖出一片诡谲阴毒的变种华山剑花，直刺你胸前要害！'),
      N('你长剑横胸，浩然剑意勃发，誓以正统西岳剑道彻底粉碎这冒牌捉刀客的邪气！'),
    ],
    choices: [
      {
        id: 'hss04_fight_liu',
        label: '正统剑道对邪剑，于雨夜瓦脊生擒「断魂剑」柳残阳！（1v1 生死战）',
        subLabel: '对手：二流上品冒牌剑客柳残阳',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_SIDE04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLiuCanyangBoss() },
            rule: 'duel',
            lethalOnLose: true,
            forbidEscapeReason: '瓦脊狭路相逢，若纵虎归山则华山冤屈难雪！',
            deathTitle: '陨落长安秋雨',
            deathDetail: '你在长安废园雨夜瓦脊与「断魂剑」柳残阳死斗落败，坠瓦身亡。',
            introText: '【1v1 雨脊擒凶】迎战二流上品冒牌捉刀客【断魂剑 · 柳残阳】！',
            onWin: [openScene('scene_hss04_09', HUASHAN_SIDE04_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss04_09: {
    id: 'scene_hss04_09',
    title: '第九幕 · 震碎邪锋',
    subtitle: '长安废园瓦脊',
    mandatory: true,
    beats: [
      N('柳残阳的剑法虽夹杂着当年偷学来的几分华山架势，却只重狠辣刁钻、毫无浩然正气可言。激斗二十余合后，你已彻底看穿其剑势虚浮之弊！'),
      N('趁他一式邪剑刺空、中门大开之刹那，你凝足丹田真气，一招堂堂正正的华山剑诀顺脊压进！“咔嚓”一声脆响，柳残阳手中精钢长剑竟被你沛然正气正面震断为两截！'),
      S(SPEAKER_LIU_CANYANG, '（虎口崩裂鲜血直流，踉跄滚落屋檐摔进院中泥潭，惨叫求饶）“啊！我的剑！正统华山内劲怎会如此浑厚……少侠饶命，别杀我！”'),
    ],
    onFinishEffects: [openScene('scene_hss04_10', HUASHAN_SIDE04_QUEST_ID)],
  },

  scene_hss04_10: {
    id: 'scene_hss04_10',
    title: '第十幕 · 人赃俱获',
    subtitle: '西市废园庭院',
    mandatory: true,
    beats: [
      N('你跃下瓦脊，一脚踩住柳残阳断剑，反手点中其穴道，从其怀中搜出那块伪造的华山木牌、买凶血契以及三起命案苦主的失物。'),
      P('“留你性命，正是要押你上京兆府公堂亲口画押招认，还我西岳华山清白！”'),
    ],
    choices: [
      {
        id: 'hss04_go_yamen',
        label: '押解柳残阳与人证物证，前往京兆府衙报案雪冤',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_SIDE04_QUEST_ID, 'deliver_yamen'),
          toast('已生擒「断魂剑」柳残阳！请押赴【长安 · 京兆府衙（changan_base_yamen）】当堂雪冤。', 'success', '雨脊擒凶'),
        ],
      },
    ],
  },

  scene_hss04_11: {
    id: 'scene_hss04_11',
    title: '第十一幕 · 公堂雪冤',
    subtitle: '长安 · 京兆府衙',
    mandatory: true,
    beats: [
      N('黎明微曦，你押着五花大绑的柳残阳步入京兆府衙，将伪造木牌、买凶血契与断剑一一呈上公案。值堂的韩捕头与府尹推官连夜提审，铁证如山之下，柳残阳只得哭嚎着尽数招认嫁祸华山派的罪行！'),
      S(SPEAKER_YAMEN_OFFICER, '（起身向你郑重抱拳，神色敬佩）“多亏{gender:少侠|女侠}连夜孤身缉凶！先前府衙听信流言，险些误会了西岳华山名门正派。本府这就即刻张贴安民告示，将『断魂剑』柳残阳冒名行凶一案昭告长安四坊！”'),
      P('“真相大白便好。华山派虽远在西岳，亦不容鼠辈借本门名义涂炭关中黎民。”'),
    ],
    onFinishEffects: [openScene('scene_hss04_12', HUASHAN_SIDE04_QUEST_ID)],
  },

  scene_hss04_12: {
    id: 'scene_hss04_12',
    title: '第十二幕 · 清誉重昭',
    subtitle: '京兆府衙门前长街',
    mandatory: true,
    beats: [
      N('雨歇云散，长安朱雀长街上早已围满了看告示的百姓与商旅，听闻真凶竟是假冒华山名号的捉刀客且已被华山弟子亲手生擒，纷纷交口称赞西岳侠义。'),
      N('韩捕头奉上京兆府缉凶花红与府库珍藏的嵩山少林小还丹、边军金创药，华山驻长安弟子亦将此事飞鸽传书禀报玉女峰。你经此雨夜破邪，对《养吾剑法》中「浩然养正」四字愈发豁然贯通。'),
    ],
    choices: [
      {
        id: 'hss04_complete',
        label: '拱手辞别京兆府衙，收下缉凶赏赐（完成支线）',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 55, reason: '京兆府缉拿捉刀凶徒花红赏银' },
          { type: 'addSectContribution', amount: 60 },
          { type: 'giveCombatExp', amount: 750, reason: '长安废园雨脊生擒二流上品柳残阳' },
          { type: 'modifyRenown', delta: 25, reason: '亲擒冒牌捉刀客为华山派洗清长安冤名' },
          { type: 'modifyChivalry', delta: 25, reason: '为长安苦主伸冤除暴' },
          { type: 'addArtExp', artId: 'MA-147', amount: 300 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-111', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-121', qty: 2 },
          { type: 'completeQuest', questId: HUASHAN_SIDE04_QUEST_ID },
          toast('已完成《明德秋雨 · 长安捉刀客》！威望、侠义与《养吾剑法》修为大进！', 'success', '明德暗访'),
        ],
      },
    ],
  },
}
