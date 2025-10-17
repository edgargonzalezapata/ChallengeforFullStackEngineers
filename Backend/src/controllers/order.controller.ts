import { Request, Response } from 'express';
import { database } from '../database';
import { CreateOrderDTO, UpdateOrderDTO, ApiResponse, PaginatedResponse, Order, OrderStatus } from '../types';
import { validationResult } from 'express-validator';

/**
 * Controlador para operaciones de órdenes
 */
export class OrderController {
  /**
   * POST /orders - Crear una nueva orden
   */
  static createOrder(req: Request, res: Response): void {
    // Validar entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response: ApiResponse = {
        success: false,
        error: {
          message: 'Datos de entrada inválidos',
          code: 'VALIDATION_ERROR'
        }
      };
      res.status(400).json(response);
      return;
    }

    try {
      const orderDTO: CreateOrderDTO = req.body;
      const newOrder = database.create(orderDTO);

      const response: ApiResponse<Order> = {
        success: true,
        data: newOrder
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: {
          message: 'Error al crear la orden',
          code: 'INTERNAL_ERROR'
        }
      };
      res.status(500).json(response);
    }
  }

  /**
   * GET /orders/:id - Obtener orden por ID
   */
  static getOrderById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const order = database.findById(id);

      if (!order) {
        const response: ApiResponse = {
          success: false,
          error: {
            message: 'Orden no encontrada',
            code: 'NOT_FOUND'
          }
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Order> = {
        success: true,
        data: order
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: {
          message: 'Error al obtener la orden',
          code: 'INTERNAL_ERROR'
        }
      };
      res.status(500).json(response);
    }
  }

  /**
   * GET /orders - Obtener lista paginada de órdenes con filtro opcional por status
   */
  static getAllOrders(req: Request, res: Response): void {
    try {
      // Obtener parámetros de paginación con valores por defecto
      const page = parseInt(req.query.page as string) || 1;
      const page_size = parseInt(req.query.page_size as string) || 10;
      const status = req.query.status as OrderStatus | undefined;

      // Validar parámetros
      if (page < 1) {
        const response: ApiResponse = {
          success: false,
          error: {
            message: 'El parámetro "page" debe ser mayor o igual a 1',
            code: 'INVALID_PARAMETER'
          }
        };
        res.status(400).json(response);
        return;
      }

      if (page_size < 1 || page_size > 100) {
        const response: ApiResponse = {
          success: false,
          error: {
            message: 'El parámetro "page_size" debe estar entre 1 y 100',
            code: 'INVALID_PARAMETER'
          }
        };
        res.status(400).json(response);
        return;
      }

      // Validar status si se proporciona
      if (status && !Object.values(OrderStatus).includes(status)) {
        const response: ApiResponse = {
          success: false,
          error: {
            message: `El parámetro "status" debe ser uno de: ${Object.values(OrderStatus).join(', ')}`,
            code: 'INVALID_PARAMETER'
          }
        };
        res.status(400).json(response);
        return;
      }

      const paginatedResult = database.findAll({ page, page_size, status });

      const response: ApiResponse<PaginatedResponse<Order>> = {
        success: true,
        data: paginatedResult
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: {
          message: 'Error al obtener las órdenes',
          code: 'INTERNAL_ERROR'
        }
      };
      res.status(500).json(response);
    }
  }

  /**
   * PUT /orders/:id - Actualizar una orden
   */
  static updateOrder(req: Request, res: Response): void {
    // Validar entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response: ApiResponse = {
        success: false,
        error: {
          message: 'Datos de entrada inválidos',
          code: 'VALIDATION_ERROR'
        }
      };
      res.status(400).json(response);
      return;
    }

    try {
      const { id } = req.params;
      const updateDTO: UpdateOrderDTO = req.body;

      // Verificar que al menos un campo esté presente
      if (Object.keys(updateDTO).length === 0) {
        const response: ApiResponse = {
          success: false,
          error: {
            message: 'Debe proporcionar al menos un campo para actualizar',
            code: 'NO_UPDATE_DATA'
          }
        };
        res.status(400).json(response);
        return;
      }

      const updatedOrder = database.update(id, updateDTO);

      if (!updatedOrder) {
        const response: ApiResponse = {
          success: false,
          error: {
            message: 'Orden no encontrada',
            code: 'NOT_FOUND'
          }
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Order> = {
        success: true,
        data: updatedOrder
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: {
          message: 'Error al actualizar la orden',
          code: 'INTERNAL_ERROR'
        }
      };
      res.status(500).json(response);
    }
  }

  /**
   * DELETE /orders/:id - Eliminar una orden
   */
  static deleteOrder(req: Request, res: Response): void {
    try {
      const { id } = req.params;

      const deleted = database.delete(id);

      if (!deleted) {
        const response: ApiResponse = {
          success: false,
          error: {
            message: 'Orden no encontrada',
            code: 'NOT_FOUND'
          }
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: {
          message: 'Orden eliminada exitosamente',
          id
        }
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: {
          message: 'Error al eliminar la orden',
          code: 'INTERNAL_ERROR'
        }
      };
      res.status(500).json(response);
    }
  }
}
