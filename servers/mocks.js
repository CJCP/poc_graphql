class API {
  constructor() {
    this.todoList = ['Buy a smartphone']
  }

  getTodoList() {
    return this.todoList;
  }

  addTodo(todo) {
    this.todoList = [...this.todoList, todo];
    return this.todoList;
  }

}

const todoAPI = new API();

module.exports = function () {
  return todoAPI;
}
