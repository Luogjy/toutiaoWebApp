import * as types from './mutationTypes';

const mutations = {
  [types.SWIPER_PROGRESS](state, swiperProgress) {
    state.swiperProgress = swiperProgress;
  },
  [types.SWIPER_ACTIVE_INDEX](state, swiperActiveIndex) {
    state.swiperActiveIndex = swiperActiveIndex;
  },
  [types.DOCUMENT_SCROLL_TOP](state, {documentScrollTop, actionBarHeight}) {
    state.documentScrollTop = {documentScrollTop, actionBarHeight};
  }

};
export default mutations;
/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。 （例如 store.commit('某个mutation')，当然这里我们用它的映射mapMutations去完成commit操作）
 * Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
 * 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
 *
 * https://vuex.vuejs.org/zh-cn/mutations.html
 */
