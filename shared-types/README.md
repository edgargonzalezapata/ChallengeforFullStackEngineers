# Shared Types Package

Paquete de tipos TypeScript compartidos entre Frontend y Backend para asegurar consistencia de tipos en toda la aplicación.

## Instalación

```bash
npm install
npm run build
```

## Uso en Backend

```typescript
import { Order, OrderStatus, CreateOrderDTO } from '@orders-app/shared-types';
```

## Uso en Frontend

```typescript
import { Order, OrderStatus, ApiResponse } from '@orders-app/shared-types';
```

## Tipos Incluidos

- `Order` - Interfaz principal de orden
- `OrderStatus` - Enum de estados
- `CreateOrderDTO` - DTO para crear orden
- `UpdateOrderDTO` - DTO para actualizar orden
- `PaginationParams` - Parámetros de paginación
- `PaginatedResponse<T>` - Respuesta paginada genérica
- `ApiResponse<T>` - Respuesta estándar de API
- `ErrorCode` - Códigos de error estándar

## Beneficios

✅ **Type Safety** completo entre Frontend y Backend
✅ **Single Source of Truth** para todos los tipos
✅ **Refactoring seguro** - cambios se reflejan en ambos lados
✅ **Autocompletado** mejorado en el IDE
✅ **Menos errores** en tiempo de ejecución
