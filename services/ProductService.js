const Product = require('../models/ProductModel');

const findByName = async (name) => {
  const product = await Product.findByName(name);

  if (!product) {
    return false;
  }

  return true;
};

const create = async ({ name, quantity }) => {
  const product = await Product.create({ name, quantity });

  return { id: product.insertId, name, quantity };
};

module.exports = {
  create,
  findByName,
};