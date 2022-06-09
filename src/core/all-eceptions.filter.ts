import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from 'src/logger/loggers.service';

import {
  CustomHttpExceptionResponse,
  HttpExceptionResponse,
} from './models/http-exception-response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private loggerService: LoggerService) {}
  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage =
        (errorResponse as HttpExceptionResponse).error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occurred!';
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    const errorObj = this.getErrorLog(errorResponse, request, exception);
    await this.loggerService.createLogger(errorObj);
    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date().toUTCString(),
  });

  private getErrorLog = (
    errorResponse: CustomHttpExceptionResponse,
    request: Request,
    exception: unknown,
  ) => {
    const { error, timeStamp } = errorResponse;
    const { method, url, body } = request;
    const errorObject = {
      method: method,
      url: url,
      timeStamp: timeStamp,
      requestData: body,
      message: error,
      level: 'error',
    };
    return errorObject;
  };
}
