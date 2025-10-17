import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  ApiResponse,
  Order,
  CreateOrderDTO,
  UpdateOrderDTO,
  PaginatedResponse,
  PaginationParams,
  OrderStatus,
} from '../types';

/**
 * Cliente API tipado con axios
 */
class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = 'http://localhost:3000/api') {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor de respuestas para manejo de errores
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiResponse>) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET /orders - Obtener lista paginada de órdenes con filtro opcional por status
   */
  async getOrders(params: PaginationParams & { status?: OrderStatus }): Promise<PaginatedResponse<Order>> {
    const response = await this.client.get<ApiResponse<PaginatedResponse<Order>>>('/orders', {
      params,
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Error al obtener órdenes');
    }

    return response.data.data;
  }

  /**
   * GET /orders/:id - Obtener orden por ID
   */
  async getOrderById(id: string): Promise<Order> {
    const response = await this.client.get<ApiResponse<Order>>(`/orders/${id}`);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Error al obtener la orden');
    }

    return response.data.data;
  }

  /**
   * POST /orders - Crear nueva orden
   */
  async createOrder(orderData: CreateOrderDTO): Promise<Order> {
    const response = await this.client.post<ApiResponse<Order>>('/orders', orderData);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Error al crear la orden');
    }

    return response.data.data;
  }

  /**
   * PUT /orders/:id - Actualizar orden
   */
  async updateOrder(id: string, orderData: UpdateOrderDTO): Promise<Order> {
    const response = await this.client.put<ApiResponse<Order>>(`/orders/${id}`, orderData);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Error al actualizar la orden');
    }

    return response.data.data;
  }

  /**
   * DELETE /orders/:id - Eliminar orden
   */
  async deleteOrder(id: string): Promise<void> {
    const response = await this.client.delete<ApiResponse>(`/orders/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Error al eliminar la orden');
    }
  }

  /**
   * GET /health - Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get<ApiResponse>('/health');
      return response.data.success;
    } catch {
      return false;
    }
  }
}

// Exportar instancia singleton
export const apiClient = new ApiClient();
