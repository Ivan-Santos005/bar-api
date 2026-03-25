# Models

Este directorio contiene los modelos de datos (ORM/ODM).

Los modelos representan las entidades de la base de datos y pueden incluir:

- Definición de esquemas
- Validaciones de datos
- Relaciones entre entidades
- Métodos de instancia/clase
- Hooks (antes/después de guardar, etc.)

## Estructura recomendada

```javascript
// models/Producto.js
const pool = require('../config/db');

class Producto {
  constructor(data) {
    this.id = data.id_producto;
    this.nombre = data.nombre_producto;
    this.precio = data.precio;
    this.stock = data.stock;
    this.tipo = data.tipo;
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM Productos');
    return rows.map(row => new Producto(row));
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM Productos WHERE id_producto = ?', [id]);
    return rows.length ? new Producto(rows[0]) : null;
  }

  async save() {
    // Lógica para guardar/actualizar
  }

  async delete() {
    // Lógica para eliminar
  }
}

module.exports = Producto;
```

## Beneficios

- Abstracción de la base de datos
- Validaciones centralizadas
- Métodos reutilizables
- Type safety mejorado
- Fácil migración a ORM completo (Sequelize, TypeORM, etc.)