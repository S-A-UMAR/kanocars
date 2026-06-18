import { resolve } from 'path'
import { defineConfig } from 'vite'

/**
 * AUNA Automotive — Vite Multi-Page App Configuration
 * All 5 HTML pages declared as separate rollup entry points.
 * Static assets (data/, assets/) are served via Vite's dev server
 * and copied to dist via the build script in package.json.
 */
export default defineConfig({
  root: '.',
  publicDir: false, // Managed manually via build script

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        inventory: resolve(__dirname, 'inventory.html'),
        about:     resolve(__dirname, 'about.html'),
        contact:   resolve(__dirname, 'contact.html'),
        carDetail: resolve(__dirname, 'car-detail.html'),
      }
    }
  },

  server: {
    port: 3000,
    open: true
  }
})
