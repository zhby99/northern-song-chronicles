import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q18_QUEST_ID } from './huashanJianDuguNineQuest'

const SPEAKER_DUAN_YANQING: StorySpeakerSpec = {
  kind: 'custom',
  name: '段延庆',
  title: '恶贯满盈 · 四大恶人之首',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
}

const SPEAKER_XIXIA_SWORDMASTER: StorySpeakerSpec = {
  kind: 'custom',
  name: '嵬名孤鸿',
  title: '西夏一品堂首席客卿剑客',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
}

const SPEAKER_XIXIA_CROSSBOW_CAPTAIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '一品堂神弩统制',
  title: '西夏征东劲弩营统领',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
}

function buildXixiaSupremeSwordsmanNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ18_XIXIA_SWORDMASTER',
    name: '嵬名孤鸿',
    title: '西夏一品堂 · 绝顶潜锋剑客',
    realm: '一流上品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 4,
    sectRankLabel: '一品堂客卿',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“华山剑宗的快剑？在夏国冷锻神锋面前，不过萤火之光！”',
    stats: { hp: 3980, mp: 3360, agi: 77, res: 65 },
    talents: { bone: 72, comprehension: 78, charm: 56 },
    equipped: {
      weapon: 'WPN-012',
      armor: 'ARM-012',
    },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-246',
      move1: 'MA-068',
      move2: 'MA-128',
      move3: 'MA-133',
    },
    learnedArts: [
      { artId: 'MA-245', level: 8 },
      { artId: 'MA-246', level: 8 },
      { artId: 'MA-068', level: 8 },
      { artId: 'MA-128', level: 8 },
      { artId: 'MA-133', level: 8 },
    ],
  })
}

function buildQ18DuanYanqingNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ18_DUAN_YANQING',
    name: '段延庆',
    title: '恶贯满盈 · 四大恶人之首',
    realm: '宗师中品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 4,
    sectRankLabel: '一品堂供奉',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“（腹语）凭你一柄薄剑，也想破老夫纯阳一阳指劲？找死！”',
    stats: { hp: 5250, mp: 4650, agi: 81, res: 75 },
    talents: { bone: 84, comprehension: 86, charm: 25 },
    equipped: {
      weapon: 'WPN-020',
      armor: 'ARM-012',
    },
    equippedArts: {
      neigong: 'MA-220',
      qinggong: 'MA-246',
      move1: 'MA-023',
      move2: 'MA-133',
    },
    learnedArts: [
      { artId: 'MA-220', level: 9 },
      { artId: 'MA-246', level: 8 },
      { artId: 'MA-023', level: 9 },
      { artId: 'MA-133', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq18_01: {
    id: 'scene_hsq18_01',
    title: '第一幕 · 西岳秋夜惊寒鸦',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，子夜寒露浸透了东峰迎曦石坪。闷雷在秦岭太华万仞黑云间滚涌，山风裹挟着一股极不寻常的血腥与硝烟气味扑面而来。'),
      N('你独立崖畔按剑凝听，{ifFlag:hs_q18_cave_usurp|体内苦修多日的诡剑锋芒隐隐躁动|澄澈剑心忽生警兆}——山下千尺幢与百尺峡方向，数道凄厉哨箭骤然划破夜幕！'),
      P('“不对！寻常关中匪寇绝无胆量在秋雨雷夜强闯华山三险……来者必是西夏一品堂！”'),
    ],
    onFinishEffects: [
      {
        type: 'branch',
        condition: flag('hs_cave', 'eq', 'usurp'),
        thenEffects: [{ type: 'setFlag', flag: 'hs_q18_cave_usurp', value: true }],
        elseEffects: [{ type: 'setFlag', flag: 'hs_q18_cave_usurp', value: false }],
      },
      openScene('scene_hsq18_02', HUASHAN_Q18_QUEST_ID),
    ],
  },

  scene_hsq18_02: {
    id: 'scene_hsq18_02',
    title: '第二幕 · 四恶联军寇仙峰',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('话音未落，封不弃提着染血长剑自苍龙岭方向疾掠而至，灰袍已被劲弩擦破两道裂口。'),
      S('NPC-0167', '“不好了！西夏一品堂倾巢出动，领头的更是名震凶榜的‘四大恶人’——段延庆、叶二娘、岳老三、云中鹤！他们用钩索毒弩连拔外门三道剑哨，已朝玉女峰正面压上来了！”'),
      S('NPC-0147', '（提剑自观门大步踏出，沉声喝道）“掌门师兄正在紫霞主殿集结两脉弟子布防！狂风师弟，随我守住山门石阶！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_03', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_03: {
    id: 'scene_hsq18_03',
    title: '第三幕 · 暗影奇兵掠后崖',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('岳沧溟与宁清羽亦率众赶至前坪调度，正山火把如赤蛇蜿蜒逼近。然而就在众目尽皆聚焦苍龙岭火光之时，你耳廓微动，捕捉到西侧万丈绝壁下传来一声极轻的铁爪扣岩轻响！'),
      N('借着天际一道惨白电光瞥去，只见一道黑衣孤影快逾鬼魅，竟不走前山石阶，孤身沿着猿猱难度的后崖峭壁斜插而上，直指思过崖与玉女峰后背咽喉！'),
      P('“封师叔、秦师伯且慢！正面虽喧嚣，后崖绝壁却有一名剑气极凌厉的西夏绝顶高手暗度陈仓，企图绕过思过崖背刺紫霞观！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_04', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_04: {
    id: 'scene_hsq18_04',
    title: '第四幕 · 执剑独领追凶令',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      S('NPC-0118', '（脸色微变）“声东击西！一旦教此人从后山突入内院纵火放毒，前殿剑阵必腹背受敌、顷刻溃乱！”'),
      S('NPC-0166', '“可四大恶人已至半山，掌门师兄与秦师兄、封师弟俱不可轻离正面阵脚……后崖绝壁凶险万分，谁能独挡那绝顶刺客？”'),
      S('NPC-0167', '（目光灼灼望向你）“如今我剑宗一脉，论轻身涉险与出剑之快，唯有你这位新晋执剑长老可堪一战！你敢不敢独赴思过绝壁，斩断西夏这柄暗剑？”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_05', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_05: {
    id: 'scene_hsq18_05',
    title: '第五幕 · 寒锋出鞘赴思过',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      P('“弟子领命！正面强敌劳烦掌门与三位师叔师伯暂且抵挡，后崖那名西夏剑客——定教他有来无回！”'),
      N('你手按剑柄纵身跃出东峰石坪，衣袂在雷雨前夕的凛冽狂风中猎猎作响，循着岩石上残存的冰冷剑痕直追思过崖古山洞！'),
    ],
    choices: [
      {
        id: 'hsq18_ch_start_pursuit',
        label: '施展绝顶轻功，星夜追入【思过崖古山洞 · 秘洞古剑刻石室】',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q18_QUEST_ID, stepId: 'pursue_siguoya' },
          toast('西夏夜袭惊变！速往【思过崖古山洞 · 秘洞古剑刻石室】截杀潜锋剑客！', 'warn', '绝壁追凶'),
        ],
      },
    ],
  },

  scene_hsq18_06: {
    id: 'scene_hsq18_06',
    title: '第六幕 · 绝壁追凶入古洞',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    illustrationUrl: '/assets/quests/hs_q18_cliff_pursuit.jpg',
    illustrationCaption: '绝壁追凶 · 西岳浴血之夜追击西夏绝顶剑客再入思过崖古剑刻石室',
    mandatory: true,
    beats: [
      N('寒风如刀刮过思过崖外坪，两名守崖外门弟子已被一剑封住哑穴倒在洞口。你一剑挑飞那人射向背后的三枚透骨丧门钉，紧咬不舍，逼得那道黑影不得不退入三十年前气剑两脉前辈遗骨横陈的秘洞古剑刻石室！'),
      S(SPEAKER_XIXIA_SWORDMASTER, '（缓缓转过身来，手中夏国冷锻长剑在幽暗火折下泛着森蓝寒芒）“好俊的身法！原以为华山派早被气宗那帮腐儒练成了乌龟壳，想不到剑宗里还藏着你这号快剑人物。”'),
      P('“西夏一品堂首席剑客‘朔漠孤鸿’嵬名孤鸿？不在兴庆府享你的荣华富贵，今夜闯我太华禁地，便是自寻死路！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_07', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_07: {
    id: 'scene_hsq18_07',
    title: '第七幕 · 番邦冷锋狂言妄',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      S(SPEAKER_XIXIA_SWORDMASTER, '“哈哈哈！死路？今夜恶贯满盈段先生亲自压阵，四大恶人齐聚玉女峰！等段先生的一阳指铁杖戳穿岳沧溟的紫霞道袍，你们华山派三百年的招牌就该改姓大夏了！”'),
      N('嵬名孤鸿目光扫过石室四壁当年天圣年间气剑两脉前辈死斗留下的斑驳剑刻，嘴角勾起一抹讥诮狞笑。'),
      S(SPEAKER_XIXIA_SWORDMASTER, '“这破山洞倒是个埋骨的风水宝地——正好送你和地上这堆枯骨作伴！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_08', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_08: {
    id: 'scene_hsq18_08',
    title: '第八幕 · 窄洞争锋拼生死',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      P('“{ifFlag:hs_q18_cave_usurp|我曾在此洞参尽诡道杀剑，正缺一试锋芒的祭剑亡魂|先辈止戈之地，岂容尔等番邦鹰犬玷污半寸}！拔剑受死！”'),
      N('石室狭窄幽深，嵬名孤鸿的夏国冷锻神剑糅合大漠狂沙诡势与中土快剑，剑风一起便封死洞口退路，分明是一场不死不休的窄巷血战！'),
    ],
    onFinishEffects: [openScene('scene_hsq18_09', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_09: {
    id: 'scene_hsq18_09',
    title: '第九幕 · 死斗朔漠孤鸿剑',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      S(SPEAKER_XIXIA_SWORDMASTER, '“看剑——朔漠孤烟断魂刺！”'),
      N('寒光暴涨三尺，冷锻长剑挟着刺耳尖啸直取你咽喉要害！'),
    ],
    choices: [
      {
        id: 'hsq18_ch_duel_weiming',
        label: '拔剑迎敌，于秘洞之内生死阵斩嵬名孤鸿！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q18_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXixiaSupremeSwordsmanNpc() },
            rule: 'duel',
            forbidEscapeReason: '一旦退让半步，西夏刺客便将突袭玉女峰后山！',
            introText: '【秘洞死战】迎击西夏一品堂首席客卿剑客嵬名孤鸿（一流上品），寸步不退将其斩杀！',
            onWin: [
              { type: 'giveCombatExp', amount: 120, reason: '思过崖秘洞阵斩西夏绝顶剑客嵬名孤鸿' },
              openScene('scene_hsq18_10', HUASHAN_Q18_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq18_10: {
    id: 'scene_hsq18_10',
    title: '第十幕 · 剑气纵横贯石壁',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      N('酣斗至三十余合，嵬名孤鸿久攻不下，孤注一掷将毕生西夏秘藏玄功尽数灌入夏国冷锻剑；你亦长啸催剑，剑宗极速快剑化作一道匹练寒虹正面相撞！'),
      N('“锵——咔嚓！！”夏国冷锻神剑应声寸断，凌厉剑锋掠过嵬名孤鸿咽喉，将其尸身震飞数丈。而两柄长剑崩裂激荡出的狂暴剑气余波，竟如怒雷般狠狠轰在石室最深处那堵苔痕斑驳的绝壁之上！'),
      P('“嗯？这石壁后面的回音……竟然是空的？！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_11', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_11: {
    id: 'scene_hsq18_11',
    title: '第十一幕 · 暗壁轰塌现古窟',
    subtitle: '思过崖古山洞 · 百年隐居石窟入口',
    illustrationUrl: '/assets/quests/hs_q18_hidden_grotto.jpg',
    illustrationCaption: '剑气破壁 · 轰碎石室最深处风化暗壁，惊现百年剑魔隐居石窟',
    mandatory: true,
    beats: [
      N('轰隆巨响声中，历经百余年山风侵蚀的风化薄壁轰然坍塌！烟尘散尽，石室后方赫然露出一座连通万丈断崖风口、前人从未踏足过的天然隐秘石窟！'),
      N('窟内并无气剑死斗的骸骨，唯有石床上一领早已腐朽成灰的蒲团、一方雕琢粗糙的石桌，以及斜插在石缝间的一柄锈迹斑斑、连剑尖都已磨平的无锋古铁剑。'),
      N('一股苍凉、孤高、睥睨千古的浩瀚剑意，虽隔百载岁月，仍在你踏近洞口的刹那令你手中佩剑自行铮铮轻鸣！'),
    ],
    onFinishEffects: [
      setStep(HUASHAN_Q18_QUEST_ID, 'dugu_enlighten'),
      openScene('scene_hsq18_12', HUASHAN_Q18_QUEST_ID),
    ],
  },

  scene_hsq18_12: {
    id: 'scene_hsq18_12',
    title: '第十二幕 · 举火照见千秋痕',
    subtitle: '思过崖古山洞 · 剑魔隐居石窟',
    mandatory: true,
    beats: [
      N('你拾起地上火折步入内窟。洞外雷云压山，电光自悬崖裂隙间一闪而入，将整面光滑如镜的青苍玄岩照得纤毫毕现。'),
      N('只见玄岩之上并非斧凿刀刻，而是有人仅凭一柄凡铁长剑，随手挥洒刻下了数百行苍劲嶙峋、锋芒欲裂石而出的古篆与行草铭文！'),
      P('“以剑代笔，入石三分而不见半分内力焦灼之气……留刻前辈的剑道修为，究竟到了何等骇人听闻的境界？！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_13', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_13: {
    id: 'scene_hsq18_13',
    title: '第十三幕 · 求败遗刻傲苍穹',
    subtitle: '思过崖古山洞 · 剑魔隐居石窟',
    illustrationUrl: '/assets/quests/hs_q18_dugu_inscription.jpg',
    illustrationCaption: '求败遗刻 · 仰观“败尽英雄天下更无抗手”孤傲铭文与九剑总纲',
    mandatory: true,
    beats: [
      N('你屏息举火仰观，只见右侧石壁首行赫然刻着四句震烁古今的自述——'),
      N('“纵横江湖三十余载，杀尽仇寇，败尽英雄，天下更无抗手，无可奈何，惟隐居深谷，以雕为友。呜呼，生平求一敌手而不可得，诚寂寥难堪也！——剑魔独孤求败绝笔。”', {
        label: '石壁剑刻',
      }),
      P('“纵横江湖三十余载，败尽英雄，生平求一敌手而不可得……！原来百余年前曾隐居我太华绝壁之巅的，竟是传说中的‘剑魔’独孤求败前辈！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_14', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_14: {
    id: 'scene_hsq18_14',
    title: '第十四幕 · 四剑生平映道心',
    subtitle: '思过崖古山洞 · 剑魔隐居石窟',
    mandatory: true,
    beats: [
      N('目光下移，石台之畔另有四道浅坑与小字注解：弱冠前持凌厉青锋与河朔群雄争锋；三十岁前用紫薇软剑误伤义士乃弃深谷；四十岁前持玄铁重剑“重剑无锋，大巧不工”横行天下；四十岁后不滞于物，草木竹石均可为剑，渐进于无剑胜有剑之境！'),
      P('“{ifFlag:hs_q18_cave_usurp|我昔日私拓破岳诡剑，一味贪求招式奇险狠辣，在独孤前辈‘不滞于物’四字面前，何异于井蛙窥天！唯以无招统御奇正，方是剑宗至高极境|前辈自利剑而软剑、重剑，终归无剑胜有剑，恰与我昔日削壁止戈、不囿招式门户之念暗合天道}！”'),
      N('再看正北整面巨壁，洋洋洒洒刻满九篇剑诀图谱，顶上四个铁画银钩的大字直贯双眸——《独孤九剑》！'),
    ],
    onFinishEffects: [openScene('scene_hsq18_15', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_15: {
    id: 'scene_hsq18_15',
    title: '第十五幕 · 总决无妄化大有',
    subtitle: '思过崖古山洞 · 剑魔隐居石窟',
    mandatory: true,
    beats: [
      N('你凝神研读第一篇「总决式」：“归妹趋无妄，无妄趋同人，同人趋大有。甲转丙，丙转庚，庚转癸。子丑之交，辰巳之交，午未之交。风雷是一变，山泽是一变，水火是一变……”'),
      N('三百六十种变化口诀如江河奔涌，核心真谛却只有八个字——“有进无退，料敌机先”！世间一切武学招式皆有起承转合，凡有变化处必露破绽；《独孤九剑》绝无一招守势，招招皆直刺敌人不得不救之命门！'),
      P('“原来如此！不记死招，只观破绽；敌未动而吾剑已指其变招之枢，纵使对方变招百次，总决式亦随之流转百次！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_16', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_16: {
    id: 'scene_hsq18_16',
    title: '第十六幕 · 破剑破刀断万兵',
    subtitle: '思过崖古山洞 · 剑魔隐居石窟',
    mandatory: true,
    beats: [
      N('紧接着是第二篇「破剑式」与第三篇「破刀式」。「破剑式」详述普天之下刚剑、柔剑、快剑、慢剑、双剑之气势脉络；「破刀式」则尽剖单刀、双刀、柳叶刀、鬼头刀、大斫刀之发力死角，讲究以轻御重、以快打慢。'),
      N('你拔出佩剑随壁演练，方才嵬名孤鸿那路凌厉诡谲的夏国冷锻剑法在脑海中重现——若以「破剑式」迎之，根本无需拼斗三十余合，第一剑斜削其手腕外关穴便可断其剑势！'),
      P('“好一招破剑式、破刀式！任他千般名门剑法、万里胡骑弯刀，一眼看破招意来路，便如庖丁解牛！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_17', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_17: {
    id: 'scene_hsq18_17',
    title: '第十七幕 · 破枪破鞭裂长索',
    subtitle: '思过崖古山洞 · 剑魔隐居石窟',
    mandatory: true,
    beats: [
      N('你步履不停，移目第四篇「破枪式」、第五篇「破鞭式」与第六篇「破索式」。'),
      N('「破枪式」统破长枪、大戟、蛇矛、齐眉棍、狼牙棒、禅杖等一切长兵；「破鞭式」专克钢鞭、铁锏、点穴橛、拐子、峨眉刺、匕首、铁牌等短兵；「破索式」则破解长索、软鞭、三节棍、链子枪、铁链、流星锤等软兵奇门！'),
      P('“四大恶人之中，南海鳄神岳老三使鳄嘴剪与鳄尾鞭，穷凶极恶云中鹤使鹤爪钢杖，恶贯满盈段延庆使双拐铁杖——这破枪、破鞭、破索三式，简直是为克制他们量身而设！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_18', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_18: {
    id: 'scene_hsq18_18',
    title: '第十八幕 · 破掌破箭扫流星',
    subtitle: '思过崖古山洞 · 剑魔隐居石窟',
    mandatory: true,
    beats: [
      N('再看第七篇「破掌式」与第八篇「破箭式」。「破掌式」破尽拳脚指掌、擒拿爪功、鹰爪虎爪、铁沙神掌，敌手敢以肉掌搏剑，长剑便削其筋脉骨节；「破箭式」则先学听风辨器，进而以一柄长剑击打千百件暗器强弩，借力反震，尽数奉还！'),
      N('洞外狂风卷着碎石砂砾自断崖裂口呼啸灌入，你信手挽动剑花试演「破箭式」，但听“叮叮叮”一连串密如骤雨的脆响，数十粒飞砂碎石竟被剑尖不差分毫地反挑击入对面岩壁！'),
      P('“西夏一品堂最依仗的便是密集军阵毒弩——有了这记破箭式，任他百张强弩齐发，亦休想伤我华山同门分毫！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_19', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_19: {
    id: 'scene_hsq18_19',
    title: '第十九幕 · 破气玄微探神髓',
    subtitle: '思过崖古山洞 · 剑魔隐居石窟',
    mandatory: true,
    beats: [
      N('最终，你的目光落在最高处最为简奥、甚至连剑招图影都已隐去大半的第九篇——「破气式」！'),
      N('“此式专为对付身具上乘内功之强敌而用。神而明之，存乎一心。凡内家宗师运劲发招，周天经脉必有一瞬旧力方吐、新气未生之关窍转换；无招之剑不击其气盾锋芒，直刺其丹田经络流转之滞点，则万钧内力自溃！”', {
        label: '破气式精义',
      }),
      P('“直刺真气运转转换之滞点，令万钧内力自溃……！华山气宗常言‘气为主、剑为辅’，殊不知剑道臻至绝巅，一剑便可破尽天下上乘罡气！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_20', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_20: {
    id: 'scene_hsq18_20',
    title: '第二十幕 · 风雷惊夜悟九剑',
    subtitle: '思过崖古山洞 · 剑魔隐居石窟',
    illustrationUrl: '/assets/quests/hs_q18_thunder_enlighten.jpg',
    illustrationCaption: '风雷悟剑 · 绝壁惊雷夜剑心通明，一朝顿悟天阶绝学独孤九剑',
    mandatory: true,
    beats: [
      N('“轰隆——！！”九天之上一道紫电惊雷劈落西岳绝壁，震得整座思过崖嗡嗡颤鸣！狂风携暴雨撞入石窟，吹灭了地上的火折，唯余你双眸亮若寒星。'),
      N('黑暗与雷光交错之间，总决、破剑、破刀、破枪、破鞭、破索、破掌、破箭、破气九式如九条苍龙在你识海中首尾相衔、轰然贯通！手中长剑随心而动，无招无式，却已浑然天成！'),
      P('“无招胜有招，唯快不破，料敌机先——今日方知真剑道！”'),
    ],
    choices: [
      {
        id: 'hsq18_ch_enlighten_dugu',
        label: '于绝壁风雷中剑心通明，彻悟天阶上品绝学《独孤九剑》！',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-007', level: 1, autoEquip: true },
          { type: 'addArtExp', artId: 'MA-007', amount: 450 },
          { type: 'modifySkill', key: '书', delta: 1 },
          toast('剑心通明！习得天阶上品剑法《独孤九剑》并获大宗师剑刻感悟！', 'success', '独孤九剑'),
          openScene('scene_hsq18_21', HUASHAN_Q18_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq18_21: {
    id: 'scene_hsq18_21',
    title: '第二十一幕 · 三揖剑魔谢隔世',
    subtitle: '思过崖古山洞 · 剑魔隐居石窟',
    mandatory: true,
    beats: [
      N('雷声渐歇，你收剑入鞘，朝着石台上那柄锈蚀无锋的弃剑与“剑魔独孤求败”六字遗刻，恭恭敬敬地深深三揖。'),
      P('“独孤前辈寂寥百载，晚辈幸蒙隔世传剑之恩，定不负《独孤九剑》威名，必叫这九式神剑重震寰宇！”'),
      N('正起身间，洞外夜风骤然送来玉女峰方向震耳欲聋的牛角号声与金铁交鸣，火光将半边雨云映得通红！'),
    ],
    onFinishEffects: [openScene('scene_hsq18_22', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_22: {
    id: 'scene_hsq18_22',
    title: '第二十二幕 · 玉女峰急警钟鸣',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('你一步掠出思过崖洞口，遥见玉女峰紫霞道观外围防线已被攻破，黑压压的西夏一品堂武士与四大恶人已将紫霞正气主殿团团围困，紧急护山钟声一声紧似一声！'),
      P('“四大恶人已攻至紫霞主殿！正好拿西夏群凶与段延庆，祭我初成的《独孤九剑》！”'),
    ],
    choices: [
      {
        id: 'hsq18_ch_rush_zixia',
        label: '踏崖借风，火速飞掠驰援【玉女峰紫霞道观 · 紫霞正气主殿】',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q18_QUEST_ID, 'rescue_zixia'),
          { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_zixia', spotId: 'tg_zx_hall' },
          toast('已掠返玉女峰！请在【紫霞正气主殿】迎击四大恶人！', 'warn', '驰援紫霞'),
          openScene('scene_hsq18_23', HUASHAN_Q18_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq18_23: {
    id: 'scene_hsq18_23',
    title: '第二十三幕 · 紫霞浴血陷重围',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('紫霞正气主殿丹墀前已是血染青砖。岳沧溟周身紫气翻涌，独力硬撼四大恶人之首段延庆的一阳指铁杖；秦烈山、宁清羽、封不弃三人背靠殿柱，带着数十名负伤弟子苦苦抵御叶二娘、岳老三与云中鹤的狂攻！'),
      S('NPC-0233', '（手腕轻抖，薄如蝉翼的柳叶刀贴着一名年轻弟子咽喉掠过，发出凄厉怪笑）“咯咯咯，华山派的俊俏小道士，二娘最喜欢瞧你们流血的模样了！”'),
      S('NPC-0182', '（身形如鬼鹤盘旋半空，一对鹤爪钢杖疾取宁清羽肩头）“这位玉女剑仙风韵犹存，待鹤爷擒回兴庆府快活快活！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_24', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_24: {
    id: 'scene_hsq18_24',
    title: '第二十四幕 · 百张毒弩指群侠',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0166', '“无耻淫贼，滚开！”'),
      N('宁清羽一剑逼退云中鹤，左臂却被叶二娘暗算划开一道血口；与此同时，段延庆双拐猛震，浑厚纯阳指力逼得旧伤复发的岳沧溟闷哼倒退两步。外围百名西夏一品堂神弩手趁势齐刷刷单膝跪地，上百支淬满碧绿蛇毒的精钢弩箭同时对准了华山诸老！'),
      S(SPEAKER_XIXIA_CROSSBOW_CAPTAIN, '“一品堂神弩营听令——攒射！一个活口不留！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_25', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_25: {
    id: 'scene_hsq18_25',
    title: '第二十五幕 · 天外飞仙破箭雨',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    illustrationUrl: '/assets/quests/hs_q18_pojian_volley.jpg',
    illustrationCaption: '天外飞仙 · 一剑掠至紫霞观前，破箭式瞬间尽扫西夏漫天强弩',
    mandatory: true,
    beats: [
      N('机括扣动，百支毒弩化作遮天蔽日的夺命黑雨扑向丹墀！封不弃与秦烈山目眦欲裂，纵欲横剑代挡亦已不及——就在这千钧一发之际，一道清越剑吟自夜雨云霄中破空坠落！'),
      P('“独孤九剑——破箭式！”'),
      N('你的身影如天外飞仙横掠至主殿阶前，长剑在身前幻化出一团肉眼难辨的银白光轮！但听“叮叮当当”一连串急骤如珠落玉盘的爆响，漫天毒弩竟无一漏网被剑尖尽数拨转方向，倒飞射回西夏军阵，前排二十余名神弩手惨叫着仰面栽倒！'),
    ],
    onFinishEffects: [openScene('scene_hsq18_26', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_26: {
    id: 'scene_hsq18_26',
    title: '第二十六幕 · 满场骇然惊鬼神',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('雨夜丹墀瞬间死寂！不论是浴血奋战的华山群侠，还是凶焰滔天的四大恶人，尽皆瞠目结舌地望着持剑独立阶前的你。'),
      S('NPC-0167', '（失声狂喜）“好俊的快剑！！一剑拨反百支劲弩，这是什么神仙剑法？！”'),
      S('NPC-0118', '（抚胸稳住翻腾气血，眼中满是震撼）“全无华山旧谱痕迹，亦无定式防守，却将百弩来势算至毫巅……此剑已臻通玄之境！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_27', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_27: {
    id: 'scene_hsq18_27',
    title: '第二十七幕 · 鳄神咆哮舞凶剪',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0183', '（把大脑袋摇得拨浪鼓一般，暴跳如雷）“装神弄鬼！管你什么破箭式，你岳老爷爷乃是四大恶人排行第二……不对，排行第三的南海鳄神！看老子用鳄嘴剪喀嚓剪断你的脑袋和细剑！”'),
      N('岳老三一声狂吼，右手碗口粗的精钢鳄嘴剪恶狠狠朝你腰间剪落，左手锯齿鳄尾鞭同时如毒蟒横抽你天灵盖！'),
      P('“左手软鞭，右手奇门短剪？正好一试‘破索式’与‘破鞭式’！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_28', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_28: {
    id: 'scene_hsq18_28',
    title: '第二十八幕 · 破鞭破索挫凶鳄',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0183', '“吃你岳老爷爷一剪！！”'),
      N('奇门凶兵挟着腥风当头罩下，你不退反进，长剑斜指岳老三双腕发力变招之死穴！'),
    ],
    choices: [
      {
        id: 'hsq18_ch_fight_yuelaosan',
        label: '运使《独孤九剑》，正面挫败凶神恶煞岳老三！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q18_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0183',
              talkOverride: '“哇呀呀！你怎么知道老子鳄嘴剪要往左边剪？！”',
            },
            rule: 'story_trial',
            lethalOnLose: false,
            introText: '【初试九剑】以《独孤九剑》破鞭式、破索式迎战南海鳄神岳老三（一流中品）！',
            onWin: [
              { type: 'giveCombatExp', amount: 110, reason: '紫霞主殿以独孤九剑挫败南海鳄神岳老三' },
              openScene('scene_hsq18_29', HUASHAN_Q18_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('初演九剑尚差一分火候，凝神重观破绽再战！', 'warn', '剑心重凝'),
              openScene('scene_hsq18_28', HUASHAN_Q18_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq18_29: {
    id: 'scene_hsq18_29',
    title: '第二十九幕 · 三剑夺剪寒群魔',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('第一剑「破索式」缠腕一绞，岳老三只觉左臂酸麻，鳄尾鞭脱手飞出；第二剑「破鞭式」顺着鳄嘴剪开合轴心斜挑而入；第三剑剑脊一拍，“哐当”巨响中，岳老三视若性命的精钢鳄嘴剪竟被挑飞钉在殿梁之上！'),
      S('NPC-0183', '（捂着鲜血淋漓的虎口连退七八步，吓得脸色发白）“见鬼了！老子招还没使老，他的剑尖怎么已经等在老子手腕上了？！”'),
      N('云中鹤与叶二娘见势不妙刚想左右夹击，你手腕微翻，两道森寒剑芒未发先至，封死云中鹤鹤爪起跳落点与叶二娘换刀腋下空门，惊得二人齐齐倒跃丈外，冷汗涔涔不敢妄动！'),
    ],
    onFinishEffects: [openScene('scene_hsq18_30', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_30: {
    id: 'scene_hsq18_30',
    title: '第三十幕 · 恶贯满盈铁杖横',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('“笃、笃、笃……”沉闷如丧钟的铁拐敲击青砖声响起。双腿残废、青袍覆面的「恶贯满盈」段延庆缓缓分开众人，胸腹起伏而唇齿不动，阴冷腹语响彻雨夜。'),
      S(SPEAKER_DUAN_YANQING, '“（腹语）嵬名孤鸿迟迟未至，看来已死在你这小辈剑下。能看破外家兵刃招式，确实有些门道；可惜在老夫的大理一阳指与二十年纯阳内力面前，任何快剑只要碰上铁杖罡气，都得寸寸震断！”'),
      S('NPC-0118', '（急切高呼提醒）“小心！段延庆已臻宗师中品化境，他以铁杖代指施展一阳指，纯阳指力隔空伤人，切莫与他硬拼内力！”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_31', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_31: {
    id: 'scene_hsq18_31',
    title: '第三十一幕 · 无招对决一阳指',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      P('“掌门放心！弟子既不与他拼内力，亦不挡他铁杖锋芒——段延庆，今夜便教你见识《独孤九剑》第九式‘破气式’，看我十招之内破你一阳指！”'),
      S(SPEAKER_DUAN_YANQING, '“（腹语）狂妄无知！接老夫一杖！”'),
      N('段延庆左拐撑地腾空丈许，右首细铁杖尖端凝聚起一点炽烈刺目的赤金纯阳指芒，挟着排山倒海的宗师威压当胸点落！'),
    ],
    choices: [
      {
        id: 'hsq18_ch_duel_duanyanqing',
        label: '催动《独孤九剑·破气式》，十招决战宗师中品段延庆！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q18_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQ18DuanYanqingNpc() },
            rule: 'duel',
            forbidEscapeReason: '紫霞主殿存亡系于此剑，退后一步则满门俱危！',
            introText: '【破气惊神】以天阶《独孤九剑》迎战四大恶人之首段延庆（宗师中品），寻其一阳指气机命门一剑破之！',
            onWin: [
              { type: 'giveCombatExp', amount: 190, reason: '独孤九剑破气式十招刺伤宗师段延庆' },
              openScene('scene_hsq18_32', HUASHAN_Q18_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq18_32: {
    id: 'scene_hsq18_32',
    title: '第三十二幕 · 破气惊神十招决',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    illustrationUrl: '/assets/quests/hs_q18_poqi_duan.jpg',
    illustrationCaption: '破气惊神 · 独孤九剑直指一阳指气机命门，十招刺伤段延庆逼退四恶',
    mandatory: true,
    beats: [
      N('电光石火转瞬九合！段延庆连催九记一阳指杀招，铁杖指风把丹墀白玉石板戳出九个深逾寸许的焦孔，却连你半片衣角都未沾着——你的长剑始终游走在他旧力将尽、新气未生的毫厘空隙之间！'),
      N('第十招骤起！段延庆暴怒之下催动十成纯阳真气贯向杖尖，胸前膻中穴与左胁神封穴交会处忽现刹那凝滞——你双眸精光暴射，人随剑走，长剑贴着炽烈指风边缘斜穿半寸，如灵蛇吐信直刺其气机命门！'),
      N('“嗤——噗！！”护体纯阳罡气竟如裂帛般一触即溃，青锋透入段延庆左肩琵琶骨半寸！段延庆浑身剧震，凝聚在杖尖的一阳指劲顿时反噬逆冲，张口喷出一蓬滚烫鲜血，拄拐踉跄暴退三丈！'),
    ],
    onFinishEffects: [openScene('scene_hsq18_33', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_33: {
    id: 'scene_hsq18_33',
    title: '第三十三幕 · 四恶胆寒遁夜雾',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0233', '（失声惊叫）“老大受伤了？！”'),
      S(SPEAKER_DUAN_YANQING, '“（腹语嘶哑震骇）好可怕的‘破气式’……天下竟真有不凭内力、专破上乘内家气机命门的无招神剑！老二、老三、老四——撤！！”'),
      N('连宗师中品的段延庆都在十招之内见血受创，叶二娘、岳老三、云中鹤哪里还敢恋战，慌忙掷出数枚烟幕毒弹掩护，架起段延庆领着残余一品堂武士连滚带爬逃下千尺幢，转瞬没入苍茫雨夜！'),
    ],
    onFinishEffects: [openScene('scene_hsq18_34', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_34: {
    id: 'scene_hsq18_34',
    title: '第三十四幕 · 剑宗眉扬泣狂风',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('殿前华山两脉弟子劫后余生，爆发出震耳欲聋的欢呼！封不弃大步冲上前来，死死按住你的肩膀，眼眶竟微微泛红。'),
      S('NPC-0167', '“十招！仅仅十招便刺伤恶贯满盈段延庆、逼退四大恶人！自三十年前玉女峰大变以来，我华山剑宗何曾有过今夜这般扬眉吐气的辉煌！！好小子，快告诉师叔，你在思过崖到底得了什么泼天造化？！”'),
      P('“回封师叔、掌门、秦师伯、宁师叔——弟子在秘洞斩杀西夏剑客时震塌后壁，偶入百年前‘剑魔’独孤求败前辈隐居石窟，侥幸参悟了前辈留刻的《独孤九剑》。”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_35', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_35: {
    id: 'scene_hsq18_35',
    title: '第三十五幕 · 太岳诸老叹神技',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0147', '（倒吸一口凉气，慨然抚剑）“剑魔独孤求败……老夫年轻时曾听武林耆宿提及此名，只道是荒诞传说，不想这位绝代剑魔晚年竟隐居我西岳后崖！此乃天佑我华山不绝！”'),
      S('NPC-0166', '（温言颔首）“今夜若非{gender:师侄|师侄女}以破箭式救下同门、又以破气式惊退段延庆，我紫霞道观必遭灭顶之灾。这份护山大功，气剑两脉人人铭记于心。”'),
      S('NPC-0118', '（深深凝视你手中余威犹存的长剑，神色复杂而郑重）“《独孤九剑》破尽天下万法，连一阳指气机亦不能挡……{ifFlag:hs_q18_cave_usurp|只是你剑意之中杀伐霸烈太盛，日后务须谨守门规，切莫教神剑反噬本心|所幸你剑心澄明、仁勇兼备，得此神剑实乃西岳之福}。”'),
    ],
    onFinishEffects: [openScene('scene_hsq18_36', HUASHAN_Q18_QUEST_ID)],
  },

  scene_hsq18_36: {
    id: 'scene_hsq18_36',
    title: '第三十六幕 · 破晓云开砺绝巅',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('东方天际雨收云散，一缕破晓金光刺穿秦川云海，照在紫霞正气主殿檐角与你清亮如水的剑锋之上。'),
      N('经此一夜浴血，西夏一品堂虽暂退风陵荒原，西岳华山的乾坤大局却因《独孤九剑》横空出世而彻底改写——{ifFlag:hs_q18_cave_usurp|封不弃望向掌门宝座的眼神已炽热如火，待你将九剑修至大成之日，便是剑压紫霞、清算三十年旧账之时|待你将九剑磨砺至化境，或许便能以绝世剑锋外靖西夏强虏、内消两脉三十载隔阂}！'),
    ],
    choices: [
      {
        id: 'hsq18_ch_complete',
        label: '收剑入鞘，领受护山重赏并潜心精研《独孤九剑》',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 300, reason: '力退四大恶人护佑华山重赏' },
          { type: 'addSectContribution', amount: 200 },
          { type: 'giveCombatExp', amount: 420, reason: '顿悟独孤九剑并十招击伤段延庆' },
          { type: 'modifyRenown', delta: 70, reason: '独孤九剑初现西岳，十招刺伤恶贯满盈段延庆' },
          { type: 'completeQuest', questId: HUASHAN_Q18_QUEST_ID, outcome: 'dugu_awakened' },
          toast('完结《思过绝壁 · 独孤求败》！将《独孤九剑》修至第五重后即可开启华山掌门终局！', 'success', '九剑惊世'),
        ],
      },
    ],
  },
}
