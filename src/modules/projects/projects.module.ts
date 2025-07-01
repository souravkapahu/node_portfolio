import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectRepository } from './projects.repository';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/projects.schema';
import { ProjectAggregationService } from './aggregations/projects.aggregation';

@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService, ProjectAggregationService, ProjectRepository],
    imports: [
        MongooseModule.forFeature([
            { name: Project.name, schema: ProjectSchema }
        ])
    ],
    exports: [ProjectRepository, ProjectAggregationService]
})
export class ProjectsModule { }
