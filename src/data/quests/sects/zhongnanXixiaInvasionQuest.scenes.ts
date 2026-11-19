import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q29_QUEST_ID } from './zhongnanXixiaInvasionQuest'

const SPEAKER_XIXIA_HERALD: StorySpeakerSpec = {
  kind: 'custom',
  name: '西夏一品堂传令校尉',
  title: '夏国相亲信使者',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq29_01: {
    id: 'scene_znq29_01',
    title: '第一幕 · 贺兰黑云压秦岭',
    subtitle: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
    illustrationUrl: '/assets/quests/zn_q29_helan_black_cloud.jpg',
    illustrationCaption: '腊月黑云压顶，千百支西夏火把如黑龙盘旋终南山道，重阳古观警钟震彻寒夜',
    mandatory: true,
    beats: [
      N('{reignYear}腊月二十三，小年之夜。暴雪骤停，整座终南山却被一层厚重如铁的漆黑阴云死死压住。'),
      N('山脚之下，绵延数里的西夏火把宛若一条择人而噬的黑龙，正沿着终南古道无声逼近！重阳古观九口景钟齐鸣，你火速驰援至【重阳玄门清修主殿】前，只见紫阳真人【王重楼】与寒玉仙子【林朝瑶】竟破天荒地并肩立于丹墀之上，面色皆凝重至极！'),
    ],
    onFinishEffects: [
      { type: 'startQuest', questId: ZHONGNAN_Q29_QUEST_ID, stepId: 'hall_crisis' },
      { type: 'teleportPlayer', regionId: 'zhongnanshan', buildingId: 'zn_tao', spotId: 'zn_to_hall' },
      openScene('scene_znq29_02', ZHONGNAN_Q29_QUEST_ID),
    ],
  },

  scene_znq29_02: {
    id: 'scene_znq29_02',
    title: '第二幕 · 国相密旨动铁鹞',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0084', '（回忆数日前兴庆府国相府密令——夏国相没藏讹庞手握狼头令箭，阴冷沉喝）“终南山那群道士与古墓疯妇，屡坏我大夏延安与关中大事！传令一品堂：命铁鹞大将军赫连霸先与段延庆亲携‘悲酥清风露’，腊月二十三夜踏平终南，鸡犬不留！”'),
      S('NPC-0133', '（负手望向山下火龙，声音低沉如雷）“没藏讹庞终于撕破了议和假面。今夜上山的不是寻常游骑，而是西夏一品堂最精锐的死士与两大宗师！”'),
    ],
    onFinishEffects: [openScene('scene_znq29_03', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_03: {
    id: 'scene_znq29_03',
    title: '第三幕 · 双尊并立誓护山',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0114', '（素衣翻飞，寒玉剑横于身前）“重阳古观若失，活死人墓岂能独存？王道长，三十载赌约暂且搁置，今夜先退了西夏强敌再论旧账。”'),
      S('NPC-0133', '（微微颔首，望向你沉声叮嘱）“{ifFlagEq:zn_branch=guguan|古观长老|古墓尊使}，你即刻率两脉核心弟子守住大殿两翼，千万提防西夏人下毒暗算！”'),
      P('“弟子领命！纵粉身碎骨，绝不让西夏人踏破山门！”'),
    ],
    onFinishEffects: [openScene('scene_znq29_04', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_04: {
    id: 'scene_znq29_04',
    title: '第四幕 · 铁鹞先声震山门',
    subtitle: '重阳玄门清修主殿前坪',
    mandatory: true,
    beats: [
      N('“轰隆——！”重阳古观外山门牌楼被一股狂暴掌风硬生生震塌！火光映照下，数百名身披黑铁重甲的一品堂精锐鱼贯涌入，将整座清修主殿广场围得水泄不通！'),
      S(SPEAKER_XIXIA_HERALD, '（高举西夏狼头大旗狂喝）“大夏国相有令：终南隐宗若肯交出《先天功》与《玉女心经》秘籍、归降我西夏一品堂，可免满门屠戮！”'),
    ],
    onFinishEffects: [openScene('scene_znq29_05', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_05: {
    id: 'scene_znq29_05',
    title: '第五幕 · 两大宗师踏雪临',
    subtitle: '重阳玄门清修主殿前坪',
    mandatory: true,
    beats: [
      N('人群骤然分开，两道渊渟岳峙、令人窒息的宗师身影缓缓步入广场中央！'),
      N('左侧一人身披玄铁重铠、背负七尺斩马铁刀，双目如虎豹闪烁凶光，正是西夏一品堂统帅「铁鹞大将军」【赫连霸先】！右侧一人身着青袍、面容枯槁却双目精芒暴射，拄着一对漆黑精钢双拐，虽双腿残废却每步点地如履平地——赫然是四大恶人之首「恶贯满盈」【段延庆】！'),
    ],
    onFinishEffects: [openScene('scene_znq29_06', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_06: {
    id: 'scene_znq29_06',
    title: '第六幕 · 腹语铁拐傲终南',
    subtitle: '重阳玄门清修主殿前坪',
    mandatory: true,
    beats: [
      S('NPC-0130', '（按住斩马铁刀，放声狂笑）“王重楼！林朝瑶！久闻终南双尊名震中原，今日赫连某奉国相之命特来讨教！”'),
      S('NPC-1053', '（喉结未动，一阵尖锐刺耳、仿佛自地底透出的腹语在寒夜中炸响）“桀桀……重阳古观？活死人墓？今夜过后，终南山便再无隐宗二字！”'),
    ],
    onFinishEffects: [openScene('scene_znq29_07', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_07: {
    id: 'scene_znq29_07',
    title: '第七幕 · 悲酥清风骤然起',
    subtitle: '重阳玄门清修主殿前坪',
    illustrationUrl: '/assets/quests/zn_q29_beisu_qingfeng_mist.jpg',
    illustrationCaption: '无色无味的悲酥清风露随西北寒风席卷广场，终南弟子纷纷泪流满面、内力顿失',
    mandatory: true,
    beats: [
      N('话音未落，赫连霸先猛然一挥大袖！暗藏于上风口松林中的数十名西夏毒卒同时拔开瓷瓶木塞——一阵无色无味、清冽如微风的奇异冷香瞬间借着西北山风席卷整座广场！'),
      N('“不好！是西夏一品堂绝顶奇毒——‘悲酥清风露’！”广场上数十名修为尚浅的古观与古墓弟子骤然双目刺痛泪流不止，紧接着浑身酸软无力，手中长剑叮当坠地！'),
    ],
    onFinishEffects: [openScene('scene_znq29_08', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_08: {
    id: 'scene_znq29_08',
    title: '第八幕 · 双尊护徒遭暗算',
    subtitle: '重阳玄门清修主殿前坪',
    mandatory: true,
    beats: [
      N('见门下弟子大批倒地，王重楼与林朝瑶同时大惊，齐齐运起护体罡气扫开毒风、俯身去护身旁中招的年轻弟子！'),
      N('段延庆与赫连霸先等的就是这一瞬破绽！段延庆铁拐凌空点出两道凌厉无匹的一阳指劲，赫连霸先斩马铁刀如黑雷劈落——双尊仓促回防，虽硬生生震退二贼，却因毒风入体兼分神护徒，齐齐闷哼一声，嘴角同时溢出殷红鲜血！'),
    ],
    onFinishEffects: [openScene('scene_znq29_09', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_09: {
    id: 'scene_znq29_09',
    title: '第九幕 · 危局当关挺孤剑',
    subtitle: '重阳玄门清修主殿前坪',
    mandatory: true,
    beats: [
      N('你因早有防备、闭气运转高深内功并连服随身解毒灵丹，虽双目微涩，周身真气竟尚存八九成！眼见赫连霸先与段延庆趁势扑向负伤的双尊，你毫不犹豫横剑飞身挡在丹墀之前！'),
      P('（长剑震鸣，凛然大喝）“师尊与林前辈速带受伤同门退往后山寒玉涧！此间地势险窄，弟子替你们挡住这两名宗师！”'),
      S('NPC-0133', '（目眦欲裂，强压伤势）“不可！赫连霸先与段延庆皆是宗师境绝顶强敌，你万不可与他们硬拼生死——只需撑住数合、撕开缺口，便立刻抽身退入寒玉涧！”'),
    ],
    onFinishEffects: [
      setStep(ZHONGNAN_Q29_QUEST_ID, 'break_siege'),
      openScene('scene_znq29_10', ZHONGNAN_Q29_QUEST_ID),
    ],
  },

  scene_znq29_10: {
    id: 'scene_znq29_10',
    title: '第十幕 · 铁鹞霸刀压孤峰',
    subtitle: '重阳玄门清修主殿前坪',
    mandatory: true,
    beats: [
      S('NPC-0130', '（提着七尺斩马铁刀大步踏上，狂笑声震落檐雪）“哈哈哈！一个年轻小辈竟敢替王重楼和林朝瑶断后？好胆色！接本将三合铁鹞霸刀不死，便饶你全尸！”'),
      P('（心念如冰，剑势凝而不发）“要过此阶，先问过我手中终南长剑！”'),
    ],
    onFinishEffects: [openScene('scene_znq29_11', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_11: {
    id: 'scene_znq29_11',
    title: '第十一幕 · 死战撑招赫连刀',
    subtitle: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
    illustrationUrl: '/assets/quests/zn_q29_duan_helian_siege.jpg',
    illustrationCaption: '火光冲天毒雾弥漫，你孤剑死守丹墀石阶，迎着赫连霸先铁刀与段延庆双拐苦撑破围',
    mandatory: true,
    beats: [
      N('赫连霸先宗师境的霸道刀势如山崩海啸倾泻而来！你深知不可力敌，唯有以灵动步法与阴阳卸力之术死守门户，只要撑满三合稳住阵脚，便能为后方撤离赢得生机！'),
    ],
    choices: [
      {
        id: 'znq29_ch_survive_helian',
        label: '死守石阶，硬撑铁鹞大将军赫连霸先三合宗师杀招！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q29_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0130' },
            rule: 'survive_rounds',
            maxRounds: 3,
            lethalOnLose: false,
            introText: '宗师境铁鹞大将军赫连霸先挥刀狂劈！稳守防御、撑满三合即可破局！',
            onWin: [openScene('scene_znq29_12', ZHONGNAN_Q29_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 75, mpPct: 75 },
              toast('赫连霸先刀势惊天，切记善用防御与卸力撑满三合！', 'warn', '撑招破围'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq29_12: {
    id: 'scene_znq29_12',
    title: '第十二幕 · 卸刀震雪惊铁鹞',
    subtitle: '重阳玄门清修主殿前坪',
    mandatory: true,
    beats: [
      N('三合转瞬即逝！赫连霸先三记开山裂石的宗师重刀，竟全被你以精妙绝伦的先天易数步法与至柔剑意一一引偏斩碎青石！'),
      S('NPC-0130', '（虎目圆睁，收刀怒喝）“好滑溜的小滑头！竟能以一流之境硬接本将三刀不倒！”'),
    ],
    onFinishEffects: [openScene('scene_znq29_13', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_13: {
    id: 'scene_znq29_13',
    title: '第十三幕 · 恶贯满盈封退路',
    subtitle: '重阳玄门清修主殿前坪',
    mandatory: true,
    beats: [
      N('趁你挡住赫连霸先的间隙，王重楼与林朝瑶已护着大部分受伤弟子退入后山栈道！然而一声刺耳的铁拐点地声骤然在你身后响起——「恶贯满盈」【段延庆】竟施展诡异轻功绕至栈道口，铁拐夹带凌厉一阳指劲彻底封死了你的退路！'),
      S('NPC-1053', '（腹语阴森冰冷）“赫连将军，何必与这小辈废话？老夫先废了他四肢，再拿他做饵逼王重楼与林朝瑶现身！”'),
    ],
    onFinishEffects: [openScene('scene_znq29_14', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_14: {
    id: 'scene_znq29_14',
    title: '第十四幕 · 铁拐一阳指如雷',
    subtitle: '重阳玄门清修主殿前坪',
    mandatory: true,
    beats: [
      N('段延庆乃当世宗师中品绝顶人物，双拐点穴配以大理段氏一阳指，隔空指风嗤嗤作响，比赫连霸先更为阴狠难测！你咬牙调匀真气，准备在段延庆手下硬撑四合、寻隙突围！'),
    ],
    choices: [
      {
        id: 'znq29_ch_survive_duan',
        label: '拼死周旋，硬撑恶贯满盈段延庆四合宗师绝杀破围！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q29_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-1053' },
            rule: 'survive_rounds',
            maxRounds: 4,
            lethalOnLose: false,
            introText: '宗师中品段延庆铁拐指风齐出！死守心脉、撑满四合即可寻隙突围！',
            onWin: [openScene('scene_znq29_15', ZHONGNAN_Q29_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 75, mpPct: 75 },
              toast('段延庆一阳指劲霸道绝伦，切记稳守防御与丹药周旋，撑满四合即可破围！', 'warn', '血战突围'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq29_15: {
    id: 'scene_znq29_15',
    title: '第十五幕 · 借势断桥撕重围',
    subtitle: '重阳古观后山栈道',
    mandatory: true,
    beats: [
      N('第四合终了！段延庆一记凌厉一阳指擦过你肩头，将身旁粗大松干洞穿！你借着指风震荡之势凌空倒翻，反手一剑斩断栈道悬索，整座木桥轰然坠入万丈深涧！'),
      S('NPC-1053', '（拄拐立于断崖边，腹语怒极反笑）“好个机警的小辈！算你命大——不过终南山四面皆已被我一品堂铁骑围死，我看你们能在寒玉涧里躲到几时！”'),
    ],
    onFinishEffects: [openScene('scene_znq29_16', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_16: {
    id: 'scene_znq29_16',
    title: '第十六幕 · 浴血退入寒玉涧',
    subtitle: '终南后山山道',
    mandatory: true,
    beats: [
      N('你强忍肩头指风火辣剧痛，踏雪疾奔入后山深处。身后重阳古观前山已燃起冲天火光，西夏军号声回荡整座秦岭。'),
    ],
    onFinishEffects: [openScene('scene_znq29_17', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_17: {
    id: 'scene_znq29_17',
    title: '第十七幕 · 涧谷凄风听伤声',
    subtitle: '终南后山寒玉涧外',
    mandatory: true,
    beats: [
      N('寒玉涧水汽蒸腾，天然形成的浓雾暂时阻隔了西夏大军的追击。两脉数十名幸存弟子正相互搀扶包扎伤口，气氛悲壮压抑。'),
    ],
    onFinishEffects: [openScene('scene_znq29_18', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_18: {
    id: 'scene_znq29_18',
    title: '第十八幕 · 双尊负伤分两畔',
    subtitle: '终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q29_twin_masters_retreat.jpg',
    illustrationCaption: '寒玉涧残碑雾气迷蒙，王重楼与林朝瑶虽俱负重伤，仍各自静坐溪水两侧调息护阵',
    mandatory: true,
    beats: [
      N('你踉跄赶回【繁花幽谷双剑合璧坪】，只见残碑两侧寒雾笼罩——紫阳真人【王重楼】盘坐涧北青石之上运功逼毒，道袍染血；寒玉仙子【林朝瑶】静坐涧南寒石之畔，素衣蒙尘，眉宇间亦透着极深的疲惫。'),
    ],
    choices: [
      {
        id: 'znq29_ch_go_stream',
        label: '踏上【繁花幽谷双剑合璧坪】，拜见负伤双尊共商破局大计！',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q29_QUEST_ID, 'stream_decision'),
          { type: 'teleportPlayer', regionId: 'zhongnanshan', buildingId: 'zn_stream', spotId: 'zn_st_sword' },
          { type: 'setFlag', flag: 'znq29_stream_triggered', value: true },
          openScene('scene_znq29_22', ZHONGNAN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'znq29_ch_rest_stream',
        label: '先包扎肩头伤势，稍后自行前往繁花幽谷双剑合璧坪',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q29_QUEST_ID, 'stream_decision'),
          openScene('scene_znq29_19', ZHONGNAN_Q29_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq29_19: {
    id: 'scene_znq29_19',
    title: '第十九幕 · 寒泉洗血定心神',
    subtitle: '终南后山寒玉涧',
    mandatory: true,
    beats: [
      N('你以寒玉涧清泉敷洗肩伤、调匀内息，随即迈步走向【繁花幽谷双剑合璧坪】。'),
    ],
  },

  scene_znq29_20: {
    id: 'scene_znq29_20',
    title: '第二十幕 · 悲酥余毒难速除',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('残碑之前，寒风呜咽。王重楼与林朝瑶缓缓睁开双眼，虽已压住悲酥清风余毒，然内伤沉重，短时间内皆难恢复全盛宗师战力。'),
    ],
    onFinishEffects: [openScene('scene_znq29_21', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_21: {
    id: 'scene_znq29_21',
    title: '第二十一幕 · 强敌围山计安出',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('远处山脊上西夏战鼓隐隐隆隆作响——黎明之后，段延庆与赫连霸先必将率西夏一品堂大军踏平寒玉涧！'),
    ],
    onFinishEffects: [openScene('scene_znq29_22', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_22: {
    id: 'scene_znq29_22',
    title: '第二十二幕 · 双尊问策生死局',
    subtitle: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0133', '（轻咳一声，凝视着浴血归来的你，眼中满是痛惜与赞叹）“徒儿……方才若非你在清修主殿以一人之力硬撑赫连霸先与段延庆七合、断桥破围，终南两脉今夜便已覆灭。”'),
      S('NPC-0114', '（目光穿过残碑落于你身，声音虽轻却字字千钧）“然而劫数尚未过去。我与王道长俱受毒伤，天明之后段延庆与赫连霸先再度合围寒玉涧，单凭我二人任何一脉之力，皆难敌两大宗师联手。”'),
    ],
    onFinishEffects: [openScene('scene_znq29_23', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_23: {
    id: 'scene_znq29_23',
    title: '第二十三幕 · 残碑之前论合分',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0133', '（缓缓指向身旁雷劈残碑）“三十年前，我与林师妹在此碑立誓：大劫临山之时，唯双剑合璧、阴阳归元，方可见终南无上真传。如今两脉皆临绝境，唯有两种破局之道——”'),
      S('NPC-0114', '“其一，彻底破除三十年门户之见！由你居中牵线，融汇古观《先天功》与古墓《玉女心经》之长，促成双脉合一、重演‘双剑合璧’无上剑道以斩强敌！”'),
    ],
    onFinishEffects: [openScene('scene_znq29_24', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_24: {
    id: 'scene_znq29_24',
    title: '第二十四幕 · 孤峰独行抑或同归',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0133', '“其二，若你深信两脉大道殊途不可强融、宁守本脉清净纯粹——便由你独承{ifFlagEq:zn_branch=guguan|重阳古观先天绝学|活死人墓玉女绝剑}，以本脉孤峰极境独自正面迎战西夏群魔，哪怕两脉从此各安天命、永不相融，亦保本脉道统不坠！”'),
      N('话音落下，整座寒玉涧死寂无声！古观与古墓幸存弟子、王重楼与林朝瑶的目光，在这一刻尽数汇聚于你一身！'),
    ],
    onFinishEffects: [openScene('scene_znq29_25', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_25: {
    id: 'scene_znq29_25',
    title: '第二十五幕 · 终南命运终极抉择',
    subtitle: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q29_harmony_or_split.jpg',
    illustrationCaption: '残碑矗立寒雾之中，你的抉择将决定终南双脉是「双剑合璧 · 阴阳归元」，还是「独守本脉 · 孤峰血战」',
    mandatory: true,
    beats: [
      N('天地苍茫，残碑无言。三十载青梅旧约的恩怨与终南隐宗未来百年的命运，此刻全系于你一念之间！'),
    ],
    choices: [
      {
        id: 'znq29_ch_harmony',
        label: '【双脉合流】“阴阳互济方是终南大道！请双尊放下三十载旧怨，合两脉之力重演双剑合璧！”',
        subLabel: '开启终南终局分支：阴阳归元 · 双剑合璧线（zn_q29_choice = harmony）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'zn_q29_choice', value: 'harmony' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 10 },
          openScene('scene_znq29_26', ZHONGNAN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'znq29_ch_split',
        label: '【独守本脉】“道不同不相为谋！弟子愿独承本脉至高道统，以孤峰绝剑血战西夏群魔！”',
        subLabel: '开启终南终局分支：独尊本脉 · 孤峰破敌线（zn_q29_choice = split）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'zn_q29_choice', value: 'split' },
          { type: 'modifyChivalry', delta: 20, reason: '孤峰独行坚守本脉道统' },
          openScene('scene_znq29_27', ZHONGNAN_Q29_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq29_26: {
    id: 'scene_znq29_26',
    title: '第二十六幕 · 冰释前嫌誓同归',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('听闻你铿锵宣言，王重楼与林朝瑶隔涧相望良久，终于同时展颜一笑——三十载冰雪封冻的坚冰，在这一夜彻底消融！'),
      S('NPC-0133', '“好！既然我终南后辈已有此气魄与胸襟，老道与林师妹又何必再执着于昔年意气！今夜起，古观古墓重归一家，共传你阴阳合璧之秘！”'),
      S('NPC-0114', '“不错。待破尽西夏一品堂之日，便教天下见识真正的终南双剑合璧！”'),
    ],
    onFinishEffects: [openScene('scene_znq29_28', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_27: {
    id: 'scene_znq29_27',
    title: '第二十七幕 · 孤峰傲立守道统',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('听闻你决绝宣言，残碑前冷风骤紧。王重楼与林朝瑶对视一眼，俱皆默然长叹，眼中既有遗憾，亦对你那份不改初心的孤傲剑意生出一丝敬重。'),
      S(
        'NPC-0133',
        '{ifFlagEq:zn_branch=guguan|“既如此，老道便将重阳古观至高绝学毫无保留相授于你！古墓自有古墓之路，我重阳一脉自有顶天立地之骨！”|“看来三十载赌约，终究难求圆满……林师妹，这孩子既有孤峰独行之志，便由你亲授古墓绝境剑道吧。”}',
      ),
      S(
        'NPC-0114',
        '{ifFlagEq:zn_branch=guguan|“道不同，不相为谋。既然古观欲独行其道，活死人墓便守住后山，互不相负。”|“好孩子！你既执意守护活死人墓纯粹道统，为师便倾囊相授，助你以孤剑斩尽贺兰群魔！”}',
      ),
    ],
    onFinishEffects: [openScene('scene_znq29_28', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_28: {
    id: 'scene_znq29_28',
    title: '第二十八幕 · 寒涧疗伤蓄锋芒',
    subtitle: '终南后山寒玉涧',
    mandatory: true,
    beats: [
      N('大计既定，两脉幸存弟子依托寒玉涧天险紧急布防，并取出珍藏疗伤圣药为你与双尊调理内伤。'),
    ],
    onFinishEffects: [openScene('scene_znq29_29', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_29: {
    id: 'scene_znq29_29',
    title: '第二十九幕 · 东方破晓战鼓催',
    subtitle: '终南后山寒玉涧',
    mandatory: true,
    beats: [
      N('寒夜渐尽，东方天际透出一抹惨淡微光。远方重阳古观废墟之上，段延庆与赫连霸先的大军已然重新集结，终南隐宗的终极决战，即将全面打响！'),
    ],
    onFinishEffects: [openScene('scene_znq29_30', ZHONGNAN_Q29_QUEST_ID)],
  },

  scene_znq29_30: {
    id: 'scene_znq29_30',
    title: '第三十幕 · 一品叩关启终章',
    subtitle: '终南山隐宗 · 终南后山寒玉涧',
    mandatory: true,
    beats: [
      N('你已历经【贺兰黑云 · 一品叩关】生死大劫，于段延庆与赫连霸先两大宗师手下撑招破围，并亲手定下了终南隐宗的终极命运分流！请整顿丹药武学，迎接终南隐宗巅峰终章！'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      { type: 'giveItem', itemId: 'ITM-MED-101', qty: 1 },
      { type: 'giveItem', itemId: 'ITM-MED-116', qty: 2 },
      { type: 'giveSilver', amount: 500, reason: '终南西夏大劫孤剑断后破围重赏' },
      { type: 'giveCombatExp', amount: 2200, reason: '硬撑赫连霸先与段延庆宗师合围破局' },
      { type: 'addSectContribution', amount: 550 },
      { type: 'modifyRenown', delta: 110, reason: '终南孤剑撑招破西夏两大宗师合围' },
      { type: 'modifyChivalry', delta: 60, reason: '舍身断后护送终南双尊与同门突围' },
      { type: 'modifySkill', key: '策论', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 10 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 10 },
      { type: 'setFlag', flag: 'zn_q29_siege_survived', value: true },
      {
        type: 'completeQuest',
        questId: ZHONGNAN_Q29_QUEST_ID,
        outcome: 'siege_survived',
        combatExp: 900,
      },
      toast(
        '【贺兰黑云 · 一品叩关】完结！终南隐宗二级命运分流已正式开启！',
        'success',
        '西夏大劫',
      ),
    ],
  },
}
