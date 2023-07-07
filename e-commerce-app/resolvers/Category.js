const Category = {
  products: (parent, args, context) => {
    // console.log(parent);
    const { db } = context;
    const { id } = parent;
    const filter = args.filter;
    let filteredProducts = db.products.filter(
      (product) => product.category_id === id
    );
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
};

module.exports = { Category };
