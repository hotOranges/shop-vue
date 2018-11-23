
<template>
  <div id="apps">
  <van-nav-bar
  class="init-header"
  title="申请售后"
  left-text=""
  right-text="提交"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
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
      <span style="float:left;line-height: 35px;font-size: 14px">申请数量</span>
      <van-stepper v-model="value" integer
  :min="1"
  :max="40"
  :step="1" />
  </van-cell-group>
  <van-cell class="custom-text">
  <template slot="title">
   <span>售后类型</span>
  </template>
</van-cell>
<van-cell @click="Actionsheet">
  <template slot="title" >
   <span class="init-text-1">退货</span>
   <span class="init-text">{{Returns}}</span>
  </template>
</van-cell>
<van-actionsheet v-model="show" title="申请原因" >
  <van-radio-group v-model="radio">
  <van-cell-group>
    <van-cell  v-for="img in reason" :key='img.value' :title="img.label" clickable @click="">
      <van-radio :name="img.value" />
    </van-cell>
  </van-cell-group>
</van-radio-group>
<van-button size="large" @click="confirm">确定</van-button>
</van-actionsheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value:1,
      show:false,
      radio:1,
      Returns:'已收货，需要退回该商品',
      reason:[
        { value: 1, label: "商品损坏" },
        { value: 2, label: "质量问题" },
        { value: 3, label: "发错货" },
        { value: 4, label: "不想要了" },
        { value: 5, label: "七天无理由退换货" },
      ]
    };
  },

  components: {},

  computed: {},

  mounted(){},

  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    Actionsheet(){
      this.show = true
    },
    confirm(){
     var filters = this.reason.filter(item =>{
         if (item.value===this.radio) {
           return item
         }
      })
      this.Returns = filters[0].label
      this.show = false
    },
    onClickRight(){
      this.$router.push('/AFASDetil')
    }
  }
};
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
#init-border {
  padding-left: 40px;
  padding-right: 25px;
}
#init-border >>> .van-stepper{
  float: right;
}
#apps >>> .van-hairline--top-bottom::after{
  border-width:0
}
#apps >>> .custom-text{
  background:rgba(242,242,242,1);
}
.init-text{
  color:rgba(107,107,107,1);
  float: right;
  font-size: 12px;
}
.init-text-1{
  padding-left: 7px
}
#apps >>> .van-button--default{
  background:rgba(179,144,97,1);
  color: #fff
}
#apps >>> .van-radio .van-icon-checked {
  color: #cf3939;
}
#apps >>> .van-actionsheet__header .van-icon-close{
  display: none
}
#apps >>> .van-nav-bar .van-icon{
    color: #2c3e50
}
#apps >>> .van-nav-bar__text{
  color: #cf3939
}
</style>
