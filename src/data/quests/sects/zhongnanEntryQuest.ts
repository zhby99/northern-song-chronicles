import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_ENTRY_QUEST_ID = 'QST-SECT-11-ENTRY'

export const ZHONGNAN_ENTRY_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'neverJoinedAnySect' },
    { type: 'noLearnedArtAtOrAboveTier', tier: '良品下品' },
    flag('shaolin_novice_state', 'eq', 'none'),
    flag('zn_permanently_rejected', 'falsy'),
    {
      type: 'any',
      hint: '须筋骨清奇且熟读道典，或身法轻灵、容止出众方合终南隐宗门风',
      conditions: [
        {
          type: 'all',
          conditions: [
            { type: 'talentAtLeast', key: '根骨', min: 60 },
            { type: 'skillAtLeast', key: '经义', min: 30 },
          ],
        },
        {
          type: 'all',
          conditions: [
            { type: 'combatStatAtLeast', key: 'agility', min: 30 },
            { type: 'talentAtLeast', key: '颜值', min: 75 },
          ],
        },
      ],
    },
    { type: 'npcAlive', npcId: 'NPC-1058', npcName: '郝大玄' },
    { type: 'npcAlive', npcId: 'NPC-0323', npcName: '冷薇蓉' },
    { type: 'npcAlive', npcId: 'NPC-0890', npcName: '乌弘霄' },
    { type: 'npcAlive', npcId: 'NPC-0931', npcName: '丘芷霜' },
    { type: 'npcAlive', npcId: 'NPC-1059', npcName: '孙清静' },
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
    { type: 'npcAlive', npcId: 'NPC-1054', npcName: '马钰玄' },
    qStatus(ZHONGNAN_ENTRY_QUEST_ID, 'not_started'),
  ],
}

export const ZHONGNAN_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_ENTRY_QUEST_ID,
    title: '太乙烟霞 · 双脉问心',
    category: 'sect_entry',
    factionId: 'SECT-11',
    regionId: 'zhongnanshan',
    recommendedRealm: '不入流 ～ 三流下品（须从未入过他派且未修习良品及以上武学）',
    maxOpponentRealm: '不入流 ～ 三流下品（西市恶霸、星宿敲钹童子乌弘霄与盗蜜山匪）',
    recommendedNote:
      '十六幕终南隐宗入门长卷：终南重阳古观与活死人墓双脉并峙，只收从未入过他派、未修习良品及以上武学的清白之身！历长安终南草堂解围、击退西市恶霸与星宿敲钹童子乌弘霄、赴终南山寒玉涧助丘芷霜驱匪护玉蜂（切忌私窃玉蜂浆，违者永绝山门）、受孙清静与冷清秋琴诗双脉问心，终登重阳玄门清修主殿由马钰玄验明清白收入外门，授《全真入门剑法》！',
    startHint:
      '从未入过他派且未习良品及以上武学、且契合终南玄门根器或古墓清姿时，前往【京兆府 · 终南草堂（主阁讲席 · 抚琴台）】拜会郝大玄或冷薇蓉启程。',
    startLocation: {
      regionId: 'changan',
      buildingId: 'ca_caotang',
      spotId: 'ca_caotang_main',
      customLabel: '京兆府 · 终南草堂 · 主阁讲席 · 抚琴台',
    },
    startCondition: ZHONGNAN_ENTRY_START_CONDITION,
    summary:
      '{reignYear}早春，京兆府终南草堂梅香初绽。广宁子【郝大玄】与古墓外行走【冷薇蓉】同席论道，恰逢西市恶霸勾结星宿派敲钹童子【乌弘霄】上门滋扰。你挺身而出，以凡躯拳脚先后击退泼皮与星宿童子，得二位前辈青眼相看，赐下太乙青竹符令。你遵约入【终南山隐宗 · 终南后山寒玉涧】，助【丘芷霜】驱散窥伺玉蜂浆的山匪，守住初心未起贪念。随后于临水抚琴榭接受清静散人【孙清静】与幽谷素女【冷清秋】琴诗双脉问心，明晰「玄门济世」与「幽谷守心」之道。终登【重阳古观前脉道院 · 重阳玄门清修主殿】，由大师兄丹阳子【马钰玄】复验白纸清白之身，正式收入终南隐宗外门，亲授《全真入门剑法》！',
    initialStepId: 'stream_protect_bees',
    steps: {
      stream_protect_bees: {
        id: 'stream_protect_bees',
        title: '寒玉驱匪 · 玉蜂守心',
        objective:
          '已领受太乙青竹符令。请前往【终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭】，寻【丘芷霜】协力驱逐窥伺玉蜂巢的山匪。',
        nextHint: '前往【终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭（zn_st_qin）】。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_stream',
          spotId: 'zn_st_qin',
          customLabel: '终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭',
        },
      },
      twin_veins_inquiry: {
        id: 'twin_veins_inquiry',
        title: '临水抚琴 · 双脉问心',
        objective:
          '已击退山匪护住玉蜂浆。请留步【寒玉涧临水抚琴榭】，接受清静散人【孙清静】与幽谷素女【冷清秋】的琴诗双脉问心考校。',
        nextHint: '在【寒玉涧临水抚琴榭】与孙清静或冷清秋对话开启双脉问心。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_stream',
          spotId: 'zn_st_qin',
          customLabel: '终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭',
        },
      },
      chongyang_oath: {
        id: 'chongyang_oath',
        title: '重阳主殿 · 验身入道',
        objective:
          '已通过琴诗双脉问心！请前往【重阳古观前脉道院 · 重阳玄门清修主殿】，拜见丹阳子【马钰玄】复验清白之身并正式拜入终南隐宗！',
        nextHint: '前往【重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】拜见马钰玄。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_hall',
          customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_zn_entry_caotang',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_main',
        onceFlag: 'zn_entry_caotang_triggered',
        condition: ZHONGNAN_ENTRY_START_CONDITION,
        effects: [openScene('scene_zn_entry_01', ZHONGNAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_zn_entry_stream',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_qin',
        onceFlag: 'zn_entry_stream_triggered',
        condition: atStep(ZHONGNAN_ENTRY_QUEST_ID, 'stream_protect_bees'),
        effects: [openScene('scene_zn_entry_07', ZHONGNAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_zn_entry_inquiry',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_qin',
        onceFlag: 'zn_entry_inquiry_triggered',
        condition: atStep(ZHONGNAN_ENTRY_QUEST_ID, 'twin_veins_inquiry'),
        effects: [openScene('scene_zn_entry_11', ZHONGNAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_zn_entry_hall',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        onceFlag: 'zn_entry_hall_triggered',
        condition: atStep(ZHONGNAN_ENTRY_QUEST_ID, 'chongyang_oath'),
        effects: [openScene('scene_zn_entry_14', ZHONGNAN_ENTRY_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_zn_entry_caotang',
        label: '【终南机缘】步入草堂讲席 · 拜会郝大玄与冷薇蓉',
        badge: '终南入门',
        subtitle: '第一幕 · 终南草堂主阁讲席',
        tone: 'gold',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_main',
        visibleWhen: ZHONGNAN_ENTRY_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_entry_caotang_triggered', value: true },
          openScene('scene_zn_entry_01', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_entry_stream',
        label: '【寒玉护蜂】赴临水抚琴榭 · 助丘芷霜驱匪',
        badge: '寒玉驱匪',
        subtitle: '第七幕 · 终南后山寒玉涧',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_qin',
        visibleWhen: atStep(ZHONGNAN_ENTRY_QUEST_ID, 'stream_protect_bees'),
        effects: [
          { type: 'setFlag', flag: 'zn_entry_stream_triggered', value: true },
          openScene('scene_zn_entry_07', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_entry_inquiry',
        label: '【双脉问心】临水聆琴 · 受孙清静与冷清秋考校',
        badge: '双脉问心',
        subtitle: '第十一幕 · 寒玉涧临水抚琴榭',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_qin',
        visibleWhen: atStep(ZHONGNAN_ENTRY_QUEST_ID, 'twin_veins_inquiry'),
        effects: [
          { type: 'setFlag', flag: 'zn_entry_inquiry_triggered', value: true },
          openScene('scene_zn_entry_11', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_entry_hall',
        label: '【玄门入道】登重阳主殿 · 拜见马钰玄领受剑法',
        badge: '正式入门',
        subtitle: '第十四幕 · 重阳玄门清修主殿',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        visibleWhen: atStep(ZHONGNAN_ENTRY_QUEST_ID, 'chongyang_oath'),
        effects: [
          { type: 'setFlag', flag: 'zn_entry_hall_triggered', value: true },
          openScene('scene_zn_entry_14', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_zn_entry_start',
        label: '呈验清白身家 · 叩问终南隐宗仙缘',
        badge: '终南入门',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-1058', 'NPC-0323'] },
            ZHONGNAN_ENTRY_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_entry_caotang_triggered', value: true },
          openScene('scene_zn_entry_01', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_zn_entry_qiuzhishuang',
        label: '呈上太乙青竹符令 · 协力驱逐盗蜜山匪',
        badge: '寒玉驱匪',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0931'] },
            atStep(ZHONGNAN_ENTRY_QUEST_ID, 'stream_protect_bees'),
          ],
        },
        effects: [openScene('scene_zn_entry_07', ZHONGNAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'act_zn_entry_inquiry_npc',
        label: '肃容垂听 · 接受琴诗双脉问心考校',
        badge: '双脉问心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-1059', 'NPC-0173'] },
            atStep(ZHONGNAN_ENTRY_QUEST_ID, 'twin_veins_inquiry'),
          ],
        },
        effects: [openScene('scene_zn_entry_11', ZHONGNAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'act_zn_entry_mayuxuan',
        label: '焚香稽首 · 请丹阳子复验清白收入山门',
        badge: '正式入门',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-1054'] },
            atStep(ZHONGNAN_ENTRY_QUEST_ID, 'chongyang_oath'),
          ],
        },
        effects: [openScene('scene_zn_entry_14', ZHONGNAN_ENTRY_QUEST_ID)],
      },
    ],
    loadScenes: () => import('./zhongnanEntryQuest.scenes').then((m) => m.SCENES),
  },
]
