import request from '@/utils/request'
export function login(username, password) {
  return request({
    url: '/api/v1/shopmember/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({

  })
}

export function logOut(params) {
  return request({

  })
}
