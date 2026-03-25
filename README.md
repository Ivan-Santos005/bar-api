# Bar API

API REST para la gestión de un bar, desarrollada con Node.js, Express y MySQL. Permite manejar productos, bebidas, botanas, clientes, empleados y ventas.

## 🚀 Características

- Arquitectura modular: controllers, routes, services, models, middlewares
- Conexión a base de datos MySQL con pool de conexiones
- Variables de entorno para configuración
- Endpoints RESTful completos (CRUD + custom)
- Manejo de errores y respuestas JSON
- Documentación integrada

## 📋 Requisitos

- Node.js v16+
- MySQL 8.0+
- Base de datos "Bar" configurada

## 🛠️ Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd bar-api
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Configura la base de datos MySQL:
   - Crea la base de datos "Bar"
   - Ejecuta los scripts SQL para crear tablas (ver sección Base de Datos)

4. Configura variables de entorno (ver sección Configuración)

5. Inicia el servidor:
   ```bash
   npm start
   # o para desarrollo:
   npm run dev
   ```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=Bar
DB_CONNECTION_LIMIT=10

# Servidor
PORT=3000
```

## 📁 Estructura del Proyecto

```
bar-api/
├── .env                    # Variables de entorno
├── config/
│   └── db.js              # Configuración de conexión MySQL
├── models/                # Modelos de datos (ORM/ODM)
├── services/              # Lógica de negocio
├── controllers/           # Controladores (manejo requests/responses)
│   ├── productos.controller.js
│   ├── bebidas.controller.js
│   ├── botanas.controller.js
│   ├── clientes.controller.js
│   ├── empleados.controller.js
│   └── ventas.controller.js
├── routes/                # Definición de endpoints
│   ├── productos.routes.js
│   ├── bebidas.routes.js
│   ├── botanas.routes.js
│   ├── clientes.routes.js
│   ├── empleados.routes.js
│   └── ventas.routes.js
├── middlewares/           # Validaciones, auth, manejo de errores
├── views/                 # Plantillas HBS para documentación
├── app.js                 # Configuración de Express
├── server.js              # Punto de entrada
└── package.json
```

## 🗄️ Base de Datos

### Tablas

- **Productos**: id_producto, nombre_producto, precio, stock, tipo
- **Bebidas**: id_bebida, nombre_bebida, precio, stock, tipo
- **Botanas**: id_botana, nombre_botana, precio, stock
- **Clientes**: id_cliente, nombre, apellido, email, telefono
- **Empleados**: id_empleado, nombre, apellido, puesto, salario
- **Ventas**: id_venta, fecha, total, id_cliente, id_empleado
- **Detalle_Ventas**: id_detalle, id_venta, id_producto, cantidad, precio_unitario

### Scripts SQL

Ejecuta estos scripts en MySQL para crear las tablas:

```sql
-- Productos
CREATE TABLE Productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre_producto VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  tipo ENUM('bebida', 'botana') NOT NULL
);

-- Bebidas (hereda de productos)
CREATE TABLE Bebidas (
  id_bebida INT AUTO_INCREMENT PRIMARY KEY,
  nombre_bebida VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  tipo VARCHAR(50)
);

-- Botanas (hereda de productos)
CREATE TABLE Botanas (
  id_botana INT AUTO_INCREMENT PRIMARY KEY,
  nombre_botana VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0
);

-- Clientes
CREATE TABLE Clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  telefono VARCHAR(20)
);

-- Empleados
CREATE TABLE Empleados (
  id_empleado INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  puesto VARCHAR(50) NOT NULL,
  salario DECIMAL(10,2) NOT NULL
);

-- Ventas
CREATE TABLE Ventas (
  id_venta INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  id_cliente INT,
  id_empleado INT,
  FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
  FOREIGN KEY (id_empleado) REFERENCES Empleados(id_empleado)
);

-- Detalle de Ventas
CREATE TABLE Detalle_Ventas (
  id_detalle INT AUTO_INCREMENT PRIMARY KEY,
  id_venta INT,
  id_producto INT,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_venta) REFERENCES Ventas(id_venta),
  FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);
```

## 📚 Documentación

- **README completo**: Este archivo
- **Documentación interactiva**: Visita `http://localhost:3000/docs` cuando el servidor esté corriendo
- **Documentación por módulo**: Cada directorio tiene su propio `README.md`

### Ver documentación

```bash
npm start
# Luego visita: http://localhost:3000/docs
```

### Base URL
```
http://localhost:3000/api
```

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/productos` | Lista todos los productos |
| GET | `/productos/:id` | Obtiene producto por ID |
| GET | `/productos/tipo/:tipo` | Filtra productos por tipo (bebida/botana) |
| GET | `/productos/buscar?tipo=bebida` | Alias para búsqueda por tipo |
| POST | `/productos` | Crea nuevo producto |
| PUT | `/productos/:id` | Actualiza producto completo |
| PATCH | `/productos/:id` | Actualiza campos específicos |
| PATCH | `/productos/:id/stock` | Actualiza solo stock |
| DELETE | `/productos/:id` | Elimina producto |

**Ejemplo POST /productos:**
```json
{
  "nombre_producto": "Cerveza Corona",
  "precio": 25.50,
  "stock": 100,
  "tipo": "bebida"
}
```

### Bebidas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/bebidas` | Lista todas las bebidas |
| GET | `/bebidas/:id` | Obtiene bebida por ID |
| GET | `/bebidas/tipo/:tipo` | Filtra bebidas por tipo |
| POST | `/bebidas` | Crea nueva bebida |
| PUT | `/bebidas/:id` | Actualiza bebida completa |
| PATCH | `/bebidas/:id` | Actualiza campos específicos |
| DELETE | `/bebidas/:id` | Elimina bebida |

### Botanas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/botanas` | Lista todas las botanas |
| GET | `/botanas/:id` | Obtiene botana por ID |
| POST | `/botanas` | Crea nueva botana |
| PUT | `/botanas/:id` | Actualiza botana completa |
| PATCH | `/botanas/:id` | Actualiza campos específicos |
| DELETE | `/botanas/:id` | Elimina botana |

### Clientes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/clientes` | Lista todos los clientes |
| GET | `/clientes/:id` | Obtiene cliente por ID |
| POST | `/clientes` | Crea nuevo cliente |
| PUT | `/clientes/:id` | Actualiza cliente completo |
| PATCH | `/clientes/:id` | Actualiza campos específicos |
| DELETE | `/clientes/:id` | Elimina cliente |

### Empleados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/empleados` | Lista todos los empleados |
| GET | `/empleados/:id` | Obtiene empleado por ID |
| POST | `/empleados` | Crea nuevo empleado |
| PUT | `/empleados/:id` | Actualiza empleado completo |
| PATCH | `/empleados/:id` | Actualiza campos específicos |
| DELETE | `/empleados/:id` | Elimina empleado |

### Ventas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/ventas` | Lista todas las ventas |
| GET | `/ventas/:id` | Obtiene venta por ID |
| GET | `/ventas/:id/detalle` | Obtiene detalle de venta |
| GET | `/ventas/reporte/total` | Reporte de ventas por día |
| POST | `/ventas` | Crea nueva venta |
| PUT | `/ventas/:id` | Actualiza venta completa |
| PATCH | `/ventas/:id` | Actualiza campos específicos |
| DELETE | `/ventas/:id` | Elimina venta |

**Ejemplo POST /ventas:**
```json
{
  "fecha": "2024-03-24T10:00:00Z",
  "total": 150.75,
  "id_cliente": 1,
  "id_empleado": 2
}
```

## 🧪 Testing

### Inicio del servidor
```bash
npm start
```

### Desarrollo con hot reload
```bash
npm run dev
```

### Verificar endpoints
```bash
curl http://localhost:3000/
```

Respuesta esperada:
```json
{
  "mensaje": "API REST - Bar",
  "version": "1.0.0",
  "endpoints": [
    "/api/productos",
    "/api/bebidas",
    "/api/botanas",
    "/api/clientes",
    "/api/empleados",
    "/api/ventas"
  ]
}
```

## 📖 Uso con Postman/Insomnia

1. Importa la colección de endpoints
2. Configura la base URL: `http://localhost:3000/api`
3. Prueba los endpoints CRUD

## 🔧 Scripts Disponibles

- `npm start`: Inicia el servidor en producción
- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📞 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.