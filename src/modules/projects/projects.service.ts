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

    async create(body: any, file: any) {
        if (!file) throw new Error(message.logoRequired)
        return await this.projectRepository.create(body)
    }

    async update(body: any, file: any) {
        const { _id } = body
        const updateObj = { ...(file && { logo: file.path }) }

        for (let key in body) if (body[key]) updateObj[key] = body[key]

        return await this.projectRepository.updateCustomWithOptions({ _id }, updateObj)
    }

    async list(body: any) {
        return await this.projectAggregationService.getProjectsList(body)
    }
}
