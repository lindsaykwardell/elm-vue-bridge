# elm-vue-bridge

### **Bridge to render Elm modules in a Vue application**

<a id="/usage"></a>&nbsp;

## Usage

Example: rendering Elm modules in a Vue CLI application.

Terminal
```
npm install elm elm-webpack-loader elm-vue-bridge
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


App.vue
```javascript
<template>
  <div id="app">
    <Counter />
  </div>
</template>

<script>
import elmBridge from "elm-vue-bridge"

export default {
  components: {
    'Counter': elmBridge(require('./Counter.elm').Elm.Counter)
  }
}
</script>
```

You can also pass in flags and ports as props:

```javascript
<template>
  <div id="app">
    <Counter :flags="flags" :ports="ports" />
  </div>
</template>
```

## License

This project is MIT Licensed.
