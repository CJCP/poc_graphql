module.exports = {
    Query: {
        todoList: (_, __, { dataSources: TodoAPI }) => TodoAPI.getTodoList()
    },
    Mutation : {
        addTodo: (_, { todo }, { dataSources: TodoAPI }) => TodoAPI.addTodo(todo)
    }
}
