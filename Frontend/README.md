# Orders Management Frontend

Aplicación frontend para gestión de órdenes construida con React, TypeScript y Vite.

## Características

- **React 18** con TypeScript para type safety completo
- **Vite** para desarrollo rápido y build optimizado
- **Context API** para gestión de estado global
- **Axios** con cliente API tipado
- **Componentes reutilizables** con UI modular
- **Paginación completa** con navegación Next/Previous
- **Modales** para crear, editar y ver detalles
- **Validación de formularios** en tiempo real
- **Estados de carga y error** bien manejados
- **Diseño responsive** y moderno
- **CSS personalizado** sin dependencias de frameworks CSS

## Stack Tecnológico

- **React** v18.2+
- **TypeScript** v5.2+
- **Vite** v5.0+ (Build tool)
- **Axios** v1.6+ (Cliente HTTP)
- **React Router DOM** v6.20+ (Navegación)

## Estructura del Proyecto

```
Frontend/
├── src/
│   ├── components/
│   │   ├── orders/          # Componentes de órdenes
│   │   │   ├── OrderList.tsx
│   │   │   ├── OrderDetails.tsx
│   │   │   ├── OrderForm.tsx
│   │   │   └── DeleteConfirmation.tsx
│   │   └── ui/              # Componentes UI reutilizables
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Loading.tsx
│   │       ├── ErrorMessage.tsx
│   │       └── Modal.tsx
│   ├── context/             # Context API para estado global
│   │   └── OrderContext.tsx
│   ├── services/            # Cliente API con axios
│   │   └── api.client.ts
│   ├── types/               # Tipos e interfaces TypeScript
│   │   └── order.types.ts
│   ├── styles/              # Estilos CSS
│   │   ├── global.css
│   │   ├── components.css
│   │   └── forms.css
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Punto de entrada
│   └── vite-env.d.ts        # Tipos de Vite
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Instalación y Configuración

### Prerrequisitos

- Node.js v18 o superior
- npm o yarn
- Backend API ejecutándose en `http://localhost:3000`

### Pasos de Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar la URL del API (opcional):**

Por defecto, el frontend se conecta a `http://localhost:3000/api`. Si tu backend usa una URL diferente, modifica el archivo `src/services/api.client.ts`:

```typescript
constructor(baseURL: string = 'http://tu-api-url/api') {
  // ...
}
```

3. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

4. **Build para producción:**
```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

5. **Preview del build de producción:**
```bash
npm run preview
```

## Características Principales

### 1. Vista de Lista de Órdenes

- **Tabla completa** con las siguientes columnas:
  - Order ID (8 primeros caracteres)
  - Nombre del Cliente
  - Artículo
  - Cantidad
  - Estado (con badges de colores)
  - Acciones (Ver, Editar, Eliminar)

- **Paginación:**
  - Botones "Anterior" y "Siguiente"
  - Información de página actual y total
  - 10 órdenes por página (configurable)
  - Contador de órdenes totales

- **Interactividad:**
  - Click en fila para ver detalles
  - Botones de acción en cada fila
  - Estados de carga visual

### 2. Detalles de Orden

Modal que muestra información completa:
- ID completo de la orden
- Nombre del cliente
- Artículo
- Cantidad (con badge)
- Estado (con badge de color)
- Fecha de creación (formateada)
- Acciones: Editar, Eliminar, Cerrar

### 3. Crear/Editar Orden

Formulario modal con:
- **Campo: Nombre del Cliente**
  - Input de texto
  - Validación: requerido, mínimo 2 caracteres

- **Campo: Artículo**
  - Input de texto
  - Validación: requerido, mínimo 2 caracteres

- **Campo: Cantidad**
  - Input numérico
  - Validación: mínimo 1

- **Campo: Estado**
  - Dropdown con opciones:
    - Pendiente
    - Completada
    - Cancelada

- **Validación en tiempo real**
- **Mensajes de error específicos**
- **Estado de carga durante el envío**

### 4. Eliminar Orden

Modal de confirmación con:
- Advertencia visual
- Resumen de la orden a eliminar
- Confirmación explícita
- Mensaje de advertencia sobre acción irreversible

### 5. Manejo de Estados

**Estados de Carga:**
- Spinner durante carga inicial
- Botones deshabilitados durante operaciones
- Indicadores visuales en todas las operaciones asíncronas

**Manejo de Errores:**
- Mensajes de error claros y descriptivos
- Opción para cerrar mensajes de error
- Errores específicos por operación
- Validación client-side antes de enviar

## Componentes Principales

### OrderList
Lista paginada de órdenes con funcionalidad de búsqueda y acciones.

```tsx
<OrderList
  onSelectOrder={(order) => {...}}
  onEditOrder={(order) => {...}}
  onDeleteOrder={(order) => {...}}
/>
```

### OrderDetails
Modal para ver detalles completos de una orden.

```tsx
<OrderDetails
  order={order}
  isOpen={isOpen}
  onClose={() => {...}}
  onEdit={(order) => {...}}
  onDelete={(order) => {...}}
/>
```

### OrderForm
Formulario para crear o editar órdenes.

```tsx
<OrderForm
  isOpen={isOpen}
  onClose={() => {...}}
  order={editingOrder}  // null para crear, Order para editar
  onSuccess={() => {...}}
/>
```

### DeleteConfirmation
Modal de confirmación para eliminar órdenes.

```tsx
<DeleteConfirmation
  order={order}
  isOpen={isOpen}
  onClose={() => {...}}
  onSuccess={() => {...}}
/>
```

## Context API

El estado global se maneja con `OrderContext`:

```tsx
const {
  orders,           // Array de órdenes
  currentOrder,     // Orden seleccionada
  pagination,       // Info de paginación
  isLoading,        // Estado de carga
  error,            // Error actual
  fetchOrders,      // Obtener lista
  fetchOrderById,   // Obtener por ID
  createOrder,      // Crear orden
  updateOrder,      // Actualizar orden
  deleteOrder,      // Eliminar orden
  setCurrentOrder,  // Establecer orden actual
  clearError        // Limpiar error
} = useOrders();
```

## Cliente API

Cliente tipado con Axios:

```typescript
// GET - Lista paginada
await apiClient.getOrders({ page: 1, page_size: 10 });

// GET - Por ID
await apiClient.getOrderById(id);

// POST - Crear
await apiClient.createOrder(orderData);

// PUT - Actualizar
await apiClient.updateOrder(id, updateData);

// DELETE - Eliminar
await apiClient.deleteOrder(id);

// Health Check
await apiClient.healthCheck();
```

## Tipos TypeScript

### Order
```typescript
interface Order {
  id: string;
  customer_name: string;
  item: string;
  quantity: number;
  status: OrderStatus;
  created_at: string;
}
```

### OrderStatus
```typescript
enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}
```

### CreateOrderDTO
```typescript
interface CreateOrderDTO {
  customer_name: string;
  item: string;
  quantity: number;
  status?: OrderStatus;
}
```

### UpdateOrderDTO
```typescript
interface UpdateOrderDTO {
  customer_name?: string;
  item?: string;
  quantity?: number;
  status?: OrderStatus;
}
```

## Estilos

El proyecto usa CSS vanilla con variables CSS para temas:

### Variables principales:
```css
--primary-color: #4f46e5
--secondary-color: #64748b
--danger-color: #ef4444
--success-color: #10b981
--status-pending: #f59e0b
--status-completed: #10b981
--status-cancelled: #ef4444
```

### Responsive:
- Breakpoint mobile: 768px
- Layout adaptativo
- Tabla con scroll horizontal en móviles

## Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## Conexión con Backend

El frontend se conecta al backend mediante:

1. **Desarrollo:** Proxy configurado en `vite.config.ts`
   - `/api/*` → `http://localhost:3000/api/*`

2. **Producción:** Configurar variable de entorno o modificar `api.client.ts`

## Mejoras Futuras

- [ ] Filtros y búsqueda avanzada
- [ ] Ordenamiento por columnas
- [ ] Exportación de datos (CSV, PDF)
- [ ] Modo oscuro
- [ ] Notificaciones toast
- [ ] Tests unitarios y E2E
- [ ] Caché de datos
- [ ] Optimistic updates
- [ ] Internacionalización (i18n)
- [ ] PWA support

## Troubleshooting

### Error de conexión al API
- Verificar que el backend esté ejecutándose en `http://localhost:3000`
- Revisar la configuración del proxy en `vite.config.ts`
- Verificar CORS en el backend

### Problemas de TypeScript
```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar tipos
npm run build
```

### Puerto en uso
Cambiar el puerto en `vite.config.ts`:
```typescript
server: {
  port: 5174,  // Cambiar puerto
}
```

## Licencia

MIT

## Autor

Desarrollado como proyecto de demostración para ingenieros Full Stack.
