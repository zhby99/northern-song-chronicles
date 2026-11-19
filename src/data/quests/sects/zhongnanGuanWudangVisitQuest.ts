import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q10_QUEST_ID = 'QST-SECT-11-10'

export const ZHONGNAN_Q10_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 3 },
    qStatus('QST-SECT-11-09', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q10_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-1056', npcName: '刘处静' },
    { type: 'npcAlive', npcId: 'NPC-0119', npcName: '张玄素' },
    { type: 'npcAlive', npcId: 'NPC-0208', npcName: '张清溪' },
    { type: 'npcAlive', npcId: 'NPC-0222', npcName: '上官云豹' },
    { type: 'npcAlive', npcId: 'NPC-0209', npcName: '莫清谷' },
  ],
}

export const ZHONGNAN_Q10_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q10_QUEST_ID,
    title: '太和云海 · 武当问真',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'zhongnanshan',
    recommendedRealm: '一流下品 ～ 一流中品',
    maxOpponentRealm: '一流下品（铁掌帮少主 · 上官云豹）',
    recommendedNote:
      '终南古观真传主干上篇（全二十四幕）。长生子刘处静早年抗敌寒毒复发，王重楼修书遣你南下武当求取紫霄玄丹并问道三日。途经襄阳汉水大码头助武当莫清谷击退铁掌帮少主上官云豹，登太和绝顶与紫霄道宫拜见张玄素、张清溪论道求药，返终南丹院治愈刘处静。',
    startHint:
      '晋升终南古观真传弟子并完成前序师门要务后，前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿】面见掌教【王重楼】领受南下武当之命。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
    },
    startCondition: ZHONGNAN_Q10_START_CONDITION,
    summary:
      '{reignYear}深秋，长生子【刘处静】昔年抗拒西夏寒毒旧伤复发，紫阳真人【王重楼】修书遣你南下湖北武当山，向真武道宗求取太和紫霄玄丹并参校南北道脉。行至【襄阳 · 汉水大码头】时，偶遇铁掌帮少主【上官云豹】截击武当【莫清谷】，你挺剑驰援击退强敌；随后登【武当山 · 太和绝顶真武金殿】与【紫霄道宫丹房】，拜谒太和真人【张玄素】与智囊道人【张清溪】，求得灵丹且论道三日，终返终南【道藏经阁与紫金丹院】治愈刘处静沉疴。',
    initialStepId: 'xiangyang_rescue',
    steps: {
      xiangyang_rescue: {
        id: 'xiangyang_rescue',
        title: '汉水风波 · 援手真武',
        objective:
          '已奉王重楼法旨捧书南下！请前往【襄阳 · 汉水大码头】乘船南渡，探查江畔异动。',
        nextHint:
          '前往【襄阳（xiangyang） · 汉水大码头（xy_dock / xy_dock_main）】，查看码头争执。',
        targetLocation: {
          regionId: 'xiangyang',
          buildingId: 'xy_dock',
          spotId: 'xy_dock_main',
          customLabel: '襄阳 · 汉水大码头',
        },
      },
      wudang_golden_visit: {
        id: 'wudang_golden_visit',
        title: '太和云海 · 金殿呈书',
        objective:
          '已助莫清谷击退铁掌帮少主上官云豹！请随道友引路，登临【武当山 · 太和绝顶真武金殿】拜见太和真人张玄素。',
        nextHint:
          '前往【武当山（wudangshan） · 太和绝顶真武金殿（wd_golden / wd_golden_main）】，呈递王重楼手书。',
        targetLocation: {
          regionId: 'wudangshan',
          buildingId: 'wd_golden',
          spotId: 'wd_golden_main',
          customLabel: '武当山 · 太和绝顶真武金殿',
        },
      },
      zixiao_dao_talk: {
        id: 'zixiao_dao_talk',
        title: '紫霄论道 · 奉丹三日',
        objective:
          '太和真人张玄素已允赐灵丹并邀你论道！请移步【武当山 · 紫霄道宫丹房】，与智囊道人张清溪炼丹论道三日。',
        nextHint:
          '前往【武当山（wudangshan） · 紫霄道宫丹房（wd_zixiao / wd_zixiao_east）】，拜见张清溪求药论道。',
        targetLocation: {
          regionId: 'wudangshan',
          buildingId: 'wd_zixiao',
          spotId: 'wd_zixiao_east',
          customLabel: '武当山 · 紫霄道宫丹房',
        },
      },
      return_cure_liu: {
        id: 'return_cure_liu',
        title: '返山化毒 · 长生重明',
        objective:
          '已携太和紫霄玄丹与南北道藏心得北归！请速返【终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院】救治刘处静。',
        nextHint:
          '返回【终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院（zn_to_alchemy）】，奉丹护法治愈刘处静。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_alchemy',
          customLabel: '终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_znq10_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        onceFlag: 'zn_q10_start_triggered',
        condition: ZHONGNAN_Q10_START_CONDITION,
        effects: [openScene('scene_znq10_01', ZHONGNAN_Q10_QUEST_ID)],
      },
      {
        id: 'trig_znq10_xiangyang',
        regionId: 'xiangyang',
        buildingId: 'xy_dock',
        spotId: 'xy_dock_main',
        onceFlag: 'zn_q10_xy_triggered',
        condition: atStep(ZHONGNAN_Q10_QUEST_ID, 'xiangyang_rescue'),
        effects: [openScene('scene_znq10_05', ZHONGNAN_Q10_QUEST_ID)],
      },
      {
        id: 'trig_znq10_golden',
        regionId: 'wudangshan',
        buildingId: 'wd_golden',
        spotId: 'wd_golden_main',
        onceFlag: 'zn_q10_wd_golden_triggered',
        condition: atStep(ZHONGNAN_Q10_QUEST_ID, 'wudang_golden_visit'),
        effects: [openScene('scene_znq10_11', ZHONGNAN_Q10_QUEST_ID)],
      },
      {
        id: 'trig_znq10_zixiao',
        regionId: 'wudangshan',
        buildingId: 'wd_zixiao',
        spotId: 'wd_zixiao_east',
        onceFlag: 'zn_q10_wd_zixiao_triggered',
        condition: atStep(ZHONGNAN_Q10_QUEST_ID, 'zixiao_dao_talk'),
        effects: [openScene('scene_znq10_16', ZHONGNAN_Q10_QUEST_ID)],
      },
      {
        id: 'trig_znq10_cure',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_alchemy',
        onceFlag: 'zn_q10_cure_triggered',
        condition: atStep(ZHONGNAN_Q10_QUEST_ID, 'return_cure_liu'),
        effects: [openScene('scene_znq10_21', ZHONGNAN_Q10_QUEST_ID)],
      },
    ],
    spotActions: [
      {
        id: 'spot_znq10_start',
        label: '【武当问真】入清修主殿 · 领受南下太和求药法旨',
        badge: '古观真传',
        subtitle: '第一幕 · 重阳玄门清修主殿',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        visibleWhen: ZHONGNAN_Q10_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q10_start_triggered', value: true },
          openScene('scene_znq10_01', ZHONGNAN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq10_xiangyang',
        label: '【武当问真】趋步汉水渡口 · 驰援武当莫清谷',
        badge: '汉水风波',
        subtitle: '第五幕 · 襄阳汉水大码头',
        tone: 'danger',
        regionId: 'xiangyang',
        buildingId: 'xy_dock',
        spotId: 'xy_dock_main',
        visibleWhen: atStep(ZHONGNAN_Q10_QUEST_ID, 'xiangyang_rescue'),
        effects: [
          { type: 'setFlag', flag: 'zn_q10_xy_triggered', value: true },
          openScene('scene_znq10_05', ZHONGNAN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq10_golden',
        label: '【武当问真】登太和金殿 · 拜谒张玄素呈递法帖',
        badge: '太和云海',
        subtitle: '第十一幕 · 太和绝顶真武金殿',
        tone: 'gold',
        regionId: 'wudangshan',
        buildingId: 'wd_golden',
        spotId: 'wd_golden_main',
        visibleWhen: atStep(ZHONGNAN_Q10_QUEST_ID, 'wudang_golden_visit'),
        effects: [
          { type: 'setFlag', flag: 'zn_q10_wd_golden_triggered', value: true },
          openScene('scene_znq10_11', ZHONGNAN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq10_zixiao',
        label: '【武当问真】入紫霄丹房 · 见张清溪求药论道三日',
        badge: '紫霄论道',
        subtitle: '第十六幕 · 紫霄道宫丹房',
        tone: 'primary',
        regionId: 'wudangshan',
        buildingId: 'wd_zixiao',
        spotId: 'wd_zixiao_east',
        visibleWhen: atStep(ZHONGNAN_Q10_QUEST_ID, 'zixiao_dao_talk'),
        effects: [
          { type: 'setFlag', flag: 'zn_q10_wd_zixiao_triggered', value: true },
          openScene('scene_znq10_16', ZHONGNAN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq10_cure',
        label: '【武当问真】返紫金丹院 · 奉紫霄玄丹治愈刘处静',
        badge: '丹成除疴',
        subtitle: '第二十一幕 · 道藏经阁与紫金丹院',
        tone: 'jade',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_alchemy',
        visibleWhen: atStep(ZHONGNAN_Q10_QUEST_ID, 'return_cure_liu'),
        effects: [
          { type: 'setFlag', flag: 'zn_q10_cure_triggered', value: true },
          openScene('scene_znq10_21', ZHONGNAN_Q10_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'npc_znq10_start',
        label: '【武当问真】向紫阳真人领受南下太和求药之命',
        badge: '古观主干',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            ZHONGNAN_Q10_START_CONDITION,
            { type: 'targetNpcMatch', npcIds: ['NPC-0133'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q10_start_triggered', value: true },
          openScene('scene_znq10_01', ZHONGNAN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'npc_znq10_cure',
        label: '【武当问真】呈奉太和紫霄玄丹，为刘师叔拔毒疗伤',
        badge: '奉丹疗伤',
        tone: 'jade',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(ZHONGNAN_Q10_QUEST_ID, 'return_cure_liu'),
            { type: 'targetNpcMatch', npcIds: ['NPC-1056', 'NPC-0133'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q10_cure_triggered', value: true },
          openScene('scene_znq10_21', ZHONGNAN_Q10_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanGuanWudangVisitQuest.scenes').then((m) => m.SCENES),
  },
]
