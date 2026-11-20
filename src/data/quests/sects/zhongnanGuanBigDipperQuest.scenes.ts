import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, warn } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q04_QUEST_ID } from './zhongnanGuanBigDipperQuest'

const SPEAKER_TAIHANG_BOSS: StorySpeakerSpec = {
  kind: 'custom',
  name: '铁脊狼王',
  title: '太行山闯山匪首',
  factionName: '太行悍匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_TAIHANG_VICE: StorySpeakerSpec = {
  kind: 'custom',
  name: '鬼头刀巴九',
  title: '太行山悍匪二当家',
  factionName: '太行悍匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildTaihangBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q04_TAIHANG_BOSS',
    name: '铁脊狼王',
    title: '太行山闯山匪首',
    realm: '二流下品',
    factionName: '太行悍匪',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“拿人钱财替人消灾！今晚一把火烧了你们重阳道观，牛鼻子们纳命来！”',
    stats: { hp: 1080, mp: 420, agi: 40, res: 24 },
    talents: { bone: 64, comprehension: 50, charm: 35 },
    equippedArts: { neigong: 'MA-234', move1: 'MA-184' },
    learnedArts: [
      { artId: 'MA-234', level: 5 },
      { artId: 'MA-184', level: 5 },
    ],
  })
}

function buildTaihangVice(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q04_TAIHANG_VICE',
    name: '鬼头刀巴九',
    title: '太行山悍匪二当家',
    realm: '三流上品',
    factionName: '太行悍匪',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“大哥先劈那小道士，我来放火烧经阁！”',
    stats: { hp: 820, mp: 300, agi: 36, res: 20 },
    talents: { bone: 56, comprehension: 44, charm: 30 },
    equippedArts: { neigong: 'MA-180', move1: 'MA-184' },
    learnedArts: [{ artId: 'MA-180', level: 4 }, { artId: 'MA-184', level: 4 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn_q04_01: {
    id: 'scene_zn_q04_01',
    title: '第一幕 · 璇玑石坛',
    subtitle: '重阳古观 · 天罡北斗七星演剑坛',
    illustrationUrl: '/assets/quests/zn_q04_dipper_formation.jpg',
    illustrationCaption: '北斗璇玑 · 七星青石坛上剑影如星，谭处真与林弘毅指点阵法',
    mandatory: true,
    beats: [
      N('{reignYear}仲夏，重阳古观高台之上，七块巨大的青石按天枢、天璇、天玑、天权、玉衡、开阳、摇光七星方位嵌于地面，构成威名远播的【天罡北斗七星演剑坛】。'),
      S('NPC-1055', '（身着青灰道袍，负手立于天枢石上，神情沉稳）“{gender:师弟|师妹}既入我重阳古观前脉，便须明白全真武学的真髓——单打独斗固然要强，遇强敌合围之时，更要借天地星辰之势！”'),
      S('NPC-0276', '（捋须大笑，手按金刀）“老夫虽用刀，却最佩服紫阳师兄所创的北斗剑阵与三才剑理。今日便由谭师兄主讲、老夫喂招，传你古观内门镇脉绝学《三才归元剑》！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_02', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_02: {
    id: 'scene_zn_q04_02',
    title: '第二幕 · 天地人三才',
    subtitle: '七星演剑坛 · 剑理开讲',
    mandatory: true,
    beats: [
      S('NPC-1055', '（长剑出鞘，剑尖遥指苍穹，复垂青石，再横胸前）“所谓三才，天为攻、地为守、人为变。剑出上盘如苍鹰击空，落于下盘如盘根老松，中宫虚实转换则如人随星移！”'),
      P('“原来三才归元并非死招，而是把攻守变化融为一炉，生生不息！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_03', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_03: {
    id: 'scene_zn_q04_03',
    title: '第三幕 · 步踏七星',
    subtitle: '七星演剑坛 · 棋理融阵',
    mandatory: true,
    beats: [
      S('NPC-1055', '“正是！你且看脚下七星石位，犹如围棋纵横十九道上的星位大势——牵一发而动全身，退一步而制全局！”'),
      N('你顺着谭处真所指方位踏步游走，忽觉步法与棋局大势暗暗相合，胸中豁然开朗！'),
    ],
    onFinishEffects: [
      { type: 'modifySkill', key: '棋', delta: 1 },
      openScene('scene_zn_q04_04', ZHONGNAN_Q04_QUEST_ID),
    ],
  },

  scene_zn_q04_04: {
    id: 'scene_zn_q04_04',
    title: '第四幕 · 传剑授诀',
    subtitle: '七星演剑坛 · 习得三才归元剑',
    mandatory: true,
    beats: [
      S('NPC-0276', '（挥刀斩出三道慢招替你拆解变式）“看好这一式‘三才归元’——遇重刀压顶时切莫硬扛，以天字剑引偏，地字剑封下，人字剑直点敌腕！”'),
      N('你手腕一振，【终南寒泉道剑】发出一声清越龙吟，三道剑气首尾相衔，已得《三才归元剑》入门真意！'),
    ],
    choices: [
      {
        id: 'zn_q04_learn_sancai',
        label: '凝神挥剑 · 习得良品剑法《三才归元剑》',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-149', level: 1, autoEquip: true },
          openScene('scene_zn_q04_05', ZHONGNAN_Q04_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q04_05: {
    id: 'scene_zn_q04_05',
    title: '第五幕 · 金刀喂招',
    subtitle: '七星演剑坛 · 实战拆解',
    mandatory: true,
    beats: [
      S('NPC-0276', '（抚刀大赞）“好悟性！这才一炷香工夫，三才连环已有模有样。只是山风将起，今晚怕是有不速之客，且让老夫再陪你走十合巩固剑意！”'),
      N('夕阳西沉，演剑坛上刀光剑影交错，你对三才归元剑的运转愈发得心应手。'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_06', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_06: {
    id: 'scene_zn_q04_06',
    title: '第六幕 · 山门异警',
    subtitle: '重阳古观 · 暮色暗涌',
    mandatory: true,
    beats: [
      N('入夜二更，松林深处忽传来三声短促的夜枭啼叫——那是重阳古观外围哨探发出的敌袭暗号！'),
      S('NPC-1055', '（瞬间收剑，双目如电望向山道火光）“好大的胆子！竟真有绿林悍匪趁夜摸上终南山门！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_07', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_07: {
    id: 'scene_zn_q04_07',
    title: '第七幕 · 太行匪踪',
    subtitle: '七星演剑坛 · 敌情急报',
    mandatory: true,
    beats: [
      N('一名巡山道童飞奔上坛，气喘吁吁禀道：“禀谭师叔、林长老！山门外闯进来二十余名太行山悍匪，个个背着火油罐子，领头的是凶名赫赫的‘铁脊狼王’与‘鬼头刀巴九’！”'),
      S('NPC-0276', '（冷哼一声）“太行山远在河东，这群亡命徒千里迢迢跑到终南山放火，定是收了西夏或星宿派的黑银！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_08', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_08: {
    id: 'scene_zn_q04_08',
    title: '第八幕 · 列阵待敌',
    subtitle: '七星演剑坛 · 布防北斗',
    mandatory: true,
    beats: [
      S('NPC-1055', '“弘毅师弟，你带几名弟子去守住道藏经阁与紫金丹院，绝不可让贼人纵火！我与{gender:师弟|师妹}坐镇这七星演剑坛，专候那两个贼首！”'),
      S('NPC-0276', '“好！{gender:师侄|师侄女}，拿这帮太行匪给你的三才归元剑开开锋罢！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_09', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_09: {
    id: 'scene_zn_q04_09',
    title: '第九幕 · 星光凛冽',
    subtitle: '七星演剑坛 · 严阵以待',
    mandatory: true,
    beats: [
      N('你依言立于天权星位，寒泉道剑斜指青石。山道上脚步杂沓、火把如龙，贼众已逼近演剑坛石阶！'),
    ],
    choices: [
      {
        id: 'zn_q04_ready_defense',
        label: '稳守天权星位 · 迎击夜闯山门的太行悍匪',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q04_QUEST_ID, stepId: 'dipper_night_defense' },
          setStep(ZHONGNAN_Q04_QUEST_ID, 'dipper_night_defense'),
          openScene('scene_zn_q04_10', ZHONGNAN_Q04_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q04_10: {
    id: 'scene_zn_q04_10',
    title: '第十幕 · 火光映坛',
    subtitle: '天罡北斗七星演剑坛 · 贼首现身',
    illustrationUrl: '/assets/quests/zn_q04_night_bandits.jpg',
    illustrationCaption: '星夜护观 · 火把映红七星石坛，太行悍匪挥刀强攻重阳山门',
    mandatory: true,
    beats: [
      N('石阶尽头火光冲天，铁脊狼王手持精钢狼牙棒、鬼头刀巴九拎着厚背鬼头刀大步冲上石坛，身后喽啰狂呼乱叫！'),
      S(SPEAKER_TAIHANG_BOSS, '“哈哈哈哈！重阳老道都缩壳里去了么？就剩一个老道士带个小辈，弟兄们，踩平这破石坛！”'),
      S('NPC-1055', '（长剑一横，先将外围十余喽啰尽数逼下石阶）“外围杂鱼贫道扫清！{gender:师弟|师妹}，步踏北斗，用三才归元剑破了这两个贼首！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_11', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_11: {
    id: 'scene_zn_q04_11',
    title: '第十一幕 · 先斩鬼头刀',
    subtitle: '七星演剑坛 · 力战巴九',
    mandatory: true,
    beats: [
      S(SPEAKER_TAIHANG_VICE, '“小道士先吃爷爷一记鬼头断山刀！”'),
      P('“太行悍匪也敢犯我终南玄门！看《三才归元剑》！”'),
    ],
    choices: [
      {
        id: 'zn_q04_fight_vice',
        label: '踏星迎刀 · 击败太行二当家鬼头刀巴九',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTaihangVice() },
            rule: 'story_trial',
            forbidEscapeReason: '山门经阁就在身后，绝不可退！',
            introText: '鬼头刀巴九挥动厚背大刀，挟着烈风劈面斩来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q04_12', ZHONGNAN_Q04_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('不慎被巴九乱刀逼退，谭处真及时剑气相护。请调息后再战！', '星夜护观'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q04_12: {
    id: 'scene_zn_q04_12',
    title: '第十二幕 · 狼王狂扑',
    subtitle: '七星演剑坛 · 铁脊狼王压阵',
    mandatory: true,
    beats: [
      N('你脚踏天璇、天玑二位，一招三才连环挑断巴九腕脉，鬼头刀当啷落地！铁脊狼王见二当家瞬间落败，暴怒如雷，抡起百斤狼牙棒横扫而来！'),
      S(SPEAKER_TAIHANG_BOSS, '“好个贼道士！今日老子把你连人带剑砸成肉泥！”'),
      S('NPC-1055', '（朗声喝道）“莫与他硬碰蛮力！借玉衡、开阳星位闪转，以三才剑意卸他劲道！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_13', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_13: {
    id: 'scene_zn_q04_13',
    title: '第十三幕 · 三才破狼棒',
    subtitle: '七星演剑坛 · 决战铁脊狼王',
    mandatory: true,
    beats: [
      N('你深吸一口夜气，全真内息与北斗步法浑然一体，长剑化作三道清冷星芒直迎狼牙棒！'),
    ],
    choices: [
      {
        id: 'zn_q04_fight_boss',
        label: '以柔克刚 · 击溃太行匪首铁脊狼王',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTaihangBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '匪首就在眼前，一举破之方保山门无虞！',
            introText: '铁脊狼王暴喝一声，精钢狼牙棒带着劲风横扫千军！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q04_14', ZHONGNAN_Q04_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('狼牙棒力道奇沉，谭处真双剑相格助你回气。请调整呼吸再战！', '星夜护观'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q04_14: {
    id: 'scene_zn_q04_14',
    title: '第十四幕 · 擒首退敌',
    subtitle: '七星演剑坛 · 匪众溃散',
    mandatory: true,
    beats: [
      N('你身形如鬼魅般绕过狼牙棒锋芒，三才归元剑顺势点中铁脊狼王膻中与肩井二穴！狼王闷哼一声单膝跪地，狼牙棒轰然砸裂青石！'),
      N('余下太行喽啰见两位当家尽数被擒，顿时作鸟兽散，连滚带爬逃下山去。'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_15', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_15: {
    id: 'scene_zn_q04_15',
    title: '第十五幕 · 审出幕后',
    subtitle: '七星演剑坛 · 铁牌露迹',
    mandatory: true,
    beats: [
      N('林弘毅押着几名俘虏赶回石坛，从铁脊狼王怀里搜出一锭刻着西夏官印的银铤。'),
      S('NPC-0276', '（冷笑捏起银铤）“哼，果然不出所料！西夏一品堂出银雇太行悍匪来扰我重阳山门，看来是想牵制我终南无暇西顾！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_16', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_16: {
    id: 'scene_zn_q04_16',
    title: '第十六幕 · 师长赞誉',
    subtitle: '七星演剑坛 · 星月渐明',
    mandatory: true,
    beats: [
      S('NPC-1055', '（拭剑归鞘，难得露出欣慰笑意）“初学《三才归元剑》便能于实战中临阵破敌，丝毫不乱阵脚，{gender:师弟|师妹}果真没有辜负紫阳师尊的期许！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_17', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_17: {
    id: 'scene_zn_q04_17',
    title: '第十七幕 · 玉阳邀约',
    subtitle: '重阳古观 · 轻功伏笔',
    mandatory: true,
    beats: [
      S('NPC-0276', '“对了，玉阳子王处阳师兄近日正在后山银练飞瀑参悟轻身之术，说你剑法已成，唯独身法尚欠几分凌空绝壁的灵动。过两日你不妨去寻他讨教！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q04_18', ZHONGNAN_Q04_QUEST_ID)],
  },

  scene_zn_q04_18: {
    id: 'scene_zn_q04_18',
    title: '第十八幕 · 剑指星河',
    subtitle: '七星演剑坛 · 圆满收官',
    mandatory: true,
    beats: [
      N('夜雾散尽，北斗七星高悬天际，清辉洒满青石演剑坛。你长剑入鞘，心中对重阳古观剑阵之道已有了全新体悟。'),
    ],
    choices: [
      {
        id: 'zn_q04_complete',
        label: '稽首谢师 · 完成《北斗璇玑 · 三才归元》',
        tone: 'gold',
        effects: [
          { type: 'addSectContribution', amount: 85 },
          { type: 'giveSilver', amount: 70, reason: '夜破太行悍匪护观嘉奖' },
          { type: 'giveCombatExp', amount: 520, reason: '完成《北斗璇玑 · 三才归元》' },
          { type: 'modifyRenown', delta: 18, reason: '终南七星坛夜破太行悍匪' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1055' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0276' }, delta: 10 },
          { type: 'completeQuest', questId: ZHONGNAN_Q04_QUEST_ID, outcome: 'mastered_sancai' },
          toast('完成《北斗璇玑 · 三才归元》，精进《三才归元剑》！', 'success', '三才归元'),
        ],
      },
    ],
  },
}
