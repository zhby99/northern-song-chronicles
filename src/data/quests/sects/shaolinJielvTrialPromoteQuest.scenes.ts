import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q16_QUEST_ID } from './shaolinJielvTrialPromoteQuest'

const SPEAKER_SHADOW_BLADE: StorySpeakerSpec = {
  kind: 'custom',
  name: '影刃客',
  title: '黑市一流杀手 · 灭口死士',
  factionName: '洛阳黑市',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

const SPEAKER_SHADOW_AIDE: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑市暗桩',
  title: '影刃客随从',
  factionName: '洛阳黑市',
  portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
}

function buildShadowBladeBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ16_SHADOW_BLADE',
    name: '影刃客',
    title: '黑市灭口杀手 · 暗影夺命',
    realm: '一流下品',
    factionName: '洛阳黑市',
    sectRank: 0,
    sectRankLabel: '黑市金牌杀手',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“拿人钱财，替人消灾！撞破了今夜少室后山的买卖，便只好请少林高徒与这小和尚一同坠崖封口了！”',
    stats: { hp: 2280, mp: 2020, agi: 60, res: 47 },
    talents: { bone: 86, comprehension: 84, charm: 42 },
    equippedArts: { neigong: 'MA-082', move1: 'MA-069', move2: 'MA-076' },
    learnedArts: [{ artId: 'MA-082', level: 8 }, { artId: 'MA-069', level: 8 }, { artId: 'MA-076', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq16_01: {
    id: 'scene_slq16_01',
    title: '第一幕 · 户部密查',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，寒风卷起漫山红叶。你拜入嵩山少林寺倏忽已历五载春秋，无论汝州执杖、汴京擒魔抑或郑州施药，皆令寺中上下交口称誉。然而这日暮色方沉，钟鼓禅院却弥漫着一股山雨欲来的肃杀之气。'),
      N('玄寂长老负手立于大钟之下，面色冷峻如铁，将一封加盖户部度支司火漆印信的密函递到你手中。'),
      S('NPC-0134', '（声音低沉凝重）“阿弥陀佛。朝廷户部清查河南道免税田赋，竟查出数十道本应归属我少林寺的官颁『空名度牒』流落洛阳豪绅之手！方丈师兄震怒，下令三堂彻查！”'),
      P('（心头一凛，瞬间想起数年前的香火黑账旧事）“私卖空名度牒？！师伯，此事莫非又与知客院有关？”'),
    ],
    onFinishEffects: [openScene('scene_slq16_02', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_02: {
    id: 'scene_slq16_02',
    title: '第二幕 · 虚清失踪',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S('NPC-0134', '“正是！今晨方丈召见知客禅师【玄净】问话，玄净竟一口咬定自己毫不知情，反诬称是平日替知客院抄录度牒底簿、保管印匣的苦行僧【虚清】监守自盗，且虚清此刻已畏罪潜逃！”'),
      S('NPC-0134', '（目中寒芒一闪）“虚清那孩子老衲看着长大，忠厚木讷、一世清贫，怎有胆量勾结洛阳豪绅？他此刻失踪，八成是遭人栽赃陷害、甚至已落入灭口杀局！方才巡山沙弥瞥见有陌生黑影潜往后山绝壁崖道——你武功最稳、心智最明，即刻星夜驰援后山，务必活捉凶徒、救下虚清！”'),
      P('（合十领命，杀意与正气并起）“弟子遵命！绝不容奸邪在少室山门下戕害同门！”'),
    ],
    choices: [
      {
        id: 'slq16_accept_rescue',
        label: '领戒律密谕，星夜驰援少室后山崖道营救虚清！',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q16_QUEST_ID, stepId: 'backmountain_rescue' },
          setStep(SHAOLIN_Q16_QUEST_ID, 'backmountain_rescue'),
          toast('已开启《戒台问罪 · 贪嗔痴慢》！星夜驰援少室后山营救苦行僧虚清！', 'talk', '后山截杀'),
          openScene('scene_slq16_03', SHAOLIN_Q16_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq16_03: {
    id: 'scene_slq16_03',
    title: '第三幕 · 松林杀声',
    subtitle: '少室后山 · 绝壁松林',
    mandatory: true,
    beats: [
      N('夜幕漆黑，冷月被乌云半掩。你施展轻功疾掠出后山小门，沿着陡峭湿滑的松林崖道飞奔不过二里，忽听前方悬崖枯松间传来一声凄厉闷哼与清脆兵刃破风之声！'),
      N('你提纵身形如苍鹰扑落，拨开浓密松枝，眼前一幕令你目眦欲裂！'),
    ],
    onFinishEffects: [openScene('scene_slq16_04', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_04: {
    id: 'scene_slq16_04',
    title: '第四幕 · 绝壁截杀',
    subtitle: '少室后山 · 绝壁崖道',
    illustrationUrl: '/assets/quests/sl_16_rescue_xuqing.jpg',
    illustrationCaption: '后山截杀 · 绝壁枯松之下，挺身力救怀抱印匣的苦行僧虚清',
    mandatory: true,
    beats: [
      N('只见苦行僧【虚清】左臂中刃血流如注，背靠万丈悬崖跌坐枯草之间，怀中却死死抱着一只朱漆铜扣木匣不肯撒手！'),
      N('三步之外，一名身着墨黑夜行衣、面覆铁鳞半面的瘦高杀手正提着一对森寒短刃缓步逼近，周身内息阴冷诡谲，赫然已臻一流下品之境！其身旁尚有一名黑市暗桩正欲上前抢夺木匣！'),
      P('（暴喝一声，掌风破空震退黑市暗桩，稳稳落在虚清身前）“住手！佛门清净地，何方鼠辈敢行灭口之事！”'),
    ],
    onFinishEffects: [openScene('scene_slq16_05', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_05: {
    id: 'scene_slq16_05',
    title: '第五幕 · 虚清血诉',
    subtitle: '少室后山 · 绝壁崖道',
    mandatory: true,
    beats: [
      S('NPC-0789', '（见你赶到，泪水混着血污滚落，死死护住怀中木匣嘶声呼救）“师兄救命！是玄净师叔！户部查账风声一紧，他便逼我签字画押替他顶罪！我不肯从，他便骗我来后山取经，暗中雇了黑市杀手要将我连同匣中真底簿一并推下悬崖灭口！”'),
      S(SPEAKER_SHADOW_AIDE, '（捂着被震麻的胸口连退数步，惊呼）“影爷，少林戒律院的高手追来了！”'),
    ],
    onFinishEffects: [openScene('scene_slq16_06', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_06: {
    id: 'scene_slq16_06',
    title: '第六幕 · 影刃现身',
    subtitle: '少室后山 · 绝壁崖道',
    mandatory: true,
    beats: [
      S(SPEAKER_SHADOW_BLADE, '（抬手挥退暗桩，铁面之下双目阴寒如毒蛇）“无妨。洛阳黑市金牌杀手『影刃客』接下的买卖，从未留过活口。多杀一个少林内门僧人，不过再向玄净那老和尚多加五百两黄金罢了！”'),
      P('（冷然以对，内息贯通周身）“既敢自报玄净雇主之名，今夜贫僧便留你活口，明日大雄正殿戒台之上，由你亲自向方丈与三堂高僧供述！”'),
      S(SPEAKER_SHADOW_BLADE, '“狂妄小僧！看你接不接得住我的无影夺命双刃！”'),
    ],
    onFinishEffects: [openScene('scene_slq16_07', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_07: {
    id: 'scene_slq16_07',
    title: '第七幕 · 崖边生死战',
    subtitle: '少室后山崖道（一流强敌实战）',
    mandatory: true,
    beats: [
      N('冷月穿云，影刃客身形骤然化作数道幽暗残影，双短刃挟着诡异暗器毒风疾刺要害！此人乃你平生所遇最凶险之一流刺客，稍有疏忽便将身死崖底！'),
    ],
    choices: [
      {
        id: 'slq16_fight_shadow_blade',
        label: '倾尽五年禅武所学，迎战黑市一流杀手【影刃客】！（一流下品 · 实战）',
        subLabel: '护住苦行僧虚清，生擒影刃客以获铁证',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q16_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShadowBladeBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '身后便是重伤的虚清师弟与万丈绝壁，绝不可退让半步！',
            introText: '【少室后山截杀】迎战黑市金牌杀手【影刃客】（一流下品），护下虚清夺取铁证！',
            onWin: [openScene('scene_slq16_08', SHAOLIN_Q16_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('影刃客身法诡谲、暗器狠毒！暂借枯松掩护抽身调息后再赴后山截杀！', 'warn', '后山截杀'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq16_08: {
    id: 'scene_slq16_08',
    title: '第八幕 · 破影擒凶',
    subtitle: '少室后山 · 绝壁崖道',
    mandatory: true,
    beats: [
      N('绝壁松林间劲风撕裂夜雾！你以《普门杖法》守御滴水不漏，破尽影刃客连环诡刺与透骨暗钉；待其力竭回气一瞬，左手《一拍两散掌》轰碎其护身短刃，右手《拈花指》疾点其肩井、气海大穴！'),
      S(SPEAKER_SHADOW_BLADE, '（双刃脱手坠落悬崖，跪地吐血骇然失色）“少林七十二绝技……一拍两散掌与拈花指……你绝非寻常内门弟子！”'),
      N('你沉着上前封死影刃客周身经脉，自其怀中搜出一封加盖知客院私印、玄净亲笔签押的雇凶密信与两百两黑市订金银票！一旁黑市暗桩见势不妙早已滚下山坡逃之夭夭。'),
    ],
    onFinishEffects: [openScene('scene_slq16_09', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_09: {
    id: 'scene_slq16_09',
    title: '第九幕 · 人证物证',
    subtitle: '少室后山崖道',
    mandatory: true,
    beats: [
      N('你连忙为虚清以拈花指点穴止血，敷上随身携带的金疮药。虚清颤抖着打开怀中朱漆木匣——里面赫然是一整套他三年来暗中留底的《真伪度牒核对底簿》与玄净私刻假印拓片！'),
      S('NPC-0789', '（泣不成声）“师兄大恩！我虽人微言轻，却不忍看少林千年清誉毁于玄净之手，这才冒死暗中留底……如今既有底簿又有这黑市杀手活口，天亮后定能在方丈座前揭穿他！”'),
      P('（扶起虚清，押起影刃客，望向灯火渐明的大雄宝殿方向）“走！咱们这便直奔【大雄正殿 · 佛前蒲团】，请方丈与三堂高僧升堂问罪！”'),
    ],
    choices: [
      {
        id: 'slq16_go_trial',
        label: '护送虚清、押解影刃客，前往【大雄正殿 · 佛前蒲团】三堂会审！',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q16_QUEST_ID, 'daxiong_jietai_trial'),
          toast(
            '人证物证俱全！请前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团】开启三堂会审！',
            'success',
            '三堂会审',
          ),
        ],
      },
    ],
  },

  scene_slq16_10: {
    id: 'scene_slq16_10',
    title: '第十幕 · 戒台钟鸣',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('次日卯时，少林大雄宝殿青铜巨钟连叩十八响，响彻嵩山群峰。三堂会审法坛高设于金身大佛之前！'),
      N('方丈【玄慈】身披大红金丝袈裟居中端坐，戒律院主【玄寂】手执紫铜禅杖肃立东阶，罗汉、达摩、药王诸堂长老齐聚两侧。殿下，知客禅师【玄净】双手合十、面露悲悯，正侃侃而谈。'),
      S('NPC-0193', '（叹息摇头，装出一副痛心疾首之态）“启禀方丈师兄与诸位师兄，皆是老衲御下不严！那苦行僧虚清贪财胆大，偷盗知客院空白度牒私卖牟利，昨夜闻风便已畏罪潜逃！老衲自愿领受失察之罚，恳请戒律院海捕虚清归案！”'),
    ],
    onFinishEffects: [openScene('scene_slq16_11', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_11: {
    id: 'scene_slq16_11',
    title: '第十一幕 · 殿前对质',
    subtitle: '大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_16_jietai_trial.jpg',
    illustrationCaption: '戒台问罪 · 大雄正殿三堂会审，携虚清与影刃客当堂对质玄净',
    mandatory: true,
    beats: [
      P('（大步踏入大雄正殿门槛，声音清朗震彻殿宇）“阿弥陀佛！玄净师叔且慢——虚清师弟并未畏罪潜逃，而是险些死在师叔暗雇的黑市杀手刀下！”'),
      N('话音落处，四名戒律武僧押着五花大绑的影刃客步入大殿，满身缠着绷带的苦行僧虚清紧随其后，手捧朱漆木匣高举过顶！'),
      S('NPC-0193', '（猛然回头，看清影刃客与虚清俱活着站在佛前，刹那间面无人色、紫檀念珠“啪”地崩断撒落一地！）“你……你们……怎么可能？！”'),
    ],
    onFinishEffects: [openScene('scene_slq16_12', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_12: {
    id: 'scene_slq16_12',
    title: '第十二幕 · 铁证如山',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('你缓步上前，将《真伪度牒核对底簿》、玄净亲笔雇凶密信及黑市银票双手呈于方丈玄慈与玄寂案前，旋即转身面向满殿高僧，凭多年精修的书法与辩才条分缕析！'),
      P('“启禀方丈师伯、玄寂师伯！其一，虚清师弟所存底簿逐笔载明三十六道空名度牒去向与私印编号，与户部密函分毫不差；其二，黑市杀手影刃客怀中所搜雇凶密信，其笔锋转折、落款私印与玄净师叔历年所书知客院文牒如出一辙；其三，影刃客活口在此，人证物证俱全！”'),
      S('NPC-0112', '（逐一检视密信与底簿，原本慈祥的面容此刻震怒如金刚怒目）“玄净师弟！身为少林知客禅师，贪财卖牒已属重罪，竟还敢嫁祸清白后辈、雇凶残害同门！你还有何话说？！”'),
    ],
    onFinishEffects: [openScene('scene_slq16_13', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_13: {
    id: 'scene_slq16_13',
    title: '第十三幕 · 贪嗔痴慢',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('眼见铁证如山、退路尽绝，玄净脸上的慈眉善目彻底崩塌，露出一副穷途末路的狰狞神色，竟指着你的鼻子嘶声狂笑起来！'),
      S('NPC-0193', '“哈哈哈哈！好一个大义凛然的戒律院高徒！你满口佛法清规，可敢当着方丈与满殿高僧的面，说说你当年是怎么进的少林山门，又跟我玄净有过什么勾当么？！”'),
    ],
    onFinishEffects: [
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_xuanjing_debt', op: 'truthy' },
        thenEffects: [openScene('scene_slq16_14', SHAOLIN_Q16_QUEST_ID)],
        elseEffects: [openScene('scene_slq16_15', SHAOLIN_Q16_QUEST_ID)],
      },
    ],
  },

  scene_slq16_14: {
    id: 'scene_slq16_14',
    title: '第十四幕 · 坦诚涤罪',
    subtitle: '大雄正殿（旧账回扣 · 坦荡承过）',
    mandatory: true,
    beats: [
      S('NPC-0193', '（目露怨毒，尖声咆哮）“诸位师兄听真了！数年前他尚在外门之时，便曾查获过我的香火私册，却为了掩盖自己当年托牙人递银入寺的污点，亲手替我将那本私册投入铜炉焚毁，还收了我三百两封口银子！他自己手脚就不干净，凭什么站在戒台上审我？！”'),
      N('满殿僧众闻言哗然，玄寂眉峰紧锁，玄慈方丈亦抬眸深深望向你。'),
      P('（神色竟无半分慌乱，反倒对着大佛与方丈坦然屈膝长跪，朗声道）“玄净师叔所言不虚！数年前弟子年少涉世未深、求艺心切，确曾受师叔胁迫与利诱犯下焚账收银大错，此事五年来无日不愧疚于心！然知错能改、善莫大焉——弟子今日冒死救下虚清、揭穿雇凶真相，正是为了彻底斩断当年业障！护寺大义在前，弟子甘愿在审结此案后自领戒律院杖责，绝不徇私！”'),
      S('NPC-0112', '（凝视你良久，长叹一声，目中反倒露出深沉赞许）“阿弥陀佛。凡夫畏果，菩萨畏因。当年一念之差，今日以命相搏挽回祖庭清誉并敢当众自承其过——这份坦荡与担当，远胜巧言令色之辈！”'),
    ],
    onFinishEffects: [openScene('scene_slq16_16', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_15: {
    id: 'scene_slq16_15',
    title: '第十五幕 · 清风折奸',
    subtitle: '大雄正殿（正气回扣 · 凛然折邪）',
    mandatory: true,
    beats: [
      S('NPC-0193', '（歇斯底里地指向你）“少装什么高僧！你当年初入少林，还不是托洛阳牙人贾通宝递了香火银才进的外门？如今不过是公报私仇、故意构陷老衲罢了！”'),
      P('（昂然直视玄净，声音掷地有声，字字珠玑）“阿弥陀佛！玄净师叔好生健忘——数年前弟子在外门查获你的《知客院香火私册》之时，便已当着玄苦、玄难二位长老之面坦然自承当年托牙人入寺旧过，二位长老念我大义清查、早已判作功过相抵！”'),
      P('“彼时祖庭宽宏大量，念你早年微功仅削你部分实权、未将你逐出山门，期盼你痛改前非！谁料师叔不知忏悔，反而贪嗔痴慢四毒愈炽，今日竟敢勾结黑市一流杀手戕害同门！这般行径，岂是『公报私仇』四字所能遮羞？！”'),
      N('满殿高僧闻言齐声宣佛号，无不为你的凛然辩才与清风正气所折服！'),
    ],
    onFinishEffects: [openScene('scene_slq16_16', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_16: {
    id: 'scene_slq16_16',
    title: '第十六幕 · 奸邪伏法',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0789', '（伏地泣血指证）“方丈明鉴！玄净师叔不仅私卖度牒，还威胁要将知情沙弥尽数除名灭口，弟子句句属实，敢对佛祖金身起誓！”'),
      S(SPEAKER_SHADOW_BLADE, '（冷笑一声，干脆利落招供）“不错，出千两黄金买这小和尚性命的正是这位玄净大师！银票印信俱在，老子认栽！”'),
      N('玄净彻底哑口无言，浑身力气仿佛被抽干一般，面如死灰地瘫软在青石砖上，再也发不出半点声响。'),
    ],
    onFinishEffects: [openScene('scene_slq16_17', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_17: {
    id: 'scene_slq16_17',
    title: '第十七幕 · 方丈宣判',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0112', '（缓缓起身，面朝如来金身合十长叹，声若洪钟宣告三堂合议法谕）“阿弥陀佛！善恶到头终有报，佛门清净岂容贪嗔痴慢横行！”'),
      S('NPC-0112', '“玄净身为少林知客禅师，倒卖朝廷空名度牒、嫁祸清白同门、雇凶行刺灭口，罪无可恕！今日三堂合议决断：即刻削去玄净知客职司与一切堂口权柄，封禁内力三成，发配后山思过崖苦役二十年，非死不得下山！其贪墨所得数千两私银悉数充公，交还户部并赈济河南道灾民！至于影刃客，押送洛阳府衙按大宋刑律明正典刑！”'),
    ],
    onFinishEffects: [openScene('scene_slq16_18', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_18: {
    id: 'scene_slq16_18',
    title: '第十八幕 · 沉冤昭雪',
    subtitle: '大雄正殿',
    mandatory: true,
    beats: [
      N('数名戒律武僧上前将失魂落魄的玄净与影刃客押出大殿。多年盘踞知客院的一颗毒瘤，今日终于彻底拔除！'),
      S('NPC-0789', '（重重向你磕了三个响头，热泪盈眶）“多谢师兄救命与雪冤之恩！虚清此生必谨守戒律、勤修佛法，绝不辜负师兄与祖庭！”'),
      N('玄慈方丈嘉许虚清临危护证之忠义，命药王院妥善医治其刀伤并调入藏经院静修，虚清欢喜拜谢而去。'),
    ],
    onFinishEffects: [openScene('scene_slq16_19', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_19: {
    id: 'scene_slq16_19',
    title: '第十九幕 · 五载功业',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('殿内肃静下来，檀香袅袅升腾。玄寂长老手持紫铜禅杖越众而出，向方丈玄慈郑重合十举荐。'),
      S('NPC-0134', '“启禀方丈师兄！我戒律药王一脉这位弟子入寺五载以来：先于汝州山神庙以《普门杖法》明断清规；继赴东京开封以《一拍两散掌》生擒西夏铁罗汉洗刷少林蒙冤；去年黄河水患更随玄生师弟驰赴郑州，以《拈花指》救治染瘴百姓数百、力破太行溃匪；今日复冒死截杀一流死士、戒台折奸肃清门风！”'),
      S('NPC-0134', '“论武功、论经义、论气节、论慈悲，此子皆已堪当大任！老衲恳请方丈师兄准其晋升——少林派【戒律院真传弟子】！”'),
    ],
    onFinishEffects: [openScene('scene_slq16_20', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_20: {
    id: 'scene_slq16_20',
    title: '第二十幕 · 紫衣真传',
    subtitle: '大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_16_jielv_zhenchuan.jpg',
    illustrationCaption: '戒律真传 · 大雄正殿佛光之下，玄慈方丈亲授戒律院真传法衣与禅杖',
    mandatory: true,
    beats: [
      S('NPC-0112', '（含笑走下法座，亲手自礼盘捧起一袭紫边戒律真传僧衣与真传度牒，披于你肩头）“善哉，善哉！少林千年薪火，正赖如你这般悲智双运、铁骨铮铮的后起之秀承继！今日老衲做主，正式擢升你为少林派【戒律院真传弟子】！”'),
      N('满殿三堂高僧齐声合十宣诵佛号，声浪如海潮般回荡在宏伟的大雄正殿之中！'),
    ],
    onFinishEffects: [openScene('scene_slq16_21', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_21: {
    id: 'scene_slq16_21',
    title: '第二十一幕 · 佛前嘱托',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0112', '（目光深邃望向殿外苍茫嵩岳，温言叮嘱）“既入真传之列，便不仅是少林弟子，更是天下武林正道栋梁。如今天下看似太平，实则北辽西夏暗流汹涌，江湖魔氛渐起。望你常持戒律之心、永怀药王之仁，护法安民，不堕少林威名！”'),
      P('（双手合十深深一拜，神色沉毅如磐石）“弟子谨遵方丈师伯与玄寂师伯法谕！无论前路风云如何变幻，必以手中禅杖、掌中绝艺，守佛门清规、护苍生安泰！”'),
    ],
    onFinishEffects: [openScene('scene_slq16_22', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_22: {
    id: 'scene_slq16_22',
    title: '第二十二幕 · 清规永驻',
    subtitle: '大雄正殿 · 佛前蒲团（真传晋升结局）',
    mandatory: true,
    beats: [
      N('晨光透入大雄正殿高窗，洒落在你新披的紫边真传僧衣之上。五年寒暑磨砺，你终以铁骨仁心执掌戒律真传之位，而更波澜壮阔的北宋江湖风云，正待你踏步前行！'),
    ],
    choices: [
      {
        id: 'slq16_finish_promote',
        label: '合十谢过玄慈方丈与玄寂师伯，晋升【戒律院真传弟子】！（完成《戒台问罪 · 贪嗔痴慢》）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 3, promoteOnly: true },
          { type: 'giveCombatExp', amount: 550, reason: '少室后山力擒黑市一流杀手影刃客，戒台肃清门风' },
          { type: 'addSectContribution', amount: 240 },
          { type: 'modifyRenown', delta: 80, reason: '三堂会审肃清知客黑幕，荣膺少林戒律院真传弟子' },
          { type: 'modifySkill', key: '辩才', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0112' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_Q16_QUEST_ID, outcome: 'completed' },
          toast(
            '恭喜晋升少林派 Lv.3【戒律院真传弟子】！获 550 实战经验、240 门派贡献与 80 江湖声望！',
            'success',
            '戒律真传',
          ),
        ],
      },
    ],
  },
}
