<template>
  <div>
    <div ref="mountable"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const mountable = ref(null);

const props = defineProps({
  ports: {
    type: Function,
    required: false,
  },
  flags: {
    type: [String, Number, Object, Array, Boolean],
    required: false,
  },
  elm: {
    type: Object,
    required: true,
  },
});

function findInit(elm: any): any {
  if (Object.keys(elm).includes("init")) {
    return elm.init;
  }

  for (const key of Object.keys(elm)) {
    const init = findInit(elm[key]);
    if (init) {
      return init;
    }
  }

  return false;
}

onMounted(() => {
  const app = findInit(props.elm)({
    node: mountable.value,
    flags: props?.flags,
  });

  if (props.ports) {
    props.ports(app.ports);
  }
});
</script>
