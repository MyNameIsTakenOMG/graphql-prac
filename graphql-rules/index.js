const { ApolloServer } = require('apollo-server');
const { startStandaloneServer } = require('@apollo/server/standalone');

exports.typeDefs = `
  type Query {
    cars: [Car!]!
  }

  type Mutation{
    groupDelete(groudId: ID!)
    groupUnpublish(groudId: ID!)
    groupPublish(groudId: ID!)
    groupCreate(
      groupInput: GroupInput!
    )
    groupUpdate(
      groupId: ID!
      groupInput: GroupInput!,
    ) : GroupUpdatePayload 
    groupAddCars(groudId: ID!, carId: ID!)
    groupRemoveCars(groudId: ID!, carId: ID!)
  }

  type GroupUpdatePayload{
    group: Group
    userErrors: [UserErrors!]!
  }
  type UserErrors{
    message: String!
    field: [String!]!
  }

  input GroupInput{
    name: String
    image: ImageInput
    description: String
    featureSet: GroupFeatureSet
  }

  input ImageInput{
    url: String!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    featureSet: GroupFeatureSet
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    image: Image!
    description: String!
  }

  type Image{
    id: ID!
    url: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeperately: Boolean!
  }

  type GroupFeatures{
    feature: GroupFeatureFields!
  }

  enum GroupFeatureFields{
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
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

// --------------------------------------------------------
// declaration accepts: | null | []   | [null] | [{foo: 'BAR'}]
// ------------------------------------------------------------------------
// [Vote!]!             | no   | yes  | no     | yes
// [Vote]!              | no   | yes  | yes    | yes
// [Vote!]              | yes  | yes  | no     | yes
// [Vote]               | yes  | yes  | yes    | yes
