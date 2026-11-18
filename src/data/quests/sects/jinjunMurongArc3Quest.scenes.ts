import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, toast } from '../../../engine/quest/dsl'
import { JINJUN_MURONG_ARC_3_ID } from './jinjunMurongArc3Quest'

const SCENE_01: StorySceneDef = {
  id: 'scene_jj_mr3_01_healed_breakthrough',
  title: '第一幕 · 伤愈破立',
  subtitle: '开封府 · 静室出关',
  mandatory: true,
  beats: [
    N('闭门调息整整三十日，借着少林大还丹药力与宫中秘藏《太玄经》的太古玄理，你终于将盘踞经脉的残余参合指劲彻底炼化归元！出关之日，只觉周身真气圆融无碍，武艺较之少室山前更进一层，破而后立！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_02_privy_edict', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_02: StorySceneDef = {
  id: 'scene_jj_mr3_02_privy_edict',
  title: '第二幕 · 枢密院调令',
  subtitle: '开封府 · 枢密院签押房',
  mandatory: true,
  beats: [
    N('方才踏出府门，枢密院南征调令已至！王德用将沉甸甸的三千兵符交到你手中，黑面之上杀意凛然：'),
    S('NPC-0038', '“官家圣旨已下！命你即刻统领三千殿前司精锐禁军南下两浙路平江府，彻底铲除姑苏慕容氏逆党！无论那慕容老贼有何通天手段，三千铁甲之下，定叫他百年基业化作飞灰！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_03_muster_3000', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_03: StorySceneDef = {
  id: 'scene_jj_mr3_03_muster_3000',
  title: '第三幕 · 三千铁甲南征',
  subtitle: '开封府 · 八十万禁军大教场',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc3_muster_3000.jpg',
  illustrationCaption: '东京汴梁校场 · 统领三千精锐禁军祭旗南下太湖',
  beats: [
    N('八十万禁军大教场鼓角齐鸣，三千步骑精锐甲光映日、杀气直冲霄汉！你立于点兵帅台，接过御酒洒地祭旗，随后挥兵南下，沿大运河水陆并进直扑江南两浙路平江府！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_04_arrive_suzhou', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_04: StorySceneDef = {
  id: 'scene_jj_mr3_04_arrive_suzhou',
  title: '第四幕 · 兵临平江府',
  subtitle: '苏州府 · 城外大营',
  mandatory: true,
  beats: [
    N('十余日后，三千禁军悄然驻扎于苏州城外。你并未急着率军闯入茫茫太湖，而是先召来苏州知州与当地厢军都监密议，调出平江府近十年的田赋水运图册。'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_05_outer_wings_plan', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_05: StorySceneDef = {
  id: 'scene_jj_mr3_05_outer_wings_plan',
  title: '第五幕 · 先剪外围羽翼',
  subtitle: '苏州府 · 中军帅帐',
  mandatory: true,
  beats: [
    P('（指尖点在苏州城西一处隐秘水湾，冷笑开口）“慕容氏在太湖经营数代，燕子坞孤悬湖中，若直接乘船强攻，必受其外围粮草接应与陆上私兵牵制。传令全军：今夜先以雷霆之势合围慕容氏设在苏州城外的秘密钱粮漕仓与私造兵坊！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_MURONG_ARC_3_ID, stepId: 'suzhou_granary_raid' },
    toast('请前往【苏州平江府衙（suzhou_base_yamen）】协同官兵合围慕容氏秘密漕仓与私造兵坊！'),
  ],
}

const SCENE_06: StorySceneDef = {
  id: 'scene_jj_mr3_06_suzhou_surround',
  title: '第六幕 · 合围秘密仓坊',
  subtitle: '苏州府 · 慕容秘密漕仓',
  mandatory: true,
  beats: [
    N('夜色如墨，三千禁军如铁桶般合围了这座伪装成江南巨商米栈的高墙大院。破门而入刹那，院内火光骤亮——数十座铁匠炉正在连夜赶工锻造弩机部件，成箱的玄铁箭簇堆砌如山！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_07_gongye_qian_appears', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_07: StorySceneDef = {
  id: 'scene_jj_mr3_07_gongye_qian_appears',
  title: '第七幕 · 赤霞庄主率众死战',
  subtitle: '苏州府 · 私造兵坊前院',
  mandatory: true,
  beats: [
    S('NPC-0161', '（慕容氏四大家将之“赤霞庄”庄主公冶乾双掌赤红，率数十名庄客死士冲出正厅）“朝廷官兵竟摸到了此处！庄中弟兄听令——随老夫杀出一条血路，绝不能让朝廷拿走半张弓图！”'),
    P('（横兵挡于院门正中，冷喝道）“公冶乾，你私造军械、仿制神臂弓，罪证如山！还不下马受缚！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_08_palms_vs_iron', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_08: StorySceneDef = {
  id: 'scene_jj_mr3_08_palms_vs_iron',
  title: '第八幕 · 掌风难撼铁甲流',
  subtitle: '苏州府 · 兵坊激战',
  mandatory: true,
  beats: [
    N('公冶乾乃江南成名掌法大家，掌风炽烈如火，接连劈倒几名冲在最前的军卒；然而三千禁军结阵如山，长枪攒刺、强弩压阵，庄客死士瞬息间死伤殆尽，唯余公冶乾孤身困斗！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_09_capture_gongye', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_09: StorySceneDef = {
  id: 'scene_jj_mr3_09_capture_gongye',
  title: '第九幕 · 阵前生擒公冶乾',
  subtitle: '苏州府 · 私造兵坊（1v1 剧情战）',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc3_gongye_qian.jpg',
  illustrationCaption: '苏州秘密兵坊 · 铁甲合围生擒赤霞庄主公冶乾',
  beats: [
    N('你挥手示意弓弩手暂退，亲自踏步上前迎向公冶乾：“慕容四大家将，今日便先拿你开刀！”'),
  ],
  choices: [
    {
      id: 'jjmr3_vs_gongye',
      label: '阵前力挫并生擒公冶乾！（1v1 剧情战）',
      subLabel: '实战考验：击败一流中品公冶乾',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_MURONG_ARC_3_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0161',
            talkOverride: '“老夫江南公冶乾，岂会束手就擒！接掌！”',
          },
          rule: 'story_trial',
          forbidEscapeReason: '三千大军合围仓坊，岂能放跑首恶！',
          introText: '【1v1 苏州擒将】迎战慕容氏“赤霞庄”庄主【公冶乾】！',
          onWin: [openScene('scene_jj_mr3_10_burn_outpost', JINJUN_MURONG_ARC_3_ID)],
          onLose: [toast('公冶乾掌风炽烈，且退后重整内息再擒！')],
        },
      ],
    },
  ],
}

const SCENE_10: StorySceneDef = {
  id: 'scene_jj_mr3_10_burn_outpost',
  title: '第十幕 · 焚毁据点追部件',
  subtitle: '苏州府 · 兵坊余烬',
  mandatory: true,
  beats: [
    N('你以《太玄经》沉浑内劲震散公冶乾护体掌风，将其擒下锁入囚车！亲卫从兵坊内追回部分已被拆解仿制的神臂弓弩臂与铜机部件，随后一把火将慕容氏外围漕仓与兵坊彻底焚毁！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_11_requisition_boats', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_11: StorySceneDef = {
  id: 'scene_jj_mr3_11_requisition_boats',
  title: '第十一幕 · 征调太湖大船',
  subtitle: '苏州府 · 太湖渡口',
  mandatory: true,
  beats: [
    N('拔除外围羽翼后，你下令征调平江府官船与大型商舶五十余艘，于太湖烟波渡口集结。三千精锐禁军分乘战船，准备杀入五湖深处直捣燕子坞！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_12_sail_into_mist', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_12: StorySceneDef = {
  id: 'scene_jj_mr3_12_sail_into_mist',
  title: '第十二幕 · 浩荡杀入太湖',
  subtitle: '苏州府 · 太湖烟波渡口',
  mandatory: true,
  beats: [
    N('号角长鸣，五十余艘大船升起巨帆，载着三千铁甲禁军破浪驶向烟波浩渺的太湖深处！'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_MURONG_ARC_3_ID, stepId: 'taihu_naval_battle' },
    toast('请前往【太湖烟波渡口 · 通燕子坞锦帆画舫渡船（sz_th_boat）】指挥千帆入湖激战！'),
  ],
}

const SCENE_13: StorySceneDef = {
  id: 'scene_jj_mr3_13_board_ships',
  title: '第十三幕 · 五湖浓雾骤起',
  subtitle: '太湖湖心 · 浓雾锁江',
  mandatory: true,
  beats: [
    N('船队行至五湖烟波深处，四周水天一色，忽有一阵诡异的浓白大雾自湖面翻涌而起，十步之外竟难辨人影！正当各船水手慌忙敲锣联络之际，船底突然传来“咚！咚！咚！”密集而沉闷的凿击声！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_14_hull_breached', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_14: StorySceneDef = {
  id: 'scene_jj_mr3_14_hull_breached',
  title: '第十四幕 · 水鬼凿船沉甲',
  subtitle: '太湖湖心 · 官船进水',
  mandatory: true,
  beats: [
    N('“不好！船底漏水了！”凄厉呼喊声四起！原来慕容家早就在太湖蓄养了大批水性极佳的精锐“水鬼”死士，此刻正潜伏水底以钢凿穿破官船船板！更有数十名浑身涂油的水鬼破水而出，专抓船舷边禁军士卒双腿将其拖入湖底！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_15_red_lake_casualties', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_15: StorySceneDef = {
  id: 'scene_jj_mr3_15_red_lake_casualties',
  title: '第十五幕 · 铁甲沉渊惨烈',
  subtitle: '太湖湖心 · 血染太湖',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc3_taihu_water_ghosts.jpg',
  illustrationCaption: '太湖五湖浓雾 · 慕容水鬼凿船拖兵血染碧波',
  beats: [
    N('北方禁军士卒大多不谙水性，身披数十斤重的步人铁甲一旦落水便如秤砣般直沉湖底！一时间五六艘官船缓缓倾覆，惨叫声震耳欲聋，碧绿太湖水瞬间被染成触目惊心的殷红，大军未曾登岸便已折损近千人！'),
    P('（紧握主舰船舵，双目赤红如血，拔刀怒吼）“各船弓弩手向水花翻涌处攒射！水手以长篙拒敌！稳住阵脚，绝不可乱！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_16_fast_boats_ram', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_16: StorySceneDef = {
  id: 'scene_jj_mr3_16_fast_boats_ram',
  title: '第十六幕 · 快艇撞击主舰',
  subtitle: '太湖湖心 · 主舰甲板',
  mandatory: true,
  beats: [
    N('混乱之中，七八艘狭长快艇如离弦之箭冲破浓雾狠狠撞上你的主舰船腹！铁钩飞抓搭上船舷，数十名水寨死士在两道矫健身影率领下嚎叫着跳帮杀上甲板！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_17_bao_feng_board', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_17: StorySceneDef = {
  id: 'scene_jj_mr3_17_bao_feng_board',
  title: '第十七幕 · 非也非也战阵风',
  subtitle: '太湖湖心 · 主舰甲板',
  mandatory: true,
  beats: [
    S('NPC-0213', '（包不同青衫飘动跃上船头，摇着头怪叫）“非也！非也！宋廷官兵好不知趣，北方旱鸭子也敢跑来太湖送死！”'),
    S('NPC-0214', '（风波恶提刀紧随其后大笑）“三哥别废话，擒贼先擒王！剁了这三衙都虞候，官船群龙无首自溃！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_18_deck_1v2_duel', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_18: StorySceneDef = {
  id: 'scene_jj_mr3_18_deck_1v2_duel',
  title: '第十八幕 · 甲板独斗包风',
  subtitle: '太湖湖心 · 1v2 剧情战',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc3_bao_feng_deck.jpg',
  illustrationCaption: '狂涛摇晃主舰甲板 · 独斗包不同与风波恶联手',
  beats: [
    N('主舰船身在风浪与撞击下剧烈摇晃，包不同掌法奇诡、风波恶刀势狂猛，二人一左一右扑杀而来！你脚踏千斤坠稳住身形，冷喝一声迎战双雄！'),
  ],
  choices: [
    {
      id: 'jjmr3_vs_baofeng',
      label: '甲板独斗包不同、风波恶联手！（1v2 剧情战）',
      subLabel: '实战考验：同时击败包不同与风波恶',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_MURONG_ARC_3_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0213',
            talkOverride: '“非也非也！接包三爷一掌！”',
          },
          extraOpponents: [
            {
              kind: 'npc',
              npcId: 'NPC-0214',
              talkOverride: '“汴河账还没算完，今日在太湖把你劈成两半！”',
            },
          ],
          rule: 'story_trial',
          forbidEscapeReason: '主舰甲板乃全军中枢，一旦退缩全军必溃！',
          introText: '【1v2 甲板擒王战】迎战慕容氏家将【包不同】与【风波恶】！',
          onWin: [openScene('scene_jj_mr3_19_chain_bao_feng', JINJUN_MURONG_ARC_3_ID)],
          onLose: [toast('船身摇晃二人配合刁钻，且重整架势再战！')],
        },
      ],
    },
  ],
}

const SCENE_19: StorySceneDef = {
  id: 'scene_jj_mr3_19_chain_bao_feng',
  title: '第十九幕 · 铁索穿骨水鬼散',
  subtitle: '太湖湖心 · 主舰甲板',
  mandatory: true,
  beats: [
    N('刀光剑影交错间，你以深厚内功稳稳压住船身晃动，悍勇绝伦连出重手将包不同与风波恶双双震倒甲板！亲卫一拥而上，以精铁锁链穿住二人琵琶骨死死锁拿！水底水鬼见主将落网，顿时军心溃散，纷纷潜入深水逃窜！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_20_forced_landing', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_20: StorySceneDef = {
  id: 'scene_jj_mr3_20_forced_landing',
  title: '第二十幕 · 强登燕子坞',
  subtitle: '太湖燕子坞 · 岸边',
  mandatory: true,
  beats: [
    N('你稳住军心、整顿余下的两千多名百战禁军，乘残存大船全速靠岸，顶着箭雨强行踏上了慕容氏百年老巢——【太湖燕子坞】！'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_MURONG_ARC_3_ID, stepId: 'storm_tingxiang_bridge' },
    { type: 'teleportPlayer', regionId: 'yanziwu', buildingId: 'yzw_tingxiang', spotId: 'yzw_tingxiang_main' },
    toast('已强行登陆燕子坞！请攻克【听香水榭主阁（yzw_tingxiang_main）】，生擒四大家将之首邓百川！'),
  ],
}

const SCENE_21: StorySceneDef = {
  id: 'scene_jj_mr3_21_garden_traps',
  title: '第二十一幕 · 园林曲径杀机',
  subtitle: '太湖燕子坞 · 假山竹林',
  mandatory: true,
  beats: [
    N('燕子坞内亭台水榭错落、假山竹林掩映，大军长枪方阵极难展开！慕容氏世代蓄养的死士依托园林曲径与暗道机关层层设伏，毒箭、绊索、滚木齐发，每夺取一处院落都伴随着惨烈的血战与伤亡！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_22_advance_tingxiang', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_22: StorySceneDef = {
  id: 'scene_jj_mr3_22_advance_tingxiang',
  title: '第二十二幕 · 踏血推进水榭',
  subtitle: '太湖燕子坞 · 听香水榭外围',
  mandatory: true,
  beats: [
    N('血战半个时辰，禁军工兵硬生生以盾牌木桩拆毁机关暗道，踏着满地尸骸将战线推进至核心水湾——听香水榭曲桥前！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_23_deng_baichuan_blocks', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_23: StorySceneDef = {
  id: 'scene_jj_mr3_23_deng_baichuan_blocks',
  title: '第二十三幕 · 邓百川死卡桥头',
  subtitle: '太湖燕子坞 · 听香水榭曲桥',
  mandatory: true,
  beats: [
    S('NPC-0145', '（四大家将之首“青云庄”庄主邓百川身披血染青袍，率最后数十名忠心护卫死死堵在咽喉桥头）“二弟、三弟、四弟皆已落网……然老夫身为慕容家将之首，今日即便粉身碎骨，也要为公子与老太爷争取烧毁机密的时间！”'),
    P('（拭去面颊血迹，提兵踏上曲桥）“忠于叛党，愚不可及！今日便送你们四兄弟狱中团聚！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_24_bridge_carnage', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_24: StorySceneDef = {
  id: 'scene_jj_mr3_24_bridge_carnage',
  title: '第二十四幕 · 血战曲桥',
  subtitle: '太湖燕子坞 · 听香水榭主阁',
  mandatory: true,
  beats: [
    N('曲桥狭窄仅容数人并行，慕容护卫拼死悍不畏死，禁军前排盾手亦浴血猛进！乱军之中，邓百川浑厚绝伦的掌力震翻数名校尉，直向你扑杀而来！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_25_defeat_deng_baichuan', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_25: StorySceneDef = {
  id: 'scene_jj_mr3_25_defeat_deng_baichuan',
  title: '第二十五幕 · 生擒邓百川',
  subtitle: '太湖燕子坞 · 听香水榭（1v1 一流上品）',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc3_deng_baichuan.jpg',
  illustrationCaption: '听香水榭曲桥 · 踏血击溃并生擒四大家将之首邓百川',
  beats: [
    N('你踏血而上，独自迎战四大家将之首、一流上品高手邓百川！'),
  ],
  choices: [
    {
      id: 'jjmr3_vs_deng',
      label: '正面击溃并生擒“青云庄”邓百川！（1v1 一流上品）',
      subLabel: '实战考验：击败一流上品邓百川，全擒慕容四大家将',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_MURONG_ARC_3_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0145',
            talkOverride: '“青云庄邓百川在此！想过此桥，先踏过老夫尸首！”',
          },
          rule: 'story_trial',
          forbidEscapeReason: '慕容父子近在咫尺，岂可停步！',
          introText: '【1v1 桥头擒首】迎战慕容四大家将之首【邓百川】！',
          onWin: [openScene('scene_jj_mr3_26_four_retainers_caged', JINJUN_MURONG_ARC_3_ID)],
          onLose: [toast('邓百川掌力沉厚，且退后重整内息再攻！')],
        },
      ],
    },
  ],
}

const SCENE_26: StorySceneDef = {
  id: 'scene_jj_mr3_26_four_retainers_caged',
  title: '第二十六幕 · 四大家将尽入囚笼',
  subtitle: '太湖燕子坞 · 听香水榭',
  mandatory: true,
  beats: [
    N('历经惨烈搏杀，邓百川终被你一招制住肩井穴生擒活捉！至此，威震江南的姑苏慕容氏“邓、公冶、包、风”四大家将已尽数落入大宋禁军囚笼！'),
    N('余下的一千余名百战禁军此时已彻底杀红了眼，撞碎重重朱漆门户，火把连成火龙，向着燕子坞最后的核心——【参合堂】狂涌而去！'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_MURONG_ARC_3_ID, stepId: 'canhe_hall_showdown' },
    toast('四大家将尽数落网！请率千名百战禁军合围【参合庄正堂议事厅（yzw_canhe_main）】决战慕容父子！'),
  ],
}

const SCENE_27: StorySceneDef = {
  id: 'scene_jj_mr3_27_canhe_surrounded',
  title: '第二十七幕 · 参合堂火盆焚册',
  subtitle: '太湖燕子坞 · 参合庄正堂',
  mandatory: true,
  beats: [
    N('上千支火把照亮太湖夜空，将参合堂里三层外三层围得水泄不通！大堂之内三只铜制火盆烈焰升腾，历代慕容氏图谋复国的密信与账册正在火焰中化为黑灰。'),
    N('慕容博负手立于堂前，神色阴鸷如鬼；伤势初愈的慕容复持剑护在父亲身侧，双目布满血丝。'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_28_murong_bo_regret', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_28: StorySceneDef = {
  id: 'scene_jj_mr3_28_murong_bo_regret',
  title: '第二十八幕 · 老贼悔留一命',
  subtitle: '太湖燕子坞 · 参合堂',
  mandatory: true,
  beats: [
    S('NPC-0104', '（慕容博死死盯着踏着满庄尸骸走入堂前的你，声音森寒入骨）“好一个殿前司三衙都虞候！老夫当日在少室山留你一命，不想短短一月之后，你竟亲手葬送了我大燕百年基业！”'),
    P('（缓缓挺起手中长兵，周身《太玄经》内力如江海澎湃）“乱臣贼子，人人得而诛之！慕容博，少室山三合之辱，今日便在参合堂连本带利一并算清！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_29_all_out_strike', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_29: StorySceneDef = {
  id: 'scene_jj_mr3_29_all_out_strike',
  title: '第二十九幕 · 乱军合围前先毙主帅',
  subtitle: '太湖燕子坞 · 参合堂',
  mandatory: true,
  beats: [
    N('话音未落，慕容博已再度全力出手！他深知一旦外围千名禁军撞破院墙列弩齐射，纵是宗师也必死无疑，唯有在乱军合围前抢先毙杀你这主帅，方有一线生机！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_30_five_rounds_showdown', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_30: StorySceneDef = {
  id: 'scene_jj_mr3_30_five_rounds_showdown',
  title: '第三十幕 · 参合堂终战五合',
  subtitle: '太湖燕子坞 · 参合堂（宗师上品 · 撑满五合）',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc3_canhe_five_rounds.jpg',
  illustrationCaption: '参合堂火光冲天 · 正面硬撼宗师上品慕容博五轮绝杀',
  beats: [
    N('比起少室山时的仓促狼狈，历经《太玄经》破而后立的你此刻气机绵密、进退如山！任凭慕容博参合指风与斗转星移如狂涛骇浪般扑来，你挺兵死战，势要在正面交锋中硬生生接下他五轮绝杀！'),
  ],
  choices: [
    {
      id: 'jjmr3_survive_murongbo_5',
      label: '挺兵迎战！硬撼宗师上品慕容博五轮绝杀（撑满 5 回合或击倒）',
      subLabel: '终章高潮：在慕容博全力猛攻下稳住阵脚撑满 5 个回合！',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_MURONG_ARC_3_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0104',
            talkOverride: '“死来！老夫倒要看看，短短一月你能长进多少！”',
          },
          rule: 'survive_rounds',
          maxRounds: 5,
          forbidEscapeReason: '参合堂外千军正在破墙合围，主帅岂能退避半分！',
          introText: '【5回合终极对决】迎战宗师上品【慕容博】，撑过五轮绝杀不露败象！',
          onWin: [openScene('scene_jj_mr3_31_unbroken_defense', JINJUN_MURONG_ARC_3_ID)],
          onDraw: [openScene('scene_jj_mr3_31_unbroken_defense', JINJUN_MURONG_ARC_3_ID)],
          onLose: [toast('慕容博全力绝杀凶险异常！且调息服药后再行死战撑满五合！')],
        },
      ],
    },
  ],
}

const SCENE_31: StorySceneDef = {
  id: 'scene_jj_mr3_31_unbroken_defense',
  title: '第三十一幕 · 五合不露败象',
  subtitle: '太湖燕子坞 · 参合堂',
  mandatory: true,
  beats: [
    N('五轮惊天动地的正面硬撼过后，参合堂梁柱震颤、火盆火星漫天飞舞！你足下青砖虽已碎裂成粉，身形却稳如磐石、竟丝毫不露败象！慕容博久攻不下，心中第一次涌起深深的骇然！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_32_crossbow_wall', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_32: StorySceneDef = {
  id: 'scene_jj_mr3_32_crossbow_wall',
  title: '第三十二幕 · 千军破墙强弩齐瞄',
  subtitle: '太湖燕子坞 · 参合堂庭院',
  mandatory: true,
  beats: [
    N('“轰隆”一声巨响！堂外甲叶齐鸣，“万胜”怒吼声震落屋瓦！上千名百战禁军撞破院墙汹涌而入，前排长枪如林死死封死所有门窗去路，后排数百张神臂强弩齐齐举起瞄准大堂中央，森冷箭簇在火光下令人胆寒！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_33_heaven_destroys_yan', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_33: StorySceneDef = {
  id: 'scene_jj_mr3_33_heaven_destroys_yan',
  title: '第三十三幕 · 天亡大燕',
  subtitle: '太湖燕子坞 · 参合堂后壁',
  mandatory: true,
  beats: [
    N('慕容博环顾四周，深知血肉之躯纵有通天彻地之能，陷入千军万马的强弩攒射亦是十死无生！这位筹谋一生的鲜卑遗老仰天发出悲凉长叹：'),
    S('NPC-0104', '“天亡大燕！天亡大燕啊！复儿，走！”'),
    N('话音落处，慕容博猛地双掌齐出震塌后堂临湖木壁，一把挟起咬牙切齿、满心不甘的慕容复，父子二人借着浓烟滚滚纵身跃入茫茫太湖暗流之中，借助预先藏于水下的逃生暗道瞬间消失在夜色里！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_34_remnants_surrender', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_34: StorySceneDef = {
  id: 'scene_jj_mr3_34_remnants_surrender',
  title: '第三十四幕 · 残部崩溃投降',
  subtitle: '太湖燕子坞 · 参合庄',
  mandatory: true,
  beats: [
    N('随着慕容父子败逃无踪，燕子坞内残存的死士家丁彻底丧失斗志，纷纷丢下兵刃跪地请降。你下令封锁全庄、逐屋清点查抄！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_35_recover_crossbows', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_35: StorySceneDef = {
  id: 'scene_jj_mr3_35_recover_crossbows',
  title: '第三十五幕 · 悉数追回神臂弓',
  subtitle: '太湖燕子坞 · 密库',
  mandatory: true,
  beats: [
    N('很快，亲兵在参合堂地下密室内悉数起获被盗的【神臂弓全套总图】、三具原封不动的定型样弩以及【火药箭秘方】！大宋军器监失窃之重器，终得以完璧归赵！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_36_huanshi_library', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_36: StorySceneDef = {
  id: 'scene_jj_mr3_36_huanshi_library',
  title: '第三十六幕 · 接管还施水阁 · 火照太湖',
  subtitle: '太湖燕子坞 · 还施水阁',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc3_yanziwu_ablaze.jpg',
  illustrationCaption: '太湖夜空火光冲天 · 接管还施水阁起获玉玺印与参合指秘籍',
  beats: [
    N('禁军兵不血刃地接管了慕容氏搜罗天下武学的【还施水阁】与满库金银粮秣。你在还施水阁紫檀密匣中，亲自起获了慕容氏私藏的复国信物——【姑苏慕容家传玉玺印】，以及一卷详录慕容博毕生精义的【参合指秘籍】！'),
    N('随后一声令下，熊熊大火自燕子坞冲天而起，火光映红了半边太湖夜空！威震江南百年的“南慕容”基业，自此灰飞烟灭！'),
  ],
  onFinishEffects: [
    { type: 'giveItem', itemId: 'ACC-008', qty: 1 },
    { type: 'teachMartialArt', artId: 'MA-025', level: 1 },
    openScene('scene_jj_mr3_37_escort_north', JINJUN_MURONG_ARC_3_ID),
  ],
}

const SCENE_37: StorySceneDef = {
  id: 'scene_jj_mr3_37_escort_north',
  title: '第三十七幕 · 四辆囚车北返',
  subtitle: '江南官道 · 押囚凯旋',
  mandatory: true,
  beats: [
    N('翌日清晨，你率军押解着囚禁邓百川、公冶乾、包不同、风波恶的四辆重铁囚车，连同追回的神臂弓与满船抄没银两浩荡北返东京汴梁。沿途州府百姓夹道欢呼，声震江淮！'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_MURONG_ARC_3_ID, stepId: 'kaifeng_treason_execution' },
    { type: 'teleportPlayer', regionId: 'bianliang', buildingId: 'bl_kaifengfu', spotId: 'bl_kf_court' },
    toast('已押囚凯旋归抵【开封府升堂正殿（bl_kf_court）】！请以谋反罪公开处斩慕容四大家将！'),
  ],
}

const SCENE_38: StorySceneDef = {
  id: 'scene_jj_mr3_38_triumph_kaifeng',
  title: '第三十八幕 · 开封府三堂会审',
  subtitle: '开封府 · 升堂正殿',
  mandatory: true,
  beats: [
    N('开封府升堂正殿内威严肃穆，包拯端坐明镜高悬匾额之下，枢密使王德用与御猫展昭分列左右。邓百川、公冶乾、包不同、风波恶四人被铁链锁跪于堂下，面对军器监胥吏供词、私造神臂弓部件与【姑苏慕容家传玉玺印】等铁证，百口莫辩！'),
    S('NPC-0013', '（包拯惊堂木重重一拍，正气凛然高声宣判）“姑苏慕容氏盗窃国器、杀害武官、私藏传国玉玺图谋大逆，人赃并获！今依大宋律例，判邓百川、公冶乾、包不同、风波恶四名谋反首从，午时三刻押赴东京市曹刑场——斩立决！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr3_39_public_execution', JINJUN_MURONG_ARC_3_ID)],
}

const SCENE_39: StorySceneDef = {
  id: 'scene_jj_mr3_39_public_execution',
  title: '第三十九幕 · 市曹斩四将',
  subtitle: '开封府 · 东京市曹刑场',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc3_kaifeng_execution.jpg',
  illustrationCaption: '午时三刻东京市曹 · 以谋反罪公开处斩慕容四大家将',
  beats: [
    N('午时三刻，烈日高悬。东京市曹刑场周围万民空巷，百余名刀斧禁军肃立戒严。随着监斩官手中红漆令箭掷落尘埃，四柄鬼头大刀寒光同时闪过——'),
    N('“邓百川、公冶乾、包不同、风波恶，谋反伏法，当众正典刑！”四颗头颅滚落刑台，满场百姓齐声叫好！'),
  ],
  onFinishEffects: [
    { type: 'markNpcsDead', npcIds: ['NPC-0145', 'NPC-0161', 'NPC-0213', 'NPC-0214'] },
    openScene('scene_jj_mr3_40_wolves_in_shadow', JINJUN_MURONG_ARC_3_ID),
  ],
}

const SCENE_40: StorySceneDef = {
  id: 'scene_jj_mr3_40_wolves_in_shadow',
  title: '第四十幕 · 威震朝野 · 边关暗狼',
  subtitle: '开封府 · 尾声',
  mandatory: true,
  beats: [
    N('破燕一役大获全胜，你亲手追回破辽神臂弓、平定燕子坞、押解处斩慕容四大家将，一时间威震朝野、圣眷隆厚！'),
    N('然而在万里之外的西夏与大辽阴影之中，家破人亡、远遁他乡的慕容博与慕容复父子，正怀着刻骨仇恨舔舐伤口，成为日后边关烽火里潜伏的恶狼……属于大宋禁军三衙都虞候的铁血征途，仍在继续。'),
  ],
  onFinishEffects: [
    { type: 'giveSilver', amount: 1500 },
    { type: 'giveCombatExp', amount: 4500 },
    { type: 'modifyRenown', delta: 80 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0001' }, delta: 20 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0038' }, delta: 20 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0013' }, delta: 15 },
    { type: 'addSectContribution', amount: 300 },
    { type: 'completeQuest', questId: JINJUN_MURONG_ARC_3_ID, outcome: 'completed' },
    toast('《破燕 · 叁 · 血染太湖》完成！获【姑苏慕容家传玉玺印】、【参合指】秘籍、纹银 1500 两、战斗经验 4500！慕容四大家将已于开封府伏法！'),
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_jj_mr3_01_healed_breakthrough: SCENE_01,
  scene_jj_mr3_02_privy_edict: SCENE_02,
  scene_jj_mr3_03_muster_3000: SCENE_03,
  scene_jj_mr3_04_arrive_suzhou: SCENE_04,
  scene_jj_mr3_05_outer_wings_plan: SCENE_05,
  scene_jj_mr3_06_suzhou_surround: SCENE_06,
  scene_jj_mr3_07_gongye_qian_appears: SCENE_07,
  scene_jj_mr3_08_palms_vs_iron: SCENE_08,
  scene_jj_mr3_09_capture_gongye: SCENE_09,
  scene_jj_mr3_10_burn_outpost: SCENE_10,
  scene_jj_mr3_11_requisition_boats: SCENE_11,
  scene_jj_mr3_12_sail_into_mist: SCENE_12,
  scene_jj_mr3_13_board_ships: SCENE_13,
  scene_jj_mr3_14_hull_breached: SCENE_14,
  scene_jj_mr3_15_red_lake_casualties: SCENE_15,
  scene_jj_mr3_16_fast_boats_ram: SCENE_16,
  scene_jj_mr3_17_bao_feng_board: SCENE_17,
  scene_jj_mr3_18_deck_1v2_duel: SCENE_18,
  scene_jj_mr3_19_chain_bao_feng: SCENE_19,
  scene_jj_mr3_20_forced_landing: SCENE_20,
  scene_jj_mr3_21_garden_traps: SCENE_21,
  scene_jj_mr3_22_advance_tingxiang: SCENE_22,
  scene_jj_mr3_23_deng_baichuan_blocks: SCENE_23,
  scene_jj_mr3_24_bridge_carnage: SCENE_24,
  scene_jj_mr3_25_defeat_deng_baichuan: SCENE_25,
  scene_jj_mr3_26_four_retainers_caged: SCENE_26,
  scene_jj_mr3_27_canhe_surrounded: SCENE_27,
  scene_jj_mr3_28_murong_bo_regret: SCENE_28,
  scene_jj_mr3_29_all_out_strike: SCENE_29,
  scene_jj_mr3_30_five_rounds_showdown: SCENE_30,
  scene_jj_mr3_31_unbroken_defense: SCENE_31,
  scene_jj_mr3_32_crossbow_wall: SCENE_32,
  scene_jj_mr3_33_heaven_destroys_yan: SCENE_33,
  scene_jj_mr3_34_remnants_surrender: SCENE_34,
  scene_jj_mr3_35_recover_crossbows: SCENE_35,
  scene_jj_mr3_36_huanshi_library: SCENE_36,
  scene_jj_mr3_37_escort_north: SCENE_37,
  scene_jj_mr3_38_triumph_kaifeng: SCENE_38,
  scene_jj_mr3_39_public_execution: SCENE_39,
  scene_jj_mr3_40_wolves_in_shadow: SCENE_40,
}
