<template>
   <!-- 登录注册 组件 -->
  <div id="apps">
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
                            placeholder="请输入手机号"
                         >
                        </van-field>
                        </van-cell-group>
                        <van-cell-group>
                        <van-field
                            v-model="sms"
                            center
                            clearable
                            placeholder="请输入短信验证码"
                        >
                            <van-button  @click="send" slot="button" size="small"  style="color: #B39061;background-color: #fff; border: 1px solid #B39061;border-radius: 3px;">
                            <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                            <span v-if="!sendMsgDisabled">发送验证码</span>
                            </van-button>
                        </van-field>
                        </van-cell-group>
                        <van-cell-group>
                        <van-field
                            v-model="password"
                            center
                            clearable
                            icon="password-view"
                            @click-icon="passwordview"
                            placeholder="密码（6～20位数字或字母）"
                            :type="paswldtype"
                            @keydown="rules(password,'pass')"
                        >
                        </van-field>
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

export default {
  name: "login",
  components: {},
  data() {
    return {
      password: null,
      sms: null,
      time: 180,
      sendMsgDisabled: false,
      paswldtype: "password",
      iPhone: "",
      btnName: "注册",
      checked: false
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
    ...mapGetters(["bc_notshow", "search_show"])
  },
  methods: {
    ...mapActions(["searchA", "infoAction"]),
    onClickLeft() {
      this.$router.back(-1);
    },
    send() {
      if (this.iPhone.length != 11) return Toast("请输入正确的手机号");
       const para = {
        mobile: this.iPhone,
        type:1
      }
       let me = this;  
      getVerifyCode(para).then(res => {
        me.sendMsgDisabled = true;
        let interval = window.setInterval(function() {
        if (me.time-- <= 0) {
          me.time = 60;
          me.sendMsgDisabled = false;
          window.clearInterval(interval);
        }
      }, 1000);
      })
     
    },
    passwordview() {
      if (this.paswldtype === "password") {
        this.paswldtype = "text";
      } else {
        this.paswldtype = "password";
      }
    },
    //密码验证
    rules(v, choose) {
      if (choose == "pass") {
        // let password = v.trim();
        //最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        if (!pPattern.test(password)) {
          Toast("密码强度较弱o(╥﹏╥)o");
        } else {
          Toast("密码强度 安全^_^");
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
        Toast("手机号、验证码和密码不能为空 o(╥﹏╥)o");
      } else {
       const para = {
        mobile: data.iPhone,
        verifyCode:data.sms,
        password:data.password
      }
     
      regist(para).then(res => {
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
</style>

