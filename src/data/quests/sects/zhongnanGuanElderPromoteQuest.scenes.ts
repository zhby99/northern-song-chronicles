import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q24_QUEST_ID } from './zhongnanGuanElderPromoteQuest'

const SPEAKER_TUBO_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '密宗金刚法王护法',
  title: '吐蕃番僧精锐',
  factionName: '吐蕃密宗',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
}

const TUBO_MONK_NPC = makeQuestNpc({
  id: 'znq24_tubo_monk',
  name: '密宗金刚法王护法',
  title: '吐蕃番僧精锐',
  realm: '一流中品',
  factionName: '吐蕃密宗',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  talk: '“中原道士的剑阵不过虚张声势，看我金刚轮破你七星！”',
  stats: { hp: 3500, mp: 1900, agi: 82, res: 76 },
  equippedArts: {
    neigong: 'MA-079',
    qinggong: 'MA-098',
    move1: 'MA-072',
    move2: 'MA-152',
  },
  learnedArts: [
    { artId: 'MA-079', level: 8 },
    { artId: 'MA-098', level: 7 },
    { artId: 'MA-072', level: 7 },
    { artId: 'MA-152', level: 8 },
  ],
})

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq24_01: {
    id: 'scene_znq24_01',
    title: '第一幕 · 烽烟蔽日逼重阳',
    subtitle: '终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛',
    illustrationUrl: '/assets/quests/zn_q24_dipper_formation_rise.jpg',
    illustrationCaption: '重阳古观警钟长鸣，七星演剑坛青袍林立，北斗剑阵迎风而起',
    mandatory: true,
    beats: [
      N('{reignYear}腊月初，终南山巅瑞雪皑皑，重阳古观九声急促景钟却撕裂了山间宁静！山下滚滚黑烟冲天而起，西夏一品堂旌旗与吐蕃密宗赤幡正沿着石阶汹涌逼近！'),
      N('你星夜疾驰赶回【天罡北斗七星演剑坛】，只见丹阳子【马钰玄】、长春子【丘处玄】与观中数十名精英弟子俱已佩剑列阵，个个神色凛然。'),
      S('NPC-1054', '（见你归来，面露大喜）“{gender:师弟|师妹}你可算赶回来了！师尊正在主殿压阵防备西夏顶尖宗师暗算，前山迎击努儿海与吐蕃番僧的重任，便全压在我等肩上！”'),
    ],
    onFinishEffects: [
      { type: 'startQuest', questId: ZHONGNAN_Q24_QUEST_ID, stepId: 'defend_dipper_altar' },
      { type: 'teleportPlayer', regionId: 'zhongnanshan', buildingId: 'zn_tao', spotId: 'zn_to_dipper' },
      openScene('scene_znq24_02', ZHONGNAN_Q24_QUEST_ID),
    ],
  },

  scene_znq24_02: {
    id: 'scene_znq24_02',
    title: '第二幕 · 呈上先天阵眼图',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-0216', '（按剑迎上）“{gender:师弟|师妹}，此番来犯的乃是西夏一品堂大将‘贺兰血鹰’努儿海，麾下更有数十名金刚护体、力大无穷的吐蕃密宗番僧！旧版北斗阵怕是难以锁死他们的蛮力冲撞！”'),
      P('（自怀中取出洛阳邵雍手书密录与黄裳所赠道偈）“两位师兄莫忧！我已在洛阳得邵雍先生指点先天易数阵眼，又在泉州蒙黄裳前辈点拨阴阳互济之理——今日北斗七星阵，以天枢退半步引敌入坎，可破一切蛮力！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_03', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_03: {
    id: 'scene_znq24_03',
    title: '第三幕 · 群雄推举掌天枢',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-1054', '（展开密录略一端详，拍案叫绝）“妙极！天枢虚实转承，七星首尾相衔！此阵既由你亲赴洛阳参悟而来，今日天枢主阵之位，非你莫属！”'),
      S('NPC-0216', '“不错！我守天璇、马师兄镇玉衡，其余师弟分占天玑、天权、开阳、摇光——全阵进退，皆听{gender:师弟|师妹}剑号！”'),
      P('（手按剑柄，踏上七星坛心天枢石刻）“弟子受命！请诸位师兄随我起阵，教外敌有来无回！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_04', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_04: {
    id: 'scene_znq24_04',
    title: '第四幕 · 血鹰长啸踏山门',
    subtitle: '天罡北斗七星演剑坛',
    illustrationUrl: '/assets/quests/zn_q24_nuerhai_assault.jpg',
    illustrationCaption: '西夏大将努儿海披挂血色鹰甲，率吐蕃密宗番僧踏雪杀上七星演剑坛',
    mandatory: true,
    beats: [
      N('话音刚落，石阶尽头传来一阵狂野凄厉的鹰啸！一队身披绛红袈裟、手持铜轮降魔杵的吐蕃密宗番僧如恶虎般撞开山门木栅，紧随其后的，正是满脸狞笑、腰悬弯刀与铁爪的西夏一品堂大将「贺兰血鹰」【努儿海】！'),
      S('NPC-0152', '（昂首大笑，目中无人）“哈哈哈！终南重阳古观就派这么几个年轻道士来迎客？王重楼那老牛鼻子莫非吓破了胆，躲在殿里不敢出来了么？！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_05', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_05: {
    id: 'scene_znq24_05',
    title: '第五幕 · 番僧先登试锋芒',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      P('（朗声喝道，剑锋直指山阶）“杀鸡焉用牛刀！努儿海，你西夏在延安青涧刚吃了败仗，如今又勾结吐蕃番僧犯我终南清修之地，真当我重阳古观无人么？”'),
      S('NPC-0152', '（眼中凶光暴涨）“好尖利的嘴皮子！法王护法，先替本将拆了这群牛鼻子的乌龟阵，把这小道士的舌头割下来下酒！”'),
      S(SPEAKER_TUBO_MONK, '（大喝一声，双手铜轮砸地震起漫天积雪）“吽！看我密宗金刚破阵！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_06', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_06: {
    id: 'scene_znq24_06',
    title: '第六幕 · 七星流转困金刚',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('吐蕃密宗护法高僧携排山倒海之势直冲演剑坛中宫！换作旧日阵法，天枢位必遭重创；可此刻你脚踏先天易数奇步，退半步引敌入坎，马钰玄与丘处玄剑光瞬间自左右合拢，将番僧死死锁入七星剑网！'),
    ],
    choices: [
      {
        id: 'znq24_ch_fight_monk',
        label: '执掌天枢剑锋，正面击溃吐蕃密宗金刚法王护法！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q24_QUEST_ID,
            opponent: { kind: 'custom', npc: TUBO_MONK_NPC },
            rule: 'duel',
            lethalOnLose: false,
            introText: '吐蕃密宗金刚护法挥舞铜轮猛扑天枢位！',
            onWin: [openScene('scene_znq24_07', ZHONGNAN_Q24_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('番僧金刚护体势大力沉，借七星阵势卸力再战！', 'warn', '北斗封山'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq24_07: {
    id: 'scene_znq24_07',
    title: '第七幕 · 剑碎铜轮震番众',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('“当啷——！”你一剑点在铜轮轴心薄弱之处，先天易数借力打力，竟将吐蕃护法震得倒飞三丈，口喷鲜血摔下石阶！其余番僧见护法一触即溃，无不骇然失色，攻势顿滞！'),
      S('NPC-0216', '（长笑振剑）“好一个先天北斗阵！番僧蛮力在{gender:师弟|师妹}天枢引导下，竟如泥牛入海！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_08', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_08: {
    id: 'scene_znq24_08',
    title: '第八幕 · 贺兰血鹰亲扑阵',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-0152', '（脸色铁青，猛然扯下猩红披风，左手玄铁鹰爪、右手西夏宝刀齐出）“一群没用的秃驴！这七星阵眼全系于中间那小子一身——只要本将亲手撕碎天枢，整个重阳古观便不攻自破！”'),
      N('努儿海身法快若鬼魅，双爪带起凄厉血腥劲风，竟无视两翼剑芒，舍命直扑你所在的天枢石位！'),
    ],
    onFinishEffects: [openScene('scene_znq24_09', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_09: {
    id: 'scene_znq24_09',
    title: '第九幕 · 天枢不动镇乾坤',
    subtitle: '天罡北斗七星演剑坛',
    illustrationUrl: '/assets/quests/zn_q24_seven_stars_break.jpg',
    illustrationCaption: '七星剑气汇于天枢，你迎着贺兰血鹰努儿海的狂猛爪刀，一剑划破漫天风雪',
    mandatory: true,
    beats: [
      S('NPC-1054', '（高喝传音）“{gender:师弟|师妹}稳住！七星真气已尽数渡往天枢，请以雷霆一剑斩落这贺兰血鹰！”'),
      P('（深吸一口凛冽山风，长剑清吟如龙）“阴阳互济，北斗归元——努儿海，今日便叫你折翼终南！”'),
    ],
    choices: [
      {
        id: 'znq24_ch_fight_nuerhai',
        label: '汇合七星剑势，正面对决西夏贺兰血鹰努儿海！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q24_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0152' },
            rule: 'duel',
            lethalOnLose: false,
            introText: '贺兰血鹰努儿海爪刀齐出，直扑天罡北斗阵天枢主位！',
            onWin: [openScene('scene_znq24_10', ZHONGNAN_Q24_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 65, mpPct: 65 },
              toast('努儿海凶威赫赫，借马钰玄与丘处玄剑阵掩护调息再战！', 'warn', '血战血鹰'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq24_10: {
    id: 'scene_znq24_10',
    title: '第十幕 · 七星合剑破血爪',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('激战五十余合，努儿海攻势愈发狂暴，一记血鹰搏兔直抓你胸膛！千钧一发之际，你运起刺桐论道所悟阴阳流转之理，剑身一黏一卸将鹰爪带偏半寸，顺势一记重阳剑气透胸而过！'),
      S('NPC-0152', '（胸口衣甲崩裂，鲜血狂喷，踉跄倒退十余步）“啊——！不可能！你的剑里怎会有刚柔并济的先天道韵……你究竟是谁？！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_11', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_11: {
    id: 'scene_znq24_11',
    title: '第十一幕 · 血鹰重创弃阵逃',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('见主将受创，吐蕃番僧与西夏随从顿时军心大乱！丘处玄率古观弟子趁势压上，剑光如雪潮般将敌军逼退至山门之外。'),
      S('NPC-0152', '（捂着胸口鲜血，怨毒地瞪了你一眼，由亲兵架起急撤）“终南小辈……本将记住你了！待国相大军与一品堂真正大人物亲临之日，终南山寸草不生！撤！！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_12', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_12: {
    id: 'scene_znq24_12',
    title: '第十二幕 · 北斗封山响欢呼',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('西夏与吐蕃联军丢下数十具尸首与满地兵刃，沿终南石阶狼狈溃逃！七星演剑坛上，重阳古观数百名弟子举剑高呼，声震云霄！'),
      S('NPC-1054', '（收剑长揖，满面敬佩）“这一战，天罡北斗阵威震关中！{gender:师弟|师妹}以一人之力统摄天枢、重创努儿海，当真是我重阳古观中兴之柱石！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_13', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_13: {
    id: 'scene_znq24_13',
    title: '第十三幕 · 后山隐影遥相望',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('喧嚣稍歇之际，你偶一抬眼，忽见远处寒玉涧松崖之巅，一袭素白衣袂在雪风中轻轻飘动，旋即化作残影悄然隐去——显然活死人墓一脉也在暗中注视着前山战局，见古观已胜方才退归幽谷。'),
      P('（心中微微一暖）“看来，三十载旧约之后，后山也并非真的置身事外……”'),
    ],
    onFinishEffects: [openScene('scene_znq24_14', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_14: {
    id: 'scene_znq24_14',
    title: '第十四幕 · 掌门传召清修殿',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('此时，一名知客道童快步走上七星坛，躬身传谕：“紫阳真人有命：前山大捷，请马师兄、丘师兄与破敌首功{gender:师兄|师姐}即刻前往【重阳玄门清修主殿】，举行古观长老册封大典！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_15', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_15: {
    id: 'scene_znq24_15',
    title: '第十五幕 · 诸兄拱手贺大喜',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-0216', '（哈哈大笑，用力拍了拍你的肩膀）“好！古观长老之位空悬多年，今日{gender:师弟|师妹}历经洛阳问数、延安护帐、刺桐校经与北斗封山四件大功，册封长老乃实至名归，全观上下无不心服口服！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_16', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_16: {
    id: 'scene_znq24_16',
    title: '第十六幕 · 整衣步向主殿台',
    subtitle: '重阳古观前脉道院',
    mandatory: true,
    beats: [
      N('清脆悠扬的道乐自【重阳玄门清修主殿】缓缓流淌而出，焚香袅袅升腾，青石御道两旁站满执拂尘肃立的古观道众。'),
    ],
    choices: [
      {
        id: 'znq24_ch_go_hall',
        label: '步入【重阳玄门清修主殿】，接受王重楼册封 Lv.4 古观长老！',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q24_QUEST_ID, 'elder_investiture'),
          { type: 'teleportPlayer', regionId: 'zhongnanshan', buildingId: 'zn_tao', spotId: 'zn_to_hall' },
          { type: 'setFlag', flag: 'znq24_hall_triggered', value: true },
          openScene('scene_znq24_19', ZHONGNAN_Q24_QUEST_ID),
        ],
      },
      {
        id: 'znq24_ch_later_hall',
        label: '先拭去剑上血渍，稍后自行步入重阳玄门清修主殿',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q24_QUEST_ID, 'elder_investiture'),
          openScene('scene_znq24_17', ZHONGNAN_Q24_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq24_17: {
    id: 'scene_znq24_17',
    title: '第十七幕 · 涤剑净手敬玄门',
    subtitle: '重阳古观庭院',
    mandatory: true,
    beats: [
      N('你以清泉洗去剑锋血痕，整理青袍道冠，随后缓步迈向【重阳玄门清修主殿】。'),
    ],
  },

  scene_znq24_18: {
    id: 'scene_znq24_18',
    title: '第十八幕 · 香烟缭绕三清前',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('步入宏伟庄严的主殿，三清金像宝相庄严，紫阳真人【王重楼】身披紫金法衣立于丹墀之上，目光慈和而深邃。'),
    ],
    onFinishEffects: [openScene('scene_znq24_19', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_19: {
    id: 'scene_znq24_19',
    title: '第十九幕 · 呈献黄裳阴阳偈',
    subtitle: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
    illustrationUrl: '/assets/quests/zn_q24_guguan_elder_investiture.jpg',
    illustrationCaption: '重阳主殿香烟缭绕，紫阳真人王重楼亲授青玉长老冠，册封你为古观长老',
    mandatory: true,
    beats: [
      N('你行至丹墀之下，恭敬稽首，将黄裳亲题的「先天一炁，阴阳同归」八字道偈双手呈上。'),
      S('NPC-0133', '（接过道偈细观良久，眼中掠过一抹欣慰与感慨）“黄裳道兄竟肯为你题写这八个字……看来你不仅护住了《万寿道藏》，更真正参透了孤阴不生、独阳不长的先天大道。”'),
    ],
    onFinishEffects: [openScene('scene_znq24_20', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_20: {
    id: 'scene_znq24_20',
    title: '第二十幕 · 紫阳真人颁法旨',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0133', '（朗声面向全殿弟子宣谕）“门下弟子听令：此子东赴洛阳演天罡之数，北上延安救边军之危，南下刺桐护道藏之本，今又于七星坛执掌天枢、重创西夏大将努儿海！功德圆满、德武兼备，今依古观祖制，特册封为重阳古观——**古观长老**！”'),
      N('马钰玄手捧青玉莲花冠与玄门长老玉佩上前，王重楼亲手为你戴冠佩玉！殿内百余名古观弟子齐声稽首：“恭贺长老！愿我重阳大道永昌！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_21', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_21: {
    id: 'scene_znq24_21',
    title: '第二十一幕 · 誓言铮铮表丹心',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0133', '“既膺古观长老重任，面对将至的江湖风暴，你当如何自处？”'),
    ],
    choices: [
      {
        id: 'znq24_ch_vow_benevolence',
        label: '“谨遵师训，上济苍生社稷，下护终南两脉周全！”',
        tone: 'jade',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 10 },
          openScene('scene_znq24_22', ZHONGNAN_Q24_QUEST_ID),
        ],
      },
      {
        id: 'znq24_ch_vow_sword',
        label: '“弟子手中长剑一日不断，绝不容胡虏邪寇踏入终南半步！”',
        tone: 'gold',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0216' }, delta: 10 },
          openScene('scene_znq24_22', ZHONGNAN_Q24_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq24_22: {
    id: 'scene_znq24_22',
    title: '第二十二幕 · 师尊密告山雨来',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('大典散后，王重楼独留你于殿后静室，神色转为凝重。'),
      S('NPC-0133', '“努儿海不过是西夏国相没藏讹庞放出来试探虚实的猎鹰。老道夜观星象，贺兰山煞气冲霄，不出数月，西夏一品堂真正的绝顶宗师便会亲自叩关终南。”'),
    ],
    onFinishEffects: [openScene('scene_znq24_23', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_23: {
    id: 'scene_znq24_23',
    title: '第二十三幕 · 叮嘱勤修先天境',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0133', '“大劫将至，单凭古观一脉未必能万无一失。这几日你当勤加闭关打磨真气，并将新改良的北斗剑阵传授门下；同时也要留心后山寒玉涧动静，切莫再与古墓生隙。”'),
      P('“弟子谨记师尊教诲！必当竭尽全力，备战即将到来的西夏大劫！”'),
    ],
    onFinishEffects: [openScene('scene_znq24_24', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_24: {
    id: 'scene_znq24_24',
    title: '第二十四幕 · 丹院赠药壮筋骨',
    subtitle: '重阳古观前脉道院',
    mandatory: true,
    beats: [
      N('步出主殿，马钰玄为你送来古观丹院珍藏的秘药与长老俸禄，叮嘱你这几日务必好生调息，静待贺兰山风暴来临。'),
    ],
    onFinishEffects: [openScene('scene_znq24_25', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_25: {
    id: 'scene_znq24_25',
    title: '第二十五幕 · 青玉冠映终南雪',
    subtitle: '重阳古观前脉道院',
    mandatory: true,
    beats: [
      N('夕阳西下，终南群峰染上一层金辉。你头戴青玉长老冠立于演剑坛畔，回望一路从关中、洛阳、延安到刺桐的万里风尘，心中沉静如水、剑意如虹。'),
    ],
    onFinishEffects: [openScene('scene_znq24_26', ZHONGNAN_Q24_QUEST_ID)],
  },

  scene_znq24_26: {
    id: 'scene_znq24_26',
    title: '第二十六幕 · 古观长老名震世',
    subtitle: '终南山隐宗 · 重阳古观前脉道院',
    mandatory: true,
    beats: [
      N('你已正式晋升终南隐宗 **Lv.4 古观长老**！然而贺兰黑云正滚滚压向关中，终南隐宗空前大劫已然箭在弦上！'),
    ],
    onFinishEffects: [
      { type: 'setSectRank', sectId: 'SECT-11', rank: 4, promoteOnly: true },
      { type: 'giveItem', itemId: 'ITM-MED-101', qty: 1 },
      { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
      { type: 'giveSilver', amount: 420, reason: '受封重阳古观长老赏赐与俸禄' },
      { type: 'giveCombatExp', amount: 1800, reason: '执掌天罡北斗阵破努儿海与番僧' },
      { type: 'addSectContribution', amount: 480 },
      { type: 'modifyRenown', delta: 90, reason: '北斗封山重创努儿海、荣膺古观长老' },
      { type: 'modifyChivalry', delta: 50, reason: '护持终南山门大破外敌' },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 12 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1054' }, delta: 10 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0216' }, delta: 10 },
      { type: 'setFlag', flag: 'zn_q24_guguan_elder', value: true },
      {
        type: 'completeQuest',
        questId: ZHONGNAN_Q24_QUEST_ID,
        outcome: 'guguan_elder_promoted',
        combatExp: 800,
      },
      toast(
        '【北斗封山 · 古观长老】完结！你已荣膺终南隐宗 Lv.4 古观长老，请静候西夏大劫主线！',
        'success',
        '晋升古观长老',
      ),
    ],
  },
}
