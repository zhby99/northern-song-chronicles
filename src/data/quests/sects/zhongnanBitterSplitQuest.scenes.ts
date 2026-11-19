import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q31_QUEST_ID } from './zhongnanBitterSplitQuest'

const SPEAKER_XIXIA_VANGUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '西夏铁骑先锋 · 拓跋黑煞',
  title: '一品堂破关先锋大将',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_av.jpg',
}

function buildXixiaVanguardBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ31_VANGUARD',
    name: '西夏铁骑先锋 · 拓跋黑煞',
    title: '一品堂破关先锋大将',
    realm: '一流上品',
    factionName: '西夏一品堂',
    sectRank: 0,
    sectRankLabel: '铁骑先锋',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    talk: '“哈哈哈！听说终南山的牛鼻子老道和活死人墓的婆娘闹翻了？正好省了本将军一番手脚，今夜便先拿你祭旗！”',
    stats: { hp: 3980, mp: 3420, agi: 76, res: 69 },
    talents: { bone: 81, comprehension: 68, charm: 30 },
    equippedArts: { neigong: 'MA-081', qinggong: 'MA-097', move1: 'MA-091', move2: 'MA-065' },
    learnedArts: [
      { artId: 'MA-081', level: 8 },
      { artId: 'MA-097', level: 8 },
      { artId: 'MA-091', level: 8 },
      { artId: 'MA-065', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq31_01: {
    id: 'scene_znq31_01',
    title: '第一幕 · 残花寒坪',
    subtitle: '终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，终南后山凄风苦雨。昔日繁花似锦的双剑合璧坪上，如今只余满地被秋风打落的残红与枯叶，气氛萧瑟刺骨。'),
      N('坪东列着重阳古观青袍道众，王重楼与丘处玄按剑而立；坪西则是活死人墓白衣女侠，林朝瑶与冷清秋寒霜满面。二十余载恩怨，终于走到不可挽回的尽头。'),
      S('NPC-0133', '（声音冷峻如铁）“林朝瑶，贫道念在昔日同门之谊，容忍古墓占我后山寒涧二十余载。如今外敌将至，你们却连半步山道也不肯相让！”'),
    ],
    onFinishEffects: [openScene('scene_znq31_02', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_02: {
    id: 'scene_znq31_02',
    title: '第二幕 · 冰霜针锋',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0114', '（冷笑一声，衣袖无风自动，周围草叶瞬间结出一层白霜）“好一个容忍！王重楼，这活死人墓本是你当年弃之如敝履的旧冢，是我一砖一石、一剑一掌守下来的净土！你重阳古观招摇过市引来胡虏觊觎，凭什么要我古墓替你收拾残局？”'),
      S('NPC-0216', '（怒喝出声，长剑铮然半出鞘）“林前辈休要血口喷人！我古观抗辽御夏乃为天下苍生，岂是招摇过市？！”'),
      S('NPC-0173', '（玉手轻按剑柄，冷然迎上丘处玄的目光）“丘道长好大的威风，难不成今日要在后山以多欺少？”'),
    ],
    onFinishEffects: [openScene('scene_znq31_03', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_03: {
    id: 'scene_znq31_03',
    title: '第三幕 · 守脉直言',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('两脉弟子剑拔弩张，真气激荡得坪中落叶旋飞如刀。此时，所有人目光都落在你身上。'),
      P('（缓步踏前，神色冷峻而决绝）“{ifFlag:zn_branch==guguan|道不同，不相为谋！我重阳玄门以匡扶社稷、剑荡胡尘为己任，既然活死人墓只愿闭户独善，古观亦绝不强求半点助力！|道不同，不相为谋！我活死人墓清静孤绝，只守冰心剑道，既然重阳古观执意卷入红尘杀劫，休怪古墓断桥绝交，各安天命！}”'),
      N('你一番话说得斩钉截铁，宛如利刃斩断最后一丝藕断丝连的旧情。'),
    ],
    onFinishEffects: [openScene('scene_znq31_04', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_04: {
    id: 'scene_znq31_04',
    title: '第四幕 · 剑气裂石',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0133', '（目中最后一丝柔光彻底熄灭，长袖一拂，一道无形纯阳剑气轰然劈落坪心青石，留下一道三尺深的焦黑剑痕）“好！既然话已至此，多说无益！”'),
      S('NPC-0114', '（玉指轻弹，一道森寒指风紧随其后，将那青石剑痕冻裂成冰壑）“王重楼，今日一别，你走你的阳关玄门，我守我的幽谷寒墓！生老病死，永不相干！”'),
    ],
    onFinishEffects: [openScene('scene_znq31_05', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_05: {
    id: 'scene_znq31_05',
    title: '第五幕 · 割席已定',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('王重楼拂袖转身，率古观弟子列阵坪北；林朝瑶亦冷面转身，携古墓众人退守坪南。那道横亘坪心的冰火裂痕，宛如一道不可逾越的天堑。'),
      S('NPC-0216', '（低声道）“{ifFlag:zn_branch==guguan|师父已决意封锁前山通往寒玉涧的栈道，绝不再与古墓往来。|重阳古观自此封涧，尔等好自为之！}”'),
      S('NPC-0173', '（声音冷如寒冰）“{ifFlag:zn_branch==guguan|古墓亦将斩断索桥、悬备断龙石，重阳道众若越雷池一步，格杀勿论！|师父已命我等斩断寒涧索桥、整备墓门千斤断龙石，自此绝不与道院通音讯！}”'),
    ],
    onFinishEffects: [openScene('scene_znq31_06', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_06: {
    id: 'scene_znq31_06',
    title: '第六幕 · 双剑成陌',
    subtitle: '繁花幽谷双剑合璧坪 · 道墓对峙',
    illustrationUrl: '/assets/quests/zn_q31_stream_confront.jpg',
    illustrationCaption: '繁花幽谷双剑合璧坪 · 王重楼与林朝瑶剑气裂石，终南两脉二十载情缘彻底割席',
    mandatory: true,
    beats: [
      N('秋雨淅沥落下，打湿了青袍与白衣。昔日象征两脉同源的双剑合璧坪，今日成了道墓决裂的伤心地。'),
      P('（深吸一口寒气，眼神愈发清冷锐利）“既已决裂，便当断则断。我去主持封涧断桥之仪，叫山前山后彻底泾渭分明！”'),
    ],
    onFinishEffects: [openScene('scene_znq31_07', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_07: {
    id: 'scene_znq31_07',
    title: '第七幕 · 决意立界',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('山风卷起满地残叶，本脉弟子皆已备好界碑与铁斧，只待你一声令下。'),
    ],
    choices: [
      {
        id: 'znq31_accept',
        label: '主持封涧断桥之仪，与外脉彻底划界割席',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q31_QUEST_ID, stepId: 'sever_valley_bound' },
          setStep(ZHONGNAN_Q31_QUEST_ID, 'sever_valley_bound'),
          toast('已接取《孤峰执念 · 道墓决裂》！请于双剑合璧坪主持封涧断桥。', 'warn', '道墓决裂'),
        ],
      },
    ],
  },

  scene_znq31_08: {
    id: 'scene_znq31_08',
    title: '第八幕 · 寒石刻界',
    subtitle: '繁花幽谷双剑合璧坪 · 涧桥之畔',
    mandatory: true,
    beats: [
      N('你率本脉弟子行至横跨寒玉涧的百年木索桥畔。涧水奔腾如雪，两岸绝壁如削，这座索桥曾是重阳古观与活死人墓之间唯一的往来通途。'),
      P('（拔剑出鞘，剑锋在桥头青石上刻下“道墓殊途，越界者斩”八个森严大字）“今日起，前山归前山，幽谷归幽谷。恩怨两清，生死不借！”'),
    ],
    onFinishEffects: [openScene('scene_znq31_09', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_09: {
    id: 'scene_znq31_09',
    title: '第九幕 · 封涧断桥',
    subtitle: '寒玉涧索桥',
    mandatory: true,
    beats: [
      N('{ifFlag:zn_branch==guguan|你一声令下，重阳道众以巨石封死通往幽谷的青石古道，并布下天罡警戒阵石，自此古观闭涧守道，不再踏足后山墓界半步。|你一声令下，长剑寒光连闪，“铮铮”数声斩断横跨深涧的铁索！木桥轰然坠入寒潭，同时墓门之上千斤断龙石绞盘上紧，只待危急关头便可轰然落下、永绝尘寰！}'),
      S('NPC-0216', '（遥望深涧对岸，神色复杂却终究未发一言）“……尘埃落定了。”'),
      S('NPC-0173', '（望着沉入涧底的断木，轻声低语）“自此之后，便再无回头路了。”'),
    ],
    onFinishEffects: [openScene('scene_znq31_10', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_10: {
    id: 'scene_znq31_10',
    title: '第十幕 · 骤闻狼烟',
    subtitle: '寒玉涧索桥',
    mandatory: true,
    beats: [
      N('便在索桥坠涧、余音未绝之际，下游银练飞瀑方向忽然炸起三声凄厉的响箭，紧接着浓烟滚滚冲天而起！'),
      N('一名浑身浴血的巡山弟子跌跌撞撞奔上山坡，嘶声呼喊：“不好了！西夏一品堂的铁骑先锋趁着两脉封涧防备空虚，顺着水路摸上银练飞瀑了！”'),
    ],
    onFinishEffects: [openScene('scene_znq31_11', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_11: {
    id: 'scene_znq31_11',
    title: '第十一幕 · 孤身请缨',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('听闻外敌入侵，山前与山后竟同时沉默了一瞬——谁也不愿在刚刚割席的当口，向对岸开口求援。'),
      P('（冷笑一声，反手拔剑，衣袍在山风中猎猎作响）“何须借他人之手！来犯之敌，我本脉一人一剑便足矣！诸位守好界碑，我去银练飞瀑取敌将首级！”'),
    ],
    onFinishEffects: [openScene('scene_znq31_12', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_12: {
    id: 'scene_znq31_12',
    title: '第十二幕 · 断桥绝影',
    subtitle: '寒玉涧 · 封涧断桥',
    illustrationUrl: '/assets/quests/zn_q31_bridge_sever.jpg',
    illustrationCaption: '寒玉涧断桥 · 铁索既断、界石既立，你提剑孤身奔赴银练飞瀑迎击西夏先锋',
    mandatory: true,
    beats: [
      N('你头也不回，纵身掠下峭壁，身影如孤鸿破雨，直扑硝烟弥漫的银练飞瀑！'),
    ],
    onFinishEffects: [openScene('scene_znq31_13', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_13: {
    id: 'scene_znq31_13',
    title: '第十三幕 · 驰赴飞瀑',
    subtitle: '终南后山险道',
    mandatory: true,
    beats: [
      N('瀑布轰鸣与金铁交鸣声越来越近，西夏先锋的狂笑已隐约可闻。'),
    ],
    choices: [
      {
        id: 'znq31_go_falls',
        label: '急驰【银练飞瀑清泉石茗案】，独力迎击西夏先锋！',
        tone: 'danger',
        effects: [
          setStep(ZHONGNAN_Q31_QUEST_ID, 'repel_vanguard_falls'),
          toast('请火速前往【银练飞瀑清泉石茗案（zn_st_falls）】斩退敌军先锋！', 'warn', '飞瀑孤战'),
        ],
      },
    ],
  },

  scene_znq31_14: {
    id: 'scene_znq31_14',
    title: '第十四幕 · 瀑前血雾',
    subtitle: '终南后山寒玉涧 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('银练飞瀑之下，原本清幽雅致的石茗案已被乱刀劈得粉碎。十余名身披黑铁轻甲的西夏死士正围着数名受伤的终南外门弟子狂笑逼近。'),
      S(SPEAKER_XIXIA_VANGUARD, '（扛着一柄门板似的玄铁重斩马刀，大脚踩碎石茶壶，狞笑道）“听说重阳古观和活死人墓今日断桥绝交了？好啊！你们自己先咬断了臂膀，倒省得大将军亲自动手！”'),
    ],
    onFinishEffects: [openScene('scene_znq31_15', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_15: {
    id: 'scene_znq31_15',
    title: '第十五幕 · 剑斩骄兵',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('一道寒光自瀑布水雾中破空而至！你如苍鹰搏兔般凌空坠落，剑气横扫，瞬间将最前排三名西夏死士震飞入潭！'),
      P('（挡在受伤弟子身前，剑尖斜指青石，寒声道）“终南山的家事，轮不到西夏蛮夷置喙！今日哪怕只剩我一人一剑，亦叫尔等葬身飞瀑之下！”'),
      S(SPEAKER_XIXIA_VANGUARD, '（先是一惊，旋即暴怒大笑）“好个不知死活的狂徒！没有外援，就凭你也想挡我拓跋黑煞的铁骑先锋？给我死来！”'),
    ],
    onFinishEffects: [openScene('scene_znq31_16', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_16: {
    id: 'scene_znq31_16',
    title: '第十六幕 · 孤峰血战',
    subtitle: '银练飞瀑 · 决死交锋',
    mandatory: true,
    beats: [
      N('拓跋黑煞重刀卷起漫天水花，刚猛无匹的塞外刀势如山崩般压下！你深吸一口气，将本脉所学催至极致，孤身迎上！'),
    ],
    choices: [
      {
        id: 'znq31_fight_vanguard',
        label: '独力迎战【西夏铁骑先锋 · 拓跋黑煞】，绝不借外脉半点援手！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q31_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXixiaVanguardBoss() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '孤峰立威之战，岂可在胡虏面前退缩半步！',
            introText: '银练飞瀑水雾之中，你孤身一剑迎战西夏铁骑先锋拓跋黑煞！',
            onWin: [openScene('scene_znq31_17', ZHONGNAN_Q31_QUEST_ID)],
            onLose: [
              toast('拓跋黑煞刀势沉猛，你暂退瀑后石岩调息，务必再度迎战斩敌！', 'warn', '孤战受挫'),
            ],
            onDraw: [
              toast('双方激斗难分轩轾，拓跋黑煞正欲重整阵脚，速再进击！', 'warn', '战局胶着'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq31_17: {
    id: 'scene_znq31_17',
    title: '第十七幕 · 斩旗破锋',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('激战数十合，你瞅准拓跋黑煞重刀回势的刹那破绽，身形贴刀欺进，凌厉剑锋贯透其肩甲，一脚将其踹翻在乱石堆中！'),
      S(SPEAKER_XIXIA_VANGUARD, '（捂着鲜血淋漓的右肩，惊骇欲绝）“这……终南山分明已经内讧，怎么还有如此凶悍的独行剑手？！撤！快撤回山外禀报大将军！”'),
      N('西夏先锋丢盔弃甲，拖着重伤的拓跋黑煞狼狈逃出山谷，只留下满地残旗与断刃。'),
    ],
    onFinishEffects: [openScene('scene_znq31_18', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_18: {
    id: 'scene_znq31_18',
    title: '第十八幕 · 孤剑立威',
    subtitle: '银练飞瀑 · 血战退敌',
    illustrationUrl: '/assets/quests/zn_q31_vanguard_duel.jpg',
    illustrationCaption: '银练飞瀑之下 · 你孤身一剑斩退西夏铁骑先锋，水雾染血而本脉脊梁不弯',
    mandatory: true,
    beats: [
      N('你甩去剑锋血珠，归剑入鞘。四周受伤的本脉弟子纷纷挣扎起身，望向你的目光充满了敬畏与振奋。'),
      P('（朗声道）“扶伤员回山疗伤！今夜之事，足告天下——即便孤峰独行，我本脉亦无惧任何强敌！”'),
    ],
    onFinishEffects: [openScene('scene_znq31_19', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_19: {
    id: 'scene_znq31_19',
    title: '第十九幕 · 归返界坪',
    subtitle: '银练飞瀑山道',
    mandatory: true,
    beats: [
      N('雨势渐歇，山谷间弥漫着清冷的草木与血腥气息。你提剑重返繁花幽谷双剑合璧坪，去完成最后的孤峰立誓。'),
    ],
    choices: [
      {
        id: 'znq31_return_oath',
        label: '返回【繁花幽谷双剑合璧坪】，立下孤峰独行之誓',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q31_QUEST_ID, 'lone_peak_oath'),
          toast('请返回【繁花幽谷双剑合璧坪（zn_st_sword）】立誓结案！', 'talk', '孤峰立誓'),
        ],
      },
    ],
  },

  scene_znq31_20: {
    id: 'scene_znq31_20',
    title: '第二十幕 · 宗师默许',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('双剑合璧坪上早已空无对岸人影，唯有本脉宗师仍静立界碑之前，望着你染血而归的衣衫。'),
      S(
        'NPC-0133',
        '（{ifFlag:zn_branch==guguan|王重楼微微颔首，目光深沉如岳：“好！不借古墓半寸锋芒，独力斩退西夏先锋，这才是我重阳玄门堂堂正正的脊梁！”|远方山巅传来王重楼冷峻的余音，随即拂袖入云，再不回顾。}）',
      ),
      S(
        'NPC-0114',
        '（{ifFlag:zn_branch==guguan|幽谷深处寒雾升腾，林朝瑶早已被石门阻隔于尘世之外，唯余一声微不可闻的冷哼随风散去。|林朝瑶静静凝望你片刻，眼中满是决绝与赞许：“好孩子，世上男子皆负心，红尘俗道尽虚妄。今日你独剑退敌，足证我活死人墓纵然孤悬幽谷，亦无需仰人鼻息！”}）',
      ),
    ],
    onFinishEffects: [openScene('scene_znq31_21', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_21: {
    id: 'scene_znq31_21',
    title: '第二十一幕 · 绝执入骨',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('站在那道冰火劈裂的青石界痕之前，你清楚地知道：自今日起，终南山再无“双剑合璧”的旧梦，唯有各自攀向极致的孤峰险道。'),
      P('（抚剑静立，眸光如雪）“既然天下不容两全，那便以孤峰之志，将本脉武道推至绝巅！”'),
    ],
    onFinishEffects: [openScene('scene_znq31_22', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_22: {
    id: 'scene_znq31_22',
    title: '第二十二幕 · 风云独担',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('西夏铁骑的马蹄声已在西北边关隐隐作响，赫连霸先、段延庆与四大恶人之流必将卷土重来。但你心中再无半分犹疑。'),
      N('孤峰虽寒，却能见万里风云；执念虽烈，亦可铸无上剑心！'),
    ],
    onFinishEffects: [openScene('scene_znq31_23', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_23: {
    id: 'scene_znq31_23',
    title: '第二十三幕 · 孤峰剑誓',
    subtitle: '终南后山 · 孤峰立誓',
    illustrationUrl: '/assets/quests/zn_q31_lone_oath.jpg',
    illustrationCaption: '繁花幽谷界碑前 · 残雨初歇，孤峰剑客横剑立誓，自此道墓割席各行其道',
    mandatory: true,
    beats: [
      N('一道夕阳破开厚重乌云，照在界碑森然的刻字上。你收剑转身，踏上独属于本脉的孤绝征途。'),
    ],
    onFinishEffects: [openScene('scene_znq31_24', ZHONGNAN_Q31_QUEST_ID)],
  },

  scene_znq31_24: {
    id: 'scene_znq31_24',
    title: '第二十四幕 · 各行其道',
    subtitle: '繁花幽谷双剑合璧坪 · 结案',
    mandatory: true,
    beats: [
      N('道墓彻底割席，孤峰之路已启！未来无论是玄门紫阳传衣，还是活死人墓断龙绝响，皆将由你一人一剑书写！'),
    ],
    choices: [
      {
        id: 'znq31_complete',
        label: '执剑立誓各行其道，开启本脉孤绝之路（完成任务）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'zn_cross', value: 'split' },
          { type: 'giveCombatExp', amount: 950, reason: '终南道墓决裂之际独力斩退西夏先锋，剑心益坚' },
          { type: 'modifyRenown', delta: 130, reason: '孤身斩退西夏铁骑先锋，威震关中江湖' },
          { type: 'modifyChivalry', delta: 40, reason: '宁折不弯、血战外敌护卫山门' },
          { type: 'modifySkill', key: '策论', delta: 2 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'completeQuest', questId: ZHONGNAN_Q31_QUEST_ID, outcome: 'completed' },
          toast('已完成《孤峰执念 · 道墓决裂》！终南两脉正式步入决裂孤峰之路！', 'success', '孤峰执念'),
        ],
      },
    ],
  },
}
