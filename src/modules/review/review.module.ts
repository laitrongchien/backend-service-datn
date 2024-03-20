import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewMotorbikeSchema } from '../../schemas/reviewMotorbike.schema';
import { ReviewTourSchema } from '../../schemas/reviewTour.schema';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ReviewTour', schema: ReviewTourSchema },
      { name: 'ReviewMotorbike', schema: ReviewMotorbikeSchema },
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
