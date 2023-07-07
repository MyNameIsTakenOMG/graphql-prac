const { products } = require('../dataFeed');

const Category = {
  products: (parent, args, context) => {
    console.log(parent);
    const { id } = parent;
    return products.filter((product) => product.category_id === id);
  },
};

module.exports = { Category };
