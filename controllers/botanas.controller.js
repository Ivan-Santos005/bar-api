const botanasService = require('../services/botanas.service');

const getAll = async (req, res, next) => {
  try {
    const botanas = await botanasService.getAll();
    res.status(200).json(botanas);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const botana = await botanasService.getById(req.params.id);
    res.status(200).json(botana);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const botana = await botanasService.create(req.body);
    res.status(201).json(botana);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await botanasService.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const patch = async (req, res, next) => {
  try {
    const result = await botanasService.patch(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await botanasService.remove(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {
  try {
    const botanas = await botanasService.search(req.query.nombre);
    res.status(200).json(botanas);
  } catch (err) {
    next(err);
  }
};

const getByPrecioMax = async (req, res, next) => {
  try {
    const botanas = await botanasService.getByPrecioMax(req.query.max);
    res.status(200).json(botanas);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, patch, remove, search, getByPrecioMax };
