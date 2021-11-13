import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import elmPlugin from "vite-plugin-elm";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), elmPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "elm-vue-bridge",
      fileName: (format) => `elm-vue-bridge.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
