import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tailwindcss()],
    // ✅ Local dev me base="/" hoga, production (build) me "/Comment-Analysis/"
    base: command === "build" ? "/Comment-Analysis/" : "/",
  };
});
