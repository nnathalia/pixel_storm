/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { JogoModule } from './modules/jogo/jogo.module';
import { MethodOverrideMiddleware } from './common/method-override.middleware';
import { CartModule } from './modules/cart/cart.module';


@Module({
  imports: [AuthModule, UsersModule, JogoModule, CartModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MethodOverrideMiddleware).forRoutes('*');
  }
}
