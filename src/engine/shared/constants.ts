import type { TenArtKey } from '../../types/game'

export const TEN_ART_KEYS: readonly TenArtKey[] = [
  '骑术',
  '算术',
  '经义',
  '策论',
  '诗词',
  '琴',
  '棋',
  '书',
  '画',
  '辩才',
]

export const VALID_TEN_ART_KEYS: ReadonlySet<TenArtKey> = new Set(TEN_ART_KEYS)

export const SHICHEN_LIST = [
  { idx: 0, name: '子时', period: '夜半', range: '23:00-01:00', isNight: true },
  { idx: 1, name: '丑时', period: '鸡鸣', range: '01:00-03:00', isNight: true },
  { idx: 2, name: '寅时', period: '平旦', range: '03:00-05:00', isNight: true },
  { idx: 3, name: '卯时', period: '日出', range: '05:00-07:00', isNight: false },
  { idx: 4, name: '辰时', period: '食时', range: '07:00-09:00', isNight: false },
  { idx: 5, name: '巳时', period: '隅中', range: '09:00-11:00', isNight: false },
  { idx: 6, name: '午时', period: '日中', range: '11:00-13:00', isNight: false },
  { idx: 7, name: '未时', period: '日昳', range: '13:00-15:00', isNight: false },
  { idx: 8, name: '申时', period: '哺时', range: '15:00-17:00', isNight: false },
  { idx: 9, name: '酉时', period: '日入', range: '17:00-19:00', isNight: false },
  { idx: 10, name: '戌时', period: '黄昏', range: '19:00-21:00', isNight: true },
  { idx: 11, name: '亥时', period: '人定', range: '21:00-23:00', isNight: true },
] as const

export const SHICHEN_LABELS: readonly string[] = SHICHEN_LIST.map((s) => s.name)

export const TAIHANG_BANDIT_QUEST_ID = 'QST-SECT-17-TAIHANG-BANDIT'

/**
 * 华北地区标准节点 ID 集合（河北、河东、京东、汴洛及周边名山关隘）
 */
export const NORTH_CHINA_REGION_IDS: ReadonlySet<string> = new Set([
  'yanmenguan',
  'wutaishan',
  'zhending',
  'taiyuan',
  'taihang',
  'daming',
  'jinan',
  'taishan',
  'bianliang',
  'luoyang',
  'shaolin',
])

