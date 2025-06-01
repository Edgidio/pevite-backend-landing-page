import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>
  ) {

  }
// Crear usuario
async create(createUsuarioDto:CreateUsuarioDto) {
  const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);
  createUsuarioDto.password = hashedPassword;

  const user = this.usuarioRepository.create(createUsuarioDto);
  const newUser =  await this.usuarioRepository.save(user);

  const {password, ...usuario} = newUser;

  return usuario
}

async findByEmail(email: string) {
  return this.usuarioRepository.findOne({ where: { email } });
}

// Obtener todos los usuarios
async findAll() {
  return this.usuarioRepository.find();
}

// Obtener un usuario por ID
async findOne(id: number) {
  const user = await this.usuarioRepository.findOne({ where: { id } });
  if (!user) {
    throw new NotFoundException( {
      status: "error",
      code: 404,
      message: "Error en la operación",
      errors: [
        {
          message: `Usuario con id: ${id}, no encontrado`
        }
      ],
      date: new Date()
    });
  }

  const {password, ...usuario} = user

  return usuario;
}

// Actualizar usuario
async update(id: number, updateData: UpdateUsuarioDto) {
  
  const user = await this.findOne(id);
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  await this.usuarioRepository.update(id, updateData);

  return {
    status: "success",
    code: 200,
    message: "Usuario actualizado con éxito",
    data: await this.findOne(id),
    date: new Date()
  };
}

  // Eliminar usuario
  async remove(id: number) {
    
    const usuario = await this.findOne(id);
    await this.usuarioRepository.delete(id);
    return {
      status: "success",
      code: 200,
      message: "Usuario eliminado con éxito",
      data: usuario,
      date: new Date()
    } 
  }
}
