import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, setStep, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { HUASHAN_Q06_QUEST_ID } from './huashanJianYangwuQuest'

const SPEAKER_RAIDER_VANGUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '胡烈',
  title: '断碑鬼刀 · 关外刀匪前锋头目',
  factionName: '关外流寇',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_RAIDER_BOSS: StorySpeakerSpec = {
  kind: 'custom',
  name: '曹猛',
  title: '血环屠夫 · 关外刀匪大头目',
  factionName: '关外流寇',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildRaiderVanguardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ06_RAIDER_VANGUARD',
    name: '胡烈',
    title: '潼关乱葬岗 · 断碑鬼刀',
    realm: '二流下品',
    factionName: '关外流寇',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“拿华山派四平八稳的臭剑架子来唬爷爷？一刀劈碎你的剑脊！”',
    stats: { hp: 920, mp: 680, agi: 42, res: 27 },
    talents: { bone: 58, comprehension: 38, charm: 24 },
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-157', move1: 'MA-151', move2: 'MA-189' },
    learnedArts: [
      { artId: 'MA-103', level: 3 },
      { artId: 'MA-157', level: 3 },
      { artId: 'MA-151', level: 3 },
      { artId: 'MA-189', level: 4 },
    ],
    equipped: { weapon: 'WPN-065' },
    questBadgeLabel: '刀匪头目',
  })
}

function buildRaiderBossNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ06_RAIDER_BOSS',
    name: '曹猛',
    title: '潼关乱葬岗 · 血环屠夫',
    realm: '二流下品',
    factionName: '关外流寇',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“敢宰我兄弟？看爷爷这口九环恶刀把你连人带剑剁进乱葬坑！”',
    stats: { hp: 1040, mp: 760, agi: 45, res: 30 },
    talents: { bone: 64, comprehension: 42, charm: 22 },
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-157', move1: 'MA-131', move2: 'MA-151' },
    learnedArts: [
      { artId: 'MA-103', level: 4 },
      { artId: 'MA-157', level: 3 },
      { artId: 'MA-131', level: 4 },
      { artId: 'MA-151', level: 4 },
    ],
    equipped: { weapon: 'WPN-052' },
    questBadgeLabel: '悍匪首恶',
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq06_01: {
    id: 'scene_hsq06_01',
    title: '第一幕 · 初入西峰',
    subtitle: '西岳华山 · 西峰剑庐旧址外',
    mandatory: true,
    beats: [
      N('{reignYear}的西岳山风带着彻骨寒意。自博台大比你择定剑宗支脉以来，玉女峰紫霞道观那边的同门见了你，目光总带着几分疏离与审视。'),
      N('这日清晨，宿老「狂风快剑」封不弃并未在宽敞平整的演剑院传艺，而是径直领你穿过悬崖栈道，踏入西峰绝壁下一座半掩于苍松乱石间的旧剑庐。'),
      S('NPC-0167', '“既入了我剑宗门墙，往后便少去东峰听那些摇头晃脑的养气清谈。剑客手里的三尺青锋不是用来供在香案上修身养性的，是用来在生死一线间见血封喉的！”'),
      P('“弟子谨记封师叔教诲！不知今日师叔要传授弟子哪一门剑宗快剑？”'),
    ],
    choices: [
      {
        id: 'hsq06_01_next',
        label: '凝神屏息，静候封师叔赐剑',
        tone: 'gold',
        effects: [openScene('scene_hsq06_02', HUASHAN_Q06_QUEST_ID)],
      },
    ],
  },

  scene_hsq06_02: {
    id: 'scene_hsq06_02',
    title: '第二幕 · 掷剑立诫',
    subtitle: '西峰古剑庐 · 掷谱训诫',
    illustrationUrl: '/assets/quests/hs_q06_jianlu_throw.jpg',
    illustrationCaption: '西峰立诫 · 封不弃于剑庐掷剑冷斥气宗旧架，命赴生死场拆招',
    mandatory: true,
    beats: [
      N('话音未落，封不弃反手一扬，“啪”地将一册泛黄的旧剑谱连同一柄铁剑掷在你脚下青石板上！你低头一看，封皮上赫然写着气宗奉为圭臬的《养吾剑法》四字！'),
      S('NPC-0167', '（嘴角噙着一抹森冷笑意）“意外么？岳沧溟与宁清羽每日教弟子默诵孟子‘吾善养吾浩然之气’，把一套剑法练得四平八稳、步步求全，仿佛只要架子摆得够端正，刀匪胡骑就会自己撞死在剑盾上！”'),
      S('NPC-0167', '“知己知彼方能立宗，先学会气宗这套四平八稳的架子，再在生死场上把它拆成杀招！今日你便在寒潭边把《养吾剑法》的路数记熟，天黑之后，随我下山杀人！”'),
      P('“先学正门守势，再拆为贴身杀招……弟子明白了！”'),
    ],
    choices: [
      {
        id: 'hsq06_02_learn',
        label: '拾起铁剑与剑谱，领受《养吾剑法》赶赴寒潭拆招',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q06_QUEST_ID, stepId: 'jianlu_drill' },
          { type: 'teachMartialArt', artId: 'MA-147', level: 1, autoEquip: true },
          toast('已习得《养吾剑法》！请前往【思过崖古山洞 > 绝壁银瀑涤心寒潭】演剑拆招！', 'success', '西峰授剑'),
        ],
      },
    ],
  },

  scene_hsq06_03: {
    id: 'scene_hsq06_03',
    title: '第三幕 · 浩然旧架',
    subtitle: '思过崖古山洞 · 绝壁银瀑涤心寒潭',
    mandatory: true,
    beats: [
      N('绝壁银瀑轰鸣如雷，寒潭水雾扑面冰凉。你展开《养吾剑法》图谱，依着上面标注的气宗法度一招一式演练起来。'),
      N('“端木横梁”、“正冠守中”、“浩气长存”……整套剑法大开大阖，每一招皆先护住自身心口咽喉，待敌招力尽方才缓步递剑，端的是堂皇严整、滴水不漏。'),
      P('（收剑微蹙眉头）“此剑守御固然严密，可每逢转折必先回剑护身，白白错失了三次欺身抢攻的良机。倘若对手刀大力沉、连环猛劈，久守之下岂非坐以待毙？”'),
    ],
    choices: [
      {
        id: 'hsq06_03_next',
        label: '向潭畔抱剑旁观的封不弃请教破局之法',
        tone: 'primary',
        effects: [openScene('scene_hsq06_04', HUASHAN_Q06_QUEST_ID)],
      },
    ],
  },

  scene_hsq06_04: {
    id: 'scene_hsq06_04',
    title: '第四幕 · 削繁就简',
    subtitle: '绝壁银瀑涤心寒潭 · 剑鞘断枝',
    mandatory: true,
    beats: [
      N('封不弃自潭边巨石上一跃而下，连剑都未出鞘，只用乌木剑鞘顺着你方才“正冠守中”的轨迹斜斜一挑，瞬间在半途折向，“嗤”地刺穿三尺外一片飘落的枯叶！'),
      S('NPC-0167', '“还不算蠢到家！看清楚了——气宗教你横剑格挡来刀，剑宗教你借横剑那半寸斜卸之力，剑尖贴着敌人的刀背直接捅进他咽喉！”'),
      S('NPC-0167', '“删去回护胸腹的多余花架，把三拍守招压成一记寸进疾刺！以快驭正，正架便成了惑敌夺命的幌子！”'),
      N('你依言重演数遍，但觉手腕轻灵数倍，原本凝重迟缓的《养吾剑法》竟透出一股冷冽刺骨的杀机。'),
    ],
    choices: [
      {
        id: 'hsq06_04_next',
        label: '反复揣摩化守为刺之法，静待暮色降临',
        tone: 'default',
        effects: [openScene('scene_hsq06_05', HUASHAN_Q06_QUEST_ID)],
      },
    ],
  },

  scene_hsq06_05: {
    id: 'scene_hsq06_05',
    title: '第五幕 · 关城急报',
    subtitle: '绝壁银瀑涤心寒潭 · 夜发潼关',
    mandatory: true,
    beats: [
      N('暮色四合之际，一名驻守山麓的华山外门眼线疾步奔至潭边禀报：一伙自河西与陕北流窜而来的凶悍刀匪，昨夜血洗了潼关西侧两座货栈，如今正盘踞在城外乱葬岗分赃磨刀！'),
      S('NPC-0167', '（眸中寒芒一闪）“来得正好！这帮塞外舔血的刀客专使劈山重刀，最善破名门正派的四平八稳剑架。”'),
      S('NPC-0167', '“走！随我下山去【潼关天险瓮城】。今夜我不出手，你若拆不开这路《养吾剑法》，便自己留在乱葬岗喂野狗！”'),
    ],
    choices: [
      {
        id: 'hsq06_05_go',
        label: '佩剑随封不弃连夜下山，赶赴潼关天险瓮城',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q06_QUEST_ID, 'tongguan_scout'),
          toast('请前往【潼关天险瓮城 > 潼关镇河主城楼与瓮城】夜探乱葬岗刀匪！', 'talk', '夜奔潼关'),
        ],
      },
    ],
  },

  scene_hsq06_06: {
    id: 'scene_hsq06_06',
    title: '第六幕 · 乱岗夜风',
    subtitle: '潼关天险瓮城外 · 荒原乱葬岗',
    mandatory: true,
    beats: [
      N('夜风呜咽，黄河怒涛声隐隐自北侧峡谷传来。你与封不弃掠出潼关瓮城西侧荒坡，只见乱葬岗断碑残冢之间燃着三堆篝火，十余名满脸横肉的关外刀匪正围火痛饮抢来的烈酒。'),
      N('篝火旁横陈着几辆被劈碎的商队木车，两名凶神恶煞的头目各执九环大刀与鬼头厚背刀，刀刃上的暗红血迹尚未擦净。'),
      P('（压低声音）“师叔，前方执鬼头刀者气息彪悍，内院主火堆旁那名九环刀匪首更是凶焰逼人，皆有二流好手功底。”'),
    ],
    choices: [
      {
        id: 'hsq06_06_next',
        label: '按住剑柄，听封不弃示下进击之策',
        tone: 'primary',
        effects: [openScene('scene_hsq06_07', HUASHAN_Q06_QUEST_ID)],
      },
    ],
  },

  scene_hsq06_07: {
    id: 'scene_hsq06_07',
    title: '第七幕 · 逼宫试胆',
    subtitle: '潼关乱葬岗 · 枯碑立誓',
    mandatory: true,
    beats: [
      N('岂料封不弃根本不讲什么潜伏暗算，足尖一挑脚边碎石，“啪”地击碎了刀匪篝火旁的酒坛！'),
      N('群匪顿时炸营惊起，封不弃却纵身跃上一块丈许高的残破石碑，双臂抱剑负立风中，低头冷冷俯视着你。'),
      S('NPC-0167', '“剑宗弟子没有藏头露尾的道理！去——用我白日教你的拆招之法，正面破他们的重刀！谁敢退守半步，不必刀匪动手，我先废你右手经脉！”'),
    ],
    choices: [
      {
        id: 'hsq06_07_ready',
        label: '深吸一口寒气，拔剑独步踏入乱葬岗火光之中',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q06_QUEST_ID, 'tongguan_slay'),
          openScene('scene_hsq06_08', HUASHAN_Q06_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq06_08: {
    id: 'scene_hsq06_08',
    title: '第八幕 · 首恶拦路',
    subtitle: '潼关乱葬岗 · 断碑鬼刀',
    mandatory: true,
    beats: [
      S(SPEAKER_RAIDER_VANGUARD, '“哪里钻出来的华山小道士，活腻了敢来坏爷爷们的酒兴！瞧你这起手架势，还是玉女峰那套婆婆妈妈的养吾剑？看刀！”'),
      N('前锋头目「断碑鬼刀」胡烈狞笑暴起，手中沉重鬼头大刀挟着恶风当头猛劈而下，刀势凶猛霸道，存心将你连剑带骨一刀震垮！'),
    ],
    choices: [
      {
        id: 'hsq06_08_fight',
        label: '摆出养吾正架诱敌，刀临头顶一刹骤变疾刺！（死战胡烈）',
        subLabel: '生死决战 · 断碑鬼刀胡烈（二流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRaiderVanguardNpc() },
            rule: 'duel',
            forbidEscapeReason: '封不弃立于枯碑督战，乱葬岗前唯有一往无前！',
            deathTitle: '命丧潼关乱葬岗',
            deathDetail: '你在潼关外乱葬岗被关外刀匪重刀劈破守势，未能参透以快驭正之机，血染荒冢。',
            onWin: [openScene('scene_hsq06_09', HUASHAN_Q06_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq06_09: {
    id: 'scene_hsq06_09',
    title: '第九幕 · 破守为刺',
    subtitle: '潼关乱葬岗 · 初试锋芒',
    mandatory: true,
    beats: [
      N('铛——嗤！胡烈的鬼头大刀刚刚砸上你斜举的剑身，本以为你会如寻常气宗弟子般借力撤步卸劲，不料你手腕猛地一拧！'),
      N('青钢剑锋竟不退反进，顺着鬼头刀冰冷的铁背如毒蛇吐信般疾滑而入，在他旧力刚尽、新力未生的一瞬，精准无比地洞穿其咽喉！'),
      P('（抽剑侧身避开喷溅热血）“原来如此……他越是全力破我守架，胸前空门便越是毫无防备！”'),
    ],
    choices: [
      {
        id: 'hsq06_09_next',
        label: '剑尖斜指地面，迎向暴怒扑来的悍匪大头目',
        tone: 'danger',
        effects: [openScene('scene_hsq06_10', HUASHAN_Q06_QUEST_ID)],
      },
    ],
  },

  scene_hsq06_10: {
    id: 'scene_hsq06_10',
    title: '第十幕 · 悍匪合围',
    subtitle: '潼关乱葬岗 · 血环凶威',
    mandatory: true,
    beats: [
      S(SPEAKER_RAIDER_BOSS, '“好阴毒的小崽子！拿正门剑架做饵，使的却是搏命快剑！小的们退开，看老子亲手剁碎{gender:他|她}！”'),
      N('匪首「血环屠夫」曹猛一脚踢翻燃烧的柴堆，火星漫天飞溅！此人久在陕甘边地与西军悍卒厮杀，一口九环大刀舞得泼水不进，刀环震响摄人心魄！'),
      N('石碑顶上，封不弃冷冽的声音穿透风声传来：“记住！《养吾剑法》的魂不在‘养’，而在蓄势待发的那一记寸进！谁先停顿半息，谁就是死人！”'),
    ],
    choices: [
      {
        id: 'hsq06_10_next',
        label: '谨记师叔喝点，催谷剑意迎向漫天火星刀光',
        tone: 'danger',
        effects: [openScene('scene_hsq06_11', HUASHAN_Q06_QUEST_ID)],
      },
    ],
  },

  scene_hsq06_11: {
    id: 'scene_hsq06_11',
    title: '第十一幕 · 以快驭正',
    subtitle: '潼关乱葬岗 · 疾剑斩魁',
    illustrationUrl: '/assets/quests/hs_q06_tongguan_blitz.jpg',
    illustrationCaption: '以快驭正 · 潼关乱葬岗化守为刺，疾剑连斩关外悍匪头目',
    mandatory: true,
    beats: [
      N('曹猛连劈三刀，刀刀斩碎坟头青石！你脚踏奇步，以《养吾剑法》起手式稳住中宫，待他第四刀全力旋斩之际，骤然弃去全部后着，人随剑走直撞入他怀中三尺之内！'),
      S(SPEAKER_RAIDER_BOSS, '“找死——呃？！”'),
    ],
    choices: [
      {
        id: 'hsq06_11_fight',
        label: '宁在一思进，莫在一思停！贴身疾刺决战曹猛！',
        subLabel: '生死决战 · 血环屠夫曹猛（二流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRaiderBossNpc() },
            rule: 'duel',
            forbidEscapeReason: '已欺入重刀三尺死线之内，退半步即是身首异处！',
            deathTitle: '血溅荒原孤冢',
            deathDetail: '你在潼关乱葬岗与悍匪首领曹猛搏命时剑势微滞，惨死于九环恶刀之下。',
            onWin: [openScene('scene_hsq06_12', HUASHAN_Q06_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq06_12: {
    id: 'scene_hsq06_12',
    title: '第十二幕 · 宁进莫停',
    subtitle: '潼关乱葬岗 · 群匪溃散',
    mandatory: true,
    beats: [
      N('寒光一闪即逝！曹猛沉重的九环大刀堪堪擦过你的肩头布衫，而你的青锋已自他锁骨缺口贯入心脉！'),
      N('这名横行关外的凶悍匪首瞪大双眼轰然栽倒。四周喽啰见两名当家顷刻间皆死于一剑封喉，吓得魂飞魄散，丢下抢来的商货银袋四散奔逃，被随后赶来的潼关巡卒悉数擒拿。'),
      P('（握剑长吐一口白气）“宁在一思进，莫在一思停……原来剑宗之快，并非胡乱抢攻，而是在看穿敌招虚实的刹那绝不迟疑！”'),
    ],
    choices: [
      {
        id: 'hsq06_12_next',
        label: '拾起商队遗留的赏银包袱，走向石碑下的封不弃',
        tone: 'primary',
        effects: [openScene('scene_hsq06_13', HUASHAN_Q06_QUEST_ID)],
      },
    ],
  },

  scene_hsq06_13: {
    id: 'scene_hsq06_13',
    title: '第十三幕 · 收鞘涤血',
    subtitle: '潼关乱葬岗 · 封不弃验剑',
    mandatory: true,
    beats: [
      N('封不弃飘然落回地面，俯身扫了一眼胡烈与曹猛颈间干净利落的一点剑创，冷峻的面容终于缓和了几分。'),
      S('NPC-0167', '“两处伤口皆深不过三寸、分毫不偏，没有多余的第二剑。总算没丢我封不弃的脸！”'),
      S('NPC-0167', '“将地上货银交还潼关守卒登记招领，随我回【华山绝顶论剑台 · 朝阳孤松观海亭】，把今夜拆招的心得彻底融进骨子里！”'),
    ],
    choices: [
      {
        id: 'hsq06_13_return',
        label: '拭净剑血归鞘，返登华山朝阳孤松观海亭复命',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q06_QUEST_ID, 'pine_report'),
          toast('乱葬岗双匪已除！请前往【华山绝顶论剑台 > 朝阳孤松观海亭】向封不弃复命！', 'success', '血刃凯旋'),
        ],
      },
    ],
  },

  scene_hsq06_14: {
    id: 'scene_hsq06_14',
    title: '第十四幕 · 孤松论快',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    mandatory: true,
    beats: [
      N('破晓前夕的朝阳孤松观海亭云涛翻涌。你立于盘根古松之下，重新将《养吾剑法》演练一遍——起手仍是端凝严整的太岳气象，可每一记转折收束皆暗藏电光石火般的寸进杀着。'),
      S('NPC-0167', '“好！气宗那帮人总骂我剑宗离经叛道，殊不知正因为我们把他们的剑架拆得比他们自己还透，交起手来才能一剑破尽万般繁文缛节！”'),
      P('“多谢封师叔成全！若非昨夜乱葬岗生死相逼，弟子在山上练上三年，只怕也摸不到化守为刺的门槛。”'),
    ],
    choices: [
      {
        id: 'hsq06_14_next',
        label: '躬身拱手，聆听封师叔后续嘱托',
        tone: 'gold',
        effects: [openScene('scene_hsq06_15', HUASHAN_Q06_QUEST_ID)],
      },
    ],
  },

  scene_hsq06_15: {
    id: 'scene_hsq06_15',
    title: '第十五幕 · 剑宗初成',
    subtitle: '朝阳孤松观海亭 · 砺锋待发',
    mandatory: true,
    beats: [
      S('NPC-0167', '“别得意得太早！《养吾剑法》拆得再快，终究只是借正门剑架入门的筑基功夫。等你把这套剑法锤炼至炉火纯青之境，再来黄河风陵渡找我——届时我教你真正的华山身剑轻灵杀术！”'),
      N('封不弃随手抛来一袋潼关官署拨付的剿匪赏银，转身没入翻腾云海之中。你轻抚微鸣的剑脊，深知自己的剑宗之路才刚刚拉开帷幕。'),
    ],
    choices: [
      {
        id: 'hsq06_15_finish',
        label: '收妥赏银，勤加苦练《养吾剑法》以待再战',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-147', amount: 250 },
          { type: 'giveSilver', amount: 75, reason: '潼关乱葬岗剿灭关外刀匪赏银' },
          { type: 'addSectContribution', amount: 55 },
          { type: 'giveCombatExp', amount: 105, reason: '生死拆招领悟以快驭正' },
          { type: 'modifyRenown', delta: 15, reason: '潼关外疾剑连斩关外悍匪双头目' },
          { type: 'completeQuest', questId: HUASHAN_Q06_QUEST_ID, outcome: 'completed' },
          toast('已完成《潼关血刃 · 以快驭正》！《养吾剑法》精进，获纹银 75 两、门派贡献 55 点！', 'success', '剑宗初成'),
        ],
      },
    ],
  },
}
