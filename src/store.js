import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const STORAGE_KEY = 'STACKROLL'
const version = '0.0.1'

const state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
  rolls: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}

const mutations = {
  addRoll (state, roll) {
    console.log('adding roll: ', roll)
    state.rolls.push(roll)
  },
  editRoll (state, roll) {
    console.log('not implemented')
  },
  deleteRoll (state, roll) {
    state.rolls.splice(state.rolls.indexOf(roll), 1)
  },
  addTodo (state, todo) {
    state.todos.push(todo)
  },
  removeTodo (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  editTodo (state, { todo, text = todo.text, done = todo.done }) {
    todo.text = text
    todo.done = done
  }
}

const actions = {
  addRoll ({ commit }, roll) {
    commit('addRoll', roll)
  },
  editRoll ({ commit }, roll) {
    commit('editRoll')
  },
  removeRoll ({ commit }, roll) {
    commit('removeRoll', roll)
  },
  addTodo ({ commit }, text) {
    commit('addTodo', {
      uid: Date.now(),
      text,
      done: false
    })
  },
  removeTodo ({ commit }, todo) {
    commit('removeTodo', todo)
  },
  toggleTodo ({ commit }, todo) {
    commit('editTodo', { todo, done: !todo.done })
  },
  editTodo ({ commit }, { todo, value }) {
    commit('editTodo', { todo, text: value })
  },
  toggleAll ({ state, commit }, done) {
    state.todos.forEach((todo) => {
      commit('editTodo', { todo, done })
    })
  },
  clearCompleted ({ state, commit }) {
    state.todos.filter(todo => todo.done)
      .forEach(todo => {
        commit('removeTodo', todo)
      })
  }
}

const plugins = [store => {
  store.subscribe((mutation, { todos, rolls }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rolls))
  })
}]

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins
})
