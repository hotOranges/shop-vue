<!--  -->
<template>
  <div id="app">
      <van-nav-bar title="我的订单" @click-left="onClickLeft" left-arrow>
</van-nav-bar>
<van-tabs>
  <van-tab v-for="index in Tabtext" :key="index+1" :title="' ' + index">
    内容 {{ index }}
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
        Tabtext:["全部订单","待付款","待收货","已收货","已取消"]
    };
  },


  mounted: {
    
  },

  methods: {
      onClickLeft(){
        this.$router.back(-1);
    }
  }
}

</script>
<style scoped>
#app >>> .van-tab--active{
    color: #B5915C
}
#app >>> .van-tabs__line{
    background-color: #B5915C;
}
</style>