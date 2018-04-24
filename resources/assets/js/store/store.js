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
    ADD_TODO : function ({ commit, state }, { todo }) {
      axios.post('/api/todos', todo).then((data) => {
        commit('ADD_TODO', { todo: data.data })
      })
    },
    REMOVE_TODO : function ({ commit, state }, { todo }) {
      axios.delete('/api/todos/' + todo.id)
    },
    TOGGLE_TODO : function ({ commit, state }, { todo }) {
      todo.done = !todo.done
      axios.put('/api/todos/' + todo.id, todo)
    }
  },
  mutations: {
    SET_TODOS_LIST: (state, { list }) => {
      state.items = []
      list.forEach(todo => {
        state.items.push(todo);
      });
    },
    ADD_TODO: (state, { todo }) => {
      state.items.push(todo)
    }
  },
  getters: {
  },  
  modules: {
    
  }
})
export default store