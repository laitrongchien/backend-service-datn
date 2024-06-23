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
        motorbikeHistory: { type: Object, default: null },
        startDate: Date,
        finishDate: Date,
        numMotorbikes: Number,
        identifications: [{ type: String }],
      },
    ],
  })
  motorbikes: {
    motorbike: Motorbike;
    motorbikeHistory: Record<string, any>;
    startDate: Date;
    finishDate: Date;
    numMotorbikes: number;
    identifications: string[];
  }[];

  @Prop({ type: String })
  location: string;

  @Prop({ default: 'payAll' })
  paymentType: string;

  @Prop()
  totalPrice: number;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  extraFee: number;

  @Prop()
  compensateFee: number;

  @Prop()
  returnNote: string;
}

export const MotorbikeRentalSchema =
  SchemaFactory.createForClass(MotorbikeRental);
