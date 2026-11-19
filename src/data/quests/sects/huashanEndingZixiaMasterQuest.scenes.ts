import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q19_QUEST_ID } from './huashanEndingZixiaMasterQuest'

const SPEAKER_TUOBA_XIONG: StorySpeakerSpec = {
  kind: 'custom',
  name: '拓跋雄',
  title: '西夏关中主帅 · 一品堂征东大都督',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
}

const SPEAKER_XIXIA_VANGUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '嵬名赤虎',
  title: '西夏一品堂风陵先锋统领',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
}

const SPEAKER_TONGGUAN_GENERAL: StorySpeakerSpec = {
  kind: 'custom',
  name: '潼关守城都监',
  title: '大宋陕府西路守御武官',
  factionName: '大宋禁军',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
}

function buildQ19XixiaVanguardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ19_XIXIA_VANGUARD',
    name: '嵬名赤虎',
    title: '西夏一品堂 · 风陵铁甲先锋',
    realm: '一流上品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 4,
    sectRankLabel: '先锋统领',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“哪来的紫衫道人敢夜闯大夏帅营？拿命来！”',
    stats: { hp: 4050, mp: 3420, agi: 74, res: 68 },
    talents: { bone: 78, comprehension: 66, charm: 45 },
    equipped: {
      weapon: 'WPN-012',
      armor: 'ARM-012',
    },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-246',
      move1: 'MA-133',
      move2: 'MA-068',
    },
    learnedArts: [
      { artId: 'MA-245', level: 8 },
      { artId: 'MA-246', level: 8 },
      { artId: 'MA-133', level: 8 },
      { artId: 'MA-068', level: 8 },
    ],
  })
}

function buildQ19TuobaXiongNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ19_TUOBA_XIONG',
    name: '拓跋雄',
    title: '西夏关中主帅 · 一品堂征东大都督',
    realm: '宗师中品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 5,
    sectRankLabel: '关中主帅',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“岳沧溟老贼不敢下山，倒派个毛头传人送死？本帅定叫你这身紫霞衫染满心头血！”',
    stats: { hp: 5620, mp: 4920, agi: 80, res: 77 },
    talents: { bone: 86, comprehension: 80, charm: 60 },
    equipped: {
      weapon: 'WPN-012',
      armor: 'ARM-012',
    },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-246',
      move1: 'MA-133',
      move2: 'MA-049',
    },
    learnedArts: [
      { artId: 'MA-245', level: 9 },
      { artId: 'MA-246', level: 9 },
      { artId: 'MA-133', level: 9 },
      { artId: 'MA-049', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq19_01: {
    id: 'scene_hsq19_01',
    title: '第一幕 · 紫气圆满照丹墀',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('{reignYear}初冬，华山万壑凝霜。紫霞正气主殿之内炉香袅袅，你盘膝吐纳收功，眉宇间一抹莹然紫气三现三隐，绵密雄浑的先天太岳真气已在四肢百骸间运转如意。'),
      N('你身披镇派宝衣《华山紫霞剑客衫》，膝横《太岳紫霞长剑》，长身向殿上岳沧溟、秦烈山、宁清羽、封不弃与大师兄高沧云稽首行礼。'),
      S('NPC-0118', '（抚须端详你周身圆融无瑕的气机，欣慰颔首）“紫气归元，渊渟岳峙！短短时日便将《紫霞神功（先天太岳卷）》修至如此火候，纵观我华山近百年门人，无出你右者！”'),
    ],
    onFinishEffects: [
      {
        type: 'branch',
        condition: flag('hs_cave', 'eq', 'usurp'),
        thenEffects: [{ type: 'setFlag', flag: 'hs_q19_cave_usurp', value: true }],
        elseEffects: [{ type: 'setFlag', flag: 'hs_q19_cave_usurp', value: false }],
      },
      openScene('scene_hsq19_02', HUASHAN_Q19_QUEST_ID),
    ],
  },

  scene_hsq19_02: {
    id: 'scene_hsq19_02',
    title: '第二幕 · 风陵烽急寇氛炽',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0202', '（上前一步呈开羊皮军图，神色凛然）“禀师父、诸位师叔，还有{gender:师弟|师妹}——潼关守将与本门山下暗哨同时急报：西夏一品堂关中主帅拓跋雄并未死心！”'),
      S('NPC-0202', '“拓跋雄已在黄河大折北岸的风陵荒原扎下连环大营，囤积百车粮草与破城火器，纠集一品堂百余名番邦好手，扬言待冬月黄河结冰便一举踏破潼关、血洗西岳！”'),
      S('NPC-0147', '（冷哼拍案）“贼心不死！上回教他们逃回河北岸，倒以为我华山剑派只会闭山自守了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_03', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_03: {
    id: 'scene_hsq19_03',
    title: '第三幕 · 掌门决意托帅印',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('岳沧溟轻咳一声，鬓边霜雪更添几分苍老，目光却澄澈如炬地落在你身上。'),
      S('NPC-0118', '“老夫执掌华山三十余载，早年玉女峰旧创连同近年护山劳损，气血已渐衰颓，是到了退位让贤之时。然华山掌门非仅坐镇道观之清修客，更是拱卫秦川百姓的中流砥柱！”'),
      S('NPC-0118', '“此番讨伐风陵夏营，老夫不亲往——由你身披紫霞衫、手提太岳剑挂帅主征，沧云率两脉百名精锐剑士为副！若能阵斩拓跋雄、焚尽西夏粮械，归来之日，老夫便当众传你华山掌门大位！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_04', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_04: {
    id: 'scene_hsq19_04',
    title: '第四幕 · 两脉长老共嘱行',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0202', '（慨然抱拳向你深揖）“师父慧眼识英雄！{gender:师弟|师妹}紫霞神功已臻化境，沧云甘为前驱副手，定率百名同门唯你马首是瞻！”'),
      S('NPC-0166', '“拓跋雄出身西夏皇族旁支，一身秘藏玄功与狂沙重刃已入宗师中品之境，{gender:师侄|师侄女}切记以先天紫霞绵长正气消磨其凶悍狂劲，万勿轻敌。”'),
      S('NPC-0167', '“{ifFlag:hs_q19_cave_usurp|（忌惮地瞥了眼你腰间寒意森然的太岳长剑，抱拳沉声道）你既兼通奇剑又炼成先天紫霞，我剑宗三十名精锐快剑手今夜亦归你节制，莫堕了西岳威风|（爽快一拍剑鞘）好！你当日在思过崖削壁止戈，对剑宗同门推诚相待，今夜我剑宗精锐全数听你调遣，叫西夏番狗瞧瞧华山合派之威}！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_05', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_05: {
    id: 'scene_hsq19_05',
    title: '第五幕 · 拔剑誓师指风陵',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      P('“弟子谨奉掌门帅令！西夏一品堂屡犯关中、觊觎西岳，今夜定叫风陵荒原化作拓跋雄埋骨之地，不破夏营，誓不还山！”'),
      N('你锵然拔出《太岳紫霞长剑》斜指苍穹，剑身映出满堂烛火与淡淡紫芒，殿外百名整装待发的华山剑士齐声应诺，声震群峰！'),
    ],
    onFinishEffects: [openScene('scene_hsq19_06', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_06: {
    id: 'scene_hsq19_06',
    title: '第六幕 · 百剑衔枚下苍龙',
    subtitle: '华山山道 · 苍龙岭石阶',
    mandatory: true,
    beats: [
      N('暮色四合，寒星初上。百名华山精锐人衔枚、剑裹布，随你与高沧云疾下苍龙岭、百尺峡、千尺幢，如一道无声洪流直奔山下潼关雄城！'),
      P('“沧云师兄，传令全队至潼关瓮城稍作整备，今夜三更借河雾奇袭风陵！”'),
    ],
    choices: [
      {
        id: 'hsq19_ch_to_tongguan',
        label: '率百名华山剑士赶赴【潼关天险瓮城 · 潼关镇河主城楼与瓮城】',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q19_QUEST_ID, stepId: 'march_tongguan' },
          toast('帅令已发！请前往【潼关天险瓮城 · 潼关镇河主城楼与瓮城】点兵出关！', 'talk', '紫衫出征'),
        ],
      },
    ],
  },

  scene_hsq19_07: {
    id: 'scene_hsq19_07',
    title: '第七幕 · 紫衫出关星月寒',
    subtitle: '潼关天险瓮城 · 潼关镇河主城楼与瓮城',
    illustrationUrl: '/assets/quests/hs_q19_night_march.jpg',
    illustrationCaption: '紫衫出关 · 身披紫霞衫手持太岳剑，率百名华山剑士星夜下潼关',
    mandatory: true,
    beats: [
      N('子夜潼关，黄河怒涛拍击城基如万马奔腾。沉重的包铁瓮城闸门缓缓升起，你一袭《华山紫霞剑客衫》独立队列最前，手中《太岳紫霞长剑》吞吐着三寸凝而不散的清冽紫芒！'),
      S(SPEAKER_TONGGUAN_GENERAL, '（披甲抱拳肃然行礼）“早闻华山派侠义冠关中，不想今夜竟精锐尽出替我边关拔除风陵毒刺！渡河快船已在北水门备妥，预祝高少侠与新帅旗开得胜！”'),
      P('“有劳将军接应后路！待风陵北岸火起，便是西夏一品堂授首之时！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_08', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_08: {
    id: 'scene_hsq19_08',
    title: '第八幕 · 轻舟暗渡九曲涛',
    subtitle: '潼关北水门 · 黄河渡口',
    mandatory: true,
    beats: [
      N('十艘蒙皮快船借着浓重寒雾悄然滑入黄河急流。两岸绝壁如削，冰冷刺骨的河风吹拂在众人面上，你立于船头默运《紫霞神功》，将周身气息收敛得与江雾融为一体。'),
      S('NPC-0202', '（低声禀道）“前方三里便是风陵荒原滩涂。探子回报，拓跋雄将粮草军械囤于西寨，亲率一品堂精锐驻扎中军大帐，外围设了三重游骑明哨。”'),
      P('“寻常偷袭讲究暗杀潜行，但拓跋雄身边高手环伺，一旦缠斗陷入泥潭反而被动——今夜我们反其道而行，先登惊涛烽火高坡看清营盘，随后正面雷霆凿穿！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_09', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_09: {
    id: 'scene_hsq19_09',
    title: '第九幕 · 悄拔暗哨清滩涂',
    subtitle: '风陵渡口外围芦苇荡',
    mandatory: true,
    beats: [
      N('快船靠岸，芦苇丛中四名西夏巡夜番骑刚察觉水声异动，尚未摸到腰间号角，你与高沧云已如两缕轻烟掠上河岸，剑鞘轻点，四名番骑无声无息软倒滩头。'),
      S('NPC-0202', '“好快好纯的身法！紫霞真气催动轻功，果真落叶无声！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_10', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_10: {
    id: 'scene_hsq19_10',
    title: '第十幕 · 分兵两翼定奇谋',
    subtitle: '风陵荒原南麓高坡',
    mandatory: true,
    beats: [
      P('“沧云师兄，你率六十名弟子每人携火油硫磺，自右翼迂回切入西寨粮仓；我亲率四十名精锐剑士正面踏破辕门直取拓跋雄中军，吸住一品堂全部主力！”'),
      S('NPC-0202', '“{gender:师弟|师妹}，中军至少有两百名一品堂死士与拓跋雄本人坐镇，四十人正面冲营岂非太险？！”'),
      P('“有《紫霞神功》与《太岳紫霞长剑》在手，人多人少并无分别。只要西寨火起，敌军军心必乱，届时两面夹击，一战可定乾坤！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_11', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_11: {
    id: 'scene_hsq19_11',
    title: '第十一幕 · 推进高台窥连营',
    subtitle: '黄河大折外围高地',
    mandatory: true,
    beats: [
      N('高沧云郑重抱拳，领命率右翼奇兵悄然隐入夜色。你则带着四十名气势如虹的华山剑士，直扑俯瞰整片风陵荒原的惊涛烽火高地！'),
    ],
    choices: [
      {
        id: 'hsq19_ch_to_beacon',
        label: '登临【潼关天险瓮城 · 黄河大折惊涛烽火台】发动风陵总攻！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q19_QUEST_ID, 'raid_fengling'),
          toast('各部就位！请赴【黄河大折惊涛烽火台】向风陵西夏大营发动雷霆总攻！', 'warn', '风陵夜袭'),
        ],
      },
    ],
  },

  scene_hsq19_12: {
    id: 'scene_hsq19_12',
    title: '第十二幕 · 荒原月出照狼烟',
    subtitle: '潼关天险瓮城 · 黄河大折惊涛烽火台（风陵前哨）',
    mandatory: true,
    beats: [
      N('三更梆响，漫天寒雾忽被朔风吹散，一轮皎洁冷月高悬中天。极目望去，风陵荒原之上西夏连营绵延数里，狼头大纛在月色下狰狞招展，无数攻城云梯与神臂破甲车森然林立。'),
      N('若任由这批军械粮草渡过黄河，莫说潼关守军将浴血尸山，关中百万生民亦将重陷兵燹涂炭！'),
      P('“华山儿郎听令——拔剑！随我踏平西夏帅营！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_13', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_13: {
    id: 'scene_hsq19_13',
    title: '第十三幕 · 先天太岳起风云',
    subtitle: '风陵荒原 · 西夏大营辕门外',
    mandatory: true,
    beats: [
      N('四十道矫健剑影随你自高坡疾掠而下，守门番兵惊觉示警，凄厉铜锣与号角声骤然撕裂荒原寂静！'),
      N('你不闪不避，丹田之内圆满《紫霞神功（先天太岳卷）》轰然全面运转——刹那间，你一袭紫衫无风自动，醇厚浩瀚的先天紫气顺着《太岳紫霞长剑》喷薄而出！'),
    ],
    onFinishEffects: [openScene('scene_hsq19_14', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_14: {
    id: 'scene_hsq19_14',
    title: '第十四幕 · 紫气十里卷连营',
    subtitle: '风陵荒原 · 西夏一品堂大营',
    illustrationUrl: '/assets/quests/hs_q19_fengling_charge.jpg',
    illustrationCaption: '紫气十里 · 月夜风陵荒原圆满紫霞神功浩荡席卷西夏一品堂大营',
    mandatory: true,
    beats: [
      N('月华与紫霞交相辉映，竟似在荒原夜幕下掀起一道绵延十里的紫电惊涛！你一剑横扫辕门，“轰”地一声巨响，碗口粗的拒马鹿角与望楼木栅被雄浑无匹的紫霞剑罡整排震飞崩碎！'),
      N('紧随身后的四十名华山精锐剑士借着这股席卷天地的宗师气势如虎入羊群，太岳剑光闪烁处，仓促迎战的一品堂外围番兵成片溃倒！'),
      S(SPEAKER_XIXIA_VANGUARD, '（披挂重甲提刀冲出前营，骇然怒吼）“稳住阵脚！不过区区数十名华山道士，重盾刀手随本统领拦住那紫衫贼首！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_15', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_15: {
    id: 'scene_hsq19_15',
    title: '第十五幕 · 铁甲先锋横刀拦',
    subtitle: '风陵荒原 · 西夏前营校场',
    mandatory: true,
    beats: [
      N('西夏一品堂风陵先锋统领【嵬名赤虎】身披双层冷锻铁甲，挥舞沉重西夏弯刀率亲卫死士结成铁桶重阵，刀风呼啸拦在通往中军大帐的必经要道！'),
      P('“米粒之珠，也敢阻紫霞皓月？拿你项上人头祭旗！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_16', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_16: {
    id: 'scene_hsq19_16',
    title: '第十六幕 · 紫电破甲斩赤虎',
    subtitle: '风陵荒原 · 西夏前营校场',
    mandatory: true,
    beats: [
      S(SPEAKER_XIXIA_VANGUARD, '“狂妄宋狗，吃某家一记大漠裂风斩！”'),
      N('嵬名赤虎狂催秘藏玄功，弯刀带着凄厉风声当头劈落！'),
    ],
    choices: [
      {
        id: 'hsq19_ch_duel_vanguard',
        label: '催动紫霞剑罡，阵斩一品堂先锋统领嵬名赤虎！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQ19XixiaVanguardNpc() },
            rule: 'duel',
            forbidEscapeReason: '身为华山统帅正面冲营，岂可临阵退缩！',
            introText: '【破营斩将】催动《紫霞神功》与《太岳紫霞长剑》，正面击杀西夏先锋嵬名赤虎（一流上品）！',
            onWin: [
              { type: 'giveCombatExp', amount: 150, reason: '风陵前营阵斩西夏一品堂先锋嵬名赤虎' },
              openScene('scene_hsq19_17', HUASHAN_Q19_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq19_17: {
    id: 'scene_hsq19_17',
    title: '第十七幕 · 剑裂重铠直捣黄龙',
    subtitle: '风陵荒原 · 西夏中军帅帐前',
    mandatory: true,
    beats: [
      N('太岳紫霞长剑紫芒暴涨，一记《太岳三青峰》连环三剑重若泰山压顶，生生将嵬名赤虎手中弯刀连同胸前双层冷锻铁甲一剑劈开！先锋毙命，前营西夏番兵魂飞魄散，哭喊着四散奔逃！'),
      N('几乎在同一时刻，大营西侧骤然冲起数道摩天火柱——高沧云所率右翼奇兵已准时杀入西寨粮仓得手！'),
      S(SPEAKER_TUOBA_XIONG, '（一声震得营帐旌旗碎裂的暴怒咆哮自中军帅帐炸响）“华山小辈！！敢毁本帅苦心筹谋半载的关中粮营，本帅要将你碎尸万段！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_18', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_18: {
    id: 'scene_hsq19_18',
    title: '第十八幕 · 西夏主帅拓跋雄',
    subtitle: '风陵荒原 · 西夏中军帅帐前',
    mandatory: true,
    beats: [
      N('帅帐锦帘被狂暴内劲撕成碎片，身高九尺、披挂契丹狼裘金甲的西夏关中主帅【拓跋雄】提着一柄寒气逼人的夏国冷锻重剑大步踏出，宗师中品的凶悍煞气令周遭篝火都剧烈摇晃！'),
      S(SPEAKER_TUOBA_XIONG, '“那件紫霞剑客衫、那柄太岳紫霞长剑……岳沧溟老儿竟把掌门衣钵传给了你？好，好得很！今夜本帅便斩了你这华山少帅，提着你的头颅和紫霞剑去玉女峰讨债！”'),
      P('“拓跋雄，你勾结四大恶人夜袭我华山在前，屯兵风陵图谋关中生民在后！今夜紫霞剑下，便是你西夏一品堂在关中绝迹之时！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_19', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_19: {
    id: 'scene_hsq19_19',
    title: '第十九幕 · 万军丛中决死战',
    subtitle: '风陵荒原 · 西夏中军校场',
    mandatory: true,
    beats: [
      N('四周华山剑士死死挡住回援的西夏亲卫，校场中央留出十丈空地。拓跋雄双手握剑猛踏地面，冻土寸寸龟裂，西夏秘藏玄功化作腥红狂风向你正面压来；你长吸一口清冽夜气，先天太岳紫气如华岳千仞巍然迎上！'),
      S(SPEAKER_TUOBA_XIONG, '“受死——贺兰血月斩！！”'),
    ],
    choices: [
      {
        id: 'hsq19_ch_duel_tuoba',
        label: '全力催动先天《紫霞神功》，万军丛中单骑斩杀主帅拓跋雄！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQ19TuobaXiongNpc() },
            rule: 'duel',
            forbidEscapeReason: '两军决战主帅争锋，唯有死战斩敌方能靖平关中！',
            introText: '【阵斩元凶】以圆满《紫霞神功（先天太岳卷）》正面决战西夏关中主帅拓跋雄（宗师中品）！',
            onWin: [
              { type: 'giveCombatExp', amount: 220, reason: '风陵中军万军丛中阵斩西夏主帅拓跋雄' },
              openScene('scene_hsq19_20', HUASHAN_Q19_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq19_20: {
    id: 'scene_hsq19_20',
    title: '第二十幕 · 太岳紫霞斩元凶',
    subtitle: '风陵荒原 · 西夏中军校场',
    illustrationUrl: '/assets/quests/hs_q19_slay_tuoba.jpg',
    illustrationCaption: '阵斩元凶 · 万军丛中太岳紫霞剑正面斩杀西夏关中主帅拓跋雄',
    mandatory: true,
    beats: [
      N('“紫霞东来，气吞太华——破！！”激斗至白热之境，拓跋雄刚猛霸烈的西夏秘藏玄功渐现后力不继，而你的《紫霞神功》却如长江大河绵绵不绝、愈战愈盛！'),
      N('伴随着一声龙吟般的清啸，璀璨夺目的紫色剑虹正面斩断拓跋雄手中冷锻重剑，余势毫不停滞，自左肩斜劈而下，在万军瞩目之中将这位西夏关中主帅一剑枭首！'),
      N('你左手一把接住坠落的西夏征东狼头帅旗，右手《太岳紫霞长剑》高举向天，朗喝道：“拓跋雄已授首！降者免死！”全场西夏残军肝胆俱裂，丢盔弃甲抱头鼠窜！'),
    ],
    onFinishEffects: [openScene('scene_hsq19_21', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_21: {
    id: 'scene_hsq19_21',
    title: '第二十一幕 · 烈火焚营靖河山',
    subtitle: '风陵荒原 · 火海连营',
    illustrationUrl: '/assets/quests/hs_q19_burn_camp.jpg',
    illustrationCaption: '烈火靖关 · 焚尽一品堂粮草军械，彻底粉碎西夏染指关中之谋',
    mandatory: true,
    beats: [
      N('高沧云率右翼六十名剑士浴血杀透西寨与你会合，百名华山弟子将火炬尽数投向中军军械库与百余辆攻城重车！'),
      N('熊熊烈焰冲天而起，将整片风陵荒原与九曲黄河冰浪映照得如同白昼。一品堂苦心经营半载的粮草、火药、强弩尽化飞灰，西夏借道黄河染指关中的狼子野心，在今夜这把冲天大火中彻底灰飞烟灭！'),
      S('NPC-0202', '（望着独立火光之前、紫衫纤尘不染的你，由衷感佩长揖）“十里紫气破连营，万军阵前斩主帅……{gender:师弟|师妹}今日之威，真乃我华山气宗百年未有之大宗师气象！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_22', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_22: {
    id: 'scene_hsq19_22',
    title: '第二十二幕 · 百剑无损奏凯歌',
    subtitle: '潼关北水门 · 破晓渡口',
    mandatory: true,
    beats: [
      N('清点人数，随征百名华山精锐仅数人轻伤，无一阵亡，更缴获西夏帅旗与密信文书数匣。潼关守军登上城楼擂鼓欢呼，关中百姓闻讯夹道焚香相迎。'),
      P('“将西夏密信交予潼关守将飞报朝廷边帅备御，只留这面一品堂征东狼头帅旗——沧云师兄，我们班师回玉女峰复命！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_23', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_23: {
    id: 'scene_hsq19_23',
    title: '第二十三幕 · 班师荣归玉女峰',
    subtitle: '西岳华山 · 苍龙岭云道',
    mandatory: true,
    beats: [
      N('破晓时分，百名剑士意气风发踏上华山云道，玉女峰顶早已响起唯有历代掌门传位方才撞响的九响太岳景钟！'),
    ],
    choices: [
      {
        id: 'hsq19_ch_return_zixia',
        label: '携风陵全胜之威登临【玉女峰紫霞道观 · 紫霞正气主殿】受印登位！',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q19_QUEST_ID, 'coronation_zixia'),
          { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_zixia', spotId: 'tg_zx_hall' },
          toast('凯旋回山！太岳九钟已鸣，请于【紫霞正气主殿】受印继任华山掌门！', 'success', '凯旋归山'),
          openScene('scene_hsq19_24', HUASHAN_Q19_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq19_24: {
    id: 'scene_hsq19_24',
    title: '第二十四幕 · 献捷丹墀震两脉',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('紫霞正气主殿内外旌旗肃穆，气剑两脉数百名门人齐聚丹墀。你与高沧云大步踏入殿门，将焦黑染血的西夏征东大纛掷于阶前！'),
      P('“禀师父、诸位师叔师伯：幸不辱命！昨夜风陵一战，已阵斩西夏关中主帅拓跋雄，焚毁一品堂百车粮械，关中边患尽平！”'),
      S('NPC-0147', '（虎目放光，抚掌大笑）“好！痛快！！单骑入阵枭首拓跋雄，这份功业，莫说关中武林，便是放眼天下五岳与少林丐帮，谁敢小觑我华山半毫！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_25', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_25: {
    id: 'scene_hsq19_25',
    title: '第二十五幕 · 思过余响定门风',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('岳沧溟自掌门宝座缓步走下，秦烈山、宁清羽、封不弃三位宿老分立左右。值此新旧交替之际，昔日思过崖秘洞中的因果亦在殿宇间回荡——'),
      S('NPC-0167', '“{ifFlag:hs_q19_cave_usurp|（凝望着你身上深不可测的紫霞罡气与凌厉剑威，终是深深低下头去，沉声抱拳）成王败寇，武道唯尊强者！你将先天紫霞修至这等铁腕横压一世的境界，连拓跋雄亦一剑毙命，我剑宗上下……今后谨遵气宗掌门号令，绝无二话|（满脸诚挚钦服，带头抱拳深揖）你当日在思过崖不贪秘刻、削壁止戈，昨夜风陵之战又让两脉子弟同享殊荣、无一折损！由你这位仁勇无双的气宗传人执掌华山，我封不弃与剑宗一脉心悦诚服}！”'),
      S('NPC-0166', '（含笑点头）“{ifFlag:hs_q19_cave_usurp|威震内外，令行禁止，华山自此再无分裂之虞|以德服人，剑气归心，三十载门户阴霾今日一朝散尽}。师兄，吉时已到，请行传位大礼吧！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_26', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_26: {
    id: 'scene_hsq19_26',
    title: '第二十六幕 · 东峰日出紫气来',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('殿门大敞，东方朝阳恰在此时跃出万里秦川云海！万道璀璨霞光涌入紫霞正气主殿，与你体内自然溢出的先天紫霞真气交相呼应，满殿瑞霭氤氲、紫气东来！'),
      S('NPC-0118', '（双手捧起历代相传的太岳紫金道冠与华山掌门白玉大印，庄严朗喝）“新任掌门传人听训——上敬太华历代先师，下护关中黎庶苍生，持太岳正气，守西岳千秋！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_27', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_27: {
    id: 'scene_hsq19_27',
    title: '第二十七幕 · 冠簪授印登正主',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    illustrationUrl: '/assets/quests/hs_q19_master_coronation.jpg',
    illustrationCaption: '太岳正主 · 漫天朝阳紫气中岳沧溟四老冠簪授印，登位华山派掌门',
    mandatory: true,
    beats: [
      N('漫天朝阳紫气之中，你在历代祖师牌位前肃然跪受。岳沧溟亲手为你束发加戴太岳紫金冠、插上白玉莲花簪，秦烈山、宁清羽、封不弃三老共同奉上华山掌门大印！'),
      N('当你双手接印、按着《太岳紫霞长剑》转身面向殿外云海的那一刻，高沧云率领满山数百名华山弟子齐刷刷躬身拜倒，山呼之声响彻西岳五峰——'),
      S('NPC-0202', '“恭迎新任华山掌门——太岳永昌，紫霞千秋！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_28', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_28: {
    id: 'scene_hsq19_28',
    title: '第二十八幕 · 掌门初政立纲常',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('你立于紫霞主殿最高阶前，目光扫过阶下肃立的同门与远方壮丽河山，朗声颁下继任掌门后的第一道训令：'),
    ],
    choices: [
      {
        id: 'hsq19_ch_decree_iron',
        label: '“自今日起，华山以先天紫霞为唯一根本正统，铁律治山，敢有私斗叛宗者严惩不贷！”',
        subLabel: '铁腕定纲 · 彰气宗独尊之雷霆威严',
        tone: 'gold',
        condition: flag('hs_cave', 'eq', 'usurp'),
        hideWhenUnavailable: true,
        effects: [openScene('scene_hsq19_29', HUASHAN_Q19_QUEST_ID)],
      },
      {
        id: 'hsq19_ch_decree_harmony',
        label: '“自今日起，华山以紫霞养浩然正气、以奇剑砺护国锋芒，两脉一体，共兴太岳！”',
        subLabel: '宽仁御众 · 成两脉归心之浩荡气象',
        tone: 'jade',
        condition: flag('hs_cave', 'neq', 'usurp'),
        hideWhenUnavailable: true,
        effects: [openScene('scene_hsq19_29', HUASHAN_Q19_QUEST_ID)],
      },
    ],
  },

  scene_hsq19_29: {
    id: 'scene_hsq19_29',
    title: '第二十九幕 · 宿老退隐寄厚望',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0118', '（卸下肩头三十载重担，神色前所未有地轻松开朗）“善哉！老夫今日起退居后山清修，华山上下一切门规、武库与江湖盟约，尽交由新掌门一言决之！”'),
      S('NPC-0147', '“嘿，听说待今冬大雪封山之际，正逢六十年一度的甲子论剑之期！以新掌门如今的《紫霞神功》造诣，何不重开落雁峰白玉论剑坛，会一会天下绝顶英雄？！”'),
      P('“秦师伯所言甚合我意！待整顿山门事务完毕，冬雪封山之日，我华山便在落雁峰顶恭候四海豪杰！”'),
    ],
    onFinishEffects: [openScene('scene_hsq19_30', HUASHAN_Q19_QUEST_ID)],
  },

  scene_hsq19_30: {
    id: 'scene_hsq19_30',
    title: '第三十幕 · 紫霞浩荡主西岳',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('晨钟悠扬，紫气漫卷太华五峰。昔日长安秋雨茶棚外持白纸叩门的少年游侠，历经千锤百炼与风陵浴血，终于在这{reignYear}的冬日朝阳下，正式登临西岳华山派掌门绝巅！'),
    ],
    choices: [
      {
        id: 'hsq19_ch_complete',
        label: '执掌太岳玉印，正式晋升 Lv.5 华山派掌门！',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-05', rank: 5, promoteOnly: true },
          { type: 'setFlag', flag: 'hs_ending', value: 'zixia_master' },
          { type: 'giveSilver', amount: 420, reason: '荡平风陵夏营荣登华山掌门贺仪' },
          { type: 'addSectContribution', amount: 300 },
          { type: 'giveCombatExp', amount: 480, reason: '紫霞神功大成阵斩拓跋雄继任掌门' },
          { type: 'modifyChivalry', delta: 35, reason: '焚毁西夏风陵军械，护佑关中百万生灵' },
          { type: 'modifyRenown', delta: 85, reason: '十里紫气斩拓跋雄，荣登西岳华山派掌门' },
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0118' }, delta: 25 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0202' }, delta: 25 },
          { type: 'completeQuest', questId: HUASHAN_Q19_QUEST_ID, outcome: 'zixia_master' },
          toast('恭喜荣登 Lv.5【华山派掌门】！终章《西岳绝顶 · 华山论剑》现已开启！', 'success', '太岳正主'),
        ],
      },
    ],
  },
}
