<script setup lang="ts"></script>

<template>
  <div class="content">
    <h1>content</h1>
    <img src="@/assets/img/welcome.fc68b20.gif" alt="" />
  </div>
</template>

<style scoped lang="scss">
.content {
  position: relative;
  height: 100%;

  h1 {
    z-index: 1;
    position: absolute;
    top: 10%;
    left: 45%;
    color: #45d193;
  }

  img {
    position: absolute;
    top: 10px;
    left: 10px;
    width: calc(100% - 20px); /* 减去左右边距 */
    height: calc(100% - 20px); /* 减去上下边距 */
    box-sizing: border-box; /* 包含边距在内的总宽度和高度 */
  }
}
</style>
