# Routes

Las rutas definen los endpoints HTTP y conectan las URLs con los controladores correspondientes.

## Estructura

```javascript
const router = require('express').Router();
const ctrl = require('../controllers/entidad.controller');

// Endpoints estándar
router.get('/',             ctrl.getAll);        // GET listado
router.get('/:id',          ctrl.getById);       // GET por ID
router.post('/',            ctrl.create);        // POST crear
router.put('/:id',           ctrl.update);        // PUT reemplazar
router.patch('/:id',         ctrl.patch);         // PATCH parcial
router.delete('/:id',        ctrl.remove);        // DELETE

// Endpoints custom (si aplican)
router.get('/custom/:param', ctrl.customFunction);

module.exports = router;
```

## Convenciones

- Rutas siguen patrón RESTful
- Parámetros de ruta usan `:param`
- Query params para filtros/búsqueda
- Respuestas JSON consistentes
- Códigos HTTP apropiados (200, 201, 400, 404, 500)