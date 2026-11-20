import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q02_QUEST_ID } from './huashanBotaiDivisionQuest'

const SPEAKER_ZHOU_YUNFAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '周云帆',
  title: '外门新锐弟子',
  factionName: '华山派',
  portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
}

const SPEAKER_ZHAO_CHENGJUN: StorySpeakerSpec = {
  kind: 'custom',
  name: '赵承钧',
  title: '资深外门剑客',
  factionName: '华山派',
  portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
}

const SPEAKER_LU_ZHANFENG: StorySpeakerSpec = {
  kind: 'custom',
  name: '陆展锋',
  title: '华山外门魁首',
  factionName: '华山派',
  portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
}

function buildRound1Disciple(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ02_ZHOU_YUNFAN',
    name: '周云帆',
    title: '玉女峰 · 外门新锐弟子',
    realm: '三流下品',
    factionId: 'SECT-05',
    factionName: '华山派',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
    talk: '“久闻同门药王庙除恶威名，今日博台首轮，周某以入门十二式请教！”',
    stats: { hp: 320, mp: 150, agi: 20, res: 10 },
    talents: { bone: 48, comprehension: 48, charm: 45 },
    equippedArts: { neigong: 'MA-181', move1: 'MA-187', move2: 'MA-184' },
    learnedArts: [{ artId: 'MA-181', level: 2 }, { artId: 'MA-187', level: 2 }, { artId: 'MA-184', level: 2 }],
  })
}

function buildRound2Disciple(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ02_ZHAO_CHENGJUN',
    name: '赵承钧',
    title: '朝阳峰 · 资深外门师兄',
    realm: '三流中品',
    factionId: 'SECT-05',
    factionName: '华山派',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
    talk: '“愚兄苦练华山十二式四载有余，剑下绝不容情，小心了！”',
    stats: { hp: 480, mp: 260, agi: 28, res: 15 },
    talents: { bone: 55, comprehension: 52, charm: 44 },
    equippedArts: { neigong: 'MA-181', move1: 'MA-187', move2: 'MA-184' },
    learnedArts: [{ artId: 'MA-181', level: 3 }, { artId: 'MA-187', level: 3 }, { artId: 'MA-184', level: 3 }],
  })
}

function buildLuZhanfengChampion(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ02_LU_ZHANFENG',
    name: '陆展锋',
    title: '西岳外门魁首 · 夺标呼声第一',
    realm: '三流上品',
    factionId: 'SECT-05',
    factionName: '华山派',
    sectRank: 1,
    sectRankLabel: '外门魁首',
    avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
    talk: '“入山七年，今日这内门魁首之位陆某志在必得！且看你挡不挡得住我快过半拍的十二式！”',
    stats: { hp: 660, mp: 430, agi: 34, res: 18 },
    talents: { bone: 62, comprehension: 60, charm: 52 },
    equippedArts: { neigong: 'MA-181', move1: 'MA-187', move2: 'MA-184' },
    learnedArts: [{ artId: 'MA-181', level: 4 }, { artId: 'MA-187', level: 4 }, { artId: 'MA-184', level: 3 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq02_01: {
    id: 'scene_hsq02_01',
    title: '第一幕 · 三载大比',
    subtitle: '玉女峰紫霞道观 · 晨钟齐鸣',
    mandatory: true,
    beats: [
      N('{reignYear}金秋气爽，西岳万壑苍松披霜染翠。这一日清晨，紫霞道观九响云钟声彻群峰——华山派三年一度的「博台外门升堂大比」正式启幕！'),
      N('凡入山修满根基、将《华山基础心法》与《华山剑法（入门十二式）》练至火候的外门弟子，皆可登绝顶博台孤峰校剑；夺魁者即可升入内门，拜领华山上乘真传！'),
      S('NPC-0202', '（替你整肃剑穗，含笑鼓励）“{gender:师弟|师妹}近来剑气精进神速，连宁师叔都赞你根基浑成。今日绝顶博台之上高手云集，尤以外门魁首陆展锋剑势最烈，你只需沉心应战便是。”'),
    ],
    onFinishEffects: [openScene('scene_hsq02_02', HUASHAN_Q02_QUEST_ID)],
  },

  scene_hsq02_02: {
    id: 'scene_hsq02_02',
    title: '第二幕 · 云海赴台',
    subtitle: '苍龙岭至绝顶石道',
    mandatory: true,
    beats: [
      N('数十名身穿青白剑袍的外门同门背负长剑，沿着险峻绝壁浩浩荡荡拾级而上。铁链横空，脚下云涛翻腾如雪海。'),
      S('NPC-0166', '“今日掌门师兄与秦师兄、封师兄皆已在博台孤峰弈棋亭候场。去罢——让四位尊长亲眼看看你这数月磨出的一口青锋！”'),
    ],
    choices: [
      {
        id: 'hsq02_go_botai',
        label: '昂首登临华山绝顶论剑台 · 博台孤峰弈棋亭',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q02_QUEST_ID, stepId: 'botai_tournament' },
          setStep(HUASHAN_Q02_QUEST_ID, 'botai_tournament'),
          toast('博台大比已启！请前往【华山绝顶论剑台 · 博台孤峰弈棋亭】出战三轮校剑！', 'talk', '博台大比'),
        ],
      },
    ],
  },

  scene_hsq02_03: {
    id: 'scene_hsq02_03',
    title: '第三幕 · 四老临坛',
    subtitle: '华山绝顶论剑台 · 博台孤峰弈棋亭',
    illustrationUrl: '/assets/quests/hs_q02_botai_arena.jpg',
    illustrationCaption: '博台试剑 · 四老观礼云海石坪，入门十二式连挫外门群英',
    mandatory: true,
    beats: [
      N('孤峰突兀悬于千丈深壑之外，唯有铁索石径相连。弈棋亭前白石剑坪之上，掌门「太岳真君」岳沧溟居中端坐，左首是神色冷峻的「潼关剑神」秦烈山与温婉端庄的「玉女剑仙」宁清羽，右首则是抱剑斜睨的「狂风快剑」封不弃。'),
      S('NPC-0118', '（目光如电扫过台下众弟子，声若洪钟）“同门校剑，只许用本门筑基心法与入门十二式，点到即止，严禁暗算伤残！连胜三阵拔得头筹者，今日便入我华山内门！”'),
      S('NPC-0147', '“第一轮甲字签——周云帆，对阵药王庙立功新秀！二人入坪行礼！”'),
    ],
    onFinishEffects: [openScene('scene_hsq02_04', HUASHAN_Q02_QUEST_ID)],
  },

  scene_hsq02_04: {
    id: 'scene_hsq02_04',
    title: '第四幕 · 首轮初锋',
    subtitle: '博台孤峰弈棋亭 · 第一轮',
    mandatory: true,
    beats: [
      N('你跃入白石剑坪，对面新锐同门周云帆拱手一礼，长剑一振挽出三朵剑花，当先抢攻而来！'),
      S(SPEAKER_ZHOU_YUNFAN, '“请{gender:师兄|师姐}赐教！看我这一招『苍松迎客』变『无边落木』！”'),
    ],
    choices: [
      {
        id: 'hsq02_spar_round1',
        label: '拔剑应战，首轮切磋外门新锐周云帆（三流下品）',
        tone: 'primary',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRound1Disciple() },
            rule: 'spar',
            forbidEscapeReason: '博台升堂大比当众校剑，岂可临阵弃权！',
            introText: '【博台大比 · 首轮】同以华山入门十二式切磋外门新锐【周云帆（三流下品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('博台首轮胜出！于场边调息片刻，气血与内力已尽数恢复。', 'success', '博台大比'),
              openScene('scene_hsq02_05', HUASHAN_Q02_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('剑招稍露破绽惜败半招，调匀内息后再登博台重战！', 'warn', '博台大比'),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq02_05: {
    id: 'scene_hsq02_05',
    title: '第五幕 · 稳守得胜',
    subtitle: '博台孤峰弈棋亭',
    mandatory: true,
    beats: [
      N('不过七八合间，你以深厚绵长的《华山基础心法》稳锁中宫，趁周云帆变招过急之际剑脊轻拍其手腕，稳稳拿下首阵。周云帆心悦诚服拱手退下。'),
      S('NPC-0166', '“下盘不浮，内息不喘，这一阵赢得干净利落。”'),
      S('NPC-0167', '（鼻间轻哼）“赢个刚入山半年的娃娃算什么本事？第二轮遇上入门四载的赵承钧，看这四平八稳的路数还顶不顶用！”'),
    ],
    onFinishEffects: [openScene('scene_hsq02_06', HUASHAN_Q02_QUEST_ID)],
  },

  scene_hsq02_06: {
    id: 'scene_hsq02_06',
    title: '第六幕 · 次轮劲敌',
    subtitle: '博台孤峰弈棋亭 · 第二轮',
    mandatory: true,
    beats: [
      N('鼓声再响，身材魁梧的资深外门师兄赵承钧大步踏上石坪。他在朝阳峰迎风苦练四年，一柄青钢剑使得虎虎生风，每一剑皆挟带劈石劲风！'),
      S(SPEAKER_ZHAO_CHENGJUN, '“{gender:师弟|师妹}小心了！愚兄这十二式走的是刚猛快劈路子，你若只顾守御，只怕连十招也接不下！”'),
      P('“请赵师兄尽管施展，小可自当全力接剑！”'),
    ],
    choices: [
      {
        id: 'hsq02_spar_round2',
        label: '沉气凝剑，次轮切磋资深师兄赵承钧（三流中品）',
        tone: 'primary',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRound2Disciple() },
            rule: 'spar',
            forbidEscapeReason: '博台大比次轮晋级之战，不可退缩！',
            introText: '【博台大比 · 次轮】迎战剑势刚猛的资深外门师兄【赵承钧（三流中品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('博台次轮胜出！于场边调息片刻，气血与内力已尽数恢复。', 'success', '博台大比'),
              openScene('scene_hsq02_07', HUASHAN_Q02_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('被赵承钧刚猛连环剑势逼退，凝神定气后再行登台挑战！', 'warn', '博台大比'),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq02_07: {
    id: 'scene_hsq02_07',
    title: '第七幕 · 气定破疾',
    subtitle: '博台孤峰弈棋亭',
    mandatory: true,
    beats: [
      N('赵承钧连环十二剑疾劈如骤雨，你却如孤峰劲松般随风微摆，以柔韧内劲借力卸力。待他第十三剑真气微滞，你剑锋陡然贴刃滑入，点在他咽喉前半寸稳稳收住！'),
      S('NPC-0147', '（冷峻面容微露赞色，抚掌道）“妙！借彼刚力、还彼虚隙，已摸到几分以静制动的门径！”'),
      N('台下众外门弟子轰然叫好。此时另一侧场地亦已分出胜负——一道凌厉剑光闪过，对手木鞘应声断为两截！'),
    ],
    onFinishEffects: [openScene('scene_hsq02_08', HUASHAN_Q02_QUEST_ID)],
  },

  scene_hsq02_08: {
    id: 'scene_hsq02_08',
    title: '第八幕 · 外门魁首',
    subtitle: '博台孤峰弈棋亭 · 魁首决战前',
    mandatory: true,
    beats: [
      N('持剑傲立场中的青年剑客，正是入山七载、连续两届距内门仅差半步的外门大师兄——陆展锋！只见他目光锐利如鹰，暗中曾得封不弃指点过几分快剑心诀，举手投足间锋芒毕露。'),
      S(SPEAKER_LU_ZHANFENG, '（长剑遥指于你，战意凛然）“好俊的守剑功夫！不过同样是入门十二式，在陆某手中一息可刺三剑——今日这大比魁首，便瞧是你气长，还是我的剑快！”'),
      N('观礼席上，岳沧溟与封不弃同时前倾身躯，目光灼灼地望向剑坪中央。这一战，俨然已是两派剑理在外门弟子身上的提前交锋！'),
    ],
    onFinishEffects: [openScene('scene_hsq02_09', HUASHAN_Q02_QUEST_ID)],
  },

  scene_hsq02_09: {
    id: 'scene_hsq02_09',
    title: '第九幕 · 博台决胜',
    subtitle: '博台孤峰弈棋亭 · 最终魁首战',
    mandatory: true,
    beats: [
      N('山风呼啸卷起云涛，陆展锋足尖一点石坪，剑光如电掣雷奔直取你胸前要穴！你深吸一口西岳清气，长剑横胸，迎向这外门最强一剑！'),
    ],
    choices: [
      {
        id: 'hsq02_spar_final',
        label: '全力出手，决战外门魁首陆展锋！（三流上品）',
        subLabel: '大比魁首之争：胜者晋升华山内门剑士',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLuZhanfengChampion() },
            rule: 'spar',
            forbidEscapeReason: '魁首决胜之战万众瞩目，绝无退路！',
            introText: '【博台大比 · 决胜魁首】迎战剑走偏锋、迅捷凌厉的外门魁首【陆展锋（三流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_hsq02_10', HUASHAN_Q02_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('陆展锋快剑凌厉，静心回想十二式奇正转换之妙再战！', 'warn', '博台决战'),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq02_10: {
    id: 'scene_hsq02_10',
    title: '第十幕 · 一剑夺魁',
    subtitle: '博台孤峰弈棋亭',
    illustrationUrl: '/assets/quests/hs_q02_defeat_luzhanfeng.jpg',
    illustrationCaption: '一剑夺魁 · 奇正相生震落外门魁首陆展锋手中长剑',
    mandatory: true,
    beats: [
      N('双剑交击三十余合，金铁交鸣之声响彻孤峰！陆展锋剑速虽快极，却因久攻不下而内息渐浮，第三十二剑斜削你左肩时手腕微颤了毫厘。'),
      N('你捕捉战机妙到毫巅，先以一式正大堂皇的「金雁横空」封死他变招去路，紧接着剑身嗡鸣震颤，一招奇正相生的「白虹贯日」自下而上斜挑其剑锷！'),
      N('“锵啷——！”陆展锋虎口酸麻，手中青钢长剑脱手飞起两丈余高，斜斜插在弈棋亭畔的松根岩缝之中！'),
    ],
    onFinishEffects: [openScene('scene_hsq02_11', HUASHAN_Q02_QUEST_ID)],
  },

  scene_hsq02_11: {
    id: 'scene_hsq02_11',
    title: '第十一幕 · 满堂喝彩',
    subtitle: '华山绝顶论剑台',
    mandatory: true,
    beats: [
      N('满场寂静一瞬，随即爆发出震耳欲聋的喝彩声！陆展锋怔立片刻，拔回长剑抱拳长揖。'),
      S(SPEAKER_LU_ZHANFENG, '“三十三合不见半分破绽，反借陆某换气之隙一剑夺刃……陆某输得心服口服！恭喜{gender:师弟|师妹}拔得博台头筹！”'),
      S('NPC-0118', '（抚须起身，朗声宣布）“好！本届博台外门大比魁首已定，今日起擢升内门剑士！至于内门授业师承——今夜戌时，你独自来玉女峰紫霞正气主殿，老夫与诸位师弟师妹有要事相询！”'),
    ],
    choices: [
      {
        id: 'hsq02_go_night_hall',
        label: '谢过四位尊长，待入夜后赶赴紫霞正气主殿',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q02_QUEST_ID, 'zixia_night_choice'),
          toast('博台大比夺魁！请前往【玉女峰紫霞道观 · 紫霞正气主殿】择定内门师承！', 'success', '一剑夺魁'),
        ],
      },
    ],
  },

  scene_hsq02_12: {
    id: 'scene_hsq02_12',
    title: '第十二幕 · 夜访正气',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('戌时初刻，西岳山风凛冽，星垂万壑。你推开紫霞正气主殿厚重的楠木殿门，只见两排蟠龙铜烛台灯火摇曳，将殿上四道身影映得格外修长。'),
      N('掌门岳沧溟与宁清羽立于祖师陈抟与华山历代先贤牌位左首，封不弃按剑立于右首，秦烈山则抱臂站在殿门内侧。殿中并无其他弟子，气氛肃穆得落针可闻。'),
      P('“弟子奉召前来参见掌门、秦师叔、宁师叔、封师叔！”'),
    ],
    onFinishEffects: [openScene('scene_hsq02_13', HUASHAN_Q02_QUEST_ID)],
  },

  scene_hsq02_13: {
    id: 'scene_hsq02_13',
    title: '第十三幕 · 烛影挑明',
    subtitle: '紫霞正气主殿',
    illustrationUrl: '/assets/quests/hs_q02_zixia_division.jpg',
    illustrationCaption: '烛影分宗 · 紫霞正气主殿岳沧溟与封不弃当众挑明剑气两脉',
    mandatory: true,
    beats: [
      S('NPC-0118', '“不必多礼。今日你在博台之上既显出深厚绵密的内息定力，最后夺剑一击又有电光石火的机变决断——正因你是近年罕见的良才美玉，今夜有些外门弟子不得与闻的门墙实情，须向你当面挑明。”'),
      S('NPC-0167', '（上前一步，目光灼灼盯着你）“岳师兄何必绕弯子！小子，你在山上这些日子也该看出来了——我华山派看似同处西岳一脉，实则自先辈起便分为『气宗』与『剑宗』两支法统！”'),
      N('烛火啪地爆开一朵灯花。你心头微震，想起药王庙归来那日回廊下的冷语，原来并非偶然。'),
    ],
    onFinishEffects: [openScene('scene_hsq02_14', HUASHAN_Q02_QUEST_ID)],
  },

  scene_hsq02_14: {
    id: 'scene_hsq02_14',
    title: '第十四幕 · 紫霞气论',
    subtitle: '紫霞正气主殿 · 气宗正脉',
    mandatory: true,
    beats: [
      S('NPC-0118', '（神色庄重，缓声道）“老夫与宁师妹、以及你大师兄高沧云所承者，乃华山【紫霞气宗正脉】。气宗奉『以气御剑，内功为体，剑招为用』为圭臬——先修养吾浩然、混元掌劲与希夷虚静，待内息充盈如江河奔涌，再窥本门无上绝学《紫霞神功》。”'),
      S('NPC-0166', '“气宗修行虽初时进境似缓，然一步一印、堂皇正大。根基既固，无论面对何等诡奇兵器或围攻困局，皆能绵绵不绝、立于不败之地。”'),
    ],
    onFinishEffects: [openScene('scene_hsq02_15', HUASHAN_Q02_QUEST_ID)],
  },

  scene_hsq02_15: {
    id: 'scene_hsq02_15',
    title: '第十五幕 · 西峰剑论',
    subtitle: '紫霞正气主殿 · 剑宗支脉',
    mandatory: true,
    beats: [
      S('NPC-0167', '（傲然按住剑柄，冷声道）“说得好听！江湖生死相搏，往往只在呼吸一舜！若等苦熬三十年紫霞内力大成，坟头草都三尺高了！老夫所承【西峰剑宗支脉】，讲的是『剑术之道，唯快唯奇，制敌机先』！”'),
      S('NPC-0167', '“咱们是剑客，不是打坐炼丹的老道！夺命连环三仙剑、狂风快剑，哪一门不是在刀口舔血中一剑破尽万法？只要我剑尖比对手快上一寸、角度奇上半指，管他内力多深，照样一剑封喉！”'),
    ],
    onFinishEffects: [openScene('scene_hsq02_16', HUASHAN_Q02_QUEST_ID)],
  },

  scene_hsq02_16: {
    id: 'scene_hsq02_16',
    title: '第十六幕 · 一念分宗',
    subtitle: '紫霞正气主殿 · 终生抉择',
    mandatory: true,
    beats: [
      N('一直沉默旁观的「潼关剑神」秦烈山缓步走到殿心，沉声开口。'),
      S('NPC-0147', '“当年华山前辈因剑气意气之争大伤元气，如今岳掌门与封师弟立约：不强迫门下俊彦，凡博台夺魁入内门者，皆由其凭本心择定一脉。但你要想清楚——气宗与剑宗功法路数迥异，一旦择定奉茶，终生不可改换门庭！”'),
      N('烛影摇红，岳沧溟温和深邃的目光与封不弃炽烈如火的眼神同时落在你的身上。西岳双途，在此一念！'),
    ],
    choices: [
      {
        id: 'hsq02_choose_qi',
        label: '【拜入紫霞气宗正脉】以气御剑 · 内外兼修（随岳沧溟、宁清羽、高沧云修习正脉）',
        subLabel: '不可逆抉择：开启气宗内门《养吾剑法》《华山混元掌》《希夷剑法》传承线',
        tone: 'gold',
        effects: [openScene('scene_hsq02_17', HUASHAN_Q02_QUEST_ID)],
      },
      {
        id: 'hsq02_choose_jian',
        label: '【拜入西峰剑宗支脉】奇险快剑 · 生死杀伐（随封不弃赴长安西峰支脉磨砺快剑）',
        subLabel: '不可逆抉择：开启剑宗内门行险快剑与实战杀伐传承线',
        tone: 'danger',
        effects: [openScene('scene_hsq02_18', HUASHAN_Q02_QUEST_ID)],
      },
    ],
  },

  scene_hsq02_17: {
    id: 'scene_hsq02_17',
    title: '第十七幕 · 正气归宗',
    subtitle: '紫霞正气主殿 · 气宗授牌',
    mandatory: true,
    beats: [
      P('（整衣敛衽，转身向岳沧溟与宁清羽端端正正叩首奉茶）“弟子以为，无根之木难抗狂飙，无源之水易涸中道。弟子愿入【紫霞气宗正脉】，求内外兼修、守正致远之剑道！”'),
      S('NPC-0167', '（脸色微沉，随即重重哼了一声拂袖转身）“罢了！人各有志，但愿日后在江湖上遇到快刀狠手时，你的浩然正气来得及救命！”'),
      S('NPC-0118', '（双手扶起你，欣慰抚须朗笑）“好！心定如岳，不为速成奇巧所动！今日起你便是我华山气宗【内门剑士】——明日拂晓赴东峰迎曦石坪，让沧云传你气宗内门第一剑！”'),
    ],
    choices: [
      {
        id: 'hsq02_finish_qi',
        label: '接过内门剑士腰牌，正式归入华山紫霞气宗正脉！',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'hs_branch', value: 'qi' },
          { type: 'setSectRank', sectId: 'SECT-05', rank: 2, promoteOnly: true },
          { type: 'addArtExp', artId: 'MA-167', amount: 300 },
          { type: 'addArtExp', artId: 'MA-160', amount: 260 },
          { type: 'giveSilver', amount: 60, reason: '博台大比夺魁晋升内门赏银' },
          { type: 'addSectContribution', amount: 60 },
          { type: 'giveCombatExp', amount: 90, reason: '博台大比三战夺魁实战感悟' },
          { type: 'modifyRenown', delta: 18, reason: '华山博台大比夺魁晋升内门剑士' },
          { type: 'completeQuest', questId: HUASHAN_Q02_QUEST_ID, outcome: 'qi' },
          toast('已晋升华山派【内门剑士】并拜入【紫霞气宗正脉】！', 'success', '剑气分宗'),
        ],
      },
    ],
  },

  scene_hsq02_18: {
    id: 'scene_hsq02_18',
    title: '第十八幕 · 奇锋入脉',
    subtitle: '紫霞正气主殿 · 剑宗授牌',
    mandatory: true,
    beats: [
      P('（目光澄澈如电，转身向封不弃抱剑躬身一礼）“弟子以为，剑客既佩三尺青锋，当于生死毫厘间破尽虚妄、一往无前！弟子愿入【西峰剑宗支脉】，随封师叔磨砺至快至奇之剑！”'),
      S('NPC-0167', '（先是一怔，旋即仰天狂笑，重重一拍你的肩头）“好小子！有种！老夫就知道你博台最后一剑挑飞陆展锋兵刃的狠辣决断，绝不是甘心在蒲团上枯坐的老学究！”'),
      S('NPC-0118', '（轻叹一声，仍依门规将内门剑士青铜腰牌递予你手，肃容叮嘱）“既入西峰剑脉，亦是我华山门人。切记快剑易折、杀伐伤心，万不可堕入恃剑行凶之魔道！”'),
    ],
    choices: [
      {
        id: 'hsq02_finish_jian',
        label: '接过内门剑士腰牌，正式归入华山西峰剑宗支脉！',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'hs_branch', value: 'jian' },
          { type: 'setSectRank', sectId: 'SECT-05', rank: 2, promoteOnly: true },
          { type: 'addArtExp', artId: 'MA-167', amount: 300 },
          { type: 'addArtExp', artId: 'MA-160', amount: 260 },
          { type: 'giveSilver', amount: 60, reason: '博台大比夺魁晋升内门赏银' },
          { type: 'addSectContribution', amount: 60 },
          { type: 'giveCombatExp', amount: 90, reason: '博台大比三战夺魁实战感悟' },
          { type: 'modifyRenown', delta: 18, reason: '华山博台大比夺魁晋升内门剑士' },
          { type: 'completeQuest', questId: HUASHAN_Q02_QUEST_ID, outcome: 'jian' },
          toast('已晋升华山派【内门剑士】并拜入【西峰剑宗支脉】！', 'success', '剑气分宗'),
        ],
      },
    ],
  },
}
