<!--  -->
<template>
  <div id="app">
      <van-nav-bar title="我的订单" @click-left="onClickLeft" left-arrow>
</van-nav-bar>
<van-tabs v-model="active">
  <van-tab v-for="index in Tabtext" :key="index+1" :title="' ' + index" >
    <!--全部订单-->
  <div v-if="index=='全部订单'">
  <div class="init-list">
  <van-cell-group>
  <van-cell title="2018-11-03 12:56" value="已完成" />
  </van-cell-group>
  <div class="init-soller-list">
  <van-col span='5' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
  <van-col span='5' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>  
  <van-col span='5' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
  <van-col span='5' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
   <van-col span='5' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
  </div>
<h5 style="text-align: right;color:rgba(153,153,153,1);padding-right: 25px;font-size: 12px;margin-top: 0;">共五件商品<span style="color:rgba(50,50,50,1);padding-left: 15px;font-size: 13px">¥1999</span></h5>
  <van-cell-group id="init-border" style="">
  <div span='4' offset="1" class="btn">
      <button @click="redirects('evaluation')">评价晒单</button>
  </div>
  <div span='4' offset="1" class="btn">
      <button @click="redirects('aftersalesServer')">申请售后</button>
  </div>
  <div span='4' offset="1" class="btn">
      <button  @click="delOrder()">删除订单</button>
  </div>
  </van-cell-group>
  <div class="init-clear"></div>
  </div>
  <div class="init-border-20"></div>
   <div class="init-list">
  <van-cell-group>
  <van-cell title="2018-11-03 12:56" value="已完成" />
  </van-cell-group>
  <div class="init-soller-list2">
  <van-col span='5' offset="2" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList"  style="margin-top:14px">
      <span>翼贝贝儿童手表T8S</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList" style="margin-top:14px">
      <span>¥499</span>
      <span style="font-size: 11px;">X1</span>
  </van-col>
  </div>
    <h5 style="text-align: right;padding-right: 25px;margin-top: 0;">共1件商品,总金额<span style="color:rgba(50,50,50,1)">¥1999</span></h5>
  <van-cell-group id="init-border" style="">
  <div span='4' offset="1" class="btn">
      <button>评价晒单</button>
  </div>
  <div span='4' offset="1" class="btn">
     <button @click="redirects('aftersales')">申请售后</button>
  </div>
  <div span='4' offset="1" class="btn">
      <button>删除订单</button>
  </div>
  </van-cell-group>
  
  <div class="init-clear"></div>
  
  </div>
  <div class="init-border-20"></div>
  </div>
  <!--全部订单结束-->
  <!--待付款-->
  <div v-if="index=='待付款'">
        <div class="init-list">
            <van-cell-group>
            <van-cell title="2018-11-03 12:56" value="待付款" />
            </van-cell-group>
            <div class="init-soller-list">
            <van-col span='5' offset="1" class="imgList">
                <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
            </van-col>
            <van-col span='5' offset="1" class="imgList">
                <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
            </van-col>  
            <van-col span='5' offset="1" class="imgList">
                <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
            </van-col>
            <van-col span='5' offset="1" class="imgList">
                <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
            </van-col>
            <van-col span='5' offset="1" class="imgList">
                <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
            </van-col>
            </div>
            <h5 style="text-align: right;color:rgba(153,153,153,1);padding-right: 25px;font-size: 12px;margin-top: 0;">共五件商品<span style="color:rgba(50,50,50,1);padding-left: 15px;font-size: 13px">¥1999</span></h5>
            <van-cell-group id="init-border" style="">
            
             <div span='4' offset="1" class="btn">
                <button @click="pay()">去支付</button>
            </div>
            <div span='4' offset="1" class="btn">
                <button @click="canel()">取消订单</button>
            </div>
            </van-cell-group>
            
            <div class="init-clear"></div>
        </div>
         <div class="init-border-20"></div>
         <div class="init-list">
  <van-cell-group>
  <van-cell title="2018-11-03 12:56" value="待付款" />
  </van-cell-group>
  <div class="init-soller-list2">
  <van-col span='5' offset="2" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList"  style="margin-top:14px">
      <span>翼贝贝儿童手表T8S</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList" style="margin-top:14px">
      <span>¥499</span>
      <span style="font-size: 11px;">X1</span>
  </van-col>
  </div>
    <h5 style="text-align: right;padding-right: 25px;margin-top: 0;">共1件商品,总金额<span style="color:rgba(50,50,50,1)">¥1999</span></h5>
  <van-cell-group id="init-border" style="">
 
  <div span='4' offset="1" class="btn">
      <button @click="pay()">去支付</button>
  </div>
  <div span='4' offset="1" class="btn">
      <button @click="canel()">取消订单</button>
  </div>
  </van-cell-group>
  
  <div class="init-clear"></div>
  
  </div>
  </div>
  <!--待付款完成-->
  <!--待收货-->
   <div v-if="index=='待收货'">
    <div class="init-list">
        <van-cell-group>
        <van-cell title="2018-11-03 12:56" value="待收货" />
        </van-cell-group>
        <div class="init-soller-list">
  <van-col span='5' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
  <van-col span='5' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>  
  <van-col span='5' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
  <van-col span='5' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
   <van-col span='5' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
  </div>
  <h5 style="text-align: right;color:rgba(153,153,153,1);padding-right: 25px;font-size: 12px;margin-top: 0;">共五件商品<span style="color:rgba(50,50,50,1);padding-left: 15px;font-size: 13px">¥1999</span></h5>
<van-cell-group id="init-border" style="">
 
  <div span='4' offset="1" class="btn">
      <button @click="confirm()">确认收货</button>
  </div>
  <div span='4' offset="1" class="btn">
      <button @click="logistics()">查看物流</button>
  </div>
  </van-cell-group>
   <div class="init-clear"></div>
   <div class="init-border-20"></div>
   <div class="init-list">
  <van-cell-group>
  <van-cell title="2018-11-03 12:56" value="待付款" />
  </van-cell-group>
  <div class="init-soller-list2">
  <van-col span='5' offset="2" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList"  style="margin-top:14px">
      <span>翼贝贝儿童手表T8S</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList" style="margin-top:14px">
      <span>¥499</span>
      <span style="font-size: 11px;">X1</span>
  </van-col>
  </div>
    <h5 style="text-align: right;padding-right: 25px;margin-top: 0;">共1件商品,总金额<span style="color:rgba(50,50,50,1)">¥1999</span></h5>
  <van-cell-group id="init-border" style="">
 
  <div span='4' offset="1" class="btn">
      <button>确认收货</button>
  </div>
  <div span='4' offset="1" class="btn">
      <button>查看物流</button>
  </div>
  </van-cell-group>
  
  <div class="init-clear"></div>
   </div>
    </div>
   </div>
  <!--待收货完成-->
<!--已收货-->
  <div v-if="index=='已收货'">
       <div class="init-list">
  <van-cell-group>
  <van-cell title="2018-11-03 12:56" value="已收货" />
  </van-cell-group>
  <div class="init-soller-list2">
  <van-col span='5' offset="2" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList"  style="margin-top:14px">
      <span>翼贝贝儿童手表T8S</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList" style="margin-top:14px">
      <span>¥499</span>
      <span style="font-size: 11px;">X1</span>
  </van-col>
  </div>
    <h5 style="text-align: right;padding-right: 25px;margin-top: 0;">共1件商品,总金额<span style="color:rgba(50,50,50,1)">¥1999</span></h5>
  <van-cell-group id="init-border" style="">
 
  <div span='4' offset="1" class="btn">
      <button>删除订单</button>
  </div>
  <div span='4' offset="1" class="btn">
      <button @click="redirects('aftersales')">申请售后</button>
  </div>
  <div span='4' offset="1" class="btn">
      <button @click="redirects('/evaluation')">评价晒单</button>
  </div>
  </van-cell-group>
  
  <div class="init-clear"></div>
   </div>
  </div>   
<!--已收货完成-->
<!--已取消-->
<div v-if="index=='已取消'">
     <div class="init-list">
  <van-cell-group>
  <van-cell title="2018-11-03 12:56" value="已取消" />
  </van-cell-group>
  <div class="init-soller-list2">
  <van-col span='5' offset="2" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList"  style="margin-top:14px">
      <span>翼贝贝儿童手表T8S</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList" style="margin-top:14px">
      <span>¥499</span>
      <span style="font-size: 11px;">X1</span>
  </van-col>
  </div>
    <h5 style="text-align: right;padding-right: 25px;margin-top: 0;">共1件商品,总金额<span style="color:rgba(50,50,50,1)">¥1999</span></h5>
  <van-cell-group id="init-border" style="">
 
  <div span='4' offset="1" class="btn">
      <button>删除订单</button>
  </div>
  <div span='4' offset="1" class="btn">
      <button>再次购买</button>
  </div>
  </van-cell-group>
  
  <div class="init-clear"></div>
   </div>
  </div>
<!--已取消完成-->


<!--查看物流-->
<van-actionsheet
  v-model="show"
  @select="onSelect"
>
  <van-steps direction="vertical" :active="0" active-color="#f44">
  <van-step>
    <h3>【城市】物流状态1</h3>
    <p>2016-07-12 12:40</p>
  </van-step>
  <van-step>
    <h3>【城市】物流状态2</h3>
    <p>2016-07-11 10:00</p>
  </van-step>
  <van-step>
    <h3>快件已发货</h3>
    <p>2016-07-10 09:30</p>
  </van-step>
</van-steps>
</van-actionsheet>
<!--查看物流结束-->
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
        show: false,
        active:0,
        Tabtext:["全部订单","待付款","待收货","已收货","已取消"]
    };
  },
created(){
 this.active = this.$route.query.activeId
},
//   mounted: {
    
//   },

  methods: {
      onClickLeft(){
        this.$router.back(-1);
    },
    redirects(url) {
      this.$router.push(url);
    },
    delOrder(){
        alert('删除订单')
    },
    pay(){
        alert('去支付')
    },
    canel(){
        alert('取消订单')
    },
    confirm(){
      alert('确认收货')  
    },
     onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      Toast(item.name);
    },
    logistics(){
       this.show = true; 
    }

  }
}

</script>
<style scoped>
#app >>> .van-tab--active{
    color: #B5915C
}
#app >>> .van-tabs__line{
    background-color: #B5915C;
}
#app >>> .van-cell__title, .van-cell__value{
  text-align: left
}
#app >>> .imgList img{
  width: 100%
}
#app >>> .init-soller-list{
   /*display: flex;*/
    overflow-y:hidden;
    overflow-x:auto;
    white-space: nowrap;
    /*解决ios上滑动不流畅*/
        -webkit-overflow-scrolling: touch;
    /*利用padding将滚动条挤出：纵向超出部分将会隐藏，即滚动条部分被挤出可视区域*/
          
}
#app >>> .init-soller-list2{
  padding-bottom: 5px;
     /* justify-content: center; */
  /* align-items: center; */
  display: -webkit-flex;

}
#app >>> .van-col--offset-1{
  display: inline-table;
  vertical-align: top;
  float: inherit;
}
  /*掩藏滚动条*/
::-webkit-scrollbar {
    display: none!important;
}
#app .btn{
    float: right;
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 10px;
    padding-bottom: 10px;
}
#app .btn button{
  font-weight:500;
  color:rgba(179,144,97,1);
  background-color: transparent;
  border: 1px solid #B39061;
  line-height: 31px;
  border-radius: 3px;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
}
#app >>> .van-col--4{
  text-align: right;
  padding-right: 11px;
  line-height: 28px;
}
#app >>> .van-hairline--top-bottom::after{
  border-color:#D8D8D8;
}
#app >>> .init-border ::before{
  border-bottom: 1px solid #d8d8d8
}
#app >>> #init-border::after{
  transform: scale(.3);
}
#app >>> .init-clear{
  clear: both;
}
#app >>> .van-tab__pane{
}
#app >>> .init-border-20{
  background:rgba(242,242,242,1);
  height: 20px;
  position: relative;
  width: 100%
}

</style>