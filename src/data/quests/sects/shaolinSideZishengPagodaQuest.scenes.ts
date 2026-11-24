import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE07_QUEST_ID } from './shaolinSideZishengPagodaQuest'

const SPEAKER_SWALLOW: StorySpeakerSpec = {
  kind: 'custom',
  name: '踏云燕',
  title: '江南轻功飞贼',
  factionName: '江南独行盗',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

function buildCloudSwallow(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS07_CLOUD_SWALLOW',
    name: '踏云燕',
    title: '江南飞贼 · 踏云燕',
    realm: '二流中品',
    factionName: '江南独行盗',
    sectRank: 0,
    sectRankLabel: '飞檐大盗',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“啧啧，百尺琉璃塔檐，暴雨如注，小和尚你站得稳脚跟么？且追得上燕某的燕子三抄水再说！”',
    stats: { hp: 1380, mp: 1120, agi: 58, res: 30 },
    talents: { bone: 58, comprehension: 60, charm: 48 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-155', move2: 'MA-131' },
    learnedArts: [
      { artId: 'MA-121', level: 5 },
      { artId: 'MA-155', level: 5 },
      { artId: 'MA-131', level: 5 },
    ],
  })
}

function buildCloudSwallowDisrupted(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS07_CLOUD_SWALLOW_DISRUPTED',
    name: '踏云燕',
    title: '节奏大乱的江南飞贼 · 踏云燕',
    realm: '二流中品',
    factionName: '江南独行盗',
    sectRank: 0,
    sectRankLabel: '飞檐大盗',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“可恶！竟被你先手算死退路——便算失了抓钩与先机，燕某也绝不束手就擒！”',
    stats: { hp: 1120, mp: 920, agi: 48, res: 25 },
    talents: { bone: 58, comprehension: 60, charm: 48 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-155', move2: 'MA-131' },
    learnedArts: [
      { artId: 'MA-121', level: 4 },
      { artId: 'MA-155', level: 4 },
      { artId: 'MA-131', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls07_01: {
    id: 'scene_sls07_01',
    title: '第一幕 · 塔门盗帖 · 笔锋辨纸',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('{reignYear}午后乌云低垂，大相国寺资圣八角琉璃宝塔檐下风铃叮当急响。你刚行至塔座石阶，便见洒扫沙弥净清捧着一纸青竹宣笺仓皇奔下，驻塔执事武僧慧禅正按刀凝神戒备。'),
      S('NPC-0902', '（神色惶急）“师兄来得正好！方才我上顶层经龛换香，竟在紫檀供案香炉下摸出这张墨迹犹湿的盗帖——百尺高塔无人登梯，不知那飞贼是如何神不知鬼不觉放上去的！”'),
      S('NPC-0378', '（将帖子递予你，沉声道）“上面写着『今夜三更雨落，借观御赐金字华严经一卷——踏云燕拜上』。塔顶供奉的乃是官家御赐唐式泥金写经，倘若失窃，非但少林蒙羞，更是欺君大罪！”'),
      N('你展开帖子细观，只见行草笔锋轻挑灵动、隐带吴越书风，指腹轻捻纸背更觉韧滑透亮，暗藏太湖水纹细格。你心念微动，当即点破玄机。'),
      P('（目光沉静）“慧禅师兄请看，此笺乃江南特产的『太湖玉版笺』，寻常江湖盗贼绝难入手。踏云燕向来只盗奇珍不沾佛门重器，今夜敢冒天威盗取御赐《华严经》，背后必有汴京权贵或江南豪门重金买凶！”'),
    ],
    onFinishEffects: [openScene('scene_sls07_02', SHAOLIN_SIDE07_QUEST_ID)],
  },

  scene_sls07_02: {
    id: 'scene_sls07_02',
    title: '第二幕 · 调包设饵 · 临摹定计',
    subtitle: '资圣八角琉璃宝塔 · 一层禅堂',
    mandatory: true,
    beats: [
      S('NPC-0378', '（击掌赞叹）“师弟深通书道纸墨，一眼便看破幕后图谋！既然有人花大价钱买凶盗经，咱们非但要保住御赐真经，更要将踏云燕生擒活捉，问出究竟是谁在暗算少林！”'),
      P('“塔高百尺、八面凌空，大张旗鼓封门反会打草惊蛇。不如请慧禅师兄先将御赐真经密藏大殿暗室，我以相仿泥金纸匆匆摹写一卷赝本置于顶层金匣作饵，再趁夜雨守株待兔！”'),
      S('NPC-0902', '（连连点头）“弟子这就去取泥金仿纸与松烟墨！只是离天黑尚余两个时辰，师兄打算如何准备今夜这场雨夜伏局？”'),
    ],
    choices: [
      {
        id: 'sls07_accept_mark',
        label: '【精摹赝卷 · 暗藏破绽】用心仿写经首数页并留一处微瑕，诱踏云燕启匣细看时分神',
        subLabel: '承接支线【资圣宝塔 · 夜雨护经】，赴顶层布防',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s07_fake_style', value: 'mark' },
          { type: 'startQuest', questId: SHAOLIN_SIDE07_QUEST_ID, stepId: 'pagoda_rain_ambush' },
          setStep(SHAOLIN_SIDE07_QUEST_ID, 'pagoda_rain_ambush'),
          toast(
            '已定下调包诱敌之策！请在【资圣八角琉璃宝塔（bl_xg_pagoda）】夜雨登塔设伏。',
            'talk',
            '夜雨护经',
          ),
        ],
      },
      {
        id: 'sls07_accept_scout',
        label: '【速写充数 · 先勘八檐】匆匆摹妥卷首，余下时辰尽数踏勘八角飞檐瓦脊与铁链风向',
        subLabel: '承接支线【资圣宝塔 · 夜雨护经】，赴顶层布防',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s07_fake_style', value: 'scout' },
          { type: 'startQuest', questId: SHAOLIN_SIDE07_QUEST_ID, stepId: 'pagoda_rain_ambush' },
          setStep(SHAOLIN_SIDE07_QUEST_ID, 'pagoda_rain_ambush'),
          toast(
            '已踏勘塔顶八角飞檐地势！请在【资圣八角琉璃宝塔（bl_xg_pagoda）】夜雨登塔设伏。',
            'talk',
            '夜雨护经',
          ),
        ],
      },
    ],
  },

  scene_sls07_03: {
    id: 'scene_sls07_03',
    title: '第三幕 · 暴雨惊雷 · 守株抉择',
    subtitle: '资圣八角琉璃宝塔 · 百尺飞檐',
    illustrationUrl: '/assets/quests/sl_s07_pagoda_rain.jpg',
    illustrationCaption: '资圣宝塔 · 百尺飞檐暴雨倾盆，夜色中一道黑影如雨燕掠至',
    mandatory: true,
    beats: [
      N('入夜后乌云翻墨，倾盆夏雨如银瀑般砸在青绿琉璃瓦上，三更更鼓尽数被轰隆雷声吞没。{ifFlagEq:sl_s07_fake_style=mark|你借着豆大油灯精摹数页泥金赝卷放入紫檀金匣，卷首一笔刻意轻浮半分，专候飞贼低头细辨；|你早已将八面飞檐的借力铁索与避雨斗拱熟记于胸，放妥赝卷后便熄灭油灯静待风声；}净清守住盘旋木梯，慧禅扼守四层回廊。'),
      N('惨白电光撕裂汴京夜空的刹那，塔东南角百尺高空果真掠来一道油布黑影！那人身形纤瘦矫健，借着铜铃铁链连点三下，掌中一柄精钢竹节抓钩悄无声息甩向顶层斗拱——正是江南轻功大盗【踏云燕】！'),
      N('雷雨声震耳欲聋，琉璃瓦滑不留足。趁踏云燕方攀至檐角、尚未彻底摸清塔内虚实的一瞬，你瞬息定下守株截贼之法——'),
    ],
    choices: [
      {
        id: 'sls07_plan_eaves',
        label: '【塔顶飞檐借雨声听风辨位】隐身斗拱听准攀索颤音，先手截断其抓钩长索、乱其轻功节奏！',
        subLabel: '需身法 ≥ 40 或悟性 ≥ 65 · 断索破势大幅削弱踏云燕（禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'combatStatAtLeast', key: 'agility', min: 40 },
            { type: 'talentAtLeast', key: '悟性', min: 65 },
          ],
          hint: '需实战身法 ≥ 40 或先天悟性 ≥ 65',
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s07_rope_cut', value: true },
          { type: 'setFlag', flag: 'sl_s07_ambush_plan', value: 'eaves' },
          { type: 'setFlag', flag: 'sl_side07_swallow_ready', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s07_plan_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s07_plan_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls07_04', SHAOLIN_SIDE07_QUEST_ID),
        ],
      },
      {
        id: 'sls07_plan_decoy',
        label: '【塔门假扮夜巡知客诱其入瓮】手提防风灯佯作疏忽夜巡，以语锋破绽诱其抢先入阁落入窄廊！',
        subLabel: '需辩才 ≥ 40 或棋 ≥ 30 · 诱入窄廊封死腾挪空间，先声夺人（禅心慈悲 +1）',
        tone: 'gold',
        condition: {
          type: 'any',
          conditions: [
            { type: 'skillAtLeast', key: '辩才', min: 40 },
            { type: 'skillAtLeast', key: '棋', min: 30 },
          ],
          hint: '需十艺【辩才】≥ 40 或【棋】≥ 30',
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s07_decoy_trap', value: true },
          { type: 'setFlag', flag: 'sl_s07_ambush_plan', value: 'decoy' },
          { type: 'setFlag', flag: 'sl_side07_swallow_ready', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s07_plan_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s07_plan_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls07_04', SHAOLIN_SIDE07_QUEST_ID),
        ],
      },
      {
        id: 'sls07_plan_direct',
        label: '【正面守塔硬撼轻功飞贼】不借奇计，稳立顶层外廊正面迎候踏云燕破窗现身！',
        subLabel: '零门槛正攻 · 堂堂正正于百尺雨檐硬撼全盛踏云燕',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s07_ambush_plan', value: 'direct' },
          { type: 'setFlag', flag: 'sl_side07_swallow_ready', value: true },
          openScene('scene_sls07_04', SHAOLIN_SIDE07_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls07_04: {
    id: 'scene_sls07_04',
    title: '第四幕 · 飞檐交锋 · 瓦脊对峙',
    subtitle: '资圣八角琉璃宝塔 · 顶层外廊',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s07_ambush_plan=eaves|你屏息隐于斗拱暗影，于暴雨哗响中精准辨出铁链绷紧的一瞬，骈指如刀凌空劈落！“铮”的一声脆响，踏云燕赖以纵跃的牛筋攀索应声而断，他身形猛地一沉，险些自百尺檐角滑落，堪堪翻身扑进顶层外廊！|}{ifFlagEq:sl_s07_ambush_plan=decoy|你提着昏暗纸灯佯作昏昏欲睡的夜巡知客，故意在窗前喃喃自语“经匣落锁无虞，先下楼避雨罢”。踏云燕果然信以为真，迫不及待翻窗入阁扑向紫檀金匣，却听身后木扉轰然合拢，窄廊腾挪之势登时被你算死！|}{ifFlagEq:sl_s07_ambush_plan=direct|踏云燕挑开铜锁闪身入阁，借电光一扫紫檀金匣中墨汁未干的赝卷，顿时冷笑一声反身掠出窗外，正撞见你按掌肃立于百尺雨廊正中！|}'),
      S(SPEAKER_SWALLOW, '{ifFlagEq:sl_s07_ambush_plan=eaves|（落地踉跄半步，盯着手中半截断索脸色骤变）“好毒的耳力！暴雨惊雷之下竟能听风断我攀索……少林内门果然藏龙卧虎！”|}{ifFlagEq:sl_s07_ambush_plan=decoy|（揭开金匣见墨迹浮面，回身见窄廊退路尽封，气极反笑）“李代桃僵还兼请君入瓮！小和尚这局棋下得好生老辣，连燕某都被你绕进了笼子！”|}{ifFlagEq:sl_s07_ambush_plan=direct|（足尖轻点湿滑瓦脊，身形如柳絮倒退三尺，傲然笑道）“墨汁未干、金粉浮面——好个调包计！可这百尺高塔暴雨如注，你若留得住燕某，便算少林赢！”|}'),
      P('“阿弥陀佛！踏云燕既已赴约，何必急着走？且留下幕后买主的姓名再论去留！”'),
      N('狂风卷着雨帘扑面而来，踏云燕袖腕轻抖，三枚细如牛毛的追魂镖借雨幕掩护直袭面门！你双足如老树盘根死死吸住湿滑砖石，长袖一拂尽数格落，凝神迎战！'),
    ],
    onFinishEffects: [openScene('scene_sls07_05', SHAOLIN_SIDE07_QUEST_ID)],
  },

  scene_sls07_05: {
    id: 'scene_sls07_05',
    title: '第五幕 · 雨夜擒燕 · 百尺决战',
    subtitle: '资圣宝塔飞檐 · 1v1 激战江南飞贼踏云燕',
    mandatory: true,
    beats: [
      S(SPEAKER_SWALLOW, '“接招吧小和尚！看你在百尺雨檐上，如何破我燕子三抄水与追魂暗镖！”'),
      N('电光闪烁之间，雨水顺着琉璃瓦檐倾泻如帘。你沉肩敛息，牢牢扼住顶层中宫，决意将这名江南飞贼生擒于宝塔之上！'),
    ],
    choices: [
      {
        id: 'sls07_fight_swallow_disrupted',
        label: '【乘势贴身擒拿】趁踏云燕节奏已乱、退路受阻，抢占先机拿下【踏云燕（二流中品）】',
        subLabel: '需先前听风断索或诱敌入瓮成功 · 对手受创节奏大乱，战后全回满',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_s07_rope_cut', op: 'truthy' },
            { type: 'flag', flag: 'sl_s07_decoy_trap', op: 'truthy' },
          ],
          hint: '需在设防抉择中先手断索或诱其入瓮',
        },
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildCloudSwallowDisrupted() },
            rule: 'story_trial',
            forbidEscapeReason: '飞贼近在咫尺，岂可令其趁雨遁走！',
            introText:
              '【夜雨护经 · 先手破势】踏云燕轻功节奏已被打乱，速于百尺宝塔生擒此贼！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls07_06', SHAOLIN_SIDE07_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '琉璃瓦湿滑一时失手，被踏云燕虚晃一招拉开距离！稳住气息后可于【资圣八角琉璃宝塔】再截此贼。',
                'warn',
                '夜雨护经',
              ),
            ],
          },
        ],
      },
      {
        id: 'sls07_fight_swallow',
        label: '【稳扎马步硬撼】以静制动，于百尺雨檐正面生擒【踏云燕（二流中品）】',
        subLabel: '零门槛正面交锋 · 迎战全盛踏云燕，战后全回满',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildCloudSwallow() },
            rule: 'story_trial',
            forbidEscapeReason: '飞贼近在咫尺，岂可令其趁雨遁走！',
            introText:
              '【夜雨护经】在百尺资圣宝塔飞檐迎战江南轻功飞贼【踏云燕（二流中品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls07_06', SHAOLIN_SIDE07_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '琉璃瓦湿滑一时失手，被踏云燕虚晃一招拉开距离！稳住气息后可于【资圣八角琉璃宝塔】再截此贼。',
                'warn',
                '夜雨护经',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls07_06: {
    id: 'scene_sls07_06',
    title: '第六幕 · 折翼就擒 · 姑苏密函',
    subtitle: '资圣八角琉璃宝塔 · 顶层廊檐',
    illustrationUrl: '/assets/quests/sl_s07_capture_swallow.jpg',
    illustrationCaption: '雨夜生擒 · 少林擒拿手扣住飞贼肩井，踏云燕折翼就擒',
    mandatory: true,
    beats: [
      N('你摸透了踏云燕借风折返的身法规律，故意卖出一处空门引其掠过檐角，待他身在半空旧力已尽之际，猛然探臂使出一记刚柔并济的少林擒拿手，精准扣住其右肩琵琶骨！'),
      N('踏云燕闷哼一声，浑身真气登时被封，重重跌落塔顶木廊。楼下闻声赶到的慧禅与净清举起防风灯笼冲上顶层，迅速搜身捆缚，竟在其油布暗袋中摸出一封浸蜡密函！'),
      N('拆开密函，只见信中写着“取御赐华严经，验卷后于汴河码头凭『燕子坞外号 · 锦云绸庄』对牌支取纹银千两”，落款盖着一枚极小的朱红燕尾暗印，信尾更附有一名汴京豪贵府邸管家交接暗号。'),
      S('NPC-0378', '（脸色沉重，压低嗓音）“燕子坞外号锦云绸庄，又勾结汴京权贵府邸……他们不图经文武学，分明是想借御赐佛经失窃激怒朝廷、嫁祸我嵩山少林！”'),
      S(SPEAKER_SWALLOW, '（苦笑垂首，叹了口气）“小师父明鉴，燕某只是贪财替人办事的独行客。那汴京贵府管事与锦云绸庄掌柜出价千两，才令我鬼迷心窍。可我平生行窃自有底线，今夜一未伤人命、二未毁经卷，只求师父高抬贵手……”'),
    ],
    onFinishEffects: [openScene('scene_sls07_07', SHAOLIN_SIDE07_QUEST_ID)],
  },

  scene_sls07_07: {
    id: 'scene_sls07_07',
    title: '第七幕 · 审贼抉择 · 慈悲铁面',
    subtitle: '资圣八角琉璃宝塔 · 顶层禅阁',
    mandatory: true,
    beats: [
      N('灯火摇曳间，慧禅将浸蜡密函仔细封入油纸袋，转眸望向跪伏在廊柱旁的踏云燕，又看了看神色沉静的你。'),
      S('NPC-0378', '“此贼乃师弟孤身擒获，如何发落全凭师弟主张——究竟是留他一条改过自新之路，还是连人带证铁面押交开封府严查那幕后汴京权贵？”'),
      N('窗外夏雨渐歇，檐水滴答作响。踏云燕屏息听候你的发落，一念慈悲与一念铁面，皆在此时定夺。'),
    ],
    choices: [
      {
        id: 'sls07_verdict_mercy',
        label: '【念其未伤人命 · 录供放生】令其手书雇主供状画押，毁其暗器抓钩后放其改过自新！',
        subLabel: '佛门慈悲留一线（禅心慈悲 +2，额外增侠义与慧禅好感）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s07_verdict', value: 'mercy' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s07_verdict_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s07_verdict_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          setStep(SHAOLIN_SIDE07_QUEST_ID, 'report_clue'),
          toast(
            '已令踏云燕写下详尽供状后纵其改过自新！请在【资圣八角琉璃宝塔（bl_xg_pagoda）】归位真经并交割密函。',
            'success',
            '夜雨护经',
          ),
        ],
      },
      {
        id: 'sls07_verdict_strict',
        label: '【铁面押交开封府 · 严查幕后权贵】绝不姑息养奸，连人带密函移交开封府严审幕后黑手！',
        subLabel: '护法铁面明国法（怒目杀业 +1，额外增江湖声望）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s07_verdict', value: 'strict' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s07_verdict_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s07_verdict_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          setStep(SHAOLIN_SIDE07_QUEST_ID, 'report_clue'),
          toast(
            '已押解踏云燕并移交开封府严查幕后权贵！请在【资圣八角琉璃宝塔（bl_xg_pagoda）】归位真经并交割密函。',
            'success',
            '夜雨护经',
          ),
        ],
      },
    ],
  },

  scene_sls07_08: {
    id: 'scene_sls07_08',
    title: '第八幕 · 雨霁经安 · 佛塔晨光',
    subtitle: '资圣八角琉璃宝塔 · 晨光初照',
    mandatory: true,
    beats: [
      N('黎明时分雨收云散，资圣宝塔青绿琉璃瓦在朝阳下熠熠生辉。慧禅与净清恭敬地将御赐金字《华严经》重新请回顶层金龛，燃起三炷清香礼拜。'),
      S('NPC-0902', '{ifFlagEq:sl_s07_verdict=mercy|（合十感叹）“那踏云燕写完汴京雇主与锦云绸庄的交接供状后，竟跪在塔门前磕了三个响头，发誓从此洗手不干盗业！师兄这份既保真经又化贼心的胸襟，实在令小僧敬佩！”|（欢喜合十）“方才开封府捕头提走踏云燕与密函抄本，听闻牵涉权贵暗算佛门重宝，直夸少林铁面无私、正气凛然，这会儿汴京街头都传遍师兄夜雨擒贼的威名啦！”}'),
      S('NPC-0378', '“师弟所摹的那卷赝本《华严经》笔力清健，净清舍不得焚毁，竟装裱起来留作警示了。至于那封牵涉姑苏慕容外围商号的密函与供词，我已派快马星夜送回嵩山方丈室，必叫暗中图谋者无所遁形。”'),
    ],
    onFinishEffects: [openScene('scene_sls07_09', SHAOLIN_SIDE07_QUEST_ID)],
  },

  scene_sls07_09: {
    id: 'scene_sls07_09',
    title: '第九幕 · 护经扬名 · 卷终嘉奖',
    subtitle: '资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      S('NPC-0378', '“此役你凭书道识破太湖玉版笺、于百尺雨檐智擒江南飞贼踏云燕，既护御赐佛经无损，更令汴京武林知晓嵩山内门后继有人。经卷摹写与雨夜缠斗皆是难得历练，望师弟好生体悟！”'),
      P('（合十还礼）“护寺守经本是少林弟子分内之事，多谢慧禅师兄与净清师弟照拂！那姑苏锦云绸庄的线索，弟子也会牢记于心。”'),
      N('晨风拂过八角塔檐，铜铃清越悠扬。你收妥宗门嘉奖，望向烟波浩渺的汴京城池，步履愈发从容。'),
    ],
    choices: [
      {
        id: 'sls07_complete',
        label: '礼拜佛塔，记下姑苏慕容商号线索并收下宗门嘉奖！',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 320, reason: '百尺飞檐雨夜生擒江南飞贼踏云燕' },
          { type: 'addSectContribution', amount: 130 },
          { type: 'addArtExp', amount: 100 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyRenown', delta: 35, reason: '完成门派差事《资圣宝塔 · 夜雨护经》' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s07_verdict', op: 'eq', value: 'mercy' },
            thenEffects: [
              { type: 'modifyChivalry', delta: 15, reason: '宽宥未伤人命之贼并令其悔过自新' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0378' }, delta: 10 },
            ],
            elseEffects: [
              { type: 'modifyRenown', delta: 10, reason: '铁面移交开封府严查幕后权贵' },
            ],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE07_QUEST_ID, outcome: 'completed' },
          toast(
            '【资圣宝塔 · 夜雨护经】圆满完结！书法精进、江湖声望大增，获宗门贡献 130 与武学阅历 100！',
            'success',
            '夜雨护经',
          ),
        ],
      },
    ],
  },
}
