# elm-vue-bridge

![](/docs/.vuepress/public/images/elm-vue-bridge.webp)

### **Bridge to render Elm modules in a Vue application**

Renders Elm modules within Vue 3. If you need to support Vue 2, please continue to use the previous major version.

![npm](https://img.shields.io/npm/v/elm-vue-bridge)
![npm](https://img.shields.io/npm/dw/elm-vue-bridge)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/lindsaykwardell/elm-vue-bridge/ci/main)
![NPM](https://img.shields.io/npm/l/elm-vue-bridge)

<a id="/usage"></a>&nbsp;

## Usage

[Check out the docs](https://elm-vue-bridge.lindsaykwardell.com/) for full explanation of how to use this package. For quick setup, read on!

### Vite

```bash
# Install dependencies
npm install elm-vue-bridge
npm install --save-dev elm-tooling vite-plugin-elm 

# Initialize elm tooling
npx elm-tooling init
npx elm init

# Install elm and related tools
npx elm-tooling install
```

vite.config.js
```js
import elmPlugin from "vite-plugin-elm";

export default {
  plugins: [elmPlugin()]
}
```

### Vue CLI

Terminal
```bash
# Install dependencies
npm install elm-vue-bridge
npm install --save-dev elm-tooling elm-webpack-loader

# Initialize elm tooling
npx elm-tooling init
npx elm init

# Install elm and related tools
npx elm-tooling install
```

vue.config.js
```javascript
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: { loader: "elm-webpack-loader", options: {} }
        }
      ]
    }
  }
};

```

### Nuxt 3 (Vite enabled)

```bash
# Install dependencies
npm install elm-vue-bridge
npm install --save-dev elm-tooling vite-plugin-elm

# Initialize elm tooling
npx elm-tooling init
npx elm init

# Install elm and related tools
npx elm-tooling install
```

nuxt.config.ts
```js
import { defineNuxtConfig } from "nuxt3";
import elmPlugin from "vite-plugin-elm";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [elmPlugin()],
  },
});

```

### App.vue
```html
<script setup>
import { Elm } from "./Main.elm";
import elmBridge from "./lib";

const Counter = elmBridge(Elm);
</script>

<template>
  <Counter />
</template>

```

You can also pass in flags and ports as props:

```javascript
<template>
  <Counter :flags="flags" :ports="ports" />
</template>
```

## License

This project is MIT Licensed.
