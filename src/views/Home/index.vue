<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row gutter="10">
      <van-col span="8" v-for="item in recomArr" :key="item.id">
        <van-image width="100%" height="7rem" fit="cover" :src="item.picUrl" />
        <p class="song_name">{{ item.name }}</p>
      </van-col>
    </van-row>
    <p class="title">最新音乐</p>
    <van-cell-group v-for="obj in newSongArr" :key="obj.id">
      <van-cell
        :title="obj.name"
        :label="obj.song.artists[0].name + ' - ' + obj.name"
      >
        <template #right-icon>
          <van-icon name="play-circle-o" class="play-icon" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { recommendMusicAPI, newMusicAPI } from "../../api/index";

export default {
  data() {
    return {
      recomArr: [],
      newSongArr: [],
    };
  },
  async created() {
    const recomRes = await recommendMusicAPI({ limit: 6 });
    const newSongRes = await newMusicAPI({ limit: 20 });
    this.recomArr = recomRes.data.result;
    this.newSongArr = newSongRes.data.result;
  },
};
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.5rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.366667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
.van-cell {
  align-items: center;
  border-bottom: 1px solid lightgray;
}
.play-icon {
  font-size: 1.3rem;
}
</style>