import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q15_QUEST_ID } from './zhongnanMuSuzhouSwordQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq15_01: {
    id: 'scene_znq15_01',
    title: '第一幕 · 越女渊源',
    subtitle: '终南山隐宗 · 昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('{reignYear}秋初，冰魄石室内清灯如豆。寒玉仙子林朝瑶召你与刚从长安归山的白清霜同入石室，案前横放着一柄秋水长剑。'),
      S('NPC-0114', '“你入古墓以来，捕雀、夜潜、入蜀救蜂，件件办得妥帖。如今轻功与内息根基已稳，该当跨过最后一道门槛，晋升我古墓真传。”'),
      P('“弟子定当竭尽全力，不知师父此次有何考校？”'),
    ],
    onFinishEffects: [openScene('scene_znq15_02', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_02: {
    id: 'scene_znq15_02',
    title: '第二幕 · 姑苏剑讯',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“古墓剑法以轻灵奇诡、后发先至著称，其最古渊源可溯至春秋越女阿青。清霜前日打探到，苏州虎丘剑池新近因秋水落潮，露出一截尘封百年的越女剑意石刻。”'),
      S('NPC-0215', '“不仅如此，苏州沧浪亭书院的大宋名士苏舜钦苏子美酷爱金石古碑，手中藏有吴越剑刻旧拓。你我同去姑苏，先访苏子美，再登虎丘剑池悟剑试锋！”'),
    ],
    onFinishEffects: [openScene('scene_znq15_03', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_03: {
    id: 'scene_znq15_03',
    title: '第三幕 · 师父叮嘱',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“姑苏乃是慕容氏盘踞之地，其『还施水阁』素爱搜罗天下奇谱。此行若遇慕容家好手阻拦，不必畏缩，正可拿江南名家试一试你手中剑锋！”'),
      P('“弟子领命！必携越女剑意凯旋归山！”'),
    ],
    onFinishEffects: [openScene('scene_znq15_04', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_04: {
    id: 'scene_znq15_04',
    title: '第四幕 · 烟波南下',
    subtitle: '终南山麓',
    mandatory: true,
    beats: [
      N('你与白清霜换上江南清雅衣衫，一路顺流东下，过淮扬、渡长江，不过旬日便踏入小桥流水、桂香满城的姑苏古城。'),
    ],
    choices: [
      {
        id: 'znq15_depart_suzhou',
        label: '携白清霜前往【苏州府 · 沧浪亭书院】拜访苏舜钦',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q15_QUEST_ID, stepId: 'suzhou_canglang' },
          setStep(ZHONGNAN_Q15_QUEST_ID, 'suzhou_canglang'),
          toast('已启程南下！请前往【苏州府 · 沧浪亭书院】拜访苏舜钦！', 'talk', '烟波试剑'),
        ],
      },
    ],
  },

  scene_znq15_05: {
    id: 'scene_znq15_05',
    title: '第五幕 · 沧浪秋水',
    subtitle: '苏州府 · 沧浪亭书院',
    illustrationUrl: '/assets/quests/zn_q15_canglang_pavilion.jpg',
    illustrationCaption: '沧浪问古 · 姑苏沧浪亭畔拜访大宋诗豪苏舜钦',
    mandatory: true,
    beats: [
      N('沧浪亭临水环竹，秋风拂过满池残荷。亭中石案旁，一位气宇轩昂、颇具豪侠风骨的文士正挥毫题诗，正是号称「沧浪翁」的大宋名士苏舜钦。'),
      S('NPC-0024', '（搁笔朗笑，望向你与白清霜）“清风明月本无价，近水远山皆有情！二位气度清绝如秦岭霜雪，想是远道而来的江湖高士？”'),
      P('“晚辈久仰苏子美先生诗名与金石博学，特来拜谒，想向先生请教虎丘吴王剑池古刻之秘。”'),
    ],
    onFinishEffects: [openScene('scene_znq15_06', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_06: {
    id: 'scene_znq15_06',
    title: '第六幕 · 金石旧拓',
    subtitle: '沧浪亭书院',
    mandatory: true,
    beats: [
      N('苏舜钦闻言大喜，命书童取出一方泛黄的吴越古碑拓纸。拓纸上并无繁复招式图谱，唯有一幅白猿戏竹、竹枝化剑的写意线条，旁题十六字古篆：“竹影摇风，剑无定势，一念惊鸿，百兵难当。”'),
      S('NPC-0024', '“此乃前人自虎丘剑池东壁水线之下拓出的越女遗刻！老夫虽不通杀伐武艺，却觉其中笔意空灵飘逸，恰如绝顶书法中的狂草飞白！”'),
    ],
    onFinishEffects: [openScene('scene_znq15_07', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_07: {
    id: 'scene_znq15_07',
    title: '第七幕 · 诗剑相通',
    subtitle: '沧浪亭书院',
    mandatory: true,
    beats: [
      N('你凝视拓纸上的飞白笔势，心头忽地一震——这起承转合间虚实相生的韵律，竟与古墓轻功身法暗合天机！'),
      S('NPC-0215', '（低声赞叹）“难怪师父命你先来拜访苏先生。若无这幅旧拓印证，单看剑池斑驳石壁，只怕要多走许多弯路。”'),
    ],
    onFinishEffects: [openScene('scene_znq15_08', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_08: {
    id: 'scene_znq15_08',
    title: '第八幕 · 慕容风声',
    subtitle: '沧浪亭书院',
    mandatory: true,
    beats: [
      S('NPC-0024', '（忽而压低声音提醒）“二位若要登虎丘剑池观碑，须当心些。昨儿个燕子坞姑苏慕容氏的几位豪客也来问过剑池水落之事，听说其中那位最爱找人打架的风波恶也在城里。”'),
      P('“多谢苏先生提点！无论谁在剑池，晚辈都必去走上一遭！”'),
    ],
    onFinishEffects: [openScene('scene_znq15_09', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_09: {
    id: 'scene_znq15_09',
    title: '第九幕 · 移舟虎丘',
    subtitle: '姑苏河道',
    mandatory: true,
    beats: [
      N('辞别苏舜钦，你与白清霜雇一叶乌篷小舟沿山塘河西行，不过半个时辰，云岩古塔与劈崖凌空的虎丘剑池已矗立眼前。'),
    ],
    choices: [
      {
        id: 'znq15_go_huqiu',
        label: '携旧拓前往【苏州府 · 虎丘剑池 · 裂崖飞梁吴王剑池】参悟剑意',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0024' }, delta: 15 },
          setStep(ZHONGNAN_Q15_QUEST_ID, 'huqiu_sword_pool'),
          toast('观沧浪旧拓书法大进！请前往【苏州府 · 虎丘剑池 · 裂崖飞梁吴王剑池】！', 'talk', '烟波试剑'),
        ],
      },
    ],
  },

  scene_znq15_10: {
    id: 'scene_znq15_10',
    title: '第十幕 · 吴王剑池',
    subtitle: '苏州府 · 裂崖飞梁吴王剑池',
    illustrationUrl: '/assets/quests/zn_q15_huqiu_pool.jpg',
    illustrationCaption: '吴王剑池 · 裂崖飞梁秋水映照春秋越女古剑石刻',
    mandatory: true,
    beats: [
      N('两壁陡崖如巨斧劈开，一泓碧绿寒潭深不可测。秋水微落，东壁苔藓之下果然隐约显出几道纵横交错的古拙剑痕，与苏舜钦所赠拓本分毫不差！'),
      N('你凝神屏息，以目代剑沿着石壁剑痕反复临摹，脑海中豁然浮现出白猿跃竹、惊鸿掠水之绝妙剑影！'),
    ],
    onFinishEffects: [openScene('scene_znq15_11', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_11: {
    id: 'scene_znq15_11',
    title: '第十一幕 · 越女惊鸿',
    subtitle: '裂崖飞梁吴王剑池',
    illustrationUrl: '/assets/quests/zn_q15_yuenv_sword.jpg',
    illustrationCaption: '越女惊鸿 · 悟得越女古剑术，剑光如秋水飞燕',
    mandatory: true,
    beats: [
      N('长剑倏然出鞘！你足踏《踏雪无痕》，剑尖在秋风落叶间连点七朵清脆剑花，招式不拘泥于任何定式，却快若流光、轻若飞羽，正是失传已久的《越女古剑术（江南传本）》！'),
      S('NPC-0215', '（美眸异彩连连）“好一招越女惊鸿！刚柔虚实浑然天成，真不枉我们千里南下！”'),
    ],
    onFinishEffects: [
      { type: 'teachMartialArt', artId: 'MA-130', level: 1, autoEquip: true },
      openScene('scene_znq15_12', ZHONGNAN_Q15_QUEST_ID),
    ],
  },

  scene_znq15_12: {
    id: 'scene_znq15_12',
    title: '第十二幕 · 飞梁来客',
    subtitle: '裂崖飞梁吴王剑池',
    mandatory: true,
    beats: [
      N('剑鸣未歇，上方石梁忽然传来一阵爽朗大笑：“非也非也！好俊的轻灵剑法！竟叫咱们哥俩撞见有人在吴王剑池偷师古刻！”'),
      N('两道身影自飞梁飘然跃下：左侧青衫劲装、眼神锐利如鹰者，乃是姑苏慕容氏「穿云鹰」公冶宇彻；右侧手摇折扇、满脸跃跃欲试的精瘦汉子，正是赫赫有名的「一阵风」风波恶！'),
    ],
    onFinishEffects: [openScene('scene_znq15_13', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_13: {
    id: 'scene_znq15_13',
    title: '第十三幕 · 穿云先试',
    subtitle: '裂崖飞梁吴王剑池',
    mandatory: true,
    beats: [
      S('NPC-0472', '（拱手抱拳，语气却毫不退让）“姑苏虎丘历来是我慕容氏常来印证武学之地。阁下方才施展的可是春秋越女剑路？公冶某不才，想先领教几招！”'),
      S('NPC-0215', '“{gender:师弟|师妹}，这正是拿江南名家磨砺新剑的绝佳机会，我替你看着阵脚！”'),
      P('“既蒙公冶兄赐教，那便请出招吧！”'),
    ],
    choices: [
      {
        id: 'znq15_fight_gongye',
        label: '以新悟《越女古剑术（江南传本）》迎战公冶宇彻',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q15_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0472' },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '两派剑客当面试锋，岂可不战而退！',
            introText: '剑池水雾轻扬，你运使越女古剑术迎战姑苏慕容「穿云鹰」公冶宇彻！',
            onWin: [openScene('scene_znq15_14', ZHONGNAN_Q15_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('公冶宇彻掌剑颇为凌厉，白清霜抬手相格助你稳住身形，调息后再战！', 'warn', '烟波试剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq15_14: {
    id: 'scene_znq15_14',
    title: '第十四幕 · 破鹰惊风',
    subtitle: '裂崖飞梁吴王剑池',
    mandatory: true,
    beats: [
      N('你剑随身走，一招越女回锋轻巧卸开公冶宇彻的鹰爪擒拿，剑脊顺势轻拍其肩头！公冶宇彻连退三步，骇然失色：“好快的剑！”'),
      S('NPC-0214', '（折扇一合，双眼放光大叫道）“妙极！妙极！公冶老弟你退下，这等绝世轻灵快剑，岂能不让我风波恶过过瘾？！”'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      openScene('scene_znq15_15', ZHONGNAN_Q15_QUEST_ID),
    ],
  },

  scene_znq15_15: {
    id: 'scene_znq15_15',
    title: '第十五幕 · 一阵风起',
    subtitle: '裂崖飞梁吴王剑池',
    mandatory: true,
    beats: [
      S('NPC-0214', '“风某平生最爱与高手打架，打输了也痛快！你先调匀一口气，莫说我风波恶占你便宜——接招吧！”'),
      P('“风四爷爽快人！晚辈便以越女古剑术领教高招！”'),
    ],
    choices: [
      {
        id: 'znq15_fight_feng',
        label: '稳住真气，迎战姑苏慕容「一阵风」风波恶',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q15_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0214' },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '风波恶已抢占飞梁咽喉，唯击败他方能扬威江南！',
            introText: '秋风卷叶，一阵风风波恶快刀狂风般席卷而来，你以越女古剑术见招拆招！',
            onWin: [openScene('scene_znq15_16', ZHONGNAN_Q15_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('风波恶招式疯魔狠辣，你跃上青石借势缓冲，调息后再战！', 'warn', '烟波试剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq15_16: {
    id: 'scene_znq15_16',
    title: '第十六幕 · 剑止狂风',
    subtitle: '裂崖飞梁吴王剑池',
    mandatory: true,
    beats: [
      N('数十合快攻如电光石火！风波恶刀风虽疾，却始终沾不到你半片衣角。你陡然变招，一剑点在他腕底尺泽穴上，单刀当啷一声斜插石缝！'),
      S('NPC-0214', '（不怒反喜，仰天哈哈大笑）“痛快！真他娘的痛快！非也非也，我风波恶今日输得心服口服！终南古墓竟有如此少年剑客，咱们后会有期！”'),
    ],
    onFinishEffects: [openScene('scene_znq15_17', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_17: {
    id: 'scene_znq15_17',
    title: '第十七幕 · 慕容退去',
    subtitle: '裂崖飞梁吴王剑池',
    mandatory: true,
    beats: [
      N('公冶宇彻向你郑重抱拳，拉着意犹未尽的风波恶纵身跃上飞梁，转瞬消失在虎丘松林之中。'),
      S('NPC-0215', '（含笑鼓掌）“连退公冶宇彻与风波恶，这下姑苏江湖定要记住你的名号了。此行圆满，咱们速回终南向师父复命吧！”'),
    ],
    onFinishEffects: [openScene('scene_znq15_18', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_18: {
    id: 'scene_znq15_18',
    title: '第十八幕 · 临池收拓',
    subtitle: '虎丘剑池',
    mandatory: true,
    beats: [
      N('你最后回望一眼波光粼粼的吴王剑池，将那十六字古篆剑意深印识海，收剑入鞘。'),
    ],
    onFinishEffects: [openScene('scene_znq15_19', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_19: {
    id: 'scene_znq15_19',
    title: '第十九幕 · 别过姑苏',
    subtitle: '苏州城外',
    mandatory: true,
    beats: [
      N('二人遣人向沧浪亭苏舜钦致谢辞行，随后快马西归。一路秋高气爽，你边行边演练越女剑意，愈发觉得与古墓内息相得益彰。'),
    ],
    onFinishEffects: [openScene('scene_znq15_20', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_20: {
    id: 'scene_znq15_20',
    title: '第二十幕 · 返抵秦岭',
    subtitle: '终南山道',
    mandatory: true,
    beats: [
      N('越过潼关，终南群峰苍翠如画。白清霜笑着拍拍你肩头：“前面便是石门了，进去领你的古墓真传玉印吧！”'),
    ],
    choices: [
      {
        id: 'znq15_return_jadebed',
        label: '返回【终南山隐宗 · 活死人墓 · 昆仑寒玉床冰魄石室】复命晋升真传',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q15_QUEST_ID, 'return_jadebed_promote'),
          toast('请返回【终南山隐宗 · 活死人墓 · 昆仑寒玉床冰魄石室】晋升古墓真传！', 'success', '烟波试剑'),
        ],
      },
    ],
  },

  scene_znq15_21: {
    id: 'scene_znq15_21',
    title: '第二十一幕 · 冰室复命',
    subtitle: '终南山隐宗 · 昆仑寒玉床冰魄石室',
    illustrationUrl: '/assets/quests/zn_q15_gumu_promotion.jpg',
    illustrationCaption: '古墓真传 · 昆仑寒玉床前寒玉仙子亲授真传玉印',
    mandatory: true,
    beats: [
      N('踏入冰魄石室，寒玉仙子林朝瑶端坐寒玉床前，冷清秋侍立一侧。白清霜将姑苏沧浪问古、虎丘悟剑及连退公冶宇彻与风波恶的经过娓娓道来。'),
      S('NPC-0114', '（清冷眼眸中透出由衷欣慰）“以新悟之《越女古剑术》，于虎丘剑池力压姑苏慕容一阵风风波恶……好！好极了！”'),
    ],
    onFinishEffects: [openScene('scene_znq15_22', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_22: {
    id: 'scene_znq15_22',
    title: '第二十二幕 · 真传授印',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('林朝瑶起身走下寒玉床，亲手将一枚触手生凉的「冰魄玉蜂真传印」系在你腰间。'),
      S('NPC-0114', '“自今日起，你便是我活死人墓一脉正式真传弟子！可入寒玉秘室研习高阶绝学，亦须担起守护古墓传承之重责！”'),
    ],
    onFinishEffects: [openScene('scene_znq15_23', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_23: {
    id: 'scene_znq15_23',
    title: '第二十三幕 · 同门致贺',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0173', '（微微笑道）“恭喜{gender:师弟|师妹}晋升真传！日后古墓寒潭清修与外敌巡防，咱们便能并肩共担了。”'),
      S('NPC-0215', '“师父接下来怕是要考校你的古墓誓心与高阶寒毒掌针了，切莫松懈哦！”'),
    ],
    onFinishEffects: [openScene('scene_znq15_24', ZHONGNAN_Q15_QUEST_ID)],
  },

  scene_znq15_24: {
    id: 'scene_znq15_24',
    title: '第二十四幕 · 惊鸿照影',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('你恭谨叩谢师恩，抚摸着腰间温润清冷的真传玉印，剑心如秋水般澄澈通明。'),
    ],
    choices: [
      {
        id: 'znq15_complete',
        label: '拜谢师父授印，正式晋升【Lv.3 古墓真传】',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-11', rank: 3, promoteOnly: true },
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'addArtExp', artId: 'MA-130', amount: 350 },
          { type: 'giveSilver', amount: 160, reason: '晋升古墓真传弟子赏银' },
          { type: 'giveCombatExp', amount: 2000, reason: '虎丘剑池悟剑连退慕容二将' },
          { type: 'addSectContribution', amount: 350 },
          { type: 'modifyRenown', delta: 55, reason: '烟波试剑越女惊鸿扬名姑苏' },
          { type: 'modifyChivalry', delta: 20, reason: '以武会友不堕古墓风骨' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0215' }, delta: 20 },
          { type: 'completeQuest', questId: ZHONGNAN_Q15_QUEST_ID, outcome: 'promoted_gumu_rank3' },
          toast('《烟波试剑 · 越女惊鸿》圆满完成！已正式晋升【终南隐宗 · Lv.3 古墓真传】！', 'success', '烟波试剑'),
        ],
      },
    ],
  },
}
