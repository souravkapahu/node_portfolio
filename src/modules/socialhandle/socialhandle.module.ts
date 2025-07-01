import { Module } from '@nestjs/common';
import { SocialhandleController } from './socialhandle.controller';
import { SocialhandleService } from './socialhandle.service';
import { SocialHandleRepository } from './socialHandle.repository';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialHandle, SocialHandleSchema } from './schemas/socialHandle.schema';

@Module({
  controllers: [SocialhandleController],
  providers: [SocialhandleService, SocialHandleRepository],
  imports: [
    MongooseModule.forFeature([
      { name: SocialHandle.name, schema: SocialHandleSchema }
    ])
  ]
})
export class SocialhandleModule { }
