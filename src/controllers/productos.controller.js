const pool = require('../db/connection');

// 1. GET /productos — Listar todos
const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Productos');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos', detail: err.message });
  }
};

// 2. GET /productos/:id — Obtener por ID
const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Productos WHERE id_producto = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener producto', detail: err.message });
  }
};

// 3. POST /productos — Crear
const create = async (req, res) => {
  const { nombre_producto, tipo, precio, stock, descripcion } = req.body;
  if (!nombre_producto || !tipo || precio == null || stock == null)
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre_producto, tipo, precio, stock' });
  try {
    const [result] = await pool.query(
      'INSERT INTO Productos (nombre_producto, tipo, precio, stock, descripcion) VALUES (?, ?, ?, ?, ?)',
      [nombre_producto, tipo, precio, stock, descripcion || null]
    );
    res.status(201).json({ id_producto: result.insertId, nombre_producto, tipo, precio, stock, descripcion });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto', detail: err.message });
  }
};

// 4. PUT /productos/:id — Reemplazar completo
const update = async (req, res) => {
  const { nombre_producto, tipo, precio, stock, descripcion } = req.body;
  if (!nombre_producto || !tipo || precio == null || stock == null)
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre_producto, tipo, precio, stock' });
  try {
    const [result] = await pool.query(
      'UPDATE Productos SET nombre_producto=?, tipo=?, precio=?, stock=?, descripcion=? WHERE id_producto=?',
      [nombre_producto, tipo, precio, stock, descripcion || null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto', detail: err.message });
  }
};

// 5. PATCH /productos/:id — Actualización parcial
const patch = async (req, res) => {
  const fields = req.body;
  if (Object.keys(fields).length === 0)
    return res.status(400).json({ error: 'Se requiere al menos un campo para actualizar' });
  const allowed = ['nombre_producto', 'tipo', 'precio', 'stock', 'descripcion'];
  const updates = Object.keys(fields).filter(k => allowed.includes(k));
  if (updates.length === 0)
    return res.status(400).json({ error: 'Campos no válidos' });
  try {
    const sql = `UPDATE Productos SET ${updates.map(k => `${k}=?`).join(', ')} WHERE id_producto=?`;
    const values = [...updates.map(k => fields[k]), req.params.id];
    const [result] = await pool.query(sql, values);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json({ message: 'Producto actualizado parcialmente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto', detail: err.message });
  }
};

// 6. DELETE /productos/:id — Eliminar
const remove = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Productos WHERE id_producto=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto', detail: err.message });
  }
};

// 7. GET /productos/tipo/:tipo — Custom: filtrar por tipo
const getByTipo = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Productos WHERE tipo = ?', [req.params.tipo]);
    if (rows.length === 0) return res.status(404).json({ error: 'No hay productos de ese tipo' });
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar productos', detail: err.message });
  }
};

// 8. PATCH /productos/:id/stock — Custom: actualizar stock
const updateStock = async (req, res) => {
  const { stock } = req.body;
  if (stock == null || isNaN(stock))
    return res.status(400).json({ error: 'El campo stock es requerido y debe ser numérico' });
  try {
    const [result] = await pool.query('UPDATE Productos SET stock=? WHERE id_producto=?', [stock, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json({ message: `Stock actualizado a ${stock}` });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar stock', detail: err.message });
  }
};

module.exports = { getAll, getById, create, update, patch, remove, getByTipo, updateStock };
