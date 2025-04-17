<script setup lang="ts">
import { ref } from "vue";
import Menu from "./menu/index.vue";
import Header from "./header/index.vue";
import Content from "./content/index.vue";
</script>

<template>
  <div class="l-layout">
    <div>
      <Menu></Menu>
    </div>
    <div class="l-layout__right">
      <Header></Header>
      <Content></Content>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/bem.scss";

@include b(layout) {
  @include bfc();
  display: flex;

  @include e(right) {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
