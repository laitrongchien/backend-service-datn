import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Tour } from './tour.schema';

@Schema({ timestamps: true })
export class BookingTour extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tour' })
  tour: Tour;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  phone: string;

  @Prop({ default: null })
  startDate: Date;

  @Prop({ required: true })
  numberPeople: number;

  @Prop()
  note: string;

  @Prop({ default: 'payAll' })
  paymentType: string;

  @Prop()
  totalPrice: number;

  @Prop({ default: 'waiting' })
  status: string;

  @Prop({ type: Object, default: null })
  tourHistory: Record<string, any>;
}

export const BookingTourSchema = SchemaFactory.createForClass(BookingTour);
