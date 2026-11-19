import {
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPC_DB_MAP,
  REGION_DB_MAP,
} from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import type { QuestCondition, QuestDefinition } from '../../types/quest'
import { getSectRankTitle } from '../sect/ranks'

export interface QuestEdgeDef {
  from: string
  to: string
  type: 'solid' | 'dashed'
  relation: string
  trackOffset?: number
  dstOffsetX?: number
}

export interface ResolvedQuestNode {
  questId: string
  qDef: QuestDefinition
  col: number
  row: number
  seal: string
  shortTag: string
  prereqs: string[]
  rewards: string[]
  branchNote?: string
}

export interface BuiltQuestGraph {
  nodes: ResolvedQuestNode[]
  edges: QuestEdgeDef[]
  standaloneRowCount: number
  maxRow: number
}

const TALENT_LABELS: Record<string, string> = {
  bone: '根骨',
  comprehension: '悟性',
  charm: '颜值',
}

const STAT_LABELS: Record<string, string> = {
  maxHp: '气血上限',
  maxMp: '内力上限',
  agility: '身法',
  res: '抗性',
}

const CATEGORY_SHORT_LABELS: Record<string, string> = {
  sect_entry: '宗门入门',
  sect_mission: '师门要务',
  adventure: '江湖奇遇',
  city_story: '州府风波',
  main_story: '皇祐风云',
}

/**
 * 从 `QuestCondition` 语法树自动提取可读中文前置条件说明（不再手工维护双份文案）。
 */
export function summarizeConditionClauses(
  cond: QuestCondition | undefined,
  questMap: Readonly<Record<string, QuestDefinition>>,
): string[] {
  if (!cond) return []
  const clauses: string[] = []

  const pushUnique = (text: string) => {
    if (text && !clauses.includes(text)) clauses.push(text)
  }

  const visit = (c: QuestCondition) => {
    switch (c.type) {
      case 'all':
        c.conditions.forEach(visit)
        break
      case 'any': {
        if (c.hint) {
          pushUnique(c.hint)
          break
        }
        const sub = c.conditions
          .flatMap((sc) => summarizeConditionClauses(sc, questMap))
          .filter(Boolean)
        if (sub.length > 0) {
          pushUnique(sub.join(' 或 '))
        }
        break
      }
      case 'not':
        if (c.reason) {
          pushUnique(c.reason)
        }
        break
      case 'notInAnySect': {
        if (c.allowTransferFromSectId) {
          const transferName =
            FACTION_DB_MAP[c.allowTransferFromSectId]?.name ?? c.allowTransferFromSectId
          pushUnique(`无门无派（自由游侠），或隶属【${transferName}】同脉转投`)
        } else {
          pushUnique('无门无派（自由游侠）')
        }
        break
      }
      case 'inSect': {
        if (c.sectId === null) {
          pushUnique('无门无派（自由游侠）')
        } else {
          const facName = FACTION_DB_MAP[c.sectId]?.name ?? c.sectId
          if (c.minRank) {
            const rankTitle = getSectRankTitle(c.sectId, c.minRank)
            pushUnique(`隶属【${facName}】且职阶 ≥ Lv.${c.minRank}「${rankTitle}」`)
          } else {
            pushUnique(`隶属【${facName}】`)
          }
        }
        break
      }
      case 'kaifengRank2DaysAtLeast':
        pushUnique(`于【开封府】任 Lv.2「捕头都头」累计满 ${c.min} 日`)
        break
      case 'sectDaysAtLeast': {
        const facName = FACTION_DB_MAP[c.sectId]?.name ?? c.sectId
        pushUnique(`入籍【${facName}】累计满 ${c.min} 日`)
        break
      }
      case 'questStatus': {
        if (c.status === 'completed') {
          const title = questMap[c.questId]?.title ?? c.questId
          pushUnique(`必修前置：完结《${title}》`)
        }
        break
      }
      case 'questCompletedDaysAgoAtLeast': {
        const title = questMap[c.questId]?.title ?? c.questId
        pushUnique(`必修前置：《${title}》结案满 ${c.minDays} 日`)
        break
      }
      case 'hasItem': {
        const itemName = ITEM_DB_MAP[c.itemId]?.name ?? c.itemId
        pushUnique(`持有《${itemName}》${c.qty && c.qty > 1 ? ` ×${c.qty}` : ''}`)
        break
      }
      case 'learnedArtAtLeast': {
        const artName = MARTIAL_ART_DB_MAP[c.artId]?.name ?? c.artId
        pushUnique(`《${artName}》修至 ≥ 第 ${c.minLevel} 重`)
        break
      }
      case 'talentAtLeast':
        pushUnique(`先天【${TALENT_LABELS[c.key] ?? c.key}】≥ ${c.min}`)
        break
      case 'talentAtMost':
        pushUnique(`先天【${TALENT_LABELS[c.key] ?? c.key}】≤ ${c.max}`)
        break
      case 'skillAtLeast':
        pushUnique(`十艺【${c.key}】≥ ${c.min}`)
        break
      case 'skillAtMost':
        pushUnique(`十艺【${c.key}】≤ ${c.max}`)
        break
      case 'combatStatAtLeast':
        pushUnique(`${STAT_LABELS[c.key] ?? c.key} ≥ ${c.min}`)
        break
      case 'silverAtLeast':
        pushUnique(`随身纹银 ≥ ${c.min} 两`)
        break
      case 'silverAtMost':
        pushUnique(`随身纹银 ≤ ${c.max} 两`)
        break
      case 'foodAtLeast':
        pushUnique(`随身干粮 ≥ ${c.min} 份`)
        break
      case 'renownAtLeast':
        pushUnique(`江湖声望 ≥ ${c.min}`)
        break
      case 'chivalryAtLeast':
        pushUnique(`侠义值 ≥ ${c.min}`)
        break
      case 'npcFavorAtLeast': {
        const npcName = c.npcName ?? NPC_DB_MAP[c.npcId]?.name ?? c.npcId
        pushUnique(`【${npcName}】好感度 ≥ ${c.min}`)
        break
      }
      case 'flag':
        if (c.label) pushUnique(c.label)
        break
      default:
        break
    }
  }

  visit(cond)
  return clauses
}

function collectConditionAtoms(
  cond: QuestCondition | undefined,
  visitor: (atom: QuestCondition) => void,
): void {
  if (!cond) return
  visitor(cond)
  if (cond.type === 'all' || cond.type === 'any') {
    for (const sub of cond.conditions) collectConditionAtoms(sub, visitor)
  } else if (cond.type === 'not') {
    collectConditionAtoms(cond.condition, visitor)
  }
}

function deriveSealChar(q: QuestDefinition): string {
  const facName = q.factionId ? FACTION_DB_MAP[q.factionId]?.name ?? '' : ''
  if (facName.includes('少林') && facName.includes('南')) return '南'
  if (facName.includes('少林')) {
    if (q.id === 'QST-SECT-01-01') return '蒙'
    if (q.id === 'QST-SECT-01-02') return '庄'
    if (q.id === 'QST-SECT-01-03') return '账'
    if (q.id === 'QST-SECT-01-04') return '桩'
    if (q.id === 'QST-SECT-01-05') return '刀'
    if (q.id === 'QST-SECT-01-06') return '杵'
    if (q.id === 'QST-SECT-01-07') return '龙'
    if (q.id === 'QST-SECT-01-08') return '铜'
    if (q.id === 'QST-SECT-01-09') return '剑'
    if (q.id === 'QST-SECT-01-10') return '花'
    if (q.id === 'QST-SECT-01-11') return '拈'
    if (q.id === 'QST-SECT-01-12') return '玉'
    if (q.id === 'QST-SECT-01-13') return '杖'
    if (q.id === 'QST-SECT-01-14') return '拍'
    if (q.id === 'QST-SECT-01-15') return '药'
    if (q.id === 'QST-SECT-01-16') return '戒'
    if (q.id === 'QST-SECT-01-17') return '市'
    if (q.id === 'QST-SECT-01-18') return '镖'
    if (q.id === 'QST-SECT-01-19') return '闽'
    if (q.id === 'QST-SECT-01-20') return '统'
    if (q.id === 'QST-SECT-01-21') return '苇'
    if (q.id === 'QST-SECT-01-22') return '燃'
    if (q.id === 'QST-SECT-01-23') return '刚'
    if (q.id === 'QST-SECT-01-24') return '壁'
    if (q.id === 'QST-SECT-01-25') return '般'
    if (q.id === 'QST-SECT-01-26') return '碑'
    if (q.id === 'QST-SECT-01-27') return '指'
    if (q.id === 'QST-SECT-01-28') return '影'
    if (q.id === 'QST-SECT-01-29') return '阳'
    if (q.id === 'QST-SECT-01-30') return '扫'
    if (q.id === 'QST-SECT-01-31') return '网'
    if (q.id === 'QST-SECT-01-32') return '丹'
    if (q.id === 'QST-SECT-01-33') return '座'
    if (q.id === 'QST-SECT-01-34') return '悲'
    if (q.id === 'QST-SECT-01-35') return '劫'
    if (q.id === 'QST-SECT-01-36') return '髓'
    if (q.id === 'QST-SECT-01-37') return '金'
    if (q.id === 'QST-SECT-01-38') return '衣'
    if (q.id === 'QST-SECT-01-39') return '王'
    if (q.id === 'QST-SECT-01-40') return '居'
    if (q.id === 'QST-SECT-01-41') return '阵'
    if (q.id === 'QST-SECT-01-42') return '易'
    if (q.id === 'QST-SECT-01-SIDE-01') return '薪'
    if (q.id === 'QST-SECT-01-SIDE-02') return '拓'
    if (q.id === 'QST-SECT-01-SIDE-03') return '粮'
    if (q.id === 'QST-SECT-01-SIDE-04') return '塔'
    if (q.id === 'QST-SECT-01-SIDE-05') return '儒'
    if (q.id === 'QST-SECT-01-SIDE-06') return '假'
    if (q.id === 'QST-SECT-01-SIDE-07') return '雨'
    if (q.id === 'QST-SECT-01-SIDE-08') return '宴'
    if (q.id === 'QST-SECT-01-SIDE-09') return '舍'
    if (q.id === 'QST-SECT-01-SIDE-10') return '芸'
    if (q.id === 'QST-SECT-01-SIDE-11') return '练'
    if (q.id === 'QST-SECT-01-SIDE-12') return '护'
    if (q.id === 'QST-SECT-01-SIDE-13') return '狮'
    if (q.id === 'QST-SECT-01-SIDE-14') return '铁'
    if (q.id === 'QST-SECT-01-SIDE-15') return '渡'
    if (q.id === 'QST-SECT-01-SIDE-16') return '牒'
    if (q.id === 'QST-SECT-01-SIDE-17') return '雪'
    if (q.id === 'QST-SECT-01-SIDE-18') return '图'
    return '禅'
  }
  if (facName.includes('丐帮')) return '丐'
  if (facName.includes('五台')) return '台'
  if (facName.includes('华山')) {
    if (q.id === 'QST-SECT-05-01') return '初'
    if (q.id === 'QST-SECT-05-02') return '分'
    if (q.id === 'QST-SECT-05-03') return '养'
    if (q.id === 'QST-SECT-05-04') return '渭'
    if (q.id === 'QST-SECT-05-05') return '夷'
    if (q.id === 'QST-SECT-05-06') return '快'
    if (q.id === 'QST-SECT-05-07') return '雁'
    if (q.id === 'QST-SECT-05-08') return '变'
    if (q.id === 'QST-SECT-05-09') return '混'
    if (q.id === 'QST-SECT-05-10') return '岳'
    if (q.id === 'QST-SECT-05-11') return '仙'
    if (q.id === 'QST-SECT-05-12') return '神'
    if (q.id === 'QST-SECT-05-13') return '壁'
    if (q.id === 'QST-SECT-05-14') return '和'
    if (q.id === 'QST-SECT-05-15') return '魔'
    if (q.id === 'QST-SECT-05-16') return '塔'
    if (q.id === 'QST-SECT-05-17') return '紫'
    if (q.id === 'QST-SECT-05-18') return '孤'
    if (q.id === 'QST-SECT-05-19') return '正'
    if (q.id === 'QST-SECT-05-20') return '逆'
    if (q.id === 'QST-SECT-05-21') return '合'
    if (q.id === 'QST-SECT-05-22') return '巅'
    if (q.id === 'QST-SECT-05-SIDE-01') return '栈'
    if (q.id === 'QST-SECT-05-SIDE-02') return '参'
    if (q.id === 'QST-SECT-05-SIDE-03') return '枰'
    if (q.id === 'QST-SECT-05-SIDE-04') return '雨'
    if (q.id === 'QST-SECT-05-SIDE-05') return '炉'
    if (q.id === 'QST-SECT-05-SIDE-06') return '刃'
    if (q.id === 'QST-SECT-05-SIDE-07') return '麦'
    if (q.id === 'QST-SECT-05-SIDE-08') return '鬼'
    if (q.id === 'QST-SECT-05-SIDE-09') return '道'
    if (q.id === 'QST-SECT-05-SIDE-10') return '陇'
    return '华'
  }
  if (facName.includes('泰山')) return '岱'
  if (facName.includes('峨眉')) return '峨'
  if (facName.includes('真武')) return '武'
  if (facName.includes('终南')) {
    const znSeals: Record<string, string> = {
      'QST-SECT-11-ENTRY': '隐',
      'QST-SECT-11-01': '筑',
      'QST-SECT-11-02': '午',
      'QST-SECT-11-03': '分',
      'QST-SECT-11-04': '斗',
      'QST-SECT-11-05': '雁',
      'QST-SECT-11-06': '劈',
      'QST-SECT-11-07': '马',
      'QST-SECT-11-08': '夷',
      'QST-SECT-11-09': '丹',
      'QST-SECT-11-10': '真',
      'QST-SECT-11-11': '阳',
      'QST-SECT-11-12': '雀',
      'QST-SECT-11-13': '霜',
      'QST-SECT-11-14': '蜂',
      'QST-SECT-11-15': '越',
      'QST-SECT-11-16': '誓',
      'QST-SECT-11-17': '针',
      'QST-SECT-11-18': '棋',
      'QST-SECT-11-19': '玉',
      'QST-SECT-11-20': '碑',
      'QST-SECT-11-21': '数',
      'QST-SECT-11-22': '延',
      'QST-SECT-11-23': '藏',
      'QST-SECT-11-24': '封',
      'QST-SECT-11-25': '猿',
      'QST-SECT-11-26': '涛',
      'QST-SECT-11-27': '昆',
      'QST-SECT-11-28': '龙',
      'QST-SECT-11-29': '劫',
      'QST-SECT-11-30': '合',
      'QST-SECT-11-31': '裂',
      'QST-SECT-11-32': '先',
      'QST-SECT-11-33': '星',
      'QST-SECT-11-34': '冰',
      'QST-SECT-11-35': '素',
      'QST-SECT-11-36': '紫',
      'QST-SECT-11-37': '侣',
      'QST-SECT-11-38': '黯',
      'QST-SECT-11-39': '虚',
      'QST-SECT-11-40': '窖',
      'QST-SECT-11-41': '巅',
      'QST-SECT-11-SIDE-01': '蜜',
      'QST-SECT-11-SIDE-02': '渠',
      'QST-SECT-11-SIDE-03': '炉',
      'QST-SECT-11-SIDE-04': '鼓',
      'QST-SECT-11-SIDE-05': '香',
      'QST-SECT-11-SIDE-06': '樵',
      'QST-SECT-11-SIDE-07': '帖',
      'QST-SECT-11-SIDE-08': '茗',
    }
    return znSeals[q.id] ?? '隐'
  }
  if (facName.includes('唐门')) return '唐'
  if (facName.includes('青城')) return '青'
  if (facName.includes('铁掌')) return '掌'
  if (facName.includes('星宿')) return '毒'
  if (facName.includes('绿林')) return '匪'
  if (facName.includes('常山')) return '枪'
  if (facName.includes('杨')) return '霸'
  if (facName.includes('漕帮')) return '漕'
  if (facName.includes('八极')) return '八'
  if (facName.includes('镇远')) return '镖'
  if (facName.includes('开封府')) {
    if (q.title.includes('龙颜')) return '龙'
    if (q.title.includes('太行')) return '险'
    if (q.title.includes('剑')) return '剑'
    return '捕'
  }
  if (facName.includes('禁军')) {
    if (q.title.includes('暗桩') || q.title.includes('虎符')) return '符'
    if (q.title.includes('折戟')) return '折'
    if (q.title.includes('武经')) return '略'
    if (q.title.includes('犁庭')) return '侯'
    if (q.title.includes('樊楼')) return '巡'
    if (q.title.includes('玉津') || q.title.includes('校马')) return '驹'
    if (q.title.includes('铁冶') || q.title.includes('玄铁')) return '铁'
    if (q.title.includes('秦州') || q.title.includes('茶马')) return '茶'
    if (q.title.includes('破燕 · 壹')) return '影'
    if (q.title.includes('破燕 · 贰')) return '嵩'
    if (q.title.includes('破燕 · 叁')) return '燕'
    if (q.title.includes('同文馆')) return '宾'
    if (q.title.includes('邕州')) return '蛮'
    return '军'
  }
  const clean = q.title.replace(/[^\u4e00-\u9fa5]/g, '')
  return clean.slice(0, 1) || '卷'
}

function deriveShortTag(q: QuestDefinition): string {
  const facName = q.factionId ? FACTION_DB_MAP[q.factionId]?.name : undefined
  const regName = q.regionId ? REGION_DB_MAP[q.regionId]?.name : undefined
  const catLabel = CATEGORY_SHORT_LABELS[q.category] ?? '江湖卷宗'
  const prefix = facName ?? regName ?? '中原江湖'
  return `${prefix} · ${catLabel}`
}

/**
 * 从 `QUEST_REGISTRY` 各卷的 `startCondition`、触发器条件、门派职阶与信物闭环自动推导节点与有向边。
 */
/** 当前生涯任务子集：已入门派 → 本门任务 + 江湖奇遇/皇祐风云；尚无门派 → 各派入门 + 江湖奇遇/皇祐风云 */
export function selectSectQuests(
  allQuests: readonly QuestDefinition[],
  sectId: string | null,
): QuestDefinition[] {
  const isGlobalStory = (q: QuestDefinition) =>
    q.category === 'adventure' || q.category === 'main_story' || q.category === 'city_story'
  return sectId
    ? allQuests.filter((q) => q.factionId === sectId || isGlobalStory(q))
    : allQuests.filter((q) => q.category === 'sect_entry' || isGlobalStory(q))
}

export function buildQuestDependencyGraph(
  quests: readonly QuestDefinition[],
): BuiltQuestGraph {
  const questMap: Record<string, QuestDefinition> = Object.fromEntries(quests.map((q) => [q.id, q]))
  const rawEdges: QuestEdgeDef[] = []
  const seenPairs = new Set<string>()

  const addEdge = (from: string, to: string, type: 'solid' | 'dashed', relation: string) => {
    if (from === to || !questMap[from] || !questMap[to]) return
    const key = `${from}->${to}`
    if (seenPairs.has(key)) return
    seenPairs.add(key)
    rawEdges.push({ from, to, type, relation })
  }

  // Index quests that unlock key map items / referral credentials / sect rank milestones
  const itemProducerByItemId: Record<string, { questId: string; mode: 'solid' | 'dashed'; note: string }> = {}
  const spearLineageProducerIds: string[] = []
  let imperialGuardGateQuestId: string | null = null
  let kaifengRank3GateQuestId: string | null = null

  for (const q of quests) {
    const blob = `${q.title} ${q.summary}`
    if (blob.includes('燕子坞') && q.category === 'adventure') {
      itemProducerByItemId['ITM-MSC-020'] = {
        questId: q.id,
        mode: 'solid',
        note: '必修前置：须先绘成《太湖燕子坞烟波水路舆图》方可渡湖查案',
      }
    }
    if (blob.includes('桃花岛') && q.category === 'adventure') {
      itemProducerByItemId['ITM-MSC-021'] = {
        questId: q.id,
        mode: 'solid',
        note: '必修前置：须先取得《东海桃花岛奇门海道舆图》方可渡海',
      }
    }
    if (q.factionId === 'SECT-22') {
      spearLineageProducerIds.push(q.id)
      itemProducerByItemId['ITM-MSC-013'] = {
        questId: q.id,
        mode: 'dashed',
        note: '《常山·定州联合举荐信》保举入职或同源转投',
      }
    }
    if (q.id === 'QST-CITY-DAMING-BAJI') {
      spearLineageProducerIds.push(q.id)
      itemProducerByItemId['ITM-MSC-007'] = {
        questId: q.id,
        mode: 'dashed',
        note: '《北京留守幕府举荐信》直授开封府 Lv.2 捕头都头',
      }
    }
    if (q.factionId === 'SECT-17' && (blob.includes('禁军') || blob.includes('龙颜'))) {
      imperialGuardGateQuestId = q.id
    }
    if (q.factionId === 'SECT-17' && q.id.endsWith('MURONG-1')) {
      kaifengRank3GateQuestId = q.id
    }
  }

  // Pass 1: Extract explicit questStatus / questCompletedDaysAgoAtLeast solid edges from startCondition
  const directSolidParentsByQuest = new Map<string, Set<string>>()
  for (const q of quests) {
    const solidParents = new Set<string>()
    collectConditionAtoms(q.startCondition, (atom) => {
      if (atom.type === 'questStatus' && atom.status === 'completed' && questMap[atom.questId]) {
        solidParents.add(atom.questId)
        addEdge(
          atom.questId,
          q.id,
          'solid',
          `必修前置：须先完结《${questMap[atom.questId]!.title}》`,
        )
      } else if (atom.type === 'questCompletedDaysAgoAtLeast' && questMap[atom.questId]) {
        solidParents.add(atom.questId)
        addEdge(
          atom.questId,
          q.id,
          'solid',
          `必修前置：《${questMap[atom.questId]!.title}》结案满 ${atom.minDays} 日`,
        )
      }
    })
    directSolidParentsByQuest.set(q.id, solidParents)
  }

  // Pass 2: Extract item-gated, sect-gated, and martial-art / referral lineage edges from conditions & triggers
  for (const q of quests) {
    const existingSolid = directSolidParentsByQuest.get(q.id) ?? new Set<string>()
    const requiredItems = new Set<string>()
    const requiredArts = new Map<string, number>()
    let requiresSectId: string | null = null
    let requiresSectMinRank = 0
    let allowTransferFrom: string | undefined

    const inspectCond = (c: QuestCondition | undefined) => {
      collectConditionAtoms(c, (atom) => {
        if (atom.type === 'hasItem') requiredItems.add(atom.itemId)
        if (atom.type === 'learnedArtAtLeast') {
          requiredArts.set(atom.artId, Math.max(requiredArts.get(atom.artId) ?? 0, atom.minLevel))
        }
        if (atom.type === 'inSect' && atom.sectId) {
          requiresSectId = atom.sectId
          if (atom.minRank && atom.minRank > requiresSectMinRank) {
            requiresSectMinRank = atom.minRank
          }
        }
        if (atom.type === 'notInAnySect' && atom.allowTransferFromSectId) {
          allowTransferFrom = atom.allowTransferFromSectId
        }
      })
    }

    inspectCond(q.startCondition)
    for (const trig of q.locationTriggers ?? []) inspectCond(trig.condition)
    for (const act of q.npcActions ?? []) inspectCond(act.visibleWhen)

    // Item-gated edges (skip if an existing solid parent already requires the same item)
    for (const itemId of requiredItems) {
      const prod = itemProducerByItemId[itemId]
      if (!prod || prod.questId === q.id) continue
      let alreadyCoveredByParent = false
      for (const pId of existingSolid) {
        const pDef = questMap[pId]
        let parentHasSameItem = false
        collectConditionAtoms(pDef?.startCondition, (a) => {
          if (a.type === 'hasItem' && a.itemId === itemId) parentHasSameItem = true
        })
        if (parentHasSameItem) alreadyCoveredByParent = true
      }
      if (!alreadyCoveredByParent) {
        addEdge(prod.questId, q.id, prod.mode, prod.note)
      }
    }

    // Imperial Guard (SECT-33) root gate edge
    if (
      requiresSectId === 'SECT-33' &&
      imperialGuardGateQuestId &&
      existingSolid.size === 0
    ) {
      addEdge(
        imperialGuardGateQuestId,
        q.id,
        'solid',
        `必修前置：经《${questMap[imperialGuardGateQuestId]!.title}》奉敕改授大宋禁军`,
      )
    }

    // Kaifeng Rank 2 -> Rank 3 referral & progression edges
    if (q.id === kaifengRank3GateQuestId) {
      for (const itemId of ['ITM-MSC-013', 'ITM-MSC-007']) {
        const prod = itemProducerByItemId[itemId]
        if (prod) addEdge(prod.questId, q.id, 'dashed', prod.note)
      }
    } else if (
      requiresSectId === 'SECT-17' &&
      requiresSectMinRank >= 3 &&
      kaifengRank3GateQuestId &&
      existingSolid.size === 0
    ) {
      addEdge(
        kaifengRank3GateQuestId,
        q.id,
        'dashed',
        `完成《${questMap[kaifengRank3GateQuestId]!.title}》晋升开封府 Lv.3 金牌总捕后开启`,
      )
    }

    // Spear lineage (梨花枪 / 六合大枪 >= 6) -> Tianbo Bawang Spear
    const needsSpearMastery = [...requiredArts.entries()].some(([artId, minLv]) => {
      if (minLv < 6) return false
      const artName = MARTIAL_ART_DB_MAP[artId]?.name ?? ''
      return artName.includes('梨花枪') || artName.includes('六合')
    })
    if (needsSpearMastery) {
      for (const spId of spearLineageProducerIds) {
        addEdge(spId, q.id, 'dashed', '枪脉同源：《杨氏梨花枪》或《六合大枪》修至 6 重承接霸王枪试炼')
      }
    }

    // Second-tier referral quests -> first-tier regional sister sects
    if (q.factionId === 'SECT-03' && itemProducerByItemId['ITM-MSC-013']) {
      addEdge(
        itemProducerByItemId['ITM-MSC-013'].questId,
        q.id,
        'dashed',
        '持《常山·定州联合举荐信》可免责带功剃度入五台山',
      )
    }
    if (q.factionId === 'SECT-06' || allowTransferFrom === 'SECT-25') {
      if (questMap['QST-SECT-23-REFERRAL']) {
        addEdge(
          'QST-SECT-23-REFERRAL',
          q.id,
          'dashed',
          '齐鲁查拳馆弟子/持举荐帖入泰山派享齐鲁同源结缘',
        )
      }
    }
    if (q.factionId === 'SECT-15' && questMap['QST-SECT-16-REFERRAL']) {
      addEdge(
        'QST-SECT-16-REFERRAL',
        q.id,
        'dashed',
        '持《钱塘怒潮帮举荐帖》入江淮漕帮后转投铁掌帮触发水陆同脉机缘',
      )
    }
    if (q.factionId === 'SECT-04' && questMap['QST-SECT-24-REFERRAL']) {
      addEdge(
        'QST-SECT-24-REFERRAL',
        q.id,
        'dashed',
        '持《岭南洪门举荐帖》入闽海镇远镖局后赴莆田南少林触发同脉接引',
      )
    }
  }

  // Shared Taihang nemesis culmination link if both quests exist
  if (questMap['QST-SECT-17-TAIHANG-BANDIT'] && questMap['QST-SECT-33-TAIHANG-CAMPAIGN-3']) {
    addEdge(
      'QST-SECT-17-TAIHANG-BANDIT',
      'QST-SECT-33-TAIHANG-CAMPAIGN-3',
      'dashed',
      '宿怨收束：清算当年华北官道围杀少侠之太行双雄王重岳、史万山',
    )
  }

  // Partition into standalone quests (degree 0) vs connected DAG quests (degree >= 1)
  const degreeById = new Map<string, number>()
  for (const q of quests) degreeById.set(q.id, 0)
  for (const e of rawEdges) {
    degreeById.set(e.from, (degreeById.get(e.from) ?? 0) + 1)
    degreeById.set(e.to, (degreeById.get(e.to) ?? 0) + 1)
  }

  const standaloneQuests = quests.filter((q) => (degreeById.get(q.id) ?? 0) === 0)
  const connectedQuests = quests.filter((q) => (degreeById.get(q.id) ?? 0) > 0)

  // Zone 1 layout: standalone quests in rows of up to 7 columns, centered on the final row
  const COLS = 7
  const standaloneCoords = new Map<string, { row: number; col: number }>()
  const standaloneRowCount = Math.ceil(standaloneQuests.length / COLS)
  for (let r = 0; r < standaloneRowCount; r++) {
    const slice = standaloneQuests.slice(r * COLS, (r + 1) * COLS)
    const startCol = Math.floor((COLS - slice.length) / 2)
    slice.forEach((q, idx) => {
      standaloneCoords.set(q.id, { row: r, col: startCol + idx })
    })
  }

  // Zone 2 layout: longest-path topological rank + barycenter column placement across 0..6
  const parentsOf = new Map<string, string[]>()
  const childrenOf = new Map<string, string[]>()
  for (const q of connectedQuests) {
    parentsOf.set(q.id, [])
    childrenOf.set(q.id, [])
  }
  for (const e of rawEdges) {
    parentsOf.get(e.to)?.push(e.from)
    childrenOf.get(e.from)?.push(e.to)
  }

  const memoDepth = new Map<string, number>()
  const visiting = new Set<string>()
  const getDepth = (qid: string): number => {
    if (memoDepth.has(qid)) return memoDepth.get(qid)!
    if (visiting.has(qid)) return 0
    visiting.add(qid)
    let d = 0
    for (const p of parentsOf.get(qid) ?? []) {
      d = Math.max(d, getDepth(p) + 1)
    }
    visiting.delete(qid)
    memoDepth.set(qid, d)
    return d
  }

  const byDepth = new Map<number, QuestDefinition[]>()
  let maxDepth = 0
  for (const q of connectedQuests) {
    const d = getDepth(q.id)
    if (d > maxDepth) maxDepth = d
    const bucket = byDepth.get(d) ?? []
    bucket.push(q)
    byDepth.set(d, bucket)
  }

  const connectedCoords = new Map<string, { row: number; col: number }>()
  let currentRow = standaloneRowCount
  for (let d = 0; d <= maxDepth; d++) {
    const layer = byDepth.get(d) ?? []
    if (layer.length === 0) continue

    // Compute desired column from parent barycenter (or evenly spaced across 0..6 for roots)
    const desired = layer.map((q, idx) => {
      const ps = (parentsOf.get(q.id) ?? [])
        .map((pid) => connectedCoords.get(pid)?.col)
        .filter((c): c is number => c !== undefined)
      const target =
        ps.length > 0
          ? ps.reduce((a, b) => a + b, 0) / ps.length
          : layer.length === 1
            ? 3
            : (idx * (COLS - 1)) / Math.max(1, layer.length - 1)
      return { q, target, origIdx: idx }
    })

    desired.sort((a, b) => a.target - b.target || a.origIdx - b.origIdx)

    const usedCols = new Set<number>()
    for (const item of desired) {
      if (usedCols.size >= COLS) {
        currentRow += 1
        usedCols.clear()
      }
      let bestCol = Math.round(Math.max(0, Math.min(COLS - 1, item.target)))
      if (usedCols.has(bestCol)) {
        // Find nearest free column in 0..6
        for (let delta = 1; delta < COLS; delta++) {
          if (bestCol + delta < COLS && !usedCols.has(bestCol + delta)) {
            bestCol = bestCol + delta
            break
          }
          if (bestCol - delta >= 0 && !usedCols.has(bestCol - delta)) {
            bestCol = bestCol - delta
            break
          }
        }
      }
      usedCols.add(bestCol)
      connectedCoords.set(item.q.id, { row: currentRow, col: bestCol })
    }
    currentRow += 1
  }

  // Assign fan-in dstOffsetX & trackOffset when multiple incoming edges target the same node
  const incomingByTarget = new Map<string, QuestEdgeDef[]>()
  for (const e of rawEdges) {
    const arr = incomingByTarget.get(e.to) ?? []
    arr.push(e)
    incomingByTarget.set(e.to, arr)
  }
  for (const [, inc] of incomingByTarget.entries()) {
    if (inc.length <= 1) continue
    inc.sort(
      (a, b) =>
        (connectedCoords.get(a.from)?.col ?? 0) - (connectedCoords.get(b.from)?.col ?? 0),
    )
    inc.forEach((edge, i) => {
      const centered = i - (inc.length - 1) / 2
      edge.dstOffsetX = Math.round(centered * 16)
      edge.trackOffset = Math.round(centered * 8)
    })
  }

  const nodes: ResolvedQuestNode[] = quests.map((q) => {
    const coord = standaloneCoords.get(q.id) ?? connectedCoords.get(q.id) ?? { row: 0, col: 0 }
    const prereqs = summarizeConditionClauses(q.startCondition, questMap)
    if (q.startHint && !prereqs.includes(q.startHint)) {
      prereqs.push(q.startHint)
    }
    if (prereqs.length === 0) {
      prereqs.push('游历对应州府或门派触发')
    }
    const rewards = [q.summary]
    return {
      questId: q.id,
      qDef: q,
      col: coord.col,
      row: coord.row,
      seal: deriveSealChar(q),
      shortTag: deriveShortTag(q),
      prereqs,
      rewards,
      branchNote: q.recommendedNote,
    }
  })

  const maxRow = nodes.reduce((m, n) => Math.max(m, n.row), Math.max(0, standaloneRowCount - 1))

  return {
    nodes,
    edges: rawEdges,
    standaloneRowCount,
    maxRow,
  }
}
