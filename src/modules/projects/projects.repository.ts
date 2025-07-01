import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/projects.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class ProjectRepository {
    constructor(
        @InjectModel(Project.name) private readonly Project: Model<Project>,
    ) { }

    async create(body: any) {
        return await this.Project.create(body)
    }

    async updateCustomWithOptions(filter: any, fields: any, options: any = {}) {
        return await this.Project.updateOne(filter, fields, options)
    }

    async findOneAndUpdateCustomWithOptions(filter: any, fields: any, options: any = {}) {
        return await this.Project.findOneAndUpdate(filter, fields, options)
    }

    async findOneWithCustomFields(filter: any) {
        return await this.Project.findOne(filter).lean()
    }
}