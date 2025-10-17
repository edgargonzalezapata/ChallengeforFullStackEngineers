# Guía de Inicio Rápido

## Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en modo desarrollo
```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

## Pruebas Rápidas con cURL

### 1. Verificar que el servidor está activo
```bash
curl http://localhost:3000/api/health
```

### 2. Listar todas las órdenes (con datos de ejemplo)
```bash
curl http://localhost:3000/api/orders
```

### 3. Crear una nueva orden
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d "{\"customer_name\":\"Ana López\",\"item\":\"Teclado Mecánico RGB\",\"quantity\":2}"
```

### 4. Obtener una orden específica
Primero lista las órdenes para obtener un ID, luego:
```bash
curl http://localhost:3000/api/orders/[ID_DE_LA_ORDEN]
```

### 5. Actualizar una orden
```bash
curl -X PUT http://localhost:3000/api/orders/[ID_DE_LA_ORDEN] \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"completed\"}"
```

### 6. Eliminar una orden
```bash
curl -X DELETE http://localhost:3000/api/orders/[ID_DE_LA_ORDEN]
```

## Pruebas con PowerShell (Windows)

### Listar órdenes
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/orders" -Method Get
```

### Crear orden
```powershell
$body = @{
    customer_name = "Pedro Martínez"
    item = "Mouse Gamer"
    quantity = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/orders" -Method Post -Body $body -ContentType "application/json"
```

### Actualizar orden
```powershell
$body = @{
    status = "completed"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/orders/[ID]" -Method Put -Body $body -ContentType "application/json"
```

## Estructura de Respuestas

### Respuesta Exitosa
```json
{
  "success": true,
  "data": { ... }
}
```

### Respuesta de Error
```json
{
  "success": false,
  "error": {
    "message": "Descripción del error",
    "code": "ERROR_CODE"
  }
}
```

## Próximos Pasos

1. Revisar el archivo [README.md](README.md) para documentación completa
2. Importar [api-collection.json](api-collection.json) en Postman o Thunder Client
3. Explorar el código fuente en la carpeta `src/`
4. Modificar los datos de ejemplo en `src/database/inMemoryDatabase.ts`

## Solución de Problemas

### Puerto 3000 en uso
Cambiar el puerto en `.env`:
```
PORT=3001
```

### Errores de TypeScript
```bash
npm run build
```

### Limpiar y reinstalar
```bash
rm -rf node_modules package-lock.json
npm install
```

## Recursos Adicionales

- Documentación TypeScript: https://www.typescriptlang.org/docs/
- Express.js: https://expressjs.com/
- REST API Best Practices: https://restfulapi.net/
