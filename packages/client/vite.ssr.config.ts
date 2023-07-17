import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    envDir: '../../',
    plugins: [
      svgr(),
      checker({ typescript: true }),
      react(),
      eslint({ lintOnStart: true, overrideConfigFile: '../../.eslintrc.js' }),
      stylelint({ fix: true }),
    ],
    build: {
      sourcemap: true,
      emptyOutDir: true,
      ssr: true,
      lib: {
        entry: path.resolve('./src/entry-server.tsx'),
        name: 'client',
        fileName: 'client',
        formats: ['cjs'],
      },
      rollupOptions: {
        output: {
          dir: 'dist-ssr',
        },
      },
    },
    ssr: {
      format: 'cjs',
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
  };
});
