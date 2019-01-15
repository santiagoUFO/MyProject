
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
      payment_type: paramsObj.payment_type,
      vendor_id: paramsObj.username,
      total_goods_price: paramsObj.total_goods_price,
      discounts: paramsObj.discounts,
      discounts_price: paramsObj.discounts_price,
      // username: paramsObj.username,
      description: paramsObj.remark,
      json_goods: paramsObj.json_goods,
    }
  })
}

// 盘点详情

export function profitGoods(profitId, page = 1) {
  return request({
    url: '/api/v1/profit/profitgoods',
    params: {
      _token: store.state.token,
      profit_id: profitId,
      page: page
    }
  })
}

// 盘点单列表

export function profitList() {
  return request({
    url: '/api/v1/profit/index',
    params: {
      _token: store.state.token,
    }
  })
}

// 添加盘点单

export function profitAdd() {
  return request({
    url: '/api/v1/profit/createprofit',
    params: {
      _token: store.state.token,
    }
  })
}

// 退款详情

export function refundDetails(orderId) {
  return request({
    url: '/api/v1/refund/details',
    params: {
      _token: store.state.token,
      order_id: orderId
    }
  })
}

// 退款列表

export function refundList(params) {
  return request({
    url: '/api/v1/refund/index',
    params: {
      _token: store.state.token,
      refund_record_no: params.refund_record_no,
      refund_record_type: params.refund_record_type,
      time_top: params.time_top,
      time_end: params.time_end,
    }
  })
}

// 新增退款单

export function refundAdd(params) {
  return request({
    url: '/api/v1/refund/add',
    params: {
      _token: store.state.token,
      payment_type: params.payment_type,
      total_goods_price: params.total_goods_price,
      total_amount: params.total_amount,
      inventory_record_no: params.inventory_record_no,
      refund_record_type: params.refund_record_type,
      description: params.description,
      json_goods: params.json_goods,
    }
  })
}

