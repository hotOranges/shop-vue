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
  :title="typeTexts"
  description=""
>
  <van-step v-for="(item, index) in items" :key="index">{{item.val}}</van-step>
</van-steps>
<van-cell-group>
  <van-cell title="商品信息" />
</van-cell-group>
<div class="init-soller-list2">
  <van-col span='7' offset="2" class="imgList">
      <img :src="imgsevers+'/image/'+formdata.productImage" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList">
        <span>{{formdata.productName}}</span>
        <span>数量：{{formdata.productNum}} 规格：{{formdata.productColor}}</span>
        <span>￥{{formdata.productPrice}}</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList">
      <span style="font-size: 11px;"></span>
  </van-col>
  </div>
  <van-cell-group id="init-border">
       <van-cell title="" :value="'申请数量：'+formdata.productNum" />
  </van-cell-group>
  <div class="init-border-20"></div>
  <van-cell-group id="table">
  <van-cell :title="'服务单号：'+formdata.saleServiceNo"  />
  <van-cell :title="'申请时间：'+formdata.applyTime"  />
  <van-cell :title="'售后类型：'+typeText(formdata.saleType)"  />
  <van-cell :title="'售后原因：'+formdata.saleReason"  />
  <van-cell title="退款方式：原返"  />
  <van-cell title="退货方式：快递到新翔"  />
  <van-cell title="商家" class="init-title" />
  <van-cell title="吴先生" value="021-3468-3561" />
  <van-cell value="上海市闵行区沪闵路7866弄莲花国际广场1号楼1201室" />
  <van-cell :title="'寄件人手机号：'+formdata.senderPhone"  />
  <van-cell title="自己" class="init-title" />
  <van-cell :title="formdata.consigneeName" :value="formdata.consigneePhone" />
  <van-cell :value="formdata.consigneeAddress" />
</van-cell-group>
  </div>
</template>

<script>
import {saleDetail,severs,imgsevers} from '../api/login'
import { Toast } from "vant";
export default {
  data() {
    return {
      active:0,
      saleId:'',
      typeTitle:'',
      severs:severs(),
      imgsevers:imgsevers(),
      formdata:'',
      typeTexts:'',
      items:''
    };
  },

  //   components: {},

  //   computed: {},

  //   mounted: {},
  mounted(){
    this.saleId =  this.$route.query.saleId;
    this.inits()
  },
  methods: {
    inits(){
       let para = {
        saleId:this.saleId,
        token:JSON.parse(localStorage.getItem('token'))
      }
      saleDetail(para).then(res =>{
       if (res) {
         this.formdata = res
         if (res.saleType=='1') {
           if (res.saleStatus=='1') {
              this.items = [
              {val:'提交申请'},
              {val:'卖家收货'},
            ]
            this.typeTexts ='正在进行中…'
             this.active =0
           }else if(res.saleStatus=='2'){
           
              this.items = [
              {val:'提交申请'},
              {val:'卖家收货'},
              {val:'退款'}
              ]
              this.active =1
              this.typeTexts ='正在进行中…'
           } else if(res.saleStatus=='3'){
              this.items = [
              {val:'提交申请'},
              {val:'卖家收货'},
              {val:'退款'}
              ]
              this.active =2
              this.typeTexts ='退款成功'
           }
         }else if(res.saleType=='2'){
            if (res.saleStatus=='1') {
             
              this.items = [
              {val:'提交申请'},
              {val:'换货'},
            ]
            this.typeTexts ='正在进行中…'
             this.active =0
           }else if(res.saleStatus=='2'){
             
              this.items = [
              {val:'提交申请'},
              {val:'换货'},
              {val:'退款'}
              ]
              this.active =1
              this.typeTexts ='正在进行中…'
           } else if(res.saleStatus=='3'){
              this.items = [
              {val:'提交申请'},
              {val:'换货'},
              {val:'退款'}
              ]
              this.active =2
              this.typeTexts ='换货成功'
           }
         }else if(res.saleType=='3'){
            if (res.saleStatus=='1') {
           
              this.items = [
              {val:'提交申请'},
              {val:'收货'},
            ]
            this.typeTexts ='正在进行中…'
             this.active =0
           }else if(res.saleStatus=='2'){
             
              this.items = [
              {val:'提交申请'},
              {val:'收货'},
              {val:'维修'}
              ]
              this.active =1
              this.typeTexts ='正在进行中…'
           } else if(res.saleStatus=='3'){
              this.items = [
              {val:'提交申请'},
              {val:'收货'},
              {val:'维修'}
              ]
              this.active =2
              this.typeTexts ='换货成功'
           }
         }
        }
      })
    },
     typeText(i){
      var text;
      if (i=='1') {
        text = '退货'
      }else if (i=='2') {
        text = '换货'
      }else{
        text = '维修'
      }
      return text
    },
    onClickLeft() {
      this.$router.back(-1);
    }
  }
};
</script>
<style scoped>

 #apps >>> .van-steps__title {
  color: #fff;
  font-size: 16px;
}
#apps >>> .van-step--horizontal .van-step__title {
  padding-top: 30px;
  color: #fff;
}
#apps >>> .van-steps.van-steps--horizontal {
  background-color: #f8a330;
}
#apps >>> .van-step--horizontal .van-step__circle-container {
  background-color: #f8a330;
}
#apps >>> .van-step--horizontal .van-step__circle-container {
  top: 13px;
  
}

#apps >>> .van-step--horizontal.van-step--process .van-icon {
  top: -3px;
  
}
#apps >>> .van-step--horizontal .van-step__line {
  top: 15px;
}

#apps >>> .van-step .van-step__circle{
  background-color: #fff
}
#apps >>> .van-step--horizontal:last-child .van-step__title {

  color: #fff !important
}
#apps >>> .van-steps__items {
  width: 80%;
  margin: 20px auto;
}
#apps >>> .imgList img {
  width: 100%;
}
#apps >>> .van-step--horizontal.van-step--finish .van-step__circle, .van-step--horizontal.van-step--finish .van-step__line{
      background-color: #4b0 !important;
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
#apps >>> .van-steps__message {
  height: 25px;
  margin: 3px 0;
}
#apps >>> .van-cell {
  padding: 5px 15px;
  line-height: 18px;
  color: #6b6b6b;
  font-size: 13px;
}
#apps >>> .van-cell::after {
  border: 1px solid #d8d8d8;
  transform: scaleY(0.4);
  left: 0px;
}
#apps >>> .init-border-20 {
  background: rgba(242, 242, 242, 1);
  height: 10px;
  position: relative;
  width: 100%;
}
#apps >>> #table .van-cell {
  line-height: 31px;
}
#apps >>> .init-title .van-cell__title {
  color: #000;
}
#apps >>> .van-nav-bar .van-icon{
    color: #2c3e50
}
#apps >>> .van-step--horizontal:last-child .van-step__circle-container {
    left: auto;
    right: -10px;
} 
</style>
