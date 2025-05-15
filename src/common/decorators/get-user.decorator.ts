// src/common/decorators/get-user-with-role.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserWithRole {
  user: string;
  role: string;
}

export const GetUserWithRole = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserWithRole => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user; // Obtenido del JWT validado por JwtAuthGuard
    return {
      user, // Todo el objeto usuario
      role: user?.role || 'unknown', // El rol, con un valor por defecto si no existe
    };
  },
);