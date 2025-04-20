<script setup lang="ts">
import { computed } from "vue";
import Layout from "@/Layout/index.vue";
import { useRoute } from "vue-router";

console.log(import.meta.env);
const route = useRoute();

const login = computed(() => {
  return route.path === "/login";
});
</script>

<template>
  <!-- <router-view></router-view> -->
  <Layout v-if="!login"></Layout>
  <router-view v-else></router-view>
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
