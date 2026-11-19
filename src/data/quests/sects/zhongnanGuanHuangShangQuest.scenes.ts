import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q23_QUEST_ID } from './zhongnanGuanHuangShangQuest'

const SPEAKER_MANICHAEAN_ENVOY: StorySpeakerSpec = {
  kind: 'custom',
  name: '波斯圣火使者',
  title: '摩尼教西域邪徒首领',
  factionName: '波斯摩尼教',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
}

const SPEAKER_BANDIT_LORD: StorySpeakerSpec = {
  kind: 'custom',
  name: '血帆蛟龙 · 严沧海',
  title: '江南黑道巨寇',
  factionName: '东海黑道',
  avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
}

const MANICHAEAN_ENVOY_NPC = makeQuestNpc({
  id: 'znq23_manichaean_envoy',
  name: '波斯圣火使者',
  title: '摩尼教西域邪徒首领',
  realm: '一流中品',
  factionName: '波斯摩尼教',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  talk: '“黄裳校刻道藏欲破我明尊圣火之秘，今日便连人带经一并化作灰烬！”',
  stats: { hp: 3350, mp: 1850, agi: 84, res: 72 },
  equippedArts: {
    neigong: 'MA-079',
    qinggong: 'MA-098',
    move1: 'MA-072',
    move2: 'MA-150',
  },
  learnedArts: [
    { artId: 'MA-079', level: 7 },
    { artId: 'MA-098', level: 7 },
    { artId: 'MA-072', level: 7 },
    { artId: 'MA-150', level: 7 },
  ],
})

const BANDIT_LORD_NPC = makeQuestNpc({
  id: 'znq23_bandit_lord',
  name: '血帆蛟龙 · 严沧海',
  title: '江南黑道巨寇',
  realm: '一流上品',
  factionName: '东海黑道',
  avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
  talk: '“听说《万寿道藏》里藏着天下武学总纲，老子今晚便替江湖好汉收了！”',
  stats: { hp: 3750, mp: 1950, agi: 88, res: 78 },
  equippedArts: {
    neigong: 'MA-080',
    qinggong: 'MA-098',
    move1: 'MA-072',
    move2: 'MA-132',
  },
  learnedArts: [
    { artId: 'MA-080', level: 8 },
    { artId: 'MA-098', level: 7 },
    { artId: 'MA-072', level: 8 },
    { artId: 'MA-132', level: 8 },
  ],
})

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq23_01: {
    id: 'scene_znq23_01',
    title: '第一幕 · 千里南来刺桐城',
    subtitle: '泉州府 · 泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画',
    illustrationUrl: '/assets/quests/zn_q23_kaiyuan_huangshang.jpg',
    illustrationCaption: '开元寺石塔回廊墨香袅袅，道藏真君黄裳端坐万卷竹简帛书之间，神光内敛',
    mandatory: true,
    beats: [
      N('{reignYear}深冬，塞北冰雪封山，闽海泉州府却仍刺桐花开、海风温润。你怀揣师尊王重楼亲笔密信，步入千年古刹【泉州开元寺东西双塔】，拾级登上中层回廊。'),
      N('石廊两侧堆满从大宋各地征集而来的道门古籍、竹简与雕版，松烟墨香扑面而来。一位身着素麻儒衫、眉目如画却透着深不可测道韵的文士正伏案朱笔点校——正是号称「道藏真君」的奇人【黄裳】。'),
      P('（整衣行礼，双手呈上王重楼手书）“终南重阳古观弟子，奉家师紫阳真人王重楼之命，拜见黄裳前辈！”'),
    ],
    onFinishEffects: [
      { type: 'startQuest', questId: ZHONGNAN_Q23_QUEST_ID, stepId: 'meet_huangshang' },
      { type: 'teleportPlayer', regionId: 'quanzhou', buildingId: 'qz_kaiyuan', spotId: 'qz_kaiyuan_east' },
      openScene('scene_znq23_02', ZHONGNAN_Q23_QUEST_ID),
    ],
  },

  scene_znq23_02: {
    id: 'scene_znq23_02',
    title: '第二幕 · 道藏真君览旧书',
    subtitle: '泉州开元寺东西双塔 · 中层回廊',
    mandatory: true,
    beats: [
      S('NPC-0107', '（搁下朱笔，拆阅王重楼手书，眼中浮起一丝温雅笑意）“原来是重楼道兄座下高徒！当年我在京师与重楼兄论道三日，至今难忘。听闻你刚在延安边关击退西夏一品堂，年纪轻轻便有如此侠气与修为，实属难得。”'),
      P('“前辈过奖。家师听闻前辈在此孤身校刻五千四百八十一卷《万寿道藏》，恐有心怀叵测之徒前来滋扰，特命弟子南下听候差遣！”'),
    ],
    onFinishEffects: [openScene('scene_znq23_03', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_03: {
    id: 'scene_znq23_03',
    title: '第三幕 · 五千道卷蕴天机',
    subtitle: '泉州开元寺东西双塔 · 中层回廊',
    mandatory: true,
    beats: [
      S('NPC-0107', '（轻抚案头一叠泛黄的古本《道德经》与《阴符经》）“校经看似枯燥，实则是与千古圣贤对坐清谈。我本是一介文官，只因细读这五千余卷道藏，才从‘天之道，损有余而补不足’之中，无师自通了武道阴阳之理。”'),
      S('NPC-0107', '“只是世间总有人只盯着字里行间的长生秘术与破敌奇招，却忘了道家本旨在于生生不息、调和天地。”'),
    ],
    onFinishEffects: [openScene('scene_znq23_04', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_04: {
    id: 'scene_znq23_04',
    title: '第四幕 · 研墨理简佐校勘',
    subtitle: '泉州开元寺东西双塔 · 中层回廊',
    mandatory: true,
    beats: [
      N('接下来三日，你随黄裳静坐石塔回廊，帮忙检核《云笈七签》《太上感应篇》与终南古观藏本的异文缺字。墨香氤氲间，你只觉往日修炼全真内功时几处晦涩难通的关窍，竟在逐字句读中悄然冰释。'),
      S('NPC-0107', '（指着一卷残缺的《黄庭内景经》问你）“小友，此处‘阳极生阴，阴极生阳’一句后缺了四字注脚，依你终南道门体悟，当补何意？”'),
    ],
    choices: [
      {
        id: 'znq23_ch_comment_balance',
        label: '“刚柔相摩，动静互根——偏执一端则易折，阴阳相济方能长存！”',
        tone: 'jade',
        effects: [
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0107' }, delta: 8 },
          openScene('scene_znq23_05', ZHONGNAN_Q23_QUEST_ID),
        ],
      },
      {
        id: 'znq23_ch_comment_calligraphy',
        label: '“笔意贯通，气韵自生——道在字外，犹剑在招外！”',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0107' }, delta: 8 },
          openScene('scene_znq23_05', ZHONGNAN_Q23_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq23_05: {
    id: 'scene_znq23_05',
    title: '第五幕 · 刺桐港口暗云生',
    subtitle: '泉州开元寺东西双塔 · 中层回廊',
    mandatory: true,
    beats: [
      S('NPC-0107', '（微微颔首，眼神却忽地投向窗外刺桐港方向）“好见解。不过——海风里夹着一股刺鼻的西域火油与硫磺味，看来重楼道兄担心的事情，终究还是来了。”'),
      P('“西域火油？莫非刺桐港有番邦邪教潜入泉州城？”'),
    ],
    onFinishEffects: [openScene('scene_znq23_06', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_06: {
    id: 'scene_znq23_06',
    title: '第六幕 · 摩尼暗影窥经楼',
    subtitle: '泉州开元寺东西双塔 · 中层回廊',
    mandatory: true,
    beats: [
      S('NPC-0107', '（神色微沉）“近年一批自波斯海路而来的摩尼教激进邪徒，在闽浙沿海煽动流民、勾结江南黑道海寇。他们听闻我奉旨校刻《万寿道藏》，谣传经中藏有克制天下武学的奇书，数次派人潜入开元寺窥探，甚至妄图焚毁雕版！”'),
      P('“竟敢在千年古刹焚毁中华道典！前辈只管安心护住东塔母本，弟子这便去巡查双塔动静！”'),
    ],
    onFinishEffects: [openScene('scene_znq23_07', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_07: {
    id: 'scene_znq23_07',
    title: '第七幕 · 残月高悬双塔静',
    subtitle: '泉州开元寺庭院',
    mandatory: true,
    beats: [
      N('入夜三更，刺桐城万家灯火渐熄，唯余海涛远声与开元寺檐角铜铃清响。你提剑立于双塔之间，耳力全开，静听四野风动。'),
    ],
    onFinishEffects: [openScene('scene_znq23_08', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_08: {
    id: 'scene_znq23_08',
    title: '第八幕 · 西塔火光惊夜鸦',
    subtitle: '泉州开元寺东西双塔',
    illustrationUrl: '/assets/quests/zn_q23_manichaean_raid.jpg',
    illustrationCaption: '夜色浓重，数道黑袍身影携幽蓝火油攀上西塔石檐，黑道海寇刀光映月',
    mandatory: true,
    beats: [
      N('骤然间，西塔绝顶佛龛方向惊起一群寒鸦！数道身披赤纹黑袍的诡异身影如蝙蝠般沿着石塔浮雕疾攀而上，手中赫然提着散发幽蓝磷光的西域猛火油囊！'),
      N('塔下暗影中，更有数名手持鬼头大刀的江南黑道悍匪封住石梯，为首一名独眼巨汉狞笑低喝：“先烧西塔藏经阁引开寺僧，再把黄裳那酸儒抓上船！”'),
    ],
    onFinishEffects: [openScene('scene_znq23_09', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_09: {
    id: 'scene_znq23_09',
    title: '第九幕 · 疾步登塔拦邪焰',
    subtitle: '泉州开元寺东西双塔',
    mandatory: true,
    beats: [
      P('（眼中寒芒乍现，长剑出鞘）“好胆！想烧《万寿道藏》经板，先问过我手中终南长剑！”'),
      S('NPC-0107', '（清朗声音自东塔回廊遥遥传来）“小友小心！那波斯邪徒身法诡异、掌藏奇火，江南巨寇刀势凶猛，切莫与他们硬拼蛮力，记住方才所言‘损有余而补不足’！”'),
    ],
    choices: [
      {
        id: 'znq23_ch_go_west_tower',
        label: '凌空跃上【绝顶佛龛 · 凭栏远眺】，迎战摩尼邪徒与黑道巨寇！',
        tone: 'danger',
        effects: [
          setStep(ZHONGNAN_Q23_QUEST_ID, 'defend_west_tower'),
          { type: 'teleportPlayer', regionId: 'quanzhou', buildingId: 'qz_kaiyuan', spotId: 'qz_kaiyuan_west' },
          { type: 'setFlag', flag: 'znq23_west_triggered', value: true },
          openScene('scene_znq23_13', ZHONGNAN_Q23_QUEST_ID),
        ],
      },
      {
        id: 'znq23_ch_prep_west_tower',
        label: '先整顿丹药真气，稍后自行登临西塔绝顶佛龛',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q23_QUEST_ID, 'defend_west_tower'),
          openScene('scene_znq23_10', ZHONGNAN_Q23_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq23_10: {
    id: 'scene_znq23_10',
    title: '第十幕 · 整备锋芒护经卷',
    subtitle: '泉州开元寺',
    mandatory: true,
    beats: [
      N('你深吸一口微咸海风，确认随身伤药完备，随即纵身奔向【西塔绝顶佛龛】！'),
    ],
  },

  scene_znq23_11: {
    id: 'scene_znq23_11',
    title: '第十一幕 · 飞檐走壁截妖人',
    subtitle: '泉州开元寺西塔石阶',
    mandatory: true,
    beats: [
      N('你施展金雁轻功踏壁而上，三两步便越过塔下把风喽啰，直抵西塔绝顶佛龛之外！'),
    ],
    onFinishEffects: [openScene('scene_znq23_12', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_12: {
    id: 'scene_znq23_12',
    title: '第十二幕 · 经箱之前剑拔弩张',
    subtitle: '泉州开元寺东西双塔 · 绝顶佛龛 · 凭栏远眺',
    mandatory: true,
    beats: [
      N('绝顶佛龛海风呼啸，十几口暂存《万寿道藏》新刻梨木经板的铁皮大箱就堆在栏畔。波斯圣火使者正举着火折子，被你一剑寒光逼得骤然停手！'),
    ],
    onFinishEffects: [openScene('scene_znq23_13', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_13: {
    id: 'scene_znq23_13',
    title: '第十三幕 · 西塔绝顶战圣火',
    subtitle: '泉州府 · 泉州开元寺东西双塔 · 绝顶佛龛 · 凭栏远眺',
    illustrationUrl: '/assets/quests/zn_q23_west_tower_battle.jpg',
    illustrationCaption: '西塔绝顶海风狂卷，终南长剑清光破开赤焰掌风，硬撼波斯圣火使者与江南巨寇',
    mandatory: true,
    beats: [
      S(SPEAKER_MANICHAEAN_ENVOY, '（操着生硬汉话冷笑，双掌燃起诡异赤芒）“哪来的终南小道士，也敢阻我圣火教焚经大业？让你尝尝西域圣火掌的滋味！”'),
      P('“装神弄鬼的妖人！中华千年道典，岂容尔等焚毁玷污！”'),
    ],
    choices: [
      {
        id: 'znq23_ch_fight_manichaean',
        label: '剑展清光，迎战波斯摩尼教圣火使者！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q23_QUEST_ID,
            opponent: { kind: 'custom', npc: MANICHAEAN_ENVOY_NPC },
            rule: 'duel',
            lethalOnLose: false,
            introText: '西塔绝顶海风狂作，波斯圣火使者携诡异烈焰掌法扑来！',
            onWin: [openScene('scene_znq23_14', ZHONGNAN_Q23_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('波斯邪徒招式刁钻诡异，稳住道心再以清静剑意破之！', 'warn', '西塔护经'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq23_14: {
    id: 'scene_znq23_14',
    title: '第十四幕 · 破焰斩囊护经板',
    subtitle: '泉州开元寺东西双塔 · 绝顶佛龛',
    mandatory: true,
    beats: [
      N('你剑走圆转，以清静无为的绵密剑网化去对方诡异热浪，旋即一剑挑飞其手中火油囊，顺势将其震落栏外檐角！'),
      N('未等你收剑喘息，一声狂雷般的怒吼自楼梯口炸响——独眼巨汉【血帆蛟龙 · 严沧海】提着百斤鬼头大刀大步跨上绝顶，刀风刮得石砖碎裂！'),
    ],
    onFinishEffects: [openScene('scene_znq23_15', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_15: {
    id: 'scene_znq23_15',
    title: '第十五幕 · 江南巨寇夺道典',
    subtitle: '泉州开元寺东西双塔 · 绝顶佛龛',
    mandatory: true,
    beats: [
      S(SPEAKER_BANDIT_LORD, '（双目赤红，大刀指着经箱狂笑）“波斯洋鬼子果然靠不住！小道士，识相的乖乖让开，严老子只取《万寿道藏》里的绝世秘笈，饶你不死！”'),
      P('“《万寿道藏》乃天下圣贤心血，岂是你这等祸乱海疆的黑道巨寇配染指的！来战！”'),
    ],
    choices: [
      {
        id: 'znq23_ch_fight_bandit',
        label: '以柔克刚，正面迎战江南黑道巨寇严沧海！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q23_QUEST_ID,
            opponent: { kind: 'custom', npc: BANDIT_LORD_NPC },
            rule: 'duel',
            lethalOnLose: false,
            introText: '血帆蛟龙严沧海挥舞鬼头大刀狂劈而来，刀势凶猛绝伦！',
            onWin: [openScene('scene_znq23_16', ZHONGNAN_Q23_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 65, mpPct: 65 },
              toast('严沧海刀势沉重霸道，切莫硬碰，借力卸劲再战！', 'warn', '西塔激战'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq23_16: {
    id: 'scene_znq23_16',
    title: '第十六幕 · 借力卸锋伏蛟龙',
    subtitle: '泉州开元寺东西双塔 · 绝顶佛龛',
    mandatory: true,
    beats: [
      N('你牢记黄裳“损有余而补不足”的提点，不与严沧海硬拼蛮力，专引其霸道刀势落于空处！三十余合后，严沧海气力将竭，被你一剑精准点中右腕脉门，鬼头大刀轰然坠地！'),
      S(SPEAKER_BANDIT_LORD, '（骇然失色，连退数步）“终南重阳古观竟有如此精妙的卸力剑法……风紧，扯呼！”'),
    ],
    onFinishEffects: [openScene('scene_znq23_17', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_17: {
    id: 'scene_znq23_17',
    title: '第十七幕 · 妖寇溃散塔林清',
    subtitle: '泉州开元寺东西双塔 · 绝顶佛龛',
    mandatory: true,
    beats: [
      N('严沧海见大势已去，拉起受伤的波斯圣火使者翻墙遁入夜色，塔下喽啰亦作鸟兽散。开元寺武僧与泉州巡城官兵闻讯赶至，将残余火油妥善清理，十几口《万寿道藏》雕版完好无损！'),
    ],
    onFinishEffects: [openScene('scene_znq23_18', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_18: {
    id: 'scene_znq23_18',
    title: '第十八幕 · 凭栏远眺刺桐夜',
    subtitle: '泉州开元寺东西双塔 · 绝顶佛龛',
    mandatory: true,
    beats: [
      N('你收剑还鞘，凭栏俯瞰刺桐港万点渔火，方才以柔克刚、阴阳转换的畅快之感仍在经脉间奔流不息。'),
    ],
    onFinishEffects: [openScene('scene_znq23_19', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_19: {
    id: 'scene_znq23_19',
    title: '第十九幕 · 归返东塔复真君',
    subtitle: '泉州开元寺东西双塔',
    mandatory: true,
    beats: [
      N('东塔中层回廊依然亮着一盏温暖孤灯。黄裳正在灯下烹茶相候，似乎早已料定你能安然凯旋。'),
    ],
    choices: [
      {
        id: 'znq23_ch_return_east',
        label: '返回【中层回廊 · 浮雕壁画】，与黄裳彻夜纵论天道！',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q23_QUEST_ID, 'yinyang_discourse'),
          { type: 'teleportPlayer', regionId: 'quanzhou', buildingId: 'qz_kaiyuan', spotId: 'qz_kaiyuan_east' },
          { type: 'setFlag', flag: 'znq23_discourse_triggered', value: true },
          openScene('scene_znq23_21', ZHONGNAN_Q23_QUEST_ID),
        ],
      },
      {
        id: 'znq23_ch_later_east',
        label: '先稍作调息，稍后再返东塔中层回廊',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q23_QUEST_ID, 'yinyang_discourse'),
          openScene('scene_znq23_20', ZHONGNAN_Q23_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq23_20: {
    id: 'scene_znq23_20',
    title: '第二十幕 · 暂歇石阶听海风',
    subtitle: '泉州开元寺',
    mandatory: true,
    beats: [
      N('你略作调息，待气息平和后再往【中层回廊 · 浮雕壁画】面见黄裳前辈。'),
    ],
  },

  scene_znq23_21: {
    id: 'scene_znq23_21',
    title: '第二十一幕 · 孤灯清茶论阴阳',
    subtitle: '泉州府 · 泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画',
    illustrationUrl: '/assets/quests/zn_q23_daozang_yinyang_night.jpg',
    illustrationCaption: '古塔残夜孤灯明，黄裳与你对坐万卷道藏之前，纵论阴阳互济、刚柔并生之无上天道',
    mandatory: true,
    beats: [
      S('NPC-0107', '（斟上一盏武夷岩茶，含笑赞叹）“西塔那一战，你在孤立无援之下以清刚化邪焰、以圆柔泄巨刀，已颇得道家‘负阴抱阳’三昧。请坐，今夜海风甚好，你我便彻夜论道一回！”'),
      P('（恭敬落座）“弟子方才临阵，忽觉重阳古观的阳刚正气若能融汇一丝至阴至柔的流转变化，威力竟可倍增。敢问前辈，世间至高武学，究竟是偏阳为尊，还是偏阴为贵？”'),
    ],
    onFinishEffects: [openScene('scene_znq23_22', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_22: {
    id: 'scene_znq23_22',
    title: '第二十二幕 · 天之道损有余',
    subtitle: '泉州开元寺东西双塔 · 中层回廊',
    mandatory: true,
    beats: [
      S('NPC-0107', '（轻摇折扇，目露深邃神光）“孤阴不生，独阳不长！天之道，损有余而补不足。世人练武往往执着于一门一派之偏：练刚猛者易折于过刚，练阴柔者易困于过寒。唯有阴阳互济、水火既济，方能窥见先天大道！”'),
      N('一语如晨钟暮鼓！你刹那间想起终南寒玉涧那通雷劈残碑——重阳古观的至阳《先天功》与活死人墓的至阴《玉女心经》，岂非正是天地阴阳的两极？！'),
    ],
    onFinishEffects: [openScene('scene_znq23_23', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_23: {
    id: 'scene_znq23_23',
    title: '第二十三幕 · 豁然洞见终南理',
    subtitle: '泉州开元寺东西双塔 · 中层回廊',
    mandatory: true,
    beats: [
      P('（心神震动，脱口而出）“孤阴不生，独阳不长……怪不得师尊与林前辈当年在寒玉涧立下双剑合璧之约！原来自始至终，终南双脉本就是一阴一阳、缺一不可！”'),
      S('NPC-0107', '（抚须微笑）“看来你已参透了重楼兄遣你南下的深意。他让你来助我校经，既是护道藏，更是借这五千卷经文，替你打开这扇阴阳通达的心门。”'),
    ],
    onFinishEffects: [openScene('scene_znq23_24', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_24: {
    id: 'scene_znq23_24',
    title: '第二十四幕 · 真君挥毫赠道偈',
    subtitle: '泉州开元寺东西双塔 · 中层回廊',
    mandatory: true,
    beats: [
      N('东方渐白，彻夜清谈意犹未尽。黄裳展纸研墨，挥毫写下一幅八字道偈——「先天一炁，阴阳同归」，盖上朱印赠予于你。'),
      S('NPC-0107', '“此幅字你带回终南山交给重楼兄。他见了这八个字，便知你已具备执掌天罡北斗阵天枢位、肩负重阳古观长老之责的气度与悟性！”'),
    ],
    onFinishEffects: [openScene('scene_znq23_25', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_25: {
    id: 'scene_znq23_25',
    title: '第二十五幕 · 急报忽自终南来',
    subtitle: '泉州开元寺庭院',
    mandatory: true,
    beats: [
      N('次日清晨，你正欲辞别黄裳北归，一名风尘仆仆的终南传讯弟子却气喘吁吁赶到开元寺山门！'),
      P('“师弟何事如此慌张？莫非终南山有变？”'),
      N('那弟子急呈密信：西夏一品堂大将「贺兰血鹰」【努儿海】已纠合大批吐蕃番僧逼近终南前山，扬言要踏平重阳古观！王重楼正命在外历练的精英速归山门，共布天罡北斗大阵！'),
    ],
    onFinishEffects: [openScene('scene_znq23_26', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_26: {
    id: 'scene_znq23_26',
    title: '第二十六幕 · 拜别刺桐驰关中',
    subtitle: '泉州开元寺山门',
    mandatory: true,
    beats: [
      S('NPC-0107', '（亲自送至山门，神色凝重）“终南山有难，小友速归！这瓶《逍遥九花玉露丸》乃我昔年所得奇药，你带在身上，危急时可救性命！”'),
      P('（深深一拜）“前辈论道与赠药之恩，弟子永志不忘！待击退西夏强敌、守住终南山门，他日定再赴刺桐拜谒！”'),
    ],
    onFinishEffects: [openScene('scene_znq23_27', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_27: {
    id: 'scene_znq23_27',
    title: '第二十七幕 · 万里星驰返终南',
    subtitle: '闽赣北归驿道',
    mandatory: true,
    beats: [
      N('你收好黄裳亲题道偈与九花玉露丸，翻身上马日夜兼程北返。脑海中洛阳先天易数、延安边关铁血、刺桐阴阳天道三股感悟交融激荡，令你剑意愈发澄澈通明！'),
    ],
    onFinishEffects: [openScene('scene_znq23_28', ZHONGNAN_Q23_QUEST_ID)],
  },

  scene_znq23_28: {
    id: 'scene_znq23_28',
    title: '第二十八幕 · 刺桐问道功德圆',
    subtitle: '北归驿道',
    mandatory: true,
    beats: [
      N('古观三大远征至此圆满功成！速返【终南山隐宗 · 重阳古观前脉道院】，迎接执掌北斗封山、荣膺古观长老的终极试炼！'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-MED-102', qty: 1 },
      { type: 'giveSilver', amount: 320, reason: '泉州开元寺护经破邪酬谢' },
      { type: 'giveCombatExp', amount: 1600, reason: '刺桐西塔连破摩尼邪徒与江南巨寇' },
      { type: 'addSectContribution', amount: 380 },
      { type: 'modifyRenown', delta: 70, reason: '泉州开元寺护《万寿道藏》扬名东南' },
      { type: 'modifyChivalry', delta: 45, reason: '护中华道典、击退海寇邪徒' },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0107' }, delta: 15 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 8 },
      { type: 'setFlag', flag: 'zn_q23_huangshang_enlightened', value: true },
      {
        type: 'completeQuest',
        questId: ZHONGNAN_Q23_QUEST_ID,
        outcome: 'daozang_protected',
        combatExp: 650,
      },
      toast(
        '【刺桐校经 · 万寿道藏】完结！终南急报传来，请速返重阳古观迎战努儿海！',
        'success',
        '古观远征',
      ),
    ],
  },
}
