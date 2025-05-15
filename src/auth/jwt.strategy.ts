import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "pevite_JWT_top_secret",
    });
  }

  async validate(payload: any) {
    const usuario = await this.usuariosService.findByEmail(payload.email);
    if (!usuario) {
      return null; // Esto generará un 401 Unauthorized
    }
    return { id: usuario.id, email: usuario.email, role: usuario.role };
  }
}