import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, flag, warn, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { QUEST_ID } from './taohuadaoMapQuest'

function buildHeishaScoutNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-THD-MAP-SHAQILANG',
    name: '鲨七郎',
    title: '东海黑鲨帮趟风哨 · 踏浪鬼',
    realm: '三流上品',
    factionId: 'SECT-26',
    factionName: '东海黑鲨帮',
    avatarUrl: '/assets/characters/templates/tpl_qiantang_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_qiantang_male_fb.jpg',
    stats: { hp: 470, mp: 250, agi: 55, res: 20 },
    talents: { bone: 60, comprehension: 50, charm: 34 },
    fullLocationLabel: '苏州府 > 虎丘剑池 > 云岩寺七级微倾古塔',
    equippedArts: { neigong: 'MA-230', qinggong: 'MA-157', move1: 'MA-237', move2: 'MA-216' },
    learnedArts: [{ artId: 'MA-230', level: 3 }, { artId: 'MA-157', level: 3 }, { artId: 'MA-237', level: 3 }, { artId: 'MA-216', level: 3 }],
    equipped: { weapon: 'WPN-076', armor: 'ARM-042', shoes: 'BOT-023', bow: 'BOW-021', accessory1: 'ACC-047', accessory2: 'ACC-043', mount: 'MNT-023' },
    questBadgeLabel: '黑鲨风哨',
    talk: '“桃花岛那姓陆的老杂毛躲在太湖不敢出海，倒派个毛头小子来虎丘找罗盘？把命留在古塔底下喂乌鸦罢！”',
  })
}

function buildHeishaDeputyNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-THD-MAP-LIHENGBO',
    name: '厉横波',
    title: '东海黑鲨帮副帮主 · 分水恶蛟',
    realm: '二流下品',
    factionId: 'SECT-26',
    factionName: '东海黑鲨帮',
    avatarUrl: '/assets/characters/templates/tpl_qiantang_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_qiantang_male_fb.jpg',
    stats: { hp: 720, mp: 390, agi: 62, res: 26 },
    talents: { bone: 68, comprehension: 56, charm: 36 },
    fullLocationLabel: '杭州府 > 钱塘怒潮演武馆 > 怒潮聚义水香堂',
    equippedArts: { neigong: 'MA-104', qinggong: 'MA-139', move1: 'MA-145', move2: 'MA-131' },
    learnedArts: [{ artId: 'MA-104', level: 4 }, { artId: 'MA-139', level: 4 }, { artId: 'MA-145', level: 4 }, { artId: 'MA-131', level: 4 }],
    equipped: { weapon: 'WPN-044', armor: 'ARM-023', shoes: 'BOT-014', bow: 'BOW-012', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-012' },
    questBadgeLabel: '黑鲨副帮主',
    talk: '“潮千丈那老儿不识抬举，不肯借怒潮水道替我黑鲨帮运兵，今日便连你与这水香堂一并掀入钱塘江！”',
  })
}

function buildTuHaijiaoBossNpc(rhythmBroken: boolean): NodeNpc {
  return makeQuestNpc({
    id: rhythmBroken ? 'CUSTOM-THD-MAP-TU-WEAK' : 'CUSTOM-THD-MAP-TU-FULL',
    name: rhythmBroken ? '屠海蛟（潮拍受制）' : '屠海蛟',
    title: '东海黑鲨岛主 · 吞潮狂鲨',
    realm: '二流中品',
    factionId: 'SECT-26',
    factionName: '东海黑鲨帮总舵',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    stats: rhythmBroken ? { hp: 850, mp: 450, agi: 65, res: 28 } : { hp: 970, mp: 530, agi: 70, res: 32 },
    talents: { bone: 75, comprehension: 62, charm: 33 },
    fullLocationLabel: '杭州府 > 两浙市舶司海港 > 临江演武船坞',
    equippedArts: { neigong: 'MA-104', qinggong: 'MA-139', move1: 'MA-115', move2: 'MA-145' },
    learnedArts: [{ artId: 'MA-104', level: 5 }, { artId: 'MA-139', level: 5 }, { artId: 'MA-115', level: 5 }, { artId: 'MA-145', level: 4 }],
    equipped: { weapon: 'WPN-044', armor: 'ARM-023', shoes: 'BOT-014', bow: 'BOW-012', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-012' },
    questBadgeLabel: '黑鲨岛主',
    talk: '“老夫纵横舟山洋面二十载，只恨桃花岛外那一百零八座奇门乱礁折了我三艘大艨艟！今日活字海图已在老夫掌中，再夺下你怀里的璇玑潮信盘，东海仙岛还有谁拦得住我黑鲨帮！”',
  })
}

const SCENE_25_EPILOGUE_UNLOCK: StorySceneDef = {
  id: 'scene_thd_map_25_epilogue_unlock',
  title: '第二十五幕 · 碧海乘潮启桃源',
  subtitle: '苏州府 · 太湖烟波渡口洞庭奇石望湖水榭',
  illustrationUrl: '/assets/quests/taohuadao_map_wanghu_silk_chart.jpg',
  illustrationCaption: '苏州太湖洞庭奇石望湖水榭 · 陆玄机朱毫校定雪白鲛绡海图亲授青玉图筒',
  beats: [
    N('望湖水榭外水波微澜，陆玄机以朱砂狼毫在鲛绡海图上补完最后一道九宫生门潮线，将《洛书暗礁泥印底本》与《东海璇玑潮信盘》的二十四节气晷影合校无误。霎时间，原本杂乱无章的舟山外洋乱礁群在图卷上井然排开：何处随朔望满潮可容巨舰平渡、何处伏有水底漩涡死门、何处望见三株迎客红桃便可弃舟登岸，尽皆历历在目。'),
    S('NPC-0174', '（陆玄机长舒一口气，郑重将装入青玉筒中的鲛绡全图双手奉予少侠）“我桃花岛一脉向来不轻授外人海道，然少侠自姑苏至钱塘往返奔波，先在虎丘古塔夺回潮信铜盘，又助杭州范资政、毕神匠与曲师叔、武师弟铲除黑鲨巨寇屠海蛟，可谓于东南海疆与敝岛皆有大义！这卷《东海桃花岛奇门海道舆图》赠予少侠，岛上试剑亭与竹林清茶，随时恭候大驾！”'),
    P('（双手接过青玉图筒纳入行囊，拱手一礼）“多谢陆阵主厚赐！东海碧波万里、奇门五转精妙绝伦，待在下备足行粮，定当自杭州扬帆出海，一睹桃花仙岛真容！”'),
  ],
  onFinishEffects: [
    { type: 'removeItem', itemId: 'ITM-MSC-024', qty: 1 },
    { type: 'giveItem', itemId: 'ITM-MSC-021', qty: 1 },
    { type: 'giveSilver', amount: 180, reason: '两浙市舶司海商与桃花岛外庄酬谢盘缠' },
    { type: 'modifyRenown', delta: 45, reason: '平定东海黑鲨帮巨寇、重校桃花岛奇门海道图' },
    { type: 'modifyChivalry', delta: 25, reason: '护佑两浙市舶海商与钱塘百姓安宁' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0174' }, delta: 25 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0150' }, delta: 20 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0217' }, delta: 20 },
    {
      type: 'completeQuest',
      questId: QUEST_ID,
      outcome: 'unlocked_taohuadao_map',
      combatExp: 320,
    },
    toast('奇遇功成！已获得秘境舆图《东海桃花岛奇门海道舆图》，天下舆图【东海桃花岛】海道正式解锁！', 'success', '秘境解锁'),
  ],
}

const SCENE_24_LU_XUANJI_CALIBRATE: StorySceneDef = {
  id: 'scene_thd_map_24_lu_xuanji_calibrate',
  title: '第二十四幕 · 洛书九宫合鲛绡',
  subtitle: '苏州府 · 太湖烟波渡口洞庭奇石望湖水榭',
  beats: [
    N('水榭石案之上，陆玄机取出一幅空白的东海雪白鲛绡，将少侠带回的《东海璇玑潮信盘》置于中央，再把毕昇与武眠风重排拓印的《洛书暗礁泥印底本》逐页按“戴九履一、左三右七、二四为肩、六八为足”的洛书九宫方位铺陈开来。'),
    S('NPC-0174', '（陆玄机拨动璇玑铜盘外圈的天干子午针，眼中精芒闪动）“果然分毫不差！昔年岛主创设外洋奇门海道时，故意将海图一分为二：杭州泥活字底本只记一百零八座暗礁的死位，而我姑苏望湖水榭这枚璇玑潮信盘则主宰早晚两潮的生门变数。屠海蛟那蠢贼就算抢走半部活字印版，若无洛书变宫口诀，开船进去也是船毁人亡！”'),
    P('“毕神匠在万松书院亦曾感慨，活字之妙在于排检无穷，正与贵岛奇门五转之术异曲同工。如今盘卷合流，还请陆阵主将入岛生门航道绘成定本。”'),
  ],
  onFinishEffects: [openScene('scene_thd_map_25_epilogue_unlock', 'QST-ADV-TAOHUADAO-MAP')],
}

const SCENE_23_RETURN_SUZHOU_PAVILION: StorySceneDef = {
  id: 'scene_thd_map_23_return_suzhou_pavilion',
  title: '第二十三幕 · 北返姑苏叩望湖',
  subtitle: '苏州府 · 太湖烟波渡口洞庭奇石望湖水榭',
  beats: [
    N('辞别钱塘海港，少侠沿江南运河北返苏州府太湖烟波渡口。洞庭奇石堆叠的望湖水榭内，桃花岛五湖阵主陆玄机早已收到杭州飞鸽传书，正负手立于雕栏之前迎候。'),
    S('NPC-0174', '（陆玄机快步迎上，神色间满是钦佩与欣慰）“少侠一路辛劳！武师弟与曲师叔已在信中详述钱塘江口一战——那横行东海二十年的黑鲨岛主屠海蛟竟折在少侠兵刃之下，连市舶司被劫的活字海图底本也完壁归赵，实乃两浙武林一大快事！”'),
    P('（自怀中取出《东海璇玑潮信盘》与武眠风封存的《洛书暗礁泥印底本》）“幸赖杭州诸位前辈与范资政、毕大匠鼎力襄助，两件信物俱已在此，请陆阵主开启洛书封禁、合绘东海舆图！”'),
  ],
  onFinishEffects: [openScene('scene_thd_map_24_lu_xuanji_calibrate', 'QST-ADV-TAOHUADAO-MAP')],
}

const SCENE_22_HANGZHOU_PORT_REPORT: StorySceneDef = {
  id: 'scene_thd_map_22_hangzhou_port_report',
  title: '第二十二幕 · 钞关封印嘱北归',
  subtitle: '杭州府 · 两浙市舶司海港水寨望楼钞关厅',
  beats: [
    N('船坞海风渐平，两浙市舶司水军与桃花岛记室弟子“铁脚奇门”武眠风率众赶至，将黑鲨帮残余水手尽数缉拿归案。返回水寨望楼钞关厅，曲沧浪与商杏璇亦随后赶到，众人共同清点从屠海蛟怀中夺回的紫檀印匣。'),
    S('NPC-0217', '（武眠风仔细核对匣内三十六枚胶泥活字印模与半幅海图拓页，长舒一口气）“一字未损！这正是毕神匠替敝岛秘制的《洛书暗礁泥印底本》。我已按桃花岛记室密法重新排定拓出真页，再盖上市舶司海防勘合印信——只是要将此页与少侠手中的《东海璇玑潮信盘》彻底融成一幅可随时出海的活图，还须请精通五湖洛书推步的陆玄机师兄亲手落笔。”'),
    S('NPC-0150', '（曲沧浪横抚铁琴，微微笑道）“少侠今日在船坞破屠海蛟鲸息狂刀的那一招，颇合东海潮音进退之妙。请携此拓本北返苏州【太湖烟波渡口 · 洞庭奇石望湖水榭】交予陆玄机，成图之后，日后自杭州海港扬帆便可直抵桃花岛！”'),
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'thd_map_tuhaijiao_defeated', value: true },
    { type: 'giveCombatExp', amount: 180, reason: '两浙市舶司船坞击败黑鲨岛主屠海蛟' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'suzhou_pavilion_finish',
      silent: false,
    },
    toast('已夺回《洛书暗礁泥印底本》！请北返【苏州府 · 太湖烟波渡口 · 洞庭奇石望湖水榭】请陆玄机合璧成图。', 'success', '碧海潮信'),
  ],
}

const SCENE_21_PORT_BOSS_AFTER: StorySceneDef = {
  id: 'scene_thd_map_21_port_boss_after',
  title: '第二十一幕 · 船坞斩鲨夺泥模',
  subtitle: '杭州府 · 两浙市舶司海港临江演武船坞',
  beats: [
    N('临江演武船坞之上，江海交汇的怒浪拍击石堤，溅起丈许高的咸涩水雾！屠海蛟手中大环刀挟着“鲸息水战诀”的滚滚劲风连劈三十余刀，刀势一浪高过一浪。少侠却稳守门户，待他第三波叠浪刀势将尽、第四波新力未生的刹那，欺身疾进直刺其握刀右肩琵琶穴！'),
    S({ name: '屠海蛟', title: '东海黑鲨岛主 · 吞潮狂鲨', factionName: '东海黑鲨帮总舵', portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg' }, '（右肩血花迸溅，沉重的大环刀脱手钉入船坞巨木，整个人被震得撞断两根缆桩，怀中紫檀印匣滚落在地）“怎会如此……老夫苦练二十年的叠浪鲸息刀，怎会被你看穿换气潮拍！桃花岛果然邪门……风紧，跳海撤！”'),
    N('屠海蛟咬破舌尖强提一口残余真气，翻身跃入堤外湍急的暗流之中，被远处接应的一艘黑帆小艚救起，仓皇逃往外洋。少侠抢步拾起地上完好无损的紫檀印匣，只听水寨号角齐鸣，武眠风已率水勇合围而来。'),
  ],
  onFinishEffects: [openScene('scene_thd_map_22_hangzhou_port_report', 'QST-ADV-TAOHUADAO-MAP')],
}

const SCENE_20_PORT_DOCK_SHOWDOWN: StorySceneDef = {
  id: 'scene_thd_map_20_port_dock_showdown',
  title: '第二十幕 · 演武船坞会狂鲨',
  subtitle: '杭州府 · 两浙市舶司海港临江演武船坞',
  illustrationUrl: '/assets/quests/taohuadao_map_dock_shark_boss.jpg',
  illustrationCaption: '杭州两浙市舶司临江演武船坞 · 怒浪浓烟决战鲨皮独眼巨寇屠海蛟夺紫檀印匣',
  beats: [
    N('赶至两浙市舶司海港西侧的临江演武船坞，只见三艘海盗快船正借着晚潮贴靠栈桥，一名身高八尺、满脸横肉披着鲨皮重甲的独眼巨汉正手持六合大环刀立在船坞石坪中央，脚下踩着抢来的紫檀活字印匣，正是东海巨寇黑鲨岛主屠海蛟！'),
    S({ name: '屠海蛟', title: '东海黑鲨岛主 · 吞潮狂鲨', factionName: '东海黑鲨帮总舵', portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg' }, '（独眼凶光暴射，大环刀遥指少侠狂笑道）“厉横波那废物折在怒潮馆，老夫便猜到会有桃花岛的帮手追来船坞！好得很，省得老夫再带人杀上苏州太湖——把你怀里的《东海璇玑潮信盘》乖乖献上来，老夫饶你不死，还封你做黑鲨帮的巡海先锋！”'),
    P('（拔刃横胸，冷然迎着海风踏上船坞石坪）“屠海蛟，你劫掠东南商船、觊觎世外桃源，范公与两浙水师早留着你的海捕文书！今日便在船坞一决高下，留下紫檀印匣！”'),
  ],
  choices: [
    {
      id: 'thd_fight_tuhaijiao_weakened',
      label: '循曲沧浪所授潮音琴律，卡准三叠浪歇破绽进击！',
      subLabel: '已勘破鲸息刀法换拍破绽（屠海蛟战力受制为二流中品下段 · ⚠️ 战败将直接丧命！）',
      tone: 'jade',
      condition: flag('thd_map_tide_rhythm_broken', 'truthy'),
      hideWhenUnavailable: true,
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildTuHaijiaoBossNpc(true) },
          rule: 'duel',
          duelStakesTag: 'duel',
          forbidEscapeReason: '船坞栈桥已被黑鲨帮海寇截断，身后便是汹涌钱塘入海口，唯有死战斩寇！',
          deathTitle: '血染海港 · 葬身狂潮',
          deathDetail:
            '杭州两浙市舶司演武船坞之上，你不敌东海黑鲨岛主屠海蛟的霸烈环刀，重创坠入入海狂澜，璇玑盘与海图尽落海寇之手。',
          onWin: [openScene('scene_thd_map_21_port_boss_after', 'QST-ADV-TAOHUADAO-MAP')],
        },
      ],
    },
    {
      id: 'thd_fight_tuhaijiao_normal',
      label: '正面迎战东海黑鲨岛主屠海蛟',
      subLabel: '二流中品巅峰硬仗（击败屠海蛟夺回活字海图印匣 · ⚠️ 战败将直接丧命！）',
      tone: 'danger',
      condition: flag('thd_map_tide_rhythm_broken', 'falsy'),
      hideWhenUnavailable: true,
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildTuHaijiaoBossNpc(false) },
          rule: 'duel',
          duelStakesTag: 'duel',
          forbidEscapeReason: '船坞栈桥已被黑鲨帮海寇截断，身后便是汹涌钱塘入海口，唯有死战斩寇！',
          deathTitle: '血染海港 · 葬身狂潮',
          deathDetail:
            '杭州两浙市舶司演武船坞之上，你不敌东海黑鲨岛主屠海蛟的霸烈环刀，重创坠入入海狂澜，璇玑盘与海图尽落海寇之手。',
          onWin: [openScene('scene_thd_map_21_port_boss_after', 'QST-ADV-TAOHUADAO-MAP')],
        },
      ],
    },
  ],
}

const SCENE_19_PORT_MAIN_WUMIANFENG: StorySceneDef = {
  id: 'scene_thd_map_19_port_main_wumianfeng',
  title: '第十九幕 · 市舶望楼援铁脚',
  subtitle: '杭州府 · 两浙市舶司海港水寨望楼钞关厅',
  beats: [
    N('疾驰赶至杭州城南两浙市舶司海港，只见千帆栈桥外浓烟滚滚，黑鲨帮故意点燃了两艘废弃草船声东击西，吸引市舶司水军救火。水寨望楼钞关厅前，桃花岛记室弟子“铁脚奇门”武眠风正腿带轻伤击退三名海盗死士。'),
    S('NPC-0217', '（武眠风见少侠出示璇玑潮信盘与曲沧浪手令，精神大振）“少侠来得正好！半柱香前屠海蛟趁海港东埠救火混乱，亲率亲卫突袭钞关秘库，抢走了封存《洛书暗礁泥印底本》的紫檀印匣！我用奇门铁蒺藜封死了东栈水道，那厮此刻正被困在西侧【临江演武船坞】等晚潮涨满夺船出海！”'),
    P('“武师兄先调集水寨弟兄合围外港水道，莫教他逃入深海——临江演武船坞那边，由在下去截住屠海蛟！”'),
  ],
  onFinishEffects: [
    { type: 'healPlayer', hpPct: 100, mpPct: 100 },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'hangzhou_port_dock',
      silent: false,
    },
    warn('战前内息已调匀！速赴海港西侧【临江演武船坞】决战黑鲨岛主屠海蛟！', '碧海潮信'),
  ],
}

const SCENE_18_TIDE_PAVILION_QU: StorySceneDef = {
  id: 'scene_thd_map_18_tide_pavilion_qu',
  title: '第十八幕 · 观潮琴台听海拍',
  subtitle: '杭州府 · 钱塘江观潮台飞桥灯廊琴歌台',
  illustrationUrl: '/assets/quests/taohuadao_map_qiantang_qin_tide.jpg',
  illustrationCaption: '杭州钱塘江观潮台琴歌台 · 白练怒潮奔涌曲沧浪横抚铁琴授三叠破刀律',
  beats: [
    N('登临钱塘江畔高耸的观潮台，江天一色，远处一线白练伴着闷雷般的潮声滚滚而来。飞桥灯廊琴歌台上，桃花岛护岛前辈“东海琴魔”曲沧浪正横膝抚琴，琴音铮琮苍凉，竟与江心涌潮的起落拍节丝丝入扣。'),
    S('NPC-0150', '（曲沧浪指按宫弦，抬眼端详少侠）“商丫头与潮帮主已托人传信过来。屠海蛟既要在晚潮时分强闯两浙市舶司海港，武眠风一人守在钞关厅势必吃紧。少侠去船坞与那屠海蛟交手前，且先听老夫一曲《沧海叠浪引》。”'),
    S('NPC-0150', '“屠海蛟横行东海所仗的乃是‘鲸息水战诀’配大环叠浪刀，其劲力仿效钱塘潮信，一浪叠一浪，连绵三叠重逾千钧；然而天地潮汐盈极必亏，每逢第三刀狂潮拍岸之后，其丹田鲸息必有一拍回落如退潮露礁！少侠若通琴理或算学节律，听准这三进一退之数，破他便如探囊取物！”'),
  ],
  choices: [
    {
      id: 'thd_qu_music_math_insight',
      label: '凝神倾听琴音与江潮共鸣，以琴理算学悟透“三叠退潮”破绽',
      subLabel: '要求【琴 ≥ 50】或【算术 ≥ 55】或【悟性 ≥ 68】· 压制屠海蛟叠浪刀势并精进琴艺',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需琴 ≥ 50、算术 ≥ 55 或 先天悟性 ≥ 68',
        conditions: [
          { type: 'skillAtLeast', key: '琴', min: 50 },
          { type: 'skillAtLeast', key: '算术', min: 55 },
          { type: 'talentAtLeast', key: '悟性', min: 68 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'thd_map_tide_rhythm_broken', value: true },
        { type: 'modifySkill', key: '琴', delta: 1 },
        {
          type: 'setQuestStep',
          questId: QUEST_ID,
          stepId: 'hangzhou_port_main',
          silent: false,
        },
        toast('琴潮合悟！已洞悉屠海蛟鲸息刀势换拍死穴，速赴【两浙市舶司海港 · 水寨望楼钞关厅】驰援武眠风！', 'success', '潮音破妄'),
      ],
    },
    {
      id: 'thd_qu_standard_go',
      label: '铭记曲前辈提点的刀路进退要诀，火速驰援市舶司海港',
      subLabel: '稳步推进 · 持曲沧浪手令前往两浙市舶司海港会合武眠风',
      tone: 'primary',
      effects: [
        {
          type: 'setQuestStep',
          questId: QUEST_ID,
          stepId: 'hangzhou_port_main',
          silent: false,
        },
        toast('已领曲沧浪手令！请赶往【杭州府 · 两浙市舶司海港 · 水寨望楼钞关厅】驰援武眠风。', 'talk', '碧海潮信'),
      ],
    },
  ],
}

const SCENE_17_NUCHAO_BATTLE_AFTER: StorySceneDef = {
  id: 'scene_thd_map_17_nuchao_battle_after',
  title: '第十七幕 · 水香堂中审海谍',
  subtitle: '杭州府 · 钱塘怒潮演武馆怒潮聚义水香堂',
  beats: [
    N('二十余合激战，厉横波的狂风快刀与翻天掌被少侠一一拆解，一记沉猛反击正中其左胸肋骨，震得他撞翻水香堂供桌，被钱塘怒潮帮帮主“弄潮铁蛟”潮千丈一铁锚杆压住肩头动弹不得！'),
    S({ name: '厉横波', title: '东海黑鲨帮副帮主 · 分水恶蛟', factionName: '东海黑鲨帮', portraitUrl: '/assets/characters/templates/tpl_qiantang_male_fb.jpg' }, '（吐出一口血沫，骇然招供道）“饶命！我说！我们屠岛主已探知那半部活字海图底本转移到了两浙市舶司海港的钞关秘库，约好趁今日申酉晚潮涨满时奇袭海港，劫了武眠风手里的底本便顺钱塘江潮出海！”'),
    S('NPC-0306', '（潮千丈命帮众将厉横波五花大绑押送杭州府衙，转头对少侠抱拳高声道）“好险！屠海蛟那厮练成了东海‘鲸息水战诀’，刀势借潮发力极为凶横！少侠赶往市舶司海港前，务必先顺路登【钱塘江观潮台 · 飞桥灯廊琴歌台】见一见桃花岛‘东海琴魔’曲沧浪前辈，他老人家正观潮抚琴，最知如何克制海寇借潮练刀的路数！”'),
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'thd_map_lihengbo_defeated', value: true },
    { type: 'giveSilver', amount: 50, reason: '缴获黑鲨帮贿赂怒潮馆的定金银锭' },
    { type: 'giveCombatExp', amount: 125, reason: '怒潮水香堂击败黑鲨副帮主厉横波' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'hangzhou_tide_qu',
      silent: false,
    },
    toast('审出屠海蛟欲趁晚潮奇袭海港！请先赴【钱塘江观潮台 · 飞桥灯廊 · 琴歌台】向曲沧浪请教破敌潮律。', 'success', '碧海潮信'),
  ],
}

const SCENE_16_NUCHAO_HALL_CLASH: StorySceneDef = {
  id: 'scene_thd_map_16_nuchao_hall_clash',
  title: '第十六幕 · 怒潮堂前揭反骨',
  subtitle: '杭州府 · 钱塘怒潮演武馆怒潮聚义水香堂',
  beats: [
    N('少侠赶至城东江干的钱塘怒潮演武馆。怒潮聚义水香堂内香烟缭绕，帮主“弄潮铁蛟”潮千丈正听一名披着蓑衣的海客慷慨陈词，堂下摆着两口装满东珠珊瑚的樟木箱。少侠一眼认出那海客腰间鲨齿佩刀，朗声喝破其黑鲨帮副帮主厉横波的身份，并将灵隐寺搜出的密信掷于堂前！'),
    S('NPC-0306', '（潮千丈看完密信脸色铁青，一把掀翻珠箱怒喝道）“好你个黑鲨海贼！口口声声说是泉州海商雇船护镖，原来是想骗我钱塘怒潮帮做你们劫掠市舶司、暗算桃花岛的替死鬼！”'),
    S({ name: '厉横波', title: '东海黑鲨帮副帮主 · 分水恶蛟', factionName: '东海黑鲨帮', portraitUrl: '/assets/characters/templates/tpl_qiantang_male_fb.jpg' }, '（一把扯掉蓑衣露出精悍短打，泼风大刀锵然出鞘）“既被这多管闲事的小辈识破，老子便先宰了你祭旗，再逼潮老儿交出江口引水快船！”'),
  ],
  choices: [
    {
      id: 'thd_fight_lihengbo',
      label: '助潮千丈肃清门户，迎战黑鲨副帮主厉横波',
      subLabel: '二流下品硬仗（击败厉横波逼问屠海蛟主力去向 · ⚠️ 战败将直接丧命！）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildHeishaDeputyNpc() },
          rule: 'duel',
          forbidEscapeReason: '厉横波刀锋已劈向水香堂前，一旦退让必致海寇夺船突袭海港！',
          deathTitle: '刀断水堂 · 怒潮蒙羞',
          deathDetail:
            '杭州钱塘怒潮演武馆水香堂内，你不敌东海黑鲨帮副帮主厉横波的凶悍快刀，血洒聚义堂前。',
          onWin: [openScene('scene_thd_map_17_nuchao_battle_after', 'QST-ADV-TAOHUADAO-MAP')],
        },
      ],
    },
  ],
}

const SCENE_15_LINGYIN_SUTRA_TRACE: StorySceneDef = {
  id: 'scene_thd_map_15_lingyin_sutra_trace',
  title: '第十五幕 · 飞来碑廊觅密笺',
  subtitle: '杭州府 · 西湖灵隐飞来峰东厢碑廊藏经橱',
  beats: [
    N('西湖群山苍翠，灵隐飞来峰下冷泉潺潺。大雄正殿佛前，一代高僧仲灵契嵩禅师听少侠道明范仲淹手谕来意，合十指向东厢碑廊藏经橱。'),
    S('NPC-0098', '“阿弥陀佛。前日确有两名身上带着海腥气的外乡香客借拓碑之名溜入东厢碑廊，欲撬动早年吴越海防旧碑后的铜匣；幸得护寺武僧警觉喝退，那二人仓皇翻墙逃走时，在藏经橱夹缝里遗落了一页用鱼鳔胶封口的密信。”'),
    P('（取过密信拆阅，眉头一挑）“信上写着‘灵隐无图，真模已随市舶司记室移港；副座厉横波携重金赴钱塘怒潮演武馆收买引水船夫’！多谢禅师指点，晚辈这便赶往城东怒潮演武馆截住厉横波！”'),
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'hangzhou_nuchao_hall',
      silent: false,
    },
    toast('搜获黑鲨密信！速赴【杭州府 · 钱塘怒潮演武馆 · 怒潮聚义水香堂】揭穿副帮主厉横波！', 'talk', '碧海潮信'),
  ],
}

const SCENE_14_HANGZHOU_TAVERN_ZHANGXIAN: StorySceneDef = {
  id: 'scene_thd_map_14_hangzhou_tavern_zhangxian',
  title: '第十四幕 · 楼外烟柳访词宗',
  subtitle: '杭州府 · 西湖楼外酒肆',
  beats: [
    N('前往灵隐山麓途中，少侠依范公所言先入西湖畔的楼外酒肆打探动静。白发矍铄的江南词坛名宿“张三影”张先（字子野）正凭栏独酌，笑看湖上画船晴波。'),
    S('NPC-0058', '（张先捋须笑道）“少侠问起这几日西湖上的生面孔，老夫倒真瞧见一桩奇事——昨日午后云破月来花弄影之时，有几个脚穿草鞋却腰悬鲨皮刀鞘的粗汉，雇了条小船直奔北高峰下灵隐寺而去，上岸时还嘀咕着‘先去碑廊摸底，再去怒潮馆买船’。老夫写词一辈子，最善观人眉眼，那几人绝非善类！”'),
    P('（执壶替张老先生满上一杯西湖莼菜美酒，拱手致谢）“多谢子野先生提点！既有明确落脚之处，晚辈即刻上灵隐飞来峰东厢碑廊查个水落石出！”'),
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'hangzhou_lingyin_east',
      silent: false,
    },
    toast('张先指明海寇曾潜入灵隐寺！请前往【杭州府 · 西湖灵隐飞来峰 · 东厢碑廊 · 藏经橱】搜查。', 'talk', '碧海潮信'),
  ],
}

const SCENE_13_HANGZHOU_YAMEN_FAN: StorySceneDef = {
  id: 'scene_thd_map_13_hangzhou_yamen_fan',
  title: '第十三幕 · 府衙希文忧海防',
  subtitle: '杭州府 · 杭州府衙',
  beats: [
    N('少侠携毕昇书简与商杏璇引荐信步入杭州府衙。时值{reignYear}，六十二岁的资政殿学士范仲淹（字希文）正知杭州军州事，在清白堂内筹划两浙荒政与钱塘海塘修缮。见少侠呈上苏州沧浪亭胡瑗问候书与桃花岛信物，范公温言赐座。'),
    S('NPC-0009', '“翼之（胡瑗）与子美（苏舜钦）在姑苏安好，老夫甚慰。实不相瞒，东海桃花岛虽属方外隐逸一脉，历年来却屡助我两浙市舶司驱逐外洋海盗、救援遇风海商。近月黑鲨帮巨寇屠海蛟暗中潜入钱塘，不仅想夺桃花岛海图，更妄图摸清我市舶司纲船航线——老夫不便明调厢军打草惊蛇，正需少侠这等江湖豪杰暗中剪除其羽翼！”'),
    P('“范公先天下之忧而忧，坐镇西子湖畔心系万民海商，晚辈敢不效劳！不知府衙捕快近日在城内外可曾查获黑鲨帮眼线的踪迹？”'),
    S('NPC-0009', '“据巡湖弓手禀报，有几名闽浙海寇装束之徒在西湖畔流连。老夫故友张子野（张先）常在【西湖楼外酒肆】临窗听曲，西湖画舫往来皆入其眼，少侠可持老夫手谕先往酒肆一问，再去灵隐山麓追查！”'),
  ],
  onFinishEffects: [
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0009' }, delta: 20 },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'hangzhou_tavern_rumor',
      silent: false,
    },
    toast('已领受范仲淹手谕！请前往【杭州府 · 西湖楼外酒肆】向词宗张先打探西湖可疑海客。', 'success', '碧海潮信'),
  ],
}

const SCENE_12_ACADEMY_BISHENG_CIPHER: StorySceneDef = {
  id: 'scene_thd_map_12_academy_bisheng_cipher',
  title: '第十二幕 · 活字胶泥参暗版',
  subtitle: '杭州府 · 万松湖山书院',
  illustrationUrl: '/assets/quests/taohuadao_map_wansong_bisheng.jpg',
  illustrationCaption: '杭州万松湖山书院印书坊 · 神匠毕昇竹镊排检胶泥活字与商杏璇参暗礁版',
  beats: [
    N('商杏璇引少侠步入万松书院后厢印书坊。松脂铁板微温，布衣巧匠毕昇正以细竹镊排检一盘火烧胶泥活字。见少侠取出《东海璇玑潮信盘》，毕昇放下竹镊，从暗格中取出一只仅剩三枚备用泥字的小木盒。'),
    S('NPC-0061', '“少侠请看，数年前东海桃花岛一位前辈见老汉创制胶泥活字，突发奇想，请老汉烧造了三十六枚刻有奇门礁石符号的活字泥模。每逢印制海图，须按洛书九宫口诀临时排字拓印，印毕即拆散封存——哪怕外人偷去整盒泥字，不知排法也只能印出一纸乱礁！”'),
    S('NPC-0312', '（商杏璇柳眉紧蹙）“偏偏上月武眠风师兄奉命将那盒《洛书暗礁泥印底本》移交两浙市舶司海港秘库协防海寇，途中走漏了风声！黑鲨岛主屠海蛟已率大队海寇潜入杭州城外，正四处探查泥印底本藏在灵隐古刹还是市舶司海港！”'),
    P('“原来杭州这半部海图竟是毕神匠亲制的活字秘模！既然事涉两浙海防与市舶司，我们不如先去【杭州府衙】拜谒知州范仲淹范大人，请官府暗中协防，再揪出城中黑鲨帮的耳目！”'),
  ],
  onFinishEffects: [
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0061' }, delta: 15 },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'hangzhou_yamen_fan',
      silent: false,
    },
    toast('揭晓活字海图玄机！请前往【杭州府 · 杭州府衙】拜见知州范仲淹共商除寇之策。', 'talk', '碧海潮信'),
  ],
}

const SCENE_11_ARRIVE_HANGZHOU_ACADEMY: StorySceneDef = {
  id: 'scene_thd_map_11_arrive_hangzhou_academy',
  title: '第十一幕 · 万松书院会剑娥',
  subtitle: '杭州府 · 万松湖山书院',
  beats: [
    N('顺江南运河南下“东南第一州”杭州府。钱塘繁华参差十万人家，西子湖光潋滟晴方好。少侠循陆玄机飞鸽密信所指，穿过凤凰山麓苍翠松林，踏入万松湖山书院。'),
    N('书院讲堂廊下，一名身着青碧劲装、背负长剑的英姿女子正焦急踱步，正是桃花岛驻杭弟子“东海观潮剑士”商杏璇！见少侠亮出陆玄机的青玉桃花佩与《东海璇玑潮信盘》，商杏璇顿时喜出望外。'),
    S('NPC-0312', '“太好了！陆师伯信里说有一位侠义高强的少侠在苏州虎丘斩退鲨七郎、夺回璇玑潮信盘，杏璇还道要再等两日！快请随我入后厢见一见毕昇老先生，杭州这半部海图的秘密全系于他老人家一身！”'),
  ],
  onFinishEffects: [openScene('scene_thd_map_12_academy_bisheng_cipher', 'QST-ADV-TAOHUADAO-MAP')],
}

const SCENE_10_SUZHOU_PAVILION_MID: StorySceneDef = {
  id: 'scene_thd_map_10_suzhou_pavilion_mid',
  title: '第十幕 · 望湖验盘定南行',
  subtitle: '苏州府 · 太湖烟波渡口洞庭奇石望湖水榭',
  beats: [
    N('返回太湖烟波渡口望湖水榭，陆玄机接过少侠自虎丘云岩古塔夺回的《东海璇玑潮信盘》，手指轻抚盘面二十八宿与潮汐刻度，确认机括完好无损，方才面露宽慰之色。'),
    S('NPC-0174', '“天幸少侠出手迅捷，否则这枚璇玑母盘一旦落入黑鲨帮手中，后患无穷！不过方才那鲨七郎招认，黑鲨岛主屠海蛟已亲赴杭州府谋夺另一半《洛书暗礁泥印底本》。那份底本乃敝岛托大宋活字神匠毕昇秘制，目前由商杏璇师侄与武眠风师弟在杭州分头看护。”'),
    P('“陆阵主放心，救人救彻、帮人帮底！在下这便携《东海璇玑潮信盘》南下杭州府，先赴万松湖山书院与商姑娘、毕神匠会合，待夺回泥印底本后再返姑苏请阵主合图！”'),
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'hangzhou_academy_shang',
      silent: false,
    },
    toast('陆玄机已核验璇玑潮信盘！请南下前往【杭州府 · 万松湖山书院】会见商杏璇与神匠毕昇。', 'success', '碧海潮信'),
  ],
}

const SCENE_09_HUQIU_PAGODA_AFTER: StorySceneDef = {
  id: 'scene_thd_map_09_huqiu_pagoda_after',
  title: '第九幕 · 古塔折刃获璇玑',
  subtitle: '苏州府 · 虎丘剑池云岩寺七级微倾古塔',
  beats: [
    N('云岩古塔风铃急响，鲨七郎的柳叶双刀虽诡谲刁钻，还夹杂着撒网罩身的下三滥手法，却被少侠凌厉招式正面震飞右刀，一脚踢中腕脉！一只嵌着夜明螺钿、双层黄铜套合的《东海璇玑潮信盘》自他革囊中滚落石阶。'),
    S({ name: '鲨七郎', title: '东海黑鲨帮趟风哨 · 踏浪鬼', factionName: '东海黑鲨帮', portraitUrl: '/assets/characters/templates/tpl_qiantang_male_fb.jpg' }, '（捂着胸口翻滚下石阶，怨毒叫道）“好小子，算你有种！可光抢回这只破铜盘有什么用？另一半《洛书暗礁泥印底本》还在杭州府！我们屠岛主与厉副帮主早已率领三十名好手南下钱塘，等抢到手照样踏平桃花岛！”'),
    N('鲨七郎掷出一颗刺鼻海腥烟弹，借着竹林暮色仓皇逃向城外水路。塔旁观战的逍遥派女侠沈翠微微颔首赞许，少侠拾起《东海璇玑潮信盘》收入囊中，决定先回太湖望湖水榭向陆玄机复命并商议南下杭州之策。'),
  ],
  onFinishEffects: [
    { type: 'giveItem', itemId: 'ITM-MSC-024', qty: 1 },
    { type: 'giveSilver', amount: 30, reason: '缴获黑鲨帮趟风哨随身海珠碎银' },
    { type: 'giveCombatExp', amount: 90, reason: '虎丘云岩古塔击败黑鲨风哨鲨七郎' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'suzhou_pavilion_mid',
      silent: false,
    },
    toast('夺回信物《东海璇玑潮信盘》！请返回【苏州府 · 太湖烟波渡口 · 洞庭奇石望湖水榭】告知陆玄机。', 'success', '碧海潮信'),
  ],
}

const SCENE_08_HUQIU_PAGODA_BATTLE: StorySceneDef = {
  id: 'scene_thd_map_08_huqiu_pagoda_battle',
  title: '第八幕 · 云岩塔下截海鬼',
  subtitle: '苏州府 · 虎丘剑池云岩寺七级微倾古塔',
  illustrationUrl: '/assets/quests/taohuadao_map_huqiu_compass.jpg',
  illustrationCaption: '苏州虎丘七级微倾云岩古塔 · 暮霭石阶仗剑截击海寇鲨七郎夺璇玑潮信盘',
  beats: [
    N('循石清露所指拾级登上虎丘山巅，七级微倾的云岩寺古塔矗立暮霭之中。塔座东侧阴影下，一名耳坠鲨齿环、身穿油浸水靠的精瘦海盗正蹲在石函旁，用匕首撬拭那枚刚从桃花岛信使手中劫来的青铜罗盘，正是黑鲨帮趟风哨鲨七郎！'),
    S({ name: '鲨七郎', title: '东海黑鲨帮趟风哨 · 踏浪鬼', factionName: '东海黑鲨帮', portraitUrl: '/assets/characters/templates/tpl_qiantang_male_fb.jpg' }, '（听见脚步声猛然跃起，双刀交叉划出两道寒光）“咦？那桃花岛的小信使明明中了我的海蛇散逃回山塘客栈等死，怎地换了个生面孔追上古塔来？不管你是谁，撞见爷爷算你短命！”'),
    P('“暗箭伤人、强夺海图的海寇鼠辈，把《东海璇玑潮信盘》留下来！”'),
  ],
  choices: [
    {
      id: 'thd_fight_shaqilang',
      label: '挺身仗剑，迎战黑鲨帮趟风哨鲨七郎',
      subLabel: '三流上品初战（击败鲨七郎夺回《东海璇玑潮信盘》 · ⚠️ 战败将直接丧命！）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildHeishaScoutNpc() },
          rule: 'duel',
          forbidEscapeReason: '鲨七郎已将璇玑潮信盘塞入革囊欲翻墙遁走，绝不可放虎归山！',
          deathTitle: '塔影喋血 · 璇玑失落',
          deathDetail:
            '苏州虎丘云岩古塔之下，你不敌东海黑鲨帮趟风哨鲨七郎的诡诈双刀与渔网暗算，命丧古塔石阶。',
          onWin: [openScene('scene_thd_map_09_huqiu_pagoda_after', 'QST-ADV-TAOHUADAO-MAP')],
        },
      ],
    },
  ],
}

const SCENE_07_HUQIU_POOL_SHIQINGLU: StorySceneDef = {
  id: 'scene_thd_map_07_huqiu_pool_shiqinglu',
  title: '第七幕 · 剑池花影辨海腥',
  subtitle: '苏州府 · 虎丘剑池裂崖飞梁吴王剑池',
  beats: [
    N('由沧浪亭出城西北行至虎丘山。裂崖飞梁之下，吴王剑池潭水幽碧深邃，两侧石壁藤萝垂挂。函谷八友中的“莳花仙子”石清露正捧着一盆素心建兰立在池畔试泉，见少侠寻迹而来，轻掩鼻翼蹙眉开口。'),
    S('NPC-0242', '“少侠也是来寻那名满身咸腥鱼油味的外乡刀客么？半柱香前那人提着个染血的青布包袱从剑池飞梁跑过，把小女子刚浇过泉水的兰花都熏得蔫了三片叶子！我沈翠妹子瞧见他钻进了山顶【云岩寺七级微倾古塔】后头的石洞，似在等人接应。”'),
    P('（拱手一礼）“多谢石仙子指路！待在下拿下这厮，定还剑池一片清净兰香。”'),
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'suzhou_huqiu_pagoda',
      silent: false,
    },
    warn('锁定海寇藏身处！请即刻登上虎丘山巅【云岩寺七级微倾古塔】擒拿鲨七郎！', '碧海潮信'),
  ],
}

const SCENE_06_CANGLANG_ACADEMY_LUOSHU: StorySceneDef = {
  id: 'scene_thd_map_06_canglang_academy_luoshu',
  title: '第六幕 · 沧浪亭中参九宫',
  subtitle: '苏州府 · 沧浪亭书院',
  beats: [
    N('自山塘客栈救醒桃花岛信使后，少侠依陆玄机嘱托转赴城南沧浪亭书院。清流环绕的竹亭之内，寓居姑苏的诗人苏舜钦（字子美）正与东南大儒胡瑗（字翼之）品茗讲论《周易》河洛象数。'),
    S('NPC-0051', '（胡瑗接过陆玄机手书细读，抚须颔首）“陆先生虽隐于东海，其奇门数理实脱胎于《大戴礼记 · 明堂》九宫之法。所谓‘二四为肩，六八为足，左三右七，戴九履一，五居中央’，随冬夏二至顺逆飞布，故海上礁阵看似死石，实随早晚潮汐化作八门生死之变！”'),
    S('NPC-0024', '（苏舜钦饮尽杯中清酒，豪爽指向西北方）“至于少侠所追那名海寇刀客——适才书院门生自城外采风归来，言及有一名耳戴骨环、身背双刀的怪客正往西北虎丘山方向疾奔，似欲借古塔地高望远之便向太湖外船发烟火信号！少侠若先去【虎丘剑池 · 裂崖飞梁吴王剑池】盘查必能截住他；日后若南下杭州，还可持我二人书信去府衙拜谒范希文（范仲淹）公！”'),
  ],
  choices: [
    {
      id: 'thd_canglang_comprehend_math',
      label: '向胡瑗先生请益洛书顺逆飞宫口诀，印证奇门算理',
      subLabel: '要求【经义 ≥ 45】或【算术 ≥ 45】· 领悟洛书九宫纲要并获大儒青睐',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需经义 ≥ 45 或 算术 ≥ 45',
        conditions: [
          { type: 'skillAtLeast', key: '经义', min: 45 },
          { type: 'skillAtLeast', key: '算术', min: 45 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '算术', delta: 1 },
        { type: 'modifySkill', key: '经义', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0051' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0024' }, delta: 15 },
        {
          type: 'setQuestStep',
          questId: QUEST_ID,
          stepId: 'suzhou_huqiu_pool',
          silent: false,
        },
        toast('洛书贯通！获赠苏舜钦、胡瑗致范仲淹问候书，速赴【虎丘剑池 · 裂崖飞梁吴王剑池】追索海寇！', 'success', '沧浪问数'),
      ],
    },
    {
      id: 'thd_canglang_standard_go',
      label: '收妥胡瑗所录九宫口诀与荐书，即刻出城直奔虎丘剑池',
      subLabel: '稳步推进 · 赶往虎丘剑池拦截黑鲨帮趟风哨',
      tone: 'primary',
      effects: [
        {
          type: 'setQuestStep',
          questId: QUEST_ID,
          stepId: 'suzhou_huqiu_pool',
          silent: false,
        },
        toast('已获洛书口诀与荐书！请出城前往【苏州府 · 虎丘剑池 · 裂崖飞梁吴王剑池】追缉海寇。', 'talk', '碧海潮信'),
      ],
    },
  ],
}

const SCENE_05_SHANTANG_INN_XUE: StorySceneDef = {
  id: 'scene_thd_map_05_shantang_inn_xue',
  title: '第五幕 · 山塘水巷救伤使',
  subtitle: '苏州府 · 山塘水巷客栈',
  beats: [
    S('NPC-0172', '（薛慕华连施三针封住信使心脉，擦汗道）“好霸道的东海海蛇腥毒！幸亏这小哥内功尚有桃花岛吐纳底子，再晚半个时辰便神仙难救。少侠你来听，他已能开口说话了。”'),
    S({ name: '桃花岛外庄信使', title: '碧波护图弟子', factionName: '东海桃花岛', portraitUrl: '/assets/characters/templates/tpl_taohuadao_male_fb.jpg' }, '（虚弱地抓住少侠衣袖）“多谢神医与少侠救命……伏击我的乃是东海黑鲨帮的趟风哨‘踏浪鬼’鲨七郎！我拼死毁了包裹封套，但他抢走了装在里面的《东海璇玑潮信盘》，逃往城外西北高处去了……另外陆师伯嘱咐，若要参解盘上九宫变数，须去城南【沧浪亭书院】求教胡翼之先生！”'),
    P('“你且在薛神医处安心静养，追回璇玑潮信盘之事包在我身上！我这就先赴沧浪亭书院取九宫口诀并打探西北山道去向。”'),
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'suzhou_canglang_academy',
      silent: false,
    },
    toast('信使脱险！请前往【苏州府 · 沧浪亭书院】拜访苏舜钦与胡瑗，参详九宫口诀并追查鲨七郎去向。', 'talk', '碧海潮信'),
  ],
}

const SCENE_04_SHANTANG_INN_ARRIVE: StorySceneDef = {
  id: 'scene_thd_map_04_shantang_inn_arrive',
  title: '第四幕 · 阎王敌手拔蛇毒',
  subtitle: '苏州府 · 山塘水巷客栈',
  beats: [
    N('少侠疾步入姑苏城七里山塘，在水巷客栈二楼厢房内，只见一名年轻的桃花岛外庄信使面色青紫地昏卧榻上，左肩刀伤泛着诡异腥甜，而素有“阎王敌”之称的神医薛慕华正打开药箱凝神诊脉。'),
    P('（上前抱拳递上陆玄机信物）“薛神医请了！在下受太湖望湖水榭陆玄机前辈之托赶来查探，不知这位桃花岛小兄弟伤势如何？”'),
  ],
  onFinishEffects: [openScene('scene_thd_map_05_shantang_inn_xue', 'QST-ADV-TAOHUADAO-MAP')],
}

const SCENE_03_LU_XUANJI_ENTRUST: StorySceneDef = {
  id: 'scene_thd_map_03_lu_xuanji_entrust',
  title: '第三幕 · 奇门双器系苏杭',
  subtitle: '苏州府 · 太湖烟波渡口洞庭奇石望湖水榭',
  beats: [
    S('NPC-0174', '“少侠快人快语！我东海桃花岛孤悬舟山外洋三百六十里，四周暗流漩涡与一百零八座奇门乱礁随潮汐生灭，若无本门秘绘的《东海桃花岛奇门海道舆图》，纵是千料大舶亦是有去无回。”'),
    S('NPC-0174', '“为防海图外泄，敝岛将绘图的母器一分为二：测算节气潮信的《东海璇玑潮信盘》由苏州外庄掌管，记载暗礁方位的《洛书暗礁泥印底本》则存放在杭州府。不料昨日自杭赴苏的本门信使在枫桥外遭东海巨寇‘黑鲨帮’暗算，身中蛇毒逃入城中【山塘水巷客栈】，随身携带的璇玑潮信盘竟被海寇夺走！”'),
    P('“黑鲨帮竟敢从外洋摸进平江府劫夺信使！陆阵主需坐镇水榭以防调虎离山，不如将信物交予在下，我先去山塘水巷客栈救治信使、追回《东海璇玑潮信盘》，再视贼情南下杭州府保住泥印底本！”'),
    S('NPC-0174', '（陆玄机大喜，解下腰间青玉桃花佩与一封致沧浪亭胡瑗的手书递给少侠）“得少侠鼎力相助，实乃天意！城中山塘客栈恰好有函谷神医薛慕华驻留，少侠速持玉佩前去问询信使口供。待苏杭两件母器俱全，陆某必亲手为少侠绘就一卷完整的《东海桃花岛奇门海道舆图》！”'),
  ],
  onFinishEffects: [
    {
      type: 'startQuest',
      questId: QUEST_ID,
      stepId: 'suzhou_shantang_inn',
      silent: false,
    },
    toast('已接下苏杭奇遇《碧海潮信 · 东海桃源图》！请速赴【苏州府 · 山塘水巷客栈】探视中毒的桃花岛信使。', 'success', '碧海潮信'),
  ],
}

const SCENE_02_LU_XUANJI_RIDDLE: StorySceneDef = {
  id: 'scene_thd_map_02_lu_xuanji_riddle',
  title: '第二幕 · 五湖石局试机锋',
  subtitle: '苏州府 · 太湖烟波渡口洞庭奇石望湖水榭',
  beats: [
    S('NPC-0174', '（青衫老者陆玄机缓缓转过身来，目光在少侠腰间兵刃与气度上扫过，指了指水榭栏外九块浸在湖波中的太湖漏透奇石）“少年人向往东海仙山倒也不奇，只是桃花岛外海礁阵比这水榭前的九宫奇石凶险百倍。老夫且问你——海水潮生潮落，一日两至，世人皆畏怒涛拍礁，你道行船入阵当求‘避礁’还是‘乘潮’？”'),
    P('（凝视湖水漫过石孔时回旋消散的波纹，朗声答道）“暗礁伏于水底，刻意曲折避之反易堕入漩涡死门；唯有算准朔望潮信涨满之刻，借大潮托舟凌越浅礁，方是顺天应时之生路！”'),
    S('NPC-0174', '（陆玄机抚掌动容，原本紧锁的眉头微微舒展）“好一个‘借潮凌礁、顺天应时’！老夫乃东海桃花岛五湖阵主陆玄机，今日正为本门海道母图失窃一事焦头烂额，不想在望湖水榭遇上一位有慧根的少侠！”'),
  ],
  onFinishEffects: [openScene('scene_thd_map_03_lu_xuanji_entrust', 'QST-ADV-TAOHUADAO-MAP')],
}

const SCENE_01_WANGHU_PAVILION_INTRO: StorySceneDef = {
  id: 'scene_thd_map_01_wanghu_pavilion_intro',
  title: '第一幕 · 望湖水榭闻海警',
  subtitle: '苏州府 · 太湖烟波渡口洞庭奇石望湖水榭',
  beats: [
    N('苏州城外太湖烟波渡口东隅，有一座以洞庭太湖奇石依八卦方位垒筑的望湖水榭。水榭檐角悬着八枚东海青螺风铃，海风吹过本该清越成韵，今日却有一枚螺铃被暗器震裂，地上还散落着几根染血的信鸽翠羽。'),
    N('水榭凭栏处，一位身穿宽袖青衫、须发飘逸的老者正手持半截折断的竹筹凝望东南海天方向，案头摊着一幅残缺不全的舟山洋面草图，眉宇间满是忧急之色——正是东海桃花岛派驻江南的奇门阵法宗匠“五湖阵主”陆玄机。'),
    P('（轻步踏入望湖水榭，见案头草图标注着“东海桃花岛”字样，抱拳施礼道）“晚辈久闻东海之外有世外仙山名曰桃花岛，奈何外洋迷雾乱礁封绝，无图难渡。今见前辈对着海图凝眉，莫非海上出了什么变故？”'),
  ],
  choices: [
    {
      id: 'thd_accept_quest',
      label: '上前与五湖阵主陆玄机论道，探询东海海图变故',
      subLabel: '开启横跨苏州府与杭州府的二流中品奇遇 · 完成后解锁【东海桃花岛】',
      tone: 'gold',
      effects: [openScene('scene_thd_map_02_lu_xuanji_riddle', 'QST-ADV-TAOHUADAO-MAP')],
    },
    {
      id: 'thd_hold_off',
      label: '暂不惊扰老者深思，日后再来拜会',
      subLabel: '稍后仍可在望湖水榭向陆玄机重提此事',
      tone: 'default',
      effects: [],
    },
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  [SCENE_25_EPILOGUE_UNLOCK.id]: SCENE_25_EPILOGUE_UNLOCK,
  [SCENE_24_LU_XUANJI_CALIBRATE.id]: SCENE_24_LU_XUANJI_CALIBRATE,
  [SCENE_23_RETURN_SUZHOU_PAVILION.id]: SCENE_23_RETURN_SUZHOU_PAVILION,
  [SCENE_22_HANGZHOU_PORT_REPORT.id]: SCENE_22_HANGZHOU_PORT_REPORT,
  [SCENE_21_PORT_BOSS_AFTER.id]: SCENE_21_PORT_BOSS_AFTER,
  [SCENE_20_PORT_DOCK_SHOWDOWN.id]: SCENE_20_PORT_DOCK_SHOWDOWN,
  [SCENE_19_PORT_MAIN_WUMIANFENG.id]: SCENE_19_PORT_MAIN_WUMIANFENG,
  [SCENE_18_TIDE_PAVILION_QU.id]: SCENE_18_TIDE_PAVILION_QU,
  [SCENE_17_NUCHAO_BATTLE_AFTER.id]: SCENE_17_NUCHAO_BATTLE_AFTER,
  [SCENE_16_NUCHAO_HALL_CLASH.id]: SCENE_16_NUCHAO_HALL_CLASH,
  [SCENE_15_LINGYIN_SUTRA_TRACE.id]: SCENE_15_LINGYIN_SUTRA_TRACE,
  [SCENE_14_HANGZHOU_TAVERN_ZHANGXIAN.id]: SCENE_14_HANGZHOU_TAVERN_ZHANGXIAN,
  [SCENE_13_HANGZHOU_YAMEN_FAN.id]: SCENE_13_HANGZHOU_YAMEN_FAN,
  [SCENE_12_ACADEMY_BISHENG_CIPHER.id]: SCENE_12_ACADEMY_BISHENG_CIPHER,
  [SCENE_11_ARRIVE_HANGZHOU_ACADEMY.id]: SCENE_11_ARRIVE_HANGZHOU_ACADEMY,
  [SCENE_10_SUZHOU_PAVILION_MID.id]: SCENE_10_SUZHOU_PAVILION_MID,
  [SCENE_09_HUQIU_PAGODA_AFTER.id]: SCENE_09_HUQIU_PAGODA_AFTER,
  [SCENE_08_HUQIU_PAGODA_BATTLE.id]: SCENE_08_HUQIU_PAGODA_BATTLE,
  [SCENE_07_HUQIU_POOL_SHIQINGLU.id]: SCENE_07_HUQIU_POOL_SHIQINGLU,
  [SCENE_06_CANGLANG_ACADEMY_LUOSHU.id]: SCENE_06_CANGLANG_ACADEMY_LUOSHU,
  [SCENE_05_SHANTANG_INN_XUE.id]: SCENE_05_SHANTANG_INN_XUE,
  [SCENE_04_SHANTANG_INN_ARRIVE.id]: SCENE_04_SHANTANG_INN_ARRIVE,
  [SCENE_03_LU_XUANJI_ENTRUST.id]: SCENE_03_LU_XUANJI_ENTRUST,
  [SCENE_02_LU_XUANJI_RIDDLE.id]: SCENE_02_LU_XUANJI_RIDDLE,
  [SCENE_01_WANGHU_PAVILION_INTRO.id]: SCENE_01_WANGHU_PAVILION_INTRO,
}
