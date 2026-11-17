import rawScrolls from './scrolls.json'
import type { GameItemDef } from '../types/game'

/**
 * 《北宋立志传》典籍书画四库专卷（共 101 卷 · 由 docs/EQUIPMENT_COMPENDIUM.md 第十一卷自动编译）
 */
export const SCROLLS_ITEMS_DB: GameItemDef[] = rawScrolls as unknown as GameItemDef[]
