import { Body, Controller, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/apiKey.guard';
import { handleResponeInterceptor } from 'src/common/interceptors/responseHandler';
import { WrapAsyncInterceptor } from 'src/common/interceptors/wrapAsync.interceptor';
import { ProjectsService } from './projects.service';
import { projectConstant } from '../../constants'
import { FileInterceptor } from '@nestjs/platform-express';
import { dynamicMulter } from 'src/common/interceptors/multer.interceptor';

const message = projectConstant.project

@Controller('projects')
@UseInterceptors(handleResponeInterceptor)
@UseInterceptors(WrapAsyncInterceptor)
@UseGuards(ApiKeyGuard)
export class ProjectsController {

    constructor(private readonly projectsService: ProjectsService) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('logo', dynamicMulter('project')))
    async create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
        await this.projectsService.create(body, file)

        return { message: message.createProject }
    }

    @Put('update')
    @UseInterceptors(FileInterceptor('logo', dynamicMulter('project')))
    async update(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
        await this.projectsService.update(body, file)

        return { message: message.updateProject }
    }

    @Post('list')
    async list(@Body() body: any) {
        const data = await this.projectsService.list(body)

        return { message: message.getProjects, data }
    }
}
