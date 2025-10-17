import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { apiClient } from '../services';
import type { Order, CreateOrderDTO, UpdateOrderDTO, PaginationParams, PaginatedResponse, OrderStatus } from '../types';

/**
 * Estado del contexto
 */
interface OrderContextState {
  orders: Order[];
  currentOrder: Order | null;
  pagination: PaginatedResponse<Order>['pagination'] | null;
  isLoading: boolean;
  error: string | null;

  // Acciones
  fetchOrders: (params: PaginationParams & { status?: OrderStatus }) => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
  createOrder: (orderData: CreateOrderDTO) => Promise<Order>;
  updateOrder: (id: string, orderData: UpdateOrderDTO) => Promise<Order>;
  deleteOrder: (id: string) => Promise<void>;
  setCurrentOrder: (order: Order | null) => void;
  clearError: () => void;
}

const OrderContext = createContext<OrderContextState | undefined>(undefined);

/**
 * Provider del contexto de órdenes
 */
export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [pagination, setPagination] = useState<PaginatedResponse<Order>['pagination'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtener lista paginada de órdenes con filtro opcional por status
   */
  const fetchOrders = useCallback(async (params: PaginationParams & { status?: OrderStatus }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.getOrders(params);
      setOrders(response.data);
      setPagination(response.pagination);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar órdenes';
      setError(errorMessage);
      setOrders([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Obtener orden por ID
   */
  const fetchOrderById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const order = await apiClient.getOrderById(id);
      setCurrentOrder(order);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar la orden';
      setError(errorMessage);
      setCurrentOrder(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Crear nueva orden
   */
  const createOrder = useCallback(async (orderData: CreateOrderDTO): Promise<Order> => {
    setIsLoading(true);
    setError(null);
    try {
      const newOrder = await apiClient.createOrder(orderData);
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear la orden';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Actualizar orden
   */
  const updateOrder = useCallback(async (id: string, orderData: UpdateOrderDTO): Promise<Order> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedOrder = await apiClient.updateOrder(id, orderData);
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order))
      );
      if (currentOrder?.id === id) {
        setCurrentOrder(updatedOrder);
      }
      return updatedOrder;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar la orden';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentOrder]);

  /**
   * Eliminar orden
   */
  const deleteOrder = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await apiClient.deleteOrder(id);
      setOrders((prev) => prev.filter((order) => order.id !== id));
      if (currentOrder?.id === id) {
        setCurrentOrder(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar la orden';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentOrder]);

  /**
   * Limpiar error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: OrderContextState = {
    orders,
    currentOrder,
    pagination,
    isLoading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    setCurrentOrder,
    clearError,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

/**
 * Hook para usar el contexto de órdenes
 */
export const useOrders = (): OrderContextState => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders debe ser usado dentro de un OrderProvider');
  }
  return context;
};
