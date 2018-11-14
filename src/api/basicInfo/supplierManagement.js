
import request from '@/utils/request'

// 供应商列表

export function supplierList(token, keys) {
  return request({
    url: '/api/v1/vendor/index',
    params: {
      _token: token,
      keys: keys
    }
  })
}

// 供应商编辑

export function supplierEdit(paramsObj, token) {
  return request({
    url: '/api/v1/vendor/edit',
    params: {
      _token: token,
      vendor_id: paramsObj.vendor_id,
      vendor_name: paramsObj.vendor_name,
      vendor_tel: paramsObj.vendor_tel,
      vendor_contacts: paramsObj.vendor_contacts,
      vendor_addr: paramsObj.vendor_addr,
      vendor_mobile: paramsObj.vendor_mobile
    }
  })
}

// 供应商删除

export function supplierDel(vendorId, token) {
  return request({
    url: '/api/v1/vendor/del',
    params: {
      _token: token,
      vendor_id: vendorId
    }
  })
}

// 供应商添加

export function supplierAdd(paramsObj, token) {
  return request({
    url: '/api/v1/vendor/add',
    params: {
      _token: token,
      vendor_name: paramsObj.vendor_name,
      vendor_tel: paramsObj.vendor_tel,
      vendor_contacts: paramsObj.vendor_contacts,
      vendor_addr: paramsObj.vendor_addr,
      vendor_mobile: paramsObj.vendor_mobile,
    }
  })
}

