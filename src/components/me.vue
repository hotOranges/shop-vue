<template>
   <!-- 我的 组件 -->
  <div id="app">
  <van-nav-bar title="" @click-left="onClickLeft" left-arrow>
  <van-icon name="setting" slot="right" @click= "redirects('/editme')" />
  <!-- <van-icon name="chat" slot="right" /> -->
</van-nav-bar>
  <van-row class="col-me" style="background: rgba(242,242,242,1);">            
                    <van-col span='24' class="title">
                         <van-col span='6' offset="1" class="imgList">
                          <img :src='form.avatar' name="adapter" />
                        </van-col>
                        <van-col span='9' offset="1" class="goodList">
                          <span>{{form.nickName}}</span>
                        </van-col>
                        <van-col span='6' offset="1" class="goodIntegral">
                          <span style="font-size: 12px;"><van-icon name="points" />积分0</span>
                        </van-col>
                     </van-col>
                     <!-- 订单 -->
                     <van-col span="24" class="headerImg">
                      <van-cell @click="toOrder('0')" style="border-bottom: 1px solid #D9D9D9;padding-top: 25px;margin-bottom: 25px;padding-right: 10px;" title="我的订单" value="查看全部订单" icon="close" is-link />
                     <van-col span='5' offset="0">
                     <div @click="toOrder('1')">
                     <span><img src="../../static/images/icon/1.png"  /></span>  
                     <span>待付款</span>
                     </div>
                     </van-col>
                     <van-col span='5' offset="0">
                     <div @click="toOrder('2')">
                     <span><img src="../../static/images/icon/2.png"  /></span>  
                     <span>待收货</span>
                     </div>
                     </van-col>
                     <van-col span='5' offset="0"  @click="toOrder('3')">
                     <div @click="toOrder('3')">
                     <span><img src="../../static/images/icon/12.png"  /></span>  
                     <span>已收货</span>
                     </div>
                     </van-col>
                     <van-col span='5' offset="0"  @click="toOrder('4')">
                     <div @click="toOrder('4')">
                     <span><img src="../../static/images/icon/11.png"  /></span>  
                     <span>已取消</span>
                     </div>
                     </van-col>
                     <van-col span='5' offset="0"  @click="toOrder('4')">
                     <div @click="redirects('aftersales')">
                     <span><img src="../../static/images/icon/8.png"  /></span>  
                     <span>退换/售后</span>
                     </div>
                     </van-col>
                     </van-col>
                      
                      <!-- 列表区 -->
                      <van-col span="24" class="headerList">
                      <van-cell style="padding-bottom: 15px;"  @click="$toast('敬请期待')" title="我的收藏"  icon="shoucang" is-link />
                      <van-cell style="padding-bottom: 15px;" @click="$toast('敬请期待')" title="我的优惠劵"  icon="youhuijuan" is-link />
                      <van-cell style="padding-bottom: 15px;" title="收货地址"  @click="redirects('/address')" icon="dizhi" is-link />
                      <van-cell style="padding-bottom: 15px;" @click="$toast('敬请期待')" title="帮助与反馈"  icon="bangzhu" is-link />
                      <van-cell style="padding-bottom: 15px;" title="客服中心"  @click="$toast('敬请期待')" icon="kefu" is-link />
                      <van-cell style="padding-bottom: 15px;" title="退出"  @click="outin" icon="kefu" />
                      
                     </van-col>
 
       </van-row>

   
    <!-- tabBar -->
   

    </div>

</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
import { Dialog } from "vant";
import { Uploader } from 'vant';
import {getUser,logOut} from '../api/login'
export default {
  name: "Me",
  components: {},
  data() {
    return {
      tabarActive: 3,
      menu: ["我的信用评分", "物流信息", "联系人管理", "密码设置"],
      currentRate: 0,
      login: ["立即登录"],
      checked: true,
      shows: false,
      xinyong: false,
      wuliu: false,
      contact: false,
      form:{
        nickName:'',
        avatar:''
      },
      pass: false,
      value: 5,
      active: 3,
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      list: [
      ],
      value: "",
      showKeyboard: true
    };
  },
  computed: {
    ...mapState({
      src: state => state.home.lunbo.src,
      activeTitle: state => state.active.home.activeTitle,
      days: state => state.active.home.days,
      broadcast: state => state.home.broadcast,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      show: state => state.home.show
    }),
    ...mapGetters(["bc_notshow", "search_show"]),
    text() {
      return this.currentRate.toFixed(0) + "分";
    },
    cardType() {
      return this.chosenContactId !== null ? "edit" : "add";
    },

    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    }
  },
  mounted(){
    this.inits()
  },
  methods: {
    ...mapActions(["searchA", "infoAction"]),
    redirects(url) {
      this.$router.push(url);
    },
    inits(){
      let para = {
        token:JSON.parse(localStorage.getItem('token'))
      }
      getUser(para).then(res =>{
        if (res) {
          if (res.nickName.length>0) {
            this.form.nickName = res.nickName
          }else{
             this.form.nickName = res.userName
          }
          if (res.avatar.length>0) {
            this.form.avatar = res.avatar
          }
        }
      })
    },
    outin(){
      let para = {
         token:JSON.parse(localStorage.getItem('token'))
      }
      logOut(para).then(res =>{
          localStorage.removeItem('token')
          localStorage.removeItem('getShopCarts')
          this.$router.push("/");
      })
    },
    onClickLeft() {
      this.$router.push("/");
    },
    toOrder(e) {
      this.$router.push({ path: "/orderForm", query: { activeId: e } });
    },
  
  },
  watch: {},
  directives: {
    //tabBar 消息通知指令
    infos: {
      inserted(el, obj) {
        console.log(obj.value);
        const info = el.childNodes[0].childNodes[1];
        info.innerText = obj.value;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/home.less");
</style>
<style scoped>
#app >>> .van-nav-bar {
  background: linear-gradient(
    48deg,
    rgba(239, 158, 62, 1) 0%,
    rgba(228, 160, 66, 1) 100%
  );
}
#app >>> .van-nav-bar .van-icon {
  color: #fff;
}
#app >>> .van-icon-discount::before {
  font-size: 22px;
}
#app >>> .van-hairline--bottom::after {
  border-bottom-width: 0px;
  border:0 solid #ef9e3e
}
#app >>> .van-cell__title {
  text-align: left;
  font-size: 15px;
  color: #323232;
}
#app >>> .van-cell__value {
  font-size: 12px;
}
#app >>> .van-col--5 {
    width: 20%;
}
#app >>>  .headerImg img{
  width: 100%
}
#app >>> .headerImg .van-cell:not(:last-child)::after{
  border-bottom: 0px solid #eee;
} 
#app >>> .van-icon-setting::before {
    content: url(../assets/img/10.png);
}
#app >>> .van-icon-chat::before{
   content: url(../assets/img/9.png);
}
#app >>> .van-icon-close::before{
   content: url(../assets/img/5.png);
}
#app >>> .van-icon-shoucang::before{
   content: url(../assets/img/6.png);
}
#app >>> .van-icon-youhuijuan::before{
   content: url(../assets/img/13.png);
}
#app >>> .van-icon-dizhi::before{
   content: url(../assets/img/7.png);
}
#app >>> .van-icon-bangzhu::before{
   content: url(../assets/img/3.png);
}
#app >>> .van-icon-kefu::before{
   content: url(../assets/img/4.png);
}
</style>
