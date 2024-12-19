import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { ProdutosModule } from './modules/produtos/produtos.module';



@Module({
  imports: [AuthModule, UsersModule, ProdutosModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
