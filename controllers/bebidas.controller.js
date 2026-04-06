const bebidasService = require('../services/bebidas.service');

const getAll = async (req, res, next) => {
  try {
    const bebidas = await bebidasService.getAll();
    res.status(200).json(bebidas);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const bebida = await bebidasService.getById(req.params.id);
    res.status(200).json(bebida);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const bebida = await bebidasService.create(req.body);
    res.status(201).json(bebida);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await bebidasService.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const patch = async (req, res, next) => {
  try {
    const result = await bebidasService.patch(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await bebidasService.remove(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getByTipo = async (req, res, next) => {
  try {
    const bebidas = await bebidasService.getByTipo(req.params.tipo);
    res.status(200).json(bebidas);
  } catch (err) {
    next(err);
  }
};

const getIngredientes = async (req, res, next) => {
  try {
    const ingredientes = await bebidasService.getIngredientes(req.params.id);
    res.status(200).json(ingredientes);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, patch, remove, getByTipo, getIngredientes };
