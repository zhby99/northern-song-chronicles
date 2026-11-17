import {
  BUILDINGS_DB,
  FACTION_DB_MAP,
  NPCS_DB,
  NPC_DB_MAP,
  REGION_DB_MAP,
  SECT_SYSTEMS_DB,
} from '../../data/gameDb'
import type { ActiveSectTask, NodeNpc, SectTaskKind } from '../../types/game'
import { defaultRng, type RngFn } from '../combat/rng'
import { makeQuestNpc } from '../npcFactory'
import { parseRealmTier } from '../stats/realmUtils'
import { WORLD_GRAPH } from '../world/mapMath'
import { getSectRouteDistanceLi } from './kaifengWarrant'
import { getSectRankTitle } from './ranks'

/**
 * 为门派生成随机宗门任务（送信 <=2500里 / 酒馆情报 / 武艺教学切磋）
 */
export function generateMinorSectTask(params: {
  sectId: string
  dayCount: number
  heroRealmRank: number
  leaderNpcId: string
  rng?: RngFn
}): ActiveSectTask | null {
  const { sectId, dayCount, heroRealmRank, leaderNpcId, rng = defaultRng } = params
  const faction = FACTION_DB_MAP[sectId]
  const leader = NPC_DB_MAP[leaderNpcId]
  if (!faction || !leader) return null

  const originRegionId = faction.hqRegionId || leader.regionId
  const cityNodes = WORLD_GRAPH.nodes.filter((n) => n.type === 'city')

  // 预先筛选距离 <= 2500 里的其他城池
  const nearbyCities: Array<{ id: string; name: string; distLi: number }> = []
  for (const city of cityNodes) {
    if (city.id === originRegionId) continue
    const dist = getSectRouteDistanceLi(originRegionId, city.id)
    if (dist !== null && dist > 0 && dist <= 2500) {
      nearbyCities.push({ id: city.id, name: city.name, distLi: dist })
    }
  }

  const candidateKinds: SectTaskKind[] = ['martial_coaching']
  if (nearbyCities.length > 0) {
    candidateKinds.push('deliver_letter', 'gather_intel')
  }
  const kind = candidateKinds[Math.floor(rng() * candidateKinds.length)]!
  const taskId = `SECT_TASK_${sectId}_${dayCount}_${Math.floor(rng() * 10000)}`

  if (kind === 'deliver_letter' && nearbyCities.length > 0) {
    const shuffled = [...nearbyCities].sort(() => rng() - 0.5)
    for (const city of shuffled) {
      const candidates = NPCS_DB.filter(
        (n) => n.regionId === city.id && n.id !== leaderNpcId && n.assignedBuildingId,
      )
      if (candidates.length === 0) continue
      const target = candidates[Math.floor(rng() * candidates.length)]!
      const targetRegionName = REGION_DB_MAP[target.regionId]?.name ?? city.name
      return {
        id: taskId,
        sectId,
        sectName: faction.name,
        leaderNpcId,
        leaderName: leader.name,
        kind: 'deliver_letter',
        title: `代师送信 · 赴${city.name}`,
        summary: `代【${leader.name}】将一封师门密信送往【${city.name} · ${target.assignedBuildingName}${target.assignedSpotName ? ` · ${target.assignedSpotName}` : ''}】，亲手交予【${target.name}】（路程约 ${city.distLi} 里）。`,
        completedStep: false,
        targetNpcId: target.id,
        targetNpcName: target.name,
        regionId: target.regionId,
        regionName: targetRegionName,
        buildingId: target.assignedBuildingId,
        buildingName: target.assignedBuildingName,
        spotId: target.assignedSpotId,
        spotName: target.assignedSpotName,
        distanceLi: city.distLi,
        acceptedDay: dayCount,
      }
    }
  }

  if (kind === 'gather_intel' && nearbyCities.length > 0) {
    const tavernCities = nearbyCities
      .map((city) => {
        const tavern = BUILDINGS_DB.find(
          (b) => b.regionId === city.id && !b.isSpecial && b.id.endsWith('_base_tavern'),
        )
        return tavern ? { city, tavern } : null
      })
      .filter(
        (
          x,
        ): x is {
          city: { id: string; name: string; distLi: number }
          tavern: (typeof BUILDINGS_DB)[number]
        } => x !== null,
      )

    if (tavernCities.length > 0) {
      const picked = tavernCities[Math.floor(rng() * tavernCities.length)]!
      const intelTemplates = SECT_SYSTEMS_DB.minorIntelTemplates
      const tpl = intelTemplates[Math.floor(rng() * intelTemplates.length)]!
      return {
        id: taskId,
        sectId,
        sectName: faction.name,
        leaderNpcId,
        leaderName: leader.name,
        kind: 'gather_intel',
        title: `探听情报 · ${picked.city.name}`,
        summary: `前往【${picked.city.name} · ${picked.tavern.name}】，寻找线人【${tpl.informantName}（${tpl.informantTitle}）】打探「${tpl.title}」（路程约 ${picked.city.distLi} 里）。`,
        completedStep: false,
        intelTitle: tpl.title,
        intelText: tpl.summary,
        tempNpcName: tpl.informantName,
        tempNpcTitle: tpl.informantTitle,
        tempNpcTalk: tpl.informantTalk,
        regionId: picked.city.id,
        regionName: picked.city.name,
        buildingId: picked.tavern.id,
        buildingName: picked.tavern.name,
        spotId: null,
        spotName: null,
        distanceLi: picked.city.distLi,
        acceptedDay: dayCount,
      }
    }
  }

  // 默认 / 武艺教学：筛选境界低于主角的同门弟子
  const weakerMates = NPCS_DB.filter((n) => {
    if (n.factionId !== sectId || n.id === leaderNpcId) return false
    const r = parseRealmTier(n.realm).rank
    return r < heroRealmRank
  })

  if (weakerMates.length > 0) {
    const mate = weakerMates[Math.floor(rng() * weakerMates.length)]!
    const mateRegionName = REGION_DB_MAP[mate.regionId]?.name ?? mate.locationLabel
    return {
      id: taskId,
      sectId,
      sectName: faction.name,
      leaderNpcId,
      leaderName: leader.name,
      kind: 'martial_coaching',
      title: `武艺教学 · 指点${mate.name}`,
      summary: `受【${leader.name}】所托，前往【${mateRegionName} · ${mate.assignedBuildingName}${mate.assignedSpotName ? ` · ${mate.assignedSpotName}` : ''}】与同门弟子【${mate.name}（${mate.realm}）】切磋并获胜，指点其武艺破绽。`,
      completedStep: false,
      traineeNpcId: mate.id,
      traineeNpcName: mate.name,
      traineeRealm: mate.realm,
      traineeIsTemp: false,
      regionId: mate.regionId,
      regionName: mateRegionName,
      buildingId: mate.assignedBuildingId,
      buildingName: mate.assignedBuildingName,
      spotId: mate.assignedSpotId,
      spotName: mate.assignedSpotName,
      acceptedDay: dayCount,
    }
  }

  // 若门派内无更低境界弟子，则在掌门所在驻地刷新一名不入流新晋小弟子用于教学切磋
  const tempTraineeName = `${faction.shortName || '本门'}新进弟子`
  const leaderRegionName = REGION_DB_MAP[leader.regionId]?.name ?? leader.locationLabel
  return {
    id: taskId,
    sectId,
    sectName: faction.name,
    leaderNpcId,
    leaderName: leader.name,
    kind: 'martial_coaching',
    title: `武艺教学 · 指点${tempTraineeName}`,
    summary: `受【${leader.name}】所托，在【${leaderRegionName} · ${leader.assignedBuildingName}${leader.assignedSpotName ? ` · ${leader.assignedSpotName}` : ''}】与新入门的【${tempTraineeName}（不入流）】切磋并获胜，指点其入门拳脚。`,
    completedStep: false,
    traineeNpcId: `SECT_TRAINEE_${taskId}`,
    traineeNpcName: tempTraineeName,
    traineeRealm: '不入流',
    traineeIsTemp: true,
    traineeStats: { hp: 220, mp: 80, agi: 16, res: 8, isBenchmark: false },
    regionId: leader.regionId,
    regionName: leaderRegionName,
    buildingId: leader.assignedBuildingId,
    buildingName: leader.assignedBuildingName,
    spotId: leader.assignedSpotId,
    spotName: leader.assignedSpotName,
    acceptedDay: dayCount,
  }
}

export function buildNodeNpcFromSectTaskIntel(task: ActiveSectTask): NodeNpc {
  const name = task.tempNpcName || '酒肆线人'
  const title = `${task.tempNpcTitle || '江湖百晓生'} · 宗门情报线人`
  return makeQuestNpc({
    id: `SECT_INTEL_${task.id}`,
    name,
    title,
    realm: '不入流',
    factionId: 'ORG-01',
    factionName: '江湖散人',
    stats: { hp: 260, mp: 90, agi: 18, res: 10, isBenchmark: false },
    talents: { bone: 40, comprehension: 55, charm: 45 },
    fullLocationLabel: `${task.regionName} > ${task.buildingName}`,
    questBadgeLabel: '情报线人',
    talk: task.tempNpcTalk || '“这位少侠可是受贵派掌门之托前来打探风声？”',
  })
}

export function buildNodeNpcFromSectTaskTrainee(task: ActiveSectTask): NodeNpc {
  const faction = FACTION_DB_MAP[task.sectId]
  const name = task.traineeNpcName || '新进弟子'
  const title = `${task.sectName} · 初入门徒`
  return makeQuestNpc({
    id: task.traineeNpcId || `SECT_TRAINEE_${task.id}`,
    name,
    title,
    realm: task.traineeRealm || '不入流',
    factionId: task.sectId,
    factionName: faction?.name || task.sectName,
    sectRank: 1,
    sectRankLabel: getSectRankTitle(task.sectId, 1),
    stats: task.traineeStats ?? { hp: 220, mp: 80, agi: 16, res: 8, isBenchmark: false },
    talents: { bone: 35, comprehension: 35, charm: 40 },
    fullLocationLabel: `${task.regionName} > ${task.buildingName}${task.spotName ? ` > ${task.spotName}` : ''}`,
    questBadgeLabel: '教学弟子',
    talk: '“师兄/师姐请手下留情，弟子愿领教几招！”',
  })
}
