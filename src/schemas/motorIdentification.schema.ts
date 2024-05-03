import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Motorbike } from './motorbike.schema';

@Schema()
export class MotorIdentification extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Motorbike' })
  motorbike: Motorbike;

  @Prop({ required: true, type: String })
  identification: string;

  @Prop()
  model_year: number;

  @Prop()
  km_driven: number;

  @Prop()
  engine_failures: number;

  @Prop()
  frame_failures: number;

  @Prop()
  brake_failures: number;

  @Prop()
  tire_failures: number;

  @Prop()
  other_failures: number;

  @Prop({ default: 'good' })
  performance: string;

  @Prop({ default: 'normal' })
  status: string;

  @Prop({ default: false })
  isUsed: boolean;
}

export const MotorIdentificationSchema =
  SchemaFactory.createForClass(MotorIdentification);
