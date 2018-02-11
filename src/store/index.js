import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
// import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'; // 是否调试

// https://vuex.vuejs.org/zh-cn/mutations.html
// 在src/main.js中引入
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug
  // plugins: debug ? [createLogger()] : []
});
