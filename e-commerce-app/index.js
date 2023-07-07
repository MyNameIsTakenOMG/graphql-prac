const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs } = require('./schema');
const { Query } = require('./resolvers/Query');
const { Category } = require('./resolvers/Category');
const { Product } = require('./resolvers/Product');
const { db } = require('./dataFeed');
const { Mutation } = require('./resolvers/Mutation');

const resolvers = {
  Product: Product,
  Category: Category,
  Query: Query,
  Mutation: Mutation,
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
});

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 3000,
    },
    context: (req, res) => ({
      db,
    }),
  });

  console.log('server started at ' + url);
};

start();
