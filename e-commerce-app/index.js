const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs } = require('../schema');
const { Query } = require('../resolvers/Query');
const { Category } = require('../resolvers/Category');
const { Product } = require('../resolvers/Product');

const resolvers = {
  Product: Product,
  Category: Category,
  Query: Query,
};

const server = new ApolloServer({
  // type definitions
  // resolvers
  typeDefs: typeDefs,
  resolvers,
});

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 3000,
    },
  });

  console.log('server started at ' + url);
};

start();
