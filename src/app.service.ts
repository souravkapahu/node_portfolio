import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
  Logger,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(AppService.name);

  constructor(@InjectConnection() private readonly connection: Connection) { }

  onModuleInit() {
    this.connection.on('connected', () => {
      this.logger.log('✅ MongoDB Connected');
    });

    this.connection.on('error', (err) => {
      this.logger.error('❌ MongoDB Connection Error:', err);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB Disconnected');
    });

    if (this.connection.readyState === 1) {
      this.logger.log('✅ MongoDB Already Connected');
    } else {
      this.logger.log(`🔄 MongoDB Current State: ${this.getDbStatus()}`);
    }
  }

  async onApplicationShutdown(signal: string) {
    this.logger.warn(`⚠️ Application shutting down due to: ${signal}`);
    await this.connection.close();
    this.logger.log('✅ MongoDB Disconnected Gracefully');
  }

  getDbStatus(): string {
    switch (this.connection.readyState) {
      case 0:
        return '🔴 Disconnected';
      case 1:
        return '🟢 Connected';
      case 2:
        return '🟡 Connecting';
      case 3:
        return '🟠 Disconnecting';
      default:
        return '⚫ Unknown';
    }
  }
}