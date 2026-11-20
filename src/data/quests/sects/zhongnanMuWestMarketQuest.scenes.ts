import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q13_QUEST_ID } from './zhongnanMuWestMarketQuest'

const SPEAKER_YIPINTANG_GUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '李元煞',
  title: '西夏一品堂 · 货栈暗哨',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_RED_BADGE_BOSS: StorySpeakerSpec = {
  kind: 'custom',
  name: '嵬名赤骨',
  title: '西夏一品堂 · 西市红牌头目',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildYipintangGuardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ13_GUARD',
    name: '李元煞',
    title: '西夏一品堂 · 西市暗哨',
    realm: '二流中品',
    factionName: '西夏一品堂',
    sectRank: 2,
    sectRankLabel: '暗哨',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“什么人夜闯胡商私栈？吃我一掌！”',
    stats: { hp: 1420, mp: 1180, agi: 50, res: 34 },
    talents: { bone: 64, comprehension: 60, charm: 50 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-244', move2: 'MA-186' },
    learnedArts: [{ artId: 'MA-243', level: 5 }, { artId: 'MA-244', level: 6 }, { artId: 'MA-186', level: 6 }],
  })
}

function buildRedBadgeBossNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ13_RED_BOSS',
    name: '嵬名赤骨',
    title: '西夏一品堂 · 西市红牌头目',
    realm: '二流上品',
    factionName: '西夏一品堂',
    sectRank: 2,
    sectRankLabel: '红牌头目',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“古墓的小鬼竟敢孤身摸进本座的红牌据点！今夜便叫你化作西市枯骨！”',
    stats: { hp: 1860, mp: 1580, agi: 55, res: 40 },
    talents: { bone: 70, comprehension: 66, charm: 52 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-244', move2: 'MA-145' },
    learnedArts: [{ artId: 'MA-243', level: 6 }, { artId: 'MA-244', level: 7 }, { artId: 'MA-145', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq13_01: {
    id: 'scene_znq13_01',
    title: '第一幕 · 寒玉密令',
    subtitle: '终南山隐宗 · 昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('{reignYear}夏初，冰魄石室内寒气氤氲。林朝瑶端坐昆仑寒玉床畔，指尖夹着一只翼下系有细绢的玉蜂。'),
      S('NPC-0114', '“清霜自长安传回密信：先前重金悬赏终南玉蜂的西夏红牌头目，已在长安西市胡商坊设下暗栈，近日频频与南疆毒师接头。”'),
      P('“师父，白师姐孤身在长安打探，恐有闪失，弟子愿即刻下山接应！”'),
    ],
    onFinishEffects: [openScene('scene_znq13_02', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_02: {
    id: 'scene_znq13_02',
    title: '第二幕 · 霜佩为凭',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '（抛来一枚雕刻玉蜂纹的素白羊脂玉佩）“清霜性子虽冷，轻功却是同辈翘楚。你持此玉佩往长安西市东坊茶肆寻她，一切行动听她筹划，切记不可暴露古墓底细。”'),
      P('“弟子谨记！定与白师姐联手拔除西夏暗桩！”'),
    ],
    onFinishEffects: [openScene('scene_znq13_03', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_03: {
    id: 'scene_znq13_03',
    title: '第三幕 · 北出秦岭',
    subtitle: '终南古道',
    mandatory: true,
    beats: [
      N('你换上一袭寻常青衫，掩去古墓装束，快步北出终南峪口，不消半日便望见雄伟古都长安的城垣与熙攘西市。'),
    ],
    choices: [
      {
        id: 'znq13_depart_changan',
        label: '携玉蜂信物前往【长安府 · 西市胡商坊（东市）】接应白清霜',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q13_QUEST_ID, stepId: 'meet_bai_qingshuang' },
          setStep(ZHONGNAN_Q13_QUEST_ID, 'meet_bai_qingshuang'),
          toast('请前往【长安府 · 西市胡商坊（东市）】接应师姐白清霜！', 'talk', '西市飞霜'),
        ],
      },
    ],
  },

  scene_znq13_04: {
    id: 'scene_znq13_04',
    title: '第四幕 · 西市胡风',
    subtitle: '长安府 · 西市胡商坊（东市）',
    illustrationUrl: '/assets/quests/zn_q13_xishi_east.jpg',
    illustrationCaption: '西市飞霜 · 胡商驼铃声中与白清霜暗室接头',
    mandatory: true,
    beats: [
      N('长安西市驼铃叮当，胡姬酒肆与香料货栈鳞次栉比。你依密信暗记拐入东坊一间幽静香料阁后院，只见一名白衣覆纱的清冷女子正凭栏品茗，正是「寒谷飞霜」白清霜。'),
      S('NPC-0215', '（目光一扫你腰间玉佩，唇角微扬）“师父派你来接应我？不错，步履轻盈了许多，看来清秋师妹没少在捕雀厅折腾你。”'),
      P('“见过白师姐！师父命弟子前来听候差遣，不知那西夏红牌头目如今藏身何处？”'),
    ],
    onFinishEffects: [openScene('scene_znq13_05', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_05: {
    id: 'scene_znq13_05',
    title: '第五幕 · 红牌暗栈',
    subtitle: '西市胡商坊东市密室',
    mandatory: true,
    beats: [
      S('NPC-0215', '（铺开一张手绘西市巷道图）“西坊尽头那座『驼铃皮货栈』便是西夏一品堂的暗桩。坐镇其间的红牌头目名叫嵬名赤骨，近日正密谋收买毒瘴药粉，意图趁夏汛污染我终南寒玉涧水源！”'),
      P('“好阴毒的计策！若被他们得逞，后山玉蜂与古墓清泉岂不遭殃？”'),
    ],
    onFinishEffects: [openScene('scene_znq13_06', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_06: {
    id: 'scene_znq13_06',
    title: '第六幕 · 瓦上机关',
    subtitle: '西市胡商坊东市密室',
    mandatory: true,
    beats: [
      S('NPC-0215', '“皮货栈外院遍布响铃细丝与西夏暗哨，寻常轻功踏上屋瓦便会惊动全场。我需在外围截杀可能逃窜的信鸽与援兵，夜潜主院斩杀嵬名赤骨的重任，须由你担下。”'),
      S('NPC-0215', '“离入夜还有两个时辰。趁天色未暗，我把古墓高阶轻功《踏雪无痕》的心诀传你——你既有《金雁功》底子，必能融会贯通！”'),
    ],
    onFinishEffects: [openScene('scene_znq13_07', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_07: {
    id: 'scene_znq13_07',
    title: '第七幕 · 踏雪心诀',
    subtitle: '西市东坊小院',
    illustrationUrl: '/assets/quests/zn_q13_snow_step.jpg',
    illustrationCaption: '踏雪无痕 · 白清霜于暮色细沙庭院亲授古墓绝顶轻功',
    mandatory: true,
    beats: [
      N('白清霜引你来到后院细沙坪，足尖轻点，整个人宛若一片无重飞霜掠过沙面三丈，落地回眸时，洁净沙面上竟连半寸脚印也未留下！'),
      S('NPC-0215', '“《金雁功》重在空中折转，而《踏雪无痕》贵在『提气留三分，落足化虚无』。发力前先收足心涌泉真气，脚掌触物即离，瓦不鸣、雪不陷！”'),
    ],
    onFinishEffects: [openScene('scene_znq13_08', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_08: {
    id: 'scene_znq13_08',
    title: '第八幕 · 沙面无迹',
    subtitle: '西市东坊小院',
    mandatory: true,
    beats: [
      N('你屏息凝神，按白清霜所授运气法门反复试跃。起初尚在沙面留下浅痕，待十余次调匀丹田气息后，身形倏然一轻，竟如游魂飘絮般掠过整片沙坪，纤尘不惊！'),
      S('NPC-0215', '（抚掌微哂）“好灵性！如此身法，莫说西市瓦楞，便是踩过响铃铁丝亦能悄无声息。”'),
    ],
    onFinishEffects: [openScene('scene_znq13_09', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_09: {
    id: 'scene_znq13_09',
    title: '第九幕 · 暮鼓催夜',
    subtitle: '西市东坊',
    mandatory: true,
    beats: [
      N('长安城暮鼓咚咚敲响，坊市铁门渐闭，万家灯火渐次稀疏。白清霜递给你一袭夜行墨衣与一瓶化尸防毒清露。'),
      S('NPC-0215', '“子时将至，我这就去西坊外墙高楼替你压阵。得手后切记搜出他怀里的西夏密档，速来东坊会合！”'),
    ],
    onFinishEffects: [openScene('scene_znq13_10', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_10: {
    id: 'scene_znq13_10',
    title: '第十幕 · 飞霜入夜',
    subtitle: '西市胡商坊东市',
    mandatory: true,
    beats: [
      N('你换上夜行衣，运起初成的《踏雪无痕》，如一缕青烟没入长安沉沉夜色之中，直扑西市西坊！'),
    ],
    choices: [
      {
        id: 'znq13_go_xishi_west',
        label: '习得《踏雪无痕》，夜潜【长安府 · 西市胡商坊（西市）】暗栈',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-098', level: 1, autoEquip: true },
          setStep(ZHONGNAN_Q13_QUEST_ID, 'raid_xishi_west'),
          toast('已习得地阶轻功《踏雪无痕》！请前往【长安府 · 西市胡商坊（西市）】斩杀红牌头目！', 'success', '西市飞霜'),
        ],
      },
    ],
  },

  scene_znq13_11: {
    id: 'scene_znq13_11',
    title: '第十一幕 · 暗栈惊铃',
    subtitle: '长安府 · 西市胡商坊（西市）',
    illustrationUrl: '/assets/quests/zn_q13_xishi_raid.jpg',
    illustrationCaption: '夜潜西市 · 踏雪无痕飞掠皮货暗栈斩杀一品堂头目',
    mandatory: true,
    beats: [
      N('你足尖轻点青瓦，越过三道拉满铜铃细丝的墙头，落入驼铃皮货栈内院。正房窗纸透出幽幽烛光，隐约传来西夏语的低沉交谈声。'),
      N('刚潜至廊柱暗影下，一名巡夜暗哨忽然嗅到风声异样，厉喝一声反手拔刀：“谁在那里！”'),
    ],
    onFinishEffects: [openScene('scene_znq13_12', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_12: {
    id: 'scene_znq13_12',
    title: '第十二幕 · 先拔暗哨',
    subtitle: '西市胡商坊西市皮货栈',
    mandatory: true,
    beats: [
      S(SPEAKER_YIPINTANG_GUARD, '“有刺客夜闯！休想惊动嵬名大人，纳命来！”'),
      P('“既已被察觉，那便速战速决！”'),
    ],
    choices: [
      {
        id: 'znq13_fight_guard',
        label: '疾掠出手，速斩一品堂暗哨李元煞',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q13_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYipintangGuardNpc() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '已入敌营深处，不可放暗哨鸣锣示警！',
            introText: '暗院寒光一闪，你迎战一品堂巡夜暗哨李元煞！',
            onWin: [openScene('scene_znq13_13', ZHONGNAN_Q13_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('暗哨攻势凌厉，你借踏雪无痕跃上屋檐暂避锋芒，调息后再战！', 'warn', '西市飞霜'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq13_13: {
    id: 'scene_znq13_13',
    title: '第十三幕 · 红牌现身',
    subtitle: '西市皮货栈正堂',
    mandatory: true,
    beats: [
      N('你干净利落放倒暗哨，正欲推门，两扇雕花木门却轰然炸裂！一名披着猩红大氅、胸悬赤铜红牌的壮汉踏木屑而出，掌心萦绕阴冷黑气，正是西夏一品堂红牌头目嵬名赤骨！'),
      S(SPEAKER_RED_BADGE_BOSS, '“好俊的轻功！听方才的落地声，你是终南活死人墓的小鬼？天堂有路你不走，今夜正好拿你的头颅去向贺兰血鹰大人邀功！”'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      openScene('scene_znq13_14', ZHONGNAN_Q13_QUEST_ID),
    ],
  },

  scene_znq13_14: {
    id: 'scene_znq13_14',
    title: '第十四幕 · 斩杀红牌',
    subtitle: '西市皮货栈正堂',
    mandatory: true,
    beats: [
      P('“嵬名赤骨，你暗谋毒害终南寒玉涧，罪不容诛！今日便取你项上人头！”'),
    ],
    choices: [
      {
        id: 'znq13_fight_red_boss',
        label: '运起《踏雪无痕》游斗，斩杀一品堂红牌头目嵬名赤骨',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q13_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRedBadgeBossNpc() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '红牌头目已见你真面目，唯将其斩杀方能保全古墓！',
            introText: '烛影摇红，你以踏雪无痕步法穿梭掌风，死战西夏一品堂红牌头目嵬名赤骨！',
            onWin: [openScene('scene_znq13_15', ZHONGNAN_Q13_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('嵬名赤骨黑水寒风掌颇为沉猛，你跃出院墙重整内息后再行突袭！', 'warn', '西市飞霜'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq13_15: {
    id: 'scene_znq13_15',
    title: '第十五幕 · 霜锋毙敌',
    subtitle: '西市皮货栈正堂',
    mandatory: true,
    beats: [
      N('你借《踏雪无痕》陡然折身绕至嵬名赤骨死角，一剑穿心而过！嵬名赤骨双目圆睁，胸前红牌应声碎裂，颓然倒伏在地，气绝身亡。'),
    ],
    onFinishEffects: [openScene('scene_znq13_16', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_16: {
    id: 'scene_znq13_16',
    title: '第十六幕 · 搜获密档',
    subtitle: '西市皮货栈正堂',
    mandatory: true,
    beats: [
      N('你迅速搜检正堂暗格，翻出一卷用西夏文与汉文夹杂写就的毒药采购名录，上面赫然记着数袋“瘴毒蜂瘟散”已先一步运往秦岭南麓！'),
      P('“糟了！他们已将一部分瘴毒提前运往终南方向……必须立刻把这份密档交给白师姐！”'),
    ],
    onFinishEffects: [openScene('scene_znq13_17', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_17: {
    id: 'scene_znq13_17',
    title: '第十七幕 · 焚栈撤离',
    subtitle: '西市胡商坊西市',
    mandatory: true,
    beats: [
      N('你将堂中剩余毒粉尽数倾入水缸化去，又以火折引燃西夏往来账册，随即身形一晃踏瓦离去，只留一缕轻烟消散在长安夜风里。'),
    ],
    choices: [
      {
        id: 'znq13_return_east',
        label: '携密档返回【长安府 · 西市胡商坊（东市）】与白清霜会合',
        tone: 'jade',
        effects: [
          setStep(ZHONGNAN_Q13_QUEST_ID, 'report_bai_after_raid'),
          toast('请返回【长安府 · 西市胡商坊（东市）】与白清霜会合！', 'talk', '西市飞霜'),
        ],
      },
    ],
  },

  scene_znq13_18: {
    id: 'scene_znq13_18',
    title: '第十八幕 · 东坊会合',
    subtitle: '长安府 · 西市胡商坊（东市）',
    mandatory: true,
    beats: [
      N('回到东坊香料阁后院，白清霜早已收剑立于月下，见你安然无恙且带回西夏密档，紧锁的秀眉终于舒展。'),
      S('NPC-0215', '“西坊火光一起，外围放出的三只信鸽已被我尽数截落。你竟真的一人斩了嵬名赤骨，不错，没丢我古墓一脉的脸！”'),
    ],
    onFinishEffects: [openScene('scene_znq13_19', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_19: {
    id: 'scene_znq13_19',
    title: '第十九幕 · 蜂瘟隐忧',
    subtitle: '西市胡商坊东市',
    mandatory: true,
    beats: [
      N('白清霜借月光细阅密档，脸色忽然微微一沉：“『瘴毒蜂瘟散』……若这批毒粉真已渗入终南花谷，咱们墓中的玉蜂只怕危在旦夕！”'),
      S('NPC-0215', '“我须留在长安继续盯着一品堂余党动向。你立刻赶回终南山玉蜂轩查看，若有异状，万万不可延误！”'),
    ],
    onFinishEffects: [openScene('scene_znq13_20', ZHONGNAN_Q13_QUEST_ID)],
  },

  scene_znq13_20: {
    id: 'scene_znq13_20',
    title: '第二十幕 · 飞霜赠别',
    subtitle: '长安西市',
    mandatory: true,
    beats: [
      N('拜别白清霜，你收好她赠予的盘缠与赏银，披星戴月奔向终南山。长安西市一役，你已凭《踏雪无痕》初露锋芒。'),
    ],
    choices: [
      {
        id: 'znq13_complete',
        label: '辞别白清霜，速返终南查看玉蜂轩安危',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'addArtExp', artId: 'MA-098', amount: 300 },
          { type: 'giveSilver', amount: 110, reason: '拔除西市一品堂暗桩赏银' },
          { type: 'giveCombatExp', amount: 1400, reason: '夜潜西市斩杀红牌头目历练' },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifyRenown', delta: 35, reason: '西市飞霜夜斩一品堂红牌头目' },
          { type: 'modifyChivalry', delta: 20, reason: '铲除西夏密探护佑关中' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0215' }, delta: 20 },
          { type: 'completeQuest', questId: ZHONGNAN_Q13_QUEST_ID, outcome: 'slayed_red_badge' },
          toast('《西市飞霜 · 踏雪无痕》圆满完成！', 'success', '西市飞霜'),
        ],
      },
    ],
  },
}
