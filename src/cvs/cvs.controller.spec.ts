import { Test, TestingModule } from '@nestjs/testing';
import { CvsController } from './controllers/cvs.controller';
import { CvsService } from './services/cvs.service';

describe('CvsController', () => {
  let controller: CvsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvsController],
      providers: [CvsService],
    }).compile();

    controller = module.get<CvsController>(CvsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
