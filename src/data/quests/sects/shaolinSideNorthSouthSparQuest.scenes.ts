import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE14_QUEST_ID } from './shaolinSideNorthSouthSparQuest'

const SPEAKER_TIEQIAO: StorySpeakerSpec = {
  kind: 'custom',
  name: '铁桥师兄',
  title: '南少林护寺首座 · 铁桥硬马',
  factionName: '莆田南少林',
  portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
}

const SPEAKER_HONGGANG: StorySpeakerSpec = {
  kind: 'custom',
  name: '洪刚师兄',
  title: '南少林护寺首座 · 洪拳教头',
  factionName: '莆田南少林',
  portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
}

function buildTieqiao(outmaneuvered = false): NodeNpc {
  return makeQuestNpc({
    id: outmaneuvered ? 'QUEST_SLS14_TIEQIAO_OFFBALANCE' : 'QUEST_SLS14_TIEQIAO',
    name: '铁桥师兄',
    title: '南少林护寺首座 · 铁桥硬马',
    realm: '一流中品',
    factionName: '莆田南少林',
    sectRank: 3,
    sectRankLabel: '护寺首座',
    avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
    talk: outmaneuvered
      ? '“好俊的北宗身法！才一照面便晃开了洒家半步重心，且再接我一记铁桥横拦！”'
      : '“请北宗师兄领教我莆田南少林硬桥硬马、稳如磐石的铁桥劲！”',
    stats: outmaneuvered
      ? { hp: 2680, mp: 2420, agi: 60, res: 55 }
      : { hp: 3150, mp: 2780, agi: 64, res: 60 },
    talents: { bone: 84, comprehension: 72, charm: 56 },
    equippedArts: { neigong: 'MA-080', move1: 'MA-106', move2: 'MA-124' },
    learnedArts: [
      { artId: 'MA-080', level: 8 },
      { artId: 'MA-106', level: 8 },
      { artId: 'MA-124', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls14_01: {
    id: 'scene_sls14_01',
    title: '钟鼓秋风 · 闽僧登门',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}金秋，嵩山丹枫如火。大雄宝殿方丈院西侧的钟鼓禅院演武坪上，晨钟余韵未歇，山门外已迎来三位身着灰褐短打僧衣、肌骨如铜铸般的南方高僧。'),
      N('为首一人面庞方正、双臂微垂过膝，腕骨粗壮如生铁浇铸；身旁两位师弟亦太阳穴高鼓、下盘沉稳似扎根青石。铁掌禅师玄痛亲自出迎，朗笑声震得松枝落叶纷纷。'),
      S(
        'NPC-0156',
        '“哈哈哈！有朋自八闽九莲山来，不亦乐乎！这位便是莆田南少林铁罗汉堂主元通大师，旁侧二位乃铁桥师兄、洪刚师兄。你既已跻身本寺三阶高徒，正好代嵩山同门迎客印证！”',
      ),
      S(
        'NPC-0164',
        '{ifQuestDone:QST-SECT-01-19|“哎呀！原是昔年携嵩山法帖千里南渡莆田、与我南少林于海滨盐场并肩斩杀东瀛海寇的故友！元苦师叔临行前还再三嘱我代他问安，今日重逢嵩山，真乃大幸！”|“阿弥陀佛，久仰嵩山祖庭威名！我兄弟三人奉南少林方丈之命北上礼祖，见师兄气息沉凝如渊，今日定要请教北宗高招！”}',
      ),
      S(
        SPEAKER_HONGGANG,
        '“我兄弟三人练的皆是铜皮铁骨硬功夫，最喜先论拳理、再痛快切磋！不知北宗高徒怎么看南北少林数百年分枝的拳脉异同？”',
      ),
    ],
    onFinishEffects: [openScene('scene_sls14_02', SHAOLIN_SIDE14_QUEST_ID)],
  },

  scene_sls14_02: {
    id: 'scene_sls14_02',
    title: '南北论拳 · 立约演武',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('玄痛长老抚须含笑，退至一旁听你与南宗诸僧论艺。元通合十微揖，目光如炬地望向你：“北少林居于中岳平川，南少林起于八闽舟楫山海；一北一南，拳理各有千秋，师兄以为何者为先？”'),
      N('四周闻讯聚拢的嵩山众僧亦凝神倾听。你望向眼前三位气度豪迈的南少林首座，沉吟片刻作出回应：'),
    ],
    choices: [
      {
        id: 'theory_north_thunder',
        label: '【重北派雄浑】“北宗拳腿大开大合、劲如奔雷，先立浩然气势方能制敌于十步之外！”',
        subLabel: '承接支线【铁线争锋 · 闽僧北访】并立约切磋（怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s14_theory', value: 'north' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s14_theory_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s14_theory_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          { type: 'startQuest', questId: SHAOLIN_SIDE14_QUEST_ID, stepId: 'courtyard_spar' },
          toast('任务已接取：于【钟鼓禅院 · 演武坪】与南少林首座切磋印证！', 'success', '铁线争锋'),
          openScene('scene_sls14_03', SHAOLIN_SIDE14_QUEST_ID),
        ],
      },
      {
        id: 'theory_south_inch',
        label: '【重南派精微】“南宗短桥窄马、寸劲归柔，于方寸之间收发由心，最合禅门定慧双修！”',
        subLabel: '承接支线【铁线争锋 · 闽僧北访】并立约切磋（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s14_theory', value: 'south' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s14_theory_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s14_theory_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          { type: 'startQuest', questId: SHAOLIN_SIDE14_QUEST_ID, stepId: 'courtyard_spar' },
          toast('任务已接取：于【钟鼓禅院 · 演武坪】与南少林首座切磋印证！', 'success', '铁线争锋'),
          openScene('scene_sls14_03', SHAOLIN_SIDE14_QUEST_ID),
        ],
      },
      {
        id: 'defer_north_south_spar',
        label: '“南北拳理博大精深，容我先整备披挂与武学运使，稍后即登坪赐教。”',
        subLabel: '暂缓接取（可随时再返钟鼓禅院开启）',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_side14_start_triggered', value: false },
          toast('你暂且告退调息整备，待备妥后可再返钟鼓禅院演武坪迎战。', 'talk', '铁线争锋'),
        ],
      },
    ],
  },

  scene_sls14_03: {
    id: 'scene_sls14_03',
    title: '第一关 · 铁桥硬马',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s14_theory=north|洪刚与铁桥听你盛赞北宗奔雷气象，战意顿燃，齐声喝彩；玄痛点头定例：“点到为止，先由铁桥师兄试招，再由元通大师压轴印证！”|元通听你一语道破南宗短桥寸劲之精妙，眼中露出惊喜赞许；玄痛含笑定例：“点到为止，先由铁桥师兄试招，再由元通大师压轴印证！”}'),
      N('洪刚击响场边铜锣！铁桥师兄大步踏入演武坪，扎下四平大马，双足踏处青石微沉，双臂如铸铁横梁般架起铜墙铁壁。'),
      S(SPEAKER_TIEQIAO, '“北宗师兄请了！我这身《盘山铁布衫》配南宗铁桥劲最耐硬拼硬打，师兄欲如何破我架势？”'),
    ],
    choices: [
      {
        id: 'spar_tieqiao_agile',
        label: '【以巧破刚】借北宗游走身法晃开其四平大马重心，攻其侧肋转圜之隙！',
        subLabel: '先行破去铁桥架势再切磋（一流中品，禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需身法 ≥ 60，或方才雅论中洞悉南派短桥寸劲',
          conditions: [
            { type: 'combatStatAtLeast', key: 'agility', min: 60 },
            { type: 'flag', flag: 'sl_s14_theory', op: 'eq', value: 'south' },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s14_tieqiao_tactic', value: 'agile' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s14_tieqiao_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s14_tieqiao_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE14_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTieqiao(true) },
            rule: 'spar',
            duelStakesTag: 'spar',
            introText: '你步履如风先晃开铁桥师兄下盘重心，南宗硬桥被迫变招迎击！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls14_04', SHAOLIN_SIDE14_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('铁桥师兄下盘稳如泰山，你暂退调息，可随时在演武坪再次切磋！', 'warn', '铁线争锋'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('双方拆招难分上下，调息片刻后可再登演武坪切磋！', 'warn', '铁线争锋'),
            ],
          },
        ],
      },
      {
        id: 'spar_tieqiao_direct',
        label: '【硬桥硬马】沉腰坐马，以嵩山刚猛劲力正面撼动南宗铁桥！',
        subLabel: '零门槛正面切磋全盛铁桥师兄（一流中品，怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s14_tieqiao_tactic', value: 'direct' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s14_tieqiao_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s14_tieqiao_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE14_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTieqiao(false) },
            rule: 'spar',
            duelStakesTag: 'spar',
            introText: '铁桥师兄双臂如铁桥横拦，携滚滚刚劲沉肩压迫而来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls14_04', SHAOLIN_SIDE14_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('铁桥师兄铁布衫果然厚重，调息回元后可随时于演武坪再战！', 'warn', '铁线争锋'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('二人硬拼难分伯仲，调息后再战一场！', 'warn', '铁线争锋'),
            ],
          },
        ],
      },
    ],
  },

  scene_sls14_04: {
    id: 'scene_sls14_04',
    title: '铁桥叹服 · 压轴登场',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    illustrationUrl: '/assets/quests/sl_s14_north_south.jpg',
    illustrationCaption: '钟鼓禅院演武坪秋风卷叶，南北少林顶尖高徒硬桥硬马切磋印证',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s14_tieqiao_tactic=agile|你化硬拼为游走，借柔劲贴肋轻吐，竟将稳如磐石的铁桥师兄震得退后三步！|你以纯正嵩山阳刚内劲连撼铁桥双臂，震得他四平大马连退两步，青石砖上留下两道深印！}'),
      S(SPEAKER_TIEQIAO, '“好！痛快！若非师兄最后收了三分劲，洒家这半边膀子怕是要麻上半日！这一阵，洒家认输！”'),
      N('元通首座解下外袍交予洪刚，缓步走入演武坪中央。他并未急着出手，而是缓缓吐出一口长气——咽喉间竟隐隐发出似金铁震颤的低沉「哼哈」二音，双臂筋骨节节作响，指掌间仿佛缠绕着千百根无形钢丝！'),
      S('NPC-0156', '“小心了！元通大师深通南少林秘传《铁线拳》，以声催气、以气运力，刚而不僵、柔而不软，正是一流中品绝顶火候！”'),
      S('NPC-0164', '“师兄既破了我师弟的铁桥劲，便请接贫僧这路《铁线拳》！你我放开印证，方不负千里北访之行！”'),
    ],
    onFinishEffects: [openScene('scene_sls14_05', SHAOLIN_SIDE14_QUEST_ID)],
  },

  scene_sls14_05: {
    id: 'scene_sls14_05',
    title: '铁线争锋 · 拳震钟鼓',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('秋风骤止，演武坪上丹枫凝空。元通首座双拳一错，十二桥手配合低沉哼哈之音化作绵密铁线拳风，刚柔相济直压中宫！'),
      N('你凝神敛气，察觉其劲力随呼吸音韵起伏成势，迎着这位南少林大首座决意以何法破招？'),
    ],
    choices: [
      {
        id: 'spar_yuantong_zen',
        label: '【听音化劲】以禅定静听其哼哈呼吸节奏，后发先至、以柔克刚切磋元通！',
        subLabel: '切磋一流中品元通首座（点到为止，禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【经义】≥ 65 或【琴】≥ 35',
          conditions: [
            { type: 'skillAtLeast', key: '经义', min: 65 },
            { type: 'skillAtLeast', key: '琴', min: 35 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s14_yuantong_tactic', value: 'zen' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s14_yuantong_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s14_yuantong_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE14_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0164',
              realmCap: '一流中品',
              talkOverride: '“南拳北腿本出一脉！且看今日嵩山演武坪上，谁能以禅入拳、技高一筹！”',
            },
            rule: 'spar',
            duelStakesTag: 'spar',
            introText: '你静听元通以声催气之节拍，沉心迎战南少林秘传《铁线拳》！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls14_06', SHAOLIN_SIDE14_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('元通首座的《铁线拳》果然收发如钢丝！调息后可再登演武坪切磋。', 'warn', '铁线争锋'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('南北高招棋逢对手，调息片刻后再分高下！', 'warn', '铁线争锋'),
            ],
          },
        ],
      },
      {
        id: 'spar_yuantong_power',
        label: '【浩然硬撼】催动少林纯正浑厚内力，正面硬接元通首座《铁线拳》！',
        subLabel: '零门槛正面切磋一流中品元通首座（点到为止，怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s14_yuantong_tactic', value: 'power' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s14_yuantong_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s14_yuantong_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE14_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0164',
              realmCap: '一流中品',
              talkOverride: '“南拳北腿本出一脉！且看今日嵩山演武坪上，谁能以禅入拳、技高一筹！”',
            },
            rule: 'spar',
            duelStakesTag: 'spar',
            introText: '元通首座以声催劲，《铁线拳》如怒潮拍岸、钢丝绞空，南北印证正式展开！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls14_06', SHAOLIN_SIDE14_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('元通首座的铁线拳霸道绝伦！你暂且退下调息，可随时在演武坪再战！', 'warn', '铁线争锋'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('双方拳风激荡未分胜负，调息片刻后可再印证一场！', 'warn', '铁线争锋'),
            ],
          },
        ],
      },
    ],
  },

  scene_sls14_06: {
    id: 'scene_sls14_06',
    title: '刚柔互破 · 半招定鼎',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('二人拳掌相交数十合，劲风四溢，连钟楼垂悬的麻绳都被罡气激得轻轻晃动！元通一记「铁线穿云」直取中宫，{ifFlagEq:sl_s14_yuantong_tactic=zen|你早听透其呼吸换气微隙，化直为圆轻卸七分刚劲|你不退反进，以沉雄嵩山禅劲硬生生架开其刚猛铁桥}，反手一指轻点其肘弯曲池穴前半寸，倏然收势！'),
      N('元通身形一顿，低头看着距自己肘穴仅差半寸的指尖，怔了半晌，忽地仰天大笑，双掌合十深深一揖！'),
      S(
        'NPC-0164',
        '“哈哈哈！痛快！真是平生未有之痛快！嵩山祖庭竟有师兄这般人物，收放之间犹有余力留情半寸！这一战，贫僧输得心服口服！”',
      ),
      S(
        'NPC-0156',
        '“好一场龙争虎斗！南北少林同根同源，今日印证足以载入寺志。老衲已在【东厢碑廊 · 藏经橱】备下嵩山松针清茶，诸位请移步叙话！”',
      ),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_SIDE14_QUEST_ID, 'corridor_tea_gift'),
      toast('切磋圆满获胜！请前往【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱】共品清茶。', 'success', '铁线争锋'),
    ],
  },

  scene_sls14_07: {
    id: 'scene_sls14_07',
    title: '碑廊清茗 · 茶廊论艺',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    illustrationUrl: '/assets/quests/sl_s14_iron_wire_gift.jpg',
    illustrationCaption: '东厢碑廊松烟袅袅，元通首座手书《铁线拳》运劲秘诀相赠北宗同门',
    mandatory: true,
    beats: [
      N('东厢碑廊古碑林立，案上嵩山松针茶清香四溢。玄痛长老与元通、铁桥、洪刚围案而坐，畅论南北少林数百年来拳脉分合与护国安民之志，言谈甚欢。'),
      N('茶过三巡，元通首座从怀中郑重取出一卷抄录工整的蓝布手札，双手推至你面前，眼中满是惜才敬重之意。'),
      S(
        'NPC-0164',
        '“师兄，此卷乃我莆田南少林秘传《铁线拳》运劲呼吸口诀，讲究『刚而不僵、柔而不软，以十二桥手合五脏之音』。今日见师兄禅武双修，这卷心法留予师兄印证，方不算明珠暗投！”',
      ),
      N('见南宗大首座如此破除门户之见、慨赠绝艺，你双手微顿，茶席之上你决意如何回礼论艺？'),
    ],
    choices: [
      {
        id: 'tea_share_foundation',
        label: '【倾囊相告】将自己对少林筑基心法与北宗行气转圜的体悟全盘相授，互换禅武心得',
        subLabel: '获授《铁线拳》且元通大喜，额外大增好感与江湖声望（禅心慈悲 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s14_tea_choice', value: 'share' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s14_tea_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s14_tea_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls14_08', SHAOLIN_SIDE14_QUEST_ID),
        ],
      },
      {
        id: 'tea_humble_inquire',
        label: '【谦逊请教】虚心求问南派十二桥手化劲与鼻息吐纳之精要，细细记下每处法门',
        subLabel: '获元通倾心点拨并受赠《铁线拳》秘录',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s14_tea_choice', value: 'humble' },
          openScene('scene_sls14_08', SHAOLIN_SIDE14_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls14_08: {
    id: 'scene_sls14_08',
    title: '铁线传薪 · 融会贯通',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s14_tea_choice=share|你毫不藏私，将嵩山筑基内功中「以静养动、气沉涌泉」的心得娓娓道来，更当场以指蘸茶水在青石案上勾勒行气经络。元通听得拍案叫绝，连声赞叹困扰多年的刚柔转换瓶颈豁然洞开！|你虚心执礼请教南宗十二桥手沉肩坠肘与以声催气之要，元通见你胜而不骄、求道赤诚，当即在茶案旁逐式拆解演示，将三十年苦练窍门倾囊相授！}'),
      N('你双手接过蓝布手札细细翻阅，只觉其中关于桥手蓄劲、鼻息吞吐的批注字字珠玑，与嵩山心法相互印证之下，胸中顿生诸多前所未有的武道妙悟。'),
      S(
        'NPC-0156',
        '“阿弥陀佛！南北少林破除门户之见，此乃达摩祖师最乐见之事。你若尚未修习《铁线拳》，正好借此入门；若早已学成，亦可借此卷细参印证，化作深厚修为！”',
      ),
      P('“多谢元通首座与二位师兄厚赠！南北少林同气连枝，这份情谊弟子铭刻肺腑！”'),
    ],
    onFinishEffects: [openScene('scene_sls14_09', SHAOLIN_SIDE14_QUEST_ID)],
  },

  scene_sls14_09: {
    id: 'scene_sls14_09',
    title: '南北同源 · 挥袖相别',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      S(
        'NPC-0164',
        '{ifFlagEq:sl_s14_tea_choice=share|“得师兄倾囊印证筑基心法，此番北上真乃满载而归！青山不改，绿水长流，来日师兄若再南下福建，莆田九莲山必倒履相迎！”|“师兄谦冲好学、武德昭然，诚乃北宗翘楚！来日若再南下福建，莆田九莲山永远为你扫榻以待！”}',
      ),
      N('夕阳映红了少室山脊，你与玄痛长老送元通、铁桥、洪刚三位首座步出碑廊。这场跨越千里的南北少林铁线争锋与茶廊论艺，很快便在江湖传为一段佳话。'),
    ],
    onFinishEffects: [
      { type: 'giveCombatExp', amount: 720, reason: '南北少林钟鼓禅院切磋印证' },
      { type: 'addSectContribution', amount: 240 },
      { type: 'modifyRenown', delta: 70, reason: '南北少林禅武印证名扬中原' },
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_s14_tea_choice', op: 'eq', value: 'share' },
        thenEffects: [
          { type: 'modifyRenown', delta: 20, reason: '碑廊倾囊论艺传扬南北少林佳话' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0164' }, delta: 18 },
        ],
        elseEffects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0164' }, delta: 10 },
        ],
      },
      {
        type: 'branch',
        condition: { type: 'learnedArtAtLeast', artId: 'MA-106', minLevel: 1 },
        thenEffects: [
          { type: 'addArtExp', amount: 240 },
          toast(
            '你早已习得《铁线拳》，与元通首座手札相互印证，武学修为大增 +240！',
            'success',
            '铁线争锋',
          ),
        ],
        elseEffects: [
          { type: 'teachMartialArt', artId: 'MA-106', level: 1 },
          toast('获元通首座慨赠南宗秘传，习得《铁线拳》！', 'success', '铁线争锋'),
        ],
      },
      { type: 'completeQuest', questId: SHAOLIN_SIDE14_QUEST_ID, outcome: 'completed' },
      toast(
        '【铁线争锋 · 闽僧北访】圆满完成！实战经验 +720，门派贡献 +240，声望 +70（倾囊论艺另 +20），并获南宗《铁线拳》秘传！',
        'success',
        '铁线争锋',
      ),
    ],
  },
}
