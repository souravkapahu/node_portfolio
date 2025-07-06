import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/apiKey.guard';
import { handleResponeInterceptor } from 'src/common/interceptors/responseHandler';
import { WrapAsyncInterceptor } from 'src/common/interceptors/wrapAsync.interceptor';
import { SocialhandleService } from './socialhandle.service';
import { socialHandleConstant } from '../../constants'
import { profileIdDto, updateSocialDto } from './dto/socialHandle.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { dynamicMulter } from 'src/common/interceptors/multer.interceptor';

const message = socialHandleConstant.socialHandle

@Controller('socialhandle')
@UseInterceptors(handleResponeInterceptor)
@UseInterceptors(WrapAsyncInterceptor)
@UseGuards(ApiKeyGuard)
export class SocialhandleController {
    constructor(private readonly socialhandleService: SocialhandleService) { }

    @Post('update-add')
    @UseInterceptors(FileInterceptor('icon', dynamicMulter()))
    async update(@Body() body: updateSocialDto, @UploadedFile() file: Express.Multer.File) {
        await this.socialhandleService.update(body, file)

        return { message: message.update }
    }

    @Get('list/:profile')
    async list(@Param() params: profileIdDto) {
        const { profile } = params
        const data = await this.socialhandleService.list(profile)

        return { message: message.getSocialHandle, data }
    }
}
