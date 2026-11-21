import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q21_QUEST_ID } from './huashanEndingSwordHarmonyQuest'

const SPEAKER_TUOBA_XIONG: StorySpeakerSpec = {
  kind: 'custom',
  name: '拓跋雄',
  title: '西夏关中主帅 · 一品堂征东大都督',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
}

const SPEAKER_XIXIA_IRON_GUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '嵬名铁卫',
  title: '西夏一品堂风陵督战统领',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
}

function buildQ21XixiaGuardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ21_XIXIA_GUARD',
    name: '嵬名铁卫',
    title: '西夏一品堂 · 风陵督战铁卫统领',
    realm: '一流上品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 4,
    sectRankLabel: '督战统领',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“华山剑气两脉居然合兵一处？！快擂鼓迎敌，拦住他们！”',
    stats: { hp: 4050, mp: 3450, agi: 75, res: 68 },
    talents: { bone: 78, comprehension: 68, charm: 46 },
    equipped: {
      weapon: 'WPN-012',
      armor: 'ARM-012',
    },
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-068' },
    learnedArts: [{ artId: 'MA-245', level: 8 }, { artId: 'MA-133', level: 8 }, { artId: 'MA-068', level: 8 }],
  })
}

function buildQ21TuobaXiongNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ21_TUOBA_XIONG',
    name: '拓跋雄',
    title: '西夏关中主帅 · 一品堂征东大都督',
    realm: '宗师下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 5,
    sectRankLabel: '关中主帅',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“什么剑气联军！在绝对的大夏皇族武力面前，统统给本帅化作飞灰！”',
    stats: { hp: 5600, mp: 4900, agi: 80, res: 77 },
    talents: { bone: 86, comprehension: 80, charm: 60 },
    equipped: {
      weapon: 'WPN-012',
      armor: 'ARM-012',
    },
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-049' },
    learnedArts: [{ artId: 'MA-245', level: 9 }, { artId: 'MA-133', level: 9 }, { artId: 'MA-049', level: 8 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq21_01: {
    id: 'scene_hsq21_01',
    title: '第一幕 · 东峰晨雪演九剑',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('{reignYear}冬日初雪，东峰迎曦石坪薄霜如玉。你执一枝松针清枝代剑，随风轻挥，《独孤九剑》九式在你掌下圆转如意、羚羊挂角无迹可寻。'),
      N('自思过崖雨夜悟剑以来，你的九剑造诣早已突破第五重关隘，渐入“草木竹石皆可为剑、不滞于物”的宗师化境。'),
      S('NPC-0167', '（踏雪悄然走至你身后，压低声音激动道）“好徒侄！你的《独孤九剑》如今连老夫都看不出深浅了！岳沧溟前番与段延庆硬拼引发三十年前旧疾，只要咱们剑宗今日发难，必可不费吹灰之力夺回紫霞主殿！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_02', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_02: {
    id: 'scene_hsq21_02',
    title: '第二幕 · 恪守初心拒操戈',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('你将手中松枝轻轻放回石栏，转身望向封不弃，目光坦荡而坚定。'),
      P('“封师叔，独孤前辈创《独孤九剑》，是为了杀尽仇寇、护道济世，绝非用来刺向自家同门胸膛！三十年前玉女峰流血之痛已令华山元气大伤，弟子昔日在思过崖削壁止戈，今日更绝不会重蹈前人覆辙！”'),
      S('NPC-0167', '（一怔，神色焦急）“你这傻孩子！空有通天剑术却不争掌门，难道叫咱们剑宗一辈子寄人篱下？！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_03', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_03: {
    id: 'scene_hsq21_03',
    title: '第三幕 · 沧云急报风陵患',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('恰在此时，气宗大师兄高沧云身披《华山紫霞剑客衫》匆匆自回廊奔来，听见你方才掷地有声的一席话，脚步微顿，眼中浮现深深敬意。'),
      S('NPC-0202', '“{gender:师弟|师妹}高义，沧云佩服！实不相瞒，山下潼关刚送来十万火急军报——西夏一品堂关中主帅拓跋雄已在风陵荒原扎下连营、囤积百车攻城军械，只待黄河冰封便要强攻潼关！”'),
      P('“拓跋雄屯兵风陵？沧云师兄，这岂非正是我剑气两脉放下成见、并肩卫国的天赐良机！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_04', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_04: {
    id: 'scene_hsq21_04',
    title: '第四幕 · 倡议两脉合兵计',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('你当即偕高沧云、封不弃同入紫霞正气主殿，向掌门岳沧溟、秦烈山、宁清羽主动请缨。'),
      P('“禀掌门：西夏大营强弩密布、高手如云。若单凭快剑突袭，恐难久持阵脚；若单凭内家剑阵稳推，又恐被拓跋雄从容调兵合围。弟子愿与高师兄联手，合气宗紫霞剑阵之厚重与剑宗快剑之锐利，星夜奇袭风陵！”'),
      S('NPC-0118', '（眼中绽出久违神采，连声赞叹）“以紫霞为盾、九剑为锋！好一个两仪相济之策！秦师弟、宁师妹、封师弟，你们意下如何？”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_05', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_05: {
    id: 'scene_hsq21_05',
    title: '第五幕 · 诸老同心授帅旗',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0147', '“哈哈哈！三十载以来，还是头一回见气宗首徒与剑宗传人主动请命并肩挂帅！老夫举双手赞成！”'),
      S('NPC-0166', '“两脉精锐各抽五十名好手，共成百剑义师，必叫拓跋雄有来无回！”'),
      S('NPC-0167', '（见气宗上下对你推崇备至，心中郁气亦消散泰半，慨然抱拳）“既如此，我剑宗儿郎今夜便与气宗师侄同进同退，绝不含糊！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_06', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_06: {
    id: 'scene_hsq21_06',
    title: '第六幕 · 双英执手下仙山',
    subtitle: '华山山道 · 千尺幢',
    mandatory: true,
    beats: [
      S('NPC-0202', '（向你伸手相击，朗声一笑）“{gender:师弟|师妹}，今夜你为锋矢主帅，我率气宗剑阵护你两翼！咱们潼关瓮城会师！”'),
      P('“一言为定！百名华山剑士——出发！”'),
    ],
    choices: [
      {
        id: 'hsq21_ch_to_barbican',
        label: '统率两脉精锐赶赴【潼关天险瓮城 · 潼关镇河主城楼与瓮城】会师出关！',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q21_QUEST_ID, stepId: 'rally_tongguan' },
          toast('两脉联师已发！请前往【潼关天险瓮城 · 潼关镇河主城楼与瓮城】会师！', 'talk', '剑气并肩'),
        ],
      },
    ],
  },

  scene_hsq21_07: {
    id: 'scene_hsq21_07',
    title: '第七幕 · 剑气并肩出雄关',
    subtitle: '潼关天险瓮城 · 潼关镇河主城楼与瓮城',
    illustrationUrl: '/assets/quests/hs_q21_twin_lineage_march.jpg',
    illustrationCaption: '剑气并肩 · 与高沧云统率剑气两脉弟子同出潼关奇袭西夏大营',
    mandatory: true,
    beats: [
      N('潼关镇河城楼之下，寒月如钩。五十名气宗弟子内息绵长、剑含紫霜，五十名剑宗弟子身法矫若惊鸿、寒芒吐露——分立三十载的两脉门人并肩列于瓮城大道，你与高沧云并辔立于队列最前！'),
      N('城门洞开，黄河涛声轰鸣如雷。高沧云扬剑向天，你横剑引路，百道身影如一体两翼的太华苍鹰，悄然掠出雄关渡向北岸风陵荒原！'),
    ],
    onFinishEffects: [openScene('scene_hsq21_08', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_08: {
    id: 'scene_hsq21_08',
    title: '第八幕 · 渡河演阵定两仪',
    subtitle: '黄河渡船 · 寒夜中流',
    mandatory: true,
    beats: [
      N('渡船破开浮冰疾行，你与高沧云借着微弱星光在船头最后核定战术。'),
      P('“西夏一品堂惯用劲弩毒烟配合重骑冲击。入营之后，我以《独孤九剑》破箭式开道撕裂前营，沧云师兄率气宗《养吾剑法》结成两仪紫霞圆阵护住两翼同门，剑宗快剑手随我直插中军帅帐！”'),
      S('NPC-0202', '“妙极！一守一攻，一正一奇，纵使拓跋雄有三头六臂也休想冲散咱们两脉联军！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_09', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_09: {
    id: 'scene_hsq21_09',
    title: '第九幕 · 同门相护破暗桩',
    subtitle: '风陵荒原外围雪滩',
    mandatory: true,
    beats: [
      N('登岸潜行之际，苇荡暗沟内忽地弹起一道西夏绊马毒索，一名年轻气宗弟子脚下一滑险些触发铜铃；身旁一名剑宗师兄眼疾手快，一剑削断引线并伸手稳稳扶住了他。'),
      N('两人四目相对，各自轻声道了句“多谢师兄”，平日里横亘在两脉弟子心头的那层生疏隔膜，在生死战场之上悄然冰消瓦解。'),
    ],
    onFinishEffects: [openScene('scene_hsq21_10', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_10: {
    id: 'scene_hsq21_10',
    title: '第十幕 · 悄抵烽台瞰虏营',
    subtitle: '黄河大折外围高坡',
    mandatory: true,
    beats: [
      N('百名剑士悄无声息迫近惊涛烽火高坡，风陵荒原上西夏一品堂绵延数里的军帐与堆积如山的粮车已历历在目。'),
      S('NPC-0202', '“两脉各小队均已就位，只待{gender:师弟|师妹}一声令下！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_11', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_11: {
    id: 'scene_hsq21_11',
    title: '第十一幕 · 拔剑传令起雷霆',
    subtitle: '黄河大折惊涛烽火台侧',
    mandatory: true,
    beats: [
      P('“西岳剑气，同护河山——随我杀入风陵敌营！”'),
    ],
    choices: [
      {
        id: 'hsq21_ch_to_beacon',
        label: '登临【潼关天险瓮城 · 黄河大折惊涛烽火台】向风陵西夏大营发动奇袭！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q21_QUEST_ID, 'crush_tuoba'),
          toast('奇袭打响！请于【黄河大折惊涛烽火台】统率两脉剑阵荡平风陵敌营！', 'warn', '九剑靖边'),
        ],
      },
    ],
  },

  scene_hsq21_12: {
    id: 'scene_hsq21_12',
    title: '第十二幕 · 破箭开道裂辕门',
    subtitle: '潼关天险瓮城 · 黄河大折惊涛烽火台（风陵前哨）',
    mandatory: true,
    beats: [
      N('杀声骤起！西夏辕门望楼上的数十名劲弩手惊慌扣动机括，你一马当先腾空掠起，《独孤九剑》“破箭式”挽出一片璀璨剑网，将漫天毒矢尽数反震射回望楼！'),
      N('高沧云紧随其后率五十名气宗弟子展开紫霞剑阵，醇厚绵密的混元真气连成一片铜墙铁壁，硬生生顶住了西夏巡营铁骑的侧面冲撞！'),
    ],
    onFinishEffects: [openScene('scene_hsq21_13', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_13: {
    id: 'scene_hsq21_13',
    title: '第十三幕 · 督战铁卫阻中军',
    subtitle: '风陵荒原 · 西夏前营大道',
    mandatory: true,
    beats: [
      S(SPEAKER_XIXIA_IRON_GUARD, '（挥舞重刃率一品堂督战铁卫死死堵住中军通道）“休教华山剑客冲近大帅营帐！结连环刀阵砍死他们！”'),
      P('“沧云师兄护住两翼放火焚烧东侧粮车，这队一品堂铁卫交由我来破！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_14', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_14: {
    id: 'scene_hsq21_14',
    title: '第十四幕 · 破刀斩卫贯长虹',
    subtitle: '风陵荒原 · 西夏前营大道',
    mandatory: true,
    beats: [
      N('督战统领嵬名铁卫狞笑着劈出势大力沉的西夏弯刀，你长剑斜指其刀背换力破绽，直取要害！'),
    ],
    choices: [
      {
        id: 'hsq21_ch_duel_guard',
        label: '施展《独孤九剑·破刀式》，阵斩督战统领嵬名铁卫！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q21_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQ21XixiaGuardNpc() },
            rule: 'duel',
            forbidEscapeReason: '两脉同门正在两翼浴血护阵，主锋岂可后退！',
            introText: '【前营破阵】以《独孤九剑》破刀式击杀西夏一品堂督战统领嵬名铁卫（一流上品）！',
            onWin: [
              { type: 'giveCombatExp', amount: 150, reason: '风陵前营破刀式阵斩西夏督战统领嵬名铁卫' },
              openScene('scene_hsq21_15', HUASHAN_Q21_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq21_15: {
    id: 'scene_hsq21_15',
    title: '第十五幕 · 剑气合璧荡连营',
    subtitle: '风陵荒原 · 西夏中军校场',
    mandatory: true,
    beats: [
      N('三剑挑翻嵬名铁卫，前营防线轰然告破！东西两寨粮草已被两脉弟子引燃，冲天火光之中，气宗弟子以内力为剑宗同门震开暗器重盾，剑宗弟子以快剑替气宗同门斩落偷袭番骑，配合得天衣无缝！'),
      S('NPC-0202', '（一剑逼退两名一品堂武士，振奋高呼）“{gender:师弟|师妹}，外围番骑已由紫霞剑阵锁死！拓跋雄就在帅帐之前，快取贼酋首级！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_16', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_16: {
    id: 'scene_hsq21_16',
    title: '第十六幕 · 拓跋震怒出帅帐',
    subtitle: '风陵荒原 · 西夏中军帅帐前',
    mandatory: true,
    beats: [
      N('西夏关中主帅【拓跋雄】一身契丹狼裘金甲，手提夏国冷锻重剑自烈火映照的帅帐前怒步踏出，宗师中品的狂暴内劲震得满地碎石乱飞！'),
      S(SPEAKER_TUOBA_XIONG, '“可恶！！本帅早遣细作挑动你们华山剑气内斗，你们非但没自相残杀，竟还联手杀过黄河毁我粮营？！纳命来！！”'),
      P('“兄弟阋于墙，外御其侮！拓跋雄，你永远不会明白中原侠义二字的分量——看剑！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_17', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_17: {
    id: 'scene_hsq21_17',
    title: '第十七幕 · 决战关中番主帅',
    subtitle: '风陵荒原 · 西夏中军帅帐前',
    mandatory: true,
    beats: [
      N('高沧云率紫霞剑阵牢牢封锁四方退路，你独自踏前一步，《独孤九剑》无招剑意直锁拓跋雄周身秘藏玄功命门！'),
    ],
    choices: [
      {
        id: 'hsq21_ch_duel_tuoba',
        label: '合紫霞阵势施展《独孤九剑》，正面斩杀西夏主帅拓跋雄！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q21_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQ21TuobaXiongNpc() },
            rule: 'duel',
            forbidEscapeReason: '风陵决胜在此一举，必斩拓跋雄以靖关中！',
            introText: '【九剑靖边】在紫霞剑阵策应下，以大成《独孤九剑》决战西夏关中主帅拓跋雄（宗师中品）！',
            onWin: [
              { type: 'giveCombatExp', amount: 220, reason: '九剑合紫霞剑阵斩杀西夏关中主帅拓跋雄' },
              openScene('scene_hsq21_18', HUASHAN_Q21_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq21_18: {
    id: 'scene_hsq21_18',
    title: '第十八幕 · 九剑靖边枭敌酋',
    subtitle: '风陵荒原 · 西夏中军帅帐前',
    illustrationUrl: '/assets/quests/hs_q21_dugu_slay_tuoba.jpg',
    illustrationCaption: '九剑靖边 · 独孤九剑合紫霞剑阵一举荡平风陵敌营斩杀主帅拓跋雄',
    mandatory: true,
    beats: [
      N('外围紫霞剑阵紫气如虹，将拓跋雄试图突围借力的八方空间彻底锁死；你在阵心从容施展《独孤九剑》，“总决式”引其重剑走空，“破气式”一剑如惊电穿云，精准无比地刺穿其护体秘藏玄功、直贯咽喉！'),
      N('拓跋雄庞大的身躯轰然倒地，你顺势一剑削断丈八帅旗旗杆，将那面绣着金狼徽记的西夏征东帅旗卷入怀中！'),
      S('NPC-0202', '“主帅伏诛！！华山必胜！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_19', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_19: {
    id: 'scene_hsq21_19',
    title: '第十九幕 · 烈焰尽焚窥宋谋',
    subtitle: '风陵荒原 · 火海废墟',
    mandatory: true,
    beats: [
      N('残余一品堂番兵见拓跋雄毙命、帅旗被夺，溃散奔逃入茫茫荒原。两脉弟子合力将百车攻城器械与粮草付之一炬，熊熊大火彻底断绝了西夏今冬叩犯潼关的一切可能！'),
      N('火光映照下，气宗与剑宗弟子互相包扎创口、击掌欢庆，再无一人提及气剑门户之别。'),
    ],
    onFinishEffects: [openScene('scene_hsq21_20', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_20: {
    id: 'scene_hsq21_20',
    title: '第二十幕 · 沧云折服吐心声',
    subtitle: '潼关渡口 · 凯旋归途',
    mandatory: true,
    beats: [
      S('NPC-0202', '（与你并立渡船船头，望着滚滚黄河，诚挚慨叹）“今夜若无气宗剑阵稳守，难免有所伤亡；可若无{gender:师弟|师妹}的《独孤九剑》雷霆破局，纵再多三倍兵力亦斩不了拓跋雄。沧云今日方才彻悟——剑气分则两伤，合则天下无敌！”'),
      P('“高师兄能作此想，我华山三百年基业何愁不兴！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_21', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_21: {
    id: 'scene_hsq21_21',
    title: '第二十一幕 · 携旗班师返紫霞',
    subtitle: '西岳华山 · 玉女峰石阶',
    mandatory: true,
    beats: [
      N('晨曦微露，百名凯旋之师踏着朝霞登上玉女峰，紫霞正气主殿钟鼓齐鸣，岳沧溟率三位宿老早已在殿前相迎！'),
    ],
    choices: [
      {
        id: 'hsq21_ch_to_hall',
        label: '手捧缴获西夏帅旗，步入【玉女峰紫霞道观 · 紫霞正气主殿】复命！',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q21_QUEST_ID, 'harmony_abdicate'),
          { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_zixia', spotId: 'tg_zx_hall' },
          toast('凯旋归山！请于【紫霞正气主殿】献上西夏帅旗复命！', 'success', '凯旋献旗'),
          openScene('scene_hsq21_22', HUASHAN_Q21_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq21_22: {
    id: 'scene_hsq21_22',
    title: '第二十二幕 · 殿外狂风复进言',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿丹墀',
    mandatory: true,
    beats: [
      N('刚行至紫霞正气主殿丹墀前，封不弃眼见连出征归来的五十名气宗弟子都对你满怀崇敬、唯命是从，心头积压三十年的执念骤然翻涌，一步抢上拽住你的衣袖。'),
      S('NPC-0167', '（声音急促亢奋）“天赐良机啊！！如今拓跋雄死在你剑下，连高沧云和气宗弟子都服了你！进殿之后我便当众提议重选掌门，岳沧溟就算不愿退位，满殿人心向背也由不得他不让！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_23', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_23: {
    id: 'scene_hsq21_23',
    title: '第二十三幕 · 正色止师消旧执',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿丹墀',
    mandatory: true,
    beats: [
      N('殿内岳沧溟、秦烈山、宁清羽皆已听见殿阶前的动静，静静注视着你的一举一动。你轻轻拨开封不弃的手，向这位护犊情深的剑宗恩师郑重一揖。'),
      P('“封师叔，若今日弟子挟平虏之功逼退岳掌门，那便不是剑宗复兴，而是给下一个三十年的分裂埋下祸根！请师叔信弟子一回——华山之主，当以大义归心，绝不以刀兵相逼！”'),
      S('NPC-0167', '（浑身一震，怔怔看着你，紧握剑柄的手指终于缓缓松开）“……好，师叔听你的，半个字也不多说！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_24', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_24: {
    id: 'scene_hsq21_24',
    title: '第二十四幕 · 双步登殿敬先师',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('你整理染满征尘的衣冠，双手捧着那面焦黑染血的西夏征东帅旗，与高沧云并肩迈过门槛，径直走到华山历代创派祖师灵位之前躬身献上！'),
    ],
    onFinishEffects: [openScene('scene_hsq21_25', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_25: {
    id: 'scene_hsq21_25',
    title: '第二十五幕 · 献旗止争陈至理',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    illustrationUrl: '/assets/quests/hs_q21_present_banner.jpg',
    illustrationCaption: '献旗止争 · 拒封不弃逼宫之议，当殿献上敌酋战旗痛陈剑气互济之理',
    mandatory: true,
    beats: [
      P('“弟子幸不辱命，偕高师兄及两脉百名同门荡平风陵西夏大营、阵斩主帅拓跋雄，谨以此面敌酋帅旗祭告历代太华先师在天之灵！”'),
      N('你转过身来，目光澄澈如秋水长天，声音清朗传遍整座紫霞主殿内外——'),
      P('“昨夜风陵血战，弟子在千军万马中深悟一事：剑无气不长久，气无剑不锋芒！气为剑之根基脊梁，剑为气之神韵锋刃，本如阴阳两仪、互为表里。昔年先辈因一念偏执分作气剑两宗，实乃同根相煎；愿自今日始，华山唯有太岳门人，再无气剑私仇！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_26', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_26: {
    id: 'scene_hsq21_26',
    title: '第二十六幕 · 满堂动容三十载',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('“剑无气不长久，气无剑不锋芒”十二字落音，大殿内外寂静三息，旋即爆发出震耳欲聋的喝彩！'),
      S('NPC-0147', '（眼眶发热，重重一拍大腿）“说得好！！剑无气不长久，气无剑不锋芒！咱们老哥几个争了三十年面红耳赤，竟不如一个晚辈看得通透彻骨！”'),
      S('NPC-0166', '（拭去眼角泪光，欣然看向岳沧溟）“掌门师兄，当年先师临终遗愿便是盼华山重归完整，今日终于得偿所愿了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_27', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_27: {
    id: 'scene_hsq21_27',
    title: '第二十七幕 · 沧溟欣慰决禅让',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('岳沧溟仰望历代祖师灵位，长长吐出一口郁结胸中三十载的浊气，苍老面容之上绽放出无比释然、欣慰的笑容。'),
      S('NPC-0118', '“老夫苦守紫霞主殿三十余年，日夜唯恐剑宗以奇险邪剑毁了根基，亦愧未能化解同门心结。今日见你身怀《独孤九剑》绝世锋芒而不骄不逼，胸怀两仪归元之仁德——华山交到你手中，老夫便是九泉之下见列祖列宗，亦可含笑无愧了！”'),
      S('NPC-0118', '“传掌门法旨：即刻鸣太岳九钟，老夫今日当众禅让华山掌门大位！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_28', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_28: {
    id: 'scene_hsq21_28',
    title: '第二十八幕 · 欣然禅位奉双珍',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    illustrationUrl: '/assets/quests/hs_q21_abdicate_ceremony.jpg',
    illustrationCaption: '欣然禅位 · 岳沧溟老怀大慰亲传太岳紫霞剑，高沧云奉紫霞剑客衫',
    mandatory: true,
    beats: [
      N('九响浑厚庄严的太岳钟声回荡五峰云海！岳沧溟亲自解下佩带三十余载的镇派神兵《太岳紫霞长剑》，郑重交入你双掌之中！'),
      S('NPC-0202', '（同时微笑着捧上叠得整整齐齐的镇派宝衣《华山紫霞剑客衫》，向你恭敬大拜）“大师兄高沧云，谨代表气宗全体同门奉上紫霞宝衣，誓死辅佐新掌门光大西岳！”'),
      S('NPC-0167', '（老泪纵横，走上前与岳沧溟对视一眼，两位斗了半辈子的老人竟同时拱手一笑）“岳师兄高风亮节，封某佩服！我剑宗一脉，亦誓死拥戴新掌门！”'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'WPN-017', qty: 1 },
      { type: 'giveItem', itemId: 'ARM-015', qty: 1 },
      toast('岳沧溟亲传《太岳紫霞长剑》、高沧云奉上《华山紫霞剑客衫》！', 'success', '剑气信物'),
      openScene('scene_hsq21_29', HUASHAN_Q21_QUEST_ID),
    ],
  },

  scene_hsq21_29: {
    id: 'scene_hsq21_29',
    title: '第二十九幕 · 冰释前嫌订新章',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('你身披《华山紫霞剑客衫》，手佩《太岳紫霞长剑》，在岳沧溟、秦烈山、宁清羽、封不弃四位宿老共同见证下焚香礼拜祖师，当众颁布合派新制：'),
      P('“自今日起，华山武库合二为一！气宗子弟可入思过崖参研奇快剑招，剑宗子弟亦可入紫霞秘阁修习混元紫霞内功——内外兼修，剑气并尊！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_30', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_30: {
    id: 'scene_hsq21_30',
    title: '第三十幕 · 期约腊月论剑坛',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0118', '“内外兼修，剑气并尊！恰逢今冬腊月乃是六十年一遇的甲子大期，新掌门既合我华山三百年剑气之大成，正该重开落雁峰白玉论剑坛，遍邀天下宗师共证武道盛世！”'),
      P('“谨遵太上掌门之议！待大雪封山之日，我们便在西岳绝顶恭迎天下英雄！”'),
    ],
    onFinishEffects: [openScene('scene_hsq21_31', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_31: {
    id: 'scene_hsq21_31',
    title: '第三十一幕 · 两仪归元开盛世',
    subtitle: '玉女峰紫霞道观 · 东峰云海丹墀',
    illustrationUrl: '/assets/quests/hs_q21_harmony_master.jpg',
    illustrationCaption: '两仪归元 · 三十载纷争消弭，继任华山掌门开创剑气并尊盛世',
    mandatory: true,
    beats: [
      N('你缓步走出主殿，冬日暖阳洒满玉女、朝阳、落雁、莲花、五云五峰。丹墀之下，气宗紫绶与剑宗青锋交相辉映，数百名华山门人齐声山呼，三十载裂痕终化作太华千秋盛景！'),
    ],
    onFinishEffects: [openScene('scene_hsq21_32', HUASHAN_Q21_QUEST_ID)],
  },

  scene_hsq21_32: {
    id: 'scene_hsq21_32',
    title: '第三十二幕 · 西岳共主耀千秋',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('{reignYear}寒冬，西夏边患已靖，华山两仪归元。你执掌太岳印剑，以「华山剑气共主」之尊屹立秦川之巅，只待大雪封山之日登临绝顶论剑天下！'),
    ],
    choices: [
      {
        id: 'hsq21_ch_complete',
        label: '受禅执掌太岳玉印，正式晋升 Lv.5 华山剑气共主！',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-05', rank: 5, promoteOnly: true },
          { type: 'setFlag', flag: 'hs_ending', value: 'sword_harmony' },
          { type: 'giveSilver', amount: 450, reason: '剑气联师荡平风陵受禅继任共主贺仪' },
          { type: 'addSectContribution', amount: 320 },
          { type: 'giveCombatExp', amount: 500, reason: '九剑合紫霞斩杀拓跋雄弥合两脉' },
          { type: 'modifyChivalry', delta: 45, reason: '止同门干戈、靖关中边患，成两仪归元大义' },
          { type: 'modifyRenown', delta: 95, reason: '消弭华山三十载剑气之争，荣登西岳剑气共主' },
          { type: 'modifySkill', key: '琴', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0118' }, delta: 35 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0167' }, delta: 35 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0202' }, delta: 35 },
          { type: 'completeQuest', questId: HUASHAN_Q21_QUEST_ID, outcome: 'sword_harmony' },
          toast('恭喜荣登 Lv.5【华山剑气共主】！终章《西岳绝顶 · 华山论剑》现已开启！', 'success', '两仪归元'),
        ],
      },
    ],
  },
}
