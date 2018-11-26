import request from '@/utils/request'
// const base = 'http://192.168.1.88:60180/smartphone'
// const HOST = 'localhost'
const HOST = '106.15.44.76'
// const HOST = 'app.iwingscom.com'
const base = 'http://' + HOST + '/iwings-manager'

export function getVerifyCode(params) {
  return request({
    url: `${base}/customerUser/getVerifyCode`,
    method: 'post',
    data: params
  })
}
export function regist(params) {
  return request({
    url: `${base}/customerUser/regist`,
    method: 'post',
    data: params
  })
}
export function login(params) {
  return request({
    url: `${base}/customerUser/login`,
    method: 'post',
    data: params
  })
}
export function resetPassWord(params) {
    return request({
      url: `${base}/customerUser/resetPassWord`,
      method: 'post',
      data: params
    })
}
export function getBanner(params) {
    return request({
      url: `${base}/customerUser/getBanner`,
      method: 'post',
      data: params
    })
  }
  export function getProduct(params) {
    return request({
      url: `${base}/customerUser/getProduct`,
      method: 'post',
      data: params
    })
  }  
  export function getProductDetail(params) {
    return request({
      url: `${base}/customerUser/getProductDetail`,
      method: 'post',
      data: params
    })
  }  
  