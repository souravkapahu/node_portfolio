import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/apiKey.guard';
import { handleResponeInterceptor } from 'src/common/interceptors/responseHandler';
import { WrapAsyncInterceptor } from 'src/common/interceptors/wrapAsync.interceptor';
import { ContactService } from './contact.service';
import { addContactDto } from './dto/contact.dto';

@Controller('contact')
@UseInterceptors(handleResponeInterceptor)
@UseInterceptors(WrapAsyncInterceptor)
@UseGuards(ApiKeyGuard)
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post('message')
    async sendMessage(@Body() body: addContactDto) {
        return await this.contactService.sendMessage(body)
    }
}
