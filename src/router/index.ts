import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
})

export default router
