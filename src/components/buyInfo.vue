<template>
  <div id="app">
    <div class="initstitle" ref="viewBox" v-if="oShow">
      <span style="width: 5%;float: left;line-height: 47px;padding-left: 6px;">
        <van-icon name="arrow-left" slot="left" @click.prevent="search_shows"/>
      </span>
      <span style="width:50%;margin-left: 18%;">
        <van-tabs v-model="active" @change="onclik">
          <van-tab title="商品"></van-tab>
          <van-tab title="详情"></van-tab>
          <van-tab title="评价"></van-tab>
        </van-tabs>
      </span>
    </div>
    <!--导航 -->
    <!-- <van-col span='24' class="title">
         <div class="back">
           <van-icon name="arrow-left" color="#fff" size='25' @click.prevent="search_shows"/>
         </div>
          <span><van-icon name="arrow-left" color="#fff" size='25' @click.prevent="search_shows"/></span>
    </van-col>-->
    <van-row class="col-2" v-if="oShow1">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="image in images" class="preImg">
          <img :src="'http://'+image.url + image.avatar" @click="ImagePreviews()">
        </van-swipe-item>
      </van-swipe>
    </van-row>
    <van-row class="col-3">
      <div v-if="oShow1">
        <van-col span="24" class="lazy-bottom">
          <h4>
            ￥{{detial.specialPrice}}
            <span>￥{{detial.originalPrice}}</span>
          </h4>
        </van-col>
        <van-col span="24" class="lazy-left">
          <span>{{detial.productName}}</span>
        </van-col>
        <hr>
        <van-col class="empty"></van-col>
        <van-cell-group class="lists list2">
          <van-cell value="七天无理由退换货（激活后不支持）"/>
        </van-cell-group>
        <van-cell-group class="lists initge">
          <van-cell is-link @click="orderShows">
            <span style="color:#000">规格：</span>
            <span>{{initgeval}}</span>
          </van-cell>
          <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :title="'优惠券：'"
            @click="showList = true"
          />
        </van-cell-group>

        <div class="init-border-20"></div>
      </div>
      <div v-if="oShow2" v-bind:class="[oShow1==false ? activeClass : '', errorClass]">
        <van-cell-group id="activityPage">
          <van-cell title="综合评分"/>
          <van-cell class="pf">
            <span
              style="color:#FF4747;font-size: 24px;font-size: 32px;font-weight: 600;"
            >{{avgScore.value}}</span>
            <span style="width: 100%;display: block;">
              <star-rate
                v-if="show1"
                v-model="avgScore.value"
                type="star1"
                :star-half="true"
                disabled
                active-color="#FF4747"
                inactive-char="#FF4747"
              />
            </span>
            <!-- <van-rate :size="13" v-model="avgScore" disabled disabled-color="#FF4747"  void-color="#FF4747"/> -->
            <span>{{commentSize}}评论</span>
          </van-cell>
        </van-cell-group>
        <van-cell-group class="pl" v-if="commentSize>0">
          <van-cell :title="'全部点评('+commentSize +')'"/>
          <van-cell v-for="(item, index) in fromData" :key="index">
            <span class="imgss">

              <img v-if="item.avatar.length>0" class="initimg" :src="item.avatar" alt>
              <img v-else class="initimg" src="http://pay.iwingscom.com/image/head.png" alt>
              <i>{{item.nickName}}</i>
            </span>
            <span class="pls">
              <van-rate
                :size="13"
                v-model="item.score"
                :readonly="true"
                color="#B39061"
                void-color="#B39061"
              />
            </span>
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
          </van-cell>-->
        </van-cell-group>
        <div
          v-else
          style="color: rgb(140, 140, 140); text-align: center;padding-bottom: 20px;padding-top: 10px;"
        >目前还没有评论哦～</div>
        <h5
          v-if="fromData.length>0 && shows && fromData.length>=(page+1)*4"
          @click="more"
          class="more"
        >
          <van-icon name="add-o"/>
          <i class="text">点击加载更多</i>
        </h5>
      </div>
      <van-cell-group v-if="detilimg.length>0">
        <van-cell title="商品详情" v-bind:class="[oShow2==false ? activeClass : '', errorClass]"/>
        <img
          v-lazy="'http://'+detilimg[0].productUrl+detilimg[0].productDetail"
          alt
          style="width: 100%"
        >
      </van-cell-group>
    </van-row>

    <!-- 优惠券单元格 -->
    <!-- <van-cell-group  class="lists list2" style="top:490px">
      <van-cell value="七天无理由退换货（激活后不支持）" />
    </van-cell-group>
    <van-cell-group class="lists" style="top:520px">
      <van-cell title="规格：" is-link value="请选择颜色 型号 数量" @click="orderShows"/>
    </van-cell-group>-->
    <van-sku
      v-model="orderShow"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      :quota="quota"
      :quota-used="quotaUsed"
      :reset-stepper-on-hide="resetStepperOnHide"
      :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
      :disable-stepper-input="disableStepperInput"
      :message-config="messageConfig"
      @stepper-change="onBuynumber"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    >
      <template slot="extra-sku-group" slot-scope="props">
        <div class="van-sku-actions" style="position: absolute;right: 15px;top: 10px;">
          <van-icon name="close" size="20px" @click="closeSku"/>
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
        </div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <van-button type="primary" bottom-action @click="onBuyClicked">立即购买</van-button>
          <van-button bottom-action @click="onAddCartClicked">加入购物车</van-button>
        </div>
      </template>
    </van-sku>
    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
        :show-exchange-bar="false"
      />
    </van-popup>
    
    <!-- 底部购买 -->
    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" text="客服" @click="im" />
      <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn" :info="shop_info"/>
      <van-goods-action-big-btn text="立即购买" @click="onClickBigBtn" primary/>
      <van-goods-action-big-btn text="加入购物车" @click="onClickBigBtns"/>
    </van-goods-action>
  </div>
</template>

<script>
import { Rate } from "vant";
import { Tab, Tabs } from "vant";
import StarRate from "vue-cute-rate";
import { mapState, mapActions, mapGetters } from "vuex";
import { ImagePreview } from "vant";
import { Toast } from "vant";
import {
  severs,
  productInfo,
  getProductDetail,
  listImage,
  myCoupons,
  getProductComment,
  addShopCart,
  getShopCart
} from "../../src/api/login";
import { timestampToTime } from "../utils/date";
//obj 优惠券
// const coupon = [
//   {
//     available: 1,
//     discount: 0,
//     denominations: 150,
//     originCondition: 480 * 100,
//     reason: "",
//     value: 150,
//     name: "优惠券名称3",
//     startAt: 1489104000,
//     endAt: 1514592000
//   },
//   {
//     available: 1,
//     discount: 0,
//     denominations: 150,
//     originCondition: 200 * 100,
//     reason: "",
//     value: 150,
//     name: "优惠券名称4",
//     startAt: 1489104000,
//     endAt: 1514592000
//   }
// ];
// const disabledcoupon = [
//   {
//     available: 1,
//     discount: 0,
//     denominations: 150,
//     originCondition: 480 * 100,
//     reason: "",
//     value: 150,
//     name: "优惠券名称1",
//     startAt: 1489104000,
//     endAt: 1514592000
//   },
//   {
//     available: 1,
//     discount: 0,
//     denominations: 150,
//     originCondition: 480 * 100,
//     reason: "",
//     value: 150,
//     name: "优惠券名称2",
//     startAt: 1489104000,
//     endAt: 1514592000
//   }
// ];
export default {
  name: "buyInfo",
  data() {
    return {
      orderShow: false,
      preImgs: [],
      orderNum: 0,
      listImages: "",
      detial: "",
      severs: severs(),
      chosenCoupon: -1,
      shop_info: 0,
      initgeval: "请选择颜色 型号 数量",
      activeClass: "padding_45",
      errorClass: "padding_0",
      active: 0,
      avgScore: {
        value: 0
      },
      commentSize: "",
      page: 0,
      detilimg: "",
      images: ["https://img.yzcdn.cn/1.jpg", "https://img.yzcdn.cn/2.jpg"],
      shows: true,
      oShow1: true,
      oShow2: true,
      show1: false,
      fromData: {},
      coupons: [],
      disabledCoupons: [],
      showList: null,
      oShow: true,
      form: {
        specialPrice: "",
        productName: ""
      },
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
  props: {},
  components: {
    StarRate
  },
  computed: {
    ...mapState({
      buyImg: state => state.home.buyInfo.img[0],
      actives: state => state.active.home.title,
      my_info: state => state.home.my_info
    })
  },
  filters: {
    capitalize: function(value) {
       var newDate=new Date(value).getTime()/1000
			  return timestampToTime(newDate)
    }
  },
  mounted() {
    localStorage.removeItem("selIn");
    localStorage.removeItem("coupons");
    localStorage.removeItem("chosenCoupon");
    localStorage.removeItem("couponsIndex");
    this.productId = JSON.parse(localStorage.getItem("productId"));
    if (localStorage.getItem("getShopCarts") !== null) {
      this.shop_info = JSON.parse(localStorage.getItem("getShopCarts")).length;
    }
    //  window.addEventListener('scroll',this.loadMore,true);
    this.inits();
  },
  methods: {
    ...mapActions(["infoAction"]),
    search_shows() {
      this.$router.back(-1);
    },
    orderShows() {
      this.orderShow = true;
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    inits() {
      let para = {
        productId: this.productId
      };
      productInfo(para).then(res => {
        this.detial = res;
        localStorage.setItem("detial_s", JSON.stringify(res));
        //  console.log(res)
        this.slistImage2();
      });
    },
    slistImage2() {
      let para = {
        productId: this.productId
      };
      listImage(para).then(res => {
        // console.log(res)
        this.listImages = res[0];
        this.images = res;
        for (var i in res) {
          var imgs = "http://" + res[i].url + res[i].avatar;
          this.preImgs.push(imgs);
        }
        this.setdata();
      });
    },
    setdata() {
      this.sku.stock_num = 9999;
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
      this.getProductComments();
    },

    getProductComments() {
      let para = {
        productId: this.productId,
        currentPage: this.page,
        pageSize: 4
      };
      getProductComment(para).then(res => {
        this.commentSize = res.commentSize;
        this.avgScore.value = Number(res.avgScore);
        this.fromData = res.commentList;
        this.$nextTick(function() {
          this.show1 = true;
        });
        this.getProductDetails();
      });
    },
    more() {
      ++this.page;
      let para = {
        productId: this.productId,
        currentPage: this.page,
        pageSize: 4
      };
      getProductComment(para).then(res => {
        let data = res.commentList;
        if (data.length > 0) {
          for (var i in data) {
            this.fromData.push(data[i]);
          }
        } else {
          this.shows = false;
        }
      });
    },
    getProductDetails() {
      let para = {
        productId: this.productId
      };
      getProductDetail(para).then(res => {
        this.detilimg = res;
        this.myCouponss();
      });
    },
    myCouponss() {
      if (localStorage.getItem("token")!==null) {
      let para = {
        token: JSON.parse(localStorage.getItem("token")),
        type: 0
      };
      myCoupons(para).then(res => {
        if (res) {
          for (let i = 0; i < res.length; i++) {
            res[i].name = res[i].couponName;
            res[i].originCondition = res[i].fullMoney * 100;
            res[i].name = res[i].couponName;
            res[i].startAt = new Date((res[i].startTime).replace(/\-/g, '/')).getTime()/1000;
            res[i].endAt = new Date((res[i].endTime).replace(/\-/g, '/')).getTime()/1000;
            res[i].value = Number(res[i].reductionMoney * 100);
            res[i].denominations = Number(res[i].reductionMoney * 100);
          }
        }
        this.coupons = res;
        this.disabledcoupon();
      });
       }
    },
    disabledcoupon() {
      let para = {
        token: JSON.parse(localStorage.getItem("token")),
        type: 1
      };
      myCoupons(para).then(res => {
        if (res) {
          for (let i = 0; i < res.length; i++) {
            res[i].name = res[i].couponName;
            res[i].originCondition = res[i].fullMoney * 100;
            res[i].name = res[i].couponName;
            res[i].startAt = new Date((res[i].startTime).replace(/\-/g, '/')) / 1000;
            res[i].endAt = new Date((res[i].endTime).replace(/\-/g, '/')) / 1000;
            res[i].value = Number(res[i].reductionMoney * 100);
            res[i].denominations = Number(res[i].reductionMoney * 100);
          }
        }
        this.disabledCoupons = res;
      });
    },
    closeSku() {
      const sel = document.querySelector(".van-stepper__input");
      const color = document.querySelector(
        ".van-sku-row__item.van-sku-row__item--active"
      );
      if (color !== null) {
        var selIn = [];
        selIn.push({
          orderNum: sel.value,
          color: color.innerHTML
        });
        localStorage.setItem("selIn", JSON.stringify(selIn));
        this.initgeval =
          "已选" + this.detial.productName + color.innerHTML + "X" + sel.value;
      } else {
        this.initgeval = "请选择颜色 型号 数量";
      }
      this.orderShow = false;
    },
    //商品预览
    ImagePreviews() {
      ImagePreview({
        images: this.preImgs,
        startPosition: 0
      });
    },
    //优惠券
    onChange(index) {
      /**/
      if (index !== -1) {
        var datas = localStorage.getItem("selIn");
        if (datas == null) {
          Toast('请选择商品规则')
          // alert("请选择商品规则");
           this.showList = false;
           this.orderShows()
        } else {
          var prise = this.detial.specialPrice;
          var orderNum = JSON.parse(datas)[0].orderNum;
          var originCondition = this.coupons[index].originCondition / 100;
          if (originCondition > prise * orderNum) {
            alert("满" + originCondition + "元可用");
          } else {
            localStorage.setItem("coupons", JSON.stringify(this.coupons));
            localStorage.setItem(
              "disabledCoupons",
              JSON.stringify(this.disabledCoupons)
            );
            localStorage.setItem("couponsIndex", index);
            this.showList = false;
            this.chosenCoupon = index;
          }
        }
      } else {
        this.showList = false;
      }
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
     im(){
      // console.log( this.$store.state.sessionlist[0].id)
      var session =  'p2p-admin'
        // if (session)
        // p2p-123456
        location.href = `#/chat/${session}`
      // this.$router.push('/session')
    },
    onClickMiniBtn() {
      this.$router.push("/shoppingCart");
    },
    onClickBigBtn() {
      if (this.initgeval == "请选择颜色 型号 数量") {
        this.orderShow = true;
      } else {
        // this.onBuyClicked()
        this.$router.push("/goods/id_2/buy/pay");
      }
    },
    onClickBigBtns() {
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("token").length > 3
      ) {
        if (this.initgeval == "请选择颜色 型号 数量") {
          this.orderShow = true;
        } else {
          var selIn = JSON.parse(localStorage.getItem("selIn"))[0];
          var str = selIn.color.replace(/\s+/g, "");
          var addShopData = {
            productId: this.detial.id,
            productNum: selIn.orderNum,
            price: this.detial.specialPrice,
            productName: this.detial.productName,
            productColor: str,
            productImage: this.goods.picture
          };
          let para = {
            token: JSON.parse(localStorage.getItem("token")),
            shopCart: JSON.stringify(addShopData)
          };
          addShopCart(para).then(res => {
            this.getShopCart1();
            Toast("加入成功");
            
            this.orderShow = false;
          });
        }
      } else {
        Toast("请登录");
        this.orderShow = false;
        this.$router.push("/login");
      }
    },
    onclik(e) {
      if (e == 0) {
        this.oShow2 = true;
        this.oShow1 = true;
      } else if (e == 2) {
        this.oShow1 = false;
        this.oShow2 = true;
      } else if (e == 1) {
        this.oShow2 = false;
        this.oShow1 = false;
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    onBuynumber(data) {
      // console.log(data)
    },
    onBuyClicked(data) {
      const sel = document.querySelector(".van-stepper__input");
      const color = document.querySelector(
        ".van-sku-row__item.van-sku-row__item--active"
      );
      if (color == null) {
        Toast("请选择规格");
        return;
      }
      if (sel.value <= 0) {
        Toast("数量不合理");
        return;
      }
      if (!/(^[1-9]\d*$)/.test(sel.value)) {
        Toast("数量不合理");
        return;
      }
      var selIn = [];
      selIn.push({
        orderNum: sel.value,
        color: color.innerHTML
      });
      localStorage.setItem("selIn", JSON.stringify(selIn));
      this.$router.push("/goods/id_2/buy/pay");
    },
    onAddCartClicked(data) {
      if (localStorage.getItem("token")) {
        const sel = document.querySelector(".van-stepper__input");
        const color = document.querySelector(
          ".van-sku-row__item.van-sku-row__item--active"
        );
        var selIn = [];
        if (sel.value <= 0) {
          Toast("数量不合理");
          return;
        }
        if (!/(^[1-9]\d*$)/.test(sel.value)) {
          Toast("数量不合理");
          return;
        }
        if (!/(^[1-9]\d*$)/.test(sel.value)) {
          Toast("数量不合理");
          return;
        }
        if (color == null) {
          Toast("请选择规格");
          return;
        }
        selIn.push({
          orderNum: sel.value,
          color: color.innerHTML
        });
         localStorage.setItem("selIn", JSON.stringify(selIn));
        var str = selIn[0].color.replace(/\s+/g, "");
        var addShopData = {
          productId: this.detial.id,
          productNum: selIn[0].orderNum,
          price: this.detial.specialPrice,
          productName: this.detial.productName,
          productColor: str,
          productImage: this.goods.picture
        };
        let para = {
          token: JSON.parse(localStorage.getItem("token")),
          shopCart: JSON.stringify(addShopData)
        };
        addShopCart(para).then(res => {
          this.getShopCart1();
          Toast("加入成功");
          this.initgeval =
            "已选" +
            this.detial.productName +
            color.innerHTML +
            "X" +
            sel.value;
          this.orderShow = false;
        });
      } else {
        Toast("请登录");
        this.orderShow = false;
        this.$router.push("/login");
      }
    },
    getShopCart1() {
      let para = {
        token: JSON.parse(localStorage.getItem("token"))
      };
      let thisss = this;
      const url = this.severs + "/customer/getShopCart";
      this.$ajax
        .post(url, para)
        .then(function(res) {
          //  console.log(res.data)
          if (res.data.code == "1008") {
            thisss.infoAction();
          } else {
            localStorage.setItem(
              "getShopCarts",
              JSON.stringify(res.data.data.shopCart)
            );
            thisss.shop_info = JSON.parse(
              localStorage.getItem("getShopCarts")
            ).length;
          }
        })
        .catch(function(res) {
          thisss.infoAction();
        });
    }
    //     loadMore(){
    //     clearTimeout(this.timer);
    //     this.timer=setTimeout(()=>{
    //         var clientHeight=document.documentElement.clientHeight; //document.documentElement获取数据
    //         var scrollTop=document.documentElement.scrollTop; //document.documentElement获取数据
    //         var scrollHeight=document.documentElement.scrollHeight;//document.documentElement获取数据
    //         if(clientHeight+scrollTop+00>=scrollHeight){
    //             this.oShow =true
    //         }else{
    //            this.oShow =false
    //         }
    //     },13);
    // }
  },
  
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
#app >>> .van-goods-action {
  background-color: #fff;
  border-top: 1px solid #eee;
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
  margin-top: -5px;
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
#app .col-3 {
  width: 100%;
  overflow: auto;
  overflow-x: hidden;
}
#app >>> .van-goods-action-mini-btn {
  border-width: 0;
}
#app >>> .pl .initimg {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
#app >>> .pl .pls {
  float: right;
  margin-top: 5px;
}
#app >>> .pl .text {
  width: 86%;
  position: relative;
  display: inline-block;
  color: #424242;
  padding-left: 46px;
}
#app >>> .pl .imglsit img {
  float: left;
  width: 20%;
  height: auto;
  padding: 2%;
}
#app >>> .van-swipe__indicator {
  background-color: #fff;
  border: 1px solid #ab8675;
}
#app >>> .van-swipe__indicator--active {
  background: rgba(171, 134, 117, 1);
}
#app >>> .imgss i {
  font-style: inherit;
  position: absolute;
  top: 10px;
  left: 48px;
  color: #424242;
}
#app >>> .more {
  text-align: center;
  line-height: 30px;
  position: relative;
}
#app >>> .more .text {
  font-style: unset;
  padding-left: 21px;
}
#app >>> .more .van-icon.van-icon-add-o {
  font-size: 15px;
  margin-right: 2px;
  /* margin-top: 0px; */
  /* line-height: 28px; */
  position: absolute;
  top: 6px;
  padding-right: 24px;
}
#app >>> .van-goods-action-mini-btn:after {
  border-width: 0;
}
#app >>> .initstitle span {
  display: inline-block;
}
#app >>> .van-tab--active {
  color: #b39061;
}
#app >>> .van-tabs__line {
  background-color: #b39061;
}
#app >>> .van-tabs__nav {
  /* display: inline-block */
}
#app >>> .van-cell.van-cell--clickable.van-coupon-cell .van-cell__title,
.van-cell__value {
  flex: inherit;
}
#app >>> .initstitle {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  background-color: #fff;
}
#app >>> .padding_0 {
  padding-top: 0;
}
#app >>> .padding_45.padding_0 {
  padding-top: 50px;
}
#app >>> .van-hairline--top-bottom:after {
  border-width: 0;
}
#app
  >>> .van-sku-header__goods-info
  .van-sku__close-icon.van-icon.van-icon-close {
  display: none;
}
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
#app
  .van-button.van-button--default.van-button--normal.van-button--bottom-action {
  background-color: #b39061;
  border: 1px solid #b39061;
}
#app >>> .van-sku-header {
  padding-top: 20px;
}
#app >>> .van-sku-actions {
  padding-bottom: 10px;
}
#app >>> .van-sku-header__img-wrap img {
      max-height: 66px;
      /* top: -10px; */
}
</style>


