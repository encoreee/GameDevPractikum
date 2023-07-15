import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import dotenv from 'dotenv';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  return {
    server: {
      port: Number(process.env.CLIENT_PORT) || 3001,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@components': fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
        '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
        '@infrastructure': fileURLToPath(
          new URL('./src/infrastructure', import.meta.url)
        ),
      },
    },
    define: {
      __SERVER_PORT__: process.env.SERVER_PORT,
    },
    build: {
      rollupOptions: {
        input: {
          app: './index.html',
          networkCacheServiceWorker:
            './src/infrastructure/networkCacheServiceWorker.ts',
        },
        output: {
          entryFileNames: `assets/[name]${!isDev ? '.[hash]' : ''}.js`,
          chunkFileNames: `assets/[name]${!isDev ? '.[hash]' : ''}.js`,
          assetFileNames: `assets/[name]${!isDev ? '.[hash]' : ''}.[ext]`,
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    plugins: [
      svgr(),
      checker({ typescript: true }),
      react(),
      eslint({ lintOnStart: true, overrideConfigFile: '../../.eslintrc.js' }),
      stylelint({ fix: true }),
    ],
  };
});
