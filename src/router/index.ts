import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/admin/gestion-produits',
      name: 'gestion-produits',
      component: () => import('../views/admin/HomeView.vue'),
    },

  ],
})

export default router
