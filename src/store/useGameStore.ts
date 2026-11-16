import { create } from 'zustand'
import { createCombatSocialSlice } from './slices/combatSocialSlice'
import { createCultivationSlice } from './slices/cultivationSlice'
import { createLoadoutInventorySlice } from './slices/loadoutInventorySlice'
import { createNavigationTravelSlice } from './slices/navigationTravelSlice'
import { createQuestSlice } from './slices/questSlice'
import { createSectSlice } from './slices/sectSlice'
import { createUiSaveSlice } from './slices/uiSaveSlice'
import { buildStoreEvalContext, createInitialStoreData } from './storeHelpers'
import type { GameStoreState } from './storeTypes'

export { buildStoreEvalContext }
export type { GameStoreState }

export const useGameStore = create<GameStoreState>((...a) => ({
  ...createInitialStoreData(),
  ...createNavigationTravelSlice(...a),
  ...createLoadoutInventorySlice(...a),
  ...createCultivationSlice(...a),
  ...createCombatSocialSlice(...a),
  ...createSectSlice(...a),
  ...createQuestSlice(...a),
  ...createUiSaveSlice(...a),
}))
