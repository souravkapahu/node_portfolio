import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './projects.repository';
import { projectConstant } from '../../constants'
import { ProjectAggregationService } from './aggregations/projects.aggregation';

const message = projectConstant.project

@Injectable()
export class ProjectsService {

    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly projectAggregationService: ProjectAggregationService
    ) { }

    async create(body: any, file: any): Promise<any> {
        if (!file) throw new Error(message.logoRequired)
        return await this.projectRepository.create({ ...body, logo: file.path })
    }

    async update(body: any, file: any): Promise<boolean> {
        const { _id } = body
        const updateObj = { ...(file && { logo: file.path }) }

        for (let key in body) if (body[key]) updateObj[key] = body[key]

        const project = await this.projectRepository.findOneAndUpdateCustomWithOptions({ _id }, updateObj)
        if (!project) throw new Error(message.projectNotFound)

        return true
    }

    async list(body: any): Promise<any> {
        return await this.projectAggregationService.getProjectsList(body)
    }
}
