const ventasModel = require('../models/ventas.model');
const { requireFields, buildPatchQuery } = require('./validation.service');

const getAll = async () => {
  const [rows] = await ventasModel.getAll();
  return rows;
};

const getById = async (id) => {
  const [rows] = await ventasModel.getById(id);
  if (rows.length === 0) throw { status: 404, message: 'Venta no encontrada' };
  return rows[0];
};

const create = async (body) => {
  requireFields(body, ['fecha', 'total', 'id_cliente', 'id_empleado']);
  const { fecha, total, id_cliente, id_empleado } = body;
  const [result] = await ventasModel.create(fecha, total, id_cliente, id_empleado);
  return { id_venta: result.insertId, fecha, total, id_cliente, id_empleado };
};

const update = async (id, body) => {
  requireFields(body, ['fecha', 'total', 'id_cliente', 'id_empleado']);
  const { fecha, total, id_cliente, id_empleado } = body;
  const [result] = await ventasModel.update(id, fecha, total, id_cliente, id_empleado);
  if (result.affectedRows === 0) throw { status: 404, message: 'Venta no encontrada' };
  return { message: 'Venta actualizada correctamente' };
};

const patch = async (id, body) => {
  const patchData = buildPatchQuery('Ventas', body, ['fecha', 'total', 'id_cliente', 'id_empleado'], 'id_venta', id);
  if (!patchData) throw { status: 400, message: 'Sin campos válidos para actualizar' };
  const [result] = await ventasModel.patch(patchData.query, patchData.values);
  if (result.affectedRows === 0) throw { status: 404, message: 'Venta no encontrada' };
  return { message: 'Venta actualizada parcialmente' };
};

const remove = async (id) => {
  const [result] = await ventasModel.remove(id);
  if (result.affectedRows === 0) throw { status: 404, message: 'Venta no encontrada' };
  return { message: 'Venta eliminada correctamente' };
};

const getDetalle = async (id) => {
  const [rows] = await ventasModel.getDetalle(id);
  if (rows.length === 0) throw { status: 404, message: 'No hay detalle para esta venta' };
  return rows;
};

const getReporte = async () => {
  const [rows] = await ventasModel.getReporte();
  return rows;
};

module.exports = { getAll, getById, create, update, patch, remove, getDetalle, getReporte };