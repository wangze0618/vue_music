<template>
  <div class="main">
    <!-- 二级挂载点 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */

.main {
  padding: 0 0 50px 0 !important;
}
</style>