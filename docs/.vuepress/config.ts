import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import elmPlugin from "vite-plugin-elm";
const path = require("path");

export default defineUserConfig<DefaultThemeOptions>({
  lang: "en-US",
  title: "elm-vue-bridge",
  description: "Render Elm modules in a Vue app",

  themeConfig: {
    logo: "https://vuejs.org/images/logo.png",
    sidebar: [
      // "/introduction.md",
      "/getting-started.md",
      "/component.md",
      "/flags.md",
      "/ports.md",
    ],
  },

  bundler: "@vuepress/bundler-vite",
  bundlerConfig: {
    viteOptions: {
      plugins: [elmPlugin()],
    },
  },
});
