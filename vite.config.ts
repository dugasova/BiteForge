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
            // Group firebase dependencies together
            if (id.includes('firebase')) {
              return 'firebase';
            }
            // Group UI/Animation dependencies together
            if (id.includes('swiper') || id.includes('framer-motion')) {
              return 'vendor-ui';
            }
            // Group other core vendor dependencies (react, react-dom, react-router-dom, redux, etc.)
            return 'vendor';
          }
        }
      }
    }
  }
})

