const Product = {
  category: (parent, args, context) => {
    const { category_id } = parent;
    const { db } = context;
    return db.categories.find((category) => category.id === category_id);
  },
  reviews: (parent, args, context) => {
    const { id } = parent;
    const { db } = context;
    return db.reviews.filter((review) => review.productId === id);
  },
};

module.exports = { Product };
