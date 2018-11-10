import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getter'
import mutation from './mutation'
import * as actions from './action'
Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  getters,
  mutation,
  actions
})
export default store
