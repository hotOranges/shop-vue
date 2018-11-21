<template>
  <div id="apps">
        <van-nav-bar
  class="init-header"
  title="退货详情"
  left-arrow
  @click-left="onClickLeft"
>
</van-nav-bar>
<van-steps
  :active="active"
  icon=""
  title="退款成功"
  description=""
>
  <van-step>提交申请</van-step>
  <van-step>卖家收货</van-step>
  <van-step>退款</van-step>
</van-steps>
<van-cell-group>
  <van-cell title="商品信息" />
</van-cell-group>
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
  <van-cell-group id="init-border" style="">
       <van-cell title="" value="申请数量：1" />
  </van-cell-group>
  <div class="init-border-20"></div>
  <van-cell-group id="table">
  <van-cell title="服务单号：xxxxxxxxx"  />
  <van-cell title="申请时间：2018-11-11 18:58"  />
  <van-cell title="售后类型：退货"  />
  <van-cell title="售后原因：不想要了"  />
  <van-cell title="退款方式：原返"  />
  <van-cell title="退货方式：快递到新翔"  />
  <van-cell title="商家" class="init-title" />
  <van-cell title="吴先生" value="021-3468-3561" />
  <van-cell value="上海市闵行区沪闵路7866弄莲花国际广场1号楼1201室" />
  <van-cell title="寄件人手机号：18888888888"  />
  <van-cell title="自己" class="init-title" />
  <van-cell title="喵酱" value="1888888888888" />
  <van-cell value="上海市闵行区沪闵路7866弄莲花国际广场1号楼1201室" />




</van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
        active:''
    };
  },

//   components: {},

//   computed: {},

//   mounted: {},

  methods: {
       onClickLeft(){
        this.$router.back(-1);
    },
  }
}

</script>
<style scoped>
#apps >>> .van-steps__title{
    color: #fff;
    font-size: 16px;
}
#apps >>> .van-step--horizontal .van-step__title{
    padding-top: 30px;
    color: #fff 
}
#apps >>> .van-steps.van-steps--horizontal{
    background-color: #F8A330
}
#apps >>> .van-step--horizontal .van-step__circle-container{
    background-color: transparent
}
#apps >>> .van-step--horizontal .van-step__circle-container{
    padding: 0;
    left: 0;
    top: 13px;
    /* right: 0; */
}
#apps >>> .van-step .van-step__circle{
    background-color: #fff;
    width: 7px;
    height: 7px;
}
#apps >>> .van-step--horizontal.van-step--process .van-icon{
    top: -3px
}
#apps >>> .van-step--horizontal .van-step__line{
    top: 15px;
    height: 2px;
}
#apps >>> .van-step--horizontal:last-child {
    right: 0px;
}
#apps >>> .van-step--horizontal:last-child .van-step__title{
    margin-left: -17px;
}    
#apps >>> .van-steps__items{
    width: 80%;
    margin: 20px auto;
}
#apps >>> .imgList img{
  width: 100%
}

#apps >>> .init-soller-list2{
  padding-bottom: 0px;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
#apps >>> .van-col--offset-2 span{
    font-size: 13px;
    display: inline-block;
    padding-bottom: 5px;
}
#apps >>> #init-border .van-cell__value--alone{
    text-align: right;
    padding-right: 15px;
}
#apps >>> .van-steps__message{
    height: 25px;
    margin: 3px 0;
}
#apps >>> .van-cell{
    padding: 5px 15px;
    line-height: 18px;
    color: #6B6B6B;
    font-size: 13px;
}
#apps >>> .van-cell::after{
   border: 1px solid #D8D8D8;
   transform: scaleY(.4);
   left: 0px;
}
#apps >>> .init-border-20{
  background:rgba(242,242,242,1);
  height: 10px;
  position: relative;
  width: 100%
}
#apps >>> #table .van-cell{
    line-height: 31px;
}
#apps >>> .init-title  .van-cell__title{
    color: #000
} 
</style>
