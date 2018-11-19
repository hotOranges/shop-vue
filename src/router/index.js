import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Search from '@/components/search'
import  GoodsInfo from '@/components/goodsInfo'
import Buy from '@/components/buyInfo'
import Pay from '@/components/orderPay'
import Community from '@/components/community'
import ShopingCart from '@/components/shoppingCart'
import Me from '@/components/me'
import Login from '@/components/login'
import About from '@/components/about'
import Address from '@/components/address'
import AddressEdit from '@/components/addressEdit'
import Reg from '@/components/reg'
import Respassworld from '@/components/respassworld'
import OrderForm from '@/components/orderForm'
import Addressnew from '@/components/addressnew'
import Evaluation from '@/components/Evaluation'
import paySuccess from '@/components/paySuccess'
import payFailed from '@/components/payFailed'
import Orderdetail from '@/components/Orderdetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess,
    },
    {
      path: '/payFailed',
      name: 'payFailed',
      component: payFailed,
    },
    {
      path: '/Orderdetail',
      name: 'Orderdetail',
      component: Orderdetail,
    },  
    {
      path:'/address',
      name:'address',
      component:Address,
    },
    {
      path: '/addressEdit',
      name: 'addressEdit',
      component: AddressEdit,
    },
    {
      path:'/addressnew',
      name:'addressnew',
      component:Addressnew,
    },
    {
      path:'/goods/:id',
        name:'goodsInfo',
        component:GoodsInfo,
    },
    {
      path:'/goods/:id/buy',
      name:'buyInfo',
      component:Buy,
    },
    {
      path:'/goods/:id/buy/pay',
      name:'pay',
      component:Pay,
    },
    {
      path:'/community',
      name:'community',
      component:Community,
    },
    {
      path:'/shoppingCart',
      name:'shoppingCart',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:ShopingCart,
    },
    {
      path:'/me',
      name:'Me',
      component:Me,
    },
    {
      path:'/login',
      name:'login',
      component:Login,
    },
    {
      name:'/orderForm',
      path:'/orderForm',
      name:'orderForm',
      component:OrderForm,
    },
    {
      name:'/evaluation',
      path:'/evaluation',
      name:'evaluation',
      component:Evaluation,
    },
    {
      path:'/register',
      name:'register',
      component:Reg,
    },
    {
      path:'/respassworld',
      name:'respassworld',
      component:Respassworld,
    },
    {
      path:'/about',
      name:'aboutMe',
      component:About,
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})
