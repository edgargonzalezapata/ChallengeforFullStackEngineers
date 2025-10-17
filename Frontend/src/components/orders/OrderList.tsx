import React, { useEffect, useState } from 'react';
import { useOrders } from '../../context';
import { Order, OrderStatus } from '../../types';
import { Button, Card, Loading, ErrorMessage } from '../ui';

interface OrderListProps {
  onSelectOrder: (order: Order) => void;
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (order: Order) => void;
}

export const OrderList: React.FC<OrderListProps> = ({
  onSelectOrder,
  onEditOrder,
  onDeleteOrder,
}) => {
  const { orders, pagination, isLoading, error, fetchOrders, clearError } = useOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const pageSize = 10;

  useEffect(() => {
    const params = {
      page: currentPage,
      page_size: pageSize,
      ...(statusFilter && { status: statusFilter }),
    };
    fetchOrders(params);
  }, [currentPage, statusFilter, fetchOrders]);

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setStatusFilter(e.target.value as OrderStatus | '');
    setCurrentPage(1); // Reset a la primera página cuando cambia el filtro
  };

  const handleNextPage = (): void => {
    if (pagination?.has_next) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = (): void => {
    if (pagination?.has_previous) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getStatusBadgeClass = (status: OrderStatus): string => {
    const statusClasses = {
      [OrderStatus.PENDING]: 'status-badge status-pending',
      [OrderStatus.COMPLETED]: 'status-badge status-completed',
      [OrderStatus.CANCELLED]: 'status-badge status-cancelled',
    };
    return statusClasses[status];
  };

  const getStatusLabel = (status: OrderStatus): string => {
    const labels = {
      [OrderStatus.PENDING]: 'Pendiente',
      [OrderStatus.COMPLETED]: 'Completada',
      [OrderStatus.CANCELLED]: 'Cancelada',
    };
    return labels[status];
  };

  if (error) {
    return <ErrorMessage message={error} onDismiss={clearError} />;
  }

  if (isLoading && orders.length === 0) {
    return <Loading message="Cargando órdenes..." />;
  }

  return (
    <Card title="Lista de Órdenes">
      {/* Filtro por status */}
      <div className="filter-section">
        <label htmlFor="status-filter" className="filter-label">
          Filtrar por estado:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="filter-select"
          disabled={isLoading}
        >
          <option value="">Todos</option>
          <option value={OrderStatus.PENDING}>Pendiente</option>
          <option value={OrderStatus.COMPLETED}>Completada</option>
          <option value={OrderStatus.CANCELLED}>Cancelada</option>
        </select>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No hay órdenes disponibles{statusFilter && ' con este estado'}</p>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Artículo</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} onClick={() => onSelectOrder(order)} className="table-row-clickable">
                    <td className="order-id" title={order.id}>
                      {order.id.substring(0, 8)}...
                    </td>
                    <td>{order.customer_name}</td>
                    <td>{order.item}</td>
                    <td className="text-center">{order.quantity}</td>
                    <td>
                      <span className={getStatusBadgeClass(order.status)}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectOrder(order);
                        }}
                      >
                        Ver
                      </Button>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditOrder(order);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteOrder(order);
                        }}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination && (
            <div className="pagination">
              <div className="pagination-info">
                Página {pagination.page} de {pagination.total_pages} ({pagination.total_items} órdenes totales)
              </div>
              <div className="pagination-controls">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={handlePreviousPage}
                  disabled={!pagination.has_previous || isLoading}
                >
                  ← Anterior
                </Button>
                <span className="page-number">Página {pagination.page}</span>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={handleNextPage}
                  disabled={!pagination.has_next || isLoading}
                >
                  Siguiente →
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
};
