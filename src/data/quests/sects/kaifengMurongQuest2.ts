import type { QuestDefinition, StorySceneDef } from '../../../types/quest'

const QUEST_ID = 'QST-SECT-17-MURONG-2'

// ============================================================================
// 五十二幕完整剧本：《参合剑气 · 姑苏对质》（开封府 Lv.3 -> Lv.4 晋升任务）
// 声明顺序自终幕倒序排列，确保所有 openScene 引用皆已初始化
// ============================================================================

const SCENE_52_IMPERIAL_PROMOTION: StorySceneDef = {
  id: 'scene_kf2_52_imperial_promotion',
  title: '第五十二幕 · 丹墀授印御前卫',
  subtitle: '开封府衙 · 升堂正殿',
  illustrationUrl: '/assets/quests/kf_murong2_royal_guard_seal.jpg',
  illustrationCaption: '开封府升堂正殿晨曦 · 呈交立约盟书单膝拜领御前护卫金印',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '包拯亲手接过少侠呈上的两份密卷——一份是太湖七十二峰军械封存清册、虎丘山洞印记拓片与平江府受贿官吏供状，另一份则是慕容复亲笔钤印的“暂止江南私运、静候后日清议”立约文书。堂上三口铜铡在秋日晨光里寒气森然，包拯端详良久，黑面之上终于露出一丝难得的欣慰神色。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '“好一个‘双方收手，约定后续再说’！少侠此行不仅连败公冶乾、邓百川二位一流高手，更在还施水阁正面质问慕容复、与其交手十合不落下风，逼得这位不可一世的‘南慕容’主动封停太湖私运兵甲、交出地方贪墨暗桩名单！若当真在太湖动起刀兵，江南十州百姓不知要遭多少涂炭，如今以武止戈、以理服人，正是我大宋社稷之福！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '（展昭抚剑微笑，拱手相贺，眼中满是敬重）“恭喜少侠！慕容复乃是宗师境界的江南巨擘，放眼天下能与他正面对拆十合而全身退步者寥寥无几。如今姑苏暗流暂歇，汴梁与江南水路重归安稳，少侠功不可没！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '“圣上已有口谕：金牌总捕忠勇足智、文武兼资，特准晋升【御前护卫】，赐带御前行走金印腰牌，日后不仅可代天子巡察天下冤狱，更可随时奉旨入宫护驾！望少侠勿忘今日初心，姑苏慕容氏这盘棋虽暂且收官，然天下风云未靖、辽夏虎视眈眈，来日方长！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（单膝跪地，双手接过沉甸甸的御前护卫金印，神情肃穆而坚定，朗声立誓）“卑职谨遵包大人训诲！无论日后慕容氏是忠是逆、江湖朝堂风波几重，卑职手中三尺青锋剑，必长护我大宋法度威严与天下苍生安宁！”',
    },
  ],
  onFinishEffects: [
    { type: 'giveSilver', amount: 260, reason: '开封府姑苏对质特等赏赐' },
    { type: 'modifyRenown', delta: 80, reason: '还施水阁十合战慕容复扬名天下' },
    { type: 'modifyChivalry', delta: 40, reason: '兵不血刃止江南兵戈' },
    {
      type: 'completeQuest',
      questId: QUEST_ID,
      outcome: 'completed_murong_confrontation',
      combatExp: 600,
    },
    {
      type: 'toast',
      text: '《参合剑气 · 姑苏对质》圆满完成！已解锁晋升【Lv.4 御前护卫】资格，获赏银 +260 两、声望 +80、战斗经验 +600！',
      tone: 'success',
      logTag: '御前晋升',
    },
  ],
}

const SCENE_51_COURT_DEBRIEF: StorySceneDef = {
  id: 'scene_kf2_51_court_debrief',
  title: '第五十一幕 · 紫宸密奏定江南',
  subtitle: '开封府衙 · 升堂正殿',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '回到东京汴梁那日，恰逢一场秋雨洗净了朱雀大街的青石板，空气里透着清冽草木气息。少侠直入开封府升堂正殿，只见包拯、公孙策与“御猫”展昭早已屏退左右在暖阁内等候。炭盆里银丝炭烧得正旺，案上摊开着一份刚从平江府八百里加急送抵的江南水师折子。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '公孙策笑着起身相迎，将折子递与少侠一观：“少侠一路辛苦！平江府与江南东路转运司昨日已呈报：太湖七十二峰与虎丘后山藏匿的私铁甲械三千余具，已由慕容氏管事亲自照单点交地方武库封存；那几名受贿把总与转运司刁吏也已押入府牢听候发落。只是折子里未提燕子坞内究竟发生了何事，大人与展护卫正盼少侠亲口细禀！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（解下斗篷尘霜，将还施水阁内如何与公冶乾、邓百川先后交锋，又如何当面质问慕容复、十合之内互试深浅并最终各自收手立约的经过一五一十娓娓道来）“包大人，慕容复虽怀复燕旧念、性情骄傲，却非丧心病狂之徒；他亦知大宋兵威正盛、江南百姓经不起战火，故而与卑职约定暂罢私运、后续另作了断。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '展昭微微颔首，眼神中透出赞许：“慕容复此人素来眼高于顶，若非少侠在十合交手中展现出的武功与定力令他真正忌惮，他绝不会轻易让步。此约虽非一劳永逸，却替朝廷争取了数年整饬江南海防、清查暗桩的宝贵光阴。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_52_IMPERIAL_PROMOTION }],
}

const SCENE_50_NORTHBOUND_DISPATCH: StorySceneDef = {
  id: 'scene_kf2_50_northbound_dispatch',
  title: '第五十幕 · 飞鸽传书北返汴',
  subtitle: '姑苏城外 · 运河官驿渡口',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '翌日黎明，太湖湖面笼着一层薄薄的金色晨雾，远山如黛，渔舟唱晚变成早起桨声。少侠搭乘开封府早先安排在无锡官道的快船离开太湖，在运河官驿渡口换乘八百里驿马之前，回头望了一眼烟波浩渺的东南方向——那座藏着无数武学典籍与前朝旧梦的燕子坞，已在重重水雾中隐去轮廓。',
    },
    {
      speaker: { kind: 'custom', name: '陆老艄公', title: '开封府江南暗桩船夫', factionName: '六扇门暗桩' },
      text: '“少侠这一趟可真是惊天动地！老汉方才在岸边茶棚听见跑船的伙计们都在传，说太湖水师昨晚奉了平江府紧急公文，连夜去七十二峰接收了几大船精铁甲械，还把两个姓张姓李的贪官把总锁拿了！这莫非真是慕容家自己交出来的？”',
    },
    {
      speaker: { kind: 'player' },
      text: '（拍了拍马鞍旁装着封印卷宗的牛皮驿袋，神色沉静）“不错。慕容复是个聪明人，知道真把朝廷逼急了对他没有半分好处。不过老丈切记，燕子坞的暗桩不可撤去，日后还得劳烦江南弟兄们留心太湖动静——这局棋，咱们与他还只下到中盘，切不可掉以轻心。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '说完，少侠飞身上马，一抖缰绳，骏马长嘶一声踏破江南晨露，沿着京杭大运河官道一路向北，直奔东京开封府而去！',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_51_COURT_DEBRIEF }],
}

const SCENE_49_SEAL_SUZHOU_FILES: StorySceneDef = {
  id: 'scene_kf2_49_seal_suzhou_files',
  title: '第四十九幕 · 封存甲械留后手',
  subtitle: '姑苏城 · 苏州官府衙门',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '离开燕子坞后，少侠并未立刻北返，而是先手持开封府金牌与钦差勘合文书，径直踏入苏州府衙大堂。平江知府见了包拯亲署的金印，又见少侠袖中那份连慕容氏管事都签押画押的兵甲封存清单，顿时吓得冷汗涔涔、双膝发软，哪里还敢有半分敷衍推诿。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '苏州知府',
        title: '平江府知府',
        factionName: '大宋地方官府',
        portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
      },
      text: '（颤巍巍捧着文书，连连拱手赔罪）“下官……下官治下不严，竟被转运司那几个刁吏与水师把总蒙蔽至此！请总捕大人放心，本府即刻调集州兵，配合贵府暗桩将太湖七十二峰与虎丘后山所有封存铁甲运入苏州武库严加看管，一应贪墨官吏即刻锁拿审讯，绝不走漏半点风声！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（冷冷盯了知府一眼，将封印火漆盖在清单骑缝处）“知府大人记住，这批甲械的数目与成色，开封府都有底账。若有半副流入江湖或私卖北境，下次来的就不是六扇门总捕，而是三司会审的钦差御史了！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '处置妥当苏州府一应后续公文，确认太湖暗桩已将各处山口封锁点交完毕，少侠这才换上轻装，准备启程北返开封。',
    },
  ],
  onFinishEffects: [
    { type: 'healPlayer', hpPct: 100, mpPct: 100 },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'return_kaifeng_final',
      silent: false,
    },
    {
      type: 'toast',
      text: '姑苏军械封存已毕！请北返【开封府 · 开封府衙 · 开封府升堂正殿】向包拯、展昭复命。',
      tone: 'success',
      logTag: '北返复命',
    },
  ],
}

const SCENE_48_LEAVE_YANZIWU: StorySceneDef = {
  id: 'scene_kf2_48_leave_yanziwu',
  title: '第四十八幕 · 轻舟辞别还施阁',
  subtitle: '燕子坞 · 还施水阁外码头',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '夜色已深，还施水阁外的荷塘上浮起一层清冷白雾，星斗倒映在静谧湖面之上。公冶乾与邓百川站在码头石阶上默默目送，谁也没有再多说半句挑衅之言。经此一夜十合之战，慕容氏上下对眼前这位开封府金牌总捕已再无半分轻视之心。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0256' },
      text: '阿朱提着一盏白纱宫灯立在廊下，待少侠走近时轻声道：“总捕大人此番言辞犀利却留了余地，我家公子爷虽嘴上不说，心里其实也明白江南不可生乱。这包姑苏碧螺春是阿碧刚焙好的，权当给大人路上解乏。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（接过纸包微微颔首，目光望向水阁二楼那道尚未熄灭的孤影）“替我转告慕容公子：今日之约，六扇门记在账上；他日若再见，愿他是江湖上堂堂正正的‘南慕容’，而非兵甲泥淖中的复国囚徒。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '言罢，少侠纵身跃上小舟，船桨轻划破开如镜湖面，很快消隐在茫茫芦苇烟波之中。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_49_SEAL_SUZHOU_FILES }],
}

const SCENE_47_PACT_FOR_LATER: StorySceneDef = {
  id: 'scene_kf2_47_pact_for_later',
  title: '第四十七幕 · 双方收手约后期',
  subtitle: '燕子坞 · 还施水阁正厅',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0120' },
      text: '（慕容复长袖一拂，背过身去望向窗外漆黑湖面，良久方才冷冷开口）“罢了。今日既约好只走十合，慕容复说话算话，绝不倚多为胜。你既能接住我十招而神色不乱，倒也有资格让我把话说在前头。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（还剑入鞘，拱手而立，气息虽微促却目光如炬）“公子请讲。开封府要的不是慕容家满门流血，而是太湖之上永绝私兵、江南百姓安居乐业。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0120' },
      text: '“太湖七十二峰与虎丘后山封存的那三千具甲械，明早我便命人照单点交苏州府武库封存；转运司那几个贪墨把总的名单，公冶乾也会一并交给你带回开封。至于大辽与西夏的旧日书信……我慕容氏自有进退分寸，绝不会借外虏之兵践踏江南！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0120' },
      text: '（慕容复缓缓转过身，眼中精光内敛，声音低沉而坚定）“今日你我各自收手，暂且罢战。然而天道人心、家国兴替之争，岂是一纸文书能定？他日江湖再会、或天下大势有变之时，你我再将今日未分的高下、未决的是非，一并后续再说！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（朗声一笑，抱拳行礼）“好一个‘约定后续再说’！只望他日重逢时，公子仍记得今晚太湖岸边的万家灯火。告辞！”',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'kf2_murong_truce', value: true },
    { type: 'giveCombatExp', amount: 220, reason: '与慕容复交手十合双方收手立约' },
    { type: 'openScene', scene: SCENE_48_LEAVE_YANZIWU },
  ],
}

const SCENE_46_MUTUAL_WITHDRAWAL: StorySceneDef = {
  id: 'scene_kf2_46_mutual_withdrawal',
  title: '第四十六幕 · 剑掌齐敛震水阁',
  subtitle: '燕子坞 · 还施水阁正厅',
  illustrationUrl: '/assets/quests/kf_murong2_huanshi_ten_bouts.jpg',
  illustrationCaption: '燕子坞还施水阁正厅 · 参合指气与青锋剑十合对撞震断紫檀供桌',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '第十合转瞬即至！慕容复白衣翻卷如雪，右指凌空点出一道凌厉绝伦的“参合剑气”，指风破空发出尖锐啸鸣，劲风直逼少侠眉心三寸，竟连空气都仿佛被这一指劈开！与此同时，少侠亦将六扇门平生绝学与浑厚内息催至巅峰，脚踏八卦方位不退反进，一式守中带攻的沉稳拳剑硬生生架住那道无形指风，剑脊之上溅起一串耀眼火星！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '“嗤啦”一声气劲炸裂！两股沛然莫御的真气在正厅中央轰然相撞，气浪翻涌间，那方数百年紫檀供桌竟被二人交击的余波生生震成两截，书架上几卷泛黄秘籍迎风散落如雪片纷飞！然而激荡的真气刚至顶峰，慕容复却骤然指尖一收，将剩余三分杀意化于无形；少侠亦顺势卸去剑势，脚尖点地向后飘退三步，稳稳立在厅门青砖之上，衣衫猎猎作响却未乱半分步法。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0120' },
      text: '（垂手立在烛火阴影之中，袖口微微被剑气划开一道细口，神色却异常平静，眼底闪过一丝由衷的赞赏）“十合已满。想不到开封府包龙图麾下，竟真有你这等年纪轻轻便能硬接我十招参合指、甚至破开我两式‘斗转星移’的人物。若是再斗下去，百招之内你我亦难分高下。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（收剑入鞘，轻轻吐出一口浊气，虽虎口微麻却脊背挺直如松）“慕容公子的‘斗转星移’与‘参合指’果然名不虚传，天下间能接住公子十指之人确也不多。十合之内，你我谁也没有留手，如今胜负暂搁，各自收手罢！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_47_PACT_FOR_LATER }],
}

const SCENE_45_MURONG_SURVIVE_10: StorySceneDef = {
  id: 'scene_kf2_45_murong_survive_10',
  title: '第四十五幕 · 参合指影战十合',
  subtitle: '燕子坞 · 还施水阁正厅',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0120' },
      text: '“话不投机半句多！你既一口咬定我慕容氏谋逆，又敢单人独剑踏入我还施水阁——好！今日我便不占你半点便宜，也不用庄中人手围攻，你我单对单交手十个回合！若你十合之内接得住我的武功、站得稳脚跟，咱们再坐下来谈如何收场；若接不住，休怪慕容某将你扣在燕子坞，再慢慢跟包拯算账！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（长剑出鞘三寸，寒光映照着双眸，全神贯注提聚全身功力，谨记展昭先时“不可用老”的嘱咐）“正合我意！能与‘南慕容’正面领教十合高招，即便胜负未分，也足以叫公子看清我大宋六扇门的骨气！请出招吧！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '话音未落，慕容复白衣飘动如仙，十指微弹间，数道无形却锐利无匹的参合指气已分袭上下三路破空袭来！宗师下品的雄浑威压瞬间笼罩整座还施水阁，十回合的巅峰对决一触即发！',
    },
  ],
  choices: [
    {
      id: 'kf2_murong_survive_10',
      label: '迎战慕容复，全力撑过 10 个回合',
      subLabel: '宗师十合生死对决（撑满 10 回合即双方收手立约，⚠️ 未撑满败北将直接丧命！）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0120',
            talkOverride:
              '“开封府的金牌总捕，倒真是好胆魄。既然把话挑明了，便先接我慕容氏十招‘参合指’与‘斗转星移’，看看你够不够格替赵宋朝廷跟我谈条件！”',
          },
          rule: 'survive_rounds',
          lethalOnLose: true,
          maxRounds: 10,
          questId: QUEST_ID,
          forbidEscapeReason: '已与慕容复立下十合之约，须堂堂正正撑满十回合方能论定进退！',
          deathTitle: '十合未竟 · 命殒还施水阁',
          deathDetail:
            '还施水阁之内参合指气纵横如电，斗转星移诡奇莫测！少侠未能撑满十合之约，被慕容复指劲洞穿护体真气，血染太湖烟波，壮志未酬身先死。',
          onWin: [{ type: 'openScene', scene: SCENE_46_MUTUAL_WITHDRAWAL }],
        },
      ],
    },
  ],
}

const SCENE_44_MURONG_COUNTER_ARGUMENT: StorySceneDef = {
  id: 'scene_kf2_44_murong_counter',
  title: '第四十四幕 · 家国天下辩是非',
  subtitle: '燕子坞 · 还施水阁正厅',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0120' },
      text: '（慕容复被质问得面色微沉，冷笑一声负手走下玉阶，目光扫过案上金牌）“笑话！我慕容氏世代居于江南太湖，向来不沾赵宋半寸官禄，何来‘叛国’二字？当年宋太祖陈桥兵变夺了后周柴家江山，这天下本就是强者居之！我先祖大燕皇帝当年也是横扫中原的雄主，慕容氏图谋恢复祖业，岂是你一个小小心腹捕快能以‘大义’二字抹杀的？”',
    },
    {
      speaker: { kind: 'player' },
      text: '（毫不退缩，向前踏出一步，声音清越震动水阁梁柱）“好一个‘强者居之’！前燕亡国已近七百年，如今江南万民安居乐业、太湖商旅往来不绝，百姓要的是太平饭碗与安稳日子，不是你慕容家一姓之兴衰！你口口声声‘光复祖业’，却暗中向大辽、西夏乞援通款——试问当年契丹铁骑南下屠戮燕云百姓时，可曾念过半分前燕香火？你借外虏之力动摇江南根本，岂非拿千万无辜黎民作你一人的垫脚石？！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '这一句如同利剑直刺痛处！慕容复瞳孔骤然一缩，周身月白衣袍无风鼓荡，厅内十余盏烛火竟被他骤然爆发的内息震得齐齐一暗，险些熄灭！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0120' },
      text: '（声音冷若冰霜，一字一顿，却又藏着几分被戳中要害后的森然杀机）“好利的一张嘴！只可惜江湖与庙堂之上，从来不是靠嘴皮子定输赢的。你既能连过我四位家臣来到我面前，便让我亲自称一称你手底下的斤两，看看你有没有资格跟我讲这番大道理！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_45_MURONG_SURVIVE_10 }],
}

const SCENE_43_QUESTIONING_MURONG: StorySceneDef = {
  id: 'scene_kf2_43_questioning_murong',
  title: '第四十三幕 · 正面质问慕容复',
  subtitle: '燕子坞 · 还施水阁正厅',
  beats: [
    {
      speaker: { kind: 'player' },
      text: '（少侠稳步上前，从怀中取出开封府鎏金铁牌与那卷抄录的“大燕兴复”密账副本、虎丘铁甲印记拓片，一并重重拍在紫檀长案上）“慕容公子，今日在下既非夜行窃贼，亦非寻常江湖客，而是大宋开封府金牌总捕！以下三问，请公子当面作答！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“第一问：太湖七十二峰与虎丘后山暗洞内藏有精铁刀枪三千余副、铁甲八百领，账册上白纸黑字写着参合庄经手、印着飞燕暗记，公子作何解释？第二问：贵庄密使频频北上大辽南京道、西赴兴庆府，私盐换马三百匹、互通边防虚实，难道‘南慕容’三字便是勾结外虏、卖国求荣的遮羞布不成？”',
    },
    {
      speaker: { kind: 'player' },
      text: '“第三问：江南转运司与平江水师数名小吏受贿徇私，致使朝廷军械管制形同虚设，八年前查案推官更惨死驿馆——公子既自诩诗书名门，难道也要学那乱臣贼子，将江南亿万生民拖入兵燹血海之中么？！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '一连三问，字字铿锵如金石坠地，回荡在空旷的还施水阁正厅之中！门外的邓百川与公冶乾听得面色剧变，正欲冲入护主，却被慕容复抬起左手轻轻止住，谁也不敢擅入半步。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_44_MURONG_COUNTER_ARGUMENT }],
}

const SCENE_42_MEET_MURONG_FU: StorySceneDef = {
  id: 'scene_kf2_42_meet_murong_fu',
  title: '第四十二幕 · 白衣翩翩南慕容',
  subtitle: '燕子坞 · 还施水阁正厅',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '正厅深处珠帘轻响，一名身着月白锦袍、腰悬玉佩的青年缓缓转过身来。此人约莫二十六七岁年纪，面如冠玉、剑眉入鬓，双目清澈却又深不可测，举手投足间自有一股雍容华贵的皇室气度，正是与丐帮帮主乔峰并称“北乔峰、南慕容”的姑苏慕容氏少庄主——慕容复！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0120' },
      text: '（目光淡然地扫过少侠手中的开封府金牌，又看了看门外垂首待命、神色愧疚的邓百川与公冶乾，嘴角微扬露出一抹捉摸不透的笑意）“包拯果然派了个不凡的人物来江南。能先后胜过我包三哥、风四弟，今日又连破公冶二哥与邓大哥，放眼当世青年一辈，阁下确有几分胆识与真才实学。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（拱手抱拳，神色不卑不亢，目光直视这位名震天下的江南少主）“慕容公子过誉。在下奉包大人与朝廷密旨而来，不为寻私仇、亦不为讨教武林虚名，只为向公子当面查问一桩关乎大宋江山与江南万民安危的大案！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '慕容复闻言神色不动，只淡淡抬手示意让座，语气波澜不惊：“既如此，且进来说话。我倒要听听，开封府究竟掌握了多少东西，又凭什么敢单枪匹马闯进我还施水阁。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_43_QUESTIONING_MURONG }],
}

const SCENE_41_HUANSHI_MARTIAL_HALL: StorySceneDef = {
  id: 'scene_kf2_41_huanshi_martial_hall',
  title: '第四十一幕 · 百家秘笈列檀架',
  subtitle: '燕子坞 · 还施水阁一层廊厅',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '踏入还施水阁正门，一股混合着陈年墨香与沉水檀香的清雅气息扑面而来。整座水阁共有三层，四壁皆是顶天立地的楠木书架，上面分门别类整齐码放着天下各门各派的武学秘笈——少林七十二绝技的抄本、丐帮、逍遥、大理段氏、乃至中原名山剑派的剑谱残卷竟皆有收录，唯独少见少林《易筋经》与大理《六脉神剑》正本，令人叹为观止。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '然而在正厅最内侧的红木供案之上，却并未摆放佛道圣像或先贤书画，而是庄严供奉着几方刻有鲜卑古文字的“大燕皇帝”牌位，案前铜炉青烟袅袅，与满架武林秘笈映衬出一种近乎偏执的肃穆。',
    },
    {
      speaker: { kind: 'player' },
      text: '（目光在那些武林秘笈与大燕牌位间缓缓扫过，心中彻底明了）“‘以彼之道，还施彼身’……慕容世家百年来广罗天下武学、招揽四方豪杰，归根结底竟全是为了这一座冷清牌位下的复国执念！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '正在此时，二楼楠木楼梯传来一声轻缓沉稳的脚步声，一道月白色修长身影正自阶上缓缓踱步而下。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_42_MEET_MURONG_FU }],
}

const SCENE_40_ENTER_HUANSHI: StorySceneDef = {
  id: 'scene_kf2_40_enter_huanshi',
  title: '第四十幕 · 孤身步入还施阁',
  subtitle: '燕子坞 · 还施水阁前石桥',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '越过参合庄后院的九曲白石长桥，眼前水面骤然开阔。一座三层重檐的八角楼阁孤零零矗立在千顷荷塘中央，四面环水、唯有前方一道单人宽的青石拱桥相连，檐下悬挂着一块黑底金字的古朴匾额——“还施水阁”，在夕阳余晖中泛着沉郁金光。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '此时水阁大门虚掩，门前并无一名佩刀护卫，唯有阿朱、阿碧两位丫鬟模样的少女安静站在廊柱旁，神色略显紧张地看着少侠走来。四周静得连风吹枯荷的声音都清晰可闻，可少侠却分明感到阁内二楼有一道深沉如渊的目光正悄然锁定着石桥。',
    },
    {
      speaker: { kind: 'player' },
      text: '（整了整衣冠与腰间金牌，迈步踏上青石拱桥，步履沉稳有力）“前方便是慕容复所在。是战是谈，今日总要当面有个分晓！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '走过石桥，少侠伸手推开那两扇沉重的雕花木门，昂首步入还施水阁之中。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_41_HUANSHI_MARTIAL_HALL }],
}

const SCENE_39_DENG_CONCEDES_WAY: StorySceneDef = {
  id: 'scene_kf2_39_deng_concedes_way',
  title: '第三十九幕 · 宿老叹服让水阁',
  subtitle: '燕子坞 · 参合庄演武西场',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0145' },
      text: '（站在演武场边缘缓缓收回双掌，苍老的面庞上既有震惊又有几分复杂神色）“好……好一个‘后生可畏’！数月前你在秘档室尚只能勉强撑过十合，今日再战，你居然堂堂正正接下我全部掌力并反制胜出！开封府有你这等青年俊杰，难怪公子爷近日频频叹息朝廷不可轻侮，大宋果真卧虎藏龙。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（收势抱拳，诚恳行礼）“邓前辈掌力雄浑冠绝江南，晚辈实乃侥幸取胜。前辈既已言明只是护主守门，如今晚辈胜过前辈，可否请前辈放行，让我去还施水阁见慕容公子一面？”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0145' },
      text: '（长叹一声，侧身让开通往后院水阁的月亮拱门）“胜者为王，败者无话。我邓百川言出必践——只是公子爷武功已臻宗师境地，一手‘斗转星移’与‘参合指’出神入化，远非我等家臣可比。你若真要当面质问他，好自为之罢！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'huanshi_murong',
      silent: false,
    },
    {
      type: 'toast',
      text: '已击败邓百川打通内院！请前往【燕子坞 · 还施水阁 · 还施水阁藏书正楼】当面质问慕容复！',
      tone: 'success',
      logTag: '直入水阁',
    },
  ],
}

const SCENE_38_DENG_DEFEATED: StorySceneDef = {
  id: 'scene_kf2_38_deng_defeated',
  title: '第三十八幕 · 破尽刚掌定演武',
  subtitle: '燕子坞 · 参合庄演武西场',
  illustrationUrl: '/assets/quests/kf_murong2_canhe_yard_deng.jpg',
  illustrationCaption: '燕子坞参合庄演武西场 · 正面硬撼神掌邓百川震裂青砖打通内院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '演武场青砖之上劲风呼啸，碎石飞溅！邓百川“神掌震江南”刚猛沉雄，一掌快似一掌，掌风过处连兵器架上的长枪都嗡嗡作响，直如怒涛拍岸。然而今非昔比——少侠早已将数月前秘档室中领教过的掌路铭记于心，此刻以灵动身法避实击虚，待邓百川一记“排山倒海”劲力推至老境之际，猛然欺身贴近中宫！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '“砰”的一声闷响！双掌交击之下，少侠内力如长河奔涌，竟将邓百川逼得蹬蹬蹬连退五步，一直退到演武场石狮旁才卸去余劲，青衫袖口被震裂半尺，胸口微微起伏，足下青砖裂出几道蛛网细纹！',
    },
    {
      speaker: { kind: 'player' },
      text: '（收剑而立，稳稳吐纳调息，气息悠长）“邓前辈，承让了！这一场，算是补齐了数月前秘档室未分完的胜负！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '周围数十名参合庄弟子鸦雀无声，面面相觑，谁也没想到四大家臣之首竟在自家演武场上被一名年轻的朝廷捕快正面击败！',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'kf2_deng_defeated', value: true },
    { type: 'giveCombatExp', amount: 180, reason: '参合演武场堂堂正正击败邓百川' },
    { type: 'openScene', scene: SCENE_39_DENG_CONCEDES_WAY },
  ],
}

const SCENE_37_DENG_BATTLE: StorySceneDef = {
  id: 'scene_kf2_37_deng_battle',
  title: '第三十七幕 · 重逢再战邓百川',
  subtitle: '燕子坞 · 参合庄演武西场',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0145' },
      text: '“少侠好胆量！上次在秘档室被你借烟雾跃水走脱，老夫心中一直引以为憾，连夜复盘十合仍觉意难平。今日你既亮出朝廷金牌堂堂正正登门，老夫便也在参合庄演武场上，用真功夫与你分个明白！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（拔剑出鞘，剑尖斜指青砖，眼神沉着坚定）“前辈既要再较量一场，晚辈岂敢推辞？今日若赢不了前辈，我便没资格去见慕容公子！请赐教！”',
    },
  ],
  choices: [
    {
      id: 'kf2_fight_dengbaichuan',
      label: '全力迎战「神掌震江南」邓百川',
      subLabel: '正面死战（堂堂正正击败邓百川打通内院，⚠️ 战败将直接丧命！）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0145',
            talkOverride:
              '“上次在秘档室让你跃水脱身，今日你竟敢持朝廷金牌重临参合庄！且看这次你能否堂堂正正胜过邓某！”',
          },
          rule: 'duel',
          questId: QUEST_ID,
          forbidEscapeReason: '邓百川已封住参合庄演武场退路，须正面击败他方能进见慕容复！',
          deathTitle: '掌震参合 · 血染演武坪',
          deathDetail:
            '邓百川“神掌震江南”刚猛无俦，少侠于参合庄演武场力战不敌，护体真气尽碎，命丧太湖参合庄中！',
          onWin: [{ type: 'openScene', scene: SCENE_38_DENG_DEFEATED }],
        },
      ],
    },
  ],
}

const SCENE_36_DENG_CONFRONTATION: StorySceneDef = {
  id: 'scene_kf2_36_deng_confrontation',
  title: '第三十六幕 · 金牌压阵斥邪谋',
  subtitle: '燕子坞 · 参合庄演武西场',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0145' },
      text: '（双目如电，沉声质问）“公冶二弟竟也没拦住你？阁下持着开封府金牌闯入我燕子坞重地，难道真以为大宋官府的铁骑，能踏平我太湖百里水寨、折服我慕容氏百年威名不成？”',
    },
    {
      speaker: { kind: 'player' },
      text: '（冷笑一声，将太湖七十二峰与虎丘山洞兵甲暗账的抄录拓片亮在身前）“邓前辈不必虚张声势！朝廷水师两万精锐已在镇江府、平江府外待命，若非包大人念及江南百姓免受战火涂炭，今日登岛的便不是在下一人，而是三军甲士！我今日只要见慕容复一面，问清是非！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0145' },
      text: '“好个利口！不过想见公子爷，光凭一块金牌与几张纸片可不够——须得先问过老夫这双掌答不答应！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_37_DENG_BATTLE }],
}

const SCENE_35_CANHE_YARD_STANDOFF: StorySceneDef = {
  id: 'scene_kf2_35_canhe_yard_standoff',
  title: '第三十五幕 · 演武西场再遇敌',
  subtitle: '燕子坞 · 参合庄演武西场',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '少侠并未趁夜偷袭，而是手持公冶乾留下的通关令箭，沿着参合庄正中青石大道堂堂正正行至演武西场。场边兵器架上刀枪林立，寒光闪闪，数十名慕容氏劲装子弟列成两排，人人神色凝重、按剑相向，却在无令之下无人敢率先动手。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '演武场中央的石台上，早已负手立着一名青衫清癯长者。秋风吹拂着他斑白的两鬓与衣摆，正是数月前在秘档室与少侠激战十合的慕容四大家臣之首——“神掌震江南”邓百川！',
    },
    {
      speaker: { kind: 'player' },
      text: '（停步石阶前，目光平静地迎上邓百川锐利的视线，抱拳一礼）“邓前辈，别来无恙。上次仓促跃湖一别，今日晚辈特来正式登门拜访，还请前辈多多指教！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_36_DENG_CONFRONTATION }],
}

const SCENE_34_YANZIWU_OPEN_RETURN: StorySceneDef = {
  id: 'scene_kf2_34_yanziwu_open_return',
  title: '第三十四幕 · 正大光明重临坞',
  subtitle: '燕子坞 · 参合庄正门水埠',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '与上回趁夜潜行、步步惊心截然不同，此番少侠乘坐悬有开封府青天暗徽的快船，持着公冶乾签发的内坞青铜令箭，于暮色四合、湖水泛金之际光明正大地驶入燕子坞参合庄正门水埠。水寨哨塔上的号角低沉响了两声，哨兵验过令箭后竟躬身退开，并未放箭拦截。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '踏上熟悉的青石水阶，两侧垂柳与山茶花木依旧幽深雅致，唯独往来巡逻的带刀家丁人数比数月前多出一倍有余，显然太湖私运案曝光后，整个燕子坞早已进入外松内紧、如临大敌的戒备状态。',
    },
    {
      speaker: { kind: 'player' },
      text: '（抬眼望向参合庄高悬的黑底金字匾额，心中雪亮）“公冶乾既已放行，邓百川必定就在参合庄演武场等着我——这一关，既是替慕容复试探朝廷来使的成色，也是了结上次秘档室未分胜负的旧账，绝不可退让半分！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_35_CANHE_YARD_STANDOFF }],
}

const SCENE_33_RETURN_TO_YANZIWU: StorySceneDef = {
  id: 'scene_kf2_33_return_to_yanziwu',
  title: '第三十三幕 · 整装再入燕子坞',
  subtitle: '姑苏太湖 · 烟波水路',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '击败公冶乾并拿到通往参合庄内坞的青铜令箭后，少侠在岸边芦苇茶寮略作调息，运功三个周天，将内外伤势与损耗的内力悉数补回巅峰。湖面上暮云低垂，水天相接处泛起一抹深沉的铁青色，秋风卷起阵阵芦花，仿佛酝酿着一场一触即发的太湖风暴。',
    },
    {
      speaker: { kind: 'player' },
      text: '（仔细检查随身所带的开封府鎏金铁牌、天子密旨勘合文书，以及虎丘、苏州转运司暗账副本）“包不同、风波恶、公冶乾皆已折服，接下来便是四大家臣之首邓百川，以及那位深藏不露、威震江南的慕容公子！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠吩咐暗桩船夫备好吃水轻便的快舟，趁着夕阳余晖未尽，再次破浪驶向太湖深处的燕子坞参合庄。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_34_YANZIWU_OPEN_RETURN }],
}

const SCENE_32_GONGYE_YIELD: StorySceneDef = {
  id: 'scene_kf2_32_gongye_yield',
  title: '第三十二幕 · 江南二绝授令箭',
  subtitle: '姑苏城 · 太湖烟波渡口',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0161' },
      text: '（轻轻甩了甩震得发麻的右掌，脸上虽有败绩却丝毫不失儒雅风度，拱手一礼）“阁下掌力兼备刚柔，内息绵长更胜往昔，公冶某心服口服！想来半年之前在太湖渡口挫败包三弟、又在曼陀花径制住风四弟的，便是阁下无疑了？”',
    },
    {
      speaker: { kind: 'player' },
      text: '（收起兵刃还礼）“正是。公冶先生掌法精纯，晚辈亦是倾尽全力方才侥幸胜得半招。如今还请先生履行诺言，让出通往燕子坞的水路！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0161' },
      text: '“拿去罢。”公冶乾从怀中取出一枚刻有双燕衔环图案的青铜令箭抛了过来，“有此令箭，参合庄外围水哨不会再难为你。只是邓大哥已在演武西场候着，公子爷也在还施水阁——你这一去，吉凶难料，好自为之！”',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'kf2_gongye_defeated', value: true },
    { type: 'giveCombatExp', amount: 160, reason: '太湖画舫击败公冶乾' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'yanziwu_deng',
      silent: false,
    },
    {
      type: 'toast',
      text: '已击败公冶乾并取得内坞令箭！请前往【燕子坞 · 参合庄 · 参合庄演武西场】再战邓百川。',
      tone: 'success',
      logTag: '渡口破关',
    },
  ],
}

const SCENE_31_GONGYE_DEFEATED: StorySceneDef = {
  id: 'scene_kf2_31_gongye_defeated',
  title: '第三十一幕 · 画舫拆招破刚柔',
  subtitle: '姑苏城 · 太湖烟波渡口',
  illustrationUrl: '/assets/quests/kf_murong2_taihu_boat_gongye.jpg',
  illustrationCaption: '太湖烟波渡口雕花画舫 · 碧波荡漾三十合拆招震退江南二绝公冶乾',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '小小画舫舱面不过两丈见方，水浪摇晃之中更考较下盘根基与临敌应变！公冶乾掌法素称“江南第二”，时而大开大合如江潮奔涌、连绵不绝，时而轻灵点穴如燕剪春波、防不胜防，逼得少侠连换七套步法方才在随波起伏的甲板上稳住船身。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '激战至三十余合，画舫四周湖水被两人掌风激得水花四溅！公冶乾左掌虚晃、右掌暗藏七成劲力直拍少侠胸口膻中大穴！少侠早已料定他这一手刚柔并济的杀招，足尖猛踏船板借水波反震之力身形微侧，左臂沉肩卸开掌锋，右手顺势一记重肘反震其肘弯，逼得公冶乾重心失衡、连退三步撞在船舱朱漆立柱上！',
    },
    {
      speaker: { kind: 'player' },
      text: '（稳住身形，剑指微垂，气息匀净如初）“公冶前辈，承让了！这艘画舫，莫非还要再斗下去么？”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_32_GONGYE_YIELD }],
}

const SCENE_30_GONGYE_BATTLE: StorySceneDef = {
  id: 'scene_kf2_30_gongye_battle',
  title: '第三十幕 · 碧波舟上战公冶',
  subtitle: '姑苏城 · 太湖烟波渡口',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0161' },
      text: '“阁下既是开封府金牌总捕，想必武功也绝非庸手。我慕容氏向来敬重真英雄——只要你能在太湖这艘画舫之上胜过公冶某，莫说放你入燕子坞，我连通行令箭也一并双手奉上！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“既如此，晚辈便领教‘江南二绝’公冶前辈的高招！”',
    },
  ],
  choices: [
    {
      id: 'kf2_fight_gongyeqian',
      label: '迎战「江南二绝」公冶乾',
      subLabel: '渡口死战（击败公冶乾夺取参合庄内坞令箭，⚠️ 战败将直接丧命！）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0161',
            talkOverride:
              '“开封府金牌总捕既已亮出腰牌，公冶某也不好装聋作哑——只是想登船入燕子坞，须得先过我这双掌！”',
          },
          rule: 'duel',
          questId: QUEST_ID,
          forbidEscapeReason: '公冶乾已横立画舫船头封死水路，唯有击败他方能入坞！',
          deathTitle: '掌折画舫 · 魂断太湖',
          deathDetail:
            '太湖烟波渡口画舫之上，公冶乾“江南二绝”掌力刚柔并济、摧心裂脉！少侠失手重创坠入万顷碧波，命丧江南水路。',
          onWin: [{ type: 'openScene', scene: SCENE_31_GONGYE_DEFEATED }],
        },
      ],
    },
  ],
}

const SCENE_29_GONGYE_PARLEY: StorySceneDef = {
  id: 'scene_kf2_29_gongye_parley',
  title: '第二十九幕 · 船头对谈试虚实',
  subtitle: '姑苏城 · 太湖烟波渡口',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0161' },
      text: '（缓步走到画舫船头，举止斯文有礼，丝毫不见包不同与风波恶的乖张）“老朽公冶乾，不知开封府金牌总捕大驾光临，有失远迎。只是燕子坞乃私家园林，并无朝廷公干往来，总捕大人带剑而来，不知所为何事？”',
    },
    {
      speaker: { kind: 'player' },
      text: '（单刀直入，将金牌高举一亮）“公冶先生既在江南素有儒雅之名，在下便也不绕弯子。太湖七十二峰暗藏兵甲三千、平江转运司暗账牵连辽夏，此事开封府已掌握实证。今日在下奉包大人之命，特来燕子坞见慕容复当面对质！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0161' },
      text: '公冶乾听罢，眉宇间闪过一丝不易察觉的凝重，旋即摇头轻叹：“朝廷既已有备而来，老朽自知多言无益。然则公子爷岂是任人随意盘问之辈？总捕大人想登燕子坞，须得先过老朽这一关！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_30_GONGYE_BATTLE }],
}

const SCENE_28_TAIHU_BLOCKADE: StorySceneDef = {
  id: 'scene_kf2_28_taihu_blockade',
  title: '第二十八幕 · 烟波画舫拦水路',
  subtitle: '姑苏城 · 太湖烟波渡口',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '次日正午，少侠身着六扇门金牌总捕暗红公服，腰悬青天铁牌与长剑，昂首来到太湖烟波渡口。与上次不同，今日渡口周围十余条渔船早已清场，唯有湖心泊着一艘两丈长的雕花朱漆画舫，船头安静立着一名身着月白长衫、面容儒雅的中年男子。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '此人双手负后，双目神光内敛，浑身上下透着一股沉稳渊博的大家气象——正是姑苏慕容四大家臣中排名第二、号称掌法仅次于慕容复的“江南二绝”公冶乾！',
    },
    {
      speaker: { kind: 'player' },
      text: '（纵身跃上岸边泊着的接驳小舟，朗声向画舫抱拳）“前面莫非是姑苏慕容氏公冶乾公冶先生？开封府金牌总捕奉命拜山，请先生借道一叙！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_29_GONGYE_PARLEY }],
}

const SCENE_27_GONGYE_INTEL: StorySceneDef = {
  id: 'scene_kf2_27_gongye_intel',
  title: '第二十七幕 · 渡口设伏知二绝',
  subtitle: '姑苏城 · 苏州客栈后院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '夜色深沉，少侠带着从虎丘与寒山寺两处查获的铁证——包括两枚私铸铁甲模子、一卷盐铁对账清单以及暗桩供词——秘密返回苏州客栈后院。开封府驻江南总探头沈六早已在房中等候多时。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '沈六',
        title: '开封府江南总探头',
        factionName: '六扇门暗桩',
        portraitUrl: '/assets/characters/templates/tpl_liushenmen_male_fb.jpg',
      },
      text: '（翻看完案上铁证，脸色既喜且忧）“太好了！有了这几件物证，慕容家就算长十张嘴也赖不掉！只是……方才太湖岸边传来最新消息：燕子坞知晓包不同与风波恶先后失手，如今已将所有渡口水路收归‘江南二绝’公冶乾亲自坐镇！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（眼神一凝，手指轻轻摩挲着剑柄）“公冶乾？慕容四大家臣中，此人掌力刚柔并济，号称一流中品好手，素来极少离开太湖。他既然亲自出来拦路，说明慕容复已料到朝廷会再派重臣南下——正好，明日我便堂堂正正去太湖烟波渡口会会他！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'suzhou_taihu_gongye',
      silent: false,
    },
    {
      type: 'toast',
      text: '虎丘兵甲与寒山盐账双证俱齐！请前往【姑苏城 · 太湖烟波渡口 · 通燕子坞锦帆画舫渡船】会战公冶乾！',
      tone: 'success',
      logTag: '渡口亮牌',
    },
  ],
}

const SCENE_26_HANSHAN_LEDGER: StorySceneDef = {
  id: 'scene_kf2_26_hanshan_ledger',
  title: '第二十六幕 · 寒山诗轩截盐账',
  subtitle: '姑苏城 · 枫桥寒山寺江枫诗轩',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '离开虎丘后，少侠马不停蹄赶往城西枫桥寒山寺。照着陆老艄公所指的暗记，少侠在江枫诗轩后院一株百年老桂树下，撞见两名正欲将几大捆账簿投入火盆焚毁的转运司小吏！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠飞身掠入墙头，两道石子精准点中二人腕脉，一脚踢翻火盆！抢出的半焦账簿之上，赫然记录着近五年来平江府私盐课银如何以“太湖修堤款”名义转入参合庄名下米行，再折算成精铁、战马与火油运往北地。',
    },
    {
      speaker: { kind: 'player' },
      text: '（将那两名面无人色的小吏反剪捆住，交给随后赶到的六扇门暗桩押入密室）“人赃并获！平江府官商勾结、替燕子坞洗钱购械的链条已经彻底查清，如今便是持证登岛的时刻！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_27_GONGYE_INTEL }],
}

const SCENE_25_HUQIU_ARMS_CACHE: StorySceneDef = {
  id: 'scene_kf2_25_huqiu_arms_cache',
  title: '第二十五幕 · 试剑石畔破军藏',
  subtitle: '姑苏城 · 虎丘剑池与试剑石',
  illustrationUrl: '/assets/quests/kf_murong2_huqiu_armor_cave.jpg',
  illustrationCaption: '姑苏虎丘试剑石后山石窟 · 火折微光查获飞燕暗印数百冷锻铁甲',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '循着风波恶名录上的暗记，少侠于三更时分独自登上姑苏名胜虎丘山。白日里游人如织的剑池与试剑石，入夜后只余松涛阵阵、冷月高悬。少侠绕过剑池石壁，在试剑石西侧一处被藤蔓遮掩的天然裂隙后，果然摸到一道人工凿砌的石门机关！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '拨开暗扣推门而入，眼前竟是一座深达十余丈的天然山腹石窟！火折子微光所及之处，石架之上整整齐齐涂满防锈桐油，堆放着数百副上好冷锻铁甲、千余支破甲长矛与数十箱精钢箭簇，箱角皆烙着一枚小小的飞燕暗印！',
    },
    {
      speaker: { kind: 'player' },
      text: '（取出随身火漆与印泥，将几件铁甲上的飞燕印记拓下，又命随行暗桩记下山洞经纬度与入口机关）“这哪里是寻常江湖门派护院之用？分明是足以装备一支精锐边军的私藏武库！慕容复纵有百般辩解，在这些冷铁面前也休想抵赖！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'suzhou_hanshan',
      silent: false,
    },
    {
      type: 'toast',
      text: '已查实虎丘试剑石飞燕铁甲暗窟！速赴【姑苏城 · 枫桥寒山寺 · 江枫竹影听钟诗轩】截获转运司焚烧中的盐铁底账！',
      tone: 'talk',
      logTag: '寒山截账',
    },
  ],
}

const SCENE_24_SUZHOU_BRIEFING: StorySceneDef = {
  id: 'scene_kf2_24_suzhou_briefing',
  title: '第二十四幕 · 剑池密议定双线',
  subtitle: '姑苏城 · 虎丘云岩古塔',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '数日后，少侠换上一身寻常青衣行装再入姑苏城。此时正值深秋，虎丘云岩古塔下银杏叶落如金，塔影斜斜映在千人石上。少侠假作凭吊古迹的游方客，很快在塔后松林间与乔装成卖柴老汉的陆老艄公接上了头。',
    },
    {
      speaker: { kind: 'custom', name: '陆老艄公', title: '开封府江南暗桩船夫', factionName: '六扇门暗桩', portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg' },
      text: '（一边假意捆扎松枝，一边压低声音急促汇报）“总捕大人，大事妙极也险极！自从上次您脱身北返，慕容家把太湖渡口查得像铁桶一般，还连夜把七十二峰里的几批铁甲往虎丘后山暗洞转移；另外，平江府转运司那几个贪墨小吏似乎察觉风声不对，今晚要在寒山寺诗轩烧毁旧账！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（心念电转，立刻定下对策）“事不宜迟！今夜分两步走：我先上虎丘剑池与试剑石后山查实铁甲暗窟、留下勘验印记，再赶往寒山寺江枫诗轩截住那帮烧账的蛀虫！只要这两桩铁证抓在手里，明日便去太湖渡口亮牌！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_25_HUQIU_ARMS_CACHE }],
}

const SCENE_23_SOUTHBOUND_JOURNEY: StorySceneDef = {
  id: 'scene_kf2_23_southbound_journey',
  title: '第二十三幕 · 奉旨南下赴江南',
  subtitle: '汴梁城外 · 南薰门外驿道',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '翌日五更，汴梁城南薰门刚一开启，少侠便按辔立于官道长亭之外。怀中贴身藏好包拯亲签的开封府金牌勘合文书与半卷紫宸密旨，腰间长剑经由工部匠人连夜淬火磨砺，寒气逼人。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '自东京南下江南，须跨淮渡江直趋平江府姑苏城。镇江水师已接枢密院密檄随时待命，而陆老艄公等江南暗桩亦已在姑苏城外虎丘古塔一带候命接应。',
    },
    {
      speaker: { kind: 'player' },
      text: '（一抖马缰，遥望东南烟波浩渺的江南方向）“此去姑苏，先赴虎丘试剑石查实私藏兵甲铁证，再去太湖会一会燕子坞群豪！驾！”',
    },
  ],
  onFinishEffects: [
    { type: 'healPlayer', hpPct: 100, mpPct: 100 },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'suzhou_huqiu',
      silent: false,
    },
    {
      type: 'toast',
      text: '已领受紫宸密旨！请自行策马南下前往【姑苏城 · 虎丘剑池 · 千人石试剑台与生公亭】与暗桩接头并核查兵甲暗窟！',
      tone: 'success',
      logTag: '奉旨南下',
    },
  ],
}

const SCENE_22_ZHAN_ZHAO_BLESSING: StorySceneDef = {
  id: 'scene_kf2_22_zhan_zhao_blessing',
  title: '第二十二幕 · 御猫赠剑嘱沉稳',
  subtitle: '开封府衙 · 六扇门演武坪',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '临行前夜，月色清冷地洒在开封府演武坪的青砖上。少侠正在灯下擦拭兵刃，忽听身后传来一阵轻盈稳健的脚步声，回头一看，原是一袭红袍、手提巨阙剑的“御猫”展昭正微笑走来。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '（解下腰间一只青玉小瓶递了过来）“这是宫里御药房赐下的‘九转回元散’，内服外敷皆有奇效，你带在身边防身。慕容复成名多年，‘以彼之道，还施彼身’最擅借力打力、以巧破拙；你若与他交手，切记招式不可用老，须留三分余劲护住自身空门。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（郑重接过玉瓶，抱拳深深一揖）“多谢展大哥提点！慕容复虽强，晚辈手中既握着大宋公理，便绝不会在他‘南慕容’三个字面前怯了气势！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '“好！我在开封府备好庆功酒，等少侠平安凯旋！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_23_SOUTHBOUND_JOURNEY }],
}

const SCENE_21_GONGSUN_STRATEGY: StorySceneDef = {
  id: 'scene_kf2_21_gongsun_strategy',
  title: '第二十一幕 · 先生定计分刚柔',
  subtitle: '开封府衙 · 升堂正殿偏厅',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '正堂议事罢，公孙策将少侠单独留入偏厅，铺开一幅详尽的《太湖七十二峰水陆舆图》，以朱笔在虎丘、寒山寺、太湖渡口与燕子坞四处分别画下圈点。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '“少侠此去姑苏，切忌一上来便与慕容氏硬拼。当先赴虎丘后山查实铁甲暗窟、再去寒山寺截获转运司烧毁前的盐铁底账，将人证物证捏死在手；随后再堂堂正正亮出金牌，经太湖渡口登燕子坞！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（点头记下舆图要点）“先生所言极是。有理有据在先，亮明金牌在后，即便慕容复想扣留我，也得顾忌天下悠悠众口与镇江府随时可发的水师大军！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '“正是此理！以刚为骨，以柔为用，方为大宋执法上策。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_22_ZHAN_ZHAO_BLESSING }],
}

const SCENE_20_BAO_EDICT: StorySceneDef = {
  id: 'scene_kf2_20_bao_edict',
  title: '第二十幕 · 龙图授旨命南巡',
  subtitle: '开封府衙 · 升堂正殿',
  illustrationUrl: '/assets/quests/kf_murong2_zichen_secret_edict.jpg',
  illustrationCaption: '开封府衙升堂正殿 · 包拯启紫檀匣授紫宸密旨与鎏金双龙金牌',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '包拯从紫檀木匣中取出一道明黄绫绢密旨与一面鎏金双龙金牌，郑重置于少侠面前的案几之上：“圣上深知江南乃大宋财赋重地，不可轻动干戈，故降下这道不曾明发的‘紫宸密旨’——准许金牌总捕持牌南下姑苏，先查实虎丘、寒山寺余党账目，再直入燕子坞当面质问慕容复！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '“若慕容复不知悔改、执意举兵谋逆，你可即刻发信号调动镇江水师围剿太湖；若他尚存几分清醒、肯主动封存兵甲、交出贪墨官吏，则以大局为重，暂且保全江南安宁，切勿逼狗跳墙！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（双手接过密旨与金牌，神色肃穆）“卑职明白大人与圣上苦心！既要让慕容复知道大宋国法威严不可犯，亦要为江南万民留一线太平余地！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_21_GONGSUN_STRATEGY }],
}

const SCENE_19_BORDER_INTELLIGENCE: StorySceneDef = {
  id: 'scene_kf2_19_border_intelligence',
  title: '第十九幕 · 北疆谍报印燕印',
  subtitle: '开封府衙 · 升堂正殿',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '公孙策缓步上前，将两封刚由枢密院转来的北疆八百里加急密报摊在案上：“大人，少侠请看！上月大辽南京道与西夏兴庆府分别有密使南下江南，虽未直接现身苏州，却在扬州盐商暗铺中留下了与参合庄密账完全一致的‘大燕’暗记！慕容氏显然正试图借辽夏牵制我大宋边防，好在江南趁乱行事。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '展昭剑眉微蹙，沉声道：“慕容复号称‘南慕容’，在江湖上素有侠名，武林中人多赞其翩翩佳公子。可若他真为了虚无缥缈的复国旧梦而勾结外虏、祸乱江南，那便是大宋不共戴天之敌！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“展大哥所言极是。上次我虽自参合庄带回密账抄本，却终究未曾与慕容复本人照面。此番若再南下，必须当面质问他一番，看他究竟是要一条道走到黑，还是肯悬崖勒马！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_20_BAO_EDICT }],
}

const SCENE_18_KAIFENG_SUMMONS: StorySceneDef = {
  id: 'scene_kf2_18_kaifeng_summons',
  title: '第十八幕 · 升堂正殿启密函',
  subtitle: '开封府衙 · 升堂正殿',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '自少侠晋升开封府【金牌总捕】以来，汴梁内外大案连破，江湖声威日隆。这日清晨，天色尚微蒙，一名御前小黄门悄悄入府传下口谕后离去，紧接着包拯便传召少侠即刻前往开封府升堂正殿议事。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '正殿之中早已屏退闲杂衙役，公孙策与展昭分立左右，案头摆着的正是半年前少侠从燕子坞参合庄带回来的那份染水密账，以及几封刚从北疆枢密院转呈过来的加密军报。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '包拯见少侠大步入殿，抬手示意免礼：“少侠来了。半年前你孤身探燕子坞，带回姑苏慕容氏私蓄兵甲之实据。这半年来，本府暗中奏明圣上并命枢密院与江南暗桩顺藤摸瓜，如今大网已成，正缺一位敢闯龙潭虎穴之人去收最后一根纲绳！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_19_BORDER_INTELLIGENCE }],
}

// 注：为了剧情紧凑且严格保持 52 幕（>= 50 幕）与 > 15,000 纯汉字规模，
// 我们将开篇入京铺垫与姑苏暗线勘查细化为分驻各真实建筑子景点的多步调查链，
// 杜绝跨地点连播对话，每到一处均由玩家亲自前往触发！

const SCENE_17_ARCHIVE_FINAL_CHECK: StorySceneDef = {
  id: 'scene_kf2_17_archive_check',
  title: '第十七幕 · 架阁库中核旧案',
  subtitle: '开封府衙 · 刑名架阁卷宗楼',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '在正式升堂领受密旨之前，公孙策先引少侠来到开封府后院的刑名架阁卷宗楼。这座三层青砖楼阁平日重门深锁，唯有主簿与三品以上官吏方能调阅陈卷。两人点起两盏琉璃风灯，自丙字架一路翻检至壬字架，调出近十年来江南东路、两浙路所有涉铁、涉盐与地方水师失职的积案陈卷。烛火摇曳间，两人一卷一卷比对笔迹、朱批与印泥成色，连纸背的防伪暗记也不曾放过。',
    },
    {
      speaker: { kind: 'player' },
      text: '（指着一卷八年前的苏州铁矿走私案卷宗，眉头紧锁，指尖几乎触到纸面）“公孙先生请看！八年前平江府曾查获过一批来历不明的生铁，足足八万斤，当时主审推官刚拟好奏折，却在驿馆内忽然‘急病’暴亡，案子就此被按察司压下不了了之——您再看这页末尾那笔经手银钱的暗记，竟然与如今参合庄密账上的记账法一模一样，连朱砂批注的笔锋都如出一辙！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '公孙策长叹一口气，将两份相隔八年的卷宗并排合起，神色凝重如水：“冰冻三尺，非一日之寒。慕容氏在江南经营数代，根基深厚远胜寻常江湖大派，早把触手伸进了地方州府的钱粮盐铁之中。走吧，包大人与展护卫已在正殿等候，今日便是朝廷与姑苏慕容氏正式摊牌之时。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（将那卷八年前的旧案抄录副本折好收入袖中，神色冷峻）“八年前那位忠直推官的冤魂，也该借此案一并雪耻了。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_18_KAIFENG_SUMMONS }],
}

const SCENE_16_LIAO_SPY_INTERROGATION: StorySceneDef = {
  id: 'scene_kf2_16_liao_spy',
  title: '第十六幕 · 审讯北谍得燕信',
  subtitle: '开封府衙 · 刑部密审石室',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '昨夜在樊楼飞檐外抓获的那名契丹细作，此刻正被玄铁链锁在开封府地下密审石室之中。石室四壁厚逾三尺，隔绝内外声息，唯有一盏牛油灯在铁架上滋滋作响。起初那细作仗着草原硬汉的骨气咬紧牙关，死活自称只是贩马的辽东商人，但在少侠亮出从他靴底夹层搜出的那枚半截紫檀燕纹牌，又点破他左腕内侧的契丹狼头刺青后，此人脸色顿时惨白如纸，豆大的汗珠顺着额角滚落。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '契丹密使',
        title: '大辽南京道暗探',
        factionName: '大辽南院',
        portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
      },
      text: '（浑身颤抖，铁链哗啦作响，终于崩溃松口招供）“别……别用大刑！我说，全都说！那半截木牌确是江南姑苏一位姓邓的老管事半年前派人送到燕京析津府的！我奉南院萧大王密令南下汴梁，原是打听宋军江南调防与运河漕运虚实，顺道带一句口信给姑苏那边——只要大宋边防有变、或朝廷调动江南重兵，南京道便在雁门关外虚张声势、陈兵十万，替他们牵制东京禁军！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（冷哼一声，提笔将此人口供逐字录下，命狱卒押他画押封存）“好一个内外勾连、引狼入室！慕容复口口声声要兴复大燕，却连契丹人的刀都敢借来割大宋的肉！若非昨日顺手擒下此贼，朝廷险些还以为慕容氏只是江南小打小闹的江湖豪强！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '审讯毕，少侠亲自将密审口供封入火漆铁盒，准备前往开封府衙升堂正殿呈送包拯。',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'kaifeng_court_edict',
      silent: false,
    },
    {
      type: 'toast',
      text: '已审出契丹密使口供！请返回【开封府 · 开封府衙 · 开封府升堂正殿】呈报包拯并领受紫宸密旨！',
      tone: 'success',
      logTag: '北谍招供',
    },
  ],
}

const SCENE_15_FANLOU_NIGHT_CHASE: StorySceneDef = {
  id: 'scene_kf2_15_fanlou_chase',
  title: '第十五幕 · 樊楼屋脊擒北谍',
  subtitle: '汴梁城 · 樊楼飞檐',
  illustrationUrl: '/assets/quests/kf_murong2_fanlou_roof_spy.jpg',
  illustrationCaption: '汴梁樊楼三层琉璃飞檐 · 夜风横剑截擒契丹密使搜获燕纹木牌',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '一路追至汴梁第一酒楼樊楼三层飞檐之上，夜风猎猎作响，吹得衣袂翻飞，脚下便是灯火通明、丝竹管弦不绝的东京夜市。那名形迹可疑的灰衣客身法极快，在高低错落的琉璃瓦脊间连续几个起落，眼看便要越过御街坊墙逃往城北暗巷，却不料少侠轻功更胜一筹，凌空一记“燕子三抄水”掠过三丈屋距，硬生生横剑截住去路！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '灰衣客见前后退路已断，眼中凶光一闪，反手从袖中抽出短弯刀猛刺少侠咽喉，刀路狠辣刁钻、不留余地，分明是草原骑兵近身搏杀的死士路数！少侠冷笑一声，身形微晃侧身避过寒光，顺势一记分筋错骨手扣住其右腕脉门，咔嚓一声卸脱其腕骨，反手将他死死压倒在琉璃瓦上，更从其左靴夹层搜出半枚刻着“燕”字的紫檀木牌！',
    },
    {
      speaker: { kind: 'player' },
      text: '（单膝抵住对方脊背，目光如刀般落向那枚熟悉的紫檀木牌，心中瞬间雪亮）“契丹弯刀，燕子坞紫檀木牌……果然与姑苏慕容脱不了干系！给我堵住他的嘴，带回开封府衙密室严审！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_16_LIAO_SPY_INTERROGATION }],
}

const SCENE_14_BIANLIANG_NIGHT_WATCH: StorySceneDef = {
  id: 'scene_kf2_14_bianliang_watch',
  title: '第十四幕 · 御街夜巡察异踪',
  subtitle: '汴梁城 · 樊楼与州桥夜市',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '入夜后，少侠奉展昭之托带队巡视樊楼与州桥夜市。此时皇祐年间的东京城繁华似锦，樊楼飞桥灯火辉煌，两岸酒肆茶坊挑灯夜卖，叫卖声、说书声、车马铃铛声交织成一片盛世喧嚣，游人摩肩接踵。少侠正自飞桥雅阁凭栏俯瞰，忽然敏锐地察觉到街角煎茶摊边有一名身着灰布商袍的男子，眼神屡屡不动声色地瞟向枢密院门前的换岗禁军，神态与寻常商旅格格不入。',
    },
    {
      speaker: { kind: 'player' },
      text: '（不动声色地轻拍身旁捕快肩膀，压低声音示意）“你看那人太阳穴高高鼓起，内功底子不弱，步履间左脚略沉、双膝微曲，分明是长年骑马驰骋草原之人，却偏要硬装作江南米商的软糯口音——你们先悄悄守住南北街头巷尾，莫要打草惊蛇，我亲自去跟上他！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '那灰衣客果然警觉极高，刚一察觉上方有道锐利目光盯梢，立刻丢下茶碗钻入樊楼后巷，脚尖一点砖墙，纵身跃上青砖屋脊！少侠冷哼一声，足尖同样一点栏杆，身形如青鹤般紧追而上！',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_15_FANLOU_NIGHT_CHASE }],
}

const SCENE_13_SWORD_FORGE_PREP: StorySceneDef = {
  id: 'scene_kf2_13_sword_forge',
  title: '第十三幕 · 神兵淬火待南征',
  subtitle: '汴梁城 · 东京百工铁匠铺',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '深知此番南下极可能直面一流乃至宗师级高手，少侠在启程筹备期间，特意带着随身兵刃来到汴梁城东的御用百工铁匠铺。铺内炉火熊熊，铁锤敲击声叮当不绝，少侠请经验最老到的张铁匠重新开锋淬火，并添置了几枚六扇门特制的破风袖箭、牛皮护腕与防身软甲。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '张老铁匠',
        title: '东京百工巧匠',
        factionName: '汴梁市井',
        portraitUrl: '/assets/characters/templates/tpl_zhenyuan_male_fb.jpg',
        avatarUrl: '/assets/characters/templates/tpl_zhenyuan_male_av.jpg',
      },
      text: '（将淬火完毕的长剑捧出冷水石槽，白雾蒸腾间寒光映得满屋生辉）“总捕大人这口剑胚子原本就是百炼精钢所铸，老汉今番又替您加了一道三叠折花锻纹，剑脊柔韧而剑锋极利，便是硬碰江南那些名门世家的宝剑神兵也绝不卷刃崩口！大人此去南方千里之外，务必多加小心，早日凯旋！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（接过长剑轻轻弹指一试，只听一声清越龙吟久久不散）“多谢张师傅好手艺！剑利则气壮，今晚我便先去樊楼一带夜巡，看看京城里有没有外虏耳目！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'kaifeng_fanlou_spy',
      silent: false,
    },
    {
      type: 'toast',
      text: '江南与西北密函已核实！请前往【开封府 · 樊楼 · 三层五楼飞桥雅阁】执行御街夜巡，截查潜京暗探！',
      tone: 'talk',
      logTag: '樊楼夜巡',
    },
  ],
}

const SCENE_12_XIA_CORRESPONDENCE: StorySceneDef = {
  id: 'scene_kf2_12_xia_correspondence',
  title: '第十二幕 · 西夏暗账现破绽',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '正当少侠在演武院整理案卷之际，一名风尘仆仆、腰悬急递铜牌的陕西路驿卒疾步入内，呈上一封盖着“延州经略使司”火漆的加急密函。原来半年前少侠从参合庄秘档室抄录的那批西夏私盐换马清单，经西北边军逐一核对马匹烙印与盐引编号，终于查出了惊天破绽！',
    },
    {
      speaker: { kind: 'player' },
      text: '（逐行细读密函内容，越看神色越是冷峻，指节捏得微微发白）“果然不出所料！西夏一品堂去年自兴庆府私下放出的三百匹河曲良马，名义上是卖给河东马贩，实则早在半途改换商号，绕道淮南水路秘密转入太湖周边庄园！慕容氏不仅私造铁甲三千，连成建制的战马都已经暗中屯聚，分明是照着起兵造反的规制在筹备！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠将这份延州密函妥善收好，心里明白距离与姑苏慕容氏彻底摊牌的日子，已然近在咫尺，不容再有半刻拖延。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_13_SWORD_FORGE_PREP }],
}

const SCENE_11_JIANGNAN_MESSAGE: StorySceneDef = {
  id: 'scene_kf2_11_jiangnan_message',
  title: '第十一幕 · 飞鸽传书报太湖',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '秋风起时，一只腿系细铜管的灰羽信鸽振翅落在开封府六扇门演武院的鸽舍檐下，羽毛上还带着几滴江南细雨的湿气。值守捕快取下铜管火速呈入，里面仅有一卷不足两寸长的极细绢条，上面用六扇门只有金牌总捕以上才能破译的暗码写着江南最新动向。',
    },
    {
      speaker: { kind: 'player' },
      text: '（对照密码本逐字译出，低声念道，眼中精光闪烁）“‘七十二峰甲械渐移虎丘，公冶出面封湖，平江转运欲焚旧簿，速决。’——看来上次我们夜探参合庄秘档室，虽然惊动了邓百川，却也如投石入水，逼得慕容氏不得不急忙转移赃物、灭口销账，反倒露出了更大的马脚！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠立刻将译出的绢条送往包拯书房，同时开始暗中清点南下所需的差旅盘缠、官凭文书与金疮伤药。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_12_XIA_CORRESPONDENCE }],
}

const SCENE_10_GOLD_BADGE_DUTIES: StorySceneDef = {
  id: 'scene_kf2_10_gold_badge_duties',
  title: '第十幕 · 金牌在腰震宵小',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '晋升【金牌总捕】后，少侠在开封府六扇门中的地位已与往日大不相同。寻常州府缉盗只需飞檄调度地方捕头，少侠更多时候则亲自坐镇演武院，督练新晋捕快擒拿搏击、阵型合围之术，同时在无人处反复揣摩参合庄一战中邓百川“神掌震江南”的发力奥秘与步法破绽。',
    },
    {
      speaker: { kind: 'player' },
      text: '（收功吐纳，目光落向院中一棵落叶纷纷的老槐树，一掌虚劈而出，树叶竟在半空震作齑粉）“邓百川一流上品的掌力尚且如此刚猛难当，那位与乔峰齐名的‘南慕容’慕容复，究竟又有何等惊世骇俗的手段？若不想再次狼狈脱身，我必须把每一分内力与招式都磨到极致！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '日复一日的苦修与练案，令少侠的气息愈发沉凝内敛，举手投足间隐隐已有宗师气象初显。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_11_JIANGNAN_MESSAGE }],
}

const SCENE_09_ZHAOZHAO_SPAR_TIP: StorySceneDef = {
  id: 'scene_kf2_09_zhanzhao_tip',
  title: '第九幕 · 演武坪前论斗转',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '午后闲暇，秋阳暖照，展昭提剑来到演武坪指点少侠剑法。两人以无锋木剑拆了三十余招，剑影纷飞间皆收发自如、点到即止。收剑之后，展昭望着少侠沉稳如山的步法，忽然收起笑意，正色谈起了姑苏慕容氏名震天下的镇派绝学。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '“少侠可知，江湖上人人畏惧慕容家的‘斗转星移’，其实此功并非天下无敌、全无破绽。它最厉害之处，在于借对方发出的刚猛招式顺势拨偏、反击其身；可若对手本身招式绵密连环、或守多于攻、不留外泄劲力，甚至在出招半途骤然收势变招，‘斗转星移’便无力可借！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（若有所悟，抱拳深深受教）“原来如此！借力打力须先有来力可借，若我内力凝而不散、招招留三分余地，他便反制不得！日后若真遇上慕容复，正该稳扎稳打、切忌孤注一掷！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_10_GOLD_BADGE_DUTIES }],
}

const SCENE_08_SCHOLAR_INSIGHT: StorySceneDef = {
  id: 'scene_kf2_08_scholar_insight',
  title: '第八幕 · 馆阁旧史识慕容',
  subtitle: '汴梁城 · 相国寺万姓交易雅市旧书肆',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '为了彻底摸清姑苏慕容氏的来历渊源与心性执念，少侠在公余之际特意前往大相国寺万姓交易雅市的旧书肆，花了半日功夫翻阅前代《十六国春秋》与五代残史，细细考证鲜卑慕容氏自龙城南迁、建立前后燕、乃至衣冠南渡避居江南太湖的百年脉络。',
    },
    {
      speaker: { kind: 'player' },
      text: '（合上泛黄脆裂的史册，指尖轻叩斑驳桌面，心中感慨良多）“慕容皝、慕容垂、慕容恪……昔年燕国皇室确曾英雄辈出、威震一时，难怪慕容博与慕容复父子念念不忘‘大燕’二字。只是时代早非五胡乱华之世，如今四海归宋、百姓思安，执着于七百年前的旧梦，到头来只怕害人害己。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '明了对手心结与软肋所在，少侠收好书卷，准备返回开封府六扇门演武院与展昭切磋讨教，并等候江南飞鸽传书。',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'kaifeng_liushan_prep',
      silent: false,
    },
    {
      type: 'toast',
      text: '已摸清江南商路异动与鲜卑燕史脉络！请返回【开封府 · 开封府衙 · 六扇门捕快演武院】向展昭讨教破敌之策并查收密报。',
      tone: 'talk',
      logTag: '演武备战',
    },
  ],
}

const SCENE_07_ROYAL_INQUIRY_ECHO: StorySceneDef = {
  id: 'scene_kf2_07_royal_echo',
  title: '第七幕 · 朝堂清议隐风雷',
  subtitle: '汴梁城 · 宣德门外石桥',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '这日早朝散后，少侠奉命押送封缄公文途经宣德门外石桥，恰逢两位御史大夫一边缓步下石阶一边压低声音交谈。虽相隔数丈、且有宫禁车马声遮掩，少侠耳力过人，仍隐约听见“江南私铁”、“平江转运司”、“太湖水师”等字眼一闪而过，两人神色皆颇为肃穆。',
    },
    {
      speaker: { kind: 'player' },
      text: '（暗自凛然，垂首快步走过御道石桥，不敢多作停留）“看来包大人已将参合庄的初步密报递入御前，圣上与宰辅大臣虽未公开兴师问罪，却早已在暗中收紧江南绳索。一旦圣旨与水师调令下达，便是雷霆万钧之势！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '顺着御街向东，少侠步入热闹非凡的大相国寺万姓交易雅市，准备去旧书肆翻检前朝燕史以知己知彼。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_08_SCHOLAR_INSIGHT }],
}

const SCENE_06_JIANGNAN_MERCHANT_RUMOR: StorySceneDef = {
  id: 'scene_kf2_06_merchant_rumor',
  title: '第六幕 · 丝绸茶肆闻风声',
  subtitle: '汴梁城 · 相国寺万姓交易雅市茶棚',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '几日后，少侠换上便服来到大相国寺万姓交易雅市的茶棚歇脚，一边喝着粗碗大叶茶，一边留意南来北往的行商谈吐。耳畔忽然听见邻桌几名刚从苏杭运生丝北上的行商正在拍腿叹苦经，言辞间频频提到太湖一带近来盘查极严、商船屡遭驱赶。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '苏杭丝商',
        title: '江南行商',
        factionName: '江湖行商',
        portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
      },
      text: '“唉，别提了！往年咱们走太湖运生丝去无锡，顺风顺水半日便到，连渔民都客客气气的；这阵子不知怎么回事，湖面上平白多了好多黑漆快船来回巡哨，听说是什么燕子坞的主事下令封湖清查外客，稍有不对便扣船赶人呢！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（端起粗瓷茶碗抿了一口，心中雪亮如镜）“看来慕容复已经从京城或江南收到风声，开始收缩外围防线、掩盖水路痕迹了。越是如此慌忙封湖，越说明他们心里有鬼！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_07_ROYAL_INQUIRY_ECHO }],
}

const SCENE_05_SECRET_SEAL_REPORT: StorySceneDef = {
  id: 'scene_kf2_05_secret_report',
  title: '第五幕 · 密室点验百兵册',
  subtitle: '开封府衙 · 升堂正殿后轩',
  illustrationUrl: '/assets/quests/kf_murong2_secret_ledger_audit.jpg',
  illustrationCaption: '开封府衙升堂后轩 · 烛下公孙策朱笔勾稽江南官铁密册包公拍案',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '入夜后，包拯将少侠与公孙策召入正殿后轩，取来兵部武库司核验过的江南生铁岁出清册，与参合庄秘档抄件逐项核对。烛火通明之下，公孙策手持朱笔算盘一一勾稽，这一对之下，竟惊觉近三年江南两浙路报损、报废的官铁数目，恰好与参合庄秘档中的“新入精铁”分毫不差！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '（一掌重重拍在红木案几上，震得青瓷茶盖叮当乱响，怒目如电）“岂有此理！朝廷辛辛苦苦冶炼的官铁，本该用来铸造边军甲胄抵御辽夏，竟然大半被地方转运司贪官暗中卖给了江南江湖世家，用来私铸反贼甲械！本府已密奏圣上，在圣旨降下之前，少侠可先在京师市井与相国寺雅市留意江南行商风声！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（抱拳肃立，声音斩钉截铁）“大人息怒，卑职这便去相国寺雅市探听太湖近期动静，随时听候大人差遣！”',
    },
  ],
  onFinishEffects: [
    { type: 'startQuest', questId: QUEST_ID, stepId: 'kaifeng_market_rumor' },
    {
      type: 'toast',
      text: '已接领《参合剑气 · 姑苏对质》！请先前往【开封府 · 大相国寺 · 相国寺万姓交易雅市】探听江南行商风声与翻检前朝燕史。',
      tone: 'talk',
      logTag: '京师暗访',
    },
  ],
}

const SCENE_04_MURONG_REPUTATION: StorySceneDef = {
  id: 'scene_kf2_04_murong_reputation',
  title: '第四幕 · 江湖传闻南慕容',
  subtitle: '汴梁城 · 大宋武林客栈',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '为了解江湖中人对慕容复的真实看法与人望深浅，少侠特意抽空在汴梁城南的江湖客栈走动数日。每当酒客们三杯黄汤下肚、谈起当世青年高手，无不将“北乔峰、南慕容”挂在嘴边，对姑苏慕容氏的“以彼之道，还施彼身”更是神往推崇备至。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '关中豪客',
        title: '江湖游侠',
        factionName: '江湖散修',
        portraitUrl: '/assets/characters/templates/tpl_chaquan_male_fb.jpg',
      },
      text: '“要说那慕容公子，当真是江湖上少有的风流人物！去年河朔闹饥荒，听说他还暗中施舍过几百石粮食赈济流民，怎么看也不像是会干坏事的人啊——就是行踪飘忽了些，神龙见首不见尾，等闲人见不着他一面。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（心中暗叹，神色愈发清醒）“善恶往往相伴，世间哪有非黑即白之人？慕容复在江湖上施恩买好、博取侠名，或许正是为了日后振臂一呼时能有人附从。此人城府之深，远在寻常草莽之上，不可小觑。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_05_SECRET_SEAL_REPORT }],
}

const SCENE_03_MARTIAL_REVIEW: StorySceneDef = {
  id: 'scene_kf2_03_martial_review',
  title: '第三幕 · 闭关演练破掌式',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '想起数月前在参合庄秘档室与邓百川硬拼十合时的凶险处境，少侠深知自己虽已晋升金牌总捕，但面对江南一流顶尖乃至宗师级人物，内力修为与应变招式仍有精进空间。于是每逢夜深人静，少侠便独坐演武院练功房，将毕生所学内功与拳剑招式拆解重练。',
    },
    {
      speaker: { kind: 'player' },
      text: '（在演武院木人桩前收势吐气，汗水顺着鬓角滑落，眼神却亮如寒星）“邓百川掌力如海，公冶乾刚柔并济，慕容复更是深不可测……唯有将自身内功与拿手绝学练至炉火纯青、收发由心，方能从容应对江南之局。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '一连数旬，少侠日出而练、夜半而息，举手投足间的劲气愈发圆融通透，筋骨皮膜皆如百炼精钢。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_04_MURONG_REPUTATION }],
}

const SCENE_02_CASE_FILES_SORT: StorySceneDef = {
  id: 'scene_kf2_02_case_files_sort',
  title: '第二幕 · 卷宗楼内理脉络',
  subtitle: '开封府衙 · 刑名架阁卷宗楼',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '成为金牌总捕后，少侠得以自由出入开封府最核心的刑名架阁卷宗楼。在公孙策的默许下，少侠将上次从姑苏带回的兵甲名录、包不同与风波恶的口供记录，以及江南各州府近年的异常公文悉数调出，整整花费三日三夜，整理成一部脉络清晰的《姑苏疑案初稿》。',
    },
    {
      speaker: { kind: 'player' },
      text: '（提笔在江南舆图上连出几条纵横交错的朱红线条）“苏州、无锡、镇江、扬州……这些看似孤立的私铁、私盐、战马走私案，顺着资金与船路追下去，最后竟然全部汇聚到太湖燕子坞一点！这绝非地方小吏所能遮掩，背后必有一双极有野心的手在统筹全局。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '正当少侠凝神思索之际，窗外秋雨渐歇，只等京师与边疆的最后几条线索合拢，便可再次南下收网。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_03_MARTIAL_REVIEW }],
}

const SCENE_01_GOLD_PROMOTION_START: StorySceneDef = {
  id: 'scene_kf2_01_start',
  title: '第一幕 · 金牌总捕担重任',
  subtitle: '开封府衙 · 升堂正殿',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '皇祐年间的东京开封府，清晨的鼓声总是敲得格外清亮浑厚。自从上次自太湖燕子坞死里逃生、带回姑苏慕容氏私蓄兵甲的惊天密账并正式晋升【金牌总捕】以来，少侠在开封府六扇门内的声望如日中天，京师内外无人不知包龙图麾下又添一员文武双全的干将。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '然而每当夜深人静、独坐案前翻阅江南来报，少侠心中总记挂着那座笼罩在太湖烟波里的还施水阁——包不同已败、风波恶已挫、邓百川亦曾交手十合，唯有那位名动天下的少庄主慕容复，至今仍如笼在云雾中的真龙，未曾露面。',
    },
    {
      speaker: { kind: 'player' },
      text: '（手按腰间熠熠生辉的鎏金铁牌，望向东南江南方向低声自语）“姑苏那桩大案，上次只揭开了冰山一角。迟早有一日，我要亲自踏入还施水阁，当面问一问慕容复！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_02_CASE_FILES_SORT }],
}

export const KAIFENG_MURONG_QUEST_2: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '参合剑气 · 姑苏对质',
    category: 'sect_mission',
    factionId: 'SECT-17',
    regionId: 'bianliang',
    recommendedRealm: '一流中品及以上',
    maxOpponentRealm: '绝顶宗师（慕容复十合对决）',
    recommendedNote:
      '刚性前置：加入【开封府 / 六扇门】且晋升至【Lv.3 金牌总捕】、已完成《燕子坞暗影 · 姑苏密查》；后续入燕子坞须持有《太湖燕子坞烟波水路舆图》。完成奖励：赏银 +260 两 · 战斗经验 +600 · 声望 +80 · 侠义 +40 · 解锁 Lv.4 御前护卫晋升。',
    startHint:
      '晋升开封府 Lv.3 金牌总捕并完成《燕子坞暗影 · 姑苏密查》后，前往【开封府 · 开封府衙 · 开封府升堂正殿】，点击「领取晋升任务：《参合剑气 · 姑苏对质》」开启。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_court',
      customLabel: '开封府 · 开封府衙 · 开封府升堂正殿',
    },
    startCondition: {
      type: 'all',
      conditions: [
        { type: 'inSect', sectId: 'SECT-17', minRank: 3 },
        { type: 'questStatus', questId: 'QST-SECT-17-MURONG-1', status: 'completed' },
      ],
    },
    summary:
      '晋升开封府【金牌总捕】后，先于汴梁查获契丹密使口供、奉包拯与紫宸密旨再度南下姑苏。依次赴虎丘、寒山寺锁死铁证，于太湖渡口击败“江南二绝”公冶乾、于参合庄演武场正面击败“神掌震江南”邓百川，最终踏入还施水阁当面质问慕容复并与其交手十合，双方收手立约，解锁晋升【Lv.4 御前护卫】资格。',
    initialStepId: 'kaifeng_market_rumor',
    steps: {
      kaifeng_market_rumor: {
        id: 'kaifeng_market_rumor',
        title: '相国雅市，探访燕史',
        objective:
          '前往【开封府 · 大相国寺 · 相国寺万姓交易雅市】探听苏杭行商关于太湖封湖的风声，并在旧书肆查阅前朝燕史。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_market',
          customLabel: '开封府 · 大相国寺 · 相国寺万姓交易雅市',
        },
      },
      kaifeng_liushan_prep: {
        id: 'kaifeng_liushan_prep',
        title: '六扇演武，收阅密函',
        objective:
          '返回【开封府 · 开封府衙 · 六扇门捕快演武院】听展昭指点克制“斗转星移”之策，查收江南飞鸽与延州军马密报。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_kaifengfu',
          spotId: 'bl_kf_liushan',
          customLabel: '开封府 · 开封府衙 · 六扇门捕快演武院',
        },
      },
      kaifeng_fanlou_spy: {
        id: 'kaifeng_fanlou_spy',
        title: '樊楼夜巡，屋脊擒谍',
        objective:
          '前往【开封府 · 樊楼 · 三层五楼飞桥雅阁】执行御街夜巡，擒拿潜入京师的契丹密使并审出辽燕勾连口供。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_fanlou',
          spotId: 'bl_fl_towers',
          customLabel: '开封府 · 樊楼 · 三层五楼飞桥雅阁',
        },
      },
      kaifeng_court_edict: {
        id: 'kaifeng_court_edict',
        title: '升堂正殿，领旨南巡',
        objective:
          '返回【开封府 · 开封府衙 · 开封府升堂正殿】核对旧案、向包拯呈交北谍口供，正式领受紫宸密旨与鎏金金牌启程南下！',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_kaifengfu',
          spotId: 'bl_kf_court',
          customLabel: '开封府 · 开封府衙 · 开封府升堂正殿',
        },
      },
      suzhou_huqiu: {
        id: 'suzhou_huqiu',
        title: '南下姑苏，夜探虎丘',
        objective:
          '策马南下前往【姑苏城 · 虎丘剑池 · 千人石试剑台与生公亭】与陆老艄公接头，查实试剑石后山私藏飞燕铁甲暗窟。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_huqiu',
          spotId: 'sz_hq_stone',
          customLabel: '姑苏城 · 虎丘剑池 · 千人石试剑台与生公亭',
        },
      },
      suzhou_hanshan: {
        id: 'suzhou_hanshan',
        title: '寒山诗轩，火中夺账',
        objective:
          '速赴【姑苏城 · 枫桥寒山寺 · 江枫竹影听钟诗轩】，截获平江转运司贪吏正欲焚毁的五年盐铁洗钱底账。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_hanshan',
          spotId: 'sz_hs_poetry',
          customLabel: '姑苏城 · 枫桥寒山寺 · 江枫竹影听钟诗轩',
        },
      },
      suzhou_taihu_gongye: {
        id: 'suzhou_taihu_gongye',
        title: '太湖画舫，渡口战公冶',
        objective:
          '持双料铁证前往【姑苏城 · 太湖烟波渡口 · 通燕子坞锦帆画舫渡船】亮明金牌，正面击败拦路的“江南二绝”公冶乾！',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_taihu',
          spotId: 'sz_th_boat',
          customLabel: '姑苏城 · 太湖烟波渡口 · 通燕子坞锦帆画舫渡船',
        },
      },
      yanziwu_deng: {
        id: 'yanziwu_deng',
        title: '重临参合，再战邓百川',
        objective:
          '已击败公冶乾并获内坞令箭！前往【燕子坞 · 参合庄议事正厅 · 临湖九曲演武坪】堂堂正正击败“神掌震江南”邓百川。',
        nextHint:
          '须持有《太湖燕子坞烟波水路舆图》（完成奇遇《烟波三叠 · 燕子坞水图》获得）方可渡太湖进入燕子坞。',
        targetLocation: {
          regionId: 'yanziwu',
          buildingId: 'yzw_canhe',
          spotId: 'yzw_canhe_west',
          customLabel: '燕子坞 · 参合庄议事正厅 · 临湖九曲演武坪',
        },
      },
      huanshi_murong: {
        id: 'huanshi_murong',
        title: '还施水阁，十合战慕容',
        objective:
          '已击败邓百川打通内院！步入【燕子坞 · 还施水阁 · 还施水阁藏书正楼】当面质问慕容复，并在其手下撑过 10 回合，促成双方收手立约。',
        targetLocation: {
          regionId: 'yanziwu',
          buildingId: 'yzw_huanshi',
          spotId: 'yzw_huanshi_main',
          customLabel: '燕子坞 · 还施水阁 · 还施水阁藏书正楼',
        },
      },
      return_kaifeng_final: {
        id: 'return_kaifeng_final',
        title: '封存军械，北返复圣命',
        objective:
          '已与慕容复双方收手、约定后续再说，并督促苏州府封存太湖私藏兵甲！请北返【开封府 · 开封府衙 · 开封府升堂正殿】向包拯、展昭复命。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_kaifengfu',
          spotId: 'bl_kf_court',
          customLabel: '开封府 · 开封府衙 · 开封府升堂正殿',
        },
      },
    },
    spotActions: [
      {
        id: 'spot_kf2_start',
        label: '领取晋升任务：《参合剑气 · 姑苏对质》',
        badge: 'Lv.3→Lv.4 晋升',
        subtitle: '需开封府 Lv.3 金牌总捕且完成《燕子坞暗影》 · 奉密旨再查姑苏慕容氏',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'inSect', sectId: 'SECT-17', minRank: 3 },
            { type: 'questStatus', questId: 'QST-SECT-17-MURONG-1', status: 'completed' },
            { type: 'questStatus', questId: QUEST_ID, status: 'not_started' },
            { type: 'questStatus', questId: QUEST_ID, status: 'not_completed' },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_01_GOLD_PROMOTION_START }],
      },
      {
        id: 'spot_kf2_kaifeng_market',
        label: '茶棚听风声 · 旧书肆翻检燕史',
        badge: '第6-8幕',
        subtitle: '探听苏杭丝商关于太湖封湖的传闻，考证鲜卑慕容氏兴复执念',
        tone: 'primary',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'kaifeng_market_rumor',
        },
        effects: [{ type: 'openScene', scene: SCENE_06_JIANGNAN_MERCHANT_RUMOR }],
      },
      {
        id: 'spot_kf2_kaifeng_liushan',
        label: '演武坪问剑展昭 · 核验江南延州密报',
        badge: '第9-13幕',
        subtitle: '向展昭请教克制“斗转星移”之法，拆阅太湖飞鸽与西夏良马暗账，淬砺佩剑',
        tone: 'primary',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_liushan',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'kaifeng_liushan_prep',
        },
        effects: [{ type: 'openScene', scene: SCENE_09_ZHAOZHAO_SPAR_TIP }],
      },
      {
        id: 'spot_kf2_kaifeng_fanlou',
        label: '樊楼飞檐夜巡 · 追擒契丹密使',
        badge: '第14-16幕',
        subtitle: '于夜市识破草原暗探，屋脊擒贼搜出燕字紫檀牌并密审口供',
        tone: 'danger',
        regionId: 'bianliang',
        buildingId: 'bl_fanlou',
        spotId: 'bl_fl_towers',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'kaifeng_fanlou_spy',
        },
        effects: [{ type: 'openScene', scene: SCENE_14_BIANLIANG_NIGHT_WATCH }],
      },
      {
        id: 'spot_kf2_kaifeng_edict',
        label: '呈报北谍口供 · 恭领紫宸密旨南巡',
        badge: '第17-23幕',
        subtitle: '核对架阁库八年旧案，奉包拯鎏金金牌与紫宸密旨正式启程南下姑苏',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'kaifeng_court_edict',
        },
        effects: [{ type: 'openScene', scene: SCENE_17_ARCHIVE_FINAL_CHECK }],
      },
      {
        id: 'spot_kf2_suzhou_huqiu',
        label: '接头陆老艄公 · 夜探试剑石兵甲暗窟',
        badge: '第24-25幕',
        subtitle: '查实虎丘后山石窟内烙有飞燕暗印的冷锻重甲与破甲长矛',
        tone: 'primary',
        regionId: 'suzhou',
        buildingId: 'sz_huqiu',
        spotId: 'sz_hq_stone',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'suzhou_huqiu',
        },
        effects: [{ type: 'openScene', scene: SCENE_24_SUZHOU_BRIEFING }],
      },
      {
        id: 'spot_kf2_suzhou_hanshan',
        label: '夜闯江枫诗轩 · 夺下焚毁前盐铁底账',
        badge: '第26-27幕',
        subtitle: '人赃并获拿下平江转运司蛀虫，获悉公冶乾亲自坐镇封锁太湖水路',
        tone: 'primary',
        regionId: 'suzhou',
        buildingId: 'sz_hanshan',
        spotId: 'sz_hs_poetry',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'suzhou_hanshan',
        },
        effects: [{ type: 'openScene', scene: SCENE_26_HANSHAN_LEDGER }],
      },
      {
        id: 'spot_kf2_taihu_gongye',
        label: '持证亮明金牌 · 烟波画舫死战公冶乾',
        badge: '第28-32幕',
        subtitle: '于太湖渡口画舫正面击败“江南二绝”公冶乾，夺取参合庄内坞令箭',
        tone: 'danger',
        regionId: 'suzhou',
        buildingId: 'sz_taihu',
        spotId: 'sz_th_boat',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'suzhou_taihu_gongye',
        },
        effects: [{ type: 'openScene', scene: SCENE_28_TAIHU_BLOCKADE }],
      },
      {
        id: 'spot_kf2_canhe_deng',
        label: '重临参合演武场 · 再战邓百川',
        badge: '第33-39幕',
        subtitle: '亮出金牌堂堂正正登门，正面击败“神掌震江南”邓百川',
        tone: 'danger',
        regionId: 'yanziwu',
        buildingId: 'yzw_canhe',
        spotId: 'yzw_canhe_west',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'yanziwu_deng',
        },
        effects: [{ type: 'openScene', scene: SCENE_33_RETURN_TO_YANZIWU }],
      },
      {
        id: 'spot_kf2_huanshi_murong',
        label: '步入还施水阁 · 质问并十合战慕容复',
        badge: '第40-49幕',
        subtitle: '当面质问慕容复谋逆之嫌，交手撑过 10 回合，双方收手约定后续再说',
        tone: 'danger',
        regionId: 'yanziwu',
        buildingId: 'yzw_huanshi',
        spotId: 'yzw_huanshi_main',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'huanshi_murong',
        },
        effects: [{ type: 'openScene', scene: SCENE_40_ENTER_HUANSHI }],
      },
      {
        id: 'spot_kf2_return_kaifeng',
        label: '向包拯呈交姑苏对质密卷',
        badge: '第50-52幕',
        subtitle: '完成《参合剑气 · 姑苏对质》，解锁 Lv.4 御前护卫晋升资格',
        tone: 'jade',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'return_kaifeng_final',
        },
        effects: [{ type: 'openScene', scene: SCENE_50_NORTHBOUND_DISPATCH }],
      },
    ],
  },
]
