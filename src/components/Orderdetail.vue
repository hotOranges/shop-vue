<template>
 <!-- 订单提交-->
  <div id="app" style="background:white;margin-top:0px;">
    <van-nav-bar
  class="init-header"
  title="订单详情"
  left-text=""
  left-arrow
  @click-left="onClickLeft"
/>
     <van-address-list
  v-model="chosenAddressId"
  :list="list"
/>     
<div class="init-10"></div>
  <van-radio-group v-model="radio3">
        <van-cell-group>
           <van-cell title="支付宝" icon="alipay" clickable @click="radio3 = '1'">
            <van-radio name="1" />
          </van-cell>
          <van-cell title="微信" icon="wechat" clickable @click="radio3 = '2'">
            <van-radio name="2" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="init-10"></div>
     
      <van-panel title="商品详情" >
  <van-row class="shopp_conent">
    <van-col span='6' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
    </van-col>
    <van-col span='11' offset="1" class="goodList">
      <span>翼贝贝智能儿童手表T8</span>
      <span>￥499.00</span>
    </van-col>
    <van-col span='1' offset="1" class="">
      <span style="font-size: 12px;">X1</span>
    </van-col>
  </van-row>
 <van-cell-group>
  <van-cell title="配送方式" value="快递配送" />
  <van-cell title="发票类型" value="不开发票" />
  <van-cell title="买家留言" value="请注意包装包" />
  <van-cell title="商品总价" value="￥499.00" />
  <van-cell title="运费" value="+￥0.00" />
<van-notice-bar :scrollable="false">
  配送至莲花国际广场1号楼1201
</van-notice-bar>
</van-cell-group>
</van-panel>
     <van-goods-action>
        <van-goods-action-mini-btn text="合计¥499" />
        <van-goods-action-big-btn text="取消订单" @click="redirects('Orderdetail')"  />
        <van-goods-action-big-btn text="去支付" primary />
    </van-goods-action> 
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { ImagePreview } from "vant";
import { Toast } from "vant";

export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        },
        {
          id: "3",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
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
  methods: {
    ...mapActions(["orderShows"]),
    onSubmit(e) {
      if (this.chosenAddressId.length == 0) {
        Toast("请填写收货信息");
      } else {
        Toast("提交成功");
        this.$router.push("/payFailed");
      }
    },
    search_shows() {
      this.$router.push("/");
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    //商品预览
    ImagePreviews() {
      ImagePreview(this.preImgs);
    },
    //结算
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {
    this.axios.get("./static/data.json").then(
      res => {
        const buy_id = this.$route.params.id;
        console.log(buy_id);
        //或许商品信息
        if (res.status == 200) {
          const data = res.data.goods;
          const preImg = data.id_0.moreImg;
          this.preImgs = preImg;
        }
      },
      err => {
        this.imageList = this.src;
        this.broadcast = "暂无消息~~QAQ~";
      }
    );
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import url("../assets/css/buyInfo.less");
</style>
<style scoped>
#app >>> .van-address-item .van-cell__value {
  padding-right: 0px;
}
#app >>> .van-address-item__edit {
  display: none;
}
#app >>> .van-address-list__add {
  display: none;
}
#app >>> .van-address-list {
  height: auto;
  padding-bottom: 0px;
  padding-top: 40px;
}
#app >>> .van-icon-alipay::before{
    color: #108EE9;
}
#app >>> .van-icon-wechat::before {
    color: #00C801
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
}
#app >>> .shopp_conent {
  height: 100%;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
#app >>> .van-submit-bar__text{
  text-align: left;
  padding-left: 12px;
}
#app >>> .van-submit-bar .van-button{
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
#app >>> .van-nav-bar{
  width: 100%;
  position: fixed;
}
#app  >>>  .van-nav-bar__text {
color:#323232;
}
#app  >>>  .van-nav-bar .van-icon{
  color:#323232;
}
#app .van-button--warning{
  background-color: #B39061;
  border: 1px solid #B39061;
}
#app .van-goods-action-mini-btn{
    width: 38%;
    color: rgba(207,57,57,1);
    font-size: 16px;
    height: 65px;
}
#app .van-goods-action{
    background-color: #fff
}
#app >>> .van-button--square{
  border-radius: 24px 24px 24px 24px;
}
#app >>> .van-button--large{
    height: 37px;
    line-height: 37px;
    margin-top: 15px;
    margin-left: 5px;
    margin-right: 5px;
}
</style>

