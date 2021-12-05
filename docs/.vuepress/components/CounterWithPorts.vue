<script setup>
import { ref } from "vue";
import CounterWithPorts from "../../../src/Components/CounterWithPorts/CounterWithPorts";

const counter = ref(2);
let ports;

function registerPorts(p) {
  ports = p;

  ports.sendCount.subscribe((count) => {
    console.log(count);
    counter.value = count;
  });
}

function setCount() {
  ports.receiveCount.send(5);
}
</script>

<template>
  <CounterWithPorts :flags="0" :ports="registerPorts" />
  <p>The value in Vue is: {{ counter }}</p>
  <button @click="setCount">Set to 5</button>
</template>
