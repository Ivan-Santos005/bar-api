const productosModel = require('../models/productos.model');
const { requireFields, buildPatchQuery } = require('./validation.service');

const getAll = async () => {
  const [rows] = await productosModel.getAll();
  return rows;
};

const getById = async (id) => {
  const [rows] = await productosModel.getById(id);
  if (rows.length === 0) throw { status: 404, message: 'Producto no encontrado' };
  return rows[0];
};

const create = async (body) => {
  requireFields(body, ['nombre_producto', 'tipo', 'precio', 'stock']);
  const { nombre_producto, tipo, precio, stock, descripcion } = body;
  const [result] = await productosModel.create(nombre_producto, tipo, precio, stock, descripcion || null);
  return { id_producto: result.insertId, nombre_producto, tipo, precio, stock, descripcion: descripcion || null };
};

const update = async (id, body) => {
  requireFields(body, ['nombre_producto', 'tipo', 'precio', 'stock']);
  const { nombre_producto, tipo, precio, stock, descripcion } = body;
  const [result] = await productosModel.update(id, nombre_producto, tipo, precio, stock, descripcion || null);
  if (result.affectedRows === 0) throw { status: 404, message: 'Producto no encontrado' };
  return { message: 'Producto actualizado correctamente' };
};

const patch = async (id, body) => {
  const patchData = buildPatchQuery('Productos', body, ['nombre_producto', 'tipo', 'precio', 'stock', 'descripcion'], 'id_producto', id);
  if (!patchData) throw { status: 400, message: 'Sin campos válidos para actualizar' };
  const [result] = await productosModel.patch(patchData.query, patchData.values);
  if (result.affectedRows === 0) throw { status: 404, message: 'Producto no encontrado' };
  return { message: 'Producto actualizado parcialmente' };
};

const updateStock = async (id, body) => {
  const { stock } = body;
  if (stock == null || isNaN(stock)) throw { status: 400, message: 'El campo stock es requerido y debe ser numérico' };
  const [result] = await productosModel.updateStock(id, stock);
  if (result.affectedRows === 0) throw { status: 404, message: 'Producto no encontrado' };
  return { message: `Stock actualizado a ${stock}` };
};

const remove = async (id) => {
  const [result] = await productosModel.remove(id);
  if (result.affectedRows === 0) throw { status: 404, message: 'Producto no encontrado' };
  return { message: 'Producto eliminado correctamente' };
};

const getByTipo = async (tipo) => {
  const [rows] = await productosModel.getByTipo(tipo);
  if (rows.length === 0) throw { status: 404, message: 'No hay productos de ese tipo' };
  return rows;
};

module.exports = { getAll, getById, create, update, patch, updateStock, remove, getByTipo };