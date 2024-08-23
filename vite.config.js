import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: 'http://34.36.210.129',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});