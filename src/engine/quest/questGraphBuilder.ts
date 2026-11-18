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
  if (facName.includes('少林')) return '禅'
  if (facName.includes('丐帮')) return '丐'
  if (facName.includes('五台')) return '台'
  if (facName.includes('华山')) return '华'
  if (facName.includes('泰山')) return '岱'
  if (facName.includes('峨眉')) return '峨'
  if (facName.includes('真武')) return '武'
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
      itemProducerByItemId['ITM-MAP-002'] = {
        questId: q.id,
        mode: 'solid',
        note: '必修前置：须先绘成《太湖燕子坞烟波水路舆图》方可渡湖查案',
      }
    }
    if (blob.includes('桃花岛') && q.category === 'adventure') {
      itemProducerByItemId['ITM-MAP-001'] = {
        questId: q.id,
        mode: 'solid',
        note: '必修前置：须先取得《东海桃花岛奇门海图》方可渡海',
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
  const standaloneRowCount = Math.max(1, Math.ceil(standaloneQuests.length / COLS))
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
  for (let d = 0; d <= maxDepth; d++) {
    const layer = byDepth.get(d) ?? []
    if (layer.length === 0) continue
    const row = standaloneRowCount + d

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
      connectedCoords.set(item.q.id, { row, col: bestCol })
    }
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

  const maxRow = nodes.reduce((m, n) => Math.max(m, n.row), standaloneRowCount)

  return {
    nodes,
    edges: rawEdges,
    standaloneRowCount,
    maxRow,
  }
}
