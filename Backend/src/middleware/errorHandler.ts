import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

/**
 * Middleware para manejo global de errores
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  const response: ApiResponse = {
    success: false,
    error: {
      message: err.message || 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    }
  };

  res.status(500).json(response);
};

/**
 * Middleware para rutas no encontradas
 */
export const notFoundHandler = (
  req: Request,
  res: Response
): void => {
  const response: ApiResponse = {
    success: false,
    error: {
      message: `Ruta no encontrada: ${req.method} ${req.path}`,
      code: 'NOT_FOUND'
    }
  };

  res.status(404).json(response);
};
