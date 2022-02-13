const Product = require('../models/productModel');

const findByName = async ({ name }) => {
  const product = await Product.findByName({ name });

  if (!product) {
    return false;
  }

  return true;
};

const create = async ({ name, quantity }) => {
  const product = await Product.create({ name, quantity });

  return { id: product.insertId, name, quantity };
};

const getAll = async () => {
  const products = await Product.getAll();

  return products;
};

const getById = async ({ id }) => {
  const product = await Product.getById({ id });

  return product;
};

const update = async ({ id, body }) => {
  const productUpdated = await Product.update({ id, body });
  
  return productUpdated;
};

const deleteProduct = async ({ id }) => {
  const product = await Product.deleteProduct({ id });

  return product;
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
  update,
  deleteProduct,
};