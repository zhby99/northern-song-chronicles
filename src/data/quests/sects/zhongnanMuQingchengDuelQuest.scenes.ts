import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q25_QUEST_ID } from './zhongnanMuQingchengDuelQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq25_01: {
    id: 'scene_znq25_01',
    title: '第一幕 · 蜀道难行猿啼急',
    subtitle: '剑门关 · 剑门雄关箭楼 · 雄关箭楼 · 望胡台',
    illustrationUrl: '/assets/quests/zn_q25_jianmen_rescue.jpg',
    illustrationCaption: '剑门雄关云雾缭绕，冷清秋与你素衣按剑踏上望胡台，与青城鹤道人贾天鹤隔风对峙',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，剑阁绝壁千仞，秋猿哀啼回荡谷间。你偕幽谷素女【冷清秋】奉林朝瑶祖师之命星夜入蜀，直抵天下雄关——【剑门雄关箭楼 · 望胡台】。'),
      N('高台风急，古墓外门弟子【丘锦湘】正被铁索缚于石柱之旁，满身尘土却依旧倔强昂首；身前数名青城弟子按剑环伺，为首一名面容瘦削、目光阴鸷的道人负手冷笑——正是青城派「青城鹤道人」【贾天鹤】！'),
      S('NPC-0173', '（寒眸如霜，声音清冽穿透山风）“青城派好大的威风！我终南古墓弟子不过入蜀采办几味药草，贾道长竟敢私设铁索扣押，莫非当真以为活死人墓无人么？”'),
    ],
    onFinishEffects: [
      { type: 'startQuest', questId: ZHONGNAN_Q25_QUEST_ID, stepId: 'rescue_jianmen' },
      { type: 'teleportPlayer', regionId: 'jianmenguan', buildingId: 'jm_gate', spotId: 'jm_gate_main' },
      openScene('scene_znq25_02', ZHONGNAN_Q25_QUEST_ID),
    ],
  },

  scene_znq25_02: {
    id: 'scene_znq25_02',
    title: '第二幕 · 鹤道人强词夺理',
    subtitle: '剑门雄关箭楼 · 望胡台',
    mandatory: true,
    beats: [
      S('NPC-0221', '（眯眼打量你与冷清秋，冷哼一声）“哼，活死人墓不是号称永不出终南的么？这丫头鬼鬼祟祟在我青城地界打探松风剑谱下落，贫道替余掌门扣下盘问几日，有何不可？”'),
      S('NPC-0552', '（气得面红耳赤，大声驳斥）“放屁！姑奶奶我不过在药铺买了几株川贝雪胆，顺口笑话你们青城弟子在茶寮吹牛，你便恼羞成怒扣我毒打！谁稀罕你们那套花架子剑谱！”'),
    ],
    onFinishEffects: [openScene('scene_znq25_03', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_03: {
    id: 'scene_znq25_03',
    title: '第三幕 · 素剑出鞘寒雄关',
    subtitle: '剑门雄关箭楼 · 望胡台',
    mandatory: true,
    beats: [
      P('（长剑缓缓出鞘三寸，冷声喝道）“是非曲直已然分明。贾天鹤，立刻解开丘师姐身上铁索磕头赔罪，兴许还能保住你青城派几分颜面！”'),
      S('NPC-0221', '（勃然大怒，拂尘一甩拔出松风长剑）“好狂妄的终南小辈！巴蜀乃我青城派掌管之地，今日便教你们主仆三人一同留下领教青城摧心掌与松风剑法！”'),
    ],
    choices: [
      {
        id: 'znq25_ch_duel_jiatianhe',
        label: '剑光破雾，正面对决青城鹤道人贾天鹤！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q25_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0221' },
            rule: 'duel',
            lethalOnLose: false,
            introText: '剑门雄关疾风呼啸，青城鹤道人贾天鹤挥剑扑来！',
            onWin: [openScene('scene_znq25_04', ZHONGNAN_Q25_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('贾天鹤剑法绵密狠辣，借冷清秋掩护重整身法再战！', 'warn', '剑阁激战'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq25_04: {
    id: 'scene_znq25_04',
    title: '第四幕 · 轻灵剑意折鹤翼',
    subtitle: '剑门雄关箭楼 · 望胡台',
    mandatory: true,
    beats: [
      N('你身法如轻燕穿云，玉女剑影连环点出，只十几合便将贾天鹤的松风剑势拆得支离破碎！一记回身撩剑震飞其长剑，剑尖稳稳停在他咽喉半寸之外！'),
      S('NPC-0221', '（面如土色，浑身冷汗浸透道袍）“你……你们古墓的轻功与剑法怎会快到这般地步？！”'),
    ],
    onFinishEffects: [openScene('scene_znq25_05', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_05: {
    id: 'scene_znq25_05',
    title: '第五幕 · 斩锁救出丘锦湘',
    subtitle: '剑门雄关箭楼 · 望胡台',
    mandatory: true,
    beats: [
      N('冷清秋素手挥剑，“锵啷”一声削断铁索，扶起丘锦湘并递上一粒回气丹药。'),
      S('NPC-0552', '（揉着手腕长舒一口气，眼中满是感激）“多谢冷师姐，多谢{gender:师弟|师妹}千里驰援！若再晚来半日，我怕是要被这老牛鼻子押去青城山受私刑了！”'),
    ],
    onFinishEffects: [openScene('scene_znq25_06', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_06: {
    id: 'scene_znq25_06',
    title: '第六幕 · 放鹤传书上青城',
    subtitle: '剑门雄关箭楼 · 望胡台',
    mandatory: true,
    beats: [
      S('NPC-0173', '（冷眸扫过狼狈不堪的贾天鹤）“滚回青城山告诉你家掌门余沧澜：终南活死人墓虽不喜多事，却绝非任人欺凌的软柿子！三日之内，我二人必亲上青城山上清宫松风殿讨个说法！”'),
      S('NPC-0221', '（连滚带爬拾起断剑，咬牙撂下狠话）“好……好！余掌门松风辟邪剑威震西南，你们有胆便上青城山去！”'),
    ],
    onFinishEffects: [openScene('scene_znq25_07', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_07: {
    id: 'scene_znq25_07',
    title: '第七幕 · 护送同门归终南',
    subtitle: '剑门关驿道',
    mandatory: true,
    beats: [
      N('三人离开箭楼，冷清秋安排信得过的巴蜀脚夫护送受惊的丘锦湘先携药草北返终南复命，自己则与你整顿行装，剑指青城山。'),
      S('NPC-0552', '（临别挥手嘱咐）“冷师姐、{gender:师弟|师妹}，余沧澜那厮阴险狡诈，青城山上弟子又多，你们千万小心呀！”'),
    ],
    onFinishEffects: [openScene('scene_znq25_08', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_08: {
    id: 'scene_znq25_08',
    title: '第八幕 · 翠云廊畔论剑道',
    subtitle: '剑阁南下官道',
    mandatory: true,
    beats: [
      S('NPC-0173', '（与你并肩策马，神色淡然却透着锋芒）“师父常说，古墓弟子行走江湖，不欺弱小，亦不畏强权。青城派近年在巴蜀愈发跋扈，今日若不直上上清宫折其锐气，日后江湖宵小必会以为终南古墓可欺。”'),
      P('“正合我意！余沧澜号称‘松风真君’，我倒要瞧瞧他的松风剑法，接不接得住我古墓十合寒锋！”'),
    ],
    choices: [
      {
        id: 'znq25_ch_go_qingcheng',
        label: '即刻策马直上【青城山上清宫松风殿 · 上清松风演剑主殿】问罪余沧澜！',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q25_QUEST_ID, 'duel_qingcheng'),
          { type: 'teleportPlayer', regionId: 'qingcheng', buildingId: 'qc_shangqing', spotId: 'qc_sq_hall' },
          { type: 'setFlag', flag: 'znq25_qingcheng_triggered', value: true },
          openScene('scene_znq25_12', ZHONGNAN_Q25_QUEST_ID),
        ],
      },
      {
        id: 'znq25_ch_prep_qingcheng',
        label: '先于蜀道休整磨剑，稍后自行登临青城山上清宫',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q25_QUEST_ID, 'duel_qingcheng'),
          openScene('scene_znq25_09', ZHONGNAN_Q25_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq25_09: {
    id: 'scene_znq25_09',
    title: '第九幕 · 巴山夜雨拭素剑',
    subtitle: '巴蜀古道',
    mandatory: true,
    beats: [
      S('NPC-0173', '“我在【青城山上清宫松风殿】外松林候你。备妥丹药后，便一同登殿向余沧澜讨债！”'),
    ],
  },

  scene_znq25_10: {
    id: 'scene_znq25_10',
    title: '第十幕 · 青城天下幽且险',
    subtitle: '青城山道',
    mandatory: true,
    beats: [
      N('青城山古木参天，云雾锁峰。沿途青城道童望见你与冷清秋一袭素衣、怀抱寒剑拾级而上，皆神色紧张，急忙鸣钟报讯。'),
    ],
    onFinishEffects: [openScene('scene_znq25_11', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_11: {
    id: 'scene_znq25_11',
    title: '第十一幕 · 松风殿外剑如林',
    subtitle: '青城山上清宫松风殿',
    mandatory: true,
    beats: [
      N('上清宫前青石广场已列起数十名青城剑手，松涛呼啸，肃杀之气扑面而来。'),
    ],
    onFinishEffects: [openScene('scene_znq25_12', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_12: {
    id: 'scene_znq25_12',
    title: '第十二幕 · 素衣登殿问松风',
    subtitle: '青城山 / 唐家堡 · 青城山上清宫松风殿 · 上清松风演剑主殿',
    illustrationUrl: '/assets/quests/zn_q25_shangqing_challenge.jpg',
    illustrationCaption: '上清宫松风主殿青石坪上，青城众弟子列剑相迎，你与冷清秋素衣孤剑昂然登阶',
    mandatory: true,
    beats: [
      N('步入【上清松风演剑主殿】，殿前香炉青烟袅袅。青城派掌门「松风真君」【余沧澜】身披鹤氅端坐掌门大椅，贾天鹤缠着绷带侍立一旁，正咬牙切齿地指着你二人。'),
      S('NPC-0139', '（冷笑起身，轻拂长须）“好大的胆子！终南活死人墓两个无名晚辈，在剑门关打伤我青城长老也就罢了，竟敢公然闯上我上清宫松风殿撒野！”'),
      P('（朗声回应，字字铿锵）“贾天鹤诬陷良善、私扣我古墓同门在先，我等登门讨要公道在后！余掌门若肯管教门下、公开致歉，我等即刻下山；若执意护短，便请余掌门赐教！”'),
    ],
    onFinishEffects: [openScene('scene_znq25_13', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_13: {
    id: 'scene_znq25_13',
    title: '第十三幕 · 松风真君怒拔剑',
    subtitle: '上清松风演剑主殿',
    mandatory: true,
    beats: [
      S('NPC-0139', '（眼中寒光一闪，锵啷拔出青城镇山松风剑）“林朝瑶几十年不出活死人墓，教出的弟子倒是一个比一个目中无人！贫道便替你师父管教管教，让你见识什么叫‘松风辟邪剑’！”'),
      S('NPC-0173', '（退后半步，负剑观阵，淡淡道）“余掌门既要以大欺小，便由我{gender:师弟|师妹}一人接你高招。若你连我古墓后辈十合都胜不了，这‘松风真君’的招牌，还是趁早摘了吧。”'),
    ],
    onFinishEffects: [openScene('scene_znq25_14', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_14: {
    id: 'scene_znq25_14',
    title: '第十四幕 · 十合之约定高下',
    subtitle: '上清松风演剑主殿',
    mandatory: true,
    beats: [
      N('余沧澜气极反笑，身形化作一缕青烟疾掠而出，松风剑法绵密如骤雨，剑尖直指你眉心咽喉要害，招招狠辣绝不留情！'),
    ],
    choices: [
      {
        id: 'znq25_ch_duel_yucanglan',
        label: '以古墓清灵绝剑迎战青城掌门余沧澜，十合挑落其道冠！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q25_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0139' },
            rule: 'duel',
            lethalOnLose: false,
            introText: '上清松风殿前松涛怒号，青城掌门余沧澜施展松风辟邪剑疾攻而至！',
            onWin: [openScene('scene_znq25_15', ZHONGNAN_Q25_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 65, mpPct: 65 },
              toast('余沧澜剑法凌厉奇快，稳住古墓灵动身法再破其招！', 'warn', '青城问剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq25_15: {
    id: 'scene_znq25_15',
    title: '第十五幕 · 寒锋一闪落道冠',
    subtitle: '青城山上清宫松风殿 · 上清松风演剑主殿',
    illustrationUrl: '/assets/quests/zn_q25_yucanglan_crown_split.jpg',
    illustrationCaption: '第十合剑光一闪，玉女素剑轻挑余沧澜头顶玉冠，道冠应声裂作两半坠地',
    mandatory: true,
    beats: [
      N('剑影交错如电！转眼战至第十合，余沧澜久攻不下心浮气躁，使出一记险招直刺你中宫，头顶门户骤然微露一丝破绽！'),
      N('你身形如冰蝶旋舞，反手一记轻描淡写的反挑——“啪！”一道雪亮剑光掠过余沧澜发髻，那顶象征青城掌门威仪的青玉道冠应声裂作两半，骨碌碌滚落青石阶下，长发披散满肩！'),
    ],
    onFinishEffects: [openScene('scene_znq25_16', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_16: {
    id: 'scene_znq25_16',
    title: '第十六幕 · 满殿鸦雀震巴蜀',
    subtitle: '上清松风演剑主殿',
    mandatory: true,
    beats: [
      N('大殿内外数十名青城弟子齐刷刷倒抽一口冷气，鸦雀无声！余沧澜僵立原地，伸手摸了摸散落的发丝，脸色由红转青、由青转白，握剑的手微微发抖。'),
      P('（收剑入鞘，神色波澜不惊）“第十合已过。今日只挑道冠，不伤性命。余掌门，我古墓同门受辱这笔账，如今可算两清了么？”'),
    ],
    onFinishEffects: [openScene('scene_znq25_17', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_17: {
    id: 'scene_znq25_17',
    title: '第十七幕 · 松风俯首认门规',
    subtitle: '上清松风演剑主殿',
    mandatory: true,
    beats: [
      S('NPC-0139', '（良久，长叹一声垂下长剑，强压羞怒拱手）“终南活死人墓剑法通神……贫道输得心服口服！贾天鹤目无法纪、欺辱贵派弟子，贫道即刻将其禁足思过崖三年，绝不再犯终南！”'),
      S('NPC-0173', '（微微颔首）“望余掌门言而有信。告辞。”'),
    ],
    onFinishEffects: [openScene('scene_znq25_18', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_18: {
    id: 'scene_znq25_18',
    title: '第十八幕 · 飘然下山扬幽名',
    subtitle: '青城山道',
    mandatory: true,
    beats: [
      N('二人并肩步出上清宫，身后青城众道士无一人敢出声阻拦。经此一战，“终南古墓素剑十合挑落余沧澜道冠”的佳话，不出半月便传遍整个巴蜀江湖！'),
    ],
    onFinishEffects: [openScene('scene_znq25_19', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_19: {
    id: 'scene_znq25_19',
    title: '第十九幕 · 寒江孤亭议剑理',
    subtitle: '岷江渡口',
    mandatory: true,
    beats: [
      S('NPC-0173', '（立于江畔望向滚滚东逝的岷江水，若有所思）“今日你虽十合胜了余沧澜，但青城剑法走的是轻巧迅疾一途，与我古墓剑路相近。若他日遇上西夏或中原那些内力浑厚、大开大阖的绝顶刚猛剑客，你当如何破之？”'),
    ],
    choices: [
      {
        id: 'znq25_ch_soft_insight',
        label: '“至柔克至刚！天下剑道，唯以无形化有形方能立于不败！”',
        tone: 'jade',
        effects: [
          { type: 'modifySkill', key: '诗词', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 8 },
          openScene('scene_znq25_20', ZHONGNAN_Q25_QUEST_ID),
        ],
      },
      {
        id: 'znq25_ch_speed_insight',
        label: '“唯快不破，亦须刚柔相济——我愿遍访天下剑客，亲身求证！”',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 8 },
          openScene('scene_znq25_20', ZHONGNAN_Q25_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq25_20: {
    id: 'scene_znq25_20',
    title: '第二十幕 · 东下江南访孤鸿',
    subtitle: '岷江渡口',
    mandatory: true,
    beats: [
      S('NPC-0173', '“既要印证‘至柔克至刚’，顺江东下便是江南重镇江宁府。听闻江宁石头城遗址剑庐中，隐居着一位剑意凌厉霸道、号称‘孤峰剑客’的绝世剑豪【叶孤鸿】。”'),
      P('“孤峰剑客叶孤鸿！若能于石头城赤壁临江与他试剑一场，必能彻底磨砺出我古墓剑法的至柔极境！”'),
    ],
    onFinishEffects: [openScene('scene_znq25_21', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_21: {
    id: 'scene_znq25_21',
    title: '第二十一幕 · 巴山挥别各分途',
    subtitle: '岷江渡口',
    mandatory: true,
    beats: [
      S('NPC-0173', '“我须先返终南向师父禀报青城之事，并防备山外宵小窥伺古墓。江宁问剑之行，便由你独步东下吧。路上务必保重！”'),
      P('“师姐安心回山，待我江南问剑归来，必有大进！”'),
    ],
    onFinishEffects: [openScene('scene_znq25_22', ZHONGNAN_Q25_QUEST_ID)],
  },

  scene_znq25_22: {
    id: 'scene_znq25_22',
    title: '第二十二幕 · 轻舟已过万重山',
    subtitle: '长江水道',
    mandatory: true,
    beats: [
      N('一叶轻舟顺流东出夔门，巴山折剑的余韵犹在耳畔。下一站——六朝古都江宁府，石头城遗址赤壁临江试剑台！'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
      { type: 'giveSilver', amount: 240, reason: '巴蜀救回同门与扬威青城赏赐' },
      { type: 'giveCombatExp', amount: 1150, reason: '剑门关破贾天鹤、青城十合挑落余沧澜道冠' },
      { type: 'addSectContribution', amount: 310 },
      { type: 'modifyRenown', delta: 60, reason: '十合挑落余沧澜道冠扬名巴蜀' },
      { type: 'modifyChivalry', delta: 35, reason: '千里驰援同门、仗剑伸张公道' },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 10 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0552' }, delta: 12 },
      { type: 'setFlag', flag: 'zn_q25_qingcheng_cleared', value: true },
      {
        type: 'completeQuest',
        questId: ZHONGNAN_Q25_QUEST_ID,
        outcome: 'qingcheng_defeated',
        combatExp: 500,
      },
      toast(
        '【剑阁猿啼 · 巴山折剑】完结！请顺江东下江宁府石头城，向孤峰剑客叶孤鸿问剑！',
        'success',
        '古墓远征',
      ),
    ],
  },
}
