import request from '@/utils/request'
export function login(username, password) {
  return request({
    url: '/api/v1/shopmember/login',
    params: {
      account: username,
      pwd: password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/v1/shopmember/roles',
    params: {
      _token: token
    }
  })
}

export function logOut(token) {
  return request({
    url: '/api/v1/shopmember/logout',
    params: {
      _token: token
    }
  })
}
