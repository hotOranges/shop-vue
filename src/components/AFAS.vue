
<template>
  <div id="apps">
  <van-nav-bar
  class="init-header"
  title="申请售后"
  left-text=""
  left-arrow
  @click-left="onClickLeft"
/>
<div class="init-soller-list2">
  <van-col span='7' offset="2" class="imgList">
       <img :src="imgsevers+'/image/'+formdata.productImage" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList">
        <span>{{formdata.productName}}</span>
        <span>数量：{{formdata.productSumNum}} 规格：{{formdata.productColor}}</span>
        <span>￥{{formdata.price}}</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList">
      <span style="font-size: 11px;"></span>
  </van-col>
  </div>
 <van-cell-group id="init-border">
      <span style="float:left;line-height: 35px;font-size: 14px">申请数量</span>
      <van-stepper v-model="value" integer
  :min="1"
  disable-input
  :max="formdata.afterSaleNum"
  :step="1" />
  </van-cell-group>
  <van-cell class="custom-text">
  <template slot="title">
   <span>售后类型</span>
  </template>
</van-cell>
<van-cell @click="Actionsheet(1)">
  <template slot="title" >
   <span class="init-text-1">退货</span>
   <span class="init-text">{{Returns}}</span>
  </template>
</van-cell>
<van-cell @click="Actionsheet(2)">
  <template slot="title" >
   <span class="init-text-1">换货</span>
   <span class="init-text">{{Returns2}}</span>
  </template>
</van-cell>
<van-cell @click="Actionsheet(3)">
  <template slot="title" >
   <span class="init-text-1">维修</span>
   <span class="init-text">{{Returns3}}</span>
  </template>
</van-cell>
<van-actionsheet v-model="show" :title="ReturnsTitle" >
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
import {applyPage,severs,imgsevers} from '../api/login'
export default {
  data() {
    return {
      value:1,
      sheet:'',
      show:false,
      radio:1,
      severs:severs(),
      imgsevers:imgsevers(),
      formdata:'',
      id:'',
      ReturnsTitle:'',
      Returns:'已收货，需要退回该商品',
      Returns2:'已收货，需要更换已收到的商品',
      Returns3:'已收货，需要维修已收到的商品',
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

  mounted(){
     this.id =  this.$route.query.id;
     this.inits()
  },

  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    inits(){
      let para = {
        detailId:this.id,
        token:JSON.parse(localStorage.getItem('token'))
      }
      applyPage(para).then(res =>{
        console.log(res)
        this.formdata = res
      })
    },
    Actionsheet(e){
      this.sheet = e
      if (e==1) {
        this.reason = [
            { value: 1, label: "商品损坏" },
            { value: 2, label: "质量问题" },
            { value: 3, label: "发错货" },
            { value: 4, label: "不想要了" },
            { value: 5, label: "七天无理由退换货" },
          ]
         this.ReturnsTitle ='退货' 
      } else if(e==2){
         this.reason = [
            { value: 1, label: "商品损坏" },
            { value: 2, label: "质量问题" },
            { value: 3, label: "发错货" },
            { value: 4, label: "缺少件" },
            { value: 5, label: "七天无理由退换货" },
          ]
          this.ReturnsTitle ='换货' 
      }else{
         this.reason = [
            { value: 1, label: "商品故障" },
            { value: 2, label: "其他" },
          ]
          this.ReturnsTitle ='维修'   
      }
      this.show = true
    },
    confirm(){
     var filters = this.reason.filter(item =>{
         if (item.value===this.radio) {
           return item
         }
      })
      var saleReason;
      if (this.sheet == 1) {
        this.Returns = filters[0].label
        saleReason = filters[0].label
      }else if(this.sheet == 2){
        this.Returns2 = filters[0].label
        saleReason = filters[0].label
      }else {
        this.Returns3 = filters[0].label
        saleReason = filters[0].label
      }
      this.show = false
      var applyServiceData = []
      applyServiceData.push({
        productId:this.formdata.productId,
        productNum:this.formdata.productSumNum,
        saleNum:this.value,
        saleReason:saleReason,
        saleType:this.sheet,
        price:this.formdata.price,
        orderNo:this.formdata.orderNo,
        productImage:this.formdata.productImage,
        productName:this.formdata.productName,
        productColor:this.formdata.productColor,
        detailId:this.id
      })
      
      localStorage.setItem("applyServiceData",JSON.stringify(applyServiceData));
      this.$router.push('/AFASDetil')
    }
    
  }
};
</script>
<style scoped>
#apps >>> .imgList img {
  width: 100%;
  margin-top: 10px;
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
