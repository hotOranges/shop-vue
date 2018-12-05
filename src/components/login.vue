<template>
   <!-- 登录注册 组件 -->
  <div id="apps">
         <div class="login" style="width: 90%; margin-left: 5%;">
            <div class="welcome"><img src="../../static/images/welcome.png"></div>
            <div class="login-form">
                <van-cell-group>
                <van-field clearable  style="box-shadow: 0 0 0 60px #fff inset;-webkit-text-fill-color: #000;" placeholder="请输入手机号" type="number" v-model="username" @keydown="rules(username,'user')"/>
                </van-cell-group>
                <van-cell-group>
                <van-field style="box-shadow: 0 0 0 60px #fff inset;-webkit-text-fill-color: #000;" placeholder="请输入密码" type="password" v-model="password" @keydown="rules(password,'pass')"/>
                </van-cell-group>
                 <van-cell-group>
                     <van-checkbox v-model="checked" id="checkedinit">记住密码</van-checkbox>
                  <a style="float: right;padding-right: 18px;font-size: 12px;color: rgb(147, 94, 70);" @click="redirects('/respassworld')">忘记密码？</a>
                </van-cell-group>
                <div class="login-inp"><a href="#" @click="submit(username,password)">{{btnName}}</a></div>
                    </div>
                    <div class="login-txt">还没有注册？<a style="color:#935E46" @click="redirects('/register')">立即注册</a></div>
                </div>
                <div style="text-align:center;">
                </div>
  </div>

</template>

<script>
import { login } from "../../src/api/login";
import { mapState, mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
import { Dialog } from "vant";

export default {
  name: "login",
  components: {},
  data() {
    return {
      username: null,
      password: null,
      btnName: "立即登录",
      checked: false
    };
  },
  computed: {
  },
  methods: {
    ...mapActions(["newtoken"]),
    //用户名和密码验证
    rules(v, choose) {
      if (choose == "user") {
      var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
       if (!reg.test(username)){
            Toast("手机格式不正确")
            return
        }
       
      } else if (choose == "pass") {
        let password = v.trim();
        //最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        if (!pPattern.test(password)) {
          //  Toast('密码强度较弱o(╥﹏╥)o');
        } else {
          //  Toast('密码强度 安全^_^');
        }
      }
    },
    submit(username, password) {
      let data = {
        username,
        password
      };

      if (data.username == null || data.password == null) {
        Toast("用户名和密码不能为空 o(╥﹏╥)o");
      } else {
       const para = {
        mobile:username,
        password:password
      }
     
      login(para).then(res => {
        if (res) {
        localStorage.setItem('token', JSON.stringify(res))
        this.newtoken()
        this.redirects("/");
         Toast("登录成功");
        }
        
       
      }) 
      
    }
    },
    redirects(url) {
      this.$router.push(url);
      // if(this.$route.name == 'login') {
      //             this.btnName = '立即登录';
      //         }else if (this.$route.name == 'register') {
      //             this.btnName = '立即注册';
      // }
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
.van-hairline--top-bottom:after{
  border-width: 0
}
</style>

