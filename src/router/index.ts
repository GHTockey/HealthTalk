import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false
})


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/Login.vue'), meta: { title: '登录' } },
    {
      path: '/',
      component: () => import('@/views/Layout.vue'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/views/Home.vue'), meta: { title: '首页' } },
        { path: '/article', component: () => import('@/views/Article.vue'), meta: { title: '健康百科' } },
        { path: '/notify', component: () => import('@/views/Notify.vue'), meta: { title: '消息通知' } },
        { path: '/user', component: () => import('@/views/User.vue'), meta: { title: '个人中心' } }
      ]
    }
  ]
});

// 访问权限控制
router.beforeEach((to) => {
  // 用户仓库
  const store = useUserStore()
  // 不需要登录的页面，白名单
  const wihteList = ['/login']
  // 如果没有登录且不在白名单内，去登录
  if (!store.user_info?.token && !wihteList.includes(to.path)) return '/login'
  // 否则不做任何处理

  NProgress.start()
});

router.afterEach((to) => {
  document.title = `${to.meta.title || ''}-优医问诊`
  NProgress.done()
});


export default router