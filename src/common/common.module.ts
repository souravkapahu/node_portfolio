import { Module } from '@nestjs/common';
import { CryptoManager } from './utils/crypto-manager';
import { bcryptManager } from './utils/bcrypt';
import { jwtManager } from './utils/jwt';
import { randomNumber } from './utils/randomNumber';
import { EmailService } from './services/email/email.service';

@Module({
    providers: [CryptoManager, bcryptManager, jwtManager, randomNumber, EmailService],
    exports: [CryptoManager, bcryptManager, jwtManager, randomNumber, EmailService],
})
export class CommonModule { }