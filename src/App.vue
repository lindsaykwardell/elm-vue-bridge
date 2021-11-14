<script setup lang="ts">
import { Elm } from "./Main.elm";
import { Elm as ElmWithFlags } from "./WithFlags.elm";
import { Elm as ElmWithPorts } from "./WithPorts.elm";
import elmBridge from "./lib";
import { ref } from 'vue'

const Counter = elmBridge(Elm);
const WithFlags = elmBridge(ElmWithFlags);
const WithPorts = elmBridge(ElmWithPorts);

const counter = ref(0);

function ports(ports: any) {
  ports.receiveCount.send(2);

  ports.sendCount.subscribe((count: number) => {
    counter.value = count;
  });
}
</script>

<template>
  <!-- <Counter />
  <WithFlags :flags="2" /> -->
  <WithPorts :flags="0" :ports="ports" />
  In Vue: {{ counter }}
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
