<template>
   <!-- 我的 组件 -->
  <div id="apps">
  <van-nav-bar  @click-left="onClickLeft" left-arrow>
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
                          <span style="font-size: 12px;" @click="redirects('Calendar')"><van-icon name="points" />积分{{form.integral}}</span>
                        </van-col>
                     </van-col>
                     <!-- 订单 -->
                     <van-col span="24" class="headerImg">
                      <van-cell @click="toOrder('0')" class="init-boder" style="margin-bottom: 14px;padding-right: 10px;padding-bottom: 0px"   is-link>
                       <div style="width: 50%;line-height: 32px;float: left;"><img src="../../static/images/icon/5.png" /><span style="position: absolute;top: -2px;left: 30px;color: #323233;font-size: 14px;">我的订单</span></div>  
                       <span style="float: right;color:#6B6B6B;font-size:14px">查看全部订单</span>
                      </van-cell>
                     <van-col span='5' offset="0" >
                     <div @click="toOrder('1')">
                     <span><img src="../../static/images/icon/1.png"  /></span>  
                     <span>待付款</span>
                     <van-tag type="danger" class="bagInit fadein" v-if="numberShop.value>0">{{numberShop.value | filterwhet2}}</van-tag>
                     </div>
                     </van-col>
                     <van-col span='5' offset="0">
                     <div @click="toOrder('2')">
                     <span><img src="../../static/images/icon/2.png"  /></span>  
                     <span>待收货</span>
                     <van-tag type="danger" class="bagInit fadein" v-if="numberShop.value2>0">{{numberShop.value2 | filterwhet2}}</van-tag>
                     </div>
                     </van-col>
                     <van-col span='5' offset="0"  @click="toOrder('3')">
                     <div @click="toOrder('3')">
                     <span><img src="../../static/images/icon/12.png"  /></span>  
                     <span>已收货</span>
                     <!-- <van-tag type="danger" class="bagInit fadein" v-if="numberShop.value3>0">{{numberShop.value3 | filterwhet2}}</van-tag> -->
                     </div>
                     </van-col>
                     <van-col span='5' offset="0"  @click="toOrder('4')">
                     <div @click="toOrder('4')">
                     <span><img src="../../static/images/icon/11.png"  /></span>  
                     <span>已取消</span>
                     <!-- <van-tag type="danger" class="bagInit fadein" v-if="numberShop.value4>0">{{numberShop.value4 | filterwhet2}}</van-tag> -->
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
                      <van-cell  @click="redirects('couponCenter')"  is-link>
                      <div style="width: 50%;line-height: 32px;float: left;"><img src="../../static/images/icon/6.png"  /><span style="position: absolute;top: -2px;left: 30px;">领券中心</span></div>  
                      </van-cell>
                      <van-cell @click="redirects('coupon')"  is-link >
                         <div style="width: 50%;line-height: 32px;float: left;"><img src="../../static/images/icon/13.png"  /><span style="position: absolute;top: -2px;left: 30px;">我的优惠劵</span></div>  
                      </van-cell>
                      <van-cell   @click="redirects('/address')"  is-link >
                         <div style="width: 50%;line-height: 32px;float: left;"><img src="../../static/images/icon/7.png"  /><span style="position: absolute;top: -2px;left: 30px;">收货地址</span></div>  
                      </van-cell>
                      <van-cell  @click="$toast('敬请期待')" is-link >
                      <div style="width: 50%;line-height: 32px;float: left;"><img src="../../static/images/icon/3.png"  /><span style="position: absolute;top: -2px;left: 30px;">帮助与反馈</span></div>  
                      </van-cell>
                      <van-cell  @click="im"  is-link >
                       <div style="width: 50%;line-height: 32px;float: left;"><img src="../../static/images/icon/4.png"  /><span style="position: absolute;top: -2px;left: 30px;">客服中心</span></div>  
                      </van-cell>
                      <van-cell  v-if="iswx=='true'"   @click="outin"  is-link >    
                     <div style="width: 50%;line-height: 32px;float: left;"><img src="../../static/images/icon/out.png"  /><span style="position: absolute;top: -2px;left: 30px;">退出登录</span></div>  
                      </van-cell>
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
import {getUser,logOut,listOrder} from '../api/login'
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
      fromData:[],
      pass: false,
      value: 5,
      active: 3,
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      iswx: localStorage.getItem("iswx"),
      list: [
      ],
      value: "",
      numberShop:{
        value:0,
        value2:0,
        value3:0,
        value4:0,
        value5:0
      },
      showKeyboard: true
    };
  },
  filters:{
     filterwhet2(e){
      var text;
      if (e>9) {
        text = '9+'
      }else {
        text = e
      }
    return text
    }
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
    ...mapActions(["infoAction2"]),
    redirects(url) {
      this.$router.push(url);
    },
     im(){
      // console.log( this.$store.state.sessionlist[0].id)
      var session =  'p2p-admin'
        // if (session)
        // p2p-123456
        location.href = `#/chat/${session}`
      // this.$router.push('/session')
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
          this.number()
        }
      })
      
    },
    number(){
      let para = {
        token:JSON.parse(localStorage.getItem('token')),
        currentPage: 0,
        pageSize: 9999,
        orderStatus: ''
      }
     listOrder(para).then(res=>{
        if (res) {
        for (let i = 0; i < res.length; i++) {
         if (res[i].status=='1') {
            this.numberShop.value++
         }
         if (res[i].status=='2') {
            this.numberShop.value2++
         }
         if (res[i].status=='3') {
            this.numberShop.value3++
         }
         if (res[i].status=='4') {
            this.numberShop.value4++
         }
        }
      }        
      })
    },
    outin(){
      let para = {
         token:JSON.parse(localStorage.getItem('token'))
      }
      logOut(para).then(res =>{
         localStorage.clear()
         this.$store.dispatch('logout')
         
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
        // console.log(obj.value);
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
#apps >>> .col-me .headerImg .bagInit.van-tag{
  position: absolute;
  right: 12px;
  top: -12px;
  border-radius: 50%;
  -webkit-transition: opacity 2s linear;
  -moz-transition: opacity 2s linear;
  -o-transition: opacity 2s linear;
  transition: opacity 2s linear;
  opacity:0;
  filter:alpha(opacity=0);
  width: 20px;
  height: 20px;
  line-height: 20px;
  padding: 0;
  color: #fff;
}
#apps >>> .col-me .headerImg .bagInit.van-tag.fadein{
  opacity:100;
  filter:alpha(opacity=100);
  }
#apps >>> .van-nav-bar {
  background: linear-gradient(
    48deg,
    rgba(239, 158, 62, 1) 0%,
    rgba(228, 160, 66, 1) 100%
  );
      height: 48px;
}
#apps >>> .headerList .van-cell{
      padding: 7px 15px;
}
#apps >>> .van-nav-bar .van-icon {
  color: #fff;
}
#apps >>> .init-boder::after{

}
#apps >>> .van-icon-discount::before {
  font-size: 22px;
}

#apps >>> .van-cell__title {
  text-align: left;
  font-size: 15px;
  color: #323232;
}
#apps >>> .van-cell__value {
    font-size: 15px;
    color: #323232;
}
#apps >>> .van-cell__value img{ 
  width:25px
}
#apps >>> .van-col--5 {
    width: 20%;
    position: relative;
}
#apps >>>  .headerImg img{
  width: 25px
}
#apps >>> .headerImg .van-cell:not(:last-child)::after{
  border-bottom: 1px solid #eee;
  left:5px;
  right:5px;
} 
#apps >>> .van-icon-setting::before {
    content: url(../assets/img/10.png);
}
#apps >>> .van-icon-chat::before{
   content: url(../assets/img/9.png);
}
#apps >>> .van-icon-arrow:before {
    color: #CACACA;
}
#apps >>> .van-cell:not(:last-child)::after{
  border-bottom:0px
}
#apps >>> [class*=van-hairline]::after{
      border: 0 solid #ef9e3e;
          /* transform: none; */
}
</style>
