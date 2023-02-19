import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      watch: {
        usePolling: env.VITE_USE_POLLING === 'TRUE',
      },
    },
    plugins: [react()],
  };
});
