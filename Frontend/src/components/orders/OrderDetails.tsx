import React from 'react';
import { Order, OrderStatus } from '../../types';
import { Modal, Button } from '../ui';

interface OrderDetailsProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (order: Order) => void;
  onDelete?: (order: Order) => void;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!order) return null;

  const getStatusLabel = (status: OrderStatus): string => {
    const labels = {
      [OrderStatus.PENDING]: 'Pendiente',
      [OrderStatus.COMPLETED]: 'Completada',
      [OrderStatus.CANCELLED]: 'Cancelada',
    };
    return labels[status];
  };

  const getStatusClass = (status: OrderStatus): string => {
    const classes = {
      [OrderStatus.PENDING]: 'status-pending',
      [OrderStatus.COMPLETED]: 'status-completed',
      [OrderStatus.CANCELLED]: 'status-cancelled',
    };
    return classes[status];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const footer = (
    <div className="details-footer">
      {onEdit && (
        <Button variant="primary" onClick={() => onEdit(order)}>
          Editar Orden
        </Button>
      )}
      {onDelete && (
        <Button variant="danger" onClick={() => onDelete(order)}>
          Eliminar Orden
        </Button>
      )}
      <Button variant="secondary" onClick={onClose}>
        Cerrar
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalles de la Orden" footer={footer}>
      <div className="order-details">
        <div className="detail-group">
          <label className="detail-label">ID de Orden</label>
          <div className="detail-value detail-id">{order.id}</div>
        </div>

        <div className="detail-group">
          <label className="detail-label">Cliente</label>
          <div className="detail-value">{order.customer_name}</div>
        </div>

        <div className="detail-group">
          <label className="detail-label">Artículo</label>
          <div className="detail-value">{order.item}</div>
        </div>

        <div className="detail-group">
          <label className="detail-label">Cantidad</label>
          <div className="detail-value">
            <span className="quantity-badge">{order.quantity}</span>
          </div>
        </div>

        <div className="detail-group">
          <label className="detail-label">Estado</label>
          <div className="detail-value">
            <span className={`status-badge ${getStatusClass(order.status)}`}>
              {getStatusLabel(order.status)}
            </span>
          </div>
        </div>

        <div className="detail-group">
          <label className="detail-label">Fecha de Creación</label>
          <div className="detail-value">{formatDate(order.created_at)}</div>
        </div>
      </div>
    </Modal>
  );
};
