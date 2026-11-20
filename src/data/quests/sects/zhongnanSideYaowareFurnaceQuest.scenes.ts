import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_SIDE03_QUEST_ID } from './zhongnanSideYaowareFurnaceQuest'

const SPEAKER_YAO_MERCHANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '耀州瓷商 · 宋掌柜',
  title: '长安西市官窑瓷行东家',
  factionName: '关中商贾',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_WEIBEI_BLADE: StorySpeakerSpec = {
  kind: 'custom',
  name: '渭北刀客 · 孟黑虎',
  title: '关中绿林劫匪',
  factionName: '渭北绿林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildWeibeiBlade(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNS03_WEIBEI_BLADE',
    name: '渭北刀客 · 孟黑虎',
    title: '关中绿林劫匪',
    realm: '二流下品',
    factionName: '渭北绿林',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“耀州窑青釉刻牡丹三足博山炉，听说运到开封能换一座大宅子！道士，留下木匣饶你一命！”',
    stats: { hp: 960, mp: 420, agi: 42, res: 36 },
    talents: { bone: 64, comprehension: 52, charm: 34 },
    equippedArts: {
      neigong: 'MA-103',
      qinggong: 'MA-139',
      move1: 'MA-113',
      move2: 'MA-132',
    },
    learnedArts: [
      { artId: 'MA-103', level: 5 },
      { artId: 'MA-139', level: 5 },
      { artId: 'MA-113', level: 5 },
      { artId: 'MA-132', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zns03_01: {
    id: 'scene_zns03_01',
    title: '第一幕 · 丹炉生纹',
    subtitle: '终南山隐宗 · 道藏经阁与紫金丹院',
    illustrationUrl: '/assets/quests/zn_side03_alchemy_furnace.jpg',
    illustrationCaption: '紫金丹院青烟缭绕，林勇虎与谭涛俯身查验生出暗纹的旧香炉',
    mandatory: true,
    beats: [
      N('{reignYear}初夏，重阳古观道藏经阁与紫金丹院内药香浮动。林勇虎正蹲在丹台前愁眉苦脸，谭涛则小心翼翼用宣纸拓下一道细如发丝的裂纹。'),
      S('NPC-0530', '（见你步入丹院，叹气抱拳）“{gender:师弟|师妹}，这尊用了二十年的文火养丹熏炉竟被地火烘出了暗裂！若是强行开炉炼制下一批辟毒清心丹，只怕炉炸药毁。”'),
      S('NPC-0766', '“我前日打听到长安西市瓷行刚从铜川耀州窑运来一尊极品『耀州窑青釉刻牡丹三足博山炉』，釉厚胎密，聚烟锁气堪称一绝。偏巧我与林师兄脱不开身守火，不知{gender:师弟|师妹}可否代劳跑一趟西市？”'),
    ],
    onFinishEffects: [openScene('scene_zns03_02', ZHONGNAN_SIDE03_QUEST_ID)],
  },

  scene_zns03_02: {
    id: 'scene_zns03_02',
    title: '第二幕 · 领银下山',
    subtitle: '终南山隐宗 · 道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      P('（爽快应下）“采买山门器物本是分内之事。二位师兄放心守好丹火，我这便下山去长安西市将这尊耀州博山炉请回！”'),
      S('NPC-0530', '（递过一块丹院凭信与银票）“多谢{gender:师弟|师妹}！瓷行宋掌柜与我终南素有交情，凭此帖便可验货提炉。只是此炉乃耀州窑珍品，返山路上务必小心江湖宵小觊觎。”'),
    ],
    onFinishEffects: [openScene('scene_zns03_03', ZHONGNAN_SIDE03_QUEST_ID)],
  },

  scene_zns03_03: {
    id: 'scene_zns03_03',
    title: '第三幕 · 启程西市',
    subtitle: '终南山隐宗 · 道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      N('你收好丹院凭信，辞别林勇虎与谭涛，轻装简从下山直奔长安西市胡商坊。'),
    ],
    choices: [
      {
        id: 'zns03_go_xishi',
        label: '携丹院凭信下山，前往【京兆府 · 西市胡商坊】请取博山炉',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_SIDE03_QUEST_ID, stepId: 'buy_furnace_xishi' },
          setStep(ZHONGNAN_SIDE03_QUEST_ID, 'buy_furnace_xishi'),
          toast(
            '请前往【京兆府 · 西市胡商坊（ca_xishi_main）】向耀州瓷商请取「耀州窑青釉刻牡丹三足博山炉」。',
            'talk',
            '紫金丹火',
          ),
        ],
      },
    ],
  },

  scene_zns03_04: {
    id: 'scene_zns03_04',
    title: '第四幕 · 巧工青釉',
    subtitle: '京兆府 · 西市胡商坊',
    mandatory: true,
    beats: [
      N('长安西市胡商坊驼铃叮当、商贾云集。你寻至耀州瓷行，递上紫金丹院凭信。宋掌柜满面堆笑，亲自从后堂捧出一只楠木锦匣。'),
      N('开匣刹那，一尊通体青翠如橄榄、镂雕海山云气与盛开牡丹的三足博山炉映入眼帘，釉面温润如玉，轻叩之声清越如磬。'),
      S(SPEAKER_YAO_MERCHANT, '“终南山上的道爷果然识货！这尊『耀州窑青釉刻牡丹三足博山炉』乃耀州老师傅百里挑一的绝品。只是适才店外有几个挎大刀的渭北汉子贼眉鼠眼探头张望，{gender:少侠|女侠}回山路上可得留神！”'),
    ],
    onFinishEffects: [openScene('scene_zns03_05', ZHONGNAN_SIDE03_QUEST_ID)],
  },

  scene_zns03_05: {
    id: 'scene_zns03_05',
    title: '第五幕 · 封匣启归',
    subtitle: '京兆府 · 西市胡商坊',
    mandatory: true,
    beats: [
      P('（验明无瑕，稳稳合上楠木匣背负身后，谢过宋掌柜）“多谢掌柜提醒！几个绿林鼠辈，还动不了我终南山的东西！”'),
    ],
    choices: [
      {
        id: 'zns03_take_furnace',
        label: '背负耀州博山炉，启程护送返回终南【紫金丹院】',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'ITM-CUR-023', qty: 1 },
          setStep(ZHONGNAN_SIDE03_QUEST_ID, 'escort_back_alchemy'),
          toast(
            '已请得【耀州窑青釉刻牡丹三足博山炉】！请护送返回【终南山隐宗 · 道藏经阁与紫金丹院（zn_to_alchemy）】。',
            'talk',
            '紫金丹火',
          ),
        ],
      },
    ],
  },

  scene_zns03_06: {
    id: 'scene_zns03_06',
    title: '第六幕 · 山口截道',
    subtitle: '终南山口 · 松林石径',
    illustrationUrl: '/assets/quests/zn_side03_bandit_ambush.jpg',
    illustrationCaption: '终南山口松影森森，渭北悍匪挥刀拦道，白衣弟子背匣拔剑护珍炉',
    mandatory: true,
    beats: [
      N('你一路疾行返至终南山口松林，刚踏上青石山道，两侧林间骤然跃出数名手提鬼头大刀的彪悍汉子，为首一人满脸横肉，正是横行渭北的劫道刀客孟黑虎！'),
      S(SPEAKER_WEIBEI_BLADE, '（大刀一横，狞笑连连）“果然是终南的小道士！老子从西市一路跟到山口，听说你背匣里装着官窑绝品耀州博山炉！识相的把木匣解下来，爷爷放你上山！”'),
      P('（反手护住背后楠木匣，长剑清吟出鞘）“光天化日竟敢在终南山脚行劫，真是不知死活！想要宝炉，先问过我手中青锋！”'),
    ],
    choices: [
      {
        id: 'zns03_fight_blade',
        label: '护住博山炉，拔剑击退【渭北刀客 · 孟黑虎】！',
        subLabel: '对手：渭北刀客 · 孟黑虎（二流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_SIDE03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildWeibeiBlade() },
            rule: 'story_trial',
            introText: '【护炉退敌】于终南山口击退企图劫夺博山炉的【渭北刀客 · 孟黑虎】！',
            onWin: [openScene('scene_zns03_07', ZHONGNAN_SIDE03_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('孟黑虎刀势颇猛，好在博山炉未损！调息后再行击退此獠！', 'warn', '紫金丹火'),
            ],
          },
        ],
      },
    ],
  },

  scene_zns03_07: {
    id: 'scene_zns03_07',
    title: '第七幕 · 刀折匪溃',
    subtitle: '终南山口 · 松林石径',
    mandatory: true,
    beats: [
      N('你既护木匣不晃半分，剑招又如清风绕松灵动犀利，十余合便将孟黑虎逼得手忙脚乱，一剑挑飞其鬼头大刀！'),
      S(SPEAKER_WEIBEI_BLADE, '（骇然失色，连滚带爬招呼同伙）“终南剑法果然名不虚传！风紧扯呼，快撤！”'),
      N('一众渭北刀客丢盔弃甲狼狈逃窜，你轻拂剑身入鞘，迈步登上重阳古观。'),
    ],
    onFinishEffects: [openScene('scene_zns03_08', ZHONGNAN_SIDE03_QUEST_ID)],
  },

  scene_zns03_08: {
    id: 'scene_zns03_08',
    title: '第八幕 · 新炉燃香',
    subtitle: '终南山隐宗 · 道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      N('回到紫金丹院，你将完好无损的「耀州窑青釉刻牡丹三足博山炉」稳稳安放在丹台正中。林勇虎点起一炷终南柏子香投入炉腹，顷刻间青烟自镂空山峦峰顶袅袅升腾，宛若仙山云海！'),
      S('NPC-0530', '（大喜拍掌）“好炉！好釉！这聚烟锁气的火候比旧炉强出十倍不止！{gender:师弟|师妹}一路护炉退敌，真是辛苦你了！”'),
    ],
    onFinishEffects: [openScene('scene_zns03_09', ZHONGNAN_SIDE03_QUEST_ID)],
  },

  scene_zns03_09: {
    id: 'scene_zns03_09',
    title: '第九幕 · 赠丹酬功',
    subtitle: '终南山隐宗 · 道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      S('NPC-0766', '（捧出两个白玉药瓶郑重相赠）“新炉既得，今晨刚出炉的头批灵丹理当先敬功臣！这两瓶丹药固本培元、清心辟毒，还请{gender:师弟|师妹}务必收下！”'),
      P('（微笑接过玉瓶）“能助丹院续上紫金丹火，也是我的福分，多谢二位师兄！”'),
    ],
    onFinishEffects: [openScene('scene_zns03_10', ZHONGNAN_SIDE03_QUEST_ID)],
  },

  scene_zns03_10: {
    id: 'scene_zns03_10',
    title: '第十幕 · 丹香满院',
    subtitle: '终南山隐宗 · 道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      N('青釉博山炉幽香袅袅，紫金丹院重归宁静祥和。你收好灵丹辞别二位师兄，只觉丹香入腑，神清气爽。'),
    ],
    choices: [
      {
        id: 'zns03_complete',
        label: '交付博山炉，收下丹院秘炼灵丹与嘉奖',
        tone: 'gold',
        effects: [
          { type: 'removeItem', itemId: 'ITM-CUR-023', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-108', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-113', qty: 2 },
          { type: 'giveCombatExp', amount: 260, reason: '紫金丹火 · 耀州博山炉' },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0530' }, delta: 14 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0766' }, delta: 14 },
          { type: 'modifyRenown', delta: 20, reason: '完成门派差事《紫金丹火 · 耀州博山炉》' },
          { type: 'completeQuest', questId: ZHONGNAN_SIDE03_QUEST_ID, outcome: 'furnace_delivered' },
          toast(
            '【紫金丹火 · 耀州博山炉】完成！获赠紫金灵丹、战历与门派贡献！',
            'success',
            '紫金丹火',
          ),
        ],
      },
    ],
  },
}
