import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Search from '@/components/search'
import GoodsInfo from '@/components/goodsInfo'
import Buy from '@/components/buyInfo'
import Pay from '@/components/orderPay'
import pays from '@/components/orderPays'
import ShopingCart from '@/components/shoppingCart'
import Me from '@/components/me'
import Login from '@/components/login'
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
import aftersales from '@/components/aftersales'
import aftersalesDetil from '@/components/aftersalesDetil'
import aftersalesServer from '@/components/aftersalesServer'
import AFASDetil from '@/components/AFASDetil'
import AFAS from '@/components/AFAS'
import AFASAddress from '@/components/AFASAddress'
import EvaluationList from '@/components/EvaluationList'
import orderpaySuccess from '@/components/orderpaySuccess'
import editme from '@/components/editme'
import editname from '@/components/editname'
import paySuccessDetil from '@/components/paySuccessDetil'
import paySuccessDetil2 from '@/components/paySuccessDetil2'
Vue.use(Router)

export default new Router({
  // mode: 'history',
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
      path:'/paySuccessDetil',
      name:'paySuccessDetil',
      component:paySuccessDetil
    },
    {
      path:'/paySuccessDetil2',
      name:'paySuccessDetil2',
      component:paySuccessDetil2
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
      path:'/aftersales',
      name:'aftersales',
      component:aftersales
    },
    {
      path:'/aftersalesDetil',
      name:'aftersalesDetil',
      component:aftersalesDetil
    },
    {
      path:'/aftersalesServer',
      name:'aftersalesServer',
      component:aftersalesServer
    },
    {
      path:'/AFAS',
      name:'AFAS',
      component:AFAS
    },
    {
      path:'/AFASDetil',
      name:'AFASDetil',
      component:AFASDetil
    },
    {
      path:'/editme',
      name:'editme',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:editme
    },
    {
      path:'/editname',
      name:'editname',
      meta:{
        requireAuth:true
      },
      component:editname
    },
    {
      path:'/AFASAddress',
      name:'AFASAddress',
      component:AFASAddress
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
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:Pay,
    },
    {
      path:'/orderPays',
      name:'orderPays',
      meta:{
        requireAuth: true,
      },
      component:pays
    },
    {
      path:'/orderpaySuccess',
      name:'orderpaySuccess',
      meta:{
        requireAuth:true
      },
      component:orderpaySuccess
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
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:Me,
    },
    {
      path:'/login',
      name:'login',
      component:Login,
    },
    {
      path:'/orderForm',
      name:'orderForm',
      component:OrderForm,
    },
    {
      name:'EvaluationList',
      path:'/EvaluationList',
      component:EvaluationList
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
      path:'*',
      redirect:'/'
    }
  ]
})
