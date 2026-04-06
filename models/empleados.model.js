const pool = require('../config/db');

const getAll = () => pool.query('SELECT * FROM Empleados');
const getById = (id) => pool.query('SELECT * FROM Empleados WHERE id_empleado = ?', [id]);
const create = (nombre, apellido, puesto, telefono, fecha_contratacion, salario) =>
  pool.query('INSERT INTO Empleados (nombre, apellido, puesto, telefono, fecha_contratacion, salario) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, puesto, telefono, fecha_contratacion, salario]);
const update = (id, nombre, apellido, puesto, telefono, fecha_contratacion, salario) =>
  pool.query('UPDATE Empleados SET nombre=?, apellido=?, puesto=?, telefono=?, fecha_contratacion=?, salario=? WHERE id_empleado=?', [nombre, apellido, puesto, telefono, fecha_contratacion, salario, id]);
const patch = (query, values) => pool.query(query, values);
const remove = (id) => pool.query('DELETE FROM Empleados WHERE id_empleado=?', [id]);
const getByPuesto = (puesto) => pool.query('SELECT * FROM Empleados WHERE puesto = ?', [puesto]);
const getVentas = (id) => pool.query('SELECT * FROM Ventas WHERE id_empleado = ? ORDER BY fecha DESC', [id]);

module.exports = { getAll, getById, create, update, patch, remove, getByPuesto, getVentas };