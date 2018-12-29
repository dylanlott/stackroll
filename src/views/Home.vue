<template>
  <v-layout row wrap>
    <v-flex text-xs-center>
      <!-- header -->
      <h1 class="display-2 font-weight-medium my-3">StackRoll</h1>
      <v-card>
        <v-card-title>
          <h2>Create</h2>
        </v-card-title>
        <v-card-text>
          <v-flex xs12 class="ma-2">
            <v-text-field
              outline
              placeholder="Name your stack"
              v-model="roll.name"
            ></v-text-field>
          </v-flex>
            <h2>Add dice to the stack</h2>
            <v-layout justify-space-between row wrap>
              <v-flex :key="index" v-for="(item, index) in dice">
                <v-btn @click="addItem(item)" color="primary">
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

              <v-btn block @click="addModifier(modifier)" color="accent">Add Modifier</v-btn>
              </v-layout>
            </v-flex>

            <v-list>
              <v-list-tile :key="index" v-for="(item, index) in roll.stack">
                {{ item.name }}
                <v-spacer></v-spacer>
                <v-btn @click="addStack()" fab small dark color="warning"><v-icon small>delete</v-icon></v-btn>
              </v-list-tile>
            </v-list>

            <v-btn @click="addStack(roll)" block color="primary">Create Roll</v-btn>

          </v-card-text>
        </v-card>

        <v-card class="my-4">
          <v-card-title><h2>Rolls</h2></v-card-title>
          <v-list dense>
            <v-list-tile :key="index" v-for="(roll, index) in rolls">
              <v-btn small @click="rollStack(roll)" color="accent">
                <v-icon>refresh</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              {{ roll.name || "" }}
              <v-spacer></v-spacer>
              <v-icon color="error lighten-1" @click="removeRoll(roll)" small>delete</v-icon>
            </v-list-tile>
            <v-list-tile v-if="rolls.length < 1">
              You haven't added any rolls yet.
            </v-list-tile>
          </v-list>
        </v-card>
        <v-card class="my-4">
          <v-card-title><h2>Tape</h2></v-card-title>
          <v-list dense>
            <v-list-tile :key="index" v-for="(item, index) in tape">
              {{ item.stack.name }} {{ item.total }} / {{ item.possible }}
            </v-list-tile>
          </v-list>
        </v-card>

      <div class="caption">
        <p>Double-click to edit a stack.</p>
        <p>Single-click to roll a stack.</p>
      </div>
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
  name: 'stackroll',
  props: ['filter'],
  components: {
    TodoItem,
    FooterInfo
  },
  data () {
    return {
      tabs: [
        1, 2, 3
      ],
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
        stack: []
      },
      dice: [
        { type: 'dice', name: 'D20', value: 20 },
        { type: 'dice', name: 'D10', value: 10 },
        { type: 'dice', name: 'D8', value: 8 },
        { type: 'dice', name: 'D6', value: 6 },
        { type: 'dice', name: 'D4', value: 4 }
      ]
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
    },
    tape () {
      return this.$store.state.tape
    }
  },
  methods: {
    ...mapActions([
      'toggleAll',
      'clearCompleted',
      'removeRoll',
      'rollStack'
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
