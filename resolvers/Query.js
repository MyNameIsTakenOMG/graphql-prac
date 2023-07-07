const { products, categories } = require('../dataFeed');

const Query = {
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
};

module.exports = { Query };
