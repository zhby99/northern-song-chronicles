import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, setStep, warn, toast, openScene } from '../../../engine/quest/dsl'
import { HUASHAN_ENTRY_QUEST_ID } from './huashanEntryQuest'

const RECLUSE_SPEAKER = {
  kind: 'custom' as const,
  name: '云台棋叟',
  title: '麻衣淋雨的古怪老道',
  factionName: '西岳隐逸',
}

const PORTER_ZHOUBO_SPEAKER = {
  kind: 'custom' as const,
  name: '挑山夫周伯',
  title: '华阴老脚夫',
  factionName: '关中百姓',
}

const HERB_BOY_SPEAKER = {
  kind: 'custom' as const,
  name: '采药童阿石',
  title: '华阴山童',
  factionName: '关中百姓',
}

const ARROGANT_SCION_SPEAKER = {
  kind: 'custom' as const,
  name: '锦袍世家子',
  title: '携金求剑客',
  factionName: '关西豪族',
}

const INFILTRATOR_SPEAKER = {
  kind: 'custom' as const,
  name: '黑衣夜行人',
  title: '西夏一品堂探子',
  factionName: '西夏暗桩',
}

const SCENE_HS_00_GATE_NO_FATE: StorySceneDef = {
  id: 'scene_hs_00_gate_no_fate',
  title: '山门云深 · 不迎无缘之客',
  subtitle: '西岳华山 · 玉女峰紫霞道观',
  beats: [
    N('西岳华山壁立千仞，玉女峰巅松涛如海。你沿着山麓石径仰望紫霞道观朱门，只见青石阶上一尘不染，几名身背长剑、气度沉凝的青衣道人正送客下山。'),
    S('NPC-0202', '居士请留步。家师太岳真君常言：华山一脉承陈抟希夷老祖遗风，不看金银厚礼，亦不贪江湖虚名，唯重一个“缘”字与一颗澄明向道之心。'),
    S('NPC-0202', '眼下居士与我西岳松风尚少一桩尘世因果。听闻近日关中秋雨连绵，【京兆府（长安）】城南茶肆与终南山麓常有本门隐逸前辈独弈听雨——居士不妨先赴长安红尘中走一遭，若果真有缘，自会重登此峰。'),
  ],
  onFinishEffects: [
    toast('华山门墙重缘不重势：不妨先前往【京兆府（长安）】寻访秋雨茶肆间的松风棋缘。', 'talk', '西岳寻缘'),
  ],
}

const SCENE_HS_22_WIDE_CLOUDS: StorySceneDef = {
  id: 'scene_hs_22_wide_clouds',
  title: '第二十二幕 · 清泉洗剑始修行',
  subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
  mandatory: true,
  beats: [
    S('NPC-0166', '你既已入我门墙，切记华山武学最忌好高骛远。你入山前未曾习武，丹田如一张白纸，反倒没有旁门杂气的滞碍——这正是修习本门正宗内息的上佳根底。'),
    S('NPC-0166', '自今日起，你可在【门派事务】中向师门请教外门根基《华山基础心法》与《华山剑法（入门十二式）》，于演武院或客栈按日静修吐纳。待你境界踏入三流上品、在山门历练满百二十日，便可晋升内门，参研《养吾剑法》《落雁剑法》与《华山混元掌》。'),
    S('NPC-0147', '哈哈，还有一句话老夫替掌门师兄说了！日后你剑术若有小成，或是心中生了滞碍，尽管上落雁峰论剑台来找老夫拆招，或是去思过崖石洞里瞧瞧前辈留下的刻痕！'),
    P('弟子谨记掌门、师娘与秦师叔教诲！定当澄心养气，不堕西岳威名！'),
    N('山风拂过玉女峰顶，将你身上的青灰道袍吹得猎猎作响。腰间那柄崭新的青钢长剑轻轻叩击云头布履，发出一声清越悠长的轻鸣——属于你的西岳剑道，自此在万丈云海之上徐徐铺展。'),
  ],
  onFinishEffects: [
    toast('已正式列籍【华山派 · 外门弟子】！获赐青灰道袍、道士云头布履、华山入门青钢剑，可于门派面板修习《华山基础心法》与《华山剑法（入门十二式）》。', 'success', '问剑西岳'),
  ],
}

const SCENE_HS_21_BESTOW_SWORD: StorySceneDef = {
  id: 'scene_hs_21_bestow_sword',
  title: '第二十一幕 · 紫气东来授青锋',
  subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
  illustrationUrl: '/assets/quests/huashan_zixia_dawn_sword.jpg',
  illustrationCaption: '玉女峰紫霞殿 · 东峰紫气授青锋',
  mandatory: true,
  beats: [
    N('殿内檀香袅袅，正中悬挂着华山希夷老祖陈抟酣睡白云间的古画。掌门岳沧溟端立香案之前，宁清羽、秦烈山、高沧云、梁惊风分列左右，晨曦穿过雕花木格，恰照亮案上一柄寒光湛然的青钢长剑。'),
    S('NPC-0118', '世人皆道习武须自幼童锤炼筋骨，殊不知剑为凶器，心为剑主。若心术不正、临危躁乱，纵有十载内力，不过多添一介江湖莽夫；反倒是你以一介毫无武功的凡人之躯，于长安雨肆见善心，于苍龙绝壁见胆色，于博台孤棋见灵慧，于思过寒夜见静气。'),
    S('NPC-0118', '今日老夫便代西岳历代祖师收录你入门！入我华山，须守三条铁律：一戒恃剑凌弱、欺压良善；二戒贪功躁进、同门相残；三戒背弃关河、助纣胡虏。你可守得住？'),
    P('弟子纵粉身碎骨，必守华山三戒：不凌弱小，不贪妄功，不负家国关河！'),
    S('NPC-0118', '好！高沧云，取道袍、云履与青钢剑来——自今日起，你便是我西岳华山派门下弟子！'),
    N('高沧云双手捧过叠得方正的【青灰道袍】、【道士云头布履】与那柄沉甸甸的【华山入门青钢剑】。当你双手接过剑鞘的一刹那，殿外东峰恰好跃出一轮赤金朝阳，万道紫气翻涌入殿！'),
  ],
  choices: [
    {
      id: 'hs21_accept_sword',
      label: '双手接过青钢剑，向祖师画轴与掌门行拜师大礼',
      tone: 'gold',
      effects: [
        { type: 'joinSect', sectId: 'SECT-05', rank: 1, allowOfficialTransfer: true },
        {
          type: 'completeQuest',
          questId: HUASHAN_ENTRY_QUEST_ID,
          outcome: 'joined_huashan',
          combatExp: 300,
        },
        { type: 'modifySkill', key: '棋', delta: 5 },
        { type: 'modifyRenown', delta: 25, reason: '凡躯登华山、连破博台残局与思过夜警拜入西岳' },
        { type: 'modifyChivalry', delta: 15, reason: '守正澄心列籍西岳华山' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0118' }, delta: 20 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0166' }, delta: 18 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0147' }, delta: 20 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0202' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0203' }, delta: 12 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0285' }, delta: 12 },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        openScene('scene_hs_22_wide_clouds', 'QST-SECT-05-ENTRY'),
      ],
    },
  ],
}

const SCENE_HS_20_ZIXIA_DAWN: StorySceneDef = {
  id: 'scene_hs_20_zixia_dawn',
  title: '第二十幕 · 东峰迎曦叩真君',
  subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
  mandatory: true,
  beats: [
    N('破晓卯时，天际尚存一抹蟹壳青。你踏着微湿的松针自思过崖返回玉女峰顶，只见东峰迎曦石坪外云海翻腾如万马奔腾，远方黄河在潼关折出一道金线。'),
    S('NPC-0202', '昨夜思过崖之事，秦师叔天未亮便已传讯回禀掌门。当初在道观门前，是我高沧云以貌取人、轻看了师弟的一颗澄明剑心，还望莫怪。'),
    P('高师兄言重了。华山门规森严，师兄当日诘问，本也是护持宗门清誉。'),
    S('NPC-0202', '你能作此想，难怪连眼高于顶的秦师叔都赞不绝口。快随我入【紫霞正气主殿】吧，师父与师娘已在殿中备下香案，为你行收录大礼！'),
  ],
  choices: [
    {
      id: 'hs20_enter_hall',
      label: '整肃衣冠，随高沧云步入紫霞正气主殿',
      tone: 'gold',
      effects: [openScene('scene_hs_21_bestow_sword', 'QST-SECT-05-ENTRY')],
    },
  ],
}

const SCENE_HS_19_QINLIESHAN_NOD: StorySceneDef = {
  id: 'scene_hs_19_qinlieshan_nod',
  title: '第十九幕 · 剑神颔首惊凡胆',
  subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
  mandatory: true,
  beats: [
    N('不过三息之间，两道凌厉无匹的青白色剑光便如九天落雷般掠过山脊！为首一人须发戟张、剑气如虹，正是潼关剑神秦烈山；紧随其后的高沧云长剑斜封，一剑削断了崖边铁爪飞索！'),
    S(INFILTRATOR_SPEAKER, '不好！是秦烈山的老匹夫！思过崖上明明只有一个毫无内息的凡人小子，怎会先用落石诈住咱们、又顺着西风敲响东峰警钟？！快撤！'),
    N('两名黑衣探子魂飞魄散，连滚带爬顺着副索滑入深涧迷雾，只留下一地狼狈散落的拓印宣纸与墨包。秦烈山收剑归鞘，大步流星走到寒潭铜云板旁，上下打量着气定神闲的你。'),
    S('NPC-0147', '哈哈哈哈！好小子！当真是好小子！老夫方才赶来时还捏了一把冷汗，生怕你这手无寸铁的娃娃傻乎乎冲出去送命，或是逆着西风瞎喊白费力气！'),
    S('NPC-0147', '不想你半点武功不会，却懂得借洞口水桶滚动的回声虚张声势、镇住那两个二流好手，再顺着西风敲响云板直传东峰！这份临危不乱的急智，比练十年死剑法强出百倍！'),
    S('NPC-0166', '博台残局见其慧，思过听风见其静，寒夜退敌见其智。明日拂晓卯时，你便回【玉女峰紫霞道观 · 紫霞正气主殿】找掌门领剑入册吧！'),
  ],
  onFinishEffects: [
    setStep(HUASHAN_ENTRY_QUEST_ID, 'zixia_oath'),
    { type: 'advanceShichen', count: 3 },
    toast('已连破【博台孤棋】与【思过听风】双关！请返回【玉女峰紫霞道观 · 紫霞正气主殿】拜见岳沧溟行拜师大礼。', 'success', '思过退敌'),
  ],
}

const SCENE_HS_18_FAIL_RUSH: StorySceneDef = {
  id: 'scene_hs_18_fail_rush',
  title: '思过夜警 · 操之过急惊草蛇',
  subtitle: '思过崖古山洞 · 寒夜失策复试',
  beats: [
    N('你情急之下处置失当——今夜西风凛冽自西向东倒灌，逆风呼喊与火光瞬间被崖口狂风扑灭，反而提前惊动了那两名身手矫健的黑衣探子！'),
    S(INFILTRATOR_SPEAKER, '呸，害老子白吓一跳，原来只是个连内息都没有的守山小杂役！点了他睡穴扔在草堆里，咱们改日再来！'),
    N('黑衣人身影如鬼魅般一晃，隔空指风便令你肩井酸麻瘫倒在地，随即借夜雾从容遁走。半个时辰后，巡山至此的宁清羽替你解开穴道，轻轻叹了口气。'),
    S('NPC-0166', '凡人无武功并不可耻，可惜你忘了白日观察的风向与地势：今夜西风吹向东峰，逆风喊叫声不出十丈；且你若不先在洞口制造动静令贼人投鼠忌器，他们自然肆无忌惮。歇息一日，明夜在思过崖重新静心体悟吧。'),
  ],
  onFinishEffects: [
    { type: 'advanceShichen', count: 12 },
    { type: 'healPlayer', hpPct: -10 },
    warn('思过崖夜警失策（耗时1日调息）：请留意“西风东吹”、“洞口木桶回音疑兵”与“顺风敲响寒潭铜云板”三处线索后重试！', '思过复试'),
  ],
}

const SCENE_HS_18_RING_BELL_TRAP: StorySceneDef = {
  id: 'scene_hs_18_ring_bell_trap',
  title: '第十八幕 · 子夜孤崖凡智退敌',
  subtitle: '思过崖古山洞 · 秘洞外寒风剑坪',
  mandatory: true,
  beats: [
    N('子时三刻，乌云蔽月。思过崖下方的万丈幽谷中，忽然传来两声极轻微的精铁飞爪扣入石缝的“咔哒”声——绝非山猿，亦非寻常松枝折断！'),
    N('你屏住呼吸伏在背风青石后，借着微弱星光，窥见两道蒙面黑影翻上崖沿，正蹑手蹑脚摸向【秘洞古剑刻石室】，低声交谈着“趁华山高手在东峰议事，速拓石壁剑诀献与西夏将军”。'),
    N('此刻你手无寸铁、毫无武功，若硬冲出去必被一招制住。你迅速扫视四周，脑中闪过白日记下的三处地形细节：\n其一，今夜强劲【西风】正从思过崖笔直吹向东峰紫霞观与落雁峰；\n其二，古剑石室窄道口斜放着一只盛满碎石与泉水的备火木桶，桶下垫着一根系有细麻绳的木楔；\n其三，东南下风口十步外的【绝壁银瀑涤心寒潭】旁，悬着一面巡山示警的青铜云板！'),
  ],
  choices: [
    {
      id: 'hs18_insight_stratagem',
      label: '【灵台奇策】拽动细绳踢翻石桶造洞内伏兵回音诈敌，同时疾奔下风口连敲青铜云板！',
      subLabel: '高悟性或通晓策论者一眼看破虚实疑兵与顺风传声之妙',
      tone: 'jade',
      hideWhenUnavailable: true,
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 85 },
          { type: 'skillAtLeast', key: '策论', min: 25 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '策论', delta: 3 },
        openScene('scene_hs_19_qinlieshan_nod', 'QST-SECT-05-ENTRY'),
      ],
    },
    {
      id: 'hs18_rush_stick',
      label: '抄起手边松木柴棍大喝冲出，拼死挡在古剑石室洞口！',
      effects: [openScene('scene_hs_18_fail_rush', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs18_yell_upwind',
      label: '站在西崖迎风高处点起火折子，朝着崖顶逆风放声大喊抓贼！',
      effects: [openScene('scene_hs_18_fail_rush', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs18_wedge_echo_and_bell',
      label: '暗抽麻绳抽掉木楔令石桶滚入石洞激起轰鸣疑兵，趁贼人惊疑驻足，转身奔赴东南下风口猛击青铜云板！',
      tone: 'primary',
      effects: [openScene('scene_hs_19_qinlieshan_nod', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs18_hide_in_cave',
      label: '悄悄钻进秘洞深处躲藏起来，等天亮贼人走后再去禀报长老',
      effects: [openScene('scene_hs_18_fail_rush', 'QST-SECT-05-ENTRY')],
    },
  ],
}

const SCENE_HS_16_FAIL_LISTEN: StorySceneDef = {
  id: 'scene_hs_16_fail_listen',
  title: '蒙目听风 · 耳逐虚声失真意',
  subtitle: '思过崖古山洞 · 宁清羽指点迷津',
  beats: [
    S('NPC-0166', '你摘下素帕再想一想——甲剑破空虽响，却是浮气躁进、鼻息粗重，十招之后必力竭；乙剑步履砸地生坑，一味死守规矩而失之灵动。'),
    S('NPC-0166', '我华山剑道讲求“气行剑先，如松风拂涧，动而不乱，收而不滞”。你且在寒潭边静坐三个时辰洗去耳中浮躁，待心静如水时再来重辨！'),
  ],
  onFinishEffects: [
    { type: 'advanceShichen', count: 3 },
    warn('听风辨剑未中肯綮（耗时3个时辰静坐）：请细品“息匀、步轻、收剑落叶不惊”之剑意后重试。', '思过听剑'),
  ],
}

const SCENE_HS_17_MIDNIGHT_WATCH_INTRO: StorySceneDef = {
  id: 'scene_hs_17_midnight_watch_intro',
  title: '第十七幕 · 素帕解目守寒崖',
  subtitle: '思过崖古山洞 · 绝壁银瀑涤心寒潭',
  mandatory: true,
  beats: [
    S('NPC-0166', '不错！丙字这一剑正是高沧云所使。未出剑时吐纳绵长如幽谷松风，出剑时清越一线，收剑归鞘时连脚边三寸枯叶都未曾惊起——你虽未习半点武学，这份耳识与悟性已胜过许多练剑五年的庸手。'),
    S('NPC-0166', '按掌门定下的规矩，你今夜还须独自在这思过崖上守夜至天明，体味孤峰独处而不惧的定静功夫。崖边风大，我留一盏松脂风灯与你，切记看好四周地势，天明卯时我再来接你。'),
    N('宁清羽与三名弟子飘然下崖。暮色四合，万山俱寂，唯有银瀑寒潭的水声与自西向东呼啸的劲风相伴。你仔细记下了洞口备火石桶、麻绳木楔与东南下风口青铜云板的位置，裹紧布衣静待夜深。'),
  ],
  choices: [
    {
      id: 'hs17_keep_vigil',
      label: '秉灯静坐背风石畔，凝神倾听子夜山风',
      tone: 'primary',
      effects: [
        { type: 'advanceShichen', count: 3 },
        openScene('scene_hs_18_ring_bell_trap', 'QST-SECT-05-ENTRY'),
      ],
    },
  ],
}

const SCENE_HS_16_BLINDFOLD_SWORDS: StorySceneDef = {
  id: 'scene_hs_16_blindfold_swords',
  title: '第十六幕 · 思过崖畔蒙目辨剑',
  subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
  mandatory: true,
  beats: [
    N('自博台孤峰下来，你沿着险峻石阶步入玉女峰侧畔的【思过崖】。此处三面悬空，唯有一方寒风剑坪与一座幽深古山洞，玉女剑仙宁清羽早已手持一条素白丝帕立于崖松之下。'),
    S('NPC-0166', '博台三劫考的是你的心算与舍得；我这一关不考你舞剑，只考你“听剑”。我用素帕蒙住你的双眼，命甲、乙、丙三名弟子依次在你身前演练《华山剑法》起手三式，你只凭双耳，辨出哪一人得了华山“松风剑意”之真传！'),
    N('素帕覆目，眼前顿时一片漆黑，山风与泉响却骤然清晰百倍——\n【甲字剑】骤然发难，“嗤嗤”破空尖啸刺耳，连刺七剑快如疾雨，然而第四剑后鼻息粗促、收剑时剑尖轻颤擦过石面；\n【乙字剑】每踏一步青石皆发出沉闷重响，出剑破风滞重方正，一招一式停顿分明，犹如铁匠挥锤凿石；\n【丙字剑】未闻剑响，先闻悠长绵密的一息吐纳，恰与崖畔松涛同频；随即一声轻灵清越的剑鸣如春冰初裂，收势时衣袂微敛，连崖边落叶都未惊乱半分。'),
  ],
  choices: [
    {
      id: 'hs16_insight_bing',
      label: '【灵台顿悟 · 音律通剑】直指丙字剑：吐纳合松涛、发剑清越而收势不惊落叶，方是气帅剑随！',
      subLabel: '高悟性或通晓琴艺/诗词韵律者，一耳辨出清浊真伪',
      tone: 'jade',
      hideWhenUnavailable: true,
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 85 },
          { type: 'skillAtLeast', key: '琴', min: 25 },
          { type: 'skillAtLeast', key: '诗词', min: 25 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '琴', delta: 2 },
        openScene('scene_hs_17_midnight_watch_intro', 'QST-SECT-05-ENTRY'),
      ],
    },
    {
      id: 'hs16_pick_jia',
      label: '选【甲字剑】：破空尖啸声势最盛、连刺七剑迅疾如电，必是上乘快剑',
      effects: [openScene('scene_hs_16_fail_listen', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs16_pick_yi',
      label: '选【乙字剑】：步履沉重如锤、一招一式顿挫有力，最显根基浑厚',
      effects: [openScene('scene_hs_16_fail_listen', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs16_pick_bing',
      label: '选【丙字剑】：息与松涛相应，发剑清越一线而收势凝静不惊落叶，正合外动内静之旨',
      tone: 'primary',
      effects: [openScene('scene_hs_17_midnight_watch_intro', 'QST-SECT-05-ENTRY')],
    },
  ],
}

const SCENE_HS_15_CHESS_PASS: StorySceneDef = {
  id: 'scene_hs_15_chess_pass',
  title: '第十五幕 · 半目乾坤见太岳',
  subtitle: '华山绝顶论剑台 · 博台孤峰弈棋亭',
  mandatory: true,
  beats: [
    N('“啪”的一声清响，你指尖那枚乌云黑子稳稳落在中腹单官收束之处，右上白棋孤子虽留有一口活气未被赶尽杀绝，整座纹枰十九道却已黑厚白薄，不多不少，黑棋净胜半目！'),
    S('NPC-0147', '嘶……第三手居然忍住不屠右上那块肥肉，反去中腹收单官？！老夫当年在这石枰前苦思了整整七日，总想一剑把右上白龙斩尽杀绝，结果次次被白棋借死子反扑拼成双活和棋！'),
    S('NPC-0118', '一弃贪念以争先，二借敌势成倒靴，三藏杀机赢半目——这正是陈抟老祖留下的《希夷三劫》真解，亦是我华山《养吾剑法》与《紫霞神功》“宁留一线、绵密无懈”的至理！'),
    S('NPC-0118', '第一关【博台孤棋】，你已凭凡人心智堂堂正正破局！接下来去玉女峰侧的【思过崖古山洞 · 面壁思过寒风剑坪】，你师娘宁清羽已在崖畔候你考校第二关【思过听风】。'),
  ],
  onFinishEffects: [
    setStep(HUASHAN_ENTRY_QUEST_ID, 'siguoya_vigil'),
    { type: 'modifySkill', key: '棋', delta: 4 },
    { type: 'advanceShichen', count: 2 },
    toast('连破《希夷三劫》残局（棋艺 +4）！请前往【思过崖古山洞 · 面壁思过寒风剑坪】拜见宁清羽应考第二关。', 'success', '博台破局'),
  ],
}

const SCENE_HS_CHESS_FAIL_H1: StorySceneDef = {
  id: 'scene_hs_chess_fail_h1',
  title: '博台复盘 · 贪角失腹困死局',
  subtitle: '华山绝顶论剑台 · 棋理未通静思一日',
  beats: [
    S('NPC-0118', '岳沧溟拈起一枚白子轻轻一按，只见中腹黑棋大龙瞬间被拦腰截断，再无半点眼位：“石柱铭文早已点明‘贪恋边隅四子肥，不知腹内大龙危’——你若提吃左下或一味退缩做眼，先手尽失，满盘皆输。”'),
    S('NPC-0147', '嘿，华山险道窄处行剑，舍不得两颗弃子作饵，哪争得到天元一线生机？去朝阳孤松亭下吹一日冷风醒醒脑子，想通了再来落子！'),
  ],
  onFinishEffects: [
    { type: 'advanceShichen', count: 12 },
    warn('第一手落子失误（静思1日）：请细读石柱铭文“舍却双鳞投劫海，天元左肩破重围”再行复试！', '博台复盘'),
  ],
}

const SCENE_HS_CHESS_FAIL_H2: StorySceneDef = {
  id: 'scene_hs_chess_fail_h2',
  title: '博台复盘 · 刚折柔靡失倒靴',
  subtitle: '华山绝顶论剑台 · 棋理未通静思一日',
  beats: [
    S('NPC-0118', '岳沧溟随手应了一颗白子，你苦心争来的天元先手顿成孤军：“硬挡西侧则如钝铁撞石，两败俱伤；远逃北麓则把东南厚势拱手让人。唯有顺其锋芒诱入虎口，待其提吃四子气紧之时反扑一子，方成围棋妙手‘倒脱靴’！”'),
    N('你在孤峰石亭外对着翻涌云海默坐一日，将方才攻防得失一一在掌心复演，待神思清明后方可重弈。'),
  ],
  onFinishEffects: [
    { type: 'advanceShichen', count: 12 },
    warn('第二手落子失误（静思1日）：请紧扣“贴身诱入东南虎口，成倒脱靴反扑”之理重弈！', '博台复盘'),
  ],
}

const SCENE_HS_CHESS_FAIL_H3: StorySceneDef = {
  id: 'scene_hs_chess_fail_h3',
  title: '博台复盘 · 穷寇反噬失半目',
  subtitle: '华山绝顶论剑台 · 杀心太盛静思一日',
  beats: [
    S('NPC-0118', '岳沧溟轻叹一声，白子在右上角绝境中猛然扑劫反咬，竟借着你的紧逼硬生生做成了“双活”，反倒让你中腹漏出一道破绽，倒输半目！'),
    S('NPC-0118', '“穷寇莫追，藏锋守正。”黑棋大势已定，右上孤白本已无力翻天；你偏要赶尽杀绝，反激起困兽死斗。剑道亦然——为求痛快一剑刺满十分力，必留三分破绽予敌！静思一日再来吧。'),
  ],
  onFinishEffects: [
    { type: 'advanceShichen', count: 12 },
    warn('第三手杀心过重功亏一篑（静思1日）：大局已定之时当“不屠孤白、稳收中腹单官净胜半目”！', '博台复盘'),
  ],
}

const SCENE_HS_14_CHESS_HAND_3: StorySceneDef = {
  id: 'scene_hs_14_chess_hand_3',
  title: '第十四幕 · 希夷三劫（终手：藏锋定乾坤）',
  subtitle: '华山绝顶论剑台 · 博台孤峰弈棋亭',
  mandatory: true,
  beats: [
    N('妙手“倒脱靴”一出，旁观的秦烈山忍不住抚掌低喝了一声“好”！棋盘之上，东南白棋反被掏空眼位，黑棋中腹大龙已然贯通天地、稳立不败之地。'),
    S('NPC-0118', '莫要大意，且看最后一劫！如今右上角尚有一块摇摇欲坠的白棋孤子，看似只需再扑一子便可将其满门屠尽；然而角部气眼微妙，白棋暗藏一枚扑劫同归的冷着；与此同时，中腹尚有一处平淡无奇的单官空点未补。'),
    N('你凝视亭柱最后两句残铭——“莫道斩尽方为胜，留得残云半目赢”。这一枚收官黑子，决断的已非棋艺，而是执剑者的心性！'),
  ],
  choices: [
    {
      id: 'hs14_insight_endgame',
      label: '【灵台顿悟 · 养吾藏锋】看破角部双活诱饵：置右上孤白不杀，稳补中腹单官净胜半目！',
      subLabel: '高悟性、高棋艺或深明经义者，深谙“满招损、留一线”之大道',
      tone: 'jade',
      hideWhenUnavailable: true,
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 90 },
          { type: 'skillAtLeast', key: '棋', min: 40 },
          { type: 'skillAtLeast', key: '经义', min: 30 },
        ],
      },
      effects: [openScene('scene_hs_15_chess_pass', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs14_slaughter_corner',
      label: '乘胜追击强点右上角眼位，将那块残余白棋斩草除根、一子不留！',
      effects: [openScene('scene_hs_chess_fail_h3', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs14_seal_center_half_point',
      label: '放过右上孤白留其一线残气，转身落子中腹稳收单官，以厚势净胜半目',
      tone: 'primary',
      effects: [openScene('scene_hs_15_chess_pass', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs14_invade_northwest',
      label: '脱先打入左上白棋铁壁，试图再挑起一场天下大劫扩大战果',
      effects: [openScene('scene_hs_chess_fail_h3', 'QST-SECT-05-ENTRY')],
    },
  ],
}

const SCENE_HS_13_CHESS_HAND_2: StorySceneDef = {
  id: 'scene_hs_13_chess_hand_2',
  title: '第十三幕 · 希夷三劫（次手：借势倒脱靴）',
  subtitle: '华山绝顶论剑台 · 博台孤峰弈棋亭',
  mandatory: true,
  beats: [
    N('你毅然舍去左下两颗残子，一子冲断天元左肩！岳沧溟眸中闪过一丝赞许，白子随即如狂风暴雨般自西侧贴靠压迫而来，剑锋直指你方才探出的黑棋孤头。'),
    N('此时细观盘面：西侧白棋厚如铁壁，硬顶必遭扭断；北侧空旷却无根基；唯独东南角白棋包围圈外强内虚，留有一处看似送死的“虎口空位”——若诱使白棋提吃黑棋四子连块，白棋自身反而只剩一口紧气，黑棋恰好可回扑一子反吃其筋！'),
    S('NPC-0118', '亭柱次联有云：“强撄其锋剑必折，顺引虎穴脱靴回。”面临强敌压境，你第二手如何应？'),
  ],
  choices: [
    {
      id: 'hs13_insight_boot',
      label: '【灵台顿悟 · 算无遗策】一眼算清四子弃饵气数，贴子东南虎口布下“倒脱靴”杀局！',
      subLabel: '高悟性、高棋艺或精于算术者，瞬息推演出提四还一之变',
      tone: 'jade',
      hideWhenUnavailable: true,
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 88 },
          { type: 'skillAtLeast', key: '棋', min: 35 },
          { type: 'skillAtLeast', key: '算术', min: 30 },
        ],
      },
      effects: [openScene('scene_hs_14_chess_hand_3', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs13_hard_block_west',
      label: '寸土不让，直接在西侧迎头硬扳白棋锋芒，与白棋厚势正面硬撼',
      effects: [openScene('scene_hs_chess_fail_h2', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs13_flee_north',
      label: '避其锋芒向北侧大跳逃出，哪怕舍弃东南阵势也先求自保',
      effects: [openScene('scene_hs_chess_fail_h2', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs13_tiger_mouth_boot',
      label: '故意贴子东南虎口空位，诱白棋提吃四子气紧后回扑反制，成“倒脱靴”之势',
      tone: 'primary',
      effects: [openScene('scene_hs_14_chess_hand_3', 'QST-SECT-05-ENTRY')],
    },
  ],
}

const SCENE_HS_12_CHESS_HAND_1: StorySceneDef = {
  id: 'scene_hs_12_chess_hand_1',
  title: '第十二幕 · 希夷三劫（首手：弃子争天元）',
  subtitle: '华山绝顶论剑台 · 博台孤峰弈棋亭',
  mandatory: true,
  beats: [
    N('你俯身审视石盘：黑棋中腹一条大龙蜿蜒被围，仅差一手便要气绝；左下边角却有白棋四颗残子已被黑棋咬住，只要随手一提便能吃下八目实地；而在左下黑棋两颗断子与中央天元左肩之间，隐隐有一道借弃子争先的冲断缝隙。'),
    N('石亭斑驳青柱上刻着陈抟老祖昔年留下的首联残铭：\n“贪恋边隅四子肥，不知腹内大龙危；舍却双鳞投劫海，天元左肩破重围。”'),
    S('NPC-0118', '请执黑先行——这第一子，你落于何处？'),
  ],
  choices: [
    {
      id: 'hs12_insight_tianyuan',
      label: '【灵台顿悟 · 棋理通幽】洞悉弃子争先真意，毫不犹豫落子“天元左肩冲断”！',
      subLabel: '高悟性或通晓棋艺者，瞬间领会舍小就大之局',
      tone: 'jade',
      hideWhenUnavailable: true,
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 85 },
          { type: 'skillAtLeast', key: '棋', min: 25 },
        ],
      },
      effects: [openScene('scene_hs_13_chess_hand_2', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs12_greedy_corner',
      label: '稳妥起见，先提吃左下角白棋四颗残子，将八目实空稳稳收入囊中',
      effects: [openScene('scene_hs_chess_fail_h1', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs12_passive_eye',
      label: '缩回中腹大龙腹内委屈补做一只小眼，苦守待援',
      effects: [openScene('scene_hs_chess_fail_h1', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs12_sacrifice_tianyuan',
      label: '主动舍弃左下两颗黑子作劫饵，争先手一子冲断“天元左肩”突围！',
      tone: 'primary',
      effects: [openScene('scene_hs_13_chess_hand_2', 'QST-SECT-05-ENTRY')],
    },
  ],
}

const SCENE_HS_11_BOTAI_PAVILION: StorySceneDef = {
  id: 'scene_hs_11_botai_pavilion',
  title: '第十一幕 · 绝顶博台孤峰弈',
  subtitle: '华山绝顶论剑台 · 博台孤峰弈棋亭',
  illustrationUrl: '/assets/quests/huashan_botai_chess.jpg',
  illustrationCaption: '华山绝顶博台 · 孤松云海弈残局',
  mandatory: true,
  beats: [
    N('自东峰侧径攀铁链越过鹞子翻身，一座四面临空的汉白玉石亭赫然屹立于孤峰绝顶——这便是昔年陈抟老祖与宋太祖赵匡胤“一局赢华山”的千古胜迹【博台孤峰弈棋亭】！'),
    N('亭外一株千年孤松横斜探入滚滚白浪云海，掌门岳沧溟负手立于石枰之畔，身旁还坐着一位紫膛脸、浓眉如剑的劲装长者，正是名震西北的潼关剑神秦烈山。'),
    S('NPC-0147', '岳师兄，这就是你说的那个拿着云台师叔乌云残子、没练过半天内功就敢徒步爬上苍龙岭的小家伙？哼，《希夷三劫》残局连咱们门里不少内门弟子都下不明白，他能行？'),
    S('NPC-0118', '秦师弟且看便是。小友听好：这石枰上的残局共有连环三手，每一手皆关系生死取舍，走错一步便算败局，须在峰顶静思一日方可重弈。你可准备好了？'),
  ],
  choices: [
    {
      id: 'hs11_start_chess',
      label: '拱手入席，凝神推演《希夷三劫》连环残局',
      tone: 'gold',
      effects: [openScene('scene_hs_12_chess_hand_1', 'QST-SECT-05-ENTRY')],
    },
  ],
}

const SCENE_HS_10_YUE_THREE_TESTS: StorySceneDef = {
  id: 'scene_hs_10_yue_three_tests',
  title: '第十幕 · 太岳定约试灵台',
  subtitle: '玉女峰紫霞道观 · 紫霞正气主殿外',
  mandatory: true,
  beats: [
    N('殿门轻启，一位面如冠玉、颌下三缕长髯的紫袍道人缓步走出，身侧伴着神姿清雅的玉女剑仙宁清羽。岳沧溟目光落在你被千尺幢铁索磨破渗血的掌心与泥泞草鞋上，微微颔首。'),
    S('NPC-0118', '这枚松纹乌云残子，确是我云台师叔随身三十载之物。他老人家素不轻许旁人，既赠子于你，必是见你在红尘微末处有一片不欺暗室的赤诚。'),
    S('NPC-0118', '沧云方才有一句话说错了——我华山收徒，从不怕弟子入门时是一介毫无武功的凡人。筋骨招式，入门后三年五载皆可锤炼；唯独“灵慧之悟”与“临危之静”，纵教十年亦难强求。'),
    S('NPC-0118', '是以本座不考你一拳一脚，只为你设下两道不凭武力的考题：其一，赴【华山绝顶论剑台 · 博台孤峰弈棋亭】，解开陈抟老祖传下的《希夷三劫》残局；其二，赴【思过崖古山洞 · 面壁思过寒风剑坪】，受你师娘蒙目听风之试并独守寒崖一夜。两关皆过，本座亲授青钢剑收你入门！'),
  ],
  onFinishEffects: [
    setStep(HUASHAN_ENTRY_QUEST_ID, 'botai_chess'),
    toast('掌门岳沧溟定下非战斗双关考校！请先前往【华山绝顶论剑台 · 博台孤峰弈棋亭】应考《希夷三劫》残局。', 'success', '太岳定约'),
  ],
}

const SCENE_HS_09B_BOAST_REBUKE: StorySceneDef = {
  id: 'scene_hs_09b_boast_rebuke',
  title: '紫霞观前 · 妄语遭斥扫石阶',
  subtitle: '玉女峰紫霞道观 · 涤除争胜妄心',
  beats: [
    S('NPC-0202', '住口！未学持剑，先思仗剑逞威、压服同侪——此乃江湖魔道争强斗狠之戾气，岂容玷污紫霞清净之地！'),
    N('高沧云拂袖冷斥，递过一把竹帚命你在东峰迎曦石坪外清扫松针落雪整整一日，直至你敛去胸中浮躁虚妄之气，方许重新入殿回话。'),
  ],
  choices: [
    {
      id: 'hs09b_repent',
      label: '默然扫净千级石阶，敛去浮名争胜之心再叩殿门',
      tone: 'primary',
      effects: [
        { type: 'advanceShichen', count: 12 },
        openScene('scene_hs_10_yue_three_tests', 'QST-SECT-05-ENTRY'),
      ],
    },
  ],
}

const SCENE_HS_09_ZIXIA_COLD_EYES: StorySceneDef = {
  id: 'scene_hs_09_zixia_cold_eyes',
  title: '第九幕 · 泥衣叩观问求道',
  subtitle: '玉女峰紫霞道观 · 山门石坪',
  mandatory: true,
  beats: [
    N('晨雾初散，你搀扶着挑山夫周伯终于登临玉女峰【紫霞道观】门前。周伯千恩万谢地挑着盐篓往后厨交差，而你一身泥水、双掌血痕斑斑地立在白石道观前，引得几名练剑的值守弟子纷纷侧目。'),
    S('NPC-0202', '你便是梁师弟传讯说、持云台师叔祖残子徒步登山之人？我观你呼吸粗浅、步履虚浮，丹田无半分内息，手掌更无习武老茧。华山剑道艰深奇险，你一介凡人登此绝顶，究竟所求为何？'),
  ],
  choices: [
    {
      id: 'hs09_ans_sincere',
      label: '“正因身如草芥无力护人，才愿自一息一剑从头苦修，求一颗临险不乱、守正卫道之心。”',
      tone: 'primary',
      effects: [
        { type: 'modifyChivalry', delta: 2 },
        openScene('scene_hs_10_yue_three_tests', 'QST-SECT-05-ENTRY'),
      ],
    },
    {
      id: 'hs09_ans_eloquent',
      label: '【辩才明理】引陈抟老祖“无极生太极”之言：白纸未染杂气，方能得授紫霞醇正根基！',
      subLabel: '通晓辩才或经义者，言辞温润而切中道门肯綮',
      tone: 'jade',
      hideWhenUnavailable: true,
      condition: {
        type: 'any',
        conditions: [
          { type: 'skillAtLeast', key: '辩才', min: 20 },
          { type: 'skillAtLeast', key: '经义', min: 20 },
        ],
      },
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0202' }, delta: 8 },
        openScene('scene_hs_10_yue_three_tests', 'QST-SECT-05-ENTRY'),
      ],
    },
    {
      id: 'hs09_ans_arrogant',
      label: '“自然是来学当世第一等的绝世快剑，日后好在江湖上扬名立万、无人敢惹！”',
      effects: [openScene('scene_hs_09b_boast_rebuke', 'QST-SECT-05-ENTRY')],
    },
  ],
}

const SCENE_HS_08_LAOJUN_NIGHT: StorySceneDef = {
  id: 'scene_hs_08_laojun_night',
  title: '第八幕 · 老君犁沟寒夜火',
  subtitle: '西岳险道 · 老君犁沟避风岩龛',
  mandatory: true,
  beats: [
    N('过了苍龙岭北峰咽喉，暮色已携着细碎冰霰压下山脊。前方便是夹于绝壁间、状若老君扶犁开山而成的五百七十级【老君犁沟】，夜黑路滑断难强登，你只得扶着脚踝扭伤的周伯躲进崖壁半腰一处浅岩龛内。'),
    N('岩龛角落里早已缩着一个冻得嘴唇发紫的华阴采药山童阿石，背篓里只有几株湿透的黄精，腹中饥肠辘辘，连牙齿都在打战。'),
    S(HERB_BOY_SPEAKER, '大、大哥……山腰突然落了冰粒子，我下不去山，带的半块荞麦馍早上就吃完了……'),
  ],
  choices: [
    {
      id: 'hs08_share_food',
      label: '拢起枯松枝生火，再从行囊取出干粮掰分给阿石与周伯同食（干粮 -1）',
      tone: 'gold',
      condition: { type: 'foodAtLeast', min: 1 },
      effects: [
        { type: 'giveFood', amount: -1 },
        { type: 'modifyChivalry', delta: 4, reason: '华山老君犁沟寒夜分粮救护老小' },
        { type: 'advanceShichen', count: 4 },
        { type: 'healPlayer', hpPct: 20 },
        openScene('scene_hs_09_zixia_cold_eyes', 'QST-SECT-05-ENTRY'),
      ],
    },
    {
      id: 'hs08_huddle_fire',
      label: '生起松枝篝火替一老一小烘烤湿衣，自己忍饥守在龛口挡风过夜',
      tone: 'primary',
      effects: [
        { type: 'modifyChivalry', delta: 2 },
        { type: 'advanceShichen', count: 4 },
        openScene('scene_hs_09_zixia_cold_eyes', 'QST-SECT-05-ENTRY'),
      ],
    },
  ],
}

const SCENE_HS_07_CANGLONGLING: StorySceneDef = {
  id: 'scene_hs_07_canglongling',
  title: '第七幕 · 苍龙岭上万丈云',
  subtitle: '西岳第三险 · 苍龙岭（韩退之投书处）',
  illustrationUrl: '/assets/quests/huashan_canglong_ridge.jpg',
  illustrationCaption: '西岳苍龙岭 · 万丈云海凡躯独行',
  mandatory: true,
  beats: [
    N('与周伯互相搀扶走出百尺峡，眼前景象骤然令你呼吸一窒——但见一条苍黑色的花岗岩山脊如巨龙弓背般悬亘于两山之间，岭宽不足二尺，两侧皆是不见底的万丈雪白云海！'),
    S(PORTER_ZHOUBO_SPEAKER, '小哥当心！这便是鬼见愁的【苍龙岭】！当年唐朝大文豪韩退之爬到这儿，吓得抱住石柱痛哭投书求救！咱们没练过华山道爷们的飞燕轻功，横风一刮，站直了走准被掀下万丈深渊！'),
    N('话音未落，一阵刺骨罡风自云海深处狂卷而上，吹得岭侧铁栏嗡嗡震颤。你脚下没有半分内力吸附青石，只能全凭凡人心志与身姿渡此绝岭！'),
  ],
  choices: [
    {
      id: 'hs07_insight_sword_ridge',
      label: '【悟性灵光】俯身伏脊、目视眼前三尺石阶而不睨深渊，忽悟“险中求稳、窄处行锋”之理！',
      subLabel: '悟性 ≥ 80 者于绝壁罡风间偶得一缕剑道先机',
      tone: 'jade',
      hideWhenUnavailable: true,
      condition: { type: 'talentAtLeast', key: '悟性', min: 80 },
      effects: [
        { type: 'giveCombatExp', amount: 80, reason: '苍龙岭绝壁观云悟险' },
        openScene('scene_hs_08_laojun_night', 'QST-SECT-05-ENTRY'),
      ],
    },
    {
      id: 'hs07_low_center_steady',
      label: '压低重心双手扶稳石脊凿痕，绝不俯视两侧云海，听风歇间隙一步一挪稳渡苍龙岭',
      tone: 'primary',
      effects: [openScene('scene_hs_08_laojun_night', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs07_stand_bravado',
      label: '挺胸昂首大步直行，偏要试试凡人能不能在苍龙岭上昂首阔步！',
      effects: [
        { type: 'healPlayer', hpPct: -20 },
        warn('狂风骤袭险些坠岭！幸得扑倒抱住石柱，膝肘磕破渗血（气血受损）。', '苍龙惊险'),
        openScene('scene_hs_08_laojun_night', 'QST-SECT-05-ENTRY'),
      ],
    },
  ],
}

const SCENE_HS_06_BAICHIXIA: StorySceneDef = {
  id: 'scene_hs_06_baichixia',
  title: '第六幕 · 百尺峡间横木救夫',
  subtitle: '西岳第二险 · 百尺峡惊心石',
  mandatory: true,
  beats: [
    N('刚喘匀一口粗气，前路已被两壁欲合的百丈峡谷夹住，两颗硕大无朋的巨岩悬卡在头顶石缝正中——仰望摇摇欲坠，这便是华山第二险【百尺峡 · 惊心石】。'),
    N('峡中石阶上青苔湿滑，走在你前头三步的华阴老挑山夫周伯挑着百余斤清油与青盐，右脚草鞋忽然在冰苔上一溜，整副竹扁担猛向悬崖外侧倾翻，带着老汉半截身子悬出了石栏！'),
    S(PORTER_ZHOUBO_SPEAKER, '哎哟救命——！这担清油是山上道观的香火钱，松不得手啊！'),
    N('千钧一发之际，你既无轻功飞纵托举，亦无内力单臂硬拽两百斤重坠之力——全凭刹那间的凡人决断救命！'),
  ],
  choices: [
    {
      id: 'hs06_smart_lever',
      label: '将随身行囊木杖横卡进两壁窄石缝作支点，死抵石槽拽住周伯衣带，厉喝令他割断外侧油篓绳弃担保命！',
      tone: 'primary',
      effects: [
        { type: 'modifyChivalry', delta: 4, reason: '百尺峡急智舍担救下挑山老汉' },
        openScene('scene_hs_07_canglongling', 'QST-SECT-05-ENTRY'),
      ],
    },
    {
      id: 'hs06_reckless_grab',
      label: '不管三七二十一，直接扑上前伸出双手死死拉拽那根挂着百斤油篓的扁担！',
      effects: [
        { type: 'healPlayer', hpPct: -15 },
        warn('百斤重担险些将你二人一并拽下悬崖！油篓撞碎石栏脱落后方勉强脱险，双肩剧痛（气血受损）。', '百尺惊魂'),
        openScene('scene_hs_07_canglongling', 'QST-SECT-05-ENTRY'),
      ],
    },
  ],
}

const SCENE_HS_05_QIANCHIZHUANG: StorySceneDef = {
  id: 'scene_hs_05_qianchizhuang',
  title: '第五幕 · 千尺幢里铁索寒',
  subtitle: '西岳第一险 · 千尺幢石天井',
  mandatory: true,
  beats: [
    N('辞别梁惊风自玉泉院入山，越过五里关，一面直立如刀劈斧削的千仞绝壁蓦然封死去路！绝壁裂隙间仅凿出三百七十余级立陡石阶，宽仅容足，坡度几近直立，两旁垂下两条结满白霜的粗重铁索——正是“太华咽喉”【千尺幢】！'),
    N('你吞下一份随身干粮垫补腹中寒气，双手握住冰冷刺骨的铁索向上攀援。爬至百级半空，山谷穿堂冷风呼啸灌入石槽，你没有内功护体，双臂酸麻如灌铅铁，胸肺火辣辣地剧烈喘息。'),
  ],
  choices: [
    {
      id: 'hs05_gengu_steady',
      label: '【根骨沉稳】凭扎实下盘腰腿劲力紧贴石槽凿窝，三息一换手稳步登顶！',
      subLabel: '根骨 ≥ 80 者虽无内力，天生根骨与气血底子亦远胜常人',
      tone: 'jade',
      hideWhenUnavailable: true,
      condition: { type: 'talentAtLeast', key: '根骨', min: 80 },
      effects: [
        { type: 'giveFood', amount: -2 },
        { type: 'advanceShichen', count: 2 },
        openScene('scene_hs_06_baichixia', 'QST-SECT-05-ENTRY'),
      ],
    },
    {
      id: 'hs05_careful_climb',
      label: '撕下布条缠掌防滑，手腕挽住铁索环扣借骨骼支撑省力，踩准前人干燥鞋印一寸寸攀上顶口',
      tone: 'primary',
      effects: [
        { type: 'giveFood', amount: -2 },
        { type: 'advanceShichen', count: 3 },
        openScene('scene_hs_06_baichixia', 'QST-SECT-05-ENTRY'),
      ],
    },
    {
      id: 'hs05_rush_chain',
      label: '咬牙鼓起蛮力猛拽冰滑铁索，想一口气冲上石井顶端图个痛快！',
      effects: [
        { type: 'giveFood', amount: -2 },
        { type: 'healPlayer', hpPct: -15 },
        { type: 'advanceShichen', count: 4 },
        warn('急躁蛮攀导致手掌被冰索磨破出血、半途力竭滑落数级（气血受损，多耗1个时辰）！', '千尺磨砺'),
        openScene('scene_hs_06_baichixia', 'QST-SECT-05-ENTRY'),
      ],
    },
  ],
}

const SCENE_HS_04_TONGGUAN_FOOT: StorySceneDef = {
  id: 'scene_hs_04_tongguan_foot',
  title: '第四幕 · 华阴山麓拒豪门',
  subtitle: '潼关 / 西岳华山 · 玉泉院山道口',
  mandatory: true,
  beats: [
    N('出长安东行入华阴界，但见黄河于潼关大折东去，西岳华山五峰如一朵擎天铁莲拔地而起，直插苍穹云霄。山麓玉泉院外车马喧嚣，几名抬着描金礼箱的锦衣家丁正与守关巡山的华山剑客争执不下。'),
    S(ARROGANT_SCION_SPEAKER, '梁大侠！我家老爷乃是陇右大盐商，特备白银五百两、和田暖玉一对，还雇了八名健壮轿夫抬本公子去紫霞观拜师——你们怎连山门都不让进？！'),
    S('NPC-0203', '请回吧！华山自创派以来，从无乘竹轿、撒黄白之物拜入山门的弟子。莫说五百两，便是五万两，梁某今日也绝不放半顶软轿过五里关！'),
    N('锦袍公子讪讪带人离去。你上前拱手，默默从怀中取出那枚缺了一角的【松纹乌云残子】。朝阳快剑梁惊风目光一凝，脸上肃杀之色立时化作惊异与温煦。'),
    S('NPC-0203', '这是……云台师叔祖随身不离的松纹乌云子！没想到他老人家在长安秋雨里寻到的有缘人，竟是一位尚未习武的少年郎！'),
    S('NPC-0203', '小兄弟听我一言：你既无内力御寒、又无轻功提纵，徒步攀越【千尺幢、百尺峡、苍龙岭】三大天险极耗气血与口粮，行囊里务必备足至少【3 份干粮】方可动身（若不足可先在城集补给）。准备妥当后，便去【玉女峰紫霞道观】山道口或找我梁某启程登山！'),
  ],
  onFinishEffects: [
    setStep(HUASHAN_ENTRY_QUEST_ID, 'climb_three_perils'),
    toast('梁惊风验明乌云残子！请备齐至少 3 份随身干粮后，前往【潼关瓮城】找梁惊风或于【玉女峰紫霞道观】开启徒步登华山三险试炼。', 'talk', '西岳叩山'),
  ],
}

const SCENE_HS_03_PINE_TOKEN: StorySceneDef = {
  id: 'scene_hs_03_pine_token',
  title: '第三幕 · 乌云半子约西岳',
  subtitle: '京兆府（长安） · 雨霁远眺太华青',
  mandatory: true,
  beats: [
    N('一局闲话未尽，茶棚外潇潇秋雨忽收。一名撑着青竹油纸伞、眉眼灵秀的青衫女弟子踏水寻来，见到麻衣老道，忙敛衽行礼。'),
    S('NPC-0285', '云台师叔祖！您老人家怎么又穿件破麻衣一个人跑出终南草堂淋雨下棋？封师伯和掌门师伯都交代秋桃好生看顾您呢！'),
    S(RECLUSE_SPEAKER, '呵呵，不淋这一场冷雨，老道怎知这诺大长安城里，谁只看衣冠排场，谁肯替一个糟老头子拾起泥水里的残棋？'),
    N('麻衣老道笑眯眯地起身，将方才你自泥辙中拾起擦净的那枚缺角黑玉棋子翻了过来——只见棋底以极精湛的剑意微雕着一株迎风孤松，入手温润如墨玉。他轻轻将棋子按入你的掌心。'),
    S(RECLUSE_SPEAKER, '小娃娃，你虽未练过半日内家吐纳，胸中却有一团干净气。你若有意问剑求道，便收好这枚【松纹乌云残子】，东出霸陵赴【潼关 / 西岳华山】。切记：莫雇山轿，莫摆阔气，凭你这一双凡人肉脚一步步走上玉女峰去！'),
  ],
  onFinishEffects: [
    {
      type: 'startQuest',
      questId: HUASHAN_ENTRY_QUEST_ID,
      stepId: 'go_tongguan_foot',
    },
    { type: 'setFlag', flag: 'hs_has_pine_stone', value: 1 },
    toast('已结下西岳松风棋缘，获信物印记【松纹乌云残子】！请东行前往【潼关 / 西岳华山】。', 'success', '松风棋缘'),
  ],
}

const SCENE_HS_02_BROKEN_BOARD: StorySceneDef = {
  id: 'scene_hs_02_broken_board',
  title: '第二幕 · 残枰一问见初心',
  subtitle: '京兆府（长安） · 明德门外茶肆',
  illustrationUrl: '/assets/quests/huashan_changan_rain_go.jpg',
  illustrationCaption: '长安秋雨茶棚 · 残枰拾子结松缘',
  mandatory: true,
  beats: [
    N('老道接过被你用衣袖细细拭去泥水的乌云黑子，浑浊微眯的双眼里掠过一抹极清亮的神采。他也不道谢，只用冻得微红的枯瘦手指将黑子放回翘皮的柏木棋盘一角，指了指对面的长条矮凳。'),
    S(RECLUSE_SPEAKER, '方才过去的那几拨江湖客，腰里挎着百炼钢刀，嘴里谈着五岳宗师，偏偏连低头看一眼泥里棋子的工夫都没有。小娃娃，老道瞧你虎口光滑、气息浅促，分明是个连入门吐纳都没学过的白身凡人——怎么也一个人背着包袱在关中秋雨里闯荡？'),
  ],
  choices: [
    {
      id: 'hs02_heart_humble',
      label: '“晚辈虽无武学根底，但向往名山清正之道，愿凭双手双足在世间寻一门安身立命的真艺。”',
      tone: 'primary',
      effects: [openScene('scene_hs_03_pine_token', 'QST-SECT-05-ENTRY')],
    },
    {
      id: 'hs02_heart_border',
      label: '“皇祐年间西北边尘未靖，晚辈不甘终老蓬蒿，想学一身本领护佑身边良善百姓。”',
      tone: 'gold',
      effects: [
        { type: 'modifyChivalry', delta: 2 },
        openScene('scene_hs_03_pine_token', 'QST-SECT-05-ENTRY'),
      ],
    },
  ],
}

const SCENE_HS_01B_COLD_MISS: StorySceneDef = {
  id: 'scene_hs_01b_cold_miss',
  title: '秋雨擦肩 · 一念轻慢失机缘',
  subtitle: '京兆府（长安） · 烟雨微茫人已空',
  beats: [
    N('你皱眉避开泥水溅起处，只当他是个落魄潦倒的街头棋痴，径直转身步入长安闹市。待半个时辰后雨势渐歇，你偶听街边茶博士啧啧叹道：“方才明德门外那位淋雨摆棋的老神仙，竟是华山紫霞观辈分最高的云台师叔祖！”'),
    N('你心头微震，急忙折返茶棚，却见竹棚下早已人去枰空，唯有檐角残雨滴落青石。（若悔悟前非，可择日前往长安【终南草堂 · 临风观景轩】清扫残局，重觅机缘。）'),
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'hs_rain_ignored', value: 1 },
    warn('一念轻慢错失西岳棋缘！若欲挽回，可前往京兆府【终南草堂 · 临风观景轩】静思补过。', '擦肩失缘'),
  ],
}

const SCENE_HS_01C_REGRET_REDEEM: StorySceneDef = {
  id: 'scene_hs_01c_regret_redeem',
  title: '草堂拾遗 · 迷途知返亦是缘',
  subtitle: '终南草堂 · 临风观景轩',
  beats: [
    N('终南草堂临风观景轩外翠竹滴露，石桌上正摆着那副眼熟的翘皮柏木棋盘，盘边散落着枯黄竹叶。你默然驻足良久，主动捧来清泉拭净石枰，又从石缝间寻回一枚被雨水冲落的缺角黑子端正摆好。'),
    S(RECLUSE_SPEAKER, '呵呵，当日嫌老道泥衣脏袖，今日却肯弯腰替空石桌拂叶拾子——人非圣贤，能知悔改而不文过饰非，也算勘破了一层浮障。'),
    N('竹林后转出那位麻衣老道，在长安游历的华山女弟子苏秋桃亦含笑立于其侧。你面露愧色郑重一揖，终得老道点头续上这桩西岳前缘。'),
  ],
  choices: [
    {
      id: 'hs01c_apologize',
      label: '深深长揖谢过前辈宽宥，聆听西岳问剑指点',
      tone: 'primary',
      effects: [
        { type: 'advanceShichen', count: 4 },
        openScene('scene_hs_03_pine_token', 'QST-SECT-05-ENTRY'),
      ],
    },
  ],
}

const SCENE_HS_01_CHANGAN_RAIN: StorySceneDef = {
  id: 'scene_hs_01_changan_rain',
  title: '第一幕 · 长安秋雨落残枰',
  subtitle: '{reignYear} · 京兆府（长安）南门茶棚',
  beats: [
    N('关中秋深，一场冷雨将古都京兆府笼在苍茫烟水之中。城南官道旁的芦席茶棚狭小漏风，几名披着锦缎披风的商贾与挎刀江湖客争抢干燥座位，硬将一名身穿洗白麻衣、须发半湿的老道挤到了棚檐滴水处。'),
    N('一阵斜风卷雨刮过，老道膝前那副破旧柏木棋盘微微一晃，一枚乌黑温润却缺了一角的棋子“骨碌碌”滚落棚外，掉进了泥泞冰冷的车辙水洼里。老道腿脚似有些受寒僵硬，望着泥水里的黑子轻轻叹了口气。'),
  ],
  choices: [
    {
      id: 'hs01_pick_and_share_food',
      label: '冒雨踏入泥辙拾起棋子擦净奉还，再让出干爽内座、分一份干粮给老人暖腹（干粮 -1）',
      tone: 'gold',
      condition: { type: 'foodAtLeast', min: 1 },
      effects: [
        { type: 'giveFood', amount: -1 },
        { type: 'modifyChivalry', delta: 4, reason: '长安秋雨茶棚让座分食礼敬孤老' },
        openScene('scene_hs_02_broken_board', 'QST-SECT-05-ENTRY'),
      ],
    },
    {
      id: 'hs01_pick_polite',
      label: '走入雨幕俯身拾起黑子，以衣袖拭净泥水双手奉还，并侧身替老道挡住斜风冷雨',
      tone: 'primary',
      effects: [
        { type: 'modifyChivalry', delta: 2, reason: '长安秋雨茶棚拾棋挡雨' },
        openScene('scene_hs_02_broken_board', 'QST-SECT-05-ENTRY'),
      ],
    },
    {
      id: 'hs01_walk_away',
      label: '嫌泥辙污湿鞋袜，只当是个落魄棋疯子，裹紧衣衫径直入城',
      effects: [openScene('scene_hs_01b_cold_miss', 'QST-SECT-05-ENTRY')],
    },
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  [SCENE_HS_00_GATE_NO_FATE.id]: SCENE_HS_00_GATE_NO_FATE,
  [SCENE_HS_22_WIDE_CLOUDS.id]: SCENE_HS_22_WIDE_CLOUDS,
  [SCENE_HS_21_BESTOW_SWORD.id]: SCENE_HS_21_BESTOW_SWORD,
  [SCENE_HS_20_ZIXIA_DAWN.id]: SCENE_HS_20_ZIXIA_DAWN,
  [SCENE_HS_19_QINLIESHAN_NOD.id]: SCENE_HS_19_QINLIESHAN_NOD,
  [SCENE_HS_18_FAIL_RUSH.id]: SCENE_HS_18_FAIL_RUSH,
  [SCENE_HS_18_RING_BELL_TRAP.id]: SCENE_HS_18_RING_BELL_TRAP,
  [SCENE_HS_16_FAIL_LISTEN.id]: SCENE_HS_16_FAIL_LISTEN,
  [SCENE_HS_17_MIDNIGHT_WATCH_INTRO.id]: SCENE_HS_17_MIDNIGHT_WATCH_INTRO,
  [SCENE_HS_16_BLINDFOLD_SWORDS.id]: SCENE_HS_16_BLINDFOLD_SWORDS,
  [SCENE_HS_15_CHESS_PASS.id]: SCENE_HS_15_CHESS_PASS,
  [SCENE_HS_CHESS_FAIL_H1.id]: SCENE_HS_CHESS_FAIL_H1,
  [SCENE_HS_CHESS_FAIL_H2.id]: SCENE_HS_CHESS_FAIL_H2,
  [SCENE_HS_CHESS_FAIL_H3.id]: SCENE_HS_CHESS_FAIL_H3,
  [SCENE_HS_14_CHESS_HAND_3.id]: SCENE_HS_14_CHESS_HAND_3,
  [SCENE_HS_13_CHESS_HAND_2.id]: SCENE_HS_13_CHESS_HAND_2,
  [SCENE_HS_12_CHESS_HAND_1.id]: SCENE_HS_12_CHESS_HAND_1,
  [SCENE_HS_11_BOTAI_PAVILION.id]: SCENE_HS_11_BOTAI_PAVILION,
  [SCENE_HS_10_YUE_THREE_TESTS.id]: SCENE_HS_10_YUE_THREE_TESTS,
  [SCENE_HS_09B_BOAST_REBUKE.id]: SCENE_HS_09B_BOAST_REBUKE,
  [SCENE_HS_09_ZIXIA_COLD_EYES.id]: SCENE_HS_09_ZIXIA_COLD_EYES,
  [SCENE_HS_08_LAOJUN_NIGHT.id]: SCENE_HS_08_LAOJUN_NIGHT,
  [SCENE_HS_07_CANGLONGLING.id]: SCENE_HS_07_CANGLONGLING,
  [SCENE_HS_06_BAICHIXIA.id]: SCENE_HS_06_BAICHIXIA,
  [SCENE_HS_05_QIANCHIZHUANG.id]: SCENE_HS_05_QIANCHIZHUANG,
  [SCENE_HS_04_TONGGUAN_FOOT.id]: SCENE_HS_04_TONGGUAN_FOOT,
  [SCENE_HS_03_PINE_TOKEN.id]: SCENE_HS_03_PINE_TOKEN,
  [SCENE_HS_02_BROKEN_BOARD.id]: SCENE_HS_02_BROKEN_BOARD,
  [SCENE_HS_01B_COLD_MISS.id]: SCENE_HS_01B_COLD_MISS,
  [SCENE_HS_01C_REGRET_REDEEM.id]: SCENE_HS_01C_REGRET_REDEEM,
  [SCENE_HS_01_CHANGAN_RAIN.id]: SCENE_HS_01_CHANGAN_RAIN,
}
