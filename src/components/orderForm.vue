<!--  -->
<template>
  <div id="app">
      <van-nav-bar title="我的订单" @click-left="onClickLeft" left-arrow>
</van-nav-bar>
<van-tabs v-model="active" @change="changeTab">
  <van-tab v-for="index in Tabtext" :key="index+1" :title="' ' + index" >
  <div  v-for="i in fromData"> 
  <div v-if="i.displayType=='0'">
   <div class="init-list">
  <van-cell-group>
  <van-cell :title="i.time" :value="typeText(i.status)"/>
  </van-cell-group>
  <div class="init-soller-list2" @click="orderDeil(i)">
  <van-col span='5' offset="2" class="imgList">
      <img  :src="'http://'+'106.15.44.76/image/'+i.avatar[0]" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList"  style="margin-top:14px">
      <span>{{i.productName}}</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList" style="margin-top:14px">
      <span>¥{{i.productPrice}}</span>
      <span style="font-size: 11px;">X{{i.num}}</span>
  </van-col>
  </div>
   </div>
  </div>
  <div v-else>
   <div class="init-list">
  <van-cell-group>
  <van-cell :title="i.time" :value="typeText(i.status)" />
  </van-cell-group>
  <div class="init-soller-list"   @click="orderDeil(i)">
  <van-col span='5' offset="1" class="imgList" v-for="adx in i.avatar">
    <img  :src="'http://'+'106.15.44.76/image/'+i.avatar[0]" name="adapter" />
  </van-col>
  </div>
   </div>
     </div>
    <h5 style="text-align: right;padding-right: 25px;margin-top: 0;">共 {{i.num}} 件商品,总金额<span style="color:rgba(50,50,50,1)">¥{{i.num*i.productPrice}}</span></h5>
   <!--全部订单-->
  <van-cell-group id="init-border" v-if="active==0">
  <!-- <div span='4' offset="1" class="btn">
      <button @click="Evaluation()">评价晒单</button>
  </div> -->
  <div span='4' offset="1" class="btn" v-if="i.afterSale">
     <button @click="orderDeil(i)">申请售后</button>
  </div>
  <div span='4' offset="1" class="btn">
      <button @click="del(i)">删除订单</button>
  </div>
  </van-cell-group>
<!--待付款--> 
   <van-cell-group id="init-border" v-if="active==1">
 <div span='4' offset="1" class="btn">
  <button @click="pay(i)">去支付</button>
  </div>
  <div span='4' offset="1" class="btn">
  <button @click="canel(i)">取消订单</button>
</div>
  </van-cell-group>

 <!--待收货-->
 <van-cell-group id="init-border" v-if="active==2">
  <div span='4' offset="1" class="btn">
      <button @click="confirm(i)">确认收货</button>
  </div>
  <!-- <div span='4' offset="1" class="btn">
      <button @click="logistics()">查看物流</button>
  </div> -->
  </van-cell-group>

   <!--已收货-->
 <van-cell-group id="init-border" v-if="active==3">
  <div span='4' offset="1" class="btn">
      <button @click="del(i)">删除订单</button>
  </div>
  <div span='4' offset="1" class="btn" v-if="i.afterSale">
      <button @click="orderDeil(i)">申请售后</button>
  </div>
  <!-- <div span='4' offset="1" class="btn">
      <button @click="redirects('/evaluation')">评价晒单</button>
  </div> -->
  </van-cell-group>

<!--已取消-->
 <van-cell-group id="init-border" v-if="active==4">
  <div span='4' offset="1" class="btn">
      <button @click="del(i)">删除订单</button>
  </div>
  <!-- <div span='4' offset="1" class="btn">
      <button @click="buy(i)">再次购买</button>
  </div> -->
  </van-cell-group>
  <div class="init-clear"></div>
  <div class="init-border-20"></div>
  </div>
  <div>
  <h5 v-if="fromData.length<=0" style="color:#8C8C8C;text-align: center;padding-top: 200px;">目前还没有订单哦～</h5>
</div>
  <h5 v-if="fromData.length>0 && shows && fromData.length>=(page+1)*5" @click="more" class="more"><van-icon name="add-o" /><i class="text">点击加载更多</i></h5>
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
import {listOrder,delOrder,updateOrderStatus} from '../api/login'
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      active: 0,
      page:0,
      shows:true,
      fromData:[],
      Tabtext: ["全部订单", "待付款", "待收货", "已收货", "已取消"]
    };
  },
  created() {
    this.active = this.$route.query.activeId;
  },
  mounted(){
     this.initData()
  },
  methods: {
    initData(){
      let para = {
        token:JSON.parse(localStorage.getItem('token')),
        currentPage:this.page,
        pageSize:5,
        orderStatus:this.active == 0 ? '':this.active
      }
      listOrder(para).then(res=>{
        this.fromData = res ? res:'';
      })
    },
    changeTab(e){
       this.page = 0
       this.shows =true
       this.initData()
    },
    Evaluation(){
      Toast('暂无')
    },
    more(){
      ++this.page
     let para = {
        token:JSON.parse(localStorage.getItem('token')),
        currentPage:this.page,
        pageSize:5,
        orderStatus:this.active == 0 ? '':this.active
      }
      listOrder(para).then(res=>{
        if (res.length>0) {
          for (var i in res) {
          this.fromData.push(res[i])
          }
        }else{
          this.shows =false
        }

      })
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    typeText(e){
      var text;
       switch(e){
            case '1' :
              text = "未支付"      
            break;
            case '2' :
              text = "待收货"      
             break;
            case '3' :
              text = "已收货"      
            break;
            case '4' :
              text = "已取消"      
            break;
            default:
            break; 
       }
       return text
    },
    redirects(url) {
      this.$router.push(url);
    },
    buy(i){
      // console.log(i)
      // localStorage.setItem('detial_s', JSON.stringify(i.avatar[0]))
      // this.$router.push('/goods/'+img.id +'/buy');
    },
    del(i){
      let para = {
        token:JSON.parse(localStorage.getItem('token')),
        orderNo:i.orderNo
      }
      delOrder(para).then(res=>{
           Toast('删除成功')
           this.initData()
      })
    },
    orderDeil(i){
      if (this.active!==1) {
        this.$router.push({ path: '/aftersalesServer', query: { orderNo: i.orderNo }});
      }
    },
    pay(i) {
      this.$router.push({ path: '/orderpaySuccess', query: { orderNo: i.orderNo }});
    },
    canel(i) {
      let para = {
        token:JSON.parse(localStorage.getItem('token')),
        orderNo:i.orderNo,
        orderStatus:4
      }
      updateOrderStatus(para).then(res=>{
           Toast('取消订单')
           this.initData()
      })
    },
    confirm(i) {
       let para = {
        token:JSON.parse(localStorage.getItem('token')),
        orderNo:i.orderNo,
        orderStatus:3
      }
   
      updateOrderStatus(para).then(res=>{
           Toast('订单已完成')
           this.initData()
      })
     
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      Toast(item.name);
    },
    logistics() {
      this.show = true;
    }
  }
};
</script>
<style scoped>
#app >>> .van-tab--active {
  color: #b5915c;
}
#app >>> .van-tabs__line {
  background-color: #b5915c;
}
#app >>> .van-cell__title,
.van-cell__value {
  text-align: left;
}
#app >>> .imgList img {
  width: 100%;
}
#app >>> .more{
  text-align: center;
  line-height: 30px;
  position: relative;
}

#app >>> .more .van-icon.van-icon-add-o{
  font-size: 15px;
  margin-right: 2px;
  /* margin-top: 0px; */
  /* line-height: 28px; */
  position: absolute;
  top: 6px;
  padding-right: 24px;
}
#app >>> .more .text{
  font-style: unset;
  padding-left: 21px;
}
#app >>> .init-soller-list {
  /*display: flex;*/
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  /*解决ios上滑动不流畅*/
  -webkit-overflow-scrolling: touch;
  /*利用padding将滚动条挤出：纵向超出部分将会隐藏，即滚动条部分被挤出可视区域*/
}
#app >>> .init-soller-list2 {
  padding-bottom: 5px;
  /* justify-content: center; */
  /* align-items: center; */
  display: -webkit-flex;
}
#app >>> .van-col--offset-1 {
  display: inline-table;
  vertical-align: top;
  float: inherit;
}
/*掩藏滚动条*/
::-webkit-scrollbar {
  display: none !important;
}
#app .btn {
  float: right;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 10px;
  padding-bottom: 10px;
}
#app .btn button {
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
#app >>> .van-col--4 {
  text-align: right;
  padding-right: 11px;
  line-height: 28px;
}
#app >>> .van-hairline--top-bottom::after {
  border-color: #d8d8d8;
}
#app >>> .init-border ::before {
  border-bottom: 1px solid #d8d8d8;
}
#app >>> #init-border::after {
  transform: scale(0.3);
}
#app >>> .init-clear {
  clear: both;
}
#app >>> .init-border-20 {
  background: rgba(242, 242, 242, 1);
  height: 20px;
  position: relative;
  width: 100%;
}
#app >>> .van-nav-bar .van-icon{
    color: #2c3e50
}
</style>