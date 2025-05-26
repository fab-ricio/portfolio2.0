import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/portfolio2.0/", // Chemin de base corrigé pour GitHub Pages
  plugins: [react()],
});
