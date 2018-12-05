<template>
 <!-- 订单提交-->
  <div id="app" style="background:white;margin-top:0px;">
    <van-nav-bar
  class="init-header"
  title="确认订单"
  left-text=""
  left-arrow
  @click-left="onClickLeft"
/>
<van-cell  v-if="list.length>0" @click="redirects('/address')" >
     <van-address-list
  v-model="chosenAddressId"
  :list="list"
  :switchable ="false"
/>
</van-cell>
<van-cell v-else
  @click="redirects('/address')"
  class="addressnone"
>     
<span style="padding-top: 55px;">还没有地址信息，请点击添加地址</span> 
</van-cell>

<!-- <div class="init-10"></div>
  <van-radio-group v-model="radio3">
        <van-cell-group>
          <van-cell title="支付宝" icon="alipay" clickable @click="radio3 = '1'">
            <van-radio name="1" />
          </van-cell>
          <van-cell title="微信" icon="wechat" clickable @click="radio3 = '2'">
            <van-radio name="2" />
          </van-cell>
        </van-cell-group>
      </van-radio-group> -->
      <div class="init-10"></div>
     
      <van-panel title="商品详情" >
  <van-row class="shopp_conent" v-for="item in detial" >
    <van-col span='6' offset="1" class="imgList">
      <img :src="item.productImage" name="adapter" />
    </van-col>
    <van-col span='11' offset="1" class="goodList">
      <span>{{item.productName}}</span>
      <span>￥{{item.price}}</span>
    </van-col>
    <van-col span='1' offset="1">
      <span style="font-size: 15px;">X{{item.productNum}}</span>
    </van-col>
  </van-row>
 <van-cell-group>
  <van-cell title="配送方式" value="快递配送" />
  <van-cell title="发票类型" :value="bill"  @click="show =!show " />
  <van-cell>
    <span>买家留言</span>
    <van-field v-model="message" placeholder="请输入留言" />
  </van-cell> 
  <van-cell title="商品总价" :value="'￥'+total/100" />
  <van-cell title="运费" value="+￥0.00" />
<van-notice-bar :scrollable="false">
  配送至 {{deiladdress}}
</van-notice-bar>
</van-cell-group>
</van-panel>
      <van-submit-bar
        :price="total"
        button-text="提交订单"
        @submit="onSubmit"
        />
  <van-popup v-model="show" position="bottom" :overlay="true" class="bill">
  <h3 style="text-align: center; border-bottom: 1px solid #D8D8D8;margin-top: 0;margin-bottom: 0;width: 85%;margin-left: 7.5%;line-height: 39px;font-size: 18px;font-weight: 400;color: #323232;">发票</h3>
  <van-cell-group>
  <van-cell>
    <span class="blord">发票类型</span>
    <span>普通发票</span>
  </van-cell> 
  <van-cell>
    <span class="blord">发票抬头</span>
  </van-cell> 
 <van-tabs type="card" v-model="active">
  <van-tab title="个人">
    <h4 style="color: #6B6B6B; font-size: 14px; padding-left: 15px; margin-bottom: 72px;">个人发票将显示详细商品名称和价格信息</h4>
  </van-tab>
  <van-tab title="单位">
<van-cell-group>
  <van-field v-model="businessLookUp" placeholder="请填写企业抬头" />
</van-cell-group>
<van-cell-group>
  <van-field v-model="taxNumber" placeholder="请填写税号" />
</van-cell-group>
  </van-tab>
 </van-tabs>
</van-cell-group>
<van-button round @click="addtaxpayer"  size="large" style="background-color:#CF3939;color:#fff;width: 85%;margin-left: 7.5%;height: 40px;line-height: 40px;margin-bottom: 40px;margin-top: 40px;">确认</van-button>
</van-popup>      
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { ImagePreview } from "vant";
import { Toast } from "vant";
import { listShipping,placeOrder,saveInvoice } from "../../src/api/login";

export default {
  name: "pay",
  data() {
    return {
      detial:{},
      businessLookUp:'',
      message:'',
      taxNumber:'',
      selIn:{},
      bill:'不开发票',
      show:false,
      active:1,
      isInvoice:0,
      invoiceId:'',
      invoiceType:'',
      chosenAddressId: "",
      deiladdress:'',
      list: [
        // {
        //   id: "3",
        //   name: "李四",
        //   tel: "1310000000",
        //   address: "浙江省杭州市拱墅区莫干山路 50 号"
        // }
      ],
      areaList: {},
      radio3: "1",
      searchResult: []
    };
  },
  props: {},
  components: {},
  computed: {
    ...mapState({
      buyImg: state => state.home.buyInfo.img[0],
      actives: state => state.active.home.title,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      orderShow: state => state.home.orderShow,
      numO: state => state.home.numO
    }),
    ...mapGetters(["bc_notshow"])
  },
  mounted(){
    this.detial = JSON.parse(localStorage.getItem('detial_s'))
    this.total = JSON.parse(localStorage.getItem('total'))
     let para = {
       token:JSON.parse(localStorage.getItem('token'))
     }
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
  },
  methods: {
    ...mapActions(["orderShows"]),
    onSubmit(e) {
      if (this.list.length == 0) {
        Toast("请填写收货信息");
      } else {
        var buyDetail = [];
        for (var i in this.detial) {
             buyDetail.push({
          productId:this.detial[i].productId,
          productNum:this.detial[i].productNum,
          price:this.detial[i].price,
          productName:this.detial[i].productName,
          productColor:this.detial[i].productColor,
        })
        }
        let para = {
           token:JSON.parse(localStorage.getItem('token')),
           shippingId:this.list[0].id,
           orderAmount:this.total/100,
           buyerMessage:this.message,
           buyDetail:JSON.stringify(buyDetail),
           isInvoice:this.isInvoice,
           invoiceType:this.invoiceType,
           invoiceId:this.invoiceId
        }
        console.log(para)
        placeOrder(para).then(res => {
          if (res) {
             var scopedSlotss = {
                placeOrder:res,
                bill:this.bill,
                name:this.list[0].name,
                tel:this.list[0].tel,
                orderAmount:this.total/100
        }
        localStorage.setItem('placeOrders', JSON.stringify(scopedSlotss))
        this.$router.push("/paySuccess");
          }
        })

        // Toast("提交成功");
        // this.$router.push("/payFailed");
      }
    },
    addtaxpayer(){
      if (this.active==0) {
        this.bill = '个人发票'
        this.isInvoice = 1
        this.invoiceType = 1
        this.show = false
      }else{
        if (this.businessLookUp.length == 0 ) {
           Toast("企业抬头不能为空");
           return
        }

        if (this.taxNumber.length == 0 ) {
          Toast("税号不能为空");
           return
        }
      let para = {
        token:JSON.parse(localStorage.getItem('token')),
        businessLookUp:this.businessLookUp,
        taxNumber:this.taxNumber
     }
     saveInvoice(para).then(res => {
        this.invoiceId = res.id
        this.bill = '单位发票'
        this.isInvoice = 1
        this.invoiceType = 2
        this.show = false
      })
       
      }
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
     redirects(url) {
      this.$router.push(url);
    },
    onClickLeft() {
      this.$router.back(-1);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/buyInfo.less");
</style>
<style scoped>
#app >>> .van-address-item .van-cell__value {
  padding-right: 0px;
}
#app >>> .van-address-item__edit::before {
      content: "\F007";
}
#app >>> .van-address-list__add {
  display: none;
}
#app >>> .van-address-list {
  height: auto;
  padding-bottom: 0px;
  padding-top: 40px;
}
#app >>> .van-cell__title {
  text-align: left;
}
#app >>> .van-radio .van-icon-checked {
  color: #cf3939;
}
#app .init-10 {
  background-color: #f2f2f2;
  width: 100%;
  height: 20px;
  position: relative;
}
#app >>> .imgList img {
  width: 100%;
  height: 100%;
}
#app >>> .goodList {
  text-align: left;
  line-height: 35px;
  display: inline-grid;
}
#app >>> .shopp_conent {
  height: 100%;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
#app >>> .van-submit-bar__text {
  text-align: left;
  padding-left: 12px;
}
#app >>> .van-submit-bar .van-button {
  width: 145px;
  background-color: #cf3939;
  border: 1px solid #cf3939;
  border-radius: 24px 24px 24px 24px;
  height: 40px;
  line-height: 40px;
  margin-top: 0px;
  margin-left: 5px;
  margin-right: 14px;
}
#app >>> .van-nav-bar {
  width: 100%;
  position: fixed;
}
#app >>> .van-nav-bar__text {
  color: #323232;
}
#app >>> .van-nav-bar .van-icon {
  color: #323232;
}
#app >>> .addressnone{
  padding-top: 50px;
}
#app >>> .addressnone .van-cell__value--alone{
  line-height: 44px;
  color: #CF3939;
}
#app >>> .van-hairline--bottom::after {
    border-bottom-width: 3px;
}
#app >>> .van-icon-alipay::before {
  color: #108ee9;
}
#app >>> .van-icon-wechat::before {
  color: #00c801;
}
#app >>> .bill.van-popup.van-popup--bottom .van-cell .blord{
  text-align: left ;
  color: #323232;
  font-size: 15px;
  padding-right: 15px;
}
#app >>> .bill .van-cell.van-field{
    float: inherit;
    width: 100%;
    text-align: left;
    padding: 10px 15px;
}
#app >>> .bill .van-field__control{
  line-height: 35px;
  padding-left: 18px;
  text-align: left;
  background-color: #F2F2F2;
 }
#app >>> .van-field__control{
  
  line-height: 35px;
  padding-left: 18px;
  text-align: right;
  background-color: transparent;
 }
 #app >>> .van-tabs__nav--card{
   border: none;
   width: 60%;
   margin: 0 15px;
 }
 #app >>> .van-tabs__nav--card .van-tab{
  border: 1px solid #B39061;
  color: #B39061;
  margin-right: 15px;
 }
  #app >>> .van-tabs__nav--card .van-tab.van-tab--active{
    background-color:#B39061;
    border-color:#B39061;
    color: #fff 
  }
  #app >>> .van-cell.van-field{
    float: right;
    width: 81%;
    text-align: right;
    padding: 0px 15px;
  }
</style>

