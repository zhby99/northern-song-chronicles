import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, setStep, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { HUASHAN_Q07_QUEST_ID } from './huashanJianLuoyanQuest'

const SPEAKER_PIRATE_VANGUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '孙横',
  title: '翻浪钩 · 九曲连环寨前哨先锋',
  factionName: '九曲连环寨',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_PIRATE_DEPUTY: StorySpeakerSpec = {
  kind: 'custom',
  name: '周沧',
  title: '截江蛟 · 九曲连环寨二当家',
  factionName: '九曲连环寨',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_PIRATE_CHIEF: StorySpeakerSpec = {
  kind: 'custom',
  name: '郑屠',
  title: '混河铁桨 · 九曲连环寨大头领',
  factionName: '九曲连环寨',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_MERCHANT_ELDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '晋州裴掌柜',
  title: '晋陕盐铁商帮老客',
  factionName: '晋陕行商',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

function buildPirateVanguardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ07_PIRATE_VANGUARD',
    name: '孙横',
    title: '九曲连环寨 · 前哨翻浪钩',
    realm: '二流下品',
    factionName: '九曲连环寨',
    avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
    talk: '“三更半夜敢驾孤舟闯我九曲苇荡？勾穿你的琵琶骨喂黄河王八！”',
    stats: { hp: 1080, mp: 820, agi: 45, res: 29 },
    talents: { bone: 56, comprehension: 42, charm: 26 },
    equippedArts: { neigong: 'MA-104', qinggong: 'MA-197', move1: 'MA-237', move2: 'MA-193' },
    learnedArts: [
      { artId: 'MA-104', level: 3 },
      { artId: 'MA-197', level: 3 },
      { artId: 'MA-237', level: 4 },
      { artId: 'MA-193', level: 4 },
    ],
    equipped: { weapon: 'WPN-078' },
    questBadgeLabel: '水寨先锋',
  })
}

function buildPirateDeputyNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ07_PIRATE_DEPUTY',
    name: '周沧',
    title: '九曲连环寨 · 截江蛟',
    realm: '二流中品',
    factionName: '九曲连环寨',
    avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
    talk: '“华山旱鸭子也敢在摇晃船舷上逞剑快？看你站不站得稳一合！”',
    stats: { hp: 1290, mp: 1020, agi: 48, res: 32 },
    talents: { bone: 62, comprehension: 46, charm: 28 },
    equippedArts: { neigong: 'MA-104', qinggong: 'MA-138', move1: 'MA-237', move2: 'MA-131' },
    learnedArts: [
      { artId: 'MA-104', level: 4 },
      { artId: 'MA-138', level: 4 },
      { artId: 'MA-237', level: 5 },
      { artId: 'MA-131', level: 4 },
    ],
    equipped: { weapon: 'WPN-081' },
    questBadgeLabel: '水寨二当家',
  })
}

function buildPirateChiefNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ07_PIRATE_CHIEF',
    name: '郑屠',
    title: '九曲连环寨 · 混河铁桨',
    realm: '二流中品',
    factionName: '九曲连环寨',
    avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
    talk: '“破我三道水栅！吃老子一记翻江分水大枪，连船带人给你砸沉河底！”',
    stats: { hp: 1420, mp: 1150, agi: 50, res: 34 },
    talents: { bone: 68, comprehension: 50, charm: 25 },
    equippedArts: { neigong: 'MA-104', qinggong: 'MA-139', move1: 'MA-093', move2: 'MA-237' },
    learnedArts: [
      { artId: 'MA-104', level: 5 },
      { artId: 'MA-139', level: 4 },
      { artId: 'MA-093', level: 4 },
      { artId: 'MA-237', level: 5 },
    ],
    equipped: { weapon: 'WPN-027' },
    questBadgeLabel: '连环寨主',
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq07_01: {
    id: 'scene_hsq07_01',
    title: '第一幕 · 晋陕商劫',
    subtitle: '潼关北麓 · 黄河风陵渡讯报',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，黄河自北南下至潼关骤然东折，激起千堆雪浪。近半月来，一伙自号「九曲连环寨」的凶悍水匪依托风陵渡口芦苇暗滩设下铁索水栅，接连劫掠了七艘往来晋陕的盐铁商船。'),
      N('你既已将《养吾剑法》中的化守为刺之理打磨纯熟，封不弃便一纸飞传，召你星夜赶赴【潼关天险瓮城 · 黄河大折惊涛烽火台】会合。'),
      S('NPC-0167', '“上次乱葬岗斩的那两个刀匪，脚下踩的是硬地，算不得真本事。江湖厮杀，屋脊、悬索、摇橹孤舟皆是生死场——脚下一晃，你那点快剑还能剩几分准头？”'),
      P('“弟子正觉步法与剑势尚有滞涩之处，恳请封师叔指点迷津！”'),
    ],
    choices: [
      {
        id: 'hsq07_01_next',
        label: '随封不弃登临惊涛烽火台，俯瞰风陵渡水势',
        tone: 'gold',
        effects: [openScene('scene_hsq07_02', HUASHAN_Q07_QUEST_ID)],
      },
    ],
  },

  scene_hsq07_02: {
    id: 'scene_hsq07_02',
    title: '第二幕 · 惊涛烽台',
    subtitle: '潼关天险瓮城 · 黄河大折惊涛烽火台',
    mandatory: true,
    beats: [
      N('登上高耸于断崖之巅的惊涛烽火台，脚下浊浪排空，对岸风陵渡外连绵数里的枯黄苇荡中隐约透出三处呈品字形分布的气死风灯——正是九曲连环寨的三道水哨。'),
      S('NPC-0167', '“河道湍急，官军战船吃水太深进不了浅滩苇荡；气宗那帮人轻功死板，踩上湿滑船舷未等聚气便要先掉进冰水里。想端掉这座连环水寨，非学我华山南峰落雁一脉的轻灵快剑不可！”'),
    ],
    choices: [
      {
        id: 'hsq07_02_start',
        label: '驻足烽火台悬崖边，随封不弃凝望夜空寒雁',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q07_QUEST_ID, stepId: 'fengling_geese' },
          openScene('scene_hsq07_03', HUASHAN_Q07_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq07_03: {
    id: 'scene_hsq07_03',
    title: '第三幕 · 秋雁扑波',
    subtitle: '黄河大折惊涛烽火台 · 寒渡传剑',
    illustrationUrl: '/assets/quests/hs_q07_fengling_geese.jpg',
    illustrationCaption: '寒渡观雁 · 黄河风陵渡口秋雁扑波，封不弃夜授落雁剑法',
    mandatory: true,
    beats: [
      N('恰在此时，一列南迁秋雁嘶鸣着掠过寒月之下。忽有一阵河谷烈风横卷而至，领头孤雁并不硬顶狂风，而是双翅一敛顺风斜坠，贴着翻滚浪尖轻巧一折，瞬间掠出十余丈外！'),
      S('NPC-0167', '（拔剑出鞘，剑光在月下划出一道与孤雁分毫不差的斜掠寒弧）“看懂了么？这便是华山良品上品快剑——《落雁剑法》！雁落平沙，看似随风飘忽、斜斜下坠，实则借风催势、一折千里！”'),
      S('NPC-0167', '“其中杀力最烈的一式唤作‘回风扑雁’：先顺着敌刃来势轻飘飘斜掠避锋，足尖借势一点，回身便是连环三记疾刺！看好了！”'),
      N('封不弃身形如寒雁掠波，在方寸垛口间倏忽来去，二十四路《落雁剑法》倾囊相授！'),
    ],
    choices: [
      {
        id: 'hsq07_03_learn',
        label: '铭记孤雁斜掠回扑神韵，习得《落雁剑法》',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-128', level: 1, autoEquip: true },
          toast('已习得《落雁剑法》！', 'success', '寒渡授剑'),
          openScene('scene_hsq07_04', HUASHAN_Q07_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq07_04: {
    id: 'scene_hsq07_04',
    title: '第四幕 · 斜掠折返',
    subtitle: '风陵渡南岸 · 乱礁试剑',
    mandatory: true,
    beats: [
      N('你随封不弃掠下河滩乱礁，迎着拍岸浪花反复演练《落雁剑法》。初时浪花溅湿靴底尚有些许摇晃，半个时辰后，你已能借着河风推力在湿滑圆石间斜掠换步，剑尖专取浪花炸裂的一瞬。'),
      P('“身随剑斜，剑借风回！在摇晃不定的地方，越是不肯死钉原地，剑锋反而越快越稳！”'),
      S('NPC-0167', '“悟性不差！时候差不多了，随我去渡口老槐树下。”'),
    ],
    choices: [
      {
        id: 'hsq07_04_next',
        label: '收剑入鞘，随封不弃潜至风陵渡口古槐树下',
        tone: 'primary',
        effects: [openScene('scene_hsq07_05', HUASHAN_Q07_QUEST_ID)],
      },
    ],
  },

  scene_hsq07_05: {
    id: 'scene_hsq07_05',
    title: '第五幕 · 老槐军令',
    subtitle: '风陵古渡 · 三更燃香',
    mandatory: true,
    beats: [
      N('三更梆响，河面升起一层白茫茫的寒雾。渡口歪脖子老槐树下系着一叶窄小的渔家扁舟，封不弃取出一支线香折断一半，随手插进树皮裂缝中点燃。'),
      S('NPC-0167', '（双臂抱胸倚在老槐树干上）“我就站在这棵槐树下等。你独自撑这叶扁舟进去，半柱香之内，给我连破九曲连环寨三道水哨、宰了他们的当家头领！”'),
      S('NPC-0167', '“还有一条规矩——《落雁剑法》讲究轻灵迅捷、一沾即走。上岸时若让我瞧见你衣袍上溅了半滴水匪的脏血，这门剑法我便收回来！”'),
    ],
    choices: [
      {
        id: 'hsq07_05_board',
        label: '凛然领命，解缆跃上扁舟直入九曲苇荡',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q07_QUEST_ID, 'skiff_vanguard'),
          openScene('scene_hsq07_06', HUASHAN_Q07_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq07_06: {
    id: 'scene_hsq07_06',
    title: '第六幕 · 扁舟入苇',
    subtitle: '黄河风陵渡 · 迷雾芦苇荡',
    mandatory: true,
    beats: [
      N('竹篙一点，孤舟顺着湍急暗流如离弦之箭般滑入丈许高的芦苇丛中。寒雾遮蔽星月，唯有两侧苇叶摩擦船帮发出沙沙轻响。'),
      N('前行不过百丈，水底忽地绷起两道碗口粗的拦河铁索，哨楼上铜铃眼看便要被船头撞响！'),
    ],
    choices: [
      {
        id: 'hsq07_06_leap',
        label: '足尖一点船头，施展平沙落雁凌空削断铃索！',
        tone: 'primary',
        effects: [openScene('scene_hsq07_07', HUASHAN_Q07_QUEST_ID)],
      },
    ],
  },

  scene_hsq07_07: {
    id: 'scene_hsq07_07',
    title: '第七幕 · 孤舟破哨',
    subtitle: '九曲连环寨 · 前两道水哨',
    illustrationUrl: '/assets/quests/hs_q07_skiff_raid.jpg',
    illustrationCaption: '孤舟破哨 · 三更怒涛踏扁舟，半柱香连破九曲水匪三道哨卡',
    mandatory: true,
    beats: [
      N('你身形如秋雁掠水腾空而起，青锋斜挥，三枚报警铜铃尚未发出半声脆响便已坠入浊流！落足回舟之际，剑光顺势左右两掠，第一道木桩哨卡上的两名暗哨已捂喉栽落水中。'),
      N('扁舟借急流余势直冲第二道哨卡！木栅后火把骤亮，前哨先锋「翻浪钩」孙横手持长柄钩镰枪，带着数名水匪悍然跳上你的孤舟船头！'),
    ],
    choices: [
      {
        id: 'hsq07_07_next',
        label: '借扁舟下沉反弹之势，拔剑迎战前哨先锋！',
        tone: 'danger',
        effects: [openScene('scene_hsq07_08', HUASHAN_Q07_QUEST_ID)],
      },
    ],
  },

  scene_hsq07_08: {
    id: 'scene_hsq07_08',
    title: '第八幕 · 头哨惊澜',
    subtitle: '第二道水哨 · 窄舟搏杀',
    mandatory: true,
    beats: [
      S(SPEAKER_PIRATE_VANGUARD, '“好俊的轻功！可惜进了爷爷的水道，这三尺宽的小破船就是你的棺材板！给我钩翻{gender:他|她}！”'),
      N('孙横一枪横扫下盘，整叶扁舟在激流中剧烈侧倾，冰冷河水几乎漫过船舷！'),
    ],
    choices: [
      {
        id: 'hsq07_08_fight',
        label: '斜掠避开铁钩，回剑疾取孙横咽喉！（死战孙横）',
        subLabel: '生死决战 · 翻浪钩孙横（二流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPirateVanguardNpc() },
            rule: 'duel',
            forbidEscapeReason: '身处黄河急流孤舟之上，退入冰水必遭水匪乱钩分尸！',
            deathTitle: '沉尸风陵寒渡',
            deathDetail: '你在风陵渡水哨孤舟之上失足落水，被九曲连环寨水匪钩镰乱刃所害。',
            onWin: [openScene('scene_hsq07_09', HUASHAN_Q07_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq07_09: {
    id: 'scene_hsq07_09',
    title: '第九幕 · 借橹换步',
    subtitle: '第二道水哨 · 踏桨飞渡',
    mandatory: true,
    beats: [
      N('剑光如雁翎掠过，孙横咽喉中剑向后仰倒，溅起丈许水花，而你早已足尖一点他脱手飞出的木橹，凌空斜掠三丈，衣角连半滴血珠都未曾沾染！'),
      N('前方苇荡豁然开朗，九曲连环寨的第三道主哨——三艘铁链相连的蒙冲大船正横锁河心！算算时辰，老槐树下的半柱香刚烧过一半！'),
    ],
    choices: [
      {
        id: 'hsq07_09_advance',
        label: '踏浪跃上连环蒙冲主船，直捣水寨中军！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q07_QUEST_ID, 'skiff_chieftain'),
          openScene('scene_hsq07_10', HUASHAN_Q07_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq07_10: {
    id: 'scene_hsq07_10',
    title: '第十幕 · 连环水栅',
    subtitle: '九曲连环寨 · 蒙冲主船甲板',
    mandatory: true,
    beats: [
      N('你轻若鸿毛般落在主船尾楼之上，只见船舱外捆绑着十余名衣衫褴褛的晋陕商客，身旁堆满了劫来的潞州精铁与解池官盐引票。'),
      S(SPEAKER_MERCHANT_ELDER, '（压低嗓音惊呼）“{gender:少侠|女侠}留神！船头舱里坐着九曲寨的两名当家，全是水上浸淫十余年的硬茬子！”'),
      N('你一剑削断老掌柜腕上麻绳，示意众商客伏低舱内，提剑便向主甲板迎去。'),
    ],
    choices: [
      {
        id: 'hsq07_10_next',
        label: '提剑步出前甲板，直面水寨当家',
        tone: 'danger',
        effects: [openScene('scene_hsq07_11', HUASHAN_Q07_QUEST_ID)],
      },
    ],
  },

  scene_hsq07_11: {
    id: 'scene_hsq07_11',
    title: '第十一幕 · 双魁夹击',
    subtitle: '蒙冲主船 · 怒浪摇舷',
    mandatory: true,
    beats: [
      N('舱门轰然洞开！二当家「截江蛟」周沧手执熟铁长篙当先冲出，同时喝令喽啰砍断右侧锚链——整座连环主船顿时在黄河旋涡中剧烈颠簸摇摆起来！'),
      S(SPEAKER_PIRATE_DEPUTY, '“哈哈哈哈！瞧这白面剑客的打扮是华山派的崽子吧？船身晃成这样，看你拿什么跟爷爷斗！”'),
    ],
    choices: [
      {
        id: 'hsq07_11_next',
        label: '随船身起伏轻灵换步，在湿滑船舷边亮剑迎敌',
        tone: 'danger',
        effects: [openScene('scene_hsq07_12', HUASHAN_Q07_QUEST_ID)],
      },
    ],
  },

  scene_hsq07_12: {
    id: 'scene_hsq07_12',
    title: '第十二幕 · 船舷斗剑',
    subtitle: '蒙冲主船 · 战截江蛟',
    mandatory: true,
    beats: [
      N('大浪拍击船帮，甲板倾斜近半。周沧足底如生吸盘，铁头长篙挟着千钧水劲横扫你腰肋，逼你落水！'),
    ],
    choices: [
      {
        id: 'hsq07_12_fight',
        label: '足踏船舷浪沫，以《落雁剑法》斜掠破篙！（死战周沧）',
        subLabel: '生死决战 · 截江蛟周沧（二流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPirateDeputyNpc() },
            rule: 'duel',
            forbidEscapeReason: '蒙冲大船四面怒涛翻涌，唯有斩杀水匪头领方能夺船脱身！',
            deathTitle: '陨命九曲水寨',
            deathDetail: '你在颠簸的蒙冲大船船舷上被截江蛟周沧铁篙扫落急流，不幸遇难。',
            onWin: [openScene('scene_hsq07_13', HUASHAN_Q07_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq07_13: {
    id: 'scene_hsq07_13',
    title: '第十三幕 · 大当家现',
    subtitle: '蒙冲主船 · 混河铁桨',
    mandatory: true,
    beats: [
      N('你顺着铁篙横扫的风势飘身后仰，脚尖勾住桅杆缆绳旋身折返，一剑刺穿周沧右胸，将其踢落滚滚黄河！'),
      S(SPEAKER_PIRATE_CHIEF, '“好一招借风回剑！难怪敢孤身闯我九曲连环寨——拿命来！”'),
      N('一声暴喝震得桅帆乱颤！大头领「混河铁桨」郑屠自高舱飞扑而下，手中一杆沉重无比的江淮翻江分水大枪直贯甲板，木屑纷飞间枪影化作狂澜直取你面门！'),
    ],
    choices: [
      {
        id: 'hsq07_13_next',
        label: '借桅杆反弹腾空，催动“回风扑雁”绝杀一式！',
        tone: 'danger',
        effects: [openScene('scene_hsq07_14', HUASHAN_Q07_QUEST_ID)],
      },
    ],
  },

  scene_hsq07_14: {
    id: 'scene_hsq07_14',
    title: '第十四幕 · 剑不沾衣',
    subtitle: '蒙冲主船 · 回风扑雁',
    illustrationUrl: '/assets/quests/hs_q07_bloodless_blade.jpg',
    illustrationCaption: '剑不沾衣 · 回风扑雁一剑双雕斩水寨头领，封不弃槐下抚掌',
    mandatory: true,
    beats: [
      N('半空之中无处借力，郑屠以为你必被分水大枪挑个对穿！孰料你长剑猛拍枪杆中段，整个人如寒雁折翼般诡异地斜飘三尺，擦着枪尖寒芒倒扑而下！'),
      P('“看剑——回风扑雁！”'),
    ],
    choices: [
      {
        id: 'hsq07_14_fight',
        label: '凌空连环三刺，滴血不沾决战连环寨主郑屠！',
        subLabel: '生死决战 · 混河铁桨郑屠（二流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPirateChiefNpc() },
            rule: 'duel',
            forbidEscapeReason: '半柱香将尽，不斩水寨首恶誓不收剑！',
            deathTitle: '血染黄河蒙冲',
            deathDetail: '你在九曲连环寨主船与大头领郑屠死斗失利，力竭坠入黄河惊涛。',
            onWin: [openScene('scene_hsq07_15', HUASHAN_Q07_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq07_15: {
    id: 'scene_hsq07_15',
    title: '第十五幕 · 滴血未染',
    subtitle: '蒙冲主船 · 一剑定澜',
    mandatory: true,
    beats: [
      N('唰、唰、唰！三道清冽剑光在夜雾中一闪即敛！郑屠连同一名企图放冷箭的心腹头目同时眉心中剑，带着满脸难以置信的惊骇仰面栽入河心。'),
      N('你飘然落回干燥的船首木栏之上，低头一拂青衫衣袖——莫说水匪污血，就连黄河浊浪的泥点也未曾溅上半星！残余水匪见状尽数跪地弃械。'),
    ],
    choices: [
      {
        id: 'hsq07_15_return',
        label: '命降卒调转蒙冲大船，护送获救商客驶回风陵渡口',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q07_QUEST_ID, 'locust_report'),
          toast('九曲连环寨已破！请前往【潼关天险瓮城 > 潼关镇河主城楼与瓮城】老槐树下复命！', 'success', '剑不沾衣'),
        ],
      },
    ],
  },

  scene_hsq07_16: {
    id: 'scene_hsq07_16',
    title: '第十六幕 · 商船谢恩',
    subtitle: '风陵古渡岸边 · 行商叩谢',
    mandatory: true,
    beats: [
      N('蒙冲大船稳稳靠上风陵渡石栈。获救的晋陕商客们捧出追回的账匣与一袋酬谢纹银，朝着你连连作揖叩谢。'),
      S(SPEAKER_MERCHANT_ELDER, '“老朽走船三十年，从未见过如此神仙般的快剑！华山派大恩大德，我晋陕商帮定在河东与关中各州广为传颂！”'),
      P('“诸位老丈快快请起，除暴安良本是我西岳弟子分内之事。”'),
    ],
    choices: [
      {
        id: 'hsq07_16_next',
        label: '辞别商队，大步走向老槐树下的封不弃',
        tone: 'gold',
        effects: [openScene('scene_hsq07_17', HUASHAN_Q07_QUEST_ID)],
      },
    ],
  },

  scene_hsq07_17: {
    id: 'scene_hsq07_17',
    title: '第十七幕 · 槐下抚掌',
    subtitle: '风陵渡老槐树下 · 残香未烬',
    mandatory: true,
    beats: [
      N('老槐树皮缝里那半截线香，此刻还剩最后两分红星未灭！封不弃绕着你走了一圈，仔仔细细扫过你一尘不染的衣袂与袖口，紧绷的嘴角骤然扬起，抚掌纵声大笑！'),
      S('NPC-0167', '“哈哈哈哈！好！好一招回风扑雁，好一个剑不沾衣！半柱香未尽连拔三道水哨，东峰那群练气练傻了的木头桩子，谁能办得到？！”'),
      P('“全赖封师叔临河指点孤雁斜掠之妙，弟子方能在摇晃船舷上借势出剑。”'),
    ],
    choices: [
      {
        id: 'hsq07_17_next',
        label: '双手呈上缴获的水寨匪册，聆听师叔教诲',
        tone: 'gold',
        effects: [openScene('scene_hsq07_18', HUASHAN_Q07_QUEST_ID)],
      },
    ],
  },

  scene_hsq07_18: {
    id: 'scene_hsq07_18',
    title: '第十八幕 · 渡口晨风',
    subtitle: '黄河风陵渡 · 剑意初昂',
    mandatory: true,
    beats: [
      S('NPC-0167', '“行商谢你的银子便收着买酒喝！不过你给我听好了——快剑易学，难在收发无迹。等你把《落雁剑法》练到收放自如，我便带你上绝顶博台去见秦烈山秦师兄！”'),
      S('NPC-0167', '“秦师兄号称‘潼关剑神’，连掌门岳沧溟都要敬他三分。想入华山真传之列，先过了他那双眼睛再说！”'),
      N('东方既白，黄河晨风吹动你的衣袂猎猎作响，《落雁剑法》的轻灵杀机已在血战中融会贯通。'),
    ],
    choices: [
      {
        id: 'hsq07_18_finish',
        label: '拜谢封师叔栽培，潜心精研《落雁剑法》准备登顶受考',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-128', amount: 260 },
          { type: 'giveSilver', amount: 95, reason: '风陵渡剿灭九曲连环寨及晋陕行商谢银' },
          { type: 'addSectContribution', amount: 70 },
          { type: 'giveCombatExp', amount: 135, reason: '三更孤舟连破三哨斩杀水寨双魁' },
          { type: 'modifyChivalry', delta: 12, reason: '解救风陵渡被劫晋陕商船' },
          { type: 'modifyRenown', delta: 20, reason: '黄河风陵渡回风扑雁剑不沾衣名动晋陕' },
          { type: 'completeQuest', questId: HUASHAN_Q07_QUEST_ID, outcome: 'completed' },
          toast('已完成《风陵夜渡 · 平沙落雁》！《落雁剑法》精进，获纹银 95 两、门派贡献 70 点！', 'success', '平沙落雁'),
        ],
      },
    ],
  },
}
