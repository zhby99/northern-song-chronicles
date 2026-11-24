import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q34_QUEST_ID } from './shaolinTwinMonkMurderQuest'

const SPEAKER_BAIMA_ABBOT: StorySpeakerSpec = {
  kind: 'custom',
  name: '知客僧 · 慧明',
  title: '洛阳白马寺知客',
  factionName: '洛阳白马寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

const SPEAKER_COURIER_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '罗汉堂值守僧 · 慧觉',
  title: '少林急信武僧',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
}

const SPEAKER_SHADOW_LEAD: StorySpeakerSpec = {
  kind: 'custom',
  name: '燕漠残锋',
  title: '神秘暗影死士首领',
  factionName: '暗影死士',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

function buildShadowLeadBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ34_SHADOW_LEAD',
    name: '燕漠残锋',
    title: '神秘暗影死士首领',
    realm: '宗师下品',
    factionName: '暗影死士',
    sectRank: 0,
    sectRankLabel: '玄影死士',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“乔峰杀师叛义，少林人证皆死！尔等休想留得活口走出东庑武库！”',
    stats: { hp: 4550, mp: 4280, agi: 77, res: 70 },
    talents: { bone: 84, comprehension: 80, charm: 48 },
    equippedArts: { neigong: 'MA-025', move1: 'MA-043', move2: 'MA-071' },
    learnedArts: [
      { artId: 'MA-025', level: 8 },
      { artId: 'MA-043', level: 8 },
      { artId: 'MA-071', level: 8 },
    ],
  })
}

function buildShadowBladeAide(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ34_SHADOW_AIDE',
    name: '玄影断魂客',
    title: '暗影死士副手',
    realm: '一流上品',
    factionName: '暗影死士',
    sectRank: 0,
    sectRankLabel: '暗影死士',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“主上吩咐，不留半点掌印证物！杀！”',
    stats: { hp: 3320, mp: 2980, agi: 73, res: 58 },
    talents: { bone: 78, comprehension: 68, charm: 38 },
    equippedArts: { neigong: 'MA-081', move1: 'MA-062', move2: 'MA-091' },
    learnedArts: [
      { artId: 'MA-081', level: 7 },
      { artId: 'MA-062', level: 7 },
      { artId: 'MA-091', level: 7 },
    ],
  })
}

export const SHAOLIN_Q34_SCENES: Record<string, StorySceneDef> = {
  scene_slq34_01: {
    id: 'scene_slq34_01',
    title: '第一幕 · 霜钟骤鸣',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山连日寒雾弥漫，寅时未过，大雄宝殿外忽传三声凄厉急促的铜钟哀鸣——那是少林唯有「玄」字辈高僧圆寂或遭难才会撞响的丧钟！'),
      N('你疾步踏入正殿，只见香烟凝滞，【玄慈】方丈紧捏一封沾血洛阳急笺指节发白，【玄难】、【玄痛】等诸院首座皆面色铁青肃立两旁。'),
      S('NPC-0112', '（双目微闭，嗓音沙哑如裂帛）“阿弥陀佛……玄悲师弟昨夜赴洛阳【白马寺】议事，竟遇害身亡了。”'),
      S('NPC-0127', '（须发皆张，拳节咯咯作响）“最骇人听闻的是白马寺验状所言——玄悲师弟全身并无刀剑外伤，乃是被一记威猛无匹的『大韦陀杵』击碎心脉而死！那正是他自己苦修四十年的成名绝技！”'),
      S('NPC-0156', '（冷哼一声，眸光阴沉）“用自家绝技杀了自己，天下间若非本门出了叛徒，便只有姑苏慕容氏『以彼之道、还施彼身』！方丈，此事万不可姑息！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_02', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_02: {
    id: 'scene_slq34_02',
    title: '第二幕 · 奉命西行',
    subtitle: '大雄正殿 · 临行受命',
    mandatory: true,
    beats: [
      S('NPC-0112', '（缓缓睁眼，目光如古井幽深落在你身上）“玄痛师弟切勿妄断。三十年前的旧影近来隐隐翻涌，老衲须坐镇嵩山以防调虎离山之计。”'),
      S('NPC-0112', '“你在少林潜修多年，经义通透且心思缜密，向不盲从流言。老衲命你星夜驰赴【洛阳府 · 白马寺】，亲手验看玄悲师弟法体与殿中遗痕，务必查清那记『大韦陀杵』究竟出自何人之手！”'),
      N('殿外秋风卷过千年银杏，洛嵩古道间仿佛早已暗布无数眼线。临行辞别方丈之际，你暗自定下此番赴洛查案的章法——'),
    ],
    choices: [
      {
        id: 'slq34_approach_stealth',
        label: '【隐秘勘察】屏退随从单骑入洛，静心验伤莫打草惊蛇',
        subLabel: '沉静破局，保全线索不令真凶警觉（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q34_approach', value: 'stealth' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          { type: 'startQuest', questId: SHAOLIN_Q34_QUEST_ID, stepId: 'luoyang_xuanbei' },
          setStep(SHAOLIN_Q34_QUEST_ID, 'luoyang_xuanbei'),
          toast('已开启《大智大悲 · 身死之谜》！请星夜驰赴【洛阳府 · 白马寺 · 白马大佛宝殿】！', 'talk', '大智大悲'),
        ],
      },
      {
        id: 'slq34_approach_fierce',
        label: '【雷霆追索】沿途遍访少林暗桩，誓将弑僧凶徒缉拿归案',
        subLabel: '怒目追凶，以震慑暗处觊觎宵小（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q34_approach', value: 'fierce' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          { type: 'startQuest', questId: SHAOLIN_Q34_QUEST_ID, stepId: 'luoyang_xuanbei' },
          setStep(SHAOLIN_Q34_QUEST_ID, 'luoyang_xuanbei'),
          toast('已开启《大智大悲 · 身死之谜》！请星夜驰赴【洛阳府 · 白马寺 · 白马大佛宝殿】！', 'talk', '大智大悲'),
        ],
      },
    ],
  },

  scene_slq34_03: {
    id: 'scene_slq34_03',
    title: '第三幕 · 释源惨变',
    subtitle: '洛阳府 · 白马寺 · 白马大佛宝殿',
    illustrationUrl: '/assets/quests/sl_34_xuanbei_death.jpg',
    illustrationCaption: '洛阳白马寺大佛宝殿 · 玄悲大师惨死于本门「大韦陀杵」反噬之下，殿柱裂纹犹存',
    mandatory: true,
    beats: [
      N('素来香火鼎盛的洛阳白马寺此刻山门紧闭、满院肃杀。步入大佛宝殿，正中白布下停放着【玄悲】大师法体，侧畔一根合抱粗的楠木殿柱朱漆尽碎，一道深逾寸许的杵掌裂痕贯入柱心！'),
      S(SPEAKER_BAIMA_ABBOT, '（面色惨白，合十颤声道）“阿弥陀佛，嵩山高僧终于到了！昨夜三更殿内忽传一声佛门狮吼与沉雷闷响，小僧等人提灯闯入时，玄悲大师已气绝倒地，案桌烛台竟连半分倾倒也无！”'),
      N('正当你掀开白布凝视玄悲大师圆睁惊骇的双目时，殿外忽响起沉稳雄迈的脚步声。一道肩披粗布灰袍、浓眉虎目的魁伟身影大步跨入——竟是威震天下的北【乔峰】！'),
      S('NPC-0110', '（拱手深揖，目光沉痛望向白布遗体）“这位少林大师请了！近来江湖流言四起，诬指乔某在江南中原连杀武林名宿。乔某循迹追查真凶至此，听闻玄悲大师遇害，特来一探究竟，绝无冒犯之意！”'),
      P('（见其坦荡磊落、气度如山，合十还礼）“乔帮主光明磊落，{ifFlagEq:sl_branch=layman|我虽是少林俗家护法，亦深信|贫僧奉方丈之命前来查验，亦深信}绝非暗箭伤人之辈。既同为追查真凶，不如共验玄悲师叔遗伤！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_04', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_04: {
    id: 'scene_slq34_04',
    title: '第四幕 · 白马验伤',
    subtitle: '白马大佛宝殿 · 刑侦勘案',
    mandatory: true,
    beats: [
      N('你与乔峰分立白布两侧。玄悲大师胸口僧袍焦裂，隐现一道沉凝掌杵重印，然而四下青砖既无溅血脚印，楠木殿柱上的裂纹走向又显得极为古怪。'),
      N('乔峰眉头紧锁，先指殿柱又指遗体：“玄悲大师内力精纯，纵然不敌强敌，也绝不该连一招还手余地都没有。大师，你打算先从何处细查？”'),
    ],
    choices: [
      {
        id: 'slq34_forensic_bones',
        label: '【刑侦验骨】细察胸口掌印骨骼裂纹与柱痕受力走向',
        subLabel: '需算术 ≥ 55 或 经义 ≥ 80 · 推演内外两股劲力交锋轨迹',
        tone: 'gold',
        condition: {
          type: 'any',
          hint: '需算术 ≥ 55 或 经义 ≥ 80',
          conditions: [
            { type: 'skillAtLeast', key: '算术', min: 55 },
            { type: 'skillAtLeast', key: '经义', min: 80 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q34_xuanbei_clue', value: true },
          openScene('scene_slq34_05', SHAOLIN_Q34_QUEST_ID),
        ],
      },
      {
        id: 'slq34_ask_witness',
        label: '【详询目击】追问白马寺值夜僧众昨夜异响与窗影经过',
        subLabel: '零门槛勘案 · 循寺僧证词还原昨夜三更惊变',
        tone: 'primary',
        effects: [openScene('scene_slq34_05', SHAOLIN_Q34_QUEST_ID)],
      },
    ],
  },

  scene_slq34_05: {
    id: 'scene_slq34_05',
    title: '第五幕 · 嵩山急羽',
    subtitle: '白马大佛宝殿 · 调虎离山',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q34_xuanbei_clue|你以指尖沿玄悲胸骨裂纹逐寸推算受力角度，赫然惊觉骨茬竟呈旋涡状向内回涌！两股劲力一刚一柔在膻中交汇——纯阳佛门杵劲确属玄悲亲发，却被一股圆转如斗转星移的阴柔奇劲原封不动折返倒灌，连他出招时换气滞涩的身法破绽亦被算得丝毫不差！|慧明颤声回忆：昨夜三更佛前长明灯焰曾诡异地旋转成涡，一道瘦长黑影掠过窗棂似燕翼轻翻，玄悲大师刚发出一声刚猛狮吼，便听那劲风仿佛撞上无形铜镜般轰然回炸，随即满殿死寂！}'),
      S('NPC-0110', '（虎目精光暴射，沉声震喝）“{ifFlag:sl_q34_xuanbei_clue|好精微的验骨眼力！|好诡异的回旋劲风！}凶手并非真的修成大韦陀杵，而是以『以彼之道、还施彼身』般的绝顶借力神功，将玄悲大师十成绝技反震回他心脉！只是慕容复年纪轻轻，内力绝接不下这等十成杵劲……”'),
      N('话音未落，殿外青石板骤然响起急促欲碎的马蹄声！一名满身血污的罗汉堂武僧连滚带爬撞入殿中，扑倒在地泣血嘶喊！'),
      S(SPEAKER_COURIER_MONK, '（嘶声泣血）“不好了！昨夜三更有一名蒙面绝顶强敌夜闯嵩山【罗汉堂】，玄苦师伯迎敌不过一合便被震碎心脉，胸口焦灼剧痛似遭刚猛无比的『燃木刀法』重击，此刻气若游丝、危在旦夕！”'),
      S('NPC-0110', '（如遭雷击，双拳猛然攥得青筋暴起）“什么？！玄苦大师乃乔某授业恩师！是谁敢闯少林罗汉堂暗算恩师？！”'),
      P('（脸色骤变，瞬间洞悉毒计）“不好！洛阳白马寺杀玄悲是调虎离山，真正杀机已直扑嵩山少林！乔帮主，立刻双骑星夜驰返罗汉堂，或许还能见玄苦师叔最后一面！”'),
    ],
    choices: [
      {
        id: 'slq34_rush_luohan',
        label: '嘱白马寺护灵归山，与乔峰星夜驰返【嵩山少林寺 · 罗汉堂演武正殿】',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q34_QUEST_ID, 'shaolin_xuanku'),
          toast('玄苦大师在罗汉堂危在旦夕！速返【十八铜人罗汉堂 · 罗汉堂演武正殿】！', 'warn', '大智大悲'),
        ],
      },
    ],
  },

  scene_slq34_06: {
    id: 'scene_slq34_06',
    title: '第六幕 · 罗汉示寂',
    subtitle: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
    illustrationUrl: '/assets/quests/sl_34_xuanku_farewell.jpg',
    illustrationCaption: '嵩山罗汉堂 · 玄苦大师弥留嘱托后溘然圆寂，乔峰跪榻悲恸，堂外寒鸦惊飞',
    mandatory: true,
    beats: [
      N('踏入罗汉堂演武正殿，浓重血腥与药气扑面而来。青砖龟裂丈余，药王院主【玄生】收回按在玄苦背心的双掌摇头长叹：“来人劲力刚猛霸道至极，震碎五脏六腑，纵有大还丹亦回天乏术……他硬撑最后一口真气，只为等乔施主与你一面。”'),
      S('NPC-0110', '（冲至榻前轰然双膝跪地，铁汉泪落如雨）“恩师！弟子乔峰来迟了！究竟是哪路奸贼用这等毒手伤您？！”'),
      S('NPC-0126', '（枯瘦五指艰难握紧乔峰手腕，嘴角溢出一缕黑血）“峰儿……众僧见老衲胸口灼裂，皆疑是本门『燃木刀法』……可老衲亲受那一击，才知他虽带少林招意，掌力却刚猛无俦如塞外狂风铁骑……三十年前雁门关外……”'),
      S('NPC-0126', '（浑浊双眸转向榻畔的你，泛起最后一缕慈和清光）“{ifQuestDone:QST-SECT-01-22|好徒侄，昔年老衲于此殿劈燃枯菩提木授你《燃木刀法》，托付燃木戒刀，你果然没有辜负老衲所望……|好孩子，老衲虽未亲授你燃木绝技，却素知你在罗汉堂与寺外护法忠义两全……}玄悲与老衲先后遭难绝非巧合……护好少林，莫让峰儿背负弑师之冤……”'),
      N('话音未落，玄苦大师唇角泛起一丝解脱淡笑，五指缓缓松开垂落榻侧。一代少林降魔尊者就此溘然圆寂！一日之间痛失「大韦陀僧」与「降魔尊者」，乔峰仰天长啸悲震梁尘，全寺僧众齐诵往生咒，悲声彻云！'),
    ],
    onFinishEffects: [
      { type: 'markNpcsDead', npcIds: ['NPC-0157', 'NPC-0126'] },
      openScene('scene_slq34_07', SHAOLIN_Q34_QUEST_ID),
    ],
  },

  scene_slq34_07: {
    id: 'scene_slq34_07',
    title: '第七幕 · 暗影嫁祸',
    subtitle: '罗汉堂廊道 · 东庑生变',
    mandatory: true,
    beats: [
      N('往生咒尚未诵毕，东庑碑帖武库院忽传一声凄厉巡山武僧惨呼！数道幽寒破空声陡袭正殿，几枚沾血的丐帮竹节暗器「叮当」钉死在罗汉堂朱漆门柱上！'),
      S('NPC-0127', '（脸色剧变，厉声喝道）“有人趁乱潜入东庑武库偷袭守僧，还故意留下丐帮暗器，分明要嫁祸乔施主！”'),
      P('（霍然起身，眸光冷冽如电）“好歹毒的连环计！先杀玄悲、玄苦，再趁乔帮主跪别恩师之际焚毁武库勘验旧档、栽赃嫁祸，坐实『乔峰弑师叛义』之恶名！乔帮主，随我杀向东庑碑帖武库院！”'),
      S('NPC-0110', '（拭去泪痕，降龙豪气排山倒海而起）“敢借我恩师之死往乔某身上泼脏水，真当乔某双掌无锋么！走，去东庑揪出这群藏头露尾的鼠辈！”'),
    ],
    choices: [
      {
        id: 'slq34_go_ambush',
        label: '疾赴【十八铜人罗汉堂 · 东庑碑帖武库院】截杀灭口死士',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q34_QUEST_ID, 'shadow_ambush'),
          toast('暗影死士潜入东庑企图焚档嫁祸！速赴【东庑碑帖武库院】截敌！', 'warn', '大智大悲'),
        ],
      },
    ],
  },

  scene_slq34_08: {
    id: 'scene_slq34_08',
    title: '第八幕 · 东庑伏兵',
    subtitle: '东庑碑帖武库院 · 战前破局抉择',
    mandatory: true,
    beats: [
      N('踏入东庑碑帖武库院，青石碑林间黑烟翻卷，几名蒙面死士正举火折焚烧少林历年武学勘验密档！为首瘦长黑衣人双袖如燕翼翻飞，周身散发着宗师下品阴森杀气，身侧副手玄影断魂客亦提刀封住退路！'),
      S(SPEAKER_SHADOW_LEAD, '（见你与乔峰杀至，冷笑连连）“来得正好！既撞破我燕漠残锋行藏，今日便叫少林高徒与北乔峰一同葬身火海——明日江湖只会传扬『乔峰大闹少林、弑师灭口』的佳话！”'),
      N('电光石火之间，你瞥见燕漠残锋右袖微沉、竟隐现与白马寺惨案如出一辙的借力换气起手式，而副手玄影断魂客正待听其号令合围扑上！'),
    ],
    choices: [
      {
        id: 'slq34_tactic_preempt',
        label: '【破绽先手】凭验伤所悉身法破绽抢攻断其暗号，1v1 独战燕漠残锋！',
        subLabel: '需白马寺验骨线索或实战身法 ≥ 70 · 乔峰趁隙隔开副手，避开双敌车轮',
        tone: 'gold',
        condition: {
          type: 'any',
          hint: '需在白马寺验骨查得回涌破绽，或实战身法 ≥ 70',
          conditions: [
            flag('sl_q34_xuanbei_clue', 'truthy'),
            { type: 'combatStatAtLeast', key: 'agility', min: 70 },
          ],
        },
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q34_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShadowLeadBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '玄苦师叔尸骨未寒，绝不可放任灭口死士首领逃遁！',
            introText: '【先手破伏】你抢步点断暗影合击暗号，乔峰趁势截开随从，你一对一独战宗师下品【燕漠残锋】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q34_ambush_tactic', value: 'preempt' },
              openScene('scene_slq34_09', SHAOLIN_Q34_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('燕漠残锋借力身法诡谲阴狠，暂借碑林掩护调匀气血后再战！', 'warn', '东庑破影'),
            ],
          },
        ],
      },
      {
        id: 'slq34_tactic_gauntlet',
        label: '【悲愤直闯】正面硬闯碑林破伏，车轮连战玄影断魂客与燕漠残锋！',
        subLabel: '零门槛正攻 · 车轮连战（一流上品 → 宗师下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q34_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShadowBladeAide() },
            extraOpponents: [{ kind: 'custom', npc: buildShadowLeadBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '玄苦师叔尸骨未寒，绝不可放任灭口死士逃遁！',
            introText: '【车轮连战 · 正面破伏】悲愤直闯碑林火海，连战暗影死士【玄影断魂客】与首领【燕漠残锋】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q34_ambush_tactic', value: 'gauntlet' },
              openScene('scene_slq34_09', SHAOLIN_Q34_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('暗影死士联手杀招狠辣，暂退碑廊调匀内息后再破死阵！', 'warn', '东庑破影'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq34_09: {
    id: 'scene_slq34_09',
    title: '第九幕 · 死士服毒',
    subtitle: '东庑碑帖武库院 · 搜得铁证',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q34_ambush_tactic=preempt|你料敌机先，一指抢断燕漠残锋斗转起手暗号！乔峰在碑林外一记「亢龙有悔」轰碎玄影断魂客钢刀，你则以浑厚佛门绝学死死压住燕漠残锋气脉，二十合内将其震翻于青石碑前！|血战碑林火海！你先硬破玄影断魂客快刀连环，复迎上宗师下品燕漠残锋诡谲借力身法，苦斗三十余合终借乔峰外围掌风策应，一举震断其护体真气将其擒于碑前！}'),
      S(SPEAKER_SHADOW_LEAD, '（嘴角溢血，忽发凄厉狂笑）“哈哈哈哈……晚了！少林千年的遮羞布，很快便要被天下群雄亲手扯下来了……主上三十年大计，岂是你们挡得住的！”'),
      N('话音未落，燕漠残锋猛然咬碎齿间毒囊，七窍渗黑气绝而亡！你急探其怀，竟摸出一枚刻着半朵残燕纹路的玄铁腰牌，以及几张密绘少林藏经阁暗道的泛黄旧图！'),
      S('NPC-0110', '（盯着那枚半燕玄铁腰牌，眉峰如刀锁紧）“半燕纹牌、藏经阁暗道图……白马寺玄悲大师法体今夜已护送回山，与玄苦恩师同停大雄正殿。走，请玄慈方丈点亮高烛，将二僧伤状并置细推！”'),
    ],
    choices: [
      {
        id: 'slq34_go_forensics',
        label: '携半燕腰牌与藏经阁暗图，赴【大雄正殿 · 佛前蒲团】孤烛验双案',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q34_QUEST_ID, 'candle_forensics'),
          toast('暗影死士已溃！请前往【大雄正殿 · 佛前蒲团】于孤烛下并置双案推演真凶！', 'success', '大智大悲'),
        ],
      },
    ],
  },

  scene_slq34_10: {
    id: 'scene_slq34_10',
    title: '第十幕 · 孤烛验双案',
    subtitle: '嵩山少林寺 · 大雄正殿 · 悬疑终极推演',
    mandatory: true,
    beats: [
      N('子夜大雄正殿紧闭山门，两排红烛孤明摇曳。白莲幡下并停着【玄悲】与【玄苦】两位高僧法体，案头摆着那枚半燕玄铁腰牌与藏经阁暗道图，【玄慈】、【玄难】与【乔峰】凝神静立烛畔。'),
      N('你举烛俯身，将两桩奇案并置眼前：其一，洛阳白马寺玄悲大师胸骨碎裂，死于自家成名绝学「大韦陀杵」反噬回涌之下；其二，嵩山罗汉堂玄苦大师胸口焦裂酷似自家绝学「燃木刀法」重击，细辨深处却杂以塞外狂风铁骑般的霸道掌力，且临终提及「三十年前雁门关」。'),
      S('NPC-0112', '（目光沉重，声音低缓而克制）“两桩惨案相隔仅一日一夜，一在洛阳白马寺，一在嵩山罗汉堂，且皆诡异地显出死者自家绝学之象。你亲历两处现场、又截获东庑死士遗物——依你之见，幕后真凶究竟何人？”'),
    ],
    choices: [
      {
        id: 'slq34_deduce_traitor',
        label: '“必是少林内部罗汉堂长老叛变，借本门绝技自相残杀！”',
        subLabel: '断定内鬼作祟，主张先清查罗汉堂诸僧',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q34_deduce_pick', value: 'traitor' },
          openScene('scene_slq34_11', SHAOLIN_Q34_QUEST_ID),
        ],
      },
      {
        id: 'slq34_deduce_truth',
        label: '“绝非本门叛徒！两案皆以死者自家绝学反杀，必是姑苏慕容氏『以彼之道还施彼身』或极熟藏经阁七十二绝技的绝世潜伏者所为！”',
        subLabel: '合勘双案反杀之奇与藏经阁暗图，直指慕容与阁中潜影',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q34_truth_deduced', value: true },
          { type: 'setFlag', flag: 'sl_q34_deduce_pick', value: 'truth' },
          openScene('scene_slq34_11', SHAOLIN_Q34_QUEST_ID),
        ],
      },
      {
        id: 'slq34_deduce_jiumozhi',
        label: '“必是屡屡觊觎少林七十二绝技的吐蕃国师鸠摩智一人所为！”',
        subLabel: '断定西域吐蕃番僧暗中偷袭，意在立威逼寺',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q34_deduce_pick', value: 'jiumozhi' },
          openScene('scene_slq34_11', SHAOLIN_Q34_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq34_11: {
    id: 'scene_slq34_11',
    title: '第十一幕 · 双掌辨影',
    subtitle: '大雄正殿 · 烛影惊心',
    illustrationUrl: '/assets/quests/sl_34_two_palms.jpg',
    illustrationCaption: '大雄正殿孤烛之下 · 与乔峰同辨两股截然不同的三十年暗影掌力：慕容斗转与契丹巨掌',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q34_deduce_pick=truth|此言一出，满殿烛火仿佛骤然一滞！玄难倒吸一口凉气失声变色，玄慈方丈更是浑身微颤、手中念珠险些崩断！你趁势将两道拓印掌纹摊于烛下：一为姑苏慕容「以彼之道、还施彼身」借大韦陀杵反杀玄悲，另一道虽伪作燃木烈劲、内里却宽大逾常人寸许，满溢塞外狂风铁骑般的三十载血仇死气，藏经阁中潜伏的绝顶高手恐怕还不止一人！|话音甫落，乔峰与玄难双双沉眉细勘烛下拓印，缓缓摇头补证。乔峰指着半燕腰牌与藏经阁暗道图沉声道：“若只是寺内叛徒或鸠摩智一人，怎会既有姑苏慕容『以彼之道还施彼身』反噬大韦陀杵之巧，又有玄苦恩师所言『三十年前雁门关、塞外狂风铁骑』般宽大霸烈的巨掌？杀害两位高僧的，必是极熟藏经阁七十二绝技的姑苏慕容老辈与另一位潜伏三十年的契丹绝世高手！”}'),
      S('NPC-0127', '（脸色煞白，颤声惊呼）“竟有这等绝世高手悄无声息潜伏我少林藏经阁数十年，把七十二绝技摸得一清二楚，还联手或各自借本门绝学反杀玄字辈高僧？！”'),
      S('NPC-0112', '（听见「藏经阁潜伏者」与「三十年前雁门关」，苍老面容霎时白如素纸，低宣佛号）“三十年前……雁门关……阿弥陀佛，该来的业果劫数，终究还是避不过了……”'),
      S('NPC-0110', '（向你重重抱拳深揖，眼中尽是敬重与义烈）“今夜若非与你并肩破死士、于烛下辨明双影真相，乔某纵浑身是嘴也洗不清弑师恶名！大恩不言谢——这两股三十年暗影既已浮出水面，少室山不日必有惊天巨浪，届时乔峰定当赴约而来！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_12', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_12: {
    id: 'scene_slq34_12',
    title: '第十二幕 · 案后呈报',
    subtitle: '大雄正殿 · 方略抉择',
    mandatory: true,
    beats: [
      N('送别乔峰后，你重返佛前，提笔将白马寺与罗汉堂两道致命伤痕的劲路、拓纹与东庑半燕腰牌细目录成一卷《双僧验伤秘录》，封存入大雄宝殿密档。'),
      S('NPC-0112', '（望着案头雪片般飞至的江湖英雄帖，长叹一声）“江湖各路已有风声，似有人借势邀约天下群雄齐聚少室山。面对潜伏藏经阁的绝世暗影与姑苏慕容疑云，你以为我少林眼下当如何应对？”'),
    ],
    choices: [
      {
        id: 'slq34_stance_secret_watch',
        label: '【秘查藏经阁】力主暗中布防藏经阁、秘察潜影，莫打草惊蛇',
        subLabel: '以静制动，外松内紧静候真凶现身（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q34_report_stance', value: 'secret_watch' },
          {
            type: 'branch',
            condition: flag('sl_q34_stance_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q34_stance_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq34_13', SHAOLIN_Q34_QUEST_ID),
        ],
      },
      {
        id: 'slq34_stance_lockdown',
        label: '【戒严彻查】主张全寺戒严，传檄中原彻查姑苏慕容氏与外敌暗桩',
        subLabel: '雷霆示威，绝不容宵小借势污蔑少林（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q34_report_stance', value: 'lockdown_murong' },
          {
            type: 'branch',
            condition: flag('sl_q34_stance_scored', 'truthy'),
            thenEffects: [],
            elseEffects: [
              { type: 'setFlag', flag: 'sl_q34_stance_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq34_13', SHAOLIN_Q34_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq34_13: {
    id: 'scene_slq34_13',
    title: '第十三幕 · 暗影既明',
    subtitle: '大雄正殿 · 黎明微光',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q34_report_stance=secret_watch|玄慈缓缓颔首，传令达摩、般若两院精锐暗守藏经阁秘道，明面上照常敞开山门以静制动；|玄难闻言慨然应诺，立刻调遣戒律、罗汉两院武僧严封山门要隘，并飞鸽各路查访姑苏慕容近日行踪；}大雄宝殿外晨雾渐散，一缕苍白曙光斜斜切过飞檐铜铃。'),
      N('{ifFlag:sl_q34_truth_deduced|玄难与玄慈皆对你今夜孤烛断案、一语切中慕容反杀与藏经阁潜伏者的卓绝智识赞叹不已，此卷秘录遂成日后藏经阁总决算之最重铁证。|虽历经波折，双案脉络终在孤烛之下水落石出，此卷秘录亦为日后藏经阁总决算埋下了最重伏笔。}'),
      P('（合上《双僧验伤秘录》，望向殿外山雨欲来的少室云海，目光沉毅如岳）“无论是姑苏慕容的以彼之道，还是蛰伏三十年的契丹暗影，既已露出破绽，便休想掀翻少林千年基业。玄悲、玄苦两位师叔在天之灵，请看弟子守住这座古刹！”'),
    ],
    choices: [
      {
        id: 'slq34_finish_reward',
        label: '封存《双僧验伤秘录》，静候少室山风云际会（完成）',
        tone: 'gold',
        effects: [
          {
            type: 'giveCombatExp',
            amount: 1050,
            reason: '勘破玄悲、玄苦二僧身死之谜并击退灭口暗影死士',
          },
          {
            type: 'branch',
            condition: flag('sl_q34_truth_deduced', 'truthy'),
            thenEffects: [
              {
                type: 'giveCombatExp',
                amount: 150,
                reason: '孤烛辨双案一语道破真凶脉络之智识嘉奖',
              },
            ],
            elseEffects: [],
          },
          { type: 'addSectContribution', amount: 300 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0110' },
            delta: 25,
          },
          { type: 'completeQuest', questId: SHAOLIN_Q34_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《大智大悲 · 身死之谜》！武学经验 +1050（破案额外+150）、门派贡献 +300、书 +1、经义 +1、乔峰好感 +25！',
            'success',
            '大智大悲',
          ),
        ],
      },
    ],
  },
}
