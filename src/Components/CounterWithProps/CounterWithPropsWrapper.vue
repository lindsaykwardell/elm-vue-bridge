<script setup lang="ts">
import { ref } from "vue";
import CounterWithProps from "./CounterWithProps";

const value = ref(3);

function sendCount(val: number) {
  value.value = val;
  console.log(val);
}
</script>

<template>
  <CounterWithProps :initialValue="value" @sendCount="sendCount" />

  <p>Value in Vue: {{ value }}</p>

  <p>
    <button id="vue-plus" @click="value++">Add 1</button>
    <button id="vue-minus" @click="value--">Subtract 1</button>
  </p>
</template>
