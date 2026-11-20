import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_SIDE07_QUEST_ID } from './zhongnanSideHuashanEnvoyQuest'

const SPEAKER_GREENWOOD_CHIEF: StorySpeakerSpec = {
  kind: 'custom',
  name: '「断河鬼斧」焦霸天',
  title: '受雇截帖的关中绿林头目',
  factionName: '黄河绿林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildGreenwoodChief(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNS07_GREENWOOD_CHIEF',
    name: '「断河鬼斧」焦霸天',
    title: '受雇截帖的关中绿林头目',
    realm: '二流上品',
    factionName: '黄河绿林',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“金主出了五百两黄金买这封华山剑帖！终南与华山的崽子，统统留命在潼关瓮城吧！”',
    stats: { hp: 1480, mp: 680, agi: 52, res: 46 },
    talents: { bone: 74, comprehension: 56, charm: 32 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-131', move2: 'MA-124' },
    learnedArts: [{ artId: 'MA-140', level: 6 }, { artId: 'MA-131', level: 6 }, { artId: 'MA-124', level: 5 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zns07_01: {
    id: 'scene_zns07_01',
    title: '第一幕 · 草堂遇险',
    subtitle: '京兆府 · 终南草堂',
    illustrationUrl: '/assets/quests/zn_side07_caotang_rescue.jpg',
    illustrationCaption: '秋林草堂竹篱之前，负伤的华山女侠紧捂鎏金剑帖，终南弟子挺身扶救',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，京兆府南郊终南草堂竹林萧瑟。你正欲回山，忽见一名青衣女侠捂着流血的左肩踉跄跌入竹篱，正是华山派素有「青眼娥」之称的苏秋桃！'),
      S(
        'NPC-0285',
        '（勉强支剑撑地，见你终南道袍，长松一口气）“幸好遇见终南同道……我奉师门之命携『秦晋关中联防密帖』东返华山，不料行踪泄露，遭一伙受西夏重金收买的绿林悍匪连番伏击！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns07_02', ZHONGNAN_SIDE07_QUEST_ID)],
  },

  scene_zns07_02: {
    id: 'scene_zns07_02',
    title: '第二幕 · 敷药问情',
    subtitle: '京兆府 · 终南草堂',
    mandatory: true,
    beats: [
      N('你急忙扶她入堂静坐，取出终南金创药为其止血包扎，又以精纯内力助她理顺紊乱真气。'),
      S(
        'NPC-0285',
        '（脸色稍缓，忧心忡忡）“那伙绿林贼首名叫『断河鬼斧』焦霸天，已带人在东去潼关的必经之路上设伏。我如今肩伤未愈，单凭一人绝难闯过潼关瓮城……只是这封密帖干系终南与华山两派联防大计，万万耽搁不得！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns07_03', ZHONGNAN_SIDE07_QUEST_ID)],
  },

  scene_zns07_03: {
    id: 'scene_zns07_03',
    title: '第三幕 · 仗义护行',
    subtitle: '京兆府 · 终南草堂',
    mandatory: true,
    beats: [
      P(
        '（沉声抱拳，目光坚定）“秦岭终南与西岳华山唇齿相依！苏姑娘既为两派联防负伤，我岂能袖手旁观？由我护送姑娘与剑帖东赴潼关，一路上但有绿林拦路，我一剑斩之！”',
      ),
      S('NPC-0285', '（感激涕零，起身致谢）“多谢{gender:少侠|女侠}大义！我已放信鸽通知华山梁惊风师兄在潼关天险瓮城接应，咱们这就动身！”'),
    ],
    onFinishEffects: [openScene('scene_zns07_04', ZHONGNAN_SIDE07_QUEST_ID)],
  },

  scene_zns07_04: {
    id: 'scene_zns07_04',
    title: '第四幕 · 踏秋东行',
    subtitle: '京兆府 · 终南草堂',
    mandatory: true,
    beats: [
      N('你收拾行囊，护着苏秋桃避开官道耳目，沿渭水南岸古道疾驰东向潼关。'),
    ],
    choices: [
      {
        id: 'zns07_go_tongguan',
        label: '护送苏秋桃与剑帖东行，前往【潼关 / 西岳华山 · 潼关天险瓮城】',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_SIDE07_QUEST_ID, stepId: 'escort_to_tongguan' },
          setStep(ZHONGNAN_SIDE07_QUEST_ID, 'escort_to_tongguan'),
          toast(
            '请护送苏秋桃前往【潼关 / 西岳华山 · 潼关天险瓮城（tg_ft_barbican）】会合梁惊风！',
            'talk',
            '秦晋同盟',
          ),
        ],
      },
    ],
  },

  scene_zns07_05: {
    id: 'scene_zns07_05',
    title: '第五幕 · 瓮城杀机',
    subtitle: '潼关 / 西岳华山 · 潼关天险瓮城',
    mandatory: true,
    beats: [
      N('一日后，巍峨雄壮的潼关天险瓮城映入眼帘，黄河涛声震耳欲聋。刚踏入瓮城青石坪，一阵刺耳的啸声骤然撕裂长空——十余名提刀携斧的绿林恶汉自城垛阴影跃出，为首铁塔巨汉正是「断河鬼斧」焦霸天！'),
      N('城楼一侧剑光如朝阳初升，华山派「朝阳快剑」梁惊风早已拔剑拦住数名匪徒，见你们抵达，高声大呼！'),
      S('NPC-0203', '“苏师妹！终南义士！焦霸天这厮纠集了黄河绿林死士堵死瓮城口，快与梁某联手杀出重围！”'),
    ],
    onFinishEffects: [openScene('scene_zns07_06', ZHONGNAN_SIDE07_QUEST_ID)],
  },

  scene_zns07_06: {
    id: 'scene_zns07_06',
    title: '第六幕 · 双剑合璧斩枭雄',
    subtitle: '潼关 / 西岳华山 · 潼关天险瓮城',
    illustrationUrl: '/assets/quests/zn_side07_tongguan_clash.jpg',
    illustrationCaption: '潼关雄城烽火之下，终南弟子与梁惊风并肩迎战挥舞双斧的绿林悍匪',
    mandatory: true,
    beats: [
      S(SPEAKER_GREENWOOD_CHIEF, '（双板斧重重相击迸出火星，狂笑震天）“来得正好！终南与华山的剑客一起收拾，老子今天就能向金主领双份赏金！”'),
      P('（护住苏秋桃退至城墙死角，旋即挺剑并立梁惊风身旁）“梁兄，你守左翼快剑破其喽啰，这绿林头目交给我与你合击！”'),
    ],
    choices: [
      {
        id: 'zns07_fight_chief',
        label: '助梁惊风迎战绿林头目【「断河鬼斧」焦霸天】！',
        subLabel: '对手：焦霸天（二流上品）· 助阵：梁惊风',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_SIDE07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildGreenwoodChief() },
            allies: [{ kind: 'npc', npcId: 'NPC-0203' }],
            rule: 'story_trial',
            introText: '【瓮城截匪】与梁惊风联手于潼关天险瓮城斩除【「断河鬼斧」焦霸天】！',
            onWin: [openScene('scene_zns07_07', ZHONGNAN_SIDE07_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('焦霸天斧势凶猛无比！退回瓮城楼角调息后再与梁惊风合击！', 'warn', '秦晋同盟'),
            ],
          },
        ],
      },
    ],
  },

  scene_zns07_07: {
    id: 'scene_zns07_07',
    title: '第七幕 · 雄关肃清',
    subtitle: '潼关 / 西岳华山 · 潼关天险瓮城',
    mandatory: true,
    beats: [
      N('朝阳快剑迅疾如电，终南剑气圆融凌厉！二人双剑交辉，十余合便将焦霸天双斧震飞，终南一剑直透其护身煞气，将其彻底击溃伏诛！余众绿林见头目授首，作鸟兽散。'),
      S('NPC-0203', '（收剑大笑，重重拍了拍你肩头）“好俊的终南剑法！今日能与{gender:少侠|女侠}在潼关瓮城并肩破贼，真乃平生一大快事！”'),
    ],
    onFinishEffects: [openScene('scene_zns07_08', ZHONGNAN_SIDE07_QUEST_ID)],
  },

  scene_zns07_08: {
    id: 'scene_zns07_08',
    title: '第八幕 · 托付密帖',
    subtitle: '潼关 / 西岳华山 · 潼关天险瓮城',
    mandatory: true,
    beats: [
      S(
        'NPC-0285',
        '（面带惭色取出鎏金剑帖递来）“我左肩伤口方才又崩裂了些，恐难即刻攀登玉女峰。梁师兄须留守瓮城清点匪尸、照料于我，还请{gender:少侠|女侠}亲登玉女峰紫霞道观，将此联防剑帖面呈宁清羽师叔！”',
      ),
      P('（接过鎏金剑帖郑重收好）“苏姑娘安心养伤，梁兄多加照拂！我这就登玉女峰面呈宁前辈！”'),
    ],
    onFinishEffects: [openScene('scene_zns07_09', ZHONGNAN_SIDE07_QUEST_ID)],
  },

  scene_zns07_09: {
    id: 'scene_zns07_09',
    title: '第九幕 · 登临西岳',
    subtitle: '潼关 / 西岳华山 · 苍龙岭石阶',
    mandatory: true,
    beats: [
      N('辞别梁惊风与苏秋桃，你足踏险峻华山古道，直上玉女峰紫霞道观。'),
    ],
    choices: [
      {
        id: 'zns07_go_zixia',
        label: '携密帖登上【玉女峰紫霞道观 · 洗头盆清泉演剑院】面见宁清羽',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_SIDE07_QUEST_ID, 'deliver_letter_zixia'),
          toast(
            '绿林截匪已除！请前往【潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院（tg_zx_spring）】面呈密帖予宁清羽。',
            'talk',
            '秦晋同盟',
          ),
        ],
      },
    ],
  },

  scene_zns07_10: {
    id: 'scene_zns07_10',
    title: '第十幕 · 洗头盆泉',
    subtitle: '潼关 / 西岳华山 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('玉女峰紫霞道观云雾缭绕，洗头盆清泉演剑院内剑气清越。素有「玉女剑仙」美誉的宁清羽正临泉擦拭长剑，见你持鎏金剑帖登院，连忙起身迎上。'),
      S(
        'NPC-0166',
        '（拆阅剑帖，神色由凝重转为欣慰）“果然是终南隐宗发来的关中联防密帖！方才听闻山下瓮城有绿林设伏，正忧心秋桃安危，不想竟蒙终南{gender:少侠|女侠}千里相救、更联手惊风斩除匪首！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns07_11', ZHONGNAN_SIDE07_QUEST_ID)],
  },

  scene_zns07_11: {
    id: 'scene_zns07_11',
    title: '第十一幕 · 秦晋结盟',
    subtitle: '潼关 / 西岳华山 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      P('（拱手还礼）“终南与华山同镇关中、共扼秦晋咽喉，外敌当前自当守望相助，何足挂齿。”'),
      S(
        'NPC-0166',
        '（神色肃然，举剑为誓）“请转告终南诸位道长：华山派已收悉密帖！自今日起，西岳与终南互通边报、互为犄角，凡有西夏或辽国细作敢犯关中一步，两派共击之！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns07_12', ZHONGNAN_SIDE07_QUEST_ID)],
  },

  scene_zns07_12: {
    id: 'scene_zns07_12',
    title: '第十二幕 · 清泉论剑',
    subtitle: '潼关 / 西岳华山 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('为表谢忱，宁清羽特于洗头盆清泉边为你演练了一套华山玉女剑意中的转折轻灵之法，又赠予数枚华山秘制丹药与回信剑符。'),
      S('NPC-0166', '“终南玉女剑法与我华山玉女十九剑虽名同脉异，却皆以灵动清雅见长。今日与{gender:少侠|女侠}以泉印剑，倒也相得益彰！”'),
    ],
    onFinishEffects: [openScene('scene_zns07_13', ZHONGNAN_SIDE07_QUEST_ID)],
  },

  scene_zns07_13: {
    id: 'scene_zns07_13',
    title: '第十三幕 · 西岳长风',
    subtitle: '潼关 / 西岳华山 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('你细细领悟宁清羽演剑时的精妙步法，只觉触类旁通，剑意更添三分清逸。'),
    ],
    onFinishEffects: [openScene('scene_zns07_14', ZHONGNAN_SIDE07_QUEST_ID)],
  },

  scene_zns07_14: {
    id: 'scene_zns07_14',
    title: '第十四幕 · 同盟永固',
    subtitle: '潼关 / 西岳华山 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('夕阳照彻西岳千峰，秦岭与华山遥遥相望。此番送帖结盟，不仅挫败了西夏离间关中武林的阴谋，更令终南与华山两派情谊愈加深厚！'),
    ],
    choices: [
      {
        id: 'zns07_complete',
        label: '收下华山回盟剑符与谢礼，圆满完成秦晋同盟之行',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'ITM-MED-111', qty: 2 },
          { type: 'giveItem', itemId: 'ITM-MED-115', qty: 2 },
          { type: 'giveCombatExp', amount: 420, reason: '秦晋同盟 · 西岳送剑帖' },
          { type: 'modifyRenown', delta: 65, reason: '护送华山密帖、斩除潼关绿林头目' },
          { type: 'modifyChivalry', delta: 45, reason: '义救同道、促成秦晋联防' },
          { type: 'addSectContribution', amount: 280 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0285' }, delta: 18 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0203' }, delta: 16 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0166' }, delta: 18 },
          { type: 'completeQuest', questId: ZHONGNAN_SIDE07_QUEST_ID, outcome: 'huashan_alliance' },
          toast(
            '【秦晋同盟 · 西岳送剑帖】完成！终南与华山同盟永固，获丰厚战历、名望与灵丹！',
            'success',
            '秦晋同盟',
          ),
        ],
      },
    ],
  },
}
