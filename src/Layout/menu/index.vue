<script lang="ts" setup>
import { ref, computed } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useMenuStore } from "@/store/index";
import { useRouter } from "vue-router";

const menuStore = useMenuStore();
// const isCollapse = ref<boolean>(menuStore.isCollapse);

// 从router/index.ts中引入路由配置
const router = useRouter(); // 获取路由实例

// 定义类型守卫
function getOrder(order: unknown): number {
  return typeof order === "number" ? order : 0;
}

// 获取所有非隐藏的路由，用于生成菜单
const menuRoutes = computed(() => {
  return router.options.routes
    .filter((route) => route.meta && !route.meta.hidden) // 过滤掉隐藏的路由
    .sort((a, b) => getOrder(a.meta?.order) - getOrder(b.meta?.order)); // 根据order属性排序
});

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

// 导航到指定路由
const navTo = (path: string) => {
  console.log("path", path);

  router.push(path);
};
</script>

<template>
  <div class="header">
    <div class="mb-2" v-show="!menuStore.isCollapse">Default</div>
    <div class="mb-2" v-show="menuStore.isCollapse">
      <img src="@/assets/vue.svg" width="30" height="30" alt="" />
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      :collapse="menuStore.isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- 遍历菜单路由 -->
      <template v-for="(route, index) in menuRoutes" :key="route.path">
        <!-- 存在子菜单 一级菜单 -->
        <el-sub-menu
          v-if="route.children && route.children.length > 0"
          :index="route.path"
        >
          <template #title>
            <el-icon :size="20" color="#fff">
              <component :is="route.meta?.icon" />
            </el-icon>
            <span>{{ route.meta?.title }}</span>
          </template>

          <!-- 遍历子菜单 二级菜单 -->
          <el-menu-item-group
            v-for="(child, j) in route.children"
            :key="child.path"
            :index="child.path"
          >
            <el-menu-item
              :index="`${route.path}-${child.path}`"
              @click="navTo(child.path)"
              >{{ child.meta?.title }}</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>

        <!-- 没有子菜单 -->
        <el-menu-item v-else :index="route.path" @click="navTo(route.path)">
          <el-icon v-if="route.meta && route.meta.icon" :size="20" color="#fff">
            <component :is="route.meta?.icon" />
          </el-icon>
          <span>{{ route.meta?.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.header {
  background-color: #545c64;
  height: 100vh;

  .mb-2 {
    padding: 2rem 0;
    text-align: center;
    color: #fff;
  }
}

.el-menu {
  background-color: var(--el-menu-bg-color);
  border-right: 1px solid var(--el-menu-bg-color);
  box-sizing: border-box;
  list-style: none;
  margin: 0;
  padding-left: 0;
  position: relative;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100vh;
}

.el-menu--collapse {
  height: 100vh;
}
</style>
