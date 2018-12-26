<template>
  <div id="apps">
       <van-nav-bar
  class="init-header"
  title="申请售后"
  left-text=""
  right-text=""
  left-arrow
  @click-left="onClickLeft"
/>
      <div class="init-soller-list2">
  <van-col span='7' offset="2" class="imgList">
      <img  :src="imgsevers+'/image/'+formdata.productImage" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList">
        <span>{{formdata.productName}}</span>
        <span>数量：{{formdata.productNum}} 规格：{{formdata.productColor}}</span>
        <span>￥{{formdata.price}}</span>
  </van-col> 
  <van-col span='4' offset="2" class="imgList">
      <span style="font-size: 11px;"></span>
  </van-col>
  </div>
  <van-cell-group id="init-border">
       <van-cell title=""  :value="'申请数量'+formdata.saleNum" />
  </van-cell-group>
   <van-cell title="申请原因" :value="formdata.saleReason" class="custom-text" />
   <van-cell>
  <template slot="title">
   <span>退货方式 :</span>
   <span>快递到新翔</span>
  </template>
</van-cell>
<van-cell-group>
<van-cell value="" class="custom-text">
   <template>
    <p>商家地址</p> 
    <p><span>吴先生</span><span style="float:right">021-3468-3561</span></p>
    <p>深圳市宝安区大浪街道办英泰工业中心南方明珠科技园4楼</p>
   </template>
</van-cell>  
</van-cell-group>
<van-cell>
    <template>
        <van-row>
        <van-col span="8"><span>联系人手机号</span></van-col>
        <van-col span="15"><van-field v-model="value" placeholder="寄件人手机号（必填）" /></van-col>
       <van-col span="1"><van-icon  name="question2" color="#D12929" class="custom-icon" /></van-col>    
        </van-row>
</template>
</van-cell>
<van-cell v-if="list.length>0" @click="address" >
     <h5 style="font-weight: 400; padding: 0;margin: 0;color: #333;font-size: 14px;">收货地址</h5>
     <van-address-list
  v-model="chosenAddressId"
  :list="list"
  :switchable ="false"
/>
</van-cell>
<van-cell v-else
  @click="address"
  class="addressnone"
>     
<span>还没有地址信息，请点击添加地址</span> 
</van-cell> 
</van-cell-group>
<van-button size="large" @click="submit">提交</van-button>
  </div>
</template>

<script>
import {listShipping,applyService,severs,imgsevers} from '../api/login'
import { Toast } from "vant";

export default {
  data () {
    return {
        value:'',
        formdata:'',
        severs:severs(),
        imgsevers:imgsevers(),
        chosenAddressId: "",
        list: [
        // {
        //   id: "3",
        //   name: "李四",
        //   tel: "1310000000",
        //   address: "浙江省杭州市拱墅区莫干山路 50 号"
        // }
      ],
        formaddress:{
            name:'',
            iphone:'',
            county:'',
            addressDetail:''
        }
    };
  },
  components: {},

  computed: {},

  mounted(){
   this.formdata = JSON.parse(localStorage.getItem('applyServiceData'))[0]
    let para = {
       token:JSON.parse(localStorage.getItem('token'))
     }
      this.LocalAdrrss = JSON.parse(localStorage.getItem('LocalAdrrss'))
       if (this.LocalAdrrss !== null) {
        var datas = [];
       this.deiladdress = this.LocalAdrrss.address
       var arrs2 = this.LocalAdrrss
        datas.push({
             id:arrs2.id,
             name:arrs2.name,
             tel:arrs2.tel,
             address:arrs2.address
            })
        this.deiladdress =arrs2.address 
      //  console.log(this.deiladdress) 
       this.list =datas
      
     }else{
     listShipping(para).then(res => {
          var datas = [];
          this.listShippings = res
          for (var i in res) {
            var arrs = res[i]
            if (arrs.isDefault==='1') {
             datas.push({
             id:arrs.id,
             name:arrs.consigneeName,
             tel:arrs.consigneePhone,
             address:arrs.region+arrs.address,
             deiladdress:arrs.address
            }) 
            this.deiladdress = arrs.address      
            }
          }
          if (datas.length<=0 && this.listShippings.length>0) {
            var arrs = res[0]
             datas.push({
             id:arrs.id,
             name:arrs.consigneeName,
             tel:arrs.consigneePhone,
             address:arrs.region+arrs.address,
             deiladdress:arrs.address
            })
            this.deiladdress = arrs.address  
          }
          this.list = datas  
          
      })
     }
  },

  methods: {
      onClickLeft() {
      this.$router.back(-1);
    },
      address(){
       this.$router.push({ path: '/address', query: { edit: 'true' }});
    },
    redirects(url) {
      localStorage.setItem('mydatas', JSON.stringify(this.formaddress))
      this.$router.push(url);
    },
    submit(){
         var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.value.length<=0) {
          Toast('手机号不能为空')
          return
        }
        if (!reg.test(this.value)){
            Toast("手机格式不正确")
            return
        }
      let para = {
          token:JSON.parse(localStorage.getItem('token')),
          productId:this.formdata.productId,
          productNum:this.formdata.saleNum,
          saleReason:this.formdata.saleReason,
          saleType:this.formdata.saleType,
          shippingId:this.list[0].id,
          senderPhone:this.value,
          orderNo:this.formdata.orderNo,
          productColor:this.formdata.productColor,
          detailId:this.formdata.detailId
      }
        Toast.loading({ 
                duration: 0,
                mask: true,
                forbidClick: false,
                message: '提交中...' 
          });
      applyService(para).then(res =>{
        Toast.clear()
           window.history.go(-3)
      })
      
    }
  }
}

</script>
<style scoped>
#apps >>> .imgList img {
  width: 100%;
}
#apps >>> .van-address-item .van-cell__value {
  padding-right: 0px;
}
#apps >>> .van-cell.van-address-item.van-address-item--unswitchable{
    padding-left: 0;
    padding-right: 0;
}
#apps >>> .van-address-item__edit::before {
      content: "\F007";
}
#apps >>> .van-address-list__add {
  display: none;
}
#apps >>> .van-address-list {
  height: auto;
  padding-bottom: 0px;
  padding-top: 5px;
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
#apps >>> .custom-text{
  background:rgba(242,242,242,1);
}
#apps p{
    margin: 0
}
#apps >>> .van-cell.van-field{
    padding: 0
}
#apps >>> .van-button--default{
    background:rgba(179,144,97,1);
    color: #fff;
    width: 85%;
    margin-left: 7.5%;
    height: 40px;
    line-height: 40px;
    margin-top: 15px;
}
#apps >>> .van-nav-bar .van-icon{
    color: #2c3e50
}
#apps >>> .addressnone{
  padding-top: 50px;
}
#apps >>> .addressnone .van-cell__value--alone{
  line-height: 44px;
  color: #CF3939;
}
</style>
