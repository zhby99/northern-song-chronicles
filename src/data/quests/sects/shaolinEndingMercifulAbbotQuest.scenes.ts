import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q38_QUEST_ID } from './shaolinEndingMercifulAbbotQuest'

const SPEAKER_BLOOD_BLADE: StorySpeakerSpec = {
  kind: 'custom',
  name: '血刀邪客 · 厉千煞',
  title: '陇右邪道巨枭',
  factionName: '西域邪道',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

const SPEAKER_YIN_CLAW: StorySpeakerSpec = {
  kind: 'custom',
  name: '阴风邪老 · 阎三毒',
  title: '幽冥鬼爪凶徒',
  factionName: '黑道群邪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_MONK_CHOIR: StorySpeakerSpec = {
  kind: 'custom',
  name: '少林四十八房高僧',
  title: '禅宗诸院首座与执事僧众',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

function buildBloodBladeBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ38_BLOOD_BLADE',
    name: '血刀邪客 · 厉千煞',
    title: '陇右邪道巨枭',
    realm: '宗师中品',
    factionName: '西域邪道',
    sectRank: 0,
    sectRankLabel: '邪道巨枭',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“哈哈哈哈！少林方丈自己破了色戒，还装什么大慈大悲？今日老子便在佛祖眼皮底下宰了那妖妇母子，让天下人看看少林的笑话！”',
    stats: { hp: 5650, mp: 5200, agi: 84, res: 76 },
    talents: { bone: 86, comprehension: 78, charm: 32 },
    equippedArts: { neigong: 'MA-026', move1: 'MA-091', move2: 'MA-107' },
    learnedArts: [
      { artId: 'MA-026', level: 9 },
      { artId: 'MA-091', level: 10 },
      { artId: 'MA-107', level: 9 },
    ],
  })
}

function buildYinClawBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ38_YIN_CLAW',
    name: '阴风邪老 · 阎三毒',
    title: '幽冥鬼爪凶徒',
    realm: '宗师下品',
    factionName: '黑道群邪',
    sectRank: 0,
    sectRankLabel: '黑道老魔',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“少林小辈莫挡路！叶二娘当年杀过老夫的侄儿，今日趁乱讨债，顺便拆了你们少林的牌匾！”',
    stats: { hp: 4720, mp: 4380, agi: 81, res: 71 },
    talents: { bone: 80, comprehension: 74, charm: 26 },
    equippedArts: { neigong: 'MA-081', move1: 'MA-055', move2: 'MA-065' },
    learnedArts: [
      { artId: 'MA-081', level: 8 },
      { artId: 'MA-055', level: 9 },
      { artId: 'MA-065', level: 9 },
    ],
  })
}

export const SHAOLIN_Q38_SCENES: Record<string, StorySceneDef> = {
  scene_slq38_01: {
    id: 'scene_slq38_01',
    title: '第一幕 · 嵩山秋钟',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室峰霜叶尽染，寒风卷过琉璃重檐。大雄宝殿前的青铜大钟连撞三十六响，钟声沉郁苍凉，宛如千年古刹发出一声深沉叹息——尘封二十四载的方丈旧案已大白天下，千余僧众与闻讯而来的江湖群豪肃立丹墀，气氛紧绷如弦。'),
      S('NPC-0112', '（早已卸下红黄织金的方丈袈裟，仅着一袭洗得发白的灰布旧僧衣，静静跪于释迦金身前的蒲团上，目光平静如水）“阿弥陀佛，你来了。二十四年前老衲一念之差破戒累及叶二娘半生疯魔、骨肉流离，岂能贪恋虚名而令少林千年清规沦为废纸？”'),
      S('NPC-0127', '（玄难老泪纵横，哽咽颤声）“方丈师兄！你掌寺三十载劳苦功高，退居后山闭关思过便可，何必当众受那二百记玄铁刑杖啊！”'),
      S('NPC-0156', '（玄痛手捧漆黑沉重的戒律玄铁禅杖，双目赤红却字字铿锵）“阿弥陀佛！少林立院五百年，上自方丈、下至行童，犯大戒而累及寺德者依律当受戒杖二百！师兄既愿以身明法，玄痛……纵使肝肠寸断，亦不敢徇私！”'),
      N('殿外已有好事之徒交头接耳，甚至混杂着几道阴冷的邪派窥伺目光。玄慈缓缓回首望向步上玉阶的你，似将全寺大局与母子安危尽数托付于你一身。'),
    ],
    choices: [
      {
        id: 'slq38_accept_guard',
        label: '【佛前立誓 · 守律护慈】请命亲立丹墀护持法场，既守清规之公，亦保孤寡不受宵小凌辱',
        subLabel: '正式开启终局《杖责还业 · 达摩传衣》',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q38_QUEST_ID, stepId: 'confession_hall' },
          setStep(SHAOLIN_Q38_QUEST_ID, 'confession_hall'),
          { type: 'setFlag', flag: 'sl_q38_confession_triggered', value: true },
          { type: 'setFlag', flag: 'sl_q38_opening_stance', value: 'guard' },
          toast('已开启终局《杖责还业 · 达摩传衣》！大雄正殿公审启幕！', 'talk', '杖责还业'),
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_zen_merit', op: 'gte', value: 10 },
            thenEffects: [openScene('scene_slq38_02a', SHAOLIN_Q38_QUEST_ID)],
            elseEffects: [openScene('scene_slq38_02b', SHAOLIN_Q38_QUEST_ID)],
          },
        ],
      },
      {
        id: 'slq38_accept_roar',
        label: '【禅音震场 · 先折群嘲】步出殿门以狮子吼喝止殿外浮议，昭告天下少林「法不阿贵」之风骨',
        subLabel: '正式开启终局《杖责还业 · 达摩传衣》',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q38_QUEST_ID, stepId: 'confession_hall' },
          setStep(SHAOLIN_Q38_QUEST_ID, 'confession_hall'),
          { type: 'setFlag', flag: 'sl_q38_confession_triggered', value: true },
          { type: 'setFlag', flag: 'sl_q38_opening_stance', value: 'roar' },
          toast('已开启终局《杖责还业 · 达摩传衣》！禅音震慑殿外群豪！', 'talk', '杖责还业'),
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_zen_merit', op: 'gte', value: 10 },
            thenEffects: [openScene('scene_slq38_02a', SHAOLIN_Q38_QUEST_ID)],
            elseEffects: [openScene('scene_slq38_02b', SHAOLIN_Q38_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_slq38_02a: {
    id: 'scene_slq38_02a',
    title: '第二幕 · 初心不改',
    subtitle: '大雄正殿 · 丹墀法场（禅心业报回响）',
    mandatory: true,
    beats: [
      N('殿门大开，三千僧俗鸦雀无声。{ifFlagEq:sl_q38_opening_stance=roar|你率先踏出殿槛，一记清越狮吼喝破几名江湖客的冷嘲，字字阐明「圣贤有过坦荡认罪、清规不徇方丈」之大义，震得广场松针簌簌、群豪齐默！|你稳立丹墀金柱之侧，衣袍在秋风中纹丝不动，凛然气度令殿外蠢蠢欲动的宵小尽数噤若寒蝉！}'),
      S('NPC-0112', '（缓步走出殿门，行刑前停在你身侧，深深凝视你的双眸，唇边浮起由衷而欣慰的淡笑）“好孩子……老衲记得清清楚楚。当年你初入外门，连护持寒门新徒阿木、颍阳赈济饥民、再到后来中原四海行走，手握绝学却始终慈悲为怀、从未忘过初心。”'),
      S('NPC-0112', '（声音轻缓却如春水润心）“老衲这半生，论戒律之严不及玄痛，论渡世之仁更愧对你这一路行止。有你这般初心不改的慈悲人在少室山上，老衲今日便能彻底放下心头最后一块巨石，坦然受刑了。”'),
      N('玄慈不再多言，撩起灰布僧袍双膝跪倒于冰冷青石阶上，朗声向天下群雄坦承二十四年前破戒旧罪：“此罪源头，皆在老衲一人！玄痛师弟，依律行刑——不可留力，不可运柔劲相护！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_03', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_02b: {
    id: 'scene_slq38_02b',
    title: '第二幕 · 坦承旧罪',
    subtitle: '大雄正殿 · 丹墀法场',
    mandatory: true,
    beats: [
      N('殿门大开，秋风卷着银杏落叶涌过丹墀。{ifFlagEq:sl_q38_opening_stance=roar|你踏前一步以清越禅音压下殿外窃窃私语，朗声道「唯小人饰非文过，君子坦荡认罪；方丈自领戒杖，正显少林风骨」，说得正道宿老暗自点头！|你缓步立于法场玉阶之前，目如朗星扫过广场群豪，将满场浮躁喧哗硬生生压作一片死寂！}'),
      S('NPC-0112', '（走到青石丹墀正中，回头深深望了你一眼，目光沧桑而清明）“数载苦修，你已长成足以撑起少室山门的栋梁。今日之局，老衲以残躯正寺纲，望你日后不论面对何种风云，切莫重蹈老衲优柔执念之覆辙。”'),
      S('NPC-0112', '（面向三千僧俗徐徐跪下，声传少室山谷）“阿弥陀佛！二十四年前老衲破佛门色戒，累及叶二娘半生沉沦魔障、造下无边杀业——此罪皆在老衲一人！玄痛师弟，依《少林清规》行刑，切不可留半分情面！”'),
      N('满场鸦雀无声。玄痛双手微颤，高举乌沉沉的玄铁戒杖，含泪喝出第一声刑令：“奉达摩祖师遗训，行杖二百！一杖——！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_03', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_03: {
    id: 'scene_slq38_03',
    title: '第三幕 · 血染青阶',
    subtitle: '大雄正殿 · 丹墀法场（刑堂护法抉择）',
    illustrationUrl: '/assets/quests/sl_38_xuanci_rod.jpg',
    illustrationCaption: '大雄宝殿前 · 玄慈卸去袈裟坦然自领戒律二百刑杖，血染青石以身明法',
    mandatory: true,
    beats: [
      N('“啪！”沉闷如雷的铁杖重重砸落脊背！玄慈未运半点护体神功，灰布僧衣瞬间绽裂，殷红鲜血染透青石！一杖、五十杖、一百杖……满场少林僧众齐齐跪地，悲怆诵经声如海潮涌彻嵩岳：“南无阿弥陀佛……”'),
      N('玄慈脊背早已血肉模糊，却自始至终脊梁挺直未发一声呻吟，眉宇间郁结二十余载的愧疚反倒随鲜血一点点散去。西侧钟鼓禅院廊下，叶二娘遥望血染青阶，扑地泣血哭喊：“大哥别打了……都是奴家不好，奴家替你挨罢！”'),
      N('百杖已过，你敏锐察觉玄慈内息骤然紊乱——玄铁戒杖势沉力猛，若后一百杖再无丝毫缓冲，方丈恐怕熬不到刑满、更见不到叶二娘母子最后一面！你端着净水钵步至丹墀一侧，指尖禅气悄然凝聚……'),
    ],
    choices: [
      {
        id: 'slq38_rod_shield',
        label: '【暗渡禅气 · 护住心脉】借递净水之机暗运护体禅气，替方丈泄去三成夺命暗劲',
        subLabel: '不坏明法之仪，亦求留住方丈最后一口清气与亲人诀别',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q38_rod_stance', value: 'shield' },
          openScene('scene_slq38_04', SHAOLIN_Q38_QUEST_ID),
        ],
      },
      {
        id: 'slq38_rod_strict',
        label: '【泣血恪守 · 全受戒律】强忍悲恸遵从方丈遗愿，绝不暗中留力以正千年视听',
        subLabel: '成全方丈以纯血还业之大勇，令天下群雄无半句可诟',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q38_rod_stance', value: 'strict' },
          openScene('scene_slq38_04', SHAOLIN_Q38_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq38_04: {
    id: 'scene_slq38_04',
    title: '第四幕 · 西廊告急',
    subtitle: '大雄正殿 · 西院急报',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q38_rod_stance=shield|你借俯身递水一瞬，将一缕温润绵长的洗髓禅气悄无声息渡入玄慈督脉护住心窍。玄慈微不可察地抬眸望你，眼中满是复杂却温暖的感念，随即咬牙迎上后百记重杖！|你指节攥得发白，终究缓缓松开真气，红着眼眶退回柱侧。玄慈察觉你的克制，竟在剧痛之中向你微微颔首——他懂你成全他最后一份清白风骨的苦心。}'),
      N('刑杖行至一百五十记，满寺目光尽数牵系丹墀，西院防务一时现出破绽！忽听钟鼓禅院方向传来凄厉刀兵破风与武僧怒喝，一名浴血知客僧踉跄扑上玉阶嘶吼：“报——！血刀邪客厉千煞与阴风邪老阎三毒率黑道恶徒翻越西墙，直扑叶二娘母子去了！”'),
      S('NPC-0112', '（浑身剧震，险些喷出一口心血，回望西院眼中满是焦灼哀求）“阿弥陀佛……罪在老衲一人，吾儿自幼出家修行全然无辜，二娘亦已悔悟……”'),
      S('NPC-0134', '（玄寂按剑厉声喝道）“黑道鼠辈安敢趁我寺大难上门落井下石！师侄，大殿法场由老衲与玄难、玄痛护着，西院群邪便托付你雷霆荡平！”'),
      P('（衣袂鼓风，沉声断然应诺）“方丈安心还业！有弟子在，绝不容宵小伤及母子一根毫毛！”'),
    ],
    choices: [
      {
        id: 'slq38_go_west',
        label: '疾掠【钟鼓禅院 · 演武坪】，截杀邪派双凶护持叶二娘母子！',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q38_QUEST_ID, 'defend_mother_child'),
          toast('邪派双凶正围攻钟鼓禅院！速赴【钟鼓禅院 · 演武坪】截杀群邪！', 'warn', '钟院护孤'),
        ],
      },
    ],
  },

  scene_slq38_05: {
    id: 'scene_slq38_05',
    title: '第五幕 · 钟院护孤',
    subtitle: '钟鼓禅院 · 演武坪（宗师级破邪实战）',
    mandatory: true,
    beats: [
      N('你如大鹏展翅掠过回廊，轰然扑落钟鼓禅院演武坪！十余名护院武僧已倒卧血泊，数十名黑道凶徒正将脸色惨白的叶二娘与紧抱母亲的少年围死在古钟之下！'),
      S(SPEAKER_BLOOD_BLADE, '（暗红皮裘、宽背血刀横斜，狞笑冲天）“哈哈！玄慈老秃驴在前殿挨板子，少林群秃自顾不暇！今日老子先剐了这妖妇母子，再提头去大雄宝殿贺喜！”'),
      S(SPEAKER_YIN_CLAW, '（枯骨十指乌黑，咯咯怪笑封住退路）“叶二娘当年杀我侄儿，今日趁乱讨债，顺便拆了少林牌匾！少林小辈再敢挡路，连你一并撕碎！”'),
      S('NPC-0233', '（死死将孩儿护在身下，泪雨滂沱却寸步不退）“你们冲我来！千万别伤我孩儿……”'),
      P('（双足震裂青砖稳稳挡在母子身前，佛门浑厚真气铺满演武坪）“叶二娘旧业自有公论因果，岂容尔等畜生在达摩祖庭行凶作恶！今日既踏少室山，便一并留下罢！”'),
    ],
    choices: [
      {
        id: 'slq38_fight_roar_break',
        label: '【洗髓禅音 · 喝破邪徒阵势】以贯耳佛门狮子吼震慑群邪、吓退阎三毒，单挑血刀厉千煞！',
        subLabel: '需经义 ≥ 90 或辩才 ≥ 65 · 禅音直破邪徒心魔，跳过阎三毒先手 1v1 破厉千煞',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'skillAtLeast', key: '经义', min: 90 },
            { type: 'skillAtLeast', key: '辩才', min: 65 },
          ],
          hint: '需经义 ≥ 90 或辩才 ≥ 65',
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q38_battle_tactic', value: 'roar' },
          toast('洗髓禅音化作九霄狮吼震裂古钟余韵！外围邪徒丢刀溃散，阎三毒心神受震倒跌退阵，你直逼厉千煞决战！', 'success', '禅音破阵'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q38_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBloodBladeBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '背后便是叶二娘母子与少林千年威严，绝不可退！',
            introText: '【禅音破阵 · 单挑血刀】以洗髓狮吼震散群邪后，正面迎战血刀邪客【厉千煞】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq38_06', SHAOLIN_Q38_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('血刀厉千煞刀势惨烈异常，暂借古钟石柱回气再战！', 'warn', '钟院护孤'),
            ],
          },
        ],
      },
      {
        id: 'slq38_fight_gauntlet',
        label: '【单骑挡门 · 死战双邪】以金刚怒目车轮连战【厉千煞】与【阎三毒】！（宗师车轮连战）',
        subLabel: '无门槛正攻 · 车轮连战双魔，荡平趁乱辱寺之邪徒',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q38_battle_tactic', value: 'gauntlet' },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q38_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBloodBladeBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildYinClawBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '背后便是叶二娘母子与少林千年威严，绝不可退！',
            introText: '【车轮连战 · 钟院护孤】于钟鼓禅院演武坪连战邪道双魔【厉千煞】与【阎三毒】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq38_06', SHAOLIN_Q38_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('双魔刀爪合击极为凶悍，暂借古钟石柱调息回满再战！', 'warn', '钟院护孤'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq38_06: {
    id: 'scene_slq38_06',
    title: '第六幕 · 佛掌伏魔',
    subtitle: '钟鼓禅院 → 大雄正殿丹墀',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q38_battle_tactic=roar|古钟轰鸣犹在耳畔！你先以洗髓狮吼震溃外围邪众、令阎三毒五脏受震踉跄逃窜，再于三十合内双指夹断厉千煞百炼血刀，一记至阳佛掌轰得这陇右巨枭口喷鲜血飞出院墙！|三十余合惊天搏杀，演武坪青砖寸裂！你先切入中宫一掌废去阎三毒鬼爪毒功，旋即双指并拢夹断厉千煞玉石俱焚的血刃，余劲震得二魔一昏一逃，数十黑道喽啰丢兵溃逃下山！}'),
      S('NPC-0233', '（泪如泉涌，拉着少年向你深深叩首）“多谢大师大恩大德……奴家半生造孽，临死前能见孩儿无恙、再见大哥一面，已死而无憾……”'),
      N('待你护送叶二娘母子疾步赶回大雄正殿丹墀，恰好听见玄痛声嘶力竭的最后一喝：“二百杖——毕！”沉重铁杖落地，玄痛扑通跪地掩面痛哭。'),
      N('青石已被鲜血浸透。气若游丝的玄慈缓缓睁眼，望见安然无恙的叶二娘母子与你，苍白脸上竟绽出一抹如释重负的微笑，轻声唤你近前：“你……过来……少林千年衣钵，须亲手交托于你……”'),
    ],
    choices: [
      {
        id: 'slq38_to_entrust',
        label: '步入【大雄正殿 · 佛前蒲团】，聆听玄慈方丈临终传衣',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q38_QUEST_ID, 'kasaya_entrust'),
          toast('群邪已退，二百刑杖已毕！速入【大雄正殿 · 佛前蒲团】聆听方丈遗命！', 'talk', '达摩传衣'),
        ],
      },
    ],
  },

  scene_slq38_07: {
    id: 'scene_slq38_07',
    title: '第七幕 · 临终托孤',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大雄正殿内檀香袅袅，玄难、玄寂、玄痛、玄渡、玄生等玄字辈高僧悉数跪侍两侧。你疾步单膝跪于玄慈榻前，紧握那双冰凉却满是厚茧的手。'),
      S('NPC-0112', '（转首望向扑在榻前泣不成声的叶二娘，声音轻柔而释然）“二娘……这二十四年，苦了你了……孩儿已长大成人、心性纯善，老衲……无憾了。”'),
      S('NPC-0233', '（握紧玄慈沾血的衣襟，哽咽含笑）“大哥莫怕黄泉路冷……奴家这就陪你一块儿去，下辈子不做武林人，只做寻常夫妻……”'),
      S('NPC-0112', '（强提最后一口真气望向满殿师弟与你，目光清澈如初雪）“诸位师弟……少林外有辽夏窥伺、内有积弊待兴，非大智、大勇、大慈悲者不可掌舵！这孩子自山门起步，经三院磨砺、走遍天下州府，今日更以慈悲护法、以雷霆伏魔——少林方丈之位，非你莫属！”'),
      P('（眼眶发热，伏地重重叩首）“方丈师伯厚爱如山，弟子何德何能……只愿师伯珍重法体，留住慧命！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_08', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_08: {
    id: 'scene_slq38_08',
    title: '第八幕 · 达摩传衣',
    subtitle: '大雄正殿 · 佛前传钵',
    illustrationUrl: '/assets/quests/sl_38_kasaya_handover.jpg',
    illustrationCaption: '大雄正殿 · 玄慈方丈圆寂前亲手将天阶圣衣《少林达摩袈裟》披于主角肩头，托付禅宗正统',
    mandatory: true,
    beats: [
      N('玄慈微微摇头，命玄难捧来供奉在达摩祖师像前、历经五百余年沧桑的紫檀鎏金宝匣。宝匣开启，金丝梵文隐隐流光的绯红古袈裟映照满殿——正是少林镇寺天阶圣衣【少林达摩袈裟】！'),
      S('NPC-0112', '（竭尽残力起身半寸，亲手将沉甸甸的达摩袈裟披上你的双肩，细细替你抚平领口每一道褶皱）“衣钵相传，灯灯相续……从今往后，少林寺千年香火、天下禅宗正统，便尽数托付于你了！”'),
      P('（热泪盈眶却脊背笔直，合十肃然立誓）“弟子谨遵法旨！誓以毕生心血护持少林，不负祖师，不负师伯！”'),
      S('NPC-0112', '（露出最后一丝安详无碍的微笑，双掌缓缓合十于胸前，佛号渐轻）“一切有为法，如梦幻泡影……如露亦如电，应作如是观……南无……阿弥陀佛……”'),
      N('佛号声消散于袅袅檀香之间。一代少林方丈玄慈以肉身还尽尘世业债，端坐蒲团含笑圆寂，千余僧众伏地大恸，哭声震动嵩山林壑！'),
    ],
    onFinishEffects: [openScene('scene_slq38_09', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_09: {
    id: 'scene_slq38_09',
    title: '第九幕 · 叶落暮钟',
    subtitle: '大雄正殿 · 暮色残阳',
    illustrationUrl: '/assets/quests/sl_38_leaf_bell.jpg',
    illustrationCaption: '残阳暮钟 · 叶二娘于玄慈遗体旁自尽殉情，二十四载痴缠化作嵩山一缕秋风',
    mandatory: true,
    beats: [
      S('NPC-0233', '（轻轻拭去玄慈唇角最后一点血痕，痴痴凝望他安详无忧的容颜，忽然凄然一笑）“大哥，你先走一步，二娘这就来追你了……”'),
      N('众僧尚未及阻拦，叶二娘已拔出袖中短刃含笑自绝于玄慈身侧，鲜血与秋风卷入殿门的漫天红叶融作一片。'),
      N('就在这一瞬，嵩山暮钟竟在山风中自行长鸣，余韵悠远悲凉，仿佛为这对痴缠二十四载的苦命人诵起最后的往生咒。'),
      N('三日之后，玄慈法体入塔林安葬，少林亦破例将叶二娘葬于山南清净坡，令其孤子得以春秋祭扫。'),
    ],
    onFinishEffects: [
      { type: 'markNpcsDead', npcIds: ['NPC-0112', 'NPC-0233'] },
      openScene('scene_slq38_10', SHAOLIN_Q38_QUEST_ID),
    ],
  },

  scene_slq38_10: {
    id: 'scene_slq38_10',
    title: '第十幕 · 众老合议',
    subtitle: '大雄正殿 · 禅堂议事',
    mandatory: true,
    beats: [
      N('丧仪既毕，少林四十八房高僧与诸院首座齐聚大雄正殿。晨光破雾，金辉洒满少室峰顶，大雄宝殿钟鼓齐鸣一百零八响。'),
      S('NPC-0127', '（玄难拭干泪痕，向满堂高僧合十朗声道）“阿弥陀佛！国不可一日无君，寺不可一日无主。先方丈临终前当着满殿高僧亲授达摩袈裟，此乃天意人心所归！”'),
      S('NPC-0156', '（玄痛与玄寂齐齐步出班列，竟向你单膝行大礼）“戒律院素来只认法度与公心！当日若非你既守戒律、又护全母子、更以神功震慑群邪，少林早已沦为天下笑柄！请新方丈莫再推辞！”'),
      S(SPEAKER_MONK_CHOIR, '（四十八房高僧齐齐合十躬身，声震殿宇）“恭请新方丈登坛升座，光大禅宗！”'),
    ],
    choices: [
      {
        id: 'slq38_accept_throne_mercy',
        label: '【承衣护法 · 悲愿继统】合十受命，誓以先方丈慈悲遗志执掌千年古刹',
        subLabel: '前往大雄正殿法座登坛升座',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q38_accept_vow', value: 'mercy' },
          setStep(SHAOLIN_Q38_QUEST_ID, 'merciful_enthronement'),
          toast('请于【大雄正殿 · 佛前蒲团】登坛升座，继任少林慈悲方丈！', 'success', '慈悲升座'),
        ],
      },
      {
        id: 'slq38_accept_throne_council',
        label: '【诸院共议 · 戒禅并兴】受位而不独专，立约四十八房共议寺政、严法恤众',
        subLabel: '前往大雄正殿法座登坛升座',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q38_accept_vow', value: 'council' },
          setStep(SHAOLIN_Q38_QUEST_ID, 'merciful_enthronement'),
          toast('请于【大雄正殿 · 佛前蒲团】登坛升座，继任少林慈悲方丈！', 'success', '慈悲升座'),
        ],
      },
    ],
  },

  scene_slq38_11: {
    id: 'scene_slq38_11',
    title: '第十一幕 · 慈悲升座',
    subtitle: '嵩山少林寺 · 大雄正殿 · 升座大典',
    illustrationUrl: '/assets/quests/sl_38_merciful_abbot.jpg',
    illustrationCaption: '大雄宝殿 · 身披天阶达摩袈裟登坛升座，四十八房高僧与千余僧众合十恭迎新任慈悲方丈',
    mandatory: true,
    beats: [
      N('你身披金丝梵文流转的【少林达摩袈裟】，缓步踏上九级玉阶，在达摩祖师金身与历代方丈牌位之前转身端坐法座！殿内四十八房高僧、殿外千余名罗汉堂、达摩院、戒律院与俗家弟子如潮水般齐齐合十下拜！'),
      S(SPEAKER_MONK_CHOIR, '“阿弥陀佛！恭迎少林新任方丈升座！愿佛日增辉，法轮常转，禅宗千秋不绝！”'),
      P('（端坐法座，声音清越宽厚如春风化雨，传遍山门内外）“今日承先方丈遗命与诸位师伯厚托，忝居少林方丈之位，敢立三愿于佛前——一愿戒律严明而不失悲悯，二愿广开禅武慈航赈济灾黎，三愿少林永作中原正道砥柱，不论辽夏风雪几何，誓死护持社稷苍生！”'),
      N('三愿既出，满寺高僧动容赞叹，观礼的汴京大相国寺、洛阳白马寺与中原各派使者纷纷起身致贺！'),
    ],
    onFinishEffects: [openScene('scene_slq38_12', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_12: {
    id: 'scene_slq38_12',
    title: '第十二幕 · 方丈首谕',
    subtitle: '大雄正殿 · 颁行新政（慈悲方丈首道法谕）',
    mandatory: true,
    beats: [
      N('礼乐渐止，执事僧捧上紫檀法印与朱笔黄绢。按少林古例，新任方丈登座之日，必向天下禅林与河南府颁行第一道方丈法谕，定下此后十年兴寺之基调。'),
      S('NPC-0127', '（玄难含笑拱手）“方丈，如今河南秋旱流民颇多，而经院旧藏又经多年风霜待修——不知新方丈继位第一道法谕，欲先兴何事？”'),
      N('四十八房首座与诸派使者屏息静候。你提笔蘸墨，略一沉吟，落笔定下属于慈悲方丈的第一道法旨——'),
    ],
    choices: [
      {
        id: 'slq38_edict_charity',
        label: '【大开粥棚 · 广济天下流民】开寺庄义仓于登封、洛阳、汴京广设慈航粥棚，普济孤寡灾民',
        subLabel: '侠义仁声传颂大宋朝野，大增侠义与禅心慈悲',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q38_first_edict', value: 'charity' },
          openScene('scene_slq38_13', SHAOLIN_Q38_QUEST_ID),
        ],
      },
      {
        id: 'slq38_edict_scripture',
        label: '【重修藏经院 · 广纳南北典籍】通访大相国寺、白马寺与南少林校勘三藏，光大禅林正统文脉',
        subLabel: '书香正统凝练四海僧心，大增门派贡献与江湖威望',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q38_first_edict', value: 'scripture' },
          openScene('scene_slq38_13', SHAOLIN_Q38_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq38_13: {
    id: 'scene_slq38_13',
    title: '第十三幕 · 慈悲方丈',
    subtitle: '嵩山少林寺 · 古柏遥风（终局归位）',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q38_first_edict=charity|法谕既出，少林三日内于河南、京畿遍设十二座慈航粥棚，活人无数，中原百姓无不焚香称颂「少林出了位活佛慈悲方丈」！|法谕既出，南北诸大禅刹纷纷遣高僧携孤本古经赴嵩山共校三藏，少林经院文脉大兴，禅宗正统威望一时无两！}'),
      N('暮色四合，群客渐散。你独自立于大雄宝殿丹墀，达摩袈裟在晚风中猎猎作响。一阵秋风拂过殿前古柏，藏经阁方向隐约传来竹帚轻扫银杏叶的沙沙微声。'),
      S('NPC-0101', '（遥遥穿过山风，传来一声若有若无的温和叹息）“慈悲为体，戒律为骨……善哉，善哉。”'),
      N('你深知继任方丈并非武道终点：西北边关狼烟渐起，西夏一品堂与星宿海早对中原虎视眈眈，藏经阁深处那场潜伏三十年的恩怨亦在悄然逼近。你轻抚肩头温暖厚重的达摩袈裟，目光澄澈而坚定：“无论前方是铁骑压境还是绝世强敌，少林有我，寸土不让。”'),
      N('【少林终局 · 慈悲方丈】已然铸成！你以无上悲愿与绝世武功承接达摩衣钵，登临少林掌门（Lv.5）尊位，名震大宋江山与天下武林！'),
    ],
    choices: [
      {
        id: 'slq38_complete',
        label: '身披【少林达摩袈裟】，正式执掌少林方丈之位（完成终局）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 5, promoteOnly: true },
          { type: 'giveItem', itemId: 'ARM-004', qty: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q38_rod_stance', op: 'eq', value: 'shield' },
            thenEffects: [{ type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 }],
            elseEffects: [{ type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 }],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q38_first_edict', op: 'eq', value: 'charity' },
            thenEffects: [
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
              { type: 'modifyChivalry', delta: 40, reason: '登位方丈首颁大开粥棚慈航法谕，活民无数' },
            ],
            elseEffects: [
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
              { type: 'addSectContribution', amount: 300 },
              { type: 'modifyRenown', delta: 40, reason: '登位方丈首颁重修藏经院法谕，光大南北禅林文脉' },
            ],
          },
          { type: 'giveCombatExp', amount: 1600, reason: '护持玄慈还业、力挫群邪并承接达摩袈裟登位少林慈悲方丈' },
          { type: 'modifyRenown', delta: 300, reason: '继任嵩山少林寺慈悲方丈，威震天下禅林与中原武林' },
          { type: 'modifyChivalry', delta: 100, reason: '以大慈大悲护持方丈骨肉、守正不阿，仁义传颂天下' },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'setFlag', flag: 'sl_ending', value: 'merciful_abbot' },
          { type: 'completeQuest', questId: SHAOLIN_Q38_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成终局《杖责还业 · 达摩传衣》！晋升少林 Lv.5 慈悲方丈，获天阶圣衣【少林达摩袈裟】，威望 +300，侠义 +100！',
            'success',
            '慈悲方丈',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_Q38_SCENES
