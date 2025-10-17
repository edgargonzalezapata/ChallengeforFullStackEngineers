import { body } from 'express-validator';
import { OrderStatus } from '../types';

/**
 * Validaciones para crear una orden
 */
export const createOrderValidation = [
  body('customer_name')
    .trim()
    .notEmpty()
    .withMessage('El nombre del cliente es requerido')
    .isString()
    .withMessage('El nombre del cliente debe ser una cadena')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre del cliente debe tener entre 2 y 100 caracteres'),

  body('item')
    .trim()
    .notEmpty()
    .withMessage('El artículo es requerido')
    .isString()
    .withMessage('El artículo debe ser una cadena')
    .isLength({ min: 2, max: 200 })
    .withMessage('El artículo debe tener entre 2 y 200 caracteres'),

  body('quantity')
    .notEmpty()
    .withMessage('La cantidad es requerida')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero mayor a 0'),

  body('status')
    .optional()
    .isIn(Object.values(OrderStatus))
    .withMessage(`El estado debe ser uno de: ${Object.values(OrderStatus).join(', ')}`)
];

/**
 * Validaciones para actualizar una orden
 */
export const updateOrderValidation = [
  body('customer_name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre del cliente no puede estar vacío')
    .isString()
    .withMessage('El nombre del cliente debe ser una cadena')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre del cliente debe tener entre 2 y 100 caracteres'),

  body('item')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El artículo no puede estar vacío')
    .isString()
    .withMessage('El artículo debe ser una cadena')
    .isLength({ min: 2, max: 200 })
    .withMessage('El artículo debe tener entre 2 y 200 caracteres'),

  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero mayor a 0'),

  body('status')
    .optional()
    .isIn(Object.values(OrderStatus))
    .withMessage(`El estado debe ser uno de: ${Object.values(OrderStatus).join(', ')}`)
];
