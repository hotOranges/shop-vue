<template>
  <div id="apps" :style="{height:fullHeight + 'px'}">
      <van-nav-bar title="领券中心" @click-left="onClickLeft" left-arrow>
    </van-nav-bar>
   <div v-if="couponcardData.length<=0">
          <h5 style="color:#8C8C8C;text-align: center;padding-top: 200px;">没有优惠券～</h5>
  </div> 
    <van-cell-group v-else>
  <van-cell class="bg1">
      <van-row class="couponcard" v-for="(item, index) in couponcardData" :key="index+1">
         <van-col span="9" class="couponleft">
             <span class="pr_text">￥<b>{{item.reductionMoney}}</b></span>
             <span class="ge_text">满{{item.fullMoney}}元可用</span>
         </van-col>
         <van-col span="15" class="couponright">
             <span class="couponame">{{item.couponName}}</span>
             <span class="coupontime">{{item.startTime | capitalize}}~{{item.endTime | capitalize}}</span>
             <van-button v-if="item.isCollect=='1'" size="small" round class="couponbutton" type="danger" @click="getcoupon(item)">立即领取</van-button>
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
import {couponCenter,collectCoupons} from '../api/login'
import {timestampToTime} from '../utils/date'
export default {
  data () {
    return {
        fullHeight: document.documentElement.clientHeight,
        couponcardData:[],
        shows:true,
        page:0,
    };
  },
filters:{
		capitalize:function(value){
            var newDate=new Date(value.replace(/\-/g, '/')).getTime()/1000
			return timestampToTime(newDate)
        }
},

  mounted() {
      this.inits()
  },
  methods: {
    inits(){
         let para = {
              token:JSON.parse(localStorage.getItem('token'))
            }
            couponCenter(para).then(res=>{
            this.couponcardData = res
            })
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    getcoupon(e){
        let para = {
              token:JSON.parse(localStorage.getItem('token')),
              couponId:e.id
            }    
            collectCoupons(para).then(res=>{
                        this.inits()
                        Toast('领取成功')
             })
        
    
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

