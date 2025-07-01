import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { authConstant } from '../../constants/index'

const { auth: message } = authConstant

@Injectable()
export class ApiKeyGuard implements CanActivate {
    private readonly validApiKey: any;

    constructor(private readonly configService: ConfigService) {
        // Now we get the API key from the config service
        this.validApiKey = this.configService.get<string>('xApiKey');
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        if (apiKey !== this.validApiKey) throw new ForbiddenException(message.invalidApiKey);

        return true;
    }
}