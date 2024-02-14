import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MotorBike extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  engine: number;

  @Prop({ required: true })
  maxPower: number;

  @Prop({ required: true })
  gearbox: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  seatHeight: number;

  @Prop({ required: true })
  fuelCapacity: number;

  @Prop({ required: true })
  fuelConsumption: number;

  @Prop()
  image: string;
}

export const MotorBikeSchema = SchemaFactory.createForClass(MotorBike);
