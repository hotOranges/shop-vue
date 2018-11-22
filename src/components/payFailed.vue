<template>
   <!--  组件 -->
  <div id="apps">
        <van-nav-bar
  class="init-header"
  left-arrow
  title="支付失败"
/>

<van-row>
     <van-col span='24' offset="0" class="payContent">
      <van-icon name="close"  size="60px" color="#CF3939" style="padding-top:20px;padding-bottom:10px"/>
      
     <!-- <img src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" alt=""> -->
 <p style="font-size: 22px;">支付失败</p>
 <p style="margin-bottom:30px">超时订单将关闭</p>
 </van-col>
  
    <div class="init-10"></div>
<van-cell>
  <template slot="title">
   <span class="custom-text">订单金额</span>
   <span class="custom-text">499.00</span>
  </template>
</van-cell>
<van-cell>
  <template slot="title">
   <span class="custom-text">订单编号</span>
   <span class="custom-text">2132184732</span>
  </template>
</van-cell>
<van-cell>
  <template slot="title">
   <span class="custom-text">收货地址</span>
   <span class="custom-text">喵酱家（188****8888）</span>
  </template>
</van-cell>
<van-cell>
  <template slot="title">
   <span class="custom-text">发票类型</span>
   <span class="custom-text">个人电子发票</span>
  </template>
</van-cell>
</van-row>
 <div class="init-10"></div>
 <van-radio-group v-model="radio3">
        <van-cell-group>
          <van-cell title="支付宝" icon="alipay" clickable @click="radio3 = '1'">
            <van-radio name="1" />
          </van-cell>
          <van-cell title="微信" icon="wechat" clickable @click="radio3 = '2'">
            <van-radio name="2" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
<van-goods-action>
        <van-goods-action-mini-btn text="合计¥499" />
        <van-goods-action-big-btn text="查看订单" @click="redirects('Orderdetail')"  />
        <van-goods-action-big-btn text="去支付" primary />
        
        
    </van-goods-action>   
  </div>

</template>

<script>
export default {
  data() {
    return {
      radio3: "1"
    };
  },
  methods: {
    redirects(url) {
      this.$router.push(url);
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
</style>

