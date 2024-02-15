import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Tour } from './tour.schema';
import { MotorBike } from './motorBike.schema';

@Schema({ timestamps: true })
export class BookingTour extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tour' })
  tour: Tour;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'MotorBike' })
  motorBike: MotorBike;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: null })
  startDate: Date;

  @Prop({ default: null })
  finishDate: Date;

  @Prop({ required: true })
  numberPeople: number;

  @Prop()
  note: string;

  @Prop({ default: false })
  paid: boolean;
}

export const BookingTourSchema = SchemaFactory.createForClass(BookingTour);
