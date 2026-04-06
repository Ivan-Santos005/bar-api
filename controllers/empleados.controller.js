const empleadosService = require('../services/empleados.service');

const getAll = async (req, res, next) => {
  try {
    const empleados = await empleadosService.getAll();
    res.status(200).json(empleados);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const empleado = await empleadosService.getById(req.params.id);
    res.status(200).json(empleado);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const empleado = await empleadosService.create(req.body);
    res.status(201).json(empleado);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await empleadosService.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const patch = async (req, res, next) => {
  try {
    const result = await empleadosService.patch(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await empleadosService.remove(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getByPuesto = async (req, res, next) => {
  try {
    const empleados = await empleadosService.getByPuesto(req.params.puesto);
    res.status(200).json(empleados);
  } catch (err) {
    next(err);
  }
};

const getVentas = async (req, res, next) => {
  try {
    const ventas = await empleadosService.getVentas(req.params.id);
    res.status(200).json(ventas);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, patch, remove, getByPuesto, getVentas };
