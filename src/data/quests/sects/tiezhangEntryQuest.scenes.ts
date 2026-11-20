import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, S, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { TIEZHANG_ENTRY_QUEST_ID } from './tiezhangEntryQuest'

const EXTRA_SCENES: Record<string, StorySceneDef> = {}
function regScene(sc: StorySceneDef): string {
  EXTRA_SCENES[sc.id] = sc
  return sc.id
}

const SPEAKER_SALT_BULLY: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑齿水枭',
  title: '汉水私盐匪首',
  factionName: '江湖恶徒',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_TAX_CLERK: StorySpeakerSpec = {
  kind: 'custom',
  name: '汉水钞关小吏',
  title: '襄阳水路税官',
  factionName: '地方官吏',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
}

const SPEAKER_TZ_GUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '铁掌帮众',
  title: '水陆连环寨护寨帮众',
  factionName: '铁掌帮',
  portraitUrl: '/assets/characters/templates/tpl_tiezhang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tiezhang_av.jpg',
}

function buildSaltBullyNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_TZ_SALT_BULLY',
    name: '黑齿水枭',
    title: '汉水私盐匪首 · 抢船恶徒',
    realm: '不入流',
    factionId: 'ORG-01',
    factionName: '汉水匪帮',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    stats: { hp: 200, mp: 70, agi: 15, res: 7 },
    talents: { bone: 36, comprehension: 30, charm: 20 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-201', move2: 'MA-189' },
    learnedArts: [{ artId: 'MA-199', level: 1 }, { artId: 'MA-201', level: 2 }, { artId: 'MA-189', level: 1 }],
    equipped: {
      weapon: 'WPN-076',
      armor: 'ARM-044',
      shoes: 'BOT-023',
      bow: 'BOW-022',
      accessory1: 'ACC-041',
      accessory2: 'ACC-043',
      mount: 'MNT-021',
    },
    talk: '“铁掌帮的五指旗又如何？这船黑铁砂今天老子截定了！”',
  })
}

function buildFeiyuBanditNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_TZ_FEIYU_CHIEF',
    name: '飞鱼寨主',
    title: '洞庭抗税湖匪头目',
    realm: '三流下品',
    factionId: 'ORG-01',
    factionName: '飞鱼水寨',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    stats: { hp: 310, mp: 130, agi: 20, res: 11 },
    talents: { bone: 44, comprehension: 36, charm: 24 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-189', move2: 'MA-201' },
    learnedArts: [{ artId: 'MA-199', level: 2 }, { artId: 'MA-189', level: 2 }, { artId: 'MA-201', level: 2 }],
    equipped: {
      weapon: 'WPN-076',
      armor: 'ARM-041',
      shoes: 'BOT-022',
      bow: 'BOW-022',
      accessory1: 'ACC-043',
      accessory2: 'ACC-041',
      mount: 'MNT-021',
    },
    talk: '“凭你们铁掌帮几个毛头小子，也敢夜袭老子的飞鱼寨？！”',
  })
}

function buildYoungChiefNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_TZ_SHANGGUAN_YUNBAO',
    name: '上官云豹',
    title: '铁掌帮 · 少帮主（三合试拳）',
    realm: '三流下品',
    factionId: 'SECT-15',
    factionName: '铁掌帮',
    sectRank: 3,
    sectRankLabel: '少帮主',
    avatarUrl: '/assets/characters/avatars/NPC-0222.jpg',
    portraitUrl: '/assets/characters/fullbody/NPC-0222.jpg',
    stats: { hp: 380, mp: 180, agi: 24, res: 14 },
    talents: { bone: 55, comprehension: 48, charm: 50 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-186', move2: 'MA-182' },
    learnedArts: [{ artId: 'MA-238', level: 3 }, { artId: 'MA-186', level: 3 }, { artId: 'MA-182', level: 2 }],
    equipped: {
      weapon: 'WPN-069',
      armor: 'ARM-038',
      shoes: 'BOT-018',
      bow: 'BOW-021',
      accessory1: 'ACC-043',
      accessory2: 'ACC-041',
      mount: 'MNT-022',
    },
    talk: '“接得住我三掌，你才有资格站到我爹面前！”',
  })
}

const SCENE_TZ_16_WINE_OATH: StorySceneDef = {
  id: 'scene_tz_16_wine_oath',
  title: '第十六幕 · 雄黄摔碗归位',
  subtitle: '洞庭铁掌峰 · 雄踞两湖',
  mandatory: true,
  beats: [
    N('两旁帮众端上两只黑釉大海碗，碗中盛满浓烈刺鼻的洞庭雄黄烈酒。上官天鹏抬手取过一碗，目光扫过堂下群豪，最终落在你的脸上。'),
    S('NPC-0117', '“入我铁掌帮，只有三条死规矩：其一，帮主铁羽令到，水里火里不得推诿；其二，帮内买卖利益，敢吃里扒外者剁手沉湖；其三，在外莫堕了‘五指峰’的威风，打了败仗莫哭爹喊娘！”'),
    N('你端起黑釉大碗，烈酒辣喉如火，却一口饮了个涓滴不剩，随手将空碗朝青砖地上狠狠一摔！“啪”的一声脆响，满堂帮众齐声喝彩！'),
    N('走出聚义正堂时，山下八百里洞庭烟波浩渺，几十艘挂着五指黑旗的楼船正破浪穿梭。你低头看着自己被铁砂磨砺得隐隐泛铜的掌心——在这里，拳头硬便是道理，站得住便是规矩！'),
  ],
  onFinishEffects: [
    { type: 'joinSect', sectId: 'SECT-15', rank: 1 },
    { type: 'modifyRenown', delta: 15, reason: '铁砂淬手、过虎皮问心与青石验掌拜入洞庭铁掌帮' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0117' }, delta: 10 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0176' }, delta: 10 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0222' }, delta: 10 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0223' }, delta: 10 },
    {
      type: 'completeQuest',
      questId: TIEZHANG_ENTRY_QUEST_ID,
      outcome: 'joined_tiezhang',
      combatExp: 70,
    },
    toast(
      '正式拜入荆湘霸帮【洞庭铁掌帮】，授职外门弟子！获赐铁掌帮制式披挂！',
      'success',
      '五指归位',
    ),
  ],
}

const SCENE_TZ_15_STONE_SLAB_TEST: StorySceneDef = {
  id: 'scene_tz_15_stone_slab_test',
  title: '第十五幕 · 青石试掌碑验劲',
  subtitle: '铁掌帮聚义正堂 · 验劲立格',
  mandatory: true,
  beats: [
    S('NPC-0117', '（上官天鹏微微颔首，依旧端坐虎皮交椅未曾起身，只抬手指了指大堂左侧立着的一块半人高青石试掌碑）“话虽说得合我心意，可光靠嘴皮子跨不进五指峰。老夫懒得亲自出手——一掌下去怕收不住劲震碎你的心脉。”'),
    S('NPC-0117', '“你既在罗天豹的赤砂鼎里熬过，便运转新学的《铁砂掌》，往那块青石碑上拍一掌我瞧瞧。拍不出印子，自己滚下山！”'),
    N('你走到青石碑前沉腰坐马，依《铁掌烈火吐纳功》提聚丹田热气至右掌，怒喝一声全力劈落！“砰”的一声闷响，整块青石碑微微一震，你右掌虎口当场震裂渗血，石面上却实打实印出一道浅显而清晰的掌印！'),
    S('NPC-0117', '（上官天鹏目光落于石碑掌印上，这才微一颔首）“虽还差得远，筋骨底子总算扎稳了。倒酒！”'),
  ],
  choices: [
    {
      id: 'tz15_to_wine',
      label: '【抹去虎口血迹抱拳】接过雄黄烈酒大碗',
      tone: 'gold',
      effects: [openScene('scene_tz_16_wine_oath', 'QST-SECT-15-ENTRY')],
    },
  ],
}

function buildSceneTz14Rejected(reason: 'saint' | 'coward' | 'reckless'): string {
  const chiefLine =
    reason === 'saint'
      ? '（上官天鹏脸上的神色瞬间冷若冰霜，猛地一拍虎皮椅扶手）“归顺招安？不结死仇？我铁掌帮上下吃喝用度全靠两湖水陆拼出来，你倒会拿朝廷和正派的大帽子来压我？滚去六扇门当你的走狗吧！”'
      : reason === 'coward'
        ? '（上官天鹏怒极反笑，眼中杀机一闪）“大敌当前先避往他州？养条看门狗还知道对着官差吠两声，你倒学会提前跑路了！留你这种软骨头在山上，早晚出卖同门！”'
        : '（上官天鹏冷冷盯着你，眼神如看死人）“一人一双铁掌尽数屠灭？连天高地厚都分不清的蠢货！这种不知死活的疯子留在帮里，早晚给五指峰招来灭门大祸！”'

  return regScene({
    id: `scene_tz_14_rejected_${reason}`,
    title: '问心落选 · 逐出五指峰',
    subtitle: '铁掌帮聚义正堂 · 永不录用',
    mandatory: true,
    beats: [
      S('NPC-0117', chiefLine),
      S('NPC-0117', '“来人！把他的五指黑铁木令收回来，押送下山！传令洞庭水陆各寨——此人从此永绝铁掌帮山门，再敢踏上五指峰一步，打断双腿沉湖！”'),
      N('两名执法帮众冷着脸夺回木令，将你一路架下山阶，推回汉水码头渡船之上。洞庭烟波浩渺，五指峰却已对你彻底闭门。'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'tz_permanently_rejected', value: true },
      {
        type: 'completeQuest',
        questId: TIEZHANG_ENTRY_QUEST_ID,
        outcome: 'rejected_by_tiezhang',
        combatExp: 15,
      },
      { type: 'teleportPlayer', regionId: 'xiangyang', buildingId: 'xy_dock', spotId: 'xy_dock_east' },
      toast('一言不合遭帮主上官天鹏逐出山门，此生再也无法拜入【洞庭铁掌帮】！', 'warn', '永绝五指峰'),
    ],
  })
}

const SCENE_TZ_14_TIGER_CHAIR_TEST: StorySceneDef = {
  id: 'scene_tz_14_tiger_chair_test',
  title: '第十四幕 · 虎皮交椅问心',
  subtitle: '铁掌帮聚义正堂 · 帮主考校',
  mandatory: true,
  beats: [
    N('聚义正堂高大巍峨，正中铺着一张斑斓猛虎皮交椅。帮主【上官天鹏】端坐其上，鹰目如电，不怒自威；毒砂堂主罗天豹、少帮主上官云豹与焦木分列左右，堂内鸦雀无声。'),
    S('NPC-0117', '“汉水立威、赤砂淬手、夜袭飞鱼寨、又过云豹三招——一路走到这聚义正堂，倒还算有些胆气。”'),
    S('NPC-0117', '“不过老夫先丑话说在前头：我铁掌帮雄踞两湖八百里水陆，既不是朝廷善堂，也不是少林丐帮那等名门正派。日后若遇上官府大军围剿，或是正道名门拿‘侠义’二字联手压我五指峰，你待如何？”'),
  ],
  choices: [
    {
      id: 'tz14_opt_saint',
      label: '“当以大宋律法与江湖大义为重，弟子愿力劝帮主归顺招安，莫与朝廷和名门正派结下死仇。”',
      tone: 'default',
      effects: [openScene(buildSceneTz14Rejected('saint'), 'QST-SECT-15-ENTRY')],
    },
    {
      id: 'tz14_opt_coward',
      label: '“大敌当前不可硬拼，弟子届时先避往他州保存实力，日后再图协助帮主东山再起。”',
      tone: 'default',
      effects: [openScene(buildSceneTz14Rejected('coward'), 'QST-SECT-15-ENTRY')],
    },
    {
      id: 'tz14_opt_loyal_ruthless',
      label: '“既食铁掌帮之禄、承五指峰之艺，自当与山门同进退——官府要战便血战到底，正派敢压便以铁掌打回！”',
      tone: 'default',
      effects: [openScene('scene_tz_15_stone_slab_test', 'QST-SECT-15-ENTRY')],
    },
    {
      id: 'tz14_opt_reckless',
      label: '“有弟子在，区区官府兵马与正道群雄何足挂齿？弟子一人一双铁掌便能替帮主尽数屠灭！”',
      tone: 'default',
      effects: [openScene(buildSceneTz14Rejected('reckless'), 'QST-SECT-15-ENTRY')],
    },
  ],
}

function buildSceneTz13AfterDuel(didWin: boolean): string {
  return regScene({
    id: `scene_tz_13b_after_duel_${didWin ? 'win' : 'grit'}`,
    title: didWin ? '中峰立威 · 少主服气' : '中峰立威 · 硬骨不退',
    subtitle: '五指中峰外涧',
    mandatory: true,
    beats: [
      didWin
        ? S('NPC-0222', '（上官云豹倒退半步，盯着你微微发红的双掌，冷哼一声收招）“好小子，赤砂鼎里熬出来的手劲果然够狠！这三招算你接住了！”')
        : S('NPC-0222', '（上官云豹收掌而立，见你硬挨三招仍死死站着没退，嘴角扯出一丝冷笑）“哼，挨打倒是挺抗揍，在飞鱼寨没给焦木丢脸！”'),
      S('NPC-0222', '“行了，我爹和罗堂主都在第一指峰【聚义正堂】等着。自己上去吧——不过提醒你一句，我爹最恨嘴上没把门、又或者心怀异志的滑头，答话前先掂量掂量脑袋！”'),
    ],
    choices: [
      {
        id: `tz13b_to_hall_${didWin ? 'w' : 'g'}`,
        label: '【拱手辞别少帮主】登临铁掌帮聚义正堂',
        tone: 'gold',
        effects: [
          { type: 'setQuestStep', questId: TIEZHANG_ENTRY_QUEST_ID, stepId: 'hall_chief_trial' },
          openScene('scene_tz_14_tiger_chair_test', 'QST-SECT-15-ENTRY'),
        ],
      },
    ],
  })
}

const SCENE_TZ_13_YOUNG_CHIEF_DUEL: StorySceneDef = {
  id: 'scene_tz_13_young_chief_duel',
  title: '第十三幕 · 少主三招试拳',
  subtitle: '洞庭铁掌峰 · 五指中峰外涧',
  mandatory: true,
  beats: [
    S('NPC-0222', '“出招吧！别指望我留手——让我看看刚学会铁砂掌的新丁，究竟有几斤几两！”'),
  ],
  choices: [
    {
      id: 'tz13_fight_yunbao',
      label: '【沉肩亮掌】“请少帮主赐招！”（三回合试拳，胜负皆可推进）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: buildYoungChiefNpc() },
          questId: TIEZHANG_ENTRY_QUEST_ID,
          rule: 'spar',
          maxRounds: 3,
          forbidEscapeReason: '少帮主亲试三招，岂能临阵逃窜！',
          onWin: [openScene(buildSceneTz13AfterDuel(true), 'QST-SECT-15-ENTRY')],
          onLose: [openScene(buildSceneTz13AfterDuel(false), 'QST-SECT-15-ENTRY')],
          onDraw: [openScene(buildSceneTz13AfterDuel(true), 'QST-SECT-15-ENTRY')],
        },
      ],
    },
  ],
}

const SCENE_TZ_12_CLIFF_BLOCK: StorySceneDef = {
  id: 'scene_tz_12_cliff_block',
  title: '第十二幕 · 剑痕崖阻路',
  subtitle: '洞庭铁掌峰 · 五指中峰外涧',
  mandatory: true,
  beats: [
    N('踏着山风行至五指中峰禁地外涧，一道玄衣身影抱臂横在石阶正中，正是桀骜不驯的少帮主【上官云豹】。'),
    S('NPC-0222', '（上官云豹斜睨着你，语气带着几分不屑）“听说你在汉水码头替焦木出了风头，昨晚又在飞鱼水寨立了功？我不管你以前是什么来路——想见我爹，先接我三招不倒再说！”'),
  ],
  choices: [
    {
      id: 'tz12_accept_challenge',
      label: '【踏前一步】“既要过少帮主这一关，那便请动手吧！”',
      tone: 'primary',
      effects: [openScene('scene_tz_13_young_chief_duel', 'QST-SECT-15-ENTRY')],
    },
  ],
}

function buildSceneTz11AfterRaid(mode: 'fight_win' | 'fight_grit' | 'sabotage'): string {
  const intro =
    mode === 'sabotage'
      ? N('你悄然潜入暗水之下，借铁砂掌震断飞鱼水寨主楼船龙骨木栓；敌船瞬间倾斜进水、火把滚落引燃望楼，寨内顿时大乱，焦木趁势率众杀入，生擒飞鱼寨主！')
      : mode === 'fight_win'
        ? N('你借着夜雾抢上敌寨木台，刚练成的《铁砂掌》虽尚显生涩，却招招狠辣直奔要害，三两合便将飞鱼寨主拍翻在地，夺下对方山寨大旗！')
        : N('飞鱼寨主刀法凶悍，你硬挨两记刀背仍死死抱住敌寨旗杆不放，一把火点燃望楼茅棚，为后续冲杀上岸的铁掌帮众打开突破口！')

  return regScene({
    id: `scene_tz_11b_raid_${mode}`,
    title: '夺旗破寨 · 投名立功',
    subtitle: '洞庭南岸飞鱼水寨',
    mandatory: true,
    beats: [
      intro,
      S('NPC-0223', '（焦木一把扯下飞鱼水寨残旗踩在脚底，冲着跪地求饶的寨主冷哼一声，随即拍了拍你的肩膀）“好！够狠、也够干脆！这船生铁押回五指峰后，我自会向帮主报你的头功。你先上【五指中峰禁地秘冢】外涧走一趟，少帮主上官云豹等着试你三招！”'),
    ],
    choices: [
      {
        id: `tz11b_to_peak_${mode}`,
        label: '【押船凯旋】前往五指中峰外涧会见少帮主',
        tone: 'gold',
        effects: [
          { type: 'setQuestStep', questId: TIEZHANG_ENTRY_QUEST_ID, stepId: 'peak_young_chief' },
          toast('夜袭飞鱼水寨大获全胜！请前往【五指中峰禁地秘冢】外涧。', 'success', '夺旗立功'),
        ],
      },
    ],
  })
}

const SCENE_TZ_11_NIGHT_RAID: StorySceneDef = {
  id: 'scene_tz_11_night_raid',
  title: '第十一幕 · 雾夜抢滩夺旗',
  subtitle: '洞庭南岸 · 飞鱼水寨',
  mandatory: true,
  beats: [
    N('三更时分，湖面大雾弥漫，乌篷快舟悄无声息摸近飞鱼水寨木栅。望楼上火把摇曳，几名守夜水匪正围着炭盆喝酒猜拳，丝毫未觉杀机已至。'),
    S('NPC-0223', '（焦木压低嗓音，手按铁桨）“前头木栅后便是飞鱼寨主帐和咱们被扣的生铁船。怎么动手的门道你自己挑——要么随我正面杀进去夺旗，要么摸进暗水凿穿他的主楼船！”'),
  ],
  choices: [
    {
      id: 'tz11_front_assault',
      label: '【正面破栅夺旗】运起刚学的铁砂掌强攻寨主（胜负皆可推进）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: buildFeiyuBanditNpc() },
          questId: TIEZHANG_ENTRY_QUEST_ID,
          rule: 'spar',
          maxRounds: 4,
          forbidEscapeReason: '夜袭敌寨，哪有临阵撤退之理！',
          onWin: [openScene(buildSceneTz11AfterRaid('fight_win'), 'QST-SECT-15-ENTRY')],
          onLose: [openScene(buildSceneTz11AfterRaid('fight_grit'), 'QST-SECT-15-ENTRY')],
          onDraw: [openScene(buildSceneTz11AfterRaid('fight_win'), 'QST-SECT-15-ENTRY')],
        },
      ],
    },
    {
      id: 'tz11_water_sabotage',
      label: '【潜水凿舟智取】摸进水底震断主楼船龙骨，纵火乱敌（需 悟性 ≥ 65 或 算术 ≥ 10）',
      subLabel: '兵不血刃，巧取生铁船',
      tone: 'jade',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 65 },
          { type: 'skillAtLeast', key: '算术', min: 10 },
        ],
      },
      effects: [openScene(buildSceneTz11AfterRaid('sabotage'), 'QST-SECT-15-ENTRY')],
    },
  ],
}

const SCENE_TZ_10_FEIYU_TAX_REVOLT: StorySceneDef = {
  id: 'scene_tz_10_feiyu_tax_revolt',
  title: '第十幕 · 飞鱼水寨抗税',
  subtitle: '洞庭水陆连环寨 · 泊船坞',
  mandatory: true,
  beats: [
    N('次日入夜，水陆连环寨泊船坞灯火通明，几十名精锐铁掌帮众正整顿短刀挠钩，准备登舟。铜桨舵主【焦木】见你走来，随手抛来一柄防身铁尺。'),
    S('NPC-0223', '“洞庭南岸那伙叫‘飞鱼水寨’的散匪最近骨头痒了——连续两个月抗缴湖面抽成，前天还把咱们运往五指峰的一船生铁给扣了！罗堂主说你刚在鼎里熬出了点铁砂掌火候，今晚随我去把场子砸了、把船抢回来！”'),
  ],
  choices: [
    {
      id: 'tz10_board_boat',
      label: '【跃上乌篷快舟】“正愁没地方试试手劲，这就出发！”',
      tone: 'gold',
      effects: [openScene('scene_tz_11_night_raid', 'QST-SECT-15-ENTRY')],
    },
  ],
}

const SCENE_TZ_09_POISON_POWDER: StorySceneDef = {
  id: 'scene_tz_09_poison_powder',
  title: '第九幕 · 毒粉封口',
  subtitle: '前坪百斤铁沙场',
  mandatory: true,
  beats: [
    N('一炷香熬完，你猛地抽回双手，但见十指皮肉通红焦灼，掌心却隐隐透出一股滚烫沉雄的劲力。毒砂堂主【罗天豹】面无表情地从怀里摸出一小包黑灰药粉，直接扔到你脚边。'),
    S('NPC-0176', '“自己拿去抹上！铁掌帮里没有娇生惯养的少爷小姐，练铁掌就是拿血肉换铁骨。明天一早去【洞庭水陆连环寨】东侧泊船坞找焦木——南岸飞鱼水寨抗税扣船，拿他们试试你新学的两手掌法！”'),
    N('你忍着火辣辣的剧痛自己敷好药粉，默念方才那几句粗犷的行气口诀，心中对铁掌帮狠辣务实的作风又多了一分体会。'),
  ],
  choices: [
    {
      id: 'tz09_to_raid',
      label: '【握紧双拳】下山前往连环寨泊船坞会合焦木',
      tone: 'gold',
      effects: [
        { type: 'setQuestStep', questId: TIEZHANG_ENTRY_QUEST_ID, stepId: 'raid_feiyu_stockade' },
        toast('请前往【洞庭水陆连环寨】东侧泊船坞，随焦木夜袭飞鱼水寨！', 'talk', '夺旗投名'),
      ],
    },
  ],
}

const SCENE_TZ_08_RED_SAND_CAULDRON: StorySceneDef = {
  id: 'scene_tz_08_red_sand_cauldron',
  title: '第八幕 · 赤砂沸鼎淬凡掌',
  subtitle: '第一指峰 · 前坪百斤铁沙场',
  illustrationUrl: '/assets/quests/tiezhang_red_sand_cauldron.jpg',
  illustrationCaption: '前坪百斤铁沙场 · 滚烫赤砂沸鼎淬掌破零传功',
  mandatory: true,
  beats: [
    N('你深吸一口气，双掌猛地探入滚烫如烙铁的赤砂之中！十指瞬间犹如被千百根烧红的钢针齐齐扎刺，汗珠顺着额角滚落，滴在铁砂上瞬间化作青烟。'),
    S('NPC-0176', '（罗天豹冷眼盯着漏刻，口中冷冷吐出数句行气法诀）“别光靠蛮力硬扛！把气往下沉，顺着掌心劳宫穴把毒砂热煞往外逼——扛不住就自己抽手滚蛋！”'),
    N('你咬碎牙关硬撑一炷香，强忍剧痛依言催动气血顺着经脉运转一周，竟觉双掌筋骨发出一声轻响，初通《铁掌烈火吐纳功》与《铁砂掌》入门门道！'),
  ],
  choices: [
    {
      id: 'tz08_finish_temper',
      label: '【咬牙熬足一炷香】习得铁掌筑基功夫！',
      tone: 'gold',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-229', level: 1, exp: 400, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-236', level: 1, exp: 400, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-186', level: 1, exp: 350, autoEquip: true },
        toast('熬过赤砂沸鼎！习得《铁掌烈火吐纳功》《铁掌劈碑手》《铁砂掌》！', 'success', '赤砂淬掌'),
        openScene('scene_tz_09_poison_powder', 'QST-SECT-15-ENTRY'),
      ],
    },
  ],
}

const SCENE_TZ_07_POISON_SAND_HALL: StorySceneDef = {
  id: 'scene_tz_07_poison_sand_hall',
  title: '第七幕 · 初见毒砂堂',
  subtitle: '第一指峰 · 前坪百斤铁沙场',
  mandatory: true,
  beats: [
    N('第一指峰前坪青石地上架着一口丈许宽的黑铁大鼎，鼎下松柴烈火熊熊燃烧，鼎内半锅混合着湘西毒砂与朱砂的铁砂炒得赤红发烫，热浪滚滚扑面！'),
    S('NPC-0176', '（毒砂堂主罗天豹负手立于铁鼎旁，冷笑一声）“焦木说你在船坞扛铜桨没趴下？光有蛮力不够，我铁掌帮最看不起细皮嫩肉的软脚虾！把双手插进这滚烫铁砂里熬足一炷香——叫一声痛，立刻滚下五指峰！”'),
  ],
  choices: [
    {
      id: 'tz07_plunge_hands',
      label: '【沉气迈步】双手直插滚烫赤砂沸鼎！',
      tone: 'danger',
      effects: [openScene('scene_tz_08_red_sand_cauldron', 'QST-SECT-15-ENTRY')],
    },
  ],
}

function buildSceneTz06Result(method: 'bone' | 'wits'): string {
  return regScene({
    id: `scene_tz_06b_paddle_${method}`,
    title: '铜桨桩稳 · 获准登山',
    subtitle: '洞庭水陆连环寨',
    mandatory: true,
    beats: [
      method === 'bone'
        ? N('你凭借扎实的筋骨硬生生咬牙抱住百斤铜桨，任凭湖浪拍击木坞摇晃，双脚如同生根般死死钉在船板上半个时辰未动！')
        : N('你灵机一动，不再与船身摇晃硬顶，而是顺着浪涌节奏微曲膝盖借力卸劲，硬是用巧劲把百斤铜桨稳稳端平了半个时辰！'),
      S('NPC-0223', '（焦木看罢点点头）“下盘算稳住了。上第一指峰【前坪百斤铁沙场】找毒砂堂主罗天豹吧，过了他那口赤砂沸鼎，你才算摸到铁掌帮的门槛。”'),
    ],
    choices: [
      {
        id: `tz06b_to_red_sand_${method}`,
        label: '【放下百斤铜桨】登临第一指峰前坪百斤铁沙场',
        tone: 'gold',
        effects: [{ type: 'setQuestStep', questId: TIEZHANG_ENTRY_QUEST_ID, stepId: 'temper_red_sand' }],
      },
    ],
  })
}

const SCENE_TZ_06_HEAVY_PADDLE: StorySceneDef = {
  id: 'scene_tz_06_heavy_paddle',
  title: '第六幕 · 百斤铜桨定下盘',
  subtitle: '洞庭水陆连环寨 · 船坞木桩',
  mandatory: true,
  beats: [
    N('快船靠岸，寨内全无虚礼寒暄。焦木直接指着船坞旁两根精铜铸造的百斤大船桨，让你抱起一根站在随波起伏的浮木排上扎马步。'),
    S('NPC-0223', '“湖上动手跟陆地不同，脚底浮木一晃，重心偏半分就得掉进洞庭湖喂王八！抱稳这根百斤铜桨熬过半个时辰，掉下水自己游回襄阳去！”'),
  ],
  choices: [
    {
      id: 'tz06_endure_bone',
      label: '【沉腰坐马】凭一股狠劲硬扛百斤铜桨半个时辰',
      tone: 'primary',
      effects: [openScene(buildSceneTz06Result('bone'), 'QST-SECT-15-ENTRY')],
    },
    {
      id: 'tz06_borrow_waves',
      label: '【顺浪借力】随浮木摇晃微调重心，以巧劲稳桩（需 悟性 ≥ 65 或 根骨 ≥ 65）',
      subLabel: '事半功倍，显露武学根器',
      tone: 'jade',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 65 },
          { type: 'talentAtLeast', key: '根骨', min: 65 },
        ],
      },
      effects: [openScene(buildSceneTz06Result('wits'), 'QST-SECT-15-ENTRY')],
    },
  ],
}

const SCENE_TZ_05_FIVE_FINGERS: StorySceneDef = {
  id: 'scene_tz_05_five_fingers',
  title: '第五幕 · 八百烟波五指擎',
  subtitle: '洞庭铁掌峰 · 水陆连环寨',
  illustrationUrl: '/assets/quests/tiezhang_five_fingers_mist.jpg',
  illustrationCaption: '八百里洞庭烟波 · 铁掌峰五指擎天水陆连环寨',
  mandatory: true,
  beats: [
    N('铁掌帮乌篷快船乘风破浪，穿过八百里洞庭重重芦苇迷障。前方烟波浩渺之处，五座奇险峭壁犹如一只遮天蔽日的巨掌直插云霄，寨墙上黑色五指大旗猎猎作响。'),
    S('NPC-0223', '（焦木站在船头任由湖风吹乱鬓发，指着绝壁上的连环水寨说道）“瞧见了么？这便是五指峰。咱们铁掌帮在荆湘两湖横行这么多年，靠的不是求爷爷告奶奶——官府的税敢截，江湖的账敢平，进了五指山，全凭双手吃饭！”'),
  ],
  choices: [
    {
      id: 'tz05_to_paddle',
      label: '【跃上船坞浮木】接受初入水寨的第一场苦桩考校',
      tone: 'gold',
      effects: [openScene('scene_tz_06_heavy_paddle', 'QST-SECT-15-ENTRY')],
    },
  ],
}

const SCENE_TZ_04_IRON_TOKEN: StorySceneDef = {
  id: 'scene_tz_04_iron_token',
  title: '第四幕 · 黑铁木令',
  subtitle: '襄阳汉水大码头',
  mandatory: true,
  beats: [
    N('走出钞关公堂，焦木从怀里摸出一枚沉甸甸、刻着五指掌纹的黑铁木牌，抛进你怀中。'),
    S('NPC-0223', '“动手够狠辣，见了黑白两道的脏账也不哆嗦。这枚【五指黑铁木令】你拿着，随南下的货船去【洞庭铁掌峰 · 水陆连环寨】找我报到。至于能不能活过毒砂堂主和帮主那一关，就看你自己的造化了！”'),
  ],
  choices: [
    {
      id: 'tz04_set_off',
      label: '【接过五指黑铁木令】南下洞庭铁掌峰！',
      tone: 'gold',
      effects: [
        { type: 'setQuestStep', questId: TIEZHANG_ENTRY_QUEST_ID, stepId: 'sail_to_tiezhang' },
        toast('获得信物【五指黑铁木令】！请前往【洞庭铁掌峰 · 洞庭水陆连环寨】。', 'talk', '黑铁木令'),
      ],
    },
  ],
}

const SCENE_TZ_03_CUSTOMS_ACCOUNT: StorySceneDef = {
  id: 'scene_tz_03_customs_account',
  title: '第三幕 · 钞关算账',
  subtitle: '襄阳汉水大码头 · 钞关厅',
  mandatory: true,
  beats: [
    N('水贼退散后，焦木领着你大摇大摆走进汉水钞关厅。原本高坐公案后的【汉水钞关小吏】见焦木进来，竟吓得忙不迭起身陪笑。'),
    S('NPC-0223', '（焦木“啪”地将从水枭手里截下的私盐暗账拍在官案上）“王税官，黑齿那伙水老鼠敢在汉水截我铁掌帮的船，背后没你们钞关漏水文？按老规矩——这批扣下的私盐三七分账，七成归五指峰，三成留给你们官府堵嘴，没意见吧？”'),
    S(SPEAKER_TAX_CLERK, '（钞关小吏额头冒汗，连声哈腰）“不敢、不敢！全凭焦舵主做主，官面上的批文小的这就补齐！”'),
    N('你站在一旁将这一幕尽收眼底——原来洞庭铁掌帮在荆湘两湖早已自成一方黑白霸主，既不卖水匪账，更不惧地方官府。'),
  ],
  choices: [
    {
      id: 'tz03_to_token',
      label: '【神色平静随焦木步出公堂】“这便是两湖水陆的规矩么？”',
      tone: 'primary',
      effects: [openScene('scene_tz_04_iron_token', 'QST-SECT-15-ENTRY')],
    },
  ],
}

function buildSceneTz02AfterDock(mode: 'fight_win' | 'fight_grit' | 'transfer'): string {
  const intro =
    mode === 'transfer'
      ? N('你亮出江南/五溪水陆同脉的底子与架势，几名原本嚣张的盐枭顿时脸色一变，互望一眼后灰溜溜收刀退散。')
      : mode === 'fight_win'
        ? N('你拳脚狠辣毫不留情，三两下便将带头的黑齿水枭踢翻在栈桥木板上，其余喽啰见势不妙顿时作鸟兽散。')
        : N('你虽未占到上风，却死死拽住船缆硬扛数拳寸步不退，反倒把黑齿水枭镇住，加上栈桥铁掌帮众提刀围拢，水贼只能狠话收场逃窜。')

  return regScene({
    id: `scene_tz_02_dock_${mode}`,
    title: '第二幕 · 栈桥夺船立威',
    subtitle: '襄阳汉水大码头',
    mandatory: true,
    beats: [
      intro,
      S('NPC-0223', '（铜桨舵主焦木扛着沉重铁桨大步走来，扫了一眼狼藉的栈桥，咧嘴一笑）“行啊，动手够狠辣，没给咱们码头丢份！随我进钞关厅算完这笔账，再谈上山的事。”'),
    ],
    choices: [
      {
        id: `tz02_to_customs_${mode}`,
        label: '【随焦木步入汉水钞关厅】',
        tone: 'gold',
        effects: [openScene('scene_tz_03_customs_account', 'QST-SECT-15-ENTRY')],
      },
    ],
  })
}

const SCENE_TZ_01_HANSHUI_BLACK_FLAG: StorySceneDef = {
  id: 'scene_tz_01_hanshui_black_flag',
  title: '第一幕 · 汉水黑旗倒',
  subtitle: '{reignYear} · 襄阳府汉水大码头',
  mandatory: true,
  beats: [
    N('{reignYear}汉水码头千帆竞渡，唯独停泊铁掌帮黑铁砂货船的栈桥前吵嚷一片。一伙凶神恶煞的私盐水匪持刀围住货船，领头的【黑齿水枭】一脚踹翻了竖在船头的五指黑旗。'),
    S(SPEAKER_SALT_BULLY, '“什么狗屁洞庭铁掌帮！到了汉水地面，就得按老子的规矩交过路盐引！今儿这船黑铁砂，老子扣下了！”'),
    N('栈桥阴凉处，铁掌帮铜桨舵主【焦木】冷冷抱臂观望，瞥见在一旁驻足的你，随口沉声喝道。'),
    S('NPC-0223', '“想投我铁掌帮？咱们帮里不养只会念经说教的废物——看见那伙砸场子的水贼没？替我把领头的黑齿水枭收拾了，这船上的交椅才有你的份！”'),
  ],
  choices: [
    {
      id: 'tz01_fight_bully',
      label: '【提拳抢上栈桥】“铁掌帮的旗子也是你们这帮水老鼠敢踹的？！”（胜负皆可过关）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: buildSaltBullyNpc() },
          questId: TIEZHANG_ENTRY_QUEST_ID,
          rule: 'spar',
          maxRounds: 4,
          forbidEscapeReason: '既是投帮立威，岂有临阵脚底抹油之理！',
          onWin: [openScene(buildSceneTz02AfterDock('fight_win'), 'QST-SECT-15-ENTRY')],
          onLose: [openScene(buildSceneTz02AfterDock('fight_grit'), 'QST-SECT-15-ENTRY')],
          onDraw: [openScene(buildSceneTz02AfterDock('fight_win'), 'QST-SECT-15-ENTRY')],
        },
      ],
    },
    {
      id: 'tz01_transfer_prestige',
      label: '【亮出水陆同脉名号震慑】报出漕帮/怒潮帮/五溪蛊寨旧脉压场',
      subLabel: '江淮漕帮 / 钱塘怒潮帮 / 湘西五溪蛊寨同脉免战通道',
      tone: 'jade',
      condition: {
        type: 'any',
        conditions: [
          { type: 'inSect', sectId: 'SECT-16' },
          { type: 'inSect', sectId: 'SECT-26' },
          { type: 'inSect', sectId: 'SECT-30' },
        ],
      },
      effects: [openScene(buildSceneTz02AfterDock('transfer'), 'QST-SECT-15-ENTRY')],
    },
  ],
}

const SCENE_TZ_00_PEAK_PRELUDE: StorySceneDef = {
  id: 'scene_tz_00_peak_prelude',
  title: '序引 · 五指山门规',
  subtitle: '洞庭铁掌峰 · 洞庭水陆连环寨',
  mandatory: true,
  beats: [
    S(SPEAKER_TZ_GUARD, '（护寨帮众上下打量了你两眼，抬手拦住栈桥）“洞庭总寨不是什么人都能进的。铜桨舵主【焦木】这几日正押船在【襄阳府 · 汉水大码头】镇场子，真想投效铁掌帮，先去汉水码头找焦舵主立下第一份投名功劳！”'),
  ],
  choices: [
    {
      id: 'tz00_go_xiangyang',
      label: '【即刻北上襄阳】前往汉水大码头千帆栈桥寻焦木',
      tone: 'gold',
      effects: [
        { type: 'teleportPlayer', regionId: 'xiangyang', buildingId: 'xy_dock', spotId: 'xy_dock_east' },
        openScene('scene_tz_01_hanshui_black_flag', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz00_later',
      label: '【暂且自行前往】稍后再赴襄阳码头',
      tone: 'default',
      effects: [],
    },
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  ...EXTRA_SCENES,
  [SCENE_TZ_16_WINE_OATH.id]: SCENE_TZ_16_WINE_OATH,
  [SCENE_TZ_15_STONE_SLAB_TEST.id]: SCENE_TZ_15_STONE_SLAB_TEST,
  [SCENE_TZ_14_TIGER_CHAIR_TEST.id]: SCENE_TZ_14_TIGER_CHAIR_TEST,
  [SCENE_TZ_13_YOUNG_CHIEF_DUEL.id]: SCENE_TZ_13_YOUNG_CHIEF_DUEL,
  [SCENE_TZ_12_CLIFF_BLOCK.id]: SCENE_TZ_12_CLIFF_BLOCK,
  [SCENE_TZ_11_NIGHT_RAID.id]: SCENE_TZ_11_NIGHT_RAID,
  [SCENE_TZ_10_FEIYU_TAX_REVOLT.id]: SCENE_TZ_10_FEIYU_TAX_REVOLT,
  [SCENE_TZ_09_POISON_POWDER.id]: SCENE_TZ_09_POISON_POWDER,
  [SCENE_TZ_08_RED_SAND_CAULDRON.id]: SCENE_TZ_08_RED_SAND_CAULDRON,
  [SCENE_TZ_07_POISON_SAND_HALL.id]: SCENE_TZ_07_POISON_SAND_HALL,
  [SCENE_TZ_06_HEAVY_PADDLE.id]: SCENE_TZ_06_HEAVY_PADDLE,
  [SCENE_TZ_05_FIVE_FINGERS.id]: SCENE_TZ_05_FIVE_FINGERS,
  [SCENE_TZ_04_IRON_TOKEN.id]: SCENE_TZ_04_IRON_TOKEN,
  [SCENE_TZ_03_CUSTOMS_ACCOUNT.id]: SCENE_TZ_03_CUSTOMS_ACCOUNT,
  [SCENE_TZ_01_HANSHUI_BLACK_FLAG.id]: SCENE_TZ_01_HANSHUI_BLACK_FLAG,
  [SCENE_TZ_00_PEAK_PRELUDE.id]: SCENE_TZ_00_PEAK_PRELUDE,
}
