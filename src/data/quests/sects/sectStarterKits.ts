import type { QuestCondition, QuestEffect, QuestNpcActionDef } from '../../../types/quest'
import { qStatus } from '../../../engine/quest/dsl'

/**
 * 一流门派入门后不久的「起步行装」：一门良品轻功《穿云纵》（MA-139，无门派限制），
 * 少林另配一套良阶披挂与配饰。随开蒙首章任务结算发放；已越过首章的旧存档可向师兄补领一次。
 */
export const CHUANYUN_ART_ID = 'MA-139'

const teachChuanyunIfMissing: QuestEffect = {
  type: 'branch',
  condition: { type: 'learnedArtAtLeast', artId: CHUANYUN_ART_ID, minLevel: 1 },
  thenEffects: [],
  elseEffects: [{ type: 'teachMartialArt', artId: CHUANYUN_ART_ID, autoEquip: true }],
}

/** 少林良阶行装：普门护法杖 + 灰布僧袍 + 铁掌马靴 + 大名硬木弓 + 红珊瑚念珠 + 精铁护腕环 */
export const SHAOLIN_STARTER_GEAR_IDS = [
  'WPN-055',
  'ARM-020',
  'BOT-012',
  'BOW-013',
  'ACC-028',
  'ACC-023',
] as const

export const SHAOLIN_STARTER_KIT_FLAG = 'sl_starter_kit_granted'

export const SHAOLIN_STARTER_KIT_EFFECTS: QuestEffect[] = [
  teachChuanyunIfMissing,
  ...SHAOLIN_STARTER_GEAR_IDS.map((itemId): QuestEffect => ({ type: 'giveItem', itemId, qty: 1 })),
  { type: 'setFlag', flag: SHAOLIN_STARTER_KIT_FLAG, value: true },
  {
    type: 'toast',
    text: '虚松师兄代常住拨下一套行脚披挂（普门护法杖、灰布僧袍、铁掌马靴、硬木弓、红珊瑚念珠、精铁护腕环），并传你良品轻功《穿云纵》！可在枢机菜单【披挂】页换上。',
    tone: 'success',
    logTag: '少林行装',
  },
]

export const HUASHAN_STARTER_KIT_FLAG = 'hs_starter_kit_granted'

export const HUASHAN_STARTER_KIT_EFFECTS: QuestEffect[] = [
  teachChuanyunIfMissing,
  { type: 'setFlag', flag: HUASHAN_STARTER_KIT_FLAG, value: true },
  {
    type: 'toast',
    text: '宁清羽师姐见你下盘尚虚，于玉女峰栈道传你良品轻功《穿云纵》！',
    tone: 'success',
    logTag: '华山轻功',
  },
]

function backfillCondition(sectId: string, questId: string, flag: string): QuestCondition {
  return {
    type: 'all',
    conditions: [
      { type: 'inSect', sectId, minRank: 1 },
      qStatus(questId, 'completed'),
      { type: 'flag', flag, op: 'falsy' },
    ],
  }
}

/** 旧存档补领：首章已完成但未领过行装时，在师兄处显示一次性按钮 */
export function buildStarterKitBackfillAction(params: {
  id: string
  sectId: string
  questId: string
  flag: string
  npcIds: string[]
  label: string
  effects: QuestEffect[]
}): QuestNpcActionDef {
  return {
    id: params.id,
    label: params.label,
    badge: '补领行装',
    tone: 'gold',
    showInBottomBar: true,
    showInSectPanel: true,
    visibleWhen: {
      type: 'all',
      conditions: [
        { type: 'targetNpcMatch', npcIds: params.npcIds },
        backfillCondition(params.sectId, params.questId, params.flag),
      ],
    },
    effects: params.effects,
  }
}
