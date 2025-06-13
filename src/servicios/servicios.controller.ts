import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ValidacionPipeIntPipe } from 'src/common/pipes/validacion-pipe-int.pipe';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}


  @Get()
  findAll() {
    return this.serviciosService.findAll();
  }

  @Get('four')
  findFour() {
    return this.serviciosService.four();
  }

  @Get(':id')
  findOne(@Param('id', ValidacionPipeIntPipe) id: string) {
    return this.serviciosService.findOne(+id);
  }

}
