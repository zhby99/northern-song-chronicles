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
    learnedArts: [{ artId: 'MA-026', level: 9 }, { artId: 'MA-091', level: 10 }, { artId: 'MA-107', level: 9 }],
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
    learnedArts: [{ artId: 'MA-081', level: 8 }, { artId: 'MA-055', level: 9 }, { artId: 'MA-065', level: 9 }],
  })
}

export const SHAOLIN_Q38_SCENES: Record<string, StorySceneDef> = {
  scene_slq38_01: {
    id: 'scene_slq38_01',
    title: '第一幕 · 嵩山秋钟',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室峰霜叶尽染，寒风卷过琉璃重檐。大雄宝殿前的青铜大钟连撞三十六响，钟声沉郁苍凉，宛如千年古刹发出一声深沉的叹息。'),
      N('自前番旧案水落石出之后，方丈【玄慈】二十余年前与【叶二娘】的一段尘缘已传遍寺内外。此刻大雄正殿内外肃立着千余名少林僧众，更有闻讯赶来的各路江湖豪客与别院僧长，气氛凝重得仿佛一触即碎。'),
      S('NPC-0112', '（早已卸下红黄织金的方丈袈裟，仅着一袭洗得发白的灰布旧僧衣，静静跪在释迦牟尼金身之前的蒲团上，目光平静如水）“阿弥陀佛。你来了。”'),
    ],
    onFinishEffects: [openScene('scene_slq38_02', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_02: {
    id: 'scene_slq38_02',
    title: '第二幕 · 尘缘未隐',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（步上玉阶，望着那道二十二年来始终如山岳般庇护着少林、此刻却显得格外清瘦的背影，合十深深一礼）“方丈师伯，殿外诸路豪客议论纷纷，戒律院与达摩院亦各有争执。弟子已依前约稳住四十八房，只待方丈示下。”'),
      S('NPC-0112', '（微微颔首，唇边浮起一丝看破生死般的淡笑）“二十余载之前，老衲一念之差犯下大戒，累及叶二娘半生疯魔造孽，更令亲生骨肉流离孤苦。老衲贵为一寺方丈，岂能因贪恋虚名而令少林千年清规沦为一纸空文？”'),
      S('NPC-0127', '（玄难立于殿左，老泪纵横，哽咽出声）“方丈师兄！你掌寺三十载，劳苦功高，只消退居后山闭关思过便可，何必当众受那戒律刑杖啊！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_03', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_03: {
    id: 'scene_slq38_03',
    title: '第三幕 · 法不阿贵',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0156', '（玄痛手捧漆黑沉重的戒律玄铁禅杖，双目赤红却字字铿锵）“阿弥陀佛！少林戒律院立院五百年，上自方丈，下至行童，犯淫戒而累及大德者，依《少林清规》当受戒杖二百！师兄既愿以身明法，玄痛……纵使肝肠寸断，亦不敢徇私！”'),
      S('NPC-0112', '（朗声道）“玄痛师弟说得极是！当年老衲亲手定下的清规，今日若在老衲自己身上坏了，少林寺便真要亡于吾手！”'),
      P('（环视满殿悲恸与躁动交织的众僧，声音清越如金玉交鸣）“方丈坦荡担业，乃大慈大悲、大勇大悟之举！然公审受杖之际，寺外正有居心叵测的邪派宵小伺机生事。弟子请命亲立丹墀护持法场——既守少林千年戒律之公，亦护方丈及其母子免受宵小凌辱！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_04', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_04: {
    id: 'scene_slq38_04',
    title: '第四幕 · 佛前立誓',
    subtitle: '大雄正殿 · 玉阶丹墀',
    mandatory: true,
    beats: [
      S('NPC-0112', '（深深凝望你片刻，眼中满是欣慰与托付）“善哉……二十二载前你在山门外初叩佛阶，如今已是足以撑起少室半边天地的栋梁。今日之局，便有劳你护持了。”'),
      N('你合十应诺，立于大雄正殿金柱之侧。殿门大开，秋风卷着银杏落叶涌入殿堂，少林千年以来最悲壮的一场公审，正式启幕。'),
    ],
    choices: [
      {
        id: 'slq38_accept',
        label: '护持大雄正殿法场，见证玄慈方丈佛前受杖还业',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q38_QUEST_ID, stepId: 'confession_hall' },
          setStep(SHAOLIN_Q38_QUEST_ID, 'confession_hall'),
          toast('已开启终局《杖责还业 · 达摩传衣》！请于大雄正殿护持公审！', 'talk', '杖责还业'),
        ],
      },
    ],
  },

  scene_slq38_05: {
    id: 'scene_slq38_05',
    title: '第五幕 · 坦承旧罪',
    subtitle: '大雄正殿 · 丹墀广场',
    mandatory: true,
    beats: [
      N('大雄正殿前的丹墀之上，三千僧俗鸦雀无声。玄慈缓步走出殿门，面向天下群雄与满寺弟子，徐徐撩起灰布僧袍，双膝跪倒在冰冷的青石阶上。'),
      S('NPC-0112', '（声音浑厚清晰，传遍少室山谷）“阿弥陀佛！老衲玄慈，叨居少林方丈之位三十余载，德薄能鲜，愧对祖师与天下善信。二十四年前，老衲破佛门色戒，与叶二娘结下私情，生有一子，致使她半生沉沦魔障、造下无边杀业——此罪源头，皆在老衲一人！”'),
      N('话音落下，广场之上响起一片压抑不住的惊呼与叹息。数名江湖客面露轻蔑正欲冷嘲，却被你凌厉如电的目光扫过，顿时噤若寒蝉。'),
    ],
    onFinishEffects: [openScene('scene_slq38_06', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_06: {
    id: 'scene_slq38_06',
    title: '第六幕 · 禅辩镇场',
    subtitle: '大雄正殿 · 丹墀广场',
    mandatory: true,
    beats: [
      N('人群中仍有好事之徒高声叫嚷：“原来天下第一名刹的方丈也是个假正经！少林还有何面目号令中原武林！”'),
      P('（缓步踏前一步，声音不高却带着贯耳佛门狮子吼真气，震得广场松针簌簌而落）“诸位听真！圣贤亦有大过，唯小人饰非文过，君子坦荡认罪！方丈今日不隐不避、自卸法衣、自领二百玄铁戒杖，正是以血肉昭告天下——少林清规，连方丈亦不能豁免！试问江湖诸派，谁能有此风骨？！”'),
      N('一番话引经据典、掷地有声！原本蠢蠢欲动的江湖群豪竟被你震得齐齐默然，不少名门正派宿老更暗自点头称服。'),
    ],
    onFinishEffects: [openScene('scene_slq38_07', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_07: {
    id: 'scene_slq38_07',
    title: '第七幕 · 戒杖初落',
    subtitle: '大雄正殿 · 丹墀广场',
    mandatory: true,
    beats: [
      S('NPC-0112', '（冲玄痛微微闭目）“玄痛师弟，依律行刑吧。切记——不可留力，不可运柔劲相护，须使少林千年戒律昭然于日月之下。”'),
      S('NPC-0156', '（玄痛双手颤抖，高举乌沉沉的玄铁戒杖，含泪大喝）“少林戒律院执刑僧玄痛，奉达摩祖师遗训，行杖二百！一杖——！”'),
      N('“啪！”一声沉闷如雷的巨响！玄慈并未运起半点护体神功，任由数十斤重的铁杖狠狠砸落脊背，灰布僧衣瞬间绽裂，殷红鲜血染透青石！'),
    ],
    onFinishEffects: [openScene('scene_slq38_08', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_08: {
    id: 'scene_slq38_08',
    title: '第八幕 · 血染青阶',
    subtitle: '大雄正殿 · 丹墀法场',
    illustrationUrl: '/assets/quests/sl_38_xuanci_rod.jpg',
    illustrationCaption: '大雄宝殿前 · 玄慈卸去袈裟坦然自领戒律二百刑杖，血染青石以身明法',
    mandatory: true,
    beats: [
      N('一杖、十杖、五十杖、一百杖……每落下一杖，玄痛便老泪纵横一分，满场少林僧众齐齐跪倒在地，悲怆的诵经声如海潮般涌起：“南无阿弥陀佛……南无阿弥陀佛……”'),
      N('玄慈脊背早已血肉模糊，却自始至终脊梁挺得笔直，未曾发出一声呻吟。每挨一杖，他眉宇间郁结了二十余年的愧疚与阴霾，反倒散去一分。'),
      S('NPC-0233', '（被安置在西侧钟鼓禅院廊下的叶二娘遥遥望见血染丹墀，再也按捺不住，泣不成声）“大哥……大哥你别打了……都是奴家不好，奴家替你挨罢……”'),
    ],
    onFinishEffects: [openScene('scene_slq38_09', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_09: {
    id: 'scene_slq38_09',
    title: '第九幕 · 暗流骤起',
    subtitle: '大雄正殿 · 西廊告急',
    mandatory: true,
    beats: [
      N('刑杖行至一百五十记，满寺高僧与执事的目光尽数牵系在丹墀之上，山门西侧的防务一时现出破绽！'),
      N('忽听钟鼓禅院方向传来一阵凄厉的刀兵破空声与武僧怒喝！一名浑身浴血的知客僧踉跄奔上丹墀高呼：“报——！大批邪道恶徒翻越西墙闯入钟鼓禅院，扬言要趁乱活剐叶二娘母子，羞辱我少林！”'),
      S('NPC-0112', '（浑身剧震，一口鲜血险些喷出，强撑着回首望向西院，眼中满是焦灼与哀求）“阿弥陀佛……罪在老衲一人，吾儿虚竹自幼出家修行、全然无辜，二娘亦已悔悟……”'),
    ],
    onFinishEffects: [openScene('scene_slq38_10', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_10: {
    id: 'scene_slq38_10',
    title: '第十幕 · 请命护孤',
    subtitle: '大雄正殿 · 丹墀广场',
    mandatory: true,
    beats: [
      P('（一步跨至玄慈身前，沉声截断他的忧虑）“方丈安心还业！有弟子在，绝不容任何邪道宵小在少室山上伤及方丈骨肉与叶二娘一根毫毛！”'),
      S('NPC-0134', '（玄寂厉声道）“这群黑道鼠辈，竟敢趁我寺大难上门落井下石！师侄，大殿法场由老衲与玄难、玄痛守着，西院群邪便交予你雷霆荡平！”'),
      P('（衣袂鼓风，足尖点地掠向西院）“领命！诸位师伯放心！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_11', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_11: {
    id: 'scene_slq38_11',
    title: '第十一幕 · 疾驰钟院',
    subtitle: '大雄宝殿西廊 · 疾风骤起',
    mandatory: true,
    beats: [
      N('你施展少林绝顶轻功掠过回廊，只见钟鼓禅院演武坪上烟尘滚滚，十余名护院武僧已倒卧血泊，数十名凶神恶煞的黑道恶徒正将脸色惨白的叶二娘母子团团围在古钟之下！'),
    ],
    choices: [
      {
        id: 'slq38_go_west',
        label: '急赴【钟鼓禅院 · 演武坪】，截杀邪派恶徒护持母子',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q38_QUEST_ID, 'defend_mother_child'),
          toast('邪派恶徒正围攻钟鼓禅院！速赴【钟鼓禅院 · 演武坪】截杀群邪！', 'warn', '钟院护孤'),
        ],
      },
    ],
  },

  scene_slq38_12: {
    id: 'scene_slq38_12',
    title: '第十二幕 · 群邪逼母',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('演武坪中央，一名身披暗红皮裘、手提宽背血刀的魁梧巨枭正狞笑步步逼近，身旁另一名瘦如枯骨、十指乌黑的阴鸷老者阴恻恻地封住了叶二娘退路。'),
      S(SPEAKER_BLOOD_BLADE, '（横刀冷笑，杀气冲天）“嘿嘿！玄慈老秃驴这会儿正在前殿挨板子，少林群秃自顾不暇！叶二娘，你当年仗着四大恶人的名头横行江湖，今日落单在老子手里，看谁还能救你母子！”'),
      S(SPEAKER_YIN_CLAW, '（五指屈伸如鬼爪，发出咯咯怪笑）“先断这妖妇四肢，再提着她儿子的头去大雄宝殿给玄慈贺喜，岂不快哉！”'),
      S('NPC-0233', '（死死将怀中哭泣的少年护在身下，泪如雨下却寸步不退）“你们冲我来！千万别伤我孩儿……”'),
    ],
    onFinishEffects: [openScene('scene_slq38_13', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_13: {
    id: 'scene_slq38_13',
    title: '第十三幕 · 金刚怒目',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('“阿弥陀佛——！尔等畜生，也敢在少林佛地行凶作恶？！”'),
      N('一声清朗却如九霄惊雷般的佛喝震响演武坪！你如大鹏展翅般自钟楼飞檐凌空扑落，双足踏碎青砖，稳稳挡在叶二娘母子身前！'),
      P('（衣袍无风自动，宗师级浑厚佛门内力如潮水般铺开）“叶二娘前罪自有公论与因果报应，岂容尔等借机趁乱寻仇、玷污佛门清净地！血刀厉千煞、阴风阎三毒，今日你们既敢踏上少室山，便一并留下罢！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_14', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_14: {
    id: 'scene_slq38_14',
    title: '第十四幕 · 双魔合击',
    subtitle: '钟鼓禅院 · 演武坪（宗师 车轮连战 实战）',
    mandatory: true,
    beats: [
      S(SPEAKER_BLOOD_BLADE, '（瞳孔骤缩，随即凶性大发）“好深厚的少林内功！老鬼，这小子是少林真传长老，莫要单打独斗，咱们双魔并肩上，先剁了他再说！”'),
      S(SPEAKER_YIN_CLAW, '（厉啸一声，阴毒掌风卷起满地枯叶）“正合我意！接老夫的幽冥三毒爪！”'),
      N('血刀霸道惨烈，鬼爪阴狠刁钻，两名成名数十年的邪道宗师联手合围，杀气瞬间笼罩整个演武坪！'),
    ],
    choices: [
      {
        id: 'slq38_fight_evils',
        label: '以金刚怒目迎战【血刀厉千煞】与【阴风阎三毒】！（宗师级 车轮连战 决战）',
        subLabel: '护持叶二娘母子，荡平趁乱辱寺之邪徒',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q38_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBloodBladeBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildYinClawBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '背后便是叶二娘母子与少林千年威严，绝不可退！',
            introText: '【车轮连战 · 钟院护孤】于钟鼓禅院演武坪迎战邪道双魔【厉千煞】与【阎三毒】！',
            onWin: [openScene('scene_slq38_15', SHAOLIN_Q38_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('双魔刀爪合击极为凶悍，暂借古钟石柱回气再战！', 'warn', '钟院护孤'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq38_15: {
    id: 'scene_slq38_15',
    title: '第十五幕 · 佛掌伏魔',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('三十余合惊天动地的激战！演武坪青石板寸寸龟裂，古钟被激荡的真气震得嗡嗡长鸣！'),
      N('你抓住阎三毒鬼爪回气的一瞬破绽，身形如鬼魅切入中宫，一记蕴含二十二载禅武修为的佛门神掌重重印在其胸口，将这黑道老魔震飞三丈、筋脉寸断昏死在地！'),
      N('厉千煞见同伙顷刻溃败，亡魂大冒，挥血刀拼死劈出玉石俱焚的一斩。你不闪不避，双指并拢精准夹住森寒血刃，内劲一吐——“当啷”一声，百炼血刀断为三截，余劲轰得厉千煞口喷鲜血倒飞出院墙！'),
    ],
    onFinishEffects: [openScene('scene_slq38_16', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_16: {
    id: 'scene_slq38_16',
    title: '第十六幕 · 群邪胆寒',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('余下数十名黑道喽啰见两大邪道宗师转瞬一废一败，吓得魂飞魄散，丢下兵刃连滚带爬逃下少室山，再不敢回头半步！'),
      P('（缓缓收势，长吐一口浊气，转身扶起惊魂未定的叶二娘）“施主无恙否？恶徒已尽数伏诛，请安心携令郎前往大雄宝殿，见方丈最后一面罢。”'),
      S('NPC-0233', '（泪如泉涌，拉着儿子向你深深叩首）“多谢大师大恩大德……奴家半生作恶，临死前能见孩儿无恙、能再见大哥一面，已死而无憾……”'),
    ],
    onFinishEffects: [openScene('scene_slq38_17', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_17: {
    id: 'scene_slq38_17',
    title: '第十七幕 · 二百刑满',
    subtitle: '大雄正殿 · 丹墀广场',
    mandatory: true,
    beats: [
      N('待你护送叶二娘母子赶回大雄正殿前时，恰好听见玄痛声嘶力竭的最后一喝：“二百杖——毕！”'),
      N('最后一道铁杖落地，玄痛“扑通”一声跪倒在地，双手掩面痛哭失声。丹墀青石已被鲜血浸透，玄慈方丈浑身颤抖却终于缓缓睁开双眼，望见走来的叶二娘母子与安然无恙的你，苍白如纸的脸上竟绽出一抹如释重负的微笑。'),
    ],
    onFinishEffects: [openScene('scene_slq38_18', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_18: {
    id: 'scene_slq38_18',
    title: '第十八幕 · 回殿聆命',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('众僧含泪将气若游丝的玄慈抬入大雄正殿蒲团之上。玄慈微微抬手，目光穿过人群，定定落在你的身上。'),
      S('NPC-0112', '（气息微弱，却字字清朗）“你……过来……老衲尘缘已了，唯余少林千年衣钵……须亲手交托于你……”'),
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

  scene_slq38_19: {
    id: 'scene_slq38_19',
    title: '第十九幕 · 临终托孤',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大雄正殿内檀香袅袅，玄难、玄寂、玄痛、玄渡、玄生等玄字辈高僧悉数跪侍两侧。你疾步上前，单膝跪于玄慈榻前，握住他冰凉而满是旧茧的手。'),
      S('NPC-0112', '（转首望向扑在榻前泣不成声的叶二娘，轻声叹息）“二娘……这二十四年，苦了你了……孩儿已长大成人，心性纯善，老衲……无憾了。”'),
      S('NPC-0233', '（紧紧握住玄慈的手，泪珠滚落在他染血的衣襟上）“大哥，你莫怕黄泉路冷……奴家这就陪你一块儿去，下辈子咱们不做武林人，只做寻常夫妻……”'),
    ],
    onFinishEffects: [openScene('scene_slq38_20', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_20: {
    id: 'scene_slq38_20',
    title: '第二十幕 · 佛法正统',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0112', '（强提最后一口真气，望向满殿玄字辈师弟与你）“诸位师弟……老衲一生护寺，自问未敢懈怠，唯此一念之私铸成大错。如今少林外有辽夏窥伺、内有积弊待兴，非大智、大勇、大慈悲者不可掌舵！”'),
      S('NPC-0112', '（手掌轻拍你的手背，目光清澈如初雪）“二十二年来，老衲看你自山门起步，经三院磨砺、走遍天下州府，今日更以慈悲护法、以雷霆伏魔。你心怀戒律之公，亦存渡世之仁——这少林方丈之位，非你莫属！”'),
      P('（眼眶发热，伏地重重叩首）“方丈师伯厚爱如山，弟子何德何能……只愿师伯珍重法体，留住慧命！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_21', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_21: {
    id: 'scene_slq38_21',
    title: '第二十一幕 · 达摩传衣',
    subtitle: '大雄正殿 · 佛前传钵',
    illustrationUrl: '/assets/quests/sl_38_kasaya_handover.jpg',
    illustrationCaption: '大雄正殿 · 玄慈方丈圆寂前亲手将天阶圣衣《少林达摩袈裟》披于主角肩头，托付禅宗正统',
    mandatory: true,
    beats: [
      N('玄慈微微摇头，命玄难捧来那只供奉在达摩祖师像前、已历五百余年沧桑的紫檀鎏金宝匣。宝匣开启，一袭金丝梵文隐隐流光的绯红古袈裟映照满殿——正是少林镇寺天阶圣衣【少林达摩袈裟】！'),
      S('NPC-0112', '（竭尽残力起身半寸，亲手将沉甸甸的达摩袈裟披在你的双肩之上，替你抚平领口每一道褶皱）“衣钵相传，灯灯相续……从今往后，少林寺千年香火、天下禅宗正统，便尽数托付于你了！”'),
      N('袈裟上身的一瞬，仿佛五百年历代祖师与玄慈毕生的悲愿尽数沉沉压在双肩。你强忍热泪，双手合十：“弟子谨遵法旨，誓以毕生心血护持少林，不负祖师，不负师伯！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_22', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_22: {
    id: 'scene_slq38_22',
    title: '第二十二幕 · 含笑坐化',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0112', '（闻言露出最后一丝安详无碍的微笑，双掌缓缓合十于胸前，低诵佛号）“一切有为法，如梦幻泡影……如露亦如电，应作如是观……南无……阿弥陀佛……”'),
      N('佛号声渐渐消散在袅袅檀香之中。一代少林方丈玄慈，终以肉身还尽尘世业债，端坐蒲团，含笑圆寂。'),
      N('殿内殿外，千余名少林僧众齐齐伏地痛哭，哀恸之声震动嵩山林壑。'),
    ],
    onFinishEffects: [openScene('scene_slq38_23', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_23: {
    id: 'scene_slq38_23',
    title: '第二十三幕 · 叶落暮钟',
    subtitle: '大雄正殿 · 暮色残阳',
    illustrationUrl: '/assets/quests/sl_38_leaf_bell.jpg',
    illustrationCaption: '残阳暮钟 · 叶二娘于玄慈遗体旁自尽殉情，二十四载痴缠化作嵩山一缕秋风',
    mandatory: true,
    beats: [
      S('NPC-0233', '（轻轻拭去玄慈唇角最后一点血痕，痴痴凝望他安详的容颜，忽然凄然一笑）“大哥，你先走一步，二娘这就来追你了……”'),
      N('众僧尚未及阻拦，叶二娘已拔出藏于袖中的短刃，含笑自绝于玄慈身侧，鲜血与秋风卷入殿门的红叶融作一片。'),
      N('就在这一瞬，嵩山暮钟自行长鸣，余韵悠远悲凉，仿佛为这对痴缠二十余载的苦命人诵起最后的往生咒。'),
    ],
    onFinishEffects: [
      { type: 'markNpcsDead', npcIds: ['NPC-0112', 'NPC-0233'] },
      openScene('scene_slq38_24', SHAOLIN_Q38_QUEST_ID),
    ],
  },

  scene_slq38_24: {
    id: 'scene_slq38_24',
    title: '第二十四幕 · 众老合议',
    subtitle: '大雄正殿 · 禅堂议事',
    mandatory: true,
    beats: [
      N('三日之后，玄慈方丈法体入塔安葬，叶二娘亦由少林破例葬于山南清净坡，令其孤子得以春秋祭扫。少林四十八房高僧与诸院首座齐聚大雄正殿。'),
      S('NPC-0127', '（玄难拭干泪痕，向满堂高僧合十朗声道）“阿弥陀佛！国不可一日无君，寺不可一日无主。先方丈临终前当着满殿高僧的面，亲手将达摩祖师袈裟披于师侄肩头，此乃天意人心所归！”'),
      S('NPC-0134', '（玄寂与玄痛、玄渡、玄生齐齐步出班列）“先方丈遗命昭然，且新主二十二载苦修功德圆满，经义、武学、仁德皆冠绝当世！老衲等愿奉新主登坛升座，统摄少林！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_25', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_25: {
    id: 'scene_slq38_25',
    title: '第二十五幕 · 辞让难却',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（望向满堂须发皆白的玄字辈师伯，心头沉重而肃然）“诸位师伯德高望重，弟子虽承先方丈传衣，然少林千年基业重逾泰山，诚恐才疏德薄、有负众望……”'),
      S('NPC-0156', '（玄痛沉声一喝，竟向你单膝行大礼）“戒律院素来只认法度与公心！今日若非你既守戒律、又护全方丈骨肉、更以绝世武功震慑群邪，少林早已沦为天下笑柄！还请新方丈莫再推辞，早定寺纲！”'),
      S(SPEAKER_MONK_CHOIR, '（四十八房高僧齐齐合十躬身，声震大殿）“请新方丈登坛升座，光大禅宗！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_26', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_26: {
    id: 'scene_slq38_26',
    title: '第二十六幕 · 整衣登坛',
    subtitle: '大雄正殿 · 香云宝台',
    mandatory: true,
    beats: [
      N('晨光破雾，金辉洒满少室峰顶。大雄宝殿钟鼓齐鸣一百零八响，少林新任方丈升座大典正式启幕！'),
    ],
    choices: [
      {
        id: 'slq38_go_enthrone',
        label: '身披【少林达摩袈裟】，步上大雄正殿法座受四十八房礼拜',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q38_QUEST_ID, 'merciful_enthronement'),
          toast('请于【大雄正殿 · 佛前蒲团】登坛升座，继任少林慈悲方丈！', 'success', '慈悲升座'),
        ],
      },
    ],
  },

  scene_slq38_27: {
    id: 'scene_slq38_27',
    title: '第二十七幕 · 慈悲升座',
    subtitle: '嵩山少林寺 · 大雄正殿 · 升座大典',
    illustrationUrl: '/assets/quests/sl_38_merciful_abbot.jpg',
    illustrationCaption: '大雄宝殿 · 身披天阶达摩袈裟登坛升座，四十八房高僧与千余僧众合十恭迎新任慈悲方丈',
    mandatory: true,
    beats: [
      N('你身披金丝梵文流转的【少林达摩袈裟】，缓步踏上九级玉阶，在达摩祖师金身与历代方丈牌位之前转身端坐法座！'),
      N('刹那间，殿内四十八房高僧、殿外千余名罗汉堂、达摩院、戒律院与俗家护法弟子如潮水般齐齐合十下拜！'),
      S(SPEAKER_MONK_CHOIR, '“阿弥陀佛！恭迎少林新任方丈升座！愿佛日增辉，法轮常转，禅宗千秋不绝！”'),
    ],
    onFinishEffects: [openScene('scene_slq38_28', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_28: {
    id: 'scene_slq38_28',
    title: '第二十八幕 · 慈悲法旨',
    subtitle: '大雄正殿 · 方丈法座',
    mandatory: true,
    beats: [
      P('（端坐法座，声音清越宽厚，如春风化雨般传遍山门内外）“阿弥陀佛。今日承先方丈遗命与诸位师伯厚托，忝居少林方丈之位，敢立三愿于佛前——”'),
      P('“一愿戒律严明而不失悲悯，法不阿贵，亦不绝改过自新之路；二愿广开禅武慈航，赈济中原灾黎，护佑天下无辜孤寡；三愿少林永作中原正道砥柱，不论辽夏风雪几何，誓死护持社稷苍生！”'),
      N('三愿既出，满寺高僧动容赞叹，观礼的汴京大相国寺、洛阳白马寺与中原各派使者纷纷起身致贺！'),
    ],
    onFinishEffects: [openScene('scene_slq38_29', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_29: {
    id: 'scene_slq38_29',
    title: '第二十九幕 · 远眺中原',
    subtitle: '大雄宝殿 · 殿前丹墀',
    mandatory: true,
    beats: [
      N('大典毕，群客渐散。你独自立于大雄宝殿高阶之上，夕阳将你的身影拉得很长，达摩袈裟在晚风中猎猎作响。'),
      N('二十二年前初登少室山时的青涩身影仿佛就在昨日，而如今一肩挑起的，已是绵延五百年的天下武林泰山北斗。'),
    ],
    onFinishEffects: [openScene('scene_slq38_30', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_30: {
    id: 'scene_slq38_30',
    title: '第三十幕 · 扫叶微风',
    subtitle: '大雄宝殿 · 古柏之下',
    mandatory: true,
    beats: [
      N('一阵秋风拂过殿前古柏，远远望去，藏经阁方向隐约传来竹帚轻扫银杏叶的沙沙声。你心中微动，仿佛听见一声跨越山风的淡淡佛号。'),
      S('NPC-0101', '（遥遥传来一声若有若无的温和叹息）“慈悲为体，戒律为骨……善哉，善哉。”'),
    ],
    onFinishEffects: [openScene('scene_slq38_31', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_31: {
    id: 'scene_slq38_31',
    title: '第三十一幕 · 风云未歇',
    subtitle: '嵩山少林寺 · 山门远望',
    mandatory: true,
    beats: [
      N('你知道，继任方丈并非武道与人生的终点。西北边关狼烟渐起，西夏一品堂与星宿海早对中原武林虎视眈眈，而藏经阁深处那场潜伏三十年的恩怨，也正悄然逼近总决算之日。'),
      P('（轻抚肩头温暖而厚重的达摩袈裟，目光深邃坚定）“无论前方是铁骑压境，还是绝世强敌，少林有我，便寸土不让。”'),
    ],
    onFinishEffects: [openScene('scene_slq38_32', SHAOLIN_Q38_QUEST_ID)],
  },

  scene_slq38_32: {
    id: 'scene_slq38_32',
    title: '第三十二幕 · 慈悲方丈',
    subtitle: '嵩山少林寺 · 终局归位',
    mandatory: true,
    beats: [
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
