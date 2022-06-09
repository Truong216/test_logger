import {
  Controller,
  Get,
  Post,
  // HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  getHelloFromPost() {
    const a = {
      message: 'd',
      status: '12',
      d: 0,
    };
    // throw new HttpException('Service timing not found', HttpStatus.NOT_FOUND);
    return a;
  }
}
