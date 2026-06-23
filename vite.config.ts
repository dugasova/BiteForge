import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('swiper') || id.includes('framer-motion')) return 'vendor-ui';
            if (id.includes('react-dom')) return 'react-core';
            if (id.includes('react-router')) return 'router';
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) return 'forms';
            if (id.includes('i18next')) return 'i18n';
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux') || id.includes('immer')) return 'state';
            return 'vendor';
          }
        }
      }
    }
  }
})

