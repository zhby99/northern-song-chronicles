import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep } from '../../../engine/quest/dsl'
import { buildTuboGuardianMonkNpc, JINJUN_TONGWENGUAN_ID } from './jinjunTongwenguanQuest'

const WANG = { kind: 'npc' as const, npcId: 'NPC-0038' }
const DUAN_ZHENGCHUN = { kind: 'npc' as const, npcId: 'NPC-0236' }
const JIUMOZHI = { kind: 'npc' as const, npcId: 'NPC-0113' }
const DUAN_YU = {
  kind: 'custom' as const,
  name: '段誉',
  title: '大理国镇南王世子',
  avatarUrl: '/assets/characters/templates/tpl_dali_prince_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_dali_prince_fb.jpg',
}
const LIAO_ENVOY = {
  kind: 'custom' as const,
  name: '萧兀纳',
  title: '大辽贺冬正使',
  avatarUrl: '/assets/characters/templates/tpl_liao_court_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_liao_court_male_fb.jpg',
}
const GUARD = {
  kind: 'custom' as const,
  name: '仪鸾司校尉',
  title: '殿前司宿卫亲从',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_twg_01: {
    id: 'scene_twg_01',
    title: '第一幕 · 瑞雪迎宾令',
    subtitle: '开封府 · 垂拱紫宸正殿',
    beats: [
      N('{reignYear}隆冬，东京汴梁瑞雪初霁，万国朝贺使团云集京师。垂拱殿暖阁之内，枢密使王德用展开一张刚朱批过的仪鸾司调防图，神色凝重。'),
      S(WANG, '“{gender:贤侄|女将军}，今冬大理镇南王段正淳携世子段誉入京求购大宋经史善本，偏生吐蕃国师鸠摩智亦借进献佛宝之名同期抵京，双双下榻城南同文馆。”'),
      P('“末将听闻大轮明王鸠摩智武功深不可测，且吐蕃与西夏向来往来密切；大理段氏则是我朝西南茶马屏藩，二者同驻一馆，枢密院可是防其生变？”'),
    ],
    onFinishEffects: [openScene('scene_twg_02', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_02: {
    id: 'scene_twg_02',
    title: '第二幕 · 兼领仪鸾司',
    subtitle: '开封府 · 垂拱紫宸正殿',
    beats: [
      S(WANG, '“正是！皇城司密报，西夏权臣没藏讹庞近日派了数名死士乔装驼商潜入京师，恐要暗中勾结吐蕃使团生事。本帅特命你以殿前司都虞候兼领仪鸾司宿卫，全权执掌同文馆防务！”'),
      P('“末将领命！定叫四夷使臣见我大宋礼乐威仪，亦叫宵小之辈不敢越雷池半步！”'),
    ],
    onFinishEffects: [openScene('scene_twg_03', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_03: {
    id: 'scene_twg_03',
    title: '第三幕 · 踏雪巡馆驿',
    subtitle: '开封府 · 同文馆外庭',
    beats: [
      N('你点齐三百名仪鸾司精锐甲士，顶着未融的残雪进驻城南同文馆。东院住着大辽与西夏随使，南院安顿大理王室，西院则是吐蕃密宗高僧禅舍。'),
      S(GUARD, '“禀都帅！西院吐蕃番僧自带数十口沉重铜箱，言称内盛佛宝，不许我方士卒靠近半步；东院辽使方才亦嫌馆舍炭火不足，出言颇为傲慢。”'),
      P('“传令下去，外松内紧，暗哨加倍盯紧西院与西南墙根。本官先去正厅会一会这几位远来贵客。”'),
    ],
    onFinishEffects: [openScene('scene_twg_04', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_04: {
    id: 'scene_twg_04',
    title: '第四幕 · 初见段氏父子',
    subtitle: '开封府 · 同文馆南院',
    beats: [
      N('刚步入南院梅林，只见一位气度雍容、三绺长须的中年王爷正含笑负手而立，身旁一名青衫俊秀少年正捧着一卷《礼记》细读。'),
      S(DUAN_ZHENGCHUN, '“久闻大宋殿前司新晋了一位破太行、平姑苏的青年俊杰，今日得见将军风采，果然器宇轩昂！”'),
      S(DUAN_YU, '“在下段誉，见过将军！中原诗书礼乐果真浩如烟海，令小弟心折不已。”'),
    ],
    onFinishEffects: [openScene('scene_twg_05', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_05: {
    id: 'scene_twg_05',
    title: '第五幕 · 明王初露锋',
    subtitle: '开封府 · 同文馆西院回廊',
    beats: [
      N('话音未落，西院月洞门后缓缓步出一位身披明黄红边大袈裟的吐蕃高僧，面带宝相微笑，步履所过之处，积雪竟似被一股无形热气烘融三分。'),
      S(JIUMOZHI, '“阿弥陀佛。贫僧鸠摩智久仰大理段氏《六脉神剑》威震南疆，今番有缘同聚东京，不知镇南王可愿赐教一二？”'),
      S(DUAN_ZHENGCHUN, '“国师说笑了，段氏家传浅技岂敢在国师法眼面前献丑。况且此乃大宋天子馆驿，一切当以礼宾为先。”'),
    ],
    onFinishEffects: [openScene('scene_twg_06', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_06: {
    id: 'scene_twg_06',
    title: '第六幕 · 赴宴前嘱',
    subtitle: '开封府 · 同文馆正厅外',
    beats: [
      N('鸠摩智合十微笑不语，转身往正厅而去。你暗自运起《太玄经》内息感应，只觉方才他袖袍拂动之间真气炽烈沉雄，绝非寻常高僧，当即暗中传令亲兵守住馆门，步入正厅赴宴。'),
      P('“（这番僧功力深不可测，今晚东院辽夏使臣又蠢蠢欲动，须先在席间稳住大局！）”'),
    ],
    onFinishEffects: [
      setStep(JINJUN_TONGWENGUAN_ID, 'twg_banquet_debate'),
    ],
  },
  scene_twg_07: {
    id: 'scene_twg_07',
    title: '第七幕 · 冬宴起波澜',
    subtitle: '开封府 · 同文馆正厅',
    beats: [
      N('华灯初上，同文馆正厅设起八珍冬宴。辽夏随使果然借酒发难，指着东首上座冷笑连连，嘲讽大理地处西南蛮荒、不配与大辽平起平坐。'),
      S(LIAO_ENVOY, '“大宋以礼仪自诩，却将南诏偏隅之邦与我大辽并列东席，莫非轻视我大辽铁骑？”'),
      S(DUAN_YU, '“阁下此言差矣！大理自太祖朝以来岁岁入贡、茶马互通，岂是以强凌弱之辈所能轻蔑……”'),
    ],
    onFinishEffects: [openScene('scene_twg_08', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_08: {
    id: 'scene_twg_08',
    title: '第八幕 · 礼乐折远使',
    subtitle: '开封府 · 同文馆正厅',
    illustrationUrl: '/assets/quests/jinjun_twg_banquet_debate.jpg',
    illustrationCaption: '同文馆冬宴正厅 · 殿前司都虞候以礼乐兵略折服辽夏随使',
    beats: [
      N('你缓步走至席中，不卑不亢按剑而立，先引《周礼》宾客之仪定分止争，复以澶渊盟约以来大宋北边兵备、茶马互市之利晓以大义，声如洪钟。'),
      P('“礼者，敬人也；兵者，止戈也。大理乃天朝西南屏藩，礼敬君父，自当居宾礼之尊；至于贵国铁骑，我大宋三十万边军枕戈待旦，不知使臣今日是来论礼，还是来论兵？”'),
      S(LIAO_ENVOY, '“呃……将军口若悬河，本使不过戏言罢了，请！请满饮此杯！”'),
    ],
    onFinishEffects: [openScene('scene_twg_09', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_09: {
    id: 'scene_twg_09',
    title: '第九幕 · 镇南王致敬',
    subtitle: '开封府 · 同文馆正厅',
    beats: [
      N('一席话折服辽夏使臣，满座皆惊。段正淳举杯起身，向你郑重一揖，眼神中满是赞许与敬重。'),
      S(DUAN_ZHENGCHUN, '“将军文武兼资，进退有据，难怪深得天子与王相公信重！今夜席散后，大宋与大理之茶马盟约便只差明日御前用印了。”'),
      P('“王爷过誉。夜深风雪将急，还请王爷与世子早回南院安歇，外围自有末将甲士轮值护卫。”'),
    ],
    onFinishEffects: [openScene('scene_twg_10', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_10: {
    id: 'scene_twg_10',
    title: '第十幕 · 暗夜密谋动',
    subtitle: '开封府 · 同文馆西院禅舍',
    beats: [
      N('宴散二更，大雪再度纷飞。西院密室之中，一名乔装成行脚商人的西夏一品堂密使悄然将一只沉甸甸的紫檀金匣推至鸠摩智案前。'),
      S(JIUMOZHI, '“没藏丞相出手果然阔绰。贫僧正欲一睹段氏《六脉神剑》真容，顺手毁去那纸宋理茶马盟书，于吐蕃、于西夏皆是无量功德。”'),
    ],
    onFinishEffects: [openScene('scene_twg_11', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_11: {
    id: 'scene_twg_11',
    title: '第十一幕 · 寒夜调甲兵',
    subtitle: '开封府 · 皇城宿卫角楼',
    beats: [
      N('三更鼓响，你正在角楼巡视雪夜城防，忽然西南方向火光微闪，紧接着隐隐传来金铁交鸣与大理亲卫的短促惊呼！'),
      S(GUARD, '“报——！同文馆西院突然火起，一伙黑衣番僧正杀向南院大理馆舍！”'),
      P('“果然来了！传令三百甲士随我驰援，强弩营立刻封锁同文馆四面高墙，一个也不许放走！”'),
    ],
    onFinishEffects: [openScene('scene_twg_12', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_12: {
    id: 'scene_twg_12',
    title: '第十二幕 · 西院救火线',
    subtitle: '开封府 · 同文馆西院',
    onFinishEffects: [
      setStep(JINJUN_TONGWENGUAN_ID, 'twg_snow_night_duel'),
    ],
    beats: [
      P('“全军加速，直扑南院救护段王爷！”'),
    ],
  },
  scene_twg_13: {
    id: 'scene_twg_13',
    title: '第十三幕 · 番僧阻归路',
    subtitle: '开封府 · 同文馆南院外',
    illustrationUrl: '/assets/quests/jinjun_twg_night_fire.jpg',
    illustrationCaption: '风雪夜同文馆火起 · 吐蕃密宗护法番僧拦路截杀',
    beats: [
      N('你率甲士撞开同文馆垂花门，火光映红漫天飞雪。两名身披暗红僧袍、手持降魔杵的吐蕃密宗护法上师如铁塔般横立院门，冷冷阻断去路！'),
      P('“大胆番僧！敢在天子脚下纵火行凶，给我拿下！”'),
    ],
    onFinishEffects: [
      {
        type: 'startCombat',
        questId: JINJUN_TONGWENGUAN_ID,
        opponent: { kind: 'custom', npc: buildTuboGuardianMonkNpc(1) },
        extraOpponents: [{ kind: 'custom', npc: buildTuboGuardianMonkNpc(2) }],
        rule: 'duel',
        introText: '【馆驿护藩】两位吐蕃密宗护法上师拦路阻截，速速击溃二人驰援段氏父子！',
        onWin: [
          { type: 'giveCombatExp', amount: 80, reason: '击溃同文馆纵火吐蕃护法番僧' },
          openScene('scene_twg_14', JINJUN_TONGWENGUAN_ID),
        ],
      },
    ],
  },
  scene_twg_14: {
    id: 'scene_twg_14',
    title: '第十四幕 · 火焰刀逼险',
    subtitle: '开封府 · 同文馆南院正厅',
    illustrationUrl: '/assets/quests/jinjun_twg_duan_flame.jpg',
    illustrationCaption: '红墙雪夜 · 段正淳护子力战鸠摩智火焰刀逼入绝境',
    beats: [
      N('击倒护法番僧后你一脚踹开正厅木门，只见厅内紫檀桌案已被无形气劲劈成两半，段正淳左肩衣袖焦黑、嘴角溢血，仍死死将段誉与茶马盟书护在身后。'),
      S(JIUMOZHI, '“段王爷何必苦苦撑持？只要交出《六脉神剑》图谱与那纸盟书，贫僧立时退去，绝不伤世子半分！”'),
      S(DUAN_ZHENGCHUN, '“休想！段氏男儿宁折不屈！”'),
    ],
    onFinishEffects: [openScene('scene_twg_15', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_15: {
    id: 'scene_twg_15',
    title: '第十五幕 · 挺枪救危局',
    subtitle: '开封府 · 同文馆南院正厅',
    beats: [
      N('鸠摩智冷哼一声，双掌合十微搓，一道炽烈如焚的赤红无形刀气骤然破空斩向段正淳面门！千钧一发之际，一杆银锋红缨长枪如怒龙穿雪般斜刺而至，硬生生将那道火焰刀气震碎于半空！'),
      P('“大轮明王好大的威风！在我殿前司甲士眼皮底下逼宫劫掠，问过我手中这杆长枪没有！”'),
      S(JIUMOZHI, '“好霸道浑厚的内力！阁下莫非便是那位破燕子坞、平太行的年轻将军？”'),
    ],
    onFinishEffects: [openScene('scene_twg_16', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_16: {
    id: 'scene_twg_16',
    title: '第十六幕 · 甲士锁重围',
    subtitle: '开封府 · 同文馆南院庭中',
    beats: [
      P('“仪鸾司听令：护住段王爷与世子退入内室！强弩列阵四隅，本将今日亲自领教吐蕃国师的高招！”'),
      S(DUAN_YU, '“将军千万小心，这大和尚掌风炙热无比，还能隔空伤人！”'),
    ],
    onFinishEffects: [openScene('scene_twg_17', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_17: {
    id: 'scene_twg_17',
    title: '第十七幕 · 踏雪战明王',
    subtitle: '开封府 · 同文馆红墙飞檐下',
    illustrationUrl: '/assets/quests/jinjun_twg_jiumozhi_duel.jpg',
    illustrationCaption: '同文馆飞檐踏雪 · 太玄枪意挑碎大轮明王袈裟金环',
    beats: [
      N('漫天大雪纷纷扬扬，红墙飞檐之下，鸠摩智催动小无相功，双掌翻飞间十余道火焰刀气纵横交错，将四周积雪蒸腾成滚滚白雾；你内运《太玄经》浑厚真气，长枪抖出万点寒星，以寒江怒龙之势迎面直上！'),
      S(JIUMOZHI, '“小无相功催火焰刀，接招吧！”'),
    ],
    onFinishEffects: [
      {
        type: 'startCombat',
        questId: JINJUN_TONGWENGUAN_ID,
        opponent: {
          kind: 'npc',
          npcId: 'NPC-0113',
          talkOverride: '“施主内力浑厚竟至如斯，且接贫僧十成功力的火焰刀！”',
        },
        rule: 'duel',
        introText:
          '【雪夜巅峰对决】大轮明王鸠摩智（宗师中品）催动小无相功与火焰刀全力出手！请运《太玄经》真气破其刀势！',
        onWin: [
          { type: 'giveCombatExp', amount: 140, reason: '雪夜同文馆独战击退吐蕃国师鸠摩智' },
          openScene('scene_twg_18', JINJUN_TONGWENGUAN_ID),
        ],
      },
    ],
  },
  scene_twg_18: {
    id: 'scene_twg_18',
    title: '第十八幕 · 枪挑袈裟环',
    subtitle: '开封府 · 同文馆红墙飞檐下',
    beats: [
      N('激战十余合后，你忽然察觉鸠摩智虽催动小无相功模拟少林与逍遥奇功，真气转换间终有一丝微瑕！你长啸一声，枪走龙蛇直取中宫，“叮当”一声脆响，银枪枪尖竟硬生生挑碎其胸前纯金袈裟扣环，凌厉枪气顺势震散漫天火焰刀影！'),
      S(JIUMOZHI, '“噗……好精纯的《太玄经》真气！贫僧今日算是见识了中原藏龙卧虎！”'),
      S(GUARD, '“神臂强弩已全数锁定！请都帅下令！”'),
    ],
    onFinishEffects: [openScene('scene_twg_19', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_19: {
    id: 'scene_twg_19',
    title: '第十九幕 · 明王合十退',
    subtitle: '开封府 · 同文馆南院庭中',
    beats: [
      N('鸠摩智环顾四周屋檐上密密麻麻上弦瞄准的禁军神臂强弩，自知大势已去，只得缓缓收掌合十，强压体内翻涌的气血，脸上挤出一丝无奈笑意。'),
      S(JIUMOZHI, '“阿弥陀佛，今夜风雪太冷，贫僧偶感风寒神智不清，冲撞了大理王爷与将军，明日便向贵朝礼部告假托病离京。”'),
      P('“国师既知风雪寒冷，好走不送！”'),
    ],
    onFinishEffects: [openScene('scene_twg_20', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_20: {
    id: 'scene_twg_20',
    title: '第二十幕 · 盟书无恙归',
    subtitle: '开封府 · 同文馆南院正厅',
    beats: [
      S(DUAN_ZHENGCHUN, '“多亏将军雪夜及时相救，茶马盟书与犬子皆安然无恙！大宋有将军这等柱石，实乃天下苍生之福。”'),
    ],
    onFinishEffects: [
      setStep(JINJUN_TONGWENGUAN_ID, 'twg_treaty_farewell'),
    ],
  },
  scene_twg_21: {
    id: 'scene_twg_21',
    title: '第二十一幕 · 紫宸定盟约',
    subtitle: '开封府 · 垂拱紫宸正殿',
    beats: [
      N('次日清晨，鸠摩智果然托病率吐蕃使团匆匆出南薰门而去。垂拱殿内，宋理茶马盟书正式用印，枢密使王德用抚须大笑，赞你既全大宋体面，又保西南藩屏安稳。'),
      S(WANG, '“以礼折辽夏，以武慑吐蕃，不费朝廷一兵一卒而稳住大理茶马古道！{gender:贤侄|女将军}此功当记头等！”'),
    ],
    onFinishEffects: [openScene('scene_twg_22', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_22: {
    id: 'scene_twg_22',
    title: '第二十二幕 · 十里亭送别',
    subtitle: '开封府 · 城南送别亭',
    illustrationUrl: '/assets/quests/jinjun_twg_dali_treaty.jpg',
    illustrationCaption: '风波平息盟书既定 · 段正淳赠大理雪山骢与段氏纯阳吐纳诀',
    beats: [
      N('三日后大理使团启程南归。段正淳特命亲随牵来一匹通体银鬃、神骏非凡的大理名驹，又从怀中取出一册描金线装小篆秘本。'),
      S(DUAN_ZHENGCHUN, '“这匹《点苍蹑云雪山骢》饮苍山雪水长大，日行八百里险道如履平地；这册《段氏纯阳吐纳诀》乃我段氏指劲行气之根基秘要，今一并赠予将军留作念想！”'),
      S(DUAN_YU, '“将军保重！他日若有机缘临幸大理苍山洱海，段誉必扫榻相迎！”'),
    ],
    onFinishEffects: [openScene('scene_twg_23', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_23: {
    id: 'scene_twg_23',
    title: '第二十三幕 · 秘要入丹田',
    subtitle: '开封府 · 殿前司帅府',
    beats: [
      N('送别大理使团回营后，你于灯下细细翻阅《段氏纯阳吐纳诀》，只觉其气脉纯正中庸，竟与《太玄经》浩瀚真气隐隐相合，灵台一片清明。'),
      P('“好一门温养阳气的纯正内功！有此行气法门相辅，日后无论临阵斗将还是内息调理，皆多了一重底气。”'),
    ],
    onFinishEffects: [openScene('scene_twg_24', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_24: {
    id: 'scene_twg_24',
    title: '第二十四幕 · 西南稳如山',
    subtitle: '开封府 · 殿前司点兵台',
    beats: [
      S(GUARD, '“禀都帅，同文馆余下使团皆恭顺守礼，已陆续启程归国，京畿内外安然无虞！”'),
    ],
    onFinishEffects: [openScene('scene_twg_25', JINJUN_TONGWENGUAN_ID)],
  },
  scene_twg_25: {
    id: 'scene_twg_25',
    title: '第二十五幕 · 四夷宾服录',
    subtitle: '开封府 · 殿前司帅府',
    beats: [
      N('同文馆风波圆满落幕，大理茶马源源不断输往京西与陕西边军，大宋西南藩屏自此稳如泰山。你也凭借此役文武兼备的威名，成为朝野上下公认的禁军砥柱。'),
      P('“（内忧暂靖，四夷宾服……可那股来自岭南蛮荒与西北边陲的隐隐杀气，只怕很快便要席卷而来了。）”'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'MNT-007', qty: 1 },
      { type: 'teachMartialArt', artId: 'MA-220', level: 3 },
      { type: 'giveSilver', amount: 300 },
      { type: 'addArtExp', amount: 2200 },
      { type: 'addSectContribution', amount: 120 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0236' }, delta: 25 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0038' }, delta: 10 },
      { type: 'modifyRenown', delta: 20 },
      { type: 'completeQuest', questId: JINJUN_TONGWENGUAN_ID },
    ],
  },
}
