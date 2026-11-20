import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_SIDE01_QUEST_ID } from './huashanSideCanglongPathQuest'

const SPEAKER_OLD_CHEN: StorySpeakerSpec = {
  kind: 'custom',
  name: '陈伯',
  title: '西岳老挑夫',
  factionName: '华阴乡民',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_MASON: StorySpeakerSpec = {
  kind: 'custom',
  name: '石大锤',
  title: '华阴铁石匠',
  factionName: '华阴乡民',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_BANDIT_SCOUT: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑脸毛五',
  title: '关中残匪探哨',
  factionName: '关中残匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_BANDIT_LEADER: StorySpeakerSpec = {
  kind: 'custom',
  name: '赵三',
  title: '独眼豺 · 关中残匪头目',
  factionName: '关中残匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

function buildRemnantBandit1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS01_BANDIT_1',
    name: '黑脸毛五',
    title: '断索残匪喽啰',
    realm: '不入流',
    factionName: '关中残匪',
    sectRank: 0,
    sectRankLabel: '残匪喽啰',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“锯断这条铁索，叫华山那群小道士连人带石匠一道摔成肉泥！”',
    stats: { hp: 280, mp: 100, agi: 17, res: 10 },
    talents: { bone: 40, comprehension: 28, charm: 20 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-189', move2: 'MA-186' },
    learnedArts: [{ artId: 'MA-199', level: 2 }, { artId: 'MA-189', level: 2 }, { artId: 'MA-186', level: 1 }],
  })
}

function buildRemnantBandit2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS01_BANDIT_2',
    name: '尖嘴钱七',
    title: '断索残匪刀手',
    realm: '不入流',
    factionName: '关中残匪',
    sectRank: 0,
    sectRankLabel: '残匪刀手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“雾这么大，石阶又滑，咱哥俩前后夹击，把这外门娃子推下万丈深渊！”',
    stats: { hp: 295, mp: 110, agi: 19, res: 11 },
    talents: { bone: 41, comprehension: 30, charm: 21 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-209', move2: 'MA-189' },
    learnedArts: [{ artId: 'MA-199', level: 2 }, { artId: 'MA-209', level: 2 }, { artId: 'MA-189', level: 2 }],
  })
}

function buildBanditLeader(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS01_LEADER',
    name: '赵三',
    title: '独眼豺 · 关中残匪头目',
    realm: '三流下品',
    factionName: '关中残匪',
    sectRank: 0,
    sectRankLabel: '残匪首领',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“潼关官兵与你们华山派端了老子山寨，今日老子便拿苍龙岭这十来条人命祭旗！”',
    stats: { hp: 460, mp: 200, agi: 25, res: 15 },
    talents: { bone: 50, comprehension: 36, charm: 24 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-209', move2: 'MA-189' },
    learnedArts: [{ artId: 'MA-238', level: 3 }, { artId: 'MA-209', level: 3 }, { artId: 'MA-189', level: 3 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hss01_01: {
    id: 'scene_hss01_01',
    title: '第一幕 · 秋雨断索',
    subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('{reignYear}秋霖连日方歇，玉女峰上山岚湿润。你行至洗头盆清泉演剑院时，正见「玉女剑仙」宁清羽俯身清点两捆粗麻绳、数十枚熟铁楔与新锻玄铁环链。'),
      S('NPC-0166', '“{gender:师侄|师侄女}来得正好。方才山下华阴挑夫陈伯托人捎信，连日秋雨冲刷得苍龙岭石脊苔滑无比，北侧三段护岭铁索也已锈蚀崩裂。”'),
      P('“苍龙岭乃通往西岳诸峰的咽喉险径，挑夫日日肩挑米面薪炭往来其间，若铁索断折，后果不堪设想！”'),
      S('NPC-0166', '“正是如此。华山与华阴乡亲相依百载，护持山道亦是本门本分。陈伯已带了两名华阴老石匠先赴苍龙岭绝顶孤松坪候着，你且携上这批铁楔麻绳前去助他们换索，顺道照拂众人安危。”'),
    ],
    onFinishEffects: [openScene('scene_hss01_02', HUASHAN_SIDE01_QUEST_ID)],
  },

  scene_hss01_02: {
    id: 'scene_hss01_02',
    title: '第二幕 · 领命赴岭',
    subtitle: '洗头盆清泉演剑院石阶',
    mandatory: true,
    beats: [
      N('你接过沉甸甸的麻绳与铁楔包袱，背负青钢长剑，向宁清羽拱手行礼。'),
      S('NPC-0166', '“苍龙岭脊背宽不足三尺，两侧皆是百丈绝渊。修缮时切记运起《华山基础心法》气沉丹田，步法稳扎如松。近日潼关北麓残匪流窜未绝，亦须多加留神。”'),
      P('“弟子谨记师叔嘱咐！定将铁索修固，护得陈伯与诸位石匠平安归来。”'),
    ],
    choices: [
      {
        id: 'hss01_accept',
        label: '背起铁楔麻绳，前往苍龙岭绝顶孤松坪会合陈伯',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_SIDE01_QUEST_ID, stepId: 'repair_canglong' },
          setStep(HUASHAN_SIDE01_QUEST_ID, 'repair_canglong'),
          toast('已接下栈道修缮之托！请前往【苍龙岭绝顶孤松坪（tg_sm_pine）】与陈伯汇合。', 'talk', '栈道修缮'),
        ],
      },
    ],
  },

  scene_hss01_03: {
    id: 'scene_hss01_03',
    title: '第三幕 · 孤松老夫',
    subtitle: '苍龙岭绝顶孤松坪',
    mandatory: true,
    beats: [
      N('行至苍龙岭绝顶孤松坪，山风呼啸，云海在脚下翻涌如涛。老挑夫陈伯正带着华阴铁石匠石大锤蹲在石脊边捶打锈死的旧铁桩，见你背着新索到来，布满风霜的脸上顿时露出喜色。'),
      S(SPEAKER_OLD_CHEN, '“哎呀，宁女侠真派华山派的{gender:小道爷|女侠}来搭把手了！老汉挑了四十年华山担子，头一回见秋雨把这岭上的铁环泡得这般酥脆。”'),
      S(SPEAKER_MASON, '“崖外那两根最险的铆钉孔悬在绝壁半寸之外，俺们凡夫俗子脚底发软，正愁没人敢吊绳探身下去砸楔呢！”'),
      P('“两位长辈莫急，这绝壁砸楔的活计便交予我来。陈伯与石师傅只需在岭脊拉稳主绳便是。”'),
    ],
    onFinishEffects: [openScene('scene_hss01_04', HUASHAN_SIDE01_QUEST_ID)],
  },

  scene_hss01_04: {
    id: 'scene_hss01_04',
    title: '第四幕 · 悬索修栈',
    subtitle: '苍龙岭百丈绝壁',
    illustrationUrl: '/assets/quests/hs_side01_cliff_repair.jpg',
    illustrationCaption: '悬索修栈 · 苍龙岭百丈绝壁之上腰系麻绳与陈伯石匠共换铁索',
    mandatory: true,
    beats: [
      N('你将粗麻绳在腰间扎实挽出双活结，另一端系于孤松树干，由陈伯与石大锤合力拉紧。你深吸一口山间清气，运转《华山基础心法》，足尖轻点湿滑岩面，稳稳悬身探出百丈绝壁！'),
      N('山风扑面如刀，衣袂猎猎作响。你左手扣住岩缝，右手挥锤将新锻铁楔逐一楔入石孔，再将沉重铁索扣环严丝合缝地穿接上去。每一次落锤皆借丹田吐纳发力，既稳且准。'),
      S(SPEAKER_OLD_CHEN, '（见新铁索绷得笔直牢固，连声赞叹）“好俊的身手！这下莫说挑担香客，便是拉着牛车过岭也不怕滑坠了！歇口气喝口姜汤吧……”'),
    ],
    onFinishEffects: [openScene('scene_hss01_05', HUASHAN_SIDE01_QUEST_ID)],
  },

  scene_hss01_05: {
    id: 'scene_hss01_05',
    title: '第五幕 · 浓雾生变',
    subtitle: '苍龙岭石脊北侧',
    mandatory: true,
    beats: [
      N('话音未落，谷底忽涌起一股刺骨浓雾，转瞬将苍龙岭笼罩得十步之外难辨人影。就在众人收拾锤凿之际，岭北新换铁索处骤然传来“咯吱——咯吱——”的刺耳锉铁声！'),
      S(SPEAKER_MASON, '（脸色大变）“不对！那不是风声，是有人拿着钢锯在锯咱们刚换好的主铁索！”'),
      N('浓雾中猛地窜出两名手持朴刀与钢锯的黑衣恶汉，狞笑着朝落单的陈伯与石匠扑来！'),
      S(SPEAKER_BANDIT_SCOUT, '“嘿嘿！华山派前阵子帮潼关官兵端了咱们山寨，今日老子们就锯断苍龙岭铁索，先拿这几个老家伙和华山小道士开荤！”'),
      P('（一步踏前横剑挡在陈伯身前，目光冷峻）“丧尽天良的鼠辈！连山道挑夫的活命铁索也敢锯断，今日休想活着走下苍龙岭！”'),
    ],
    onFinishEffects: [openScene('scene_hss01_06', HUASHAN_SIDE01_QUEST_ID)],
  },

  scene_hss01_06: {
    id: 'scene_hss01_06',
    title: '第六幕 · 石脊阻匪',
    subtitle: '苍龙岭湿滑石脊（车轮连战）',
    mandatory: true,
    beats: [
      N('石脊窄仅三尺，脚下青苔湿滑，两名残匪一前一后挥刀逼近，企图将你逼落悬崖！你沉气立桩，青钢长剑斜指浓雾，迎敌而上！'),
    ],
    choices: [
      {
        id: 'hss01_fight_scouts',
        label: '稳住下盘，以入门十二式迎战两名断索残匪！（车轮连战 生死战）',
        subLabel: '对手：黑脸毛五与尖嘴钱七（不入流）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_SIDE01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRemnantBandit1() },
            extraOpponents: [{ kind: 'custom', npc: buildRemnantBandit2() }],
            rule: 'duel',
            lethalOnLose: true,
            forbidEscapeReason: '身后便是陈伯与华阴石匠，狭路相逢绝不可退！',
            deathTitle: '陨落苍龙岭',
            deathDetail: '你在苍龙岭浓雾湿滑石脊上力战关中残匪不敌，失足坠入绝渊。',
            introText: '【车轮连战 · 狭脊阻匪】在苍龙岭湿滑石脊上迎战断索残匪【黑脸毛五】与【尖嘴钱七】！',
            onWin: [openScene('scene_hss01_07', HUASHAN_SIDE01_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss01_07: {
    id: 'scene_hss01_07',
    title: '第七幕 · 浓雾断匪',
    subtitle: '苍龙岭绝顶石脊',
    illustrationUrl: '/assets/quests/hs_side01_ridge_ambush.jpg',
    illustrationCaption: '浓雾断匪 · 湿滑石脊横剑立桩，入门十二式力擒断索悍匪',
    mandatory: true,
    beats: [
      N('你剑走轻灵、步法沉稳，一式「苍松迎客」磕飞毛五钢锯，回身「有凤来仪」剑脊拍中钱七膝弯，两贼惨叫着滚倒在石阶内侧动弹不得！'),
      N('雾霭深处骤然响起一声暴喝，一名独眼虬髯的悍匪头目提着厚背山刀大步踏雾而出，刀锋直指你的咽喉！'),
      S(SPEAKER_BANDIT_LEADER, '“废物东西，连个华山外门娃子都收拾不下！小子，爷爷乃关中『独眼豺』赵三，今日便叫你尝尝砍山刀的滋味！”'),
      P('（青钢剑横于胸前，剑尖微颤发出清越龙吟）“既是匪首，正好一并拿下，省得日后再祸害华阴百姓！”'),
    ],
    choices: [
      {
        id: 'hss01_fight_leader',
        label: '横剑立桩，正面力战「独眼豺」赵三！（1v1 生死战）',
        subLabel: '对手：三流下品残匪首领赵三',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_SIDE01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBanditLeader() },
            rule: 'duel',
            lethalOnLose: true,
            forbidEscapeReason: '残匪首领就在眼前，若放其逃遁必酿大祸！',
            deathTitle: '血染苍龙脊',
            deathDetail: '你在苍龙岭浓雾中与「独眼豺」赵三死斗落败，葬身险岭。',
            introText: '【1v1 雾脊擒酋】迎战三流下品关中残匪头目【独眼豺 · 赵三】！',
            onWin: [openScene('scene_hss01_08', HUASHAN_SIDE01_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss01_08: {
    id: 'scene_hss01_08',
    title: '第八幕 · 生擒匪首',
    subtitle: '苍龙岭绝顶孤松坪',
    mandatory: true,
    beats: [
      N('浓雾渐被山风吹散。赵三虽刀势凶猛，但在狭窄石脊上施展不开，反被你借《华山剑法（入门十二式）》的「金雁横空」贴身绕至左侧空门！'),
      N('你手腕一翻，剑尖精准点中其右肘麻筋，赵三惨叫一声松开山刀，被你顺势一记扫腿绊倒，以备用的粗麻绳结结实实反剪捆死！'),
      S(SPEAKER_BANDIT_LEADER, '“饶命！华山少侠饶命！咱只是气不过潼关被剿，一时猪油蒙了心……”'),
      S(SPEAKER_OLD_CHEN, '（长舒一口气，连连作揖）“好险！多亏{gender:小道爷|女侠}护着，不然咱们这把老骨头今日可就交代在苍龙岭了！”'),
    ],
    onFinishEffects: [openScene('scene_hss01_09', HUASHAN_SIDE01_QUEST_ID)],
  },

  scene_hss01_09: {
    id: 'scene_hss01_09',
    title: '第九幕 · 索固山安',
    subtitle: '苍龙岭石阶',
    mandatory: true,
    beats: [
      N('你同石大锤细细查验了被残匪锉过的铁索，所幸发现及时，仅划出一道浅痕，重加铁箍加固后便稳如磐石。'),
      N('不多时，巡山的华阴县弓手闻讯赶到，将赵三等三名残匪押解下山收监。陈伯硬塞给你两包自家备用的伤药，千恩万谢地与石匠们挑担下岭。'),
    ],
    choices: [
      {
        id: 'hss01_return_mountain',
        label: '清点工具，返回玉女峰洗头盆清泉演剑院向宁清羽复命',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_SIDE01_QUEST_ID, 'return_report'),
          toast('苍龙岭栈道已固、残匪已擒！请返回【玉女峰紫霞道观 · 洗头盆清泉演剑院】复命。', 'success', '栈道修缮'),
        ],
      },
    ],
  },

  scene_hss01_10: {
    id: 'scene_hss01_10',
    title: '第十幕 · 玉女嘉许',
    subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('暮色将临，你回到洗头盆清泉演剑院，将苍龙岭换索遇雾、石脊擒获关中残匪赵三的经过据实禀明。'),
      S('NPC-0166', '（神色温和，颔首嘉许）“好！在百丈湿滑石脊上既能稳桩换索，又能临危不乱生擒三名残匪，足见你这阵子《华山基础心法》与入门十二式皆未荒废。”'),
      S('NPC-0166', '“华山剑客立世，不仅在峰巅论剑，更在护持脚下苍生。这些赏银与疗伤丹药你且收下，日后勤修莫懈。”'),
    ],
    choices: [
      {
        id: 'hss01_complete',
        label: '拱手谢过宁师叔，收下赏赐（完成支线）',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 25, reason: '苍龙岭修栈擒匪师门赏银' },
          { type: 'addSectContribution', amount: 30 },
          { type: 'giveCombatExp', amount: 240, reason: '苍龙岭浓雾石脊力擒断索残匪' },
          { type: 'modifyRenown', delta: 10, reason: '华山弟子义护苍龙栈道擒匪' },
          { type: 'modifyChivalry', delta: 15, reason: '绝壁助修栈道救护挑夫与石匠' },
          { type: 'addArtExp', artId: 'MA-160', amount: 180 },
          { type: 'addArtExp', artId: 'MA-167', amount: 220 },
          { type: 'giveItem', itemId: 'ITM-MED-122', qty: 2 },
          { type: 'giveItem', itemId: 'ITM-MED-121', qty: 2 },
          { type: 'completeQuest', questId: HUASHAN_SIDE01_QUEST_ID },
          toast('已完成《苍龙挑夫 · 栈道修缮记》！获得师门贡献、功法修为与伤药！', 'success', '栈道修缮'),
        ],
      },
    ],
  },
}
