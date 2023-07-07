const { v4: uuidv4 } = require('uuid');

const Mutation = {
  addCategory: (parent, args, context) => {
    const { input } = args;
    const { categories } = context;
    const newCategory = {
      id: uuidv4(),
      name: input.name,
    };
    categories.push(newCategory);
    return newCategory;
  },
};

module.exports = { Mutation };
