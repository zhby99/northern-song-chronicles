import type { DynamicQuestNpc, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, toast, openScene } from '../../../engine/quest/dsl'

export const SHAOLIN_ENTRY_QUEST_ID = 'QST-SECT-01-ENTRY'

export const SHAOLIN_BROKER_ACTOR_ID = 'ACT-LUOYANG-JIA-TONGBAO'

export const SHAOLIN_LUOYANG_BROKER_ACTOR: DynamicQuestNpc = {
  actorId: SHAOLIN_BROKER_ACTOR_ID,
  questId: SHAOLIN_ENTRY_QUEST_ID,
  regionId: 'luoyang',
  buildingId: 'luoyang_base_tavern',
  spotId: null,
  name: '贾通宝',
  title: '洛阳牙人 · 市井包打听',
  realm: '不入流',
  badgeLabel: '少林门路',
  factionId: 'ORG-01',
  factionName: '江湖散人',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  talk: '“嘿，少室山那座天下第一禅林门槛高得很！不过嘛，佛祖金身也是拿黄白之物塑出来的——咱们若投缘，小人倒认得山上知客院的门路……”',
  stats: {
    hp: 260,
    mp: 90,
    agi: 20,
    res: 10,
    isBenchmark: false,
  },
  talents: {
    bone: 38,
    comprehension: 58,
    charm: 56,
  },
  equippedArts: {
    neigong: 'MA-199', // 粗浅呼吸法
    qinggong: 'MA-218', // 翻滚躲闪步
    move1: 'MA-201', // 市井王八拳
    move2: 'MA-204', // 护院拦门掌
    move3: null,
    move4: null,
  },
  learnedArts: [
    { artId: 'MA-199', level: 1, exp: 0 },
    { artId: 'MA-218', level: 1, exp: 0 },
    { artId: 'MA-201', level: 2, exp: 0 },
    { artId: 'MA-204', level: 1, exp: 0 },
  ],
  equipped: {
    weapon: 'WPN-083', // 生牛皮裹指拳带（凡阶中品）
    armor: 'ARM-044', // 市井茶博士围裙衫（凡阶中品）
    shoes: 'BOT-023', // 江南油布雨屐（凡阶中品）
    bow: 'BOW-022', // 关洛镖局防盗短弓（凡阶中品）
    accessory1: 'ACC-041', // 市井红绳铜钱串（凡阶中品）
    accessory2: 'ACC-043', // 粗皮护腕（凡阶中品）
    mount: 'MNT-022', // 淮南盐道负重挽马（凡阶中品）
    curio1: null,
    curio2: null,
  },
}

export const SHAOLIN_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_ENTRY_QUEST_ID,
    title: '嵩门问心 · 佛缘有价',
    category: 'sect_entry',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '不入流',
    recommendedNote:
      '需备妥 250 两纹银打点门路（且洛阳酒楼牙人贾通宝好感度 ≥ 10），并在少林山门累计杂役满 365 天后正式拜入外门（默认授俗家弟子；随时可找玄慈方丈剃度为出家弟子「慧见」以解锁地阶/天阶绝学）。',
    startHint:
      '前往嵩山少林寺【大雄宝殿方丈院 · 钟鼓禅院】拜见知客禅师玄净，或赴【洛阳府 · 洛水天津酒楼】探听少林收徒传闻。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      customLabel: '嵩山少林寺 · 钟鼓禅院（玄净）',
    },
    startCondition: {
      type: 'all',
      conditions: [
        { type: 'notInAnySect' },
        flag('shaolin_novice_state', 'eq', 'none'),
        { type: 'npcAlive', npcId: 'NPC-0193', npcName: '玄净' },
        { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
      ],
    },
    summary:
      '天下武功出少林，然少室山门清规森严，知客禅师玄净两道问心题字字挑刺，总道寻常求艺者「佛缘不足」。须往洛阳天津酒楼探得香火打点之秘，备足纹银托人通融，再经山门三百六十五日杂役磨砺，方得拜入千年古刹。',
    initialStepId: 'seek_luoyang_rumor',
    steps: {
      seek_luoyang_rumor: {
        id: 'seek_luoyang_rumor',
        title: '洛水酒肆探门道',
        objective:
          '知客禅师玄净百般挑刺，称少侠「佛缘不足」拒之门外。下山前往邻近的【洛阳府 · 洛水天津酒楼】，听听酒客们对少林寺收徒内情的议论。',
        nextHint: '前往洛阳府【洛水天津酒楼】打探少林收徒风声',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'luoyang_base_tavern',
          customLabel: '洛阳府 · 洛水天津酒楼',
        },
      },
      bribe_broker: {
        id: 'bribe_broker',
        title: '结交牙人递香火',
        objective:
          '在洛水天津酒楼听牙人【贾通宝】谈及隔壁王员外花 200 两银子贿赂知客禅师送子上少林之事。将【贾通宝】好感度提升至 ≥ 10（可通过交谈或赠礼），并备妥 250 两纹银托他代递香火银。',
        nextHint: '提升洛水天津酒楼【贾通宝】好感度至 10，奉上 250 两纹银托其打点知客禅师',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'luoyang_base_tavern',
          customLabel: '洛阳府 · 洛水天津酒楼（贾通宝）',
        },
        prereqCondition: {
          type: 'all',
          conditions: [
            {
              type: 'npcFavorAtLeast',
              npcId: SHAOLIN_BROKER_ACTOR_ID,
              min: 10,
              npcName: '贾通宝',
            },
            { type: 'silverAtLeast', min: 250 },
          ],
        },
      },
      wait_ten_days: {
        id: 'wait_ten_days',
        title: '静候十日通关节',
        objective:
          '已将 250 两纹银交予洛阳牙人【贾通宝】上山打点知客院。需耐心等待 10 天，待期满后返回【洛阳府 · 洛水天津酒楼】向贾通宝打听回音。',
        nextHint: '等待满 10 天后，回洛阳【洛水天津酒楼】找贾通宝听信',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'luoyang_base_tavern',
          customLabel: '洛阳府 · 洛水天津酒楼',
        },
      },
      hear_broker_result: {
        id: 'hear_broker_result',
        title: '酒楼重晤听佳音',
        objective:
          '十日之期已满！前往【洛阳府 · 洛水天津酒楼】与牙人【贾通宝】会面，确认少林知客禅师处是否已打点妥当。',
        nextHint: '前往洛阳【洛水天津酒楼】找贾通宝确认回音',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'luoyang_base_tavern',
          customLabel: '洛阳府 · 洛水天津酒楼（贾通宝）',
        },
      },
      revisit_xuanjing: {
        id: 'revisit_xuanjing',
        title: '重登嵩山复问心',
        objective:
          '贾通宝已将银两打点妥当！重返【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院】，再次找知客禅师【玄净】回答那两道问心题。',
        nextHint: '赴嵩山少林寺【钟鼓禅院】找知客禅师玄净复试佛缘',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_west',
          customLabel: '嵩山少林寺 · 钟鼓禅院（玄净）',
        },
      },
      mountain_gate_chores: {
        id: 'mountain_gate_chores',
        title: '山门杂役满周岁',
        objective:
          '已获录为【少林寺杂役弟子】（暂不算正式少林弟子）。在【嵩山少林寺】山门全景界面可自选天数进行洒扫担水杂役，累计做满 365 天后正式引荐拜入少林外门！',
        nextHint: '在嵩山少林寺山门进行杂役劳作，累计满 365 天后正式入门',
        targetLocation: {
          regionId: 'shaolin',
          customLabel: '嵩山少林寺 · 山门石阶（杂役当值）',
        },
      },
    },

    onDeadlineExpired: {
      stepId: 'wait_ten_days',
      effects: [
        {
          type: 'setQuestStep',
          questId: SHAOLIN_ENTRY_QUEST_ID,
          stepId: 'hear_broker_result',
          deadlineDays: null,
        },
        toast('十日之期已满！洛阳【洛水天津酒楼】的牙人贾通宝想必已从少室山打点归来，速去酒楼寻他问信！', 'success', '少林回音'),
      ],
    },

    locationTriggers: [
      {
        id: 'trig_luoyang_tavern_shaolin_gossip',
        regionId: 'luoyang',
        buildingId: 'luoyang_base_tavern',
        onceFlag: 'shaolin_luoyang_gossip_heard',
        condition: {
          type: 'all',
          conditions: [
            { type: 'notInAnySect' },
            flag('shaolin_novice_state', 'eq', 'none'),
            qStatus(SHAOLIN_ENTRY_QUEST_ID, 'not_completed'),
          ],
        },
        effects: [
          {
            type: 'spawnDynamicActor',
            actor: SHAOLIN_LUOYANG_BROKER_ACTOR,
          },
          openScene('scene_luoyang_tavern_shaolin_rumor', 'QST-SECT-01-ENTRY'),
        ],
      },
      {
        id: 'trig_luoyang_tavern_broker_ready',
        regionId: 'luoyang',
        buildingId: 'luoyang_base_tavern',
        onceFlag: 'shaolin_broker_reported',
        condition: atStep(SHAOLIN_ENTRY_QUEST_ID, 'hear_broker_result'),
        effects: [
          openScene('scene_shaolin_broker_done', 'QST-SECT-01-ENTRY'),
        ],
      },
    ],

    npcActions: [
      // 1) 打点前：找知客禅师玄净考问两道题（2×2 四种组合均被反驳佛缘不足）
      {
        id: 'act_shaolin_xuanjing_unbribed_quiz',
        label: '求拜少林 · 问心试佛缘',
        badge: '少林入门',
        tone: 'primary',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0193'] },
            { type: 'notInAnySect' },
            flag('shaolin_novice_state', 'eq', 'none'),
            flag('shaolin_bribe_ready', 'falsy'),
          ],
        },
        effects: [
          openScene('scene_shaolin_unbribed_q1', 'QST-SECT-01-ENTRY'),
        ],
      },

      // 2) 洛阳酒楼：向贾通宝递 250 两银子（需好感度 >= 10）
      {
        id: 'act_shaolin_bribe_jia_tongbao',
        label: '托其代递少林香火银（250两）',
        badge: '疏通佛缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', dynamicActorIds: [SHAOLIN_BROKER_ACTOR_ID] },
            { type: 'notInAnySect' },
            atStep(SHAOLIN_ENTRY_QUEST_ID, 'bribe_broker'),
          ],
        },
        enabledWhen: {
          type: 'all',
          conditions: [
            {
              type: 'npcFavorAtLeast',
              npcId: SHAOLIN_BROKER_ACTOR_ID,
              min: 10,
              npcName: '贾通宝',
            },
            { type: 'silverAtLeast', min: 250 },
          ],
        },
        effects: [
          openScene('scene_shaolin_pay_broker', 'QST-SECT-01-ENTRY'),
        ],
      },

      // 3) 10 天等待期内的状态提示按钮
      {
        id: 'act_shaolin_broker_waiting_hint',
        label: '打听少林回音（尚未满十日之期）',
        badge: '打点中',
        tone: 'default',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', dynamicActorIds: [SHAOLIN_BROKER_ACTOR_ID] },
            atStep(SHAOLIN_ENTRY_QUEST_ID, 'wait_ten_days'),
          ],
        },
        enabledWhen: {
          type: 'flag',
          flag: 'shaolin_bribe_ready',
          op: 'truthy',
          label: '须待交银满 10 天后方有回音',
        },
        effects: [],
      },

      // 4) 满 10 天后若玩家已在酒楼内直接点贾通宝对话亦可推进
      {
        id: 'act_shaolin_broker_hear_result',
        label: '询问少林打点回音',
        badge: '已有佳音',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', dynamicActorIds: [SHAOLIN_BROKER_ACTOR_ID] },
            atStep(SHAOLIN_ENTRY_QUEST_ID, 'hear_broker_result'),
          ],
        },
        effects: [
          openScene('scene_shaolin_broker_done', 'QST-SECT-01-ENTRY'),
        ],
      },

      // 5) 打点妥当后：重访知客禅师玄净复试（2×2 四种组合皆夸佛缘深厚 -> 录为少林杂役弟子）
      {
        id: 'act_shaolin_xuanjing_bribed_quiz',
        label: '复试少林 · 再答问心二题',
        badge: '佛缘已至',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0193'] },
            { type: 'notInAnySect' },
            flag('shaolin_novice_state', 'eq', 'none'),
            flag('shaolin_bribe_ready', 'truthy'),
          ],
        },
        effects: [
          openScene('scene_shaolin_bribed_q1', 'QST-SECT-01-ENTRY'),
        ],
      },

      // 6) 正式成为少林俗家弟子后：随时可找方丈玄慈互动剃度转为出家弟子（法号「慧见」+ 佛子立绘）
      {
        id: 'act_shaolin_xuanci_tonsure',
        label: '恳请方丈剃度 · 转为出家弟子',
        badge: '赐号慧见',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0112'] },
            { type: 'inSect', sectId: 'SECT-01' },
            flag('shaolin_disciple_type', 'neq', 'monk'),
          ],
        },
        effects: [
          openScene('scene_shaolin_xuanci_tonsure_confirm', 'QST-SECT-01-ENTRY'),
        ],
      },
    ],
    loadScenes: () => import('./shaolinEntryQuest.scenes').then((m) => m.SCENES),
  },
]
