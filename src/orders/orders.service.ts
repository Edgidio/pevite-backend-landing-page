import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './dto/create-order.dto';
import { UpdateProductoStatusDto } from './dto/update-orders-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      // Validación de productos
      if (createOrderDto.productos.length === 0) {
        throw new BadRequestException('Debes incluir al menos un producto');
      }

      // Validar cantidades positivas
      createOrderDto.productos.forEach(producto => {
        if (producto.cantidad <= 0) {
          throw new BadRequestException(`La cantidad para el producto ${producto.id} debe ser mayor a 0`);
        }
      });

      const order = this.orderRepository.create({
        ...createOrderDto
      });

      return await this.orderRepository.save(order);

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al crear la orden: ' + error.message);
    }
  }

  async findAll() {
    try {
      return await this.orderRepository.find();
    } catch (error) {
      throw new Error('Error al obtener todas las órdenes');
    }
  }

  async findOne(id: number){
    try {

      const order = await this.orderRepository.findOne({ where: { id } });

      if (!order) {
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }

      return order;

    } catch (error) {

      throw error;


    }
  }

  async updated(id: number, status: UpdateProductoStatusDto) {
    
    try {
      const orden_existe = await this.orderRepository.findOne({
        where: {id: id}
      })

      if (!orden_existe){
        throw new BadRequestException("Orden no encontrada")
      }

      const orden_actualizar = await this.orderRepository.update(id, { status: status.status });

      return "Estado de la orden actualizada"
      
    } catch (error) {
      throw error
    }

  }

  async remove(id: number) {
    try {

      const order = await this.orderRepository.findOne({ where: { id } });

      if (!order) {
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }

      const result = await this.orderRepository.delete(id);

      return "Orden eliminada satisfactoriamente!";
      
    } catch (error) {

      throw error;
    
    }
  }
}