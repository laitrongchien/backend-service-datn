import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Motorbike } from './motorbike.schema';

@Schema()
export class MotorIdentification extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Motorbike' })
  motorbike: Motorbike;

  @Prop({ required: true, type: String })
  identification: string;
}

export const MotorIdentificationSchema =
  SchemaFactory.createForClass(MotorIdentification);
