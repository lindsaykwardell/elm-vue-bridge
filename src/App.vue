<script setup lang="ts">
import { Elm } from "./Main.elm";
import ElmModule from "./lib";
</script>

<template>
  <ElmModule :elm="Elm" />
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
