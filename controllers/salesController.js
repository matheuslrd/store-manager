const SalesService = require('../services/salesService');

const validateProductId = (req, res, next) => {
  const { body } = req;

  const isValidProductId = body.some((sale) => (
    !sale.product_id || typeof sale.product_id !== 'number'
  ));

  if (isValidProductId) {
    return res.status(400).json({ message: '"product_id" is required' });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { body } = req;

  const isValidQuantity = body.some((sale) => sale.quantity === undefined);
  if (isValidQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const isValidFormatQuantity = body.some((sale) => (
    typeof sale.quantity !== 'number' || sale.quantity <= 0
  ));
  if (isValidFormatQuantity) {
    return res.status(422).json(
      { message: '"quantity" must be a number larger than or equal to 1' },
    );
  }

  next();
};

const createSales = async (req, res) => {
  const { body } = req;

  const productsSales = await SalesService.createSale({ body });
  const { id } = productsSales;
  await SalesService.createSalesProducts({ body, id });

  return res.status(201).json(productsSales);
};

const getAllSales = async (_req, res) => {
  const products = await SalesService.getAllSales();

  return res.status(200).json(products);
};

const getSaleById = async (req, res) => {
  let { id } = req.params;
  id = Number(id);

  const sale = await SalesService.getSaleById({ id });

  if (!sale || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).send(sale);
};

const validateProductIdUpdated = (req, res, next) => {
  const { product_id: productId } = req.body[0];

  if (!productId) {
    return res.status(400).json({ message: '"product_id" is required' });
  }

  next();
};

const validateQuantityUpdated = (req, res, next) => {
  const { quantity } = req.body[0];

  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400)
      .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

const updateSale = async (req, res) => {
  let { id } = req.params;
  const { body } = req;
  id = Number(id);

  const saleUpdated = await SalesService.updateSale({ id, body });

  return res.status(200).json(saleUpdated);
};

module.exports = {
  createSales,
  validateProductId,
  validateQuantity,
  getAllSales,
  getSaleById,
  updateSale,
  validateProductIdUpdated,
  validateQuantityUpdated,
};
