import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class handleResponeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((result) => {
                const { message = 'Request successful', data = null } = result || {};
                return {
                    success: true,
                    message,
                    data,
                };
            }),
        );
    }
}