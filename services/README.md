# Services

Este directorio contiene la lógica de negocio de la aplicación.

Los servicios separan la lógica compleja de los controladores, permitiendo:

- Validaciones de negocio
- Cálculos complejos
- Integración con APIs externas
- Lógica reutilizable
- Manejo de transacciones

## Estructura recomendada

```javascript
// services/ventas.service.js
const pool = require('../config/db');

class VentasService {
  async calcularTotal(items) {
    // Lógica para calcular total con descuentos, impuestos, etc.
  }

  async validarStock(idProducto, cantidad) {
    // Verificar stock disponible
  }

  async procesarVenta(ventaData) {
    // Lógica completa de procesamiento de venta
  }
}

module.exports = new VentasService();
```

## Beneficios

- Controladores más limpios y enfocados en HTTP
- Lógica reutilizable entre diferentes endpoints
- Fácil testing de lógica de negocio
- Separación de responsabilidades