<script setup lang="ts">
const emit = defineEmits<{
  'add-todo': [value: string]
}>()

function addTodo(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.value) {
    const value = target.value.trim()
    emit('add-todo', value)
    target.value = ''
  }
}
</script>

<template>
  <div class="todo__item">
    <div class="todo__item__mark">
      <div class="mark__content"></div>
    </div>
    <input
      type="text"
      class="todo__item__text"
      required
      autofocus
      autocomplete="off"
      placeholder="Create a new todo..."
      @keyup.enter="addTodo"
    />
  </div>
</template>
