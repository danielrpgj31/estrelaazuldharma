import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Service Worker precisa de headers corretos
      'Cache-Control': 'public, max-age=0',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        // Otimizar chunks para PWA
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'dexie-vendor': ['dexie'],
        },
      },
    },
  },
  // Otimizações para PWA
  define: {
    'process.env.PWA_MODE': true,
  },
})

