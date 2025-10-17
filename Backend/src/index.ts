import { createApp } from './app';

const PORT = process.env.PORT || 3000;

/**
 * Iniciar servidor
 */
const startServer = (): void => {
  try {
    const app = createApp();

    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`🚀 Servidor iniciado exitosamente`);
      console.log(`📡 Escuchando en puerto: ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`📚 API Docs: http://localhost:${PORT}/api/health`);
      console.log(`⏰ Fecha: ${new Date().toLocaleString()}`);
      console.log('='.repeat(50));
    });

    // Manejo de errores no capturados
    process.on('uncaughtException', (error: Error) => {
      console.error('Error no capturado:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason: unknown) => {
      console.error('Promesa rechazada no manejada:', reason);
      process.exit(1);
    });

    // Manejo de señales de terminación
    process.on('SIGTERM', () => {
      console.log('Señal SIGTERM recibida. Cerrando servidor...');
      process.exit(0);
    });

    process.on('SIGINT', () => {
      console.log('\nSeñal SIGINT recibida. Cerrando servidor...');
      process.exit(0);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Iniciar servidor
startServer();
