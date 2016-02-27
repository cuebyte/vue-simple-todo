<template>
  <div id="todo">
    <h2>{{ title }}</h2>
    <br>
    <!--输入框-->
    <input type="text"
           placeholder="代办事项"
           v-model="newTodo"
           @keyup.enter="add">
    <br>
    <!--列表-->
    <ul v-for="todo in todos">
      <input type="checkbox" v-model="todo.checked">
      <label>
        <del v-if="todo.checked">{{todo.content}}</del>
        <span v-else="todo.checked">{{todo.content}}</span>
      </label>
      <button @click="removeTodo(todo)">x</button>
    </ul>
  </div>
</template>

<script type="module">
  'use strict'

  const STORAGE_KEY = 'todos3'

  const todoStorage = {
    fetch: () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
    save: (todo) => localStorage.setItem(STORAGE_KEY, JSON.stringify(todo))
  }

  export default {
    // init data
    data: function () {
      return {
        title: 'Todo List',
        todos: todoStorage.fetch() || [],
        newTodo: ''
      }
    },

    watch: {
      todos: {
        handler: function (todos) {
          todoStorage.save(todos)
        },
        deep: true
      }
    },

    methods: {
      add: function () {
        let value = this.newTodo && this.newTodo.trim()
        if(!value) return

        this.todos.push({content: value, checked: false})
        this.newTodo = ''
      },
      removeTodo: function (todo) {
        this.todos.$remove(todo)
      }
    }
  }
</script>
