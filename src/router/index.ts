import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import("@/views/Login.vue") },
    {
      path: '/',
      component: () => import('@/views/Layout.vue'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/views/Home.vue') },
        { path: '/article', component: () => import('@/views/Article.vue') },
        { path: '/notify', component: () => import('@/views/Notify.vue') },
        { path: '/user', component: () => import('@/views/User.vue') }
      ]
    }
  ]
})

export default router