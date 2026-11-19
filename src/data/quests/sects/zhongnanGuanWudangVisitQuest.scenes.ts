import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q10_QUEST_ID } from './zhongnanGuanWudangVisitQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq10_01: {
    id: 'scene_znq10_01',
    title: '第一幕 · 丹炉寒雾',
    subtitle: '终南山隐宗 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，终南山巅霜叶尽赤。你步入重阳玄门清修主殿，却见案前檀香微凝，紫阳真人王重楼正凝视一封墨迹未干的素笺，眉宇间罕见地笼着一层忧色。'),
      S('NPC-0133', '“你来得正好。方才丹院报来，长生子刘处静旧伤复发，经脉中盘踞多年的阴煞寒气借秋露之威反扑心脉，寻常九转回阳散已压不住了。”'),
      P('“刘师叔昔年在边关挡过西夏高手的寒毒掌力，弟子记得他一向硬朗，怎会忽然发作？”'),
    ],
    onFinishEffects: [openScene('scene_znq10_02', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_02: {
    id: 'scene_znq10_02',
    title: '第二幕 · 寒毒沉疴',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0133', '“他近月为给新进弟子护法，暗中耗损了三成纯阳真元，才让沉寂五载的寒毒有机可乘。终南虽擅内丹，却缺一味武当太和峰巅采晨露炼成的『紫霄玄丹』作引。”'),
      S('NPC-1056', '（自偏殿扶门而来，唇色略青，却仍强作洒脱一笑）“掌教莫要小题大做，贫道这把老骨头撑得住，何必劳动小辈千里奔波……”'),
      N('话音未落，刘处静肩头忽地一颤，袖口竟渗出几缕肉眼可见的白霜。王重楼反手一指点在他檀中穴上，替他稳住气血。'),
    ],
    onFinishEffects: [openScene('scene_znq10_03', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_03: {
    id: 'scene_znq10_03',
    title: '第三幕 · 紫阳修书',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0133', '“武当太和真人张玄素与贫道乃是三十年道交。我已亲笔修书一封，并附上本门新校的《太乙金华注疏》副本，你携书南下襄阳渡汉水，登太和绝顶求丹，顺道向张真人与张清溪道兄请益南北道脉之异同。”'),
      P('“弟子定当星夜兼程，平安求得紫霄玄丹归山，绝不负掌教与刘师叔重托！”'),
      S('NPC-1056', '（拱手轻叹）“那便有劳{gender:师侄|师侄女}走这一趟了。襄阳江畔近来铁掌帮人马频繁出没，路上切记敛气藏锋。”'),
    ],
    onFinishEffects: [openScene('scene_znq10_04', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_04: {
    id: 'scene_znq10_04',
    title: '第四幕 · 辞山南渡',
    subtitle: '重阳古观山门',
    mandatory: true,
    beats: [
      N('你接过王重楼封好紫泥印信的锦筒，背负长剑辞别终南青松，沿商洛古道一路南行，直奔荆襄要冲襄阳城。'),
    ],
    choices: [
      {
        id: 'znq10_depart_xiangyang',
        label: '携紫阳真人手书南下襄阳，赴汉水大码头寻船入武当',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q10_QUEST_ID, stepId: 'xiangyang_rescue' },
          setStep(ZHONGNAN_Q10_QUEST_ID, 'xiangyang_rescue'),
          toast('已奉命南下！请前往【襄阳 · 汉水大码头】乘船南渡。', 'talk', '武当问真'),
        ],
      },
    ],
  },

  scene_znq10_05: {
    id: 'scene_znq10_05',
    title: '第五幕 · 汉水惊涛',
    subtitle: '襄阳 · 汉水大码头',
    illustrationUrl: '/assets/quests/zn_q10_xiangyang_dock.jpg',
    illustrationCaption: '汉水风波 · 襄阳渡口铁掌少主截击武当道长',
    mandatory: true,
    beats: [
      N('秋风卷起汉水浊浪，襄阳大码头上帆樯林立。你刚踏上青石栈桥，便听得前方传来一阵凄厉金铁交鸣与喝骂之声！'),
      N('只见一名身着月白鹤氅的武当道人背靠货栈石柱，长剑虽舞得滴水不漏，肩头却已染血；围攻他的十余名黑衣汉子掌风炽烈如火，领头那名锦衣少年双掌漆黑似铁，正是铁掌帮少主上官云豹！'),
      S('NPC-0209', '“上官云豹！我武当运送赈济灾民的药材过境，何时犯过你们铁掌帮的规矩？光天化日抢船夺药，不怕天下群雄耻笑么！”'),
    ],
    onFinishEffects: [openScene('scene_znq10_06', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_06: {
    id: 'scene_znq10_06',
    title: '第六幕 · 铁掌跋扈',
    subtitle: '襄阳 · 汉水大码头',
    mandatory: true,
    beats: [
      S('NPC-0222', '（狞笑一声，双掌拍得石柱碎屑纷飞）“莫清谷，少拿仁义道德压本少主！荆襄水路向来是我铁掌帮的地界，你车里那匣紫霄药引本少主看上了，乖乖交出来，饶你一条道命！”'),
      P('“住手！铁掌帮好大的威风，连太和真武道宗的药材也敢强抢！”'),
      N('你足尖一点栈桥栏杆，青衫掠风而落，横剑挡在莫清谷身前。上官云豹斜睨你一眼，冷哼道：“终南古观的牛鼻子也敢管荆襄闲事？正好连你一并打发！”'),
    ],
    onFinishEffects: [openScene('scene_znq10_07', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_07: {
    id: 'scene_znq10_07',
    title: '第七幕 · 剑气合璧',
    subtitle: '襄阳 · 汉水大码头',
    mandatory: true,
    beats: [
      S('NPC-0209', '（稳住气息，剑尖斜指江面）“多谢终南道友拔刀相助！上官云豹的铁掌刚猛霸道，切忌与他硬拼掌力，贫道为你牵制左右，咱们以道家柔剑破他刚锋！”'),
      P('“莫道长放心，你我并肩一战，叫他知晓南北道门同气连枝！”'),
    ],
    choices: [
      {
        id: 'znq10_fight_shangguan',
        label: '与莫清谷并肩迎战铁掌帮少主上官云豹',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q10_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0222' },
            allies: [{ kind: 'npc', npcId: 'NPC-0209' }],
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '莫清谷负伤在侧，此时退走必陷道友于险境！',
            introText: '汉水秋风猎猎，你与武当莫清谷剑光交织，迎战铁掌帮少主上官云豹！',
            onWin: [openScene('scene_znq10_08', ZHONGNAN_Q10_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 50, mpPct: 50 },
              toast('铁掌劲风实在刚猛，你与莫清谷暂退货栈整顿真气，待调息后再战！', 'warn', '武当问真'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq10_08: {
    id: 'scene_znq10_08',
    title: '第八幕 · 击退云豹',
    subtitle: '襄阳 · 汉水大码头',
    mandatory: true,
    beats: [
      N('你以终南剑意化圆卸力，借力打力引偏上官云豹一记开碑裂石的铁掌，剑脊顺势拍中他右腕麻筋！莫清谷同步一招震山剑诀扫开余众。'),
      S('NPC-0222', '（踉跄退上快船，捂腕怒喝）“好个终南小道！今日之辱本少主记下了，咱们铁掌峰上后会有期——撤！”'),
      N('黑衣帮众纷纷跳上快船，摇橹没入苍茫江雾之中。码头商旅无不拍手称快。'),
    ],
    onFinishEffects: [openScene('scene_znq10_09', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_09: {
    id: 'scene_znq10_09',
    title: '第九幕 · 道友相谢',
    subtitle: '襄阳 · 汉水大码头',
    mandatory: true,
    beats: [
      S('NPC-0209', '（收剑稽首，满面诚挚）“方才若非{gender:道兄|道友}仗义出手，贫道险些折在这码头上。敢问尊姓大名，此番南下可是要往武当山去？”'),
      P('“贫道乃终南古观弟子，奉紫阳真人之命，特携法帖赴太和绝顶拜谒张玄素真人，为刘处静师叔求取紫霄玄丹。”'),
      S('NPC-0209', '“原来是紫阳真人的高足！刘长生子前辈侠名远播，贫道正要押药返山，且请同行，由贫道为您引路直登太和金殿！”'),
    ],
    onFinishEffects: [openScene('scene_znq10_10', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_10: {
    id: 'scene_znq10_10',
    title: '第十幕 · 舟渡汉江',
    subtitle: '汉水官渡',
    mandatory: true,
    beats: [
      N('莫清谷备好快舟，渡过烟波浩渺的汉江。遥望西南天际，七十二峰拔地而起，云雾缭绕如仙阙凌空，正是天下道家祖庭武当山。'),
    ],
    choices: [
      {
        id: 'znq10_go_wudang_golden',
        label: '随莫清谷登临【武当山 · 太和绝顶真武金殿】拜见张玄素',
        tone: 'gold',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0209' }, delta: 15 },
          setStep(ZHONGNAN_Q10_QUEST_ID, 'wudang_golden_visit'),
          toast('请前往【武当山 · 太和绝顶真武金殿】拜见太和真人张玄素！', 'talk', '武当问真'),
        ],
      },
    ],
  },

  scene_znq10_11: {
    id: 'scene_znq10_11',
    title: '第十一幕 · 太和云海',
    subtitle: '武当山 · 太和绝顶真武金殿',
    illustrationUrl: '/assets/quests/zn_q10_wudang_golden.jpg',
    illustrationCaption: '太和云海 · 绝顶金殿拜谒太和真人张玄素',
    mandatory: true,
    beats: [
      N('拾级登临天柱峰巅，脚下万顷云海翻涌如雪，日光映照铜铸鎏金大殿，熠熠生辉。太和真人张玄素早已立于殿前青玉台畔，鹤发松姿，目如秋水。'),
      S('NPC-0119', '“无量天尊。方才清谷已先禀报汉水渡口之事。终南山调教出的真传弟子，果然既有斩邪之锐，又有守正之仁。”'),
      P('（双手捧上紫泥锦筒，依道门大礼稽首）“终南弟子拜见太和真人！奉家师王重楼之命，呈上法帖与《太乙金华注疏》，恳请真人赐丹救治刘处静师叔。”'),
    ],
    onFinishEffects: [openScene('scene_znq10_12', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_12: {
    id: 'scene_znq10_12',
    title: '第十二幕 · 展书叙旧',
    subtitle: '太和绝顶真武金殿',
    mandatory: true,
    beats: [
      N('张玄素拆开锦筒，细阅王重楼手书，微微颔首：“重楼道兄昔年与贫道在秦岭论剑，转眼三十载矣。长生子当年抗西夏寒毒落下的病根，确非紫霄玄丹不能拔除。”'),
      S('NPC-0119', '“玄丹本门尚存两粒，救人如救火，贫道自当相赠。不过——既是南北道宗难得一会，贫道倒想考校一番{gender:小友|小道友}的剑意与心境，看终南一脉这些年精进几许。”'),
    ],
    onFinishEffects: [openScene('scene_znq10_13', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_13: {
    id: 'scene_znq10_13',
    title: '第十三幕 · 金殿问剑',
    subtitle: '太和绝顶真武金殿',
    mandatory: true,
    beats: [
      N('张玄素并不动兵刃，只折下一枝殿前苍松枯枝，负手笑立云崖之畔：“贫道只出三成柔劲，你且以终南所学全力拆解，撑过数合便算过关。”'),
      P('“晚辈斗胆，请太和真人指点！”'),
    ],
    choices: [
      {
        id: 'znq10_spar_zhangxuansu',
        label: '执剑请教太和真人张玄素（切磋撑过三合）',
        tone: 'gold',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q10_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0119' },
            rule: 'survive_rounds',
            maxRounds: 3,
            lethalOnLose: false,
            introText: '云海翻腾，太和真人张玄素以枯松代剑，演武当以柔克刚之玄意！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_znq10_14', ZHONGNAN_Q10_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_znq10_14', ZHONGNAN_Q10_QUEST_ID),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_znq10_14', ZHONGNAN_Q10_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_znq10_14: {
    id: 'scene_znq10_14',
    title: '第十四幕 · 云崖印心',
    subtitle: '太和绝顶真武金殿',
    mandatory: true,
    beats: [
      N('三合转瞬即过，松枝划圆如太极初判，你只觉对方劲力似江海绵长、无迹可寻，自身终南剑意与之交融碰撞，竟隐隐悟出几分刚柔相济之理。'),
      S('NPC-0119', '（收枝含笑，眼中满是赞赏）“好！进退有据而不失本真，重楼道兄后继有人矣。紫霄玄丹存于紫霄宫丹房，由我师弟张清溪掌管。”'),
    ],
    onFinishEffects: [openScene('scene_znq10_15', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_15: {
    id: 'scene_znq10_15',
    title: '第十五幕 · 移步紫霄',
    subtitle: '太和绝顶真武金殿',
    mandatory: true,
    beats: [
      S('NPC-0119', '“清溪素来精研丹鼎与南北道藏，你持我玉符往紫霄道宫丹房见他。他既会奉上紫霄玄丹，也必欲与你切磋道经三日，权当武当待客之礼。”'),
      P('“晚辈谨遵真人法旨，这就前往紫霄道宫拜见张清溪道长！”'),
    ],
    choices: [
      {
        id: 'znq10_go_zixiao',
        label: '持玉符前往【武当山 · 紫霄道宫丹房】拜见张清溪',
        tone: 'primary',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0119' }, delta: 15 },
          setStep(ZHONGNAN_Q10_QUEST_ID, 'zixiao_dao_talk'),
          toast('请前往【武当山 · 紫霄道宫丹房】见张清溪求药论道！', 'talk', '武当问真'),
        ],
      },
    ],
  },

  scene_znq10_16: {
    id: 'scene_znq10_16',
    title: '第十六幕 · 紫霄丹房',
    subtitle: '武当山 · 紫霄道宫丹房',
    illustrationUrl: '/assets/quests/zn_q10_zixiao_dao.jpg',
    illustrationCaption: '紫霄论道 · 丹炉松烟间南北道脉印证三日',
    mandatory: true,
    beats: [
      N('步入紫霄道宫东侧丹房，只见青铜八卦炉内文火正温，药香清冽扑鼻。智囊道人张清溪正手执羽扇翻检古卷，见你呈上太和玉符，顿时朗声大笑。'),
      S('NPC-0208', '“早就听闻终南新校了一卷《太乙金华注疏》，今日果真送上门来！快请上座，且饮一盏武当针井清茶。”'),
      P('“张道长过奖了。家师嘱咐，除求取紫霄玄丹救治刘师叔外，还望能向道长请益内丹火候与道藏玄义。”'),
    ],
    onFinishEffects: [openScene('scene_znq10_17', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_17: {
    id: 'scene_znq10_17',
    title: '第十七幕 · 首日辨丹',
    subtitle: '紫霄道宫丹房',
    mandatory: true,
    beats: [
      N('第一日，张清溪开启玉匣，取出一枚龙眼大小、隐有紫霞流转的紫霄玄丹交予你查验，细细讲明服丹时须以纯阳真气导引、切忌寒热骤冲之法。'),
      S('NPC-0208', '“西夏一品堂的寒毒阴损非常，化毒之际最易反噬心脉。你回山后务须在丹院以文火温经，循任督二脉缓缓逼出，不可操之过急。”'),
      P('“弟子字字铭记于心，绝不敢有丝毫疏漏。”'),
    ],
    onFinishEffects: [openScene('scene_znq10_18', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_18: {
    id: 'scene_znq10_18',
    title: '第十八幕 · 次日论剑',
    subtitle: '紫霄道宫丹房',
    mandatory: true,
    beats: [
      N('第二日，二人于松下石案摊开两派剑谱与经卷。张清溪谈起武当借力打力、以静制动之理，你则述说终南天罡北斗、动静相生之妙，彼此印证，竟至忘餐。'),
      S('NPC-0208', '（抚掌叹服）“妙极！终南剑阵重在群星拱北、生生不息，而我武当重在圆融无碍、一气化三清。殊途同归，皆是玄门大道！”'),
    ],
    onFinishEffects: [openScene('scene_znq10_19', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_19: {
    id: 'scene_znq10_19',
    title: '第十九幕 · 三日抚琴',
    subtitle: '紫霄道宫丹房',
    mandatory: true,
    beats: [
      N('第三日暮色四合，松风入窗。张清溪取出一张焦尾七弦琴，奏起一曲《太和清音》。你静坐调息，随琴韵吐纳，只觉连日奔波之疲尽去，识海清明，对道家经义与雅乐韵律皆有新悟。'),
      S('NPC-0208', '“三日之期已满，丹药已封入温玉锦匣。秦岭风雪将至，{gender:道友|小道友}请速速北归，代贫道向紫阳真人与长生子前辈问安！”'),
    ],
    onFinishEffects: [openScene('scene_znq10_20', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_20: {
    id: 'scene_znq10_20',
    title: '第二十幕 · 捧丹北归',
    subtitle: '武当山门',
    mandatory: true,
    beats: [
      N('辞别张玄素、张清溪与莫清谷三位道长，你将盛放紫霄玄丹的温玉锦匣贴身藏好，昼夜兼程北返关中终南山。'),
    ],
    choices: [
      {
        id: 'znq10_return_zhongnan',
        label: '携紫霄玄丹速返【终南山 · 道藏经阁与紫金丹院】救治刘处静',
        tone: 'jade',
        effects: [
          { type: 'advanceShichen', count: 18 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '琴', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0208' }, delta: 15 },
          setStep(ZHONGNAN_Q10_QUEST_ID, 'return_cure_liu'),
          toast('紫霄论道三日，经义与琴艺皆有精进！请速返【终南山 · 道藏经阁与紫金丹院】！', 'success', '武当问真'),
        ],
      },
    ],
  },

  scene_znq10_21: {
    id: 'scene_znq10_21',
    title: '第二十一幕 · 丹院启匣',
    subtitle: '终南山隐宗 · 道藏经阁与紫金丹院',
    illustrationUrl: '/assets/quests/zn_q10_alchemy_cure.jpg',
    illustrationCaption: '丹成除疴 · 紫霄玄丹化去长生子多年寒毒',
    mandatory: true,
    beats: [
      N('你一路风尘扑扑赶回紫金丹院，只见王重楼正亲自坐镇丹榻之畔，刘处静盘膝闭目，眉睫间凝着一层薄霜。'),
      P('“掌教！弟子幸不辱命，已自武当太和求得紫霄玄丹归来！”'),
      S('NPC-0133', '（接过温玉锦匣，启盖见紫霞隐隐，长舒一口气）“好！张玄素道兄果然重信守诺。你随贫道左右护法，依张清溪所授文火导引之法，助你刘师叔化毒！”'),
    ],
    onFinishEffects: [openScene('scene_znq10_22', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_22: {
    id: 'scene_znq10_22',
    title: '第二十二幕 · 纯阳逼霜',
    subtitle: '道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      N('刘处静吞下紫霄玄丹，霎时间丹田腾起一股温润紫气。王重楼掌抵其灵台，你则按张清溪所嘱，将自身纯阳真气细细渡入其涌泉穴，一上一下夹攻寒毒。'),
      N('约莫两个时辰后，刘处静长啸一声，头顶白雾滚滚蒸腾，十指指尖逼出数滴墨黑冰珠，落地嗤嗤作响，竟将青砖蚀出细孔。'),
    ],
    onFinishEffects: [openScene('scene_znq10_23', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_23: {
    id: 'scene_znq10_23',
    title: '第二十三幕 · 长生重明',
    subtitle: '道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      S('NPC-1056', '（睁开双目，精光湛然，面色已复红润，起身向你深深一揖）“多年寒毒一朝尽去，浑身轻快如脱胎换骨！此番全赖{gender:师侄|师侄女}万里奔波，老道铭感五内！”'),
      S('NPC-0133', '“你在汉水义助莫清谷，又在太和金殿得张玄素赞许，实为我终南古观大增光彩。只是听闻铁掌帮与西夏一品堂近来往来颇密，今冬山中恐有风波，你须好生调养精进。”'),
    ],
    onFinishEffects: [openScene('scene_znq10_24', ZHONGNAN_Q10_QUEST_ID)],
  },

  scene_znq10_24: {
    id: 'scene_znq10_24',
    title: '第二十四幕 · 南北同心',
    subtitle: '道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      N('窗外暮雪初飘，丹炉余温融融。你拜谢掌教与刘师叔，将此番武当问真所得的南北道脉感悟细细铭记于心，静待终南冬雪下的下一场考验。'),
    ],
    choices: [
      {
        id: 'znq10_complete',
        label: '谨记掌教嘱托，勤修道法以备冬雪风波',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'giveSilver', amount: 120, reason: '终南古观赐予南下求药盘缠赏银' },
          { type: 'giveCombatExp', amount: 1800, reason: '汉水退敌与太和问真历练所得' },
          { type: 'addSectContribution', amount: 300 },
          { type: 'modifyRenown', delta: 45, reason: '太和云海武当问真扬名道门' },
          { type: 'modifyChivalry', delta: 25, reason: '汉水义助武当莫清谷' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1056' }, delta: 25 },
          { type: 'completeQuest', questId: ZHONGNAN_Q10_QUEST_ID, outcome: 'cured_liu' },
          toast('《太和云海 · 武当问真》圆满完成！刘处静寒毒尽愈，声望与宗门贡献大增！', 'success', '武当问真'),
        ],
      },
    ],
  },
}
