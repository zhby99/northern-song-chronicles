import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE10_QUEST_ID } from './shaolinSideSunScriptureQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls10_01: {
    id: 'scene_sls10_01',
    title: '第一幕 · 孤本遭蠹',
    subtitle: '嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('{reignYear}秋高气爽，少林藏经阁西厢的青石晒经台上铺开一排排竹簟。药王院采药僧虚广正小心翼翼地捧着几册泛黄线装经卷，愁眉紧锁，轻叹不已。'),
      S('NPC-0498', '（见你走近，连忙合十低声道）“阿弥陀佛！师兄素来饱读经书、善书小楷，快帮我瞧瞧这几函宋版孤本——今年嵩山梅雨绵长，阁楼西北角暗橱受潮，竟生了细密书蠹！再不抢救，这几卷传世珍本便要虫蛀成屑了！”'),
      N('你俯身细看，只见几部雕版精良的《大般若经》与《楞伽经》书口处已被蠹虫咬出细碎针眼，纸页发潮发软，若直接暴晒烈日，只怕立刻卷曲碎裂。'),
    ],
    onFinishEffects: [openScene('scene_sls10_02', SHAOLIN_SIDE10_QUEST_ID)],
  },

  scene_sls10_02: {
    id: 'scene_sls10_02',
    title: '第二幕 · 古方救书',
    subtitle: '西厢晒经校勘石台',
    mandatory: true,
    beats: [
      P('（轻声安抚，神色沉静）“虚广师弟莫急，切不可将潮纸直接摊于毒日之下。古籍护书讲究『阴晾去湿、芸香驱蠹、黄柏固纸』——需先用药王院采来的干芸香草、老樟脑与少许麝香装入细纱囊隔页熏透，再以淡黄柏煎汁轻刷蛀口，置入阴凉微风处晾干，最后方能按卷校勘补抄。”'),
      S('NPC-0498', '（顿时喜上眉梢）“师兄博闻强记，竟连前朝《齐民要术》里的护书古方都熟稔于胸！药王院正好存着今春新晒的芸香草与老樟脑，咱们这就动手抢救这批宋版孤本！”'),
    ],
    choices: [
      {
        id: 'sls10_accept',
        label: '应下晒经校勘之托，配制芸香防蠹方抢救宋版孤本',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE10_QUEST_ID, stepId: 'sun_and_restore' },
          setStep(SHAOLIN_SIDE10_QUEST_ID, 'sun_and_restore'),
          toast(
            '已应虚广之请抢救宋版孤本！请在【西厢晒经校勘石台（sl_cj_terrace）】配香晒经、校勘残卷。',
            'talk',
            '芸香防蠹',
          ),
        ],
      },
    ],
  },

  scene_sls10_03: {
    id: 'scene_sls10_03',
    title: '第三幕 · 调配芸香',
    subtitle: '西厢晒经校勘石台 · 药香清冽',
    mandatory: true,
    beats: [
      N('虚广取来药碾、细绢与陶钵，你亲手称量芸香草三两、老樟脑二两、川椒与丁香各五钱，细细研作微粒，缝入三十余只素色细纱小囊。'),
      N('旋即以温火慢煎黄柏树皮，滤出澄澈金黄的防蠹药汁。淡雅清冽的芸香混合着微苦药气在石台间徐徐散开，令人心神一清。'),
      S('NPC-0498', '（连连赞叹）“怪道古人称藏书之地为『芸台』，单闻这股清雅芸香，便知书蠹再难近身半分！”'),
    ],
    onFinishEffects: [openScene('scene_sls10_04', SHAOLIN_SIDE10_QUEST_ID)],
  },

  scene_sls10_04: {
    id: 'scene_sls10_04',
    title: '第四幕 · 轻拂晒经',
    subtitle: '西厢晒经校勘石台 · 秋阳清风',
    illustrationUrl: '/assets/quests/sl_s10_sun_sutras.jpg',
    illustrationCaption: '西厢晒经 · 清风拂过青石竹簟，芸香护卷抢救宋版佛经孤本',
    mandatory: true,
    beats: [
      N('你与虚广先将受潮经卷移至古檐阴风处，用极软的兔毫小刷逐页拂去虫卵纸屑，再以竹镊轻夹芸香药囊嵌入书脊，待潮气散尽，方才趁着午后斜阳温柔摊开于竹簟之上。'),
      N('三百余卷宋版孤本如阶梯般次第展开，墨香与芸香交织随山风浮动。每一翻页皆须屏息凝气、手腕稳若磐石，半点不敢以蛮力扯动脆纸，竟暗合内功吐纳与运腕控劲之妙。'),
      P('（轻拂一页泛黄经纸，微笑低语）“护书如护心，急躁不得，浮华不得。一呼一吸之间，倒比在练武场打坐更能收摄心猿。”'),
    ],
    onFinishEffects: [openScene('scene_sls10_05', SHAOLIN_SIDE10_QUEST_ID)],
  },

  scene_sls10_05: {
    id: 'scene_sls10_05',
    title: '第五幕 · 楷书补残',
    subtitle: '西厢晒经校勘石台 · 临案补抄',
    mandatory: true,
    beats: [
      N('经卷晾妥之后，有七八页遭虫蛀过甚、缺字十余处。你在石台案前铺开色泽相近的旧宣纸，研墨濡毫，凭着平日熟读经藏的功底核对异文，以端严工整的馆阁小楷一笔一划补录缺字，再以浆糊严丝合缝托裱修补。'),
      S('NPC-0498', '（凑近端详，惊叹不已）“师兄这手小楷圆润劲健、铁画银钩，补在宋版刻本旁竟毫无违和之感！若非亲眼所见，旁人定以为是原刻完本！”'),
    ],
    onFinishEffects: [openScene('scene_sls10_06', SHAOLIN_SIDE10_QUEST_ID)],
  },

  scene_sls10_06: {
    id: 'scene_sls10_06',
    title: '第六幕 · 朱笔遗批',
    subtitle: '西厢晒经校勘石台 · 《楞伽经》夹页',
    mandatory: true,
    beats: [
      N('翻检至最后一部装帧古朴的《楞伽阿跋多罗宝经》时，你忽觉书页天头空白处留着数行褪色朱砂批注，笔力苍劲古拙，似是百年前某位少林高僧读经练武之余随手题记：'),
      N('“『凡修少林绝技者，暴戾之气愈盛，经脉暗伤愈深；非以慈悲禅法化解戾气，终成画虎反类犬之祸。武道极处不在杀伐，而在止戈度人——欲求上乘，先净其心。』”'),
      P('（凝视那数十宇朱批良久，心头如遭暮鼓晨钟轻轻一震）“以佛法化戾气，以慈悲御刚猛……原来少林七十二绝技背后，竟藏着这般深邃的修行关窍！”'),
    ],
    onFinishEffects: [openScene('scene_sls10_07', SHAOLIN_SIDE10_QUEST_ID)],
  },

  scene_sls10_07: {
    id: 'scene_sls10_07',
    title: '第七幕 · 禅武印心',
    subtitle: '西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('你合目默诵那段前代高僧遗批，将平日修习的少林内功、拳掌招式与禅门经义一一在脑海中相互印证，只觉往日修炼中几处滞涩刚猛过头之处竟如冰雪消融，丹田真气自发流转得愈发圆融绵长。'),
      S('NPC-0498', '（见你站在石台前神色澄明、呼吸悠长，不敢惊扰，良久才轻声笑道）“师兄方才莫不是从经卷批注里悟出了什么禅武至理？瞧你周身气息，竟似比方才更沉稳温润了几分！”'),
      P('（睁开双眼，合十微笑）“不过侥幸沾了前辈高僧一点余荫。今日帮师弟晒经防蠹，反倒是弟子自己收获最大。”'),
    ],
    onFinishEffects: [openScene('scene_sls10_08', SHAOLIN_SIDE10_QUEST_ID)],
  },

  scene_sls10_08: {
    id: 'scene_sls10_08',
    title: '第八幕 · 古杏扫叶',
    subtitle: '藏经阁外 · 百年古银杏下',
    illustrationUrl: '/assets/quests/sl_s10_fakuo_nod.jpg',
    illustrationCaption: '古杏颔首 · 灰衣扫地僧法空停帚远观，对护经明心之举微微颔首',
    mandatory: true,
    beats: [
      N('二人将修补妥当、夹满芸香囊的宋版孤本一一装函归架。暮色染金之际，你偶一抬头，望见石台外百年古银杏树下，不知何时立着一位身着洗得发白灰布僧衣、手持竹帚的老僧。'),
      N('金黄杏叶纷扬飘落，却在老僧身周三尺之外奇异地悠然滑开，不沾衣袂。那老僧正是常年默默洒扫藏经阁的扫地僧【法空】——他静静望了一眼案头端正修补的《楞伽经》与你清澄无躁的眉眼，唇角浮起一丝极淡而温厚的笑意，朝你微微颔首。'),
      S('NPC-0101', '（声音平淡温和，仿佛就在耳畔低语，却又隔着十丈清风）“蠹虫噬纸，贪嗔噬心。能护一卷古经不腐，亦能守一念本心不昧……善哉，善哉。”'),
    ],
    onFinishEffects: [openScene('scene_sls10_09', SHAOLIN_SIDE10_QUEST_ID)],
  },

  scene_sls10_09: {
    id: 'scene_sls10_09',
    title: '第九幕 · 归函锁阁',
    subtitle: '西厢晒经校勘石台 · 暮钟初起',
    mandatory: true,
    beats: [
      N('待你恭敬合十再抬头时，古银杏树下唯余满地碎金落叶与一缕清风，灰衣老僧早已持帚缓步没入藏经阁深处回廊。'),
      S('NPC-0498', '（满怀敬意地望向阁廊方向）“那位便是常年在藏经阁扫地的法空老禅师，平日极少与人开口言语，今日竟特意停帚向师兄颔首称善，师兄这份心性与文德定是入了老禅师法眼！”'),
      P('（心中澄净欢喜）“老禅师一语点醒梦中人，弟子定当常怀敬畏，勤修佛法而不骄不躁。”'),
    ],
    onFinishEffects: [openScene('scene_sls10_10', SHAOLIN_SIDE10_QUEST_ID)],
  },

  scene_sls10_10: {
    id: 'scene_sls10_10',
    title: '第十幕 · 芸香留韵',
    subtitle: '西厢晒经校勘石台',
    mandatory: true,
    beats: [
      S('NPC-0498', '“这批宋版孤本尽数安然入库，达摩院与藏经阁执事皆已记下师兄护经大功！这一日晒经补抄、品读前辈朱批，既精进了书道与经义，更得法空老禅师垂青，真乃难得机缘！”'),
      P('（合十还礼，袖间尚余一缕淡雅芸香）“多谢虚广师弟相邀，日后藏经阁若再有晒经校勘之事，弟子随时愿来搭手。”'),
    ],
    choices: [
      {
        id: 'sls10_complete',
        label: '合函归阁，铭记法空禅师点拨与禅武心得！',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', amount: 150 },
          { type: 'modifySkill', key: '书', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0101' }, delta: 12 },
          { type: 'addSectContribution', amount: 100 },
          { type: 'modifyRenown', delta: 35, reason: '完成门派差事《西厢晒经 · 芸香防蠹》' },
          { type: 'completeQuest', questId: SHAOLIN_SIDE10_QUEST_ID, outcome: 'completed' },
          toast(
            '【西厢晒经 · 芸香防蠹】圆满完结！书法 +2、经义 +1、武学阅历 +150，获扫地僧法空颔首垂青！',
            'success',
            '芸香防蠹',
          ),
        ],
      },
    ],
  },
}
