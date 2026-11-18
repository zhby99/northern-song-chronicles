import { describe, expect, it } from 'vitest'
import { clampMapPan } from '../world/mapMath'
import { useGameStore } from '../../store/useGameStore'

describe('map pan & zoom boundary clamping', () => {
  it('preserves default and preset views while clamping extreme off-screen drags', () => {
    // Default world view
    expect(clampMapPan({ x: 0, y: 0, scale: 1 }, 1600, 1000)).toEqual({
      x: 0,
      y: 0,
      scale: 1,
    })

    // Presets (focusZhongyuan & focusMacroRegimes) stay untouched
    expect(clampMapPan({ x: -340, y: -165, scale: 1.48 }, 1600, 1000)).toEqual({
      x: -340,
      y: -165,
      scale: 1.48,
    })
    expect(clampMapPan({ x: 185, y: 112, scale: 0.74 }, 1600, 1000)).toEqual({
      x: 185,
      y: 112,
      scale: 0.74,
    })

    // Extreme drag into void is clamped cleanly
    const clamped = clampMapPan({ x: 99999, y: -99999, scale: 8.5 }, 1600, 1000, 0.56, 3.4)
    expect(clamped.scale).toBe(3.4)
    expect(clamped.x).toBe(1600 * 0.65)
    expect(clamped.y).toBeCloseTo(1000 * 0.35 - 1000 * 3.4, 5)
  })

  it('store setWorldPan and setRegionPan enforce viewport bounds', () => {
    useGameStore.getState().setWorldPan({ x: -50000, y: 50000, scale: 1 })
    const wp = useGameStore.getState().worldPan
    expect(wp.x).toBeGreaterThanOrEqual(1600 * 0.35 - 1600)
    expect(wp.y).toBeLessThanOrEqual(1000 * 0.65)

    useGameStore.getState().setRegionPan({ x: 50000, y: -50000, scale: 1 })
    const rp = useGameStore.getState().regionPan
    expect(rp.x).toBeLessThanOrEqual(1600 * 0.65)
    expect(rp.y).toBeGreaterThanOrEqual(1000 * 0.35 - 1000)
  })
})
