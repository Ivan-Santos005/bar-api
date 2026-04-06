const pool = require('../config/db');

const getAll = () => pool.query('SELECT * FROM Botanas');
const getById = (id) => pool.query('SELECT * FROM Botanas WHERE id_botana = ?', [id]);
const create = (id_botana, nombre, ingredientes_principales, cantidad, unidad, precio) =>
  pool.query('INSERT INTO Botanas (id_botana, nombre, ingredientes_principales, cantidad, unidad, precio) VALUES (?, ?, ?, ?, ?, ?)', [id_botana, nombre, ingredientes_principales, cantidad, unidad, precio]);
const update = (id, nombre, ingredientes_principales, cantidad, unidad, precio) =>
  pool.query('UPDATE Botanas SET nombre=?, ingredientes_principales=?, cantidad=?, unidad=?, precio=? WHERE id_botana=?', [nombre, ingredientes_principales, cantidad, unidad, precio, id]);
const patch = (query, values) => pool.query(query, values);
const remove = (id) => pool.query('DELETE FROM Botanas WHERE id_botana=?', [id]);
const search = (nombre) => pool.query('SELECT * FROM Botanas WHERE nombre LIKE ?', [`%${nombre}%`]);
const getByPrecioMax = (max) => pool.query('SELECT * FROM Botanas WHERE precio <= ? ORDER BY precio ASC', [max]);

module.exports = { getAll, getById, create, update, patch, remove, search, getByPrecioMax };