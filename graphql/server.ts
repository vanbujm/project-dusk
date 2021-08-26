/* eslint-disable @typescript-eslint/no-var-requires */
const { ApolloServer } = require('apollo-server-micro');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

let server;

if (!server) {
  console.log('creating apollo server...');
  server = new ApolloServer({ typeDefs, resolvers });
}

export default server;
