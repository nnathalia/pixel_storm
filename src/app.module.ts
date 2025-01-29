/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { JogoModule } from './modules/jogo/jogo.module';
import { MethodOverrideMiddleware } from './common/method-override.middleware';
import { CartModule } from './modules/cart/cart.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';



@Module({
  imports: [ JogoModule, CartModule, PedidoModule, AuthModule, PrismaModule],
  controllers: [AppController, AuthController],
  providers: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MethodOverrideMiddleware).forRoutes('*');
  }
}
