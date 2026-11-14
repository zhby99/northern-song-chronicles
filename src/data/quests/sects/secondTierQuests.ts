import type { QuestDefinition } from '../../../types/quest'

/**
 * 二流门派入门与关联奇遇任务链（声明式 DSL 标杆样板）：
 * 1. QST-SECT-18-TOUMINGZHUANG：太行/京东绿林盟「纳投名状」+ 大宋朝廷黑名单 + 开封府展昭拦路缉拿处斩
 * 2. QST-SECT-16-REFERRAL：钱塘怒潮帮内门贿赂副帮主 ->《钱塘怒潮帮举荐帖》-> 江淮漕帮
 * 3. QST-SECT-23-REFERRAL：齐鲁查拳馆内堂贿赂金牌总教头 ->《齐鲁查拳馆举荐帖》-> 沧州八极门
 * 4. QST-SECT-24-REFERRAL：岭南洪门武馆内堂贿赂金牌总教头 ->《岭南洪门武馆举荐帖》-> 闽海镇远镖局
 */
export const SECOND_TIER_QUESTS: QuestDefinition[] = [
  {
    id: 'QST-SECT-18-TOUMINGZHUANG',
    title: '太行聚义 · 纳投名状',
    category: 'sect_entry',
    factionId: 'SECT-18',
    regionId: 'taihang',
    recommendedRealm: '三流中品',
    maxOpponentRealm: '三流下品',
    recommendedNote: '需生死劫杀一名大宋官吏（最弱官吏约三流下品），建议至少【三流中品】再行领命',
    startHint: '前往太行山【聚义总寨】或寻任意绿林盟豪杰，在门派事务中请领「纳投名状」试炼。',
    startLocation: {
      regionId: 'taihang',
      buildingId: 'th_hall',
      customLabel: '太行山 · 聚义总寨',
    },
    summary:
      '欲入太行/京东绿林盟聚义堂，须按草莽铁律立下「投名状」——拦路劫杀一名大宋朝廷命官。此举将令少侠名列大宋官府海捕黑名单，一旦踏入东京开封府必遭御猫展昭锁拿问斩！',
    initialStepId: 'rob_official',
    steps: {
      rob_official: {
        id: 'rob_official',
        title: '劫道朝廷命官',
        objective:
          '寻访任意大宋朝廷官员（中枢/封疆文臣、边塞将帅或开封府六扇门官员），在人物交互中发起【劫道纳投名状（生死战）】并获胜。',
        nextHint: '寻一名大宋官吏（三流下品及以上），在人物交互中发起【劫道纳投名状】生死战并取胜',
      },
      return_to_join: {
        id: 'return_to_join',
        title: '持状投奔绿林盟',
        objective:
          '已成功劫掠大宋命官立下投名状（已列入大宋朝廷黑名单，切忌踏入东京开封府！），前往太行山或寻任意绿林盟豪杰即可正式拜入【太行/京东绿林盟】。',
        nextHint: '前往太行山·聚义总寨呈递投名状，正式拜入绿林盟（切忌踏入开封府！）',
        targetLocation: {
          regionId: 'taihang',
          buildingId: 'th_hall',
          customLabel: '太行山 · 聚义总寨',
        },
      },
    },
    npcActions: [
      {
        id: 'act_accept_toumingzhuang_scene',
        label: '请领「纳投名状」试炼',
        badge: '绿林入门',
        tone: 'danger',
        showInBottomBar: false,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-18'] },
            {
              type: 'questStatus',
              questId: 'QST-SECT-18-TOUMINGZHUANG',
              status: 'not_started',
            },
            { type: 'flag', flag: 'toumingzhuang_completed', op: 'falsy' },
            { type: 'notInAnySect' },
          ],
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_toumingzhuang_intro',
              title: '太行草莽 · 歃血投名状',
              subtitle: '太行/京东绿林盟入门试炼',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '山风呼啸，刀戟森寒。面前绿林好汉上下打量了少侠一番，按住腰间雁翎刀沉声冷笑。',
                },
                {
                  speaker: { kind: 'interactedNpc' },
                  text: '“想入我太行绿林盟吃这碗刀口舔血的聚义饭？口说无凭！我山寨最忌朝廷六扇门混进来的耳目细作。”',
                },
                {
                  speaker: { kind: 'interactedNpc' },
                  text: '“按道上老规矩，先去寻个大宋朝廷命官劫上一票，提这厮的官凭印绶来作『投名状』！不过丑话说在前头——一旦动手，你的名字便上了开封府海捕黑名单，日后若敢踏入东京汴梁半步，南侠展昭的巨阙剑可不认人！”',
                },
              ],
              choices: [
                {
                  id: 'choice_accept_oath',
                  label: '【歃血领命】立誓劫杀贪官，纳投名状！',
                  subLabel: '开启《太行聚义·纳投名状》任务链',
                  tone: 'danger',
                  effects: [
                    {
                      type: 'startQuest',
                      questId: 'QST-SECT-18-TOUMINGZHUANG',
                      stepId: 'rob_official',
                    },
                    { type: 'setFlag', flag: 'toumingzhuang_state', value: 'accepted' },
                    {
                      type: 'toast',
                      text: '已领「纳投名状」之命！请寻任意大宋朝廷官员发起【劫道纳投名状】生死战。',
                      tone: 'warn',
                      logTag: '绿林试炼',
                    },
                  ],
                },
                {
                  id: 'choice_decline_oath',
                  label: '【容某三思】兹事体大，暂缓领命',
                  tone: 'default',
                  effects: [],
                },
              ],
            },
          },
        ],
      },
      {
        id: 'act_rob_song_official_scene',
        label: '劫道纳投名状（生死战）',
        badge: '投名状',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              specialGroup: 'song_official_for_robbery',
            },
            {
              type: 'any',
              conditions: [
                {
                  type: 'questStatus',
                  questId: 'QST-SECT-18-TOUMINGZHUANG',
                  status: 'active',
                  stepId: 'rob_official',
                },
                {
                  type: 'flag',
                  flag: 'toumingzhuang_state',
                  op: 'eq',
                  value: 'accepted',
                },
              ],
            },
          ],
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_rob_official_ambush',
              title: '黑巾蒙面 · 官道劫驾',
              subtitle: '生死决战 · 败则当场格杀',
              beats: [
                {
                  speaker: { kind: 'player' },
                  text: '“太行山好汉借道！狗官休走，留下官凭印信与行囊金银买命！”',
                },
                {
                  speaker: { kind: 'interactedNpc' },
                  text: '“大胆草寇，朗朗乾坤竟敢截杀朝廷命官！左右护卫何在——格杀勿论！”',
                },
              ],
              choices: [
                {
                  id: 'choice_fight_official',
                  label: '【拔刃死战】既立投名状，今日有进无退！',
                  subLabel: '生死决战（败亡将直接结束游戏）',
                  tone: 'danger',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: 'QST-SECT-18-TOUMINGZHUANG',
                      opponent: { kind: 'interactedNpc' },
                      rule: 'duel',
                      duelStakesTag: 'rob_official',
                      deathTitle: '劫官失手 · 横尸官道',
                      deathDetail:
                        '少侠为纳绿林投名状强劫大宋命官，奈何武艺不精失手落败，当场被官军护卫乱刃分尸。',
                      onWin: [
                        {
                          type: 'setQuestStep',
                          questId: 'QST-SECT-18-TOUMINGZHUANG',
                          stepId: 'return_to_join',
                        },
                        { type: 'setFlag', flag: 'toumingzhuang_state', value: 'completed' },
                        { type: 'setFlag', flag: 'toumingzhuang_completed', value: true },
                        { type: 'setFlag', flag: 'song_court_blacklisted', value: true },
                        { type: 'giveSilver', amount: 60, reason: '劫掠官银' },
                        {
                          type: 'toast',
                          text: '劫官得手（夺得官银 60 两）！「纳投名状」已成，现可拜入【太行/京东绿林盟】；但大宋朝廷已下达海捕黑名单，切莫踏入开封府！',
                          tone: 'warn',
                          logTag: '朝廷通缉',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'choice_abort_robbery',
                  label: '【隐入暗巷】护卫森严，暂且收刀退去',
                  tone: 'default',
                  effects: [],
                },
              ],
            },
          },
        ],
      },
    ],
    locationTriggers: [
      {
        id: 'trig_kaifeng_zhan_zhao_arrest',
        regionId: 'bianliang',
        triggerOnPassThrough: true,
        condition: {
          type: 'flag',
          flag: 'song_court_blacklisted',
          op: 'truthy',
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_zhan_zhao_kaifeng_arrest',
              title: '天街剑影 · 南侠缉凶',
              subtitle: '开封府海捕黑名单 · 不死不休',
              mandatory: true,
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '甫踏入东京汴梁御街界碑，长街两侧马蹄声骤起，一抹耀眼猩红官袍如电掠至，森寒剑意瞬间封死四方退路！',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0140' },
                  text: '“大胆绿林狂徒！劫掠朝廷命官，名列开封府海捕黑名单，竟还敢踏入天子脚下？”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0140' },
                  text: '“御前四品带刀护卫展昭在此——休想走脱半步，亮出兵刃随展某回开封府狗头铡前伏法！”',
                },
              ],
              choices: [
                {
                  id: 'choice_resist_zhan_zhao',
                  label: '【困兽死斗】拔兵刃强闯御猫巨阙剑阵！',
                  subLabel: '强制生死战 · 不可逃跑 · 战败即押赴开封府狗头铡处斩',
                  tone: 'danger',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: 'QST-SECT-18-TOUMINGZHUANG',
                      opponent: { kind: 'npc', npcId: 'NPC-0140' },
                      rule: 'duel',
                      duelStakesTag: 'zhan_zhao_arrest',
                      forbidEscapeReason: '御猫展昭剑气封锁长街，开封府重兵合围，绝无退路！',
                      deathTitle: '血溅天街 · 狗头铡下',
                      deathDetail:
                        '少侠因劫掠大宋命官身负朝廷海捕黑名单，踏入东京开封府时遭御前四品带刀护卫「南侠」展昭当街锁拿，力战败北，押赴开封府大堂狗头铡下问斩示众！',
                      forceMandatory: true,
                      onWin: [
                        {
                          type: 'toast',
                          text: '少侠竟在东京天街力挫「南侠」展昭杀出重围！然朝廷黑名单未消，再入开封仍将遭缉捕！',
                          tone: 'warn',
                          logTag: '震动东京',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'QST-SECT-16-REFERRAL',
    title: '运河衣钵 · 漕帮引荐帖',
    category: 'sect_entry',
    factionId: 'SECT-16',
    regionId: 'hangzhou',
    recommendedRealm: '三流下品',
    recommendedNote: '无强制死斗，三流下品即可游历办理（备足 40 两纹银：拜师 20 两 + 贿赂 20 两）',
    startHint: '前往扬州府【江淮漕帮总舵】寻帮众打听入门规矩，或径直赴杭州拜入钱塘怒潮帮。',
    startLocation: {
      regionId: 'yangzhou',
      buildingId: 'yz_chaoguan',
      customLabel: '扬州府 · 江淮漕帮总舵',
    },
    summary:
      '二流大帮【江淮漕帮】把控汴河漕运命脉，不收来历不明之外人。须先投身杭州【钱塘怒潮帮】晋升至第2阶「内门香主」，再以20两纹银贿赂副帮主陈承涛求取《钱塘怒潮帮举荐帖》。',
    initialStepId: 'get_nuchao_letter',
    steps: {
      get_nuchao_letter: {
        id: 'get_nuchao_letter',
        title: '求取钱塘怒潮帮举荐帖',
        objective:
          '前往临安府（杭州）拜入【钱塘怒潮帮】（20两），晋升第2阶「内门香主」后，向第4阶副帮主【陈承涛】奉银20两求取《钱塘怒潮帮举荐帖》。',
        nextHint: '赴杭州入钱塘怒潮帮并升至「内门香主」，向副帮主陈承涛贿银 20 两取帖',
        targetLocation: {
          regionId: 'hangzhou',
          buildingId: 'hz_nuchao',
          customLabel: '临安府 · 钱塘怒潮帮总舵',
        },
      },
      join_caobang: {
        id: 'join_caobang',
        title: '持帖拜入江淮漕帮',
        objective:
          '已获《钱塘怒潮帮举荐帖》，脱离钱塘怒潮帮后前往扬州府寻【江淮漕帮】帮众呈帖入门。',
        nextHint: '脱离钱塘怒潮帮后，赴扬州府·江淮漕帮总舵呈帖入门',
        targetLocation: {
          regionId: 'yangzhou',
          buildingId: 'yz_chaoguan',
          customLabel: '扬州府 · 江淮漕帮总舵',
        },
      },
    },
    npcActions: [
      {
        id: 'act_ask_caobang_entry',
        label: '打听江淮漕帮入门规矩',
        badge: '入门指引',
        tone: 'jade',
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-16'] },
            { type: 'questStatus', questId: 'QST-SECT-16-REFERRAL', status: 'not_started' },
            { type: 'not', condition: { type: 'hasItem', itemId: 'ITM-MSC-003' } },
            { type: 'not', condition: { type: 'inSect', sectId: 'SECT-16' } },
          ],
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_caobang_guide',
              title: '舳舻千里 · 漕帮门禁',
              subtitle: '江淮漕帮入门指引',
              beats: [
                {
                  speaker: { kind: 'interactedNpc' },
                  text: '“我江淮漕帮掌管东南百万石皇粮北运，帮规森严，绝不收无根底的生面孔。”',
                },
                {
                  speaker: { kind: 'interactedNpc' },
                  text: '“少侠若真心想入帮，不妨先去杭州拜入同走水路的【钱塘怒潮帮】。等你混到他们『内门香主』的身份，再去寻那贪财的副帮主陈承涛塞上二十两纹银，讨一封《钱塘怒潮帮举荐帖》来，本帮自会开香堂接纳！”',
                },
              ],
              onFinishEffects: [
                {
                  type: 'startQuest',
                  questId: 'QST-SECT-16-REFERRAL',
                  stepId: 'get_nuchao_letter',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'QST-SECT-23-REFERRAL',
    title: '武林同气 · 八极门引荐帖',
    category: 'sect_entry',
    factionId: 'SECT-23',
    regionId: 'jinan',
    recommendedRealm: '三流下品',
    recommendedNote: '无强制死斗，三流下品即可游历办理（备足 40 两纹银：拜师 20 两 + 贿赂 20 两）',
    startHint: '前往大名府【沧州八极门武场】打听拜师门径，或赴济南府拜入齐鲁查拳馆。',
    startLocation: {
      regionId: 'daming',
      buildingId: 'dm_baji',
      customLabel: '大名府 · 沧州八极门武场',
    },
    summary:
      '河北名门【沧州八极门】拳风刚猛霸道，非武林同道保举不纳门墙。须先在济南府【齐鲁查拳馆】晋升至第2阶「内堂武师」，再奉银20两贿赂金牌总教头求取《齐鲁查拳馆举荐帖》。',
    initialStepId: 'get_chaquan_letter',
    steps: {
      get_chaquan_letter: {
        id: 'get_chaquan_letter',
        title: '求取齐鲁查拳馆举荐帖',
        objective:
          '前往济南府拜入【齐鲁查拳馆】（20两），晋升第2阶「内堂武师」后，向第4阶金牌总教头奉银20两求取《齐鲁查拳馆举荐帖》。',
        nextHint: '赴济南入齐鲁查拳馆并升至「内堂武师」，向金牌总教头贿银 20 两取帖',
        targetLocation: {
          regionId: 'jinan',
          buildingId: 'jn_chaquan',
          customLabel: '济南府 · 齐鲁查拳总馆',
        },
      },
      join_baji: {
        id: 'join_baji',
        title: '持帖拜入沧州八极门',
        objective:
          '已获《齐鲁查拳馆举荐帖》，脱离查拳馆后前往大名府寻【沧州八极门】门人呈帖入门。',
        nextHint: '脱离齐鲁查拳馆后，赴大名府·沧州八极门武场呈帖入门',
        targetLocation: {
          regionId: 'daming',
          buildingId: 'dm_baji',
          customLabel: '大名府 · 沧州八极门武场',
        },
      },
    },
    npcActions: [
      {
        id: 'act_ask_baji_entry',
        label: '打听沧州八极门拜师门径',
        badge: '入门指引',
        tone: 'jade',
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-23'] },
            { type: 'questStatus', questId: 'QST-SECT-23-REFERRAL', status: 'not_started' },
            { type: 'not', condition: { type: 'hasItem', itemId: 'ITM-MSC-004' } },
            { type: 'not', condition: { type: 'hasItem', itemId: 'ITM-MSC-008' } },
            { type: 'not', condition: { type: 'inSect', sectId: 'SECT-23' } },
          ],
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_baji_guide',
              title: '文有太极 · 武有八极',
              subtitle: '沧州八极门入门指引',
              beats: [
                {
                  speaker: { kind: 'interactedNpc' },
                  text: '“沧州八极门立身河朔边鄙，拳出如崩山裂石，素来只收北方拳馆知根知底的熟手。”',
                },
                {
                  speaker: { kind: 'interactedNpc' },
                  text: '“少侠若欲拜门，有两条门径：其一，济南府【齐鲁查拳馆】与本门同气连枝，你若在查拳馆升任『内堂武师』后向金牌总教头奉银二十两讨封《齐鲁查拳馆举荐帖》，即可入门；其二，眼下大名府讲武分馆正逢【黄河铁索断江奇案】，少侠若有胆魄替本门洗刷奇冤，卢总馆主定会破例直纳内堂！”',
                },
              ],
              onFinishEffects: [
                {
                  type: 'startQuest',
                  questId: 'QST-SECT-23-REFERRAL',
                  stepId: 'get_chaquan_letter',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'QST-SECT-24-REFERRAL',
    title: '东南镖路 · 镇远镖局引荐帖',
    category: 'sect_entry',
    factionId: 'SECT-24',
    regionId: 'guangzhou',
    recommendedRealm: '三流下品',
    recommendedNote: '无强制死斗，三流下品即可游历办理（备足 40 两纹银：拜师 20 两 + 贿赂 20 两）',
    startHint: '前往泉州府【闽海镇远总镖局】打听入局门径，或赴广州府拜入岭南洪门武馆。',
    startLocation: {
      regionId: 'quanzhou',
      buildingId: 'qz_zhenyuan',
      customLabel: '泉州府 · 闽海镇远总镖局',
    },
    summary:
      '泉州【闽海镇远镖局】专走闽粤南洋重宝红货，非硬桥硬马名馆保举不可入局。须先在广州府【岭南洪门武馆】晋升至第2阶「内堂武师」，再奉银20两贿赂金牌总教头求取《岭南洪门武馆举荐帖》。',
    initialStepId: 'get_hongmen_letter',
    steps: {
      get_hongmen_letter: {
        id: 'get_hongmen_letter',
        title: '求取岭南洪门武馆举荐帖',
        objective:
          '前往广州府拜入【岭南洪门武馆】（20两），晋升第2阶「内堂武师」后，向第4阶金牌总教头奉银20两求取《岭南洪门武馆举荐帖》。',
        nextHint: '赴广州入岭南洪门武馆并升至「内堂武师」，向金牌总教头贿银 20 两取帖',
        targetLocation: {
          regionId: 'guangzhou',
          buildingId: 'gz_hongmen',
          customLabel: '广州府 · 岭南洪门总馆',
        },
      },
      join_zhenyuan: {
        id: 'join_zhenyuan',
        title: '持帖拜入闽海镇远镖局',
        objective:
          '已获《岭南洪门武馆举荐帖》，脱离洪门武馆后前往泉州府寻【闽海镇远镖局】趟子手/镖头呈帖入局。',
        nextHint: '脱离岭南洪门武馆后，赴泉州府·闽海镇远总镖局呈帖入局',
        targetLocation: {
          regionId: 'quanzhou',
          buildingId: 'qz_zhenyuan',
          customLabel: '泉州府 · 闽海镇远总镖局',
        },
      },
    },
    npcActions: [
      {
        id: 'act_ask_zhenyuan_entry',
        label: '打听镇远镖局入局门径',
        badge: '入门指引',
        tone: 'jade',
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-24'] },
            { type: 'questStatus', questId: 'QST-SECT-24-REFERRAL', status: 'not_started' },
            { type: 'not', condition: { type: 'hasItem', itemId: 'ITM-MSC-005' } },
            { type: 'not', condition: { type: 'inSect', sectId: 'SECT-24' } },
          ],
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_zhenyuan_guide',
              title: '闽海鲸波 · 红货保举',
              subtitle: '闽海镇远镖局入门指引',
              beats: [
                {
                  speaker: { kind: 'interactedNpc' },
                  text: '“我闽海镇远镖局押的皆是市舶司番货、犀象珠玉，一步行差踏错便是万贯家财付诸东流，岂敢乱招外人？”',
                },
                {
                  speaker: { kind: 'interactedNpc' },
                  text: '“广州【岭南洪门武馆】的金牌总教头与敝局总镖头乃是换帖兄弟。少侠若在洪门武馆升任『内堂武师』，备二十两茶敬求得《岭南洪门武馆举荐帖》，敝局大堂随时为你敞开！”',
                },
              ],
              onFinishEffects: [
                {
                  type: 'startQuest',
                  questId: 'QST-SECT-24-REFERRAL',
                  stepId: 'get_hongmen_letter',
                },
              ],
            },
          },
        ],
      },
    ],
  },
]
