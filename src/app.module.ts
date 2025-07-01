import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { CustomConfigModule } from './config/config.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ProfileController } from './modules/profile/profile.controller';
import { ProfileService } from './modules/profile/profile.service';
import { ProfileModule } from './modules/profile/profile.module';
import { SkillsController } from './modules/skills/skills.controller';
import { SkillsModule } from './modules/skills/skills.module';
import { ProjectsController } from './modules/projects/projects.controller';
import { ProjectsService } from './modules/projects/projects.service';
import { ProjectsModule } from './modules/projects/projects.module';
import { SocialhandleModule } from './modules/socialhandle/socialhandle.module';

@Module({
  imports: [
    CustomConfigModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 50,
    }]),
    MongooseModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
      }),
    }),
    ProfileModule,
    SkillsModule,
    ProjectsModule,
    SocialhandleModule,
  ],
  controllers: [AppController, ProfileController, SkillsController, ProjectsController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    ProfileService,
    ProjectsService
  ],

})
export class AppModule { }