import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoControllerController } from './produto.controller.controller';

describe('ProdutoControllerController', () => {
  let controller: ProdutoControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoControllerController],
    }).compile();

    controller = module.get<ProdutoControllerController>(ProdutoControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
