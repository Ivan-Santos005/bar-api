const pool = require('../config/db');

const getAll = () => pool.query('SELECT * FROM Bebidas');
const getById = (id) => pool.query('SELECT * FROM Bebidas WHERE id_bebida = ?', [id]);
const getByTipo = (tipo) => pool.query('SELECT * FROM Bebidas WHERE tipo = ?', [tipo]);
const create = (id_bebida, nombre, tipo, cantidad, unidad, precio) =>
  pool.query('INSERT INTO Bebidas (id_bebida, nombre, tipo, cantidad, unidad, precio) VALUES (?, ?, ?, ?, ?, ?)', [id_bebida, nombre, tipo, cantidad, unidad, precio]);
const update = (id, nombre, tipo, cantidad, unidad, precio) =>
  pool.query('UPDATE Bebidas SET nombre=?, tipo=?, cantidad=?, unidad=?, precio=? WHERE id_bebida=?', [nombre, tipo, cantidad, unidad, precio, id]);
const patch = (query, values) => pool.query(query, values);
const remove = (id) => pool.query('DELETE FROM Bebidas WHERE id_bebida=?', [id]);
const getIngredientes = (id) => pool.query('SELECT * FROM Ingredientes_Bebidas WHERE id_bebida = ?', [id]);

module.exports = { getAll, getById, getByTipo, create, update, patch, remove, getIngredientes };