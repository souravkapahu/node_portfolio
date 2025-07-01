import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/apiKey.guard';
import { handleResponeInterceptor } from 'src/common/interceptors/responseHandler';
import { WrapAsyncInterceptor } from 'src/common/interceptors/wrapAsync.interceptor';
import { SkillsService } from './skills.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { dynamicMulter } from 'src/common/interceptors/multer.interceptor';
import { skillConstant } from '../../constants'
import { profileIdDto, updateSkillDto } from './dto/skill.dto';

const message = skillConstant.skill

@Controller('skills')
@UseInterceptors(handleResponeInterceptor)
@UseInterceptors(WrapAsyncInterceptor)
@UseGuards(ApiKeyGuard)
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) { }

    @Post('update')
    @UseInterceptors(FileInterceptor('icon', dynamicMulter('skill')))
    async updateSkills(@Body() body: updateSkillDto, @UploadedFile() file: Express.Multer.File) {

        await this.skillsService.updateSkills(body, file)

        return { message: message.updateSkill }
    }

    @Get('list/:profile')
    async getSkills(@Param() params: profileIdDto) {

        const data = await this.skillsService.getSkills(params)

        return { message: message.getSkill, data }
    }
}
