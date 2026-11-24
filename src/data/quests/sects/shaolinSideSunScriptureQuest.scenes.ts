import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE10_QUEST_ID } from './shaolinSideSunScriptureQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls10_01: {
    id: 'scene_sls10_01',
    title: '第一幕 · 孤本遭蠹 · 急请相助',
    subtitle: '嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('{reignYear}秋高气爽，少林藏经阁西厢的青石晒经台上铺开一排排素净竹簟。药王院采药僧虚广正小心翼翼捧着几函泛黄卷轴，愁眉紧锁，连连轻叹。'),
      S('NPC-0498', '（见你走近，连忙合十低声道）“阿弥陀佛！师兄素来饱读经书、善书小楷，快帮我瞧瞧这批唐代写经与宋版孤本——今年嵩山梅雨绵长，阁楼西北暗橱返潮，竟生了细密书蠹！”'),
      N('你俯身端详，只见几册麻纸写就的《金刚经》唐抄卷与宋刻《楞伽经》书口处已被书蠹咬出细碎针眼，纸页受潮发软又暗藏脆痕，稍一处置不当便可能卷曲碎裂。'),
      P('（轻声安抚，神色沉静）“虚广师弟莫慌。古籍修缮贵在顺其纸性、步步审慎，先防潮驱蠹，再逐字校勘补残，咱们联手必能保住这批传世孤本。”'),
    ],
    onFinishEffects: [openScene('scene_sls10_02', SHAOLIN_SIDE10_QUEST_ID)],
  },

  scene_sls10_02: {
    id: 'scene_sls10_02',
    title: '第二幕 · 领命晒经 · 备材启案',
    subtitle: '西厢晒经校勘石台',
    mandatory: true,
    beats: [
      S('NPC-0498', '（登时松了口气，喜上眉梢）“有师兄肯出手搭救，这批经卷可算有救了！药王院备着今春新采的芸香草、川椒、黄柏皮与陈年松烟墨，阁中石案也已扫净。”'),
      N('秋风吹过晒经石台，百年古银杏洒下几片初黄秋叶。接下这桩清雅而精细的护经之托前，你先定下起手次序——'),
    ],
    choices: [
      {
        id: 'sls10_accept_herbs',
        label: '【先验药材燥湿】逐一查验芸香、椒泥与黄柏成色，备妥防蠹之物再启经函',
        subLabel: '承接支线【西厢晒经 · 芸香防蠹】，开启古籍修缮三关',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s10_start_mode', value: 'herbs' },
          { type: 'startQuest', questId: SHAOLIN_SIDE10_QUEST_ID, stepId: 'sun_and_restore' },
          setStep(SHAOLIN_SIDE10_QUEST_ID, 'sun_and_restore'),
          toast(
            '已应虚广之请抢救唐宋孤本！请在【西厢晒经校勘石台（sl_cj_terrace）】配香晒经、校勘残卷。',
            'talk',
            '芸香防蠹',
          ),
        ],
      },
      {
        id: 'sls10_accept_scrolls',
        label: '【先按蛀损分箱】将受潮最重的唐代写经先行挑出轻放，免被厚册压断脆页',
        subLabel: '承接支线【西厢晒经 · 芸香防蠹】，开启古籍修缮三关',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s10_start_mode', value: 'scrolls' },
          { type: 'startQuest', questId: SHAOLIN_SIDE10_QUEST_ID, stepId: 'sun_and_restore' },
          setStep(SHAOLIN_SIDE10_QUEST_ID, 'sun_and_restore'),
          toast(
            '已分拣受蠹孤本！请在【西厢晒经校勘石台（sl_cj_terrace）】配香晒经、校勘残卷。',
            'talk',
            '芸香防蠹',
          ),
        ],
      },
    ],
  },

  scene_sls10_03: {
    id: 'scene_sls10_03',
    title: '第三幕 · 第一关 · 辨蠹防潮',
    subtitle: '西厢晒经校勘石台 · 北宋护书古法考',
    illustrationUrl: '/assets/quests/sl_s10_sun_sutras.jpg',
    illustrationCaption: '西厢晒经 · 清风拂过青石竹簟，芸香护卷抢救唐宋佛经孤本',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s10_start_mode=herbs|你先挑出干爽醇香的芸香草与细磨川椒置于陶钵，随后捧出第一函受潮最甚的唐代麻纸写经；|你将受潮最重的唐代写经小心展于软布之上，书页边缘已见细白虫卵与潮斑；}午后秋阳正烈，青石台晒得微微发烫，檐廊之下则穿堂清风习习。'),
      S('NPC-0498', '（捧着一叠潮软发脆的唐代写经，拿不定主意地望向你）“师兄，这几卷写经既潮且脆，纸缝里还藏着活书蠹。咱们是该趁日头正毒狠晒去湿，还是另有护书古法？”'),
      N('面对潮脆欲裂的千年写经，古籍修缮第一步便定成败。你凝神权衡，择定护经古法——'),
    ],
    choices: [
      {
        id: 'sls10_care_sun',
        label: '趁午后烈日直接摊铺青石暴晒半日，借燥阳高温立毙书蠹并急烘水汽',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s10_care_pick', value: 'sun' },
          { type: 'setFlag', flag: 'sl_s10_care_right', value: false },
          openScene('scene_sls10_04', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
      {
        id: 'sls10_care_shade',
        label: '阴干透风配芸香草与椒泥防蠹，切忌烈日暴晒致使潮纸脆裂',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s10_care_pick', value: 'shade' },
          { type: 'setFlag', flag: 'sl_s10_care_right', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s10_trial1_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s10_trial1_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls10_04', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
      {
        id: 'sls10_care_lime',
        label: '以烈酒调淡石灰水遍洒书脊，借药水烈性封堵虫洞并隔绝湿气',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s10_care_pick', value: 'lime' },
          { type: 'setFlag', flag: 'sl_s10_care_right', value: false },
          openScene('scene_sls10_04', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls10_04: {
    id: 'scene_sls10_04',
    title: '第四幕 · 第二关 · 校勘残卷脱字',
    subtitle: '西厢晒经校勘石台 · 经义文字考',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s10_care_pick=shade|你命虚广将受潮写经悉数移至西厢阴风廊下，先以兔毫轻拂虫卵，再以芸香草、老樟脑与椒泥缝入纱囊嵌入书脊，微风过处纸页舒展平复，淡雅芸香四溢！虚广连声赞叹：“怪道古人称藏书处为『芸台』，师兄深谙《齐民要术》护书古法，半页未损！”|}{ifFlagEq:sl_s10_care_pick=sun|第一页唐纸刚沾毒日便发出细微卷裂声，虚广急忙出声拦住，二人连忙改将潮卷移入阴风廊下缓晾，再配芸香草与椒泥纱囊驱蠹，方才化险为夷。|}{ifFlagEq:sl_s10_care_pick=lime|酒液尚未落纸，虚广急忙劝道烈酒石灰极易蚀纸晕墨！二人连忙改依古法置入阴风廊下缓晾，以芸香草与椒泥纱囊细细熏防，终保住了古纸墨迹。|}'),
      N('待潮气散尽、书蠹清绝，二人铺开色泽相近的陈年宣纸研墨濡毫，开始逐卷校勘虫蛀脱字。摊开一部唐代名家小楷抄本《金刚般若波罗蜜经》时，卷中最关键的一句竟遭书蠹蛀空四字！'),
      N('只见泛黄经纸上墨迹端严，前文清清楚楚写着：「是故须菩提，诸菩萨摩诃萨应如是生清净心，不应住色生心，不应住声香味触法生心，应无所住，______。」'),
      S('NPC-0498', '（屏息捧起旧宣补纸，低声问道）“师兄，这部唐抄本乃孤品，底本正锁在内阁深处。此处『应无所住』之后脱漏四字，依佛门真经原义，当以何四字小楷补全？”'),
    ],
    choices: [
      {
        id: 'sls10_sutra_duan',
        label: '濡墨凝神，以工整小楷补全「而断其念」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s10_sutra_pick', value: 'duan' },
          { type: 'setFlag', flag: 'sl_s10_sutra_right', value: false },
          openScene('scene_sls10_05', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
      {
        id: 'sls10_sutra_sheng',
        label: '濡墨凝神，以工整小楷补全「而生其心」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s10_sutra_pick', value: 'sheng' },
          { type: 'setFlag', flag: 'sl_s10_sutra_right', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s10_trial2_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s10_trial2_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_sls10_05', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
      {
        id: 'sls10_sutra_puti',
        label: '濡墨凝神，以工整小楷补全「而证菩提」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s10_sutra_pick', value: 'puti' },
          { type: 'setFlag', flag: 'sl_s10_sutra_right', value: false },
          openScene('scene_sls10_05', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls10_05: {
    id: 'scene_sls10_05',
    title: '第五幕 · 朱笔遗批 · 禅武印心',
    subtitle: '西厢晒经校勘石台 · 《楞伽经》夹页',
    mandatory: true,
    beats: [
      S('NPC-0498', '{ifFlag:sl_s10_sutra_right|（凑近端详，惊叹击节）“『应无所住，而生其心』！师兄非但经义分毫不差，这手馆阁小楷更是圆润劲健、铁画银钩，托裱进唐抄残页竟宛若原刻完本！”|（捧来阁中另册宋刻《金刚经》仔细核对，轻声提醒）“师兄笔力圆润极佳，唯此处真经原句乃『应无所住，而生其心』——趁浆糊未干，咱们重裁旧纸补正便是！”}'),
      N('修补妥当《金刚经》后，翻检至最后一部装帧古朴的《楞伽阿跋多罗宝经》时，你忽见天头空白处留着数行褪色朱砂批注，笔力苍劲古拙，似是百年前某位少林大德读经练武之余题记：'),
      N('“『凡修少林绝技者，暴戾之气愈盛，经脉暗伤愈深；非以慈悲禅法化解戾气，终成画虎反类犬之祸。武道极处不在杀伐，而在止戈度人——欲求上乘，先净其心。』”'),
      N('你合目静思良久，将平日修习的少林拳掌内功与这数十宇朱批相互印证，只觉往日运劲中几处刚猛滞涩之结竟在清风芸香间悄然融化，呼吸愈发悠长澄明。'),
    ],
    onFinishEffects: [openScene('scene_sls10_06', SHAOLIN_SIDE10_QUEST_ID)],
  },

  scene_sls10_06: {
    id: 'scene_sls10_06',
    title: '第六幕 · 第三关 · 微尘一问',
    subtitle: '藏经阁西厢 · 百年古银杏下',
    mandatory: true,
    beats: [
      N('暮色将至，夕阳为少室山镀上一层温润金辉。你与虚广将修补妥当、夹满芸香纱囊的唐宋孤本一一装函，忽闻石台外百年古银杏树下传来轻缓匀净的竹帚扫叶之声。'),
      N('抬眸望去，不知何时立着一位身着洗得发白灰布僧衣的无名老僧——正是常年默默洒扫藏经阁的扫地僧【法空】。金黄杏叶纷扬飘落，却在老僧身周三尺之外奇异地悠然滑开，不沾衣袂。'),
      S('NPC-0101', '（停帚远观案头新补的《金刚经》与《楞伽经》，声音平淡温和，仿佛就在耳畔低语）“芸香护纸，小楷补残。小施主，经卷能以古法防蠹，可这人心之蠹，又当何以防之？”'),
      N('古杏叶落无声，清风穿廊而过。虚广在一旁屏息垂首，而你面对法空老禅师这微尘一问，坦然道出胸中本心——'),
    ],
    choices: [
      {
        id: 'sls10_fakuo_zen',
        label: '【禅心自省 · 念念观照】人心之蠹起于贪嗔执念，唯常以慈悲清净观照自心，不令尘垢久积',
        subLabel: '以慈悲明心化除贪嗔（禅心慈悲 +2）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s10_fakuo_ans', value: 'zen' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s10_trial3_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s10_trial3_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_sls10_07', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
      {
        id: 'sls10_fakuo_precept',
        label: '【严律守戒 · 金刚斩妄】人心之蠹生于放逸姑息，须以森严戒律日日自警、见妄即斩，绝不留情',
        subLabel: '以铁律戒心截断妄念（怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s10_fakuo_ans', value: 'precept' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s10_trial3_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s10_trial3_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_sls10_07', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls10_07: {
    id: 'scene_sls10_07',
    title: '第七幕 · 古杏颔首 · 帚入回廊',
    subtitle: '藏经阁外 · 百年古银杏下',
    illustrationUrl: '/assets/quests/sl_s10_fakuo_nod.jpg',
    illustrationCaption: '古杏颔首 · 灰衣扫地僧法空停帚远观，对护经明心之举微微颔首',
    mandatory: true,
    beats: [
      S('NPC-0101', '{ifFlagEq:sl_s10_fakuo_ans=zen|（浑浊而深邃的眼底浮起一丝极淡而温厚的笑意，朝你微微颔首）“善哉，善哉。念念观照，如风过竹而不留声；能护一卷古经不腐，亦能守一念本心不昧，难得，难得。”|（目光静静掠过你眉间刚毅之气，亦微微颔首）“戒律如堤，可防浊浪初起；只是堤坝筑得越严，越莫忘了留一渠慈悲活水。你既有这份铁律自省之心，善哉，善哉。”}'),
      N('{ifFlag:sl_s10_sutra_right|老僧目光又在案头端严工整的“而生其心”四字上多停了一瞬，竹帚轻划青石，落叶如水般向两侧分开。|老僧收回目光，竹帚轻点青石，满地银杏金叶悄然归拢成堆，竟无一粒微尘惊起。}'),
      N('待你恭敬合十再抬头时，百年古银杏下唯余满地碎金落叶与一缕清风，灰衣老僧早已持帚缓步没入藏经阁深处回廊。'),
      S('NPC-0498', '（满怀敬意地望向阁廊方向，低声惊叹）“那位便是藏经阁的法空老禅师，平日经年累月极少与人言语，今日竟特意停帚垂问、向师兄颔首称善！师兄这份心性与文德，定是入了老禅师法眼！”'),
    ],
    onFinishEffects: [openScene('scene_sls10_08', SHAOLIN_SIDE10_QUEST_ID)],
  },

  scene_sls10_08: {
    id: 'scene_sls10_08',
    title: '第八幕 · 芸香留韵 · 卷终嘉奖',
    subtitle: '西厢晒经校勘石台 · 暮钟初起',
    mandatory: true,
    beats: [
      S('NPC-0498', '“这批唐代写经与宋版孤本尽数安然入库，达摩院与藏经阁执事皆已记下师兄护经大功！这一日辨法防蠹、校勘残卷、又得法空老禅师点拨，真乃千载难逢之清雅机缘！”'),
      P('（合十还礼，袖间尚余一缕淡雅芸香）“老禅师微尘一问令人醍醐灌顶。多谢虚广师弟相邀，日后藏经阁若再有晒经校勘之事，弟子随时愿来搭手。”'),
      N('暮鼓晨钟悠扬回荡在少室山谷，你步出西厢晒经石台，只觉胸中书卷清气与禅武妙理融为一炉。'),
    ],
    choices: [
      {
        id: 'sls10_complete',
        label: '合函归阁，铭记法空禅师点拨与古籍修缮心得！',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', amount: 150 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0101' }, delta: 12 },
          { type: 'addSectContribution', amount: 100 },
          { type: 'modifyRenown', delta: 35, reason: '完成门派差事《西厢晒经 · 芸香防蠹》' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s10_care_right', op: 'truthy' },
            thenEffects: [
              { type: 'addSectContribution', amount: 30 },
              { type: 'modifyRenown', delta: 10, reason: '精通古籍阴干芸香护书古法' },
            ],
            elseEffects: [],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s10_sutra_right', op: 'truthy' },
            thenEffects: [
              { type: 'modifySkill', key: '书', delta: 1 },
              { type: 'addArtExp', amount: 60 },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0101' }, delta: 6 },
            ],
            elseEffects: [],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE10_QUEST_ID, outcome: 'completed' },
          toast(
            '【西厢晒经 · 芸香防蠹】圆满完结！书道经义精进、武学阅历大增，获扫地僧法空罕见微颔！',
            'success',
            '芸香防蠹',
          ),
        ],
      },
    ],
  },
}
