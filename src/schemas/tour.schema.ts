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
    default: 0,
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

  @Prop({
    default:
      'https://motorbiketourexpert.com/demo/wp-content/uploads/2023/11/pu-luong-nature-reserve-motorbike.jpg',
  })
  imageCover: string;

  @Prop([String])
  images: string[];

  @Prop()
  startLocation: string;

  @Prop([Date])
  startDates: Date[];

  @Prop({
    type: [
      {
        day: Number,
        route: String,
        distance: Number,
        description: String,
      },
    ],
  })
  itinerary: {
    day: number;
    route: string;
    distance: number;
    description: string;
  }[];

  @Prop()
  isFavorite: boolean;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
