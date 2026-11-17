import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, setStep, warn, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { TIEZHANG_ENTRY_QUEST_ID } from './tiezhangEntryQuest'

const SPEAKER_LAO_ZHOUTOU: StorySpeakerSpec = {
  kind: 'custom',
  name: '老周头',
  title: '汉水运砂老船户',
  factionName: '荆襄船户',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_XIAOQIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '阿芹',
  title: '运砂船户孤女',
  factionName: '荆襄船户',
  portraitUrl: '/assets/characters/templates/tpl_caobang_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_female_av.jpg',
}

const SPEAKER_ZHANG_HENG: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑齿张横',
  title: '汉水钞关巡埠副管事 · 旧白浪水匪',
  factionName: '铁掌外埠恶吏',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildLeiGenleiSparNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_TZ_LEIGENLEI_SPAR',
    name: '雷艮磊（试掌拆招）',
    title: '洞庭水寨巡船弟子',
    realm: '不入流',
    factionId: 'SECT-15',
    factionName: '铁掌帮',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_tiezhang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tiezhang_fb.jpg',
    stats: { hp: 220, mp: 85, agi: 14, res: 6 },
    talents: { bone: 51, comprehension: 37, charm: 42 },
    equippedArts: { neigong: 'MA-229', qinggong: 'MA-120', move1: 'MA-236', move2: 'MA-193' },
    learnedArts: [{ artId: 'MA-229', level: 1 }, { artId: 'MA-120', level: 1 }, { artId: 'MA-236', level: 1 }, { artId: 'MA-193', level: 1 }],
    equipped: { weapon: 'WPN-084', armor: 'ARM-040', shoes: 'BOT-026', bow: 'BOW-018', accessory1: 'ACC-035', accessory2: 'ACC-051', mount: 'MNT-021' },
    talk: '“嘿嘿，焦大舵主亲手教出来的新兄弟，让我雷艮磊试试你的劈碑掌劲够不够烫手！”',
  })
}

function buildZhangHengBargeNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_TZ_ZHANGHENG_BARGE',
    name: '黑齿张横与白浪水匪',
    title: '盗药叛帮恶吏',
    realm: '不入流',
    factionId: 'ORG-01',
    factionName: '白浪水寇',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    stats: { hp: 255, mp: 95, agi: 15, res: 7 },
    talents: { bone: 48, comprehension: 36, charm: 24 },
    equippedArts: { neigong: 'MA-199', qinggong: 'MA-218', move1: 'MA-209', move2: 'MA-204' },
    learnedArts: [{ artId: 'MA-199', level: 1 }, { artId: 'MA-218', level: 1 }, { artId: 'MA-209', level: 1 }, { artId: 'MA-204', level: 1 }],
    equipped: { weapon: 'WPN-076', armor: 'ARM-042', shoes: 'BOT-023', bow: 'BOW-021', accessory1: 'ACC-043', accessory2: 'ACC-044', mount: 'MNT-023' },
    talk: '“又是你这汉水码头多管闲事的小杂种！屠芳云被我的人缠住了，老子先拿你祭江！”',
  })
}

function buildYunbaoSuppressedSparNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_TZ_YUNBAO_SPAR',
    name: '上官云豹（束劲问拳）',
    title: '铁掌少主 · 压制内力只使初阶掌法',
    realm: '三流下品',
    factionId: 'SECT-15',
    factionName: '铁掌帮',
    sectRank: 3,
    sectRankLabel: '少帮主',
    avatarUrl: '/assets/characters/avatars/NPC-0222.jpg',
    portraitUrl: '/assets/characters/fullbody/NPC-0222.jpg',
    stats: { hp: 280, mp: 120, agi: 17, res: 9 },
    talents: { bone: 82, comprehension: 61, charm: 74 },
    equippedArts: { neigong: 'MA-229', qinggong: 'MA-198', move1: 'MA-236', move2: 'MA-165' },
    learnedArts: [{ artId: 'MA-229', level: 1 }, { artId: 'MA-198', level: 1 }, { artId: 'MA-236', level: 1 }, { artId: 'MA-165', level: 1 }],
    equipped: { weapon: 'WPN-069', armor: 'ARM-038', shoes: 'BOT-018', bow: 'BOW-011', accessory1: 'ACC-020', accessory2: 'ACC-021', mount: 'MNT-014' },
    talk: '“本少主今日封去九成真气，只以第一重《铁掌劈碑手》与你公道拆招——让我看看焦叔和屠香主看中的人，骨头到底有多硬！”',
  })
}

function buildTianpengThreePalmsNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_TZ_TIANPENG_TRIAL',
    name: '上官天鹏（三掌考心）',
    title: '铁掌神鹰 · 敛去宗师罡气考校后辈',
    realm: '三流下品',
    factionId: 'SECT-15',
    factionName: '铁掌帮',
    sectRank: 5,
    sectRankLabel: '帮主',
    avatarUrl: '/assets/characters/avatars/NPC-0117.jpg',
    portraitUrl: '/assets/characters/fullbody/NPC-0117.jpg',
    stats: { hp: 999, mp: 300, agi: 18, res: 18 },
    talents: { bone: 91, comprehension: 85, charm: 66 },
    equippedArts: { neigong: 'MA-229', qinggong: 'MA-035', move1: 'MA-236', move2: 'MA-186' },
    learnedArts: [{ artId: 'MA-229', level: 1 }, { artId: 'MA-035', level: 1 }, { artId: 'MA-236', level: 1 }, { artId: 'MA-186', level: 1 }],
    equipped: { weapon: 'WPN-069', armor: 'ARM-024', shoes: 'BOT-009', bow: 'BOW-010', accessory1: 'ACC-027', accessory2: 'ACC-020', mount: 'MNT-013' },
    talk: '“记住焦木教你的守御卸力与双招轮转！撑过老夫这三合掌风不退半步，这聚义堂便有你一碗烈酒！”',
  })
}

const SCENE_TZ_20_IRON_SAND_OATH: StorySceneDef = {
  id: 'scene_tz_20_iron_sand_oath',
  title: '第二十幕 · 雄黄烈酒入铁掌',
  subtitle: '铁掌帮聚义总堂 · 烟波归宗',
  mandatory: true,
  beats: [
    N('第三记掌风余劲散去，聚义正堂两侧十六只铁砂火盆齐声爆起噼啪火星！你双足在黑石砖上犁出两道寸许浅痕，嘴角微沁血丝，脊梁却如洞庭湖畔迎风不折的桅杆般笔挺伫立。堂上静寂一瞬，旋即爆发出震耳欲聋的喝彩！'),
    S('NPC-0223', '（焦木激动得满脸虬髯乱颤，百斤熟铜船桨重重顿在石阶上，声若洪钟）“哈哈哈！帮主您瞧见没！老焦我在汉水码头一眼相中的好苗子，没给咱们洞庭水寨丢半点份儿！”'),
    S('NPC-0117', '（上官天鹏朗声长笑，亲自拍开一坛封泥十年的洞庭春烈酒，捏入一撮辰州雄黄赤砂，斟满两只粗犷黑陶大碗，缓步走下虎皮高阶递到你面前）“好一个不知退缩的小子！世人骂我铁掌帮霸道也好、敬我铁掌帮威风也罢，今日老夫只教你一句话——铁掌之所以为铁，不在欺压手无寸铁之辈，而在八百里风浪压顶之时，敢替身后弟兄擎起这片天！”'),
    S('NPC-0539', '（屠芳云立于堂侧火光之中，平日冷冽的眉眼化作一抹明澈温柔的笑意，向你轻轻举起手中酒盏；不远处的少帮主上官云豹亦抱臂扬眉，朝你微一颔首）“饮了这碗雄黄铁砂酒，往后这五指峰的风雨，便有咱们并肩同当了。”'),
  ],
  choices: [
    {
      id: 'tz20_oath_chivalric_wave',
      label: '【踏浪侠掌 · 义护烟波】双手接碗一饮而尽：“愿凭此双铁掌，护八百里水陆苦人安宁！”',
      subLabel: '拜入铁掌帮外门 · 获赐门派披挂、另赠【天香断续胶】与纹银30两，焦木/屠芳云/沈平威结下生死厚谊',
      tone: 'jade',
      effects: [
        { type: 'setFlag', flag: 'tz_disciple_creed', value: 'righteous_wave' },
        { type: 'leaveSect', skipPenalty: true },
        { type: 'joinSect', sectId: 'SECT-15', rank: 1, allowOfficialTransfer: true },
        { type: 'giveItem', itemId: 'ITM-MED-112', qty: 1 },
        { type: 'giveFood', amount: 6 },
        { type: 'giveSilver', amount: 30, reason: '铁掌帮水陆巡江安家赏银' },
        { type: 'addSectContribution', amount: 60 },
        { type: 'modifyChivalry', delta: 22, reason: '立誓以铁掌护佑荆湘水陆船户苍生' },
        { type: 'modifyRenown', delta: 20, reason: '连闯赤砂沸鼎与帮主三掌考校，拜入洞庭铁掌帮' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0117' }, delta: 22 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0223' }, delta: 35 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0539' }, delta: 40 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0222' }, delta: 25 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0693' }, delta: 25 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0885' }, delta: 20 },
        {
          type: 'completeQuest',
          questId: TIEZHANG_ENTRY_QUEST_ID,
          outcome: 'joined_tiezhang_righteous',
          combatExp: 110,
        },
        toast('正式拜入一流宗门【铁掌帮】！获赐熟牛皮护胸、游侠青布快靴、精铁缠腕护手，及屠芳云与焦木另备的【天香断续胶】与宗门功绩！', 'success', '铁掌归宗'),
      ],
    },
    {
      id: 'tz20_oath_hegemon_peak',
      label: '【擎天霸掌 · 威震两湖】仰首干尽雄黄烈酒：“丈夫立世当执牛耳，定叫铁掌威名响彻九州！”',
      subLabel: '拜入铁掌帮外门 · 获赐门派披挂、另赠【游侠熟铁护心片】与纹银45两，声望与帮主/少主好感大增',
      tone: 'gold',
      effects: [
        { type: 'setFlag', flag: 'tz_disciple_creed', value: 'hegemon_peak' },
        { type: 'leaveSect', skipPenalty: true },
        { type: 'joinSect', sectId: 'SECT-15', rank: 1, allowOfficialTransfer: true },
        { type: 'giveItem', itemId: 'ACC-036', qty: 1 },
        { type: 'giveFood', amount: 6 },
        { type: 'giveSilver', amount: 45, reason: '铁掌帮聚义总堂重赏骁勇新锐' },
        { type: 'addSectContribution', amount: 80 },
        { type: 'modifyRenown', delta: 30, reason: '豪饮雄黄烈酒拜入铁掌峰，霸气震动荆湘两湖' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0117' }, delta: 32 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0222' }, delta: 32 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0176' }, delta: 18 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0223' }, delta: 28 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0539' }, delta: 30 },
        {
          type: 'completeQuest',
          questId: TIEZHANG_ENTRY_QUEST_ID,
          outcome: 'joined_tiezhang_hegemon',
          combatExp: 110,
        },
        toast('正式拜入一流宗门【铁掌帮】！获赐熟牛皮护胸、游侠青布快靴、精铁缠腕护手，及帮主亲赐【游侠熟铁护心片】与丰厚赏银功绩！', 'success', '铁掌归宗'),
      ],
    },
  ],
}

const SCENE_TZ_19_CHIEF_THREE_PALMS: StorySceneDef = {
  id: 'scene_tz_19_chief_three_palms',
  title: '第十九幕 · 聚义正堂接三掌',
  subtitle: '第一指峰黑石巨堂 · 铁掌神鹰考心',
  mandatory: true,
  beats: [
    N('踏入第一指峰之巅的【铁掌帮聚义正堂】，但见整座大堂皆以乌黑巨石垒筑，堂中火盆赤砂灼烧，热浪滚滚。高阶虎皮交椅之上，年逾五旬、双目如苍鹰俯视云梦泽的宗师霸主——「铁掌神鹰」上官天鹏正摩挲着一对暗泛乌金光泽的手掌，堂下副帮主罗天豹、铜桨舵主焦木、少帮主上官云豹、苗卫沈平威与屠芳云分列两厢。'),
    S('NPC-0117', '“汉水码头替船户挡鞭，百斤铁沙场赤手熬过三炷香，夜探芦荡替本帮揪出盗药蛀虫，方才在剑痕崖还与云豹打了个旗鼓相当——短短十数日，你倒把老夫这铁掌峰搅得好生热闹！”'),
    S('NPC-0176', '（副帮主罗天豹阴鸷冷哼一声）“大哥，帮规不可废！外人未经总堂掌力考校，纵立下些许微功，亦断无破格收录门墙之理！”'),
    S('NPC-0117', '（上官天鹏长身而起，一股渊渟岳峙的宗师气度压得满堂火苗猛然一伏，旋即他又将护体罡气尽数敛去）“天豹说得不错。小子，老夫不欺你初学乍练，今日敛去宗师真气，只用第一重掌力考你三合——不求你胜过老夫，只要善用攻守转换，在堂中撑满三回合不逃不退，你便是我铁掌峰堂堂正正的弟子！”'),
  ],
  choices: [
    {
      id: 'tz19_accept_three_palms',
      label: '【抱拳沉腰 · 迎战三掌】“晚辈领帮主赐教！”（撑满 3 回合即过关）',
      subLabel: '宗门终考 · 善用守御架势与招式轮换撑过 3 回合，纵力竭不倒亦算过关',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: TIEZHANG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildTianpengThreePalmsNpc() },
          rule: 'survive_rounds',
          maxRounds: 3,
          lethalOnLose: false,
          forbidEscapeReason: '身在铁掌帮聚义正堂群豪注视之下，宁可站着受掌，绝不可弃战而逃！',
          introText:
            '堂中赤砂火盆烈焰升腾！上官天鹏敛去九成宗师真力，一记沉稳如山岳的掌风当胸推至，考校你的根基与胆魄！',
          onWin: [
            { type: 'giveCombatExp', amount: 65, reason: '聚义正堂稳稳接下帮主上官天鹏三掌考校' },
            { type: 'healPlayer', hpPct: 100, mpPct: 100 },
            openScene('scene_tz_20_iron_sand_oath', 'QST-SECT-15-ENTRY'),
          ],
          onLose: [
            { type: 'giveCombatExp', amount: 45, reason: '聚义正堂拼尽全力硬抗帮主掌风不退半步' },
            { type: 'healPlayer', hpPct: 100, mpPct: 100 },
            toast('第三掌落下时你虽气血翻涌单膝点地，却硬是一把撑住青石地面重新站起！上官天鹏抚掌大赞：“好一副铁打的脊梁！”', 'success', '三掌问心'),
            openScene('scene_tz_20_iron_sand_oath', 'QST-SECT-15-ENTRY'),
          ],
        },
      ],
    },
  ],
}

const SCENE_TZ_18_YUNBAO_DUEL: StorySceneDef = {
  id: 'scene_tz_18_yunbao_duel',
  title: '第十八幕 · 剑痕崖前少主问拳',
  subtitle: '绝壁石刻 · 棋逢对手化前嫌',
  mandatory: true,
  beats: [
    N('你挟着满身飞瀑水雾跃出试炼涧，踏上中峰东侧的【绝壁石刻 · 剑痕崖】。猎猎山风之中，一道玄衣劲装的挺拔身影早已抱臂立在崖边——正是铁掌帮少帮主上官云豹！此时他身边竟未带一名随扈，甚至用一条牛皮索将自己右臂护腕卸在石上。'),
    S('NPC-0222', '“在襄阳汉水码头初次见你时，我只当你是街头不知天高地厚的愣头青。没想到张横那吃里扒外的狗东西在我眼皮底下做假账、换毒药，反倒叫你一个刚学十来天功夫的外人替我擦干净了手尾。”'),
    S('NPC-0222', '（上官云豹转过身，眼中既有桀骜不驯的锋芒，亦有一丝坦荡战意）“我不喜欢欠人情，更不服焦叔和屠芳云左一句、右一句夸你胜过本少主当年！今日我不仗一流修为欺你，将内力压到与你一般的第一重境界，咱们在崖前堂堂正正拆几招——敢不敢接？”'),
    S('NPC-0539', '（屠芳云按剑立于古松旁，低声提醒你）“少帮主虽性子傲慢，武道上却从不使暗算。把你在铁沙场和飞瀑木桩上悟到的东西全使出来，莫堕了威风！”'),
  ],
  choices: [
    {
      id: 'tz18_spar_yunbao',
      label: '【缠紧红麻护腕踏步上前】“少帮主爽快，请赐教！”',
      subLabel: '同境公平切磋 · 胜负皆可赢得少帮主上官云豹真正折服与尊重',
      tone: 'primary',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: TIEZHANG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildYunbaoSuppressedSparNpc() },
          rule: 'spar',
          introText: '五指中峰云涛翻涌！你运起《铁掌烈火吐纳功》与新悟的《梅花桩步》，与束劲问拳的上官云豹正面交锋！',
          onWin: [
            { type: 'setFlag', flag: 'tz_beat_yunbao_spar', value: true },
            { type: 'giveCombatExp', amount: 55, reason: '剑痕崖同境切磋胜过少帮主上官云豹' },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0222' }, delta: 22 },
            { type: 'healPlayer', hpPct: 100, mpPct: 100 },
            toast('上官云豹被你借步卸力一掌震退半步，怔了片刻后仰天洒然大笑：“痛快！同境之下我竟输你半招，焦叔果然没看错人！走，随我去聚义正堂见我爹！”', 'success', '少主折服'),
            setStep(TIEZHANG_ENTRY_QUEST_ID, 'hall_chief_trial'),
          ],
          onLose: [
            { type: 'giveCombatExp', amount: 40, reason: '剑痕崖与少帮主上官云豹酣畅拆招' },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0222' }, delta: 16 },
            { type: 'healPlayer', hpPct: 100, mpPct: 100 },
            toast('你虽惜败半式，掌劲却震得上官云豹掌心发麻。他收拳挑眉笑道：“才练十来天就有这等火候，好小子，这铁掌峰我认你这个兄弟！快去聚义正堂见我爹吧！”', 'talk', '惺惺相惜'),
            setStep(TIEZHANG_ENTRY_QUEST_ID, 'hall_chief_trial'),
          ],
        },
      ],
    },
  ],
}

const SCENE_TZ_17_TOMB_WATER_STAKES: StorySceneDef = {
  id: 'scene_tz_17_tomb_water_stakes',
  title: '第十七幕 · 秘冢飞瀑踏木桩',
  subtitle: '五指中峰试炼涧 · 初窥水上漂意',
  mandatory: true,
  beats: [
    N('穿过云雾缭绕的中峰山口，眼前便是历代帮主埋骨藏书的外围试炼地——【飞瀑深潭 · 试炼涧】。白练般的山涧飞瀑自十丈绝壁轰然砸入寒潭，潭面上错落钉着三十六根碗口粗、被水花冲刷得滑不留手的湿油松木桩，对岸崖壁上隐约刻着两行苍劲大字。'),
    S('NPC-0539', '“内室石洞乃是历代老帮主安息禁地，非真传与掌门不得擅入；但这外涧三十六根飞瀑松桩，却是初代帮主留给后人感悟《水上漂》身法的试金石。记住焦叔在船坞教你的『借浪换气』——脚尖点桩如蜻蜓掠水，万不可把死力砸在一根木桩上！”'),
    N('你深吸一口山涧清冽水汽，丹田内那一缕滚烫的《铁掌烈火吐纳功》真气顺着足少阴肾经疾速流转。踏上第一根湿滑松桩时木身剧晃，你立时想起在连环船坞撑百斤铜桨的起伏韵律，左足未沉、右足已借着飞瀑激流之势轻捷点向下一桩！三起三落间，衣袂带风掠过深潭，稳稳落于对岸石台之上！'),
    N('抬头望去，只见对岸苍黑石壁上以指力生生抠出十六个寸许深的摩崖大字——“掌重千钧，步轻一羽；无义之铁，不过顽石。”短短十六字，道尽了铁掌帮刚柔相济、霸道亦存仁义的创派真谛，令你胸中豁然开朗，脚下步法陡然轻灵数分！'),
  ],
  choices: [
    {
      id: 'tz17_comprehend_stakes',
      label: '【向先辈摩崖石刻肃然一揖】融会踏浪桩步，转身步向剑痕崖！',
      subLabel: '感悟先辈遗训 · 领悟并自动运使轻功《梅花桩步》（第1重），实战身法大增',
      tone: 'jade',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-198', level: 1, exp: 350, autoEquip: true },
        { type: 'modifySkill', key: '骑术', delta: 4 },
        openScene('scene_tz_18_yunbao_duel', 'QST-SECT-15-ENTRY'),
      ],
    },
  ],
}

const SCENE_TZ_16_CLIFF_HEART_TALK: StorySceneDef = {
  id: 'scene_tz_16_cliff_heart_talk',
  title: '第十六幕 · 铁索寒云诉平生',
  subtitle: '五指中峰绝壁栈道 · 红麻系腕',
  mandatory: true,
  beats: [
    N('翌日清晨，洞庭大雾渐散，朝阳金辉洒在五指峰陡峭入云的铁索石阶之上。你与屠芳云并肩拾级而上，脚下是翻涌如银海的八百里烟波，山风吹起她鬓边一缕乌发，少了平日钞关查账时的凌厉，反添几分江湖儿女的清飒。'),
    S('NPC-0539', '（行至半山古亭，屠芳云忽停下脚步，从怀中取出一对以湘西朱砂红麻与细牛筋密密编成的护腕绳，递到你面前）“伸手。待会儿上峰顶难免要与人动手，你掌心新皮初长，缠上这根牛筋红麻绳，发力时腕骨不至于震伤。”'),
    P('（看着绳结上细密的针脚与残留的淡淡艾草药香，心中微动）“屠姐姐昨夜回寨后一直没睡，连夜编的？”'),
    S('NPC-0539', '（屠芳云耳根微不可察地掠过一丝浅红，低头利落地替你系紧腕绳，声音轻却坚定）“顺手编的罢了，少自作多情……十二年前，我爹娘在鄱阳湖跑小货船被水贼劫杀，是焦叔一桨拍翻贼船把我救回铁掌峰。这江湖上许多人都怕铁掌帮的恶名，可我一直盼着帮里能多几个像焦叔、像你这样，拳头硬却心肠热的人。”'),
    S('NPC-0539', '“走吧，前面便是【五指中峰禁地秘冢】外涧。我方才瞧见少帮主上官云豹的身影也往剑痕崖去了——今日无论谁挡在前面，我都站在你这边。”'),
  ],
  choices: [
    {
      id: 'tz16_promise_fangyun',
      label: '【握紧腕间红麻绳温言应诺】“屠姐姐放心，这份情义我记在心里，绝不负你所望！”',
      subLabel: '缘分深结 · 屠芳云好感大幅提升，获赠【粗皮护腕】一副',
      tone: 'gold',
      effects: [
        { type: 'giveItem', itemId: 'ACC-043', qty: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0539' }, delta: 20 },
        openScene('scene_tz_17_tomb_water_stakes', 'QST-SECT-15-ENTRY'),
      ],
    },
  ],
}

const SCENE_TZ_15_SUMMONS_TO_PEAK: StorySceneDef = {
  id: 'scene_tz_15_summons_to_peak',
  title: '第十五幕 · 铁羽令箭召总堂',
  subtitle: '水寨望楼钞关厅 · 帮主法旨',
  mandatory: true,
  beats: [
    N('钞关厅内争执方歇，门外骤然传来“夺”的一声裂木锐响！一支通体乌黑、尾缀雕翎的五指铁羽令箭破空射入望楼横梁，箭尾兀自铮铮颤鸣！全场帮众神色剧凛，齐刷刷躬身抱拳。'),
    S('NPC-0693', '（湘西五溪苗卫沈平威手持黑漆令牌缓步踏入厅中，朝众人一拱手）“传帮主上官老当家口谕：盗药叛徒张横押入东厢军资刑堂严办，其余烧火药童既系无辜受蒙，一概免罪复职！至于那个还没正式拜山、倒先替咱们铁掌峰拔了颗烂牙的小兄弟——”'),
    S('NPC-0693', '（沈平威转头望向你，脸上露出难得的笑意）“帮主有令：明日准你由屠芳云香主引路，先登【五指中峰禁地秘冢】外涧参瞻先辈摩崖步法，再赴第一指峰【铁掌帮聚义总堂】面见帮主亲受考校！”'),
    S('NPC-0223', '（焦木重重一拍你的肩膀，笑得震天响）“听见没！中峰秘冢外涧那可是连寻常内门弟子都难得一去的宝地！今晚回船坞好生歇息一宿，明日一早跟芳云丫头上五指中峰！”'),
  ],
  onFinishEffects: [
    setStep(TIEZHANG_ENTRY_QUEST_ID, 'climb_middle_peak'),
    toast('已获帮主铁羽令箭召见！请前往【洞庭铁掌峰 · 五指中峰禁地秘冢】与屠芳云同登绝壁！', 'success', '铁羽召见'),
  ],
}

const SCENE_TZ_14_WATER_HALL_JUDGMENT: StorySceneDef = {
  id: 'scene_tz_14_water_hall_judgment',
  title: '第十四幕 · 钞关公堂辨生死',
  subtitle: '水寨望楼钞关厅 · 三方对质见本心',
  mandatory: true,
  beats: [
    N('五花大绑的黑齿张横连同三箱五溪真药与私账被押回【水寨望楼 · 钞关厅】。灯火通明的大厅内，副帮主「毒砂铁掌」罗天豹脸色铁青地翻看着账册，刚自襄阳赶回总舵述职的少帮主上官云豹更是眉头紧锁；厅角跪着两名吓得瑟瑟发抖的十五六岁烧火小药童。'),
    S('NPC-0176', '（罗天豹猛地一掌拍碎楠木案角，森然喝道）“好大的狗胆！张横勾结外匪盗卖五溪血竭，当场绑上百斤铁锚沉江喂鱼！至于这两个看守砂炉的小杂役，管他是蠢还是瞎，差点害死本帮精锐，一并剁了双手扔下洞庭湖，免得传出去坏我铁掌帮严规！”'),
    S('NPC-0539', '（屠芳云秀眉紧蹙，抱拳上前一步）“禀副帮主！张横是在襄阳上船前便以假封条调换了药箱，这两名少年药童既不识苗疆药性，更未收过半文赃银，若不分青红皂白牵连无辜，只怕寒了底下百船弟兄的心！”'),
    S('NPC-0222', '（上官云豹冷着脸看向立在堂中的你）“人是你和屠香主一块儿抓回来的，账也是你最早在汉水瞧出端倪的——你来说，这桩烂摊子该怎么断？”'),
  ],
  choices: [
    {
      id: 'tz14_stand_with_fangyun',
      label: '【与屠芳云并肩直言】“首恶必诛，无辜当免！若杀自家受蒙弟兄，岂非替叛贼张目！”',
      subLabel: '重情重义之断 · 侠义 +12，屠芳云、焦木、沈平威好感大幅提升',
      tone: 'jade',
      effects: [
        { type: 'setFlag', flag: 'tz_hall_verdict', value: 'mercy_just' },
        { type: 'modifyChivalry', delta: 12, reason: '钞关公堂据理力争保下无辜烧火药童' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0539' }, delta: 18 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0223' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0693' }, delta: 15 },
        openScene('scene_tz_15_summons_to_peak', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz14_counsel_yunbao',
      label: '【向少帮主献策整顿】“请少帮主亲整襄阳钞关验封之制，罚药童戴罪立功方显少主威德！”',
      subLabel: '明达机变之策 · 策论 +4 / 辩才 +4，顾全少主颜面又救下药童，上官云豹与屠芳云俱生好感',
      tone: 'gold',
      effects: [
        { type: 'setFlag', flag: 'tz_hall_verdict', value: 'wise_reform' },
        { type: 'modifySkill', key: '策论', delta: 4 },
        { type: 'modifySkill', key: '辩才', delta: 4 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0222' }, delta: 18 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0539' }, delta: 12 },
        openScene('scene_tz_15_summons_to_peak', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz14_strict_sect_law',
      label: '【凛遵铁血帮规】“水火无情，帮规如铁！首恶沉江，失察杂役重责三十军棍逐出内坪！”',
      subLabel: '枭雄铁腕之风 · 声望 +10，罗天豹颔首认可，保住药童性命而严明军纪',
      tone: 'primary',
      effects: [
        { type: 'setFlag', flag: 'tz_hall_verdict', value: 'iron_law' },
        { type: 'modifyRenown', delta: 10, reason: '铁腕明断水寨盗药案，威慑外埠宵小' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0176' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0222' }, delta: 10 },
        openScene('scene_tz_15_summons_to_peak', 'QST-SECT-15-ENTRY'),
      ],
    },
  ],
}

const SCENE_TZ_13_BARGE_BATTLE: StorySceneDef = {
  id: 'scene_tz_13_barge_battle',
  title: '第十三幕 · 火照连舸破叛贼',
  subtitle: '巴陵芦荡暗港 · 初掌立威',
  mandatory: true,
  beats: [
    N('乌篷快舟如离弦黑箭般自芦苇暗水道猛冲而出！前方两艘吃水深重的大货船正搭着跳板交割木箱，火把映照下，本该在襄阳停职听勘的黑齿张横竟正抓着一袋白花花的纹银狂笑！'),
    S(SPEAKER_ZHANG_HENG, '“哈哈哈！上官云豹那蠢货只顾着收过路税银，哪晓得这五溪血竭与清木香卖给巴陵水寇能翻五倍价钱！等铁沙场那帮愣头青练废了手，罗副帮主自然拿几个烧火杂役顶缸——什么人？！”'),
    S('NPC-0223', '（焦木怒吼如雷，百斤熟铜船桨横空一扫，当场将外侧贼船的木舵连同三名持叉水匪拍飞入湖）“吃里扒外的狗杂种，拿我铁掌峰弟兄的手脚换黑心银子！芳云丫头断他缆绳，小兄弟，张横这厮交给你练掌！”'),
    S('NPC-0539', '（屠芳云飞身掠上船舷，袖中窄剑寒光一闪斩断铁钩，反手逼退两名刀手，朝你清喝）“小心他左手撒石灰暗算，用刚练成的《铁掌劈碑手》正面破他中宫！”'),
  ],
  choices: [
    {
      id: 'tz13_fight_zhang_heng',
      label: '【运起烈火真气 · 跃上甲板】“张横，汉水码头的旧账今日一并算清！”',
      subLabel: '首次水战实战 · 有焦木与屠芳云掠阵，胜败皆可生擒叛贼推进剧情',
      tone: 'danger',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: TIEZHANG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildZhangHengBargeNpc() },
          rule: 'story_trial',
          forbidEscapeReason: '焦木与屠芳云已在两侧封死退路，岂能让盗药叛贼逃脱！',
          introText: '大湖夜雾火光冲天！你双足踏稳摇晃甲板，缠着铁砂护掌布的双掌挟着燥烈劲风直劈黑齿张横！',
          onWin: [
            { type: 'giveCombatExp', amount: 50, reason: '芦荡夜战击溃并生擒盗药叛徒黑齿张横' },
            { type: 'giveSilver', amount: 18, reason: '缴获黑齿张横私藏赃银零钞' },
            { type: 'teleportPlayer', regionId: 'tiezhangfeng', buildingId: 'tz_water', spotId: 'tz_water_main' },
            openScene('scene_tz_14_water_hall_judgment', 'QST-SECT-15-ENTRY'),
          ],
          onLose: [
            { type: 'healPlayer', hpPct: 70, mpPct: 70 },
            toast('张横撒出毒灰困兽犹斗之际，屠芳云剑鞘疾点其肩井穴，与你合力一掌将其拍翻擒下！', 'talk', '并肩擒贼'),
            { type: 'teleportPlayer', regionId: 'tiezhangfeng', buildingId: 'tz_water', spotId: 'tz_water_main' },
            openScene('scene_tz_14_water_hall_judgment', 'QST-SECT-15-ENTRY'),
          ],
        },
      ],
    },
  ],
}

const SCENE_TZ_12_MIST_REED_AMBUSH: StorySceneDef = {
  id: 'scene_tz_12_mist_reed_ambush',
  title: '第十二幕 · 夜雾芦荡并舟行',
  subtitle: '洞庭外湖芦苇水巷 · 汉水故人报恩',
  mandatory: true,
  beats: [
    N('子夜洞庭，白雾浓得化不开，三丈之外不见灯火。你与焦木、屠芳云悄然登上一叶涂满桐油黑漆的快船驶出连环寨。芦苇荡水道千回百转犹如迷宫，黑齿张横做惯了白浪水匪，早已在主航道布下绊船暗索，一时竟难觅贼船踪影！'),
    S(SPEAKER_LAO_ZHOUTOU, '（忽听左侧枯芦深处传来三声极轻的渔家竹哨，一叶破旧运砂舢板缓缓探出船头——竟是昔日在襄阳汉水码头被你救下的老周头与孙女阿芹！）“恩公！屠女侠！快往这边偏港摇橹，莫走前头水口，水底下横着铁倒刺哩！”'),
    S(SPEAKER_XIAOQIN, '（船头少女阿芹压低嗓音，指着芦荡深处一抹隐约红光）“我们爷孙俩今晚下湖收鱼篓，撞见汉水那个黑牙恶吏带着两条黑篷船钻进了死水湾，正在往外搬贴着铁掌封条的樟木箱子！阿公记着恩公的大恩，特意守在岔口等铁掌峰的巡船来报信！”'),
    S('NPC-0539', '（屠芳云回头看了你一眼，眸中浮起一抹由衷钦佩）“好一句善因结善果！若非你当日在汉水码头不顾自身安危护住他们爷孙，今夜咱们只怕真要撞上暗桩让张横跑了！”'),
  ],
  choices: [
    {
      id: 'tz12_water_sect_tactic',
      label: '【施展水路帮派暗语】借顺风潮汐收帆滑行，悄无声息贴近贼船船尾！（漕帮/怒潮帮/五溪同脉）',
      subLabel: '水陆同脉经验显威 · 获赠【边军刀圭金创药】×2，突袭占尽先机',
      tone: 'gold',
      condition: {
        type: 'any',
        conditions: [
          { type: 'inSect', sectId: 'SECT-16' },
          { type: 'inSect', sectId: 'SECT-26' },
          { type: 'inSect', sectId: 'SECT-30' },
          flag('tz_bond_water_kin', 'truthy'),
        ],
      },
      effects: [
        { type: 'giveItem', itemId: 'ITM-MED-121', qty: 2 },
        openScene('scene_tz_13_barge_battle', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz12_thank_boatman_charge',
      label: '【向老周头爷孙抱拳致谢】请老人家退入安全水湾，随焦木与屠芳云包抄贼船！',
      subLabel: '汉水善缘回响 · 阿芹塞给你一包【熟药所行军跌打丸】助战',
      tone: 'jade',
      effects: [
        { type: 'giveItem', itemId: 'ITM-MED-122', qty: 1 },
        openScene('scene_tz_13_barge_battle', 'QST-SECT-15-ENTRY'),
      ],
    },
  ],
}

const SCENE_TZ_11_POISONED_SAND_CLUE: StorySceneDef = {
  id: 'scene_tz_11_poisoned_sand_clue',
  title: '第十一幕 · 砂鼎异香现端倪',
  subtitle: '前坪百斤铁沙场 · 假药惊变',
  mandatory: true,
  beats: [
    N('你与雷艮磊在坪边拆招方罢，东侧两口新开的铁砂大鼎旁忽传来一阵撕心裂肺的惨叫！两名正在翻砂练掌的外门弟子双掌乌紫溃烂、口吐黑沫栽倒在地，连守炉的烧火小药童都吓得面无人色！'),
    S('NPC-0693', '（湘西五溪蛊寨苗卫沈平威急步抢上前，抓起一把滚烫药渣凑到鼻端一嗅，脸色骤变）“不好！这批新运上山的药砂里根本没有五溪清木香与血竭，被人用染过红土的川乌毒根掉包了！火毒混着乌头碱直攻心脉，再练半个时辰这两双手就彻底废了！”'),
    S('NPC-0539', '（屠芳云一剑挑开药箱底层的封蜡印记，眼神冷如寒霜）“这是半月前经襄阳汉水钞关转运的那批药箱！封泥被水汽熏开重封过——难怪当日在汉水码头，黑齿张横拼着闹大也要诬赖老船户的铁砂受潮、急着扣船灭迹！”'),
    S('NPC-0223', '（焦木须发皆张，一把抓起百斤铜桨）“好个狗胆包天的张横！前日听说他借口押尾船跟到了洞庭外湖，定是想今夜趁大雾把掉包出来的真药卖给巴陵水寇！倘若等天亮罗天豹副帮主查起来，定要先杀这几个无辜烧火药童立威——小兄弟，敢不敢跟老焦和芳云下山，连夜去【洞庭水陆连环寨】乘快船截住那厮？！”'),
  ],
  onFinishEffects: [
    setStep(TIEZHANG_ENTRY_QUEST_ID, 'night_reed_raid'),
    warn('铁砂药材遭黑齿张横掉包！请速返回山脚【洞庭水陆连环寨】与焦木、屠芳云乘舟夜探芦荡！', '芦荡追凶'),
  ],
}

const SCENE_TZ_10_SPLIT_STELE_SPAR: StorySceneDef = {
  id: 'scene_tz_10_split_stele_spar',
  title: '第十幕 · 沙场裂碑试新锋',
  subtitle: '百斤铁沙场 · 告别白身第一战',
  mandatory: true,
  beats: [
    N('滚烫燥烈的内家真气第一次自丹田奔涌而出，顺着手臂少阳经直贯双掌劳宫穴！你缠上焦木所赐的《粗练铁砂护掌布》，对着沙场边一块半尺厚的废弃青石残碑吐气开声，右掌立劈而下——“喀嚓”一声脆响，坚硬青石应掌裂开一道贯穿缝隙！'),
    S('NPC-0885', '（旁侧抱柴观望的年轻水寨弟子雷艮磊看得眼睛发直，摩拳擦掌跳上石坪笑道）“乖乖！昨儿在船坞连铜桨都差点抓不稳，今夜居然一掌劈裂青石板！焦大舵主、屠香主，让我雷艮磊跟这位新兄弟过两招热热身成不成？”'),
    S('NPC-0223', '（焦木哈哈一笑，退开两步抱臂颔首）“去吧！记住本帮拳脚规矩：两招轮转莫使老，看准破绽再发力，点到为止！”'),
  ],
  choices: [
    {
      id: 'tz10_spar_leigenlei',
      label: '【双掌一错抱拳迎上】“请雷兄指教！”（实测新学内功与双招轮换）',
      subLabel: '友好切磋 · 已自动装备《铁掌烈火吐纳功》与两门外功招式，胜负皆推进剧情',
      tone: 'primary',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: TIEZHANG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildLeiGenleiSparNpc() },
          rule: 'spar',
          introText: '铁沙场火光猎猎！你催动丹田初成的烈火真气，彻底告别手无寸铁的白身岁月，与雷艮磊放手拆招！',
          onWin: [
            { type: 'giveCombatExp', amount: 35, reason: '铁沙场初试《铁掌劈碑手》胜过雷艮磊' },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0885' }, delta: 15 },
            { type: 'healPlayer', hpPct: 100, mpPct: 100 },
            toast('雷艮磊被你一记劈碑手震得连退三步，甩着发麻的胳膊大呼痛快：“好猛的掌劲！兄弟真是天生的铁掌材料！”', 'success', '裂碑初鸣'),
            openScene('scene_tz_11_poisoned_sand_clue', 'QST-SECT-15-ENTRY'),
          ],
          onLose: [
            { type: 'giveCombatExp', amount: 25, reason: '铁沙场与雷艮磊切磋印证新学铁掌' },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0885' }, delta: 12 },
            { type: 'healPlayer', hpPct: 100, mpPct: 100 },
            toast('两人拆过数合各自收势，雷艮磊看着被你掌风扫破的衣袖惊叹道：“才学一晚就有这股狠劲，再练半月我可万万接不住了！”', 'talk', '裂碑初鸣'),
            openScene('scene_tz_11_poisoned_sand_clue', 'QST-SECT-15-ENTRY'),
          ],
        },
      ],
    },
  ],
}

const SCENE_TZ_09_BESTOW_ARTS: StorySceneDef = {
  id: 'scene_tz_09_bestow_arts',
  title: '第九幕 · 烈火入脉授真传',
  subtitle: '百斤铁沙场 · 破零筑基传功',
  mandatory: true,
  beats: [
    N('第三炷线香燃尽落灰的一瞬，屠芳云第一时间上前握住你通红滚烫的双腕，将你双手浸入沈平威早已备好的五溪冰片药盆之中。“嗤——”的一声白雾升腾，清凉药力顺着张开的毛孔直透骨膜！'),
    S('NPC-0693', '（沈平威捻着银须啧啧称奇）“奇哉！寻常白身学徒头一回插赤砂，能撑半炷香不抽手已算好汉；这位小哥硬熬足足三炷香，十指皮膜虽焦却未伤筋络，此刻劳宫穴大开、阳气沸腾，正是引火归元、开通内息的天赐良机！”'),
    S('NPC-0223', '（焦木虎目含光，从怀中取出一双浸过桐油药汁的《粗练铁砂护掌布》拍在你膝头，沉声道）“好小子，今晚你用血肉之躯挣来了入我铁掌门的资格！听好了：我先传你本帮筑基内功《铁掌烈火吐纳功》化去砂毒、蓄养刚猛真气，再传你外门看家《铁掌劈碑手》！至于辅修的第二路变招，便依你自己的秉性筋骨择一而修！”'),
  ],
  choices: [
    {
      id: 'tz09_learn_iron_sand_route',
      label: '【刚猛毒砂路】兼修《铁砂掌（粗练）》，双掌叠击霸烈无匹！（根骨 ≥ 58 或曾徒手拽铜锚）',
      subLabel: '领悟并自动装备《铁掌烈火吐纳功》+《铁掌劈碑手》+《铁砂掌（粗练）》，获赠【粗练铁砂护掌布】',
      tone: 'gold',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '根骨', min: 58 },
          flag('tz_aptitude_route', 'eq', 'bone'),
        ],
      },
      effects: [
        { type: 'giveItem', itemId: 'WPN-084', qty: 1 },
        { type: 'teachMartialArt', artId: 'MA-229', level: 1, exp: 420, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-236', level: 1, exp: 420, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-186', level: 1, exp: 360, autoEquip: true },
        openScene('scene_tz_10_split_stele_spar', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz09_learn_pishan_route',
      label: '【巧劲劈山路】蒙屠芳云指点发力寸劲，兼修《劈山掌》快慢相济！（悟性 ≥ 58 或屠芳云高好感）',
      subLabel: '领悟并自动装备《铁掌烈火吐纳功》+《铁掌劈碑手》+《劈山掌》，获赠【粗练铁砂护掌布】',
      tone: 'jade',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 58 },
          { type: 'npcFavorAtLeast', npcId: 'NPC-0539', min: 20, npcName: '屠芳云' },
          flag('tz_aptitude_route', 'eq', 'wit'),
        ],
      },
      effects: [
        { type: 'giveItem', itemId: 'WPN-084', qty: 1 },
        { type: 'teachMartialArt', artId: 'MA-229', level: 1, exp: 420, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-236', level: 1, exp: 420, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-165', level: 1, exp: 360, autoEquip: true },
        openScene('scene_tz_10_split_stele_spar', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz09_learn_oar_palm_route',
      label: '【水陆双修路】承焦木船坞真传，兼修《漕工撑篙杆》掌杆并进！（不限资质）',
      subLabel: '领悟并自动装备《铁掌烈火吐纳功》+《铁掌劈碑手》+《漕工撑篙杆》，获赠【粗练铁砂护掌布】与【运河漕工铁头篙】',
      tone: 'primary',
      effects: [
        { type: 'giveItem', itemId: 'WPN-084', qty: 1 },
        { type: 'giveItem', itemId: 'WPN-081', qty: 1 },
        { type: 'teachMartialArt', artId: 'MA-229', level: 1, exp: 380, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-236', level: 1, exp: 380, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-193', level: 1, exp: 320, autoEquip: true },
        openScene('scene_tz_10_split_stele_spar', 'QST-SECT-15-ENTRY'),
      ],
    },
  ],
}

const SCENE_TZ_08_RED_SAND_CAULDRON_CG: StorySceneDef = {
  id: 'scene_tz_08_red_sand_cauldron_cg',
  title: '第八幕 · 赤砂沸鼎淬凡掌',
  subtitle: '前坪百斤铁沙场 · 无真气血肉熬炼',
  illustrationUrl: '/assets/quests/tiezhang_red_sand_cauldron.jpg',
  illustrationCaption: '铁掌峰百斤铁沙场 · 赤砂沸鼎血肉淬心',
  mandatory: true,
  beats: [
    N('夜幕沉沉笼罩第一指峰【前坪百斤铁沙场】。三口千斤生铁大鼎架在熊熊松炭之上，鼎中黑红相间的辰州铁砂混着五溪朱砂药叶翻滚冒烟，热浪烤得人眉发蜷曲。湘西苗卫沈平威手执长柄木勺撒入一撮药末，焦木将百斤熟铜船桨重重立在青石坪上，点燃三炷线香。'),
    S('NPC-0223', '“看清楚了！天下名门练功讲求先养三年清静气，唯独我铁掌帮是在刀口风浪里抢命，讲的是『以火逼气、百死淬生』！你此刻胸无半分内力护体，这一双手插进去便是生烤血肉——现在后悔下山，老焦绝不笑话你半句！”'),
    N('你一言不发，解开袖扣走到正中那口赤红大铁鼎前，马步一沉，咬紧牙关将一双血肉凡掌狠狠插入滚烫铁砂之中！刹那间，千万根烧红钢针般的剧痛顺着十指尖端直刺心肺，额头豆大的冷汗滚落鼎内，“嗤啦”化作缕缕白烟！'),
    N('一炷香过，掌心水泡尽破；两炷香过，双臂抖如筛糠，视线模糊中只见鼎畔屠芳云死死攥着手里的白麻伤药布巾，指节发白却一步不曾移开；焦木紧锁的浓眉渐渐松开，化作满眼震动！你喉间发出一声低沉嘶吼，硬生生在沸砂中翻搅满整整三炷香！'),
  ],
  choices: [
    {
      id: 'tz08_endure_three_incense',
      label: '【十指扣紧赤砂绝不抽手】“三炷香已满……请焦舵主验掌！”',
      subLabel: '百炼成钢 · 心志与筋膜彻底蜕变，准备承受内家真气灌顶',
      tone: 'gold',
      effects: [
        { type: 'advanceShichen', count: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0223' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0539' }, delta: 12 },
        openScene('scene_tz_09_bestow_arts', 'QST-SECT-15-ENTRY'),
      ],
    },
  ],
}

const SCENE_TZ_07_MOONLIGHT_SALVE: StorySceneDef = {
  id: 'scene_tz_07_moonlight_salve',
  title: '第七幕 · 夜阑栈桥剑袖温',
  subtitle: '洞庭千帆栈桥 · 灯下敷药结深缘',
  mandatory: true,
  beats: [
    N('入夜时分，演武船坞人声散尽，只余洞庭湖水轻拍木桩的哗哗潮声。你独自坐在【千帆栈桥 · 装卸埠】边吹着湖风，白日里死攥百斤熟铜船桨磨破的虎口火辣辣作痛，连握拳都有些发僵。忽见一盏素纱风灯款款停在身侧，清冷药香随风飘来。'),
    S('NPC-0539', '（屠芳云收起腰间窄剑，在栈桥木阶上屈膝坐下，不容分说拉过你的右手摊在灯下，轻叹一声）“在船坞当着焦叔和雷艮磊的面一声不吭，我还当你真是铜浇铁铸的手呢——虎口都裂了三道血口子，明日上了百斤铁沙场，热砂钻进肉里可是要烂骨头的。”'),
    N('微黄灯影下，这位在洪州与汉水令无数水匪闻风丧胆的「快剑袖」屠香主，指尖却轻柔得像江南三月的春风。她用竹签挑起翠绿清凉的五溪生肌膏，一点点敷满你掌心血痕，再撕开干净细麻布一圈圈缠紧打结。'),
    S('NPC-0539', '“明日亥时，焦叔会带你上第一指峰【铁掌帮聚义总堂 · 前坪百斤铁沙场】翻炒赤砂。那关没有捷径，唯有把呼吸沉进脚跟、顺着砂浪推掌才不伤筋膜……记住，我就在砂鼎旁守着你，撑不住也莫硬死撑。”'),
  ],
  onFinishEffects: [
    setStep(TIEZHANG_ENTRY_QUEST_ID, 'temper_red_sand'),
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0539' }, delta: 15 },
    toast('屠芳云连夜替你敷妥五溪生肌药膏！请登临【铁掌帮聚义总堂 · 前坪百斤铁沙场】接受赤砂沸鼎考验！', 'success', '栈桥药温'),
  ],
}

const SCENE_TZ_06_ROCKING_DECK: StorySceneDef = {
  id: 'scene_tz_06_rocking_deck',
  title: '第六幕 · 连环船坞踏浪桩',
  subtitle: '临江演武船坞 · 百斤铜桨定下盘',
  mandatory: true,
  beats: [
    N('踏入【洞庭水陆连环寨 · 临江演武船坞】，数十名赤膊帮众正在锁链相连的摇晃战船甲板上对练劈掌，呼喝声震得湖水激荡。焦木的族侄辈小喽啰雷艮磊与女执事屠夏梅好奇地打量着你，焦木则随手将那柄重逾百斤的熟铜大船桨横抛过来！'),
    S('NPC-0223', '“想学铁掌功，先过老焦的船板关！咱们水陆大帮七成厮杀都在颠簸船头，没有内力不要紧，今日黄昏湖风正急，你抱着这根百斤铜桨站在解开半边铁索的冲浪舢板上——撑满一个时辰不栽进湖里喂王八，才算摸着咱们水寨的门坎！”'),
    S('NPC-0885', '（雷艮磊蹲在船坞边咧嘴直乐，好心朝你喊道）“新来的兄弟，千万别拿蛮劲跟浪头顶牛！浪往左掀，你腰往右沉，把铜桨当成压舱石！”'),
  ],
  choices: [
    {
      id: 'tz06_follow_wave_rhythm',
      label: '【顺浪沉腰 · 以桨作锚】松开僵直双肩，随波涛起落呼吸吐纳稳住船心！',
      subLabel: '领悟水战重心之妙 · 骑术（下盘桩功）+4，赢得船坞众弟兄喝彩',
      tone: 'jade',
      effects: [
        { type: 'modifySkill', key: '骑术', delta: 4 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0885' }, delta: 10 },
        openScene('scene_tz_07_moonlight_salve', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz06_iron_grit_stand',
      label: '【五趾扣板 · 死抱铜桨】纵摔倒甲板撞得青紫，亦咬牙爬起抱紧百斤铜桨不松手！',
      subLabel: '悍勇血性震住全场 · 实战历练 +25，焦木暗暗点头',
      tone: 'primary',
      effects: [
        { type: 'giveCombatExp', amount: 25, reason: '洞庭演武船坞苦撑百斤熟铜船桨磨砺筋骨' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0223' }, delta: 10 },
        openScene('scene_tz_07_moonlight_salve', 'QST-SECT-15-ENTRY'),
      ],
    },
  ],
}

const SCENE_TZ_05_FIVE_FINGERS_CG: StorySceneDef = {
  id: 'scene_tz_05_five_fingers_cg',
  title: '第五幕 · 八百烟波五指擎',
  subtitle: '洞庭铁掌峰水寨 · 霸宗气象',
  illustrationUrl: '/assets/quests/tiezhang_five_fingers_mist.jpg',
  illustrationCaption: '八百里洞庭烟波 · 五指擎天连环水寨',
  mandatory: true,
  beats: [
    N('顺汉水南入长江，再转巴陵浩瀚水域，待乌篷快船钻出最后一片苍茫芦苇水巷时，暮色中的八百里洞庭烟波豁然洞开——但见银碧万顷的湖心深处，五座奇崛峥嵘的青黑巨峰拔水而起，宛如一只擎天巨掌直插暮云！山麓湾口百艘楼船战舰以碗口粗的铁索连环成寨，黑红旌旗迎着晚风猎猎作响，火把初燃如星河落水！'),
    S('NPC-0539', '（屠芳云立于船头单手执橹，衣袂被浩荡湖风吹得紧贴身侧，回眸指向云端黑石巨殿）“那便是咱们铁掌帮总舵——五指奇峰，铁掌擎天！山脚是焦叔坐镇的【洞庭水陆连环寨】，中峰是历代先辈秘冢，最高的第一指峰便是上官帮主坐镇的【聚义总堂】！”'),
    N('快船刚靠上水寨栈桥，副帮主罗天豹麾下两名巡寨香主便横刀拦路，阴阳怪气地嘲讽焦木怎带了个毫无内息波动的“白身旱鸭子”进总舵。不等你开口，屠芳云袖中窄剑“铮”地弹出三寸寒芒，亮出五指黑铁木令冷喝退散众人，焦木更是大步流星领你直入演武船坞！'),
  ],
  choices: [
    {
      id: 'tz05_step_onto_water_fort',
      label: '【昂首踏上连环水寨栈桥】随焦木与屠芳云前往临江演武船坞受训！',
      tone: 'gold',
      effects: [
        { type: 'teleportPlayer', regionId: 'tiezhangfeng', buildingId: 'tz_water', spotId: 'tz_water_west' },
        openScene('scene_tz_06_rocking_deck', 'QST-SECT-15-ENTRY'),
      ],
    },
  ],
}

const SCENE_TZ_04_NIGHT_WINE_PACT: StorySceneDef = {
  id: 'scene_tz_04_night_wine_pact',
  title: '第四幕 · 芦花浊酒结双缘',
  subtitle: '襄阳汉水江滩 · 五指黑铁令',
  mandatory: true,
  beats: [
    N('暮色四合，汉水江滩芦花飞白。老周头与孙女阿芹千恩万谢地摇船离去后，焦木在江边鹅卵石滩上升起一堆篝火，拔开泥封灌了一大口辛辣烧刀子，反手将酒葫芦抛进你怀里；屠芳云则取出一小包《雄黄艾草辟瘴散》搁在你手边，目光清亮地审视着你。'),
    S('NPC-0223', '“痛快！老焦我打小在洞庭湖当水匪，最瞧不起那些学了三招两式便在苦哈哈头上作威作福的软骨头，最敬你这种手无寸铁还敢往刀口前站的硬汉子！实话告诉你，少帮主云豹虽嘴硬，方才也没真拦着我保你。”'),
    S('NPC-0539', '（屠芳云拨了拨篝火，轻声道）“只是铁掌峰并非善堂——帮中既有焦叔这般重义豪杰，亦有罗副帮主那等信奉弱肉强食的狠人，更要日夜在滚烫毒砂与惊涛骇浪里拿命熬炼筋骨。你尚无内功根基，当真想随我们南下洞庭，趟这八百里风浪么？”'),
  ],
  choices: [
    {
      id: 'tz04_vow_guard_boatfolk',
      label: '【仰饮烈酒抱拳】“正因见过江上风浪欺人，才想练出一双能护住弱小的铁掌！”',
      subLabel: '赤诚侠骨深合屠芳云与焦木心意 · 侠义 +6，获赠【雄黄艾草辟瘴散】',
      tone: 'jade',
      effects: [
        { type: 'setFlag', flag: 'tz_initial_vow', value: 'chivalry' },
        { type: 'giveItem', itemId: 'ITM-MED-127', qty: 1 },
        { type: 'modifyChivalry', delta: 6, reason: '汉水江滩立志练成铁掌护佑水上苦人' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0539' }, delta: 12 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0223' }, delta: 12 },
        {
          type: 'startQuest',
          questId: TIEZHANG_ENTRY_QUEST_ID,
          stepId: 'sail_to_tiezhang',
        },
        toast('已获焦木亲授【五指黑铁木令】！请南下前往【洞庭铁掌峰 · 洞庭水陆连环寨】会合！', 'success', '汉水结缘'),
      ],
    },
    {
      id: 'tz04_vow_unyielding_ambition',
      label: '【目光如炬直言】“白身又如何？王侯将相宁有种乎，我偏要上五指峰闯出一番名堂！”',
      subLabel: '豪迈枭雄气概契合铁掌宗风 · 声望 +8，获赠【雄黄艾草辟瘴散】',
      tone: 'gold',
      effects: [
        { type: 'setFlag', flag: 'tz_initial_vow', value: 'ambition' },
        { type: 'giveItem', itemId: 'ITM-MED-127', qty: 1 },
        { type: 'modifyRenown', delta: 8, reason: '汉水夜话豪言叩关洞庭铁掌峰' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0223' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0539' }, delta: 8 },
        {
          type: 'startQuest',
          questId: TIEZHANG_ENTRY_QUEST_ID,
          stepId: 'sail_to_tiezhang',
        },
        toast('已获焦木亲授【五指黑铁木令】！请南下前往【洞庭铁掌峰 · 洞庭水陆连环寨】会合！', 'success', '汉水结缘'),
      ],
    },
  ],
}

const SCENE_TZ_03_COPPER_OAR_MIGHT: StorySceneDef = {
  id: 'scene_tz_03_copper_oar_might',
  title: '第三幕 · 铜桨裂石震汉津',
  subtitle: '水寨望楼钞关前 · 三豪初会',
  mandatory: true,
  beats: [
    S(SPEAKER_ZHANG_HENG, '“反了天了！哪来的野杂种敢在太岁头上动土！来人，把这多嘴的小子连同老周头一块儿剁断手筋扔进汉江！”'),
    N('张横拔出鬼头短刀刚欲扑上，一道飒爽黑影已如燕子掠波般欺至近前——只听“铮”的一声轻吟，一名三十许岁、束袖劲装的干练女香主袖中滑出一柄寒光窄剑，剑脊不偏不倚拍在张横手腕麻穴之上，震得他短刀当啷落地！来人正是奉命北上核验辰州赤铁砂与五溪药材的铁掌帮精锐香主「快剑袖」屠芳云！'),
    S('NPC-0222', '（与此同时，高处【水寨望楼 · 钞关厅】雕栏推开，年方二十九岁、锦衣玄甲的铁掌帮少帮主上官云豹负手踱出，居高临下冷冷扫了你一眼）“我当是谁在汉水钞关喧哗——屠香主，你不在洪州水口当差，倒替一个连半丝内功真气都没有的白身小子出起头来了？”'),
    N('上官云豹话音未落，栈桥下乌篷小舟里忽炸开一声闷雷似的大笑！一名虬髯阔口、膀大腰圆的四旬壮汉单手提着一条足有百斤重的熟铜大船桨跃上栈桥，“轰”地一桨顿在拴船青石墩上，碗口大的石角应声崩裂入水——正是铁掌帮洞庭总堂主「铜桨舵主」焦木！'),
    S('NPC-0223', '“云豹少主，话可不能这么说！咱们帮主当年创下偌大基业，靠的是敢拼命的胆魄，可不是靠张横这种克扣船户、连封条干湿都分不清的蛀虫！张横停职押后候审，老周头的砂钱照足数结清——至于这小兄弟，合了老焦的脾胃，老夫做主请他喝碗水酒！”'),
    S('NPC-0222', '（上官云豹眉头一挑，深深看了坦然迎视的你一眼，冷笑拂袖）“好，既然焦叔开口，这面子我给！只是我铁掌峰的赤砂鼎可不认嘴皮子——我倒要看看这白身小子敢不敢真上洞庭湖！”'),
  ],
  choices: [
    {
      id: 'tz03_follow_jiaomu_fangyun',
      label: '【向焦木与屠芳云拱手致意】扶起老周头结清砂钱，随二人移步江滩叙话',
      tone: 'primary',
      effects: [openScene('scene_tz_04_night_wine_pact', 'QST-SECT-15-ENTRY')],
    },
  ],
}

const SCENE_TZ_02_FIVE_WAYS_RESCUE: StorySceneDef = {
  id: 'scene_tz_02_five_ways_rescue',
  title: '第二幕 · 白身五策解危局',
  subtitle: '千帆栈桥 · 无内功亦存傲骨',
  mandatory: true,
  beats: [
    N('黑齿张横狞笑着一挥手，两名恶役当真拽起吊架上百斤重的生铁三爪锚，眼看就要将老周头一家赖以活命的运砂木船砸穿沉江！四周商旅脚夫畏惧铁掌帮凶名，纷纷侧目后退。'),
    N('此时的你初涉江湖，丹田内空空如也、未修半分内功心法，手中更无高深武学招式；然而眼见白发船户与孤女绝望哭喊，一股滚烫血气直涌胸膛——千钧一发之际，你决然踏出人群：'),
  ],
  choices: [
    {
      id: 'tz02_aptitude_bone',
      label: '【天生神力 · 赤手拽锚】抢步上前一把死死扯住铁锚粗链，以血肉双掌硬生生勒停百斤坠锚！（根骨 ≥ 58）',
      subLabel: '重资质分支 · 铁链磨破掌心而纹丝不退，满埠骇然动容',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '根骨', min: 58 },
      effects: [
        { type: 'setFlag', flag: 'tz_aptitude_route', value: 'bone' },
        { type: 'modifyChivalry', delta: 6, reason: '汉水码头赤手拽住百斤铁锚保住运砂小船' },
        openScene('scene_tz_03_copper_oar_might', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz02_aptitude_wit',
      label: '【明察水痕 · 当众验砂】跳上船舱抓起两把铁砂对比水线，当场拆穿张横半夜偷换河泥的把戏！（悟性 ≥ 58 或算术 ≥ 32）',
      subLabel: '重资质分支 · 算术 +4，铁证如山令恶吏百口莫辩',
      tone: 'jade',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 58 },
          { type: 'skillAtLeast', key: '算术', min: 32 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'tz_aptitude_route', value: 'wit' },
        { type: 'modifySkill', key: '算术', delta: 4 },
        openScene('scene_tz_03_copper_oar_might', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz02_aptitude_eloquence',
      label: '【昂首问律 · 借势喝止】指着望楼五指黑旗朗声喝问张横，敢否惊动少帮主核对辰州矿契！（颜值 ≥ 58 或辩才 ≥ 32）',
      subLabel: '重资质分支 · 辩才 +4，不卑不亢反客为主震慑恶役',
      tone: 'primary',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '颜值', min: 58 },
          { type: 'skillAtLeast', key: '辩才', min: 32 },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'tz_aptitude_route', value: 'eloquence' },
        { type: 'modifySkill', key: '辩才', delta: 4 },
        openScene('scene_tz_03_copper_oar_might', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz02_water_kin_sign',
      label: '【水陆同脉 · 亮出盘道切口】按水上帮派规矩盘出三指切口，喝令外埠恶吏住手！（江淮漕帮/怒潮帮/五溪蛊寨同脉）',
      subLabel: '同脉宿缘分支 · 声望 +8，暗中观察的屠芳云与焦木立生亲近',
      tone: 'gold',
      condition: {
        type: 'any',
        conditions: [
          { type: 'inSect', sectId: 'SECT-16' },
          { type: 'inSect', sectId: 'SECT-26' },
          { type: 'inSect', sectId: 'SECT-30' },
          { type: 'hasItem', itemId: 'ITM-MSC-003' },
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'tz_bond_water_kin', value: true },
        { type: 'modifyRenown', delta: 8, reason: '汉水大码头亮出水陆同道盘道规矩止戈护弱' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0539' }, delta: 8 },
        openScene('scene_tz_03_copper_oar_might', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz02_mortal_grit',
      label: '【血肉横身 · 替翁受鞭】纵无半点武艺，亦一步跨到老船户身前，用脊背硬生生挨下那记牛皮重鞭！',
      subLabel: '草莽侠骨线（不限资质） · 侠义 +10，结下老周头生死大恩并震撼全场',
      tone: 'danger',
      effects: [
        { type: 'setFlag', flag: 'tz_aptitude_route', value: 'grit' },
        { type: 'modifyChivalry', delta: 10, reason: '毫无武功仍以血肉脊背替汉水老船户硬受重鞭' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0223' }, delta: 8 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0539' }, delta: 8 },
        openScene('scene_tz_03_copper_oar_might', 'QST-SECT-15-ENTRY'),
      ],
    },
  ],
}

const SCENE_TZ_01_HANSHUI_TAX: StorySceneDef = {
  id: 'scene_tz_01_hanshui_tax',
  title: '第一幕 · 汉水惊涛扣砂船',
  subtitle: '襄阳府 · 汉水大码头装卸埠',
  mandatory: true,
  beats: [
    N('大宋皇祐二年，荆襄咽喉襄阳府外汉水滔滔，南北商船千帆竞渡。你信步行至【汉水大码头 · 千帆栈桥】，只见高耸的水寨望楼上悬着一面绣有苍鹰巨掌的玄黑大旗，几名挎刀汉子正围着一艘吃水深重的破旧运砂木船喝骂不休。'),
    S(SPEAKER_ZHANG_HENG, '（满口黑黄烂牙的钞关副管事「黑齿张横」一脚踩在船帮上，扬起牛皮马鞭指着满头白发的老船工唾沫横飞）“老不死的周老头！少帮主交代采办的十石辰州上等赤铁砂，到你船舱底下怎掺了三成湿河泥？今日不赔出三十两纹银，老子砸沉你这破船，拿你孙女抵给巴陵水寮！”'),
    S(SPEAKER_LAO_ZHOUTOU, '（老周头护着身后吓得脸色发白的孙女阿芹，跪在湿滑甲板上咚咚磕头）“张管事明鉴啊！小老儿从沅水一路逆风摇橹上来，油布盖得严严实实，昨夜停在贵关水栅外还好端端的，定是有人半夜动了舱底封条哇！”'),
    S(SPEAKER_XIAOQIN, '（少女阿芹含泪指着张横靴底沾着的暗红朱砂泥）“阿公你看，他靴子缝里分明沾着咱们辰州独有的红砂泥！是他昨晚带人上船换了咱们的干铁砂，还要倒打一耙害人性命！”'),
    N('被当众戳破痛脚的张横脸色骤然狰狞，扬起浸油牛皮重鞭便朝少女面门狠抽下去！栈桥不远处，一名腰悬窄剑的黑衣女香主正自货栈走出、秀眉骤凛，而桥下一叶乌篷小舟上抱着铜桨喝酒的虬髯壮汉亦猛然睁开了虎目——但距离最近之人，恰恰只有两手空空的你！'),
  ],
  choices: [
    {
      id: 'tz01_step_out',
      label: '【排众而出 · 喝止恶吏】“住手！光天化日讹夺船户血汗，还讲不讲江湖王法！”',
      tone: 'gold',
      effects: [openScene('scene_tz_02_five_ways_rescue', 'QST-SECT-15-ENTRY')],
    },
  ],
}

const SCENE_TZ_PRELUDE_FROM_PEAK: StorySceneDef = {
  id: 'scene_tz_prelude_from_peak',
  title: '序引 · 铁掌门规先试江涛',
  subtitle: '洞庭铁掌峰 · 外埠机缘指引',
  beats: [
    S('interactedNpc', '“哈哈，少侠想拜入咱们洞庭铁掌帮？我帮雄踞两湖水陆，历来不收温室里养出来的花架子！凡无本帮前辈信物引荐者，纵爬上五指峰也进不了聚义正堂。”'),
    S('interactedNpc', '“巧得很，本帮洞庭总堂主『铜桨舵主』【焦木】与精锐香主【屠芳云】近日正北上【襄阳府 · 汉水大码头】巡查辰州赤铁砂与五溪药船，少帮主【上官云豹】亦坐镇汉水钞关。你若有胆识，不妨去汉水码头闯一闯——能入焦大舵主法眼拿到五指黑铁木令，总舵大门随时为你敞开！”'),
  ],
  choices: [
    {
      id: 'tz_prelude_go_xiangyang_now',
      label: '【即刻北上襄阳汉水】动身前往襄阳府汉水大码头寻访机缘！',
      tone: 'gold',
      effects: [
        { type: 'teleportPlayer', regionId: 'xiangyang', buildingId: 'xy_dock', spotId: 'xy_dock_east' },
        openScene('scene_tz_01_hanshui_tax', 'QST-SECT-15-ENTRY'),
      ],
    },
    {
      id: 'tz_prelude_later',
      label: '【暂且记下】待我备妥行囊再自行前往襄阳府汉水大码头',
      tone: 'default',
      effects: [],
    },
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  [SCENE_TZ_20_IRON_SAND_OATH.id]: SCENE_TZ_20_IRON_SAND_OATH,
  [SCENE_TZ_19_CHIEF_THREE_PALMS.id]: SCENE_TZ_19_CHIEF_THREE_PALMS,
  [SCENE_TZ_18_YUNBAO_DUEL.id]: SCENE_TZ_18_YUNBAO_DUEL,
  [SCENE_TZ_17_TOMB_WATER_STAKES.id]: SCENE_TZ_17_TOMB_WATER_STAKES,
  [SCENE_TZ_16_CLIFF_HEART_TALK.id]: SCENE_TZ_16_CLIFF_HEART_TALK,
  [SCENE_TZ_15_SUMMONS_TO_PEAK.id]: SCENE_TZ_15_SUMMONS_TO_PEAK,
  [SCENE_TZ_14_WATER_HALL_JUDGMENT.id]: SCENE_TZ_14_WATER_HALL_JUDGMENT,
  [SCENE_TZ_13_BARGE_BATTLE.id]: SCENE_TZ_13_BARGE_BATTLE,
  [SCENE_TZ_12_MIST_REED_AMBUSH.id]: SCENE_TZ_12_MIST_REED_AMBUSH,
  [SCENE_TZ_11_POISONED_SAND_CLUE.id]: SCENE_TZ_11_POISONED_SAND_CLUE,
  [SCENE_TZ_10_SPLIT_STELE_SPAR.id]: SCENE_TZ_10_SPLIT_STELE_SPAR,
  [SCENE_TZ_09_BESTOW_ARTS.id]: SCENE_TZ_09_BESTOW_ARTS,
  [SCENE_TZ_08_RED_SAND_CAULDRON_CG.id]: SCENE_TZ_08_RED_SAND_CAULDRON_CG,
  [SCENE_TZ_07_MOONLIGHT_SALVE.id]: SCENE_TZ_07_MOONLIGHT_SALVE,
  [SCENE_TZ_06_ROCKING_DECK.id]: SCENE_TZ_06_ROCKING_DECK,
  [SCENE_TZ_05_FIVE_FINGERS_CG.id]: SCENE_TZ_05_FIVE_FINGERS_CG,
  [SCENE_TZ_04_NIGHT_WINE_PACT.id]: SCENE_TZ_04_NIGHT_WINE_PACT,
  [SCENE_TZ_03_COPPER_OAR_MIGHT.id]: SCENE_TZ_03_COPPER_OAR_MIGHT,
  [SCENE_TZ_02_FIVE_WAYS_RESCUE.id]: SCENE_TZ_02_FIVE_WAYS_RESCUE,
  [SCENE_TZ_01_HANSHUI_TAX.id]: SCENE_TZ_01_HANSHUI_TAX,
  [SCENE_TZ_PRELUDE_FROM_PEAK.id]: SCENE_TZ_PRELUDE_FROM_PEAK,
}
