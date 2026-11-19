import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, warn } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q08_QUEST_ID } from './zhongnanGuanHuashanXiyiQuest'

const SPEAKER_MURONG_SPY: StorySpeakerSpec = {
  kind: 'custom',
  name: '燕青云（假执事）',
  title: '姑苏慕容暗探 · 易容盗谱贼',
  factionName: '姑苏慕容',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

function buildMurongSpy(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q08_MURONG_SPY',
    name: '燕青云',
    title: '姑苏慕容盗谱暗探',
    realm: '二流上品',
    factionName: '姑苏慕容',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“《希夷剑谱》乃华山至宝，我姑苏慕容还施水阁岂能缺此一卷！挡路者死！”',
    stats: { hp: 1680, mp: 780, agi: 56, res: 30 },
    talents: { bone: 70, comprehension: 72, charm: 60 },
    equippedArts: { neigong: 'MA-234', move1: 'MA-184' },
    learnedArts: [
      { artId: 'MA-234', level: 6 },
      { artId: 'MA-184', level: 6 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn_q08_01: {
    id: 'scene_zn_q08_01',
    title: '第一幕 · 紫霞相迎',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    illustrationUrl: '/assets/quests/zn_q08_zixia_meeting.jpg',
    illustrationCaption: '道剑同盟 · 紫霞正气主殿内岳沧溟设茗迎客，终南华山两派高人齐聚',
    mandatory: true,
    beats: [
      N('{reignYear}中秋将近，西岳华山枫叶似火。你随马钰玄、刘处静登上玉女峰紫霞道观，华山掌门「太岳真君」岳沧溟早已携紫霞首徒高沧云出殿相迎。'),
      S('NPC-0118', '（抚须朗笑，风度端严）“终南与华山同枕秦岭，俱承陈抟希夷老祖遗泽！马道长、刘道长远道而来，还带了在秦州大破夏骑的终南俊彦，实在令紫霞观蓬荜生辉！”'),
      S('NPC-1054', '（稽首还礼）“岳掌门过奖了。今日携我门下内门弟子前来，一是叙两派百载香火之谊，二也是让后辈见识西岳剑道气象。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_02', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_02: {
    id: 'scene_zn_q08_02',
    title: '第二幕 · 睡仙遗泽',
    subtitle: '紫霞正气主殿 · 共话陈抟',
    mandatory: true,
    beats: [
      S('NPC-0118', '（指向殿中悬挂的《希夷先生睡仙图》）“百年前陈抟老祖隐居华山，曾与太祖皇帝对弈博台赢下整座西岳，又留下一套《希夷剑法》残篇，讲求‘视之不见名曰夷，听之不闻名曰希’，融道家静极生动之理。”'),
      S('NPC-1056', '（赞叹颔首）“此理正与我全真内功相通！今日两派于博台孤峰弈棋亭共参此卷，定能各有所获。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_03', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_03: {
    id: 'scene_zn_q08_03',
    title: '第三幕 · 紫霞首徒',
    subtitle: '紫霞正气主殿 · 初会高沧云',
    mandatory: true,
    beats: [
      S('NPC-0202', '（拱手微笑，气度儒雅）“久闻终南{gender:道友|女侠}在长安护卫张载先生、在秦州古塞力挫夏骑，高某心向往之！待会儿登临绝顶博台，还望赐教三五合！”'),
      P('“高师兄乃华山紫霞首徒，剑法早已臻至一流之境，晚辈正想讨教一二！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_04', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_04: {
    id: 'scene_zn_q08_04',
    title: '第四幕 · 异样执事',
    subtitle: '紫霞正气主殿 · 暗伏疑影',
    mandatory: true,
    beats: [
      N('此时一名捧着紫檀剑谱木匣的青衣华山执事低头退下，经过你身侧时，你敏锐地瞥见他虎口处生着一层常年练柔劲指法才会留下的淡白老茧，且步履间隐隐带着几分江南水乡的轻柔韵律。'),
      P('（心中微微一动）“华山剑派讲究沉雄峻拔，这名捧匣执事的身法气息……怎的透着几分江南世家的阴柔？”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_05', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_05: {
    id: 'scene_zn_q08_05',
    title: '第五幕 · 题壁论道',
    subtitle: '玉女峰石廊 · 墨香棋韵',
    mandatory: true,
    beats: [
      N('众人在移步登顶途中经过华山碑廊，岳沧溟兴致勃发，与马钰玄共赏陈抟老祖手书石刻，你在一旁细观笔走龙蛇之势，竟觉书法顿挫与剑势起落暗合，颇有所悟。'),
    ],
    onFinishEffects: [
      { type: 'modifySkill', key: '书', delta: 1 },
      openScene('scene_zn_q08_06', ZHONGNAN_Q08_QUEST_ID),
    ],
  },

  scene_zn_q08_06: {
    id: 'scene_zn_q08_06',
    title: '第六幕 · 登临博台',
    subtitle: '华山绝顶石道 · 铁索凌云',
    mandatory: true,
    beats: [
      S('NPC-0118', '“云海已开！诸位道友，请随岳某登临【华山绝顶论剑台 · 博台孤峰弈棋亭】！”'),
    ],
    choices: [
      {
        id: 'zn_q08_go_botai',
        label: '随两派尊长登临【华山绝顶论剑台 · 博台孤峰弈棋亭】',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q08_QUEST_ID, stepId: 'botai_sword_debate' },
          setStep(ZHONGNAN_Q08_QUEST_ID, 'botai_sword_debate'),
          toast('请前往【华山绝顶论剑台 · 博台孤峰弈棋亭】开启华岳论剑！', 'talk', '华岳论剑'),
        ],
      },
    ],
  },

  scene_zn_q08_07: {
    id: 'scene_zn_q08_07',
    title: '第七幕 · 孤峰弈棋',
    subtitle: '华山绝顶论剑台 · 博台孤峰弈棋亭',
    illustrationUrl: '/assets/quests/zn_q08_botai_sword_debate.jpg',
    illustrationCaption: '博台论剑 · 云海翻涌孤峰亭畔，与紫霞首徒高沧云切磋剑意',
    mandatory: true,
    beats: [
      N('博台孤峰悬于万丈云海之上，铁亭石棋盘历经百年风雨仍清晰如昔。岳沧溟与马钰玄落座弈棋论道，你观二人落子虚实相生，棋艺亦随之精进一分。'),
      S('NPC-0202', '（拔出紫霞佩剑，剑身微颤如松涛）“前辈们以棋论道，咱们晚辈便以剑印心！{gender:道友|女侠}，高某以华山正脉剑法出招，切磋四合点到即止，请！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_08', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_08: {
    id: 'scene_zn_q08_08',
    title: '第八幕 · 四合试锋',
    subtitle: '博台孤峰弈棋亭 · 切磋高沧云',
    mandatory: true,
    beats: [
      P('（寒泉道剑出鞘，剑尖斜指云海）“请高师兄赐教！”'),
    ],
    choices: [
      {
        id: 'zn_q08_spar_gaocangyun',
        label: '博台论剑 · 与紫霞首徒高沧云切磋四合（撑满四合即胜）',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q08_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0202' },
            rule: 'survive_rounds',
            maxRounds: 4,
            forbidEscapeReason: '两派掌门长老正自观战论剑，岂可拂袖而走！',
            introText: '高沧云微笑出剑，紫霞剑气堂堂正正笼罩而来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q08_09', ZHONGNAN_Q08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('高沧云一流剑气果然深厚，岳掌门含笑请稍作调息再试四合！', '博台论剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q08_09: {
    id: 'scene_zn_q08_09',
    title: '第九幕 · 棋盘剑印',
    subtitle: '博台孤峰弈棋亭 · 惺惺相惜',
    mandatory: true,
    beats: [
      N('四合既过，剑气激荡起满地松针。高沧云收剑入鞘，眼中满是惊叹：“终南《三才归元剑》配《金雁功》与《劈空掌》，刚柔并济、进退自如，高某佩服！”'),
      S('NPC-0118', '（击节大赞）“后生可畏！马道长，你们终南古观真是出了位难得的奇才！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_10', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_10: {
    id: 'scene_zn_q08_10',
    title: '第十幕 · 剑谱失窃',
    subtitle: '博台孤峰 · 忽生变故',
    mandatory: true,
    beats: [
      N('话音未落，下方铁索栈道忽传来一声惊呼：“不好了！有人打晕了守亭弟子，偷走了装有《希夷剑谱》残卷的紫檀木匣！”'),
      N('众人齐齐低头望去，只见方才那名举止怪异的「青衣执事」正挟着紫檀木匣，身形如烟般沿着百丈绝壁疾掠而下！'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_11', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_11: {
    id: 'scene_zn_q08_11',
    title: '第十一幕 · 识破慕容',
    subtitle: '博台绝壁 · 凌空追截',
    mandatory: true,
    beats: [
      S('NPC-0118', '（脸色一变）“那身法绝非华山弟子！竟是江南姑苏慕容氏的偷梁换柱之计！”'),
      P('“方才在紫霞殿我便觉此人气息阴柔有异！弟子习有《金雁功》，愿凌空抄近道截下这盗谱贼！”'),
      S('NPC-1054', '“小心他‘以彼之道还施彼身’的诡计！速去拦截，我们随后便到！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_12', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_12: {
    id: 'scene_zn_q08_12',
    title: '第十二幕 · 绝壁截贼',
    subtitle: '华山绝壁栈道 · 现出原形',
    illustrationUrl: '/assets/quests/zn_q08_murong_thief.jpg',
    illustrationCaption: '绝壁擒奸 · 寒泉道剑截住云海栈道，慕容暗探怀抱紫檀剑匣现形',
    mandatory: true,
    beats: [
      N('你展开《金雁功》自孤峰纵身斜掠，借着两株绝壁古松连点折转，竟抢在盗谱贼之前落在了窄峻的石栈道中央！'),
      S(SPEAKER_MURONG_SPY, '（一把撕下脸上的青衣执事伪装，冷笑拔出软剑）“好俊的终南轻功！既然撞破了我姑苏慕容燕青云的手段，今日便叫你葬身这华山万丈深渊！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_13', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_13: {
    id: 'scene_zn_q08_13',
    title: '第十三幕 · 栈道擒谍',
    subtitle: '华山绝壁栈道 · 决战燕青云',
    mandatory: true,
    beats: [
      P('“偷鸡摸狗的鼠辈，也敢觊觎陈抟老祖遗泽！留下《希夷剑谱》！”'),
    ],
    choices: [
      {
        id: 'zn_q08_fight_murong',
        label: '稳守栈道 · 生擒姑苏慕容盗谱暗探燕青云',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildMurongSpy() },
            rule: 'story_trial',
            forbidEscapeReason: '绝不可让慕容暗探携《希夷剑谱》逃下华山！',
            introText: '燕青云软剑如灵蛇出洞，招招刁钻狠辣！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q08_14', ZHONGNAN_Q08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('燕青云软剑刁钻，高沧云及时赶来挡住其去路。请调息再战！', '绝壁擒奸'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q08_14: {
    id: 'scene_zn_q08_14',
    title: '第十四幕 · 夺回剑匣',
    subtitle: '华山绝壁栈道 · 完璧归赵',
    mandatory: true,
    beats: [
      N('你以《三才归元剑》封死栈道左右，复以一记《劈空掌》隔空震脱燕青云软剑，反手扣住其脉门，将完好无损的紫檀剑匣稳稳夺回！'),
      N('岳沧溟、高沧云与马钰玄、刘处静相继掠至栈道，华山弟子立时上前将燕青云五花大绑。'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_15', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_15: {
    id: 'scene_zn_q08_15',
    title: '第十五幕 · 慕容阴谋',
    subtitle: '博台孤峰弈棋亭 · 审问余波',
    mandatory: true,
    beats: [
      S('NPC-0118', '（接过紫檀剑匣检查无损，长叹一声）“姑苏慕容氏广搜天下武学，连我华山陈抟遗谱都敢潜伏暗偷！若非终南贤侄识破伪装、绝壁截贼，今日华山颜面扫地矣！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_16', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_16: {
    id: 'scene_zn_q08_16',
    title: '第十六幕 · 共授希夷',
    subtitle: '博台孤峰弈棋亭 · 获传地阶剑法',
    mandatory: true,
    beats: [
      S('NPC-0118', '（朗声一笑，打开紫檀木匣取出泛黄卷轴）“既然这《希夷剑法》乃陈抟老祖所遗、终南与华山共承其泽，今日岳某便做主，与马道长一同将此套地阶剑法《希夷剑法》传予你！”'),
      S('NPC-1054', '（亦抚须欣慰）“快谢过岳掌门厚赐！《希夷剑法》似睡非睡、静极而发，最合我终南玄门内息！”'),
    ],
    choices: [
      {
        id: 'zn_q08_learn_xiyi',
        label: '恭敬展卷 · 领悟地阶剑法《希夷剑法》',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-089', level: 1, autoEquip: true },
          openScene('scene_zn_q08_17', ZHONGNAN_Q08_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q08_17: {
    id: 'scene_zn_q08_17',
    title: '第十七幕 · 静极生动',
    subtitle: '博台孤峰弈棋亭 · 演练剑意',
    mandatory: true,
    beats: [
      N('你手执寒泉道剑，在云海松风间缓缓演练《希夷剑法》起手三式：剑势初看慵懒如睡仙扶枕，转瞬却似雷霆破云、无声无息间已笼罩周身三丈！'),
      S('NPC-0202', '（击掌赞叹）“好一个‘视之不见，听之不闻’！{gender:道友|女侠}悟性之高，令高某叹服！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_18', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_18: {
    id: 'scene_zn_q08_18',
    title: '第十八幕 · 辞别西岳',
    subtitle: '玉女峰山道 · 两派结盟',
    mandatory: true,
    beats: [
      N('次日清晨，岳沧溟与高沧云亲送终南师徒下玉女峰，两派约定今后关中若有强敌或西域魔教来犯，必当守望相助。'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_19', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_19: {
    id: 'scene_zn_q08_19',
    title: '第十九幕 · 凯旋终南',
    subtitle: '秦岭官道 · 驰归重阳古观',
    mandatory: true,
    beats: [
      S('NPC-1054', '“你此番长安护道、秦州破夏、华岳擒奸并悟得地阶《希夷剑法》，功勋与武境皆已远超寻常内门。回【重阳玄门清修主殿】后，我便为你举行真传册封大典！”'),
    ],
    choices: [
      {
        id: 'zn_q08_return_chongyang',
        label: '纵马凯旋 · 返回重阳玄门清修主殿晋升古观真传',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q08_QUEST_ID, 'chongyang_promote_rank3'),
          toast('已习得地阶《希夷剑法》！请返回【重阳玄门清修主殿】晋升【Lv.3 古观真传】！', 'success', '睡仙希夷'),
        ],
      },
    ],
  },

  scene_zn_q08_20: {
    id: 'scene_zn_q08_20',
    title: '第二十幕 · 重阳钟鸣',
    subtitle: '重阳古观前脉道院 · 重阳玄门清修主殿',
    illustrationUrl: '/assets/quests/zn_q08_xiyi_promotion.jpg',
    illustrationCaption: '古观真传 · 重阳主殿香烟缭绕，马钰玄与刘处静亲颁真传玉符',
    mandatory: true,
    beats: [
      N('重阳玄门清修主殿钟磬齐鸣，诸位同门分列左右。马钰玄与刘处静并立三清像前，手捧一枚温润的太乙白玉真传符。'),
      S('NPC-1054', '（朗声宣告）“弟子自入重阳古观前脉以来，破太行悍匪、救宋军斥候、护横渠关学、保秦州战马、扬威西岳华山！今奉紫阳师尊法旨，晋升你为终南隐宗【Lv.3 古观真传】！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_21', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_21: {
    id: 'scene_zn_q08_21',
    title: '第二十一幕 · 佩符受职',
    subtitle: '重阳玄门清修主殿 · 真传加身',
    mandatory: true,
    beats: [
      N('你焚香三拜，双手接过太乙白玉真传符系于腰间。自此以后，你已是终南重阳古观足以独当一面的核心真传！'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_22', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_22: {
    id: 'scene_zn_q08_22',
    title: '第二十二幕 · 长生寄语',
    subtitle: '重阳玄门清修主殿 · 丹院伏笔',
    mandatory: true,
    beats: [
      S('NPC-1056', '（抚须微笑，眉间却隐有一丝忧色）“晋升真传固然可喜，只是近来我总觉紫金丹院外围似有星宿派高人窥伺。贫道这几日须闭守丹院炼制紫金清心丹，你若有暇，常来丹院走动走动。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_23', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_23: {
    id: 'scene_zn_q08_23',
    title: '第二十三幕 · 云松映剑',
    subtitle: '重阳古观 · 剑境初成',
    mandatory: true,
    beats: [
      N('出得主殿，秋风送爽。你轻抚寒泉道剑，地阶《希夷剑法》的种种玄妙在心头流转不息，浑身气度已隐隐透出大家风范。'),
    ],
    onFinishEffects: [openScene('scene_zn_q08_24', ZHONGNAN_Q08_QUEST_ID)],
  },

  scene_zn_q08_24: {
    id: 'scene_zn_q08_24',
    title: '第二十四幕 · 希夷大成',
    subtitle: '重阳古观 · 真传启新章',
    mandatory: true,
    beats: [
      P('（望向长安与终南群峰，心中澄澈坚定）“既为古观真传，自当守护终南山门、扫尽关中妖氛！”'),
    ],
    choices: [
      {
        id: 'zn_q08_complete',
        label: '领受真传玉符 · 晋升【Lv.3 古观真传】',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '棋', delta: 1 },
          { type: 'setSectRank', sectId: 'SECT-11', rank: 3, promoteOnly: true },
          { type: 'addSectContribution', amount: 180 },
          { type: 'giveSilver', amount: 160, reason: '晋升古观真传赏赐' },
          { type: 'giveCombatExp', amount: 960, reason: '完成《华岳论剑 · 睡仙希夷》' },
          { type: 'modifyRenown', delta: 36, reason: '华岳擒奸悟希夷剑法晋升古观真传' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1054' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1056' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0118' }, delta: 14 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0202' }, delta: 14 },
          { type: 'completeQuest', questId: ZHONGNAN_Q08_QUEST_ID, outcome: 'promoted_rank3_xiyi' },
          toast('恭喜晋升终南隐宗【Lv.3 古观真传】，习得地阶《希夷剑法》！', 'success', '古观真传'),
        ],
      },
    ],
  },
}
