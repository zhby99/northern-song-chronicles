import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q08_QUEST_ID } from './shaolinLuohanArhatArrayQuest'

const SPEAKER_ARHAT_BLADE: StorySpeakerSpec = {
  kind: 'custom',
  name: '金漆铜人 · 戒刀护法僧',
  title: '十八铜人大阵 · 第二阵刀盾首领',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
}

function buildHuiYinStaffLeader(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ08_HUIYIN',
    name: '铜人棍首 · 慧印',
    title: '禅武僧 · 十八铜人伏魔棍阵首领',
    realm: '二流中品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 2,
    sectRankLabel: '罗汉堂铜人',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
    talk: '“阿弥陀佛！师弟声名远播，第一阵「金刚伏魔棍阵」，便由贫僧以齐眉棍与普门杖法领教高招！”',
    stats: { hp: 1540, mp: 980, agi: 52, res: 36 },
    talents: { bone: 74, comprehension: 66, charm: 48 },
    equippedArts: { neigong: 'MA-159', move1: 'MA-153', move2: 'MA-134' },
    learnedArts: [{ artId: 'MA-159', level: 6 }, { artId: 'MA-153', level: 7 }, { artId: 'MA-134', level: 6 }],
  })
}

function buildStaffArhatMonk(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ08_STAFF_MONK',
    name: '金漆铜人 · 齐眉棍僧',
    title: '十八铜人伏魔棍阵 · 护阵武僧',
    realm: '二流中品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 2,
    sectRankLabel: '罗汉堂铜人',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
    talk: '“三才换位，棍影如墙！接阵！”',
    stats: { hp: 1460, mp: 920, agi: 50, res: 34 },
    talents: { bone: 72, comprehension: 62, charm: 45 },
    equippedArts: { neigong: 'MA-159', move1: 'MA-153', move2: 'MA-143' },
    learnedArts: [{ artId: 'MA-159', level: 6 }, { artId: 'MA-153', level: 6 }, { artId: 'MA-143', level: 6 }],
  })
}

function buildBladeArhatMonk(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ08_BLADE_MONK',
    name: '金漆铜人 · 戒刀护法僧',
    title: '十八铜人刀盾阵 · 刚猛刀僧',
    realm: '二流上品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 2,
    sectRankLabel: '罗汉堂铜人',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
    talk: '“第二阵离火藏刀、攻守一体！破不开金身连环，休想见慧轮师兄！”',
    stats: { hp: 1920, mp: 1220, agi: 58, res: 44 },
    talents: { bone: 80, comprehension: 68, charm: 46 },
    equippedArts: { neigong: 'MA-159', move1: 'MA-132', move2: 'MA-131' },
    learnedArts: [{ artId: 'MA-159', level: 7 }, { artId: 'MA-132', level: 7 }, { artId: 'MA-131', level: 5 }],
  })
}

function buildShieldArhatMonk(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ08_SHIELD_MONK',
    name: '金漆铜人 · 铁盾金刚僧',
    title: '十八铜人刀盾阵 · 镇阵盾僧',
    realm: '二流上品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 2,
    sectRankLabel: '罗汉堂铜人',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
    talk: '“坤土守中，万法难侵！且看师弟能否震裂我这面熟铜护法盾！”',
    stats: { hp: 2150, mp: 1180, agi: 52, res: 50 },
    talents: { bone: 84, comprehension: 64, charm: 44 },
    equippedArts: { neigong: 'MA-159', move1: 'MA-143', move2: 'MA-134' },
    learnedArts: [{ artId: 'MA-159', level: 7 }, { artId: 'MA-143', level: 7 }, { artId: 'MA-134', level: 6 }],
  })
}

function buildHuiLunCoreBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ08_HUILUN',
    name: '铜人阵眼 · 慧轮',
    title: '大金刚僧 · 十八铜人三才六合阵眼',
    realm: '一流下品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 3,
    sectRankLabel: '大金刚阵眼',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
    talk: '“阿弥陀佛！十年来你是第一位连破前阵直抵阵眼之人。贫僧今日便以罗汉堂压箱绝学，为你印证真传金身！”',
    stats: { hp: 2780, mp: 1850, agi: 68, res: 56 },
    talents: { bone: 88, comprehension: 80, charm: 56 },
    equippedArts: { neigong: 'MA-038', move1: 'MA-094', move2: 'MA-062' },
    learnedArts: [{ artId: 'MA-038', level: 7 }, { artId: 'MA-094', level: 8 }, { artId: 'MA-062', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq08_01: {
    id: 'scene_slq08_01',
    title: '第一幕 · 叩关铜人阵',
    subtitle: '十八铜人罗汉堂 · 罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('{reignYear}清秋，嵩山丹枫如火。罗汉堂演武正殿四门洞开，檀香如云；十八名身涂金漆、肌肉虬结如怒目金刚的罗汉堂顶尖武僧已依三才六合方位肃立青石之上，气势如山岳倾压！降魔尊者玄苦与戒律长老玄痛端坐监阵高台。'),
      S('NPC-0126', '（缓声宣谕，声震殿梁）“阿弥陀佛！你入罗汉堂以来，颍阳镇{ifFlagEq:sl_q05_mercy_verdict=rehabilitate|留屠三活口剃发赎罪、设粥度荒|押屠三送官严办、铁面追赃}，洛阳白马寺{ifFlag:sl_q06_sutras_saved|冒火抢出清凉台千年梵文孤本|截杀纵火先锋保全齐云塔基}，东庑寒雾{ifFlag:sl_q07_spy_spared|以禅理感化辽谍留口密报朝廷|以铁腕撬出暗桩废功交官}——历此三功，今日终得叩关「十八铜人三才六合大阵」！”'),
      S('NPC-0156', '“大阵由大金刚僧慧轮坐镇阵眼，慧印领衔前阵，共分三关：第一波金刚伏魔棍阵，考你观步识阵与群战周旋；第二波八卦棍刀连环阵，考你洞悉变幻之眼力；第三波直面一流下品阵眼慧轮！三关尽破，钟楼古钟为你连鸣九响！”'),
      S('NPC-0254', '（盘坐莲台睁开双目，金漆微泛灼热气浪）“师弟，殿外牛皮大鼓将擂三通。刀、杵、爪三门罗汉绝艺你已尽数兼修，今日闯阵，你欲以哪一艺为主轴统御战局？”'),
    ],
    choices: [
      {
        id: 'slq08_focus_blade',
        label: '【慈悲刀意 · 以柔卸刚】以三十六路圆融刀劲化阵破围，开启十八铜人大考！',
        subLabel: '承接真传大考，正式踏入十八铜人三才六合大阵',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q08_focus_art', value: 'blade' },
          { type: 'startQuest', questId: SHAOLIN_Q08_QUEST_ID, stepId: 'arhat_array_trial' },
          setStep(SHAOLIN_Q08_QUEST_ID, 'arhat_array_trial'),
          openScene('scene_slq08_02_wave1_plan', SHAOLIN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'slq08_focus_pestle',
        label: '【韦陀重杵 · 以重破坚】提玄悲所赠伏魔重杵碾破金身铜墙，开启十八铜人大考！',
        subLabel: '承接真传大考，正式踏入十八铜人三才六合大阵',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q08_focus_art', value: 'pestle' },
          { type: 'startQuest', questId: SHAOLIN_Q08_QUEST_ID, stepId: 'arhat_array_trial' },
          setStep(SHAOLIN_Q08_QUEST_ID, 'arhat_array_trial'),
          openScene('scene_slq08_02_wave1_plan', SHAOLIN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'slq08_focus_claw',
        label: '【龙爪擒拿 · 锁脉破巧】以裂碑龙爪专抓阵势换气破绽，开启十八铜人大考！',
        subLabel: '承接真传大考，正式踏入十八铜人三才六合大阵',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_q08_focus_art', value: 'claw' },
          { type: 'startQuest', questId: SHAOLIN_Q08_QUEST_ID, stepId: 'arhat_array_trial' },
          setStep(SHAOLIN_Q08_QUEST_ID, 'arhat_array_trial'),
          openScene('scene_slq08_02_wave1_plan', SHAOLIN_Q08_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq08_02_wave1_plan: {
    id: 'scene_slq08_02_wave1_plan',
    title: '第二幕 · 十八金身 · 第一阵破策',
    subtitle: '罗汉堂演武正殿 · 金刚伏魔棍阵（破阵指挥）',
    illustrationUrl: '/assets/quests/sl_08_arhat_array_1.jpg',
    illustrationCaption: '十八铜人阵 · 金漆罗汉列成三才六合大阵，齐眉长棍交织如林，直压中宫',
    mandatory: true,
    beats: [
      N('“咚——咚——咚！”牛皮大鼓连擂三通，十八名金漆铜人齐宣佛号，声浪震得廊檐铜铃齐鸣！外围六名铜人齐步踏出，手中熟铜齐眉棍往青石一顿，雷音滚滚！'),
      S('NPC-0356', '（领衔立于阵前，长棍遥指你中宫）“阿弥陀佛！第一波「金刚伏魔棍阵」，六人依三才步法轮转换位，棍影如墙！师弟若寻不到步法阵眼，便只能硬接贫僧与护阵铜人的连环棍势！”'),
      N('你凝神细观：六名金漆铜人左旋右转似无破绽，然每逢九步一换气之际，外侧齐眉棍僧与主阵慧印之间隐有一线极细微的步距交错。此刻是凭弈棋算学之眼抢卡阵眼、拆散副阵，还是以罗汉硬功正面硬撼？'),
    ],
    choices: [
      {
        id: 'slq08_wave1_read_eye',
        label: '【观步识阵眼】推算三才换步节拍，抢卡副阵死角拆散合围、直破阵头慧印！',
        subLabel: '跳过护阵齐眉棍僧，1v1 直战铜人棍首【慧印】',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需棋艺 ≥ 35 或算术 ≥ 40',
          conditions: [
            { type: 'skillAtLeast', key: '棋', min: 35 },
            { type: 'skillAtLeast', key: '算术', min: 40 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q08_wave1_smart', value: true },
          openScene('scene_slq08_03_wave1_smart', SHAOLIN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'slq08_wave1_brute',
        label: '【硬功对撼】不假巧计，正面踏入棍林车轮连战慧印与护阵棍僧！',
        subLabel: '零门槛正面破阵；车轮连战【慧印】与【齐眉棍僧】（二流中品 × 2）',
        tone: 'danger',
        effects: [openScene('scene_slq08_04_wave1_hard', SHAOLIN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_slq08_03_wave1_smart: {
    id: 'scene_slq08_03_wave1_smart',
    title: '第三幕 · 识眼破棍',
    subtitle: '罗汉堂演武正殿 · 第一阵（1v1 破阵头）',
    mandatory: true,
    beats: [
      N('你默数铜人踏地节拍至第七步半，忽然斜穿半丈精准插进西南巽角——恰恰好卡死护阵齐眉棍僧向左补位的交错步眼！副阵四僧长棍竟险些彼此磕碰，被迫同时收劲停步！'),
      S('NPC-0356', '（眼中精光一闪，失声赞叹）“好毒的兵法眼力！竟一眼卡死三才阵的转轴死角！既如此，第一阵便由贫僧独以长棍领教师弟高招！”'),
      N('高台上玄苦尊者抚须微笑。副阵已散，你顺势直迫主阵慧印展开 1v1 交锋！'),
    ],
    choices: [
      {
        id: 'slq08_fight_wave1_smart',
        label: '【第一阵 · 破阵头】1v1 迎战铜人棍首 · 慧印（二流中品）',
        subLabel: '已借观步拆散副阵合围，直克阵首',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuiYinStaffLeader() },
            rule: 'spar',
            forbidEscapeReason: '身在十八铜人三才六合大阵之中，唯破阵而出方为胜！',
            introText: '【十八铜人大阵 · 第一阵】识破阵眼，1v1 迎战【铜人棍首 · 慧印（二流中品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q08_wave1_cleared', value: true },
              openScene('scene_slq08_05_wave2_riddle', SHAOLIN_Q08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('惜败于慧印师兄精妙棍法！调息后可再赴【罗汉堂演武正殿】重闯第一阵。', 'warn', '十八铜人'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq08_04_wave1_hard: {
    id: 'scene_slq08_04_wave1_hard',
    title: '第三幕 · 棍林硬撼',
    subtitle: '罗汉堂演武正殿 · 第一阵（车轮连战）',
    mandatory: true,
    beats: [
      N('你不避不让，气沉丹田直步跨入棍阵正中！慧印与护阵齐眉棍僧一声佛喝，齐眉棍与普门杖法交错成一片金光密网，封死你上下三路！'),
      P('（双目如电，迎锋而上）“正要借诸位师兄的齐眉棍墙，淬炼我罗汉铁骨！”'),
      N('棍风呼啸扑面而来，你正面硬撼二流中品棍阵双雄！'),
    ],
    choices: [
      {
        id: 'slq08_fight_wave1_hard',
        label: '【第一阵 · 硬撼棍林】车轮连战【慧印】与【齐眉棍僧】（二流中品 × 2）',
        subLabel: '以罗汉硬功正面击穿伏魔棍阵',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuiYinStaffLeader() },
            extraOpponents: [{ kind: 'custom', npc: buildStaffArhatMonk() }],
            rule: 'spar',
            forbidEscapeReason: '身在十八铜人三才六合大阵之中，唯破阵而出方为胜！',
            introText: '【十八铜人大阵 · 第一阵】正面车轮迎战【铜人棍首 · 慧印】与【齐眉棍僧（二流中品 × 2）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q08_wave1_cleared', value: true },
              openScene('scene_slq08_05_wave2_riddle', SHAOLIN_Q08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('被伏魔棍阵连环棍影震退阵外！调息后可再赴【罗汉堂演武正殿】重闯第一阵。', 'warn', '十八铜人'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq08_05_wave2_riddle: {
    id: 'scene_slq08_05_wave2_riddle',
    title: '第四幕 · 八卦刀盾 · 阵位判断',
    subtitle: '罗汉堂演武正殿 · 第二阵变幻推演',
    mandatory: true,
    beats: [
      N('第一阵告破，慧印合十退归阵侧赞叹不已！旋即“锵啷”一声金铁交鸣，中圈六名体格更为雄健的金漆铜人跨步补位——手持熟铜护法圆盾、雪亮戒刀与短齐眉棍，刹那间结成第二波「八卦棍刀连环阵」！'),
      S(SPEAKER_ARHAT_BLADE, '（横刀盾侧，声如金铁交击）“阿弥陀佛！师弟过得棍阵，再看我第二波连环变幻！此阵一动，三方气机首尾相连，唯有识破机枢方位方能拆解合围！”'),
      S('NPC-0156', '（在高台朗声诵出罗汉堂古阵口诀，考校你临阵眼力）“听真——「巽风启棍、离火藏刀、坤土守中」！风势扫掠以惑耳目，厚土中枢稳若磐石难骤摧，唯杀锋隐于盾隙发难之处乃连环气门。师弟，此刻突阵，当击何位？”'),
      N('青石地面八卦铜钉微光闪烁：东南巽位棍影飞旋、正南离位盾隙寒芒隐吐、中宫坤位熟铜重盾稳如泰山。一念之间，须定破阵口令——'),
    ],
    choices: [
      {
        id: 'slq08_wave2_xun',
        label: '【抢攻东南巽位】循「巽风启棍」方位疾扑外翼，先截翻飞棍势',
        subLabel: '以快打快突入东南巽位',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q08_wave2_smart', value: false },
          openScene('scene_slq08_07_wave2_full', SHAOLIN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'slq08_wave2_li',
        label: '【直切正南离位】循「离火藏刀」方位雷霆穿隙，先断隐藏杀锋',
        subLabel: '直指正南离位拆解连环攻势',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q08_wave2_smart', value: true },
          openScene('scene_slq08_06_wave2_smart', SHAOLIN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'slq08_wave2_kun',
        label: '【重撼中宫坤位】循「坤土守中」方位正面撞击，强震铜盾中枢',
        subLabel: '以刚克刚直冲中宫坤位',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q08_wave2_smart', value: false },
          openScene('scene_slq08_07_wave2_full', SHAOLIN_Q08_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq08_06_wave2_smart: {
    id: 'scene_slq08_06_wave2_smart',
    title: '第五幕 · 断火拆阵',
    subtitle: '罗汉堂演武正殿 · 第二阵（1v1 破主阵）',
    mandatory: true,
    beats: [
      N('你一声清喝直切正南离位！巽风棍影原是诱敌虚招、坤土铁盾最忌正面硬撞，唯独「离火藏刀」乃是整座连环阵真正出锋杀敌的枢纽！'),
      N('你趁重盾微开半寸放刀的刹那骤然贴身切入，反手一劲震歪侧翼铁盾金刚僧的步架，将其彻底隔出战圈！连环攻势登时瓦解，唯有阵主【戒刀护法僧】提刀独挡于你身前！'),
      S(SPEAKER_ARHAT_BLADE, '（惊赞出声，长刀一横）“竟真破了「离火藏刀」气门！铁盾师弟受制不及补位，便由贫僧独自领教师弟的破阵绝艺！”'),
    ],
    choices: [
      {
        id: 'slq08_fight_wave2_smart',
        label: '【第二阵 · 拆解连环】1v1 迎战主阵铜人 · 戒刀护法僧（二流上品）',
        subLabel: '离火阵门既破，独克戒刀护法僧即可直面阵眼慧轮',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBladeArhatMonk() },
            rule: 'spar',
            forbidEscapeReason: '已切入离火阵门，击败主阵戒刀护法僧便可破除第二阵！',
            introText: '【十八铜人大阵 · 第二阵】识破「离火藏刀」拆解连环，1v1 迎战【戒刀护法僧（二流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q08_wave2_cleared', value: true },
              openScene('scene_slq08_08_zen_question', SHAOLIN_Q08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('戒刀护法僧刀势炽烈，暂退调息后可再赴【罗汉堂演武正殿】续战第二阵！', 'warn', '十八铜人'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq08_07_wave2_full: {
    id: 'scene_slq08_07_wave2_full',
    title: '第五幕 · 铁壁血战',
    subtitle: '罗汉堂演武正殿 · 第二阵（双铜人车轮战）',
    mandatory: true,
    beats: [
      N('你身形掠入方位的一瞬，却见铁盾金刚僧轰然并盾如墙，戒刀护法僧趁隙自正南离位骤闪出刀——未能抢先切断「离火藏刀」枢纽，八卦刀盾连环阵登时合拢如铁桶！'),
      S(SPEAKER_ARHAT_BLADE, '（刀盾齐进，朗声喝道）“阿弥陀佛！师弟误入连环合围，既未拆阵，便须以硬实力连破我刀盾双铜人方能晋入阵心！”'),
      N('熟铜巨盾压迫如山，戒刀炽风劈面而来！你沉气凝神，迎战完整的二流上品双铜人连环阵！'),
    ],
    choices: [
      {
        id: 'slq08_fight_wave2_full',
        label: '【第二阵 · 破铁壁】车轮连战【戒刀护法僧】与【铁盾金刚僧】（二流上品 × 2）',
        subLabel: '正面硬破八卦刀盾双铜人合围',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBladeArhatMonk() },
            extraOpponents: [{ kind: 'custom', npc: buildShieldArhatMonk() }],
            rule: 'spar',
            forbidEscapeReason: '第二阵刀盾壁垒已合，唯有正面破阵方能直面阵眼慧轮！',
            introText: '【十八铜人大阵 · 第二阵】正面车轮迎战【戒刀护法僧】与【铁盾金刚僧（二流上品 × 2）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q08_wave2_cleared', value: true },
              openScene('scene_slq08_08_zen_question', SHAOLIN_Q08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '未能冲破金身刀盾壁垒！调息后可再赴【罗汉堂演武正殿】重新判断阵位续战第二阵。',
                'warn',
                '十八铜人',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq08_08_zen_question: {
    id: 'scene_slq08_08_zen_question',
    title: '第六幕 · 直面阵眼 · 金刚问禅',
    subtitle: '罗汉堂演武正殿 · 三才阵心',
    mandatory: true,
    beats: [
      N('第二阵轰然瓦解，刀盾二僧合十退居殿柱之侧！满殿观礼弟子无不屏息震撼。正中莲台之上，大金刚僧【慧轮】缓步踏下青石，周身金漆隐隐流转着《少林九阳功》的炽热罡气，一流下品之威压迫得长明灯火齐齐摇曳！'),
      S('NPC-0156', '（在高台向玄苦低声赞道）“师兄请看，此子连过两阵气息非但不乱，反倒越战越纯，{ifFlag:sl_q08_wave2_smart|更一眼看破八卦刀盾离火气门，实乃少林百年难遇的阵武奇才！|硬凭铁骨连挫双阵铜人，这份金刚定力亦令人叹服！}”'),
      S('NPC-0254', '（肃立阵心，目光深沉灼亮）“师弟，你连破两阵，离真传金身仅剩一步之遥。在接贫僧《少林九阳功》之前，唯有一问：你苦修刀杵爪三艺、独闯十八铜人阵，所求究竟是护世之盾，还是伏魔之锋？”'),
    ],
    choices: [
      {
        id: 'slq08_answer_shield',
        label: '【愿为护世之盾】乱世将起，弟子求罗汉金身唯愿多护一分苍生安宁！',
        subLabel: '以慈悲护世之心迎战阵眼慧轮',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q08_huilun_answer', value: 'shield' },
          openScene('scene_slq08_09_huilun_duel', SHAOLIN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'slq08_answer_blade',
        label: '【愿为伏魔之锋】外患暗涌，弟子求罗汉金身正为斩尽邪魔、镇慑宵小！',
        subLabel: '以金刚伏魔之志迎战阵眼慧轮',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q08_huilun_answer', value: 'blade' },
          openScene('scene_slq08_09_huilun_duel', SHAOLIN_Q08_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq08_09_huilun_duel: {
    id: 'scene_slq08_09_huilun_duel',
    title: '第七幕 · 终阵 · 阵眼慧轮',
    subtitle: '罗汉堂演武正殿 · 决战大金刚僧（一流下品）',
    mandatory: true,
    beats: [
      S('NPC-0254', '（抚掌大笑，眼中金芒暴涨）“{ifFlagEq:sl_q08_huilun_answer=shield|以金身为苍生盾，大悲大愿，善哉善哉！|以金身为伏魔锋，铁骨铮铮，痛快痛快！}有此宏愿，方堪承我少林真传衣钵！来吧，让贫僧以一流修为为你淬炼最后一重罗汉金身！”'),
      N('慧轮双手一分，《少林九阳功》罡气如洪炉展开，韦陀杵劲与龙爪擒拿在他举手投足间浑然天成！演武正殿顿时鸦雀无声，唯有劲风激荡得廊下经幡猎猎作响！'),
      P('（深吸一口长气，将{ifFlagEq:sl_q08_focus_art=blade|《慈悲刀法》圆融刀意|}{ifFlagEq:sl_q08_focus_art=pestle|《韦陀杵》雷霆重势|}{ifFlagEq:sl_q08_focus_art=claw|《龙爪手》裂碑巧劲|}与毕生禅武贯通心胸，合十踏步）“请慧轮师兄赐招！弟子正欲借此一战，印证罗汉金身！”'),
    ],
    choices: [
      {
        id: 'slq08_fight_huilun',
        label: '【第三阵 · 阵眼】一对一决战大金刚僧 · 慧轮（一流下品）',
        subLabel: '胜此一战即可破阵而出，钟鸣九响晋升真传',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuiLunCoreBoss() },
            rule: 'spar',
            forbidEscapeReason: '已抵十八铜人核心阵眼，唯正面力挫慧轮方能成就少林真传！',
            introText: '【十八铜人大阵 · 核心阵眼】一对一决战大金刚僧【慧轮（一流下品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq08_10_breakthrough', SHAOLIN_Q08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '不敌一流下品阵眼慧轮的雄浑九阳罡气！调息后可再赴【罗汉堂演武正殿】直接续战慧轮。',
                'warn',
                '十八铜人',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq08_10_breakthrough: {
    id: 'scene_slq08_10_breakthrough',
    title: '第八幕 · 破阵金身 · 钟鸣九响',
    subtitle: '罗汉堂演武正殿 · 铜人稽首',
    illustrationUrl: '/assets/quests/sl_08_arhat_breakthrough.jpg',
    illustrationCaption: '罗汉金身 · 正殿金光震荡，你以融汇贯通的罗汉绝艺震退阵眼慧轮，十八铜人齐齐合十让道',
    mandatory: true,
    beats: [
      N('你与慧轮在演武正殿激斗五十余合，拳风杵影震得青砖龟裂、香灰漫天！最后关头慧轮蓄满《少林九阳功》重势压顶，你电光石火间豁然贯通：先以《慈悲刀法》圆弧卸去三分刚劲，再借《龙爪手》寸劲粘开中门，最后以堂堂正正的《韦陀杵》破邪之势反震而出！'),
      N('“轰——！”气浪如金色莲花轰然绽放！慧轮连退七步方稳身形，周身金粉簌簌震落，旋即畅笑合十躬身让开大殿中路；十八名金漆铜人齐刷刷收兵肃立，向你齐声高宣佛号致礼！'),
      S('NPC-0254', '（眼中满是敬佩喜悦）“阿弥陀佛！师弟刀、杵、爪三艺融于一炉，贫僧输得心服口服！自今日起，罗汉堂真传之位，非师弟莫属！”'),
      S('NPC-0126', '（走下高台宣谕，钟楼古钟骤然轰鸣九响震彻嵩岳）“铛——！传我法谕，撞响大钟九响！师侄速净手更衣，赴【大雄正殿 · 佛前蒲团】受方丈师兄授衣册封！”'),
    ],
    choices: [
      {
        id: 'slq08_go_daxiong',
        label: '沐浴九响钟声整肃僧衣，前往【大雄正殿 · 佛前蒲团】受封真传弟子',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q08_QUEST_ID, 'zhenchuan_ceremony'),
          toast(
            '已破十八铜人大阵！请速赴【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】受玄慈方丈册封真传！',
            'talk',
            '钟鸣九响',
          ),
        ],
      },
    ],
  },

  scene_slq08_11_daxiong: {
    id: 'scene_slq08_11_daxiong',
    title: '第九幕 · 大雄正殿 · 亲赐袈裟',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_08_zhenchuan_bell.jpg',
    illustrationCaption: '钟鸣九响 · 大雄正殿香云缭绕，玄慈方丈亲为你披上少林真传紫金袈裟，群僧同颂佛号',
    mandatory: true,
    beats: [
      N('大雄正殿三世金佛宝相庄严，百盏酥油长明灯交辉。伏虎方丈玄慈身披大红织金袈裟端坐佛前，玄苦、玄痛、慧轮等高僧分列两厢，数百名少林弟子肃立石阶观礼。'),
      N('恰在第九声青铜古钟余韵悠悠落定之际，你跪伏佛前蒲团三叩首；玄慈方丈缓缓步至你身前，亲手将一袭绣有金莲梵纹的真传紫金袈裟披上你肩头，并颁下紫檀「罗汉真传」法印！'),
      S('NPC-0112', '（声音温和而深邃，传遍宝殿内外）“阿弥陀佛！昔日你在佛前挥毫择入罗汉堂，贫僧便知你非池中之物。今日你连破十八铜人三才六合大阵，钟鸣九响，贫僧以嵩山少林寺方丈之名，正式册封你为少林派【真传弟子】！”'),
      N('殿内外数百名少林僧俗齐声高颂：“阿弥陀佛！恭贺师兄荣膺真传！”声震嵩岳，经久不息。'),
    ],
    onFinishEffects: [openScene('scene_slq08_12_oath', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_12_oath: {
    id: 'scene_slq08_12_oath',
    title: '第十幕 · 佛前立誓',
    subtitle: '大雄正殿 · 真传誓词抉择',
    mandatory: true,
    beats: [
      N('群僧佛号渐歇，大雄正殿香烟袅袅。玄慈方丈轻扶你起身，望向香案上那卷记载历代罗汉堂真传名录的青檀名册，缓声道：“凡我少林真传受衣之日，皆须于三世金佛前亲立本心宏愿，记入名册，终身不渝。”'),
      S('NPC-0126', '（立于香案左侧，目光沉稳欣慰）“昔日达摩祖师面壁九年、十三棍僧救唐王，少林千年气脉不在一招一式，而在持艺者胸中大愿。师侄今日受封，便将毕生抱负昭告诸佛罢。”'),
      S('NPC-0112', '“如今大宋四境暗流渐起，辽夏蠢动，吐蕃西域奇人辈出。你身披紫金袈裟、承罗汉堂衣钵，愿于佛前立下何等真传誓词？”'),
    ],
    choices: [
      {
        id: 'slq08_oath_mercy',
        label: '【护世慈悲誓】愿以罗汉金身护佑乱世苍生，凡遇刀兵饥馑，先存止杀度人之心！',
        subLabel: '以悲智统御武威；高侠义与方丈深重赞许（禅心慈悲 +2）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q08_zhenchuan_oath', value: 'mercy' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
          openScene('scene_slq08_13_complete', SHAOLIN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'slq08_oath_wrath',
        label: '【伏魔铁血誓】愿以罗汉金身镇慑四夷奸邪，凡敢犯少林与中原者，必以雷霆荡平！',
        subLabel: '以怒目金刚振军威；更高江湖声望与罗汉堂众僧拥戴（怒目杀业 +2）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q08_zhenchuan_oath', value: 'wrath' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
          openScene('scene_slq08_13_complete', SHAOLIN_Q08_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq08_13_complete: {
    id: 'scene_slq08_13_complete',
    title: '第十一幕 · 罗汉真传',
    subtitle: '嵩山少林寺 · 大雄正殿',
    mandatory: true,
    beats: [
      S('NPC-0112', '（执朱笔将你的誓词亲书入真传名册，含笑颔首）“{ifFlagEq:sl_q08_zhenchuan_oath=mercy|慈悲护世，止杀度人——此乃佛门最上乘菩萨行，善哉，善哉！|铁血伏魔，镇护山河——怒目金刚亦是护法大愿，切记以禅定守心、莫坠嗔魔！}”'),
      S('NPC-0112', '“自今日起，你可自由出入罗汉堂内殿与藏经阁中层。日后须勤参《大乘经藏》、精研七十二绝技，方能在天下大变局中稳如泰山！”'),
      N('清秋暖阳穿透大雄宝殿高窗，洒落在你肩头的真传紫金袈裟之上。历尽千锤百炼终成正果，属于少林真传弟子的全新江湖篇章，正徐徐展开！'),
    ],
    choices: [
      {
        id: 'slq08_complete',
        label: '恭谨受封少林【真传弟子】，圆满完成【十八铜人 · 罗汉金身】',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 3, promoteOnly: true },
          {
            type: 'giveCombatExp',
            amount: 550,
            reason: '连破少林十八金漆铜人三才六合大阵并力挫阵眼慧轮，晋升真传弟子',
          },
          { type: 'addSectContribution', amount: 220 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q08_zhenchuan_oath', op: 'eq', value: 'mercy' },
            thenEffects: [
              {
                type: 'modifyRenown',
                delta: 80,
                reason: '硬闯少林十八铜人大阵，钟鸣九响立护世慈悲誓晋升真传',
              },
              {
                type: 'modifyChivalry',
                delta: 30,
                reason: '大雄宝殿佛前立下护世慈悲真传宏愿',
              },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0112' }, delta: 15 },
            ],
            elseEffects: [
              {
                type: 'modifyRenown',
                delta: 100,
                reason: '硬闯少林十八铜人大阵，钟鸣九响立伏魔铁血誓威震江湖',
              },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0126' }, delta: 10 },
            ],
          },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0126' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0254' }, delta: 10 },
          { type: 'completeQuest', questId: SHAOLIN_Q08_QUEST_ID, outcome: 'completed' },
          toast(
            '【十八铜人 · 罗汉金身】圆满完成！已晋升嵩山少林寺 Lv.3【真传弟子】，获实战经验、门派贡献、江湖声望与经义书法提升！',
            'success',
            '真传册封',
          ),
        ],
      },
    ],
  },
}
