import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import elmPlugin from "vite-plugin-elm";
const path = require("path");
import typescript from "@rollup/plugin-typescript";

const resolvePath = (str: string) => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), elmPlugin()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "index",
      fileName: (format) => `index.${format}.js`,
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
      plugins: [
        typescript({
          target: "es2020",
          rootDir: resolvePath("./src/lib"),
          declaration: true,
          declarationDir: resolvePath("./dist"),
          exclude: resolvePath("./node_modules/**"),
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
  },
});
