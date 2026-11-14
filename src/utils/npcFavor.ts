import type { GameItemDef } from '../types/game'

export type GiftPreferenceCategory =
  | '神兵利器'
  | '秘籍典籍'
  | '灵丹妙药'
  | '奇毒暗器'
  | '文房书画'
  | '茶酒珍馐'
  | '珠玉佩饰'
  | '骏马名驹'

export interface NpcFavorProfile {
  likes: GiftPreferenceCategory[]
  dislikes: GiftPreferenceCategory[]
}

export const INITIAL_NPC_FAVOR = 0
export const MIN_NPC_FAVOR = -100
export const MAX_NPC_FAVOR = 100

/**
 * Classify any GameItemDef into one of the 8 social gift preference categories.
 */
export function classifyGiftCategory(item: GameItemDef): GiftPreferenceCategory {
  if (item.equipSlot === 'mount' || item.mountMeta) {
    return '骏马名驹'
  }
  if (item.equipSlot === 'accessory1' || item.equipSlot === 'accessory2') {
    return '珠玉佩饰'
  }
  if (
    item.equipSlot === 'weapon' ||
    item.equipSlot === 'bow' ||
    item.equipSlot === 'armor' ||
    item.equipSlot === 'shoes'
  ) {
    return '神兵利器'
  }
  if (item.poisonEffect || /毒|散魂|断肠|鹤顶|砒|蛊/.test(item.name + item.subType)) {
    return '奇毒暗器'
  }
  if (item.category === 'scrolls') {
    return '秘籍典籍'
  }
  if (/茶|酒|酿|醪|醉|春|烧刀|饼|糕|酥|蜜|果|膳/.test(item.name + item.subType)) {
    return '茶酒珍馐'
  }
  if (item.category === 'medicine') {
    return '灵丹妙药'
  }
  if (/琴|棋|书|画|砚|墨|笔|纸|帖|卷|经|史|诗|词/.test(item.name + item.subType)) {
    return '文房书画'
  }
  if (/玉|佩|珠|钗|环|香|囊|扇|瓷|瓶|鼎/.test(item.name + item.subType)) {
    return '珠玉佩饰'
  }
  return '文房书画'
}

/**
 * Deterministically derive 1-2 liked and 1-2 disliked gift categories for any NPC
 * based on their faction, role, category, and ten-arts profile.
 */
export function getNpcFavorProfile(npc: {
  id?: string
  name: string
  category?: string
  factionName?: string
  role?: string
  bio?: string
}): NpcFavorProfile {
  const text = `${npc.category ?? ''} ${npc.factionName ?? ''} ${npc.role ?? ''} ${npc.bio ?? ''}`

  let likes: GiftPreferenceCategory[] = ['文房书画', '茶酒珍馐']
  let dislikes: GiftPreferenceCategory[] = ['奇毒暗器']

  if (/星宿|毒|一品堂|刺客|杀手|魔|邪|阴/.test(text)) {
    likes = ['奇毒暗器', '秘籍典籍']
    dislikes = ['文房书画', '珠玉佩饰']
  } else if (/少林|天龙|相国|寺|僧|禅|佛|尼|庵/.test(text)) {
    likes = ['灵丹妙药', '秘籍典籍']
    dislikes = ['奇毒暗器', '茶酒珍馐']
  } else if (/道|全真|武当|青城|真人|道长|观/.test(text)) {
    likes = ['灵丹妙药', '文房书画']
    dislikes = ['奇毒暗器', '珠玉佩饰']
  } else if (/将|军|卫|骑|禁军|边防|总兵|元帅|狄青|杨/.test(text)) {
    likes = ['神兵利器', '骏马名驹']
    dislikes = ['奇毒暗器', '珠玉佩饰']
  } else if (/丐帮|绿林|侠|镖|山寨|草莽|五义|白玉堂|展昭/.test(text)) {
    likes = ['茶酒珍馐', '神兵利器']
    dislikes = ['奇毒暗器']
  } else if (/朝廷|学士|知府|侍制|太守|书院|儒|进士|欧阳|包拯|范仲淹|司马|苏/.test(text)) {
    likes = ['文房书画', '秘籍典籍']
    dislikes = ['奇毒暗器', '神兵利器']
  } else if (/女|娘|姑|妃|后|夫人|小姐|峨眉|灵鹫|红颜/.test(text)) {
    likes = ['珠玉佩饰', '茶酒珍馐']
    dislikes = ['奇毒暗器']
  } else if (/商|掌柜|市井|匠|医|药|百工/.test(text)) {
    likes = ['珠玉佩饰', '灵丹妙药']
    dislikes = ['奇毒暗器', '神兵利器']
  }

  // Ensure zero overlap
  const likeSet = new Set(likes)
  dislikes = dislikes.filter((d) => !likeSet.has(d))
  if (dislikes.length === 0) {
    dislikes = ['奇毒暗器']
  }

  return { likes: likes.slice(0, 2), dislikes: dislikes.slice(0, 2) }
}

export interface GiftFavorResult {
  giftCategory: GiftPreferenceCategory
  multiplier: 2 | 0.2 | 1
  favorGain: number
  nextFavor: number
  reaction: 'liked' | 'disliked' | 'neutral'
}

/**
 * Value-to-favor formula:
 *   base = max(1, round(sqrt(max(1, value)) * 0.65))
 *   multiplier = 2.0x (liked), 0.2x (disliked), 1.0x (neutral)
 *   favorGain = round(base * multiplier) (clamped to [0, 100] total)
 */
export function computeGiftFavorGain(
  currentFavor: number,
  item: GameItemDef,
  profile: NpcFavorProfile,
): GiftFavorResult {
  const giftCategory = classifyGiftCategory(item)
  const isLiked = profile.likes.includes(giftCategory)
  const isDisliked = profile.dislikes.includes(giftCategory)

  const multiplier: 2 | 0.2 | 1 = isLiked ? 2 : isDisliked ? 0.2 : 1
  const reaction: 'liked' | 'disliked' | 'neutral' = isLiked
    ? 'liked'
    : isDisliked
      ? 'disliked'
      : 'neutral'

  const base = Math.max(1, Math.round(Math.sqrt(Math.max(1, item.value)) * 0.65))
  const favorGain = Math.max(isDisliked ? 0 : 1, Math.round(base * multiplier))
  const nextFavor = Math.max(MIN_NPC_FAVOR, Math.min(MAX_NPC_FAVOR, currentFavor + favorGain))

  return {
    giftCategory,
    multiplier,
    favorGain,
    nextFavor,
    reaction,
  }
}
