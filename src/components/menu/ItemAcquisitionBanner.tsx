import { Gift, ShoppingBag } from 'lucide-react'
import { BUILDING_DB_MAP, BUILDINGS_DB, FACTION_DB_MAP, REGION_DB_MAP } from '../../data/gameDb'
import { SPOT_SHOPS } from '../../data/spotShops'
import { SECT_ENTRY_GEAR_GIFTS } from '../../utils/sectMechanics'

interface AcquisitionWay {
  kind: 'shop' | 'sect_gift'
  text: string
}

const SPOT_LOCATION_CACHE: Record<string, { buildingName: string; spotName: string }> = {}
for (const b of BUILDINGS_DB) {
  if (!b.interior) continue
  for (const sp of b.interior.spots) {
    SPOT_LOCATION_CACHE[sp.id] = { buildingName: b.name, spotName: sp.name }
  }
}

function getItemAcquisitionWays(itemId: string): AcquisitionWay[] {
  const ways: AcquisitionWay[] = []

  for (const [sectId, giftIds] of Object.entries(SECT_ENTRY_GEAR_GIFTS)) {
    if (giftIds.includes(itemId)) {
      const sectName = FACTION_DB_MAP[sectId]?.name ?? sectId
      ways.push({
        kind: 'sect_gift',
        text: `拜入【${sectName}】入门即可获赐`,
      })
    }
  }

  for (const shop of SPOT_SHOPS) {
    const entry = shop.items.find((x) => x.itemId === itemId)
    if (!entry) continue
    const regionName = REGION_DB_MAP[shop.regionId]?.name ?? shop.regionId
    const loc = SPOT_LOCATION_CACHE[shop.spotId]
    const bldg = BUILDING_DB_MAP[shop.spotId]
    const placeLabel = loc
      ? `${regionName} · ${loc.buildingName} > ${loc.spotName}`
      : bldg
        ? `${regionName} · ${bldg.name}`
        : `${regionName} · ${shop.title}`
    const whoLabel = shop.requiredSectId
      ? `【${FACTION_DB_MAP[shop.requiredSectId]?.name ?? shop.requiredSectId}】成员`
      : '任何人'
    ways.push({
      kind: 'shop',
      text: `${whoLabel}可于【${placeLabel}】花费 ${entry.price} 两银子购置`,
    })
  }

  return ways
}

export function ItemAcquisitionBanner({ itemId }: { itemId: string }) {
  const ways = getItemAcquisitionWays(itemId)
  if (ways.length === 0) return null

  return (
    <div className="p-2.5 rounded-md bg-[#eef6ef] border border-[#72a27d] space-y-1.5">
      <div className="text-xs font-bold song-serif text-[#1b5132] flex items-center gap-1.5">
        <span>获取途径</span>
      </div>
      <div className="space-y-1">
        {ways.map((w, idx) => (
          <div
            key={`${w.kind}:${idx}`}
            className="flex items-start gap-1.5 text-xs text-[#23472d] leading-relaxed"
          >
            {w.kind === 'sect_gift' ? (
              <Gift className="w-3.5 h-3.5 text-[#1b5132] shrink-0 mt-0.5" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5 text-[#781710] shrink-0 mt-0.5" />
            )}
            <span>{w.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
