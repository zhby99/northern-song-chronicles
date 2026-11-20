import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q16_QUEST_ID } from './zhongnanMuColdPoolVowQuest'

const SPEAKER_OBSESSIVE_SWORDSMAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '柳梦痴',
  title: '江南世家 · 痴狂剑客',
  factionName: '江湖散人',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

const SPEAKER_WUXI_GUSHI: StorySpeakerSpec = {
  kind: 'custom',
  name: '巫九娘',
  title: '湘西五溪 · 迷心蛊师',
  factionName: '五溪蛊寨',
  portraitUrl: '/assets/characters/templates/tpl_wuxiguzhai_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_wuxiguzhai_av.jpg',
}

function buildObsessiveSwordsmanNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ16_OBSESSIVE_SWORDSMAN',
    name: '柳梦痴',
    title: '痴狂世家剑客',
    realm: '二流上品',
    factionName: '江湖散人',
    sectRank: 2,
    sectRankLabel: '世家浪客',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“清秋姑娘！我千里迢迢追到终南山，你为何连看我一眼都不肯？挡我路者，死！”',
    stats: { hp: 1920, mp: 1620, agi: 56, res: 40 },
    talents: { bone: 70, comprehension: 72, charm: 68 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-187', move2: 'MA-188' },
    learnedArts: [{ artId: 'MA-121', level: 7 }, { artId: 'MA-187', level: 7 }, { artId: 'MA-188', level: 7 }],
  })
}

function buildWuxiGushiNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ16_WUXI_GUSHI',
    name: '巫九娘',
    title: '湘西五溪 · 迷心蛊师',
    realm: '一流下品',
    factionName: '五溪蛊寨',
    sectRank: 3,
    sectRankLabel: '五溪蛊师',
    avatarUrl: '/assets/characters/templates/tpl_wuxiguzhai_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_wuxiguzhai_fb.jpg',
    talk: '“收了柳公子的千两黄金，今夜便请古墓美人尝尝我湘西同心迷情蛊的滋味吧！”',
    stats: { hp: 2280, mp: 2040, agi: 57, res: 44 },
    talents: { bone: 72, comprehension: 76, charm: 64 },
    equippedArts: { neigong: 'MA-227', move1: 'MA-105', move2: 'MA-145' },
    learnedArts: [{ artId: 'MA-227', level: 8 }, { artId: 'MA-105', level: 8 }, { artId: 'MA-145', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq16_01: {
    id: 'scene_znq16_01',
    title: '第一幕 · 寒潭琴韵',
    subtitle: '终南山隐宗 · 寒玉涧临水抚琴榭',
    illustrationUrl: '/assets/quests/zn_q16_qin_pavilion.jpg',
    illustrationCaption: '寒潭孤影 · 临水抚琴榭秋月映寒波',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，冷月如霜，寒玉涧水气清冽。临水抚琴榭中，冷清秋纤指轻拨冰弦，一曲《幽兰孤芳》随泉声回荡幽谷，听得你胸中浊气尽涤。'),
      S('NPC-0173', '（琴音忽止，垂眸望向寒潭倒影）“{gender:师弟|师妹}，你已晋升古墓真传。可曾听师父说起过，古墓派为何要立下『绝情弃欲、非至诚不可出墓』的祖训？”'),
      P('“弟子只听闻昔年创派祖师与重阳古观有一段纠葛，却不知其中究竟。”'),
    ],
    onFinishEffects: [openScene('scene_znq16_02', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_02: {
    id: 'scene_znq16_02',
    title: '第二幕 · 琴弦骤断',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('冷清秋正欲开口，林外忽传一声凄厉长笑！一道狂风挟着腥甜花香扑入水榭，琴案上冰弦铮然崩断两根！'),
      S(SPEAKER_OBSESSIVE_SWORDSMAN, '（一名锦衣凌乱、双目布满血丝的俊美剑客提剑跃上水榭石栏，嘶声喊道）“清秋！去年长安灯市一别，我寻你整整一年！既然你不肯跟我走，我便请湘西蛊师下蛊，让你永生永世只记得我一人！”'),
    ],
    onFinishEffects: [openScene('scene_znq16_03', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_03: {
    id: 'scene_znq16_03',
    title: '第三幕 · 蛊师现踪',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('话音未落，阴暗竹林间缓缓走出一名浑身银饰叮当、袖口盘着彩雾的妖异妇人，正是湘西五溪蛊师巫九娘！'),
      S('NPC-0173', '（脸色骤寒，拔剑护琴）“柳梦痴！我与你不过一面之缘，你竟丧心病狂勾结五溪蛊师强闯终南禁地！”'),
      P('“痴狂无耻之徒，也敢污我古墓清净地界！冷师姐，你护好琴榭，这两个狂徒交给我！”'),
    ],
    onFinishEffects: [openScene('scene_znq16_04', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_04: {
    id: 'scene_znq16_04',
    title: '第四幕 · 剑斩痴狂',
    subtitle: '寒玉涧临水抚琴榭',
    illustrationUrl: '/assets/quests/zn_q16_intruder_duel.jpg',
    illustrationCaption: '临水退敌 · 剑挑痴狂世家剑客，力抗五溪迷心蛊师',
    mandatory: true,
    beats: [
      S(SPEAKER_OBSESSIVE_SWORDSMAN, '“滚开！谁敢拦我带清秋走，我便杀谁！”'),
    ],
    choices: [
      {
        id: 'znq16_fight_swordsman',
        label: '拔剑拦在冷清秋身前，击退痴狂世家剑客柳梦痴',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q16_QUEST_ID, stepId: 'qin_pavilion_crisis' },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q16_QUEST_ID,
            opponent: { kind: 'custom', npc: buildObsessiveSwordsmanNpc() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '狂徒强闯抚琴榭，绝不可退让一步！',
            introText: '秋风卷浪，你迎战因情成魔的痴狂世家剑客柳梦痴！',
            onWin: [openScene('scene_znq16_05', ZHONGNAN_Q16_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('柳梦痴剑招疯魔不顾性命，冷清秋弹指银针逼退其锋，调息后再战！', 'warn', '誓词问情'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq16_05: {
    id: 'scene_znq16_05',
    title: '第五幕 · 蛊雾袭榭',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('你以《越女古剑术》连点柳梦痴腕脉，挑飞其长剑并将其震落石阶。柳梦痴犹自疯癫嘶喊，一旁的巫九娘却冷笑一声，双袖猛振，漫天淡红迷心蛊雾朝你扑面涌来！'),
      S(SPEAKER_WUXI_GUSHI, '“废物世家子！还得老娘亲自动手——小娃娃，闻一闻这同心迷情蛊，叫你忘了自己姓甚名谁！”'),
      S('NPC-0173', '“小心屏息！我替你渡一口寒玉清气稳住灵台，速速拿下这妖妇！”'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      openScene('scene_znq16_06', ZHONGNAN_Q16_QUEST_ID),
    ],
  },

  scene_znq16_06: {
    id: 'scene_znq16_06',
    title: '第六幕 · 力破蛊师',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      P('“邪门蛊术，也敢在终南寒玉涧作祟？看剑！”'),
    ],
    choices: [
      {
        id: 'znq16_fight_gushi',
        label: '屏息凝神，与冷清秋联手击退湘西五溪蛊师巫九娘',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q16_QUEST_ID,
            opponent: { kind: 'custom', npc: buildWuxiGushiNpc() },
            allies: [{ kind: 'npc', npcId: 'NPC-0173' }],
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '五溪蛊师正在施放迷心毒雾，必须当场击破！',
            introText: '寒潭月影摇曳，你与冷清秋并肩迎战湘西五溪蛊师巫九娘！',
            onWin: [openScene('scene_znq16_07', ZHONGNAN_Q16_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('五溪蛊雾诡异难防，你与冷清秋暂退水榭石柱后调息再战！', 'warn', '誓词问情'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq16_07: {
    id: 'scene_znq16_07',
    title: '第七幕 · 驱邪逐狂',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('你与冷清秋一剑一针配合无间，凌厉剑风将迷心蛊雾尽数吹散入潭，顺势震碎巫九娘腰间蛊瓶！巫九娘见大势已去，尖叫一声拎起昏迷的柳梦痴，狼狈遁入夜林。'),
    ],
    onFinishEffects: [openScene('scene_znq16_08', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_08: {
    id: 'scene_znq16_08',
    title: '第八幕 · 孤影叹情',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('水榭重归寂静，唯余断弦轻颤。冷清秋望着柳梦痴跌落的方向，轻轻叹了口气。'),
      S('NPC-0173', '“你看，世人皆道情之一字缠绵动人，可一旦执念入魔，便如这柳梦痴一般害人害己。师父常说，古墓弟子若看不透情关，终究难成大道。”'),
    ],
    onFinishEffects: [openScene('scene_znq16_09', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_09: {
    id: 'scene_znq16_09',
    title: '第九幕 · 寒玉召见',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('正说话间，一只玉蜂悄然飞落冷清秋肩头。冷清秋听罢蜂鸣，神色转为肃穆。'),
      S('NPC-0173', '“师父方才已察觉寒玉涧动静，命你即刻回昆仑寒玉床冰魄石室见她。{gender:师弟|师妹}，师父要以古墓祖训问你本心了，切记遵从自己内心真实所想。”'),
    ],
    onFinishEffects: [openScene('scene_znq16_10', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_10: {
    id: 'scene_znq16_10',
    title: '第十幕 · 踏月归墓',
    subtitle: '寒玉涧石径',
    mandatory: true,
    beats: [
      N('你收剑行过幽暗石径，心中反复思量方才那一幕痴狂风波与冷清秋的叹息，步步走向活死人墓深处。'),
    ],
    onFinishEffects: [openScene('scene_znq16_11', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_11: {
    id: 'scene_znq16_11',
    title: '第十一幕 · 赴约冰室',
    subtitle: '活死人墓石门外',
    mandatory: true,
    beats: [
      N('石门缓缓开启，一缕清冷寒意迎面扑来。林朝瑶正在昆仑寒玉床前静候你的答案。'),
    ],
    choices: [
      {
        id: 'znq16_go_jadebed',
        label: '前往【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】接受林朝瑶问心',
        tone: 'primary',
        effects: [
          setStep(ZHONGNAN_Q16_QUEST_ID, 'jadebed_heart_vow'),
          toast('请前往【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】接受师父问心！', 'talk', '誓词问情'),
        ],
      },
    ],
  },

  scene_znq16_12: {
    id: 'scene_znq16_12',
    title: '第十二幕 · 寒室孤灯',
    subtitle: '终南山隐宗 · 昆仑寒玉床冰魄石室',
    illustrationUrl: '/assets/quests/zn_q16_cold_pool_vow.jpg',
    illustrationCaption: '誓词问情 · 冰魄石室孤灯下寒玉仙子叩问古墓本心',
    mandatory: true,
    beats: [
      N('冰魄石室内，两盏白烛映照着素净的石壁，林朝瑶背对着你立于一幅泛黄的祖师画像前，声音清冷如泉。'),
      S('NPC-0114', '“方才抚琴榭之事，我已知晓。那世家子因一念执迷而借邪蛊害人，世间痴怨大抵如此。”'),
    ],
    onFinishEffects: [openScene('scene_znq16_13', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_13: {
    id: 'scene_znq16_13',
    title: '第十三幕 · 祖师旧训',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“我古墓一脉武功至阴至寒，最忌心神动摇、走火入魔。故历代传人晋升真传、欲修寒冰绵掌与玉女心经之前，皆须在祖师画像前立下本心之誓。”'),
      N('林朝瑶缓缓转身，澄澈冰眸直视你的双眼，仿佛能看穿世间一切虚伪。'),
    ],
    onFinishEffects: [openScene('scene_znq16_14', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_14: {
    id: 'scene_znq16_14',
    title: '第十四幕 · 问情之抉',
    subtitle: '昆仑寒玉床冰魄石室',
    illustrationUrl: '/assets/quests/zn_q16_heart_choice.jpg',
    illustrationCaption: '一念问心 · 冰心止水或情深不悔，皆由己心定夺',
    mandatory: true,
    beats: [
      S('NPC-0114', '“如今我问你：面对红尘万丈、爱恨痴缠，你欲以何心修我古墓绝学？是以『冰心止水』斩断尘缘、超然物外；还是纵知情海多劫，仍守『情深不悔』、以至诚克至寒？”'),
      N('石室静得落针可闻。你的回答将铭刻于心境之中，决定日后古墓心法之路。'),
    ],
    choices: [
      {
        id: 'znq16_choose_ice',
        label: '立誓「冰心止水」：斩断红尘痴妄，如寒潭孤月映万象而不染尘埃',
        subLabel: '设定古墓心境为【冰心止水】',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'zn_mu_heart', value: 'ice' },
          openScene('scene_znq16_15', ZHONGNAN_Q16_QUEST_ID),
        ],
      },
      {
        id: 'znq16_choose_passion',
        label: '立誓「情深不悔」：不惧红尘百劫，唯以至诚真情守望所珍重之人',
        subLabel: '设定古墓心境为【情深不悔】',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'zn_mu_heart', value: 'passion' },
          openScene('scene_znq16_16', ZHONGNAN_Q16_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq16_15: {
    id: 'scene_znq16_15',
    title: '第十五幕 · 冰心止水',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      P('“弟子愿守『冰心止水』之境！世间爱恨多如泡影，唯有清静无染、心如止水，方能将古墓寒玉心法修至圆满无瑕！”'),
      S('NPC-0114', '（轻轻颔首，眸色澄明如冰）“太上忘情，心如寒潭。你既有此定力，日后修习《寒冰绵掌》与《玉女心经》，必能少了三分心魔羁绊。”'),
    ],
    onFinishEffects: [openScene('scene_znq16_17', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_16: {
    id: 'scene_znq16_16',
    title: '第十六幕 · 情深不悔',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      P('“弟子不敢欺瞒师父！草木尚有向阳之心，何况于人？弟子愿以『情深不悔』立誓——不为私欲痴狂，却愿为世间真情与大义赴汤蹈火，至死不渝！”'),
      S('NPC-0114', '（怔了片刻，冰冷唇角竟泛起一抹极淡却极温柔的笑意）“傻孩子……当年祖师虽立断情之训，又何尝不是因情深至极？既选此道，便须以至诚护心，切莫负人，亦莫负己。”'),
    ],
    onFinishEffects: [openScene('scene_znq16_17', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_17: {
    id: 'scene_znq16_17',
    title: '第十七幕 · 灵台澄明',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('无论止水抑或深情，皆因坦荡无欺而念头通达！你只觉识海中最后一丝滞涩豁然消散，对琴韵与心境的体悟更上一层楼。'),
    ],
    onFinishEffects: [openScene('scene_znq16_18', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_18: {
    id: 'scene_znq16_18',
    title: '第十八幕 · 传功前夕',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“本心既定，你已具备承接我古墓两大杀伐绝技——《寒冰绵掌》与《含沙射影》的资格。先回去好生调息一宿，明日入冰室受法。”'),
    ],
    onFinishEffects: [openScene('scene_znq16_19', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_19: {
    id: 'scene_znq16_19',
    title: '第十九幕 · 素女相迎',
    subtitle: '活死人墓石廊',
    mandatory: true,
    beats: [
      N('走出冰魄石室，冷清秋正提灯候在石廊外，见你神色澄静从容，便知你已顺利通过师父问心，欣然一笑。'),
    ],
    onFinishEffects: [openScene('scene_znq16_20', ZHONGNAN_Q16_QUEST_ID)],
  },

  scene_znq16_20: {
    id: 'scene_znq16_20',
    title: '第二十幕 · 誓心永铭',
    subtitle: '活死人墓幽谷石室',
    mandatory: true,
    beats: [
      N('寒潭孤月静照终南，古墓誓心已立。你知道，真正的寒玉神功与秦岭暗战，正等待着你去直面。'),
    ],
    choices: [
      {
        id: 'znq16_complete',
        label: '铭记今日誓心之言，静候师父传授高阶绝学',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'modifySkill', key: '琴', delta: 1 },
          { type: 'giveSilver', amount: 120, reason: '护持寒玉涧并完成真传问心赏银' },
          { type: 'giveCombatExp', amount: 1750, reason: '临水抚琴榭连退狂徒与蛊师历练' },
          { type: 'addSectContribution', amount: 280 },
          { type: 'modifyRenown', delta: 35, reason: '寒玉涧击退五溪蛊师护佑同门' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 15 },
          { type: 'completeQuest', questId: ZHONGNAN_Q16_QUEST_ID, outcome: 'vow_answered' },
          toast('《寒潭孤影 · 誓词问情》圆满完成！古墓本心已定！', 'success', '誓词问情'),
        ],
      },
    ],
  },
}
