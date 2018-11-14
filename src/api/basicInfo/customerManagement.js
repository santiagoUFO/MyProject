
import request from '@/utils/request'
import store from '@/store/index.js'

// 客户列表

export function customerList(keys) {
  return request({
    url: '/api/v1/vipuser/index',
    params: {
      _token: store.state.token,
      keys: keys
    }
  })
}

// 客户编辑

export function customerEdit(paramsObj) {
  return request({
    url: '/api/v1/vipuser/edit',
    params: {
      _token: store.state.token,
      username: paramsObj.username,
      tel: paramsObj.tel,
      linkman: paramsObj.linkman,
      work_address: paramsObj.work_address,
      remark: paramsObj.remark,
      vip_grade: paramsObj.vip_grade
    }
  })
}

// 客户删除

export function customerDel(id) {
  return request({
    url: '/api/v1/vipuser/del',
    params: {
      _token: store.state.token,
      id: id
    }
  })
}

// 客户添加

export function customerAdd(paramsObj) {
  return request({
    url: '/api/v1/vipuser/add',
    params: {
      _token: store.state.token,
      username: paramsObj.username,
      tel: paramsObj.tel,
      linkman: paramsObj.linkman,
      address: paramsObj.address,
      work_address: paramsObj.work_address,
      remark: paramsObj.remark,
      amount_top: paramsObj.amount_top,
      vip_grade: paramsObj.vip_grade,
    }
  })
}

// 客户等级列表
export function customerGrade() {
  return request({
    url: '/api/v1/vipuser/gradelist',
    params: {
      _token: store.state.token,
    }
  })
}

