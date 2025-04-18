<script setup lang="ts">
import { ref, computed } from "vue";
import { useMenuStore } from "@/store/index";
import { useRoute } from "vue-router";

const circleUrl = ref<string>(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const menuStore = useMenuStore();
// 侧边栏收缩
const isCollapse = ref<boolean>(menuStore.isCollapse);
const toggleCollapse = () => {
  menuStore.toggleCollapse();
  isCollapse.value = menuStore.isCollapse;
};

// 获取路由名称
// 获取当前路由信息
const route = useRoute();

// 计算当前激活的菜单项
const breadcrumbs = computed(() => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  let breadcrumbs = matched.map((item) => {
    return {
      title: item.meta.title,
      path: item.path,
    };
  });
  return breadcrumbs;
});
</script>

<template>
  <div class="header">
    <div class="left">
      <el-icon color="#545c64" :size="30" style="margin: 0 10px">
        <Expand v-if="isCollapse" @click="toggleCollapse" />
        <Fold v-else="!isCollapse" @click="toggleCollapse" />
      </el-icon>

      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
          {{ item.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="right">
      <el-icon><FullScreen /></el-icon>
      <div class="demo-type">
        <el-avatar :size="40" :src="circleUrl" />
      </div>
      <div>
        <span> 张三</span>
        <el-icon><ArrowDown /></el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  padding: 18px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    width: 200px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
