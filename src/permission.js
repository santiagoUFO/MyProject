import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
router.beforeEach((to, from, next) => {
  if (getToken()) {
    store.commit('SET_SHOW_LOGIN', false)
    const rolesLength = store.getters.roles.length;
    if (rolesLength === 0) {
      store.dispatch('GetInfo').then(res => { // 拉取用户信息
        next()
      }).catch(err => {
        store.commit('SET_SHOW_LOGIN', true)
        store.dispatch('LogOut').then(() => {
          Message.error(err || 'Vertification fail ,please login again!')
        })
      })
    }
  } else {
    store.commit('SET_SHOW_LOGIN', true)
    next()
  }
})
