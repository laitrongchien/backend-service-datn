import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Motorbike extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    default: 0,
    max: 5,
    set: (val: number) => Math.round(val * 10) / 10,
  })
  ratingsAverage: number;

  @Prop({ default: 0 })
  ratingsQuantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  engine: number;

  @Prop()
  maxPower: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  fuelCapacity: number;

  @Prop()
  fuelConsumption: number;

  @Prop()
  image: string;

  @Prop()
  isFavorite: boolean;
}

export const MotorbikeSchema = SchemaFactory.createForClass(Motorbike);
