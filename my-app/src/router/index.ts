import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/TodoView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'All',
      component: TodoView,
    },
    {
      path: '/active',
      name: 'Active',
      component: TodoView,
    },
    {
      path: '/completed',
      name: 'Completed',
      component: TodoView,
    },
  ],
})

export default router
