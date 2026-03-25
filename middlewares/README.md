# Middlewares

Este directorio contiene middlewares personalizados para:

- Validación de datos
- Autenticación y autorización
- Manejo de errores
- Logging
- Rate limiting
- CORS
- Compresión

## Estructura típica

```javascript
// middlewares/validation.js
const validateProducto = (req, res, next) => {
  const { nombre_producto, precio, stock, tipo } = req.body;

  if (!nombre_producto || precio == null || stock == null || !tipo) {
    return res.status(400).json({
      error: 'Faltan campos requeridos: nombre_producto, precio, stock, tipo'
    });
  }

  if (precio < 0 || stock < 0) {
    return res.status(400).json({
      error: 'Precio y stock deben ser valores positivos'
    });
  }

  if (!['bebida', 'botana'].includes(tipo)) {
    return res.status(400).json({
      error: 'Tipo debe ser "bebida" o "botana"'
    });
  }

  next();
};

// middlewares/auth.js
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  // Verificar token...
  next();
};

// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    detail: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = { validateProducto, authenticate, errorHandler };
```

## Uso en rutas

```javascript
const { validateProducto, authenticate } = require('../middlewares');

router.post('/', authenticate, validateProducto, ctrl.create);
```

## Middlewares incluidos por defecto

- `express.json()`: Parseo de JSON
- Manejo de rutas 404
- Error handler básico