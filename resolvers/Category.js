const Category = {
  products: (parent, args, context) => {
    // console.log(parent);
    const products = context.products;
    const { id } = parent;
    return products.filter((product) => product.category_id === id);
  },
};

module.exports = { Category };
