<template>
  <div id="apps">
      <van-nav-bar
  class="init-header"
  title="积分明细"
  left-text=""
  left-arrow
  @click-left="onClickLeft"
/>
 <van-cell-group>
  <van-cell v-if="data.length>0" v-for="(item, index) in data" :key="index+1">
      <p class="integrailtext">{{item.title}}</p>
      <span class="time">{{item.time}}</span>
      <span class="qrd">+ {{item.pre}}</span>
  </van-cell>
  <div v-else class="noneStyle">
      暂无积分明细
  </div>
</van-cell-group>

  </div>
</template>

<script>
export default {
  data () {
    return {
        data:[
            {title:'购物送积分',pre:'122',time:'2018-12-22 13:56'}
        ]
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
