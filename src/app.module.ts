import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './utils/logger.middleware';
import { LoggerModule } from './logger/loggers.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './core/all-eceptions.filter';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/loggerTest'),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
