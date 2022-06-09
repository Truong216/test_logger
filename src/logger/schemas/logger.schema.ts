import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed } from 'mongoose';

export type loggerDocument = logger & Document;

@Schema()
export class logger {
  @Prop()
  method: string;

  @Prop()
  timeStamp: string;

  @Prop()
  message: string;

  @Prop({ type: Object })
  requestData: Mixed;

  @Prop()
  level: string;

  @Prop()
  url: string;
}

export const LoggerSchema = SchemaFactory.createForClass(logger);
