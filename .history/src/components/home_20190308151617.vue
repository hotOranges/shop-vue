<template>
  <!-- 首页组件 -->
  <div id="app">
    <!-- 搜索区 -->
    <van-nav-bar v-if="iswx" class="init-header" title="商城">
      <van-icon name="chat" slot="right" @click="im" :info="myInfo"/>
    </van-nav-bar>
    <van-nav-bar
      v-else
      class="init-header"
      title="商城"
      left-text
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon name="chat" slot="right" @click="im" :info="myInfo"/>
    </van-nav-bar>
    <!-- 标签区域 -->
    <van-row>
      <div>{{sessionlist.lastMsgShow}}</div>
      <van-col span="24">
        <van-tabs v-model="active" swipeable v-tab @change="changeTab">
          <van-tab v-for="index in 4" :title="title[index]" :key="index.id" class="tab">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <!-- 推荐版块 -->
              <div v-if="title[index]== '推荐'" class="contain">
                <!-- 轮播 -->
                <van-row>
                  <van-col span="24">
                    <lazy-component>
                      <van-swipe :autoplay="3000" style="max-height:180px;">
                        <van-swipe-item v-for="(image, index) in images" :key="index">
                          <!-- <img v-lazy="image" style="width:100%;height:160px;" @click.stop="redirect('/goods/id_0')"/> -->
                          <img
                            @click.stop="buys(image)"
                            v-lazy=" 'http://'+image.url+ image.avatar"
                            style="width:100%;"
                          >
                        </van-swipe-item>
                      </van-swipe>
                    </lazy-component>
                  </van-col>
                </van-row>
                <div class="sort">
                  <span>智能热卖</span>
                  <!-- <span class="sort-tab">
                    <button>价格</button>
                    <button>销量</button>
                  </span>-->
                </div>
                <!-- 商品列表 -->
                <div class="over2">
                  <!-- <lazy-component class="lazys"
            v-waterfall-lower="loadMore"
            waterfall-disabled="disabled"
            waterfall-offset="300"
                  >-->
                  <van-row v-for="(img,index) in imageList" :key="img.id" class="lists">
                    <van-col span="8" offset="1" class="goods_list">
                      <div class="imgList" @click.stop="buy(img)">
                        <img
                          v-lazy="'http://'+img.productUrl+img.productImage"
                          :src="'http://'+img.productUrl+img.productImage"
                        >
                      </div>
                      <van-col span="24" class="lazy-left">
                        <span>{{img.productName}}</span>
                      </van-col>
                      <van-col span="24" class="lazy-bottom">
                        <h4>
                          ￥{{img.specialPrice}}
                          <span>￥{{img.originalPrice}}</span>
                        </h4>
                      </van-col>
                    </van-col>
                  </van-row>
                  <!-- </lazy-component> -->
                </div>
              </div>

              <div v-if="title[index]== '手机'" class="contain">
                <van-row v-for="(img,index) in imageList" :key="img.id" class="lists">
                  <van-col span="8" offset="1" class="goods_list">
                    <div class="imgList" @click.stop="buy(img)">
                      <img :src="'http://'+img.productUrl+img.productImage">
                    </div>
                    <van-col span="24" class="lazy-left">
                      <span>{{img.productName}}</span>
                    </van-col>
                    <van-col span="24" class="lazy-bottom">
                      <h4>
                        ￥{{img.specialPrice}}
                        <span>￥{{img.originalPrice}}</span>
                      </h4>
                    </van-col>
                  </van-col>
                </van-row>
              </div>

              <div v-if="title[index]== '穿戴'" class="contain">
                <van-row v-for="(img,index) in imageList" :key="img.id" class="lists">
                  <van-col span="8" offset="1" class="goods_list">
                    <div class="imgList" @click.stop="buy(img)">
                      <img :src="'http://'+img.productUrl+img.productImage">
                    </div>
                    <van-col span="24" class="lazy-left">
                      <span>{{img.productName}}</span>
                    </van-col>
                    <van-col span="24" class="lazy-bottom">
                      <h4>
                        ￥{{img.specialPrice}}
                        <span>￥{{img.originalPrice}}</span>
                      </h4>
                    </van-col>
                  </van-col>
                </van-row>
              </div>
              <div v-if="title[index]== '健康'" class="contain">
                <van-row v-for="(img,index) in imageList" :key="img.id" class="lists">
                  <van-col span="8" offset="1" class="goods_list">
                    <div class="imgList" @click.stop="buy(img)">
                      <img :src="'http://'+img.productUrl+img.productImage">
                    </div>
                    <van-col span="24" class="lazy-left">
                      <span>{{img.productName}}</span>
                    </van-col>
                    <van-col span="24" class="lazy-bottom">
                      <h4>
                        ￥{{img.specialPrice}}
                        <span>￥{{img.originalPrice}}</span>
                      </h4>
                    </van-col>
                  </van-col>
                </van-row>
              </div>
            </van-pull-refresh>
          </van-tab>
        </van-tabs>
      </van-col>
    </van-row>

    <!-- tabBar -->
    <van-tabbar v-model="tabarActive">
      <van-tabbar-item icon="contact" @click="redirects('/Me')"></van-tabbar-item>
      <van-tabbar-item icon="cart" :info="info" @click="redirects('/shoppingCart')"></van-tabbar-item>
      <!-- <van-tabbar-item icon="contact" info="2" v-infos="my_info" @click="redirects('/me')">我的</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
import {
  getAllProject,
  getShopCart,
  severs,
  getBanner,
  login,
  isExist,
  accessRegister,
  getProduct
} from "../../src/api/login";
import { mapState, mapActions, mapGetters } from "vuex";
import { Waterfall } from "vant";
import Swiper from "./swiper";
import Active from "./active";
import { Toast } from "vant";
import util from "../utils";
import cookie from "../components/im/utils/cookie";
import { Dialog } from "vant";
import utils from "../utils/utils";
export default {
  name: "home",
  components: {
    Swiper,
    Active
  },
  data() {
    return {
      shop_infos: "",
      tabarActive: 0,
      value: null,
      active: 0,
      severs: severs(),
      info: "0",
      tabs: "推荐",
      account: "",
      sdktoken: "",
      activeTitle: null,
      path: "../../static/images/",
      imageList: [],
      disabled: false,
      count: 0,
      images: [],
      iswx: localStorage.getItem("iswx"),
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      title: state => state.home.tab.title,
      bageTitle: state => state.home.badge.title,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info
    }),
    sysMsgUnread() {
      let temp = this.$store.state.sysMsgUnread;
      let sysMsgUnread = temp.addFriend || 0;
      sysMsgUnread += temp.team || 0;
      let customSysMsgUnread = this.$store.state.customSysMsgUnread;
      return sysMsgUnread + customSysMsgUnread;
    },
    userInfos() {
      return this.$store.state.userInfos;
    },
    myInfo() {
      var number;
      var sesessionlist = Number(this.$store.state.sessionlist.length);
      if (sesessionlist == 0) {
        number = "";
      } else {
        number = sesessionlist;
      }
      return number;
    },
    myPhoneId() {
      return `${this.$store.state.userUID}`;
    },
    sessionlist() {
      let sessionlist = this.$store.state.sessionlist.filter(item => {
        item.name = "";
        item.avatar = "";
        if (item.scene === "p2p") {
          let userInfo = null;
          if (item.to !== this.myPhoneId) {
            userInfo = this.userInfos[item.to];
          } else {
            // userInfo = this.myInfo
            // userInfo.alias = '我的手机'
            // userInfo.avatar = `${config.myPhoneIcon}`
            return false;
          }
          if (userInfo) {
            item.name = util.getFriendAlias(userInfo);
            item.avatar = userInfo.avatar;
          }
        } else if (item.scene === "team") {
          let teamInfo = null;
          teamInfo = this.$store.state.teamlist.find(team => {
            return team.teamId === item.to;
          });
          if (teamInfo) {
            item.name = teamInfo.name;
            item.avatar =
              teamInfo.avatar ||
              (teamInfo.type === "normal"
                ? this.myGroupIcon
                : this.myAdvancedIcon);
          } else {
            item.name = `群${item.to}`;
            item.avatar = item.avatar || this.myGroupIcon;
          }
        }
        let lastMsg = item.lastMsg || {};
        if (lastMsg.type === "text") {
          item.lastMsgShow = lastMsg.text || "";
        } else if (lastMsg.type === "custom") {
          item.lastMsgShow = util.parseCustomMsg(lastMsg);
        } else if (
          lastMsg.scene === "team" &&
          lastMsg.type === "notification"
        ) {
          item.lastMsgShow = util.generateTeamSysmMsg(lastMsg);
        } else if (util.mapMsgType(lastMsg)) {
          item.lastMsgShow = `[${util.mapMsgType(lastMsg)}]`;
        } else {
          item.lastMsgShow = "";
        }
        if (item.updateTime) {
          item.updateTimeShow = util.formatDate(item.updateTime, true);
        }
        return item;
      });
      return sessionlist;
    }
  },
  watch: {
    myInfo() {
      // console.log("watch", this.$store.state.myInfo);
    }
  },
  mounted() {
    this.banner();
  },
  methods: {
    ...mapActions(["infoAction"]),
    ...mapActions(["newtoken"]),
    goToLink(link) {
      this.$router.push(`${link}`);
    },
    getProducts() {
      getProduct().then(res => {
        // console.log(res);
        switch (this.tabs) {
          case "推荐":
            this.imageList = res;
            break;
          case "手机":
            var productType = "1";
            var mockUsers = res.filter(user => {
              if (productType && user.productType.indexOf(productType) == -1)
                return false;
              return true;
            });
            this.imageList = mockUsers;
            break;
          case "穿戴":
            var productType = "2";
            var mockUsers = res.filter(user => {
              if (productType && user.productType.indexOf(productType) == -1)
                return false;
              return true;
            });
            this.imageList = mockUsers;
            break;
          case "健康":
            var productType = "3";
            var mockUsers = res.filter(user => {
              if (productType && user.productType.indexOf(productType) == -1)
                return false;
              return true;
            });
            this.imageList = mockUsers;
            break;
          default:
            break;
        }
      });
    },
    changeTab(e) {
      this.tabs = this.title[e + 1];
      this.getProducts();
    },
    banner() {
      getBanner().then(res => {
        // console.log(res.code)
        setTimeout(() => {
          this.images = res;
          if (localStorage.getItem("token") !== null) {
            this.getShopCart1();
            //  this.$store.dispatch('initNimSDK', loginInfo)
          } else {
            // this.infoAction()
            localStorage.removeItem("getShopCarts");
            this.getProducts();
          }
        }, 500);
      });
    },
    buys(img) {
      img.id = Number(img.remarks);
      if (img.id) {
        localStorage.setItem("productId", JSON.stringify(img.id));
        this.$router.push("/goods/" + Number(img.id) + "/buy");
      }
    },
    buy(img) {
      localStorage.setItem("productId", JSON.stringify(img.id));
      this.$router.push("/goods/" + img.id + "/buy");
    },
    chatlogin() {
      cookie.setCookie("uid", this.account);
      cookie.setCookie("sdktoken", this.sdktoken);
      // this.$store.dispatch('connect',true)
      let loginInfo = {
        uid: cookie.readCookie("uid"),
        sdktoken: cookie.readCookie("sdktoken")
      };
       setTimeout(() => {
          this.$store.dispatch("initNimSDK", loginInfo);
          this.redirects("/");
          //  Toast("登录成功");
        }, 1000);
      // dispatch('initNimSDK', loginInfo)
    
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
          let loginInfo = {
            uid: cookie.readCookie("uid"),
            sdktoken: cookie.readCookie("sdktoken")
          };
          if (res.data.code == "1008") {
            // thisss.infoAction()
            localStorage.removeItem("getShopCarts");
            thisss.getProducts();
          } else {
            localStorage.setItem(
              "getShopCarts",
              JSON.stringify(res.data.data.shopCart)
            );
            thisss.info = JSON.parse(
              localStorage.getItem("getShopCarts")
            ).length;
            thisss.getProducts();
          }
        })
        .catch(function(res) {
          // thisss.infoAction()
        });
    },
    onClickLeft() {
      let parmas = {
        indexBack: true,
        orderNo: "",
        token: JSON.parse(localStorage.getItem("token"))
      };
      if (this.$CheckIsIOS) {
        share(parmas);
      } else {
        window.control.jsonData(JSON.stringify(parmas));
      }
    },
    onClickRight() {
      // Toast("暂无");
    },
    onRefresh() {
      setTimeout(() => {
        this.banner();
        this.$toast("刷新成功");
        this.isLoading = false;
        // this.count++;
      }, 500);
    },
    // 瀑布流方法
    loadMore() {
      this.disabled = false;
      // setTimeout(() => {
      //   for (let i = 0; i < 5; i++) {
      //     this.imageList.push(this.imageList[i]);
      //   }
      //   this.disabled = false;
      // }, 200);
    },
    redirects(url) {
      this.$router.push(url);
    },
    im() {
      // console.log( this.$store.state.sessionlist[0].id)

      var session = "p2p-admin";
      // if (session)
      // p2p-123456
      location.href = `#/chat/${session}`;
      // this.$router.push('/session')
    },
    tip() {
      Toast("网络错误o(╥﹏╥)o 请稍后再试~");
    }
  },
  watch: {},
  directives: {
    //瀑布流
    WaterfallLower: Waterfall("lower"),
    tab: {
      inserted(el) {
        //绑定tab样式
      }
    },
    //tabBar 消息通知指令
    infos: {
      inserted(el, obj) {
        // console.log(obj.value);
        const info = el.childNodes[0].childNodes[1];
        info.innerText = obj.value;
      }
    }
  },
  beforeCreate() {},
  created() {
    if (this.iswx=='true') {
      if (localStorage.getItem("token") !== null) {
        let loginInfo = {
          uid: cookie.readCookie("uid"),
          sdktoken: cookie.readCookie("sdktoken")
        };
        setTimeout(() => {
          this.$store.dispatch("initNimSDK", loginInfo);
        }, 1000);
      }
    } else {
        if (utils.getUrlKey("iphone")) {
          let iphone = utils.getUrlKey("iphone");
          let password = utils.getUrlKey("password");
          const para = {
            mobile: iphone,
            password: password
          };
          isExist(para).then(res => {
            if (res) {
              if (res.token) {
              localStorage.setItem('token', JSON.stringify(res.token))
              this.account = res.mobile
              this.sdktoken = res.md5Password
              this.newtoken()
              this.chatlogin()
              } 
          
            } else {
              Dialog.confirm({
                title: "授权绑定",
                message: "微商城申请获取你小翔智伴绑定的手机号：" + iphone
              })
                .then(() => {
                  // on confirm
                  const para = {
                    mobile: iphone,
                    password: password
                  };
                  accessRegister(para).then(res => {
                    if (res) {
                      localStorage.setItem("token", JSON.stringify(res.token));
                      this.account = res.mobile;
                      this.sdktoken = res.md5Password;
                      this.newtoken();
                      this.chatlogin();
                    }else{
                       Toast("Error")
                    }
                  });
                })
                .catch(() => {
                   Toast("取消授权")
                   localStorage.clear()
                  // on cancel
                });
            }
          });
        }
      
    }

    //  console.log('created', this.$store.state.msgs)
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/home.less");
@import url("../assets/css/goods.less");
</style>
<style scoped>
#app >>> .van-nav-bar__text {
  color: #323232;
}
#app >>> .van-nav-bar .van-icon {
  color: #323232;
}
#app >>> .van-swipe__indicator {
  background-color: transparent;
  border: 1px solid #fff;
}
#app >>> .van-swipe__indicator--active {
  background-color: #fff;
}

#app >>> .van-tabbar {
  width: 25%;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  left: 15px;
  bottom: 10px;
}
#app >>> .van-tabbar-item {
  color: #fff;
}
#app >>> .van-tab--active {
  color: #b39061;
}
#app >>> .van-tabs__line {
  background-color: #b39061;
}
/* #app >>> .van-icon-shopping-cart::before{
   content: url(../assets/img/home_icon_shopping.png);
} */
#app >>> .init-header .van-info {
  border: none;
}
#app >>> .lists.van-row {
  width: 30.333333%;
  float: left;
  margin-left: 2%;
}
#app >>> .contain .van-col--8 {
  width: 100%;
}
</style>
