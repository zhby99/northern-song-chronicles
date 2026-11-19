import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, qStatus, setStep, toast } from '../../../engine/quest/dsl'
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

function buildTieqiao(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS14_TIEQIAO',
    name: '铁桥师兄',
    title: '南少林护寺首座 · 铁桥硬马',
    realm: '一流中品',
    factionName: '莆田南少林',
    sectRank: 3,
    sectRankLabel: '护寺首座',
    avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
    talk: '“请北宗师兄领教我莆田南少林硬桥硬马、稳如磐石的铁桥劲！”',
    stats: { hp: 3150, mp: 2780, agi: 64, res: 60 },
    talents: { bone: 84, comprehension: 72, charm: 56 },
    equippedArts: {
      neigong: 'MA-080',
      qinggong: 'MA-139',
      move1: 'MA-106',
      move2: 'MA-124',
      move3: 'MA-107',
    },
    learnedArts: [
      { artId: 'MA-080', level: 8 },
      { artId: 'MA-139', level: 7 },
      { artId: 'MA-106', level: 8 },
      { artId: 'MA-124', level: 8 },
      { artId: 'MA-107', level: 7 },
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
      N('{reignYear}金秋，嵩山丹枫如火。大雄宝殿方丈院西侧的钟鼓禅院演武坪上，晨钟余韵尚未散尽，山门外已迎来三位身着灰褐短打僧衣、肌骨如铜铸般的南方高僧。'),
      N('为首一人面庞方正、双臂微垂过膝，腕骨粗壮如生铁浇铸；身旁两位师弟亦个个太阳穴高高鼓起、下盘沉稳似扎根青石。铁掌禅师玄痛亲自出迎，朗笑声震得松枝落叶纷纷。'),
      S('NPC-0156', '“哈哈哈！有朋自八闽九莲山来，不亦乐乎！这位便是莆田南少林护寺大首座元通大师，旁侧二位乃铁桥师兄、洪刚师兄。三位千里北访嵩山，意在以武印证南北禅拳！”'),
      S('NPC-0164', '“阿弥陀佛，久仰嵩山祖庭威名！我兄弟三人奉南少林方丈之命北上礼祖，一来瞻仰达摩祖师遗迹，二来亦想请教北宗高徒的绝艺，看看我南宗硬桥硬马究竟差了祖庭几分火候！”'),
    ],
    onFinishEffects: [openScene('scene_sls14_02', SHAOLIN_SIDE14_QUEST_ID)],
  },

  scene_sls14_02: {
    id: 'scene_sls14_02',
    title: '玄痛点将 · 南北照面',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('玄痛长老目光一转，落在刚步入演武坪的你身上，眼中露出几分藏不住的赞许，抬手向三位南少林高僧引见。'),
      S('NPC-0156', '“元通大师来得正巧！这位便是我嵩山少林当代三阶高徒，文武兼修、历练已久，由他代嵩山同门与三位切磋印证，最是恰当不过！”'),
    ],
    onFinishEffects: [
      {
        type: 'branch',
        condition: qStatus('QST-SECT-01-19', 'completed'),
        thenEffects: [openScene('scene_sls14_03', SHAOLIN_SIDE14_QUEST_ID)],
        elseEffects: [openScene('scene_sls14_04', SHAOLIN_SIDE14_QUEST_ID)],
      },
    ],
  },

  scene_sls14_03: {
    id: 'scene_sls14_03',
    title: '九莲旧谊 · 故友重逢',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('元通、铁桥与洪刚三人一见你面容，先是一怔，旋即齐齐露出惊喜交加之色，大步上前合十行礼！'),
      S('NPC-0164', '“哎呀！原是昔年携嵩山法帖千里南渡莆田、在九莲山门连闯三关，又与我南少林同门于海滨盐场浴血斩杀东瀛海寇鬼丸浪人的故友！元苦师叔临行前还再三叮嘱，若在嵩山见到你，务必要代他问安！”'),
      S(SPEAKER_TIEQIAO, '“哈哈哈！当年在九莲山只恨未能与师兄痛快打上一场，如今师兄修为早已今非昔比，今日在嵩山演武坪上，可一定要让洒家领教领教！”'),
      P('“阿弥陀佛！当年九莲山盐场并肩御寇历历在目，元苦师叔安康便好！三位师兄远道而来，小弟自当倾力奉陪，绝不藏私！”'),
    ],
    onFinishEffects: [openScene('scene_sls14_05', SHAOLIN_SIDE14_QUEST_ID)],
  },

  scene_sls14_04: {
    id: 'scene_sls14_04',
    title: '南北初会 · 礼敬同源',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('元通上下打量你片刻，见你气息沉凝如渊、双目炯炯有神，不由暗赞嵩山底蕴深厚，双手合十朗声道。'),
      S('NPC-0164', '“早闻嵩山少林人才辈出，今日一见师兄气度，果然名不虚传！南拳刚猛沉实、北腿舒展雄浑，本是达摩一脉分枝，今日便请师兄不吝赐教！”'),
      S(SPEAKER_HONGGANG, '“待会儿交手之时，师兄只管放手施为，我兄弟三人练的皆是铜皮铁骨硬功夫，最喜痛快淋漓的真切磋！”'),
      P('“阿弥陀佛！三位师兄千里北访，小弟敢不从命？今日定当以礼相待、全力印证！”'),
    ],
    onFinishEffects: [openScene('scene_sls14_05', SHAOLIN_SIDE14_QUEST_ID)],
  },

  scene_sls14_05: {
    id: 'scene_sls14_05',
    title: '立约演武 · 连战二关',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S('NPC-0156', '“既是以武印证，便依祖庭古例：点到为止，不伤和气！先由铁桥师兄试一试铁桥硬马，再由元通大师压轴印证铁线神拳。你可愿应下这场南北切磋？”'),
    ],
    choices: [
      {
        id: 'accept_north_south_spar',
        label: '“弟子愿登演武坪，依次领教铁桥师兄与元通首座高招！”',
        subLabel: '承接支线【铁线争锋 · 闽僧北访】',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE14_QUEST_ID, stepId: 'courtyard_spar' },
          toast('任务已接取：在【钟鼓禅院 · 演武坪】迎战南少林护寺首座！', 'success', '铁线争锋'),
          openScene('scene_sls14_06', SHAOLIN_SIDE14_QUEST_ID),
        ],
      },
      {
        id: 'defer_north_south_spar',
        label: '“请容我先整备披挂与武学运使，稍后即登坪赐教。”',
        subLabel: '暂缓接取（可随时再返钟鼓禅院开启）',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_side14_start_triggered', value: false },
          toast('你暂且告退调息整备，待备妥后可再返钟鼓禅院演武坪迎战。', 'talk', '铁线争锋'),
        ],
      },
    ],
  },

  scene_sls14_06: {
    id: 'scene_sls14_06',
    title: '第一关 · 铁桥硬马',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('洪刚师兄击响场边铜锣，演武坪四周早已聚满闻讯赶来观战的嵩山众僧。铁桥师兄大步踏入场中，扎下一个四平大马，双足踏处青石砖竟微微一沉，双臂架起如两根铸铁横梁！'),
      S(SPEAKER_TIEQIAO, '“北宗师兄请了！我这身《盘山铁布衫》配南宗铁桥劲，最耐硬拼硬打，师兄若能破我架势，便算过了第一关！”'),
      P('“铁桥师兄好沉稳的下盘！小弟得罪了！”'),
    ],
    choices: [
      {
        id: 'spar_tieqiao',
        label: '踏步入场，与一流中品「铁桥师兄」切磋印证！',
        subLabel: '南北印证第一战 · 切磋（点到为止）',
        tone: 'jade',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE14_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTieqiao() },
            rule: 'spar',
            duelStakesTag: 'spar',
            introText: '铁桥师兄稳扎马步、双臂如铁桥横拦，携滚滚刚劲沉肩压迫而来！',
            onWin: [openScene('scene_sls14_07', SHAOLIN_SIDE14_QUEST_ID)],
            onLose: [
              toast(
                '铁桥师兄下盘稳如泰山，你暂且退下调息，可随时在演武坪重新挑战！',
                'warn',
                '铁线争锋',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls14_07: {
    id: 'scene_sls14_07',
    title: '以巧破刚 · 铁桥叹服',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('你与铁桥师兄硬拼十余合，渐摸清其“守若铁壁、攻若奔雷”的路数，当即化硬拼为游走，借北宗舒展身法绕至其侧肋，一记刚柔并济的劲力轻吐，竟将稳如磐石的铁桥师兄震得退后三步！'),
      S(SPEAKER_TIEQIAO, '“好！好一个借力打力、以巧破刚！若非师兄最后收了三分劲，洒家这半边膀子怕是要麻上半日！痛快，洒家认输！”'),
      S(SPEAKER_HONGGANG, '“好俊的北宗身法与内劲！元通师兄，看来这一趟嵩山之行，真教咱们遇上劲敌了！”'),
      N('四周嵩山众僧齐声喝彩，玄痛长老亦抚须微笑，随即抬手示意场中肃静。'),
    ],
    onFinishEffects: [openScene('scene_sls14_08', SHAOLIN_SIDE14_QUEST_ID)],
  },

  scene_sls14_08: {
    id: 'scene_sls14_08',
    title: '压轴印证 · 铁线神拳',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    illustrationUrl: '/assets/quests/sl_s14_north_south.jpg',
    illustrationCaption: '钟鼓禅院演武坪秋风卷叶，南北少林顶尖高徒硬桥硬马巅峰交锋',
    mandatory: true,
    beats: [
      N('元通首座解下外袍交予洪刚，缓步走入演武坪中央。他并未立刻出招，而是缓缓吐出一口长气，只听其咽喉间竟隐隐发出似金铁震颤般的低沉“哼哈”二音，双臂筋骨节节作响，指掌之间劲风呼啸，仿佛缠绕着千百根无形钢丝！'),
      S('NPC-0156', '“小心了！元通大师已将南少林镇派外功《铁线拳》练至十重化境，兼以声催气、以气运力，举手投足皆有一流上品宗师气度！”'),
      S('NPC-0164', '“师兄既破了我二师弟的铁桥劲，便请接贫僧这路《铁线拳》！你我皆不必留手，放开一战，方不负千里北访之行！”'),
      P('“正合我意！元通首座，请赐教！”'),
    ],
    onFinishEffects: [openScene('scene_sls14_09', SHAOLIN_SIDE14_QUEST_ID)],
  },

  scene_sls14_09: {
    id: 'scene_sls14_09',
    title: '南北巅峰 · 拳震钟鼓',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('秋风骤止，演武坪上尘沙微扬。元通首座双拳一错，刚猛无匹的铁线拳劲直冲面门！你凝神敛气，迎着这位南少林一流上品大首座正面踏出一步！'),
    ],
    choices: [
      {
        id: 'spar_yuantong',
        label: '凝神运劲，与一流上品「元通首座」展开南北巅峰切磋！',
        subLabel: '南北印证压轴战 · 一流上品切磋（点到为止）',
        tone: 'gold',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE14_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0164',
              talkOverride:
                '“南拳北腿本出一脉！且看今日嵩山演武坪上，谁能以禅入拳、技高一筹！”',
            },
            rule: 'spar',
            duelStakesTag: 'spar',
            introText: '元通首座以声催劲，十重《铁线拳》如怒潮拍岸、钢丝绞空，南北少林巅峰对决正式展开！',
            onWin: [openScene('scene_sls14_10', SHAOLIN_SIDE14_QUEST_ID)],
            onLose: [
              toast(
                '元通首座的十重铁线拳果然霸道绝伦！你暂且退下调息，可随时在演武坪再次切磋！',
                'warn',
                '铁线争锋',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls14_10: {
    id: 'scene_sls14_10',
    title: '刚柔互破 · 半招定鼎',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('二人拳掌相交数十合，劲风四溢，连钟楼垂悬的麻绳都被罡气激得轻轻晃动！元通一记“铁线穿云”直取中宫，刚劲如山岳倾压；你不退反进，化直为圆，以浑厚禅功卸开七分力道，反手一指轻点其肘弯曲池穴前半寸，倏然收势！'),
      N('元通身形一顿，低头看着距自己肘穴仅差半寸的指尖，怔了半晌，忽地仰天大笑，双掌合十深深一揖！'),
      S('NPC-0164', '“哈哈哈！痛快！真是平生未有之痛快！贫僧自负将铁线拳炼至刚柔相济、以声催气，不意嵩山祖庭竟有师兄这般人物，收放之间竟还有余力留情半寸！这一战，贫僧输得心服口服！”'),
      P('“元通首座过谦了！首座铁线拳劲如惊涛连绵不绝，小弟不过侥幸占了半招地利与先机，实是棋逢对手！”'),
    ],
    onFinishEffects: [openScene('scene_sls14_11', SHAOLIN_SIDE14_QUEST_ID)],
  },

  scene_sls14_11: {
    id: 'scene_sls14_11',
    title: '众僧喝彩 · 移步碑廊',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('演武坪四周爆发出山呼海啸般的掌声与赞叹声，铁桥与洪刚亦快步上前拱手致敬，南北同门之间毫无芥蒂，唯有惺惺相惜。'),
      S('NPC-0156', '“好一场龙争虎斗！南北少林同根同源，今日这场印证足以载入寺志。诸位方才激战耗气，老衲已在【东厢碑廊 · 藏经橱】备下嵩山松针清茶，请随我移步叙话！”'),
      S('NPC-0164', '“正有几句铁线拳的运劲秘诀，愿于茶席间赠予师兄印证！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_SIDE14_QUEST_ID, 'corridor_tea_gift'),
      toast('巅峰切磋圆满获胜！请前往【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱】共品清茶。', 'success', '铁线争锋'),
    ],
  },

  scene_sls14_12: {
    id: 'scene_sls14_12',
    title: '碑廊清茗 · 共论禅武',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    illustrationUrl: '/assets/quests/sl_s14_iron_wire_gift.jpg',
    illustrationCaption: '东厢碑廊松烟袅袅，元通首座手书《铁线拳》运劲秘诀相赠北宗同门',
    mandatory: true,
    beats: [
      N('东厢碑廊古碑林立，案上嵩山松针茶清香四溢。玄痛长老与元通、铁桥、洪刚诸僧围案而坐，畅论南北少林数百年来拳脉分合与护国安民之志，言谈甚欢。'),
      N('茶过三巡，元通首座从怀中郑重取出一卷抄录工整的蓝布手札，双手推至你面前。'),
      S('NPC-0164', '“师兄，此卷乃我莆田南少林秘传《铁线拳》运劲呼吸口诀，讲究『刚而不僵、柔而不软，以十二桥手合五脏之音』。今日见师兄禅武双修、胸怀宽广，这卷心法留予师兄，方不算明珠暗投！”'),
    ],
    onFinishEffects: [openScene('scene_sls14_13', SHAOLIN_SIDE14_QUEST_ID)],
  },

  scene_sls14_13: {
    id: 'scene_sls14_13',
    title: '铁线传薪 · 融会贯通',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('你双手接过蓝布手札细细翻阅，只觉其中关于桥手蓄劲、鼻息吞吐的批注字字珠玑，与嵩山内功心法相互印证之下，竟生出许多前所未有的武道妙悟！'),
      S('NPC-0156', '“阿弥陀佛。元通大师破除门户之见，慨赠南宗精髓，老衲代嵩山少林谢过！你既得此机缘，若尚未修习《铁线拳》，正好借此入门；若早已学成，亦可借此卷细参印证，化作深厚修为！”'),
      P('“多谢元通首座与二位师兄厚赠！南北少林同气连枝，这份情谊弟子铭刻肺腑！”'),
    ],
    onFinishEffects: [openScene('scene_sls14_14', SHAOLIN_SIDE14_QUEST_ID)],
  },

  scene_sls14_14: {
    id: 'scene_sls14_14',
    title: '南北同源 · 挥袖相别',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      S('NPC-0164', '“青山不改，绿水长流！来日师兄若再南下福建，莆田九莲山永远为你扫榻以待！”'),
      N('夕阳映红了少室山脊，你与玄痛长老送元通、铁桥、洪刚三位首座步出碑廊。这场跨越千里的南北少林铁线争锋，很快便在江湖传为一段佳话。'),
    ],
    onFinishEffects: [
      { type: 'giveCombatExp', amount: 720, reason: '南北少林钟鼓禅院巅峰印证' },
      { type: 'addSectContribution', amount: 240 },
      { type: 'modifyRenown', delta: 70, reason: '南北少林禅武印证名扬中原' },
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
        '【铁线争锋 · 闽僧北访】圆满完成！实战经验 +720，门派贡献 +240，声望 +70！',
        'success',
        '铁线争锋',
      ),
    ],
  },
}
