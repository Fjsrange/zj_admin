<script setup lang="ts"></script>

<template>
  <div class="content">
    <h1>content</h1>
    <img
      src="@/assets/img/welcome.fc68b20.gif"
      alt=""
      style="width: 100%; height: 100%"
    />
  </div>
</template>

<style scoped lang="scss">
.content {
  position: relative;

  h1 {
    z-index: 1;
    position: absolute;
    top: 10%;
    left: 45%;
    color: #45d193;
  }

  img {
    margin: 10px;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
