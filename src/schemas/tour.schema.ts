import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tour extends Document {
  @Prop({ required: true, unique: true, trim: true, minlength: 10 })
  name: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true, enum: ['chill', 'moderate', 'challenging'] })
  difficulty: string;

  @Prop({
    default: 4.5,
    min: 1,
    max: 5,
    set: (val: number) => Math.round(val * 10) / 10,
  })
  ratingsAverage: number;

  @Prop({ default: 0 })
  ratingsQuantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'abcddd' })
  imageCover: string;

  @Prop([String])
  images: string[];
}

export const TourSchema = SchemaFactory.createForClass(Tour);
