import type { QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const QUEST_ID = 'QST-SECT-17-MURONG-1'

export const KAIFENG_MURONG_QUEST_1: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '燕子坞暗影 · 姑苏密查',
    category: 'sect_mission',
    factionId: 'SECT-17',
    regionId: 'bianliang',
    recommendedRealm: '二流巅峰',
    maxOpponentRealm: '一流中品（邓百川十合逃生）',
    recommendedNote:
      '刚性前置：加入【开封府 / 六扇门】且官居【Lv.2 捕头都头】、任捕头都头满 730 天；后续乘舟入燕子坞前须先于苏州府完成《烟波三叠 · 燕子坞水图》。',
    startHint:
      '成为开封府 Lv.2 捕头都头并任满 730 天后，前往【开封府 · 开封府衙 · 六扇门捕快演武院】，点击「领取晋升任务：《燕子坞暗影 · 姑苏密查》」开启。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_liushan',
      customLabel: '开封府 · 开封府衙 · 六扇门捕快演武院',
    },
    startCondition: {
      type: 'all',
      conditions: [
        { type: 'inSect', sectId: 'SECT-17', minRank: 2 },
        { type: 'kaifengRank2DaysAtLeast', min: 730 },
      ],
    },
    initialStepId: 'suzhou_investigate',
    summary:
      '捕头都头做满 730 天后，奉包拯密令微服南下姑苏查探燕子坞慕容氏私蓄兵甲之疑云。须先挫败包不同、风波恶，潜入参合庄秘档室取证，并在“神掌震江南”邓百川手下撑过 10 回合全身而退，方可解锁晋升【金牌总捕】。',
    steps: {
      suzhou_investigate: {
        id: 'suzhou_investigate',
        title: '姑苏暗访寒山夜',
        objective: '微服南下姑苏城，前往【枫桥寒山寺 · 夜半钟声古钟楼】截查兵甲接货密信。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_hanshan',
          spotId: 'sz_hs_bell',
          customLabel: '姑苏城 · 枫桥寒山寺 · 夜半钟声古钟楼',
        },
      },
      taihu_bao: {
        id: 'taihu_bao',
        title: '太湖渡口斗非也',
        objective: '前往姑苏【太湖烟波渡口 · 烟波木栈长埠与镇湖石塔】，与包不同交手并击败之，夺取入坞木牌。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_taihu',
          spotId: 'sz_th_pier',
          customLabel: '姑苏城 · 太湖烟波渡口 · 烟波木栈长埠与镇湖石塔',
        },
      },
      yanziwu_tingxiang: {
        id: 'yanziwu_tingxiang',
        title: '山茶幽径破风恶',
        objective: '乘舟潜入燕子坞【听香水榭与曼陀花坞 · 曼陀山茶幽径】，击败巡夜的“一阵风”风波恶。',
        nextHint:
          '若尚未贯通太湖航道，须先于苏州府【太湖烟波渡口】完成江南三府奇遇《烟波三叠 · 燕子坞水图》（获取《太湖燕子坞烟波水路舆图》），方可自大地图乘舟入坞。',
        targetLocation: {
          regionId: 'yanziwu',
          buildingId: 'yzw_tingxiang',
          spotId: 'yzw_tingxiang_west',
          customLabel: '燕子坞 · 听香水榭与曼陀花坞 · 曼陀山茶幽径',
        },
      },
      canhe_archive: {
        id: 'canhe_archive',
        title: '参合秘室十合逃',
        objective: '潜入【燕子坞 · 参合庄议事正厅 · 燕子坞书房秘档室】抄录大燕密账，并在邓百川手下撑过 10 回合逃生！',
        targetLocation: {
          regionId: 'yanziwu',
          buildingId: 'yzw_canhe',
          spotId: 'yzw_canhe_east',
          customLabel: '燕子坞 · 参合庄议事正厅 · 燕子坞书房秘档室',
        },
      },
      return_kaifeng_report: {
        id: 'return_kaifeng_report',
        title: '北返开封呈密卷',
        objective: '返回【开封府衙 · 六扇门捕快演武院】向包拯、展昭呈交参合庄密账，解锁金牌总捕晋升资格。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_kaifengfu',
          spotId: 'bl_kf_liushan',
          customLabel: '开封府 · 开封府衙 · 六扇门捕快演武院',
        },
      },
    },
    spotActions: [
      {
        id: 'spot_kf1_start',
        label: '领取晋升任务：《燕子坞暗影 · 姑苏密查》',
        badge: 'Lv.2→Lv.3 晋升',
        subtitle: '需开封府 Lv.2 捕头都头且任满 730 天 · 包拯密令南下查探姑苏慕容',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_liushan',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'inSect', sectId: 'SECT-17', minRank: 2 },
            qStatus(QUEST_ID, 'not_started'),
            qStatus(QUEST_ID, 'not_completed'),
          ],
        },
        enabledWhen: { type: 'kaifengRank2DaysAtLeast', min: 730 },
        effects: [openScene('scene_kf1_01_summons', 'QST-SECT-17-MURONG-1')],
      },
      {
        id: 'spot_kf1_hanshan',
        label: '夜探古钟楼 · 截查私运兵甲密信',
        badge: '第10-15幕',
        subtitle: '探查姑苏城外兵甲流向，追踪燕子坞接头暗线',
        tone: 'primary',
        regionId: 'suzhou',
        buildingId: 'sz_hanshan',
        spotId: 'sz_hs_bell',
        visibleWhen: atStep(QUEST_ID, 'suzhou_investigate'),
        effects: [openScene('scene_kf1_10_arrive_suzhou', 'QST-SECT-17-MURONG-1')],
      },
      {
        id: 'spot_kf1_taihu_bao',
        label: '太湖渡口问舟 · 迎战包不同',
        badge: '第16-19幕',
        subtitle: '智辩并击败“非也先生”包不同，夺取太湖通行木牌',
        tone: 'danger',
        regionId: 'suzhou',
        buildingId: 'sz_taihu',
        spotId: 'sz_th_pier',
        visibleWhen: atStep(QUEST_ID, 'taihu_bao'),
        effects: [openScene('scene_kf1_16_taihu_pier', 'QST-SECT-17-MURONG-1')],
      },
      {
        id: 'spot_kf1_yanziwu_feng',
        label: '潜入听香水榭 · 力战风波恶',
        badge: '第20-24幕',
        subtitle: '夜渡燕子坞，击败巡夜家臣“一阵风”风波恶',
        tone: 'danger',
        regionId: 'yanziwu',
        buildingId: 'yzw_tingxiang',
        spotId: 'yzw_tingxiang_west',
        visibleWhen: atStep(QUEST_ID, 'yanziwu_tingxiang'),
        effects: [openScene('scene_kf1_20_enter_yanziwu', 'QST-SECT-17-MURONG-1')],
      },
      {
        id: 'spot_kf1_canhe_deng',
        label: '潜入参合秘档室 · 十合避神掌',
        badge: '第25-30幕',
        subtitle: '抄录大燕密账，并在邓百川手下撑过 10 回合跃湖逃生！',
        tone: 'danger',
        regionId: 'yanziwu',
        buildingId: 'yzw_canhe',
        spotId: 'yzw_canhe_east',
        visibleWhen: atStep(QUEST_ID, 'canhe_archive'),
        effects: [openScene('scene_kf1_25_canhe_infiltration', 'QST-SECT-17-MURONG-1')],
      },
      {
        id: 'spot_kf1_return_kaifeng',
        label: '向包拯、展昭呈交姑苏密卷',
        badge: '第31-32幕',
        subtitle: '完成《燕子坞暗影 · 姑苏密查》，解锁 Lv.3 金牌总捕晋升资格',
        tone: 'jade',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_liushan',
        visibleWhen: atStep(QUEST_ID, 'return_kaifeng_report'),
        effects: [openScene('scene_kf1_31_return_kaifeng', 'QST-SECT-17-MURONG-1')],
      },
    ],
    loadScenes: () => import('./kaifengMurongQuest1.scenes').then((m) => m.SCENES),
  },
]
