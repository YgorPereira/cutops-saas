import { Test, TestingModule } from '@nestjs/testing';
import { ShedulingController } from './scheduling.controller';

describe('ShedulingController', () => {
  let controller: ShedulingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShedulingController],
    }).compile();

    controller = module.get<ShedulingController>(ShedulingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
