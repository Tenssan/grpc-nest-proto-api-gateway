import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from './auth/auth.controller';
import { OrderController } from './order/order.controller';
import { ProductController } from './product/product.controller';
import { AUTH_SERVICE_NAME } from './auth/auth.pb';
import { ORDER_SERVICE_NAME } from './order/order.pb';
import { PRODUCT_SERVICE_NAME } from './product/product.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:5051',
          package: 'auth',
          protoPath: join(__dirname, '../node_modules/grpc-nest-proto/proto/auth.proto'),
        },
      },
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:5052',
          package: 'order',
          protoPath: join(__dirname, '../node_modules/grpc-nest-proto/proto/order.proto'),
        },
      },
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:5053',
          package: 'product',
          protoPath: join(__dirname, '../node_modules/grpc-nest-proto/proto/product.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController, OrderController, ProductController],
})
export class AppModule {}
