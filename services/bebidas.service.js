const bebidasModel = require('../models/bebidas.model');
const { requireFields, buildPatchQuery } = require('./validation.service');

const getAll = async () => {
  const [rows] = await bebidasModel.getAll();
  return rows;
};

const getById = async (id) => {
  const [rows] = await bebidasModel.getById(id);
  if (rows.length === 0) throw { status: 404, message: 'Bebida no encontrada' };
  return rows[0];
};

const create = async (body) => {
  requireFields(body, ['id_bebida', 'nombre', 'tipo', 'cantidad', 'unidad', 'precio']);
  const { id_bebida, nombre, tipo, cantidad, unidad, precio } = body;
  await bebidasModel.create(id_bebida, nombre, tipo, cantidad, unidad, precio);
  return { id_bebida, nombre, tipo, cantidad, unidad, precio };
};

const update = async (id, body) => {
  requireFields(body, ['nombre', 'tipo', 'cantidad', 'unidad', 'precio']);
  const { nombre, tipo, cantidad, unidad, precio } = body;
  const [result] = await bebidasModel.update(id, nombre, tipo, cantidad, unidad, precio);
  if (result.affectedRows === 0) throw { status: 404, message: 'Bebida no encontrada' };
  return { message: 'Bebida actualizada correctamente' };
};

const patch = async (id, body) => {
  const patchData = buildPatchQuery('Bebidas', body, ['nombre', 'tipo', 'cantidad', 'unidad', 'precio'], 'id_bebida', id);
  if (!patchData) throw { status: 400, message: 'Sin campos válidos para actualizar' };
  const [result] = await bebidasModel.patch(patchData.query, patchData.values);
  if (result.affectedRows === 0) throw { status: 404, message: 'Bebida no encontrada' };
  return { message: 'Bebida actualizada parcialmente' };
};

const remove = async (id) => {
  const [result] = await bebidasModel.remove(id);
  if (result.affectedRows === 0) throw { status: 404, message: 'Bebida no encontrada' };
  return { message: 'Bebida eliminada correctamente' };
};

const getByTipo = async (tipo) => {
  const [rows] = await bebidasModel.getByTipo(tipo);
  if (rows.length === 0) throw { status: 404, message: 'No hay bebidas de ese tipo' };
  return rows;
};

const getIngredientes = async (id) => {
  const [rows] = await bebidasModel.getIngredientes(id);
  if (rows.length === 0) throw { status: 404, message: 'No se encontraron ingredientes para esta bebida' };
  return rows;
};

module.exports = { getAll, getById, create, update, patch, remove, getByTipo, getIngredientes };