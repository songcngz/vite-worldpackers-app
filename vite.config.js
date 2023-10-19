import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    base: "/",
    plugins: [react(), eslint()],
  };
  if (command !== "serve") {
    config.base = "/vite-worldpackers-app/";
  }
  return config;
});
