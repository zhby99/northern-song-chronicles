import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q18_QUEST_ID } from './zhongnanMuLuoyangChessQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq18_01: {
    id: 'scene_znq18_01',
    title: '第一幕 · 洛水垂柳',
    subtitle: '洛阳府 · 白马书院 · 垂柳荷池手谈水亭',
    illustrationUrl: '/assets/quests/zn_q18_luoyang_pavilion.jpg',
    illustrationCaption: '聪辩雅集 · 白马书院荷池水亭手谈论易',
    mandatory: true,
    beats: [
      N('{reignYear}冬月，西京洛阳薄霜映日。你携星宿残笺东行入城，踏入白马书院深处的垂柳荷池手谈水亭。'),
      N('亭中石案对坐着两位气度迥异的当世奇人：左侧长髯飘洒、双目如渊却自闭口舌以手势示意者，正是逍遥派「聪辩先生」苏星河；右侧温润儒雅、眉含先天易象者，乃大宋名儒邵雍邵尧夫。'),
      P('（抱拳行礼，递上终南林朝瑶问安信笺与星宿残纸）“终南古墓弟子拜见苏先生、邵先生！晚辈在秦岭截获星宿与西夏死士残笺，见其中提及洛阳雅集与云中鹤，特来示警！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_02', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_02: {
    id: 'scene_znq18_02',
    title: '第二幕 · 哑弈传神',
    subtitle: '垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      N('苏星河接过残笺一扫，眼中精光暴涨，却不发一言，只是含笑伸手示意你落座，随手拈起一枚黑子啪地落在棋枰星位之上。'),
      S('NPC-0046', '（含笑替苏星河解意）“{gender:小友|小女侠}莫怪。星河兄昔年发过重誓，不轻易开口言谈，凡遇高客皆以手谈论心。他这一子落于东北天门，意在谢过寒玉仙子关切，亦想考较你能否从棋局中看出洛阳危局之眼。”'),
    ],
    onFinishEffects: [openScene('scene_znq18_03', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_03: {
    id: 'scene_znq18_03',
    title: '第三幕 · 棋盘暗机',
    subtitle: '垂柳荷池手谈水亭',
    illustrationUrl: '/assets/quests/zn_q18_chess_meeting.jpg',
    illustrationCaption: '手谈破局 · 苏星河以珍珑之意点化古墓真传',
    mandatory: true,
    beats: [
      N('你凝视棋枰，只见黑子大势已如铁桶合围，白子仅剩一线孤棋悬于西南角。你想起终南古墓“以轻破重、舍死求生”的武学真意，执起一枚白子，果断填入黑棋腹心死眼！'),
      S('NPC-0138', '（先是一怔，继而抚掌微哂，眼中满是赞赏，在石案上蘸茶写下四字：『置之死地』）'),
    ],
    onFinishEffects: [openScene('scene_znq18_04', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_04: {
    id: 'scene_znq18_04',
    title: '第四幕 · 邵雍解易',
    subtitle: '垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      S('NPC-0046', '（捋须长叹）“妙手！星河兄平日摆下的棋局连我都常觉艰深，{gender:小友|小女侠}竟以一招弃子腾挪盘活全局！正应了《皇极经世》中『穷则变、变则通』之理。”'),
      N('苏星河又在案前轻拨古琴三弦，清越琴韵隐隐带着一股奇异内家震颤，令你识海豁然开朗，对棋道与琴艺顿生新悟。'),
    ],
    onFinishEffects: [openScene('scene_znq18_05', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_05: {
    id: 'scene_znq18_05',
    title: '第五幕 · 书呆遇险',
    subtitle: '垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      N('正雅集谈笑间，一名书院小厮满脸惊惶地奔入水亭：“邵先生！苏先生！不好了！方才函谷八友里的苟读苟先生去牡丹园碧溪水榭买古本《春秋》，被一个竹竿似的黑衣恶人拦住了！”'),
      S('NPC-0046', '（神色大变）“竹竿似的黑衣恶人……身法奇快无比？定是西夏一品堂四大恶人之一『穷凶极恶』云中鹤！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_06', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_06: {
    id: 'scene_znq18_06',
    title: '第六幕 · 聪辩托付',
    subtitle: '垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      N('苏星河霍然起身，神色焦急却又顾忌自己不便在洛阳城中公然暴露逍遥武功，以免引来星宿老怪更大祸端。他望向你，拱手深深一揖。'),
      P('“苏先生不必多言！苟读先生乃您的爱徒，云中鹤又是西夏一品堂悍恶爪牙，晚辈轻功《踏雪无痕》正专克这等淫贼飞贼，我这就赶赴牡丹园碧溪水榭救人！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_07', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_07: {
    id: 'scene_znq18_07',
    title: '第七幕 · 邵雍嘱行',
    subtitle: '垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      S('NPC-0046', '“云中鹤轻功号称天下邪道第一，一对钢爪阴狠毒辣。{gender:小友|小女侠}务必万分小心，救下苟读先生后速回书院会合！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_08', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_08: {
    id: 'scene_znq18_08',
    title: '第八幕 · 疾掠洛城',
    subtitle: '白马书院山门',
    mandatory: true,
    beats: [
      N('苏星河将一枚刻有逍遥青竹纹的玉佩塞入你掌心以作信物。你谢过二老，运起《踏雪无痕》掠出书院高墙，直奔洛阳牡丹园！'),
    ],
    onFinishEffects: [openScene('scene_znq18_09', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_09: {
    id: 'scene_znq18_09',
    title: '第九幕 · 牡丹风急',
    subtitle: '洛阳牡丹园外',
    mandatory: true,
    beats: [
      N('冬日牡丹园虽无国色盛放，碧溪虹桥畔却已传来书生惊呼与刺耳怪笑！'),
    ],
    choices: [
      {
        id: 'znq18_go_peony',
        label: '急赴【洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭】驰援苟读',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q18_QUEST_ID, stepId: 'peony_rescue_goudu' },
          { type: 'modifySkill', key: '棋', delta: 1 },
          { type: 'modifySkill', key: '琴', delta: 1 },
          setStep(ZHONGNAN_Q18_QUEST_ID, 'peony_rescue_goudu'),
          toast('水亭手谈听琴，棋艺与琴艺俱有精进！请速赴【洛阳牡丹园 · 碧溪虹桥琴画水榭】救下苟读！', 'success', '聪辩雅集'),
        ],
      },
    ],
  },

  scene_znq18_10: {
    id: 'scene_znq18_10',
    title: '第十幕 · 虹桥危急',
    subtitle: '洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭',
    illustrationUrl: '/assets/quests/zn_q18_peony_waterside.jpg',
    illustrationCaption: '虹桥危局 · 云中鹤钢爪逼近手捧古卷的书呆苟读',
    mandatory: true,
    beats: [
      N('碧溪虹桥琴画水榭畔，满地散落着泛黄古籍。手捧《论语》的书呆苟读正被一道瘦长如竹竿的诡异黑影逼至水榭栏杆边缘，险些坠入冰冷碧溪！'),
      S('NPC-0211', '（虽已衣衫破损，犹自紧抱古卷大喊）“子曰：见利思义，见危授命！你这西夏恶贼休想从我手里抢走师父珍藏的棋谱信物！”'),
      S('NPC-0182', '（尖声淫笑，一对寒铁鹤爪寒光闪烁）“嘿嘿嘿，老子奉西夏一品堂之命来拿苏星河门下活口，顺便看看洛阳城里还有什么美人！酸书呆，拿命来吧！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_11', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_11: {
    id: 'scene_znq18_11',
    title: '第十一幕 · 踏雪截鹤',
    subtitle: '碧溪虹桥琴画水榭',
    mandatory: true,
    beats: [
      N('千钧一发之际，你运起十成《踏雪无痕》，身影竟如瞬移般掠过碧溪水面，后发先至横插在苟读与云中鹤之间！袖风一拂，两枚冰魄银针叮叮震开云中鹤钢爪！'),
      S('NPC-0182', '（惊骇倒翻上虹桥顶梁，瞪大三角眼盯着你）“咦？！普天之下除了大理段家和逍遥派，竟还有人的轻功快过老子云中鹤？你是哪路冒出来的娃娃！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_12', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_12: {
    id: 'scene_znq18_12',
    title: '第十二幕 · 轻功争锋',
    subtitle: '碧溪虹桥琴画水榭',
    illustrationUrl: '/assets/quests/zn_q18_yunzhonghe_chase.jpg',
    illustrationCaption: '踏雪压鹤 · 碧溪虹桥上古墓踏雪无痕力压云中鹤',
    mandatory: true,
    beats: [
      P('“终南古墓真传在此！云中鹤，你作恶多端、助纣为虐，今日便叫你见识什么才是真正的轻功绝顶！”'),
      S('NPC-0211', '（大喜过望，高举书卷）“太好了！子曰：德不孤，必有邻！{gender:少侠|女侠}小心他的鹤爪毒风，我为你掠阵！”'),
    ],
    choices: [
      {
        id: 'znq18_duel_yunzhonghe',
        label: '施展《踏雪无痕》与古墓绝学，护下苟读力压云中鹤',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q18_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0182' },
            allies: [{ kind: 'npc', npcId: 'NPC-0211' }],
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '苟读先生身陷险境，绝不可退缩！',
            introText: '碧溪虹桥霜气飞扬，你以踏雪无痕步法正面压制西夏恶人云中鹤！',
            onWin: [openScene('scene_znq18_13', ZHONGNAN_Q18_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('云中鹤身法滑溜诡谲，你稳住阵脚护住苟读，调息后再战！', 'warn', '聪辩雅集'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq18_13: {
    id: 'scene_znq18_13',
    title: '第十三幕 · 鹤折霜爪',
    subtitle: '碧溪虹桥琴画水榭',
    mandatory: true,
    beats: [
      N('云中鹤纵身欲逃，却惊恐发现无论自己朝哪个方位折转，你的《踏雪无痕》总能先他半步封住去路！你一记《寒冰绵掌》结结实实印在他右肩，寒劲透骨，云中鹤惨嚎一声坠落桥面，右爪瞬间结满白霜！'),
      S('NPC-0182', '（连滚带爬跃上园墙，满脸怨毒却不敢再战）“好狠的古墓小畜生！老子记住你了——这笔账一品堂迟早连本带利讨回来！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_14', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_14: {
    id: 'scene_znq18_14',
    title: '第十四幕 · 恶人遁逃',
    subtitle: '碧溪虹桥琴画水榭',
    mandatory: true,
    beats: [
      N('云中鹤抛出一枚烟雾弹，捂着冻僵的右臂仓皇遁出洛阳牡丹园。碧溪水榭重归宁静。'),
    ],
    onFinishEffects: [openScene('scene_znq18_15', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_15: {
    id: 'scene_znq18_15',
    title: '第十五幕 · 书呆拜谢',
    subtitle: '碧溪虹桥琴画水榭',
    mandatory: true,
    beats: [
      S('NPC-0211', '（整理衣冠，郑重向你深施一礼）“多谢{gender:少侠|女侠}救命之恩！子曰：大恩不言谢，苟某这厢有礼了！方才若非阁下轻功盖世力压云中鹤，我师父托我带回的《珍珑残局录》可就落入西夏贼手了！”'),
      P('“苟先生安然无恙便好。此地不宜久留，我护送先生速回白马书院向苏先生与邵先生报平安！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_16', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_16: {
    id: 'scene_znq18_16',
    title: '第十六幕 · 拾卷同归',
    subtitle: '洛阳牡丹园',
    mandatory: true,
    beats: [
      N('你帮苟读拾起散落青石板上的古籍经卷，护着这位迂直却重义的函谷书呆穿街过巷返回白马书院。'),
    ],
    onFinishEffects: [openScene('scene_znq18_17', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_17: {
    id: 'scene_znq18_17',
    title: '第十七幕 · 洛城传名',
    subtitle: '洛阳街市',
    mandatory: true,
    beats: [
      N('沿途已有不少目睹虹桥一战的江湖客低声赞叹：“听说了吗？方才牡丹园里有个终南古墓的年轻高手，单凭轻功就把西夏云中鹤打得抱头鼠窜！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_18', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_18: {
    id: 'scene_znq18_18',
    title: '第十八幕 · 归至书院',
    subtitle: '白马书院外',
    mandatory: true,
    beats: [
      N('不多时，二人已平安回到白马书院门前，垂柳荷池水亭内灯火仍明。'),
    ],
    onFinishEffects: [openScene('scene_znq18_19', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_19: {
    id: 'scene_znq18_19',
    title: '第十九幕 · 赴亭辞行',
    subtitle: '白马书院',
    mandatory: true,
    beats: [
      N('苟读先行一步奔入水亭报喜，你整肃衣襟随后步入。'),
    ],
    choices: [
      {
        id: 'znq18_return_shuyuan',
        label: '返回【白马书院 · 垂柳荷池手谈水亭】与苏星河、邵雍辞行',
        tone: 'jade',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0211' }, delta: 20 },
          setStep(ZHONGNAN_Q18_QUEST_ID, 'return_shuyuan_farewell'),
          toast('已护下苟读力压云中鹤！请返回【白马书院 · 垂柳荷池手谈水亭】辞行！', 'success', '聪辩雅集'),
        ],
      },
    ],
  },

  scene_znq18_20: {
    id: 'scene_znq18_20',
    title: '第二十幕 · 聪辩致谢',
    subtitle: '洛阳府 · 白马书院 · 垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      N('苏星河见苟读平安归来，欣慰地拍了拍徒儿肩头，随即转向你郑重抱拳，在石案上蘸茶写下两行字：『终南踏雪压云鹤，逍遥永铭此恩情。』'),
      S('NPC-0046', '（抚须大笑）“好一个『终南踏雪压云鹤』！{gender:小友|小女侠}今日不仅救了苟兄，更替我大宋西京洛阳出了一口恶气！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_21', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_21: {
    id: 'scene_znq18_21',
    title: '第二十一幕 · 密讯示警',
    subtitle: '垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      N('苏星河神色忽转凝重，提笔在宣纸上疾书数行递给你看——原来函谷八友遍布江湖的眼线刚刚探知：西夏一品堂已重金收买了一名熟悉活死人墓外围机关的终南叛徒，意图趁岁末大雪引敌攻墓！'),
      P('“什么？！终南叛徒勾结外敌图谋古墓？！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_22', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_22: {
    id: 'scene_znq18_22',
    title: '第二十二幕 · 邵雍起卦',
    subtitle: '垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      S('NPC-0046', '（掐指推演，沉声道）“卦象显示『艮上有坎，寒玉蒸霞』——终南古墓确有一场内忧外患之劫，但劫中藏大机缘。{gender:小友|小女侠}速速西返，或许正逢你修成古墓无上真经之时！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_23', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_23: {
    id: 'scene_znq18_23',
    title: '第二十三幕 · 拜别洛水',
    subtitle: '白马书院',
    mandatory: true,
    beats: [
      P('“多谢苏先生与邵先生示警！晚辈这就星夜赶回终南山禀报师父，咱们他日江湖再会！”'),
    ],
    onFinishEffects: [openScene('scene_znq18_24', ZHONGNAN_Q18_QUEST_ID)],
  },

  scene_znq18_24: {
    id: 'scene_znq18_24',
    title: '第二十四幕 · 西归秦岭',
    subtitle: '洛阳西门官道',
    mandatory: true,
    beats: [
      N('挥别洛阳白马书院的琴棋雅谊，你快马加鞭西返终南山。一场关乎古墓生死与无上心经传承的终极试炼，正在活死人墓深处等待着你！'),
    ],
    choices: [
      {
        id: 'znq18_complete',
        label: '携聪辩密讯星夜西返终南山',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'addArtExp', artId: 'MA-098', amount: 350 },
          { type: 'giveSilver', amount: 200, reason: '苏星河与邵雍厚赠盘缠谢礼' },
          { type: 'giveCombatExp', amount: 2500, reason: '洛阳牡丹园力压云中鹤护下苟读' },
          { type: 'addSectContribution', amount: 400 },
          { type: 'modifyRenown', delta: 70, reason: '踏雪无痕力压云中鹤名动西京' },
          { type: 'modifyChivalry', delta: 35, reason: '义救函谷苟读震慑西夏恶人' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0138' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0046' }, delta: 20 },
          { type: 'completeQuest', questId: ZHONGNAN_Q18_QUEST_ID, outcome: 'defeated_yunzhonghe' },
          toast('《洛水琴棋 · 聪辩雅集》圆满完成！请速返终南活死人墓！', 'success', '聪辩雅集'),
        ],
      },
    ],
  },
}
