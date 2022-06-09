import { Injectable } from '@nestjs/common';
import { logger } from './schemas/logger.schema';
import { LoggersRepository } from './loggers.repository';

@Injectable()
export class LoggerService {
  constructor(private readonly loggersRepository: LoggersRepository) {}
  async getLoggers(): Promise<logger[]> {
    return this.loggersRepository.find({});
  }

  async createLogger(logger: logger): Promise<logger> {
    return this.loggersRepository.create(logger);
  }
}
