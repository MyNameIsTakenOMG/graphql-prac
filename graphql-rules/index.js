const { ApolloServer } = require('apollo-server');
const { startStandaloneServer } = require('@apollo/server/standalone');

exports.typeDefs = `
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type MannualGroup {
    Image
    [GroupMembership]
  }
  type AutomaticGroup {
    Image
    [GroupMembership]
    [AutomaticallyGroupFeatures]
  }

  type AutomaticGroupFeatures{
  }

  type GroupMembership{
    Group
    Car
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: 'blue', make: 'Toyota' }],
    },
  },
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
