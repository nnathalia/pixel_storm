import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Agora o PrismaService está disponível
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
