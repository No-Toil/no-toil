import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig(async () => ({
   server: {
      host: "0.0.0.0",
      strictPort: true,
      watch: { usePolling: true },
   },
  
   plugins: [
      VitePWA({
         registerType: "autoUpdate",
         workbox: { globPatterns: ["**/*.{js,css,html,ico,png,svg}"] }
      }),
      react()
   ],
  
   // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
   //
   // 1. prevent vite from obscuring rust errors
   clearScreen: false,
  
   // 3. to make use of `TAURI_DEBUG` and other env variables
   // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
   envPrefix: ["VITE_", "TAURI_"],
   resolve: {
      alias: [
         {
         find: "@contexts",
         replacement: path.resolve(__dirname, "src/contexts")
      },
         {
         find: "@components",
         replacement: path.resolve(__dirname, "src/components")
      },
         {
         find: "@pages",
         replacement: path.resolve(__dirname, "src/pages")
      },
         {
         find: "@utils",
         replacement: path.resolve(__dirname, "src/utils")
      },
         {
         find: "@assets",
         replacement: path.resolve(__dirname, "src/assets")
      },
      ]
   }
}));
