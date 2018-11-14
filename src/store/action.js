
import { login, getInfo, logOut } from '../api/login'
import { setToken, removeToken } from '@/utils/auth'

// 登录

export const Login = function ({ commit }, userInfo) {
  // console.log(userInfo)
  const username = userInfo.username.trim()
  return new Promise((resolve, reject) => {
    login(username, userInfo.password).then(res => {
      const data = res.data;
      // console.log(data)
      setToken(data._token)
      commit('SET_TOKEN', data._token)
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取用户信息

export const GetInfo = function ({ commit, state }) {
  return new Promise((resolve, reject) => {
    getInfo(state.token).then(res => {
      const data = res.data
      console.log('getInfo', data)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

// 退出登录

export const LogOut = function ({commit, state}) {
  return new Promise((resolve, reject) => {
    logOut(state.token).then(res => {
      commit('SET_TOKEN', '')
      state.showLogin = true
      removeToken()
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

