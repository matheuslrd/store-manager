const Product = require('../services/ProductService');

const validateName = async (req, res, next) => {
  const { name } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
    
  const product = await Product.findByName({ name });

  if (product) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400)
      .json({ message: '"quantity" is required' });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(422).json(
      { message: '"quantity" must be a number larger than or equal to 1' },
    );
  }

  next();
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await Product.create({ name, quantity });

  return res.status(201).json(product);
};

const getAll = async (_req, res) => {
  const products = await Product.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  let { id } = req.params;
  id = Number(id);

  const product = await Product.getById({ id });

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

module.exports = {
  create,
  validateName,
  validateQuantity,
  getAll,
  getById,
};