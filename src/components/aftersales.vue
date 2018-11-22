<template>
  <div id="apps">
      <van-nav-bar
  class="init-header"
  title="退换/售后"
  left-arrow
  @click-left="onClickLeft"
>
</van-nav-bar>
 <div class="init-list">
  <van-cell-group>
  <van-cell title="2018-11-03 12:56" value="退货" />
  </van-cell-group>
  <div class="init-soller-list2">
  <van-col span='5' offset="2" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList">
      <span>翼贝贝儿童手表T8S</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList">
      <span style="font-size: 11px;">X1</span>
  </van-col>
  </div>
  <van-cell-group id="init-border">
  <div span='4' offset="1" class="btn">
      <button @click="redirects('aftersalesDetil')">查看详情</button>
  </div>
 
  </van-cell-group>
  
  <div class="init-clear"></div>
  
  </div>
  <div class="init-border-20"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    redirects(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
#apps >>> .van-cell__title,
.van-cell__value {
  text-align: left;
}
#apps >>> .imgList img {
  width: 100%;
}

#apps >>> .init-soller-list2 {
  padding-bottom: 5px;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
#apps >>> .van-col--offset-1 {
  display: inline-table;
  vertical-align: top;
  float: inherit;
}
/*掩藏滚动条*/
::-webkit-scrollbar {
  display: none !important;
}
#apps .btn {
  float: right;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 10px;
  padding-bottom: 10px;
}
#apps .btn button {
  font-weight: 500;
  color: rgba(179, 144, 97, 1);
  background-color: transparent;
  border: 1px solid #b39061;
  line-height: 31px;
  border-radius: 3px;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
}
#apps >>> .van-col--4 {
  text-align: right;
  padding-right: 11px;
  line-height: 28px;
}
#apps >>> .van-hairline--top-bottom::after {
  border-color: #d8d8d8;
}
#apps >>> .init-border ::before {
  border-bottom: 1px solid #d8d8d8;
}
#apps >>> #init-border::after {
  transform: scale(0.3);
}
#apps >>> .init-clear {
  clear: both;
}
#apps >>> .init-border-20 {
  background: rgba(242, 242, 242, 1);
  height: 20px;
  position: relative;
  width: 100%;
}
</style>