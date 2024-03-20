import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Tour } from './tour.schema';

@Schema({ timestamps: true })
export class ReviewTour extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tour' })
  tour: Tour;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ type: Number, min: 1, max: 5 })
  rating: number;
}

export const ReviewTourSchema = SchemaFactory.createForClass(ReviewTour);

ReviewTourSchema.post('save', async function (doc) {
  const reviewTourModel = this.model('ReviewTour');
  const tourModel = this.model('Tour');

  const tourId = doc.tour;
  const reviews = await reviewTourModel.find({ tour: tourId });
  const totalRatings = reviews.reduce(
    (acc: number, review: any) => acc + review.rating,
    0,
  );
  const ratingsQuantity = reviews.length;
  const ratingsAverage = totalRatings / ratingsQuantity;

  // Update the associated tour
  await tourModel.findByIdAndUpdate(tourId, {
    ratingsQuantity,
    ratingsAverage,
  });
});

ReviewTourSchema.index({ tour: 1, user: 1 }, { unique: true });
