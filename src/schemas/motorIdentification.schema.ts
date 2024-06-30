import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Motorbike } from './motorbike.schema';

@Schema()
export class MotorIdentification extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Motorbike' })
  motorbike: Motorbike;

  @Prop({ type: String })
  location: string;

  @Prop({ required: true, type: String })
  identification: string;

  @Prop()
  model_year: number;

  @Prop()
  km_driven: number;

  @Prop()
  very_serious_failures: number;

  @Prop()
  serious_failures: number;

  @Prop()
  quite_serious_failures: number;

  @Prop()
  medium_failures: number;

  @Prop()
  minor_failures: number;

  @Prop({ default: 'good' })
  performance: string;

  @Prop({ default: 'normal' })
  status: string;

  @Prop({ default: false })
  isUsed: boolean;

  @Prop()
  lastMaintain: Array<{
    type: string;
    lastDate: Date;
    lastKm: number;
  }>;

  @Prop()
  isForTour: boolean;
}

export const MotorIdentificationSchema =
  SchemaFactory.createForClass(MotorIdentification);
