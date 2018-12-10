import request from '@/utils/request'
import store from '@/store/index.js'

// 供应商列表

export function supplierList() {
  return request({
    url: '/api/v1/vendor/lists',
    params: {
      _token: store.state.token,
    }
  })
}

// 条码获取商品

export function barCodeOfGoods(barCode) {
  return request({
    url: '/api/v1/goods/getgoods',
    params: {
      _token: store.state.token,
      barcode: barCode
    }
  })
}
