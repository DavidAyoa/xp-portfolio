import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-i18next', 'i18next'],
          'vendor-webamp': ['webamp'],
          'vendor-utils': ['clsx', 'react-use'],
        },
      },
      onwarn(warning, warn) {
        // Suppress font warnings
        if (warning.message.includes('/fonts/')) return;
        warn(warning);
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
