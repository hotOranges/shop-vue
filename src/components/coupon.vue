<template>
  <div id="apps" :style="{height:fullHeight + 'px'}">
    <van-nav-bar title="优惠券" @click-left="onClickLeft" left-arrow></van-nav-bar>

    <van-tabs v-model="active" @change="changeTab">
      <van-tab v-for="index in Tabtext" :title="' ' + index" :key="index+1">
        <van-cell-group v-if="couponcardDatas.length>0">
          <van-cell class="bg1">
              
            <van-row class="couponcard" v-for="(item, index) in couponcardDatas" :key="index+1">
              <van-col span="9" class="couponleft">
                <span class="pr_text" :class="active==1 ? 'class-a' : 'class-b' ">￥
                  <b>{{item.reductionMoney}}</b>
                </span>
                <span class="ge_text">满{{item.fullMoney}}元可用</span>
              </van-col>
              <van-col span="15" class="couponright">
                <span class="couponame" :class="active==1 ? 'class-a' : 'class-b' ">{{item.couponName}}</span>
                <span class="coupontime">{{item.startTime | capitalize}}~{{item.endTime | capitalize}}</span>
                <van-button
                  v-if="item.state"
                  size="small"
                  round
                  class="couponbutton"
                  type="danger"
                  @click="getcoupon(item)"
                >立即使用</van-button>
              </van-col>
            </van-row>
          </van-cell>
          <h5
            v-if="couponcardData.length>0 && shows && couponcardData.length>=(page+1)*5"
            @click="more"
            class="more"
          >
            <van-icon name="add-o"/>
            <i class="text">点击加载更多</i>
          </h5>
        </van-cell-group>
        <div v-else >
          <div class="van-coupon-list__empty"><img src="https://img.yzcdn.cn/v2/image/wap/trade/new_order/empty@2x.png"><p>暂无优惠券</p></div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
import { myCoupons } from "../api/login";
import {formatDate} from '../utils/date'
export default {
  data() {
    return {
      fullHeight: document.documentElement.clientHeight,
      couponcardDatas: [],
      shows: true,
      page: 0,
      couponcardData: [],
      active: 0,
      Tabtext: ["未使用", "已过期"]
    };
  },

  components: {},

  computed: {},
filters:{
		capitalize:function(value){
            var newDate=new Date(value)
			return formatDate(newDate,'yyyy-MM-dd')
        }
},
  mounted() {
    this.initData();
  },

  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    getcoupon(e) {
      this.$router.push("/");
    },
    changeTab(e) {
      //    this.page = 0
      //    this.shows =true
      //    this.initData()
      if (e==0) {
          this.couponcardDatas = this.couponcardData0
      }else{
          this.couponcardDatas = this.couponcardData
      }
    },
    initData() {
      let para = {
        token: JSON.parse(localStorage.getItem("token")),
        type: 0
      };
      myCoupons(para).then(res => {
        if (res) {
            for (let i = 0; i < res.length; i++) {
                 res[i].state = true;
                
            }
          this.couponcardData0 = res
          this.couponcardDatas = res;
        }
        this.disabledcoupon();
      });
     
    },
    disabledcoupon() {
      let para = {
        token: JSON.parse(localStorage.getItem("token")),
        type: 1
      };
      myCoupons(para).then(res => {
        if (res) {
          this.couponcardData = res;
        }
      });
    },
    more() {
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
    }
  }
};
</script>
<style scoped>
#apps >>> .van-nav-bar .van-icon {
  color: #323232;
}
.couponleft {
  text-align: center;
}
.couponleft span {
  display: inline-block;
  width: 100%;
}
.pr_text {
  color: #b39061;
  margin-top: 5px;
}
.pr_text.class-a {
  color: #6b6b6b;
}
.pr_text b {
  font-size: 35px;
  font-weight: 400;
}
.ge_text {
  color: #3c3c3c;
  font-size: 12px;
}
.couponright {
  position: relative;
}
.couponright span {
  display: inline-block;
  width: 100%;
}
.couponright .couponbutton {
  position: absolute;
  right: 4px;
  top: 10px;
  font-size: 11px;
  height: 24px;
  line-height: 24px;
}
.couponright .couponbutton.noactive {
  background: rgba(216, 216, 216, 1);
  color: rgba(255, 255, 255, 1);
  min-width: 66px;
}
.couponright .couponame {
  font-size: 17px;
  color: #323232;
}
.couponright .couponame.class-a {
  color: #6b6b6b;
}
.couponright .coupontime {
  color: #6b6b6b;
  font-size: 11px;
}
#apps {
  background: rgba(242, 242, 242, 1);
}
.couponcard {
  width: 100%;
  padding-top: 20px;
  background-color: #fff;
  padding-bottom: 10px;
  margin-bottom: 11px;
}
#apps >>> .van-cell-group.van-hairline--top-bottom {
  background-color: transparent;
}
#apps >>> .bg1 {
  background: rgba(242, 242, 242, 1);
}
#apps >>> .more {
  text-align: center;
  line-height: 30px;
  position: relative;
}
#apps >>> .more .text {
  font-style: unset;
  padding-left: 21px;
}
#apps >>> .more .van-icon.van-icon-add-o {
  font-size: 15px;
  margin-right: 2px;
  /* margin-top: 0px; */
  /* line-height: 28px; */
  position: absolute;
  top: 6px;
  padding-right: 24px;
}
#apps >>> .van-tabs__nav--line {
  padding-bottom: 0px;
  border-top: 1px solid rgba(216, 216, 216, 1);
}
#apps >>> .van-tabs__line {
  bottom: 1px;
  background-color: #b39061;
  height: 0;
}
#apps >>> .van-tab {
  color: #323232;
}
#apps >>> .van-tab--active {
  color: #b39061;
  border-bottom: 3px solid #b39061;
}
</style>

