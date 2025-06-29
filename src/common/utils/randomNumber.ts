import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export interface bcryptManagerInterface {
    otpGenerate(): number,
}

@Injectable()
export class randomNumber {
    private live: any;
    constructor(private readonly configService: ConfigService) {
        const isLive = configService.get<string>('isLive')
        this.live = isLive
    }
    otpGenerate() {
        if (this.live) return Math.floor(1000 + Math.random() * 9000);
        else return 1234
    }
}