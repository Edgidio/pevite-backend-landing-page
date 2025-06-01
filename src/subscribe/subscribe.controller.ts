// src/subscribes/subscribes.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SubscribesService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { Subscribe } from './entities/subscribe.entity';
import { ValidacionPipeIntPipe } from 'src/common/pipes/validacion-pipe-int.pipe';
import { UpdateSubscribeDto } from './dto/create-update-subscribe.dto';
import { GetUserWithRole, UserWithRole } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('subscribes')
export class SubscribesController {
  constructor(private readonly subscribesService: SubscribesService) {}

  @Post()
  async create(
    @Body() createSubscribeDto: CreateSubscribeDto,
    @GetUserWithRole() userWithRole: UserWithRole
  ) {
    return await this.subscribesService.create(createSubscribeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Subscribe[]> {
    return await this.subscribesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ValidacionPipeIntPipe) id: string) {
    return await this.subscribesService.findOne(+id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ValidacionPipeIntPipe) id: string,
    @Body() status: UpdateSubscribeDto,
    @GetUserWithRole() userWithRole: UserWithRole
  ) {

    console.log(userWithRole.role)

    if (userWithRole.role == "user") {

      throw new UnauthorizedException ({
        statusCode: 401,
        error: "No autorizado",
        message: "Usuario no autorizado para realizar esta acción."
      })

    }

    return await this.subscribesService.updateStatus(+id, status.status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ValidacionPipeIntPipe) id: string, @GetUserWithRole() userWithRole: UserWithRole) {

    if (userWithRole.role == "user") {

      throw new UnauthorizedException ({
        statusCode: 401,
        error: "No autorizado",
        message: "Usuario no autorizado para realizar esta acción."
      })

    }

    

    return await this.subscribesService.remove(+id);
  }
}
