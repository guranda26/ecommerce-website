import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      'process.env': JSON.stringify(env),
      global: 'globalThis',
      process: {
        env: {},
        platform: 'browser',
        version: '0.0.0',
      },
    },
    plugins: [react(), nodePolyfills({ include: ['process'] })],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    base: './',
    resolve: {
      alias: {
        buffer: 'buffer/',
        stream: 'stream-browserify',
        events: 'events/',
        util: 'util/',
        process: 'process/browser',
        http: 'stream-http',
        https: 'https-browserify',
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/__tests__/setup.ts'],
      css: true,
    },
  };
});