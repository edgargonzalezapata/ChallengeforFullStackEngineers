import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware';

/**
 * Configurar aplicación Express
 */
export const createApp = (): Application => {
  const app: Application = express();

  // Middleware de seguridad
  app.use(helmet());

  // CORS - permitir todas las origenes (configurar según necesidades)
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Parser de JSON
  app.use(express.json());

  // Parser de URL-encoded
  app.use(express.urlencoded({ extended: true }));

  // Logger simple
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Ruta de bienvenida
  app.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        message: 'Orders API - Backend con Node.js + TypeScript',
        version: '1.0.0',
        endpoints: {
          health: '/api/health',
          orders: '/api/orders',
          documentation: 'Ver README.md para documentación completa'
        },
        examples: {
          list_orders: 'GET /api/orders?page=1&page_size=10',
          get_order: 'GET /api/orders/:id',
          create_order: 'POST /api/orders',
          update_order: 'PUT /api/orders/:id',
          delete_order: 'DELETE /api/orders/:id'
        }
      }
    });
  });

  // Montar rutas de API
  app.use('/api', routes);

  // Manejador de rutas no encontradas
  app.use(notFoundHandler);

  // Manejador global de errores
  app.use(errorHandler);

  return app;
};
