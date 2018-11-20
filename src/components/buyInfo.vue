<template>
  <div id="app">
       <van-row class="col-2">
              <div class="preImg" @click="ImagePreviews()">
                 <img  v-lazy="buyImg" name="adapter" @click="ImagePreviews()"/>
              </div>  
                    <!--导航 -->
      <van-col span='24' class="title">
         <div class="back">
            <a href="javaScript:;" @click.prevent="search_shows">{{'<'}}</a>
         </div>
          <!-- <span>{{actives[2]}}</span> -->
     </van-col>
       </van-row>

    <van-row class="col-3">
        <van-col span="24" class="lazy-bottom">
             <h4>￥509 <span>￥899</span></h4> 
         </van-col>

     <van-col span="24" class="lazy-left">
           <span>耐克Nike AIR ZOOM PEGASUS 34 男款跑鞋</span>
     </van-col>
     <hr/>
     <van-col class="empty"></van-col>
    </van-row>

    <!-- 优惠券单元格 -->
    <van-cell-group  class="lists list2" style="top:490px">
      <van-cell value="七天无理由退换货（激活后不支持）" />
    </van-cell-group>
    <van-cell-group class="lists" style="top:520px">
      <van-cell title="规格：" is-link value="请选择颜色 型号 数量" @click="orderShows"/>
    </van-cell-group>
    <order class="order" />


   <!-- 底部购买 -->
    <van-goods-action>
        <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
        <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn" info="5" />
        <van-goods-action-big-btn text="立即购买" @click="onClickBigBtn" primary />
        <van-goods-action-big-btn text="加入购物车" @click="onClickBigBtns" />
        
    </van-goods-action>    
     

  </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';
import { ImagePreview } from 'vant';
import { Toast } from 'vant';

import Order from './orderList';

//obj 优惠券
const coupon = {
  available: 1,
  discount: 0,
  denominations: 150,
  origin_condition: 0,
  reason: '',
  value: 150,
  name: '满498减100',
  start_at: 1489104000,
  end_at: 1514592000
};

export default {
  name: 'buyInfo',
  data() {
    return {
      preImgs:[],
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList:null,
      oShow:false,
    }
  },
  props:{
   
  },
  components:{
      Order,
  },
  computed: {
    ...mapState({
      buyImg: state => state.home.buyInfo.img[0],
      actives: state => state.active.home.title,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      orderShow: state => state.home.orderShow,
    }),
    ...mapGetters(['bc_notshow']),
  },
  methods: {
      ...mapActions(['orderShows']),
     search_shows(){
         this.$router.back(-1);
     },
     //商品预览
    ImagePreviews() {
        ImagePreview(this.preImgs);
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
      Toast('系统繁忙 请稍后再试');
    },
    onClickBigBtn() {
      Toast('请选择商品规格');
      this.orderShows();
      console.log(this.orderShow)
    },
    onClickBigBtns() {
     this.orderShows();
      Toast('加入成功');
    },
  },
  watch: {

  },
  directives: {
   
  },
  beforeCreate() {
     this.axios.get('./static/data.json').then((res)=>{
         const buy_id = this.$route.params.id;
         console.log(buy_id); 
         //或许商品信息
          if( res.status == 200 ) {
              const data = res.data.goods;
              const preImg = data.id_0.moreImg;
              this.preImgs = preImg;


           } 
            },(err)=>{
            this.imageList = this.src;
            this.broadcast = "暂无消息~~QAQ~"
    })

  },
  created() {
     console.log(this.buyImg)
     if(this.buyImg == 'undefined') {
       this.buyImg = 'https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg';
     }
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/buyInfo.less');
</style>

<style scoped>
.van-cell{
  text-align: left
}
#app >>> .list2 .van-cell__value{
  color: #000
}
#app >>> .van-cell__value{
  text-align: left;
  color: #B8B8B8
}
#app >>> .van-sku-header__img-wrap{
  margin-top: 1px
}
#app >>> .van-button--square{
  border-radius: 24px 24px 24px 24px;
}
#app >>> .van-button--large{
  height: 40px;
  line-height: 40px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
#app .van-button--warning{
  background-color: #B39061;
  border: 1px solid #B39061;
}
</style>


