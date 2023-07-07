const Category = {
  products: (parent, args, context) => {
    // console.log(parent);
    const products = context.products;
    const { id } = parent;
    const filter = args.filter;
    let filteredProducts = products.filter(
      (product) => product.category_id === id
    );
    if (filter) {
      if (filter.onSale === true) {
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale === true
        );
      }
    }
    return filteredProducts;
  },
};

module.exports = { Category };
