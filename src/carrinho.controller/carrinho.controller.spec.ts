import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhoController } from './carrinho.controller';

describe('CarrinhoControllerController', () => {
  let controller: CarrinhoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrinhoController],
    }).compile();

    controller = module.get<CarrinhoController>(CarrinhoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
