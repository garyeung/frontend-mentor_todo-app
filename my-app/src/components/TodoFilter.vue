<script setup lang="ts">
import type { Todo } from './TodoItem.vue'
import { computed } from 'vue'
import TodoRouter from './TodoRouter.vue'

const props = defineProps<{
  todos: Todo[]
}>()
const remaining = computed(() => props.todos.filter((todo) => !todo.completed).length)

const emit = defineEmits<{
  'remove-completed': []
}>()

function removeCompleted() {
  emit('remove-completed')
}
</script>
<template>
  <div v-show="props.todos.length > 0" class="todo__filter">
    <div class="todo__remain">
      <span>{{ remaining }} items left</span>
    </div>
    <TodoRouter class="todo__router--desktop" />
    <div class="todo__clear">
      <button class="button-clear" @click="removeCompleted">Clear completed</button>
    </div>
  </div>
</template>
