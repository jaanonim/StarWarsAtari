// vite.config.js
/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === "build") {
    return {
      base: "/StarWarsAtari/",
    };
  }
  return {};
});
