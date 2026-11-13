declare module 'virtual:audio-manifest' {
  export interface VirtualAudioTrackEntry {
    url: string
    fileName: string
    stem: string
    order: number
    bytes: number
    sharedThemeId?: string
    sharedThemeTitle?: string
    gainDb?: number
    integratedLufs?: number
  }

  export interface VirtualAudioManifest {
    world: VirtualAudioTrackEntry[]
    regions: Record<string, VirtualAudioTrackEntry[]>
    characters: Record<string, VirtualAudioTrackEntry[]>
    events: Record<string, VirtualAudioTrackEntry[]>
    uniqueTrackCount: number
  }

  const manifest: VirtualAudioManifest
  export default manifest
}

declare module 'virtual:npcs-part1' {
  import type { CompiledNpcRecord } from './types/game'
  const npcsPart1: CompiledNpcRecord[]
  export default npcsPart1
}

declare module 'virtual:npcs-part2' {
  import type { CompiledNpcRecord } from './types/game'
  const npcsPart2: CompiledNpcRecord[]
  export default npcsPart2
}
