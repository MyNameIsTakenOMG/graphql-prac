const Product = {
  category: (parent, args, context) => {
    const { category_id } = parent;
    const categories = context.categories;
    return categories.find((category) => category.id === category_id);
  },
  reviews: (parent, args, context) => {
    const { id } = parent;
    const reviews = context.reviews;
    return reviews.filter((review) => review.productId === id);
  },
};

module.exports = { Product };
