import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, flag, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q14_QUEST_ID } from './huashanCaveHarmonyQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq14_01: {
    id: 'scene_hsq14_01',
    title: '第一幕 · 铭记太岳初誓',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      N('{reignYear}雨歇云散，一缕清冷晨光顺着思过崖石室顶部的岩隙洒落在满地枯骨之上。你手握三尺青锋立于石壁前，耳畔仿佛又回响起当日拜入山门时在祖师牌位前的誓言。'),
      P('“剑为气之锋，气为剑之帅，剑气本出一源……先辈们因一念执障闭洞自相残杀，我岂能再让这些充满怨毒的弑亲剑痕遗祸后人！”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_02', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_02: {
    id: 'scene_hsq14_02',
    title: '第二幕 · 挥剑如雪削魔刻',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    illustrationUrl: '/assets/quests/hs_q14_shave_cliff.jpg',
    illustrationCaption: '挥剑削魔 · 剑光如雪削平石壁阴毒破招图谱，收敛先辈遗骸立冢',
    mandatory: true,
    beats: [
      N('你深提丹田真气，施展堂皇浩大的《太岳三青峰》沿壁横削！剑光如暴雪卷过青苍岩壁，火星四溅、石屑纷飞！'),
      N('无论是克制气宗紫霞混元的阴损指戳，还是锁拿剑宗三仙三青峰的毒辣反刺，在整整两个时辰的金铁交鸣中，被你一剑接一剑尽数削作平整光滑的素壁！'),
    ],
    onFinishEffects: [openScene('scene_hsq14_03', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_03: {
    id: 'scene_hsq14_03',
    title: '第三幕 · 涤剑敛骨筑青冢',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      N('石屑落定后，你放下长剑，以绝壁寒潭清水洗净双手，将散落洞中的十四具华山前辈骸骨不分气宗剑宗，一具具恭敬收敛整齐，合葬于石室正中的青石剑冢之下。'),
      N('你又收集洞中折断的十四柄遗剑，在冢前排列成一座剑屏，并在光滑如镜的石壁正中端正刻下八个大字：「剑气同源，止戈万世」。'),
    ],
    onFinishEffects: [openScene('scene_hsq14_04', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_04: {
    id: 'scene_hsq14_04',
    title: '第四幕 · 三拜先辈涤旧冤',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      P('（向着新筑的青石剑冢深深三拜）“诸位太师叔、太师伯，三十载幽暗孤寒今日终得入土为安。昔年门户恩怨，便随这满地石粉一并散入西岳清风吧！”'),
      N('拜罢起身，石室中那股盘桓三十年的森冷怨气恍若一扫而空，唯有山泉叮咚回荡。'),
    ],
    onFinishEffects: [openScene('scene_hsq14_05', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_05: {
    id: 'scene_hsq14_05',
    title: '第五幕 · 欲解心结须请尊长',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('走出石室，你将斩断的玄铁重锁拾起收入包裹。回望云雾缭绕的玉女峰与落雁峰，你心中已然有了计较。'),
      P('“西夏一品堂既已盯上思过崖旧怨，唯有请岳掌门、秦师伯、宁师叔与封师叔四位尊长亲眼见一见这座同门合葬冢，方能彻底拔除我华山内部最后一道裂痕！”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_06', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_06: {
    id: 'scene_hsq14_06',
    title: '第六幕 · 携锁下崖赴紫霞',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('你整理衣冠，背负长剑与那把被西夏弯刀劈断的玄铁古锁，快步下崖奔赴玉女峰紫霞道观。'),
    ],
    choices: [
      {
        id: 'hsq14_c06_go_hall',
        label: '前往玉女峰紫霞正气主殿，面见岳沧溟禀明真相',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q14_QUEST_ID, stepId: 'q14_invite_elders' },
          toast('已开启《石室止戈 · 剑气同源》！请赴【紫霞正气主殿】恭请四老！', 'talk', '石室止戈'),
        ],
      },
    ],
  },

  scene_hsq14_07: {
    id: 'scene_hsq14_07',
    title: '第七幕 · 呈断锁惊动紫霞殿',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('紫霞正气主殿内，掌门岳沧溟与师妹宁清羽正在商议关中防务。见你双手呈上那截布满幽蓝刀痕的断锁，二人脸色同时大变！'),
      S('NPC-0118', '“这是思过崖后洞的玄铁重锁！昨夜雷暴，果真有西夏一品堂高手闯入了后洞？！”'),
      P('“回禀掌门、宁师叔：昨夜西夏玄枢密谍嵬名暗枭劈锁潜入，企图盗拓石室壁上的同门破招图谱。弟子追入洞中将其格杀，所拓羊皮卷已付之一炬！”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_08', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_08: {
    id: 'scene_hsq14_08',
    title: '第八幕 · 坦陈削壁葬骨之举',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('宁清羽松了一口气，旋即神色复杂地望向你：“那洞中四壁的破招剑刻……你也全都看见了？”'),
      P('“弟子看见了，亦自作主张用手中长剑将四壁魔刻一字不留尽数削平，并为洞中十四位气剑两脉前辈合筑青石剑冢。弟子擅毁遗刻，甘受掌门责罚！”'),
      S('NPC-0118', '（怔立良久，虎目之中竟泛起一层湿润晶光，颤声道）“你说什么……你没有私记半分克制同门的杀招，反而一剑将其尽数削平了？”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_09', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_09: {
    id: 'scene_hsq14_09',
    title: '第九幕 · 玉女动容叹后生',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0166', '（眼圈微红，温言赞叹）“掌门师兄，当年我们师兄妹四人因目睹后洞惨状，心有余悸，只敢以巨石铁锁掩耳盗铃一封三十年，反倒不如一个晚辈胸怀坦荡、敢断病根！”'),
      S('NPC-0118', '“师妹说得是！老夫惭愧啊……三十年来不敢开洞为诸位师叔伯收尸，是我们做晚辈的不孝！”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_10', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_10: {
    id: 'scene_hsq14_10',
    title: '第十幕 · 飞鸽传讯邀双宿',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      P('“掌门、宁师叔，外虏当前，我华山再无气剑内耗之理。弟子斗胆恳请掌门传书落雁峰秦师伯与长安封师叔，四位长辈同登思过崖祭拜先辈，令两宗弟子共鉴同心！”'),
      S('NPC-0118', '“好！封师弟昨夜恰巧自长安返山巡查西麓，老夫这便亲笔修书，请秦师兄与封师弟午时齐聚思过崖！”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_11', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_11: {
    id: 'scene_hsq14_11',
    title: '第十一幕 · 备齐香烛返思过',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('宁清羽亲自备好清香、素酒与黄纸祭文交予你手中。你先行一步赶回思过崖古山洞，洒扫石室静候四位宿老驾临。'),
    ],
    choices: [
      {
        id: 'hsq14_c11_back_cave',
        label: '捧香烛清酒重返秘洞古剑刻石室，恭迎四老',
        tone: 'jade',
        effects: [
          setStep(HUASHAN_Q14_QUEST_ID, 'q14_cave_mourn_teach'),
          toast('四位宿老即将齐聚！请返回【思过崖古山洞 · 秘洞古剑刻石室】主持祭礼！', 'talk', '四老齐聚'),
        ],
      },
    ],
  },

  scene_hsq14_12: {
    id: 'scene_hsq14_12',
    title: '第十二幕 · 三十载重踏伤心地',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      N('正午时分，石室之外脚步声响起。岳沧溟、秦烈山、宁清羽与冷着脸的封不弃并肩步入洞中——这是三十年前惨变之后，华山当代四大高手首度同聚此室！'),
      S('NPC-0167', '（起初目光戒备地扫向四壁，待看清四面已被削得平滑如砥的岩壁与正中那座庄严青石剑冢时，整个人如遭雷击般僵在原地）“壁上的破招……全没了？这十四柄遗剑……”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_13', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_13: {
    id: 'scene_hsq14_13',
    title: '第十三幕 · 四老抚冢泣拜先人',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    illustrationUrl: '/assets/quests/hs_q14_four_elders_mourn.jpg',
    illustrationCaption: '四老泣拜 · 岳沧溟秦烈山宁清羽封不弃共入石室祭奠，三十载坚冰初融',
    mandatory: true,
    beats: [
      N('封不弃快步走到剑屏最右侧，手指颤抖地抚过一柄剑格崩缺的旧剑——那是他早年授业恩师的佩剑。向来桀骜冷酷的「狂风快剑」，此刻竟老泪纵横！'),
      N('岳沧溟执壶奠酒，秦烈山、宁清羽、封不弃四人齐齐整衣跪倒在青石剑冢之前，恭恭敬敬叩首三拜。压在华山派心头整整三十年的血色阴霾，在这一拜之中轰然冰消雪融！'),
    ],
    onFinishEffects: [openScene('scene_hsq14_14', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_14: {
    id: 'scene_hsq14_14',
    title: '第十四幕 · 狂风长叹释前嫌',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      S('NPC-0167', '（抬袖拭去眼角泪痕，仰望石壁上『剑气同源，止戈万世』八字，长长吐出一口郁结半生的闷气）“斗了一辈子气宗剑宗……到头来先师骸骨无人收，反叫西夏番狗差点捡去灭我满门！岳师兄，这三十年，是我封不弃钻了牛角尖！”'),
      S('NPC-0118', '（上前一步紧紧握住封不弃手腕）“封师弟言重了！昔年之错在门户私见，今日起我华山只有同气连枝的师兄弟，再无同室操戈的两宗仇雠！”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_15', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_15: {
    id: 'scene_hsq14_15',
    title: '第十五幕 · 秦宁联议破藩篱',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      S('NPC-0147', '（朗声震袖）“既言『剑气同源』，便不能只停在口头上！这孩子以大仁大勇替我华山斩断心魔，今日我们四个老家伙，便在他身上开个三十年未有之先例！”'),
      S('NPC-0166', '（微笑颔首）“秦师兄所言极是！若他是剑宗弟子，我便传他气宗筑鼎上乘内功《混元功》以厚其根基；若他是气宗弟子，便请秦师兄将《太岳剑髓》杀伐真谛倾囊相授！”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_16', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_16: {
    id: 'scene_hsq14_16',
    title: '第十六幕 · 寒风坪前验同源',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('四老携你步出石室，来到云海翻腾的寒风剑坪。秦烈山拔剑在手，宁清羽凝气于掌，示意你出招印证所学，好因材施教打通气剑关节！'),
      P('“得四位师长厚爱，弟子定全力以赴，请秦师伯指点！”'),
    ],
    choices: [
      {
        id: 'hsq14_c16_spar_qin',
        label: '在四老见证下演剑印证，与秦烈山切磋拆招！',
        tone: 'jade',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q14_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0147',
              talkOverride: '“放开手脚使出三青峰，让师伯与宁师妹看看你的气剑交融之度！”',
            },
            rule: 'survive_rounds',
            maxRounds: 10,
            forbidEscapeReason: '尊长当面考校喂招，自当全力印证剑道！',
            introText: '【同源印证】在寒风剑坪与秦烈山（一流上品）切磋印证十合（或胜出），体悟气剑互补之妙！',
            onWin: [openScene('scene_hsq14_17', HUASHAN_Q14_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_hsq14_17', HUASHAN_Q14_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq14_17: {
    id: 'scene_hsq14_17',
    title: '第十七幕 · 打破门户交叉授艺',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    illustrationUrl: '/assets/quests/hs_q14_cross_lineage_teach.jpg',
    illustrationCaption: '剑气同源 · 宁清羽与秦烈山打破门户藩篱，于思过崖交叉授艺',
    mandatory: true,
    beats: [
      N('十合拆解毕，宁清羽与秦烈山对视一眼，双双走上前为你疏导周天经脉与手太阴剑诀！'),
      N('宁清羽以温润绵长的混元内劲引你体会「由外而内、掌剑互生」之妙；秦烈山则以凌厉无匹的剑指点拨你「一点寒芒破万法、太岳剑髓贯长虹」的凝锋法门！'),
      P('（只觉往日滞涩之处豁然贯通，真气与剑芒交相辉映）“原来气盛则剑愈疾，剑利则气愈凝——前人强分轩轾，当真误尽苍生！”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_18', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_18: {
    id: 'scene_hsq14_18',
    title: '第十八幕 · 西岳重铸新铁门',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      S('NPC-0118', '“今日之后，思过崖石室不再是讳莫如深的耻辱禁地，而是我华山历代英烈祠堂！凡真传以上弟子皆可入内凭吊，铭记同室操戈之戒！”'),
      S('NPC-0167', '“至于西夏一品堂敢打我华山的主意……哼，我封不弃明日便回京兆府盯死西市番坊，查出他们幕后主使，定教番贼有来无回！”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_19', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_19: {
    id: 'scene_hsq14_19',
    title: '第十九幕 · 四老期许托重任',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      S('NPC-0166', '“封师兄孤身在长安查探，切莫轻敌冒进，若有异动即刻传讯回山。”'),
      S('NPC-0147', '“好孩子，你今日兼得两脉真意，勤加修习。山雨欲来，不久之后只怕便有硬仗要打！”'),
    ],
    onFinishEffects: [openScene('scene_hsq14_20', HUASHAN_Q14_QUEST_ID)],
  },

  scene_hsq14_20: {
    id: 'scene_hsq14_20',
    title: '第二十幕 · 剑气同源耀太岳',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('暮色苍山，四位宿老欣然下崖而去。你独立思过崖畔，听松涛阵阵、剑鸣清越，胸中浩然正气与凌厉剑意已臻前所未有之圆满。'),
    ],
    choices: [
      {
        id: 'hsq14_c20_complete',
        label: '叩谢四老授艺大恩，融会贯通气剑两脉绝学',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'hs_cave', value: 'harmony' },
          {
            type: 'branch',
            condition: flag('hs_branch', 'eq', 'jian'),
            thenEffects: [
              { type: 'teachMartialArt', artId: 'MA-058', level: 1, autoEquip: true },
              { type: 'addArtExp', artId: 'MA-058', amount: 300 },
              toast('宁清羽破格传授气宗地阶中品绝学《混元功》！气剑自此同源并济！', 'success', '跨宗授艺'),
            ],
            elseEffects: [
              { type: 'setFlag', flag: 'hs_taiyue_sword_essence', value: true },
              { type: 'addArtExp', artId: 'MA-049', amount: 360 },
              toast('秦烈山亲授剑宗杀伐真谛，领悟永久被动【太岳剑髓】（剑法伤害+12%）！', 'success', '跨宗授艺'),
            ],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0118' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0147' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0166' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0167' }, delta: 20 },
          { type: 'giveSilver', amount: 180, reason: '思过崖护秘与化消两宗宿怨嘉奖' },
          { type: 'addSectContribution', amount: 130 },
          { type: 'giveCombatExp', amount: 260, reason: '四老同源指点与寒风剑坪印证' },
          { type: 'modifyChivalry', delta: 25, reason: '削壁止戈安葬先辈，促成华山气剑和解' },
          { type: 'modifyRenown', delta: 30, reason: '西岳思过崖化干戈为玉帛传为美谈' },
          { type: 'completeQuest', questId: HUASHAN_Q14_QUEST_ID, outcome: 'harmony' },
        ],
      },
    ],
  },
}
