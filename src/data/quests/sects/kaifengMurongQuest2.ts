import type { QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const QUEST_ID = 'QST-SECT-17-MURONG-2'

export const KAIFENG_MURONG_QUEST_2: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '参合剑气 · 姑苏对质',
    category: 'sect_mission',
    factionId: 'SECT-17',
    regionId: 'bianliang',
    recommendedRealm: '一流中品及以上',
    maxOpponentRealm: '绝顶宗师（慕容复十合对决）',
    recommendedNote:
      '刚性前置：加入【开封府 / 六扇门】且晋升至【Lv.3 金牌总捕】、已完成《燕子坞暗影 · 姑苏密查》；后续入燕子坞须持有《太湖燕子坞烟波水路舆图》。完成奖励：赏银 +260 两 · 战斗经验 +600 · 声望 +80 · 侠义 +40 · 解锁 Lv.4 御前护卫晋升。',
    startHint:
      '晋升开封府 Lv.3 金牌总捕并完成《燕子坞暗影 · 姑苏密查》后，前往【开封府 · 开封府衙 · 开封府升堂正殿】，点击「领取晋升任务：《参合剑气 · 姑苏对质》」开启。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_court',
      customLabel: '开封府 · 开封府衙 · 开封府升堂正殿',
    },
    startCondition: {
      type: 'all',
      conditions: [
        { type: 'inSect', sectId: 'SECT-17', minRank: 3 },
        qStatus('QST-SECT-17-MURONG-1', 'completed'),
      ],
    },
    summary:
      '晋升开封府【金牌总捕】后，先于汴梁查获契丹密使口供、奉包拯与紫宸密旨再度南下姑苏。依次赴虎丘、寒山寺锁死铁证，于太湖渡口击败“江南二绝”公冶乾、于参合庄演武场正面击败“神掌震江南”邓百川，最终踏入还施水阁当面质问慕容复并与其交手十合，双方收手立约，解锁晋升【Lv.4 御前护卫】资格。',
    initialStepId: 'kaifeng_market_rumor',
    steps: {
      kaifeng_market_rumor: {
        id: 'kaifeng_market_rumor',
        title: '相国雅市，探访燕史',
        objective:
          '前往【开封府 · 大相国寺 · 相国寺万姓交易雅市】探听苏杭行商关于太湖封湖的风声，并在旧书肆查阅前朝燕史。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_market',
          customLabel: '开封府 · 大相国寺 · 相国寺万姓交易雅市',
        },
      },
      kaifeng_liushan_prep: {
        id: 'kaifeng_liushan_prep',
        title: '六扇演武，收阅密函',
        objective:
          '返回【开封府 · 开封府衙 · 六扇门捕快演武院】听展昭指点克制“斗转星移”之策，查收江南飞鸽与延州军马密报。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_kaifengfu',
          spotId: 'bl_kf_liushan',
          customLabel: '开封府 · 开封府衙 · 六扇门捕快演武院',
        },
      },
      kaifeng_fanlou_spy: {
        id: 'kaifeng_fanlou_spy',
        title: '樊楼夜巡，屋脊擒谍',
        objective:
          '前往【开封府 · 樊楼 · 三层五楼飞桥雅阁】执行御街夜巡，擒拿潜入京师的契丹密使并审出辽燕勾连口供。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_fanlou',
          spotId: 'bl_fl_towers',
          customLabel: '开封府 · 樊楼 · 三层五楼飞桥雅阁',
        },
      },
      kaifeng_court_edict: {
        id: 'kaifeng_court_edict',
        title: '升堂正殿，领旨南巡',
        objective:
          '返回【开封府 · 开封府衙 · 开封府升堂正殿】核对旧案、向包拯呈交北谍口供，正式领受紫宸密旨与鎏金金牌启程南下！',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_kaifengfu',
          spotId: 'bl_kf_court',
          customLabel: '开封府 · 开封府衙 · 开封府升堂正殿',
        },
      },
      suzhou_huqiu: {
        id: 'suzhou_huqiu',
        title: '南下姑苏，夜探虎丘',
        objective:
          '策马南下前往【姑苏城 · 虎丘剑池 · 千人石试剑台与生公亭】与陆老艄公接头，查实试剑石后山私藏飞燕铁甲暗窟。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_huqiu',
          spotId: 'sz_hq_stone',
          customLabel: '姑苏城 · 虎丘剑池 · 千人石试剑台与生公亭',
        },
      },
      suzhou_hanshan: {
        id: 'suzhou_hanshan',
        title: '寒山诗轩，火中夺账',
        objective:
          '速赴【姑苏城 · 枫桥寒山寺 · 江枫竹影听钟诗轩】，截获平江转运司贪吏正欲焚毁的五年盐铁洗钱底账。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_hanshan',
          spotId: 'sz_hs_poetry',
          customLabel: '姑苏城 · 枫桥寒山寺 · 江枫竹影听钟诗轩',
        },
      },
      suzhou_taihu_gongye: {
        id: 'suzhou_taihu_gongye',
        title: '太湖画舫，渡口战公冶',
        objective:
          '持双料铁证前往【姑苏城 · 太湖烟波渡口 · 通燕子坞锦帆画舫渡船】亮明金牌，正面击败拦路的“江南二绝”公冶乾！',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_taihu',
          spotId: 'sz_th_boat',
          customLabel: '姑苏城 · 太湖烟波渡口 · 通燕子坞锦帆画舫渡船',
        },
      },
      yanziwu_deng: {
        id: 'yanziwu_deng',
        title: '重临参合，再战邓百川',
        objective:
          '已击败公冶乾并获内坞令箭！前往【燕子坞 · 参合庄议事正厅 · 临湖九曲演武坪】堂堂正正击败“神掌震江南”邓百川。',
        nextHint:
          '须持有《太湖燕子坞烟波水路舆图》（完成奇遇《烟波三叠 · 燕子坞水图》获得）方可渡太湖进入燕子坞。',
        targetLocation: {
          regionId: 'yanziwu',
          buildingId: 'yzw_canhe',
          spotId: 'yzw_canhe_west',
          customLabel: '燕子坞 · 参合庄议事正厅 · 临湖九曲演武坪',
        },
      },
      huanshi_murong: {
        id: 'huanshi_murong',
        title: '还施水阁，十合战慕容',
        objective:
          '已击败邓百川打通内院！步入【燕子坞 · 还施水阁 · 还施水阁藏书正楼】当面质问慕容复，并在其手下撑过 10 回合，促成双方收手立约。',
        targetLocation: {
          regionId: 'yanziwu',
          buildingId: 'yzw_huanshi',
          spotId: 'yzw_huanshi_main',
          customLabel: '燕子坞 · 还施水阁 · 还施水阁藏书正楼',
        },
      },
      return_kaifeng_final: {
        id: 'return_kaifeng_final',
        title: '封存军械，北返复圣命',
        objective:
          '已与慕容复双方收手、约定后续再说，并督促苏州府封存太湖私藏兵甲！请北返【开封府 · 开封府衙 · 开封府升堂正殿】向包拯、展昭复命。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_kaifengfu',
          spotId: 'bl_kf_court',
          customLabel: '开封府 · 开封府衙 · 开封府升堂正殿',
        },
      },
    },
    spotActions: [
      {
        id: 'spot_kf2_start',
        label: '领取晋升任务：《参合剑气 · 姑苏对质》',
        badge: 'Lv.3→Lv.4 晋升',
        subtitle: '需开封府 Lv.3 金牌总捕且完成《燕子坞暗影》 · 奉密旨再查姑苏慕容氏',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'inSect', sectId: 'SECT-17', minRank: 3 },
            qStatus('QST-SECT-17-MURONG-1', 'completed'),
            qStatus(QUEST_ID, 'not_started'),
            qStatus(QUEST_ID, 'not_completed'),
          ],
        },
        effects: [openScene('scene_kf2_01_start', 'QST-SECT-17-MURONG-2')],
      },
      {
        id: 'spot_kf2_kaifeng_market',
        label: '茶棚听风声 · 旧书肆翻检燕史',
        badge: '第6-8幕',
        subtitle: '探听苏杭丝商关于太湖封湖的传闻，考证鲜卑慕容氏兴复执念',
        tone: 'primary',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        visibleWhen: atStep(QUEST_ID, 'kaifeng_market_rumor'),
        effects: [openScene('scene_kf2_06_merchant_rumor', 'QST-SECT-17-MURONG-2')],
      },
      {
        id: 'spot_kf2_kaifeng_liushan',
        label: '演武坪问剑展昭 · 核验江南延州密报',
        badge: '第9-13幕',
        subtitle: '向展昭请教克制“斗转星移”之法，拆阅太湖飞鸽与西夏良马暗账，淬砺佩剑',
        tone: 'primary',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_liushan',
        visibleWhen: atStep(QUEST_ID, 'kaifeng_liushan_prep'),
        effects: [openScene('scene_kf2_09_zhanzhao_tip', 'QST-SECT-17-MURONG-2')],
      },
      {
        id: 'spot_kf2_kaifeng_fanlou',
        label: '樊楼飞檐夜巡 · 追擒契丹密使',
        badge: '第14-16幕',
        subtitle: '于夜市识破草原暗探，屋脊擒贼搜出燕字紫檀牌并密审口供',
        tone: 'danger',
        regionId: 'bianliang',
        buildingId: 'bl_fanlou',
        spotId: 'bl_fl_towers',
        visibleWhen: atStep(QUEST_ID, 'kaifeng_fanlou_spy'),
        effects: [openScene('scene_kf2_14_bianliang_watch', 'QST-SECT-17-MURONG-2')],
      },
      {
        id: 'spot_kf2_kaifeng_edict',
        label: '呈报北谍口供 · 恭领紫宸密旨南巡',
        badge: '第17-23幕',
        subtitle: '核对架阁库八年旧案，奉包拯鎏金金牌与紫宸密旨正式启程南下姑苏',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        visibleWhen: atStep(QUEST_ID, 'kaifeng_court_edict'),
        effects: [openScene('scene_kf2_17_archive_check', 'QST-SECT-17-MURONG-2')],
      },
      {
        id: 'spot_kf2_suzhou_huqiu',
        label: '接头陆老艄公 · 夜探试剑石兵甲暗窟',
        badge: '第24-25幕',
        subtitle: '查实虎丘后山石窟内烙有飞燕暗印的冷锻重甲与破甲长矛',
        tone: 'primary',
        regionId: 'suzhou',
        buildingId: 'sz_huqiu',
        spotId: 'sz_hq_stone',
        visibleWhen: atStep(QUEST_ID, 'suzhou_huqiu'),
        effects: [openScene('scene_kf2_24_suzhou_briefing', 'QST-SECT-17-MURONG-2')],
      },
      {
        id: 'spot_kf2_suzhou_hanshan',
        label: '夜闯江枫诗轩 · 夺下焚毁前盐铁底账',
        badge: '第26-27幕',
        subtitle: '人赃并获拿下平江转运司蛀虫，获悉公冶乾亲自坐镇封锁太湖水路',
        tone: 'primary',
        regionId: 'suzhou',
        buildingId: 'sz_hanshan',
        spotId: 'sz_hs_poetry',
        visibleWhen: atStep(QUEST_ID, 'suzhou_hanshan'),
        effects: [openScene('scene_kf2_26_hanshan_ledger', 'QST-SECT-17-MURONG-2')],
      },
      {
        id: 'spot_kf2_taihu_gongye',
        label: '持证亮明金牌 · 烟波画舫死战公冶乾',
        badge: '第28-32幕',
        subtitle: '于太湖渡口画舫正面击败“江南二绝”公冶乾，夺取参合庄内坞令箭',
        tone: 'danger',
        regionId: 'suzhou',
        buildingId: 'sz_taihu',
        spotId: 'sz_th_boat',
        visibleWhen: atStep(QUEST_ID, 'suzhou_taihu_gongye'),
        effects: [openScene('scene_kf2_28_taihu_blockade', 'QST-SECT-17-MURONG-2')],
      },
      {
        id: 'spot_kf2_canhe_deng',
        label: '重临参合演武场 · 再战邓百川',
        badge: '第33-39幕',
        subtitle: '亮出金牌堂堂正正登门，正面击败“神掌震江南”邓百川',
        tone: 'danger',
        regionId: 'yanziwu',
        buildingId: 'yzw_canhe',
        spotId: 'yzw_canhe_west',
        visibleWhen: atStep(QUEST_ID, 'yanziwu_deng'),
        effects: [openScene('scene_kf2_33_return_to_yanziwu', 'QST-SECT-17-MURONG-2')],
      },
      {
        id: 'spot_kf2_huanshi_murong',
        label: '步入还施水阁 · 质问并十合战慕容复',
        badge: '第40-49幕',
        subtitle: '当面质问慕容复谋逆之嫌，交手撑过 10 回合，双方收手约定后续再说',
        tone: 'danger',
        regionId: 'yanziwu',
        buildingId: 'yzw_huanshi',
        spotId: 'yzw_huanshi_main',
        visibleWhen: atStep(QUEST_ID, 'huanshi_murong'),
        effects: [openScene('scene_kf2_40_enter_huanshi', 'QST-SECT-17-MURONG-2')],
      },
      {
        id: 'spot_kf2_return_kaifeng',
        label: '向包拯呈交姑苏对质密卷',
        badge: '第50-52幕',
        subtitle: '完成《参合剑气 · 姑苏对质》，解锁 Lv.4 御前护卫晋升资格',
        tone: 'jade',
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        visibleWhen: atStep(QUEST_ID, 'return_kaifeng_final'),
        effects: [openScene('scene_kf2_50_northbound_dispatch', 'QST-SECT-17-MURONG-2')],
      },
    ],
    loadScenes: () => import('./kaifengMurongQuest2.scenes').then((m) => m.SCENES),
  },
]
