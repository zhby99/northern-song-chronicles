import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q42_QUEST_ID } from './shaolinSweepingMonkYijinQuest'

export const SHAOLIN_Q42_SCENES: Record<string, StorySceneDef> = {
  scene_slq42_01: {
    id: 'scene_slq42_01',
    title: '第一幕 · 琉璃秋夜',
    subtitle: '嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山千树银杏尽染金黄。你入少林苦修已满三载、执掌千年祖庭，今夜照例夜巡【重檐琉璃藏经主阁】，刚踏上二层楠木回廊，便骤然察觉经架深处潜伏着数道如渊似海的恐怖内息！'),
      N('话音未落，东窗轰然震开！【萧峰】大步踏入阁中，紧追着白发飞扬、双目如血的灰袍魁梧老者【萧远山】：“鼠辈！你装死躲在少林藏经阁偷学七十二绝技三十年，今日老夫父子寻上门来，还不滚出来受死？！”'),
      S('NPC-0104', '（经架阴影中传来悠长傲慢的冷笑，儒雅却深藏枭雄戾气的灰袍老者【慕容博】携面色发白的【慕容复】缓缓步出）“哈哈哈！萧老英雄好眼力，三十年来你我暗中交手三次，今日总算不必遮掩了！”'),
      S('NPC-0113', '（西窗骤卷大红镶金吐蕃袈裟，大轮明王【鸠摩智】凌空落于雕花栏杆，火焰刀炽浪压得佛灯明灭）“阿弥陀佛！慕容老施主当年赠小僧七十二绝技抄本，今日特来助一臂之力——顺便领教少林掌门高招！”'),
      N('萧远山、慕容博、萧峰、慕容复、鸠摩智——当今大宋、大辽、吐蕃武林五大绝顶高手，竟在同一夜齐聚于少林藏经主阁这一方斗室！'),
    ],
    choices: [
      {
        id: 'slq42_accept_guard_sutras',
        label: '【横立经橱 · 先护佛藏】衣袍振风挡于达摩祖师经架之前，喝令五强不得在圣地毁经动武！',
        subLabel: '正式开启绝顶封神终章《古杏扫叶 · 易筋真经》',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q42_QUEST_ID, stepId: 'pavilion_intrusion' },
          setStep(SHAOLIN_Q42_QUEST_ID, 'pavilion_intrusion'),
          { type: 'setFlag', flag: 'sl_q42_pavilion_triggered', value: true },
          toast('已开启绝顶封神终章《古杏扫叶 · 易筋真经》！五大绝顶齐聚琉璃藏经阁！', 'talk', '易筋真经'),
          openScene('scene_slq42_02', SHAOLIN_Q42_QUEST_ID),
        ],
      },
      {
        id: 'slq42_accept_settle_karma',
        label: '【佛前明断 · 了结旧账】沉声喝止满阁戾气，既三十年恩怨齐聚嵩山，便在佛前当众问个水落石出！',
        subLabel: '正式开启绝顶封神终章《古杏扫叶 · 易筋真经》',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q42_QUEST_ID, stepId: 'pavilion_intrusion' },
          setStep(SHAOLIN_Q42_QUEST_ID, 'pavilion_intrusion'),
          { type: 'setFlag', flag: 'sl_q42_pavilion_triggered', value: true },
          toast('已开启绝顶封神终章《古杏扫叶 · 易筋真经》！三十年雁门旧案总决算！', 'talk', '易筋真经'),
          openScene('scene_slq42_02', SHAOLIN_Q42_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq42_02: {
    id: 'scene_slq42_02',
    title: '第二幕 · 五强对峙',
    subtitle: '重檐琉璃藏经主阁',
    illustrationUrl: '/assets/quests/sl_42_pavilion_standoff.jpg',
    illustrationCaption: '琉璃藏经主阁 · 萧远山、慕容博、萧峰、慕容复、鸠摩智五大绝顶高手齐聚，三十年恩怨总决算',
    mandatory: true,
    beats: [
      N('六股宗师级以上的磅礴真气在琉璃主阁轰然激荡！楠木梁柱吱呀震颤，架上数百年古经黄绫无风翻飞！'),
      S('NPC-0110', '（双目如炬逼视慕容博，声音沉痛震怒）“慕容博！三十年前你为挑起宋辽大战、趁乱光复大燕旧梦，竟假传军情谎称契丹武士盗取少林武学，害得中原群豪于雁门关伏杀我无辜双亲！此事你可敢认？！”'),
      S('NPC-0104', '（竟毫发无愧，反而仰天长笑傲气冲霄）“认！有何不敢认！大丈夫以天下为棋盘、众生为棋子！区区一对契丹夫妇与几十名武夫性命，若换我大燕复国大业，死得其所！只恨当年宋辽竟议和息兵，坏了老夫苦心！”'),
      S('NPC-0105', '（怒极反笑，全身黑焰杀气暴涨）“好一个『死得其所』！我儿峰儿一生忠义却因你家破人亡、半生漂泊！今日老夫拼掉这条老命，也要将你慕容父子碎尸万段！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_03', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_03: {
    id: 'scene_slq42_03',
    title: '第三幕 · 斥枭破局',
    subtitle: '重檐琉璃藏经主阁（战前交锋 · 旧案真相回响）',
    mandatory: true,
    beats: [
      N('骤然间，鸠摩智一记火焰刀炽浪横扫萧氏父子，慕容复拔剑直扑萧峰侧翼，将萧远山与萧峰暂且缠住于阁楼东侧！鸠摩智大笑：“慕容老施主只管拿下这少林掌门、夺取祖师遗篇秘卷，萧氏父子交由小僧招呼！”'),
      S('NPC-0104', '（灰袍鼓荡，阴鸷目光如毒蛇锁定你，冷笑踱步逼近）“你便是新近威震中原、击退赫连铁树的少林掌门？老夫本不屑与后辈动手，既挡我夺取达摩真传之路，便拿你先试我姑苏慕容的《参合指》罢！”'),
      S('NPC-0110', '（挥降龙掌逼退慕容复，焦急大呼）“{ifFlagEq:sl_branch=layman|大居士|掌门}小心！慕容博修为深不可测，绝不在我父子之下！”'),
      N('面对这位潜伏藏经阁三十载、视苍生为草芥的绝顶枭雄，你目光冷冽如电，迎面掷出一声惊雷断喝——'),
    ],
    choices: [
      {
        id: 'slq42_expose_murongbo',
        label: '【直指罪魁 · 揭破玄悲玄苦惨案】当场点破雁门假讯与玄悲、玄苦两位高僧身死真相，直击枭雄心防！',
        subLabel: '需曾于双僧疑案亲破真相或辩才 ≥ 70 · 戳穿其借刀杀人灭口恶行，激怒慕容博失其从容',
        tone: 'gold',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q34_truth_deduced', op: 'truthy', label: '曾于双僧疑案亲手推破幕后真凶' },
            { type: 'skillAtLeast', key: '辩才', min: 70 },
          ],
          hint: '需曾于双僧疑案推破真凶或辩才 ≥ 70',
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q42_exposed_murongbo', value: true },
          openScene('scene_slq42_04', SHAOLIN_Q42_QUEST_ID),
        ],
      },
      {
        id: 'slq42_rebuke_dharma',
        label: '【佛理斥枭 · 浩然迎敌】斥其潜伏藏经阁三十载却未悟半句戒杀慈悲，亮开少林绝学正面相迎！',
        subLabel: '零门槛正攻 · 以佛门浩然正气直面绝顶枭雄',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q42_exposed_murongbo', value: false },
          openScene('scene_slq42_04', SHAOLIN_Q42_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq42_04: {
    id: 'scene_slq42_04',
    title: '第四幕 · 参合斗转',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      P('{ifFlag:sl_q42_exposed_murongbo|“慕容博！三十年前雁门关假传军情是你，近日潜杀我少林玄悲、玄苦二位师伯灭口的幕后黑手亦是你！大韦陀杵反噬奇伤与姑苏暗藏的参合指痕，岂瞒得过少林法眼！”|“慕容博！你口口声声大燕复兴，实则一己私欲薰心！为求一姓皇图竟忍令宋辽生灵涂炭，潜伏藏经阁三十年遍览佛典，却连一句『戒杀护生』都未曾读进心里！”}'),
      N('{ifFlag:sl_q34_truth_deduced|昔年勘验玄悲、玄苦二位师伯遗体时的每一分蛛丝马迹此刻严丝合缝！萧峰与萧远山闻言双目赤红，连鸠摩智亦不由微微动容！|满阁杀气在这一声正气断喝之下轰然炸裂，梁柱尘埃簌簌而落！}'),
      S('NPC-0104', '{ifFlag:sl_q42_exposed_murongbo|（脸色骤然一沉，眼中首次泛起被撕开遮羞布的凛冽杀机，再无半分悠然傲态）“好利的一双招子！连玄悲、玄苦那两桩隐秘你竟也查得一清二楚——既然知道得太多，今日便绝对留你不得！”|（笑容骤冷，灰袍鼓荡起宗师上品巅峰的恐怖气机）“牙尖嘴利的小辈！老夫倒要看看，你在姑苏慕容神功之下撑不撑得过十五合！”}'),
      N('“嗤——轰！”慕容博右手食指微屈轻弹，一道凝若无形、锋利裂铁的【参合指】破空激射！你迎指重掌震碎指风，却忽觉掌力如入星河漩涡倒卷而回——正是天下闻名的【斗转星移】！'),
      N('电光石火间你强提真气卸开倒卷劲力，心头反而一片空明！三载木桩廊苦修、三院历练、四海护法与千僧血战的毕生感悟在这一瞬融会贯通：“区区斗转星移，移得了我外家招式，移得了我佛门浩然正气么？！”'),
    ],
    choices: [
      {
        id: 'slq42_to_murongbo',
        label: '稳住心神，十五合硬撼绝顶枭雄【慕容博】！',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q42_QUEST_ID, 'murongbo_fifteen_rounds'),
          toast('准备迎战绝顶高手【慕容博】！撑满十五合或将其击败即可破局！', 'warn', '十五合战'),
        ],
      },
    ],
  },

  scene_slq42_05: {
    id: 'scene_slq42_05',
    title: '第五幕 · 十五合战',
    subtitle: '重檐琉璃藏经主阁（宗师巅峰硬仗）',
    illustrationUrl: '/assets/quests/sl_42_murongbo_clash.jpg',
    illustrationCaption: '琉璃藏经主阁 · 主角以三载禅武修为十五合硬撼慕容博参合指与斗转星移',
    mandatory: true,
    beats: [
      N('东侧萧远山、萧峰与鸠摩智、慕容复战得天昏地暗，琉璃主阁中央气浪翻涌、经架摇曳！'),
      S('NPC-0104', '（灰袖翻飞，参合指风纵横交错如天罗地网）“好个少林掌门！接老夫十成功力的参合神指与斗转星移！”'),
      N('面对潜伏三十载的宗师上品绝顶枭雄，只要在其狂攻之下撑满十五回合不倒（或提前将其正面击溃），便足以彻底震慑慕容博、护住少林千年佛藏！'),
    ],
    choices: [
      {
        id: 'slq42_fight_zen_counter',
        label: '【以静制动 · 狮吼破斗转】先以佛门禅音震散借力气旋，稳守中宫十五合硬撼【慕容博】！',
        subLabel: '需先前揭破慕容博真相或经义 ≥ 95 · 撑满 15 合不倒或提前击败对手即获胜',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q42_exposed_murongbo', op: 'truthy', label: '战前揭破慕容博罪行扰乱其心神' },
            { type: 'skillAtLeast', key: '经义', min: 95 },
          ],
          hint: '需战前揭破慕容博真相或经义 ≥ 95',
        },
        effects: [
          toast('你一记佛门狮子吼震乱斗转星移借力气旋，沉稳踏入十五合巅峰对决！', 'success', '禅音破旋'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q42_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0104' },
            rule: 'survive_rounds',
            maxRounds: 15,
            forbidEscapeReason: '身后便是少林千年佛藏与正道威严，绝不可退！',
            introText: '【十五合巅峰硬仗 · 禅音破旋】于琉璃藏经主阁正面硬撼【慕容博】参合指与斗转星移！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq42_06', SHAOLIN_Q42_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('慕容博参合指与斗转星移玄妙无双，稳住佛门真气调息回满再战！', 'warn', '十五合战'),
            ],
          },
        ],
      },
      {
        id: 'slq42_fight_murongbo',
        label: '【正面硬撼 · 禅武迎指】倾尽少林绝学正面十五合硬撼【慕容博】！（宗师巅峰硬仗）',
        subLabel: '零门槛正攻 · 撑满 15 合不倒或提前击败对手即获胜',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q42_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0104' },
            rule: 'survive_rounds',
            maxRounds: 15,
            forbidEscapeReason: '身后便是少林千年佛藏与正道威严，绝不可退！',
            introText: '【十五合巅峰硬仗】于琉璃藏经主阁正面硬撼【慕容博】参合指与斗转星移！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq42_06', SHAOLIN_Q42_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('慕容博参合指与斗转星移玄妙无双，稳住佛门真气调息回满再战！', 'warn', '十五合战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq42_06: {
    id: 'scene_slq42_06',
    title: '第六幕 · 竹帚轻响',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('十五合转瞬而过！琉璃主阁楠木地板已被激荡劲气犁出数十道深沟！第十五合终了，你以佛门无上正气震散斗转气旋，一掌硬撼参合神指——“轰”的一声炸碎数扇琉璃花窗，慕容博竟被震退三步、灰袖寸裂！'),
      S('NPC-0104', '（眼中首次涌起深深忌惮与骇然）“了不得！老夫偷阅七十二绝技三十年，竟在十五合内拿不下一个后起之秀！少林若留你成长下去，大燕复国必成泡影！”'),
      N('恰在此时东侧战局彻底失控！萧峰一记【见龙在田】震伤慕容复，萧远山与萧峰父子携三十年血仇暴喝合扑慕容博！降龙掌、黑风掌、参合指与鸠摩智暗袭的火焰刀四股移山填海的绝顶杀招轰然汇聚，眼看便要玉石俱焚、将整座藏经阁化作飞灰！'),
      N('千钧一发之际，阁门之外忽然传来极轻、极缓、却奇异压过漫天掌风的扫叶声：“沙……沙……沙……”一名灰布旧衣、形容枯槁、提着破旧竹帚的老僧慢悠悠跨进门槛，径直走进四股绝顶杀招正中！'),
      S('NPC-0101', '（法空缓缓抬眼，声音平淡温和如秋日暖风）“阿弥陀佛。几位施主在藏经阁中动手，莫要碰坏了架上的《法华经》与《杂阿含经》。”'),
    ],
    choices: [
      {
        id: 'slq42_to_qiwall',
        label: '屏息凝神，见证扫地僧法空【三尺无形气墙】震慑群雄！',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q42_QUEST_ID, 'three_foot_qi_wall'),
          toast('扫地僧法空已踏入藏经主阁！见证大宗师三尺无形气墙神威！', 'talk', '无形气墙'),
        ],
      },
    ],
  },

  scene_slq42_07: {
    id: 'scene_slq42_07',
    title: '第七幕 · 三尺气墙',
    subtitle: '重檐琉璃藏经主阁',
    illustrationUrl: '/assets/quests/sl_42_three_foot_wall.jpg',
    illustrationCaption: '琉璃藏经主阁 · 扫地僧法空缓步合十，三尺无形气墙轻描淡写挡下萧峰降龙掌与慕容博参合指',
    mandatory: true,
    beats: [
      S('NPC-0110', '（见灰衣老僧直步掌风中央，骇然大呼）“老大师快闪开！我的降龙掌收不住了！”'),
      N('不可思议的一幕震碎了阁中所有人的认知！扫地僧法空连手中竹帚都未曾放下，只是微微合十垂目。就在降龙掌风与参合指劲迫近他身前三尺之际，空气中仿佛凭空凝起一堵浩瀚浑圆的【三尺无形气墙】！'),
      N('两道足以开碑裂石的绝顶杀招撞入三尺气墙，竟如春雪遇阳、泥牛入海，连一丝涟漪未曾激起便化得干干净净，连法空垂落肩头的半缕白眉都不曾吹动半分！'),
      N('满阁死寂！萧远山呆立原地，慕容博瞳孔骤缩如针，一向目空一切的鸠摩智骇得连退半步失声低呼：“无形气墙……大宗师之境？！”萧峰收掌肃然躬身：“晚辈有眼不识泰山，竟不知少林藏经阁中卧着如此当世活佛！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_08', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_08: {
    id: 'scene_slq42_08',
    title: '第八幕 · 点破隐疾',
    subtitle: '重檐琉璃藏经主阁 → 西厢晒经石台',
    mandatory: true,
    beats: [
      S('NPC-0101', '（悲悯目光依次扫过萧远山、慕容博与鸠摩智）“本寺七十二绝技每一项皆须以慈悲佛法化解戾气。萧居士偷学绝技，如今午后是不是胸口冰寒刺骨？慕容居士偷学绝技，子夜是不是双颊灼热如火？至于吐蕃明王，以道家小无相功强催七十二绝技，早已戾气侵心、危在旦夕！”'),
      N('萧远山与慕容博闻言齐齐面色惨白剧震！鸠摩智强作镇定冷哼“装神弄鬼”，暗中却悄然劈出一道无形控鹤火焰刀气偷袭法空背心——刀气刚触三尺气墙便消弭无踪，法空连头都未回！'),
      S('NPC-0101', '（轻叹望向依旧怒目相向、誓死不肯放下血仇与复国执念的萧慕二老）“冤冤相报何时了？二位内伤已入膏肓，既不破生死之关，难悟红尘皆空。请随老衲移步西厢晒经石台罢。”'),
      N('法空枯瘦双手凌空虚拂，萧远山与慕容博竟身不由己飘出主阁落向西厢晒经石台！你紧随其后掠出阁外，心中念头急转——'),
    ],
    choices: [
      {
        id: 'slq42_terrace_comfort_qiaofeng',
        label: '【宽慰萧峰 · 劝父回头】步至萧峰身侧低声言明神僧乃为救父破魔，请他切莫惊慌阻拦度化之机',
        subLabel: '赴西厢晒经校勘石台见证度化',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q42_terrace_action', value: 'comfort' },
          setStep(SHAOLIN_Q42_QUEST_ID, 'convert_and_repel'),
          toast('请前往【西厢晒经校勘石台】见证扫地僧法空无上度化神通！', 'talk', '假死度化'),
        ],
      },
      {
        id: 'slq42_terrace_watch_jiumozhi',
        label: '【暗盯明王 · 防其生变】紧锁满眼怨毒的鸠摩智与慕容复，严防二人趁法空施救之际狗急跳墙偷袭！',
        subLabel: '赴西厢晒经校勘石台见证度化',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q42_terrace_action', value: 'watch' },
          setStep(SHAOLIN_Q42_QUEST_ID, 'convert_and_repel'),
          toast('请前往【西厢晒经校勘石台】见证扫地僧法空无上度化神通！', 'talk', '假死度化'),
        ],
      },
    ],
  },

  scene_slq42_09: {
    id: 'scene_slq42_09',
    title: '第九幕 · 假死度化',
    subtitle: '少林藏经阁 · 西厢晒经校勘石台',
    illustrationUrl: '/assets/quests/sl_42_convert_rivals.jpg',
    illustrationCaption: '西厢晒经石台 · 法空假死救活度化萧远山与慕容博皈依佛门，一袖轻拂震退狂傲的鸠摩智',
    mandatory: true,
    beats: [
      N('明月悬空，晒经石台上慕容博与萧远山依旧杀意狂炽正欲互搏！法空身形微晃，快得连萧峰与你都只见一道淡灰残影——“啪！啪！”两掌轻飘飘拍落二老百会天灵，两位绝顶高手瞬间气息全无、直挺挺倒卧石台！'),
      S('NPC-0101', '（迎着萧峰与慕容复失声惊呼，微笑合十不疾不徐）“二位公子莫急。老衲以禅劲暂闭二老心脉步入『龟息假死』，逼出经脉深处淤积三十年的七十二绝技戾气——待过这一死关，方知皇图血仇皆如过眼云烟。”'),
      N('法空双掌凌空虚按，两股温暖醇厚如春阳的《易筋经》无上真气缓缓渡入二老丹田！片刻后两缕黑气自头顶袅袅散尽，萧远山与慕容博竟同时长吸一口气悠悠睁眼！'),
      S('NPC-0104', '（经历生死大关、胸中三十年灼痛尽消，呆望双手忽而大笑涕零，重重叩首）“大燕早亡于数百年前，老夫竟为一场春梦害人害己一生！大师破我心魔，慕容博愿就此削发为僧，长伴青灯忏悔余生！”'),
      S('NPC-0105', '（三十年血海戾气烟消云散，亦并肩跪倒法空身前长叹）“峰儿已成顶天立地大英雄，老夫还有何求？仇既消、怨既解，萧远山亦愿皈依佛门，侍奉神僧左右！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_10', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_10: {
    id: 'scene_slq42_10',
    title: '第十幕 · 一袖拂魔',
    subtitle: '西厢晒经校勘石台 → 庭院月色',
    mandatory: true,
    beats: [
      S('NPC-0113', '（慕容复彻底崩溃嘶喊，鸠摩智见美梦落空恼羞成怒，骤催十成火焰刀悍然劈向法空）“老秃驴！休想坏小僧武道霸业！接我火焰刀！”'),
      N('法空淡淡摇头，灰布袍袖随手轻拂——“蓬！”如春风扫秋尘，火焰刀气瞬间倒卷震得吐蕃国师连退九步跌下石台、大红袈裟焦黑数片！法空温和劝其回蕃散去魔障，鸠摩智捂胸惊骇遁入夜色，慕容复亦失魂落魄踉跄离去。'),
      S('NPC-0110', '（眼眶微红，向神僧与生父深深叩首后起身向你重重抱拳）“多谢神僧救父解结，也多谢{ifFlagEq:sl_branch=layman|大居士|掌门}今夜力战慕容博护持大局！家父既皈依佛门，萧某再无牵挂，少林大恩永世铭记！”'),
      N('风云散尽，萧远山与慕容博随僧引往静室安歇落发，藏经阁重归寂静。秋风吹过千年古银杏，洒下一院金黄落叶。法空提着破旧竹帚转身望向月下的你，眼中满是慈和笑意：“今夜风大叶落，掌门可愿随老衲去古银杏扫叶庭，同扫几帚秋叶？”'),
    ],
    choices: [
      {
        id: 'slq42_to_sweeper_humble',
        label: '【合十随行 · 扫叶净心】躬身接过竹帚，愿随前辈于古杏树下同扫秋尘、体悟无上禅意',
        subLabel: '前往古银杏无名老僧扫叶庭',
        tone: 'jade',
        effects: [
          setStep(SHAOLIN_Q42_QUEST_ID, 'ginkgo_yijin_legacy'),
          toast('请前往【古银杏无名老僧扫叶庭】聆听扫地僧法空生涯总评与终极点化！', 'success', '古杏扫叶'),
        ],
      },
      {
        id: 'slq42_to_sweeper_inquire',
        label: '【躬身求道 · 问法千年】随行扫叶庭，诚请神僧点拨少林禅武该如何传续千年而不坠戾障',
        subLabel: '前往古银杏无名老僧扫叶庭',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q42_QUEST_ID, 'ginkgo_yijin_legacy'),
          toast('请前往【古银杏无名老僧扫叶庭】聆听扫地僧法空生涯总评与终极点化！', 'success', '古杏扫叶'),
        ],
      },
    ],
  },

  scene_slq42_11: {
    id: 'scene_slq42_11',
    title: '第十一幕 · 扫叶问心',
    subtitle: '少林藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('黎明破晓，第一缕金光穿过千年古银杏繁枝密叶洒满青砖小庭。法空缓缓挥动竹帚，一帚轻扫，落叶聚而不散，宛如蕴含天地至理；你亦接过另一把竹帚，与这位大宗师并肩清扫阶前金叶。'),
      S('NPC-0101', '（竹帚沙沙轻响，目光却如明镜般照透你入寺三载以来的每一段风雨路途）“自当年你初叩少室山门起，木桩廊苦修、三院历练、中原四海行道、直至今朝登掌少林、千僧血护祖庭、十五合硬撼慕容博——老衲在这古杏树下扫叶，其实一直在静静看着你。”'),
      N('漫天黄叶如金色蝶雨缓缓飘旋。法空终于停下手中竹帚，双手合十凝望你的双眸，即将为你整段少林生涯的善恶业报与终局之路，落下一句直击本心的神僧总评——'),
    ],
    onFinishEffects: [
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_zen_merit', op: 'gte', value: 15 },
        thenEffects: [openScene('scene_slq42_12a', SHAOLIN_Q42_QUEST_ID)],
        elseEffects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_karma_wrath', op: 'gte', value: 12 },
            thenEffects: [openScene('scene_slq42_12b', SHAOLIN_Q42_QUEST_ID)],
            elseEffects: [openScene('scene_slq42_12c', SHAOLIN_Q42_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_slq42_12a: {
    id: 'scene_slq42_12a',
    title: '第十二幕 · 禅心圆满',
    subtitle: '古银杏扫叶庭（扫地僧生涯总评 · 禅心慈悲）',
    mandatory: true,
    beats: [
      S('NPC-0101', '（眼中绽放出琉璃宝珠般清澈欢喜的光彩，深深合十赞叹）“善哉，善哉！老衲居此扫叶四十余载，见过无数惊才绝艳的武学奇才，却极少见到如你这般——手握绝世神功与无上权柄，一路行来却始终以悲悯化干戈、未染半点贪嗔戾气之人！”'),
      S('NPC-0101', '（笑意温和如春风拂过千年古杏）“{ifFlagEq:sl_ending=merciful_abbot|你身披达摩袈裟、以慈悲方丈承接千年衣钵，戒律为骨而慈悲为体，正合『佛光普照、慈航渡世』之无上正道！|}{ifFlagEq:sl_ending=iron_dharma_king|纵然你外披铁腕法王雷霆威严以镇乱世，老衲却看得清清楚楚——你铁骨深处自始至终留着一颗济世活民的菩萨悲心，实属难得！|}{ifFlagEq:sl_ending=vimalakirti_layman|你不剃发、不着缁衣，却以白衣维摩护持天下四寺苍生，心净即佛土净，这份胸襟气象已直追古德大菩萨！|}”'),
      P('（心中一热，如沐春阳，向法空深深躬身）“弟子一路行来时常自省，不敢有负佛前初心。蒙前辈印可，弟子惶恐而感恩。”'),
      N('金辉洒满庭中黄叶，法空微微笑着，将手伸入怀中，取出一卷沉寂五百载的祖师圣典。'),
    ],
    onFinishEffects: [openScene('scene_slq42_13', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_12b: {
    id: 'scene_slq42_12b',
    title: '第十二幕 · 怒目金刚',
    subtitle: '古银杏扫叶庭（扫地僧生涯总评 · 怒目杀业）',
    mandatory: true,
    beats: [
      S('NPC-0101', '（缓缓收起竹帚，目光深邃澄明如古井无波）“阿弥陀佛……观你三载少林之路，嫉恶如仇、杀伐决断，外破辽夏毒魔、内斩古刹蠹虫，确是五百年难得一见的护教怒目金刚！”'),
      S('NPC-0101', '（话锋微微一沉，字字叩击心门）“{ifFlagEq:sl_ending=iron_dharma_king|你登位铁腕法王，霹雳手段令天下群魔胆寒、救祖庭于内溃外侮，功勋盖世；|}{ifFlagEq:sl_ending=merciful_abbot|纵然你披上慈悲方丈袈裟，老衲仍见你眉宇间藏着一道不肯姑息的降魔雷火；|}{ifFlagEq:sl_ending=vimalakirti_layman|你以白衣大居士总摄四寺铁血兵马，锋芒所指外敌辟易，堪称一代人杰；|}只是老衲须提点一句：霹雳杀伐虽能震敌一时，若长久不以禅理照鉴，戾气最易反噬己心。今朝之后，愿你常念化刚为柔。”'),
      P('（心头巨震，想起方才萧慕二老受戾气折磨三十年的惨状，肃然合十重重稽首）“前辈当头棒喝如暮鼓晨钟，弟子铭刻肺腑，此后必常以禅心涤荡杀伐锋芒！”'),
      N('法空眼中浮起一丝欣慰淡笑，自怀中缓缓捧出那卷镇压少林五百年的祖师圣典。'),
    ],
    onFinishEffects: [openScene('scene_slq42_13', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_12c: {
    id: 'scene_slq42_12c',
    title: '第十二幕 · 刚柔相济',
    subtitle: '古银杏扫叶庭（扫地僧生涯总评 · 禅武持中）',
    mandatory: true,
    beats: [
      S('NPC-0101', '（微微含笑，一帚将满阶黄叶拢作一枚圆融光环）“阿弥陀佛……观你三载少林行迹，当慈悲处不吝宽仁，当雷霆处不避锋芒，进退合度、刚柔相济，未曾偏执一端。”'),
      S('NPC-0101', '（抬眸望向你，语声温厚悠远）“{ifFlagEq:sl_ending=merciful_abbot|你以慈悲方丈承接达摩衣钵，守正持中、宽严相得；|}{ifFlagEq:sl_ending=iron_dharma_king|你以铁腕法王肃整禅林，刚中带韧、威而不暴；|}{ifFlagEq:sl_ending=vimalakirti_layman|你以白衣大居士联结南北四寺，出世入世皆得自在；|}经义通达、笔墨蕴禅、侠骨仁心，如此心性，已堪承受祖师最后一番托付。”'),
      P('（合十恭立于金色叶雨之中，心境一片澄澈）“前辈谬赞，弟子唯有兢兢业业护持禅林正脉，方不负这三载光阴。”'),
      N('法空含笑颔首，自怀中缓缓取出那卷历经五百年沧桑的祖师圣典。'),
    ],
    onFinishEffects: [openScene('scene_slq42_13', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_13: {
    id: 'scene_slq42_13',
    title: '第十三幕 · 达摩终问',
    subtitle: '古银杏扫叶庭（终极传法 · 禅宗最高一问）',
    mandatory: true,
    beats: [
      N('法空自怀中捧出一卷暗金贝叶装帧、散发淡淡古檀清香的梵汉古卷——【《达摩易筋真经》梵夹本】，又自古银杏树洞石匣中取出一双轻若无物、织满古朴苇叶纹路的【达摩一苇渡江履】！'),
      S('NPC-0101', '（神色庄严如古佛临坛，手托梵夹真经，目如星海般静静凝望于你，问出全剧最后一问）“慕容博与萧远山在藏经阁偷阅经书三十年，却始终寻不到这卷镇寺圣典——非是藏得太深，而是无缘者见之亦不知其真义。”'),
      S('NPC-0101', '“老衲且问你最后一句：少林七十二绝技戾气日重，达摩祖师当年面壁九年留下这卷无上真经，究竟是教人天下无敌，还是教人什么？”'),
      N('满院银杏黄叶仿佛在这一刻静止半空。面对大宗师这直指禅武终极大道的最后一问，你沉心静气，缓缓作答——'),
    ],
    choices: [
      {
        id: 'slq42_answer_compassion',
        label: '“武功愈高，慈悲愈深；此经非为称霸江湖，乃为化去七十二绝技之杀戾，令禅武归于慈悲正道。”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q42_yijin_perfect', value: true },
          { type: 'setFlag', flag: 'sl_q42_answer', value: 'compassion' },
          openScene('scene_slq42_14', SHAOLIN_Q42_QUEST_ID),
        ],
      },
      {
        id: 'slq42_answer_guardian',
        label: '“乱世妖氛炽盛，祖师留经是为令后人修成护法伏魔之绝顶武力，镇定乱世方保苍生安宁。”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q42_yijin_perfect', value: false },
          { type: 'setFlag', flag: 'sl_q42_answer', value: 'guardian' },
          openScene('scene_slq42_14', SHAOLIN_Q42_QUEST_ID),
        ],
      },
      {
        id: 'slq42_answer_transcend',
        label: '“武道巅峰本就该脱胎换骨、超脱世俗樊篱，修成无上神功以独步天下、证道极境。”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q42_yijin_perfect', value: false },
          { type: 'setFlag', flag: 'sl_q42_answer', value: 'transcend' },
          openScene('scene_slq42_14', SHAOLIN_Q42_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq42_14: {
    id: 'scene_slq42_14',
    title: '第十四幕 · 古杏传经',
    subtitle: '古银杏无名老僧扫叶庭',
    illustrationUrl: '/assets/quests/sl_42_ginkgo_yijin.jpg',
    illustrationCaption: '古银杏扫叶庭 · 漫天黄叶纷飞中，扫地僧法空点化主角禅武苦修，亲传创派神功《易筋经》与天阶圣物',
    mandatory: true,
    beats: [
      S('NPC-0101', '{ifFlagEq:sl_q42_answer=compassion|（闻言骤然展颜，双掌合十，眼中清光如日月交辉，连声慨叹）“阿弥陀佛！『武功愈高，慈悲愈深』——一语直契达摩祖师面壁九年本怀！千年古刹，后继有人矣！”|}{ifFlagEq:sl_q42_answer=guardian|（微微颔首，旋即轻声点拨）“以武护法、镇世安民，乃菩萨行之一端，甚善；唯须切记，若只执着于力镇外魔而忘却化尽自身杀戾，便仍未臻圆融。日后修持，当以慈悲自照。”|}{ifFlagEq:sl_q42_answer=transcend|（听罢淡淡一笑，眉宇悲悯如慈父）“脱胎换骨、独步天下，固是世间武人毕生所求；然达摩祖师留经之真义，不在凌驾众生之上，而在化戾归慈、渡己渡人。愿你他日行功至深处，自会恍然悟透。”|}'),
      N('你在漫天飘洒的金色银杏叶雨之中肃然整衣，向法空行下弟子大礼！'),
      N('{ifFlagEq:sl_branch=layman|法空微笑伸掌轻按你的百会穴，一股醇厚清凉的《易筋经》无上真气游走奇经八脉，顷刻为你化去三载练武残留的丝丝燥气暗伤！随后法空轻声道：“大居士白衣护法功德无量，依达摩祖训《易筋经》梵夹本须留藏阁中传与出家禅脉，老衲特将这双【达摩一苇渡江履】赐予大居士，愿你踏波渡世、护佑苍生！”|法空枯瘦却温暖如春的手掌轻按你的百会穴，一股宏大醇厚的无上真气瞬间贯通全身奇经八脉！“今日老衲便将少林创派第一神功【易筋经】总纲口诀与行功脉络倾囊亲传于你——筋骨易髓，返璞归真，化刚猛为无形，融万物于慈悲！”}'),
      N('{ifFlagEq:sl_branch=layman|你闭目调息良久，再睁眼时神光内敛、清湛如渊，郑重捧起天阶圣物【达摩一苇渡江履】深深稽首谢恩！|轰然微鸣自你丹田响起！三载积攒的少林诸般高深内劲在《易筋经》牵引下百川归海，经脉流转起澄澈佛门金辉，隐隐触及大宗师之境！法空含笑将【《达摩易筋真经》梵夹本】与【达摩一苇渡江履】轻置你身前青石之上！}'),
    ],
    onFinishEffects: [openScene('scene_slq42_15', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_15: {
    id: 'scene_slq42_15',
    title: '第十五幕 · 易筋封神',
    subtitle: '嵩山少林寺 · 绝顶圆满',
    mandatory: true,
    beats: [
      N('一轮红日自嵩山太室峰东侧喷薄而出，万丈金光洒满大雄宝殿、罗汉堂、达摩洞与藏经阁！晨钟悠扬，满山千余僧俗弟子早课诵经之声如海潮回荡天地。'),
      N('你立于古银杏树下俯瞰云海翻腾的中原大地。回首三载嵩山少林路——自初叩山门的青衫行者，经木桩廊苦修、三院历练、四海护法、执掌古刹、千僧血战、藏经阁硬撼绝顶、终得扫地神僧印可传法……一步一脚印，终成一代禅武传奇！'),
      N('身后再度响起极轻极缓的竹帚扫叶声：“沙……沙……沙……”回头望去，扫地僧法空的背影依旧如初见时那般平凡宁静，仿佛昨夜震慑天下五大绝顶的惊天一幕，不过古银杏树下的一场清梦。'),
      N('{ifFlagEq:sl_branch=layman|【少林绝顶封神终章 · 古杏扫叶 · 易筋真经】至此功德圆满！扫地僧法空赞你白衣护法功德无量，特赐天阶圣物【达摩一苇渡江履】以彰大居士护教奇功，名垂北宋江湖青史！|【少林绝顶封神终章 · 古杏扫叶 · 易筋真经】至此功德圆满！扫地僧法空展卷口授并亲赐《达摩易筋真经》梵夹本，你亲承少林创派第一神功【易筋经】并获赐天阶圣物【达摩一苇渡江履】，名垂北宋江湖青史！}'),
    ],
    choices: [
      {
        id: 'slq42_complete',
        label: '拜谢扫地僧法空，承接《易筋经》、梵夹本真经与【达摩一苇渡江履】（绝顶封神）',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'teachMartialArt',
            artId: 'MA-001',
            level: 1,
            autoEquip: true,
            replaceArtIds: ['MA-011', 'MA-038', 'MA-100', 'MA-159'],
          },
          { type: 'giveItem', itemId: 'ITM-SCR-001', qty: 1 },
          { type: 'giveItem', itemId: 'BOT-003', qty: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q42_yijin_perfect', op: 'truthy' },
            thenEffects: [
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 3 },
              { type: 'modifyChivalry', delta: 80, reason: '古杏扫叶庭一语契合达摩祖师慈悲本怀，获扫地神僧盛赞' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0101' }, delta: 15 },
            ],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q42_answer', op: 'eq', value: 'guardian' },
                thenEffects: [
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                  { type: 'modifyRenown', delta: 50, reason: '誓以无上禅武护法安民，威名传颂天下' },
                ],
                elseEffects: [],
              },
            ],
          },
          {
            type: 'giveCombatExp',
            amount: 3000,
            reason: '琉璃藏经阁十五合硬撼慕容博，获扫地僧法空亲传《易筋经》绝顶封神',
          },
          {
            type: 'modifyRenown',
            delta: 600,
            reason: '少林绝顶封神，承接《易筋经》与达摩一苇渡江履，誉满天下武林',
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0101' }, delta: 30 },
          { type: 'completeQuest', questId: SHAOLIN_Q42_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成绝顶封神终章《古杏扫叶 · 易筋真经》！习得并运使创派神功【易筋经】，获天阶圣物【《达摩易筋真经》梵夹本】与【达摩一苇渡江履】，威望 +600，法空好感 +30！',
            'success',
            '易筋封神',
          ),
        ],
      },
      {
        id: 'slq42_complete_layman',
        label: '拜谢扫地僧法空，领受【达摩一苇渡江履】扬白衣护法威名（绝顶圆满）',
        subLabel: '俗家弟子依少林清规不授《易筋经》与梵夹真经，改获额外实战历练',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'eq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          { type: 'giveItem', itemId: 'BOT-003', qty: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q42_yijin_perfect', op: 'truthy' },
            thenEffects: [
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 3 },
              { type: 'modifyChivalry', delta: 80, reason: '古杏扫叶庭一语契合达摩祖师慈悲本怀，获扫地神僧盛赞' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0101' }, delta: 15 },
            ],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q42_answer', op: 'eq', value: 'guardian' },
                thenEffects: [
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                  { type: 'modifyRenown', delta: 50, reason: '誓以白衣护法镇定乱世，威名传颂天下' },
                ],
                elseEffects: [],
              },
            ],
          },
          {
            type: 'giveCombatExp',
            amount: 4000,
            reason: '琉璃藏经阁硬撼慕容博、以白衣大居士之身护持千年禅宗',
          },
          {
            type: 'modifyRenown',
            delta: 600,
            reason: '白衣大居士力保藏经阁，获扫地僧法空赐【达摩一苇渡江履】，誉满天下武林',
          },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0101' }, delta: 30 },
          { type: 'completeQuest', questId: SHAOLIN_Q42_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成绝顶终章《古杏扫叶 · 易筋真经》！（俗家不授《易筋经》）获天阶圣物【达摩一苇渡江履】，武学经验 +4000，威望 +600，法空好感 +30！',
            'success',
            '白衣封神',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_Q42_SCENES
