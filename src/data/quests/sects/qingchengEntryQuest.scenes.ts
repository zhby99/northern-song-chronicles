import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, S, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { QINGCHENG_ENTRY_QUEST_ID } from './qingchengEntryQuest'

const SPEAKER_YU_CANGLAN: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0139' }
const SPEAKER_HOU_CANGHAI: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0220' }
const SPEAKER_JIA_TIANHE: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0221' }
const SPEAKER_FANG_ZHENG: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0354' }
const SPEAKER_JI_YUAN: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0357' }
const SPEAKER_SHEN_FENGTAO: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0459' }

const SPEAKER_SALT_SPY: StorySpeakerSpec = {
  kind: 'custom',
  name: '邓三',
  title: '川东盐帮暗桩',
  factionName: '川东盐帮',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_TANG_SCOUT: StorySpeakerSpec = {
  kind: 'custom',
  name: '唐门外院斥候',
  title: '天机阁外院采药弟子',
  factionName: '蜀中唐门',
  portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
}

const SPEAKER_TRAITOR_WULIU: StorySpeakerSpec = {
  kind: 'custom',
  name: '吴六',
  title: '青城外院叛逃弟子',
  factionName: '江湖散客',
  portraitUrl: '/assets/characters/templates/tpl_qingcheng_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_qingcheng_av.jpg',
}

const QC_SALT_SPY_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_QC_SALT_SPY',
  name: '邓三',
  title: '川东盐帮暗桩',
  factionId: 'SECT-00',
  factionName: '川东盐帮',
  sectRank: 0,
  sectRankLabel: '盐帮暗桩',
  realm: '不入流',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  talk: '“青城派的暗哨图老子已经买了，你个生面孔少来多管闲事！”',
  stats: { hp: 100, mp: 40, agi: 9, res: 2 },
  talents: { bone: 44, comprehension: 38, charm: 35 },
  tenArts: {
    骑术: 10,
    算术: 15,
    经义: 0,
    策论: 5,
    诗词: 0,
    琴: 0,
    棋: 5,
    书: 5,
    画: 0,
    辩才: 20,
  },
  equippedArts: { move1: 'MA-189' },
  learnedArts: [{ artId: 'MA-189', level: 1 }],
})

const QC_TANG_SCOUT_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_QC_TANG_SCOUT',
  name: '唐门外院斥候',
  title: '天机阁外院采药弟子',
  factionId: 'SECT-12',
  factionName: '蜀中唐门',
  sectRank: 1,
  sectRankLabel: '外院弟子',
  realm: '三流下品',
  avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
  talk: '“后山界碑本来就是糊涂账！想从我手里抢乌头灵芝，先问过我的暗桩！”',
  stats: { hp: 145, mp: 60, agi: 12, res: 4 },
  talents: { bone: 52, comprehension: 55, charm: 42 },
  tenArts: {
    骑术: 10,
    算术: 20,
    经义: 5,
    策论: 10,
    诗词: 5,
    琴: 0,
    棋: 10,
    书: 10,
    画: 5,
    辩才: 20,
  },
  equippedArts: { move1: 'MA-188' },
  learnedArts: [{ artId: 'MA-188', level: 1 }],
})

const QC_TRAITOR_WULIU_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_QC_TRAITOR_WULIU',
  name: '吴六',
  title: '青城外院叛逃弟子',
  factionId: 'SECT-00',
  factionName: '青城叛徒',
  sectRank: 0,
  sectRankLabel: '外院逃徒',
  realm: '三流下品',
  avatarUrl: '/assets/characters/templates/tpl_qingcheng_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_qingcheng_fb.jpg',
  talk: '“别逼我！侯长老心狠手辣，我就算死在剑门关外，也不回上清宫受刑！”',
  stats: { hp: 170, mp: 75, agi: 13, res: 5 },
  talents: { bone: 55, comprehension: 48, charm: 38 },
  tenArts: {
    骑术: 15,
    算术: 15,
    经义: 10,
    策论: 10,
    诗词: 5,
    琴: 0,
    棋: 10,
    书: 10,
    画: 0,
    辩才: 20,
  },
  equippedArts: { move1: 'MA-188' },
  learnedArts: [{ artId: 'MA-188', level: 1 }],
})

const SCENE_QC_01_TEAHOUSE_SPY: StorySceneDef = {
  id: 'SCENE_QC_01_TEAHOUSE_SPY',
  title: '第一幕 · 锦官雨夜暗账',
  subtitle: '成都府 · 锦江万里桥茶肆',
  illustrationUrl: '/assets/quests/qingcheng_qingyang_rain.jpg',
  illustrationCaption: '夜雨敲窗茶肆暗，蜀道明争暗斗始于一纸密图',
  beats: [
    N('蜀中春雨绵密，锦江万里桥茶肆二楼却比往常冷清。角落里，青城长老侯沧海与巡山执事吉元正盯着对面雅座一个揣着油布卷的灰衣汉子。'),
    S(SPEAKER_HOU_CANGHAI, '（声音压得极低，眼神冷厉）“那是川东盐帮的暗桩邓三。外院采买弟子吴六贪财，把《青城唐门界碑巡山暗哨图》偷卖给了他。我们在成都城里不好公开拔剑，免得惊动官府和峨眉那帮道姑看笑话。”'),
    S(SPEAKER_JI_YUAN, '（打量你两眼）“你既未入任何门派，又无良品武学在身，这张生面孔坐过去最不惹疑。若能替我青城截回那卷图，侯长老自会给你个进山门的机会。”'),
    N('你端起茶碗佯作寻座靠过去，趁邓三低头验看火漆印记的瞬间，一把按住了油布卷！邓三脸色骤变，猛地掀翻矮凳挥拳扑来！'),
  ],
  choices: [
    {
      id: 'qc_fight_salt_spy',
      label: '先发制人，当场制住盐帮暗桩邓三',
      tone: 'jade',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: QC_SALT_SPY_NPC },
          rule: 'spar',
          forbidEscapeReason: '暗哨图就在眼前，一退便叫邓三跳窗遁走！',
          onWin: [openScene('SCENE_QC_02_SPY_CAPTURED', QINGCHENG_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_QC_01B_SPY_RETRY', QINGCHENG_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_QC_01B_SPY_RETRY: StorySceneDef = {
  id: 'SCENE_QC_01B_SPY_RETRY',
  title: '茶肆暗斗 · 再抢暗哨图',
  subtitle: '成都府 · 锦江万里桥茶肆',
  beats: [
    N('茶肆过道狭窄，你一时被矮凳绊了半步。吉元在屏风后冷哼一声，屈指弹出一颗茶果击中邓三手腕，喝道：“愣着作甚？再上！”'),
  ],
  choices: [
    {
      id: 'qc_retry_salt_spy',
      label: '稳住脚下，再扑上去拿下邓三',
      tone: 'jade',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: QC_SALT_SPY_NPC },
          rule: 'spar',
          forbidEscapeReason: '暗哨图就在眼前，一退便叫邓三跳窗遁走！',
          onWin: [openScene('SCENE_QC_02_SPY_CAPTURED', QINGCHENG_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_QC_01B_SPY_RETRY', QINGCHENG_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_QC_02_SPY_CAPTURED: StorySceneDef = {
  id: 'SCENE_QC_02_SPY_CAPTURED',
  title: '第二幕 · 截回巡山暗哨图',
  subtitle: '成都府 · 锦江万里桥茶肆',
  beats: [
    N('你顺势把邓三胳膊反拧在茶案上，从他怀里抽回那卷《青城唐门界碑巡山暗哨图》。邓三见暗处吉元冷冷按住剑柄，吓得不敢呼喊，灰溜溜翻窗逃进雨夜。'),
    S(SPEAKER_SALT_SPY, '（逃出窗外还不忘放狠话）“青城派的……这笔账盐帮记下了！”'),
    S(SPEAKER_HOU_CANGHAI, '（接过图卷检视无损，嘴角微勾）“还算利索，没拖泥带水。”'),
  ],
  choices: [
    {
      id: 'qc_to_scene_03',
      label: '将暗哨图交还侯沧海与吉元',
      tone: 'jade',
      effects: [openScene('SCENE_QC_03_HOU_ORDER', QINGCHENG_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_QC_03_HOU_ORDER: StorySceneDef = {
  id: 'SCENE_QC_03_HOU_ORDER',
  title: '第三幕 · 白纸投名状',
  subtitle: '成都府 · 锦江万里桥茶肆',
  beats: [
    S(SPEAKER_HOU_CANGHAI, '（搭脉验明你周身确无他派功法与良品杂学，点头）“身家倒是干净。但我青城派不养蠢人，更不养死读书的酸儒。”'),
    S(SPEAKER_HOU_CANGHAI, '“这二十两银子你先拿着。西去【青城山上清宫松风殿】，到【松涛云海抚琴孤崖】寻剑师方正与四秀弟子申风涛——界碑那边唐门又在偷采药草，你替宗门把事办漂亮了，再来谈入派！”'),
  ],
  choices: [
    {
      id: 'qc_go_qingcheng_mountain',
      label: '接过银两与青城令，西行青城山',
      tone: 'jade',
      effects: [
        { type: 'giveSilver', amount: 20, reason: '侯沧海赏茶肆截图盘缠' },
        { type: 'setQuestStep', questId: QINGCHENG_ENTRY_QUEST_ID, stepId: 'qingcheng_boundary_herb' },
        toast('已获二十两银钱！请前往【青城山 / 唐家堡 > 青城山上清宫松风殿 > 松涛云海抚琴孤崖】。', 'success'),
      ],
    },
  ],
}

const SCENE_QC_04_SHANGQING_WELLS: StorySceneDef = {
  id: 'SCENE_QC_04_SHANGQING_WELLS',
  title: '第四幕 · 界碑失芝风波',
  subtitle: '青城山上清宫 · 松涛云海抚琴孤崖',
  illustrationUrl: '/assets/quests/qingcheng_cliff_qin.jpg',
  illustrationCaption: '孤崖松涛冷，青城剑理不在虚架而在抢先破绽',
  beats: [
    N('青城山林深雾重，上清宫松风殿西侧便是松涛云海抚琴孤崖。青城四秀真传申风涛正攥着一柄长剑满面怒容，而崖边抚琴的中年剑师方正却神色冷峻。'),
    S(SPEAKER_SHEN_FENGTAO, '“唐家堡那帮使毒的越来越过分了！昨晚趁雾越过山涧界碑，偷采了我派炼制紫阳丹的三株乌头灵芝！”'),
    S(SPEAKER_FANG_ZHENG, '（指尖按住琴弦，抬眼看向你）“侯师兄传书说你是个手脚利落的白纸。既然到了孤崖，我便先传你一门江湖凡品【三才剑】与这口青钢剑——记住，我青城出剑只抢咽喉与破绽，绝不跟人摆花架子！”'),
  ],
  choices: [
    {
      id: 'qc_learn_sancai_sword',
      label: '拜领青钢剑与《三才剑》（凡品，不污白纸之身）',
      tone: 'jade',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-188', autoEquip: true },
        { type: 'giveItem', itemId: 'WPN-061', qty: 1 },
        { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
        toast('已习得并装配《三才剑》（凡品·剑法），获赠【青萍游侠剑】与疗伤丹药！', 'success'),
        openScene('SCENE_QC_05_CLIFF_SWORD_LESSON', QINGCHENG_ENTRY_QUEST_ID),
      ],
    },
  ],
}

const SCENE_QC_05_CLIFF_SWORD_LESSON: StorySceneDef = {
  id: 'SCENE_QC_05_CLIFF_SWORD_LESSON',
  title: '第五幕 · 界碑截唐门斥候',
  subtitle: '青城山 · 青城唐门界碑外涧',
  beats: [
    N('你提剑沿后山雾涧奔至界碑外侧，果然撞见一名背着竹篓的唐门外院斥候正准备溜回唐家堡！'),
    S(SPEAKER_TANG_SCOUT, '（手按腰间药囊，冷笑）“哟，青城派派了个刚拿剑的小子来拦路？这三株乌头灵芝长在无主荒涧，谁采到算谁的！”'),
    N('申风涛在后方十丈外抱臂冷眼观战，显然要看你如何把灵芝夺回来。'),
  ],
  choices: [
    {
      id: 'qc_tang_choice_direct',
      label: '二话不说拔剑抢攻，以《三才剑》夺回灵芝',
      tone: 'gold',
      effects: [openScene('SCENE_QC_06_TANG_FIGHT', QINGCHENG_ENTRY_QUEST_ID)],
    },
    {
      id: 'qc_tang_choice_bluff',
      label: '冷笑反扣“盐帮盗图”罪名，逼他自乱阵脚后再出剑',
      tone: 'jade',
      effects: [
        { type: 'giveSilver', amount: 10, reason: '借势讹诈唐门斥候封口银' },
        openScene('SCENE_QC_06_TANG_FIGHT', QINGCHENG_ENTRY_QUEST_ID),
      ],
    },
  ],
}

const SCENE_QC_06_TANG_FIGHT: StorySceneDef = {
  id: 'SCENE_QC_06_TANG_FIGHT',
  title: '第六幕 · 界碑交锋',
  subtitle: '青城山 · 青城唐门界碑外涧',
  beats: [
    N('唐门斥候见避不过去，甩手抖出短刃扑上前来！你握紧青钢剑，依着方正所授《三才剑》抢先递出三招！'),
  ],
  choices: [
    {
      id: 'qc_start_tang_combat',
      label: '迎战唐门外院斥候，夺回乌头灵芝',
      tone: 'gold',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: QC_TANG_SCOUT_NPC },
          rule: 'spar',
          forbidEscapeReason: '申风涛就在十丈外盯着，若退缩便立刻被逐出青城山！',
          onWin: [openScene('SCENE_QC_07_HERB_RETURNED', QINGCHENG_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_QC_06B_TANG_RETRY', QINGCHENG_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_QC_06B_TANG_RETRY: StorySceneDef = {
  id: 'SCENE_QC_06B_TANG_RETRY',
  title: '界碑再战 · 抢攻破绽',
  subtitle: '青城山 · 青城唐门界碑外涧',
  beats: [
    S(SPEAKER_SHEN_FENGTAO, '（在旁冷声提点）“莫跟他缠斗拖延，用《三才剑》先手抢攻他的左肩药篓！”'),
  ],
  choices: [
    {
      id: 'qc_retry_tang_combat',
      label: '重整剑势，再战唐门斥候',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: QC_TANG_SCOUT_NPC },
          rule: 'spar',
          forbidEscapeReason: '申风涛就在十丈外盯着，若退缩便立刻被逐出青城山！',
          onWin: [openScene('SCENE_QC_07_HERB_RETURNED', QINGCHENG_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_QC_06B_TANG_RETRY', QINGCHENG_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_QC_07_HERB_RETURNED: StorySceneDef = {
  id: 'SCENE_QC_07_HERB_RETURNED',
  title: '第七幕 · 急报北追剑门关',
  subtitle: '青城山上清宫 · 松涛云海抚琴孤崖',
  beats: [
    N('你一剑挑落唐门斥候的药篓，将三株乌头灵芝完好夺回，那斥候狼狈逃回唐家堡。'),
    S(SPEAKER_FANG_ZHENG, '（收琴起身，神色微沉）“灵芝虽追回，却刚接到侯师兄飞鸽传书——在成都盗卖暗哨图的外院叛徒【吴六】得知败露，昨晚连夜逃往北边【剑门关】，想投靠川北绿林！”'),
    S(SPEAKER_SHEN_FENGTAO, '“守关的贾天鹤长老已封住剑门栈道，点名要你北上【剑门关 · 剑阁鸟道悬空栈 > 临渊乱石试剑坪】亲自去截杀吴六，清理门户！”'),
  ],
  choices: [
    {
      id: 'qc_go_jianmen',
      label: '持剑北上剑门关，追截叛徒吴六',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 80, mpPct: 80 },
        { type: 'setQuestStep', questId: QINGCHENG_ENTRY_QUEST_ID, stepId: 'jianmen_traitor_hunt' },
        toast('请北上【剑门关 > 剑阁鸟道悬空栈 > 临渊乱石试剑坪】截杀叛徒吴六！', 'success'),
      ],
    },
  ],
}

const SCENE_QC_08_JIANMEN_JIATIANHE: StorySceneDef = {
  id: 'SCENE_QC_08_JIANMEN_JIATIANHE',
  title: '第八幕 · 剑门乱石堵逃徒',
  subtitle: '剑门关 · 临渊乱石试剑坪',
  beats: [
    N('剑门雄关峭壁如削，乱石坪下便是万丈深渊。长老贾天鹤负剑立于栈道口，神色阴鸷冷漠。'),
    S(SPEAKER_JIA_TIANHE, '（下巴朝前方乱石堆一点）“那吴六就在前头绝路里。图是你从盐帮手里抢回来的，人也是因你惊动才逃出来的——我不脏自己的手，你去把他拿下来。记住，青城不留把仇家放虎归山的蠢货。”'),
    N('你提剑步入乱石坪，果然见身穿青城外院服饰的吴六正惊惶张望，见你堵住退路，顿时红了眼拔剑扑来！'),
  ],
  choices: [
    {
      id: 'qc_fight_traitor_wuliu',
      label: '拔剑迎上叛徒吴六，封死退路',
      tone: 'gold',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: QC_TRAITOR_WULIU_NPC },
          rule: 'spar',
          forbidEscapeReason: '贾天鹤长老就在栈道口冷眼盯着，无路可退！',
          onWin: [openScene('SCENE_QC_09_PURGE_DECISION', QINGCHENG_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_QC_08B_WULIU_RETRY', QINGCHENG_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_QC_08B_WULIU_RETRY: StorySceneDef = {
  id: 'SCENE_QC_08B_WULIU_RETRY',
  title: '乱石坪再战 · 困兽之斗',
  subtitle: '剑门关 · 临渊乱石试剑坪',
  beats: [
    N('吴六拼死反扑，招式颇为凶狠。贾天鹤在栈道口冷笑一声：“连个外院逃徒都收拾不了，还想进上清宫？”'),
  ],
  choices: [
    {
      id: 'qc_retry_traitor_wuliu',
      label: '吸气定神，再上乱石坪拿下吴六',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: QC_TRAITOR_WULIU_NPC },
          rule: 'spar',
          forbidEscapeReason: '贾天鹤长老就在栈道口冷眼盯着，无路可退！',
          onWin: [openScene('SCENE_QC_09_PURGE_DECISION', QINGCHENG_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_QC_08B_WULIU_RETRY', QINGCHENG_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_QC_09_PURGE_DECISION: StorySceneDef = {
  id: 'SCENE_QC_09_PURGE_DECISION',
  title: '第九幕 · 绝不姑息或私放逃徒',
  subtitle: '剑门关 · 临渊乱石试剑坪',
  beats: [
    N('数合交锋，你以《三才剑》震飞吴六手中佩剑，一脚踩住他胸口。吴六瘫在碎石地上苦苦哀求：'),
    S(SPEAKER_TRAITOR_WULIU, '“少侠饶命！我家里老母病重才一时糊涂收了盐帮三十两银子……你放我下山，我发誓隐姓埋名再不提青城二字！”'),
    N('风声穿过栈道，远处贾天鹤正缓缓走来。如何处置这名窃密叛徒，全在你一念之间。'),
  ],
  choices: [
    {
      id: 'qc_purge_ruthless',
      label: '果决废去其武功并搜出贴身令牌，交予贾天鹤清理门户',
      tone: 'gold',
      effects: [openScene('SCENE_QC_10_JIATIANHE_PASS', QINGCHENG_ENTRY_QUEST_ID)],
    },
    {
      id: 'qc_purge_mercy',
      label: '心软念其家母，暗中放他从悬崖小道逃走、谎称未追上',
      tone: 'danger',
      effects: [openScene('SCENE_QC_09B_REJECTED_SOFT', QINGCHENG_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_QC_09B_REJECTED_SOFT: StorySceneDef = {
  id: 'SCENE_QC_09B_REJECTED_SOFT',
  title: '逐出青城 · 容不得软骨头',
  subtitle: '剑门关 · 临渊乱石试剑坪',
  beats: [
    N('你收回长剑挥手让吴六滚下山崖小道。不料不到半盏茶功夫，山道转角突然传来一声惨叫——青城四秀弟子贾昭龙与罗芷蓉拎着吴六的尸体走了上来！'),
    S(SPEAKER_JIA_TIANHE, '（冷笑看着你，目光如刀）“当我贾天鹤老眼昏花么？放走窃密叛徒还敢谎报未追上——我青城派容不下连叛徒都下不去手的软骨头！把青城令留下，滚下山去，此生莫再踏入上清宫半步！”'),
  ],
  choices: [
    {
      id: 'qc_confirm_rejected_soft',
      label: '黯然离开剑门关（永绝青城派）',
      tone: 'danger',
      effects: [
        { type: 'setFlag', flag: 'qc_permanently_rejected', value: true },
        { type: 'abandonQuest', questId: QINGCHENG_ENTRY_QUEST_ID },
        toast('因心软私放叛徒吴六遭贾天鹤逐斥，此生再无缘拜入【青城派】！', 'warn'),
      ],
    },
  ],
}

const SCENE_QC_10_JIATIANHE_PASS: StorySceneDef = {
  id: 'SCENE_QC_10_JIATIANHE_PASS',
  title: '第十幕 · 门户既清返上清',
  subtitle: '剑门关 · 临渊乱石试剑坪',
  beats: [
    N('你眼神冷定，顺手两剑挑断吴六手筋、废去他仅存的一点外院内息，摘下他腰间青城铜牌一并交给赶来的贾天鹤。'),
    S(SPEAKER_JIA_TIANHE, '（接过铜牌，难得露出一丝冷厉笑意）“手脚干净，不留后患。吴六残躯自有弟子带回戒律堂发落。你回【青城山上清宫松风殿 > 上清松风演剑主殿】去吧，掌门师兄已在殿中候你。”'),
  ],
  choices: [
    {
      id: 'qc_return_shangqing',
      label: '辞别贾天鹤，重返青城山上清松风殿',
      tone: 'jade',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        { type: 'setQuestStep', questId: QINGCHENG_ENTRY_QUEST_ID, stepId: 'shangqing_final_oath' },
        toast('清理门户已毕！请返回【青城山上清宫松风殿 > 上清松风演剑主殿】觐见余沧澜。', 'success'),
      ],
    },
  ],
}

const SCENE_QC_11_YUCANGLAN_AMBITION: StorySceneDef = {
  id: 'SCENE_QC_11_YUCANGLAN_AMBITION',
  title: '第十一幕 · 松风殿前论川西',
  subtitle: '青城山上清宫 · 上清松风演剑主殿',
  illustrationUrl: '/assets/quests/qingcheng_shangqing_choice.jpg',
  illustrationCaption: '松风殿内香火冷冽，余沧澜志在剑压峨眉、雄踞川西',
  beats: [
    N('重返青城山上清松风演剑主殿，两列青城弟子肃立佩剑。掌门余沧澜身着青色道袍端坐主位，眉宇间却透着一股毫不掩饰的枭雄锋芒。'),
    S(SPEAKER_YU_CANGLAN, '（目光如电扫过你）“锦江截暗桩、界碑夺灵芝、剑门清叛徒——三件事办得都像我青城的人。”'),
    S(SPEAKER_YU_CANGLAN, '“今天我不跟你扯什么虚头巴脑的仁义道德。峨眉那帮尼姑道姑占着川西清名，压了我们青城数十年！我收徒只问一句：你可敢随我青城剑走偏锋，把这川西第一宗的名头抢回来？”'),
  ],
  choices: [
    {
      id: 'qc_join_accept',
      label: '“弟子愿随掌门剑走偏锋、争雄川西，拜入青城派！”',
      tone: 'gold',
      effects: [openScene('SCENE_QC_12_JOIN_QINGCHENG', QINGCHENG_ENTRY_QUEST_ID)],
    },
    {
      id: 'qc_join_decline',
      label: '“青城行事非弟子所愿，恕难从命，就此辞别下山。”',
      tone: 'default',
      effects: [openScene('SCENE_QC_12B_DECLINE_PEACEFULLY', QINGCHENG_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_QC_12B_DECLINE_PEACEFULLY: StorySceneDef = {
  id: 'SCENE_QC_12B_DECLINE_PEACEFULLY',
  title: '辞别松风殿 · 缘尽下山',
  subtitle: '青城山上清宫 · 上清松风演剑主殿',
  beats: [
    S(SPEAKER_YU_CANGLAN, '（冷哼一声，挥袖背过身去）“既不敢争雄，留在我松风殿也是废物。带着那套江湖凡品《三才剑》滚下山去吧，从此两不相欠！”'),
  ],
  choices: [
    {
      id: 'qc_confirm_decline',
      label: '退出松风殿，下山另觅机缘',
      tone: 'default',
      effects: [
        { type: 'setFlag', flag: 'qc_permanently_rejected', value: true },
        { type: 'abandonQuest', questId: QINGCHENG_ENTRY_QUEST_ID },
        toast('你婉拒了余沧澜的川西争雄之邀，青城派入门之缘就此止步。', 'talk'),
      ],
    },
  ],
}

const SCENE_QC_12_JOIN_QINGCHENG: StorySceneDef = {
  id: 'SCENE_QC_12_JOIN_QINGCHENG',
  title: '第十二幕 · 授传松风剑',
  subtitle: '青城山上清宫 · 上清松风演剑主殿',
  illustrationUrl: '/assets/quests/qingcheng_shangqing_choice.jpg',
  illustrationCaption: '松风剑谱入怀，青城上清宫新添一把快剑',
  beats: [
    S(SPEAKER_YU_CANGLAN, '（朗声大笑，亲自走下丹陛将一卷青皮剑谱拍入你手心）“好！够果决，才配使我青城的剑！今日我正式收你入青城门墙，亲授本门【青城松风剑】！”'),
    N('你单膝拜受剑谱与松风道袍，殿外松涛阵阵如剑鸣。自此位列蜀中青城派门下！'),
  ],
  choices: [
    {
      id: 'qc_complete_entry',
      label: '拜入青城派，领受《青城松风剑》',
      tone: 'jade',
      effects: [
        { type: 'joinSect', sectId: 'SECT-14', rank: 1 },
        { type: 'teachMartialArt', artId: 'MA-148', autoEquip: true },
        { type: 'giveSilver', amount: 50, reason: '青城派入门赏银' },
        { type: 'modifyRenown', delta: 15, reason: '拜入蜀中青城派' },
        { type: 'completeQuest', questId: QINGCHENG_ENTRY_QUEST_ID },
        toast('恭喜正式拜入【青城派（SECT-14）】，习得《青城松风剑》（良品下品）并获五十两赏银！', 'success'),
      ],
    },
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  [SCENE_QC_01_TEAHOUSE_SPY.id]: SCENE_QC_01_TEAHOUSE_SPY,
  [SCENE_QC_01B_SPY_RETRY.id]: SCENE_QC_01B_SPY_RETRY,
  [SCENE_QC_02_SPY_CAPTURED.id]: SCENE_QC_02_SPY_CAPTURED,
  [SCENE_QC_03_HOU_ORDER.id]: SCENE_QC_03_HOU_ORDER,
  [SCENE_QC_04_SHANGQING_WELLS.id]: SCENE_QC_04_SHANGQING_WELLS,
  [SCENE_QC_05_CLIFF_SWORD_LESSON.id]: SCENE_QC_05_CLIFF_SWORD_LESSON,
  [SCENE_QC_06_TANG_FIGHT.id]: SCENE_QC_06_TANG_FIGHT,
  [SCENE_QC_06B_TANG_RETRY.id]: SCENE_QC_06B_TANG_RETRY,
  [SCENE_QC_07_HERB_RETURNED.id]: SCENE_QC_07_HERB_RETURNED,
  [SCENE_QC_08_JIANMEN_JIATIANHE.id]: SCENE_QC_08_JIANMEN_JIATIANHE,
  [SCENE_QC_08B_WULIU_RETRY.id]: SCENE_QC_08B_WULIU_RETRY,
  [SCENE_QC_09_PURGE_DECISION.id]: SCENE_QC_09_PURGE_DECISION,
  [SCENE_QC_09B_REJECTED_SOFT.id]: SCENE_QC_09B_REJECTED_SOFT,
  [SCENE_QC_10_JIATIANHE_PASS.id]: SCENE_QC_10_JIATIANHE_PASS,
  [SCENE_QC_11_YUCANGLAN_AMBITION.id]: SCENE_QC_11_YUCANGLAN_AMBITION,
  [SCENE_QC_12B_DECLINE_PEACEFULLY.id]: SCENE_QC_12B_DECLINE_PEACEFULLY,
  [SCENE_QC_12_JOIN_QINGCHENG.id]: SCENE_QC_12_JOIN_QINGCHENG,
}
