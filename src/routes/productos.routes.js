const router = require('express').Router();
const ctrl = require('../controllers/productos.controller');

router.get('/tipo/:tipo',   ctrl.getByTipo);    // Custom 1
router.get('/buscar',       ctrl.getByTipo);    // alias búsqueda
router.get('/',             ctrl.getAll);        // GET listado
router.get('/:id',          ctrl.getById);       // GET por ID
router.post('/',            ctrl.create);        // POST crear
router.put('/:id',          ctrl.update);        // PUT reemplazar
router.patch('/:id/stock',  ctrl.updateStock);  // Custom 2
router.patch('/:id',        ctrl.patch);         // PATCH parcial
router.delete('/:id',       ctrl.remove);        // DELETE

module.exports = router;
