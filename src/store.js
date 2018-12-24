import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const STORAGE_KEY = 'STACKROLL'
const version = '0.0.1'

const state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY+'todos') || '[]'),
  rolls: JSON.parse(window.localStorage.getItem(STORAGE_KEY+'rolls') || '[]'),
  tape: JSON.parse(window.localStorage.getItem(STORAGE_KEY+'tape') || '[]'),
}

const mutations = {
  addRoll (state, roll) {
    console.log('adding roll: ', roll)
    state.rolls.push(roll)
  },
  editRoll (state, roll) {
    console.log('not implemented')
  },
  removeRoll (state, roll) {
    state.rolls.splice(state.rolls.indexOf(roll), 1)
  },
  rollStack (state, stack) {
    const { total, possible } = rollDice(stack.stack)
    // TODO: implement the tape here
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
  rollStack ({ commit }, roll) {
    commit('rollStack', roll)
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
  store.subscribe((mutation, { todos, rolls, tape }) => {
    window.localStorage.setItem(STORAGE_KEY+'todos', JSON.stringify(todos))
    window.localStorage.setItem(STORAGE_KEY+'rolls', JSON.stringify(rolls))
    window.localStorage.setItem(STORAGE_KEY+'tape', JSON.stringify(tape))
  })
}]

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins
})

function rollDice(stack) {
  var possible = 0
  var total = 0
  stack.map(item => {
    const diceRolls = 0
    if (item.type == 'dice') {
      const val = getRandom(parseInt(item.value))
      possible = possible + parseInt(item.value)
      total = total + parseInt(val)
    }
    if (item.type == 'modifier') {
      total = total + parseInt(item.value)
    }
  })
  return {
    possible,
    total
  }
}

function getRandom (possible) {
  return Math.floor(Math.random() * possible) + 1
}
