# Getting Started

In order to write and utilize Elm modules in our application, there is a bit of configuration work that needs to be done. The following steps will install the required dependencies to write Elm code and import it in your development environment.

## Install dependencies

<CodeGroup>
  <CodeGroupItem title="Vite" active>
  
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

  </CodeGroupItem>

  <CodeGroupItem title="Vue CLI">

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

  </CodeGroupItem>

  <CodeGroupItem title="Nuxt 3 (Vite)">
  
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
  
  </CodeGroupItem>

</CodeGroup>

## Configure bundler

<CodeGroup>
  <CodeGroupItem title="Vite" active>

```js
// Configure vite.config.js

import elmPlugin from "vite-plugin-elm";

export default {
  plugins: [elmPlugin()]
}
```

  </CodeGroupItem>

  <CodeGroupItem title="Vue CLI">

```js
// Configure vue.config.js

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

  </CodeGroupItem>

  <CodeGroupItem title="Nuxt 3 (Vite)">

```js
// Configure nuxt.config.ts

import { defineNuxtConfig } from "nuxt3";
import elmPlugin from "vite-plugin-elm";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [elmPlugin()],
  },
});

```
  
  </CodeGroupItem>
  
</CodeGroup>

## Update `.gitignore`

```bash
# Add `elm-stuff` to your .gitignore file:

echo 'elm-stuff' >> .gitignore
```

## Update `package.json`

```json
// Add the following command to automatically install elm and its tools
{
  "scripts": {
    "postinstall": "elm-tooling install"
  }
}
```
