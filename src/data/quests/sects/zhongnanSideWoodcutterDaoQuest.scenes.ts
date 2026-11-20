import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_SIDE06_QUEST_ID } from './zhongnanSideWoodcutterDaoQuest'

const SPEAKER_WOODCUTTER: StorySpeakerSpec = {
  kind: 'custom',
  name: '隐世老樵夫',
  title: '太白雪崖砍柴翁',
  factionName: '秦岭隐士',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildWolfPackLeader(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNS06_WOLF_PACK',
    name: '太白雪狼王',
    title: '秦岭雪夜恶狼群首领',
    realm: '二流下品',
    factionName: '秦岭恶兽',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“嗷呜——！！”双目泛着幽绿寒光的雪狼王低伏身躯，率狼群扑向柴门！',
    stats: { hp: 920, mp: 300, agi: 48, res: 32 },
    talents: { bone: 66, comprehension: 28, charm: 10 },
    equippedArts: {
      neigong: 'MA-100',
      qinggong: 'MA-139',
      move1: 'MA-105',
      move2: 'MA-107',
    },
    learnedArts: [
      { artId: 'MA-100', level: 5 },
      { artId: 'MA-139', level: 5 },
      { artId: 'MA-105', level: 5 },
      { artId: 'MA-107', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zns06_01: {
    id: 'scene_zns06_01',
    title: '第一幕 · 飞瀑寻芝',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    illustrationUrl: '/assets/quests/zn_side06_snow_woodcutter.jpg',
    illustrationCaption: '太白积雪素裹银装，老樵夫雪松下挥刀劈柴，木屑纷飞暗合自然大道',
    mandatory: true,
    beats: [
      N('{reignYear}隆冬，太白峰连绵雪色映照终南后山，银练飞瀑半结冰凌，煞是清绝。林星雪背着竹药篓立于瀑旁雪石，正抬头辨认崖缝间的药草。'),
      S('NPC-0922', '（呼出一口白气，笑眼弯弯）“{gender:师弟|师妹}，师门丹院冬日急需几株太白雪灵芝入药。上游雪崖路滑风大，幸好有你陪我一道上来！”'),
      N('二人沿雪径上行不过半里，忽闻松林深处传来笃、笃、笃极富韵律的劈柴之声，每一声落斧竟都与飞瀑冰泉的节拍丝丝相扣！'),
    ],
    onFinishEffects: [openScene('scene_zns06_02', ZHONGNAN_SIDE06_QUEST_ID)],
  },

  scene_zns06_02: {
    id: 'scene_zns06_02',
    title: '第二幕 · 柴刀暗道',
    subtitle: '终南山隐宗 · 太白雪崖茅庐',
    mandatory: true,
    beats: [
      N('循声望去，只见一座覆满厚雪的简陋茅庐前，一位须眉皆白、身披蓑衣的老樵夫正手握一柄乌沉沉的厚背柴刀，不紧不慢地劈着枯松段。'),
      N('你定睛一看，心头猛地一震——老樵夫看似寻常一落刀，肩背腰胯却如拉满之弓浑然一体，刀锋触木刹那全无蛮力滞碍，硬如铁石的千年松节竟如豆腐般平平整整一分为二！'),
      P('（忍不住脱口赞叹）“好高明的举重若轻、返璞归真之意！老人家这一刀，分明已通武道至理！”'),
    ],
    onFinishEffects: [openScene('scene_zns06_03', ZHONGNAN_SIDE06_QUEST_ID)],
  },

  scene_zns06_03: {
    id: 'scene_zns06_03',
    title: '第三幕 · 老翁戏言',
    subtitle: '终南山隐宗 · 太白雪崖茅庐',
    mandatory: true,
    beats: [
      S(
        SPEAKER_WOODCUTTER,
        '（停刀抬头，眯眼哈哈大笑）“什么武道不武道的，老汉不过砍了六十年柴火，晓得顺着木头纹理下刀省力罢了！倒是你这小娃娃眼神不赖——你们要寻的雪灵芝，老汉檐下正好晒着两株。想换也容易，替老汉背三天柴火上崖如何？”',
      ),
      S('NPC-0922', '（惊喜低语）“老人家竟晒着现成的太白雪灵芝！而且他劈柴的架势绝非凡人，{gender:师弟|师妹}，这可是一桩难得的机缘！”'),
    ],
    onFinishEffects: [openScene('scene_zns06_04', ZHONGNAN_SIDE06_QUEST_ID)],
  },

  scene_zns06_04: {
    id: 'scene_zns06_04',
    title: '第四幕 · 踏雪背柴',
    subtitle: '终南山隐宗 · 太白雪崖茅庐',
    mandatory: true,
    beats: [
      P('（拱手欣然应诺）“晚辈愿替老人家背柴三日，顺便讨教这『顺理省力』的砍柴之道！”'),
      N('接下来的两日，你收敛内力，不用轻功，只凭肉身筋骨背负百斤松柴在积雪陡坡间往返。初时双肩酸麻、气息紊乱，直到第三日黄昏，你忽地领悟如何借腰胯之势将百斤重担化入大地，每一步踏雪皆稳若磐石！'),
    ],
    onFinishEffects: [openScene('scene_zns06_05', ZHONGNAN_SIDE06_QUEST_ID)],
  },

  scene_zns06_05: {
    id: 'scene_zns06_05',
    title: '第五幕 · 寒夜狼嚎',
    subtitle: '终南山隐宗 · 太白雪崖茅庐',
    mandatory: true,
    beats: [
      N('第三日入夜，大雪封山，凛冽北风卷着数十道凄厉狼嚎骤然逼近茅庐！十余双幽绿狼眼在雪松阴影间闪烁，一头体型硕大的太白雪狼王率领饥饿狼群扑向柴门！'),
      S('NPC-0922', '（拔剑护在老樵夫身前）“大雪封山野兽断粮，秦岭恶狼群下山觅食了！{gender:师弟|师妹}，咱们快护住老人家！”'),
    ],
    choices: [
      {
        id: 'zns06_start_wolves',
        label: '踏雪迎出柴门，以三日所悟武意击退秦岭恶狼群',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_SIDE06_QUEST_ID, stepId: 'defend_woodcutter_wolves' },
          { type: 'advanceShichen', count: 12 },
          openScene('scene_zns06_06', ZHONGNAN_SIDE06_QUEST_ID),
        ],
      },
    ],
  },

  scene_zns06_06: {
    id: 'scene_zns06_06',
    title: '第六幕 · 雪夜驱狼',
    subtitle: '终南山隐宗 · 太白雪崖茅庐',
    illustrationUrl: '/assets/quests/zn_side06_wolf_pack.jpg',
    illustrationCaption: '风雪寒夜茅庐前，终南弟子迎战双目泛绿的太白雪狼王与狼群',
    mandatory: true,
    beats: [
      N('狂风卷雪，太白雪狼王低吼一声凌空扑至，腥风扑面！你脑海中陡然闪过三日背柴、老翁落刀的极简轨迹，脚踏雪地纹丝不动，反手迎击！'),
    ],
    choices: [
      {
        id: 'zns06_fight_wolves',
        label: '迎击扑向茅庐的【太白雪狼王】与恶狼群！',
        subLabel: '对手：太白雪狼王（二流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_SIDE06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildWolfPackLeader() },
            rule: 'story_trial',
            introText: '【雪夜护庐】在太白雪崖茅庐前迎战【太白雪狼王】与秦岭恶狼群！',
            onWin: [openScene('scene_zns06_07', ZHONGNAN_SIDE06_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('雪狼王凶悍迅捷，暂退茅庐门廊重整内息后再行驱赶！', 'warn', '太白积雪'),
            ],
          },
        ],
      },
    ],
  },

  scene_zns06_07: {
    id: 'scene_zns06_07',
    title: '第七幕 · 一击惊群',
    subtitle: '终南山隐宗 · 太白雪崖茅庐',
    mandatory: true,
    beats: [
      N('你顺势发力，化繁为简，只一记举重若轻的沉稳截击便将雪狼王震飞丈余摔进雪堆！狼王见势不妙，夹起尾巴哀鸣一声，带着其余恶狼仓皇窜入幽谷深林。'),
      S(SPEAKER_WOODCUTTER, '（倚在柴门边微笑鼓掌）“哈哈哈！不愧是终南山教出来的俊杰！短短三日，竟已摸到了几分『顺理归真』的门径！”'),
    ],
    onFinishEffects: [openScene('scene_zns06_08', ZHONGNAN_SIDE06_QUEST_ID)],
  },

  scene_zns06_08: {
    id: 'scene_zns06_08',
    title: '第八幕 · 赠刀赐芝',
    subtitle: '终南山隐宗 · 太白雪崖茅庐',
    mandatory: true,
    beats: [
      N('次日雪霁初晴，老樵夫将两株品相极佳的太白雪灵芝递给林星雪，又将自己那柄磨得乌亮沉手的「樵夫劈山柴刀」解下来递到你面前。'),
      S(
        SPEAKER_WOODCUTTER,
        '“老汉年纪大了，砍不动这沉柴刀咯。这柄『樵夫劈山柴刀』虽无金玉雕饰，却陪老汉劈了三十年秦岭老松，最宜涵养质朴武意。便赠予你作个念想吧！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns06_09', ZHONGNAN_SIDE06_QUEST_ID)],
  },

  scene_zns06_09: {
    id: 'scene_zns06_09',
    title: '第九幕 · 返璞归真',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      P('（双手郑重接过沉甸甸的柴刀，向老樵夫深深三揖）“多谢前辈三日点拨与赠刀之恩！大巧不工、重剑无锋之理，晚辈铭记于心！”'),
      S('NPC-0922', '（欢喜捧着雪灵芝）“既采得极品灵芝，{gender:师弟|师妹}又得隐世高人指点，咱们这趟太白雪行真是满载而归呢！”'),
    ],
    onFinishEffects: [openScene('scene_zns06_10', ZHONGNAN_SIDE06_QUEST_ID)],
  },

  scene_zns06_10: {
    id: 'scene_zns06_10',
    title: '第十幕 · 雪霁归山',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('二人回望雪崖茅庐，只见炊烟袅袅融入万里晴空。手握这柄古朴沉重的樵夫劈山柴刀，你只觉往日武学中的诸多浮躁尽皆洗去，战意愈发凝炼厚重。'),
    ],
    choices: [
      {
        id: 'zns06_complete',
        label: '珍藏樵夫劈山柴刀，携太白雪灵芝归山',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'WPN-090', qty: 1 },
          { type: 'giveCombatExp', amount: 360, reason: '太白积雪 · 樵夫劈柴意' },
          { type: 'addSectContribution', amount: 200 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0922' }, delta: 16 },
          { type: 'modifyRenown', delta: 20, reason: '完成门派差事《太白积雪 · 樵夫劈柴意》' },
          { type: 'completeQuest', questId: ZHONGNAN_SIDE06_QUEST_ID, outcome: 'woodcutter_dao_gained' },
          toast(
            '【太白积雪 · 樵夫劈柴意】完成！获赠【樵夫劈山柴刀】与丰厚战历！',
            'success',
            '太白积雪',
          ),
        ],
      },
    ],
  },
}
