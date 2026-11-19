import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q20_QUEST_ID } from './zhongnanThirtyYearWagerQuest'

const SPEAKER_XIXIA_SCOUT: StorySpeakerSpec = {
  kind: 'custom',
  name: '一品堂黑衣夜探',
  title: '西夏一品堂死士',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
}

const XIXIA_SCOUT_NPC = makeQuestNpc({
  id: 'znq20_xixia_scout',
  name: '一品堂黑衣死士',
  title: '西夏一品堂夜探精锐',
  realm: '二流中品',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  talk: '“终南残碑拓片必须带回兴庆府，阻路者杀无赦！”',
  stats: { hp: 2200, mp: 1200, agi: 68, res: 54 },
  equippedArts: {
    neigong: 'MA-232',
    qinggong: 'MA-157',
    move1: 'MA-132',
    move2: 'MA-150',
  },
  learnedArts: [
    { artId: 'MA-232', level: 6 },
    { artId: 'MA-157', level: 6 },
    { artId: 'MA-132', level: 6 },
    { artId: 'MA-150', level: 5 },
  ],
})

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq20_01: {
    id: 'scene_znq20_01',
    title: '第一幕 · 终南秋雨暗雷动',
    subtitle: '终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q20_rain_patrol.jpg',
    illustrationCaption: '秋夜雷雨倾盆，寒玉涧水雾迷蒙，两道终南剑影自幽谷两端踏雨而至',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，子夜将至。连绵乌云压低了终南山脊，一道惨白电光撕裂天幕，骤雨如万箭齐发倾泻在后山寒玉涧的幽篁野花之间。'),
      N('你身披蓑衣、手按长剑，依着山门夜巡之例涉水行至【繁花幽谷双剑合璧坪】。此处介于重阳古观与活死人墓之间，素来是两脉默契划定的禁步缓冲之地。'),
      P('“今夜山谷雾气反常，连涧边玉蜂都躁动不安……莫非真有外敌借着雷雨潜上终南？”'),
    ],
    onFinishEffects: [
      { type: 'startQuest', questId: ZHONGNAN_Q20_QUEST_ID, stepId: 'patrol_valley' },
      { type: 'teleportPlayer', regionId: 'zhongnanshan', buildingId: 'zn_stream', spotId: 'zn_st_sword' },
      openScene('scene_znq20_02', ZHONGNAN_Q20_QUEST_ID),
    ],
  },

  scene_znq20_02: {
    id: 'scene_znq20_02',
    title: '第二幕 · 隔涧相逢旧同门',
    subtitle: '繁花幽谷双剑合璧坪 · 青石古道',
    mandatory: true,
    beats: [
      N('话音未落，对岸花丛中掠出一道迅疾如风的身影！电光一闪，来人同样手按剑柄、目含戒备，却在看清你衣襟上的终南隐宗徽记时微怔了一瞬。'),
      S(
        'NPC-0173',
        '{ifFlagEq:zn_branch=guguan|（素衣微湿，长剑半出鞘，冷冷打量着你）“重阳古观的{gender:师弟|师妹}？深夜越过寒玉涧中线，莫非忘了两脉互不踏足的旧规？”|（轻步落于你身侧，低声示警）“{gender:师弟|师妹}小心！前面花径有杂乱足印，绝非古观那群牛鼻子所留。”}',
      ),
      S(
        'NPC-0216',
        '{ifFlagEq:zn_branch=guguan|（亦自松影间掠至，眉头紧锁）“冷姑娘且慢动怒！我与{gender:师弟|师妹}乃追踪山下几道西夏口音的鬼祟行迹而来，绝无冒犯活死人墓之意。”|（执剑立于青石之上，朗声道）“冷师妹、这位古墓{gender:师弟|师妹}，贫道丘处玄并非来寻衅的——半个时辰前，有一队黑衣人绕过了古观前山哨卡，直奔此坪而来！”}',
      ),
    ],
    onFinishEffects: [openScene('scene_znq20_03', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_03: {
    id: 'scene_znq20_03',
    title: '第三幕 · 泥地残痕识来路',
    subtitle: '繁花幽谷双剑合璧坪 · 残碑前',
    mandatory: true,
    beats: [
      N('你俯身拨开被雨水打伏的野菊，只见湿泥里赫然印着数枚深浅不一的马靴印，靴底带着关外铁掌特有的锯齿纹路，旁侧更遗落了半片沾染拓印墨汁的油布。'),
      P('“靴底带关外防滑铁齿，又有拓碑用的松烟油墨……他们不是寻常毛贼，是冲着寒玉涧这通古碑来的！”'),
      S('NPC-0173', '（眸色骤寒）“这通残碑乃当年祖师与王真人划界所立，除了两脉掌门，连门下弟子都鲜少近观。西夏人怎会知晓此碑所在？”'),
    ],
    onFinishEffects: [openScene('scene_znq20_04', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_04: {
    id: 'scene_znq20_04',
    title: '第四幕 · 银枪破雨惊幽谷',
    subtitle: '繁花幽谷双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q20_li_yanzong_ambush.jpg',
    illustrationCaption: '电闪雷鸣间，西夏银枪客卿李延宗率黑衣死士自竹林扑出，寒芒直指残碑',
    mandatory: true,
    beats: [
      N('“锵啷——！”一声清越锐啸穿透雨帘！一杆通体银白的精钢长枪如毒龙出洞，自浓密紫竹林中激射而出，枪风将满地落花卷成漩涡！'),
      S('NPC-1036', '（身披黑底绣银纹雨氅，稳稳接住回旋银枪，嘴角噙着一抹冷傲笑意）“终南山果然卧虎藏龙。可惜今夜雷雨天助我西夏，尔等既撞破了李某的好事，便把性命留在花坪下吧！”'),
      S(SPEAKER_XIXIA_SCOUT, '“将军有令！拓片已得三成，速杀终南弟子，莫叫重阳观与活死人墓的老怪物察觉！”'),
    ],
    onFinishEffects: [openScene('scene_znq20_05', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_05: {
    id: 'scene_znq20_05',
    title: '第五幕 · 银枪客卿露锋芒',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0216', '（低喝一声，长剑斜指雨空）“银枪素甲、西夏口音，莫非你便是近年在贺兰山名噪一时的一品堂客卿‘西夏银枪’李延宗？！”'),
      S('NPC-1036', '（轻抚枪缨，目光掠过你与丘处玄、冷清秋）“好眼力。听说终南山古观与古墓三十年老死不相往来，今日李某倒要瞧瞧，生死关头你们是各顾各逃，还是肯把后背交给仇家！”'),
      P('“休要挑拨离间！终南山内纵有门户之争，外敌犯境之时，我终南弟子岂会容你西夏宵小猖狂！”'),
    ],
    onFinishEffects: [openScene('scene_znq20_06', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_06: {
    id: 'scene_znq20_06',
    title: '第六幕 · 死士环伺断退路',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('四周竹影晃动，七八名一品堂黑衣死士弯刀出鞘，结成西夏铁鹞军步战合围之势，将花坪三面退路彻底封死！'),
      S(
        'NPC-0173',
        '{ifFlagEq:zn_branch=guguan|（反手拔剑，向你微一颔首）“古观{gender:师弟|师妹}，外围死士交由丘道长缠住，你我先联手剪除这群扑上来的先锋！”|（剑尖轻震雨珠，与你背靠背而立）“{gender:师弟|师妹}，丘道长替我们护住左翼，先斩了这批黑衣探子再合擒李延宗！”}',
      ),
    ],
    choices: [
      {
        id: 'znq20_ch_fight_scouts',
        label: '剑出寒芒，先破西夏一品堂黑衣死士合围！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q20_QUEST_ID,
            opponent: { kind: 'custom', npc: XIXIA_SCOUT_NPC },
            rule: 'duel',
            lethalOnLose: false,
            introText: '暴雨如注，西夏一品堂黑衣死士挥刀扑上！',
            onWin: [
              setStep(ZHONGNAN_Q20_QUEST_ID, 'duel_li_yanzong'),
              openScene('scene_znq20_07', ZHONGNAN_Q20_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('西夏死士攻势凶猛，幸得同门挥剑救应，整顿气息后再战！', 'warn', '寒涧夜战'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq20_07: {
    id: 'scene_znq20_07',
    title: '第七幕 · 疾风骤雨斩前锋',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('剑光在雨幕中划出数道冷冽弧影！你与同门一刚一柔、一进一退，眨眼间便将扑来的黑衣死士尽数震退，数柄弯刀叮当坠入泥水。'),
      S('NPC-1036', '（眼中闪过一丝讶色，长枪一抖，发出龙吟般的颤鸣）“有点意思。古观的剑势沉稳中正，古墓的身法飘忽难测——既如此，便让李某亲自领教终南双脉的高招！”'),
    ],
    onFinishEffects: [openScene('scene_znq20_08', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_08: {
    id: 'scene_znq20_08',
    title: '第八幕 · 暂抛宿怨共御侮',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0216', '（一剑挑飞两名死士的火油筒，朗声喝道）“李延宗枪法奇快，且兼有江南世家以彼之道还施彼身的诡谲路数！{ifFlagEq:zn_branch=guguan|冷姑娘与师弟|冷师妹与古墓师弟}切记彼此照应！”'),
      S('NPC-0173', '（深吸一口雨夜清气，剑锋轻点地面）“今夜不论古观古墓，只论终南山门。{ifFlagEq:zn_branch=guguan|{gender:师弟|师妹}，你走阳刚正手，我补阴柔奇锋！|{gender:师弟|师妹}，丘道长牵制正面，你我伺机破他银枪中宫！”}'),
      P('“正合我意！且教这西夏客卿见识终南双剑之威！”'),
    ],
    onFinishEffects: [openScene('scene_znq20_09', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_09: {
    id: 'scene_znq20_09',
    title: '第九幕 · 双剑合锋战银枪',
    subtitle: '繁花幽谷双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q20_twin_sword_clash.jpg',
    illustrationCaption: '古观长剑与古墓素剑于雷雨中交错映辉，硬撼西夏银枪李延宗的暴雨梨花枪势',
    mandatory: true,
    beats: [
      N('李延宗足尖一点，银枪化作满天寒星罩下，每一枪皆暗藏吞吐反转的奇劲，仿佛能将攻去的剑气尽数借力打回！'),
      N('你与同门心念电转：你一剑递出未老，另一侧剑影已悄然补上空门，竟在无意间暗合某种浑然天成的阴阳互济之理！'),
    ],
    choices: [
      {
        id: 'znq20_ch_duel_liyanzong',
        label: '双脉同心，正面对决西夏银枪李延宗！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q20_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-1036' },
            rule: 'duel',
            lethalOnLose: false,
            introText: '雷雨交加，银枪如龙！你与终南同门并肩迎战西夏一品堂客卿李延宗！',
            onWin: [
              setStep(ZHONGNAN_Q20_QUEST_ID, 'inspect_stele'),
              openScene('scene_znq20_10', ZHONGNAN_Q20_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 70, mpPct: 70 },
              toast('李延宗枪法诡谲难测，暂退半步重整架势再战！', 'warn', '寒涧激战'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq20_10: {
    id: 'scene_znq20_10',
    title: '第十幕 · 灵犀一剑震枪锋',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('激斗数十合，李延宗忽地虚晃一枪，枪尾回扫直取你肋下空门！电光石火间，{ifFlagEq:zn_branch=guguan|冷清秋|丘处玄}剑尖轻挑你手腕借力一送，你顺势反撩，双剑如剪刀合拢，硬生生磕偏了银枪七寸！'),
      S('NPC-1036', '（虎口震裂，踉跄倒退三步，面色剧变）“这……这是什么剑路？！古观的刚劲怎会与古墓的阴柔严丝合缝，竟连我借力打力的绝学都无从化解？！”'),
      P('“终南山双脉同源，岂是你这藏头露尾的西夏客卿所能参透！留下拓片，束手就擒！”'),
    ],
    onFinishEffects: [openScene('scene_znq20_11', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_11: {
    id: 'scene_znq20_11',
    title: '第十一幕 · 银枪遁走留谜雾',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('李延宗见远方重阳古观已有钟声隐隐传响，活死人墓方向亦飞出大片寒光玉蜂，知晓再恋战必遭两脉宗师合围。'),
      S('NPC-1036', '（冷哼一声，挥袖掷出三枚震天烟雷，借浓烟跃上崖壁）“好一个终南双剑！今日之账李某记下了——不过，你们真以为贺兰山一品堂盯上终南山，只是为了一块破石碑么？后会有期！”'),
      N('浓烟散尽，李延宗与残余死士已消失在茫茫夜雨深处，只留下一地狼藉与半卷被剑气斩落的油纸拓片。'),
    ],
    onFinishEffects: [openScene('scene_znq20_12', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_12: {
    id: 'scene_znq20_12',
    title: '第十二幕 · 惊雷劈苔现古碑',
    subtitle: '繁花幽谷双剑合璧坪 · 残碑前',
    illustrationUrl: '/assets/quests/zn_q20_broken_stele.jpg',
    illustrationCaption: '一道紫电劈落古碑覆苔，露出一阴一阳交缠而刻的剑诀残文与三十载前旧题',
    mandatory: true,
    beats: [
      N('“轰隆——！”恰在此时，一道紫白惊雷悍然劈落在花坪尽头的巨石残碑之巅！枯藤厚苔应声焦裂剥落，露出其下深藏数十载的青石碑面。'),
      N('雨丝冲刷着石面焦灰，借着连绵电光，众人清晰看见碑身左右分刻着两行截然不同却又遥相呼应的剑痕字迹：左侧笔力雄浑苍劲如松柏凌霜，右侧簪花小楷清冷峻拔如寒梅映雪。'),
    ],
    onFinishEffects: [openScene('scene_znq20_13', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_13: {
    id: 'scene_znq20_13',
    title: '第十三幕 · 双脉并立观旧迹',
    subtitle: '繁花幽谷双剑合璧坪 · 残碑前',
    mandatory: true,
    beats: [
      S('NPC-0216', '（走近碑前，手指轻拂左侧笔迹，声音微颤）“这左侧铁画银钩的剑刻……分明是家师王重楼真人的亲笔！”'),
      S('NPC-0173', '（凝视右侧清冷小楷，一向淡漠的眼眸竟泛起波澜）“而右侧这行‘玉女素心，破尽全真’，正是恩师林朝瑶祖师的手泽……当年为何两人的字迹会刻在同一通残碑之上？”'),
      P('“不止如此，你们看碑文下方——还有一段被厚苔遮盖了三十年的小字题记！”'),
    ],
    onFinishEffects: [openScene('scene_znq20_14', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_14: {
    id: 'scene_znq20_14',
    title: '第十四幕 · 拾起西夏残拓片',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('你弯腰拾起方才斩落的西夏油纸拓片，只见上面仅拓到了碑顶“全真玉女、阴阳相生”八个残字，最关键的下半截碑文尚未落墨。'),
      S('NPC-0216', '“好险！若叫李延宗拓走全碑，西夏一品堂岂非要借此窥破我终南两脉的武学命门？”'),
      S('NPC-0173', '（轻轻吐出一口浊气，望向你时戒意已消去大半）“今夜若非{ifFlagEq:zn_branch=guguan|你与丘道长|丘道长与你}及时援手，单凭我一人未必能留住拓片。这残碑上的真相，你我两脉当一同看个明白。”'),
    ],
    onFinishEffects: [openScene('scene_znq20_15', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_15: {
    id: 'scene_znq20_15',
    title: '第十五幕 · 拂去尘泥辨真言',
    subtitle: '繁花幽谷双剑合璧坪 · 残碑前',
    mandatory: true,
    beats: [
      N('你以剑鞘轻刮去碑座残泥，雨水洗净青石，三十年前那段尘封往事终于一字一句重见天日。'),
      N('碑文载道：“昔岁山河多故，重楼与朝瑶青梅论剑于终南。一愿立道观以济苍生，一愿守幽谷以绝尘嚣。道不同而心未泯，乃立三十载赌约：各传一脉，各演至理；他日若遇大劫临山，唯双剑合璧、阴阳归元，方可见终南真传。”'),
    ],
    onFinishEffects: [openScene('scene_znq20_16', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_16: {
    id: 'scene_znq20_16',
    title: '第十六幕 · 昔年青梅三十约',
    subtitle: '繁花幽谷双剑合璧坪 · 残碑前',
    mandatory: true,
    beats: [
      N('读罢碑文，花坪上一片寂静，唯余哗哗雨声与远涧飞瀑轰鸣。'),
      S('NPC-0216', '（怔立良久，长叹一声）“原来如此……我等门下弟子皆以为古观与古墓势同水火，谁能想到，王真人与林前辈当年竟是青梅知己，所谓‘互不往来’，竟是一场历时三十载的武道赌约！”'),
      S('NPC-0173', '（指尖轻触碑上剑痕，低声呢喃）“怪不得师父创出专克古观剑法的招式，却又总在每招尽头留下一线回旋余地……原来那不是破绽，而是留给另一柄剑补全合璧的虚位！”'),
    ],
    onFinishEffects: [openScene('scene_znq20_17', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_17: {
    id: 'scene_znq20_17',
    title: '第十七幕 · 双剑合璧悟玄机',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('你凝视碑身交错的剑痕，回想方才与同门合击李延宗那一瞬间——古观剑势大开大阖如阳春布泽，古墓剑意清灵绵密如秋水映月，方才那一记无意间的交错借力，竟正是碑中所言“双剑合璧”的雏形！'),
      P('“难怪刚才那一剑能震裂李延宗的虎口！古观之阳刚与古墓之阴柔本非相克，而是互为表里、相济相成！”'),
    ],
    onFinishEffects: [openScene('scene_znq20_18', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_18: {
    id: 'scene_znq20_18',
    title: '第十八幕 · 两脉尊长踏雨来',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('就在三人震撼之际，南北两端的雨幕同时无声分开。'),
      N('北面青袍飘举，紫阳真人【王重楼】踏水而来，周身雨滴竟在三尺外自行滑落；南面素袂翻飞，寒玉仙子【林朝瑶】凌波而至，足尖点过花梢竟不染纤尘。两位三十年未曾同立一处的终南尊长，终于在残碑前隔雨相望。'),
    ],
    onFinishEffects: [openScene('scene_znq20_19', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_19: {
    id: 'scene_znq20_19',
    title: '第十九幕 · 隔雨相望意难平',
    subtitle: '繁花幽谷双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q20_thirty_year_oath.jpg',
    illustrationCaption: '王重楼与林朝瑶三十载后再度并立寒玉涧残碑前，雨雾朦胧，往事如烟',
    mandatory: true,
    beats: [
      S('NPC-0133', '（望着被雷劈显的残碑，神色复杂，缓缓拱手）“林师妹……三十年风雨如晦，这块碑终究还是藏不住了。”'),
      S('NPC-0114', '（目光冷淡，声音却比平日少了几分冰霜）“王道长说笑了。赌约之期未满，古观自有古观的济世大道，古墓自有古墓的清静法门。只是西夏一品堂既敢夜闯寒玉涧，看来山外风云，已容不得终南再闭门独善了。”'),
      S('NPC-0133', '（颔首沉声）“不错。李延宗不过是一品堂探路的马前卒。大宋西北边患日紧，辽夏暗探频入关中，终南山恐怕很快便要迎来一场大风浪。”'),
    ],
    onFinishEffects: [openScene('scene_znq20_20', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_20: {
    id: 'scene_znq20_20',
    title: '第二十幕 · 嘉许后辈破强敌',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0133', '（转目望向你，眼中满是赞许）“方才你们击退李延宗的那一剑，老道在半山已看得真切。小小年纪竟能在生死之际触及双剑合璧之门径，实属难得。”'),
      S('NPC-0114', '（微不可察地颔首）“临危不乱，且不囿于门户成见。{ifFlagEq:zn_branch=guguan|王道长门下倒也出了个可造之材|你这孩子，总算没丢活死人墓的颜面}。”'),
    ],
    onFinishEffects: [openScene('scene_znq20_21', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_21: {
    id: 'scene_znq20_21',
    title: '第二十一幕 · 师尊问心定志向',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S(
        'NPC-0133',
        '{ifFlagEq:zn_branch=guguan|“徒儿，既见残碑旧约，你心中对古观古墓两脉之道，作何感想？”|“小友虽入古墓门下，今日既见双剑残碑，不知你对终南两脉前景有何见解？”}',
      ),
    ],
    choices: [
      {
        id: 'znq20_ch_harmony_mind',
        label: '“阴阳相生乃天地至理，弟子愿为两脉消弭隔阂、共御外侮！”',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'zn_q20_attitude', value: 'harmony' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 6 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 6 },
          openScene('scene_znq20_22', ZHONGNAN_Q20_QUEST_ID),
        ],
      },
      {
        id: 'znq20_ch_duty_mind',
        label: '“弟子谨守本脉初心，但凡外敌犯山，必当舍命同仇敌忾！”',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'zn_q20_attitude', value: 'duty' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0216' }, delta: 6 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 6 },
          openScene('scene_znq20_22', ZHONGNAN_Q20_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq20_22: {
    id: 'scene_znq20_22',
    title: '第二十二幕 · 各派远行历山河',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S(
        'NPC-0133',
        '{ifFlagEq:zn_branch=guguan|“好！既如此，山雨欲来之前，你当随师兄们下山历练：先往洛阳白马书院访邵雍先生推演天罡阵眼，再赴边关与东南查探时局，以备他日护山之用！”|“林师妹，山外暗流涌动，你我各自遣门下俊彦下山历练一番，待风起之时再会于此涧，如何？”}',
      ),
      S(
        'NPC-0114',
        '{ifFlagEq:zn_branch=guguan|“善。古墓亦会遣人南下巴蜀江南、西探昆仑，绝不教西夏与江湖宵小轻视终南。”|“正有此意。徒儿，你既已通晓残碑之秘，近日便随冷清秋下山行走江湖——剑阁青城、钟山秦淮、乃至万里昆仑，皆是你磨剑炼心之处。”}',
      ),
    ],
    onFinishEffects: [openScene('scene_znq20_23', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_23: {
    id: 'scene_znq20_23',
    title: '第二十三幕 · 雨霁星明赠丹丸',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('不知何时，倾盆暴雨渐歇，云缝间漏下几点清冷星辉，照在寒玉涧潺潺流水中，恰似满河碎银。'),
      S('NPC-0216', '“{gender:师弟|师妹}，此番夜战辛苦了！这几瓶《太乙回气清心散》且收在身上，他日远行关山，切莫大意。”'),
      S('NPC-0173', '（微颔首道）“残碑之事，你我心中自有分寸。山高水长，盼下次重逢时，我们皆已更进一步。”'),
    ],
    onFinishEffects: [openScene('scene_znq20_24', ZHONGNAN_Q20_QUEST_ID)],
  },

  scene_znq20_24: {
    id: 'scene_znq20_24',
    title: '第二十四幕 · 双脉同源启远征',
    subtitle: '终南后山寒玉涧',
    mandatory: true,
    beats: [
      N('两位尊长各自拂袖归山，残碑静立于雨后花坪之上，见证着终南隐宗尘封三十年的心结悄然松动。'),
      N('你回望南北两峰灯火，深知今夜只是山河风云的序幕——无论是{ifFlagEq:zn_branch=guguan|古观北上洛阳延安、南下刺桐的济世远征|古墓西入剑阁青城、东临钟山、万里昆仑的孤剑问道}，都在前方静候着你的脚步！'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
      { type: 'giveSilver', amount: 180, reason: '终南双脉夜巡击退西夏客卿赏赐' },
      { type: 'giveCombatExp', amount: 900, reason: '寒涧双剑合璧激战李延宗' },
      { type: 'addSectContribution', amount: 260 },
      { type: 'modifyRenown', delta: 45, reason: '终南寒玉涧挫败西夏银枪李延宗' },
      { type: 'modifyChivalry', delta: 30, reason: '捐弃门户成见共御外侮' },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 5 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 5 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0216' }, delta: 8 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 8 },
      { type: 'setFlag', flag: 'zn_q20_stele_revealed', value: true },
      {
        type: 'completeQuest',
        questId: ZHONGNAN_Q20_QUEST_ID,
        outcome: 'stele_revealed',
        combatExp: 450,
      },
      toast(
        '【寒涧残碑 · 三十载赌约】完结！双脉三十载旧约大白，请开启本脉下山远征试炼！',
        'success',
        '终南双脉汇流',
      ),
    ],
  },
}
