import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, warn } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q07_QUEST_ID } from './zhongnanGuanQinzhouHorseQuest'

const SPEAKER_XIXIA_GENERAL: StorySpeakerSpec = {
  kind: 'custom',
  name: '拓跋铁勒',
  title: '西夏铁鹞子先锋游将',
  factionName: '西夏铁骑',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_XIXIA_RIDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '野利忽秃',
  title: '西夏劫马火骑头目',
  factionName: '西夏铁骑',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildXixiaRider(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q07_XIXIA_RIDER',
    name: '野利忽秃',
    title: '西夏劫马火骑头目',
    realm: '二流下品',
    factionName: '西夏铁骑',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“点起火把！烧死吐蕃人的马，看大宋拿什么抵挡铁鹞子！”',
    stats: { hp: 1120, mp: 460, agi: 44, res: 24 },
    talents: { bone: 64, comprehension: 52, charm: 36 },
    equippedArts: { neigong: 'MA-234', move1: 'MA-184' },
    learnedArts: [
      { artId: 'MA-234', level: 5 },
      { artId: 'MA-184', level: 5 },
    ],
  })
}

function buildXixiaGeneral(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q07_XIXIA_GENERAL',
    name: '拓跋铁勒',
    title: '西夏铁鹞子先锋游将',
    realm: '二流上品',
    factionName: '西夏铁骑',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“终南牛鼻子与宋将胆敢拦路，尝尝我西夏铁骨朵的滋味！”',
    stats: { hp: 1620, mp: 700, agi: 52, res: 30 },
    talents: { bone: 74, comprehension: 60, charm: 45 },
    equippedArts: { neigong: 'MA-234', move1: 'MA-184' },
    learnedArts: [
      { artId: 'MA-234', level: 6 },
      { artId: 'MA-184', level: 6 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn_q07_01: {
    id: 'scene_zn_q07_01',
    title: '第一幕 · 秦州验马',
    subtitle: '秦州府 · 吐蕃青唐验马阑',
    illustrationUrl: '/assets/quests/zn_q07_chama_horses.jpg',
    illustrationCaption: '茶马边塞 · 秋风卷过秦州验马阑，吐蕃河曲骏马嘶鸣如雷',
    mandatory: true,
    beats: [
      N('{reignYear}初秋，天水秦州风沙初起。官营茶马榷场东侧的【吐蕃青唐验马阑】内，数百匹神骏雄健的河曲战马昂首长嘶，茶砖堆叠如山。'),
      S('NPC-1054', '（见你与丘处玄风尘仆仆赶到，迎上笑道）“丘师弟，{gender:师弟|师妹}，你们来得正好！长安横渠书院平安无事罢？”'),
      S('NPC-0216', '“西夏刺客已尽数伏诛！只是审出他们另一支轻骑今夜便要突袭秦州焚毁贡马！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_02', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_02: {
    id: 'scene_zn_q07_02',
    title: '第二幕 · 河州瞎毡',
    subtitle: '吐蕃青唐验马阑 · 吐蕃盟友',
    mandatory: true,
    beats: [
      N('身披锦缎藏袍、腰悬金柄短刀的河州吐蕃首领【瞎毡】大步走来，闻言浓眉倒竖。'),
      S('NPC-0090', '“哼！党项贼子屡次侵我青唐牧场，如今竟敢把手伸到秦州榷场来！这三百匹河曲良马乃我吐蕃与大宋换茶结盟之信，绝不能损毁一匹！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_03', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_03: {
    id: 'scene_zn_q07_03',
    title: '第三幕 · 烽燧传警',
    subtitle: '吐蕃青唐验马阑 · 西北烟起',
    mandatory: true,
    beats: [
      N('话音未落，西北方古塞山梁上骤然腾起两道狼烟！快马探子疾驰入阑大喊：“报——西夏游骑约二百人绕过渭水浅滩，正奔【陇右古战场烽燧】而来，企图先拔烽燧再冲榷场！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_04', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_04: {
    id: 'scene_zn_q07_04',
    title: '第四幕 · 分兵御敌',
    subtitle: '吐蕃青唐验马阑 · 双兄异策',
    mandatory: true,
    beats: [
      S('NPC-1054', '“验马阑马匹受惊易踏伤商民，贫道留此协助瞎毡首领将马群转移入内城避险，同时收容城外逃难乡民。”'),
      S('NPC-0216', '（按剑大喝）“好！那我带{gender:师侄|师侄女}火速驰援【陇右古战场烽燧 · 金环聚义堂】，联手刘沪将军与金环大侠雷万里，在古塞石堡正面截碎这帮夏骑！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_05', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_05: {
    id: 'scene_zn_q07_05',
    title: '第五幕 · 赠马暂乘',
    subtitle: '吐蕃青唐验马阑 · 选骏出征',
    mandatory: true,
    beats: [
      S('NPC-0090', '（牵出一匹通体枣红、四蹄踏雪的骏马递过缰绳）“{gender:年轻道友|年轻女侠}，骑我这匹河曲头马去！若能保住秦州马场，此马便赠予你作生死之交的信物！”'),
      P('（翻身上马，控缰如臂）“多谢首领厚谊！夏骑不破，绝不空归！”'),
    ],
    onFinishEffects: [
      { type: 'modifySkill', key: '骑术', delta: 1 },
      openScene('scene_zn_q07_06', ZHONGNAN_Q07_QUEST_ID),
    ],
  },

  scene_zn_q07_06: {
    id: 'scene_zn_q07_06',
    title: '第六幕 · 纵马赴塞',
    subtitle: '秦州古道 · 疾驰陇右烽燧',
    mandatory: true,
    beats: [
      N('你与丘处玄策马扬鞭，迎着凛冽秋风直奔陇右古战场烽燧！'),
    ],
    choices: [
      {
        id: 'zn_q07_go_longyou',
        label: '策马疾驰 · 赶赴陇右古战场烽燧金环聚义堂',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q07_QUEST_ID, stepId: 'longyou_ambush_xixia' },
          setStep(ZHONGNAN_Q07_QUEST_ID, 'longyou_ambush_xixia'),
          toast('请前往【秦州府 · 陇右古战场烽燧 · 金环聚义堂】会合刘沪与雷万里！', 'talk', '铁骑护马'),
        ],
      },
    ],
  },

  scene_zn_q07_07: {
    id: 'scene_zn_q07_07',
    title: '第七幕 · 古塞聚义',
    subtitle: '陇右古战场烽燧 · 金环聚义堂',
    illustrationUrl: '/assets/quests/zn_q07_longyou_beacon.jpg',
    illustrationCaption: '陇右烽火 · 古塞石堡狼烟冲天，刘沪与雷万里列阵迎击西夏铁骑',
    mandatory: true,
    beats: [
      N('陇右古塞石堡建于扼喉隘口之上。堂前，素有「水洛城英雄」之称的大宋名将【刘沪】已披挂明光铠，身旁则是手持沉重金环大刀的陇右豪杰【雷万里】。'),
      S('NPC-0045', '（抱拳朗笑）“终南丘道长与年轻英侠赶来助阵，刘某如虎添翼！夏骑先锋已入山谷，正是关门打狗的良机！”'),
      S('NPC-0313', '（金环刀震得哗啦作响）“哈哈！终南剑法配我陇右金环刀，管叫那帮党项狗贼有来无回！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_08', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_08: {
    id: 'scene_zn_q07_08',
    title: '第八幕 · 铁蹄震谷',
    subtitle: '古塞隘口 · 夏骑扑至',
    mandatory: true,
    beats: [
      N('轰隆马蹄声震动黄沙，百余名西夏游骑举着火油火把冲入古塞隘口！刘沪一声令下，宋军强弩齐发，滚木礌石截断退路，阵型顿时大乱！'),
      S(SPEAKER_XIXIA_RIDER, '（挥刀斩断箭矢，嘶声咆哮）“中伏了！先杀开石堡正门，烧了粮草！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_09', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_09: {
    id: 'scene_zn_q07_09',
    title: '第九幕 · 截杀火骑',
    subtitle: '古塞石堡 · 首战野利忽秃',
    mandatory: true,
    beats: [
      S('NPC-0313', '“我替你挡住左侧游骑，{gender:小道友|小女侠}，先斩了那个举火把的夏贼头目！”'),
    ],
    choices: [
      {
        id: 'zn_q07_fight_rider',
        label: '跃下石阶 · 联手雷万里斩杀火骑头目野利忽秃',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXixiaRider() },
            allies: [{ kind: 'npc', npcId: 'NPC-0313' }],
            rule: 'story_trial',
            forbidEscapeReason: '古塞隘口寸土不可失！',
            introText: '野利忽秃挥舞火把与弯刀疯扑而来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q07_10', ZHONGNAN_Q07_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('一时受挫，雷万里金环大刀横扫将夏贼逼退。请调息再战！', '陇右破敌'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q07_10: {
    id: 'scene_zn_q07_10',
    title: '第十幕 · 铁鹞骁将',
    subtitle: '古塞石堡 · 拓跋铁勒突阵',
    mandatory: true,
    beats: [
      N('野利忽秃惨叫坠马！然而谷口黄沙中却冲出一员身披重甲的西夏骁将——铁鹞子先锋游将拓跋铁勒，手中一对铁骨朵势不可挡，连砸碎数面宋军盾牌！'),
      S(SPEAKER_XIXIA_GENERAL, '“宋人安敢坏我大夏劫马大计！谁敢上前一战！”'),
      S('NPC-0045', '（提枪迎上，回头向你大喝）“此獠勇悍异常，{gender:少侠|女侠}助我左右夹攻，擒贼先擒王！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_11', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_11: {
    id: 'scene_zn_q07_11',
    title: '第十一幕 · 合击骁将',
    subtitle: '古塞石堡 · 决战拓跋铁勒',
    mandatory: true,
    beats: [
      P('“刘将军压住正面，弟子以《金雁功》游走侧翼、《劈空掌》与《三才归元剑》破他重甲！”'),
    ],
    choices: [
      {
        id: 'zn_q07_fight_general',
        label: '联手刘沪将军 · 力克西夏先锋游将拓跋铁勒',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXixiaGeneral() },
            allies: [{ kind: 'npc', npcId: 'NPC-0045' }],
            rule: 'story_trial',
            forbidEscapeReason: '斩下此獠方能彻底击溃西夏劫马铁骑！',
            introText: '拓跋铁勒挥舞一对精铁骨朵，如暴雷般砸落！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q07_12', ZHONGNAN_Q07_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('拓跋铁勒重甲难破，刘沪长枪回护助你退回石阶调息，稍后再战！', '陇右破敌'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q07_12: {
    id: 'scene_zn_q07_12',
    title: '第十二幕 · 夏骑大溃',
    subtitle: '陇右古塞 · 斩将夺旗',
    mandatory: true,
    beats: [
      N('你与刘沪一枪一剑配合无间，终以《劈空掌》透过重甲震伤拓跋铁勒肺腑，长剑挑落其铁盔！拓跋铁勒见丘处玄已率援兵封死谷口，只得丢下狼头帅旗，带着残骑狼狈向西北荒漠逃窜！'),
      S('NPC-0045', '（拭去枪尖血迹，朗声大赞）“痛快！今番古塞大捷，终南高徒居功至伟！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_13', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_13: {
    id: 'scene_zn_q07_13',
    title: '第十三幕 · 烽烟残局',
    subtitle: '陇右古塞 · 战后分歧',
    mandatory: true,
    beats: [
      N('大战初歇，硝烟未散。谷外逃窜的西夏残骑尚未远去，而古塞脚下的村落却有数间民宅被夏骑流矢引燃，百姓哭声四起。'),
      S('NPC-0216', '（剑眉倒竖，指向西北烟尘）“残寇不过数十骑，若此刻不趁胜追歼三十里，来日他们必再卷土重来祸害秦州！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_14', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_14: {
    id: 'scene_zn_q07_14',
    title: '第十四幕 · 清静与尚武',
    subtitle: '陇右古塞 · 马钰玄赶至',
    mandatory: true,
    beats: [
      N('恰在此时，大师兄马钰玄带着几名终南弟子携药箱赶到古塞。'),
      S('NPC-1054', '（叹息摇头，遥指起火的边塞村落）“丘师弟，穷寇莫追。边民房舍正燃、伤兵呻吟遍野，我道门以慈悲济世为本，当务之急乃是救火抚民、施药活人！”'),
      S('NPC-0216', '“马师兄，除恶务尽亦是护民！若不杀得夏贼胆寒，明年春耕百姓照样不得安生！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_15', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_15: {
    id: 'scene_zn_q07_15',
    title: '第十五幕 · 道风抉择',
    subtitle: '陇右古塞 · 古观心志之辨',
    illustrationUrl: '/assets/quests/zn_q07_qinzhou_choice.jpg',
    illustrationCaption: '道风分途 · 丘处玄按剑望北欲追歼夏骑，马钰玄提药箱赴村抚民',
    mandatory: true,
    beats: [
      N('两位师兄虽意见相左，却皆出于护国安民之心。马钰玄与丘处玄同时望向你——这一刻，你的选择将定下你在重阳古观中的道风底色！'),
    ],
    choices: [
      {
        id: 'zn_q07_style_martial',
        label: '随丘处玄策马追歼夏骑三十里——「以杀止杀，扬我玄门剑威」',
        subLabel: '确立古观【尚武道风（martial）】：偏重果决破邪与边塞侠名',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'zn_guan_style', value: 'martial' },
          { type: 'modifyRenown', delta: 10, reason: '秦州追歼西夏残骑三十里' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0216' }, delta: 12 },
          setStep(ZHONGNAN_Q07_QUEST_ID, 'chama_receive_steed'),
          openScene('scene_zn_q07_16_martial', ZHONGNAN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'zn_q07_style_tranquil',
        label: '随马钰玄入村救火抚民施药——「清静济世，护得苍生周全」',
        subLabel: '确立古观【清静道风（tranquil）】：偏重慈悲济世与侠义仁心',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'zn_guan_style', value: 'tranquil' },
          { type: 'modifyChivalry', delta: 14, reason: '秦州战后救火抚民施药' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1054' }, delta: 12 },
          setStep(ZHONGNAN_Q07_QUEST_ID, 'chama_receive_steed'),
          openScene('scene_zn_q07_16_tranquil', ZHONGNAN_Q07_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q07_16_martial: {
    id: 'scene_zn_q07_16_martial',
    title: '第十六幕 · 追北扬威',
    subtitle: '秦州荒原 · 斩草除根',
    mandatory: true,
    beats: [
      N('你翻身上马随丘处玄一路追出三十里，将溃散的西夏游骑尽数驱过界河，夺回被掠的三十余匹耕牛与羊群！'),
      S('NPC-0216', '（大笑归剑）“痛快！有你这等果敢剑胆，何愁西夏鼠辈敢再来犯！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_17', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_16_tranquil: {
    id: 'scene_zn_q07_16_tranquil',
    title: '第十六幕 · 丹药抚民',
    subtitle: '陇右村落 · 仁心济世',
    mandatory: true,
    beats: [
      N('你随马钰玄奔入火场，以劈空掌风压灭余焰，救出被困老幼十余人，又将终南金创药与干粮分予受灾边民。满村百姓含泪跪谢终南活神仙！'),
      S('NPC-1054', '（合掌微笑）“无量寿佛。剑可护身，仁可安邦，{gender:师弟|师妹}真得玄门清静大慈之心。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_17', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_16: {
    id: 'scene_zn_q07_16',
    title: '第十六幕 · 凯旋验马阑',
    subtitle: '秦州官营茶马榷场 · 吐蕃青唐验马阑',
    mandatory: true,
    beats: [
      N('夕阳西下，众人齐聚吐蕃青唐验马阑，三百匹河曲战马毫发无损，茶马互市照常开张。'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_17', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_17: {
    id: 'scene_zn_q07_17',
    title: '第十七幕 · 瞎毡赠骏',
    subtitle: '吐蕃青唐验马阑 · 获赐河曲驹',
    mandatory: true,
    beats: [
      S('NPC-0090', '（亲自牵出那匹枣红踏雪神驹，郑重将鎏金马鞍交予你）“吐蕃汉子一言九鼎！这匹【秦州茶马上等河曲驹】日行千里、踏石如飞，从今日起便是你的坐骑！”'),
      P('（抚摸骏马鬃毛，抱拳致谢）“多谢瞎毡首领慷慨相赠！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_18', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_18: {
    id: 'scene_zn_q07_18',
    title: '第十八幕 · 边将惜别',
    subtitle: '吐蕃青唐验马阑 · 英雄相惜',
    mandatory: true,
    beats: [
      S('NPC-0045', '“今日并肩破敌，方知终南隐宗名不虚传！日后刘某镇守水洛城，若终南有召，必当相助！”'),
      S('NPC-0313', '“哈哈，等有空去长安喝酒，雷某定要再向你请教全真剑法！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_19', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_19: {
    id: 'scene_zn_q07_19',
    title: '第十九幕 · 华山邀帖',
    subtitle: '秦州驿馆 · 东来剑函',
    mandatory: true,
    beats: [
      N('众人在秦州休整之际，一名终南快马弟子自东面赶来，递上一封紫金火漆请柬。'),
      S('NPC-1054', '（拆函细阅，神色转喜）“西岳华山派掌门岳沧溟真人发来论剑请柬，邀我终南古观同赴【玉女峰紫霞道观】与【华山绝顶论剑台】，共参陈抟老祖遗留的希夷剑意！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_20', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_20: {
    id: 'scene_zn_q07_20',
    title: '第二十幕 · 真传试金石',
    subtitle: '秦州驿馆 · 晋升契机',
    mandatory: true,
    beats: [
      S('NPC-0216', '“华山派乃关中道剑同盟，此次论剑既可切磋剑道，更是你晋升【Lv.3 古观真传】的绝佳试金石！大师兄与刘师兄将亲自带你东赴潼关华山！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_21', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_21: {
    id: 'scene_zn_q07_21',
    title: '第二十一幕 · 河曲长嘶',
    subtitle: '秦州城门 · 整鞍东归',
    mandatory: true,
    beats: [
      N('你跨上新得的【秦州茶马上等河曲驹】，但觉坐骑雄健稳如磐石，丝毫不畏关中险道。'),
    ],
    onFinishEffects: [openScene('scene_zn_q07_22', ZHONGNAN_Q07_QUEST_ID)],
  },

  scene_zn_q07_22: {
    id: 'scene_zn_q07_22',
    title: '第二十二幕 · 剑指西岳',
    subtitle: '秦州官道 · 护马圆满',
    mandatory: true,
    beats: [
      P('（勒马回望秦州烽燧，复转首东望华岳）“秦州边患暂平，下一步便东赴西岳华山，会一会天下剑客！”'),
    ],
    choices: [
      {
        id: 'zn_q07_complete',
        label: '领受河曲良驹 · 圆满完成《秦州烽火 · 铁骑护马》',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'MNT-009', qty: 1 },
          { type: 'addSectContribution', amount: 130 },
          { type: 'giveSilver', amount: 120, reason: '秦州护马破夏骑嘉奖' },
          { type: 'giveCombatExp', amount: 780, reason: '完成《秦州烽火 · 铁骑护马》' },
          { type: 'modifyRenown', delta: 28, reason: '秦州古塞大破西夏劫马铁骑' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0090' }, delta: 14 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0045' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0313' }, delta: 12 },
          { type: 'completeQuest', questId: ZHONGNAN_Q07_QUEST_ID, outcome: 'saved_qinzhou_horses' },
          toast('获赠【秦州茶马上等河曲驹】，完成《秦州烽火 · 铁骑护马》！', 'success', '铁骑护马'),
        ],
      },
    ],
  },
}
