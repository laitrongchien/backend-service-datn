import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Motorbike } from './motorbike.schema';

@Schema({ timestamps: true })
export class MotorbikeRental extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    type: [
      {
        motorbike: { type: MongooseSchema.Types.ObjectId, ref: 'Motorbike' },
        startDate: Date,
        finishDate: Date,
        numMotorbikes: Number,
      },
    ],
  })
  motorbikes: {
    motorbike: Motorbike;
    startDate: Date;
    finishDate: Date;
    numMotorbikes: number;
  }[];

  @Prop({ default: 'payAll' })
  paymentType: string;

  @Prop()
  totalPrice: number;
}

export const MotorbikeRentalSchema =
  SchemaFactory.createForClass(MotorbikeRental);
