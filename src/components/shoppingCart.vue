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
  <div v-if="shops.length>0">
        <van-row class="shop-col">
    <p class="init-checkd">
     <div class="checkedBox van-checkbox">
       <div v-model="checkAll" @click="choiceAll" :class="checkAll?'van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked':'van-checkbox__icon van-checkbox__icon--round' ">
         <i class="van-icon van-icon-success" style="margin-left: 0px;"><!----></i></div><!----></div>
         <i  class="van-checkbox__icon van-checkbox__icon--round"><i style="margin-left: 38px;">新翔自营</i></i></p>
        </van-row>
    <div v-for="(v,index) in shops" :key="index.id" class="shop-cart">
        <!-- 标签区域 -->
        <div class="shopp_conent">
        <van-col span='2' offset="1" class="">
          <van-checkbox v-model="v.danxuan" class="checkedBox"   @change="singleChecked(v.danxuan,index)"></van-checkbox>
        </van-col>
        <van-col span='6' offset="1" class="imgList">
      <img  :src="v.productImage" name="adapter" />
    </van-col>
    <van-col span='15' offset="1" class="goodList">
      <span>{{v.productName}}</span>
      <span>￥{{v.price}}</span>
      <span>{{v.productColor}}</span>
      <span style="text-align: right;padding-right: 10px;padding-top: 8px;"><van-stepper disable-input @plus="subShopCarts2(v)" @minus="subShopCarts(v)" v-model="v.productNum"/></span>
    </van-col>
        </div>
    </div>
    <div style="padding-bottom:80px"></div>  
<van-submit-bar
  :price="total"
  button-text="去结算"
  @submit="onSubmit"
  v-if="canel==false">
   <p class="init-checkd">
     <div class="checkedBox van-checkbox">
       <div v-model="checkAll" @click="choiceAll" :class="checkAll?'van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked':'van-checkbox__icon van-checkbox__icon--round' ">
         <i class="van-icon van-icon-success"><!----></i></div><!----></div>
          <i class="van-checkbox__icon van-checkbox__icon--round">全选</i>
   </p>
</van-submit-bar>
<van-submit-bar
  button-text="删除所选"
  @submit="onSubmit2"
  v-else >
   <p class="init-checkd">
     <div class="checkedBox van-checkbox">
       <div v-model="checkAll" @click="choiceAll" :class="checkAll?'van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked':'van-checkbox__icon van-checkbox__icon--round' ">
         <i class="van-icon van-icon-success"><!----></i></div><!----></div>
          <i class="van-checkbox__icon van-checkbox__icon--round">全选</i>
   </p>
</van-submit-bar>
  </div>
  <div v-else style="text-align: center;margin-top: 50%;">
    <h5 style="color: #6B6B6B;">购物车还没有商品</h5>
    <button @click="redirects('/')" style="border: 1px solid #B39061; background-color: transparent;color: #B39061; border-radius: 2px;font-size: 14px;padding: 8px 25px;">去逛逛</button>
  </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
import { getShopCart,addShopCart,subShopCart,delShopCart } from "../../src/api/login";

const coupon = {
  available: 1,
  discount: 0,
  denominations: 10000,
  origin_condition: 0,
  reason: "",
  value: 150,
  name: "满498减100",
  start_at: 1489104000,
  end_at: 1514592000
};

export default {
  name: "shoppingCart",
  components: {},
  data() {
    return {
      tabarActive: 2,
      value: null,
      active: 0,
      total:0,
      path: "../../static/images/",
      imageList: [],
      disabled: false,
      count: 0,
      canel: false,
      cantext: "编辑",
      isLoading: false,
      allchecked: false,
      checked: [],
      checkeds: [],
      checkAll:false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      imageUrl: [],
      newcons: [],
      goodsTitle: [],
      goodsDescription: [],
      prices: [],
      shops: []
    };
  },
  computed: {
    ...mapState({
      title: state => state.community.tab.title,
      icon: state => state.home.badge.icon,
      bageTitle: state => state.home.badge.title,
      actives: state => state.active.home.title,
      src: state => state.home.lunbo.src,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info
    }),
    ...mapGetters(["bc_notshow", "search_show"])
  },
  methods: {
    ...mapActions(["infoAction"]),
    onClickLeft() {
      this.$router.push('/');
    },
    onSubmit2() {
     var datas =  this.shops.filter(function (vals) {
          return vals.danxuan == true
        })
       if (datas.length<=0) {
          Toast('请选择商品')
          return
        }
        
       var  addShopData = [];
       for(var i in datas){
         addShopData.push({
            productId: datas[i].productId,
            productColor: datas[i].productColor.replace(/\s+/g,""),
         })
       }
        let para = {
        token: JSON.parse(localStorage.getItem("token")),
        shopCart: JSON.stringify(addShopData)
       }
     
     delShopCart(para).then(res => {
         this.total = 0
         this.shops = this.shops.filter(function(i){ return !i.danxuan })
         Toast('删除成功')
      });
    },
    
    subShopCarts(item){
       var addShopData = {
        productId: item.productId,
        productNum: 1,
        price: item.price,
        productName: item.productName,
        productColor: item.productColor.replace(/\s+/g,""),
        productImage:item.productImage
      } 
      let para = {
        token: JSON.parse(localStorage.getItem("token")),
        shopCart: JSON.stringify(addShopData)
      }
     subShopCart(para).then(res => {
       if (item.danxuan) {
            let p =
              parseFloat(item.price) *100
              this.total -= p
          }
      });
    },
     subShopCarts2(item){
       var addShopData = {
        productId: item.productId,
        productNum: 1,
        price: item.price,
        productName: item.productName,
        productColor: item.productColor.replace(/\s+/g,""),
        productImage:item.productImage
      } 
      let para = {
        token: JSON.parse(localStorage.getItem("token")),
        shopCart: JSON.stringify(addShopData)
      }
   
     addShopCart(para).then(res => {
          if (item.danxuan) {
            let p =
              parseFloat(item.price) *100
              this.total += p
          }
      });
    },
    choiceAll:function(checkAll){
      this.checkAll = !this.checkAll;
      if (this.checkAll) {
        this.shops.forEach(element => {
           this.$set(element, 'danxuan', true)
      })
      }else{
        this.shops.forEach(element => {
           this.$set(element, 'danxuan', false)
      })
      }
   },
    onSubmit() {
         var datas =  this.shops.filter(function (vals) {
          return vals.danxuan == true
        })
        if (datas.length<=0) {
          Toast('请选择商品')
          return
        }
        localStorage.setItem("detial_s", JSON.stringify(datas));
        localStorage.setItem("total",this.total); 
       console.log(this.total)
       this.$router.push('/orderPays')
        

    },
    inits(){
        let para = {
          token:JSON.parse(localStorage.getItem('token'))
          } 

      getShopCart(para).then(res => {
         localStorage.setItem('getShopCarts', JSON.stringify(res.shopCart)) 
        this.infoAction()
        var data  = res.shopCart;
       data.filter(function (vals) {
          return vals.danxuan == false
        }) 
        this.shops = data
        Toast.clear();
        if (data.length<=0) {
          this.cantext = ''
        }
      })
    },
    singleChecked: function(checked, index) {
      let p =
        parseFloat(this.shops[index]["price"]) *
        parseFloat(this.shops[index]["productNum"]);
      if (!checked ||checked=='undefined') {
      
        // this.checked -= 1;
        this.shops[index].danxuan = false;
         this.$set(this.shops, index, this.shops[index]);
        if (this.total>0) {
          this.total -= p*100;
        }
      } else {
        // this.checked += 1;
        this.shops[index].danxuan = true;
         this.$set(this.shops, index, this.shops[index]);
        this.total += p*100 ;
   
       
      }
      var check =  this.shops.filter(function (vals) {
          return vals.danxuan == true
        }) 
      if (check.length == this.shops.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    onClickRight() {
      this.canel = !this.canel;
      if (this.canel == true) {
        this.cantext = "完成";
      } else {
        this.cantext = "编辑";
      }
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
    }
  },
  watch: {
    
  },
  directives: {
    tab: {
      inserted(el) {
        //绑定tab样式
        const tabs = el.childNodes[0].childNodes[0].children[0];
        tabs.style.backgroundColor = "#d34ba8";
      }
    },
    //tabBar 消息通知指令
    infos: {
      inserted(el, obj) {
        console.log(obj.value);
        const info = el.childNodes[0].childNodes[1];
        info.innerText = obj.value;
      }
    }
  },
  mounted(){
    this.inits()
  },
  // created() {
  //   Toast("仅展示作用  ^_^");
  // }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/home.less");
</style>

<style scoped>
#app >>> .van-card {
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
#app >>> .van-stepper__input[disabled] {
    color: #7d7e80;
    background-color: #f8f8f8;
}
#app >>> .imgList img {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-top: 8px;
}
#app >>> .shopp_conent {
  height: 100%;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
#app >>> .van-submit-bar__text {
  /* text-align: left; */
  padding-right: 5px;
}
#app >>> .van-checkbox__icon .van-icon {
  border-color: #979797;
}
#app >>> .van-col--offset-1 {
  margin-left: 0;
}
#app >>> .goodList span {
  display: inherit;
  text-align: left;
  padding-left: 25px;
}
#app .van-col--2 {
  text-align: left;
}
#app .van-checkbox {
  position: absolute;
  left: 20px;
}
#app .shop-cart {
  height: auto;
}
#app .van-submit-bar__bar .van-checkbox {
  position: relative;
  left: 5px;
}
#app >>> .van-checkbox__icon--checked .van-icon {
  background-color: #cf3939;
  border-color: #cf3939;
}
#app >>> .van-submit-bar .van-button {
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
#app >>> .van-nav-bar {
  width: 100%;
  position: fixed;
}
#app >>> .van-submit-bar__bar {
  height: 70px;
  border-top: 1px solid #D9D9D9;
}
#app >>> .row-1 {
  margin-top: 0;
}
#app >>> .van-nav-bar__text {
  color: #cf3939;
}

  i{
    font-style: inherit;
    margin-left: 12px;
  }
#app >>> .van-nav-bar .van-icon {
  color: #1f1212;
}
#app >>> .van-submit-bar__price {
  color: #323232;
}
</style>
