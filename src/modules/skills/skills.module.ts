import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillRepository } from './skill.repository';
import { SkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './schemas/skill.schema';

@Module({
  providers: [SkillsService, SkillRepository, SkillsController],
  imports: [
    MongooseModule.forFeature([
      { name: Skill.name, schema: SkillSchema }
    ])
  ],
  exports: [SkillsService]
})
export class SkillsModule { }
