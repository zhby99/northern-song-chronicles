import type { NodeNpc } from '../../../types/game'
import type {
  QuestCondition,
  QuestDefinition,
  QuestEffect,
  StorySceneDef,
  StorySpeakerSpec,
} from '../../../types/quest'
import { DEFAULT_EQUIPPED_SLOTS } from '../../itemsDb'

export const EMEI_ENTRY_QUEST_ID = 'QST-SECT-07-ENTRY'

/**
 * 允许触发峨眉入门长卷的身份条件：
 * 无门无派之身，或隶属与峨眉渊源极深的三流医武宗门【巴蜀百草药王门】（SECT-29，支持带艺投师免叛门惩罚）。
 */
const EMEI_ELIGIBLE_SECT_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'notInAnySect', allowTransferFromSectId: 'SECT-29' },
    {
      type: 'questStatus',
      questId: EMEI_ENTRY_QUEST_ID,
      status: 'not_started',
    },
  ],
}

const SPEAKER_HERB_FARMER: StorySpeakerSpec = {
  kind: 'custom',
  name: '周老药农',
  title: '灌县采药山民',
  factionName: '巴蜀百姓',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_QC_BULLY: StorySpeakerSpec = {
  kind: 'custom',
  name: '侯彪',
  title: '青城派外围剑徒',
  factionName: '青城派',
  portraitUrl: '/assets/characters/templates/tpl_qingcheng_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_qingcheng_av.jpg',
}

const SPEAKER_WHITE_APE: StorySpeakerSpec = {
  kind: 'narrator',
  label: '洗象池通灵白猿',
}

const SPEAKER_QC_SPY: StorySpeakerSpec = {
  kind: 'custom',
  name: '灰衣暗探',
  title: '受一品堂收买的青城弃徒',
  factionName: '西夏暗桩',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_JINDING_DISCIPLE: StorySpeakerSpec = {
  kind: 'custom',
  name: '林清霜',
  title: '峨眉金顶守亭剑侍',
  factionName: '峨眉派',
  portraitUrl: '/assets/characters/templates/tpl_emei_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_emei_female_av.jpg',
}

/**
 * 第七幕「以血肉凡躯护药匣」保护战对手：
 * 专为尚无内功根基的初出茅庐少侠设计（survive_rounds = 2，且无论胜负皆不卡关，视作死护药匣不退）。
 */
function buildQingchengTeaBullyNpc(): NodeNpc {
  return {
    id: 'QUEST_EM_SHEN_FENGTAO_SHADOW',
    name: '青城截药剑徒',
    title: '青城派 · 山道寻衅快剑',
    realm: '不入流',
    factionId: 'SECT-14',
    factionName: '青城派',
    avatarUrl: '/assets/characters/templates/tpl_qingcheng_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_qingcheng_fb.jpg',
    stats: {
      hp: 150,
      mp: 60,
      agi: 9,
      res: 4,
      isBenchmark: false,
    },
    talents: { bone: 36, comprehension: 35, charm: 30 },
    equipped: { ...DEFAULT_EQUIPPED_SLOTS },
    talk: '“连半点丹田内气都没有的白身小子，也敢拿肉身挡爷们的松风快剑？滚开！”',
  }
}

/**
 * 第十七幕「金顶演剑亭试新锋」友好切磋对手：
 * 检验少侠新习得的《峨眉吐纳术》与《分水峨眉刺》，点到为止，胜负皆可从容推进。
 */
function buildJindingSparDiscipleNpc(): NodeNpc {
  return {
    id: 'QUEST_EM_JINDING_SPAR_DISCIPLE',
    name: '林清霜',
    title: '峨眉派 · 金顶守亭剑侍',
    realm: '三流下品',
    factionId: 'SECT-07',
    factionName: '峨眉派',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_emei_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_emei_female_fb.jpg',
    stats: {
      hp: 195,
      mp: 105,
      agi: 10,
      res: 5,
      isBenchmark: false,
    },
    talents: { bone: 45, comprehension: 52, charm: 68 },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-074',
      armor: 'ARM-034',
      shoes: 'BOT-021',
    },
    talk: '“请留神了！柳护法吩咐只验吐纳与分水刺腕力，咱们点到即止！”',
  }
}

/**
 * 若少侠原本隶属巴蜀百草药王门（SECT-29），入门前先无损结清旧籍，兑现医武结缘设定。
 */
function buildJoinEmeiCoreEffects(extraEffects: QuestEffect[]): QuestEffect[] {
  return [
    {
      type: 'branch',
      condition: { type: 'inSect', sectId: 'SECT-29' },
      thenEffects: [{ type: 'leaveSect', skipPenalty: true }],
    },
    { type: 'joinSect', sectId: 'SECT-07', rank: 1 },
    ...extraEffects,
    {
      type: 'completeQuest',
      questId: EMEI_ENTRY_QUEST_ID,
      outcome: 'joined',
      combatExp: 45,
    },
  ]
}

// ============================================================================
// 剑阁前缘选修小幕：未开卷前若在剑门关先遇苏梦清，可结下「剑阁前缘」
// ============================================================================

const SCENE_EM_00_JIANMEN_PRELUDE: StorySceneDef = {
  id: 'scene_em_00_jianmen_prelude',
  title: '楔子 · 猿猱栈道识飞燕',
  subtitle: '剑门关 · 剑阁鸟道悬空栈',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '剑门七十二峰如断戟插天，栈道木板下便是百丈云壑。山风猎猎间，一名身着淡青束袖劲装、腰悬窄剑与乌钢双刺的年轻女侠正凭栏远眺北来商队，眉宇间既有将门飒爽，又透着几分名山清气。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“栈道风急，看你的步子轻浮未蓄内息，莫往悬崖外侧靠得太近。我是峨眉俗家弟子苏梦清——这两日青城派的人在入川药路上有些不规矩，我巡罢此间便要南下成都府【锦江万里桥茶肆】走一遭。”',
    },
    {
      speaker: { kind: 'player' },
      text: '“多谢苏女侠提点。晚辈正欲入蜀游历，若在锦官城中重逢，定请女侠饮一盏热茶。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“好呀，一言为定！成都春雨湿寒，你若往万里桥去，记得多留心脚下青苔。”',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'emei_fate_jianmen', value: true },
    { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 12 },
    {
      type: 'toast',
      text: '与峨眉俗家首席【苏梦清】结下剑阁前缘！可南下前往【成都府 · 锦江万里桥茶肆】再续蜀水奇缘。',
      tone: 'success',
      logTag: '剑阁前缘',
    },
  ],
}

// ============================================================================
// 第四卷：万仞金顶 · 佛光归心（第 16～20 幕，倒序声明以便上层幕次直接引用）
// ============================================================================

const SCENE_EM_20_HUAZANG_CEREMONY: StorySceneDef = {
  id: 'scene_em_20_huazang_ceremony',
  title: '第二十幕 · 华藏钟鸣定仙缘',
  subtitle: '峨眉金顶 · 华藏普贤铜殿',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '云海佛光渐敛，华藏金顶普贤铜殿内檀香袅袅，三十六盏长明酥油灯映得铜壁生辉。晨钟三响过后，云慧师太端坐蒲团之上，静玄师太执剑立左，静虚师太与苏梦清含笑立右。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0128' },
      text: '“自锦江春雨撑伞相逢，百草堂前辨毒煎汤，大慈壁下观相明心，双桥清音智护药匣，再到万年寺三日挑水抄经、洗象池月夜观猿、雪崖上勘破西夏暗记……你虽初时身无半缕内功，这一路走来，却把‘仁、勇、拙、慧’四字踏得结结实实。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0169' },
      text: '“哼，老尼向来最厌投机取巧之辈。不过你在万年寺挑水磨破双肩也未哼过半句，方才又替山上揪出外邦暗哨，算老尼没看走眼——入我峨眉，够格了。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0128' },
      text: '“我峨眉派自创派以来，佛道兼修，僧俗并蓄，从不拘男女出身。殿堂礼佛是修行，红尘仗剑亦是修行。今日既入我门墙，你愿择哪一脉立身？”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“掌门师伯说得是。你若愿带发入俗家剑脉，往后剑门风雪、锦江春水，师姐带你一道巡护苍生；你若喜金顶清净，在华藏净脉随师伯与静虚师叔参禅习医，无论男女居士或清修弟子，咱们亦是一辈子的同门知己！”',
    },
  ],
  choices: [
    {
      id: 'em20_join_lay_sword',
      label: '拜入【俗家剑脉】· 带发执剑（随苏梦清巡护红尘蜀道）',
      subLabel: '男女皆宜：授峨眉外门剑侠籍，重红尘行侠与苏梦清羁绊（高缘分额外获赐【峨眉分水双刺】）',
      tone: 'gold',
      effects: buildJoinEmeiCoreEffects([
        { type: 'setFlag', flag: 'emei_disciple_branch', value: 'lay_sword' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 25 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0128' }, delta: 15 },
        { type: 'modifyRenown', delta: 15, reason: '拜入峨眉俗家剑脉' },
        { type: 'addSectContribution', amount: 60 },
        { type: 'giveItem', itemId: 'ITM-MED-115', qty: 1 },
        {
          type: 'branch',
          condition: { type: 'flag', flag: 'emei_smq_bond', op: 'gte', value: 4 },
          thenEffects: [
            { type: 'giveItem', itemId: 'WPN-040', qty: 1 },
            { type: 'addArtExp', artId: 'MA-136', amount: 5000 },
            { type: 'addSectContribution', amount: 60 },
            {
              type: 'toast',
              text: '苏梦清解下贴身珍藏的良阶名器【峨眉分水双刺】相赠：“万里桥畔结下的缘分，往后这万里蜀道，你我并肩同守！”',
              tone: 'success',
              logTag: '飞燕定缘',
            },
          ],
          elseEffects: [
            { type: 'giveItem', itemId: 'ACC-040', qty: 1 },
            { type: 'addArtExp', artId: 'MA-136', amount: 2500 },
            {
              type: 'toast',
              text: '正式拜入峨眉俗家剑脉！苏梦清含笑赠予【蜀中竹雕折扇骨】与【白云熊胆丸】贺你入门。',
              tone: 'success',
              logTag: '峨眉入门',
            },
          ],
        },
        {
          type: 'branch',
          condition: { type: 'flag', flag: 'emei_aptitude_marks', op: 'gte', value: 3 },
          thenEffects: [
            { type: 'teachMartialArt', artId: 'MA-161', level: 2, exp: 2000 },
            {
              type: 'toast',
              text: '云慧师太赞你「灵秀天成、佛道双契」，亲抚顶门助你将《峨眉吐纳术》一举推至第 2 重！',
              tone: 'success',
              logTag: '金顶灌顶',
            },
          ],
        },
      ]),
    },
    {
      id: 'em20_join_chan_pure',
      label: '拜入【华藏净脉】· 清心参禅（女众青灯礼佛 / 男众净衣护法）',
      subLabel: '男女皆宜：授峨眉清修弟子籍，获赐僧衣佛牌与熊胆丸，精进《峨眉吐纳术》（高慧根额外获【峨眉青云道履】）',
      tone: 'jade',
      effects: buildJoinEmeiCoreEffects([
        { type: 'setFlag', flag: 'emei_disciple_branch', value: 'chan_pure' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0128' }, delta: 25 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0206' }, delta: 20 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 15 },
        { type: 'modifySkill', key: '经义', delta: 4 },
        { type: 'modifyRenown', delta: 15, reason: '拜入峨眉华藏净脉' },
        { type: 'addSectContribution', amount: 60 },
        { type: 'giveItem', itemId: 'ARM-036', qty: 1 },
        { type: 'giveItem', itemId: 'ACC-050', qty: 1 },
        { type: 'giveItem', itemId: 'ITM-MED-115', qty: 2 },
        { type: 'addArtExp', artId: 'MA-161', amount: 6000 },
        {
          type: 'branch',
          condition: { type: 'flag', flag: 'emei_aptitude_marks', op: 'gte', value: 3 },
          thenEffects: [
            { type: 'teachMartialArt', artId: 'MA-161', level: 2, exp: 3000 },
            { type: 'giveItem', itemId: 'BOT-013', qty: 1 },
            { type: 'addSectContribution', amount: 60 },
            {
              type: 'toast',
              text: '云慧师太叹赏你慧根深种，亲赐良阶【峨眉青云道履】，并点化《峨眉吐纳术》直破第 2 重！苏梦清亦拱手笑约日后下山同行！',
              tone: 'success',
              logTag: '慧根深种',
            },
          ],
          elseEffects: [
            {
              type: 'toast',
              text: '正式拜入峨眉华藏净脉！获云慧与静虚师太赐予【灰麻僧衣】、【木制小佛牌】及【白云熊胆丸】，丹田清气愈发绵长。',
              tone: 'success',
              logTag: '峨眉入门',
            },
          ],
        },
      ]),
    },
  ],
}

const SCENE_EM_19_JINDING_BUDDHA_LIGHT: StorySceneDef = {
  id: 'scene_em_19_jinding_buddha_light',
  title: '第十九幕 · 万仞云海睹佛光',
  subtitle: '峨眉金顶 · 万仞云海佛光睹光台',
  illustrationUrl: '/assets/quests/emei_jinding_buddha_light.jpg',
  illustrationCaption: '峨眉万仞金顶 · 破晓云海七彩宝光问本心',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '押下暗探、行至万仞睹光台石栏前时，东方天际恰有一线赤金刺破寒夜。脚下八百里云海如万马奔腾的雪浪翻涌不息，初升旭日将万道金辉投射于云涛水雾之间——刹那间，一轮直径数丈、外红内紫的七彩庄严圆光自绝壁云海中冉冉浮现！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“快看云海正中！是金顶‘普贤宝光’！山中常有人苦候数月而不得一见，今日你初登金顶便遇云开雾散、宝光现世，真是天大的缘法！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '奇异的是，台前众人并肩而立，每个人望向那轮七彩佛光中心，看到的却唯独只有自己的身影，恰似明镜高悬，纤尘毕现。便在此时，木鱼轻叩，一位身披素色袈裟、眉目慈和渊深的老尼手捻紫檀佛珠缓步走出，正是峨眉派掌门「金顶神尼」云慧师太。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0128' },
      text: '“阿弥陀佛。世人皆道金顶佛光能照前世今生，其实光中无佛亦无仙，照见的不过是各人自己的一颗本心罢了。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0128' },
      text: '“孩子，静虚的素笺与梦清的禀报，老尼皆已看过了。你入山之前不曾习过半分内家武学，如今丹田方生一缕清气，指掌初识三分剑理——老尼最后问你一句：若今日授你峨眉三尺青锋，你手中之剑，究竟欲为谁而执？”',
    },
  ],
  choices: [
    {
      id: 'em19_vow_people',
      label: '“为锦江雨中跌倒的药农，为蜀道千百里手无寸铁的苍生。”',
      subLabel: '侠骨仁心：江湖侠义 +8，云慧师太深许其慈悲',
      tone: 'gold',
      effects: [
        { type: 'modifyChivalry', delta: 8, reason: '金顶佛光立誓护佑苍生' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0128' }, delta: 15 },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'openScene', scene: SCENE_EM_20_HUAZANG_CEREMONY },
      ],
    },
    {
      id: 'em19_vow_dao',
      label: '“为涤尽胸中浮躁俗尘，于佛道山水中求一个澄明自在。”',
      subLabel: '清修见性：十艺【经义】+3，深契峨眉清静真意',
      tone: 'jade',
      effects: [
        { type: 'modifySkill', key: '经义', delta: 3 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0128' }, delta: 15 },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'openScene', scene: SCENE_EM_20_HUAZANG_CEREMONY },
      ],
    },
    {
      id: 'em19_vow_companions',
      label: '“愿与苏师姐及同门并肩守望，不教外寇宵小染指巴蜀河山！”',
      subLabel: '同门赤诚：与苏梦清羁绊加深，静玄师太颔首赞许',
      tone: 'primary',
      effects: [
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0169' }, delta: 12 },
        { type: 'openScene', scene: SCENE_EM_20_HUAZANG_CEREMONY },
      ],
    },
  ],
}

const SCENE_EM_18_QINGCHENG_HIDDEN_PLOT: StorySceneDef = {
  id: 'scene_em_18_qingcheng_hidden_plot',
  title: '第十八幕 · 雪崖暗哨破迷雾',
  subtitle: '峨眉金顶 · 卧云松雪断崖侧',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '演剑亭内刚收住招势，你正依着《峨眉吐纳术》缓缓平复翻涌的气息，耳廓忽随清冽山风捕捉到亭西枯松林外传来极轻微的一声积雪踩实闷响！若是三日前那个呼吸粗重的凡俗自己，绝无可能听出这十丈外的异动。',
    },
    {
      speaker: { kind: 'player' },
      text: '“苏师姐、柳护法，且慢！西侧断崖枯松后有人屏息窥探，鞋底沾着山下红泥！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“好敏锐的耳力！想走？给我留下！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '苏梦清身若惊鸿掠出亭外，窄剑连鞘点中树后黑影肩井穴；恰逢巡查至此的执法首座静玄师太铁掌一扣，将那灰衣暗探生生提回亭中，自其怀里搜出一卷绘着峨眉与剑门关药粮驿道的羊皮草图，以及半锭烙有党项狼头暗记的官银！',
    },
    {
      speaker: SPEAKER_QC_SPY,
      text: '“饶命！小的原是青城外门弃徒……是、是西夏一品堂的暗客出了重金，撺掇青城好手频频截断峨眉进山药路，好叫川西两派内斗无暇北顾剑门蜀道！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0169' },
      text: '“好个西夏一品堂，手竟伸到巴蜀腹地来了！柳川，将这厮押入戒律院严加审问。至于你——初成吐纳便能听风辨位立此大功，随梦清去前面【万仞云海佛光睹光台】，掌门师姐已在候你了！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: EMEI_ENTRY_QUEST_ID,
      stepId: 'buddha_light_oath',
    },
    { type: 'modifyChivalry', delta: 5, reason: '揪出峨眉金顶西夏暗哨' },
    {
      type: 'toast',
      text: '勘破青城截药背后的西夏暗桩阴谋！请移步金顶【万仞云海佛光睹光台】（或【华藏金顶普贤铜殿】）拜见掌门云慧师太。',
      tone: 'success',
      logTag: '雪崖破谍',
    },
  ],
}

const SCENE_EM_17_JINDING_SPAR_INTRO: StorySceneDef = {
  id: 'scene_em_17_jinding_spar_intro',
  title: '第十七幕 · 演剑亭前试新锋',
  subtitle: '峨眉金顶 · 卧云松雪演剑禅亭',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0340' },
      text: '“峨眉虽重仁心，到底也是执剑护道的名门。昨夜梦清师妹在洗象池既已教你行气与分水刺法，光在池边比划竹枝可作不得数——清霜，你把内劲压到三成，替我试试这位新人的临阵定力！”',
    },
    {
      speaker: SPEAKER_JINDING_DISCIPLE,
      text: '“是，柳护法！这位少侠莫慌，只管将丹田那缕峨眉清气运起来，看准我的剑路旋腕拆招便是！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“别紧张，记住昨夜白猿折竹时的节奏——先守住气息绵长，胜负皆无妨，打出你自己的精气神来！”',
    },
  ],
  choices: [
    {
      id: 'em17_start_friendly_spar',
      label: '凝神调息 · 运起《峨眉吐纳术》上前拆招（点到为止）',
      subLabel: '检验新学吐纳与分水峨眉刺，胜败皆可顺利过关',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: EMEI_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildJindingSparDiscipleNpc() },
          rule: 'spar',
          lethalOnLose: false,
          forbidEscapeReason: '金顶宗门考校点到为止，凝神拆招即可，无需逃遁',
          introText: '卧云松雪演剑亭内寒梅飘雪，你生平第一次运转真正的内门吐纳心法迎上前去！',
          onWin: [
            { type: 'setFlag', flag: 'emei_jinding_spar_won', value: true },
            { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
            { type: 'giveCombatExp', amount: 20, reason: '金顶演剑亭拆招获胜' },
            {
              type: 'toast',
              text: '新学的吐纳与分水刺法如臂使指，柳川护法与苏梦清齐齐抚掌称善！',
              tone: 'success',
              logTag: '初试锋芒',
            },
            { type: 'openScene', scene: SCENE_EM_18_QINGCHENG_HIDDEN_PLOT },
          ],
          onLose: [
            { type: 'giveCombatExp', amount: 12, reason: '金顶演剑亭拆招历练' },
            { type: 'healPlayer', hpPct: 100, mpPct: 100 },
            {
              type: 'toast',
              text: '虽初学乍练略逊半筹，但下盘稳健、吐纳未乱，柳川护法含笑点头许准过关！',
              tone: 'talk',
              logTag: '演剑试心',
            },
            { type: 'openScene', scene: SCENE_EM_18_QINGCHENG_HIDDEN_PLOT },
          ],
          onDraw: [
            { type: 'giveCombatExp', amount: 15, reason: '金顶演剑亭平分秋色' },
            { type: 'openScene', scene: SCENE_EM_18_QINGCHENG_HIDDEN_PLOT },
          ],
        },
      ],
    },
  ],
}

const SCENE_EM_16_JINDING_SNOW_STEPS: StorySceneDef = {
  id: 'scene_em_16_jinding_snow_steps',
  title: '第十六幕 · 卧云松雪破寒罡',
  subtitle: '峨眉金顶 · 八十四盘雪磴至演剑禅亭',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '五更寅时，你随苏梦清自洗象池冒雪向万仞金顶攀登。越往上行，苍松尽挂晶莹雾凇，山巅罡风如刀刮面；奇妙的是，每当寒意侵入经脉，丹田内那缕《峨眉吐纳术》清气便自行流转周身，令四肢百骸暖融如春。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“想当初你刚到万年寺挑水那会儿，走二十级石阶便气喘如牛；如今连闯八十四盘积雪天梯竟脸不红气不喘——看来静虚师叔的吐纳口诀，真教你吃透进骨子里了。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '踏入【卧云松雪演剑禅亭】，一位鬓染微霜、气度沉凝的中年男侠正负手立于雪松下擦拭长剑，身旁守亭女冠贝凝音亦向你们颔首致礼——正是峨眉金顶护法「翻江鹰」柳川。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0340' },
      text: '“梦清师妹，这位便是静虚师叔信中提及的年轻人么？外头常有传言，以为我峨眉山上尽是女尼，却不知历代护法与俗家剑侠亦有许多铮铮儿郎与巾帼同参大道。来得好，且入亭一叙！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_EM_17_JINDING_SPAR_INTRO }],
}

// ============================================================================
// 第三卷：洗象澄月 · 吐纳筑基（第 11～15 幕）
// ============================================================================

const SCENE_EM_15_XIXIANG_MOON_APE: StorySceneDef = {
  id: 'scene_em_15_xixiang_moon_ape',
  title: '第十五幕 · 洗象澄月白猿影',
  subtitle: '洗象池灵猴剑坪 · 澄月六角灵池畔',
  illustrationUrl: '/assets/quests/emei_xixiang_moon_ape.jpg',
  illustrationCaption: '峨眉洗象灵池 · 澄月松涛共观白猿折竹',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '入夜云散，一轮皎洁圆月升上峨眉绝壁，将六角洗象池照得宛若一块嵌在苍山间的碧玉。先头受你安抚的那只雪白老猿忽地长啸一声，纵身跃上临渊古松横枝，随手折下一截三尺翠竹，对着水中月影腾挪点刺起来！',
    },
    {
      speaker: SPEAKER_WHITE_APE,
      text: '白猿手中翠竹忽左忽右，时而如分波破浪、双弧交错，时而旋腕急扣、直取松针露珠，虽无半分杀伐戾气，却将“借力锁刃、后发先至”的灵巧变化演得妙到毫巅！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“这老白猿在洗象池活了数十年，早年常看本派前辈月下演武，竟把一套贴身锁穴的《分水峨眉刺》身段学去了七八分！来，折一截竹枝，我教你认准它翻腕的节点。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '苏梦清走近你身侧半步，清冽松香混着淡淡药草气息拂过鼻端。她伸出温热修长的手指轻轻托住你的手腕，引着你手中青竹枝随白猿影迹一旋一分、贴腕斜刺——你体内新生的峨眉吐纳清气顺着劳宫穴贯入竹梢，月光下竹叶清露应声而落！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“记住这一旋一扣的寸劲！《分水峨眉刺》本是我派以弱胜强、锁敌兵刃的护身绝活，最适合初筑内息之人防身。今夜之后，你总算不再是万里桥头那个只能空手挨欺负的外行啦！”',
    },
  ],
  choices: [
    {
      id: 'em15_comprehend_swift',
      label: '【灵犀一动 · 顺白猿竹影自行演化连环锁腕变式】（悟性 ≥ 90 或深厚羁绊）',
      subLabel: '资质/缘分超卓：领悟《分水峨眉刺》并额外获 +4500 熟练度，苏梦清惊叹欣喜',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需先天悟性 ≥ 90，或与苏梦清羁绊值 ≥ 4',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 90 },
          { type: 'flag', flag: 'emei_smq_bond', op: 'gte', value: 4, label: '苏梦清深厚羁绊' },
        ],
      },
      effects: [
        { type: 'teachMartialArt', artId: 'MA-136', level: 1, exp: 4500, autoEquip: true },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 15 },
        {
          type: 'setQuestStep',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'ascend_jinding_summit',
        },
        {
          type: 'toast',
          text: '月下观猿顿悟《分水峨眉刺》（熟练度 +4500）！五更将近，请登临【峨眉金顶睹光台 · 卧云松雪演剑禅亭】迎破晓大考！',
          tone: 'success',
          logTag: '洗象悟刺',
        },
      ],
    },
    {
      id: 'em15_comprehend_steady',
      label: '【凝神铭记 · 循苏梦清掌心引劲一板一眼练熟十二路正刺】',
      subLabel: '稳扎稳打：正式习得峨眉护身武学《分水峨眉刺》（第 1 重）',
      tone: 'primary',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-136', level: 1, exp: 1800, autoEquip: true },
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 10 },
        {
          type: 'setQuestStep',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'ascend_jinding_summit',
        },
        {
          type: 'toast',
          text: '得苏梦清手把手亲授，习得《分水峨眉刺》（第 1 重）！请前往【峨眉金顶睹光台 · 卧云松雪演剑禅亭】会合柳川护法。',
          tone: 'success',
          logTag: '洗象授艺',
        },
      ],
    },
  ],
}

const SCENE_EM_14_XIXIANG_ARRIVAL: StorySceneDef = {
  id: 'scene_em_14_xixiang_arrival',
  title: '第十四幕 · 清池竹韵抚山灵',
  subtitle: '洗象池灵猴剑坪 · 灵猿戏剑苍松崖坪',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '辞别万年寺，你随苏梦清踏着钻天坡陡峭石阶直上山腰【洗象池】。换作昨日之前，这十里险坡定要爬得双腿如灌铅；此刻试着将《峨眉吐纳术》一吸三呼配合步点，脚底竟觉轻快温热，抵崖坪时呼吸犹自匀净。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0376' },
      text: '“苏师姐你们可算上来啦！前两日青城派恶客在山腰放响箭惊扰猴群，咱们洗象池那只最通人性的老白猿受了惊躁，一直在松崖上龇牙乱掷松果，连周秀师妹送去的山桃都不肯接呢。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0652' },
      text: '“普贤菩萨道场向来不伤山间生灵，若强用兵刃压制反倒坏了灵性。苏师姐，你带上的这位新人瞧着气息清纯，不知可有法子安抚山灵？”',
    },
  ],
  choices: [
    {
      id: 'em14_calm_with_qin_charm',
      label: '【借竹楼琴箫清韵 · 抚奏一曲空山鸟语平复躁气】（琴 ≥ 14 / 诗词 ≥ 15 / 颜值 ≥ 92）',
      subLabel: '清雅风姿：琴音涤荡惊惧，老白猿欢跃落崖，十艺【琴】+2',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需十艺【琴】≥ 14，或【诗词】≥ 15，或先天【颜值】≥ 92',
        conditions: [
          { type: 'skillAtLeast', key: '琴', min: 14 },
          { type: 'skillAtLeast', key: '诗词', min: 15 },
          { type: 'talentAtLeast', key: '颜值', min: 92 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '琴', delta: 2 },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0376' }, delta: 12 },
        { type: 'openScene', scene: SCENE_EM_15_XIXIANG_MOON_APE },
      ],
    },
    {
      id: 'em14_calm_with_tuna_breath',
      label: '【运起初成的峨眉吐纳 · 敛尽防备捧山桃缓步走近】',
      subLabel: '禅气初试：以平和清净内息消解戒心，唐月瑾赞叹吐纳纯正',
      tone: 'primary',
      effects: [
        { type: 'addArtExp', artId: 'MA-161', amount: 1500 },
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0376' }, delta: 10 },
        { type: 'openScene', scene: SCENE_EM_15_XIXIANG_MOON_APE },
      ],
    },
  ],
}

const SCENE_EM_13_LEARN_EMEI_TUNA: StorySceneDef = {
  id: 'scene_em_13_learn_emei_tuna',
  title: '第十三幕 · 一缕清气生丹田',
  subtitle: '万年古寺禅院 · 筑基破茧',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '夜色渐深，殿外白水池荷叶承露微响。你依着静虚师太所授「峨眉十二庄吐纳诀」，屏绝市井杂念，鼻吸清冽松岚，意守脐下三寸关元穴。起初胸口仍如塞着棉絮般滞涩，一呼一吸间尽是这三日挑水留下的酸胀痛楚。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '（苏梦清轻声在旁护法提醒）“莫用蛮力去憋气！想象你是一株生在峨眉云雾里的修竹，山风吹来便随风微弯，风过之后自然挺立，让气息自己落下去……”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '你心头一松，不再刻意强求。就在第三十六次绵长吐纳垂落之际——丹田深处忽然“嗡”地生出一点蚕豆大小的温润暖意！那缕清气虽极细微，却如春冰初融后的山涧活水，顺着任督浅脉徐徐漫过酸痛的双肩与四肢！',
    },
    {
      speaker: { kind: 'player' },
      text: '“这便是……内家真气么？方才肩头火辣辣的淤痛竟散去了大半，连殿外十丈远竹梢露珠滴落青苔的声音，都听得清清楚楚！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0206' },
      text: '“善哉！从凡胎浊息跨入内家清气，最难的便是这一道门槛。今夜你既已筑成《峨眉吐纳术》第一重根基，便随梦清往山腰【洗象池灵猴剑坪】走一趟吧——趁月色尚好，去天地间印证这一口活气！”',
    },
  ],
  choices: [
    {
      id: 'em13_breakthrough_gifted',
      label: '【周天自转 · 借先天灵根一举贯通十二浅络】（根骨 ≥ 90 或 悟性 ≥ 90 或 前期慧根 ≥ 2）',
      subLabel: '上佳资质：习得《峨眉吐纳术》（第 1 重，额外熟练度 +6000）并自动主运',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需先天【根骨】≥ 90，或【悟性】≥ 90，或前期积累慧根印记 ≥ 2',
        conditions: [
          { type: 'talentAtLeast', key: '根骨', min: 90 },
          { type: 'talentAtLeast', key: '悟性', min: 90 },
          { type: 'flag', flag: 'emei_aptitude_marks', op: 'gte', value: 2, label: '前期慧根印记' },
        ],
      },
      effects: [
        { type: 'teachMartialArt', artId: 'MA-161', level: 1, exp: 6000, autoEquip: true },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        {
          type: 'setQuestStep',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'go_xixiang_pond',
        },
        {
          type: 'toast',
          text: '破茧筑基！成功领悟并自动运使《峨眉吐纳术》（额外熟练度 +6000）！请前往山腰【洗象池灵猴剑坪 · 灵猿戏剑苍松崖坪】寻唐月瑾。',
          tone: 'success',
          logTag: '吐纳筑基',
        },
      ],
    },
    {
      id: 'em13_breakthrough_steady',
      label: '【抱元守一 · 将丹田初生的第一缕峨眉清气稳稳收归气海】',
      subLabel: '零内功蜕变：习得《峨眉吐纳术》（第 1 重）并自动替换粗浅呼吸法',
      tone: 'primary',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-161', level: 1, exp: 2500, autoEquip: true },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'setQuestStep',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'go_xixiang_pond',
        },
        {
          type: 'toast',
          text: '丹田初生清气！成功习得并运使峨眉筑基内功《峨眉吐纳术》！请前往【洗象池灵猴剑坪 · 灵猿戏剑苍松崖坪】。',
          tone: 'success',
          logTag: '吐纳筑基',
        },
      ],
    },
  ],
}

const SCENE_EM_12_TUNA_PREPARATION: StorySceneDef = {
  id: 'scene_em_12_tuna_preparation',
  title: '第十二幕 · 五心朝天叩玄关',
  subtitle: '万年古寺禅院 · 无梁砖殿蒲团',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '白水池边叙话方罢，先一步押药归山的静虚师太微笑着步入琴榭，手里捧着一册墨迹犹新的《峨眉吐纳导引图》——扉页空白处，赫然留着执法首座静玄师太刚劲冷峻的几行朱笔批注。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0206' },
      text: '“呵呵，静玄师姐嘴上不饶人，方才去水缸边验过满缸清泉与你抄的经卷，回房便把初学最易岔气的三处关窍用朱笔标了出来，托我今夜教你吐纳筑基。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“我就知道静玄师伯是刀子嘴豆腐心！快随我们入无梁砖殿坐好——习武之人若无内功根基，招式再花哨也只是无根浮萍；我峨眉内功融道家导引与佛门止观，最是平和中正，绝无走火入魔之虞。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0206' },
      text: '“盘膝坐定，五心朝天，舌抵上腭，双目微垂留一线清光。将你往日在红尘中赶路喘息的粗浅呼吸尽数忘却，听老尼木鱼之声，引山间清气缓缓沉入丹田——”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_EM_13_LEARN_EMEI_TUNA }],
}

const SCENE_EM_11_LOTUS_PAVILION_HEART: StorySceneDef = {
  id: 'scene_em_11_lotus_pavilion_heart',
  title: '第十一幕 · 贝叶琴榭听夜雨',
  subtitle: '万年古寺禅院 · 白水荷池贝叶琴榭',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '第三日黄昏，当最后一桶山泉倾入大铜缸、最后一页《普贤行愿品》墨迹晾干，你揉着发麻的肩膀踱至【白水荷池贝叶琴榭】歇息。暮雨轻敲新荷，苏梦清正独自坐在水榭栏杆上，借着灯笼微光细细擦拭那柄窄刃佩剑。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“过来坐吧，水缸和经卷我都替你瞧过了，挑不出半点毛病。这三天在万年寺吃苦受冷眼，心里可曾后悔随我上这峨眉山？”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“其实十年前我初上山时，比你还狼狈呢。我家世代在川陕边军行伍，爹爹与兄长皆折在西北党项铁鹞子阵前。师父救我上金顶时，原想替我剃度避世；可我每回闭上眼，总看见剑门关外风雪里蹒跚的挑夫与药农——所以我向掌门师伯求了俗家籍，宁在红尘风霜里多走一程。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '池面清风拂起她耳畔一缕碎发，灯影映在她澄亮如星的眸底。往日里那个飒爽爱笑的「蜀道飞燕」，唯在此刻白水荷池的夜色中，向相识不过数日的你露出了心底最柔软而执拗的一角。',
    },
  ],
  choices: [
    {
      id: 'em11_promise_walk_together',
      label: '“待我练成护身剑术，往后剑门风雪与蜀道烟雨，我陪苏师姐一道走。”',
      subLabel: '知己定约：苏梦清心弦微颤，羁绊大幅加深（好感 +18）',
      tone: 'gold',
      effects: [
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 18 },
        { type: 'openScene', scene: SCENE_EM_12_TUNA_PREPARATION },
      ],
    },
    {
      id: 'em11_buddha_in_dust',
      label: '“佛在金顶受香火是慈悲，师姐在蜀道为百姓遮风雨，更是活生生的大慈悲。”',
      subLabel: '通透禅心：既契佛理亦懂故人，苏梦清展颜轻笑（羁绊 +1，慧根 +1）',
      tone: 'jade',
      effects: [
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 14 },
        { type: 'openScene', scene: SCENE_EM_12_TUNA_PREPARATION },
      ],
    },
  ],
}

// ============================================================================
// 第二卷：清音石磴 · 智破青城（第 6～10 幕）
// ============================================================================

const SCENE_EM_10_THREE_DAYS_CHORES: StorySceneDef = {
  id: 'scene_em_10_three_days_chores',
  title: '第十幕 · 三日苦劳见拙诚',
  subtitle: '万年古寺禅院 · 担泉扫叶与寒灯抄经',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '自次日卯时起，你便在毫无内力护体的情形下开始了万年寺三日考校。桑木扁担压在毫无真气垫护的凡胎肩头，不过十趟便磨出一道火辣血印；午后清扫演剑方庭湿滑落叶，入夜又在青灯下端坐抄录《普贤行愿品》。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '第二日深夜山寒刺骨，正当你在阶前揉着红肿双肩喘气时，白水荷池矮墙上忽地探出半个俏丽身影——苏梦清提着一只竹编小食盒轻巧跃下，塞给你一碗滚烫的姜枣红糖汤与一丸清香扑鼻的【峨眉金顶白云熊胆丸】。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“嘘——小声些，别教静玄师伯听见！快把姜汤趁热喝了，这丸白云熊胆丸化开敷在肩头，明日便不钻心疼了。你是我从成都带上来的人，我可不能眼睁睁看你累垮在石阶上。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '一碗热姜汤下肚，寒意顿消。到了第三日，面对最后十担山泉与半卷经文，你决意拿出看家本领做个漂亮的收尾——',
    },
  ],
  choices: [
    {
      id: 'em10_bone_endurance',
      label: '【仗天生强健筋骨 · 一鼓作气多挑十担满溢山泉】（先天根骨 ≥ 90）',
      subLabel: '根骨超群：静玄师太暗立廊下颔首，获赠【白云熊胆丸】且好感提升',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '根骨', min: 90 },
      effects: [
        { type: 'advanceShichen', count: 6 },
        { type: 'giveItem', itemId: 'ITM-MED-115', qty: 1 },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0169' }, delta: 15 },
        {
          type: 'setQuestStep',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'lotus_pavilion_night',
        },
        {
          type: 'toast',
          text: '三日苦役圆满！天生神力挑满四十担清泉，连铁尼静玄师太亦暗暗动容！请移步【白水荷池贝叶琴榭】会合苏梦清。',
          tone: 'success',
          logTag: '筋骨初显',
        },
      ],
    },
    {
      id: 'em10_calligraphy_sutra',
      label: '【凝神运腕 · 以端严宋楷一笔不苟写就《行愿品》】（书 ≥ 14 或 经义 ≥ 15）',
      subLabel: '翰墨清修：字字珠玑澄净无瑕，十艺【书】+2、【经义】+2，获赠【白云熊胆丸】',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需十艺【书】≥ 14，或【经义】≥ 15',
        conditions: [
          { type: 'skillAtLeast', key: '书', min: 14 },
          { type: 'skillAtLeast', key: '经义', min: 15 },
        ],
      },
      effects: [
        { type: 'advanceShichen', count: 6 },
        { type: 'giveItem', itemId: 'ITM-MED-115', qty: 1 },
        { type: 'modifySkill', key: '书', delta: 2 },
        { type: 'modifySkill', key: '经义', delta: 2 },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0361' }, delta: 12 },
        {
          type: 'setQuestStep',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'lotus_pavilion_night',
        },
        {
          type: 'toast',
          text: '三日苦役圆满！手抄《行愿品》笔意清绝，获万年寺上下交口称赞！请移步【白水荷池贝叶琴榭】寻苏梦清。',
          tone: 'success',
          logTag: '墨韵禅心',
        },
      ],
    },
    {
      id: 'em10_humble_perseverance',
      label: '【不逞巧、不惜力 · 一步一个脚印将水缸挑满、经字写端正】',
      subLabel: '赤诚拙功：虽无奇技傍身却凭韧劲打动人心，苏梦清倍加怜惜敬重（羁绊 +2）',
      tone: 'primary',
      effects: [
        { type: 'advanceShichen', count: 6 },
        { type: 'giveItem', itemId: 'ITM-MED-115', qty: 1 },
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 12 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0169' }, delta: 10 },
        {
          type: 'setQuestStep',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'lotus_pavilion_night',
        },
        {
          type: 'toast',
          text: '三日苦役咬牙撑过！苏梦清赠予的【白云熊胆丸】已收入行囊，请前往万年寺【白水荷池贝叶琴榭】与她夜话。',
          tone: 'success',
          logTag: '拙诚动人',
        },
      ],
    },
  ],
}

const SCENE_EM_09_WANNIAN_TRIAL_ASSIGN: StorySceneDef = {
  id: 'scene_em_09_wannian_trial_assign',
  title: '第九幕 · 回风庭前担山雪',
  subtitle: '万年古寺禅院 · 回风拂柳演剑方庭',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '步入万年古寺【回风拂柳演剑方庭】，十余名峨眉弟子正迎着山风演练剑刺，剑光霍霍如秋水惊鸿。静玄师太将那匣「万年寒霜药引」交予知客尼苏涵收妥，转过身来，冷峻如铁的目光落在你身上。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0169' },
      text: '“静虚师妹信里替你说了不少好话，梦清更是把你夸成了一朵花。但老尼执掌峨眉戒律二十载，最知江湖人心易变——一时意气相助容易，长年耐住名山清苦却难如登天！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“静玄师伯，人家至今尚未修习内功，双桥茶棚前尚且不惧青城利刃……”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0169' },
      text: '“正因身无内功，才更要先磨筋骨心性！听着：自今日起三日之内，每日去白水池挑满三十担泉水，扫净演剑庭落叶，晚间再去砖殿抄一卷《普贤行愿品》。但凡嫌苦叫累，随时下山回你的成都府吃茶去！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“晚辈领命。莫说三日，便是三十日，也定把水缸挑满、经卷抄清，绝不堕了静虚师太与苏师姐的保举之信！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_EM_10_THREE_DAYS_CHORES }],
}

const SCENE_EM_08_JINGXUAN_ARRIVES: StorySceneDef = {
  id: 'scene_em_08_jingxuan_arrives',
  title: '第八幕 · 铁尼霜剑震松风',
  subtitle: '峨眉双桥清音 · 执法首座下山',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '便在茶棚纷乱、贾天鹤长剑疾刺逼向苏梦清肩头的一刹那——上方山道古木间骤然炸开一声沉雷般的佛号！一道高大魁伟的灰衣僧影踏着飞瀑水花凌空掠下，长剑出鞘如狂风卷柳，剑脊“铛铛”两记重震，竟将申风涛手中钢刀连同贾天鹤的松风快剑一齐震偏三尺！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0221' },
      text: '（虎口崩裂倒退数步，面色骤变）“‘峨眉铁尼’静玄？！你不是在万年寺闭关督剑么！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0169' },
      text: '“哼！余沧澜好大的威风，纵容门人跑到我峨眉双桥清音截抢救命草药、以多欺少！贾天鹤，还不滚回青城山去，莫非要老尼拿《灭绝回风剑》送你一程？！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '贾天鹤见静玄师太与苏梦清双剑合势，自知讨不到半点便宜，只得恨恨一挥道袍携众狼狈退下山去。然而危机甫解，静玄师太却眉头紧锁，目光如冷电般刺向浑身尘土、呼吸急促的你——',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0169' },
      text: '“梦清！这位连丹田气感都未曾筑起的外人是谁？我峨眉山门清静之地，岂能随随便便带无功白身入山涉险？还不随老尼回【万年古寺禅院 · 回风拂柳演剑方庭】领罚回话！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: EMEI_ENTRY_QUEST_ID,
      stepId: 'wannian_jingxuan_trial',
    },
    {
      type: 'toast',
      text: '已由双桥清音突围入山！请前往峨眉山【万年古寺禅院 · 回风拂柳演剑方庭】向执法首座【静玄师太】呈信复命。',
      tone: 'success',
      logTag: '铁尼解围',
    },
  ],
}

const SCENE_EM_07_OUTWIT_QINGCHENG: StorySceneDef = {
  id: 'scene_em_07_outwit_qingcheng',
  title: '第七幕 · 无功之躯破危局',
  subtitle: '双桥清音茶棚 · 智勇抉择',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0459' },
      text: '“小尼姑，识相的便把峨眉后山采药图和那匣寒霜药引交出来！否则爷们失手划花你的脸，你那位苏师姐自身难保，可救不得你！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0582' },
      text: '（苏涵紧紧护住怀中药匣退至竹栏边）“这是给山民治寒瘴的救命药引，便是拼了性命也绝不给你们青城派！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '不远处苏梦清一人独斗贾天鹤与两名青城好手，窄剑翻飞如银燕穿林，一时腾不出手救援茶棚。你摸了摸自己空空如也的丹田与寻常拳脚，深知正面硬拼绝非良策，心念电转间已生出计较——',
    },
  ],
  choices: [
    {
      id: 'em07_eloquence_bluff',
      label: '【借势喝止 · 亮出大慈寺官印药封高呼剑门巡检司拿贼】（辩才 ≥ 15 或 策论 ≥ 15）',
      subLabel: '口才机锋：搬出成都府与蜀道军驿法度震慑宵小，十艺【辩才】+2',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需十艺【辩才】≥ 15，或【策论】≥ 15',
        conditions: [
          { type: 'skillAtLeast', key: '辩才', min: 15 },
          { type: 'skillAtLeast', key: '策论', min: 15 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '辩才', delta: 2 },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0582' }, delta: 12 },
        { type: 'openScene', scene: SCENE_EM_08_JINGXUAN_ARRIVES },
      ],
    },
    {
      id: 'em07_math_steam_trap',
      label: '【巧借地利 · 算准峡风方向踢翻滚水茶炉迷眼救人】（算术 ≥ 15 或 悟性 ≥ 90）',
      subLabel: '机敏智计：滚烫水雾顺山风扑面，毫发无伤拉走苏涵与药匣',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需十艺【算术】≥ 15，或先天【悟性】≥ 90',
        conditions: [
          { type: 'skillAtLeast', key: '算术', min: 15 },
          { type: 'talentAtLeast', key: '悟性', min: 90 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '算术', delta: 2 },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0582' }, delta: 12 },
        { type: 'openScene', scene: SCENE_EM_08_JINGXUAN_ARRIVES },
      ],
    },
    {
      id: 'em07_shield_with_body',
      label: '【义无反顾 · 横身挡在苏涵与药匣前死撑两合待援！】',
      subLabel: '零门槛热血担当：虽无内功仍以血肉凡躯死护药匣（胜败皆推进，苏梦清羁绊 +2）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: EMEI_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildQingchengTeaBullyNpc() },
          rule: 'survive_rounds',
          maxRounds: 2,
          lethalOnLose: false,
          forbidEscapeReason: '身后便是知客尼苏涵与万年寒霜药引，一步亦不可退！',
          introText: '明知身无半点内功，你仍咬紧牙关张开双臂挡在药匣之前，硬接青城剑徒攻势！',
          onWin: [
            { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 2 },
            { type: 'modifyChivalry', delta: 6, reason: '双桥清音舍身护药' },
            { type: 'giveCombatExp', amount: 15, reason: '双桥清音死守药匣' },
            { type: 'healPlayer', hpPct: 80 },
            { type: 'openScene', scene: SCENE_EM_08_JINGXUAN_ARRIVES },
          ],
          onLose: [
            { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 2 },
            { type: 'modifyChivalry', delta: 6, reason: '双桥清音舍身护药' },
            { type: 'giveCombatExp', amount: 10, reason: '双桥清音浴血护药' },
            { type: 'healPlayer', hpPct: 60 },
            { type: 'openScene', scene: SCENE_EM_08_JINGXUAN_ARRIVES },
          ],
          onDraw: [
            { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 2 },
            { type: 'modifyChivalry', delta: 6, reason: '双桥清音舍身护药' },
            { type: 'openScene', scene: SCENE_EM_08_JINGXUAN_ARRIVES },
          ],
        },
      ],
    },
  ],
}

const SCENE_EM_06_EMEI_FOOT_AMBUSH: StorySceneDef = {
  id: 'scene_em_06_emei_foot_ambush',
  title: '第六幕 · 双桥清音闻剑啸',
  subtitle: '蜀中峨眉山 · 牛心岭双桥清音阁外',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '换上苏梦清所赠的【蜀道麻筋草鞋】，你自成都府一路西南行，踏入云雾缭绕、修竹蔽日的【蜀中峨眉山】。行至山麓双桥清音阁外，黑白二水自峡谷奔涌汇聚，撞击牛心巨石发出清越轰鸣。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '忽听前方竹林茶棚传来急促的金铁交鸣之声！只见苏梦清早已先一步赶至此处，手中三尺窄剑化作漫天寒星，正被青城派天师洞长老「青城鹤道人」贾天鹤率两名劲装剑客死死缠在石桥中央！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0221' },
      text: '“嘿嘿，苏侄女，你们峨眉派占着川西灵山宝地还不够，连灌县药市也要插上一脚？今日不留下采药秘图，谁也别想回万年寺报信！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '（瞥见赶来的你，剑势一急高声示警）“小心！贾天鹤故意缠住我，茶棚那边还有青城恶徒在逼迫报国寺苏涵师妹——你没有内功切莫与贾天鹤硬拼，快设法保住苏涵与药匣，万年寺援兵转瞬便至！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_EM_07_OUTWIT_QINGCHENG }],
}

// ============================================================================
// 第一卷：锦官春雨 · 油伞初逢（第 1～5 幕）
// ============================================================================

const SCENE_EM_05_DACISI_LETTER: StorySceneDef = {
  id: 'scene_em_05_dacisi_letter',
  title: '第五幕 · 锦水夜话托素笺',
  subtitle: '成都大慈寺山门 · 麻鞋赠行',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0206' },
      text: '“善哉。我峨眉择徒，向来不问出身贵贱，亦不嫌起步晚早，只看胸中那一寸灵台是否干净。青城派既然在入山药道动手脚，这匣提纯的‘万年寒霜药引’需尽快送回峨眉万年寺救治染瘴山民。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0206' },
      text: '“老尼这便修书一封盖上锦江别院私印，由梦清护药先行探路，小友随后同往【蜀中峨眉山】听候执法首座静玄师姐与掌门师姐考校——梦清，路上可要照拂好这位小友。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '步出大慈寺红墙山门时，锦江夜雨渐歇，檐角铜铃在晚风中轻响。苏梦清忽地解开背上行囊，取出一双编织极密实的【蜀道麻筋草鞋】塞进你怀里，唇角微扬。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“拿着！峨眉山石磴终年浸着云雾青苔，你脚上那双市井布鞋上去准得摔跟头。我先走半程去前面清查青城暗哨，咱们【蜀中峨眉山】双桥清音见——可不许半道打退堂鼓呀！”',
    },
  ],
  onFinishEffects: [
    { type: 'giveItem', itemId: 'BOT-024', qty: 1 },
    {
      type: 'setQuestStep',
      questId: EMEI_ENTRY_QUEST_ID,
      stepId: 'climb_emei_foot',
    },
    {
      type: 'toast',
      text: '获苏梦清相赠【蜀道麻筋草鞋】与静虚师太保举素笺！请出成都府向西南前往【蜀中峨眉山】。',
      tone: 'success',
      logTag: '蜀道结伴',
    },
  ],
}

const SCENE_EM_04_DACISI_FRESCO: StorySceneDef = {
  id: 'scene_em_04_dacisi_fresco',
  title: '第四幕 · 唐宋壁下参慈悲',
  subtitle: '成都府 · 大慈寺大雄正殿',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '待周老药农饮罢解毒汤沉沉睡稳，苏梦清领你穿过成都东城竹巷，步入素有「震旦第一丛林」美誉的皇家巨刹大慈寺。大雄正殿壁上唐代吴道子遗风佛画衣带当风、宝相森严；佛前蒲团上，峨眉驻蓉首座「锦江剑尼」静虚师太正拈针为一名贫家幼童施灸。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“静虚师叔！万里桥外青城派的人竟在进山药篓里暗藏竹叶青毒蛇，幸得这位小友冒雨护住老药农，又在百草堂帮着温师妹一道解了蛇毒。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0206' },
      text: '（温言颔首，目光清澈地打量你片刻）“呼吸虽尚在凡俗皮毛，未修半点内功，眉眼间却无市井戾气，难得。小友且看殿东壁上那幅《普贤行愿护法变相》——菩萨低眉慈悲，身侧护法韦陀却横杵怒目。依你之见，佛门清修之人，为何亦要执三尺利剑？”',
    },
  ],
  choices: [
    {
      id: 'em04_art_sutra_insight',
      label: '【观壁画笔意经义 · 答“低眉以渡善信，横剑方护得住低眉之慈悲”】（经义 ≥ 15 / 画 ≥ 14 / 书 ≥ 14）',
      subLabel: '文心慧根：深契峨眉佛道剑禅合一之旨，静虚师太抚掌赞叹',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需十艺【经义】≥ 15，或【画】≥ 14，或【书】≥ 14',
        conditions: [
          { type: 'skillAtLeast', key: '经义', min: 15 },
          { type: 'skillAtLeast', key: '画', min: 14 },
          { type: 'skillAtLeast', key: '书', min: 14 },
        ],
      },
      effects: [
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'modifySkill', key: '经义', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0206' }, delta: 15 },
        { type: 'openScene', scene: SCENE_EM_05_DACISI_LETTER },
      ],
    },
    {
      id: 'em04_sincere_plain_heart',
      label: '【坦陈胸臆 · 答“晚辈不懂深奥佛理，只知若无苏女侠那柄剑，桥头药农今日便活不成”】',
      subLabel: '质朴真淳：不掉书袋直指本心，苏梦清深以为然连声帮腔',
      tone: 'primary',
      effects: [
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0206' }, delta: 10 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 10 },
        { type: 'openScene', scene: SCENE_EM_05_DACISI_LETTER },
      ],
    },
  ],
}

const SCENE_EM_03_BAICAO_CLINIC: StorySceneDef = {
  id: 'scene_em_03_baicao_clinic',
  title: '第三幕 · 百草堂前辨蛇瘴',
  subtitle: '成都府 · 西川百草药武堂问诊正堂',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '你与苏梦清一左一右搀着周老药农赶入【西川百草药武堂】。堂内千味川药清香扑鼻，峨眉驻堂师姐温秀璐与「锦江药王」苏百草迎上前来，刚搭上老丈脉门，两人脸色皆是一沉！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0330' },
      text: '“不好！周老丈并非寻常摔伤受寒，他虎口处有一道细如牛毛的黑紫牙印——是蜀山竹叶青幼蛇之毒！定是方才那伙恶徒趁乱往药篓夹层塞了毒虫，既想毁药，又要害命！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0316' },
      text: '“蛇毒正顺手少阳经往上走！老夫与秀璐丫头即刻施金针封脉，只是堂中学徒恰去后院晾药，急需一人在旁配齐雄黄、半边莲与川芎看火急煎——慢上片刻便要毒攻心脉！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '（按剑守在堂口提防恶徒回扑，回头望向你）“我在门前戒备毒虫与暗算，药炉这边全仰仗你搭手了！”',
    },
  ],
  choices: [
    {
      id: 'em03_baicao_disciple_affinity',
      label: '【百草同门 · 熟稔取药抓方，以本门炮制法三沸滤汤】（隶属巴蜀百草药王门）',
      subLabel: '医门宿缘：苏百草与温秀璐欣慰激赏，结下深厚医道前缘',
      tone: 'gold',
      condition: { type: 'inSect', sectId: 'SECT-29' },
      effects: [
        { type: 'setFlag', flag: 'emei_baicao_affinity', value: true },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 2 },
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'giveItem', itemId: 'ITM-MED-127', qty: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0330' }, delta: 18 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0316' }, delta: 15 },
        {
          type: 'setQuestStep',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'visit_dacisi_jingxu',
        },
        {
          type: 'toast',
          text: '凭百草药王门医理干净利落化解蛇毒！请随苏梦清前往成都【大慈寺 · 大雄正殿】拜见静虚师太。',
          tone: 'success',
          logTag: '医武前缘',
        },
      ],
    },
    {
      id: 'em03_math_smart_brew',
      label: '【算准戥秤分两与武文火候 · 分毫不差煎出解毒清汤】（算术 ≥ 15 或 悟性 ≥ 88）',
      subLabel: '聪颖精细：虽非杏林中人亦一学即通，十艺【算术】+2，获赠【雄黄艾草辟瘴散】',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需十艺【算术】≥ 15，或先天【悟性】≥ 88',
        conditions: [
          { type: 'skillAtLeast', key: '算术', min: 15 },
          { type: 'talentAtLeast', key: '悟性', min: 88 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '算术', delta: 2 },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'giveItem', itemId: 'ITM-MED-127', qty: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0330' }, delta: 12 },
        {
          type: 'setQuestStep',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'visit_dacisi_jingxu',
        },
        {
          type: 'toast',
          text: '精准控火助温秀璐逼出竹叶青蛇毒！请前往成都【大慈寺 · 大雄正殿】向静虚师太禀明详情。',
          tone: 'success',
          logTag: '药堂救人',
        },
      ],
    },
    {
      id: 'em03_fan_stove_sincere',
      label: '【挽袖打井水、跪坐炉前猛扇蒲扇 · 任浓烟熏红眼眶亦不松手】',
      subLabel: '赤子热肠：苏梦清取素帕替你拭去额角烟灰，心生亲近（羁绊 +1）',
      tone: 'primary',
      effects: [
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'giveItem', itemId: 'ITM-MED-127', qty: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 10 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0330' }, delta: 10 },
        {
          type: 'setQuestStep',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'visit_dacisi_jingxu',
        },
        {
          type: 'toast',
          text: '汤成毒解！苏梦清轻拭你额头烟灰，邀你同往【大慈寺 · 大雄正殿】拜谒师叔静虚师太。',
          tone: 'success',
          logTag: '素帕拭灰',
        },
      ],
    },
  ],
}

const SCENE_EM_02_WANLI_BRIDGE_RAIN: StorySceneDef = {
  id: 'scene_em_02_wanli_bridge_rain',
  title: '第二幕 · 锦江烟雨共油伞',
  subtitle: '成都万里桥畔 · 飞燕初逢',
  illustrationUrl: '/assets/quests/emei_wanli_rain_umbrella.jpg',
  illustrationCaption: '成都万里桥头 · 锦江春雨油伞护药篓',
  mandatory: true,
  beats: [
    {
      speaker: SPEAKER_QC_BULLY,
      text: '“哟呵，哪儿钻出来的毛头白身？呼吸粗浮、下盘轻飘，连半丝内家气感都没有，也敢拿后背替这老梆子挡泥水？识相的跪下给爷磕个响头——”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '那青城剑徒蒲扇般的大手刚向你肩头抓落，漫天细雨中忽听“铮”地一声竹骨轻响！一道淡青残影掠过桥阶，未出鞘的乌木窄剑鞘如灵燕点水，只一挑一拨，两名青城恶徒便双双脚底打滑，“扑通”栽进桥下泥坑，狼狈万状地爬起鼠窜而去！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '原本砸在你背上的冰凉春雨忽然停了。你怔怔抬头，只见一柄桐油竹骨纸伞正稳稳斜撑在你头顶，晶莹雨珠顺着伞沿串成水帘；执伞的女子年约双十有八，淡青劲装束袖，眉目清飒如蜀山翠竹，正垂眸含笑望着半蹲在泥水里护着药篓的你。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0207' },
      text: '“明明自己半分内功也不会，倒敢往带剑的恶客跟前拦——我是该笑你傻呢，还是该敬你这一身干净胆气？我叫苏梦清，忝为峨眉派俗家弟子。”',
    },
  ],
  choices: [
    {
      id: 'em02_recall_jianmen_bond',
      label: '“苏女侠别来无恙！剑阁鸟道一别，不想竟在锦江春雨伞下重逢！”（剑阁前缘）',
      subLabel: '宿缘重逢：苏梦清惊喜展颜，两人默契倍增',
      tone: 'gold',
      condition: { type: 'flag', flag: 'emei_fate_jianmen', op: 'truthy', label: '剑阁前缘' },
      hideWhenUnavailable: true,
      effects: [
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 12 },
        {
          type: 'startQuest',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'go_baicao_clinic',
        },
        {
          type: 'toast',
          text: '剑阁故人锦江重逢！已开启峨眉入门长卷《锦水清音 · 金顶问心》，请护送老药农前往成都【西川百草药武堂 · 百草悬壶问诊正堂】。',
          tone: 'success',
          logTag: '蜀水重逢',
        },
      ],
    },
    {
      id: 'em02_graceful_charm_reply',
      label: '【拂去衣上雨水从容揖礼 · “药草关乎人命，岂因身无武功便袖手旁观？”】（颜值 ≥ 92）',
      subLabel: '清朗风仪：虽沾泥水难掩出尘气度，苏梦清眸光微亮（羁绊 +1）',
      tone: 'jade',
      condition: { type: 'talentAtLeast', key: '颜值', min: 92 },
      effects: [
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 12 },
        {
          type: 'startQuest',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'go_baicao_clinic',
        },
        {
          type: 'toast',
          text: '已开启峨眉入门长卷《锦水清音 · 金顶问心》！请随苏梦清护送伤者前往成都【西川百草药武堂 · 百草悬壶问诊正堂】。',
          tone: 'success',
          logTag: '锦江共伞',
        },
      ],
    },
    {
      id: 'em02_honest_check_farmer',
      label: '【拱手道谢苏女侠解围 · 先扶起发抖的周老药农赶往药堂救治】',
      subLabel: '仁厚务实：苏梦清将半边油伞倾向你，并肩护送老丈赴西川百草药武堂',
      tone: 'primary',
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0207' }, delta: 8 },
        {
          type: 'startQuest',
          questId: EMEI_ENTRY_QUEST_ID,
          stepId: 'go_baicao_clinic',
        },
        {
          type: 'toast',
          text: '已开启峨眉入门长卷《锦水清音 · 金顶问心》！请前往成都府【西川百草药武堂 · 百草悬壶问诊正堂】寻温秀璐或苏百草救治伤者。',
          tone: 'success',
          logTag: '锦江共伞',
        },
      ],
    },
  ],
}

const SCENE_EM_01_WANLI_TEAHOUSE: StorySceneDef = {
  id: 'scene_em_01_wanli_teahouse',
  title: '第一幕 · 万里桥头听蜀雨',
  subtitle: '皇祐二年 · 成都府锦江万里桥茶肆',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '皇祐二年早春，成都府细雨如酥，锦江碧水微涨。万里桥茶肆竹檐下铜壶滚沸，茶博士唱喏声与商贾清点交子铁钱的脆响交织成一片温软的蜀地烟火。你初涉江湖，体内尚无半分内功真气，正凭栏歇脚避雨。',
    },
    {
      speaker: SPEAKER_QC_BULLY,
      text: '（邻桌两名佩剑道装汉子压低嗓音狞笑）“嘿，峨眉山那帮吃斋师太还当自己是川西霸主呢！这批进献万年寺的川芎与雪胆草，今儿在万里桥头便叫它翻进泥沟里，看她们拿什么救山民寒瘴！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '话音未落，茶肆外石桥阶上忽传来一声苍老惊呼！只见那两名青城派外围剑徒故意并肩一撞，将一名背负大竹篓的白发老药农狠狠撞翻在湿滑青石上，上好的川芎灵草散落满地泥水，老药农捂着流血的手背挣扎不起！',
    },
    {
      speaker: SPEAKER_HERB_FARMER,
      text: '“使不得啊两位爷！这篓草药是送往大慈寺与峨眉万年寺救命的善药，踩烂了可叫山里害寒症的娃儿怎么活呀……”',
    },
  ],
  choices: [
    {
      id: 'em01_rush_shield',
      label: '【冒雨冲出茶檐 · 用身体护住老药农与散落的药篓！】',
      subLabel: '侠义当先：纵无半点武功在身，亦不忍见恶徒欺凌白发药农（侠义 +3）',
      tone: 'gold',
      effects: [
        { type: 'modifyChivalry', delta: 3, reason: '万里桥冒雨护药农' },
        { type: 'addFlagNumber', flag: 'emei_smq_bond', delta: 1 },
        { type: 'openScene', scene: SCENE_EM_02_WANLI_BRIDGE_RAIN },
      ],
    },
    {
      id: 'em01_calm_inspect',
      label: '【默记恶徒剑穗与靴底青城红泥 · 沉着上前扶起老丈收拢草药】',
      subLabel: '胆大心细：临乱不慌，先护伤者与灵草周全',
      tone: 'primary',
      effects: [
        {
          type: 'branch',
          condition: { type: 'talentAtLeast', key: '悟性', min: 88 },
          thenEffects: [{ type: 'addFlagNumber', flag: 'emei_aptitude_marks', delta: 1 }],
        },
        { type: 'openScene', scene: SCENE_EM_02_WANLI_BRIDGE_RAIN },
      ],
    },
    {
      id: 'em01_step_back_later',
      label: '【暂且退回茶檐下观望 · 此番机缘日后再议】',
      subLabel: '暂不开启峨眉入门任务（后续可随时在万里桥茶肆或找苏梦清/静虚师太重新触发）',
      tone: 'default',
      effects: [
        {
          type: 'toast',
          text: '你暂未插手桥头风波。日后若欲拜入峨眉派，可随时在【锦江万里桥茶肆】或向【苏梦清 / 静虚师太】开启此段蜀水奇缘。',
          tone: 'talk',
          logTag: '蜀雨擦肩',
        },
      ],
    },
  ],
}

/**
 * 若玩家未在成都开启剧情便直接登上峨眉山寻掌门/首座求拜师时的指引小幕
 */
const SCENE_EM_DIRECT_SUMMIT_GUIDE: StorySceneDef = {
  id: 'scene_em_direct_summit_guide',
  title: '山门指引 · 红尘先结善药缘',
  subtitle: '蜀中峨眉山 · 佛门择徒规矩',
  beats: [
    {
      speaker: { kind: 'interactedNpc' },
      text: '“阿弥陀佛。我峨眉派虽广开慈悲之门，兼收男女俗家侠士与清修弟子，却从不收未历红尘善恶的空谈之客。”',
    },
    {
      speaker: { kind: 'interactedNpc' },
      text: '“近日青城派在山下屡屡刁难进山药农，本派俗家首席【苏梦清】与【静虚师太】正在邻近【成都府 · 锦江万里桥茶肆】及【大慈寺】查访护药。你若真心向道，不妨先下山往成都万里桥走一遭，看你与我峨眉有无这一场烟雨善缘。”',
    },
  ],
  onFinishEffects: [
    {
      type: 'toast',
      text: '欲拜入峨眉派，请先下山前往邻近【成都府 · 锦江万里桥茶肆】结识俗家首席女侠【苏梦清】！',
      tone: 'talk',
      logTag: '峨眉指路',
    },
  ],
}

// ============================================================================
// 峨眉派入门剧情任务链声明导出
// ============================================================================

export const EMEI_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: EMEI_ENTRY_QUEST_ID,
    title: '锦水清音 · 金顶问心',
    category: 'sect_entry',
    factionId: 'SECT-07',
    regionId: 'emeishan',
    recommendedRealm: '不入流（零内功开局友好 · 男女主角全兼容）',
    maxOpponentRealm: '三流下品（友好切磋，胜败皆推进无卡关）',
    recommendedNote:
      '专为初涉江湖无内功少侠（男女皆宜，亦支持巴蜀百草药王门医徒带艺转投）打造的二十幕沉浸入门长卷。重体验、重剧情、重与俗家首席【苏梦清】的蜀道羁绊及三维十艺资质互动。',
    startHint:
      '无门无派（或隶属巴蜀百草药王门）时，前往【成都府 · 锦江万里桥茶肆】即可在春雨中偶遇峨眉俗家首席【苏梦清】开启剧情（提前赴剑门关见苏梦清更有隐藏前缘）。',
    startLocation: {
      regionId: 'chengdu',
      buildingId: 'cd_teahouse',
      customLabel: '成都府 · 锦江万里桥茶肆（春雨偶遇苏梦清）',
    },
    startCondition: EMEI_ELIGIBLE_SECT_CONDITION,
    summary:
      '皇祐二年春雨潇潇，身无半缕内功的你在成都万里桥头护住遭青城恶徒冲撞的老药农，得峨眉俗家首席女侠「蜀道飞燕」苏梦清撑伞解围。历经百草堂辨毒煎汤、大慈寺观画明心后，携静虚师太素笺与苏梦清结伴入峨眉山：于双桥清音智退青城截药恶客，在万年寺担泉抄经三日苦劳后终修成第一缕《峨眉吐纳术》丹田清气，复于洗象池澄月松涛下共观白猿折竹习得《分水峨眉刺》，最终冒雪登临万仞金顶破西夏暗哨、于七彩佛光中问心入派！',
    initialStepId: 'go_baicao_clinic',
    steps: {
      go_baicao_clinic: {
        id: 'go_baicao_clinic',
        title: '锦江共伞 · 百草救人',
        objective:
          '已在万里桥头得峨眉女侠【苏梦清】撑伞解围。请随她一同护送受伤的周老药农前往成都府【西川百草药武堂 · 百草悬壶问诊正堂】验伤解毒。',
        nextHint:
          '在【成都府】进入【西川百草药武堂】，点击【百草悬壶问诊正堂】与【温秀璐】或【苏百草】交谈。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'cd_baicao',
          spotId: 'cd_baicao_main',
        },
      },
      visit_dacisi_jingxu: {
        id: 'visit_dacisi_jingxu',
        title: '唐宋壁画 · 大慈呈情',
        objective:
          '药篓蛇毒已解！请随苏梦清前往成都府【大慈寺（唐宋壁画阁） · 大雄正殿】，向驻蓉首座【静虚师太】禀明青城派暗算药路之事。',
        nextHint: '在【成都府】进入【大慈寺（唐宋壁画阁）】，点击【大雄正殿 · 佛前蒲团】拜见【静虚师太】。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'cd_dacisi',
          spotId: 'cd_dacisi_main',
        },
      },
      climb_emei_foot: {
        id: 'climb_emei_foot',
        title: '麻鞋踏雨 · 奔赴峨眉',
        objective:
          '已获静虚师太保举素笺与苏梦清所赠【蜀道麻筋草鞋】。请出成都府西南行，前往【蜀中峨眉山】与先行探路的苏梦清会合。',
        nextHint: '在大地图行军前往邻近的【蜀中峨眉山】（踏入峨眉山境即可触发双桥清音风波）。',
        targetLocation: {
          regionId: 'emeishan',
          customLabel: '蜀中峨眉山 · 双桥清音山道',
        },
      },
      wannian_jingxuan_trial: {
        id: 'wannian_jingxuan_trial',
        title: '万年古刹 · 铁尼试心',
        objective:
          '双桥清音之围已解，执法首座「峨眉铁尼」【静玄师太】命你随苏梦清前往【万年古寺禅院 · 回风拂柳演剑方庭】听候三日筋骨心性考校。',
        nextHint: '在【蜀中峨眉山】进入【万年古寺禅院】，点击【回风拂柳演剑方庭】找【静玄师太】复命。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_wannian',
          spotId: 'em_wn_courtyard',
        },
      },
      lotus_pavilion_night: {
        id: 'lotus_pavilion_night',
        title: '白水荷池 · 吐纳筑基',
        objective:
          '三日挑水扫叶与抄经苦役圆满撑过！请移步万年古寺【白水荷池贝叶琴榭】与等候你的【苏梦清】夜话，并随静虚师太修习《峨眉吐纳术》筑基心法。',
        nextHint: '在【万年古寺禅院】点击【白水荷池贝叶琴榭】探查或与【柳莲玉】交谈触发夜话筑基。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_wannian',
          spotId: 'em_wn_lotus',
        },
      },
      go_xixiang_pond: {
        id: 'go_xixiang_pond',
        title: '洗象澄月 · 灵猿观剑',
        objective:
          '丹田已生第一缕《峨眉吐纳术》清气！请随苏梦清登临山腰【洗象池灵猴剑坪 · 灵猿戏剑苍松崖坪】，寻【唐月瑾】安抚受惊老白猿并月下悟刺。',
        nextHint: '在【蜀中峨眉山】进入【洗象池灵猴剑坪】，点击【灵猿戏剑苍松崖坪】与【唐月瑾】交谈。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_pond',
          spotId: 'em_pd_monkey',
        },
      },
      ascend_jinding_summit: {
        id: 'ascend_jinding_summit',
        title: '卧云松雪 · 金顶试锋',
        objective:
          '已于洗象池月下习得《分水峨眉刺》！请乘破晓前冒雪登临【峨眉金顶睹光台 · 卧云松雪演剑禅亭】，接受金顶护法【柳川】的临阵拆招检验。',
        nextHint: '在【蜀中峨眉山】进入【峨眉金顶睹光台】，点击【卧云松雪演剑禅亭】与【柳川】交谈。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_jinding',
          spotId: 'em_jd_pavilion',
        },
      },
      buddha_light_oath: {
        id: 'buddha_light_oath',
        title: '云海佛光 · 华藏归心',
        objective:
          '已揪出窥探金顶的西夏暗哨！朝阳初升，请移步【万仞云海佛光睹光台】或【华藏金顶普贤铜殿】拜谒掌门【云慧师太】，于普贤宝光中问心入派！',
        nextHint:
          '在【峨眉金顶睹光台】点击【万仞云海佛光睹光台】（或【华藏金顶普贤铜殿】找【云慧师太】）行拜师大礼。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_jinding',
          spotId: 'em_jd_hall',
        },
      },
    },

    locationTriggers: [
      // 1) 踏入成都府 · 锦江万里桥茶肆，首次自动邂逅春雨药篓风波
      {
        id: 'trg_emei_chengdu_teahouse_auto',
        regionId: 'chengdu',
        buildingId: 'cd_teahouse',
        onceFlag: 'emei_teahouse_first_seen',
        condition: EMEI_ELIGIBLE_SECT_CONDITION,
        effects: [{ type: 'openScene', scene: SCENE_EM_01_WANLI_TEAHOUSE }],
      },

      // 2) 携素笺踏入蜀中峨眉山全景层时，自动触发第六幕「双桥清音闻剑啸」
      {
        id: 'trg_emei_foot_shuangqiao_ambush',
        regionId: 'emeishan',
        condition: {
          type: 'questStatus',
          questId: EMEI_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'climb_emei_foot',
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_06_EMEI_FOOT_AMBUSH }],
      },
    ],

    spotActions: [
      // 若首次在万里桥茶肆选了「暂且退回茶檐观望」，可随时在茶肆雅座或临街望楼手动重启第一幕
      {
        id: 'spot_em_teahouse_restart_main',
        label: '凭栏听雨 · 插手万里桥头药农风波（开启峨眉入门长卷）',
        badge: '峨眉仙缘',
        subtitle: '春雨石桥偶遇峨眉俗家首席苏梦清',
        tone: 'gold',
        regionId: 'chengdu',
        buildingId: 'cd_teahouse',
        spotId: 'cd_teahouse_main',
        visibleWhen: EMEI_ELIGIBLE_SECT_CONDITION,
        effects: [{ type: 'openScene', scene: SCENE_EM_01_WANLI_TEAHOUSE }],
      },
      {
        id: 'spot_em_teahouse_restart_west',
        label: '临街望桥 · 救援受欺巴蜀老药农（开启峨眉入门长卷）',
        badge: '峨眉仙缘',
        subtitle: '春雨石桥偶遇峨眉俗家首席苏梦清',
        tone: 'gold',
        regionId: 'chengdu',
        buildingId: 'cd_teahouse',
        spotId: 'cd_teahouse_west',
        visibleWhen: EMEI_ELIGIBLE_SECT_CONDITION,
        effects: [{ type: 'openScene', scene: SCENE_EM_01_WANLI_TEAHOUSE }],
      },

      // 第十一幕：白水荷池贝叶琴榭直接触发与苏梦清夜话及吐纳筑基
      {
        id: 'spot_em_lotus_night_talk',
        label: '走入贝叶琴榭 · 与苏梦清荷池夜话并修习吐纳筑基',
        badge: '吐纳筑基',
        subtitle: '褪去凡胎浊息，凝炼第一缕峨眉清气',
        tone: 'gold',
        regionId: 'emeishan',
        buildingId: 'em_wannian',
        spotId: 'em_wn_lotus',
        visibleWhen: {
          type: 'questStatus',
          questId: EMEI_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'lotus_pavilion_night',
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_11_LOTUS_PAVILION_HEART }],
      },

      // 第十九幕：在万仞云海佛光睹光台亦可直接触发破晓睹光问心大典
      {
        id: 'spot_em_platform_buddha_light',
        label: '凭栏迎破晓朝阳 · 共睹万仞云海普贤佛光',
        badge: '金顶问心',
        subtitle: '云慧师太亲临睹光台三问本心，择脉拜入峨眉',
        tone: 'gold',
        regionId: 'emeishan',
        buildingId: 'em_jinding',
        spotId: 'em_jd_platform',
        visibleWhen: {
          type: 'questStatus',
          questId: EMEI_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'buddha_light_oath',
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_19_JINDING_BUDDHA_LIGHT }],
      },
    ],

    npcActions: [
      // 0a) 剑门关前缘彩蛋：未开卷前在剑阁栈道偶遇苏梦清（NPC-0207）
      {
        id: 'act_em_jianmen_prelude_smq',
        label: '凭栏问蜀道 · 结识峨眉飞燕苏梦清',
        badge: '剑阁前缘',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0207'] },
            EMEI_ELIGIBLE_SECT_CONDITION,
            { type: 'flag', flag: 'emei_fate_jianmen', op: 'falsy' },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_00_JIANMEN_PRELUDE }],
      },

      // 0b) 若未开卷直接找成都静虚师太/温秀璐，或直接上峨眉山找云慧/静玄/苏涵求道，给出贴心指路（成都大慈寺/百草堂可直接开启第一幕）
      {
        id: 'act_em_chengdu_manual_start',
        label: '请教峨眉善缘 · 往万里桥茶肆探查护药风波',
        badge: '峨眉仙缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0206', 'NPC-0330'] },
            EMEI_ELIGIBLE_SECT_CONDITION,
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_01_WANLI_TEAHOUSE }],
      },
      {
        id: 'act_em_summit_guide_to_chengdu',
        label: '叩山求道 · 请问拜入峨眉门墙之法',
        badge: '峨眉门规',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0128', 'NPC-0169', 'NPC-0582'] },
            EMEI_ELIGIBLE_SECT_CONDITION,
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_DIRECT_SUMMIT_GUIDE }],
      },

      // 第三幕：西川百草药武堂找温秀璐（NPC-0330）或药王苏百草（NPC-0316）救治周老药农
      {
        id: 'act_em_baicao_cure_farmer',
        label: '扶周老药农入堂 · 协力拔除竹叶青蛇毒',
        badge: '百草辨瘴',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0330', 'NPC-0316'] },
            {
              type: 'questStatus',
              questId: EMEI_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'go_baicao_clinic',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_03_BAICAO_CLINIC }],
      },

      // 第四～五幕：成都大慈寺正殿找静虚师太（NPC-0206）观壁画问心并领素笺
      {
        id: 'act_em_dacisi_jingxu_report',
        label: '禀报药篓蛇毒始末 · 观唐宋壁画问心',
        badge: '大慈托笺',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0206'] },
            {
              type: 'questStatus',
              questId: EMEI_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'visit_dacisi_jingxu',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_04_DACISI_FRESCO }],
      },

      // 第六幕兜底入口：若玩家已在峨眉山内处于 climb_emei_foot 阶段，找苏涵或静玄师太亦可触发双桥清音
      {
        id: 'act_em_foot_ambush_fallback',
        label: '驰援双桥清音 · 化解青城截药之围',
        badge: '清音破局',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0582', 'NPC-0169'] },
            {
              type: 'questStatus',
              questId: EMEI_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'climb_emei_foot',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_06_EMEI_FOOT_AMBUSH }],
      },

      // 第九～十幕：万年古寺回风拂柳演剑方庭找静玄师太（NPC-0169）领受三日苦役
      {
        id: 'act_em_wannian_jingxuan_chores',
        label: '呈递静虚师太素笺 · 领受万年寺三日考校',
        badge: '担泉抄经',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0169'] },
            {
              type: 'questStatus',
              questId: EMEI_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'wannian_jingxuan_trial',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_09_WANNIAN_TRIAL_ASSIGN }],
      },

      // 第十一～十三幕（NPC 入口同开）：白水荷池贝叶琴榭找柳莲玉（NPC-0361）亦可触发荷池夜话与吐纳筑基
      {
        id: 'act_em_lotus_liulianyu_trigger',
        label: '步入白水荷池琴榭 · 会合苏梦清夜话筑基',
        badge: '吐纳筑基',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0361'] },
            {
              type: 'questStatus',
              questId: EMEI_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'lotus_pavilion_night',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_11_LOTUS_PAVILION_HEART }],
      },

      // 第十四～十五幕：洗象池灵猿戏剑苍松崖坪找唐月瑾（NPC-0376）或周秀（NPC-0652）安抚白猿、月下悟刺
      {
        id: 'act_em_xixiang_monkey_moon',
        label: '安抚受惊通灵白猿 · 澄月松下随苏梦清悟刺',
        badge: '洗象澄月',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0376', 'NPC-0652', 'NPC-0691'] },
            {
              type: 'questStatus',
              questId: EMEI_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'go_xixiang_pond',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_14_XIXIANG_ARRIVAL }],
      },

      // 第十六～十八幕：金顶卧云松雪演剑禅亭找护法柳川（NPC-0340）拆招试新锋并揪出暗哨
      {
        id: 'act_em_jinding_liuchuan_spar',
        label: '踏雪入演剑禅亭 · 接受金顶护法柳川拆招检验',
        badge: '松雪试锋',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0340'] },
            {
              type: 'questStatus',
              questId: EMEI_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'ascend_jinding_summit',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_16_JINDING_SNOW_STEPS }],
      },

      // 第十九～二十幕：华藏金顶普贤铜殿找掌门云慧师太（NPC-0128）或睹光台贝凝音（NPC-0384）行拜师问心大典
      {
        id: 'act_em_jinding_yunhui_oath',
        label: '拜谒金顶神尼云慧师太 · 睹云海佛光问心入派',
        badge: '金顶问心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0128', 'NPC-0384'] },
            {
              type: 'questStatus',
              questId: EMEI_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'buddha_light_oath',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_EM_19_JINDING_BUDDHA_LIGHT }],
      },
    ],
  },
]
