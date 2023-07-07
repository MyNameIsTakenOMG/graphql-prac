const Query = {
  numberOfAnimals: () => {
    return [55];
  },
  price: () => {
    return 23.3;
  },
  isCool: () => {
    return true;
  },
  products: (parent, args, context) => {
    const filter = args.filter;
    let filteredProducts = context.products;

    if (filter) {
      if (filter.onSale === true) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
    }
    return filteredProducts;
  },
  product: (parent, args, context) => {
    // console.log(args);
    const { id } = args;
    return context.products.find((product) => product.id === id);
  },
  categories: (parent, args, context) => {
    return context.categories;
  },
  category: (parent, args, context) => {
    const { id } = args;
    return context.categories.find((category) => category.id === id);
  },
};

module.exports = { Query };
