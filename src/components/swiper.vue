<template>
   <div>
    <!-- 轮播组件 -->
    <van-row>
      <van-col span="24">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <!-- <img v-lazy="image" style="width:100%;height:160px;" @click.stop="redirect('/goods/id_0')"/> -->
                <img :src=" 'http://'+image.url+ image.avatar" style="width:100%;" />
            </van-swipe-item>
        </van-swipe>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getBanner } from "../../src/api/login";
import { Toast } from "vant";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "swiper",
  data() {
    return {
      value: null,
      active: null,
      images: []
    };
  },

  computed: {
    ...mapState({
      src: state => state.home.lunbo.src
    })
  },
  methods: {
    redirect(url) {
      this.$router.push(url);
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {
      // console.log(this.tabs)
      getBanner().then(res => {
        // console.log(res.code)
          this.images = res;
          // console.log(res.data)
      })
    // this.axios.get("./static/data.json").then(
    //   res => {
    //     if (res.status == 200) {
    //       const data = res.data.home.lunbo;
    //       this.images = data.home;
    //       // if(this.tabs == '今日推荐') {
    //       //      this.images = data.home;
    //       //  }else if(this.tabs == '美妆'){
    //       //      this.images = data.meizhuang;
    //       //  }else if(this.tabs == '家电') {
    //       //      this.images = data.jiadian;
    //       //  }else if(this.tabs == '家居') {
    //       //      this.images = data.jiaju;
    //       //  }else if(this.tabs == '国际') {
    //       //      this.images = data.guoji;
    //       //  }else if(this.tabs == '生活') {
    //       //      this.images = data.shenghuo;
    //       //  }else{
    //       //      this.images = this.src;
    //       //   }
    //     } else {
    //       this.images = this.src;
    //     }
    //   },
    //   err => {
    //     this.images = this.src;
    //   }
    // );
  },
  created() {}
};
</script>


