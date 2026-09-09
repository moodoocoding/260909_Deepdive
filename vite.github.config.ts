import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  base: "/260909_Deepdive/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  build: {
    outDir: "dist-github",
    emptyOutDir: true,
  },
});
