import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { wrapAsync } from '../utils/wrapAsync';

@Injectable()
export class WrapAsyncInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = context.getHandler();
        const originalMethod = handler;

        // Wrap the original method with wrapAsync
        context.switchToHttp().getRequest().handler = wrapAsync(originalMethod);

        return next.handle();
    }
}