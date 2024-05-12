import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Motorbike } from './motorbike.schema';

@Schema({ timestamps: true })
export class MotorbikeRental extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  phone: string;

  @Prop({
    type: [
      {
        motorbike: { type: MongooseSchema.Types.ObjectId, ref: 'Motorbike' },
        startDate: Date,
        finishDate: Date,
        numMotorbikes: Number,
        identifications: [{ type: String }],
      },
    ],
  })
  motorbikes: {
    motorbike: Motorbike;
    startDate: Date;
    finishDate: Date;
    numMotorbikes: number;
    identifications: string[];
  }[];

  @Prop({ default: 'payAll' })
  paymentType: string;

  @Prop()
  totalPrice: number;

  @Prop({ default: 'pending' })
  status: string;
}

export const MotorbikeRentalSchema =
  SchemaFactory.createForClass(MotorbikeRental);
