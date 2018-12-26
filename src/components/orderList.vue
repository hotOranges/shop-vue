<template>
  <!-- 购买信息组件  大部分都是一样的 所以数据方面 我就用同一个 作为展示作用-->
  <div id="app">
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { ImagePreview } from "vant";
import { Toast } from "vant";
import { addShopCart,getShopCart } from "../../src/api/login";
export default {
  name: "buyInfo",
  data() {
    return {
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [
              {
                id: "30349", // skuValueId：规格值 id
                name: "白色", // skuValueName：规格值名称
                imgUrl: "https://img.yzcdn.cn/1.jpg" // 规格类目图片，只有第一个规格类目可以定义图片
              },
              {
                id: "1215",
                name: "黑色",
                imgUrl: "https://img.yzcdn.cn/2.jpg"
              },
              {
                id: "1315",
                name: "蓝色",
                imgUrl: "https://img.yzcdn.cn/2.jpg"
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 1215, // skuId，下单时后端需要
            price: 50900, // 价格（单位分）
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 30349, // skuId，下单时后端需要
            price: 50000, // 价格（单位分）
            s1: "30349", // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 10 // 当前 sku 组合对应的库存
          },
          {
            id: 1315, // skuId，下单时后端需要
            price: 40900, // 价格（单位分）
            s1: "1315", // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 40 // 当前 sku 组合对应的库存
          }
        ],
        price: "509.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 1215, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [],
        hide_stock: true // 是否隐藏剩余库存
      },

      goods: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg"
      },

      skuData: {
        // 商品 id
        goodsId: "946755",
        selectedNum: 1
      },

      customStepperConfig: {
        // 自定义限购文案
        // quotaText: '每次限购xxx件',
        // // 自定义步进器超过限制时的回调
        // handleOverLimit: (data) => {
        //   const { action, limitType, quota, quotaUsed } = data;
        //   if (action === 'minus') {
        //     Toast('至少选择一件商品');
        //   } else if (action === 'plus') {
        //     const { LIMIT_TYPE } = Sku.skuConstants;
        //     if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
        //       let msg = `单次限购${quota}件`;
        //       if (quotaUsed > 0) msg += `，您已购买${quotaUsed}`;
        //       Toast(msg);
        //     } else {
        //       Toast('库存不够了~~');
        //     }
        //   }
        // }
      },

      messageConfig: {},
      goodsId: "946755",
      quota: 0,
      quotaUsed: 0,
      resetStepperOnHide: false,
      resetSelectedSkuOnHide: false,
      closeOnClickOverlay: false,
      disableStepperInput: false
    };
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
  mounted() {
    this.detial = JSON.parse(localStorage.getItem("detial_s"));
    this.setdata();
  },
  methods: {
    ...mapActions(["orderNum"]),
    ...mapActions(["orderShows"]),
    ...mapActions(["infoAction"]),
    search_shows() {
      this.$router.back(-1);
    },
    setdata() {
      this.sku.stock_num =9999;
      this.sku.price = this.detial.specialPrice;
      this.goods.title = this.detial.productName;
      this.goods.picture =
        "http://" + this.detial.productUrl + this.detial.productImage;
      let newv = [];
      let newlist = [];
      var str = this.detial.saleColor;
      var datas = new Array();
      datas = str.split("，");
      for (var i in datas) {
        const element = datas[i];
        newv.push({
          id: i,
          imgUrl: this.goods.picture,
          name: element
        });
        newlist.push({
          id: i,
          s1: i,
          price: this.detial.specialPrice * 100,
          stock_num: 1111
        });
      }
      this.sku.tree[0].v = newv;
      this.sku.list = newlist;
    },
    //商品预览
    ImagePreviews() {
      ImagePreview(this.preImgs);
    },
    onBuyClicked(data) {
      const sel = document.querySelector(".van-stepper__input");
      const color = document.querySelector(
        ".van-sku-row__item.van-sku-row__item--active"
      );
      this.orderNum(sel.value);
      var selIn = [];
      selIn.push({
        orderNum: sel.value,
        color: color.innerHTML
      });
      localStorage.setItem("selIn", JSON.stringify(selIn));
      this.$router.push("/goods/id_2/buy/pay");
    },
    onAddCartClicked(data) {
       if (localStorage.getItem('token') && localStorage.getItem('token').length>3) {
      const sel = document.querySelector(".van-stepper__input");
      const color = document.querySelector(
        ".van-sku-row__item.van-sku-row__item--active"
      );
      var selIn = [];
      selIn.push({
        orderNum: sel.value,
        color: color.innerHTML
      });
      var str = selIn[0].color.replace(/\s+/g,"");
      var addShopData = {
        productId: this.detial.id,
        productNum: selIn[0].orderNum,
        price: this.detial.specialPrice,
        productName: this.detial.productName,
        productColor: str,
        productImage:this.goods.picture
      } 
      let para = {
        token: JSON.parse(localStorage.getItem("token")),
        shopCart: JSON.stringify(addShopData)
      };
      addShopCart(para).then(res => {
         this.getShopCart1()
          Toast("加入成功");
          this.orderShows();
      });
       }else{
         Toast('请登录')
         this.$router.push('/login')
       }
    },
    getShopCart1(){
   let para = {
      token: JSON.parse(localStorage.getItem("token"))
    };
    getShopCart(para).then(res => {
       localStorage.setItem('getShopCarts', JSON.stringify(res.shopCart))
      this.infoAction()
    });
   }
    
  },
     
  watch: {},
  directives: {
    order: {
      inserted(el, e) {
        let data = JSON.parse(localStorage.getItem("detial_s"));
        const orderImg = el.childNodes[0];
        const urlImg = "http://" + data.productUrl + data.productImage;
        const orderChoose = el.childNodes[1];
        orderImg.childNodes[0].innerHTML = `<img src=${urlImg}> `;
        orderImg.childNodes[0].childNodes[0].style.width = "100%";
      }
    }
  },
  beforeCreate() {}
};
</script>
<style scoped>
#app >>> .van-button--bottom-action {
  border-radius: 24px 24px 24px 24px;
}
#app >>> .van-button--bottom-action {
  height: 40px;
  line-height: 40px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
#app .van-button.van-button--default.van-button--normal.van-button--bottom-action {
  background-color: #b39061;
  border: 1px solid #b39061;
}
#app >>> .van-sku-header{
  padding-top: 12px
}
</style>

