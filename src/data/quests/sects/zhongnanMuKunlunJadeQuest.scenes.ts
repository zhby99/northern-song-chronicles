import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q27_QUEST_ID } from './zhongnanMuKunlunJadeQuest'

const SPEAKER_HU_MERCHANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '西域奇货老胡商',
  title: '长安西市丝路掌柜',
  factionName: '西市胡商坊',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq27_01: {
    id: 'scene_znq27_01',
    title: '第一幕 · 丝路起点访胡坊',
    subtitle: '京兆府 · 西市胡商坊（丝路起点） · 番坊正市 · 奇货堂',
    illustrationUrl: '/assets/quests/zn_q27_changan_kunlun_map.jpg',
    illustrationCaption: '长安西市驼铃叮当，奇货堂内胡商展开一卷羊皮绘制的昆仑雪域古图',
    mandatory: true,
    beats: [
      N('{reignYear}隆冬，长安雪晴，驼铃声响彻【西市胡商坊 · 番坊正市 · 奇货堂】。你依林朝瑶师尊密信所指，寻到一家专营西域珍宝与古道舆图的老胡商铺子。'),
      S(SPEAKER_HU_MERCHANT, '（抚着卷曲白须，笑眯眯拱手）“这位{gender:少侠|女侠}气度非凡，不知是想看波斯琉璃，还是于阗美玉？”'),
      P('“在下不求珠宝，只求一卷能指引深入昆仑瑶池冰窟的《万山之祖昆仑雪域舆图》！”'),
    ],
    onFinishEffects: [
      { type: 'startQuest', questId: ZHONGNAN_Q27_QUEST_ID, stepId: 'buy_kunlun_map' },
      { type: 'teleportPlayer', regionId: 'changan', buildingId: 'ca_xishi', spotId: 'ca_xishi_main' },
      openScene('scene_znq27_02', ZHONGNAN_Q27_QUEST_ID),
    ],
  },

  scene_znq27_02: {
    id: 'scene_znq27_02',
    title: '第二幕 · 羊皮古图现真容',
    subtitle: '西市胡商坊 · 番坊正市 · 奇货堂',
    mandatory: true,
    beats: [
      S(SPEAKER_HU_MERCHANT, '（闻言神色一正，压低声音）“昆仑瑶池万年冰窟？那可是连大漠商队都不敢靠近半步的冰雪绝地！我这儿确实珍藏了一卷先辈用雪貂皮绘成的《万山之祖昆仑雪域舆图》，标明了避开雪崩与星宿海毒瘴的秘径……”'),
      N('你亮出活死人墓的寒玉信物并爽快付清定银，老胡商见你确是终南高人门下，不再推辞，郑重从檀木匣中取出羊皮古图双手奉上！'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-MSC-022', qty: 1 },
      toast('获得【《万山之祖昆仑雪域舆图》】！现可畅行天下舆图西域昆仑绝域！', 'success', '昆仑舆图'),
      openScene('scene_znq27_03', ZHONGNAN_Q27_QUEST_ID),
    ],
  },

  scene_znq27_03: {
    id: 'scene_znq27_03',
    title: '第三幕 · 胡商叮嘱绝域险',
    subtitle: '西市胡商坊 · 奇货堂',
    mandatory: true,
    beats: [
      S(SPEAKER_HU_MERCHANT, '“{gender:少侠|女侠}此去万里昆仑，切记两件事：一要提防近来盘踞昆仑外围的一群西域散修恶徒；二若在瑶池冰床深处撞见一位身形娇小、眉目却威严如神魔的白衣老前辈，千万莫要口出狂言！”'),
      P('（心中暗记）“多谢掌柜提点，在下定当铭记于心！”'),
    ],
    onFinishEffects: [openScene('scene_znq27_04', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_04: {
    id: 'scene_znq27_04',
    title: '第四幕 · 策马西出玉门关',
    subtitle: '河西走廊古道',
    mandatory: true,
    beats: [
      N('得了《万山之祖昆仑雪域舆图》，你备足干粮棉裘，策马西出长安，过河西走廊、穿戈壁荒漠，直指天际那道接天连地的银白雪山脊梁——万山之祖昆仑山！'),
    ],
    choices: [
      {
        id: 'znq27_ch_go_kunlun',
        label: '循古图秘径万里西行，直抵【昆仑瑶池万年冰窟 · 西王母翡翠雪莲池】！',
        tone: 'jade',
        effects: [
          setStep(ZHONGNAN_Q27_QUEST_ID, 'yaochi_pool'),
          { type: 'teleportPlayer', regionId: 'kunlun', buildingId: 'kl_yaochi', spotId: 'kl_yc_pool' },
          { type: 'setFlag', flag: 'znq27_pool_triggered', value: true },
          openScene('scene_znq27_07', ZHONGNAN_Q27_QUEST_ID),
        ],
      },
      {
        id: 'znq27_ch_self_kunlun',
        label: '先于关中整顿装备丹药，稍后自行经天下舆图西赴昆仑瑶池',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q27_QUEST_ID, 'yaochi_pool'),
          openScene('scene_znq27_05', ZHONGNAN_Q27_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq27_05: {
    id: 'scene_znq27_05',
    title: '第五幕 · 整备寒衣备雪途',
    subtitle: '京兆府西门',
    mandatory: true,
    beats: [
      N('昆仑冰雪酷寒，你先整备妥当，随后依《万山之祖昆仑雪域舆图》西赴【昆仑瑶池万年冰窟 · 西王母翡翠雪莲池】。'),
    ],
  },

  scene_znq27_06: {
    id: 'scene_znq27_06',
    title: '第六幕 · 万仞玄冰现瑶池',
    subtitle: '昆仑瑶池万年冰窟外',
    mandatory: true,
    beats: [
      N('历经十余日风雪跋涉，眼前骤然豁然开朗：千丈冰崖环抱之中，一泓碧如翡翠、寒雾缭绕的万年雪池静卧谷底，池畔数株冰肌玉骨的天山雪莲正吐露清辉！'),
    ],
    onFinishEffects: [openScene('scene_znq27_07', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_07: {
    id: 'scene_znq27_07',
    title: '第七幕 · 翡翠雪池遇寒玉',
    subtitle: '昆仑山（万山之祖） · 昆仑瑶池万年冰窟 · 西王母翡翠雪莲池',
    illustrationUrl: '/assets/quests/zn_q27_yaochi_zhonglixue.jpg',
    illustrationCaption: '翡翠雪莲池畔寒雾氤氲，雪山隐士钟离雪白衣如雪，正以寒玉剑护住冰池雪莲',
    mandatory: true,
    beats: [
      N('你刚踏入【西王母翡翠雪莲池】，忽闻前方冰岩间传来金铁交鸣与怒喝之声！定睛望去，一位素衣胜雪、眉目清冷的女子正手持长剑护在雪莲池畔，正是号称「雪山寒玉」的隐世女侠【钟离雪】！'),
      N('而在她对面，一名身材魁梧、满脸横肉、手提绿波香露刀的西域豪魁正率数名洞主岛主步步紧逼——赫然是三十六洞七十二岛的「万仙盟魁」【乌老大】！'),
    ],
    onFinishEffects: [openScene('scene_znq27_08', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_08: {
    id: 'scene_znq27_08',
    title: '第八幕 · 乌老大强夺雪莲',
    subtitle: '西王母翡翠雪莲池',
    mandatory: true,
    beats: [
      S('NPC-0190', '（挥刀狂笑，声震冰窟）“钟离雪，别敬酒不吃吃罚酒！我们三十六洞七十二岛兄弟受够了生死符的苦，急需这池百年雪莲配药解毒！识相的赶紧滚开！”'),
      S('NPC-0265', '（冷声拒斥，剑尖微颤却寸步不退）“此池雪莲乃昆仑灵脉所钟，若被你们连根拔绝，整座冰窟灵气便会枯竭！我守此池十年，绝不容尔等糟蹋！”'),
    ],
    onFinishEffects: [openScene('scene_znq27_09', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_09: {
    id: 'scene_znq27_09',
    title: '第九幕 · 古墓寒锋援雪女',
    subtitle: '西王母翡翠雪莲池',
    mandatory: true,
    beats: [
      P('（足尖轻点冰面，飘然落于钟离雪身侧）“以多欺少、强抢灵药，万仙盟好大的排场！钟离姑娘，终南活死人墓弟子愿助你一臂之力！”'),
      S('NPC-0190', '（双目圆睁，绿波香露刀一横）“又冒出个不知天高地厚的中原小娃娃！既想出头，便先尝尝乌老大的宝刀！”'),
    ],
    onFinishEffects: [openScene('scene_znq27_10', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_10: {
    id: 'scene_znq27_10',
    title: '第十幕 · 冰池激战万仙魁',
    subtitle: '西王母翡翠雪莲池',
    illustrationUrl: '/assets/quests/zn_q27_wulaoda_clash.jpg',
    illustrationCaption: '翡翠冰池之上寒气四溢，你以古墓轻灵剑法硬撼万仙盟魁乌老大的绿波香露刀',
    mandatory: true,
    beats: [
      N('乌老大身法虽不如你轻灵，刀势却沉猛狠毒，每一刀皆夹杂西域奇门劲风！你以江宁新悟的柔极藏刚剑意游走冰面，与乌老大展开激烈交锋！'),
    ],
    choices: [
      {
        id: 'znq27_ch_fight_wulaoda',
        label: '踏冰施剑，正面击退万仙盟魁乌老大！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q27_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0190' },
            rule: 'duel',
            lethalOnLose: false,
            introText: '冰窟寒雾翻滚，万仙盟魁乌老大挥舞绿波香露刀狂攻而来！',
            onWin: [openScene('scene_znq27_11', ZHONGNAN_Q27_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 65, mpPct: 65 },
              toast('乌老大刀势凶猛毒辣，借冰面轻功避其锋芒再战！', 'warn', '瑶池激战'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq27_11: {
    id: 'scene_znq27_11',
    title: '第十一幕 · 剑震绿波退群豪',
    subtitle: '西王母翡翠雪莲池',
    mandatory: true,
    beats: [
      N('你踏冰滑步如寒燕掠水，一剑精准震在绿波香露刀刀背七寸！乌老大虎口剧震、大刀险些脱手，连退七步方才稳住身形，望向你的眼神满是惊骇！'),
      S('NPC-0190', '（脸色阴晴不定，忽闻冰窟深处传来一阵令人灵魂战栗的寒风低啸，顿时吓得魂飞魄散）“不……不好！冰床深处那位老祖宗似要醒了！兄弟们快撤，晚一步谁也活不了！”'),
      N('乌老大顾不得颜面，带着手下一溜烟逃出了雪莲池谷口！'),
    ],
    onFinishEffects: [openScene('scene_znq27_12', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_12: {
    id: 'scene_znq27_12',
    title: '第十二幕 · 钟离雪谢赠雪莲',
    subtitle: '西王母翡翠雪莲池',
    mandatory: true,
    beats: [
      S('NPC-0265', '（收剑敛衽一礼，清冷面容浮现一抹笑意）“多谢终南{gender:少侠|女侠}仗义援手。方才听闻你自终南活死人墓万里而来，可是为了池中雪莲，或是更深处的万年寒玉髓？”'),
      P('“不瞒姑娘，家师林朝瑶的昆仑寒玉床冰脉受损，晚辈此来正是求取一朵雪莲与一块万年寒玉髓，绝不伤及灵池根脉。”'),
      S('NPC-0265', '“既是终南寒玉一脉救救急之用，这朵已然成熟的《天山雪莲》便赠予你。只是——冰窟最深处的【万年寒玉冰床晶坛】，此刻正有一位惊世骇俗的大宗师在那里静修……”'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-MED-107', qty: 1 },
      toast('获得钟离雪相赠的【天山雪莲碧灵丹】！', 'success', '瑶池赠药'),
      openScene('scene_znq27_13', ZHONGNAN_Q27_QUEST_ID),
    ],
  },

  scene_znq27_13: {
    id: 'scene_znq27_13',
    title: '第十三幕 · 预警天山童姥威',
    subtitle: '西王母翡翠雪莲池',
    mandatory: true,
    beats: [
      S('NPC-0265', '（压低声音，神色极度凝重）“那位前辈便是威震西域、令三十六洞七十二岛闻风丧胆的逍遥派大宗师——「天山童姥」【巫行云】！她性情喜怒无常、极重骨气，最恨阿谀奉承或软骨求饶之人。你若要进晶坛采玉，切记——无论承受何等威压，挺直脊梁，绝不可屈膝！”'),
      P('（深吸一口冰寒清气，拱手致谢）“多谢钟离姑娘金玉良言！为救师门至宝，纵是龙潭虎穴，晚辈亦必往之！”'),
    ],
    choices: [
      {
        id: 'znq27_ch_go_jade_bed',
        label: '迈步深入【万年寒玉冰床晶坛】，直面天山童姥巫行云！',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q27_QUEST_ID, 'jade_bed_trial'),
          { type: 'teleportPlayer', regionId: 'kunlun', buildingId: 'kl_yaochi', spotId: 'kl_yc_bed' },
          { type: 'setFlag', flag: 'znq27_bed_triggered', value: true },
          openScene('scene_znq27_16', ZHONGNAN_Q27_QUEST_ID),
        ],
      },
      {
        id: 'znq27_ch_prep_jade_bed',
        label: '先于雪莲池畔调息稳固心神，稍后自行进入万年寒玉冰床晶坛',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q27_QUEST_ID, 'jade_bed_trial'),
          openScene('scene_znq27_14', ZHONGNAN_Q27_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq27_14: {
    id: 'scene_znq27_14',
    title: '第十四幕 · 冰池吐纳定道心',
    subtitle: '西王母翡翠雪莲池',
    mandatory: true,
    beats: [
      S('NPC-0265', '“我在池畔替你守住退路，{gender:少侠|女侠}调息妥当后便步入【万年寒玉冰床晶坛】吧。”'),
    ],
  },

  scene_znq27_15: {
    id: 'scene_znq27_15',
    title: '第十五幕 · 步入万年玄冰窟',
    subtitle: '万年寒玉冰床晶坛入口',
    mandatory: true,
    beats: [
      N('穿过一条流光溢彩的万年玄冰长廊，刺骨寒意仿佛能冻结血脉。前方晶莹剔透的冰坛之上，一块宛若月华凝结的巨大寒玉床正散发着幽幽蓝光。'),
    ],
    onFinishEffects: [openScene('scene_znq27_16', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_16: {
    id: 'scene_znq27_16',
    title: '第十六幕 · 晶坛独坐白衣姥',
    subtitle: '昆仑山（万山之祖） · 昆仑瑶池万年冰窟 · 万年寒玉冰床晶坛',
    illustrationUrl: '/assets/quests/zn_q27_wuxingyun_pressure.jpg',
    illustrationCaption: '万年寒玉冰床晶坛蓝光流转，天山童姥巫行云虽形如女童却威压如天崩海啸，你傲立冰阶寸步不跪',
    mandatory: true,
    beats: [
      N('踏入【万年寒玉冰床晶坛】，四周空气仿佛瞬间凝固！只见巨大寒玉冰床正中，盘坐着一名梳着双丫髻、身着雪白缎袍的娇小身影——虽是孩童模样，可当她缓缓睁开双眸的刹那，一股宛若九天冰川轰然倾覆的无形大宗师威压瞬间笼罩全窟！'),
      S('NPC-0102', '（声音清脆却透着睥睨天下的无上霸气）“哼！方才外头那群吵吵闹闹的虫子总算滚了，倒又钻进来一只胆子不小的终南小雀儿。小辈，你可知擅闯姥姥静修之地，该当何罪？！”'),
    ],
    onFinishEffects: [openScene('scene_znq27_17', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_17: {
    id: 'scene_znq27_17',
    title: '第十七幕 · 宗师威压试傲骨',
    subtitle: '万年寒玉冰床晶坛',
    mandatory: true,
    beats: [
      N('话音未落，天山童姥巫行云袖袍微拂！一股排山倒海的先天冰寒气浪迎面压下，脚下坚冰寸寸龟裂，换作寻常一流高手早已双膝发软跪倒尘埃！'),
      N('你强运活死人墓《玉女心经》寒气护住心脉，双手微按剑柄，脊梁挺得如终南青松般笔直，纵使嘴角溢出一丝冷汗，膝盖却纹丝不动！'),
    ],
    choices: [
      {
        id: 'znq27_ch_stand_firm',
        label: '“终南古墓弟子只跪天地师长！晚辈为求万年寒玉髓而来，请前辈赐教！”',
        tone: 'gold',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0102' }, delta: 10 },
          openScene('scene_znq27_18', ZHONGNAN_Q27_QUEST_ID),
        ],
      },
      {
        id: 'znq27_ch_respectful_firm',
        label: '（不卑不亢抱拳朗声）“晚辈无意冒犯前辈清修，然恩师寒玉床受损，纵承雷霆之威亦不敢退！”',
        tone: 'jade',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0102' }, delta: 10 },
          openScene('scene_znq27_18', ZHONGNAN_Q27_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq27_18: {
    id: 'scene_znq27_18',
    title: '第十八幕 · 童姥起兴试二合',
    subtitle: '万年寒玉冰床晶坛',
    mandatory: true,
    beats: [
      S('NPC-0102', '（眼中闪过一丝罕见的奇异亮光，冷笑一声）“好硬的骨头！林朝瑶那丫头当年在终南山躲清静，倒是教出个不怕死的传人！也罢——姥姥今日难得起兴，只出两成气劲考校你二合。你若能站着撑过这两合不倒，冰床边那块万年寒玉髓，便归你拿去！”'),
      P('（深吸一口气，长剑出鞘横于胸前）“多谢前辈成全！晚辈——接招！”'),
    ],
    choices: [
      {
        id: 'znq27_ch_survive_wuxingyun',
        label: '傲骨不跪，硬撑天山童姥巫行云二合威压试探！',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q27_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0102' },
            rule: 'survive_rounds',
            maxRounds: 2,
            lethalOnLose: false,
            introText: '天山童姥巫行云以二成内劲威压试探！守住心脉、撑过二合不倒即可过关！',
            onWin: [openScene('scene_znq27_19', ZHONGNAN_Q27_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('大宗师威压浩瀚如海，切记稳守防御、撑过二合即可！', 'warn', '童姥试探'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq27_19: {
    id: 'scene_znq27_19',
    title: '第十九幕 · 冰风激荡身如松',
    subtitle: '万年寒玉冰床晶坛',
    mandatory: true,
    beats: [
      N('两合眨眼而过！巫行云衣袖轻拂间，漫天冰晶化作无形掌意呼啸而至；你全神贯注施展古墓至柔卸力之法，虽被震得连退五步、双臂发麻，却始终稳稳站定冰阶之上，寸步未跪！'),
      S('NPC-0102', '（倏然收手，漫天寒压瞬间消散无踪，拍掌冷笑）“不错，不错！既不软骨求饶，又懂得借力化劲而不蛮撞送死——比外头那群只会鬼哭狼嚎的三十六洞废物强上百倍！”'),
    ],
    onFinishEffects: [openScene('scene_znq27_20', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_20: {
    id: 'scene_znq27_20',
    title: '第二十幕 · 赐下万年寒玉髓',
    subtitle: '万年寒玉冰床晶坛',
    mandatory: true,
    beats: [
      N('巫行云屈指一弹，冰床边缘一截通体碧透、寒气氤氲的「万年寒玉髓」应声剥落，稳稳飞入你掌中！'),
      S('NPC-0102', '“拿去吧！回去替姥姥带句话给林朝瑶：西夏那帮老家伙与星宿海那条恶狗丁春秋，近来手伸得越来越长，叫她别光顾着在活死人墓里孵冰块，免得被人端了老窝！”'),
      P('（心中一凛，恭敬躬身一拜）“多谢前辈赐玉并相告机密！晚辈必将此话一字不差禀报恩师！”'),
    ],
    onFinishEffects: [openScene('scene_znq27_21', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_21: {
    id: 'scene_znq27_21',
    title: '第二十一幕 · 拜别瑶池踏归程',
    subtitle: '西王母翡翠雪莲池',
    mandatory: true,
    beats: [
      N('退出晶坛，见你安然捧着万年寒玉髓走出，钟离雪清冷眼眸中亦难掩惊佩之色。'),
      S('NPC-0265', '“竟能于天山童姥威压之下全身而退且获赐寒玉髓，{gender:少侠|女侠}前途不可限量！听闻童姥提及星宿派，你归程务必万分小心，星宿老怪丁春秋与摘星子素来睚眦必报！”'),
    ],
    onFinishEffects: [openScene('scene_znq27_22', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_22: {
    id: 'scene_znq27_22',
    title: '第二十二幕 · 东归星驰越关山',
    subtitle: '西域东归驿道',
    mandatory: true,
    beats: [
      N('你辞别钟离雪，将万年寒玉髓与天山雪莲贴身妥善收好，星夜兼程东返终南山。一路上，童姥关于星宿派的警告始终萦绕心头，令你不敢有丝毫懈怠。'),
    ],
    choices: [
      {
        id: 'znq27_ch_return_tomb',
        label: '星夜驰归【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】献呈寒玉髓！',
        tone: 'jade',
        effects: [
          setStep(ZHONGNAN_Q27_QUEST_ID, 'return_tomb_jadebed'),
          { type: 'teleportPlayer', regionId: 'zhongnanshan', buildingId: 'zn_tomb', spotId: 'zn_tb_jadebed' },
          { type: 'setFlag', flag: 'znq27_return_triggered', value: true },
          openScene('scene_znq27_25', ZHONGNAN_Q27_QUEST_ID),
        ],
      },
      {
        id: 'znq27_ch_self_return',
        label: '先于途中休整调息，稍后自行返回活死人墓昆仑寒玉床石室',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q27_QUEST_ID, 'return_tomb_jadebed'),
          openScene('scene_znq27_23', ZHONGNAN_Q27_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq27_23: {
    id: 'scene_znq27_23',
    title: '第二十三幕 · 归心似箭望秦川',
    subtitle: '关中官道',
    mandatory: true,
    beats: [
      N('秦岭雪峰已在望中，请速返【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】向恩师林朝瑶复命。'),
    ],
  },

  scene_znq27_24: {
    id: 'scene_znq27_24',
    title: '第二十四幕 · 重返幽谷寒玉室',
    subtitle: '活死人墓幽谷石室',
    mandatory: true,
    beats: [
      N('推开厚重断龙石门，古墓长明油灯依旧清冷幽静。你快步穿过石廊，步入寒气森森的【昆仑寒玉床冰魄石室】。'),
    ],
    onFinishEffects: [openScene('scene_znq27_25', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_25: {
    id: 'scene_znq27_25',
    title: '第二十五幕 · 冰魄石室献寒髓',
    subtitle: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
    illustrationUrl: '/assets/quests/zn_q27_jade_marrow_return.jpg',
    illustrationCaption: '寒玉床裂痕在万年寒玉髓碧光中缓缓愈合，林朝瑶神色欣慰，暗赞弟子万里奇功',
    mandatory: true,
    beats: [
      N('石室之内，寒玉仙子【林朝瑶】正盘坐于微有裂纹的寒玉床畔调息。见你风尘仆仆归来、双手呈上寒光四射的「万年寒玉髓」与「天山雪莲」，林朝瑶一向清冷无波的眼眸中骤然泛起柔和笑意。'),
      S('NPC-0114', '“万里昆仑绝域，你竟真的完好无损带回了万年寒玉髓与雪莲……就连天山童姥巫行云那一关，你也挺直脊梁闯过了？”'),
      P('“弟子不敢辱没活死人墓门风！只是童姥临别相告，星宿老怪丁春秋近来似在暗中窥伺终南，弟子担心古墓外围恐有变故。”'),
    ],
    onFinishEffects: [openScene('scene_znq27_26', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_26: {
    id: 'scene_znq27_26',
    title: '第二十六幕 · 重续万年寒玉脉',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('林朝瑶玉手轻拂，以深厚《玉女心经》内力将万年寒玉髓缓缓融进寒玉床核心裂隙！刹那间，整座石室蓝光大盛，原本衰微的寒气重新充盈澎湃，连带你在旁调息亦觉经脉清凉通透！'),
      S('NPC-0114', '“寒玉床既已修复，我须立刻闭关三日，借雪莲与寒玉髓之力将《玉女心经》冲破最后一层关隘，以备将至的西夏大劫。”'),
    ],
    onFinishEffects: [openScene('scene_znq27_27', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_27: {
    id: 'scene_znq27_27',
    title: '第二十七幕 · 师尊托付护墓责',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“我闭关这三日，若星宿派妖人果真趁虚而入，活死人墓前厅与【天罗地网捕雀轻功厅】的守御重任，便交予你与冷清秋、白清霜共同执掌！”'),
      P('“弟子领命！师父只管安心闭关，绝不容星宿毒贼踏入石室半步！”'),
    ],
    onFinishEffects: [openScene('scene_znq27_28', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_28: {
    id: 'scene_znq27_28',
    title: '第二十八幕 · 寒玉淬骨悟极境',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('临出石室前，林朝瑶命你于修复后的寒玉床畔静坐片刻，将一路自巴山青城、江宁赤壁到昆仑瑶池所历生死与大宗师威压一一沉淀化为己用。'),
    ],
    onFinishEffects: [openScene('scene_znq27_29', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_29: {
    id: 'scene_znq27_29',
    title: '第二十九幕 · 寒夜将临听毒风',
    subtitle: '活死人墓幽谷石室',
    mandatory: true,
    beats: [
      N('断龙石门缓缓闭合，林朝瑶正式入关。而幽谷之外的夜风里，一缕若有若无的腥甜毒雾正悄然自山脚弥漫而上……'),
    ],
    onFinishEffects: [openScene('scene_znq27_30', ZHONGNAN_Q27_QUEST_ID)],
  },

  scene_znq27_30: {
    id: 'scene_znq27_30',
    title: '第三十幕 · 瑶池万里功业成',
    subtitle: '终南山隐宗 · 活死人墓幽谷石室',
    mandatory: true,
    beats: [
      N('古墓三大远征圆满告捷！速往【活死人墓幽谷石室 · 天罗地网捕雀轻功厅】戒备，迎接即将爆发的星宿夜袭与古墓尊使晋升之战！'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
      { type: 'giveSilver', amount: 340, reason: '万里昆仑采得万年寒玉髓赏赐' },
      { type: 'giveCombatExp', amount: 1700, reason: '昆仑瑶池破乌老大并承天山童姥威压试探' },
      { type: 'addSectContribution', amount: 400 },
      { type: 'modifyRenown', delta: 75, reason: '昆仑瑶池傲骨不跪赢得天山童姥赞许' },
      { type: 'modifyChivalry', delta: 40, reason: '雪莲池畔仗剑护助钟离雪' },
      { type: 'modifySkill', key: '骑术', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 15 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0265' }, delta: 12 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0102' }, delta: 8 },
      { type: 'setFlag', flag: 'zn_q27_kunlun_jade_done', value: true },
      {
        type: 'completeQuest',
        questId: ZHONGNAN_Q27_QUEST_ID,
        outcome: 'jade_marrow_secured',
        combatExp: 700,
      },
      toast(
        '【瑶池万里 · 昆仑采玉】完结！寒玉床已修复，请速往天罗地网捕雀厅戒备星宿派夜袭！',
        'success',
        '古墓远征',
      ),
    ],
  },
}
