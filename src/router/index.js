import { createRouter, createWebHashHistory } from 'vue-router';
import utils from '@/utils'

import Home from '@/views/home';

const routes = [
  // 路由的默认路径
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/login',
    component: ()=>import('@/views/login'),
  },
  {
    path: '/404',
    component: ()=>import('@/views/error/404'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    hidden: true
  }

];

// 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    const token = utils.getStore('access_token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router;
