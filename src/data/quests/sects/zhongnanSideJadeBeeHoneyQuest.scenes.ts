import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_SIDE01_QUEST_ID } from './zhongnanSideJadeBeeHoneyQuest'

const SPEAKER_BEE_THIEF: StorySpeakerSpec = {
  kind: 'custom',
  name: '偷蜂药贩 · 苟三',
  title: '秦岭黑市采药贩子',
  factionName: '江湖散匪',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

function buildQinlingBear(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNS01_QINLING_BEAR',
    name: '秦岭黑熊',
    title: '馋蜜山兽',
    realm: '三流下品',
    factionName: '秦岭山兽',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“吼——！！”黑熊人立而起，巨掌带着劲风朝蜂箱扑来！',
    stats: { hp: 520, mp: 180, agi: 26, res: 24 },
    talents: { bone: 68, comprehension: 20, charm: 10 },
    equippedArts: { neigong: 'MA-180', qinggong: 'MA-197', move1: 'MA-183' },
    learnedArts: [{ artId: 'MA-180', level: 3 }, { artId: 'MA-197', level: 2 }, { artId: 'MA-183', level: 3 }],
  })
}

function buildBeeThief(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNS01_BEE_THIEF',
    name: '偷蜂药贩 · 苟三',
    title: '秦岭黑市采药贩子',
    realm: '三流中品',
    factionName: '江湖散匪',
    avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
    talk: '“嘿嘿，终南玉蜂蜂王在长安黑市能卖三百贯！小道士休要多管闲事，吃我一把迷烟砂！”',
    stats: { hp: 620, mp: 320, agi: 34, res: 26 },
    talents: { bone: 52, comprehension: 56, charm: 38 },
    equippedArts: { neigong: 'MA-181', move1: 'MA-196', move2: 'MA-189' },
    learnedArts: [{ artId: 'MA-181', level: 4 }, { artId: 'MA-196', level: 4 }, { artId: 'MA-189', level: 3 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zns01_01: {
    id: 'scene_zns01_01',
    title: '第一幕 · 幽轩花事',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    illustrationUrl: '/assets/quests/zn_side01_bee_garden.jpg',
    illustrationCaption: '山谷百花盛放，玉蜂嗡嗡绕木箱飞舞，清甜花蜜香气四溢',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，终南活死人墓外幽谷野花漫山遍野，细如白玉的终南玉蜂在竹檐花架间成群飞舞。玉蜂百花酿蜜幽轩内，马玄源正细心擦拭青瓷蜜罐，丘芷霜则忙着调配山花露水。'),
      S('NPC-0629', '（见你前来，笑呵呵招手）“{gender:师弟|师妹}来得正好！今年秦岭雨水足，玉蜂酿出的头茬百花浆格外澄澈清香，只是人手紧缺，正想找个手脚麻利的同门搭把手哩。”'),
      S('NPC-0931', '（轻拂鬓边花瓣，温婉笑道）“玉蜂性子娇贵，最怕惊扰，割蜜时须运轻柔内息护住腕脉，绝不可冒失。{gender:师弟|师妹}可愿帮我们一同酿蜜？”'),
    ],
    onFinishEffects: [openScene('scene_zns01_02', ZHONGNAN_SIDE01_QUEST_ID)],
  },

  scene_zns01_02: {
    id: 'scene_zns01_02',
    title: '第二幕 · 调露割蜜',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      P('（微笑挽袖）“同门之事义不容辞，请马师兄、丘师姐指点手法！”'),
      N('在二人指点下，你收敛周身锋锐气息，以温润柔劲缓缓托起木格蜂巢，用竹刀轻刮封蜡。晶莹剔透的玉蜂浆如琥珀般淌入青瓷瓮中，幽轩内外顿时弥漫起沁人心脾的清甜异香。'),
      S('NPC-0931', '“呀，{gender:师弟|师妹}手稳心静，连玉蜂都乖乖落在你指背上不蛰人呢！”'),
    ],
    onFinishEffects: [openScene('scene_zns01_03', ZHONGNAN_SIDE01_QUEST_ID)],
  },

  scene_zns01_03: {
    id: 'scene_zns01_03',
    title: '第三幕 · 密林异响',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      N('正值装瓮封泥之际，幽轩外灌木丛忽地剧烈摇晃，咔嚓一声折断两根碗口粗的野桑树干！紧接着一声低沉浑厚的兽吼震落满枝花瓣！'),
      S('NPC-0629', '（脸色一变，抄起竹杖）“坏了！蜜香飘太远，把后山冬眠刚醒的秦岭大黑熊引下山了！这畜生皮糙肉厚，若扑进蜂轩，一整年的玉蜂巢都要毁于一旦！”'),
    ],
    choices: [
      {
        id: 'zns01_accept',
        label: '挺身步出花圃，帮师兄师姐驱赶秦岭黑熊',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_SIDE01_QUEST_ID, stepId: 'guard_bee_pavilion' },
          openScene('scene_zns01_04', ZHONGNAN_SIDE01_QUEST_ID),
        ],
      },
    ],
  },

  scene_zns01_04: {
    id: 'scene_zns01_04',
    title: '第四幕 · 馋蜜黑熊',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      N('一头足有七尺高、胸前挂着一抹白月牙毛的秦岭黑熊大摇大摆闯入花圃，直勾勾盯着青瓷蜜瓮流着口水，巨掌猛拍篱笆！'),
      P('（横步拦在蜂箱之前，朗声喝道）“山中灵兽不可妄伤性命，我以柔劲将其震退回林便是！”'),
    ],
    choices: [
      {
        id: 'zns01_fight_bear',
        label: '上前驱赶闯圃的【秦岭黑熊】！（点到为止驱回深山）',
        subLabel: '对手：秦岭黑熊（三流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_SIDE01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQinlingBear() },
            rule: 'story_trial',
            introText: '【驱熊护蜜】挡在玉蜂蜂箱前，击退馋蜜闯圃的【秦岭黑熊】！',
            onWin: [openScene('scene_zns01_05', ZHONGNAN_SIDE01_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('黑熊力大无穷，暂且退回轩廊重整架势后再来驱赶！', 'warn', '清芬酿蜜'),
            ],
          },
        ],
      },
    ],
  },

  scene_zns01_05: {
    id: 'scene_zns01_05',
    title: '第五幕 · 熊归深林',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      N('你以终南轻功绕至黑熊侧翼，掌风连拍其厚实肩背而不伤筋骨。黑熊吃痛，又被嗡嗡扑来的十余只护巢玉蜂蛰中鼻头，顿时嗷呜怪叫一声，转身跌跌撞撞逃回秦岭深林。'),
      S('NPC-0629', '（松了口气，连声赞叹）“好俊的身手！既护住了蜂箱，又没伤那山兽性命，真合我道门慈悲之心！”'),
    ],
    onFinishEffects: [openScene('scene_zns01_06', ZHONGNAN_SIDE01_QUEST_ID)],
  },

  scene_zns01_06: {
    id: 'scene_zns01_06',
    title: '第六幕 · 暮烟鬼影',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      N('夕阳西斜，众人正收拾残枝修补篱笆，丘芷霜忽然抽了抽琼鼻，柳眉微蹙。'),
      S('NPC-0931', '“不对！你们闻闻，空气里怎有一股刺鼻的艾草硫磺混着曼陀罗的味道？玉蜂都开始焦躁乱撞了！”'),
      N('你循着烟气跃上轩顶俯瞰，只见西侧石壁阴影下，一名背着药篓、蒙着黑布的猥琐汉子正偷偷举着一根冒浓烟的竹筒，试图熏晕整巢玉蜂盗走蜂王！'),
    ],
    onFinishEffects: [openScene('scene_zns01_07', ZHONGNAN_SIDE01_QUEST_ID)],
  },

  scene_zns01_07: {
    id: 'scene_zns01_07',
    title: '第七幕 · 擒拿药贩',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    illustrationUrl: '/assets/quests/zn_side01_thief_ambush.jpg',
    illustrationCaption: '暮色幽谷中烟雾弥漫，白衣弟子飞身截住手持熏烟竹筒的偷蜂药贩',
    mandatory: true,
    beats: [
      P('（凌空跃下，一脚踢飞熏烟竹筒，冷声喝道）“好大胆的宵小！竟敢潜入终南禁谷熏烟盗蜂！”'),
      S(SPEAKER_BEE_THIEF, '（见行迹败露，恼羞成怒抽出腰间短刀）“少管闲事！老子蹲了三天三夜才摸到这玉蜂王巢，今日拼了命也要带走！”'),
    ],
    choices: [
      {
        id: 'zns01_fight_thief',
        label: '出手擒拿潜入幽谷的【偷蜂药贩 · 苟三】！',
        subLabel: '对手：偷蜂药贩 · 苟三（三流中品）',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_SIDE01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBeeThief() },
            rule: 'story_trial',
            introText: '【护圃擒贼】在玉蜂百花酿蜜幽轩截击【偷蜂药贩 · 苟三】！',
            onWin: [openScene('scene_zns01_08', ZHONGNAN_SIDE01_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('这药贩暗藏迷烟颇为狡猾！屏息调气后再行擒拿！', 'warn', '清芬酿蜜'),
            ],
          },
        ],
      },
    ],
  },

  scene_zns01_08: {
    id: 'scene_zns01_08',
    title: '第八幕 · 缴械逐山',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      N('数合之间，你便震落药贩短刀，反手点住其肩井穴。苟三扑通跪地求饶，连称自己只是长安药市的贪财散贩，再也不敢踏足终南半步。'),
      S('NPC-0629', '（没收其迷烟竹筒，沉声训诫）“念你未伤人命，暂饶你一遭！滚下山去，日后若敢再犯秦岭一草一木，定送交京兆府衙严办！”'),
    ],
    onFinishEffects: [openScene('scene_zns01_09', ZHONGNAN_SIDE01_QUEST_ID)],
  },

  scene_zns01_09: {
    id: 'scene_zns01_09',
    title: '第九幕 · 玉浆解毒',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      N('驱散毒烟后，玉蜂群渐渐平息，重归蜂箱。丘芷霜从刚封好的青瓷蜜瓮中取出两瓶上好辟毒灵药，笑盈盈递到你手中。'),
      S('NPC-0931', '“今日多亏{gender:师弟|师妹}先驱黑熊、后擒药贩，才保住今年头茬玉蜂百花蜜。这几瓶辟毒丹药乃是以玉蜂浆佐以秦岭药草精炼而成，行走江湖防身最妙！”'),
    ],
    onFinishEffects: [openScene('scene_zns01_10', ZHONGNAN_SIDE01_QUEST_ID)],
  },

  scene_zns01_10: {
    id: 'scene_zns01_10',
    title: '第十幕 · 清芬满袖',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      N('暮色渐沉，幽谷花香混着蜜香随风飘散。你辞别马玄源与丘芷霜，衣袖间犹带着一缕终南春花的清芬。'),
    ],
    choices: [
      {
        id: 'zns01_complete',
        label: '收下辟毒丹药，完成酿蜜护圃差事',
        tone: 'jade',
        effects: [
          { type: 'giveItem', itemId: 'ITM-MED-116', qty: 2 },
          { type: 'giveItem', itemId: 'ITM-MED-127', qty: 2 },
          { type: 'giveCombatExp', amount: 180, reason: '玉蜂百花 · 清芬酿蜜记' },
          { type: 'addSectContribution', amount: 160 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0629' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0931' }, delta: 12 },
          { type: 'modifyRenown', delta: 15, reason: '完成门派差事《玉蜂百花 · 清芬酿蜜记》' },
          { type: 'completeQuest', questId: ZHONGNAN_SIDE01_QUEST_ID, outcome: 'honey_saved' },
          toast(
            '【玉蜂百花 · 清芬酿蜜记】完成！获赠辟毒丹药、战历与终南门派贡献！',
            'success',
            '清芬酿蜜',
          ),
        ],
      },
    ],
  },
}
