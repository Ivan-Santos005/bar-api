const clientesService = require('../services/clientes.service');

const getAll = async (req, res, next) => {
  try {
    const clientes = await clientesService.getAll();
    res.status(200).json(clientes);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const cliente = await clientesService.getById(req.params.id);
    res.status(200).json(cliente);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const cliente = await clientesService.create(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await clientesService.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const patch = async (req, res, next) => {
  try {
    const result = await clientesService.patch(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await clientesService.remove(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getVentas = async (req, res, next) => {
  try {
    const ventas = await clientesService.getVentas(req.params.id);
    res.status(200).json(ventas);
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {
  try {
    const clientes = await clientesService.search(req.query.nombre);
    res.status(200).json(clientes);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, patch, remove, getVentas, search };
