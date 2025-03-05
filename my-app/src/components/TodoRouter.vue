<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div class="todo__router">
    <RouterLink to="/" :class="{ 'router--selected': route.name == 'All' }">All</RouterLink>
    <RouterLink to="/active" :class="{ 'router--selected': route.name == 'Active' }"
      >Active</RouterLink
    >
    <RouterLink to="/completed" :class="{ 'router--selected': route.name == 'Completed' }"
      >Completed</RouterLink
    >
  </div>
</template>
