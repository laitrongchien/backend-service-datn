import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Motorbike } from './motorbike.schema';

@Schema()
export class FavoriteMotorbike extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Motorbike' })
  motorbike: Motorbike;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const FavoriteMotorbikeSchema =
  SchemaFactory.createForClass(FavoriteMotorbike);
