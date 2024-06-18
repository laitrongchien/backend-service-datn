import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class SelfTour extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    required: true,
    type: { description: String, coordinates: [Number, Number] },
  })
  startLocation: {
    description: string;
    coordinates: [number, number];
  };

  @Prop({
    required: true,
    type: [{ description: String, coordinates: [Number, Number] }],
  })
  stopLocations: {
    description: string;
    coordinates: [number, number];
  }[];

  @Prop({
    required: true,
    type: { description: String, coordinates: [Number, Number] },
  })
  endLocation: {
    description: string;
    coordinates: [number, number];
  };

  @Prop({ required: true, type: Date })
  startDate: Date;

  @Prop({ required: true, type: Date })
  endDate: Date;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  numberPeople: number;

  @Prop({ type: String })
  description: string;
}

export const SelfTourSchema = SchemaFactory.createForClass(SelfTour);
