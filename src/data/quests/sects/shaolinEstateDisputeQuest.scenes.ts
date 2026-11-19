import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q02_QUEST_ID } from './shaolinEstateDisputeQuest'

const SPEAKER_OLD_TENANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '张老伯',
  title: '少室南麓庄田老佃农',
  factionName: '嵩山乡民',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_LIU_HENG: StorySpeakerSpec = {
  kind: 'custom',
  name: '刘横',
  title: '铁山靠 · 登封矿霸',
  factionName: '登封矿帮',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_MINER_THUG: StorySpeakerSpec = {
  kind: 'custom',
  name: '矿帮打手',
  title: '登封黑矿恶徒',
  factionName: '登封矿帮',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildLiuHengBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ02_LIU_HENG',
    name: '刘横',
    title: '铁山靠 · 登封矿霸',
    realm: '三流中品',
    factionName: '登封矿帮',
    sectRank: 0,
    sectRankLabel: '矿帮帮主',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“老子靠一双铁膀子在登封矿坑里撞翻过十几条好汉！小和尚，接我一记铁山靠！”',
    stats: { hp: 640, mp: 300, agi: 29, res: 19 },
    talents: { bone: 60, comprehension: 38, charm: 28 },
    equippedArts: {
      neigong: 'MA-229',
      qinggong: 'MA-218',
      move1: 'MA-186',
      move2: 'MA-209',
      move3: 'MA-204',
    },
    learnedArts: [
      { artId: 'MA-229', level: 4 },
      { artId: 'MA-218', level: 3 },
      { artId: 'MA-186', level: 4 },
      { artId: 'MA-209', level: 4 },
      { artId: 'MA-204', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq02_01: {
    id: 'scene_slq02_01',
    title: '第一幕 · 木桩急报',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('{reignYear}春暖花开，十八铜人木桩廊内沉闷的击桩声此起彼伏。「大金刚僧」慧轮师叔正赤着精壮臂膀演练金刚重拳，忽见一名浑身泥浆的寺佃连滚带爬奔入廊下！'),
      S(SPEAKER_OLD_TENANT, '（扑通跪倒在青石阶前，老泪纵横）“慧轮大师救命啊！登封县那个外号『铁山靠』的矿霸刘横，领着几十号黑矿恶徒用大石堵死了少室南麓庄田的灌溉水渠！收租执事虚石小师父下山讲理，反被他们打折了肋骨抬回寺里！”'),
      S('NPC-0254', '（双眉倒竖，掌劲一收，面前丈许木桩竟震落簌簌木屑）“岂有此理！那条少室南渠乃太祖朝赐予少林常住庄田灌溉之脉，养活山下三百余户佃农！刘横采矿洗砂截断民水，如今竟敢公然殴伤我少林执事！”'),
      N('慧轮目光一转，落在正于廊边练功的你身上，沉声唤你近前。'),
    ],
    onFinishEffects: [openScene('scene_slq02_02', SHAOLIN_Q02_QUEST_ID)],
  },

  scene_slq02_02: {
    id: 'scene_slq02_02',
    title: '第二幕 · 师叔征召',
    subtitle: '十八铜人木桩廊',
    mandatory: true,
    beats: [
      S('NPC-0254', '“听闻玄痛师叔前些日子夸你临阵沉稳、晓畅佛门大义。今日庄田水案事关三百户春耕生计，老衲欲带你同往少室南麓走这一遭，你可敢应承？”'),
      P('（合十躬身，目光坚定）“护持常住、济助乡民本是少林弟子分内之事！弟子愿随慧轮师叔下山止争！”'),
      S('NPC-0254', '“好！不过佛门行事讲究先礼后兵、师出有名。虚石师侄方才已被抬到【大雄宝殿方丈院 · 东厢碑廊】敷药养伤，你且先去探望于他，问清刘横一伙的布置并取来庄田地契抄本与水渠旧图，再回此处随我动身！”'),
    ],
    choices: [
      {
        id: 'slq02_accept_order',
        label: '合十领命，前往东厢碑廊探望执事虚石',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q02_QUEST_ID, stepId: 'visit_xushi' },
          setStep(SHAOLIN_Q02_QUEST_ID, 'visit_xushi'),
          toast('已领受《少室庄田 · 拳棍止争》！请前往【大雄宝殿方丈院 · 东厢碑廊】探望虚石。', 'talk', '拳棍止争'),
        ],
      },
    ],
  },

  scene_slq02_03: {
    id: 'scene_slq02_03',
    title: '第三幕 · 碑廊探伤',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('东厢碑廊静谧清幽，药香浮动。收租执事虚石正靠坐于青石长凳上，胸前缠着渗血的白布，见你前来，强撑着合十还礼。'),
      S('NPC-0782', '（轻咳两声，面色苍白）“阿弥陀佛，劳烦{gender:师弟|师妹}挂念。那刘横端的是个滚刀肉——他明知强占寺田水渠理亏，便使了条阴毒法子。”'),
      P('“虚石师兄莫急，慢慢说。他究竟使了什么手段？”'),
      S('NPC-0782', '“他把二十来个手持铁镐的矿帮打手脱了矿衣，混在前来抢水的佃农人群里！我昨夜本想仗着拳脚冲上水闸拆坝，却怕拳脚无眼误伤了夹在中间的庄稼人，束手束脚间才被刘横贴身一记『铁山靠』撞断了两根肋骨……”'),
    ],
    onFinishEffects: [openScene('scene_slq02_04', SHAOLIN_Q02_QUEST_ID)],
  },

  scene_slq02_04: {
    id: 'scene_slq02_04',
    title: '第四幕 · 契图相托',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('虚石自怀中摸出一卷盖着登封县朱红官印的油纸卷轴，郑重交入你手中。'),
      S('NPC-0782', '“这是少室南麓庄田地契抄本与水利分渠旧图。刘横横练筋骨硬得像块生铁，寻常拳脚打在他肩背上反震得手麻；且他最擅借人群掩护。你们下山时，切记护住无辜乡民！”'),
      P('（郑重收好契图，向虚石合十宽慰）“师兄安心静养！这笔账，弟子随慧轮师叔下山定替你和山下三百户乡亲讨回公道！”'),
    ],
    choices: [
      {
        id: 'slq02_back_to_huilun',
        label: '收妥地契水图，返回十八铜人木桩廊会合慧轮师叔',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q02_QUEST_ID, 'estate_showdown'),
          toast('已取得地契抄本与水渠旧图！请返回【十八铜人木桩廊】会合慧轮师叔下山！', 'talk', '拳棍止争'),
        ],
      },
    ],
  },

  scene_slq02_05: {
    id: 'scene_slq02_05',
    title: '第五幕 · 整装下山',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('你返回十八铜人木桩廊，将虚石所述矿徒混杂人群之狡计与官印契图一并禀明。慧轮展开水图细看片刻，抚掌大笑。'),
      S('NPC-0254', '“好一个老奸巨猾的刘横！既敢把矿徒掺进佃农里拿百姓作挡箭牌，老衲偏要教他见识见识什么叫少林拳棍分明！走，趁午时水闸未彻底筑死，随我速下少室南麓！”'),
      N('师徒二人施展步法沿少室山南坡古道疾行，不到半个时辰，远远便听见山脚水渠畔传来震天的喧哗与哭骂声。'),
    ],
    onFinishEffects: [openScene('scene_slq02_06', SHAOLIN_Q02_QUEST_ID)],
  },

  scene_slq02_06: {
    id: 'scene_slq02_06',
    title: '第六幕 · 水渠剑拔',
    subtitle: '少室南麓 · 少林常住庄田水闸',
    illustrationUrl: '/assets/quests/sl_02_estate_clash.jpg',
    illustrationCaption: '少室南麓 · 登封矿霸刘横强占庄田水渠，佃农与矿徒剑拔弩张',
    mandatory: true,
    beats: [
      N('少室南麓千亩春田已显龟裂，清澈渠水被一道临时堆砌的乱石闸坝死死截往西侧矿场洗砂池。闸口前，上百名手握木锄的佃农与混迹其中的数十名彪悍矿徒推搡对峙，险些酿成流血械斗！'),
      S(SPEAKER_LIU_HENG, '（赤膊扛着一根生铁撬棍，踩在闸口巨石上狂笑）“哟呵，少林寺这回换了个大个子和尚和一个嫩雏儿来？怎么，昨天那个虚石还没摔够？老子话撂这儿——这渠水我矿场要用三个月，谁敢拆坝，连你们和尚带泥腿子一块儿躺着回去！”'),
      S(SPEAKER_MINER_THUG, '（混在佃农堆里故意推倒一名老妇，阴笑叫嚣）“大伙儿瞧见没，少林和尚要拿棒子打老百姓喽！”'),
      S(SPEAKER_OLD_TENANT, '（急得直跺脚）“大师莫中计！他们把矿徒掺在乡亲里头，一乱起来老幼妇孺都要遭殃啊！”'),
    ],
    onFinishEffects: [openScene('scene_slq02_07', SHAOLIN_Q02_QUEST_ID)],
  },

  scene_slq02_07: {
    id: 'scene_slq02_07',
    title: '第七幕 · 临阵择艺',
    subtitle: '少室南麓水闸前（拳棍分流）',
    mandatory: true,
    beats: [
      S('NPC-0254', '（目光冷电般扫过乱局，压低嗓音向你迅速决断）“我来稳住外围防止矿徒放火伤人，擒贼擒王之责交予你！眼下破局唯有二策——”'),
      S('NPC-0254', '“其一，卸下兵刃赤手穿入人群，以我少林《伏虎拳》沉肩贴靠之法拨开佃农、直扑闸口擒王，绝不误伤半个乡亲；其二，提我这杆白蜡齐眉棍抢占水渠窄石桥，以《少林齐眉棍》横扫封路，将矿徒与佃农硬生生隔开，再逼刘横现身决胜！你选哪一策？”'),
    ],
    choices: [
      {
        id: 'slq02_choose_fist',
        label: '赤手入人群免伤无辜 —— 临阵领悟《伏虎拳》贴身擒王！',
        subLabel: '习得上品拳掌《伏虎拳》(MA-143)，走近身擒王线',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q02_choice', value: 'fist' },
          { type: 'teachMartialArt', artId: 'MA-143' },
          toast('慧轮师叔临阵点拨！已习得少林上品拳法《伏虎拳》！', 'success', '临阵授艺'),
          openScene('scene_slq02_08', SHAOLIN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'slq02_choose_staff',
        label: '持白蜡棍封锁窄桥 —— 临阵领悟《少林齐眉棍》横扫止争！',
        subLabel: '习得上品棍法《少林齐眉棍》(MA-153)，走封桥破阵线',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q02_choice', value: 'staff' },
          { type: 'teachMartialArt', artId: 'MA-153' },
          toast('慧轮师叔临阵递棍授诀！已习得少林上品棍法《少林齐眉棍》！', 'success', '临阵授艺'),
          openScene('scene_slq02_09', SHAOLIN_Q02_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq02_08: {
    id: 'scene_slq02_08',
    title: '第八幕 · 伏虎穿林',
    subtitle: '少室南麓水闸人群中（伏虎拳线）',
    mandatory: true,
    beats: [
      P('“弟子愿赤手入阵！兵刃无眼，唯有空手擒拿方能护住夹在中间的老幼乡亲！”'),
      N('慧轮颔首喝彩，疾声为你念出《伏虎拳》「猛虎出林、伏地按首」八字心诀。你深吸一口气，身形如游鱼滑入喧闹人群！'),
      N('但见你肩肘轻柔一送，便将几名受惊佃农稳稳护在身后；待两名假扮庄稼汉的矿徒暗抽铁镐偷袭你后心时，你反身一记「黑虎伏地」，沉劲震麻其腕骨，两柄铁镐叮当坠泥，竟未波及身旁乡民分毫！'),
      N('转瞬之间，你已撕开人群直抵乱石闸口，双拳微沉，直指巨石上的刘横！'),
    ],
    onFinishEffects: [openScene('scene_slq02_10', SHAOLIN_Q02_QUEST_ID)],
  },

  scene_slq02_09: {
    id: 'scene_slq02_09',
    title: '第九幕 · 齐眉封桥',
    subtitle: '少室南麓水渠窄桥（齐眉棍线）',
    mandatory: true,
    beats: [
      P('“请师叔赐棍！窄桥乃矿徒增援必经咽喉，弟子以齐眉棍横扫封桥，隔绝恶徒与乡亲！”'),
      N('慧轮将手中沉甸甸的白蜡齐眉棍凌空抛来，同时喝出「扫草寻蛇、拨云见日」棍诀。你凌空接棍，足尖点地跃上渠畔青石窄桥！'),
      N('白蜡长棍在你手中化作一片密不透风的雪白棍影，只听“噼啪”连响，五六名企图冲桥包抄佃农的矿帮恶徒手中矿镐尽数被棍梢点飞，人仰马翻滚落浅渠泥潭，桥头老幼却无一人受惊踩踏！'),
      N('棍梢一收，遥指闸口巨石上的矿霸刘横！'),
    ],
    onFinishEffects: [openScene('scene_slq02_10', SHAOLIN_Q02_QUEST_ID)],
  },

  scene_slq02_10: {
    id: 'scene_slq02_10',
    title: '第十幕 · 铁山压顶',
    subtitle: '少室南麓水闸前（三流中品 1v1 实战）',
    mandatory: true,
    beats: [
      S(SPEAKER_LIU_HENG, '（见手下矿徒瞬息间被你瓦解，暴怒之下丢开生铁撬棍，浑身肌肉虬结如老树盘根，双脚跺得青石乱颤）“好个扎手的少林小辈！难怪慧轮老和尚敢放你独自上前！今日就让你尝尝老子在登封矿山练就的『铁山靠』！”'),
      N('刘横如一头发狂黑熊般沉肩撞来，劲风扑面生疼！你心神凝定，运起刚悟得的少林正宗拳棍绝艺，正面迎战登封矿霸！'),
    ],
    choices: [
      {
        id: 'slq02_fight_liuheng',
        label: '正面迎战登封矿霸【刘横】！（三流中品 1v1 实战）',
        subLabel: '破其横练铁山靠，生擒矿霸以止水争',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLiuHengBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '山下三百户佃农皆在身后翘首以盼，绝不可退！',
            introText: '【1v1 拳棍止争】迎战三流中品登封矿霸【铁山靠 · 刘横】！',
            onWin: [openScene('scene_slq02_11', SHAOLIN_Q02_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('刘横横练铁山靠势大力沉，暂退半步借慧轮师叔掩护调息再战！', 'warn', '拳棍止争'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq02_11: {
    id: 'scene_slq02_11',
    title: '第十一幕 · 拳棍生擒',
    subtitle: '少室南麓水闸青石',
    illustrationUrl: '/assets/quests/sl_02_fist_staff_win.jpg',
    illustrationCaption: '拳棍止争 · 伏虎拳近身擒王或齐眉棍横扫窄桥生擒刘横',
    mandatory: true,
    beats: [
      N('十余合激斗下来，刘横虽凭横练硬功屡屡猛撞，却始终摸不到你的衣角，反被你以少林正宗巧劲频频击中肘弯、膝窝等外门破绽！'),
      N('待他气息微浮、肩头露出一线空门，你顺势沉身切入，一记刚柔并济的绝招震散他护体硬气，反剪其双臂将其稳稳按倒在湿滑的闸口青石上！'),
      S(SPEAKER_LIU_HENG, '（双臂酸麻动弹不得，满脸骇然喘息）“饶……饶命！小师父神功盖世，刘横服了！再不敢动少林常住庄田一滴水！”'),
      N('闸畔群情激奋，三百余名佃农顿时爆发出震天欢呼，残余矿徒见帮主瞬息落败，纷纷丢下铁镐抱头鼠窜！'),
    ],
    onFinishEffects: [openScene('scene_slq02_12', SHAOLIN_Q02_QUEST_ID)],
  },

  scene_slq02_12: {
    id: 'scene_slq02_12',
    title: '第十二幕 · 官契明理',
    subtitle: '少室南麓水闸',
    mandatory: true,
    beats: [
      N('慧轮大步走上水闸，自你手中接过盖有登封县朱印的庄田地契抄本与水利旧图，朗声向围拢的乡亲与投降矿徒宣示。'),
      S('NPC-0254', '“阿弥陀佛！少室南渠历朝有约：春耕农忙之时，渠水七分归农田、三分供山麓商旅矿坊。我少林慈悲为怀，从不绝人活路，但也绝不容恶霸持强截水、殴伤僧众！”'),
      P('（顺势押起刘横，向围观矿工朗声道）“今日只拿首恶刘横与几名殴伤虚石师兄的凶徒送交登封县衙按宋律发落！其余受胁迫做工的矿夫，只要即刻帮忙搬开拦水乱石、疏通农渠，本寺既往不咎！”'),
      N('几名寻常矿夫闻言大喜，齐齐合十叩谢，纷纷跳入浅渠帮着佃农撬开拦水石坝。'),
    ],
    onFinishEffects: [openScene('scene_slq02_13', SHAOLIN_Q02_QUEST_ID)],
  },

  scene_slq02_13: {
    id: 'scene_slq02_13',
    title: '第十三幕 · 清渠润田',
    subtitle: '少室南麓庄田渡口',
    mandatory: true,
    beats: [
      N('“轰隆隆——”随着最后几块巨石被撬开，积蓄多日的清冽山泉奔涌而出，顺着干涸的沟渠哗哗流进千亩麦苗与春耕水田，泥土清香随春风弥漫四野。'),
      S(SPEAKER_OLD_TENANT, '（捧着一捧新流进田埂的清水，热泪盈眶向你与慧轮连连作揖）“活命水来了！多谢慧轮大师，多谢这位少林小师父！若非你们今日拳棍止争、没伤着半个乡亲，大伙儿今年秋粮可就全指望不上喽！”'),
      N('登封县捕快闻讯赶至，验过官印地契与伤状后，恭敬将五花大绑的刘横押解回县大牢。乡邻们凑了些土产与谢礼，慧轮按寺规仅收下县衙转交的修渠公费，余者尽数辞谢归还乡亲。'),
    ],
    onFinishEffects: [openScene('scene_slq02_14', SHAOLIN_Q02_QUEST_ID)],
  },

  scene_slq02_14: {
    id: 'scene_slq02_14',
    title: '第十四幕 · 暮归木桩',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('夕阳西沉，将嵩山群峰染作一片金红。你随慧轮重返十八铜人木桩廊，顺道去东厢碑廊告知虚石捷报，虚石听闻渠水重通、恶霸伏法，眉间郁结顿散。'),
      S('NPC-0254', '（负手立于木桩廊前，神色欣慰）“今日一役，最难得之处并非生擒刘横，而是你在乱局之中既懂得保全百姓、又懂得借宋律官契分化胁从。少林武学以武止戈，今日你已初窥堂奥。”'),
      P('“全赖慧轮师叔临阵指点拳棍真诀，弟子方能不负重托。”'),
    ],
    onFinishEffects: [openScene('scene_slq02_15', SHAOLIN_Q02_QUEST_ID)],
  },

  scene_slq02_15: {
    id: 'scene_slq02_15',
    title: '第十五幕 · 止争嘉奖',
    subtitle: '十八铜人木桩廊',
    mandatory: true,
    beats: [
      S('NPC-0254', '“今日所授绝艺，日后好生勤修莫负其名。寺库已拨下此番护庄酬劳与师门贡献，权作嘉勉。待你再磨砺些时日，山门内外尚有更深沉的风雨等着你去历练。”'),
      N('木桩廊外晚钟悠扬，你合十谢过慧轮师叔，只觉经此一役，胸中禅意与脚下根基皆较往日沉厚了一分。'),
    ],
    choices: [
      {
        id: 'slq02_finish_reward',
        label: '合十谢恩，收下护庄嘉奖（完成《少室庄田 · 拳棍止争》）',
        tone: 'gold',
        effects: [
          { type: 'addSectContribution', amount: 50 },
          { type: 'giveCombatExp', amount: 120, reason: '少室南麓庄田生擒登封矿霸刘横' },
          { type: 'giveSilver', amount: 40, reason: '少林寺库护庄止争酬劳' },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0254' }, delta: 10 },
          { type: 'completeQuest', questId: SHAOLIN_Q02_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《少室庄田 · 拳棍止争》！获门派贡献、实战历练与寺库酬银，慧轮师叔对你大加赞赏！',
            'success',
            '拳棍止争',
          ),
        ],
      },
    ],
  },
}
