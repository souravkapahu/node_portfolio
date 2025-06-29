import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from '../schemas/projects.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProjectAggregationService {
    constructor(@InjectModel(Project.name) private Project: Model<Project>) { }

    async getProjectsList(body: any) {
        const { offset, limit } = body

        return this.Project.aggregate([

        ]);
    }
}
