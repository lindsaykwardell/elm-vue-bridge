import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import elmPlugin from "vite-plugin-elm";
const { path } = require("@vuepress/utils");

export default defineUserConfig<DefaultThemeOptions>({
  lang: "en-US",
  title: "elm-vue-bridge",
  description: "Render Elm modules in a Vue app",
  head: [
    ["link", { rel: "icon", href: "/images/elm-vue-bridge.webp" }],
    ["meta", { name: "og:type", content: "website" }],
    // ["meta", { name: "og:url", content: "https://elm-vue-bridge.lindsaykwardell.com" }],
    // ["meta", { name: "og:title", content: "elm-vue-bridge" }],
    // ["meta", { name: "og:description", content: "Render Elm modules in a Vue app" }],
    ["meta", { name: "og:image", content: "https://elm-vue-bridge.lindsaykwardell.com/images/elm-vue-bridge.webp" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    // ["meta", { name: "twitter:url", content: "https://elm-vue-bridge.lindsaykwardell.com" }],
    // ["meta", { name: "twitter:title", content: "elm-vue-bridge" }],
    // ["meta", { name: "twitter:description", content: "Render Elm modules in a Vue app" }],
    ["meta", { name: "twitter:image", content: "https://elm-vue-bridge.lindsaykwardell.com/images/elm-vue-bridge.webp" }],
],

  themeConfig: {
    logo: "/images/elm-vue-bridge.webp",
    contributors: false,
    sidebar: {
      "/": [
        {
          text: "Guide",
          children: [
            "/guide/introduction.md",
            "/guide/getting-started.md",
            "/guide/component.md",
            "/guide/flags.md",
            "/guide/ports.md",
            "/guide/props-and-events.md",
          ],
        },
        {
          text: "API",
          children: ["/api.md"],
        },
        {
          text: "Learn Elm",
          children: [
            "/learn/why-elm.md",
            {
              text: "Examples",
              children: [
                "/learn/examples/components.md",
                "/learn/examples/crud.md",
                "/learn/examples/http.md",
              ],
            },
          ],
        },
      ],
    },
    navbar: [
      {
        text: "Getting Started",
        link: "/guide/getting-started",
      },
      {
        text: "API",
        link: "/api",
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
      plugins: [elmPlugin({})],
    },
  },

  plugins: [["@vuepress/plugin-search"]],
});
