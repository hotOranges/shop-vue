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
  export function addShipping(params) {
    return request({
      url: `${base}/customerUser/addShipping`,
      method: 'post',
      data: params
    })
  }
  export function listShipping(params) {
    return request({
      url: `${base}/customerUser/listShipping`,
      method: 'post',
      data: params
    })
  }
  export function delShipping(params) {
    return request({
      url: `${base}/customerUser/delShipping`,
      method: 'post',
      data: params
    })
  }
  export function editShipping(params) {
    return request({
      url: `${base}/customerUser/editShipping`,
      method: 'post',
      data: params
    })
  }
  export function listImage(params) {
    return request({
      url: `${base}/customerUser/listImage`,
      method: 'post',
      data: params
    })
  }
  export function placeOrder(params) {
    return request({
      url: `${base}/customer/placeOrder`,
      method: 'post',
      data: params
    })
  }
  export function saveInvoice(params) {
    return request({
      url: `${base}/customer/saveInvoice`,
      method: 'post',
      data: params
    })
  }
  export function payMent(params) {
    return request({
      url: `${base}/customer/payMent`,
      method: 'post',
      data: params
    })
  }
  

  export function addShopCart(params) {
    return request({
      url: `${base}/customer/addShopCart`,
      method: 'post',
      data: params
    })
  }

  export function getShopCart(params) {
    return request({
      url: `${base}/customer/getShopCart`,
      method: 'post',
      data: params
    })
  }

  