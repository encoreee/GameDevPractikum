import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import dotenv from 'dotenv';
import checker from 'vite-plugin-checker';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
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
        sw: './src/sw.ts',
      },
      output: {
        // 2️⃣
        entryFileNames: '[name].js',
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  plugins: [
    checker({ typescript: true }),
    react(),
    eslint({ lintOnStart: true, overrideConfigFile: '../../.eslintrc.js' }),
    stylelint({ fix: true }),
  ],
}));
