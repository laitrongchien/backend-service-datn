import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Tour } from './tour.schema';

@Schema()
export class FavoriteTour extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tour' })
  tour: Tour;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ default: false })
  isFavorite: boolean;
}

export const FavoriteTourSchema = SchemaFactory.createForClass(FavoriteTour);
