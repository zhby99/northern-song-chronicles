import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, openScene } from '../../../engine/quest/dsl'

export const QINGCHENG_ENTRY_QUEST_ID = 'QST-SECT-14-ENTRY'

export const QINGCHENG_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'neverJoinedAnySect' },
    { type: 'noLearnedArtAtOrAboveTier', tier: '良品下品' },
    flag('shaolin_novice_state', 'eq', 'none'),
    flag('qc_permanently_rejected', 'falsy'),
    { type: 'npcAlive', npcId: 'NPC-0139', npcName: '余沧澜' },
    qStatus(QINGCHENG_ENTRY_QUEST_ID, 'not_started'),
  ],
}

export const QINGCHENG_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: QINGCHENG_ENTRY_QUEST_ID,
    title: '蜀道暗棋 · 松风试锋',
    category: 'sect_entry',
    factionId: 'SECT-14',
    regionId: 'qingcheng',
    recommendedRealm: '不入流 ～ 三流下品（须从未入过他派且未修习良品及以上武学）',
    maxOpponentRealm: '三流下品（盐帮暗桩、唐门外院斥候与叛徒吴六）',
    recommendedNote:
      '十二幕青城派白纸入门长卷：青城上清宫只收从未加入过任何门派、且未修习良品及以上武学的白纸弟子！于成都锦江茶肆截回川东盐帮盗走的巡山暗哨图，赴青城山孤崖从方正受传《三才剑》并截回唐门越界偷采的乌头灵芝，再赴剑门关清理叛徒吴六（若心软私放则永绝山门），终登松风殿在余沧澜座前择定共争川西第一宗、受传《青城松风剑》入门。',
    startHint:
      '从未加入过任何门派且未学良品及以上武学时，前往【成都府 · 锦江万里桥茶肆】即可触发盐帮暗桩风波（或与吉元 / 侯沧海交谈开启）。',
    startLocation: {
      regionId: 'chengdu',
      buildingId: 'cd_teahouse',
      spotId: 'cd_teahouse_main',
      customLabel: '成都府 · 锦江万里桥茶肆',
    },
    startCondition: QINGCHENG_START_CONDITION,
    summary:
      '{reignYear}锦官城雨夜，川东盐帮暗桩买通青城外院贪财弟子【吴六】，盗走《青城唐门界碑巡山暗哨图》。青城长老【侯沧海】与执事【吉元】看中你身为未入江湖的白纸生面孔，托你在【锦江万里桥茶肆】以凡躯制住暗桩、抢回暗哨图。随后你西上【青城山上清宫松风殿】，于【松涛云海抚琴孤崖】得剑师【方正】点拨凡品《三才剑》与青钢剑，赴山涧界碑截杀越界偷采乌头灵芝的唐门外院斥候。复北上【剑门关】追截逃亡叛徒吴六，在守关长老【贾天鹤】冷眼注视下果决清理门户、绝不留患。终登【上清松风演剑主殿】面见掌门【余沧澜】，直承青城剑走偏锋、争雄川西之志，受传《青城松风剑》拜入青城派！',
    initialStepId: 'chengdu_salt_spy',
    steps: {
      chengdu_salt_spy: {
        id: 'chengdu_salt_spy',
        title: '锦官暗账 · 茶肆截回暗哨图',
        objective:
          '在【成都府 · 锦江万里桥茶肆】助青城派侯沧海与吉元试探并制住川东盐帮暗桩，抢回被盗的《青城唐门界碑巡山暗哨图》。',
        nextHint: '进入【成都府 · 锦江万里桥茶肆】或与青城执事【吉元】交谈推进。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'cd_teahouse',
          spotId: 'cd_teahouse_main',
          customLabel: '成都府 > 锦江万里桥茶肆 > 高楼雅座 · 凭栏席',
        },
      },
      qingcheng_boundary_herb: {
        id: 'qingcheng_boundary_herb',
        title: '界碑夺笋 · 孤崖受剑截唐门',
        objective:
          '已截回暗哨图并验明身家。请西赴【青城山 / 唐家堡 · 青城山上清宫松风殿 > 松涛云海抚琴孤崖】拜见剑师【方正】受传《三才剑》，随后追截越界偷采乌头灵芝的唐门外院斥候！',
        nextHint: '前往【青城山上清宫松风殿】点击【松涛云海抚琴孤崖】（或与方正 / 申风涛交谈）。',
        targetLocation: {
          regionId: 'qingcheng',
          buildingId: 'qc_shangqing',
          spotId: 'qc_sq_cliff',
          customLabel: '青城山 / 唐家堡 > 青城山上清宫松风殿 > 松涛云海抚琴孤崖',
        },
      },
      jianmen_traitor_hunt: {
        id: 'jianmen_traitor_hunt',
        title: '剑门夜截 · 清理叛徒吴六',
        objective:
          '盗卖暗哨图的叛徒吴六连夜北逃【剑门关】欲投川北绿林！请赶赴【剑门关 · 剑阁鸟道悬空栈 > 临渊乱石试剑坪】会合守关长老【贾天鹤】，截下吴六并果决清理门户。',
        nextHint: '前往【剑门关】进入【剑阁鸟道悬空栈 > 临渊乱石试剑坪】（或与贾天鹤交谈）。',
        targetLocation: {
          regionId: 'jianmenguan',
          buildingId: 'jm_plank',
          spotId: 'jm_plank_west',
          customLabel: '剑门关 > 剑阁鸟道悬空栈 > 临渊乱石试剑坪',
        },
      },
      shangqing_final_oath: {
        id: 'shangqing_final_oath',
        title: '上清松风殿 · 剑压群芳入青城',
        objective:
          '剑门清理门户已毕！请返回【青城山上清宫松风殿 > 上清松风演剑主殿】觐见掌门【余沧澜】，择定是否随青城剑走偏锋、共争川西第一宗。',
        nextHint: '前往【青城山上清宫松风殿 > 上清松风演剑主殿】（或与余沧澜交谈）。',
        targetLocation: {
          regionId: 'qingcheng',
          buildingId: 'qc_shangqing',
          spotId: 'qc_sq_hall',
          customLabel: '青城山 / 唐家堡 > 青城山上清宫松风殿 > 上清松风演剑主殿',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_qc_teahouse_start',
        regionId: 'chengdu',
        buildingId: 'cd_teahouse',
        onceFlag: 'qc_entry_triggered',
        condition: QINGCHENG_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'qc_entry_triggered', value: true },
          { type: 'startQuest', questId: QINGCHENG_ENTRY_QUEST_ID, stepId: 'chengdu_salt_spy', silent: true },
          openScene('SCENE_QC_01_TEAHOUSE_SPY', QINGCHENG_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_qc_cliff_fangzheng',
        regionId: 'qingcheng',
        buildingId: 'qc_shangqing',
        spotId: 'qc_sq_cliff',
        onceFlag: 'qc_cliff_seen',
        condition: atStep(QINGCHENG_ENTRY_QUEST_ID, 'qingcheng_boundary_herb'),
        effects: [
          { type: 'setFlag', flag: 'qc_cliff_seen', value: true },
          openScene('SCENE_QC_04_SHANGQING_WELLS', QINGCHENG_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_qc_jianmen_traitor',
        regionId: 'jianmenguan',
        buildingId: 'jm_plank',
        spotId: 'jm_plank_west',
        onceFlag: 'qc_jianmen_seen',
        condition: atStep(QINGCHENG_ENTRY_QUEST_ID, 'jianmen_traitor_hunt'),
        effects: [
          { type: 'setFlag', flag: 'qc_jianmen_seen', value: true },
          openScene('SCENE_QC_08_JIANMEN_JIATIANHE', QINGCHENG_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_qc_shangqing_master',
        regionId: 'qingcheng',
        buildingId: 'qc_shangqing',
        spotId: 'qc_sq_hall',
        onceFlag: 'qc_hall_seen',
        condition: atStep(QINGCHENG_ENTRY_QUEST_ID, 'shangqing_final_oath'),
        effects: [
          { type: 'setFlag', flag: 'qc_hall_seen', value: true },
          openScene('SCENE_QC_11_YUCANGLAN_AMBITION', QINGCHENG_ENTRY_QUEST_ID),
        ],
      },
    ],
    spotActions: [
      {
        id: 'spot_act_qc_cliff',
        regionId: 'qingcheng',
        buildingId: 'qc_shangqing',
        spotId: 'qc_sq_cliff',
        label: '松涛孤崖受剑 · 界碑截唐门',
        badge: '青城试锋',
        tone: 'jade',
        visibleWhen: atStep(QINGCHENG_ENTRY_QUEST_ID, 'qingcheng_boundary_herb'),
        effects: [
          { type: 'setFlag', flag: 'qc_cliff_seen', value: true },
          openScene('SCENE_QC_04_SHANGQING_WELLS', QINGCHENG_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_act_qc_jianmen',
        regionId: 'jianmenguan',
        buildingId: 'jm_plank',
        spotId: 'jm_plank_west',
        label: '乱石坪截杀叛徒吴六',
        badge: '清理门户',
        tone: 'gold',
        visibleWhen: atStep(QINGCHENG_ENTRY_QUEST_ID, 'jianmen_traitor_hunt'),
        effects: [
          { type: 'setFlag', flag: 'qc_jianmen_seen', value: true },
          openScene('SCENE_QC_08_JIANMEN_JIATIANHE', QINGCHENG_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_act_qc_hall',
        regionId: 'qingcheng',
        buildingId: 'qc_shangqing',
        spotId: 'qc_sq_hall',
        label: '上清松风殿 · 觐见余沧澜',
        badge: '拜入青城',
        tone: 'gold',
        visibleWhen: atStep(QINGCHENG_ENTRY_QUEST_ID, 'shangqing_final_oath'),
        effects: [
          { type: 'setFlag', flag: 'qc_hall_seen', value: true },
          openScene('SCENE_QC_11_YUCANGLAN_AMBITION', QINGCHENG_ENTRY_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'act_qc_jiyuan_start',
        label: '呈验白纸身家 · 替青城截回暗哨图',
        badge: '青城入门',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0357', 'NPC-0220'] },
            QINGCHENG_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'qc_entry_triggered', value: true },
          { type: 'startQuest', questId: QINGCHENG_ENTRY_QUEST_ID, stepId: 'chengdu_salt_spy', silent: true },
          openScene('SCENE_QC_01_TEAHOUSE_SPY', QINGCHENG_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_qc_teahouse_resume',
        label: '续行茶肆截回暗哨图',
        badge: '锦官暗账',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0357', 'NPC-0220'] },
            atStep(QINGCHENG_ENTRY_QUEST_ID, 'chengdu_salt_spy'),
          ],
        },
        effects: [openScene('SCENE_QC_01_TEAHOUSE_SPY', QINGCHENG_ENTRY_QUEST_ID)],
      },
      {
        id: 'act_qc_fangzheng_cliff',
        label: '孤崖听琴受剑 · 界碑截唐门',
        badge: '界碑夺笋',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0354', 'NPC-0459', 'NPC-0516'] },
            atStep(QINGCHENG_ENTRY_QUEST_ID, 'qingcheng_boundary_herb'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'qc_cliff_seen', value: true },
          openScene('SCENE_QC_04_SHANGQING_WELLS', QINGCHENG_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_qc_jiatianhe_jianmen',
        label: '奉贾长老令 · 截杀叛徒吴六',
        badge: '剑门清理',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0221', 'NPC-0389', 'NPC-0401'] },
            atStep(QINGCHENG_ENTRY_QUEST_ID, 'jianmen_traitor_hunt'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'qc_jianmen_seen', value: true },
          openScene('SCENE_QC_08_JIANMEN_JIATIANHE', QINGCHENG_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_qc_yucanglan_final',
        label: '上清松风殿 · 拜见掌门余沧澜',
        badge: '松风授剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0139'] },
            atStep(QINGCHENG_ENTRY_QUEST_ID, 'shangqing_final_oath'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'qc_hall_seen', value: true },
          openScene('SCENE_QC_11_YUCANGLAN_AMBITION', QINGCHENG_ENTRY_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./qingchengEntryQuest.scenes').then((m) => m.SCENES),
  },
]
