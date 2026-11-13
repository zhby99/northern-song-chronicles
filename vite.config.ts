import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
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
