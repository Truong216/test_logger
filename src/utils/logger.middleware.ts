import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/loggers.service';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: LoggerService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const oldWrite = res.write;
    const oldEnd = res.end;
    res.write = (...restArgs): any => {
      oldWrite.apply(res, restArgs);
    };

    res.end = async (...restArgs) => {
      const logger = {
        timeStamp: new Date().toUTCString(),
        method: req.method,
        url: req.url,
        requestData: req.body,
        message: '',
        level: 'info',
      };
      await this.loggerService.createLogger(logger);
      oldEnd.apply(res, restArgs);
    };
    next();
  }
}
