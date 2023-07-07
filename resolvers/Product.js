const Product = {
  category: (parent, args, context) => {
    const { category_id } = parent;
    const categories = context.categories;
    return categories.find((category) => category.id === category_id);
  },
};

module.exports = { Product };
