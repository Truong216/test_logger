import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { logger, LoggerSchema } from './schemas/logger.schema';
import { LoggersController } from './loggers.controller';
import { LoggersRepository } from './loggers.repository';
import { LoggerService } from './loggers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: logger.name, schema: LoggerSchema }]),
  ],
  controllers: [LoggersController],
  providers: [LoggerService, LoggersRepository],
  exports: [LoggerService],
})
export class LoggerModule {}
