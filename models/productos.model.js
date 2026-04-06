const pool = require('../config/db');

const getAll = () => pool.query('SELECT * FROM Productos');
const getById = (id) => pool.query('SELECT * FROM Productos WHERE id_producto = ?', [id]);
const getByTipo = (tipo) => pool.query('SELECT * FROM Productos WHERE tipo = ?', [tipo]);
const create = (nombre_producto, tipo, precio, stock, descripcion) =>
  pool.query('INSERT INTO Productos (nombre_producto, tipo, precio, stock, descripcion) VALUES (?, ?, ?, ?, ?)', [nombre_producto, tipo, precio, stock, descripcion]);
const update = (id, nombre_producto, tipo, precio, stock, descripcion) =>
  pool.query('UPDATE Productos SET nombre_producto=?, tipo=?, precio=?, stock=?, descripcion=? WHERE id_producto=?', [nombre_producto, tipo, precio, stock, descripcion, id]);
const updateStock = (id, stock) =>
  pool.query('UPDATE Productos SET stock=? WHERE id_producto=?', [stock, id]);
const patch = (query, values) => pool.query(query, values);
const remove = (id) => pool.query('DELETE FROM Productos WHERE id_producto=?', [id]);

module.exports = { getAll, getById, getByTipo, create, update, updateStock, patch, remove };