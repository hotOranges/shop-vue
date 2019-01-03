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
      <p class="integrailtext">{{item.integralType | filterText}}</p>
      <span class="time">{{item.createTime}}</span>
      <span class="qrd" v-if="item.onChange>0">+ {{item.onChange}}</span>
      <span class="qrd" v-else>{{item.onChange}}</span>
  </van-cell>
  <div v-else class="noneStyle">
      暂无积分明细
  </div>
</van-cell-group>

  </div>
</template>

<script>
import {integralDetail} from '../api/login'
export default {
  data () {
    return {
        data:[
        ]
    };
  },

  components: {},

  computed: {},
  filters:{
      filterText(id){
          var text;
         switch (id) {
             case '1':
                 text='签到'
                 break;
             case '2':
                 text='购买商品送积分'
                 break;
             case '3':
                 text='兑换商品'
                 break;    
             case '4':
                 text='退款扣除积分'
                 break;      
             default:
                 break;
         }
         return text
      }
  },
  mounted(){
      this.inits()
  },

  methods: {
      onClickLeft(){
          this.$router.back()
      },
      inits(){
            let para = {
              token:JSON.parse(localStorage.getItem('token'))
            }
            integralDetail(para).then(res=>{
               this.data = res ? res:'';
            })
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
