<template>
  <div id="app">
              <!--导航 -->
      <van-col span='24' class="title">
         <div class="back">
           <van-icon name="arrow-left" color="#fff" size='25' @click.prevent="search_shows"/>
         </div>
          <!-- <span><van-icon name="arrow-left" color="#fff" size='25' @click.prevent="search_shows"/></span> -->
     </van-col>
         
       <van-row class="col-2">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="image in images"  class="preImg" >
            <img :src="'http://'+image.url + image.avatar"  @click="ImagePreviews()" />
          </van-swipe-item>
        </van-swipe>
       </van-row>
       
    <van-row class="col-3">
        <van-col span="24" class="lazy-bottom">
             <h4>￥{{form.specialPrice}} <span>￥{{form.originalPrice}}</span></h4> 
         </van-col>
     <van-col span="24" class="lazy-left">
           <span>{{form.productName}}</span>
     </van-col>
     <hr/>
     <van-col class="empty"></van-col>
      <van-cell-group  class="lists list2" >
      <van-cell value="七天无理由退换货（激活后不支持）" />
    </van-cell-group>
    <van-cell-group class="lists">
      <van-cell title="规格：" is-link value="请选择颜色 型号 数量" @click="orderShows"/>
    </van-cell-group>
    <div class="init-border-20"></div>
    <van-cell-group>
      <van-cell title="综合评分" />
      <van-cell class="pf">
         <span style="color:#FF4747;font-size: 24px;font-size: 32px;font-weight: 600;">{{avgScore}}</span>
        <van-rate :size="13" v-model="avgScore" disabled disabled-color="#FF4747"  void-color="#FF4747"/>
         <span>{{commentSize}}评论</span>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="pl" v-if="commentSize>0">
      <van-cell :title="'全部点评('+commentSize +')'" />
      <van-cell v-for="(item, index) in fromData" :key="index">
       <span class="imgss"><img class="initimg" src="http://106.15.44.76:60180/smartphone-web/static/img/img.739c4ef.jpg" alt=""><i>{{item.nickName}}</i></span>
       <span class="pls"><van-rate :size="13" v-model="item.score" disabled disabled-color="#B39061"  void-color="#B39061"/></span>
       <span class="text">{{item.comment}}</span>
      </van-cell>
      <!-- <van-cell>
       <span class="imgss"><img class="initimg" src="http://106.15.44.76:60180/smartphone-web/static/img/img.739c4ef.jpg" alt=""><i>Rainy</i></span>
       <span class="pls"><van-rate :size="13" v-model="value1" disabled disabled-color="#B39061"  void-color="#B39061"/></span>
       <span class="text">很不错，推荐大家使用</span>
       <span class="imglsit">
         <img src="http://106.15.44.76:60180/smartphone-web/static/img/img.739c4ef.jpg" alt="">
         <img src="http://106.15.44.76:60180/smartphone-web/static/img/img.739c4ef.jpg" alt="">
         <img src="http://106.15.44.76:60180/smartphone-web/static/img/img.739c4ef.jpg" alt="">
         <img src="http://106.15.44.76:60180/smartphone-web/static/img/img.739c4ef.jpg" alt="">
       </span>
      </van-cell> -->
    </van-cell-group>
    <div v-else style="color: rgb(140, 140, 140); text-align: center;padding-bottom: 20px;padding-top: 10px;">
      目前还没有评论哦～
    </div>
       <h5 v-if="fromData.length>0 && shows && fromData.length>=(page+1)*4" @click="more" class="more"><van-icon name="add-o" /><i class="text">点击加载更多</i></h5>
    </van-row>

    <!-- 优惠券单元格 -->
    <!-- <van-cell-group  class="lists list2" style="top:490px">
      <van-cell value="七天无理由退换货（激活后不支持）" />
    </van-cell-group>
    <van-cell-group class="lists" style="top:520px">
      <van-cell title="规格：" is-link value="请选择颜色 型号 数量" @click="orderShows"/>
    </van-cell-group> -->
    <order class="order" />


   <!-- 底部购买 -->
    <van-goods-action>
        <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
        <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn" :info="shop_info" />
        <van-goods-action-big-btn text="立即购买" @click="onClickBigBtn" primary />
        <van-goods-action-big-btn text="加入购物车" @click="onClickBigBtns" />
    </van-goods-action>    
     

  </div>
</template>

<script>
import { Rate } from 'vant';
import { mapState, mapActions, mapGetters } from "vuex";
import { ImagePreview } from "vant";
import { Toast } from "vant";
import { getProductDetail,listImage,getProductComment } from "../../src/api/login";
import Order from "./orderList";

//obj 优惠券
const coupon = {
  available: 1,
  discount: 0,
  denominations: 150,
  origin_condition: 0,
  reason: "",
  value: 150,
  name: "满498减100",
  start_at: 1489104000,
  end_at: 1514592000
};
export default {
  name: "buyInfo",
  data() {
    return {
      preImgs: [],
      listImages:'',
      chosenCoupon: -1,
      avgScore:5,
      commentSize:'',
      page:0,
      images: [
        'https://img.yzcdn.cn/1.jpg',
        'https://img.yzcdn.cn/2.jpg'
      ],
      shows:true,
      fromData:{},
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: null,
      oShow: false,
      form:{
        specialPrice:'',
        productName:'',
      }
    };
  },
  props: {},
  components: {
    Order
  },
  computed: {
    ...mapState({
      buyImg: state => state.home.buyInfo.img[0],
      actives: state => state.active.home.title,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      orderShow: state => state.home.orderShow
    }),
  },
  methods: {
    ...mapActions(["orderShows"]),
    search_shows() {  
      this.$router.back(-1);
    },
    more(){
     ++this.page
     let para = {
          productId:this.form.id,
          currentPage:this.page,
          pageSize:4
      }
      getProductComment(para).then(res=>{
        let data = res.commentList
       
        if (data.length>0) {
          for (var i in data) {
          this.fromData.push(data[i])
          }
        }else{
          this.shows =false
        }

      })
    },
    inits(){
       
       console.log(this.form)
        let para ={
         productId:this.form.id
       }
      listImage(para).then(res => {
          this.listImages = res[0];
          this.images= res
          for (var i in res) {
             var imgs= 'http://'+res[i].url + res[i].avatar;
              this.preImgs.push(imgs)
             
          }

          this.getProductComments()
        
      })
    },
    getProductComments(){
       let para ={
         productId:this.form.id,
         currentPage:this.page,
         pageSize:4
       }
      getProductComment(para).then(res => {
        this.commentSize = res.commentSize
        this.avgScore = res.avgScore
        this.fromData = res.commentList
      })
    },
    //商品预览
    ImagePreviews() {
      ImagePreview({
        images:this.preImgs,
        startPosition: 0,
        });
    },
    //优惠券
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    onClickMiniBtn() {
      this.$router.push('/shoppingCart')
    },
    onClickBigBtn() {
      Toast("请选择商品规格");
      this.orderShows();
    },
    onClickBigBtns() {
      Toast("请选择商品规格");
      this.orderShows();
    }
  },

  mounted(){
      this.form = JSON.parse(localStorage.getItem('detial_s'))
      this.inits()
       
  },
  created() {
    // console.log(this.buyImg);
    this.form = this.buyImg
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/buyInfo.less");
</style>

<style scoped>
.van-cell {
  text-align: left;
}
#app >>> .list2 .van-cell__value {
  color: #000;
}
#app >>> .van-goods-action{
  background-color: #fff;
}
#app >>> .van-cell__value {
  text-align: left;
  color: #b8b8b8;
}
#app >>> .pf .van-cell__value {
  text-align: center;
  color: #b8b8b8;
}
#app >>> .van-sku-header__img-wrap {
  margin-top: 1px;
}
#app >>> .van-button--square {
  border-radius: 24px 24px 24px 24px;
}
#app >>> .van-button--large {
  height: 40px;
  line-height: 40px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
#app .van-button--warning {
  background-color: #b39061;
  border: 1px solid #b39061;
}
#app >>> .init-border-20 {
  background: rgba(242, 242, 242, 1);
  height: 20px;
  position: relative;
  width: 100%;
}
#app .col-3{
  width: 100%;
  overflow: auto;
  overflow-x: hidden;
}
#app >>> .van-goods-action-mini-btn{
  border-width:0
}
#app >>> .pl .initimg{
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
#app >>> .pl .pls{
      float: right;
    margin-top: 5px;
}
#app >>> .pl .text{
    width: 86%;
    position: relative;
    display: inline-block;
    color: #424242;
    padding-left: 46px;
}
#app >>> .pl .imglsit img{
 float: left;
 width: 20%;
 height: auto;
 padding: 2%;
}
#app >>> .van-swipe__indicator{
  background-color: #fff;
  border:1px solid #AB8675
}
#app >>> .van-swipe__indicator--active{
  background:rgba(171,134,117,1);
}
#app >>> .imgss i{
  font-style: inherit;
  position: absolute;
  top: 10px;
  left: 48px;
  color: #424242
}
#app >>> .more{
  text-align: center;
  line-height: 30px;
  position: relative;
}
#app >>> .more .text{
  font-style: unset;
  padding-left: 21px;
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
</style>


