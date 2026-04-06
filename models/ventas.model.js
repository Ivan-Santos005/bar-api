const pool = require('../config/db');

const getAll = () => pool.query('SELECT * FROM Ventas ORDER BY fecha DESC');
const getById = (id) => pool.query('SELECT * FROM Ventas WHERE id_venta = ?', [id]);
const create = (fecha, total, id_cliente, id_empleado) =>
  pool.query('INSERT INTO Ventas (fecha, total, id_cliente, id_empleado) VALUES (?, ?, ?, ?)', [fecha, total, id_cliente, id_empleado]);
const update = (id, fecha, total, id_cliente, id_empleado) =>
  pool.query('UPDATE Ventas SET fecha=?, total=?, id_cliente=?, id_empleado=? WHERE id_venta=?', [fecha, total, id_cliente, id_empleado, id]);
const patch = (query, values) => pool.query(query, values);
const remove = (id) => pool.query('DELETE FROM Ventas WHERE id_venta=?', [id]);
const getDetalle = (id) =>
  pool.query(
    `SELECT dv.*, p.nombre_producto, p.tipo
     FROM Detalle_Ventas dv
     JOIN Productos p ON dv.id_producto = p.id_producto
     WHERE dv.id_venta = ?`,
    [id]
  );
const getReporte = () =>
  pool.query(
    `SELECT DATE(fecha) AS dia, COUNT(*) AS num_ventas, SUM(total) AS total_dia
     FROM Ventas
     GROUP BY DATE(fecha)
     ORDER BY dia DESC`
  );

module.exports = { getAll, getById, create, update, patch, remove, getDetalle, getReporte };