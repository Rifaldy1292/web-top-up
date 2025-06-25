import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // agar bisa diakses dari jaringan lokal
    port: 5173, // port default, boleh diubah
    proxy: {
      "/api-games": {
        target: "https://api-games.ilhdev.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-games/, ""),
      },
    },
  },
});
