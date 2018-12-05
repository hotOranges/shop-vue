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
  export function listOrder(params) {
    return request({
      url: `${base}/customer/listOrder`,
      method: 'post',
      data: params
    })
  }
  export function subShopCart(params) {
    return request({
      url: `${base}/customer/subShopCart`,
      method: 'post',
      data: params
    })
  }
  export function delShopCart(params) {
    return request({
      url: `${base}/customer/delShopCart`,
      method: 'post',
      data: params
    })
  }
  export function delOrder(params) {
    return request({
      url: `${base}/customer/delOrder`,
      method: 'post',
      data: params
    })
  }
  export function updateOrderStatus(params) {
    return request({
      url: `${base}/customer/updateOrderStatus`,
      method: 'post',
      data: params
    })
  }
  export function getOrderDetail(params) {
    return request({
      url: `${base}/customer/getOrderDetail`,
      method: 'post',
      data: params
    })
  }
  export function applyPage(params) {
    return request({
      url: `${base}/saleService/applyPage`,
      method: 'post',
      data: params
    })
  }
  export function applyService(params) {
    return request({
      url: `${base}/saleService/applyService`,
      method: 'post',
      data: params
    })
  }
  export function listSale(params) {
    return request({
      url: `${base}/saleService/listSale`,
      method: 'post',
      data: params
    })
  }
  export function saleDetail(params) {
    return request({
      url: `${base}/saleService/saleDetail`,
      method: 'post',
      data: params
    })
  }
  export function upload(params) {
    return request({
      url: `${base}/customerUser/upload`,
      method: 'post',
      data: params
    })
  }
  export function getUser(params) {
    return request({
      url: `${base}/customerUser/getUser`,
      method: 'post',
      data: params
    })
  }
  export function editUser(params) {
    return request({
      url: `${base}/customerUser/editUser`,
      method: 'post',
      data: params
    })
  }
  export function getProductComment(params) {
    return request({
      url: `${base}/customerUser/getProductComment`,
      method: 'post',
      data: params
    })
  }
  export function comment(params) {
    return request({
      url: `${base}/customerUser/comment`,
      method: 'post',
      data: params
    })
  }  
  export function reviews(params) {
    return request({
      url: `${base}/customer/reviews`,
      method: 'post',
      data: params
    })
  }  