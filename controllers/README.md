# Controllers

Los controladores manejan la lógica de las rutas HTTP. Cada controlador corresponde a una entidad de la base de datos y contiene funciones para:

- `getAll()`: Obtener todos los registros
- `getById()`: Obtener un registro por ID
- `create()`: Crear nuevo registro
- `update()`: Actualizar registro completo (PUT)
- `patch()`: Actualizar campos específicos (PATCH)
- `remove()`: Eliminar registro

## Estructura típica

```javascript
const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Tabla');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos', detail: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Tabla WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registro', detail: err.message });
  }
};

// ... otras funciones CRUD

module.exports = { getAll, getById, create, update, patch, remove };
```

## Validación

- Campos requeridos se validan en `create()` y `update()`
- IDs se convierten automáticamente a números
- Errores de BD se manejan con try/catch
- Respuestas siguen formato JSON consistente