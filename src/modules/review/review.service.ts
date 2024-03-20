import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewMotorbike } from '../../schemas/reviewMotorbike.schema';
import { ReviewTour } from '../../schemas/reviewTour.schema';
import { ReviewTourDto } from './dto/review-tour.dto';
import { ReviewMotorbikeDto } from './dto/review-motorbike.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewTour.name)
    private readonly reviewTourModel: Model<ReviewTour>,
    @InjectModel(ReviewMotorbike.name)
    private readonly reviewMotorbikeModel: Model<ReviewMotorbike>,
  ) {}

  async getReviewsByTour(tourId: string) {
    return await this.reviewTourModel
      .find({ tour: tourId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({ path: 'user', select: 'name avatar' });
  }

  async getReviewsByMotorbike(motorbikeId: string) {
    return await this.reviewMotorbikeModel
      .find({ motorbike: motorbikeId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({ path: 'user', select: 'name avatar' });
  }

  async getReviewByUserAndTour(userId: string, tourId: string) {
    return await this.reviewTourModel.findOne({ user: userId, tour: tourId });
  }

  async createReviewTour(createReviewTourData: ReviewTourDto) {
    const createdReviewTour = new this.reviewTourModel(createReviewTourData);
    await createdReviewTour.save();
    return this.reviewTourModel
      .findById(createdReviewTour._id)
      .populate({ path: 'user', select: 'avatar name' });
  }

  async createReviewMotorbike(createReviewMotorbikeData: ReviewMotorbikeDto) {
    const createdReviewMotorbike = new this.reviewMotorbikeModel(
      createReviewMotorbikeData,
    );
    await createdReviewMotorbike.save();
    return this.reviewMotorbikeModel
      .findById(createdReviewMotorbike._id)
      .populate({ path: 'user', select: 'avatar name' });
  }
}
