const pool = require('../db/connection');

// 1. GET /clientes
const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Clientes');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clientes', detail: err.message });
  }
};

// 2. GET /clientes/:id
const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener cliente', detail: err.message });
  }
};

// 3. POST /clientes
const create = async (req, res) => {
  const { nombre, apellido, telefono, correo_electronico, fecha_registro } = req.body;
  if (!nombre || !apellido || !fecha_registro)
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, apellido, fecha_registro' });
  try {
    const [result] = await pool.query(
      'INSERT INTO Clientes (nombre, apellido, telefono, correo_electronico, fecha_registro) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, telefono || null, correo_electronico || null, fecha_registro]
    );
    res.status(201).json({ id_cliente: result.insertId, nombre, apellido, telefono, correo_electronico, fecha_registro });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear cliente', detail: err.message });
  }
};

// 4. PUT /clientes/:id
const update = async (req, res) => {
  const { nombre, apellido, telefono, correo_electronico, fecha_registro } = req.body;
  if (!nombre || !apellido || !fecha_registro)
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, apellido, fecha_registro' });
  try {
    const [result] = await pool.query(
      'UPDATE Clientes SET nombre=?, apellido=?, telefono=?, correo_electronico=?, fecha_registro=? WHERE id_cliente=?',
      [nombre, apellido, telefono || null, correo_electronico || null, fecha_registro, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.status(200).json({ message: 'Cliente actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cliente', detail: err.message });
  }
};

// 5. PATCH /clientes/:id
const patch = async (req, res) => {
  const fields = req.body;
  const allowed = ['nombre', 'apellido', 'telefono', 'correo_electronico', 'fecha_registro'];
  const updates = Object.keys(fields).filter(k => allowed.includes(k));
  if (updates.length === 0) return res.status(400).json({ error: 'Sin campos válidos para actualizar' });
  try {
    const sql = `UPDATE Clientes SET ${updates.map(k => `${k}=?`).join(', ')} WHERE id_cliente=?`;
    const [result] = await pool.query(sql, [...updates.map(k => fields[k]), req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.status(200).json({ message: 'Cliente actualizado parcialmente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cliente', detail: err.message });
  }
};

// 6. DELETE /clientes/:id
const remove = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Clientes WHERE id_cliente=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar cliente', detail: err.message });
  }
};

// 7. GET /clientes/:id/ventas — Custom: historial de ventas del cliente
const getVentas = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Ventas WHERE id_cliente = ? ORDER BY fecha DESC', [req.params.id]
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ventas del cliente', detail: err.message });
  }
};

// 8. GET /clientes/buscar?nombre=xxx — Custom: buscar por nombre
const search = async (req, res) => {
  const { nombre } = req.query;
  if (!nombre) return res.status(400).json({ error: 'Se requiere el parámetro nombre' });
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Clientes WHERE nombre LIKE ? OR apellido LIKE ?',
      [`%${nombre}%`, `%${nombre}%`]
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar cliente', detail: err.message });
  }
};

module.exports = { getAll, getById, create, update, patch, remove, getVentas, search };
