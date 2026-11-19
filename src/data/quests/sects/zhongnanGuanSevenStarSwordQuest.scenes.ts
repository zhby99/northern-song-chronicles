import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, flag, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q33_QUEST_ID } from './zhongnanGuanSevenStarSwordQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq33_01: {
    id: 'scene_znq33_01',
    title: '第一幕 · 边关急递',
    subtitle: '重阳古观 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('{reignYear}腊月，风雪漫天。两道八百里加急羽书同时送入重阳玄门清修主殿，案头烛火被推门涌入的寒风吹得剧烈摇晃。'),
      S('NPC-0216', '（丘处玄手捧军报，剑眉倒竖）“师父！辽国燕云铁枪萧远风率精锐死士趁黄河冰封偷渡，意图夜袭潼关瓮城；而西夏段延庆更联合一品堂死士围攻延安鄜延边军西营！”'),
      S('NPC-0133', '（神色沉静如古井）“一东一西，声东击西，好毒辣的连环计！边军主力被牵制于大营，若潼关有失，关中门户洞开；若延安溃败，西北半壁危矣！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_02', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_02: {
    id: 'scene_znq33_02',
    title: '第二幕 · 七子请缨',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('丹阳子马钰玄、长真子谭处真、长生子刘处静、长春子丘处玄、玉阳子王处阳、广宁子郝大玄、清静散人孙清静齐齐步出班列，拱手请战！'),
      S('NPC-1054', '（马钰玄沉声道）“师父，我玄门立教之初，便以护持苍生、抵御外侮为本！弟子愿率诸位师弟妹即刻下山驰援！”'),
      S('NPC-0133', '（缓缓起身，望向你与全真七子）“很好。老道须留守终南镇压山南暗流，此番出关靖边，便由你身居中枢天枢位，统率全真七子，先救潼关，再援延安！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_03', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_03: {
    id: 'scene_znq33_03',
    title: '第三幕 · 请出神剑',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('王重楼转身自三清神龛背后请出一口玄铁星纹长匣。匣盖开启的刹那，清越龙吟响彻大殿，七颗嵌于剑脊的北斗寒星宝石熠熠生辉！'),
      S('NPC-0133', '“此乃我重阳古观镇山神兵——【重阳天罡七星剑】！剑身以天外陨铁混精钢百炼而成，遇先天真气则星芒大盛，可破天下一切邪功重甲！”'),
      P('（双膝微曲，双手捧过沉甸甸的七星神剑，只觉剑气与体内先天一炁隐隐呼应，心神激荡）“弟子定不辱没七星神剑之威名！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_04', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_04: {
    id: 'scene_znq33_04',
    title: '第四幕 · 阵演北斗',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0133', '“切记！萧远风枪法刚猛如奔雷，须以快制快、先声夺人；而段延庆乃大理皇室弃子，一身一阳指与铁杖神功阴狠诡谲，唯有你执七星剑主阵，与七子共运天罡北斗剑阵，方能将其彻底击溃！”'),
      S('NPC-0216', '（拔剑击掌，豪气干云）“有{gender:师兄|师姐}执七星神剑坐镇阵眼，莫说萧远风、段延庆，便是辽夏千军万马，我等也敢杀他个七进七出！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_05', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_05: {
    id: 'scene_znq33_05',
    title: '第五幕 · 合流暗讯',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('{ifFlag:zn_cross==harmony|临行前，一只雪白玉蜂翩然飞入殿檐，足间系着一卷细小素笺。你展开一看，竟是冷清秋清秀凌厉的字迹：“塞北风雪恶，古墓寒剑亦愿同行。延安西营，不见不散。”王重楼见状会心一笑，轻叹道墓同心果然天佑终南。|大殿之外，后山寒玉涧方向一片死寂，孤峰雪冷。王重楼神色平静，只嘱咐你此行全凭古观本脉脊梁，绝不需假借外人之力。}'),
    ],
    onFinishEffects: [openScene('scene_znq33_06', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_06: {
    id: 'scene_znq33_06',
    title: '第六幕 · 七星授剑',
    subtitle: '重阳古观 · 拜领神剑',
    illustrationUrl: '/assets/quests/zn_q33_sevenstar_bestow.jpg',
    illustrationCaption: '重阳玄门清修主殿 · 王重楼亲授重阳天罡七星剑，全真七子佩剑列阵誓师出关',
    mandatory: true,
    beats: [
      N('三清像前，你高举重阳天罡七星剑，剑光映亮满殿青袍。全真七子齐声剑鸣相和，气势如虹！'),
    ],
    onFinishEffects: [openScene('scene_znq33_07', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_07: {
    id: 'scene_znq33_07',
    title: '第七幕 · 踏雪东出',
    subtitle: '终南山道',
    mandatory: true,
    beats: [
      N('一行八骑踏破晨雪，扬鞭东出终南，直指天下第一雄关——潼关天险瓮城！'),
    ],
    choices: [
      {
        id: 'znq33_accept',
        label: '统率全真七子驰赴【潼关镇河主城楼与瓮城】，截击萧远风',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q33_QUEST_ID, stepId: 'tongguan_clash' },
          setStep(ZHONGNAN_Q33_QUEST_ID, 'tongguan_clash'),
          toast('已接取《天罡神剑 · 横绝塞北》！请火速前往【潼关镇河主城楼与瓮城】截击萧远风！', 'talk', '天罡神剑'),
        ],
      },
    ],
  },

  scene_znq33_08: {
    id: 'scene_znq33_08',
    title: '第八幕 · 潼关烽火',
    subtitle: '潼关 / 西岳华山 · 潼关镇河主城楼与瓮城',
    mandatory: true,
    beats: [
      N('残阳如血，黄河冰涛拍岸。潼关镇河主城楼上烽烟四起，十余名契丹死士已攀上瓮城垛口，与守关宋军杀得难解难分！'),
      S('NPC-0184', '（一身银甲披风，手中丈二燕云铁枪横扫城头，瞬间挑飞两名宋军校尉，朗声大喝）“大宋禁军不过如此！待本将斩断潼关吊桥铁索，契丹铁骑便直驱长安！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_09', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_09: {
    id: 'scene_znq33_09',
    title: '第九幕 · 剑落城楼',
    subtitle: '潼关镇河主城楼与瓮城',
    mandatory: true,
    beats: [
      N('便在萧远风长枪刺向吊桥绞盘的千钧一发之际，七道青袍剑影如苍鹰扑落城头，瞬间将契丹死士尽数逼退！紧接着一道璀璨星芒破空而至，“当”的一声精准架住那杆霸道无匹的燕云铁枪！'),
      P('（足尖点在女墙之上，重阳天罡七星剑星光流转，稳稳压住枪锋）“辽贼休狂！终南重阳门下在此，潼关岂容你踏前半步！”'),
      S('NPC-0184', '（双臂微震，目光一凛）“重阳天罡七星剑？！王重楼没来，竟派你带全真七子来送死？好，便让本将领教终南新秀的高招！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_10', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_10: {
    id: 'scene_znq33_10',
    title: '第十幕 · 枪剑争锋',
    subtitle: '潼关镇河主城楼与瓮城',
    mandatory: true,
    beats: [
      S('NPC-0216', '（挥剑斩翻两名契丹死士，高声道）“{gender:师兄|师姐}专心破敌将！城头杂兵交给我们师兄弟七人肃清！”'),
      N('寒风卷起黄河冰雾，萧远风铁枪抖出漫天枪花如梨花暴雨，直罩你周身大穴！'),
    ],
    choices: [
      {
        id: 'znq33_fight_xiao',
        label: '仗重阳天罡七星剑，正面迎战【燕云铁枪 · 萧远风】！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q33_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0184' },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '潼关吊桥就在身后，此战唯胜不可退！',
            introText: '潼关镇河城楼之上，你手执重阳天罡七星剑迎战辽将萧远风！',
            onWin: [openScene('scene_znq33_11', ZHONGNAN_Q33_QUEST_ID)],
            onLose: [
              toast('萧远风燕云铁枪沉猛凌厉，你暂借垛口卸力调息，务必再度迎战！', 'warn', '潼关受挫'),
            ],
            onDraw: [
              toast('枪剑激斗火星四溅，萧远风攻势渐缓，速再进击破其枪势！', 'warn', '枪剑胶着'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq33_11: {
    id: 'scene_znq33_11',
    title: '第十一幕 · 斩断枪缨',
    subtitle: '潼关镇河主城楼与瓮城',
    mandatory: true,
    beats: [
      N('你运起先天一炁贯注七星剑脊，剑身七星连闪，一招“星河倒泻”顺着枪杆贴身疾进，精准斩断血红枪缨，剑背顺势重重拍在萧远风护心镜上！'),
      S('NPC-0184', '（踉跄暴退七步，虎口裂血，望见城下宋军援兵火把已如长龙涌来，恨声咬牙）“好剑法！天罡七星剑果然名不虚传！今日风势不利，撤回河岸！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_12', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_12: {
    id: 'scene_znq33_12',
    title: '第十二幕 · 潼关解围',
    subtitle: '潼关镇河主城楼与瓮城',
    mandatory: true,
    beats: [
      N('萧远风率残部仓皇攀索退回黄河冰面，潼关守将率兵登上城楼，见满地伏尸与毫发无损的吊桥绞盘，激动得连连抱拳称谢。'),
      S('NPC-1054', '（马钰玄快步走来，神色凝重）“{gender:师弟|师妹}，潼关虽已无虞，但方才捕获的细作供认，段延庆的主力此刻正猛扑延安鄜延边军西营，意在焚毁大宋西北粮草大库！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_13', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_13: {
    id: 'scene_znq33_13',
    title: '第十三幕 · 雄关剑影',
    subtitle: '潼关瓮城 · 大破燕云铁枪',
    illustrationUrl: '/assets/quests/zn_q33_tongguan_spear.jpg',
    illustrationCaption: '潼关镇河城楼 · 七星神剑斩落燕云铁枪红缨，黄河冰涛间力挽关中门户',
    mandatory: true,
    beats: [
      P('（收剑回鞘，遥望西北苍茫雪原）“粮草若焚，鄜延边军十万将士必陷绝境！诸位师兄，换马不换鞍，今夜星驰延安！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_14', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_14: {
    id: 'scene_znq33_14',
    title: '第十四幕 · 兼程北上',
    subtitle: '关陕雪原驿道',
    mandatory: true,
    beats: [
      N('一路风餐露宿、马不停蹄。待远方嘉岭山轮廓隐现于风雪之中，鄜延边军大营方向已冲起滚滚火光！'),
    ],
    onFinishEffects: [openScene('scene_znq33_15', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_15: {
    id: 'scene_znq33_15',
    title: '第十五幕 · 直扑西营',
    subtitle: '延安府外雪原',
    mandatory: true,
    beats: [
      N('你一夹马腹，统率全真七子如一道青色闪电直插硝烟弥漫的鄜延边军西营！'),
    ],
    choices: [
      {
        id: 'znq33_go_yanan',
        label: '驰援【延安府 · 鄜延边军大营 · 西营】，列阵决战段延庆！',
        tone: 'danger',
        effects: [
          setStep(ZHONGNAN_Q33_QUEST_ID, 'yanan_decisive'),
          toast('请前往【延安府 · 鄜延边军大营 · 西营（ya_camp_west）】决战段延庆！', 'warn', '驰援鄜延'),
        ],
      },
    ],
  },

  scene_znq33_16: {
    id: 'scene_znq33_16',
    title: '第十六幕 · 铁杖寒音',
    subtitle: '延安府 · 鄜延边军大营 · 西营',
    mandatory: true,
    beats: [
      N('鄜延边军西营粮囤之前，火把映红了漫天风雪。数十名守营将士倒卧雪地，一道身着青袍、双腿残废却拄着一对乌黑精钢铁杖的枯瘦身影，正缓步逼近最后一座粮仓。'),
      S('NPC-1053', '（腹语阴森冰冷，宛如鬼哭般自丹田震出，响彻雪夜）“大宋边军不过土鸡瓦狗。烧了这十万石冬粮，明年开春，延安府便要不战自降！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_17', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_17: {
    id: 'scene_znq33_17',
    title: '第十七幕 · 北斗降临',
    subtitle: '鄜延边军大营 · 西营',
    mandatory: true,
    beats: [
      N('“嗖嗖嗖！”七道凛冽剑气自风雪中凌空斩落，精准熄灭了飞向粮囤的火箭！你执重阳天罡七星剑飘然落地，全真七子瞬间依天枢、天璇、天玑、天权、玉衡、开阳、摇光七星方位散开，将段延庆死死围在阵中！'),
      S('NPC-1053', '（独眼寒光暴涨，铁杖重重顿地，震起一圈雪浪）“天罡北斗剑阵？！重阳古观的牛鼻子，竟敢万里追来延安坏我大事！”'),
      P('（七星神剑斜指苍穹，朗声道）“段延庆！你本是大理皇室贵胄，却甘为西夏爪牙荼毒大宋边民！今日便叫你尝尝我终南天罡北斗剑阵的滋味！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_18', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_18: {
    id: 'scene_znq33_18',
    title: '第十八幕 · 幽谷奇兵',
    subtitle: '鄜延边军大营 · 西营',
    mandatory: true,
    beats: [
      N('{ifFlag:zn_cross==harmony|便在西夏一品堂伏兵自营墙外蜂拥杀出、企图冲散七星剑阵之际，雪幕中忽有一阵银铃般的玉蜂嗡鸣响起！一道白衣倩影如惊鸿掠空而至，剑光漫天如雪，瞬间将西夏伏兵拦腰截断！|西夏一品堂伏兵见状纷纷扑上，马钰玄与丘处玄厉喝一声，七子剑阵骤然加速流转，死死挡住外围敌兵，为你清出正面决战之局！}'),
      S(
        'NPC-0173',
        '（{ifFlag:zn_cross==harmony|冷清秋白衣沾雪，玉剑遥指西夏伏兵，清声道：“古墓冷清秋在此！外围杂兵交予我活死人墓弟子牵制，{gender:少侠|女侠}尽管与七子专心破段延庆！”|远方雪夜寂寥，并无古墓援影，唯余重阳剑光在寒风中孤傲如松。}）',
      ),
    ],
    onFinishEffects: [openScene('scene_znq33_19', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_19: {
    id: 'scene_znq33_19',
    title: '第十九幕 · 七星锁魔',
    subtitle: '延安西营 · 天罡北斗大阵',
    illustrationUrl: '/assets/quests/zn_q33_yanan_array.jpg',
    illustrationCaption: '鄜延边军西营 · 风雪夜火光冲天，你执七星神剑率全真七子列天罡北斗大阵围锁段延庆',
    mandatory: true,
    beats: [
      N('天罡北斗阵势既成，七子剑气首尾相衔，尽数汇于你手中七星神剑之上！段延庆腹语怒啸，双杖化作漫天铁影，挟带森寒一阳指劲破空点来！'),
    ],
    onFinishEffects: [openScene('scene_znq33_20', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_20: {
    id: 'scene_znq33_20',
    title: '第二十幕 · 铁杖对七星',
    subtitle: '鄜延边军大营 · 宗师死斗',
    mandatory: true,
    beats: [
      N('恶贯满盈段延庆乃西夏一品堂首席宗师，一阳指劲隔空透骨，此刻正是塞北决胜的最高峰！'),
    ],
    choices: [
      {
        id: 'znq33_fight_duan',
        label: '合七星剑阵之威，正面决战【恶贯满盈 · 段延庆】！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'branch',
            condition: flag('zn_cross', 'eq', 'harmony'),
            thenEffects: [
              {
                type: 'startCombat',
                questId: ZHONGNAN_Q33_QUEST_ID,
                opponent: { kind: 'npc', npcId: 'NPC-1053' },
                allies: [{ kind: 'npc', npcId: 'NPC-0173' }],
                rule: 'duel',
                lethalOnLose: false,
                forbidEscapeReason: '鄜延十万石边军冬粮就在身后，绝不可退！',
                introText: '延安雪夜，冷清秋携古墓剑光助阵，你执七星神剑率阵迎战段延庆！',
                onWin: [openScene('scene_znq33_21', ZHONGNAN_Q33_QUEST_ID)],
                onLose: [
                  toast('段延庆铁杖一阳指诡谲绝伦，你与冷清秋暂退阵角调息，再起剑阵！', 'warn', '阵脚受挫'),
                ],
                onDraw: [
                  toast('剑阵与铁杖杀得难分胜负，段延庆真气已露破绽，速再进击！', 'warn', '决战胶着'),
                ],
              },
            ],
            elseEffects: [
              {
                type: 'startCombat',
                questId: ZHONGNAN_Q33_QUEST_ID,
                opponent: { kind: 'npc', npcId: 'NPC-1053' },
                rule: 'duel',
                lethalOnLose: false,
                forbidEscapeReason: '鄜延十万石边军冬粮就在身后，绝不可退！',
                introText: '延安雪夜，你执重阳天罡七星剑独挑恶贯满盈段延庆！',
                onWin: [openScene('scene_znq33_21', ZHONGNAN_Q33_QUEST_ID)],
                onLose: [
                  toast('段延庆铁杖一阳指诡谲绝伦，全真七子急忙补位掩护，速调息再战！', 'warn', '阵脚受挫'),
                ],
                onDraw: [
                  toast('七星剑气与铁杖指风难分高下，段延庆攻势渐衰，速再进击！', 'warn', '决战胶着'),
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  scene_znq33_21: {
    id: 'scene_znq33_21',
    title: '第二十一幕 · 紫电破指',
    subtitle: '鄜延边军大营 · 西营',
    mandatory: true,
    beats: [
      N('激战至酣处，段延庆双杖交叉，悍然使出大理绝学一阳指凌空点向你心口！你丝毫不避，先天一炁与七星剑光轰然合鸣，剑尖化作七点璀璨紫芒后发先至！'),
      N('“铮——！”金铁交鸣声震得雪夜回响！段延庆手中左杖竟被七星剑气震出深痕，指风溃散，整个人借力倒掠出十余丈，气息剧烈翻涌！'),
    ],
    onFinishEffects: [openScene('scene_znq33_22', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_22: {
    id: 'scene_znq33_22',
    title: '第二十二幕 · 恶首遁雪',
    subtitle: '鄜延边军大营 · 西营',
    mandatory: true,
    beats: [
      S('NPC-1053', '（死死盯着你手中星芒未褪的长剑，腹语透出难以掩饰的忌惮）“先天功配七星神剑……王重楼竟教出了这等传人！哼，今日粮仓虽未焚成，来日终南山下，我必再讨此债！”'),
      N('话音未落，段延庆双杖点雪，身形如大鸟般凌空掠出营墙，西夏一品堂死士见大势已去，纷纷丢下火把遁入茫茫风雪之中。'),
    ],
    onFinishEffects: [openScene('scene_znq33_23', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_23: {
    id: 'scene_znq33_23',
    title: '第二十三幕 · 边军欢呼',
    subtitle: '鄜延边军大营 · 西营',
    mandatory: true,
    beats: [
      N('漫天风雪中，十万石边军冬粮安然无恙！闻讯赶来的鄜延边军将士望着满营伏敌与凛然立于雪中的道门群侠，纷纷举戈高呼：“多谢终南义士救我边关粮草！”'),
      S('NPC-0216', '（长剑归鞘，畅快大笑）“先破萧远风于潼关，再退段延庆于延安！这一趟横绝塞北，够叫辽夏宵小胆寒十年！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_24', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_24: {
    id: 'scene_znq33_24',
    title: '第二十四幕 · 七星照雪',
    subtitle: '延安西营 · 大破段延庆',
    illustrationUrl: '/assets/quests/zn_q33_duan_duel.jpg',
    illustrationCaption: '延安风雪夜 · 七星神剑紫芒破去一阳指铁杖，段延庆负伤遁走，十万军粮安然无恙',
    mandatory: true,
    beats: [
      N('{ifFlag:zn_cross==harmony|冷清秋拭去剑锋血迹，向你微微颔首：“道墓同心，果然所向披靡。我先回终南向师父报捷，我们在寒玉涧再聚。”说罢白衣翩然消失于雪幕。|风雪渐息，天边已现晨曦微光。你与全真七子并肩而立，望着安稳如山的边军大营，心中满是欣慰。}'),
    ],
    onFinishEffects: [openScene('scene_znq33_25', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_25: {
    id: 'scene_znq33_25',
    title: '第二十五幕 · 班师南归',
    subtitle: '延安驿道',
    mandatory: true,
    beats: [
      N('边关危局既解，你辞别鄜延边军将领，统率全真七子扬鞭南返终南山。'),
    ],
    choices: [
      {
        id: 'znq33_go_return',
        label: '率全真七子凯旋返回【重阳玄门清修主殿】，向王重楼复命',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q33_QUEST_ID, 'return_zhongnan_glory'),
          toast('请返回【终南山隐宗 · 重阳玄门清修主殿（zn_to_hall）】复命授剑！', 'success', '凯旋归山'),
        ],
      },
    ],
  },

  scene_znq33_26: {
    id: 'scene_znq33_26',
    title: '第二十六幕 · 捷报先至',
    subtitle: '重阳古观 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('尚未踏入重阳山门，潼关与延安大捷的消息早已传遍关中江湖。主殿之上，王重楼含笑相迎，满观道众夹道稽首。'),
      S('NPC-0133', '（凝望你手中风霜犹存的七星神剑，朗声叹道）“先破萧远风，再退段延庆，护持潼关与延安十万军粮不失！此等功业，足可告慰历代先师！”'),
    ],
    onFinishEffects: [openScene('scene_znq33_27', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_27: {
    id: 'scene_znq33_27',
    title: '第二十七幕 · 剑归真主',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      P('（双手捧剑欲奉还案上）“弟子幸不辱命，今特将镇山神剑完壁归还师父！”'),
      S('NPC-0133', '（轻轻按住你的双手，微笑摇头）“宝剑配英雄，神兵择真主。这口【重阳天罡七星剑】既已在你手中绽出横绝塞北之光芒，便永久归你佩带吧。”'),
    ],
    onFinishEffects: [openScene('scene_znq33_28', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_28: {
    id: 'scene_znq33_28',
    title: '第二十八幕 · 七子拜服',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-1054', '（马钰玄率六位师弟妹齐齐稽首）“师父圣明！此次塞北血战，我等亲见{gender:师弟|师妹}剑胆琴心、智勇无双，七星神剑归其所掌，满观上下无不心服口服！”'),
      N('王重楼眼中闪过一丝深远的欣慰——他知道，终南玄门的下一代支柱，已然彻底长成。'),
    ],
    onFinishEffects: [openScene('scene_znq33_29', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_29: {
    id: 'scene_znq33_29',
    title: '第二十九幕 · 剑照山河',
    subtitle: '重阳古观 · 横绝塞北',
    illustrationUrl: '/assets/quests/zn_q33_north_triumph.jpg',
    illustrationCaption: '重阳山巅 · 塞北风雪初霁，你佩带重阳天罡七星剑远眺关陕万里河山',
    mandatory: true,
    beats: [
      N('你佩剑立于重阳高阶，北望潼关与延安方向，剑鞘七星微微震鸣，似在回应万里关山的不绝长风。'),
    ],
    onFinishEffects: [openScene('scene_znq33_30', ZHONGNAN_Q33_QUEST_ID)],
  },

  scene_znq33_30: {
    id: 'scene_znq33_30',
    title: '第三十幕 · 天罡威名',
    subtitle: '重阳玄门清修主殿 · 结案',
    mandatory: true,
    beats: [
      N('神剑归主，威震塞北！你正式获颁地阶神兵【重阳天罡七星剑】，成为名震关陕与西北边关的终南擎天剑首！'),
    ],
    choices: [
      {
        id: 'znq33_complete',
        label: '拜受镇山神兵【重阳天罡七星剑】（完成任务）',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'WPN-102', qty: 1 },
          { type: 'giveCombatExp', amount: 1300, reason: '统率全真七子连破萧远风与段延庆，护持潼关延安边防' },
          { type: 'modifyRenown', delta: 200, reason: '仗重阳天罡七星剑横绝塞北，威震辽夏与中原武林' },
          { type: 'modifyChivalry', delta: 90, reason: '万里驰援潼关与延安粮仓，侠之大者为国为民' },
          { type: 'modifySkill', key: '骑术', delta: 2 },
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 25 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0216' }, delta: 25 },
          { type: 'completeQuest', questId: ZHONGNAN_Q33_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《天罡神剑 · 横绝塞北》！获地阶神兵【重阳天罡七星剑】，威望 +200，侠义 +90！',
            'success',
            '天罡神剑',
          ),
        ],
      },
    ],
  },
}
