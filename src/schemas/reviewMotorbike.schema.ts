import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Motorbike } from './motorbike.schema';

@Schema({ timestamps: true })
export class ReviewMotorbike extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Motorbike' })
  motorbike: Motorbike;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ type: Number, min: 1, max: 5 })
  rating: number;
}

export const ReviewMotorbikeSchema =
  SchemaFactory.createForClass(ReviewMotorbike);

ReviewMotorbikeSchema.post('save', async function (doc) {
  const reviewMotorbikeModel = this.model('ReviewMotorbike');
  const motorbikeModel = this.model('Motorbike');

  const motorbikeId = doc.motorbike;
  const reviews = await reviewMotorbikeModel.find({ motorbike: motorbikeId });
  const totalRatings = reviews.reduce(
    (acc: number, review: any) => acc + review.rating,
    0,
  );
  const ratingsQuantity = reviews.length;
  const ratingsAverage = totalRatings / ratingsQuantity;

  // Update the associated motorbike
  await motorbikeModel.findByIdAndUpdate(motorbikeId, {
    ratingsQuantity,
    ratingsAverage,
  });
});

ReviewMotorbikeSchema.index({ motorbike: 1, user: 1 }, { unique: true });
