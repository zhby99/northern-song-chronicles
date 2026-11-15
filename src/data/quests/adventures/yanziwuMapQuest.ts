import type { NodeNpc } from '../../../types/game'
import type { QuestDefinition, StorySceneDef } from '../../../types/quest'
import { DEFAULT_EQUIPPED_SLOTS } from '../../itemsDb'

const QUEST_ID = 'QST-ADV-YANZIWU-MAP'

/**
 * 第一战对手：铁掌帮分水暗哨 · 沙九江（三流上品 · 苏州虎丘试剑台）
 */
function buildTiezhangScoutNpc(): NodeNpc {
  return {
    id: 'CUSTOM-YZW-MAP-SHAJIUJIANG',
    name: '沙九江',
    title: '铁掌帮分水暗哨 · 截波手',
    realm: '三流上品',
    factionId: 'SECT-15',
    factionName: '铁掌帮江南暗舵',
    avatarUrl: '/assets/characters/templates/tpl_tiezhang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tiezhang_fb.jpg',
    stats: {
      hp: 460,
      mp: 240,
      agi: 54,
      res: 20,
      isBenchmark: false,
    },
    talents: { bone: 62, comprehension: 48, charm: 35 },
    fullLocationLabel: '苏州府 > 虎丘剑池 > 千人石试剑台与生公亭',
    equippedArts: {
      neigong: 'MA-229',
      qinggong: 'MA-157',
      move1: 'MA-236',
      move2: 'MA-186',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-229', level: 3, exp: 0 },
      { artId: 'MA-157', level: 3, exp: 0 },
      { artId: 'MA-236', level: 3, exp: 0 },
      { artId: 'MA-186', level: 3, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-084',
    },
    questBadgeLabel: '铁掌暗哨',
    talk: '“沈家书呆子倒也罢了，哪里冒出来的野路子少侠，敢坏我铁掌帮勘探太湖水桩的大事？吃某家一记劈碑手！”',
  }
}

/**
 * 第二战对手：铁掌帮江北巡江副舵主 · 盛黑风（二流下品 · 扬州淮南盐帮演武院）
 */
function buildTiezhangDeputyNpc(): NodeNpc {
  return {
    id: 'CUSTOM-YZW-MAP-SHENGHEIFENG',
    name: '盛黑风',
    title: '铁掌帮巡江副舵主 · 裂碑铁爪',
    realm: '二流下品',
    factionId: 'SECT-15',
    factionName: '铁掌帮江南暗舵',
    avatarUrl: '/assets/characters/templates/tpl_tiezhang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tiezhang_fb.jpg',
    stats: {
      hp: 710,
      mp: 380,
      agi: 61,
      res: 26,
      isBenchmark: false,
    },
    talents: { bone: 68, comprehension: 55, charm: 36 },
    fullLocationLabel: '扬州府 > 淮南盐帮总堂 > 盐帮十八般兵器演武院',
    equippedArts: {
      neigong: 'MA-229',
      qinggong: 'MA-120',
      move1: 'MA-107',
      move2: 'MA-236',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-229', level: 4, exp: 0 },
      { artId: 'MA-120', level: 4, exp: 0 },
      { artId: 'MA-107', level: 4, exp: 0 },
      { artId: 'MA-236', level: 4, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-069',
    },
    questBadgeLabel: '铁掌副舵',
    talk: '“顾长风老儿查了半个月都没摸清私盐船底的夹层，偏被你这小辈撞破！想拿《广陵漕渠水深卷》，先问过盛某这双铁砂掌！”',
  }
}

/**
 * 第三战终局首领：铁掌帮江南分水堂主 · 焦沧澜（二流中品 · 江宁石头城临江试剑台）
 */
function buildJiaoCanglanBossNpc(flawSpotted: boolean): NodeNpc {
  return {
    id: flawSpotted ? 'CUSTOM-YZW-MAP-JIAO-WEAK' : 'CUSTOM-YZW-MAP-JIAO-FULL',
    name: flawSpotted ? '焦沧澜（换气受制）' : '焦沧澜',
    title: '铁掌帮江南分水堂主 · 断浪铁掌',
    realm: '二流中品',
    factionId: 'SECT-15',
    factionName: '铁掌帮江南分舵',
    avatarUrl: '/assets/characters/templates/tpl_tiezhang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tiezhang_fb.jpg',
    stats: flawSpotted
      ? {
          hp: 840,
          mp: 440,
          agi: 64,
          res: 28,
          isBenchmark: false,
        }
      : {
          hp: 960,
          mp: 520,
          agi: 69,
          res: 32,
          isBenchmark: false,
        },
    talents: { bone: 74, comprehension: 64, charm: 38 },
    fullLocationLabel: '江宁府 > 石头城遗址（江南剑庐） > 虎踞赤壁临江试剑台',
    equippedArts: {
      neigong: 'MA-081',
      qinggong: 'MA-120',
      move1: 'MA-046',
      move2: 'MA-107',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-081', level: 5, exp: 0 },
      { artId: 'MA-120', level: 5, exp: 0 },
      { artId: 'MA-046', level: 4, exp: 0 },
      { artId: 'MA-107', level: 5, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-057',
    },
    questBadgeLabel: '分水堂主',
    talk: '“太湖三万六千顷烟波，凭什么只许姑苏慕容氏独占？只要老夫合齐三叠水图、拔去燕子坞外围七十二处梅花暗桩，八百里太湖便是我铁掌帮的囊中之物！”',
  }
}

// ============================================================================
// 二十五幕完整剧本：《烟波三叠 · 燕子坞水图》（逆序声明，杜绝 TDZ）
// ============================================================================

const SCENE_25_EPILOGUE_UNLOCK: StorySceneDef = {
  id: 'scene_yzw_map_25_epilogue_unlock',
  title: '第二十五幕 · 烟波浩渺开燕坞',
  subtitle: '苏州府 · 太湖烟波渡口锦帆画舫',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '舱内松烟墨香袅袅，沈括以紫毫小楷将最后一道菱花水位线与钟山星度校准合拢，在澄心堂纸左下角郑重题下“皇祐二年重校太湖烟波三叠全图”十二字。只见画卷之上，东西洞庭诸山如青螺浮浪，三十六条芦荡明渠与七十二处水底梅花桩阵以朱墨二色分列得纤毫毕现，昔日令人望而却步的百里迷雾，此刻终于化作一条清晰可循的碧波航道。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0247' },
      text: '（蒋平抚掌长笑，替少侠斟满一碗太湖白鱼羹与洞庭春绿蚁酒）“痛快！有了存中公子亲手合璧的这幅真图，太湖沿岸渔船商旅既可避开外围漩涡暗礁，寻常水匪若不知潮汐加减口诀，拿去反倒要撞碎船底。少侠横跨苏、扬、江宁三府，连破铁掌帮三道暗桩，这份胆识与脚力，蒋某佩服得五体投地！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0213' },
      text: '（包不同把折扇收拢在掌心轻轻一敲，嘴角虽还撇着，神色却郑重了几分）“非也，非也！包某可没说佩服，只是公子爷素来交游天下英雄，你既替江南水道除了焦沧澜这颗毒瘤，又未曾损我参合庄半分颜面，这幅《太湖燕子坞烟波水路舆图》归你执掌，倒也不算辱没了我姑苏慕容氏的门风！日后若乘舟入坞，听香水榭的清茶总有你一盏。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（双手接过装裱于湘妃竹轴中的舆图收入行囊，推开画舫雕窗远眺万顷烟波）“多谢蒋四爷、存中兄与包先生相助。自今日起，这八百里太湖烟波迷障，再也拦不住在下的孤帆轻舟了！”',
    },
  ],
  onFinishEffects: [
    { type: 'removeItem', itemId: 'ITM-MSC-023', qty: 1 },
    { type: 'giveItem', itemId: 'ITM-MSC-020', qty: 1 },
    { type: 'giveSilver', amount: 180, reason: '江南三府水道商帮与平江士绅酬谢盘缠' },
    { type: 'modifyRenown', delta: 45, reason: '勘定太湖三叠水图、扫清铁掌帮江南分水暗舵' },
    { type: 'modifyChivalry', delta: 25, reason: '护佑太湖渔商免遭暗礁覆舟之厄' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0247' }, delta: 25 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0063' }, delta: 20 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0213' }, delta: 15 },
    {
      type: 'completeQuest',
      questId: QUEST_ID,
      outcome: 'unlocked_yanziwu_map',
      combatExp: 320,
    },
    {
      type: 'toast',
      text: '奇遇功成！已获得秘境舆图《太湖燕子坞烟波水路舆图》，天下舆图【太湖燕子坞】航道正式解锁！',
      tone: 'success',
      logTag: '秘境解锁',
    },
  ],
}

const SCENE_24_CHART_SYNTHESIS: StorySceneDef = {
  id: 'scene_yzw_map_24_chart_synthesis',
  title: '第二十四幕 · 三叠合璧绘真经',
  subtitle: '苏州府 · 太湖烟波渡口锦帆画舫',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '画舫船舱四面竹帘低垂，案上并排摊开三件来之不易的信物：虎丘夺回的《太湖菱花铜水符》、扬州截获的《广陵漕渠水深卷》，以及自江宁石头城焦沧澜怀中追回的《金陵水脉星度卷》。沈括取出随身携带的铜规、矩尺与水罗盘，将铜符嵌于纸卷正中的菱形缺口之上。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0063' },
      text: '（沈括双目放光，指尖沿着三卷交汇处的细密刻线缓缓游走）“妙哉！昔年吴越水师大匠设计此图时，深谙‘分则俱盲、合则生明’之理——铜水符定七十二峰方位，广陵卷记四季涨落吃水尺寸，金陵卷则以北极出地度与朔望月相推算太湖风浪回流！三者若缺其一，纵是老艄公也要误入绝港；如今三叠合璧，连水底暗桩每隔几丈留有一道生门都一目了然！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0213' },
      text: '（包不同探头看了一眼，神色微变，随即干咳两声背过手去）“哼，非也！这不过是我参合庄外围三十六湾的通航水道罢了，内坞机枢早随节气更易。不过嘛……只要按此图行船，确实能稳稳当当穿过芦苇迷阵，直抵听香水榭与参合庄码头，再不必在湖心里喂鱼鳖。”',
    },
    {
      speaker: { kind: 'player' },
      text: '“存中兄以算学星度融通古图，方使这桩尘封数十年的江南水学奇珍重见天日。劳烦存中兄将三卷津要摹绘成一幅便携水路全图，至于原件铜符与旧帛，仍交由蒋四爷与包先生分掌封存，免得日后再惹宵小觊觎。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_25_EPILOGUE_UNLOCK }],
}

const SCENE_23_RETURN_SUZHOU_BOAT: StorySceneDef = {
  id: 'scene_yzw_map_23_return_suzhou_boat',
  title: '第二十三幕 · 锦帆重聚验三符',
  subtitle: '苏州府 · 太湖烟波渡口锦帆画舫',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '数日后，少侠顺江南运河东返平江姑苏城。太湖烟波渡口春雾初散，那艘熟悉的锦帆画舫正静静泊在镇湖石塔之畔。刚踏上跳板，便见翻江鼠蒋平、青年才俊沈括与姑苏慕容氏家臣包不同俱已在舱中久候。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0247' },
      text: '（蒋平迎上前拍了拍少侠肩头，满面喜色）“好小子！金陵与广陵两地的飞鸽传书昨夜便到了卢大哥与我手里！听说你在扬州盐帮演武院挫了盛黑风，又在石头城赤壁之上正面破了焦沧澜的毒砂铁掌，如今江淮水道上的铁掌帮暗哨已如惊弓之鸟，连夜撤回荆湖去了！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（自怀中郑重取出铜水符与中、下两卷水图，置于舱中紫檀案上）“幸不辱命。扬州、江宁两处暗桩俱已拔除，三叠水图碎片尽数在此，今日便可请存中兄与二位前辈共同核验。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_24_CHART_SYNTHESIS }],
}

const SCENE_22_FAREWELL_JIANGNING: StorySceneDef = {
  id: 'scene_yzw_map_22_farewell_jiangning',
  title: '第二十二幕 · 石城收卷返姑苏',
  subtitle: '江宁府 · 石头城遗址虎踞赤壁临江试剑台',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '江风吹散赤壁上的硝烟与铁砂腥气，秦淮词楼赶来的严离瑜与朱菊柔已率参合庄外围执事封锁了下山石径，将溃散的几名铁掌帮余党逐一拿下。叶孤鸿收剑入鞘，立于松崖高处向少侠遥遥颔首致意。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0268' },
      text: '（严离瑜双手抱拳，神色恭敬）“多谢少侠仗义出手！焦沧澜这贼厮在金陵暗伏数月，若非少侠今日在试剑台将他击溃，夺回这卷《金陵水脉星度卷》，只怕不出十日太湖便要生出大祸。我二人这便修书禀明包三先生，请他在苏州渡口画舫备席迎候少侠！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（展开油布小包核验无误，小心贴身收好）“上卷铜符、中卷水深、下卷星度俱已齐备。事不宜迟，我这便动身东返苏州太湖烟波渡口，将三叠水图彻底拼合！”',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'yzw_map_jiao_defeated', value: true },
    { type: 'giveCombatExp', amount: 180, reason: '石头城赤壁击败铁掌帮堂主焦沧澜' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'suzhou_boat_synthesize',
      silent: false,
    },
    {
      type: 'toast',
      text: '已夺回下卷《金陵水脉星度卷》！请返回【苏州府 · 太湖烟波渡口 · 通燕子坞锦帆画舫渡船】合璧成图。',
      tone: 'success',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_21_SHITOU_BOSS_AFTER: StorySceneDef = {
  id: 'scene_yzw_map_21_shitou_boss_after',
  title: '第二十一幕 · 赤壁折掌夺星卷',
  subtitle: '江宁府 · 石头城遗址虎踞赤壁临江试剑台',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '三十余合激斗，赤壁山崖青石被掌风劈出数道寸许深的焦黑掌印！焦沧澜久攻不下，焦躁间双掌猛提十成毒砂燥火，欲以一记“五指山压”硬震少侠心脉。少侠却凝神屏息，看准他旧年寒毒与燥火在膻中穴交冲的那半息凝滞，身随剑转斜欺而入，一记沉凝凌厉的破招重重击中其右胁期门穴！',
    },
    {
      speaker: {
        kind: 'custom',
        name: '焦沧澜',
        title: '铁掌帮江南分水堂主 · 断浪铁掌',
        factionName: '铁掌帮江南分舵',
        portraitUrl: '/assets/characters/templates/tpl_tiezhang_fb.jpg',
      },
      text: '（闷哼一声连退五步，足跟踏碎崖边碎石，一口淤血喷在江风之中，怀中油布紧裹的星度绢卷亦随之跌落）“好……好毒的眼力！你怎会瞧出老夫子午换气的门道？江南武林人才辈出，今日算我焦某栽了……撤！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '焦沧澜深知再留必死，借着江岸芦苇落差纵身跃下赤壁浅滩，乘一叶接应快舸仓皇向西逃窜。少侠并未穷追落水穷寇，俯身拾起那卷染着淡淡松香的《金陵水脉星度卷》，但见绢帛之上精细绘着二十八宿分野与太湖水口吐纳潮差。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_22_FAREWELL_JIANGNING }],
}

const SCENE_20_SHITOU_CLIFF_SHOWDOWN: StorySceneDef = {
  id: 'scene_yzw_map_20_shitou_cliff_showdown',
  title: '第二十幕 · 虎踞赤壁会焦堂',
  subtitle: '江宁府 · 石头城遗址虎踞赤壁临江试剑台',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '步出藏剑阁西折百步，便是悬立大江之上的虎踞赤壁试剑台。暮色苍茫，滚滚长江拍打着褚红色的石壁，卷起千堆雪浪。试剑台尽头，一名双臂粗壮如铁铸、鬓发微霜的黑袍老者正迎风而立，脚下躺着两具已被铁砂掌力震碎的石锁，正是铁掌帮江南分水堂主焦沧澜！',
    },
    {
      speaker: {
        kind: 'custom',
        name: '焦沧澜',
        title: '铁掌帮江南分水堂主 · 断浪铁掌',
        factionName: '铁掌帮江南分舵',
        portraitUrl: '/assets/characters/templates/tpl_tiezhang_fb.jpg',
      },
      text: '（缓缓转过身来，双掌摩擦发出金铁交鸣般的沙沙声响）“老夫在赤壁等了半日，原以为来的是参合庄那几个不成器的管事，不想竟是你这坏我苏州、扬州两桩好事的小辈！正好，你身上带着铜水符与广陵中卷，省得老夫再跑一趟姑苏——把东西交出来，给你留具全尸沉江！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（按兵刃踏前一步，衣袂在江风中猎猎作响）“焦堂主好大的口气！太湖商渔百姓的性命，岂容你们铁掌帮拿来铺路？想要水图，便拿真本事来取！”',
    },
  ],
  choices: [
    {
      id: 'yzw_fight_jiao_weakened',
      label: '依苏颂与叶孤鸿所授时机，直取焦沧澜换气破绽！',
      subLabel: '已勘破其寒火交冲破绽（焦沧澜战力受制为二流中品下段 · ⚠️ 战败将直接丧命！）',
      tone: 'jade',
      condition: { type: 'flag', flag: 'yzw_map_jiao_flaw_spotted', op: 'truthy' },
      hideWhenUnavailable: true,
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildJiaoCanglanBossNpc(true) },
          rule: 'duel',
          duelStakesTag: 'duel',
          forbidEscapeReason: '身后便是万丈赤壁绝崖，焦沧澜掌风已封死退路，唯有死战破敌！',
          deathTitle: '掌碎赤壁 · 魂沉大江',
          deathDetail:
            '石头城虎踞赤壁之上，你不敌铁掌帮江南分水堂主焦沧澜的毒砂烈掌，重伤坠入滚滚长江，三叠水图尽落贼手。',
          onWin: [{ type: 'openScene', scene: SCENE_21_SHITOU_BOSS_AFTER }],
        },
      ],
    },
    {
      id: 'yzw_fight_jiao_normal',
      label: '正面迎战铁掌帮分水堂主焦沧澜',
      subLabel: '二流中品巅峰硬仗（击败焦沧澜夺回下卷 · ⚠️ 战败将直接丧命！）',
      tone: 'danger',
      condition: { type: 'flag', flag: 'yzw_map_jiao_flaw_spotted', op: 'falsy' },
      hideWhenUnavailable: true,
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildJiaoCanglanBossNpc(false) },
          rule: 'duel',
          duelStakesTag: 'duel',
          forbidEscapeReason: '身后便是万丈赤壁绝崖，焦沧澜掌风已封死退路，唯有死战破敌！',
          deathTitle: '掌碎赤壁 · 魂沉大江',
          deathDetail:
            '石头城虎踞赤壁之上，你不敌铁掌帮江南分水堂主焦沧澜的毒砂烈掌，重伤坠入滚滚长江，三叠水图尽落贼手。',
          onWin: [{ type: 'openScene', scene: SCENE_21_SHITOU_BOSS_AFTER }],
        },
      ],
    },
  ],
}

const SCENE_19_SHITOU_VILLA_YE: StorySceneDef = {
  id: 'scene_yzw_map_19_shitou_villa_ye',
  title: '第十九幕 · 剑庐松风问孤鸿',
  subtitle: '江宁府 · 石头城遗址松竹江南剑庐藏剑阁',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '辞别栖霞山后，少侠循江岸西行登上石头城旧址。苍松翠竹掩映之间，一座清幽剑庐临崖而筑，檐下古剑悬列。隐世剑客“孤峰剑客”叶孤鸿正以白绢擦拭青锋，听闻江岸杀气渐近，抬眸望向少侠。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0155' },
      text: '（叶孤鸿剑眉微挑，清声道）“一炷香前，确有一名手掌赤黑、步履沉重如铁锚的老者带人闯上虎踞赤壁试剑台，借着江潮初涨的湿气逼毒调息。那人练的是荆湖铁掌帮‘毒砂百炼功’，双掌虽猛烈刚霸，却因早年水下受过太湖暗劲所伤，每逢催动劈空大招后，右胁期门穴必有一瞬回气不及。”',
    },
    {
      speaker: { kind: 'player' },
      text: '“多谢叶前辈指点迷津！苏大人先前在栖霞山亦曾推算出他借潮候压制寒毒之法，如今两相印证，晚辈心中已有定计。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0155' },
      text: '“去罢。剑庐不涉江湖帮派私怨，但铁掌帮若想在金陵江面上兴风作浪，叶某也乐见有人折一折他的狂焰。试剑台就在西崖百步之外，少侠先调匀内息再登台不迟。”',
    },
  ],
  onFinishEffects: [
    { type: 'healPlayer', hpPct: 100, mpPct: 100 },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'jiangning_shitou_cliff',
      silent: false,
    },
    {
      type: 'toast',
      text: '内息已调匀！请前往石头城【虎踞赤壁临江试剑台】迎战焦沧澜，夺回下卷水图！',
      tone: 'talk',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_18_QIXIA_SUSONG_CAL: StorySceneDef = {
  id: 'scene_yzw_map_18_qixia_susong_cal',
  title: '第十八幕 · 栖霞红枫推星度',
  subtitle: '江宁府 · 栖霞山古刹清溪红枫三论讲经亭',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '出江宁东北门行三十里，栖霞山千佛岩下溪流潺潺，讲经亭内书卷盈案。年方三十的馆阁才臣苏颂（字子容）正奉朝命巡阅江南东路历算刻漏，此刻正在亭中校准一具铜制浑仪简表。见少侠出示沈括亲笔荐书与太湖菱花铜水符，苏颂不禁抚须赞叹。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0062' },
      text: '“存中常与苏某通信论及浑天仪象与水工测量，不意今日竟得见这枚五代吴越遗留的菱花铜水符！少侠请看，铜符背面刻有‘斗牛女虚’四宿距度，正是与《金陵水脉星度卷》相配的钥匙。昨日傍晚曾有一名面带焦黄之色、掌心隐现铁砂黑气的江湖老者冒充盐商来借观《江南潮汐表》，被苏某看出破绽婉言谢绝。”',
    },
    {
      speaker: { kind: 'player' },
      text: '“那人定是铁掌帮江南堂主焦沧澜！不知苏大人观其行止与所问潮候，可有什么异状？”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0062' },
      text: '“此人专问大江晚潮平息与江风转北的时刻，且说话间右手频频按住胸口膻中。依医理与历算推之，他所练烈火铁砂掌与江南水湿相冲，唯有趁申酉之交江风燥烈时方能发挥十成掌力；若少侠能参透这潮候阴阳消长之数，交手时避其初锋、攻其换气，必可事半功倍！”',
    },
  ],
  choices: [
    {
      id: 'yzw_susong_insight_math',
      label: '以算学与悟性参校星度潮差，推演焦沧澜真气运转节点',
      subLabel: '要求【算术 ≥ 55】或【悟性 ≥ 68】· 识破焦沧澜换气破绽并提升算术修养',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需算术 ≥ 55 或 先天悟性 ≥ 68',
        conditions: [
          { type: 'skillAtLeast', key: '算术', min: 55 },
          { type: 'talentAtLeast', key: '悟性', min: 68 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'yzw_map_jiao_flaw_spotted', value: true },
        { type: 'modifySkill', key: '算术', delta: 3 },
        {
          type: 'setQuestStep',
          questId: QUEST_ID,
          stepId: 'jiangning_shitou_villa',
          silent: false,
        },
        {
          type: 'toast',
          text: '推演洞彻！已借星度潮差勘破焦沧澜毒砂功换气破绽，速赴石头城【松竹江南剑庐藏剑阁】会合叶孤鸿！',
          tone: 'success',
          logTag: '星度勘破',
        },
      ],
    },
    {
      id: 'yzw_susong_standard',
      label: '谨记苏大人所授潮候变化，即刻赶往石头城剑庐追缉',
      subLabel: '稳步推进 · 前往石头城遗址寻访叶孤鸿探明焦沧澜落脚处',
      tone: 'primary',
      effects: [
        {
          type: 'setQuestStep',
          questId: QUEST_ID,
          stepId: 'jiangning_shitou_villa',
          silent: false,
        },
        {
          type: 'toast',
          text: '已获苏颂指点方向！请前往江宁府【石头城遗址 · 松竹江南剑庐藏剑阁】寻访叶孤鸿。',
          tone: 'talk',
          logTag: '烟波三叠',
        },
      ],
    },
  ],
}

const SCENE_17_MINGDAO_ACADEMY_CLUE: StorySceneDef = {
  id: 'scene_yzw_map_17_mingdao_academy_clue',
  title: '第十七幕 · 钟山书院论水政',
  subtitle: '江宁府 · 钟山明道书院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '依严离瑜所指，少侠先至城东钟山脚下的明道书院。青松讲堂之外，年轻的临川才子王安石（字介甫）正与几名江宁士子纵论江南圩田水利与陂塘疏浚之策，言辞犀利、目光如炬。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0019' },
      text: '（王安石听罢少侠来意，放下手中《吴越备史》，慨然道）“昔年钱氏治两浙、李氏守金陵，皆重水官测绘之术。太湖连接三州七县，水路之通塞关乎东南百万石漕粮，岂可沦为江湖凶徒劫掠商旅之私器？少侠欲查那卷《金陵水脉星度卷》的天象水度，当今江南唯有一人最精此道——馆阁苏子容（苏颂）近日正在栖霞山千佛岩讲经亭考校古碑历象，持沈存中书信往谒，必有所获！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（拱手深揖）“介甫先生一言惊醒梦中人！晚辈这便赶往栖霞山清溪红枫三论讲经亭拜会苏子容大人。”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'jiangning_qixia_sutra',
      silent: false,
    },
    {
      type: 'toast',
      text: '王安石指明苏颂现居【栖霞山古刹 · 清溪红枫三论讲经亭】，速往拜会！',
      tone: 'talk',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_16_QINHUAI_RESCUE_TALK: StorySceneDef = {
  id: 'scene_yzw_map_16_qinhuai_rescue_talk',
  title: '第十六幕 · 词楼说明下卷踪',
  subtitle: '江宁府 · 十里秦淮画舫桃叶临水粉墙词楼',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0295' },
      text: '（朱菊柔包扎好左肩伤口，取出一封浸过蜡油的残破信笺递给少侠）“少侠有所不知，太湖三叠水图的下卷《金陵水脉星度卷》，原本秘藏在我姑苏慕容氏设于金陵的旧书庄内。前夜铁掌帮江南分水堂主焦沧澜亲率十余名好手夜袭书庄，严师兄与我拼死突围，虽毁去了入庄浮桥，那卷星度真本却被焦沧澜硬生生抢了去！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0268' },
      text: '“不幸中的万幸，那《金陵水脉星度卷》全以唐末五代的天文宿度隐语写成，焦沧澜空有蛮力却不识星算，一时半刻解不开暗语，这两日正四处派人在金陵城内外搜寻懂水利历算的名儒，并扬言要在石头城赤壁临江试剑台聚齐手下船队，顺江东下直扑太湖！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“原来如此！焦沧澜既在金陵寻访懂水利历算之人，必定会留下蛛丝马迹。二位且在词楼安心养伤，我先去钟山明道书院向熟悉金陵士林的学者打探消息，再赴石头城会一会这位铁掌堂主！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'jiangning_academy',
      silent: false,
    },
    {
      type: 'toast',
      text: '获悉下卷已被焦沧澜夺走！请先赴【江宁府 · 钟山明道书院】查访金陵通晓历算水利之名家。',
      tone: 'talk',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_15_ARRIVE_JIANGNING_QINHUAI: StorySceneDef = {
  id: 'scene_yzw_map_15_arrive_jiangning_qinhuai',
  title: '第十五幕 · 秦淮粉墙遇旧盟',
  subtitle: '江宁府 · 十里秦淮画舫桃叶临水粉墙词楼',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '溯长江西南行抵六朝古都江宁府。十里秦淮柳色如烟，朱雀桥边浆声灯影初上，然而桃叶渡畔那座素来雅致的临水粉墙词楼却门窗紧闭，廊柱上赫然留着两道焦黑的铁砂掌印！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠推门步入内堂，只见姑苏慕容氏驻金陵外事执事“伏虎郎”严离瑜与“快剑仙”朱菊柔正持剑戒备，见到少侠出示蒋平信物与太湖菱花铜水符，二人紧绷的神色方才骤然一松。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0268' },
      text: '（严离瑜长舒一口浊气，收剑入鞘）“原来是苏州渡口包三先生与蒋四爷托付的少侠！来得太及时了，我们师兄妹二人被铁掌帮的暗桩围困在秦淮河畔整整两日，连派出去报信的趟子手都被截了回来！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_16_QINHUAI_RESCUE_TALK }],
}

const SCENE_14_YANGZHOU_DEPART_WEST: StorySceneDef = {
  id: 'scene_yzw_map_14_yangzhou_depart_west',
  title: '第十四幕 · 漕渠得卷指金陵',
  subtitle: '扬州府 · 淮南盐帮总堂十八般兵器演武院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '顾长风命盐帮弟子将盛黑风及几名私盐内鬼捆缚送交江淮漕帮发落，少侠则展开自暗匣中取出的那卷黄绫水图——正是三叠水图之中的《广陵漕渠水深卷》！图卷背面还夹着半页墨迹未干的密令，上书“速携中卷溯江赴江宁石头城，与焦堂主所夺金陵星度下卷合流”。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0224' },
      text: '（顾长风神色凝重地看完密令）“焦沧澜！那是铁掌帮坐镇江南水道的分水堂主，一手毒砂铁掌在二流高手中也是凶名赫赫的人物。没想到他本人竟亲自去了江宁府（金陵）抢夺下卷！少侠，秦淮河桃叶词楼那边有姑苏慕容氏的外庄耳目，你西赴江宁后不妨先去那里打探虚实！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（将《广陵漕渠水深卷》妥善收好，抱拳一礼）“多谢顾总堂主相助！晚辈这便西渡大江赶赴江宁府，绝不让焦沧澜集齐水图祸害太湖！”',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'yzw_map_middle_chart_got', value: true },
    { type: 'giveSilver', amount: 45, reason: '淮南盐帮总堂酬谢揪出私盐内鬼' },
    { type: 'giveCombatExp', amount: 120, reason: '扬州盐帮演武院击败盛黑风' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'jiangning_qinhuai',
      silent: false,
    },
    {
      type: 'toast',
      text: '已夺回中卷《广陵漕渠水深卷》！请西赴【江宁府 · 十里秦淮画舫 · 桃叶临水粉墙词楼】追查下卷下落。',
      tone: 'success',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_13_SALT_ARENA_BATTLE: StorySceneDef = {
  id: 'scene_yzw_map_13_salt_arena_battle',
  title: '第十三幕 · 演武院中破铁爪',
  subtitle: '扬州府 · 淮南盐帮总堂十八般兵器演武院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '顾长风闻报勃然大怒，当即引少侠穿过雪袋堆积如山的官盐栈房，直趋后方十八般兵器演武院。院角石亭下，一名赤膊披着狼皮坎肩、双手戴着精铁护腕的魁梧汉子正把一口熟铜箱往包裹里塞，正是铁掌帮巡江副舵主“裂碑铁爪”盛黑风！旁边站着的铁掌帮旧客雷毅洲见状脸色微变，缩手退到兵器架后不敢插手。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '盛黑风',
        title: '铁掌帮巡江副舵主 · 裂碑铁爪',
        factionName: '铁掌帮江南暗舵',
        portraitUrl: '/assets/characters/templates/tpl_tiezhang_fb.jpg',
      },
      text: '（狞笑一声踢翻身前石凳，双掌铁环铮然作响）“姓顾的老儿，既然被你们撞见，盛某也不装什么盐客了！这卷《广陵漕渠水深卷》焦堂主点名要拿去金陵合图，谁敢拦路，盛某便撕碎谁的琵琶骨！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“顾总堂主请替我压住阵脚，免得其余党羽趁乱焚毁水图——这厮便交由在下料理！”',
    },
  ],
  choices: [
    {
      id: 'yzw_fight_shengheifeng',
      label: '踏入演武院，迎战铁掌副舵主盛黑风',
      subLabel: '二流下品硬仗（击败盛黑风夺回中卷水图 · ⚠️ 战败将直接丧命！）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildTiezhangDeputyNpc() },
          rule: 'duel',
          forbidEscapeReason: '盛黑风已将《广陵漕渠水深卷》扣在怀中，一旦退避必被其携卷遁入运河！',
          deathTitle: '命殒广陵 · 铁爪裂心',
          deathDetail:
            '扬州淮南盐帮演武院内，你被铁掌帮巡江副舵主盛黑风的劈空掌与铁爪重创心脉，倒在十八般兵器架下。',
          onWin: [{ type: 'openScene', scene: SCENE_14_YANGZHOU_DEPART_WEST }],
        },
      ],
    },
  ],
}

const SCENE_12_SALT_HALL_GU: StorySceneDef = {
  id: 'scene_yzw_map_12_salt_hall_gu',
  title: '第十二幕 · 聚义堂前揭盐鬼',
  subtitle: '扬州府 · 淮南盐帮总堂议事聚义堂',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '循着二十四桥所得“丙字盐引”线索，少侠快步赶至城东淮南盐帮总堂。议事聚义堂内檀香袅袅，“淮南盐王”顾长风正对着一叠亏空的官盐水程册大发雷霆，听少侠道破丙字三号乌篷盐船底舱藏有铁掌帮私货与被盗水图，不由拍案而起！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0224' },
      text: '“好哇！难怪这个月运往瓜洲渡的丙字船吃水比往常深了三寸，老夫还当是春雨受潮，原来是外头混进来的铁掌帮盛黑风买通了栈房管事，借我淮盐官引暗运水桩火器！少侠且随我来，那盛黑风此刻正在后头演武院借口比试武艺弹压脚夫！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“事不宜迟，莫让他听见风声毁去图卷，请顾总堂主引路！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'yangzhou_salt_arena',
      silent: false,
    },
    {
      type: 'toast',
      text: '内鬼已锁定！请即刻移步盐帮总堂后院【盐帮十八般兵器演武院】擒拿盛黑风！',
      tone: 'talk',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_11_24BRIDGE_CIPHER: StorySceneDef = {
  id: 'scene_yzw_map_11_24bridge_cipher',
  title: '第十一幕 · 二十四桥参词隐',
  subtitle: '扬州府 · 二十四桥明月坊平山清韵琴词水阁',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '黄昏时分，扬州二十四桥明月渐生，画舫红药夹岸飘香。少侠步入平山清韵琴词水阁，只见逍遥派“琴癫”康广陵正在调弄焦尾古琴，而临窗席间，白衣词人柳永（字耆卿）正自画舫登阁小酌，随手把玩着一张酒保拾来的盐商行酒令笺。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0057' },
      text: '（柳永微醺抚掌笑道）“奇哉怪哉，方才虹桥那桌荆湖口音的粗豪汉子，嘴里哼的明明不是咱们淮南新填的《望海潮》，倒把‘玉人何处教吹箫’改成了‘丙三雪袋压船腰，子夜开舱过石桥’——这词格半点不通，倒像是个暗记！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0171' },
      text: '（康广陵指尖在琴徽上一抹，冷笑道）“柳屯田只知风月，老夫却听得出他们击节拍桌的轻重缓急，乃是江湖上水路分赃的‘梅花数’。少侠若通音律或词牌平仄，一推便知那批私货藏在淮南盐帮哪一字号的栈船里。”',
    },
  ],
  choices: [
    {
      id: 'yzw_24bridge_art_check',
      label: '借诗词平仄与琴音节拍，当场破译行酒令中的船号暗码',
      subLabel: '要求【诗词 ≥ 50】或【琴 ≥ 50】或【辩才 ≥ 55】· 精准锁定丙字三号盐栈并获名士赞赏',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需诗词 ≥ 50、琴 ≥ 50 或 辩才 ≥ 55',
        conditions: [
          { type: 'skillAtLeast', key: '诗词', min: 50 },
          { type: 'skillAtLeast', key: '琴', min: 50 },
          { type: 'skillAtLeast', key: '辩才', min: 55 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '诗词', delta: 2 },
        { type: 'modifyRenown', delta: 10, reason: '二十四桥琴词水阁破译水路暗令' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0057' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0171' }, delta: 15 },
        {
          type: 'setQuestStep',
          questId: QUEST_ID,
          stepId: 'yangzhou_salt_hall',
          silent: false,
        },
        {
          type: 'toast',
          text: '妙解词隐！确认水图藏于淮南盐帮“丙字三号”盐船，速赴【淮南盐帮总堂 · 两淮盐商议事聚义堂】知会顾长风！',
          tone: 'success',
          logTag: '明月破隐',
        },
      ],
    },
    {
      id: 'yzw_24bridge_standard_follow',
      label: '记下“丙三雪袋”四字口风，请酒保指认那伙汉子的去向',
      subLabel: '稳妥盘查 · 顺藤摸瓜锁定淮南盐帮总堂议事聚义堂',
      tone: 'primary',
      effects: [
        {
          type: 'setQuestStep',
          questId: QUEST_ID,
          stepId: 'yangzhou_salt_hall',
          silent: false,
        },
        {
          type: 'toast',
          text: '已查明“丙三雪袋”指向淮南盐帮官栈！请前往【淮南盐帮总堂 · 两淮盐商议事聚义堂】拜会顾长风。',
          tone: 'talk',
          logTag: '烟波三叠',
        },
      ],
    },
  ],
}

const SCENE_10_CHAOGUAN_SHIP_LI: StorySceneDef = {
  id: 'scene_yzw_map_10_chaoguan_ship_li',
  title: '第十幕 · 总舵楼船问龙王',
  subtitle: '扬州府 · 运河钞关江淮漕帮总舵楼船',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '登上停泊于运河主航道中央的三层总舵楼船，旌旗迎风猎猎，江淮漕帮帮主“翻江龙王”厉沧海正披挂劲装巡视水手操演分水大枪。见卢方引少侠登船，厉沧海洪声大笑，当即命亲信捧出近日截获的江淮异常水情簿。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0146' },
      text: '“卢大侠的朋友便是我江淮漕帮的贵客！实不相瞒，五日前确有一艘自苏州北上的快船夜闯运河石埭水闸，伤了我两名巡闸弟子。我派人追查时，那伙贼人竟弃了快船，把一只装有前朝水工图籍的熟铜扁匣混进了城中盐商的车队！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“混入盐商车队？扬州盐商往来如织，不知厉帮主可查出他们是在何处交接暗语？”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0146' },
      text: '“铁掌帮有个叫熊威松的汉江劫运头领，这两日频频在二十四桥明月坊一带出没，与城中私盐贩子借听曲填词暗通款曲。少侠不妨先去【二十四桥明月坊 · 平山清韵琴词水阁】探听他们交接的船号，查实后再去淮南盐帮总堂找我老兄弟顾长风拿人！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'yangzhou_24bridge',
      silent: false,
    },
    {
      type: 'toast',
      text: '厉沧海指明线索在【扬州府 · 二十四桥明月坊 · 平山清韵琴词水阁】，速往探查接头暗码！',
      tone: 'talk',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_09_CHAOGUAN_LUFANG: StorySceneDef = {
  id: 'scene_yzw_map_09_chaoguan_lufang',
  title: '第九幕 · 钞关义兄叙鼠义',
  subtitle: '扬州府 · 运河钞关户部钞关算赋官厅',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0244' },
      text: '（卢方拆阅蒋平火漆短笺，又细看那枚太湖菱花铜水符，浓眉猛地一轩）“原来四弟在太湖被这群荆湖来的铁掌恶徒绊住了手脚！这《太湖三叠烟波图》的广陵中卷，当年本是寄存在扬州河道衙门旧库里的漕渠水深底本，上月旧库走水，竟真教这帮贼人浑水摸鱼盗了出去！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“卢大爷久镇运河钞关，往来船只皆需过关算赋，贼人若想将中卷运出扬州，定然逃不过钞关与江淮漕帮的法眼。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0244' },
      text: '“少侠说到了点子上！钞关紧邻江淮漕帮总舵楼船，帮主‘翻江龙王’厉沧海昨日才向卢某提起，有几艘挂着荆湖商旗的乌篷船行迹鬼祟。来，卢某这便修书一封，请你直接登外头总舵楼船面见厉帮主！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'yangzhou_chaoguan_ship',
      silent: false,
    },
    {
      type: 'toast',
      text: '请移步钞关外水【江淮漕帮总舵楼船】拜会帮主厉沧海！',
      tone: 'talk',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_08_ARRIVE_YANGZHOU_CHAOGUAN: StorySceneDef = {
  id: 'scene_yzw_map_08_arrive_yangzhou_chaoguan',
  title: '第八幕 · 北渡大江叩钞关',
  subtitle: '扬州府 · 运河钞关户部钞关算赋官厅',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '辞别烟雨姑苏，少侠自润州瓜洲渡北过长江，踏入“淮左名都”扬州府。官河两岸帆樯如林，东南六路漕粮百货尽汇于此，运河钞关石埭水闸前号子声震天动地。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '步入户部钞关算赋官厅偏厢，只见一位紫膛面皮、气度宽厚沉稳的长者正在核验过闸船引，正是陷空岛五义之首、“钻天鼠”卢方。少侠上前拱手，呈上四爷蒋平在苏州亲笔所写的书信。',
    },
    {
      speaker: { kind: 'player' },
      text: '“晚辈自苏州太湖渡口而来，奉翻江鼠蒋四爷书信，特来向卢大爷请教运河截查铁掌帮水图之事。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_09_CHAOGUAN_LUFANG }],
}

const SCENE_07_SUZHOU_DEPART_NORTH: StorySceneDef = {
  id: 'scene_yzw_map_07_suzhou_depart_north',
  title: '第七幕 · 存中辨符定北程',
  subtitle: '苏州府 · 虎丘剑池千人石试剑台与生公亭',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '待沙九江狼狈逃下虎丘山道，生公亭中避让的青年才俊沈括方才整衣走出。他拾起石案上那枚沉甸甸的八瓣菱花青铜水符，对着日光细细端详符背微雕的经纬刻度与山峰缩影，眼中满是惊叹之色。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0063' },
      text: '“少侠好俊的功夫！此物确是五代吴越水丘公所铸的《太湖菱花铜水符》，乃是三叠水图中的‘上叠总纲’。只是光有此符，仅知七十二峰罗盘向位，尚缺记载四季吃水浅深的《广陵漕渠水深卷》与校正朔望回流的《金陵水脉星度卷》，若强行入湖，船至半途仍要触礁搁浅。”',
    },
    {
      speaker: { kind: 'player' },
      text: '“方才那铁掌暗哨沙九江招认，中卷已被他同伙携往江北扬州府私盐水路。存中兄博闻强识，且先回太湖渡口与蒋四爷等候佳音，在下即刻北上扬州运河钞关，寻钻天鼠卢大爷截住中卷！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0063' },
      text: '“善！沈某这便修一封荐书交予少侠收好——若日后追查至江宁府涉及天文水度，还可持此书去寻我挚友苏子容（苏颂）。一路保重！”',
    },
  ],
  onFinishEffects: [
    { type: 'giveItem', itemId: 'ITM-MSC-023', qty: 1 },
    { type: 'giveSilver', amount: 25, reason: '缴获铁掌帮暗哨沙九江随身银袋' },
    { type: 'giveCombatExp', amount: 85, reason: '虎丘试剑台击败铁掌暗哨' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'yangzhou_chaoguan_lu',
      silent: false,
    },
    {
      type: 'toast',
      text: '已夺得上叠信物《太湖菱花铜水符》！请北上前往【扬州府 · 运河钞关 · 户部钞关算赋官厅】拜会钻天鼠卢方。',
      tone: 'success',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_06_HUQIU_SCOUT_AFTER: StorySceneDef = {
  id: 'scene_yzw_map_06_huqiu_scout_after',
  title: '第六幕 · 试剑石畔夺铜符',
  subtitle: '苏州府 · 虎丘剑池千人石试剑台与生公亭',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '十余合交锋，沙九江的粗练铁砂掌虽带着几分腥热劲风，却被少侠借着千人石高低错落的岩势步步紧逼，一招精准凌厉的切腕震肩，打得他虎口崩裂，怀中那枚以油绢包裹的八瓣菱花铜符“当啷”一声跌落在试剑石缝旁！',
    },
    {
      speaker: {
        kind: 'custom',
        name: '沙九江',
        title: '铁掌帮分水暗哨 · 截波手',
        factionName: '铁掌帮江南暗舵',
        portraitUrl: '/assets/characters/templates/tpl_tiezhang_fb.jpg',
      },
      text: '（捂着剧痛的右腕连退数步，色厉内荏地叫道）“好狠的小子！就算你抢回这枚铜水符也休想进燕子坞——中卷《广陵漕渠水深卷》三天前便由盛副舵主带过长江运去扬州府了，我们焦堂主更亲自坐镇江宁府搜罗下卷！你们等着瞧罢！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '沙九江见亭外已有吴门武馆弟子闻声赶来，不敢恋战，抓起一把石灰扬向半空，翻过石栏顺着后山竹林鼠窜而去。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_07_SUZHOU_DEPART_NORTH }],
}

const SCENE_05_HUQIU_SHENKUO_AMBUSH: StorySceneDef = {
  id: 'scene_yzw_map_05_huqiu_shenkuo_ambush',
  title: '第五幕 · 千人石上截黑手',
  subtitle: '苏州府 · 虎丘剑池千人石试剑台与生公亭',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '少侠疾步赶至虎丘山半腰的千人石试剑台。但见苍松掩映的生公亭内，年仅二十岁的吴郡才子沈括（字存中）正手持竹尺罗盘据案争辩，而一名双掌乌黑、眼神凶戾的劲装汉子已一把掀翻石凳，伸手便要强夺案上那枚刚从寒山寺转拓核验的青铜水符！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0063' },
      text: '（沈括护住图纸后退半步，朗声喝道）“光天化日之下，平江名胜岂容尔等强抢前贤水工遗物！这枚铜水符关乎太湖百里航道安危，沈某断不会交予来历不明之徒！”',
    },
    {
      speaker: {
        kind: 'custom',
        name: '沙九江',
        title: '铁掌帮分水暗哨 · 截波手',
        factionName: '铁掌帮江南暗舵',
        portraitUrl: '/assets/characters/templates/tpl_tiezhang_fb.jpg',
      },
      text: '“呸！酸书生敬酒不吃吃罚酒，老子昨晚在寒山寺钟楼漏了真符，正愁没处找，偏巧你自己摆在石亭里测什么子午线——拿命来！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（飞身掠入生公亭前，横身挡在沈括身前震开敌掌）“存中兄退后！铁掌帮的宵小，也敢在姑苏城外撒野？”',
    },
  ],
  choices: [
    {
      id: 'yzw_fight_shajiujiang',
      label: '拔刃出手，迎战铁掌暗哨沙九江',
      subLabel: '三流上品初战（击败沙九江护住铜水符 · ⚠️ 战败将直接丧命！）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildTiezhangScoutNpc() },
          rule: 'duel',
          forbidEscapeReason: '沙九江掌风已扑向手无缚鸡之力的沈括，断不可退避半步！',
          deathTitle: '血溅剑池 · 铜符蒙尘',
          deathDetail:
            '苏州虎丘千人石试剑台前，你不敌铁掌帮暗哨沙九江的毒辣铁砂掌，命丧生公亭下，太湖铜水符亦被强贼夺走。',
          onWin: [{ type: 'openScene', scene: SCENE_06_HUQIU_SCOUT_AFTER }],
        },
      ],
    },
  ],
}

const SCENE_04_HANSHAN_BELL_TRACE: StorySceneDef = {
  id: 'scene_yzw_map_04_hanshan_bell_trace',
  title: '第四幕 · 寒山古钟辨砂痕',
  subtitle: '苏州府 · 枫桥寒山寺夜半钟声古钟楼',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '顺着枫桥水巷来到千年古刹寒山寺，大雄宝殿住持天衣义怀禅师正命沙弥清扫古钟楼洒落的香灰。少侠登上夜半钟声古钟楼二层，果见青铜巨钟内壁的横梁暗格已被利刃撬开，木屑间残留着几撮带着硫磺铁腥味的黑砂！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0099' },
      text: '（义怀禅师合十轻叹）“阿弥陀佛。三十年前平江水官与参合庄老庄主为防太湖水图落入巨寇之手，曾将上叠‘菱花铜水符’寄存于敝寺古钟顶梁。幸而三日前钱塘沈氏才俊沈存中（沈括）来寺中访古考校《吴中水利记》，老衲见暗格木榫松动，便先将铜符真品借予存中居士带去虎丘试剑台拓印存档，昨夜窃贼撬走的只是一只空匣。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（拈起梁上黑砂一嗅，神色骤凛）“这是荆湖铁掌帮炒炼铁砂掌所用的乌金毒砂！贼人昨夜扑了个空，必不会善罢甘休，此刻沈存中公子在虎丘剑池只怕危在旦夕！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0099' },
      text: '“施主仁勇，沈居士乃东南百年难遇的奇才，还望施主速赴【虎丘剑池 · 千人石试剑台与生公亭】援手！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'suzhou_huqiu_stone',
      silent: false,
    },
    {
      type: 'toast',
      text: '惊悉铁掌帮贼人正追踪铜水符真品！速赴【苏州府 · 虎丘剑池 · 千人石试剑台与生公亭】救援沈括！',
      tone: 'warn',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_03_SUZHOU_TAVERN_RUMOR: StorySceneDef = {
  id: 'scene_yzw_map_03_suzhou_tavern_rumor',
  title: '第三幕 · 临河酒肆听夜橹',
  subtitle: '苏州府 · 姑苏临河酒楼',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '离开烟波渡口入城，姑苏临河酒楼内评弹软语伴着碧螺春茶香。少侠拣了副临水座头点上一壶黄酒，向往来船家与跑堂酒保打听近日太湖水路与外乡武人的动静。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '老船家周艄公',
        title: '胥门外运河老船户',
        factionName: '平江民船',
        portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
      },
      text: '（压低嗓门往窗外瞥了一眼）“客官可是问到点子上了！这半个月里，城西枫桥湾子夜里常有几条吃水极深、船头涂着黑漆铁掌印记的快船出没。前儿半夜寒山寺钟声忽然乱响了三下，老汉撑船经过江枫桥，亲眼瞧见两个手掌乌黑的汉子翻出寒山寺钟楼院墙，嘴里还骂骂咧咧说什么‘铜符怎不在暗格里，莫非叫那姓沈的书生借走了’！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（心中一动，留下两钱碎银茶资）“黑漆铁掌印记、寒山寺古钟楼暗格……看来蒋四爷所托的‘三叠水图’第一桩线索，便在城西枫桥寒山寺中！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'suzhou_hanshan_bell',
      silent: false,
    },
    {
      type: 'toast',
      text: '探得黑掌贼人曾夜闯寒山寺！请前往【苏州府 · 枫桥寒山寺 · 夜半钟声古钟楼】查验暗格。',
      tone: 'talk',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_02_JIANGPING_ENTRUST: StorySceneDef = {
  id: 'scene_yzw_map_02_jiangping_entrust',
  title: '第二幕 · 翻江义士话三叠',
  subtitle: '苏州府 · 太湖烟波渡口木栈长埠',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0247' },
      text: '（包不同拂袖登回画舫后，蒋平将少侠引至镇湖石塔背风处，压低声音叹道）“少侠莫怪包老三嘴硬，这回太湖水路吃紧，实是外头闯进了一伙过江强龙！昔年五代吴越国水师为护洞庭东西山与燕子坞内港，布下七十二处水底梅花桩与三十六道迷魂芦荡，只留一幅《太湖三叠烟波图》记载生门水道。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0247' },
      text: '“为防此图落入湖匪之手，前人将其拆作三份：上叠‘菱花铜水符’留在苏州名刹，中叠‘广陵漕渠水深卷’存底扬州钞关旧库，下叠‘金陵水脉星度卷’则归江宁书庄保管。谁知近来荆湖铁掌帮野心勃勃，竟派出江南分水堂精锐分赴苏州、扬州、江宁三府强夺三叠残图，妄图拔掉暗桩、独霸太湖水路！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“原来如此！若叫铁掌帮集齐三叠水图，不仅燕子坞门户洞开，往来太湖的千万渔商更要沦为鱼肉。蒋四爷既有侠心，晚辈愿走一趟苏、扬、江宁三府，将三叠水图追回拼合！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0247' },
      text: '（蒋平大喜，取出一封致扬州大哥卢方的亲笔短笺递来）“好少侠！蒋某须留在太湖渡口盯着湖面水哨，不便远行。你可先去城中【姑苏临河酒楼】向夜行船户打听苏州上叠铜符的异动，随后持我书信串联扬州、江宁。待三叠齐聚，我请吴郡通晓水工算学的沈存中公子与包不同一并为你摹绘全图，助你随时畅行燕子坞！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'startQuest',
      questId: QUEST_ID,
      stepId: 'suzhou_tavern_rumor',
      silent: false,
    },
    {
      type: 'toast',
      text: '已接下江南三府奇遇《烟波三叠 · 燕子坞水图》！请先赴【苏州府 · 姑苏临河酒楼】打探水匪动向。',
      tone: 'success',
      logTag: '烟波三叠',
    },
  ],
}

const SCENE_01_TAIHU_MIST_DISPUTE: StorySceneDef = {
  id: 'scene_yzw_map_01_taihu_mist_dispute',
  title: '第一幕 · 烟波渡口阻迷津',
  subtitle: '苏州府 · 太湖烟波渡口木栈长埠',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '皇祐二年春深，八百里太湖白雾漫天，浩渺碧波与天际连成一片苍茫。苏州城外太湖烟波渡口的长埠木栈旁，两艘误入外围芦荡的丝绸商船正歪斜地搁浅在浅滩上，船底被水底暗桩刮出数道尺许长的裂口。栈桥尽头，身形瘦小精悍的“翻江鼠”蒋平正与手摇折扇的姑苏慕容氏家臣“非也先生”包不同争执不下。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0247' },
      text: '“包三先生，这月余来已有七艘商渔船在三十六湾外围触了暗桩！你们参合庄把外湖浮标全撤了，莫非连寻常百姓走水路讨生活也不许么？”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0213' },
      text: '“非也，非也！蒋四爷这话可冤煞我包不同了！并非我参合庄故意刁难渔商，实乃近月有一伙手掌练得漆黑的荆湖恶客潜入江南，夜夜派水鬼在太湖摸桩测水，妄图偷绘入我燕子坞的航道！我家邓大哥不得已才命人移易外围浮标——外人若无完整的《太湖燕子坞烟波水路舆图》，便是大罗金仙下凡，也休想在百里芦荡里辨出南北西东！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（缓步走上长埠木栈，抱拳朗声道）“二位前辈请了。在下正欲寻访太湖燕子坞水路，适闻湖上有强人觊觎水图、累及无辜商渔，不知此中究竟有何隐情？”',
    },
  ],
  choices: [
    {
      id: 'yzw_accept_quest',
      label: '向翻江鼠蒋平详询《太湖三叠烟波图》始末',
      subLabel: '开启横跨苏州、扬州、江宁三府的二流中品奇遇 · 完成后解锁【太湖燕子坞】',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_02_JIANGPING_ENTRUST }],
    },
    {
      id: 'yzw_hold_off',
      label: '暂且驻足观望，容后再议',
      subLabel: '稍后仍可在太湖烟波渡口长埠向蒋平重提此事',
      tone: 'default',
      effects: [],
    },
  ],
}

export const YANZIWU_MAP_QUESTS: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '烟波三叠 · 燕子坞水图',
    category: 'adventure',
    regionId: 'suzhou',
    recommendedRealm: '二流中品',
    maxOpponentRealm: '二流中品',
    recommendedNote:
      '横跨苏州府、扬州府、江宁府三地二十五幕连环奇遇；若兼修算术/诗词或高悟性可识破终局强敌破绽，完成后永久获得《太湖燕子坞烟波水路舆图》并解锁大地图【太湖燕子坞】航道。',
    startHint: '前往苏州府【太湖烟波渡口 · 烟波木栈长埠与镇湖石塔】探问迷雾水障与翻江鼠蒋平即可开启。',
    startLocation: {
      regionId: 'suzhou',
      buildingId: 'sz_taihu',
      spotId: 'sz_th_pier',
      customLabel: '苏州府 · 太湖烟波渡口 · 烟波木栈长埠与镇湖石塔',
    },
    initialStepId: 'suzhou_tavern_rumor',
    summary:
      '太湖三十六湾芦荡迷雾重重、水底梅花暗桩密布，外人无图寸步难行。荆湖铁掌帮江南分水堂暗中潜入苏州、扬州、江宁三府，企图强夺昔年吴越水师一分为三的《太湖三叠烟波图》。助翻江鼠蒋平、沈括与苏颂追回三叠秘卷合璧成图，即可打通前往【太湖燕子坞】的水上迷津。',
    steps: {
      suzhou_tavern_rumor: {
        id: 'suzhou_tavern_rumor',
        title: '姑苏酒肆访夜船',
        objective: '前往苏州府【姑苏临河酒楼】，向往来老船户打探铁掌帮水匪在姑苏的夜间动向。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'suzhou_base_tavern',
          customLabel: '苏州府 · 姑苏临河酒楼',
        },
      },
      suzhou_hanshan_bell: {
        id: 'suzhou_hanshan_bell',
        title: '寒山钟楼查暗格',
        objective: '前往苏州府【枫桥寒山寺 · 夜半钟声古钟楼】，会见义怀禅师并勘验古钟顶梁暗格。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_hanshan',
          spotId: 'sz_hs_bell',
          customLabel: '苏州府 · 枫桥寒山寺 · 夜半钟声古钟楼',
        },
      },
      suzhou_huqiu_stone: {
        id: 'suzhou_huqiu_stone',
        title: '千人石畔护存中',
        objective: '驰援苏州府【虎丘剑池 · 千人石试剑台与生公亭】，击败铁掌暗哨沙九江，护下沈括与《太湖菱花铜水符》。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_huqiu',
          spotId: 'sz_hq_stone',
          customLabel: '苏州府 · 虎丘剑池 · 千人石试剑台与生公亭',
        },
      },
      yangzhou_chaoguan_lu: {
        id: 'yangzhou_chaoguan_lu',
        title: '北渡扬州谒钞关',
        objective: '携蒋平书信北渡长江，前往【扬州府 · 运河钞关 · 户部钞关算赋官厅】拜会钻天鼠卢方。',
        targetLocation: {
          regionId: 'yangzhou',
          buildingId: 'yz_chaoguan',
          spotId: 'yz_cg_office',
          customLabel: '扬州府 · 运河钞关 · 户部钞关算赋官厅',
        },
      },
      yangzhou_chaoguan_ship: {
        id: 'yangzhou_chaoguan_ship',
        title: '漕帮楼船问水程',
        objective: '登上扬州运河钞关【江淮漕帮总舵楼船】，向帮主“翻江龙王”厉沧海查询被盗中卷水图的去向。',
        targetLocation: {
          regionId: 'yangzhou',
          buildingId: 'yz_chaoguan',
          spotId: 'yz_cg_ship',
          customLabel: '扬州府 · 运河钞关 · 江淮漕帮总舵楼船',
        },
      },
      yangzhou_24bridge: {
        id: 'yangzhou_24bridge',
        title: '明月水阁破词隐',
        objective: '前往【扬州府 · 二十四桥明月坊 · 平山清韵琴词水阁】，借柳永、康广陵之助破译私盐船接头暗码。',
        targetLocation: {
          regionId: 'yangzhou',
          buildingId: 'yz_24bridge',
          spotId: 'yz_24_pavilion',
          customLabel: '扬州府 · 二十四桥明月坊 · 平山清韵琴词水阁',
        },
      },
      yangzhou_salt_hall: {
        id: 'yangzhou_salt_hall',
        title: '盐帮聚义揭内鬼',
        objective: '前往【扬州府 · 淮南盐帮总堂 · 两淮盐商议事聚义堂】，向“淮南盐王”顾长风揭露丙字盐船内鬼。',
        targetLocation: {
          regionId: 'yangzhou',
          buildingId: 'yz_salt',
          spotId: 'yz_sl_hall',
          customLabel: '扬州府 · 淮南盐帮总堂 · 两淮盐商议事聚义堂',
        },
      },
      yangzhou_salt_arena: {
        id: 'yangzhou_salt_arena',
        title: '演武院内挫黑风',
        objective: '步入淮南盐帮后院【盐帮十八般兵器演武院】，击败铁掌帮副舵主盛黑风，夺回中卷《广陵漕渠水深卷》。',
        targetLocation: {
          regionId: 'yangzhou',
          buildingId: 'yz_salt',
          spotId: 'yz_sl_arena',
          customLabel: '扬州府 · 淮南盐帮总堂 · 盐帮十八般兵器演武院',
        },
      },
      jiangning_qinhuai: {
        id: 'jiangning_qinhuai',
        title: '秦淮词楼援旧执',
        objective: '溯江西赴【江宁府 · 十里秦淮画舫 · 桃叶临水粉墙词楼】，接应受困的严离瑜与朱菊柔，查明下卷下落。',
        targetLocation: {
          regionId: 'jiangning',
          buildingId: 'jn2_qinhuai',
          spotId: 'jn2_qh_pavilion',
          customLabel: '江宁府 · 十里秦淮画舫 · 桃叶临水粉墙词楼',
        },
      },
      jiangning_academy: {
        id: 'jiangning_academy',
        title: '钟山书院问名儒',
        objective: '前往【江宁府 · 钟山明道书院】拜访王安石，打探金陵城内外精通天文水度之学者。',
        targetLocation: {
          regionId: 'jiangning',
          buildingId: 'jiangning_base_academy',
          customLabel: '江宁府 · 钟山明道书院',
        },
      },
      jiangning_qixia_sutra: {
        id: 'jiangning_qixia_sutra',
        title: '栖霞枫亭参星算',
        objective: '前往【江宁府 · 栖霞山古刹 · 清溪红枫三论讲经亭】拜会苏颂，参校星度水脉并推演焦沧澜真气破绽。',
        targetLocation: {
          regionId: 'jiangning',
          buildingId: 'jn2_qixia',
          spotId: 'jn2_qx_sutra',
          customLabel: '江宁府 · 栖霞山古刹 · 清溪红枫三论讲经亭',
        },
      },
      jiangning_shitou_villa: {
        id: 'jiangning_shitou_villa',
        title: '石头剑庐访孤鸿',
        objective: '前往【江宁府 · 石头城遗址 · 松竹江南剑庐藏剑阁】会见叶孤鸿，探明焦沧澜驻留方位并调匀内息。',
        targetLocation: {
          regionId: 'jiangning',
          buildingId: 'jn2_shitou',
          spotId: 'jn2_st_villa',
          customLabel: '江宁府 · 石头城遗址 · 松竹江南剑庐藏剑阁',
        },
      },
      jiangning_shitou_cliff: {
        id: 'jiangning_shitou_cliff',
        title: '虎踞赤壁决断浪',
        objective: '登上石头城【虎踞赤壁临江试剑台】，正面击败铁掌帮江南分水堂主焦沧澜，夺回下卷《金陵水脉星度卷》！',
        targetLocation: {
          regionId: 'jiangning',
          buildingId: 'jn2_shitou',
          spotId: 'jn2_st_cliff',
          customLabel: '江宁府 · 石头城遗址 · 虎踞赤壁临江试剑台',
        },
      },
      suzhou_boat_synthesize: {
        id: 'suzhou_boat_synthesize',
        title: '太湖画舫合真图',
        objective: '携三叠信物东返【苏州府 · 太湖烟波渡口 · 通燕子坞锦帆画舫渡船】，由沈括合璧绘成《太湖燕子坞烟波水路舆图》。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_taihu',
          spotId: 'sz_th_boat',
          customLabel: '苏州府 · 太湖烟波渡口 · 通燕子坞锦帆画舫渡船',
        },
      },
    },
    spotActions: [
      {
        id: 'spot_yzw_map_start_pier',
        label: '探问太湖迷雾水障 · 《烟波三叠》',
        badge: '秘境舆图奇遇',
        subtitle: '推荐境界：二流中品 · 横跨苏、扬、江宁三府寻回《太湖燕子坞烟波水路舆图》',
        tone: 'gold',
        regionId: 'suzhou',
        buildingId: 'sz_taihu',
        spotId: 'sz_th_pier',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'not_started' },
            { type: 'questStatus', questId: QUEST_ID, status: 'not_completed' },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_01_TAIHU_MIST_DISPUTE }],
      },
      {
        id: 'spot_yzw_map_suzhou_tavern',
        label: '向运河老船户打探夜间黑掌快船',
        badge: '第3幕',
        subtitle: '查访苏州上叠铜水符异动线索',
        tone: 'primary',
        regionId: 'suzhou',
        buildingId: 'suzhou_base_tavern',
        spotId: null,
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'suzhou_tavern_rumor',
        },
        effects: [{ type: 'openScene', scene: SCENE_03_SUZHOU_TAVERN_RUMOR }],
      },
      {
        id: 'spot_yzw_map_hanshan_bell',
        label: '登古钟楼勘验顶梁暗格 · 问询义怀禅师',
        badge: '第4幕',
        subtitle: '核查寒山寺古钟所藏《太湖菱花铜水符》去向',
        tone: 'primary',
        regionId: 'suzhou',
        buildingId: 'sz_hanshan',
        spotId: 'sz_hs_bell',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'suzhou_hanshan_bell',
        },
        effects: [{ type: 'openScene', scene: SCENE_04_HANSHAN_BELL_TRACE }],
      },
      {
        id: 'spot_yzw_map_huqiu_stone',
        label: '驰援生公亭沈括 · 迎战铁掌暗哨沙九江',
        badge: '第5-7幕',
        subtitle: '击败沙九江护住《太湖菱花铜水符》，获悉中卷流向扬州',
        tone: 'danger',
        regionId: 'suzhou',
        buildingId: 'sz_huqiu',
        spotId: 'sz_hq_stone',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'suzhou_huqiu_stone',
        },
        effects: [{ type: 'openScene', scene: SCENE_05_HUQIU_SHENKUO_AMBUSH }],
      },
      {
        id: 'spot_yzw_map_yz_chaoguan_lu',
        label: '呈递蒋平书信 · 请钻天鼠卢方协查水路',
        badge: '第8-9幕',
        subtitle: '于户部钞关算赋官厅核查过闸异常船只',
        tone: 'primary',
        regionId: 'yangzhou',
        buildingId: 'yz_chaoguan',
        spotId: 'yz_cg_office',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'yangzhou_chaoguan_lu',
        },
        effects: [{ type: 'openScene', scene: SCENE_08_ARRIVE_YANGZHOU_CHAOGUAN }],
      },
      {
        id: 'spot_yzw_map_yz_chaoguan_ship',
        label: '登漕帮总舵楼船 · 拜会翻江龙王厉沧海',
        badge: '第10幕',
        subtitle: '追查混入扬州盐商车队的熟铜水图扁匣',
        tone: 'primary',
        regionId: 'yangzhou',
        buildingId: 'yz_chaoguan',
        spotId: 'yz_cg_ship',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'yangzhou_chaoguan_ship',
        },
        effects: [{ type: 'openScene', scene: SCENE_10_CHAOGUAN_SHIP_LI }],
      },
      {
        id: 'spot_yzw_map_yz_24bridge',
        label: '入琴词水阁会柳永、康广陵 · 破译盐船暗码',
        badge: '第11幕',
        subtitle: '参破铁掌帮与私盐客交接的字号口风',
        tone: 'jade',
        regionId: 'yangzhou',
        buildingId: 'yz_24bridge',
        spotId: 'yz_24_pavilion',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'yangzhou_24bridge',
        },
        effects: [{ type: 'openScene', scene: SCENE_11_24BRIDGE_CIPHER }],
      },
      {
        id: 'spot_yzw_map_yz_salt_hall',
        label: '向淮南盐王顾长风揭发丙字三号盐船内鬼',
        badge: '第12幕',
        subtitle: '锁定潜伏盐帮官栈的铁掌帮副舵主盛黑风',
        tone: 'primary',
        regionId: 'yangzhou',
        buildingId: 'yz_salt',
        spotId: 'yz_sl_hall',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'yangzhou_salt_hall',
        },
        effects: [{ type: 'openScene', scene: SCENE_12_SALT_HALL_GU }],
      },
      {
        id: 'spot_yzw_map_yz_salt_arena',
        label: '闯演武院擒贼 · 力战巡江副舵主盛黑风',
        badge: '第13-14幕',
        subtitle: '击败二流下品盛黑风，夺回中卷《广陵漕渠水深卷》',
        tone: 'danger',
        regionId: 'yangzhou',
        buildingId: 'yz_salt',
        spotId: 'yz_sl_arena',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'yangzhou_salt_arena',
        },
        effects: [{ type: 'openScene', scene: SCENE_13_SALT_ARENA_BATTLE }],
      },
      {
        id: 'spot_yzw_map_jn_qinhuai',
        label: '叩访桃叶临水词楼 · 接应严离瑜与朱菊柔',
        badge: '第15-16幕',
        subtitle: '了解金陵旧书庄遇袭经过与焦沧澜动向',
        tone: 'primary',
        regionId: 'jiangning',
        buildingId: 'jn2_qinhuai',
        spotId: 'jn2_qh_pavilion',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'jiangning_qinhuai',
        },
        effects: [{ type: 'openScene', scene: SCENE_15_ARRIVE_JIANGNING_QINHUAI }],
      },
      {
        id: 'spot_yzw_map_jn_academy',
        label: '拜谒钟山明道书院 · 向王安石请教金陵历算名家',
        badge: '第17幕',
        subtitle: '探明馆阁才臣苏颂现于栖霞山考校古碑',
        tone: 'primary',
        regionId: 'jiangning',
        buildingId: 'jiangning_base_academy',
        spotId: null,
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'jiangning_academy',
        },
        effects: [{ type: 'openScene', scene: SCENE_17_MINGDAO_ACADEMY_CLUE }],
      },
      {
        id: 'spot_yzw_map_jn_qixia',
        label: '赴清溪红枫讲经亭 · 请苏颂推演星度潮差',
        badge: '第18幕',
        subtitle: '参校铜水符距度，可借算术/悟性勘破焦沧澜换气破绽',
        tone: 'jade',
        regionId: 'jiangning',
        buildingId: 'jn2_qixia',
        spotId: 'jn2_qx_sutra',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'jiangning_qixia_sutra',
        },
        effects: [{ type: 'openScene', scene: SCENE_18_QIXIA_SUSONG_CAL }],
      },
      {
        id: 'spot_yzw_map_jn_shitou_villa',
        label: '访松竹江南剑庐 · 请叶孤鸿指点赤壁敌踪',
        badge: '第19幕',
        subtitle: '战前调匀气血内息，锁定虎踞赤壁试剑台决战之地',
        tone: 'primary',
        regionId: 'jiangning',
        buildingId: 'jn2_shitou',
        spotId: 'jn2_st_villa',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'jiangning_shitou_villa',
        },
        effects: [{ type: 'openScene', scene: SCENE_19_SHITOU_VILLA_YE }],
      },
      {
        id: 'spot_yzw_map_jn_shitou_cliff',
        label: '登虎踞赤壁试剑台 · 决战分水堂主焦沧澜',
        badge: '第20-22幕 · 终战',
        subtitle: '击败二流中品首领焦沧澜，夺回下卷《金陵水脉星度卷》',
        tone: 'danger',
        regionId: 'jiangning',
        buildingId: 'jn2_shitou',
        spotId: 'jn2_st_cliff',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'jiangning_shitou_cliff',
        },
        effects: [{ type: 'openScene', scene: SCENE_20_SHITOU_CLIFF_SHOWDOWN }],
      },
      {
        id: 'spot_yzw_map_suzhou_boat_finish',
        label: '登锦帆画舫合璧三叠水图 · 解锁【太湖燕子坞】',
        badge: '第23-25幕 · 成图',
        subtitle: '会齐蒋平、沈括与包不同，绘就《太湖燕子坞烟波水路舆图》',
        tone: 'gold',
        regionId: 'suzhou',
        buildingId: 'sz_taihu',
        spotId: 'sz_th_boat',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'suzhou_boat_synthesize',
        },
        effects: [{ type: 'openScene', scene: SCENE_23_RETURN_SUZHOU_BOAT }],
      },
    ],
  },
]
