import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q21_QUEST_ID } from './shaolinYiweiLightnessQuest'

const SPEAKER_CLOUD_SWALLOW: StorySpeakerSpec = {
  kind: 'custom',
  name: '云中燕',
  title: '西夏一品堂 · 轻功谍探',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
}

const SPEAKER_SCOUT_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '山门巡夜僧',
  title: '嵩山少林寺 · 戒律巡哨',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

function buildCloudSwallowBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ21_CLOUD_SWALLOW',
    name: '云中燕',
    title: '西夏一品堂 · 轻功谍探',
    realm: '一流下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 2,
    sectRankLabel: '一品堂密探',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
    talk: '“少林小秃驴竟能踏苇追我十里至此！这洛水急流湍急无比，今日便让你葬身鱼腹！”',
    stats: { hp: 2680, mp: 1880, agi: 78, res: 52 },
    talents: { bone: 80, comprehension: 82, charm: 68 },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-158',
      move1: 'MA-133',
      move2: 'MA-076',
    },
    learnedArts: [
      { artId: 'MA-245', level: 7 },
      { artId: 'MA-158', level: 8 },
      { artId: 'MA-133', level: 7 },
      { artId: 'MA-076', level: 7 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq21_01: {
    id: 'scene_slq21_01',
    title: '第一幕 · 飞瀑听涛',
    subtitle: '达摩院 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山后谷霜叶如丹。你新晋少林【真传弟子】，循寺中祖制来到达摩院西侧的【飞瀑深潭 · 试炼涧】，求见以身法轻灵著称的「芦苇尊者」玄渡。'),
      N('山涧之中，十丈白练自悬崖倾泻而下，砸在碧绿深潭之上，水雾弥漫如烟。青石岸边，一位清癯干瘦、披着素灰旧僧袍的老僧正负手望水，衣袂在狂暴瀑风中纹丝不动。'),
      P('（合十躬身，朗声行礼）“真传弟子拜见玄渡师伯！弟子新入真传，蒙方丈与诸位首座垂训，特来试炼涧向师伯请益《一苇渡江》无上轻功！”'),
    ],
    onFinishEffects: [openScene('scene_slq21_02', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_02: {
    id: 'scene_slq21_02',
    title: '第二幕 · 芦苇问禅',
    subtitle: '飞瀑深潭 · 玄渡考校',
    mandatory: true,
    beats: [
      S('NPC-0135', '（缓缓转身，双目澄澈如涧底寒泉）“阿弥陀佛！师侄能过五载苦修、跻身真传，足见根基沉稳。只是老衲先问你一句：世人皆道达摩初祖折苇渡江乃是神通幻术，你以为然否？”'),
      P('（思索片刻，答道）“弟子读《金刚经》，云『应无所住而生其心』。初祖渡江，非芦苇真能载百斤之躯，而是借水面浮力、一息提纵，心无挂碍则身无滞重！”'),
      S('NPC-0135', '（颔首微笑，眼中赞许之色一闪）“善哉！经义七十，果然不是死背经卷的书呆子。常人练轻功，只知拼命提气拔高，气尽则坠；唯独我少林《一苇渡江》，讲究『借水而不陷水，踏虚而不滞虚』！”'),
    ],
    onFinishEffects: [openScene('scene_slq21_03', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_03: {
    id: 'scene_slq21_03',
    title: '第三幕 · 枯芦掷潭',
    subtitle: '飞瀑深潭 · 初祖遗韵',
    mandatory: true,
    beats: [
      N('玄渡随手自潭畔折下一根不过拇指粗细的干枯芦苇，手腕轻抖，那根枯芦竟如利箭般平平射出三丈，稳稳浮在飞瀑冲击最烈、波涛翻涌的潭心！'),
      S('NPC-0135', '“看好了！真气自涌泉吐纳，三分向下借势，七分向前牵引，足尖触苇而不破水皮——”'),
    ],
    onFinishEffects: [openScene('scene_slq21_04', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_04: {
    id: 'scene_slq21_04',
    title: '第四幕 · 一苇凌波',
    subtitle: '飞瀑深潭 · 玄渡示艺',
    illustrationUrl: '/assets/quests/sl_21_waterfall_reed.jpg',
    illustrationCaption: '飞瀑深潭 · 芦苇尊者玄渡足尖轻点一枝枯芦，于十丈飞瀑水雾中凌波横渡深潭',
    mandatory: true,
    beats: [
      N('话音未落，玄渡身形已如一缕青烟掠出岸边！只见他足尖在漂浮的枯芦上轻轻一点，那枯芦竟只微微下沉半寸便弹回水面，而玄渡已借着这丝微不可察的反震之力，迎着飞瀑水幕横掠十丈，稳稳落于对岸青岩之上！'),
      N('水花四溅之中，他的灰色僧袍下摆竟未沾湿半滴潭水！这般出神入化的轻功造诣，令你心神剧震，只觉眼前豁然开朗！'),
    ],
    onFinishEffects: [openScene('scene_slq21_05', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_05: {
    id: 'scene_slq21_05',
    title: '第五幕 · 涌泉吐纳',
    subtitle: '飞瀑深潭 · 口诀秘授',
    mandatory: true,
    beats: [
      N('玄渡复又折身踏水而回，在青石上盘膝而坐，将《一苇渡江》的三十六字真气运行心法、足底涌泉穴瞬息吞吐的窍门，逐字逐句倾囊相授。'),
      S('NPC-0135', '“切记！提纵之时，丹田真气切莫一口吐尽，须留三分余力在足踝之间。待旧力将尽、新力未生之际，借浮木、枯苇、乃至水面浪花轻轻一借，便能绵延十里而不竭！”'),
      P('（闭目默诵口诀，旋即起身跃上潭边青石反复试演）“弟子明白了！三分借势、七分牵引，气随念动、足不留痕！”'),
    ],
    onFinishEffects: [openScene('scene_slq21_06', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_06: {
    id: 'scene_slq21_06',
    title: '第六幕 · 三日苦试',
    subtitle: '飞瀑深潭 · 涉水初成',
    mandatory: true,
    beats: [
      N('一连三日，你在飞瀑深潭畔废寝忘食地苦练。头一日落水十余次，浑身湿透仍不气馁；第二日已能踏着浮木连渡五丈；待到第三日暮色降临时，你足尖点过三枝枯芦，终于一口气横掠深潭、衣角不湿！'),
      S('NPC-0135', '（抚掌大笑）“好悟性！三日便摸到了《一苇渡江》的门径，老衲当年可足足泡了半个月冷水！不过轻功一道，终须在生死疾追中见真章……”'),
    ],
    onFinishEffects: [openScene('scene_slq21_07', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_07: {
    id: 'scene_slq21_07',
    title: '第七幕 · 山门急报',
    subtitle: '飞瀑深潭 · 窃卷警讯',
    mandatory: true,
    beats: [
      N('玄渡话音方落，忽见一名山门巡夜僧神色焦急地狂奔入涧，手中还攥着半截沾血的青色羽镖！'),
      S(SPEAKER_SCOUT_MONK, '“报——玄渡师叔不好了！方才有一名身法诡绝如鬼魅的蒙面女贼潜入客堂东厢，打伤两名执勤师兄，窃走了洛阳府送来暂存本寺的《豫西关隘防务手札》！她正借夜色往西北洛水方向遁逃，诸位师兄追之不及！”'),
      S('NPC-0135', '（接过羽镖凝眸一瞥，脸色骤沉）“燕尾青铜镖，西夏一品堂的轻功名探——【云中燕】！此女一手《燕子三抄水》独步西北，寻常人根本追不上她的脚程！”'),
    ],
    onFinishEffects: [openScene('scene_slq21_08', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_08: {
    id: 'scene_slq21_08',
    title: '第八幕 · 授命急追',
    subtitle: '飞瀑深潭 · 试炼涧启程',
    mandatory: true,
    beats: [
      S('NPC-0135', '（目光炯炯望向你）“师侄！老衲年迈腿疾旧伤未愈，若任那云中燕渡过洛水急流，防务手札便会落入西夏之手，关洛百姓危矣！你方才初成《一苇渡江》，正是以实战印证轻功绝艺之时，可敢立刻下山追击？”'),
      P('（抱拳肃然）“防务手札关乎大宋疆土安危，弟子义不容辞！请师伯放心，弟子定以《一苇渡江》将那云中燕生擒归寺！”'),
    ],
    choices: [
      {
        id: 'slq21_accept_chase',
        label: '领命接下【飞瀑深潭 · 一苇渡江】，即刻下山追击云中燕',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q21_QUEST_ID, stepId: 'luoshui_chase' },
          setStep(SHAOLIN_Q21_QUEST_ID, 'luoshui_chase'),
          openScene('scene_slq21_09', SHAOLIN_Q21_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq21_09: {
    id: 'scene_slq21_09',
    title: '第九幕 · 少室疾奔',
    subtitle: '少室山道 · 夜追燕影',
    mandatory: true,
    beats: [
      N('你辞别玄渡，足下涌泉真气一吐，身形顿时化作一道青灰残影掠出少室山门！山道松影倒飞如箭，不多时便在十里外的官道岔口瞥见前方半里处一道墨蓝倩影正凌空疾掠！'),
      N('那黑衣女贼背负牛皮密筒，双脚几乎不沾尘土，正是西夏一品堂轻功谍探【云中燕】！她回头瞥见你竟在后方步步紧逼，不由发出一声惊诧冷哼！'),
    ],
    onFinishEffects: [openScene('scene_slq21_10', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_10: {
    id: 'scene_slq21_10',
    title: '第十幕 · 洛水夜渡',
    subtitle: '洛水岸畔 · 急流险滩',
    mandatory: true,
    beats: [
      N('转眼间前方水声轰鸣，滔滔洛水在月色下横亘眼前！秋汛未退，江面宽阔、激流翻滚，岸边渡船早已被云中燕提前凿沉！'),
      S(SPEAKER_CLOUD_SWALLOW, '（立于岸边芦苇荡中冷笑回头）“少林真传果然有点脚力！可惜本姑娘已将渡船尽数沉江，这百丈洛水急流，我看你这小和尚如何过得去！”'),
      N('说罢，云中燕足尖连点水面浮冰与漂木，施展《燕子三抄水》贴着浊浪飞掠江心，眨眼便窜出十余丈远！'),
    ],
    onFinishEffects: [openScene('scene_slq21_11', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_11: {
    id: 'scene_slq21_11',
    title: '第十一幕 · 踏苇十里',
    subtitle: '洛水急流 · 一苇渡江',
    illustrationUrl: '/assets/quests/sl_21_luoshui_chase.jpg',
    illustrationCaption: '洛水急流 · 月色寒江波涛汹涌，你折芦掷水施展《一苇渡江》，踏苇十里直追云中燕',
    mandatory: true,
    beats: [
      P('（冷笑一声，顺手折下一束岸边干芦掷入江心）“区区断渡岂能阻我少林真传？看我《一苇渡江》！”'),
      N('你依照玄渡所授心法，丹田真气沉降涌泉，足尖在漂浮的芦秆上轻轻一触即离！借着水流与芦苇的微弱浮力，你竟如一羽孤鸿般御风掠过滔滔洛水，沿江疾追十里，非但未被甩开，反而距云中燕越来越近！'),
      S(SPEAKER_CLOUD_SWALLOW, '（骇然失色，连连回望）“什么？！这难道就是失传已久的少林《一苇渡江》？世上真有人能踏苇渡江十里不竭！”'),
    ],
    onFinishEffects: [openScene('scene_slq21_12', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_12: {
    id: 'scene_slq21_12',
    title: '第十二幕 · 暗镖阻路',
    subtitle: '洛水江心 · 含沙射影',
    mandatory: true,
    beats: [
      N('眼见距离缩至三丈以内，云中燕心知单凭轻功已甩不掉你，骤然反手扬出七枚涂满西夏麻药的青铜燕尾镖，封死你身前所有落脚的漂木与芦苇！'),
      N('你身在半空无处借力，却灵机一动，左脚尖点在右脚背上凭空拔高三尺，如游龙翻身避开七道寒芒，随后借一根随波漂来的枯枝轻轻一点，如大鹏展翅般越过云中燕头顶，抢先落于江心一块巨型礁石之上，彻底截断她的去路！'),
    ],
    onFinishEffects: [openScene('scene_slq21_13', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_13: {
    id: 'scene_slq21_13',
    title: '第十三幕 · 险礁对峙',
    subtitle: '洛水江心礁石 · 无路可退',
    mandatory: true,
    beats: [
      N('云中燕被迫收势落于礁石另一端，四周皆是怒涛漩涡，退无可退。她缓缓拔出腰间一对月牙西夏短弯刀，眼中凶光毕露。'),
      S(SPEAKER_CLOUD_SWALLOW, '“好俊的轻功！既然你执意找死，本姑娘便在这江心礁石上，用西夏弯刀与含沙射影送你去见佛祖！”'),
      P('（稳立礁石，沉声喝道）“放下豫西防务手札束手就擒，贫僧尚可留你性命交由官府发落；若敢顽抗，休怪少林禅武无情！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q21_river_reached', value: true },
      openScene('scene_slq21_14', SHAOLIN_Q21_QUEST_ID),
    ],
  },

  scene_slq21_14: {
    id: 'scene_slq21_14',
    title: '第十四幕 · 急流截杀',
    subtitle: '洛水江心礁石 · 决战云中燕',
    mandatory: true,
    beats: [
      N('月光洒在滚滚江浪之上，云中燕足踏诡步、双弯刀化作两道森白冷电直扑面门！这正是检验你一流下品实力与《一苇渡江》身法的生死一战！'),
    ],
    choices: [
      {
        id: 'slq21_fight_swallow',
        label: '稳占江心礁石，力战西夏一品堂轻功谍探【云中燕】（一流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q21_QUEST_ID,
            opponent: { kind: 'custom', npc: buildCloudSwallowBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            introText: '洛水江心礁石四周怒涛汹涌！西夏一品堂一流下品轻功谍探云中燕双弯刀与暗器齐发，务必将其生擒夺回防务手札！',
            onWin: [openScene('scene_slq21_15', SHAOLIN_Q21_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '险些被云中燕的西夏弯刀与暗镖逼落江心！调息后可再赴【飞瀑深潭 · 试炼涧】续追云中燕。',
                'warn',
                '洛水追谍',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq21_15: {
    id: 'scene_slq21_15',
    title: '第十五幕 · 断刀失势',
    subtitle: '洛水江心礁石 · 步法压制',
    mandatory: true,
    beats: [
      N('礁石方寸之地，云中燕本想凭鬼魅步法绕背偷袭，却骇然发现你的身法比她更快半分！无论她从哪一侧闪身出刀，你皆以《一苇渡江》的微步借势抢占先机，反将她的弯刀路数尽数封死！'),
      N('三十余合激斗后，你瞅准她收刀换气的一瞬，欺身一掌震飞其左手弯刀，旋即反手扣住她右腕脉门！'),
    ],
    onFinishEffects: [openScene('scene_slq21_16', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_16: {
    id: 'scene_slq21_16',
    title: '第十六幕 · 生擒燕影',
    subtitle: '洛水急流 · 夺回密卷',
    illustrationUrl: '/assets/quests/sl_21_cloud_swallow.jpg',
    illustrationCaption: '洛水生擒 · 浪花飞溅间，你以少林擒拿手法扣住云中燕脉门，完好夺回《豫西关隘防务手札》',
    mandatory: true,
    beats: [
      N('云中燕惨呼一声，右手弯刀“当啷”跌入洛水急流！你顺势点住她肩井、曲池两处大穴，将她背负的牛皮密筒一把夺下——封蜡完好无损，《豫西关隘防务手札》分毫未泄！'),
      S(SPEAKER_CLOUD_SWALLOW, '（面色惨白，颓然垂首）“输在少林《一苇渡江》手下……我云中燕无话可说！只是你们中原武林别得意太早，一品堂高手如云，这不过是开始罢了……”'),
    ],
    onFinishEffects: [openScene('scene_slq21_17', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_17: {
    id: 'scene_slq21_17',
    title: '第十七幕 · 携囚返山',
    subtitle: '洛水岸畔 · 启程复命',
    mandatory: true,
    beats: [
      N('你以麻绳缚住云中燕，提着她纵身踏苇返回洛水南岸，交由随后赶来的少林巡山武僧看押，自己则怀揣密卷疾驰返回少室山达摩院。'),
    ],
    choices: [
      {
        id: 'slq21_return_xuandu',
        label: '押解云中燕与密卷返回【飞瀑深潭 · 试炼涧】，向玄渡师伯复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q21_QUEST_ID, 'report_xuandu'),
          toast(
            '已生擒云中燕并夺回防务手札！请返回【达摩院 · 飞瀑深潭 · 试炼涧（sl_damo_west）】向玄渡复命。',
            'talk',
            '一苇渡江',
          ),
        ],
      },
    ],
  },

  scene_slq21_18: {
    id: 'scene_slq21_18',
    title: '第十八幕 · 涧畔复命',
    subtitle: '达摩院 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('晨光微熹，你回到飞瀑深潭。芦苇尊者玄渡仍在青石岸边静候，见你怀抱完好密卷归来，身后武僧押着垂头丧气的西夏女谍云中燕，不禁抚掌大慰！'),
      P('（双手呈上牛皮密筒，躬身复命）“幸不辱命！弟子借师伯所授《一苇渡江》，踏苇十里追及洛水江心，已将云中燕生擒，防务手札分毫未失！”'),
      S('NPC-0135', '（接过密筒查验封蜡，朗声大笑）“阿弥陀佛！踏苇十里追擒一品堂轻功名探，非但保住了豫西军情，更让《一苇渡江》在你手中真正活了过来！”'),
    ],
    onFinishEffects: [openScene('scene_slq21_19', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_19: {
    id: 'scene_slq21_19',
    title: '第十九幕 · 渡江真传',
    subtitle: '飞瀑深潭 · 秘籍印心',
    mandatory: true,
    beats: [
      N('玄渡从袖中取出一卷泛黄的达摩院轻功秘抄，连同自己数十年研习的注疏一并交到你手中。'),
      S('NPC-0135', '“这卷《一苇渡江》完整图谱今日正式传你！日后无论行走关洛江湖还是踏雪赴边，遇险可凭此身法从容脱身，追敌亦能料敌先机。切记：身轻莫忘心定，步快莫忘禅静！”'),
      P('（双手恭敬接过图谱，深深稽首）“弟子谨记师伯教诲，必不负《一苇渡江》千年威名！”'),
    ],
    onFinishEffects: [openScene('scene_slq21_20', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_20: {
    id: 'scene_slq21_20',
    title: '第二十幕 · 飞瀑长虹',
    subtitle: '嵩山少林寺 · 飞瀑深潭',
    mandatory: true,
    beats: [
      N('朝阳跃出嵩岳东峰，十丈飞瀑在金光中化作一道七彩长虹。你身怀《一苇渡江》绝世轻功，真传单脉的更深试炼，已然在你脚下徐徐铺开。'),
    ],
    choices: [
      {
        id: 'slq21_complete',
        label: '习得少林绝学《一苇渡江》，圆满完成【飞瀑深潭 · 一苇渡江】',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-057', level: 1 },
          {
            type: 'giveCombatExp',
            amount: 580,
            reason: '于飞瀑深潭习得《一苇渡江》，踏苇十里生擒西夏轻功谍探云中燕',
          },
          { type: 'addSectContribution', amount: 200 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0135' }, delta: 18 },
          { type: 'completeQuest', questId: SHAOLIN_Q21_QUEST_ID, outcome: 'completed' },
          toast(
            '【飞瀑深潭 · 一苇渡江】圆满完成！习得《一苇渡江》，实战经验 +580、门派贡献 +200、经义 +1、玄渡好感 +18！',
            'success',
            '一苇渡江',
          ),
        ],
      },
    ],
  },
}
