# Views

Este directorio contiene plantillas Handlebars (HBS) para generar vistas HTML.

## Configuración

En `app.js`:
```javascript
const hbs = require('hbs');
app.set('view engine', 'hbs');
app.set('views', './views');
```

## docs.hbs

Plantilla principal para documentación de la API.

- Usa datos dinámicos pasados desde el controlador
- Incluye estilos CSS embebidos
- Responsive design
- Navegación por secciones

## Uso

```javascript
app.get('/docs', (req, res) => {
  res.render('docs', {
    version: '1.0.0',
    port: 3000,
    endpoints: [/* datos */]
  });
});
```

## Beneficios

- Documentación viva y actualizable
- Fácil mantenimiento
- Personalizable
- No requiere build steps adicionales