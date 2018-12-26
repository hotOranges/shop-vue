<!--  -->
<template>
  <div id="app">
  <van-nav-bar
  class="init-header"
  title="在线客服"
  left-text=""
  left-arrow
  @click-left="onClickLeft"
>
  <van-icon name="delete" slot="right" />
  </van-nav-bar>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
    v-for="item in list"
    :key="item"
    :title="item"
  >
  </van-cell>
</van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
//   compsonents: {},

//   computed: {},

//   mounted: {},

  methods: {
      onClickLeft(){
        this.$router.back(-1);
      },
      onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
}

</script>
<style>
</style>
