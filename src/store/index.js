// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    isBright: false
  },
  mutations: {
    toggleBrightness(state) {
      state.isBright = !state.isBright;
    }
  },
  actions: {
    toggleBrightness({ commit }) {
      commit('toggleBrightness');
    }
  },
  getters: {
    isBright: state => state.isBright
  }
});