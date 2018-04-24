import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    items: []
  },
  actions: {
    LOAD_TODOS : function ({ commit }) {
      axios.get('/api/todos').then(({ data }) => {
        commit('SET_TODOS_LIST', { list: data })
      })
    },
    REMOVE_TODO :  function({commit}){
      
    }
  },
  mutations: {
    SET_TODOS_LIST: (state, { list }) => {
      state.items = []
      list.forEach(todo => {
        state.items.push(todo);
      });
    }
  },
  getters: {
  },  
  modules: {
    
  }
})
export default store