import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { GAIBANG_ENTRY_QUEST_ID } from './gaibangEntryQuest'

const EXTRA_SCENES: Record<string, StorySceneDef> = {}
function regScene(sc: StorySceneDef): string {
  EXTRA_SCENES[sc.id] = sc
  return sc.id
}

const SPEAKER_LAO_LI: StorySpeakerSpec = {
  kind: 'custom',
  name: '老拐子李',
  title: '丐帮四袋老乞儿',
  factionName: '丐帮',
  portraitUrl: '/assets/characters/templates/tpl_gaibang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_gaibang_av.jpg',
}

const SPEAKER_TEA_BOSS: StorySpeakerSpec = {
  kind: 'custom',
  name: '街口茶博士',
  title: '市井茶棚掌柜',
  factionName: '市井百姓',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
}

const SPEAKER_JINGYI_DISCIPLE: StorySpeakerSpec = {
  kind: 'custom',
  name: '净衣派执事',
  title: '丐帮净衣门生',
  factionName: '丐帮',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
}

const SPEAKER_WUYI_DISCIPLE: StorySpeakerSpec = {
  kind: 'custom',
  name: '陈阿七',
  title: '丐帮三袋污衣护林弟子',
  factionName: '丐帮',
  portraitUrl: '/assets/characters/templates/tpl_gaibang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_gaibang_av.jpg',
}

function buildApricotDiscipleNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_GB_CHEN_AQI',
    name: '陈阿七',
    title: '丐帮 · 三袋污衣弟子',
    realm: '三流下品',
    factionId: 'SECT-02',
    factionName: '丐帮',
    sectRank: 1,
    sectRankLabel: '三袋弟子',
    avatarUrl: '/assets/characters/templates/tpl_gaibang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_gaibang_fb.jpg',
    stats: { hp: 340, mp: 160, agi: 22, res: 12 },
    talents: { bone: 48, comprehension: 45, charm: 46 },
    equippedArts: { neigong: 'MA-179', move1: 'MA-211', move2: 'MA-182' },
    learnedArts: [{ artId: 'MA-179', level: 2 }, { artId: 'MA-211', level: 3 }, { artId: 'MA-182', level: 2 }],
    equipped: {
      weapon: 'WPN-080',
      armor: 'ARM-041',
      shoes: 'BOT-024',
      bow: 'BOW-021',
      accessory1: 'ACC-041',
      accessory2: 'ACC-043',
      mount: 'MNT-022',
    },
    talk: '“马副帮主有令，只试骨气不伤性命！请亮招吧！”',
  })
}

const SCENE_GB_08_WIDE_JIANGHU: StorySceneDef = {
  id: 'scene_gb_08_wide_jianghu',
  title: '第八幕 · 青囊入世万里阔',
  subtitle: '洛阳杏子林 · 踏歌入江湖',
  illustrationUrl: '/assets/quests/gaibang_bamboo_pouch.jpg',
  illustrationCaption: '洛阳杏子林聚义坛 · 乔峰授一袋布囊与青竹短杖',
  mandatory: true,
  beats: [
    N('辞别乔帮主与诸位长老，顺着铺满落叶的青石山径走出杏子林时，西天暮色正将漫山老杏染作一片苍茫赤金。远处林梢间几只归巢信鸽振翅掠过，隐约还飘来丐帮弟子苍凉豪迈的《莲花落》调子。'),
    N('你低头看了看腰间那只针脚粗实、洗得发白的灰麻布袋，又掂了掂手里新领的芦竹竿与三块粗面干粮。没有锦衣玉食，亦无银钱赏赐，身上这件打满补丁的百衲衣却实打实挡得住春寒。'),
    P('“一碗百家饭，半片粗麻囊。从今日起，先从这一袋弟子做起，跑遍大宋州府，挣出自己的名头！”'),
  ],
  onFinishEffects: [
    { type: 'joinSect', sectId: 'SECT-02', rank: 1 },
    { type: 'giveFood', amount: 3 },
    { type: 'modifyChivalry', delta: 15, reason: '宁折不弯、依规拜入丐帮' },
    { type: 'modifyRenown', delta: 15, reason: '洛阳杏子林依规受袋入丐帮' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0110' }, delta: 10 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0111' }, delta: 10 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0136' }, delta: 10 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0196' }, delta: 10 },
    {
      type: 'completeQuest',
      questId: GAIBANG_ENTRY_QUEST_ID,
      outcome: 'joined_gaibang',
      combatExp: 60,
    },
    toast(
      '正式拜入【丐帮】，授职【一袋弟子】！获赐百衲衣、蒲草鞋、芦竹竿及 3 份粗面干粮！',
      'success',
      '杏林受袋',
    ),
  ],
}

const SCENE_GB_07_ALTAR_OATH: StorySceneDef = {
  id: 'scene_gb_07_altar_oath',
  title: '第七幕 · 聚义高坛依规受袋',
  subtitle: '洛阳杏子林 · 杏林百酒聚义高坛',
  illustrationUrl: '/assets/quests/gaibang_apricot_oath.jpg',
  illustrationCaption: '洛阳杏子林聚义高坛 · 乔峰依祖宗家法授袋立威',
  mandatory: true,
  beats: [
    N('青石垒筑的聚义高坛矗立于杏林深处，坛上供着丐帮历代帮主灵位。二十出头的青年帮主【乔峰】负手立于坛前，身披粗布青衫，腰悬九只灰布袋，眉宇间渊渟岳峙，自有一股沉稳威严的宗师气象。'),
    S('NPC-0196', '（执法长老白世镜捧着名册与一柄寒光森森的执法短刀走上前，声如铁石）“启禀帮主，此人乃老拐子李荐来、经马副帮主试骨与汪老帮主首肯的新进弟子。按本帮祖宗旧仪，凡非幼童出身、半路投帮者，须以法刀划指滴血入酒，当众立下‘五不准、三必行’誓言，以防他派细作混入，请帮主示下。”'),
    N('坛周数十名净衣、污衣弟子齐刷刷望向高坛。乔峰目光如炬，在你身上停留片刻，并未下阶搀扶，更无半句私交寒暄，只朗声向白世镜颔首。'),
    S('NPC-0110', '“白长老所言极是。国有国法，帮有帮规。我乔峰执掌丐帮时日尚浅，若今日为一人破了祖宗家法，日后何以服天下十万帮众？按旧例行礼！”'),
    N('白世镜神色一凛，微不可察地点了点头。你毫不迟疑地上前一步，挽起衣袖，接过执法短刀在指尖轻轻一划，将三滴鲜血滴入盛满高粱烈酒与香灰的粗瓷大碗中，朗声立誓后仰首一饮而尽。'),
    S('NPC-0110', '（见你面不改色地咽下血酒，乔峰眼中这才露出一丝赞许，亲手取过一只粗麻布袋系在你腰间）“好！是个硬骨头的{gender:汉子|女中丈夫}。今日你入我丐帮为一袋弟子，莫怨这身百衲衣寒碜——丐帮的袋数不是我乔峰赏的，是你日后用双脚跑遍大宋州府、用拳头和义气在兄弟们心里挣出来的。去吧，先往分舵听差，莫堕了‘忠义’二字！”'),
  ],
  choices: [
    {
      id: 'gb07_bow_and_accept',
      label: '【抱拳肃礼】“弟子领命！必守丐帮帮规，踏实历练！”',
      tone: 'gold',
      effects: [openScene('scene_gb_08_wide_jianghu', 'QST-SECT-02-ENTRY')],
    },
  ],
}

function buildSceneGb06Reply(choice: 'food' | 'chivalry' | 'conscience'): string {
  const replyLine =
    choice === 'food'
      ? '“哈哈，实诚！不唱高调反倒难得。饿过肚子的人，才晓得百姓锅里那半升糙米有多金贵。”'
      : choice === 'chivalry'
        ? '“有志气是好事，不过江湖不是戏台子，真遇上辽兵刀枪或贪官酷吏时，但愿你这份硬气还在。”'
        : '“问心无愧四字，说起来轻巧，守一辈子最难。老夫便记住你今日这句话了。”'

  return regScene({
    id: `scene_gb_06b_wang_${choice}`,
    title: '老骥点拨 · 准予登坛',
    subtitle: '八方飞鸽篝火信寮',
    mandatory: true,
    beats: [
      S('NPC-0111', replyLine),
      S('NPC-0111', '“去吧。帮主乔峰虽年轻，却最重帮规与实干，眼下正在正中聚义高坛料理帮务。不管你图什么，进了杏子林，便得按祖宗规矩立誓受袋。”'),
    ],
    choices: [
      {
        id: `gb06b_to_altar_${choice}`,
        label: '【拱手辞别汪老帮主】前往聚义高坛拜见乔帮主',
        tone: 'gold',
        effects: [
          { type: 'setQuestStep', questId: GAIBANG_ENTRY_QUEST_ID, stepId: 'altar_oath' },
          openScene('scene_gb_07_altar_oath', 'QST-SECT-02-ENTRY'),
        ],
      },
    ],
  })
}

const SCENE_GB_06_PIGEON_HEART: StorySceneDef = {
  id: 'scene_gb_06_pigeon_heart',
  title: '第六幕 · 飞鸽信寮：汪剑通问心',
  subtitle: '洛阳杏子林 · 八方飞鸽篝火信寮',
  mandatory: true,
  beats: [
    N('信寮旁几十只灰羽信鸽咕咕低鸣，老帮主【汪剑通】正借着篝火余光拆阅一卷来自雁门关外的密报。听到脚步声，他抬起头，一双历经沧桑的老眼上下将你打量了一番。'),
    S('NPC-0111', '“老拐子李推荐的人，又刚在马副帮主面前挨住了打……倒也算有几分骨气。不过{reignYear}北疆契丹铁骑窥伺未歇，西夏亦在西北生事，我丐帮十万众皆是耳目与前哨，随时要替家国百姓拼命。”'),
    S('NPC-0111', '“老夫问你一句掏心窝子的话：你一个布衣散人投我丐帮，究竟图的是什么？”'),
  ],
  choices: [
    {
      id: 'gb06_ans_food',
      label: '【直言不讳】“实不相瞒，先求一口安身立命的饱饭，再学本事立身。”',
      tone: 'default',
      effects: [openScene(buildSceneGb06Reply('food'), 'QST-SECT-02-ENTRY')],
    },
    {
      id: 'gb06_ans_chivalry',
      label: '【正色抱拳】“愿借丐帮大义，练就一身筋骨，日后除暴安良、抗辽护民！”',
      tone: 'primary',
      effects: [openScene(buildSceneGb06Reply('chivalry'), 'QST-SECT-02-ENTRY')],
    },
    {
      id: 'gb06_ans_conscience',
      label: '【平静答道】“江湖虽大，唯求行事问心无愧，不堕男儿/女儿骨气。”',
      tone: 'jade',
      effects: [openScene(buildSceneGb06Reply('conscience'), 'QST-SECT-02-ENTRY')],
    },
  ],
}

function buildSceneGb05AfterSpar(didWin: boolean): StorySceneDef {
  return {
    id: `scene_gb_05b_arena_${didWin ? 'win' : 'grit'}`,
    title: didWin ? '沙场过关 · 拳脚利落' : '沙场过关 · 宁折不弯',
    subtitle: '莲花竹棒演武沙场',
    mandatory: true,
    beats: [
      didWin
        ? S('NPC-0136', '（马大元抬手叫停，微微颔首）“不错，尚未正式入帮便有这般底子，进退也有章法。”')
        : S('NPC-0136', '（马大元抬手叫停，目光落在你嘴角擦破的血痕上，语气缓和了几分）“挨了三记竹棒还能稳稳站着不退半步，也算一条硬汉子。”'),
      S('NPC-0159', '（传功长老宋奚长抚须道）“招式可以进帮再学，脊梁骨软了，九袋也扶不起来。去东侧【八方飞鸽篝火信寮】拜见汪老帮主吧，他老人家还有话问你。”'),
    ],
    choices: [
      {
        id: `gb05b_to_pigeon_${didWin ? 'w' : 'g'}`,
        label: '【擦去尘土拱手】移步八方飞鸽信寮拜谒汪老帮主',
        tone: 'gold',
        effects: [
          { type: 'setQuestStep', questId: GAIBANG_ENTRY_QUEST_ID, stepId: 'pigeon_heart_test' },
          openScene('scene_gb_06_pigeon_heart', 'QST-SECT-02-ENTRY'),
        ],
      },
    ],
  }
}

const SCENE_GB_05_ARENA_TRIAL: StorySceneDef = {
  id: 'scene_gb_05_arena_trial',
  title: '第五幕 · 沙场试骨：挨得住打',
  subtitle: '洛阳杏子林 · 莲花竹棒演武沙场',
  mandatory: true,
  beats: [
    N('沙场中央铺着粗粝黄土，副帮主【马大元】与传功长老【宋奚长】并肩立于场边。马大元接过你的青竹刻纹暗牌扫了一眼，并未多言客套，只指了指场中的污衣三袋弟子陈阿七。'),
    S('NPC-0136', '“老拐子李既肯递牌，说明你放得下身段。不过我丐帮行走江湖，常与恶霸、官差乃至契丹探子打交道——今天不考你能不能赢，只考你挨不挨得住打、跪不跪得下去！阿七，只使三成力，试他三招！”'),
  ],
  choices: [
    {
      id: 'gb05_fight_chen',
      label: '【抱拳入场】“请陈师兄赐教！”（点到为止，胜负皆可推进）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: buildApricotDiscipleNpc() },
          questId: GAIBANG_ENTRY_QUEST_ID,
          rule: 'spar',
          maxRounds: 3,
          forbidEscapeReason: '此乃杏林沙场试骨切磋，既已入场，岂可临阵退缩！',
          onWin: [openScene(regScene(buildSceneGb05AfterSpar(true)), 'QST-SECT-02-ENTRY')],
          onLose: [openScene(regScene(buildSceneGb05AfterSpar(false)), 'QST-SECT-02-ENTRY')],
          onDraw: [openScene(regScene(buildSceneGb05AfterSpar(true)), 'QST-SECT-02-ENTRY')],
        },
      ],
    },
  ],
}

const SCENE_GB_04_APRICOT_GATE: StorySceneDef = {
  id: 'scene_gb_04_apricot_gate',
  title: '第四幕 · 杏林初入：净污暗流',
  subtitle: '洛阳杏子林 · 总舵山门',
  mandatory: true,
  beats: [
    N('行至洛阳城外杏子林，但见老杏遮天蔽日，林间空地上三五成群聚着不少丐帮弟子。你刚取出青竹暗牌打算问路，两名衣冠整洁、腰悬锦囊的汉子便斜睨着走了过来。'),
    S(SPEAKER_JINGYI_DISCIPLE, '（其中一人鼻孔朝天，冷笑一声）“这年头真是阿猫阿狗都敢往杏子林钻了？连件像样的袍子都穿不起，也配来这儿讨差事？”'),
    S(SPEAKER_WUYI_DISCIPLE, '（一旁灰头土脸的三袋弟子陈阿七立刻大步上前挡在你身前，沉声喝道）“休要狗眼看人低！咱们污衣一脉虽衣衫破旧，靠的却是两条腿跑江湖！{gender:少侠|女侠}莫理会净衣那帮势利眼，既持老李叔的青竹牌，随我去【莲花竹棒演武沙场】见马副帮主与宋长老吧。”'),
    N('你默默记下这一幕——原来天下第一大帮之内，亦分衣冠齐整的净衣与粗衣草鞋的污衣两脉，凡事终究要凭真本事与骨气说话。'),
  ],
  choices: [
    {
      id: 'gb04_to_arena',
      label: '【向陈阿七抱拳致谢】前往莲花竹棒演武沙场',
      tone: 'primary',
      effects: [{ type: 'setQuestStep', questId: GAIBANG_ENTRY_QUEST_ID, stepId: 'arena_trial' }],
    },
  ],
}

const SCENE_GB_03_BAMBOO_TALLY: StorySceneDef = {
  id: 'scene_gb_03_bamboo_tally',
  title: '第三幕 · 暗牌引路',
  subtitle: '城外墙根 · 乞儿的规矩',
  mandatory: true,
  beats: [
    N('你提着讨来的那碗凉水回到墙根，将方才从茶客与脚夫口中听到的河北运粮暗语一五一十说与老拐子李听。'),
    S(SPEAKER_LAO_LI, '（老李接过破碗抿了一口，浑浊的双眼里闪过几分精明）“不错，能放下脸面讨这碗水，耳朵又尖，把车队押运的脚数和暗桩落脚点全摸准了。实话告诉你，咱们丐帮之所以能称天下第一大帮，靠的就是九州十道无处不在的耳朵和腿脚。”'),
    N('他从腰间灰布袋里摸出一枚巴掌大小、刻着三道竹节纹的旧木牌塞进你手里。'),
    S(SPEAKER_LAO_LI, '“拿好这枚【青竹刻纹暗牌】。去【洛阳府 · 杏子林总舵】，找演武沙场的马副帮主或宋长老呈牌。至于能不能过乔帮主那一关，就看你自己的骨头硬不硬了。”'),
  ],
  choices: [
    {
      id: 'gb03_set_off',
      label: '【郑重收好青竹暗牌】谢过李老丈，动身前往洛阳杏子林！',
      tone: 'gold',
      effects: [
        { type: 'setQuestStep', questId: GAIBANG_ENTRY_QUEST_ID, stepId: 'go_luoyang_apricot' },
        toast('获得信物【青竹刻纹暗牌】！请前往洛阳府【丐帮中原总舵（杏子林坛）】。', 'talk', '竹牌引路'),
      ],
    },
  ],
}

function buildSceneGb02Result(method: 'beg' | 'eloquence'): string {
  return regScene({
    id: `scene_gb_02b_ear_${method}`,
    title: '茶棚听风 · 暗语到手',
    subtitle: '街口茶棚',
    mandatory: true,
    beats: [
      method === 'beg'
        ? N('你深吸一口气，双手捧着那只缺口粗瓷碗走到茶棚前，坦坦荡荡行了个市井乞礼。茶博士见你虽衣着落魄却举止不卑不亢，舀了半瓢凉水递过来，顺口与桌旁两个歇脚的北方车夫搭起了话。')
        : N('你捧着破碗立在棚檐下，趁着茶博士添水之际，只用两句行话接上了车夫的牢骚，三言两语便套出了车队绕行河北道、三日后在渡口歇脚的底细，茶博士也顺手赏了你一碗凉水。'),
      S(SPEAKER_TEA_BOSS, '“拿去喝吧，莫堵在摊前碍生意……嘿，这几日北边来的粮车走得可真急，听说连大名府渡口都加了夜哨！”'),
      N('你将碗中凉水护在胸前，把方才听到的车队暗号与动向牢记心底，转身回墙根复命。'),
    ],
    choices: [
      {
        id: `gb02b_return_${method}`,
        label: '【端水返还老拐子李】禀明听到的运粮风声',
        tone: 'primary',
        effects: [
          ...(method === 'eloquence'
            ? [{ type: 'modifyRenown', delta: 5, reason: '市井套话机敏过人' } as const]
            : []),
          openScene('scene_gb_03_bamboo_tally', 'QST-SECT-02-ENTRY'),
        ],
      },
    ],
  })
}

const SCENE_GB_02_MARKET_EAR: StorySceneDef = {
  id: 'scene_gb_02_market_ear',
  title: '第二幕 · 市井耳目',
  subtitle: '城郭街角 · 丐帮第一课',
  mandatory: true,
  beats: [
    S(SPEAKER_LAO_LI, '“吃饱了没？莫嫌弃这半块胡饼干硬。老实说，真想入我丐帮，先得把读书人、江湖客那层薄脸皮撕下来踩在脚底——但也得记住两条死规矩：偷摸拐骗是鼠辈，强抢豪夺是山贼，唯有伸手讨一口百家饭，才算堂堂正正的乞儿。”'),
    N('老拐子李将手边那只缺口粗瓷碗推到你面前，下巴朝不远处的街口茶棚努了努。'),
    S(SPEAKER_LAO_LI, '“看见茶棚里那几个穿短打的北方车夫没？去！拿着这只破碗，正经向茶博士讨一碗凉水回来，顺道把那几个人嘴里‘河北往京畿运粮车队’的落脚风声给我听明白。办成了，我给你条进杏子林的门路。”'),
  ],
  choices: [
    {
      id: 'gb02_beg_honestly',
      label: '【捧起缺口瓷碗】放下身段坦然讨水，顺耳听风',
      tone: 'primary',
      effects: [openScene(buildSceneGb02Result('beg'), 'QST-SECT-02-ENTRY')],
    },
    {
      id: 'gb02_use_eloquence',
      label: '【巧言套话】以市井行话接茬，不动声色套出车夫底细（需 辩才 ≥ 10 或 悟性 ≥ 70）',
      subLabel: '察言观色，事半功倍',
      tone: 'jade',
      condition: {
        type: 'any',
        conditions: [
          { type: 'skillAtLeast', key: '辩才', min: 10 },
          { type: 'talentAtLeast', key: '悟性', min: 70 },
        ],
      },
      effects: [openScene(buildSceneGb02Result('eloquence'), 'QST-SECT-02-ENTRY')],
    },
  ],
}

const SCENE_GB_01_STREET_BEGGAR: StorySceneDef = {
  id: 'scene_gb_01_street_beggar',
  title: '第一幕 · 长街残羹',
  subtitle: '{reignYear} · 中原州府街角',
  mandatory: true,
  beats: [
    N('{reignYear}春寒未消，暮色将近。街角酒楼后门刚倒出半盆冷掉的剩菜残羹，几个饥肠辘辘的流民立刻扑上去抢作一团。你虽腹中空鸣、身上盘缠所剩无几，却只站在一旁冷眼旁观，未曾去夺旁人吃食。'),
    N('不远处墙根下，一位断了一条腿的老乞儿同样没去抢食。他靠着砖墙，手里拿半截竹枝有节奏地敲着一只缺口破碗，嘴里哼着苍凉的《莲花落》。一曲唱罢，他抬眼瞧了瞧你，从怀里摸出一张冷硬粗面胡饼，掰了一半抛过来。'),
    S(SPEAKER_LAO_LI, '“接着吧，{gender:小兄弟|姑娘}。看你这副模样，要么是囊空如洗走投无路，要么就是故意跑来寻我丐帮门路的——这半张饼不白给，吃完了，老花子考你一桩小差事。”'),
  ],
  choices: [
    {
      id: 'gb01_accept_cake',
      label: '【接过胡饼拱手致谢】“多谢老丈！但凭差遣。”',
      tone: 'primary',
      effects: [openScene('scene_gb_02_market_ear', 'QST-SECT-02-ENTRY')],
    },
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  ...EXTRA_SCENES,
  [SCENE_GB_08_WIDE_JIANGHU.id]: SCENE_GB_08_WIDE_JIANGHU,
  [SCENE_GB_07_ALTAR_OATH.id]: SCENE_GB_07_ALTAR_OATH,
  [SCENE_GB_06_PIGEON_HEART.id]: SCENE_GB_06_PIGEON_HEART,
  [SCENE_GB_05_ARENA_TRIAL.id]: SCENE_GB_05_ARENA_TRIAL,
  [SCENE_GB_04_APRICOT_GATE.id]: SCENE_GB_04_APRICOT_GATE,
  [SCENE_GB_03_BAMBOO_TALLY.id]: SCENE_GB_03_BAMBOO_TALLY,
  [SCENE_GB_02_MARKET_EAR.id]: SCENE_GB_02_MARKET_EAR,
  [SCENE_GB_01_STREET_BEGGAR.id]: SCENE_GB_01_STREET_BEGGAR,
}
