import { Test, TestingModule } from '@nestjs/testing';
import { SocialhandleService } from './socialhandle.service';

describe('SocialhandleService', () => {
  let service: SocialhandleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialhandleService],
    }).compile();

    service = module.get<SocialhandleService>(SocialhandleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
