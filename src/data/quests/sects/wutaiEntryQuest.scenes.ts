import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, warn, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { WUTAI_ENTRY_QUEST_ID } from './wutaiEntryQuest'

const EXTRA_SCENES: Record<string, StorySceneDef> = {}
function regScene(sc: StorySceneDef): string {
  EXTRA_SCENES[sc.id] = sc
  return sc.id
}

const SPEAKER_XIAO_SHISUO: StorySpeakerSpec = {
  kind: 'custom',
  name: '小石锁',
  title: '雁门神武村 · 铁匠七岁遗孤',
  factionName: '边关遗孤',
  portraitUrl: '/assets/characters/templates/tpl_child_boy_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_child_boy_av.jpg',
}

const SPEAKER_SHI_BAILIAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '石百炼',
  title: '河东神武军 · 随营老铁匠',
  factionName: '大宋百工',
  portraitUrl: '/assets/characters/templates/tpl_zhenyuan_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_zhenyuan_male_av.jpg',
}

const SPEAKER_KHITAN_SCOUT: StorySpeakerSpec = {
  kind: 'custom',
  name: '耶律铁爪',
  title: '大辽北院 · 搜山狼骑探哨',
  factionName: '辽国暗桩',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
}

const SPEAKER_YELU_LIE: StorySpeakerSpec = {
  kind: 'custom',
  name: '耶律烈',
  title: '大辽枢密院 · 精锐斥候百夫长',
  factionName: '辽国暗桩',
  portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
}

function buildWoodenStaffTrialMonkNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_WT_TRIAL_MINGGUANG',
    name: '明广（敛气试招）',
    title: '五台山清凉寺 · 演武陪练僧',
    realm: '不入流',
    factionId: 'SECT-03',
    factionName: '五台山清凉寺',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_wutai_monk_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_wutai_monk_male_fb.jpg',
    stats: { hp: 76, mp: 40, agi: 5, res: 1 },
    talents: { bone: 45, comprehension: 38, charm: 55 },
    equippedArts: { neigong: 'MA-180', qinggong: 'MA-177', move1: 'MA-192' },
    learnedArts: [{ artId: 'MA-180', level: 1 }, { artId: 'MA-177', level: 1 }, { artId: 'MA-192', level: 1 }],
    equipped: { weapon: 'WPN-068', armor: 'ARM-046', shoes: 'BOT-019', bow: 'BOW-020', accessory1: 'ACC-049', accessory2: 'ACC-035', mount: 'MNT-023' },
    talk: '“小施主莫慌，贫僧已尽数敛去内息，只使三分木杆力道——且看你如何立身守门户！”',
  })
}

function buildKhitanCaveScoutNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_WT_KHITAN_CAVE_SCOUT',
    name: '耶律铁爪（狭口受制）',
    title: '辽国暗桩 · 搜山探哨',
    realm: '不入流',
    factionId: 'SECT-31',
    factionName: '辽国暗桩',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    stats: { hp: 88, mp: 45, agi: 6, res: 1 },
    talents: { bone: 46, comprehension: 32, charm: 24 },
    equippedArts: { neigong: 'MA-232', qinggong: 'MA-218', move1: 'MA-201' },
    learnedArts: [{ artId: 'MA-232', level: 1 }, { artId: 'MA-218', level: 1 }, { artId: 'MA-201', level: 1 }],
    equipped: { weapon: 'WPN-083', armor: 'ARM-045', shoes: 'BOT-022', bow: 'BOW-023', accessory1: 'ACC-045', accessory2: 'ACC-043', mount: 'MNT-021' },
    talk: '“好个不知死活的宋人毛头小子！这窄石缝挥不开长弯刀，老子照样一拳砸碎你的胸骨！”',
  })
}

function buildYeluLieBossNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_WT_YELU_LIE',
    name: '耶律烈',
    title: '大辽北院 · 精锐斥候百夫长',
    realm: '二流下品',
    factionId: 'SECT-31',
    factionName: '辽国暗桩',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    stats: { hp: 620, mp: 320, agi: 24, res: 14 },
    talents: { bone: 62, comprehension: 48, charm: 36 },
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-246', move1: 'MA-152', move2: 'MA-151' },
    learnedArts: [{ artId: 'MA-243', level: 4 }, { artId: 'MA-246', level: 4 }, { artId: 'MA-152', level: 5 }, { artId: 'MA-151', level: 4 }],
    equipped: { weapon: 'WPN-047', armor: 'ARM-025', shoes: 'BOT-012', bow: 'BOW-012', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-013' },
    talk: '“五台山的秃驴竟敢坏我北院大事！结狼牙阵，踏平这座石窟！”',
  })
}

function buildScene20OrdinationFinale(
  dharmaName: '明觉' | '明岳' | '明悲',
  dharmaVerse: string,
): StorySceneDef {
  return {
    id: `scene_wt_20_ordination_finale_${dharmaName}`,
    title: '第二十幕 · 梵钟万里镇河东',
    subtitle: `五台山清凉寺 · 新受戒僧【${dharmaName}】`,
    mandatory: true,
    beats: [
      N(`三千烦恼丝尽落青砖，炉中沉水檀烟袅袅升腾。首座医僧智光走上前来，亲手为你披上一袭浆洗得素净挺括的《行脚僧灰布袍》与《僧侣芒鞋》；知客首座智猛双手托起一根浸油烘烤的《少林白蜡齐眉棍》，郑重交入你掌心。`),
      S('NPC-0123', `（道清方丈温厚宽大的手掌按在你百会穴上，一缕清凉醇正、渊深如海的禅门真气徐徐渡入你干涸的四肢百骸）“${dharmaName}，切记今日誓言——『${dharmaVerse}』。老衲先传你本门筑基心印《清凉禅定吐纳法》，以五台冰雪清气涤荡经脉，自今日起，你便不再是手无寸铁的凡胎俗骨了。”`),
      S('NPC-0199', `（智猛首座声若洪钟，将一卷墨迹苍劲的棍谱塞进你僧袍怀中）“还有这卷昔年杨五郎师祖截去枪头所创的《五郎八卦棍》！八卦步走乾坤，齐眉棍挡铁骑——好好练！来日雁门关外若再起烽烟，师伯与你并肩横杖！”`),
      N(`步出大雄主殿门槛时，五台山连绵五峰的千年积雪正映着初升朝阳，化作一片澄澈壮丽的琉璃金海。十九岁的小沙弥善松牵着已能开口欢笑的小石锁站在钟楼下，向你欢喜合十，脆生生地唤了一声：“${dharmaName}师兄！”`),
      P(`（你轻抚微凉的光洁头顶，右手稳稳拄定齐眉木棍，迎着北疆万里长风深深合十）“昔为风雪迷途客，今作清凉护国僧。阿弥陀佛——这一根齐眉棍，定不负五台晨钟，不负河东苍生！”`),
    ],
    onFinishEffects: [
      {
        type: 'branch',
        condition: {
          type: 'all',
          conditions: [
            { type: 'inSect', sectId: 'SECT-22' },
            { type: 'hasItem', itemId: 'ITM-MSC-013' },
          ],
        },
        thenEffects: [{ type: 'removeItem', itemId: 'ITM-MSC-013', qty: 1 }],
      },
      {
        type: 'joinSect',
        sectId: 'SECT-03',
        rank: 1,
        allowOfficialTransfer: true,
      },
      {
        type: 'ordainShaolinMonk',
        dharmaName,
        portraitId: 'hero_02_shaolin',
        sectId: 'SECT-03',
      },
      { type: 'teachMartialArt', artId: 'MA-224', level: 1, exp: 3500, autoEquip: true },
      { type: 'teachMartialArt', artId: 'MA-134', level: 1, exp: 2500, autoEquip: true },
      // 根据石台三才资质试炼与沿途善缘追加专属顿悟熟练度
      {
        type: 'branch',
        condition: flag('wutai_talent_path', 'eq', 'bone'),
        thenEffects: [{ type: 'addArtExp', artId: 'MA-134', amount: 3000 }],
      },
      {
        type: 'branch',
        condition: flag('wutai_talent_path', 'eq', 'wisdom'),
        thenEffects: [{ type: 'addArtExp', artId: 'MA-224', amount: 4000 }],
      },
      {
        type: 'branch',
        condition: flag('wutai_talent_path', 'eq', 'grit'),
        thenEffects: [
          { type: 'addArtExp', artId: 'MA-224', amount: 2000 },
          { type: 'addArtExp', artId: 'MA-134', amount: 2000 },
        ],
      },
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      { type: 'modifySkill', key: '经义', delta: 5 },
      { type: 'modifyChivalry', delta: 22, reason: '雁门关绝壁护孤、五台山剃度护国' },
      { type: 'modifyRenown', delta: 20, reason: '礼拜五台神僧道清落发受戒，赐明字辈法号' },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0123' }, delta: 25 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0162' }, delta: 20 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0199' }, delta: 20 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0163' }, delta: 20 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0941' }, delta: 20 },
      {
        type: 'completeQuest',
        questId: WUTAI_ENTRY_QUEST_ID,
        outcome: `ordained_${dharmaName}`,
        combatExp: 90,
      },
      toast(`礼成圆具！已剃度拜入【五台山清凉寺】，赐法号【${dharmaName}】，获授《清凉禅定吐纳法》《五郎八卦棍》及全套僧侣披挂！`, 'success', '清凉受戒'),
    ],
  }
}

const SCENE_WT_19_TONSURE_CEREMONY: StorySceneDef = {
  id: 'scene_wt_19_tonsure_ceremony',
  title: '第十九幕 · 金刀落发断尘缘',
  subtitle: '清凉寺大雄主殿 · 佛前剃度大典',
  illustrationUrl: '/assets/quests/wutai_tonsure_ordination.jpg',
  illustrationCaption: '五台山清凉寺大雄主殿 · 道清方丈执刀剃度赐法号',
  mandatory: true,
  beats: [
    N('钟鼓禅院传来三声悠远庄严的鲸音晨钟，满殿二十四盏青铜酥油灯齐绽光明，映得释迦牟尼与大智文殊师利菩萨金身宝相生辉。你褪去沾满塞北血迹与风霜的旧布衫，换上一袭洁白素麻净衣，双掌合十，端端正正长跪于大殿莲花蒲团之上。'),
    N('道清方丈缓步走下法座，左手端起盛满五台山万年冰雪融水的净钵以杨枝洒净，右手执起一柄薄如秋水、寒光澄澈的纯银戒刀。两厢首座高僧低眉诵起《文殊师利发愿经》，梵呗之声如松涛涤尘。'),
    S('NPC-0123', '“善男子，今朝金刀三落——一落斩断红尘妄念，二落誓修止戈正法，三落愿护大千苍生！本寺法脉按『道、智、法、明、善』五字相承，你虽初入山门，然于雁门绝壁已证菩萨无畏心，老衲今日破格录你入护法【明】字辈僧籍！”'),
    N('银光微闪，冰凉戒刀贴着头皮轻轻掠过，一缕缕乌黑青丝无声飘落青石方砖。道清方丈温暖厚重的手掌抚在你头顶摩顶授记，垂目温言道：“文殊道场，法由心生——【明觉】【明岳】【明悲】三号，汝愿奉何字为终身行持？”'),
  ],
  choices: [
    {
      id: 'wt19_dharma_mingjue',
      label: '【稽首领受 · 法号「明觉」】愿以文殊慧剑，觉照世间迷津！',
      subLabel: '正式落发更名为「明觉」，切换佛门武僧立绘，获授《清凉禅定吐纳法》与《五郎八卦棍》',
      tone: 'gold',
      effects: [
        openScene(regScene(buildScene20OrdinationFinale('明觉', '孤云出岫心常定，慧剑横空觉众生')), 'QST-SECT-03-ENTRY'),
      ],
    },
    {
      id: 'wt19_dharma_mingyue',
      label: '【稽首领受 · 法号「明岳」】愿化北岳磐石，永镇雁门雄关！',
      subLabel: '正式落发更名为「明岳」，切换佛门武僧立绘，获授《清凉禅定吐纳法》与《五郎八卦棍》',
      tone: 'gold',
      effects: [
        openScene(regScene(buildScene20OrdinationFinale('明岳', '身似五台千丈岳，杖横绝塞万重关')), 'QST-SECT-03-ENTRY'),
      ],
    },
    {
      id: 'wt19_dharma_mingbei',
      label: '【稽首领受 · 法号「明悲」】愿怀同体大悲，护佑乱世孤雏！',
      subLabel: '正式落发更名为「明悲」，切换佛门武僧立绘，获授《清凉禅定吐纳法》与《五郎八卦棍》',
      tone: 'jade',
      effects: [
        openScene(regScene(buildScene20OrdinationFinale('明悲', '不求金身登彼岸，唯留悲愿护黎元')), 'QST-SECT-03-ENTRY'),
      ],
    },
  ],
}

const SCENE_WT_18_ABBOT_THREE_QUESTIONS: StorySceneDef = {
  id: 'scene_wt_18_abbot_three_questions',
  title: '第十八幕 · 神僧三问定禅心',
  subtitle: '清凉寺大雄主殿 · 佛前问心',
  mandatory: true,
  beats: [
    N('大殿之内鸦雀无声，唯有檐外风铃随残雪轻响。道清方丈缓缓睁开那双历经六十载沧桑却清澈如婴孩的眼眸，目光落在你满是冻疮与擦伤的双手之上。'),
    S('NPC-0123', '“众僧保举，证的是你过往之善缘；然欲受我清凉寺具足大戒，须过老衲殿前三问。第一问——我佛首戒杀生，连蝼蚁尚且惜命；然雁门关外契丹恶骑弯刀悬于妇孺颈上，汝手中齐眉棍，当击不当击？”'),
    P('“回方丈！纵容豺狼食人而高谈不杀，那是自私惜羽，绝非慈悲！晚辈手中木棍无刃，不为嗜杀夺命而挥，只为击落凶徒屠刀、护住身后无辜性命——若非要有一人担下破戒因果，晚辈愿入无间，换边关妇孺活命！”'),
    S('NPC-0123', '（道清方丈白眉微轩，眸中闪过一抹赞许华光）“好一句『木棍无刃，只击屠刀』！再听第二问与第三问——你初登山门时身无半分内力，如今亲历石台苦寒与塞外生死，可知习武究竟所为何事？一朝落发披缁，五台苦寒再无红尘富贵，汝可当真不悔？”'),
  ],
  choices: [
    {
      id: 'wt18_vow_guardian',
      label: '【叩首立誓】“习武只为弱者不再失语；纵伴五台残雪终身，弟子死生不悔！”',
      tone: 'gold',
      effects: [openScene('scene_wt_19_tonsure_ceremony', 'QST-SECT-03-ENTRY')],
    },
    {
      id: 'wt18_vow_zen',
      label: '【合十澄心】“根器巧拙皆归本心，愿借清凉一杖涤尽边尘，无怨无悔！”',
      tone: 'primary',
      effects: [openScene('scene_wt_19_tonsure_ceremony', 'QST-SECT-03-ENTRY')],
    },
  ],
}

const SCENE_WT_17_MAIN_HALL_DEBATE: StorySceneDef = {
  id: 'scene_wt_17_main_hall_debate',
  title: '第十七幕 · 宝殿檀烟众僧议',
  subtitle: '清凉寺大雄主殿 · 善果同证',
  mandatory: true,
  beats: [
    N('重返五台山清凉寺大雄主殿，殿内紫檀香烟如云缭绕。六十三岁的五台神僧【道清方丈】盘膝端坐于佛前蒲团之上，身侧斜倚着那柄重达百斤、震慑塞北三十年的大威德古铜降魔杵；两厢首座高僧与执事武僧肃然而立。'),
    S('NPC-0304', '（当你呈上法严尊者的伏魔铁菩提印信后，伏魔堂执事【法辱】眉头紧锁，踏前一步合十朗声道）“启禀方丈！此子虽在雁门关有些微劳，但入山未满旬月，更未经本寺三年洒扫苦役之考。若贸然破例为其剃度授法，恐坏了清凉寺百年清规！”'),
    S('NPC-0162', '（首座医僧【智光】温和拂袖出列，白须微动）“法辱师侄此言差矣。此子初入慈济院时毫无内功，却在药庐烟熏火燎中亲口为孤儿试汤，手背烫起水泡而眉头不皱——这般视孤苦如至亲的菩萨心肠，岂是死守三年年头所能熬出来的？”'),
    S('NPC-0504', '（话音方落，殿角向来沉默如石、十年难得开口的苦行僧【明安】竟缓缓站起身，高举腕间那串重穿妥帖的十八子菩提念珠）“松风亭外冰涧刺骨，此子为贫僧寻回断线旧珠，十指见血而不居功；演棍台上，他更曾冒风雪受试不退。法辱师兄，贫僧愿以二十年苦行戒腊，保他入寺！”'),
    S(SPEAKER_XIAO_SHISUO, '（就在此时，殿门外传来一阵急促的小小脚步声——刚随太原药车回山的善松牵着七岁的【小石锁】跑到门槛外。自屠村后一直惊惧失语的孩子扑通跪在门槛边，用沙哑却拼尽全力的稚嫩童音哭喊道）“老神仙爷爷……别赶大哥哥走！在黑山洞里，是大哥哥拿木头棍子挡着狼兵，救了我和爷爷的命！”'),
    N('童音清脆，在空旷庄严的大雄主殿梁柱间久久回荡。满殿戒刀武僧尽皆动容，执事法辱怔立半晌，终是深深低下头去，向你郑重合十退回班列：“阿弥陀佛……因果昭昭，善缘齐聚，是贫僧着相了！”'),
  ],
  choices: [
    {
      id: 'wt17_step_forward_abbot',
      label: '【趋步上前】于佛前蒲团恭敬拜见道清方丈',
      tone: 'gold',
      effects: [openScene('scene_wt_18_abbot_three_questions', 'QST-SECT-03-ENTRY')],
    },
  ],
}

const SCENE_WT_16_YANMEN_SUNSET: StorySceneDef = {
  id: 'scene_wt_16_yanmen_sunset',
  title: '第十六幕 · 雄关残照悟止戈',
  subtitle: '雁门雄关城楼 · 望胡台授信',
  mandatory: true,
  beats: [
    N('契丹精锐斥候丢下数具尸体仓皇北逃，重伤的老铁匠石百炼与小石锁由武僧明远及边军军校护送上骡车，稳妥送往后方诊治。待硝烟散尽，法严尊者引着浑身浴雪的你登上【雁门雄关城楼 · 望胡台】。'),
    N('暮色苍茫，残阳如血，将横亘于句注山巅的长城垛口染成一片悲壮的暗金。关外是朔风呼啸、白草折断的塞北荒原，关内则是代州村落袅袅升起的万家暮烟。'),
    S('NPC-0163', '（法严尊者拄着浑铁禅杖，指着关内点点炊烟，沉声叹道）“小施主，世人常疑我五台山僧众为何不似江南古刹那般静坐参禅，偏要终日提着几十斤重的铁杖在风雪关口染血。今日你亲手堵过绝壁石洞，当已明白了——若无我辈替众生挡住关外寒风，这万家灯火与佛前净土，片刻便要化作焦土。”'),
    S('NPC-0163', '（他从怀中取出一枚沉甸甸、烙有莲花降魔印记的【清凉伏魔铁菩提】放入你掌心，虎目之中满是敬重）“你今日身无半缕内功，却比许多练了十年拳脚的武夫更配得上『护法』二字！拿着贫僧这枚信物回五台山【清凉寺大雄主殿】面见方丈师兄——清凉寺的剃度金刀，当为你而开！”'),
  ],
  onFinishEffects: [
    { type: 'healPlayer', hpPct: 100, mpPct: 100 },
    { type: 'giveCombatExp', amount: 35, reason: '雁门关外随伏虎尊者法严击退辽国北院斥候' },
    {
      type: 'setQuestStep',
      questId: WUTAI_ENTRY_QUEST_ID,
      stepId: 'return_wutai_ordination',
      deadlineDays: null,
    },
    toast('已获伏虎尊者法严亲授铁菩提印信！请返回【五台山清凉寺 · 清凉寺大雄主殿】拜见方丈【道清】剃度受戒！', 'success', '雄关止戈'),
  ],
}

const SCENE_WT_15_FAYAN_ARRIVAL: StorySceneDef = {
  id: 'scene_wt_15_fayan_arrival',
  title: '第十五幕 · 伏虎横杖镇胡尘',
  subtitle: '雁门关外乱石绝壁 · 金刚显威',
  mandatory: true,
  beats: [
    N('清越急促的竹哨声穿透漫天风雪！正当契丹百夫长耶律烈狞笑着举起火油火箭欲射入石窟之时，上方十丈高的乱石崖顶骤然炸开一声如春雷滚地般的佛号——“阿弥陀佛！孽障休伤无辜！”'),
    N('但见一道灰袍魁梧身影踏雪飞纵而下，手中六十四斤熟铜禅杖在半空舞出一轮金光巨伞，“铛铛铛”三声巨响震落漫天火星，将射向洞口的火箭尽数扫断！青石迸裂间，五台山护寺武僧总领【伏虎尊者 · 法严】已稳稳落于你身前！'),
    S(SPEAKER_YELU_LIE, '（耶律烈脸色剧变，掣出狼牙重刃厉声喝令）“是清凉寺的法严老秃驴！他只有一人赶到，随我并肩子上，先宰了这多管闲事的和尚！”'),
    S('NPC-0163', '（法严尊者横杖如山，侧首看了看浑身是雪却仍紧握木杆的你，豪迈一笑）“好小子，竟真凭一副凡胎肉身替贫僧守住了石窟！且站稳左翼莫退，仔细看清楚了——这便是五台山清凉寺护国降魔的真功夫！”'),
  ],
  choices: [
    {
      id: 'wt15_fight_with_fayan',
      label: '【横木杖随侍左翼】与伏虎尊者法严并肩迎击契丹百夫长！',
      subLabel: '一流中品高手【法严】全程助战压阵，亲历佛门伏魔杖神威',
      tone: 'gold',
      effects: [
        {
          type: 'startCombat',
          questId: WUTAI_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildYeluLieBossNpc() },
          allies: [{ kind: 'npc', npcId: 'NPC-0163' }],
          rule: 'story_trial',
          lethalOnLose: false,
          forbidEscapeReason: '法严尊者已横杖当先，岂能弃师长与石窟孤老而逃！',
          introText:
            '【雄关伏魔助战】五台山清凉寺护寺武僧总领【伏虎尊者 · 法严】手执熟铜禅杖立于阵前，替毫无内功的你挡下漫天刀风！只管配合尊者杖势从旁策应！',
          onWin: [openScene('scene_wt_16_yanmen_sunset', 'QST-SECT-03-ENTRY')],
          onLose: [openScene('scene_wt_16_yanmen_sunset', 'QST-SECT-03-ENTRY')],
          onDraw: [openScene('scene_wt_16_yanmen_sunset', 'QST-SECT-03-ENTRY')],
        },
      ],
    },
  ],
}

function buildScene14KarmaRescue(heldUnbroken: boolean): StorySceneDef {
  return {
    id: `scene_wt_14_karma_rescue_${heldUnbroken ? 'win' : 'grit'}`,
    title: '第十四幕 · 暗道一线善果偿',
    subtitle: '幽谷石室 · 孤雏启口报恩',
    mandatory: true,
    beats: [
      N(heldUnbroken
          ? '你牢牢记着苦行僧明安在松风亭点拨的“斜杖卸力、不拼锋芒”八字诀，借着狭窄石缝左拨右引，硬生生将那契丹探哨逼得狼狈倒退出洞口！虎口虽被震得鲜血淋漓，手中白蜡木杆却稳如生根！'
          : '那契丹探哨蛮力凶狠，一拳重重砸在你肩头，震得你喉头腥甜跌退半步；可你咬碎钢牙，竟用双肩与横握的白蜡木杆死死卡住窄窄的石窟门缝，任凭风雪刀背砸落，半步也不曾让开！'),
      N('然而危机未解——洞外暴风雪中骤然亮起七八支松脂火把，大辽北院斥候百夫长【耶律烈】已率亲卫合围谷口，见强攻窄洞不下，竟命弓手取出火油箭，欲将你们连人带洞活活熏死在绝壁之下！'),
      S(SPEAKER_XIAO_SHISUO, '（千钧一发之际，身后那只冰凉的小手忽然死死拽住你的衣角！在慈济院里因目睹屠村而整整半月不曾发出一声的七岁孤儿【小石锁】，望着满头血汗护在洞口的你，眼泪夺眶而出，竟嘶哑地喊出了灾后第一句话）“大哥哥……别死！寒玉石榻底下……有爷爷早年凿的排烟窄缝，只够我一个人钻出去！”'),
      S(SPEAKER_SHI_BAILIAN, '（重伤的老铁匠石百炼老泪纵横，颤抖着推开石榻暗砖，将善松临行送的竹哨塞进孙儿手里）“锁儿开口了……苍天有眼！快钻出去顺着鹰嘴涧吹响五台竹哨，引法严大师过来！”'),
      N('小石锁回头深深看了你一眼，怀里还揣着你在慈济院替他修好的那匹樟木小马，毫不犹豫地猫腰钻进了漆黑冰冷的排烟岩缝——昔日在慈济院炉火旁种下的一念慈悲，竟在雁门绝境之中化作了破局一线的救命善果！'),
    ],
    choices: [
      {
        id: 'wt14_hold_until_whistle',
        label: '【深吸一口寒气】再度横起木杖堵住洞口，静待竹哨破空！',
        tone: 'gold',
        effects: [openScene('scene_wt_15_fayan_arrival', 'QST-SECT-03-ENTRY')],
      },
    ],
  }
}

const SCENE_WT_13_CLIFF_STAND: StorySceneDef = {
  id: 'scene_wt_13_cliff_stand',
  title: '第十三幕 · 绝壁风雪护孤雏',
  subtitle: '雁门关外乱石绝壁 · 幽谷石室',
  illustrationUrl: '/assets/quests/wutai_yanmen_pass.jpg',
  illustrationCaption: '雁门关外乱石绝壁 · 少年布衣横木杖死守石窟孤雏',
  mandatory: true,
  beats: [
    N('朔风如刀，鹅毛大雪几乎迷尽双目。你攀着结冰的铁索摸进【雁门关外乱石绝壁 · 幽谷石室】，推开半掩石门，却见微弱炭火旁除了胸口裹满染血麻布的老铁匠【石百炼】外，竟还跪着一个熟悉的瘦小身影——正是慈济院里的七岁孤儿【小石锁】！'),
    S(SPEAKER_SHI_BAILIAN, '（石老汉咳出一口淤血，急声解释道）“小壮士莫怪！清凉寺的小沙弥善松随太原运药骡车送伤药来关城，这娃儿认得老汉留在暗渠上的铁砧暗号，死活钻在药篓里跟来寻我……不好，外头有狼哨声！”'),
    S(SPEAKER_KHITAN_SCOUT, '（石窟外风雪骤紧，一名披着灰狼皮护肩的契丹前锋探哨【耶律铁爪】循着药篓车辙踏雪逼近，弯刀刮在石壁上迸出刺耳火星）“嘿，果真窝在这处老鼠洞里！里头只有一个穿茶肆粗布衫的毛头小子，连半点内家真气都没有——让开，饶你全尸！”'),
    N('你低头一看：自己丹田空空如也，莫说高深内功，连一套像样的拳脚都未学全；身后石洞内，年迈重伤的铁匠连站起的力气都已耗尽，七岁的小石锁正拼命用瘦弱肩膀挡在爷爷身前。石室入口狭窄逼仄，恰容一人横身当关。'),
    P('（你弯腰拾起石门后备着顶门的一根白蜡木齐眉杆，双足重重踏入尺深积雪，横杖当胸）“我确实不会内功，也不是什么武林高手——但只要我还站在这道石缝前一口气在，休想越雷池半步伤他们爷孙！”'),
  ],
  choices: [
    {
      id: 'wt13_defend_cave_mouth',
      label: '【横木杖死守石缝】借狭口地利周旋，死撑三合待变！',
      subLabel: '零内功友好试炼：洞口狭窄敌刃受制，仅需守住 3 回合不退（或用守御架势卸力）即可过关',
      tone: 'gold',
      effects: [
        {
          type: 'startCombat',
          questId: WUTAI_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildKhitanCaveScoutNpc() },
          rule: 'survive_rounds',
          maxRounds: 3,
          lethalOnLose: false,
          forbidEscapeReason: '身后便是重伤老铁匠与七岁孤儿，退后半步便是万丈深渊！',
          introText:
            '【绝壁狭口 · 死守三合】石窟入口窄仅容身，契丹探哨长弯刀施展不开！谨记明安大师“斜杖卸力、善用守御”之语，撑满 3 回合即为护孤成功！',
          onWin: [openScene(regScene(buildScene14KarmaRescue(true)), 'QST-SECT-03-ENTRY')],
          onLose: [openScene(regScene(buildScene14KarmaRescue(false)), 'QST-SECT-03-ENTRY')],
          onDraw: [openScene(regScene(buildScene14KarmaRescue(true)), 'QST-SECT-03-ENTRY')],
        },
      ],
    },
  ],
}

const SCENE_WT_12_LIMU_SHRINE: StorySceneDef = {
  id: 'scene_wt_12_limu_shrine',
  title: '第十二幕 · 李牧古祠会伏虎',
  subtitle: '雁门关 · 镇边李牧武安君祠',
  mandatory: true,
  beats: [
    N('顶风冒雪赶至代州北境【雁门关 · 镇边李牧武安君祠】，但见苍松古柏掩映之下，战国名将武安君李牧的披甲塑像与佛门大雄正殿同处一院——边塞苦寒之地，忠烈将魂与禅门金身千载相望，自有一番悲凉雄浑之气。'),
    S('NPC-0163', '（清凉寺护寺武僧总领【伏虎尊者 · 法严】正披着半旧铁环僧衣擦拭禅杖，验看你递上的智猛书信与玄铁残扣后，凝重眉宇猛然舒展）“阿弥陀佛！石百炼老丈胸口中了契丹毒箭，一直惦念孙儿生死不肯安心养伤，有了这枚小石锁贴身的玄铁扣，老丈总算能宽心了！”'),
    S('NPC-0546', '（就在此时，驻祠武僧【明远】提棍自东廊疾奔而入，神色凛然）“禀法严师叔！东口烽燧台下忽有十余骑辽国北院暗桩冲击粮道，巡山师弟已与他们交上手了！”'),
    S('NPC-0163', '（法严尊者霍然起身，目光如电）“不好，定是声东击西之计！石老丈现藏于祠西【雁门关外乱石绝壁 · 幽谷石室】中。贫僧须即刻率武僧截击东口主力，小施主面生不惹眼，烦你持这枚玄铁扣抄近山道赶去【幽谷石室】，叫石老丈立刻从内封死石门，贫僧击退前敌随后便至！”'),
  ],
  onFinishEffects: [
    { type: 'advanceShichen', count: 1 },
    {
      type: 'setQuestStep',
      questId: WUTAI_ENTRY_QUEST_ID,
      stepId: 'guard_yanmen_cliff',
      deadlineDays: null,
    },
    warn('军情十万火急！请立即前往雁门关【雁门关外乱石绝壁 · 幽谷石室】通知老铁匠封门避险！', '雁门惊变'),
  ],
}

const SCENE_WT_11_YANMEN_ALARM: StorySceneDef = {
  id: 'scene_wt_11_yanmen_alarm',
  title: '第十一幕 · 血染羽书惊清凉',
  subtitle: '杨五郎演棍石台 · 边关急报',
  mandatory: true,
  beats: [
    N('演棍台下钟声骤急！一名左臂染血的五台山巡山僧【明法】踉跄冲上石阶，单膝跪倒在智猛面前，雪地上顿时洇开一团刺目殷红。'),
    S('NPC-0795', '“禀……禀智猛首座！雁门关法严师叔十万火急传讯——慈济院孤儿小石锁的爷爷、神武军巧匠【石百炼】当日并未身死，被法严师叔救回雁门关隐秘石室！然大辽枢密院北院暗桩已嗅出风声，正四处封锁关道搜捕，更扬言要拿石家血脉逼交神武连弩淬火图谱！”'),
    S('NPC-0199', '（智猛手中六十二斤浑铁禅杖重重顿地，石板裂纹乍现）“好狠毒的契丹狗贼！我清凉寺僧衣目标太大，一旦大举出山必被辽探盯死慈济院；老衲须镇守山门护住二十余名孤雏，急需一名不着僧衣、面孔陌生的俗家少年，将小石锁安然在寺的信物【玄铁残扣】送去雁门关【镇边李牧武安君祠】交予法严师弟！”'),
    P('（你上前一步，拭去嘴角雪沫，慨然抱拳）“首座大师！晚辈正是一介布衣白身，辽探绝不会疑到我头上——这趟雁门关，晚辈愿往！”'),
    S('NPC-0941', '（智猛深深看了你一眼，重重点头修书。待你快步走至山门松林时，十九岁的小沙弥【善松】竟顶着风雪气喘吁吁追了上来，将两包尚带余温的五台山熟炒麦面和一枚自己亲手打磨的《木制小佛牌》塞进你怀里）“施主留步！那日在山阶承你相助扫雪，小僧一直记在心里……你还没学内功，塞外风冷裂石，戴着这枚小佛牌，千万平平安安回来做我师兄！”'),
  ],
  onFinishEffects: [
    { type: 'giveFood', amount: 2 },
    { type: 'giveItem', itemId: 'ACC-050', qty: 1 },
    {
      type: 'setQuestStep',
      questId: WUTAI_ENTRY_QUEST_ID,
      stepId: 'go_yanmen_limu',
      deadlineDays: null,
    },
    toast('善松赠予 2 份干粮与《木制小佛牌》！请下山前往北邻的【雁门关 · 镇边李牧武安君祠】拜见伏虎尊者【法严】！', 'success', '驰援雁门'),
  ],
}

function buildScene10AfterSpar(wonSpar: boolean): StorySceneDef {
  return {
    id: `scene_wt_10_after_spar_${wonSpar ? 'win' : 'stand'}`,
    title: '第十幕 · 倒地犹握护身杖',
    subtitle: '五郎八卦演棍主台 · 试胆过关',
    mandatory: true,
    beats: [
      N(wonSpar
          ? '三合拆罢，木杆轻鸣！你虽无半缕内力催动，却将明安大师方才所授的“斜引卸力、守中待隙”使得有模有样，趁明广师兄收杆换气的一瞬滑步欺入，白蜡木杆稳稳点在他腰侧绦带半寸之外！'
          : '三合交击，明广师兄手中白蜡杆虽只使了三分巧劲，仍震得你双臂酸麻如裂，脚下一滑跌坐在冰冷石台之上！然而你牙关紧咬，虎口渗血却十指如铁钩般死死横握木杆护在胸前，一双亮得惊人的眼睛直视前方，半分弃械认输之意也无！'),
      S('NPC-0199', wonSpar
          ? '（智猛铜铃大眼骤然放光，抚掌声震落松枝积雪）“好小子！无内功而能借势卸力、后发先至，明安那闷葫芦定是在亭子里偷偷喂了你几句真诀——孺子可教，当真孺子可教！”'
          : '（智猛大步上前，一把拉起跌坐雪中的你，看着你流血却不肯松开的虎口，粗犷面庞满是动容）“好！好一个『宁折骨、不撒杖』！老衲考的本就不是你今日能不能打赢本寺武僧，考的是他日面对契丹铁骑时，你跌倒了还敢不敢举起棍子！这一关，你过了！”'),
    ],
    choices: [
      {
        id: 'wt10_hear_urgent_bell',
        label: '【柱杖调息】忽闻山门警钟急响，循声望向石阶下',
        tone: 'primary',
        effects: [openScene('scene_wt_11_yanmen_alarm', 'QST-SECT-03-ENTRY')],
      },
    ],
  }
}

const SCENE_WT_09_STAFF_SPAR_PRE: StorySceneDef = {
  id: 'scene_wt_09_staff_spar_pre',
  title: '第九幕 · 白蜡木杆试三合',
  subtitle: '五郎八卦演棍主台 · 敛气考胆',
  mandatory: true,
  beats: [
    N('自松风观云禅亭重返演棍主台，风雪稍歇，云隙透下一束清冽天光。知客首座智猛从兵器架上抽出一根毫无锋刃、打磨光滑的白蜡木齐眉杆，手腕一抖抛入你怀中。'),
    S('NPC-0199', '“根器与禅心老衲都瞧见了，最后再试一试你的临阵胆魄！明广师侄，你且将体内小乘禅功尽数封住，只拿一根白蜡木杆、用寻常庄稼把式的力道，与这小施主拆上三招！”'),
    S('NPC-0755', '（禅武僧【明广】含笑应诺，持木杆立于石台中央，向你单掌行礼）“小施主请放心，佛门考校点到即止，不论输赢，只看你在棍风迎面之时能否稳住心神。请赐教！”'),
  ],
  choices: [
    {
      id: 'wt09_begin_wooden_spar',
      label: '【双手持定白蜡木杆】“有劳明广师兄赐教！”',
      subLabel: '点到为止（不问胜负皆可过关，可用守御架势配合拳脚拆招）',
      tone: 'gold',
      effects: [
        {
          type: 'startCombat',
          questId: WUTAI_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildWoodenStaffTrialMonkNpc() },
          rule: 'story_trial',
          lethalOnLose: false,
          forbidEscapeReason: '石台三合考校重在胆魄，切莫临阵退缩！',
          introText:
            '【演棍石台 · 敛气试胆】明广师兄已封住全部内力，仅以三分木杆力道试你胆气！胜负皆无妨，重在堂堂正正接下此试！',
          onWin: [openScene(regScene(buildScene10AfterSpar(true)), 'QST-SECT-03-ENTRY')],
          onLose: [openScene(regScene(buildScene10AfterSpar(false)), 'QST-SECT-03-ENTRY')],
          onDraw: [openScene(regScene(buildScene10AfterSpar(true)), 'QST-SECT-03-ENTRY')],
        },
      ],
    },
  ],
}

const SCENE_WT_08_MINGAN_BEADS: StorySceneDef = {
  id: 'scene_wt_08_mingan_beads',
  title: '第八幕 · 松风禅亭拾菩提',
  subtitle: '杨五郎演棍石台 · 松风观云禅亭',
  mandatory: true,
  beats: [
    N('石台考校刚罢，智猛命你先去西侧【松风观云禅亭】饮口热茶暖一暖冻僵的四肢。才入亭下，便见四十四岁的苦行僧【明安】手扶石栏剧烈喘息——他早年在代州山道替逃难妇孺挡下两支契丹雕翎箭，每逢阴雪天腰脉寒毒便如锥刺骨。'),
    N('明安指节一颤，腕间那串摩挲了整整二十载的十八子星月菩提念珠猛然断线，“啪嗒”散落石阶，滚入亭外布满冰凌与野酸枣荆棘的浅涧之中。明安想要弯腰去拾，腰间旧伤却痛得他冷汗涔涔。'),
    S('NPC-0504', '（明安望着荆棘雪涧，低低叹了口气）“罪过……这串念珠乃是昔年雁门关圆寂的十八位师兄弟遗物所攒，竟在今日散了……”'),
  ],
  choices: [
    {
      id: 'wt08_pick_all_18_beads',
      label: '【挽袖跃入冰涧】拨开酸枣荆棘，将十八颗菩提子一颗不落寻回重穿',
      subLabel: '结下【明安苦行善缘】，获授白身临敌卸力保命口诀，经义 +2',
      tone: 'gold',
      effects: [
        { type: 'setFlag', flag: 'wutai_karma_mingan', value: true },
        { type: 'modifySkill', key: '经义', delta: 2 },
        { type: 'modifyChivalry', delta: 4, reason: '冒寒入荆棘涧为苦行僧明安寻回英烈念珠' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0504' }, delta: 20 },
        openScene('scene_wt_08b_mingan_mantra', 'QST-SECT-03-ENTRY'),
      ],
    },
    {
      id: 'wt08_help_mingan_sit',
      label: '【先扶明安入亭避风】替他揉缓腰间寒气，再拾回涧边念珠',
      subLabel: '结下【明安善缘】，获临敌守御指点',
      tone: 'primary',
      effects: [
        { type: 'setFlag', flag: 'wutai_karma_mingan', value: true },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0504' }, delta: 14 },
        {
          type: 'setQuestStep',
          questId: WUTAI_ENTRY_QUEST_ID,
          stepId: 'wooden_staff_trial',
          deadlineDays: null,
        },
        toast('已助明安大师寻拢念珠并获临敌指点！请回【五郎八卦演棍主台】向【智猛】复命试招。', 'success', '禅亭结缘'),
      ],
    },
  ],
}

function buildScene07TalentOutcome(
  pathKey: 'bone' | 'wisdom' | 'veteran' | 'grit',
  beatPlayer: string,
  beatZhimeng: string,
  extraEffects: QuestEffect[],
): StorySceneDef {
  return {
    id: `scene_wt_07b_talent_${pathKey}`,
    title: '第七幕（续）· 风雪石台证本真',
    subtitle: '百兵石锁校武坪 · 知客动容',
    mandatory: true,
    beats: [
      P(beatPlayer),
      S('NPC-0199', beatZhimeng),
      S('NPC-0199', '“你身上寒气甚重，先去西侧【松风观云禅亭】找明安师侄讨碗热姜茶歇息片刻，再来主台接我清凉寺的三合木杆考校！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'wutai_talent_path', value: pathKey },
      ...extraEffects,
      {
        type: 'setQuestStep',
        questId: WUTAI_ENTRY_QUEST_ID,
        stepId: 'pine_pavilion_beads',
        deadlineDays: null,
      },
      toast('石台根器考校已过！请移步西侧【松风观云禅亭】歇脚（可顺道拜访苦行僧【明安】）。', 'success', '三才试骨'),
    ],
  }
}

const SCENE_WT_07_TALENT_TRIAL: StorySceneDef = {
  id: 'scene_wt_07_talent_trial',
  title: '第七幕 · 石锁残碑辨根器',
  subtitle: '杨五郎演棍石台 · 力慧志三考',
  mandatory: true,
  beats: [
    N('智猛大步将你引至石台东侧的【百兵石锁校武坪】。坪上冻着两尊昔年杨家军亲兵练膂力用的百斤青石锁，旁侧则立着一方布满纵横棍痕的【杨五郎化枪为棍残碑】。'),
    S('NPC-0199', '“我五台山清凉寺收徒，从不看你爹娘是不是王侯将相，只看三样东西——要么你有天生扛得起降魔重兵的【根骨】；要么你有参得透五郎师祖残碑禅机的【悟性经义】；倘若这两样天资都平平无奇，那便拿出点让老衲服气的【心志】来！”'),
  ],
  choices: [
    {
      id: 'wt07_bone_stone_lock',
      label: '【天生金刚骨】沉腰坐胯，双臂硬撼冰封百斤青石锁！（需根骨 ≥ 90）',
      subLabel: '展现非凡先天筋骨，入门后《五郎八卦棍》获额外 3000 熟练度加成',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '根骨', min: 90 },
      effects: [
        openScene(regScene(buildScene07TalentOutcome(
            'bone',
            '（你吐出一口白气，十指扣死冰冷刺骨的石锁横梁，腰脊如大龙绷紧，猛然发力——伴随冰碴碎裂之声，整尊百斤青石锁被你稳稳抱离地面，连踏三步，青砖积雪留下三道深逾寸许的足印！）',
            '（智猛瞪圆铜铃巨目，仰天狂笑，蒲扇般的大手重重拍在你肩头）“好！好一副天生伏魔罗汉的硬骨头！连半点内功都没练过便有这等神力，假以时日修成本门大威德降魔杵，契丹铁浮屠也叫你一杵砸扁！”',
            [
              { type: 'giveCombatExp', amount: 20, reason: '石台撼动百斤青石锁激发筋骨潜能' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0199' }, delta: 18 },
            ],
          )), 'QST-SECT-03-ENTRY'),
      ],
    },
    {
      id: 'wt07_wisdom_stele',
      label: '【文殊顿悟心】抚摩残碑棍痕，解悟五郎“截枪化棍”真谛！（需悟性 ≥ 90 或 经义 ≥ 18）',
      subLabel: '展现上乘慧根与经义，经义 +4，入门后《清凉禅定吐纳法》获额外 4000 熟练度',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需先天悟性 ≥ 90 或 十艺【经义】 ≥ 18',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 90 },
          { type: 'skillAtLeast', key: '经义', min: 18 },
        ],
      },
      effects: [
        openScene(regScene(buildScene07TalentOutcome(
            'wisdom',
            '“回首座大师！晚辈观这残碑八方凹痕皆圆融沉厚而无穿刺锐孔——昔年五郎将军在金沙滩见尽血海尸山，入寺截去枪尖，绝非忘却国仇，而是悟透『枪尖一点唯主夺命，木棍八面方能护生』！以八卦圆转破铁骑冲阵，正是佛门以慈悲统摄杀伐的无上禅机！”',
            '（智猛浑身剧震，手中浑铁禅杖险些脱手，半晌方喃喃赞叹）“阿弥陀佛……多少习武二十年的僧人只看到棍法狠辣，你一介白身少年竟一眼看穿五郎师祖的菩萨苦心！方丈师兄若听了此言，定要欢喜无限！”',
            [
              { type: 'modifySkill', key: '经义', delta: 4 },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0199' }, delta: 18 },
            ],
          )), 'QST-SECT-03-ENTRY'),
      ],
    },
    {
      id: 'wt07_changshan_letter',
      label: '【常山忠义荐】呈验《常山·定州联合举荐信》，纵论河北边防枪棍同源！',
      subLabel: '凭常山枪派抗辽边功获智猛破格敬重，声望 +8',
      tone: 'gold',
      condition: { type: 'hasItem', itemId: 'ITM-MSC-013' },
      hideWhenUnavailable: true,
      effects: [
        openScene(regScene(buildScene07TalentOutcome(
            'veteran',
            '（你双手呈上盖有韩琦安抚使与赵括苍掌门朱印的联名保信）“晚辈曾于真定常山军中效命抗辽，深知塞北铁骑凶悍，今蒙赵掌门保荐上五台山洗练胸中燥气、求参佛门护国长兵！”',
            '（智猛双手肃然接过荐信，向东遥望真定方向抱拳一礼）“原来是赵括苍总教习调教出的抗辽好儿郎！常山白蜡枪与我五台八卦棍本就是同守北疆的亲兄弟——有此忠烈根底，何愁大事不成！”',
            [
              { type: 'modifyRenown', delta: 8, reason: '持常山定州联合保信受五台清凉寺礼重' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0199' }, delta: 20 },
            ],
          )), 'QST-SECT-03-ENTRY'),
      ],
    },
    {
      id: 'wt07_grit_snow_stance',
      label: '【钝根赤诚志】力不足举鼎、慧未及顿悟——唯在风雪主台死扎两个时辰马步！',
      subLabel: '不限任何先天资质：以血肉毅力感动全院，侠义 +6，内外功双获 2000 熟练度加成',
      tone: 'primary',
      effects: [
        openScene(regScene(buildScene07TalentOutcome(
            'grit',
            '“首座大师，晚辈既无举起百斤石锁的天生神力，亦不敢妄言参透五郎前辈的禅机。但晚辈有一副不肯弯折的膝盖——今日便在这风雪石台上扎下马步，智猛大师何时点头，晚辈便何时收腿！”（言罢，你迎着呼啸北风沉腰扎桩，漫天飞雪渐没脚踝、冻僵双膝，双腿剧颤如筛糠，你却咬破舌尖死死钉在石台上整整两个时辰纹丝不动！）',
            '（暮色渐沉时，向来暴烈严苛的智猛眼圈竟有些发红，大步上前解下自己的厚麻僧披风裹在你冻得发紫的肩头，重重合十）“够了，傻小子，快起来！五台山最不缺耍小聪明的伶俐人，最缺的就是你这副冻裂骨头也不肯退半步的硬脊梁！”',
            [
              { type: 'advanceShichen', count: 2 },
              { type: 'modifyChivalry', delta: 6, reason: '五郎石台风雪枯站两时辰不退证赤诚本心' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0199' }, delta: 20 },
            ],
          )), 'QST-SECT-03-ENTRY'),
      ],
    },
  ],
}

const SCENE_WT_06_WULANG_TERRACE: StorySceneDef = {
  id: 'scene_wt_06_wulang_terrace',
  title: '第六幕 · 演棍石台仰忠魂',
  subtitle: '杨五郎演棍石台 · 五郎八卦演棍主台',
  mandatory: true,
  beats: [
    N('循着陡峭雪阶攀上北峰半腰的【杨五郎演棍石台】，劲风卷着松涛扑面而来。宽阔青石主台中央，一位身高九尺、浓眉虬髯、宛若半截黑铁塔般的巨僧正单手抡动一柄六十二斤重的浑铁禅杖——杖风呼啸，竟将漫天落雪荡开一丈方圆，正是清凉寺知客首座【铜杵僧 · 智猛】！'),
    S('NPC-0199', '（智猛收杖顿地，“咚”的一声闷响震得石台积雪簌簌跳动。他拆阅智光师兄的书信，上下打量你单薄的布衣与空无内息的经脉，瓮声瓮气道）“哼！智光师兄心慈，看你在慈济院哄好了石家小娃，便写信叫老衲给你开后门？小子，你可知脚下这座石台是谁留下的？”'),
    S('NPC-0199', '“昔年雍熙北伐，天波府杨老令公撞死李陵碑，七子去六子回！杨五郎将军满腔忠愤无处可泄，上我五台山清凉寺落发为僧，亲手将杀人饮血的杨家铁枪砸断枪头，化为八面护生的《五郎八卦棍》！入我清凉寺出家，不是躲进深山享清福，是要替边关百姓扛刀子的！”'),
    P('“晚辈在慈济院亲眼见过断臂老卒与失语孤雏，正因深知边关之苦，才更想求入清凉寺习得护生本领，绝非贪图安逸！”'),
  ],
  choices: [
    {
      id: 'wt06_accept_terrace_test',
      label: '【肃然抱拳】请智猛首座依寺规考校晚辈根器！',
      tone: 'gold',
      effects: [openScene('scene_wt_07_talent_trial', 'QST-SECT-03-ENTRY')],
    },
  ],
}

const SCENE_WT_05_SILENT_ORPHAN: StorySceneDef = {
  id: 'scene_wt_05_silent_orphan',
  title: '第五幕 · 木马无言抚孤雏',
  subtitle: '边关遗孤慈济院 · 暖阁抚孤',
  mandatory: true,
  beats: [
    N('黑陶药铫煎出浓醇温热的麻黄桂枝汤，你捧着木托盘随智光大师步入内室暖阁。角落草席上蜷缩着一个瘦骨嶙峋的七岁男童【小石锁】——半月前契丹打草谷游骑夜袭雁门神武村，孩子亲眼见火光吞没铁匠铺，受惊过度后至今一字不言、滴水难进，怀里只死死抱着一匹断了前腿的樟木小马。'),
    S('NPC-0162', '（智光大师轻叹一声，将温热的药碗递给你）“心病还须心药医。这孩子见了生人便怕，小施主年岁与他兄长相仿，且试试能否哄他饮下这碗救命热汤？”'),
  ],
  choices: [
    {
      id: 'wt05_charm_story',
      label: '【温颜软语 · 春风化冰】蹲身平视，温和讲起塞北小木马寻家的故事（需颜值 ≥ 90 或 辩才 ≥ 18）',
      subLabel: '凭亲和风姿与善言卸下孤儿心防，辩才 +2，结下深厚【孤雏善缘】',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需风姿颜值 ≥ 90 或 十艺【辩才】 ≥ 18',
        conditions: [
          { type: 'talentAtLeast', key: '颜值', min: 90 },
          { type: 'skillAtLeast', key: '辩才', min: 18 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'wutai_karma_orphan', value: true },
        { type: 'modifySkill', key: '辩才', delta: 2 },
        { type: 'modifyChivalry', delta: 5, reason: '慈济院温言抚慰失语边关遗孤' },
        openScene('scene_wt_05b_orphan_token_charm', 'QST-SECT-03-ENTRY'),
      ],
    },
    {
      id: 'wt05_fix_wooden_horse',
      label: '【削竹续驹 · 巧手补缺】取药庐竹签麻线，替他修好断腿的樟木小马（需悟性 ≥ 90 或 画 ≥ 15）',
      subLabel: '以巧思修复遗孤至宝，结下深厚【孤雏善缘】',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需先天悟性 ≥ 90 或 十艺【画】 ≥ 15',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 90 },
          { type: 'skillAtLeast', key: '画', min: 15 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'wutai_karma_orphan', value: true },
        { type: 'modifyChivalry', delta: 5, reason: '巧手修复边关遗孤木马结下善缘' },
        openScene('scene_wt_05b_orphan_token_craft', 'QST-SECT-03-ENTRY'),
      ],
    },
    {
      id: 'wt05_drink_bitter_soup_together',
      label: '【同饮苦汤 · 笨拙相伴】先仰头喝一口苦药皱眉吐舌，陪他静坐暖阁',
      subLabel: '不限资质：以赤子真心换取孤雏信赖，结下【孤雏善缘】',
      tone: 'primary',
      effects: [
        { type: 'setFlag', flag: 'wutai_karma_orphan', value: true },
        { type: 'modifyChivalry', delta: 5, reason: '慈济院陪饮苦药抚慰失语孤雏' },
        openScene('scene_wt_05b_orphan_token_sincere', 'QST-SECT-03-ENTRY'),
      ],
    },
  ],
}

const SCENE_WT_04_HERB_APTITUDE: StorySceneDef = {
  id: 'scene_wt_04_herb_aptitude',
  title: '第四幕 · 药炉火候见天资',
  subtitle: '边关遗孤慈济院 · 后院煎药庐',
  mandatory: true,
  beats: [
    N('步入慈济院后方药庐，朔风从竹窗缝隙倒灌而入，三口黑陶药铫在泥炉上咕嘟作响。案几上堆着刚从五台雪谷采回的寒雪草、炙麻黄、桂枝与干姜，需分清先后君臣火候，熬出一炉驱除塞外风寒的救命汤药。'),
    S('NPC-0162', '（智光大师一边替断臂老卒包扎金创，一边头也不回地考较道）“麻黄性烈发汗，雪草清肺护心。小施主既无内家真气控火，且按你平生所学，替老衲看顾这三口药炉吧。”'),
  ],
  choices: [
    {
      id: 'wt04_herb_genius',
      label: '【慧心辨药】依算筹配比药量，麻黄先煎撇沫、雪草文火后下！（需悟性 ≥ 90 或 算术 ≥ 18）',
      subLabel: '天资聪颖，分毫不差控住药性，经义 +3、算术 +2、智光好感 +15',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需先天悟性 ≥ 90 或 十艺【算术】 ≥ 18',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 90 },
          { type: 'skillAtLeast', key: '算术', min: 18 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'wutai_aptitude_herb', value: 'genius' },
        { type: 'modifySkill', key: '经义', delta: 3 },
        { type: 'modifySkill', key: '算术', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0162' }, delta: 15 },
        openScene('scene_wt_05_silent_orphan', 'QST-SECT-03-ENTRY')],
    },
    {
      id: 'wt04_herb_scripture',
      label: '【经卷印证】忆及古籍《伤寒》表实注疏，井然有序添柴扇火（需经义 ≥ 16 或 书 ≥ 16）',
      subLabel: '博闻谨严，汤色澄明醇厚，经义 +3、智光好感 +12',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需十艺【经义】 ≥ 16 或 十艺【书】 ≥ 16',
        conditions: [
          { type: 'skillAtLeast', key: '经义', min: 16 },
          { type: 'skillAtLeast', key: '书', min: 16 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'wutai_aptitude_herb', value: 'scholar' },
        { type: 'modifySkill', key: '经义', delta: 3 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0162' }, delta: 12 },
        openScene('scene_wt_05_silent_orphan', 'QST-SECT-03-ENTRY'),
      ],
    },
    {
      id: 'wt04_herb_sincere_grit',
      label: '【守炉试汤】不通深奥医理，便劈柴百斤守定炉口，每沸亲口试温防烫伤孩童',
      subLabel: '不限资质：手背烫起红泡亦不离寸步，智光感念赤诚，侠义 +5、经义 +2、好感 +15',
      tone: 'primary',
      effects: [
        { type: 'setFlag', flag: 'wutai_aptitude_herb', value: 'sincere' },
        { type: 'modifyChivalry', delta: 5, reason: '慈济院守炉亲口试药护边关孤儿' },
        { type: 'modifySkill', key: '经义', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0162' }, delta: 15 },
        openScene('scene_wt_05_silent_orphan', 'QST-SECT-03-ENTRY'),
      ],
    },
  ],
}

const SCENE_WT_03_ORPHAN_HALL: StorySceneDef = {
  id: 'scene_wt_03_orphan_hall',
  title: '第三幕 · 慈济院中闻悲声',
  subtitle: '边关遗孤慈济院 · 正堂议事厅',
  mandatory: true,
  beats: [
    N('推开五台山西麓【边关遗孤慈济院】厚重的榆木院门，一股苦涩醇厚的草药香气混着松柴暖意扑面而来。正堂苇席之上，收留着二十余名自代州、崞县与雁门关外逃难而来的年幼孤儿，低低的啜泣声与咳嗽声令人鼻酸。'),
    N('须发皆白、年逾花甲的清凉寺首座高僧【五台医僧 · 智光】正单膝跪在地上，温和地为一名失去左臂的老厢军清洗冻裂的箭疮。虽贵为名震天下的佛门高僧，他僧袍下摆却沾满药渍泥点，毫无半分架子。'),
    S('NPC-0162', '（智光大师抬眼望见立在门口的你，只一搭脉息，便知你是个尚未修习内功的白身少年，面上却露出温煦笑意）“阿弥陀佛，是善松引你来的吧？世人上五台山，十有八九直奔大雄殿求学降魔杵与八卦棍，却少有人肯先进这座满是苦药味儿的慈济院。”'),
    S('NPC-0162', '“小施主，我清凉寺有一条不成文的规矩——『欲执伏魔杖，先识众生苦』。你此刻无内功武学傍身反倒是件好事，没有武夫的傲气，最能听见凡人的哭声。若真心想入我空门，可愿先替老衲去后院药庐煎一炉驱寒汤？”'),
  ],
  choices: [
    {
      id: 'wt03_help_boil_medicine',
      label: '【挽起布衣袖口】“晚辈正愿略尽绵力，请大师指点药庐所在！”',
      tone: 'gold',
      effects: [openScene('scene_wt_04_herb_aptitude', 'QST-SECT-03-ENTRY')],
    },
  ],
}

const SCENE_WT_02_SHANSONG_KARMA: StorySceneDef = {
  id: 'scene_wt_02_shansong_karma',
  title: '第二幕 · 半块寒饼结善松',
  subtitle: '五台山山门雪阶 · 初种善因',
  mandatory: true,
  beats: [
    N('说话之间，一阵冷风吹过，十九岁的小沙弥【善松】冻得连打了两个喷嚏，腹中更传来一阵清晰无比的饥肠辘辘之声。他顿时窘迫得耳根通红，连忙握紧竹帚低下头去。'),
    S('NPC-0941', '“叫施主见笑了……今早山下又送来几个雁门关外遭契丹游骑抢掠的逃难娃儿，小僧把早课分到的两个杂粮馍留给慈济院了，扫完这十级冰阶再去斋堂讨口热汤不迟。”'),
    N('看着小沙弥满是冻疮却依然一丝不苟铲除台阶坚冰的双手，同为凡胎俗骨、顶风冒雪上山的你心中不禁涌起一股暖意。'),
  ],
  choices: [
    {
      id: 'wt02_share_food_and_sweep',
      label: '【解囊赠银二两并助扫冰阶】“这点碎银请小师父替慈济院添锅热粥，十级雪阶我替你扫！”（消耗 2 两纹银）',
      subLabel: '结下【善松深厚善缘】，侠义 +5，可直接随善松引路前往慈济院',
      tone: 'gold',
      condition: { type: 'silverAtLeast', min: 2 },
      effects: [
        { type: 'giveSilver', amount: -2, reason: '赠予五台山小沙弥善松添置慈济院热粥' },
        { type: 'setFlag', flag: 'wutai_karma_shansong', value: true },
        { type: 'modifyChivalry', delta: 5, reason: '五台山雪阶助小沙弥善松扫雪结缘' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0941' }, delta: 18 },
        {
          type: 'startQuest',
          questId: WUTAI_ENTRY_QUEST_ID,
          stepId: 'visit_orphan_hall',
        },
        openScene('scene_wt_02b_shansong_guide', 'QST-SECT-03-ENTRY'),
      ],
    },
    {
      id: 'wt02_sweep_snow_only',
      label: '【挽袖接过竹帚】“干粮虽紧，力气却有一把——我替小师父扫净这十级山道！”',
      subLabel: '零消耗结下【善松善缘】，侠义 +3，开启清凉寺入门长卷',
      tone: 'primary',
      effects: [
        { type: 'setFlag', flag: 'wutai_karma_shansong', value: true },
        { type: 'modifyChivalry', delta: 3, reason: '五台山阶替扫雪沙弥善松铲冰' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0941' }, delta: 14 },
        {
          type: 'startQuest',
          questId: WUTAI_ENTRY_QUEST_ID,
          stepId: 'visit_orphan_hall',
        },
        toast('善松感激指路：请先前往五台山【边关遗孤慈济院 · 正堂议事厅】拜见首座医僧【智光】！', 'success', '清凉叩门'),
      ],
    },
  ],
}

const SCENE_WT_01_SNOW_GATE: StorySceneDef = {
  id: 'scene_wt_01_snow_gate',
  title: '第一幕 · 五峰残雪叩山门',
  subtitle: '五台山清凉寺 · {reignYear}春寒',
  mandatory: true,
  beats: [
    N('大宋{reignYear}，中原大地虽已草长莺飞，拔地数千仞的河东五台山却依旧覆着三尺晶莹残雪。五峰如台直入云表，苍松挂冰，金瓦梵刹隐现于浩渺云海之间，清冽钟声随朔风传出十里之外。'),
    N('你尚未修得高深内家真气，一介单薄布衣踏着结冰的千级青石磴道拾级而上，寒气透骨，呼出的白雾在眉梢凝成细霜。行至半山松风牌坊下，只见一名年方十九、身穿打补丁灰麻僧衣的扫雪小沙弥【善松】，正弓着脊背吃力地铲除石阶积冰。'),
    S('NPC-0941', '（善松听见脚步声，连忙停下竹帚侧身让路，见你嘴唇冻得微紫却步履坚定，温声合十道）“阿弥陀佛！山道冰滑，施主当心脚下。这大冷的天，施主孤身一人登我五台清凉山，莫非也是来烧香祈福，还是要寻访山中师长？”'),
    P('“小师父有礼！久闻五台山清凉寺乃文殊菩萨道场，更兼杨家忠魂寄托、护佑河东边民之大义。晚辈虽是毫无内功根底的凡俗之身，却诚心仰慕清凉禅武，特来叩拜山门！”'),
  ],
  choices: [
    {
      id: 'wt01_talk_shansong',
      label: '【驻足寒暄】看小沙弥双手冻得通红皲裂，上前搭话结缘',
      tone: 'gold',
      effects: [openScene('scene_wt_02_shansong_karma', 'QST-SECT-03-ENTRY')],
    },
  ],
}

const INLINE_SCENE_01_scene_wt_08b_mingan_mantra: StorySceneDef = {
            id: 'scene_wt_08b_mingan_mantra',
            title: '第八幕（续）· 十八英魂授卸诀',
            subtitle: '松风观云禅亭 · 苦行真言',
            mandatory: true,
            beats: [
              N('涧底冰雪刺骨，酸枣倒刺在你的手背上划出数道细密血痕。你趴在冰石间摸索了足足两刻钟，终于将嵌在冰缝里的第十八颗菩提子抠出，又解下腰间备用麻绳细心穿妥，双手奉还明安。'),
              S('NPC-0504', '（明安接过犹带血迹与体温的念珠，素来古井无波的眼眶微微泛红，向你郑重单掌一礼）“善哉！小施主重情重义，贫僧无以为报，送你一句早年未修成内功时在死人堆里活下来的口诀——『未聚丹田气，切忌硬撄锋；眼盯敌肩胯，斜木引千斤』。”'),
              S('NPC-0504', '“一会儿智猛师叔定要命武僧持白蜡木杆试你胆魄。你尚无内力，对敌时多取【守御架势】卸去来势，看准空当再出招——去演棍主台吧，贫僧记下你的恩情了。”'),
            ],
            onFinishEffects: [
              {
                type: 'setQuestStep',
                questId: WUTAI_ENTRY_QUEST_ID,
                stepId: 'wooden_staff_trial',
                deadlineDays: null,
              },
              toast('获明安大师传授白身卸力心得！请返回【五郎八卦演棍主台】找【智猛】接受三合木杆试胆！', 'success', '禅亭结缘'),
            ],
          }

const INLINE_SCENE_02_scene_wt_05b_orphan_token_charm: StorySceneDef = {
            id: 'scene_wt_05b_orphan_token_charm',
            title: '第五幕（续）· 玄铁残扣寄深恩',
            subtitle: '边关遗孤慈济院 · 善因初种',
            mandatory: true,
            beats: [
              N('你眉目清朗温润，全无半分江湖凶戾之气，声音轻柔得像春风拂过五台山涧。小石锁紧绷颤抖的肩膀一点点松弛下来，乌黑的眼珠映着烛火，终于伸出冻红的小手捧起粗陶碗，将热药一饮而尽。'),
              N('喝罢热汤，孩子虽仍发不出声音，却小心翼翼地从破棉鞋夹层里摸出一枚刻着火焰铁砧暗纹的【玄铁残扣】，连同那匹小木马一起轻轻碰了碰你的手心，眼中满是濡慕与信赖。'),
              S('NPC-0162', '（智光大师见状欣慰动容，认出那枚铁扣乃河东神武军随营工匠信物，当即提笔修书一封盖上朱印）“善哉！施主具菩萨低眉慈相，今日与这孩子结下一段善缘。持老衲此信去北峰【杨五郎演棍石台】寻知客首座【智猛】师弟吧，他会考校你的习武根器！”'),
            ],
            onFinishEffects: [
              {
                type: 'setQuestStep',
                questId: WUTAI_ENTRY_QUEST_ID,
                stepId: 'visit_staff_terrace',
                deadlineDays: null,
              },
              toast('结下【孤雏善缘】并获智光首座荐书！请前往【杨五郎演棍石台】拜见知客首座【智猛】。', 'success', '慈院抚孤'),
            ],
          }

const INLINE_SCENE_03_scene_wt_05b_orphan_token_craft: StorySceneDef = {
            id: 'scene_wt_05b_orphan_token_craft',
            title: '第五幕（续）· 木马重立见真心',
            subtitle: '边关遗孤慈济院 · 善因初种',
            mandatory: true,
            beats: [
              N('你一言不发地蹲在席边，用削药小刀将一截坚韧苦竹削成精巧马蹄，以细麻线严丝合缝地绑紧木马断口。当那匹樟木小马重新稳稳站立在矮几上时，小石锁黯淡的眼睛骤然亮起微光，乖乖捧起药碗喝了个干干净净。'),
              N('临别之际，小石锁从鞋底摸出一枚刻有火焰铁砧纹样的【玄铁残扣】塞给你看，用小手比划着北边雁门关的方向。智光大师认出这是神武军老铁匠石百炼的贴身信物，郑重修书一封交予你，命你赴【杨五郎演棍石台】寻知客首座【智猛】接受筋骨考校。'),
            ],
            onFinishEffects: [
              {
                type: 'setQuestStep',
                questId: WUTAI_ENTRY_QUEST_ID,
                stepId: 'visit_staff_terrace',
                deadlineDays: null,
              },
              toast('结下【孤雏善缘】并获智光首座荐书！请前往【杨五郎演棍石台】拜见知客首座【智猛】。', 'success', '慈院抚孤'),
            ],
          }

const INLINE_SCENE_04_scene_wt_05b_orphan_token_sincere: StorySceneDef = {
            id: 'scene_wt_05b_orphan_token_sincere',
            title: '第五幕（续）· 一碗苦药暖寒冬',
            subtitle: '边关遗孤慈济院 · 善因初种',
            mandatory: true,
            beats: [
              N('你没有强迫孩子说话，只是另取一只空碗分出少许药汁，自己先仰脖子灌了一口，苦得五官挤作一团直吸凉气。小石锁怔怔看着你滑稽的模样，冻僵的嘴角竟微微弯了一下，主动接过热碗小口喝尽，还悄悄将他爷爷留下的火焰铁砧【玄铁残扣】托付在你掌心。'),
              S('NPC-0162', '（智光大师抚须含笑，当场修书一封递入你手中）“赤子伴赤子，胜过千言万语！拿着老衲这封荐信，去北峰【杨五郎演棍石台】找知客首座【智猛】师弟吧！”'),
            ],
            onFinishEffects: [
              {
                type: 'setQuestStep',
                questId: WUTAI_ENTRY_QUEST_ID,
                stepId: 'visit_staff_terrace',
                deadlineDays: null,
              },
              toast('结下【孤雏善缘】并获智光首座荐书！请前往【杨五郎演棍石台】拜见知客首座【智猛】。', 'success', '慈院抚孤'),
            ],
          }

const INLINE_SCENE_05_scene_wt_02b_shansong_guide: StorySceneDef = {
            id: 'scene_wt_02b_shansong_guide',
            title: '第二幕（续）· 雪阶引路指慈院',
            subtitle: '五台山清凉寺 · 暗授门径',
            mandatory: true,
            beats: [
              N('你不由分说接过沉重的大竹帚，凭着一口少年热气将最后十级石阶上的滑冰铲得干干净净。善松双手捧着那二两犹带体温的碎纹银，眼眶微热，凑近低声向你吐露实情。'),
              S('NPC-0941', '“施主心善，小僧便跟你说句掏心窝的话！近日雁门关外风声鹤唳，方丈道清老禅师正在主殿闭关诵经，知客首座【智猛师叔】脾气最是刚烈，凡是空着双手径直去求学武功的外人，十个有九个要被他的大铁杖轰下山去！”'),
              S('NPC-0941', '“你若真心想入我清凉寺剃度修行，听小僧一句劝——先去西边的【边关遗孤慈济院】拜见首座医僧【智光老禅师】，帮老人家照料伤患孤儿。只要智光师伯肯点头写一封荐书，智猛师叔便绝不拦你！”'),
            ],
            choices: [
              {
                id: 'wt02b_go_orphan_now',
                label: '【多谢小师父指点】即刻随善松引路前往【边关遗孤慈济院】',
                tone: 'gold',
                effects: [
                  {
                    type: 'teleportPlayer',
                    regionId: 'wutaishan',
                    buildingId: 'wt_orphan',
                    spotId: 'wt_orphan_main',
                  },
                  openScene('scene_wt_03_orphan_hall', 'QST-SECT-03-ENTRY'),
                ],
              },
              {
                id: 'wt02b_walk_later',
                label: '【谨记在心】稍后自行前往【边关遗孤慈济院】拜谒智光大师',
                tone: 'default',
                effects: [
                  toast('已开启《清凉残雪 · 雁门梵钟》！请前往五台山【边关遗孤慈济院 · 正堂议事厅】拜见医僧【智光】。', 'success', '清凉叩门'),
                ],
              },
            ],
          }

export const SCENES: Record<string, StorySceneDef> = {
  ...EXTRA_SCENES,
  [SCENE_WT_19_TONSURE_CEREMONY.id]: SCENE_WT_19_TONSURE_CEREMONY,
  [SCENE_WT_18_ABBOT_THREE_QUESTIONS.id]: SCENE_WT_18_ABBOT_THREE_QUESTIONS,
  [SCENE_WT_17_MAIN_HALL_DEBATE.id]: SCENE_WT_17_MAIN_HALL_DEBATE,
  [SCENE_WT_16_YANMEN_SUNSET.id]: SCENE_WT_16_YANMEN_SUNSET,
  [SCENE_WT_15_FAYAN_ARRIVAL.id]: SCENE_WT_15_FAYAN_ARRIVAL,
  [SCENE_WT_13_CLIFF_STAND.id]: SCENE_WT_13_CLIFF_STAND,
  [SCENE_WT_12_LIMU_SHRINE.id]: SCENE_WT_12_LIMU_SHRINE,
  [SCENE_WT_11_YANMEN_ALARM.id]: SCENE_WT_11_YANMEN_ALARM,
  [SCENE_WT_09_STAFF_SPAR_PRE.id]: SCENE_WT_09_STAFF_SPAR_PRE,
  [SCENE_WT_08_MINGAN_BEADS.id]: SCENE_WT_08_MINGAN_BEADS,
  [SCENE_WT_07_TALENT_TRIAL.id]: SCENE_WT_07_TALENT_TRIAL,
  [SCENE_WT_06_WULANG_TERRACE.id]: SCENE_WT_06_WULANG_TERRACE,
  [SCENE_WT_05_SILENT_ORPHAN.id]: SCENE_WT_05_SILENT_ORPHAN,
  [SCENE_WT_04_HERB_APTITUDE.id]: SCENE_WT_04_HERB_APTITUDE,
  [SCENE_WT_03_ORPHAN_HALL.id]: SCENE_WT_03_ORPHAN_HALL,
  [SCENE_WT_02_SHANSONG_KARMA.id]: SCENE_WT_02_SHANSONG_KARMA,
  [SCENE_WT_01_SNOW_GATE.id]: SCENE_WT_01_SNOW_GATE,
  [INLINE_SCENE_01_scene_wt_08b_mingan_mantra.id]: INLINE_SCENE_01_scene_wt_08b_mingan_mantra,
  [INLINE_SCENE_02_scene_wt_05b_orphan_token_charm.id]: INLINE_SCENE_02_scene_wt_05b_orphan_token_charm,
  [INLINE_SCENE_03_scene_wt_05b_orphan_token_craft.id]: INLINE_SCENE_03_scene_wt_05b_orphan_token_craft,
  [INLINE_SCENE_04_scene_wt_05b_orphan_token_sincere.id]: INLINE_SCENE_04_scene_wt_05b_orphan_token_sincere,
  [INLINE_SCENE_05_scene_wt_02b_shansong_guide.id]: INLINE_SCENE_05_scene_wt_02b_shansong_guide,
}
