<template>
   <!--  组件 -->
  <div id="apps" style="text-align: center;">
        <van-nav-bar
  class="init-header"
  title="支付成功"
  right-text="完成"
   @click-right="goHome"
/>

<van-row>
     <van-col span='24' offset="0" class="payContent">
  <van-icon name="passed"  size="60px" color="#2BA6B0" style="padding-top:20px;padding-bottom:10px"/>   
 <!-- <p>支付方式：微信支付</p> -->
 <p style="margin-bottom:30px">订单金额：¥{{orderAmount}}</p>
 </van-col>
  <van-col span='24' offset="0" class="payBack">
      <van-button type="default" @click="gorder">查看订单</van-button>
      <van-button type="default" @click="goHome">返回商城</van-button>
  </van-col>
    <div class="init-10"></div>
    <van-col span='24' offset="0" class="remark">
        <p>安全提醒:</p>
        <p>爱伴随平台及销售商不会以订单异常、系统升级为由要求你点任何 网址链接进行退款操作，或者以各种理由索取你的隐私信息（如 个人身份信息、会员账户信息、银行卡帐号、密码及手机验证码 等）。</p>
    </van-col>
</van-row>
  </div>

</template>

<script>
export default {
  data() {
    return {
      orderNo:'',
      orderAmount:''
    };
  },
  mounted(){
     this.orderNo =  this.$route.query.orderNo;
     this.orderAmount  = this.$route.query.orderAmount;
  },
  methods: {
    gorder(){
      this.$router.push({ path: '/aftersalesServer', query: { orderNo: this.orderNo }});
    },
    goHome(){
      this.$router.push('/')
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
</style>

