<template>
  <!--  组件 -->
  <div id="apps">
    <van-nav-bar class="init-header" left-arrow title="订单详情" @click-left="onClickLeft"/>
    <van-row>
      <van-col span="24" offset="0" class="payContent">
        <van-icon
          v-if="formdata.orderStatus=='3'"
          name="passed"
          size="60px"
          color="#26ADAB"
          style="padding-top:20px;padding-bottom:10px"
        />
        <van-icon
          v-if="formdata.orderStatus=='1'"
          name="gold-coin"
          size="60px"
          color="#26ADAB"
          style="padding-top:20px;padding-bottom:10px"
        />
        <van-icon
          v-if="formdata.orderStatus=='2'"
          name="logistics"
          size="60px"
          color="#26ADAB"
          style="padding-top:20px;padding-bottom:10px"
        />
        <van-icon
          v-if="formdata.orderStatus=='4'"
          name="close"
          size="60px"
          color="#26ADAB"
          style="padding-top:20px;padding-bottom:10px"
        />
        <p style="font-size: 22px;margin-bottom:30px">{{formdata.orderStatus |typeText}}</p>
      </van-col>
      <div class="init-10"></div>
      <van-cell id="initsbox" :title="formdata.consigneeName" :value="formdata.consigneePhone"/>
      <van-cell id="initsbox2" :title="formdata.consigneeAddress"/>
      <div class="init-10"></div>
      <van-cell v-for="(item, index) in formdata.detailList" :key="index">
        <div class="init-soller-list2">
          <van-col span="7" offset="2" class="imgList">
            <img :src="imgsevers +'/image/'+item.productImage" name="adapter">
          </van-col>
          <van-col span="24" offset="2" class="imgList">
            <span>{{item.productName}}</span>
            <span>数量：{{item.productNum}} 规格：{{item.productColor}}</span>
            <span>￥{{item.paymentAmount}}</span>
          </van-col>
          <van-col span="4" offset="2" class="imgList">
            <span style="font-size: 11px;"></span>
          </van-col>
        </div>
        <van-cell-group id="init-border" v-if="item.continueApply=='1'">
          <div span="4" offset="1" class="btn">
            <button @click="continueApply(item)">申请售后</button>
          </div>
        </van-cell-group>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span class="custom-text">订单编号</span>
          <span class="custom-text">{{formdata.orderNo}}</span>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span class="custom-text">下单日期</span>
          <span class="custom-text">{{formdata.orderTime}}</span>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span class="custom-text">支付方式</span>
          <span class="custom-text">{{formdata.payMethod |filterwhet}}</span>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span class="custom-text">支付时间</span>
          <span class="custom-text">{{formdata.payMentTime}}</span>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span class="custom-text">发票类型</span>
          <span class="custom-text">{{formdata.invoiceType | filterwhet2}}</span>
          <!-- <van-button round  size="small">查看发票</van-button> -->
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span class="custom-text">买家留言</span>
          <span class="custom-text">{{formdata.buyerMessage}}</span>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span class="custom-text">优惠券</span>
          <span class="custom-text">￥{{formdata.couponAmount | filtercouponAmount}}</span>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span class="custom-text">配送方式</span>
          <span class="custom-text">中通快递</span>
        </template>
      </van-cell>
    </van-row>
    <div class="init-10"></div>
    <van-cell title="商品总价" :value="'￥'+formdata.orderAmount"/>
    <van-cell title="运费" value="+￥0.00"/>
    <van-cell class="init-table" title :value="'实付款：¥ '+formdata.orderAmount"/>
    <van-cell-group id="init-border" style>
      <div span="4" offset="1" class="btn" v-if="formdata.orderStatus =='3'">
        <button @click="Evaluation">评价晒单</button>
      </div>
      <div span="4" offset="1" class="btn">
        <button @click="canel">删除订单</button>
      </div>
      <div span="4" offset="1" class="btn" v-if="formdata.orderStatus =='1'">
        <button @click="pay">去支付</button>
      </div>
    </van-cell-group>
    <div style="clear: both;"></div>
    <!-- <van-goods-action>
        <van-goods-action-mini-btn text="合计¥499" />
        <van-goods-action-big-btn text="查看订单" @click="redirects('Orderdetail')"  />
        <van-goods-action-big-btn text="去支付" primary />
    </van-goods-action>-->
  </div>
</template>

<script>
import { delOrder, getOrderDetail, severs, imgsevers } from "../api/login";
import { Toast } from "vant";
export default {
  data() {
    return {
      radio3: "1",
      severs: severs(),
      imgsevers: imgsevers(),
      iswx: localStorage.getItem("iswx"),
      orderNo: "",
      formdata: {
        couponAmount: 0
      }
    };
  },
  mounted() {
    this.orderNo = this.$route.query.orderNo;
    this.inits();
  },
  filters: {
    filtercouponAmount(e) {
      var text;
      if (e == "") {
        text = "0";
      } else {
        text = e;
      }
      return text;
    },
    filterwhet(e) {
      var text;
      if (e == "1") {
        text = "微信";
      } else if (e == "2") {
        text = "支付宝";
      } else {
        text = "无支付";
      }
      return text;
    },
    filterwhet2(e) {
      var text;
      if (e == "1") {
        text = "个人发票";
      } else if (e == "2") {
        text = "单位发票";
      }
      return text;
    },
    typeText(e) {
      var text;
      switch (e) {
        case "1":
          text = "订单未支付";
          break;
        case "2":
          text = "订单待收货";
          break;
        case "3":
          text = "订单已完成";
          break;
        case "4":
          text = "订单已取消";
          break;
        default:
          break;
      }
      return text;
    }
  },
  methods: {
    inits() {
      let para = {
        orderNo: this.orderNo,
        token: JSON.parse(localStorage.getItem("token"))
      };
      getOrderDetail(para).then(res => {
        if (res) {
          this.formdata = res;
        }
      });
    },
    redirects(url) {
      this.$router.push(url);
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    continueApply(e) {
      this.$router.push({ path: "/AFAS", query: { id: e.id } });
    },
    Evaluation(i) {
      this.$router.push({
        path: "/EvaluationList",
        query: { orderNo: this.formdata.orderNo }
      });
    },
    pay(i) {
       if (this.iswx) {
        this.$router.push({
          path: "/orderpaySuccess",
          query: { orderNo: this.formdata.orderNo }
        });
      } else {
        let parmas = {
          indexBack: false,
          orderNo: this.formdata.orderNo,
          token: JSON.parse(localStorage.getItem("token"))
        };
        if (this.$CheckIsIOS) {
          share(parmas);
        }

        if (this.$CheckIsAndroid) {
          window.control.jsonData(JSON.stringify(parmas))
        }
      }
    },
    canel() {
      let para = {
        token: JSON.parse(localStorage.getItem("token")),
        orderNo: this.formdata.orderNo
      };
      Toast.loading({
        duration: 0,
        mask: true,
        forbidClick: false,
        message: "提交中..."
      });
      delOrder(para).then(res => {
        Toast.clear();
        Toast("删除成功");
        this.onClickLeft();
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
<style scoped>
#apps >>> .van-nav-bar__text {
  color: red;
}
.init-10 {
  background-color: #f2f2f2;
  width: 100%;
  height: 20px;
  position: relative;
  float: left;
}
.van-cell {
  text-align: left;
}
#apps >>> .init-table .van-cell__value--alone {
  text-align: right;
}
.custom-text {
  color: rgba(107, 107, 107, 1);
  font-family: PingFangSC-Medium;
  padding-right: 10px;
}
.payContent {
  text-align: center;
}
.payContent img {
  max-width: 100px;
}
.payContent p {
  margin-bottom: 10px;
  font-size: 13px;
}
.remark p {
  text-align: left;
  padding-left: 5%;
  padding-right: 5%;
  color: rgba(107, 107, 107, 1);
  font-family: PingFangSC-Medium;
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.payBack button {
  border: 1px solid #b39061;
  color: rgba(179, 144, 97, 1);
  height: 42px;
  font-family: PingFangSC-Medium;
  margin-bottom: 20px;
  padding: 0 30px;
  margin-left: 10px;
  margin-right: 10px;
}
p {
  font-family: PingFangSC-Medium;
  color: rgba(107, 107, 107, 1);
  padding: 0;
  margin: 0;
}
#apps >>> .van-button--square {
  border-radius: 24px 24px 24px 24px;
}
#apps >>> .van-button--large {
  height: 37px;
  line-height: 37px;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
}
#apps >>> .van-icon-alipay::before {
  color: #108ee9;
}
#apps >>> .van-icon-wechat::before {
  color: #00c801;
}
#apps .van-button--warning {
  background-color: #b39061;
  border: 1px solid #b39061;
}
#apps .van-goods-action-mini-btn {
  width: 38%;
  color: rgba(207, 57, 57, 1);
  font-size: 16px;
  height: 65px;
}
#apps .van-goods-action {
  background-color: #fff;
}
#apps >>> .imgList img {
  width: 100%;
}

#apps >>> .init-soller-list2 {
  padding-bottom: 0px;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
#apps >>> .van-col--offset-2 span {
  font-size: 13px;
  display: inline-block;
  padding-bottom: 5px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
#apps .btn {
  float: right;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 10px;
  padding-bottom: 10px;
}
#apps .btn button {
  font-weight: 500;
  color: rgba(179, 144, 97, 1);
  background-color: transparent;
  border: 1px solid #b39061;
  line-height: 31px;
  border-radius: 3px;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
}
#apps >>> .van-button--small {
  border: 1px solid #979797;
  color: #6b6b6b;
  height: 25px;
  line-height: 25px;
}
#apps >>> .van-nav-bar .van-icon {
  color: #2c3e50;
}
#apps >>> #initsbox.van-cell:not(:last-child)::after {
  border-bottom: none;
}
#apps >>> #initsbox2.van-cell:not(:last-child)::after {
  border-bottom: none;
}
</style>

