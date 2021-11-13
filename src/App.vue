<script setup lang="ts">
import { Elm } from "./Main.elm";
import elmBridge from "./lib";

const Counter = elmBridge(Elm);
</script>

<template>
  <Counter />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
