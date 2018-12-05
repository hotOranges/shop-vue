import axios from 'axios'
import store from '../store'
// import { getToken } from '@/utils/auth'
import qs from 'qs'
// console.log(getToken())
import {
  Toast
} from "vant";
import router from '../router'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

service.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data)
  return config
}, function (error) {
  return Promise.reject(error)
})
service.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers['X-Token'] = JSON.parse(localStorage.getItem('token'))  // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// 
service.interceptors.response.use(
  response => {
    /**
     * Code为非200是抛错
     */
    const res = response.data
    // return response
    // if (res.code !== '200') {
    //   Toast(res.msg)
    // }
    if (res.code === '1008') {
      Toast(res.msg)
      router.push({
        name: 'login'
      })
    }
    if (res.code =='1006') {
      Toast(res.msg)
      return
    } 
    if (res.code === '1005') {
      router.back(-1)
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast(error.message)
    return Promise.reject(error)
  }
)

export default service
