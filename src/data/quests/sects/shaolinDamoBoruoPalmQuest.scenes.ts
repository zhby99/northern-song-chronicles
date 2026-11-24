import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q25_QUEST_ID } from './shaolinDamoBoruoPalmQuest'

const SPEAKER_NANHAI_LACKEY: StorySpeakerSpec = {
  kind: 'custom',
  name: '南海派恶徒 · 孙三霸',
  title: '岳老三门下 · 嚣张随从',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildNanhaiDisciple(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ25_NANHAI_LACKEY',
    name: '南海派恶徒 · 孙三霸',
    title: '岳老三门下 · 嚣张随从',
    realm: '二流上品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 2,
    sectRankLabel: '南海随从',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“小秃驴也敢跟我师父岳老二——啊不，岳老三顶嘴！先吃大爷一记南海弯刀！”',
    stats: { hp: 1780, mp: 1080, agi: 56, res: 40 },
    talents: { bone: 76, comprehension: 60, charm: 42 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-133', move2: 'MA-244' },
    learnedArts: [{ artId: 'MA-243', level: 7 }, { artId: 'MA-133', level: 7 }, { artId: 'MA-244', level: 6 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq25_01: {
    id: 'scene_slq25_01',
    title: '第一幕 · 寒玉再会 · 般若真谛',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，幽谷野兰吐芳。继剑痕崖悟得《达摩剑法》后，你复受伏魔首座玄难密召，重返达摩院深处的【幽谷石室 · 寒玉榻】。寒玉微光下，神僧玄澄双目比昔日更显澄明安详；玄难首座案前正摊着一卷泛黄的《般若波罗蜜多心经》古注。'),
      S('NPC-0109', '（声音清越如古磬）“阿弥陀佛！师侄昔年守我寒玉榻、力退慕容暗探，又于剑痕崖挫败包、风双将，苦修未染一丝骄狂之气，老衲甚慰。今日便与玄难师弟合授你少林七十二绝技中最重禅慧的掌法——《般若掌》！”'),
      S('NPC-0127', '“少林拳掌数十门，唯有《般若掌》取『色即是空、空即是色』之理，越练越绵厚、越发越无迹！一掌出而含十八重暗劲叠浪，堪称佛门掌道巅峰！”'),
      S('NPC-0109', '（目光深邃望向你）“老衲昔年强练十三绝技而堕武学障，正因只重招式之『色』、不悟般若之『空』。切记：每一掌递出须如水中涟漪、风过竹林，既无杀念，便无反噬！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_02', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_02: {
    id: 'scene_slq25_02',
    title: '第二幕 · 掌演空色 · 叠浪初成',
    subtitle: '幽谷石室 · 二老传掌',
    illustrationUrl: '/assets/quests/sl_25_boruo_palm.jpg',
    illustrationCaption: '般若掌意 · 幽谷石室寒雾缭绕，玄难演练《般若掌》叠浪掌势，掌风过处石壁水珠悬空凝而不落',
    mandatory: true,
    beats: [
      N('玄难步至石室空地，衣袖轻拂，缓步演练《般若掌》前九式。双掌起落极慢，既无呼啸恶风亦无炫目威势，然而石壁渗出的晶莹水珠却被无形掌劲托得悬空颤动、层层叠浪，半晌方悄然滑落！'),
      N('玄澄于寒玉榻上清朗低语，逐句拆解经脉流转与吐纳换气之法。一演一讲、相得益彰，令你如醍醐灌顶！'),
      N('你依诀试演三遍，忽将《达摩剑法》圆融无滞之意融入双掌，掌风登时由刚转柔、由柔生叠，一掌拍出竟隐隐带起三层连绵气浪！'),
      S('NPC-0127', '（喜形于色）“好！才演三遍便悟出叠浪雏形，若再经一场以柔化刚的硬仗锤炼，便可将十八掌叠浪尽数贯通！”'),
    ],
    onFinishEffects: [teachArtNow('MA-043'), openScene('scene_slq25_03', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_03: {
    id: 'scene_slq25_03',
    title: '第三幕 · 谷外咆哮 · 凶神恶煞',
    subtitle: '幽谷石室 · 恶人闯山',
    mandatory: true,
    beats: [
      N('玄难话音方落，幽谷外松坪忽然炸起一阵震耳欲聋的粗豪咆哮，惊得满谷山雀扑棱棱四散齐飞！'),
      S('NPC-0183', '“少林寺的秃驴们都给老子滚出来！听说你们达摩院新出了个打败包不同、风波恶的厉害小和尚？老子南海鳄神岳老三——不对，岳老二！特地从西夏跑来收他当徒弟！快出来给老子磕八个响头！”'),
      S('NPC-0127', '（眉头紧皱）“西夏一品堂『四大恶人』排行第三的凶神恶煞【岳老三】！此人手使一对百斤精铁鳄嘴剪，武功刚猛暴烈，性子浑噩蛮横，最爱满天下强收根骨奇佳的俊杰做徒弟！”'),
      S('NPC-0109', '（淡然微笑）“阿弥陀佛！善缘恶缘皆是缘。岳老三虽名列恶人，却最讲究江湖信用、言出必行，又最爱跟人争那『老大老二』的虚名。师侄正好借他这股蛮牛刚力，印证你新学的《般若掌》！”'),
    ],
    choices: [
      {
        id: 'slq25_accept_ask',
        label: '【细询岳老三执拗脾性再出谷】先请玄澄点明此人弱点所在，方才步出松坪会客！',
        subLabel: '开启【空色无相 · 般若波罗】智斗南海鳄神阶段',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q25_asked_xuancheng', value: true },
          { type: 'startQuest', questId: SHAOLIN_Q25_QUEST_ID, stepId: 'repel_yuelao3' },
          setStep(SHAOLIN_Q25_QUEST_ID, 'repel_yuelao3'),
          openScene('scene_slq25_04', SHAOLIN_Q25_QUEST_ID),
        ],
      },
      {
        id: 'slq25_accept_direct',
        label: '【合十请缨直步松坪】既有人上门送招磨砺《般若掌》，这就出谷会一会南海鳄神！',
        subLabel: '开启【空色无相 · 般若波罗】智斗南海鳄神阶段',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q25_asked_xuancheng', value: false },
          { type: 'startQuest', questId: SHAOLIN_Q25_QUEST_ID, stepId: 'repel_yuelao3' },
          setStep(SHAOLIN_Q25_QUEST_ID, 'repel_yuelao3'),
          openScene('scene_slq25_04', SHAOLIN_Q25_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq25_04: {
    id: 'scene_slq25_04',
    title: '第四幕 · 松坪对峙 · 强收爱徒',
    subtitle: '达摩院幽谷外坪 · 初见岳老三',
    mandatory: true,
    beats: [
      N('你整肃僧衣步出幽谷，只见外坪上几名巡山武僧严阵以待，中央一名脑袋奇大、脖颈粗短的铁塔壮汉正扛着一对门板宽、布满锯齿的精钢鳄嘴剪大呼小叫，身旁还跟着个满脸横肉、耀武扬威的南海派恶徒孙三霸！'),
      S('NPC-0183', '（瞪圆铜铃双眼上下打量你，乐得猛拍大腿）“哇哈哈！就是你这小和尚！瞧这脑门圆润、肩宽背厚，天生就是练老子『鳄嘴神功』的绝世好苗子！快跪下磕八个响头叫声师父，老子带你吃香喝辣去！”'),
      S(SPEAKER_NANHAI_LACKEY, '（狐假虎威挥刀叫嚣）“听见没有小秃驴！能拜在四大恶人岳老三师父门下是你三生修来的福气——哎哟！”'),
      S('NPC-0183', '（反手一巴掌把孙三霸拍得团团转，气急败坏）“放屁！谁是老三？！老子明明该排老二——不对，日后早晚当老大！小和尚你评评理，老子这身武功，凭啥屈居人下？今儿你要是不拜师，咱师徒俩就先拿剪子跟刀招呼你！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q25_yuelao3_met', value: true },
      openScene('scene_slq25_05', SHAOLIN_Q25_QUEST_ID),
    ],
  },

  scene_slq25_05: {
    id: 'scene_slq25_05',
    title: '第五幕 · 智斗鳄神 · 破局三策',
    subtitle: '达摩院幽谷外坪 · 迎战岳老三（实战）',
    mandatory: true,
    beats: [
      N('岳老三挥舞百斤鳄嘴剪“咔嚓咔嚓”作响，震得松针簌簌坠落；一旁的孙三霸揉着肿脸抽出西夏弯刀，眼看便要仗着人多一齐扑上！'),
      N('{ifFlag:sl_q25_asked_xuancheng|想起玄澄师伯临行提点——岳老三虽浑噩蛮横，却极重江湖信用、绝不肯背食言之名，偏又对「老大老二」的名头执拗得紧；|你凝神观察，见岳老三虽凶神恶煞，却一脸憨直执拗，既爱较真江湖信用，又满脑子纠结着「老大老二」的排行名相；}'),
      P('（微微一笑，双掌自然下垂、般若真气暗蓄于劳宫）“阿弥陀佛！岳施主千里迢迢登少室山，贫僧岂能怠慢——”'),
    ],
    choices: [
      {
        id: 'slq25_tactic_wager',
        label: '【顺势套话激将赌约】捧他「言出必行真豪杰」，立下「旁人不得插手、接我掌势不退便算赢」之约！',
        subLabel: '需辩才 ≥ 55 或棋艺 ≥ 40 · 避开帮凶纠缠，专注 1v1 破鳄嘴剪（胜后禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'skillAtLeast', key: '辩才', min: 55 },
            { type: 'skillAtLeast', key: '棋', min: 40 },
          ],
          hint: '需辩才 ≥ 55 或棋艺 ≥ 40',
        },
        effects: [
          toast('岳老三听你夸他言出必行，把胸脯拍得砰砰作响，一脚踹开孙三霸高喝“不许帮手”！单挑赌约立成！', 'success', '激将赌约'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q25_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0183',
              realmCap: '一流下品',
              talkOverride:
                '“好！老子岳老三最讲江湖信用！孙三霸你滚远点不许插手！小和尚，接老子鳄嘴剪三招不退半步老子就认输下山——输了可得乖乖叫师父！”',
            },
            rule: 'story_trial',
            duelStakesTag: 'spar',
            forbidEscapeReason: '赌约既立，唯有以《般若掌》正面接招震服南海鳄神！',
            introText: '【幽谷松坪 · 江湖赌约】帮凶已被喝退，1v1 以《般若掌》迎战【凶神恶煞 · 岳老三】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q25_yuelao_wager', value: true },
              { type: 'setFlag', flag: 'sl_q25_tactic', value: 'wager' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q25_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q25_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
                ],
              },
              openScene('scene_slq25_07', SHAOLIN_Q25_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('岳老三鳄嘴剪势大力沉！调息后可再于【幽谷石室 · 寒玉榻】外坪续战岳老三。', 'warn', '般若波罗'),
            ],
          },
        ],
      },
      {
        id: 'slq25_tactic_zen',
        label: '【以佛理「空色无相」破其执念】顺着他「谁是老大」的胡搅蛮缠，以禅机问心扰乱其心神！',
        subLabel: '零属性门槛 · 以无剧透禅机对答破其执念',
        tone: 'gold',
        effects: [openScene('scene_slq25_06_zen_riddle', SHAOLIN_Q25_QUEST_ID)],
      },
      {
        id: 'slq25_tactic_clash',
        label: '【般若掌正面硬撼鳄嘴剪】不假巧言，连破南海随从与凶神恶煞岳老三！',
        subLabel: '零门槛正攻 · 车轮连战孙三霸与岳老三（胜后怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q25_QUEST_ID,
            opponent: { kind: 'custom', npc: buildNanhaiDisciple() },
            extraOpponents: [
              {
                kind: 'npc',
                npcId: 'NPC-0183',
                realmCap: '一流下品',
                talkOverride:
                  '“哎呀妈呀！你这小和尚敢打我徒弟，看来不使出真本事你还当老子是吃素的！接老子鳄嘴大剪！”',
              },
            ],
            rule: 'story_trial',
            duelStakesTag: 'spar',
            forbidEscapeReason: '恶人闯上达摩幽谷，岂容其撒野而去！',
            introText: '【幽谷松坪 · 车轮硬撼】连战【孙三霸】与四大恶人【凶神恶煞 · 岳老三】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q25_tactic', value: 'clash' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q25_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q25_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq25_07', SHAOLIN_Q25_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('岳老三鳄嘴剪势大力沉！调息后可再于【幽谷石室 · 寒玉榻】外坪续战岳老三。', 'warn', '般若波罗'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq25_06_zen_riddle: {
    id: 'scene_slq25_06_zen_riddle',
    title: '第六幕 · 名相之辩 · 谁是老大',
    subtitle: '达摩院幽谷外坪 · 空色问禅（实战）',
    mandatory: true,
    beats: [
      N('你合十驻步，不急出手，反倒含笑问起岳老三为何对排行如此耿耿于怀。岳老三一听顿时来劲，扛着大剪跺得青石乱颤，满脸委屈又暴躁地嚷嚷起来！'),
      S('NPC-0183', '“段延庆那老瘸子凭啥排老大？叶二娘那个疯婆娘又凭啥排老二？老子武功又高、脑袋又大、徒弟又多！小和尚你既然读过万卷佛经，快给老子评评——老子究竟是老大还是老二？答好了老子少剪你两下！”'),
      N('眼见岳老三一双铜铃大眼死死盯着你、绞尽脑汁等着你站队评理，你从容以禅理作答——'),
    ],
    choices: [
      {
        id: 'slq25_riddle_rank',
        label: '“岳施主既居四大恶人第三，江湖名号早已传遍天下，强争老二岂非徒惹群豪发笑？”',
        tone: 'default',
        effects: [
          toast('岳老三暴跳如雷：“放屁！敢笑话老子排老三！孙三霸，咱师徒一起剁了这嘴贱的小秃驴！”', 'warn', '触怒鳄神'),
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q25_QUEST_ID,
            opponent: { kind: 'custom', npc: buildNanhaiDisciple() },
            extraOpponents: [
              {
                kind: 'npc',
                npcId: 'NPC-0183',
                realmCap: '一流下品',
                talkOverride: '“气死老子了！先剪秃你的脑门再叫你乖乖改口叫老二师父！”',
              },
            ],
            rule: 'story_trial',
            duelStakesTag: 'spar',
            forbidEscapeReason: '岳老三已暴怒扑上，唯有以《般若掌》迎战制敌！',
            introText: '【幽谷松坪 · 恶人暴怒】连战【孙三霸】与狂怒的【岳老三】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q25_riddle_won', value: false },
              { type: 'setFlag', flag: 'sl_q25_tactic', value: 'clash' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q25_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q25_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq25_07', SHAOLIN_Q25_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('岳老三怒不可遏、剪势狂暴！调息后可再于幽谷外坪重新周旋。', 'warn', '般若波罗'),
            ],
          },
        ],
      },
      {
        id: 'slq25_riddle_empty',
        label: '“若执着于老二老大之名相，便落了凡夫执念——名本是空、实力为色，唯有空色无相方得大自在！”',
        tone: 'default',
        effects: [
          toast('岳老三听得抓耳挠腮、头疼欲裂，大叫“啥空啊色啊老子脑袋要炸了！蠢徒弟滚远点，让老子亲自拆了你的绕口令！”阵脚破绽大露！', 'success', '空色破执'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q25_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0183',
              realmCap: '二流上品',
              talkOverride:
                '“哎哟喂！啥老大是空、老二是色，把老子大好脑袋都绕晕了！孙三霸滚一边去，老子非一剪子剪碎你的破禅理不可！”',
            },
            rule: 'story_trial',
            duelStakesTag: 'spar',
            forbidEscapeReason: '岳老三心神已乱、破绽大露，正宜以《般若掌》一举震服！',
            introText: '【幽谷松坪 · 空色破执】岳老三抓耳挠腮头疼欲裂、喝退帮凶，1v1 破其破绽！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q25_riddle_won', value: true },
              { type: 'setFlag', flag: 'sl_q25_tactic', value: 'zen' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q25_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q25_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
                ],
              },
              openScene('scene_slq25_07', SHAOLIN_Q25_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('岳老三虽被绕晕却仍力大无穷！调息后可再于幽谷外坪迎战。', 'warn', '般若波罗'),
            ],
          },
        ],
      },
      {
        id: 'slq25_riddle_convert',
        label: '“施主若肯放下鳄嘴剪皈依佛门，莫说老二老大，便是做个看守山门的护法又有何难？”',
        tone: 'default',
        effects: [
          toast('岳老三撇嘴大骂：“少拿秃驴那套剃光头规矩哄老子！孙三霸，先替师父教训这小和尚！”', 'warn', '恶人不买账'),
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q25_QUEST_ID,
            opponent: { kind: 'custom', npc: buildNanhaiDisciple() },
            extraOpponents: [
              {
                kind: 'npc',
                npcId: 'NPC-0183',
                realmCap: '一流下品',
                talkOverride: '“老子是来收徒弟的，谁要跟你当和尚吃素！看剪！”',
              },
            ],
            rule: 'story_trial',
            duelStakesTag: 'spar',
            forbidEscapeReason: '岳老三师徒已齐齐攻来，务必护住幽谷清静！',
            introText: '【幽谷松坪 · 车轮硬撼】连战【孙三霸】与【凶神恶煞 · 岳老三】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q25_riddle_won', value: false },
              { type: 'setFlag', flag: 'sl_q25_tactic', value: 'clash' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q25_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q25_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq25_07', SHAOLIN_Q25_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('岳老三鳄嘴剪势大力沉！调息后可再于幽谷外坪续战。', 'warn', '般若波罗'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq25_07: {
    id: 'scene_slq25_07',
    title: '第七幕 · 十八叠浪 · 震裂虎口',
    subtitle: '达摩院幽谷外坪 · 逼退鳄神',
    illustrationUrl: '/assets/quests/sl_25_yuelao3_retreat.jpg',
    illustrationCaption: '般若叠浪 · 第十八掌空色无相轰然拍落鳄嘴剪脊，震裂岳老三虎口，逼得南海鳄神连退七步',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q25_tactic=wager|江湖赌约既成，岳老三全神贯注却被你绵绵掌风引得处处落空；|}{ifFlagEq:sl_q25_tactic=zen|空色禅理绕得岳老三心神烦躁、破绽百出，你的般若掌力趁虚层层叠加；|}{ifFlagEq:sl_q25_tactic=clash|你连破随从硬撼鳄神，在排山倒海的铁剪恶风中愈战愈明；|}第一掌如清风拂面，第六掌如江涛拍岸，第十二掌如惊雷滚地……转眼已叠出十七重般若暗劲！'),
      N('第十八掌「般若波罗」圆融拍出！十八重叠浪暗劲瞬息合一，如无形金钟轰然撞在百斤精钢鳄嘴剪脊之上！'),
      N('“嗡——！”剧烈震荡顺铁柄狂涌而入！岳老三双掌虎口剧痛崩裂、鲜血直流，百斤鳄嘴剪险些脱手飞出，魁梧铁塔般的身躯竟被这股绵厚无比的佛门掌力震得连退七大步，一屁股坐倒在青石阶上！'),
      S('NPC-0183', '（甩着发麻流血的虎口，瞪圆双眼满脸难以置信）“哎哟喂！疼死老子了！你这小和尚手掌明明软绵绵的，怎的十八掌叠下来比攻城撞木还重？！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_08', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_08: {
    id: 'scene_slq25_08',
    title: '第八幕 · 恶人服软 · 放归抉择',
    subtitle: '达摩院幽谷外坪 · 愿赌服输',
    mandatory: true,
    beats: [
      N('周围观战的少林巡山武僧顿时齐声喝彩，孙三霸吓得脸色发白、连滚带爬缩到岳老三身后。岳老三却揉着生疼的虎口爬起身来，虽满脸不甘，倒真透出一股憨直守信的江湖脾气。'),
      S('NPC-0183', '（瓮声瓮气哼了一声，弯腰去拎地上的精钢鳄嘴剪）“罢罢罢！老子岳老三在江湖上最讲究言出必行，打输了就是打输了！这徒弟老子不收了……不过小和尚，你这手《般若掌》真带劲！”'),
      N('巡山武僧请示是否趁势扣下这位西夏四大恶人的兵器以儆效尤。看着虎口渗血却愿赌服输的南海鳄神，你决意如何送客？'),
    ],
    choices: [
      {
        id: 'slq25_release_honor',
        label: '【依约放其守信下山】赞其言出必行，赠一瓶金创药任其携剪大步离山！',
        subLabel: '以德服恶、全其江湖信用（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q25_release', value: 'honor' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q25_release_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q25_release_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq25_09', SHAOLIN_Q25_QUEST_ID),
        ],
      },
      {
        id: 'slq25_release_seize',
        label: '【夺其鳄嘴剪暂扣示警】掌风震落精钢巨剪暂押山门，警诫其三年内莫再踏足中州！',
        subLabel: '铁腕震慑西夏恶人嚣张气焰（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q25_release', value: 'seize' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q25_release_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q25_release_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq25_09', SHAOLIN_Q25_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq25_09: {
    id: 'scene_slq25_09',
    title: '第九幕 · 重入石室 · 扬名中州',
    subtitle: '达摩院 · 幽谷石室',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q25_release=honor|岳老三接过金创药愣了半晌，挠着大脑袋大笑“你这小和尚真够意思，改日老子练成了再来找你比划”，一瘸一拐却步履飞快地扛剪下山去了。|岳老三眼睁睁看着精钢鳄嘴剪被你掌风震钉石阶，气得直吹胡子却又技不如人，只得丢下狠话灰溜溜带着孙三霸逃下少室山。}'),
      N('不出三日，少林达摩院真传弟子空手十八掌叠浪逼退西夏四大恶人「凶神恶煞」岳老三的佳话便传遍洛阳与开封武林，连朝堂与丐帮亦有耳闻！'),
      N('你收掌调息重回幽谷石室，玄难首座满面春风迎出，寒玉榻上的玄澄神僧亦露出十余年来罕见的畅然笑意。'),
      S('NPC-0127', '“阿弥陀佛！空手以《般若掌》十八叠浪正面震退西夏四大恶人岳老三，不伤性命却扬少林百年禅武威仪！此战之后，中原武林谁人不知我达摩院新出了一位真传翘楚！”'),
    ],
    onFinishEffects: [openScene('scene_slq25_10', SHAOLIN_Q25_QUEST_ID)],
  },

  scene_slq25_10: {
    id: 'scene_slq25_10',
    title: '第十幕 · 空色无相 · 般若波罗',
    subtitle: '嵩山少林寺 · 幽谷石室 · 寒玉榻',
    illustrationUrl: '/assets/quests/sl_25_empty_zen.jpg',
    illustrationCaption: '空色无相 · 幽谷石室静谧澄明，玄澄与玄难合掌为你印证《般若掌》真传圆满',
    mandatory: true,
    beats: [
      S('NPC-0109', '（双手合十，目光澄澈如秋水）“师侄，方才你与岳老三一战，掌力虽叠至十八重，却始终气定神闲、未起半分杀意。老衲半生困于武学障，今日见你以般若智慧御绝技，心中最后一丝执念亦彻底化空了。”'),
      N('玄难郑重将《般若掌》全本秘卷与玄澄亲笔批注的《心经》禅武注疏交付于你：“剑有《达摩剑法》，掌有《般若掌》，轻功有《一苇渡江》——自今日起，达摩院真传单脉之绝学，你已尽得精髓！”'),
      P('（深深跪拜于寒玉榻前）“全赖玄澄师伯剖白心迹、玄难师伯倾囊相授，弟子方知武学愈高，愈当以大慈悲、大智慧为根基！”'),
      N('清风徐来，幽谷兰香浮动。达摩院真传苦修终臻圆满，你心怀般若大智、身负剑掌双绝，已准备好迎接少林与江湖更宏大的风云变幻！'),
    ],
    choices: [
      {
        id: 'slq25_complete',
        label: '习得《般若掌》，圆满完成【空色无相 · 般若波罗】',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-043', minLevel: 1 },
            thenEffects: [],
            elseEffects: [{ type: 'teachMartialArt', artId: 'MA-043', level: 1 }],
          },
          {
            type: 'giveCombatExp',
            amount: 700,
            reason: '得玄难与玄澄合授《般若掌》，十八掌叠浪震裂鳄嘴剪虎口逼退四大恶人岳老三',
          },
          { type: 'addSectContribution', amount: 240 },
          {
            type: 'modifyRenown',
            delta: 60,
            reason: '空手以少林《般若掌》逼退西夏四大恶人凶神恶煞岳老三，名震中州',
          },
          {
            type: 'branch',
            condition: {
              type: 'any',
              conditions: [
                { type: 'flag', flag: 'sl_q25_yuelao_wager', op: 'truthy' },
                { type: 'flag', flag: 'sl_q25_riddle_won', op: 'truthy' },
              ],
            },
            thenEffects: [
              { type: 'modifyRenown', delta: 20, reason: '智斗南海鳄神岳老三，以禅机与信用令恶人折服' },
              { type: 'modifySkill', key: '辩才', delta: 1 },
            ],
            elseEffects: [],
          },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0109' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_Q25_QUEST_ID, outcome: 'completed' },
          toast(
            '【空色无相 · 般若波罗】圆满完成！习得《般若掌》，实战经验 +700、贡献 +240、声望 +60、经义 +2！',
            'success',
            '般若波罗',
          ),
        ],
      },
    ],
  },
}
