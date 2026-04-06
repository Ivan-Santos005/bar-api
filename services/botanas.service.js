const botanasModel = require('../models/botanas.model');
const { requireFields, buildPatchQuery } = require('./validation.service');

const getAll = async () => {
  const [rows] = await botanasModel.getAll();
  return rows;
};

const getById = async (id) => {
  const [rows] = await botanasModel.getById(id);
  if (rows.length === 0) throw { status: 404, message: 'Botana no encontrada' };
  return rows[0];
};

const create = async (body) => {
  requireFields(body, ['id_botana', 'nombre', 'precio']);
  const { id_botana, nombre, ingredientes_principales, cantidad, unidad, precio } = body;
  await botanasModel.create(id_botana, nombre, ingredientes_principales || null, cantidad || null, unidad || null, precio);
  return { id_botana, nombre, ingredientes_principales, cantidad, unidad, precio };
};

const update = async (id, body) => {
  requireFields(body, ['nombre', 'precio']);
  const { nombre, ingredientes_principales, cantidad, unidad, precio } = body;
  const [result] = await botanasModel.update(id, nombre, ingredientes_principales || null, cantidad || null, unidad || null, precio);
  if (result.affectedRows === 0) throw { status: 404, message: 'Botana no encontrada' };
  return { message: 'Botana actualizada correctamente' };
};

const patch = async (id, body) => {
  const patchData = buildPatchQuery('Botanas', body, ['nombre', 'ingredientes_principales', 'cantidad', 'unidad', 'precio'], 'id_botana', id);
  if (!patchData) throw { status: 400, message: 'Sin campos válidos para actualizar' };
  const [result] = await botanasModel.patch(patchData.query, patchData.values);
  if (result.affectedRows === 0) throw { status: 404, message: 'Botana no encontrada' };
  return { message: 'Botana actualizada parcialmente' };
};

const remove = async (id) => {
  const [result] = await botanasModel.remove(id);
  if (result.affectedRows === 0) throw { status: 404, message: 'Botana no encontrada' };
  return { message: 'Botana eliminada correctamente' };
};

const search = async (nombre) => {
  if (!nombre) throw { status: 400, message: 'Se requiere el parámetro nombre' };
  const [rows] = await botanasModel.search(nombre);
  return rows;
};

const getByPrecioMax = async (max) => {
  if (max == null || isNaN(max)) throw { status: 400, message: 'Se requiere el parámetro max (numérico)' };
  const [rows] = await botanasModel.getByPrecioMax(max);
  return rows;
};

module.exports = { getAll, getById, create, update, patch, remove, search, getByPrecioMax };