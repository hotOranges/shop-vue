<template>
  <div id="app">
                    <!-- 商品列表 -->
                 <div class="over2">
                    <!-- <lazy-component class="lazys"
            v-waterfall-lower="loadMore"
            waterfall-disabled="disabled"
            waterfall-offset="300"
            > -->
                    <van-row  v-for="(img,index) in imageList" :key='img.id' class="lists">
                        <van-col span='8' offset="1" class="goods_list">
                            <div class="imgList" @click.stop="buy(img)">
                               <img  :src="'http://'+img.productUrl+img.productImage" />
                            </div>
                            <van-col span="24" class="lazy-left">
                              <span>{{img.productName}}</span>
                            </van-col>
                             <van-col span="24" class="lazy-bottom">
                              <h4>￥{{img.specialPrice}} <span>￥{{img.originalPrice}}</span></h4> 
                            </van-col>
                        </van-col>
                    </van-row>
                    <!-- </lazy-component> -->
                  </div>

                
    </div>

</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
// import { Waterfall } from "vant";
import { Toast } from "vant";
import { getProduct } from "../../src/api/login";

export default {
  name: "active",
  data() {
    return {
      tabarActive: 0,
      count: 0,
      value: null,
      active: 0,
      imageList: {
        img_1: [],
        img_2: []
      },
      title: {
        title_1: [],
        title_2: []
      },
      limit_price: {
        limit_p1: [],
        limit_p2: []
      },
      original_price: {
        origin_p1: [],
        origin_p2: []
      },
      discount: {
        dis_1: [],
        dis_2: []
      },

      disabled: false
    };
  },
  props: {
    tabs: {
      type: String,
      required: true,
      default() {
        return {
          tabs: "errTitle"
        };
      }
    }
  },
  computed: {
    ...mapState({
      bageTitle: state => state.home.badge.title,
      actives: state => state.active.home.title,
      activeTitle: state => state.active.home.activeTitle,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info
    }),
  },
  mounted(){
    this.inits()
  },
  methods: {
    inits(){
        getProduct().then(res => {
        // console.log(res);
        switch (this.tabs) {
          case "推荐":
            this.imageList = res;
            break;
          case "手机":
            var productType =  '1';
             var mockUsers = res.filter(user => {
            if (productType && user.productType.indexOf(productType) == -1) return false;
            return true;
             });
            this.imageList = mockUsers;
            break;
          case "穿戴":
            var productType =  '2';
             var mockUsers = res.filter(user => {
            if (productType && user.productType.indexOf(productType) == -1) return false;
            return true;
             });
            this.imageList = mockUsers;
            break;
          case "健康":
            var productType =  '3';
             var mockUsers = res.filter(user => {
            if (productType && user.productType.indexOf(productType) == -1) return false;
            return true;
             });
            this.imageList = mockUsers;
            break;  
          default:
            break;
        }
     
    });  
    },
    buy(img) {
      localStorage.setItem('productId', JSON.stringify(img.id))
      this.$router.push('/goods/'+img.id +'/buy');
    },
  },
  // created(){
  //     getProduct().then(res => {
  //       // console.log(res);
  //       switch (this.tabs) {
  //         case "推荐":
  //           this.imageList = res;
  //           break;
  //         case "手机":
  //           var productType =  '1';
  //            var mockUsers = res.filter(user => {
  //           if (productType && user.productType.indexOf(productType) == -1) return false;
  //           return true;
  //            });
  //           this.imageList = mockUsers;
  //           break;
  //         case "穿戴":
  //           var productType =  '2';
  //            var mockUsers = res.filter(user => {
  //           if (productType && user.productType.indexOf(productType) == -1) return false;
  //           return true;
  //            });
  //           this.imageList = mockUsers;
  //           break;
  //         case "健康":
  //           var productType =  '3';
  //            var mockUsers = res.filter(user => {
  //           if (productType && user.productType.indexOf(productType) == -1) return false;
  //           return true;
  //            });
  //           this.imageList = mockUsers;
  //           break;  
  //         default:
  //           break;
  //       }
     
  //   });  
  // }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/goods.less");
</style>
<style scoped>
#app >>> .van-row {
    width: 30.333333%;
    float: left;
    margin-left: 2%;
}
#app >>> .van-col--8 {
  width: 100%;
}
</style>


