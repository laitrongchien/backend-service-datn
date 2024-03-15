import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Motorbike } from './motorbike.schema';

@Schema({ timestamps: true })
export class OrderMotorbike extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    type: [
      {
        motorbike: { type: MongooseSchema.Types.ObjectId, ref: 'Motorbike' },
        startDate: Date,
        finishDate: Date,
        numberMotorbike: Number,
      },
    ],
  })
  motorbikes: {
    motorbike: Motorbike;
    startDate: Date;
    finishDate: Date;
    numberMotorbike: number;
  }[];
}

export const OrderMotorbikeSchema =
  SchemaFactory.createForClass(OrderMotorbike);
