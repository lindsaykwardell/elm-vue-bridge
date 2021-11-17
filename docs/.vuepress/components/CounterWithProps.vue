<script setup lang="ts">
import CounterWithProps from "../../../src/Components/CounterWithProps/CounterWithProps";
import { ref } from "vue";

const value = ref(3);

function sendCount(val: number) {
  value.value = val;
  console.log(val);
}
</script>

<template>
  <CounterWithProps :initialValue="value" @sendCount="sendCount" />

  Buttons in Vue (current value: {{value}}):

  <p>
    <button @click="value++">+</button>
    <button @click="value--">-</button>
  </p>
</template>
