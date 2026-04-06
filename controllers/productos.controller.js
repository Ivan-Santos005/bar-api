const productosService = require('../services/productos.service');

const getAll = async (req, res, next) => {
  try {
    const productos = await productosService.getAll();
    res.status(200).json(productos);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const producto = await productosService.getById(req.params.id);
    res.status(200).json(producto);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const producto = await productosService.create(req.body);
    res.status(201).json(producto);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await productosService.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const patch = async (req, res, next) => {
  try {
    const result = await productosService.patch(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await productosService.remove(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getByTipo = async (req, res, next) => {
  try {
    const productos = await productosService.getByTipo(req.params.tipo);
    res.status(200).json(productos);
  } catch (err) {
    next(err);
  }
};

const updateStock = async (req, res, next) => {
  try {
    const result = await productosService.updateStock(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, patch, remove, getByTipo, updateStock };
