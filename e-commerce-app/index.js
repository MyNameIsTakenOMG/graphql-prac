const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { products, categories } = require('../dataFeed');

const typeDefs = `
  type Query {
    hello: String!
    numberOfAnimals: [Int!]!
    price: Float
    isCool: Boolean
    product(id: ID!): Product
    products: [Product!]!
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    category: Category
  }
  type Category {
    id:ID!
    name: String!
    products: [Product!]!
  }
`;
const resolvers = {
  Product: {
    category: (parent, args, context) => {
      const { category_id } = parent;
      return categories.find((category) => category.id === category_id);
    },
  },
  Category: {
    products: (parent, args, context) => {
      console.log(parent);
      const { id } = parent;
      return products.filter((product) => product.category_id === id);
    },
  },
  Query: {
    hello: () => {
      return 'hello world';
    },
    numberOfAnimals: () => {
      return [55];
    },
    price: () => {
      return 23.3;
    },
    isCool: () => {
      return true;
    },
    products: () => {
      return products;
    },
    product: (parent, args, context) => {
      console.log(args);
      const { id } = args;
      return products.find((product) => product.id === id);
    },
    categories: () => {
      return categories;
    },
    category: (parent, args, context) => {
      const { id } = args;
      return categories.find((category) => category.id === id);
    },
  },
};

const server = new ApolloServer({
  // type definitions
  // resolvers
  typeDefs,
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
