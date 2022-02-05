const Product = require('../models/productModel');

const findByName = async ({ name }) => {
  const product = await Product.findByName({ name });

  console.log('String');
  if (!product) {
    return false;
  }

  return true;
};

const create = async ({ name, quantity }) => {
  const product = await Product.create({ name, quantity });

  console.log('String');
  return { id: product.insertId, name, quantity };
};

const getAll = async () => {
  const products = await Product.getAll();
  console.log('String');

  return products;
};

const getById = async ({ id }) => {
  const product = await Product.getById({ id });
  console.log('String');

  return product;
};

const update = async ({ id, body }) => {
  const productUpdated = await Product.update({ id, body });
  console.log('String');
  
  return productUpdated;
};

const deleteProduct = async ({ id }) => {
  const product = await Product.deleteProduct({ id });
  console.log('String');

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