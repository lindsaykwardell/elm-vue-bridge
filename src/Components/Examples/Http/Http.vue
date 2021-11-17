<script setup lang="ts">
import { ref, computed } from "vue";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

enum Status {
  Idle,
  Running,
  Success,
  Failure,
}

const input = ref("");
const status = ref(Status.Idle);
const response = ref<null | Todo>(null);

const submitButtonText = computed(() => {
  switch (status.value) {
    case Status.Idle:
      return "Add Todo";
    case Status.Running:
      return "Adding...";
    case Status.Success:
      return "Added!";
    case Status.Failure:
      return "Failed!";
  }
});

const encodedTodo = computed(() => JSON.stringify(response.value));

function submitTodo() {
  status.value = Status.Running;
  response.value = null;
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: input.value,
      completed: false,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      status.value = Status.Success;

      if (!validateResponse(res)) {
        throw Error();
      }

      response.value = res;
    })
    .catch(() => {
      status.value = Status.Failure;
    });
}

function validateResponse(res: Todo) {
  return (
    typeof res.title === "string" &&
    typeof res.completed === "boolean" &&
    typeof res.id === "number"
  );
}
</script>

<template>
  <div>
    <input v-model="input" />
    <button :disabled="status === Status.Running" @click="submitTodo">
      {{ submitButtonText }}
    </button>
    <div>
      <template v-if="status === Status.Failure">Error</template>
      <template v-else-if="response === null">No response yet</template>
      <template v-else>{{ encodedTodo }}</template>
    </div>
  </div>
</template>
