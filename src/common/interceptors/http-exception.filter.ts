import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import { notFoundMiddleware } from '../not-found.controller';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | string[] = 'Internal server error';

        // Handle NestJS HTTP Exceptions
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message = typeof res === 'string' ? res : (res as any).message || message;
        }
        // MongoDB Duplicate Key Error
        else if (exception instanceof MongoServerError && exception.code === 11000) {
            status = HttpStatus.BAD_REQUEST;
            const duplicatedFields = Object.entries(exception.keyValue || {})
                .map(([field, value]) => `${field?.charAt(0).toUpperCase() + field?.slice(1)} "${value}" already exists`)
                .join(', ');
            message = duplicatedFields || 'Duplicate key error';
        }
        // Mongoose ValidationError
        else if (exception?.name === 'ValidationError') {
            status = HttpStatus.BAD_REQUEST;
            message = Object.values(exception.errors).map((err: any) => err.message);
        }
        // Mongoose CastError (e.g., invalid ObjectId)
        else if (exception?.name === 'CastError') {
            status = HttpStatus.BAD_REQUEST;
            message = `Invalid value for field "${exception.path}": ${exception.value}`;
        }
        else if (exception instanceof Error) {
            status = HttpStatus.BAD_REQUEST;
            message = exception.message || message;
        }

        // Custom 404 for unmatched routes
        if (status === 404) return notFoundMiddleware(request, response);

        console.error('[Exception Log]', {
            method: request.method,
            url: request.url,
            statusCode: status,
            message,
            stack: exception?.stack,
        });

        // Send the structured response
        response.status(status).json({
            success: false,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}  