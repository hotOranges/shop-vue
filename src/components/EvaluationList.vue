<!--  -->
<template>
  <div id="apps">
           <van-nav-bar
  class="init-header"
  title="评价晒单"
  left-arrow
  @click-left="onClickLeft"
 />
 <div>
      <div class="init-soller-list2">
  <van-col span='7' offset="2" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList">
        <span>翼贝贝儿童手表T8S</span>
        <span>数量：1 规格：黑色</span>
        <span>￥499.00</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList">
      <span style="font-size: 11px;"></span>
  </van-col>
  </div>
  <van-cell-group id="init-border">
  <div span='4' offset="1" class="btn">
      <button @click="redirects('Evaluation')">评价晒单</button>
  </div>
  </van-cell-group>
  <div class="init-clear"></div>
   <div class="init-border-20"></div>
   </div>


   <div>
      <div class="init-soller-list2">
  <van-col span='7' offset="2" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList">
        <span>翼贝贝儿童手表T8S</span>
        <span>数量：1 规格：黑色</span>
        <span>￥499.00</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList">
      <span style="font-size: 11px;"></span>
  </van-col>
  </div>
  <van-cell-group id="init-border">
  <div span='4' offset="1" class="btn">
      <button @click="redirects('Evaluation')">评价晒单</button>
  </div>
  </van-cell-group>
  <div class="init-clear"></div>
   <div class="init-border-20"></div>
   </div>
   <div>
      <div class="init-soller-list2">
  <van-col span='7' offset="2" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList">
        <span>翼贝贝儿童手表T8S</span>
        <span>数量：1 规格：黑色</span>
        <span>￥499.00</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList">
      <span style="font-size: 11px;"></span>
  </van-col>
  </div>
  <van-cell-group id="init-border">
  <div span='4' offset="1" class="btn">
      <button @click="redirects('Evaluation')">评价晒单</button>
  </div>
  </van-cell-group>
  <div class="init-clear"></div>
   <div class="init-border-20"></div>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
       onClickLeft() {
      this.$router.back(-1);
    },
     redirects(url) {
      this.$router.push(url);
    },
  }
}

</script>
<style scoped>
#apps >>> .imgList img {
  width: 100%;
}

#apps >>> .init-soller-list2 {
  padding-bottom: 0px;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
#apps >>> .van-col--offset-2 span {
  font-size: 13px;
  display: inline-block;
  padding-bottom: 5px;
}
#apps >>> #init-border .van-cell__value--alone {
  text-align: right;
  padding-right: 15px;
}
#apps .btn {
    margin-left: 8px;
    margin-right: 8px;
    margin-top: -20px;
    padding-bottom: 10px;
    text-align: right;
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
#apps >>> .van-nav-bar .van-icon{
    color: #2c3e50
}
</style>
