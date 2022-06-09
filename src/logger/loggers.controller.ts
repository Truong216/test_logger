import { Controller, Get } from '@nestjs/common';

import { logger } from './schemas/logger.schema';
import { LoggerService } from './loggers.service';

@Controller('loggers')
export class LoggersController {
  constructor(private readonly loggersService: LoggerService) {}
  @Get()
  async getloggers(): Promise<logger[]> {
    return this.loggersService.getLoggers();
  }

  @Get('test')
  async getTest(): Promise<logger[]> {
    throw new Error('We crashed!!!!!');
    return this.loggersService.getLoggers();
  }
}
