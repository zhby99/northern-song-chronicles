import { NORTH_CHINA_REGION_IDS, TAIHANG_BANDIT_QUEST_ID } from '../../../engine/shared/constants'
import type { QuestDefinition } from '../../../types/quest'
import { atStep, warn, openScene } from '../../../engine/quest/dsl'

export { NORTH_CHINA_REGION_IDS, TAIHANG_BANDIT_QUEST_ID }

export const KAIFENG_TAIHANG_BANDIT_QUEST: QuestDefinition = {
  id: TAIHANG_BANDIT_QUEST_ID,
  title: '太行劫匪 · 华北风云',
  category: 'sect_mission',
  factionId: 'SECT-17',
  regionId: 'bianliang',
  recommendedRealm: '二流上品 ~ 一流下品',
  recommendedNote:
    '开封府 / 六扇门晋升 Lv.3 金牌总捕后，于华北地区赶路时有概率触发（平均每百日一次）。全长二十五幕。',
  startHint:
    '晋升开封府 Lv.3 后，在华北地区（汴洛、大名、真定、太原、济南、太行等）官道赶路时随机遭遇。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_kaifengfu',
    spotId: 'bl_kf_court',
    customLabel: '华北官道（随机遭遇） / 开封府衙',
  },
  startCondition: { type: 'inSect', sectId: 'SECT-17', minRank: 3 },
  summary:
    '晋升六扇门 Lv.3 后于华北官道赶路时，偶遇太行山二流上品悍匪雷震山拦路劫杀。将其生擒并救下幸存茶商后押送开封府交展昭与包拯会审，五日后于东京市曹处斩；冷却三十日再行华北官道，将遭太行天王王重岳与九纹狂龙史万山 1v2 联手围堵。须死守硬撑五合坠涧突围，身负【太行重创】返开封向展昭汇报并强制闭门养伤一月方得痊愈结案。',
  initialStepId: 'escort_to_kaifeng',
  steps: {
    escort_to_kaifeng: {
      id: 'escort_to_kaifeng',
      title: '押解悍匪赴开封',
      objective:
        '已在华北官道生擒太行山二流上品悍匪【雷震山】并搜获血案铁证，请速往【开封府 · 开封府衙（六扇门） · 升堂正殿】交予展昭会审。',
      nextHint: '在开封府升堂正殿与展昭对话，点击「押解太行劫匪交差」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
      },
    },
    await_execution: {
      id: 'await_execution',
      title: '静候五日市曹处斩',
      objective:
        '包拯已判处雷震山死罪并收押开封府死囚监，静待五日后午时三刻押赴东京市曹刑场处斩伏法。',
      nextHint: '五日后（时间推进跨过第5日时）将自动触发开封市曹处斩剧情。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
      },
    },
    cooldown_wait: {
      id: 'cooldown_wait',
      title: '太行余波 · 三十日暗涌',
      objective:
        '雷震山已于东京市曹枭首正法，太行绿林盟眼线已放飞信鸽传讯北上，暗流正在酝酿（需冷却 30 日）。',
      nextHint: '三十日冷却期满后，太行山高层将开始在华北官道搜寻少侠踪迹。',
    },
    ambush_ready: {
      id: 'ambush_ready',
      title: '华北危机 · 双雄伺伏',
      objective:
        '太行天王【王重岳】与九纹狂龙【史万山】已率精锐潜入华北官道伺机寻仇，少侠下次在华北地区赶路时将遭二人联手截杀！',
      nextHint:
        '做好万全备战后在华北地区官道赶路，将触发王重岳与史万山 1v2 围堵（须撑过 5 回合，战败将被押回太行山寨斩首）。',
    },
    report_and_recuperate: {
      id: 'report_and_recuperate',
      title: '带伤复命 · 竹院养伤一月',
      objective:
        '虽在王重岳与史万山联手下硬撑五合坠涧逃生，但肺腑已中《太行罡气》，身负【太行重创】减益。请速返【开封府】向展昭汇报并强制养伤一月。',
      nextHint:
        '前往开封府升堂正殿与展昭对话汇报遇伏经过，在府衙后院强制静养三十日方可拔除罡毒解除重伤减益。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
      },
    },
  },
  loadScenes: () => import('./kaifengTaihangBanditQuest.scenes').then((m) => m.SCENES),
  npcActions: [
    {
      id: 'act_thb_handover_bandit',
      label: '押解太行劫匪交差',
      badge: '太行劫匪',
      tone: 'primary',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0140'] },
          atStep(TAIHANG_BANDIT_QUEST_ID, 'escort_to_kaifeng'),
        ],
      },
      effects: [openScene('scene_thb_06_arrive_kaifeng')],
    },
    {
      id: 'act_thb_report_injury',
      label: '汇报太行遇伏重伤之事',
      badge: '养伤复命',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0140'] },
          atStep(TAIHANG_BANDIT_QUEST_ID, 'report_and_recuperate'),
        ],
      },
      effects: [openScene('scene_thb_21_stagger_into_kaifeng')],
    },
  ],
  onDeadlineExpired: {
    effects: [
      {
        type: 'branch',
        condition: atStep(TAIHANG_BANDIT_QUEST_ID, 'await_execution'),
        thenEffects: [openScene('scene_thb_10_dawn_prison_escort')],
        elseEffects: [
          {
            type: 'branch',
            condition: atStep(TAIHANG_BANDIT_QUEST_ID, 'cooldown_wait'),
            thenEffects: [
              {
                type: 'setQuestStep',
                questId: TAIHANG_BANDIT_QUEST_ID,
                stepId: 'ambush_ready',
                deadlineDays: null,
                silent: false,
              },
              warn('风声紧迫：太行天王王重岳与九纹狂龙史万山已率众下山寻仇，华北官道恐有双雄截杀！', '太行寻仇'),
            ],
          },
        ],
      },
    ],
  },
}

export const KAIFENG_TAIHANG_BANDIT_QUESTS: QuestDefinition[] = [KAIFENG_TAIHANG_BANDIT_QUEST]
