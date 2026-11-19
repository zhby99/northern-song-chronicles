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
      N('{reignYear}深秋，少室山千树银杏尽染金黄。距那场震动天下的少室山千僧血战已过去整整半载，嵩山表面重归晨钟暮鼓的宁静，然藏经阁高檐之上，却悄然凝聚着一股令人窒息的绝顶风暴。'),
      N('你入少林苦修已满二十三载，如今执掌千年祖庭。今夜你照例亲赴【重檐琉璃藏经主阁】巡查佛藏典籍，刚踏上二层楠木回廊，便骤然察觉到经架深处隐匿着数道如渊似海、绝非寻常武林人士的呼吸！'),
      P('（脚步微顿，宗师级神识如水银泻地般铺开，眸光瞬间沉凝）“好深厚的内息！阁中不止一人——阁楼梁上、经橱之后、西窗檐外，竟藏着数位当世绝顶人物！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_02', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_02: {
    id: 'scene_slq42_02',
    title: '第二幕 · 破窗龙吟',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('话音未落，琉璃主阁东窗猛然被一道刚猛无匹的掌风震开！一名身材伟岸的豪雄大步踏入阁中，紧追着前方一道如鬼魅般灰袍飘飞的魁梧老者——正是【萧峰】与他的生父【萧远山】！'),
      S('NPC-0110', '（见你也在阁中，先是一怔，随即沉声急呼）“{ifFlag:sl_branch==layman|大居士|掌门}小心！当年雁门关害死我娘亲、陷害我父子三十年的幕后真凶，就藏在这藏经阁里！”'),
      S('NPC-0105', '（萧远山白发飞扬，双目如血，冷冷扫向经架阴影深处）“鼠辈！你装死躲在少林藏经阁偷学七十二绝技整整三十年，今日老夫父子寻上门来，你还不滚出来受死？！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_03', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_03: {
    id: 'scene_slq42_03',
    title: '第三幕 · 燕影现形',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('经架后方传来一声悠长而傲慢的冷笑！一名身着灰布宽袍、容貌儒雅却眉宇深藏枭雄戾气的灰衣老者缓缓步出阴影，身侧更立着一位玉树临风却脸色发白的锦衣公子——姑苏慕容氏假死三十年的老家主【慕容博】，与「南慕容」【慕容复】！'),
      S('NPC-0104', '（负手轻笑，气度渊停岳峙，丝毫不把满阁杀气放在眼中）“哈哈哈！萧老英雄好眼力，三十年来你我同在这藏经阁中翻阅七十二绝技，暗中交手三次，今日总算不必再遮遮掩掩了！”'),
      S('NPC-0120', '（慕容复神色震动，护在父亲身侧低声道）“爹，少林掌门与萧峰俱在此地，情势于我父子不利……”'),
    ],
    onFinishEffects: [openScene('scene_slq42_04', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_04: {
    id: 'scene_slq42_04',
    title: '第四幕 · 明王踏阁',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('“阿弥陀佛——！这等群雄盛会，怎少得了小僧吐蕃大轮明王！”'),
      N('又是一声浑厚炽热的佛号震响阁楼！一袭大红镶金吐蕃袈裟猎猎卷入西窗，面容宝相庄严却眼含狂傲火焰的【鸠摩智】凌空落于雕花栏杆之上，火焰刀灼热气浪瞬间将阁内佛灯压得明灭不定！'),
      S('NPC-0113', '（合十冷笑，目光贪婪地扫过满阁经橱）“慕容老施主当年曾赠小僧七十二绝技抄本，今日小僧特来助慕容氏父子一臂之力——顺便领教领教少林新任掌门的绝世神功！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_05', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_05: {
    id: 'scene_slq42_05',
    title: '第五幕 · 绝顶聚首',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('萧远山、慕容博、萧峰、慕容复、鸠摩智——当今大宋、大辽、吐蕃武林最负盛名的五大绝顶高手，竟在同一时刻齐聚于少林藏经阁这一方斗室之内！'),
      P('（稳立佛藏正中，衣袍无风自动，面色平静如水）“藏经阁乃达摩祖师传法圣地，容不得尔等私怨血染经卷！既然今日三十年旧账皆聚于此，便在此做个了断罢！”'),
    ],
    choices: [
      {
        id: 'slq42_accept',
        label: '稳坐藏经主阁，直面五大绝顶高手与三十年雁门旧案！',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q42_QUEST_ID, stepId: 'pavilion_intrusion' },
          setStep(SHAOLIN_Q42_QUEST_ID, 'pavilion_intrusion'),
          toast('已开启绝顶封神终章《古杏扫叶 · 易筋真经》！五大绝顶齐聚琉璃藏经阁！', 'talk', '易筋真经'),
        ],
      },
    ],
  },

  scene_slq42_06: {
    id: 'scene_slq42_06',
    title: '第六幕 · 五强对峙',
    subtitle: '重檐琉璃藏经主阁',
    illustrationUrl: '/assets/quests/sl_42_pavilion_standoff.jpg',
    illustrationCaption: '琉璃藏经主阁 · 萧远山、慕容博、萧峰、慕容复、鸠摩智五大绝顶高手齐聚，三十年恩怨总决算',
    mandatory: true,
    beats: [
      N('刹那间，六股宗师级以上的磅礴真气在琉璃主阁内轰然激荡！梁柱发出不堪重负的吱呀轻响，架上数百年古籍的黄绫封皮无风翻飞！'),
      S('NPC-0110', '（双目如炬逼视慕容博，声音沉痛而震怒）“慕容博！三十年前，你为挑起宋辽大战、趁乱光复你大燕旧梦，竟向中原武林假传消息，谎称我契丹武士要来盗取少林武学，害得中原群豪于雁门关伏杀我无辜双亲！此事你可敢认？！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_07', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_07: {
    id: 'scene_slq42_07',
    title: '第七幕 · 枭雄狂言',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      S('NPC-0104', '（闻言竟毫发无愧，反而仰天长笑，傲气冲霄）“认！有何不敢认！大丈夫生于乱世，当以天下为棋盘、众生为棋子！区区一对契丹夫妇与几十名中原武夫的性命，若能换我大燕复国大业，死得其所！可惜当年大宋仁宗与辽帝竟议和息兵，坏了老夫一番苦心！”'),
      S('NPC-0105', '（怒极反笑，全身杀气如实质黑焰暴涨）“好一个『死得其所』！我儿峰儿一生忠义两全，却因你这奸贼一句话，家破人亡、半生漂泊！今日老夫纵使拼掉这条老命，也要将你慕容父子碎尸万段！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_08', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_08: {
    id: 'scene_slq42_08',
    title: '第八幕 · 佛理斥枭',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      P('（眸中寒光乍现，声音清越如暮鼓晨钟，震碎阁中满室戾气）“慕容博！你口口声声大燕复兴，实则一己私欲薰心！为求一姓皇图，竟忍心令宋辽边境生灵涂炭、白骨盈野！你潜伏我少林藏经阁三十年，遍览三藏佛经与七十二绝技，却连佛门第一句『众生平等、戒杀护生』都未曾读进心里！”'),
      S('NPC-0104', '（笑容骤冷，阴鸷的目光如毒蛇般锁定在你身上）“哦？好利的一张嘴！你便是新近威震中原、击退赫连铁树的少林掌门？老夫本不欲与你这后辈计较，既然你如此不知死活，便先拿你试试我姑苏慕容的《参合指》！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_09', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_09: {
    id: 'scene_slq42_09',
    title: '第九幕 · 暗算生变',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('就在慕容博抬指欲发之际，鸠摩智忽然抢先一记火焰刀炽浪横扫萧远山与萧峰，慕容复亦拔剑直扑萧峰侧翼，瞬间将萧氏父子暂且牵制在阁楼东侧！'),
      S('NPC-0113', '（朗声大笑）“慕容老施主，萧氏父子便交由小僧与令郎暂且招呼！您只管先拿下这少林掌门，夺了藏经阁镇阁秘籍再说！”'),
      S('NPC-0110', '（挥降龙掌逼退慕容复，焦急大喝）“{ifFlag:sl_branch==layman|大居士|掌门}小心！慕容博的修为深不可测，绝不在老父与我之下！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_10', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_10: {
    id: 'scene_slq42_10',
    title: '第十幕 · 参合惊空',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('慕容博灰袍无风鼓荡，宗师上品巅峰的恐怖气机如九天银河倾泻而下！他右手食指微屈轻弹，一道凝若无形、却锋利得足以洞穿精铁的绝世指风破空激射而来——正是姑苏慕容失传百年的绝学【参合指】！'),
      P('（双足稳如嵩岳，体内二十三载少林至阳内功滚滚沸腾，不退反进迎指而出）“来得好！二十三载禅武苦修，今日便拿你慕容博试我武道极境！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_11', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_11: {
    id: 'scene_slq42_11',
    title: '第十一幕 · 斗转星移',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('“嗤——轰！”你的佛门重掌堪堪震碎慕容博第一道参合指风，却忽觉掌力如泥牛入海，竟被一股阴柔玄妙、宛如星河漩涡般的奇异劲力凭空牵引倒卷而回——正是天下闻名的【斗转星移】！'),
      S('NPC-0104', '（傲然冷笑）“以彼之道，还施彼身！小辈，老夫倒要看看，你在老夫手下撑不撑得过十五合！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_12', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_12: {
    id: 'scene_slq42_12',
    title: '第十二幕 · 禅武印心',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('电光火石间，你强提一口真气卸开倒卷掌劲，心中反而一片空明！二十三年来，自木桩廊初学罗汉拳，到三院磨砺、天下历练、千僧血战，所有的武学招式与禅理经义在这一刻尽数融会贯通！'),
      P('（长啸一声，声震琉璃瓦檐）“区区斗转星移，移得了我外家招式，移得了我佛门浩然正气么？！接招——！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_13', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_13: {
    id: 'scene_slq42_13',
    title: '第十三幕 · 阁内血斗',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('东侧萧远山、萧峰与鸠摩智、慕容复已打得天昏地暗，而主阁中央，你与慕容博这对相差三十载修为的绝顶强者，也正式展开撼天动地的十五合巅峰对决！'),
    ],
    onFinishEffects: [openScene('scene_slq42_14', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_14: {
    id: 'scene_slq42_14',
    title: '第十四幕 · 迎战枭雄',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('气浪翻涌，经架摇曳！慕容博参合指连环点出，斗转星移蓄势待发！'),
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

  scene_slq42_15: {
    id: 'scene_slq42_15',
    title: '第十五幕 · 十五合硬撼',
    subtitle: '重檐琉璃藏经主阁（宗师巅峰硬仗）',
    illustrationUrl: '/assets/quests/sl_42_murongbo_clash.jpg',
    illustrationCaption: '琉璃藏经主阁 · 主角以二十三载禅武修为十五合硬撼慕容博参合指与斗转星移',
    mandatory: true,
    beats: [
      S('NPC-0104', '（灰袖翻飞，指风纵横交错如天罗地网）“好个少林掌门！接老夫这记十成功力的参合神指！”'),
      N('只要在慕容博的狂攻下撑满十五回合不倒（或正面将其击败），便足以震慑这位潜伏三十年的绝顶枭雄！'),
    ],
    choices: [
      {
        id: 'slq42_fight_murongbo',
        label: '十五合硬撼【慕容博】参合指与斗转星移！（宗师巅峰硬仗）',
        subLabel: '撑满 15 合不倒或提前击败对手即获胜',
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
            onWin: [openScene('scene_slq42_16', SHAOLIN_Q42_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 90, mpPct: 90 },
              toast('慕容博参合指与斗转星移玄妙无双，稳住佛门真气重振架势再战！', 'warn', '十五合战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq42_16: {
    id: 'scene_slq42_16',
    title: '第十六幕 · 枭雄动容',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('十五合转瞬而过！琉璃主阁的楠木地板已被二人激荡的劲气犁出数十道深沟！'),
      N('第十五合终了，你以佛门无上狮子吼震散慕容博斗转星移的借力气旋，一掌与他的参合指正面硬撼！“轰”的一声巨响，气浪炸碎数扇琉璃花窗，慕容博竟被你震得倒退三步，宽袖寸寸裂开！'),
      S('NPC-0104', '（脸色微变，眼中首次浮现深深的忌惮与惊骇）“了不得……当真了不得！老夫苦修五十载、偷阅少林七十二绝技三十年，竟在十五合内拿不下一个后起之秀！少林若留你成长下去，我大燕复国必成泡影！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_17', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_17: {
    id: 'scene_slq42_17',
    title: '第十七幕 · 血仇失控',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('恰在此时，东侧战局亦至白热化！萧远山与萧峰父子联手发威，萧峰一记【见龙在田】将慕容复震得吐血倒飞，萧远山趁势摆脱鸠摩智的火焰刀，如疯虎般直扑慕容博而来！'),
      S('NPC-0105', '（双掌灌满三十年血海深仇，暴喝震瓦）“慕容博！纳命来——！”'),
      S('NPC-0110', '（见慕容博竟抬掌反击自己与生父，亦怒催十二成功力降龙掌轰然拍出）“慕容博，还我娘亲命来！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_18', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_18: {
    id: 'scene_slq42_18',
    title: '第十八幕 · 玉石俱焚',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('萧峰的绝世降龙掌、萧远山的暴烈黑风掌、慕容博的十成参合指、鸠摩智暗中偷袭的火焰刀——四股足以移山填海的宗师绝顶杀招，眼看便要在狭小的藏经阁中轰然对撞！'),
      N('这一击若是撞实，莫说阁中数人非死即残，便是整座存放着大宋五百年佛门典籍的琉璃藏经阁，也必将在瞬间化作一片飞灰！'),
    ],
    onFinishEffects: [openScene('scene_slq42_19', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_19: {
    id: 'scene_slq42_19',
    title: '第十九幕 · 竹帚轻响',
    subtitle: '重檐琉璃藏经主阁 · 门廊之外',
    mandatory: true,
    beats: [
      N('就在这千钧一发、连你也准备拼死出手阻拦的刹那——'),
      N('阁门之外，忽然传来一阵极轻、极缓、却奇异地压过所有掌风怒吼的竹帚扫地声。'),
      N('“沙……沙……沙……”'),
      N('一名身着洗得发白的灰布旧僧衣、形容枯槁、手里提着一把破旧竹帚的老僧，竟仿佛完全看不见漫天翻滚的绝世杀气，慢悠悠地迈步跨进了藏经阁门槛。'),
    ],
    onFinishEffects: [openScene('scene_slq42_20', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_20: {
    id: 'scene_slq42_20',
    title: '第二十幕 · 扫地老僧',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      S('NPC-0101', '（法空缓缓抬眼，声音平淡温和，宛如秋日午后的一缕暖风）“阿弥陀佛。几位施主在藏经阁中动手，莫要碰坏了架上的《法华经》与《杂阿含经》。”'),
      P('（心中剧震，随即涌起无尽敬畏，低声合十）“法空前辈！”'),
      N('然而杀红了眼的萧远山、萧峰、慕容博三人的掌力已如箭在弦上，根本收之不及！'),
    ],
    onFinishEffects: [openScene('scene_slq42_21', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_21: {
    id: 'scene_slq42_21',
    title: '第二十一幕 · 势不可收',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      S('NPC-0110', '（见那毫不起眼的灰衣老僧竟直直走进掌风中央，骇然大呼）“老大师快闪开！我的降龙掌收不住了！”'),
      S('NPC-0104', '（慕容博眼中闪过一丝狠辣）“哼，不知死活的扫地老秃驴，敢挡老夫参合指，自己找死！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_22', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_22: {
    id: 'scene_slq42_22',
    title: '第二十二幕 · 一念化干戈',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('两道当今武林最顶峰的霸道杀招——降龙十八掌与参合指——几乎同时轰向扫地僧法空身前三尺！'),
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

  scene_slq42_23: {
    id: 'scene_slq42_23',
    title: '第二十三幕 · 三尺气墙',
    subtitle: '重檐琉璃藏经主阁',
    illustrationUrl: '/assets/quests/sl_42_three_foot_wall.jpg',
    illustrationCaption: '琉璃藏经主阁 · 扫地僧法空缓步合十，三尺无形气墙轻描淡写挡下萧峰降龙掌与慕容博参合指',
    mandatory: true,
    beats: [
      N('不可思议的一幕发生了！'),
      N('扫地僧法空连手中竹帚都未曾放下，只是微微合十垂目。就在降龙掌风与参合指劲迫近他身前三尺之际，空气中仿佛凭空凝起一堵浩瀚无边、浑圆如意的【三尺无形气墙】！'),
      N('两道足以开碑裂石的宗师绝顶劲力撞入那三尺气墙，竟如泥牛入海、春雪遇阳，连一丝涟漪都未曾激起，便被化得干干净净，连法空垂落肩头的半缕白眉都不曾吹动半分！'),
    ],
    onFinishEffects: [openScene('scene_slq42_24', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_24: {
    id: 'scene_slq42_24',
    title: '第二十四幕 · 满阁震骇',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('整个藏经阁瞬间死寂！萧远山呆立原地，慕容博瞳孔骤缩如针，连一向目空一切的鸠摩智也骇得倒退半步，失声低呼：“无……无形气墙？！大宗师之境？！”'),
      S('NPC-0110', '（收掌肃然躬身，满脸震撼与敬服）“晚辈萧峰有眼不识泰山，竟不知少林藏经阁中卧着如此当世活佛、绝顶神僧！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_25', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_25: {
    id: 'scene_slq42_25',
    title: '第二十五幕 · 点破隐疾',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      S('NPC-0101', '（法空目光悲悯地依次扫过萧远山、慕容博与鸠摩智，娓娓道来）“阿弥陀佛。本寺七十二绝技，每一项皆以慈悲佛法为化解戾气之本。佛法越深，戾气越消；若无佛法相济，强练一门便多一分走火入魔之祸。”'),
      S('NPC-0101', '“萧居士三十年前偷学《无相劫指》与《大金刚拳》，如今每日午后是不是胸口冰寒刺骨？慕容居士偷学《摩诃指》与《般若掌》，近来子夜是不是双颊灼热如火？至于吐蕃明王……你以道家小无相功强催少林七十二绝技，岂不知早已被戾气侵蚀心脉，危在旦夕！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_26', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_26: {
    id: 'scene_slq42_26',
    title: '第二十六幕 · 戾气暗发',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      S('NPC-0105', '（萧远山浑身剧震，失声道）“你……你怎么知道我午后胸口奇寒？！”'),
      S('NPC-0104', '（慕容博亦脸色苍白如纸）“老夫子夜双颊如焚，连复儿都未曾告知，老僧何以一语道破？！”'),
      S('NPC-0113', '（鸠摩智强作镇定，冷哼一声，暗中却悄悄凝聚一记无形控鹤火焰刀气偷袭法空背心）“哼！危言耸听！装神弄鬼！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_27', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_27: {
    id: 'scene_slq42_27',
    title: '第二十七幕 · 佛法慈悲',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('鸠摩智那道阴毒偷袭的火焰刀气刚触及法空身后三尺，便如石沉大海般消弭无踪！法空甚至连头都未曾回，只是轻轻叹息一声。'),
      S('NPC-0101', '（望向执迷不悟、仍彼此怒目而视的萧远山与慕容博）“冤冤相报何时了？三十年前雁门关一念恶因，换来三十年父子分离、满手血腥。两位居士此刻内伤已深入膏肓，若再不放下屠刀与执念，不出三日便要毒火攻心而亡。”'),
    ],
    onFinishEffects: [openScene('scene_slq42_28', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_28: {
    id: 'scene_slq42_28',
    title: '第二十八幕 · 执念难消',
    subtitle: '重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      S('NPC-0104', '（慕容博咬牙惨笑）“要老夫放下大燕复国之志？宁死不从！”'),
      S('NPC-0105', '（萧远山怒吼）“血海深仇未报，老夫宁可毒发身亡，也要拉慕容博垫背！”'),
      S('NPC-0101', '（法空深深一叹，神色骤然肃穆如古佛降魔）“既如此，不破生死之关，难悟红尘皆空。请二位随老衲移步西厢晒经石台罢。”'),
    ],
    onFinishEffects: [openScene('scene_slq42_29', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_29: {
    id: 'scene_slq42_29',
    title: '第二十九幕 · 移步石台',
    subtitle: '藏经阁 · 西厢廊道',
    mandatory: true,
    beats: [
      N('法空话音刚落，只见他枯瘦的双手凌空虚拂，萧远山与慕容博竟如身不由己般随其步履飘出主阁，落向西厢开阔的晒经校勘石台！你与萧峰、慕容复、鸠摩智亦紧随其后掠出阁外。'),
    ],
    onFinishEffects: [openScene('scene_slq42_30', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_30: {
    id: 'scene_slq42_30',
    title: '第三十幕 · 晒经石台',
    subtitle: '西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('秋风猎猎，明月悬空。西厢晒经石台之上，一场超越武林争斗、直指生死本心的无上佛门度化即将展开！'),
    ],
    choices: [
      {
        id: 'slq42_to_convert',
        label: '赴【西厢晒经校勘石台】，见证法空度化萧慕二老、拂退鸠摩智',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q42_QUEST_ID, 'convert_and_repel'),
          toast('请前往【西厢晒经校勘石台】见证扫地僧法空无上度化神通！', 'talk', '假死度化'),
        ],
      },
    ],
  },

  scene_slq42_31: {
    id: 'scene_slq42_31',
    title: '第三十一幕 · 生死一掌',
    subtitle: '少林藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('晒经石台之上，慕容博与萧远山依旧杀意不减，正欲再度扑杀彼此！法空忽然身形一晃，快得连萧峰与你都只见一道淡灰残影——'),
      N('“啪！啪！”两声极轻极柔的拍击！法空左右双掌竟分别轻飘飘拍在慕容博与萧远山的百会天灵之上！'),
      N('两位威震天下的绝顶高手瞬间身躯一僵，双目缓缓闭上，呼吸脉搏霎时全无，直挺挺倒在石台之上！'),
    ],
    onFinishEffects: [openScene('scene_slq42_32', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_32: {
    id: 'scene_slq42_32',
    title: '第三十二幕 · 假死顿悟',
    subtitle: '西厢晒经校勘石台',
    mandatory: true,
    beats: [
      S('NPC-0110', '（萧峰与慕容复齐齐失声惊呼，扑至父亲身前）“爹——！大师为何杀我父亲？！”'),
      S('NPC-0101', '（法空合十微笑，不疾不徐）“二位公子莫急。老衲只是以无上禅劲暂闭二老心脉、令其步入『龟息假死』之境，借此逼出二人经脉深处淤积三十年的七十二绝技戾气——待过这一死关，方知皇图霸业、血海深仇，皆如过眼云烟。”'),
      N('言罢，法空双掌凌空虚按，两股温暖醇厚如春阳的《易筋经》无上真气缓缓渡入萧远山与慕容博丹田！片刻之后，两股黑气自二老头顶袅袅散出，萧远山与慕容博竟同时长吸一口气，悠悠睁开了双眼！'),
    ],
    onFinishEffects: [openScene('scene_slq42_33', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_33: {
    id: 'scene_slq42_33',
    title: '第三十三幕 · 度化归佛',
    subtitle: '西厢晒经校勘石台',
    illustrationUrl: '/assets/quests/sl_42_convert_rivals.jpg',
    illustrationCaption: '西厢晒经石台 · 法空假死救活度化萧远山与慕容博皈依佛门，一袖轻拂震退狂傲的鸠摩智',
    mandatory: true,
    beats: [
      N('经历过那短短一炷香的「生死大关」，胸中纠缠三十年的冰寒与灼痛竟奇迹般烟消云散！慕容博呆呆望着自己的双手，又望向身旁的萧远山，忽然放声大笑，笑声中满是苍凉与彻悟，随即泪流满面！'),
      S('NPC-0104', '（缓缓起身，面向法空重重叩首）“大燕……大燕早已亡于数百年之前，老夫竟为一场虚幻春梦，害人害己整整一生！大师救我性命、破我心魔，慕容博愿就此削发为僧，长伴青灯古佛，忏悔余生罪孽！”'),
      S('NPC-0105', '（萧远山亦闭目长叹，三十年血海戾气尽化虚无，并肩跪倒在法空面前）“峰儿已成长为顶天立地的大英雄，老夫还有何求？仇既已消，怨既已解，萧远山亦愿皈依佛门，侍奉神僧左右！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_34', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_34: {
    id: 'scene_slq42_34',
    title: '第三十四幕 · 一袖拂魔',
    subtitle: '西厢晒经校勘石台',
    mandatory: true,
    beats: [
      S('NPC-0120', '（慕容复彻底崩溃，跪地嘶喊）“爹！复国大业怎能说弃就弃啊……”'),
      S('NPC-0113', '（鸠摩智眼见慕容博竟要出家、自己图谋少林武学的美梦落空，恼羞成怒，骤然催动全身火焰刀十成功力悍然劈向法空）“老秃驴！你度化他们便罢，休想坏小僧武道霸业！接我火焰刀！”'),
      N('面对鸠摩智这足以裂开山石的绝命一刀，法空只是淡淡摇头，灰布袍袖随手轻轻一拂！'),
      N('“蓬！”宛如春风拂落秋尘！鸠摩智狂猛无匹的火焰刀气瞬间倒卷而回，震得这位吐蕃国师闷哼一声、连退九步跌下石台，大红袈裟焦黑数片，惊骇得魂飞魄散！'),
    ],
    onFinishEffects: [openScene('scene_slq42_35', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_35: {
    id: 'scene_slq42_35',
    title: '第三十五幕 · 国师惊遁',
    subtitle: '西厢晒经校勘石台',
    mandatory: true,
    beats: [
      S('NPC-0101', '（法空温和告诫）“大轮明王，你强练少林七十二绝技，戾气已结于丹田。今日老衲留你一命，速回吐蕃参悟佛经、散去魔障，莫待日后走火入魔方才追悔莫及。”'),
      S('NPC-0113', '（鸠摩智捂着剧痛翻涌的胸口，望向深不可测的法空，再也不敢多留半刻，狼狈合十纵身遁入夜色）“少林……果真藏龙卧虎！小僧告辞！”'),
      N('慕容复亦失魂落魄地望了父亲最后一眼，踉跄转身离去。'),
    ],
    onFinishEffects: [openScene('scene_slq42_36', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_36: {
    id: 'scene_slq42_36',
    title: '第三十六幕 · 父子释怀',
    subtitle: '西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('一场震动天下三十年的滔天血案，竟在法空谈笑挥袖之间，化作两声清越的皈依佛号！'),
      S('NPC-0110', '（萧峰眼眶微红，向法空与生父萧远山深深叩首，复起身向你重重抱拳）“多谢神僧慈悲，救我生父性命、解我父子三十年心结！也多谢{ifFlag:sl_branch==layman|大居士|掌门}今夜力战慕容博、护持大局！如今家父既已皈依清净佛门，萧某再无牵挂，日后纵横天下，必永记少林大恩！”'),
      P('（含笑回礼）“阿弥陀佛。萧大侠珍重，少室山门永远是你归家之处。”'),
    ],
    onFinishEffects: [openScene('scene_slq42_37', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_37: {
    id: 'scene_slq42_37',
    title: '第三十七幕 · 独留古庭',
    subtitle: '少林藏经阁 · 庭院月色',
    mandatory: true,
    beats: [
      N('萧峰拜别而去，萧远山与慕容博亦已由法空引至偏院静室安歇落发。转眼之间，喧嚣惊心动魄的藏经阁重归寂静，唯有深秋寒风吹过那株千年古银杏，洒下一院细碎的金黄落叶。'),
      S('NPC-0101', '（法空提着那把破旧竹帚，转身望向静立月下的你，眼中满是慈和笑意）“今夜风大，古杏叶落了一地。掌门若不嫌劳累，可愿随老衲去【古银杏无名老僧扫叶庭】走走，陪老衲扫几帚秋叶？”'),
    ],
    onFinishEffects: [openScene('scene_slq42_38', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_38: {
    id: 'scene_slq42_38',
    title: '第三十八幕 · 步入扫叶庭',
    subtitle: '古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('你心中豁然澄澈，合十躬身随法空步入古银杏树下。漫天黄叶如金色蝶群般在晨曦微光中缓缓飘落。'),
    ],
    choices: [
      {
        id: 'slq42_to_sweeper',
        label: '步入【古银杏无名老僧扫叶庭】，聆听法空点化终极禅武大道',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q42_QUEST_ID, 'ginkgo_yijin_legacy'),
          toast('请前往【古银杏无名老僧扫叶庭】聆听扫地僧法空点化！', 'success', '古杏扫叶'),
        ],
      },
    ],
  },

  scene_slq42_39: {
    id: 'scene_slq42_39',
    title: '第三十九幕 · 扫叶论道',
    subtitle: '少林藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('黎明破晓，第一缕金光穿过千年古银杏的繁枝密叶，洒满青砖小庭。法空缓缓挥动竹帚，一帚轻扫，落叶聚而不散，宛如蕴含着天地至理。'),
      S('NPC-0101', '（轻声问道）“你入少林二十三载，自初进山门至今，执掌大局、血护少室、十五合硬撼慕容博而不落丝毫下风——此刻回望这二十三年，你觉着武学极致究竟在何处？”'),
      P('（接过一旁另一把竹帚，随法空一同轻扫阶前黄叶，沉吟片刻答道）“初入山门时，以为武学极致在拳重刀利、克敌制胜；执掌少林后，方知武学极致在护持众生、止戈为武；而今夜见前辈一掌化仇、一袖止杀，弟子始悟——武学极致不在伤人，而在照见本心、脱胎换骨、渡己渡人。”'),
    ],
    onFinishEffects: [openScene('scene_slq42_40', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_40: {
    id: 'scene_slq42_40',
    title: '第四十幕 · 禅武合一',
    subtitle: '古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      S('NPC-0101', '（停下竹帚，眼中绽放出宛如琉璃宝珠般清澈欢喜的光彩）“善哉！善哉！二十三载苦修，经义通达、笔墨蕴禅、侠骨仁心，更难得你在执掌无上权柄之后，心中依旧没有沾染半点贪嗔痴戾气！”'),
      S('NPC-0101', '“慕容博与萧远山在藏经阁偷阅经书三十年，却始终寻不到那卷真正镇压少林五百年的创派神功——非是藏得太深，而是唯有佛法、心性与武道俱至圆满之人，方才配得上它。”'),
    ],
    onFinishEffects: [openScene('scene_slq42_41', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_41: {
    id: 'scene_slq42_41',
    title: '第四十一幕 · 达摩真传',
    subtitle: '古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('法空自怀中缓缓取出一卷以暗金贝叶装帧、散发着淡淡古檀清香的梵汉双语真经古卷，又自古银杏树洞石匣中捧出一双轻若无物、织满古朴苇叶纹路的云履！'),
      S('NPC-0101', '（声音庄严而慈和）“此卷乃是达摩祖师面壁九年所留之镇寺圣典——【《达摩易筋真经》梵夹本】，其内所载正是少林创派第一无上神功【易筋经】！而这双【达摩一苇渡江履】，则是祖师当年渡江北上留下的天阶圣物。”'),
    ],
    onFinishEffects: [openScene('scene_slq42_42', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_42: {
    id: 'scene_slq42_42',
    title: '第四十二幕 · 古杏传经',
    subtitle: '古银杏无名老僧扫叶庭',
    illustrationUrl: '/assets/quests/sl_42_ginkgo_yijin.jpg',
    illustrationCaption: '古银杏扫叶庭 · 漫天黄叶纷飞中，扫地僧法空点化主角二十三载禅武苦修，亲传创派神功《易筋经》与天阶双圣物',
    mandatory: true,
    beats: [
      N('你心神震撼，肃然整衣，在漫天飘洒的金色银杏叶雨之中向法空行下弟子大礼！'),
      S('NPC-0101', '（伸出枯瘦却温暖如春的手掌轻轻按于你的百会穴，一股宏大无边、醇厚清凉的无上真气瞬间贯通你全身奇经八脉）“老衲今日便将《易筋经》总纲口诀与行功脉络亲传于你——筋骨易髓，返璞归真，化刚猛为无形，融万物于慈悲！”'),
      N('轰然一声微鸣自你丹田深处响起！二十三载积攒的少林七十二绝技与诸般高深内劲，在《易筋经》无上心法牵引下瞬间百川归海，经脉之中隐隐流转起一层澄澈无垢的佛门金辉！'),
    ],
    onFinishEffects: [openScene('scene_slq42_43', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_43: {
    id: 'scene_slq42_43',
    title: '第四十三幕 · 洗髓脱胎',
    subtitle: '古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('你闭目盘坐于古银杏落叶之上，耳边唯闻微风拂叶、晨鸟清鸣，天地万物之呼吸仿佛与自身丹田彻底融为一体！'),
      N('昔日强运刚猛绝学时潜藏于经脉深处的一丝细微暗伤与燥气，在《易筋经》温润沛然的真气冲刷下尽数消融，周身气机圆融无瑕，隐隐已触及那传说中的大宗师之境！'),
    ],
    onFinishEffects: [openScene('scene_slq42_44', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_44: {
    id: 'scene_slq42_44',
    title: '第四十四幕 · 双圣托付',
    subtitle: '古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('良久，你缓缓睁开双眼，瞳孔之中神光内敛、清湛如渊。法空已将【《达摩易筋真经》梵夹本】与【达摩一苇渡江履】轻轻放在你面前的青石之上。'),
      S('NPC-0101', '（含笑颔首）“神功已入你心，圣物亦得其主。老衲这把老骨头，往后仍在这古杏树下扫扫落叶、看看落花，其余天下苍生与禅宗千年法脉，便尽数看你了。”'),
      P('（郑重捧起天阶双圣物，向法空深深稽首）“前辈再造传法之恩，弟子永世不敢忘怀！”'),
    ],
    onFinishEffects: [openScene('scene_slq42_45', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_45: {
    id: 'scene_slq42_45',
    title: '第四十五幕 · 朝阳照岳',
    subtitle: '嵩山少林寺 · 藏经阁前',
    mandatory: true,
    beats: [
      N('一轮红日自嵩山太室峰东侧喷薄而出，万丈金光瞬间洒满整座少林古刹！大雄宝殿、罗汉堂、达摩洞、藏经阁尽数沐浴在庄严澄明的晨光之中。'),
      N('晨钟悠扬响起，满山千余名僧俗弟子早课诵经之声如海潮般回荡天地之间。'),
    ],
    onFinishEffects: [openScene('scene_slq42_46', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_46: {
    id: 'scene_slq42_46',
    title: '第四十六幕 · 二十三载',
    subtitle: '古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('你独自立于古银杏树下，俯瞰云海翻腾的中原大地。'),
      N('回首二十三载江湖路——从当年初叩少室山门的青衫行者，到木桩廊苦修、三院历练、四海护法，再到执掌少林、千僧血战破敌、藏经阁硬撼绝顶、终得扫地神僧亲传《易筋经》……一步一脚印，终成一代禅武大宗师传奇！'),
    ],
    onFinishEffects: [openScene('scene_slq42_47', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_47: {
    id: 'scene_slq42_47',
    title: '第四十七幕 · 扫叶无声',
    subtitle: '古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('身后再度响起极轻的竹帚扫叶声：“沙……沙……沙……”'),
      N('你回头望去，扫地僧法空的背影依旧如初见时那般平凡而宁静，仿佛昨夜震慑天下五大绝顶的惊天一幕，不过是古银杏树下的一场清梦。'),
    ],
    onFinishEffects: [openScene('scene_slq42_48', SHAOLIN_Q42_QUEST_ID)],
  },

  scene_slq42_48: {
    id: 'scene_slq42_48',
    title: '第四十八幕 · 易筋封神',
    subtitle: '嵩山少林寺 · 绝顶圆满',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_branch==layman|【少林绝顶封神终章 · 古杏扫叶 · 易筋真经】至此功德圆满！扫地僧法空赞你白衣护法功德无量，依少林祖训将《达摩易筋真经》梵夹本留藏阁中，特赐天阶圣物【达摩一苇渡江履】以彰大居士护教奇功，名垂北宋江湖青史！|【少林绝顶封神终章 · 古杏扫叶 · 易筋真经】至此功德圆满！扫地僧法空展卷口授并亲赐《达摩易筋真经》梵夹本，你亲承少林创派第一神功【易筋经】，更获赐天阶圣物【达摩一苇渡江履】，名垂北宋江湖青史！}'),
    ],
    choices: [
      {
        id: 'slq42_complete',
        label: '拜谢扫地僧法空，承接《易筋经》、梵夹本真经与【达摩一苇渡江履】（绝顶封神）',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          { type: 'teachMartialArt', artId: 'MA-001', level: 1 },
          { type: 'giveItem', itemId: 'ITM-SCR-001', qty: 1 },
          { type: 'giveItem', itemId: 'BOT-003', qty: 1 },
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
            '已完成绝顶封神终章《古杏扫叶 · 易筋真经》！习得创派神功【易筋经】，获天阶圣物【《达摩易筋真经》梵夹本】与【达摩一苇渡江履】，威望 +600，法空好感 +30！',
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
