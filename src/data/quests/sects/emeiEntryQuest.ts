import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, openScene } from '../../../engine/quest/dsl'

export const EMEI_ENTRY_QUEST_ID = 'QST-SECT-07-ENTRY'

const EMEI_ELIGIBLE_SECT_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'notInAnySect', allowTransferFromSectId: 'SECT-29' },
    qStatus(EMEI_ENTRY_QUEST_ID, 'not_started'),
  ],
}

export const EMEI_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: EMEI_ENTRY_QUEST_ID,
    title: '锦水清音 · 金顶问心',
    category: 'sect_entry',
    factionId: 'SECT-07',
    regionId: 'emeishan',
    recommendedRealm: '不入流（零内功开局友好 · 男女主角全兼容）',
    maxOpponentRealm: '三流下品（友好切磋，胜败皆推进无卡关）',
    recommendedNote:
      '专为初涉江湖无内功少侠（男女皆宜，亦支持巴蜀百草药王门医徒带艺转投）打造的二十幕沉浸入门长卷。重体验、重剧情、重与俗家首席【苏梦清】的蜀道羁绊及三维十艺资质互动。',
    startHint:
      '无门无派（或隶属巴蜀百草药王门）时，前往【成都府 · 锦江万里桥茶肆】即可在春雨中偶遇峨眉俗家首席【苏梦清】开启剧情（提前赴剑门关见苏梦清更有隐藏前缘）。',
    startLocation: {
      regionId: 'chengdu',
      buildingId: 'cd_teahouse',
      customLabel: '成都府 · 锦江万里桥茶肆（春雨偶遇苏梦清）',
    },
    startCondition: EMEI_ELIGIBLE_SECT_CONDITION,
    summary:
      '皇祐二年春雨潇潇，身无半缕内功的你在成都万里桥头护住遭青城恶徒冲撞的老药农，得峨眉俗家首席女侠「蜀道飞燕」苏梦清撑伞解围。历经百草堂辨毒煎汤、大慈寺观画明心后，携静虚师太素笺与苏梦清结伴入峨眉山：于双桥清音智退青城截药恶客，在万年寺担泉抄经三日苦劳后终修成第一缕《峨眉吐纳术》丹田清气，复于洗象池澄月松涛下共观白猿折竹习得《分水峨眉刺》，最终冒雪登临万仞金顶破西夏暗哨、于七彩佛光中问心入派！',
    initialStepId: 'go_baicao_clinic',
    steps: {
      go_baicao_clinic: {
        id: 'go_baicao_clinic',
        title: '锦江共伞 · 百草救人',
        objective:
          '已在万里桥头得峨眉女侠【苏梦清】撑伞解围。请随她一同护送受伤的周老药农前往成都府【西川百草药武堂 · 百草悬壶问诊正堂】验伤解毒。',
        nextHint:
          '在【成都府】进入【西川百草药武堂】，点击【百草悬壶问诊正堂】与【温秀璐】或【苏百草】交谈。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'cd_baicao',
          spotId: 'cd_baicao_main',
        },
      },
      visit_dacisi_jingxu: {
        id: 'visit_dacisi_jingxu',
        title: '唐宋壁画 · 大慈呈情',
        objective:
          '药篓蛇毒已解！请随苏梦清前往成都府【大慈寺（唐宋壁画阁） · 大雄正殿】，向驻蓉首座【静虚师太】禀明青城派暗算药路之事。',
        nextHint: '在【成都府】进入【大慈寺（唐宋壁画阁）】，点击【大雄正殿 · 佛前蒲团】拜见【静虚师太】。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'cd_dacisi',
          spotId: 'cd_dacisi_main',
        },
      },
      climb_emei_foot: {
        id: 'climb_emei_foot',
        title: '麻鞋踏雨 · 奔赴峨眉',
        objective:
          '已获静虚师太保举素笺与苏梦清所赠【蜀道麻筋草鞋】。请出成都府西南行，前往【蜀中峨眉山】与先行探路的苏梦清会合。',
        nextHint: '在大地图行军前往邻近的【蜀中峨眉山】（踏入峨眉山境即可触发双桥清音风波）。',
        targetLocation: {
          regionId: 'emeishan',
          customLabel: '蜀中峨眉山 · 双桥清音山道',
        },
      },
      wannian_jingxuan_trial: {
        id: 'wannian_jingxuan_trial',
        title: '万年古刹 · 铁尼试心',
        objective:
          '双桥清音之围已解，执法首座「峨眉铁尼」【静玄师太】命你随苏梦清前往【万年古寺禅院 · 回风拂柳演剑方庭】听候三日筋骨心性考校。',
        nextHint: '在【蜀中峨眉山】进入【万年古寺禅院】，点击【回风拂柳演剑方庭】找【静玄师太】复命。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_wannian',
          spotId: 'em_wn_courtyard',
        },
      },
      lotus_pavilion_night: {
        id: 'lotus_pavilion_night',
        title: '白水荷池 · 吐纳筑基',
        objective:
          '三日挑水扫叶与抄经苦役圆满撑过！请移步万年古寺【白水荷池贝叶琴榭】与等候你的【苏梦清】夜话，并随静虚师太修习《峨眉吐纳术》筑基心法。',
        nextHint: '在【万年古寺禅院】点击【白水荷池贝叶琴榭】探查或与【柳莲玉】交谈触发夜话筑基。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_wannian',
          spotId: 'em_wn_lotus',
        },
      },
      go_xixiang_pond: {
        id: 'go_xixiang_pond',
        title: '洗象澄月 · 灵猿观剑',
        objective:
          '丹田已生第一缕《峨眉吐纳术》清气！请随苏梦清登临山腰【洗象池灵猴剑坪 · 灵猿戏剑苍松崖坪】，寻【唐月瑾】安抚受惊老白猿并月下悟刺。',
        nextHint: '在【蜀中峨眉山】进入【洗象池灵猴剑坪】，点击【灵猿戏剑苍松崖坪】与【唐月瑾】交谈。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_pond',
          spotId: 'em_pd_monkey',
        },
      },
      ascend_jinding_summit: {
        id: 'ascend_jinding_summit',
        title: '卧云松雪 · 金顶试锋',
        objective:
          '已于洗象池月下习得《分水峨眉刺》！请乘破晓前冒雪登临【峨眉金顶睹光台 · 卧云松雪演剑禅亭】，接受金顶护法【柳川】的临阵拆招检验。',
        nextHint: '在【蜀中峨眉山】进入【峨眉金顶睹光台】，点击【卧云松雪演剑禅亭】与【柳川】交谈。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_jinding',
          spotId: 'em_jd_pavilion',
        },
      },
      buddha_light_oath: {
        id: 'buddha_light_oath',
        title: '云海佛光 · 华藏归心',
        objective:
          '已揪出窥探金顶的西夏暗哨！朝阳初升，请移步【万仞云海佛光睹光台】或【华藏金顶普贤铜殿】拜谒掌门【云慧师太】，于普贤宝光中问心入派！',
        nextHint:
          '在【峨眉金顶睹光台】点击【万仞云海佛光睹光台】（或【华藏金顶普贤铜殿】找【云慧师太】）行拜师大礼。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_jinding',
          spotId: 'em_jd_hall',
        },
      },
    },

    locationTriggers: [
      // 1) 踏入成都府 · 锦江万里桥茶肆，首次自动邂逅春雨药篓风波
      {
        id: 'trg_emei_chengdu_teahouse_auto',
        regionId: 'chengdu',
        buildingId: 'cd_teahouse',
        onceFlag: 'emei_teahouse_first_seen',
        condition: EMEI_ELIGIBLE_SECT_CONDITION,
        effects: [openScene('scene_em_01_wanli_teahouse', 'QST-SECT-07-ENTRY')],
      },

      // 2) 携素笺踏入蜀中峨眉山全景层时，自动触发第六幕「双桥清音闻剑啸」
      {
        id: 'trg_emei_foot_shuangqiao_ambush',
        regionId: 'emeishan',
        condition: atStep(EMEI_ENTRY_QUEST_ID, 'climb_emei_foot'),
        effects: [openScene('scene_em_06_emei_foot_ambush', 'QST-SECT-07-ENTRY')],
      },
    ],

    spotActions: [
      // 若首次在万里桥茶肆选了「暂且退回茶檐观望」，可随时在茶肆雅座或临街望楼手动重启第一幕
      {
        id: 'spot_em_teahouse_restart_main',
        label: '凭栏听雨 · 插手万里桥头药农风波（开启峨眉入门长卷）',
        badge: '峨眉仙缘',
        subtitle: '春雨石桥偶遇峨眉俗家首席苏梦清',
        tone: 'gold',
        regionId: 'chengdu',
        buildingId: 'cd_teahouse',
        spotId: 'cd_teahouse_main',
        visibleWhen: EMEI_ELIGIBLE_SECT_CONDITION,
        effects: [openScene('scene_em_01_wanli_teahouse', 'QST-SECT-07-ENTRY')],
      },
      {
        id: 'spot_em_teahouse_restart_west',
        label: '临街望桥 · 救援受欺巴蜀老药农（开启峨眉入门长卷）',
        badge: '峨眉仙缘',
        subtitle: '春雨石桥偶遇峨眉俗家首席苏梦清',
        tone: 'gold',
        regionId: 'chengdu',
        buildingId: 'cd_teahouse',
        spotId: 'cd_teahouse_west',
        visibleWhen: EMEI_ELIGIBLE_SECT_CONDITION,
        effects: [openScene('scene_em_01_wanli_teahouse', 'QST-SECT-07-ENTRY')],
      },

      // 第十一幕：白水荷池贝叶琴榭直接触发与苏梦清夜话及吐纳筑基
      {
        id: 'spot_em_lotus_night_talk',
        label: '走入贝叶琴榭 · 与苏梦清荷池夜话并修习吐纳筑基',
        badge: '吐纳筑基',
        subtitle: '褪去凡胎浊息，凝炼第一缕峨眉清气',
        tone: 'gold',
        regionId: 'emeishan',
        buildingId: 'em_wannian',
        spotId: 'em_wn_lotus',
        visibleWhen: atStep(EMEI_ENTRY_QUEST_ID, 'lotus_pavilion_night'),
        effects: [openScene('scene_em_11_lotus_pavilion_heart', 'QST-SECT-07-ENTRY')],
      },

      // 第十九幕：在万仞云海佛光睹光台亦可直接触发破晓睹光问心大典
      {
        id: 'spot_em_platform_buddha_light',
        label: '凭栏迎破晓朝阳 · 共睹万仞云海普贤佛光',
        badge: '金顶问心',
        subtitle: '云慧师太亲临睹光台三问本心，择脉拜入峨眉',
        tone: 'gold',
        regionId: 'emeishan',
        buildingId: 'em_jinding',
        spotId: 'em_jd_platform',
        visibleWhen: atStep(EMEI_ENTRY_QUEST_ID, 'buddha_light_oath'),
        effects: [openScene('scene_em_19_jinding_buddha_light', 'QST-SECT-07-ENTRY')],
      },
    ],

    npcActions: [
      // 0a) 剑门关前缘彩蛋：未开卷前在剑阁栈道偶遇苏梦清（NPC-0207）
      {
        id: 'act_em_jianmen_prelude_smq',
        label: '凭栏问蜀道 · 结识峨眉飞燕苏梦清',
        badge: '剑阁前缘',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0207'] },
            EMEI_ELIGIBLE_SECT_CONDITION,
            flag('emei_fate_jianmen', 'falsy'),
          ],
        },
        effects: [openScene('scene_em_00_jianmen_prelude', 'QST-SECT-07-ENTRY')],
      },

      // 0b) 若未开卷直接找成都静虚师太/温秀璐，或直接上峨眉山找云慧/静玄/苏涵求道，给出贴心指路（成都大慈寺/百草堂可直接开启第一幕）
      {
        id: 'act_em_chengdu_manual_start',
        label: '请教峨眉善缘 · 往万里桥茶肆探查护药风波',
        badge: '峨眉仙缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0206', 'NPC-0330'] },
            EMEI_ELIGIBLE_SECT_CONDITION,
          ],
        },
        effects: [openScene('scene_em_01_wanli_teahouse', 'QST-SECT-07-ENTRY')],
      },
      {
        id: 'act_em_summit_guide_to_chengdu',
        label: '叩山求道 · 请问拜入峨眉门墙之法',
        badge: '峨眉门规',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0128', 'NPC-0169', 'NPC-0582'] },
            EMEI_ELIGIBLE_SECT_CONDITION,
          ],
        },
        effects: [openScene('scene_em_direct_summit_guide', 'QST-SECT-07-ENTRY')],
      },

      // 第三幕：西川百草药武堂找温秀璐（NPC-0330）或药王苏百草（NPC-0316）救治周老药农
      {
        id: 'act_em_baicao_cure_farmer',
        label: '扶周老药农入堂 · 协力拔除竹叶青蛇毒',
        badge: '百草辨瘴',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0330', 'NPC-0316'] },
            atStep(EMEI_ENTRY_QUEST_ID, 'go_baicao_clinic'),
          ],
        },
        effects: [openScene('scene_em_03_baicao_clinic', 'QST-SECT-07-ENTRY')],
      },

      // 第四～五幕：成都大慈寺正殿找静虚师太（NPC-0206）观壁画问心并领素笺
      {
        id: 'act_em_dacisi_jingxu_report',
        label: '禀报药篓蛇毒始末 · 观唐宋壁画问心',
        badge: '大慈托笺',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0206'] },
            atStep(EMEI_ENTRY_QUEST_ID, 'visit_dacisi_jingxu'),
          ],
        },
        effects: [openScene('scene_em_04_dacisi_fresco', 'QST-SECT-07-ENTRY')],
      },

      // 第六幕兜底入口：若玩家已在峨眉山内处于 climb_emei_foot 阶段，找苏涵或静玄师太亦可触发双桥清音
      {
        id: 'act_em_foot_ambush_fallback',
        label: '驰援双桥清音 · 化解青城截药之围',
        badge: '清音破局',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0582', 'NPC-0169'] },
            atStep(EMEI_ENTRY_QUEST_ID, 'climb_emei_foot'),
          ],
        },
        effects: [openScene('scene_em_06_emei_foot_ambush', 'QST-SECT-07-ENTRY')],
      },

      // 第九～十幕：万年古寺回风拂柳演剑方庭找静玄师太（NPC-0169）领受三日苦役
      {
        id: 'act_em_wannian_jingxuan_chores',
        label: '呈递静虚师太素笺 · 领受万年寺三日考校',
        badge: '担泉抄经',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0169'] },
            atStep(EMEI_ENTRY_QUEST_ID, 'wannian_jingxuan_trial'),
          ],
        },
        effects: [openScene('scene_em_09_wannian_trial_assign', 'QST-SECT-07-ENTRY')],
      },

      // 第十一～十三幕（NPC 入口同开）：白水荷池贝叶琴榭找柳莲玉（NPC-0361）亦可触发荷池夜话与吐纳筑基
      {
        id: 'act_em_lotus_liulianyu_trigger',
        label: '步入白水荷池琴榭 · 会合苏梦清夜话筑基',
        badge: '吐纳筑基',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0361'] },
            atStep(EMEI_ENTRY_QUEST_ID, 'lotus_pavilion_night'),
          ],
        },
        effects: [openScene('scene_em_11_lotus_pavilion_heart', 'QST-SECT-07-ENTRY')],
      },

      // 第十四～十五幕：洗象池灵猿戏剑苍松崖坪找唐月瑾（NPC-0376）或周秀（NPC-0652）安抚白猿、月下悟刺
      {
        id: 'act_em_xixiang_monkey_moon',
        label: '安抚受惊通灵白猿 · 澄月松下随苏梦清悟刺',
        badge: '洗象澄月',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0376', 'NPC-0652', 'NPC-0691'] },
            atStep(EMEI_ENTRY_QUEST_ID, 'go_xixiang_pond'),
          ],
        },
        effects: [openScene('scene_em_14_xixiang_arrival', 'QST-SECT-07-ENTRY')],
      },

      // 第十六～十八幕：金顶卧云松雪演剑禅亭找护法柳川（NPC-0340）拆招试新锋并揪出暗哨
      {
        id: 'act_em_jinding_liuchuan_spar',
        label: '踏雪入演剑禅亭 · 接受金顶护法柳川拆招检验',
        badge: '松雪试锋',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0340'] },
            atStep(EMEI_ENTRY_QUEST_ID, 'ascend_jinding_summit'),
          ],
        },
        effects: [openScene('scene_em_16_jinding_snow_steps', 'QST-SECT-07-ENTRY')],
      },

      // 第十九～二十幕：华藏金顶普贤铜殿找掌门云慧师太（NPC-0128）或睹光台贝凝音（NPC-0384）行拜师问心大典
      {
        id: 'act_em_jinding_yunhui_oath',
        label: '拜谒金顶神尼云慧师太 · 睹云海佛光问心入派',
        badge: '金顶问心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0128', 'NPC-0384'] },
            atStep(EMEI_ENTRY_QUEST_ID, 'buddha_light_oath'),
          ],
        },
        effects: [openScene('scene_em_19_jinding_buddha_light', 'QST-SECT-07-ENTRY')],
      },
    ],
    loadScenes: () => import('./emeiEntryQuest.scenes').then((m) => m.SCENES),
  },
]
