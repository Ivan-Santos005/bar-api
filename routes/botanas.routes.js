const router = require('express').Router();
const ctrl = require('../controllers/botanas.controller');

router.get('/buscar',    ctrl.search);         // Custom 1
router.get('/precio',    ctrl.getByPrecioMax); // Custom 2
router.get('/',          ctrl.getAll);          // GET listado
router.get('/:id',       ctrl.getById);         // GET por ID
router.post('/',         ctrl.create);          // POST crear
router.put('/:id',       ctrl.update);          // PUT reemplazar
router.patch('/:id',     ctrl.patch);           // PATCH parcial
router.delete('/:id',    ctrl.remove);          // DELETE

module.exports = router;
