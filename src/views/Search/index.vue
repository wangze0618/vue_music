<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      @input="search"
      placeholder="请输入搜索关键词"
    />
    <div v-if="hotSearchArr.length == 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          @click="fn(item)"
          v-for="(item, index) in hotArr"
          :key="index"
          >{{ item.first }}</span
        >
      </div>
    </div>
    <div v-else>
      <p class="hot_title">最佳匹配</p>
      <van-cell-group v-for="(obj, index) in hotSearchArr" :key="index">
        <van-cell
          :title="obj.name"
          :label="obj.ar[0].name + ' - ' + obj.al.name"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="1.3rem" class="play-icon" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResultListAPI } from "../../api/index.js";
export default {
  data() {
    return {
      value: "",
      hotArr: [],
      hotSearchArr: [],
    };
  },
  async created() {
    const res = await hotSearchAPI();
    this.hotArr = res.data.result.hots;
  },
  methods: {
    async fn(item) {
      this.value = item.first;
      const res2 = await searchResultListAPI({
        keywords: this.value,
        limit: 20,
      });
      this.hotSearchArr = res2.data.result.songs;
    },
    async search() {
      if (this.value.length !== 0) {
        const res2 = await searchResultListAPI({
          keywords: this.value,
          limit: 20,
        });
        this.hotSearchArr = res2.data.result.songs;
      } else {
        this.hotSearchArr = [];
      }
    },
  },
};
</script>

<style scoped>
.van-cell {
  align-items: center;
}
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
  padding-left: 0.85rem;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
  padding-left: 0.85rem;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0.38rem 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>