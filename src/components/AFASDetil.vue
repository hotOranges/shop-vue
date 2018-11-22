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
       <van-cell title="" value="申请数量：1" />
  </van-cell-group>
   <van-cell title="申请原因" value="不想要" class="custom-text" />
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
<van-cell title="收货地址"  @click="redirects('AFASAddress')" is-link />
<van-cell-group>
<van-cell value="" class="">
   <template>
    <p><span>{{formaddress.name}}</span><span style="float:right">{{formaddress.iphone}}</span></p>
    <p>{{formaddress.county}}{{formaddress.addressDetail }}</p>
   </template>
</van-cell>  
</van-cell-group>
<van-button size="large" @click="submit">提交</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
        value:'',
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
      console.log(JSON.parse(localStorage.getItem('mydatas')))
      if (JSON.parse(localStorage.getItem('mydatas'))==null) {
          this.formaddress.name =''
          this.formaddress.iphone =''
          this.formaddress.county =''
          this.formaddress.addressDetail =''
      }else{
          this.formaddress = JSON.parse(localStorage.getItem('mydatas'))
      }
  },

  methods: {
      onClickLeft() {
      this.$router.back(-1);
    },
    redirects(url) {
      localStorage.setItem('mydatas', JSON.stringify(this.formaddress))
      this.$router.push(url);
    },
    submit(){
        alert('提交成功')
    }
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
</style>
