import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CryptoManager {
    private passphrase;
    private payload;

    constructor(private readonly configService: ConfigService) {
        const secret = configService.get<string>('cryptoSecret');
        this.passphrase = CryptoJS.enc.Utf8.parse(secret);
        this.payload = {
            mode: CryptoJS.mode.CBC,
            iv: this.passphrase,
            padding: CryptoJS.pad.Pkcs7,
        };
    }

    encryption(data: object): string {
        return CryptoJS.AES.encrypt(JSON.stringify(data), this.passphrase, this.payload).toString();
    }

    decryption(ciphertext: string): { [key: string]: string } {
        try {
            const decrypted = CryptoJS.AES.decrypt(ciphertext, this.passphrase, this.payload);
            return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        } catch (err) {
            return {};
        }
    }
}