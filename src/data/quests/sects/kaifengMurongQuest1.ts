import type { QuestDefinition, StorySceneDef } from '../../../types/quest'

const QUEST_ID = 'QST-SECT-17-MURONG-1'

// ============================================================================
// 三十二幕完整剧本：《燕子坞暗影 · 姑苏密查》（开封府 Lv.2 -> Lv.3 晋升任务）
// 声明顺序自终幕倒序排列，确保所有 openScene 引用皆已初始化
// ============================================================================

const SCENE_32_KAIFENG_VERDICT: StorySceneDef = {
  id: 'scene_kf1_32_kaifeng_verdict',
  title: '第三十二幕 · 龙图嘉勉授金符',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  illustrationUrl: '/assets/quests/kf_murong1_gold_badge_verdict.jpg',
  illustrationCaption: '开封府三口铜铡正堂 · 呈交太湖水渍密账获擢六扇门金牌总捕',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '包拯将那份染着太湖水渍的密账抄件一页一页仔仔细细阅罢，黑面沉如铁石，良久方才缓缓合上卷宗。正堂内三口铜铡在烛火映照下泛着冷冽寒光，堂外秋风穿廊而过，吹得案上烛焰微微一晃，映得堂上气氛越发肃杀。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '“好一个姑苏慕容氏，好一个‘还施水阁’！表面上是江南诗书传家的风雅世家，暗地里竟私蓄兵甲三千余副、与西夏及大辽边将书信往还，更妄图兴复前燕旧祚……然则此事牵连甚广，不仅关乎江南半壁安稳，更涉及太湖数万军民与转运司诸吏，绝不可在证据未凿实前贸然兴兵，免得打草惊蛇、反令其狗急跳墙！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '“大人所虑极是。此番多亏少侠孤身南下，先在太湖渡口连挫包不同、又于曼陀花径力压风波恶，更在‘神掌震江南’邓百川手下硬撑十合全身而退，带回这份参合庄甲械转运实录。若非少侠智勇兼备、机警过人，我开封府险些被江南地方官府蒙在鼓里！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '“少侠于捕头都头任上历练已满两载，今番冒死入虎穴、带回机密铁证，功勋卓著。本府已奏明圣上并记档六扇门：少侠即日可于六扇门面板正式晋升【金牌总捕】！望少侠好生调养内息、精进武艺，待朝廷密旨与江南兵备部署妥当，日后姑苏之事，仍需少侠再走一遭、直面那位慕容公子！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（抱拳肃立，朗声应诺）“卑职领命！必当勤修武艺、静候调遣，绝不负包大人、公孙先生与展大哥重托！”',
    },
  ],
  onFinishEffects: [
    { type: 'giveSilver', amount: 120, reason: '开封府密查姑苏特等赏银' },
    { type: 'modifyRenown', delta: 40, reason: '孤身探燕子坞带回密账' },
    { type: 'modifyChivalry', delta: 20, reason: '护持大宋江南安稳' },
    {
      type: 'completeQuest',
      questId: QUEST_ID,
      outcome: 'completed_murong_probe',
      combatExp: 300,
    },
    {
      type: 'toast',
      text: '《燕子坞暗影 · 姑苏密查》圆满完成！已解锁晋升【Lv.3 金牌总捕】资格，获赏银 +120 两、声望 +40、战斗经验 +300！',
      tone: 'success',
      logTag: '晋升解锁',
    },
  ],
}

const SCENE_31_RETURN_TO_KAIFENG: StorySceneDef = {
  id: 'scene_kf1_31_return_kaifeng',
  title: '第三十一幕 · 密呈卷宗返东京',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '自姑苏城外换乘驿马昼夜兼程北上，过淮河、穿陈留，沿途换马不换人，五日后终于重见东京开封府那座高耸巍峨的州桥与宣德门飞檐。少侠顾不得洗去满身尘霜与衣袍干涸的泥点，径直入开封府衙后院，穿过六扇门演武坪，叩响了包拯书房的木门。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '公孙策早迎在廊下，见少侠左肩衣衫虽有掌风撕裂的焦痕、脸色却沉稳如常，不由长舒一口气：“谢天谢地！少侠终于平安回来了！前日江南八百里加急飞鸽曾传回姑苏太湖水师夜搜的只言片语，包大人与展护卫这几日日夜悬心，就等少侠带回江南消息！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（解下贴身油布包裹，双手郑重呈上）“公孙先生，这是卑职自燕子坞参合庄秘档室拓录的兵甲转运名录，以及沿途查实的私盐铁器账目与大燕篆印拓片。事关重大，请包大人与展大哥过目！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '公孙策接过油布卷宗，指尖触及纸角上尚未完全褪去的太湖水汽与淡淡烟火焦味，神色顿时一肃，连忙引少侠入内堂拜见包拯与展昭。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_32_KAIFENG_VERDICT }],
}

const SCENE_30_NORTHBOUND_RECOVERY: StorySceneDef = {
  id: 'scene_kf1_30_northbound_recovery',
  title: '第三十幕 · 芦荡养伤避追骑',
  subtitle: '姑苏城外 · 太湖芦苇水寨',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '渔船顺着太湖支流一路向北，钻入茫茫无际的秋日芦苇荡中。远处水面上隐约传来参合庄快船的号角声与火把倒影，但太湖水网纵横如织，芦花深处水浅岔多，邓百川虽有“神掌震江南”之威，一时半刻也绝难在黑夜芦荡中搜出一条有意隐匿的小乌篷船。',
    },
    {
      speaker: { kind: 'custom', name: '陆老艄公', title: '开封府江南暗桩船夫', factionName: '六扇门暗桩', portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg' },
      text: '“好险！刚才岸上那一掌隔水震起三丈水柱，连老汉这船底板都跟着发颤！少侠快喝口热姜汤压压寒气，再把这瓶六扇门专用的金疮药敷在肩头——怀里的油布包裹可还稳妥？”',
    },
    {
      speaker: { kind: 'player' },
      text: '（轻轻抚摸胸前贴身藏好的油布密录，吐出一口胸口淤血，神色渐稳）“托老丈的福，东西完好无损。只是邓百川内力深不可测，虽在十合之内未能将我留下，却已记住我的身法路数。慕容氏绝不会善罢甘休，天亮前必会封锁苏州各处水陆码头与城门盘查。”',
    },
    {
      speaker: { kind: 'custom', name: '陆老艄公', title: '开封府江南暗桩船夫', factionName: '六扇门暗桩', portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg' },
      text: '“少侠放心！老汉在太湖划了三十年船，知道一条直通无锡北郊官道的暗港！天亮前便送少侠上岸换乘快马，沿运河驿路直奔汴梁，绝不让参合庄的鹰犬拦住去路！”',
    },
  ],
  onFinishEffects: [
    { type: 'healPlayer', hpPct: 100, mpPct: 100 },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'return_kaifeng_report',
      silent: false,
    },
    {
      type: 'toast',
      text: '已成功摆脱邓百川追兵！请北返【开封府衙 · 六扇门捕快演武院】向包拯与展昭复命。',
      tone: 'success',
      logTag: '脱险北返',
    },
  ],
}

const SCENE_29_ESCAPE_TAIHU: StorySceneDef = {
  id: 'scene_kf1_29_escape_taihu',
  title: '第二十九幕 · 破窗跃水趁烟波',
  subtitle: '燕子坞 · 参合庄外水巷',
  illustrationUrl: '/assets/quests/kf_murong1_canhe_window_leap.jpg',
  illustrationCaption: '燕子坞参合庄秘档室 · 掌翻油灯火起硬接邓百川十合破窗跃湖',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '十合激战，掌风与劲气将秘档室内的檀木书架震得轰然倾倒，卷宗竹简漫天飞舞，石壁上的字画也被劲风撕作数段！少侠借着邓百川双掌一收一吐的刹那换气空隙，反手一掌打翻案上铜油灯，火油遇风骤然窜起半丈高火舌，浓烟顿时吞没半间石室！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0145' },
      text: '（挥袖震散眼前浓烟，眼中闪过一丝罕见的惊异）“好小子！年纪轻轻竟有这等定力与胆魄，硬接我十合神掌而不乱半点章法！传令下去，别让他跳入太湖——快放水闸拦截，绝不可让秘档抄录外泄！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠早已算准窗外便是直通太湖的深水暗渠，足尖一点倾倒的梁柱，身形化作一道青烟，破开雕花木窗凌空翻落！木屑飞溅之中，两支冷箭擦着肩头钉入窗棂。冰冷的湖水瞬间没顶，少侠一口真气闭住呼吸，贴着水底暗石潜游十余丈，耳畔只听水面上扑通乱响、火把噼啪与护卫呼喝声此起彼伏。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '待顺着暗流游出三百余步、脱离火把照耀范围后，少侠才轻轻浮出芦苇丛换气，依着先时约定的渔鼓暗号，很快摸到早先在太湖暗中接应的六扇门暗桩渔船船舷，翻身登舟，扯起风帆顺着夜雾疾驰而去！',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_30_NORTHBOUND_RECOVERY }],
}

const SCENE_28_DENG_SURVIVE_TRIAL: StorySceneDef = {
  id: 'scene_kf1_28_deng_survive',
  title: '第二十八幕 · 力抗神掌十回合',
  subtitle: '燕子坞 · 参合庄书房秘档室',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0145' },
      text: '“包三弟与风四弟竟先后折在你手里……难怪庄外警钟连响！阁下究竟是开封府哪一位高手？既已踏入我参合庄秘档室、看了我慕容氏不该看的东西，便先接邓某十招试试斤两，若连十合都接不住，今日便留在此处吧！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（暗暗提聚十成内力，脚踏四平八稳的方步退守临水花窗，目光死死锁住邓百川双肩与步法动静）“前辈掌力浑厚，晚辈绝非久留恋战之人——今日只要能从前辈手下撑过十合，把这卷抄录带出太湖，便是大宋六扇门赢了！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '秘档室方圆不过三丈，案几横陈、避无可避！邓百川身形微晃，青衫无风自动，双掌已如排山倒海般带着隐隐风雷之声压迫而来，一场生死十合的极限周旋就此展开！',
    },
  ],
  choices: [
    {
      id: 'kf1_deng_survive_10',
      label: '稳守门户，在邓百川手下撑过 10 回合并伺机脱身',
      subLabel: '生死十合（撑满 10 回合即成功逃走 · ⚠️ 未能撑住将直接命丧参合庄！）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0145',
            talkOverride: '“阁下擅闯参合庄秘档室，既已窥得我慕容家机密，岂能轻易离去？接我一掌！”',
          },
          rule: 'survive_rounds',
          lethalOnLose: true,
          maxRounds: 10,
          questId: QUEST_ID,
          forbidEscapeReason: '邓百川已封死陆路门户，唯有一边周旋十合一边逼近临水花窗方可跃湖脱身！',
          deathTitle: '十合未竟 · 命断参合秘室',
          deathDetail: '你在参合庄秘档室内未能撑过「神掌震江南」邓百川十合刚猛掌力，护体真气崩碎，携密账喋血太湖之畔。',
          onWin: [{ type: 'openScene', scene: SCENE_29_ESCAPE_TAIHU }],
        },
      ],
    },
  ],
}

const SCENE_27_DENG_ARRIVES: StorySceneDef = {
  id: 'scene_kf1_27_deng_arrives',
  title: '第二十七幕 · 神掌震江南封门',
  subtitle: '燕子坞 · 参合庄书房秘档室',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '刚将那几页最要紧的“辽夏军械暗账”折好塞入防水油布囊，屋外长廊忽然响起一阵沉稳而极具压迫感的脚步声！那脚步不疾不徐，每一步落下却仿佛连青石板都跟着微微一震，震得案头砚台墨汁轻晃。紧接着，“轰”的一声巨响，秘档室两扇厚重的楠木门竟被一股刚猛无匹的掌风生生震开，木屑纷飞！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '门外火把通明中，负手站着一名面容清癯、须发微霜、双目如电的青衫长者，正是姑苏慕容四大家臣之首——“神掌震江南”邓百川！在他身后，数十名参合庄精锐护卫已将正堂廊道围得水泄不通，强弓硬弩上弦，寒光凛凛直指屋内。',
    },
    {
      speaker: { kind: 'player' },
      text: '（心头猛地一沉，迅速将油布囊系死在腰带内侧，暗自估量前后退路）“一流上品的高手亲自到场，外面又有重围，硬拼绝无胜算！唯有依仗身法与防守周旋，在邓百川手下硬生生撑过十个回合，趁隙撞破后方临水花窗跃入太湖！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_28_DENG_SURVIVE_TRIAL }],
}

const SCENE_26_SECRET_ARCHIVE: StorySceneDef = {
  id: 'scene_kf1_26_secret_archive',
  title: '第二十六幕 · 秘档室内窥大燕账',
  subtitle: '燕子坞 · 参合庄书房秘档室',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '少侠借着夜色阴影摸入参合庄东侧的秘档室。屋内陈设素雅清冷，四壁紫檀书架上摆满江南田契、水陆商船账册与各州府官吏往来名录。少侠按风波恶身上搜出的名录编号，很快在最里侧博古架后寻到一道以机关暗扣封住的隐蔽暗匣。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '小心拨开暗匣铜锁，里面赫然叠放着三本以靛蓝棉纸装订的密账：首卷详录近三年间自江苏、浙江暗中冶炼的精铁刀枪三千余副、铁甲八百领，分别藏匿于太湖七十二峰幽深山洞；次卷则是往来大辽南京道、西夏兴庆府的密使暗号与私盐换马清单，账册扉页赫然盖着一枚篆文朱印——“大燕兴复”！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '更令人触目惊心的是，第三卷末端还列着几位江南转运司小吏与太湖水师把总的收受银钱明细，难怪平江府衙历年来对慕容氏车马船队百般退让、睁一只眼闭一只眼！',
    },
    {
      speaker: { kind: 'player' },
      text: '（倒吸一口凉气，迅速掏出炭笔与油纸，挑出最关键的年份、数量与接应暗桩飞快抄录）“果然不是寻常江湖械斗！慕容氏竟在江南暗蓄兵甲、勾连北狄西夏，图谋不轨！此证一旦带回开封，足够包大人震动朝野！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_27_DENG_ARRIVES }],
}

const SCENE_25_CANHE_INFILTRATION: StorySceneDef = {
  id: 'scene_kf1_25_canhe_infiltration',
  title: '第二十五幕 · 潜踪摸入参合庄',
  subtitle: '燕子坞 · 参合庄议事正厅外廊',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '既已拿到风波恶怀中的外围转运名录，少侠不再在听香水榭逗留，顺着九曲回廊一路向东，悄然潜近慕容世家真正的核心重地——参合庄。此时已近子夜，议事正厅内灯火早已熄灭，唯有东侧书房秘档室的窗棂后仍透出一丝微弱烛光，似有专人把守。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '庄内假山重叠、水道环绕，每隔二十步便有一座石灯笼，暗处隐隐有巡夜护卫提刀走动，甲叶轻擦发出细碎声响。少侠伏在太湖石后屏息等待，直到两队护卫交叉换岗的短暂间隙，才如夜猫般闪身而出。',
    },
    {
      speaker: { kind: 'player' },
      text: '（低头再核对一遍名录上的方位）“名录上写着‘甲字三号铁匣，暂存参合东轩’……巡夜护卫刚往西院换岗，约有半柱香空当，正是下手探查的好时机！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠贴着花墙阴影疾掠而过，身形未带起半片落叶，指尖轻轻一挑拨开秘档室侧门门闩，悄无声息地闪身潜入其中。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_26_SECRET_ARCHIVE }],
}

const SCENE_24_FENG_DEFEATED: StorySceneDef = {
  id: 'scene_kf1_24_feng_defeated',
  title: '第二十四幕 · 一阵风歇留名录',
  subtitle: '燕子坞 · 听香水榭曼陀山茶幽径',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '山茶花影在劲风中纷纷坠落，铺满青石小径。风波恶招式虽快如疾风骤雨、拳脚间虎虎生风，但毕竟好勇斗狠而少变通，被少侠抓住一记劈空掌后的旧力已尽、新力未生之际，顺势扣住右腕脉门，一记巧劲借力打力将他摔入花丛之中！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0214' },
      text: '（拍拍身上的花泥爬起，非但不恼，反而哈哈大笑）“痛快！真痛快！这许多年没在江南碰上这般硬扎的年轻人了！不过……风某输归输，你这身法路数里隐隐透着北方官家的刚直之气，出手又极有分寸，莫非不是江湖盗贼，而是开封府的人？”',
    },
    {
      speaker: { kind: 'player' },
      text: '（目光一冷，乘风波恶开口之际欺身而上，不给对方高声示警的机会）“风前辈好眼力，可惜今晚晚辈有要事在身，暂且委屈前辈在此歇息片刻！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠并未多言，趁风波恶话音未落之际一指点中他腰间麻穴，从他怀中摸出一本盖着“参合外库”火漆印的兵甲转运名录，随即轻声道了句“得罪”，将他扶到花树阴影后遮掩好，转身没入通往参合庄的九曲花径。',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'kf1_feng_defeated', value: true },
    { type: 'giveCombatExp', amount: 110, reason: '曼陀花径力挫风波恶' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'canhe_archive',
      silent: false,
    },
    {
      type: 'toast',
      text: '已击败风波恶并搜得外围名录！请潜往【燕子坞 · 参合庄议事正厅 · 燕子坞书房秘档室】探查核心密账。',
      tone: 'success',
      logTag: '姑苏密查',
    },
  ],
}

const SCENE_23_FENG_BATTLE: StorySceneDef = {
  id: 'scene_kf1_23_feng_battle',
  title: '第二十三幕 · 曼陀花径战风恶',
  subtitle: '燕子坞 · 听香水榭曼陀山茶幽径',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0214' },
      text: '“管你是来偷花还是来探案，既然在曼陀花径撞见了风某，不打上一场岂不是白白辜负这好月色？风某平生最爱与硬手过招，你可莫要留力！看招！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（拔剑出鞘半寸，随即又压回剑格，改以空手迎敌以免惊动庄内刀兵）“久闻姑苏慕容‘一阵风’好战成痴，今日便请教前辈高招！”',
    },
  ],
  choices: [
    {
      id: 'kf1_fight_fengboe',
      label: '接招迎战「一阵风」风波恶',
      subLabel: '生死闯阵（击败风波恶方可继续潜入参合庄 · ⚠️ 战败将直接丧命！）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0214',
            talkOverride: '“妙极，妙极！半夜三更摸进燕子坞的贼子竟有这等身手，来来来，且与风某痛快打上一场！”',
          },
          rule: 'duel',
          questId: QUEST_ID,
          forbidEscapeReason: '风波恶已欺身封住退路，唯有一战！',
          deathTitle: '花径折戟 · 命丧一阵狂风',
          deathDetail: '你在听香水榭曼陀山茶幽径不敌「一阵风」风波恶，行迹败露，被闻讯赶来的参合庄精锐乱刃分尸。',
          onWin: [{ type: 'openScene', scene: SCENE_24_FENG_DEFEATED }],
        },
      ],
    },
  ],
}

const SCENE_22_FENG_PATROL: StorySceneDef = {
  id: 'scene_kf1_22_feng_patrol',
  title: '第二十二幕 · 一阵风起惊山茶',
  subtitle: '燕子坞 · 听香水榭曼陀山茶幽径',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '辞别听香水榭后，少侠依阿朱所指小径绕过曼陀山茶花林，正欲潜往参合庄方向。谁料树影深处忽然刮起一阵狂风，树梢残花簌簌坠落，一道黑影如大鹏般自高枝扑下，双足未落稳已先拍出一股凌厉掌风，拦在青石幽径正中！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0214' },
      text: '那汉子生得精瘦干练，双目精光四射，搓着手掌嘿嘿笑道：“奇怪，刚才太湖渡口那边似乎闹了点动静，怎么包三哥没来报信，倒先摸进来一个陌生面孔？看你脚步沉稳，必定是个会家子——快快报上名来，陪风某过上几十招！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（暗暗叫苦，却丝毫不乱阵脚）“这人莫非便是慕容四大家臣中最嗜武成痴的‘一阵风’风波恶？既然避无可避，唯有速战速决，莫要惊动参合庄大队人马！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_23_FENG_BATTLE }],
}

const SCENE_21_AZHU_ABI_COVER: StorySceneDef = {
  id: 'scene_kf1_21_azhu_abi_cover',
  title: '第二十一幕 · 琴韵暗香遮耳目',
  subtitle: '燕子坞 · 听香水榭主阁',
  illustrationUrl: '/assets/quests/kf_murong1_tingxiang_lantern.jpg',
  illustrationCaption: '太湖燕子坞听香水榭 · 隔帘听琴阿朱阿碧赠竹笼风灯指幽径',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '小舟悄无声息地泊在听香水榭后方的芦苇石阶旁。阁内灯光柔和，雕花木窗半掩，隐约飘出一段清幽婉转的古琴声与淡淡的百花熏香，正是慕容复的两位贴身侍女——“听香妙手”阿朱与“琴韵佳人”阿碧在此处居停。水榭四周垂柳低拂，几尾红鲤在月影下轻轻摆尾，丝毫看不出杀机暗伏。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0256' },
      text: '（隔着竹帘轻笑开口，声线清脆却带着几分试探）“外头湖风凉，哪位客人持着包三哥的通行木牌却不从正门码头进来，反倒在芦苇丛里打转？莫不是汴梁来的旧友，连江南水阁的规矩都忘了？”',
    },
    {
      speaker: { kind: 'player' },
      text: '（心念电转，忙收起剑气，拱手隔帘行礼）“阿朱姑娘好灵通的耳目、好灵敏的鼻息！在下受汴梁故人之托前来拜会公子爷，只因素来不喜惊动庄中侍从，又闻水榭琴声雅致，这才绕到后阶暂避风露，绝无半分冒犯之意，还望姑娘行个方便。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0257' },
      text: '阿碧玉指按住琴弦，掩嘴轻笑道：“阿朱姐姐，听他说话腔调虽硬，眉宇间却还算端正，不像那些鬼鬼祟祟的江湖贼人呢。公子爷这几日不在水阁，都在参合庄那头与几位管事议事；你若真要往那边递帖，且顺着曼陀山茶幽径走，只是切记莫要惊动了巡夜的风四哥，他那人最爱找人打架啦！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0256' },
      text: '（隔帘递出一盏小小竹笼风灯，语气意味深长）“灯油只够走半个时辰。客人既是从北方远道而来，切记燕子坞的花草虽美，却也有带刺的藤蔓——看过该看的风景，便早些回返汴梁罢。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_22_FENG_PATROL }],
}

const SCENE_20_ENTER_YANZIWU: StorySceneDef = {
  id: 'scene_kf1_20_enter_yanziwu',
  title: '第二十幕 · 轻舟夜渡燕子坞',
  subtitle: '姑苏太湖 · 通往燕子坞水路',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '凭借从包不同处夺来的太湖水路通行木牌，少侠顺利避开湖面暗哨，雇得一叶吃水极浅的乌篷轻舟，趁着夜雾弥漫驶入太湖深处。湖面上水草丰茂、芦苇如墙，四下里水道纵横交错如八卦迷宫，外人若无熟手引路与木牌暗记，不出半个时辰便会迷失在百里烟波之中，甚至触动水下暗桩。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '船夫照着木牌背面的水纹刻痕七拐八绕，行约一个时辰，前方遮天蔽日的芦苇荡忽然豁然开朗，几座粉墙黛瓦的江南水阁静静浮在月色湖波之上，朱栏倒影随微澜轻晃，檐角铜铃在夜风中几乎不闻声响，正是江南武林人人敬畏的姑苏慕容世家外围所在——燕子坞听香水榭！',
    },
    {
      speaker: { kind: 'player' },
      text: '（压低声音嘱咐暗桩船夫退至三里外芦荡隐蔽接应，又暗暗记下回程水道方位）“前方便是慕容氏地界，水阁灯火未熄，且必有高手暗哨潜伏，须得步步小心，若见湖面信号火折便速速划船来接。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_21_AZHU_ABI_COVER }],
}

const SCENE_19_BAO_DEFEATED: StorySceneDef = {
  id: 'scene_kf1_19_bao_defeated',
  title: '第十九幕 · 非也先生折木牌',
  subtitle: '姑苏城 · 太湖烟波渡口',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '渡口木栈上足音急促，水浪拍打桩柱溅起阵阵白沫。包不同掌法虽怪、身法亦颇灵巧，口中更连声喝出“非也”扰人心神，但在少侠两载六扇门缉盗练就的沉稳根基面前，终究被一记虚实相间的擒拿手破开空门，肩头重重挨了一记掌风，蹬蹬蹬连退七八步才勉强扶住镇湖石塔，折扇也“啪”地掉在木板上！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0213' },
      text: '（揉着发麻的肩井穴，嘴上却仍旧半点不肯服软，脖子一梗叫道）“非也，非也！并非包某技不如人，实乃这渡口木栈年久失修、露水太重脚底打滑！罢了，罢了，看你武功路数堂堂正正，内息也算醇厚，倒也不像寻常鼠辈——这枚太湖通行木牌掉在地上，包某懒得弯腰去捡，你爱拿便拿去罢！只是去了燕子坞可别说是我包不同放你进去的！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '说罢，包不同竟头也不回地大步钻入岸边垂柳小巷，转眼不见踪影。少侠弯腰拾起那枚刻着“燕子”二字与水波暗纹的紫檀木牌，指腹摩挲着背面细密的刻痕，心里明白这正是潜入燕子坞水路的通行凭证，当即整顿行囊与兵刃，准备趁夜乘舟渡过太湖。',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'kf1_bao_defeated', value: true },
    { type: 'giveCombatExp', amount: 100, reason: '太湖渡口击败包不同' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'yanziwu_tingxiang',
      silent: false,
    },
    {
      type: 'toast',
      text: '已击败包不同并夺得太湖通行木牌！请乘舟前往【燕子坞 · 听香水榭与曼陀花坞 · 曼陀山茶幽径】探查。',
      tone: 'success',
      logTag: '姑苏密查',
    },
  ],
}

const SCENE_18_BAO_BATTLE: StorySceneDef = {
  id: 'scene_kf1_18_bao_battle',
  title: '第十八幕 · 木栈长埠斗非也',
  subtitle: '姑苏城 · 太湖烟波渡口',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0213' },
      text: '“好个牙尖嘴利的北方客！既然道理讲不过你，那包某便只好用手底下的功夫，领教领教你的虚实！且看你能不能接住我这路‘斗转星移’外门化劲！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（左脚半步踏实木栈，右手按住剑柄）“包前辈既要指教，晚辈奉陪便是！请！”',
    },
  ],
  choices: [
    {
      id: 'kf1_fight_baobutong',
      label: '迎战「非也先生」包不同',
      subLabel: '渡口决战（击败包不同夺取燕子坞通行木牌 · ⚠️ 战败将直接丧命！）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0213',
            talkOverride:
              '“非也，非也！你这北方来的行商嘴上说是买丝绸，实则眼里带着官气，今日若不接我三掌，休想踏上太湖渡船！”',
          },
          rule: 'duel',
          questId: QUEST_ID,
          forbidEscapeReason: '包不同已横身拦在渡口木栈，须堂堂正正击败他！',
          deathTitle: '太湖长埠 · 命陨非也奇招',
          deathDetail: '你在太湖烟波渡口被「非也先生」包不同借劲反震轰落寒波，壮志未酬，魂断江南。',
          onWin: [{ type: 'openScene', scene: SCENE_19_BAO_DEFEATED }],
        },
      ],
    },
  ],
}

const SCENE_17_BAO_VERBAL_SPAR: StorySceneDef = {
  id: 'scene_kf1_17_bao_verbal_spar',
  title: '第十七幕 · 机锋舌战拆破绽',
  subtitle: '姑苏城 · 太湖烟波渡口',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0213' },
      text: '“非也，非也！世人皆道‘太湖烟波客，行商买丝绸’，可你腰间悬剑步履沉稳，既不问生丝市价，也不携随行脚夫，却偏偏雇一条吃水极浅的快船——这哪是买卖人，分明是冲着湖心岛屿去的！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（不慌不忙地一笑，拱手还礼）“先生说‘非也’，在下倒也要说一句‘非也’！江南丝商走官道多遇税卡盘剥，水路轻舟反倒快捷省事；倒是先生身为文士打扮，虎口却有长年练掌的厚茧，大白天守在渡口盘问过客，莫非这太湖八百里水面，竟成了哪一家私产、连渔舟商船都过不得么？”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0213' },
      text: '包不同闻言一怔，旋即抚掌大笑，山羊胡一翘一翘：“有意思！有意思！敢在太湖边上跟包某抢白‘非也’二字的人可不多见！既如此，你若能在我手下走过胜负，这去燕子坞的水路便算你本事；若是输了，乖乖卷铺盖滚回北方去！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_18_BAO_BATTLE }],
}

const SCENE_16_TAIHU_PIER_MEET: StorySceneDef = {
  id: 'scene_kf1_16_taihu_pier',
  title: '第十六幕 · 烟波渡口遇怪客',
  subtitle: '姑苏城 · 太湖烟波渡口',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '次日一早，少侠换上一袭寻常青布商贾长衫，腰悬无印铁剑，独自来到太湖烟波渡口。长长的木栈埠头伸入浩渺烟波之中，晨雾尚未散尽，几条彩帆画舫静静泊在镇湖石塔旁，几个船夫却仿佛得了什么嘱咐，一听客人要往“燕子坞”方向去，纷纷脸色微变、摆手推辞。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '正在少侠与开封府暗桩船夫陆老汉低声接洽之际，石塔阴影里忽然踱出一名身着葛布长衫、留着一撮山羊胡的中年文士，摇着一把折扇连声叫道：“非也，非也！这位北方客官打听的地方去不得，船家不去也是为你好，免得白白送了性命！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（心中一凛，目光扫过对方轻灵无声的步法）“连声‘非也’、又守在太湖渡口盘查行客……莫非此人便是姑苏慕容四大家臣之一、号称‘非也先生’的包不同？”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_17_BAO_VERBAL_SPAR }],
}

const SCENE_15_HANSHAN_CLUE: StorySceneDef = {
  id: 'scene_kf1_15_hanshan_clue',
  title: '第十五幕 · 钟楼暗格截残笺',
  subtitle: '姑苏城 · 枫桥寒山寺古钟楼',
  illustrationUrl: '/assets/quests/kf_murong1_hanshan_bell_intercept.jpg',
  illustrationCaption: '姑苏枫桥寒山寺古钟楼 · 子夜袖石灭烛截获参合庄甲械竹筒',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '夜半子时，寒山寺钟声已歇，山门内外万籁俱寂。少侠借着古柏树影悄然潜上古钟楼，果然见两名黑衣汉子正鬼鬼祟祟地蹲在钟架底座旁，撬开一块松动青砖，从暗格里取出一只蜡封竹筒！少侠毫不犹豫，指尖一弹，一记袖石打落其中一人的火折子，趁对方惊慌失措之际凌空掠下，左掌拍出截断退路，右肘顺势磕飞短刀，三两招便将二人按翻制住。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '低声审问之下，那二人不过是替江南铁器铺跑腿的市井脚夫，只知收了五十两银钱将竹筒送至钟楼，其余一概不知。少侠打昏二人捆在梁后，撬开蜡封抽出里面的半页棉纸信笺，借着月光细看，只见上头用馆阁体写着一行小字：“冬至前十日，太湖烟波渡口木牌换船，甲械三百具分批入参合，包三、风四亲迎。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（将残笺小心收入贴身锦囊）“‘包三、风四’……包不同在慕容四大家臣中排名第三，风波恶排名第四！线索已经直指太湖烟波渡口与燕子坞参合庄了，明日一早便去渡口探路！”',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'kf1_hanshan_clue', value: true },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'taihu_bao',
      silent: false,
    },
    {
      type: 'toast',
      text: '已截获密信！请前往【姑苏城 · 太湖烟波渡口 · 烟波木栈长埠与镇湖石塔】寻舟入坞。',
      tone: 'success',
      logTag: '姑苏密查',
    },
  ],
}

const SCENE_14_HANSHAN_NIGHT: StorySceneDef = {
  id: 'scene_kf1_14_hanshan_night',
  title: '第十四幕 · 枫桥夜泊候钟声',
  subtitle: '姑苏城 · 枫桥寒山寺',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '入夜后，姑苏城外水汽渐重，枫桥边泊着几条渔火点点的客船，江风吹过芦苇发出沙沙轻响。寒山寺古钟楼檐角挂着两盏风灯，在秋风里摇曳不定，昏黄灯光把飞檐斗拱拉出长长黑影。少侠换上夜行紧身衣，隐在江枫诗轩后的修竹林中，屏息凝神，静静等候子时交接之人现身。',
    },
    {
      speaker: { kind: 'player' },
      text: '（指尖轻轻按在剑格上，暗暗推算）“客栈里那两个铁器商口音偏北，却懂得用江南水乡的‘渔鼓暗语’——若真是私运兵甲往太湖，今夜必定要在这寒山寺古钟楼递出接货清单，绝不能放跑了这条线！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_15_HANSHAN_CLUE }],
}

const SCENE_13_RIVER_TAVERN_RUMOR: StorySceneDef = {
  id: 'scene_kf1_13_river_tavern',
  title: '第十三幕 · 临河酒楼闻水阁',
  subtitle: '姑苏城 · 姑苏临河酒楼',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '午后，少侠来到姑苏临河酒楼临窗雅座，点了一壶碧螺春与两碟松鼠桂鱼、太湖银鱼，假作游山玩水的北方士子，与邻桌几名跑太湖水路的船老大闲聊起来。楼下石桥流水潺潺，乌篷船摇橹声吱呀作响，看似一派江南太平气象。',
    },
    {
      speaker: { kind: 'custom', name: '太湖船老大', title: '姑苏水运脚夫', factionName: '姑苏市井', portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg' },
      text: '（压低声音，左右张望一眼）“客官既是从北方来，可千万别听那些评弹先生瞎吹！太湖烟波里头那座燕子坞，平素最忌外人靠近。前些日子夜里，我们跑夜船的弟兄看见好几条吃水极深的黑篷货船往参合庄水巷里钻，船上蒙着厚油布，压得船舷离水面不到两寸，那分量绝不是丝绸茶叶！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（顺手替船老大斟满一碗黄酒，不动声色地问道）“莫非太湖里头还有人做私铁生意？这年头官府对生铁、硫磺查得不是极严么？”',
    },
    {
      speaker: { kind: 'custom', name: '太湖船老大', title: '姑苏水运脚夫', factionName: '姑苏市井', portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg' },
      text: '“嘘！小声些！这姑苏城里谁敢管燕子坞的事？听说连水师巡检司的船见了慕容家的青旗也要绕道走！前夜里我还听码头搬运的苦力嘀咕，说今晚子时枫桥寒山寺那边还有一趟‘铁货交接’，谁要是多嘴问一句，第二天就得沉到太湖底下去喂鱼！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（心中雪亮，丢下几枚碎银结账起身）“吃水极深的黑篷货船……莫非正是自京西、淮南偷运而来的生铁兵甲！今夜先去寒山寺古钟楼走一遭，截住接头之人！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_14_HANSHAN_NIGHT }],
}

const SCENE_12_SHANTANG_INN: StorySceneDef = {
  id: 'scene_kf1_12_shantang_inn',
  title: '第十二幕 · 山塘客栈听暗语',
  subtitle: '姑苏城 · 山塘水巷客栈',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '落脚山塘水巷客栈后，少侠刻意挑了一间临近后院马厩的僻静厢房。入暮时分，秋雨淅淅沥沥打在天井芭蕉叶上，少侠在廊下假意翻阅地方志，耳中却捕捉到二楼雅间里传出两道刻意压低的北方口音。',
    },
    {
      speaker: { kind: 'custom', name: '北方铁商甲', title: '私运暗桩', factionName: '江湖黑市' },
      text: '“这一批三百斤熟铁铸坯，按‘姑苏老主顾’的规矩，子时三刻送至枫桥寒山寺古钟楼下交接。记住，接货的人只认半枚‘燕羽铜牌’，莫要与平江府的衙役照面！”',
    },
    {
      speaker: { kind: 'custom', name: '北方铁商乙', title: '私运暗桩', factionName: '江湖黑市' },
      text: '“放心，这批货是从京西铁坊悄悄拆散了装在药材箱里运下来的，一路上打点妥当，神不知鬼不觉！只等交了货、拿了银票，咱们天亮前便乘船北归！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“熟铁铸坯……枫桥寒山寺古钟楼……燕羽铜牌！看来还没到燕子坞，先在姑苏城外就撞上了一条实打实的暗线！且去临河酒楼再探探太湖水路虚实。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_13_RIVER_TAVERN_RUMOR }],
}

const SCENE_11_SUZHOU_YAMEN_OBSERVE: StorySceneDef = {
  id: 'scene_kf1_11_suzhou_yamen',
  title: '第十一幕 · 平江府外察官风',
  subtitle: '姑苏城 · 苏州平江府衙外街',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '少侠并未直接亮出六扇门腰牌去苏州平江府衙投帖——按包拯临行密令，江南地方官吏与当地世家盘根错节，若贸然打草惊蛇，只怕消息半个时辰内便会传进太湖燕子坞。少侠只在府衙对街茶摊坐了半个时辰，一边啜饮粗茶，一边细细观察府门动静。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '果不其然，不多时便见几名衙役对过往押运私盐的商车视而不见，反而恭敬地向一辆挂着“慕容”灯笼的青帷马车躬身让道。车帘微掀，露出一张神色傲慢的管事面孔，只朝门前班头微微颔首，连路引文牒都免了查验便扬长而去。',
    },
    {
      speaker: { kind: 'player' },
      text: '（暗自冷笑，指尖轻轻叩了叩茶碗）“果然如公孙先生所料，慕容世家在姑苏根深蒂固，连平江府衙门前都要礼让三分。明查绝不可行，唯有从市井客栈与水路脚夫处暗中切入！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_12_SHANTANG_INN }],
}

const SCENE_10_ARRIVE_SUZHOU: StorySceneDef = {
  id: 'scene_kf1_10_arrive_suzhou',
  title: '第十幕 · 舟入姑苏烟雨巷',
  subtitle: '姑苏城 · 山塘水巷',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '沿汴河转淮水、入京杭大运河一路南下，十余日后，两岸风物已由中原黄土高柳化作粉墙黛瓦、小桥流水的江南胜景。姑苏城内舟楫往来不绝，吴侬软语夹杂着茶肆评弹声飘荡在秋风微雨之中，丝绸铺子与药材行鳞次栉比，富庶之象甲于东南。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '然越是繁华之地，暗流往往越深。少侠负手立在山塘石桥上，望着河面上往来穿梭的货船，留意到几艘挂着普通米行旗号的平底驳船吃水极深，船夫个个太阳穴高高鼓起，竟似身负外家硬功的练家子。',
    },
    {
      speaker: { kind: 'player' },
      text: '（整了整袖中包大人亲笔手令与几两碎银）“姑苏城到了。‘南慕容’名动江南，燕子坞又深藏太湖烟波之内，切不可轻率亮明官身，先去平江府衙外街看看此地官风如何。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_11_SUZHOU_YAMEN_OBSERVE }],
}

const SCENE_09_SOUTHBOUND_BRIEFING: StorySceneDef = {
  id: 'scene_kf1_09_southbound',
  title: '第九幕 · 驿马南下辞东京',
  subtitle: '开封府 · 南熏门外官道',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '翌晨寅时，天色尚青，秋霜铺满东京城外官道。少侠已换上一身半旧江湖游侠劲装，佩一柄不带官府徽记的长剑，悄然出南熏门南下。门外十里长亭下，展昭早备好两包干粮、一壶烈酒与一张标注着六扇门秘密联络点的江南水路舆图，亲自相送。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '“记住，此行你不是六扇门捕头，只是一个追查失物、游历江南的寻常剑客。图上标着太湖烟波渡口暗桩老陆的记号，若遇危急可找他接应。若遇慕容四大家臣阻拦，能胜则胜；倘若撞上邓百川或慕容复本人，切记不可死战硬拼，保住性命、带回实情才是头等大事！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（接过干粮与舆图，翻身上马拱手辞别）“展大哥放心！少侠这便南下姑苏，无论燕子坞是龙潭还是虎穴，定当寻得实据即刻北返！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'suzhou_investigate',
      silent: false,
    },
    {
      type: 'toast',
      text: '已领命微服南下！请前往【姑苏城（苏州） · 枫桥寒山寺 · 夜半钟声古钟楼】暗查线索。',
      tone: 'talk',
      logTag: '姑苏密查',
    },
  ],
}

const SCENE_08_BAO_DECREE: StorySceneDef = {
  id: 'scene_kf1_08_bao_decree',
  title: '第八幕 · 包公密授手谕令',
  subtitle: '开封府衙 · 开封府升堂正殿',
  illustrationUrl: '/assets/quests/kf_murong1_bao_secret_decree.jpg',
  illustrationCaption: '开封府衙升堂正殿 · 包拯夕照下亲书十六字素笺密谕遣南查',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '包拯听罢公孙策与展昭之言，沉吟良久。正殿之外，夕阳余晖照在“明镜高悬”匾额上，折射出庄严沉肃的光影。包拯随即提笔在一张无印素笺上写下十六字密谕：“暗访姑苏，查实即返；保全其身，切勿打草。”写罢，将素笺连同一枚暗银小印交予少侠。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '“少侠已在六扇门捕头任上勤勉二载，办案沉稳、武艺亦已臻佳境。此番南下姑苏，不发公文、不惊地方，全凭少侠一人之耳目。若能活着查明燕子坞虚实、带回确凿线索，本府便奏请朝廷擢升少侠为【金牌总捕】，专司天下大案！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（双手接过素笺与暗银小印，郑重贴身藏好）“卑职定当竭尽全力，深入姑苏查明真相，绝不辱没开封府威名！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_09_SOUTHBOUND_BRIEFING }],
}

const SCENE_07_ZHANZHAO_WARNING: StorySceneDef = {
  id: 'scene_kf1_07_zhanzhao_warning',
  title: '第七幕 · 南侠叮嘱防星移',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '展昭神色凝重地将少侠请至演武院石阶旁，伸手按住少侠肩头低声道：“少侠，姑苏慕容氏绝非寻常绿林草寇。当今江湖人称‘北乔峰、南慕容’，慕容复年少英才，家传‘斗转星移’更是能借力打力、以彼之道还施彼身，等闲高手在他面前连自己的成名绝技都不敢轻易施展。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '“纵然见不到慕容复本人，他麾下四大家臣——邓百川、公冶乾、包不同、风波恶，亦个个皆是江南一流好手！包不同口舌犀利、风波恶好战成痴，公冶乾掌力刚猛，而居首的‘神掌震江南’邓百川，功力深厚更是极难力敌。此行只是密查，万不可意气用事！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“多谢展护卫提点！卑职记下了——先探虚实、能斗则斗、遇强则避，若真撞上邓百川这等顶尖人物，只要撑住局面抽身退走便是胜算，决不硬撞铁板。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_08_BAO_DECREE }],
}

const SCENE_06_GONGSUN_ANALYSIS: StorySceneDef = {
  id: 'scene_kf1_06_gongsun_analysis',
  title: '第六幕 · 公孙拆解江南局',
  subtitle: '开封府衙 · 刑名架阁卷宗楼',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '公孙策摊开一张江南运河水系图，手持朱笔，手指自京西铁坊一路点向江苏苏州太湖：“诸位请看，近半年来京西、河东铁坊报失的熟铁生坯，以及淮南私盐帮多出来的快船，最后竟然都在姑苏太湖一带断了踪迹。而太湖烟波深处，便坐落着鲜卑皇族遗脉——姑苏慕容氏的燕子坞。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '“本朝立国以来，对江南前代遗族素来宽仁。慕容氏表面上广交江湖豪杰、筑还施水阁藏天下武学，号称‘以彼之道，还施彼身’，可若真有人暗中囤积兵甲、勾连辽夏、意图不轨，那便是动摇国本的谋反大案！难怪贼人宁可冒死夜闯开封府，也要毁去这份江南盐铁密报！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“原来如此！贼人夜盗卷宗，反倒坐实了江南太湖必有见不得光的勾当！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_07_ZHANZHAO_WARNING }],
}

const SCENE_05_ARCHIVE_DISCOVERY: StorySceneDef = {
  id: 'scene_kf1_05_archive_discovery',
  title: '第五幕 · 灰烬残页现燕子',
  subtitle: '开封府衙 · 刑名架阁卷宗楼',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '刑名架阁楼三层东南角，一只装着旧年江南盐铁密报的铁皮卷柜被人以极细的钢丝撬开，里面的十余份原件不翼而飞，地上只余一撮烧得焦黑的纸灰。好在少侠仔细搜检柜底尘灰时，竟在木榫缝隙里夹出半片被盗贼撕落的水纹纸角。',
    },
    {
      speaker: { kind: 'player' },
      text: '（小心翼翼地用镊子夹起残纸，凑到灯笼下细看）“公孙先生请看！这纸角边缘虽被火燎过，却仍能辨出‘太湖……燕子……甲械三千’几个字迹，而且这纸质并非北方官纸，倒像是江南吴郡特产的‘澄心堂冷金笺’！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '公孙策接过残纸轻嗅一下，眉头顿时紧锁：“纸上还带着极淡的太湖水檀香！盗贼虽毁了正本，却漏算了这一角残笺——江南有人坐不住了！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_06_GONGSUN_ANALYSIS }],
}

const SCENE_04_NIGHT_THEFT_TRACE: StorySceneDef = {
  id: 'scene_kf1_04_night_theft',
  title: '第四幕 · 瓦檐轻功露破绽',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '少侠跃上卷宗楼檐角细看，只见琉璃瓦背上留着两枚极浅的鞋印，足尖内扣、落脚极轻，显然来人轻功甚高，绝非京城本地的飞贼草寇。更奇的是，一名值夜小吏虽被人点中昏睡穴，可展昭替他解穴时却发现，那股残留指力阴柔奇诡，竟隐隐有几分江南世家“兰花拂穴”的影子。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '“能从开封府重兵把守的架阁楼全身而退，绝非一般毛贼！好在贼人走得匆忙，并未把所有密档尽数毁去。少侠，随我与公孙先生上楼勘验被翻动过的密档！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“是！且看贼人究竟是冲着哪一卷宗而来！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_05_ARCHIVE_DISCOVERY }],
}

const SCENE_03_EVENING_ALARM: StorySceneDef = {
  id: 'scene_kf1_03_evening_alarm',
  title: '第三幕 · 卷宗楼夜起惊风',
  subtitle: '开封府衙 · 刑名架阁卷宗楼',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '未等众人细议，当夜三更，开封府后院刑名架阁卷宗楼忽然响起一声短促的竹梆警报！夜风呼啸中，几道值夜捕快提灯赶到时，只见三楼临街窗扇大开，一名值夜书吏晕倒在廊下，几册贴着“江南盐铁密报”封条的卷宗已被翻动，铜锁断落在地。',
    },
    {
      speaker: { kind: 'player' },
      text: '（飞身跃上窗台，借着月色查验窗棂与铜锁断面）“来人没有硬撬锁芯，而是用极柔韧的内劲震断了铜栓！看窗外屋脊瓦片上的露水痕迹，人刚走不久，方向是东南角！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '展昭身形一晃已落在屋脊之上，凝望夜色尽头片刻后沉声道：“身法极快，已借夜色遁入樊楼街市人群。先莫盲目追击，回楼仔细查验失窃痕迹！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_04_NIGHT_THEFT_TRACE }],
}

const SCENE_02_TWO_YEARS_TENURE: StorySceneDef = {
  id: 'scene_kf1_02_two_years_tenure',
  title: '第二幕 · 演武点卯议升迁',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '展昭站在演武院兵器架旁，朝少侠微微颔首笑道：“少侠自升任捕头都头以来，已整整历练两年有余。京畿重地大大小小的盗案、劫镖案经你手破获无数，包大人与本官都看在眼里。按六扇门旧例，捕头做满七百三十日，本该递帖考校升任【金牌总捕】。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '“只是这两日东京城里出了桩蹊跷事——京西铁坊与江南盐铁司同时递来密报，称有大批熟铁与私盐去向不明，包大人正为此事凝眉不展。恐怕你升任金牌总捕的头一桩考校，便是要替大人跑一趟江南了。”',
    },
    {
      speaker: { kind: 'player' },
      text: '“江南路远，却正是六扇门捕快磨砺身手、为国分忧的好去处！不知这桩铁案具体从何查起？”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_03_EVENING_ALARM }],
}

const SCENE_01_KAIFENG_SUMMONS: StorySceneDef = {
  id: 'scene_kf1_01_summons',
  title: '第一幕 · 两载捕头听召令',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '皇祐年间的东京汴梁依旧车水马龙，御街两侧酒旗招展，开封府衙后院的六扇门演武坪上却比往日多出几分肃杀之气。少侠身着捕头都头青色公服，在六扇门历练已满七百三十个日夜，今日清晨忽然接到包拯堂谕，命你与南侠展昭、公孙策一同入后堂议事。',
    },
    {
      speaker: { kind: 'player' },
      text: '（整衣佩刀，步入演武院）“两年来缉盗追凶，少侠早已熟稔京畿治安。不知今日包大人急召，究竟是为了哪一桩紧要公案？”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '演武院铜钟轻鸣，展昭正负手立在石阶之上，见少侠到来，目光中既有赞许，又隐隐带着几分审慎与忧色。',
    },
  ],
  choices: [
    {
      id: 'kf1_accept_assignment',
      label: '领受六扇门晋升考校 · 查探江南密案',
      subLabel: '开启 Lv.2 → Lv.3 晋升任务《燕子坞暗影 · 姑苏密查》',
      tone: 'primary',
      effects: [
        { type: 'startQuest', questId: QUEST_ID, stepId: 'suzhou_investigate' },
        { type: 'openScene', scene: SCENE_02_TWO_YEARS_TENURE },
      ],
    },
  ],
}

export const KAIFENG_MURONG_QUEST_1: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '燕子坞暗影 · 姑苏密查',
    category: 'sect_mission',
    factionId: 'SECT-17',
    regionId: 'bianliang',
    recommendedRealm: '二流巅峰',
    maxOpponentRealm: '一流中品（邓百川十合逃生）',
    recommendedNote:
      '刚性前置：加入【开封府 / 六扇门】且官居【Lv.2 捕头都头】、任捕头都头满 730 天；后续乘舟入燕子坞前须先于苏州府完成《烟波三叠 · 燕子坞水图》。',
    startHint:
      '成为开封府 Lv.2 捕头都头并任满 730 天后，前往【开封府 · 开封府衙 · 六扇门捕快演武院】，点击「领取晋升任务：《燕子坞暗影 · 姑苏密查》」开启。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_liushan',
      customLabel: '开封府 · 开封府衙 · 六扇门捕快演武院',
    },
    startCondition: {
      type: 'all',
      conditions: [
        { type: 'inSect', sectId: 'SECT-17', minRank: 2 },
        { type: 'kaifengRank2DaysAtLeast', min: 730 },
      ],
    },
    initialStepId: 'suzhou_investigate',
    summary:
      '捕头都头做满 730 天后，奉包拯密令微服南下姑苏查探燕子坞慕容氏私蓄兵甲之疑云。须先挫败包不同、风波恶，潜入参合庄秘档室取证，并在“神掌震江南”邓百川手下撑过 10 回合全身而退，方可解锁晋升【Lv.3 金牌总捕】。',
    steps: {
      suzhou_investigate: {
        id: 'suzhou_investigate',
        title: '姑苏暗访寒山夜',
        objective: '微服南下姑苏城，前往【枫桥寒山寺 · 夜半钟声古钟楼】截查兵甲接货密信。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_hanshan',
          spotId: 'sz_hs_bell',
          customLabel: '姑苏城 · 枫桥寒山寺 · 夜半钟声古钟楼',
        },
      },
      taihu_bao: {
        id: 'taihu_bao',
        title: '太湖渡口斗非也',
        objective: '前往姑苏【太湖烟波渡口 · 烟波木栈长埠与镇湖石塔】，与包不同交手并击败之，夺取入坞木牌。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_taihu',
          spotId: 'sz_th_pier',
          customLabel: '姑苏城 · 太湖烟波渡口 · 烟波木栈长埠与镇湖石塔',
        },
      },
      yanziwu_tingxiang: {
        id: 'yanziwu_tingxiang',
        title: '山茶幽径破风恶',
        objective: '乘舟潜入燕子坞【听香水榭与曼陀花坞 · 曼陀山茶幽径】，击败巡夜的“一阵风”风波恶。',
        nextHint:
          '若尚未贯通太湖航道，须先于苏州府【太湖烟波渡口】完成江南三府奇遇《烟波三叠 · 燕子坞水图》（获取《太湖燕子坞烟波水路舆图》），方可自大地图乘舟入坞。',
        targetLocation: {
          regionId: 'yanziwu',
          buildingId: 'yzw_tingxiang',
          spotId: 'yzw_tingxiang_west',
          customLabel: '燕子坞 · 听香水榭与曼陀花坞 · 曼陀山茶幽径',
        },
      },
      canhe_archive: {
        id: 'canhe_archive',
        title: '参合秘室十合逃',
        objective: '潜入【燕子坞 · 参合庄议事正厅 · 燕子坞书房秘档室】抄录大燕密账，并在邓百川手下撑过 10 回合逃生！',
        targetLocation: {
          regionId: 'yanziwu',
          buildingId: 'yzw_canhe',
          spotId: 'yzw_canhe_east',
          customLabel: '燕子坞 · 参合庄议事正厅 · 燕子坞书房秘档室',
        },
      },
      return_kaifeng_report: {
        id: 'return_kaifeng_report',
        title: '北返开封呈密卷',
        objective: '返回【开封府衙 · 六扇门捕快演武院】向包拯、展昭呈交参合庄密账，解锁金牌总捕晋升资格。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_kaifengfu',
          spotId: 'bl_kf_liushan',
          customLabel: '开封府 · 开封府衙 · 六扇门捕快演武院',
        },
      },
    },
    spotActions: [
      {
        id: 'spot_kf1_start',
        label: '领取晋升任务：《燕子坞暗影 · 姑苏密查》',
        badge: 'Lv.2→Lv.3 晋升',
        subtitle: '需开封府 Lv.2 捕头都头且任满 730 天 · 包拯密令南下查探姑苏慕容',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_liushan',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'inSect', sectId: 'SECT-17', minRank: 2 },
            { type: 'questStatus', questId: QUEST_ID, status: 'not_started' },
            { type: 'questStatus', questId: QUEST_ID, status: 'not_completed' },
          ],
        },
        enabledWhen: { type: 'kaifengRank2DaysAtLeast', min: 730 },
        effects: [{ type: 'openScene', scene: SCENE_01_KAIFENG_SUMMONS }],
      },
      {
        id: 'spot_kf1_hanshan',
        label: '夜探古钟楼 · 截查私运兵甲密信',
        badge: '第10-15幕',
        subtitle: '探查姑苏城外兵甲流向，追踪燕子坞接头暗线',
        tone: 'primary',
        regionId: 'suzhou',
        buildingId: 'sz_hanshan',
        spotId: 'sz_hs_bell',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'suzhou_investigate',
        },
        effects: [{ type: 'openScene', scene: SCENE_10_ARRIVE_SUZHOU }],
      },
      {
        id: 'spot_kf1_taihu_bao',
        label: '太湖渡口问舟 · 迎战包不同',
        badge: '第16-19幕',
        subtitle: '智辩并击败“非也先生”包不同，夺取太湖通行木牌',
        tone: 'danger',
        regionId: 'suzhou',
        buildingId: 'sz_taihu',
        spotId: 'sz_th_pier',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'taihu_bao',
        },
        effects: [{ type: 'openScene', scene: SCENE_16_TAIHU_PIER_MEET }],
      },
      {
        id: 'spot_kf1_yanziwu_feng',
        label: '潜入听香水榭 · 力战风波恶',
        badge: '第20-24幕',
        subtitle: '夜渡燕子坞，击败巡夜家臣“一阵风”风波恶',
        tone: 'danger',
        regionId: 'yanziwu',
        buildingId: 'yzw_tingxiang',
        spotId: 'yzw_tingxiang_west',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'yanziwu_tingxiang',
        },
        effects: [{ type: 'openScene', scene: SCENE_20_ENTER_YANZIWU }],
      },
      {
        id: 'spot_kf1_canhe_deng',
        label: '潜入参合秘档室 · 十合避神掌',
        badge: '第25-30幕',
        subtitle: '抄录大燕密账，并在邓百川手下撑过 10 回合跃湖逃生！',
        tone: 'danger',
        regionId: 'yanziwu',
        buildingId: 'yzw_canhe',
        spotId: 'yzw_canhe_east',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'canhe_archive',
        },
        effects: [{ type: 'openScene', scene: SCENE_25_CANHE_INFILTRATION }],
      },
      {
        id: 'spot_kf1_return_kaifeng',
        label: '向包拯、展昭呈交姑苏密卷',
        badge: '第31-32幕',
        subtitle: '完成《燕子坞暗影 · 姑苏密查》，解锁 Lv.3 金牌总捕晋升资格',
        tone: 'jade',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_liushan',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'return_kaifeng_report',
        },
        effects: [{ type: 'openScene', scene: SCENE_31_RETURN_TO_KAIFENG }],
      },
    ],
  },
]
