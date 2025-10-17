import React from 'react';
import { useOrders } from '../../context';
import { Order } from '../../types';
import { Modal, Button, ErrorMessage } from '../ui';

interface DeleteConfirmationProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  order,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { deleteOrder, isLoading, error, clearError } = useOrders();

  const handleDelete = async (): Promise<void> => {
    if (!order) return;

    try {
      await deleteOrder(order.id);
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  if (!order) return null;

  const footer = (
    <div className="delete-footer">
      <Button variant="danger" onClick={handleDelete} isLoading={isLoading}>
        Sí, Eliminar
      </Button>
      <Button variant="secondary" onClick={onClose} disabled={isLoading}>
        Cancelar
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Eliminación" footer={footer}>
      <div className="delete-confirmation">
        {error && <ErrorMessage message={error} onDismiss={clearError} />}

        <div className="warning-icon">⚠️</div>

        <p className="delete-message">
          ¿Estás seguro de que deseas eliminar esta orden?
        </p>

        <div className="order-info">
          <p><strong>Cliente:</strong> {order.customer_name}</p>
          <p><strong>Artículo:</strong> {order.item}</p>
          <p><strong>Cantidad:</strong> {order.quantity}</p>
        </div>

        <p className="delete-warning">
          Esta acción no se puede deshacer.
        </p>
      </div>
    </Modal>
  );
};
