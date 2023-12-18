import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    host: '0.0.0.0',
    port: 3000, // Adjust the port as needed
  },
  plugins: [react()],
});
