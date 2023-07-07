const { v4: uuidv4 } = require('uuid');

const Mutation = {
  addCategory: (parent, args, context) => {
    const { input } = args;
    const { db } = context;
    const newCategory = {
      id: uuidv4(),
      name: input.name,
    };
    db.categories.push(newCategory);
    return newCategory;
  },
  addProduct: (parent, args, context) => {
    const { db } = context;
    const newProduct = {
      id: uuidv4(),
      ...args.input,
    };
    db.products.push(newProduct);
    return newProduct;
  },
  addReview: (parent, args, context) => {
    const { db } = context;
    const newReview = {
      id: uuidv4(),
      ...args.input,
    };
    db.reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (parent, args, context) => {
    const { id } = args;
    const { db } = context;
    db.categories = db.categories.filter((category) => category.id !== id);
    db.products = db.products.map((product) => {
      if (product.category_id === id)
        return {
          ...product,
          category_id: null,
        };
      else return product;
    });
    return true;
  },
  deleteProduct: (parent, args, context) => {
    const { id } = args;
    const { db } = context;
    db.products = db.products.filter((product) => product.id !== id);
    db.reviews = db.reviews.filter((review) => review.productId !== id);
    return true;
  },
  deleteReview: (parent, args, context) => {
    const { id } = args;
    const { db } = context;
    db.reviews = db.reviews.filter((review) => review.productId !== id);
    return true;
  },
};

module.exports = { Mutation };
