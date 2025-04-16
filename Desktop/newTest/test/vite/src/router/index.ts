

import { createRouter, createWebHistory } from 'vue-router'
import { DefineComponent, ComponentOptions } from 'vue';

export type Route = {
  path: string;
  name?: string;
  component?: ComponentOptions | DefineComponent;
  meta?: RouteMeta;
  children?: Route[];
}

export type RouteMeta = {
  title: string;
  icon?: string;
  order?: number; // 序号
  hidden?: boolean; // 是否隐藏
}

const routes:Route[] = [
  {
    path: '/',
    meta: { title: '首页', icon: 'HomeFilled', order: 1 },
    component: () => import('@/view/index.vue'),
    // 序号
    
    children: [
      {
        path: '/',
        name: 'dashboard',
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          order: 1
        },
        component: () => import('@/view/index.vue'),
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    meta: { title: '关于', icon: 'InfoFilled', order: 2 },
    component: () => import('@/view/about/index.vue')
  },
  {
    path: '/login',
    meta: { title: '登录', hidden: true }, // 不显示在菜单中
    component: () => import('@/view/login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})


export default router;
