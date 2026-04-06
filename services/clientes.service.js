const clientesModel = require('../models/clientes.model');
const { requireFields, buildPatchQuery } = require('./validation.service');

const getAll = async () => {
  const [rows] = await clientesModel.getAll();
  return rows;
};

const getById = async (id) => {
  const [rows] = await clientesModel.getById(id);
  if (rows.length === 0) throw { status: 404, message: 'Cliente no encontrado' };
  return rows[0];
};

const create = async (body) => {
  requireFields(body, ['nombre', 'apellido', 'fecha_registro']);
  const { nombre, apellido, telefono, correo_electronico, fecha_registro } = body;
  const [result] = await clientesModel.create(nombre, apellido, telefono || null, correo_electronico || null, fecha_registro);
  return { id_cliente: result.insertId, nombre, apellido, telefono, correo_electronico, fecha_registro };
};

const update = async (id, body) => {
  requireFields(body, ['nombre', 'apellido', 'fecha_registro']);
  const { nombre, apellido, telefono, correo_electronico, fecha_registro } = body;
  const [result] = await clientesModel.update(id, nombre, apellido, telefono || null, correo_electronico || null, fecha_registro);
  if (result.affectedRows === 0) throw { status: 404, message: 'Cliente no encontrado' };
  return { message: 'Cliente actualizado correctamente' };
};

const patch = async (id, body) => {
  const patchData = buildPatchQuery('Clientes', body, ['nombre', 'apellido', 'telefono', 'correo_electronico', 'fecha_registro'], 'id_cliente', id);
  if (!patchData) throw { status: 400, message: 'Sin campos válidos para actualizar' };
  const [result] = await clientesModel.patch(patchData.query, patchData.values);
  if (result.affectedRows === 0) throw { status: 404, message: 'Cliente no encontrado' };
  return { message: 'Cliente actualizado parcialmente' };
};

const remove = async (id) => {
  const [result] = await clientesModel.remove(id);
  if (result.affectedRows === 0) throw { status: 404, message: 'Cliente no encontrado' };
  return { message: 'Cliente eliminado correctamente' };
};

const getVentas = async (id) => {
  const [rows] = await clientesModel.getVentas(id);
  return rows;
};

const search = async (nombre) => {
  if (!nombre) throw { status: 400, message: 'Se requiere el parámetro nombre' };
  const [rows] = await clientesModel.search(nombre);
  return rows;
};

module.exports = { getAll, getById, create, update, patch, remove, getVentas, search };