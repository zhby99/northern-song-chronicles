import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_SIDE03_QUEST_ID } from './huashanSideBotaiChessQuest'

const SPEAKER_MURONG_ENVOY: StorySpeakerSpec = {
  kind: 'custom',
  name: '慕容清砚',
  title: '江南姑苏 · 慕容氏棋待诏',
  factionName: '姑苏慕容',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

function buildMurongEnvoy(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS03_MURONG_ENVOY',
    name: '慕容清砚',
    title: '江南姑苏 · 慕容氏棋待诏',
    realm: '二流中品',
    factionName: '姑苏慕容',
    sectRank: 2,
    sectRankLabel: '慕容门客',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“华山剑客只会舞刀弄棒，既破了我棋局，便再尝尝江南袖箭与越女古剑吧！”',
    stats: { hp: 1250, mp: 680, agi: 48, res: 30 },
    talents: { bone: 64, comprehension: 72, charm: 66 },
    equippedArts: {
      neigong: 'MA-100',
      qinggong: 'MA-138',
      move1: 'MA-130',
      move2: 'MA-175',
      move3: 'MA-112',
    },
    learnedArts: [
      { artId: 'MA-100', level: 5 },
      { artId: 'MA-138', level: 5 },
      { artId: 'MA-130', level: 5 },
      { artId: 'MA-175', level: 6 },
      { artId: 'MA-112', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hss03_01: {
    id: 'scene_hss03_01',
    title: '第一幕 · 铁亭古枰',
    subtitle: '西岳绝顶 · 博台孤峰弈棋亭',
    mandatory: true,
    beats: [
      N('{reignYear}晴云万里，博台孤峰弈棋亭立于绝壁孤岩之上，四面皆是刀削千仞的险崖。你信步登亭，正见掌门「君子剑」岳沧溟与「玉女剑仙」宁清羽相对坐于石桌两旁，凝神推演一局黑白错落的古谱残局。'),
      S('NPC-0118', '（拈起一枚黑玉棋子悬于半空，微微笑道）“{gender:贤徒|女徒}来得正好。方才听闻你近来棋艺大进，不妨过来瞧瞧这盘『希夷赢华山』古残局。”'),
      S('NPC-0166', '“当年希夷先生陈抟老祖便是在此孤峰铁亭与太祖皇帝对弈，一局赢下西岳华山免税敕旨。只是石壁上拓下来的后半残谱，黑棋大龙被白子合围于天元与东南两角，我与掌门师兄推演半日，总觉差了一口活气。”'),
    ],
    onFinishEffects: [openScene('scene_hss03_02', HUASHAN_SIDE03_QUEST_ID)],
  },

  scene_hss03_02: {
    id: 'scene_hss03_02',
    title: '第二幕 · 观局悟剑',
    subtitle: '博台孤峰弈棋亭石案',
    mandatory: true,
    beats: [
      N('你俯身细观石枰：白子势如重兵合围，黑棋中腹大龙仅剩两气，若一味在角上补活，外势尽失；若贸然冲断，反会被白子反扑提尽。'),
      P('（目光扫过纵横十九道，忽觉棋理与华山剑道「奇正相生、舍末取本」竟有异曲同工之妙）“师父、师叔，弟子观这残局，黑棋看似险象环生，实则暗藏三手弃子腾挪之妙着！”'),
      S('NPC-0118', '（抚须颔首，眼中浮起赞许）“哦？既有所悟，不妨执黑落子一试。若能三子盘活大龙，为师便将当年所得珍藏古枰赠你。”'),
    ],
    onFinishEffects: [openScene('scene_hss03_03', HUASHAN_SIDE03_QUEST_ID)],
  },

  scene_hss03_03: {
    id: 'scene_hss03_03',
    title: '第三幕 · 三子定势',
    subtitle: '博台石枰 · 残局推演',
    mandatory: true,
    beats: [
      N('山风拂过棋盘，你指尖拈起冰凉温润的黑玉云子，凝神思索破局第一手与连环三着！'),
    ],
    choices: [
      {
        id: 'hss03_move_brilliant',
        label: '弃东南四子，点入白棋腰眼，再以一记凌空「飞镇」贯通中腹！（妙手）',
        subLabel: '弃末取本 · 奇正相生之棋道',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'hs_side03_chess_brilliant', value: true },
          openScene('scene_hss03_04', HUASHAN_SIDE03_QUEST_ID),
        ],
      },
      {
        id: 'hss03_move_steady',
        label: '先于东南角做劫周旋，借劫材打拔外围白子，步步为营稳扎活眼',
        subLabel: '守中伺隙 · 以稳破险之棋道',
        tone: 'jade',
        effects: [openScene('scene_hss03_04', HUASHAN_SIDE03_QUEST_ID)],
      },
    ],
  },

  scene_hss03_04: {
    id: 'scene_hss03_04',
    title: '第四幕 · 博台解枰',
    subtitle: '绝顶石桌前执黑破局',
    illustrationUrl: '/assets/quests/hs_side03_chen_tuan_go.jpg',
    illustrationCaption: '博台解枰 · 绝顶石桌前执黑三子破陈抟希夷古谱残局',
    mandatory: true,
    beats: [
      N('“嗒！嗒！嗒！”三枚黑子接连落于石枰之上，清脆如剑击青石！第一手舍角诱敌，第二手尖刺腰眼，第三手如孤雁凌空贯通中腹——原本岌岌可危的黑龙刹那间气脉相连，反将白棋外势割裂得支离破碎！'),
      S('NPC-0118', '（抚掌大笑，神色大悦）“妙极！妙极！舍局部小利而夺全局先机，这三手不仅破了希夷古残局，更暗合我华山剑法『守正出奇、以势压人』之真谛！”'),
      S('NPC-0166', '（亦含笑点头）“假以时日，{gender:贤侄|贤侄女}棋剑双修，必成大器。”'),
    ],
    onFinishEffects: [openScene('scene_hss03_05', HUASHAN_SIDE03_QUEST_ID)],
  },

  scene_hss03_05: {
    id: 'scene_hss03_05',
    title: '第五幕 · 姑苏拜帖',
    subtitle: '博台孤峰石阶',
    mandatory: true,
    beats: [
      N('正谈笑间，一名知客弟子疾步登亭，呈上一张洒金云纹拜帖：“禀掌门！山下来了一名自称江南姑苏慕容氏『棋待诏』的青衫文士，名叫慕容清砚，言称久仰西岳博台陈抟遗风，特来讨教纹枰绝艺，言辞间颇多傲慢！”'),
      S('NPC-0118', '（眉梢微挑，淡淡一笑）“姑苏慕容氏素以『以彼之道、还施彼身』闻名江南，这棋待诏不远千里登临西岳，只怕来者不善。三日后午时便在博台设枰相候，{gender:徒儿|女徒}既已破了希夷残局，届时便由你代为师出面会会这位江南雅士！”'),
      P('“弟子遵命！三日后定于博台孤峰弈棋亭静候慕容来使！”'),
    ],
    choices: [
      {
        id: 'hss03_accept_duel',
        label: '领命备弈，三日后于博台孤峰弈棋亭迎战江南棋待诏',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_SIDE03_QUEST_ID, stepId: 'meet_murong_envoy' },
          setStep(HUASHAN_SIDE03_QUEST_ID, 'meet_murong_envoy'),
          toast('已定下博台三日棋约！请于【博台孤峰弈棋亭（tg_sm_chess）】会晤慕容清砚。', 'talk', '希夷残局'),
        ],
      },
    ],
  },

  scene_hss03_06: {
    id: 'scene_hss03_06',
    title: '第六幕 · 江南傲客',
    subtitle: '三日后 · 博台孤峰弈棋亭',
    mandatory: true,
    beats: [
      N('三日转瞬即至。博台石亭云雾缥缈，一名手摇玉骨折扇、身着江南冰蚕丝长衫的清瘦文士昂然步入亭中，正是慕容清砚。他先向岳沧溟虚拱一礼，随即斜睨着年轻的你，嘴角挂起一抹轻蔑冷笑。'),
      S(SPEAKER_MURONG_ENVOY, '“久闻西岳华山乃关中大派，不想岳掌门竟派一名初入内门的年轻弟子出来应局。莫非华山上下，已无人敢接慕容某这盘『姑苏十绝谱』？”'),
      P('（神色自若，抬手虚请）“待诏先生远来是客。棋道不论年齿，剑道亦然。请落子便是，若先生胜得过晚辈，再请家师出手不迟。”'),
      S(SPEAKER_MURONG_ENVOY, '（冷哼一声，拂袖落座）“好大的口气！既然华山弟子不知天高地厚，今日便叫你输得心服口服！”'),
    ],
    onFinishEffects: [openScene('scene_hss03_07', HUASHAN_SIDE03_QUEST_ID)],
  },

  scene_hss03_07: {
    id: 'scene_hss03_07',
    title: '第七幕 · 纹枰交锋',
    subtitle: '博台石枰 · 对弈慕容清砚',
    mandatory: true,
    beats: [
      N('黑白二子你来我往，不过五十余手，棋盘上已杀机四伏。慕容清砚棋风诡谲刁钻，专喜在角部设下连环假劫诱敌深入，忽地一记「跨断」直劈你中腹要津，冷笑连连：“华山小友，你这中腹黑龙已断为两截，还不投子认输？”'),
      N('你凝眸细察，忽觉对方看似凶悍的「跨断」竟在三路留下一处极隐蔽的征子漏招——正与三日前所悟陈抟古谱之理暗合！'),
    ],
    choices: [
      {
        id: 'hss03_go_counter_1',
        label: '反手一记「长气反扑」引出连环征子，直捣白棋中腹大本营！',
        subLabel: '以希夷古谱弃子之法反制姑苏诡棋',
        tone: 'gold',
        effects: [openScene('scene_hss03_08', HUASHAN_SIDE03_QUEST_ID)],
      },
      {
        id: 'hss03_go_counter_2',
        label: '稳守外势、先提角部死筋，再回手封锁白棋退路逼其玉碎！',
        subLabel: '以华山沉稳气度化解诡计',
        tone: 'jade',
        effects: [openScene('scene_hss03_08', HUASHAN_SIDE03_QUEST_ID)],
      },
    ],
  },

  scene_hss03_08: {
    id: 'scene_hss03_08',
    title: '第八幕 · 败局生歹',
    subtitle: '博台孤峰弈棋亭',
    mandatory: true,
    beats: [
      N('不过十余手，你落子如飞，步步紧逼！慕容清砚额角冷汗涔涔而下，原本自诩必胜的江南诡谱竟被你拆得千疮百孔，整条白龙沦为死棋！'),
      S(SPEAKER_MURONG_ENVOY, '（脸色铁青，握扇的手指微微发抖）“这……这不可能！你一介华山武夫，怎会识破姑苏十绝谱的暗劫变化？！”'),
      N('电光石火间，慕容清砚假作拂袖认输，宽大冰蚕丝袖口却骤然微抖——三点寒星无声无息自袖底疾射而出，直取你眉心与咽喉！竟是江湖极为阴毒的「甩手袖箭」！'),
      P('（早从他落子失态时便察觉其气息暗凝，足尖猛点石凳侧身避过寒星，长剑同时铿然出鞘！）“好个姑苏雅士！赢不了棋便动暗器，慕容家的颜面都被你丢尽了！”'),
    ],
    onFinishEffects: [openScene('scene_hss03_09', HUASHAN_SIDE03_QUEST_ID)],
  },

  scene_hss03_09: {
    id: 'scene_hss03_09',
    title: '第九幕 · 以棋驭剑',
    subtitle: '博台孤峰弈棋亭（1v1 实战）',
    illustrationUrl: '/assets/quests/hs_side03_chess_sword_duel.jpg',
    illustrationCaption: '以棋驭剑 · 识破慕容棋待诏袖箭暗算，十合剑势将其震落亭阶',
    mandatory: true,
    beats: [
      N('暗算落空，慕容清砚索性撕破文士伪装，自玉骨扇柄中抽出一柄寒光凛冽的江南软剑，厉声喝道：“既然被你看破，今日便拿剑法分个高下！”'),
      S('NPC-0118', '（负手立于亭畔并未插手，沉声喝道）“{gender:徒儿|女徒}，以方才破局之棋意入剑，叫这位江南来客见识见识西岳华山剑道的堂皇气象！”'),
    ],
    choices: [
      {
        id: 'hss03_fight_murong',
        label: '以棋驭剑，正面迎战慕容清砚！（二流中品 · 宗门较技）',
        subLabel: '切磋点到为止，将其震落亭阶折服其心',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_SIDE03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildMurongEnvoy() },
            rule: 'story_trial',
            forbidEscapeReason: '博台绝顶众目睽睽，岂能退缩损我华山清誉！',
            introText: '【1v1 博台斗剑】以棋驭剑迎战二流中品江南棋待诏【慕容清砚】！',
            onWin: [openScene('scene_hss03_10', HUASHAN_SIDE03_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('慕容清砚软剑与袖箭诡谲难防，暂退半步稳住呼吸再战！', 'warn', '博台斗剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_hss03_10: {
    id: 'scene_hss03_10',
    title: '第十幕 · 震落亭阶',
    subtitle: '博台孤峰石阶',
    mandatory: true,
    beats: [
      N('你心中如明镜高悬，将博台十九道经纬化作剑势格局：慕容清砚软剑愈是刁钻诡变，你剑招愈是守中含奇、步步夺先！'),
      N('十合甫过，你长剑划出一道清越圆弧，精准绞住其软剑剑脊，丹田内劲一吐——“当啷”一声脆响，软剑脱手斜插石缝，慕容清砚胸口被剑柄余劲一撞，踉跄着连退七步跌坐于亭阶之下，玉冠歪斜，狼狈不堪！'),
      S(SPEAKER_MURONG_ENVOY, '（面色惨白，再无半点傲气，拾起软剑抱拳低头）“华山剑客……棋艺与剑道皆深不可测！慕容某技不如人，愧对西岳高风，告辞！”'),
    ],
    onFinishEffects: [openScene('scene_hss03_11', HUASHAN_SIDE03_QUEST_ID)],
  },

  scene_hss03_11: {
    id: 'scene_hss03_11',
    title: '第十一幕 · 棋剑合一',
    subtitle: '博台孤峰弈棋亭',
    mandatory: true,
    beats: [
      N('望见慕容清砚灰溜溜下山的背影，铁亭内响起宁清羽清朗的笑声。岳沧溟亲手斟了两盏热茶递与你，又将一方温润典雅的黄杨便携棋枰与滇南永昌云子置入你怀中。'),
      S('NPC-0118', '“今日一役，先以纹枰折其傲气，再以剑势破其暗算，却不伤其性命，尽显我华山名门风范！这套『滇南永昌云子黄杨便携枰』与一饼御赐『北苑龙团胜雪茶饼』，便赐予你作纪念。”'),
      S('NPC-0166', '“经此博台论弈，你于纵横布局之道又进一层，回去细细体悟今日剑中棋意，于本门剑法必有大益！”'),
    ],
    onFinishEffects: [openScene('scene_hss03_12', HUASHAN_SIDE03_QUEST_ID)],
  },

  scene_hss03_12: {
    id: 'scene_hss03_12',
    title: '第十二幕 · 希夷遗韵',
    subtitle: '西岳绝顶云海',
    mandatory: true,
    beats: [
      N('你捧着温润黄杨棋枰凭栏远眺，只见关中平野尽收眼底，云海翻涌如黑白大势。胸中剑意与棋理交融贯通，顿觉神清气爽。'),
    ],
    choices: [
      {
        id: 'hss03_complete',
        label: '收起黄杨棋枰，以棋理涵养本脉剑意（完成支线）',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 45, reason: '博台破局挫敌师门赏银' },
          { type: 'addSectContribution', amount: 55 },
          { type: 'giveCombatExp', amount: 600, reason: '博台以棋驭剑力挫慕容棋待诏' },
          { type: 'modifyRenown', delta: 20, reason: '博台弈剑双绝折服江南慕容来使' },
          { type: 'modifySkill', key: '棋', delta: 1 },
          {
            type: 'branch',
            condition: flag('hs_branch', 'eq', 'qi'),
            thenEffects: [{ type: 'addArtExp', artId: 'MA-147', amount: 280 }],
            elseEffects: [{ type: 'addArtExp', artId: 'MA-128', amount: 280 }],
          },
          { type: 'giveItem', itemId: 'ITM-CUR-017', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-114', qty: 1 },
          { type: 'completeQuest', questId: HUASHAN_SIDE03_QUEST_ID },
          toast('已完成《博台纹枰 · 希夷残局录》！棋艺与本脉剑法修为大进！', 'success', '希夷残局'),
        ],
      },
    ],
  },
}
