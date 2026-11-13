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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('/src/data/portraitCatalog.json')) {
            return 'data-portraits'
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
