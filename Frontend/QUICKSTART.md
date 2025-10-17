# Guía de Inicio Rápido - Frontend

## Inicio Rápido (3 pasos)

### 1. Asegúrate de que el Backend está ejecutándose
```bash
# En la carpeta Backend
cd ../Backend
npm run dev
```

El backend debe estar ejecutándose en `http://localhost:3000`

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar la aplicación
```bash
npm run dev
```

Abre tu navegador en: `http://localhost:5173`

## Funcionalidades Disponibles

### Ver Órdenes
- La lista se carga automáticamente al iniciar
- Navega entre páginas con los botones "Anterior" y "Siguiente"
- Haz click en cualquier fila para ver detalles

### Crear Nueva Orden
1. Click en el botón "+ Nueva Orden" (esquina superior derecha)
2. Completa el formulario:
   - Nombre del Cliente
   - Artículo
   - Cantidad
   - Estado
3. Click en "Crear Orden"

### Ver Detalles
- Click en cualquier fila de la tabla
- O click en el botón "Ver" de cada orden
- Modal con información completa

### Editar Orden
- Click en el botón "Editar" en la lista
- O dentro del modal de detalles
- Modifica los campos necesarios
- Click en "Actualizar Orden"

### Eliminar Orden
- Click en el botón "Eliminar" en la lista
- O dentro del modal de detalles
- Confirma la eliminación
- Click en "Sí, Eliminar"

## Estructura Visual

```
┌─────────────────────────────────────────────────┐
│  Sistema de Gestión de Órdenes  [+ Nueva Orden]│
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Lista de Órdenes                                │
├─────────────────────────────────────────────────┤
│  ID    | Cliente | Artículo | Cant | Estado     │
│  abc... | Juan    | Laptop   | 1    | [Pendiente]│
│  [Ver] [Editar] [Eliminar]                       │
├─────────────────────────────────────────────────┤
│  Página 1 de 1 (5 órdenes)  [◄ Anterior] [►]   │
└─────────────────────────────────────────────────┘
```

## Estados de las Órdenes

- 🟡 **Pendiente** - Orden recién creada
- 🟢 **Completada** - Orden finalizada
- 🔴 **Cancelada** - Orden cancelada

## Atajos de Teclado

- **ESC** - Cerrar modal abierto
- **Enter** - Enviar formulario (cuando está enfocado)

## Validaciones del Formulario

### Nombre del Cliente
- Requerido
- Mínimo 2 caracteres
- Máximo 100 caracteres

### Artículo
- Requerido
- Mínimo 2 caracteres
- Máximo 200 caracteres

### Cantidad
- Requerido
- Debe ser un número entero
- Mínimo 1

### Estado
- Selección requerida
- Opciones: Pendiente, Completada, Cancelada

## Manejo de Errores

Si ves un error:
1. Lee el mensaje de error (aparece en rojo)
2. Verifica que el backend esté ejecutándose
3. Revisa la consola del navegador (F12)
4. Intenta cerrar y reabrir el modal

## Troubleshooting Rápido

### "Error al cargar órdenes"
→ Verifica que el backend esté en `http://localhost:3000`

### "Ruta no encontrada"
→ El backend está ejecutándose pero no responde correctamente

### Página en blanco
→ Abre la consola (F12) y revisa los errores

### Puerto 5173 en uso
→ Vite te sugerirá automáticamente otro puerto

## Próximos Pasos

1. Explora las diferentes funcionalidades
2. Prueba crear, editar y eliminar órdenes
3. Revisa el código en `src/components/orders/`
4. Personaliza los estilos en `src/styles/`
5. Lee el README completo para más detalles

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## Recursos

- [README completo](README.md) - Documentación detallada
- [Vite Docs](https://vitejs.dev/) - Documentación de Vite
- [React Docs](https://react.dev/) - Documentación de React
- [TypeScript Docs](https://www.typescriptlang.org/) - Documentación de TypeScript
