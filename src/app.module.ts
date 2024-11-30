import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { ProdutoControllerController } from './produto.controller/produto.controller';
import { CarrinhoControllerController } from './carrinho.controller/carrinho.controller.controller';
import { UserControllerController } from './user.controller/user.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, ProdutoControllerController, CarrinhoControllerController, UserControllerController],
  providers: [],
})
export class AppModule {}
