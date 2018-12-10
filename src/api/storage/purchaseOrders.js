
import request from '@/utils/request'
import store from '@/store/index.js'

// 采购列表

export function purchaseList(paramsObj, page = 1) {
  return request({
    url: '/api/v1/purchase/caigoulist',
    params: {
      _token: store.state.token,
      purchase_no: paramsObj ? paramsObj.purchase_no : '',
      vendor_id: paramsObj ? paramsObj.vendor_id : '',
      time_top: paramsObj ? paramsObj.dateArr[0] : '',
      time_end: paramsObj ? paramsObj.dateArr[1] : '',
      page: page
    }
  })
}

// 采购单详情

export function purchaseDetail(purchaseId) {
  return request({
    url: '/api/v1/purchase/caigoudetail',
    params: {
      _token: store.state.token,
      purchase_id: purchaseId
    }
  })
}

// 添加采购单

export function addPurchaseForm(paramsObj) {
  return request({
    url: '/api/v1/purchase/caigouadd',
    params: {
      _token: store.state.token,
      payment_type: vendor_id.payment_type,
      vendor_id: paramsObj.vendor_id,
      total_goods_price: paramsObj.total_goods_price,
      discounts: paramsObj.discounts,
      discounts_price: paramsObj.discounts_price,
      // username: paramsObj.username,
      description: paramsObj.remark,
      json_goods: paramsObj.json_goods,
    }
  })
}

