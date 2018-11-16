
import request from '@/utils/request'
import store from '@/store/index.js'

// 商品分类-分类树

export function goodsSortTree(paramsObj) {
  return request({
    url: '/api/v1/goodsgroup/goodsgrouplist',
    params: {
      _token: store.state.token,
    }
  })
}

// 商品分类-添加

export function goodsSortAdd(paramsObj) {
  return request({
    url: '/api/v1/goodsgroup/add',
    params: {
      _token: store.state.token,
      parent_goods_group: paramsObj.parent_goods_group,
      goods_group_name: paramsObj.goods_group_name
    }
  })
}

// 货物分类-编辑

export function goodsSortEdit(paramsObj) {
  return request({
    url: '/api/v1/goodsgroup/edit',
    params: {
      _token: store.state.token,
      goods_group: paramsObj.goods_group,
      goods_group_name: paramsObj.goods_group_name
    }
  })
}

// 货物分类-删除

export function goodsSortDel(goodsGroup) {
  return request({
    url: '/api/v1/goodsgroup/del',
    params: {
      _token: store.state.token,
      goods_group: goodsGroup
    }
  })
}
