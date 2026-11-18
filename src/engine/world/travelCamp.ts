import type { TravelState, WildernessCamp } from '../../types/game'

/**
 * 将「官道行军途中」的当前位置换算为旷野营地坐标：原地扎营与行军途中存档共用，
 * 读档后少侠停在路途原处，而不是被送回出发城池。
 */
export function buildCampFromTraveling(tr: TravelState): WildernessCamp | null {
  const curPos = tr.playerPos
  const seg = tr.route.segments[tr.segIdx]
  if (!seg) return null

  const r = Math.min(1, Math.max(0, tr.segProgressDays / seg.days))
  let camp: WildernessCamp
  if (seg.campEdge) {
    const { u, v, distU, distV, terrain } = seg.campEdge
    if (seg.to === v) {
      camp = {
        x: curPos.x,
        y: curPos.y,
        u,
        v,
        distU: distU + distV * r,
        distV: distV * (1 - r),
        terrain,
      }
    } else {
      camp = {
        x: curPos.x,
        y: curPos.y,
        u,
        v,
        distU: distU * (1 - r),
        distV: distV + distU * r,
        terrain,
      }
    }
  } else {
    camp = {
      x: curPos.x,
      y: curPos.y,
      u: seg.from,
      v: seg.to,
      distU: seg.dist * r,
      distV: seg.dist * (1 - r),
      terrain: seg.terrain,
    }
  }
  return camp
}
