<template>
  <!--  组件 -->
  <div id="apps">
    <van-nav-bar class="init-header" left-arrow title="请选择支付方式" @click-left="onClickLeft"/>

    <van-row>
      <van-col span="24" offset="0" class="payContent">
        <van-icon
          name="passed"
          size="60px"
          color="#2BA6B0"
          style="padding-top:20px;padding-bottom:10px"
        />

        <!-- <img src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" alt=""> -->
        <p style="font-size: 22px;">订单提交成功</p>
        <p style="margin-bottom:30px">超时订单将关闭</p>
      </van-col>

      <div class="init-10"></div>
      <van-cell>
        <template slot="title">
          <span class="custom-text">订单金额</span>
          <span class="custom-text">{{formdata.orderAmount}}</span>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span class="custom-text">订单编号</span>
          <span class="custom-text">{{formdata.orderNo}}</span>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span class="custom-text">收货地址</span>
          <span class="custom-text">{{formdata.consigneeName}}（{{formdata.consigneePhone}}）</span>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span class="custom-text">发票类型</span>
          <span class="custom-text">{{formdata.invoiceType | filterwhet2}}</span>
        </template>
      </van-cell>
    </van-row>
    <div class="init-10"></div>
    <van-radio-group v-model="formdata.payMethod" style="padding-bottom:80px">
      <van-cell-group>
        <van-cell title="微信" icon="wechat" clickable @click="radio3 = '1'">
          <van-radio name="1"/>
        </van-cell>
        <van-cell  title="支付宝" icon="alipay" clickable @click="radio3 = '2'">
          <van-radio name="2"/>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-goods-action>
      <van-goods-action-mini-btn :text="'合计¥'+formdata.orderAmount.toFixed(2)"/>
      <!-- <van-goods-action-big-btn text="查看订单" @click="redirects('Orderdetail')"  /> -->
      <van-goods-action-big-btn @click="pay" text="去支付" primary/>
    </van-goods-action>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
import { severs,payMent,getOrderDetail } from "../../src/api/login";

export default {
   inject: ['reload'],
  data() {
    return {
      radio3: "1",
      formdata: "",
      severs:severs(),
      opednId: "",
      orderNo:'',
      datas: "",
      show:true
    };
  },
  mounted() {
    this.reload()
    this.orderNo =  this.$route.query.orderNo;
    this.inits()
    // console.log(JSON.parse(localStorage.getItem('opednId')))
    this.opednId = JSON.parse(localStorage.getItem('opednId'))
      var ua = window.navigator.userAgent.toLowerCase(); 
    if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
          this.show = false
        } else { 
          this.show = true
        } 
  },
  filters:{
    filterwhet(e){
      var text;
      if (e=='1') {
        text ='微信'
      }else if(e=='2'){
        text = '支付宝'
      }else{
        text = '无支付'
      }
    return text
    },
    filterwhet2(e){
      var text;
      if (e=='1') {
        text = '个人发票'
      }else if(e=='2'){
        text = '单位发票'
      }
      return text
    }
  },
  methods: {
   inits(){
      let para = {
        orderNo:this.orderNo,
        token:JSON.parse(localStorage.getItem('token'))
      }
      getOrderDetail(para).then(res =>{
       if (res) {
          //  console.log(res)
         this.formdata = res
          localStorage.setItem('placeOrders', JSON.stringify(res))
        }
      })
    },
    pay() {
        let vm = this
      let para = {
        token: JSON.parse(localStorage.getItem("token")),
        orderNo: this.formdata.orderNo,
        payMethod: this.radio3,
        opednId: this.opednId
      };
      if (this.radio3 == '1') {
        
      
      payMent(para).then(res => {
        if (res) {
        this.datas = JSON.stringify(res);
          var params = JSON.parse(this.datas);
            function onBridgeReady() {
              console.log(WeixinJSBridge)
              WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                  appId: params.appId,
                  timeStamp: params.timeStamp,
                  nonceStr: params.nonceStr,
                  package: params.package,
                  signType: params.signType,
                  paySign: params.paySign
                },
                function(res) {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    Toast("支付成功");
                    vm.$router.push({ path: '/paySuccessDetil', query: { orderNo: vm.formdata.orderNo,orderAmount:vm.formdata.orderAmount }});
                  } else {
                    Toast("取消支付");
                  }
                }
              );
            }

            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener(
                  "WeixinJSBridgeReady",
                  onBridgeReady,
                  false
                );
              } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
                document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
              }
            } else {
              onBridgeReady();
            }
    
      }
      });
      }else{
        const url = this.severs + '/customer/payMent'
        this.httpPost(url, para);
      }
    },
      httpPost(URL, PARAMS) {
        var temp = document.createElement("form");
        temp.action = URL;
        temp.method = "post";
        temp.style.display = "none";
        for (var x in PARAMS) {
            var opt = document.createElement("textarea");
            opt.name = x;
            opt.value = PARAMS[x];
            temp.appendChild(opt);
        }

    document.body.appendChild(temp);
    temp.submit();

    return temp;
    },
    redirects(url) {
      this.$router.push(url);
    },
    onClickLeft() {
      this.$router.back(-1);
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
  margin-left: 65px;
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

#apps >>> .van-radio .van-icon-checked {
  color: #cf3939;
}
#apps >>> .van-nav-bar .van-icon {
  color: #2c3e50;
}
#apps >>> .van-goods-action-mini-btn::after{
  border-width:0
}
#apps >>> .van-goods-action{
  border-top: 1px solid #eee
}
</style>

