((exports) => {
  'use strict'

  const STORAGE_KEY = 'todos'

  exports.todoStorage = {
    fetch: () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
    save: (todo) => localStorage.setItem(STORAGE_KEY, JSON.stringify(todo))
  }
})(window)