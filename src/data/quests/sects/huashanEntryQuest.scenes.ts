import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, S, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { HUASHAN_ENTRY_QUEST_ID } from './huashanEntryQuest'

const EXTRA_SCENES: Record<string, StorySceneDef> = {}
function regScene(sc: StorySceneDef): string {
  EXTRA_SCENES[sc.id] = sc
  return sc.id
}

const SPEAKER_TONGGUAN_BANDIT: StorySpeakerSpec = {
  kind: 'custom',
  name: '关中路匪',
  title: '潼关流窜匪徒',
  factionName: '江湖劫匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_HUASHAN_DISCIPLE: StorySpeakerSpec = {
  kind: 'custom',
  name: '华山外门剑客',
  title: '玉女峰外门弟子',
  factionName: '华山派',
  portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
}

const SPEAKER_HORSE_BANDIT_CHIEF: StorySpeakerSpec = {
  kind: 'custom',
  name: '关中马贼头目',
  title: '劫粮悍匪头子',
  factionName: '关中马贼',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildTongguanBanditNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HS_TONGGUAN_BANDIT',
    name: '关中路匪',
    title: '潼关山道 · 劫牌匪徒',
    realm: '不入流',
    factionId: 'SECT-00',
    factionName: '关中劫匪',
    sectRank: 0,
    sectRankLabel: '路匪',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“把银子和那块华山玄铁令留下，滚！”',
    stats: { hp: 165, mp: 60, agi: 11, res: 6 },
    talents: { bone: 34, comprehension: 28, charm: 20 },
    equippedArts: { neigong: 'MA-229', qinggong: 'MA-218', move1: 'MA-189', move2: 'MA-186' },
    learnedArts: [
      { artId: 'MA-229', level: 1 },
      { artId: 'MA-218', level: 1 },
      { artId: 'MA-189', level: 1 },
      { artId: 'MA-186', level: 1 },
    ],
  })
}

function buildHuashanDiscipleNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HS_OUTER_DISCIPLE',
    name: '华山外门剑客',
    title: '玉女峰 · 论剑台试剑弟子',
    realm: '不入流',
    factionId: 'SECT-05',
    factionName: '华山派',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
    talk: '“请出剑！让掌门与秦师叔瞧瞧你的华山十二式！”',
    stats: { hp: 220, mp: 90, agi: 14, res: 8 },
    talents: { bone: 44, comprehension: 46, charm: 42 },
    equippedArts: { neigong: 'MA-160', qinggong: 'MA-197', move1: 'MA-167', move2: 'MA-184' },
    learnedArts: [
      { artId: 'MA-160', level: 1 },
      { artId: 'MA-197', level: 1 },
      { artId: 'MA-167', level: 1 },
      { artId: 'MA-184', level: 1 },
    ],
  })
}

function buildHorseBanditChiefNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HS_HORSE_BANDIT_CHIEF',
    name: '关中马贼头目',
    title: '潼关官道 · 劫粮悍匪',
    realm: '三流下品',
    factionId: 'SECT-00',
    factionName: '关中马贼',
    sectRank: 0,
    sectRankLabel: '马贼头目',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“华山派的小剑童也敢来抢粮车？吃爷爷一刀！”',
    stats: { hp: 255, mp: 100, agi: 15, res: 9 },
    talents: { bone: 50, comprehension: 38, charm: 24 },
    equippedArts: { neigong: 'MA-229', qinggong: 'MA-218', move1: 'MA-189', move2: 'MA-186' },
    learnedArts: [
      { artId: 'MA-229', level: 2 },
      { artId: 'MA-218', level: 2 },
      { artId: 'MA-189', level: 2 },
      { artId: 'MA-186', level: 2 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  // 第 1 幕：长安茶棚 · 狂风验纸（配 CG: huashan_changan_rain_go.jpg）
  scene_hs_01_changan_verify: {
    id: 'scene_hs_01_changan_verify',
    title: '第一幕 · 长安验纸',
    subtitle: '京兆府（长安） · 明德门外秋雨茶棚',
    illustrationUrl: '/assets/quests/huashan_changan_rain_go.jpg',
    mandatory: true,
    beats: [
      N('{reignYear}的长安明德门外细雨如丝。你正于茶棚避雨，恰见两名泼皮强抢茶客铜钱，却被邻桌一名灰袍佩剑的中年剑客随手一鞘点翻在地。'),
      N('你认出此人正是华山派宿老「狂风快剑」封不弃，连忙整衣上前行礼，道明拜入西岳华山之志。'),
      S('NPC-0167', '（伸指搭上你腕脉，细查片刻后冷笑一声）“嗯，倒是一张没沾过别家门派香火、也没修过他派良品杂学的干净白纸。拿去——这是我华山玄铁剑令。不过华山不是文人书院，想拜门，先过潼关劫道与千尺幢、百尺峡、苍龙岭三险再说！”'),
    ],
    choices: [
      {
        id: 'hs01_take_token',
        label: '接过玄铁剑令，东出长安赶赴潼关山麓',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_ENTRY_QUEST_ID },
          { type: 'setQuestStep', questId: HUASHAN_ENTRY_QUEST_ID, stepId: 'tongguan_bandits' },
          toast('已获封不弃赐予玄铁剑令！请前往【潼关 / 西岳华山 · 潼关天险瓮城】！', 'talk', '长安验纸'),
        ],
      },
    ],
  },

  // 第 2 幕：潼关山麓 · 劫匪拦道
  scene_hs_02_tongguan_bandits: {
    id: 'scene_hs_02_tongguan_bandits',
    title: '第二幕 · 潼关退匪',
    subtitle: '潼关天险瓮城外山道',
    mandatory: true,
    beats: [
      N('行至潼关天险瓮城南侧山道，林间忽地窜出几名手持短刀的关中路匪，正围住几名赴山求道的书生与行商搜刮。'),
      S(SPEAKER_TONGGUAN_BANDIT, '“哟，又来个带华山铁牌的肥羊！把牌子和盘缠留下，爷爷放你一条生路！”'),
      N('眼下尚无名师传剑，唯有以凡躯拳脚硬扛到底！'),
    ],
    choices: [
      {
        id: 'hs02_fight_bandit',
        label: '护住行人，迎战关中路匪！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            opponent: { kind: 'custom', npc: buildTongguanBanditNpc() },
            rule: 'duel',
            forbidEscapeReason: '岂能丢下同路行人独自逃窜！',
            onWin: [
              { type: 'giveSilver', amount: 12, reason: '击退潼关路匪缴获盘缠' },
              openScene('scene_hs_03_three_perils_rescue', HUASHAN_ENTRY_QUEST_ID),
            ],
            onLose: [
              openScene(
                regScene({
                  id: 'scene_hs_02_lose',
                  title: '稳住喘息 · 再退路匪',
                  beats: [
                    N('山匪刀风凌厉，你滚入路旁乱石堆暂避一刀，握紧怀里玄铁剑令重新站起。'),
                  ],
                  choices: [
                    {
                      id: 'hs02_retry',
                      label: '咬牙重上，击退关中路匪',
                      tone: 'default',
                      effects: [{ type: 'healPlayer', hpPct: 80, mpPct: 80 }],
                    },
                  ],
                }),
                HUASHAN_ENTRY_QUEST_ID,
              ),
            ],
          },
        ],
      },
    ],
  },

  // 第 3 幕：千尺苍龙 · 绝壁登险（配 CG: huashan_canglong_ridge.jpg）
  scene_hs_03_three_perils_rescue: {
    id: 'scene_hs_03_three_perils_rescue',
    title: '第三幕 · 苍龙救人',
    subtitle: '千尺幢 · 百尺峡 · 苍龙岭',
    illustrationUrl: '/assets/quests/huashan_canglong_ridge.jpg',
    mandatory: true,
    beats: [
      N('击退路匪后，你踏上绝壁陡峭的华山三险。苍龙岭两侧深渊万丈，山风几乎把人吹落云海。'),
      N('前方一名背负山柴的挑山老汉脚底一滑，整个人悬在崖边铁索上摇摇欲坠！若停步相救，自己也极可能被坠石砸伤；若冷眼绕过，倒能省力快步登顶……'),
    ],
    choices: [
      {
        id: 'hs03_rescue_porter',
        label: '死死拽住铁索与老汉手腕，咬牙将他拉回石阶之上',
        tone: 'default',
        effects: [
          { type: 'setQuestStep', questId: HUASHAN_ENTRY_QUEST_ID, stepId: 'zixia_foundation' },
          { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_zixia', spotId: 'tg_zx_terrace' },
          toast('已过三险并救下挑山老汉！请于【玉女峰紫霞道观】拜见宁清羽！', 'success', '绝壁救人'),
        ],
      },
      {
        id: 'hs03_ignore_porter',
        label: '暗骂一声倒霉，抓紧铁索自顾自绕过继续爬山',
        tone: 'default',
        effects: [openScene('scene_hs_03_fail_heartless', HUASHAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 3 幕见死不救淘汰分支
  scene_hs_03_fail_heartless: {
    id: 'scene_hs_03_fail_heartless',
    title: '薄情寡义 · 逐下华山',
    subtitle: '苍龙岭云梯',
    mandatory: true,
    beats: [
      N('你刚绕过悬崖边，上方岩石后忽然闪出「潼关剑神」秦烈山——他早一步凌空跃下挑断绳索接住了老汉，随即冷眼盯着你。'),
      S('NPC-0147', '“连近在咫尺的百姓性命都冷眼旁观，学了剑也是个自私凉薄的败类！把玄铁剑令放下，下山去吧，华山派不收这等无情无义之徒！”'),
    ],
    choices: [
      {
        id: 'hs03_fail_confirm',
        label: '颜面扫地，被秦烈山逐下华山',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'hs_permanently_rejected', value: true },
          { type: 'abandonQuest', questId: HUASHAN_ENTRY_QUEST_ID },
          { type: 'teleportPlayer', regionId: 'changan', buildingId: 'changan_base_inn' },
          toast('苍龙岭见死不救遭秦烈山逐出，此生再无缘拜入【华山派】！', 'warn', '永绝华山'),
        ],
      },
    ],
  },

  // 第 4 幕：玉女前庭 · 宁女侠收令
  scene_hs_04_ning_receive_token: {
    id: 'scene_hs_04_ning_receive_token',
    title: '第四幕 · 玉女收令',
    subtitle: '玉女峰紫霞道观',
    mandatory: true,
    beats: [
      N('玉女峰云雾缭绕，紫霞道观前庭松柏苍翠。宁清羽接过你的玄铁剑令，听闻你不仅以凡躯击退潼关路匪，更在苍龙岭冒死拉住挑山老汉，温润双眸中露出赞许之色。'),
      S('NPC-0166', '“好孩子，仁心与胆魄皆有几分火候。华山剑派讲究『气为剑之本，剑为气之锋』，你先随我入偏院修习筑基法门，再上论剑台试锋。”'),
    ],
    choices: [
      {
        id: 'hs04_enter_courtyard',
        label: '拱手随宁女侠步入偏院习武',
        tone: 'gold',
        effects: [openScene('scene_hs_05_teach_foundation', HUASHAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 5 幕：紫霞偏院 · 筑基剑气
  scene_hs_05_teach_foundation: {
    id: 'scene_hs_05_teach_foundation',
    title: '第五幕 · 筑基剑气',
    subtitle: '玉女峰紫霞道观偏院',
    mandatory: true,
    beats: [
      N('宁清羽取来一柄木剑，将《华山基础心法》吐纳法诀与《华山剑法（入门十二式）》一字一句拆解演示。'),
      S('NPC-0166', '“先蓄丹田一口正气，再将力道贯于剑尖，切莫贪快而失章法。”'),
      N('半日演练下来，你只觉体内真气初萌，青锋十二式亦渐有章法！'),
    ],
    choices: [
      {
        id: 'hs05_learn_arts',
        label: '谢过宁女侠传艺，持剑登临绝顶论剑台',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-160', level: 1, exp: 1200, autoEquip: true },
          { type: 'teachMartialArt', artId: 'MA-167', level: 1, exp: 1000, autoEquip: true },
          { type: 'setQuestStep', questId: HUASHAN_ENTRY_QUEST_ID, stepId: 'summit_spar' },
          toast('习得《华山基础心法》与《华山剑法（入门十二式）》！请前往【华山绝顶论剑台】！', 'success', '剑气初成'),
        ],
      },
    ],
  },

  // 第 6 幕：绝顶博台 · 剑气初论（配 CG: huashan_botai_chess.jpg）
  scene_hs_06_botai_debate: {
    id: 'scene_hs_06_botai_debate',
    title: '第六幕 · 博台论剑',
    subtitle: '华山绝顶论剑台 · 博台孤峰弈棋亭',
    illustrationUrl: '/assets/quests/huashan_botai_chess.jpg',
    mandatory: true,
    beats: [
      N('华山绝顶云海茫茫。博台弈棋亭内，掌门岳沧溟与潼关剑神秦烈山正对弈论剑。见你提剑上台，秦烈山哈哈一笑推开棋枰。'),
      S('NPC-0147', '“岳师兄，来的是个练剑的苗子，咱们别光做棋客！小子，拔剑与外门弟子拆几招，让我看看你把华山十二式练成了几分火候！”'),
    ],
    choices: [
      {
        id: 'hs06_step_to_ring',
        label: '抱拳领命，踏上论剑石台亮剑',
        tone: 'jade',
        effects: [openScene('scene_hs_07_summit_spar', HUASHAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 7 幕：论剑石台 · 同门试锋
  scene_hs_07_summit_spar: {
    id: 'scene_hs_07_summit_spar',
    title: '第七幕 · 石台试锋',
    subtitle: '华山绝顶论剑台',
    mandatory: true,
    beats: [
      S(SPEAKER_HUASHAN_DISCIPLE, '（横剑行礼）“新入门的{gender:师弟|师妹}，请了！”'),
      N('岳沧溟与秦烈山立于石亭旁静观，是检验华山基础心法与十二式剑法之时！'),
    ],
    choices: [
      {
        id: 'hs07_spar_disciple',
        label: '出剑与华山外门剑客实战切磋！',
        tone: 'jade',
        effects: [
          {
            type: 'startCombat',
            opponent: { kind: 'custom', npc: buildHuashanDiscipleNpc() },
            rule: 'spar',
            maxRounds: 8,
            onWin: [
              { type: 'setQuestStep', questId: HUASHAN_ENTRY_QUEST_ID, stepId: 'siguoya_and_tongguan_raid' },
              toast('博台试锋胜出！请前往【思过崖古山洞 · 面壁思过寒风剑坪】外坪练剑！', 'success', '试锋胜出'),
            ],
            onLose: [
              openScene(
                regScene({
                  id: 'scene_hs_07_lose',
                  title: '剑招未稳 · 调息再试',
                  beats: [
                    S('NPC-0147', '“步法还是虚了些！歇口气再上去拆过，赢了才算过这关。”'),
                  ],
                  choices: [
                    {
                      id: 'hs07_retry',
                      label: '调息回气，再度登台请教',
                      tone: 'default',
                      effects: [{ type: 'healPlayer', hpPct: 80, mpPct: 80 }],
                    },
                  ],
                }),
                HUASHAN_ENTRY_QUEST_ID,
              ),
            ],
          },
        ],
      },
    ],
  },

  // 第 8 幕：思过外坪 · 朔风练剑（明确绝不进入封锁的秘洞古剑刻石室）
  scene_hs_08_siguoya_wind_practice: {
    id: 'scene_hs_08_siguoya_wind_practice',
    title: '第八幕 · 思过朔风',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('你遵令来到思过崖外坪。只见悬崖后方那座『秘洞古剑刻石室』以沉重石门与铁锁深封，门前立着“非掌门手谕严禁擅入”的木牌。'),
      N('你谨守门规，绝不窥探禁地，只在外坪寒风剑坪迎着西岳朔风苦练《华山剑法（入门十二式）》三百遍！罡风如刀刮面，反倒逼得你剑势愈发凝练沉稳。'),
    ],
    choices: [
      {
        id: 'hs08_finish_practice',
        label: '收剑调息，忽闻山下潼关急讯传来',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-167', amount: 1500 },
          toast('朔风苦练之下，《华山剑法（入门十二式）》修为精进！', 'success', '朔风淬锋'),
          openScene('scene_hs_09_tongguan_alarm', HUASHAN_ENTRY_QUEST_ID),
        ],
      },
    ],
  },

  // 第 9 幕：潼关烽讯 · 关中马贼劫粮
  scene_hs_09_tongguan_alarm: {
    id: 'scene_hs_09_tongguan_alarm',
    title: '第九幕 · 劫粮惊变',
    subtitle: '思过崖外坪',
    mandatory: true,
    beats: [
      N('黎明微露时，一名浑身是伤的外门挑夫跌跌撞撞跑上崖坪报信，身后跟着提剑赶来的封不弃。'),
      S('NPC-0167', '（眼神一厉）“一伙关中马贼趁晨雾洗劫我华山运粮车队、打伤弟子！光在山上练剑算什么本事？拿上铁剑随我去潼关山道，把粮车与人抢回来！”'),
    ],
    choices: [
      {
        id: 'hs09_rush_tongguan',
        label: '提剑随封不弃疾驰下山，奔赴潼关官道',
        tone: 'danger',
        effects: [
          { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_fort', spotId: 'tg_ft_barbican' },
          openScene('scene_hs_10_tongguan_bandit_chief', HUASHAN_ENTRY_QUEST_ID),
        ],
      },
    ],
  },

  // 第 10 幕：潼关血战 · 斩寇护粮
  scene_hs_10_tongguan_bandit_chief: {
    id: 'scene_hs_10_tongguan_bandit_chief',
    title: '第十幕 · 斩寇护粮',
    subtitle: '潼关官道',
    mandatory: true,
    beats: [
      N('潼关外官道尘烟滚滚，马贼头目正挥刀逼迫被捆的外门弟子交出银钱粮袋。封不弃冷眼立于一旁道边石上并不出手，意在考验你的实战血性！'),
      S(SPEAKER_HORSE_BANDIT_CHIEF, '“华山派的小剑童也敢来抢粮车？吃爷爷一刀！”'),
    ],
    choices: [
      {
        id: 'hs10_duel_chief',
        label: '拔剑迎上，以华山十二式斩杀马贼头目！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            opponent: { kind: 'custom', npc: buildHorseBanditChiefNpc() },
            rule: 'duel',
            forbidEscapeReason: '封师叔在旁压阵，岂能临阵逃跑！',
            onWin: [openScene('scene_hs_11_return_triumph', HUASHAN_ENTRY_QUEST_ID)],
            onLose: [
              openScene(
                regScene({
                  id: 'scene_hs_10_lose',
                  title: '借石稳阵 · 再度出剑',
                  beats: [
                    N('马贼头目马刀势大力沉，你借官道石碑格挡震退，运转《华山基础心法》稳住气血！'),
                  ],
                  choices: [
                    {
                      id: 'hs10_retry',
                      label: '重振剑势，再度扑上斩寇',
                      tone: 'default',
                      effects: [{ type: 'healPlayer', hpPct: 80, mpPct: 80 }],
                    },
                  ],
                }),
                HUASHAN_ENTRY_QUEST_ID,
              ),
            ],
          },
        ],
      },
    ],
  },

  // 第 11 幕：凯旋复命 · 宿老颔首
  scene_hs_11_return_triumph: {
    id: 'scene_hs_11_return_triumph',
    title: '第十一幕 · 凯旋复命',
    subtitle: '潼关官道 · 玉女峰',
    mandatory: true,
    beats: [
      N('一剑刺穿马贼头目咽喉，余匪发一声喊四散溃逃。你替受伤同门松绑，押着满载米粮的车队返山复命。'),
      S('NPC-0167', '（验过你剑刃上的血迹，难得露出半分笑意）“不坏！不是躲在象牙塔里只会念书的酸儒，真敢拔剑护山门、护百姓。”'),
    ],
    choices: [
      {
        id: 'hs11_prepare_oath',
        label: '随封不弃返回玉女峰紫霞道观候召',
        tone: 'gold',
        effects: [
          { type: 'setQuestStep', questId: HUASHAN_ENTRY_QUEST_ID, stepId: 'zixia_oath' },
          { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_zixia', spotId: 'tg_zx_hall' },
          openScene('scene_hs_12_ning_advice', HUASHAN_ENTRY_QUEST_ID),
        ],
      },
    ],
  },

  // 第 12 幕：正气殿前 · 宁师叮嘱
  scene_hs_12_ning_advice: {
    id: 'scene_hs_12_ning_advice',
    title: '第十二幕 · 殿前叮嘱',
    subtitle: '玉女峰紫霞道观',
    mandatory: true,
    beats: [
      N('拂晓将至，紫霞正气主殿前灯火通明。宁清羽递来一盏清茶，替你掸去肩头尘灰。'),
      S('NPC-0166', '“过会儿掌门师兄在殿中问话，切记华山门规森严，最忌偏执内斗与背师贪邪——以本心作答便是。”'),
    ],
    choices: [
      {
        id: 'hs12_enter_hall',
        label: '整肃衣冠，步入紫霞正气主殿',
        tone: 'default',
        effects: [openScene('scene_hs_13_zixia_dawn', HUASHAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 13 幕：朝阳紫气 · 正气大殿（配 CG: huashan_zixia_dawn_sword.jpg）
  scene_hs_13_zixia_dawn: {
    id: 'scene_hs_13_zixia_dawn',
    title: '第十三幕 · 紫霞正气',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    illustrationUrl: '/assets/quests/huashan_zixia_dawn_sword.jpg',
    mandatory: true,
    beats: [
      N('一轮朝阳破云而出，紫气漫过玉女峰巅，映照得正气主殿一片通明。'),
      N('掌门「太岳真君」岳沧溟端坐主位，宁清羽、秦烈山、封不弃分列左右，众弟子持剑肃立。'),
      S('NPC-0118', '“从长安验纸、潼关退匪、苍龙救人、博台试锋到护粮斩寇，你的胆魄与根骨老夫都看在眼里。入我华山之前，还需过最后这一句问剑。”'),
    ],
    choices: [
      {
        id: 'hs13_listen_question',
        label: '恭立殿中，聆听岳掌门问剑',
        tone: 'default',
        effects: [openScene('scene_hs_14_yue_question', HUASHAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 14 幕：太岳问剑 · 四选一零提示（答错永绝华山）
  scene_hs_14_yue_question: {
    id: 'scene_hs_14_yue_question',
    title: '第十四幕 · 太岳问剑',
    subtitle: '紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0118', '“我华山派曾历剑气之争险些倾覆，如今重振西岳门庭。日后若遇剑宗、气宗旧怨再起，或是外敌以绝世秘籍诱你背离本门，你待如何？”'),
    ],
    choices: [
      {
        id: 'hs14_wrong_blade_only',
        label: '“剑法招式胜过一切，内功不过锦上添花，弟子只求快剑无敌。”',
        tone: 'default',
        effects: [openScene('scene_hs_14_fail_expelled', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'hs14_wrong_greedy',
        label: '“若能见识天下更玄妙的绝学，弟子愿先借阅秘籍，他日再回报师门。”',
        tone: 'default',
        effects: [openScene('scene_hs_14_fail_expelled', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'hs14_wrong_power',
        label: '“门内师长若有争执，弟子只听武功最高那一位的号令。”',
        tone: 'default',
        effects: [openScene('scene_hs_14_fail_expelled', HUASHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'hs14_right_balance',
        label: '“剑气本出一源，当内外兼修、不偏不倚；至于外敌秘籍诱惑，华山弟子宁死不背师门，守正笃行方为君子剑！”',
        tone: 'default',
        effects: [openScene('scene_hs_15_join_huashan', HUASHAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 14 幕失败分支：答错永绝华山
  scene_hs_14_fail_expelled: {
    id: 'scene_hs_14_fail_expelled',
    title: '道心不纯 · 逐下西岳',
    subtitle: '紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0118', '（神色一沉，收回案上青钢长剑）“心术偏执、经不起诱惑，日后必成我华山大患！把玄铁剑令留下，即刻下山，此生莫再叩我华山山门！”'),
      N('你被护山弟子送出玉女峰，西岳晨钟在耳畔化作一声沉叹。'),
    ],
    choices: [
      {
        id: 'hs14_fail_confirm',
        label: '黯然离开华山',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'hs_permanently_rejected', value: true },
          { type: 'abandonQuest', questId: HUASHAN_ENTRY_QUEST_ID },
          { type: 'teleportPlayer', regionId: 'changan', buildingId: 'changan_base_inn' },
          toast('未能通过掌门岳沧溟问剑，此生再无缘拜入【华山派】！', 'warn', '永绝华山'),
        ],
      },
    ],
  },

  // 第 15 幕：赐剑青锋 · 拜入华山
  scene_hs_15_join_huashan: {
    id: 'scene_hs_15_join_huashan',
    title: '第十五幕 · 赐剑青锋',
    subtitle: '紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0118', '（抚须颔首，朗声赞道）“好一句剑气本出一源、守正笃行！我西岳华山正缺你这等内外兼修、临危不乱的俊彦！”'),
      N('岳沧溟亲手将一柄寒光湛然的青钢长剑与华山门人道袍授于你手。紫霞漫天之际，你正式拜入西岳华山派！'),
    ],
    choices: [
      {
        id: 'hs15_complete_join',
        label: '双手接剑，正式拜入华山派（SECT-05）',
        tone: 'gold',
        effects: [
          { type: 'joinSect', sectId: 'SECT-05', rank: 1 },
          { type: 'completeQuest', questId: HUASHAN_ENTRY_QUEST_ID },
          toast('已拜入【华山派】！获授《华山基础心法》与《华山剑法（入门十二式）》！', 'success', '拜入华山'),
        ],
      },
    ],
  },
}

Object.assign(SCENES, EXTRA_SCENES)
