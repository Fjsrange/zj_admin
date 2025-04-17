<script setup lang="ts">
import Layout from "@/Layout/index.vue";

console.log(import.meta.env);
</script>

<template>
  <!-- <router-view></router-view> -->
  <Layout></Layout>
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
