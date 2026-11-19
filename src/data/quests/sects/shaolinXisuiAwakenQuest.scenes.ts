import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q36_QUEST_ID } from './shaolinXisuiAwakenQuest'

const SPEAKER_WULIN_SPECTATOR: StorySpeakerSpec = {
  kind: 'custom',
  name: '关中剑客 · 陆青云',
  title: '观礼群雄',
  factionName: '中原武林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_SHAOLIN_ATTENDANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '石室护侍僧 · 慧清',
  title: '达摩院护经僧',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

export const SHAOLIN_Q36_SCENES: Record<string, StorySceneDef> = {
  scene_slq36_01: {
    id: 'scene_slq36_01',
    title: '第一幕 · 幽谷寒霜',
    subtitle: '嵩山少林寺 · 达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山大雄宝殿前的喧嚣尚未散尽，达摩面壁石洞深处的幽谷石室却依旧寂静如太古。石室寒玉榻上，白眉垂颊的少林神僧【玄澄】闭目合十，听见你的脚步声，缓缓睁开了清澈却饱含沧桑的双眸。'),
      S('NPC-0109', '（声音微弱却透着洞彻人心的平静）“你来了。前山钟鼓坪上的事，慧清已一五一十禀告老衲了——玄慈师兄坦然认罪，鸠摩智以七十二绝技逼宫，天下群雄议论纷纷……千年少林，正值最危急存亡之秋。”'),
      P('（步至寒玉榻前合十深拜）“师伯明鉴。弟子虽暂以大义稳住群豪，然鸠摩智武功已臻宗师中品，且能连环施展多门少林绝技，若不能彻底识破其虚妄并将其击败，祖庭清誉终难挽回！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_02', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_02: {
    id: 'scene_slq36_02',
    title: '第二幕 · 老僧垂泪',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('玄澄静静凝视着你良久，忽然两行清泪顺着枯槁的眼角滑落，滴在冰冷的寒玉榻面上，化作两点晶莹霜珠。'),
      S('NPC-0109', '（老泪纵横，声带哽咽）“老衲当年号称少林两百年来第一武学奇才，贪功冒进、强练十三门绝技，却忘了以大慈大悲佛法化解戾气，落得一夜经脉尽废、枯坐寒玉榻数十载。今日寺门遭此大难，老衲却连下榻迎敌都做不到……实乃少林罪人！”'),
      P('（心中酸楚，连忙俯身宽慰）“师伯切莫自责！当年若非师伯在寒玉榻前以自身惨痛经历点醒弟子『武学障』之理，弟子岂能潜心钻研经义书法、走上慈悲禅院正途？师伯之教，弟子永铭于心！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_03', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_03: {
    id: 'scene_slq36_03',
    title: '第三幕 · 慈悲传灯',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      S('NPC-0109', '（拭去泪痕，眸中骤然泛起如佛灯长明般的欣慰光彩）“好孩子……你经义已臻九十化境，书法端方沉静，抗毒抗震之根基亦浑厚如岳，更重要的是——你在慈悲禅院潜修二十载，心中无半点贪嗔痴念，正是老衲等了一辈子的【洗髓真传】之主！”'),
      P('（心头微震，肃然聆听）“洗髓真传……师伯，难道是传说中与《易筋经》齐名的达摩祖师镇寺天阶至宝《洗髓经》？！”'),
      S('NPC-0109', '（微微颔首）“不错。《易筋经》改易凡胎筋骨，而《洗髓经》则直指神髓灵台、洗尽尘垢妄念。世人皆以为《洗髓经》早已失传于唐末兵燹，殊不知达摩祖师早已将总纲以古梵秘篆刻于后洞绝壁石刻之内，唯经义通玄、通晓古体书法者方能辨读！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_04', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_04: {
    id: 'scene_slq36_04',
    title: '第四幕 · 圣物相授',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('玄澄示意侍立一旁的慧清捧出一只沉香紫檀佛匣。佛匣开启刹那，幽暗石室内骤然弥漫出一股清雅檀香与温和澄澈的禅定微光！'),
      N('匣中静静躺着一串百八颗千年菩提子穿就的念珠，珠身温润如古玉，隐隐透着淡金佛光——正是少林历代高僧圆寂舍利温养而成的天阶圣物【少林舍利伽蓝念珠】！'),
      S('NPC-0109', '（颤巍巍抬起双臂，示意你俯身低首）“过来，让老衲亲手为你挂上这串舍利伽蓝念珠。”'),
    ],
    onFinishEffects: [openScene('scene_slq36_05', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_05: {
    id: 'scene_slq36_05',
    title: '第五幕 · 舍利伽蓝',
    subtitle: '幽谷石室 · 寒玉榻前',
    illustrationUrl: '/assets/quests/sl_36_sarira_beads.jpg',
    illustrationCaption: '幽谷石室寒玉榻前 · 玄澄老泪纵横，亲手将天阶圣物「少林舍利伽蓝念珠」挂于主角颈间',
    mandatory: true,
    beats: [
      N('玄澄亲手将【少林舍利伽蓝念珠】轻轻挂于你的颈间。念珠贴近胸口刹那，一股清凉如雪山甘泉的梵音灵光顺着膻中穴直透百会，令你数日来因少室山风波积聚的疲惫与烦忧瞬间烟消云散！'),
      S('NPC-0109', '（手掌轻轻按在你肩头，老泪盈眶却笑意安详）“善哉，善哉！此珠有『梵音清心』之效，可助你在达摩石壁前百日心斋禅定之际，不受心魔外障侵扰。去吧，推开绝壁暗门，将达摩祖师的《洗髓经》重现人间！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_06', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_06: {
    id: 'scene_slq36_06',
    title: '第六幕 · 石壁玄机',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      S('NPC-0109', '（细细叮嘱）“鸠摩智以诡异内功强催少林七十二绝技，虽能唬住寻常武人，却逃不过《洗髓经》『照见五蕴皆空、直指真气本源』的慧眼。你须沉下心神，莫急于一时胜负，先将自身凡髓洗尽，再回前山破其虚妄！”'),
      S(SPEAKER_SHAOLIN_ATTENDANT, '（合十低声道）“师兄放心，前山既有玄难、玄寂诸位师伯与寺中护法周旋，又有少室山群雄牵制，鸠摩智一时半刻不敢悍然屠寺。小僧会守在洞口外，绝不让外人惊扰师兄闭关！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_07', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_07: {
    id: 'scene_slq36_07',
    title: '第七幕 · 拜别神僧',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      P('（抚摸胸前温润生光的舍利伽蓝念珠，郑重三拜）“师伯大恩，弟子铭记五内！弟子必于达摩石壁前潜心参悟，不洗凡髓、不悟《洗髓经》，绝不出关！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_08', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_08: {
    id: 'scene_slq36_08',
    title: '第八幕 · 赴绝壁崖',
    subtitle: '达摩面壁石洞 · 暗道石阶',
    mandatory: true,
    beats: [
      N('你辞别寒玉榻前的玄澄师伯，循着石室后侧一条人迹罕至的青苔暗阶缓步下行，直赴【达摩面壁石洞 · 绝壁石刻 · 剑痕崖】。山风穿洞而过，宛如千年前达摩祖师面壁九年的低沉梵唱。'),
    ],
    choices: [
      {
        id: 'slq36_accept_quest',
        label: '携舍利伽蓝念珠，赴【达摩面壁石洞 · 绝壁石刻 · 剑痕崖】百日心斋',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q36_QUEST_ID, stepId: 'hundred_day_zen' },
          setStep(SHAOLIN_Q36_QUEST_ID, 'hundred_day_zen'),
          toast('已开启《寒玉百日 · 洗髓换骨》！请前往【绝壁石刻 · 剑痕崖】参悟洗髓真传！', 'talk', '寒玉百日'),
        ],
      },
    ],
  },

  scene_slq36_09: {
    id: 'scene_slq36_09',
    title: '第九幕 · 古梵秘篆',
    subtitle: '嵩山少林寺 · 达摩面壁石洞 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('步入绝壁石刻最深处，你依照玄澄师伯所授机括，轻按石壁佛莲暗印。一声低沉机括轻响，半丈青苔石壁缓缓移开，露出一方尘封五百年的暗凹石龛——石龛内壁竟密密麻麻刻满了古天竺悉昙梵文与北魏楷书双注！'),
      P('（凑近石壁，凝神辨识，眼中渐渐泛起震撼之色）“这……竟是达摩祖师亲笔口授、二祖慧可手书刻石的《洗髓经》真本！若非弟子通晓九十重经义与七十五重古碑书法，这些历经五百年风蚀的梵汉双文根本无从句读！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_10', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_10: {
    id: 'scene_slq36_10',
    title: '第十幕 · 摩壁校经',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('你以指尖轻抚冰冷石壁上的每一道刻痕，一字一句在心中反复校勘推演：'),
      N('“夫凡夫修武，唯求筋强力猛、招奇势霸，殊不知外劲愈盛，内浊愈深，终成武学大障。欲登无上菩提、证金刚不坏之神髓，必先以心斋寂照，洗去五脏六腑、奇经八脉百年积垢，使真气清澈如琉璃，方能洞见万法虚妄……”'),
      P('（心中豁然开朗，盘膝坐于石壁前寒石之上）“原来如此！世人练功是『增』，唯有《洗髓经》是『洗』！去伪存真，涤尽尘垢，方见本心！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_11', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_11: {
    id: 'scene_slq36_11',
    title: '第十一幕 · 达摩石壁',
    subtitle: '绝壁石刻 · 剑痕崖',
    illustrationUrl: '/assets/quests/sl_36_damo_wall.jpg',
    illustrationCaption: '达摩面壁石洞绝壁石刻 · 孤灯微明下以指摩挲五百年古梵洗髓秘篆',
    mandatory: true,
    beats: [
      N('你合上双目，双手结禅定印，胸前【少林舍利伽蓝念珠】随之发出极其细微、却如天籁般澄净的嗡鸣。自这一刻起，你彻底屏绝外缘，于达摩石壁之前展开【百日心斋禅定】！'),
    ],
    onFinishEffects: [openScene('scene_slq36_12', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_12: {
    id: 'scene_slq36_12',
    title: '第十二幕 · 三十日枯坐',
    subtitle: '绝壁石刻 · 心斋初境',
    mandatory: true,
    beats: [
      N('初三十日，寒风透骨，石洞滴水成冰。往日所修诸般少林招式、内劲、甚至前山群雄喧嚣与玄悲玄苦惨死之景，尽数如走马灯般在脑海翻腾不休！'),
      N('体内真气随之躁动奔涌，若非胸前舍利伽蓝念珠持续散出清凉梵音稳住灵台，加之你自身抗性深厚稳若磐石，险些便要走火入魔！'),
      P('（默诵《般若波罗蜜多心经》，吐出一口灼热浊气）“色即是空，空即是色……招式有形，执着为障。散去吧！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_13', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_13: {
    id: 'scene_slq36_13',
    title: '第十三幕 · 六十日伐毛',
    subtitle: '绝壁石刻 · 心斋中境',
    mandatory: true,
    beats: [
      N('第六十日，洞外已是瑞雪初降。你周身毛孔忽渗出细密如墨的腥臭浊汗，骨骼深处传来仿佛春冰初裂般的细微酥痒——那是二十年来强练高阶武学沉积在骨髓经脉中的暗伤与戾气，正在《洗髓经》无垢心法的冲刷下一点点剥离排出！'),
      N('呼吸渐渐微不可闻，心跳绵长如蛰龙冬眠，整个人竟仿佛与眼前五百年的达摩石壁融为一体。'),
    ],
    onFinishEffects: [openScene('scene_slq36_14', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_14: {
    id: 'scene_slq36_14',
    title: '第十四幕 · 九十日照见',
    subtitle: '绝壁石刻 · 心斋化境',
    mandatory: true,
    beats: [
      N('第九十日，心斋入定至极深之境。你灵台之中仿佛升起一轮纤尘不染的皓月，反观前山鸠摩智当日施展的「拈花指」「无相劫指」「般若掌」，竟在脑海中一帧帧清晰浮现——'),
      P('（神识清明如镜，蓦然洞彻天机）“我明白了！鸠摩智并非真懂佛门禅理，他体内运使的乃是一门道家至高无形内功——【小无相功】！他以小无相功无形无相之特性，强行模拟少林七十二绝技的运劲路线，外貌酷似九分，实则中空无骨、全靠一股虚妄巧劲维系！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_15', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_15: {
    id: 'scene_slq36_15',
    title: '第十五幕 · 百日圆满',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('第一百日黎明，一缕金红朝阳穿透云雾，恰好斜斜照在绝壁石刻正中。你缓缓睁开双眼，眸中神光内敛如古玉生辉，周身再无半点锋芒毕露的戾气，却自有一股渊渟岳峙、万法不侵的无上佛门宗师气度！'),
      N('丹田之中，洗髓真气如无垢琉璃之水缓缓流转，百脉俱通、脱胎换骨——失传数百年的少林天阶至宝【洗髓经】，已彻悟于心！'),
    ],
    onFinishEffects: [openScene('scene_slq36_16', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_16: {
    id: 'scene_slq36_16',
    title: '第十六幕 · 洗髓换骨',
    subtitle: '达摩面壁石洞 · 百日禅定功成',
    illustrationUrl: '/assets/quests/sl_36_hundred_day_zen.jpg',
    illustrationCaption: '达摩洞百日心斋禅定功成 · 晨曦透洞，舍利念珠流光映照，洗尽凡髓悟透《洗髓经》',
    mandatory: true,
    beats: [
      N('你起身轻拂僧袍上百日落尘，轻轻合上石壁暗门，对着五百年前达摩祖师面壁旧影深深三拜。'),
      P('（声音温润清越，却如春雷暗藏）“凡髓既洗，妄念已空。鸠摩智，该去前山了结这场虚妄之局了。”'),
    ],
    onFinishEffects: [openScene('scene_slq36_17', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_17: {
    id: 'scene_slq36_17',
    title: '第十七幕 · 慧清急报',
    subtitle: '绝壁石刻 · 洞口外',
    mandatory: true,
    beats: [
      N('甫一走出达摩石洞，一直守候在洞口外的护经僧【慧清】见你容光焕发、宛若换了一人，顿时喜极而泣，旋即又面露焦急！'),
      S(SPEAKER_SHAOLIN_ATTENDANT, '（合十急禀）“师兄终于出关了！大雄宝殿山坪上出大事了！鸠摩智在山门外盘桓多日，今日竟再度率吐蕃僧众闯上【钟鼓禅院 · 演武坪】，扬言少林既已无人敢战，今日便要亲手摘下少林寺匾额！”'),
      P('（微笑颔首，步履从容如履平地）“来得正好。慧清师弟，劳你回报玄澄师伯：弟子已悟透《洗髓经》，这便去演武坪请大轮明王下山！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_18', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_18: {
    id: 'scene_slq36_18',
    title: '第十八幕 · 缓步前山',
    subtitle: '达摩洞山道 · 钟声回荡',
    mandatory: true,
    beats: [
      N('你踏着少室山青石阶步步走向前山。每落一步，胸前舍利伽蓝念珠便微颤清鸣，体内《洗髓经》真气与天地灵气浑然交融，丝毫不觉半分急躁。'),
    ],
    choices: [
      {
        id: 'slq36_go_jiumozhi',
        label: '重返【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪】，拆穿并击退鸠摩智',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q36_QUEST_ID, 'break_jiumozhi'),
          toast('《洗髓经》已悟透！请前往【钟鼓禅院 · 演武坪】破除鸠摩智虚妄绝技！', 'success', '洗髓换骨'),
        ],
      },
    ],
  },

  scene_slq36_19: {
    id: 'scene_slq36_19',
    title: '第十九幕 · 坪前嚣焰',
    subtitle: '钟鼓禅院 · 演武坪外',
    mandatory: true,
    beats: [
      N('尚未踏入演武坪，便听见鸠摩智傲慢洪亮的笑声响彻山谷，夹杂着少林武僧愤怒的呵斥与群雄的窃窃私语。你加快脚步，身影如青莲浮水般飘然落于坪心！'),
    ],
    onFinishEffects: [openScene('scene_slq36_20', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_20: {
    id: 'scene_slq36_20',
    title: '第二十幕 · 明王再逼',
    subtitle: '嵩山少林寺 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('演武坪上，【鸠摩智】正负手立于石阶之上，身旁几名少林罗汉堂武僧嘴角溢血、被他一记「多罗叶指」震退。见你颈挂舍利念珠、从容步入场心，鸠摩智眼中闪过一丝轻蔑笑意。'),
      S('NPC-0113', '（合十哂笑）“小僧当是谁来了，原来是当日硬接丁春秋几掌的那位少林后辈。怎么，闭门躲了些日子，如今竟敢独自来领教小僧的少林七十二绝技了么？”'),
      P('（双掌合十，神色悲悯而宁静）“阿弥陀佛。明王远来是客，贫僧今日并非来与明王争强斗狠，只是见明王走入歧途、以虚妄外道强催佛门绝技，恐日后经脉逆乱走火入魔，特来点破迷津。”'),
    ],
    onFinishEffects: [openScene('scene_slq36_21', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_21: {
    id: 'scene_slq36_21',
    title: '第二十一幕 · 识破无相',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S('NPC-0113', '（笑容陡然一僵，冷声道）“一派胡言！小僧所施拈花指、无相劫指、般若掌皆乃货真价实的少林正宗绝技，何来『虚妄外道』之说？！”'),
      P('（声音清越如钟，响彻全场数千群雄耳畔）“明王不必自欺欺人了！你方才一指震退我寺师弟，起手确似『多罗叶指』，可真气行至膻中、手太阴肺经之际却陡然转虚为柔、以无形道家气劲强行托举——你所依仗的根本不是少林禅功，而是道家秘传的【小无相功】！”'),
      N('“小无相功”四字一出，鸠摩智脸色刹那剧变，如遭五雷轰顶！他万万没想到，自己隐瞒天下武林数十年的最大底牌，竟被眼前这位少林僧人一眼看穿！'),
    ],
    onFinishEffects: [openScene('scene_slq36_22', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_22: {
    id: 'scene_slq36_22',
    title: '第二十二幕 · 群雄大哗',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S(SPEAKER_WULIN_SPECTATOR, '（拍案惊呼）“什么？！大轮明王鸠摩智号称通晓少林七十二绝技，原来全是用道家《小无相功》伪装仿造的？！”'),
      S('NPC-0127', '（恍然大悟，抚掌大笑）“难怪！难怪他一人竟能连展五六门互不相容的绝技，却毫无佛门慈悲禅意！原来是画虎类犬、徒有其表！”'),
      S('NPC-0113', '（恼羞成怒，往日宝相庄严荡然无存，双掌骤然燃起灼热无形罡气）“住口！休得胡言乱语坏我清名！既然你自诩看穿了小僧根底，今日便叫你尝尝我小无相功催动七十二绝技与火焰刀的真正威力！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_23', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_23: {
    id: 'scene_slq36_23',
    title: '第二十三幕 · 破妄之战',
    subtitle: '钟鼓禅院 · 演武坪（宗师中品 · 决战大轮明王）',
    mandatory: true,
    beats: [
      N('鸠摩智怒极出手，明黄袈裟鼓荡如帆，小无相功催动拈花指、般若掌与无形火焰刀齐齐压来！你运转初成之《洗髓经》，胸前舍利伽蓝念珠光华流转，以无垢佛门真气迎击这位威震西域的吐蕃国师！'),
    ],
    choices: [
      {
        id: 'slq36_fight_jiumozhi',
        label: '以《洗髓经》破妄识真，在吐蕃国师【鸠摩智】攻势下撑住五回合！',
        subLabel: '宗师中品试锋：撑住 5 回合拆解小无相功虚妄根底，借势破功震退大轮明王',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q36_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0113',
              talkOverride:
                '“狂妄小僧！竟敢妄言小僧所施乃小无相功虚妄！今日便叫你死在少林七十二绝技之下！”',
            },
            rule: 'survive_rounds',
            maxRounds: 5,
            forbidEscapeReason: '此战关乎少林五百年正宗法统，唯有破妄退敌方能重振山门！',
            introText: '【破妄震敌】在吐蕃护国法王【鸠摩智】猛攻下撑住五回合，识破其小无相功破绽！',
            onWin: [openScene('scene_slq36_24', SHAOLIN_Q36_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 90, mpPct: 90 },
              toast('鸠摩智火焰刀与小无相功变化莫测，暂运《洗髓经》归元调息后再战！', 'warn', '破妄震敌'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq36_24: {
    id: 'scene_slq36_24',
    title: '第二十四幕 · 二十合破功',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('转眼已激战至第二十合！鸠摩智越打越是心惊——自己每变一门少林绝技，对方竟总能提前半拍点在自己小无相功转折换气的死穴之上，仿佛自己浑身破绽在对方清澈双眸中一览无余！'),
      P('（双掌轻合复又平推，洗髓无垢真气如雪山清泉奔涌而出，不带半分杀气，却直透鸠摩智膻中气海）“明王，小无相功强催佛门七十二绝技，根基已乱，还不醒悟？！”'),
      N('“蓬——！”一声沉闷如古钟长鸣的巨响！鸠摩智护体小无相罡气应声瓦解，整个人如断线风筝般倒飞两丈，落地连退七步，喉头一甜，“哇”地喷出一大口鲜血！'),
    ],
    onFinishEffects: [openScene('scene_slq36_25', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_25: {
    id: 'scene_slq36_25',
    title: '第二十五幕 · 明王吐血',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S('NPC-0113', '（捂着胸口单膝微屈，骇然失色地盯着你）“噗……好精纯的无垢佛门内功……竟能直接震散我的小无相功气脉……这……这难道是少林失传百年的《洗髓经》？！”'),
      N('满场数千群雄先是一片死寂，随即爆发出惊天动地的欢呼呐喊！少林数百僧众热泪盈眶，齐声高宣佛号，压抑多日的屈辱与阴霾一扫而空！'),
    ],
    onFinishEffects: [openScene('scene_slq36_26', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_26: {
    id: 'scene_slq36_26',
    title: '第二十六幕 · 退败下山',
    subtitle: '大雄宝殿山坪 · 破妄退敌',
    illustrationUrl: '/assets/quests/sl_36_defeat_jiumozhi.jpg',
    illustrationCaption: '大雄宝殿山坪 · 《洗髓经》二十合破尽小无相功虚妄，大轮明王鸠摩智吐血退败',
    mandatory: true,
    beats: [
      S('NPC-0113', '（擦去唇角血迹，脸色灰败中夹杂着深沉震骇，向你缓缓合十）“阿弥陀佛……中原少林果真卧虎藏龙。小僧贪求绝技、误入虚妄，今日败在《洗髓经》之下，心服口服……告辞！”'),
      N('说罢，大轮明王鸠摩智再无颜面留驻少室山，率吐蕃随从狼狈退下山道。连一旁观望的星宿老怪丁春秋见状，亦暗自心寒，悄悄收起羽扇退避三舍！'),
    ],
    onFinishEffects: [openScene('scene_slq36_27', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_27: {
    id: 'scene_slq36_27',
    title: '第二十七幕 · 全寺归心',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S('NPC-0127', '（大步上前，老怀大慰地连声赞叹）“善哉！善哉！失传数百年的《洗髓经》竟在你手中重现世间！二十合震退不可一世的吐蕃国师，今日之后，天下还有谁敢轻言我少林无人？！”'),
      S('NPC-0134', '（合十深揖）“此战不仅护住了少林千年清誉，更向天下武林昭示了我佛门『以慈悲化戾气、以真禅破虚妄』的无上大道！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_28', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_28: {
    id: 'scene_slq36_28',
    title: '第二十八幕 · 归报寒玉',
    subtitle: '达摩面壁石洞 · 幽谷石室',
    mandatory: true,
    beats: [
      N('山坪风波既平，你立刻重返幽谷石室寒玉榻前，将拆穿鸠摩智小无相功、二十合震退大轮明王的始末禀报【玄澄】师伯。'),
      S('NPC-0109', '（听罢抚掌大笑，眼中含泪却神采奕奕）“哈哈哈哈！好！好啊！老衲毕生所愿，便是见我少林慈悲禅院重兴、《洗髓经》后继有人！今朝得见你以无垢禅心破妄退敌，老衲纵使明日归西，亦再无半分遗憾了！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_29', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_29: {
    id: 'scene_slq36_29',
    title: '第二十九幕 · 念珠长明',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      S('NPC-0109', '（目光沉静地望向藏经阁方向）“只是鸠摩智虽退，潜伏藏经阁三十年的萧远山与幕后黑手尚未现身。你既身怀《洗髓经》与舍利伽蓝念珠，切记常持慈悲本心，少林最后的因果大劫，还须你去化解。”'),
      P('（合十躬身，目光清澈如水）“弟子谨记师伯教诲！”'),
    ],
    onFinishEffects: [openScene('scene_slq36_30', SHAOLIN_Q36_QUEST_ID)],
  },

  scene_slq36_30: {
    id: 'scene_slq36_30',
    title: '第三十幕 · 洗髓大成',
    subtitle: '嵩山少林寺 · 禅心无垢',
    mandatory: true,
    beats: [
      N('寒玉百日，洗髓换骨。你胸前【少林舍利伽蓝念珠】微光温润，体内天阶至宝《洗髓经》生生不息，从此跻身中原佛门无上宗师之列！'),
    ],
    choices: [
      {
        id: 'slq36_finish_reward',
        label: '谨受《洗髓经》真传与舍利伽蓝念珠，重振少林清誉（完成）',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-011', level: 1 },
          { type: 'giveItem', itemId: 'ACC-004', qty: 1 },
          {
            type: 'giveCombatExp',
            amount: 1400,
            reason: '达摩洞百日心斋悟透《洗髓经》，山坪二十合击破鸠摩智虚妄根底',
          },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '书', delta: 1 },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0109' },
            delta: 30,
          },
          { type: 'completeQuest', questId: SHAOLIN_Q36_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《寒玉百日 · 洗髓换骨》！习得天阶神功《洗髓经》、获赐天阶圣物「少林舍利伽蓝念珠」，经义 +2、书 +1、玄澄好感 +30！',
            'success',
            '洗髓换骨',
          ),
        ],
      },
    ],
  },
}
