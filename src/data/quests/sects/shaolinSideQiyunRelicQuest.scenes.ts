import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE09_QUEST_ID } from './shaolinSideQiyunRelicQuest'

const SPEAKER_BASANG: StorySpeakerSpec = {
  kind: 'custom',
  name: '巴桑',
  title: '吐蕃黑教盗宝护法',
  factionName: '吐蕃黑教',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

const SPEAKER_RAIDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑教密探',
  title: '吐蕃盗宝死士',
  factionName: '吐蕃黑教',
  portraitUrl: '/assets/characters/templates/tpl_tubo_tribes_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_tribes_male_av.jpg',
}

function buildBasang(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS09_BASANG',
    name: '巴桑',
    title: '吐蕃黑教盗宝护法 · 巴桑',
    realm: '二流上品',
    factionName: '吐蕃黑教',
    sectRank: 0,
    sectRankLabel: '密教护法',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“中原小僧倒有几分脚力，竟能追上齐云塔十三层绝顶！可这佛骨舍利合该归我雪域密教供奉，今日便送你坠落古塔！”',
    stats: { hp: 1740, mp: 1480, agi: 55, res: 42 },
    talents: { bone: 70, comprehension: 56, charm: 32 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-124', move2: 'MA-133' },
    learnedArts: [
      { artId: 'MA-140', level: 6 },
      { artId: 'MA-124', level: 6 },
      { artId: 'MA-133', level: 6 },
    ],
  })
}

function buildBasangShaken(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS09_BASANG_SHAKEN',
    name: '巴桑',
    title: '咒音被破的黑教护法 · 巴桑',
    realm: '二流上品',
    factionName: '吐蕃黑教',
    sectRank: 0,
    sectRankLabel: '密教护法',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“可恶！竟被你以中原佛号破了我的黑教心咒，连气势也被压了三分——接我金杵！”',
    stats: { hp: 1420, mp: 1180, agi: 49, res: 34 },
    talents: { bone: 70, comprehension: 56, charm: 32 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-124', move2: 'MA-133' },
    learnedArts: [
      { artId: 'MA-140', level: 5 },
      { artId: 'MA-124', level: 5 },
      { artId: 'MA-133', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls09_01: {
    id: 'scene_sls09_01',
    title: '第一幕 · 地宫渗水 · 藏香疑踪',
    subtitle: '洛阳府 · 白马寺 · 齐云密檐舍利古塔',
    mandatory: true,
    beats: [
      N('{reignYear}洛阳秋雨绵绵，释源祖庭白马寺东侧的十三层齐云密檐古塔矗立烟雨之中。你前来礼佛访友，见达摩院护经僧慧博正神色凝重地率虚智、虚空与净云在塔基石门前忙碌。'),
      S('NPC-0377', '（见你到来，合十迎上）“阿弥陀佛！师弟精通佛典经义，来得恰是时候！连日阴雨致使齐云塔地宫暗渠渗水，我们须依古仪暂启地宫，将汉唐高僧留下的七宝舍利函移往塔内高处烘干修缮。”'),
      S('NPC-0503', '（忧心忡忡地望向塔外林荫）“只是昨夜洒扫时，净云在白马寺外墙脚下捡到半截涂着酥油的藏香残灰，我总觉得有西域生人在窥探古塔动静……”'),
      N('你随众人步入微潮地宫，细读石壁唐代《舍利安置铭》核对四重封印仪轨，沉声提醒众人：此舍利函乃东汉释源祖庭镇寺圣物，今夜离宫修缮，必有雪域外道趁隙来夺！'),
    ],
    onFinishEffects: [openScene('scene_sls09_02', SHAOLIN_SIDE09_QUEST_ID)],
  },

  scene_sls09_02: {
    id: 'scene_sls09_02',
    title: '第二幕 · 塔前盟守 · 击掌知音',
    subtitle: '齐云密檐舍利古塔 · 塔院',
    mandatory: true,
    beats: [
      S('NPC-0551', '（按住腰间戒刀，沉稳颔首）“师兄思虑极是！我与慧博师兄分守塔门与一层回廊，净云留在大佛宝殿随时敲钟报警，今夜咱们便在齐云塔轮值护宝！”'),
      S('NPC-0377', '“白马寺齐云塔砖檐中空、构造奇巧，素有『塔前击掌，如闻蛙鸣回音』之奇观——每层塔壁空腔皆随声震荡，稍有异物遮壁便会改音。今夜地宫合龙前，劳烦师弟坐镇策应！”'),
      S('NPC-0999', '（紧握木鱼槌，神色坚毅）“弟子定守好钟楼，绝不疏漏！”'),
    ],
    choices: [
      {
        id: 'sls09_watch_echo',
        label: '【记下古塔蛙鸣声理 · 居中听音策应】牢记齐云塔各层空腔回音韵律，夜守塔院随时辨变',
        subLabel: '承接支线【齐云古塔 · 舍利迷踪】，夜守齐云密檐舍利古塔',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s09_watch', value: 'echo' },
          { type: 'startQuest', questId: SHAOLIN_SIDE09_QUEST_ID, stepId: 'defend_pagoda_night' },
          setStep(SHAOLIN_SIDE09_QUEST_ID, 'defend_pagoda_night'),
          toast(
            '已布下齐云塔夜防！请守候于【白马寺 · 齐云密檐舍利古塔（ly_bm_pagoda）】，静待夜袭。',
            'talk',
            '舍利迷踪',
          ),
        ],
      },
      {
        id: 'sls09_watch_gate',
        label: '【严查塔院窗扉 · 先防正门强攻】巡视塔门锁具与外墙树影，与虚空互为犄角',
        subLabel: '承接支线【齐云古塔 · 舍利迷踪】，夜守齐云密檐舍利古塔',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s09_watch', value: 'gate' },
          { type: 'startQuest', questId: SHAOLIN_SIDE09_QUEST_ID, stepId: 'defend_pagoda_night' },
          setStep(SHAOLIN_SIDE09_QUEST_ID, 'defend_pagoda_night'),
          toast(
            '已巡检塔门防务！请守候于【白马寺 · 齐云密檐舍利古塔（ly_bm_pagoda）】，静待夜袭。',
            'talk',
            '舍利迷踪',
          ),
        ],
      },
    ],
  },

  scene_sls09_03: {
    id: 'scene_sls09_03',
    title: '第三幕 · 黑教夜袭 · 回音辨盗',
    subtitle: '齐云密檐舍利古塔 · 塔院辨音推理',
    illustrationUrl: '/assets/quests/sl_s09_qiyun_relic.jpg',
    illustrationCaption: '齐云古塔夜袭 · 吐蕃黑教护法巴桑破门强夺佛骨舍利宝函',
    mandatory: true,
    beats: [
      N('子夜时分，塔外骤起一阵刺耳骨笛凄鸣，紧接着塔门轰然震裂！七八名身披绛黑僧袍、面绘赭红密纹的吐蕃黑教武士破窗涌入，手中弯刀与铜杵寒光四射！'),
      N('为首魁梧护法【巴桑】一掌震退虚智与虚空，卷起浓烈暗紫酥油迷烟遮蔽盘旋木梯，携着暂存塔中的七宝舍利金函隐入漆黑塔腹！慧博边挥刀抵挡楼下密探，边急声呼你追截！'),
      N('十三层古塔内部浓烟滚滚、暗格纵横，盲目逐层摸索必落贼人圈套。你霍然止步于塔基青石外，凝神运气朝齐云塔砖壁清脆击掌三下——霎时塔身空腔回荡起奇异的『蛙鸣回音』，却在三处传回截然不同的异响！'),
      N('只闻第三层塔壁回音清脆急促，夹杂着杂乱靴步奔跑声；第七层本该最清亮的蛙鸣回音竟陡然沉闷死寂，绝无半点尾韵，隐约透出一丝被厚物捂住的细微金石凿击声；而塔底地宫则传出悠长浑厚的嗡鸣，似有暗渠水声回荡。'),
      N('毒烟渐漫、战机稍纵即逝！你依齐云古塔回音异响，瞬间断定藏宝暗格与盗宝护法巴桑的真正动向——'),
    ],
    choices: [
      {
        id: 'sls09_echo_third',
        label: '第三层回音清脆急促——贼首正借窄梯呼应同伙设伏，当顺木梯直扑三层拦截',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s09_echo_pick', value: 'third' },
          { type: 'setFlag', flag: 'sl_s09_echo_solved', value: false },
          openScene('scene_sls09_04', SHAOLIN_SIDE09_QUEST_ID),
        ],
      },
      {
        id: 'sls09_echo_seventh',
        label: '第七层回音沉闷无蛙鸣——必有人以湿毡蒙壁凿取舍利函，当由外檐直抢高阶断其退路',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s09_echo_pick', value: 'seventh' },
          { type: 'setFlag', flag: 'sl_s09_echo_solved', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s09_echo_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s09_echo_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls09_04', SHAOLIN_SIDE09_QUEST_ID),
        ],
      },
      {
        id: 'sls09_echo_crypt',
        label: '塔底地宫回音悠长浑厚——巴桑声东击西，定已折返地宫掘取暗道遁走',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s09_echo_pick', value: 'crypt' },
          { type: 'setFlag', flag: 'sl_s09_echo_solved', value: false },
          openScene('scene_sls09_04', SHAOLIN_SIDE09_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls09_04: {
    id: 'scene_sls09_04',
    title: '第四幕 · 拾级破烟 · 十三绝顶',
    subtitle: '齐云密檐舍利古塔 · 十三层塔顶',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s09_echo_pick=seventh|你借外墙密檐砖楞纵跃如飞，避开三层断后伏兵与滚滚迷烟，径直切入第七层暗阁！果然撞见巴桑正以浸水厚毡蒙住砖壁，拿着铁凿急撬外层金函封印！见你如天降神兵破窗而入，巴桑大惊失色、仓皇背起宝函直窜塔顶，气势已被你占尽先机！|}{ifFlagEq:sl_s09_echo_pick=third|你顺木梯疾冲三层，迎面却只撞上两名留后断尾的黑教死士！你连发两记刚猛掌风将其震落木梯交予虚空捆缚，再破九层花窗散去暗紫毒烟，方才借外檐急追上十三层塔顶！|}{ifFlagEq:sl_s09_echo_pick=crypt|你折返塔底地宫细查，石室内却唯有雨滴回响、空无一人！你暗道中了巴桑声东击西之计，急忙施展轻功沿外墙密檐飞掠而上，连破两道毒烟直扑十三层绝顶！|}'),
      S(SPEAKER_RAIDER, '{ifFlag:sl_s09_echo_solved|（楼下被你甩开的黑教死士仰头惊呼）“护法大人小心！那中原小僧绕开暗梯直奔塔顶去了！”|（滚落木梯时仍厉声狂笑）“护法大人早已登顶，中原和尚追不上啦！”}'),
      N('十三层绝顶寒风猎猎，月轮高悬。巴桑左手挟着金光隐隐的七宝舍利宝函，右手刚将浸油牛皮长索甩向寺外古柏，你已抢先掠上塔刹高阶，一记劈空掌风稳稳斩断飞索！'),
      S(SPEAKER_BASANG, '{ifFlag:sl_s09_echo_solved|（霍然转身，脸色微白，眼中闪过一丝骇然）“不可能！我拿湿毡蒙壁凿函连半点声响都未漏出，你如何一眼找上七层、还抢占了十三层高阶风口？！”|（霍然转身，冷哼一声将宝函负于背心）“中原小僧倒有几分脚力！佛门讲究缘法，强者居之，这释源舍利合该归我雪域密教供奉！”}'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side09_basang_ready', value: true },
      openScene('scene_sls09_05', SHAOLIN_SIDE09_QUEST_ID),
    ],
  },

  scene_sls09_05: {
    id: 'scene_sls09_05',
    title: '第五幕 · 塔刹风雷 · 破咒决战',
    subtitle: '齐云塔十三层绝顶 · 1v1 激战巴桑',
    mandatory: true,
    beats: [
      N('十三层塔顶方圆不过两丈，四周皆是临空绝壁。巴桑口中骤然念起一阵低沉诡异的吐蕃黑教摄心咒，手中镀金降魔杵嗡嗡震颤，试图借尖锐音煞扰乱你的吐纳心神！'),
      S(SPEAKER_BASANG, '“少说仁义大话！吃我一记雪域黑教金杵与劈空掌，今夜这齐云绝顶便是你的葬身之地！”'),
      N('月影寒风呼啸塔刹，黑教咒音如潮水般涌来。面对二流上品强敌巴桑，你瞬息择定破敌之策——'),
    ],
    choices: [
      {
        id: 'sls09_fight_chant',
        label: '【凭经义佛号震散黑教咒音再战巴桑】朗诵《金刚经》正法真言破其邪咒、乱其心神再取破绽！',
        subLabel: '需经义 ≥ 55 或已破齐云回音 · 破咒削弱巴桑（胜后禅心慈悲 +1，战后全回满）',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'skillAtLeast', key: '经义', min: 55 },
            { type: 'flag', flag: 'sl_s09_echo_solved', op: 'truthy' },
          ],
          hint: '需十艺【经义】≥ 55 或已识破齐云古塔回音谜局',
        },
        effects: [
          toast(
            '你清越喝诵“若以色见我，以音声求我，是人行邪道”，纯正佛号震散诡异黑教咒音，巴桑气机登时一窒！',
            'success',
            '佛号破咒',
          ),
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE09_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBasangShaken() },
            rule: 'story_trial',
            forbidEscapeReason: '佛骨舍利宝函就在巴桑背上，岂可退缩半步！',
            introText:
              '【绝顶夺函 · 佛号破咒】黑教邪咒已被经义佛号震散，趁势 1v1 击败【巴桑（二流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_s09_fight_style', value: 'chant' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_s09_fight_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_s09_fight_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
                ],
              },
              openScene('scene_sls09_06', SHAOLIN_SIDE09_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '塔顶风急一时被巴桑刚猛掌风震退半步！稳住心神后可于【齐云密檐舍利古塔】再登绝顶截杀此獠。',
                'warn',
                '舍利迷踪',
              ),
            ],
          },
        ],
      },
      {
        id: 'sls09_fight_force',
        label: '【正面硬破黑教金杵】不与邪道多费唇舌，催动纯阳少林内劲正面硬撼巴桑！',
        subLabel: '零门槛正攻 · 直面全盛巴桑（胜后怒目杀业 +1，战后全回满）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE09_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBasang() },
            rule: 'story_trial',
            forbidEscapeReason: '佛骨舍利宝函就在巴桑背上，岂可退缩半步！',
            introText:
              '【绝顶夺函 · 硬破金杵】在白马寺齐云塔十三层绝顶，1v1 正面迎战吐蕃黑教护法【巴桑（二流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_s09_fight_style', value: 'force' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_s09_fight_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_s09_fight_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_sls09_06', SHAOLIN_SIDE09_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '塔顶风急一时被巴桑刚猛掌风震退半步！稳住心神后可于【齐云密檐舍利古塔】再登绝顶截杀此獠。',
                'warn',
                '舍利迷踪',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls09_06: {
    id: 'scene_sls09_06',
    title: '第六幕 · 掌定宝函 · 众僧合围',
    subtitle: '齐云密檐舍利古塔 · 十三层绝顶',
    illustrationUrl: '/assets/quests/sl_s09_pagoda_summit.jpg',
    illustrationCaption: '十三层绝顶 · 月下击败吐蕃黑教护法巴桑，完璧夺回舍利宝函',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s09_fight_style=chant|佛号破咒令巴桑心神失守，招式处处受制；|你在塔刹寒风中以刚克刚，硬生生震偏黑教金杵锋芒；}数十合鏖战过后，你步走正宫双掌齐推，一股沛然莫御的佛门纯阳内劲将其震得连退七步，重重撞在塔刹铁柱之上！'),
      N('巴桑口吐鲜血、金杵脱手坠落塔外，背上布囊应声裂开，七宝舍利金函凌空滑出——你纵身一探，稳稳将宝函揽入怀中，内里佛骨封印丝毫无损！'),
      S(SPEAKER_BASANG, '（靠着塔刹喘息不止，眼神晦暗）“好浑厚的少林正宗内功……我巴桑今日技不如人，栽在释源祖庭，无话可说……”'),
      N('此时白马寺警钟响彻洛阳东郊，慧博与虚空率十余名武僧手持火把登上十三层，将巴桑点穴捆缚押交洛阳留守司，并请你先将舍利宝函恭送至白马大佛宝殿安奉。'),
    ],
    choices: [
      {
        id: 'sls09_to_main',
        label: '护送舍利宝函下塔，前往【白马大佛宝殿】安奉复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE09_QUEST_ID, 'return_main_hall'),
          toast(
            '已夺回佛骨舍利宝函！请前往【白马寺 · 白马大佛宝殿（ly_bm_main）】安奉复命。',
            'success',
            '舍利迷踪',
          ),
        ],
      },
    ],
  },

  scene_sls09_07: {
    id: 'scene_sls09_07',
    title: '第七幕 · 宝函归位 · 舍利安奉',
    subtitle: '白马寺 · 白马大佛宝殿',
    mandatory: true,
    beats: [
      N('白马大佛宝殿内梵呗低回，晨钟悠扬。你双手捧着七宝舍利金函缓步登坛，将其恭敬安奉于大佛莲座前的紫檀宝龛之内。'),
      S('NPC-0377', '（细察宝函外匣，轻叹一声）“阿弥陀佛，幸亏师弟赶到得快，内里东汉舍利丝毫未损！唯独外层鎏金锁扣被巴桑的铁凿崩出两道细痕，且殿前护法长明灯历经今夜风波，也该重添清油、重鎏金匣以告慰历代祖师。”'),
      S('NPC-0551', '（伤处已敷金创药，含笑合十）“寺中修缮地宫暗渠已耗去不少香火钱，咱们待稍后再慢慢筹措金箔便是，断不敢再劳烦师兄破费。”'),
      N('望着莲座前明灭摇曳的长明灯与略有凿痕的七宝外函，你心生虔敬，决意如何安奉这份千年圣物？'),
    ],
    choices: [
      {
        id: 'sls09_enshrine_donate',
        label: '【协助白马寺重修金函 · 捐银二十两添置长明灯油】自掏二十两香火银，重鎏金函并续燃长明灯！',
        subLabel: '需 20 两纹银（已捐重试免复费）· 禅心慈悲 +2，额外大增江湖声望、侠义与慧博好感',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_s09_donated', op: 'truthy' },
            { type: 'silverAtLeast', min: 20 },
          ],
          hint: '需 20 两纹银助白马寺重修金函并添置长明灯油（已捐则免复费）',
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s09_donated', op: 'falsy' },
            thenEffects: [
              { type: 'giveSilver', amount: -20, reason: '捐银二十两助洛阳白马寺重修舍利金函并添置长明灯油' },
              { type: 'setFlag', flag: 'sl_s09_donated', value: true },
            ],
            elseEffects: [],
          },
          { type: 'setFlag', flag: 'sl_s09_enshrine', value: 'donate' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s09_enshrine_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s09_enshrine_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_sls09_08', SHAOLIN_SIDE09_QUEST_ID),
        ],
      },
      {
        id: 'sls09_enshrine_escort',
        label: '【亲护舍利回殿安奉】亲手肃清龛尘、率众僧合诵《金刚经》为宝函重新加封安奉',
        subLabel: '零花销虔诚护法 · 禅心慈悲 +1',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s09_enshrine', value: 'escort' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s09_enshrine_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s09_enshrine_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls09_08', SHAOLIN_SIDE09_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls09_08: {
    id: 'scene_sls09_08',
    title: '第八幕 · 梵呗长明 · 禅理共印',
    subtitle: '白马寺 · 白马大佛宝殿',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s09_enshrine=donate|你取出二十两雪花纹银郑重放入功德箱，亲手为大佛莲座前的长明灯添满清澄灯油。慧博与虚空见你既有降魔大勇、又不吝施财护持祖庭，皆合十深揖致敬！|你净手焚香，亲手擦拭紫檀宝龛，与慧博、虚智、虚空、净云一同合诵三遍护法真言。大佛宝殿内梵音清朗，千年舍利宝函在晨光中宝气内敛、庄严安稳。}'),
      S('NPC-0551', '（感佩赞叹）“经此一役，西域诸派必知我嵩山少林与白马祖庭同气连枝、绝非可欺之辈！”'),
      S('NPC-0377', '{ifFlag:sl_s09_echo_solved|“更难得师弟临危不乱，竟借齐云塔『击掌蛙鸣』回音一眼识破巴桑湿毡蒙壁之诡计！待地宫暗渠修缮合龙，我必亲撰碑记，将师弟智勇护宝之功刻石传世！”|“师弟孤身追上十三层绝顶、力克吐蕃黑教强敌，保全东汉释源千年圣物，实乃大功一件！待地宫修缮完工，我必亲撰碑记铭录师弟之功！”}'),
    ],
    onFinishEffects: [openScene('scene_sls09_09', SHAOLIN_SIDE09_QUEST_ID)],
  },

  scene_sls09_09: {
    id: 'scene_sls09_09',
    title: '第九幕 · 祖庭赞誉 · 功成垂碑',
    subtitle: '白马大佛宝殿',
    mandatory: true,
    beats: [
      S('NPC-0377', '“此战你以纯正佛门武学胜强敌、以深厚经义破邪妄，兼得武道与禅理双重印证。这番宗门嘉奖与护经心得，师弟受之无愧！”'),
      P('（合十稽首）“多谢慧博师兄与诸位同门并肩护法！愿释源祖庭香火长明，河洛永安！”'),
      N('朝阳穿过白马寺古柏洒满大殿青砖，十三层齐云古塔巍然耸立于晴空之下，风铃清响如颂平安。'),
    ],
    choices: [
      {
        id: 'sls09_complete',
        label: '礼拜白马大佛，收下宗门重赏与经义体悟！',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 400, reason: '齐云塔十三层绝顶 1v1 击败吐蕃黑教护法巴桑' },
          { type: 'addSectContribution', amount: 160 },
          { type: 'addArtExp', amount: 120 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0377' }, delta: 15 },
          { type: 'modifyRenown', delta: 40, reason: '完成门派差事《齐云古塔 · 舍利迷踪》' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s09_echo_solved', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s09_enshrine', op: 'eq', value: 'donate' },
            thenEffects: [
              { type: 'modifyRenown', delta: 20, reason: '捐银重修白马寺舍利金函并供养长明灯' },
              { type: 'modifyChivalry', delta: 20, reason: '倾囊护持释源祖庭圣物' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0377' }, delta: 10 },
            ],
            elseEffects: [],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE09_QUEST_ID, outcome: 'completed' },
          toast(
            '【齐云古塔 · 舍利迷踪】圆满完结！经义大进，获宗门贡献 160、武学阅历 120 与实战经验 400！',
            'success',
            '舍利迷踪',
          ),
        ],
      },
    ],
  },
}
