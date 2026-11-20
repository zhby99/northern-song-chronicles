import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q16_QUEST_ID } from './huashanYantaCrisisQuest'

const SPEAKER_TUOBA_XIONG: StorySpeakerSpec = {
  kind: 'custom',
  name: '拓跋烈 · 一品堂副使',
  title: '西夏一品堂关中总领副使',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_XINGXIU_ELDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '乌摩天 · 星宿毒阵长老',
  title: '星宿海客卿 · 腐骨毒烟宗师',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_YIPINTANG_CAPTAIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '一品堂死士百夫长',
  title: '西夏神臂强弩营统领',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_HUASHAN_VANGUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '华山随征剑客',
  title: '玉女峰精锐弟子',
  factionName: '华山派',
  portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
}

function buildYipintangBaseCaptainNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ16_YIPINTANG_CAPTAIN',
    name: '一品堂死士百夫长',
    title: '慈恩寺底层 · 封塔重刀统领',
    realm: '一流下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 2,
    sectRankLabel: '死士百夫长',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“守死塔门！绝不许华山援兵踏上二层半步！”',
    stats: { hp: 2350, mp: 1820, agi: 59, res: 50 },
    equipped: {
      weapon: 'WPN-043',
      armor: 'ARM-026',
      shoes: 'BOT-016',
    },
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-132' },
    learnedArts: [{ artId: 'MA-245', level: 5 }, { artId: 'MA-133', level: 6 }, { artId: 'MA-132', level: 5 }],
  })
}

function buildXingxiuMidDiscipleNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ16_XINGXIU_DISCIPLE',
    name: '星宿司炉毒师',
    title: '雁塔中层 · 腐骨毒阵护炉人',
    realm: '一流中品',
    factionId: 'SECT-19',
    factionName: '星宿派',
    sectRank: 3,
    sectRankLabel: '毒阵执事',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“吸一口本仙师的腐骨碧烟，叫你们华山剑客化作一滩脓血！”',
    stats: { hp: 2680, mp: 2350, agi: 62, res: 53 },
    equipped: {
      weapon: 'WPN-036',
      armor: 'ARM-025',
      shoes: 'BOT-016',
      accessory1: 'ACC-025',
    },
    equippedArts: { neigong: 'MA-081', move1: 'MA-065', move2: 'MA-127' },
    learnedArts: [{ artId: 'MA-081', level: 6 }, { artId: 'MA-065', level: 6 }, { artId: 'MA-127', level: 6 }],
  })
}

function buildTuobaXiongNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ16_TUOBA_XIONG',
    name: '拓跋烈 · 一品堂副使',
    title: '西夏一品堂 · 关中总领副使',
    realm: '一流上品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 4,
    sectRankLabel: '总领副使',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“没藏国相钧令：凡阻大夏东进泾原者，杀无赦！乌摩长老，合击毙了他！”',
    stats: { hp: 3360, mp: 2780, agi: 67, res: 60 },
    equipped: {
      weapon: 'WPN-043',
      armor: 'ARM-025',
      shoes: 'BOT-016',
      bow: 'BOW-012',
      accessory1: 'ACC-028',
      accessory2: 'ACC-025',
    },
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-113' },
    learnedArts: [{ artId: 'MA-245', level: 7 }, { artId: 'MA-133', level: 8 }, { artId: 'MA-113', level: 7 }],
  })
}

function buildXingxiuPoisonElderNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ16_XINGXIU_ELDER',
    name: '乌摩天 · 星宿毒阵长老',
    title: '星宿海客卿 · 碧磷毒掌长老',
    realm: '一流中品',
    factionId: 'SECT-19',
    factionName: '星宿派',
    sectRank: 4,
    sectRankLabel: '毒阵长老',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“封不弃与高沧云已中老夫碧磷奇毒，你也留下陪葬吧！”',
    stats: { hp: 2820, mp: 2600, agi: 64, res: 55 },
    equipped: {
      weapon: 'WPN-036',
      armor: 'ARM-026',
      shoes: 'BOT-016',
      accessory1: 'ACC-029',
    },
    equippedArts: { neigong: 'MA-026', move1: 'MA-055', move2: 'MA-065' },
    learnedArts: [{ artId: 'MA-026', level: 6 }, { artId: 'MA-055', level: 7 }, { artId: 'MA-065', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq16_01: {
    id: 'scene_hsq16_01',
    title: '第一幕 · 血羽飞鸽落紫霞',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('{reignYear}腊月初旬，暮色沉沉。一只左翅被毒矢擦伤的传讯信鸽跌跌撞撞扑入紫霞正气主殿，落在掌门岳沧溟案头，腿上竹管已被鲜血染透！'),
      S('NPC-0118', '（抽出血书急览数行，霍然拍案而起）“不好！封师弟与沧云在长安中计了！”'),
      S('NPC-0166', '“掌门师兄，信上怎讲？高沧云前日不是奉命下山协查西夏一品堂暗桩么？”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_02', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_02: {
    id: 'scene_hsq16_02',
    title: '第二幕 · 没藏毒计困双英',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0118', '“西夏权臣没藏讹庞欲在开春前寇掠泾原路，深忌我华山派扼守潼关、呼应陕北边军，竟派一品堂关中总领副使拓跋烈重金请来星宿海毒师！”'),
      S('NPC-0118', '“他们故意抛出假粮道密图，将封师弟与沧云诱入长安城南慈恩寺大雁塔中，随即以百名神臂强弩手与腐骨毒烟封死塔底，欲将二人活活困杀于七层浮屠之上！”'),
      P('“大雁塔孤耸城南，四面无遮，一旦火起或毒烟攻顶，封师叔与大师兄必无生路！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_03', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_03: {
    id: 'scene_hsq16_03',
    title: '第三幕 · 镇山分兵授虎符',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0166', '“师兄，西夏人声东击西亦未可知！你与秦师兄须坐镇华山以防调虎离山之计，长安驰援之任，非得派一位剑法超群、能独当一面的真传不可！”'),
      N('岳沧溟目光如炬落在你身上，抓起案上玄铁掌门剑令重重递入你手中！'),
      S('NPC-0118', '“今夜老夫点拨门中最精锐的二十名剑客归你统辖，一人双骑星夜疾驰长安！务必在天明之前杀穿大雁塔七层，将封师弟与沧云平安带回！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_04', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_04: {
    id: 'scene_hsq16_04',
    title: '第四幕 · 玉女赐丹防瘴毒',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('宁清羽快步取来一匣清香扑鼻的玉女辟毒丸分授众人，叮嘱道：“星宿妖人善使腐骨碧烟，入塔前切记含服辟毒丸，湿巾掩鼻，先毁其毒炉再救人！”'),
      P('“多谢掌门与宁师叔！弟子立誓：塔在人在，定斩拓跋烈之流救回封师叔与高师兄！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_05', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_05: {
    id: 'scene_hsq16_05',
    title: '第五幕 · 二十快骑出潼关',
    subtitle: '西岳山麓 · 潼关西驰官道',
    mandatory: true,
    beats: [
      N('二十名白衣负剑的华山精锐在山麓集结完毕。你手擎玄铁剑令翻身上马，一声呼哨，马蹄踏碎官道坚冰，顶着呼啸北风直扑京兆府长安城！'),
    ],
    choices: [
      {
        id: 'hsq16_c05_ride_changan',
        label: '率二十华山精锐昼夜飞驰，杀奔长安慈恩寺大雁塔',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q16_QUEST_ID, stepId: 'q16_yanta_base' },
          toast('已开启《雁塔风雷 · 京兆除魔》！请火速赶赴【京兆府 · 慈恩寺大雁塔 · 宝塔底层】！', 'warn', '星夜驰援'),
        ],
      },
    ],
  },

  scene_hsq16_06: {
    id: 'scene_hsq16_06',
    title: '第六幕 · 雁塔风雷毒雾笼',
    subtitle: '京兆府 · 慈恩寺大雁塔外院',
    illustrationUrl: '/assets/quests/hs_q16_yanta_siege.jpg',
    illustrationCaption: '雁塔毒烟 · 长安慈恩寺大雁塔风雨飘摇，强弩毒雾重困封高二人',
    mandatory: true,
    beats: [
      N('四更时分，风雨交加的长安城南慈恩寺已成修罗场！高耸入云的七层大雁塔四周插满惨绿火把，滚滚腥臭碧烟正顺着底层券门向塔顶倒灌，塔顶飞檐间隐约可见封不弃与高沧云浴血劈飞冷箭的身影！'),
      S(SPEAKER_HUASHAN_VANGUARD, '“禀师兄！寺内僧众已被我们救往后院，但塔底舍利地宫门前驻有数十名西夏重甲刀弩手把守！”'),
      P('“全员含服玉女辟毒丸！随我结两仪剑阵正面凿穿塔门，杀进一层！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_07', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_07: {
    id: 'scene_hsq16_07',
    title: '第七幕 · 飞剑拨矢闯地宫',
    subtitle: '慈恩寺大雁塔 · 宝塔底层 · 舍利地宫',
    mandatory: true,
    beats: [
      N('“嗖嗖嗖——！”西夏强弩齐发，密集箭雨在雨夜中织成死亡铁网！你一马当先腾空掠起，长剑舞成一团泼水不进的银光拨落劲矢，落地瞬息已突入宝塔底层大殿！'),
      S(SPEAKER_YIPINTANG_CAPTAIN, '“华山派的援兵怎来得如此之快？！重刀营结阵，砍翻领头这小子！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_08', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_08: {
    id: 'scene_hsq16_08',
    title: '第八幕 · 底层重刀血战启',
    subtitle: '慈恩寺大雁塔 · 宝塔底层 · 舍利地宫',
    mandatory: true,
    beats: [
      P('“二十精锐分守塔门阻住外围援寇，塔梯正面的番邦死士，交由我一剑扫平！”'),
    ],
    choices: [
      {
        id: 'hsq16_c08_fight_base',
        label: '剑指塔梯口，迎战西夏一品堂死士百夫长！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q16_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYipintangBaseCaptainNpc() },
            rule: 'duel',
            forbidEscapeReason: '封师叔与高师兄困在塔顶，一步亦退不得！',
            introText: '【雁塔破门】在宝塔底层击溃一品堂死士百夫长（一流下品），夺取登塔石阶！',
            onWin: [openScene('scene_hsq16_09', HUASHAN_Q16_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq16_09: {
    id: 'scene_hsq16_09',
    title: '第九幕 · 剑挑百夫夺石阶',
    subtitle: '慈恩寺大雁塔 · 宝塔底层 · 舍利地宫',
    mandatory: true,
    beats: [
      N('寒光闪处，死士百夫长手中西夏重弯刀被你一式《太岳三青峰》连人带甲劈飞撞碎木栏！余寇骇然溃散，二十名华山精锐顺势占住底层四门！'),
      S(SPEAKER_HUASHAN_VANGUARD, '“底层已稳！但二层至五层回廊尽是墨绿毒雾，星宿妖人在四层壁画廊设了三座铜毒炉！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_10', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_10: {
    id: 'scene_hsq16_10',
    title: '第十幕 · 分兵断后孤身登',
    subtitle: '慈恩寺大雁塔 · 盘旋木梯',
    mandatory: true,
    beats: [
      P('“尔等守死底层防止西夏外军合围焚塔！塔梯狭窄，人多反受毒烟所制，我独自闭息冲上中层毁他毒炉！”'),
      N('言罢你撕下衣襟蘸湿清水裹住口鼻，提剑踏上吱呀作响的盘旋塔梯，疾风般向塔身中层杀去！'),
    ],
    onFinishEffects: [openScene('scene_hsq16_11', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_11: {
    id: 'scene_hsq16_11',
    title: '第十一幕 · 逼近中层毒烟廊',
    subtitle: '慈恩寺大雁塔 · 三层至四层梯口',
    mandatory: true,
    beats: [
      N('越往上行，空气越发腥甜刺目，连石壁浮雕都被腐蚀得滋滋冒起白沫。四层回廊口刀光隐现，星宿毒师阴恻恻的怪笑声顺梯传下。'),
    ],
    choices: [
      {
        id: 'hsq16_c11_to_mid',
        label: '屏息运劲，纵身杀入大雁塔中层回廊',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q16_QUEST_ID, 'q16_yanta_mid'),
          toast('底层已破！请前往【中层回廊 · 浮雕壁画】捣毁星宿毒烟炉！', 'warn', '血战中层'),
        ],
      },
    ],
  },

  scene_hsq16_12: {
    id: 'scene_hsq16_12',
    title: '第十二幕 · 血战七层破刀阵',
    subtitle: '慈恩寺大雁塔 · 中层回廊 · 浮雕壁画',
    illustrationUrl: '/assets/quests/hs_q16_seven_floors_blood.jpg',
    illustrationCaption: '血战七层 · 提剑自底层杀上浮屠绝顶，太岳三青峰连破番邦刀阵',
    mandatory: true,
    beats: [
      N('自二层杀至四层中廊，沿途十余名埋伏在转角阴影中的一品堂精锐刀手接连扑出！你在丈许宽的木廊间施展绝妙身法，青锋所过之处血花飞溅，硬生生在番邦刀阵中杀出一条血路！'),
      S(SPEAKER_XINGXIU_ELDER, '（自上方六层探身俯视，惊怒交加）“哪来的华山小煞星，连闯四层竟不中老夫的腐骨烟？！司炉弟子，催动母炉毒火烧死他！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_13', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_13: {
    id: 'scene_hsq16_13',
    title: '第十三幕 · 三尊铜炉吐碧焰',
    subtitle: '慈恩寺大雁塔 · 中层回廊 · 浮雕壁画',
    mandatory: true,
    beats: [
      N('中层浮雕壁画回廊正中，三尊赤铜兽首炉正喷吐着幽绿毒焰，星宿司炉毒师手持铁杖立于炉前，双掌翻飞拍出阵阵腥风！'),
      P('“佛门清净宝塔，岂容尔等星宿妖人炼毒行凶！给我连人带炉一并碎开！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_14', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_14: {
    id: 'scene_hsq16_14',
    title: '第十四幕 · 剑荡腐骨毒烟阵',
    subtitle: '慈恩寺大雁塔 · 中层回廊 · 浮雕壁画',
    mandatory: true,
    beats: [
      N('星宿司炉毒师怪叫一声，铁杖裹挟抽髓毒劲当头砸落！'),
    ],
    choices: [
      {
        id: 'hsq16_c14_fight_mid',
        label: '鼓荡剑气震散毒烟，斩杀星宿司炉毒师！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q16_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXingxiuMidDiscipleNpc() },
            rule: 'duel',
            forbidEscapeReason: '毒炉不毁，塔顶封、高二人顷刻便要毒发坠塔！',
            introText: '【剑荡毒阵】在大雁塔中层回廊击败星宿司炉毒师（一流中品），劈碎三尊腐骨毒炉！',
            onWin: [openScene('scene_hsq16_15', HUASHAN_Q16_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq16_15: {
    id: 'scene_hsq16_15',
    title: '第十五幕 · 剑劈铜炉清浊瘴',
    subtitle: '慈恩寺大雁塔 · 中层回廊 · 浮雕壁画',
    mandatory: true,
    beats: [
      N('你一剑刺穿司炉毒师咽喉，随即飞起三脚将三尊赤铜毒炉踹出回廊木窗！铜炉坠落塔外暴雨泥水之中，“嗤啦”巨响白烟蒸腾，笼罩全塔的碧绿毒瘴终于随狂风迅速消散！'),
    ],
    onFinishEffects: [openScene('scene_hsq16_16', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_16: {
    id: 'scene_hsq16_16',
    title: '第十六幕 · 塔顶传来金铁危音',
    subtitle: '慈恩寺大雁塔 · 六层登顶梯',
    mandatory: true,
    beats: [
      N('恰在此时，七层绝顶传来一声木栏崩碎的轰鸣，紧接着是高沧云闷哼吐血与封不弃嘶哑怒喝之声！'),
      S('NPC-0167', '“沧云退后！老夫便是拼得经脉寸断，今日也要拉拓跋烈这狗贼垫背！”'),
      P('“封师叔、大师兄撑住——我来了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_17', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_17: {
    id: 'scene_hsq16_17',
    title: '第十七幕 · 纵身直趋七层巅',
    subtitle: '慈恩寺大雁塔 · 七层塔门',
    mandatory: true,
    beats: [
      N('你足踏梯壁连纵三级，一剑劈碎七层封门铁栓，挟风雷之势直闯绝顶佛龛飞檐！'),
    ],
    choices: [
      {
        id: 'hsq16_c17_to_top',
        label: '冲上大雁塔绝顶飞檐，解救封不弃与高沧云',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q16_QUEST_ID, 'q16_yanta_top'),
          toast('毒瘴已清！请于【绝顶佛龛 · 凭栏远眺】迎战拓跋烈与星宿毒阵长老！', 'warn', '决战塔顶'),
        ],
      },
    ],
  },

  scene_hsq16_18: {
    id: 'scene_hsq16_18',
    title: '第十八幕 · 绝顶浴血见同门',
    subtitle: '慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺',
    mandatory: true,
    beats: [
      N('七层佛龛外狂风呼啸，百尺高空雨如飞蝗。只见高沧云左肩中了一记碧磷毒掌，半跪于栏边摇摇欲坠；封不弃浑身浴血横剑相护，正被身材魁梧的一品堂副使拓跋烈与鹤发鸠面的星宿长老乌摩天步步紧逼至飞檐绝境！'),
      S('NPC-0202', '（惊喜交集）“是{gender:师弟|师妹}！小心那星宿老怪的冰蚕毒掌！”'),
      S(SPEAKER_TUOBA_XIONG, '（眼神阴鸷）“竟能单剑杀穿六层刀阵？好个华山后起之秀，可惜撞上了本使与乌摩长老联手！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_19', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_19: {
    id: 'scene_hsq16_19',
    title: '第十九幕 · 横剑挡关护双英',
    subtitle: '慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺',
    mandatory: true,
    beats: [
      N('你闪身挡在封不弃与高沧云身前，抛过两枚玉女辟毒丸令二人服下调息，独自面对两大强敌的凛冽杀机！'),
      P('“西夏一品堂与星宿海狼狈为奸，也只配做些诱敌放毒的鼠辈勾当！拓跋烈、乌摩天，敢接我华山三尺青锋否？！”'),
      S(SPEAKER_XINGXIU_ELDER, '“牙尖嘴利！拓跋副使，你攻他正面，老夫以冰蚕寒毒封他退路，三招之内震他坠塔！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_20', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_20: {
    id: 'scene_hsq16_20',
    title: '第二十幕 · 飞檐凌空战双魔',
    subtitle: '慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺',
    illustrationUrl: '/assets/quests/hs_q16_pagoda_eaves_duel.jpg',
    illustrationCaption: '飞檐除魔 · 大雁塔顶凌空力挫一品堂副使与星宿毒阵长老',
    mandatory: true,
    beats: [
      N('电闪雷鸣映亮七层浮屠飞檐！拓跋烈金背狼牙弯刀挟风雷劈落，乌摩天双掌凝满惨白寒霜左右夹攻，你长啸一声踏檐凌空迎战！'),
    ],
    choices: [
      {
        id: 'hsq16_c20_boss_duel',
        label: '凌空施展太岳绝剑，车轮连战力战拓跋烈与乌摩天！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_Q16_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTuobaXiongNpc() },
            extraOpponents: [{ kind: 'custom', npc: buildXingxiuPoisonElderNpc() }],
            rule: 'duel',
            forbidEscapeReason: '身后便是重伤的封师叔与大师兄，退一步同门俱亡！',
            introText: '【飞檐除魔】在大雁塔绝顶独战一品堂副使拓跋烈（一流上品）与星宿毒阵长老乌摩天（一流中品）！',
            onWin: [openScene('scene_hsq16_21', HUASHAN_Q16_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq16_21: {
    id: 'scene_hsq16_21',
    title: '第二十一幕 · 三峰贯日败番酋',
    subtitle: '慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺',
    mandatory: true,
    beats: [
      N('绝顶飞檐之上剑气纵横！你硬接拓跋烈一记重刀借力旋身，反手《太岳三青峰》连环三刺逼得乌摩天吐血倒退，紧接着剑锋回转直削拓跋烈左肩琵琶骨，将其半片铁甲连皮带肉削飞出去！'),
      S(SPEAKER_TUOBA_XIONG, '（捂住血如泉涌的肩头，骇然暴退）“好凶的太岳剑法！京兆府厢军马蹄声已近，乌摩长老，快抛飞索撤！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_22', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_22: {
    id: 'scene_hsq16_22',
    title: '第二十二幕 · 败寇坠落诡血书',
    subtitle: '慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺',
    mandatory: true,
    beats: [
      N('拓跋烈与乌摩天甩出飞爪铁索借着夜雨滑下塔背仓皇逃窜。就在拓跋烈翻出塔栏的刹那，他怀中一封火漆密函似是不慎滑落，啪地掉在飞檐青砖之上——可你分明瞥见，他回头望向那封信时眼底掠过一抹阴冷狡黠的诡笑！'),
      N('你拾起密函一看，信封上竟赫然用西夏官印写着：「致华山内应密约 · 雁塔除异己事成后平分西岳」！拆开细看，字里行间半遮半掩，既像指认气宗借刀杀人除封不弃，又像指认剑宗设局害高沧云！'),
    ],
    onFinishEffects: [openScene('scene_hsq16_23', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_23: {
    id: 'scene_hsq16_23',
    title: '第二十三幕 · 扶伤整队返西岳',
    subtitle: '慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺',
    mandatory: true,
    beats: [
      S('NPC-0202', '（调息初愈，瞥见信纸脸色微白）“这……这定是西夏番贼临走故意留下的反间毒计！”'),
      S('NPC-0167', '（眼神幽深难测地扫过那封血书，冷哼一声）“是不是反间计，带回紫霞殿叫岳师兄亲自过目便知！先随我回山！”'),
      P('“封师叔说得是，此地不宜久留，我们立刻汇合塔下同门星夜返山！”'),
    ],
    choices: [
      {
        id: 'hsq16_c23_return_huashan',
        label: '收起可疑血书，护送封不弃与高沧云凯旋返回紫霞正气主殿',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q16_QUEST_ID, 'q16_return_zixia'),
          toast('大雁塔重围已解！请返回【玉女峰紫霞道观 · 紫霞正气主殿】复命受封！', 'success', '雁塔大捷'),
        ],
      },
    ],
  },

  scene_hsq16_24: {
    id: 'scene_hsq16_24',
    title: '第二十四幕 · 凯旋归山聚四老',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('翌日正午，紫霞正气主殿钟鼓齐鸣。岳沧溟、秦烈山、宁清羽与伤势包扎妥当的封不弃四位宿老齐聚殿上，高沧云与二十名随征剑客分列两厢，人人脸上皆带振奋之色。'),
      S('NPC-0202', '“禀师父、秦师伯、宁师叔！昨夜大雁塔毒烟锁道、强弩如林，若非{gender:师弟|师妹}单剑连破六层、于七层飞檐以一敌二击溃拓跋烈与乌摩天，弟子与封师叔今日已成塔下冤魂！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_25', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_25: {
    id: 'scene_hsq16_25',
    title: '第二十五幕 · 呈验反间伪血书',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('你上前一步，将战况如实禀明，并双手呈上拓跋烈败逃时遗落的那封火漆血书。'),
      S('NPC-0147', '（接过血书扫了一眼，冷哼一声震碎半角信笺）“拙劣至极！西夏一品堂在思过崖与大雁塔连折两阵，知道正面拿不下我华山，便使出这等挑拨气剑猜忌的下三滥伎俩！”'),
      S('NPC-0118', '“秦师弟明鉴。只是没藏讹庞狼子野心，反间不成，不日必有雷霆反扑！我华山当务之急，是立刻提拔擎天栋梁分掌山门防务！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_26', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_26: {
    id: 'scene_hsq16_26',
    title: '第二十六幕 · 四老联署封长老',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    illustrationUrl: '/assets/quests/hs_q16_elder_investiture.jpg',
    illustrationCaption: '荣膺长老 · 紫霞殿四老联署册封四阶长老，一纸伪造血书暗掀风暴',
    mandatory: true,
    beats: [
      N('岳沧溟手捧紫金云纹长老剑绶立于大殿丹墀之前，秦烈山、宁清羽、封不弃三人齐齐颔首附署。'),
      S('NPC-0118', '“传掌门法旨：本门弟子千里驰援京兆，孤剑荡平雁塔群魔，救护尊长同门，功冠西岳！经我四老一致商议，即日起破格晋升你为本门四阶长老——参赞紫霞枢机，统摄护山剑阵！”'),
      N('两厢数十名华山弟子齐声躬身贺道：“恭贺长老荣升！西岳剑威千秋！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_27', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_27: {
    id: 'scene_hsq16_27',
    title: '第二十七幕 · 紫绶佩腰暗潮生',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('你双手接过沉甸甸的紫金长老剑绶佩于腰间。殿堂之上看似同心欢庆，然而角落里几名曾经历过昔年门户纷争的旧执事望着案上那封残破血书，眼神深处仍掠过一丝不安的阴翳。'),
      S('NPC-0166', '“西夏一品堂在关中折损了副使拓跋烈，绝不会善罢甘休。传令全山各峰：自今夜起百尺峡、苍龙岭、玉女峰三道关卡昼夜双岗戒备！”'),
    ],
    onFinishEffects: [openScene('scene_hsq16_28', HUASHAN_Q16_QUEST_ID)],
  },

  scene_hsq16_28: {
    id: 'scene_hsq16_28',
    title: '第二十八幕 · 山雨欲来风满楼',
    subtitle: '玉女峰紫霞道观 · 殿前丹墀',
    mandatory: true,
    beats: [
      N('步出紫霞大殿，西岳群峰上空铅云低垂，朔风卷起阵阵松涛。已身居华山四阶长老之尊的你按剑远眺西夏方向，深知真正的生死大劫已近在咫尺！'),
    ],
    choices: [
      {
        id: 'hsq16_c28_complete',
        label: '佩紧四阶长老剑绶，巡视山门迎候即将到来的决战',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-05', rank: 4, promoteOnly: true },
          { type: 'giveSilver', amount: 240, reason: '雁塔除魔救护同门与晋升四阶长老厚赏' },
          { type: 'addSectContribution', amount: 150 },
          { type: 'giveCombatExp', amount: 320, reason: '血战大雁塔七层力挫拓跋烈与星宿长老' },
          { type: 'modifyChivalry', delta: 20, reason: '星夜驰援慈恩寺，粉碎西夏星宿毒烟阴谋' },
          { type: 'modifyRenown', delta: 45, reason: '长安大雁塔单剑闯七层，名动关中武林' },
          {
            type: 'branch',
            condition: flag('hs_branch', 'eq', 'qi'),
            thenEffects: [
              toast('恭贺晋升华山四阶【护法长老】！可在紫霞殿开启气宗镇派天阶传承《血染玉女 · 紫霞传薪》！', 'success', '荣膺长老'),
            ],
            elseEffects: [
              toast('恭贺晋升华山四阶【执剑长老】！西岳终局风暴即将揭幕！', 'success', '荣膺长老'),
            ],
          },
          { type: 'completeQuest', questId: HUASHAN_Q16_QUEST_ID, outcome: 'promoted_elder' },
        ],
      },
    ],
  },
}
