import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
//import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

/*  const vuexLocal = new VuexPersist({
  storage: window.localStorage
})   */
const store = new Vuex.Store({
  modules: {
    login,
  },
  /*  plugins: [vuexLocal.plugin]  */
})

export default store
