import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { Query } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
  },
});

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
};
start();
