

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
  // 教学管理 teach
  {
    path: '/teach',
    name: 'teach',
    meta: { title: '教学管理', icon: 'EditPen', order: 3 },
    children: [
      {
        path: '/teach/course',
        name: 'course',
        meta: { title: '课程', order: 1 },
        component: () => import('@/view/teach/course/index.vue')
      },
      {
        path: '/teach/questionBank',
        name: 'questionBank',
        meta: { title: '题库', order: 2 },
        component: () => import('@/view/teach/questionBank/index.vue')
      },
      {
        path: '/teach/answerQuestions',
        name: 'answerQuestions',
        meta: { title: '答疑', order: 3 },
        component: () => import('@/view/teach/answerQuestions/index.vue')
      },
      {
        path: '/teach/courseClassification',
        name: 'courseClassification',
        meta: { title: '课程分类', order: 4 },
        component: () => import('@/view/teach/courseClassification/index.vue')
      },
      {
        path: '/teach/topicType',
        name: 'topicType',
        meta: { title: '题目类型', order: 5 },
        component: () => import('@/view/teach/topicType/index.vue')
      },
      {
        path: '/teach/test',
        name: 'test',
        meta: { title: '测试', order: 6 },
        component: () => import('@/view/teach/test/index.vue')
      },
      {
        path: '/teach/liveBroadcast',
        name: 'liveBroadcast',
        meta: { title: '直播', order: 7 },
        component: () => import('@/view/teach/liveBroadcast/index.vue')
      },
      {
        path: '/teach/videoManagement',
        name: 'videoManagement',
        meta: { title: '视频管理', order: 8 },
        component: () => import('@/view/teach/videoManagement/index.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    meta: { title: '关于', icon: 'InfoFilled', order: 9 },
    component: () => import('@/view/about/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})


export default router;
