<script setup lang="ts">
import Counter from "../Components/Counter/Counter";
import CounterWithFlags from "../Components/CounterWithFlags/CounterWithFlags";
import CounterWithPorts from "../Components/CounterWithPorts/CounterWithPorts";
</script>

<template>
  <Counter />
  <CounterWithFlags :flags="2" />
  <CounterWithPorts :flags="4" />
</template>
