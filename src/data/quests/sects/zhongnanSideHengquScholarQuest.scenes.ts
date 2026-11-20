import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_SIDE02_QUEST_ID } from './zhongnanSideHengquScholarQuest'

const SPEAKER_BOOK_THIEF: StorySpeakerSpec = {
  kind: 'custom',
  name: '飞檐盗书贼 · 柳轻烟',
  title: '关中市井窃贼',
  factionName: '绿林盗匪',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

function buildBookThief(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNS02_BOOK_THIEF',
    name: '飞檐盗书贼 · 柳轻烟',
    title: '关中市井窃贼',
    realm: '三流中品',
    factionName: '绿林盗匪',
    avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
    talk: '“这卷唐代孤本《周易正义》可是有人出百两雪花银悬赏的！别挡道！”',
    stats: { hp: 640, mp: 300, agi: 38, res: 26 },
    talents: { bone: 50, comprehension: 58, charm: 45 },
    equippedArts: { neigong: 'MA-181', move1: 'MA-195', move2: 'MA-187' },
    learnedArts: [{ artId: 'MA-181', level: 4 }, { artId: 'MA-195', level: 3 }, { artId: 'MA-187', level: 3 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zns02_01: {
    id: 'scene_zns02_01',
    title: '第一幕 · 虎皮讲席',
    subtitle: '京兆府 · 长安横渠关学书院',
    illustrationUrl: '/assets/quests/zn_side02_hengqu_lecture.jpg',
    illustrationCaption: '古槐之下青衿环坐，张载坐拥虎皮高座论易讲学，气象轩昂',
    mandatory: true,
    beats: [
      N('{reignYear}秋高气爽，长安横渠关学书院古槐掩映，院中座无虚席。青衫高冠的张载端坐讲席，目光炯炯如炬，正为数十名关中士子剖析《易经》乾坤之理。'),
      S(
        'NPC-0048',
        '（见你负剑立于廊下静听，神色微喜，拱手相邀）“终南山中多高士，这位佩剑道友既临书院，不妨入座共议——道家言清静无为，儒门言刚健自强，不知{gender:少侠|女侠}如何看待二者异同？”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns02_02', ZHONGNAN_SIDE02_QUEST_ID)],
  },

  scene_zns02_02: {
    id: 'scene_zns02_02',
    title: '第二幕 · 儒道辩难',
    subtitle: '京兆府 · 长安横渠关学书院',
    mandatory: true,
    beats: [
      P(
        '（从容步入讲堂，向张载与满座士子一揖）“先生大才，晚辈敢陈浅见：道门守清静，非避世偷安，乃欲澄澈本心、不为私欲所蔽；一旦苍生有难、边塞有警，拔剑济世亦是顺应天道。此与先生『民胞物与』之旨，岂非殊途同归？”',
      ),
      S(
        'NPC-0048',
        '（抚掌大笑，眼中大放异彩）“善哉！好一个『澄心以守道，拔剑以济世』！张某平生最喜闻这般既有浩然气、又不失务实心之言！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns02_03', ZHONGNAN_SIDE02_QUEST_ID)],
  },

  scene_zns02_03: {
    id: 'scene_zns02_03',
    title: '第三幕 · 谈兵论剑',
    subtitle: '京兆府 · 长安横渠关学书院',
    mandatory: true,
    beats: [
      N('讲学散后，张载邀你至后院石亭煮茶。原来这位关学宗师早年亦喜谈兵，曾欲结客夺取洮西故地，对终南剑道与西北防务兴致极浓。'),
      S(
        'NPC-0048',
        '（以竹枝在青石地上画弧，朗声笑道）“儒生不可手无缚鸡之力，侠客亦不可胸无经纬之学。{gender:少侠|女侠}若不嫌弃，可愿与张某以竹代剑切磋几招，印证一下刚柔之理？”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns02_04', ZHONGNAN_SIDE02_QUEST_ID)],
  },

  scene_zns02_04: {
    id: 'scene_zns02_04',
    title: '第四幕 · 竹剑印心',
    subtitle: '京兆府 · 长安横渠关学书院',
    mandatory: true,
    beats: [
      N('二人在古槐下以竹枝拆解十余合，张载招式大开大阖、直来直去，颇具古君子坦荡之风；你则以终南轻灵剑意顺势引导，点到即止。'),
      S(
        'NPC-0048',
        '（收竹大笑，慨然长叹）“畅快！今日与终南高徒论道试剑，胸中块垒尽消！我正有一封请安手书要呈交知永兴军晏殊晏相公，顺道向相公举荐你这位文武兼修的奇才，不知可否劳烦跑一趟京兆府衙？”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns02_05', ZHONGNAN_SIDE02_QUEST_ID)],
  },

  scene_zns02_05: {
    id: 'scene_zns02_05',
    title: '第五幕 · 持书赴衙',
    subtitle: '京兆府 · 长安横渠关学书院',
    mandatory: true,
    beats: [
      P('（双手接过封缄严密的书信）“晏相公乃当世词宗名相，晚辈久仰大名，定当亲手将先生书信奉上！”'),
    ],
    choices: [
      {
        id: 'zns02_go_yamen',
        label: '持张载手书，前往【永兴军路京兆府衙】拜会晏殊相公',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_SIDE02_QUEST_ID, stepId: 'visit_yanshu_yamen' },
          setStep(ZHONGNAN_SIDE02_QUEST_ID, 'visit_yanshu_yamen'),
          toast(
            '已得张载荐书！请前往【京兆府 · 永兴军路京兆府衙（changan_base_yamen）】拜会晏殊。',
            'talk',
            '横渠问剑',
          ),
        ],
      },
    ],
  },

  scene_zns02_06: {
    id: 'scene_zns02_06',
    title: '第六幕 · 府衙拜相',
    subtitle: '京兆府 · 永兴军路京兆府衙',
    mandatory: true,
    beats: [
      N('你来到永兴军路京兆府衙，递上张载名帖。片刻后，雅望清高的名相晏殊亲自于后堂书斋相见。他须发微霜，气度雍容，正执卷批阅公文。'),
      S(
        'NPC-0017',
        '（拆阅张载书信，抚须微笑）“子厚素来眼高于顶，信中竟对终南这位年轻{gender:少侠|女侠}赞不绝口，称你兼具『清虚道骨与济世儒心』。坐吧，老夫这里正好有新沏的阳羡茶。”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns02_07', ZHONGNAN_SIDE02_QUEST_ID)],
  },

  scene_zns02_07: {
    id: 'scene_zns02_07',
    title: '第七幕 · 书阁惊变',
    subtitle: '京兆府 · 永兴军路京兆府衙',
    mandatory: true,
    beats: [
      N('二人正谈论唐宋诗风与关中旧事，忽闻后院藏书阁方向传来一声急喝与瓦片碎裂之声！'),
      S(
        'NPC-0637',
        '（一道矫健身影掠过回廊，正是奉命巡视府衙的江湖好手徐弘毅，急声大喊）“相公当心！有个轻功甚佳的毛贼摸进了藏书阁，偷走了唐代孤本《周易正义》正往东墙逃窜！”',
      ),
      S('NPC-0017', '（神色一凛）“那卷孤本乃关中先贤手泽，绝不可落入宵小之手！”'),
    ],
    onFinishEffects: [openScene('scene_zns02_08', ZHONGNAN_SIDE02_QUEST_ID)],
  },

  scene_zns02_08: {
    id: 'scene_zns02_08',
    title: '第八幕 · 飞檐截贼',
    subtitle: '京兆府 · 永兴军路京兆府衙',
    illustrationUrl: '/assets/quests/zn_side02_roof_chase.jpg',
    illustrationCaption: '长安府衙飞檐之上，白衣终南剑客与徐弘毅夹击怀揣古籍的盗书贼',
    mandatory: true,
    beats: [
      P('（起身拱手）“相公勿忧，晚辈去助徐兄拦下此贼！”'),
      N('你提纵终南轻功掠上东墙飞檐，正与徐弘毅形成前后夹击之势，将那名怀揣锦盒的盗书毛贼堵在琉璃瓦脊之上！'),
      S(SPEAKER_BOOK_THIEF, '（见前无去路，咬牙掷出两枚飞镖）“好个多管闲事的道士！看镖！”'),
    ],
    choices: [
      {
        id: 'zns02_fight_thief',
        label: '联手徐弘毅，于府衙飞檐擒拿【盗书毛贼 · 柳轻烟】！',
        subLabel: '对手：飞檐盗书贼（三流中品）· 助阵：徐弘毅',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_SIDE02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBookThief() },
            allies: [{ kind: 'npc', npcId: 'NPC-0637' }],
            rule: 'story_trial',
            introText: '【护阁擒贼】与徐弘毅联手在京兆府衙屋脊擒拿【飞檐盗书贼 · 柳轻烟】！',
            onWin: [openScene('scene_zns02_09', ZHONGNAN_SIDE02_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('盗书贼轻功滑溜暗器刁钻！整备后再于京兆府衙截击！', 'warn', '横渠问剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_zns02_09: {
    id: 'scene_zns02_09',
    title: '第九幕 · 完璧归赵',
    subtitle: '京兆府 · 永兴军路京兆府衙',
    mandatory: true,
    beats: [
      N('你轻舒长袖格开飞镖，徐弘毅则从侧翼一记凌厉擒拿锁住贼人腕脉。二人配合天衣无缝，数合间便将柳轻烟生擒活捉，锦盒中的唐代孤本《周易正义》完好无损！'),
      S('NPC-0637', '（拍手大笑，向你抱拳）“终南{gender:少侠|女侠}好俊的轻功与眼力！若非你及时登檐堵截，这滑头险些翻墙逃进坊市暗巷了！”'),
    ],
    onFinishEffects: [openScene('scene_zns02_10', ZHONGNAN_SIDE02_QUEST_ID)],
  },

  scene_zns02_10: {
    id: 'scene_zns02_10',
    title: '第十幕 · 名相嘉许',
    subtitle: '京兆府 · 永兴军路京兆府衙',
    mandatory: true,
    beats: [
      N('衙役将贼人押入大牢后，晏殊捧着失而复得的唐代孤本连声称谢，当即命人取来笔墨，亲笔书写一幅《关中论学诗笺》相赠。'),
      S(
        'NPC-0017',
        '（微笑赠笺）“既能与子厚论经辨理，又能于飞檐之上护持典籍，真正做到『文能安邦、武能定乱』。老夫这几句粗诗与一番经史心得，便赠与{gender:少侠|女侠}留念吧。”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns02_11', ZHONGNAN_SIDE02_QUEST_ID)],
  },

  scene_zns02_11: {
    id: 'scene_zns02_11',
    title: '第十一幕 · 立心立命',
    subtitle: '京兆府 · 永兴军路京兆府衙',
    mandatory: true,
    beats: [
      N('你展卷细读晏殊词句，又回味方才在横渠书院与张载的儒道之辩，只觉经义、诗词与辩才皆豁然贯通，心境更上一层楼。'),
      P('（郑重拜谢）“谢晏相公厚赐！晚辈定当铭记张先生与相公教诲，不负终南清名！”'),
    ],
    onFinishEffects: [openScene('scene_zns02_12', ZHONGNAN_SIDE02_QUEST_ID)],
  },

  scene_zns02_12: {
    id: 'scene_zns02_12',
    title: '第十二幕 · 书剑同归',
    subtitle: '京兆府 · 永兴军路京兆府衙',
    mandatory: true,
    beats: [
      N('步出京兆府衙，长安秋阳正好。经此一番长安问道与护阁擒贼，你于儒道文心与江湖侠气之间，又多了一分从容自得。'),
    ],
    choices: [
      {
        id: 'zns02_complete',
        label: '珍藏名相诗笺，铭记横渠立心立命之志',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '诗词', delta: 1 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'giveCombatExp', amount: 220, reason: '横渠问剑 · 立心立命录' },
          { type: 'modifyRenown', delta: 35, reason: '长安横渠论道、京兆府衙护孤本' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0048' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0017' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0637' }, delta: 12 },
          { type: 'completeQuest', questId: ZHONGNAN_SIDE02_QUEST_ID, outcome: 'scholar_sword_united' },
          toast(
            '【横渠问剑 · 立心立命录】完成！经义+1、诗词+1、辩才+1，名望与战历皆有收获！',
            'success',
            '横渠问剑',
          ),
        ],
      },
    ],
  },
}
