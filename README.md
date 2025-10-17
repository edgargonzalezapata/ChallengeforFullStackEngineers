# Sistema de Gestión de Órdenes - Full Stack
Video Demostración 
https://1drv.ms/v/c/f162de5996f571bf/EaMKEW0odsZJmcCx-70xElwBf49iEWcU_QGIoobggMGweA?e=CK1gN2

Sistema completo de gestión de órdenes con Backend (Node.js + TypeScript) y Frontend (React + TypeScript).

## Descripción General

Aplicación Full Stack para administrar órdenes de compra con operaciones CRUD completas, paginación, filtrado por estado, y una interfaz de usuario moderna y responsive.

## ✨ Puntos de Bonificación Implementados

✅ **Filtrado por Status** - Backend y Frontend
✅ **Tipos Compartidos** - Paquete `shared-types` con Single Source of Truth
✅ **ESLint + Prettier** - Configurados en ambos proyectos
✅ **Manejo de Errores** - Robusto y completo
✅ **Documentación** - Exhaustiva con múltiples READMEs

📄 Ver [BONUS_FEATURES.md](BONUS_FEATURES.md) para detalles completos de implementación.

## Stack Tecnológico

### Backend
- **Node.js** con TypeScript
- **Express.js** - Framework web
- **Base de datos en memoria** (fácilmente migrable a PostgreSQL/MongoDB)
- **express-validator** - Validación de datos
- **UUID** - Generación de IDs únicos

### Frontend
- **React 18** con TypeScript
- **Vite** - Build tool y dev server
- **Axios** - Cliente HTTP tipado
- **Context API** - Gestión de estado
- **CSS vanilla** - Estilos personalizados

## Estructura del Proyecto

```
Desafío para ingenieros Full Stack/
├── Backend/                  # API REST con Node.js + TypeScript
│   ├── src/
│   │   ├── controllers/      # Lógica de negocio
│   │   ├── database/         # Base de datos en memoria
│   │   ├── middleware/       # Middleware de Express
│   │   ├── routes/           # Definición de rutas
│   │   ├── types/            # Tipos TypeScript
│   │   ├── validators/       # Validaciones
│   │   ├── app.ts           # Configuración de Express
│   │   └── index.ts         # Punto de entrada
│   ├── .prettierrc          # Configuración Prettier
│   ├── .eslintrc.json       # Configuración ESLint
│   ├── package.json
│   └── README.md
│
├── Frontend/                 # SPA con React + TypeScript
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   │   ├── orders/       # Componentes de órdenes
│   │   │   └── ui/           # Componentes UI reutilizables
│   │   ├── context/          # Context API
│   │   ├── services/         # Cliente API
│   │   ├── styles/           # Estilos CSS
│   │   └── types/            # Tipos TypeScript
│   ├── .prettierrc          # Configuración Prettier
│   ├── package.json
│   └── README.md
│
├── shared-types/            # 📦 Tipos compartidos (Bonus)
│   ├── src/
│   │   └── index.ts         # Tipos e interfaces compartidos
│   ├── package.json
│   └── README.md
│
├── BONUS_FEATURES.md        # Documentación puntos bonificación
└── README.md                # Este archivo
```

## Características Principales

### Backend API

✅ **Endpoints REST completos:**
- `POST /api/orders` - Crear orden
- `GET /api/orders/:id` - Obtener orden por ID
- `PUT /api/orders/:id` - Actualizar orden
- `DELETE /api/orders/:id` - Eliminar orden
- `GET /api/orders?page=1&page_size=10&status=pending` - Lista paginada con filtro

✅ **Funcionalidades:**
- **Filtrado por status** (pending, completed, cancelled)
- Validación de datos con express-validator
- Paginación con metadata completa
- Manejo de errores centralizado
- Tipos TypeScript estrictos
- Datos de ejemplo precargados
- CORS y seguridad con Helmet
- ESLint + Prettier configurados

### Frontend SPA

✅ **Vistas implementadas:**
- **Lista de órdenes** con paginación (Next/Previous)
- **Filtro por status** con dropdown (Todos/Pendiente/Completada/Cancelada)
- **Detalles de orden** en modal
- **Formulario crear/editar** con validación
- **Confirmación de eliminación**
- **Estados de carga** y manejo de errores

✅ **Funcionalidades:**
- **Filtrado dinámico** por estado con reset de paginación
- Cliente API tipado con Axios
- Context API para estado global
- Componentes reutilizables
- Validación de formularios
- Diseño responsive
- Interfaz moderna y accesible
- ESLint + Prettier configurados

## Instalación y Configuración

### Prerrequisitos

- **Node.js** v18 o superior
- **npm** o yarn
- Terminal/CMD

### Opción 1: Inicio Rápido (Recomendado)

#### 1. Backend
```bash
cd Backend
npm install
npm run dev
```
Backend disponible en: `http://localhost:3000`

#### 2. Frontend (en otra terminal)
```bash
cd Frontend
npm install
npm run dev
```
Frontend disponible en: `http://localhost:5173`

### Opción 2: Paso a Paso Detallado

#### Backend

1. Navegar a la carpeta Backend:
```bash
cd Backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar en modo desarrollo:
```bash
npm run dev
```

4. Verificar que funciona:
```bash
curl http://localhost:3000/api/health
```

#### Frontend

1. Navegar a la carpeta Frontend (en otra terminal):
```bash
cd Frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar en modo desarrollo:
```bash
npm run dev
```

4. Abrir navegador en `http://localhost:5173`

## Uso de la Aplicación

### 1. Ver Lista de Órdenes
- La aplicación carga automáticamente 5 órdenes de ejemplo
- **Usa el filtro "Filtrar por estado"** para ver solo órdenes con un estado específico
- Usa los botones "Anterior" y "Siguiente" para navegar
- Click en cualquier fila para ver detalles

### 2. Crear Nueva Orden
- Click en "+ Nueva Orden" (esquina superior derecha)
- Completar formulario:
  - Nombre del Cliente (requerido)
  - Artículo (requerido)
  - Cantidad (mínimo 1)
  - Estado (Pendiente/Completada/Cancelada)
- Click en "Crear Orden"

### 3. Editar Orden
- Click en botón "Editar" de cualquier orden
- Modificar campos necesarios
- Click en "Actualizar Orden"

### 4. Eliminar Orden
- Click en botón "Eliminar" de cualquier orden
- Confirmar en el modal
- Click en "Sí, Eliminar"

### 5. Ver Detalles
- Click en cualquier fila o botón "Ver"
- Modal muestra información completa
- Opciones para editar o eliminar desde detalles

## Modelo de Datos

### Estructura de Order

```typescript
{
  id: string;              // UUID v4
  customer_name: string;   // 2-100 caracteres
  item: string;            // 2-200 caracteres
  quantity: number;        // Entero >= 1
  status: OrderStatus;     // 'pending' | 'completed' | 'cancelled'
  created_at: Date;        // Timestamp de creación
}
```

## API Endpoints

### Backend Base URL
```
http://localhost:3000/api
```

### Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check del servidor |
| GET | `/orders` | Lista paginada de órdenes |
| GET | `/orders/:id` | Obtener orden por ID |
| POST | `/orders` | Crear nueva orden |
| PUT | `/orders/:id` | Actualizar orden |
| DELETE | `/orders/:id` | Eliminar orden |

### Ejemplos de Uso

**Listar órdenes:**
```bash
# Todas las órdenes
curl http://localhost:3000/api/orders?page=1&page_size=10

# Filtrar por status
curl http://localhost:3000/api/orders?page=1&page_size=10&status=pending
```

**Crear orden:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customer_name":"Juan Pérez","item":"Laptop","quantity":1}'
```

**Actualizar orden:**
```bash
curl -X PUT http://localhost:3000/api/orders/{id} \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

**Eliminar orden:**
```bash
curl -X DELETE http://localhost:3000/api/orders/{id}
```

## Scripts Disponibles

### Backend
```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Compilar TypeScript
npm start        # Producción
npm run lint     # Linting
```

### Frontend
```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linting
```

## Tecnologías y Herramientas

### Backend
- **TypeScript** - Type safety
- **Express.js** - Framework web
- **express-validator** - Validación
- **Helmet** - Seguridad
- **CORS** - Cross-origin
- **UUID** - Generación de IDs

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Axios** - HTTP client
- **Context API** - State management
- **CSS Modules** - Estilos

## Características Destacadas

### Type Safety Completo
- Tipos compartidos entre frontend y backend
- Interfaces para todos los contratos
- Validación en tiempo de compilación
- IntelliSense completo en el IDE

### Manejo de Errores Robusto
- Validación client-side y server-side
- Mensajes de error descriptivos
- Estados de carga visuales
- Recuperación de errores

### Arquitectura Escalable
- Separación de responsabilidades
- Componentes reutilizables
- Código modular y mantenible
- Fácil migración a DB real

### Experiencia de Usuario
- Interfaz intuitiva y moderna
- Feedback visual inmediato
- Validación en tiempo real
- Diseño responsive

## Mejoras Futuras

### Backend
- [ ] Migración a PostgreSQL/MongoDB
- [ ] Autenticación JWT
- [ ] Tests unitarios y de integración
- [ ] Documentación Swagger/OpenAPI
- [ ] Rate limiting
- [ ] Logs estructurados
- [ ] Docker containerization

### Frontend
- [ ] Filtros y búsqueda avanzada
- [ ] Ordenamiento por columnas
- [ ] Exportación de datos (CSV/PDF)
- [ ] Modo oscuro
- [ ] Tests E2E con Cypress
- [ ] PWA support
- [ ] Optimistic updates
- [ ] Internacionalización

## Troubleshooting

### Backend no inicia
```bash
# Verificar puerto
netstat -ano | findstr :3000

# Cambiar puerto en .env
PORT=3001
```

### Frontend no conecta al Backend
- Verificar que backend esté en `http://localhost:3000`
- Revisar configuración de proxy en `vite.config.ts`
- Verificar CORS en backend

### Error de TypeScript
```bash
# Limpiar node_modules
rm -rf node_modules package-lock.json
npm install
```

## Recursos Adicionales

### Documentación
- **[BONUS_FEATURES.md](BONUS_FEATURES.md)** - ✨ Puntos de bonificación implementados
- [Backend README](Backend/README.md) - Documentación detallada del API
- [Frontend README](Frontend/README.md) - Documentación detallada del UI
- [Backend QUICKSTART](Backend/QUICKSTART.md) - Guía rápida Backend
- [Frontend QUICKSTART](Frontend/QUICKSTART.md) - Guía rápida Frontend
- [shared-types README](shared-types/README.md) - Tipos compartidos

### Tecnologías
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

## Licencia

MIT

## Autor

Desarrollado como proyecto de demostración para el Desafío de Ingenieros Full Stack.

---

**¡Listo para usar!** Sigue la sección de Instalación y Configuración para comenzar.
