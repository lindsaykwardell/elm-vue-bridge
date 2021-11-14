import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import elmPlugin from "vite-plugin-elm";
const path = require("path");

export default defineUserConfig<DefaultThemeOptions>({
  lang: "en-US",
  title: "elm-vue-bridge",
  description: "Render Elm modules in a Vue app",

  themeConfig: {
    logo: "/images/elm.png",
    sidebar: [
      "/introduction.md",
      "/getting-started.md",
      "/component.md",
      "/flags.md",
      "/ports.md",
    ],
    navbar: [
      {
        text: "Getting Started",
        link: "/getting-started",
      },
      {
        text: "Elm Guide",
        link: "https://guide.elm-lang.org/",
      },
      {
        text: "Github Repo",
        link: "https://github.com/lindsaykwardell/elm-vue-bridge",
      },
    ],
  },

  bundler: "@vuepress/bundler-vite",
  bundlerConfig: {
    viteOptions: {
      plugins: [elmPlugin()],
    },
  },

  plugins: [["@vuepress/plugin-search"]],
});
