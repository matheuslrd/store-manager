const Product = require('../services/ProductService');

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  next();
};

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

  res.status(200).json({ id: product.id, name, quantity });
};

module.exports = {
  create,
  findByName,
  validateName,
};