import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q20_QUEST_ID } from './shaolinLaymanCommanderQuest'

const SPEAKER_COURIER_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '传信武僧 · 虚明',
  title: '嵩山急信使者',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

const SPEAKER_CUI_OFFICIAL: StorySpeakerSpec = {
  kind: 'custom',
  name: '崔文清',
  title: '尚书礼部祠部郎中',
  factionName: '大宋朝廷',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

const SPEAKER_CORRUPT_OFFICIAL: StorySpeakerSpec = {
  kind: 'custom',
  name: '严世昌',
  title: '登封通判（贪官）',
  factionName: '地方贪官',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

const SPEAKER_ASSASSIN_LEAD: StorySpeakerSpec = {
  kind: 'custom',
  name: '严府死士首领 · 阴面张',
  title: '汴京截杀死士',
  factionName: '黑虎涧绿林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_BLACK_WIND: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑风煞',
  title: '嵩山绿林双煞之首',
  factionName: '黑虎涧绿林',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

const SPEAKER_BLOOD_WOLF: StorySpeakerSpec = {
  kind: 'custom',
  name: '血狼煞',
  title: '嵩山绿林双煞之次',
  factionName: '黑虎涧绿林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

function buildAssassinLead(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ20_ASSASSIN_A',
    name: '严府死士首领 · 阴面张',
    title: '汴京截杀死士',
    realm: '二流中品',
    factionName: '黑虎涧绿林',
    sectRank: 0,
    sectRankLabel: '死士首领',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“严大人有令，绝不能让这纸勘合文书出了开封府！把命和文书都留下！”',
    stats: { hp: 1580, mp: 1150, agi: 49, res: 34 },
    talents: { bone: 64, comprehension: 52, charm: 26 },
    equippedArts: { neigong: 'MA-123', move1: 'MA-131', move2: 'MA-125' },
    learnedArts: [{ artId: 'MA-123', level: 6 }, { artId: 'MA-131', level: 6 }, { artId: 'MA-125', level: 6 }],
  })
}

function buildAssassinMate(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ20_ASSASSIN_B',
    name: '黑虎涧暗桩 · 鬼手陆',
    title: '绿林刺客',
    realm: '二流下品',
    factionName: '黑虎涧绿林',
    sectRank: 0,
    sectRankLabel: '绿林暗桩',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“嘿嘿，宝塔阴暗处正好埋骨！纳命来！”',
    stats: { hp: 1320, mp: 900, agi: 46, res: 29 },
    talents: { bone: 60, comprehension: 48, charm: 24 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-150', move2: 'MA-146' },
    learnedArts: [{ artId: 'MA-140', level: 5 }, { artId: 'MA-150', level: 5 }, { artId: 'MA-146', level: 5 }],
  })
}

function buildBlackWindBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ20_BLACK_WIND',
    name: '黑风煞',
    title: '嵩山绿林双煞之首',
    realm: '一流下品',
    factionName: '黑虎涧绿林',
    sectRank: 0,
    sectRankLabel: '绿林大寇',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“坏了严通判与俺兄弟的好事，还敢在暴雨夜独自守在山道牌坊？今日便拿你的人头祭我黑风鬼头刀！”',
    stats: { hp: 2420, mp: 1960, agi: 59, res: 46 },
    talents: { bone: 76, comprehension: 62, charm: 34 },
    equippedArts: { neigong: 'MA-081', move1: 'MA-091', move2: 'MA-107' },
    learnedArts: [{ artId: 'MA-081', level: 7 }, { artId: 'MA-091', level: 8 }, { artId: 'MA-107', level: 7 }],
  })
}

function buildBloodWolfBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ20_BLOOD_WOLF',
    name: '血狼煞',
    title: '嵩山绿林双煞之次',
    realm: '二流上品',
    factionName: '黑虎涧绿林',
    sectRank: 0,
    sectRankLabel: '绿林巨寇',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“大哥劈他中路，俺从雨幕里掏他心窝！烧光这药庄，谁也查不到严大人的头上！”',
    stats: { hp: 1860, mp: 1420, agi: 53, res: 39 },
    talents: { bone: 70, comprehension: 54, charm: 28 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-131', move2: 'MA-125' },
    learnedArts: [{ artId: 'MA-140', level: 7 }, { artId: 'MA-131', level: 7 }, { artId: 'MA-125', level: 6 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq20_01: {
    id: 'scene_slq20_01',
    title: '第一幕 · 嵩山急羽',
    subtitle: '开封府 · 大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('{reignYear}盛夏，汴京城闷雷隐隐。你历经三番红尘大历练——{ifFlag:sl_q17_market_saved|相国寺西廊商户至今传颂你退还青蛇帮赃银的义举，|汴京瓦子至今敬畏你红尘刀杖荡平青蛇帮之威，}{ifFlag:sl_q18_mole_caught|洛阳金刀王家盛赞你验单擒内鬼、独杵退拓跋烈，|洛阳金刀王家犹颂你龙门石桥独杵退西夏铁骑之功，}更兼莆田南渡促成南北少林百年同源！此刻你正驻京核对两寺账目，忽见一名浑身湿透的嵩山武僧疾奔入殿！'),
      S(SPEAKER_COURIER_MONK, '（扑倒蒲团前高举火漆密函，气喘吁吁）“{gender:师兄|师姐}！大事不好！登封新任贪官通判【严世昌】眼红我少林三百亩外院药庄田产，竟携一纸伪造的『查核寺产赋税』公文上山，更勾结【黑虎涧绿林双煞】在药庄后山暗埋十余副锈蚀军甲栽赃！”'),
      S(SPEAKER_COURIER_MONK, '“严世昌扬言三日内若不交出药庄地契与十万贯赎罪银，便要奏报朝廷查封少林外院！方丈顾忌僧众与官军动手坐实谋逆罪名，特派我昼夜兼程送来急信！”'),
      P('（眸中精光骤亮，沉着叩案定计）“出家师父避忌与官衙周旋，方丈将急信送来汴京，正是要我以俗家护法之身破这官场毒局！太祖皇帝昔年御赐少林免税护寺敕牒正本存于礼部祠部司，且按《宋刑统》假传公文、诈索财物罪当流配三千里——恰巧礼部祠部郎中崔文清大人今日正在【资圣八角琉璃宝塔】校勘佛藏！”'),
      N('事不宜迟！你于香云殿偏厢研墨挥毫，以深厚经义、书法与策论写就《嵩山少林药庄蒙冤陈情疏》，怀揣奏疏直奔资圣八角琉璃宝塔！'),
    ],
    choices: [
      {
        id: 'slq20_accept_quest',
        label: '怀揣陈情疏，速赴【大相国寺 · 资圣八角琉璃宝塔】请领护寺勘合文书',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q20_QUEST_ID, stepId: 'imperial_writ' },
          setStep(SHAOLIN_Q20_QUEST_ID, 'imperial_writ'),
          toast('已开启《紫衣护寺 · 俗家都统》！请速赴【资圣八角琉璃宝塔】面谒崔文清大人！', 'talk', '紫衣护寺'),
        ],
      },
    ],
  },

  scene_slq20_02: {
    id: 'scene_slq20_02',
    title: '第二幕 · 宝塔陈情',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('资圣八角琉璃宝塔高耸入云，三层禅阁书卷飘香。礼部祠部郎中【崔文清】身着绯袍伏案核验大藏经印版，接过你端方刚劲的陈情疏细读良久，抚须惊叹。'),
      S(SPEAKER_CUI_OFFICIAL, '“好俊的楷书与策论！引太祖敕赐免税护寺旧制与《宋刑统》假传官文罪条句句切中肯綮！你竟是少林俗家护法弟子？”'),
      P('（拱手不卑不亢）“严世昌若真查获军械，依大宋律当立报河南府与提刑司会审，岂敢私持伪造查税公文向佛寺索要十万贯与药庄地契？恳请崔大人核验旧档，赐发礼部《护寺勘合文书》以正朝纲！”'),
      S(SPEAKER_CUI_OFFICIAL, '（慨然拍案，亲盖祠部司猩红大印签发勘合文书与致河南府尹密函）“官家仁厚，最恨地方苛吏敲诈寺观百姓！快带此勘合文书兼程归岳！”'),
      N('你辞别崔大人快步下塔，岂料刚踏入底层暗廊，琉璃影壁后骤然暴起两道黑影，寒光直扑怀中文书！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q20_writ_obtained', value: true },
      openScene('scene_slq20_03', SHAOLIN_Q20_QUEST_ID),
    ],
  },

  scene_slq20_03: {
    id: 'scene_slq20_03',
    title: '第三幕 · 塔廊破围',
    subtitle: '资圣八角琉璃宝塔 · 塔基暗廊（破围二策）',
    mandatory: true,
    beats: [
      S(SPEAKER_ASSASSIN_LEAD, '（声音嘶哑如枭，长刀寒光直指心口）“严大人早料到少林会派人进京请勘！鬼手陆，封死塔门，绝不能让这纸勘合文书出了开封府！”'),
      P('（反手格开激射而来的两枚毒蒺藜，护紧怀中油布文书冷笑）“严世昌连天子脚下皇家佛塔都敢派死士截杀礼部公文使者，当真是自寻死路！”'),
      N('严府死士首领【阴面张】与黑虎涧暗桩【鬼手陆】一前一后合围塔廊！然宝塔二层此刻尚有崔文清随行皇城司护卫驻守，暗廊石柱错落，进退之间尚有机变——'),
    ],
    choices: [
      {
        id: 'slq20_pagoda_guard',
        label: '【高声喝警 · 借势擒王】朗声喝破严府死士敢在皇家佛塔截杀公文使者，惊动护卫牵制鬼手陆、1v1 擒阴面张！',
        subLabel: '借朝廷威势拆散暗桩合围，单挑死士首领【阴面张】',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【辩才】≥ 50 或【策论】≥ 45',
          conditions: [
            { type: 'skillAtLeast', key: '辩才', min: 50 },
            { type: 'skillAtLeast', key: '策论', min: 45 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q20_pagoda_tactic', value: 'guard' },
          {
            type: 'startCombat',
            questId: SHAOLIN_Q20_QUEST_ID,
            opponent: { kind: 'custom', npc: buildAssassinLead() },
            rule: 'story_trial',
            forbidEscapeReason: '护寺勘合文书关乎少林千年清誉，寸步不可退！',
            introText: '【1v1 宝塔擒王】皇城司护卫闻声急驰截走鬼手陆，你独战严府死士首领【阴面张】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq20_04', SHAOLIN_Q20_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('阴面张招式阴狠，暂借宝塔石柱周旋回气再战！', 'warn', '汴京请勘'),
            ],
          },
        ],
      },
      {
        id: 'slq20_pagoda_gauntlet',
        label: '【独守暗廊 · 力战双凶】护紧怀中勘合文书，车轮连战鬼手陆与阴面张！',
        subLabel: '无门槛正攻：先破暗桩【鬼手陆】，再擒死士首领【阴面张】',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q20_pagoda_tactic', value: 'gauntlet' },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q20_QUEST_ID,
            opponent: { kind: 'custom', npc: buildAssassinMate() },
            extraOpponents: [{ kind: 'custom', npc: buildAssassinLead() }],
            rule: 'story_trial',
            forbidEscapeReason: '护寺勘合文书关乎少林千年清誉，寸步不可退！',
            introText: '【车轮连战 · 宝塔破围】迎战黑虎涧暗桩【鬼手陆】与死士首领【阴面张】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq20_04', SHAOLIN_Q20_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('死士招式阴狠，暂借宝塔石柱周旋回气再战！', 'warn', '汴京请勘'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq20_04: {
    id: 'scene_slq20_04',
    title: '第四幕 · 勘合归岳',
    subtitle: '大相国寺 · 资圣宝塔前',
    illustrationUrl: '/assets/quests/sl_20_imperial_writ.jpg',
    illustrationCaption: '资圣八角琉璃宝塔 · 手握朝廷朱印护寺勘合文书，破围策马星夜驰援嵩山',
    mandatory: true,
    beats: [
      N('数合交锋，你一式少林擒拿卸去阴面张双臂，将其生擒移交闻讯赶来的崔文清随行禁军！'),
      S(SPEAKER_CUI_OFFICIAL, '（勃然大怒，当即取下阴面张指认严世昌的画押供状并抄录副本交予你）“胆大包天！竟敢在天子脚下截杀礼部公文使者！少侠速携勘合文书与供状副本驰返嵩山，本官随后便奏请御史台发兵拿人！”'),
      P('（翻身上马，将油布密封的《护寺勘合文书》与供状副本贴身收妥）“多谢崔大人主持公道！晚辈这便换马不换人、星夜驰援嵩山！”'),
      N('官道乌云翻滚，你顶着疾风昼夜兼程疾驰三百余里，终在第三日申时暴雨欲坠之际赶回少室峰！'),
    ],
    choices: [
      {
        id: 'slq20_return_shaolin',
        label: '携《护寺勘合文书》直赴【嵩山少林寺 · 大雄正殿 · 佛前蒲团】迎战苛吏',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q20_QUEST_ID, 'blacktiger_rain'),
          toast('已请得朝廷《护寺勘合文书》！速返【嵩山少林寺 · 大雄正殿 · 佛前蒲团】舌战严世昌！', 'success', '紫衣护寺'),
        ],
      },
    ],
  },

  scene_slq20_05: {
    id: 'scene_slq20_05',
    title: '第五幕 · 堂前舌战',
    subtitle: '嵩山少林寺 · 大雄宝殿前广场（官场周旋）',
    mandatory: true,
    beats: [
      N('嵩山狂风呼啸、乌云压顶。大雄宝殿前广场上，数十名登封州府弓手手执水火棍与长枪围住石阶；登封通判【严世昌】大马金刀坐于官轿旁，趾高气扬地甩出一纸盖着模糊州印的「查核寺产赋税与私藏甲胄」公文封条！'),
      S(SPEAKER_CORRUPT_OFFICIAL, '（冷笑连连，指着亲自出殿周旋的玄慈方丈）“玄慈方丈，三日之期已到！药庄赋税欠账与后山锈甲人证物证俱在！今日要么画押献出三百亩药庄地契，要么本官这就命人撕毁佛幔、将药王院一干秃驴锁拿归案！”'),
      S('NPC-0112', '（双掌合十渊停岳峙，却因顾忌僧俗动武落人口实而眉宇凝重）“阿弥陀佛。严通判，出家人不打诳语，本寺既承太祖旧恩，后山锈甲亦绝非少林所有。”'),
      N('就在严世昌狞笑挥手欲强封山门之际，你青衫浴风大步踏上石阶，于数百僧众与数十州府弓手注目之下正面逼视贪官！面对苛吏借朝廷名义构陷逼宫，你决意如何当堂应对——'),
    ],
    choices: [
      {
        id: 'slq20_debate_law',
        label: '高举礼部《护寺勘合文书》，援引太祖御赐免税敕牒与《宋刑统》假传公文、诈索财物罪当流配三千里，当众宣读阴面张供状喝退弓手！',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q20_official_rebuked', value: true },
          { type: 'setFlag', flag: 'sl_q20_court_done', value: true },
          { type: 'setFlag', flag: 'sl_q20_debate_choice', value: 'law' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
          {
            type: 'branch',
            condition: {
              type: 'any',
              conditions: [
                { type: 'skillAtLeast', key: '辩才', min: 55 },
                { type: 'skillAtLeast', key: '策论', min: 45 },
              ],
            },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q20_eloquent_rebuke', value: true },
              { type: 'modifyRenown', delta: 15, reason: '大雄宝殿前以大宋律法与亮堂大义舌战折服登封弓手' },
            ],
            elseEffects: [],
          },
          openScene('scene_slq20_06', SHAOLIN_Q20_QUEST_ID),
        ],
      },
      {
        id: 'slq20_debate_force',
        label: '按刀踏阶高喝少林千年祖庭岂容狗官撒野，以少林护法威势强行震慑弓手、欲当场扣留严世昌押赴河南府！',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q20_official_rebuked', value: false },
          { type: 'setFlag', flag: 'sl_q20_court_done', value: true },
          { type: 'setFlag', flag: 'sl_q20_debate_choice', value: 'force' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          openScene('scene_slq20_07', SHAOLIN_Q20_QUEST_ID),
        ],
      },
      {
        id: 'slq20_debate_compromise',
        label: '顾忌僧众与官军当场起冲突坐实构陷，权且应允暂纳二千贯岁贡破财消灾，待严世昌撤兵后再持文书暗禀河南府！',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q20_official_rebuked', value: false },
          { type: 'setFlag', flag: 'sl_q20_court_done', value: true },
          { type: 'setFlag', flag: 'sl_q20_debate_choice', value: 'compromise' },
          openScene('scene_slq20_07', SHAOLIN_Q20_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq20_06: {
    id: 'scene_slq20_06',
    title: '第六幕 · 律法伏奸',
    subtitle: '大雄宝殿前广场（舌战完胜）',
    mandatory: true,
    beats: [
      P('（双手高举猩红礼部大印勘合文书，声音如洪钟震彻殿前）“严世昌，你手里那张模糊封条才是假传公文！太祖御赐嵩山少林免税护寺敕牒明载礼部祠部司旧档，依《宋刑统》假传公文、诈索财物罪当流配三千里！更兼你在京派死士阴面张截杀公文使者，供状画押在此——诸位弓手听真，谁敢再助待罪贪官动佛门一草一木，一律以同谋论处！”'),
      N('{ifFlag:sl_q20_eloquent_rebuke|你辞锋如电、大义凛然，条分缕析讲透大宋法度与佛门救济灾民之功，数十名登封弓手听得羞愧难当，齐刷刷抛下水火棍朝大雄宝殿拱手称颂！|数十名州府弓手闻听礼部勘合与同谋连坐之罪顿时魂飞魄散，纷纷丢下封条连退三步！}'),
      S(SPEAKER_CORRUPT_OFFICIAL, '（面无人色、双腿一软险些跌下官轿，官帽歪斜尖声大叫）“你……区区俗家弟子怎可能请动礼部祠部郎中……撤！快撤下山！”——严世昌抱头鼠窜，殊不知山脚官道河南府缉拿马队已严阵以待！'),
      S('NPC-0112', '（合十深深一礼，眼中满是欣慰）“善哉！不费一兵一卒便以王法大义喝退苛吏，真乃我少林大幸！只是严世昌既已败露，黑虎涧绿林双煞必怕药庄活口指认，今夜暴雨遮掩定会夜袭灭口——”你按刀请命独守黑虎岭下药庄牌坊！'),
    ],
    onFinishEffects: [openScene('scene_slq20_08', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_07: {
    id: 'scene_slq20_07',
    title: '第六幕 · 堂前失算',
    subtitle: '大雄宝殿前广场（官场暗涌）',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q20_debate_choice=force|你按刀踏阶欲强行扣人，严世昌反倒逮住把柄尖叫「少林僧俗公然劫持朝廷命官」，几十名登封弓手顿时抽刀逼上石阶！幸亏玄慈及时亮出你带回的礼部勘合方未酿成血案，严世昌却借乱遁走，恶狠狠留话今夜必教黑虎涧双煞血洗药庄！|你意在暂纳岁贡破财消灾，严世昌见少林显露退意愈发趾高气扬；虽因瞥见你怀中礼部朱印不敢强封山门，仍阴笑着退兵下山，暗中急遣心腹催动黑虎涧绿林双煞连夜扑山灭口！}'),
      S('NPC-0112', '（轻叹一声，目光仍透着沉静期许）“阿弥陀佛。官场诡谲非单凭武力或隐忍可破，唯有王法铁证方能釜底抽薪。如今严世昌虽难明面封寺，黑虎涧绿林双煞【黑风煞】与【血狼煞】却必趁今夜暴雨偷袭药庄——”'),
      P('（望向骤然倾盆而下的豆大雨点，手按长刀沉声抱拳）“方丈宽心！方才堂前既未彻底斩断严贼羽翼，今夜黑虎岭山道牌坊便由弟子一人独守，绝不教双煞踏入药庄半步！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_08', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_08: {
    id: 'scene_slq20_08',
    title: '第七幕 · 单刀赴雨',
    subtitle: '黑虎岭外院药庄牌坊 · 子夜暴雨（多策破局）',
    illustrationUrl: '/assets/quests/sl_20_blacktiger_rain.jpg',
    illustrationCaption: '子夜暴雨 · 单刀孤身镇守嵩山药庄牌坊，雷电交加中力战绿林双煞',
    mandatory: true,
    beats: [
      N('子夜雷鸣电闪，倾盆暴雨如天河倒泻。你令药庄医僧退入内殿，独自披蓑提刀静立青石牌坊之下。数年历练所得的普门杖意、慈悲刀心、韦陀降魔与南北少林神功，此刻在丹田奔涌贯通！'),
      N('一道惨白闪电撕裂黑虎岭山道雨幕！豫西绿林巨寇【黑风煞】与【血狼煞】提着厚背鬼头大刀与狼牙刃率众悍匪踏水杀至，血腥煞气扑面而来！'),
      S(SPEAKER_BLACK_WIND, '（狞笑声压过滚雷）“血狼老弟你瞧，少林秃驴竟只派了个带发小子独守山道！先剁了这小崽子，再一把火把药庄连同证人烧个精光！”'),
      S(SPEAKER_BLOOD_WOLF, '（舔去唇边雨水，凶睛泛红）“大哥劈他中路，俺从雨幕死角掏他心窝！”'),
      N('暴雨倾盆、山道湿滑。面对一流下品黑风煞与二流上品血狼煞的雨夜合围，你电光石火间决断破阵之策——'),
    ],
    choices: [
      {
        id: 'slq20_rain_divide',
        label: '【雨夜诱敌 · 各个击破】高喝严世昌败逃落网之实情瓦解贼众，借雨幕奇袭先制血狼煞，直面黑风煞 1v1！',
        subLabel: '拆解双煞合击，暴雨中 1v1 独战一流下品【黑风煞】',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需已在公堂吓退严世昌 或 实战身法 ≥ 55',
          conditions: [
            { type: 'flag', flag: 'sl_q20_official_rebuked', op: 'truthy', label: '已在公堂当众吓退苛吏严世昌' },
            { type: 'combatStatAtLeast', key: 'agility', min: 55 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q20_rain_tactic', value: 'divide' },
          {
            type: 'startCombat',
            questId: SHAOLIN_Q20_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBlackWindBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '药庄医僧与少林清誉尽在身后，此战唯有斩煞方休！',
            introText: '【1v1 雨夜斩魁】贼众溃散、血狼煞失陷，你于暴雨雷电中独战一流下品【黑风煞】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq20_09', SHAOLIN_Q20_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('黑风煞刀势霸道异常，暂退牌坊廊下调匀内息后再战！', 'warn', '雨夜斩煞'),
            ],
          },
        ],
      },
      {
        id: 'slq20_rain_gauntlet',
        label: '【紫衣独闯 · 雨夜斩双煞】掀落斗笠单刀直进，暴雨中车轮连战血狼煞与黑风煞！',
        subLabel: '无门槛死战：先斩【血狼煞】（二流上品），再诛【黑风煞】（一流下品）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q20_rain_tactic', value: 'gauntlet' },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q20_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBloodWolfBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildBlackWindBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '药庄医僧与少林清誉尽在身后，此战唯有斩煞方休！',
            introText: '【车轮连战 · 雨夜斩煞】暴雨中单刀迎战嵩山绿林双煞【血狼煞】与【黑风煞】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq20_09', SHAOLIN_Q20_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('绿林双煞合击凶悍异常，暂退牌坊廊下调匀内息后再战！', 'warn', '雨夜斩煞'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq20_09: {
    id: 'scene_slq20_09',
    title: '第八幕 · 双煞伏诛',
    subtitle: '嵩山外院药庄 · 黎明初霁',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q20_rain_tactic=divide|你暴雨中一声断喝揭破严世昌早已败逃落网，外围黑虎涧喽啰顿时哗然溃散！血狼煞惊怒冒进，反被你借湿滑山道一记擒拿摔昏在青石阶下；黑风煞孤身疯魔扑杀，终被你借一道劈空闪电斩断鬼头大刀、透胸伏诛！|苦战三十余合，雷声轰鸣！你以南宗《盘山铁布衫（大成）》震脱血狼煞利刃、反手《龙爪手》扣喉斩杀之；黑风煞疯魔反扑，被你借劈空惊雷一刀断刃透胸，豫西绿林双凶双双伏诛于血雨之中！}'),
      N('次日黎明，暴雨初歇，嵩山少室峰云海翻涌，朝阳洒满金瓦红墙。河南府官军连夜将贪官严世昌收押下狱，少林外院药庄三百亩药田丝毫无损。'),
      N('大雄宝殿钟鼓齐鸣一百零八响——此乃少林寺唯有册封真传首座或护寺大功臣方才动用的至高礼仪！知客僧恭敬步至寮房外合十相请：玄慈方丈与达摩、罗汉、戒律三院高僧已在【大雄正殿 · 佛前蒲团】等候！'),
    ],
    choices: [
      {
        id: 'slq20_go_investiture',
        label: '整肃衣冠，步入【大雄正殿 · 佛前蒲团】面见玄慈方丈',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q20_QUEST_ID, 'commander_investiture'),
          toast('黑虎涧双煞已伏诛！请步入【大雄正殿 · 佛前蒲团】受玄慈方丈册封！', 'success', '紫衣护寺'),
        ],
      },
    ],
  },

  scene_slq20_10: {
    id: 'scene_slq20_10',
    title: '第九幕 · 破格册封',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('踏入大雄正殿，香烟如柱，玄字辈高僧分列两厢，数百名少林僧俗弟子肃立殿外阶前，无数敬佩目光皆汇聚在你一人身上。'),
      S('NPC-0112', '（端坐方丈法座，声音浑厚慈和传遍全殿）“阿弥陀佛。自你择定【俗家护法脉】以来：先于汴京相国寺夜荡青蛇帮、护持万姓雅市；继于洛阳伊阙龙门石桥力拒西夏铁骑、保全千斤紫金佛像；复千里南渡莆田九莲山、夜斩东瀛海寇、促成南北少林重归同源！”'),
      S('NPC-0112', '“如今更于寺门蒙冤之际，单骑进京请出朝廷勘合、{ifFlag:sl_q20_official_rebuked|于大殿前凭王法大义舌战喝退贪官、|于危局中临危不乱力挽狂澜、}复于子夜暴雨斩杀黑虎涧绿林双煞保全药庄！此等智勇忠义之大功，纵观少林百年史册亦属罕见！”'),
      S('NPC-0112', '（起身缓步走下法座，亲手自鎏金托盘捧起一件织金紫衣护法大氅与一枚玄铁蟠龙令牌）“佛法不离世间觉，护法岂分剃度与否？经老衲与三院长老合议，今日破格晋升你为嵩山少林寺【紫衣护寺 · 俗家护法都统】，享少林真传弟子职级（Lv.3），总领天下少林俗家护法外务！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_11', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_11: {
    id: 'scene_slq20_11',
    title: '第十幕 · 紫衣立誓',
    subtitle: '大雄正殿 · 册封大典（都统誓言抉择）',
    illustrationUrl: '/assets/quests/sl_20_layman_commander.jpg',
    illustrationCaption: '大雄正殿 · 玄慈方丈亲赐紫衣与玄铁令牌，破格晋升少林 Lv.3 俗家护法都统',
    mandatory: true,
    beats: [
      N('你上前一步单膝跪地，双手接过织金紫衣护法大氅与冰凉沉实的玄铁蟠龙令牌。披氅起身之际，虽未剃发披缁，眉宇间却自有一股凛然不可侵犯的佛门金刚正气！'),
      N('殿外数百名少林僧俗弟子齐声合十诵贺：“阿弥陀佛！贺喜俗家护法都统！”声浪震彻少室山林。'),
      S('NPC-0112', '（含笑颔首，眸光深远）“既登真传之位、总领天下少林俗家外务，藏经阁更深处的佛门绝学与天下更大的风浪皆在前方等你。今日于释迦佛前授牌，你且立下自己的俗家都统誓言——”'),
    ],
    choices: [
      {
        id: 'slq20_oath_mercy',
        label: '【红尘侠骨 · 护生护寺】带发修行、常怀慈悲，以手中刀杖护天下苍生兼护少林千年祖庭！',
        subLabel: '菩萨低眉济世之道（禅心慈悲 +2 · 侠义 +30）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q20_oath', value: 'mercy' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
          { type: 'modifyChivalry', delta: 30, reason: '册封少林紫衣俗家护法都统，立誓护生护寺' },
          openScene('scene_slq20_12', SHAOLIN_Q20_QUEST_ID),
        ],
      },
      {
        id: 'slq20_oath_iron',
        label: '【铁腕威名 · 镇慑群宵】江湖风云诡谲，当以铁腕俗家威名震慑中原贪吏与魔道群宵！',
        subLabel: '金刚怒目伏魔之道（怒目杀业 +2 · 声望 +30）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q20_oath', value: 'iron' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
          { type: 'modifyRenown', delta: 30, reason: '册封少林紫衣俗家护法都统，立誓铁腕镇慑群宵' },
          openScene('scene_slq20_12', SHAOLIN_Q20_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq20_12: {
    id: 'scene_slq20_12',
    title: '第十一幕 · 声震中原',
    subtitle: '嵩山少林寺 · 山门远眺',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q20_oath=mercy|玄慈方丈闻言合十微笑，连赞三声善哉，称你已深得「佛法在世间，不离世间觉」之大乘真意；|玄慈方丈颔首轻叹，嘱你金刚霹雳手段虽可慑尽天下群宵，切莫忘却心底那一盏慈悲明灯；}三院长老与满殿同门亦齐齐拱手致敬。'),
      N('不日，嵩山少林寺破格册封「紫衣俗家护法都统」的消息随官道驿马传遍大宋诸路——汴京相国寺西廊商贾额手称庆，洛阳金刀王家遣使厚贺，莆田南少林亦飞鸽寄来元苦大师亲题贺联。'),
      P('（立于嵩山山门青石远眺中原苍茫山河，轻抚腰间玄铁都统令牌，唇角扬起笃定笑意）“带发修行，紫衣护寺。自今日起，我便是少林俗家护法都统——天下英雄，且拭目以待！”'),
    ],
    choices: [
      {
        id: 'slq20_finish_reward',
        label: '拜谢玄慈方丈，正式晋升少林 Lv.3【俗家护法都统】（完成）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 3, promoteOnly: true },
          { type: 'giveCombatExp', amount: 550, reason: '汴京请勘喝退贪官、暴雨夜单刀斩绿林双煞并晋升俗家护法都统' },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifyRenown', delta: 90, reason: '破格受封嵩山少林寺紫衣俗家护法都统，声震中原' },
          { type: 'modifySkill', key: '策论', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0112' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_Q20_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《紫衣护寺 · 俗家都统》！破格晋升嵩山少林寺 Lv.3 真传职级（俗家护法都统），威望 +90！',
            'success',
            '紫衣护寺',
          ),
        ],
      },
    ],
  },
}
