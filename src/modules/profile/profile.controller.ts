import { Body, Controller, Get, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { handleResponeInterceptor } from 'src/common/interceptors/responseHandler';
import { WrapAsyncInterceptor } from 'src/common/interceptors/wrapAsync.interceptor';
import { updateProfileDto } from './dto/profile.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { dynamicMulter } from 'src/common/interceptors/multer.interceptor';
import { ProfileService } from './profile.service';
import { profileConstant } from '../../constants'
import { ApiKeyGuard } from 'src/common/guards/apiKey.guard';

const message = profileConstant.profile

@Controller('profile')
@UseInterceptors(handleResponeInterceptor)
@UseInterceptors(WrapAsyncInterceptor)
@UseGuards(ApiKeyGuard)
export class ProfileController {

    constructor(private readonly profileService: ProfileService) { }

    @Post('update')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'image', maxCount: 1 },
                { name: 'resume', maxCount: 1 },
            ],
            dynamicMulter(),
        ),
    )
    async updateProfile(@Req() req: any, @Body() body: updateProfileDto, @UploadedFiles()
    files: {
        image?: Express.Multer.File[];
        resume?: Express.Multer.File[];
    }) {

        await this.profileService.updateProfile(body, files)

        return { message: message.updateProfile }
    }

    @Get('detail')
    async getProfile(@Req() req: any) {

        const data = await this.profileService.getProfile()

        return { message: message.getProfile, data }
    }
}