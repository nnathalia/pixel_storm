import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { ProdutoControllerController } from './produto.controller/produto.controller.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, ProdutoControllerController],
  providers: [],
})
export class AppModule {}
