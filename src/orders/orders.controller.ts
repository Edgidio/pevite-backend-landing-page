import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus, 
  NotFoundException, 
  InternalServerErrorException,
  BadRequestException,
  UseGuards,
  UnauthorizedException,
  Put
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ValidacionPipeIntPipe } from 'src/common/pipes/validacion-pipe-int.pipe';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetUserWithRole, UserWithRole } from 'src/common/decorators/get-user.decorator';
import { UpdateProductoStatusDto } from './dto/update-orders-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.ordersService.create(createOrderDto);
    } catch (error) {

      if (error.message.includes("Debe incluir al menos un producto")){
        throw new BadRequestException({
          statusCode: 400,
          error: "Bad Request",
          errors: {
            productos: "Debes incluir al menos un producto"
          }
        })
      }

      if (error.message.includes("La cantidad para el producto")){
        throw new BadRequestException({
          statusCode: 400,
          error: "Bad Request",
          errors: {
            productos: "La cantidad para el producto debe ser mayor a 0"
          }
        })
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al crear la orden');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll( @GetUserWithRole() userWithRole: UserWithRole,) {
    try {
      return await this.ordersService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las órdenes');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ValidacionPipeIntPipe) id: string, @GetUserWithRole() userWithRole: UserWithRole,) {
    try {

      return await this.ordersService.findOne(+id);

    } catch (error) {
      if (error.message.includes("Orden con ID")) {
        throw new NotFoundException({
          statusCode: 404,
          message: "La ordes no existe"
        })
      }
    }
  }

  @Put(":id")
  async updated(@Param("id", ValidacionPipeIntPipe) id: number, @Body() updateOrderDto: UpdateProductoStatusDto) {

    return this.ordersService.updated(id, updateOrderDto)
    
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ValidacionPipeIntPipe) id: string, @GetUserWithRole() userWithRole: UserWithRole,) {
    try {

      if (userWithRole.role == "user") {
  
        throw new UnauthorizedException ({
          statusCode: 401,
          error: "No autorizado",
          message: "Usuario no autorizado para realizar esta acción."
        })
  
      }

      return await this.ordersService.remove(+id);
      
    } catch (error) {
      if (error.message.includes("Orden con ID")) {
        throw new NotFoundException({
          statusCode: 404,
          message: "La ordes no existe"
        })
      }
    }
  }
}
