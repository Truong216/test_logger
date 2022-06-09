import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { logger, loggerDocument } from './schemas/logger.schema';

@Injectable()
export class LoggersRepository {
  constructor(
    @InjectModel(logger.name) private loggerModel: Model<loggerDocument>,
  ) {}

  async find(loggersFilterQuery: FilterQuery<logger>): Promise<logger[]> {
    return this.loggerModel.find(loggersFilterQuery);
  }

  async create(user: logger): Promise<logger> {
    const newLogger = new this.loggerModel(user);
    return newLogger.save();
  }
}
