import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const isSingleBundle = process.env.ARTIFACT_BUNDLE === '1'
const VIRTUAL_AUDIO_MANIFEST_ID = 'virtual:audio-manifest'
const RESOLVED_VIRTUAL_AUDIO_MANIFEST_ID = '\0virtual:audio-manifest'

const VIRTUAL_NPCS_PART1_ID = 'virtual:npcs-part1'
const RESOLVED_VIRTUAL_NPCS_PART1_ID = '\0virtual:npcs-part1'
const VIRTUAL_NPCS_PART2_ID = 'virtual:npcs-part2'
const RESOLVED_VIRTUAL_NPCS_PART2_ID = '\0virtual:npcs-part2'

export interface ScannedAudioTrack {
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

export interface ScannedAudioManifest {
  world: ScannedAudioTrack[]
  regions: Record<string, ScannedAudioTrack[]>
  characters: Record<string, ScannedAudioTrack[]>
  events: Record<string, ScannedAudioTrack[]>
  uniqueTrackCount: number
}

interface SharedRegionThemeEntry {
  themeId: string
  title: string
  tracks: string[]
  regions: string[]
}

interface SharedRegionThemesFile {
  themes?: SharedRegionThemeEntry[]
}

interface LoudnessProfileEntry {
  integratedLufs: number
  medianLufs?: number
  truePeakDb?: number
  lraLu?: number
  gainDb: number
}

interface LoudnessProfilesFile {
  targetLufs?: number
  tracks?: Record<string, LoudnessProfileEntry>
}

const AUDIO_EXT_RE = /\.(mp3|m4a|ogg|opus|wav|aac|flac|webm)$/i

function encodeUrlFileName(name: string): string {
  return encodeURIComponent(name)
}

function parseNumericOrder(stem: string): number {
  const m = stem.match(/^(\d+)/)
  return m ? Number.parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER
}

function compareTracks(a: ScannedAudioTrack, b: ScannedAudioTrack): number {
  if (a.order !== b.order) return a.order - b.order
  return a.fileName.localeCompare(b.fileName, undefined, { numeric: true, sensitivity: 'base' })
}

function readTrackListInDir(absDir: string, webPrefix: string): ScannedAudioTrack[] {
  if (!fs.existsSync(absDir)) return []
  const tracks: ScannedAudioTrack[] = []
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    if (!entry.isFile() || !AUDIO_EXT_RE.test(entry.name)) continue
    const fullPath = path.join(absDir, entry.name)
    const stat = fs.statSync(fullPath)
    const stem = entry.name.replace(AUDIO_EXT_RE, '')
    tracks.push({
      url: `${webPrefix}/${encodeUrlFileName(entry.name)}`,
      fileName: entry.name,
      stem,
      order: parseNumericOrder(stem),
      bytes: stat.size,
    })
  }
  return tracks.sort(compareTracks)
}

function readRecursiveTrackListInDir(absDir: string, webPrefix: string): ScannedAudioTrack[] {
  if (!fs.existsSync(absDir)) return []
  const tracks: ScannedAudioTrack[] = []
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    const fullPath = path.join(absDir, entry.name)
    const encodedName = encodeUrlFileName(entry.name)
    if (entry.isDirectory()) {
      tracks.push(...readRecursiveTrackListInDir(fullPath, `${webPrefix}/${encodedName}`))
    } else if (entry.isFile() && AUDIO_EXT_RE.test(entry.name)) {
      const stat = fs.statSync(fullPath)
      const stem = entry.name.replace(AUDIO_EXT_RE, '')
      tracks.push({
        url: `${webPrefix}/${encodedName}`,
        fileName: entry.name,
        stem,
        order: parseNumericOrder(stem),
        bytes: stat.size,
      })
    }
  }
  return tracks.sort(compareTracks)
}

function readGroupedAudioCategory(
  categoryAbsDir: string,
  webCategoryPrefix: string,
): Record<string, ScannedAudioTrack[]> {
  const map: Record<string, ScannedAudioTrack[]> = {}
  if (!fs.existsSync(categoryAbsDir)) return map

  for (const entry of fs.readdirSync(categoryAbsDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const subTracks = readTrackListInDir(
        path.join(categoryAbsDir, entry.name),
        `${webCategoryPrefix}/${encodeUrlFileName(entry.name)}`,
      )
      if (subTracks.length > 0) {
        map[entry.name] = subTracks
      }
    } else if (entry.isFile() && AUDIO_EXT_RE.test(entry.name)) {
      // Also support flat files like characters/qiaofeng_1.mp3 or events/battle.mp3
      const fullPath = path.join(categoryAbsDir, entry.name)
      const stat = fs.statSync(fullPath)
      const stem = entry.name.replace(AUDIO_EXT_RE, '')
      const groupMatch = stem.match(/^(.+?)[_-](\d+)$/)
      const key = groupMatch ? groupMatch[1] : stem
      const order = groupMatch ? Number.parseInt(groupMatch[2], 10) : parseNumericOrder(stem)
      if (!map[key]) map[key] = []
      map[key].push({
        url: `${webCategoryPrefix}/${encodeUrlFileName(entry.name)}`,
        fileName: entry.name,
        stem,
        order,
        bytes: stat.size,
      })
    }
  }

  for (const key of Object.keys(map)) {
    map[key].sort(compareTracks)
  }
  return map
}

function applySharedRegionThemes(
  audioRoot: string,
  regions: Record<string, ScannedAudioTrack[]>,
): void {
  const sharedDir = path.join(audioRoot, 'shared')
  const configPath = path.join(sharedDir, 'region_themes.json')
  if (!fs.existsSync(configPath)) return

  try {
    const parsed = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as SharedRegionThemesFile
    for (const theme of parsed.themes ?? []) {
      const sharedTracks: ScannedAudioTrack[] = []
      theme.tracks.forEach((fileName, idx) => {
        const absFile = path.join(sharedDir, fileName)
        if (!fs.existsSync(absFile)) return
        const stat = fs.statSync(absFile)
        const stem = fileName.replace(AUDIO_EXT_RE, '')
        sharedTracks.push({
          url: `/assets/audio/shared/${encodeUrlFileName(fileName)}`,
          fileName,
          stem,
          order: idx + 1,
          bytes: stat.size,
          sharedThemeId: theme.themeId,
          sharedThemeTitle: theme.title,
        })
      })
      if (sharedTracks.length === 0) continue

      for (const regionId of theme.regions) {
        // Custom files inside public/assets/audio/regions/<regionId>/ ALWAYS win automatically
        if (!regions[regionId] || regions[regionId].length === 0) {
          regions[regionId] = sharedTracks.map((t) => ({ ...t }))
        }
      }
    }
  } catch {
    // Ignore malformed shared config so build remains resilient
  }
}

function applyLoudnessProfiles(audioRoot: string, allTracks: ScannedAudioTrack[]): void {
  const profilePath = path.join(audioRoot, 'loudness_profiles.json')
  if (!fs.existsSync(profilePath)) return
  try {
    const parsed = JSON.parse(fs.readFileSync(profilePath, 'utf-8')) as LoudnessProfilesFile
    const table = parsed.tracks ?? {}
    for (const track of allTracks) {
      const prof = table[track.url]
      if (prof && typeof prof.gainDb === 'number') {
        track.gainDb = prof.gainDb
        track.integratedLufs = prof.integratedLufs
      }
    }
  } catch {
    // Ignore malformed loudness profile file
  }
}

function scanAudioManifest(rootDir: string): ScannedAudioManifest {
  const audioRoot = path.join(rootDir, 'public', 'assets', 'audio')
  const world = readTrackListInDir(path.join(audioRoot, 'world'), '/assets/audio/world')
  const regions = readGroupedAudioCategory(
    path.join(audioRoot, 'regions'),
    '/assets/audio/regions',
  )
  applySharedRegionThemes(audioRoot, regions)
  const characters = readGroupedAudioCategory(
    path.join(audioRoot, 'characters'),
    '/assets/audio/characters',
  )
  const events = readGroupedAudioCategory(path.join(audioRoot, 'events'), '/assets/audio/events')

  // Automatically pick up any battle BGM dropped into `public/assets/audio/others/`
  // alongside canonical `public/assets/audio/events/battle/` tracks.
  const othersTracks = readRecursiveTrackListInDir(
    path.join(audioRoot, 'others'),
    '/assets/audio/others',
  )
  if (othersTracks.length > 0) {
    const existingBattle = events.battle ?? []
    const seenBattleUrls = new Set(existingBattle.map((t) => t.url))
    for (const t of othersTracks) {
      if (!seenBattleUrls.has(t.url)) {
        existingBattle.push(t)
        seenBattleUrls.add(t.url)
      }
    }
    events.battle = existingBattle
  }

  const allTrackRefs: ScannedAudioTrack[] = [...world]
  const uniqueUrls = new Set<string>()
  for (const t of world) uniqueUrls.add(t.url)
  for (const list of Object.values(regions)) {
    for (const t of list) {
      uniqueUrls.add(t.url)
      allTrackRefs.push(t)
    }
  }
  for (const list of Object.values(characters)) {
    for (const t of list) {
      uniqueUrls.add(t.url)
      allTrackRefs.push(t)
    }
  }
  for (const list of Object.values(events)) {
    for (const t of list) {
      uniqueUrls.add(t.url)
      allTrackRefs.push(t)
    }
  }

  applyLoudnessProfiles(audioRoot, allTrackRefs)

  return {
    world,
    regions,
    characters,
    events,
    uniqueTrackCount: uniqueUrls.size,
  }
}

function northernSongVirtualDataPlugin(): Plugin {
  let rootDir = process.cwd()
  let cachedNpcsRaw: string | null = null
  let cachedNpcsHalf1Module = 'export default [];'
  let cachedNpcsHalf2Module = 'export default [];'

  const loadNpcHalves = () => {
    const npcsPath = path.join(rootDir, 'src', 'data', 'npcs.json')
    const raw = fs.readFileSync(npcsPath, 'utf-8')
    if (raw !== cachedNpcsRaw) {
      const all = JSON.parse(raw) as unknown[]
      const mid = Math.ceil(all.length / 2)
      cachedNpcsHalf1Module = `export default ${JSON.stringify(all.slice(0, mid))};`
      cachedNpcsHalf2Module = `export default ${JSON.stringify(all.slice(mid))};`
      cachedNpcsRaw = raw
    }
    return { half1Module: cachedNpcsHalf1Module, half2Module: cachedNpcsHalf2Module }
  }

  return {
    name: 'northern-song-virtual-data',
    configResolved(cfg) {
      rootDir = cfg.root
    },
    resolveId(id) {
      if (id === VIRTUAL_AUDIO_MANIFEST_ID) return RESOLVED_VIRTUAL_AUDIO_MANIFEST_ID
      if (id === VIRTUAL_NPCS_PART1_ID) return RESOLVED_VIRTUAL_NPCS_PART1_ID
      if (id === VIRTUAL_NPCS_PART2_ID) return RESOLVED_VIRTUAL_NPCS_PART2_ID
      return null
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_AUDIO_MANIFEST_ID) {
        const manifest = scanAudioManifest(rootDir)
        return `export default ${JSON.stringify(manifest, null, 2)};`
      }
      if (id === RESOLVED_VIRTUAL_NPCS_PART1_ID) {
        return loadNpcHalves().half1Module
      }
      if (id === RESOLVED_VIRTUAL_NPCS_PART2_ID) {
        return loadNpcHalves().half2Module
      }
      return null
    },
    configureServer(server) {
      const audioRoot = path.join(rootDir, 'public', 'assets', 'audio')
      const npcsPath = path.join(rootDir, 'src', 'data', 'npcs.json')
      server.watcher.add([audioRoot, npcsPath])

      const onFsEvent = (changedPath: string) => {
        const normChanged = changedPath.replace(/\\/g, '/')
        if (normChanged.includes('/public/assets/audio/')) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_AUDIO_MANIFEST_ID)
          if (mod) {
            server.moduleGraph.invalidateModule(mod)
            server.ws.send({ type: 'full-reload' })
          }
        } else if (path.resolve(changedPath) === path.resolve(npcsPath)) {
          cachedNpcsRaw = null
          for (const vid of [RESOLVED_VIRTUAL_NPCS_PART1_ID, RESOLVED_VIRTUAL_NPCS_PART2_ID]) {
            const mod = server.moduleGraph.getModuleById(vid)
            if (mod) server.moduleGraph.invalidateModule(mod)
          }
          server.ws.send({ type: 'full-reload' })
        }
      }

      server.watcher.on('add', onFsEvent)
      server.watcher.on('unlink', onFsEvent)
      server.watcher.on('change', onFsEvent)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [northernSongVirtualDataPlugin(), react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: isSingleBundle
    ? {
        outDir: 'dist-artifact',
        chunkSizeWarningLimit: 3000,
        cssCodeSplit: false,
        rollupOptions: {
          output: {
            inlineDynamicImports: true,
            format: 'iife',
            name: 'NorthernSongApp',
          },
        },
      }
    : {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          output: {
            manualChunks(id) {
              const normId = id.replace(/\\/g, '/')
              if (normId.includes('node_modules')) {
                return 'vendor'
              }
              if (normId.includes('virtual:npcs-part1')) {
                return 'data-npcs-1'
              }
              if (normId.includes('virtual:npcs-part2')) {
                return 'data-npcs-2'
              }
              if (
                normId.includes('/src/data/martial_arts.json') ||
                normId.includes('/src/data/idRegistry.json')
              ) {
                return 'data-compendium'
              }
              if (
                normId.includes('/src/data/regions.json') ||
                normId.includes('/src/data/buildings.json')
              ) {
                return 'data-buildings'
              }
              if (
                normId.includes('/src/data/weapons.json') ||
                normId.includes('/src/data/gear.json') ||
                normId.includes('/src/data/mounts.json') ||
                normId.includes('/src/data/uniqueArtifacts.json') ||
                normId.includes('/src/data/scrollsDb.ts')
              ) {
                return 'data-equipment'
              }
              if (
                normId.includes('/src/data/worldGraph.json') ||
                normId.includes('/src/data/regionalConfigs.json') ||
                normId.includes('/src/data/buildingPanoramas.json') ||
                normId.includes('/src/data/portraitCatalog.json')
              ) {
                return 'data-world'
              }
            },
          },
        },
      },
})
