const Product = require('../services/ProductService');

const findByName = async (req, res, next) => {
  const { name } = req.body;

  const product = await Product.findByName(name);

  if (product) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  next();
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await Product.create(name, quantity);

  if (!product) {
    res.status(400).json({ message: 'erro!' });
  }

  res.status(200).json({ message: 'Adicionou' });
};

module.exports = {
  create,
  findByName,
};