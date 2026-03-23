const pool = require('../db/connection');

// 1. GET /ventas
const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Ventas ORDER BY fecha DESC');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ventas', detail: err.message });
  }
};

// 2. GET /ventas/:id
const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Ventas WHERE id_venta = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Venta no encontrada' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener venta', detail: err.message });
  }
};

// 3. POST /ventas
const create = async (req, res) => {
  const { fecha, total, id_cliente, id_empleado } = req.body;
  if (!fecha || total == null || !id_cliente || !id_empleado)
    return res.status(400).json({ error: 'Faltan campos requeridos: fecha, total, id_cliente, id_empleado' });
  try {
    const [result] = await pool.query(
      'INSERT INTO Ventas (fecha, total, id_cliente, id_empleado) VALUES (?, ?, ?, ?)',
      [fecha, total, id_cliente, id_empleado]
    );
    res.status(201).json({ id_venta: result.insertId, fecha, total, id_cliente, id_empleado });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear venta', detail: err.message });
  }
};

// 4. PUT /ventas/:id
const update = async (req, res) => {
  const { fecha, total, id_cliente, id_empleado } = req.body;
  if (!fecha || total == null || !id_cliente || !id_empleado)
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  try {
    const [result] = await pool.query(
      'UPDATE Ventas SET fecha=?, total=?, id_cliente=?, id_empleado=? WHERE id_venta=?',
      [fecha, total, id_cliente, id_empleado, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Venta no encontrada' });
    res.status(200).json({ message: 'Venta actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar venta', detail: err.message });
  }
};

// 5. PATCH /ventas/:id
const patch = async (req, res) => {
  const fields = req.body;
  const allowed = ['fecha', 'total', 'id_cliente', 'id_empleado'];
  const updates = Object.keys(fields).filter(k => allowed.includes(k));
  if (updates.length === 0) return res.status(400).json({ error: 'Sin campos válidos para actualizar' });
  try {
    const sql = `UPDATE Ventas SET ${updates.map(k => `${k}=?`).join(', ')} WHERE id_venta=?`;
    const [result] = await pool.query(sql, [...updates.map(k => fields[k]), req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Venta no encontrada' });
    res.status(200).json({ message: 'Venta actualizada parcialmente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar venta', detail: err.message });
  }
};

// 6. DELETE /ventas/:id
const remove = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Ventas WHERE id_venta=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Venta no encontrada' });
    res.status(200).json({ message: 'Venta eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar venta', detail: err.message });
  }
};

// 7. GET /ventas/:id/detalle — Custom: detalle de una venta
const getDetalle = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT dv.*, p.nombre_producto, p.tipo
       FROM Detalle_Ventas dv
       JOIN Productos p ON dv.id_producto = p.id_producto
       WHERE dv.id_venta = ?`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No hay detalle para esta venta' });
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener detalle', detail: err.message });
  }
};

// 8. GET /ventas/reporte/total — Custom: total vendido por fecha
const getReporte = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT DATE(fecha) AS dia, COUNT(*) AS num_ventas, SUM(total) AS total_dia
       FROM Ventas
       GROUP BY DATE(fecha)
       ORDER BY dia DESC`
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al generar reporte', detail: err.message });
  }
};

module.exports = { getAll, getById, create, update, patch, remove, getDetalle, getReporte };
