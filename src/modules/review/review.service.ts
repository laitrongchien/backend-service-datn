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

  async getReviewsByTour(tourId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const tourReviews = await this.reviewTourModel
      .find({ tour: tourId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({ path: 'user', select: 'name avatar' });

    const totalTourReviews = await this.reviewTourModel.countDocuments({
      tour: tourId,
    });
    const totalPages = Math.ceil(totalTourReviews / limit);
    return { tourReviews, totalPages };
  }

  async getReviewsByMotorbike(
    motorbikeId: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
    const motorReviews = await this.reviewMotorbikeModel
      .find({ motorbike: motorbikeId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({ path: 'user', select: 'name avatar' });
    const totalMotorReviews = await this.reviewMotorbikeModel.countDocuments({
      motorbike: motorbikeId,
    });
    const totalPages = Math.ceil(totalMotorReviews / limit);
    return { motorReviews, totalPages };
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
