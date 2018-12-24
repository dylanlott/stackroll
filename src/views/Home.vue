<template>
  <v-layout row wrap>
    <v-flex text-xs-center>
      <!-- header -->
      <h1 class="display-3 font-weight-medium my-3">StackRoll</h1>
     <!--  
      <v-card>
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-action>
              <v-checkbox
                :input-value="allChecked"
                @change="toggleAll(!allChecked)"
                color="primary"
                v-if="todos.length > 0"
              ></v-checkbox>
              <v-icon
                color="primary"
                v-else
              >check</v-icon>
            </v-list-tile-action>
            <v-text-field
              :label="'New todo input'"
              @keydown.enter="addTodo"
              autofocus
              browser-autocomplete="off"
              clearable
              color="primary"
              flat
              hide-details
              maxlength="1023"
              placeholder="What needs to be done?"
              solo
              v-model="newTodo"
            ></v-text-field>
          </v-list-tile>
        </v-list>
      </v-card>
      -->
      <v-card>
      </v-card-text>
        <v-flex xs12 class="ma-2">
          <v-text-field
            placeholder="Name your stack"
            v-model="roll.name"
          ></v-text-field>
        </v-flex>
          <h2>Add dice to the stack</h2>
          <v-layout row wrap>
            <v-flex v-for="item in dice">
              <v-btn @click="addItem(item)" small color="primary">
                {{ item.name }}
              </v-btn>
            </v-flex>
          </v-layout>

          <h2>Add a modifier</h2>
          <v-flex xs12>
            <v-layout row wrap>

              <v-flex xs9>
                <v-text-field
                  outline
                  placeholder="Modifier name"
                  class="ma-2"
                  v-model="modifier.name"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  class="ma-2"
                  outline
                  type="number"
                  v-model="modifier.value"   
                  ></v-text-field>
              </v-flex>

            <v-btn block @click="addModifier(modifier)"color="accent">Add Modifier</v-btn>
            </v-layout>
          </v-flex>

          <v-list>
            <v-list-tile  v-for="item in roll.stack">
              {{ item.name }} <v-btn @click="addStack()" fab small dark color="warning"><v-icon small>delete</v-icon></v-btn>
            </v-list-tile>
          </v-list>

          <v-btn @click="addStack(roll)" block color="primary">Create Roll</v-btn>

        </v-card-text>
      </v-card>

      <v-card class="my-4">
        <v-card-title><h2>Rolls</h2></v-card-title>
        <v-list>
          <v-list-tile v-for="roll in rolls">
            {{ roll }}
          </v-list-tile>
          <v-list-tile v-if="rolls.length < 1">
            You haven't added any rolls yet.
          </v-list-tile>
        </v-list>
      </v-card>
      <!-- main 
      <v-card class="mt-3" v-show="todos.length">
        <v-progress-linear class="my-0" v-model="progressPercentage"/>
        <v-card-actions class="px-3" v-show="todos.length">
          <span class="primary--text">
            {{ remaining }} {{ remaining | pluralize('item') }} left
          </span>
          <v-spacer></v-spacer>
          <v-btn-toggle
            class="elevation-0"
            mandatory
            v-model="visibility"
            v-show="todos.length"
          >
            <v-btn
              :key="key"
              :to="key"
              :value="key"
              class="mx-0"
              color="primary"
              flat
              small
              v-for="(val, key) in filters"
            >
              {{ key | capitalize }}
            </v-btn>
          </v-btn-toggle>
        </v-card-actions>
        <v-list class="pa-0">
          <template v-for="todo in filteredTodos">
            <v-divider :key="`${todo.uid}-divider`"></v-divider>
            <TodoItem
              :key="todo.uid"
              :todo="todo"
            />
          </template>
        </v-list>
      </v-card>
      <v-btn
        @click="clearCompleted"
        block
        class="mt-3"
        color="primary"
        depressed
        round
        v-show="todos.length > remaining"
      >
        Clear completed
      </v-btn>
    -->
      <footer-info></footer-info>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem.vue'
import FooterInfo from '@/components/FooterInfo.vue'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  props: ['filter'],
  components: {
    TodoItem,
    FooterInfo
  },
  data () {
    return {
      newTodo: '',
      filters: filters,
      visibility: this.filter,
      modifier: {
        type: 'modifier',
        name: '',
        value: 0
      },
      name: '',
      roll: {
        name: '',
        stack: [],
      },
      dice: [
        { type: 'dice', name: 'D20', value: 20 },
        { type: 'dice', name: 'D10', value: 10 },
        { type: 'dice', name: 'D8', value: 8 },
        { type: 'dice', name: 'D6', value: 6 },
        { type: 'dice', name: 'D4', value: 4 }
      ],
      // rolls: []
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    },
    progressPercentage () {
      const len = this.todos.length
      return ((len - this.remaining) * 100) / len
    },
    rolls () {
      return this.$store.state.rolls
    }
  },
  methods: {
    ...mapActions([
      'toggleAll',
      'clearCompleted'
    ]),
    addTodo () {
      const text = this.newTodo.trim()
      if (text) {
        this.$store.dispatch('addTodo', text)
      }
      this.newTodo = ''
    },
    addItem (item) {
      this.roll.stack.push(item)
    },
    addModifier (mod) {
      this.roll.stack.push({
        value: mod.value,
        name: mod.name,
        type: 'modifier'
      })
      this.modifier = {
        value: 0,
        name: '',
        type: 'modifier'
      }
    },
    addStack (roll) {
      this.$store.dispatch('addRoll', roll)
    }
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : (w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>

<style lang="stylus">
h1
  opacity: 0.3
.v-text-field .v-input__slot
  padding: 0 !important

.v-text-field__slot
  padding-left:8px !important
</style>
