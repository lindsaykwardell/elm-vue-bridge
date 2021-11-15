<script setup>
import { ref } from "vue";
import CounterWithPorts from "../../../src/Components/CounterWithPorts/CounterWithPorts";

const counter = ref(2);

function ports(ports) {
  ports.receiveCount.send(counter.value);

  ports.sendCount.subscribe((count) => {
    console.log(count);
    counter.value = count;
  });
}
</script>

<template>
  <CounterWithPorts :flags="0" :ports="ports" />
  The value in Vue is: {{ counter }}
</template>
