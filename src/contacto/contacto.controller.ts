import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { ValidacionPipeIntPipe } from 'src/common/pipes/validacion-pipe-int.pipe';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetUserWithRole, UserWithRole } from 'src/common/decorators/get-user.decorator';

@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  @Post()
  create(@Body() createContactoDto: CreateContactoDto, @GetUserWithRole() userWithRole: UserWithRole) {
    return this.contactoService.create(createContactoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.contactoService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ValidacionPipeIntPipe) id: string, @GetUserWithRole() userWithRole: UserWithRole) {
    return this.contactoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id',  )
  remove(@Param('id', ValidacionPipeIntPipe) id: string, @GetUserWithRole() userWithRole: UserWithRole) {

        if (userWithRole.role == "user") {
    
          throw new UnauthorizedException ({
            statusCode: 401,
            error: "No autorizado",
            message: "Usuario no autorizado para realizar esta acción."
          })
    
        }

    return this.contactoService.remove(+id);
  }
}
