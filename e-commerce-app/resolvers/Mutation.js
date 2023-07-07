const { v4: uuidv4 } = require('uuid');

const Mutation = {
  addCategory: (parent, args, context) => {
    const { input } = args;
    const { categories } = context;
    const newCategory = {
      id: uuidv4(),
      name: input.name,
    };
    categories.push(newCategory);
    return newCategory;
  },
  addProduct: (parent, args, context) => {
    const { products } = context;
    const newProduct = {
      id: uuidv4(),
      ...args.input,
    };
    products.push(newProduct);
    return newProduct;
  },
  addReview: (parent, args, context) => {
    const { reviews } = context;
    const newReview = {
      id: uuidv4(),
      ...args.input,
    };
    reviews.push(newReview);
    return newReview;
  },
};

module.exports = { Mutation };
