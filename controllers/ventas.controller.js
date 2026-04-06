const ventasService = require('../services/ventas.service');

const getAll = async (req, res, next) => {
  try {
    const ventas = await ventasService.getAll();
    res.status(200).json(ventas);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const venta = await ventasService.getById(req.params.id);
    res.status(200).json(venta);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const venta = await ventasService.create(req.body);
    res.status(201).json(venta);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await ventasService.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const patch = async (req, res, next) => {
  try {
    const result = await ventasService.patch(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await ventasService.remove(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getDetalle = async (req, res, next) => {
  try {
    const detalle = await ventasService.getDetalle(req.params.id);
    res.status(200).json(detalle);
  } catch (err) {
    next(err);
  }
};

const getReporte = async (req, res, next) => {
  try {
    const reporte = await ventasService.getReporte();
    res.status(200).json(reporte);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, patch, remove, getDetalle, getReporte };
