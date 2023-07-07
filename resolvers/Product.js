const { categories } = require('../dataFeed');

const Product = {
  category: (parent, args, context) => {
    const { category_id } = parent;
    return categories.find((category) => category.id === category_id);
  },
};

module.exports = { Product };
