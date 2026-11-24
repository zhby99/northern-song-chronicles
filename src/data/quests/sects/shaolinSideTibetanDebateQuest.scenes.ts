import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE13_QUEST_ID } from './shaolinSideTibetanDebateQuest'

const SPEAKER_LANGDAMA: StorySpeakerSpec = {
  kind: 'custom',
  name: '朗达玛',
  title: '西夏密宗音功高僧 · 朗达玛',
  factionName: '西夏密宗',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

const SPEAKER_EUNUCH_ENVOY: StorySpeakerSpec = {
  kind: 'custom',
  name: '张茂则',
  title: '入内内侍省宣旨使',
  factionName: '大宋朝廷',
  portraitUrl: '/assets/characters/templates/tpl_eunuch_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_eunuch_male_av.jpg',
}

const SPEAKER_BIANKING_SCHOLAR: StorySpeakerSpec = {
  kind: 'custom',
  name: '汴京观礼太学生',
  title: '国子监士子',
  factionName: '汴京士林',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

function buildLangdama(shakenByBell = false): NodeNpc {
  return makeQuestNpc({
    id: shakenByBell ? 'QUEST_SLS13_LANGDAMA_SHAKEN' : 'QUEST_SLS13_LANGDAMA',
    name: '朗达玛',
    title: '西夏密宗音功高僧 · 朗达玛',
    realm: '一流中品',
    factionName: '西夏密宗',
    sectRank: 0,
    sectRankLabel: '密宗大阿阇梨',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: shakenByBell
      ? '“哼，好一招借钟化音！贫僧气脉虽受反震，且看你能不能接住接下来的西域密宗掌法！”'
      : '“中原禅徒口舌虽利，且看你能不能接住贫僧这声西域大自在梵音狮吼！”',
    stats: shakenByBell
      ? { hp: 2680, mp: 2480, agi: 62, res: 54 }
      : { hp: 3180, mp: 2960, agi: 66, res: 59 },
    talents: { bone: 76, comprehension: 82, charm: 55 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-063', move2: 'MA-107' },
    learnedArts: [
      { artId: 'MA-245', level: 8 },
      { artId: 'MA-063', level: 8 },
      { artId: 'MA-107', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls13_01: {
    id: 'scene_sls13_01',
    title: '香云宝鼎 · 番僧闯殿',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('{reignYear}仲夏，汴京大相国寺香火鼎盛，香云宝鼎青烟袅袅。你方踏入大雄宝殿门阶，忽听殿内一声如闷雷滚地般的梵唱炸响，震得檐角铜铃嗡嗡乱颤，十余名香客掩耳骇退！'),
      N('只见宝殿正中站着一名身披绛红金边袈裟、身材魁梧的西夏密宗高僧，左手托着一只泛着暗金流光的紫金宝钵，右手轻按鎏金法螺，神态倨傲；对面少林下院主持慧光、慧空面色发白，正强运内息稳住心神。'),
      S(
        SPEAKER_LANGDAMA,
        '“哈哈哈哈！大宋天子脚下的皇家禅院，难道便只有这两位连一句真言声浪都站立不稳的庸僧么？贫僧朗达玛随西夏使团入汴，特携兴庆府承天寺辩帖前来问难，若大相国寺无人敢应，便请摘了『天下禅宗祖庭下院』的匾额吧！”',
      ),
      S('NPC-0360', '“阿弥陀佛……朗达玛大师以密宗音功暗催内劲震伤同门，岂是礼佛问难之道？……呃！”'),
      S('NPC-0465', '“慧光师兄小心！他掌中紫金宝钵暗合声浪共振，余音直冲耳膜百会！”'),
    ],
    onFinishEffects: [openScene('scene_sls13_02', SHAOLIN_SIDE13_QUEST_ID)],
  },

  scene_sls13_02: {
    id: 'scene_sls13_02',
    title: '挺身接帖 · 宝塔之约',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('你踏前一步，暗运少林纯正内息护住双耳与胸腹，广袖轻拂之间，殿中激荡的梵音余浪竟如泥牛入海般消弭无形。你向慧光、慧空合十施礼，旋即转身直视朗达玛。'),
      P(
        '“阿弥陀佛。嵩山少林弟子在此！朗达玛大师既持辩帖远道而来，中原佛门岂有闭门不纳之理？然大雄宝殿乃礼佛清净地，不如移步资圣八角琉璃宝塔前高筑法坛，请汴京僧俗共证！”',
      ),
      S(
        SPEAKER_LANGDAMA,
        '“哦？终于来了个气息浑厚、能接住贫僧声浪的硬角儿！好！贫僧便携紫金宝钵在八角宝塔下恭候——既辩佛理，亦验禅功，看看嵩山少林究竟是真金还是虚名！”',
      ),
      S(
        'NPC-0360',
        '“师兄来得太及时了！相国寺瓦舍与朱雀门街的士子已蜂拥聚往宝塔，这朗达玛不仅精研藏传因明，更兼修一流中品密宗音功，务请师兄沉心应对！”',
      ),
    ],
    choices: [
      {
        id: 'accept_tibetan_debate',
        label: '“二位师弟且安心调息，我这便登资圣八角琉璃宝塔会他一会！”',
        subLabel: '承接支线【大雄狮吼 · 番僧问难】，前往资圣八角琉璃宝塔',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE13_QUEST_ID, stepId: 'pagoda_debate_duel' },
          toast('任务已接取：前往【大相国寺 · 资圣八角琉璃宝塔】登坛迎战朗达玛！', 'success', '大雄狮吼'),
        ],
      },
      {
        id: 'defer_tibetan_debate',
        label: '“且容我稍作调息整备，随后便应此辩。”',
        subLabel: '暂缓接取（可随时再来大雄宝殿开启）',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_side13_start_triggered', value: false },
          toast('你暂且退至廊下调息养神，待准备妥当后可再入大雄宝殿迎战番僧。', 'talk', '大雄狮吼'),
        ],
      },
    ],
  },

  scene_sls13_03: {
    id: 'scene_sls13_03',
    title: '八角宝塔 · 登坛对坐',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('资圣八角琉璃宝塔下早已水泄不通，汴京太学生、商贾、诸山长老乃至闻讯而来的礼部官员围成半弧。两张紫檀禅座分列东西，法坛正中供着朗达玛带来的那只紫金宝钵。'),
      N('朗达玛盘膝坐于西座，身旁四名西夏随僧齐摇铜铃，细碎急促的铃声如蛛网般缠向你的心神；你神色安详，步上东座合十端坐，眸光澄澈如秋潭古井。'),
      S(SPEAKER_BIANKING_SCHOLAR, '“快看！那位少林高徒气息何等沉静，任他西夏铜铃乱响，眉梢竟纹丝不动！”'),
      S(
        SPEAKER_LANGDAMA,
        '“中原僧人，今日先论佛理、再证禅功！贫僧便在这紫金宝钵前抛出一道密宗『空有之辩』——若你答得词穷理屈，趁早向我西夏承天寺低头！”',
      ),
    ],
    onFinishEffects: [openScene('scene_sls13_04', SHAOLIN_SIDE13_QUEST_ID)],
  },

  scene_sls13_04: {
    id: 'scene_sls13_04',
    title: '紫金宝钵 · 空有之辩',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('朗达玛右手屈指轻叩案上紫金宝钵，“嗡——”的一声浑厚长鸣震荡四野，竟将座前几盏长明灯火压得齐齐一矮！'),
      S(
        SPEAKER_LANGDAMA,
        '“尔等中土禅宗开口便诵『本来无一物』、标榜万法皆空；既言皆空，为何少林寺日日持戒诵经、练棍护院，又为何听见贫僧这一声宝钵真言便心血翻涌？若佛法是有，便违空性；若佛法是空，修行与护法皆成虚妄！此乃空有相悖之死题，汝何以解之？”',
      ),
      N('此问步步紧逼，更暗以宝钵音浪搅乱思绪，台下千余观礼者不由屏息捏汗。你垂目定心，审慎斟酌应对机锋：'),
    ],
    choices: [
      {
        id: 'debate_answer_void',
        label: '“万法本无自性，宝钵声浪不过镜花水月。修行人但守一念虚无，何须计较色相？”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s13_debate_choice', value: 'void' },
          openScene('scene_sls13_05', SHAOLIN_SIDE13_QUEST_ID),
        ],
      },
      {
        id: 'debate_answer_middle',
        label: '“空不异色、色不异空！真空不碍妙有，执声闻相以音压人，大师自己早已落入魔境！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s13_debate_choice', value: 'correct' },
          { type: 'setFlag', flag: 'sl_s13_debate_won', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s13_debate_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s13_debate_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_sls13_05', SHAOLIN_SIDE13_QUEST_ID),
        ],
      },
      {
        id: 'debate_answer_force',
        label: '“佛理在心不在口，经义难分高下！与其在此咬文嚼字，不如直接以武印禅见真章！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s13_debate_choice', value: 'force' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s13_debate_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s13_debate_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_sls13_05', SHAOLIN_SIDE13_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls13_05: {
    id: 'scene_sls13_05',
    title: '禅锋定鼎 · 狮吼撼塔',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    illustrationUrl: '/assets/quests/sl_s13_lion_roar.jpg',
    illustrationCaption: '资圣八角宝塔前金光激荡，少林禅功硬撼西夏密宗狮吼梵音',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s13_debate_choice=correct|你话音清越如洪钟落地，直指《般若心经》中观不二法门，更一针见血点破朗达玛借声闻外相压人的傲慢执念！案上紫金宝钵的余鸣竟在这一喝之下戛然而止，朗达玛脸色骤然一白，锐气当殿被挫去三分！|}{ifFlagEq:sl_s13_debate_choice=void|朗达玛听罢抚掌大笑，讥讽道：“哈哈！一味谈虚说无，正是堕入断灭顽空！若一切皆是虚幻，那你少林寺干脆拆了山门！”满场一时窃窃私语，你面色不改，只得沉声补以护法止恶之理稳住局面。|}{ifFlagEq:sl_s13_debate_choice=force|朗达玛闻言眼中精芒暴涨，朗声冷笑：“好！既不愿在因明经义上多费唇舌，贫僧正要瞧瞧少林武僧有多大斤两！”满场观礼者闻得即将动武，纷纷骇然屏息后退。|}'),
      S(
        SPEAKER_BIANKING_SCHOLAR,
        '{ifFlagEq:sl_s13_debate_choice=correct|“妙极！『执声闻相以音压人，早已落入魔境』——少林大师这一语，直叫那番僧辩无可辩！”|“快看那西夏番僧翻案而起了，一场惊世禅武斗法怕是避不开了！”}',
      ),
      S(
        SPEAKER_LANGDAMA,
        '{ifFlagEq:sl_s13_debate_choice=correct|（面皮涨得紫红，猛地掀翻身前法螺案长身而起）“好一张直指心源的利口！然佛法非仅纸上空谈，须以定力与修为印证！接贫僧西域『大自在梵音狮吼』！”|（大笑掀案跃入广场中央，周身绛红袈裟无风自动）“废话少说！且看尔等中原禅功，能否接住贫僧这记『大自在梵音狮吼』！”}',
      ),
      N('一股沉浑狂暴的西夏密宗音功轰然爆发，如怒狮咆哮般撞向八角宝塔飞檐，檐角数十枚铜铃齐齐狂震作响！'),
    ],
    onFinishEffects: [openScene('scene_sls13_06', SHAOLIN_SIDE13_QUEST_ID)],
  },

  scene_sls13_06: {
    id: 'scene_sls13_06',
    title: '破音之策 · 禅武交锋',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('观礼众人齐齐退开十丈让出空场。朗达玛双掌合十催动一流中品密宗内劲，无形声浪伴着凌厉掌锋层层压至，所过之处青石微颤。'),
      N('你立于八角宝塔飞檐之下，耳畔既有番僧狂暴狮吼，亦有大相国寺檐铃与远方梵钟隐隐和鸣的清越余韵。电光火石间，你决意如何破他音功？'),
    ],
    choices: [
      {
        id: 'tactic_bell_resonance',
        label: '【借梵钟余韵共鸣破音功】以禅定真气牵引塔檐钟铃余韵，反震朗达玛胸口气脉再战！',
        subLabel: '先挫其音功锋芒再 1v1 切磋朗达玛（禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【琴】≥ 40、或方才空有辩难胜出、或【经义】≥ 75',
          conditions: [
            { type: 'skillAtLeast', key: '琴', min: 40 },
            { type: 'flag', flag: 'sl_s13_debate_won', op: 'truthy' },
            { type: 'skillAtLeast', key: '经义', min: 75 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s13_tactic', value: 'bell' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s13_tactic_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s13_tactic_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE13_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLangdama(true) },
            rule: 'spar',
            duelStakesTag: 'spar',
            introText: '你借宝塔梵钟清音引动禅定音波反震其胸口，朗达玛闷哼一声音罡微乱，法坛斗法旋即爆发！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls13_07', SHAOLIN_SIDE13_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('朗达玛密宗掌劲凌厉，你暂退调息，可随时在八角宝塔再战！', 'warn', '大雄狮吼'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('双方禅音掌法难分高下，调息片刻后可再登宝塔决胜！', 'warn', '大雄狮吼'),
            ],
          },
        ],
      },
      {
        id: 'tactic_lion_roar_clash',
        label: '【金刚狮吼正面硬撼】催动少林刚猛禅音硬碰硬，正面压服全盛朗达玛！',
        subLabel: '零门槛正面 1v1 切磋全盛朗达玛（一流中品，怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s13_tactic', value: 'roar' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s13_tactic_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s13_tactic_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE13_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLangdama(false) },
            rule: 'spar',
            duelStakesTag: 'spar',
            introText: '朗达玛口吐梵音真言，你以金刚狮吼正面相撼，声浪与掌风如雷霆压顶！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls13_07', SHAOLIN_SIDE13_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('你暂被朗达玛的密宗音功震退数步，调息回元后可随时在八角宝塔再战！', 'warn', '大雄狮吼'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('双方势均力敌，调息片刻后可再登法坛分出胜负！', 'warn', '大雄狮吼'),
            ],
          },
        ],
      },
    ],
  },

  scene_sls13_07: {
    id: 'scene_sls13_07',
    title: '梵音顿寂 · 番僧折服',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s13_tactic=bell|数十合交锋之中，你借宝塔梵钟清越余韵步步化散其狂暴音罡，终在朗达玛强催密宗绝啸的一瞬以柔和禅波反震其膻中，反掌轻按其腕脉三寸，点到即止！|数十合龙争虎斗之后，你以至刚至正的少林大雄狮吼正面碾碎漫天密宗声浪，双掌如金刚伏虎般震开朗达玛护体玄罡，掌锋止于其胸前三寸而收劲不伤！}'),
      N('朗达玛连退七步方稳住身形，胸口气血翻涌却未受半分暗伤，对方收发由心的绝顶火候令他彻底骇然。片刻沉默后，他缓缓整理凌乱袈裟，郑重向你合十低首。'),
      S(
        SPEAKER_LANGDAMA,
        '“阿弥陀佛……贫僧坐井观天，妄自尊大。中原少林不仅佛理圆融，禅功修为更是深不可测！今日败在大师手下，贫僧心服口服，这便收起承天寺辩帖！”',
      ),
      N('台下汴京观礼者爆发出震天欢呼。望着眼前既已折服、却仍带着几分西夏傲骨的朗达玛，你决定如何相待？'),
    ],
    choices: [
      {
        id: 'aftermath_gift_sutra',
        label: '【以经化干戈】取相国寺精刻汉译《楞伽》《金刚》二经相赠，邀其互通佛学',
        subLabel: '以佛门宽仁化干戈为玉帛（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s13_aftermath', value: 'sutra' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s13_aftermath_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s13_aftermath_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls13_08', SHAOLIN_SIDE13_QUEST_ID),
        ],
      },
      {
        id: 'aftermath_stern_warning',
        label: '【严辞彰正气】正色请其归报兴庆府：中原佛门自有脊梁，勿再借辩难滋事犯境',
        subLabel: '以凛然威严慑服西夏使团（怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s13_aftermath', value: 'warn' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s13_aftermath_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s13_aftermath_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_sls13_08', SHAOLIN_SIDE13_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls13_08: {
    id: 'scene_sls13_08',
    title: '欢声震汴 · 诏使忽临',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s13_aftermath=sutra|朗达玛双手捧过汉译佛经，神色动容，再三深揖道：“大师胸襟如海，贫僧定将中土禅宗真意带回西夏，愿两邦佛门永息争端！”说罢率随僧肃然退去。|朗达玛听得你字字铿锵、不卑不亢，脸色微凛，默然合十道：“中原少林果然气象森严，贫僧必将今日所见如实禀明西夏朝堂，告辞！”言罢领众黯然离山。}'),
      S('NPC-0360', '（眼含热泪快步上前合十）“师兄今日大展神威，不仅保住了大相国寺千年清誉，更叫满汴京见识了嵩山少林的真气象！”'),
      N('正说话间，一名知客僧满脸喜色奔来禀报：宫中入内内侍省宣旨使张茂则已奉官家口谕抵达【大雄宝殿（香云宝鼎）】，传召方才登坛退番僧的少林高徒上前接赏！'),
      P('“既蒙官家垂问，咱们速回大雄宝殿迎候圣谕。”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_SIDE13_QUEST_ID, 'hall_imperial_reward'),
      toast('朗达玛已心服口服退去！请速返【大雄宝殿（香云宝鼎）】接领官家御赏。', 'success', '大雄狮吼'),
    ],
  },

  scene_sls13_09: {
    id: 'scene_sls13_09',
    title: '御赐金钵 · 仁宗嘉奖',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    illustrationUrl: '/assets/quests/sl_s13_imperial_bowl.jpg',
    illustrationCaption: '大雄宝殿香云缭绕，宣旨内侍奉仁宗圣谕颁赐赏银与御前嘉奖',
    mandatory: true,
    beats: [
      N('大雄宝殿内钟磬齐鸣，香云宝鼎前已设好接旨香案。入内内侍省宣旨使张茂则手捧明黄敕谕，笑意盈盈地望着你与慧光、慧空。'),
      S(
        SPEAKER_EUNUCH_ENVOY,
        '“圣人闻听西夏密宗高僧闯入大相国寺问难，幸得嵩山少林高徒登坛以禅功慑服番僧，{ifFlagEq:sl_s13_aftermath=sutra|复赠汉经化干戈为玉帛、彰我大宋礼仪气象|更严辞折其骄气、扬我大宋佛门风骨}，龙颜甚悦！特命咱家赍赐护法赏银二百两，御赞『大雄狮吼，禅武双清』！”',
      ),
      P('“阿弥陀佛，弟子不敢居功，此乃少林历代祖师法脉与大宋圣明教化之福佑。谢官家隆恩！”'),
      S(SPEAKER_EUNUCH_ENVOY, '“大师果然谦冲有度，怪不得圣人常赞嵩山少林乃忠义佛门。咱家这便回宫复命去了！”'),
    ],
    onFinishEffects: [openScene('scene_sls13_10', SHAOLIN_SIDE13_QUEST_ID)],
  },

  scene_sls13_10: {
    id: 'scene_sls13_10',
    title: '下院赠丹 · 声震京华',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('送走宣旨内侍后，慧光与慧空又自大相国寺药库取来两枚珍藏的【嵩山少林小还丹】奉上，连同官家赏赐的二百两纹银一并交由你收执。'),
      S(
        'NPC-0360',
        '{ifFlag:sl_s13_debate_won|“方才听师兄于紫金宝钵前直破空有执相，小僧二人如闻醍醐灌顶！这两枚小还丹聊表下院谢意，还望师兄切勿推辞！”|“方才师兄于八角宝塔前以禅功力挫西夏大阿阇梨，实在大快人心！这两枚小还丹聊表下院谢意，还望师兄收下！”}',
      ),
      S('NPC-0465', '“今日之事不消三日便会传回嵩山，方丈师伯与戒律院诸位师叔听闻，定会大为欣慰！”'),
      N('夕阳西下，汴京城头晚霞如锦，相国寺外街巷间处处传颂着「少林高徒大雄狮吼退番僧」的佳话。经此舌战与破音盛会，你的佛门经义与临机辩才亦更上一层楼。'),
    ],
    onFinishEffects: [
      { type: 'giveCombatExp', amount: 650, reason: '大相国寺登坛破西夏密宗辩难与音功' },
      { type: 'giveSilver', amount: 200, reason: '官家赐赏护法银两' },
      { type: 'addSectContribution', amount: 240 },
      { type: 'modifyRenown', delta: 90, reason: '大雄狮吼折服西夏密宗高僧' },
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_s13_debate_won', op: 'truthy' },
        thenEffects: [
          { type: 'modifyRenown', delta: 15, reason: '紫金宝钵前当殿辨破密宗空有死题' },
        ],
      },
      { type: 'modifySkill', key: '辩才', delta: 2 },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'giveItem', itemId: 'ITM-MED-111', qty: 2 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0360' }, delta: 10 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0465' }, delta: 10 },
      { type: 'completeQuest', questId: SHAOLIN_SIDE13_QUEST_ID, outcome: 'completed' },
      toast(
        '【大雄狮吼 · 番僧问难】圆满完成！实战经验 +650，银两 +200，门派贡献 +240，声望 +90（辨破死题另 +15），辩才 +2，经义 +1，获赠嵩山少林小还丹 ×2！',
        'success',
        '大雄狮吼',
      ),
    ],
  },
}
