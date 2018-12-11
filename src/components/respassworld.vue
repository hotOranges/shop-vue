<template>
   <!-- 登录注册 组件 -->
  <div id="apps" style="padding-top:0">
      <van-nav-bar
  class="init-header"
  title="忘记密码"
  left-text=""
  left-arrow
  @click-left="onClickLeft"
/>
                <div class="login" style="width: 90%; margin-left: 5%;">
                    <div class="login-form">
                        <van-cell-group>
                        <van-field
                            v-model="iPhone"
                            center
                            type="tel"
                            clearable
                            placeholder="请输入手机号"
                         >
                        </van-field>
                        </van-cell-group>
                        <van-cell-group>
                        <van-field
                            v-model="sms"
                            center
                            clearable
                            placeholder="请输入验证码"
                        >
                          <van-button  @click="send" slot="button" size="small"  style="color: #B39061;background-color: #fff; border: 1px solid #B39061;border-radius: 3px;font-family: PingFangSC-Medium;">
                            <span>{{content}}</span>
                            </van-button>
                        </van-field>
                        </van-cell-group>
                        <van-cell-group class="inits">
                        <van-field
                            v-model="password"
                            center
                            clearable 
                            placeholder="新密码（6～20位数字或字母）"
                            :type="paswldtype"
                            @keydown="rules(password,'pass')"
                        >
                        </van-field>
                        <img   v-show='true' :src="openeye" class="eye" alt="" @click="changeType()">
                        </van-cell-group>
                          <van-cell-group class="inits">
                         <van-field
                            v-model="password2"
                            center
                            clearable                
                            placeholder="再次输入确认"
                            :type="paswldtype2"
                        >
                        </van-field>
                        <img  v-show='show' :src="openeye2" class="eye" alt="" @click="changeType2()">
                        </van-cell-group>
                      <div class="login-inp"><a href="#" @click="submit(iPhone,sms,password,password2)">{{btnName}}</a></div>
                    </div>
                   
                </div>
              

  </div>

</template>

<script>
import { resetPassWord,getVerifyCode } from "../../src/api/login";
import { mapState, mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
import { Dialog } from "vant";

export default {
  components: {},
  data() {
    return {
      password: null,
      sms: null,
       content: '获取验证码',
      totalTime: 180,
      canClick: true, //添加canClick  
      password2: null,
      paswldtype: "password",
      paswldtype2: "password",
      iPhone: "",
      openeye: require('@/assets/img/login_icon_hide.png'),
      openeye2: require('@/assets/img/login_icon_hide.png'),
      btnName: "注册",
      checked: false
    };
  },
  computed: {
    show(){
      if(this.password2) return true;
      else return false;
    }
  },
  methods: {
    ...mapActions(["searchA", "infoAction"]),
    onClickLeft() {
      this.$router.back(-1);
    },
    changeType() {
        this.paswldtype = this.paswldtype === 'password' ? 'text' : 'password';
        this.openeye = this.openeye == require("@/assets/img/login_icon_show.png") ? require("@/assets/img/login_icon_hide.png") : require("@/assets/img/login_icon_show.png");
      },
    changeType2(){
      this.paswldtype2 = this.paswldtype2 === 'password' ? 'text' : 'password';
        this.openeye2 = this.openeye2 == require("@/assets/img/login_icon_show.png") ? require("@/assets/img/login_icon_hide.png") : require("@/assets/img/login_icon_show.png");
    },  
    send() {
      if (this.iPhone.length != 11) return Toast("请输入正确的手机号");
       const para = {
        mobile: this.iPhone,
        type:2
      }

       if (!this.canClick) return  //改动的是这两行代码
        this.canClick = false
        getVerifyCode(para).then(res => {
        this.content = this.totalTime + 's后重新发送'
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + 's后重新发送'
          if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 180
          this.canClick = true  //这里重新开启
          }
        },1000)
      })
     
    },
    //密码验证
    rules(v, choose) {
      if (choose == "pass") {
        // let password = this.password.trim();
        // console.log(password)
        //最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        // let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        //  if(!pPattern.test(password)) {
        //      Toast('密码强度较弱o(╥﹏╥)o');
        //  }else{
        //      Toast('密码强度 安全^_^');
        //  }
      }
    },
    submit(iPhone, sms, password) {
      let data = {
        iPhone,
        password,
        sms
      };

      if (this.iPhone == null || this.password == null || this.sms == null) {
        Toast("手机号、验证码和密码不能为空");
      } else if(this.password.length<6){
        Toast("密码长度最少六位");
      } else if (this.password2 !== this.password) {
        Toast("两次密码输入不相同");
      } else {
        const para = {
        mobile: data.iPhone,
        verifyCode:data.sms,
        password:data.password
      }
      Toast.loading({
                duration: 0,
                mask: true,
                forbidClick: false,
                message: '提交中...' 
          });
      resetPassWord(para).then(res => {
        Toast.clear()
        this.onClickLeft()
      })
      }
    },
    tip() {
      Toast("该功能正在维护 o(╥﹏╥)o");
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {},
  created() {}
};
</script>

<style lang="less" scoped>
@import url("../assets/css/login.less");
</style>
<style scoped>
#checkedinit >>> .van-checkbox__icon--round .van-icon {
  border-radius: 2px;
  width: 15px;
  height: 15px;
}
#checkedinit >>> .van-checkbox__icon,
.van-checkbox__label {
  line-height: 15px;
}
#checkedinit >>> .van-checkbox__icon--checked .van-icon {
  color: #fff;
  border-color: rgba(179, 144, 97, 1);
  background-color: rgba(179, 144, 97, 1);
  background: rgba(179, 144, 97, 1);
}
#checkedinit {
  text-align: left;
  padding-left: 15px;
  width: 40%;
  display: inline-block;
  font-size: 12px;
}
.van-cell-group {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 15px;
}
.van-cell {
  border-bottom: 1px solid #d8d8d8;
}
.van-field__control {
  color: #c1c1c1;
}
#apps >>> .van-nav-bar__title {
  color: #323232;
}
#apps >>> .van-nav-bar {
  border-bottom: 1px solid #d8d8d8;
}
#apps >>> .van-nav-bar .van-icon {
  color: #323232;
}
#apps >>> input::-webkit-input-placeholder {
  color: #c1c1c1;
}
#apps >>> .van-field__control{
  border: none
}
#apps >>> .van-hairline--top-bottom::after{
  border-width:0px
}
#apps >>> .eye{
    position: absolute;
    right: 8px;
    top: 10px;
    width: 23px;
}
#apps >>> .van-icon.van-icon-clear{
  right: 22px;
}
#apps >>> .van-cell{
  padding: 10px 0px;
}
</style>

