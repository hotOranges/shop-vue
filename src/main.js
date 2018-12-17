//导入所需模块
import Vue from 'vue'
import App from './App'
import router from './router'
import qs from 'qs'
import utils from './utils/utils'
// Vue.prototype.$utils = utils // main.js中全局引入
import promise from 'es6-promise';
promise.polyfill();
let id = utils.getUrlKey('openId')
console.log(id)
localStorage.setItem(
  "opednId",
  JSON.stringify(id)
);
Vue.config.productionTip = false

//ajax
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

//状态管理
import vuex from 'vuex'
Vue.use(vuex);

//ui 框架
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

//懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);

//瀑布流
import { Waterfall } from 'vant';
Vue.use(Waterfall);

import store from './store/index'

Vue.prototype.$ajax = axios
axios.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data)
  return config
}, function (error) {
  return Promise.reject(error)
})
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
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
