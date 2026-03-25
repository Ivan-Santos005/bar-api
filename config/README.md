# Configuración

Este directorio contiene la configuración de la aplicación.

## db.js

Configuración de conexión a MySQL usando mysql2/promise.

```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456789',
  database: process.env.DB_NAME || 'Bar',
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
});

module.exports = pool;
```

### Variables de entorno (.env)

- `DB_HOST`: Host de MySQL (default: localhost)
- `DB_PORT`: Puerto de MySQL (default: 3306)
- `DB_USER`: Usuario de MySQL (default: root)
- `DB_PASSWORD`: Contraseña de MySQL
- `DB_NAME`: Nombre de la base de datos (default: Bar)
- `DB_CONNECTION_LIMIT`: Límite de conexiones (default: 10)
- `PORT`: Puerto del servidor (default: 3000)

### Pool de conexiones

- `waitForConnections: true`: Espera conexiones disponibles
- `connectionLimit: 10`: Máximo 10 conexiones simultáneas
- Manejo automático de reconexión