<template>
   <!-- 首页组件 -->
  <div id="app">
     <!-- 搜索区 -->
     
<van-nav-bar
  class="init-header"
  title="商城"
  left-text=""
  left-arrow
  @click-left="onClickLeft"
>
<van-icon name="chat" slot="right" info="8"/>
</van-nav-bar>
    <!-- 标签区域 -->
    <van-row>
      <van-col span="24">
        <van-tabs v-model="active" swipeable v-tab>
          <van-tab v-for="index in 7" 
          :title="title[index]" 
          :key="index.id" 
          class="tab"
          >
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

            <!-- 今日推荐版块 -->
            <div class="contain">
               <!-- 轮播 -->
                <swiper class="swiper"  />
              <!-- 活动版块 -->
              <div class="sort">
                <span>智能热卖</span>
                <span class="sort-tab">
                  <button>价格</button>
                  <button>销量</button>
                </span>
              </div>
                <active  />
            </div>

         
             </van-pull-refresh>   
              </van-tab>
         </van-tabs>
      </van-col>
    </van-row>

    <!-- tabBar -->
      <van-tabbar v-model="tabarActive">
        <van-tabbar-item  icon="contact" @click="redirects('/Me')"></van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" info="5" v-infos="shop_info" @click="redirects('/shoppingCart')"></van-tabbar-item>
        <!-- <van-tabbar-item icon="contact" info="2" v-infos="my_info" @click="redirects('/me')">我的</van-tabbar-item> -->
      </van-tabbar>
    </div>

</template>

<script>
import { getAllProject } from "../../src/api/login";
import { mapState, mapActions, mapGetters } from "vuex";
import { Waterfall } from "vant";
import Swiper from "./swiper";
import Active from "./active";
import { Toast } from "vant";

export default {
  name: "home",
  components: {
    Swiper,
    Active
  },
  data() {
    return {
      tabarActive: 0,
      value: null,
      active: 0,
      path: "../../static/images/",
      imageList: [],
      disabled: false,
      count: 0,
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      title: state => state.home.tab.title,
      icon: state => state.home.badge.icon,
      bageTitle: state => state.home.badge.title,
      src: state => state.home.lunbo.src,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info
    })
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },

    onClickRight() {
      Toast("客服");
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    // 瀑布流方法
    loadMore() {
      this.disabled = true;
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.imageList.push(this.imageList[i]);
        }
        this.disabled = false;
      }, 200);
    },
    redirects(url) {
      this.$router.push(url);
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
        console.log(obj.value);
        const info = el.childNodes[0].childNodes[1];
        info.innerText = obj.value;
      }
    }
  },
  beforeCreate() {
    this.axios.get("./static/data.json").then(
      res => {
        if (res.status == 200) {
          const data = res.data.home;
        } else {
          this.imageList = this.src;
        }
      },
      err => {
        this.imageList = this.src;
      }
    );
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import url("../assets/css/home.less");
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
</style>

