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
    learnedArts: [
      { artId: 'MA-082', level: 8 },
      { artId: 'MA-069', level: 8 },
      { artId: 'MA-076', level: 7 },
    ],
  })
}

function buildShadowBladeInterceptedBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ16_SHADOW_BLADE_INTERCEPT',
    name: '影刃客',
    title: '黑市灭口杀手 · 暗器被破',
    realm: '一流下品',
    factionName: '洛阳黑市',
    sectRank: 0,
    sectRankLabel: '黑市金牌杀手',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“好快的拈花截脉指风，竟打散了老子的透骨暗钉！少林小僧，今日接我双刃真功夫！”',
    stats: { hp: 2080, mp: 1860, agi: 56, res: 44 },
    talents: { bone: 86, comprehension: 84, charm: 42 },
    equippedArts: { neigong: 'MA-082', move1: 'MA-069', move2: 'MA-076' },
    learnedArts: [
      { artId: 'MA-082', level: 7 },
      { artId: 'MA-069', level: 8 },
      { artId: 'MA-076', level: 7 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq16_01: {
    id: 'scene_slq16_01',
    title: '第一幕 · 户部密查',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，寒风卷起漫山红叶。你历汝州执杖、汴京擒魔、郑州施药三桩大案，早已成为戒律药王一脉中坚。这日暮色方沉，玄寂长老负手立于大钟之下，面色冷峻如铁，将一封加盖户部度支司火漆的密函递入你手。'),
      S('NPC-0134', '（声音低沉如雷）“阿弥陀佛。朝廷户部清查河南道免税田赋，查出数十道本属我少林常住的官颁『空名度牒』流落洛阳豪绅之手！方丈震怒下令三堂彻查，今晨召知客禅师【玄净】问话，他竟反诬是替知客院抄录底簿的苦行僧【虚清】监守自盗、畏罪潜逃！”'),
      S('NPC-0134', '（目中寒芒骤闪）“虚清那孩子忠厚木讷、一世清贫，怎敢勾结洛阳豪绅？他此刻失踪，八成已遭栽赃陷害、落入灭口杀局！方才巡山沙弥瞥见有陌生黑影潜往后山绝壁崖道——你即刻星夜驰援后山，活捉凶徒、救下虚清！”'),
      P('（心头一凛，当年香火黑账旧影倏然掠过脑海，合十凛然领命）“弟子遵命！绝不容奸邪在少室山门下戕害同门！”'),
    ],
    choices: [
      {
        id: 'slq16_accept_rescue',
        label: '领戒律密谕，星夜驰援少室后山绝壁营救虚清！',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q16_QUEST_ID, stepId: 'backmountain_rescue' },
          setStep(SHAOLIN_Q16_QUEST_ID, 'backmountain_rescue'),
          toast('已开启《戒台问罪 · 贪嗔痴慢》！星夜驰援少室后山营救苦行僧虚清！', 'talk', '后山截杀'),
          openScene('scene_slq16_02', SHAOLIN_Q16_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq16_02: {
    id: 'scene_slq16_02',
    title: '第二幕 · 绝壁截杀',
    subtitle: '少室后山 · 绝壁崖道（一流强敌实战）',
    illustrationUrl: '/assets/quests/sl_16_rescue_xuqing.jpg',
    illustrationCaption: '后山截杀 · 绝壁枯松之下，挺身力救怀抱印匣的苦行僧虚清',
    mandatory: true,
    beats: [
      N('冷月穿云，松林崖道陡峭湿滑。你疾掠二里忽闻悬崖枯松间传来惨哼与兵刃破风之声，飞身扑落，只见苦行僧【虚清】左臂中刃血流如注，背靠万丈深渊跌坐枯草间，怀中死死抱着一只朱漆铜扣木匣！'),
      S('NPC-0789', '（泪血交迸，嘶声呼救）“师兄救命！是玄净师叔！户部查账风声一紧，他逼我签字顶罪！我不肯从，他便骗我来后山取经，暗雇黑市一流杀手要将我连同匣中真底簿一并推下悬崖灭口！”'),
      S(SPEAKER_SHADOW_AIDE, '（被你落地掌风震退数步，捂胸惊呼）“影爷，少林戒律院的高手追来了！”'),
      S(SPEAKER_SHADOW_BLADE, '（墨黑夜行衣、铁鳞半面，一对寒刃煞气冲霄）“无妨。洛阳黑市金牌杀手『影刃客』接下的买卖从未留过活口。多杀一个少林内门僧，不过再向玄净那老和尚多加五百两黄金罢了——看刃！”'),
      N('影刃客已臻一流下品之境，腕间暗藏透骨毒钉，身形倏然化作数道残影疾扑而来！'),
    ],
    choices: [
      {
        id: 'slq16_fight_intercept',
        label: '【拈花截影 · 先破暗器】抢占枯松高枝，以《拈花指》打散其毒钉先机再战影刃客！',
        subLabel: '需实战身法 ≥ 55 或《拈花指》≥ 3 重 · 破其暗器先手、力擒一流杀手',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'combatStatAtLeast', key: 'agility', min: 55 },
            { type: 'learnedArtAtLeast', artId: 'MA-063', minLevel: 3 },
          ],
          hint: '需实战身法 ≥ 55 或《拈花指》达三重以上',
        },
        effects: [
          toast('你借松影疾掠抢占先机，三记拈花指风精准击落影刃客袖中暗钉，破其杀招起手！', 'success', '拈花截影'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q16_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShadowBladeInterceptedBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '身后便是重伤的虚清师弟与万丈绝壁，绝不可退让半步！',
            introText: '【少室后山截杀 · 抢破先机】迎战黑市一流杀手【影刃客】，生擒活口夺铁证！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq16_03', SHAOLIN_Q16_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('影刃客身法诡谲双刃狠毒！暂借枯松掩护抽身调息后再赴后山截杀！', 'warn', '后山截杀'),
            ],
          },
        ],
      },
      {
        id: 'slq16_fight_direct',
        label: '【守正持杖 · 护人血战】稳守虚清身前，倾尽禅武所学正面迎战影刃客！（一流下品）',
        subLabel: '无门槛正攻 · 迎战全盛黑市一流杀手影刃客，生擒活口',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q16_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShadowBladeBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '身后便是重伤的虚清师弟与万丈绝壁，绝不可退让半步！',
            introText: '【少室后山截杀】迎战黑市金牌杀手【影刃客】（一流下品），护下虚清夺取铁证！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq16_03', SHAOLIN_Q16_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('影刃客身法诡谲、暗器狠毒！暂借枯松掩护抽身调息后再赴后山截杀！', 'warn', '后山截杀'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq16_03: {
    id: 'scene_slq16_03',
    title: '第三幕 · 破影搜证',
    subtitle: '少室后山崖道 · 人证物证俱全',
    mandatory: true,
    beats: [
      N('绝壁松林间劲风撕裂夜雾！你以《普门杖法》守御滴水不漏，寻隙左手《一拍两散掌》轰碎影刃客短刃，右手《拈花指》疾点其肩井、气海大穴！影刃客双刃坠崖、跪地吐血骇然失色，黑市暗桩见势不妙早已滚坡逃窜。'),
      N('你封死影刃客经脉，又替虚清点穴止血敷上金疮药，逐一清点截获的证物：其一，自影刃客贴身衣袋中搜出一封带『净』字蜡封、附着「洛阳南市 · 恒通盐栈」汇票存根的雇凶密信，与虚清朱漆木匣内三年《真伪度牒核对底簿》严丝合缝；其二，影刃客荷包中几枚寻常无名碎银；其三，虚清随身带着的知客院普通米面斋单。'),
      S('NPC-0789', '（紧抱木匣泣不成声）“师兄大恩！我虽人微言轻，却不忍看少林千年清誉毁于玄净之手，这才冒死暗中留底……如今既有底簿密信又有杀手活口，天亮定能在大雄正殿揭穿他！”'),
      P('（扶起虚清、押起影刃客，望向渐泛鱼肚白的大雄宝殿）“走！咱们直奔【大雄正殿 · 佛前蒲团】，请方丈与三堂高僧升堂公审！”'),
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

  scene_slq16_04: {
    id: 'scene_slq16_04',
    title: '第四幕 · 戒台质证（第一轮）',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（公堂呈证）',
    illustrationUrl: '/assets/quests/sl_16_jietai_trial.jpg',
    illustrationCaption: '戒台问罪 · 大雄正殿三堂会审，携虚清与影刃客当堂对质玄净',
    mandatory: true,
    beats: [
      N('次日卯时，大雄宝殿青铜巨钟连叩十八响，三堂会审法坛高设于金身如来之前！方丈【玄慈】身披大红金丝袈裟居中端坐，【玄寂】执紫铜禅杖肃立东阶，【玄苦】与诸堂长老齐聚两侧。玄净正满脸痛心疾首地向方丈奏称虚清盗卖度牒畏罪潜逃。'),
      P('（大步踏入殿门，清朗声震梁宇）“阿弥陀佛！玄净师叔且慢——虚清师弟并未潜逃，而是险些死在师叔暗雇的黑市杀手刀下！”'),
      N('戒律武僧押着五花大绑的影刃客步入大殿，裹伤的虚清高举朱漆木匣紧随其后！玄净瞳孔骤缩，却仍强作镇定冷笑辩驳：“荒唐！一个盗牒逃僧串通山外贼人胡乱攀咬，便想构陷老衲？你口口声声称老衲卖牒雇凶，试问堂上诸位师兄——可有一件无可抵赖的致命铁证？！”'),
      S('NPC-0112', '（双目如电扫视殿下，沉声发问）“三堂会审，首重铁证。戒律院弟子，你且当堂呈上最足以钉死玄净之关键证物！”'),
    ],
    choices: [
      {
        id: 'slq16_evidence_letter',
        label: '呈上虚清底簿与带『净』字蜡封、洛阳南市恒通盐栈汇票存根的雇凶密信当堂对印！',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q16_trial_perfect', value: true },
          openScene('scene_slq16_05_perfect', SHAOLIN_Q16_QUEST_ID),
        ],
      },
      {
        id: 'slq16_evidence_silver',
        label: '呈上自影刃客荷包里搜出的几枚无名碎银，指认其乃知客院买凶订金！',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q16_trial_perfect', value: false },
          openScene('scene_slq16_05_stumble', SHAOLIN_Q16_QUEST_ID),
        ],
      },
      {
        id: 'slq16_evidence_menu',
        label: '呈上虚清随身携带的知客院普通米面斋单，指斥玄净平日寺务账目浮夸！',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q16_trial_perfect', value: false },
          openScene('scene_slq16_05_stumble', SHAOLIN_Q16_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq16_05_perfect: {
    id: 'scene_slq16_05_perfect',
    title: '第五幕 · 铁证折奸',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（双手将雇凶密信、恒通盐栈汇票存根与《真伪度牒核对底簿》高举过顶，字字如刀）“启禀方丈与诸位师祖！其一，密信所钤『净』字私蜡封与知客院历年公文花押分毫不差；其二，洛阳南市恒通盐栈汇票存根数额与底簿中三十六道空名度牒暗号严丝合缝，与户部密函一一互印！”'),
      N('“啪——！”玄净手中紫檀念珠骤然崩断，珠粒滚落青砖四散作响！方丈玄慈逐一核验蜡封与存根，慈颜瞬间震怒如金刚怒目：“玄净师弟！贪财卖牒已属大逆，竟还敢嫁祸后辈、雇凶残害同门！”'),
      N('眼见铁证如山、退路尽绝，玄净脸上的慈眉善目轰然坍塌，竟发出一阵穷途末路的凄厉狞笑，枯瘦手指猛地戳向你的鼻尖！'),
      S('NPC-0193', '“哈哈哈哈！好一个大义凛然的戒律院高徒！你满口清规法度，可敢当着方丈与满殿高僧的面，说说你当年是怎么进的少林山门，又跟我玄净有过什么勾当么？！”'),
    ],
    onFinishEffects: [
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_xuanjing_debt', op: 'truthy' },
        thenEffects: [openScene('scene_slq16_06_debt', SHAOLIN_Q16_QUEST_ID)],
        elseEffects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q03_ledger', op: 'eq', value: 'reported_edited' },
            thenEffects: [openScene('scene_slq16_06_edited', SHAOLIN_Q16_QUEST_ID)],
            elseEffects: [openScene('scene_slq16_06_clean', SHAOLIN_Q16_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_slq16_05_stumble: {
    id: 'scene_slq16_05_stumble',
    title: '第五幕 · 虚清补证',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0193', '（见你呈上旁物，顿时阴鸷冷笑，反客为主高声讥讽）“哈哈！方丈师兄请看！寻常无名碎银与日常米面斋单全天下哪儿没有？凭这等莫须有的杂物便敢在戒台上污蔑知客长老，戒律院就是这么办案的么？！”'),
      N('满殿气氛骤然凝滞。关键一刻，玄寂紫铜禅杖重顿青石冷喝「搜呈影刃客怀中密信」，虚清亦含泪高举朱漆木匣冲上法坛，将带『净』字蜡封的雇凶密信、洛阳南市恒通盐栈汇票存根与度牒底簿一并呈到方丈案前！'),
      S('NPC-0112', '（逐一核验蜡封花押与盐栈汇票编号，震怒拍案）“铁证俱在！蜡封、盐栈汇票与三十六道度牒暗号分毫不差！玄净师弟，你还有何词可狡辩？！”'),
      N('玄净手中念珠“啪”地崩断，眼见大势已去，狗急跳墙之下竟发出一阵怨毒狂笑，枯指狠狠戳向你：“好个戒律高徒！你满口佛法清规，可敢当众说说你当年入寺旧案与老衲的干系？！”'),
    ],
    onFinishEffects: [
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_xuanjing_debt', op: 'truthy' },
        thenEffects: [openScene('scene_slq16_06_debt', SHAOLIN_Q16_QUEST_ID)],
        elseEffects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q03_ledger', op: 'eq', value: 'reported_edited' },
            thenEffects: [openScene('scene_slq16_06_edited', SHAOLIN_Q16_QUEST_ID)],
            elseEffects: [openScene('scene_slq16_06_clean', SHAOLIN_Q16_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_slq16_06_debt: {
    id: 'scene_slq16_06_debt',
    title: '第六幕 · 旧账反噬（第二轮质证）',
    subtitle: '大雄正殿（昔年焚账收银回扣）',
    mandatory: true,
    beats: [
      S('NPC-0193', '（双目赤红，歇斯底里咆哮震动殿宇）“诸位师兄听真了！昔年他尚在外门之时，便曾查获过我的《知客院香火私册》，却为了掩盖自己当年托牙人贾通宝递银买路入寺的丑事，亲手替我将私册投入铜炉焚毁，还收了我三百两封口官银！”'),
      S('NPC-0193', '（狰狞狂笑）“他自己手脚就不干净，凭什么站在大雄宝殿戒台上审我？！方丈要罚，便把这受贿焚账的戒律弟子一并逐出山门！”'),
      N('满殿僧众闻言一片哗然！玄寂眉峰紧锁，按在紫铜禅杖上的指节微微发白；法座之上，玄慈方丈没有立刻动怒，只是澄静如海的目光深深落在你身上，静待你亲口作答——'),
    ],
    choices: [
      {
        id: 'slq16_debt_confess',
        label: '【坦诚涤罪】当众长跪自承当年受贿焚账大错，审后自领戒律院杖责！（禅心慈悲 +3）',
        subLabel: '不遮不掩直面昔年业障，以赤诚悔过之心捍卫佛门清规',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q16_confess', value: 'confessed' },
          openScene('scene_slq16_07_confess', SHAOLIN_Q16_QUEST_ID),
        ],
      },
      {
        id: 'slq16_debt_deflect',
        label: '【铁腕压奸】冷声反呛无凭无据、休想借陈年旧闻脱罪，先定玄净卖牒买凶死罪！（怒目杀业 +2）',
        subLabel: '以凌厉辩锋硬压全场，绝不容奸邪借机搅乱公堂',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q16_confess', value: 'deflect' },
          openScene('scene_slq16_07_deflect', SHAOLIN_Q16_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq16_06_edited: {
    id: 'scene_slq16_06_edited',
    title: '第六幕 · 残页讥讽（第二轮质证）',
    subtitle: '大雄正殿（昔年撕页自保回扣）',
    mandatory: true,
    beats: [
      S('NPC-0193', '（目露怨毒，尖声冷笑）“诸位师兄莫被他这副清高嘴脸骗了！昔年他在外门查获我的《香火私册》密呈玄苦师兄时，你们可知那账册为何偏偏缺了最末一页？！”'),
      S('NPC-0193', '“因为最末一页白纸黑字记着他当年托洛阳牙人递二百两银子买门路入寺的丑事！他自己私下把末页撕毁烧了才敢去告发老衲！既同样心存私念、毁证自保，谁又比谁高洁？！”'),
      N('满殿僧众齐齐侧目，玄苦长老闻言亦眸光微动，显然想起当年检视私册时纸脊参差的那一幕。玄慈方丈垂目望向你，沉声道：“戒律院弟子，玄净所言可是实情？”'),
    ],
    choices: [
      {
        id: 'slq16_edited_confess',
        label: '【坦诚认过】合十自承当年私撕末页之私心，愿受戒律自省以破心魔！（禅心慈悲 +2）',
        subLabel: '直面昔年权谋心魔，以坦荡诚心洗尽前尘纤翳',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q16_confess', value: 'confessed' },
          openScene('scene_slq16_07_confess', SHAOLIN_Q16_QUEST_ID),
        ],
      },
      {
        id: 'slq16_edited_deflect',
        label: '【铁面压过】厉斥其借细故攀咬、岂能与倒卖度牒雇凶杀同门相提并论！（怒目杀业 +1）',
        subLabel: '疾言厉色锁死公堂焦点，不容玄净半寸喘息之机',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q16_confess', value: 'deflect' },
          openScene('scene_slq16_07_deflect', SHAOLIN_Q16_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq16_06_clean: {
    id: 'scene_slq16_06_clean',
    title: '第六幕 · 清风折奸（第二轮质证）',
    subtitle: '大雄正殿（大义清风回扣）',
    mandatory: true,
    beats: [
      S('NPC-0193', '（歇斯底里指向你咆哮）“少装什么得道高僧！你当年初入少林，还不是托洛阳牙人贾通宝递了香火银才进的外门？今日不过是挟私公报私仇、故意构陷老衲！”'),
      P('（昂然直视玄净，声音掷地有声）“阿弥陀佛！玄净师叔好生健忘——昔年弟子在外门查获香火私册之时，早已连同末页己名原封密呈长老、坦然自承旧过！祖庭彼时宽宏仅削你实权以观后效，谁料你贪嗔痴慢愈炽，今日竟敢雇凶戕害同门！”'),
      S('NPC-0126', '（罗汉堂玄苦长老越众而出，声如洪钟当堂作证）“阿弥陀佛！老衲与玄难师弟可为这位戒律高徒作证！当年他临三百两重利不昧本心、亲揭己短以护祖庭，老衲早已判作功过相抵！玄净，你死到临头还敢污蔑清流！”'),
      S(SPEAKER_SHADOW_BLADE, '（见大势已去，冷笑招供）“不错！出重金雇老子杀这小和尚灭口的正是玄净大师，蜡封银票俱在，老子认栽！”'),
      N('玄苦证词与杀手招供双管齐下，玄净如遭雷击，面如死灰地瘫软在青石砖上，彻底丧失一切反抗之力！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q16_confess', value: 'clean' },
      openScene('scene_slq16_08', SHAOLIN_Q16_QUEST_ID),
    ],
  },

  scene_slq16_07_confess: {
    id: 'scene_slq16_07_confess',
    title: '第七幕 · 坦诚涤罪',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（神色竟无半分慌乱，对着金身大佛与方丈坦然屈膝长跪，朗声道）“玄净师叔所言不虚！昔年弟子初入外门涉世未深，确曾因畏惧旧事败露犯下大错，此事年来无日不愧疚于心！然知错能改、善莫大焉——弟子今日冒死救下虚清、揭穿雇凶真相，正是为彻底斩断当年业障！审结此案后，弟子甘愿自领戒律院杖责，绝不徇私！”'),
      S('NPC-0112', '（凝视你良久，长叹一声，原本威严的目光反倒化作深沉赞许）“阿弥陀佛。凡夫畏果，菩萨畏因。当年一念之差，今日敢以性命挽回祖庭清誉、复敢在满殿高僧前自承其过——这份坦荡与担当，远胜巧言令色之辈！”'),
      S('NPC-0789', '（伏地泣血指证）“方丈明鉴！玄净师叔私卖度牒、雇凶灭口罪证确凿，弟子句句敢对佛祖金身起誓！”'),
      S(SPEAKER_SHADOW_BLADE, '（嗤笑一声干脆招供）“别演了老和尚！出重金买这小和尚命的正是你玄净，老子认栽！”'),
      N('玄净万没料到你竟敢当堂自揭旧疮以破其反咬，彻底哑口无言、面如死灰地瘫软青砖之上！'),
    ],
    onFinishEffects: [openScene('scene_slq16_08', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_07_deflect: {
    id: 'scene_slq16_07_deflect',
    title: '第七幕 · 铁腕压奸',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（神色冷厉如霜，寸步不退厉声反喝）“住口！无凭无据的陈年疯话，岂容你在如来金身前信口雌黄、转移视听？眼下三十六道空名度牒、恒通盐栈汇票、虚清刀伤与黑市杀手活口俱在堂下——你倒卖朝廷度牒、雇凶残害同门已是铁案如山，先问你的死罪！”'),
      S(SPEAKER_SHADOW_BLADE, '（见玄净已彻底失势，冷笑干脆招供）“嘿，这戒律小僧比你狠多了！方丈明鉴，雇老子后山灭口的正是玄净，蜡封汇票俱在，老子认栽！”'),
      S('NPC-0789', '（叩首哭证）“方丈明鉴！玄净师叔不仅卖牒，更威胁将知情沙弥尽数除名灭口！”'),
      N('玄净被你疾言厉色压得彻底哑口无言，浑身力气仿佛被抽干般瘫软在地。满殿高僧齐宣佛号，只是玄慈与玄寂望向你的深邃目光中，却悄然多了一丝审慎与慨叹。'),
    ],
    onFinishEffects: [openScene('scene_slq16_08', SHAOLIN_Q16_QUEST_ID)],
  },

  scene_slq16_08: {
    id: 'scene_slq16_08',
    title: '第八幕 · 戒台量刑',
    subtitle: '大雄正殿 · 佛前蒲团（终审量刑抉择）',
    mandatory: true,
    beats: [
      N('人证物证俱已确凿，盘踞知客院多年的毒瘤终于彻底拔除！虚清伏地涕零叩谢救命与雪冤之恩，玄慈命药王院妥善治其刀伤并调入藏经院静修，又命将影刃客押交洛阳府按大宋刑律明正典刑、玄净贪墨赃银悉数充公交还户部并赈济河南灾民。'),
      S('NPC-0112', '（缓缓起身，面朝金身合十长叹，旋即抬眸望向殿中的你）“善恶到头终有报，佛门清净岂容贪嗔痴慢横行！戒律院弟子，此案由你冒死查获、亲手破局，老衲与三堂长老合议之前，愿先听听你对玄净之量刑所请——”'),
      N('青烟袅袅，三堂高僧的目光齐聚你身。是将玄净废功逐出山门交登封县按大宋刑律治罪以昭铁律，还是削发封功幽禁后山思过塔终生面壁诵经赎罪以存佛门最后一线忏悔之机？'),
    ],
    choices: [
      {
        id: 'slq16_verdict_expel',
        label: '【废功逐山 · 交官治罪】奏请废功逐出山门，押交登封县按大宋刑律明正典刑！（怒目杀业 +1）',
        subLabel: '国法寺规俱不容情，令天下皆知少林清肃门户绝不护短',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q16_verdict', value: 'expel' },
          openScene('scene_slq16_09', SHAOLIN_Q16_QUEST_ID),
        ],
      },
      {
        id: 'slq16_verdict_imprison',
        label: '【幽禁思过 · 终生面壁】奏请削发封功，幽禁后山思过塔终生面壁诵经赎罪！（禅心慈悲 +1）',
        subLabel: '既永绝其为恶权柄，亦依佛门慈悲留其残生忏悔业障',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q16_verdict', value: 'imprison' },
          openScene('scene_slq16_09', SHAOLIN_Q16_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq16_09: {
    id: 'scene_slq16_09',
    title: '第九幕 · 紫衣真传',
    subtitle: '大雄正殿 · 佛前蒲团（真传晋升结局）',
    illustrationUrl: '/assets/quests/sl_16_jielv_zhenchuan.jpg',
    illustrationCaption: '戒律真传 · 大雄正殿佛光之下，玄慈方丈亲授戒律院真传法衣与禅杖',
    mandatory: true,
    beats: [
      S('NPC-0112', '（合十宣谕，声震大雄正殿）“三堂合议，准你所奏！{ifFlagEq:sl_q16_verdict=expel|即刻废去玄净武功、追缴戒牒逐出少林山门，押交登封县衙按大宋国法治罪，绝不姑息！|即刻削去玄净一切堂口权柄、封尽内力，削发幽禁后山思过塔终生面壁诵经，非死不得出塔一步！}”'),
      N('戒律武僧将失魂落魄的玄净押出大殿。殿内肃静下来，玄寂手执紫铜禅杖越众而出，向玄慈郑重举荐：“启禀方丈师兄！我戒律药王脉这位弟子入寺以来，汝州执杖明断清规、汴京一拍两散擒魔洗冤、郑州拈花救疫退匪、今日复冒死救同门于绝壁、戒台折奸肃清门风！老衲恳请方丈准其晋升——少林派【戒律院真传弟子】！”'),
      S('NPC-0112', '（含笑走下法座，亲手捧起一袭紫边戒律真传僧衣与真传度牒披于你肩头）“善哉，善哉！少林千年薪火，正赖如你这般悲智双运、铁骨铮铮的栋梁承继！今日正式擢升你为少林派【戒律院真传弟子】！如今天下看似太平，实则北辽西夏暗流汹涌，望你常持戒律之心、永怀药王之仁，护法安民！”'),
      N('满殿三堂高僧齐声宣诵佛号，晨光透入高窗洒落在你新披的紫边真传僧衣之上。你合十深深一拜——清规永驻，而更波澜壮阔的北宋江湖风云，正待你执杖前行！'),
    ],
    choices: [
      {
        id: 'slq16_finish_promote',
        label: '合十谢过玄慈方丈与玄寂师伯，晋升【戒律院真传弟子】！（完成《戒台问罪 · 贪嗔痴慢》）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 3, promoteOnly: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q16_verdict', op: 'eq', value: 'expel' },
            thenEffects: [{ type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 }],
            elseEffects: [{ type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 }],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q16_confess', op: 'eq', value: 'confessed' },
            thenEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_xuanjing_debt', op: 'truthy' },
                thenEffects: [
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 3 },
                  { type: 'modifyChivalry', delta: 20, reason: '大雄正殿当众坦承昔年受贿旧过，以命护寺涤罪' },
                ],
                elseEffects: [
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
                  { type: 'modifyChivalry', delta: 15, reason: '大雄正殿坦承昔年私撕末页旧瑕，自省破魔' },
                ],
              },
            ],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q16_confess', op: 'eq', value: 'deflect' },
                thenEffects: [
                  {
                    type: 'branch',
                    condition: { type: 'flag', flag: 'sl_xuanjing_debt', op: 'truthy' },
                    thenEffects: [{ type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 }],
                    elseEffects: [{ type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 }],
                  },
                ],
                elseEffects: [{ type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 }],
              },
            ],
          },
          { type: 'giveCombatExp', amount: 550, reason: '少室后山力擒黑市一流杀手影刃客，戒台肃清门风' },
          { type: 'addSectContribution', amount: 240 },
          { type: 'modifyRenown', delta: 80, reason: '三堂会审肃清知客黑幕，荣膺少林戒律院真传弟子' },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q16_trial_perfect', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '辩才', delta: 1 }],
            elseEffects: [],
          },
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
