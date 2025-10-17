# Orders API Backend

Backend API REST para gestión de órdenes construido con Node.js, TypeScript y Express.js.

## Características

- **API REST completa** con operaciones CRUD
- **TypeScript** para type safety
- **Base de datos en memoria** (fácil de extender a PostgreSQL/MongoDB)
- **Validación de datos** con express-validator
- **Paginación** en listado de órdenes
- **Seguridad** con Helmet y CORS
- **Código limpio** con arquitectura por capas

## Stack Tecnológico

- **Node.js** v18+
- **TypeScript** v5.3+
- **Express.js** v4.18+
- **express-validator** para validación
- **UUID** para generación de IDs
- **Helmet** para seguridad
- **CORS** para manejo de cross-origin

## Estructura del Proyecto

```
Backend/
├── src/
│   ├── controllers/       # Lógica de negocio de los endpoints
│   ├── database/          # Base de datos en memoria
│   ├── middleware/        # Middleware personalizado
│   ├── routes/            # Definición de rutas
│   ├── types/             # Tipos e interfaces TypeScript
│   ├── validators/        # Validaciones de entrada
│   ├── app.ts             # Configuración de Express
│   └── index.ts           # Punto de entrada
├── dist/                  # Código compilado (generado)
├── package.json
├── tsconfig.json
└── README.md
```

## Instalación

### Prerrequisitos

- Node.js v18 o superior
- npm o yarn

### Pasos

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo `.env` (opcional):
```bash
cp .env.example .env
```

3. Compilar TypeScript:
```bash
npm run build
```

4. Iniciar servidor:
```bash
# Modo desarrollo (con hot reload)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 1. Crear Orden
**POST** `/orders`

Crea una nueva orden en el sistema.

**Request Body:**
```json
{
  "customer_name": "Juan Pérez",
  "item": "Laptop HP",
  "quantity": 1,
  "status": "pending"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "customer_name": "Juan Pérez",
    "item": "Laptop HP",
    "quantity": 1,
    "status": "pending",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Validaciones:**
- `customer_name`: Requerido, string, 2-100 caracteres
- `item`: Requerido, string, 2-200 caracteres
- `quantity`: Requerido, entero mayor a 0
- `status`: Opcional, debe ser: `pending`, `completed` o `cancelled`

---

### 2. Obtener Orden por ID
**GET** `/orders/:id`

Recupera los detalles de una orden específica.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "customer_name": "Juan Pérez",
    "item": "Laptop HP",
    "quantity": 1,
    "status": "pending",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Orden no encontrada",
    "code": "NOT_FOUND"
  }
}
```

---

### 3. Listar Órdenes (Paginado)
**GET** `/orders?page=1&page_size=10`

Recupera una lista paginada de órdenes.

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `page_size` (opcional): Tamaño de página (default: 10, max: 100)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "customer_name": "Juan Pérez",
        "item": "Laptop HP",
        "quantity": 1,
        "status": "completed",
        "created_at": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "page_size": 10,
      "total_items": 5,
      "total_pages": 1,
      "has_next": false,
      "has_previous": false
    }
  }
}
```

---

### 4. Actualizar Orden
**PUT** `/orders/:id`

Actualiza una orden existente. Todos los campos son opcionales.

**Request Body:**
```json
{
  "status": "completed",
  "quantity": 2
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "customer_name": "Juan Pérez",
    "item": "Laptop HP",
    "quantity": 2,
    "status": "completed",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Validaciones:**
- Todos los campos son opcionales
- Las validaciones son las mismas que en POST
- Al menos un campo debe estar presente

---

### 5. Eliminar Orden
**DELETE** `/orders/:id`

Elimina una orden del sistema.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Orden eliminada exitosamente",
    "id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Orden no encontrada",
    "code": "NOT_FOUND"
  }
}
```

---

### 6. Health Check
**GET** `/health`

Verifica el estado del servidor.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "uptime": 3600
  }
}
```

## Modelo de Datos

### Order
```typescript
{
  id: string;           // UUID v4
  customer_name: string;
  item: string;
  quantity: number;     // Entero positivo
  status: OrderStatus;  // 'pending' | 'completed' | 'cancelled'
  created_at: Date;
}
```

### Estados de Orden (OrderStatus)
- `pending`: Orden pendiente de procesamiento
- `completed`: Orden completada
- `cancelled`: Orden cancelada

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| `VALIDATION_ERROR` | Datos de entrada inválidos |
| `NOT_FOUND` | Recurso no encontrado |
| `INVALID_PARAMETER` | Parámetro de query inválido |
| `NO_UPDATE_DATA` | No se proporcionaron datos para actualizar |
| `INTERNAL_ERROR` | Error interno del servidor |

## Ejemplos de Uso

### Crear una orden
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "María García",
    "item": "Mouse Logitech",
    "quantity": 3
  }'
```

### Listar órdenes con paginación
```bash
curl http://localhost:3000/api/orders?page=1&page_size=5
```

### Obtener una orden específica
```bash
curl http://localhost:3000/api/orders/550e8400-e29b-41d4-a716-446655440000
```

### Actualizar una orden
```bash
curl -X PUT http://localhost:3000/api/orders/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

### Eliminar una orden
```bash
curl -X DELETE http://localhost:3000/api/orders/550e8400-e29b-41d4-a716-446655440000
```

## Datos de Prueba

El servidor se inicia con 5 órdenes de ejemplo para facilitar las pruebas:

1. Laptop HP - Completada
2. Mouse Logitech - Pendiente
3. Teclado Mecánico - Pendiente
4. Monitor Dell 27" - Completada
5. Webcam HD - Cancelada

## Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar en producción
npm start

# Linting
npm run lint
```

## Próximas Mejoras

- [ ] Integración con base de datos real (PostgreSQL/MongoDB)
- [ ] Autenticación y autorización (JWT)
- [ ] Tests unitarios y de integración
- [ ] Documentación con Swagger/OpenAPI
- [ ] Rate limiting
- [ ] Logs estructurados
- [ ] Docker containerization
- [ ] CI/CD pipeline

## Licencia

MIT

## Autor

Desarrollado como proyecto de demostración para ingenieros Full Stack.
