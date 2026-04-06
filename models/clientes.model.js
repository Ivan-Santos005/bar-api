const pool = require('../config/db');

const getAll = () => pool.query('SELECT * FROM Clientes');
const getById = (id) => pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [id]);
const create = (nombre, apellido, telefono, correo_electronico, fecha_registro) =>
  pool.query('INSERT INTO Clientes (nombre, apellido, telefono, correo_electronico, fecha_registro) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, telefono, correo_electronico, fecha_registro]);
const update = (id, nombre, apellido, telefono, correo_electronico, fecha_registro) =>
  pool.query('UPDATE Clientes SET nombre=?, apellido=?, telefono=?, correo_electronico=?, fecha_registro=? WHERE id_cliente=?', [nombre, apellido, telefono, correo_electronico, fecha_registro, id]);
const patch = (query, values) => pool.query(query, values);
const remove = (id) => pool.query('DELETE FROM Clientes WHERE id_cliente=?', [id]);
const getVentas = (id) => pool.query('SELECT * FROM Ventas WHERE id_cliente = ? ORDER BY fecha DESC', [id]);
const search = (nombre) => pool.query('SELECT * FROM Clientes WHERE nombre LIKE ? OR apellido LIKE ?', [`%${nombre}%`, `%${nombre}%`]);

module.exports = { getAll, getById, create, update, patch, remove, getVentas, search };