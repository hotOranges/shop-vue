//导入所需模块
import Vue from 'vue'
import App from './App'
import router from './router'
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


/*登录拦截*/
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       if (store.state.home.token) {  // 通过vuex state获取当前的token是否存在 
//         next();
//       }
//       else {
//           next({
//               path: '/login',
//               query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           })
//       }
//   }
//   else {
//       next();
//   }
// })
/* VUE实例 */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
