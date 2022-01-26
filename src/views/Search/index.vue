<template>
  <div>
    <van-search
      v-model.lazy="value"
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
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group v-for="(obj, index) in hotSearchArr" :key="index">
          <van-cell
            :title="obj.name"
            :label="obj.ar[0].name + ' - ' + obj.al.name"
          >
            <template #right-icon>
              <van-icon
                name="play-circle-o"
                size="1.3rem"
                @click="playFn(obj.id)"
                class="play-icon"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResultListAPI } from "../../api/index.js";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      value: "",
      hotArr: [],
      hotSearchArr: [],
      page: 1,
      timer: true,
    };
  },
  async created() {
    const res = await hotSearchAPI();
    this.hotArr = res.data.result.hots;
  },
  methods: {
    playFn(id) {
      this.$router.push({
        path: "/play",
        query: {
          id: id,
        },
      });
    },
    async fn(item) {
      this.page = 1;
      this.value = item.first;
      const res2 = await searchResultListAPI({
        keywords: this.value,
        limit: 30,
        offset: (this.page - 1) * 30,
      });
      if (res2.data.result.songs === undefined) {
        this.hotSearchArr = [];
      } else {
        this.hotSearchArr = res2.data.result.songs;
      }
    },
    async search() {
      this.page = 1;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          if (this.value.length == 0) {
            this.hotSearchArr = [];
          } else {
            const res2 = await searchResultListAPI({
              keywords: this.value,
              limit: 30,
              offset: (this.page - 1) * 30,
            });
            this.hotSearchArr = res2.data.result.songs;
            if (res2.data.result.songs === undefined) {
              this.hotSearchArr = [];
            } else {
              this.hotSearchArr = res2.data.result.songs;
            }
          }
        }, 900);
        this.timer = true;
      }
    },
    async onLoad() {
      this.page++;
      const res2 = await searchResultListAPI({
        keywords: this.value,
        limit: 30,
        offset: (this.page - 1) * 30,
      });
      if (res2.data.result.songs === undefined) {
        this.hotSearchArr = [];
      } else {
        this.hotSearchArr = res2.data.result.songs;
      }
      // this.hotSearchArr = res2.data.result.songs;
      this.loading = false;
      if (this.hotSearchArr.length >= 30) {
        this.finished = true;
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