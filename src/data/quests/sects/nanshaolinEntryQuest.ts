import type { NodeNpc } from '../../../types/game'
import type {
  QuestCondition,
  QuestDefinition,
  StorySceneDef,
  StorySpeakerSpec,
} from '../../../types/quest'
import { DEFAULT_EQUIPPED_SLOTS } from '../../itemsDb'

export const NANSHAOLIN_ENTRY_QUEST_ID = 'QST-SECT-04-ENTRY'

/**
 * 允许触发南少林入门长卷的身份条件：
 * 1) 尚未拜入莆田南少林（SECT-04），且本任务未开启/未完结；
 * 2) 无门无派散人，或出身同脉友盟【闽海镇远镖局（SECT-24）】/【岭南洪门武馆（SECT-27）】带艺求法。
 */
export const NANSHAOLIN_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    {
      type: 'questStatus',
      questId: NANSHAOLIN_ENTRY_QUEST_ID,
      status: 'not_started',
    },
    {
      type: 'not',
      condition: { type: 'inSect', sectId: 'SECT-04' },
      reason: '少侠已身在莆田南少林门墙',
    },
    {
      type: 'any',
      hint: '需为无门无派之身，或由闽海镇远镖局、岭南洪门武馆同脉转投',
      conditions: [
        { type: 'notInAnySect' },
        { type: 'inSect', sectId: 'SECT-24' },
        { type: 'inSect', sectId: 'SECT-27' },
      ],
    },
  ],
}

const SPEAKER_CHEN_AGONG: StorySpeakerSpec = {
  kind: 'custom',
  name: '陈阿公',
  title: '刺桐港采药老船工',
  factionName: '泉州渔户',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_AZHU: StorySpeakerSpec = {
  kind: 'custom',
  name: '阿珠',
  title: '刺桐港采药渔家女',
  factionName: '泉州渔户',
  portraitUrl: '/assets/characters/templates/tpl_sanren_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_female_av.jpg',
}

const SPEAKER_SHAPILIU: StorySpeakerSpec = {
  kind: 'custom',
  name: '鲨皮六',
  title: '番坊恶霸牙人 · 黑鲨水匪外围头目',
  factionName: '黑鲨海寇',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_ONIMARU: StorySpeakerSpec = {
  kind: 'custom',
  name: '鬼丸甚内',
  title: '北朝暗桩雇募 · 东洋浪人刀头',
  factionName: '黑鲨海寇',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_WOODEN_DUMMY: StorySpeakerSpec = {
  kind: 'custom',
  name: '九莲镇门铜皮木人',
  title: '百杰木人巷 · 第十二尊守关机关',
  factionName: '莆田南少林',
  portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
}

function buildHongchanSparNpc(): NodeNpc {
  return {
    id: 'QUEST_NSL_HONGCHAN_SPAR',
    name: '弘禅（搭桥试手）',
    title: '刺桐港护寺俗家弟子',
    realm: '不入流',
    factionId: 'SECT-04',
    factionName: '莆田南少林',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
    stats: {
      hp: 225,
      mp: 90,
      agi: 15,
      res: 6,
      isBenchmark: false,
    },
    talents: { bone: 52, comprehension: 46, charm: 45 },
    equippedArts: {
      neigong: 'MA-180',
      qinggong: null,
      move1: 'MA-183',
      move2: 'MA-163',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-180', level: 1, exp: 0 },
      { artId: 'MA-183', level: 1, exp: 0 },
      { artId: 'MA-163', level: 1, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-099',
      armor: 'ARM-036',
      shoes: 'BOT-020',
    },
    talk: '“扎稳四平马，沉桥莫眨眼！咱们南拳规矩，桥来桥上过，点到为止！”',
  }
}

function buildShapiliuDockNpc(): NodeNpc {
  return {
    id: 'QUEST_NSL_SHAPILIU_DOCK',
    name: '鲨皮六与黑鲨刀手',
    title: '黑鲨水匪栈桥头目',
    realm: '不入流',
    factionId: 'ORG-01',
    factionName: '黑鲨海寇',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    stats: {
      hp: 250,
      mp: 85,
      agi: 16,
      res: 7,
      isBenchmark: false,
    },
    talents: { bone: 45, comprehension: 35, charm: 25 },
    equippedArts: {
      neigong: 'MA-199',
      qinggong: null,
      move1: 'MA-209',
      move2: 'MA-204',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-199', level: 1, exp: 0 },
      { artId: 'MA-209', level: 1, exp: 0 },
      { artId: 'MA-204', level: 1, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
    },
    talk: '“天堂有路你不走！把老船工的海道针经和少林血竭统统交出来！”',
  }
}

function buildWoodenDummyGuardianNpc(): NodeNpc {
  return {
    id: 'QUEST_NSL_WOODEN_GUARDIAN',
    name: '九莲镇门铜皮木人',
    title: '百杰木人巷 · 终关机关傀儡',
    realm: '三流下品',
    factionId: 'SECT-04',
    factionName: '莆田南少林',
    avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
    stats: {
      hp: 285,
      mp: 120,
      agi: 14,
      res: 10,
      isBenchmark: false,
    },
    talents: { bone: 65, comprehension: 40, charm: 40 },
    equippedArts: {
      neigong: 'MA-180',
      qinggong: null,
      move1: 'MA-163',
      move2: 'MA-192',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-180', level: 1, exp: 0 },
      { artId: 'MA-163', level: 1, exp: 0 },
      { artId: 'MA-192', level: 1, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-068',
    },
    talk: '（机括铮然咬合，包裹熟铜护胸的楠木傀儡双臂一振，挟沉猛劲风当门横拦！）',
  }
}

// ============================================================================
// 第四卷：百杰木人破关 · 九莲宝殿敬茶（第 16～20 幕，倒序声明供前序场景引用）
// ============================================================================

const SCENE_NSL_20_MONK_TONSURE_DONE: StorySceneDef = {
  id: 'scene_nsl_20_monk_tonsure_done',
  title: '终章礼成 · 青丝落尽赐弘毅',
  subtitle: '莆田南少林 · 九莲佛前受戒',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '九莲山晨钟三响，梵呗庄严。方丈元苦亲执戒刀立于毗卢遮那佛金身之前，随着三缕青丝无声飘落蒲团，你褪去风尘俗衫，换上一袭洗得发白的少林佛子灰麻僧衣，双掌合十，眉宇间一片澄明刚毅。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0124' },
      text: '“善哉，善哉！『士不可以不弘毅，任重而道远』——自今日起，前尘俗名尽归沧海，老衲赐你我南少林弘字辈法号【弘毅】！愿你守铁桥正气、参上乘禅机，他日《盘山铁布衫》与少林诸般地阶秘典，皆待你精进承继！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“弟子【弘毅】，谨遵方丈法谕！宁折骨，不弯桥，护法安民，永志不忘！”',
    },
  ],
}

const SCENE_NSL_20_FINAL_VOW: StorySceneDef = {
  id: 'scene_nsl_20_final_vow',
  title: '第二十幕 · 僧俗一念定衣钵',
  subtitle: '九莲大雄宝殿 · 铁桥归宗',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '殿外九莲山钟鼓齐鸣，海风拂过殿前古榕，吹落一地火红如霞的刺桐残瓣。方丈元苦饮尽你奉上的半盏武夷岩茶，将温润的建盏轻轻搁在蒲团侧畔，慈和的目光落在你布满老茧与淤痕的双腕之上。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0124' },
      text: '“好孩子，由手无寸铁之身，历刺桐栈桥护弱、寒泉挑水扎马、雨夜死守药栈、木人巷内破关——你这一双手臂，已经有了我南少林『宁折骨、不弯桥』的筋骨气魄。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0201' },
      text: '（藏经首座元空左手托着乌木戒刀、右手捧着僧俗两卷名册上前，神色肃穆）“依我九莲山创寺祖训，今日入室须当场立定衣钵，落册无悔：若择【持戒参禅 · 清修武僧】，方丈即刻为你落发披缁、换穿少林佛子僧衣并赐弘字辈法号【弘毅】，本门《盘山铁布衫（大成）》、《龙爪手》、《拈花指》等【地阶】秘传功法皆向你敞开；若择【带发入世 · 护寺俗家】，虽可蓄发留名行侠四海，但入册后永不再行剃度，本门一切【地阶】功法对你永远不开放！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0909' },
      text: '（戒藏站在殿角轻轻拽了拽僧袖，弘禅也抱着双臂正色低语）“这一步定下便是一辈子的路数！不管你最终落发做【弘毅】师兄，还是跟弘禅一样做护寺俗家师兄，往后下山打海寇，咱们永远是过命的同门手足！”',
    },
  ],
  choices: [
    {
      id: 'nsl20_choose_monk_path',
      label: '【持戒参禅 · 清修武僧】愿落发受戒，受赐法号「弘毅」，承禅门地阶衣钵！',
      subLabel:
        '剃度出家 · 头像与立绘切换为「少林佛子」，姓名改为法号「弘毅」，开放本门地阶功法，另赐佛珠/小还丹/经义+10',
      tone: 'gold',
      effects: [
        { type: 'setFlag', flag: 'nsl_disciple_style', value: 'monk' },
        { type: 'leaveSect', skipPenalty: true },
        { type: 'joinSect', sectId: 'SECT-04', rank: 1, allowOfficialTransfer: true },
        {
          type: 'ordainShaolinMonk',
          dharmaName: '弘毅',
          portraitId: 'hero_02_shaolin',
        },
        { type: 'giveItem', itemId: 'ACC-034', qty: 1 },
        { type: 'giveItem', itemId: 'ITM-MED-111', qty: 1 },
        { type: 'modifySkill', key: '经义', delta: 10 },
        { type: 'giveFood', amount: 5 },
        { type: 'giveSilver', amount: 25, reason: '南少林下院巡护盘缠津贴' },
        { type: 'modifyChivalry', delta: 15, reason: '护佑刺桐百姓、铁桥拜入南少林' },
        { type: 'modifyRenown', delta: 20, reason: '闯过百杰木人巷初阵，落发拜入莆田南少林' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0124' }, delta: 25 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0201' }, delta: 25 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0164' }, delta: 20 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0165' }, delta: 20 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0200' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0909' }, delta: 35 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0674' }, delta: 25 },
        {
          type: 'completeQuest',
          questId: NANSHAOLIN_ENTRY_QUEST_ID,
          outcome: 'joined_nanshaolin_monk',
          combatExp: 100,
        },
        {
          type: 'toast',
          text: '正式落发拜入【莆田南少林 · 清修武僧】，赐法号【弘毅】！已换穿少林佛子僧衣，本门地阶秘传功法向小师父敞开！',
          tone: 'success',
          logTag: '铁桥归宗',
        },
        {
          type: 'openScene',
          scene: SCENE_NSL_20_MONK_TONSURE_DONE,
        },
      ],
    },
    {
      id: 'nsl20_choose_lay_path',
      label: '【带发入世 · 护寺俗家】愿蓄发仗义行四方，护佑东南海疆黎庶！',
      subLabel:
        '⚠️ 落册无悔：保留俗名与原立绘，获护腕/断续胶及侠义声望加成，但本门【地阶功法】对主角永远不开放！',
      tone: 'jade',
      effects: [
        { type: 'setFlag', flag: 'nsl_disciple_style', value: 'lay' },
        { type: 'leaveSect', skipPenalty: true },
        { type: 'joinSect', sectId: 'SECT-04', rank: 1, allowOfficialTransfer: true },
        { type: 'giveItem', itemId: 'WPN-099', qty: 1 },
        { type: 'giveItem', itemId: 'ITM-MED-112', qty: 1 },
        { type: 'giveFood', amount: 5 },
        { type: 'giveSilver', amount: 25, reason: '南少林护港俗家巡防津贴' },
        { type: 'modifyChivalry', delta: 25, reason: '蓄发护寺、靖海安民拜入南少林' },
        { type: 'modifyRenown', delta: 25, reason: '硬桥闯出百杰木人巷，成南少林护寺传人' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0164' }, delta: 25 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0165' }, delta: 25 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0124' }, delta: 20 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0200' }, delta: 20 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0909' }, delta: 35 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0674' }, delta: 30 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0286' }, delta: 15 },
        {
          type: 'completeQuest',
          questId: NANSHAOLIN_ENTRY_QUEST_ID,
          outcome: 'joined_nanshaolin_lay',
          combatExp: 100,
        },
        {
          type: 'toast',
          text: '正式拜入【莆田南少林 · 护寺俗家】！保留俗名与行侠衣冠，获赐制式披挂与护腕断续胶（依九莲山祖训，本门地阶功法对俗家弟子永不开放）！',
          tone: 'success',
          logTag: '铁桥归宗',
        },
      ],
    },
  ],
}

const SCENE_NSL_19_TEA_CEREMONY: StorySceneDef = {
  id: 'scene_nsl_19_tea_ceremony',
  title: '第十九幕 · 大雄宝殿奉岩茶',
  subtitle: '九莲大雄宝殿 · 禅武祖训',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '步入九莲大雄宝殿，鎏金释迦牟尼宝相庄严肃穆，两厢十八罗汉怒目低眉，殿内檀香清冽。你盥手整衣，跪于佛前蒲团之上，依闽南拜师古礼双手高捧一盏滚烫的武夷陈年水仙岩茶，恭敬举过眉齐。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0124' },
      text: '（方丈元苦双手接过茶盏，声如古钟回荡大殿）“善哉！我莆田南少林自唐初分灯南来，立寺九莲山，与中原嵩山祖庭一北一南，同奉达摩禅宗正脉。北少林气势恢宏、大开大合；我南少林临海御寇、步窄马沉，讲究『一寸短一寸险，硬桥硬马寸土不让』！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0124' },
      text: '“当今皇祐二年，北疆契丹虎视眈眈，东南海疆亦暗流汹涌。我辈习武，非为争强斗狠，实为替沿海渔农商旅撑起一道打不垮的脊梁！入我外门后，你可修习南北少林互通之基础拳棍禅功；待日后勤修晋阶，铁罗汉堂的《铁线拳》《盘山铁布衫》，乃至老衲的《大力金刚指》与《金刚不坏体神功》，皆不吝倾囊相授！”',
    },
  ],
  choices: [
    {
      id: 'nsl19_pledge_creed',
      label: '【稽首顿首】“弟子谨遵方丈法谕，定当守正辟邪，不堕南少林铁桥威名！”',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_NSL_20_FINAL_VOW }],
    },
  ],
}

const SCENE_NSL_18_BREAK_GATE_CG: StorySceneDef = {
  id: 'scene_nsl_18_break_gate_cg',
  title: '第十八幕 · 百杰木人巷，硬桥闯山门',
  subtitle: '九莲山演武坪 · 破关见日',
  illustrationUrl: '/assets/quests/nanshaolin_wooden_alley.jpg',
  illustrationCaption: '九莲山百杰木人巷 · 铁线轰关见晨光',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '“轰——！”伴随着你吐气开声的一记南拳冲捶正中镇门木人胸前熟铜护心镜，地底连环铜簧发出一阵清越嗡鸣，十二尊楠木机关人偶齐齐收臂退回壁龛，巷尾那扇重逾千斤的青石山门闸缓缓向两侧洞开！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '刹那间，万丈闽海朝阳穿透幽暗潮湿的石巷倾泻而入，山风卷着数片鲜红刺桐花瓣拂过你汗水淋漓的额角。你拖着酸麻发颤的双腿一步迈出巷口，只见演武坪上早已有数十名武僧列立两侧——正中那位身披赤褐木棉袈裟、古铜面庞不怒自威的老僧，正是南少林方丈「铜身罗汉」元苦禅师！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0164' },
      text: '（元通禅师嘴角难得扬起一抹硬朗笑意，重重拍了拍你的肩膀，震得你差点又一个趔趄）“臭小子，最后那一记沉肩坠肘总算有了三分火候，没白费老衲这半个月熬的跌打药汤！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0124' },
      text: '（方丈元苦双手合十，目光温厚如海）“阿弥陀佛。筋骨经寒泉而不折，侠心临刀兵而不移。随老衲移步【九莲大雄宝殿】，今日九莲山为你开钟受礼！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: NANSHAOLIN_ENTRY_QUEST_ID,
      stepId: 'abbot_tea_ceremony',
    },
    {
      type: 'toast',
      text: '已闯出百杰木人巷初阵！请移步【九莲大雄宝殿 · 大雄正殿】向方丈【元苦】敬奉入门岩茶！',
      tone: 'success',
      logTag: '木人破关',
    },
  ],
}

const SCENE_NSL_17_ALLEY_APTITUDE: StorySceneDef = {
  id: 'scene_nsl_17_alley_aptitude',
  title: '第十七幕 · 四象破机显真章',
  subtitle: '百杰木人机关主巷 · 镇门铜偶',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '身后铁栅“哐当”落锁，长廊两侧油灯骤灭其半。脚下八卦青砖刚一受压，“咔咔咔”机括转动声如闷雷滚过，左右十余尊涂黑漆、裹熟铜的少林木人同时旋身出臂，齐眉木棍与铜铁拳头封死了前路每一寸空隙！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '前十一尊木人虽猛，你凭着在炼体坪磨出的四平马步连消带打，硬是闯到了巷尾最后一丈！谁知地砖猛然下陷，一尊高逾八尺、胸嵌护心铜镜的「九莲镇门铜皮木人」踏滑槽迎面撞来，双臂横扫千钧！',
    },
    {
      speaker: SPEAKER_WOODEN_DUMMY,
      text: '（机括铮铮咬合如金铁嘶鸣，八尺铜皮木人双臂交叉成少林十字铁桥，齐眉铜头棍挟万钧风雷当胸横拦，封死山门石闸最后一寸退路！）',
    },
  ],
  choices: [
    {
      id: 'nsl17_break_by_bone',
      label: '【铜桥硬撼 · 以刚破刚】沉腰坐马，双桥如铁线硬撞木人铜臂枢机！（根骨 ≥ 60）',
      subLabel: '硬功震锁机括 · 拳掌修为精进，随后迎战镇门木人',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '根骨', min: 60 },
      effects: [
        { type: 'addArtExp', amount: 450 },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: NANSHAOLIN_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildWoodenDummyGuardianNpc() },
          rule: 'story_trial',
          forbidEscapeReason: '百杰木人巷铁闸已落，唯有向前破关方能出巷！',
          introText: '你双桥硬震木人横棍，机括火星四溅，镇门铜皮木人已欺至面前！',
          onWin: [{ type: 'openScene', scene: SCENE_NSL_18_BREAK_GATE_CG }],
          onLose: [
            {
              type: 'toast',
              text: '虽被木人重臂震得气血翻涌，你仍死死抱住门闩铜环一拳撞开石闸！',
              tone: 'warn',
              logTag: '喋血破巷',
            },
            { type: 'healPlayer', hpPct: 50, mpPct: 50 },
            { type: 'openScene', scene: SCENE_NSL_18_BREAK_GATE_CG },
          ],
        },
      ],
    },
    {
      id: 'nsl17_break_by_wit',
      label: '【听风辨簧 · 以慧破巧】闭目默数地砖齿轮三息间隙，借力反撞！（悟性 ≥ 60 或算术 ≥ 35）',
      subLabel: '洞悉阴阳枢机 · 经义 +4、武学熟练度精进，随后破除镇门木人',
      tone: 'jade',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 60 },
          { type: 'skillAtLeast', key: '算术', min: 35 },
          { type: 'skillAtLeast', key: '棋', min: 35 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '经义', delta: 4 },
        { type: 'addArtExp', amount: 450 },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: NANSHAOLIN_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildWoodenDummyGuardianNpc() },
          rule: 'story_trial',
          forbidEscapeReason: '百杰木人巷铁闸已落，唯有向前破关方能出巷！',
          introText: '你看破脚下齿轮换向的一瞬滞涩，欺身切入镇门铜皮木人中门！',
          onWin: [{ type: 'openScene', scene: SCENE_NSL_18_BREAK_GATE_CG }],
          onLose: [
            {
              type: 'toast',
              text: '缠斗至力竭之际，你借木人回臂齿轮咬合之力顺势推开千斤石闸！',
              tone: 'warn',
              logTag: '智破木巷',
            },
            { type: 'healPlayer', hpPct: 50, mpPct: 50 },
            { type: 'openScene', scene: SCENE_NSL_18_BREAK_GATE_CG },
          ],
        },
      ],
    },
    {
      id: 'nsl17_break_by_charm_calm',
      label: '【观潮卸劲 · 气定神闲】效仿刺桐港礁石分浪之势，半步斜闪切入内圈！（颜值 ≥ 60 或辩才 ≥ 35）',
      subLabel: '临危心境澄明 · 战斗经验 +50，随后迎战镇门木人',
      tone: 'primary',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '颜值', min: 60 },
          { type: 'skillAtLeast', key: '辩才', min: 35 },
        ],
      },
      effects: [
        { type: 'giveCombatExp', amount: 50, reason: '木人巷临危分浪卸劲感悟' },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: NANSHAOLIN_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildWoodenDummyGuardianNpc() },
          rule: 'story_trial',
          forbidEscapeReason: '百杰木人巷铁闸已落，唯有向前破关方能出巷！',
          introText: '你步走斜线卸开木棍重击，稳稳架桥直取镇门铜皮木人胸前铜镜！',
          onWin: [{ type: 'openScene', scene: SCENE_NSL_18_BREAK_GATE_CG }],
          onLose: [
            {
              type: 'toast',
              text: '虽受铜臂擦伤，你借半步卸力之巧一掌拍响门闩机关冲出石巷！',
              tone: 'warn',
              logTag: '破巷出关',
            },
            { type: 'healPlayer', hpPct: 50, mpPct: 50 },
            { type: 'openScene', scene: SCENE_NSL_18_BREAK_GATE_CG },
          ],
        },
      ],
    },
    {
      id: 'nsl17_break_by_grit',
      label: '【一步一印 · 血肉硬闯】不避不退！咬紧牙关挨一棍便还一拳，死磕到底！',
      subLabel: '草根苦行本色 · 侠义 +5、战斗经验 +40，迎战镇门木人',
      tone: 'danger',
      effects: [
        { type: 'modifyChivalry', delta: 5, reason: '百杰木人巷一步一印硬闯山门' },
        { type: 'giveCombatExp', amount: 40, reason: '木人巷苦战磨砺筋骨' },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: NANSHAOLIN_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildWoodenDummyGuardianNpc() },
          rule: 'story_trial',
          forbidEscapeReason: '百杰木人巷铁闸已落，唯有向前破关方能出巷！',
          introText: '你抹去嘴角汗水，扎稳寒泉练出的铁马步，迎着镇门铜皮木人正面轰拳！',
          onWin: [{ type: 'openScene', scene: SCENE_NSL_18_BREAK_GATE_CG }],
          onLose: [
            {
              type: 'toast',
              text: '双臂青紫麻木仍不肯倒下，你以肩背硬生生撞开巷尾石闸，满堂动容！',
              tone: 'warn',
              logTag: '铁骨破巷',
            },
            { type: 'healPlayer', hpPct: 50, mpPct: 50 },
            { type: 'openScene', scene: SCENE_NSL_18_BREAK_GATE_CG },
          ],
        },
      ],
    },
  ],
}

const SCENE_NSL_16_ENTER_ALLEY: StorySceneDef = {
  id: 'scene_nsl_16_enter_alley',
  title: '第十六幕 · 达摩堂前叩木巷',
  subtitle: '南少林百杰木人巷 · 入门大考',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '三日后，九莲山云开雾散。百杰木人巷幽深的青石门洞前，达摩堂主「镇海禅师」元海负手而立，海风鼓荡着他宽大的灰麻僧袖，猎猎作响。戒藏与胳膊还缠着白布绷带的弘禅一左一右替你束紧腰带与护腕。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0200' },
      text: '“刺桐港雨夜一役，元觉师兄与元通师兄已禀明方丈。按本寺旧例，凡半路投寺而欲入室受牒者，须过我达摩堂执掌的【百杰木人巷】初阵十二关！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0200' },
      text: '（元海禅师一指黑沉沉的机关甬道，声若洪钟）“巷中木人皆以闽北百年铁楠木混熟铜打造，由地砖踏簧牵引，无痛无惧、力道千钧！你入寺前毫无内家根底，至今不过十余日苦功，老衲不求你拆尽百变机巧——只要你能凭胸中一口气撞开尽头山门石闸，便算过关！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0909' },
      text: '（戒藏把一枚擦得锃亮的平安铜钱塞进你手心，压低嗓门急道）“记住咱们挑水过梅花桩的诀窍！千万别慌着往后退，木人巷的踏板退一步便会连环夹击，越往前顶反而越有一线生机！”',
    },
  ],
  choices: [
    {
      id: 'nsl16_step_into_alley',
      label: '【深吸一口气迈入石巷】“请元海堂主启阵！”',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_NSL_17_ALLEY_APTITUDE }],
    },
  ],
}

// ============================================================================
// 第三卷：沧海暗潮 · 雨夜护港（第 11～15 幕）
// ============================================================================

const SCENE_NSL_15_LIAO_TALLY: StorySceneDef = {
  id: 'scene_nsl_15_liao_tally',
  title: '第十五幕 · 搜获密符见家国',
  subtitle: '刺桐港千帆栈桥 · 潮平风定',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '鬼丸甚内吐血坠入狂涛，残余黑鲨水匪见首领折戟，顿时作鸟兽散。闽海镇远镖局总镖头林镇海率数十名红旗镖师举火赶到，与南少林武僧合力扑灭药栈余火，将受伤渔民一一扶入舱棚救治。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0286' },
      text: '（林镇海用枪尖从栈桥木缝里挑起一只刀痕累累的油布密囊，取出一枚刻着契丹狼头纹的青铜鱼符与半册海图，面色凝重）“两位大师请看！这帮东洋浪人果真收了北辽南院密谍的重金，想抢走陈老丈的《流求澎湖针经》，替北人摸清我大宋福建水师的沿海暗礁水道！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0165' },
      text: '（元觉首座收起铜符，转头望向仍拄着木棍、虎口鲜血与雨水混流却不肯坐下的你，眼中满是嘉许）“若非这位小友与戒藏、弘禅拼死守住后栈半柱香，不仅救命血竭付诸一炬，东南海防更要酿成大祸。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0164' },
      text: '（元通禅师抓过你的手腕一搭脉，哼了一声，却从怀里掏出一瓷瓶上好金创药抛进你怀里）“虎口裂了三分，桥手架子倒还没散！天亮随老衲回九莲山——老衲亲自替你向方丈请开【百杰木人巷】，看你够不够格吃我南少林这碗饭！”',
    },
  ],
  onFinishEffects: [
    { type: 'giveItem', itemId: 'ITM-MED-121', qty: 2 },
    { type: 'giveCombatExp', amount: 60, reason: '刺桐港雨夜血战护住海防针经' },
    {
      type: 'setQuestStep',
      questId: NANSHAOLIN_ENTRY_QUEST_ID,
      stepId: 'wooden_alley_trial',
    },
    {
      type: 'toast',
      text: '刺桐港之危已解！获赐金创药 2 份。请返回【莆田南少林 · 南少林百杰木人巷】找达摩堂主【元海】闯关受考！',
      tone: 'success',
      logTag: '雨夜靖海',
    },
  ],
}

const SCENE_NSL_14_SHATTER_KATANA_CG: StorySceneDef = {
  id: 'scene_nsl_14_shatter_katana_cg',
  title: '第十四幕 · 刺桐夜雨急，铁桥碎倭刀',
  subtitle: '刺桐港木栈桥 · 金刚断刃',
  illustrationUrl: '/assets/quests/nanshaolin_port_night_battle.jpg',
  illustrationCaption: '刺桐港狂潮夜雨 · 南拳铁桥力碎东洋刃',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '鲨皮六刚被逼退数步，药栈屋脊陡然炸开一道雪亮电光！一名身穿黑漆竹胴丸的精悍浪人头目——鬼丸甚内踏着暴雨凌空扑下，手中四尺长的东洋野太刀发出凄厉呼啸，直取脚下打滑跌倒的戒藏与陈阿公天灵盖！',
    },
    {
      speaker: { kind: 'player' },
      text: '“戒藏闪开——！！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '生死一线间，你根本来不及多想，本能地将这十余日挑水踏桩熬进骨子里的“四平大马”钉死在湿滑栈桥木板上，丹田那缕初生的微弱真气轰然冲入双臂，双腕交叉成十字铁桥向上硬架！“当——！”锋利刀背重重劈在你护腕铁环之上，狂暴劲力压得你双膝把栈桥厚木板踏裂两道深痕，虎口鲜血迸流，双臂却如生铁浇铸般死死撑住那夺命半息！',
    },
    {
      speaker: SPEAKER_ONIMARU,
      text: '“八嘎！区区初学乍练的支那雏儿，也妄想挡我鬼丸流的斩马刀？给我连手臂一起断——！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '就在野太刀刀锋即将切入皮肉的刹那，一声雄浑如海啸的“阿弥陀佛”震碎漫天雨幕！灰影踏浪掠至，戒律首座元觉单掌按住你肩头卸去千钧刀压，右手食中二指骤然泛起乌金光泽，竟不偏不倚夹住了雪亮刀刃——“咔嚓！铮——！”名震天下的少林《大力金刚指》劲力吐处，百炼倭刀竟如脆冰般寸寸崩裂，紧随其后的铁桥禅师元通一记铁线横桥轰在鬼丸甚内胸口，将其震飞十丈之外！',
    },
  ],
  choices: [
    {
      id: 'nsl14_exhale_stand_firm',
      label: '【拄棍喘息不倒】“多谢元觉师叔祖、元通堂主及时赶到……药箱与阿公都在！”',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_NSL_15_LIAO_TALLY }],
    },
  ],
}

const SCENE_NSL_13_DOCK_SKIRMISH: StorySceneDef = {
  id: 'scene_nsl_13_dock_skirmish',
  title: '第十三幕 · 栈桥并肩破浪刀',
  subtitle: '刺桐港药栈后坞 · 师兄弟齐心',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '乌篷小舟无声滑入临江演武船坞。火光映照下，只见药栈栈桥上堆满了贴着南少林封条的血竭木箱，恶牙鲨皮六正带着几名湿衣水匪反剪着陈阿公的双臂，刀尖抵在老人咽喉，逼他交出世代相传的《流求澎湖海道针经》！',
    },
    {
      speaker: SPEAKER_SHAPILIU,
      text: '“老棺材瓤子，别敬酒不吃吃罚酒！今夜前港有东洋大剑豪拖住开元寺秃驴，没人来救你——咦？又是你们两个小杂毛？！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0909' },
      text: '（戒藏双目赤红，抡起挑药桑木扁担一棍扫翻油火盆，挡在叔祖陈阿公身前）“放开我阿叔公！师兄，弘禅师兄替咱们断住右侧水匪了，这狗贼交给咱们！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0674' },
      text: '（弘禅一棍挑飞两名水匪手里的鱼叉，回头朝你大吼）“别留手！用元通师伯教你的沉桥重拳，破他下盘！”',
    },
  ],
  choices: [
    {
      id: 'nsl13_engage_shapiliu',
      label: '【踏步沉桥 · 拔拳迎敌】与戒藏、弘禅并肩杀上栈桥！',
      subLabel: '实战检验初成南拳与内功 · 胜败皆有同门接应推进',
      tone: 'danger',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: NANSHAOLIN_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildShapiliuDockNpc() },
          rule: 'story_trial',
          forbidEscapeReason: '身后便是受困的陈阿公与小沙弥戒藏，岂能弃之而逃！',
          introText: '海雨狂泼栈桥，你催动丹田新生的内息，迎着鲨皮六的泼风乱刀踏步抢攻！',
          onWin: [
            { type: 'giveCombatExp', amount: 45, reason: '刺桐港雨夜击溃黑鲨恶霸鲨皮六' },
            { type: 'openScene', scene: SCENE_NSL_14_SHATTER_KATANA_CG },
          ],
          onLose: [
            { type: 'healPlayer', hpPct: 60, mpPct: 60 },
            { type: 'openScene', scene: SCENE_NSL_14_SHATTER_KATANA_CG },
          ],
        },
      ],
    },
  ],
}

const SCENE_NSL_12_BOATMAN_KARMA: StorySceneDef = {
  id: 'scene_nsl_12_boatman_karma',
  title: '第十二幕 · 暗礁乌篷故人恩',
  subtitle: '刺桐港万国番坊 · 前缘回响',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '子夜时分，狂风暴雨裹挟着咸腥海浪猛拍刺桐港石堤。远远望去，番坊东侧药栈浓烟滚滚，正门吊桥已被十余名手持倭刀与分水刺的黑鲨水匪封死，强冲无异于活靶！正当你们三人在礁石后焦急万分之际，芦苇暗渠里忽然探出一盏蒙着黑布的风灯。',
    },
    {
      speaker: SPEAKER_AZHU,
      text: '“戒藏小师父！还有前些日子在码头救过我阿公的恩公！快上船——！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '只见采药女阿珠披着棕榈蓑衣，正死死撑着一叶吃水极浅的乌篷舢板停在暗礁口！原来白日里你与戒藏在栈桥结下的善缘，此刻竟化作了绝处逢生的生路——阿珠熟知番坊栈桥底下的退潮涵洞，可直穿药栈后坞！',
    },
  ],
  choices: [
    {
      id: 'nsl12_hongmen_zhenyuan_signal',
      label: '【亮出镇远/洪门暗记】吹响港防竹哨，通知林镇海总镖头率队西岸合围！',
      subLabel: '同脉宿缘响应 · 获赠【熟药所行军跌打丸】×2，林镇海镖师鸣锣分担贼势',
      tone: 'gold',
      condition: {
        type: 'any',
        conditions: [
          { type: 'inSect', sectId: 'SECT-24' },
          { type: 'inSect', sectId: 'SECT-27' },
          { type: 'hasItem', itemId: 'ITM-MSC-005' },
          { type: 'flag', flag: 'nsl_bond_hongmen', op: 'truthy' },
        ],
      },
      effects: [
        { type: 'giveItem', itemId: 'ITM-MED-122', qty: 2 },
        { type: 'openScene', scene: SCENE_NSL_13_DOCK_SKIRMISH },
      ],
    },
    {
      id: 'nsl12_board_azhu_skiff',
      label: '【跃上乌篷小舟】“多谢阿珠姑娘引路，我们这便从水门奇袭救陈阿公！”',
      subLabel: '市井渔家善缘回馈 · 阿珠奉上【熟药所行军跌打丸】×1 助阵',
      tone: 'jade',
      effects: [
        { type: 'giveItem', itemId: 'ITM-MED-122', qty: 1 },
        { type: 'openScene', scene: SCENE_NSL_13_DOCK_SKIRMISH },
      ],
    },
  ],
}

const SCENE_NSL_11_URGENT_ALARM: StorySceneDef = {
  id: 'scene_nsl_11_urgent_alarm',
  title: '第十一幕 · 血羽急报黑鲨动',
  subtitle: '九莲山炼体坪 · 海疆告急',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '你与弘禅一招方罢，两人正大口喘着粗气相视而笑，弘禅刚把腰间装满跌打药酒的葫芦抛给你，山门方向骤然传来三记急促无比的破空警钟！但见驻守泉州开元寺的铁棍僧戒山浑身泥水血迹，踉跄冲上石坪！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0982' },
      text: '“禀元通堂主！大事不好！今夜八月望日大海潮，黑鲨水匪勾结一伙刀法诡狠的东洋浪人，趁水师巡船避风，突袭【刺桐港万国番坊】药栈！元觉首座正在前街独挡三名浪人高手，贼人分兵去后坞抢金创血竭，还绑了老船工陈阿公逼问外海航道！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0909' },
      text: '（戒藏手中木桶“哐啷”砸落在地，脸色煞白）“陈阿公是我远房叔祖！当年我爹娘死在海寇手里，全靠阿公一口鱼粥把我喂大……堂主，弟子求下山救人！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0164' },
      text: '（元通禅师虎目寒芒暴涨，一把抄起兵器架上碗口粗的熟铁棍）“铁罗汉堂三十六棍僧随我正面驰援元觉师弟！弘禅，你带这新来的小子和戒藏抄小路赶赴【泉州府 · 刺桐港万国番坊】后栈接应渔户，在大队赶到前万不可硬拼贼酋，速去！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: NANSHAOLIN_ENTRY_QUEST_ID,
      stepId: 'night_rescue_port',
    },
    {
      type: 'toast',
      text: '刺桐港遭海寇夜袭！请速下山赶往【泉州府 · 刺桐港万国番坊】救援陈阿公与药栈！',
      tone: 'warn',
      logTag: '刺桐告急',
    },
  ],
}

// ============================================================================
// 第二卷：九莲山三十六房式筑基（第 6～10 幕）
// ============================================================================

const SCENE_NSL_10_SPAR_HONGCHAN: StorySceneDef = {
  id: 'scene_nsl_10_spar_hongchan',
  title: '第十幕 · 寒泉池畔试桥手',
  subtitle: '千斤铁鼎炼体坪 · 初试啼声',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '一口纯正内家真气自丹田缓缓流向四肢百骸，你只觉连日挑水留下的酸痛一扫而空，握拳时指节“啪啪”脆响，生平第一次尝到了“气随拳走、力从地起”的畅快滋味！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0674' },
      text: '（一直在寒泉池边擦拭齐眉棍的俗家师兄弘禅见状，纵身跃上石坪，把下巴一扬）“哟！才蒙两位师伯点拨了半个时辰，瞧把你能耐的！咱们南少林俗家规矩，光练不打那是假把式——来来来，师兄我压着内力只使第一重功夫，敢不敢跟我『搭桥试手』拆上几招？”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0164' },
      text: '（元通禅师抱臂立于铁鼎旁，微一点头）“拳怕少壮，棍怕老郎。去试试手，记住刚教你的内功吐纳与拳棍轮换，莫在同一招式上死磕！”',
    },
  ],
  choices: [
    {
      id: 'nsl10_accept_hongchan_spar',
      label: '【扎稳马步抱拳】“请弘禅师兄赐教！”（现学现卖初试南拳）',
      subLabel: '切磋点到为止 · 已自动装备新学内功与招式，胜负皆可结下同门情谊',
      tone: 'primary',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: NANSHAOLIN_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildHongchanSparNpc() },
          rule: 'spar',
          introText: '寒泉水雾缭绕，你运起刚刚学会的入门内功与南派拳脚，与俗家师兄弘禅搭桥拆招！',
          onWin: [
            { type: 'setFlag', flag: 'nsl_beat_hongchan', value: true },
            { type: 'giveCombatExp', amount: 35, reason: '寒泉池畔搭桥切磋胜过师兄弘禅' },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0674' }, delta: 15 },
            {
              type: 'toast',
              text: '弘禅被你一拳震退半步，揉着手腕哈哈大笑：“好硬的桥手！我弘禅服你这个兄弟了！”',
              tone: 'success',
              logTag: '搭桥试手',
            },
            { type: 'openScene', scene: SCENE_NSL_11_URGENT_ALARM },
          ],
          onLose: [
            { type: 'giveCombatExp', amount: 25, reason: '寒泉池畔与师兄弘禅搭桥印证所学' },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0674' }, delta: 12 },
            { type: 'healPlayer', hpPct: 100, mpPct: 100 },
            {
              type: 'toast',
              text: '虽惜败半招，弘禅却惊讶地甩着发麻的手背赞道：“才学半天就能硬扛我三记重桥，好小子，够硬气！”',
              tone: 'talk',
              logTag: '搭桥试手',
            },
            { type: 'openScene', scene: SCENE_NSL_11_URGENT_ALARM },
          ],
        },
      ],
    },
  ],
}

const SCENE_NSL_09_FIRST_NEIGONG: StorySceneDef = {
  id: 'scene_nsl_09_first_neigong',
  title: '第九幕 · 因材施教开真气',
  subtitle: '神炉主坊 · 破零授艺',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '次日破晓，九莲山紫气东来。藏经首座「木棉袈裟僧」元空手捧两卷泛黄绢册步入千斤铁鼎炼体坪，与铁桥禅师元通并肩立于你面前。经过半月挑水踏桩与药汤淬炼，你原本虚浮的气息已尽数沉淀于足底涌泉。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0201' },
      text: '“元通师兄，这孩子初来时丹田空空如白纸，如今筋膜已开、百脉待通，恰如干涸良田喜逢春雨，正是传授内家吐纳与筑基拳脚的最佳火候。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0164' },
      text: '（元通禅师目光如炬，上下打量你的骨骼气度）“南少林授徒从不千篇一律！天生铜筋铁骨者，宜走『以桩养气、洪拳开山』的刚猛横练路；灵台澄明善悟者，宜走『禅定绵长、罗汉伏魔』的禅武合一途；便是寻常资质，老衲也有一门实打实的护身把式传你——你自己说，想修哪一门筑基？”',
    },
  ],
  choices: [
    {
      id: 'nsl09_learn_bone_hongquan',
      label: '【刚猛横练路】修习内功《站桩壮骨法》与南派《洪拳》！（根骨 ≥ 58 或曾硬扛药箱）',
      subLabel: '领悟并自动装备《站桩壮骨法》+《洪拳（岭南/闽南初传）》（各第1重 · 熟练+400）',
      tone: 'gold',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '根骨', min: 58 },
          { type: 'flag', flag: 'nsl_aptitude_route', op: 'eq', value: 'bone' },
        ],
      },
      effects: [
        { type: 'teachMartialArt', artId: 'MA-180', level: 1, exp: 400, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-183', level: 1, exp: 400, autoEquip: true },
        { type: 'openScene', scene: SCENE_NSL_10_SPAR_HONGCHAN },
      ],
    },
    {
      id: 'nsl09_learn_wit_luohan',
      label: '【禅武明心路】修习佛门内功《少林小乘禅功》与《罗汉拳》！（悟性 ≥ 58 或经义 ≥ 35）',
      subLabel: '领悟并自动装备《少林小乘禅功》+《罗汉拳》（各第1重 · 熟练+400）',
      tone: 'jade',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 58 },
          { type: 'skillAtLeast', key: '经义', min: 35 },
          { type: 'flag', flag: 'nsl_aptitude_route', op: 'eq', value: 'wit' },
        ],
      },
      effects: [
        { type: 'teachMartialArt', artId: 'MA-159', level: 1, exp: 400, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-163', level: 1, exp: 400, autoEquip: true },
        { type: 'openScene', scene: SCENE_NSL_10_SPAR_HONGCHAN },
      ],
    },
    {
      id: 'nsl09_learn_diligent_allround',
      label: '【苦行百炼路】稳扎稳打，兼修《少林小乘禅功》、《罗汉拳》与《少林烧火棍》！',
      subLabel: '不限资质 · 领悟并自动装备内功与拳棍双招，另获赠【少室灶房烧火棍】一根',
      tone: 'primary',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-159', level: 1, exp: 300, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-163', level: 1, exp: 300, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-192', level: 1, exp: 200, autoEquip: true },
        { type: 'giveItem', itemId: 'WPN-095', qty: 1 },
        { type: 'openScene', scene: SCENE_NSL_10_SPAR_HONGCHAN },
      ],
    },
  ],
}

const SCENE_NSL_08_COLD_SPRING_CG: StorySceneDef = {
  id: 'scene_nsl_08_cold_spring_cg',
  title: '第八幕 · 寒泉浸铁腕，四平扎马桩',
  subtitle: '千斤铁鼎炼体坪 · 严师慈心',
  illustrationUrl: '/assets/quests/nanshaolin_tripod_training.jpg',
  illustrationCaption: '九莲山千斤铁鼎坪 · 铁腕挑泉稳踏梅花桩',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '春寒料峭，转眼便是十五个日夜。起初三日，你摔进刺骨寒泉不下三十次，双肩肿得连粗布短衫都脱不下来；到第七日，你学会了五趾如老榕树根般死死扣住湿滑青石；及至第十五日黄昏，山岚暮雨四合，神炉主坊映出暗红火光——你双腕套着沉重熟铁环、双臂平伸挑起两只满溢寒泉的杉木大桶，在梅花桩上稳稳扎下“四平大马”，任凭山风吹拂，桶中水面竟如古井般纹丝不洒！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '远处戒藏也咬牙挑桶立在桩上，朝你竖起大拇指。直到暮鼓敲罢、众僧散尽，你才缓缓收桩坐倒石阶，却见一双僧侣芒鞋无声停在身前——白日里凶神恶煞的元通禅师，竟端着一钵滚烫辛辣的红花铁牛跌打药汤，蹲下身亲自替你揉开双臂淤血！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0164' },
      text: '（滚烫药力透入骨缝，元通禅师头也不抬，声音低沉沙哑）“十年前东洋海寇夜袭泉州港，老衲一个徒弟就是因为马步飘了半寸、桥手软了一分，被倭刀劈断琵琶骨死在老衲怀里……从那日起老衲便发誓，进了铁罗汉堂的苗子，宁可在山上被老衲折腾得哭爹喊娘，也绝不准下山去丢掉性命！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（眼眶微热，强忍双臂火辣剧痛抱拳低头）“弟子明白了！谢元通堂主成全！”',
    },
  ],
  choices: [
    {
      id: 'nsl08_rest_for_dawn',
      label: '【饮尽半盏壮骨药汤】静待明日破晓传授内家真气',
      tone: 'gold',
      effects: [
        { type: 'advanceShichen', count: 2 },
        { type: 'openScene', scene: SCENE_NSL_09_FIRST_NEIGONG },
      ],
    },
  ],
}

const SCENE_NSL_07_WATER_BUCKETS: StorySceneDef = {
  id: 'scene_nsl_07_water_buckets',
  title: '第七幕 · 挑水踏桩腕缚铁',
  subtitle: '淬火寒泉池 · 三十六房苦功',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '步入千斤铁鼎炼体坪东侧的【淬火寒泉池】，一股凛冽山泉寒气扑面而来。池畔错落竖着二十四根青苔斑驳的青石梅花桩，年方十八的护寺俗家弟子弘禅正赤着精壮上身，双臂套着八只熟铁环虎虎生风地打着木桩。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0674' },
      text: '（弘禅斜睨了你一眼，嗤笑一声踢过两只沉甸甸的杉木水桶与一对五斤黑铁腕环）“哟，又来个没练过气功的细皮嫩肉雏儿？听好了，堂主规矩：双腕套铁环，平臂挑满两桶寒泉走过梅花桩去灌铸剑水槽——胳膊敢往下垂一寸，桶底竹签便扎破你肚皮！挑不够百担，晚饭连稀粥都没得喝！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0909' },
      text: '（戒藏赶紧跑过来帮你扣好铁环，悄悄附耳传授诀窍）“别理弘禅师兄嘴臭，他当年第一天掉进池里喝饱了泉水呢！记住：眼睛莫看脚底青苔，看三丈外那尊青铜大鼎；气往小肚子里沉，大腿内侧夹紧如骑烈马！”',
    },
  ],
  choices: [
    {
      id: 'nsl07_use_boatman_salve',
      label: '【敷上陈阿公所赠海桐壮骨散】药力护住筋膜，咬牙挑桶踏上梅花桩！',
      subLabel: '刺桐渔家善缘显效 · 双臂抗寒倍增，额外提升【骑术】（腰马根基）+4',
      tone: 'jade',
      condition: { type: 'flag', flag: 'nsl_karma_boatman_salve', op: 'truthy' },
      effects: [
        { type: 'modifySkill', key: '骑术', delta: 4 },
        { type: 'openScene', scene: SCENE_NSL_08_COLD_SPRING_CG },
      ],
    },
    {
      id: 'nsl07_pure_endurance',
      label: '【凭一口傲气挑起百斤水桶】摔倒便爬起再踏，不信练不出这副铁桥！',
      subLabel: '苦熬半月筋骨 · 锤炼南拳四平大马桩功',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_NSL_08_COLD_SPRING_CG }],
    },
  ],
}

const SCENE_NSL_06_GATE_STANCE: StorySceneDef = {
  id: 'scene_nsl_06_gate_stance',
  title: '第六幕 · 山门试马棍敲膝',
  subtitle: '莆田南少林 · 铁桥禅师下马威',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '循着闽中九莲山盘山石阶拾级而上，层峦叠嶂间古刹飞檐隐现，东望沧海浩渺，山门演武坪上百名灰衣武僧齐声喝拳，“哈——嘿——”声浪震得松针簌簌坠落。你正取出开元寺木牌欲递，一名五十余岁、双臂乌黑精悍宛如生铁浇铸的高大武僧已手持青竹杖大步走来——正是南少林铁罗汉堂主「铁桥禅师」元通！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0164' },
      text: '“元觉师弟木牌上写你心性尚可？哼，戒律院看的是嘴皮子和心肠，我铁罗汉堂只看身子骨！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '话音未落，元通禅师手中竹杖快如疾电，看似轻描淡写地往你右脚外踝一勾一挑！你此时胸无半点内家真气、下盘虚浮，只觉脚底一麻，“噗通”一声摔了个结结实实的屁股蹲儿，引得旁侧几名外门武僧哄然轻笑。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0164' },
      text: '（元通禅师冷哼一声，竹杖顿在青石板上裂开寸许细纹）“呼吸浮在嗓子眼，马步飘得像水浮莲！就这副空架子也敢妄谈学拳除恶？未学打人，先学站稳！跟戒藏滚去【千斤铁鼎炼体坪 · 淬火寒泉池】挑够半个月山泉，什么时候站得竹杖勾不动了，再来见老衲！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: NANSHAOLIN_ENTRY_QUEST_ID,
      stepId: 'tripod_water_training',
    },
    {
      type: 'toast',
      text: '元通禅师嫌你毫无内家桩功根基！请前往寺内【千斤铁鼎炼体坪 · 淬火寒泉池】苦练挑水踏桩！',
      tone: 'warn',
      logTag: '九莲试马',
    },
  ],
}

// ============================================================================
// 第一卷：刺桐港风波 · 桑莲结佛缘（第 1～5 幕）
// ============================================================================

const SCENE_NSL_05_TO_JIULIAN: StorySceneDef = {
  id: 'scene_nsl_05_to_jiulian',
  title: '第五幕 · 草鞋木牌指九莲',
  subtitle: '开元寺东西双塔 · 少年同门约',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '辞别元觉首座走出舍利地宫，夕阳正将泉州东西双石塔拉出两道修长金影。小沙弥戒藏蹲在塔阶古榕下，从僧袋里摸出半块还冒着热气的烤红薯递给你，自己咔嚓咬了一口树皮般干硬的锅边糊。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0909' },
      text: '“喂，接着！今天在栈桥上算我戒藏欠你一份大人情。实话跟你说吧，我十二岁那年跟着爹出海采紫菜，船被东洋海寇烧了，是元觉师叔祖跳进海里把我捞起来送上九莲山的……所以我发过毒誓，早晚要练成铁桥硬功，叫泉州海面上再没渔家孩子没了爹娘！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0909' },
      text: '（戒藏拍掉手上的薯灰，把元觉首座签押的《九莲山挂单乌木牌》郑重塞进你怀里，眼睛亮晶晶的）“我押完这批血竭药材今晚就先挑担回山！你顺着泉州北面官道走百十里便是【莆田南少林】，到了【南少林百杰木人巷 · 九莲山门演武坪】亮出木牌，咱们山上见——可别被元通师伯吓跑喽！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'startQuest',
      questId: NANSHAOLIN_ENTRY_QUEST_ID,
      stepId: 'go_jiulian_gate',
    },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0909' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0165' }, delta: 10 },
    {
      type: 'toast',
      text: '已获元觉首座举荐乌木牌！请北上前往【莆田南少林 · 南少林百杰木人巷】拜山求艺！',
      tone: 'success',
      logTag: '刺桐结缘',
    },
  ],
}

const SCENE_NSL_04_KAIYUAN_TEA: StorySceneDef = {
  id: 'scene_nsl_04_kaiyuan_tea',
  title: '第四幕 · 桑莲双塔品苦茗',
  subtitle: '泉州开元寺东西双塔 · 大力尊者问心',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '随元觉首座与戒藏回到【泉州开元寺东西双塔】，桑莲古刹梵音低回。舍利地宫侧厢茶寮里，一只红泥小火炉正煮着粗老的武夷岩茶，苦涩回甘的茶香混着跌打药草味弥漫一室。元觉首座拈起方才鲨皮六遗落在栈桥的半截断铁牌，眉头微蹙。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0165' },
      text: '“鲨鱼纹下暗刻契丹叠字……果然不出老衲所料。近半年来，北朝暗桩苦于不通水战，竟重金雇募东洋浪人与黑鲨水匪在泉州近海劫掠金创血竭、刺探福建水师航道，山雨欲来啊。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0165' },
      text: '（元觉首座替你斟满一盏苦茶，温和而锐利的目光将你上下一扫，微微颔首）“小施主，老衲观你脚步轻浅、丹田尚无内家真气根基，方才在栈桥面对凶徒却能临危不惧。不知你千里迢迢南来闽海，心中所求究竟为何？”',
    },
  ],
  choices: [
    {
      id: 'nsl04_vow_protect_people',
      label: '【肃然拱手】“见不得海寇恶霸欺凌弱小，愿求一身硬桥真功夫护佑一方！”',
      subLabel: '侠义之心契合南少林镇海宗旨 · 侠义 +5',
      tone: 'gold',
      effects: [
        { type: 'setFlag', flag: 'nsl_heart_vow', value: 'chivalry' },
        { type: 'modifyChivalry', delta: 5, reason: '开元寺双塔立志靖海护民' },
        { type: 'openScene', scene: SCENE_NSL_05_TO_JIULIAN },
      ],
    },
    {
      id: 'nsl04_vow_zen_martial',
      label: '【澄心合十】“久仰南少林禅武合一、由外入内之妙，特来参禅求道！”',
      subLabel: '向道之心虔诚 · 经义 +4',
      tone: 'jade',
      effects: [
        { type: 'setFlag', flag: 'nsl_heart_vow', value: 'zen' },
        { type: 'modifySkill', key: '经义', delta: 4 },
        { type: 'openScene', scene: SCENE_NSL_05_TO_JIULIAN },
      ],
    },
    {
      id: 'nsl04_vow_temper_body',
      label: '【坦荡直言】“小子手无缚鸡之力，不甘庸碌一生，愿吃尽百般苦锤炼筋骨！”',
      subLabel: '质朴赤诚不作伪 · 元觉首座大为赞赏',
      tone: 'primary',
      effects: [
        { type: 'setFlag', flag: 'nsl_heart_vow', value: 'temper' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0165' }, delta: 8 },
        { type: 'openScene', scene: SCENE_NSL_05_TO_JIULIAN },
      ],
    },
  ],
}

const SCENE_NSL_03_YUANJUE_ARRIVES: StorySceneDef = {
  id: 'scene_nsl_03_yuanjue_arrives',
  title: '第三幕 · 金刚折棍散群丑',
  subtitle: '刺桐港千帆栈桥 · 高僧显圣',
  mandatory: true,
  beats: [
    {
      speaker: SPEAKER_SHAPILIU,
      text: '“好哇！不知死活的外乡野小子，敢坏老子黑鲨帮的买卖！小的们，抄分水刺，连那小秃驴一块儿剁了喂海鱼！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '四五名恶汉正待拔刃扑上，栈桥尽头忽传来一声苍浑平和的“阿弥陀佛”。那声音并不如何响亮，却压过了满港海潮喧嚣，震得众恶汉耳膜嗡嗡作响！只见一名身穿洗白灰布僧衣、身材魁伟的中年禅师携着铁棍值守僧戒山缓步踏上栈桥——正是驻锡泉州开元寺的南少林戒律首座「大力尊者」元觉！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '鲨皮六色厉内荏，抡起碗口粗的熟铜包头齐眉棒当胸便捅。元觉首座连眼皮都未抬一下，仅伸出右手食中二指轻轻一搭一捏——“咯吱”一声令人牙酸的闷响，坚硬无比的熟铜棒头竟如软泥般被生生捏出两道三分深的指印凹槽！',
    },
    {
      speaker: SPEAKER_SHAPILIU,
      text: '（鲨皮六骇得魂飞魄散，撒手弃棒连滚带爬跳下舢板，腰间一块黑铁腰牌跌碎半截在栈桥上）“大……大力金刚指！风紧扯呼！”',
    },
    {
      speaker: SPEAKER_CHEN_AGONG,
      text: '（劫后余生的陈阿公拉着孙女阿珠千恩万谢，颤巍巍从药篓底层摸出一包油纸紧裹的秘制药粉塞入你手中）“恩公大德！老汉无以为报，这包流求老礁采制的《海桐皮壮骨散》最能活血护骨，恩公若上山习武定用得着！”',
    },
  ],
  choices: [
    {
      id: 'nsl03_follow_yuanjue',
      label: '【收下药散扶起戒藏】随元觉首座移步开元寺双塔叙话',
      tone: 'primary',
      effects: [
        { type: 'setFlag', flag: 'nsl_karma_boatman_salve', value: true },
        { type: 'teleportPlayer', regionId: 'quanzhou', buildingId: 'qz_kaiyuan', spotId: 'qz_kaiyuan_main' },
        { type: 'openScene', scene: SCENE_NSL_04_KAIYUAN_TEA },
      ],
    },
  ],
}

const SCENE_NSL_02_FOUR_WAYS: StorySceneDef = {
  id: 'scene_nsl_02_four_ways',
  title: '第二幕 · 四路解围显本色',
  subtitle: '千帆栈桥 · 无武亦存侠骨',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '鲨皮六一脚踹翻竹匾，满筐殷红名贵的血竭药脂眼看便要连同百斤樟木药箱一起砸在跌倒的陈阿公与小沙弥戒藏身上！四周番商脚夫俱畏惧黑鲨水匪淫威，噤若寒蝉不敢上前。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '此时的你初涉江湖，丹田内并无高深内功傍身，亦未习得名门精妙招式；然而眼见白发渔翁与少年沙弥受辱将伤，胸中一股热血直冲顶门——电光石火之间，你当机立断：',
    },
  ],
  choices: [
    {
      id: 'nsl02_aptitude_bone',
      label: '【天生铜肩 · 硬桥托箱】抢步沉腰，以血肉双肩硬生生扛住坠落的百斤樟木药箱！（根骨 ≥ 60）',
      subLabel: '重资质分支 · 筋骨神力镇住全场，结下深厚同门与渔家善缘',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '根骨', min: 60 },
      effects: [
        { type: 'setFlag', flag: 'nsl_aptitude_route', value: 'bone' },
        { type: 'modifyChivalry', delta: 6, reason: '刺桐港赤手托住百斤药箱护佑渔翁' },
        { type: 'openScene', scene: SCENE_NSL_03_YUANJUE_ARRIVES },
      ],
    },
    {
      id: 'nsl02_aptitude_wit',
      label: '【明察秋毫 · 拨算拆秤】一把夺过杆秤，当众敲开灌水银的空心秤锤算清假账！（悟性 ≥ 60 或算术 ≥ 35）',
      subLabel: '重资质分支 · 算术 +4，满港番商哗然唾骂恶牙',
      tone: 'jade',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 60 },
          { type: 'skillAtLeast', key: '算术', min: 35 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'nsl_aptitude_route', value: 'wit' },
        { type: 'modifySkill', key: '算术', delta: 4 },
        { type: 'openScene', scene: SCENE_NSL_03_YUANJUE_ARRIVES },
      ],
    },
    {
      id: 'nsl02_aptitude_charm',
      label: '【凛然正气 · 条律喝止】朗声背诵《皇祐市舶司条法》，喝问鲨皮六敢否对簿公堂！（颜值 ≥ 60 或辩才 ≥ 35）',
      subLabel: '重资质分支 · 辩才 +4，气度折服满埠海商',
      tone: 'primary',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '颜值', min: 60 },
          { type: 'skillAtLeast', key: '辩才', min: 35 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'nsl_aptitude_route', value: 'charm' },
        { type: 'modifySkill', key: '辩才', delta: 4 },
        { type: 'openScene', scene: SCENE_NSL_03_YUANJUE_ARRIVES },
      ],
    },
    {
      id: 'nsl02_bond_hongmen_zhenyuan',
      label: '【同脉亮号 · 洪门镇远】亮出闽粤南拳同道字号，喝令黑鲨喽啰退下！（镇远镖局/洪门武馆或持举荐帖）',
      subLabel: '门派宿缘分支 · 声望 +8，林镇海与南少林同脉生敬',
      tone: 'gold',
      condition: {
        type: 'any',
        conditions: [
          { type: 'inSect', sectId: 'SECT-24' },
          { type: 'inSect', sectId: 'SECT-27' },
          { type: 'hasItem', itemId: 'ITM-MSC-005' },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'nsl_bond_hongmen', value: true },
        { type: 'modifyRenown', delta: 8, reason: '刺桐港亮出南拳镖路字号护住老弱' },
        { type: 'openScene', scene: SCENE_NSL_03_YUANJUE_ARRIVES },
      ],
    },
    {
      id: 'nsl02_aptitude_grit',
      label: '【赤手血性 · 横身受棍】纵无半点武功，亦张开双臂扑在老人身前硬挨这一记砸击！',
      subLabel: '草根侠骨线（不限资质） · 侠义 +10，结下陈阿公与戒藏生死之恩',
      tone: 'danger',
      effects: [
        { type: 'setFlag', flag: 'nsl_aptitude_route', value: 'grit' },
        { type: 'modifyChivalry', delta: 10, reason: '手无寸铁仍以血肉之躯替刺桐渔翁挡灾' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0909' }, delta: 10 },
        { type: 'openScene', scene: SCENE_NSL_03_YUANJUE_ARRIVES },
      ],
    },
  ],
}

const SCENE_NSL_01_PORT_BULLY: StorySceneDef = {
  id: 'scene_nsl_01_port_bully',
  title: '第一幕 · 刺桐潮急欺老弱',
  subtitle: '泉州府 · 刺桐港万国番坊',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '大宋皇祐二年，泉州刺桐港海风咸湿，红砖番坊外千帆竞发，大食香料与闽南乌龙茶香交织满街。你信步走到【千帆栈桥 · 装卸埠】旁，忽听前方人群喧哗——几名赤膊刺青的港埠泼皮正围着一对衣衫打满补丁的渔家爷孙，为首恶牙「鲨皮六」手里掂着一杆大铜秤，唾沫横飞。',
    },
    {
      speaker: SPEAKER_SHAPILIU,
      text: '“老东西，少在这儿哭穷！你们爷孙俩从流求外海采回来的这篓麒麟血竭，受了潮只抵得上十三斤！扣掉本行今年加收的『靖海船头规银』，这整篓上等血竭归爷们，你还倒欠我三贯铜钱！”',
    },
    {
      speaker: SPEAKER_AZHU,
      text: '（渔家少女阿珠紧紧护住竹篓，急得眼圈通红）“你胡说！这是阿公冒着九死一生的暗礁风浪采来、专供南少林寺配制金创伤药的足秤干货，明明是你在秤锤和麻绳里泡了浓盐水压秤！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0909' },
      text: '（人群中冲出一名十五岁的灰衣小沙弥——正是奉命下山收药的南少林担柴沙弥戒藏！他气得满脸通红，横起桑木扁担拦在前面）“光天化日讹诈渔家救命药钱，还要不要脸！小僧今日偏不让你抢！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '岂料戒藏入寺未久，只学过几手挑柴粗把式，并无内功根基；鲨皮六狞笑一声，一记恶虎掏心重拳砸在扁担正中，震得小沙弥虎口渗血、连退五步跌坐在湿滑栈桥上！',
    },
  ],
  choices: [
    {
      id: 'nsl01_step_forward',
      label: '【拨开围观人群上前】“慢着！朗朗乾坤，岂容尔等仗势欺人！”',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_NSL_02_FOUR_WAYS }],
    },
  ],
}

/**
 * 若玩家直接在莆田南少林山上向高僧询问拜师，给出一段九莲山知客指引，平滑切入泉州刺桐港第一幕。
 */
const SCENE_NSL_PRELUDE_FROM_MOUNTAIN: StorySceneDef = {
  id: 'scene_nsl_prelude_from_mountain',
  title: '序引 · 九莲禅林下院试缘',
  subtitle: '莆田南少林 · 知客指引',
  beats: [
    {
      speaker: { kind: 'interactedNpc' },
      text: '“阿弥陀佛。少侠欲拜入我莆田南少林？我寺立刹闽中九莲山，武学首重筋骨心性与护民善缘，历来新晋弟子皆须先经邻近【泉州府】下院戒律首座【元觉】尊者察看品行根器，持引牌方可入山受训。”',
    },
    {
      speaker: { kind: 'interactedNpc' },
      text: '“恰逢本寺小沙弥【戒藏】今日下山赴泉州【刺桐港万国番坊】采办流求血竭药材，海埠鱼龙混杂，少侠不妨即刻下山走一遭——佛门重缘，或许你的入门机缘便在刺桐潮声之中！”',
    },
  ],
  choices: [
    {
      id: 'nsl_prelude_go_port_now',
      label: '【即刻动身赴刺桐港】下山前往泉州刺桐港寻访机缘！',
      tone: 'gold',
      effects: [
        { type: 'teleportPlayer', regionId: 'quanzhou', buildingId: 'qz_port', spotId: 'qz_port_east' },
        { type: 'openScene', scene: SCENE_NSL_01_PORT_BULLY },
      ],
    },
    {
      id: 'nsl_prelude_later',
      label: '【暂缓片刻】待我自行备齐行装再下山前往泉州府',
      tone: 'default',
      effects: [],
    },
  ],
}

export const NANSHAOLIN_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: NANSHAOLIN_ENTRY_QUEST_ID,
    title: '刺桐风起 · 铁桥问禅',
    category: 'sect_entry',
    factionId: 'SECT-04',
    regionId: 'nanshaolin',
    recommendedRealm: '不入流（零内功零武学开局友好 · 剧情传功筑基）',
    maxOpponentRealm: '三流下品（宗门考校点到为止，胜败皆可通关）',
    recommendedNote:
      '专为零武学根基少侠打造的二十幕港式南拳入门长卷：前八幕零战斗重资质与市井善缘，第九幕因材施教传授并自动运使内功与南派拳棍，历经刺桐港雨夜护民与百杰木人巷破关，自选【清修武僧】或【护寺俗家】拜入莆田南少林！',
    startHint:
      '前往【泉州府 · 刺桐港万国番坊】或【泉州开元寺东西双塔】（或直接赴【莆田南少林】向寺中僧众打听拜山门径），即可开启二十幕南少林入门长卷。',
    startLocation: {
      regionId: 'quanzhou',
      buildingId: 'qz_port',
      spotId: 'qz_port_east',
      customLabel: '泉州府 · 刺桐港万国番坊（或开元寺 / 南少林山门）',
    },
    startCondition: NANSHAOLIN_START_CONDITION,
    summary:
      '皇祐二年海风猎猎，初入江湖、尚无内功傍身的你，在泉州刺桐港栈桥仗义化解黑鲨恶牙对采药渔翁陈阿公与小沙弥戒藏的欺凌，亲睹南少林戒律首座元觉“大力金刚指”捏凹熟铜棍的绝世神威。持引牌登临莆田九莲山后，于铁桥禅师元通门下经历挑水踏梅花桩、寒泉浸铁腕之苦功，因材施教破零领悟第一门内功与南拳。及至秋潮暴雨之夜，东洋浪人勾结北朝暗桩夜袭刺桐药栈，你以前番善缘借乌篷小舟奇袭，以初成铁桥硬架倭刀护住同门，终闯过百杰木人巷十二关，于九莲大雄宝殿敬奉武夷岩茶，堂堂正正归位南少林！',
    initialStepId: 'go_jiulian_gate',
    steps: {
      go_jiulian_gate: {
        id: 'go_jiulian_gate',
        title: '乌木引牌 · 初登九莲',
        objective:
          '已在泉州刺桐港与小沙弥【戒藏】结下患难之谊，并获开元寺戒律首座【元觉】赐予挂单乌木牌。请北上前往【莆田南少林 · 南少林百杰木人巷（九莲山门演武坪）】呈牌拜山。',
        nextHint: '大地图前往【莆田南少林】，进入【南少林百杰木人巷】即可触发山门试马剧情。',
        targetLocation: {
          regionId: 'nanshaolin',
          buildingId: 'nsl_wooden',
          spotId: 'nsl_wooden_west',
        },
      },
      tripod_water_training: {
        id: 'tripod_water_training',
        title: '寒泉铁腕 · 挑水扎马',
        objective:
          '铁罗汉堂主【元通】点破你尚无内家桩功根基，命你与【戒藏】前往【千斤铁鼎炼体坪 · 淬火寒泉池】苦练铁环挑水与四平大马，熬出南派桥手筋骨。',
        nextHint: '进入莆田南少林【千斤铁鼎炼体坪】（或与【弘禅】/【元通】对话）开启筑基苦修与传功。',
        targetLocation: {
          regionId: 'nanshaolin',
          buildingId: 'nsl_tripod',
          spotId: 'nsl_tripod_east',
        },
      },
      night_rescue_port: {
        id: 'night_rescue_port',
        title: '刺桐夜雨 · 铁桥护港',
        objective:
          '八月望日大潮之夜，东洋浪人勾结黑鲨水匪突袭泉州药栈并绑架老船工陈阿公！请速随【戒藏】、【弘禅】下山赶赴【泉州府 · 刺桐港万国番坊】后栈救援！',
        nextHint: '速返【泉州府】，进入【刺桐港万国番坊（望流求海道）】触发雨夜栈桥决战！',
        targetLocation: {
          regionId: 'quanzhou',
          buildingId: 'qz_port',
          spotId: 'qz_port_west',
        },
      },
      wooden_alley_trial: {
        id: 'wooden_alley_trial',
        title: '百杰木巷 · 破关受考',
        objective:
          '刺桐港之危已解，你死守铁桥之举获元觉、元通两位禅师力荐！请返回【莆田南少林 · 南少林百杰木人巷】向达摩堂主【元海】请开初阵十二铜皮木人关！',
        nextHint: '前往莆田南少林【南少林百杰木人巷】，与达摩堂主【元海】或【戒藏】对话闯关。',
        targetLocation: {
          regionId: 'nanshaolin',
          buildingId: 'nsl_wooden',
          spotId: 'nsl_wooden_main',
        },
      },
      abbot_tea_ceremony: {
        id: 'abbot_tea_ceremony',
        title: '九莲晨钟 · 宝殿奉茶',
        objective:
          '已凭一身硬桥真功夫闯出百杰木人巷！请移步【九莲大雄宝殿 · 大雄正殿】拜谒南少林方丈【元苦】，敬奉武夷岩茶并择定【清修武僧】或【护寺俗家】衣钵！',
        nextHint: '前往莆田南少林【九莲大雄宝殿】，与方丈【元苦】对话完成入门大典。',
        targetLocation: {
          regionId: 'nanshaolin',
          buildingId: 'nsl_main',
          spotId: 'nsl_main_main',
        },
      },
    },

    locationTriggers: [
      // 阶段 1 -> 踏入莆田南少林【百杰木人巷（含九莲山门）】自动触发第 6 幕山门试马
      {
        id: 'trig_nsl_enter_mountain_gate',
        regionId: 'nanshaolin',
        buildingId: 'nsl_wooden',
        onceFlag: 'nsl_gate_stance_triggered',
        condition: {
          type: 'questStatus',
          questId: NANSHAOLIN_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'go_jiulian_gate',
        },
        effects: [{ type: 'openScene', scene: SCENE_NSL_06_GATE_STANCE }],
      },
      // 阶段 2 -> 踏入【千斤铁鼎炼体坪】自动触发第 7～10 幕苦练传功与试手
      {
        id: 'trig_nsl_enter_tripod_yard',
        regionId: 'nanshaolin',
        buildingId: 'nsl_tripod',
        onceFlag: 'nsl_tripod_training_triggered',
        condition: {
          type: 'questStatus',
          questId: NANSHAOLIN_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'tripod_water_training',
        },
        effects: [{ type: 'openScene', scene: SCENE_NSL_07_WATER_BUCKETS }],
      },
      // 阶段 3 -> 驰援踏入泉州【刺桐港万国番坊】自动触发第 12～15 幕雨夜决战
      {
        id: 'trig_nsl_night_port_rescue',
        regionId: 'quanzhou',
        buildingId: 'qz_port',
        onceFlag: 'nsl_night_port_triggered',
        condition: {
          type: 'questStatus',
          questId: NANSHAOLIN_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'night_rescue_port',
        },
        effects: [{ type: 'openScene', scene: SCENE_NSL_12_BOATMAN_KARMA }],
      },
    ],

    spotActions: [
      // 刺桐港万国番坊 · 千帆栈桥建筑奇遇入口
      {
        id: 'spot_nsl_start_at_port',
        label: '仗义上前 · 栈桥血竭药篓风波',
        badge: '南少林机缘',
        subtitle: '开启二十幕港式南拳入门长卷《刺桐风起 · 铁桥问禅》',
        tone: 'gold',
        regionId: 'quanzhou',
        buildingId: 'qz_port',
        spotId: 'qz_port_east',
        visibleWhen: NANSHAOLIN_START_CONDITION,
        effects: [{ type: 'openScene', scene: SCENE_NSL_01_PORT_BULLY }],
      },
      // 泉州开元寺双塔 · 宝塔底层入口（平滑转入刺桐港收药风波）
      {
        id: 'spot_nsl_start_at_kaiyuan',
        label: '寻访下院 · 探听南少林求艺机缘',
        badge: '南少林机缘',
        subtitle: '随开元寺僧众赴刺桐港接应采药沙弥戒藏',
        tone: 'gold',
        regionId: 'quanzhou',
        buildingId: 'qz_kaiyuan',
        spotId: 'qz_kaiyuan_main',
        visibleWhen: NANSHAOLIN_START_CONDITION,
        effects: [
          { type: 'teleportPlayer', regionId: 'quanzhou', buildingId: 'qz_port', spotId: 'qz_port_east' },
          { type: 'openScene', scene: SCENE_NSL_01_PORT_BULLY },
        ],
      },
      // 九莲山门演武坪景点入口
      {
        id: 'spot_nsl_start_at_mountain_gate',
        label: '叩拜山门 · 打听南少林下院试缘',
        badge: '南少林机缘',
        subtitle: '遵九莲山门规，赴邻近泉州刺桐港接应采药沙弥戒藏',
        tone: 'gold',
        regionId: 'nanshaolin',
        buildingId: 'nsl_wooden',
        spotId: 'nsl_wooden_west',
        visibleWhen: NANSHAOLIN_START_CONDITION,
        effects: [
          { type: 'teleportPlayer', regionId: 'quanzhou', buildingId: 'qz_port', spotId: 'qz_port_east' },
          { type: 'openScene', scene: SCENE_NSL_01_PORT_BULLY },
        ],
      },
    ],

    npcActions: [
      // 1a) 在泉州府找元觉（NPC-0165）、戒山（NPC-0982）或林镇海（NPC-0286）直接开启第 1 幕
      {
        id: 'act_nsl_quanzhou_npc_start',
        label: '铁桥问禅 · 赴刺桐港相助采药沙弥（南少林入门）',
        badge: '南少林入门',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0165', 'NPC-0982', 'NPC-0286'] },
            NANSHAOLIN_START_CONDITION,
          ],
        },
        effects: [
          { type: 'teleportPlayer', regionId: 'quanzhou', buildingId: 'qz_port', spotId: 'qz_port_east' },
          { type: 'openScene', scene: SCENE_NSL_01_PORT_BULLY },
        ],
      },
      // 1b) 若玩家直接跑上莆田南少林找任意 SECT-04 僧众（排除已在泉州的元觉/戒山，避免重复按钮），弹出知客序引送往刺桐港
      {
        id: 'act_nsl_mountain_npc_start',
        label: '叩拜九莲山门 · 求赐南少林入门试缘',
        badge: '南少林入门',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-04'] },
            {
              type: 'not',
              condition: { type: 'targetNpcMatch', npcIds: ['NPC-0165', 'NPC-0982'] },
            },
            NANSHAOLIN_START_CONDITION,
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_NSL_PRELUDE_FROM_MOUNTAIN }],
      },
      // 2) 阶段 go_jiulian_gate 兜底对话按钮（找元通/戒藏/元海均可触发第 6 幕）
      {
        id: 'act_nsl_present_wood_plaque',
        label: '呈验开元寺挂单乌木牌 · 拜山受训',
        badge: '九莲试马',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-04'] },
            {
              type: 'questStatus',
              questId: NANSHAOLIN_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'go_jiulian_gate',
            },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'nsl_gate_stance_triggered', value: true },
          { type: 'openScene', scene: SCENE_NSL_06_GATE_STANCE },
        ],
      },
      // 3) 阶段 tripod_water_training 兜底按钮（找元通/弘禅/戒藏均可开启寒泉挑水）
      {
        id: 'act_nsl_start_tripod_water',
        label: '腕扣铁环 · 赴寒泉梅花桩挑水筑基',
        badge: '铁桥苦功',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0164', 'NPC-0674', 'NPC-0909', 'NPC-0201'] },
            {
              type: 'questStatus',
              questId: NANSHAOLIN_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'tripod_water_training',
            },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'nsl_tripod_training_triggered', value: true },
          { type: 'openScene', scene: SCENE_NSL_07_WATER_BUCKETS },
        ],
      },
      // 4) 阶段 wooden_alley_trial：找达摩堂主元海（NPC-0200）或戒藏（NPC-0909）闯百杰木人巷
      {
        id: 'act_nsl_challenge_wooden_alley',
        label: '请开百杰木人巷 · 硬桥闯初阵十二关',
        badge: '木人巷大考',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0200', 'NPC-0909', 'NPC-0620'] },
            {
              type: 'questStatus',
              questId: NANSHAOLIN_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'wooden_alley_trial',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_NSL_16_ENTER_ALLEY }],
      },
      // 5) 阶段 abbot_tea_ceremony：找九莲大雄宝殿方丈元苦（NPC-0124）或藏经首座元空（NPC-0201）奉茶入门
      {
        id: 'act_nsl_abbot_tea_ceremony',
        label: '九莲宝殿奉岩茶 · 择定僧俗衣钵入门',
        badge: '铁桥归宗',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0124', 'NPC-0201'] },
            {
              type: 'questStatus',
              questId: NANSHAOLIN_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'abbot_tea_ceremony',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_NSL_19_TEA_CEREMONY }],
      },
    ],
  },
]
