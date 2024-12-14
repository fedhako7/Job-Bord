import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs',
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://fedho.gezueshetu.com',
        changeOrigin: true,
        secure: false, // Set to true if you're using HTTPS in the backend
        rewrite: (path) => path.replace(/^\/api/, '') // Remove /api prefix when proxying
      }
    }
  }
})
