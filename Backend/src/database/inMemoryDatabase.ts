import { v4 as uuidv4 } from 'uuid';
import { Order, CreateOrderDTO, UpdateOrderDTO, OrderStatus, PaginationParams, PaginatedResponse } from '../types';

/**
 * Base de datos en memoria para órdenes
 */
class InMemoryDatabase {
  private orders: Map<string, Order>;

  constructor() {
    this.orders = new Map();
    this.seedInitialData();
  }

  /**
   * Poblar con datos iniciales para testing
   */
  private seedInitialData(): void {
    const sampleOrders: CreateOrderDTO[] = [
      { customer_name: 'Juan Pérez', item: 'Laptop HP', quantity: 1, status: OrderStatus.COMPLETED },
      { customer_name: 'María García', item: 'Mouse Logitech', quantity: 3, status: OrderStatus.PENDING },
      { customer_name: 'Carlos López', item: 'Teclado Mecánico', quantity: 2, status: OrderStatus.PENDING },
      { customer_name: 'Ana Martínez', item: 'Monitor Dell 27"', quantity: 1, status: OrderStatus.COMPLETED },
      { customer_name: 'Pedro Rodríguez', item: 'Webcam HD', quantity: 1, status: OrderStatus.CANCELLED }
    ];

    sampleOrders.forEach(orderDTO => this.create(orderDTO));
  }

  /**
   * Crear una nueva orden
   */
  create(orderDTO: CreateOrderDTO): Order {
    const newOrder: Order = {
      id: uuidv4(),
      customer_name: orderDTO.customer_name,
      item: orderDTO.item,
      quantity: orderDTO.quantity,
      status: orderDTO.status || OrderStatus.PENDING,
      created_at: new Date()
    };

    this.orders.set(newOrder.id, newOrder);
    return newOrder;
  }

  /**
   * Obtener orden por ID
   */
  findById(id: string): Order | undefined {
    return this.orders.get(id);
  }

  /**
   * Obtener todas las órdenes con paginación y filtros opcionales
   */
  findAll(params: PaginationParams & { status?: OrderStatus }): PaginatedResponse<Order> {
    const { page, page_size, status } = params;

    // Convertir Map a array y ordenar por fecha de creación (más recientes primero)
    let allOrders = Array.from(this.orders.values())
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

    // Filtrar por status si se proporciona
    if (status) {
      allOrders = allOrders.filter(order => order.status === status);
    }

    const total_items = allOrders.length;
    const total_pages = Math.ceil(total_items / page_size);
    const startIndex = (page - 1) * page_size;
    const endIndex = startIndex + page_size;

    const paginatedOrders = allOrders.slice(startIndex, endIndex);

    return {
      data: paginatedOrders,
      pagination: {
        page,
        page_size,
        total_items,
        total_pages,
        has_next: page < total_pages,
        has_previous: page > 1
      }
    };
  }

  /**
   * Actualizar una orden
   */
  update(id: string, updateDTO: UpdateOrderDTO): Order | undefined {
    const existingOrder = this.orders.get(id);

    if (!existingOrder) {
      return undefined;
    }

    const updatedOrder: Order = {
      ...existingOrder,
      ...updateDTO
    };

    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  /**
   * Eliminar una orden
   */
  delete(id: string): boolean {
    return this.orders.delete(id);
  }

  /**
   * Verificar si existe una orden
   */
  exists(id: string): boolean {
    return this.orders.has(id);
  }

  /**
   * Obtener el total de órdenes
   */
  count(): number {
    return this.orders.size;
  }

  /**
   * Limpiar todas las órdenes (útil para testing)
   */
  clear(): void {
    this.orders.clear();
  }
}

// Exportar instancia singleton
export const database = new InMemoryDatabase();
