import React, { useState, useEffect } from 'react';
import { useOrders } from '../../context';
import { Order, OrderStatus, CreateOrderDTO, UpdateOrderDTO } from '../../types';
import { Modal, Button, ErrorMessage } from '../ui';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order | null;
  onSuccess?: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  isOpen,
  onClose,
  order,
  onSuccess,
}) => {
  const { createOrder, updateOrder, isLoading, error, clearError } = useOrders();

  const [formData, setFormData] = useState<CreateOrderDTO>({
    customer_name: '',
    item: '',
    quantity: 1,
    status: OrderStatus.PENDING,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (order) {
      setFormData({
        customer_name: order.customer_name,
        item: order.item,
        quantity: order.quantity,
        status: order.status,
      });
    } else {
      setFormData({
        customer_name: '',
        item: '',
        quantity: 1,
        status: OrderStatus.PENDING,
      });
    }
    setValidationErrors({});
    clearError();
  }, [order, isOpen, clearError]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.customer_name.trim()) {
      errors.customer_name = 'El nombre del cliente es requerido';
    } else if (formData.customer_name.length < 2) {
      errors.customer_name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.item.trim()) {
      errors.item = 'El artículo es requerido';
    } else if (formData.item.length < 2) {
      errors.item = 'El artículo debe tener al menos 2 caracteres';
    }

    if (formData.quantity < 1) {
      errors.quantity = 'La cantidad debe ser al menos 1';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (order) {
        // Actualizar orden existente
        const updateData: UpdateOrderDTO = {
          customer_name: formData.customer_name,
          item: formData.item,
          quantity: formData.quantity,
          status: formData.status,
        };
        await updateOrder(order.id, updateData);
      } else {
        // Crear nueva orden
        await createOrder(formData);
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      // El error ya se maneja en el contexto
      console.error('Error en el formulario:', err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value,
    }));

    // Limpiar error de validación del campo
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const footer = (
    <div className="form-footer">
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        onClick={handleSubmit}
      >
        {order ? 'Actualizar Orden' : 'Crear Orden'}
      </Button>
      <Button variant="secondary" onClick={onClose} disabled={isLoading}>
        Cancelar
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={order ? 'Editar Orden' : 'Crear Nueva Orden'}
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="order-form">
        {error && <ErrorMessage message={error} onDismiss={clearError} />}

        <div className="form-group">
          <label htmlFor="customer_name" className="form-label">
            Nombre del Cliente *
          </label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            className={`form-input ${validationErrors.customer_name ? 'input-error' : ''}`}
            placeholder="Ej: Juan Pérez"
            disabled={isLoading}
          />
          {validationErrors.customer_name && (
            <span className="error-text">{validationErrors.customer_name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="item" className="form-label">
            Artículo *
          </label>
          <input
            type="text"
            id="item"
            name="item"
            value={formData.item}
            onChange={handleChange}
            className={`form-input ${validationErrors.item ? 'input-error' : ''}`}
            placeholder="Ej: Laptop HP"
            disabled={isLoading}
          />
          {validationErrors.item && (
            <span className="error-text">{validationErrors.item}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="quantity" className="form-label">
            Cantidad *
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            className={`form-input ${validationErrors.quantity ? 'input-error' : ''}`}
            disabled={isLoading}
          />
          {validationErrors.quantity && (
            <span className="error-text">{validationErrors.quantity}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">
            Estado *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
            disabled={isLoading}
          >
            <option value={OrderStatus.PENDING}>Pendiente</option>
            <option value={OrderStatus.COMPLETED}>Completada</option>
            <option value={OrderStatus.CANCELLED}>Cancelada</option>
          </select>
        </div>
      </form>
    </Modal>
  );
};
