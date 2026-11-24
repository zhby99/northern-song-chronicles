import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, teachArtNow, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q07_QUEST_ID } from './shaolinLuohanDragonClawQuest'

const SPEAKER_YELV_QINGYING: StorySpeakerSpec = {
  kind: 'custom',
  name: '大辽枢密院轻功谍探 · 耶律青影',
  title: '大辽南院枢密使直属影谍',
  factionName: '大辽枢密院',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
}

const SPEAKER_XIAO_WUHEN: StorySpeakerSpec = {
  kind: 'custom',
  name: '大辽枢密院暗哨 · 萧无痕',
  title: '幽州暗桩 · 轻功细作',
  factionName: '大辽枢密院',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
}

function buildYelvQingyingCorneredBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ07_YELV_CORNERED',
    name: '大辽影谍 · 耶律青影（误入罗网）',
    title: '大辽影谍首领 · 退路已断',
    realm: '二流上品',
    factionId: 'SECT-31',
    factionName: '大辽枢密院',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“不可能！你怎会看穿北墙松烟墨饵、提前堵死西南折竹崖口？！别想活捉我！”',
    stats: { hp: 1800, mp: 1180, agi: 60, res: 38 },
    talents: { bone: 74, comprehension: 75, charm: 56 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-146', move2: 'MA-155' },
    learnedArts: [{ artId: 'MA-243', level: 6 }, { artId: 'MA-146', level: 6 }, { artId: 'MA-155', level: 5 }],
  })
}

function buildYelvQingyingBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ07_YELV_QINGYING',
    name: '大辽枢密院轻功谍探 · 耶律青影',
    title: '大辽影谍首领 · 软甲飞檐客',
    realm: '二流上品',
    factionId: 'SECT-31',
    factionName: '大辽枢密院',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“少林小僧好利的一双眼睛！可惜我身披幽州冰蚕软甲、足踏瞬息千里步，这世上还没人能留住我耶律青影！”',
    stats: { hp: 2050, mp: 1320, agi: 66, res: 42 },
    talents: { bone: 76, comprehension: 78, charm: 56 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-146', move2: 'MA-155' },
    learnedArts: [{ artId: 'MA-243', level: 7 }, { artId: 'MA-146', level: 7 }, { artId: 'MA-155', level: 6 }],
  })
}

function buildXiaoWuhenSpy(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ07_XIAO_WUHEN',
    name: '大辽枢密院暗哨 · 萧无痕',
    title: '幽州拓图细作 · 毒镖暗哨',
    realm: '二流中品',
    factionId: 'SECT-31',
    factionName: '大辽枢密院',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“头领带着拓片先走，这小和尚交给我用透骨暗器拖住！”',
    stats: { hp: 1420, mp: 920, agi: 58, res: 32 },
    talents: { bone: 68, comprehension: 70, charm: 48 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-155', move2: 'MA-146' },
    learnedArts: [{ artId: 'MA-243', level: 6 }, { artId: 'MA-155', level: 6 }, { artId: 'MA-146', level: 5 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq07_01: {
    id: 'scene_slq07_01',
    title: '第一幕 · 秦王碑异',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('{reignYear}隆冬，少室山寒霜凝瓦。清晨你于【东庑碑帖武库院】拂拭历代唐碑，行至《太宗赐少林寺教碑》（俗称秦王碑）前脚步陡顿——常人只赏碑阳御书龙蛇飞动，你却因深谙翰墨拓印，嗅出碑阴石缝残留着一丝幽州松烟墨混杂胡蜡的异香！'),
      N('你急请值守东庑的碎碑僧玄石与铁掌禅师玄痛勘验。玄石指尖拂过青苔下极浅的阴刻暗纹，向来沉稳如磐石的面庞竟倏然变色！'),
      S('NPC-0191', '（低声惊道）“阿弥陀佛！险些酿成大祸！此碑背阴夹层，乃当年太祖皇帝微服访嵩山时密令老方丈嵌刻的河朔古驿道与雁门、瓦桥关隘暗道残图，平日以厚苔与假铭掩盖，唯胡蜡热拓方能显纹！”'),
      S('NPC-0156', '（双目如电，沉声接言）“贼人昨夜被巡僧惊走，只拓下西半幅，今夜必卷土重来！能悄然越过少林七十二重夜巡者，定是大辽南院枢密院的轻功谍首，且多穿刀剑难伤的软甲。唯有传你专破轻功软甲的《龙爪手》，再秘勘贼踪张网活捉，方能追回拓片、挖出中原暗桩！”'),
    ],
    choices: [
      {
        id: 'slq07_accept_cautious',
        label: '【谋定后动】合十请缨，先随二位师伯合习《龙爪手》，再细勘少室疑痕请君入瓮！',
        subLabel: '承接任务，步入东庑演爪与线索勘察',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q07_stance', value: 'cautious' },
          { type: 'startQuest', questId: SHAOLIN_Q07_QUEST_ID, stepId: 'stele_claw_study' },
          setStep(SHAOLIN_Q07_QUEST_ID, 'stele_claw_study'),
          toast('已承接【碎碑擒龙 · 少室捉谍】！请于【东庑碑帖武库院】随玄痛、玄石合习《龙爪手》并勘察疑痕。', 'talk', '碎碑擒龙'),
        ],
      },
      {
        id: 'slq07_accept_fierce',
        label: '【铁爪镇疆】合十请缨，誓练成《龙爪手》撕甲锁脉、叫大辽细作有来无回！',
        subLabel: '承接任务，步入东庑演爪与线索勘察',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q07_stance', value: 'fierce' },
          { type: 'startQuest', questId: SHAOLIN_Q07_QUEST_ID, stepId: 'stele_claw_study' },
          setStep(SHAOLIN_Q07_QUEST_ID, 'stele_claw_study'),
          toast('已承接【碎碑擒龙 · 少室捉谍】！请于【东庑碑帖武库院】随玄痛、玄石合习《龙爪手》并勘察疑痕。', 'talk', '碎碑擒龙'),
        ],
      },
    ],
  },

  scene_slq07_02: {
    id: 'scene_slq07_02',
    title: '第二幕 · 碎碑授爪',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    illustrationUrl: '/assets/quests/sl_07_stele_mist.jpg',
    illustrationCaption: '碎碑擒龙 · 东庑古碑寒雾缭绕，玄石与玄痛五指成爪示范少林绝技《龙爪手》',
    mandatory: true,
    beats: [
      N('午后寒雾低垂，武库院后坪堆着十余块坚硬青冈岩废碑。玄石五指微曲如苍龙探爪，指节爆响如炒豆，凌空虚抓三寸陡然扣落碑棱——“咔嚓”闷响中，硬如铁铸的青石竟被生生抠下五道寸深指沟！'),
      S('NPC-0191', '“看清了！少林《龙爪手》三十六式，全凭一气贯指——「拿云」「捉月」「批亢」「捣虚」，讲究后发先至、如影随形，纵是冰蚕软甲亦难挡裂碑爪劲！”'),
      S('NPC-0156', '（紧接上步，双爪寒雾中拉出重重青影）“玄石展的是「碎碑裂甲」刚劲，贫僧演的则是「锁脉擒龙」巧劲！辽谍轻功再快，纵跃前必有提气刹那之滞，你盯死肩井、曲池、腕脉三穴，一爪扣实便叫他插翅难飞！”'),
      N('你将书法运笔之提按顿挫融入爪法流转，在二位高僧轮番喂招下苦练至暮；晚钟响起之际，你一招「捕风捉影」疾探而出，五指稳稳凌空扣住玄石抛来的旋飞铁胆，铁壳竟印出五道浅沟！玄石抚须大笑，赞你已得《龙爪手》真味。'),
    ],
    choices: [
      {
        id: 'slq07_inspect_traces',
        label: '谢过二位师伯传艺，趁暮色未沉前往塔林、碑廊与后院勘察辽谍疑痕',
        subLabel: '当场习得地阶擒拿绝技《龙爪手》(MA-062)，随即勘察三处可疑线索',
        tone: 'gold',
        effects: [
          teachArtNow('MA-062'),
          openScene('scene_slq07_03_clues', SHAOLIN_Q07_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq07_03_clues: {
    id: 'scene_slq07_03_clues',
    title: '第三幕 · 少室夜痕',
    subtitle: '少室山塔林 · 碑廊 · 藏经院外 · 香积厨',
    mandatory: true,
    beats: [
      N('习得《龙爪手》后，玄痛并未急着盲目布防，而是领你循昨夜巡僧惊走贼人的方向，细细勘察塔林与东庑周边留下的三处可疑痕迹——'),
      N('【其一 · 东厢碑林松烟墨渍】：自《秦王碑》背阴往北，东厢石阶上竟洒着一串清晰可见的湿润幽州松烟墨滴，一路直指北墙缺口。可你俯身细量，每滴墨点间距竟匀称得宛如步尺量过，边缘更无仓皇奔跑时的斜甩溅尾。'),
      N('【其二 · 藏经院外西风折竹与马蹄暗铁钉印】：少室冬日刮劲西风，藏经院西南角枯竹大多顺风向东倾折，唯独两竿竹梢被利刃逆风平削、斜指西南荒崖；崖下乱草泥土中赫然印着三枚呈「品」字排布的塞外辽马防滑暗铁钉印，崖口枯枝上更悄然系着一束未曾点燃的干艾草结。'),
      N('【其三 · 香积厨柴垛灰烬】：香积厨后墙柴垛边留着半碗冷透的松枝灰烬，灰堆旁横放两根交叉半焦木炭。你拈灰细嗅，仅有潮湿柴草与焦泥味，全无幽州松烟胡蜡异香，倒像是昨夜烧火伙夫烤干湿鞋时随手拨出的余烬。'),
    ],
    onFinishEffects: [openScene('scene_slq07_04_deduce', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_04_deduce: {
    id: 'scene_slq07_04_deduce',
    title: '第四幕 · 夜雾辨谍',
    subtitle: '东庑碑帖武库院 · 三更布网推演',
    mandatory: true,
    beats: [
      N('暮色彻底沉落，浓重寒雾自少室山谷翻涌而上。玄石已将《秦王碑》背阴残屑轻拂复原、涂以淡苔水作饵，巡夜僧亦按密令于三更刻意延缓半刻入东庑。'),
      S('NPC-0156', '（目光如炬望向你，语气沉凝）“大辽影谍素来狡诈，往往虚实相间、以暗哨诱敌。我与玄石师弟将在外围封锁寺门，但三更雾浓十步不辨人影，若捉谍之网撒错方位，必被暗哨拖住、反叫贼首携拓片遁走！”'),
      S('NPC-0156', '“三处疑痕你皆已亲眼勘过。师侄以为，大辽影谍今夜得手或败露后，真正的潜逃路线与接头暗号究在何处？”'),
    ],
    choices: [
      {
        id: 'slq07_deduce_north',
        label: '【守死北墙墨迹】断定贼首必循东厢北阶湿墨原路翻墙北逃，以松烟墨痕为号接应',
        subLabel: '定策于东厢北墙缺口布防，静候三更收网',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q07_spy_trapped', value: false },
          setStep(SHAOLIN_Q07_QUEST_ID, 'midnight_spy_trap'),
          toast('已定下三更布防方位！可整备《龙爪手》招式，随后于【东庑碑帖武库院】开启寒雾捉谍！', 'talk', '碎碑擒龙'),
        ],
      },
      {
        id: 'slq07_deduce_southwest',
        label: '【截断西南竹崖】断定北阶墨痕乃诱饵，贼首必循折竹暗钉印遁往西南荒崖、以艾草结接头',
        subLabel: '定策抢占藏经院西南折竹险崖截道，静候三更收网',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q07_spy_trapped', value: true },
          setStep(SHAOLIN_Q07_QUEST_ID, 'midnight_spy_trap'),
          toast('已定下三更布防方位！可整备《龙爪手》招式，随后于【东庑碑帖武库院】开启寒雾捉谍！', 'talk', '碎碑擒龙'),
        ],
      },
      {
        id: 'slq07_deduce_kitchen',
        label: '【暗伏香积厨外】断定柴垛交叉木炭乃内应暗号，贼首必潜入厨院会合后再借道脱身',
        subLabel: '定策潜伏香积厨柴垛暗影候敌，静候三更收网',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q07_spy_trapped', value: false },
          setStep(SHAOLIN_Q07_QUEST_ID, 'midnight_spy_trap'),
          toast('已定下三更布防方位！可整备《龙爪手》招式，随后于【东庑碑帖武库院】开启寒雾捉谍！', 'talk', '碎碑擒龙'),
        ],
      },
    ],
  },

  scene_slq07_05_net: {
    id: 'scene_slq07_05_net',
    title: '第五幕 · 三更布网 · 截谍三策',
    subtitle: '东庑碑帖武库院 · 三更寒雾（擒谍抉择）',
    mandatory: true,
    beats: [
      N('梆——梆——梆！三更梆子声落，少室山雾浓如乳。半柱香后，东庑飞檐悄然飘落两道青黑身影，足尖点霜竟无半点声息！蒙面瘦削头领腰悬幽州拓囊，身旁矮壮暗哨紧盯碑林四周，正是大辽影谍【耶律青影】与暗哨【萧无痕】！'),
      S(SPEAKER_XIAO_WUHEN, '（低声疾语）“青影大人，少林巡僧果然未觉昨夜拓痕！属下望风，您速将东半幅河朔关隘暗图拓完！”'),
      N('油绢将贴碑阴之际，你自古柏暗影踏步而出，一招「拨云见日」凌空攥碎萧无痕暴射而来的三枚淬蓝毒镖！高墙外适时响起玄痛、玄石封锁寺门的宏亮佛号——耶律青影瞳孔骤缩，与萧无痕顷刻分路突围！'),
      N('{ifFlag:sl_q07_spy_trapped|你冷然一笑——果然不出所料！萧无痕故意朝东厢北墙墨迹狂奔引敌，怀揣西半幅拓片的耶律青影却借寒雾折身直扑藏经院西南折竹险崖！|雾色森茫，萧无痕已横身喷镖抢先断后，耶律青影足踏《瞬息千里》化作青影欲破雾远遁！电光石火间，当即决断捉谍之法！}'),
    ],
    choices: [
      {
        id: 'slq07_trap_claw',
        label: '【龙爪截道请君入瓮】不理北墙诱饵暗哨，直扑西南折竹险崖迎头单擒耶律青影！',
        subLabel: '提前识破诱饵！免战暗哨萧无痕，1v1 迎战误入罗网的耶律青影',
        tone: 'jade',
        condition: {
          type: 'flag',
          flag: 'sl_q07_spy_trapped',
          op: 'truthy',
          label: '已于勘察中识破辽谍真实潜逃路线与艾草结暗号',
        },
        effects: [openScene('scene_slq07_06_trapped', SHAOLIN_Q07_QUEST_ID)],
      },
      {
        id: 'slq07_trap_chase',
        label: '【轻功追风硬截】催动绝顶身法踏檐疾掠，硬生生甩脱暗哨萧无痕、单挑耶律青影！',
        subLabel: '凭高超身法甩开暗哨，1v1 正面力擒耶律青影',
        tone: 'primary',
        condition: { type: 'combatStatAtLeast', key: 'agility', min: 50 },
        effects: [openScene('scene_slq07_07_chase', SHAOLIN_Q07_QUEST_ID)],
      },
      {
        id: 'slq07_trap_assault',
        label: '【正面搜林破伏】循雾直闯碑林合击圈，车轮连战暗哨萧无痕与谍首耶律青影！',
        subLabel: '零门槛正面血战；车轮连战萧无痕（二流中品）与耶律青影（二流上品）',
        tone: 'danger',
        effects: [openScene('scene_slq07_08_assault', SHAOLIN_Q07_QUEST_ID)],
      },
    ],
  },

  scene_slq07_06_trapped: {
    id: 'scene_slq07_06_trapped',
    title: '第六幕 · 请君入瓮',
    subtitle: '藏经院西南折竹险崖 · 1v1 擒谍',
    mandatory: true,
    beats: [
      N('你任由北墙外玄石师伯去收拾充当诱饵的萧无痕，自己早已沿着暗记抄近路抢抵藏经院西南荒崖！寒雾中马嘶隐约，崖口那束干艾草结在夜风中微微晃动——下一瞬，一道青影果真如约掠至崖边！'),
      S(SPEAKER_YELV_QINGYING, '（撞见横立枯竹间的你，骇然倒退两步，手中鹰爪寒光乍现）“你……北墙那串松烟墨滴分明是我亲手布下的诱饵，你怎会识破折竹暗钉印与艾草结？！休想留我！”'),
      P('（十指曲张如铁钩，步步封死崖口退路）“大辽影谍好心机，可惜西风东折独两竹逆削，瞒不过少林罗汉堂的眼睛！交出河朔拓片，随贫僧受缚罢！”'),
    ],
    choices: [
      {
        id: 'slq07_fight_yelv_trapped',
        label: '运使《龙爪手》1v1 生擒退路已断的【耶律青影】（二流上品）',
        subLabel: '诱饵已破、暗哨已甩开，迎战措手不及的辽谍首领',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYelvQingyingCorneredBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '耶律青影怀揣河朔边防拓片，此刻已入死地，绝不可放其坠崖遁逃！',
            introText: '【请君入瓮 · 碎碑擒龙】于西南折竹险崖 1v1 活捉大辽影谍【耶律青影（二流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq07_09_interrogate', SHAOLIN_Q07_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '耶律青影困兽犹斗轻功诡谲，幸得玄痛师伯及时截援！调息后可再赴【东庑碑帖武库院】续战。',
                'warn',
                '碎碑擒龙',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq07_07_chase: {
    id: 'scene_slq07_07_chase',
    title: '第六幕 · 追风硬截',
    subtitle: '东庑碑林高檐 · 1v1 截杀',
    mandatory: true,
    beats: [
      N('你足尖连点古碑顶端，身法快得竟在浓雾中拉出一道残影！萧无痕洒出的漫天透骨暗器悉数落空，你已斜掠而出，硬生生在东庑西侧高檐前抢先截住全速奔逃的耶律青影！'),
      S(SPEAKER_YELV_QINGYING, '（被迫凌空翻身落地，眼中惊疑化作凌厉杀机）“好俊的少林轻功！甩开我手下暗哨又如何？凭我身披幽州冰蚕软甲，单挑照样拆了你的爪骨！”'),
      P('（稳踏霜瓦，十指真气灌注发出龙吟低鸣）“今日便叫你见识，我少林《龙爪手》如何撕你冰蚕软甲、锁你契丹脉门！”'),
    ],
    choices: [
      {
        id: 'slq07_fight_yelv_chase',
        label: '运使《龙爪手》1v1 正面迎战大辽影谍【耶律青影】（二流上品）',
        subLabel: '已甩脱暗哨纠缠，正面单擒耶律青影',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYelvQingyingBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '已截住耶律青影去路，此刻退步则河朔关防秘图落入大辽之手！',
            introText: '【追风硬截 · 碎碑擒龙】于碑林寒雾中 1v1 迎战大辽影谍【耶律青影（二流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq07_09_interrogate', SHAOLIN_Q07_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '耶律青影鹰爪狠辣轻功诡魅，幸得玄痛、玄石师伯逼退敌踪！调息后可再赴【东庑碑帖武库院】续战。',
                'warn',
                '碎碑擒龙',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq07_08_assault: {
    id: 'scene_slq07_08_assault',
    title: '第六幕 · 雾林破伏',
    subtitle: '东庑碑帖武库院 · 车轮捉谍',
    mandatory: true,
    beats: [
      N('寒雾翻腾，碑影幢幢。你直闯碑林正中，萧无痕立刻借唐碑掩护横身扑出，双袖毒镖连发如雨；而耶律青影则绕碑游走，准备趁你被暗哨缠住之际一举击杀脱身！'),
      S(SPEAKER_YELV_QINGYING, '（冷笑喝令）“无痕，先用透骨镖耗他真气！待他露了破绽，我亲自一爪洞穿他咽喉！”'),
      P('（双足稳钉青石，十指曲张如铁钩）“休想走脱一人！今日便在东庑碑林之内，以《龙爪手》连擒尔等双谍！”'),
    ],
    choices: [
      {
        id: 'slq07_fight_spies',
        label: '雾林破伏！车轮连战暗哨【萧无痕】与谍首【耶律青影】（二流中品 → 二流上品）',
        subLabel: '硬破大辽双谍联手合击，追回河朔秘图',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXiaoWuhenSpy() },
            extraOpponents: [{ kind: 'custom', npc: buildYelvQingyingBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '大辽影谍怀揣河朔边防拓片，此刻绝不可放其逃出东庑！',
            introText: '【碎碑擒龙 · 雾林破伏】车轮连战暗哨【萧无痕（二流中品）】与【耶律青影（二流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq07_09_interrogate', SHAOLIN_Q07_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '辽谍轻功诡谲合击凌厉，幸得玄痛、玄石二位师伯及时现身逼退敌踪！调息后可再赴【东庑碑帖武库院】续战。',
                'warn',
                '碎碑擒龙',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq07_09_interrogate: {
    id: 'scene_slq07_09_interrogate',
    title: '第七幕 · 撕甲擒龙 · 拷问抉择',
    subtitle: '东庑碑帖武库院 · 审讯裁断',
    illustrationUrl: '/assets/quests/sl_07_dragon_claw_capture.jpg',
    illustrationCaption: '碎碑擒龙 · 三更寒雾间《龙爪手》撕裂幽州软甲，一爪扣脉生擒辽谍耶律青影',
    mandatory: true,
    beats: [
      N('激斗数十合，耶律青影见势不妙猛催轻功欲拔身冲檐！千钧一发之际，你身随爪走，一式《龙爪手》绝杀「苍龙探海」后发先至——“嗤啦”一声锦帛撕裂脆响，号称强弩难穿的幽州冰蚕软甲竟被你硬生生撕开五道裂口，五指顺势锁死其大椎与肩井双穴，将其凌空掼回青石坪！'),
      N('玄痛、玄石率武僧点亮火把合围而至，萧无痕亦已被外围拿获。你自耶律青影怀中搜出尚带松烟气息的西半幅河朔关隘拓片与一枚契丹枢密院铜牌，两幅秘图终于丝毫未泄！'),
      S(SPEAKER_YELV_QINGYING, '（冷笑吐血，神色桀骜）“要杀便杀！想从我口中撬出南院枢密院在河朔与开封的暗桩名录，你们这群中原秃驴休想！”'),
      S('NPC-0156', '（冷目凝视被缚辽谍，侧首征询你）“此人乃大辽核心影谍，须转交开封府与六扇门深查。只是交官之前，是依佛门慈悲以禅理因果动其心神、保全经脉留全活口密报开封府以利招降审讯；还是趁其心神剧震以龙爪劲严刑逼供撬出暗桩，顺势废其武功以绝劫囚后患？”'),
    ],
    choices: [
      {
        id: 'slq07_verdict_spare',
        label: '【禅理感化 · 留口密报】不动私刑，以佛法点破兵祸因果，保全其身密送开封府六扇门！',
        subLabel: '守佛门戒律、留全活口供朝廷深挖内线（禅心慈悲 +2）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q07_spy_spared', value: true },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
          openScene('scene_slq07_10_reseal', SHAOLIN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'slq07_verdict_cripple',
        label: '【严刑逼供 · 废功交官】以分筋错骨逼问中原暗桩下落，再震废其气海武功押交官府！',
        subLabel: '雷霆护疆、速撬密情并永绝辽谍复起之患（怒目杀业 +2）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q07_spy_crippled', value: true },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
          openScene('scene_slq07_10_reseal', SHAOLIN_Q07_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq07_10_reseal: {
    id: 'scene_slq07_10_reseal',
    title: '第八幕 · 重封唐碑 · 朝阳传灯',
    subtitle: '东庑碑帖武库院 · 碑林朝阳',
    illustrationUrl: '/assets/quests/sl_07_map_preserved.jpg',
    illustrationCaption: '山河无恙 · 朝阳映照东庑唐碑，西半幅拓片焚毁归尘，玄痛与玄石合授《龙爪手》全本',
    mandatory: true,
    beats: [
      N('朝阳跃出嵩岳云海，将东庑碑林染作金红。玄痛当众以长明香火将那半幅油绢拓片焚作青烟，确保大宋河朔关防秘图永绝外泄之虞。'),
      S('NPC-0156', '（神色凝重而赞许）“{ifFlag:sl_q07_spy_spared|你守戒不动私刑，反以佛法因果感化，耶律青影临押往开封府六扇门前终究动容吐露了两处河朔暗桩，真乃上策！|你以铁腕撬出暗桩下落并废去其气海武功，虽显凌厉，却也彻底绝了大辽半路劫囚灭口之患，足保边防机密无虞！}”'),
      N('玄石取来秘制青石泥浆与经文刻刀，邀你运使深厚书法功底于《秦王碑》背阴补刻一段《心经》偈文。石屑纷飞间，古朴苍劲的唐楷笔意天衣无缝地将古驿道暗图重新隐没于碑石之中。'),
      S('NPC-0191', '（与玄痛一同捧出一卷装帧古朴的《龙爪手三十六式秘录》）“今夜你以文眼识辽墨、以武爪擒谍首，此卷少林七十二绝技真传，你当之无愧！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_11_complete', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_11_complete: {
    id: 'scene_slq07_11_complete',
    title: '第九幕 · 功成东庑',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('晨光照暖东庑唐碑。{ifFlag:sl_q07_spy_trapped|玄痛师伯尤对你三更前识破北墙假墨、锁定西南折竹暗钉印与艾草结的奇谋赞不绝口，直言你已有统领罗汉堂战阵之才。|玄痛师伯嘉许你寒雾激战中临危不乱、撕甲扣脉生擒二流上品大辽影谍，已尽得罗汉堂擒王绝学神髓。}'),
      P('（双手合十接过《龙爪手》全本秘录，深深一揖）“多谢二位师伯传法与信任！以佛经护山河、以武艺止干戈，弟子定当永铭于心！”'),
      S('NPC-0191', '（微笑颔首）“去吧。待你再加潜修、禅心筋骨圆满，便有资格步入罗汉堂正殿，挑战那座名震天下的「十八铜人三才六合大阵」，叩开少林真传之门了！”'),
    ],
    choices: [
      {
        id: 'slq07_complete',
        label: '恭谨受领《龙爪手》全本秘录，圆满完成【碎碑擒龙 · 少室捉谍】',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-062' },
          {
            type: 'giveCombatExp',
            amount: 420,
            reason: '东庑习得《龙爪手》，三更寒雾生擒大辽枢密院谍探耶律青影并保全河朔秘图',
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q07_spy_trapped', op: 'truthy' },
            thenEffects: [
              { type: 'addSectContribution', amount: 190 },
              { type: 'modifyRenown', delta: 25, reason: '识破辽谍诱饵请君入瓮活捉耶律青影，名动少林' },
            ],
            elseEffects: [
              { type: 'addSectContribution', amount: 160 },
              { type: 'modifyRenown', delta: 15, reason: '少室寒雾以龙爪手活捉大辽枢密院影谍耶律青影' },
            ],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q07_spy_spared', op: 'truthy' },
            thenEffects: [
              { type: 'modifyChivalry', delta: 25, reason: '擒辽谍而守佛门戒律，禅理感化密报朝廷' },
            ],
            elseEffects: [
              { type: 'giveSilver', amount: 50, reason: '开封府六扇门嘉奖速破大辽暗桩酬银' },
            ],
          },
          { type: 'modifySkill', key: '书', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0156' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0191' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_Q07_QUEST_ID, outcome: 'completed' },
          toast(
            '【碎碑擒龙 · 少室捉谍】圆满完成！精修《龙爪手》，获实战经验、门派贡献、书法与经义提升！',
            'success',
            '罗汉堂脉',
          ),
        ],
      },
    ],
  },
}
