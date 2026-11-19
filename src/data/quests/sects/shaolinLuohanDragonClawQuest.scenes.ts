import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
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
    equippedArts: {
      neigong: 'MA-243',
      qinggong: 'MA-077',
      move1: 'MA-084',
      move2: 'MA-118',
      move3: 'MA-152',
    },
    learnedArts: [
      { artId: 'MA-243', level: 7 },
      { artId: 'MA-077', level: 7 },
      { artId: 'MA-084', level: 7 },
      { artId: 'MA-118', level: 6 },
      { artId: 'MA-152', level: 6 },
    ],
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
    talk: '“头领你带着拓片先走，这小和尚交给我用透骨暗器拖住！”',
    stats: { hp: 1420, mp: 920, agi: 58, res: 32 },
    talents: { bone: 68, comprehension: 70, charm: 48 },
    equippedArts: {
      neigong: 'MA-243',
      qinggong: 'MA-138',
      move1: 'MA-118',
      move2: 'MA-146',
    },
    learnedArts: [
      { artId: 'MA-243', level: 6 },
      { artId: 'MA-138', level: 6 },
      { artId: 'MA-118', level: 6 },
      { artId: 'MA-146', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq07_01: {
    id: 'scene_slq07_01',
    title: '第一幕 · 秦王碑异',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('{reignYear}隆冬，少室山寒霜凝瓦。你在少林入寺倏忽已满三载，经义与书法造诣俱深。这日清晨，你于【东庑碑帖武库院】拂拭历代唐碑，行至著名的《太宗赐少林寺教碑》（俗称秦王碑）前，脚步忽地一顿！'),
      N('常人只看碑阳李世民御书「太宗」二字龙蛇飞动，你却因熟通碑帖拓印之术，敏锐地嗅到碑阴背风处竟残留着一丝极淡的异香——那是幽州上等松烟墨混杂胡蜡的味道！'),
      P('（俯身轻触碑阴石缝，指尖捻起一点几不可见的青黑蜡屑，神色骤凝）“不对！本寺拓碑向来只用徽州桐油烟与白芨浆，绝无幽州松烟胡蜡！昨夜定有人潜入东庑偷拓碑阴！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_02', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_02: {
    id: 'scene_slq07_02',
    title: '第二幕 · 碑阴秘图',
    subtitle: '东庑碑帖武库院 · 秘事初显',
    mandatory: true,
    beats: [
      N('你急忙请来值守东庑的碎碑僧玄石与巡视戒律的铁掌禅师玄痛。玄石俯身细察那几道极浅的阴刻线条，向来沉稳如磐石的面庞竟倏然变色！'),
      S('NPC-0191', '（低声惊道）“阿弥陀佛！险些酿成大祸！师侄有所不知——这《秦王碑》背阴夹层之中，乃当年太祖皇帝微服访嵩山时，由老方丈秘密嵌刻的一幅河朔古驿道与雁门、瓦桥关隘暗道残图！”'),
      S('NPC-0156', '（双目如电，沉声接言）“此图平日被厚苔与假铭文遮掩，唯以特制胡蜡加热拓印方能显出暗纹！观这残痕，昨夜贼人只来得及拓下西半幅，便被巡夜僧惊走。他们既已寻到真迹，今明两夜必卷土重来！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_03', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_03: {
    id: 'scene_slq07_03',
    title: '第三幕 · 请缨捉谍',
    subtitle: '东庑碑帖武库院',
    mandatory: true,
    beats: [
      S('NPC-0156', '“能无声无息越过少林七十二重夜巡防线、用幽州松烟胡蜡偷拓古碑者，十有八九是大辽南院枢密院的顶尖轻功谍探！若打草惊蛇，他们必毁图灭迹或远遁北疆，唯有秘而不宣、设伏活捉，方能追回西半幅拓片并撬出内应！”'),
      S('NPC-0191', '“只是大辽影谍轻功诡魅如鬼，且多贴身穿着刀剑难伤的软甲。寻常刀杖势大却难粘身，欲在方寸碑廊间一举生擒，唯有传你我少林七十二绝技中专破轻功与护体软甲的《龙爪手》！”'),
    ],
    choices: [
      {
        id: 'slq07_accept',
        label: '合十请缨，随玄痛玄石合习《龙爪手》并设伏活捉辽谍',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q07_QUEST_ID, stepId: 'stele_claw_study' },
          setStep(SHAOLIN_Q07_QUEST_ID, 'stele_claw_study'),
          toast(
            '已承接【碎碑擒龙 · 少室捉谍】！请于【东庑碑帖武库院（sl_luohan_west）】随玄痛、玄石合习《龙爪手》。',
            'talk',
            '碎碑擒龙',
          ),
        ],
      },
    ],
  },

  scene_slq07_04: {
    id: 'scene_slq07_04',
    title: '第四幕 · 寒雾碑廊',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    illustrationUrl: '/assets/quests/sl_07_stele_mist.jpg',
    illustrationCaption: '碎碑擒龙 · 东庑古碑寒雾缭绕，玄石与玄痛五指成爪示范少林绝技《龙爪手》',
    mandatory: true,
    beats: [
      N('午后寒雾低垂，东庑碑廊静寂无人。玄石与玄痛引你至武库院后侧青石坪，坪角堆着十余块从嵩山采来的坚硬青冈岩废碑。'),
      S('NPC-0191', '（伸出右手，五指微曲如苍龙探爪，指节间发出炒豆般的脆响）“师侄看好了！少林《龙爪手》共三十六式，不靠花哨招式，全凭一气贯通指尖——「拿云」「捉月」「批亢」「捣虚」，讲究后发先至、如影随形！”'),
      N('话音未落，玄石一步踏前，右爪凌空虚抓三寸，陡然扣在青冈岩废碑棱角之上！只听“咔嚓”一声闷响，坚硬如铁的青石竟如豆腐般被生生抠下五道寸深指痕，石粉簌簌而落！'),
    ],
    onFinishEffects: [openScene('scene_slq07_05', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_05: {
    id: 'scene_slq07_05',
    title: '第五幕 · 撕甲扣脉',
    subtitle: '东庑碑帖武库院 · 青石演武',
    mandatory: true,
    beats: [
      S('NPC-0156', '（紧接着上前一步，双爪连环变幻，快得在寒雾中拉出一片青影）“玄石师弟展的是《龙爪手》「碎碑裂甲」之刚劲；而我所演者，则是「锁脉擒龙」之巧劲！辽谍轻功再快，发力前必有提气蓄势的刹那停顿，你只需盯死其肩井、曲池、腕脉三处大穴，一爪扣实，便是铁甲也能撕开、神行也能定身！”'),
      P('（双目炯炯紧盯二位高僧指法流转，结合自身书法运笔之提按顿挫，倏然心领神会）“弟子明白了！《龙爪手》指力如楷书入木三分，爪势转折又如草书连绵不断，刚柔相济，方能克敌于无形！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_06', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_06: {
    id: 'scene_slq07_06',
    title: '第六幕 · 铁砂练爪',
    subtitle: '东庑碑帖武库院 · 苦修至暮',
    mandatory: true,
    beats: [
      N('整整一下午，你在玄痛与玄石轮番喂招之下反复演练《龙爪手》三十六路变化。玄痛以极快身法模拟辽谍游走突袭，你则凭《罗汉伏虎功》深厚内力灌注十指，一遍遍封截、粘随、反扣！'),
      N('至日暮晚钟敲响之际，你凌空一招「捕风捉影」疾探而出，五指竟稳稳扣住玄石随手掷来的一枚飞旋铁胆，劲力吞吐间将铁胆捏出五道浅浅指印！'),
      S('NPC-0191', '（抚须大笑）“好！半日之内竟已初成「擒龙锁脉」火候！纵然对上二流上品的轻功好手，你也绝不会落于下风！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_07', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_07: {
    id: 'scene_slq07_07',
    title: '第七幕 · 诱敌布网',
    subtitle: '东庑碑帖武库院 · 密议设伏',
    mandatory: true,
    beats: [
      S('NPC-0156', '“今夜外围照常巡夜，唯独三更交班之际，我命巡僧故意延缓半刻入东庑。我与玄石师弟隐于廊外高墙截断其北逃去路，防止贼人鸣哨叫来接应；碑廊之内直面辽谍、夺回西半幅拓片并生擒贼首的重任，便交由师侄！”'),
      P('（深吸一口气，十指微握成爪，神色沉毅）“弟子定不辱命！三更寒雾起时，弟子便藏身《秦王碑》侧松影之中，叫那辽谍有来无回！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_08', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_08: {
    id: 'scene_slq07_08',
    title: '第八幕 · 假拓为饵',
    subtitle: '东庑碑帖武库院 · 静候三更',
    mandatory: true,
    beats: [
      N('玄石师伯细心将碑阴方才留下的些许残屑扫净，又以淡青苔水略微掩饰，使其看起来宛如无人察觉过一般。夜幕彻底降临，嵩山寒雾越发浓重，十步之外几乎不见人影。'),
      S('NPC-0191', '“一切皆已就绪。师侄且先调息养神，待三更梆子响过，速回东庑碑廊设伏！”'),
    ],
    choices: [
      {
        id: 'slq07_prepare_trap',
        label: '收敛气息静候三更，准备于东庑碑廊设伏活捉大辽谍探',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q07_QUEST_ID, 'midnight_spy_trap'),
          toast(
            '《龙爪手》要诀已明！请于【东庑碑帖武库院（sl_luohan_west）】开启三更寒雾设伏捉谍！',
            'talk',
            '碎碑擒龙',
          ),
        ],
      },
    ],
  },

  scene_slq07_09: {
    id: 'scene_slq07_09',
    title: '第九幕 · 雾起三更',
    subtitle: '东庑碑帖武库院 · 三更寒雾',
    mandatory: true,
    beats: [
      N('梆——梆——梆！远处禅院传来三更木鱼与巡更梆子声，旋即归于死寂。浓稠如乳的寒雾自少室山谷翻涌而上，漫过东庑青瓦与石碑林立的廊檐。'),
      N('你屏息蛰伏于《秦王碑》斜后方古柏阴影之中，将《罗汉伏虎功》息数压至极缓，整个人恍若与寒雾石碑融为一体。'),
    ],
    onFinishEffects: [openScene('scene_slq07_10', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_10: {
    id: 'scene_slq07_10',
    title: '第十幕 · 青影潜廊',
    subtitle: '东庑碑帖武库院 · 贼踪乍现',
    mandatory: true,
    beats: [
      N('约莫半柱香后，东庑飞檐之上忽然飘落两道几无声息的青黑人影！其轻功之高明，足尖点在覆霜青瓦上竟连半片霜花都未震落！'),
      N('为首那名瘦削男子蒙着黑巾，唯露出一双鹰隼般冷冽的双目，腰间佩着幽州细作特有的软皮拓囊；身旁矮壮暗哨则手按暗器袋，警惕地扫视四周碑林。'),
      S(SPEAKER_XIAO_WUHEN, '（压低声音用契丹口音的汉话道）“青影大人，少林巡夜僧刚撤出东庑，果然没人察觉昨晚留下的拓痕！属下为您望风，您速将东半幅河朔关隘暗图拓完！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_11', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_11: {
    id: 'scene_slq07_11',
    title: '第十一幕 · 现身断路',
    subtitle: '东庑碑帖武库院 · 寒雾破寂',
    mandatory: true,
    beats: [
      N('那被称为「青影大人」的谍探点头称善，取出暖蜡囊与油绢正欲贴向《秦王碑》背阴——就在他指尖将触未触之际，你陡然自古柏暗影中踏步而出，声如洪钟震彻碑廊！'),
      P('“阿弥陀佛！大辽枢密院的施主，半夜三更偷拓我大宋古碑舆图，未免太不把少林罗汉堂放在眼里了！”'),
      S(SPEAKER_YELV_QINGYING, '（瞳孔骤缩，身形如鬼魅般暴退三丈，冷笑出声）“好个藏头露尾的小和尚！竟真看破了幽州松烟胡蜡！不过只凭你一人，也想拦住我大辽「青影」？”'),
    ],
    onFinishEffects: [openScene('scene_slq07_12', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_12: {
    id: 'scene_slq07_12',
    title: '第十二幕 · 暗器袭雾',
    subtitle: '东庑碑帖武库院 · 交锋前夕',
    mandatory: true,
    beats: [
      S(SPEAKER_XIAO_WUHEN, '（袖口一抖，三枚淬蓝透骨镖破雾疾射而来）“青影大人快退！西半幅拓片还在您怀里，绝不能落回宋人手里！”'),
      N('你冷哼一声，不退反进，右爪一招「拨云见日」凌空疾抓，竟在寒雾中硬生生将三枚疾飞的毒镖尽数攥入掌心，反手震碎于地！'),
      S(SPEAKER_YELV_QINGYING, '（见高墙之外隐隐传来玄痛、玄石二僧封锁退路的佛号声，顿时明白已入重围，眼中凶光毕露）“好狠的圈套！无痕，别留手了！联手杀穿这小和尚，从正面冲出罗汉堂！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_13', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_13: {
    id: 'scene_slq07_13',
    title: '第十三幕 · 龙爪迎影',
    subtitle: '东庑碑帖武库院 · 雾战双谍',
    mandatory: true,
    beats: [
      N('耶律青影催动《瞬息千里》轻功，身法化作三道残影绕碑扑杀而来，鹰爪凌厉狠毒；萧无痕则借碑柱掩护，不断以透骨镖与暗手袭扰你下盘！'),
      P('（双足稳钉青石，十指曲张如铁钩，沉声喝道）“今日便以少林《龙爪手》，撕你冰蚕软甲、锁你辽谍脉门！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_14', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_14: {
    id: 'scene_slq07_14',
    title: '第十四幕 · 碎碑擒龙',
    subtitle: '东庑碑帖武库院 · 一挑二活捉辽谍',
    mandatory: true,
    beats: [
      N('寒雾翻腾，碑影幢幢！大辽影谍双人合击快如电闪，稍有疏忽便会被其破围远遁！你屏息凝神，全力施展《龙爪手》后发先至之妙！'),
    ],
    choices: [
      {
        id: 'slq07_fight_spies',
        label: '运使《龙爪手》一对二迎战耶律青影（二流上品）与萧无痕（二流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYelvQingyingBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildXiaoWuhenSpy() }],
            rule: 'story_trial',
            forbidEscapeReason: '大辽影谍怀揣河朔边防拓片，此刻绝不可放其逃出东庑！',
            introText:
              '【碎碑擒龙】三更寒雾中一对二激战大辽枢密院轻功谍探【耶律青影（二流上品）】与暗哨【萧无痕（二流中品）】！',
            onWin: [openScene('scene_slq07_15', SHAOLIN_Q07_QUEST_ID)],
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

  scene_slq07_15: {
    id: 'scene_slq07_15',
    title: '第十五幕 · 撕甲扣脉',
    subtitle: '东庑碑帖武库院 · 活捉谍首',
    illustrationUrl: '/assets/quests/sl_07_dragon_claw_capture.jpg',
    illustrationCaption: '碎碑擒龙 · 三更寒雾间《龙爪手》撕裂幽州软甲，一爪扣脉生擒辽谍耶律青影',
    mandatory: true,
    beats: [
      N('激斗数十合，你先以一招「批亢捣虚」震飞萧无痕暗器囊，顺势将其肩胛卸脱按倒于石碑之前！耶律青影见大势已去，猛催《瞬息千里》纵身直扑东庑高檐！'),
      N('千钧一发之际，你脚下暴起，身随爪走，一式《龙爪手》绝杀「苍龙探海」后发先至，五指如钢钩般直扣耶律青影背心！'),
      N('“嗤啦——！”一阵令人牙酸的锦帛撕裂声响起，号称刀剑难伤的幽州冰蚕软甲竟被你刚猛爪劲硬生生撕开五道裂口！紧接着你变爪为扣，精准锁住他大椎与肩井双穴，将这位大辽顶尖轻功谍探凌空掼回青石坪上，动弹不得！'),
    ],
    onFinishEffects: [openScene('scene_slq07_16', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_16: {
    id: 'scene_slq07_16',
    title: '第十六幕 · 追回拓片',
    subtitle: '东庑碑帖武库院 · 赃证俱获',
    mandatory: true,
    beats: [
      S(SPEAKER_YELV_QINGYING, '（面色惨白，惊骇欲绝地看着肩头破碎的冰蚕软甲）“不可能……这冰蚕软甲连官军强弩都射不穿，你这小和尚的指爪怎会如此霸道……”'),
      N('玄痛与玄石师伯自高墙飘然而落，武僧众弟子点亮火把涌入东庑，将耶律青影与萧无痕押缚严实。你伸手自耶律青影怀中搜出一卷尚带松烟气息的油绢拓片与一枚契丹枢密院铜牌！'),
      S('NPC-0156', '（展开油绢细看，长舒一口气）“正是昨夜被偷拓的西半幅河朔古关防残图！连同东半幅未曾外泄，真乃天佑大宋！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_17', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_17: {
    id: 'scene_slq07_17',
    title: '第十七幕 · 戒律收押',
    subtitle: '东庑碑帖武库院 · 晨光破雾',
    mandatory: true,
    beats: [
      S('NPC-0156', '“这二名大辽枢密院细作潜入嵩山偷窥军机，贫僧即刻禀明方丈师兄，先囚于戒律院地牢严审其在中原的暗桩，再密交开封府枢密院发落！”'),
      S('NPC-0191', '（拍了拍你微微发红的十指，赞不绝口）“好一记「苍龙探海」！寒雾之中独战二名大辽轻功好手，不仅毫发无损，还能临危活捉谍首、保全古碑无恙，我罗汉堂已许久未出你这般文武兼修的良材了！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_18', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_18: {
    id: 'scene_slq07_18',
    title: '第十八幕 · 重封唐碑',
    subtitle: '东庑碑帖武库院 · 翰墨护秘',
    mandatory: true,
    beats: [
      N('天色微明，寒雾散尽。玄石师伯取来少林秘制青石泥浆与经文刻刀，邀你以深厚书法功底在《秦王碑》背阴补刻一段《心经》偈文，将那幅河朔古关防暗图重新隐没于佛经笔意之中，此后外人再难窥破分毫。'),
      P('（执刀运腕，石屑纷飞间字迹古朴苍劲，宛若唐人原刻）“以佛经护山河，以武艺止干戈，弟子今日方知少林千年香火何以长存不灭。”'),
    ],
    onFinishEffects: [openScene('scene_slq07_19', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_19: {
    id: 'scene_slq07_19',
    title: '第十九幕 · 龙爪传灯',
    subtitle: '东庑碑帖武库院 · 碑林朝阳',
    illustrationUrl: '/assets/quests/sl_07_map_preserved.jpg',
    illustrationCaption: '山河无恙 · 朝阳映照东庑唐碑，西半幅拓片焚毁归尘，玄痛与玄石合授《龙爪手》全本',
    mandatory: true,
    beats: [
      N('朝阳跃出嵩岳云海，将东庑唐碑染作一片金红。玄痛师伯当众以香火将那半幅辽谍拓片焚作青烟，随即与玄石一同将一卷装帧古朴的《龙爪手三十六式秘录》郑重交予于你。'),
      S('NPC-0156', '“阿弥陀佛！《龙爪手》乃我少林七十二绝技之冠冕擒拿术，向来唯德行、经义、武功三者俱佳的内门翘楚方可修习全本。今夜你护住河朔关防秘图，此卷真传你当之无愧！”'),
    ],
    onFinishEffects: [openScene('scene_slq07_20', SHAOLIN_Q07_QUEST_ID)],
  },

  scene_slq07_20: {
    id: 'scene_slq07_20',
    title: '第二十幕 · 功成东庑',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    mandatory: true,
    beats: [
      P('（双手合十接过《龙爪手》真传秘录，向玄痛、玄石二位师伯深深一揖）“多谢二位师伯传法与信任！弟子定当勤参佛法、精研爪艺，为少林、为天下苍生守住山河清宁！”'),
      S('NPC-0191', '（微笑颔首）“去吧。待你再修两年，筋骨禅心圆满，便有资格去闯罗汉堂正殿那座名震天下的「十八铜人三才六合大阵」，叩开少林真传之门了！”'),
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
            reason: '东庑习得《龙爪手》，三更寒雾一挑二活捉大辽枢密院谍探耶律青影',
          },
          { type: 'addSectContribution', amount: 160 },
          { type: 'modifySkill', key: '书', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0156' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0191' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_Q07_QUEST_ID, outcome: 'completed' },
          toast(
            '【碎碑擒龙 · 少室捉谍】圆满完成！习得《龙爪手》，实战经验 +420、贡献 +160、书 +2、经义 +1！',
            'success',
            '罗汉堂脉',
          ),
        ],
      },
    ],
  },
}
