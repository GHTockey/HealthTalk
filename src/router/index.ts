import { useUserStore } from '@/stores'
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
// 访问权限控制
router.beforeEach((to) => {
  // 用户仓库
  const store = useUserStore()
  // 不需要登录的页面，白名单
  const wihteList = ['/login']
  // 如果没有登录且不在白名单内，去登录
  if (!store.user_info?.token && !wihteList.includes(to.path)) return '/login'
  // 否则不做任何处理
})

export default router