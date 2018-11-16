
import request from '@/utils/request'
import store from '@/store/index.js'

// 结算账户列表

export function settlementAccountList() {
  return request({
    url: '/api/v1/paymenttype/index',
    params: {
      _token: store.state.token,
    }
  })
}

// 账户类型列表

export function AccountTypeList() {
  return request({
    url: '/api/v1/paymentmode/lists',
    params: {
      _token: store.state.token,
    }
  })
}
