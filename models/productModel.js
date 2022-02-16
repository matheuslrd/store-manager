const connection = require('./connection');

const findByName = async ({ name }) => {
  const query = 'SELECT name FROM StoreManager.products WHERE name = ?';
  const [rows] = await connection.execute(query, [name]);

  return rows[0];
};

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
  const [rows] = await connection.execute(query, [name, quantity]);

  return rows;
};

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);

  return products;
};

const getById = async ({ id }) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);

  return product[0];
};

const update = async ({ id, body }) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [body.name, body.quantity, id]);

  const product = await getById({ id });

  return product;
};

const deleteProduct = async ({ id }) => {
  const product = await getById({ id });
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);

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