const { gql } = require('apollo-server');

const typeDefs = gql`type Query {
    todoList: [String]
}

type Subscription {
    todoAdded: [String]
}

type Mutation {
    addTodo(todo: String): Boolean
}`

// On mutation, we must return something oO
// https://stackoverflow.com/questions/44737043/not-returning-data-from-graphql-mutation

module.exports = typeDefs;
