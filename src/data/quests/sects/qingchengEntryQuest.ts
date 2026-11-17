import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, openScene } from '../../../engine/quest/dsl'

export const QINGCHENG_ENTRY_QUEST_ID = 'QST-SECT-14-ENTRY'

export const QINGCHENG_QINGLAN_ACTOR_ID = 'ACT-QC-SHEN-QINGLAN'

const QINGCHENG_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'notInAnySect' },
    qStatus(QINGCHENG_ENTRY_QUEST_ID, 'not_started'),
    qStatus(QINGCHENG_ENTRY_QUEST_ID, 'not_completed'),
  ],
}

export const QINGCHENG_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: QINGCHENG_ENTRY_QUEST_ID,
    title: '青羊偶闻 · 松风问心',
    category: 'sect_entry',
    factionId: 'SECT-14',
    regionId: 'qingcheng',
    recommendedRealm: '不入流 ～ 三流上品（零内功零武学开局友好）',
    maxOpponentRealm: '三流下品（全程切磋/盟友护航，无卡关死斗）',
    recommendedNote:
      '专为初入江湖尚无内功武学的少侠量身打造：于【成都府 · 青羊道宫】听道偶遇温润藏忧的青城小师姐【沈清岚】，二十幕沉浸长卷重资质、重缘分，终章可自由择定【拜入青城派】或【拒绝入派、携《青冥引气诀》做逍遥散人】。',
    startHint:
      '无门无派时前往【成都府 · 青羊道宫】听道避雨，即可偶遇青城外院女冠【沈清岚】开启二十幕巴蜀问道长卷。',
    startLocation: {
      regionId: 'chengdu',
      buildingId: 'cd_qingyang',
    },
    startCondition: QINGCHENG_START_CONDITION,
    summary:
      '{reignYear}锦官春雨，于成都青羊道宫铜羊炉畔偶遇温润清丽却暗藏亡父心事的青城小师姐【沈清岚】。随其自文翁石室押送经卷西登青城山上清宫，在零内功状态下借桃木剑三合立威、扫阶十日磨心，终获孤崖剑师【方正】与沈清岚传授首门道家内功《青城青冥引气诀》。随后历锦江茶肆峨眉风波、剑门关古柏验信与寒雨舍身护友，看透上清宫清修与铁血两脉暗流，在三清祖师神坛前凭本心择定：是受袍佩剑拜入青城门墙，抑或长揖谢恩、携《青冥引气诀》做个笑傲沧海的逍遥散人！',
    initialStepId: 'meet_academy_escort',
    steps: {
      meet_academy_escort: {
        id: 'meet_academy_escort',
        title: '石室清册 · 结伴西行',
        objective:
          '已在青羊道宫结识青城孤崖小师姐【沈清岚】。请前往城北【成都府 · 文翁石室书院】，会合沈清岚与护观弟子【侯清野】清点上山经卷物资。',
        nextHint: '在【成都府】进入【文翁石室书院】，点击【沈清岚】或【侯清野】交谈。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'chengdu_base_academy',
        },
      },
      climb_qingcheng_gate: {
        id: 'climb_qingcheng_gate',
        title: '丹梯千级 · 初叩上清',
        objective:
          '已获沈清岚所赠【书院习礼桃木剑】。请出成都西行前往【青城山 / 唐家堡 · 青城山上清宫松风殿】，随沈清岚登临山门接受外院试剑与十日清修。',
        nextHint: '前往【青城山 / 唐家堡】，进入【青城山上清宫松风殿】（或点击上清松风演剑主殿内的沈清岚）。',
        targetLocation: {
          regionId: 'qingcheng',
          buildingId: 'qc_shangqing',
          spotId: 'qc_sq_hall',
        },
      },
      cliff_qin_and_neigong: {
        id: 'cliff_qin_and_neigong',
        title: '孤崖松琴 · 青冥引气',
        objective:
          '外院扫阶十日期满！请移步上清宫西侧绝壁【松涛云海抚琴孤崖】，拜谒剑师【方正】听琴问心，求授首门道家筑基内功《青城青冥引气诀》。',
        nextHint: '在【青城山上清宫松风殿】内点击子景点【松涛云海抚琴孤崖】，与【方正】或【沈清岚】对话。',
        targetLocation: {
          regionId: 'qingcheng',
          buildingId: 'qc_shangqing',
          spotId: 'qc_sq_cliff',
        },
      },
      chengdu_teahouse_errand: {
        id: 'chengdu_teahouse_errand',
        title: '锦江茶肆 · 蜀道风波',
        objective:
          '已习得《青城青冥引气诀》并撞破后山竹林唐门暗踪。请随沈清岚下山前往【成都府 · 锦江万里桥茶肆】采办道观茶盐并探听风声。',
        nextHint: '前往【成都府】，进入【锦江万里桥茶肆】二楼与【沈清岚】会合。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'cd_teahouse',
          spotId: 'cd_teahouse_main',
        },
      },
      jianmen_delivery: {
        id: 'jianmen_delivery',
        title: '翠云古柏 · 剑门浴血',
        objective:
          '成都茶肆风波已平。请北上天险【剑门关 · 翠云廊古柏驿亭】会合沈清岚核验火漆手札，并赴剑门雄关箭楼呈交守关长老【贾天鹤】。',
        nextHint: '前往【剑门关】，进入【翠云廊古柏驿亭】与【沈清岚】对话。',
        targetLocation: {
          regionId: 'jianmenguan',
          buildingId: 'jm_pine',
          spotId: 'jm_pine_main',
        },
      },
      shangqing_final_ceremony: {
        id: 'shangqing_final_ceremony',
        title: '三清殿前 · 去留问心',
        objective:
          '历经剑门关伏击与蜀道寒雨生死相护，请返回【青城山 / 唐家堡 · 青城山上清宫松风殿】，面见掌门【余沧澜】，在三清祖师神坛前做出拜入青城或逍遥江湖的终极抉择！',
        nextHint: '前往【青城山 / 唐家堡 · 青城山上清宫松风殿】，点击【上清松风演剑主殿】内的沈清岚或余沧澜。',
        targetLocation: {
          regionId: 'qingcheng',
          buildingId: 'qc_shangqing',
          spotId: 'qc_sq_hall',
        },
      },
    },

    locationTriggers: [
      // 1. 踏入成都府青羊道宫自动开启第一幕春雨偶遇
      {
        id: 'trg_qc_enter_qingyang_palace',
        regionId: 'chengdu',
        buildingId: 'cd_qingyang',
        onceFlag: 'qc_qingyang_rain_triggered',
        condition: QINGCHENG_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'qc_qingyang_rain_triggered', value: true },
          openScene('scene_qc_01_qingyang_rain', 'QST-SECT-14-ENTRY'),
        ],
      },
      // 2. Step 2 初登青城山上清宫自动衔接第四幕丹梯樵歌
      {
        id: 'trg_qc_enter_shangqing_climb',
        regionId: 'qingcheng',
        buildingId: 'qc_shangqing',
        condition: atStep(QINGCHENG_ENTRY_QUEST_ID, 'climb_qingcheng_gate'),
        effects: [openScene('scene_qc_04_mountain_steps', 'QST-SECT-14-ENTRY')],
      },
      // 3. Step 4 踏入成都锦江万里桥茶肆自动触发第十一幕
      {
        id: 'trg_qc_enter_chengdu_teahouse',
        regionId: 'chengdu',
        buildingId: 'cd_teahouse',
        condition: atStep(QINGCHENG_ENTRY_QUEST_ID, 'chengdu_teahouse_errand'),
        effects: [openScene('scene_qc_11_teahouse_emei', 'QST-SECT-14-ENTRY')],
      },
      // 4. Step 5 踏入剑门关翠云廊古柏驿亭自动触发第十二幕
      {
        id: 'trg_qc_enter_jianmen_pine',
        regionId: 'jianmenguan',
        buildingId: 'jm_pine',
        condition: atStep(QINGCHENG_ENTRY_QUEST_ID, 'jianmen_delivery'),
        effects: [openScene('scene_qc_12_pine_wax_seal', 'QST-SECT-14-ENTRY')],
      },
      // 5. Step 6 重返上清宫自动触发第十五幕两脉对质与终章大典
      {
        id: 'trg_qc_return_shangqing_final',
        regionId: 'qingcheng',
        buildingId: 'qc_shangqing',
        condition: atStep(QINGCHENG_ENTRY_QUEST_ID, 'shangqing_final_ceremony'),
        effects: [openScene('scene_qc_15_two_factions_clash', 'QST-SECT-14-ENTRY')],
      },
    ],

    spotActions: [
      // 青羊道宫主阁讲席兜底手动触发入口（防玩家从存档已在宫内等情况）
      {
        id: 'spot_qc_qingyang_listen_dao',
        label: '驻足铜羊回廊 · 听春雨道经（开启青城问道长卷）',
        badge: '青城机缘',
        subtitle: '偶遇下山校经的青城孤崖小师姐沈清岚',
        tone: 'jade',
        regionId: 'chengdu',
        buildingId: 'cd_qingyang',
        spotId: 'cd_qingyang_main',
        visibleWhen: QINGCHENG_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'qc_qingyang_rain_triggered', value: true },
          openScene('scene_qc_01_qingyang_rain', 'QST-SECT-14-ENTRY'),
        ],
      },
    ],

    npcActions: [
      // 0. 兜底入口：在青羊道宫找方振鸣或吉清音打听亦可开启第一幕
      {
        id: 'act_qc_qingyang_npc_start',
        label: '廊下听道避雨 · 偶遇青衣女冠（开启青城长卷）',
        badge: '青城机缘',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0712', 'NPC-0932'] },
            QINGCHENG_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'qc_qingyang_rain_triggered', value: true },
          openScene('scene_qc_01_qingyang_rain', 'QST-SECT-14-ENTRY'),
        ],
      },

      // 1. 文翁石室书院：找沈清岚或侯清野清点经卷暗账（第三幕）
      {
        id: 'act_qc_academy_check_ledger',
        label: '清点上山道藏与香油暗箱',
        badge: '石室同行',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              npcIds: ['NPC-0866'],
              dynamicActorIds: [QINGCHENG_QINGLAN_ACTOR_ID],
            },
            atStep(QINGCHENG_ENTRY_QUEST_ID, 'meet_academy_escort'),
          ],
        },
        effects: [openScene('scene_qc_03_academy_ledger', 'QST-SECT-14-ENTRY')],
      },

      // 2. 上清宫主殿兜底：找沈清岚/申勇焱/侯锋原开启丹梯与木剑试招（第四～六幕）
      {
        id: 'act_qc_climb_gate_manual',
        label: '初登青城丹梯 · 接受山门木剑试招',
        badge: '初叩上清',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              npcIds: ['NPC-0933', 'NPC-0587'],
              dynamicActorIds: [QINGCHENG_QINGLAN_ACTOR_ID],
            },
            atStep(QINGCHENG_ENTRY_QUEST_ID, 'climb_qingcheng_gate'),
          ],
        },
        effects: [openScene('scene_qc_04_mountain_steps', 'QST-SECT-14-ENTRY')],
      },

      // 3. 松涛云海抚琴孤崖：找方正或沈清岚听琴传授《青冥引气诀》（第七～十幕）
      {
        id: 'act_qc_cliff_listen_qin',
        label: '孤崖听奏《松风引》 · 求授青冥引气',
        badge: '孤崖悟气',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              npcIds: ['NPC-0354', 'NPC-0516'],
              dynamicActorIds: [QINGCHENG_QINGLAN_ACTOR_ID],
            },
            atStep(QINGCHENG_ENTRY_QUEST_ID, 'cliff_qin_and_neigong'),
          ],
        },
        effects: [openScene('scene_qc_07_cliff_qin', 'QST-SECT-14-ENTRY')],
      },

      // 4. 成都锦江万里桥茶肆兜底：找沈清岚调处峨眉争端（第十一幕）
      {
        id: 'act_qc_teahouse_emei_manual',
        label: '上前排解青城与峨眉茶座争执',
        badge: '锦江风波',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              npcIds: ['NPC-0206', 'NPC-0458'],
              dynamicActorIds: [QINGCHENG_QINGLAN_ACTOR_ID],
            },
            atStep(QINGCHENG_ENTRY_QUEST_ID, 'chengdu_teahouse_errand'),
          ],
        },
        effects: [openScene('scene_qc_11_teahouse_emei', 'QST-SECT-14-ENTRY')],
      },

      // 5. 剑门关翠云廊/箭楼兜底：找沈清岚或贾天鹤呈验火漆手札（第十二～十四幕）
      {
        id: 'act_qc_jianmen_deliver_manual',
        label: '核验火漆手札 · 登剑门雄关呈信',
        badge: '剑门暗流',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              npcIds: ['NPC-0221', 'NPC-0291'],
              dynamicActorIds: [QINGCHENG_QINGLAN_ACTOR_ID],
            },
            atStep(QINGCHENG_ENTRY_QUEST_ID, 'jianmen_delivery'),
          ],
        },
        effects: [openScene('scene_qc_12_pine_wax_seal', 'QST-SECT-14-ENTRY')],
      },

      // 6. 返回上清宫兜底：找余沧澜/方正/侯沧海/沈清岚开启终章大典（第十五～二十幕）
      {
        id: 'act_qc_shangqing_final_manual',
        label: '赴上清宫复命 · 三清殿前定去留',
        badge: '松风问心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              npcIds: ['NPC-0139', 'NPC-0354', 'NPC-0220'],
              dynamicActorIds: [QINGCHENG_QINGLAN_ACTOR_ID],
            },
            atStep(QINGCHENG_ENTRY_QUEST_ID, 'shangqing_final_ceremony'),
          ],
        },
        effects: [openScene('scene_qc_15_two_factions_clash', 'QST-SECT-14-ENTRY')],
      },

      // 7. 完结后温情余韵：随时回孤崖找沈清岚共品苦丁茶、听补全的《松风引》
      {
        id: 'act_qc_post_cliff_reunion',
        label: '与清岚共品雪水苦丁 · 听补全《松风引》',
        badge: '孤崖故人',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', dynamicActorIds: [QINGCHENG_QINGLAN_ACTOR_ID] },
            qStatus(QINGCHENG_ENTRY_QUEST_ID, 'completed'),
            flag('qc_qinglan_reunion_done', 'falsy'),
          ],
        },
        effects: [openScene('scene_qc_post_reunion_tea', 'QST-SECT-14-ENTRY')],
      },
    ],
    loadScenes: () => import('./qingchengEntryQuest.scenes').then((m) => m.SCENES),
  },
]
