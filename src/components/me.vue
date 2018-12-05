<template>
   <!-- 我的 组件 -->
  <div id="app">
  <van-nav-bar title="" @click-left="onClickLeft" left-arrow>
  <van-icon name="setting" slot="right" @click= "redirects('/editme')" />
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
                          <span style="font-size: 12px;"><van-icon name="points" />积分12</span>
                        </van-col>
                     </van-col>
                     <!-- 订单 -->
                     <van-col span="24" class="headerImg">
                      <van-cell @click="toOrder('0')" style="padding-bottom: 15px;" title="我的订单" value="查看全部订单" icon="location" is-link />
                     <van-col span='5' offset="0">
                     <div @click="toOrder('1')">
                     <span><img src="../../static/images/icon/icon_9.png"  /></span>  
                     <span>待付款</span>
                     </div>
                     </van-col>
                     <van-col span='5' offset="0">
                     <div @click="toOrder('2')">
                     <span><img src="../../static/images/icon/icon_9.png"  /></span>  
                     <span>待收货</span>
                     </div>
                     </van-col>
                     <van-col span='5' offset="0"  @click="toOrder('3')">
                     <div @click="toOrder('3')">
                     <span><img src="../../static/images/icon/icon_9.png"  /></span>  
                     <span>已收货</span>
                     </div>
                     </van-col>
                     <van-col span='5' offset="0"  @click="toOrder('4')">
                     <div @click="toOrder('4')">
                     <span><img src="../../static/images/icon/icon_9.png"  /></span>  
                     <span>已取消</span>
                     </div>
                     </van-col>
                     <van-col span='5' offset="0"  @click="toOrder('4')">
                     <div @click="redirects('aftersales')">
                     <span><img src="../../static/images/icon/icon_9.png"  /></span>  
                     <span>退换/售后</span>
                     </div>
                     </van-col>
                     </van-col>
                      
                      <!-- 列表区 -->
                      <van-col span="24" class="headerList">
                      <van-cell style="padding-bottom: 15px;" title="我的收藏"  icon="location" is-link />
                      <van-cell style="padding-bottom: 15px;" title="我的优惠劵"  icon="location" is-link />
                      <van-cell style="padding-bottom: 15px;" title="收货地址"  @click="redirects('/address')" icon="location" is-link />
                      <van-cell style="padding-bottom: 15px;" title="帮助与反馈"  icon="location" is-link />
                      <van-cell style="padding-bottom: 15px;" title="客服中心"  icon="location" is-link />
                      <van-cell style="padding-bottom: 15px;" title="关于"  icon="location" is-link />
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
import {getUser} from '../api/login'
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
        nickName:'未设置',
        avatar:'http://106.15.44.76:60180/smartphone-web/static/img/img.739c4ef.jpg'
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
        {
          name: "张三",
          tel: "13000000000",
          id: 0
        }
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
          }
          if (res.avatar.length>0) {
            this.form.avatar = res.avatar
          }
        }
      })
    },
    onClickLeft() {
      this.$router.push("/");
    },
    toOrder(e) {
      console.log(e);
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
</style>
