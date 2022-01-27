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

module.exports = {
  create,
  findByName,
  getAll,
};