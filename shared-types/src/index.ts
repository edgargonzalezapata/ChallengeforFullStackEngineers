/**
 * Paquete de tipos compartidos entre Frontend y Backend
 * Asegura consistencia de tipos en toda la aplicación
 */

/**
 * Enum para los estados posibles de una orden
 */
export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
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
  created_at: Date | string; // Date en Backend, string en Frontend (JSON)
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
  status?: OrderStatus; // Filtro opcional por status
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

/**
 * Códigos de error estándar
 */
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  INVALID_PARAMETER = 'INVALID_PARAMETER',
  NO_UPDATE_DATA = 'NO_UPDATE_DATA',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}
