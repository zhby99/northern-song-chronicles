import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q30_QUEST_ID } from './zhongnanHarmonyUniteQuest'

const SPEAKER_YIPIN_ASSASSIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '一品堂暗影统领 · 完颜枯骨',
  title: '西夏一品堂死士首领',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildYipinAssassinBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ30_YIPIN_ASSASSIN',
    name: '一品堂暗影统领 · 完颜枯骨',
    title: '西夏一品堂死士首领',
    realm: '一流上品',
    factionName: '西夏一品堂',
    sectRank: 0,
    sectRankLabel: '暗影死士',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“嘿嘿！王重楼与林朝瑶两个老怪物正在运功疗伤，此刻正是取他们项上人头的天赐良机！挡路小辈，纳命来！”',
    stats: { hp: 3850, mp: 3500, agi: 77, res: 66 },
    talents: { bone: 78, comprehension: 72, charm: 34 },
    equippedArts: { neigong: 'MA-081', move1: 'MA-055', move2: 'MA-065' },
    learnedArts: [{ artId: 'MA-081', level: 8 }, { artId: 'MA-055', level: 8 }, { artId: 'MA-065', level: 8 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq30_01: {
    id: 'scene_znq30_01',
    title: '第一幕 · 暮秋松殿',
    subtitle: '重阳古观 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('{reignYear}暮秋，终南山麓霜重枫寒。重阳玄门清修主殿内，青铜鹤炉升起一缕细长的檀烟，殿外松涛阵阵，却掩不住殿内沉郁凝重的气息。'),
      N('自前番山门风波之后，古观与活死人墓两脉虽暂息刀兵，但二十余年积下的心结如冰封深涧，稍有风吹草动便会再度崩裂。'),
      S('NPC-0133', '（负手立于三清像前，背影清癯孤挺，轻叹一声）“{ifFlag:zn_branch==guguan|你既力主两脉同心|你虽身出古墓，却肯为终南大局奔走}，贫道已知晓你的心意。只是冰冻三尺，非一日之寒呐。”'),
    ],
    onFinishEffects: [openScene('scene_znq30_02', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_02: {
    id: 'scene_znq30_02',
    title: '第二幕 · 长春直言',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0216', '（丘处玄按剑侍立阶侧，浓眉紧锁）“师父！西夏一品堂与辽国细作屡窥关中，近日山外更传赫连霸先亲率铁鹞营高手南下。若古观与古墓继续各守山头、彼此提防，岂非正中胡虏下怀？”'),
      S('NPC-0133', '（缓缓转身，目光深沉如寒潭）“处玄说得不错。只是当年贫道发誓终生不履活死人墓半步，林师妹亦誓死不肯再见贫道一面。这僵局，岂是口舌所能解开？”'),
      P('（拱手深深一揖，声音沉稳清朗）“真人明鉴。外敌压境是眼下之患，而真人与林前辈体内各自郁结的陈年内伤，才是终南隐宗最大的隐忧。”'),
    ],
    onFinishEffects: [openScene('scene_znq30_03', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_03: {
    id: 'scene_znq30_03',
    title: '第三幕 · 阴阳隐疾',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('话音落下，王重楼眉梢微微一动，袖中枯瘦的右手不自觉地轻轻一颤。丘处玄脸色骤变，失声唤道：“师父，您的纯阳燥疾难道又……”'),
      S('NPC-0133', '（摆手止住徒儿，唇角浮起一丝苦笑）“瞒不过你这{gender:聪明小子|玲珑丫头}。当年贫道抗辽受创，又强行闭关参悟先天一炁，体内阳亢过甚；而林师妹常年卧于昆仑寒玉床，极阴之寒亦已入腑。”'),
      P('“纯阳过刚则折，极阴过寒则凝。唯有阴阳相济、彼此导气归元，方能根除两位前辈二十载沉疴。晚辈斗胆，愿作渡桥之人！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_04', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_04: {
    id: 'scene_znq30_04',
    title: '第四幕 · 紫阳旧笺',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('殿内陷入长久的寂静，唯有廊下铜铃在秋风中叮咚作响。良久，王重楼走到案前，提笔蘸墨，在素白宣纸上只写了八个瘦硬清绝的行草小字——'),
      N('“山河犹在，寒涧琴鸣。”落款未署道号，只按了一枚早已褪色的旧日青玉私印。'),
      S('NPC-0133', '（将素笺折好递予你，眼中闪过一丝罕见的柔和与沧桑）“此笺你携去活死人墓。若林师妹见字肯出石室，三更时分，贫道便在寒玉涧临水抚琴榭候她。”'),
    ],
    onFinishEffects: [openScene('scene_znq30_05', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_05: {
    id: 'scene_znq30_05',
    title: '第五幕 · 叩殿领命',
    subtitle: '重阳古观 · 紫阳托笺',
    illustrationUrl: '/assets/quests/zn_q30_tao_plea.jpg',
    illustrationCaption: '重阳玄门清修主殿 · 王重楼亲书八字旧笺托付使者，放下二十载执念求道墓同心',
    mandatory: true,
    beats: [
      P('（双手郑重接过旧笺纳入怀中）“晚辈定不负真人所托！必亲手将此笺呈至林前辈案前。”'),
      S('NPC-0216', '（抱拳相送）“{gender:师弟|师妹}此行任重道远！活死人墓素来戒备森严，若冷清秋师妹有所阻拦，切记以诚相告。我即刻率师兄弟暗中巡察后山路径，以防宵小窥伺！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_06', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_06: {
    id: 'scene_znq30_06',
    title: '第六幕 · 踏雾赴墓',
    subtitle: '重阳古观山道',
    mandatory: true,
    beats: [
      N('你辞别王重楼与丘处玄，踏着满地枯黄松针穿林南下。终南后山雾气渐浓，远方幽谷深处那座终年不见天日的石墓，正静静蛰伏在苍翠古藤之后。'),
    ],
    choices: [
      {
        id: 'znq30_accept',
        label: '携紫阳旧笺前往活死人墓，叩见林朝瑶',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q30_QUEST_ID, stepId: 'visit_tomb_jadebed' },
          setStep(ZHONGNAN_Q30_QUEST_ID, 'visit_tomb_jadebed'),
          toast('已接取《寒涧同心 · 剑道合流》！请前往【昆仑寒玉床冰魄石室】呈递旧笺。', 'talk', '寒涧同心'),
        ],
      },
    ],
  },

  scene_znq30_07: {
    id: 'scene_znq30_07',
    title: '第七幕 · 幽谷白衣',
    subtitle: '活死人墓 · 昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('推开沉重的青石甬门，一股沁骨的清寒扑面而来。石室穹顶嵌着数颗微光莹莹的夜明珠，映照出中央那张白雾缭绕的昆仑寒玉床。'),
      S('NPC-0173', '（冷清秋白衣胜雪，横剑拦于石门之内，神色清冷）“{ifFlag:zn_branch==guguan|重阳古观的人，竟敢独自踏入冰魄石室？|你不是才从前山道院回来么？}师父正在运功驱寒，闲杂人等不得惊扰。”'),
      P('（不卑不亢，双手奉上那封素白折笺）“冷师姐息怒。晚辈此来并非寻衅，而是奉紫阳真人亲笔旧笺，求见林前辈一面——事关终南两脉存亡与林前辈寒疾！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_08', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_08: {
    id: 'scene_znq30_08',
    title: '第八幕 · 寒玉惊澜',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '（寒玉床帷幔轻动，一道清越如碎玉却带着隐隐寒意的声音传出）“清秋，退下吧。让他进来。”'),
      N('冷清秋微怔，旋即收剑退立一旁。你步入石室，只见林朝瑶素衣端坐寒玉之上，虽容颜依旧清丽绝伦，两鬓却已染霜，指尖隐隐透着一抹不寻常的青白寒气。'),
      S('NPC-0114', '（接过素笺缓缓展开，目光落在那八个行草小字与褪色玉印上，指尖微不可察地一颤）“山河犹在，寒涧琴鸣……他倒还记得那年秋夜。”'),
    ],
    onFinishEffects: [openScene('scene_znq30_09', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_09: {
    id: 'scene_znq30_09',
    title: '第九幕 · 尘封旧梦',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '（垂眸凝视旧笺，声音低沉而寂寥）“当年他心怀天下家国，宁舍儿女情长也要立观抗辽；我赌气创下玉女心经，誓要处处压过重阳剑法一头。这一争，便是二十余载光阴……”'),
      S('NPC-0173', '（眼中含忧，轻声道）“师父，您的寒毒每逢秋深便愈发凶险。方才听闻王重楼亦为纯阳燥疾所苦，若真是天意……”'),
      P('（诚恳进言）“林前辈，昔年之争本非死仇，不过是各执一念。如今西夏一品堂与辽国高手环伺终南，若前辈与真人肯摒弃前嫌、于寒玉涧合功疗伤，非但能解二十年寒燥沉疴，更能令终南两脉铁板一块，叫天下宵小不敢轻犯！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_10', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_10: {
    id: 'scene_znq30_10',
    title: '第十幕 · 拂弦应约',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('石室内一时静谧无声，唯有洞顶水滴落入暗渠的清脆滴答声。良久，林朝瑶轻轻合上素笺，唇边竟绽出一抹如冰雪初融般的浅笑。'),
      S('NPC-0114', '“也罢。他一个执拗半生的老道士都肯先低头递笺，我林朝瑶若再闭门不出，倒显得活死人墓气量狭小了。”'),
      S('NPC-0114', '（起身拂袖，衣袂飘然）“清秋，取我那张焦尾古琴来。三更月升之时，我们去寒玉涧会一会那位紫阳真人。”'),
    ],
    onFinishEffects: [openScene('scene_znq30_11', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_11: {
    id: 'scene_znq30_11',
    title: '第十一幕 · 冰心初融',
    subtitle: '活死人墓 · 寒玉出关',
    illustrationUrl: '/assets/quests/zn_q30_tomb_jadebed.jpg',
    illustrationCaption: '昆仑寒玉床冰魄石室 · 林朝瑶展读紫阳旧笺，冰封二十载的眉宇终见春融',
    mandatory: true,
    beats: [
      S('NPC-0173', '（向你深深一福，清冷眉眼间难得泛起笑意）“多谢{gender:少侠|女侠}奔走斡旋。师父多年来第一次肯主动踏出幽谷，今夜寒玉涧若有任何风吹草动，清秋必与你并肩死守！”'),
      P('“事不宜迟，我先行一步前往寒玉涧临水抚琴榭查探四周，绝不让半个外人惊扰二位前辈疗伤！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_12', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_12: {
    id: 'scene_znq30_12',
    title: '第十二幕 · 夜赴寒涧',
    subtitle: '终南后山幽径',
    mandatory: true,
    beats: [
      N('暮色四合，一轮明月爬上终南山脊。你施展轻功掠过千重翠竹，直奔后山寒玉涧临水抚琴榭。'),
    ],
    choices: [
      {
        id: 'znq30_go_qin',
        label: '星夜驰赴【寒玉涧临水抚琴榭】，布防护持王林重逢',
        tone: 'jade',
        effects: [
          setStep(ZHONGNAN_Q30_QUEST_ID, 'guard_qin_healing'),
          toast('请前往【寒玉涧临水抚琴榭（zn_st_qin）】护持王重楼与林朝瑶共疗内伤！', 'talk', '护法疗伤'),
        ],
      },
    ],
  },

  scene_znq30_13: {
    id: 'scene_znq30_13',
    title: '第十三幕 · 临水重逢',
    subtitle: '终南后山寒玉涧 · 寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('三更时分，寒玉涧水汽氤氲，月光如银练倾泻在临水抚琴榭的青石栏干上。王重楼早已负手立于榭中，清瘦的道袍在夜风中猎猎轻扬。'),
      N('随着一阵环佩轻响，林朝瑶携冷清秋踏月而来。隔着二十余年的风霜岁月，一袭青袍道人与一位白衣仙子终于再度四目相对。'),
      S('NPC-0133', '（良久，轻声一叹）“朝瑶……你的鬓发，竟也白了。”'),
      S('NPC-0114', '（别过脸轻哼一声，眼眶却微红）“你不也成了个满脸风霜的倔老道？废话少说，先调息疗伤要紧。”'),
    ],
    onFinishEffects: [openScene('scene_znq30_14', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_14: {
    id: 'scene_znq30_14',
    title: '第十四幕 · 琴箫导气',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('二人相对盘膝坐于临水石坪。林朝瑶素手轻抚焦尾古琴，铮然一响，清越寒音荡开水面；王重楼袖中取出一支青玉洞箫，随声应和，醇厚道音如暖阳融雪。'),
      N('琴箫合鸣之际，一缕纯阳暖气与一道寒玉清气自二人掌心缓缓交汇，盘旋如太极两仪！你与丘处玄、冷清秋分守水榭三面要冲，凝神戒备。'),
      S('NPC-0216', '（压低声音，剑已半出鞘）“不对劲！西侧松林里的夜枭全惊飞了——有高手潜进山涧了！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_15', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_15: {
    id: 'scene_znq30_15',
    title: '第十五幕 · 暗影突袭',
    subtitle: '寒玉涧临水抚琴榭 · 廊桥',
    mandatory: true,
    beats: [
      N('话音未落，七八道黑影如鬼魅般自崖壁垂索扑落，毒蒺藜与淬毒弯刀雨点般直取水榭中央正在运功紧要关头的王、林二人！'),
      S(SPEAKER_YIPIN_ASSASSIN, '（一身玄铁软甲，手持锯齿鬼头刀，阴恻恻大笑）“哈哈哈哈！线报果然不假！王重楼与林朝瑶正在合功疗伤、动弹不得！众死士听令，今夜血洗寒玉涧，取两大宗师首级回兴庆府请功！”'),
      S('NPC-0173', '（玉蜂针如银雨撒出，瞬间逼退左侧四名死士）“丘师兄，你我拦住杂兵！那领头的贼酋交予{gender:少侠|女侠}，绝不可让半缕劲风波及水榭！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_16', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_16: {
    id: 'scene_znq30_16',
    title: '第十六幕 · 独挡贼酋',
    subtitle: '寒玉涧临水抚琴榭 · 临水石桥',
    mandatory: true,
    beats: [
      P('（纵身跃上廊桥正中，剑锋直指完颜枯骨，真气沛然贯注）“西夏鼠辈，也敢趁人之危闯我终南禁地！今日便叫你有来无回！”'),
      S(SPEAKER_YIPIN_ASSASSIN, '（目露凶光，鬼头刀卷起滚滚黑风）“狂妄小辈，看刀！”'),
    ],
    choices: [
      {
        id: 'znq30_fight_assassin',
        label: '拔剑迎战【一品堂暗影统领 · 完颜枯骨】，死守抚琴榭！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q30_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYipinAssassinBoss() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '王重楼与林朝瑶正在水榭合功疗伤，此战绝不可退！',
            introText: '夜月寒涧之上，你横剑独挡西夏一品堂暗影统领完颜枯骨！',
            onWin: [openScene('scene_znq30_17', ZHONGNAN_Q30_QUEST_ID)],
            onLose: [
              toast('你受创退回桥头，幸得丘处玄与冷清秋拼死挡住缺口，速调息再战！', 'warn', '护法受挫'),
            ],
            onDraw: [
              toast('双方激斗难分高下，完颜枯骨伺机再扑，请速整顿再战！', 'warn', '激斗胶着'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq30_17: {
    id: 'scene_znq30_17',
    title: '第十七幕 · 阴阳大成',
    subtitle: '寒玉涧临水抚琴榭 · 月下合功',
    illustrationUrl: '/assets/quests/zn_q30_qin_heal.jpg',
    illustrationCaption: '寒玉涧临水抚琴榭 · 王重楼与林朝瑶阴阳调和共愈沉疴，剑气冲霄震散残敌',
    mandatory: true,
    beats: [
      N('你一剑震飞完颜枯骨手中鬼头刀，凌厉掌风将其震落寒潭，余党见首领伏诛，顿作鸟兽散，尽数被丘处玄与冷清秋肃清于林间！'),
      N('便在此时，抚琴榭中琴箫之音陡然拔高，清越穿云！一道紫气与一道寒芒自王重楼与林朝瑶周身交融升腾，化作漫天莹润光雨，将水榭四周的霜露尽数化作春风！'),
      S('NPC-0133', '（缓缓收掌吐出一口浊气，双目精光湛然，二十载纯阳燥疾竟一朝尽去）“好一番阴阳既济！朝瑶，你体内的寒玉沉毒也化开七八分了！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_18', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_18: {
    id: 'scene_znq30_18',
    title: '第十八幕 · 冰雪消融',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      S('NPC-0114', '（轻按胸口，只觉经脉间温润畅达，多年未曾有过的暖意流遍四肢百骸，望向你的目光满是欣慰）“好孩子，今夜若非你奔走斡旋、舍命护法，我与他怕是至死都要困在各自的心牢里。”'),
      S('NPC-0133', '（抚须朗笑，意气风发更胜往昔）“不错！老道活了这大半辈子，竟不如一个年轻晚辈看得通透！处玄、清秋，你们都过来！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_19', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_19: {
    id: 'scene_znq30_19',
    title: '第十九幕 · 同心立约',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('月影西斜，晨曦微露。丘处玄与冷清秋并肩走上水榭，各自代表重阳古观与活死人墓向两位宗师稽首见礼。'),
      S('NPC-0133', '“自今日起，重阳古观与活死人墓尽释前嫌！山前道院与山后幽谷互通有无，共御外侮，两脉绝学亦不再彼此藏私！”'),
    ],
    choices: [
      {
        id: 'znq30_to_accord',
        label: '恭贺两位宗师冰释前嫌，聆听两脉合流传功之训',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q30_QUEST_ID, 'dual_arts_accord'),
          toast('王重楼与林朝瑶已冰释合流！请于【寒玉涧临水抚琴榭】承接另一脉绝学！', 'success', '冰释合流'),
        ],
      },
    ],
  },

  scene_znq30_20: {
    id: 'scene_znq30_20',
    title: '第二十幕 · 破壁传功',
    subtitle: '寒玉涧临水抚琴榭 · 晨曦石坪',
    mandatory: true,
    beats: [
      N('朝阳初升，金光穿透终南云海，将寒玉涧映照得宛如仙境。王重楼与林朝瑶并肩立于水榭青石之上，气度雍容绝世。'),
      S('NPC-0114', '“{ifFlag:zn_branch==guguan|你虽拜入重阳古观，却怀宽厚仁心、兼济两脉。我活死人墓镇派心法《玉女心经》，今日便破例传你，以济纯阳之刚！|你身出活死人墓，深得寒玉精髓。王老道既已放下执念，他那两门重阳玄门绝学，今日也该一并授你，令你阴阳兼修！}”'),
    ],
    onFinishEffects: [openScene('scene_znq30_21', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_21: {
    id: 'scene_znq30_21',
    title: '第二十一幕 · 阴阳相济',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      S('NPC-0133', '（朗声念诵口诀，指尖虚划太极道纹）“一阴一阳之谓道！纯阳不孤，玉女不寒。你须细细体悟两脉真气流转之道，他日登临天阶绝顶，方能窥见终南武学的至高化境！”'),
      P('（肃然跪拜受教，将字字心法铭刻肺腑）“弟子谨记两位宗师大恩！必不负道墓同心之望！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_22', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_22: {
    id: 'scene_znq30_22',
    title: '第二十二幕 · 剑意初融',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('你盘膝运功，只觉原本单一精纯的真气之中，渐渐生出一股圆融流转的太极气象——刚中有柔，柔中藏刚，寒涧水声与松林清风仿佛尽数融入吐纳之间。'),
      S('NPC-0216', '（抚掌赞叹）“妙极！古观与古墓二十年未有之气象，今日竟在{gender:师弟|师妹}身上合而为一！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_23', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_23: {
    id: 'scene_znq30_23',
    title: '第二十三幕 · 剑道合流',
    subtitle: '终南后山寒玉涧 · 道墓同心',
    illustrationUrl: '/assets/quests/zn_q30_dual_arts.jpg',
    illustrationCaption: '寒玉涧晨曦 · 王重楼与林朝瑶联手传功，重阳纯阳气与古墓寒玉意合流太极',
    mandatory: true,
    beats: [
      S('NPC-0173', '（微笑递来一盏清泉玉茗）“自此之后，古观与古墓便是一家人了。只是西夏一品堂既敢夜袭寒玉涧，想必更大的风浪还在后头。”'),
      S('NPC-0133', '（神色转肃，遥望西北边关）“不错。赫连霸先与段延庆绝不会善罢甘休。但只要终南两脉同心，任他塞北铁骑如云，又能奈我何！”'),
    ],
    onFinishEffects: [openScene('scene_znq30_24', ZHONGNAN_Q30_QUEST_ID)],
  },

  scene_znq30_24: {
    id: 'scene_znq30_24',
    title: '第二十四幕 · 同心纪元',
    subtitle: '终南后山寒玉涧 · 结案',
    mandatory: true,
    beats: [
      N('道墓冰释，剑道合流！终南隐宗二十余载隔阂一朝消弭，你将携两脉兼修之绝学，迎接即将席卷关中的风云大局！'),
    ],
    choices: [
      {
        id: 'znq30_complete',
        label: '拜谢王重楼与林朝瑶，承接两脉合流绝学（完成任务）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'zn_cross', value: 'harmony' },
          {
            type: 'branch',
            condition: flag('zn_branch', 'eq', 'guguan'),
            thenEffects: [
              { type: 'teachMartialArt', artId: 'MA-039', level: 1 },
              toast('林朝瑶破例亲授古墓镇派内功【玉女心经】！', 'success', '剑道合流'),
            ],
            elseEffects: [
              { type: 'teachMartialArt', artId: 'MA-078', level: 1 },
              { type: 'teachMartialArt', artId: 'MA-089', level: 1 },
              toast('王重楼破例亲授重阳玄门绝学【纯阳无极功】与【希夷剑法】！', 'success', '剑道合流'),
            ],
          },
          { type: 'giveCombatExp', amount: 900, reason: '促成终南道墓冰释合流并斩退一品堂夜袭死士' },
          { type: 'modifyRenown', delta: 120, reason: '终南两脉剑道合流，美名传遍关中武林' },
          { type: 'modifyChivalry', delta: 60, reason: '舍身护持两大宗师疗伤，义薄云天' },
          { type: 'modifySkill', key: '琴', delta: 2 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 25 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 25 },
          { type: 'completeQuest', questId: ZHONGNAN_Q30_QUEST_ID, outcome: 'completed' },
          toast('已完成《寒涧同心 · 剑道合流》！终南两脉正式步入合流之路！', 'success', '寒涧同心'),
        ],
      },
    ],
  },
}
