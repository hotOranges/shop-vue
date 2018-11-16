<!--  -->
<template>
  <div id="app">
      <van-nav-bar title="晒单评论" @click-left="onClickLeft" left-arrow>
</van-nav-bar>
<van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
    
    };
  },


//   mounted: {
    
//   },

  methods: {
      onClickLeft(){
        this.$router.back(-1);
    }
  }
}

</script>
<style scoped>
</style>