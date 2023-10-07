import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TopRS from '@/views/TopRS.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/top-rs1',
      name: 'topRS1',
      component: TopRS,
      props: { topRSNumber: 1 }
    },
    {
      path: '/top-rs3',
      name: 'topRS3',
      component: TopRS,
      props: { topRSNumber: 3 }
    }
  ]
})

export default router
