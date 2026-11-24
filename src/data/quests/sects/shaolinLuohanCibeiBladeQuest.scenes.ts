import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, teachArtNow, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q05_QUEST_ID } from './shaolinLuohanCibeiBladeQuest'

const SPEAKER_VILLAGE_ELDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '颍阳镇保正 · 老周',
  title: '嵩阳颍阳镇乡老',
  factionName: '河洛百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_PEASANT_BANDIT: StorySpeakerSpec = {
  kind: 'custom',
  name: '胁从饥民 · 赵老五',
  title: '颍阳荒年流民',
  factionName: '河洛饥民',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_BANDIT_VANGUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '疤面焦五',
  title: '河洛刀匪副头目',
  factionName: '河洛绿林悍匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_TUSAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '豁口屠夫 · 屠三',
  title: '河洛刀匪首',
  factionName: '河洛绿林悍匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

function buildPeasantRaiderAlpha(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ05_PEASANT_A',
    name: '胁从饥民 · 赵老五',
    title: '被逼持刀的河洛流民',
    realm: '三流中品',
    factionName: '河洛饥民',
    avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
    talk: '“大师莫怪！屠三爷押着俺娘俩在西山坳里，不抢这车义粮俺全家都得活活饿死！”',
    stats: { hp: 560, mp: 180, agi: 26, res: 16 },
    talents: { bone: 50, comprehension: 38, charm: 35 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-207', move2: 'MA-209' },
    learnedArts: [{ artId: 'MA-238', level: 3 }, { artId: 'MA-207', level: 4 }, { artId: 'MA-209', level: 3 }],
  })
}

function buildPeasantRaiderBeta(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ05_PEASANT_B',
    name: '胁从饥民 · 刘铁柱',
    title: '被逼持刀的河洛庄稼汉',
    realm: '三流中品',
    factionName: '河洛饥民',
    avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
    talk: '“俺只求抢两斗糙米活命，大和尚快闪开，莫叫朴刀伤了你！”',
    stats: { hp: 600, mp: 170, agi: 24, res: 18 },
    talents: { bone: 54, comprehension: 35, charm: 34 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-209', move2: 'MA-207' },
    learnedArts: [{ artId: 'MA-238', level: 3 }, { artId: 'MA-209', level: 4 }, { artId: 'MA-207', level: 3 }],
  })
}

function buildBanditVanguard(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ05_BANDIT_VANGUARD',
    name: '疤面焦五',
    title: '河洛悍匪压阵头目',
    realm: '三流上品',
    factionName: '河洛绿林悍匪',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“泥腿子全被这秃驴吼散了！弟兄们抄家伙，先砍断这小和尚两条腿！”',
    stats: { hp: 760, mp: 260, agi: 32, res: 20 },
    talents: { bone: 60, comprehension: 42, charm: 28 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-191', move2: 'MA-209' },
    learnedArts: [{ artId: 'MA-238', level: 4 }, { artId: 'MA-191', level: 4 }, { artId: 'MA-209', level: 4 }],
  })
}

function buildTuSanBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ05_TUSAN',
    name: '豁口屠夫 · 屠三',
    title: '河洛刀匪首 · 凶悍刀客',
    realm: '二流下品',
    factionName: '河洛绿林悍匪',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“秃驴好大的狗胆！敢挡老子截粮财路，尝尝这口饮过十三条人命的豁口鬼头刀！”',
    stats: { hp: 1180, mp: 680, agi: 44, res: 28 },
    talents: { bone: 70, comprehension: 52, charm: 32 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-151', move2: 'MA-191' },
    learnedArts: [{ artId: 'MA-140', level: 5 }, { artId: 'MA-151', level: 6 }, { artId: 'MA-191', level: 6 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq05_01: {
    id: 'scene_slq05_01',
    title: '第一幕 · 东庑论刀',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('{reignYear}早春，少室山残雪初融。你既已剃度晋升内门、归入罗汉堂脉，清晨闻板声步入【东庑碑帖武库院】。青瓦飞檐下乌木兵器架寒光内敛，唯正中石案横放两柄厚背圆锋、重达七斤三两的熟铁戒刀。'),
      S('NPC-0126', '（立于唐碑之侧，见你合十行礼，目光沉厚欣慰）“阿弥陀佛。你在少室南麓{ifFlagEq:sl_q02_choice=fist|以伏虎拳贴身擒霸|以齐眉棍封桥止争}，大雄殿前答辩又显{ifFlagEq:sl_q04_debate_choice=prajna|般若通透气象|金刚护法之志}。既入我罗汉堂，须知沙场护法虽重雷霆霹雳，第一义却在「止戈」二字。”'),
      S('NPC-0192', '（睁目拂过钝口戒刀，声音如铁石相击）“世人皆谓刀出必饮血，唯我少林七十二绝技之《慈悲刀法》，刀势如狂澜怒涛，落处却专以刀背卸兵、以刀面点脉留一线生机。今日由玄苦师兄作证，贫僧将此刀法传你。”'),
      N('话音未落，一名知客僧仓皇奔入东庑急报：山脚颍阳镇遭河洛悍匪「豁口屠夫」屠三率众逼劫义仓，贼首更押走西洼村老幼作质，驱赶数十名灾年饥民持刀打头阵！玄灭按刀而起，凝目问你临阵动刀当守何念——'),
    ],
    choices: [
      {
        id: 'slq05_accept_mercy',
        label: '【护生止戈】宁滞己锋不伤无辜百姓，求学《慈悲刀法》下山度寇！',
        subLabel: '承接任务，以刀背卸兵、化民止杀为首要刀意',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q05_blade_vow', value: 'mercy' },
          { type: 'startQuest', questId: SHAOLIN_Q05_QUEST_ID, stepId: 'cibei_blade_study' },
          setStep(SHAOLIN_Q05_QUEST_ID, 'cibei_blade_study'),
          toast('已承接【东庑刀鸣 · 慈悲度寇】！请于【东庑碑帖武库院】随玄灭演习《慈悲刀法》。', 'talk', '慈悲刀法'),
        ],
      },
      {
        id: 'slq05_accept_wrath',
        label: '【雷霆震恶】擒贼先擒王、以金刚威势立破匪阵，求学《慈悲刀法》速援颍阳！',
        subLabel: '承接任务，以沙场护法、雷霆擒首为首要刀意',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q05_blade_vow', value: 'wrath' },
          { type: 'startQuest', questId: SHAOLIN_Q05_QUEST_ID, stepId: 'cibei_blade_study' },
          setStep(SHAOLIN_Q05_QUEST_ID, 'cibei_blade_study'),
          toast('已承接【东庑刀鸣 · 慈悲度寇】！请于【东庑碑帖武库院】随玄灭演习《慈悲刀法》。', 'talk', '慈悲刀法'),
        ],
      },
    ],
  },

  scene_slq05_02: {
    id: 'scene_slq05_02',
    title: '第二幕 · 东庑刀鸣',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    illustrationUrl: '/assets/quests/sl_05_east_corridor_blade.jpg',
    illustrationCaption: '东庑刀鸣 · 玄灭于唐碑青石间传授《慈悲刀法》，刀光如雪而不伤落叶',
    mandatory: true,
    beats: [
      N('东庑青石坪寒风卷动松针。玄灭提铁戒刀步入阵心，手腕一翻，厚重刀身骤然化作绵密如雪的青芒！奇的是刀风拂过廊前枯枝，落叶随气劲盘旋翻飞，却无一片被锋刃斩断。'),
      S('NPC-0192', '“看清了！第一式「礼敬诸佛」以刀背画圆化敌狂力；第十四式「普渡众生」斜切敌腕脉门而不伤筋骨；第三十六式「回头是岸」借敌重劈之势反震虎口！{ifFlagEq:sl_q05_blade_vow=mercy|你既立护生之念，更须体悟刀背寸劲之柔|你虽志在雷霆擒王，亦不可忘刀重意轻之法}！”'),
      N('你接过沉甸甸的熟铁戒刀，默运内息将三十六路刀意逐式试演。起初三式刀风劈得石屑微扬，至第七式心神骤宁，一记「回风度厄」竟稳稳托住飘落残叶、轻送至唐碑檐角，分毫未损！'),
      S('NPC-0126', '（抚须颔首）“半个时辰便摸到「刚中含慈」门径！事不宜迟，颍阳镇距山门三十余里，你且择一精要略作凝神熟记，整理行装后即刻随玄灭下山！”'),
    ],
    choices: [
      {
        id: 'slq05_drill_back',
        label: '【凝神刀背卸力】反复体悟「礼敬诸佛」圆转震劲，备战卸兵度民',
        subLabel: '当场习得《慈悲刀法》(MA-114)，整装待发驰援颍阳镇',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q05_drill_focus', value: 'back' },
          teachArtNow('MA-114'),
          setStep(SHAOLIN_Q05_QUEST_ID, 'yingyang_mercy'),
          toast('已习得少林绝技《慈悲刀法》！可先装配招式，再于【东庑碑帖武库院】随玄灭驰赴颍阳镇！', 'success', '慈悲刀法'),
        ],
      },
      {
        id: 'slq05_drill_pulse',
        label: '【凝神回风截脉】反复演练「回头是岸」碎腕擒首，直指悍匪屠三',
        subLabel: '当场习得《慈悲刀法》(MA-114)，整装待发驰援颍阳镇',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q05_drill_focus', value: 'pulse' },
          teachArtNow('MA-114'),
          setStep(SHAOLIN_Q05_QUEST_ID, 'yingyang_mercy'),
          toast('已习得少林绝技《慈悲刀法》！可先装配招式，再于【东庑碑帖武库院】随玄灭驰赴颍阳镇！', 'success', '慈悲刀法'),
        ],
      },
    ],
  },

  scene_slq05_03: {
    id: 'scene_slq05_03',
    title: '第三幕 · 义仓乱局 · 三策破阵',
    subtitle: '嵩阳颍阳镇 · 义仓前街（战阵抉择）',
    mandatory: true,
    beats: [
      N('暮色四合，你与玄灭借轻功疾驰三十里赶抵颍阳镇西口。镇口木栅已断，火把映红半边寒空，保正老周正领着十余名青壮手执木叉死守义仓土墙，满面绝望。'),
      S(SPEAKER_VILLAGE_ELDER, '（见僧衣戒刀疾至，老泪纵横）“少林活菩萨可算来了！屠三那恶贼领着二十多个亡命刀匪，扣了西洼村妇孺在山坳里，硬逼着饥民打头阵抢粮，咱们实在下不去手啊！”'),
      S(SPEAKER_TUSAN, '（踞坐阵后大石，膝横豁口鬼头刀狂笑）“哪来的俩秃驴多管闲事！前面泥腿子听真——谁先砍翻这小和尚，老子赏三斗白米、放他妻儿；谁敢退半步，老子一刀剁了他全家！”'),
      S(SPEAKER_PEASANT_BANDIT, '（面黄肌瘦、握朴刀的双手剧烈发抖，泪流满面）“大师对不住了！俺娘俩全在西山坳里，不拼命全家都得死啊……”'),
      S('NPC-0192', '（目光如电扫过乱阵，沉声交底）“贫僧即刻绕往西山坳暗救妇孺、兼防左右冷箭。眼前饥民与悍匪混杂如乱麻，如何拆局破阵、直擒屠三，由你定夺！”'),
    ],
    choices: [
      {
        id: 'slq05_tactic_alms',
        label: '【慈悲施银开仓】自掏 25 两购粟分粮，以佛理辩才当场稳住饥民、孤立屠三！',
        subLabel: '扣 25 两银（败北重试不重复扣银）；免战饥民直面屠三（禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'all',
          conditions: [
            { type: 'silverAtLeast', min: 25 },
            {
              type: 'any',
              hint: '需辩才 ≥ 40 或经义 ≥ 55',
              conditions: [
                { type: 'skillAtLeast', key: '辩才', min: 40 },
                { type: 'skillAtLeast', key: '经义', min: 55 },
              ],
            },
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q05_grain_bought', op: 'falsy' },
            thenEffects: [
              { type: 'giveSilver', amount: -25, reason: '于颍阳镇义仓前自掏纹银购粟赈济饥民、化解劫粮危局' },
              { type: 'setFlag', flag: 'sl_q05_grain_bought', value: true },
            ],
            elseEffects: [],
          },
          { type: 'setFlag', flag: 'sl_q05_peasant_disarmed', value: true },
          { type: 'setFlag', flag: 'sl_q05_tactic', value: 'alms' },
          openScene('scene_slq05_04_alms', SHAOLIN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'slq05_tactic_disarm',
        label: '【刀背卸兵慈悲阵】反手横戒刀，以刀背不杀之术先卸饥民朴刀，再擒屠三！',
        subLabel: '零门槛正道破局；先以刀背缴械受胁饥民，再单挑屠三（禅心慈悲 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q05_tactic', value: 'disarm' },
          openScene('scene_slq05_05_disarm', SHAOLIN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'slq05_tactic_wrath',
        label: '【金刚震慑破阵】以罗汉狮吼杀气惊退外围饥民，正面冲阵车轮连战匪众与屠三！',
        subLabel: '零门槛铁血强攻；车轮连战匪帮头目焦五与屠三（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q05_tactic', value: 'wrath' },
          openScene('scene_slq05_06_wrath', SHAOLIN_Q05_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq05_04_alms: {
    id: 'scene_slq05_04_alms',
    title: '第四幕 · 施银散粟',
    subtitle: '颍阳镇义仓前 · 仁义化阵',
    mandatory: true,
    beats: [
      N('你收刀入鞘，大步踏上义仓青石高阶，自怀中取出二十五两纹银掷入保正老周手中，朗声运足中气喝遍火光长街：“乡亲们听真！这二十五两乃贫僧所捐赈灾银钱，今日即向保正买断义仓三百斗糙米，凡放下柴刀者，人人有粮领回！”'),
      P('“况且我少林伏魔刀僧玄灭师伯此刻已抄小道直入西山坳解救诸位家眷！屠三手上沾满血债，待劫完粮只会杀你们灭口——眼下弃刀活命，还是替恶匪送死，诸位速决！”'),
      S(SPEAKER_PEASANT_BANDIT, '（听得粮有着落、妻儿有救，手中豁口朴刀“当啷”坠地，跪在泥地里嚎啕大哭）“活佛啊！少林大师真肯掏银子救俺们活命！乡亲们快扔了刀，莫再替屠三卖命了！”'),
      N('一言如春风化冻，数十名饥民纷纷抛下柴刀涌向义仓石阶两侧，屠三苦心布置的流民人盾顷刻土崩瓦解！大石上的屠三气得青筋暴起，抡起豁口鬼头大刀狂吼着独自扑杀而来！'),
    ],
    onFinishEffects: [openScene('scene_slq05_07_tusan', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_05_disarm: {
    id: 'scene_slq05_05_disarm',
    title: '第四幕 · 刀背卸兵',
    subtitle: '颍阳镇义仓前 · 慈悲留手之战',
    mandatory: true,
    beats: [
      N('你锵然拔出熟铁戒刀，却特意反手将锋刃朝内、厚背朝外，稳步踏入噪乱阵前：“诸位乡亲莫慌！我玄灭师伯已赴西山坳营救家眷，贫僧今日只卸尔等手中兵刃，绝不伤乡亲半分皮肉！”'),
      S(SPEAKER_PEASANT_BANDIT, '（眼眶通红，咬牙挥朴刀乱劈而来）“大师莫怪，俺们若不冲，山坳里娘俩就没命了！”'),
      N('赵老五与刘铁柱一前一后拼命扑上，刀路虽乱却狠。你稳守中宫，铁戒刀化作圆融光幕，专以厚重刀背磕震虎口、巧卸朴刀！'),
    ],
    choices: [
      {
        id: 'slq05_fight_peasants',
        label: '运使《慈悲刀法》刀背卸兵，不伤性命缴械两名胁从饥民（三流中品 × 2 车轮战）',
        subLabel: '卸兵之后直面孤立的悍匪首屠三',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q05_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPeasantRaiderAlpha() },
            extraOpponents: [{ kind: 'custom', npc: buildPeasantRaiderBeta() }],
            rule: 'spar',
            forbidEscapeReason: '身后便是颍阳镇义仓与满镇老幼，退一步则粮仓失守！',
            introText: '【慈悲度寇 · 刀背卸兵】迎战被胁迫的【赵老五】与【刘铁柱】，以刀背震脱朴刀而不伤性命！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q05_peasant_disarmed', value: true },
              openScene('scene_slq05_07_tusan', SHAOLIN_Q05_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '投鼠忌器反被乱刀逼退，幸得玄灭师伯出手救回！调息后可再赴【东庑碑帖武库院】续战颍阳镇。',
                'warn',
                '慈悲度寇',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq05_06_wrath: {
    id: 'scene_slq05_06_wrath',
    title: '第四幕 · 金刚震阵',
    subtitle: '颍阳镇义仓前 · 铁血强攻（车轮连战）',
    mandatory: true,
    beats: [
      N('你双眉倒竖，将熟铁戒刀重重往青石街面一顿，“轰”的一声震碎半块石砖，旋即运足佛门狮吼真气暴喝一声：“无辜乡民速退三丈！敢替恶匪助虐者，休怪罗汉堂金刚戒刀无情！”'),
      N('雷霆般的怒喝伴着凌厉刀气轰然席卷长街！前排本就胆怯的饥民顿时吓得脸色惨白、纷纷丢刀抱头鼠窜，硬生生在火光中让出一条直通匪帮核心的血路！'),
      S(SPEAKER_BANDIT_VANGUARD, '（挥着杀猪砍刀狞笑踏出，挡在屠三身前）“小秃驴好大的煞气！流民吓跑了又如何？先接老子疤面焦五三刀，再看你有没有命见我们屠三爷！”'),
      S(SPEAKER_TUSAN, '（提刀冷笑，紧随其后封死退路）“焦五先试他斤两，老子随后拿他光头祭这口豁口鬼头刀！”'),
    ],
    choices: [
      {
        id: 'slq05_fight_wrath_gauntlet',
        label: '金刚破阵！车轮连战匪帮头目【疤面焦五】与悍匪首【屠三】（三流上品 → 二流下品）',
        subLabel: '正面硬破河洛匪阵，一举生擒首恶',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q05_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBanditVanguard() },
            extraOpponents: [{ kind: 'custom', npc: buildTuSanBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '已正面冲入河洛匪阵核心，唯有连挫焦五与屠三方能保住颍阳镇！',
            introText: '【金刚震慑 · 车轮破阵】连战河洛匪首副手【疤面焦五】与【豁口屠夫 · 屠三】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
              openScene('scene_slq05_08_victory', SHAOLIN_Q05_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '匪众凶悍、屠三刀势狂暴，幸得玄灭师伯回身接应！调息后可再赴【东庑碑帖武库院】重择破局之策。',
                'warn',
                '慈悲度寇',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq05_07_tusan: {
    id: 'scene_slq05_07_tusan',
    title: '第五幕 · 鬼头对戒刀',
    subtitle: '颍阳镇义仓前 · 1v1 生擒匪首',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q05_tactic=alms|二十五两赈灾纹银与一番肺腑禅理已将饥民尽数感化，义仓前火光之中，只余孤掌难鸣的悍匪首屠三怒目拦路！|“当啷”两声脆响，你的厚背戒刀精准震脱赵老五与刘铁柱手中朴刀，二人跌坐在地竟未破半分皮肉，余下流民见状无不弃械叩谢！}'),
      S(SPEAKER_TUSAN, '（见人盾尽失，提着豁口鬼头大刀大步踏碎青砖，煞气逼人）“装模作样的小秃驴！敢坏老子截粮大事，别指望那老和尚插手，有种跟老子单挑！”'),
      P('（横戒刀当胸，禅目澄明如水）“屠三，你屡劫乡里、挟民为盾，造孽深重。玄灭师伯此刻已在西山坳解救妇孺，今日便由贫僧一人一刀，废你凶器、拿你归案！”'),
      N('屠三大吼一声，鬼头大刀夹杂《鬼头大刀斩》与《杀猪断骨刀》的腥风猛劈而下，刀势沉雄狂暴！你深吸一口气，施展《慈悲刀法》正面迎击！'),
    ],
    choices: [
      {
        id: 'slq05_fight_tusan',
        label: '正面迎战河洛刀匪首「豁口屠夫」屠三（二流下品，1v1）',
        subLabel: '破其狂猛鬼头刀势，一举生擒归案',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q05_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTuSanBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '悍匪屠三刀势凶绝，此刻唯有正面将其生擒方能保全颍阳镇！',
            introText: '【慈悲度寇 · 生擒悍匪】一对一迎战河洛刀匪首【豁口屠夫 · 屠三（二流下品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q05_tactic', op: 'eq', value: 'alms' },
                thenEffects: [{ type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 }],
                elseEffects: [{ type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 }],
              },
              openScene('scene_slq05_08_victory', SHAOLIN_Q05_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '不敌屠三狂猛鬼头刀势，幸得玄灭回身接应！养精蓄锐后可再赴【东庑碑帖武库院】续战屠三。',
                'warn',
                '慈悲度寇',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq05_08_victory: {
    id: 'scene_slq05_08_victory',
    title: '第六幕 · 碎腕擒酋 · 战后发落',
    subtitle: '颍阳镇义仓前 · 匪首伏法',
    illustrationUrl: '/assets/quests/sl_05_yingyang_mercy.jpg',
    illustrationCaption: '慈悲度寇 · 戒刀平乱护住义仓，流民伏地拜谢，悍匪屠三伏法受擒',
    mandatory: true,
    beats: [
      N('刀光交错二十余合，屠三久攻不下使出破釜沉舟的力劈华山！你脚踏罗汉步斜滑半尺，{ifFlagEq:sl_q05_drill_focus=back|借厚重刀背圆转卸开十成蛮力|以「回头是岸」精准切震其右腕脉门}，“咔嚓”一声清脆骨响，鬼头大刀当啷坠地，屠三整条右臂脱力，被你反手点穴按跪青砖之上！'),
      S(SPEAKER_TUSAN, '（满头冷汗，咬牙喘息）“你……竟真留我一命……这少林慈悲刀法……”'),
      N('不多时，玄灭师伯押解余匪、护送西山坳中被救出的数十名妇孺平安归镇。赵老五与妻儿抱头痛哭，乡民纷纷向少林僧众叩首致谢；闻讯赶来的登封县衙捕快也拎着铁链围拢过来。'),
      S('NPC-0192', '（按刀环顾满街饥民与伏地待审的屠三，侧首问你）“恶首已擒，山坳赃册亦已搜出。按宋律可当场将屠三连同余匪押交县衙追赃严惩，官府自有赏银；亦可念其此番未伤镇民性命，禀明县尊留其活口押赴少林后山剃发劳役赎罪，并趁势在镇口设粥棚度荒。师侄，此案发落，你意下如何？”'),
    ],
    choices: [
      {
        id: 'slq05_verdict_mercy',
        label: '【剃发劳役 · 设粥度荒】留屠三活口押入后山服役赎罪，于义仓外设粥棚救济饥民！',
        subLabel: '以佛门悲智化戾气；高侠义与江湖声望（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q05_mercy_verdict', value: 'rehabilitate' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          openScene('scene_slq05_09_return', SHAOLIN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'slq05_verdict_official',
        label: '【押交官府 · 追赃严惩】将屠三与余匪连同赃册押交登封县衙明正典刑，追缴匪银！',
        subLabel: '铁面肃纪、依法严惩；多得县衙追赃酬银（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q05_mercy_verdict', value: 'official' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          openScene('scene_slq05_09_return', SHAOLIN_Q05_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq05_09_return: {
    id: 'scene_slq05_09_return',
    title: '第七幕 · 颍阳晨曦',
    subtitle: '颍阳镇义仓前 · 晨光微露',
    mandatory: true,
    beats: [
      N('东方泛白，春寒渐退。{ifFlagEq:sl_q05_mercy_verdict=rehabilitate|义仓前早已架起三口大铁锅熬煮热粥，米香飘满长街；屠三被剃去乱发戴上木枷，在众目睽睽下沉默押往少林后山柴院服役赎罪，眼中暴戾之气竟消去大半。|登封县衙捕快将屠三与疤面焦五等匪徒尽数套上铁链押入囚车，依匪巢账簿清点出大批掠来赃银，当街发还失主并拨出一份酬谢少林护镇之功，满街百姓拍手称快。}'),
      S(SPEAKER_VILLAGE_ELDER, '（捧着一碗热茶深深作揖）“多亏少林二位大师既保全了义仓与西洼村几十户乡亲，又为颍阳镇除掉心腹大患！少林慈悲，真乃河洛苍生柱石！”'),
      S('NPC-0192', '（目送长街复归宁静，神色难得露出一丝温煦）“{ifFlagEq:sl_q05_tactic=alms|先以赈银佛理不战而屈流民，再单刀擒首，兵法与禅心皆备|}{ifFlagEq:sl_q05_tactic=disarm|刀背卸流民朴刀而毫发无伤，复碎腕擒首恶，深得慈悲真味|}{ifFlagEq:sl_q05_tactic=wrath|狮吼惊退流民免其卷入刀兵，再以雷霆之势连破悍匪，颇具罗汉威仪|}。你这一战，比在东庑练十年木桩更见真章，回山向玄苦师兄复命罢。”'),
    ],
    onFinishEffects: [openScene('scene_slq05_10_complete', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_10_complete: {
    id: 'scene_slq05_10_complete',
    title: '第八幕 · 东庑授谱',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('翌晨返抵嵩山少林寺东庑碑帖武库院，玄苦尊者听罢玄灭详述颍阳镇始末，欣然自乌木案上取出一卷线装《慈悲刀法》全谱与一柄刻有「止戈」篆文的精钢戒刀，郑重颁予于你。'),
      S('NPC-0126', '“阿弥陀佛。世人只知我罗汉堂武功刚猛无匹，却不知「悲智双运、以武止戈」才是伏魔根本。{ifFlagEq:sl_q05_mercy_verdict=rehabilitate|你既能制敌，又肯设粥度荒、予恶人劳役自新之路，甚合佛心。|你既能擒首，又依宋律公断追赃、震慑河洛群宵，足见护法铁骨。}这卷《慈悲刀法》全本，今日正式归你研习！”'),
      P('（双手合十接过刀谱与止戈戒刀，深深一揖）“谢玄苦师伯、玄灭师伯慈悲成全！弟子定当勤修不辍，永铭罗汉堂止杀护法之志！”'),
    ],
    choices: [
      {
        id: 'slq05_complete',
        label: '恭谨受领《慈悲刀法》全谱，圆满完成【东庑刀鸣 · 慈悲度寇】',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-114' },
          {
            type: 'giveCombatExp',
            amount: 260,
            reason: '东庑习《慈悲刀法》并于颍阳镇化解劫粮之危、生擒悍匪屠三',
          },
          { type: 'addSectContribution', amount: 100 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q05_mercy_verdict', op: 'eq', value: 'official' },
            thenEffects: [
              { type: 'giveSilver', amount: 60, reason: '登封县衙追缴河洛匪首屠三赃银分赏' },
              { type: 'modifyChivalry', delta: 15, reason: '生擒河洛悍匪护住颍阳镇义仓' },
              { type: 'modifyRenown', delta: 10, reason: '颍阳镇严办悍匪屠三声震登封' },
            ],
            elseEffects: [
              { type: 'giveSilver', amount: 20, reason: '少林寺库嘉勉护民度寇酬银' },
              { type: 'modifyChivalry', delta: 30, reason: '颍阳镇设粥棚度荒、以佛门慈悲化匪安民' },
              { type: 'modifyRenown', delta: 25, reason: '慈悲刀度寇设粥赈灾美名传遍河洛' },
            ],
          },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q05_tactic', op: 'eq', value: 'alms' },
            thenEffects: [{ type: 'modifySkill', key: '辩才', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0192' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0126' }, delta: 10 },
          { type: 'completeQuest', questId: SHAOLIN_Q05_QUEST_ID, outcome: 'completed' },
          toast(
            '【东庑刀鸣 · 慈悲度寇】圆满完成！精修《慈悲刀法》，获实战经验、门派贡献、侠义声望与寺库酬赏！',
            'success',
            '罗汉堂脉',
          ),
        ],
      },
    ],
  },
}
