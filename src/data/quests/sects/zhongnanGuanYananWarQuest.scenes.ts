import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q22_QUEST_ID } from './zhongnanGuanYananWarQuest'

const SPEAKER_XIXIA_VANGUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '一品堂雪夜斩首队',
  title: '西夏一品堂死士',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
}

const SPEAKER_XIXIA_COMMANDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '贺兰铁鹞死士队长',
  title: '西夏一品堂精锐',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
}

const XIXIA_VANGUARD_NPC = makeQuestNpc({
  id: 'znq22_xixia_vanguard',
  name: '一品堂雪夜斩首队',
  title: '西夏一品堂死士',
  realm: '一流下品',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  talk: '“直取宋军中军帅帐！挡路道士统统剁成肉泥！”',
  stats: { hp: 2900, mp: 1500, agi: 76, res: 65 },
  equippedArts: {
    neigong: 'MA-232',
    qinggong: 'MA-157',
    move1: 'MA-132',
    move2: 'MA-150',
  },
  learnedArts: [
    { artId: 'MA-232', level: 7 },
    { artId: 'MA-157', level: 7 },
    { artId: 'MA-132', level: 7 },
    { artId: 'MA-150', level: 7 },
  ],
})

const XIXIA_COMMANDER_NPC = makeQuestNpc({
  id: 'znq22_xixia_commander',
  name: '贺兰铁鹞死士队长',
  title: '西夏一品堂精锐',
  realm: '一流中品',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
  talk: '“漫咩大人就在营外督战，今日必烧毁宋军沙盘帅帐！”',
  stats: { hp: 3300, mp: 1750, agi: 82, res: 72 },
  equippedArts: {
    neigong: 'MA-080',
    qinggong: 'MA-098',
    move1: 'MA-072',
    move2: 'MA-132',
  },
  learnedArts: [
    { artId: 'MA-080', level: 7 },
    { artId: 'MA-098', level: 6 },
    { artId: 'MA-072', level: 6 },
    { artId: 'MA-132', level: 7 },
  ],
})

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq22_01: {
    id: 'scene_znq22_01',
    title: '第一幕 · 朔风吹雪入延州',
    subtitle: '延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台',
    illustrationUrl: '/assets/quests/zn_q22_yanan_snow_camp.jpg',
    illustrationCaption: '塞外大雪纷飞，鄜延大营旌旗猎猎，中军帅帐内炭火熊熊、沙盘陈列',
    mandatory: true,
    beats: [
      N('{reignYear}冬月，陕北黄土高原寒风如刀。你随长春子【丘处玄】策马穿行风雪数百里，终于抵达拱卫关中的铁血雄镇——延安府【鄜延边军大营】。'),
      N('踏入中军帅帐，只见炭盆烈火映照着一座宏大的西北山川沙盘。案前立着两位气度截然不同却同样威慑边塞的巨擘：一位身披玄甲、面容冷峻如铁，正是威震西夏的铜面名将【狄青】；另一位须发斑白、目光沉稳如岳，正是筑青涧城以拒元昊的边军老帅【种世衡】。'),
      S('NPC-0216', '（稽首行礼，将洛阳截获的辽夏密信双手呈上）“终南重阳古观丘处玄，携{gender:师弟|师妹}拜见狄将军、种老帅！我等在洛阳斩杀辽国南院暗桩，搜出此信，关乎延安青涧安危，不敢片刻耽搁！”'),
    ],
    onFinishEffects: [
      { type: 'startQuest', questId: ZHONGNAN_Q22_QUEST_ID, stepId: 'meet_generals' },
      { type: 'teleportPlayer', regionId: 'yanan', buildingId: 'ya_camp', spotId: 'ya_camp_main' },
      openScene('scene_znq22_02', ZHONGNAN_Q22_QUEST_ID),
    ],
  },

  scene_znq22_02: {
    id: 'scene_znq22_02',
    title: '第二幕 · 铜面老帅阅密笺',
    subtitle: '鄜延边军大营 · 中军帅帐 · 沙盘台',
    mandatory: true,
    beats: [
      S('NPC-0031', '（展开密信扫视数行，剑眉陡立，冷哼一声）“好一个辽夏狼狈为奸！西夏虽已议和称臣，可没藏讹庞那厮贼心不死，竟暗遣监军漫咩联合一品堂死士，欲趁冬月大雪突袭青涧粮道与我中军帅帐！”'),
      S('NPC-0033', '（轻抚沙盘上延水与青涧城的木标，长叹一声）“昔年范公仲淹经略西事，命老夫修筑青涧城，方才锁住西夏南下咽喉。如今西夏人忌惮我边军阵战，竟想用江湖死士行斩首暗算之计！”'),
      P('“二位将军放心！重阳古观既蒙大宋水土滋养，值此边患之际，愿以手中长剑助边军斩灭西夏一品堂死士！”'),
    ],
    onFinishEffects: [openScene('scene_znq22_03', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_03: {
    id: 'scene_znq22_03',
    title: '第三幕 · 论道边关显胸襟',
    subtitle: '鄜延边军大营 · 中军帅帐 · 沙盘台',
    mandatory: true,
    beats: [
      S('NPC-0031', '（目光如电落于你身，微一颔首）“终南重阳古观素有侠名，今日一见果然名不虚传。{ifFlagEq:zn_guan_style=militant|看你眉宇间锐气逼人、剑意如霜，倒颇有我西北行伍斩将夺旗之风！|看你气度雍容、进退有据，既有道门清韵，又藏济世定力，实属难得！}”'),
      S('NPC-0216', '“狄将军过奖了。{ifFlagEq:zn_guan_style=militant|我这{gender:师弟|师妹}素来主张以杀止杀、剑荡妖氛，此番边关御敌正合其志！|我这{gender:师弟|师妹}行事素来谋定而后动、以柔济刚，最擅看破敌酋虚实！}不知军中眼下有何布置？”'),
    ],
    onFinishEffects: [openScene('scene_znq22_04', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_04: {
    id: 'scene_znq22_04',
    title: '第四幕 · 沙盘推演定奇谋',
    subtitle: '鄜延边军大营 · 中军帅帐 · 沙盘台',
    mandatory: true,
    beats: [
      S('NPC-0033', '“一品堂死士武功高强，寻常军卒结阵难以阻其轻功突进。犬子种谔素通奇谋，眼下正在城东【嘉岭山宝塔】高处观测风雪与西夏游骑动向。”'),
      S('NPC-0031', '“二位道长请持我军令，速赴嘉岭山宝塔与种谔会合，商定今夜诱敌入瓮之策！今夜大雪愈急，漫咩那老狐狸八成会挑今晚动手！”'),
    ],
    onFinishEffects: [openScene('scene_znq22_05', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_05: {
    id: 'scene_znq22_05',
    title: '第五幕 · 领命雪夜出辕门',
    subtitle: '鄜延边军大营',
    mandatory: true,
    beats: [
      N('领过狄青亲授的玄铁腰牌，你与丘处玄步出帅帐。大营之外号角低沉，披甲士卒踏雪巡逻，铁甲上覆满寒霜，一片肃杀悲壮气象。'),
      S('NPC-0216', '“{gender:师弟|师妹}，边关将士抛家舍业守此苦寒之地，我等学武之人若不能替他们分忧，空谈什么玄门大道！走，去嘉岭山宝塔见种谔将军！”'),
    ],
    choices: [
      {
        id: 'znq22_ch_go_pagoda',
        label: '即刻冒雪前往【嘉岭山宝塔 · 宝塔底层 · 舍利地宫】会合种谔',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q22_QUEST_ID, 'pagoda_plan'),
          { type: 'teleportPlayer', regionId: 'yanan', buildingId: 'ya_pagoda', spotId: 'ya_pagoda_main' },
          { type: 'setFlag', flag: 'znq22_pagoda_triggered', value: true },
          openScene('scene_znq22_09', ZHONGNAN_Q22_QUEST_ID),
        ],
      },
      {
        id: 'znq22_ch_walk_pagoda',
        label: '先于延安府休整片刻，随后自行前往嘉岭山宝塔',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q22_QUEST_ID, 'pagoda_plan'),
          openScene('scene_znq22_06', ZHONGNAN_Q22_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq22_06: {
    id: 'scene_znq22_06',
    title: '第六幕 · 延水冰桥听风声',
    subtitle: '延安府街市',
    mandatory: true,
    beats: [
      S('NPC-0216', '“我在【嘉岭山宝塔 · 宝塔底层 · 舍利地宫】先与种谔将军碰头，{gender:师弟|师妹}备好丹药便速来！”'),
    ],
  },

  scene_znq22_07: {
    id: 'scene_znq22_07',
    title: '第七幕 · 残雪古道辨胡踪',
    subtitle: '嘉岭山麓',
    mandatory: true,
    beats: [
      N('通往嘉岭山的石阶已被积雪覆盖，半山枯松下隐约可见几枚被雪半掩的西夏皮靴印，显然已有敌方探马潜至延安近郊。'),
    ],
    onFinishEffects: [openScene('scene_znq22_08', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_08: {
    id: 'scene_znq22_08',
    title: '第八幕 · 宝塔地宫烛影摇',
    subtitle: '嘉岭山宝塔 · 宝塔底层 · 舍利地宫',
    mandatory: true,
    beats: [
      N('推开厚重石门，嘉岭山宝塔底层地宫内一盏防风军灯静静燃烧，一名英气勃发、身披轻甲的青年将领正俯身标注延水地形图。'),
    ],
    onFinishEffects: [openScene('scene_znq22_09', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_09: {
    id: 'scene_znq22_09',
    title: '第九幕 · 嘉岭密会少将种谔',
    subtitle: '延安府 · 嘉岭山宝塔 · 宝塔底层 · 舍利地宫',
    illustrationUrl: '/assets/quests/zn_q22_jialing_pagoda_plan.jpg',
    illustrationCaption: '嘉岭宝塔地宫灯火摇曳，少将种谔指点边关舆图，与丘处玄共定风雪伏击之策',
    mandatory: true,
    beats: [
      S('NPC-0034', '（见你与丘处玄亮出狄青玄铁腰牌，抱拳朗笑）“原来是终南重阳古观的高道！家父与狄帅方才已飞鸽传书，言二位身手了得，今夜破袭正需江湖绝顶好手相助！”'),
      S('NPC-0216', '“种小将军客气。不知西夏人马眼下潜伏在何处？”'),
      S('NPC-0034', '（手指地图北侧冰河）“我方才登塔远眺，见延水上游芦苇荡隐有雪雾翻腾——约莫三十余名一品堂死士正借大雪掩护，准备子时涉冰偷袭中军帅帐！”'),
    ],
    onFinishEffects: [openScene('scene_znq22_10', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_10: {
    id: 'scene_znq22_10',
    title: '第十幕 · 请君入瓮论虚实',
    subtitle: '嘉岭山宝塔 · 宝塔底层 · 舍利地宫',
    mandatory: true,
    beats: [
      S('NPC-0034', '“若我军大张旗鼓加强岗哨，漫咩必会缩回贺兰山，他日卷土重来更难防备。我的打算是——中军帅帐外故意示弱，撤走半数强弩，放一品堂死士闯入营门，再由二位道长在帅帐前死死咬住敌酋，待我率伏兵合围全歼！”'),
      S('NPC-0034', '（目光炯炯望向你）“不过如此一来，帅帐门前头阵压力极重，不知{gender:少侠|女侠}觉得该如何布防最妥？”'),
    ],
    choices: [
      {
        id: 'znq22_ch_plan_strike',
        label: '“兵贵神速！待敌半渡帅帐前坪，便以雷霆剑势先斩其领队，令群贼自乱！”',
        tone: 'danger',
        effects: [
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0034' }, delta: 8 },
          openScene('scene_znq22_11', ZHONGNAN_Q22_QUEST_ID),
        ],
      },
      {
        id: 'znq22_ch_plan_formation',
        label: '“以重阳北斗阵势配合军中长枪拒马，先困其锋芒，再请小将军从两翼收网！”',
        tone: 'jade',
        effects: [
          { type: 'modifySkill', key: '骑术', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0034' }, delta: 8 },
          openScene('scene_znq22_11', ZHONGNAN_Q22_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq22_11: {
    id: 'scene_znq22_11',
    title: '第十一幕 · 少将抚掌赞知兵',
    subtitle: '嘉岭山宝塔 · 宝塔底层 · 舍利地宫',
    mandatory: true,
    beats: [
      S('NPC-0034', '（抚掌大笑）“好计策！没想到终南道门中人不仅剑法卓绝，论起行军布阵竟也如此通透！便依此计行事——我率三百铁骑埋伏营后雪坡，听帅帐响箭为号即刻合围！”'),
      S('NPC-0216', '“善！那我与{gender:师弟|师妹}即刻赶回中军帅帐，陪狄帅与种老帅唱好这出空城请君戏！”'),
    ],
    onFinishEffects: [openScene('scene_znq22_12', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_12: {
    id: 'scene_znq22_12',
    title: '第十二幕 · 踏雪疾归鄜延营',
    subtitle: '嘉岭山宝塔外',
    mandatory: true,
    beats: [
      N('天色彻底暗沉下来，鹅毛大雪借着西北烈风呼啸扑面。远处鄜延大营灯火稀疏，恰似一张静候猛兽自投罗网的巨网。'),
    ],
    choices: [
      {
        id: 'znq22_ch_return_camp',
        label: '疾驰返回【鄜延边军大营 · 中军帅帐】，迎战风雪夜袭！',
        tone: 'danger',
        effects: [
          setStep(ZHONGNAN_Q22_QUEST_ID, 'defend_camp'),
          { type: 'teleportPlayer', regionId: 'yanan', buildingId: 'ya_camp', spotId: 'ya_camp_main' },
          { type: 'setFlag', flag: 'znq22_defend_triggered', value: true },
          openScene('scene_znq22_15', ZHONGNAN_Q22_QUEST_ID),
        ],
      },
      {
        id: 'znq22_ch_prep_camp',
        label: '先整备丹药兵刃，稍后自行返回中军帅帐',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q22_QUEST_ID, 'defend_camp'),
          openScene('scene_znq22_13', ZHONGNAN_Q22_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq22_13: {
    id: 'scene_znq22_13',
    title: '第十三幕 · 雪夜磨剑待敌来',
    subtitle: '延安府',
    mandatory: true,
    beats: [
      S('NPC-0216', '“子时将近，我先入【鄜延边军大营 · 中军帅帐】布阵，{gender:师弟|师妹}整顿完毕后切莫误了时辰！”'),
    ],
  },

  scene_znq22_14: {
    id: 'scene_znq22_14',
    title: '第十四幕 · 帅帐灯明暗藏锋',
    subtitle: '鄜延边军大营 · 中军帅帐 · 沙盘台',
    mandatory: true,
    beats: [
      N('子时三刻，大营万籁俱寂，唯有风雪拍打帐篷的簌簌声响。你与丘处玄静立帅帐两侧阴影中，长剑微鸣，蓄势待发。'),
    ],
    onFinishEffects: [openScene('scene_znq22_15', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_15: {
    id: 'scene_znq22_15',
    title: '第十五幕 · 寒夜惊雷破营门',
    subtitle: '延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台',
    illustrationUrl: '/assets/quests/zn_q22_blizzard_tent_defense.jpg',
    illustrationCaption: '暴雪漫天，西夏一品堂死士挥舞弯刀扑向帅帐，终南双剑寒光如练死守辕门',
    mandatory: true,
    beats: [
      N('“咻——啪！”数枚涂黑的铁蒺藜骤然破雪而来，击灭了帅帐外两盏风灯！紧接着十余道身披白裘的幽灵般身影翻越拒马，弯刀映着雪光直劈帅帐门帘！'),
      S(SPEAKER_XIXIA_VANGUARD, '“冲进帅帐！取狄青、种世衡首级者，国相赏黄金千两！”'),
      S('NPC-0216', '（长啸一声，道剑出鞘化作七点寒星）“西夏贼子，早已恭候多时！{gender:师弟|师妹}，放响箭通知种小将军，先斩了这批打头阵的死士！”'),
    ],
    choices: [
      {
        id: 'znq22_ch_battle_wave1',
        label: '拉响鸣镝、挺剑迎战西夏一品堂雪夜斩首队！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q22_QUEST_ID,
            opponent: { kind: 'custom', npc: XIXIA_VANGUARD_NPC },
            rule: 'duel',
            lethalOnLose: false,
            introText: '暴雪纷飞，西夏一品堂斩首死士悍然扑向中军帅帐！',
            onWin: [openScene('scene_znq22_16', ZHONGNAN_Q22_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('一品堂死士攻势惨烈，幸得丘处玄剑护右翼，重振旗鼓再战！', 'warn', '风雪护帐'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq22_16: {
    id: 'scene_znq22_16',
    title: '第十六幕 · 铁血雪坪斩前锋',
    subtitle: '鄜延边军大营 · 中军帅帐 · 沙盘台',
    mandatory: true,
    beats: [
      N('凄厉的响箭冲破暴雪直上云霄！你一剑挑飞两名斩首死士手中弯刀，顺势震断其兵刃，鲜血瞬间染红帅帐前大片白雪。'),
      N('然而雪雾深处号角再起，一队身披玄铁轻甲的精锐死士踏血狂冲而来，气势远比方才前锋更为凶悍！'),
    ],
    onFinishEffects: [openScene('scene_znq22_17', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_17: {
    id: 'scene_znq22_17',
    title: '第十七幕 · 铁鹞死士再扑帐',
    subtitle: '鄜延边军大营 · 中军帅帐 · 沙盘台',
    mandatory: true,
    beats: [
      S(SPEAKER_XIXIA_COMMANDER, '（挥舞厚背血刀，狞笑冲阵）“宋军果然有伏兵！但只要在伏兵合围前焚毁帅帐、格杀主帅，大宋鄜延路便群龙无首！给我踏平这两个道士！”'),
      S('NPC-0031', '（亲执长枪大步踏出帅帐，铜面在火光下寒光凛凛）“宵小安敢犯我帅帐！丘道长护住种老帅，我与这位终南小友并肩迎敌！”'),
    ],
    choices: [
      {
        id: 'znq22_ch_battle_wave2',
        label: '与狄青并肩死战，迎击贺兰铁鹞死士队长！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q22_QUEST_ID,
            opponent: { kind: 'custom', npc: XIXIA_COMMANDER_NPC },
            rule: 'duel',
            lethalOnLose: false,
            introText: '火光映雪，贺兰铁鹞死士队长挥舞血刀狂扑而来！',
            onWin: [openScene('scene_znq22_18', ZHONGNAN_Q22_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 65, mpPct: 65 },
              toast('铁鹞死士队长刀法沉猛，借狄青枪势掩护调息再战！', 'warn', '风雪护帐'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq22_18: {
    id: 'scene_znq22_18',
    title: '第十八幕 · 西夏监军亲督战',
    subtitle: '鄜延边军大营 · 中军帅帐 · 沙盘台',
    mandatory: true,
    beats: [
      N('你以先天易数剑步闪过血刀劈砍，一剑贯入铁鹞死士队长护心镜隙，将其挑翻雪地！'),
      N('就在此时，大营北口雪雾骤裂，一匹通体漆黑的西夏骏马踏雪冲至，马背上身披金狼貂裘的监军统帅【漫咩】冷眼望见局势不妙，竟亲自拔出西夏宝刀扑来，企图强行撕开缺口接应残部！'),
      S('NPC-0085', '“废物！连两个终南道士都拿不下！待本帅亲自劈了你这阻路小辈，再接应儿郎突围！”'),
    ],
    choices: [
      {
        id: 'znq22_ch_battle_manmie',
        label: '寸步不退，正面迎击西夏监军统帅漫咩！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q22_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0085' },
            rule: 'duel',
            lethalOnLose: false,
            introText: '西夏监军统帅漫咩亲自冲阵，势要撕开帅帐防线！',
            onWin: [openScene('scene_znq22_19', ZHONGNAN_Q22_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 70, mpPct: 70 },
              toast('漫咩久经沙场、刀势狠辣，稳住心神再以重阳剑法破之！', 'warn', '雪夜斩酋'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq22_19: {
    id: 'scene_znq22_19',
    title: '第十九幕 · 铁骑合围溃胡骑',
    subtitle: '鄜延边军大营',
    mandatory: true,
    beats: [
      N('你剑走清刚，硬生生逼得漫咩连退七步、左臂衣甲被剑气划破！恰在此时，营后雪坡骤然响起震天马蹄与喊杀之声——种谔率三百鄜延精骑如神兵天降，火把连成火龙截断了西夏人的归路！'),
      S('NPC-0085', '（脸色惨白，勒转马头嘶声高呼）“中了宋军诡计！撤！全军撤回延水北岸！”'),
      N('漫咩在亲兵拼死掩护下狼狈冲出缺口，丢盔弃甲向北狂逃；留下的西夏一品堂死士在宋军强弩与剑阵夹击下，尽数伏诛雪地！'),
    ],
    onFinishEffects: [openScene('scene_znq22_20', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_20: {
    id: 'scene_znq22_20',
    title: '第二十幕 · 青涧铁血见晨曦',
    subtitle: '鄜延边军大营 · 中军帅帐 · 沙盘台',
    illustrationUrl: '/assets/quests/zn_q22_qingjian_blood_dawn.jpg',
    illustrationCaption: '雪霁天明，延水东岸朝霞映红残雪，狄青与种氏父子向终南双剑举酒致敬',
    mandatory: true,
    beats: [
      N('待战火平息，东方天际已泛起一抹血色鱼肚白。大雪初霁，营中宋军将士清点战果，欢呼声震动延水两岸。'),
      S('NPC-0033', '（拄杖步出帅帐，望着满地西夏弯刀与巍然不动的帅旗，老泪纵横）“青涧铁血未冷，大宋江湖亦多义士！今日若非终南古观万里传信、舍身护帐，延安军心恐遭重创！”'),
    ],
    onFinishEffects: [openScene('scene_znq22_21', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_21: {
    id: 'scene_znq22_21',
    title: '第二十一幕 · 铜面敬酒重侠骨',
    subtitle: '鄜延边军大营 · 中军帅帐 · 沙盘台',
    mandatory: true,
    beats: [
      S('NPC-0031', '（亲手捧起两碗滚烫塞北烈酒，递与你与丘处玄）“狄某出身行伍，不擅文辞。今日借这碗烈酒，敬终南重阳古观的侠肝义胆！”'),
      S('NPC-0034', '（抹去脸上血渍，朗声大笑）“{gender:少侠|女侠}剑法与谋略皆乃一绝！他日若再来西北，种某定当扫榻相迎，共饮十坛边关老酒！”'),
      P('（接过热酒一饮而尽）“保境安民乃侠者本分！愿各位将军旗开得胜，永镇西北边陲！”'),
    ],
    onFinishEffects: [openScene('scene_znq22_22', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_22: {
    id: 'scene_znq22_22',
    title: '第二十二幕 · 军营飞鸽传南诏',
    subtitle: '鄜延边军大营',
    mandatory: true,
    beats: [
      N('正午时分，一只来自终南重阳古观的雪羽信鸽穿过晴空，稳稳落于丘处玄肩头。丘处玄解开竹筒读罢师尊王重楼亲笔密信，神色陡然郑重起来。'),
      S('NPC-0216', '“{gender:师弟|师妹}，师尊传谕：延安边患既暂得缓解，你切莫久留西北，须即刻孤身南下闽海泉州府！”'),
      P('“泉州府？千里迢迢南下刺桐港，可是师尊有何要事相托？”'),
    ],
    onFinishEffects: [openScene('scene_znq22_23', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_23: {
    id: 'scene_znq22_23',
    title: '第二十三幕 · 师尊密谕指刺桐',
    subtitle: '鄜延边军大营',
    mandatory: true,
    beats: [
      S('NPC-0216', '“师尊信中言道：大宋朝廷昔年奉旨校刻《万寿道藏》的隐世高人【黄裳】前辈，眼下正隐居泉州开元寺修校道经。此番江湖邪派与海外摩尼教妖人频频窥伺道藏秘卷，师尊命你南下相助黄裳前辈护经校刻，并借机参悟道家阴阳互济的至高天道！”'),
      P('“校刻《万寿道藏》、面谒黄裳前辈！弟子定不负师尊厚望！”'),
    ],
    onFinishEffects: [openScene('scene_znq22_24', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_24: {
    id: 'scene_znq22_24',
    title: '第二十四幕 · 辞别边塞三名将',
    subtitle: '延安府南门驿道',
    mandatory: true,
    beats: [
      N('午后，丘处玄决定暂留鄜延协助边军整肃暗哨，而你则整装辞别狄青与种氏父子。种世衡特赠军中秘制续命丹丸与边塞盘缠，狄青亦亲送十里长亭之外。'),
      S('NPC-0031', '“一路珍重！大宋江山，有朝堂兵甲，亦不可少尔等江湖剑胆！”'),
    ],
    onFinishEffects: [openScene('scene_znq22_25', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_25: {
    id: 'scene_znq22_25',
    title: '第二十五幕 · 剑气未冷向东南',
    subtitle: '陕北官道',
    mandatory: true,
    beats: [
      N('回望风雪苍茫的嘉岭山宝塔与鄜延大营，你心中豪气干云。经此延水铁血一夜，你对重阳古观“济世安民”四字的体悟已远非昔日可比。'),
    ],
    onFinishEffects: [openScene('scene_znq22_26', ZHONGNAN_Q22_QUEST_ID)],
  },

  scene_znq22_26: {
    id: 'scene_znq22_26',
    title: '第二十六幕 · 延水悲歌留侠名',
    subtitle: '陕北官道',
    mandatory: true,
    beats: [
      N('策马南下，关山万里。下一站——闽海刺桐古港，泉州开元寺东西双塔！'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-MED-106', qty: 1 },
      { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
      { type: 'giveSilver', amount: 280, reason: '鄜延大营护帐击退西夏军赏' },
      { type: 'giveCombatExp', amount: 1400, reason: '风雪夜守帅帐连破一品堂与漫咩' },
      { type: 'addSectContribution', amount: 340 },
      { type: 'modifyRenown', delta: 65, reason: '延安鄜延大营血战退敌扬名西北' },
      { type: 'modifyChivalry', delta: 45, reason: '舍身护边军帅帐、保青涧安宁' },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0216' }, delta: 10 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0031' }, delta: 12 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0033' }, delta: 10 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0034' }, delta: 10 },
      { type: 'setFlag', flag: 'zn_q22_yanan_saved', value: true },
      {
        type: 'completeQuest',
        questId: ZHONGNAN_Q22_QUEST_ID,
        outcome: 'yanan_victory',
        combatExp: 600,
      },
      toast(
        '【延水悲歌 · 青涧铁血】完结！请即刻南下泉州开元寺，助黄裳校刻《万寿道藏》！',
        'success',
        '古观远征',
      ),
    ],
  },
}
