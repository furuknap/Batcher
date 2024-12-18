// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Batcher',
        short_name: 'Batcher',
        description: 'App to manage batches of candied almonds and cookies.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Workbox options if needed
      }
    })
  ]
})
