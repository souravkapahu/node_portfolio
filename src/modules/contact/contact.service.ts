import { Injectable } from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import { EmailService } from 'src/common/services/email/email.service';
import { mailSubjects } from '../../constants'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ContactService {
    adminEmail: any
    constructor(
        private readonly contactRepository: ContactRepository,
        private readonly emailService: EmailService,
        private readonly configService: ConfigService
    ) {
        this.adminEmail = this.configService.get<string>('email')
    }

    async sendMessage(body: any): Promise<boolean> {
        const { email, name, message } = body
        await this.contactRepository.insert(body)
        this.emailService.sendTemplateEmail(this.adminEmail, mailSubjects.contact, 'contact', {
            name,
            email,
            message,
            year: new Date().getFullYear(),
        })

        return true
    }
}
