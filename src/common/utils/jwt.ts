import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

export interface jwtManagerInterface {
    generateToken(data: string | object): string;
    generateRefreshToken(data: string | object): string;
    decryptToken(token: string): any;
    decryptRefreshToken(token: string): any;
}

@Injectable()
export class jwtManager implements jwtManagerInterface {
    private jwtSecret;
    private jwtRefreshSecret;

    constructor(private readonly configService: ConfigService) {
        const jwtSecret = configService.get<string>('jwtSecret');
        const jwtRefreshSecret = configService.get<string>('jwtRefreshSecert');
        this.jwtSecret = jwtSecret
        this.jwtRefreshSecret = jwtRefreshSecret
    }

    generateToken(data: string | object, forgotPass: boolean = false): string {
        return jwt.sign(data, this.jwtSecret, { expiresIn: forgotPass ? '10m' : '7d' });
    }

    generateRefreshToken(data: string | object): string {
        return jwt.sign(data, this.jwtRefreshSecret, { expiresIn: '30d' });
    }

    decryptToken(token: string) {
        try {
            const payload = jwt.verify(token, this.jwtSecret);
            return { success: true, payload };
        } catch (error: any) {
            return { success: false, error };
        }
    }

    decryptRefreshToken(token: string) {
        try {
            const payload = jwt.verify(token, this.jwtRefreshSecret);
            return { success: true, payload };
        } catch (error: any) {
            return { success: false, error };
        }
    }
}