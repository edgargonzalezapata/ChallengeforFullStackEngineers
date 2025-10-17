import { Router } from 'express';
import { OrderController } from '../controllers';
import { createOrderValidation, updateOrderValidation } from '../validators';

const router = Router();

/**
 * @route   POST /orders
 * @desc    Crear una nueva orden
 * @access  Public
 */
router.post('/', createOrderValidation, OrderController.createOrder);

/**
 * @route   GET /orders/:id
 * @desc    Obtener orden por ID
 * @access  Public
 */
router.get('/:id', OrderController.getOrderById);

/**
 * @route   GET /orders
 * @desc    Obtener lista paginada de órdenes
 * @query   page - Número de página (default: 1)
 * @query   page_size - Tamaño de página (default: 10, max: 100)
 * @access  Public
 */
router.get('/', OrderController.getAllOrders);

/**
 * @route   PUT /orders/:id
 * @desc    Actualizar una orden
 * @access  Public
 */
router.put('/:id', updateOrderValidation, OrderController.updateOrder);

/**
 * @route   DELETE /orders/:id
 * @desc    Eliminar una orden
 * @access  Public
 */
router.delete('/:id', OrderController.deleteOrder);

export default router;
