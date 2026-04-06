const empleadosModel = require('../models/empleados.model');
const { requireFields, buildPatchQuery } = require('./validation.service');

const getAll = async () => {
  const [rows] = await empleadosModel.getAll();
  return rows;
};

const getById = async (id) => {
  const [rows] = await empleadosModel.getById(id);
  if (rows.length === 0) throw { status: 404, message: 'Empleado no encontrado' };
  return rows[0];
};

const create = async (body) => {
  requireFields(body, ['nombre', 'apellido', 'puesto', 'fecha_contratacion', 'salario']);
  const { nombre, apellido, puesto, telefono, fecha_contratacion, salario } = body;
  const [result] = await empleadosModel.create(nombre, apellido, puesto, telefono || null, fecha_contratacion, salario);
  return { id_empleado: result.insertId, nombre, apellido, puesto, telefono, fecha_contratacion, salario };
};

const update = async (id, body) => {
  requireFields(body, ['nombre', 'apellido', 'puesto', 'fecha_contratacion', 'salario']);
  const { nombre, apellido, puesto, telefono, fecha_contratacion, salario } = body;
  const [result] = await empleadosModel.update(id, nombre, apellido, puesto, telefono || null, fecha_contratacion, salario);
  if (result.affectedRows === 0) throw { status: 404, message: 'Empleado no encontrado' };
  return { message: 'Empleado actualizado correctamente' };
};

const patch = async (id, body) => {
  const patchData = buildPatchQuery('Empleados', body, ['nombre', 'apellido', 'puesto', 'telefono', 'fecha_contratacion', 'salario'], 'id_empleado', id);
  if (!patchData) throw { status: 400, message: 'Sin campos válidos para actualizar' };
  const [result] = await empleadosModel.patch(patchData.query, patchData.values);
  if (result.affectedRows === 0) throw { status: 404, message: 'Empleado no encontrado' };
  return { message: 'Empleado actualizado parcialmente' };
};

const remove = async (id) => {
  const [result] = await empleadosModel.remove(id);
  if (result.affectedRows === 0) throw { status: 404, message: 'Empleado no encontrado' };
  return { message: 'Empleado eliminado correctamente' };
};

const getByPuesto = async (puesto) => {
  const [rows] = await empleadosModel.getByPuesto(puesto);
  if (rows.length === 0) throw { status: 404, message: 'No hay empleados con ese puesto' };
  return rows;
};

const getVentas = async (id) => {
  const [rows] = await empleadosModel.getVentas(id);
  return rows;
};

module.exports = { getAll, getById, create, update, patch, remove, getByPuesto, getVentas };