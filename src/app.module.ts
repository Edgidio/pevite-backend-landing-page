import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServiciosModule } from './servicios/servicios.module';
import { ProductsModule } from './products/products.module';
import { ContactoModule } from './contacto/contacto.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5435', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo para desarrollo,
      extra: {
        max: 20,
        idleTimeoutMillis: 30000,
         connectionTimeoutMillis: 2000,
      }
    }),
    AuthModule, 
    UsuariosModule, ServiciosModule, ProductsModule, ContactoModule, SubscribeModule, CartModule, OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
