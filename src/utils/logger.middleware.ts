import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/loggers.service';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: LoggerService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];
    res.write = (...restArgs): any => {
      chunks.push(Buffer.from(restArgs[0]));
      oldWrite.apply(res, restArgs);
    };

    res.end = async (...restArgs) => {
      if (restArgs[0]) {
        chunks.push(Buffer.from(restArgs[0]));
      }
      const body = Buffer.concat(chunks).toString('utf8');
      const logger = {
        timeStamp: new Date().toUTCString(),
        method: req.method,
        url: req.url,
        requestData: req.body,
        message: body,
        level: 'info',
      };
      console.log(res);
      oldEnd.apply(res, restArgs);
    };
    next();
  }
}
