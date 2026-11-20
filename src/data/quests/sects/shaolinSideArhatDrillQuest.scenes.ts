import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE11_QUEST_ID } from './shaolinSideArhatDrillQuest'

const SPEAKER_HAMMER_BOSS: StorySpeakerSpec = {
  kind: 'custom',
  name: '铁锤霸',
  title: '嵩山绿林狂徒首领',
  factionName: '嵩山绿林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_BRUTE_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '独眼狼',
  title: '绿林狂徒',
  factionName: '嵩山绿林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildIronHammerTyrant(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS11_HAMMER_TYRANT',
    name: '铁锤霸',
    title: '嵩山绿林狂徒 · 铁锤霸',
    realm: '二流上品',
    factionName: '嵩山绿林',
    sectRank: 0,
    sectRankLabel: '绿林狂徒',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“哈哈哈哈！什么天下第一少林罗汉阵，不过一群拿齐眉棍的娃娃兵！吃老子百斤镔铁双锤，砸烂你们这块招牌！”',
    stats: { hp: 1780, mp: 1420, agi: 51, res: 44 },
    talents: { bone: 74, comprehension: 44, charm: 26 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-152', move2: 'MA-124' },
    learnedArts: [{ artId: 'MA-140', level: 6 }, { artId: 'MA-152', level: 6 }, { artId: 'MA-124', level: 6 }],
  })
}

function buildBruteMinion1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS11_BRUTE_1',
    name: '独眼狼',
    title: '嵩山绿林狂徒',
    realm: '二流下品',
    factionName: '嵩山绿林',
    sectRank: 0,
    sectRankLabel: '绿林悍匪',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“大哥砸正面，兄弟们拆了这破罗汉阵的两翼！”',
    stats: { hp: 1020, mp: 760, agi: 43, res: 28 },
    talents: { bone: 58, comprehension: 40, charm: 22 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-131', move2: 'MA-236' },
    learnedArts: [{ artId: 'MA-140', level: 4 }, { artId: 'MA-131', level: 4 }, { artId: 'MA-236', level: 4 }],
  })
}

function buildBruteMinion2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS11_BRUTE_2',
    name: '黑熊精',
    title: '嵩山绿林狂徒',
    realm: '二流下品',
    factionName: '嵩山绿林',
    sectRank: 0,
    sectRankLabel: '绿林悍匪',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“谁敢挡铁锤大哥的路，一棒子扫断他腿骨！”',
    stats: { hp: 1060, mp: 740, agi: 41, res: 30 },
    talents: { bone: 60, comprehension: 38, charm: 20 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-152', move2: 'MA-236' },
    learnedArts: [{ artId: 'MA-140', level: 4 }, { artId: 'MA-152', level: 4 }, { artId: 'MA-236', level: 4 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls11_01: {
    id: 'scene_sls11_01',
    title: '第一幕 · 顽徒难驯',
    subtitle: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('{reignYear}秋风掠过少室山，十八铜人罗汉堂演武正殿内喝声震天，却显得颇为杂乱。只见几名年轻气盛的护院武僧各舞齐眉棍互相抢位，险些自己绊倒自己；罗汉堂慧字辈首徒慧轮立于阶前，看得直摇头。'),
      S('NPC-0769', '（收棍叉腰，满脸不服气）“虚觉，你走位慢了半拍，挡着我出棍了！要我说，练这劳什子小罗汉阵还不如咱们各自凭真本事单打独斗来得痛快！”'),
      S('NPC-0861', '（同样梗着脖子回嘴）“分明是你自己贪功冒进抢出阵眼！慧轮师叔教的步法你记熟了没有？”'),
    ],
    onFinishEffects: [openScene('scene_sls11_02', SHAOLIN_SIDE11_QUEST_ID)],
  },

  scene_sls11_02: {
    id: 'scene_sls11_02',
    title: '第二幕 · 阵理之托',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      S('NPC-0254', '（见你步入正殿，眸光一亮，招手唤你近前）“师弟来得正好！你也瞧见了，虚胜、虚觉这批年轻护院武僧筋骨俱佳，却个个血气方刚、不服管束，排了半个月『小罗汉阵』还是散沙一盘。”'),
      S('NPC-0254', '“我知师弟通晓兵法策论，又在内门颇有威望。可愿替我督导他们半日，教他们明白什么叫『阵势如金、以弱胜强』？”'),
      P('（合十含笑，目光扫过一众摩拳擦掌的年轻武僧）“治军如布阵，徒以呵斥难服顽徒之心，须得先讲透阵理、再以实战验真章。弟子愿助慧轮师兄督导这回试炼！”'),
    ],
    onFinishEffects: [openScene('scene_sls11_03', SHAOLIN_SIDE11_QUEST_ID)],
  },

  scene_sls11_03: {
    id: 'scene_sls11_03',
    title: '第三幕 · 立约督阵',
    subtitle: '罗汉堂演武正殿 · 演武坪',
    mandatory: true,
    beats: [
      N('你步入演武坪中央，朗声向虚胜、虚觉与其余四名护院僧说道：“单打独斗，三流武僧遇上二流强敌十战九败；但若六人结成小罗汉阵，进退相依、攻守互补，便连二流上品悍匪亦能困于掌中！”'),
      S('NPC-0769', '（将信将疑，抱拳道）“师兄既这般说，咱们便听师兄号令排演一回！倒要瞧瞧这阵法真有那么神效？”'),
    ],
    choices: [
      {
        id: 'sls11_accept',
        label: '执令旗登台，督导虚胜、虚觉等六僧排演小罗汉阵',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE11_QUEST_ID, stepId: 'drill_and_defend' },
          setStep(SHAOLIN_SIDE11_QUEST_ID, 'drill_and_defend'),
          toast(
            '已接下督阵之责！请在【罗汉堂演武正殿（sl_luohan_main）】完成小罗汉阵合练。',
            'talk',
            '罗汉涂金',
          ),
        ],
      },
    ],
  },

  scene_sls11_04: {
    id: 'scene_sls11_04',
    title: '第四幕 · 奇正相生',
    subtitle: '罗汉堂演武正殿 · 演武坪',
    illustrationUrl: '/assets/quests/sl_s11_mini_arhat.jpg',
    illustrationCaption: '小罗汉阵 · 督导虚胜、虚觉等六僧踏位合棍，初成金汤阵势',
    mandatory: true,
    beats: [
      N('你以兵法奇正之理拆解小罗汉阵：虚胜勇猛居中前锋为“正”，虚觉沉稳居后补漏为“奇”，其余四僧分守四隅互为犄角；一棍击出，必有二棍护其空门，一人后撤，必有两人错步补位。'),
      N('起初六僧仍偶有错乱，但在你清越精准的口令调度之下，不过一个时辰，六根齐眉白蜡棍已挥舞得密不透风，步法踏在青砖之上铿锵如一，竟隐隐生出铜墙铁壁之气象！'),
      S('NPC-0861', '（抹去汗珠，眼中绽出异彩）“咦！方才我差点露了左肋空门，虚胜师兄的棍尾竟刚好顺势帮我遮住了——这阵法果真奇妙无比！”'),
    ],
    onFinishEffects: [openScene('scene_sls11_05', SHAOLIN_SIDE11_QUEST_ID)],
  },

  scene_sls11_05: {
    id: 'scene_sls11_05',
    title: '第五幕 · 狂徒闯山',
    subtitle: '罗汉堂演武正殿外 · 山门骚动',
    mandatory: true,
    beats: [
      N('众僧正练得兴起，忽闻山门方向传来一阵轰然巨响，仿佛两座铁塔砸碎了石狮底座！紧接着三道狂妄大笑震彻山谷，三名满脸横肉的嵩山绿林狂徒竟推倒知客沙弥、大摇大摆闯入罗汉堂外院！'),
      N('为首悍匪身高近九尺，裸露着黑毛虬结的双臂，左右各提一柄重逾五十斤的八棱镔铁大锤，正是盘踞嵩山阴坡、近来四处踢馆扬名的绿林狂徒【铁锤霸】；其身后跟着持刀的【独眼狼】与扛铁棒的【黑熊精】。'),
      S(SPEAKER_HAMMER_BOSS, '（双锤一碰，火星四溅，声如破锣）“少林秃驴听着！江湖都吹你们十八铜人罗汉堂天下无双，老子铁锤霸今日特来讨教讨教——若连老子这双铁锤都接不住，趁早把罗汉堂匾额摘了当柴烧！”'),
    ],
    onFinishEffects: [openScene('scene_sls11_06', SHAOLIN_SIDE11_QUEST_ID)],
  },

  scene_sls11_06: {
    id: 'scene_sls11_06',
    title: '第六幕 · 慧轮观阵',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('虚胜见外贼辱及少林门楣，顿时气血上涌，拎棍便欲独自冲出去拼命，却被你一把按住肩头。慧轮在一旁按兵不动，含笑对你微微颔首。'),
      S('NPC-0254', '“师弟，来得早不如来得巧——这三个狂徒虽蛮力惊人，正好拿来给顽徒们做一块试金石！我替你压阵护住大殿，如何破敌，全凭师弟调遣！”'),
      P('（目光沉凝，朗声传令）“虚胜、虚觉听令！今日便叫这群狂徒见识见识何谓少林小罗汉阵！切莫单打独斗，按方才所练六合步法，先用长棍封锁他们身侧腾挪空间，阵眼由我亲自镇守！”'),
    ],
    onFinishEffects: [openScene('scene_sls11_07', SHAOLIN_SIDE11_QUEST_ID)],
  },

  scene_sls11_07: {
    id: 'scene_sls11_07',
    title: '第七幕 · 阵锁狂澜',
    subtitle: '罗汉堂演武正殿 · 坪心对峙',
    mandatory: true,
    beats: [
      N('一声喝令之下，虚胜、虚觉等六僧齐齐大喝，六根齐眉棍如林竖起，瞬间踏出六合方位将三名狂徒隐隐合围！'),
      S(SPEAKER_BRUTE_A, '（嗤笑一声，挥刀劈开一根探来的棍影）“大哥瞧瞧，一群毛头小和尚还学人摆阵呢！兄弟们，一鼓作气撞碎这群泥菩萨！”'),
      N('铁锤霸狞笑一声，双锤挟着撕裂空气的恶风轰然砸向阵前！虚胜与虚觉不敢硬接其蛮力，依你所授口诀顺势错步卸力、棍尾连点其下盘，竟生生逼得铁锤霸落锤慢了半拍！恰在此时，你自阵眼纵身踏出，正面接下三狂徒锋芒！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side11_hammer_ready', value: true },
      openScene('scene_sls11_08', SHAOLIN_SIDE11_QUEST_ID),
    ],
  },

  scene_sls11_08: {
    id: 'scene_sls11_08',
    title: '第八幕 · 阵眼破锤',
    subtitle: '罗汉堂演武正殿 · 激战铁锤霸三狂徒',
    mandatory: true,
    beats: [
      S(SPEAKER_HAMMER_BOSS, '“好小子，原来你才是阵眼头领！来来来，看你这副身板接不接得住老子一记泰山压顶！”'),
      N('你稳立小罗汉阵阵眼，借同门游走牵制之势，迎战二流上品狂徒【铁锤霸】与两名绿林悍匪！'),
    ],
    choices: [
      {
        id: 'sls11_fight_hammer',
        label: '亲出阵眼、以巧破力，迎战【铁锤霸（二流上品）】与两名绿林狂徒',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE11_QUEST_ID,
            opponent: { kind: 'custom', npc: buildIronHammerTyrant() },
            extraOpponents: [
              { kind: 'custom', npc: buildBruteMinion1() },
              { kind: 'custom', npc: buildBruteMinion2() },
            ],
            rule: 'story_trial',
            forbidEscapeReason: '少林罗汉堂正殿之前，岂容绿林狂徒嚣张践踏！',
            introText:
              '【罗汉涂金】亲出小罗汉阵阵眼，在罗汉堂演武正殿迎战嵩山绿林狂徒【铁锤霸（二流上品）】及两名同伙！',
            onWin: [openScene('scene_sls11_09', SHAOLIN_SIDE11_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '双铁锤势大力沉一时受挫！虚胜与虚觉急忙合棍补位掩护，重整阵势后可于【罗汉堂演武正殿】再战狂徒。',
                'warn',
                '罗汉涂金',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls11_09: {
    id: 'scene_sls11_09',
    title: '第九幕 · 震锤折锋',
    subtitle: '罗汉堂演武正殿 · 演武坪',
    illustrationUrl: '/assets/quests/sl_s11_hammer_defeat.jpg',
    illustrationCaption: '阵眼破狂徒 · 巧借小罗汉阵合围之势，一举震飞百斤铁锤重创狂徒',
    mandatory: true,
    beats: [
      N('激斗之间，独眼狼与黑熊精被你连环重手击退，又撞上小罗汉阵密不透风的棍网，登时被打得抱头鼠窜、瘫软在地。铁锤霸双目赤红，举起百斤双锤孤注一掷砸下！'),
      N('你不避不退，脚踏罗汉桩稳如泰山，顺着双锤下坠之势侧身沾粘借力，一掌切入其双肘空门，澎湃的少林正宗阳刚劲透臂而入！只听“当啷”两声巨响，百斤镔铁双锤竟脱手飞出两丈，深深砸进青石板中，铁锤霸惨哼一声跪倒在地！'),
      S(SPEAKER_HAMMER_BOSS, '（捂着发麻的双臂，脸色惨白，再无半分狂气）“这……这小罗汉阵竟能卸去老子七成蛮力，阵眼大师的内功更是深不可测……俺铁锤霸认栽了！”'),
    ],
    onFinishEffects: [openScene('scene_sls11_10', SHAOLIN_SIDE11_QUEST_ID)],
  },

  scene_sls11_10: {
    id: 'scene_sls11_10',
    title: '第十幕 · 顽徒折服',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('三名狂徒被罗汉堂武僧卸去兵刃押下山门送交登封官府。演武坪上短暂寂静之后，虚胜、虚觉与其余四名护院僧齐齐收棍单膝跪地，向你与慧轮诚心合十致敬！'),
      S('NPC-0769', '（满面愧色，继而心悦诚服）“师兄今日真令弟子羞愧无地！若方才是我独自冲上去硬拼，早已被铁锤霸一锤震断筋骨；唯有依着师兄教导的小罗汉阵彼此照应，才能将二流上品悍匪困得束手无策！”'),
      S('NPC-0861', '“弟子从今往后定收起骄躁之心，潜心苦练罗汉阵法，再不敢轻慢同门配合！”'),
    ],
    onFinishEffects: [openScene('scene_sls11_11', SHAOLIN_SIDE11_QUEST_ID)],
  },

  scene_sls11_11: {
    id: 'scene_sls11_11',
    title: '第十一幕 · 涂金成器',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      S('NPC-0254', '（大步走下石阶，朗笑抚掌）“好一个『罗汉涂金』！顽铁经千锤百炼方成利器，顽徒经此阵战方知法度。师弟不仅一身武艺已臻二流上品火候，这番临阵布势、以策统武的将帅气度，更令我罗汉堂上下刮目相看！”'),
      P('（扶起虚胜与虚觉，微笑合十）“独木难支大厦，众志方成金城。今日能击退狂徒，乃诸位师弟齐心合阵之功。”'),
    ],
    onFinishEffects: [openScene('scene_sls11_12', SHAOLIN_SIDE11_QUEST_ID)],
  },

  scene_sls11_12: {
    id: 'scene_sls11_12',
    title: '第十二幕 · 功成罗汉',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      S('NPC-0254', '“此事我必禀明达摩院与方丈玄慈大师，替师弟记上罗汉堂头等督训与护山大功！待你日后修为再进一步，少林内门真传之位必有你一席！”'),
      P('（合十稽首）“多谢慧轮师兄提携！弟子定当勤修不辍，不负罗汉堂期许！”'),
    ],
    choices: [
      {
        id: 'sls11_complete',
        label: '收阵归礼，领受罗汉堂重赏与兵法阵理体悟！',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 380, reason: '亲出小罗汉阵阵眼重创嵩山绿林狂徒铁锤霸' },
          { type: 'addSectContribution', amount: 150 },
          { type: 'modifySkill', key: '策论', delta: 2 },
          { type: 'addArtExp', amount: 100 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0254' }, delta: 12 },
          { type: 'modifyRenown', delta: 40, reason: '完成门派差事《罗汉涂金 · 顽徒试炼》' },
          { type: 'completeQuest', questId: SHAOLIN_SIDE11_QUEST_ID, outcome: 'completed' },
          toast(
            '【罗汉涂金 · 顽徒试炼】圆满完结！策论 +2、武学阅历 +100、宗门贡献 +150，慧轮对你大为赞赏！',
            'success',
            '罗汉涂金',
          ),
        ],
      },
    ],
  },
}
