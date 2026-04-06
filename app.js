require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de Handlebars
app.set('view engine', 'hbs');
app.set('views', './views');

// Rutas
app.use('/api/productos',  require('./routes/productos.routes'));
app.use('/api/bebidas',    require('./routes/bebidas.routes'));
app.use('/api/botanas',    require('./routes/botanas.routes'));
app.use('/api/clientes',   require('./routes/clientes.routes'));
app.use('/api/empleados',  require('./routes/empleados.routes'));
app.use('/api/ventas',     require('./routes/ventas.routes'));

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'API REST - Bar',
    version: '1.0.0',
    endpoints: [
      '/api/productos',
      '/api/bebidas',
      '/api/botanas',
      '/api/clientes',
      '/api/empleados',
      '/api/ventas',
    ]
  });
});

// Ruta de documentación
app.get('/docs', (req, res) => {
  const docsData = {
    version: '1.0.0',
    port: process.env.PORT || 3000,
    date: new Date().toLocaleDateString('es-ES'),
    endpoints: [
      {
        title: '📦 Productos',
        routes: [
          { method: 'GET', endpoint: '/productos', description: 'Lista todos los productos' },
          { method: 'GET', endpoint: '/productos/:id', description: 'Obtiene producto por ID' },
          { method: 'GET', endpoint: '/productos/tipo/:tipo', description: 'Filtra por tipo (bebida/botana)' },
          { method: 'POST', endpoint: '/productos', description: 'Crea nuevo producto' },
          { method: 'PUT', endpoint: '/productos/:id', description: 'Actualiza producto completo' },
          { method: 'PATCH', endpoint: '/productos/:id', description: 'Actualiza campos específicos' },
          { method: 'PATCH', endpoint: '/productos/:id/stock', description: 'Actualiza solo stock' },
          { method: 'DELETE', endpoint: '/productos/:id', description: 'Elimina producto' }
        ],
        examples: [
          {
            title: 'Crear producto',
            request: `POST /api/productos
Content-Type: application/json

{
  "nombre_producto": "Cerveza Corona",
  "precio": 25.50,
  "stock": 100,
  "tipo": "bebida"
}`,
            response: `201 Created
{
  "id_producto": 1,
  "nombre_producto": "Cerveza Corona",
  "precio": 25.50,
  "stock": 100,
  "tipo": "bebida"
}`
          }
        ]
      },
      {
        title: '🍺 Bebidas',
        routes: [
          { method: 'GET', endpoint: '/bebidas', description: 'Lista todas las bebidas' },
          { method: 'GET', endpoint: '/bebidas/:id', description: 'Obtiene bebida por ID' },
          { method: 'GET', endpoint: '/bebidas/tipo/:tipo', description: 'Filtra bebidas por tipo' },
          { method: 'POST', endpoint: '/bebidas', description: 'Crea nueva bebida' },
          { method: 'PUT', endpoint: '/bebidas/:id', description: 'Actualiza bebida completa' },
          { method: 'PATCH', endpoint: '/bebidas/:id', description: 'Actualiza campos específicos' },
          { method: 'DELETE', endpoint: '/bebidas/:id', description: 'Elimina bebida' }
        ]
      },
      {
        title: '🍿 Botanas',
        routes: [
          { method: 'GET', endpoint: '/botanas', description: 'Lista todas las botanas' },
          { method: 'GET', endpoint: '/botanas/:id', description: 'Obtiene botana por ID' },
          { method: 'POST', endpoint: '/botanas', description: 'Crea nueva botana' },
          { method: 'PUT', endpoint: '/botanas/:id', description: 'Actualiza botana completa' },
          { method: 'PATCH', endpoint: '/botanas/:id', description: 'Actualiza campos específicos' },
          { method: 'DELETE', endpoint: '/botanas/:id', description: 'Elimina botana' }
        ]
      },
      {
        title: '👥 Clientes',
        routes: [
          { method: 'GET', endpoint: '/clientes', description: 'Lista todos los clientes' },
          { method: 'GET', endpoint: '/clientes/:id', description: 'Obtiene cliente por ID' },
          { method: 'POST', endpoint: '/clientes', description: 'Crea nuevo cliente' },
          { method: 'PUT', endpoint: '/clientes/:id', description: 'Actualiza cliente completo' },
          { method: 'PATCH', endpoint: '/clientes/:id', description: 'Actualiza campos específicos' },
          { method: 'DELETE', endpoint: '/clientes/:id', description: 'Elimina cliente' }
        ]
      },
      {
        title: '👷 Empleados',
        routes: [
          { method: 'GET', endpoint: '/empleados', description: 'Lista todos los empleados' },
          { method: 'GET', endpoint: '/empleados/:id', description: 'Obtiene empleado por ID' },
          { method: 'POST', endpoint: '/empleados', description: 'Crea nuevo empleado' },
          { method: 'PUT', endpoint: '/empleados/:id', description: 'Actualiza empleado completo' },
          { method: 'PATCH', endpoint: '/empleados/:id', description: 'Actualiza campos específicos' },
          { method: 'DELETE', endpoint: '/empleados/:id', description: 'Elimina empleado' }
        ]
      },
      {
        title: '💰 Ventas',
        routes: [
          { method: 'GET', endpoint: '/ventas', description: 'Lista todas las ventas' },
          { method: 'GET', endpoint: '/ventas/:id', description: 'Obtiene venta por ID' },
          { method: 'GET', endpoint: '/ventas/:id/detalle', description: 'Obtiene detalle de venta' },
          { method: 'GET', endpoint: '/ventas/reporte/total', description: 'Reporte de ventas por día' },
          { method: 'POST', endpoint: '/ventas', description: 'Crea nueva venta' },
          { method: 'PUT', endpoint: '/ventas/:id', description: 'Actualiza venta completa' },
          { method: 'PATCH', endpoint: '/ventas/:id', description: 'Actualiza campos específicos' },
          { method: 'DELETE', endpoint: '/ventas/:id', description: 'Elimina venta' }
        ],
        examples: [
          {
            title: 'Crear venta',
            request: `POST /api/ventas
Content-Type: application/json

{
  "fecha": "2024-03-24T10:00:00Z",
  "total": 150.75,
  "id_cliente": 1,
  "id_empleado": 2
}`,
            response: `201 Created
{
  "id_venta": 1,
  "fecha": "2024-03-24T10:00:00Z",
  "total": 150.75,
  "id_cliente": 1,
  "id_empleado": 2
}`
          }
        ]
      }
    ]
  };
  res.render('docs', docsData);
});

// Manejo de rutas no encontradas
app.use(notFound);
app.use(errorHandler);

module.exports = app;

