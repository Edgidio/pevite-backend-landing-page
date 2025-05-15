import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  
  constructor( 
    private usuarioService: UsuariosService,
    private jwtService: JwtService,
   ){

  }

  async validateUser(loginDto: LoginDto){
    const usuario = await this.usuarioService.findByEmail(loginDto.email);
    if (usuario && (await bcrypt.compare(loginDto.password, usuario.password))) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.validateUser(loginDto);
    if (!usuario) {
      throw new UnauthorizedException({
        status: "error",
        code: 401,
        message: "Error en la operación",
        errors: [
          {
            message: "Usuario o contraseña incorreta"
          }
        ],
        date: new Date()
      });
    }
    const payload = { email: usuario.email, sub: usuario.id, role: usuario.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


}
