import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Response, Request } from 'express';

describe('AppController', () => {
  let appController: AppController;
  let mockRes: Response;
  let mockReq: Request;

  beforeEach(async () => {
    mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response;
    mockReq = { url: '/test' } as unknown as Request;  // Mocking the URL if needed

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return 404 page for root', () => {
      // Mocking the behavior of getHello()
      appController.getHello(mockReq, mockRes);

      // Test if the response has status 404 and if the correct body is sent
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith(expect.stringContaining('404 - Not Found'));
    });
  });
});