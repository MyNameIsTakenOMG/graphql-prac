const typeDefs = `
  type Query {
    hello: String!
    numberOfAnimals: [Int!]!
    price: Float
    isCool: Boolean
    product(id: ID!): Product
    products(filter: ProductsFilter): [Product!]!
    categories: [Category!]!
    category(id: ID!): Category
  }
  type Mutation{
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product!
    addReview(input: AddReviewInput!): Review!
    deleteCategory(id:ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
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
    products(filter: ProductsFilter): [Product!]!
  }
  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductsFilter{
    onSale: Boolean
    avgRating: Int
  }

  input AddCategoryInput{
    name: String!
  }
  input AddProductInput{
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    category_id: String!
  }
  input AddReviewInput{
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }
`;

module.exports = { typeDefs };
