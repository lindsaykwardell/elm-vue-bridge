<script setup lang="ts">
import { ref } from "vue";
import Props from "../Components/Props/Props";

const value = ref(3);

function sendCount(val: number) {
  console.log(val);
}
</script>

<template>
  <Props :initialValue="value" @sendCount="sendCount" />

  <p>
    <button @click="value++">+</button>
    <button @click="value--">-</button>
  </p>
</template>
