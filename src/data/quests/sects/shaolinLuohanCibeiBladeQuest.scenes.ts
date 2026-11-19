import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
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
    talk: '“大师莫怪！屠三爷押着俺娘俩在山坳里，不抢这车官粮俺全家都得饿死！”',
    stats: { hp: 560, mp: 180, agi: 26, res: 16 },
    talents: { bone: 50, comprehension: 38, charm: 35 },
    equippedArts: { neigong: 'MA-238', qinggong: 'MA-157', move1: 'MA-207', move2: 'MA-209' },
    learnedArts: [
      { artId: 'MA-238', level: 3 },
      { artId: 'MA-157', level: 2 },
      { artId: 'MA-207', level: 4 },
      { artId: 'MA-209', level: 3 },
    ],
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
    equippedArts: { neigong: 'MA-238', qinggong: 'MA-157', move1: 'MA-209', move2: 'MA-207' },
    learnedArts: [
      { artId: 'MA-238', level: 3 },
      { artId: 'MA-157', level: 2 },
      { artId: 'MA-209', level: 4 },
      { artId: 'MA-207', level: 3 },
    ],
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
    equippedArts: {
      neigong: 'MA-103',
      qinggong: 'MA-157',
      move1: 'MA-151',
      move2: 'MA-191',
      move3: 'MA-131',
    },
    learnedArts: [
      { artId: 'MA-103', level: 5 },
      { artId: 'MA-157', level: 5 },
      { artId: 'MA-151', level: 6 },
      { artId: 'MA-191', level: 6 },
      { artId: 'MA-131', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq05_01: {
    id: 'scene_slq05_01',
    title: '第一幕 · 东庑刀架',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('{reignYear}早春，少室山残雪初融。你既已剃度晋升内门并归入罗汉堂脉，清晨闻板声入【东庑碑帖武库院】听法。'),
      N('东庑青瓦飞檐下，一排排乌木兵器架寒光内敛，唯独正中石案上横放着两柄厚背无锋的熟铁戒刀。伏魔刀僧玄灭正闭目擦拭刀脊，降魔尊者玄苦负手立于唐碑之侧。'),
      S('NPC-0126', '（见你合十行礼，颔首微哂）“阿弥陀佛。你既择罗汉堂为归宿，须知我堂虽以伏魔卫道、勇猛精进著称，然首重者却非杀伐，而是「止戈」二字。”'),
      S('NPC-0192', '（缓缓睁目，目光如刀脊般沉厚）“世人皆谓刀为百兵之胆，出鞘必见血。唯我少林七十二艺中之《慈悲刀法》，刀出如风雷，落处却留一线生机。今日玄苦师兄作证，贫僧便将此门刀法传你。”'),
    ],
    onFinishEffects: [openScene('scene_slq05_02', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_02: {
    id: 'scene_slq05_02',
    title: '第二幕 · 止杀禅理',
    subtitle: '东庑碑帖武库院 · 石案前',
    mandatory: true,
    beats: [
      S('NPC-0192', '（抬手将那柄厚背铁戒刀掷于你怀中）“接刀！你且看这刀刃——厚背圆锋，虽不开血槽，重却七斤三两。运使《慈悲刀法》，若起一念嗔恚，刀势便重滞失准；唯怀悲悯之心，方能于电光石火间以刀背点脉、以刀面卸兵。”'),
      P('（双手托住冰凉沉重的铁戒刀，沉声合十）“弟子谨记师伯教诲：佛门动刀，不为断首，而为截恶止杀、度人回头！”'),
      S('NPC-0126', '“善哉！你经义已有根底，悟得甚快。然口说慈悲易，临阵见血而心不动难。且先在此随玄灭师弟研习刀路，待会儿或有实战印证之机。”'),
    ],
    onFinishEffects: [openScene('scene_slq05_03', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_03: {
    id: 'scene_slq05_03',
    title: '第三幕 · 领命习刀',
    subtitle: '东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('正说话间，一名知客僧仓皇奔入东庑，喘息禀报山脚颍阳镇乡老连夜送来急信，言及河洛悍匪「豁口屠夫」屠三纠集流民，日暮前便要强劫颍阳义仓！'),
      S('NPC-0192', '（眉峰微蹙，按刀而起）“屠三那厮惯用鬼头砍山刀，心狠手辣，更歹毒的是每逢劫掠必驱赶饥民打头阵，逼官军与义士投鼠忌器。师侄，你可愿速随贫僧演熟《慈悲刀法》起手六式，随我下山一行？”'),
    ],
    choices: [
      {
        id: 'slq05_accept',
        label: '合十领命，先于东庑演练《慈悲刀法》再随玄灭下山度寇',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q05_QUEST_ID, stepId: 'cibei_blade_study' },
          setStep(SHAOLIN_Q05_QUEST_ID, 'cibei_blade_study'),
          toast(
            '已承接【东庑刀鸣 · 慈悲度寇】！请于【东庑碑帖武库院（sl_luohan_west）】随玄灭演刀试锋。',
            'talk',
            '慈悲刀法',
          ),
        ],
      },
    ],
  },

  scene_slq05_04: {
    id: 'scene_slq05_04',
    title: '第四幕 · 东庑刀鸣',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    illustrationUrl: '/assets/quests/sl_05_east_corridor_blade.jpg',
    illustrationCaption: '东庑刀鸣 · 玄灭于唐碑青石间传授《慈悲刀法》，刀光如雪而不伤落叶',
    mandatory: true,
    beats: [
      N('东庑青石坪上，寒风卷起几片干枯松针。玄灭提刀入阵，手腕一翻，厚重铁戒刀竟化作一团绵密如雪的青芒！'),
      N('奇的是，刀风扫过廊前枯枝，落叶随气劲盘旋飞舞，却无一片被锋刃斩断！玄灭每演一式便高诵佛号，三十六路《慈悲刀法》起承转合、斜挑平抹，尽数烙印在你心眼之间。'),
      S('NPC-0192', '“看清了么？第一式「礼敬诸佛」以刀背画圆卸来力；第十四式「普渡众生」斜切敌腕脉门而不伤筋骨；第三十六式「回头是岸」借敌狂猛刀势反震其虎口！你且持刀试演一遍！”'),
    ],
    onFinishEffects: [openScene('scene_slq05_05', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_05: {
    id: 'scene_slq05_05',
    title: '第五幕 · 枯枝试锋',
    subtitle: '东庑碑帖武库院 · 演武石坪',
    mandatory: true,
    beats: [
      N('你深吸一口气，运转《罗汉伏虎功》内息贯注右臂，按玄灭所授运使铁戒刀。起初三式犹带几分刚猛杀气，刀风劈得石屑微扬；至第七式时，你默诵《金刚经》偈句，心神骤宁，刀势立时由霸道转为厚重圆融！'),
      N('一记「回风度厄」横扫而出，竟稳稳托住半空飘落的一片残叶，顺势轻送至唐碑檐角，分毫未损！'),
      S('NPC-0126', '（眼中露出赞许之色）“好悟性！短短半个时辰便摸到了「刀重意轻、刚中含慈」的门径。玄灭师弟，此子已可随你下山历练。”'),
    ],
    onFinishEffects: [openScene('scene_slq05_06', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_06: {
    id: 'scene_slq05_06',
    title: '第六幕 · 山门辞别',
    subtitle: '少室山道 · 暮色初沉',
    mandatory: true,
    beats: [
      S('NPC-0192', '“事不宜迟，颍阳镇距少室山不过三十余里，快步疾行傍晚便至。切记一事：阵前那些持朴刀的庄稼汉多是被荒年与屠三所逼，万不可伤其性命！”'),
      P('（将铁戒刀负于背后，合十应声）“弟子省得！刀背卸兵度饥民，唯那首恶屠三，弟子必以伏魔之力将其生擒！”'),
      N('玄苦目送你与玄灭并肩步出东庑。师徒二人借轻功沿少室南麓古道疾驰，暮色中已隐约望见颍阳镇方向腾起的火把微光。'),
    ],
    onFinishEffects: [openScene('scene_slq05_07', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_07: {
    id: 'scene_slq05_07',
    title: '第七幕 · 疾赴颍阳',
    subtitle: '嵩阳古道 · 义仓告急',
    mandatory: true,
    beats: [
      N('行至颍阳镇西口，只见木栅已被砍断半截，镇中保正老周正领着十余名青壮手执木叉死守义仓土墙，满面绝望。'),
      S(SPEAKER_VILLAGE_ELDER, '（见僧衣戒刀疾驰而来，几乎老泪纵横）“阿弥陀佛！少林寺的活菩萨来了！屠三那恶贼带了二十多个亡命徒，还逼着西洼村的饥民打头阵，咱们实在不敢下死手啊！”'),
    ],
    choices: [
      {
        id: 'slq05_enter_yingyang',
        label: '整肃僧衣，随玄灭踏入颍阳镇义仓前阵',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q05_QUEST_ID, 'yingyang_mercy'),
          openScene('scene_slq05_08', SHAOLIN_Q05_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq05_08: {
    id: 'scene_slq05_08',
    title: '第八幕 · 火光义仓',
    subtitle: '颍阳镇义仓前街',
    mandatory: true,
    beats: [
      N('义仓前火把乱晃，浓烟滚滚。数十名面黄肌瘦、衣衫褴褛的流民举着豁口朴刀与柴刀，在几名绿林悍匪的鞭打喝骂声中一步步逼近粮仓大门。'),
      N('阵后大石上坐着一名满脸横肉、左颊一道紫红刀疤的魁梧汉子，膝头横着一口寒光森森的豁口鬼头大刀，正是河洛悍匪「豁口屠夫」屠三！'),
      S(SPEAKER_TUSAN, '（狞笑大喝）“哪来的俩少林秃驴多管闲事！前面那帮泥腿子听好了，谁先砍翻这小和尚，老子赏他三斗白米、放了他老婆娃儿；谁敢退半步，老子一刀剁了他全家！”'),
    ],
    onFinishEffects: [openScene('scene_slq05_09', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_09: {
    id: 'scene_slq05_09',
    title: '第九幕 · 饥民逼阵',
    subtitle: '颍阳镇义仓前街 · 前锋对峙',
    mandatory: true,
    beats: [
      S(SPEAKER_PEASANT_BANDIT, '（双目通红，握刀的手不住颤抖，声嘶力竭）“大师对不住了！屠三扣着俺娘俩，俺们实在没活路了——冲啊！”'),
      S('NPC-0192', '（沉声立于粮仓阶前，反手按住刀柄）“贫僧为你压住左右匪徒，防他们放冷箭。前面这两名被逼上绝路的庄稼汉，便交由你用《慈悲刀法》刀背卸兵，切不可伤他们一丝一毫！”'),
      P('（锵然拔出厚背铁戒刀，刀锋朝内、刀背向外，朗声高呼）“诸位乡亲莫慌！贫僧不伤尔等性命，只卸尔等手中兵刃，今晚必救出山坳家眷！”'),
    ],
    onFinishEffects: [openScene('scene_slq05_10', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_10: {
    id: 'scene_slq05_10',
    title: '第十幕 · 刀背卸兵',
    subtitle: '颍阳镇义仓前 · 慈悲留手之战',
    mandatory: true,
    beats: [
      N('赵老五与刘铁柱咬牙挥着朴刀劈头盖脸乱砍而来，虽无章法却拼了性命！你稳守中宫，铁戒刀化作圆融刀幕，专以厚实刀背磕震虎口、卸去朴刀！'),
    ],
    choices: [
      {
        id: 'slq05_fight_peasants',
        label: '运使《慈悲刀法》刀背卸兵，制伏两名胁从饥民（三流中品 × 2，不伤性命）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q05_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPeasantRaiderAlpha() },
            extraOpponents: [{ kind: 'custom', npc: buildPeasantRaiderBeta() }],
            rule: 'spar',
            forbidEscapeReason: '身后便是颍阳镇义仓与满镇老幼，退一步则粮仓失守！',
            introText:
              '【慈悲度寇 · 刀背卸兵】迎战被匪首胁迫的【赵老五 & 刘铁柱】，以刀背震脱朴刀而不伤其性命！',
            onWin: [
              { type: 'setFlag', flag: 'sl_q05_peasant_disarmed', value: true },
              openScene('scene_slq05_11', SHAOLIN_Q05_QUEST_ID),
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

  scene_slq05_11: {
    id: 'scene_slq05_11',
    title: '第十一幕 · 慈悲度众',
    subtitle: '颍阳镇义仓前 · 刀落人安',
    illustrationUrl: '/assets/quests/sl_05_yingyang_mercy.jpg',
    illustrationCaption: '慈悲度寇 · 戒刀背震脱朴刀，流民跪地痛哭，悍匪屠三提鬼头刀怒冲而至',
    mandatory: true,
    beats: [
      N('“当啷！当啷！”两声脆响，你的铁戒刀背如影随形，精准磕在两柄朴刀刀脊七寸之处！柔和却沛然难御的震劲顺刀柄传去，赵老五与刘铁柱只觉虎口发麻，朴刀脱手飞出数丈，二人跌坐在地竟连皮肉都未破半分！'),
      S(SPEAKER_PEASANT_BANDIT, '（愣愣摸着毫发无伤的胸口，旋即伏地痛哭）“活佛啊……大师真个不杀俺们！乡亲们别帮屠三卖命了，少林大师来救咱们了！”'),
      N('余下十余名饥民见状纷纷扔下柴刀退向义仓一侧。玄灭趁势飞身点倒几名押阵喽啰，喝令保正将流民护入仓院。大石上的屠三见人质盾牌尽失，顿时暴跳如雷！'),
    ],
    onFinishEffects: [openScene('scene_slq05_12', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_12: {
    id: 'scene_slq05_12',
    title: '第十二幕 · 屠三暴怒',
    subtitle: '颍阳镇义仓前 · 悍匪出阵',
    mandatory: true,
    beats: [
      S(SPEAKER_TUSAN, '（提着豁口鬼头大刀大步踏碎青砖，煞气逼人）“好个装模作样的小秃驴！敢坏老子大事，老子今日便拿你的光头祭刀！别指望那老和尚插手，有种跟老子单挑！”'),
      S('NPC-0192', '（稳立仓门，朗声笑道）“阿弥陀佛。贫僧自去西山坳解救被你扣押的妇孺家眷，至于你这身血债——我罗汉堂内门弟子一人一刀，便足以度你！”'),
      P('（横刀当胸，禅目澄明如水）“屠三，你屡劫乡里、挟民为盾，造孽深重。今日贫僧便以少林《慈悲刀法》，废你凶器、拿你归案！”'),
    ],
    onFinishEffects: [openScene('scene_slq05_13', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_13: {
    id: 'scene_slq05_13',
    title: '第十三幕 · 鬼头对戒刀',
    subtitle: '颍阳镇义仓前 · 生擒匪首之战',
    mandatory: true,
    beats: [
      N('屠三大吼一声，鬼头大刀夹杂《鬼头大刀斩》与《杀猪断骨刀》的腥风猛劈而下，刀势沉雄狂暴，势欲将你连人带刀劈作两半！'),
    ],
    choices: [
      {
        id: 'slq05_fight_tusan',
        label: '正面迎战河洛刀匪首「豁口屠夫」屠三（二流下品，一对一）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q05_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTuSanBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '悍匪屠三刀势凶绝，此刻唯有正面将其生擒方能保全颍阳镇！',
            introText:
              '【慈悲度寇 · 生擒悍匪】一对一迎战河洛刀匪首【豁口屠夫 · 屠三（二流下品）】！',
            onWin: [openScene('scene_slq05_14', SHAOLIN_Q05_QUEST_ID)],
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

  scene_slq05_14: {
    id: 'scene_slq05_14',
    title: '第十四幕 · 碎腕生擒',
    subtitle: '颍阳镇义仓前 · 匪首伏法',
    mandatory: true,
    beats: [
      N('刀光交错二十余合，屠三久攻不下心浮气躁，使出一记破釜沉舟的力劈华山！你脚踏罗汉步斜滑半尺，铁戒刀贴着鬼头刀背顺势一缠一送，正是一招「回头是岸」！'),
      N('“咔嚓！”一声清脆骨响，厚重刀背精准震在屠三右腕尺骨之上！屠三惨嚎一声，鬼头大刀当啷落地，整条右臂软垂脱力，被你顺势一记点穴制住动弹不得！'),
      S(SPEAKER_TUSAN, '（瘫跪在地，满头冷汗，咬牙切齿）“你……你竟没杀我……这少林刀法……”'),
      P('（收刀入鞘，低宣佛号）“阿弥陀佛。杀你只需一刃，生擒却须三分克己。留你一命押送登封县衙明正典刑，正合佛门因果。”'),
    ],
    onFinishEffects: [openScene('scene_slq05_15', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_15: {
    id: 'scene_slq05_15',
    title: '第十五幕 · 义仓散米',
    subtitle: '颍阳镇义仓前 · 晨曦微露',
    mandatory: true,
    beats: [
      N('不多时，玄灭师伯押解着余匪、护送着西山坳中被救出的数十名妇孺平安归镇。赵老五与家人抱头痛哭，保正老周亦当即开仓借出糙米赈济饥民，满街百姓无不向少林僧众合十叩谢。'),
      S(SPEAKER_VILLAGE_ELDER, '“若非二位大师既救了义仓，又保全了西洼村几十条冤命，颍阳镇今夜便要血流成河了！少林慈悲，真乃中原柱石！”'),
      S('NPC-0192', '（将屠三交予闻讯赶来的县衙捕快，回首望向你，神色难得露出一丝温煦）“刀背卸流民之兵，碎腕擒首恶而不妄杀，你这一战，比在东庑练十年木桩更得《慈悲刀法》真味。回山向玄苦师兄复命罢。”'),
    ],
    onFinishEffects: [openScene('scene_slq05_16', SHAOLIN_Q05_QUEST_ID)],
  },

  scene_slq05_16: {
    id: 'scene_slq05_16',
    title: '第十六幕 · 东庑授谱',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('翌晨返抵嵩山少林寺东庑碑帖武库院，玄苦尊者听罢玄灭详述颍阳镇始末，欣然取出一卷线装《慈悲刀法》全谱与一柄刻有「止戈」篆文的精钢戒刀，郑重颁予于你。'),
      S('NPC-0126', '“阿弥陀佛。世人只知少林罗汉堂武功刚猛无匹，却不知「慈悲」二字才是伏魔根本。今日你已凭实战证道，这卷《慈悲刀法》全本正式归你研习！”'),
      P('（双手合十接过刀谱，深深一揖）“谢玄苦师伯、玄灭师伯慈悲成全！弟子定当勤修不辍，永铭止杀度人之心！”'),
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
            reason: '东庑习《慈悲刀法》并于颍阳镇刀背度饥民、生擒屠三',
          },
          { type: 'addSectContribution', amount: 100 },
          {
            type: 'modifyChivalry',
            delta: 20,
            reason: '刀背卸饥民朴刀而不伤命，生擒河洛悍匪护住颍阳镇',
          },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0192' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0126' }, delta: 10 },
          { type: 'completeQuest', questId: SHAOLIN_Q05_QUEST_ID, outcome: 'completed' },
          toast(
            '【东庑刀鸣 · 慈悲度寇】圆满完成！习得《慈悲刀法》，实战经验 +260、门派贡献 +100、侠义 +20、经义 +1！',
            'success',
            '罗汉堂脉',
          ),
        ],
      },
    ],
  },
}
