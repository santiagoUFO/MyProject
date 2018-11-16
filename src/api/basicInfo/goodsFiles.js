
import request from '@/utils/request'
import store from '@/store/index.js'

// 货物档案添加

export function goodsFileAdd(paramsObj) {
  return request({
    url: '/api/v1/goods/add',
    params: {
      _token: store.state.token,
      goods_name: paramsObj.goods_name,
      goods_group: paramsObj.goods_group,
      barcode: paramsObj.barcode,
      goods_number: paramsObj.goods_number,
      warning_number: paramsObj.warning_number,
      goods_price: paramsObj.goodacs_price,
      market_price: paramsObj.market_price,
      cost_price: paramsObj.cost_price,
      description: paramsObj.description,
      base_goods_id: paramsObj.base_goods_id,
    }
  })
}

// 货物档案删除

export function goodsFileDel(goodsId) {
  return request({
    url: '/api/v1/goods/del',
    params: {
      _token: store.state.token,
      goods_id: goodsId
    }
  })
}

// 货物档案编辑

export function goodsFileEdit(paramsObj) {
  return request({
    url: '/api/v1/goods/edit',
    params: {
      _token: store.state.token,
      goods_id: paramsObj.goods_id,
      goods_name: paramsObj.goods_name,
      goods_group: paramsObj.goods_group,
      barcode: paramsObj.barcode,
      goods_number: paramsObj.goods_number,
      warning_number: paramsObj.warning_number,
      goods_price: paramsObj.goods_price,
      market_price: paramsObj.market_price,
      cost_price: paramsObj.cost_price,
      description: paramsObj.description,
      base_goods_id: paramsObj.base_goods_id,
    }
  })
}

// 货物档案列表

export function goodsFileList() {
  return request({
    url: '/api/v1/goods/index',
    params: {
      _token: store.state.token,
    }
  })
}
