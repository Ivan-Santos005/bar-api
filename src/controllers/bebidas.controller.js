const pool = require('../db/connection');

// 1. GET /bebidas
const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Bebidas');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener bebidas', detail: err.message });
  }
};

// 2. GET /bebidas/:id
const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Bebidas WHERE id_bebida = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Bebida no encontrada' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener bebida', detail: err.message });
  }
};

// 3. POST /bebidas
const create = async (req, res) => {
  const { id_bebida, nombre, tipo, cantidad, unidad, precio } = req.body;
  if (!id_bebida || !nombre || !tipo || cantidad == null || !unidad || precio == null)
    return res.status(400).json({ error: 'Faltan campos requeridos: id_bebida, nombre, tipo, cantidad, unidad, precio' });
  try {
    await pool.query(
      'INSERT INTO Bebidas (id_bebida, nombre, tipo, cantidad, unidad, precio) VALUES (?, ?, ?, ?, ?, ?)',
      [id_bebida, nombre, tipo, cantidad, unidad, precio]
    );
    res.status(201).json({ id_bebida, nombre, tipo, cantidad, unidad, precio });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear bebida', detail: err.message });
  }
};

// 4. PUT /bebidas/:id
const update = async (req, res) => {
  const { nombre, tipo, cantidad, unidad, precio } = req.body;
  if (!nombre || !tipo || cantidad == null || !unidad || precio == null)
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  try {
    const [result] = await pool.query(
      'UPDATE Bebidas SET nombre=?, tipo=?, cantidad=?, unidad=?, precio=? WHERE id_bebida=?',
      [nombre, tipo, cantidad, unidad, precio, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Bebida no encontrada' });
    res.status(200).json({ message: 'Bebida actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar bebida', detail: err.message });
  }
};

// 5. PATCH /bebidas/:id
const patch = async (req, res) => {
  const fields = req.body;
  const allowed = ['nombre', 'tipo', 'cantidad', 'unidad', 'precio'];
  const updates = Object.keys(fields).filter(k => allowed.includes(k));
  if (updates.length === 0) return res.status(400).json({ error: 'Sin campos válidos para actualizar' });
  try {
    const sql = `UPDATE Bebidas SET ${updates.map(k => `${k}=?`).join(', ')} WHERE id_bebida=?`;
    const [result] = await pool.query(sql, [...updates.map(k => fields[k]), req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Bebida no encontrada' });
    res.status(200).json({ message: 'Bebida actualizada parcialmente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar bebida', detail: err.message });
  }
};

// 6. DELETE /bebidas/:id
const remove = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Bebidas WHERE id_bebida=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Bebida no encontrada' });
    res.status(200).json({ message: 'Bebida eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar bebida', detail: err.message });
  }
};

// 7. GET /bebidas/tipo/:tipo — Custom: filtrar por tipo
const getByTipo = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Bebidas WHERE tipo = ?', [req.params.tipo]);
    if (rows.length === 0) return res.status(404).json({ error: 'No hay bebidas de ese tipo' });
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar bebidas', detail: err.message });
  }
};

// 8. GET /bebidas/:id/ingredientes — Custom: ingredientes de una bebida
const getIngredientes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Ingredientes_Bebidas WHERE id_bebida = ?', [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No se encontraron ingredientes para esta bebida' });
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ingredientes', detail: err.message });
  }
};

module.exports = { getAll, getById, create, update, patch, remove, getByTipo, getIngredientes };
