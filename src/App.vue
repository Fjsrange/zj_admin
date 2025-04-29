<script setup lang="ts">
import { ref, computed } from "vue";
import Layout from "@/Layout/index.vue";
import { useRoute } from "vue-router";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const locale = ref(zhCn);
console.log(import.meta.env);
const route = useRoute();

const login = computed(() => {
  return route.path === "/login";
});
</script>

<template>
  <el-config-provider :locale="locale">
    <!-- <router-view></router-view> -->
    <Layout v-if="!login"></Layout>
    <router-view v-else></router-view>
    <</el-config-provider
  >
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #f0f2f5;
}
</style>
