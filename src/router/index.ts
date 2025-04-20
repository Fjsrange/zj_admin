import { createRouter, createWebHistory } from "vue-router";
import { DefineComponent, ComponentOptions } from "vue";

export type Route = {
  path: string;
  name?: string;
  component?: ComponentOptions | DefineComponent;
  meta?: RouteMeta;
  children?: Route[];
};

export type RouteMeta = {
  title: string;
  icon?: string;
  order?: number; // 序号
  hidden?: boolean; // 是否隐藏
};

const routes: Route[] = [
  {
    path: "/",
    name: "index",
    meta: { title: "首页", icon: "HomeFilled", order: 1 },
    component: () => import("@/view/index.vue"),
    // children: [
    //   {
    //     path: "/",
    //     name: "dashboard",
    //     meta: {
    //       title: "首页",
    //       icon: "HomeFilled",
    //       order: 1,
    //     },
    //     component: () => import("@/view/index.vue"),
    //   },
    // ],
  },
  // 教学管理 teach
  {
    path: "/teach",
    name: "teach",
    meta: { title: "教学管理", icon: "EditPen", order: 2 },
    children: [
      {
        path: "/teach/course",
        name: "course",
        meta: { title: "课程", order: 1 },
        component: () => import("@/view/teach/course/index.vue"),
      },
      {
        path: "/teach/questionBank",
        name: "questionBank",
        meta: { title: "题库", order: 2 },
        component: () => import("@/view/teach/questionBank/index.vue"),
      },
      {
        path: "/teach/answerQuestions",
        name: "answerQuestions",
        meta: { title: "答疑", order: 3 },
        component: () => import("@/view/teach/answerQuestions/index.vue"),
      },
      {
        path: "/teach/courseClassification",
        name: "courseClassification",
        meta: { title: "课程分类", order: 4 },
        component: () => import("@/view/teach/courseClassification/index.vue"),
      },
      {
        path: "/teach/topicType",
        name: "topicType",
        meta: { title: "题目类型", order: 5 },
        component: () => import("@/view/teach/topicType/index.vue"),
      },
      {
        path: "/teach/test",
        name: "test",
        meta: { title: "测试", order: 6 },
        component: () => import("@/view/teach/test/index.vue"),
      },
      {
        path: "/teach/liveBroadcast",
        name: "liveBroadcast",
        meta: { title: "直播", order: 7 },
        component: () => import("@/view/teach/liveBroadcast/index.vue"),
      },
      {
        path: "/teach/videoManagement",
        name: "videoManagement",
        meta: { title: "视频管理", order: 8 },
        component: () => import("@/view/teach/videoManagement/index.vue"),
      },
    ],
  },
  // 系统管理 system
  {
    path: "/system",
    name: "system",
    meta: { title: "系统管理", icon: "Setting", order: 3 },
    children: [
      {
        path: "/system/user",
        name: "user",
        meta: { title: "用户", order: 1 },
        component: () => import("@/view/system/user/index.vue"),
      },
      {
        path: "/system/role",
        name: "role",
        meta: { title: "角色", order: 2 },
        component: () => import("@/view/system/role/index.vue"),
      },
      {
        path: "/system/auth",
        name: "auth",
        meta: { title: "权限", order: 3 },
        component: () => import("@/view/system/auth/index.vue"),
      },
    ],
  },
  // 教务管理 educational
  {
    path: "/educational",
    name: "educational",
    meta: { title: "教务管理", icon: "Monitor", order: 4 },
    children: [
      {
        path: "/educational/class",
        name: "class",
        meta: { title: "班级", order: 1 },
        component: () => import("@/view/educational/class/index.vue"),
      },
      {
        path: "/educational/classSchedule",
        name: "classSchedule",
        meta: { title: "课表", order: 2 },
        component: () => import("@/view/educational/classSchedule/index.vue"),
      },
      {
        path: "/educational/courseware",
        name: "courseware",
        meta: { title: "课件", order: 3 },
        component: () => import("@/view/educational/courseware/index.vue"),
      },
      {
        path: "/educational/signIn",
        name: "signIn",
        meta: { title: "签到", order: 4 },
        component: () => import("@/view/educational/signIn/index.vue"),
      },
      {
        path: "/educational/carouselMap",
        name: "carouselMap",
        meta: { title: "轮播图", order: 5 },
        component: () => import("@/view/educational/carouselMap/index.vue"),
      },
    ],
  },
  // 销售管理 market
  {
    path: "/market",
    name: "market",
    meta: { title: "销售管理", icon: "User", order: 5 },
    children: [
      {
        path: "/market/student",
        name: "student",
        meta: { title: "学生", order: 1 },
        component: () => import("@/view/market/student/index.vue"),
      },
      {
        path: "/market/agent",
        name: "agent",
        meta: { title: "代理商", order: 2 },
        component: () => import("@/view/market/agent/index.vue"),
      },
      {
        path: "/market/salesperson",
        name: "salesperson",
        meta: { title: "销售人员", order: 3 },
        component: () => import("@/view/market/salesperson/index.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    meta: { title: "关于", icon: "InfoFilled", order: 9 },
    component: () => import("@/view/about/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "登录", hidden: true },
    component: () => import("@/view/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(""),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("admin");
    const authList = localStorage.getItem("authList");
    if (token && admin && authList) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
