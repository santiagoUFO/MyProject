
import request from '@/utils/request'
import store from '@/store/index.js'

// 销售明细

export function saleDetail(orderId) {
  return request({
    url: '/api/v1/sell/orders',
    params: {
      _token: store.state.token,
      order_id: orderId
    }
  })
}

// 销售列表

export function saleList(paramsObj, page = 1) {
  return request({
    url: '/api/v1/sell/index',
    params: {
      _token: store.state.token,
      inventory_record_no: paramsObj ? paramsObj.ticketNumber : '',
      time_top: paramsObj ? paramsObj.dateArr[0] : '',
      time_end: paramsObj ? paramsObj.dateArr[1] : '',
      page: page
    }
  })
}

// 添加销售单

export function addSaleForm(paramsObj) {
  return request({
    url: '/api/v1/sell/selladd',
    params: {
      _token: store.state.token,
      payment_type: paramsObj.payment_type,
      total_goods_price: paramsObj.total_goods_price,
      discounts: paramsObj.discounts,
      discounts_price: paramsObj.discounts_price,
      username: paramsObj.username,
      description: paramsObj.remark,
      json_goods: paramsObj.json_goods,
    }
  })
}

