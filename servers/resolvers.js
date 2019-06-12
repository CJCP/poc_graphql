const PubSub = require('apollo-server').PubSub;
const pubsub = new PubSub;
const TODO_ADDED = 'TODO_ADDED';

module.exports = {
    Subscription: {
      todoAdded: {
        subscribe: () => pubsub.asyncIterator([TODO_ADDED]),
      },
    },
    Query: {
        todoList: (_, __, { dataSources: TodoAPI }) => TodoAPI.getTodoList()
    },
    Mutation : {
        addTodo: (_, { todo }, { dataSources: TodoAPI }) => {
          const todoList = TodoAPI.addTodo(todo);
          pubsub.publish(TODO_ADDED, { todoAdded : todoList });
          return true;
        }
    }
}
