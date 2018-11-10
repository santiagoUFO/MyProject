import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '../utils/auth'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000 // 请求超时时间
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器

service.interceptors.response.use(
  response => {
    console.log(response)
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error,
      type: 'error',
      duration: 3000
    })
    return Promise.reject(error)
  }
)
export default service
