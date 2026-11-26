import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// The Django backend (irtk-backend) runs on port 8000. The dev server
// forwards /polls/ to it, so the session cookie that remembers the selected
// corpus stays on one origin.
const backend = process.env.IRTK_BACKEND || 'http://127.0.0.1:8000'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    extensions: ['.mjs', '.js', '.json', '.vue']
  },
  server: {
    port: 5173,
    proxy: { '/polls': backend }
  },
  preview: {
    port: 5173,
    proxy: { '/polls': backend }
  },
  // Vuetify and Element UI are bundled whole, as in the 2018 build
  build: { chunkSizeWarningLimit: 2000 },
  test: {
    environment: 'jsdom'
  }
})
