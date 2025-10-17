/**
 * Enum para los estados posibles de una orden
 */
export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

/**
 * Interfaz principal para una orden
 */
export interface Order {
  id: string; // UUID
  customer_name: string;
  item: string;
  quantity: number;
  status: OrderStatus;
  created_at: Date;
}

/**
 * DTO para crear una nueva orden (sin id ni created_at)
 */
export interface CreateOrderDTO {
  customer_name: string;
  item: string;
  quantity: number;
  status?: OrderStatus; // Opcional, por defecto será 'pending'
}

/**
 * DTO para actualizar una orden (todos los campos opcionales)
 */
export interface UpdateOrderDTO {
  customer_name?: string;
  item?: string;
  quantity?: number;
  status?: OrderStatus;
}

/**
 * Parámetros de paginación
 */
export interface PaginationParams {
  page: number;
  page_size: number;
}

/**
 * Respuesta paginada de órdenes
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
  };
}

/**
 * Respuesta estándar de API
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}
