import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q20_QUEST_ID } from './shaolinLaymanCommanderQuest'

const SPEAKER_COURIER_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '传信武僧 · 虚明',
  title: '嵩山急信使者',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

const SPEAKER_CUI_OFFICIAL: StorySpeakerSpec = {
  kind: 'custom',
  name: '崔文清',
  title: '尚书礼部祠部郎中',
  factionName: '大宋朝廷',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

const SPEAKER_CORRUPT_OFFICIAL: StorySpeakerSpec = {
  kind: 'custom',
  name: '严世昌',
  title: '登封通判（贪官）',
  factionName: '地方贪官',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

const SPEAKER_BLACK_WIND: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑风煞',
  title: '嵩山绿林双煞之首',
  factionName: '黑虎涧绿林',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

const SPEAKER_BLOOD_WOLF: StorySpeakerSpec = {
  kind: 'custom',
  name: '血狼煞',
  title: '嵩山绿林双煞之次',
  factionName: '黑虎涧绿林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

function buildAssassinLead(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ20_ASSASSIN_A',
    name: '严府死士首领 · 阴面张',
    title: '汴京截杀死士',
    realm: '二流中品',
    factionName: '黑虎涧绿林',
    sectRank: 0,
    sectRankLabel: '死士首领',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“严大人有令，绝不能让这纸勘合文书出了开封府！把命和文书都留下！”',
    stats: { hp: 1580, mp: 1150, agi: 49, res: 34 },
    talents: { bone: 64, comprehension: 52, charm: 26 },
    equippedArts: { neigong: 'MA-123', move1: 'MA-131', move2: 'MA-125' },
    learnedArts: [{ artId: 'MA-123', level: 6 }, { artId: 'MA-131', level: 6 }, { artId: 'MA-125', level: 6 }],
  })
}

function buildAssassinMate(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ20_ASSASSIN_B',
    name: '黑虎涧暗桩 · 鬼手陆',
    title: '绿林刺客',
    realm: '二流下品',
    factionName: '黑虎涧绿林',
    sectRank: 0,
    sectRankLabel: '绿林暗桩',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“嘿嘿，宝塔阴暗处正好埋骨！纳命来！”',
    stats: { hp: 1320, mp: 900, agi: 46, res: 29 },
    talents: { bone: 60, comprehension: 48, charm: 24 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-150', move2: 'MA-146' },
    learnedArts: [{ artId: 'MA-140', level: 5 }, { artId: 'MA-150', level: 5 }, { artId: 'MA-146', level: 5 }],
  })
}

function buildBlackWindBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ20_BLACK_WIND',
    name: '黑风煞',
    title: '嵩山绿林双煞之首',
    realm: '一流下品',
    factionName: '黑虎涧绿林',
    sectRank: 0,
    sectRankLabel: '绿林大寇',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“坏了严通判与俺兄弟的好事，还敢在暴雨夜独自守在药庄门前？今日便拿你的人头祭我黑风鬼头刀！”',
    stats: { hp: 2420, mp: 1960, agi: 59, res: 46 },
    talents: { bone: 76, comprehension: 62, charm: 34 },
    equippedArts: { neigong: 'MA-081', move1: 'MA-091', move2: 'MA-107' },
    learnedArts: [{ artId: 'MA-081', level: 7 }, { artId: 'MA-091', level: 8 }, { artId: 'MA-107', level: 7 }],
  })
}

function buildBloodWolfBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ20_BLOOD_WOLF',
    name: '血狼煞',
    title: '嵩山绿林双煞之次',
    realm: '二流上品',
    factionName: '黑虎涧绿林',
    sectRank: 0,
    sectRankLabel: '绿林巨寇',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“大哥劈他中路，俺从雨幕里掏他心窝！烧光这药庄，谁也查不到严大人的头上！”',
    stats: { hp: 1860, mp: 1420, agi: 53, res: 39 },
    talents: { bone: 70, comprehension: 54, charm: 28 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-131', move2: 'MA-125' },
    learnedArts: [{ artId: 'MA-140', level: 7 }, { artId: 'MA-131', level: 7 }, { artId: 'MA-125', level: 6 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq20_01: {
    id: 'scene_slq20_01',
    title: '第一幕 · 嵩山急羽',
    subtitle: '开封府 · 大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('{reignYear}盛夏，汴京城闷雷隐隐。你入少林已整整五载，历经相国寺雅市、洛阳龙门与莆田南渡三番大历练，方才奉命赴东京大相国寺核对两寺账目，忽见一名浑身湿透、神色焦灼的嵩山武僧奔入香云宝鼎大殿！'),
      S(SPEAKER_COURIER_MONK, '（扑倒在蒲团前，双手高举一封火漆密函，气喘吁吁）“{gender:师兄|师姐}！大事不好！嵩山出大祸了！这是玄慈方丈亲笔急信，命我昼夜兼程送至东京交予你！”'),
      P('（心头一凛，连忙扶起虚明师弟，拆开火漆密函疾速阅览）“什么？！登封新任通判严世昌竟带差役围了嵩山外院药庄，诬告少林寺『私藏甲胄、意图不轨』？！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_02', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_02: {
    id: 'scene_slq20_02',
    title: '第二幕 · 贪官设局',
    subtitle: '大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      S(SPEAKER_COURIER_MONK, '（咬牙愤恨）“那严世昌贪婪成性，早就眼红我少林外院药庄三百亩药田与秘制金创药方！三日前夜里，有人瞧见盘踞嵩山北麓的【黑虎涧绿林双煞】潜入药庄后山，偷偷埋下十几副锈蚀军甲！”'),
      S(SPEAKER_COURIER_MONK, '“次日一早，严世昌便亲率州府弓手直扑药庄『人赃并获』，扬言三日内若不交出药庄地契与十万贯赎罪银，便要奏报朝廷查封少林外院！方丈顾忌僧众与官军起冲突会坐实谋逆罪名，一时竟投鼠忌器！”'),
      P('（目光沉凝，指节叩响案几）“好毒辣的官匪勾结！出家师父身份避忌官府周旋，动武便中了严世昌的奸计，不动武便要白白失了救济天下的药庄！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_03', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_03: {
    id: 'scene_slq20_03',
    title: '第三幕 · 俗家破局',
    subtitle: '大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      P('（思忖片刻，眸中骤然亮起精光）“虚明师弟莫慌！这正是方丈将急信送来东京寻我的深意——出家师父不便与朝堂官衙往来，但我乃少林俗家护法，身在红尘、通晓大宋律例与朝堂章法！”'),
      P('“当年太祖皇帝亲赐嵩山少林寺免赋护寺敕牒，正本便存于东京礼部祠部司！恰巧今日礼部祠部郎中崔文清大人正在相国寺【资圣八角琉璃宝塔】校勘佛藏。若我以俗家护法身份呈递陈情策论、请出朝廷《护寺勘合文书》，莫说一个小小登封通判，便是河南府尹见了也得退避三舍！”'),
      S(SPEAKER_COURIER_MONK, '（大喜过望，合十拜道）“{gender:师兄|师姐}高见！只是严世昌在汴京必有耳目，此去资圣宝塔请领勘合文书，务必万分小心！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_04', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_04: {
    id: 'scene_slq20_04',
    title: '第四幕 · 疾赴宝塔',
    subtitle: '大相国寺 · 殿前石阶',
    mandatory: true,
    beats: [
      N('事不宜迟！你当即于香云殿偏厢研墨提笔，凭借多年修习的经义、书法与策论功底，一气呵成写就《嵩山少林药庄蒙冤陈情疏》，条分缕析点出严世昌栽赃破绽，怀揣奏疏直奔资圣八角琉璃宝塔！'),
    ],
    choices: [
      {
        id: 'slq20_accept_quest',
        label: '怀揣陈情疏，速赴【大相国寺 · 资圣八角琉璃宝塔】请领勘合文书',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q20_QUEST_ID, stepId: 'imperial_writ' },
          setStep(SHAOLIN_Q20_QUEST_ID, 'imperial_writ'),
          toast('已开启《紫衣护寺 · 俗家都统》！请速赴【资圣八角琉璃宝塔】面谒崔文清大人！', 'talk', '紫衣护寺'),
        ],
      },
    ],
  },

  scene_slq20_05: {
    id: 'scene_slq20_05',
    title: '第五幕 · 宝塔陈情',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('资圣八角琉璃宝塔高耸入云，三层禅阁内书卷飘香。礼部祠部郎中【崔文清】身着绯色官袍，正伏案核验大藏经印版。见你气度沉静、礼数周全地呈上陈情疏，遂接过细读。'),
      S(SPEAKER_CUI_OFFICIAL, '（读罢抚须赞叹，眼中露出惊异之色）“字迹端方刚劲，策论条理分明，引《宋刑统》与太祖敕赐少林旧制句句切中要害！你竟是少林俗家护法弟子？”'),
      P('（拱手不卑不亢）“正是。登封通判严世昌若真查获谋逆军械，依大宋律当立报河南府与提点刑狱司会审，岂敢私下向佛寺索要十万贯与药庄地契？其栽赃贪墨之心，路人皆知！恳请崔大人验明旧档，赐发礼部护寺勘合文书，以正朝纲、安佛门！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_06', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_06: {
    id: 'scene_slq20_06',
    title: '第六幕 · 塔下暗箭',
    subtitle: '资圣八角琉璃宝塔 · 塔基暗廊',
    mandatory: true,
    beats: [
      S(SPEAKER_CUI_OFFICIAL, '（慨然拍案）“说得好！当今官家仁厚，最恨地方酷吏借端敲诈寺观百姓！本官这就用礼部祠部司朱印为你签发《护寺勘合文书》，并附手书一封致河南府尹，命其严查严世昌勾结绿林一案！”'),
      N('你郑重接过盖有鲜红朱印的《护寺勘合文书》，贴身收入油布怀囊，辞别崔大人快步下塔。岂料刚踏出宝塔底层暗廊，两道黑影骤然自琉璃影壁后暴起，寒光直刺心口！'),
      S({ name: '严府死士首领 · 阴面张', title: '汴京截杀死士', factionName: '黑虎涧绿林', portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg', avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg' }, '（声音嘶哑如枭）“严大人早料到少林会派人进京告状！乖乖交出勘合文书，饶你留个全尸！”'),
      P('（冷笑一声，反手抽刃挡开暗器）“严世昌连天子脚下大相国寺都敢派死士行凶，真是死到临头不自知！来得好！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_07', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_07: {
    id: 'scene_slq20_07',
    title: '第七幕 · 宝塔破围',
    subtitle: '资圣宝塔暗廊（车轮连战 实战）',
    mandatory: true,
    beats: [
      N('严府死士首领阴面张与黑虎涧暗桩鬼手陆杀招尽出，欲在相国寺护院赶来前夺取勘合文书！你护紧怀中文书，迎面强攻！'),
    ],
    choices: [
      {
        id: 'slq20_fight_assassins',
        label: '护住勘合文书，迎战【阴面张】与【鬼手陆】！（车轮连战 实战）',
        subLabel: '击溃严世昌派来的汴京截杀死士',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q20_QUEST_ID,
            opponent: { kind: 'custom', npc: buildAssassinLead() },
            extraOpponents: [{ kind: 'custom', npc: buildAssassinMate() }],
            rule: 'story_trial',
            forbidEscapeReason: '护寺勘合文书关乎少林千年清誉，寸步不可退！',
            introText: '【车轮连战 · 宝塔破围】迎战严府死士首领【阴面张】与黑虎涧暗桩【鬼手陆】！',
            onWin: [openScene('scene_slq20_08', SHAOLIN_Q20_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('死士招式阴狠，暂借宝塔石柱周旋回气再战！', 'warn', '汴京请勘'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq20_08: {
    id: 'scene_slq20_08',
    title: '第八幕 · 勘合在握',
    subtitle: '大相国寺 · 资圣宝塔前',
    illustrationUrl: '/assets/quests/sl_20_imperial_writ.jpg',
    illustrationCaption: '资圣八角琉璃宝塔 · 手握朝廷朱印护寺勘合文书，破围策马星夜驰援嵩山',
    mandatory: true,
    beats: [
      N('数合交手，你一掌震碎鬼手陆铁爪、反手以少林擒拿卸去阴面张双臂，将两名死士生擒移交闻讯赶来的崔文清随行禁军！'),
      S(SPEAKER_CUI_OFFICIAL, '（见严府死士竟敢在皇家佛寺截杀公文使者，勃然大怒）“好个胆大包天的严世昌！有了这两个活口供状，他这顶乌纱帽彻底保不住了！少侠速带勘合文书日夜兼程赶回嵩山，本官随后便奏请御史台拿人！”'),
      P('（翻身上马，高举油布包封的勘合文书抱拳辞别）“多谢崔大人主持公道！晚辈这便星夜驰返嵩山！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_09', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_09: {
    id: 'scene_slq20_09',
    title: '第九幕 · 兼程归岳',
    subtitle: '汴洛官道 · 疾风骤雨',
    mandatory: true,
    beats: [
      N('你换马不换人，顶着漫天翻滚的乌云昼夜兼程疾驰三百余里，终于在第三日申时乌云压顶之际赶回嵩山少室峰！'),
    ],
    choices: [
      {
        id: 'slq20_return_shaolin',
        label: '携《护寺勘合文书》星夜驰返【嵩山少林寺 · 大雄正殿 · 佛前蒲团】',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q20_QUEST_ID, 'blacktiger_rain'),
          toast('已请得朝廷《护寺勘合文书》！速返【嵩山少林寺 · 大雄正殿 · 佛前蒲团】喝退贪官！', 'success', '紫衣护寺'),
        ],
      },
    ],
  },

  scene_slq20_10: {
    id: 'scene_slq20_10',
    title: '第十幕 · 官威压寺',
    subtitle: '嵩山少林寺 · 大雄宝殿前广场',
    mandatory: true,
    beats: [
      N('此刻嵩山狂风骤起、暴雨将至。大雄宝殿前广场上，数十名手持水火棍与长枪的登封州府弓手团团围住石阶，登封通判【严世昌】大马金刀坐在官轿旁，正趾高气扬地指着亲自出殿周旋的【玄慈】方丈！'),
      S(SPEAKER_CORRUPT_OFFICIAL, '（冷笑连连，甩出一纸登封县封条）“玄慈方丈，三日之期已到！药庄后山搜出的铁甲人证物证俱在！今日你们要么乖乖画押献出三百亩药庄地契，要么本官这就命人查封山门、把药王院一干秃驴通通锁拿归案！”'),
      S('NPC-0112', '（双掌合十，面容悲悯却渊停岳峙）“阿弥陀佛。严通判，出家人不打诳语，那批锈甲实非本寺所有。你若执意强抢药庄，岂不怕天下公论与朝廷法度？”'),
      S(SPEAKER_CORRUPT_OFFICIAL, '（放声狂笑）“哈哈哈哈！在这登封地界，本官便是法度！来人，给我撕毁佛幔、强封药庄——”'),
    ],
    onFinishEffects: [openScene('scene_slq20_11', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_11: {
    id: 'scene_slq20_11',
    title: '第十一幕 · 勘合喝退',
    subtitle: '大雄宝殿前石阶',
    mandatory: true,
    beats: [
      N('“住手——！大宋尚书礼部祠部司《护寺勘合文书》在此，严世昌你敢造反不成？！”'),
      N('一声清越长喝如惊雷炸响！你青衫浴风大步踏上石阶，双手高举那卷盖着猩红礼部大印与太祖护寺敕令的勘合文书，朗声宣读！'),
      P('（目光如电逼视脸色惨白的严世昌）“严通判！你勾结黑虎涧绿林暗埋锈甲、勒索少林药庄十万贯，更胆大包天在东京大相国寺派死士截杀朝廷公文使者！如今你的死士阴面张已在礼部祠部郎中崔文清大人手中画押招供，河南府拿人的公文此刻就在路上——诸位弓手差役听真，谁敢再替这待罪贪官动佛门一草一木，一律以同谋论处！”'),
      N('几十名州府弓手闻言大骇，纷纷丢下封条后退三步！严世昌如遭雷击，双腿一软险些跌下官轿。'),
    ],
    onFinishEffects: [openScene('scene_slq20_12', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_12: {
    id: 'scene_slq20_12',
    title: '第十二幕 · 贪官溃逃',
    subtitle: '大雄宝殿前广场',
    mandatory: true,
    beats: [
      S(SPEAKER_CORRUPT_OFFICIAL, '（面无人色，手指颤抖地指着你尖叫）“你……你个区区少林俗家弟子，怎可能请动礼部祠部郎中……撤！快撤！回县衙收拾细软！”'),
      N('严世昌连官帽都歪了，在几名亲随搀扶下狼狈鼠窜下山，殊不知山脚官道上河南府派来的缉拿马队早已严阵以待！'),
      S('NPC-0112', '（合十深深一礼，眼中满是欣慰）“善哉！{gender:师侄|女施主}单骑进京请出勘合文书，不费一兵一卒便喝退酷吏、保全药庄，真乃我少林之幸！然严世昌既已败露，与他勾结的黑虎涧绿林双煞恐怕狗急跳墙……”'),
      P('（抬眼望向骤然倾盆而下的豆大雨点，手按长刀沉声道）“方丈明鉴！那黑风煞与血狼煞曾亲手埋甲，必怕活口与药庄证人指认，今夜暴雨遮掩正是他们杀人放火灭口之时！弟子愿独自坐镇药庄门前，候那双煞自投罗网！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_13', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_13: {
    id: 'scene_slq20_13',
    title: '第十三幕 · 黑虎夜袭',
    subtitle: '嵩山外院药庄门前 · 子夜暴雨',
    mandatory: true,
    beats: [
      N('子夜时分，嵩山雷鸣电闪，倾盆暴雨如天河倒泻。你令药庄杂役与医僧尽数退入内殿避险，独自一人披蓑提刀，静立于药庄青石牌坊之下。'),
      N('一道惨白闪电撕裂夜空！只见十余丈外雨幕中鬼影幢幢，两道散发着森然血腥气的雄壮身影提着厚背鬼头大刀与狼牙短刃踏水疾奔而来——正是威震豫西绿林十余年的【黑风煞】与【血狼煞】！'),
      S(SPEAKER_BLACK_WIND, '（见牌坊下唯你一人一刀，狞笑声压过雷鸣）“嘿嘿，血狼老弟你瞧，少林寺那帮秃驴竟然只派了个带发小子守药庄！正好，先剁了这坏咱们好事的小崽子，再一把火把药庄连同证人烧个精光！”'),
      S(SPEAKER_BLOOD_WOLF, '（舔去唇边雨水，凶睛泛红）“大哥，这小子功夫不弱，莫要留手，双煞合击一口气撕碎他！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_14', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_14: {
    id: 'scene_slq20_14',
    title: '第十四幕 · 单刀赴雨',
    subtitle: '嵩山药庄牌坊 · 暴雨决战',
    illustrationUrl: '/assets/quests/sl_20_blacktiger_rain.jpg',
    illustrationCaption: '子夜暴雨 · 单刀孤身镇守嵩山药庄牌坊，雷电交加中力战绿林双煞',
    mandatory: true,
    beats: [
      N('你缓缓掀落湿透的斗笠，任凭暴雨冲刷眉宇。五年来于相国寺悟得的慈悲刀杖、龙门桥领受的韦陀降魔重意、九莲山习得的南北少林神功，此刻在丹田之中尽数融汇贯通！'),
      P('（长刀斜指青石，雨水顺刀锋滚落，声音沉雄如钟）“尔等勾结贪官陷害佛门、残害无辜，罪孽深重！今夜我少林俗家护法在此，黑虎涧双煞便一并留命偿债罢！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_15', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_15: {
    id: 'scene_slq20_15',
    title: '第十五幕 · 雨夜斩煞',
    subtitle: '嵩山药庄牌坊（车轮连战 终极决战）',
    mandatory: true,
    beats: [
      N('黑风煞一流下品毒砂内劲轰然爆发，刀势如黑风卷地；血狼煞二流上品断魂刀法从雨幕死角暴袭而至！雷雨交加之中，你单刀直进，与嵩山绿林双煞展开终极死战！'),
    ],
    choices: [
      {
        id: 'slq20_fight_twins',
        label: '暴雨中单刀迎战【黑风煞】与【血狼煞】！（一流下品 车轮连战 决战）',
        subLabel: '荡平黑虎涧双煞，护全嵩山少林药庄',
        tone: 'danger',
        effects: [
          {
            type: 'setFlag',
            flag: 'sl_q20_official_rebuked',
            value: true,
          },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q20_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBlackWindBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildBloodWolfBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '药庄医僧与少林清誉尽在身后，此战唯有斩煞方休！',
            introText: '【车轮连战 · 雨夜斩煞】暴雨中单刀迎战嵩山绿林双煞【黑风煞】与【血狼煞】！',
            onWin: [openScene('scene_slq20_16', SHAOLIN_Q20_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('绿林双煞合击凶悍异常，暂退牌坊廊下调匀内息后再战！', 'warn', '雨夜斩煞'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq20_16: {
    id: 'scene_slq20_16',
    title: '第十六幕 · 双煞伏诛',
    subtitle: '嵩山外院药庄牌坊',
    mandatory: true,
    beats: [
      N('苦战三十余合，雷声轰鸣！你硬扛血狼煞一记断魂劈，体内《盘山铁布衫》震得他刀刃反震脱手，顺势一记《龙爪手》扣喉夺命，血狼煞惨呼倒地气绝！'),
      N('黑风煞见义弟身死，双目赤红疯魔般扑来！你身形如游龙疾转，借着一道劈空闪电，一刀贯注浑厚佛门内劲直斩中宫——“咔嚓”一声，黑风煞手中鬼头大刀断为两截，刀芒透胸而过，这位横行豫西十余年的绿林巨寇轰然仰倒于血雨之中！'),
      N('余下暗藏山林的黑虎涧喽啰见双煞双双伏诛，骇得魂飞魄散，哭爹喊娘四散奔逃！'),
    ],
    onFinishEffects: [openScene('scene_slq20_17', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_17: {
    id: 'scene_slq20_17',
    title: '第十七幕 · 雨过天晴',
    subtitle: '嵩山少林寺 · 晨曦',
    mandatory: true,
    beats: [
      N('次日黎明，暴雨初歇，嵩山少室峰云海翻涌，朝阳洒满金瓦红墙。河南府官军连夜将贪官严世昌收押下狱，药庄三百亩药田丝毫无损。'),
      N('大雄宝殿钟鼓齐鸣一百零八响——此乃少林寺唯有册封真传首座或护寺大功臣方才动用的至高礼仪！知客僧恭敬步至你的寮房外合十相请：玄慈方丈与达摩、罗汉、戒律三院高僧已在【大雄正殿 · 佛前蒲团】等候！'),
    ],
    choices: [
      {
        id: 'slq20_go_investiture',
        label: '整肃衣冠，步入【大雄正殿 · 佛前蒲团】面见玄慈方丈',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q20_QUEST_ID, 'commander_investiture'),
          toast('黑虎涧双煞已伏诛！请步入【大雄正殿 · 佛前蒲团】受玄慈方丈册封！', 'success', '紫衣护寺'),
        ],
      },
    ],
  },

  scene_slq20_18: {
    id: 'scene_slq20_18',
    title: '第十八幕 · 满殿赞叹',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('踏入大雄正殿，香烟如柱，玄字辈高僧分列两厢，数百名少林僧俗弟子肃立殿外阶前，目光皆汇聚在你一人身上。'),
      S('NPC-0112', '（端坐方丈法座，声音浑厚慈和却传遍全殿）“阿弥陀佛。自五年前你于木桩廊大考择定【俗家护法脉】以来：先于汴京大相国寺夜荡青蛇帮、护持万姓雅市；继于洛阳伊阙龙门石桥力拒西夏铁骑、保全千斤紫金佛像；复千里南渡莆田九莲山、夜斩东瀛海寇、促成南北少林重归同源！”'),
      S('NPC-0112', '“如今更于寺门蒙冤之际，凭满腹经义策论请出朝廷勘合喝退贪官，复于子夜暴雨孤身斩杀绿林双煞、保全药庄！此等智勇双全、忠义无双之大功，纵观少林百年史册，亦属罕见！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_19', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_19: {
    id: 'scene_slq20_19',
    title: '第十九幕 · 破格晋升',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0112', '（起身缓步走下法座，亲手自鎏金托盘中捧起一件织金紫衣护法披风与一枚玄铁蟠龙令牌）“按少林旧制，真传职级多由出家高僧担任。然佛法不离世间觉，护法岂分剃度与否？经老衲与诸院玄字辈长老合议，今日破格晋升你为嵩山少林寺【紫衣护寺 · 俗家护法都统】，享少林真传弟子职级（Lv.3），总领天下少林俗家护法外务！”'),
      P('（心潮澎湃，上前一步单膝跪地，双手肃然接过紫衣与玄铁都统令牌）“弟子蒙方丈与诸位师伯破格提拔，感愧交并！此后无论江湖风波、朝堂暗流还是边关胡尘，弟子必以手中刀杖护持少林千年祖庭、佑泽天下苍生！”'),
    ],
    onFinishEffects: [openScene('scene_slq20_20', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_20: {
    id: 'scene_slq20_20',
    title: '第二十幕 · 紫衣护寺',
    subtitle: '大雄正殿 · 册封大典',
    illustrationUrl: '/assets/quests/sl_20_layman_commander.jpg',
    illustrationCaption: '大雄正殿 · 玄慈方丈亲赐紫衣与玄铁令牌，破格晋升少林 Lv.3 俗家护法都统',
    mandatory: true,
    beats: [
      N('你身披织金紫衣护法大氅起身而立，虽未剃发披缁，眉宇间却自有一股凛然不可侵犯的佛门金刚正气！殿外数百名少林僧俗弟子齐声合十诵贺：“阿弥陀佛！贺喜俗家护法都统！”'),
      S('NPC-0112', '（含笑颔首）“既登真传之位，少林藏经阁更深处的武学与天下更大的风浪，皆在前方等你。望你常怀慈悲本心，莫忘今日誓言。”'),
    ],
    onFinishEffects: [openScene('scene_slq20_21', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_21: {
    id: 'scene_slq20_21',
    title: '第二十一幕 · 声震中原',
    subtitle: '嵩山少林寺 · 山门远眺',
    mandatory: true,
    beats: [
      N('不日，嵩山少林寺破格册封「紫衣俗家护法都统」的消息随官道驿马传遍大宋诸路——汴京相国寺商贾额手称庆，洛阳金刀王家遣使致贺，莆田南少林亦飞鸽寄来元苦大师亲题贺联。'),
      N('你立于嵩山山门青石之上，远眺中原苍茫山河，深知这仅仅是真传之路的新起点。'),
    ],
    onFinishEffects: [openScene('scene_slq20_22', SHAOLIN_Q20_QUEST_ID)],
  },

  scene_slq20_22: {
    id: 'scene_slq20_22',
    title: '第二十二幕 · 都统立誓',
    subtitle: '大雄宝殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（抚摸腰间冰凉沉实的玄铁护法都统令牌，唇角扬起笃定笑意）“带发修行，紫衣护寺。自今日起，我便是少林俗家护法都统——天下英雄，且拭目以待！”'),
    ],
    choices: [
      {
        id: 'slq20_finish_reward',
        label: '拜谢玄慈方丈，正式晋升少林 Lv.3【俗家护法都统】（完成）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 3, promoteOnly: true },
          { type: 'giveCombatExp', amount: 550, reason: '汴京请勘喝退贪官、暴雨夜单刀斩绿林双煞并晋升俗家护法都统' },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifyRenown', delta: 90, reason: '破格受封嵩山少林寺紫衣俗家护法都统，声震中原' },
          { type: 'modifySkill', key: '策论', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'completeQuest', questId: SHAOLIN_Q20_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《紫衣护寺 · 俗家都统》！破格晋升嵩山少林寺 Lv.3 真传职级（俗家护法都统），威望 +90！',
            'success',
            '紫衣护寺',
          ),
        ],
      },
    ],
  },
}
