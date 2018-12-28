<template>
  <div id="apps" :style="{height:fullHeight + 'px'}">
      <van-nav-bar title="领券中心" @click-left="onClickLeft" left-arrow>
    </van-nav-bar>
    <van-cell-group>
  <van-cell class="bg1">
      <van-row class="couponcard" v-for="(item, index) in couponcardData" :key="index+1">
         <van-col span="9" class="couponleft">
             <span class="pr_text">￥<b>{{item.price}}</b></span>
             <span class="ge_text">{{item.rule}}</span>
         </van-col>
         <van-col span="15" class="couponright">
             <span class="couponame">{{item.name}}</span>
             <span class="coupontime">{{item.time}}</span>
             <van-button v-if="item.state" size="small" round class="couponbutton" type="danger" @click="getcoupon(item)">立即领取</van-button>
             <van-button v-else size="small" round class="couponbutton noactive" disabled>已领取</van-button>
         </van-col>
      </van-row>
  </van-cell>
  <h5 v-if="couponcardData.length>0 && shows && couponcardData.length>=(page+1)*5" @click="more" class="more"><van-icon name="add-o" /><i class="text">点击加载更多</i></h5>
</van-cell-group>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data () {
    return {
        fullHeight: document.documentElement.clientHeight,
        couponcardData:[
            {price:'xxx',rule:'满xxx元可用',name:'优惠券名xxxxx',time:'2017.03.13-20.17.04.12',state:true},
            {price:'xxx',rule:'满xxx元可用',name:'优惠券名xxxxx',time:'2017.03.13-20.17.04.12',state:false},
            {price:'xxx',rule:'满xxx元可用',name:'优惠券名xxxxx',time:'2017.03.13-20.17.04.12',state:true},
        ],
        shows:true,
        page:0,
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    getcoupon(e){
        Toast('领取成功')
        e.state = false;
    },
    more(){
    //   ++this.page
    //  let para = {
    //       token:JSON.parse(localStorage.getItem('token')),
    //       currentPage:this.page,
    //       pageSize:5
    //   }
    //   listSale(para).then(res=>{
    //     if (res.length>0) {
    //       for (var i in res) {
    //       this.fromData.push(res[i])
    //       }
    //     }else{
    //       this.shows =false
    //     }

    //   })
    },
  }
}

</script>
<style scoped>
#apps >>> .van-nav-bar .van-icon {
    color: #323232;
}
.couponleft{
    text-align: center;
}
.couponleft span{
    display: inline-block;
    width: 100%;
}
.pr_text{
    color: #B39061;
    margin-top: 5px;
}
.pr_text b{
    font-size: 35px;
    font-weight: 400;
}
.ge_text{
    color: #3C3C3C;
    font-size: 12px
}
.couponright{
    position: relative;
}
.couponright span{
    display: inline-block;
    width: 100%
}
.couponright .couponbutton{
    position: absolute;
    right: 4px;
    top: 10px;
    font-size: 11px;
    height: 24px;
    line-height: 24px
}
.couponright .couponbutton.noactive{
    background:rgba(216,216,216,1);
    color:rgba(255,255,255,1);
    min-width: 66px;
}
.couponright .couponame{
    font-size: 17px;
    color: #323232;
}
.couponright .coupontime{
    color: #6B6B6B;
    font-size: 11px;
}
#apps{
     background:rgba(242,242,242,1); 
}
.couponcard{
    width: 100%;
    padding-top: 20px;
    background-color: #fff;
    padding-bottom: 10px;
    margin-bottom: 11px;
}
#apps >>> .van-cell-group.van-hairline--top-bottom{
    background-color: transparent
}
#apps >>> .bg1{
   background:rgba(242,242,242,1);   
}
#apps >>> .more{
  text-align: center;
  line-height: 30px;
  position: relative;
}
#apps >>> .more .text{
  font-style: unset;
  padding-left: 21px;
}
#apps >>> .more .van-icon.van-icon-add-o{
  font-size: 15px;
  margin-right: 2px;
  /* margin-top: 0px; */
  /* line-height: 28px; */
  position: absolute;
  top: 6px;
  padding-right: 24px;
}
</style>

