// ../client/vite.config.ts
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import stylelint from "vite-plugin-stylelint";
import dotenv from "dotenv";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
var __vite_injected_original_import_meta_url = "file:///Users/tommydate/Desktop/GameDevPractikum/packages/client/vite.config.ts";
dotenv.config();
var vite_config_default = defineConfig(() => ({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "@app": fileURLToPath(new URL("./src/app", __vite_injected_original_import_meta_url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", __vite_injected_original_import_meta_url)),
      "@assets": fileURLToPath(new URL("./src/assets", __vite_injected_original_import_meta_url)),
      "@components": fileURLToPath(
        new URL("./src/components", __vite_injected_original_import_meta_url)
      ),
      "@features": fileURLToPath(new URL("./src/features", __vite_injected_original_import_meta_url)),
      "@infrastructure": fileURLToPath(
        new URL("./src/infrastructure", __vite_injected_original_import_meta_url)
      )
    }
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT
  },
  build: {
    rollupOptions: {
      input: {
        app: "./index.html",
        networkCacheServiceWorker: "./src/infrastructure/networkCacheServiceWorker.ts"
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    chunkSizeWarningLimit: 1e3
  },
  plugins: [
    svgr(),
    checker({ typescript: true }),
    react(),
    eslint({ lintOnStart: true, overrideConfigFile: "../../.eslintrc.js" }),
    stylelint({ fix: true })
  ]
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3RvbW15ZGF0ZS9EZXNrdG9wL0dhbWVEZXZQcmFjdGlrdW0vcGFja2FnZXMvY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdG9tbXlkYXRlL0Rlc2t0b3AvR2FtZURldlByYWN0aWt1bS9wYWNrYWdlcy9jbGllbnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3RvbW15ZGF0ZS9EZXNrdG9wL0dhbWVEZXZQcmFjdGlrdW0vcGFja2FnZXMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICd1cmwnO1xuXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGVzbGludCBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnO1xuaW1wb3J0IHN0eWxlbGludCBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZWxpbnQnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcic7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmRvdGVudi5jb25maWcoKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuQ0xJRU5UX1BPUlQpIHx8IDMwMDAsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAnQGFwcCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXBwJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAnQGhvb2tzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9ob29rcycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0Bhc3NldHMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0Bjb21wb25lbnRzJzogZmlsZVVSTFRvUGF0aChcbiAgICAgICAgbmV3IFVSTCgnLi9zcmMvY29tcG9uZW50cycsIGltcG9ydC5tZXRhLnVybClcbiAgICAgICksXG4gICAgICAnQGZlYXR1cmVzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9mZWF0dXJlcycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0BpbmZyYXN0cnVjdHVyZSc6IGZpbGVVUkxUb1BhdGgoXG4gICAgICAgIG5ldyBVUkwoJy4vc3JjL2luZnJhc3RydWN0dXJlJywgaW1wb3J0Lm1ldGEudXJsKVxuICAgICAgKSxcbiAgICB9LFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBfX1NFUlZFUl9QT1JUX186IHByb2Nlc3MuZW52LlNFUlZFUl9QT1JULFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGFwcDogJy4vaW5kZXguaHRtbCcsXG4gICAgICAgIG5ldHdvcmtDYWNoZVNlcnZpY2VXb3JrZXI6XG4gICAgICAgICAgJy4vc3JjL2luZnJhc3RydWN0dXJlL25ldHdvcmtDYWNoZVNlcnZpY2VXb3JrZXIudHMnLFxuICAgICAgfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0uanMnLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uanNgLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uW2V4dF1gLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHN2Z3IoKSxcbiAgICBjaGVja2VyKHsgdHlwZXNjcmlwdDogdHJ1ZSB9KSxcbiAgICByZWFjdCgpLFxuICAgIGVzbGludCh7IGxpbnRPblN0YXJ0OiB0cnVlLCBvdmVycmlkZUNvbmZpZ0ZpbGU6ICcuLi8uLi8uZXNsaW50cmMuanMnIH0pLFxuICAgIHN0eWxlbGludCh7IGZpeDogdHJ1ZSB9KSxcbiAgXSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlYsU0FBUyxvQkFBb0I7QUFDMVgsU0FBUyxlQUFlLFdBQVc7QUFFbkMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGVBQWU7QUFDdEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sYUFBYTtBQUNwQixPQUFPLFVBQVU7QUFSeU0sSUFBTSwyQ0FBMkM7QUFTM1EsT0FBTyxPQUFPO0FBR2QsSUFBTyxzQkFBUSxhQUFhLE9BQU87QUFBQSxFQUNqQyxRQUFRO0FBQUEsSUFDTixNQUFNLE9BQU8sUUFBUSxJQUFJLFdBQVcsS0FBSztBQUFBLEVBQzNDO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3BELFFBQVEsY0FBYyxJQUFJLElBQUksYUFBYSx3Q0FBZSxDQUFDO0FBQUEsTUFDM0QsVUFBVSxjQUFjLElBQUksSUFBSSxlQUFlLHdDQUFlLENBQUM7QUFBQSxNQUMvRCxXQUFXLGNBQWMsSUFBSSxJQUFJLGdCQUFnQix3Q0FBZSxDQUFDO0FBQUEsTUFDakUsZUFBZTtBQUFBLFFBQ2IsSUFBSSxJQUFJLG9CQUFvQix3Q0FBZTtBQUFBLE1BQzdDO0FBQUEsTUFDQSxhQUFhLGNBQWMsSUFBSSxJQUFJLGtCQUFrQix3Q0FBZSxDQUFDO0FBQUEsTUFDckUsbUJBQW1CO0FBQUEsUUFDakIsSUFBSSxJQUFJLHdCQUF3Qix3Q0FBZTtBQUFBLE1BQ2pEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGlCQUFpQixRQUFRLElBQUk7QUFBQSxFQUMvQjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsS0FBSztBQUFBLFFBQ0wsMkJBQ0U7QUFBQSxNQUNKO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxLQUFLO0FBQUEsSUFDTCxRQUFRLEVBQUUsWUFBWSxLQUFLLENBQUM7QUFBQSxJQUM1QixNQUFNO0FBQUEsSUFDTixPQUFPLEVBQUUsYUFBYSxNQUFNLG9CQUFvQixxQkFBcUIsQ0FBQztBQUFBLElBQ3RFLFVBQVUsRUFBRSxLQUFLLEtBQUssQ0FBQztBQUFBLEVBQ3pCO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
