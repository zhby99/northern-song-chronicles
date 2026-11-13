import {
  BookOpen,
  Compass,
  Flame,
  FlaskConical,
  Footprints,
  Gem,
  Hammer,
  Package,
  Shield,
  Sparkles,
  Sword,
  Target,
  Wind,
} from 'lucide-react'
import type { BagCategoryKey, EquipmentSlotKey, MartialArtSlotKey } from '../../types/game'

export function SlotIcon({
  slot,
  className = 'w-4 h-4',
}: {
  slot: EquipmentSlotKey
  className?: string
}) {
  switch (slot) {
    case 'weapon':
      return <Sword className={className} />
    case 'armor':
      return <Shield className={className} />
    case 'shoes':
      return <Footprints className={className} />
    case 'bow':
      return <Target className={className} />
    case 'accessory1':
      return <Gem className={className} />
    case 'accessory2':
      return <Sparkles className={className} />
    case 'mount':
      return <Compass className={className} />
  }
}

export function ArtSlotIcon({
  slot,
  className = 'w-4 h-4',
}: {
  slot: MartialArtSlotKey
  className?: string
}) {
  if (slot === 'neigong') return <Flame className={className} />
  if (slot === 'qinggong') return <Wind className={className} />
  return <Sword className={className} />
}

export function BagCatIcon({
  category,
  className = 'w-4 h-4',
}: {
  category: BagCategoryKey
  className?: string
}) {
  switch (category) {
    case 'scrolls':
      return <BookOpen className={className} />
    case 'medicine':
      return <FlaskConical className={className} />
    case 'tools':
      return <Hammer className={className} />
    case 'misc':
      return <Package className={className} />
  }
}
