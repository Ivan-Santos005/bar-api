require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

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

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
