import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs/promises';
import { cwd } from 'process';

@Injectable()
export class EmailService {
    private readonly transporter;
    private readonly logger = new Logger(EmailService.name);
    private readonly smtpUser: any;
    private readonly senderName: any;

    constructor(private readonly configService: ConfigService) {
        this.smtpUser = this.configService.get<string>('smtpUser');
        this.senderName = this.configService.get<string>('smtpName') || 'Portfolio';

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.smtpUser,
                pass: this.configService.get<string>('smtpPassword'),
            },
        });
    }

    async sendEmail(to: string, subject: string, html: string) {
        const mailDetails = {
            from: `${this.senderName} <${this.smtpUser}>`,
            to,
            subject,
            html,
        };

        try {
            const info = await this.transporter.sendMail(mailDetails);
            this.logger.log(`Email sent successfully to ${to}`);
            return info;
        } catch (err) {
            this.logger.error('Failed to send email', err);
            throw new Error('Failed to send email');
        }
    }

    async sendTemplateEmail(
        to: string,
        subject: string,
        templateName: string,
        context: Record<string, any>,
    ) {
        const templatePath = join(
            cwd(),
            'src',
            'common',
            'services',
            'email',
            'templates',
            `${templateName}.ejs`,
        );

        try {
            const templateContent = await readFile(templatePath, 'utf-8');
            const html = ejs.render(templateContent, context);

            return this.sendEmail(to, subject, html);
        } catch (err) {
            this.logger.error(`Failed to render or send template email`, err);
            throw new Error('Failed to send templated email');
        }
    }
}
