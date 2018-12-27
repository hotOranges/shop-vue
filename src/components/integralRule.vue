<template>
  <div id="apps">
      <van-nav-bar
  class="init-header"
  title="积分规则"
  left-text=""
  left-arrow
  @click-left="onClickLeft"
/>
 <van-cell-group>
 
  <div  class="noneStyle">
      文案待定
  </div>
</van-cell-group>

  </div>
</template>

<script>
export default {
  data () {
    return {
        data:false
    };
  },

  components: {},

  computed: {},

  mounted(){},

  methods: {
      onClickLeft(){
          this.$router.back()
      }
  }
}

</script>
<style scoped>
 .noneStyle{
    text-align: center;
    margin-top: 80px;
 }
 p{
     padding: 0;
     margin: 0;
     position: relative;
 }
 .time{
     color: #6B6B6B;
     font-size: 12px
 }
.qrd{ position: absolute;right: 15px; color: red;top:10px}
#apps >>> .van-nav-bar .van-icon {
    color: #323232;
}
</style>
