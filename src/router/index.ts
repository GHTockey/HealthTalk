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
    { path: '/login', component: () => import('@/views/Login/LoginPage.vue'), meta: { title: '登录' } },
    {
      path: '/',
      component: () => import('@/views/Layout.vue'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/views/Home/HomePage.vue'), meta: { title: '首页' } },
        { path: '/article', component: () => import('@/views/Article/ArticlePage.vue'), meta: { title: '健康百科' } },
        { path: '/notify', component: () => import('@/views/Notify/NotifyPage.vue'), meta: { title: '消息通知' } },
        { path: '/user', component: () => import('@/views/User/UserPage.vue'), meta: { title: '个人中心' } }
      ]
    },
    { path: '/user/patient', component: () => import('@/views/User/PatientPage.vue'), meta: { title: '家庭档案' } },
    { path: '/consult/fast', component: () => import('@/views/Consult/ConsultFast.vue'), meta: { title: '极速问诊' } },
    { path: '/consult/dep', component: () => import('@/views/Consult/ConsultDep.vue'), meta: { title: '选择科室' } }



  ]
});

// 访问权限控制
router.beforeEach((to) => {
  // 用户仓库
  const store = useUserStore()
  // 不需要登录的页面，白名单
  const wihteList = ['/login']
  // 如果没有登录且不在白名单内，去登录
  if (!store.user?.token && !wihteList.includes(to.path)) return '/login'
  // 否则不做任何处理

  NProgress.start()
});

router.afterEach((to) => {
  document.title = `${to.meta.title || ''}-优医问诊`
  NProgress.done()
});


export default router