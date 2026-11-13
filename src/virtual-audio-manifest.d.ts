declare module 'virtual:audio-manifest' {
  export interface VirtualAudioTrackEntry {
    url: string
    fileName: string
    stem: string
    order: number
    bytes: number
  }

  export interface VirtualAudioManifest {
    world: VirtualAudioTrackEntry[]
    regions: Record<string, VirtualAudioTrackEntry[]>
    characters: Record<string, VirtualAudioTrackEntry[]>
    events: Record<string, VirtualAudioTrackEntry[]>
  }

  const manifest: VirtualAudioManifest
  export default manifest
}
