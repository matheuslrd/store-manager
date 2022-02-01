const SalesService = require('../services/salesService');

const validateProductId = (req, res, next) => {
  const { body } = req;

  body.forEach((product) => {
    if (!product.product_id) {
      return res.status(400).json({ message: '"product_id" is required' });
    }
  });

  next();
};

const validateQuantity = (req, res, next) => {
  const { body } = req;

  body.forEach((product) => {
    if (product.quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }

    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      return res.status(422).json(
        { message: '"quantity" must be a number larger than or equal to 1' },
      );
    }
  });

  next();
};

const createSales = async (req, res) => {
  const { body } = req;

  const productsSales = await SalesService.createSale({ body });
  await SalesService.createSalesProducts({ body });

  return res.status(201).json(productsSales);
};

module.exports = {
  createSales,
  validateProductId,
  validateQuantity,
};
