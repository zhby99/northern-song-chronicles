import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, flag, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q35_QUEST_ID } from './zhongnanMuSuxinAwakenQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq35_01: {
    id: 'scene_znq35_01',
    title: '第一幕 · 残雪初梅',
    subtitle: '终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('{reignYear}早春，终南幽谷残雪消融，漫坡山梅与早桃竞相绽放，落英随涧风纷扬于青石剑坪之上，如织锦绣。'),
      S('NPC-0114', '（一袭素白长裙立于落花之间，折下一枝带露寒梅轻嗅，声音清远如梦）“你可知道，这座石坪为何唤作‘双剑合璧坪’？”'),
      P('（拱手垂听）“莫非与昔年重阳剑法与玉女剑法之渊源有关？”'),
    ],
    onFinishEffects: [openScene('scene_znq35_02', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_02: {
    id: 'scene_znq35_02',
    title: '第二幕 · 破尽重阳',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0114', '（轻挥梅枝，在空中划出数道飘逸绝伦的剑弧）“当年我创玉女剑法，招招针对重阳剑法破绽，本意是要破尽王重楼平生所学。可练到最后一式时，我却猛然惊觉……”'),
      S('NPC-0114', '“世上最能克制重阳剑法的招式，反过来，也正是世上最能补全重阳剑法破绽的招式！一刚一柔，一正一奇，相克到极致，便是相生！”'),
    ],
    onFinishEffects: [openScene('scene_znq35_03', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_03: {
    id: 'scene_znq35_03',
    title: '第三幕 · 素心之秘',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0114', '“这便是《玉女素心剑法》的真正奥义——双剑合璧，刚柔并济，天下间没有任何一门单路武学能挡住这两套剑法合而为一的威力。”'),
      N('{ifFlag:zn_cross==harmony|林朝瑶目光柔和地望向你：“如今道墓既已合流，你身兼两脉气象，今日我便与你拆解双剑合璧之诀，令重阳与玉女真正合为一炉！”|林朝瑶眸光一黯，旋即透出孤绝决然：“如今道墓既已割席，再无双剑合璧之人。然剑道至极，亦可凭一颗绝世冰心分心二用——左手使重阳剑意，右手使玉女剑招，以一人之身演尽两仪乾坤！”}'),
    ],
    onFinishEffects: [openScene('scene_znq35_04', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_04: {
    id: 'scene_znq35_04',
    title: '第四幕 · 梅枝演剑',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('林朝瑶话音未落，足尖点地，手中寒梅枝轻颤，忽而化作飘忽灵动的玉女剑影，忽而转为端庄沉雄的重阳剑势，落花被剑风卷起，竟在空中凝成阴阳鱼之形！'),
      P('（凝神细观，只觉脑海之中昔日所学诸般剑理豁然贯通，如拨云见日）“妙哉！刚不至折，柔不至靡，进退之间浑然天成！”'),
    ],
    onFinishEffects: [openScene('scene_znq35_05', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_05: {
    id: 'scene_znq35_05',
    title: '第五幕 · 繁花剑影',
    subtitle: '繁花幽谷双剑合璧坪 · 梅下论剑',
    illustrationUrl: '/assets/quests/zn_q35_flower_valley.jpg',
    illustrationCaption: '繁花幽谷双剑合璧坪 · 漫天梅瓣随剑风飞舞，林朝瑶以梅枝点破玉女素心剑法极意',
    mandatory: true,
    beats: [
      N('便在剑意渐入佳境之际，幽谷南口忽然传来一声刺耳的铁杖顿石巨响！漫天飞舞的梅瓣竟被一股阴寒暴戾的指风瞬间震成齑粉！'),
    ],
    onFinishEffects: [openScene('scene_znq35_06', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_06: {
    id: 'scene_znq35_06',
    title: '第六幕 · 恶首突至',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('一道干瘦青袍身影拄着双根精钢铁杖，踏着碎裂的青石缓步踏入花坪，正是西夏一品堂首席宗师、四大恶人之首——“恶贯满盈”段延庆！'),
      S('NPC-1053', '（腹语阴沉如铁石摩擦，响彻山谷）“好一处繁花幽谷！叶二娘与岳老三两个废物败在此处，倒叫老夫亲自走这一遭。林朝瑶，交出《玉女心经》与终南剑谱，老夫饶你们全尸！”'),
    ],
    onFinishEffects: [openScene('scene_znq35_07', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_07: {
    id: 'scene_znq35_07',
    title: '第七幕 · 临阵磨锋',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0114', '（冷哼一声，衣袂飘飞，挡在你身侧半步）“段延庆，昔日大理皇室太子沦落至此，替西夏当狗还敢在终南山大放厥词！今日便拿你来试我门下新悟的《玉女素心剑法》！”'),
      P('（拔剑在手，剑锋微鸣，眼中燃起前所未有的澄明战意）“段延庆，今日此坪，便是你折杖败走之地！”'),
    ],
    onFinishEffects: [openScene('scene_znq35_08', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_08: {
    id: 'scene_znq35_08',
    title: '第八幕 · 剑指恶贯',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('段延庆独眼寒芒暴射，双杖点地，大理一阳指无形指劲已封死四周退路！'),
    ],
    choices: [
      {
        id: 'znq35_accept',
        label: '拔剑迎击【恶贯满盈 · 段延庆】，于激战中彻悟玉女素心剑法！',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q35_QUEST_ID, stepId: 'suxin_duel_duan' },
          setStep(ZHONGNAN_Q35_QUEST_ID, 'suxin_duel_duan'),
          toast('已接取《繁花似锦 · 玉女素心》！请于双剑合璧坪决战段延庆！', 'warn', '玉女素心'),
        ],
      },
    ],
  },

  scene_znq35_09: {
    id: 'scene_znq35_09',
    title: '第九幕 · 一阳指威',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('段延庆一出手便是杀招！双杖化作漫天铁影，杖尖挟带凌厉无比的一阳指劲隔空点来，青石坪面瞬间被洞穿出十余个深达半尺的指孔！'),
      S('NPC-1053', '（腹语冷笑）“凭你们这些花架子，也想接老夫的大理一阳指？！”'),
    ],
    onFinishEffects: [openScene('scene_znq35_10', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_10: {
    id: 'scene_znq35_10',
    title: '第十幕 · 铁杖临坪',
    subtitle: '双剑合璧坪 · 段延庆显威',
    illustrationUrl: '/assets/quests/zn_q35_duan_arrival.jpg',
    illustrationCaption: '繁花幽谷双剑合璧坪 · 段延庆双杖挟一阳指劲破空点来，落花尽碎',
    mandatory: true,
    beats: [
      N('一阳指劲霸道绝伦，寻常单剑格挡竟隐隐有震裂虎口之势！你目光骤亮，猛然想起林朝瑶方才以梅枝演化的两仪剑理！'),
    ],
    onFinishEffects: [openScene('scene_znq35_11', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_11: {
    id: 'scene_znq35_11',
    title: '第十一幕 · 刚柔破局',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('{ifFlag:zn_cross==harmony|林朝瑶长剑出鞘，如白虹贯日般掠至你身侧：“{gender:孩子|丫头}，你使重阳正剑破他铁杖刚猛，我使玉女奇剑截他一阳指路——双剑合璧！”刹那间，一刚一柔两道剑光交织成密不透风的剑幕，将段延庆的无形指风悉数化于无形！|你深吸一口寒气，反手拔出副剑，灵台瞬间一分为二！左手剑势沉雄端方，使出重阳剑法硬撼铁杖；右手剑势轻灵飘逸，使出玉女剑法专点指风破绽——分心二用，一人双剑！}'),
    ],
    onFinishEffects: [openScene('scene_znq35_12', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_12: {
    id: 'scene_znq35_12',
    title: '第十二幕 · 恶首惊骇',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-1053', '（攻势骤然受阻，独眼瞳孔猛缩，腹语第一次透出惊怒）“怎么可能？！重阳剑法与玉女剑法本是水火不容，怎会如此天衣无缝地合为一式？！”'),
      P('（剑意如泉涌，朗声清喝）“相克到极致，便是相生！段延庆，这便是终南至高剑道——《玉女素心剑法》！”'),
    ],
    onFinishEffects: [teachArtNow('MA-031'), openScene('scene_znq35_13', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_13: {
    id: 'scene_znq35_13',
    title: '第十三幕 · 素心初绽',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('剑光流转间，漫天残梅仿佛被温柔的剑意重新托起，化作千百朵旋转不息的花影剑气！“浪迹天涯”、“花前月下”、“清饮小酌”、“抚琴按箫”……一式式绝美而致命的剑招自你心底自然流淌而出！'),
    ],
    onFinishEffects: [openScene('scene_znq35_14', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_14: {
    id: 'scene_znq35_14',
    title: '第十四幕 · 生死证道',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-1053', '（暴怒之下真气催至十二成，双杖青烟冒起，竟是以毕生功力拼命一搏）“装神弄鬼！接老夫拼死一击，看你们的繁花剑法挡不挡得住！”'),
      N('宗师绝巅的生死较量，此刻彻底爆发！'),
    ],
    onFinishEffects: [openScene('scene_znq35_15', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_15: {
    id: 'scene_znq35_15',
    title: '第十五幕 · 决战段延庆',
    subtitle: '繁花幽谷双剑合璧坪 · 素心试锋',
    mandatory: true,
    beats: [
      N('你深吸花香寒气，将初悟的《玉女素心剑法》催至极致，正面迎向倾尽全力的恶贯满盈段延庆！'),
    ],
    choices: [
      {
        id: 'znq35_fight_duan',
        label: '施展初悟之《玉女素心剑法》，正面重创【恶贯满盈 · 段延庆】！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'branch',
            condition: flag('zn_cross', 'eq', 'harmony'),
            thenEffects: [
              {
                type: 'startCombat',
                questId: ZHONGNAN_Q35_QUEST_ID,
                opponent: { kind: 'npc', npcId: 'NPC-1053' },
                allies: [{ kind: 'npc', npcId: 'NPC-0114' }],
                rule: 'duel',
                lethalOnLose: false,
                forbidEscapeReason: '此战关乎终南幽谷安危与玉女素心剑道证悟，绝不可退！',
                introText: '繁花幽谷双剑合璧坪上，你与林朝瑶双剑合璧迎战恶贯满盈段延庆！',
                onWin: [openScene('scene_znq35_16', ZHONGNAN_Q35_QUEST_ID)],
                onLose: [
                  toast('段延庆拼死反扑威力惊人，你与林朝瑶旋身卸力重整剑意，速再迎战！', 'warn', '双剑受挫'),
                ],
                onDraw: [
                  toast('素心剑意与一阳指劲难分轩轾，段延庆真气将竭，速再进击！', 'warn', '激战胶着'),
                ],
              },
            ],
            elseEffects: [
              {
                type: 'startCombat',
                questId: ZHONGNAN_Q35_QUEST_ID,
                opponent: { kind: 'npc', npcId: 'NPC-1053' },
                rule: 'duel',
                lethalOnLose: false,
                forbidEscapeReason: '此战关乎终南幽谷安危与玉女素心剑道证悟，绝不可退！',
                introText: '繁花幽谷双剑合璧坪上，你以分心二用独运玉女素心剑法决战段延庆！',
                onWin: [openScene('scene_znq35_16', ZHONGNAN_Q35_QUEST_ID)],
                onLose: [
                  toast('段延庆一阳指劲阴狠绝伦，你暂借落花剑步调息，再起分心双剑！', 'warn', '孤剑受挫'),
                ],
                onDraw: [
                  toast('双剑与铁杖激战正酣，段延庆攻势已现破绽，速乘胜进击！', 'warn', '激战胶着'),
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  scene_znq35_16: {
    id: 'scene_znq35_16',
    title: '第十六幕 · 素心顿悟',
    subtitle: '繁花幽谷双剑合璧坪 · 剑道觉醒',
    illustrationUrl: '/assets/quests/zn_q35_suxin_epiphany.jpg',
    illustrationCaption: '繁花幽谷 · 落梅漫天化剑雨，玉女素心剑法彻悟大成，两仪剑光照耀山谷',
    mandatory: true,
    beats: [
      N('就在段延庆双杖压迫至极致的刹那，你心中最后一丝滞碍豁然冰消！剑意不再分重阳与玉女，不再分刚猛与轻灵，一切化归“素心”二字！'),
      N('一剑挥出，宛如春风拂过终南万顷花海，看似柔美无力，实则蕴含无穷后劲，瞬间将段延庆凌厉的一阳指劲层层消解！'),
    ],
    onFinishEffects: [openScene('scene_znq35_17', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_17: {
    id: 'scene_znq35_17',
    title: '第十七幕 · 繁花破杖',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('“叮叮当当！”连绵七声清响几乎同时炸开！玉女素心剑尖如穿花蝴蝶般连点段延庆铁杖七处发力节点，竟将那对百炼精钢铁杖震得嗡嗡哀鸣、几乎脱手！'),
      S('NPC-1053', '（闷哼一声，嘴角溢出一缕黑血，连退七步方才以杖撑地稳住身形，满眼尽是不可置信）“这……这是什么剑法？！”'),
    ],
    onFinishEffects: [openScene('scene_znq35_18', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_18: {
    id: 'scene_znq35_18',
    title: '第十八幕 · 绝招收官',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      P('（剑锋遥指段延庆咽喉三寸，衣袂间梅瓣轻落）“终南《玉女素心剑法》！段延庆，念你残躯不易，今日饶你一命——立刻滚出终南山，此生不得再踏关中一步！”'),
    ],
    onFinishEffects: [openScene('scene_znq35_19', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_19: {
    id: 'scene_znq35_19',
    title: '第十九幕 · 剑雨逐魔',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('段延庆死死盯了你与林朝瑶半晌，自知内腑已受素心剑气重创，再斗下去必死无疑。他冷哼一声，双杖点石，身形狼狈不堪地跃出幽谷！'),
      S('NPC-1053', '（远远传来怨毒却中气不足的腹语）“好个《玉女素心剑法》……终南山的债，一品堂来日必以十倍奉还！”'),
    ],
    onFinishEffects: [openScene('scene_znq35_20', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_20: {
    id: 'scene_znq35_20',
    title: '第二十幕 · 谷静花安',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('恶首远遁，随行的西夏一品堂暗哨亦闻风丧胆，纷纷退避下山。漫山梅花重新在春风中摇曳生姿，寒玉涧水声叮咚如旧。'),
    ],
    onFinishEffects: [openScene('scene_znq35_21', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_21: {
    id: 'scene_znq35_21',
    title: '第二十一幕 · 繁花剑雨',
    subtitle: '双剑合璧坪 · 重创段延庆',
    illustrationUrl: '/assets/quests/zn_q35_suxin_clash.jpg',
    illustrationCaption: '繁花幽谷 · 素心剑雨连点七处要穴，重创恶贯满盈段延庆并将其逐出终南山',
    mandatory: true,
    beats: [
      S('NPC-0114', '（收剑入鞘，望着你眼中满是惊叹与骄傲）“二十年前我创下这套剑法时，以为此生再无缘亲见它绽放绝世锋芒。今日得见你在实战中彻悟《玉女素心剑法》，我已死而无憾。”'),
    ],
    onFinishEffects: [openScene('scene_znq35_22', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_22: {
    id: 'scene_znq35_22',
    title: '第二十二幕 · 静心印证',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('激战方歇，你方才在生死之间迸发的剑意尚在胸中回荡，正宜趁热打铁，与林朝瑶静心印证招式细节，将这门天阶剑法彻底化为己有。'),
    ],
    choices: [
      {
        id: 'znq35_to_mastery',
        label: '于繁花幽谷静心印证，彻底修成天阶《玉女素心剑法》',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q35_QUEST_ID, 'suxin_mastery_seal'),
          toast('段延庆已被逐出终南！请于【繁花幽谷双剑合璧坪】印证剑意结案！', 'success', '逐退恶首'),
        ],
      },
    ],
  },

  scene_znq35_23: {
    id: 'scene_znq35_23',
    title: '第二十三幕 · 补全剑谱',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('春风和煦，你与林朝瑶对坐花坪青石之上，以枯枝代剑，将方才激战中灵光一现的三十六式素心剑意逐一拆解推演。'),
      S('NPC-0114', '“原本我所创剑招仍有三处刚柔转折略显生涩，方才被你在生死瞬间以一记回风拂柳自然补全。青出于蓝而胜于蓝，此言诚不我欺。”'),
    ],
    onFinishEffects: [openScene('scene_znq35_24', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_24: {
    id: 'scene_znq35_24',
    title: '第二十四幕 · 两仪通神',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('{ifFlag:zn_cross==harmony|微风拂过山脊，远远望去，重阳古观高崖上似乎也有一道青袍身影正微笑颔首。道墓合流之气象，已在这一套天阶剑法中登峰造极！|虽无外脉相助，你却凭一己孤绝之心悟通分心双剑之妙，剑意清冷绝世，宛如孤梅傲雪，自成一家无上宗师风范！}'),
    ],
    onFinishEffects: [openScene('scene_znq35_25', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_25: {
    id: 'scene_znq35_25',
    title: '第二十五幕 · 恶尘远去',
    subtitle: '终南后山 · 逐敌出山',
    illustrationUrl: '/assets/quests/zn_q35_duan_retreat.jpg',
    illustrationCaption: '终南山道 · 段延庆折杖遁走，山梅落英纷飞，终南幽谷重归清宁',
    mandatory: true,
    beats: [
      N('段延庆败逃的消息很快传遍关中，西夏一品堂在终南外围的暗桩闻风撤离，终南山终于迎来了久违的宁静。'),
    ],
    onFinishEffects: [openScene('scene_znq35_26', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_26: {
    id: 'scene_znq35_26',
    title: '第二十六幕 · 山雨欲来',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0114', '（轻抚腰间玉佩，眉宇间浮现一丝淡淡的倦意与欣慰）“段延庆虽退，但一品堂贼心不死。而且我与王重楼皆已年迈，终南隐宗的百年基业，终究要交到你们这一代人手中了。”'),
      P('（肃然拱手）“无论前路是风云激荡，还是孤峰霜雪，弟子皆愿一肩承之。”'),
    ],
    onFinishEffects: [openScene('scene_znq35_27', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_27: {
    id: 'scene_znq35_27',
    title: '第二十七幕 · 落花剑舞',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('你起身再演一遍《玉女素心剑法》，剑光所过之处，漫天梅瓣随剑势起落盘旋，既无杀伐戾气，却又暗藏惊天动地之威。'),
    ],
    onFinishEffects: [openScene('scene_znq35_28', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_28: {
    id: 'scene_znq35_28',
    title: '第二十八幕 · 剑心澄明',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('一舞毕，满坪花瓣缓缓飘落于青石之上，竟恰好拼出一幅圆融无瑕的太极繁花图！林朝瑶见状，忍不住含笑鼓掌。'),
    ],
    onFinishEffects: [openScene('scene_znq35_29', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_29: {
    id: 'scene_znq35_29',
    title: '第二十九幕 · 玉女素心',
    subtitle: '繁花幽谷 · 剑道大成',
    illustrationUrl: '/assets/quests/zn_q35_suxin_mastery.jpg',
    illustrationCaption: '繁花幽谷双剑合璧坪 · 玉女素心剑道大成，漫天梅影随剑心流转，威震天下剑林',
    mandatory: true,
    beats: [
      N('天阶剑学彻底归心，终南隐宗的终局风云，亦已近在眼前！'),
    ],
    onFinishEffects: [openScene('scene_znq35_30', ZHONGNAN_Q35_QUEST_ID)],
  },

  scene_znq35_30: {
    id: 'scene_znq35_30',
    title: '第三十幕 · 繁花证道',
    subtitle: '繁花幽谷双剑合璧坪 · 结案',
    mandatory: true,
    beats: [
      N('你于繁花幽谷彻悟天阶无上剑学【玉女素心剑法】，一战重创恶贯满盈段延庆并将其逐出终南山，威名震动大宋武林！'),
    ],
    choices: [
      {
        id: 'znq35_complete',
        label: '拜谢林朝瑶，正式领悟天阶剑法【玉女素心剑法】（完成任务）',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-031', level: 1 },
          { type: 'giveCombatExp', amount: 1400, reason: '于繁花幽谷彻悟天阶玉女素心剑法并重创逐退段延庆' },
          { type: 'modifyRenown', delta: 220, reason: '以玉女素心剑法重创西夏一品堂首席客卿段延庆，名动天下剑林' },
          { type: 'modifyChivalry', delta: 80, reason: '力挫恶贯满盈，护持终南山门安宁' },
          { type: 'modifySkill', key: '诗词', delta: 2 },
          { type: 'modifySkill', key: '画', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 30 },
          { type: 'completeQuest', questId: ZHONGNAN_Q35_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《繁花似锦 · 玉女素心》！领悟天阶剑法【玉女素心剑法】，威望 +220，侠义 +80！',
            'success',
            '玉女素心',
          ),
        ],
      },
    ],
  },
}
