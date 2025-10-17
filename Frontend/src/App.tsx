import React, { useState } from 'react';
import { OrderProvider } from './context';
import { OrderList, OrderDetails, OrderForm, DeleteConfirmation } from './components/orders';
import { Button } from './components/ui';
import { Order } from './types';
import './styles/global.css';
import './styles/components.css';
import './styles/forms.css';

const App: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);

  const handleSelectOrder = (order: Order): void => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = (): void => {
    setIsDetailsOpen(false);
    setSelectedOrder(null);
  };

  const handleCreateOrder = (): void => {
    setEditingOrder(null);
    setIsFormOpen(true);
  };

  const handleEditOrder = (order: Order): void => {
    setEditingOrder(order);
    setIsFormOpen(true);
    setIsDetailsOpen(false);
  };

  const handleCloseForm = (): void => {
    setIsFormOpen(false);
    setEditingOrder(null);
  };

  const handleDeleteOrder = (order: Order): void => {
    setDeletingOrder(order);
    setIsDeleteOpen(true);
    setIsDetailsOpen(false);
  };

  const handleCloseDelete = (): void => {
    setIsDeleteOpen(false);
    setDeletingOrder(null);
  };

  const handleFormSuccess = (): void => {
    // Refrescar lista (se hace automáticamente por el contexto)
    handleCloseForm();
  };

  const handleDeleteSuccess = (): void => {
    // Refrescar lista (se hace automáticamente por el contexto)
    handleCloseDelete();
  };

  return (
    <OrderProvider>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div>
              <h1 className="app-title">Sistema de Gestión de Órdenes</h1>
              <p className="subtitle">Administra tus órdenes de forma eficiente</p>
            </div>
            <Button variant="primary" onClick={handleCreateOrder}>
              + Nueva Orden
            </Button>
          </div>
        </header>

        <main className="container">
          <OrderList
            onSelectOrder={handleSelectOrder}
            onEditOrder={handleEditOrder}
            onDeleteOrder={handleDeleteOrder}
          />
        </main>

        {/* Modal de detalles */}
        <OrderDetails
          order={selectedOrder}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          onEdit={handleEditOrder}
          onDelete={handleDeleteOrder}
        />

        {/* Modal de crear/editar */}
        <OrderForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          order={editingOrder}
          onSuccess={handleFormSuccess}
        />

        {/* Modal de confirmación de eliminación */}
        <DeleteConfirmation
          order={deletingOrder}
          isOpen={isDeleteOpen}
          onClose={handleCloseDelete}
          onSuccess={handleDeleteSuccess}
        />
      </div>
    </OrderProvider>
  );
};

export default App;
