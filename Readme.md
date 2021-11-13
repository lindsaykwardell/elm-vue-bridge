# elm-vue-bridge

### **Bridge to render Elm modules in a Vue application**

Renders Elm modules within Vue 3. If you need to support Vue 2, please continue to use the previous major version.

<a id="/usage"></a>&nbsp;

## Usage

### Vue CLI

Terminal
```bash
# install dependencies
npm install elm-tooling elm-webpack-loader elm-vue-bridge

# run elm-tooling init
npx elm-tooling init
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

### Vite

```bash
# install dependencies
npm install elm-tooling vite-plugin-elm elm-vue-bridge

# run elm-tooling init
npx elm-tooling init
```

vite.config.js
```js
import elmPlugin from "vite-plugin-elm";

export default {
  plugins: [elmPlugin()]
}
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
