import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE16_QUEST_ID } from './shaolinSideOrdinationPurgeQuest'

const SPEAKER_ZHAO_KEJI: StorySpeakerSpec = {
  kind: 'custom',
  name: '赵克己',
  title: '京西转运判官 · 贪渎官僚',
  factionName: '京西私庄',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

const SPEAKER_BLOOD_KASAYA: StorySpeakerSpec = {
  kind: 'custom',
  name: '「血袈裟」摩罗',
  title: '官府供奉邪僧 · 西域叛徒',
  factionName: '京西私庄供奉',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

function buildBloodKasayaBoss(isolated = false): NodeNpc {
  return makeQuestNpc({
    id: isolated ? 'QUEST_SLS16_BLOOD_KASAYA_ISOLATED' : 'QUEST_SLS16_BLOOD_KASAYA',
    name: '「血袈裟」摩罗',
    title: '官府供奉邪僧 · 西域叛徒',
    realm: '宗师下品',
    factionName: '京西私庄供奉',
    sectRank: 4,
    sectRankLabel: '邪道宗师',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: isolated
      ? '“哼！一纸开封府火票就吓散了那群怂包差役！也罢，老衲独个儿拿你这少林首座的血祭刀！”'
      : '“少林老秃驴也敢管赵判官的财路？今日老衲便拿你这首座的鲜血，再染红我这领血袈裟！”',
    stats: isolated
      ? { hp: 3860, mp: 3480, agi: 76, res: 61 }
      : { hp: 4380, mp: 3920, agi: 79, res: 65 },
    talents: { bone: 90, comprehension: 86, charm: 42 },
    equippedArts: { neigong: 'MA-028', move1: 'MA-072', move2: 'MA-073' },
    learnedArts: [
      { artId: 'MA-028', level: 8 },
      { artId: 'MA-072', level: 9 },
      { artId: 'MA-073', level: 9 },
    ],
  })
}

export const SHAOLIN_SIDE16_SCENES: Record<string, StorySceneDef> = {
  scene_sls16_01: {
    id: 'scene_sls16_01',
    title: '第一幕 · 佛前旧账',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，暮鼓已歇，大雄宝殿只余两柱长明烛火摇曳。玄慈方丈屏退左右执事僧，从紫檀佛龛下取出一只封着火漆的青布卷宗与一封紫泥密函，缓缓推至你面前。'),
      S(
        'NPC-0112',
        '“阿弥陀佛。你既已登临少林长老首座，老衲有一桩牵连二十年的沉疴大案须托付于你——戒律院连年核查，发现本寺呈报礼部祠部的御赐空白度牒足有三成失踪，背后竟牵出洛阳豪绅勾结邪僧「血袈裟」摩罗与京西贪官伪造空名度牒、吞田洗银的滔天黑幕！”',
      ),
      N('{ifFlag:sl_xuanjing_debt|你心中微微一震，想起当年外门时曾替玄净焚账的旧事，今日正好亲手彻底斩断这桩祸根！|当年你便曾亲手揭发过知客院倒卖度牒黑幕，如今故技重施竟蔓延至汴京西郊！}'),
      N('你翻开青布暗账，只见「长明灯油」与洛阳牙行往来流水触目惊心，数万贯国课白银竟凭空蒸发。{ifFlagEq:sl_q03_ledger=reported_clean|玄慈神色欣慰，直言当年便因你毫不徇私上呈实账，戒律院才顺藤摸瓜追到今日这条大鱼。|}{ifFlagEq:sl_q03_ledger=reported_edited|玄慈轻叹一声，道当年外门查账虽有隐晦之处，今日既已位居首座，正好将此积弊彻底掀翻。|}{ifFlagEq:sl_q03_ledger=burned_bribe|玄慈深深望了你一眼，语声平淡却沉如泰山：“旧尘既往，今日方丈将紫泥密函托付于你，正盼你亲手还少林一个清白。”|}'),
      S(
        'NPC-0112',
        '“此案牵涉京西转运判官赵克己，非少林一寺可私断。放眼朝堂，唯权知开封府包拯包龙图铁面无私！你通晓策论算术、又具宗师修为，可愿星夜携此密函赴开封府联手清查？”',
      ),
    ],
    choices: [
      {
        id: 'sls16_accept_mission',
        label: '“阿弥陀佛！弟子接过方丈密函与暗账，即刻星夜动身赴开封府！”',
        subLabel: '承接支线【清源正本 · 度牒大案】，前往开封府正堂会见包拯与展昭',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE16_QUEST_ID, stepId: 'meet_kaifeng_court' },
          setStep(SHAOLIN_SIDE16_QUEST_ID, 'meet_kaifeng_court'),
          toast(
            '已领受玄慈方丈密托！请携暗账前往【汴京 · 开封府 · 开封府正堂（bl_kf_court）】拜见包拯与展昭。',
            'talk',
            '度牒大案',
          ),
        ],
      },
      {
        id: 'sls16_defer_mission',
        label: '“此事牵连京官与西域邪僧，容弟子略作整备再行启程赴汴。”',
        subLabel: '暂缓接取（可随时再返大雄宝殿领命）',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_side16_start_triggered', value: false },
          toast('你暂且辞退整备，待准备妥当后可再入大雄宝殿向玄慈领命。', 'talk', '度牒大案'),
        ],
      },
    ],
  },

  scene_sls16_02: {
    id: 'scene_sls16_02',
    title: '第二幕 · 龙图展卷',
    subtitle: '汴京 · 开封府正堂',
    illustrationUrl: '/assets/quests/sl_s16_kaifeng_ally.jpg',
    illustrationCaption: '佛官合谋 · 开封府正堂灯下勘账，少林首座与包拯、展昭定计除奸',
    mandatory: true,
    beats: [
      N('三日后，汴京开封府后堂暖阁烛火通明。面黑如铁的包拯读罢玄慈方丈紫泥密函，重重一拍惊堂木；身旁红衣按剑的御猫展昭亦眉峰紧蹙，英气凛然。'),
      S(
        'NPC-0013',
        '“好胆硕鼠！朝廷祠部度牒免丁役、免田赋，乃国家大政！京西转运判官赵克己竟勾结洛阳豪绅与少林寺中蠹虫私造空名度牒、吞田洗银，当真罪不容诛！”',
      ),
      S(
        'NPC-0140',
        '“大师来得正是时候！开封府近来刚截获三份京西豪强所持的可疑度牒存根，传闻赵克己在京西别庄还重金供奉着西域邪僧「血袈裟」摩罗，寻常差役根本近不得身。若不能当堂坐实伪牒铁证，赵克己便能借官身推诿！”',
      ),
      P('“阿弥陀佛。贫僧愿凭少林十年账册与算学策论，当堂与包大人、展护卫逐印对勘！”'),
    ],
    onFinishEffects: [openScene('scene_sls16_03', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_03: {
    id: 'scene_sls16_03',
    title: '第三幕 · 公堂对勘',
    subtitle: '汴京 · 开封府正堂',
    mandatory: true,
    beats: [
      N('开封府书吏端上三份截获的京西度牒与祠部印拓，并置青灯长案之上：'),
      N('【甲卷】纸色泛黄发脆、墨痕偏淡，落款为江南旧坊所造竹纸；【乙卷】纸白墨浓、表面工整，然细看其「礼部祠部之印」左下角暗记竟少了一笔折锋，且卷尾所批洛阳牙行经手暗码与你带来的暗账严丝合缝，直指汴京西郊青柳黑庄；【丙卷】印文完整无缺，唯有卷首勘合编号较前牒跳空了三枚。'),
      S('NPC-0013', '“大师精擅算术账目，且请指明这三份卷宗中，究竟哪一份才是足可即刻签发开封府火票、直捣黑庄的伪造铁证？”'),
    ],
    choices: [
      {
        id: 'audit_scroll_a',
        label: '指认【甲卷】：纸色发黄、墨迹偏淡，必是洛阳私坊粗制滥造的赝品度牒',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s16_audit_choice', value: 'wrong_a' },
          openScene('scene_sls16_04', SHAOLIN_SIDE16_QUEST_ID),
        ],
      },
      {
        id: 'audit_scroll_b',
        label: '指认【乙卷】：伪牒朱印少一笔礼部暗记，且经手洛阳牙行暗码直连汴京西郊黑庄',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s16_audit_choice', value: 'correct' },
          { type: 'setFlag', flag: 'sl_s16_forgery_proved', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s16_audit_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s16_audit_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_sls16_04', SHAOLIN_SIDE16_QUEST_ID),
        ],
      },
      {
        id: 'audit_scroll_c',
        label: '指认【丙卷】：勘合编号平白跳空三枚，必是经手官吏私抽空白度牒所致',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s16_audit_choice', value: 'wrong_c' },
          openScene('scene_sls16_04', SHAOLIN_SIDE16_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls16_04: {
    id: 'scene_sls16_04',
    title: '第四幕 · 密令锁踪',
    subtitle: '汴京 · 开封府正堂',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s16_audit_choice=correct|包拯闻言俯身细核乙卷朱印，果然见礼部暗记缺了一折，再对牙行暗码，顿时抚案大赞：“大师明察秋毫！铁证如山，本府即刻签发开封府朱红火票，凡西郊私庄受蒙蔽之官府差役见票即须退避，绝不许助纣为虐！”|}{ifFlagEq:sl_s16_audit_choice=wrong_a|展昭接过甲卷对照旧档，微叹道：“甲卷不过是江南旧年受潮竹纸真牒。真正露馅的是乙卷——印文暗记缺笔，牙行码直通西郊青柳黑庄！虽耽搁了公堂签发火票的良机，咱们仍可趁夜突入黑庄捉贼拿赃。”|}{ifFlagEq:sl_s16_audit_choice=wrong_c|包拯检视丙卷存根后摇头沉吟：“丙卷跳空三号乃往岁水毁注销旧案，尚不足以坐实伪造。幸而展护卫又从乙卷朱印缺笔处追查到汴京西郊青柳黑庄——今夜咱们便直扑黑庄，当场人赃并获！”|}'),
      S(
        'NPC-0140',
        '“青柳庄对外称是荒废义庄，实则重兵把守、藏匿假印与黑银。大师请速往【开封府架阁库】与展某二十名黑衣精锐汇合，三更纵马直捣黑庄！”',
      ),
      P('“阿弥陀佛。贫僧这就往架阁库赴约！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_SIDE16_QUEST_ID, 'raid_west_manor'),
      toast(
        '已锁定汴京西郊青柳黑庄！请前往【汴京 · 开封府 · 架阁库（bl_kf_archive）】随展昭星夜突袭！',
        'talk',
        '度牒大案',
      ),
    ],
  },

  scene_sls16_05: {
    id: 'scene_sls16_05',
    title: '第五幕 · 夜破黑庄',
    subtitle: '开封府架阁库 -> 汴京西郊 · 青柳黑庄',
    mandatory: true,
    beats: [
      N('三更霜月冷冽。你与展昭自架阁库核实庄图后纵马出城，二十名开封府黑衣精锐如苍鹰掠墙而入，铁索撞开青柳黑庄正厅！厅内银箱堆叠如山，案上赫然摆满三百余张私印空白度牒！'),
      S(
        SPEAKER_ZHAO_KEJI,
        '（打翻烛台尖声厉叫）“京西巡检差役听令！有狂徒假冒公差夜闯本官别庄，速速围杀！快请摩罗大师出手，一个活口也别留！”',
      ),
      N('数十名不明真相、受赵克己调派护院的京西差役拔刀围拢过来，与此同时，后堂木门轰然炸裂！身披暗红血衣、双目赤红如鬼的宗师下品邪僧「血袈裟」摩罗携漫天血刀煞气大步踏出！'),
      S(SPEAKER_BLOOD_KASAYA, '“桀桀桀……嵩山少林的首座高僧？今日老衲便拿你的鲜血，再染红我这领血袈裟！”'),
    ],
    choices: [
      {
        id: 'sls16_tactic_warrant',
        label: '【火票喝差 · 孤立邪僧】高举开封府火票喝散受蒙蔽官差，免伤无辜再 1v1 擒血袈裟！',
        subLabel: '先喝退外围官差孤立摩罗，再 1v1 迎战宗师下品血袈裟（禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需公堂已核实伪牒获开封府火票，或十艺【策论】≥ 60',
          conditions: [
            { type: 'flag', flag: 'sl_s16_forgery_proved', op: 'truthy' },
            { type: 'skillAtLeast', key: '策论', min: 60 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s16_raid_tactic', value: 'warrant' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s16_raid_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s16_raid_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE16_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBloodKasayaBoss(true) },
            rule: 'story_trial',
            forbidEscapeReason: '邪僧凶焰滔天，若退半步则庄内铁证尽毁、开封府官差皆危！',
            introText: '你亮出开封府火票与大义喝散受蒙蔽差役，孤立血袈裟摩罗展开 1v1 宗师伏魔决战！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls16_06', SHAOLIN_SIDE16_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('血袈裟摩罗刀势凶诡，你暂且退保展昭重整气息，可再由架阁库发起夜袭！', 'warn', '度牒大案'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('与血袈裟摩罗鏖战难分高下！调息后再由架阁库重战伏魔！', 'warn', '度牒大案'),
            ],
          },
        ],
      },
      {
        id: 'sls16_tactic_charge',
        label: '【正面突入 · 强破血僧】不顾群差阻拦，直催少林护法正功正面强破「血袈裟」摩罗！',
        subLabel: '零门槛正面 1v1 力战全盛宗师下品「血袈裟」摩罗（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s16_raid_tactic', value: 'charge' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s16_raid_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s16_raid_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE16_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBloodKasayaBoss(false) },
            rule: 'story_trial',
            forbidEscapeReason: '邪僧凶焰滔天，若退半步则庄内铁证尽毁、开封府官差皆危！',
            introText: '【1v1 宗师伏魔】火光漫天之中，正面强破宗师下品邪僧【「血袈裟」摩罗】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls16_06', SHAOLIN_SIDE16_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('血袈裟摩罗刀势凶诡，暂且受挫！调息精进后可由开封府架阁库重袭黑庄！', 'warn', '度牒大案'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('与血袈裟摩罗鏖战难分高下！调息后再由架阁库重战伏魔！', 'warn', '度牒大案'),
            ],
          },
        ],
      },
    ],
  },

  scene_sls16_06: {
    id: 'scene_sls16_06',
    title: '第六幕 · 伏魔诛邪',
    subtitle: '汴京西郊 · 青柳黑庄内院',
    illustrationUrl: '/assets/quests/sl_s16_blood_kasaya.jpg',
    illustrationCaption: '伏魔诛邪 · 京西私庄夜火漫天，少林首座破尽血刀诛灭邪僧摩罗',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s16_raid_tactic=warrant|你一声清喝亮出开封府火票与包龙图威名，外围数十名受蒙蔽的京西差役立时弃刀退散，展昭得以从容锁拿赵克己！|火光映天之中，你仗着无上佛门金刚护体震退阻路私兵，与展昭背靠背杀穿庭院，直逼血袈裟摩罗！}'),
      N('百余合惊心动魄的宗师对决后，摩罗见久攻不下，狂吼一声劈出拼命血刃！你目光澄澈如镜，不退反进，一记至刚至正的少林伏魔掌劲后发先至，硬生生震断其戒刀、击碎其全身魔功经脉！'),
      S(SPEAKER_BLOOD_KASAYA, '（仰天喷出黑血，断刀铛啷落地）“少林……正宗禅武……竟真能破我血煞……”'),
      N('邪道宗师轰然倒毙于火光之中。展昭铁链锁住抖如筛糠的赵克己，将满厅赃银、三百余张伪造空白度牒与洛阳牙行供状悉数封存，向你由衷抱拳赞佩。'),
    ],
    onFinishEffects: [openScene('scene_sls16_07', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_07: {
    id: 'scene_sls16_07',
    title: '第七幕 · 青天勘结',
    subtitle: '汴京 · 开封府正堂',
    mandatory: true,
    beats: [
      N('翌日辰时，开封府大堂公审。铁证如山之下，赵克己与洛阳豪绅牙行一干党羽尽数画押伏罪。包拯当堂奏请革职抄家归公，亲手拟就一份盖有开封府与礼部祠部双印的勘结公文交予你手。'),
      S(
        'NPC-0013',
        '“大师大义灭亲、不徇私情，既替朝廷挽回数十万贯国课，更保全了少林千年清名！包某平生见惯世态炎凉，今日得识大师这般真高僧，实乃平生快事！”',
      ),
      S('NPC-0140', '“大师回山整肃寺规尚有一番风雨。日后少林若有用得着开封府之处，但凭一纸书信，展某定当星夜驰援！”'),
      P('“阿弥陀佛。多谢包大人与展护卫明镜高悬，贫僧这便携公文回山，彻底斩断这桩二十年积弊！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_SIDE16_QUEST_ID, 'announce_reform'),
      toast(
        '西郊黑庄已破、铁案如山！请携开封府公文返回【嵩山少林寺 · 大雄宝殿正殿（sl_daxiong_main）】整肃寺风并建言立规。',
        'success',
        '度牒大案',
      ),
    ],
  },

  scene_sls16_08: {
    id: 'scene_sls16_08',
    title: '第八幕 · 钟鸣聚众',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      N('你回到少室山时，大雄宝殿铜钟连鸣九响，玄、慧、虚三辈僧众齐聚丹墀。玄慈方丈端坐法座，知客禅师玄净立于阶下，听罢你朗声宣读的开封府勘结公文，面如死灰、扑通跪倒！'),
      S(
        'NPC-0193',
        '{ifFlag:sl_xuanjing_debt|（冷汗涔涔，望你一眼羞愧难当，以头抢地痛哭）“方丈恕罪！首座恕罪！当年老衲受赵克己胁迫贪墨，甚至曾利诱首座替老衲遮掩旧账……实乃罪加一等！老衲甘受革职面壁之罚！”|（浑身筛糠般跪伏佛前，涕泪横流）“方丈恕罪！老衲昔日外门时便曾被首座揭破贪墨，却仍鬼迷心窍与赵克己沆瀣一气……如今报应不爽，老衲愿领戒律院杖责，甘受革职之罚！”}',
      ),
      P(
        '（声音清朗威严，响彻丹墀）“玄净师伯，今日查清此案，非为记恨一己私怨，实因佛门清净地，绝不容白银称量佛心！”',
      ),
      S(
        'NPC-0112',
        '“善哉！戒律院听令：即刻革去玄净知客禅师之职，罚入思过崖面壁思过十年，其历年私蓄尽数施粥济贫！至于本寺往后度牒核发与整肃陋习之法，首座既通策论，且请当众建言！”',
      ),
    ],
    onFinishEffects: [openScene('scene_sls16_09', SHAOLIN_SIDE16_QUEST_ID)],
  },

  scene_sls16_09: {
    id: 'scene_sls16_09',
    title: '第九幕 · 改制建言',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      N('丹墀上下数百名少林僧众齐齐屏息凝望。二十年积弊虽已掀翻，但如何永绝后患、令后世百年再无人敢借度牒谋私，全看今日定下的祖庭新制。'),
      N('你手执开封府勘结公文，心中权衡良久，向玄慈方丈与全寺僧众郑重进言：'),
    ],
    choices: [
      {
        id: 'reform_transparent_registry',
        label: '【立制防微】建言「全寺度牒公开造册、由戒律院与礼部双印核销」，收徒严禁索取灯油贿银！',
        subLabel: '以透明公榜制度根除积弊，功德深远（禅心慈悲 +2）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s16_reform', value: 'transparent' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s16_reform_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s16_reform_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_sls16_10', SHAOLIN_SIDE16_QUEST_ID),
        ],
      },
      {
        id: 'reform_harsh_punishment',
        label: '【重典立威】建言「以重典严刑杀鸡儆猴」，凡涉度牒贪墨者立废武功、逐出山门并移送开封府！',
        subLabel: '以铁血严律震慑寺内宵小（怒目杀业 +2）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s16_reform', value: 'harsh' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s16_reform_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s16_reform_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
            ],
          },
          openScene('scene_sls16_10', SHAOLIN_SIDE16_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls16_10: {
    id: 'scene_sls16_10',
    title: '第十幕 · 清源正本',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s16_reform=transparent|玄慈方丈闻言大喜，命人即刻将《少林度牒清源双印新规》勒石立碑于钟鼓院前！丹墀下众多寒门武僧热泪盈眶，齐声合十诵念佛号，声浪直冲云霄！|玄慈方丈默然良久，终是沉声颔首：“乱世沉疴须用重典。就依首座所言，勒石颁行严律，以警后人！”全寺执事僧闻之凛然肃容，无敢有半分懈怠。}'),
      S(
        'NPC-0112',
        '“阿弥陀佛！二十年积弊，一朝涤荡清明。你既以宗师武功伏魔于京西，又以明断策论正本于山门，实乃我少林中兴栋梁！”',
      ),
      N('从此以后，少林山门再无「佛缘有价」之讥，大宋朝野与河洛江湖莫不传颂你与包龙图联手清源正本的这段佳话。'),
    ],
    choices: [
      {
        id: 'sls16_complete',
        label: '合十领受师门嘉许，铭记清源正本之志',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 1050, reason: '京西伏魔与清源正本度牒大案圆满告成' },
          { type: 'addSectContribution', amount: 350 },
          { type: 'modifyRenown', delta: 140, reason: '会同包拯展昭破获度牒大案、整肃少林寺风' },
          { type: 'modifyChivalry', delta: 80, reason: '废除入寺索贿陋习、诛灭邪僧护持正道' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s16_forgery_proved', op: 'truthy' },
            thenEffects: [
              { type: 'modifyRenown', delta: 20, reason: '开封府公堂亲勘伪牒礼部暗记铁证' },
            ],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s16_reform', op: 'eq', value: 'transparent' },
            thenEffects: [
              { type: 'modifyChivalry', delta: 20, reason: '建言双印公开造册永绝索贿积弊' },
            ],
          },
          { type: 'modifySkill', key: '策论', delta: 2 },
          { type: 'modifySkill', key: '算术', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0013' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0140' }, delta: 20 },
          { type: 'completeQuest', questId: SHAOLIN_SIDE16_QUEST_ID, outcome: 'completed' },
          toast(
            '【清源正本 · 度牒大案】圆满完成！实战经验 +1050，师门贡献 +350，声望 +140，侠义 +80，策论 +2，算术 +1，包拯与展昭好感各 +20！',
            'success',
            '清源正本',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_SIDE16_SCENES
