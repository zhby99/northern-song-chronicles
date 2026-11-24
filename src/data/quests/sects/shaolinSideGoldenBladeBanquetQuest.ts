import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE08_QUEST_ID = 'QST-SECT-01-SIDE-08'

export const SHAOLIN_SIDE08_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus(SHAOLIN_SIDE08_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0186', npcName: '王元霸' },
    { type: 'npcAlive', npcId: 'NPC-0667', npcName: '虚净' },
    { type: 'npcAlive', npcId: 'NPC-0737', npcName: '虚慧' },
  ],
}

export const SHAOLIN_SIDE08_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE08_QUEST_ID,
    title: '金刀寿宴 · 洛阳暗箭',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'luoyang',
    recommendedRealm: '二流中品 ～ 二流上品',
    maxOpponentRealm: '二流上品（关西暗器杀手 · 毒针影）',
    recommendedNote:
      '嵩山少林寺 Lv.2 内门支线（全十四幕）。赴洛阳金刀王家翠竹曲水藏刀八角亭祝贺王元霸寿诞，与驻院俗家弟子虚净、虚慧会合；演武祝寿之际仇家杀手混入戏班暴起发毒箭，掀八仙桌护住寿星并与众人并肩力挫三刺客，缔结少林与金刀王家铁血盟谊。',
    startHint:
      '晋升少林内门后，前往【洛阳府 · 金刀王家大宅 · 翠竹曲水藏刀八角亭】寻虚净或王元霸即可触发寿宴风波。',
    startLocation: {
      regionId: 'luoyang',
      buildingId: 'ly_jindao',
      spotId: 'ly_jd_blade_pav',
      customLabel: '洛阳府 · 金刀王家大宅 · 翠竹曲水藏刀八角亭',
    },
    startCondition: SHAOLIN_SIDE08_START_CONDITION,
    summary:
      '{reignYear}洛阳第一武林世家金刀王家家主【王元霸】喜逢六秩寿诞，嵩山少林与金刀门历代交好，你奉寺中命赴洛阳贺寿，于翠竹曲水藏刀八角亭会合少林俗家护院弟子【虚净】与【虚慧】。宴饮演武正酣，戏台之下忽有关西仇家重金雇佣的暗器杀手【毒针影】率两名死士混入戏班，猝然暴起齐射淬毒袖箭直取王元霸要害。千钧一发之际，你疾步掀翻紫檀八仙桌凌空挡下漫天毒针，护住王老爷子与满堂宾客，随后跃入中庭车轮连战力挫三名刺客。风波平息后，王元霸于正气大厅盛情设宴，与嵩山少林缔结守望相助的铁血盟谊。',
    initialStepId: 'courtyard_banquet',
    steps: {
      courtyard_banquet: {
        id: 'courtyard_banquet',
        title: '中庭演武 · 戏班暗变',
        objective:
          '已于藏刀八角亭会合虚净并察觉戏班异样！请移步【洛阳府 · 金刀王家大宅 · 金刀石锁演武中庭（ly_jd_courtyard）】与虚慧一同护卫王元霸寿宴演武，谨防暗箭偷袭。',
        nextHint:
          '前往【金刀王家大宅 · 金刀石锁演武中庭（ly_jd_courtyard）】，点击「赴中庭寿宴演武，暗防戏班刺客」。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_jindao',
          spotId: 'ly_jd_courtyard',
          customLabel: '洛阳府 · 金刀王家大宅 · 金刀石锁演武中庭',
        },
      },
      hall_alliance_toast: {
        id: 'hall_alliance_toast',
        title: '正气大厅 · 缔结盟谊',
        objective:
          '三名关西暗器刺客皆已伏诛，寿宴转危为安！请前往【金刀王家大宅 · 金刀威震正气大厅（ly_jd_hall）】赴王元霸答谢雅宴。',
        nextHint:
          '前往【金刀王家大宅 · 金刀威震正气大厅（ly_jd_hall）】，点击「赴王元霸答谢之宴，缔结铁血盟谊」或与王元霸交谈。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_jindao',
          spotId: 'ly_jd_hall',
          customLabel: '洛阳府 · 金刀王家大宅 · 金刀威震正气大厅',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls08_start',
        regionId: 'luoyang',
        buildingId: 'ly_jindao',
        spotId: 'ly_jd_blade_pav',
        onceFlag: 'sl_side08_start_triggered',
        condition: SHAOLIN_SIDE08_START_CONDITION,
        effects: [openScene('scene_sls08_01', SHAOLIN_SIDE08_QUEST_ID)],
      },
      {
        id: 'trig_sls08_courtyard',
        regionId: 'luoyang',
        buildingId: 'ly_jindao',
        spotId: 'ly_jd_courtyard',
        onceFlag: 'sl_side08_courtyard_triggered',
        condition: atStep(SHAOLIN_SIDE08_QUEST_ID, 'courtyard_banquet'),
        effects: [openScene('scene_sls08_05', SHAOLIN_SIDE08_QUEST_ID)],
      },
      {
        id: 'trig_sls08_hall',
        regionId: 'luoyang',
        buildingId: 'ly_jindao',
        spotId: 'ly_jd_hall',
        onceFlag: 'sl_side08_hall_triggered',
        condition: atStep(SHAOLIN_SIDE08_QUEST_ID, 'hall_alliance_toast'),
        effects: [openScene('scene_sls08_13', SHAOLIN_SIDE08_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls08_start',
        label: '【少林支线】于藏刀八角亭贺寿并会合虚净',
        badge: '金刀寿宴',
        subtitle: '翠竹曲水藏刀八角亭',
        tone: 'gold',
        regionId: 'luoyang',
        buildingId: 'ly_jindao',
        spotId: 'ly_jd_blade_pav',
        visibleWhen: SHAOLIN_SIDE08_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side08_start_triggered', value: true },
          openScene('scene_sls08_01', SHAOLIN_SIDE08_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls08_courtyard',
        label: '【少林支线】赴中庭寿宴演武，暗防戏班刺客',
        badge: '洛阳暗箭',
        subtitle: '金刀石锁演武中庭',
        tone: 'jade',
        regionId: 'luoyang',
        buildingId: 'ly_jindao',
        spotId: 'ly_jd_courtyard',
        visibleWhen: atStep(SHAOLIN_SIDE08_QUEST_ID, 'courtyard_banquet'),
        effects: [
          { type: 'setFlag', flag: 'sl_side08_courtyard_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side08_assassins_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls08_10', SHAOLIN_SIDE08_QUEST_ID)],
            elseEffects: [openScene('scene_sls08_05', SHAOLIN_SIDE08_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_sls08_hall',
        label: '【少林支线】赴王元霸答谢之宴，缔结铁血盟谊',
        badge: '铁血盟谊',
        subtitle: '金刀威震正气大厅',
        tone: 'gold',
        regionId: 'luoyang',
        buildingId: 'ly_jindao',
        spotId: 'ly_jd_hall',
        visibleWhen: atStep(SHAOLIN_SIDE08_QUEST_ID, 'hall_alliance_toast'),
        effects: [
          { type: 'setFlag', flag: 'sl_side08_hall_triggered', value: true },
          openScene('scene_sls08_13', SHAOLIN_SIDE08_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls08_start_npc',
        label: '代表嵩山少林向金刀王家贺寿并察看寿宴安防',
        badge: '金刀寿宴',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0667', 'NPC-0186'] },
            SHAOLIN_SIDE08_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side08_start_triggered', value: true },
          openScene('scene_sls08_01', SHAOLIN_SIDE08_QUEST_ID),
        ],
      },
      {
        id: 'act_sls08_courtyard_npc',
        label: '随虚慧前往中庭护卫寿宴演武',
        badge: '洛阳暗箭',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0737', 'NPC-0667'] },
            atStep(SHAOLIN_SIDE08_QUEST_ID, 'courtyard_banquet'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side08_courtyard_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side08_assassins_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls08_10', SHAOLIN_SIDE08_QUEST_ID)],
            elseEffects: [openScene('scene_sls08_05', SHAOLIN_SIDE08_QUEST_ID)],
          },
        ],
      },
      {
        id: 'act_sls08_hall_npc',
        label: '于正气大厅接受王元霸答谢，缔结少林金刀盟谊',
        badge: '铁血盟谊',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0186'] },
            atStep(SHAOLIN_SIDE08_QUEST_ID, 'hall_alliance_toast'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side08_hall_triggered', value: true },
          openScene('scene_sls08_13', SHAOLIN_SIDE08_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideGoldenBladeBanquetQuest.scenes').then((m) => m.SCENES),
  },
]
