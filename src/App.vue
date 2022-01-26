<template>
  <div>
    <!-- NavBar -->
    <van-nav-bar :title="$route.meta.title" />

    <!-- 一级路由-显示的地方 -->
    <router-view></router-view>

    <!-- TabBar -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" icon="search"
        >搜索
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },

  methods: {},
};
</script>

<style>
</style>