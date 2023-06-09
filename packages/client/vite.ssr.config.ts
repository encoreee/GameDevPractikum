import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import dotenv from 'dotenv';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    checker({ typescript: true }),
    react(),
    eslint({ lintOnStart: true, overrideConfigFile: '../../.eslintrc.js' }),
    stylelint({ fix: true }),
  ],
  build: {
    lib: {
      entry: path.resolve('./src/entry-server.tsx'),
      name: 'client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'dist-ssr',
      },
    },
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
});
