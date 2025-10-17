/**
 * Enum para los estados de una orden
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
  id: string;
  customer_name: string;
  item: string;
  quantity: number;
  status: OrderStatus;
  created_at: string;
}

/**
 * DTO para crear una orden
 */
export interface CreateOrderDTO {
  customer_name: string;
  item: string;
  quantity: number;
  status?: OrderStatus;
}

/**
 * DTO para actualizar una orden
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
 * Información de paginación en la respuesta
 */
export interface PaginationInfo {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

/**
 * Respuesta paginada
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

/**
 * Respuesta estándar de la API
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}
