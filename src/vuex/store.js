/**
 * Created by PetitKero on 30/9/2016.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
//引入store对象
import home from './Core_store/home';
import active from './Core_store/active';
import community from './Core_store/community';

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [],
  modules: {
    home: home,
    active:active,
    community:community,
}
})
