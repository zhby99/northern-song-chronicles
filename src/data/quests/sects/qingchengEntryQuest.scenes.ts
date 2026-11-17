import type { NodeNpc } from '../../../types/game'
import type { DynamicQuestNpc, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { QINGCHENG_ENTRY_QUEST_ID, QINGCHENG_QINGLAN_ACTOR_ID } from './qingchengEntryQuest'

const EXTRA_SCENES: Record<string, StorySceneDef> = {}
function regScene(sc: StorySceneDef): string {
  EXTRA_SCENES[sc.id] = sc
  return sc.id
}

const SPEAKER_SHEN_QINGLAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '沈清岚',
  title: '青城派 · 孤崖记名小师姐',
  factionName: '青城派',
  portraitUrl: '/assets/characters/templates/tpl_qingcheng_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_qingcheng_female_av.jpg',
}

const SPEAKER_SALT_BULLY: StorySpeakerSpec = {
  kind: 'custom',
  name: '牛三癞',
  title: '川东私盐脚头',
  factionName: '川东盐枭',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_MASKED_TAOIST: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑巾遮面道人',
  title: '后山夜行人 · 剑穗旧影',
  factionName: '神秘暗桩',
  portraitUrl: '/assets/characters/templates/tpl_qingcheng_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_qingcheng_av.jpg',
}

const SPEAKER_SALT_CAPTAIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '崔断江',
  title: '川东盐帮 · 亡命刀客',
  factionName: '川东盐枭',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildQinglanDynamicActor(opts: {
  regionId: string
  buildingId: string
  spotId: string | null
  title?: string
  badgeLabel?: string
  sectRank?: 1 | 2
  sectRankLabel?: string
  talk: string
}): DynamicQuestNpc {
  return {
    actorId: QINGCHENG_QINGLAN_ACTOR_ID,
    questId: QINGCHENG_ENTRY_QUEST_ID,
    regionId: opts.regionId,
    buildingId: opts.buildingId,
    spotId: opts.spotId,
    name: '沈清岚',
    title: opts.title ?? '青城派 · 孤崖记名小师姐',
    realm: '三流中品',
    badgeLabel: opts.badgeLabel ?? '松风引路',
    factionId: 'SECT-14',
    factionName: '青城派',
    sectRank: opts.sectRank ?? 1,
    sectRankLabel: opts.sectRankLabel ?? '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_qingcheng_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_qingcheng_female_fb.jpg',
    talk: opts.talk,
    stats: {
      hp: 460,
      mp: 320,
      agi: 30,
      res: 18,
      isBenchmark: false,
    },
    talents: {
      bone: 62,
      comprehension: 88,
      charm: 91,
    },
    equippedArts: {
      neigong: 'MA-228',
      qinggong: 'MA-197',
      move1: 'MA-148',
      move2: 'MA-206',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-228', level: 4, exp: 0 },
      { artId: 'MA-197', level: 3, exp: 0 },
      { artId: 'MA-148', level: 3, exp: 0 },
      { artId: 'MA-206', level: 4, exp: 0 },
    ],
    equipped: {
      weapon: 'WPN-074', // 巴蜀窄刃刺剑（凡阶中品）
      armor: 'ARM-043', // 蜀道油布雨衣（凡阶中品）
      shoes: 'BOT-021', // 道士云头布履（凡阶中品）
      bow: 'BOW-024', // 岭南藤木猎弓（凡阶中品）
      accessory1: 'ACC-046', // 青城松果挂坠（凡阶中品）
      accessory2: 'ACC-042', // 道观桃木辟邪符（凡阶中品）
      mount: 'MNT-024', // 川西剑阁栈道矮马（凡阶中品）
      curio1: null,
      curio2: null,
    },
  }
}

function buildWoodenSwordExaminerNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_QC_HOU_FENGYUAN_WOOD',
    name: '侯锋原（木剑三成力）',
    title: '青城俗家快剑手 · 山门试剑',
    realm: '不入流',
    factionId: 'SECT-14',
    factionName: '青城派',
    sectRank: 1,
    sectRankLabel: '外门执事',
    avatarUrl: '/assets/characters/templates/tpl_qingcheng_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_qingcheng_fb.jpg',
    stats: { hp: 145, mp: 55, agi: 8, res: 4 },
    talents: { bone: 56, comprehension: 53, charm: 65 },
    equippedArts: { neigong: 'MA-228', qinggong: 'MA-198', move1: 'MA-148' },
    learnedArts: [{ artId: 'MA-228', level: 1 }, { artId: 'MA-198', level: 1 }, { artId: 'MA-148', level: 1 }],
    equipped: { weapon: 'WPN-088', armor: 'ARM-046', shoes: 'BOT-019', bow: 'BOW-020', accessory1: 'ACC-046', accessory2: 'ACC-052', mount: 'MNT-023' },
    talk: '“小子，看好了！只要你能接下侯某手中桃木剑三合不倒，这上清宫偏院便容你扫十天落叶！”',
  })
}

function buildTangmenNightScoutNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_QC_TANG_NIGHT_SCOUT',
    name: '唐门夜巡哨卫',
    title: '蜀中唐门 · 外房探哨',
    realm: '不入流',
    factionId: 'SECT-13',
    factionName: '蜀中唐门',
    avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
    stats: { hp: 205, mp: 110, agi: 15, res: 7 },
    talents: { bone: 45, comprehension: 55, charm: 50 },
    equippedArts: { neigong: 'MA-227', qinggong: 'MA-197', move1: 'MA-175', move2: 'MA-204' },
    learnedArts: [{ artId: 'MA-227', level: 1 }, { artId: 'MA-197', level: 1 }, { artId: 'MA-175', level: 2 }, { artId: 'MA-204', level: 1 }],
    equipped: { weapon: 'WPN-085', armor: 'ARM-043', shoes: 'BOT-024', bow: 'BOW-024', accessory1: 'ACC-043', accessory2: 'ACC-046', mount: 'MNT-024' },
    talk: '“青城外院的毛头小子也敢坏本房好事？吃我一记甩手镖！”',
  })
}

function buildEmeiDiscipleSparNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_QC_LIU_HANZI_SPAR',
    name: '柳涵姿（压境试剑）',
    title: '峨眉派 · 下山历练女冠',
    realm: '三流下品',
    factionId: 'SECT-07',
    factionName: '峨眉派',
    avatarUrl: '/assets/characters/templates/tpl_emei_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_emei_female_fb.jpg',
    stats: { hp: 235, mp: 130, agi: 17, res: 9 },
    talents: { bone: 52, comprehension: 64, charm: 78 },
    equippedArts: { neigong: 'MA-161', qinggong: 'MA-158', move1: 'MA-130', move2: 'MA-136' },
    learnedArts: [{ artId: 'MA-161', level: 2 }, { artId: 'MA-158', level: 2 }, { artId: 'MA-130', level: 2 }, { artId: 'MA-136', level: 2 }],
    equipped: { weapon: 'WPN-074', armor: 'ARM-043', shoes: 'BOT-024', bow: 'BOW-020', accessory1: 'ACC-053', accessory2: 'ACC-040', mount: 'MNT-026' },
    talk: '“既替你家青城师兄出头，便请赐教三招，看青城剑法可配得上口中狂言！”',
  })
}

function buildSaltSmugglerCaptainNpc(weakened: boolean): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_QC_SALT_CAPTAIN',
    name: '崔断江',
    title: weakened ? '川东盐帮刀客（军心摇动）' : '川东盐帮 · 亡命刀客',
    realm: '三流下品',
    factionId: 'ORG-01',
    factionName: '川东盐枭',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    stats: { hp: weakened ? 230 : 290, mp: 120, agi: weakened ? 14 : 18, res: 9 },
    talents: { bone: 55, comprehension: 38, charm: 35 },
    equippedArts: { neigong: 'MA-230', qinggong: 'MA-197', move1: 'MA-189', move2: 'MA-207' },
    learnedArts: [{ artId: 'MA-230', level: 2 }, { artId: 'MA-197', level: 2 }, { artId: 'MA-189', level: 3 }, { artId: 'MA-207', level: 2 }],
    equipped: { weapon: 'WPN-076', armor: 'ARM-043', shoes: 'BOT-024', bow: 'BOW-024', accessory1: 'ACC-043', accessory2: 'ACC-041', mount: 'MNT-024' },
    talk: '“侯沧海断我川东百户盐工活路，凡穿青城道衣者，今日一个也别想过剑门栈道！”',
  })
}

function buildShenFengtaoExamNpc(flawRevealed: boolean): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_QC_SHEN_FENGTAO_EXAM',
    name: '申风涛（外门授剑压境）',
    title: flawRevealed ? '青城四秀（左肋换招已露破绽）' : '青城四秀 · 授剑考官',
    realm: '三流下品',
    factionId: 'SECT-14',
    factionName: '青城派',
    sectRank: 3,
    sectRankLabel: '真传弟子',
    avatarUrl: '/assets/characters/templates/tpl_qingcheng_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_qingcheng_fb.jpg',
    stats: { hp: flawRevealed ? 240 : 300, mp: 160, agi: flawRevealed ? 16 : 21, res: flawRevealed ? 8 : 12 },
    talents: { bone: 60, comprehension: 53, charm: 85 },
    equippedArts: { neigong: 'MA-228', qinggong: 'MA-139', move1: 'MA-148', move2: 'MA-206' },
    learnedArts: [{ artId: 'MA-228', level: 2 }, { artId: 'MA-139', level: 2 }, { artId: 'MA-148', level: 2 }, { artId: 'MA-206', level: 3 }],
    equipped: { weapon: 'WPN-041', armor: 'ARM-038', shoes: 'BOT-023', bow: 'BOW-024', accessory1: 'ACC-046', accessory2: 'ACC-038', mount: 'MNT-027' },
    talk: '“掌门师伯在上，申某将功力压至外门水准与你拆招——亮剑吧！”',
  })
}

const SCENE_QC_20A_JOINED_QINGCHENG: StorySceneDef = {
  id: 'scene_qc_20a_joined_qingcheng',
  title: '第二十幕 · 松风入袖同门行',
  subtitle: '青城山上清宫 · 松涛孤崖新同门',
  mandatory: true,
  beats: [
    N('三盏敬师清茶奉罢，执事道童将叠得方方正正的【青灰道袍】、一双轻便耐磨的【道士云头布履】与一柄三尺青钢长剑捧至你手中。余沧澜亲自执朱笔在《上清宫外门谱牒》录下你的名姓，复将一册墨迹苍劲的《青城松风剑》剑诀拍入你怀中。'),
    S('NPC-0139', '（余沧澜负手立于三清金身之下，声音沉雄）“入我青城门墙，须记『疾如松风，断如雷霆』八字！莫学庸人妇人之仁，勤修《青冥引气诀》与《松风剑》，攒够宗门功绩与实战火候，本座的《紫阳吐纳功》乃至镇派《松风辟邪剑》真卷，未尝不能传你！”'),
    N('礼成散班，漫天金黄银杏叶随山风旋舞。你换上素雅挺括的青城道衣步出主殿，却见沈清岚与恩师方正早已在通往松涛孤崖的石阶旁含笑相候。阳光穿过松针落在她白皙温润的颊边，往日眉宇间那抹化不开的孤寂阴霾，此刻竟已消融了大半。'),
    S(SPEAKER_SHEN_QINGLAN, '（沈清岚上下打量着你一身簇新的青灰道袍，眸光弯如新月，脆生生唤道）“小师弟（妹），这身道衣果真极衬你！师父方才已向掌门讨了准信，往后你虽挂名外门，平日却可随时来【松涛云海抚琴孤崖】练剑听琴——有你在山上作伴，清岚再也不觉得这三十六峰冷清了。”'),
    S('NPC-0354', '（方正抚须温声一笑）“青城山有丹泉暗流，亦有孤崖清风。孩子，守住你在青羊宫雨廊下的那颗初心——去吧，巴蜀山川辽阔，我青城道门的新气象，或许便系于你们这一代少年肩上！”'),
  ],
  onFinishEffects: [
    { type: 'joinSect', sectId: 'SECT-14', rank: 1 },
    { type: 'teachMartialArt', artId: 'MA-148', level: 1, exp: 3000, autoEquip: true },
    { type: 'modifyRenown', delta: 20, reason: '历经剑门风波，正式拜入巴蜀名门青城派' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0139' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0354' }, delta: 20 },
    // 若与沈清岚缘分深厚且偏重道心，方正与清岚额外私赠良阶【青城松风快剑】；若偏重铁血争锋，侯沧海赏银与门派功绩
    {
      type: 'branch',
      condition: {
        type: 'all',
        conditions: [
          flag('qc_qinglan_affinity', 'gte', 8),
          flag('qc_dao_heart', 'gte', 3),
        ],
      },
      thenEffects: [
        { type: 'giveItem', itemId: 'WPN-041', qty: 1 },
        toast('因你道心澄明且与沈清岚情义深笃，剑师【方正】将沈怀舟生前佩用的良阶利器【青城松风快剑】私下传予你护道！', 'success', '孤崖传剑'),
      ],
      elseEffects: [
        {
          type: 'branch',
          condition: flag('qc_ruthless_edge', 'gte', 3),
          thenEffects: [
            { type: 'giveSilver', amount: 30, reason: '副掌门侯沧海赏识锐气所赐纹银' },
            { type: 'addSectContribution', amount: 50 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0220' }, delta: 15 },
          ],
          elseEffects: [{ type: 'addSectContribution', amount: 30 }],
        },
      ],
    },
    // 若此前尚未获赠青城松果挂坠，入门礼成时沈清岚亦补赠一枚留念
    {
      type: 'branch',
      condition: { type: 'not', condition: { type: 'hasItem', itemId: 'ACC-046', qty: 1 } },
      thenEffects: [{ type: 'giveItem', itemId: 'ACC-046', qty: 1 }],
    },
    {
      type: 'spawnDynamicActor',
      actor: buildQinglanDynamicActor({
        regionId: 'qingcheng',
        buildingId: 'qc_shangqing',
        spotId: 'qc_sq_cliff',
        title: '青城派 · 孤崖入室师姐',
        badgeLabel: '同门知己',
        sectRank: 2,
        sectRankLabel: '内门弟子',
        talk: '“小师弟（妹），山中雾寒，练完《松风剑》记得来孤崖石炉旁喝碗热苦丁茶。有你在上清宫，我心里便格外踏实。”',
      }),
    },
    {
      type: 'completeQuest',
      questId: QINGCHENG_ENTRY_QUEST_ID,
      outcome: 'joined_qingcheng',
      combatExp: 90,
    },
    toast('正式拜入【青城派】授职外门弟子！习得良品剑法《青城松风剑》，获赐青灰道袍、云头布履、青萍游侠剑，小师姐沈清岚长驻抚琴孤崖！', 'success', '松风立契'),
  ],
}

const SCENE_QC_20B_FREE_WANDERER: StorySceneDef = {
  id: 'scene_qc_20b_free_wanderer',
  title: '第二十幕 · 拂衣下山天地宽',
  subtitle: '青城丹梯石坊 · 携气逍遥归沧海',
  mandatory: true,
  beats: [
    P('（你望着托盘中那袭青灰道袍，神色澄澈坦然，向着殿上三清法像与余沧澜、方正深深一揖）“承蒙掌门厚赐、方剑师授功大恩！只是晚辈一路行来，见惯了门户倾轧、名利相争；晚辈性本爱丘山，不愿受宗门藩篱羁绊。这袭道袍请留待更有缘之人，晚辈愿只携一缕青冥清气下山，做个无拘无束的逍遥散人！”'),
    S('NPC-0220', '（副掌门侯沧海脸色骤沉，按剑怒喝）“好狂妄的小子！学了我青城山的《青冥引气诀》，拍拍屁股便想下山？当我上清宫是成都府的茶馆不成！”'),
    S('NPC-0354', '（方正横琴一步跨出，朗声长笑）“侯师弟且慢！昔年老子西出函谷关，留下五千言《道德经》何曾向尹喜讨过半纸门状？这孩子救过本门弟子性命、护过剑门栈道周全，老夫传他一门筑基吐纳，乃是结善缘而非买奴仆！”'),
    S('NPC-0139', '（大殿死寂片刻，掌门余沧澜眯眼凝视你良久，忽而拂袖冷哼一声）“罢了！我青城派乃巴蜀堂堂大宗，还不至于为了一门筑基引气诀落人话柄。小子，记住你今日之言——行走江湖若堕了我青城吐纳的名头，莫怪松风快剑无情！准你下山！”'),
    N('卸去一切门规重压的刹那，你只觉胸中《青城青冥引气诀》真气豁然贯通百脉，连脚步都变得轻灵如燕！待你一身布衣步出丹梯石坊山门，幽林薄雾之间，忽有一阵温润清越的《鸥鹭忘机》琴音自古楠树下袅袅飘来——沈清岚怀抱七弦古琴独立石阶，正含泪带笑望着你。'),
    S(SPEAKER_SHEN_QINGLAN, '（沈清岚走上前，将一个装着十五两纹银与干粮的素布荷包塞入你手中，声音轻柔似水）“我昨晚便猜到，这重重殿宇困不住你这只云间白鹤。爹爹当年常叹自己一生被师门名分所累，你今日替他、也替清岚走出了一条最自在的路……江湖风大，若哪日走倦了，记得回青城孤崖看看清岚，炉上的苦丁春茶永远为你温着。”'),
  ],
  onFinishEffects: [
    { type: 'addArtExp', artId: 'MA-228', amount: 8500 },
    { type: 'teachMartialArt', artId: 'MA-197', level: 1, exp: 2000, autoEquip: true },
    { type: 'giveSilver', amount: 15, reason: '沈清岚山门送别所赠游历盘缠' },
    { type: 'giveFood', amount: 5 },
    { type: 'modifyChivalry', delta: 18, reason: '不慕名门权势，守本心拂衣下青城' },
    { type: 'modifyRenown', delta: 25, reason: '上清宫三清殿前婉拒掌门赐衣，携气逍遥下山传为美谈' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0354' }, delta: 25 },
    {
      type: 'branch',
      condition: { type: 'not', condition: { type: 'hasItem', itemId: 'ACC-046', qty: 1 } },
      thenEffects: [{ type: 'giveItem', itemId: 'ACC-046', qty: 1 }],
    },
    {
      type: 'spawnDynamicActor',
      actor: buildQinglanDynamicActor({
        regionId: 'qingcheng',
        buildingId: 'qc_shangqing',
        spotId: 'qc_sq_cliff',
        title: '青城派 · 孤崖抚琴故人',
        badgeLabel: '山中故人',
        sectRank: 2,
        sectRankLabel: '内门弟子',
        talk: '“你回来啦！外头的江湖可如你所愿那般辽阔？快坐下歇歇脚，我刚用松针雪水煎好了新茶，正想听你讲讲山外的故事呢。”',
      }),
    },
    {
      type: 'teleportPlayer',
      regionId: 'qingcheng',
      buildingId: null,
      spotId: null,
    },
    {
      type: 'completeQuest',
      questId: QINGCHENG_ENTRY_QUEST_ID,
      outcome: 'free_wanderer',
      combatExp: 90,
    },
    toast('拂衣辞青城，天地任逍遥！完整保留《青城青冥引气诀》（熟练度大幅精进）并顿悟轻功《提纵术》，获沈清岚赠盘缠 15 两，维持无门无派自由之身！', 'success', '逍遥散人'),
  ],
}

const SCENE_QC_19_THREE_PURE_CHOICE: StorySceneDef = {
  id: 'scene_qc_19_three_pure_choice',
  title: '第十九幕 · 三清殿前定去留',
  subtitle: '上清松风演剑主殿 · 衣钵与沧海',
  illustrationUrl: '/assets/quests/qingcheng_shangqing_choice.jpg',
  illustrationCaption: '上清松风演剑主殿 · 银杏金阶定拜师或逍遥',
  mandatory: true,
  beats: [
    N('翌日辰时，云开日出，上清松风演剑主殿钟鼓九响。两株千年古银杏在晨风中洒下漫天金叶，三足青铜大鼎内檀烟笔直冲霄。数十名青城内外院弟子按剑肃立丹墀两侧，气氛庄严肃穆。'),
    N('掌门【余沧澜】身披松纹八卦道袍立于高阶正中，副掌门【侯沧海】与抱琴剑师【方正】分列左右；一名执事道童双手高举朱漆木盘缓步走下石阶，盘中整齐叠放着青灰道袍、云头布履与一柄寒光湛然的三尺青锋。殿侧前排，沈清岚一袭素青道衣静静立于银杏树下，温润清亮的眸子紧紧凝望着你。'),
    S('NPC-0139', '（余沧澜声若洪钟，回荡在群峰幽谷之间）“今有少年行者，自锦官城青羊宫结缘登山，经孤崖引气、剑门浴血、银杏试剑，心性与筋骨皆堪造就！今在三清道祖法驾之前，你可愿受此青衣长剑，正式拜入我青城派门下？”'),
    N('山风拂过丹墀，吹动你朴素的布衣衣角。一步向前，便是巴蜀一流剑宗的快剑门徒，有恩师方正护持、小师姐清岚朝夕相伴；一步转身，则是挣脱门户暗流与规矩束缚，携一身初成青冥真气笑傲九州的自在散人——去留一念，全凭本心！'),
  ],
  choices: [
    {
      id: 'qc19_join_qingcheng',
      label: '【稽首奉茶 · 拜入青城】受道袍佩青锋，与清岚师姐共守青城清风！',
      subLabel: '正式加入【青城派】外门，获授良品《青城松风剑》及全套道门披挂',
      tone: 'jade',
      effects: [openScene('scene_qc_20a_joined_qingcheng', 'QST-SECT-14-ENTRY')],
    },
    {
      id: 'qc19_leave_as_wanderer',
      label: '【长揖谢恩 · 逍遥散人】婉拒道袍宗门羁绊，携《青冥引气诀》归隐江湖！',
      subLabel: '不入任何门派，完整保留《青城青冥引气诀》并顿悟轻功《提纵术》',
      tone: 'gold',
      effects: [openScene('scene_qc_20b_free_wanderer', 'QST-SECT-14-ENTRY')],
    },
  ],
}

function buildSceneQc18bQinglanMoonlight(temptKey: 'burn' | 'counter'): StorySceneDef {
  return {
    id: `scene_qc_18b_qinglan_moonlight_${temptKey}`,
    title: '第十八幕（续）· 孤崖月色照素心',
    subtitle: '松涛云海抚琴孤崖 · 大典前夜',
    mandatory: true,
    beats: [
      N(temptKey === 'burn'
            ? '你指尖真气微吐，借着石灯火苗将那半页记载着阴毒刺喉诡招的残纸烧成灰烬，向竹林暗处冷冷道：“回去告诉你们主子，我学剑只求光明磊落，不做卖友求荣的暗桩！”黑影讨了个没趣，悄然遁入夜雾。'
            : '你不动声色收起那二十两封口纹银，待黑影退走，转身便将那半页残纸呈交石室内的方正剑师。方正看罢长叹一声将其销毁，赞你临事有勇有谋，不堕奸人彀中。'),
      N('夜色渐深，一轮皎月升上三十六峰云海。忽见一盏素雅的青纱宫灯沿着崖边石径摇曳而来——沈清岚披着一件月白薄氅走到松树下，将温热的松花酿与两只白瓷小盏放在青石上，与你并肩坐看万顷银涛。'),
      S(SPEAKER_SHEN_QINGLAN, '（沈清岚双手捧着微温的瓷盏，月光映得她侧颜如玉，声音轻柔而坦诚）“这几日从青羊宫细雨到剑门关栈道，若非有你在身边，清岚只怕早已支撑不住。方才师父已正式许诺，明日大典之后便将我录入孤崖内门，侯副掌门再不敢轻易拿捏于我。”'),
      S(SPEAKER_SHEN_QINGLAN, '（她转过头，清澈温润的眼眸静静注视着你）“只是……你也亲眼瞧见了，上清宫重檐绿瓦虽美，内里却藏着太多争强好胜的暗流。明日三清殿前，你若愿留下来做我的同门，我自是欢喜万分，定倾囊陪你练剑抚琴；可你若向往山外无拘无束的天地，想带着《青冥引气诀》做个逍遥散人……不必顾虑清岚，只管顺着你自己的本心选，好么？”'),
    ],
    choices: [
      {
        id: 'qc18b_promise_sincerity',
        label: '【举盏对月】“无论明日身在门内门外，清岚师姐永远是在下此生挚友！”',
        tone: 'jade',
        effects: [
          { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
          { type: 'advanceShichen', count: 2 },
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          openScene('scene_qc_19_three_pure_choice', 'QST-SECT-14-ENTRY'),
        ],
      },
    ],
  }
}

const SCENE_QC_18_MOONLIGHT_TEMPTATION: StorySceneDef = {
  id: 'scene_qc_18_moonlight_temptation',
  title: '第十八幕 · 大典前夜暗香诱',
  subtitle: '上清宫后殿竹径 · 残页试忠邪',
  mandatory: true,
  beats: [
    N('外门授剑演武既毕，余沧澜谕令明日辰时于三清祖师神坛前正式举行收徒大礼。入夜时分，你独自回返孤崖偏院调息，途经后殿幽深竹径时，一阵阴冷夜风忽地吹灭了廊下石灯。'),
    S(SPEAKER_MASKED_TAOIST, '（竹影后转出一名黑巾遮面道人，压低嗓音将半页密密麻麻的剑图与一锭二十两纹银推到石栏上）“嘿，今日你在演武坪上露了脸，我家主事长老惜才！这半页乃是《松风辟邪剑》里专破峨眉剑法的诡刺残招——只要你日后留在方正老儿身边，每月将孤崖与峨眉往来的动静密报丹泉亭，荣华富贵与上乘快剑唾手可得！”'),
  ],
  choices: [
    {
      id: 'qc18_burn_page',
      label: '【凛然焚毁残页】“食君之禄忠君之事，岂做背刺恩师的小人！”',
      subLabel: '侠义 +10，道心坚定，沈清岚缘分提升',
      tone: 'jade',
      effects: [
        { type: 'modifyChivalry', delta: 10, reason: '严词拒绝充当内应，焚毁诡道残页' },
        { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 2 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 1 },
        openScene(regScene(buildSceneQc18bQinglanMoonlight('burn')), 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc18_counter_scheme',
      label: '【智取纹银转呈方正】（需先天悟性 ≥ 92 或 策论 ≥ 12）虚与委蛇收银，转手禀明方剑师',
      subLabel: '获纹银 +20 两，方正好感 +15',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需先天悟性 ≥ 92 或 十艺【策论】 ≥ 12',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 92 },
          { type: 'skillAtLeast', key: '策论', min: 12 },
        ],
      },
      effects: [
        { type: 'giveSilver', amount: 20, reason: '将计就计截获暗桩封口银' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0354' }, delta: 15 },
        { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 1 },
        openScene(regScene(buildSceneQc18bQinglanMoonlight('counter')), 'QST-SECT-14-ENTRY'),
      ],
    },
  ],
}

function buildSceneQc17AfterExam(didWin: boolean): StorySceneDef {
  return {
    id: didWin ? 'scene_qc_17b_exam_win' : 'scene_qc_17b_exam_grit',
    title: '第十七幕（续）· 青锋铮鸣震杏坛',
    subtitle: '上清松风演剑主殿 · 考校落定',
    mandatory: true,
    beats: [
      N(didWin
          ? '银杏金叶纷飞之间，你丹田内《青城青冥引气诀》清气沛然流转，果真在申风涛换招左肋微空的刹那欺身疾进，剑尖稳稳点在他护腕铜扣之上！满场外门弟子齐声喝彩！'
          : '申风涛浸淫青城快剑十余载，剑光如骤雨疾风绵密不绝。你虽内力尚浅被剑风逼退数步，却凭着《青冥引气诀》绵长韧性死守门户，直至收剑一刻仍握剑卓立、气度俨然！'),
      S('NPC-0459', didWin
          ? '（申风涛怔了一瞬，旋即收剑入鞘，抱拳爽快道）“好快的眼力！连我第三剑左肋换气的旧习都被你一眼看穿，申某输得心服口服！”'
          : '（申风涛收剑归鞘，颔首赞道）“刚习引气诀数日便能接下我十余剑而不乱阵脚，这份根基，确有资格入我上清门墙！”'),
      S('NPC-0139', '（掌门余沧澜在殿阶上微微颔首，袖袍轻拂）“善！筋骨与胆气皆已验明。你且回后院沐浴静心，明日辰时三刻，于三清祖师神坛前听候赐衣授剑！”'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      { type: 'giveCombatExp', amount: didWin ? 45 : 30, reason: '上清宫银杏坪外门授剑演武' },
      { type: 'addArtExp', artId: 'MA-228', amount: didWin ? 3500 : 2000 },
      openScene('scene_qc_18_moonlight_temptation', 'QST-SECT-14-ENTRY'),
    ],
  }
}

function buildSceneQc17OuterExam(stanceKey: 'protect' | 'dominate' | 'free'): StorySceneDef {
  const stanceReply = {
    protect:
      '“好一句『快剑如雷霆，本为涤荡阴霾、护佑一方水土』！”方正抚琴大慰，余沧澜却深深看了你一眼，淡淡道：“你这脾气，倒与三年前坠崖的沈怀舟一个模子刻出来的。”',
    dominate:
      '“哈哈，好一句『剑慢一分便是人为刀俎，当压过峨眉金顶』！”侯沧海抚掌畅笑，余沧澜嘴角亦掠过一丝深沉笑意：“少年人有这股争雄锐气，方不负我青城快剑威名！”',
    free:
      '“『不慕天下第一之名，亦不惧偏锋骂名，只求本心通明』……”余沧澜目光微凝，殿侧沈清岚更是眸泛异彩，唇角悄悄扬起一抹温柔弧度。',
  }[stanceKey]

  return {
    id: `scene_qc_17_outer_exam_${stanceKey}`,
    title: '第十七幕 · 银杏坪前试青锋',
    subtitle: '上清松风演剑主殿 · 外门授剑大比',
    mandatory: true,
    beats: [
      N(stanceReply),
      S('NPC-0139', '“不过，我青城派终归靠手中三尺青锋说话！申风涛，你出列将功力压至三流初境，试一试这位少侠几日来的吐纳剑术火候！”'),
      S('NPC-0933', '（趁你登坪前系紧护腕，老实火工申勇焱悄悄从殿柱后塞给你一块温热的松花麦饼，憨厚低语）“小兄弟，吃一口垫垫底气！俺老申在树下给你擂鼓助威！”'),
      S(SPEAKER_SHEN_QINGLAN, '（沈清岚亦借递剑之机，指尖轻点剑柄，用唯有你二人能听见的声音温声提醒）“申师兄性急，连攻两剑后左肋必有一瞬换气微滞——莫慌，运起《青冥引气诀》稳扎稳打便是。”'),
    ],
    choices: [
      {
        id: 'qc17_spar_with_hint',
        label: '【铭记清岚指点 · 登坪亮剑】凝神洞悉左肋破绽，堂堂正正应考！',
        subLabel: '气血内力全满上阵，看破申风涛换招破绽（点到为止，胜败皆过关）',
        tone: 'jade',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: QINGCHENG_ENTRY_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShenFengtaoExamNpc(true) },
            rule: 'spar',
            introText: '青城四秀【申风涛】压境出剑，你依沈清岚点拨凝视其左肋换招空隙！',
            onWin: [
              { type: 'modifyRenown', delta: 8, reason: '银杏坪演武击败压境考校的青城四秀申风涛' },
              openScene(regScene(buildSceneQc17AfterExam(true)), 'QST-SECT-14-ENTRY'),
            ],
            onLose: [openScene(regScene(buildSceneQc17AfterExam(false)), 'QST-SECT-14-ENTRY')],
            onDraw: [openScene(regScene(buildSceneQc17AfterExam(true)), 'QST-SECT-14-ENTRY')],
          },
        ],
      },
      {
        id: 'qc17_spar_head_on',
        label: '【纯凭自身硬实力 · 正面争锋】不借破绽提点，硬撼青城四秀全盛剑势！',
        subLabel: '申风涛保持完整压境战力，胜出额外获声望 +15',
        tone: 'primary',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: QINGCHENG_ENTRY_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShenFengtaoExamNpc(false) },
            rule: 'spar',
            introText: '你在上清宫众目睽睽之下正面迎战青城四秀【申风涛】！',
            onWin: [
              { type: 'modifyRenown', delta: 15, reason: '正面硬撼击败青城四秀申风涛，技惊上清宫' },
              openScene(regScene(buildSceneQc17AfterExam(true)), 'QST-SECT-14-ENTRY'),
            ],
            onLose: [openScene(regScene(buildSceneQc17AfterExam(false)), 'QST-SECT-14-ENTRY')],
            onDraw: [openScene(regScene(buildSceneQc17AfterExam(true)), 'QST-SECT-14-ENTRY')],
          },
        ],
      },
    ],
  }
}

const SCENE_QC_16_MASTER_YUCANGLAN: StorySceneDef = {
  id: 'scene_qc_16_master_yucanglan',
  title: '第十六幕 · 松风殿上掌门问',
  subtitle: '上清松风演剑主殿 · 松风真君余沧澜',
  mandatory: true,
  beats: [
    N('正在丹泉亭前剑拔弩张之际，“铛——铛——铛——”三声浑厚悠远的青铜钟鸣自上清松风演剑主殿轰然传出，震得亭畔井水波纹骤平。一名身材修长、双目开阖间精芒逼人的紫袍道长负手步出殿门，正是执掌青城派、位列当世一流上品高手的掌门“松风真君”【余沧澜】！'),
    S('NPC-0139', '（余沧澜淡淡扫了一眼侯沧海与方正，威严自生）“剑门关盐枭伏击之事，贾天鹤的飞鸽传书半个时辰前便已送到本座案头。两个小辈能在盐枭与暗箭之下全身而退，不曾丢我青城派的脸面——侯师弟，何必揪着区区火漆印痕大动干戈？”'),
    S('NPC-0139', '（余沧澜缓步走下丹墀，锐利如鹰隼的目光落在你身上）“年轻人，本座执掌上清宫二十载，中原武林提起巴蜀，人人皆赞峨眉金顶佛光普照、剑法端庄，却背地里议论我青城派剑走偏锋、专取咽喉手腕，失之道门冲和。你今日既立于我松风殿前，本座且问你——我青城这一剑，究竟该为何而出？”'),
  ],
  choices: [
    {
      id: 'qc16_ans_protect',
      label: '【护道佑民】“快剑如雷霆，雷霆本为涤荡阴霾、护佑苍生，失仁则沦为凶器！”',
      subLabel: '方正深表欣慰，清修道心 +2',
      tone: 'jade',
      effects: [
        { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 2 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0354' }, delta: 15 },
        openScene(regScene(buildSceneQc17OuterExam('protect')), 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc16_ans_dominate',
      label: '【争雄立宗】“乱世江湖剑慢一分便受制于人，唯压过峨眉金顶方显青城威名！”',
      subLabel: '投合余沧澜与侯沧海霸业雄心，偏锋锐气 +2',
      tone: 'danger',
      effects: [
        { type: 'addFlagNumber', flag: 'qc_ruthless_edge', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0139' }, delta: 10 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0220' }, delta: 15 },
        openScene(regScene(buildSceneQc17OuterExam('dominate')), 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc16_ans_free_heart',
      label: '【问心无愧】“不慕天下第一虚名，亦不惧偏锋毁誉，一剑出鞘但求本心通明！”',
      subLabel: '自在通透，深契沈清岚心意',
      tone: 'gold',
      effects: [
        { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 1 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
        openScene(regScene(buildSceneQc17OuterExam('free')), 'QST-SECT-14-ENTRY'),
      ],
    },
  ],
}

const SCENE_QC_15_TWO_FACTIONS_CLASH: StorySceneDef = {
  id: 'scene_qc_15_two_factions_clash',
  title: '第十五幕 · 丹泉问罪两脉争',
  subtitle: '鸳鸯古井丹泉八角亭 · 抱琴护犊',
  mandatory: true,
  beats: [
    N('穿过山腰浓雾踏回上清宫，尚未行至演剑主殿，副掌门“巴山快剑”【侯沧海】已带着巴武、侯锋原等一众内院执事拦在鸳鸯古井丹泉八角亭前。古井寒气森森，侯沧海鹰视狼顾，目光如刀刮过沈清岚包扎着白布的左肩与你风尘仆仆的衣衫。'),
    S('NPC-0220', '（侯沧海冷笑一声，袍袖无风自动）“好大的胆子！奉命往剑门关送一封手札，不但沿途与峨眉、盐枭纠缠不清，连火漆密函都染了雨水汗渍！来人——按上清宫戒律，先废去这外姓小子偷学未久的《青冥引气诀》，再将沈清岚罚入后山思过三年！”'),
    S(SPEAKER_SHEN_QINGLAN, '（沈清岚脸色苍白却一步跨到你身前，字字铿锵）“侯师叔！剑门关外盐枭设伏、唐门毒钉灭口，皆与信中借刀杀人之计有关，与他毫无干系！你当年逼我爹爹沈怀舟就范不成害他坠崖，今日还要拿门规杀人灭口么？！”'),
    S('NPC-0354', '（“铮——”地一声清越琴音破雾而来，剑师方正怀抱古琴踏阶而至，铁臂一振便将逼上前来的两名执事震退三步，须发微张）“侯师弟！沈师弟三年前为守我青城百年清誉尸骨未寒，今日老夫这把老骨头尚在，看谁敢动他孤女与这孩子一根毫毛！”'),
  ],
  choices: [
    {
      id: 'qc15_stand_firm',
      label: '【并肩而立 · 凛然无惧】“是非曲直自有公论，晚辈愿随二位前辈上松风主殿对质！”',
      tone: 'primary',
      effects: [
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 1 },
        openScene('scene_qc_16_master_yucanglan', 'QST-SECT-14-ENTRY'),
      ],
    },
  ],
}

function buildSceneQc14AfterChoice(choiceKey: 'qi_heal' | 'carry_run' | 'leave_inn'): StorySceneDef {
  const isSaved = choiceKey !== 'leave_inn'
  return {
    id: `scene_qc_14b_rain_cave_${choiceKey}`,
    title: isSaved ? '第十四幕（续）· 松果系腕许生死' : '第十四幕（续）· 孤骑冒雨先归山',
    subtitle: '剑门蜀道山腰 · 寒雨定缘',
    mandatory: true,
    beats: isSaved
      ? [
          N(choiceKey === 'qi_heal'
                ? '巴山夜雨敲打着古洞外的悬崖翠柏。你盘膝坐于篝火之畔，双掌抵住沈清岚微颤的肩背，将丹田内初成的《青城青冥引气诀》真气毫无保留地渡入她经脉之中。一缕缕幽蓝寒毒顺着指尖逼出化作黑水，待天色微明，你已是唇色惨白、汗透重衣，沈清岚颊边却终于恢复了一抹温润血色。'
                : '你凭着过人根骨攀上湿滑崖壁采来七叶一枝花捣碎敷住她肩头毒创，随即撕下布衫长条将虚弱的沈清岚稳稳背在背上，冒着瓢泼山雨在崇山峻岭间昼夜疾奔百余里，硬生生在第三日黄昏前望见了青城山云雾！'),
          S(SPEAKER_SHEN_QINGLAN, '（沈清岚眼眶通红，晶莹泪珠无声滑落，颤抖着解下腰间那枚磨得温润发亮、刻着细密云纹的【青城松果挂坠】，轻轻系在你的手腕之上）“这枚冷杉松果，是爹爹生前亲手雕给我辟邪安神的唯一念想……今日若无你舍命相护，清岚早已葬身剑门荒谷。从今往后，无论师门风雨如何变幻，清岚这条命与这份心意，都记在你身上。”'),
          P('“清岚师姐言重了！青羊宫廊下一盏热茶之谊，本就重逾千金。走吧，咱们一道回上清宫，看那侯沧海还能颠倒黑白到几时！”'),
        ]
      : [
          N('你留下五两碎银托翠云廊老驿卒替沈清岚延请郎中拔毒，自己则依足门规限期策步赶回青城山。雨幕之中，沈清岚靠在驿亭木柱边默默望着你远去的背影，按住了腰间那枚松果挂坠，终究没有多说半句挽留的话。'),
        ],
    onFinishEffects: [
      ...(isSaved
        ? [
            { type: 'giveItem' as const, itemId: 'ACC-046', qty: 1 },
            { type: 'setFlag' as const, flag: 'qc_saved_qinglan_life', value: true },
            {
              type: 'addFlagNumber' as const,
              flag: 'qc_qinglan_affinity',
              delta: choiceKey === 'qi_heal' ? 5 : 4,
            },
            { type: 'addFlagNumber' as const, flag: 'qc_dao_heart', delta: 2 },
            { type: 'modifyChivalry' as const, delta: 12, reason: '剑门寒雨舍身护同门沈清岚周全' },
          ]
        : [
            { type: 'giveSilver' as const, amount: -5, reason: '留予翠云廊驿卒照料沈清岚药资' },
            { type: 'addFlagNumber' as const, flag: 'qc_ruthless_edge', delta: 2 },
            { type: 'addFlagNumber' as const, flag: 'qc_qinglan_affinity', delta: -2 },
          ]),
      {
        type: 'spawnDynamicActor',
        actor: buildQinglanDynamicActor({
          regionId: 'qingcheng',
          buildingId: 'qc_shangqing',
          spotId: 'qc_sq_hall',
          badgeLabel: '上清对质',
          talk: '“我们已经回到上清宫了，深吸一口气，去面见师父与余掌门吧。”',
        }),
      },
      {
        type: 'setQuestStep',
        questId: QINGCHENG_ENTRY_QUEST_ID,
        stepId: 'shangqing_final_ceremony',
        deadlineDays: null,
      },
      toast(isSaved
          ? '获沈清岚赠予贴身信物【青城松果挂坠】！请返回【青城山 / 唐家堡 · 青城山上清宫松风殿】复命！'
          : '已启程返山，请前往【青城山 / 唐家堡 · 青城山上清宫松风殿】复命。', isSaved ? 'success' : 'talk', '蜀道寒雨'),
    ],
  }
}

const SCENE_QC_14_SAVE_QINGLAN: StorySceneDef = {
  id: 'scene_qc_14_save_qinglan',
  title: '第十四幕 · 蜀道寒雨护清岚',
  subtitle: '剑门关外幽林 · 毒钉暗算与门规严限',
  mandatory: true,
  beats: [
    N('盐帮刀客崔断江见双剑合璧锐不可当，虚晃一刀便领残众退入栈道密林。正当你们收剑喘息之际——“嗤！”林冠黑影里骤然射出一枚幽蓝细芒，悄无声息直取沈清岚后心要害！'),
    N('你骇然疾呼推开她半尺，那枚淬满寒毒的唐门【子午透骨钉】仍擦破了沈清岚左肩道衣！她闷哼一声跌坐在湿冷青石上，创口瞬间凝起一层紫黑霜气；与此同时，雄关箭楼高处贾天鹤冷漠的声音随山风传下：“信已交妥，限尔等三日之内赶回上清宫销差，逾时半刻按叛门重处！”说罢竟重重关闭了关楼大门！'),
    S(SPEAKER_SHEN_QINGLAN, '（沈清岚冻得唇色发紫，却强撑着推了推你的手臂，声音微弱）“是昨晚后山那个暗桩想借盐帮之乱杀人灭口……这透骨钉寒毒入脉极快，带着我三日内绝赶不回青城山。你……你尚未正式入派，快自己回山复命，莫被我连累废了功力……”'),
  ],
  choices: [
    {
      id: 'qc14_qi_detox',
      label: '【生死不弃 · 运功逼毒】管他什么门规限期！寻古洞以《青冥引气诀》彻夜替她逼毒！',
      subLabel: '大增沈清岚生死情缘（获赠信物【青城松果挂坠】），侠义 +12',
      tone: 'jade',
      effects: [openScene(regScene(buildSceneQc14AfterChoice('qi_heal')), 'QST-SECT-14-ENTRY')],
    },
    {
      id: 'qc14_carry_and_sprint',
      label: '【悬崖采药 · 背负狂奔】（需先天根骨 ≥ 92）采草药封住寒毒，背起清岚冒雨狂奔百里归山！',
      subLabel: '铁骨担当两全其美！获赠【青城松果挂坠】且不逾门规半步',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '根骨', min: 92 },
      effects: [openScene(regScene(buildSceneQc14AfterChoice('carry_run')), 'QST-SECT-14-ENTRY')],
    },
    {
      id: 'qc14_leave_at_post',
      label: '【先顾门规 · 托付驿卒】（需纹银 ≥ 5 两）留五两银子请驿卒延医，自己按期赶回上清宫',
      subLabel: '免受延误之责，但沈清岚心中黯然',
      tone: 'default',
      condition: { type: 'silverAtLeast', min: 5 },
      effects: [openScene(regScene(buildSceneQc14AfterChoice('leave_inn')), 'QST-SECT-14-ENTRY')],
    },
  ],
}

const SCENE_QC_13_JIANMEN_AMBUSH: StorySceneDef = {
  id: 'scene_qc_13_jianmen_ambush',
  title: '第十三幕 · 雄关箭楼伏盐枭',
  subtitle: '剑门雄关箭楼 · 双剑并肩退强敌',
  mandatory: true,
  beats: [
    N('大小剑山七十二峰如利剑攒天，一夫当关，万夫莫开。你们登临【剑门雄关箭楼】，将火漆手札呈交镇守川北的天师洞长老“青城鹤道人”【贾天鹤】。贾天鹤扫了一眼信封，阴鸷的三角眼在你与沈清岚脸上转了一圈，嘿然冷笑。'),
    S('NPC-0221', '“侯师弟信中之意，老夫已然知晓。你们两个娃娃既送完了信，便自己走古栈道回青城山去吧——哦，顺带提一句，今日关外栈道来了几条川东盐帮的疯狗，你们自求多福！”'),
    S(SPEAKER_SALT_CAPTAIN, '（话音未落，关外悬空栈道竹哨骤响，川东盐帮刀客崔断江提着一口厚背砍刀领人堵死去路，双目赤红）“青城派的杂毛道士！侯沧海勾结暗器毒手害死我盐帮十几个弟兄，今日拿你们祭旗！”'),
    S(SPEAKER_SHEN_QINGLAN, '（仰头见箭楼上的贾天鹤竟抱臂冷眼旁观，沈清岚拔出腰间松风细剑，与你背靠背站定，轻声道）“贾长老是侯沧海一党，故意借盐帮的刀试探我们！别怕，你的《青冥引气诀》已成气候，我护你左翼，咱们并肩杀出去！”'),
  ],
  choices: [
    {
      id: 'qc13_persuade_then_fight',
      label: '【晓以利害 · 瓦解敌势】（已获茶肆预警 或 策论 ≥ 12）先揭穿侯沧海借刀毒计，动摇盐枭军心再战！',
      subLabel: '崔断江军心摇动战力下降，且小师姐沈清岚作为盟友并肩参战',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需在成都茶肆探得盐帮设伏风声 或 十艺【策论】 ≥ 12',
        conditions: [
          flag('qc_salt_ambush_warned', 'truthy'),
          { type: 'skillAtLeast', key: '策论', min: 12 },
        ],
      },
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: QINGCHENG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildSaltSmugglerCaptainNpc(true) },
          allies: [{ kind: 'dynamicActor', actorId: QINGCHENG_QINGLAN_ACTOR_ID }],
          rule: 'story_trial',
          introText: '你一言道破盐帮受人挑拨之局，随即与小师姐【沈清岚】双剑并肩迎敌！',
          onWin: [
            { type: 'giveCombatExp', amount: 40, reason: '剑门栈道与沈清岚并肩击退川东盐枭' },
            openScene('scene_qc_14_save_qinglan', 'QST-SECT-14-ENTRY'),
          ],
          onLose: [openScene('scene_qc_14_save_qinglan', 'QST-SECT-14-ENTRY')],
          onDraw: [openScene('scene_qc_14_save_qinglan', 'QST-SECT-14-ENTRY')],
        },
      ],
    },
    {
      id: 'qc13_direct_shoulder_to_shoulder',
      label: '【双剑合璧 · 并肩破围】运起《青冥引气诀》，与清岚师姐同进同退杀开血路！',
      subLabel: '小师姐沈清岚作为盟友并肩助阵（胜败皆可推进剧情）',
      tone: 'primary',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: QINGCHENG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildSaltSmugglerCaptainNpc(false) },
          allies: [{ kind: 'dynamicActor', actorId: QINGCHENG_QINGLAN_ACTOR_ID }],
          rule: 'story_trial',
          introText: '剑门古栈道风声鹤唳，小师姐【沈清岚】拔剑护在你身侧并肩迎战崔断江！',
          onWin: [
            { type: 'giveCombatExp', amount: 45, reason: '剑门栈道与沈清岚浴血破围' },
            openScene('scene_qc_14_save_qinglan', 'QST-SECT-14-ENTRY'),
          ],
          onLose: [openScene('scene_qc_14_save_qinglan', 'QST-SECT-14-ENTRY')],
          onDraw: [openScene('scene_qc_14_save_qinglan', 'QST-SECT-14-ENTRY')],
        },
      ],
    },
  ],
}

const SCENE_QC_12_PINE_WAX_SEAL: StorySceneDef = {
  id: 'scene_qc_12_pine_wax_seal',
  title: '第十二幕 · 翠云古柏验火漆',
  subtitle: '剑门关 · 翠云廊古柏驿亭',
  mandatory: true,
  beats: [
    N('出成都北上三百里，汉唐古柏夹道蔽日，苍翠如云，已抵入蜀咽喉【剑门关 · 翠云廊古柏驿亭】。山雨欲来，沈清岚在驿亭石桌旁歇脚擦汗，从怀中取出那封由丹泉亭转交、命送往剑门箭楼贾天鹤长老的火漆密函。'),
    S(SPEAKER_SHEN_QINGLAN, '（沈清岚指尖轻轻抚过信封背面的朱红松脂印，秀眉微蹙）“奇怪……上清宫掌门正印向来掺有青城白蜡，色泽温润；这枚火漆边缘却泛着乌紫硫磺气，倒像是唐门外房常用的封泥。三年前我爹爹沈怀舟也是奉命往剑门关送过这样一封密信，便再也没有活着回来……”'),
  ],
  choices: [
    {
      id: 'qc12_inspect_seal_clever',
      label: '【日光斜照 · 不损火漆辨墨迹】（需先天悟性 ≥ 92 或 算术/书 ≥ 12）借亭外天光透视夹层字迹',
      subLabel: '不留痕迹查明沈怀舟旧案与嫁祸峨眉真相，沈清岚缘分大增',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需先天悟性 ≥ 92 或 十艺【算术】 ≥ 12 或 十艺【书】 ≥ 12',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 92 },
          { type: 'skillAtLeast', key: '算术', min: 12 },
          { type: 'skillAtLeast', key: '书', min: 12 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'qc_full_truth', value: true },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 3 },
        { type: 'modifySkill', key: '书', delta: 2 },
        toast('借光辨出密函真容：侯沧海私结唐门外房毒杀盐帮头目并栽赃峨眉，三年前沈父正是因阻止此毒计遇害！', 'talk', '古柏验信'),
        openScene('scene_qc_13_jianmen_ambush', 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc12_keep_seal_intact',
      label: '【谨守信义 · 暗记异状防备】劝师姐勿拆火漆免落口实，但扣紧兵刃提防贾天鹤生变',
      subLabel: '稳重周全，沈清岚颔首赞同，立即登临雄关箭楼呈信',
      tone: 'primary',
      effects: [
        { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 1 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 1 },
        openScene('scene_qc_13_jianmen_ambush', 'QST-SECT-14-ENTRY'),
      ],
    },
  ],
}

function buildSceneQc11AfterTeahouse(mode: 'righteous' | 'spar' | 'charm'): StorySceneDef {
  const modeNarrative = {
    righteous:
      '你上前向峨眉派【静虚师太】与【柳涵姿】郑重稽首，朗声道：“川西佛道同源，本门两位师兄酒后失言，晚辈代为赔罪！”言辞既不卑躬屈膝，又处处合乎江湖礼数。静虚师太神色稍霁，冷哼一声赞道：“方正门下总算还有两个懂规矩的后生！”跋扈的青城俗家弟子亦讪讪退下。',
    spar:
      '你横剑上前接下峨眉女冠【柳涵姿】三招轻灵剑刺，剑风激荡震翻两只盖碗茶盅，双方各退半步。静虚师太拂尘一摆止住徒儿：“青城新弟子倒有几分底子，咱们走！”虽助同门撑住了场面，沈清岚却轻叹巴蜀两派梁子只怕愈结愈深。',
    charm:
      '你含笑唤来茶博士，掏出八两碎银替满堂茶客与峨眉师太换上新焙的蒙顶甘露，风仪潇洒、妙语解颐，顷刻间将一场剑拔弩张化作春风一笑。临行前茶博士感念你豪爽，悄悄附耳提醒：“小客官若往剑门关去，切莫走夜路——这两日川东盐帮的好汉正提着大刀在关外寻青城派晦气呢！”',
  }[mode]

  return {
    id: `scene_qc_11b_teahouse_after_${mode}`,
    title: '第十一幕（续）· 茶罢挥鞭指剑门',
    subtitle: '成都府锦江万里桥茶肆 · 启程北上',
    mandatory: true,
    beats: [
      N(modeNarrative),
      S(SPEAKER_SHEN_QINGLAN, '（采办妥当道观茶盐，沈清岚将包裹束于背上，遥望北方苍莽横亘的秦巴群山）“成都茶肆之事已了，接下来便是这趟差事最紧要的一程——北上【剑门关 · 翠云廊古柏驿亭】，将手札送交守关的贾天鹤长老。山高路险，咱们这便动身吧！”'),
    ],
    onFinishEffects: [
      {
        type: 'spawnDynamicActor',
        actor: buildQinglanDynamicActor({
          regionId: 'jianmenguan',
          buildingId: 'jm_pine',
          spotId: 'jm_pine_main',
          badgeLabel: '剑门送信',
          talk: '“三百里翠云廊古柏阴森，这封火漆手札有些蹊跷，咱们借着亭中天光仔细瞧瞧。”',
        }),
      },
      {
        type: 'setQuestStep',
        questId: QINGCHENG_ENTRY_QUEST_ID,
        stepId: 'jianmen_delivery',
        deadlineDays: null,
      },
      toast('成都茶肆风波已平！请北上前往【剑门关 · 翠云廊古柏驿亭】会合沈清岚呈递手札！', 'success', '北上剑门'),
    ],
  }
}

const SCENE_QC_11_TEAHOUSE_EMEI: StorySceneDef = {
  id: 'scene_qc_11_teahouse_emei',
  title: '第十一幕 · 万里桥头剑尼嗔',
  subtitle: '成都府 · 锦江万里桥茶肆',
  mandatory: true,
  beats: [
    N('携着初成的青冥内息与沈清岚重返繁华锦官城，刚步入【锦江万里桥茶肆】二楼凭栏雅座，便听得一阵拍案冷笑——两名侯沧海麾下的青城俗家弟子正斜挎长剑霸占临江桌席，指着邻桌素衣持剑的峨眉派女冠高声讥嘲。'),
    S('NPC-0458', '（峨眉弟子柳涵姿按剑怒起，杏眼圆睁）“无礼狂徒！这临江席位分明是我师徒二人先定下的，你们青城派强占座头也就罢了，竟敢出言侮辱我峨眉金顶清誉！”'),
    S('NPC-0206', '（端坐席间的峨眉高人“锦江剑尼”静虚师太缓缓解下背后长剑，寒声道）“看来余沧澜在山上只教你们练快剑，不曾教你们半点尊卑礼数！今日贫尼便替你们师长管教一二！”'),
    S(SPEAKER_SHEN_QINGLAN, '（沈清岚暗道不好，低声向你急语）“静虚师太乃是峨眉一流高手，两位俗家师兄明明理亏却骑虎难下——咱们该如何处置？”'),
  ],
  choices: [
    {
      id: 'qc11_fair_apology',
      label: '【秉公执礼 · 不护短】上前向静虚师太稽首赔礼，严辞劝退无礼同门！',
      subLabel: '侠义 +10，静虚师太好感 +15，沈清岚赞许道心',
      tone: 'jade',
      effects: [
        { type: 'modifyChivalry', delta: 10, reason: '万里桥茶肆秉公调解青城与峨眉纷争' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0206' }, delta: 15 },
        { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 2 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
        openScene(regScene(buildSceneQc11AfterTeahouse('righteous')), 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc11_charm_tea_treat',
      label: '【风仪解围 · 奉茶探风】（需风姿颜值 ≥ 92 或 纹银 ≥ 8 两）请满座品蒙顶茶化干戈，顺探蜀道情报',
      subLabel: '消弭剑气，并从茶博士口中获知【剑门关盐帮设伏】关键预警！',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需风姿颜值 ≥ 92 或 随身纹银 ≥ 8 两',
        conditions: [
          { type: 'talentAtLeast', key: '颜值', min: 92 },
          { type: 'silverAtLeast', min: 8 },
        ],
      },
      effects: [
        {
          type: 'branch',
          condition: { type: 'talentAtLeast', key: '颜值', min: 92 },
          thenEffects: [{ type: 'modifySkill', key: '辩才', delta: 2 }],
          elseEffects: [{ type: 'giveSilver', amount: -8, reason: '锦江茶肆请峨眉师太与茶客品蒙顶茶' }],
        },
        { type: 'setFlag', flag: 'qc_salt_ambush_warned', value: true },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
        openScene(regScene(buildSceneQc11AfterTeahouse('charm')), 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc11_spar_emei',
      label: '【同门一体 · 接剑撑场】横剑替青城师兄接下柳涵姿三招考校！',
      subLabel: '与峨眉柳涵姿点到为止切磋，声望 +5，偏锋锐气 +2',
      tone: 'danger',
      effects: [
        { type: 'addFlagNumber', flag: 'qc_ruthless_edge', delta: 2 },
        { type: 'modifyRenown', delta: 5, reason: '万里桥茶肆拔剑接下峨眉弟子试招' },
        {
          type: 'startCombat',
          questId: QINGCHENG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildEmeiDiscipleSparNpc() },
          rule: 'spar',
          introText: '你在锦江万里桥茶肆替青城同门接下峨眉女冠【柳涵姿】三招试探！',
          onWin: [openScene(regScene(buildSceneQc11AfterTeahouse('spar')), 'QST-SECT-14-ENTRY')],
          onLose: [openScene(regScene(buildSceneQc11AfterTeahouse('spar')), 'QST-SECT-14-ENTRY')],
          onDraw: [openScene(regScene(buildSceneQc11AfterTeahouse('spar')), 'QST-SECT-14-ENTRY')],
        },
      ],
    },
  ],
}

function buildSceneQc10AfterBamboo(method: 'bluff' | 'spar'): StorySceneDef {
  return {
    id: `scene_qc_10b_bamboo_after_${method}`,
    title: '第十幕（续）· 半截剑穗指雄关',
    subtitle: '青城后山幽谷 · 下山领命',
    mandatory: true,
    beats: [
      N(method === 'bluff'
            ? '你气沉丹田朗喝一声：“方剑师携孤崖众弟子巡山至此，何方宵小敢闯上清禁地！”那黑巾道人做贼心虚，翻墙仓皇逃入浓雾；唐门外房【唐艮】忌惮两派明面盟约，冷冷丢下一句“剑门关外自见分晓”，展开轻功掠入后谷竹海。'
            : '你初运《青城青冥引气诀》，掌剑之间已带上一缕清冽绵长的山岚真气！数合交锋惊退殿后的唐门外房探哨，黑巾道人见势不妙亦翻下石崖遁走，唯在荆棘丛上刮落了一缕褪色的青丝剑穗。'),
      S(SPEAKER_SHEN_QINGLAN, '（沈清岚拾起荆棘上那缕褪色剑穗，指尖剧烈轻颤，低声向你吐露心底埋藏三年的秘密）“果然没看错……这是我爹爹沈怀舟当年亲手编的双环剑穗！三年前爹爹反对侯副掌门引唐门暗器入山，在剑门关离奇坠崖，他的遗物怎会在一个与唐门私通的内院道人身上？！”'),
      N('恰在次日破晓，内院传下公文：命沈清岚携你下山，先赴 **【成都府 · 锦江万里桥茶肆】** 采办道观茶盐，再北上 **【剑门关】** 呈送一封火漆手札！沈清岚悄悄收好那缕断剑穗，与你相视一眼，皆知揭开迷雾的契机已至。'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      { type: 'setFlag', flag: 'qc_tang_clue', value: true },
      { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
      {
        type: 'spawnDynamicActor',
        actor: buildQinglanDynamicActor({
          regionId: 'chengdu',
          buildingId: 'cd_teahouse',
          spotId: 'cd_teahouse_main',
          badgeLabel: '锦江采办',
          talk: '“茶肆二楼似乎有咱们青城俗家师兄与峨眉派的人起了争执，咱们快上去瞧瞧！”',
        }),
      },
      {
        type: 'setQuestStep',
        questId: QINGCHENG_ENTRY_QUEST_ID,
        stepId: 'chengdu_teahouse_errand',
        deadlineDays: null,
      },
      toast('已领受下山差遣！请前往【成都府 · 锦江万里桥茶肆】会合沈清岚采办茶盐！', 'success', '竹影惊鸿'),
    ],
  }
}

const SCENE_QC_10_BAMBOO_TANGMEN: StorySceneDef = {
  id: 'scene_qc_10_bamboo_tangmen',
  title: '第十幕 · 后山竹影现唐踪',
  subtitle: '青城后谷竹海 · 子夜密会',
  mandatory: true,
  beats: [
    N('子时三刻，你体内第一缕青冥真气周天运转圆满，顿觉耳聪目明、步履生风。步出孤崖石室透气时，忽见后山与唐家堡交界的一片幽深楠竹林中火光一闪——蜀中唐门外房好手【唐艮】正将一筒泛着蓝汪汪毒芒的机簧暗器递给一名黑巾遮面的青城道人！'),
    S('NPC-0670', '（唐艮压低声音冷笑道）“贵派侯副掌门要的十枚子午透骨钉已备妥。只要剑门关那边一动手，川东盐路与峨眉山的脏水便泼定了——当心，崖边有人！”'),
    S(SPEAKER_SHEN_QINGLAN, '（闻声赶出石室的沈清岚借着月色瞥见那遮面道人袖口垂下的半截旧剑穗，呼吸猛地一滞）“那截剑穗……怎会与我亡父当年遗失的一模一样？！”'),
  ],
  choices: [
    {
      id: 'qc10_bluff_retreat',
      label: '【借势喝退 · 智取暗语】（需风姿颜值 ≥ 92 或 辩才 ≥ 12）昂然诈称方剑师率众巡山已至！',
      subLabel: '兵不血刃惊走密会二人，截获剑门关暗语线索',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需风姿颜值 ≥ 92 或 十艺【辩才】 ≥ 12',
        conditions: [
          { type: 'talentAtLeast', key: '颜值', min: 92 },
          { type: 'skillAtLeast', key: '辩才', min: 12 },
        ],
      },
      effects: [openScene(regScene(buildSceneQc10AfterBamboo('bluff')), 'QST-SECT-14-ENTRY')],
    },
    {
      id: 'qc10_test_new_neigong',
      label: '【初运青冥 · 拔剑追击】正好拿殿后的唐门探哨检验新修成的《青冥引气诀》威力！',
      subLabel: '实战体验新内功翻倍气血内力加成（切磋胜败皆推进，历练 +30）',
      tone: 'primary',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: QINGCHENG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildTangmenNightScoutNpc() },
          rule: 'spar',
          introText: '丹田内《青城青冥引气诀》真气初成，你持剑拦下断后的唐门夜巡哨卫！',
          onWin: [
            { type: 'giveCombatExp', amount: 30, reason: '后山竹海初运《青冥引气诀》击退唐门探哨' },
            openScene(regScene(buildSceneQc10AfterBamboo('spar')), 'QST-SECT-14-ENTRY'),
          ],
          onLose: [openScene(regScene(buildSceneQc10AfterBamboo('spar')), 'QST-SECT-14-ENTRY')],
          onDraw: [openScene(regScene(buildSceneQc10AfterBamboo('spar')), 'QST-SECT-14-ENTRY')],
        },
      ],
    },
  ],
}

function buildSceneQc09QingmingNeigong(highComprehension: boolean): StorySceneDef {
  return {
    id: highComprehension ? 'scene_qc_09_qingming_high' : 'scene_qc_09_qingming_base',
    title: '第九幕 · 青冥引气破鸿蒙',
    subtitle: '孤崖静室松灯 · 首门道家内功传授',
    mandatory: true,
    beats: [
      N('入夜，松涛孤崖静室之内点起一盏清香松脂灯。巴武回报丹泉亭后，方正闭上木门，神色郑重地命你在蒲团上盘膝端坐，沈清岚亦轻步坐在你身侧，取出一卷泛黄却保存极妥帖的手抄道诀。'),
      S('NPC-0354', '（方正双目微阖，声若空谷幽钟）“孩子，你初涉江湖，虽有一副侠义肝肠，体内却无半点内家真气护脉，在侯沧海这等狠手面前终如浮萍无根。今日老夫便破例先传你本门道观筑基正宗——《青城青冥引气诀》！凝神听好：鼻吸青冥幽谷雾，意沉气海转昆仑……”'),
      S(SPEAKER_SHEN_QINGLAN, '（当你初引山岚清气入体、在膻中穴微觉滞涩之时，沈清岚温软清凉的指尖轻轻按在你背后灵台穴上，柔声引导）“别急，就像那日在青羊宫听雨落铜羊一般，放空杂念，让真气自己顺着呼吸流向下丹田……”'),
      N(highComprehension
          ? '伴着孤崖松涛与清岚轻柔的吐纳节拍，你天资颖悟，一点即透！只听体内隐隐一声清鸣，幽谷清灵之气如春江破冰般瞬间贯通任督小周天，气血与内力陡然暴涨一倍有余，《青城青冥引气诀》竟一举直入第二重境界！'
          : '伴着孤崖松涛与清岚耐心的护法引导，一缕清凉绵长的真气终于在你空荡荡的丹田气海中生根发芽，缓缓流遍四肢百骸——自这一刻起，你终于褪去凡胎白身，真正踏入了内家武学的门槛！'),
    ],
    choices: [
      {
        id: 'qc09_complete_circulation',
        label: '【收功吐气 · 拜谢授业大恩】“多谢方剑师传功、清岚师姐护法！”',
        subLabel: highComprehension
          ? '习得《青城青冥引气诀》（直达第 2 重 + 熟练度 4000，自动运使主内功）'
          : '习得《青城青冥引气诀》（第 1 重 + 熟练度 5000，自动运使主内功）',
        tone: 'jade',
        effects: [
          {
            type: 'teachMartialArt',
            artId: 'MA-228',
            level: highComprehension ? 2 : 1,
            exp: highComprehension ? 4000 : 5000,
            autoEquip: true,
          },
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
          openScene('scene_qc_10_bamboo_tangmen', 'QST-SECT-14-ENTRY'),
        ],
      },
    ],
  }
}

const SCENE_QC_08_WELLS_COLD_TEA: StorySceneDef = {
  id: 'scene_qc_08_wells_cold_tea',
  title: '第八幕 · 丹泉亭畔冷茶试',
  subtitle: '鸳鸯古井来使 · 一盏寒泉藏机锋',
  mandatory: true,
  beats: [
    N('一曲《松风引》方歇，崖下石径忽传来一阵急促脚步声。副掌门【侯沧海】的心腹内院道人【巴武】手托一只黑漆茶盘登崖而来，盘中放着一盏碧绿得近乎幽暗的泉水茶汤，水面竟无半分热气。'),
    S('NPC-0574', '（巴武皮笑肉不笑地拱了拱手）“方剑师，我家侯副掌门在【鸳鸯古井丹泉八角亭】听说孤崖来了位年轻俊彦，特命小道取来古井底的『碧髓醒神茶』赐他饮下——副掌门说了，若连这碗丹泉冷茶都受不住，还是早早卷铺盖下山去罢！”'),
    S(SPEAKER_SHEN_QINGLAN, '（沈清岚脸色微变，指尖暗暗扯了扯你的衣袖——你尚未习得内功，若这茶中暗藏阴寒药力，贸然饮下恐伤肺腑！）'),
  ],
  choices: [
    {
      id: 'qc08_spill_on_moss',
      label: '【慧眼识寒 · 借礼泼苔】（需先天悟性 ≥ 92 或 已知山上两脉不睦）称谢之时借敬天之礼倾茶入石苔！',
      subLabel: '石苔遇寒立枯，巴武讨没趣而退，直入高悟性传功分支！',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需先天悟性 ≥ 92 或 此前与火工申勇焱同担松柴知悉两脉暗流',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 92 },
          flag('qc_knew_two_factions', 'truthy'),
        ],
      },
      effects: [
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0220' }, delta: 5 },
        toast('你称“先敬青城山神”将半盏冷茶酹于阶前，青苔遇断肠寒药立枯，巴武讪讪退去！', 'success', '机变破局'),
        openScene(regScene(buildSceneQc09QingmingNeigong(true)), 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc08_bone_endure',
      label: '【天生虎骨 · 仰首饮尽】（需先天根骨 ≥ 92）面不改色一饮而尽，纯凭浑厚气血蒸散寒气！',
      subLabel: '震慑丹泉来使，侯沧海暗暗赞赏，亦入高阶传功分支！',
      tone: 'jade',
      condition: { type: 'talentAtLeast', key: '根骨', min: 92 },
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0220' }, delta: 12 },
        { type: 'addFlagNumber', flag: 'qc_ruthless_edge', delta: 1 },
        { type: 'giveCombatExp', amount: 20, reason: '以天生强悍根骨硬抗丹泉寒药洗髓' },
        openScene(regScene(buildSceneQc09QingmingNeigong(true)), 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc08_humble_decline',
      label: '【坦诚守拙 · 请师封存】直言自身尚无内功受不起重赐，请方剑师代为封存谢恩',
      subLabel: '不逞匹夫之勇，方正拂袖震散茶中寒毒，稳步传授筑基内功',
      tone: 'primary',
      effects: [
        { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0354' }, delta: 10 },
        openScene(regScene(buildSceneQc09QingmingNeigong(false)), 'QST-SECT-14-ENTRY'),
      ],
    },
  ],
}

const SCENE_QC_07_CLIFF_QIN: StorySceneDef = {
  id: 'scene_qc_07_cliff_qin',
  title: '第七幕 · 孤崖云海听松琴',
  subtitle: '青城山上清宫 · 松涛云海抚琴孤崖',
  illustrationUrl: '/assets/quests/qingcheng_cliff_qin.jpg',
  illustrationCaption: '上清宫抚琴孤崖 · 云海松涛听琴悟青冥',
  mandatory: true,
  beats: [
    N('十日清修转瞬即逝。这日清晨，你随沈清岚拾级登临上清宫西侧绝壁——【松涛云海抚琴孤崖】。脚下万丈云海翻涌如雪，千年古松虬枝斜探入虚空；两鬓微霜、气度温厚的上清宫剑师“铁臂叟”【方正】正盘坐青石之上抚弄一张古朴七弦琴，沈清岚跪坐在侧畔红泥小炉前烹煮雪水新茶。'),
    N('你手执桃木剑立于崖边静听。琴音初起时清越散淡，宛若空山松针滴露；至中段忽转急骤铮琮，恰似疾风骤雨横扫竹海、快剑破空；然就在杀伐之音攀至极盛的刹那，方正五指猛地一按琴弦——万籁俱寂，唯余一缕悠远平和的泛音随云海飘散。'),
    S('NPC-0354', '（方正抬起温和而深邃的目光，含笑望向崖边的你）“年轻人，清岚连日在老夫耳畔夸你心性纯良。方才老夫这曲《松风引》，乃是本门剑理之源——你且说说，从中听出了什么？”'),
  ],
  choices: [
    {
      id: 'qc07_qin_comprehension',
      label: '【知音识微 · 藏锋护道】（需先天悟性 ≥ 92 或 十艺【琴】 ≥ 12）道破第七徽“杀音骤敛、以道驭剑”真意！',
      subLabel: '深契方正与沈清岚亡父剑道理想！琴艺 +3，方正好感与清岚缘分大增',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需先天悟性 ≥ 92 或 十艺【琴】 ≥ 12',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 92 },
          { type: 'skillAtLeast', key: '琴', min: 12 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '琴', delta: 3 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0354' }, delta: 25 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 3 },
        { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 2 },
        toast('你一言道破第七徽收势藏锋之妙，沈清岚眼眶微湿——这正是她亡父生前最珍视的剑理！', 'success', '孤崖知音'),
        openScene('scene_qc_08_wells_cold_tea', 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc07_gentle_heart',
      label: '【心向清宁】“前半段疾风快剑虽烈，终归是为了换来后半段的云开月明、山河安宁。”',
      subLabel: '温厚纯正，获方正嘉许与沈清岚好感',
      tone: 'jade',
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0354' }, delta: 15 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 1 },
        { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 1 },
        openScene('scene_qc_08_wells_cold_tea', 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc07_sharp_ambition',
      label: '【快剑无前】“松风既起，正当一鼓作气荡平万壑，中道收弦未免可惜了三分锐气！”',
      subLabel: '锋芒毕露，方正默然诫你须防杀心太盛',
      tone: 'default',
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0354' }, delta: 5 },
        { type: 'addFlagNumber', flag: 'qc_ruthless_edge', delta: 2 },
        openScene('scene_qc_08_wells_cold_tea', 'QST-SECT-14-ENTRY'),
      ],
    },
  ],
}

function buildSceneQc06AfterSpar(survivedOrWon: boolean): StorySceneDef {
  return {
    id: survivedOrWon ? 'scene_qc_06_ten_days_pass' : 'scene_qc_06_ten_days_grit',
    title: '第六幕 · 扫阶十日观云岚',
    subtitle: '上清宫偏院 · 晨钟暮鼓养初心',
    mandatory: true,
    beats: [
      N(survivedOrWon
          ? '桃木剑影交错三合！你虽无半分内力，却牢牢记住沈清岚所授“守中宫、避锋芒”口诀，步法灵动卸开侯锋原三次快刺，衣角未损半分！殿前围观的几名道童忍不住低声喝彩。'
          : '侯锋原手腕连抖，木剑快刺震得你虎口发麻、连退数步跌坐在青石阶上；然而你咬紧牙关拄着桃木剑再度站起，目光清亮寸步不退！'),
      S('NPC-0587', '（侯锋原收回木剑，冷哼一声拂袖让开道路）“算你小子有几分骨气！按外院规矩，先在偏院扫十日银杏落叶、挑满十缸山泉，十日后看孤崖那位方剑师愿不愿见你！”'),
      N('自此你在上清宫外院安顿下来。山中岁月静谧，每日清晨雾岚未散时，沈清岚总会提着一只青竹食盒悄悄来到偏院，给你送来温热的茯苓山药粥与跌打药膏，陪你说上几句山中风物。这十日闲暇，你决定侧重打磨哪一门根基？'),
    ],
    choices: [
      {
        id: 'qc06_train_body',
        label: '【晨挑丹泉 · 打熬筋骨】每日随火工申勇焱挑水劈柴，夯实气血与实战体魄',
        subLabel: '实战历练 +30，申勇焱好感 +10，气血内力调养充盈',
        tone: 'primary',
        effects: [
          { type: 'giveCombatExp', amount: 30, reason: '上清宫外院十日挑水劈柴打熬筋骨' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0933' }, delta: 10 },
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'advanceShichen', count: 4 },
          {
            type: 'spawnDynamicActor',
            actor: buildQinglanDynamicActor({
              regionId: 'qingcheng',
              buildingId: 'qc_shangqing',
              spotId: 'qc_sq_cliff',
              badgeLabel: '孤崖听琴',
              talk: '“师父已在抚琴孤崖烹好了新茶，快随我上前拜见吧！”',
            }),
          },
          {
            type: 'setQuestStep',
            questId: QINGCHENG_ENTRY_QUEST_ID,
            stepId: 'cliff_qin_and_neigong',
            deadlineDays: null,
          },
          toast('十日磨砺期满！请移步上清宫西侧【松涛云海抚琴孤崖】，拜谒剑师【方正】与沈清岚！', 'success', '扫阶十日'),
        ],
      },
      {
        id: 'qc06_read_scripture',
        label: '【暮诵道藏 · 静参玄理】黄昏陪沈清岚在偏殿誊抄《黄庭经》，涵养经义书卷气',
        subLabel: '十艺【经义】+4、【书】+2，沈清岚缘分 +2',
        tone: 'jade',
        effects: [
          { type: 'modifySkill', key: '经义', delta: 4 },
          { type: 'modifySkill', key: '书', delta: 2 },
          { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
          { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 1 },
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'advanceShichen', count: 4 },
          {
            type: 'spawnDynamicActor',
            actor: buildQinglanDynamicActor({
              regionId: 'qingcheng',
              buildingId: 'qc_shangqing',
              spotId: 'qc_sq_cliff',
              badgeLabel: '孤崖听琴',
              talk: '“师父已在抚琴孤崖烹好了新茶，快随我上前拜见吧！”',
            }),
          },
          {
            type: 'setQuestStep',
            questId: QINGCHENG_ENTRY_QUEST_ID,
            stepId: 'cliff_qin_and_neigong',
            deadlineDays: null,
          },
          toast('十日清修期满！请移步上清宫西侧【松涛云海抚琴孤崖】，拜谒剑师【方正】与沈清岚！', 'success', '扫阶十日'),
        ],
      },
      {
        id: 'qc06_practice_sword',
        label: '【夜观松影 · 苦练刺击】月下独对古银杏挥刺千剑，磨熟《基础刺击剑》',
        subLabel: '《基础刺击剑》熟练度 +3000，实战历练 +20',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-206', amount: 3000 },
          { type: 'giveCombatExp', amount: 20, reason: '银杏月下苦练基础刺击千剑' },
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'advanceShichen', count: 4 },
          {
            type: 'spawnDynamicActor',
            actor: buildQinglanDynamicActor({
              regionId: 'qingcheng',
              buildingId: 'qc_shangqing',
              spotId: 'qc_sq_cliff',
              badgeLabel: '孤崖听琴',
              talk: '“师父已在抚琴孤崖烹好了新茶，快随我上前拜见吧！”',
            }),
          },
          {
            type: 'setQuestStep',
            questId: QINGCHENG_ENTRY_QUEST_ID,
            stepId: 'cliff_qin_and_neigong',
            deadlineDays: null,
          },
          toast('十日习剑期满！请移步上清宫西侧【松涛云海抚琴孤崖】，拜谒剑师【方正】与沈清岚！', 'success', '扫阶十日'),
        ],
      },
    ],
  }
}

const SCENE_QC_05_WOODEN_SWORD_TEST: StorySceneDef = {
  id: 'scene_qc_05_wooden_sword_test',
  title: '第五幕 · 松风坪前试桃木',
  subtitle: '上清松风演剑主殿外坪 · 零内功三合试剑',
  mandatory: true,
  beats: [
    N('穿过山门重重苍翠银杏，宏伟古朴的绿琉璃瓦重檐大殿——【上清松风演剑主殿】豁然映入眼帘。青石演武坪上剑风飒飒，数十名青衣弟子正在捉对拆招；副掌门族侄、俗家快剑手【侯锋原】提着一柄削磨光滑的桃木剑斜刺里跨出，拦住了你们去路。'),
    S('NPC-0587', '（侯锋原上下扫量你一眼，嗤笑出声）“哟，沈师妹下山抄趟经，怎又领了个脚步虚浮、连半点内家气感都没有的白身小子回来？咱们青城山上清宫乃是巴蜀剑宗，不是善堂！想留下来扫地听道，先接侯某三招桃木剑再说！”'),
    S(SPEAKER_SHEN_QINGLAN, '（沈清岚秀眉微蹙，见推脱不过，转身替你系紧桃木剑穗，温声附耳点拨《基础刺击剑》要诀）“别慌！他欺你没有内功，必定抢快猛攻。我教你三式直刺中宫之法——交手时你既可用新学的【基础刺击剑】反击，亦可沉心选择【守御】卸力，只要撑过三合不倒，他便无话可说！”'),
  ],
  choices: [
    {
      id: 'qc05_accept_wooden_test',
      label: '【紧握桃木剑 · 领悟基础刺击】“请侯师兄赐教三合！”',
      subLabel: '当场习得并装备《基础刺击剑》，撑满 3 回合（或胜出）即算过关，零内功无忧！',
      tone: 'jade',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-206', level: 1, exp: 1000, autoEquip: true },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: QINGCHENG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildWoodenSwordExaminerNpc() },
          rule: 'survive_rounds',
          maxRounds: 3,
          introText: '【零内功试剑教学】你尚无内功，可灵活运用【守御架势】减伤或新学的【基础刺击剑】，撑满 3 回合即过关！',
          onWin: [
            { type: 'giveCombatExp', amount: 25, reason: '上清宫山门木剑三合考校过关' },
            { type: 'modifyRenown', delta: 5, reason: '白身接下青城快剑手侯锋原三招木剑' },
            openScene(regScene(buildSceneQc06AfterSpar(true)), 'QST-SECT-14-ENTRY'),
          ],
          onLose: [openScene(regScene(buildSceneQc06AfterSpar(false)), 'QST-SECT-14-ENTRY')],
          onDraw: [openScene(regScene(buildSceneQc06AfterSpar(true)), 'QST-SECT-14-ENTRY')],
        },
      ],
    },
  ],
}

const SCENE_QC_04_MOUNTAIN_STEPS: StorySceneDef = {
  id: 'scene_qc_04_mountain_steps',
  title: '第四幕 · 丹梯千级问樵歌',
  subtitle: '青城前山幽林石阶 · 山门暗流初闻',
  mandatory: true,
  beats: [
    N('出成都西行百里，过了都江堰宝瓶口汹涌澎湃的岷江雪浪，但见三十六峰环合如城、千年古楠遮天蔽日，果不负“青城天下幽”之盛名。石阶苔痕湿滑，行至半山天师洞丹梯处，一名浑身汗湿的中年火工道人【申勇焱】正挑着百余斤湿松柴在陡阶上喘息打滑。'),
    S('NPC-0933', '（申勇焱扶住石栏苦笑）“哎哟，这春雨淋过的老松木沉得像生铁！沈姑娘你可回山了——待会儿进了上清宫可得留神，今早丹泉亭侯副掌门一脉的侯锋原师兄在主殿外坪当值，正拿新来的杂役撒气呢！”'),
  ],
  choices: [
    {
      id: 'qc04_bone_carry_all',
      label: '【神力担柴 · 直登丹梯】（需先天根骨 ≥ 92）一手接过百斤湿柴扁担，健步如飞直上山门！',
      subLabel: '尽显天生上乘根骨！申勇焱好感 +15，沈清岚钦佩不已',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '根骨', min: 92 },
      effects: [
        { type: 'setFlag', flag: 'qc_knew_two_factions', value: true },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0933' }, delta: 15 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 1 },
        { type: 'giveCombatExp', amount: 15, reason: '负百斤湿松柴直登青城千级丹梯' },
        openScene('scene_qc_05_wooden_sword_test', 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc04_share_with_qinglan',
      label: '【解绳分担 · 闲话山门】与清岚一前一后替申大哥分担松柴，细问山上两脉情形',
      subLabel: '结下底层火工善缘，提前洞悉孤崖与丹泉两脉暗流',
      tone: 'jade',
      effects: [
        { type: 'setFlag', flag: 'qc_knew_two_factions', value: true },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0933' }, delta: 10 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
        openScene('scene_qc_05_wooden_sword_test', 'QST-SECT-14-ENTRY'),
      ],
    },
  ],
}

const SCENE_QC_03_ACADEMY_LEDGER: StorySceneDef = {
  id: 'scene_qc_03_academy_ledger',
  title: '第三幕 · 石室清册辨暗账',
  subtitle: '成都府 · 文翁石室书院',
  mandatory: true,
  beats: [
    N('文翁石室书院自汉景帝年间兴学至今，古柏森森、书声琅琅。院角石廊下停着三辆罩着油布的独轮推车，都江堰护观弟子【侯清野】正攥着一叠货单满头大汗，见沈清岚引你到来，如逢救星。'),
    S('NPC-0866', '“沈师妹来得正好！这批要送上青城山的《道藏》刻本与灯油刚刚点齐，可城南脚行偏偏多塞了一口封着铁箍的黑樟木箱，说是丹泉亭加订的『炼丹硝石』，沉得邪门，账目斤两也对不上！”'),
    S(SPEAKER_SHEN_QINGLAN, '（沈清岚俯身轻嗅木箱缝隙，眸底掠过一丝凝重，低声向你道）“我师父方正从不用这等腥苦刺鼻的矿石炼丹……这箱子怕有古怪，咱们怎生查验才不打草惊蛇？”'),
  ],
  choices: [
    {
      id: 'qc03_abacus_deduce',
      label: '【珠算核斤 · 智辨夹层】（需十艺【算术】 ≥ 12 或 先天悟性 ≥ 92）拨算盘核对车辙吃重与体积差！',
      subLabel: '不开封条精准算出箱底暗藏生铁机簧配重，算术 +3，清岚刮目相看',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需十艺【算术】 ≥ 12 或 先天悟性 ≥ 92',
        conditions: [
          { type: 'skillAtLeast', key: '算术', min: 12 },
          { type: 'talentAtLeast', key: '悟性', min: 92 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '算术', delta: 3 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0866' }, delta: 10 },
        { type: 'giveItem', itemId: 'WPN-088', qty: 1 },
        {
          type: 'spawnDynamicActor',
          actor: buildQinglanDynamicActor({
            regionId: 'qingcheng',
            buildingId: 'qc_shangqing',
            spotId: 'qc_sq_hall',
            badgeLabel: '初登青城',
            talk: '“前方便是上清宫山门丹梯了，握好那柄桃木剑，随我一道上山吧！”',
          }),
        },
        {
          type: 'setQuestStep',
          questId: QINGCHENG_ENTRY_QUEST_ID,
          stepId: 'climb_qingcheng_gate',
          deadlineDays: null,
        },
        toast('智辨暗账夹层！沈清岚赠你防身习礼【书院习礼桃木剑】，请出城西行前往【青城山 / 唐家堡 · 青城山上清宫松风殿】！', 'success', '石室辨账'),
      ],
    },
    {
      id: 'qc03_strength_lift',
      label: '【单臂托箱 · 听声辨器】（需先天根骨 ≥ 92）单手托起百斤黑樟箱轻晃听音！',
      subLabel: '神力惊呆侯清野，听出箱底铁器碰撞声，获赠【书院习礼桃木剑】',
      tone: 'jade',
      condition: { type: 'talentAtLeast', key: '根骨', min: 92 },
      effects: [
        { type: 'giveCombatExp', amount: 15, reason: '文翁石室单臂托百斤樟箱辨器' },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0866' }, delta: 15 },
        { type: 'giveItem', itemId: 'WPN-088', qty: 1 },
        {
          type: 'spawnDynamicActor',
          actor: buildQinglanDynamicActor({
            regionId: 'qingcheng',
            buildingId: 'qc_shangqing',
            spotId: 'qc_sq_hall',
            badgeLabel: '初登青城',
            talk: '“前方便是上清宫山门丹梯了，握好那柄桃木剑，随我一道上山吧！”',
          }),
        },
        {
          type: 'setQuestStep',
          questId: QINGCHENG_ENTRY_QUEST_ID,
          stepId: 'climb_qingcheng_gate',
          deadlineDays: null,
        },
        toast('神力验箱完毕！沈清岚赠你【书院习礼桃木剑】，请西行前往【青城山 / 唐家堡 · 青城山上清宫松风殿】！', 'success', '石室辨账'),
      ],
    },
    {
      id: 'qc03_diligent_help',
      label: '【勤勉装车 · 暗记封号】挽袖帮侯师兄搬妥经卷装车，替清岚暗暗记下脚行商号',
      subLabel: '踏实可靠，获赠【书院习礼桃木剑】与 2 份行路干粮',
      tone: 'primary',
      effects: [
        { type: 'giveFood', amount: 2 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0866' }, delta: 10 },
        { type: 'giveItem', itemId: 'WPN-088', qty: 1 },
        {
          type: 'spawnDynamicActor',
          actor: buildQinglanDynamicActor({
            regionId: 'qingcheng',
            buildingId: 'qc_shangqing',
            spotId: 'qc_sq_hall',
            badgeLabel: '初登青城',
            talk: '“前方便是上清宫山门丹梯了，握好那柄桃木剑，随我一道上山吧！”',
          }),
        },
        {
          type: 'setQuestStep',
          questId: QINGCHENG_ENTRY_QUEST_ID,
          stepId: 'climb_qingcheng_gate',
          deadlineDays: null,
        },
        toast('经卷装车启程！沈清岚赠你【书院习礼桃木剑】与干粮，请西行前往【青城山 / 唐家堡 · 青城山上清宫松风殿】！', 'success', '西上青城'),
      ],
    },
  ],
}

const SCENE_QC_02_BRONZE_GOAT_DAO: StorySceneDef = {
  id: 'scene_qc_02_bronze_goat_dao',
  title: '第二幕 · 铜羊炉畔话青幽',
  subtitle: '成都府青羊道宫 · 苦丁新茗与旧剑穗',
  mandatory: true,
  beats: [
    N('盐枭灰溜溜逃出山门后，檐外春雨渐止，湿润的红墙翠竹间透出一缕清澈天光。那位素青道衣的年轻女冠替你拂去肩头雨珠，引你至【主阁讲席 · 抚琴台】侧的石案旁坐下，亲手斟了一盏微苦回甘的青城苦丁春茶。'),
    S(SPEAKER_SHEN_QINGLAN, '（她敛衽一礼，眉目温润如蜀江春水，自我介绍道）“贫道沈清岚，乃是西边【青城山上清宫】孤崖方正剑师门下记名弟子。方才在竹篓拾经时，多谢少侠仗义执言——否则污了师父托我来青羊宫校勘的《道德经》孤本，清岚真不知如何回山交代。”'),
    N('她低头以素帕擦拭琴囊水迹时，袖口无意间滑落半截断了丝绦的旧青丝剑穗。沈清岚神色微怔，忙将其轻轻掩回袖中，一抹难以言说的孤寂心事自眼底一闪而逝；恰在此时，驻宫内院道人【方振鸣】踱步走来，指着殿前那尊古朴神秘的独角青铜羊含笑发问。'),
    S('NPC-0712', '“小友方才退恶人不染血刃，颇合我道门清静之旨。只是江湖人皆言『老子讲柔弱胜刚强，青城剑法却偏求迅疾快狠』——小友既来青羊宫听道，以为这『清静柔弱』与『疾风快剑』相悖否？”'),
  ],
  choices: [
    {
      id: 'qc02_dao_insight',
      label: '【引都江堰水喻剑】（需十艺【经义】 ≥ 12 或 先天悟性 ≥ 92）“水善利万物而不争，然宝瓶口破石亦在一瞬奔雷！”',
      subLabel: '妙解道剑合一！经义 +3，沈清岚眸泛异彩，缘分 +2',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需十艺【经义】 ≥ 12 或 先天悟性 ≥ 92',
        conditions: [
          { type: 'skillAtLeast', key: '经义', min: 12 },
          { type: 'talentAtLeast', key: '悟性', min: 92 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '经义', delta: 3 },
        { type: 'giveFood', amount: 2 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
        { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0712' }, delta: 10 },
        {
          type: 'spawnDynamicActor',
          actor: buildQinglanDynamicActor({
            regionId: 'chengdu',
            buildingId: 'chengdu_base_academy',
            spotId: null,
            badgeLabel: '石室同行',
            talk: '“侯师兄就在书院廊下清点上山的经卷与灯油，咱们快过去帮一把吧！”',
          }),
        },
        {
          type: 'startQuest',
          questId: QINGCHENG_ENTRY_QUEST_ID,
          stepId: 'meet_academy_escort',
        },
        toast('以都江堰水妙喻道剑，深得沈清岚倾心！请前往【成都府 · 文翁石室书院】与沈清岚、侯清野会合同赴青城山！', 'success', '青羊偶闻'),
      ],
    },
    {
      id: 'qc02_honest_seeker',
      label: '【坦诚向道 · 虚心求教】直言自己尚无内功武学底子，唯愿上仙山求一份澄明本心',
      subLabel: '真诚不欺，沈清岚温言相邀同赴文翁石室与青城山',
      tone: 'jade',
      effects: [
        { type: 'modifySkill', key: '经义', delta: 1 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 1 },
        { type: 'addFlagNumber', flag: 'qc_dao_heart', delta: 1 },
        {
          type: 'spawnDynamicActor',
          actor: buildQinglanDynamicActor({
            regionId: 'chengdu',
            buildingId: 'chengdu_base_academy',
            spotId: null,
            badgeLabel: '石室同行',
            talk: '“侯师兄就在书院廊下清点上山的经卷与灯油，咱们快过去帮一把吧！”',
          }),
        },
        {
          type: 'startQuest',
          questId: QINGCHENG_ENTRY_QUEST_ID,
          stepId: 'meet_academy_escort',
        },
        toast('结识青城孤崖小师姐【沈清岚】！请前往城内【文翁石室书院】会合她与护观弟子侯清野，随行登临青城山！', 'success', '青羊偶闻'),
      ],
    },
  ],
}

const SCENE_QC_01_QINGYANG_RAIN: StorySceneDef = {
  id: 'scene_qc_01_qingyang_rain',
  title: '第一幕 · 青羊春雨偶闻道',
  subtitle: '成都府 · 青羊道宫铜羊回廊',
  illustrationUrl: '/assets/quests/qingcheng_qingyang_rain.jpg',
  illustrationCaption: '成都府青羊道宫 · 春雨铜羊初逢小师姐沈清岚',
  mandatory: true,
  beats: [
    N('大宋皇祐二年，暮春三月的锦官城细雨如酥。你信步踏入川西第一道教祖庭【青羊道宫】避雨听经，但见红墙掩映修竹，三足铜鼎檀烟袅袅，那尊相传老子乘青羊西留的宋铸独角铜羊在雨雾中泛着温润幽光。'),
    N('回廊转角处，一名年约十九、身着淡青素白交领道袍的年轻女冠正怀抱油纸包裹的七弦古琴拾级而上，腰间一枚精巧的松果木坠随步轻晃。忽有两名浑身酒气、腰插短棒的川东私盐恶汉骂骂咧咧闯入廊下，肩膀猛地撞翻了女冠背上的青竹经篓，两卷竹简滚落湿阶！'),
    S(SPEAKER_SALT_BULLY, '（私盐脚头牛三癞非但不赔礼，反倒眼珠一转，指着自己衣摆泥点大声讹诈）“小道姑没长眼睛么！撞脏了大爷新裁的蜀锦夹袄，今日不掏出十两纹银洗衫，休想抱着你那破琴走出青羊宫！”'),
    N('那女冠明明腰悬窄身长剑，手指按上剑柄时却似记起师长严训，强忍怒意不愿在道祖殿前动武见血。你此时虽初出茅庐、尚无高深内功武学傍身，见此欺软怕硬之徒，岂能袖手旁观？'),
  ],
  choices: [
    {
      id: 'qc01_eloquence_rebut',
      label: '【唇枪舌剑 · 引律喝退】（需十艺【辩才】 ≥ 12 或 先天悟性 ≥ 92）点破私盐麻布伪充蜀锦与成都府衙条律！',
      subLabel: '零武学智退恶汉！辩才 +2，青城小师姐初见倾心',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需十艺【辩才】 ≥ 12 或 先天悟性 ≥ 92',
        conditions: [
          { type: 'skillAtLeast', key: '辩才', min: 12 },
          { type: 'talentAtLeast', key: '悟性', min: 92 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '辩才', delta: 2 },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
        openScene('scene_qc_02_bronze_goat_dao', 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc01_charm_crowd',
      label: '【风仪凛然 · 邀众评理】（需风姿颜值 ≥ 92）拾起道经朗声唤来满廊蜀中士子香客共斥讹诈！',
      subLabel: '气度清华折服众人，恶汉羞惭鼠窜！江湖声望 +3，缘分 +2',
      tone: 'jade',
      condition: { type: 'talentAtLeast', key: '颜值', min: 92 },
      effects: [
        { type: 'modifyRenown', delta: 3, reason: '成都青羊道宫仗义执言喝退盐枭' },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 2 },
        openScene('scene_qc_02_bronze_goat_dao', 'QST-SECT-14-ENTRY'),
      ],
    },
    {
      id: 'qc01_stand_in_front',
      label: '【侠骨横身 · 拾经护人】一步跨至女冠身前拾起竹简，纵无内功亦凛然不退半步！',
      subLabel: '无门槛侠义破局！引来宫中执事道人喝退盐枭，侠义 +4，缘分 +1',
      tone: 'primary',
      effects: [
        { type: 'modifyChivalry', delta: 4, reason: '青羊道宫廊下挺身护住受欺女冠' },
        { type: 'addFlagNumber', flag: 'qc_qinglan_affinity', delta: 1 },
        openScene('scene_qc_02_bronze_goat_dao', 'QST-SECT-14-ENTRY'),
      ],
    },
  ],
}

const SCENE_QC_POST_REUNION_TEA: StorySceneDef = {
  id: 'scene_qc_post_reunion_tea',
  title: '孤崖余韵 · 松针烹雪话流年',
  subtitle: '青城山上清宫 · 松涛云海抚琴孤崖',
  beats: [
    N('云海依旧翻涌于三十六峰之下，古松之畔红泥小炉白雾轻腾。见你登上孤崖，沈清岚惊喜地放下手中琴谱，唇角漾开一抹如初见春雨般温润澄澈的笑意，为你斟满一盏滚烫的青城苦丁茶。'),
    S(SPEAKER_SHEN_QINGLAN, '“就知道你定会回孤崖来看我！这几日我把爹爹留下的半阙《松风引》补全了尾音，你坐下歇歇脚，听我弹给你听——愿这缕清风，常伴你剑穗左右，岁岁平安。”'),
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'qc_qinglan_reunion_done', value: true },
    { type: 'healPlayer', hpPct: 100, mpPct: 100 },
    { type: 'modifySkill', key: '琴', delta: 2 },
    { type: 'addArtExp', artId: 'MA-228', amount: 3000 },
    toast('于抚琴孤崖与沈清岚品茗听琴，气血内力全满，十艺【琴】+2，《青城青冥引气诀》熟练度 +3000！', 'success', '孤崖故人'),
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  ...EXTRA_SCENES,
  [SCENE_QC_20A_JOINED_QINGCHENG.id]: SCENE_QC_20A_JOINED_QINGCHENG,
  [SCENE_QC_20B_FREE_WANDERER.id]: SCENE_QC_20B_FREE_WANDERER,
  [SCENE_QC_19_THREE_PURE_CHOICE.id]: SCENE_QC_19_THREE_PURE_CHOICE,
  [SCENE_QC_18_MOONLIGHT_TEMPTATION.id]: SCENE_QC_18_MOONLIGHT_TEMPTATION,
  [SCENE_QC_16_MASTER_YUCANGLAN.id]: SCENE_QC_16_MASTER_YUCANGLAN,
  [SCENE_QC_15_TWO_FACTIONS_CLASH.id]: SCENE_QC_15_TWO_FACTIONS_CLASH,
  [SCENE_QC_14_SAVE_QINGLAN.id]: SCENE_QC_14_SAVE_QINGLAN,
  [SCENE_QC_13_JIANMEN_AMBUSH.id]: SCENE_QC_13_JIANMEN_AMBUSH,
  [SCENE_QC_12_PINE_WAX_SEAL.id]: SCENE_QC_12_PINE_WAX_SEAL,
  [SCENE_QC_11_TEAHOUSE_EMEI.id]: SCENE_QC_11_TEAHOUSE_EMEI,
  [SCENE_QC_10_BAMBOO_TANGMEN.id]: SCENE_QC_10_BAMBOO_TANGMEN,
  [SCENE_QC_08_WELLS_COLD_TEA.id]: SCENE_QC_08_WELLS_COLD_TEA,
  [SCENE_QC_07_CLIFF_QIN.id]: SCENE_QC_07_CLIFF_QIN,
  [SCENE_QC_05_WOODEN_SWORD_TEST.id]: SCENE_QC_05_WOODEN_SWORD_TEST,
  [SCENE_QC_04_MOUNTAIN_STEPS.id]: SCENE_QC_04_MOUNTAIN_STEPS,
  [SCENE_QC_03_ACADEMY_LEDGER.id]: SCENE_QC_03_ACADEMY_LEDGER,
  [SCENE_QC_02_BRONZE_GOAT_DAO.id]: SCENE_QC_02_BRONZE_GOAT_DAO,
  [SCENE_QC_01_QINGYANG_RAIN.id]: SCENE_QC_01_QINGYANG_RAIN,
  [SCENE_QC_POST_REUNION_TEA.id]: SCENE_QC_POST_REUNION_TEA,
}
