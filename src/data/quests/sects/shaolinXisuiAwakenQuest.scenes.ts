import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q36_QUEST_ID } from './shaolinXisuiAwakenQuest'

const SPEAKER_WULIN_SPECTATOR: StorySpeakerSpec = {
  kind: 'custom',
  name: '关中剑客 · 陆青云',
  title: '观礼群雄',
  factionName: '中原武林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_SHAOLIN_ATTENDANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '石室护侍僧 · 慧清',
  title: '达摩院护经僧',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

export const SHAOLIN_Q36_SCENES: Record<string, StorySceneDef> = {
  scene_slq36_01: {
    id: 'scene_slq36_01',
    title: '第一幕 · 寒玉垂泪',
    subtitle: '嵩山少林寺 · 达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，前山大雄宝殿前的喧嚣尚未散尽，达摩面壁石洞深处的幽谷石室却静寂如太古。寒玉榻上，白眉垂颊的少林神僧【玄澄】听见你的脚步声，缓缓睁开清澈却饱含沧桑的双眸。'),
      S(
        'NPC-0109',
        '（声音微弱却洞彻人心）“前山钟鼓坪上的惊天巨变，慧清已一五一十禀告老衲。{ifFlagEq:sl_q35_stance=zen_rebuke|你引《维摩诘经》一言喝退满山看客，不卑不亢、禅智圆融，老衲闻之甚慰！|}{ifFlagEq:sl_q35_stance=defend_abbot|你护持玄慈师兄公断还业、以慈悲大度稳住群雄，不失慈悲禅院本怀！|}{ifFlagEq:sl_q35_stance=iron_law|你当众宣示依清规公审绝不徇私，虽锋芒略盛，却亦是为保千年祖庭不坠！|}{ifFlag:sl_q35_jiumozhi_exposed|更难得的是，你竟于丹墀一眼看破鸠摩智《小无相功》之虚火根底！|只是鸠摩智仍踞山坪虎视眈眈，非彻底破其虚妄不足以重振山门。}”',
      ),
      N('话音未落，两行清泪忽顺着玄澄枯槁眼角滑落寒玉榻面，凝作两点晶莹霜珠。'),
      S('NPC-0109', '（老泪纵横，声带哽咽）“老衲当年号称少林两百年来第一武学奇才，贪功冒进强练十三门绝技，忘了以慈悲佛法化解戾气，落得一夜经脉尽废、枯坐寒玉榻数十载！今日寺门遭此大劫，老衲竟连下榻迎敌也做不到……”'),
      S('NPC-0109', '（拭去泪痕，眸中忽亮起如佛灯长明般的光彩）“好孩子，你一路潜修经义书法、心怀慈悲无垢禅心，正是老衲苦等一生的【洗髓真传】之主！达摩祖师昔年将与《易筋经》齐名的镇寺天阶至宝《洗髓经》，以古梵秘篆刻于后洞绝壁之内！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_02', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_02: {
    id: 'scene_slq36_02',
    title: '第二幕 · 舍利伽蓝',
    subtitle: '幽谷石室 · 寒玉榻前',
    illustrationUrl: '/assets/quests/sl_36_sarira_beads.jpg',
    illustrationCaption: '幽谷石室寒玉榻前 · 玄澄老泪纵横，亲手将天阶圣物「少林舍利伽蓝念珠」挂于主角颈间',
    mandatory: true,
    beats: [
      N('玄澄示意侍立一旁的【慧清】捧出沉香紫檀佛匣。匣盖开启刹那，清雅檀香与澄澈禅定微光弥漫整座石室——百八颗千年菩提子温润如古玉，乃少林历代高僧圆寂舍利温养而成的天阶圣物【少林舍利伽蓝念珠】！'),
      N('玄澄颤巍巍抬臂，亲手为你挂于颈间。念珠贴近胸口，一股清凉如雪山甘泉的梵音灵光直透百会，令数日风波积郁的焦躁瞬间消散！'),
      S('NPC-0109', '（手掌轻按你肩头，笑意安详）“此珠有『梵音清心』之效，可护你在达摩石壁前百日心斋不受心魔外障侵扰。鸠摩智以虚妄外道强催七十二绝技，唯《洗髓经》『照见五蕴皆空、直指真气本源』方能彻底破之。去罢，于寒玉榻前定下你的闭关心志——”'),
    ],
    choices: [
      {
        id: 'slq36_init_mercy',
        label: '【洗髓济世】愿涤尽自身凡髓尘垢，他日以无垢禅心化去少室戾气！',
        subLabel: '以慈悲心斋证无上菩提（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q36_init_vow', value: 'mercy' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          { type: 'startQuest', questId: SHAOLIN_Q36_QUEST_ID, stepId: 'hundred_day_zen' },
          setStep(SHAOLIN_Q36_QUEST_ID, 'hundred_day_zen'),
          toast('已开启《寒玉百日 · 洗髓换骨》！请前往【绝壁石刻 · 剑痕崖】参悟洗髓真传！', 'talk', '寒玉百日'),
        ],
      },
      {
        id: 'slq36_init_protect',
        label: '【破妄护寺】愿速悟洗髓真机，出关亲破鸠摩智虚妄护我千年祖庭！',
        subLabel: '以卫道宏愿直指破妄（怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q36_init_vow', value: 'protect' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          { type: 'startQuest', questId: SHAOLIN_Q36_QUEST_ID, stepId: 'hundred_day_zen' },
          setStep(SHAOLIN_Q36_QUEST_ID, 'hundred_day_zen'),
          toast('已开启《寒玉百日 · 洗髓换骨》！请前往【绝壁石刻 · 剑痕崖】参悟洗髓真传！', 'talk', '寒玉百日'),
        ],
      },
    ],
  },

  scene_slq36_03: {
    id: 'scene_slq36_03',
    title: '第三幕 · 古梵秘篆',
    subtitle: '嵩山少林寺 · 达摩面壁石洞 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('你辞别玄澄师伯，循石室后侧青苔暗阶步入绝壁石刻深处，依言轻按石壁佛莲暗印。一声低沉机括轻响，半丈青石缓缓移开，露出一方尘封五百年的暗凹石龛——内壁密刻古天竺悉昙梵文与北魏楷书双注！'),
      P('（以指轻抚历经五百年风蚀的石刻，神情震撼）“这竟是达摩祖师口授、二祖慧可手书刻石的《洗髓经》真本！若非多年深耕经义与古碑书法，这些梵汉双文根本无从句读！”'),
      N('你凝神逐字校勘：“夫凡夫修武，唯求筋强力猛、招奇势霸，殊不知外劲愈盛、内浊愈深，终成武学大障。欲证无上神髓，必先以心斋寂照，洗去脏腑经脉积垢，使真气清澈如琉璃，方能洞见万法虚妄……”'),
      P('（心中豁然开朗，盘膝坐于寒石之上）“原来如此！世人练功是『增』，唯有《洗髓经》是『洗』！去伪存真，涤尽尘垢，方见本心！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_04', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_04: {
    id: 'scene_slq36_04',
    title: '第四幕 · 达摩石壁',
    subtitle: '绝壁石刻 · 百日心斋初境',
    illustrationUrl: '/assets/quests/sl_36_damo_wall.jpg',
    illustrationCaption: '达摩面壁石洞绝壁石刻 · 孤灯微明下以指摩挲五百年古梵洗髓秘篆',
    mandatory: true,
    beats: [
      N('你双目微合、结禅定印，胸前【少林舍利伽蓝念珠】随之发出极其细微却如天籁澄净的嗡鸣。自这一刻起，你屏绝外缘，于五百年达摩石壁之前展开【百日心斋禅定】！'),
      N('转眼初三十日，寒风透骨，石洞滴水成冰。就在内息渐渐入静之际，过往种种执念与惊变竟如汹涌业火翻腾而起！'),
      N('眼前陡现幻象——白马寺玄悲师叔圆睁不瞑的血目、罗汉堂玄苦师叔渐冷的枯手、大雄殿丹墀上玄慈方丈被数千群雄指点嘲笑的佝偻背影，一幕幕直撞灵台，丹田真气骤然狂躁沸腾！'),
    ],
    onFinishEffects: [openScene('scene_slq36_05', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_05: {
    id: 'scene_slq36_05',
    title: '第五幕 · 第一悟 · 破我执',
    subtitle: '绝壁石刻 · 心魔炼心（洗髓第一悟）',
    mandatory: true,
    beats: [
      N('幻象愈演愈烈！玄悲惨死、玄苦圆寂、方丈蒙羞、鸠摩智狂笑逼宫之景交织成漫天血火，直欲将你的心神拖入无边嗔恚与走火入魔的深渊！'),
      N('胸前舍利念珠清光急闪。面对这股足以撕裂经脉的愤懑心魔，你的神识必须在刹那之间择定破执之道——'),
    ],
    choices: [
      {
        id: 'slq36_zen1_wrath',
        label: '“师叔血仇岂能忘怀！便将这满腔悲愤燃作伏魔烈火，誓要荡尽乱寺外魔！”',
        subLabel: '顺应悲愤化作杀意，以烈火战意冲破幻境',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q36_zen1', value: 'wrath' },
          openScene('scene_slq36_06', SHAOLIN_Q36_QUEST_ID),
        ],
      },
      {
        id: 'slq36_zen1_empty',
        label: '“见苦生悲而非生嗔……诸相虚妄，愤懑亦障！且以空明定力洗净经脉戾气，守本心不染！”',
        subLabel: '不随嗔怒流转，以寂照空明直视苦难本相',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q36_zen1', value: 'empty' },
          { type: 'setFlag', flag: 'sl_q36_xisui_perfect', value: true },
          {
            type: 'branch',
            condition: flag('sl_q36_zen1_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q36_zen1_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq36_06', SHAOLIN_Q36_QUEST_ID),
        ],
      },
      {
        id: 'slq36_zen1_suppress',
        label: '“速速闭锁六识！以多年苦修的浑厚内力死死镇压杂念，绝不许其动摇分毫！”',
        subLabel: '强运内劲封锁念头，以硬功压制心魔波动',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q36_zen1', value: 'suppress' },
          openScene('scene_slq36_06', SHAOLIN_Q36_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq36_06: {
    id: 'scene_slq36_06',
    title: '第六幕 · 第二悟 · 融舍利',
    subtitle: '绝壁石刻 · 伐毛洗髓（洗髓第二悟）',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q36_zen1=empty|一念空明，血火幻象顿如晨露遇日消融无踪！一股前所未有的澄澈禅意自灵台倾泻而下，周身躁动真气刹那归于寂静如镜！|}{ifFlagEq:sl_q36_zen1=wrath|烈火战意虽冲散幻象，胸口却一阵闷痛灼热，多亏胸前舍利伽蓝念珠急散清凉梵音，方才将濒临逆乱的真气勉强拉回正轨！|}{ifFlagEq:sl_q36_zen1=suppress|强行镇压之下杂念暂退，却如暗潮潜伏经脉深处隐隐鼓荡，全赖舍利念珠清辉相助方得稳住灵台！|}'),
      N('转瞬第六十日，洞外瑞雪初降。你周身毛孔忽渗出细密如墨的腥臭浊汗，骨骼深处泛起春冰初裂般的酥麻剧震——那是数十年修武积于骨髓的暗伤与戾气正在剥离！'),
      N('与此同时，颈间【少林舍利伽蓝念珠】清光大盛，柔和磅礴的佛门灵气顺膻中穴涌入奇经八脉，与你原有内劲轰然相接！此刻你当如何导引这股舍利灵气？'),
    ],
    choices: [
      {
        id: 'slq36_zen2_wash',
        label: '【顺脉涤垢】舍弃外劲锋芒，引舍利清光顺奇经缓缓冲刷，去伪存真照见五蕴本源',
        subLabel: '不求增功，但求涤尽经脉积垢使真气清澈如琉璃',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q36_zen2', value: 'wash' },
          { type: 'setFlag', flag: 'sl_q36_zen2_perfect', value: true },
          {
            type: 'branch',
            condition: flag('sl_q36_zen2_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q36_zen2_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq36_07', SHAOLIN_Q36_QUEST_ID),
        ],
      },
      {
        id: 'slq36_zen2_force',
        label: '【强冲死穴】催动舍利灵气猛冲任督玄关，借此千载良机一举暴增内力',
        subLabel: '汇集灵气冲关破壁，求取刚猛雄浑之功力进境',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q36_zen2', value: 'force' },
          openScene('scene_slq36_07', SHAOLIN_Q36_QUEST_ID),
        ],
      },
      {
        id: 'slq36_zen2_edge',
        label: '【聚锋凝锐】将舍利灵气尽数贯注双掌十指，淬炼无坚不摧的制敌指掌锐锋',
        subLabel: '凝灵气于招式锋芒，专备前山克敌制胜',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q36_zen2', value: 'edge' },
          openScene('scene_slq36_07', SHAOLIN_Q36_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq36_07: {
    id: 'scene_slq36_07',
    title: '第七幕 · 洗髓换骨',
    subtitle: '达摩面壁石洞 · 百日禅定功成',
    illustrationUrl: '/assets/quests/sl_36_hundred_day_zen.jpg',
    illustrationCaption: '达摩洞百日心斋禅定功成 · 晨曦透洞，舍利念珠流光映照，洗尽凡髓悟透《洗髓经》',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q36_zen2=wash|舍利清光顺脉如春雪融溪，数十年暗伤戾气一扫而空！你与五百年达摩石壁仿佛融为一体，百脉如无垢琉璃般纤尘不染！|}{ifFlagEq:sl_q36_zen2=force|经脉一阵剧震之后，石壁古梵微光缓缓将你过急的真气抚平，你幡然省悟「洗髓非强冲、乃顺化」，终将沸腾灵气收归丹田！|}{ifFlagEq:sl_q36_zen2=edge|指掌锋芒虽盛，却与石壁寂照禅意相抵；你听见舍利念珠一声清鸣，忽醒悟招锋皆妄，急敛锐气归元，终于踏入洗髓门径！|}'),
      N('第九十日至第一百日黎明，一缕金红朝阳穿透云雾斜照石壁！你灵台升起一轮纤尘不染的皓月，当日鸠摩智所施「拈花指」「般若掌」「燃木刀」在神识中一帧帧拆解如绘——那分明是以道家【小无相功】强行模拟的虚妄无根之术！'),
      N('你缓缓睁眼，眸光内敛如古玉生辉，丹田之中洗髓真气如琉璃清泉奔流不息——失传数百年的少林天阶内功【洗髓经】，已彻悟于心！'),
      S(SPEAKER_SHAOLIN_ATTENDANT, '（守在洞外的慧清见你出关，喜极而泣旋即急禀）“师兄终于出关了！鸠摩智在山外盘桓多日，今日再度率吐蕃僧众闯上【钟鼓禅院 · 演武坪】，扬言少林无人敢战，要亲手摘下少林寺匾额！”'),
      P('（抚摸胸前温润流光的舍利伽蓝念珠，微笑颔首）“凡髓既洗，妄念已空。劳慧清师弟回报玄澄师伯：弟子已承《洗髓经》，略作调息便赴演武坪请大轮明王下山！”'),
    ],
    choices: [
      {
        id: 'slq36_awaken_and_depart',
        label: '融舍利灵气、当场彻悟天阶内功《洗髓经》并获赐【少林舍利伽蓝念珠】，重返演武坪！',
        subLabel: '当场习得并自动运使《洗髓经》（可先闭关精修后再赴【钟鼓禅院 · 演武坪】终战鸠摩智）',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-011', minLevel: 1 },
            thenEffects: [],
            elseEffects: [
              {
                type: 'teachMartialArt',
                artId: 'MA-011',
                autoEquip: true,
                replaceArtIds: ['MA-038', 'MA-100', 'MA-159'],
              },
            ],
          },
          {
            type: 'branch',
            condition: flag('sl_q36_sarira_given', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'giveItem', itemId: 'ACC-004', qty: 1 },
              { type: 'setFlag', flag: 'sl_q36_sarira_given', value: true },
            ],
          },
          setStep(SHAOLIN_Q36_QUEST_ID, 'break_jiumozhi'),
          toast(
            '百日心斋功成！已习得天阶内功《洗髓经》并获赐「少林舍利伽蓝念珠」！可先闭关修炼，再赴【钟鼓禅院 · 演武坪】破敌！',
            'success',
            '洗髓换骨',
          ),
        ],
      },
    ],
  },

  scene_slq36_08: {
    id: 'scene_slq36_08',
    title: '第八幕 · 识破无相',
    subtitle: '嵩山少林寺 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('演武坪上剑拔弩张，几名罗汉堂武僧嘴角溢血，刚被【鸠摩智】一记「多罗叶指」震退！你步履从容如青莲浮水飘落坪心，胸前舍利伽蓝念珠微光流转，周身再无半分戾气，却渊渟岳峙令喧嚣顿止。'),
      S('NPC-0113', '（负手哂笑，眼中满是轻蔑）“小僧当是谁来了，原来是当日躲进后山闭门不出的少林后辈！怎么，今日敢独自来领教小僧的少林七十二绝技了么？”'),
      P('（双掌合十，清越佛音传遍山谷数千群雄耳畔）“明王不必自欺欺人！{ifFlag:sl_q35_jiumozhi_exposed|前番丹墀贫僧便曾点破你内息虚浮，今日更看得分明——|今日贫僧彻悟禅机，已将你根底看得一清二楚——}你方才那一指起手似『多罗叶指』，可真气行至手太阴肺经却骤然转虚为柔，全凭道家【小无相功】强行模拟少林绝技皮毛！强催七十二绝技，早已埋下经脉逆乱之祸！”'),
      S(SPEAKER_WULIN_SPECTATOR, '（拍案大哗，满山群雄顿时炸开了锅）“原来大轮明王号称通晓少林七十二绝技，竟全是用道家《小无相功》画虎类犬伪装的？！”'),
      S('NPC-0113', '（面容霎时铁青，往日宝相庄严荡然无存，双掌骤燃炽烈无形刀气）“住口！休得胡言乱语坏我清名！今日便叫你尝尝小无相功催动七十二绝技与火焰刀的真正威力！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_09', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_09: {
    id: 'scene_slq36_09',
    title: '第九幕 · 破妄之战',
    subtitle: '钟鼓禅院 · 演武坪（宗师中品 · 战前策略抉择）',
    mandatory: true,
    beats: [
      N('鸠摩智恼羞成怒，明黄袈裟鼓荡如帆，小无相功催动拈花指、般若掌与无形火焰刀齐齐压来，灼热罡气几乎点燃青石落叶！'),
      N('你丹田之中《洗髓经》琉璃真气静如深潭，胸前舍利念珠清鸣护心。面对势如狂澜的吐蕃护国法王，你择定迎战之策——'),
    ],
    choices: [
      {
        id: 'slq36_jmz_counter_flow',
        label: '【洗髓导火】以洗髓空明气韵反导火焰刀虚火，令其小无相功焦躁气浮！（撑过 5 回合）',
        subLabel: '需破我执圆满悟道或经义 ≥ 88 · 借力化虚直击小无相功破绽',
        tone: 'gold',
        condition: {
          type: 'any',
          hint: '需在寒玉洞第一悟破我执圆满，或经义 ≥ 88',
          conditions: [
            flag('sl_q36_xisui_perfect', 'truthy'),
            { type: 'skillAtLeast', key: '经义', min: 88 },
          ],
        },
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q36_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0113',
              talkOverride:
                '“胡说！我的小无相功无形无相，你怎可能反导我的火焰刀气？看招！”',
            },
            rule: 'survive_rounds',
            maxRounds: 5,
            forbidEscapeReason: '此战关乎少林五百年正宗法统，唯有破妄退敌方能重振山门！',
            introText: '【洗髓导火】以空明洗髓气韵反导火焰刀虚火，在吐蕃国师【鸠摩智】狂攻下撑住五回合破其功体！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q36_jmz_tactic', value: 'counter_flow' },
              openScene('scene_slq36_10', SHAOLIN_Q36_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('鸠摩智火焰刀与小无相功凌厉莫测，暂运《洗髓经》归元调息后再战！', 'warn', '破妄震敌'),
            ],
          },
        ],
      },
      {
        id: 'slq36_jmz_head_on',
        label: '【正大硬撼】堂皇正大以佛门洗髓真气正面硬撼大轮明王！（撑过 5 回合）',
        subLabel: '零门槛正攻 · 撑住五回合或提前击败，正面击溃吐蕃国师',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q36_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0113',
              talkOverride:
                '“狂妄小僧！今日便叫你见识小僧催动七十二绝技与火焰刀的无双神威！”',
            },
            rule: 'survive_rounds',
            maxRounds: 5,
            forbidEscapeReason: '此战关乎少林五百年正宗法统，唯有破妄退敌方能重振山门！',
            introText: '【破妄震敌】以正大佛门真气正面迎战吐蕃护国法王【鸠摩智】，撑住五回合破尽虚妄！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q36_jmz_tactic', value: 'head_on' },
              openScene('scene_slq36_10', SHAOLIN_Q36_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('鸠摩智火焰刀势不可挡，暂运《洗髓经》调匀内息后再破其锋！', 'warn', '破妄震敌'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq36_10: {
    id: 'scene_slq36_10',
    title: '第十幕 · 二十合破功',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q36_jmz_tactic=counter_flow|转眼激战至第二十合！你每一次拂袖皆以洗髓空明气韵将炽烈火焰刀气引偏反导，鸠摩智体内小无相功虚火受激骤然焦躁气浮，变招换气的死穴暴露无遗！|转眼激战至第二十合！鸠摩智越打越是心惊——自己每变一门少林绝技，对方洗髓无垢真气皆堂皇正大、丝毫不为虚招所惑，反而总能提前半拍点在自己气脉转折之处！}'),
      P('（双掌轻合复又平推，洗髓无垢真气如雪山清泉奔涌，不带半分杀气却直透膻中气海）“明王，小无相功强催七十二绝技，根基已乱，还不醒悟？！”'),
      N('“蓬——！”一声沉闷如古钟长鸣的巨响！鸠摩智护体小无相罡气应声瓦解，整个人如断线风筝般倒飞两丈，连退七步单膝微屈，“哇”地喷出一大口鲜血！'),
      S('NPC-0113', '（捂胸骇然失色，声音发颤）“噗……好精纯的无垢佛门内功……竟能直接震散我的小无相功气脉……这……这难道是少林失传百年的《洗髓经》？！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_11', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_11: {
    id: 'scene_slq36_11',
    title: '第十一幕 · 退败下山',
    subtitle: '大雄宝殿山坪 · 战后处置抉择',
    illustrationUrl: '/assets/quests/sl_36_defeat_jiumozhi.jpg',
    illustrationCaption: '大雄宝殿山坪 · 《洗髓经》二十合破尽小无相功虚妄，大轮明王鸠摩智吐血退败',
    mandatory: true,
    beats: [
      N('满场数千群雄先是一片死寂，随即爆发出惊天动地的欢呼！少林数百僧众热泪盈眶齐宣佛号，连暗处观望的星宿老怪丁春秋亦暗自心寒，悄悄收扇退避三舍！'),
      S('NPC-0113', '（擦去唇角血迹，灰败面容中透出深沉震骇，缓缓合十）“阿弥陀佛……中原少林果真卧虎藏龙。小僧贪求绝技败在《洗髓经》之下，无话可说……”'),
      N('看着眼前这位天资绝顶、却因贪嗔执念强练七十二绝技而经脉暗藏隐疾的吐蕃法王，你收掌而立，决意送他最后一句临别之言——'),
    ],
    choices: [
      {
        id: 'slq36_post_enlighten',
        label: '【慈悲点化】点破其强催绝技之经脉隐疾，劝其早散虚火、莫步武学障后尘',
        subLabel: '以佛门慈悲渡化强敌，不结死仇（禅心慈悲 +2）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q36_post_jmz', value: 'enlighten' },
          {
            type: 'branch',
            condition: flag('sl_q36_post_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q36_post_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq36_12', SHAOLIN_Q36_QUEST_ID),
        ],
      },
      {
        id: 'slq36_post_banish',
        label: '【严辞逐客】厉声喝斥其妄图并吞祖庭之野心，逐其即刻下山永不再犯中原！',
        subLabel: '立威少室群雄，震慑西域觊觎外道（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q36_post_jmz', value: 'banish' },
          {
            type: 'branch',
            condition: flag('sl_q36_post_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q36_post_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq36_12', SHAOLIN_Q36_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq36_12: {
    id: 'scene_slq36_12',
    title: '第十二幕 · 归报寒玉',
    subtitle: '达摩面壁石洞 · 幽谷石室',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q36_post_jmz=enlighten|鸠摩智闻你点破他体内隐疾，浑身剧震良久，终长叹一声深施一礼：“大师慈悲胸怀，胜小僧十倍！”随即率吐蕃随从黯然下山。|鸠摩智面色铁青无颜以对，唯抱拳涩声告退，率吐蕃随从狼狈退下少室山道，满山群雄无不拍手称快！}'),
      S('NPC-0127', '（上前抚须赞叹，老怀大慰）“善哉！失传百年的《洗髓经》竟在你手中重现世间，二十合震退吐蕃国师，今日之后天下还有谁敢轻言我少林无人？！”'),
      N('山坪风波既平，你立刻重返幽谷石室寒玉榻前向【玄澄】师伯报捷。玄澄听罢抚掌大笑，眼中含泪却神采奕奕！'),
      S('NPC-0109', '“哈哈哈哈！好！好啊！老衲毕生所愿便是见《洗髓经》后继有人！今朝得见你以无垢禅心破妄退敌，纵使明日归西亦再无遗憾！只是潜伏藏经阁三十年的萧远山与幕后黑手尚未了结，切记常持慈悲本心，化解少林最后的因果大劫。”'),
    ],
    onFinishEffects: [openScene('scene_slq36_13', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_13: {
    id: 'scene_slq36_13',
    title: '第十三幕 · 洗髓大成',
    subtitle: '嵩山少林寺 · 禅心无垢',
    mandatory: true,
    beats: [
      P('（合十躬身三拜，目光清澈如水）“弟子谨记师伯教诲！无论藏经阁深处尚有多少三十载恩怨因果，弟子必以慈悲洗髓之心担之、化之！”'),
      N('寒玉百日，洗髓换骨。胸前【少林舍利伽蓝念珠】微光温润，体内天阶至宝《洗髓经》生生不息，你自此跻身中原佛门无上宗师之列！'),
    ],
    choices: [
      {
        id: 'slq36_finish_reward',
        label: '谨受《洗髓经》真传与舍利伽蓝念珠，重振少林清誉（完成）',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-011', minLevel: 1 },
            thenEffects: [],
            elseEffects: [
              {
                type: 'teachMartialArt',
                artId: 'MA-011',
                level: 1,
                autoEquip: true,
                replaceArtIds: ['MA-038', 'MA-100', 'MA-159'],
              },
            ],
          },
          {
            type: 'branch',
            condition: flag('sl_q36_sarira_given', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'giveItem', itemId: 'ACC-004', qty: 1 },
              { type: 'setFlag', flag: 'sl_q36_sarira_given', value: true },
            ],
          },
          {
            type: 'giveCombatExp',
            amount: 1400,
            reason: '达摩洞百日心斋悟透《洗髓经》，山坪二十合击破鸠摩智虚妄根底',
          },
          {
            type: 'branch',
            condition: flag('sl_q36_xisui_perfect', 'truthy'),
            thenEffects: [
              {
                type: 'giveCombatExp',
                amount: 200,
                reason: '寒玉洞破我执空明圆满之无上禅悟嘉奖',
              },
            ],
            elseEffects: [],
          },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '书', delta: 1 },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0109' },
            delta: 30,
          },
          { type: 'completeQuest', questId: SHAOLIN_Q36_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《寒玉百日 · 洗髓换骨》！习得天阶内功《洗髓经》、获赐「少林舍利伽蓝念珠」，经义 +2、书 +1、玄澄好感 +30！',
            'success',
            '洗髓换骨',
          ),
        ],
      },
    ],
  },
}
