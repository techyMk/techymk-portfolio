import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Hashed bundles go to /build so they can be cached immutably, while
    // /assets stays reserved for hand-managed public files (images, fonts, pdf)
    // that get replaced in place and therefore need a shorter TTL.
    assetsDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-dom/client'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
