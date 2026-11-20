import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE08_QUEST_ID } from './shaolinSideGoldenBladeBanquetQuest'

const SPEAKER_ASSASSIN_BOSS: StorySpeakerSpec = {
  kind: 'custom',
  name: '毒针影',
  title: '关西暗器杀手首领',
  factionName: '关西暗杀堂',
  portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
}

const SPEAKER_ASSASSIN_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '冷袖鬼',
  title: '关西暗器死士',
  factionName: '关西暗杀堂',
  portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
}

function buildPoisonNeedleShadow(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS08_POISON_SHADOW',
    name: '毒针影',
    title: '关西暗器杀手 · 毒针影',
    realm: '二流上品',
    factionName: '关西暗杀堂',
    sectRank: 0,
    sectRankLabel: '暗器首领',
    avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
    talk: '“坏我关西血仇大计的少林和尚，拿一张破木桌挡得住第一波袖箭，挡得住老子的追魂夺命镖么！”',
    stats: { hp: 1620, mp: 1360, agi: 57, res: 38 },
    talents: { bone: 64, comprehension: 58, charm: 30 },
    equippedArts: { neigong: 'MA-142', move1: 'MA-155', move2: 'MA-137' },
    learnedArts: [{ artId: 'MA-142', level: 5 }, { artId: 'MA-155', level: 6 }, { artId: 'MA-137', level: 5 }],
  })
}

function buildAssassinMinion1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS08_ASSASSIN_1',
    name: '冷袖鬼',
    title: '关西暗器死士',
    realm: '二流下品',
    factionName: '关西暗杀堂',
    sectRank: 0,
    sectRankLabel: '暗器死士',
    avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
    talk: '“金刀老儿的项上人头值三千两黄金，挡路者和尚一并去死！”',
    stats: { hp: 960, mp: 780, agi: 46, res: 24 },
    talents: { bone: 54, comprehension: 48, charm: 25 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-175', move2: 'MA-131' },
    learnedArts: [{ artId: 'MA-121', level: 4 }, { artId: 'MA-175', level: 5 }, { artId: 'MA-131', level: 4 }],
  })
}

function buildAssassinMinion2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS08_ASSASSIN_2',
    name: '青竹蛇',
    title: '关西暗器死士',
    realm: '二流下品',
    factionName: '关西暗杀堂',
    sectRank: 0,
    sectRankLabel: '暗器死士',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“别让少林武僧合围，先封死他退路！”',
    stats: { hp: 940, mp: 760, agi: 47, res: 24 },
    talents: { bone: 52, comprehension: 46, charm: 24 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-155', move2: 'MA-133' },
    learnedArts: [{ artId: 'MA-121', level: 4 }, { artId: 'MA-155', level: 5 }, { artId: 'MA-133', level: 4 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls08_01: {
    id: 'scene_sls08_01',
    title: '第一幕 · 洛阳贺寿',
    subtitle: '洛阳府 · 金刀王家大宅 · 翠竹曲水藏刀八角亭',
    mandatory: true,
    beats: [
      N('{reignYear}洛阳牡丹初绽，金刀王家大宅张灯结彩、宾客云集。今日乃“金刀老爷子”王元霸六秩寿诞，你奉嵩山少林寺之命携贺礼檀香佛珠前来拜寿，行至翠竹曲水藏刀八角亭，先遇上了在此担任护院的少林俗家弟子虚净。'),
      S('NPC-0667', '（迎上前合十行礼）“阿弥陀佛！本山师兄远道而来辛苦了！王老爷子素来敬重嵩山少林，每逢中原抗辽义举皆倾囊相助，今日听说少林派内门高足亲至，高兴得合不拢嘴呢！”'),
      P('（还礼微笑）“王老爷子义薄云天，本寺方丈亦常赞誉。今日大宅宾客众多，不知府中各处防务可还妥当？”'),
    ],
    onFinishEffects: [openScene('scene_sls08_02', SHAOLIN_SIDE08_QUEST_ID)],
  },

  scene_sls08_02: {
    id: 'scene_sls08_02',
    title: '第二幕 · 亭中拜谒',
    subtitle: '翠竹曲水藏刀八角亭',
    mandatory: true,
    beats: [
      N('话音未落，一阵洪亮笑声自竹林曲桥传来。只见王元霸身着绛紫团花锦袍，须发虽微霜却虎步生风，双手托着一对鎏金铁胆大步走入八角亭中。'),
      S('NPC-0186', '（抱拳朗笑）“哈哈哈哈！贵客临门，有失远迎！少林寺派你这般英气勃勃的内门俊彦来给老夫拜寿，比送十箱黄金还令老夫开怀！虚净，快请上茶！”'),
      P('（双手奉上嵩山檀香佛珠与方丈贺柬）“晚辈奉嵩山少林方丈之命，恭祝王老爷子福如东海、金刀常啸！”'),
    ],
    onFinishEffects: [openScene('scene_sls08_03', SHAOLIN_SIDE08_QUEST_ID)],
  },

  scene_sls08_03: {
    id: 'scene_sls08_03',
    title: '第三幕 · 戏班疑云',
    subtitle: '翠竹曲水藏刀八角亭 · 曲水畔',
    mandatory: true,
    beats: [
      N('王元霸正欲引你赴中庭观演武、看大戏，却见一名青衣家丁匆匆报称新请来的“庆云杂剧班”已在中庭搭好戏台。你隔着翠竹疏影望去，眉头却微微一蹙。'),
      P('（压低声音对虚净道）“虚净师弟，你看那三个抬道具箱的戏班武生——寻常梨园子弟步履轻浮，这三人抬着沉重红漆木箱却脚尖着地、呼吸绵长，袖口沉甸甸的仿佛暗藏机括！”'),
      S('NPC-0667', '（脸色微变）“师兄好眼力！近来听闻王老爷子早年剿灭关西马贼时结下的死仇曾扬言报复……只是今日满堂贵客，若无实据贸然拿人，恐扫了寿宴兴致。”'),
    ],
    onFinishEffects: [openScene('scene_sls08_04', SHAOLIN_SIDE08_QUEST_ID)],
  },

  scene_sls08_04: {
    id: 'scene_sls08_04',
    title: '第四幕 · 暗中布防',
    subtitle: '翠竹曲水藏刀八角亭',
    mandatory: true,
    beats: [
      P('（从容筹划）“宁可备而无患，不可疏而招祸。虚净你先随王老爷子从容入席，莫要打草惊蛇；我去中庭知会虚慧师弟暗中守住东西角门，我则贴身坐于王老爷子身侧紧盯戏台动静。”'),
      S('NPC-0667', '“师兄谋划周全！这就移步金刀石锁演武中庭！”'),
    ],
    choices: [
      {
        id: 'sls08_accept',
        label: '暗中戒备，移步【金刀石锁演武中庭】护卫王元霸寿宴',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE08_QUEST_ID, stepId: 'courtyard_banquet' },
          setStep(SHAOLIN_SIDE08_QUEST_ID, 'courtyard_banquet'),
          toast(
            '已察觉戏班暗藏杀机！请前往【金刀王家大宅 · 金刀石锁演武中庭（ly_jd_courtyard）】护卫寿宴。',
            'talk',
            '金刀寿宴',
          ),
        ],
      },
    ],
  },

  scene_sls08_05: {
    id: 'scene_sls08_05',
    title: '第五幕 · 中庭演武',
    subtitle: '金刀王家大宅 · 金刀石锁演武中庭',
    mandatory: true,
    beats: [
      N('金刀石锁演武中庭摆开二十余桌流水寿席，王家子弟正轮番上场演练祖传《洛阳金刀谱》，刀光霍霍引得满座喝彩。虚慧早已得你传音，按兵不动地守在东廊柱后。'),
      S('NPC-0737', '（以微不可闻的嗓音低语）“师兄，那三名可疑武生方才借口换戏服，将一只长条铁箍木箱搬到了离主桌不到三丈的戏台前沿，目光一直死死锁着王老爷子！”'),
      P('“盯紧他们手势！待锣鼓最响、众人拍手叫好之时，便是他们发难的一刻！”'),
    ],
    onFinishEffects: [openScene('scene_sls08_06', SHAOLIN_SIDE08_QUEST_ID)],
  },

  scene_sls08_06: {
    id: 'scene_sls08_06',
    title: '第六幕 · 锣鼓骤变',
    subtitle: '金刀石锁演武中庭 · 寿席主桌',
    mandatory: true,
    beats: [
      N('恰在此时，王家子弟一式“金刀劈浪”收招，满场轰然叫好，戏台上大锣猛敲三记！王元霸哈哈大笑举杯欲饮，恰是全身空门大开之瞬间！'),
      N('说时迟那时快，戏台前沿那三名浓妆武生陡然撕破戏袍，露出玄黑夜行劲装！为首瘦长汉子狞笑一声，猛拍红漆木箱暗簧，数十枚淬着幽蓝剧毒的机括短箭与牛毛毒针如骤雨般直扑王元霸面门！'),
      S(SPEAKER_ASSASSIN_BOSS, '“王元霸！关西血债今日血偿，纳命来吧！”'),
    ],
    onFinishEffects: [openScene('scene_sls08_07', SHAOLIN_SIDE08_QUEST_ID)],
  },

  scene_sls08_07: {
    id: 'scene_sls08_07',
    title: '第七幕 · 掀桌挡箭',
    subtitle: '金刀石锁演武中庭 · 千钧一发',
    illustrationUrl: '/assets/quests/sl_s08_jindao_arrows.jpg',
    illustrationCaption: '洛阳暗箭 · 疾步掀翻紫檀八仙桌，凌空挡下漫天淬毒袖箭',
    mandatory: true,
    beats: [
      N('宾客惊呼四起，王元霸虽身怀绝艺却正值举杯无兵，眼看毒箭已至三尺之内！电光石火间，你早有提防，一声沉喝气沉丹田，双掌猛托身前沉重的紫檀八仙桌，凌空掀立挡在王元霸身前！'),
      N('“咄咄咄咄——”数十支幽蓝毒箭与细如发丝的毒针尽数钉入厚实紫檀桌面，箭尾嗡嗡颤抖，竟无一支漏过！酒盏菜肴泼洒满地，王元霸与满席老幼安然无恙！'),
      S('NPC-0186', '（惊怒交加，反手自侍卫手中夺过百炼金刀）“好贼子，竟敢在老夫寿诞施放毒箭！小师父救命之恩，老夫铭记在心！”'),
    ],
    onFinishEffects: [openScene('scene_sls08_08', SHAOLIN_SIDE08_QUEST_ID)],
  },

  scene_sls08_08: {
    id: 'scene_sls08_08',
    title: '第八幕 · 护宾截敌',
    subtitle: '金刀石锁演武中庭',
    mandatory: true,
    beats: [
      N('毒针影一击失手，眼中杀机更炽，长啸一声率两名死士纵身跃下戏台，欲趁人群混乱强行近身搏杀！'),
      P('（将插满毒箭的八仙桌震向前方逼退刺客，朗声调度）“王老爷子与虚净、虚慧师弟速护宾客退入后廊，谨防余党混入人群！这三个暗器刺客交由弟子来截住！”'),
      S('NPC-0667', '“师兄小心！那首领乃是关西恶名昭彰的暗器杀手【毒针影】，袖中机括阴毒无比！”'),
    ],
    onFinishEffects: [openScene('scene_sls08_09', SHAOLIN_SIDE08_QUEST_ID)],
  },

  scene_sls08_09: {
    id: 'scene_sls08_09',
    title: '第九幕 · 三煞合围',
    subtitle: '金刀石锁演武中庭 · 庭心恶斗',
    mandatory: true,
    beats: [
      S(SPEAKER_ASSASSIN_A, '（怪笑连连，甩出三枚金钱镖封住你左翼）“哪来的少林多事和尚，真以为凭一己之力能拦住我关西暗杀堂三人联手？”'),
      S(SPEAKER_ASSASSIN_BOSS, '（十指扣满追魂夺命镖，身形如鬼魅般游走）“坏我三千两黄金的大买卖，今日便先拿你这少林内门僧祭旗！”'),
      N('你沉肩坠肘，以浑厚少林内力护住周身要穴，大步踏入中庭石锁阵间，独自迎上关西三煞！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side08_assassins_ready', value: true },
      openScene('scene_sls08_10', SHAOLIN_SIDE08_QUEST_ID),
    ],
  },

  scene_sls08_10: {
    id: 'scene_sls08_10',
    title: '第十幕 · 力战三刺客',
    subtitle: '金刀演武中庭 · 车轮连战 激战关西暗器杀手',
    mandatory: true,
    beats: [
      S(SPEAKER_ASSASSIN_BOSS, '“动手！暗器封眼，短刀断脉，绝不能让他近身！”'),
      N('三名关西刺客呈三角品字形扑来，毒镖短刀交错成网，中庭杀气冲天！'),
    ],
    choices: [
      {
        id: 'sls08_fight_assassins',
        label: '护住中庭退路，迎战【毒针影（二流上品）】与两名关西暗器死士',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPoisonNeedleShadow() },
            extraOpponents: [
              { kind: 'custom', npc: buildAssassinMinion1() },
              { kind: 'custom', npc: buildAssassinMinion2() },
            ],
            rule: 'story_trial',
            forbidEscapeReason: '王家满堂宾客就在身后，一步不可后退！',
            introText:
              '【洛阳暗箭】在金刀王家演武中庭迎战关西暗器杀手首领【毒针影（二流上品）】及两名死士！',
            onWin: [openScene('scene_sls08_11', SHAOLIN_SIDE08_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '毒镖密集一时受挫，幸得虚净、虚慧掷出石锁援护脱身！重整气息后可于【金刀石锁演武中庭】再战三刺客。',
                'warn',
                '金刀寿宴',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls08_11: {
    id: 'scene_sls08_11',
    title: '第十一幕 · 破网擒凶',
    subtitle: '金刀石锁演武中庭 · 尘埃落定',
    mandatory: true,
    beats: [
      N('激战数十合，你借庭中石锁掩护避开毒针影连环毒镖，先以迅雷不及掩耳之势放翻冷袖鬼与青竹蛇，再迎着漫天寒芒欺身直入毒针影怀中，一掌震碎其袖中铜筒机括，将其重重掼倒在青石板上！'),
      N('王元霸提着百炼金刀大步赶至，虚净与虚慧亦率王家护院合围上来，将三名动弹不得的关西刺客五花大绑。'),
      S(SPEAKER_ASSASSIN_BOSS, '（咬牙切齿，满脸不甘）“少林功夫……果然名不虚传……”'),
    ],
    onFinishEffects: [openScene('scene_sls08_12', SHAOLIN_SIDE08_QUEST_ID)],
  },

  scene_sls08_12: {
    id: 'scene_sls08_12',
    title: '第十二幕 · 肃清余波',
    subtitle: '金刀石锁演武中庭',
    mandatory: true,
    beats: [
      S('NPC-0186', '（收刀入鞘，望向插满毒箭的紫檀八仙桌，动容抱拳）“若非小师父早早识破戏班破绽、又在危急关头掀桌挡箭，老夫今日非但寿宴成丧宴，连满座洛阳乡绅都要遭殃！”'),
      S('NPC-0737', '（擦去额汗笑道）“方才我与虚净已搜查过戏班后台，真正的戏班班主被他们绑在柴房里，现已安然解救，绝无漏网之鱼！”'),
      S('NPC-0186', '“好！将这三个关西恶贼押交洛阳府衙严审！小师父，快随老夫移步【金刀威震正气大厅】，今日老夫定要重开雅席、当着洛阳群豪的面敬少林一杯大茶！”'),
    ],
    choices: [
      {
        id: 'sls08_to_hall',
        label: '随王元霸、虚净、虚慧移步【金刀威震正气大厅】',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE08_QUEST_ID, 'hall_alliance_toast'),
          toast(
            '刺客悉数伏法！请前往【金刀王家大宅 · 金刀威震正气大厅（ly_jd_hall）】赴答谢之宴。',
            'success',
            '金刀寿宴',
          ),
        ],
      },
    ],
  },

  scene_sls08_13: {
    id: 'scene_sls08_13',
    title: '第十三幕 · 正气举盏',
    subtitle: '金刀王家大宅 · 金刀威震正气大厅',
    illustrationUrl: '/assets/quests/sl_s08_alliance_toast.jpg',
    illustrationCaption: '铁血盟谊 · 正气大厅以茶代酒，少林与洛阳金刀王家缔结守望之盟',
    mandatory: true,
    beats: [
      N('金刀威震正气大厅内灯火辉煌，重整的寿宴气氛更胜先前。王元霸执意邀你坐于首席上座，以清茶代烈酒，高举白玉盏向满堂中原武林豪杰朗声宣告：'),
      S('NPC-0186', '“诸位英雄见证！今日少林内门高足救老夫于暗箭之下、护满堂宾客于危难之中，其智谋布局与一身正气，令老夫折服！自今日起，洛阳金刀王家与嵩山少林寺便是休戚与共的铁血盟友——凡少林有所需，王家倾尽家资人手，万死不辞！”'),
      N('满堂豪杰齐声叫好，虚净与虚慧亦深感与有荣焉。你在宴间就中原正道联防、河洛商道护镖之策与王元霸畅谈良久，言辞切中要害，令王老爷子频频击节。'),
    ],
    onFinishEffects: [openScene('scene_sls08_14', SHAOLIN_SIDE08_QUEST_ID)],
  },

  scene_sls08_14: {
    id: 'scene_sls08_14',
    title: '第十四幕 · 厚礼铁盟',
    subtitle: '金刀威震正气大厅',
    mandatory: true,
    beats: [
      S('NPC-0186', '（亲手奉上一匣百二十两雪花纹银）“小师父切莫推辞！这百二十两纹银非是俗礼，乃老夫捐助嵩山少林与师父游历江湖、行侠济贫的香火盘缠，日后但凡来洛阳，金刀王家的大门永远为你敞开！”'),
      P('（合十郑重接过，微笑还礼）“多谢王老爷子厚爱！愿金刀王家与嵩山少林情谊长存，共护河洛平安！”'),
    ],
    choices: [
      {
        id: 'sls08_complete',
        label: '以茶代酒缔结铁血盟谊，收下王家厚礼与宗门嘉奖！',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 360, reason: '洛阳金刀寿宴以一敌三力挫关西暗器杀手' },
          { type: 'addSectContribution', amount: 140 },
          { type: 'giveSilver', amount: 120, reason: '金刀王元霸重谢护寿纹银' },
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0186' }, delta: 20 },
          { type: 'modifyRenown', delta: 35, reason: '完成门派差事《金刀寿宴 · 洛阳暗箭》' },
          { type: 'completeQuest', questId: SHAOLIN_SIDE08_QUEST_ID, outcome: 'completed' },
          toast(
            '【金刀寿宴 · 洛阳暗箭】圆满完结！王元霸好感大增，获纹银 120 两、宗门贡献 140 与策论精进！',
            'success',
            '金刀寿宴',
          ),
        ],
      },
    ],
  },
}
