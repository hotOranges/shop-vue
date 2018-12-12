<template>
   <!-- 登录注册 组件 -->
  <div id="apps" style="padding-top:0">
      <van-nav-bar
  class="init-header"
  title="注册"
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
                            clearable
                            type="tel"
                            placeholder="请输入手机号"
                         >
                        </van-field>
                        </van-cell-group>
                        <van-cell-group>
                        <van-field
                            v-model="sms"
                            center
                            clearable
                            placeholder="请输入手机验证码"
                        >
                            <van-button  @click="send" slot="button" size="small"  style="color: #B39061;background-color: #fff; border: 1px solid #B39061;border-radius: 3px;font-family: PingFangSC-Medium;">
                            <span>{{content}}</span>
                            </van-button>
                        </van-field>
                        </van-cell-group>
                        <van-cell-group>
                         
                             <van-field
                            v-model="sms2"
                            center
                            clearable
                            placeholder="请输入验证码"
                        >  <span  @click="refreshCode" slot="button" size="small"  style="color: transparent;background-color:transparent; border: 1px solid #B39061;border:none;font-family: PingFangSC-Medium;">
                     <s-identify  :identifyCode="identifyCode"></s-identify>
                     </span>
                            
                             </van-field>
                       
                        </van-cell-group>
                        <van-cell-group>
                        <van-field
                            v-model="password"
                            center                   
                            placeholder="密码（6～20位数字或字母）"
                            :type="paswldtype"
                            @keydown="rules(password,'pass')"
                        >
                        </van-field>
                         <img   v-show='show' :src="openeye" class="eye" alt="" @click="changeType()">
                        </van-cell-group>
                        <div class="login-inp"><a href="#" @click="submit(iPhone,sms,password)">{{btnName}}</a></div>
            
                    </div>
                   
                </div>
                <div style="text-align:center;line-height: 65px;font-size: 12px">
                    注册表示您同意<a style="color:#935E46" @click="$toast('暂无')">用户协议</a>
                </div>

  </div>

</template>

<script>
import { getVerifyCode,regist } from "../../src/api/login";
import { mapState, mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
import { Dialog } from "vant";
import SIdentify from "./identify";
export default {
  name: "login",
  components: {
    SIdentify,
  },
  data() {
    return {
      password: null,
      sms: null,
      content: '获取验证码',
      totalTime: 180,
      canClick: true, //添加canClick  
      paswldtype: "password",
      iPhone: "",
      sms2:'',
      openeye: require('@/assets/img/login_icon_hide.png'),
      btnName: "注册",
      checked: false,
      show:true,
      identifyCodes: "1234567890",
      identifyCode: ""
    };
  },
  computed:{
    // show(){
    //   if(this.password) return true;
    //   else return false;
    // }
  },
  mounted(){
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
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
    send() {
      if (this.iPhone.length != 11) return Toast("请输入正确的手机号");
       const para = {
        mobile: this.iPhone,
        type:1
      }
        if (!this.canClick) return  //改动的是这两行代码
        this.canClick = false
        getVerifyCode(para).then(res => {
          if (res ==true) {
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
        }else{
          this.canClick = true  //这里重新开启
        }
      })
     
    },
    //密码验证
    rules(v, choose) {
      if (choose == "pass") {
        let password = v;
        //最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        if (!pPattern.test(password)) {
          // Toast("密码强度较弱");
        } else {
          // Toast("密码强度 安全");
        }
      }
    },
    submit(iPhone, sms, password) {
      let data = {
        iPhone,
        password,
        sms
      };

      if (data.iPhone == null || data.password == null || data.sms == null) {
        Toast("手机号、验证码和密码不能为空");
      }else if(this.password.length<6){
        Toast("密码长度最少六位");
      } else if(this.identifyCode!==this.sms2){
         Toast("验证码不正确");
      } else {
       const para = {
        mobile: data.iPhone,
        verifyCode:data.sms,
        password:data.password
      }
      let thiss =this
      Toast.loading({
                duration: 0,
                mask: true,
                forbidClick: false,
                message: '请求中...' 
          });
     this.$ajax.post('http://pay.iwingscom.com/iwings-manager/customerUser/regist',para)
      .then(function (response) {
        if (response.data.msg=='注册成功') {
          Toast.clear();
          Toast('注册成功')
          thiss.$router.push('/login')
        }else{
          Toast.clear();
          Toast(response.data.msg)
        }
      })
      
      }
    },
    tip() {
      Toast("该功能正在维护 o(╥﹏╥)o");
    },
      randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
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
#apps >>> .van-cell{
  padding: 10px 0px;
}
</style>

