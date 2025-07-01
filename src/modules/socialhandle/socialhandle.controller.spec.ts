import { Test, TestingModule } from '@nestjs/testing';
import { SocialhandleController } from './socialhandle.controller';

describe('SocialhandleController', () => {
  let controller: SocialhandleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialhandleController],
    }).compile();

    controller = module.get<SocialhandleController>(SocialhandleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
