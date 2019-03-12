//导入所需模块
import Vue from 'vue'
import App from './App'
import router from './router'
import qs from 'qs'
import utils from './utils/utils'
// Vue.prototype.$utils = utils // main.js中全局引入
import store from './vuex/store'
import promise from 'es6-promise';
import Moment from 'moment'
import Bridge from './config/bridge.js'
import cookie from "./components/im/utils/cookie";
import 'babel-polyfill' 
Vue.prototype.$bridge = Bridge
let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 ios终端

Vue.prototype.$CheckIsIOS = isIOS
Vue.prototype.$CheckIsAndroid = isAndroid
promise.polyfill();
require('es6-promise').polyfill()
  var ua = window.navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == "micromessenger") {
  localStorage.setItem(
    "iswx",
    true
  );
}else{
  localStorage.setItem(
    "iswx",
    false
  );
}
let id = utils.getUrlKey('openId')
localStorage.setItem(
  "opednId",
  JSON.stringify(id)
);
Vue.config.productionTip = false
const _ = require('lodash')
const load = require('load-script')
// load('../static/nim/NIM_Web_SDK_v4.0.0.js', (err, script) => {
load('../customer/static/nim/NIM_Web_SDK_v4.0.0.js', (err, script) => {
  if (err) {
    console.log('LOAD NIM ERR:', err)
  } else {
    console.log('LOAD NIM SUCCESS:', script.src)
  }
})
// const currentEnv = Config.dev
//ajax
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// document.addEventListener("visibilitychange", () => {
//   if (document.hidden) {
   
//   } else {
//     setTimeout(() => {
//       if (cookie.readCookie('uid')!==null) {
//       let loginInfo = {
//         uid: cookie.readCookie('uid'),
//         sdktoken: cookie.readCookie('sdktoken'),
//       }
//       store.dispatch('initNimSDK', loginInfo)
//     }else{
//       console.log('登录过期')
//     }
//     }, 2000)
//   }
// });
//状态管理
import vuex from 'vuex'
Vue.use(vuex);

//ui 框架
import Vant from 'vant';
import 'vant/lib/index.css';
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(Vant);
_.assign(window, {
  _,
  Vue,
  store,
  Moment,
  axios,

})
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
//懒加载
import { Lazyload } from 'vant';
// Vue.use(Lazyload, {
//   lazyComponent: true,
//   attempt: 8,
//   loading: 'https://i.loli.net/2019/02/27/5c76628238cfd.jpg',
//   error: 'https://i.loli.net/2019/02/27/5c76628238cfd.jpg',
//   })
  Vue.use(Lazyload, {
    lazyComponent: true,
    attempt: 8,
    error: '../customer/static/images/lunbo/err.jpg',
    error: '../customer/static/images/lunbo/err.jpg',
})
//瀑布流
import { Waterfall } from 'vant';
Vue.use(Waterfall);

// import store from './store/index'

Vue.prototype.$ajax = axios
axios.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data)
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers['X-Token'] = JSON.parse(localStorage.getItem('token'))  // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error) 
  Promise.reject(error)
})
router.afterEach((to,from,next) => {
  if (to.name =='buyInfo' && from.name=='Home' ||to.name =='Me' && from.name=='Home' || to.name =='shoppingCart' && from.name=='Home') {
   cookie.setCookie('scroll',document.documentElement.scrollTop)
   setTimeout(()=>{ 
   window.scrollTo(0,0)
   },500)
  }else{
    window.scrollTo(0,0);
  }
  if (to.name =='Home' && from.name=='buyInfo' ||to.name =='Home' && from.name=='shoppingCart' || to.name =='Home' && from.name=='Me') {
    setTimeout(()=>{
      window.scrollTo(0,cookie.readCookie('scroll'));
    },100)
   
  }
 
  
});

/*登录拦截*/
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (localStorage.getItem('token') && localStorage.getItem('token').length>3) {  // 通过vuex state获取当前的token是否存在 
        next();
      }
      else {  
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})
/* VUE实例 */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
