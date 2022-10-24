import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {

}
const mutations = {
  goodspush(state, value) {
    state.goods.push(value)
  },
  countedit(state, value) {
    state.count = value
  },
  priceedit(state, value) {
    state.price = value
  },
  resetstate(state) {
    state.goods = []
    state.price = ''
    state.count = ''
  }
}
const state = {
  goods: [],
  price: '',
  count: '',
}

export default new Vuex.Store({
  actions,
  mutations,
  state
})