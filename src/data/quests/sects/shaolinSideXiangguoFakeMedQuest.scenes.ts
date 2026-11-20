import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE06_QUEST_ID } from './shaolinSideXiangguoFakeMedQuest'

const SPEAKER_PEDDLER: StorySpeakerSpec = {
  kind: 'custom',
  name: '游方药贩',
  title: '万姓雅市暗桩',
  factionName: '江淮毒贩',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_HU_SAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '胡三',
  title: '江淮毒贩双煞 · 砒霜手',
  factionName: '江淮毒贩',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_QIAN_WU: StorySpeakerSpec = {
  kind: 'custom',
  name: '钱五',
  title: '江淮毒贩双煞 · 断肠客',
  factionName: '江淮毒贩',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_VICTIM: StorySpeakerSpec = {
  kind: 'custom',
  name: '焦急老汉',
  title: '汴京苦主',
  factionName: '开封百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildHuSan(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS06_HU_SAN',
    name: '胡三',
    title: '江淮毒贩双煞 · 砒霜手',
    realm: '二流中品',
    factionName: '江淮毒贩',
    sectRank: 0,
    sectRankLabel: '黑坊头目',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“秃驴好大的狗胆，敢追到爷爷的炼丹窑来！尝尝我这浸了三年红信石的五毒砂掌！”',
    stats: { hp: 1320, mp: 1050, agi: 49, res: 32 },
    talents: { bone: 60, comprehension: 52, charm: 24 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-127', move2: 'MA-137' },
    learnedArts: [{ artId: 'MA-121', level: 5 }, { artId: 'MA-127', level: 5 }, { artId: 'MA-137', level: 4 }],
  })
}

function buildQianWu(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS06_QIAN_WU',
    name: '钱五',
    title: '江淮毒贩双煞 · 断肠客',
    realm: '二流下品',
    factionName: '江淮毒贩',
    sectRank: 0,
    sectRankLabel: '黑坊打手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“三哥别跟他废话，撒迷烟放倒他，丢进汴河喂鱼！”',
    stats: { hp: 1080, mp: 840, agi: 44, res: 27 },
    talents: { bone: 56, comprehension: 44, charm: 26 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-176', move2: 'MA-131' },
    learnedArts: [{ artId: 'MA-121', level: 4 }, { artId: 'MA-176', level: 5 }, { artId: 'MA-131', level: 4 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls06_01: {
    id: 'scene_sls06_01',
    title: '第一幕 · 雅市急报',
    subtitle: '开封府 · 大相国寺 · 万姓交易雅市',
    mandatory: true,
    beats: [
      N('{reignYear}汴京大相国寺万姓交易雅市正值逢五开市，长廊之下绸缎古玩、药材茶肆鳞次栉比。你刚步入西廊，便见一名满面焦灼的老汉拉扯着持戒僧净安的袖角大声哭诉，罗汉堂执事武僧慧音正沉眉劝慰。'),
      S(SPEAKER_VICTIM, '“小师傅，你们少林寺怎么卖害人的毒药啊！俺家儿子前日在这雅市西角买了一匣『少林药王院大力丸』，才服了两粒，今晨便腹绞如刀、呕血不止，郎中说脉象竟似中了信石之毒！”'),
      S('NPC-0984', '（额角冒汗，连声合十）“施主切莫慌乱！少林药王院丹药从不在集市散摊叫卖，绝无掺毒之理……啊，师兄来得正好！请快替咱们查验这粒药丸！”'),
    ],
    onFinishEffects: [openScene('scene_sls06_02', SHAOLIN_SIDE06_QUEST_ID)],
  },

  scene_sls06_02: {
    id: 'scene_sls06_02',
    title: '第二幕 · 银针辨毒',
    subtitle: '相国寺万姓交易雅市 · 西廊药案',
    illustrationUrl: '/assets/quests/sl_s06_fake_meds.jpg',
    illustrationCaption: '万姓雅市 · 剖丸验毒，揭破假冒少林大力丸暗掺砒霜之奸计',
    mandatory: true,
    beats: [
      N('你接过苦主递来的朱漆蜡丸，捏碎蜡壳，一股刺鼻的桂皮与辛辣硫气扑面而来。你以指腹碾开药粉，在日光下细辨，赫然可见极细的灰白晶末；再取慧音腰间银针刺入温水药汁，针尖须臾泛出乌青！'),
      P('（神色一凛，朗声向围观百姓解释）“诸位乡邻请看！真品少林丹丸味苦回甘、色泽温润，绝无辛辣焦臭。这假丸里头掺了微量白砒与烈性麻黄——初服一粒令人燥热生力，似有神效，连服三粒便会灼伤肺腑、吐血毙命！”'),
      S('NPC-0418', '（虎目含怒，低喝一声）“好狠毒的江湖败类！既害百姓性命，又将脏水泼在嵩山少林头上！净安，快取寺中解毒甘草汤随这位施主去救他令郎；师弟，这伙贼人定还在雅市附近兜售，咱们须得将他连根拔起！”'),
    ],
    onFinishEffects: [openScene('scene_sls06_03', SHAOLIN_SIDE06_QUEST_ID)],
  },

  scene_sls06_03: {
    id: 'scene_sls06_03',
    title: '第三幕 · 顺藤摸瓜',
    subtitle: '相国寺万姓交易雅市 · 偏廊议策',
    mandatory: true,
    beats: [
      S('NPC-0418', '“我方才已派人去西角暗查，那卖假药的货摊极其狡猾，一见僧衣便收摊隐入人海。若打草惊蛇，只怕揪不出他们城外的制假黑坊，过几日又会换个集市害人。”'),
      P('（略一沉吟，已有定计）“慧音师兄所言极是。弟子愿换作寻常行商便装，假意替河北客商大宗采买百匣『大力丸』，诱那暗桩带路去黑坊验货。师兄暗中知会开封府捕快在城外十里亭接应，咱们来个一网打尽！”'),
      S('NPC-0418', '“妙计！既不惊动雅市万姓，又能人赃并获！师弟一切小心，江湖毒贩诡计多端，切莫着了他们的迷烟暗算。”'),
    ],
    choices: [
      {
        id: 'sls06_accept',
        label: '换上行商便装，赴雅市西角暗访假药贩子',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE06_QUEST_ID, stepId: 'raid_black_workshop' },
          setStep(SHAOLIN_SIDE06_QUEST_ID, 'raid_black_workshop'),
          toast(
            '已定下乔装引蛇之计！请在【相国寺万姓交易雅市（bl_xg_market）】暗访药贩、直捣城外黑坊。',
            'talk',
            '假药风波',
          ),
        ],
      },
    ],
  },

  scene_sls06_04: {
    id: 'scene_sls06_04',
    title: '第四幕 · 乔装问价',
    subtitle: '万姓交易雅市 · 西角柳荫',
    mandatory: true,
    beats: [
      N('你换上一袭青布商衫，戴上宽檐斗笠遮住光头，腰间故意坠着一串沉甸甸的铜钱袋，踱步至雅市西角。果然见一贼眉鼠眼的瘦汉蹲在青柳下，冲过往客商挤眉弄眼，袖底露出半只假造的朱漆蜡盒。'),
      S(SPEAKER_PEDDLER, '（凑近压低嗓门）“客官可是走南闯北的贵人？小人这儿有从嵩山少林寺托关系弄出来的秘制『药王大力丸』，强筋壮骨立竿见影，二两银子一粒，买十送一！”'),
      P('（故意压低声音，轻掂钱袋）“十粒哪够？我家东家在河北贩马，急需三百粒充作军马行商急药。你这担子里货太少，若真有现货，带我去你家库房验货，现银当场结清！”'),
    ],
    onFinishEffects: [openScene('scene_sls06_05', SHAOLIN_SIDE06_QUEST_ID)],
  },

  scene_sls06_05: {
    id: 'scene_sls06_05',
    title: '第五幕 · 暗巷引路',
    subtitle: '汴京城外 · 废窑荒道',
    mandatory: true,
    beats: [
      N('那游方药贩听闻三百粒的大买卖，眼中顿时贪光大盛，左右张望见无官差尾随，便殷勤领你出了南熏门，七拐八绕走入汴河荒滩边一座偏僻的废弃砖窑。'),
      N('尚未走近窑口，一股刺鼻的熬胶、硫磺与砒石混杂的酸腐臭气便随风飘来。窑院内四五个赤膊汉子正围着三口黑铁大锅翻炒药泥，墙角堆满印着伪造“嵩山少林药王院”朱印的木匣！'),
      S(SPEAKER_PEDDLER, '（朝窑门大喊）“胡三爷、钱五爷！来了位河北大财主，要现银吃下三百粒大力丸！”'),
    ],
    onFinishEffects: [openScene('scene_sls06_06', SHAOLIN_SIDE06_QUEST_ID)],
  },

  scene_sls06_06: {
    id: 'scene_sls06_06',
    title: '第六幕 · 揭帽亮明',
    subtitle: '城外废窑 · 假药黑坊',
    illustrationUrl: '/assets/quests/sl_s06_black_workshop.jpg',
    illustrationCaption: '城外废窑黑坊 · 掀笠亮明少林身份，正气凛然斥责江淮毒贩',
    mandatory: true,
    beats: [
      N('窑洞暗影中缓步走出两名凶神恶煞的江湖汉子：为首者十指泛着诡异暗青，腰悬毒砂皮囊，正是流窜江淮的毒手【胡三】；身旁提着鬼头短刀的瘦长恶汉则是其同党【钱五】。'),
      S(SPEAKER_HU_SAN, '（阴鸷双目上下打量你，冷笑一声）“河北客商？哼，哪家行商步履沉稳如松、太阳穴高高鼓起？把斗笠摘下来让三爷瞧瞧！”'),
      P('（反手掀落斗笠，露出戒疤与凛然双目，朗声喝道）“阿弥陀佛！尔等冒充嵩山少林药王院名号、以砒霜假药谋财害命，今日便是黑坊覆灭之时！还不束手就擒，随洒家去开封府领罪！”'),
    ],
    onFinishEffects: [openScene('scene_sls06_07', SHAOLIN_SIDE06_QUEST_ID)],
  },

  scene_sls06_07: {
    id: 'scene_sls06_07',
    title: '第七幕 · 毒坊凶威',
    subtitle: '城外废窑 · 毒烟四起',
    mandatory: true,
    beats: [
      S(SPEAKER_QIAN_WU, '（脸色骤变，反手抽刀）“遭了，是少林寺的硬茬子摸上门来了！那几个熬药的快把账本烧了，别留活口！”'),
      S(SPEAKER_HU_SAN, '（双掌一搓，掌心涌出腥臭灰青毒雾）“既入了老子的炼毒窑，便休想活着踏出半步！钱五，左右夹击，先用迷烟呛瞎他的眼，再用五毒砂掌废了他丹田！”'),
      N('你屏息凝气，以内力护住口鼻灵台，足尖一点青砖，抢先截断两名毒贩退路！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side06_boss_ready', value: true },
      openScene('scene_sls06_08', SHAOLIN_SIDE06_QUEST_ID),
    ],
  },

  scene_sls06_08: {
    id: 'scene_sls06_08',
    title: '第八幕 · 力挫双煞',
    subtitle: '城外废窑 · 车轮连战 激战江淮毒贩双煞',
    mandatory: true,
    beats: [
      S(SPEAKER_HU_SAN, '“狂妄秃驴！今日便让你见识见识江淮双煞的毒掌与快刀！”'),
      N('胡三毒砂扑面，钱五短刀紧随其后专攻下三路，窑院之中劲风呼啸，药缸碎裂声不绝于耳！'),
    ],
    choices: [
      {
        id: 'sls06_fight_duo',
        label: '屏息凝气，车轮连战迎战江淮毒贩双煞【砒霜手胡三】与【断肠客钱五】',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuSan() },
            extraOpponents: [{ kind: 'custom', npc: buildQianWu() }],
            rule: 'story_trial',
            forbidEscapeReason: '毒坊假药未毁，岂能任由毒贩脱逃再祸害汴京百姓！',
            introText:
              '【捣毁黑坊】在城外废窑迎战江淮毒贩双煞——【砒霜手胡三（二流中品）】与【断肠客钱五（二流下品）】！',
            onWin: [openScene('scene_sls06_09', SHAOLIN_SIDE06_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '毒烟迷眼一时失机，急退窑外运功逼出余毒！整顿后可于【相国寺万姓交易雅市】再度杀入黑坊。',
                'warn',
                '假药风波',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls06_09: {
    id: 'scene_sls06_09',
    title: '第九幕 · 破毒擒凶',
    subtitle: '城外废窑 · 窑院尘定',
    mandatory: true,
    beats: [
      N('一番激斗，你以刚猛浑厚的少林阳刚内劲震散毒砂灰雾，先一记伏虎重手震飞钱五手中短刀，再顺势贴身欺入胡三中门，将其双腕齐齐扣住反剪在地！'),
      S(SPEAKER_HU_SAN, '（面如土色，口角溢血）“饶……饶命！大师手下留情！这批假药不过是小人贪图暴利，听闻少林丹丸在京城千金难求，才动了歪心思……”'),
      N('话音未落，窑外马蹄声急，慧音已率领闻讯赶来的开封府公人与数名罗汉堂护寺僧众团团围住废窑，将胡三、钱五连同五名伙计尽数戴上枷锁！'),
    ],
    onFinishEffects: [openScene('scene_sls06_10', SHAOLIN_SIDE06_QUEST_ID)],
  },

  scene_sls06_10: {
    id: 'scene_sls06_10',
    title: '第十幕 · 烈火焚假',
    subtitle: '城外废窑 · 焚毁毒丸',
    mandatory: true,
    beats: [
      S('NPC-0418', '（快步上前查看你有无沾染毒粉，见你无恙方松一口气）“好身手！师弟孤身深入毒窟，竟能将江淮双煞悉数生擒，真乃我少林内门楷模！”'),
      N('你在开封府公人与周边赶来看热闹的乡民见证下，命人将三口铁锅里的毒药泥、两百余匣伪造木盒以及私刻的假印一并倒入深坑，泼上火油付之一炬。冲天火光映照着焦黑假药化为灰烬，四周百姓无不拍手称快。'),
      P('“恶徒已交官府收押，假药亦已焚毁殆尽。慧音师兄，咱们回大雄宝殿向净安与诸位香客报个平安吧。”'),
    ],
    choices: [
      {
        id: 'sls06_to_report',
        label: '押犯交官、焚尽假药，返回大相国寺大雄宝殿复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE06_QUEST_ID, 'return_report'),
          toast(
            '假药黑坊已彻底捣毁！请前往【大相国寺 · 大雄宝殿（香云宝鼎）（bl_xg_hall）】复命。',
            'success',
            '假药风波',
          ),
        ],
      },
    ],
  },

  scene_sls06_11: {
    id: 'scene_sls06_11',
    title: '第十一幕 · 殿前辨明',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('回到大雄宝殿前，香云宝鼎青烟袅袅。净安早已迎了出来，满脸喜色地报喜：那苦主之子服下少林药王院甘草解毒汤后已转危为安，方才还特意托人送来锦旗致谢。'),
      N('面对殿前闻讯聚拢的数十名京城药商与香客，你从容登阶，将真假药丸的色、味、印记之别娓娓道来，言辞恳切周密，既破除了市井流言，又叮嘱百姓购药务必认准官办惠民药局与寺中正印，满场香客莫不颔首称善。'),
      S('NPC-0984', '（合十赞叹）“师兄不仅武艺高强，这一番晓谕百姓的辩才与仁心，更令满殿香客心服口服！”'),
    ],
    onFinishEffects: [openScene('scene_sls06_12', SHAOLIN_SIDE06_QUEST_ID)],
  },

  scene_sls06_12: {
    id: 'scene_sls06_12',
    title: '第十二幕 · 丹药酬功',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      S('NPC-0418', '“此番多亏师弟智勇双全，既救了京城百姓性命，又保全了我嵩山少林药王院百年清誉！开封府赏下的缉凶公费八十两纹银，并药王院玄生大师留存于寺中的两枚真品【嵩山少林小还丹】，理当赠予师弟防身。”'),
      P('（合十接过丹匣与纹银）“除恶护民乃出家人本分，多谢慧音师兄与净安师弟记挂！”'),
    ],
    choices: [
      {
        id: 'sls06_complete',
        label: '收下两枚【嵩山少林小还丹】与酬银，圆满结案！',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 280, reason: '城外废窑 1v2 击败江淮毒贩双煞' },
          { type: 'addSectContribution', amount: 110 },
          { type: 'giveSilver', amount: 80, reason: '开封府缉拿假药毒贩赏银' },
          { type: 'modifyChivalry', delta: 25 },
          { type: 'giveItem', itemId: 'ITM-MED-111', qty: 2 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifyRenown', delta: 30, reason: '完成门派差事《万姓雅市 · 假药风波》' },
          { type: 'completeQuest', questId: SHAOLIN_SIDE06_QUEST_ID, outcome: 'completed' },
          toast(
            '【万姓雅市 · 假药风波】圆满完结！获赠【嵩山少林小还丹】×2、纹银 80 两与宗门贡献 110！',
            'success',
            '假药风波',
          ),
        ],
      },
    ],
  },
}
