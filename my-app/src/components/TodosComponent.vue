<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import TodoCreater from './TodoCreater.vue'
import TodoFilter from './TodoFilter.vue'
import TodoItem, { type Todo } from './TodoItem.vue'
import TodoRouter from './TodoRouter.vue'
import MoonIcon from '@/assets/images/icon-moon.svg?raw'
import SunIcon from '@/assets/images/icon-sun.svg?raw'

import { useRoute } from 'vue-router'

const todos = ref<Todo[]>([])
const isDarkMode = ref(false)
const route = useRoute()

onMounted(() => {
  try {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos);
    }
  } catch (err) {
    console.error("Failed to load todos from localStorage", err)
    todos.value = []
  }
})

watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, {deep: true})

function toggleLightMode() {
  isDarkMode.value = !isDarkMode.value
}

watch(isDarkMode, (newValue) => {
  const app = document.getElementById('app')
  app?.classList.toggle('app--dark', newValue)
})

// todo id
const nextId = computed(() => {
  if (todos.value.length === 0) {
    return 0
  }
  return (
    Math.max(
      ...todos.value.map((todo) => {
        return todo.id
      }),
    ) + 1
  )
})

// todo item manipulation
function addTodo(value: string) {
  todos.value.push({
    completed: false,
    description: value,
    id: nextId.value,
  })
}

function deleteTodo(todo: Todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}

function toggleTodo(todo: Todo, value: boolean) {
  todo.completed = value
}

// todos manipulation
const filters = {
  active: () => computed(() => todos.value.filter((todo) => !todo.completed)),
  completed: () => computed(() => todos.value.filter((todo) => todo.completed)),
}
const filteredTodos = computed(() => {
  switch (route.name) {
    case 'Active':
      return filters.active().value
    case 'Completed':
      return filters.completed().value
    default:
      return todos.value
  }
})

function deleteCompleted() {
  todos.value = todos.value.filter((todo) => !todo.completed)
}
</script>

<template>
  <div class="todo">
    <header class="todo__header">
      <div class="todo__header__top">
        <h1 class="todo__logo"><RouterLink to="/">Todo</RouterLink></h1>
        <button @click="toggleLightMode" class="button__toggle">
          <div v-html="isDarkMode ? SunIcon : MoonIcon" />
        </button>
      </div>
      <div class="todo__header__bottom">
        <TodoCreater @add-todo="addTodo" />
      </div>
    </header>
    <main class="todo__main">
      <ul>
        <TodoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          @delete-todo="deleteTodo"
          @toggle-todo="toggleTodo"
        />
      </ul>
      <TodoFilter :todos="todos" @remove-completed="deleteCompleted"></TodoFilter>
    </main>
    <nav class="todo__nav" v-show="todos.length > 0"><TodoRouter /></nav>
  </div>
</template>

<style scoped></style>
