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
    const { db } = context;
    let filteredProducts = db.products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          // get reviews for the product
          let sumRating = 0;
          let nums = 0;
          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              nums += 1;
            }
          });
          const avgProductRating = sumRating / nums;
          return avgProductRating >= avgRating;
        });
      }
    }
    return filteredProducts;
  },
  product: (parent, args, context) => {
    // console.log(args);
    const { id } = args;
    return context.db.products.find((product) => product.id === id);
  },
  categories: (parent, args, context) => {
    return context.db.categories;
  },
  category: (parent, args, context) => {
    const { id } = args;
    return context.db.categories.find((category) => category.id === id);
  },
};

module.exports = { Query };
