import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q12_QUEST_ID } from './zhongnanMuSparrowNetQuest'

const SPEAKER_POACHER_LEADER: StorySpeakerSpec = {
  kind: 'custom',
  name: '蓝阿三',
  title: '湘西五溪 · 偷蜂蛊客',
  factionName: '五溪蛊寨',
  portraitUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_av.jpg',
}

function buildPoacherTrioNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ12_POACHER_TRIO',
    name: '蓝阿三',
    title: '湘西五溪 · 偷蜂蛊客头目',
    realm: '二流中品',
    factionName: '五溪蛊寨',
    sectRank: 2,
    sectRankLabel: '采蛊恶客',
    avatarUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_fb.jpg',
    talk: '“终南古墓的玉蜂乃炼制百毒金蚕的绝佳药引！小娃娃，识相的别挡大爷财路！”',
    stats: { hp: 1380, mp: 1120, agi: 49, res: 32 },
    talents: { bone: 62, comprehension: 60, charm: 48 },
    equippedArts: { neigong: 'MA-227', move1: 'MA-143', move2: 'MA-186' },
    learnedArts: [{ artId: 'MA-227', level: 6 }, { artId: 'MA-143', level: 6 }, { artId: 'MA-186', level: 6 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq12_01: {
    id: 'scene_znq12_01',
    title: '第一幕 · 幽室雀鸣',
    subtitle: '终南山隐宗 · 天罗地网捕雀轻功厅',
    illustrationUrl: '/assets/quests/zn_q12_sparrow_hall.jpg',
    illustrationCaption: '幽谷百雀 · 天罗地网石室中八十一雀振翅齐飞',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，活死人墓内清冷幽寂。你推开石门步入天罗地网捕雀轻功厅，只见一盏琉璃长明灯悬于穹顶，白衣胜雪的冷清秋正立于数只竹笼之前。'),
      S('NPC-0173', '“{gender:师弟|师妹}来得正好。师父命我今日起督导你修习古墓轻功与暗器。古墓武学不以蛮力胜人，唯快、唯轻、唯准。”'),
      P('“冷师姐，这些竹笼里关着的可是山中麻雀？莫非今日便要练那『天罗地网势』？”'),
    ],
    onFinishEffects: [openScene('scene_znq12_02', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_02: {
    id: 'scene_znq12_02',
    title: '第二幕 · 八十一雀',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      S('NPC-0173', '（素手轻启笼门，霎时间啁啾声大作，八十一只麻雀振翅四散，在偌大石室穹顶盘旋乱飞）“不错！限你一炷香内，以双掌兜截、足不沾尘，将这八十一只麻雀全数逼回东南三尺之内，且不可伤及一羽！”'),
      N('话音刚落，数只麻雀已贴着你鬓角掠过。你提气纵身，却觉石室空旷、雀影纷乱，顾得东边便漏了西边。'),
    ],
    onFinishEffects: [openScene('scene_znq12_03', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_03: {
    id: 'scene_znq12_03',
    title: '第三幕 · 凌空折翼',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      S('NPC-0173', '（轻叱一声，白袖如云卷出）“脚步太重！眼随雀动便慢了一拍，须以心观势、以气听风！看好了，这便是本门《金雁功》的『横空折转』！”'),
      N('只见冷清秋足尖在光滑石壁上轻轻一点，整个人如一羽白鹤横掠半空，双袖微拂间，十余只惊雀竟如撞上无形柔墙，乖乖折返穹顶一隅。'),
    ],
    onFinishEffects: [openScene('scene_znq12_04', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_04: {
    id: 'scene_znq12_04',
    title: '第四幕 · 踏壁借力',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      N('你凝神效仿冷清秋的提气法门，敛去急躁，双足轻点石柱与壁沿，借反震之势凌空三折！霎时间，漫天雀影在你眼中仿佛慢了下来，每一只麻雀振翅的风声皆清晰可辨。'),
      P('“原来如此！不追其影，而截其势！”'),
    ],
    onFinishEffects: [openScene('scene_znq12_05', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_05: {
    id: 'scene_znq12_05',
    title: '第五幕 · 金雁初成',
    subtitle: '天罗地网捕雀轻功厅',
    illustrationUrl: '/assets/quests/zn_q12_golden_swallow.jpg',
    illustrationCaption: '金雁渡影 · 轻功身法如飞燕穿花，八十一雀尽入掌势',
    mandatory: true,
    beats: [
      N('一炷香将尽之际，你身化数道残影，掌风轻柔绵密如织网，八十一只麻雀竟果真被你全数拢入东南石壁三尺之内，羽毛无一脱落！'),
      S('NPC-0173', '（眼中闪过一抹难得的赞许，微微颔首）“竟在三日之内便摸到了《金雁功》的门槛。轻功既成，再授你本门基础暗器手法《追魂夺命镖》。”'),
    ],
    onFinishEffects: [openScene('scene_znq12_06', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_06: {
    id: 'scene_znq12_06',
    title: '第六幕 · 金针渡影',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      N('冷清秋取出一把细如牛毛的精钢银针与柳叶短镖，腕间微抖，三枚银针竟呈品字形破空而出，稳稳钉熄三丈外三盏灯芯，灯焰却未晃动半分！'),
      S('NPC-0173', '“暗器之妙，在于『蓄势于袖、发劲于指、落点于心』。你且随我练熟甩腕抖劲之法，日后方能承接师父的冰魄银针与含沙射影。”'),
    ],
    onFinishEffects: [openScene('scene_znq12_07', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_07: {
    id: 'scene_znq12_07',
    title: '第七幕 · 玉蜂告警',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      N('正当你反复演练甩镖手法之际，墓道外忽然飞入数只通体雪白、翅带金纹的古墓玉蜂！它们焦躁地在冷清秋发间盘旋嗡鸣，竟是古墓外林遭人侵扰之兆！'),
      S('NPC-0173', '（脸色微变，袖中银针滑落指尖）“不好！玉蜂鸣声急促，是有人在后山寒玉涧放烟熏巢、偷猎玉蜂！你随我即刻出墓！”'),
    ],
    onFinishEffects: [openScene('scene_znq12_08', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_08: {
    id: 'scene_znq12_08',
    title: '第八幕 · 领命出墓',
    subtitle: '活死人墓石门',
    mandatory: true,
    beats: [
      N('你收好冷清秋赐下的银针暗器囊，运起新悟的《金雁功》随她掠出幽谷石门，直奔后山银练飞瀑而去！'),
    ],
    choices: [
      {
        id: 'znq12_depart_falls',
        label: '习得《金雁功》与《追魂夺命镖》，速赴【终南后山寒玉涧 · 银练飞瀑】护蜂',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q12_QUEST_ID, stepId: 'falls_poachers' },
          { type: 'teachMartialArt', artId: 'MA-119', level: 1, autoEquip: true },
          { type: 'teachMartialArt', artId: 'MA-118', level: 1 },
          setStep(ZHONGNAN_Q12_QUEST_ID, 'falls_poachers'),
          toast('习得《金雁功》与《追魂夺命镖》！请速赴【终南后山寒玉涧 · 银练飞瀑】！', 'success', '幽谷百雀'),
        ],
      },
    ],
  },

  scene_znq12_09: {
    id: 'scene_znq12_09',
    title: '第九幕 · 飞瀑毒烟',
    subtitle: '终南后山寒玉涧 · 银练飞瀑清泉石茗案',
    illustrationUrl: '/assets/quests/zn_q12_falls_poachers.jpg',
    illustrationCaption: '飞瀑护蜂 · 银练飞瀑下截击湘西五溪偷蜂恶客',
    mandatory: true,
    beats: [
      N('银练飞瀑水雾氤氲，此刻却被一股刺鼻的淡紫色迷烟搅得乌烟瘴气！三名身着青蓝苗装、腰悬竹筒的壮汉正挥舞纱网，将晕头转向的玉蜂往漆黑陶罐里扫去！'),
      S(SPEAKER_POACHER_LEADER, '（得意怪笑）“嘿嘿，传闻终南活死人墓的玉蜂毒浆千金难求，今日果真叫咱们兄弟撞着大运了！快装罐，装满就回湘西！”'),
    ],
    onFinishEffects: [openScene('scene_znq12_10', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_10: {
    id: 'scene_znq12_10',
    title: '第十幕 · 凌波截道',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('冷清秋与你自瀑畔古松之上飘然掠落，足尖点过清泉石案竟未激起半点水花！'),
      P('“大胆贼子！竟敢闯入终南禁地放烟偷猎玉蜂，速速放下陶罐束手就擒！”'),
      S(SPEAKER_POACHER_LEADER, '“哟呵，哪里冒出来的两个白衣小娃？弟兄们，放迷烟，拿了他们顺带问出古墓入口！”'),
    ],
    onFinishEffects: [openScene('scene_znq12_11', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_11: {
    id: 'scene_znq12_11',
    title: '第十一幕 · 银针试手',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      S('NPC-0173', '（立于青石之上，神色冷若冰霜）“这三人不过二流脚色，我为你压阵封住退路，你正好以刚学的《金雁功》与《追魂夺命镖》将他们全数点倒！”'),
      P('“是！师姐且看弟子手段！”'),
    ],
    choices: [
      {
        id: 'znq12_fight_poachers',
        label: '施展金雁轻功与追魂暗器，点倒三名苗疆偷蜂恶客',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q12_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPoacherTrioNpc() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '玉蜂陶罐仍在贼人手中，不可放他们逃脱！',
            introText: '飞瀑轰鸣，你身形如燕掠过迷烟，迎战湘西五溪偷蜂恶客蓝阿三一伙！',
            onWin: [openScene('scene_znq12_12', ZHONGNAN_Q12_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('苗疆迷烟颇为刁钻，冷清秋袖风卷散毒雾助你暂退，待调息后再战！', 'warn', '幽谷百雀'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq12_12: {
    id: 'scene_znq12_12',
    title: '第十二幕 · 三针定穴',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('你身形借瀑石一折，避开蓝阿三喷出的毒粉，腕底寒光三闪！三枚银针不偏不倚钉入三人肩井与曲池大穴，三名恶客顿时浑身酸麻，扑通跪倒在地！'),
      S(SPEAKER_POACHER_LEADER, '“哎哟……大侠饶命！小人再也不敢来终南山偷蜂了！”'),
    ],
    onFinishEffects: [openScene('scene_znq12_13', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_13: {
    id: 'scene_znq12_13',
    title: '第十三幕 · 审出蛛丝',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      S('NPC-0173', '（寒眸微凝，足尖踢翻熏烟铁炉）“说！你们湘西五溪寨的人向来盘踞南疆，谁指使你们不远千里来终南山打玉蜂的主意？”'),
      S(SPEAKER_POACHER_LEADER, '（颤声道）“是……是长安西市有个挂着西夏红牌的客商出重金悬赏，说只要活捉终南玉蜂，便赏百两黄金……小的们一时财迷心窍啊！”'),
    ],
    onFinishEffects: [openScene('scene_znq12_14', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_14: {
    id: 'scene_znq12_14',
    title: '第十四幕 · 放蜂逐客',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('你连忙掀开陶罐盖子，吹响玉蜂哨，受惊的玉蜂嗡嗡振翅，很快安稳飞回后山花谷。冷清秋废去三人随身毒囊，冷冷喝令他们滚出秦岭，随即神色凝重地望向长安方向。'),
      S('NPC-0173', '“西夏红牌客商……看来一品堂的手已经伸到长安西市了。速随我回墓禀报师父！”'),
    ],
    choices: [
      {
        id: 'znq12_return_tomb',
        label: '护送玉蜂返回【活死人墓 · 天罗地网捕雀轻功厅】复命',
        tone: 'jade',
        effects: [
          setStep(ZHONGNAN_Q12_QUEST_ID, 'report_sparrow_hall'),
          toast('请返回【活死人墓幽谷石室 · 天罗地网捕雀轻功厅】向冷清秋复命！', 'talk', '幽谷百雀'),
        ],
      },
    ],
  },

  scene_znq12_15: {
    id: 'scene_znq12_15',
    title: '第十五幕 · 禀报寒玉',
    subtitle: '活死人墓幽谷石室 · 天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      N('回到幽谷石室，寒玉仙子林朝瑶已在厅中静候。听罢冷清秋详述飞瀑擒贼经过，林朝瑶轻叹一声，冰眸中掠过一丝冷芒。'),
      S('NPC-0114', '“你初习《金雁功》与《追魂夺命镖》便能活捉三名五溪恶客且未伤一蜂，慧心与定力皆堪造就。”'),
    ],
    onFinishEffects: [openScene('scene_znq12_16', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_16: {
    id: 'scene_znq12_16',
    title: '第十六幕 · 西市暗线',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      S('NPC-0114', '“至于那西夏红牌客商……你白清霜师姐近日正潜伏长安西市暗查此事。你先好生巩固轻功与暗器手法，不日我便遣你下山接应清霜。”'),
      P('“弟子谨遵师命，定勤加修习，随时听候调遣！”'),
    ],
    onFinishEffects: [openScene('scene_znq12_17', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_17: {
    id: 'scene_znq12_17',
    title: '第十七幕 · 素女赠针',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      S('NPC-0173', '（递来一小袋银两与暗器心得）“古墓弟子行走江湖，轻功可保身，暗器可制敌。你今日表现不俗，这些拿去添置行装吧。”'),
    ],
    onFinishEffects: [openScene('scene_znq12_18', ZHONGNAN_Q12_QUEST_ID)],
  },

  scene_znq12_18: {
    id: 'scene_znq12_18',
    title: '第十八幕 · 影动终南',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      N('琉璃灯火静静摇曳，石室中八十一只麻雀已安然放归幽林。你摩挲着袖中寒光隐隐的银针，深知古墓一脉的江湖风云才刚刚拉开序幕。'),
    ],
    choices: [
      {
        id: 'znq12_complete',
        label: '拜谢师父与冷师姐，潜心打磨轻功与暗器',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'giveSilver', amount: 80, reason: '古墓护蜂有功赐银' },
          { type: 'giveCombatExp', amount: 1100, reason: '天罗地网捕雀与飞瀑点敌历练' },
          { type: 'addSectContribution', amount: 180 },
          { type: 'modifyRenown', delta: 25, reason: '飞瀑护蜂击退五溪偷蜂恶客' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 10 },
          { type: 'completeQuest', questId: ZHONGNAN_Q12_QUEST_ID, outcome: 'protected_bees' },
          toast('《幽谷百雀 · 金针渡影》圆满完成！', 'success', '幽谷百雀'),
        ],
      },
    ],
  },
}
