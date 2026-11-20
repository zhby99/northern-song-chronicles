import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE01_QUEST_ID } from './shaolinSideFireStickQuest'

const SPEAKER_THIEF_LEADER: StorySpeakerSpec = {
  kind: 'custom',
  name: '瘦猴孙七',
  title: '少室山脚偷粮贼首',
  factionName: '登封地痞',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_THIEF_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '泥鳅赵二',
  title: '偷粮毛贼',
  factionName: '登封地痞',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildThiefLeader(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS01_SUN_QI',
    name: '瘦猴孙七',
    title: '偷粮贼首 · 滑手鼠辈',
    realm: '三流下品',
    factionName: '登封地痞',
    sectRank: 0,
    sectRankLabel: '毛贼头目',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“嘿嘿，一个烧火的小和尚拿根黑炭木棍也敢拦爷爷财路？弟兄们，先敲晕他再扛米！”',
    stats: { hp: 440, mp: 180, agi: 26, res: 14 },
    talents: { bone: 45, comprehension: 38, charm: 24 },
    equippedArts: { neigong: 'MA-199', qinggong: 'MA-218', move1: 'MA-189', move2: 'MA-201' },
    learnedArts: [
      { artId: 'MA-199', level: 3 },
      { artId: 'MA-218', level: 3 },
      { artId: 'MA-189', level: 3 },
      { artId: 'MA-201', level: 3 },
    ],
  })
}

function buildThiefMinion1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS01_ZHAO_ER',
    name: '泥鳅赵二',
    title: '偷粮毛贼 · 翻墙手',
    realm: '不入流',
    factionName: '登封地痞',
    sectRank: 0,
    sectRankLabel: '偷粮毛贼',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“哎哟这黑棍子专捅脚脖子！大哥快帮我一把！”',
    stats: { hp: 250, mp: 90, agi: 18, res: 9 },
    talents: { bone: 36, comprehension: 30, charm: 22 },
    equippedArts: { neigong: 'MA-199', qinggong: 'MA-218', move1: 'MA-201', move2: 'MA-204' },
    learnedArts: [
      { artId: 'MA-199', level: 1 },
      { artId: 'MA-218', level: 2 },
      { artId: 'MA-201', level: 2 },
      { artId: 'MA-204', level: 1 },
    ],
  })
}

function buildThiefMinion2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS01_QIAN_SI',
    name: '鼠眼钱四',
    title: '偷粮毛贼 · 望风手',
    realm: '不入流',
    factionName: '登封地痞',
    sectRank: 0,
    sectRankLabel: '偷粮毛贼',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“少林寺的腊八新米最值钱，抢两袋就溜！”',
    stats: { hp: 240, mp: 85, agi: 19, res: 9 },
    talents: { bone: 35, comprehension: 28, charm: 20 },
    equippedArts: { neigong: 'MA-199', qinggong: 'MA-218', move1: 'MA-204', move2: 'MA-201' },
    learnedArts: [
      { artId: 'MA-199', level: 1 },
      { artId: 'MA-218', level: 2 },
      { artId: 'MA-204', level: 2 },
      { artId: 'MA-201', level: 1 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls01_01: {
    id: 'scene_sls01_01',
    title: '第一幕 · 灶僧回山',
    subtitle: '罗汉堂演武正殿外庑',
    mandatory: true,
    beats: [
      N('{reignYear}午后日色暖融，罗汉堂演武正殿西侧的柴堆前木屑纷飞。只见禅武僧虚真挽着灰布袖口，正与一名身材矮壮、衣襟沾满松灰的笑面老僧合力码放干柴。'),
      S('NPC-0842', '（抹去额角细汗，向你招手）“师弟来得正好！这位是自东京汴梁大相国寺回山述职的【觉尘】师叔——寺里今冬新收的数百石斋粮刚入大斋堂仓房，人手实在周转不开。”'),
      S('NPC-0901', '（咧嘴一笑，手里把玩着一根熏得乌黑油亮的老枣木烧火棍）“阿弥陀佛！洒家在汴梁大相国寺烧了二十年大灶，回少室山照旧闲不住手。小师侄若无紧要功课，可愿搭把手担两挑山泉、劈几捆硬柴？”'),
    ],
    onFinishEffects: [openScene('scene_sls01_02', SHAOLIN_SIDE01_QUEST_ID)],
  },

  scene_sls01_02: {
    id: 'scene_sls01_02',
    title: '第二幕 · 欣然帮厨',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      P('（合十含笑）“扫地担水皆是修行！觉尘师叔远道回山，劈柴添薪的粗活便交予弟子来搭手吧。”'),
      S('NPC-0901', '“哈哈，好个不骄不躁的娃儿！灶膛生火里头也藏着腕力与步法的门道呢——走，随洒家与虚真进大斋堂灶房去！”'),
    ],
    choices: [
      {
        id: 'sls01_accept',
        label: '随虚真与觉尘前往大斋堂灶房担水添薪',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE01_QUEST_ID, stepId: 'kitchen_night_watch' },
          setStep(SHAOLIN_SIDE01_QUEST_ID, 'kitchen_night_watch'),
          toast(
            '已应下大斋堂帮厨之托！请于【罗汉堂演武正殿（sl_luohan_main）】助觉尘添薪并夜守粮仓。',
            'talk',
            '烧火奇棍',
          ),
        ],
      },
    ],
  },

  scene_sls01_03: {
    id: 'scene_sls01_03',
    title: '第三幕 · 灶膛抽薪',
    subtitle: '少室大斋堂 · 灶房',
    illustrationUrl: '/assets/quests/sl_s01_kitchen_stick.jpg',
    illustrationCaption: '少室大斋堂 · 灶膛抽薪，觉尘传授质朴刁钻拨火棍诀',
    mandatory: true,
    beats: [
      N('大斋堂八口千斤铁锅热气腾腾，松枝在砖砌灶膛里噼啪作响。你挑满三大缸山泉，又蹲在灶口帮觉尘翻拨炭火，却总觉得柴块压实了透不过风。'),
      S('NPC-0901', '（接过你手中焦黑的老枣木烧火棍，手腕一沉一抖）“瞧好了！拨火讲究『斜插底、轻挑心、横扫灰、急抽薪』——切莫傻使蛮力硬捅，要借腕底寸劲从下往上钻空子！”'),
      N('只见那根乌黑烧火棍在觉尘手里如灵蛇翻滚，既不碰灶壁，也不扬火星，三两下便把闷火挑得通红炽烈。你定睛细看，竟隐约觉出这几式拨火动作暗合少林棍法下盘虚实变化！'),
    ],
    onFinishEffects: [openScene('scene_sls01_04', SHAOLIN_SIDE01_QUEST_ID)],
  },

  scene_sls01_04: {
    id: 'scene_sls01_04',
    title: '第四幕 · 拨火暗诀',
    subtitle: '少室大斋堂 · 暮色初降',
    mandatory: true,
    beats: [
      P('（心中一动，依样画葫芦轻抖腕力演练了两下）“师叔这『斜插底、急抽薪』，看似烧火家常，实则专攻下盘破绽、借力打力！”'),
      S('NPC-0901', '（挤眉弄眼，压低嗓音笑道）“嘿，孺子可教！大相国寺菜园子外头常有泼皮偷菜，洒家又不能动少林重兵器伤人性命，便琢磨出这套【拨火棍诀】专戳人脚踝膝弯，保准摔他个嘴啃泥还不伤筋骨！”'),
      S('NPC-0842', '（推门进来低声道）“师叔、师弟，晚课毕了。方才香积厨老僧说后墙外似乎有生人踩点，怕是山下贼人盯上了新入仓的冬米，今晚咱们轮流在灶房外头打个盹儿守着？”'),
    ],
    onFinishEffects: [openScene('scene_sls01_05', SHAOLIN_SIDE01_QUEST_ID)],
  },

  scene_sls01_05: {
    id: 'scene_sls01_05',
    title: '第五幕 · 鼠辈潜仓',
    subtitle: '大斋堂粮仓 · 三更夜色',
    mandatory: true,
    beats: [
      N('夜半三更，少室山万籁俱寂，唯余松涛沙沙。果不其然，大斋堂后窗纸忽被湿指轻轻捅开一洞，紧接着三条鬼祟黑影猫腰翻入粮仓，手里还拎着三条空麻袋与短铁尺！'),
      S(SPEAKER_THIEF_A, '（贼眉鼠眼地压低声音）“孙七哥，真没看错，满屋子都是白花花的新粳米！这群和尚早睡熟了，咱们一人扛两袋下山卖给黑市，够喝半年花酒！”'),
      S(SPEAKER_THIEF_LEADER, '“闭嘴！麻利点装袋，别惊动了罗汉堂那群武僧……”'),
    ],
    onFinishEffects: [openScene('scene_sls01_06', SHAOLIN_SIDE01_QUEST_ID)],
  },

  scene_sls01_06: {
    id: 'scene_sls01_06',
    title: '第六幕 · 顺手抄棍',
    subtitle: '大斋堂灶房外',
    mandatory: true,
    beats: [
      N('你听得真切，正欲起身寻兵刃，却见手边空空，唯独灶口斜倚着那根沾满锅底黑灰的老枣木烧火棍！觉尘在暗处朝你眨了眨眼，低声吟出四句口诀：'),
      S('NPC-0901', '“『火旺抽底薪，灰厚扫地尘；莫贪高头势，专点脚底筋！』——师侄，拿这根烧火棍试试手！”'),
      P('（一把抄起微温的焦黑烧火棍，大步跨出院心喝道）“大胆毛贼！佛门清净斋粮，岂容尔等鼠辈宵小偷盗！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side01_thieves_ready', value: true },
      openScene('scene_sls01_07', SHAOLIN_SIDE01_QUEST_ID),
    ],
  },

  scene_sls01_07: {
    id: 'scene_sls01_07',
    title: '第七幕 · 灶棍破贼',
    subtitle: '大斋堂庭院 · 夜战偷粮三贼',
    mandatory: true,
    beats: [
      S(SPEAKER_THIEF_LEADER, '（恼羞成怒，晃动短刀恶狠狠扑来）“原来只是个守灶房的毛头小僧！弟兄们别怕，拿一根破烧火棍能奈咱们何？并肩子上！”'),
      N('三名偷粮贼呈品字形扑来，你依着觉尘口诀沉肩压棍，焦黑枣木棍头带起一溜松灰，专往三人下盘膝弯刁钻捅去！'),
    ],
    choices: [
      {
        id: 'sls01_fight_thieves',
        label: '挥动焦黑烧火棍，迎战偷粮贼首瘦猴孙七与两名毛贼（三流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildThiefLeader() },
            extraOpponents: [
              { kind: 'custom', npc: buildThiefMinion1() },
              { kind: 'custom', npc: buildThiefMinion2() },
            ],
            rule: 'story_trial',
            forbidEscapeReason: '粮仓重地近在咫尺，岂可放任偷粮贼逃脱！',
            introText:
              '【灶房护粮】手持焦黑烧火棍，在大斋堂庭院迎战偷粮贼首【瘦猴孙七（三流下品）】与两名毛贼！',
            onWin: [openScene('scene_sls01_08', SHAOLIN_SIDE01_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '一时失手被毛贼绊倒！拍去尘土重整架势，可在【罗汉堂演武正殿】再战偷粮三贼！',
                'warn',
                '烧火奇棍',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls01_08: {
    id: 'scene_sls01_08',
    title: '第八幕 · 锅底乌灰',
    subtitle: '大斋堂庭院',
    illustrationUrl: '/assets/quests/sl_s01_ash_thieves.jpg',
    illustrationCaption: '锅底乌灰 · 烧火奇棍连戳三贼下盘，满院僧众哄堂大笑',
    mandatory: true,
    beats: [
      N('你越打越顺手，一招「釜底抽薪」扫翻泥鳅赵二，紧接着「拨灰见炭」连戳鼠眼钱四脚踝，最后反手一记「乌炭点眉」不偏不倚点在瘦猴孙七鼻尖，震得他一屁股坐进灶灰堆里！'),
      N('闻声披衣赶来的满院少林僧众举起灯笼一照——只见三个偷粮毛贼浑身上下、满脸鼻梁尽是黑漆漆的锅底乌灰，活像三只刚从灶膛里钻出来的花猫，顿时哄堂大笑！'),
      S(SPEAKER_THIEF_LEADER, '（连咳带喘，磕头如捣蒜）“大师饶命！小人再也不敢偷少林寺的米了！这……这烧火棍怎么比铁禅杖还邪门啊！”'),
    ],
    onFinishEffects: [openScene('scene_sls01_09', SHAOLIN_SIDE01_QUEST_ID)],
  },

  scene_sls01_09: {
    id: 'scene_sls01_09',
    title: '第九幕 · 悟透奇棍',
    subtitle: '大斋堂庭院 · 灯火通明',
    mandatory: true,
    beats: [
      N('虚真笑着领几名武僧将三个黑脸毛贼捆成一串押去山门交与登封官差。觉尘拍着肚皮笑得前仰后合，走上前接过烧火棍在手里掂了掂，又郑重交还到你手中。'),
      S('NPC-0901', '“妙啊妙啊！没伤着筋骨，却把三个泼皮收拾得服服帖帖！小师侄悟性极佳，方才临阵那几下抽、拨、捅、点，已将洒家压箱底的《少林烧火棍》悟出了七八分精髓！”'),
      S('NPC-0842', '（合十赞叹）“佛法无处不在，原以为只是寻常灶房杂务，不想师弟竟从中悟出奇诡棍法，实在令人佩服！”'),
    ],
    onFinishEffects: [openScene('scene_sls01_10', SHAOLIN_SIDE01_QUEST_ID)],
  },

  scene_sls01_10: {
    id: 'scene_sls01_10',
    title: '第十幕 · 斋堂赠棍',
    subtitle: '少室大斋堂',
    mandatory: true,
    beats: [
      S('NPC-0901', '“洒家过两日便要回汴梁大相国寺了。这根跟了洒家十年的老枣木【少室灶房烧火棍】熏得比铁木还沉实，今日连同全套《少林烧火棍》棍诀一并赠予你——日后行侠江湖，切莫小瞧了这根黑木棍！”'),
      P('（双手郑重接过焦黑老枣木棍，向觉尘与虚真深施一礼）“多谢觉尘师叔赐棍传艺，多谢虚真师兄照拂！”'),
    ],
    choices: [
      {
        id: 'sls01_complete',
        label: '收下【少室灶房烧火棍】，铭记《少林烧火棍》全套棍诀！',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-192' },
          { type: 'giveItem', itemId: 'WPN-095', qty: 1 },
          { type: 'giveCombatExp', amount: 60, reason: '大斋堂夜战偷粮三贼悟出烧火奇棍' },
          { type: 'addSectContribution', amount: 30 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0901' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0842' }, delta: 10 },
          { type: 'modifyRenown', delta: 15, reason: '完成门派差事《灶房残薪 · 烧火奇棍》' },
          { type: 'completeQuest', questId: SHAOLIN_SIDE01_QUEST_ID, outcome: 'completed' },
          toast(
            '习得《少林烧火棍》并获赠【少室灶房烧火棍】！觉尘与虚真对你大为赞赏！',
            'success',
            '烧火奇棍',
          ),
        ],
      },
    ],
  },
}
