const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const dataSources = require('./mocks');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
