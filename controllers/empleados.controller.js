const pool = require('../config/db');

// 1. GET /empleados
const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Empleados');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empleados', detail: err.message });
  }
};

// 2. GET /empleados/:id
const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Empleados WHERE id_empleado = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empleado', detail: err.message });
  }
};

// 3. POST /empleados
const create = async (req, res) => {
  const { nombre, apellido, puesto, telefono, fecha_contratacion, salario } = req.body;
  if (!nombre || !apellido || !puesto || !fecha_contratacion || salario == null)
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, apellido, puesto, fecha_contratacion, salario' });
  try {
    const [result] = await pool.query(
      'INSERT INTO Empleados (nombre, apellido, puesto, telefono, fecha_contratacion, salario) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, puesto, telefono || null, fecha_contratacion, salario]
    );
    res.status(201).json({ id_empleado: result.insertId, nombre, apellido, puesto, telefono, fecha_contratacion, salario });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear empleado', detail: err.message });
  }
};

// 4. PUT /empleados/:id
const update = async (req, res) => {
  const { nombre, apellido, puesto, telefono, fecha_contratacion, salario } = req.body;
  if (!nombre || !apellido || !puesto || !fecha_contratacion || salario == null)
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  try {
    const [result] = await pool.query(
      'UPDATE Empleados SET nombre=?, apellido=?, puesto=?, telefono=?, fecha_contratacion=?, salario=? WHERE id_empleado=?',
      [nombre, apellido, puesto, telefono || null, fecha_contratacion, salario, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.status(200).json({ message: 'Empleado actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar empleado', detail: err.message });
  }
};

// 5. PATCH /empleados/:id
const patch = async (req, res) => {
  const fields = req.body;
  const allowed = ['nombre', 'apellido', 'puesto', 'telefono', 'fecha_contratacion', 'salario'];
  const updates = Object.keys(fields).filter(k => allowed.includes(k));
  if (updates.length === 0) return res.status(400).json({ error: 'Sin campos válidos para actualizar' });
  try {
    const sql = `UPDATE Empleados SET ${updates.map(k => `${k}=?`).join(', ')} WHERE id_empleado=?`;
    const [result] = await pool.query(sql, [...updates.map(k => fields[k]), req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.status(200).json({ message: 'Empleado actualizado parcialmente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar empleado', detail: err.message });
  }
};

// 6. DELETE /empleados/:id
const remove = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Empleados WHERE id_empleado=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.status(200).json({ message: 'Empleado eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar empleado', detail: err.message });
  }
};

// 7. GET /empleados/puesto/:puesto — Custom: filtrar por puesto
const getByPuesto = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Empleados WHERE puesto = ?', [req.params.puesto]);
    if (rows.length === 0) return res.status(404).json({ error: 'No hay empleados con ese puesto' });
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar empleados', detail: err.message });
  }
};

// 8. GET /empleados/:id/ventas — Custom: ventas atendidas por el empleado
const getVentas = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Ventas WHERE id_empleado = ? ORDER BY fecha DESC', [req.params.id]
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ventas del empleado', detail: err.message });
  }
};

module.exports = { getAll, getById, create, update, patch, remove, getByPuesto, getVentas };
