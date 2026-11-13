import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const isSingleBundle = process.env.ARTIFACT_BUNDLE === '1'
const VIRTUAL_AUDIO_MANIFEST_ID = 'virtual:audio-manifest'
const RESOLVED_VIRTUAL_AUDIO_MANIFEST_ID = '\0virtual:audio-manifest'

export interface ScannedAudioTrack {
  url: string
  fileName: string
  stem: string
  order: number
  bytes: number
}

export interface ScannedAudioManifest {
  world: ScannedAudioTrack[]
  regions: Record<string, ScannedAudioTrack[]>
  characters: Record<string, ScannedAudioTrack[]>
  events: Record<string, ScannedAudioTrack[]>
}

const AUDIO_EXT_RE = /\.(mp3|m4a|ogg|wav|aac|flac)$/i

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
      url: `${webPrefix}/${entry.name}`,
      fileName: entry.name,
      stem,
      order: parseNumericOrder(stem),
      bytes: stat.size,
    })
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
        `${webCategoryPrefix}/${entry.name}`,
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
        url: `${webCategoryPrefix}/${entry.name}`,
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

function scanAudioManifest(rootDir: string): ScannedAudioManifest {
  const audioRoot = path.join(rootDir, 'public', 'assets', 'audio')
  return {
    world: readTrackListInDir(path.join(audioRoot, 'world'), '/assets/audio/world'),
    regions: readGroupedAudioCategory(path.join(audioRoot, 'regions'), '/assets/audio/regions'),
    characters: readGroupedAudioCategory(
      path.join(audioRoot, 'characters'),
      '/assets/audio/characters',
    ),
    events: readGroupedAudioCategory(path.join(audioRoot, 'events'), '/assets/audio/events'),
  }
}

function northernSongAudioManifestPlugin(): Plugin {
  let rootDir = process.cwd()
  return {
    name: 'northern-song-audio-manifest',
    configResolved(cfg) {
      rootDir = cfg.root
    },
    resolveId(id) {
      if (id === VIRTUAL_AUDIO_MANIFEST_ID) {
        return RESOLVED_VIRTUAL_AUDIO_MANIFEST_ID
      }
      return null
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_AUDIO_MANIFEST_ID) {
        const manifest = scanAudioManifest(rootDir)
        return `export default ${JSON.stringify(manifest, null, 2)};`
      }
      return null
    },
    configureServer(server) {
      const audioRoot = path.join(rootDir, 'public', 'assets', 'audio')
      server.watcher.add(audioRoot)
      const invalidateManifest = (changedPath: string) => {
        if (!changedPath.includes(path.join('public', 'assets', 'audio'))) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_AUDIO_MANIFEST_ID)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.on('add', invalidateManifest)
      server.watcher.on('unlink', invalidateManifest)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [northernSongAudioManifestPlugin(), react(), tailwindcss()],
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
              if (id.includes('node_modules')) {
                return 'vendor'
              }
              if (id.includes('/src/data/npcs.json')) {
                return 'data-npcs'
              }
              if (
                id.includes('/src/data/martial_arts.json') ||
                id.includes('/src/data/idRegistry.json')
              ) {
                return 'data-compendium'
              }
              if (
                id.includes('/src/data/regions.json') ||
                id.includes('/src/data/buildings.json')
              ) {
                return 'data-buildings'
              }
              if (
                id.includes('/src/data/worldGraph.json') ||
                id.includes('/src/data/regionalConfigs.json') ||
                id.includes('/src/data/buildingPanoramas.json') ||
                id.includes('/src/data/worldBaseSvg.ts')
              ) {
                return 'data-world'
              }
            },
          },
        },
      },
})
