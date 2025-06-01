import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, Put, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ValidacionPipeIntPipe } from 'src/common/pipes/validacion-pipe-int.pipe';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetUserWithRole, UserWithRole } from 'src/common/decorators/get-user.decorator';

@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUsuarioDto, @GetUserWithRole() userWithRole: UserWithRole) {

    if (userWithRole.role == "user") {

      throw new UnauthorizedException ({
        statusCode: 401,
        error: "No autorizado",
        message: "Usuario no autorizado para realizar esta acción."
      })

    }

    return this.usuariosService.create(createUserDto);
  }

  @Get()
  findAll() {

    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidacionPipeIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ValidacionPipeIntPipe) id: number,
    @Body() updateUserDto: UpdateUsuarioDto,
    @GetUserWithRole() userWithRole: UserWithRole
  ){




    if (userWithRole.role == "user") {

      throw new UnauthorizedException ({
        statusCode: 401,
        error: "No autorizado",
        message: "Usuario no autorizado para realizar esta acción."
      })

    }

    return this.usuariosService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidacionPipeIntPipe) id: number, @GetUserWithRole() userWithRole: UserWithRole) {

    if (userWithRole.role == "user") {

      throw new UnauthorizedException ({
        statusCode: 401,
        error: "No autorizado",
        message: "Usuario no autorizado para realizar esta acción."
      })

    }

    return this.usuariosService.remove(id);
  }
}
