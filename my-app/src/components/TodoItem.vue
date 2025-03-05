<script setup lang="ts">
import { computed } from 'vue'
import CrossIconRaw from '@/assets/images/icon-cross.svg?raw'
import CheckIconRaw from '@/assets/images/icon-check.svg?raw'

export type Todo = {
  id: number
  description: string
  completed: boolean
}

const props = defineProps<{ todo: Todo }>()

const emit = defineEmits<{
  'delete-todo': [todo: Todo]
  'toggle-todo': [todo: Todo, value: boolean]
}>()

const toggleModel = computed({
  get: () => props.todo.completed,
  set: (value) => {
    emit('toggle-todo', props.todo, value)
  },
})

const deleteTodo = () => {
  emit('delete-todo', props.todo)
}

const toggleTodo = () => {
  toggleModel.value = !toggleModel.value
}
</script>

<template>
  <li
    class="todo__item"
    :class="{ 'todo__item--completed': props.todo.completed }"
    aria-label="todo item"
  >
    <button @click="toggleTodo" class="todo__item__mark">
      <div v-html="CheckIconRaw" class="check-icon mark__content" />
    </button>
    <p class="todo__item__text">{{ props.todo.description }}</p>
    <button class="todo__item__delete" @click.prevent="deleteTodo" aria-label="delete todo">
      <div v-html="CrossIconRaw" class="delete-icon" />
    </button>
  </li>
</template>

<style scoped></style>
