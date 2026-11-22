import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, S, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { TAISHAN_ENTRY_QUEST_ID } from './taishanEntryQuest'

const EXTRA_SCENES: Record<string, StorySceneDef> = {}
function regScene(sc: StorySceneDef): string {
  EXTRA_SCENES[sc.id] = sc
  return sc.id
}

const SPEAKER_HEIFENG_THUG: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑风寨喽啰',
  title: '京东山匪',
  factionName: '黑风寨',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_HEIFENG_SECOND: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑风寨二当家',
  title: '京东悍匪头目',
  factionName: '黑风寨',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_TAISHAN_SENIOR: StorySpeakerSpec = {
  kind: 'custom',
  name: '泰山外门师兄',
  title: '东岳道院弟子',
  factionName: '泰山派',
  portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
}

function buildHeifengThugNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_TS_HEIFENG_THUG',
    name: '黑风寨喽啰',
    title: '京东山匪 · 截路抢牌者',
    realm: '不入流',
    factionId: 'SECT-00',
    factionName: '黑风寨',
    sectRank: 0,
    sectRankLabel: '山匪',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“把那块泰山试剑木牌交出来，爷爷饶你不死！”',
    stats: { hp: 135, mp: 50, agi: 10, res: 4 },
    talents: { bone: 35, comprehension: 28, charm: 20 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-189' },
    learnedArts: [{ artId: 'MA-238', level: 1 }, { artId: 'MA-189', level: 1 }],
  })
}

function buildTaishanSeniorNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_TS_OUTER_SENIOR',
    name: '泰山外门师兄',
    title: '东岳道院 · 试剑考校师兄',
    realm: '不入流',
    factionId: 'SECT-06',
    factionName: '泰山派',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
    talk: '“师弟请出剑，让我看看你这几天泰山剑法的长进！”',
    stats: { hp: 150, mp: 60, agi: 12, res: 4 },
    talents: { bone: 45, comprehension: 42, charm: 40 },
    equippedArts: { neigong: 'MA-181', move1: 'MA-187' },
    learnedArts: [{ artId: 'MA-181', level: 1 }, { artId: 'MA-187', level: 1 }],
  })
}

function buildHeifengSecondNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_TS_HEIFENG_SECOND',
    name: '黑风寨二当家',
    title: '京东悍匪 · 劫囚头目',
    realm: '三流下品',
    factionId: 'SECT-00',
    factionName: '黑风寨',
    sectRank: 0,
    sectRankLabel: '二当家',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“泰山牛鼻子的小崽子也敢押人？给我把人留下！”',
    stats: { hp: 255, mp: 100, agi: 15, res: 9 },
    talents: { bone: 50, comprehension: 38, charm: 25 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-189', move2: 'MA-186' },
    learnedArts: [{ artId: 'MA-238', level: 2 }, { artId: 'MA-189', level: 2 }, { artId: 'MA-186', level: 2 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  // 第 1 幕：岱庙验底 · 只收白纸
  scene_ts_01_daimiao_verify: {
    id: 'scene_ts_01_daimiao_verify',
    title: '第一幕 · 岱庙验底',
    subtitle: '济南府 · 泰山岱庙行祠',
    mandatory: true,
    beats: [
      N('{reignYear}的济南府泰山岱庙行祠古柏森森，香火肃穆。你整理衣衫上前，向驻守外门的泰山长老天松道人行礼表明拜山之意。'),
      S('NPC-0204', '（抬眸上下打量你片刻，伸指搭上你腕脉）“嗯……筋骨虽未开，倒也干净。未曾投入过他派门墙，身上也没有半点别家良品高深武学的杂气。”'),
      S('NPC-0204', '“我泰山派五岳独尊，宁缺毋滥，只收白纸一张的清白弟子。想上泰山，先去济南【趵突泉（观澜榭）】把那块十斤重的『铁木试剑牌』单手托住一炷香，扛得动再说话！”'),
    ],
    choices: [
      {
        id: 'ts01_accept',
        label: '拱手领命，动身前往趵突泉观澜榭',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: TAISHAN_ENTRY_QUEST_ID },
          { type: 'setQuestStep', questId: TAISHAN_ENTRY_QUEST_ID, stepId: 'baotu_iron_plaque' },
          toast('天松道人已验明你白纸清白之身，请前往【趵突泉（观澜榭）】托举铁木试剑牌！', 'talk', '岱庙验底'),
        ],
      },
    ],
  },

  // 第 2 幕：趵突观澜 · 试剑铁牌
  scene_ts_02_baotu_iron_plaque: {
    id: 'scene_ts_02_baotu_iron_plaque',
    title: '第二幕 · 趵突托牌',
    subtitle: '济南府 · 趵突泉（观澜榭）',
    mandatory: true,
    beats: [
      N('趵突泉水势奔涌，观澜榭石坪上摆着一块黑漆沉木打造的『东岳铁木试剑牌』，足有十斤之重。'),
      S('NPC-0204', '“不考你算术文章，只看筋骨耐力。单手平举过肩，稳立一炷香不落，这登岳凭证便归你。”'),
      N('你深吸一口气，五指扣紧沉木牌边缘平举而出。初时犹可，半炷香后肩臂酸麻如针扎，冷汗顺着鬓角滑落——你死死咬住牙关稳住腕力，硬生生熬到香尽落地！'),
    ],
    choices: [
      {
        id: 'ts02_claim_plaque',
        label: '稳稳收臂接牌，拜别天松道人南赴泰山',
        tone: 'jade',
        effects: [
          toast('筋骨试炼过关！出城南行赴泰山途中似乎有人影鬼祟……', 'talk', '铁牌到手'),
          openScene('scene_ts_03_heifeng_ambush', TAISHAN_ENTRY_QUEST_ID),
        ],
      },
    ],
  },

  // 第 3 幕：黑风截牌 · 凡躯退匪
  scene_ts_03_heifeng_ambush: {
    id: 'scene_ts_03_heifeng_ambush',
    title: '第三幕 · 黑风截牌',
    subtitle: '济南南门山道',
    mandatory: true,
    beats: [
      N('刚出济南南门行至山麓松林，两名手持短刀的黑风寨喽啰突然从林后蹿出拦住去路。'),
      S(SPEAKER_HEIFENG_THUG, '“听说泰山派今年招新只收白丁，老子正缺一块试剑木牌混上山去探路！识相的把牌子留下，否则捅你三个透明窟窿！”'),
      N('四周并无旁人相助，你手无名门神功，只能凭凡躯拳脚与山道地形死磕到底！'),
    ],
    choices: [
      {
        id: 'ts03_fight_thug',
        label: '护紧木牌迎战黑风寨喽啰！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            opponent: { kind: 'custom', npc: buildHeifengThugNpc() },
            rule: 'duel',
            forbidEscapeReason: '若弃牌逃跑，便无颜再登泰山！',
            onWin: [
              { type: 'setQuestStep', questId: TAISHAN_ENTRY_QUEST_ID, stepId: 'climb_18pan' },
              { type: 'giveSilver', amount: 10, reason: '击退黑风寨喽啰缴获盘缠' },
              toast('你以凡躯硬生生打退黑风寨喽啰保住木牌！请前往【东岳泰山 · 十八盘云梯石阶】！', 'success', '凡躯退匪'),
            ],
            onLose: [
              openScene(
                regScene({
                  id: 'scene_ts_03_heifeng_lose',
                  title: '山道受挫 · 稳住再战',
                  beats: [
                    N('山匪短刀颇为刁钻，你退后两步滚入松林躲过一劈，紧紧抱住怀里铁木试剑牌喘息回气。'),
                  ],
                  choices: [
                    {
                      id: 'ts03_retry',
                      label: '咬牙爬起，再度迎上去夺路',
                      tone: 'default',
                      effects: [{ type: 'healPlayer', hpPct: 80, mpPct: 80 }],
                    },
                  ],
                }),
                TAISHAN_ENTRY_QUEST_ID,
              ),
            ],
          },
        ],
      },
    ],
  },

  // 第 4 幕：红门石阶 · 十八盘阻路（配 CG: taishan_18pan_buckets.jpg）
  scene_ts_04_18pan_water_rule: {
    id: 'scene_ts_04_18pan_water_rule',
    title: '第四幕 · 十八盘阻路',
    subtitle: '东岳泰山 · 十八盘云梯石阶',
    illustrationUrl: '/assets/quests/taishan_18pan_buckets.jpg',
    mandatory: true,
    beats: [
      N('千级石阶直插云霄，山风凛冽。铁剑道人单天门负剑立在十八盘山门前，扫了一眼你递上的铁木牌，指了指脚边两只盛满山泉的大木桶。'),
      S('NPC-0168', '“泰山剑法讲究『势沉如岳、步稳如松』。下盘浮躁之人，拿不动我东岳重剑。挑上这两担水登完十八盘，半滴不洒，才准进东岳道院。”'),
    ],
    choices: [
      {
        id: 'ts04_shoulder_buckets',
        label: '挑起扁担，踏上十八盘第一级石阶',
        tone: 'gold',
        effects: [openScene('scene_ts_05_climb_18pan', TAISHAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 5 幕：云梯挑泉 · 咬牙登顶（作弊即永绝泰山）
  scene_ts_05_climb_18pan: {
    id: 'scene_ts_05_climb_18pan',
    title: '第五幕 · 云梯挑泉',
    subtitle: '十八盘云梯石阶',
    mandatory: true,
    beats: [
      N('石阶陡如天梯，扁担死死压进肩胛骨肉里，每跨一步，两桶山泉便晃出一道水花，险些泼出桶沿。'),
      N('行至半山拐角，四下云雾遮眼，单天门的身影早已落在下方百丈之外……'),
    ],
    choices: [
      {
        id: 'ts05_steady_horse_stance',
        label: '沉腰坠胯、步步踩实青石阶，宁慢不晃挑水上山',
        tone: 'default',
        effects: [openScene('scene_ts_06_measure_water', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'ts05_cheat_pour_water',
        label: '趁云雾遮眼悄悄倒掉小半桶水，待到山顶再寻山泉补满',
        tone: 'default',
        effects: [openScene('scene_ts_05_cheat_expelled', TAISHAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 5 幕作弊淘汰分支
  scene_ts_05_cheat_expelled: {
    id: 'scene_ts_05_cheat_expelled',
    title: '欺师作弊 · 永绝泰山',
    subtitle: '十八盘云梯石阶',
    mandatory: true,
    beats: [
      N('你刚俯身把半桶泉水倒进石缝，头顶松枝忽然一颤——单天门不知何时已抄近路立在上方石台，冷眼俯视着你！'),
      S('NPC-0168', '“好一个自作聪明的小贼！连挑水都敢欺瞒师长，日后还指望你守什么五岳正道？把木牌放下，滚下泰山，此生莫再登东岳一步！”'),
    ],
    choices: [
      {
        id: 'ts05_cheat_confirm',
        label: '羞愧交加，被逐下十八盘',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'ts_permanently_rejected', value: true },
          { type: 'abandonQuest', questId: TAISHAN_ENTRY_QUEST_ID },
          { type: 'teleportPlayer', regionId: 'jinan', buildingId: 'jn_daimiao', spotId: 'jn_daimiao_east' },
          toast('挑水作弊遭单天门当场逐出，此生永绝泰山派！', 'warn', '永绝泰山'),
        ],
      },
    ],
  },

  // 第 6 幕：竹尺量水 · 单师叔点头
  scene_ts_06_measure_water: {
    id: 'scene_ts_06_measure_water',
    title: '第六幕 · 竹尺验水',
    subtitle: '五大夫松观云亭',
    mandatory: true,
    beats: [
      N('你双肩磨得红肿渗血，终于咬牙挑着两桶山泉登顶五大夫松旁的水缸。单天门早已等在缸边，拿出一根刻寸竹尺探入水中一量。'),
      S('NPC-0168', '（竹尺提起，水位分毫不差）“嗯，半滴未少，下盘也稳。筋骨还算扎实，没丢我东岳的脸。今晚在观云亭歇息，明日一早去东岳道院见天柏师兄。”'),
    ],
    choices: [
      {
        id: 'ts06_rest_pavilion',
        label: '谢过单师叔，在观云亭暂歇养力',
        tone: 'jade',
        effects: [openScene('scene_ts_07_night_bell_spy', TAISHAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 7 幕：夜巡观云亭 · 鸣钟擒探
  scene_ts_07_night_bell_spy: {
    id: 'scene_ts_07_night_bell_spy',
    title: '第七幕 · 观云鸣钟',
    subtitle: '五大夫松观云亭',
    mandatory: true,
    beats: [
      N('夜半山风呼啸，你肩酸难眠干脆起身练桩，却瞥见一道黑影正猫腰贴着松树根摸向道院外墙，手里还捏着一张炭笔布防图！'),
      N('你认出对方袖口露出的正是黑风寨徽记，当即一脚踹响亭边铜钟，随即扑上去死死缠住那名探子！'),
      N('“铛——！”钟声响彻山谷，执法弟子转瞬赶至，合众人之力将黑风寨探子五花大绑按倒在地。'),
    ],
    choices: [
      {
        id: 'ts07_go_daoyuan',
        label: '天亮后前往【泰山派东岳道院】听候天柏长老传功',
        tone: 'gold',
        effects: [
          { type: 'setQuestStep', questId: TAISHAN_ENTRY_QUEST_ID, stepId: 'daoyuan_neigong_spar' },
          { type: 'teleportPlayer', regionId: 'taishan', buildingId: 'ts_daoyuan', spotId: 'ts_daoyuan_west' },
          toast('夜擒黑风探子立下护山小功，已抵达【泰山派东岳道院】！', 'success', '护山擒探'),
        ],
      },
    ],
  },

  // 第 8 幕：松风引气 · 道院授剑（配 CG: taishan_pine_neigong.jpg）
  scene_ts_08_daoyuan_teach_sword: {
    id: 'scene_ts_08_daoyuan_teach_sword',
    title: '第八幕 · 道院授剑',
    subtitle: '泰山派东岳道院 · 苍松石坪演剑院',
    illustrationUrl: '/assets/quests/taishan_pine_neigong.jpg',
    mandatory: true,
    beats: [
      N('东岳道院苍松掩映。执法长老天柏道人听闻你挑水过关又夜擒山匪探子，面上终于露出一丝宽慰。'),
      S('NPC-0205', '“好！先有挑水沉胯的苦功，又有护山之胆，这才像我泰山门人。今日传你《泰山松风养气诀》与《泰山剑法（筑基篇）》，把昨日挑水时的沉劲化进剑招里去！”'),
      N('天柏道人持剑演示三遍，字字沉稳如山。你依诀吐纳行气，只觉丹田一缕清气缓缓升起，手中木剑挥落竟带起沉闷风声！'),
    ],
    choices: [
      {
        id: 'ts08_learn_sword',
        label: '叩谢传功，就地演练三遍《泰山剑法》',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-225', level: 1, exp: 1200, autoEquip: true },
          { type: 'teachMartialArt', artId: 'MA-168', level: 1, exp: 1000, autoEquip: true },
          toast('习得《泰山松风养气诀》与《泰山剑法（筑基篇）》！', 'success', '松风破茧'),
          openScene('scene_ts_09_senior_spar', TAISHAN_ENTRY_QUEST_ID),
        ],
      },
    ],
  },

  // 第 9 幕：苍松剑坪 · 同门试锋
  scene_ts_09_senior_spar: {
    id: 'scene_ts_09_senior_spar',
    title: '第九幕 · 苍松试锋',
    subtitle: '苍松石坪演剑院',
    mandatory: true,
    beats: [
      S('NPC-0205', '“光自己瞎练不行。来人，叫外门弟子与新来的{gender:师弟|师妹}拆几招，看看把泰山剑学进去了几分！”'),
      S(SPEAKER_TAISHAN_SENIOR, '（拱手持剑而立）“{gender:师弟|师妹}，得罪了！请亮剑吧！”'),
    ],
    choices: [
      {
        id: 'ts09_spar_senior',
        label: '持剑出列，与外门师兄实战试锋！',
        tone: 'jade',
        effects: [
          {
            type: 'startCombat',
            opponent: { kind: 'custom', npc: buildTaishanSeniorNpc() },
            rule: 'spar',
            maxRounds: 8,
            onWin: [openScene('scene_ts_10_heavy_sword_insight', TAISHAN_ENTRY_QUEST_ID)],
            onLose: [
              openScene(
                regScene({
                  id: 'scene_ts_09_spar_lose',
                  title: '剑招未熟 · 调息再试',
                  beats: [
                    S('NPC-0205', '“下盘还是飘了些！歇口气再上去比过，胜了同门才算站稳脚跟。”'),
                  ],
                  choices: [
                    {
                      id: 'ts09_retry',
                      label: '调息回气，再度请师兄赐教',
                      tone: 'default',
                      effects: [{ type: 'healPlayer', hpPct: 80, mpPct: 80 }],
                    },
                  ],
                }),
                TAISHAN_ENTRY_QUEST_ID,
              ),
            ],
          },
        ],
      },
    ],
  },

  // 第 10 幕：单师指点 · 泰山重剑
  scene_ts_10_heavy_sword_insight: {
    id: 'scene_ts_10_heavy_sword_insight',
    title: '第十幕 · 重剑沉势',
    subtitle: '苍松石坪演剑院',
    mandatory: true,
    beats: [
      N('一番交手下来，你一招力劈压得师兄退后两步收剑认输。旁观的单天门走上前来，伸手敲了敲你的剑脊。'),
      S('NPC-0168', '“还凑合。记住，泰山剑不是江南细剑，切忌贪快求巧！出剑要学这东岳山势——一剑压下，教人退无可退！”'),
      N('单天门言简意赅几句点拨，令你豁然开朗，手腕沉劲再增几分！'),
    ],
    choices: [
      {
        id: 'ts10_insight_gain',
        label: '谨记单师叔教诲，领命押匪下山',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-168', amount: 1800 },
          toast('经单天门点拨，《泰山剑法（筑基篇）》修为大进！', 'success', '重剑悟理'),
          openScene('scene_ts_11_escort_bandit_battle', TAISHAN_ENTRY_QUEST_ID),
        ],
      },
    ],
  },

  // 第 11 幕：山门清理 · 押匪破劫囚
  scene_ts_11_escort_bandit_battle: {
    id: 'scene_ts_11_escort_bandit_battle',
    title: '第十一幕 · 押匪破寨',
    subtitle: '泰山山麓官道',
    mandatory: true,
    beats: [
      N('天柏道人命你将昨夜擒下的黑风寨探子押赴山门外移交官府巡检。行至半山腰石桥，林间忽然杀出一伙悍匪！'),
      S(SPEAKER_HEIFENG_SECOND, '“把老子兄弟放了！泰山牛鼻子的小崽子也敢多管闲事，找死！”'),
      N('黑风寨二当家挥刀直扑而来，这正是检验你新学泰山剑法之时！'),
    ],
    choices: [
      {
        id: 'ts11_fight_second',
        label: '拔剑护住囚徒，正面迎战黑风寨二当家！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            opponent: { kind: 'custom', npc: buildHeifengSecondNpc() },
            rule: 'duel',
            forbidEscapeReason: '泰山弟子岂能临阵弃俘而逃！',
            onWin: [openScene('scene_ts_12_stamped_plaque', TAISHAN_ENTRY_QUEST_ID)],
            onLose: [
              openScene(
                regScene({
                  id: 'scene_ts_11_lose',
                  title: '稳住阵脚 · 再破悍匪',
                  beats: [
                    N('悍匪刀势凶猛，你借石桥栏杆护住要害调息回气，誓死不放贼人过桥！'),
                  ],
                  choices: [
                    {
                      id: 'ts11_retry',
                      label: '重振剑势，再度迎战黑风寨二当家',
                      tone: 'default',
                      effects: [{ type: 'healPlayer', hpPct: 80, mpPct: 80 }],
                    },
                  ],
                }),
                TAISHAN_ENTRY_QUEST_ID,
              ),
            ],
          },
        ],
      },
    ],
  },

  // 第 12 幕：朱印木牌 · 候晓封禅
  scene_ts_12_stamped_plaque: {
    id: 'scene_ts_12_stamped_plaque',
    title: '第十二幕 · 朱印封牌',
    subtitle: '泰山派东岳道院',
    mandatory: true,
    beats: [
      N('一剑震飞黑风寨二当家手里的鬼头刀，余匪见势不妙四散奔逃。你将贼首一并捆了交予山脚巡检司，随后返山复命。'),
      S('NPC-0205', '（与单天门对视一眼，联名在你那块铁木试剑牌上加盖朱印）“好，筋骨、胆气、剑法皆已合格。五更时分登临【玉皇顶古封禅台】，面见掌门褚师兄吧。”'),
    ],
    choices: [
      {
        id: 'ts12_ascend_yuhuang',
        label: '接过朱印木牌，趁夜登临玉皇顶古封禅台',
        tone: 'gold',
        effects: [
          { type: 'setQuestStep', questId: TAISHAN_ENTRY_QUEST_ID, stepId: 'yuhuang_summit_oath' },
          { type: 'teleportPlayer', regionId: 'taishan', buildingId: 'ts_yuhuang', spotId: 'ts_yh_altar' },
          toast('请前往【玉皇顶古封禅台】面见掌门褚玄机！', 'talk', '候晓封禅'),
        ],
      },
    ],
  },

  // 第 13 幕：沧海红日 · 玉皇封禅（配 CG: taishan_yuhuang_sunrise.jpg）
  scene_ts_13_yuhuang_sunrise: {
    id: 'scene_ts_13_yuhuang_sunrise',
    title: '第十三幕 · 沧海红日',
    subtitle: '玉皇顶古封禅台',
    illustrationUrl: '/assets/quests/taishan_yuhuang_sunrise.jpg',
    mandatory: true,
    beats: [
      N('五更破晓，玉皇顶云海翻涌如雪浪，一轮红日骤然跃出东海天际，金光铺满汉白玉古封禅台。'),
      N('掌门「东灵道长」褚玄机负手立于高台之前，道袍猎猎，目光如渊。'),
      S('NPC-0129', '“一路从济南岱庙走到这玉皇顶，天松、单天门、天柏三位师弟都递了话。不过能否真正穿上泰山道袍，还得过老道最后这一句问剑。”'),
    ],
    choices: [
      {
        id: 'ts13_listen_question',
        label: '肃立封禅台前，恭听掌门问剑',
        tone: 'default',
        effects: [openScene('scene_ts_14_chuxuanji_question', TAISHAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 14 幕：东灵问剑 · 四选一零提示（答错永绝泰山）
  scene_ts_14_chuxuanji_question: {
    id: 'scene_ts_14_chuxuanji_question',
    title: '第十四幕 · 东灵问剑',
    subtitle: '玉皇顶古封禅台',
    mandatory: true,
    beats: [
      S('NPC-0129', '“我泰山派位居五岳之首，论名声不如少林丐帮，论奇绝不如逍遥桃花。他日若五岳同盟有难，或是强敌压境、山门危殆，你手中这柄泰山剑，当为何而拔？”'),
    ],
    choices: [
      {
        id: 'ts14_wrong_fame',
        label: '“为求扬名立万、跻身天下绝顶高手之列而拔剑。”',
        tone: 'default',
        effects: [openScene('scene_ts_14_fail_expelled', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'ts14_wrong_hermit',
        label: '“为保一己清修、但求明哲保身不惹是非而拔剑。”',
        tone: 'default',
        effects: [openScene('scene_ts_14_fail_expelled', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'ts14_wrong_court',
        label: '“为替官府效命、博取朝廷封妻荫子之禄位而拔剑。”',
        tone: 'default',
        effects: [openScene('scene_ts_14_fail_expelled', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'ts14_right_dao',
        label: '“为守五岳道统、护齐鲁苍生而拔剑！山门在则剑在，强敌当前，泰山弟子宁折不弯，绝不退半步！”',
        tone: 'default',
        effects: [openScene('scene_ts_15_join_taishan', TAISHAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 14 幕失败分支：答错永绝泰山
  scene_ts_14_fail_expelled: {
    id: 'scene_ts_14_fail_expelled',
    title: '道心不合 · 逐下东岳',
    subtitle: '玉皇顶古封禅台',
    mandatory: true,
    beats: [
      S('NPC-0129', '（微微摇头，收走你怀里的朱印木牌）“道心狭隘，岂堪当五岳独尊之剑？罢了，你下山去吧，此生不必再登东岳拜门了。”'),
      N('执法弟子将你送下十八盘，玉皇顶的晨钟在身后渐渐远去。'),
    ],
    choices: [
      {
        id: 'ts14_fail_confirm',
        label: '黯然下山离开泰山',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'ts_permanently_rejected', value: true },
          { type: 'abandonQuest', questId: TAISHAN_ENTRY_QUEST_ID },
          { type: 'teleportPlayer', regionId: 'jinan', buildingId: 'jn_daimiao', spotId: 'jn_daimiao_east' },
          toast('未能通过掌门褚玄机问剑，此生再无缘拜入【泰山派】！', 'warn', '永绝泰山'),
        ],
      },
    ],
  },

  // 第 15 幕：东岳授袍 · 拜入泰山
  scene_ts_15_join_taishan: {
    id: 'scene_ts_15_join_taishan',
    title: '第十五幕 · 东岳授袍',
    subtitle: '玉皇顶古封禅台',
    mandatory: true,
    beats: [
      S('NPC-0129', '（抚须朗声大笑）“好一句宁折不弯！这才是五岳东岳弟子该有的骨气！”'),
      N('褚玄机亲手捧过一套泰山青色道袍与外门剑佩递入你手中。晨曦之下，东岳云海翻涌，你正式拜入五岳独尊泰山派！'),
    ],
    choices: [
      {
        id: 'ts15_complete_join',
        label: '恭敬接过道袍剑佩，正式拜入泰山派（SECT-06）',
        tone: 'gold',
        effects: [
          { type: 'joinSect', sectId: 'SECT-06', rank: 1 },
          { type: 'completeQuest', questId: TAISHAN_ENTRY_QUEST_ID },
          toast('已拜入【泰山派】！获传《泰山松风养气诀》与《泰山剑法（筑基篇）》！', 'success', '拜入泰山'),
        ],
      },
    ],
  },
}

Object.assign(SCENES, EXTRA_SCENES)
