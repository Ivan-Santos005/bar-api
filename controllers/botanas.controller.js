const pool = require('../config/db');

// 1. GET /botanas
const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Botanas');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener botanas', detail: err.message });
  }
};

// 2. GET /botanas/:id
const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Botanas WHERE id_botana = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Botana no encontrada' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener botana', detail: err.message });
  }
};

// 3. POST /botanas
const create = async (req, res) => {
  const { id_botana, nombre, ingredientes_principales, cantidad, unidad, precio } = req.body;
  if (!id_botana || !nombre || precio == null)
    return res.status(400).json({ error: 'Faltan campos requeridos: id_botana, nombre, precio' });
  try {
    await pool.query(
      'INSERT INTO Botanas (id_botana, nombre, ingredientes_principales, cantidad, unidad, precio) VALUES (?, ?, ?, ?, ?, ?)',
      [id_botana, nombre, ingredientes_principales || null, cantidad || null, unidad || null, precio]
    );
    res.status(201).json({ id_botana, nombre, ingredientes_principales, cantidad, unidad, precio });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear botana', detail: err.message });
  }
};

// 4. PUT /botanas/:id
const update = async (req, res) => {
  const { nombre, ingredientes_principales, cantidad, unidad, precio } = req.body;
  if (!nombre || precio == null)
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, precio' });
  try {
    const [result] = await pool.query(
      'UPDATE Botanas SET nombre=?, ingredientes_principales=?, cantidad=?, unidad=?, precio=? WHERE id_botana=?',
      [nombre, ingredientes_principales || null, cantidad || null, unidad || null, precio, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Botana no encontrada' });
    res.status(200).json({ message: 'Botana actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar botana', detail: err.message });
  }
};

// 5. PATCH /botanas/:id
const patch = async (req, res) => {
  const fields = req.body;
  const allowed = ['nombre', 'ingredientes_principales', 'cantidad', 'unidad', 'precio'];
  const updates = Object.keys(fields).filter(k => allowed.includes(k));
  if (updates.length === 0) return res.status(400).json({ error: 'Sin campos válidos para actualizar' });
  try {
    const sql = `UPDATE Botanas SET ${updates.map(k => `${k}=?`).join(', ')} WHERE id_botana=?`;
    const [result] = await pool.query(sql, [...updates.map(k => fields[k]), req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Botana no encontrada' });
    res.status(200).json({ message: 'Botana actualizada parcialmente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar botana', detail: err.message });
  }
};

// 6. DELETE /botanas/:id
const remove = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Botanas WHERE id_botana=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Botana no encontrada' });
    res.status(200).json({ message: 'Botana eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar botana', detail: err.message });
  }
};

// 7. GET /botanas/buscar?nombre=xxx — Custom: buscar por nombre
const search = async (req, res) => {
  const { nombre } = req.query;
  if (!nombre) return res.status(400).json({ error: 'Se requiere el parámetro nombre' });
  try {
    const [rows] = await pool.query('SELECT * FROM Botanas WHERE nombre LIKE ?', [`%${nombre}%`]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar botana', detail: err.message });
  }
};

// 8. GET /botanas/precio?max=xxx — Custom: filtrar por precio máximo
const getByPrecioMax = async (req, res) => {
  const { max } = req.query;
  if (!max || isNaN(max)) return res.status(400).json({ error: 'Se requiere el parámetro max (numérico)' });
  try {
    const [rows] = await pool.query('SELECT * FROM Botanas WHERE precio <= ? ORDER BY precio ASC', [max]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar botanas', detail: err.message });
  }
};

module.exports = { getAll, getById, create, update, patch, remove, search, getByPrecioMax };
