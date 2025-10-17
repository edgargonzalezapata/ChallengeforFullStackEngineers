import { Router } from 'express';
import orderRoutes from './order.routes';

const router = Router();

// Montar rutas de órdenes
router.use('/orders', orderRoutes);

// Ruta de health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  });
});

export default router;
