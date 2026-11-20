import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q13_QUEST_ID } from './shaolinJielvPumenStaffQuest'

const SPEAKER_HUILAI: StorySpeakerSpec = {
  kind: 'custom',
  name: '慧癞',
  title: '破戒叛僧 · 昔日少林杂役',
  factionName: '江湖散人',
  portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
}

const SPEAKER_OLD_FATHER: StorySpeakerSpec = {
  kind: 'custom',
  name: '李老丈',
  title: '汝州苦主 · 慧癞俗家老父',
  factionName: '汝州百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildHuiLaiBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ13_HUILAI',
    name: '慧癞',
    title: '破戒叛僧 · 铁杖狂僧',
    realm: '二流下品',
    factionName: '江湖散人',
    sectRank: 0,
    sectRankLabel: '破戒叛僧',
    avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
    talk: '“少林清规只管得着咱们苦命人，管不着贪官恶吏！你今日要拿我归山，先吃我这口浑铁禅杖！”',
    stats: { hp: 1120, mp: 760, agi: 42, res: 28 },
    talents: { bone: 70, comprehension: 52, charm: 34 },
    equippedArts: { neigong: 'MA-159', move1: 'MA-153', move2: 'MA-143' },
    learnedArts: [{ artId: 'MA-159', level: 5 }, { artId: 'MA-153', level: 5 }, { artId: 'MA-143', level: 5 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq13_01: {
    id: 'scene_slq13_01',
    title: '第一幕 · 钟鼓执杖',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}清秋，嵩山松风带着几分凛冽寒意掠过钟鼓禅院。晨钟余韵未绝，演武坪青石上早已整整齐齐列着两排戒律院铁杖。'),
      N('戒律院主「一拍神僧」玄寂负手立于石阶之上，身旁站着眉目低垂、手捻念珠的玄净。见你披着新颁的戒律院褐色僧袍步入坪中，玄寂颔首示意你上前。'),
      S('NPC-0134', '（目光如电，声若洪钟）“阿弥陀佛。你既已剃度受戒、归入我戒律药王一脉，便当知晓少林三堂之中，罗汉堂主杀伐护寺，达摩院主参禅悟道，唯独戒律院——手执铁杖，专司纠察寺规、清肃门风！”'),
      S('NPC-0134', '“执戒者若心慈手软，则千年祖庭必生蛀虫；若只知酷刑苛罚，则失了佛门本怀。今日老衲先传你戒律院镇院执杖绝艺《普门杖法》，你且看仔细了！”'),
    ],
    onFinishEffects: [openScene('scene_slq13_02', SHAOLIN_Q13_QUEST_ID)],
  },

  scene_slq13_02: {
    id: 'scene_slq13_02',
    title: '第二幕 · 领杖立誓',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S('NPC-0193', '（在旁微微合十，笑意淡薄）“玄寂师兄厚爱这位师侄，初入内门便亲授《普门杖法》。只是戒律院素来铁面无私，往后执杖办事，可莫要妇人之仁、丢了戒律院威严才好。”'),
      P('（双手合十，神色庄重）“弟子谨记玄寂师伯与玄净师叔教诲！愿以清规为尺，禅杖为凭，绝不负祖庭重托！”'),
    ],
    choices: [
      {
        id: 'slq13_accept_training',
        label: '恭谨接过戒律禅杖，随玄寂长老演练《普门杖法》',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q13_QUEST_ID, stepId: 'pumen_staff_drill' },
          setStep(SHAOLIN_Q13_QUEST_ID, 'pumen_staff_drill'),
          toast('已开启《钟鼓执杖 · 清规如铁》！随玄寂长老参悟《普门杖法》。', 'talk', '清规如铁'),
          openScene('scene_slq13_03', SHAOLIN_Q13_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq13_03: {
    id: 'scene_slq13_03',
    title: '第三幕 · 普门杖意',
    subtitle: '钟鼓禅院 · 演武坪演法',
    illustrationUrl: '/assets/quests/sl_13_pumen_staff.jpg',
    illustrationCaption: '钟鼓执杖 · 玄寂长老亲演《普门杖法》，杖影如莲，刚柔并济',
    mandatory: true,
    beats: [
      N('玄寂随手抄起一根六尺乌木禅杖，步踏莲花，杖势忽而如金刚怒目雷霆劈落，忽而如观音垂柳圆转卸力！三十六路《普门杖法》一气呵成，演武坪上落叶卷作莲台之形，竟无一片被劲风震碎！'),
      S('NPC-0134', '（收杖而立，气息不喘）“看清了么？普门杖法讲究『破邪不伤正，制敌不绝生』。横扫可退群魔，点穴可锁筋脉，每一杖皆留三分余地，正合戒律院『严中有慈』四字真谛。”'),
      N('你依着玄寂口诀反复拆招演练，直练至日影西斜，已将《普门杖法》起手式与锁腕卸兵诸般变化牢记于心，只待实战印证圆满。'),
    ],
    onFinishEffects: [teachArtNow('MA-117'), openScene('scene_slq13_04', SHAOLIN_Q13_QUEST_ID)],
  },

  scene_slq13_04: {
    id: 'scene_slq13_04',
    title: '第四幕 · 汝州急报',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('正值收功调息之际，知客院沙弥急匆匆捧来一封加盖汝州衙门朱印的急信，呈与玄净，玄净拆阅后眉头一挑，转身递给玄寂。'),
      S('NPC-0193', '“玄寂师兄，汝州出大事了！原在咱们寺中烧火挑水、半年前偷溜下山的杂役僧【慧癞】，三日前竟在汝州集镇当街破戒杀生，一铁杖打死了当地巡检官，如今正逃匿在汝州南郊破败山神庙中！官府已递文书上山，请我少林自清门户！”'),
      S('NPC-0134', '（细看公文，神色凝重）“破戒下山又公然杖杀朝廷命官……慧癞昔年在寺中虽性子倔强，却并非嗜杀凶徒，何以骤然铸此大错？”'),
      S('NPC-0193', '（冷笑一声）“师兄何必替叛僧开脱？人证物证俱在，朝廷命官横死当街，若不立刻派人废其武功、枷锁押回交割，只怕外头要议论我少林包庇凶僧！”'),
    ],
    onFinishEffects: [openScene('scene_slq13_05', SHAOLIN_Q13_QUEST_ID)],
  },

  scene_slq13_05: {
    id: 'scene_slq13_05',
    title: '第五幕 · 奉谕缉叛',
    subtitle: '钟鼓禅院石阶',
    mandatory: true,
    beats: [
      N('玄寂沉吟片刻，自袖中取出一面镌刻「戒律执杖」四字的紫铜令牌交入你手。'),
      S('NPC-0134', '“此事便交由你去办，权作你入戒律院后第一桩公案。你携我令牌星夜驰赴汝州南郊山神庙，擒拿慧癞归案。记住老衲一句话——清规须守，但佛门执杖之人，切不可偏听一面之词，务必查清前因后果再行决断！”'),
      P('（接过紫铜令牌，合十领命）“弟子遵命！这就整装下山，驰赴汝州山神庙查明真情！”'),
    ],
    choices: [
      {
        id: 'slq13_depart_ruzhou',
        label: '佩戒律令牌、携禅杖出发，驰赴汝州南郊山神庙',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q13_QUEST_ID, 'ruzhou_temple_verdict'),
          toast('已领戒律令牌！请于【钟鼓禅院演武坪】出发驰赴汝州山神庙缉拿慧癞。', 'talk', '荒庙缉叛'),
          openScene('scene_slq13_06', SHAOLIN_Q13_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq13_06: {
    id: 'scene_slq13_06',
    title: '第六幕 · 荒庙夜雨',
    subtitle: '汝州南郊 · 破败山神庙',
    illustrationUrl: '/assets/quests/sl_13_ruzhou_temple.jpg',
    illustrationCaption: '荒庙夜雨 · 破戒叛僧慧癞横杖守于残烛之前，身畔孤老泣血',
    mandatory: true,
    beats: [
      N('细雨如丝，暮色沉沉。你疾行数十里赶至汝州南郊荒坡，只见那座半塌的山神庙内透出一点豆大烛火。'),
      N('推开吱呀作响的残破木门，供桌前盘坐着一名衣衫褴褛、满脸风霜的粗犷僧人，膝头横着一根沾满暗红血迹的浑铁禅杖——正是叛僧慧癞！而在神龛角落的稻草堆里，竟还蜷缩着一名满头白发、腿脚带伤的庄稼老汉。'),
      S(SPEAKER_HUILAI, '（霍然睁眼，目光落在你腰间紫铜令牌与少林戒律僧袍上，发出一声惨笑）“嘿，少林戒律院的师弟来得倒快！怎么，是来废我武功、提我项上人头去向汝州官府邀功的么？”'),
      P('（横杖于胸，沉声喝道）“慧癞！汝州官府递文上山，称你破戒杀官、逃匿于此。玄寂师伯命我前来拿你归山——你若有冤屈，此刻大可道来！”'),
    ],
    onFinishEffects: [openScene('scene_slq13_07', SHAOLIN_Q13_QUEST_ID)],
  },

  scene_slq13_07: {
    id: 'scene_slq13_07',
    title: '第七幕 · 血泪冤情',
    subtitle: '汝州南郊 · 破败山神庙',
    mandatory: true,
    beats: [
      S(SPEAKER_OLD_FATHER, '（挣扎着爬出草堆，哭喊着抱住你的僧袍下摆）“大师！大师饶命啊！我儿不是坏人，他杀的那个狗巡检是畜生不如的恶霸啊！”'),
      S(SPEAKER_HUILAI, '（双目赤红，青筋暴起，声音颤抖）“半年前我听闻老父病重才偷溜下山省亲！谁料汝州那姓张的恶巡检看中了我年方十六的幼妹，竟趁夜带人砸门强抢！我妹子烈性宁死不从，一头栽进了后院枯井……”'),
      S(SPEAKER_HUILAI, '“我老父去衙门击鼓鸣冤，反被那狗官打断了右腿扔出大街！我亲眼看着亲妹尸骨未寒、老父垂死哀嚎，试问师弟——若换作是你，这一铁杖砸是不砸？！”'),
      N('山神庙外秋雨淅沥，雷声隐隐。你望向那名右腿肿胀变形、泪流满面的李老丈，胸中一时翻涌难平。'),
    ],
    onFinishEffects: [openScene('scene_slq13_08', SHAOLIN_Q13_QUEST_ID)],
  },

  scene_slq13_08: {
    id: 'scene_slq13_08',
    title: '第八幕 · 佛法难两全',
    subtitle: '汝州南郊 · 破败山神庙',
    mandatory: true,
    beats: [
      S(SPEAKER_HUILAI, '（猛然起身，将李老丈护至神像背后，单手擎起浑铁禅杖，眼中已存死志）“别用什么佛门清规来劝我！杀了狗官我慧癞认命，大不了一死！可我老父伤重无人照料，官府鹰犬一旦寻来定要株连灭口——今日我拼了这条命，也要杀出条路送我爹去乡下亲戚家躲过这劫！”'),
      P('（深吸一口气，禅杖一顿青砖）“恶吏欺民固然可恨，但你手执凶器、亡命天涯，只会连累老丈一同陷入绝境！先放下铁杖，随我查证周全！”'),
      S(SPEAKER_HUILAI, '“少废话！接杖吧！”'),
    ],
    onFinishEffects: [openScene('scene_slq13_09', SHAOLIN_Q13_QUEST_ID)],
  },

  scene_slq13_09: {
    id: 'scene_slq13_09',
    title: '第九幕 · 荒庙斗杖',
    subtitle: '汝州山神庙（实战擒敌）',
    mandatory: true,
    beats: [
      N('慧癞悲愤交加，浑铁禅杖挟着破釜沉舟之势呼啸横扫，招招势大力沉，竟隐隐带着几分昔年在少林偷学打熬出的刚猛底子！'),
    ],
    choices: [
      {
        id: 'slq13_fight_huilai',
        label: '施展《普门杖法》迎战破戒叛僧【慧癞】（二流下品 · 实战）',
        subLabel: '以巧制刚，制伏狂怒中的慧癞',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q13_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuiLaiBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '慧癞此刻已失理智，若放其逃窜必与官军火并、祸及孤老！',
            introText: '【汝州山神庙】以《普门杖法》迎战破戒叛僧【慧癞】，生擒问罪！',
            onWin: [openScene('scene_slq13_10', SHAOLIN_Q13_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('慧癞杖势疯狂，暂且抽身退避调息，整理好状态再入山神庙擒敌！', 'warn', '荒庙缉叛'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq13_10: {
    id: 'scene_slq13_10',
    title: '第十幕 · 杖下生擒',
    subtitle: '汝州南郊 · 破败山神庙',
    mandatory: true,
    beats: [
      N('数十合激战，庙内尘灰漫天！你牢记玄寂所授「破邪不伤正」诀窍，先以普门杖法「莲步拨云」挑偏铁杖锋芒，继而顺势旋杖一扣，杖尾精准点中慧癞右肘曲池穴！'),
      N('“哐当”一声，浑铁禅杖脱手坠地，慧癞半边身子酸麻无力，轰然单膝跪倒在残烛之前。'),
      S(SPEAKER_HUILAI, '（惨笑闭目，昂首引颈）“好精妙的普门杖法……我输得心服口服。要废我武功也好，押我进死牢也罢，只求师弟发发慈悲，莫要难为我这残废老爹……”'),
      S(SPEAKER_OLD_FATHER, '（老泪纵横，连连叩首）“大师行行好……我老婆子走得早，闺女又被狗官逼死，如今就剩这一个儿子啊……”'),
    ],
    onFinishEffects: [openScene('scene_slq13_11', SHAOLIN_Q13_QUEST_ID)],
  },

  scene_slq13_11: {
    id: 'scene_slq13_11',
    title: '第十一幕 · 铁律与悲心',
    subtitle: '汝州山神庙 · 戒律抉择',
    mandatory: true,
    beats: [
      N('残烛噼啪爆出一朵灯花，映照着你手中微凉的紫铜戒律令牌。'),
      N('依少林古规，破戒杀生、叛出山门者，当场废去武功、枷锁押回戒律院发落，绝不容情，方能震慑四方、向朝廷交代；然眼前恶吏逼死良女在先，孤老悲啼在侧，若先托可靠乡邻安顿李老丈，再晓以大义劝慧癞自缚归山、并代为向玄寂禀明冤情求一线生机，亦未尝不是佛门慈悲……'),
    ],
    choices: [
      {
        id: 'slq13_choose_strict',
        label: '【清规如铁】当场封脉废功、严加押解回山（戒律风格：铁面严惩）',
        subLabel: '不徇私情，以雷霆铁律维系少林清规与朝廷法度',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q13_strict_chosen', value: true },
          openScene('scene_slq13_12', SHAOLIN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'slq13_choose_mercy',
        label: '【悲智双运】留银安顿孤老，劝慧癞自缚归山领罪（戒律风格：法外存慈）',
        subLabel: '妥善安置苦主亲眷，凭实情向玄寂长老陈情从轻发落',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q13_strict_chosen', value: false },
          openScene('scene_slq13_13', SHAOLIN_Q13_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq13_12: {
    id: 'scene_slq13_12',
    title: '第十二幕 · 铁面废功',
    subtitle: '汝州山神庙（严惩线）',
    mandatory: true,
    beats: [
      P('（神色冷肃，合十宣佛号）“阿弥陀佛。巡检恶行自有大宋刑律与州府御史台清查，然你既入佛门便当守戒，私行杀戮、叛逃山门已破根本大戒。若今日因情废法，明日天下僧俗皆效仿私刑，少林千年清规何存！”'),
      N('你不再迟疑，并指如风连点慧癞气海、膻中数处大穴，震散其数载苦修的杂役内息，以麻绳锁缚其双腕；又留下少许散碎铜钱托庙外善心村正照看李老丈，随即押着面如死灰的慧癞冒雨踏上归途。'),
      S(SPEAKER_HUILAI, '（惨然低头，不再多言）“好一个铁面戒律僧……走罢。”'),
    ],
    onFinishEffects: [openScene('scene_slq13_14', SHAOLIN_Q13_QUEST_ID)],
  },

  scene_slq13_13: {
    id: 'scene_slq13_13',
    title: '第十三幕 · 慈心渡迷',
    subtitle: '汝州山神庙（慈悲线）',
    mandatory: true,
    beats: [
      P('（收杖还鞘，俯身扶起李老丈，目光温和却坚定）“老丈请起。恶巡检强抢民女、殴伤苦主，此冤绝不会石沉大海！我这就请汝州城内相熟善信与医馆大夫接老丈去安养治伤，并代写状纸递交提点刑狱司核查！”'),
      P('（转望慧癞，沉声道）“慧癞师兄，你报仇雪恨固然情有可原，但杀人终须偿法、破戒终须受惩。你若肯随我自缚归山，在玄寂师伯与方丈座前坦诚认罪，我必将此间血泪实情如实禀明，求祖庭保你性命、戴罪修行。你可愿信我一回？”'),
      S(SPEAKER_HUILAI, '（怔怔良久，热泪夺眶而出，俯身重重叩首）“师弟大恩大德，慧癞粉身碎骨难报！只要我爹有活路，我愿自缚随你回少林领受一切责罚，绝无半句怨言！”'),
      N('你先将李老丈妥帖托付给当地行善乡绅延医照料，又取了乡邻联名按印的实情状纸，随即携自缚双手的慧癞星夜回山。'),
    ],
    onFinishEffects: [openScene('scene_slq13_14', SHAOLIN_Q13_QUEST_ID)],
  },

  scene_slq13_14: {
    id: 'scene_slq13_14',
    title: '第十四幕 · 钟鼓复命',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('次日午后，嵩山云开雾散。你将慧癞押至钟鼓禅院演武坪戒律堂前，向玄寂长老与玄净禅师一一呈上汝州所查实情。'),
      S('NPC-0193', '（听罢恶巡检逼死民女一事，面无表情地拂袖道）“哼，俗世官民纠纷干我佛门何事？只要把这惹祸的叛僧按律发落、莫让少林沾上官司便罢。”'),
      S('NPC-0134', '（却并未理会玄净，只抬眸静静凝视着你，神色深不可测）“汝州一案，你既凭普门杖法生擒慧癞，又亲手做了决断。老衲心中已有分晓。”'),
    ],
    onFinishEffects: [
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_q13_strict_chosen', op: 'truthy' },
        thenEffects: [openScene('scene_slq13_15', SHAOLIN_Q13_QUEST_ID)],
        elseEffects: [openScene('scene_slq13_16', SHAOLIN_Q13_QUEST_ID)],
      },
    ],
  },

  scene_slq13_15: {
    id: 'scene_slq13_15',
    title: '第十五幕 · 清规如铁',
    subtitle: '钟鼓禅院演武坪（铁面严惩结局）',
    mandatory: true,
    beats: [
      S('NPC-0134', '（轻声一叹，点头赞许）“阿弥陀佛。你当机立断、废功押回，既保住了少林千年清规威仪，亦令朝廷挑不出半分错处。戒律院执杖之人，正需这般铁面无私的定力。至于那恶巡检遗留之冤，老衲自会修书托旧识御史暗中查办。”'),
      S('NPC-0134', '“今日起，这卷《普门杖法》完整心诀便正式授你研习。望你谨守本心，莫令手中禅杖蒙尘！”'),
      N('你双手合十领受《普门杖法》全卷秘诀，只觉掌中禅杖沉甸甸的，分外清明。'),
    ],
    choices: [
      {
        id: 'slq13_finish_strict',
        label: '合十谢过玄寂师伯，领受《普门杖法》（完成《钟鼓执杖 · 清规如铁》）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_jielv_style', value: 'strict' },
          { type: 'teachMartialArt', artId: 'MA-117' },
          { type: 'giveCombatExp', amount: 260, reason: '汝州山神庙以普门杖法生擒破戒叛僧慧癞' },
          { type: 'addSectContribution', amount: 100 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 12 },
          { type: 'completeQuest', questId: SHAOLIN_Q13_QUEST_ID, outcome: 'strict' },
          toast(
            '已完成《钟鼓执杖 · 清规如铁》（严惩线）！习得《普门杖法》，获 260 实战经验与 100 门派贡献！',
            'success',
            '清规如铁',
          ),
        ],
      },
    ],
  },

  scene_slq13_16: {
    id: 'scene_slq13_16',
    title: '第十六幕 · 悲智双运',
    subtitle: '钟鼓禅院演武坪（悲心渡迷结局）',
    mandatory: true,
    beats: [
      S('NPC-0134', '（罕见地露出一丝温煦笑意，抚掌赞叹）“善哉，善哉！法不外乎人情，你未以暴制暴，反而妥善安顿孤老、收集冤状，令慧癞心服口服自缚领罪！老衲会将他收入后山思过崖面壁十年，并修书开封府与提刑司为李家洗冤！”'),
      S('NPC-0134', '“你已真正悟透《普门杖法》『降魔不伤慈』之真意。这卷完整秘诀，你且收好，日后好生护持佛门正道！”'),
      N('晨风拂过钟鼓禅院，你合十领受《普门杖法》全卷心法，只觉胸中禅意与杖意圆融贯通。'),
    ],
    choices: [
      {
        id: 'slq13_finish_mercy',
        label: '合十谢过玄寂师伯，领受《普门杖法》（完成《钟鼓执杖 · 清规如铁》）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_jielv_style', value: 'mercy' },
          { type: 'teachMartialArt', artId: 'MA-117' },
          { type: 'giveCombatExp', amount: 260, reason: '汝州山神庙以普门杖法生擒并感化慧癞' },
          { type: 'addSectContribution', amount: 100 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 12 },
          { type: 'completeQuest', questId: SHAOLIN_Q13_QUEST_ID, outcome: 'mercy' },
          toast(
            '已完成《钟鼓执杖 · 清规如铁》（慈悲线）！习得《普门杖法》，获 260 实战经验与 100 门派贡献！',
            'success',
            '悲智双运',
          ),
        ],
      },
    ],
  },
}
