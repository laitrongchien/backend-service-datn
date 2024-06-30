import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Motorbike } from './motorbike.schema';

@Schema()
export class Tour extends Document {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ required: true })
  duration: number;

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

  @Prop()
  startDate: Date;

  @Prop({ type: Number, default: 10 })
  maxGuest: number;

  @Prop({
    type: Number,
    default: function () {
      return this.maxGuest;
    },
  })
  availableRemain: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Motorbike',
    default: '65f040aa31db5ce14317ab14',
  })
  motorForTour: Motorbike;

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

TourSchema.pre('findOneAndUpdate', function (next) {
  const update: any = this.getUpdate();
  if (update.startDate) {
    update.availableRemain = update.maxGuest || 10;
  }
  next();
});
