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
    reviews: [Review!]!
  }
  type Category {
    id:ID!
    name: String!
    products: [Product!]!
  }
  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }
`;

module.exports = { typeDefs };
