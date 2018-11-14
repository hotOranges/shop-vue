<template>
   <!-- 购物车组件 -->
  <div id="app">
     <!-- 搜索区 -->
     <van-row gutter="20" class="row-1">
     <van-nav-bar
  class="init-header"
  title="购物车"
  left-text=""
  :right-text="cantext"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
    </van-row>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="cartBox">
    <div v-for="(v,index) in shops" :key="index.id" class="shop-cart">
        <!-- 标签区域 -->
        <van-row class="shop-col">
            <van-col span="10" class="check" offset="1">
                <van-checkbox v-model="checked[index]">{{shops[index]}} &nbsp;></van-checkbox>
            </van-col>
        </van-row>
        <div  v-for="(i,index) in goodsTitle" :key="index.id" class="shopp_conent">
        <van-col span='2' offset="1" class="">
          <van-checkbox v-model="checked[index]"></van-checkbox>
        </van-col>
        <van-col span='6' offset="1" class="imgList">
      <img  :src="imageUrl[index][index]" name="adapter" />
    </van-col>
    <van-col span='15' offset="1" class="goodList">
      <span>{{i[index]}}</span>
      <span>￥{{prices[index][index]}}</span>
      <span style="text-align: right;padding-right: 10px;padding-top: 8px;"><van-stepper v-model="counts[index]"/></span>
    </van-col>
        </div>
    </div>
 </van-pull-refresh>   
<van-submit-bar
  :price="3050"
  button-text="去结算"
  @submit="onSubmit"
  v-if="canel==false">
  <van-checkbox v-model="checked">全选</van-checkbox>
</van-submit-bar>
<van-submit-bar
 
  button-text="删除"
  @submit="onSubmit2"
  v-else >
  <van-checkbox v-model="checked">全选</van-checkbox>
</van-submit-bar>
    </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';
import { Toast } from 'vant';

const coupon = {
  available: 1,
  discount: 0,
  denominations: 10000,
  origin_condition: 0,
  reason: '',
  value: 150,
  name: '满498减100',
  start_at: 1489104000,
  end_at: 1514592000
};

export default {
  name: 'shoppingCart',
  components:{
  },
  data() {
    return {
        tabarActive:2,
        value:null,
        active:0,
        path:'../../static/images/',
        imageList:[],
        disabled:false,
        count: 0,
        canel:false,
        cantext:'编辑',
        isLoading: false,
        checked: [false,false,false,false],
        chosenCoupon: -1,
        coupons: [coupon],
        disabledCoupons: [coupon],
        imageUrl:[],
        newcons:[],
        goodsTitle:[],
        goodsDescription:[],
        prices:[],
        shops:[],
    }
  },
  computed: {
    ...mapState({
      title: state => state.community.tab.title,
      icon: state => state.home.badge.icon,
      bageTitle: state => state.home.badge.title,
      actives: state => state.active.home.title,
      src : state => state.home.lunbo.src,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
    }),
    ...mapGetters(['bc_notshow','search_show']),
  },
  methods: {
    ...mapActions([
      'searchA','infoAction'
    ]),
    search() {
      this.$router.push('/search');
    },
    onClickLeft(){
       this.$router.back(-1);
    },
    onSubmit2(){

    },
    onSubmit(){

    },
    onClickRight(){
      this.canel = !this.canel;
      if (this.canel==true) {
        this.cantext = '完成'
      }else{
        this.cantext = '编辑'
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        for (let i = 0; i < 3; i++) {
            this.imageUrl.push(this.imageUrl[i]);
            this.goodsTitle.push(this.goodsTitle[i]);
            this.goodsDescription.push(this.goodsDescription[i]);
            this.shops.push(this.shops[i]);
            this.prices.push(this.prices[i]);
        }

        this.infoAction();
        const infos = document.querySelector('.van-icon__info');
        // infos.innerText = this.shop_info;

      }, 500);
    },
     //优惠券
     onChange(index) {
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
     redirects(url) {
      this.$router.push(url);
    },
  },
  watch: {

  },
  directives: {
    tab:{
      inserted(el) {
        //绑定tab样式
        const tabs = el.childNodes[0].childNodes[0].children[0];
        tabs.style.backgroundColor = '#d34ba8';
      }
    },
    //tabBar 消息通知指令
    infos:{
      inserted(el,obj) {
         console.log(obj.value);
         const info = el.childNodes[0].childNodes[1];
         info.innerText = obj.value;
      }
    }

  },
  beforeCreate() {
     this.axios.get('./static/data.json').then((res)=>{
          if( res.status == 200 ) {
              const data = res.data.goods;
              const preImg = data.id_0.imgList;
              const title = data.id_0.title;
              const price = data.id_0.limit_price;
              const count = data.id_0.count;
              const description = data.id_0.description; 
              const shops = data.id_0.shops;
              // console.log(JSON.stringify(data))
              this.imageUrl = preImg;
              this.goodsTitle = title;
              this.prices = price;
              this.goodsDescription = description;
              this.shops = shops;
              this.counts =  count;
              this.newcons.push({
                title:title,
                price:price,
                count:count,
                preImg:preImg
              })
              console.log(this.newcons)       
              
           } else {
             this.imageList = this.src;
           }
            },(err)=>{
            this.imageList = this.src;
    })

  },
  created() {  
      Toast('仅展示作用  ^_^')       
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/home.less');
</style>

<style scoped>
#app >>> .van-card{
      justify-content: center;
    align-items: center;
    display: -webkit-flex;
}
#app >>> .imgList img {
  width: 100%;
  height: 100%;
}
#app >>> .shopp_conent {
  height: 100%;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
#app >>> .van-submit-bar__text{
  /* text-align: left; */
  padding-right: 5px;
}
#app >>> .van-checkbox__icon .van-icon{
  border-color: #979797
}
#app >>> .van-col--offset-1{
  margin-left: 0
}
#app >>> .goodList span{
  display: inherit;
  text-align: left;
  padding-left: 25px;
}
#app .van-col--2{
  text-align: left
}
#app .van-checkbox{
  position: absolute;
  left: 20px;
}
#app .shop-cart{
  height: auto;
}
#app .van-submit-bar__bar .van-checkbox{
  position: relative;
  left: 5px
}
#app >>> .van-checkbox__icon--checked .van-icon{
  background-color: #CF3939;
  border-color: #CF3939
}
#app >>> .van-submit-bar .van-button{
  width: 145px;
  background-color: #cf3939;
  border: 1px solid #cf3939;
  border-radius: 24px 24px 24px 24px;
  height: 40px;
  line-height: 40px;
  margin-top: 0px;
  margin-left: 5px;
  margin-right: 14px;
}
#app >>> .van-nav-bar{
  width: 100%;
  position: fixed;
}
#app >>> .van-submit-bar__bar{
  height: 70px
}
#app >>> .row-1{
  margin-top: 0
}
#app  >>>  .van-nav-bar__text {
color:#CF3939;
}
#app  >>>  .van-nav-bar .van-icon{
  color:#1f1212;
}
#app >>> .van-submit-bar__price{
  color: #323232
}
</style>
